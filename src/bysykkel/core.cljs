(ns ^:figwheel-hooks bysykkel.core
  (:require
   [goog.dom :as gdom]
   [reagent.core :as reagent :refer [atom]]))

(defonce app-state (atom {}))

(def base-url "https://gbfs.urbansharing.com/oslobysykkel.no")

(defn station-info [station-status {:keys [station_id lat lon name] :as station}]
  (let [{:keys [num_bikes_available num_docks_available] :as status} (station-status (str station_id))]
    {:station-id station_id
     :bikes-available num_bikes_available
     :docks-available num_docks_available
     :name name
     :position {:lat lat :lng lon}
     :info (str "<div>"
                  "<h3>" name "</h3>"
                  "<div>Ledige sykler: " num_bikes_available "</div>"
                  "<div>Ledige plasser: " num_docks_available "</div>"
                  "</div>")}))

(defn calculate-station-info [stations station-status]
  (when (and (seq stations) (seq station-status))
    (map (partial station-info station-status) stations)))

(defn handle-station-status-error [app-state _]
  (assoc app-state :error-status true :fetching-status nil))

(defn add-markers [app-state markers]
  (assoc app-state :markers markers))

(defn handle-current-location [state pos]
  (assoc state :current-location {:lat pos.coords.latitude
                                  :lng pos.coords.longitude}))
(defn add-map [state map-and-markers]
  (merge state map-and-markers))

(defn fetch-status [app-state id fetching error]
  (let [error-kw (keyword (str "error-" id))
        fetching-kw (keyword (str "fetching-" id))]
    (assoc app-state error-kw error fetching-kw fetching)))

(defn fetch-error [app-state id r]
  (fetch-status app-state id nil r))

(defn fetch-initialized [app-state id]
  (fetch-status app-state id true nil))

(defn fetch-ok [app-state id]
  (fetch-status app-state id nil nil))

(defn station-status-fetched [{:keys [stations] :as app-state} data]
  (let [station-status (->> (get-in data [:data :stations])
              (group-by :station_id)
              (reduce-kv (fn [acc k v] (assoc acc k (first v))) {}))]
    (assoc app-state
           :station-info (calculate-station-info stations station-status)
           :station-status station-status)))

(defn stations-fetched [{:keys [station-status] :as app-state} data]
  (let [stations  (get-in data [:data :stations])]
    (assoc app-state
           :stations stations
           :station-info (calculate-station-info stations station-status))))

(defn fetch [url opts id ok]
  (swap! app-state fetch-initialized id)
  (-> (js/fetch url opts)
      (.then (fn [r]
               (if (.-ok r)
                 (-> (.json r)
                     (.then (fn [j]
                              (swap! app-state ok (js->clj j :keywordize-keys true))
                              (swap! app-state fetch-ok id))))
                 (swap! app-state fetch-error id r))))))

(defn station-status! []
  (fetch (str base-url "/station_status.json") {} "status" station-status-fetched))

(defn stations! []
  (fetch (str base-url "/station_information.json") {} "stations" stations-fetched))

(defn current-location! []
  (js/navigator.geolocation.getCurrentPosition
   (fn [loc]
     (swap! app-state handle-current-location loc))))

(defn zoom-to-position [map position]
  (.setZoom map 16)
  (.setCenter map position))

(defn marker! [map {:keys [position info name icon]} click-handler]
  (let [info-window (js/google.maps.InfoWindow. (clj->js {:content info}))
        marker (js/google.maps.Marker. (clj->js (merge {:position position
                                                        :map map
                                                        :title name}
                                                       (when icon
                                                         {:icon icon}))))]
    (.addListener marker "click" (fn [_]
                                   (click-handler (.getPosition marker))
                                   (.open info-window map marker)))
    {:info-window info-window
     :marker marker}))

(defn render-location [map current-location]
  (marker! map {:position current-location
                :info "Du er her"
                :name "Du er her"
                :icon {:url "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
           (partial zoom-to-position map))
  (.setCenter map (clj->js current-location)))


(defn render-station [{:keys [station-id name bikes-available docks-available
                              position] :as station}]
  [:tr {:on-click (fn [_]
                    (let [{:keys [map markers]} @app-state
                          {:keys [marker info-window]} (markers station-id)]
                      (zoom-to-position map
                                        (clj->js position))
                      (.open info-window map marker)))
        :style {:cursor "pointer"}}
   [:td name]
   [:td bikes-available]
   [:td docks-available]])

(defn render-stations [stations]
  [:table.bike-table
   [:thead
    [:tr
     [:th "Stasjon"] [:th "Ledige sykler"] [:th "Ledige plasser"]]]
   [:tbody
    (for [s (sort-by :name stations)]
      ^{:key (:station-id s)}
      [render-station s])]])

(defn place-markers! [map station-info]
  (into {}
        (for [station station-info]
          [(:station-id station) (marker! map (select-keys station [:position :info :name])
                                          (partial zoom-to-position map))])))

(defn map-did-mount [this]
  (let [map-canvas (reagent/dom-node this)
        map-options (clj->js {"center" (js/google.maps.LatLng. 59.911491, 10.757933)
                              "zoom" 12})
        map (js/google.maps.Map. map-canvas map-options)
        markers (place-markers! map (:station-info @app-state))]
    (swap! app-state add-map {:map map :markers markers})))

(defn map-render []
  [:div {:style {:height "600px"}}])

(defn bike-map []
  (reagent/create-class {:reagent-render map-render
                         :component-did-mount map-did-mount}))

(defn city-bike []
  (let [{:keys [station-info map current-location markers] :as state} @app-state]
    (when (and map current-location)
      (render-location map current-location))
    [:div
     (cond (or (:fetching-status state)
               (:fetching-stations state))
           [:div "Loading"]
           (:error-stations state)
           [:div "Error fetching stations"]
           (:error-status state)
           [:div "Error fetching station-status"]
           :else
           [:div
            [bike-map]
            [render-stations station-info]])]))

(defn get-app-element []
  (gdom/getElement "app"))

(defn mount [el]
  (reagent/render-component [city-bike] el))

(defn mount-app-element []
  (when-let [el (get-app-element)]
    (mount el)))

(mount-app-element)
(stations!)
(station-status!)
(current-location!)

(ns ^:figwheel-hooks bysykkel.core
  (:require
   [bysykkel.bike-map :as bike-map]
   [goog.dom :as gdom]
   [reagent.core :as reagent :refer [atom]]))

(defonce app-state (atom {}))

(def base-url "/api")

(defn station-info [{:keys [name bikes-available docks-available] :as station}]
  (str "<div>"
       "<h3>" name "</h3>"
       "<div>Ledige sykler: " bikes-available "</div>"
       "<div>Ledige plasser: " docks-available "</div>"
       "</div>"))

(defn toggle-station-selected [app-state station-id]
  (update app-state :stations (fn [stations]
                                (reduce (fn [stations station]
                                          (conj stations
                                                (if (= station-id (:station-id station))
                                                  (update station :selected? not)
                                                  station))) [] stations))))

(defn handle-current-location [state pos]
  (assoc state :current-location {:lat pos.coords.latitude
                                  :lng pos.coords.longitude}))

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

(defn stations-fetched [app-state stations]
  (assoc app-state :stations (map #(assoc %
                                          :info (station-info %)
                                          :selected? false)
                                  stations)))

(defn fetch [url id ok]
  (swap! app-state fetch-initialized id)
  (-> (js/fetch url)
      (.then (fn [r]
               (if (.-ok r)
                 (-> (.json r)
                     (.then (fn [j]
                              (swap! app-state ok (js->clj j :keywordize-keys true))
                              (swap! app-state fetch-ok id))))
                 (swap! app-state fetch-error id r))))))

(defn stations! []
  (fetch (str base-url "/stations") "stations" stations-fetched))

(defn current-location! []
  (js/navigator.geolocation.getCurrentPosition
   (fn [loc]
     (swap! app-state handle-current-location loc))))

(defn handle-toggle-station [station-id]
  (swap! app-state toggle-station-selected station-id))

(defn render-station [{:keys [station-id name bikes-available docks-available
                              position selected?] :as station}]
  [:tr {:on-click (fn [_] (handle-toggle-station station-id))
        :style (merge {:cursor "pointer"}
                      (when selected?
                        {:background-color "#FFF8DC"}))}
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

(defn bike-map-renderer []
  [:div {:style {:height "600px"}}])

(defn city-bike []
  (let [{:keys [stations current-location] :as state} @app-state]
    [:div
     [bike-map/bike-map
      stations current-location
      {::bike-map/renderer bike-map-renderer
       ::bike-map/marker-clicked handle-toggle-station
       ::bike-map/info-window-closed handle-toggle-station}]
     (cond (:fetching-stations state)
           [:div "Loading"]
           (:error-stations state)
           [:div "Error fetching stations"]
           :else
           [:div
            [render-stations stations]])]))

(defn get-app-element []
  (gdom/getElement "app"))

(defn mount [el]
  (reagent/render-component [city-bike] el))

(defn mount-app-element []
  (when-let [el (get-app-element)]
    (mount el)))

(mount-app-element)
(stations!)
(current-location!)

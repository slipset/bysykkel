(ns ^:figwheel-hooks bysykkel.core
  (:require
   [goog.dom :as gdom]
   [reagent.core :as reagent :refer [atom]]))

(defonce app-state (atom {}))

(def base-url "https://gbfs.urbansharing.com/oslobysykkel.no")

(defn fetch [url opts ok error]
  (-> (js/fetch url opts)
      (.then (fn [r]
               (if (.-ok r)
                 (-> (.json r)
                     (.then (fn [j]
                              (swap! app-state ok (js->clj j :keywordize-keys true)))))
                 (swap! app-state error r))))))

(defn handle-station-status-ok [app-state data]
  (assoc app-state :station-status
         (->> (get-in data [:data :stations])
              (group-by :station_id)
              (reduce-kv (fn [acc k v] (assoc acc k (first v))) {}))
         :fetching-status nil))

(defn handle-station-status-error [app-state _]
  (assoc app-state :error-status true :fetching-status nil))

(defn station-status []
  (swap! app-state assoc :fetching-status true :error-status nil)
  (fetch (str base-url "/station_status.json") {}
         handle-station-status-ok handle-station-status-error))

(defn handle-stations-ok [app-state data]
  (assoc app-state :stations
         (get-in data [:data :stations])
         :fetching-stations nil))

(defn handle-stations-error [_]
  (assoc app-state :error-stations true :fetching-stations nil))

(defn stations []
  (swap! app-state assoc :fetching-stations true :error-stations nil)
  (fetch (str base-url "/station_information.json") {}
         handle-stations-ok
         handle-stations-error))

(defn station-info [station-status {:keys [station_id] :as station}]
  (merge station (station-status (str station_id))))

(defn render-station [{:keys [name num_bikes_available num_docks_available] :as station}]
  ^{:key (:station_id station)} [:tr
                                 [:td name]
                                 [:td num_bikes_available]
                                 [:td num_docks_available]])

(defn render-stations [{:keys [stations station-status]}]
  [:table.bike-table
   [:thead
    [:tr
     [:th "Stasjon"] [:th "Ledige sykler"] [:th "Ledige plasser"]]]
   [:tbody
    (doall (for [s (sort-by :name stations)]
             (render-station (station-info station-status s))))]])

(defn city-bike []
  (let [state @app-state]
    [:div
     (cond (or (:fetching-status state)
               (:fetching-stations state))
           [:div "Loading"]
           (:error-stations state)
           [:div "Error fetching stations"]
           (:error-status state)
           [:div "Error fetching station-status"]
           :else
           (render-stations state))]))

(defn get-app-element []
  (gdom/getElement "app"))

(defn mount [el]
  (reagent/render-component [city-bike] el))

(defn mount-app-element []
  (when-let [el (get-app-element)]
    (mount el)))

(mount-app-element)
(stations)
(station-status)


(ns bysykkel.bike-map
  (:require [reagent.core :as reagent :refer [atom]]
            [clojure.set :as set]))

(defn diff [new old]
  (let [old-ids (set (map :id old))
        new-ids (set (map :id new))
        to-remove (set/difference old-ids new-ids)
        to-add (set/difference new-ids old-ids)
        to-update (set/difference (set (map :id (set/difference (set new) (set old))))
                                  to-remove to-add)]
     {:remove to-remove
      :add to-add
      :update to-update
      :unchanged (set/difference old-ids to-remove to-update)}))

(defn transmogrify [new-markers old-markers {:keys [remove add update unchanged] :as diff}]
  {:add (filter (comp add :id) new-markers)
   :update {:old-by-id (reduce-kv (fn [a {:keys [id]}  v]
                                    (if (update id)
                                      (assoc a id v)
                                      a)) {} old-markers)
            :new (filter (comp update :id) new-markers)}
   :unchanged (into {} (filter (comp unchanged :id first) old-markers))
   :remove (filter (comp remove :id) (vals old-markers))})

(defn ->station-marker [click-handlers
                        {:keys [station-id info position name selected?] :as station}]
  {:id station-id
   :selected? selected?
   :info-window {:content info}
   :marker (merge {:position position
                   :title name})
   :click-handlers click-handlers})

(defn ->location-marker [click-handlers location]
  {:marker {:title "Du er her"
            :position location
            :icon {:url "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
   :click-handlers click-handlers})

(defn pan-to! [map position]
    (.panTo map position))

(defn zoom-to-position [map marker]
  (pan-to! map (.getPosition marker))
  (.setZoom map 16))

(defn update-marker! [map old-marker {:keys [id selected?] :as data}]
  (let [info-window (aget old-marker "info-window")]
    (if selected?
      (do (and info-window (.open info-window map old-marker))
            (zoom-to-position map old-marker))
      (and info-window (.close info-window))))
  [data old-marker])

(defn add-marker! [map {:keys [id marker info-window selected? click-handlers] :as data}]
  (let [{:keys [::marker-clicked ::info-window-closed]} click-handlers
        info-window (when info-window (js/google.maps.InfoWindow. (clj->js info-window)))
        map-marker (js/google.maps.Marker. (clj->js (assoc marker
                                                       :map map
                                                       :info-window info-window)))]

    (.addListener map-marker "click" (fn [_] (marker-clicked id)))

    (when info-window
      (js/google.maps.event.addListener.
       info-window "closeclick"
       (fn [] (info-window-closed id))))
    (when selected?
      (zoom-to-position map map-marker)
      (when info-window
        (.open info-window map map-marker)))
    [data map-marker]))

(defn add-markers! [map-canvas markers]
  (->> markers
       (map (partial add-marker! map-canvas))
       (into {})))

(defn remove-markers! [markers]
  (doseq [marker markers]
    (.setMap marker nil)))

(defn update-markers! [map-canvas {:keys [old-by-id new]}]
  (into {} (for [marker new]
             (update-marker! map-canvas (old-by-id (:id marker)) marker))))

(defn render-markers! [map-canvas {:keys [remove add update unchanged]}]
  (remove-markers! remove)
  (merge (add-markers! map-canvas add) (update-markers! map-canvas update) unchanged))

(defn update-location! [[value marker] map-canvas new-marker]
  (let [location (get-in new-marker [:marker :position])]
    (if marker
      (if-not (= (get-in value [:marker :position])
                 location)
        (do
          (pan-to! map-canvas (clj->js location))
          (update-marker! map-canvas marker new-marker))
        [value marker])
      (do
        (pan-to! map-canvas (clj->js location))
        (add-marker! map-canvas new-marker)))))

(defn bike-map [stations location handlers]
  (let [canvas (atom {:map nil :markers {} :location []})]
    (reagent/create-class
     {:display-name "bike-map"
      :reagent-render (::renderer handlers)
      :component-did-mount (fn [this]
                             (let [map-canvas (reagent/dom-node this)
                                   map-options (clj->js {"center" (js/google.maps.LatLng. 59.911491, 10.757933)
                                                         "zoom" 12})]
                               (swap! canvas assoc :map (js/google.maps.Map. map-canvas map-options))))
      :component-did-update (fn [this old-argv]
                              (let [[_ stations location] (reagent/argv this)
                                    map-canvas (:map @canvas)
                                    new-markers (map (partial ->station-marker handlers) stations)]

                                (swap! canvas update :markers (fn [old-markers]
                                                                (->> old-markers
                                                                     keys
                                                                     (diff new-markers)
                                                                     (transmogrify new-markers old-markers)
                                                                     (render-markers! map-canvas))))
                                (when location
                                  (let [new-marker (->location-marker {::marker-clicked (constantly nil)
                                                                       ::info-window-closed (constantly nil)} location)]
                                    (swap! canvas update :location update-location! map-canvas new-marker)))))})))

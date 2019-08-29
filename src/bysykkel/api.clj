(ns bysykkel.api
  (:require [clj-http.client :as http]
            [cheshire.core :as json]))

(def base-url "https://gbfs.urbansharing.com/oslobysykkel.no")

(defn fetch! [url]
  (-> (http/get url)
       :body
       (json/decode true)
       (get-in [:data :stations])))

(defn station-info [station-status {:keys [station_id lat lon name] :as station}]
  (let [{:keys [num_bikes_available num_docks_available] :as status} (station-status station_id)]
    {:station-id station_id
     :bikes-available num_bikes_available
     :docks-available num_docks_available
     :name name
     :position {:lat lat :lng lon}}))

(defn calculate-station-info [stations station-status]
  (when (and (seq stations) (seq station-status))
    (let [status-by-id (->> station-status
                            (group-by :station_id)
                            (reduce-kv (fn [acc k v] (assoc acc k (first v))) {}))]
      (map (partial station-info status-by-id) stations))))

(defn handle-stations-request []
  (try
    {:status 200
     :body (json/encode (calculate-station-info (fetch! (str base-url "/station_information.json"))
                                                (fetch! (str base-url "/station_status.json"))))}
    (catch Exception e
      (if-let [data (ex-data e)]
        {:status (:status data)
         :body (:reason data)}
        {:status 500
         :body (.getMessage e)}))))

(defn dispatch [{:keys [uri request-method] :as req}]
  (cond (and (= uri "/api/stations")
             (= request-method :get))
        (merge {:headers {"Content-Type" "application/json"}}
               (handle-stations-request))
        :else
        {:status 404
         :headers {"Content-Type" "application/json"}
         :body "Not found"}))

(defn handler [req]
  (dispatch req))

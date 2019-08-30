(ns bysykkel.api-test
  (:require [bysykkel.api :refer :all]
            [clojure.test :refer :all]
            [cheshire.core :as json]
            [clj-http.client :as http]))

(deftest calculate-station-info-test
  (testing "Returns nil when either stations or station-status are empty"
    (are [stations station-status] (nil? (calculate-station-info stations station-status))
         nil nil
         [] nil
         nil []
         (range 3) nil
         nil (range 3)
         [] []))
  (testing "Stations are augmented with data from station-status"
    (let [station {:station_id 1 :name "lol" :lat 1 :lon 2}
          station-status {:station_id 1 :num_bikes_available 3 :num_docks_available 1}]
      (is (= [{:station-id 1
               :name "lol"
               :position {:lat 1 :lng 2}
               :bikes-available 3
               :docks-available 1}]
             (calculate-station-info [station] [station-status]))))))

(deftest dispatch-test
  (with-redefs [handle-stations-request (fn [] {:body 'yay
                                                :status 200})]
    (testing "Correct request gives correct response"
      (is (= {:headers {"Content-Type" "application/json"}
              :status 200
              :body 'yay} (dispatch {:uri "/api/stations"
                                     :request-method :get})))
      (are [req] (= {:headers {"Content-Type" "application/json"}
                     :status 404
                     :body "Not found"}
                    (dispatch req))
        {:uri "lol"
         :request-method :get}
        {:uri "/api/stations"
         :request-method :post}))))

(deftest handle-stations-request-test
  (testing "Works like a charm"
    (with-redefs [calculate-station-info (fn [_ _] {:foo "bar"})]
      (is (= {:status 200
              :body (json/encode {:foo "bar"})}
             (handle-stations-request)))))
  (testing "Handles http-exceptions"
    (with-redefs [fetch! (fn [url] (throw (ex-info "lol" {:status 403 :reason "forbidden"})))]
      (is (= {:status 403
              :body "forbidden"}
             (handle-stations-request)))))
  (testing "Handles other exceptions"
    (with-redefs [fetch! (fn [url] (throw (Exception. "lol")))]
      (is (= {:status 500
              :body "lol"}
             (handle-stations-request))))))

(deftest fetch-test
  (testing "Happypath"
    (with-redefs [http/get (fn [url] {:body (json/encode {:data {:stations {:url url}}})})]
      (is (= {:url "foo"} (fetch! "foo"))))))

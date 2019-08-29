(ns bysykkel.core-test
  (:require
   [cljs.test :refer-macros [deftest is testing]]
   [bysykkel.core :as sut]))

(deftest toggle-station-selected-test
  (testing "a selected station is set as selected"
    (let [app-state {:stations [{:station-id 1} {:station-id 2}]}]
      (is (= {:stations [{:station-id 1 :selected? true}
                         {:station-id 2}]}
             (sut/toggle-station-selected app-state 1)))))
    (testing "a selected station is set as selected"
      (let [app-state {:stations [{:station-id 1} {:station-id 2 :selected? true}]}]
        (is (= {:stations [{:station-id 1}
                           {:station-id 2 :selected? false}]}
               (sut/toggle-station-selected app-state 2)))))
      (testing "other stations are not affected"
      (let [app-state {:stations [{:station-id 1 :selected? true} {:station-id 2 :selected? false}]}]
        (is (= {:stations [{:station-id 1 :selected? true}
                           {:station-id 2 :selected? true}]}
               (sut/toggle-station-selected app-state 2))))))

(deftest handle-current-location-test
  (testing "happypath"
    (is (= {:current-location {:lat 3 :lng 4}}
           (sut/handle-current-location {} (clj->js {:coords {:latitude 3 :longitude 4}}))))))

(deftest stations-fetched-test
  (testing "happypath"
    (let [station {:station-id 1
                   :name "foo"
                   :bikes-available 3
                   :docks-avialable 4}
          augmented-station (merge station {:info (sut/station-info station) :selected? false})]
      (is (= {:stations (list augmented-station)}
             (sut/stations-fetched {} [station]))))))

(deftest fetch-initialized-test
  (testing "happy-path"
    (is (= {:fetching-lol true :error-lol nil}
           (sut/fetch-initialized {} "lol")))))

(deftest fetch-initialized-ok
  (testing "happy-path"
    (is (= {:fetching-lol nil :error-lol nil}
           (sut/fetch-ok {} "lol")))))

(deftest fetch-initialized-error
  (testing "happy-path"
    (is (= {:fetching-lol nil :error-lol "bad-fetch"}
           (sut/fetch-error {} "lol" "bad-fetch")))))

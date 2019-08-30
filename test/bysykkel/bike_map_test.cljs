(ns bysykkel.bike-map-test
  (:require [bysykkel.bike-map :as sut]
            [cljs.test :refer-macros [deftest is testing]]))

(deftest diff-test
  (testing "all new"
    (is (= {:add #{1 2} :remove #{} :update #{} :unchanged #{}}
           (sut/diff [{:id 1 :foo 'lol} {:id 2 :foo 1}] nil)))
    (is (= {:add #{1 2} :remove #{} :update #{} :unchanged #{}}
           (sut/diff [{:id 1 :foo 'lol} {:id 2 :foo 1}] []))))
  (testing "all old"
    (is (= {:add #{} :remove #{1 2} :update #{} :unchanged #{}}
           (sut/diff nil [{:id 1 :foo 'lol} {:id 2 :foo 1}])))
    (is (= {:add #{} :remove #{1 2} :update #{} :unchanged #{}}
           (sut/diff [] [{:id 1 :foo 'lol} {:id 2 :foo 1}]))))
  (testing "all equal"
    (is (= {:add #{} :remove #{} :update #{} :unchanged #{1 2}}
           (sut/diff [{:id 1 :foo 'lol} {:id 2 :foo 1}] [{:id 1 :foo 'lol} {:id 2 :foo 1}]))))
  (testing "some change"
    (is (= {:add #{3} :remove #{4} :update #{2} :unchanged #{1}}
           (sut/diff [{:id 1 :foo 'lol} {:id 2 :foo 1} {:id 3 :foo 2}]
                     [{:id 1 :foo 'lol} {:id 2 :foo 2} {:id 4 :foo 'lol}])))))

(def diff {:add #{1}
           :remove #{2}
           :unchanged #{3 4}
           :update #{5}})

(def new-markers [{:id 1 :lol 'l} {:id 3 :lol 'b} {:id 4 :lol 's} {:id 5 :lol 'bla}])
(def old-markers {{:id 2 :lol 'l} {:id 2 :lol 'l :zomg 'lala}
                  {:id 3 :lol 'b} {:id 3 :lol 'b :zomg 'lala}
                  {:id 4 :lol 's} {:id 4 :lol 's :zomg 'bala}
                  {:id 5 :lol 'ble} {:id 5 :lol 'ble :zomg 'ble}})

(def expected {:add (list {:id 1 :lol 'l})
               :remove (list {:id 2 :lol 'l :zomg 'lala})
               :unchanged {{:id 3 :lol 'b} {:id 3 :lol 'b :zomg 'lala}
                           {:id 4 :lol 's} {:id 4 :lol 's :zomg 'bala}}
               :update {:old-by-id {5 {:id 5 :lol 'ble :zomg 'ble}}
                        :new (list {:id 5 :lol 'bla})}})

(deftest transmogrify-test
  (testing "a happy path"
    (is (= expected
           (sut/transmogrify new-markers old-markers diff)))))


(deftest ->station-marker-test
  (testing "happy path"
    (is (= {:id 1
            :selected? false
            :info-window {:content "lol"}
            :marker {:position 'p
                     :title "name"}
            :click-handlers 'click-handlers}
           (sut/->station-marker 'click-handlers {:station-id 1 :selected? false :position 'p :name "name" :info "lol"})))))

(deftest ->location-marker-test
  (testing "happy path"
    (is (= {:marker {:position 'p
                     :title "Du er her"
                     :icon {:url "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}}
            :click-handlers 'click-handlers}
           (sut/->location-marker 'click-handlers 'p)))))

(deftest update-location-test
  (testing "Adds marker when no marker exists"
    (let [loc {"a" "b"}]
      (with-redefs [sut/add-marker! (fn [m new-marker] [new-marker 'map-marker])
                    sut/pan-to! (fn [m l]
                                 (when (or (not= m 'map-canvas) (not= (js->clj l) loc))
                                   (throw (js/Error.))))]
        (let [new-marker {:marker {:position loc}}]
          (is (= [new-marker 'map-marker]
                 (sut/update-location! [] 'map-canvas new-marker)))))))
  (testing "Updates marker when the new marker has new position"
    (let [loc {"a" "b"}]
      (with-redefs [sut/update-marker! (fn [m marker new-marker] [new-marker marker])
                    sut/pan-to! (fn [m l]
                                 (when (or (not= m 'map-canvas) (not= (js->clj l) loc))
                                   (throw (js/Error.))))]
        (let [new-marker {:marker {:position loc}}]
          (is (= [new-marker 'marker]
                 (sut/update-location! [{:marker {:position 'o}} 'marker] 'map-canvas new-marker)))))))
  (testing "Changes nothing when positions are equal"
    (with-redefs [sut/update-marker! (fn [m marker new-marker] (throw js/Error.))
                  sut/add-marker! (fn [m new-marker] (throw js/Error.))
                  sut/pan-to! (fn [m l] (throw (js/Error.)))]
      (let [new-marker {:marker {:position 'p}}]
        (is (= [new-marker 'marker]
               (sut/update-location! [{:marker {:position 'p}} 'marker] 'map-canvas new-marker)))))))

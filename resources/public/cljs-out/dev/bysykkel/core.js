// Compiled by ClojureScript 1.10.339 {:static-fns true, :optimize-constants true}
goog.provide('bysykkel.core');
goog.require('cljs.core');
goog.require('cljs.core.constants');
goog.require('goog.dom');
goog.require('reagent.core');
if((typeof bysykkel !== 'undefined') && (typeof bysykkel.core !== 'undefined') && (typeof bysykkel.core.app_state !== 'undefined')){
} else {
bysykkel.core.app_state = reagent.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
}
bysykkel.core.base_url = "https://gbfs.urbansharing.com/oslobysykkel.no";
bysykkel.core.fetch = (function bysykkel$core$fetch(url,opts,ok,error){
return fetch(url,opts).then((function (r){
if(cljs.core.truth_(r.ok)){
return r.json().then((function (j){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(bysykkel.core.app_state,ok,cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(j,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$keywordize_DASH_keys,true], 0)));
}));
} else {
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(bysykkel.core.app_state,error,r);
}
}));
});
bysykkel.core.handle_station_status_ok = (function bysykkel$core$handle_station_status_ok(app_state,data){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(app_state,cljs.core.cst$kw$station_DASH_status,cljs.core.reduce_kv((function (acc,k,v){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(acc,k,cljs.core.first(v));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.group_by(cljs.core.cst$kw$station_id,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$data,cljs.core.cst$kw$stations], null)))),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$fetching_DASH_status,null], 0));
});
bysykkel.core.handle_station_status_error = (function bysykkel$core$handle_station_status_error(app_state,_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(app_state,cljs.core.cst$kw$error_DASH_status,true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$fetching_DASH_status,null], 0));
});
bysykkel.core.station_status = (function bysykkel$core$station_status(){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(bysykkel.core.app_state,cljs.core.assoc,cljs.core.cst$kw$fetching_DASH_status,true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$error_DASH_status,null], 0));

return bysykkel.core.fetch([cljs.core.str.cljs$core$IFn$_invoke$arity$1(bysykkel.core.base_url),"/station_status.json"].join(''),cljs.core.PersistentArrayMap.EMPTY,bysykkel.core.handle_station_status_ok,bysykkel.core.handle_station_status_error);
});
bysykkel.core.handle_stations_ok = (function bysykkel$core$handle_stations_ok(app_state,data){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(app_state,cljs.core.cst$kw$stations,cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$data,cljs.core.cst$kw$stations], null)),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$fetching_DASH_stations,null], 0));
});
bysykkel.core.handle_stations_error = (function bysykkel$core$handle_stations_error(_){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(bysykkel.core.app_state,cljs.core.cst$kw$error_DASH_stations,true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$fetching_DASH_stations,null], 0));
});
bysykkel.core.stations = (function bysykkel$core$stations(){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(bysykkel.core.app_state,cljs.core.assoc,cljs.core.cst$kw$fetching_DASH_stations,true,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.cst$kw$error_DASH_stations,null], 0));

return bysykkel.core.fetch([cljs.core.str.cljs$core$IFn$_invoke$arity$1(bysykkel.core.base_url),"/station_information.json"].join(''),cljs.core.PersistentArrayMap.EMPTY,bysykkel.core.handle_stations_ok,bysykkel.core.handle_stations_error);
});
bysykkel.core.station_info = (function bysykkel$core$station_info(station_status,p__10408){
var map__10409 = p__10408;
var map__10409__$1 = ((((!((map__10409 == null)))?(((((map__10409.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__10409.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10409):map__10409);
var station = map__10409__$1;
var station_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10409__$1,cljs.core.cst$kw$station_id);
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([station,(function (){var G__10411 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(station_id)].join('');
return (station_status.cljs$core$IFn$_invoke$arity$1 ? station_status.cljs$core$IFn$_invoke$arity$1(G__10411) : station_status.call(null,G__10411));
})()], 0));
});
bysykkel.core.render_station = (function bysykkel$core$render_station(p__10412){
var map__10413 = p__10412;
var map__10413__$1 = ((((!((map__10413 == null)))?(((((map__10413.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__10413.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10413):map__10413);
var station = map__10413__$1;
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10413__$1,cljs.core.cst$kw$name);
var num_bikes_available = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10413__$1,cljs.core.cst$kw$num_bikes_available);
var num_docks_available = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10413__$1,cljs.core.cst$kw$num_docks_available);
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,num_bikes_available], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$td,num_docks_available], null)], null),new cljs.core.PersistentArrayMap(null, 1, [cljs.core.cst$kw$key,cljs.core.cst$kw$station_id.cljs$core$IFn$_invoke$arity$1(station)], null));
});
bysykkel.core.render_stations = (function bysykkel$core$render_stations(p__10415){
var map__10416 = p__10415;
var map__10416__$1 = ((((!((map__10416 == null)))?(((((map__10416.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__10416.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.cljs$core$IFn$_invoke$arity$2(cljs.core.hash_map,map__10416):map__10416);
var stations = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10416__$1,cljs.core.cst$kw$stations);
var station_status = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__10416__$1,cljs.core.cst$kw$station_DASH_status);
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$table$bike_DASH_table,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$thead,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tr,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"Stasjon"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"Ledige sykler"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$th,"Ledige plasser"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$tbody,cljs.core.doall.cljs$core$IFn$_invoke$arity$1((function (){var iter__4324__auto__ = ((function (map__10416,map__10416__$1,stations,station_status){
return (function bysykkel$core$render_stations_$_iter__10418(s__10419){
return (new cljs.core.LazySeq(null,((function (map__10416,map__10416__$1,stations,station_status){
return (function (){
var s__10419__$1 = s__10419;
while(true){
var temp__5457__auto__ = cljs.core.seq(s__10419__$1);
if(temp__5457__auto__){
var s__10419__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_(s__10419__$2)){
var c__4322__auto__ = cljs.core.chunk_first(s__10419__$2);
var size__4323__auto__ = cljs.core.count(c__4322__auto__);
var b__10421 = cljs.core.chunk_buffer(size__4323__auto__);
if((function (){var i__10420 = (0);
while(true){
if((i__10420 < size__4323__auto__)){
var s = cljs.core._nth.cljs$core$IFn$_invoke$arity$2(c__4322__auto__,i__10420);
cljs.core.chunk_append(b__10421,bysykkel.core.render_station(bysykkel.core.station_info(station_status,s)));

var G__10422 = (i__10420 + (1));
i__10420 = G__10422;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__10421),bysykkel$core$render_stations_$_iter__10418(cljs.core.chunk_rest(s__10419__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__10421),null);
}
} else {
var s = cljs.core.first(s__10419__$2);
return cljs.core.cons(bysykkel.core.render_station(bysykkel.core.station_info(station_status,s)),bysykkel$core$render_stations_$_iter__10418(cljs.core.rest(s__10419__$2)));
}
} else {
return null;
}
break;
}
});})(map__10416,map__10416__$1,stations,station_status))
,null,null));
});})(map__10416,map__10416__$1,stations,station_status))
;
return iter__4324__auto__(cljs.core.sort_by.cljs$core$IFn$_invoke$arity$2(cljs.core.cst$kw$name,stations));
})())], null)], null);
});
bysykkel.core.city_bike = (function bysykkel$core$city_bike(){
var state = cljs.core.deref(bysykkel.core.app_state);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,(cljs.core.truth_((function (){var or__3949__auto__ = cljs.core.cst$kw$fetching_DASH_status.cljs$core$IFn$_invoke$arity$1(state);
if(cljs.core.truth_(or__3949__auto__)){
return or__3949__auto__;
} else {
return cljs.core.cst$kw$fetching_DASH_stations.cljs$core$IFn$_invoke$arity$1(state);
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Loading"], null):(cljs.core.truth_(cljs.core.cst$kw$error_DASH_stations.cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Error fetching stations"], null):(cljs.core.truth_(cljs.core.cst$kw$error_DASH_status.cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cst$kw$div,"Error fetching station-status"], null):bysykkel.core.render_stations(state)
)))], null);
});
bysykkel.core.get_app_element = (function bysykkel$core$get_app_element(){
return goog.dom.getElement("app");
});
bysykkel.core.mount = (function bysykkel$core$mount(el){
var G__10423 = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.city_bike], null);
var G__10424 = el;
return (reagent.core.render_component.cljs$core$IFn$_invoke$arity$2 ? reagent.core.render_component.cljs$core$IFn$_invoke$arity$2(G__10423,G__10424) : reagent.core.render_component.call(null,G__10423,G__10424));
});
bysykkel.core.mount_app_element = (function bysykkel$core$mount_app_element(){
var temp__5457__auto__ = bysykkel.core.get_app_element();
if(cljs.core.truth_(temp__5457__auto__)){
var el = temp__5457__auto__;
return bysykkel.core.mount(el);
} else {
return null;
}
});
bysykkel.core.mount_app_element();
bysykkel.core.stations();
bysykkel.core.station_status();

// Compiled by ClojureScript 1.10.339 {}
goog.provide('bysykkel.core');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('reagent.core');
if((typeof bysykkel !== 'undefined') && (typeof bysykkel.core !== 'undefined') && (typeof bysykkel.core.app_state !== 'undefined')){
} else {
bysykkel.core.app_state = reagent.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}
bysykkel.core.base_url = "https://gbfs.urbansharing.com/oslobysykkel.no";
bysykkel.core.fetch = (function bysykkel$core$fetch(url,opts,ok,error){
return fetch(url,opts).then((function (r){
if(cljs.core.truth_(r.ok)){
return r.json().then((function (j){
return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,ok,cljs.core.js__GT_clj.call(null,j,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
}));
} else {
return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,error,r);
}
}));
});
bysykkel.core.handle_station_status_ok = (function bysykkel$core$handle_station_status_ok(app_state,data){
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"station-status","station-status",1432215775),cljs.core.reduce_kv.call(null,(function (acc,k,v){
return cljs.core.assoc.call(null,acc,k,cljs.core.first.call(null,v));
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"station_id","station_id",-1476260078),cljs.core.get_in.call(null,data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"stations","stations",-19744730)], null)))),new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451),null);
});
bysykkel.core.handle_station_status_error = (function bysykkel$core$handle_station_status_error(app_state,_){
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"error-status","error-status",-215021424),true,new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451),null);
});
bysykkel.core.station_status = (function bysykkel$core$station_status(){
cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451),true,new cljs.core.Keyword(null,"error-status","error-status",-215021424),null);

return bysykkel.core.fetch.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(bysykkel.core.base_url),"/station_status.json"].join(''),cljs.core.PersistentArrayMap.EMPTY,bysykkel.core.handle_station_status_ok,bysykkel.core.handle_station_status_error);
});
bysykkel.core.handle_stations_ok = (function bysykkel$core$handle_stations_ok(app_state,data){
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"stations","stations",-19744730),cljs.core.get_in.call(null,data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"stations","stations",-19744730)], null)),new cljs.core.Keyword(null,"fetching-stations","fetching-stations",287803144),null);
});
bysykkel.core.handle_stations_error = (function bysykkel$core$handle_stations_error(app_state,_){
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"error-stations","error-stations",134023399),true,new cljs.core.Keyword(null,"fetching-stations","fetching-stations",287803144),null);
});
bysykkel.core.stations = (function bysykkel$core$stations(){
cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"fetching-stations","fetching-stations",287803144),true,new cljs.core.Keyword(null,"error-stations","error-stations",134023399),null);

return bysykkel.core.fetch.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(bysykkel.core.base_url),"/station_information.json"].join(''),cljs.core.PersistentArrayMap.EMPTY,bysykkel.core.handle_stations_ok,bysykkel.core.handle_stations_error);
});
bysykkel.core.station_info = (function bysykkel$core$station_info(station_status,p__30521){
var map__30522 = p__30521;
var map__30522__$1 = ((((!((map__30522 == null)))?(((((map__30522.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30522.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30522):map__30522);
var station = map__30522__$1;
var station_id = cljs.core.get.call(null,map__30522__$1,new cljs.core.Keyword(null,"station_id","station_id",-1476260078));
return cljs.core.merge.call(null,station,station_status.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(station_id)].join('')));
});
bysykkel.core.render_station = (function bysykkel$core$render_station(p__30524){
var map__30525 = p__30524;
var map__30525__$1 = ((((!((map__30525 == null)))?(((((map__30525.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30525.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30525):map__30525);
var station = map__30525__$1;
var name = cljs.core.get.call(null,map__30525__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var num_bikes_available = cljs.core.get.call(null,map__30525__$1,new cljs.core.Keyword(null,"num_bikes_available","num_bikes_available",-1196257282));
var num_docks_available = cljs.core.get.call(null,map__30525__$1,new cljs.core.Keyword(null,"num_docks_available","num_docks_available",-2123006306));
return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),num_bikes_available], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),num_docks_available], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"station_id","station_id",-1476260078).cljs$core$IFn$_invoke$arity$1(station)], null));
});
bysykkel.core.render_stations = (function bysykkel$core$render_stations(p__30527){
var map__30528 = p__30527;
var map__30528__$1 = ((((!((map__30528 == null)))?(((((map__30528.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__30528.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__30528):map__30528);
var stations = cljs.core.get.call(null,map__30528__$1,new cljs.core.Keyword(null,"stations","stations",-19744730));
var station_status = cljs.core.get.call(null,map__30528__$1,new cljs.core.Keyword(null,"station-status","station-status",1432215775));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.bike-table","table.bike-table",-954703409),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Stasjon"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ledige sykler"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ledige plasser"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__4324__auto__ = ((function (map__30528,map__30528__$1,stations,station_status){
return (function bysykkel$core$render_stations_$_iter__30530(s__30531){
return (new cljs.core.LazySeq(null,((function (map__30528,map__30528__$1,stations,station_status){
return (function (){
var s__30531__$1 = s__30531;
while(true){
var temp__5457__auto__ = cljs.core.seq.call(null,s__30531__$1);
if(temp__5457__auto__){
var s__30531__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__30531__$2)){
var c__4322__auto__ = cljs.core.chunk_first.call(null,s__30531__$2);
var size__4323__auto__ = cljs.core.count.call(null,c__4322__auto__);
var b__30533 = cljs.core.chunk_buffer.call(null,size__4323__auto__);
if((function (){var i__30532 = (0);
while(true){
if((i__30532 < size__4323__auto__)){
var s = cljs.core._nth.call(null,c__4322__auto__,i__30532);
cljs.core.chunk_append.call(null,b__30533,bysykkel.core.render_station.call(null,bysykkel.core.station_info.call(null,station_status,s)));

var G__30534 = (i__30532 + (1));
i__30532 = G__30534;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__30533),bysykkel$core$render_stations_$_iter__30530.call(null,cljs.core.chunk_rest.call(null,s__30531__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__30533),null);
}
} else {
var s = cljs.core.first.call(null,s__30531__$2);
return cljs.core.cons.call(null,bysykkel.core.render_station.call(null,bysykkel.core.station_info.call(null,station_status,s)),bysykkel$core$render_stations_$_iter__30530.call(null,cljs.core.rest.call(null,s__30531__$2)));
}
} else {
return null;
}
break;
}
});})(map__30528,map__30528__$1,stations,station_status))
,null,null));
});})(map__30528,map__30528__$1,stations,station_status))
;
return iter__4324__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),stations));
})()], null)], null);
});
bysykkel.core.city_bike = (function bysykkel$core$city_bike(){
var state = cljs.core.deref.call(null,bysykkel.core.app_state);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_((function (){var or__3949__auto__ = new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451).cljs$core$IFn$_invoke$arity$1(state);
if(cljs.core.truth_(or__3949__auto__)){
return or__3949__auto__;
} else {
return new cljs.core.Keyword(null,"fetching-stations","fetching-stations",287803144).cljs$core$IFn$_invoke$arity$1(state);
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Loading"], null):(cljs.core.truth_(new cljs.core.Keyword(null,"error-stations","error-stations",134023399).cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error fetching stations"], null):(cljs.core.truth_(new cljs.core.Keyword(null,"error-status","error-status",-215021424).cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error fetching station-status"], null):bysykkel.core.render_stations.call(null,state)
)))], null);
});
bysykkel.core.get_app_element = (function bysykkel$core$get_app_element(){
return goog.dom.getElement("app");
});
bysykkel.core.mount = (function bysykkel$core$mount(el){
return reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.city_bike], null),el);
});
bysykkel.core.mount_app_element = (function bysykkel$core$mount_app_element(){
var temp__5457__auto__ = bysykkel.core.get_app_element.call(null);
if(cljs.core.truth_(temp__5457__auto__)){
var el = temp__5457__auto__;
return bysykkel.core.mount.call(null,el);
} else {
return null;
}
});
bysykkel.core.mount_app_element.call(null);
bysykkel.core.stations.call(null);
bysykkel.core.station_status.call(null);

//# sourceMappingURL=core.js.map

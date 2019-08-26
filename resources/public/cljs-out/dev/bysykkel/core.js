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
bysykkel.core.station_info = (function bysykkel$core$station_info(station_status,p__23002){
var map__23003 = p__23002;
var map__23003__$1 = ((((!((map__23003 == null)))?(((((map__23003.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23003.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23003):map__23003);
var station = map__23003__$1;
var station_id = cljs.core.get.call(null,map__23003__$1,new cljs.core.Keyword(null,"station_id","station_id",-1476260078));
return cljs.core.merge.call(null,station,station_status.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(station_id)].join('')));
});
bysykkel.core.render_station = (function bysykkel$core$render_station(p__23005){
var map__23006 = p__23005;
var map__23006__$1 = ((((!((map__23006 == null)))?(((((map__23006.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23006.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23006):map__23006);
var station = map__23006__$1;
var name = cljs.core.get.call(null,map__23006__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var num_bikes_available = cljs.core.get.call(null,map__23006__$1,new cljs.core.Keyword(null,"num_bikes_available","num_bikes_available",-1196257282));
var num_docks_available = cljs.core.get.call(null,map__23006__$1,new cljs.core.Keyword(null,"num_docks_available","num_docks_available",-2123006306));
var lat = cljs.core.get.call(null,map__23006__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lon = cljs.core.get.call(null,map__23006__$1,new cljs.core.Keyword(null,"lon","lon",522068437));
var lat_lon_23008 = cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),parseFloat(lat),new cljs.core.Keyword(null,"lng","lng",1667213918),parseFloat(lon)], null));
var info_window_23009 = (new google.maps.InfoWindow(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content","content",15833224),["<div>","<h3>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"</h3>","<div>Ledige sykler: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(num_bikes_available),"</div>","<div>Ledige plasser: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(num_docks_available),"</div>","</div>"].join('')], null))));
var marker_23010 = (new google.maps.Marker(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"position","position",-2011731912),lat_lon_23008,new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.Keyword(null,"map","map",1371690461).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,bysykkel.core.app_state)),new cljs.core.Keyword(null,"title","title",636505583),name], null))));
marker_23010.addListener("click",((function (lat_lon_23008,info_window_23009,marker_23010,map__23006,map__23006__$1,station,name,num_bikes_available,num_docks_available,lat,lon){
return (function (_){
var map = new cljs.core.Keyword(null,"map","map",1371690461).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,bysykkel.core.app_state));
map.setZoom((16));

map.setCenter(marker_23010.getPosition());

return info_window_23009.open(map,marker_23010);
});})(lat_lon_23008,info_window_23009,marker_23010,map__23006,map__23006__$1,station,name,num_bikes_available,num_docks_available,lat,lon))
);

return cljs.core.with_meta(new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),num_bikes_available], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),num_docks_available], null)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"station_id","station_id",-1476260078).cljs$core$IFn$_invoke$arity$1(station)], null));
});
bysykkel.core.render_stations = (function bysykkel$core$render_stations(p__23011){
var map__23012 = p__23011;
var map__23012__$1 = ((((!((map__23012 == null)))?(((((map__23012.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__23012.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__23012):map__23012);
var stations = cljs.core.get.call(null,map__23012__$1,new cljs.core.Keyword(null,"stations","stations",-19744730));
var station_status = cljs.core.get.call(null,map__23012__$1,new cljs.core.Keyword(null,"station-status","station-status",1432215775));
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.bike-table","table.bike-table",-954703409),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Stasjon"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ledige sykler"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ledige plasser"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__4324__auto__ = ((function (map__23012,map__23012__$1,stations,station_status){
return (function bysykkel$core$render_stations_$_iter__23014(s__23015){
return (new cljs.core.LazySeq(null,((function (map__23012,map__23012__$1,stations,station_status){
return (function (){
var s__23015__$1 = s__23015;
while(true){
var temp__5457__auto__ = cljs.core.seq.call(null,s__23015__$1);
if(temp__5457__auto__){
var s__23015__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__23015__$2)){
var c__4322__auto__ = cljs.core.chunk_first.call(null,s__23015__$2);
var size__4323__auto__ = cljs.core.count.call(null,c__4322__auto__);
var b__23017 = cljs.core.chunk_buffer.call(null,size__4323__auto__);
if((function (){var i__23016 = (0);
while(true){
if((i__23016 < size__4323__auto__)){
var s = cljs.core._nth.call(null,c__4322__auto__,i__23016);
cljs.core.chunk_append.call(null,b__23017,bysykkel.core.render_station.call(null,bysykkel.core.station_info.call(null,station_status,s)));

var G__23018 = (i__23016 + (1));
i__23016 = G__23018;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23017),bysykkel$core$render_stations_$_iter__23014.call(null,cljs.core.chunk_rest.call(null,s__23015__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__23017),null);
}
} else {
var s = cljs.core.first.call(null,s__23015__$2);
return cljs.core.cons.call(null,bysykkel.core.render_station.call(null,bysykkel.core.station_info.call(null,station_status,s)),bysykkel$core$render_stations_$_iter__23014.call(null,cljs.core.rest.call(null,s__23015__$2)));
}
} else {
return null;
}
break;
}
});})(map__23012,map__23012__$1,stations,station_status))
,null,null));
});})(map__23012,map__23012__$1,stations,station_status))
;
return iter__4324__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),stations));
})()], null)], null);
});
bysykkel.core.home_did_mount = (function bysykkel$core$home_did_mount(this$){
var map_canvas = reagent.core.dom_node.call(null,this$);
var map_options = cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, ["center",(new google.maps.LatLng(59.911491,10.757933)),"zoom",(12)], null));
return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,cljs.core.assoc,new cljs.core.Keyword(null,"map","map",1371690461),(new google.maps.Map(map_canvas,map_options)));
});
bysykkel.core.home_render = (function bysykkel$core$home_render(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"600px"], null)], null)], null);
});
bysykkel.core.home = (function bysykkel$core$home(){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),bysykkel.core.home_render,new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),bysykkel.core.home_did_mount], null));
});
bysykkel.core.city_bike = (function bysykkel$core$city_bike(){
var state = cljs.core.deref.call(null,bysykkel.core.app_state);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_((function (){var or__3949__auto__ = new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451).cljs$core$IFn$_invoke$arity$1(state);
if(cljs.core.truth_(or__3949__auto__)){
return or__3949__auto__;
} else {
return new cljs.core.Keyword(null,"fetching-stations","fetching-stations",287803144).cljs$core$IFn$_invoke$arity$1(state);
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Loading"], null):(cljs.core.truth_(new cljs.core.Keyword(null,"error-stations","error-stations",134023399).cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error fetching stations"], null):(cljs.core.truth_(new cljs.core.Keyword(null,"error-status","error-status",-215021424).cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error fetching station-status"], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.home], null),bysykkel.core.render_stations.call(null,state)], null)
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

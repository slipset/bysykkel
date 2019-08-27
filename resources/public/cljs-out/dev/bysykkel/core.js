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
bysykkel.core.station_info = (function bysykkel$core$station_info(station_status,p__29644){
var map__29645 = p__29644;
var map__29645__$1 = ((((!((map__29645 == null)))?(((((map__29645.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29645.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29645):map__29645);
var station = map__29645__$1;
var station_id = cljs.core.get.call(null,map__29645__$1,new cljs.core.Keyword(null,"station_id","station_id",-1476260078));
var lat = cljs.core.get.call(null,map__29645__$1,new cljs.core.Keyword(null,"lat","lat",-580793929));
var lon = cljs.core.get.call(null,map__29645__$1,new cljs.core.Keyword(null,"lon","lon",522068437));
var name = cljs.core.get.call(null,map__29645__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var map__29647 = station_status.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(station_id)].join(''));
var map__29647__$1 = ((((!((map__29647 == null)))?(((((map__29647.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29647.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29647):map__29647);
var status = map__29647__$1;
var num_bikes_available = cljs.core.get.call(null,map__29647__$1,new cljs.core.Keyword(null,"num_bikes_available","num_bikes_available",-1196257282));
var num_docks_available = cljs.core.get.call(null,map__29647__$1,new cljs.core.Keyword(null,"num_docks_available","num_docks_available",-2123006306));
return new cljs.core.PersistentArrayMap(null, 6, [new cljs.core.Keyword(null,"station-id","station-id",-360291433),station_id,new cljs.core.Keyword(null,"bikes-available","bikes-available",-810868798),num_bikes_available,new cljs.core.Keyword(null,"docks-available","docks-available",-796269792),num_docks_available,new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),lat,new cljs.core.Keyword(null,"lng","lng",1667213918),lon], null),new cljs.core.Keyword(null,"info","info",-317069002),["<div>","<h3>",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"</h3>","<div>Ledige sykler: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(num_bikes_available),"</div>","<div>Ledige plasser: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(num_docks_available),"</div>","</div>"].join('')], null);
});
bysykkel.core.calculate_station_info = (function bysykkel$core$calculate_station_info(stations,station_status){
if(((cljs.core.seq.call(null,stations)) && (cljs.core.seq.call(null,station_status)))){
return cljs.core.map.call(null,cljs.core.partial.call(null,bysykkel.core.station_info,station_status),stations);
} else {
return null;
}
});
bysykkel.core.handle_station_status_error = (function bysykkel$core$handle_station_status_error(app_state,_){
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"error-status","error-status",-215021424),true,new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451),null);
});
bysykkel.core.add_markers = (function bysykkel$core$add_markers(app_state,markers){
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"markers","markers",-246919693),markers);
});
bysykkel.core.handle_current_location = (function bysykkel$core$handle_current_location(state,pos){
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"current-location","current-location",-1897906618),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lat","lat",-580793929),pos.coords.latitude,new cljs.core.Keyword(null,"lng","lng",1667213918),pos.coords.longitude], null));
});
bysykkel.core.add_map = (function bysykkel$core$add_map(state,map_and_markers){
return cljs.core.merge.call(null,state,map_and_markers);
});
bysykkel.core.fetch_status = (function bysykkel$core$fetch_status(app_state,id,fetching,error){
var error_kw = cljs.core.keyword.call(null,["error-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join(''));
var fetching_kw = cljs.core.keyword.call(null,["fetching-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join(''));
return cljs.core.assoc.call(null,app_state,error_kw,error,fetching_kw,fetching);
});
bysykkel.core.fetch_error = (function bysykkel$core$fetch_error(app_state,id,r){
return bysykkel.core.fetch_status.call(null,app_state,id,null,r);
});
bysykkel.core.fetch_initialized = (function bysykkel$core$fetch_initialized(app_state,id){
return bysykkel.core.fetch_status.call(null,app_state,id,true,null);
});
bysykkel.core.fetch_ok = (function bysykkel$core$fetch_ok(app_state,id){
return bysykkel.core.fetch_status.call(null,app_state,id,null,null);
});
bysykkel.core.station_status_fetched = (function bysykkel$core$station_status_fetched(p__29649,data){
var map__29650 = p__29649;
var map__29650__$1 = ((((!((map__29650 == null)))?(((((map__29650.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29650.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29650):map__29650);
var app_state = map__29650__$1;
var stations = cljs.core.get.call(null,map__29650__$1,new cljs.core.Keyword(null,"stations","stations",-19744730));
var station_status = cljs.core.reduce_kv.call(null,((function (map__29650,map__29650__$1,app_state,stations){
return (function (acc,k,v){
return cljs.core.assoc.call(null,acc,k,cljs.core.first.call(null,v));
});})(map__29650,map__29650__$1,app_state,stations))
,cljs.core.PersistentArrayMap.EMPTY,cljs.core.group_by.call(null,new cljs.core.Keyword(null,"station_id","station_id",-1476260078),cljs.core.get_in.call(null,data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"stations","stations",-19744730)], null))));
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"station-info","station-info",-887244029),bysykkel.core.calculate_station_info.call(null,stations,station_status),new cljs.core.Keyword(null,"station-status","station-status",1432215775),station_status);
});
bysykkel.core.stations_fetched = (function bysykkel$core$stations_fetched(p__29652,data){
var map__29653 = p__29652;
var map__29653__$1 = ((((!((map__29653 == null)))?(((((map__29653.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29653.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29653):map__29653);
var app_state = map__29653__$1;
var station_status = cljs.core.get.call(null,map__29653__$1,new cljs.core.Keyword(null,"station-status","station-status",1432215775));
var stations = cljs.core.get_in.call(null,data,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"stations","stations",-19744730)], null));
return cljs.core.assoc.call(null,app_state,new cljs.core.Keyword(null,"stations","stations",-19744730),stations,new cljs.core.Keyword(null,"station-info","station-info",-887244029),bysykkel.core.calculate_station_info.call(null,stations,station_status));
});
bysykkel.core.fetch = (function bysykkel$core$fetch(url,opts,id,ok){
cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,bysykkel.core.fetch_initialized,id);

return fetch(url,opts).then((function (r){
if(cljs.core.truth_(r.ok)){
return r.json().then((function (j){
cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,ok,cljs.core.js__GT_clj.call(null,j,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));

return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,bysykkel.core.fetch_ok,id);
}));
} else {
return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,bysykkel.core.fetch_error,id,r);
}
}));
});
bysykkel.core.station_status_BANG_ = (function bysykkel$core$station_status_BANG_(){
return bysykkel.core.fetch.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(bysykkel.core.base_url),"/station_status.json"].join(''),cljs.core.PersistentArrayMap.EMPTY,"status",bysykkel.core.station_status_fetched);
});
bysykkel.core.stations_BANG_ = (function bysykkel$core$stations_BANG_(){
return bysykkel.core.fetch.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(bysykkel.core.base_url),"/station_information.json"].join(''),cljs.core.PersistentArrayMap.EMPTY,"stations",bysykkel.core.stations_fetched);
});
bysykkel.core.current_location_BANG_ = (function bysykkel$core$current_location_BANG_(){
return navigator.geolocation.getCurrentPosition((function (loc){
return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,bysykkel.core.handle_current_location,loc);
}));
});
bysykkel.core.zoom_to_position = (function bysykkel$core$zoom_to_position(map,position){
map.setZoom((16));

return map.setCenter(position);
});
bysykkel.core.marker_BANG_ = (function bysykkel$core$marker_BANG_(map,p__29655,click_handler){
var map__29656 = p__29655;
var map__29656__$1 = ((((!((map__29656 == null)))?(((((map__29656.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29656.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29656):map__29656);
var position = cljs.core.get.call(null,map__29656__$1,new cljs.core.Keyword(null,"position","position",-2011731912));
var info = cljs.core.get.call(null,map__29656__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name = cljs.core.get.call(null,map__29656__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var icon = cljs.core.get.call(null,map__29656__$1,new cljs.core.Keyword(null,"icon","icon",1679606541));
var info_window = (new google.maps.InfoWindow(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"content","content",15833224),info], null))));
var marker = (new google.maps.Marker(cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"position","position",-2011731912),position,new cljs.core.Keyword(null,"map","map",1371690461),map,new cljs.core.Keyword(null,"title","title",636505583),name], null),(cljs.core.truth_(icon)?new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"icon","icon",1679606541),icon], null):null)))));
marker.addListener("click",((function (info_window,marker,map__29656,map__29656__$1,position,info,name,icon){
return (function (_){
click_handler.call(null,marker.getPosition());

return info_window.open(map,marker);
});})(info_window,marker,map__29656,map__29656__$1,position,info,name,icon))
);

return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"info-window","info-window",1082708400),info_window,new cljs.core.Keyword(null,"marker","marker",865118313),marker], null);
});
bysykkel.core.render_location = (function bysykkel$core$render_location(map,current_location){
bysykkel.core.marker_BANG_.call(null,map,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"position","position",-2011731912),current_location,new cljs.core.Keyword(null,"info","info",-317069002),"Du er her",new cljs.core.Keyword(null,"name","name",1843675177),"Du er her",new cljs.core.Keyword(null,"icon","icon",1679606541),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"url","url",276297046),"http://maps.google.com/mapfiles/ms/icons/blue-dot.png"], null)], null),cljs.core.partial.call(null,bysykkel.core.zoom_to_position,map));

return map.setCenter(cljs.core.clj__GT_js.call(null,current_location));
});
bysykkel.core.render_station = (function bysykkel$core$render_station(p__29658){
var map__29659 = p__29658;
var map__29659__$1 = ((((!((map__29659 == null)))?(((((map__29659.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29659.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29659):map__29659);
var station = map__29659__$1;
var station_id = cljs.core.get.call(null,map__29659__$1,new cljs.core.Keyword(null,"station-id","station-id",-360291433));
var name = cljs.core.get.call(null,map__29659__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var bikes_available = cljs.core.get.call(null,map__29659__$1,new cljs.core.Keyword(null,"bikes-available","bikes-available",-810868798));
var docks_available = cljs.core.get.call(null,map__29659__$1,new cljs.core.Keyword(null,"docks-available","docks-available",-796269792));
var position = cljs.core.get.call(null,map__29659__$1,new cljs.core.Keyword(null,"position","position",-2011731912));
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (map__29659,map__29659__$1,station,station_id,name,bikes_available,docks_available,position){
return (function (_){
var map__29661 = cljs.core.deref.call(null,bysykkel.core.app_state);
var map__29661__$1 = ((((!((map__29661 == null)))?(((((map__29661.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29661.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29661):map__29661);
var map = cljs.core.get.call(null,map__29661__$1,new cljs.core.Keyword(null,"map","map",1371690461));
var markers = cljs.core.get.call(null,map__29661__$1,new cljs.core.Keyword(null,"markers","markers",-246919693));
var map__29662 = markers.call(null,station_id);
var map__29662__$1 = ((((!((map__29662 == null)))?(((((map__29662.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29662.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29662):map__29662);
var marker = cljs.core.get.call(null,map__29662__$1,new cljs.core.Keyword(null,"marker","marker",865118313));
var info_window = cljs.core.get.call(null,map__29662__$1,new cljs.core.Keyword(null,"info-window","info-window",1082708400));
bysykkel.core.zoom_to_position.call(null,map,cljs.core.clj__GT_js.call(null,position));

return info_window.open(map,marker);
});})(map__29659,map__29659__$1,station,station_id,name,bikes_available,docks_available,position))
,new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cursor","cursor",1011937484),"pointer"], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),name], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),bikes_available], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"td","td",1479933353),docks_available], null)], null);
});
bysykkel.core.render_stations = (function bysykkel$core$render_stations(stations){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"table.bike-table","table.bike-table",-954703409),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"thead","thead",-291875296),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tr","tr",-1424774646),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Stasjon"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ledige sykler"], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"th","th",-545608566),"Ledige plasser"], null)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"tbody","tbody",-80678300),(function (){var iter__4324__auto__ = (function bysykkel$core$render_stations_$_iter__29665(s__29666){
return (new cljs.core.LazySeq(null,(function (){
var s__29666__$1 = s__29666;
while(true){
var temp__5457__auto__ = cljs.core.seq.call(null,s__29666__$1);
if(temp__5457__auto__){
var s__29666__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__29666__$2)){
var c__4322__auto__ = cljs.core.chunk_first.call(null,s__29666__$2);
var size__4323__auto__ = cljs.core.count.call(null,c__4322__auto__);
var b__29668 = cljs.core.chunk_buffer.call(null,size__4323__auto__);
if((function (){var i__29667 = (0);
while(true){
if((i__29667 < size__4323__auto__)){
var s = cljs.core._nth.call(null,c__4322__auto__,i__29667);
cljs.core.chunk_append.call(null,b__29668,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.render_station,s], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"station-id","station-id",-360291433).cljs$core$IFn$_invoke$arity$1(s)], null)));

var G__29669 = (i__29667 + (1));
i__29667 = G__29669;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__29668),bysykkel$core$render_stations_$_iter__29665.call(null,cljs.core.chunk_rest.call(null,s__29666__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__29668),null);
}
} else {
var s = cljs.core.first.call(null,s__29666__$2);
return cljs.core.cons.call(null,cljs.core.with_meta(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.render_station,s], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"station-id","station-id",-360291433).cljs$core$IFn$_invoke$arity$1(s)], null)),bysykkel$core$render_stations_$_iter__29665.call(null,cljs.core.rest.call(null,s__29666__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4324__auto__.call(null,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),stations));
})()], null)], null);
});
bysykkel.core.place_markers_BANG_ = (function bysykkel$core$place_markers_BANG_(map,station_info){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__4324__auto__ = (function bysykkel$core$place_markers_BANG__$_iter__29670(s__29671){
return (new cljs.core.LazySeq(null,(function (){
var s__29671__$1 = s__29671;
while(true){
var temp__5457__auto__ = cljs.core.seq.call(null,s__29671__$1);
if(temp__5457__auto__){
var s__29671__$2 = temp__5457__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__29671__$2)){
var c__4322__auto__ = cljs.core.chunk_first.call(null,s__29671__$2);
var size__4323__auto__ = cljs.core.count.call(null,c__4322__auto__);
var b__29673 = cljs.core.chunk_buffer.call(null,size__4323__auto__);
if((function (){var i__29672 = (0);
while(true){
if((i__29672 < size__4323__auto__)){
var station = cljs.core._nth.call(null,c__4322__auto__,i__29672);
cljs.core.chunk_append.call(null,b__29673,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"station-id","station-id",-360291433).cljs$core$IFn$_invoke$arity$1(station),bysykkel.core.marker_BANG_.call(null,map,cljs.core.select_keys.call(null,station,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"name","name",1843675177)], null)),cljs.core.partial.call(null,bysykkel.core.zoom_to_position,map))], null));

var G__29674 = (i__29672 + (1));
i__29672 = G__29674;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__29673),bysykkel$core$place_markers_BANG__$_iter__29670.call(null,cljs.core.chunk_rest.call(null,s__29671__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__29673),null);
}
} else {
var station = cljs.core.first.call(null,s__29671__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"station-id","station-id",-360291433).cljs$core$IFn$_invoke$arity$1(station),bysykkel.core.marker_BANG_.call(null,map,cljs.core.select_keys.call(null,station,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"position","position",-2011731912),new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"name","name",1843675177)], null)),cljs.core.partial.call(null,bysykkel.core.zoom_to_position,map))], null),bysykkel$core$place_markers_BANG__$_iter__29670.call(null,cljs.core.rest.call(null,s__29671__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4324__auto__.call(null,station_info);
})());
});
bysykkel.core.map_did_mount = (function bysykkel$core$map_did_mount(this$){
var map_canvas = reagent.core.dom_node.call(null,this$);
var map_options = cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 2, ["center",(new google.maps.LatLng(59.911491,10.757933)),"zoom",(12)], null));
var map = (new google.maps.Map(map_canvas,map_options));
var markers = bysykkel.core.place_markers_BANG_.call(null,map,new cljs.core.Keyword(null,"station-info","station-info",-887244029).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,bysykkel.core.app_state)));
return cljs.core.swap_BANG_.call(null,bysykkel.core.app_state,bysykkel.core.add_map,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"map","map",1371690461),map,new cljs.core.Keyword(null,"markers","markers",-246919693),markers], null));
});
bysykkel.core.map_render = (function bysykkel$core$map_render(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"style","style",-496642736),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"height","height",1025178622),"600px"], null)], null)], null);
});
bysykkel.core.bike_map = (function bysykkel$core$bike_map(){
return reagent.core.create_class.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"reagent-render","reagent-render",-985383853),bysykkel.core.map_render,new cljs.core.Keyword(null,"component-did-mount","component-did-mount",-1126910518),bysykkel.core.map_did_mount], null));
});
bysykkel.core.city_bike = (function bysykkel$core$city_bike(){
var map__29675 = cljs.core.deref.call(null,bysykkel.core.app_state);
var map__29675__$1 = ((((!((map__29675 == null)))?(((((map__29675.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__29675.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__29675):map__29675);
var state = map__29675__$1;
var station_info = cljs.core.get.call(null,map__29675__$1,new cljs.core.Keyword(null,"station-info","station-info",-887244029));
var map = cljs.core.get.call(null,map__29675__$1,new cljs.core.Keyword(null,"map","map",1371690461));
var current_location = cljs.core.get.call(null,map__29675__$1,new cljs.core.Keyword(null,"current-location","current-location",-1897906618));
var markers = cljs.core.get.call(null,map__29675__$1,new cljs.core.Keyword(null,"markers","markers",-246919693));
if(cljs.core.truth_((function (){var and__3938__auto__ = map;
if(cljs.core.truth_(and__3938__auto__)){
return current_location;
} else {
return and__3938__auto__;
}
})())){
bysykkel.core.render_location.call(null,map,current_location);
} else {
}

return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),(cljs.core.truth_((function (){var or__3949__auto__ = new cljs.core.Keyword(null,"fetching-status","fetching-status",1508652451).cljs$core$IFn$_invoke$arity$1(state);
if(cljs.core.truth_(or__3949__auto__)){
return or__3949__auto__;
} else {
return new cljs.core.Keyword(null,"fetching-stations","fetching-stations",287803144).cljs$core$IFn$_invoke$arity$1(state);
}
})())?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Loading"], null):(cljs.core.truth_(new cljs.core.Keyword(null,"error-stations","error-stations",134023399).cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error fetching stations"], null):(cljs.core.truth_(new cljs.core.Keyword(null,"error-status","error-status",-215021424).cljs$core$IFn$_invoke$arity$1(state))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),"Error fetching station-status"], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.bike_map], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [bysykkel.core.render_stations,station_info], null)], null)
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
bysykkel.core.stations_BANG_.call(null);
bysykkel.core.station_status_BANG_.call(null);
bysykkel.core.current_location_BANG_.call(null);

//# sourceMappingURL=core.js.map

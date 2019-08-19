// Compiled by ClojureScript 1.10.339 {}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__22395__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__22395 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__22396__i = 0, G__22396__a = new Array(arguments.length -  0);
while (G__22396__i < G__22396__a.length) {G__22396__a[G__22396__i] = arguments[G__22396__i + 0]; ++G__22396__i;}
  args = new cljs.core.IndexedSeq(G__22396__a,0,null);
} 
return G__22395__delegate.call(this,args);};
G__22395.cljs$lang$maxFixedArity = 0;
G__22395.cljs$lang$applyTo = (function (arglist__22397){
var args = cljs.core.seq(arglist__22397);
return G__22395__delegate(args);
});
G__22395.cljs$core$IFn$_invoke$arity$variadic = G__22395__delegate;
return G__22395;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__22398__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__22398 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__22399__i = 0, G__22399__a = new Array(arguments.length -  0);
while (G__22399__i < G__22399__a.length) {G__22399__a[G__22399__i] = arguments[G__22399__i + 0]; ++G__22399__i;}
  args = new cljs.core.IndexedSeq(G__22399__a,0,null);
} 
return G__22398__delegate.call(this,args);};
G__22398.cljs$lang$maxFixedArity = 0;
G__22398.cljs$lang$applyTo = (function (arglist__22400){
var args = cljs.core.seq(arglist__22400);
return G__22398__delegate(args);
});
G__22398.cljs$core$IFn$_invoke$arity$variadic = G__22398__delegate;
return G__22398;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});

//# sourceMappingURL=debug.js.map

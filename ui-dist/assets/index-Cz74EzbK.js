(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const d of c.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function i(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(l){if(l.ep)return;l.ep=!0;const c=i(l);fetch(l.href,c)}})();var Eh={exports:{}},il={};var V0;function Ky(){if(V0)return il;V0=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.fragment");function i(s,l,c){var d=null;if(c!==void 0&&(d=""+c),l.key!==void 0&&(d=""+l.key),"key"in l){c={};for(var h in l)h!=="key"&&(c[h]=l[h])}else c=l;return l=c.ref,{$$typeof:r,type:s,key:d,ref:l!==void 0?l:null,props:c}}return il.Fragment=e,il.jsx=i,il.jsxs=i,il}var k0;function Qy(){return k0||(k0=1,Eh.exports=Ky()),Eh.exports}var k=Qy(),bh={exports:{}},Le={};var X0;function Jy(){if(X0)return Le;X0=1;var r=Symbol.for("react.transitional.element"),e=Symbol.for("react.portal"),i=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.consumer"),d=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),g=Symbol.for("react.activity"),x=Symbol.iterator;function S(V){return V===null||typeof V!="object"?null:(V=x&&V[x]||V["@@iterator"],typeof V=="function"?V:null)}var E={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},T=Object.assign,M={};function v(V,ct,Lt){this.props=V,this.context=ct,this.refs=M,this.updater=Lt||E}v.prototype.isReactComponent={},v.prototype.setState=function(V,ct){if(typeof V!="object"&&typeof V!="function"&&V!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,V,ct,"setState")},v.prototype.forceUpdate=function(V){this.updater.enqueueForceUpdate(this,V,"forceUpdate")};function I(){}I.prototype=v.prototype;function F(V,ct,Lt){this.props=V,this.context=ct,this.refs=M,this.updater=Lt||E}var z=F.prototype=new I;z.constructor=F,T(z,v.prototype),z.isPureReactComponent=!0;var Q=Array.isArray;function H(){}var D={H:null,A:null,T:null,S:null},j=Object.prototype.hasOwnProperty;function N(V,ct,Lt){var K=Lt.ref;return{$$typeof:r,type:V,key:ct,ref:K!==void 0?K:null,props:Lt}}function b(V,ct){return N(V.type,ct,V.props)}function B(V){return typeof V=="object"&&V!==null&&V.$$typeof===r}function Y(V){var ct={"=":"=0",":":"=2"};return"$"+V.replace(/[=:]/g,function(Lt){return ct[Lt]})}var Z=/\/+/g;function nt(V,ct){return typeof V=="object"&&V!==null&&V.key!=null?Y(""+V.key):ct.toString(36)}function _t(V){switch(V.status){case"fulfilled":return V.value;case"rejected":throw V.reason;default:switch(typeof V.status=="string"?V.then(H,H):(V.status="pending",V.then(function(ct){V.status==="pending"&&(V.status="fulfilled",V.value=ct)},function(ct){V.status==="pending"&&(V.status="rejected",V.reason=ct)})),V.status){case"fulfilled":return V.value;case"rejected":throw V.reason}}throw V}function w(V,ct,Lt,K,yt){var Ft=typeof V;(Ft==="undefined"||Ft==="boolean")&&(V=null);var wt=!1;if(V===null)wt=!0;else switch(Ft){case"bigint":case"string":case"number":wt=!0;break;case"object":switch(V.$$typeof){case r:case e:wt=!0;break;case _:return wt=V._init,w(wt(V._payload),ct,Lt,K,yt)}}if(wt)return yt=yt(V),wt=K===""?"."+nt(V,0):K,Q(yt)?(Lt="",wt!=null&&(Lt=wt.replace(Z,"$&/")+"/"),w(yt,ct,Lt,"",function(xe){return xe})):yt!=null&&(B(yt)&&(yt=b(yt,Lt+(yt.key==null||V&&V.key===yt.key?"":(""+yt.key).replace(Z,"$&/")+"/")+wt)),ct.push(yt)),1;wt=0;var zt=K===""?".":K+":";if(Q(V))for(var ae=0;ae<V.length;ae++)K=V[ae],Ft=zt+nt(K,ae),wt+=w(K,ct,Lt,Ft,yt);else if(ae=S(V),typeof ae=="function")for(V=ae.call(V),ae=0;!(K=V.next()).done;)K=K.value,Ft=zt+nt(K,ae++),wt+=w(K,ct,Lt,Ft,yt);else if(Ft==="object"){if(typeof V.then=="function")return w(_t(V),ct,Lt,K,yt);throw ct=String(V),Error("Objects are not valid as a React child (found: "+(ct==="[object Object]"?"object with keys {"+Object.keys(V).join(", ")+"}":ct)+"). If you meant to render a collection of children, use an array instead.")}return wt}function X(V,ct,Lt){if(V==null)return V;var K=[],yt=0;return w(V,K,"","",function(Ft){return ct.call(Lt,Ft,yt++)}),K}function G(V){if(V._status===-1){var ct=V._result;ct=ct(),ct.then(function(Lt){(V._status===0||V._status===-1)&&(V._status=1,V._result=Lt)},function(Lt){(V._status===0||V._status===-1)&&(V._status=2,V._result=Lt)}),V._status===-1&&(V._status=0,V._result=ct)}if(V._status===1)return V._result.default;throw V._result}var ot=typeof reportError=="function"?reportError:function(V){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var ct=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof V=="object"&&V!==null&&typeof V.message=="string"?String(V.message):String(V),error:V});if(!window.dispatchEvent(ct))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",V);return}console.error(V)},Dt={map:X,forEach:function(V,ct,Lt){X(V,function(){ct.apply(this,arguments)},Lt)},count:function(V){var ct=0;return X(V,function(){ct++}),ct},toArray:function(V){return X(V,function(ct){return ct})||[]},only:function(V){if(!B(V))throw Error("React.Children.only expected to receive a single React element child.");return V}};return Le.Activity=g,Le.Children=Dt,Le.Component=v,Le.Fragment=i,Le.Profiler=l,Le.PureComponent=F,Le.StrictMode=s,Le.Suspense=p,Le.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=D,Le.__COMPILER_RUNTIME={__proto__:null,c:function(V){return D.H.useMemoCache(V)}},Le.cache=function(V){return function(){return V.apply(null,arguments)}},Le.cacheSignal=function(){return null},Le.cloneElement=function(V,ct,Lt){if(V==null)throw Error("The argument must be a React element, but you passed "+V+".");var K=T({},V.props),yt=V.key;if(ct!=null)for(Ft in ct.key!==void 0&&(yt=""+ct.key),ct)!j.call(ct,Ft)||Ft==="key"||Ft==="__self"||Ft==="__source"||Ft==="ref"&&ct.ref===void 0||(K[Ft]=ct[Ft]);var Ft=arguments.length-2;if(Ft===1)K.children=Lt;else if(1<Ft){for(var wt=Array(Ft),zt=0;zt<Ft;zt++)wt[zt]=arguments[zt+2];K.children=wt}return N(V.type,yt,K)},Le.createContext=function(V){return V={$$typeof:d,_currentValue:V,_currentValue2:V,_threadCount:0,Provider:null,Consumer:null},V.Provider=V,V.Consumer={$$typeof:c,_context:V},V},Le.createElement=function(V,ct,Lt){var K,yt={},Ft=null;if(ct!=null)for(K in ct.key!==void 0&&(Ft=""+ct.key),ct)j.call(ct,K)&&K!=="key"&&K!=="__self"&&K!=="__source"&&(yt[K]=ct[K]);var wt=arguments.length-2;if(wt===1)yt.children=Lt;else if(1<wt){for(var zt=Array(wt),ae=0;ae<wt;ae++)zt[ae]=arguments[ae+2];yt.children=zt}if(V&&V.defaultProps)for(K in wt=V.defaultProps,wt)yt[K]===void 0&&(yt[K]=wt[K]);return N(V,Ft,yt)},Le.createRef=function(){return{current:null}},Le.forwardRef=function(V){return{$$typeof:h,render:V}},Le.isValidElement=B,Le.lazy=function(V){return{$$typeof:_,_payload:{_status:-1,_result:V},_init:G}},Le.memo=function(V,ct){return{$$typeof:m,type:V,compare:ct===void 0?null:ct}},Le.startTransition=function(V){var ct=D.T,Lt={};D.T=Lt;try{var K=V(),yt=D.S;yt!==null&&yt(Lt,K),typeof K=="object"&&K!==null&&typeof K.then=="function"&&K.then(H,ot)}catch(Ft){ot(Ft)}finally{ct!==null&&Lt.types!==null&&(ct.types=Lt.types),D.T=ct}},Le.unstable_useCacheRefresh=function(){return D.H.useCacheRefresh()},Le.use=function(V){return D.H.use(V)},Le.useActionState=function(V,ct,Lt){return D.H.useActionState(V,ct,Lt)},Le.useCallback=function(V,ct){return D.H.useCallback(V,ct)},Le.useContext=function(V){return D.H.useContext(V)},Le.useDebugValue=function(){},Le.useDeferredValue=function(V,ct){return D.H.useDeferredValue(V,ct)},Le.useEffect=function(V,ct){return D.H.useEffect(V,ct)},Le.useEffectEvent=function(V){return D.H.useEffectEvent(V)},Le.useId=function(){return D.H.useId()},Le.useImperativeHandle=function(V,ct,Lt){return D.H.useImperativeHandle(V,ct,Lt)},Le.useInsertionEffect=function(V,ct){return D.H.useInsertionEffect(V,ct)},Le.useLayoutEffect=function(V,ct){return D.H.useLayoutEffect(V,ct)},Le.useMemo=function(V,ct){return D.H.useMemo(V,ct)},Le.useOptimistic=function(V,ct){return D.H.useOptimistic(V,ct)},Le.useReducer=function(V,ct,Lt){return D.H.useReducer(V,ct,Lt)},Le.useRef=function(V){return D.H.useRef(V)},Le.useState=function(V){return D.H.useState(V)},Le.useSyncExternalStore=function(V,ct,Lt){return D.H.useSyncExternalStore(V,ct,Lt)},Le.useTransition=function(){return D.H.useTransition()},Le.version="19.2.8",Le}var q0;function $d(){return q0||(q0=1,bh.exports=Jy()),bh.exports}var ce=$d(),Th={exports:{}},al={},Ah={exports:{}},Rh={};var W0;function $y(){return W0||(W0=1,(function(r){function e(w,X){var G=w.length;w.push(X);t:for(;0<G;){var ot=G-1>>>1,Dt=w[ot];if(0<l(Dt,X))w[ot]=X,w[G]=Dt,G=ot;else break t}}function i(w){return w.length===0?null:w[0]}function s(w){if(w.length===0)return null;var X=w[0],G=w.pop();if(G!==X){w[0]=G;t:for(var ot=0,Dt=w.length,V=Dt>>>1;ot<V;){var ct=2*(ot+1)-1,Lt=w[ct],K=ct+1,yt=w[K];if(0>l(Lt,G))K<Dt&&0>l(yt,Lt)?(w[ot]=yt,w[K]=G,ot=K):(w[ot]=Lt,w[ct]=G,ot=ct);else if(K<Dt&&0>l(yt,G))w[ot]=yt,w[K]=G,ot=K;else break t}}return X}function l(w,X){var G=w.sortIndex-X.sortIndex;return G!==0?G:w.id-X.id}if(r.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var c=performance;r.unstable_now=function(){return c.now()}}else{var d=Date,h=d.now();r.unstable_now=function(){return d.now()-h}}var p=[],m=[],_=1,g=null,x=3,S=!1,E=!1,T=!1,M=!1,v=typeof setTimeout=="function"?setTimeout:null,I=typeof clearTimeout=="function"?clearTimeout:null,F=typeof setImmediate<"u"?setImmediate:null;function z(w){for(var X=i(m);X!==null;){if(X.callback===null)s(m);else if(X.startTime<=w)s(m),X.sortIndex=X.expirationTime,e(p,X);else break;X=i(m)}}function Q(w){if(T=!1,z(w),!E)if(i(p)!==null)E=!0,H||(H=!0,Y());else{var X=i(m);X!==null&&_t(Q,X.startTime-w)}}var H=!1,D=-1,j=5,N=-1;function b(){return M?!0:!(r.unstable_now()-N<j)}function B(){if(M=!1,H){var w=r.unstable_now();N=w;var X=!0;try{t:{E=!1,T&&(T=!1,I(D),D=-1),S=!0;var G=x;try{e:{for(z(w),g=i(p);g!==null&&!(g.expirationTime>w&&b());){var ot=g.callback;if(typeof ot=="function"){g.callback=null,x=g.priorityLevel;var Dt=ot(g.expirationTime<=w);if(w=r.unstable_now(),typeof Dt=="function"){g.callback=Dt,z(w),X=!0;break e}g===i(p)&&s(p),z(w)}else s(p);g=i(p)}if(g!==null)X=!0;else{var V=i(m);V!==null&&_t(Q,V.startTime-w),X=!1}}break t}finally{g=null,x=G,S=!1}X=void 0}}finally{X?Y():H=!1}}}var Y;if(typeof F=="function")Y=function(){F(B)};else if(typeof MessageChannel<"u"){var Z=new MessageChannel,nt=Z.port2;Z.port1.onmessage=B,Y=function(){nt.postMessage(null)}}else Y=function(){v(B,0)};function _t(w,X){D=v(function(){w(r.unstable_now())},X)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(w){w.callback=null},r.unstable_forceFrameRate=function(w){0>w||125<w?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):j=0<w?Math.floor(1e3/w):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_next=function(w){switch(x){case 1:case 2:case 3:var X=3;break;default:X=x}var G=x;x=X;try{return w()}finally{x=G}},r.unstable_requestPaint=function(){M=!0},r.unstable_runWithPriority=function(w,X){switch(w){case 1:case 2:case 3:case 4:case 5:break;default:w=3}var G=x;x=w;try{return X()}finally{x=G}},r.unstable_scheduleCallback=function(w,X,G){var ot=r.unstable_now();switch(typeof G=="object"&&G!==null?(G=G.delay,G=typeof G=="number"&&0<G?ot+G:ot):G=ot,w){case 1:var Dt=-1;break;case 2:Dt=250;break;case 5:Dt=1073741823;break;case 4:Dt=1e4;break;default:Dt=5e3}return Dt=G+Dt,w={id:_++,callback:X,priorityLevel:w,startTime:G,expirationTime:Dt,sortIndex:-1},G>ot?(w.sortIndex=G,e(m,w),i(p)===null&&w===i(m)&&(T?(I(D),D=-1):T=!0,_t(Q,G-ot))):(w.sortIndex=Dt,e(p,w),E||S||(E=!0,H||(H=!0,Y()))),w},r.unstable_shouldYield=b,r.unstable_wrapCallback=function(w){var X=x;return function(){var G=x;x=X;try{return w.apply(this,arguments)}finally{x=G}}}})(Rh)),Rh}var j0;function tM(){return j0||(j0=1,Ah.exports=$y()),Ah.exports}var Ch={exports:{}},ci={};var Y0;function eM(){if(Y0)return ci;Y0=1;var r=$d();function e(p){var m="https://react.dev/errors/"+p;if(1<arguments.length){m+="?args[]="+encodeURIComponent(arguments[1]);for(var _=2;_<arguments.length;_++)m+="&args[]="+encodeURIComponent(arguments[_])}return"Minified React error #"+p+"; visit "+m+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function i(){}var s={d:{f:i,r:function(){throw Error(e(522))},D:i,C:i,L:i,m:i,X:i,S:i,M:i},p:0,findDOMNode:null},l=Symbol.for("react.portal");function c(p,m,_){var g=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:l,key:g==null?null:""+g,children:p,containerInfo:m,implementation:_}}var d=r.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function h(p,m){if(p==="font")return"";if(typeof m=="string")return m==="use-credentials"?m:""}return ci.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=s,ci.createPortal=function(p,m){var _=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!m||m.nodeType!==1&&m.nodeType!==9&&m.nodeType!==11)throw Error(e(299));return c(p,m,null,_)},ci.flushSync=function(p){var m=d.T,_=s.p;try{if(d.T=null,s.p=2,p)return p()}finally{d.T=m,s.p=_,s.d.f()}},ci.preconnect=function(p,m){typeof p=="string"&&(m?(m=m.crossOrigin,m=typeof m=="string"?m==="use-credentials"?m:"":void 0):m=null,s.d.C(p,m))},ci.prefetchDNS=function(p){typeof p=="string"&&s.d.D(p)},ci.preinit=function(p,m){if(typeof p=="string"&&m&&typeof m.as=="string"){var _=m.as,g=h(_,m.crossOrigin),x=typeof m.integrity=="string"?m.integrity:void 0,S=typeof m.fetchPriority=="string"?m.fetchPriority:void 0;_==="style"?s.d.S(p,typeof m.precedence=="string"?m.precedence:void 0,{crossOrigin:g,integrity:x,fetchPriority:S}):_==="script"&&s.d.X(p,{crossOrigin:g,integrity:x,fetchPriority:S,nonce:typeof m.nonce=="string"?m.nonce:void 0})}},ci.preinitModule=function(p,m){if(typeof p=="string")if(typeof m=="object"&&m!==null){if(m.as==null||m.as==="script"){var _=h(m.as,m.crossOrigin);s.d.M(p,{crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0})}}else m==null&&s.d.M(p)},ci.preload=function(p,m){if(typeof p=="string"&&typeof m=="object"&&m!==null&&typeof m.as=="string"){var _=m.as,g=h(_,m.crossOrigin);s.d.L(p,_,{crossOrigin:g,integrity:typeof m.integrity=="string"?m.integrity:void 0,nonce:typeof m.nonce=="string"?m.nonce:void 0,type:typeof m.type=="string"?m.type:void 0,fetchPriority:typeof m.fetchPriority=="string"?m.fetchPriority:void 0,referrerPolicy:typeof m.referrerPolicy=="string"?m.referrerPolicy:void 0,imageSrcSet:typeof m.imageSrcSet=="string"?m.imageSrcSet:void 0,imageSizes:typeof m.imageSizes=="string"?m.imageSizes:void 0,media:typeof m.media=="string"?m.media:void 0})}},ci.preloadModule=function(p,m){if(typeof p=="string")if(m){var _=h(m.as,m.crossOrigin);s.d.m(p,{as:typeof m.as=="string"&&m.as!=="script"?m.as:void 0,crossOrigin:_,integrity:typeof m.integrity=="string"?m.integrity:void 0})}else s.d.m(p)},ci.requestFormReset=function(p){s.d.r(p)},ci.unstable_batchedUpdates=function(p,m){return p(m)},ci.useFormState=function(p,m,_){return d.H.useFormState(p,m,_)},ci.useFormStatus=function(){return d.H.useHostTransitionStatus()},ci.version="19.2.8",ci}var Z0;function nM(){if(Z0)return Ch.exports;Z0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Ch.exports=eM(),Ch.exports}var K0;function iM(){if(K0)return al;K0=1;var r=tM(),e=$d(),i=nM();function s(t){var n="https://react.dev/errors/"+t;if(1<arguments.length){n+="?args[]="+encodeURIComponent(arguments[1]);for(var a=2;a<arguments.length;a++)n+="&args[]="+encodeURIComponent(arguments[a])}return"Minified React error #"+t+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function l(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function c(t){var n=t,a=t;if(t.alternate)for(;n.return;)n=n.return;else{t=n;do n=t,(n.flags&4098)!==0&&(a=n.return),t=n.return;while(t)}return n.tag===3?a:null}function d(t){if(t.tag===13){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function h(t){if(t.tag===31){var n=t.memoizedState;if(n===null&&(t=t.alternate,t!==null&&(n=t.memoizedState)),n!==null)return n.dehydrated}return null}function p(t){if(c(t)!==t)throw Error(s(188))}function m(t){var n=t.alternate;if(!n){if(n=c(t),n===null)throw Error(s(188));return n!==t?null:t}for(var a=t,o=n;;){var u=a.return;if(u===null)break;var f=u.alternate;if(f===null){if(o=u.return,o!==null){a=o;continue}break}if(u.child===f.child){for(f=u.child;f;){if(f===a)return p(u),t;if(f===o)return p(u),n;f=f.sibling}throw Error(s(188))}if(a.return!==o.return)a=u,o=f;else{for(var y=!1,R=u.child;R;){if(R===a){y=!0,a=u,o=f;break}if(R===o){y=!0,o=u,a=f;break}R=R.sibling}if(!y){for(R=f.child;R;){if(R===a){y=!0,a=f,o=u;break}if(R===o){y=!0,o=f,a=u;break}R=R.sibling}if(!y)throw Error(s(189))}}if(a.alternate!==o)throw Error(s(190))}if(a.tag!==3)throw Error(s(188));return a.stateNode.current===a?t:n}function _(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t;for(t=t.child;t!==null;){if(n=_(t),n!==null)return n;t=t.sibling}return null}var g=Object.assign,x=Symbol.for("react.element"),S=Symbol.for("react.transitional.element"),E=Symbol.for("react.portal"),T=Symbol.for("react.fragment"),M=Symbol.for("react.strict_mode"),v=Symbol.for("react.profiler"),I=Symbol.for("react.consumer"),F=Symbol.for("react.context"),z=Symbol.for("react.forward_ref"),Q=Symbol.for("react.suspense"),H=Symbol.for("react.suspense_list"),D=Symbol.for("react.memo"),j=Symbol.for("react.lazy"),N=Symbol.for("react.activity"),b=Symbol.for("react.memo_cache_sentinel"),B=Symbol.iterator;function Y(t){return t===null||typeof t!="object"?null:(t=B&&t[B]||t["@@iterator"],typeof t=="function"?t:null)}var Z=Symbol.for("react.client.reference");function nt(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===Z?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case T:return"Fragment";case v:return"Profiler";case M:return"StrictMode";case Q:return"Suspense";case H:return"SuspenseList";case N:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case E:return"Portal";case F:return t.displayName||"Context";case I:return(t._context.displayName||"Context")+".Consumer";case z:var n=t.render;return t=t.displayName,t||(t=n.displayName||n.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case D:return n=t.displayName||null,n!==null?n:nt(t.type)||"Memo";case j:n=t._payload,t=t._init;try{return nt(t(n))}catch{}}return null}var _t=Array.isArray,w=e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,X=i.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,G={pending:!1,data:null,method:null,action:null},ot=[],Dt=-1;function V(t){return{current:t}}function ct(t){0>Dt||(t.current=ot[Dt],ot[Dt]=null,Dt--)}function Lt(t,n){Dt++,ot[Dt]=t.current,t.current=n}var K=V(null),yt=V(null),Ft=V(null),wt=V(null);function zt(t,n){switch(Lt(Ft,n),Lt(yt,t),Lt(K,null),n.nodeType){case 9:case 11:t=(t=n.documentElement)&&(t=t.namespaceURI)?f0(t):0;break;default:if(t=n.tagName,n=n.namespaceURI)n=f0(n),t=h0(n,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}ct(K),Lt(K,t)}function ae(){ct(K),ct(yt),ct(Ft)}function xe(t){t.memoizedState!==null&&Lt(wt,t);var n=K.current,a=h0(n,t.type);n!==a&&(Lt(yt,t),Lt(K,a))}function Pe(t){yt.current===t&&(ct(K),ct(yt)),wt.current===t&&(ct(wt),$o._currentValue=G)}var we,ke;function at(t){if(we===void 0)try{throw Error()}catch(a){var n=a.stack.trim().match(/\n( *(at )?)/);we=n&&n[1]||"",ke=-1<a.stack.indexOf(`
    at`)?" (<anonymous>)":-1<a.stack.indexOf("@")?"@unknown:0:0":""}return`
`+we+t+ke}var Bn=!1;function Ue(t,n){if(!t||Bn)return"";Bn=!0;var a=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var o={DetermineComponentFrameRoot:function(){try{if(n){var Ut=function(){throw Error()};if(Object.defineProperty(Ut.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(Ut,[])}catch(Mt){var gt=Mt}Reflect.construct(t,[],Ut)}else{try{Ut.call()}catch(Mt){gt=Mt}t.call(Ut.prototype)}}else{try{throw Error()}catch(Mt){gt=Mt}(Ut=t())&&typeof Ut.catch=="function"&&Ut.catch(function(){})}}catch(Mt){if(Mt&&gt&&typeof Mt.stack=="string")return[Mt.stack,gt.stack]}return[null,null]}};o.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var u=Object.getOwnPropertyDescriptor(o.DetermineComponentFrameRoot,"name");u&&u.configurable&&Object.defineProperty(o.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var f=o.DetermineComponentFrameRoot(),y=f[0],R=f[1];if(y&&R){var q=y.split(`
`),ht=R.split(`
`);for(u=o=0;o<q.length&&!q[o].includes("DetermineComponentFrameRoot");)o++;for(;u<ht.length&&!ht[u].includes("DetermineComponentFrameRoot");)u++;if(o===q.length||u===ht.length)for(o=q.length-1,u=ht.length-1;1<=o&&0<=u&&q[o]!==ht[u];)u--;for(;1<=o&&0<=u;o--,u--)if(q[o]!==ht[u]){if(o!==1||u!==1)do if(o--,u--,0>u||q[o]!==ht[u]){var bt=`
`+q[o].replace(" at new "," at ");return t.displayName&&bt.includes("<anonymous>")&&(bt=bt.replace("<anonymous>",t.displayName)),bt}while(1<=o&&0<=u);break}}}finally{Bn=!1,Error.prepareStackTrace=a}return(a=t?t.displayName||t.name:"")?at(a):""}function jt(t,n){switch(t.tag){case 26:case 27:case 5:return at(t.type);case 16:return at("Lazy");case 13:return t.child!==n&&n!==null?at("Suspense Fallback"):at("Suspense");case 19:return at("SuspenseList");case 0:case 15:return Ue(t.type,!1);case 11:return Ue(t.type.render,!1);case 1:return Ue(t.type,!0);case 31:return at("Activity");default:return""}}function Kt(t){try{var n="",a=null;do n+=jt(t,a),a=t,t=t.return;while(t);return n}catch(o){return`
Error generating stack: `+o.message+`
`+o.stack}}var Xe=Object.prototype.hasOwnProperty,me=r.unstable_scheduleCallback,P=r.unstable_cancelCallback,A=r.unstable_shouldYield,rt=r.unstable_requestPaint,xt=r.unstable_now,At=r.unstable_getCurrentPriorityLevel,W=r.unstable_ImmediatePriority,ie=r.unstable_UserBlockingPriority,Xt=r.unstable_NormalPriority,Ot=r.unstable_LowPriority,qt=r.unstable_IdlePriority,pt=r.log,Gt=r.unstable_setDisableYieldValue,se=null,re=null;function Wt(t){if(typeof pt=="function"&&Gt(t),re&&typeof re.setStrictMode=="function")try{re.setStrictMode(se,t)}catch{}}var Te=Math.clz32?Math.clz32:$,Me=Math.log,Oe=Math.LN2;function $(t){return t>>>=0,t===0?32:31-(Me(t)/Oe|0)|0}var Qt=256,St=262144,Tt=4194304;function Jt(t){var n=t&42;if(n!==0)return n;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function $t(t,n,a){var o=t.pendingLanes;if(o===0)return 0;var u=0,f=t.suspendedLanes,y=t.pingedLanes;t=t.warmLanes;var R=o&134217727;return R!==0?(o=R&~f,o!==0?u=Jt(o):(y&=R,y!==0?u=Jt(y):a||(a=R&~t,a!==0&&(u=Jt(a))))):(R=o&~f,R!==0?u=Jt(R):y!==0?u=Jt(y):a||(a=o&~t,a!==0&&(u=Jt(a)))),u===0?0:n!==0&&n!==u&&(n&f)===0&&(f=u&-u,a=n&-n,f>=a||f===32&&(a&4194048)!==0)?n:u}function Pt(t,n){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&n)===0}function pn(t,n){switch(t){case 1:case 2:case 4:case 8:case 64:return n+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Rn(){var t=Tt;return Tt<<=1,(Tt&62914560)===0&&(Tt=4194304),t}function qe(t){for(var n=[],a=0;31>a;a++)n.push(t);return n}function Nn(t,n){t.pendingLanes|=n,n!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function Cn(t,n,a,o,u,f){var y=t.pendingLanes;t.pendingLanes=a,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=a,t.entangledLanes&=a,t.errorRecoveryDisabledLanes&=a,t.shellSuspendCounter=0;var R=t.entanglements,q=t.expirationTimes,ht=t.hiddenUpdates;for(a=y&~a;0<a;){var bt=31-Te(a),Ut=1<<bt;R[bt]=0,q[bt]=-1;var gt=ht[bt];if(gt!==null)for(ht[bt]=null,bt=0;bt<gt.length;bt++){var Mt=gt[bt];Mt!==null&&(Mt.lane&=-536870913)}a&=~Ut}o!==0&&ta(t,o,0),f!==0&&u===0&&t.tag!==0&&(t.suspendedLanes|=f&~(y&~n))}function ta(t,n,a){t.pendingLanes|=n,t.suspendedLanes&=~n;var o=31-Te(n);t.entangledLanes|=n,t.entanglements[o]=t.entanglements[o]|1073741824|a&261930}function Hi(t,n){var a=t.entangledLanes|=n;for(t=t.entanglements;a;){var o=31-Te(a),u=1<<o;u&n|t[o]&n&&(t[o]|=n),a&=~u}}function ni(t,n){var a=n&-n;return a=(a&42)!==0?1:Be(a),(a&(t.suspendedLanes|n))!==0?0:a}function Be(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function ii(t){return t&=-t,2<t?8<t?(t&134217727)!==0?32:268435456:8:2}function vn(){var t=X.p;return t!==0?t:(t=window.event,t===void 0?32:z0(t.type))}function Ie(t,n){var a=X.p;try{return X.p=t,n()}finally{X.p=a}}var bn=Math.random().toString(36).slice(2),rn="__reactFiber$"+bn,mn="__reactProps$"+bn,li="__reactContainer$"+bn,Ci="__reactEvents$"+bn,la="__reactListeners$"+bn,wi="__reactHandles$"+bn,C="__reactResources$"+bn,et="__reactMarker$"+bn;function dt(t){delete t[rn],delete t[mn],delete t[Ci],delete t[la],delete t[wi]}function ft(t){var n=t[rn];if(n)return n;for(var a=t.parentNode;a;){if(n=a[li]||a[rn]){if(a=n.alternate,n.child!==null||a!==null&&a.child!==null)for(t=x0(t);t!==null;){if(a=t[rn])return a;t=x0(t)}return n}t=a,a=t.parentNode}return null}function it(t){if(t=t[rn]||t[li]){var n=t.tag;if(n===5||n===6||n===13||n===31||n===26||n===27||n===3)return t}return null}function Vt(t){var n=t.tag;if(n===5||n===26||n===27||n===6)return t.stateNode;throw Error(s(33))}function ee(t){var n=t[C];return n||(n=t[C]={hoistableStyles:new Map,hoistableScripts:new Map}),n}function te(t){t[et]=!0}var he=new Set,Re={};function Ee(t,n){ue(t,n),ue(t+"Capture",n)}function ue(t,n){for(Re[t]=n,t=0;t<n.length;t++)he.add(n[t])}var Ne=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),sn={},on={};function O(t){return Xe.call(on,t)?!0:Xe.call(sn,t)?!1:Ne.test(t)?on[t]=!0:(sn[t]=!0,!1)}function U(t,n,a){if(O(n))if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":t.removeAttribute(n);return;case"boolean":var o=n.toLowerCase().slice(0,5);if(o!=="data-"&&o!=="aria-"){t.removeAttribute(n);return}}t.setAttribute(n,""+a)}}function L(t,n,a){if(a===null)t.removeAttribute(n);else{switch(typeof a){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttribute(n,""+a)}}function lt(t,n,a,o){if(o===null)t.removeAttribute(a);else{switch(typeof o){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(a);return}t.setAttributeNS(n,a,""+o)}}function tt(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function Et(t){var n=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function It(t,n,a){var o=Object.getOwnPropertyDescriptor(t.constructor.prototype,n);if(!t.hasOwnProperty(n)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var u=o.get,f=o.set;return Object.defineProperty(t,n,{configurable:!0,get:function(){return u.call(this)},set:function(y){a=""+y,f.call(this,y)}}),Object.defineProperty(t,n,{enumerable:o.enumerable}),{getValue:function(){return a},setValue:function(y){a=""+y},stopTracking:function(){t._valueTracker=null,delete t[n]}}}}function Ct(t){if(!t._valueTracker){var n=Et(t)?"checked":"value";t._valueTracker=It(t,n,""+t[n])}}function Ht(t){if(!t)return!1;var n=t._valueTracker;if(!n)return!0;var a=n.getValue(),o="";return t&&(o=Et(t)?t.checked?"true":"false":t.value),t=o,t!==a?(n.setValue(t),!0):!1}function Bt(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var oe=/[\n"\\]/g;function Nt(t){return t.replace(oe,function(n){return"\\"+n.charCodeAt(0).toString(16)+" "})}function Yt(t,n,a,o,u,f,y,R){t.name="",y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"?t.type=y:t.removeAttribute("type"),n!=null?y==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+tt(n)):t.value!==""+tt(n)&&(t.value=""+tt(n)):y!=="submit"&&y!=="reset"||t.removeAttribute("value"),n!=null?fe(t,y,tt(n)):a!=null?fe(t,y,tt(a)):o!=null&&t.removeAttribute("value"),u==null&&f!=null&&(t.defaultChecked=!!f),u!=null&&(t.checked=u&&typeof u!="function"&&typeof u!="symbol"),R!=null&&typeof R!="function"&&typeof R!="symbol"&&typeof R!="boolean"?t.name=""+tt(R):t.removeAttribute("name")}function ge(t,n,a,o,u,f,y,R){if(f!=null&&typeof f!="function"&&typeof f!="symbol"&&typeof f!="boolean"&&(t.type=f),n!=null||a!=null){if(!(f!=="submit"&&f!=="reset"||n!=null)){Ct(t);return}a=a!=null?""+tt(a):"",n=n!=null?""+tt(n):a,R||n===t.value||(t.value=n),t.defaultValue=n}o=o??u,o=typeof o!="function"&&typeof o!="symbol"&&!!o,t.checked=R?t.checked:!!o,t.defaultChecked=!!o,y!=null&&typeof y!="function"&&typeof y!="symbol"&&typeof y!="boolean"&&(t.name=y),Ct(t)}function fe(t,n,a){n==="number"&&Bt(t.ownerDocument)===t||t.defaultValue===""+a||(t.defaultValue=""+a)}function de(t,n,a,o){if(t=t.options,n){n={};for(var u=0;u<a.length;u++)n["$"+a[u]]=!0;for(a=0;a<t.length;a++)u=n.hasOwnProperty("$"+t[a].value),t[a].selected!==u&&(t[a].selected=u),u&&o&&(t[a].defaultSelected=!0)}else{for(a=""+tt(a),n=null,u=0;u<t.length;u++){if(t[u].value===a){t[u].selected=!0,o&&(t[u].defaultSelected=!0);return}n!==null||t[u].disabled||(n=t[u])}n!==null&&(n.selected=!0)}}function Se(t,n,a){if(n!=null&&(n=""+tt(n),n!==t.value&&(t.value=n),a==null)){t.defaultValue!==n&&(t.defaultValue=n);return}t.defaultValue=a!=null?""+tt(a):""}function fn(t,n,a,o){if(n==null){if(o!=null){if(a!=null)throw Error(s(92));if(_t(o)){if(1<o.length)throw Error(s(93));o=o[0]}a=o}a==null&&(a=""),n=a}a=tt(n),t.defaultValue=a,o=t.textContent,o===a&&o!==""&&o!==null&&(t.value=o),Ct(t)}function De(t,n){if(n){var a=t.firstChild;if(a&&a===t.lastChild&&a.nodeType===3){a.nodeValue=n;return}}t.textContent=n}var Fe=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Ye(t,n,a){var o=n.indexOf("--")===0;a==null||typeof a=="boolean"||a===""?o?t.setProperty(n,""):n==="float"?t.cssFloat="":t[n]="":o?t.setProperty(n,a):typeof a!="number"||a===0||Fe.has(n)?n==="float"?t.cssFloat=a:t[n]=(""+a).trim():t[n]=a+"px"}function On(t,n,a){if(n!=null&&typeof n!="object")throw Error(s(62));if(t=t.style,a!=null){for(var o in a)!a.hasOwnProperty(o)||n!=null&&n.hasOwnProperty(o)||(o.indexOf("--")===0?t.setProperty(o,""):o==="float"?t.cssFloat="":t[o]="");for(var u in n)o=n[u],n.hasOwnProperty(u)&&a[u]!==o&&Ye(t,u,o)}else for(var f in n)n.hasOwnProperty(f)&&Ye(t,f,n[f])}function In(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ln=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),cn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function He(t){return cn.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function We(){}var mt=null;function Zt(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var kt=null,ne=null;function _e(t){var n=it(t);if(n&&(t=n.stateNode)){var a=t[mn]||null;t:switch(t=n.stateNode,n.type){case"input":if(Yt(t,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name),n=a.name,a.type==="radio"&&n!=null){for(a=t;a.parentNode;)a=a.parentNode;for(a=a.querySelectorAll('input[name="'+Nt(""+n)+'"][type="radio"]'),n=0;n<a.length;n++){var o=a[n];if(o!==t&&o.form===t.form){var u=o[mn]||null;if(!u)throw Error(s(90));Yt(o,u.value,u.defaultValue,u.defaultValue,u.checked,u.defaultChecked,u.type,u.name)}}for(n=0;n<a.length;n++)o=a[n],o.form===t.form&&Ht(o)}break t;case"textarea":Se(t,a.value,a.defaultValue);break t;case"select":n=a.value,n!=null&&de(t,!!a.multiple,n,!1)}}}var Ke=!1;function Ae(t,n,a){if(Ke)return t(n,a);Ke=!0;try{var o=t(n);return o}finally{if(Ke=!1,(kt!==null||ne!==null)&&(lc(),kt&&(n=kt,t=ne,ne=kt=null,_e(n),t)))for(n=0;n<t.length;n++)_e(t[n])}}function zn(t,n){var a=t.stateNode;if(a===null)return null;var o=a[mn]||null;if(o===null)return null;a=o[n];t:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(o=!o.disabled)||(t=t.type,o=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!o;break t;default:t=!1}if(t)return null;if(a&&typeof a!="function")throw Error(s(231,n,typeof a));return a}var Ze=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ye=!1;if(Ze)try{var Qe={};Object.defineProperty(Qe,"passive",{get:function(){ye=!0}}),window.addEventListener("test",Qe,Qe),window.removeEventListener("test",Qe,Qe)}catch{ye=!1}var hi=null,Wa=null,_a=null;function vo(){if(_a)return _a;var t,n=Wa,a=n.length,o,u="value"in hi?hi.value:hi.textContent,f=u.length;for(t=0;t<a&&n[t]===u[t];t++);var y=a-t;for(o=1;o<=y&&n[a-o]===u[f-o];o++);return _a=u.slice(t,1<o?1-o:void 0)}function ja(t){var n=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&n===13&&(t=13)):t=n,t===10&&(t=13),32<=t||t===13?t:0}function bl(){return!0}function dp(){return!1}function _i(t){function n(a,o,u,f,y){this._reactName=a,this._targetInst=u,this.type=o,this.nativeEvent=f,this.target=y,this.currentTarget=null;for(var R in t)t.hasOwnProperty(R)&&(a=t[R],this[R]=a?a(f):f[R]);return this.isDefaultPrevented=(f.defaultPrevented!=null?f.defaultPrevented:f.returnValue===!1)?bl:dp,this.isPropagationStopped=dp,this}return g(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var a=this.nativeEvent;a&&(a.preventDefault?a.preventDefault():typeof a.returnValue!="unknown"&&(a.returnValue=!1),this.isDefaultPrevented=bl)},stopPropagation:function(){var a=this.nativeEvent;a&&(a.stopPropagation?a.stopPropagation():typeof a.cancelBubble!="unknown"&&(a.cancelBubble=!0),this.isPropagationStopped=bl)},persist:function(){},isPersistent:bl}),n}var Cs={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Tl=_i(Cs),_o=g({},Cs,{view:0,detail:0}),Y_=_i(_o),bu,Tu,xo,Al=g({},_o,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ru,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==xo&&(xo&&t.type==="mousemove"?(bu=t.screenX-xo.screenX,Tu=t.screenY-xo.screenY):Tu=bu=0,xo=t),bu)},movementY:function(t){return"movementY"in t?t.movementY:Tu}}),pp=_i(Al),Z_=g({},Al,{dataTransfer:0}),K_=_i(Z_),Q_=g({},_o,{relatedTarget:0}),Au=_i(Q_),J_=g({},Cs,{animationName:0,elapsedTime:0,pseudoElement:0}),$_=_i(J_),tx=g({},Cs,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ex=_i(tx),nx=g({},Cs,{data:0}),mp=_i(nx),ix={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ax={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},sx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function rx(t){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(t):(t=sx[t])?!!n[t]:!1}function Ru(){return rx}var ox=g({},_o,{key:function(t){if(t.key){var n=ix[t.key]||t.key;if(n!=="Unidentified")return n}return t.type==="keypress"?(t=ja(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ax[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ru,charCode:function(t){return t.type==="keypress"?ja(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?ja(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),lx=_i(ox),cx=g({},Al,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),gp=_i(cx),ux=g({},_o,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ru}),fx=_i(ux),hx=g({},Cs,{propertyName:0,elapsedTime:0,pseudoElement:0}),dx=_i(hx),px=g({},Al,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),mx=_i(px),gx=g({},Cs,{newState:0,oldState:0}),vx=_i(gx),_x=[9,13,27,32],Cu=Ze&&"CompositionEvent"in window,yo=null;Ze&&"documentMode"in document&&(yo=document.documentMode);var xx=Ze&&"TextEvent"in window&&!yo,vp=Ze&&(!Cu||yo&&8<yo&&11>=yo),_p=" ",xp=!1;function yp(t,n){switch(t){case"keyup":return _x.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Mp(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var ur=!1;function yx(t,n){switch(t){case"compositionend":return Mp(n);case"keypress":return n.which!==32?null:(xp=!0,_p);case"textInput":return t=n.data,t===_p&&xp?null:t;default:return null}}function Mx(t,n){if(ur)return t==="compositionend"||!Cu&&yp(t,n)?(t=vo(),_a=Wa=hi=null,ur=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return vp&&n.locale!=="ko"?null:n.data;default:return null}}var Sx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Sp(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n==="input"?!!Sx[t.type]:n==="textarea"}function Ep(t,n,a,o){kt?ne?ne.push(o):ne=[o]:kt=o,n=mc(n,"onChange"),0<n.length&&(a=new Tl("onChange","change",null,a,o),t.push({event:a,listeners:n}))}var Mo=null,So=null;function Ex(t){s0(t,0)}function Rl(t){var n=Vt(t);if(Ht(n))return t}function bp(t,n){if(t==="change")return n}var Tp=!1;if(Ze){var wu;if(Ze){var Du="oninput"in document;if(!Du){var Ap=document.createElement("div");Ap.setAttribute("oninput","return;"),Du=typeof Ap.oninput=="function"}wu=Du}else wu=!1;Tp=wu&&(!document.documentMode||9<document.documentMode)}function Rp(){Mo&&(Mo.detachEvent("onpropertychange",Cp),So=Mo=null)}function Cp(t){if(t.propertyName==="value"&&Rl(So)){var n=[];Ep(n,So,t,Zt(t)),Ae(Ex,n)}}function bx(t,n,a){t==="focusin"?(Rp(),Mo=n,So=a,Mo.attachEvent("onpropertychange",Cp)):t==="focusout"&&Rp()}function Tx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Rl(So)}function Ax(t,n){if(t==="click")return Rl(n)}function Rx(t,n){if(t==="input"||t==="change")return Rl(n)}function Cx(t,n){return t===n&&(t!==0||1/t===1/n)||t!==t&&n!==n}var Di=typeof Object.is=="function"?Object.is:Cx;function Eo(t,n){if(Di(t,n))return!0;if(typeof t!="object"||t===null||typeof n!="object"||n===null)return!1;var a=Object.keys(t),o=Object.keys(n);if(a.length!==o.length)return!1;for(o=0;o<a.length;o++){var u=a[o];if(!Xe.call(n,u)||!Di(t[u],n[u]))return!1}return!0}function wp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Dp(t,n){var a=wp(t);t=0;for(var o;a;){if(a.nodeType===3){if(o=t+a.textContent.length,t<=n&&o>=n)return{node:a,offset:n-t};t=o}t:{for(;a;){if(a.nextSibling){a=a.nextSibling;break t}a=a.parentNode}a=void 0}a=wp(a)}}function Up(t,n){return t&&n?t===n?!0:t&&t.nodeType===3?!1:n&&n.nodeType===3?Up(t,n.parentNode):"contains"in t?t.contains(n):t.compareDocumentPosition?!!(t.compareDocumentPosition(n)&16):!1:!1}function Lp(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var n=Bt(t.document);n instanceof t.HTMLIFrameElement;){try{var a=typeof n.contentWindow.location.href=="string"}catch{a=!1}if(a)t=n.contentWindow;else break;n=Bt(t.document)}return n}function Uu(t){var n=t&&t.nodeName&&t.nodeName.toLowerCase();return n&&(n==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||n==="textarea"||t.contentEditable==="true")}var wx=Ze&&"documentMode"in document&&11>=document.documentMode,fr=null,Lu=null,bo=null,Nu=!1;function Np(t,n,a){var o=a.window===a?a.document:a.nodeType===9?a:a.ownerDocument;Nu||fr==null||fr!==Bt(o)||(o=fr,"selectionStart"in o&&Uu(o)?o={start:o.selectionStart,end:o.selectionEnd}:(o=(o.ownerDocument&&o.ownerDocument.defaultView||window).getSelection(),o={anchorNode:o.anchorNode,anchorOffset:o.anchorOffset,focusNode:o.focusNode,focusOffset:o.focusOffset}),bo&&Eo(bo,o)||(bo=o,o=mc(Lu,"onSelect"),0<o.length&&(n=new Tl("onSelect","select",null,n,a),t.push({event:n,listeners:o}),n.target=fr)))}function ws(t,n){var a={};return a[t.toLowerCase()]=n.toLowerCase(),a["Webkit"+t]="webkit"+n,a["Moz"+t]="moz"+n,a}var hr={animationend:ws("Animation","AnimationEnd"),animationiteration:ws("Animation","AnimationIteration"),animationstart:ws("Animation","AnimationStart"),transitionrun:ws("Transition","TransitionRun"),transitionstart:ws("Transition","TransitionStart"),transitioncancel:ws("Transition","TransitionCancel"),transitionend:ws("Transition","TransitionEnd")},Ou={},Op={};Ze&&(Op=document.createElement("div").style,"AnimationEvent"in window||(delete hr.animationend.animation,delete hr.animationiteration.animation,delete hr.animationstart.animation),"TransitionEvent"in window||delete hr.transitionend.transition);function Ds(t){if(Ou[t])return Ou[t];if(!hr[t])return t;var n=hr[t],a;for(a in n)if(n.hasOwnProperty(a)&&a in Op)return Ou[t]=n[a];return t}var zp=Ds("animationend"),Pp=Ds("animationiteration"),Bp=Ds("animationstart"),Dx=Ds("transitionrun"),Ux=Ds("transitionstart"),Lx=Ds("transitioncancel"),Ip=Ds("transitionend"),Fp=new Map,zu="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");zu.push("scrollEnd");function ea(t,n){Fp.set(t,n),Ee(n,[t])}var Cl=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var n=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(n))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Gi=[],dr=0,Pu=0;function wl(){for(var t=dr,n=Pu=dr=0;n<t;){var a=Gi[n];Gi[n++]=null;var o=Gi[n];Gi[n++]=null;var u=Gi[n];Gi[n++]=null;var f=Gi[n];if(Gi[n++]=null,o!==null&&u!==null){var y=o.pending;y===null?u.next=u:(u.next=y.next,y.next=u),o.pending=u}f!==0&&Hp(a,u,f)}}function Dl(t,n,a,o){Gi[dr++]=t,Gi[dr++]=n,Gi[dr++]=a,Gi[dr++]=o,Pu|=o,t.lanes|=o,t=t.alternate,t!==null&&(t.lanes|=o)}function Bu(t,n,a,o){return Dl(t,n,a,o),Ul(t)}function Us(t,n){return Dl(t,null,null,n),Ul(t)}function Hp(t,n,a){t.lanes|=a;var o=t.alternate;o!==null&&(o.lanes|=a);for(var u=!1,f=t.return;f!==null;)f.childLanes|=a,o=f.alternate,o!==null&&(o.childLanes|=a),f.tag===22&&(t=f.stateNode,t===null||t._visibility&1||(u=!0)),t=f,f=f.return;return t.tag===3?(f=t.stateNode,u&&n!==null&&(u=31-Te(a),t=f.hiddenUpdates,o=t[u],o===null?t[u]=[n]:o.push(n),n.lane=a|536870912),f):null}function Ul(t){if(50<Wo)throw Wo=0,jf=null,Error(s(185));for(var n=t.return;n!==null;)t=n,n=t.return;return t.tag===3?t.stateNode:null}var pr={};function Nx(t,n,a,o){this.tag=t,this.key=a,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=o,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ui(t,n,a,o){return new Nx(t,n,a,o)}function Iu(t){return t=t.prototype,!(!t||!t.isReactComponent)}function xa(t,n){var a=t.alternate;return a===null?(a=Ui(t.tag,n,t.key,t.mode),a.elementType=t.elementType,a.type=t.type,a.stateNode=t.stateNode,a.alternate=t,t.alternate=a):(a.pendingProps=n,a.type=t.type,a.flags=0,a.subtreeFlags=0,a.deletions=null),a.flags=t.flags&65011712,a.childLanes=t.childLanes,a.lanes=t.lanes,a.child=t.child,a.memoizedProps=t.memoizedProps,a.memoizedState=t.memoizedState,a.updateQueue=t.updateQueue,n=t.dependencies,a.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},a.sibling=t.sibling,a.index=t.index,a.ref=t.ref,a.refCleanup=t.refCleanup,a}function Gp(t,n){t.flags&=65011714;var a=t.alternate;return a===null?(t.childLanes=0,t.lanes=n,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=a.childLanes,t.lanes=a.lanes,t.child=a.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=a.memoizedProps,t.memoizedState=a.memoizedState,t.updateQueue=a.updateQueue,t.type=a.type,n=a.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext}),t}function Ll(t,n,a,o,u,f){var y=0;if(o=t,typeof t=="function")Iu(t)&&(y=1);else if(typeof t=="string")y=Iy(t,a,K.current)?26:t==="html"||t==="head"||t==="body"?27:5;else t:switch(t){case N:return t=Ui(31,a,n,u),t.elementType=N,t.lanes=f,t;case T:return Ls(a.children,u,f,n);case M:y=8,u|=24;break;case v:return t=Ui(12,a,n,u|2),t.elementType=v,t.lanes=f,t;case Q:return t=Ui(13,a,n,u),t.elementType=Q,t.lanes=f,t;case H:return t=Ui(19,a,n,u),t.elementType=H,t.lanes=f,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case F:y=10;break t;case I:y=9;break t;case z:y=11;break t;case D:y=14;break t;case j:y=16,o=null;break t}y=29,a=Error(s(130,t===null?"null":typeof t,"")),o=null}return n=Ui(y,a,n,u),n.elementType=t,n.type=o,n.lanes=f,n}function Ls(t,n,a,o){return t=Ui(7,t,o,n),t.lanes=a,t}function Fu(t,n,a){return t=Ui(6,t,null,n),t.lanes=a,t}function Vp(t){var n=Ui(18,null,null,0);return n.stateNode=t,n}function Hu(t,n,a){return n=Ui(4,t.children!==null?t.children:[],t.key,n),n.lanes=a,n.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},n}var kp=new WeakMap;function Vi(t,n){if(typeof t=="object"&&t!==null){var a=kp.get(t);return a!==void 0?a:(n={value:t,source:n,stack:Kt(n)},kp.set(t,n),n)}return{value:t,source:n,stack:Kt(n)}}var mr=[],gr=0,Nl=null,To=0,ki=[],Xi=0,Ya=null,ca=1,ua="";function ya(t,n){mr[gr++]=To,mr[gr++]=Nl,Nl=t,To=n}function Xp(t,n,a){ki[Xi++]=ca,ki[Xi++]=ua,ki[Xi++]=Ya,Ya=t;var o=ca;t=ua;var u=32-Te(o)-1;o&=~(1<<u),a+=1;var f=32-Te(n)+u;if(30<f){var y=u-u%5;f=(o&(1<<y)-1).toString(32),o>>=y,u-=y,ca=1<<32-Te(n)+u|a<<u|o,ua=f+t}else ca=1<<f|a<<u|o,ua=t}function Gu(t){t.return!==null&&(ya(t,1),Xp(t,1,0))}function Vu(t){for(;t===Nl;)Nl=mr[--gr],mr[gr]=null,To=mr[--gr],mr[gr]=null;for(;t===Ya;)Ya=ki[--Xi],ki[Xi]=null,ua=ki[--Xi],ki[Xi]=null,ca=ki[--Xi],ki[Xi]=null}function qp(t,n){ki[Xi++]=ca,ki[Xi++]=ua,ki[Xi++]=Ya,ca=n.id,ua=n.overflow,Ya=t}var ai=null,Un=null,nn=!1,Za=null,qi=!1,ku=Error(s(519));function Ka(t){var n=Error(s(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Ao(Vi(n,t)),ku}function Wp(t){var n=t.stateNode,a=t.type,o=t.memoizedProps;switch(n[rn]=t,n[mn]=o,a){case"dialog":$e("cancel",n),$e("close",n);break;case"iframe":case"object":case"embed":$e("load",n);break;case"video":case"audio":for(a=0;a<Yo.length;a++)$e(Yo[a],n);break;case"source":$e("error",n);break;case"img":case"image":case"link":$e("error",n),$e("load",n);break;case"details":$e("toggle",n);break;case"input":$e("invalid",n),ge(n,o.value,o.defaultValue,o.checked,o.defaultChecked,o.type,o.name,!0);break;case"select":$e("invalid",n);break;case"textarea":$e("invalid",n),fn(n,o.value,o.defaultValue,o.children)}a=o.children,typeof a!="string"&&typeof a!="number"&&typeof a!="bigint"||n.textContent===""+a||o.suppressHydrationWarning===!0||c0(n.textContent,a)?(o.popover!=null&&($e("beforetoggle",n),$e("toggle",n)),o.onScroll!=null&&$e("scroll",n),o.onScrollEnd!=null&&$e("scrollend",n),o.onClick!=null&&(n.onclick=We),n=!0):n=!1,n||Ka(t,!0)}function jp(t){for(ai=t.return;ai;)switch(ai.tag){case 5:case 31:case 13:qi=!1;return;case 27:case 3:qi=!0;return;default:ai=ai.return}}function vr(t){if(t!==ai)return!1;if(!nn)return jp(t),nn=!0,!1;var n=t.tag,a;if((a=n!==3&&n!==27)&&((a=n===5)&&(a=t.type,a=!(a!=="form"&&a!=="button")||lh(t.type,t.memoizedProps)),a=!a),a&&Un&&Ka(t),jp(t),n===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Un=_0(t)}else if(n===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));Un=_0(t)}else n===27?(n=Un,us(t.type)?(t=dh,dh=null,Un=t):Un=n):Un=ai?ji(t.stateNode.nextSibling):null;return!0}function Ns(){Un=ai=null,nn=!1}function Xu(){var t=Za;return t!==null&&(Si===null?Si=t:Si.push.apply(Si,t),Za=null),t}function Ao(t){Za===null?Za=[t]:Za.push(t)}var qu=V(null),Os=null,Ma=null;function Qa(t,n,a){Lt(qu,n._currentValue),n._currentValue=a}function Sa(t){t._currentValue=qu.current,ct(qu)}function Wu(t,n,a){for(;t!==null;){var o=t.alternate;if((t.childLanes&n)!==n?(t.childLanes|=n,o!==null&&(o.childLanes|=n)):o!==null&&(o.childLanes&n)!==n&&(o.childLanes|=n),t===a)break;t=t.return}}function ju(t,n,a,o){var u=t.child;for(u!==null&&(u.return=t);u!==null;){var f=u.dependencies;if(f!==null){var y=u.child;f=f.firstContext;t:for(;f!==null;){var R=f;f=u;for(var q=0;q<n.length;q++)if(R.context===n[q]){f.lanes|=a,R=f.alternate,R!==null&&(R.lanes|=a),Wu(f.return,a,t),o||(y=null);break t}f=R.next}}else if(u.tag===18){if(y=u.return,y===null)throw Error(s(341));y.lanes|=a,f=y.alternate,f!==null&&(f.lanes|=a),Wu(y,a,t),y=null}else y=u.child;if(y!==null)y.return=u;else for(y=u;y!==null;){if(y===t){y=null;break}if(u=y.sibling,u!==null){u.return=y.return,y=u;break}y=y.return}u=y}}function _r(t,n,a,o){t=null;for(var u=n,f=!1;u!==null;){if(!f){if((u.flags&524288)!==0)f=!0;else if((u.flags&262144)!==0)break}if(u.tag===10){var y=u.alternate;if(y===null)throw Error(s(387));if(y=y.memoizedProps,y!==null){var R=u.type;Di(u.pendingProps.value,y.value)||(t!==null?t.push(R):t=[R])}}else if(u===wt.current){if(y=u.alternate,y===null)throw Error(s(387));y.memoizedState.memoizedState!==u.memoizedState.memoizedState&&(t!==null?t.push($o):t=[$o])}u=u.return}t!==null&&ju(n,t,a,o),n.flags|=262144}function Ol(t){for(t=t.firstContext;t!==null;){if(!Di(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function zs(t){Os=t,Ma=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function si(t){return Yp(Os,t)}function zl(t,n){return Os===null&&zs(t),Yp(t,n)}function Yp(t,n){var a=n._currentValue;if(n={context:n,memoizedValue:a,next:null},Ma===null){if(t===null)throw Error(s(308));Ma=n,t.dependencies={lanes:0,firstContext:n},t.flags|=524288}else Ma=Ma.next=n;return a}var Ox=typeof AbortController<"u"?AbortController:function(){var t=[],n=this.signal={aborted:!1,addEventListener:function(a,o){t.push(o)}};this.abort=function(){n.aborted=!0,t.forEach(function(a){return a()})}},zx=r.unstable_scheduleCallback,Px=r.unstable_NormalPriority,Wn={$$typeof:F,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Yu(){return{controller:new Ox,data:new Map,refCount:0}}function Ro(t){t.refCount--,t.refCount===0&&zx(Px,function(){t.controller.abort()})}var Co=null,Zu=0,xr=0,yr=null;function Bx(t,n){if(Co===null){var a=Co=[];Zu=0,xr=$f(),yr={status:"pending",value:void 0,then:function(o){a.push(o)}}}return Zu++,n.then(Zp,Zp),n}function Zp(){if(--Zu===0&&Co!==null){yr!==null&&(yr.status="fulfilled");var t=Co;Co=null,xr=0,yr=null;for(var n=0;n<t.length;n++)(0,t[n])()}}function Ix(t,n){var a=[],o={status:"pending",value:null,reason:null,then:function(u){a.push(u)}};return t.then(function(){o.status="fulfilled",o.value=n;for(var u=0;u<a.length;u++)(0,a[u])(n)},function(u){for(o.status="rejected",o.reason=u,u=0;u<a.length;u++)(0,a[u])(void 0)}),o}var Kp=w.S;w.S=function(t,n){Ng=xt(),typeof n=="object"&&n!==null&&typeof n.then=="function"&&Bx(t,n),Kp!==null&&Kp(t,n)};var Ps=V(null);function Ku(){var t=Ps.current;return t!==null?t:Tn.pooledCache}function Pl(t,n){n===null?Lt(Ps,Ps.current):Lt(Ps,n.pool)}function Qp(){var t=Ku();return t===null?null:{parent:Wn._currentValue,pool:t}}var Mr=Error(s(460)),Qu=Error(s(474)),Bl=Error(s(542)),Il={then:function(){}};function Jp(t){return t=t.status,t==="fulfilled"||t==="rejected"}function $p(t,n,a){switch(a=t[a],a===void 0?t.push(n):a!==n&&(n.then(We,We),n=a),n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,em(t),t;default:if(typeof n.status=="string")n.then(We,We);else{if(t=Tn,t!==null&&100<t.shellSuspendCounter)throw Error(s(482));t=n,t.status="pending",t.then(function(o){if(n.status==="pending"){var u=n;u.status="fulfilled",u.value=o}},function(o){if(n.status==="pending"){var u=n;u.status="rejected",u.reason=o}})}switch(n.status){case"fulfilled":return n.value;case"rejected":throw t=n.reason,em(t),t}throw Is=n,Mr}}function Bs(t){try{var n=t._init;return n(t._payload)}catch(a){throw a!==null&&typeof a=="object"&&typeof a.then=="function"?(Is=a,Mr):a}}var Is=null;function tm(){if(Is===null)throw Error(s(459));var t=Is;return Is=null,t}function em(t){if(t===Mr||t===Bl)throw Error(s(483))}var Sr=null,wo=0;function Fl(t){var n=wo;return wo+=1,Sr===null&&(Sr=[]),$p(Sr,t,n)}function Do(t,n){n=n.props.ref,t.ref=n!==void 0?n:null}function Hl(t,n){throw n.$$typeof===x?Error(s(525)):(t=Object.prototype.toString.call(n),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":t)))}function nm(t){function n(st,J){if(t){var ut=st.deletions;ut===null?(st.deletions=[J],st.flags|=16):ut.push(J)}}function a(st,J){if(!t)return null;for(;J!==null;)n(st,J),J=J.sibling;return null}function o(st){for(var J=new Map;st!==null;)st.key!==null?J.set(st.key,st):J.set(st.index,st),st=st.sibling;return J}function u(st,J){return st=xa(st,J),st.index=0,st.sibling=null,st}function f(st,J,ut){return st.index=ut,t?(ut=st.alternate,ut!==null?(ut=ut.index,ut<J?(st.flags|=67108866,J):ut):(st.flags|=67108866,J)):(st.flags|=1048576,J)}function y(st){return t&&st.alternate===null&&(st.flags|=67108866),st}function R(st,J,ut,Rt){return J===null||J.tag!==6?(J=Fu(ut,st.mode,Rt),J.return=st,J):(J=u(J,ut),J.return=st,J)}function q(st,J,ut,Rt){var be=ut.type;return be===T?bt(st,J,ut.props.children,Rt,ut.key):J!==null&&(J.elementType===be||typeof be=="object"&&be!==null&&be.$$typeof===j&&Bs(be)===J.type)?(J=u(J,ut.props),Do(J,ut),J.return=st,J):(J=Ll(ut.type,ut.key,ut.props,null,st.mode,Rt),Do(J,ut),J.return=st,J)}function ht(st,J,ut,Rt){return J===null||J.tag!==4||J.stateNode.containerInfo!==ut.containerInfo||J.stateNode.implementation!==ut.implementation?(J=Hu(ut,st.mode,Rt),J.return=st,J):(J=u(J,ut.children||[]),J.return=st,J)}function bt(st,J,ut,Rt,be){return J===null||J.tag!==7?(J=Ls(ut,st.mode,Rt,be),J.return=st,J):(J=u(J,ut),J.return=st,J)}function Ut(st,J,ut){if(typeof J=="string"&&J!==""||typeof J=="number"||typeof J=="bigint")return J=Fu(""+J,st.mode,ut),J.return=st,J;if(typeof J=="object"&&J!==null){switch(J.$$typeof){case S:return ut=Ll(J.type,J.key,J.props,null,st.mode,ut),Do(ut,J),ut.return=st,ut;case E:return J=Hu(J,st.mode,ut),J.return=st,J;case j:return J=Bs(J),Ut(st,J,ut)}if(_t(J)||Y(J))return J=Ls(J,st.mode,ut,null),J.return=st,J;if(typeof J.then=="function")return Ut(st,Fl(J),ut);if(J.$$typeof===F)return Ut(st,zl(st,J),ut);Hl(st,J)}return null}function gt(st,J,ut,Rt){var be=J!==null?J.key:null;if(typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint")return be!==null?null:R(st,J,""+ut,Rt);if(typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case S:return ut.key===be?q(st,J,ut,Rt):null;case E:return ut.key===be?ht(st,J,ut,Rt):null;case j:return ut=Bs(ut),gt(st,J,ut,Rt)}if(_t(ut)||Y(ut))return be!==null?null:bt(st,J,ut,Rt,null);if(typeof ut.then=="function")return gt(st,J,Fl(ut),Rt);if(ut.$$typeof===F)return gt(st,J,zl(st,ut),Rt);Hl(st,ut)}return null}function Mt(st,J,ut,Rt,be){if(typeof Rt=="string"&&Rt!==""||typeof Rt=="number"||typeof Rt=="bigint")return st=st.get(ut)||null,R(J,st,""+Rt,be);if(typeof Rt=="object"&&Rt!==null){switch(Rt.$$typeof){case S:return st=st.get(Rt.key===null?ut:Rt.key)||null,q(J,st,Rt,be);case E:return st=st.get(Rt.key===null?ut:Rt.key)||null,ht(J,st,Rt,be);case j:return Rt=Bs(Rt),Mt(st,J,ut,Rt,be)}if(_t(Rt)||Y(Rt))return st=st.get(ut)||null,bt(J,st,Rt,be,null);if(typeof Rt.then=="function")return Mt(st,J,ut,Fl(Rt),be);if(Rt.$$typeof===F)return Mt(st,J,ut,zl(J,Rt),be);Hl(J,Rt)}return null}function pe(st,J,ut,Rt){for(var be=null,hn=null,ve=J,Ge=J=0,en=null;ve!==null&&Ge<ut.length;Ge++){ve.index>Ge?(en=ve,ve=null):en=ve.sibling;var dn=gt(st,ve,ut[Ge],Rt);if(dn===null){ve===null&&(ve=en);break}t&&ve&&dn.alternate===null&&n(st,ve),J=f(dn,J,Ge),hn===null?be=dn:hn.sibling=dn,hn=dn,ve=en}if(Ge===ut.length)return a(st,ve),nn&&ya(st,Ge),be;if(ve===null){for(;Ge<ut.length;Ge++)ve=Ut(st,ut[Ge],Rt),ve!==null&&(J=f(ve,J,Ge),hn===null?be=ve:hn.sibling=ve,hn=ve);return nn&&ya(st,Ge),be}for(ve=o(ve);Ge<ut.length;Ge++)en=Mt(ve,st,Ge,ut[Ge],Rt),en!==null&&(t&&en.alternate!==null&&ve.delete(en.key===null?Ge:en.key),J=f(en,J,Ge),hn===null?be=en:hn.sibling=en,hn=en);return t&&ve.forEach(function(ms){return n(st,ms)}),nn&&ya(st,Ge),be}function Ce(st,J,ut,Rt){if(ut==null)throw Error(s(151));for(var be=null,hn=null,ve=J,Ge=J=0,en=null,dn=ut.next();ve!==null&&!dn.done;Ge++,dn=ut.next()){ve.index>Ge?(en=ve,ve=null):en=ve.sibling;var ms=gt(st,ve,dn.value,Rt);if(ms===null){ve===null&&(ve=en);break}t&&ve&&ms.alternate===null&&n(st,ve),J=f(ms,J,Ge),hn===null?be=ms:hn.sibling=ms,hn=ms,ve=en}if(dn.done)return a(st,ve),nn&&ya(st,Ge),be;if(ve===null){for(;!dn.done;Ge++,dn=ut.next())dn=Ut(st,dn.value,Rt),dn!==null&&(J=f(dn,J,Ge),hn===null?be=dn:hn.sibling=dn,hn=dn);return nn&&ya(st,Ge),be}for(ve=o(ve);!dn.done;Ge++,dn=ut.next())dn=Mt(ve,st,Ge,dn.value,Rt),dn!==null&&(t&&dn.alternate!==null&&ve.delete(dn.key===null?Ge:dn.key),J=f(dn,J,Ge),hn===null?be=dn:hn.sibling=dn,hn=dn);return t&&ve.forEach(function(Zy){return n(st,Zy)}),nn&&ya(st,Ge),be}function Sn(st,J,ut,Rt){if(typeof ut=="object"&&ut!==null&&ut.type===T&&ut.key===null&&(ut=ut.props.children),typeof ut=="object"&&ut!==null){switch(ut.$$typeof){case S:t:{for(var be=ut.key;J!==null;){if(J.key===be){if(be=ut.type,be===T){if(J.tag===7){a(st,J.sibling),Rt=u(J,ut.props.children),Rt.return=st,st=Rt;break t}}else if(J.elementType===be||typeof be=="object"&&be!==null&&be.$$typeof===j&&Bs(be)===J.type){a(st,J.sibling),Rt=u(J,ut.props),Do(Rt,ut),Rt.return=st,st=Rt;break t}a(st,J);break}else n(st,J);J=J.sibling}ut.type===T?(Rt=Ls(ut.props.children,st.mode,Rt,ut.key),Rt.return=st,st=Rt):(Rt=Ll(ut.type,ut.key,ut.props,null,st.mode,Rt),Do(Rt,ut),Rt.return=st,st=Rt)}return y(st);case E:t:{for(be=ut.key;J!==null;){if(J.key===be)if(J.tag===4&&J.stateNode.containerInfo===ut.containerInfo&&J.stateNode.implementation===ut.implementation){a(st,J.sibling),Rt=u(J,ut.children||[]),Rt.return=st,st=Rt;break t}else{a(st,J);break}else n(st,J);J=J.sibling}Rt=Hu(ut,st.mode,Rt),Rt.return=st,st=Rt}return y(st);case j:return ut=Bs(ut),Sn(st,J,ut,Rt)}if(_t(ut))return pe(st,J,ut,Rt);if(Y(ut)){if(be=Y(ut),typeof be!="function")throw Error(s(150));return ut=be.call(ut),Ce(st,J,ut,Rt)}if(typeof ut.then=="function")return Sn(st,J,Fl(ut),Rt);if(ut.$$typeof===F)return Sn(st,J,zl(st,ut),Rt);Hl(st,ut)}return typeof ut=="string"&&ut!==""||typeof ut=="number"||typeof ut=="bigint"?(ut=""+ut,J!==null&&J.tag===6?(a(st,J.sibling),Rt=u(J,ut),Rt.return=st,st=Rt):(a(st,J),Rt=Fu(ut,st.mode,Rt),Rt.return=st,st=Rt),y(st)):a(st,J)}return function(st,J,ut,Rt){try{wo=0;var be=Sn(st,J,ut,Rt);return Sr=null,be}catch(ve){if(ve===Mr||ve===Bl)throw ve;var hn=Ui(29,ve,null,st.mode);return hn.lanes=Rt,hn.return=st,hn}}}var Fs=nm(!0),im=nm(!1),Ja=!1;function Ju(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function $u(t,n){t=t.updateQueue,n.updateQueue===t&&(n.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function $a(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ts(t,n,a){var o=t.updateQueue;if(o===null)return null;if(o=o.shared,(gn&2)!==0){var u=o.pending;return u===null?n.next=n:(n.next=u.next,u.next=n),o.pending=n,n=Ul(t),Hp(t,null,a),n}return Dl(t,o,n,a),Ul(t)}function Uo(t,n,a){if(n=n.updateQueue,n!==null&&(n=n.shared,(a&4194048)!==0)){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Hi(t,a)}}function tf(t,n){var a=t.updateQueue,o=t.alternate;if(o!==null&&(o=o.updateQueue,a===o)){var u=null,f=null;if(a=a.firstBaseUpdate,a!==null){do{var y={lane:a.lane,tag:a.tag,payload:a.payload,callback:null,next:null};f===null?u=f=y:f=f.next=y,a=a.next}while(a!==null);f===null?u=f=n:f=f.next=n}else u=f=n;a={baseState:o.baseState,firstBaseUpdate:u,lastBaseUpdate:f,shared:o.shared,callbacks:o.callbacks},t.updateQueue=a;return}t=a.lastBaseUpdate,t===null?a.firstBaseUpdate=n:t.next=n,a.lastBaseUpdate=n}var ef=!1;function Lo(){if(ef){var t=yr;if(t!==null)throw t}}function No(t,n,a,o){ef=!1;var u=t.updateQueue;Ja=!1;var f=u.firstBaseUpdate,y=u.lastBaseUpdate,R=u.shared.pending;if(R!==null){u.shared.pending=null;var q=R,ht=q.next;q.next=null,y===null?f=ht:y.next=ht,y=q;var bt=t.alternate;bt!==null&&(bt=bt.updateQueue,R=bt.lastBaseUpdate,R!==y&&(R===null?bt.firstBaseUpdate=ht:R.next=ht,bt.lastBaseUpdate=q))}if(f!==null){var Ut=u.baseState;y=0,bt=ht=q=null,R=f;do{var gt=R.lane&-536870913,Mt=gt!==R.lane;if(Mt?(tn&gt)===gt:(o&gt)===gt){gt!==0&&gt===xr&&(ef=!0),bt!==null&&(bt=bt.next={lane:0,tag:R.tag,payload:R.payload,callback:null,next:null});t:{var pe=t,Ce=R;gt=n;var Sn=a;switch(Ce.tag){case 1:if(pe=Ce.payload,typeof pe=="function"){Ut=pe.call(Sn,Ut,gt);break t}Ut=pe;break t;case 3:pe.flags=pe.flags&-65537|128;case 0:if(pe=Ce.payload,gt=typeof pe=="function"?pe.call(Sn,Ut,gt):pe,gt==null)break t;Ut=g({},Ut,gt);break t;case 2:Ja=!0}}gt=R.callback,gt!==null&&(t.flags|=64,Mt&&(t.flags|=8192),Mt=u.callbacks,Mt===null?u.callbacks=[gt]:Mt.push(gt))}else Mt={lane:gt,tag:R.tag,payload:R.payload,callback:R.callback,next:null},bt===null?(ht=bt=Mt,q=Ut):bt=bt.next=Mt,y|=gt;if(R=R.next,R===null){if(R=u.shared.pending,R===null)break;Mt=R,R=Mt.next,Mt.next=null,u.lastBaseUpdate=Mt,u.shared.pending=null}}while(!0);bt===null&&(q=Ut),u.baseState=q,u.firstBaseUpdate=ht,u.lastBaseUpdate=bt,f===null&&(u.shared.lanes=0),ss|=y,t.lanes=y,t.memoizedState=Ut}}function am(t,n){if(typeof t!="function")throw Error(s(191,t));t.call(n)}function sm(t,n){var a=t.callbacks;if(a!==null)for(t.callbacks=null,t=0;t<a.length;t++)am(a[t],n)}var Er=V(null),Gl=V(0);function rm(t,n){t=Ua,Lt(Gl,t),Lt(Er,n),Ua=t|n.baseLanes}function nf(){Lt(Gl,Ua),Lt(Er,Er.current)}function af(){Ua=Gl.current,ct(Er),ct(Gl)}var Li=V(null),Wi=null;function es(t){var n=t.alternate;Lt(Vn,Vn.current&1),Lt(Li,t),Wi===null&&(n===null||Er.current!==null||n.memoizedState!==null)&&(Wi=t)}function sf(t){Lt(Vn,Vn.current),Lt(Li,t),Wi===null&&(Wi=t)}function om(t){t.tag===22?(Lt(Vn,Vn.current),Lt(Li,t),Wi===null&&(Wi=t)):ns()}function ns(){Lt(Vn,Vn.current),Lt(Li,Li.current)}function Ni(t){ct(Li),Wi===t&&(Wi=null),ct(Vn)}var Vn=V(0);function Vl(t){for(var n=t;n!==null;){if(n.tag===13){var a=n.memoizedState;if(a!==null&&(a=a.dehydrated,a===null||fh(a)||hh(a)))return n}else if(n.tag===19&&(n.memoizedProps.revealOrder==="forwards"||n.memoizedProps.revealOrder==="backwards"||n.memoizedProps.revealOrder==="unstable_legacy-backwards"||n.memoizedProps.revealOrder==="together")){if((n.flags&128)!==0)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var Ea=0,ze=null,yn=null,jn=null,kl=!1,br=!1,Hs=!1,Xl=0,Oo=0,Tr=null,Fx=0;function Fn(){throw Error(s(321))}function rf(t,n){if(n===null)return!1;for(var a=0;a<n.length&&a<t.length;a++)if(!Di(t[a],n[a]))return!1;return!0}function of(t,n,a,o,u,f){return Ea=f,ze=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,w.H=t===null||t.memoizedState===null?Xm:Sf,Hs=!1,f=a(o,u),Hs=!1,br&&(f=cm(n,a,o,u)),lm(t),f}function lm(t){w.H=Bo;var n=yn!==null&&yn.next!==null;if(Ea=0,jn=yn=ze=null,kl=!1,Oo=0,Tr=null,n)throw Error(s(300));t===null||Yn||(t=t.dependencies,t!==null&&Ol(t)&&(Yn=!0))}function cm(t,n,a,o){ze=t;var u=0;do{if(br&&(Tr=null),Oo=0,br=!1,25<=u)throw Error(s(301));if(u+=1,jn=yn=null,t.updateQueue!=null){var f=t.updateQueue;f.lastEffect=null,f.events=null,f.stores=null,f.memoCache!=null&&(f.memoCache.index=0)}w.H=qm,f=n(a,o)}while(br);return f}function Hx(){var t=w.H,n=t.useState()[0];return n=typeof n.then=="function"?zo(n):n,t=t.useState()[0],(yn!==null?yn.memoizedState:null)!==t&&(ze.flags|=1024),n}function lf(){var t=Xl!==0;return Xl=0,t}function cf(t,n,a){n.updateQueue=t.updateQueue,n.flags&=-2053,t.lanes&=~a}function uf(t){if(kl){for(t=t.memoizedState;t!==null;){var n=t.queue;n!==null&&(n.pending=null),t=t.next}kl=!1}Ea=0,jn=yn=ze=null,br=!1,Oo=Xl=0,Tr=null}function di(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return jn===null?ze.memoizedState=jn=t:jn=jn.next=t,jn}function kn(){if(yn===null){var t=ze.alternate;t=t!==null?t.memoizedState:null}else t=yn.next;var n=jn===null?ze.memoizedState:jn.next;if(n!==null)jn=n,yn=t;else{if(t===null)throw ze.alternate===null?Error(s(467)):Error(s(310));yn=t,t={memoizedState:yn.memoizedState,baseState:yn.baseState,baseQueue:yn.baseQueue,queue:yn.queue,next:null},jn===null?ze.memoizedState=jn=t:jn=jn.next=t}return jn}function ql(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function zo(t){var n=Oo;return Oo+=1,Tr===null&&(Tr=[]),t=$p(Tr,t,n),n=ze,(jn===null?n.memoizedState:jn.next)===null&&(n=n.alternate,w.H=n===null||n.memoizedState===null?Xm:Sf),t}function Wl(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return zo(t);if(t.$$typeof===F)return si(t)}throw Error(s(438,String(t)))}function ff(t){var n=null,a=ze.updateQueue;if(a!==null&&(n=a.memoCache),n==null){var o=ze.alternate;o!==null&&(o=o.updateQueue,o!==null&&(o=o.memoCache,o!=null&&(n={data:o.data.map(function(u){return u.slice()}),index:0})))}if(n==null&&(n={data:[],index:0}),a===null&&(a=ql(),ze.updateQueue=a),a.memoCache=n,a=n.data[n.index],a===void 0)for(a=n.data[n.index]=Array(t),o=0;o<t;o++)a[o]=b;return n.index++,a}function ba(t,n){return typeof n=="function"?n(t):n}function jl(t){var n=kn();return hf(n,yn,t)}function hf(t,n,a){var o=t.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=a;var u=t.baseQueue,f=o.pending;if(f!==null){if(u!==null){var y=u.next;u.next=f.next,f.next=y}n.baseQueue=u=f,o.pending=null}if(f=t.baseState,u===null)t.memoizedState=f;else{n=u.next;var R=y=null,q=null,ht=n,bt=!1;do{var Ut=ht.lane&-536870913;if(Ut!==ht.lane?(tn&Ut)===Ut:(Ea&Ut)===Ut){var gt=ht.revertLane;if(gt===0)q!==null&&(q=q.next={lane:0,revertLane:0,gesture:null,action:ht.action,hasEagerState:ht.hasEagerState,eagerState:ht.eagerState,next:null}),Ut===xr&&(bt=!0);else if((Ea&gt)===gt){ht=ht.next,gt===xr&&(bt=!0);continue}else Ut={lane:0,revertLane:ht.revertLane,gesture:null,action:ht.action,hasEagerState:ht.hasEagerState,eagerState:ht.eagerState,next:null},q===null?(R=q=Ut,y=f):q=q.next=Ut,ze.lanes|=gt,ss|=gt;Ut=ht.action,Hs&&a(f,Ut),f=ht.hasEagerState?ht.eagerState:a(f,Ut)}else gt={lane:Ut,revertLane:ht.revertLane,gesture:ht.gesture,action:ht.action,hasEagerState:ht.hasEagerState,eagerState:ht.eagerState,next:null},q===null?(R=q=gt,y=f):q=q.next=gt,ze.lanes|=Ut,ss|=Ut;ht=ht.next}while(ht!==null&&ht!==n);if(q===null?y=f:q.next=R,!Di(f,t.memoizedState)&&(Yn=!0,bt&&(a=yr,a!==null)))throw a;t.memoizedState=f,t.baseState=y,t.baseQueue=q,o.lastRenderedState=f}return u===null&&(o.lanes=0),[t.memoizedState,o.dispatch]}function df(t){var n=kn(),a=n.queue;if(a===null)throw Error(s(311));a.lastRenderedReducer=t;var o=a.dispatch,u=a.pending,f=n.memoizedState;if(u!==null){a.pending=null;var y=u=u.next;do f=t(f,y.action),y=y.next;while(y!==u);Di(f,n.memoizedState)||(Yn=!0),n.memoizedState=f,n.baseQueue===null&&(n.baseState=f),a.lastRenderedState=f}return[f,o]}function um(t,n,a){var o=ze,u=kn(),f=nn;if(f){if(a===void 0)throw Error(s(407));a=a()}else a=n();var y=!Di((yn||u).memoizedState,a);if(y&&(u.memoizedState=a,Yn=!0),u=u.queue,gf(dm.bind(null,o,u,t),[t]),u.getSnapshot!==n||y||jn!==null&&jn.memoizedState.tag&1){if(o.flags|=2048,Ar(9,{destroy:void 0},hm.bind(null,o,u,a,n),null),Tn===null)throw Error(s(349));f||(Ea&127)!==0||fm(o,n,a)}return a}function fm(t,n,a){t.flags|=16384,t={getSnapshot:n,value:a},n=ze.updateQueue,n===null?(n=ql(),ze.updateQueue=n,n.stores=[t]):(a=n.stores,a===null?n.stores=[t]:a.push(t))}function hm(t,n,a,o){n.value=a,n.getSnapshot=o,pm(n)&&mm(t)}function dm(t,n,a){return a(function(){pm(n)&&mm(t)})}function pm(t){var n=t.getSnapshot;t=t.value;try{var a=n();return!Di(t,a)}catch{return!0}}function mm(t){var n=Us(t,2);n!==null&&Ei(n,t,2)}function pf(t){var n=di();if(typeof t=="function"){var a=t;if(t=a(),Hs){Wt(!0);try{a()}finally{Wt(!1)}}}return n.memoizedState=n.baseState=t,n.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:t},n}function gm(t,n,a,o){return t.baseState=a,hf(t,yn,typeof o=="function"?o:ba)}function Gx(t,n,a,o,u){if(Kl(t))throw Error(s(485));if(t=n.action,t!==null){var f={payload:u,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(y){f.listeners.push(y)}};w.T!==null?a(!0):f.isTransition=!1,o(f),a=n.pending,a===null?(f.next=n.pending=f,vm(n,f)):(f.next=a.next,n.pending=a.next=f)}}function vm(t,n){var a=n.action,o=n.payload,u=t.state;if(n.isTransition){var f=w.T,y={};w.T=y;try{var R=a(u,o),q=w.S;q!==null&&q(y,R),_m(t,n,R)}catch(ht){mf(t,n,ht)}finally{f!==null&&y.types!==null&&(f.types=y.types),w.T=f}}else try{f=a(u,o),_m(t,n,f)}catch(ht){mf(t,n,ht)}}function _m(t,n,a){a!==null&&typeof a=="object"&&typeof a.then=="function"?a.then(function(o){xm(t,n,o)},function(o){return mf(t,n,o)}):xm(t,n,a)}function xm(t,n,a){n.status="fulfilled",n.value=a,ym(n),t.state=a,n=t.pending,n!==null&&(a=n.next,a===n?t.pending=null:(a=a.next,n.next=a,vm(t,a)))}function mf(t,n,a){var o=t.pending;if(t.pending=null,o!==null){o=o.next;do n.status="rejected",n.reason=a,ym(n),n=n.next;while(n!==o)}t.action=null}function ym(t){t=t.listeners;for(var n=0;n<t.length;n++)(0,t[n])()}function Mm(t,n){return n}function Sm(t,n){if(nn){var a=Tn.formState;if(a!==null){t:{var o=ze;if(nn){if(Un){e:{for(var u=Un,f=qi;u.nodeType!==8;){if(!f){u=null;break e}if(u=ji(u.nextSibling),u===null){u=null;break e}}f=u.data,u=f==="F!"||f==="F"?u:null}if(u){Un=ji(u.nextSibling),o=u.data==="F!";break t}}Ka(o)}o=!1}o&&(n=a[0])}}return a=di(),a.memoizedState=a.baseState=n,o={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mm,lastRenderedState:n},a.queue=o,a=Gm.bind(null,ze,o),o.dispatch=a,o=pf(!1),f=Mf.bind(null,ze,!1,o.queue),o=di(),u={state:n,dispatch:null,action:t,pending:null},o.queue=u,a=Gx.bind(null,ze,u,f,a),u.dispatch=a,o.memoizedState=t,[n,a,!1]}function Em(t){var n=kn();return bm(n,yn,t)}function bm(t,n,a){if(n=hf(t,n,Mm)[0],t=jl(ba)[0],typeof n=="object"&&n!==null&&typeof n.then=="function")try{var o=zo(n)}catch(y){throw y===Mr?Bl:y}else o=n;n=kn();var u=n.queue,f=u.dispatch;return a!==n.memoizedState&&(ze.flags|=2048,Ar(9,{destroy:void 0},Vx.bind(null,u,a),null)),[o,f,t]}function Vx(t,n){t.action=n}function Tm(t){var n=kn(),a=yn;if(a!==null)return bm(n,a,t);kn(),n=n.memoizedState,a=kn();var o=a.queue.dispatch;return a.memoizedState=t,[n,o,!1]}function Ar(t,n,a,o){return t={tag:t,create:a,deps:o,inst:n,next:null},n=ze.updateQueue,n===null&&(n=ql(),ze.updateQueue=n),a=n.lastEffect,a===null?n.lastEffect=t.next=t:(o=a.next,a.next=t,t.next=o,n.lastEffect=t),t}function Am(){return kn().memoizedState}function Yl(t,n,a,o){var u=di();ze.flags|=t,u.memoizedState=Ar(1|n,{destroy:void 0},a,o===void 0?null:o)}function Zl(t,n,a,o){var u=kn();o=o===void 0?null:o;var f=u.memoizedState.inst;yn!==null&&o!==null&&rf(o,yn.memoizedState.deps)?u.memoizedState=Ar(n,f,a,o):(ze.flags|=t,u.memoizedState=Ar(1|n,f,a,o))}function Rm(t,n){Yl(8390656,8,t,n)}function gf(t,n){Zl(2048,8,t,n)}function kx(t){ze.flags|=4;var n=ze.updateQueue;if(n===null)n=ql(),ze.updateQueue=n,n.events=[t];else{var a=n.events;a===null?n.events=[t]:a.push(t)}}function Cm(t){var n=kn().memoizedState;return kx({ref:n,nextImpl:t}),function(){if((gn&2)!==0)throw Error(s(440));return n.impl.apply(void 0,arguments)}}function wm(t,n){return Zl(4,2,t,n)}function Dm(t,n){return Zl(4,4,t,n)}function Um(t,n){if(typeof n=="function"){t=t();var a=n(t);return function(){typeof a=="function"?a():n(null)}}if(n!=null)return t=t(),n.current=t,function(){n.current=null}}function Lm(t,n,a){a=a!=null?a.concat([t]):null,Zl(4,4,Um.bind(null,n,t),a)}function vf(){}function Nm(t,n){var a=kn();n=n===void 0?null:n;var o=a.memoizedState;return n!==null&&rf(n,o[1])?o[0]:(a.memoizedState=[t,n],t)}function Om(t,n){var a=kn();n=n===void 0?null:n;var o=a.memoizedState;if(n!==null&&rf(n,o[1]))return o[0];if(o=t(),Hs){Wt(!0);try{t()}finally{Wt(!1)}}return a.memoizedState=[o,n],o}function _f(t,n,a){return a===void 0||(Ea&1073741824)!==0&&(tn&261930)===0?t.memoizedState=n:(t.memoizedState=a,t=zg(),ze.lanes|=t,ss|=t,a)}function zm(t,n,a,o){return Di(a,n)?a:Er.current!==null?(t=_f(t,a,o),Di(t,n)||(Yn=!0),t):(Ea&42)===0||(Ea&1073741824)!==0&&(tn&261930)===0?(Yn=!0,t.memoizedState=a):(t=zg(),ze.lanes|=t,ss|=t,n)}function Pm(t,n,a,o,u){var f=X.p;X.p=f!==0&&8>f?f:8;var y=w.T,R={};w.T=R,Mf(t,!1,n,a);try{var q=u(),ht=w.S;if(ht!==null&&ht(R,q),q!==null&&typeof q=="object"&&typeof q.then=="function"){var bt=Ix(q,o);Po(t,n,bt,Pi(t))}else Po(t,n,o,Pi(t))}catch(Ut){Po(t,n,{then:function(){},status:"rejected",reason:Ut},Pi())}finally{X.p=f,y!==null&&R.types!==null&&(y.types=R.types),w.T=y}}function Xx(){}function xf(t,n,a,o){if(t.tag!==5)throw Error(s(476));var u=Bm(t).queue;Pm(t,u,n,G,a===null?Xx:function(){return Im(t),a(o)})}function Bm(t){var n=t.memoizedState;if(n!==null)return n;n={memoizedState:G,baseState:G,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:G},next:null};var a={};return n.next={memoizedState:a,baseState:a,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ba,lastRenderedState:a},next:null},t.memoizedState=n,t=t.alternate,t!==null&&(t.memoizedState=n),n}function Im(t){var n=Bm(t);n.next===null&&(n=t.alternate.memoizedState),Po(t,n.next.queue,{},Pi())}function yf(){return si($o)}function Fm(){return kn().memoizedState}function Hm(){return kn().memoizedState}function qx(t){for(var n=t.return;n!==null;){switch(n.tag){case 24:case 3:var a=Pi();t=$a(a);var o=ts(n,t,a);o!==null&&(Ei(o,n,a),Uo(o,n,a)),n={cache:Yu()},t.payload=n;return}n=n.return}}function Wx(t,n,a){var o=Pi();a={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null},Kl(t)?Vm(n,a):(a=Bu(t,n,a,o),a!==null&&(Ei(a,t,o),km(a,n,o)))}function Gm(t,n,a){var o=Pi();Po(t,n,a,o)}function Po(t,n,a,o){var u={lane:o,revertLane:0,gesture:null,action:a,hasEagerState:!1,eagerState:null,next:null};if(Kl(t))Vm(n,u);else{var f=t.alternate;if(t.lanes===0&&(f===null||f.lanes===0)&&(f=n.lastRenderedReducer,f!==null))try{var y=n.lastRenderedState,R=f(y,a);if(u.hasEagerState=!0,u.eagerState=R,Di(R,y))return Dl(t,n,u,0),Tn===null&&wl(),!1}catch{}if(a=Bu(t,n,u,o),a!==null)return Ei(a,t,o),km(a,n,o),!0}return!1}function Mf(t,n,a,o){if(o={lane:2,revertLane:$f(),gesture:null,action:o,hasEagerState:!1,eagerState:null,next:null},Kl(t)){if(n)throw Error(s(479))}else n=Bu(t,a,o,2),n!==null&&Ei(n,t,2)}function Kl(t){var n=t.alternate;return t===ze||n!==null&&n===ze}function Vm(t,n){br=kl=!0;var a=t.pending;a===null?n.next=n:(n.next=a.next,a.next=n),t.pending=n}function km(t,n,a){if((a&4194048)!==0){var o=n.lanes;o&=t.pendingLanes,a|=o,n.lanes=a,Hi(t,a)}}var Bo={readContext:si,use:Wl,useCallback:Fn,useContext:Fn,useEffect:Fn,useImperativeHandle:Fn,useLayoutEffect:Fn,useInsertionEffect:Fn,useMemo:Fn,useReducer:Fn,useRef:Fn,useState:Fn,useDebugValue:Fn,useDeferredValue:Fn,useTransition:Fn,useSyncExternalStore:Fn,useId:Fn,useHostTransitionStatus:Fn,useFormState:Fn,useActionState:Fn,useOptimistic:Fn,useMemoCache:Fn,useCacheRefresh:Fn};Bo.useEffectEvent=Fn;var Xm={readContext:si,use:Wl,useCallback:function(t,n){return di().memoizedState=[t,n===void 0?null:n],t},useContext:si,useEffect:Rm,useImperativeHandle:function(t,n,a){a=a!=null?a.concat([t]):null,Yl(4194308,4,Um.bind(null,n,t),a)},useLayoutEffect:function(t,n){return Yl(4194308,4,t,n)},useInsertionEffect:function(t,n){Yl(4,2,t,n)},useMemo:function(t,n){var a=di();n=n===void 0?null:n;var o=t();if(Hs){Wt(!0);try{t()}finally{Wt(!1)}}return a.memoizedState=[o,n],o},useReducer:function(t,n,a){var o=di();if(a!==void 0){var u=a(n);if(Hs){Wt(!0);try{a(n)}finally{Wt(!1)}}}else u=n;return o.memoizedState=o.baseState=u,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:u},o.queue=t,t=t.dispatch=Wx.bind(null,ze,t),[o.memoizedState,t]},useRef:function(t){var n=di();return t={current:t},n.memoizedState=t},useState:function(t){t=pf(t);var n=t.queue,a=Gm.bind(null,ze,n);return n.dispatch=a,[t.memoizedState,a]},useDebugValue:vf,useDeferredValue:function(t,n){var a=di();return _f(a,t,n)},useTransition:function(){var t=pf(!1);return t=Pm.bind(null,ze,t.queue,!0,!1),di().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,n,a){var o=ze,u=di();if(nn){if(a===void 0)throw Error(s(407));a=a()}else{if(a=n(),Tn===null)throw Error(s(349));(tn&127)!==0||fm(o,n,a)}u.memoizedState=a;var f={value:a,getSnapshot:n};return u.queue=f,Rm(dm.bind(null,o,f,t),[t]),o.flags|=2048,Ar(9,{destroy:void 0},hm.bind(null,o,f,a,n),null),a},useId:function(){var t=di(),n=Tn.identifierPrefix;if(nn){var a=ua,o=ca;a=(o&~(1<<32-Te(o)-1)).toString(32)+a,n="_"+n+"R_"+a,a=Xl++,0<a&&(n+="H"+a.toString(32)),n+="_"}else a=Fx++,n="_"+n+"r_"+a.toString(32)+"_";return t.memoizedState=n},useHostTransitionStatus:yf,useFormState:Sm,useActionState:Sm,useOptimistic:function(t){var n=di();n.memoizedState=n.baseState=t;var a={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return n.queue=a,n=Mf.bind(null,ze,!0,a),a.dispatch=n,[t,n]},useMemoCache:ff,useCacheRefresh:function(){return di().memoizedState=qx.bind(null,ze)},useEffectEvent:function(t){var n=di(),a={impl:t};return n.memoizedState=a,function(){if((gn&2)!==0)throw Error(s(440));return a.impl.apply(void 0,arguments)}}},Sf={readContext:si,use:Wl,useCallback:Nm,useContext:si,useEffect:gf,useImperativeHandle:Lm,useInsertionEffect:wm,useLayoutEffect:Dm,useMemo:Om,useReducer:jl,useRef:Am,useState:function(){return jl(ba)},useDebugValue:vf,useDeferredValue:function(t,n){var a=kn();return zm(a,yn.memoizedState,t,n)},useTransition:function(){var t=jl(ba)[0],n=kn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:um,useId:Fm,useHostTransitionStatus:yf,useFormState:Em,useActionState:Em,useOptimistic:function(t,n){var a=kn();return gm(a,yn,t,n)},useMemoCache:ff,useCacheRefresh:Hm};Sf.useEffectEvent=Cm;var qm={readContext:si,use:Wl,useCallback:Nm,useContext:si,useEffect:gf,useImperativeHandle:Lm,useInsertionEffect:wm,useLayoutEffect:Dm,useMemo:Om,useReducer:df,useRef:Am,useState:function(){return df(ba)},useDebugValue:vf,useDeferredValue:function(t,n){var a=kn();return yn===null?_f(a,t,n):zm(a,yn.memoizedState,t,n)},useTransition:function(){var t=df(ba)[0],n=kn().memoizedState;return[typeof t=="boolean"?t:zo(t),n]},useSyncExternalStore:um,useId:Fm,useHostTransitionStatus:yf,useFormState:Tm,useActionState:Tm,useOptimistic:function(t,n){var a=kn();return yn!==null?gm(a,yn,t,n):(a.baseState=t,[t,a.queue.dispatch])},useMemoCache:ff,useCacheRefresh:Hm};qm.useEffectEvent=Cm;function Ef(t,n,a,o){n=t.memoizedState,a=a(o,n),a=a==null?n:g({},n,a),t.memoizedState=a,t.lanes===0&&(t.updateQueue.baseState=a)}var bf={enqueueSetState:function(t,n,a){t=t._reactInternals;var o=Pi(),u=$a(o);u.payload=n,a!=null&&(u.callback=a),n=ts(t,u,o),n!==null&&(Ei(n,t,o),Uo(n,t,o))},enqueueReplaceState:function(t,n,a){t=t._reactInternals;var o=Pi(),u=$a(o);u.tag=1,u.payload=n,a!=null&&(u.callback=a),n=ts(t,u,o),n!==null&&(Ei(n,t,o),Uo(n,t,o))},enqueueForceUpdate:function(t,n){t=t._reactInternals;var a=Pi(),o=$a(a);o.tag=2,n!=null&&(o.callback=n),n=ts(t,o,a),n!==null&&(Ei(n,t,a),Uo(n,t,a))}};function Wm(t,n,a,o,u,f,y){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(o,f,y):n.prototype&&n.prototype.isPureReactComponent?!Eo(a,o)||!Eo(u,f):!0}function jm(t,n,a,o){t=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(a,o),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(a,o),n.state!==t&&bf.enqueueReplaceState(n,n.state,null)}function Gs(t,n){var a=n;if("ref"in n){a={};for(var o in n)o!=="ref"&&(a[o]=n[o])}if(t=t.defaultProps){a===n&&(a=g({},a));for(var u in t)a[u]===void 0&&(a[u]=t[u])}return a}function Ym(t){Cl(t)}function Zm(t){console.error(t)}function Km(t){Cl(t)}function Ql(t,n){try{var a=t.onUncaughtError;a(n.value,{componentStack:n.stack})}catch(o){setTimeout(function(){throw o})}}function Qm(t,n,a){try{var o=t.onCaughtError;o(a.value,{componentStack:a.stack,errorBoundary:n.tag===1?n.stateNode:null})}catch(u){setTimeout(function(){throw u})}}function Tf(t,n,a){return a=$a(a),a.tag=3,a.payload={element:null},a.callback=function(){Ql(t,n)},a}function Jm(t){return t=$a(t),t.tag=3,t}function $m(t,n,a,o){var u=a.type.getDerivedStateFromError;if(typeof u=="function"){var f=o.value;t.payload=function(){return u(f)},t.callback=function(){Qm(n,a,o)}}var y=a.stateNode;y!==null&&typeof y.componentDidCatch=="function"&&(t.callback=function(){Qm(n,a,o),typeof u!="function"&&(rs===null?rs=new Set([this]):rs.add(this));var R=o.stack;this.componentDidCatch(o.value,{componentStack:R!==null?R:""})})}function jx(t,n,a,o,u){if(a.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){if(n=a.alternate,n!==null&&_r(n,a,u,!0),a=Li.current,a!==null){switch(a.tag){case 31:case 13:return Wi===null?cc():a.alternate===null&&Hn===0&&(Hn=3),a.flags&=-257,a.flags|=65536,a.lanes=u,o===Il?a.flags|=16384:(n=a.updateQueue,n===null?a.updateQueue=new Set([o]):n.add(o),Kf(t,o,u)),!1;case 22:return a.flags|=65536,o===Il?a.flags|=16384:(n=a.updateQueue,n===null?(n={transitions:null,markerInstances:null,retryQueue:new Set([o])},a.updateQueue=n):(a=n.retryQueue,a===null?n.retryQueue=new Set([o]):a.add(o)),Kf(t,o,u)),!1}throw Error(s(435,a.tag))}return Kf(t,o,u),cc(),!1}if(nn)return n=Li.current,n!==null?((n.flags&65536)===0&&(n.flags|=256),n.flags|=65536,n.lanes=u,o!==ku&&(t=Error(s(422),{cause:o}),Ao(Vi(t,a)))):(o!==ku&&(n=Error(s(423),{cause:o}),Ao(Vi(n,a))),t=t.current.alternate,t.flags|=65536,u&=-u,t.lanes|=u,o=Vi(o,a),u=Tf(t.stateNode,o,u),tf(t,u),Hn!==4&&(Hn=2)),!1;var f=Error(s(520),{cause:o});if(f=Vi(f,a),qo===null?qo=[f]:qo.push(f),Hn!==4&&(Hn=2),n===null)return!0;o=Vi(o,a),a=n;do{switch(a.tag){case 3:return a.flags|=65536,t=u&-u,a.lanes|=t,t=Tf(a.stateNode,o,t),tf(a,t),!1;case 1:if(n=a.type,f=a.stateNode,(a.flags&128)===0&&(typeof n.getDerivedStateFromError=="function"||f!==null&&typeof f.componentDidCatch=="function"&&(rs===null||!rs.has(f))))return a.flags|=65536,u&=-u,a.lanes|=u,u=Jm(u),$m(u,t,a,o),tf(a,u),!1}a=a.return}while(a!==null);return!1}var Af=Error(s(461)),Yn=!1;function ri(t,n,a,o){n.child=t===null?im(n,null,a,o):Fs(n,t.child,a,o)}function tg(t,n,a,o,u){a=a.render;var f=n.ref;if("ref"in o){var y={};for(var R in o)R!=="ref"&&(y[R]=o[R])}else y=o;return zs(n),o=of(t,n,a,y,f,u),R=lf(),t!==null&&!Yn?(cf(t,n,u),Ta(t,n,u)):(nn&&R&&Gu(n),n.flags|=1,ri(t,n,o,u),n.child)}function eg(t,n,a,o,u){if(t===null){var f=a.type;return typeof f=="function"&&!Iu(f)&&f.defaultProps===void 0&&a.compare===null?(n.tag=15,n.type=f,ng(t,n,f,o,u)):(t=Ll(a.type,null,o,n,n.mode,u),t.ref=n.ref,t.return=n,n.child=t)}if(f=t.child,!Of(t,u)){var y=f.memoizedProps;if(a=a.compare,a=a!==null?a:Eo,a(y,o)&&t.ref===n.ref)return Ta(t,n,u)}return n.flags|=1,t=xa(f,o),t.ref=n.ref,t.return=n,n.child=t}function ng(t,n,a,o,u){if(t!==null){var f=t.memoizedProps;if(Eo(f,o)&&t.ref===n.ref)if(Yn=!1,n.pendingProps=o=f,Of(t,u))(t.flags&131072)!==0&&(Yn=!0);else return n.lanes=t.lanes,Ta(t,n,u)}return Rf(t,n,a,o,u)}function ig(t,n,a,o){var u=o.children,f=t!==null?t.memoizedState:null;if(t===null&&n.stateNode===null&&(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),o.mode==="hidden"){if((n.flags&128)!==0){if(f=f!==null?f.baseLanes|a:a,t!==null){for(o=n.child=t.child,u=0;o!==null;)u=u|o.lanes|o.childLanes,o=o.sibling;o=u&~f}else o=0,n.child=null;return ag(t,n,f,a,o)}if((a&536870912)!==0)n.memoizedState={baseLanes:0,cachePool:null},t!==null&&Pl(n,f!==null?f.cachePool:null),f!==null?rm(n,f):nf(),om(n);else return o=n.lanes=536870912,ag(t,n,f!==null?f.baseLanes|a:a,a,o)}else f!==null?(Pl(n,f.cachePool),rm(n,f),ns(),n.memoizedState=null):(t!==null&&Pl(n,null),nf(),ns());return ri(t,n,u,a),n.child}function Io(t,n){return t!==null&&t.tag===22||n.stateNode!==null||(n.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),n.sibling}function ag(t,n,a,o,u){var f=Ku();return f=f===null?null:{parent:Wn._currentValue,pool:f},n.memoizedState={baseLanes:a,cachePool:f},t!==null&&Pl(n,null),nf(),om(n),t!==null&&_r(t,n,o,!0),n.childLanes=u,null}function Jl(t,n){return n=tc({mode:n.mode,children:n.children},t.mode),n.ref=t.ref,t.child=n,n.return=t,n}function sg(t,n,a){return Fs(n,t.child,null,a),t=Jl(n,n.pendingProps),t.flags|=2,Ni(n),n.memoizedState=null,t}function Yx(t,n,a){var o=n.pendingProps,u=(n.flags&128)!==0;if(n.flags&=-129,t===null){if(nn){if(o.mode==="hidden")return t=Jl(n,o),n.lanes=536870912,Io(null,t);if(sf(n),(t=Un)?(t=v0(t,qi),t=t!==null&&t.data==="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ya!==null?{id:ca,overflow:ua}:null,retryLane:536870912,hydrationErrors:null},a=Vp(t),a.return=n,n.child=a,ai=n,Un=null)):t=null,t===null)throw Ka(n);return n.lanes=536870912,null}return Jl(n,o)}var f=t.memoizedState;if(f!==null){var y=f.dehydrated;if(sf(n),u)if(n.flags&256)n.flags&=-257,n=sg(t,n,a);else if(n.memoizedState!==null)n.child=t.child,n.flags|=128,n=null;else throw Error(s(558));else if(Yn||_r(t,n,a,!1),u=(a&t.childLanes)!==0,Yn||u){if(o=Tn,o!==null&&(y=ni(o,a),y!==0&&y!==f.retryLane))throw f.retryLane=y,Us(t,y),Ei(o,t,y),Af;cc(),n=sg(t,n,a)}else t=f.treeContext,Un=ji(y.nextSibling),ai=n,nn=!0,Za=null,qi=!1,t!==null&&qp(n,t),n=Jl(n,o),n.flags|=4096;return n}return t=xa(t.child,{mode:o.mode,children:o.children}),t.ref=n.ref,n.child=t,t.return=n,t}function $l(t,n){var a=n.ref;if(a===null)t!==null&&t.ref!==null&&(n.flags|=4194816);else{if(typeof a!="function"&&typeof a!="object")throw Error(s(284));(t===null||t.ref!==a)&&(n.flags|=4194816)}}function Rf(t,n,a,o,u){return zs(n),a=of(t,n,a,o,void 0,u),o=lf(),t!==null&&!Yn?(cf(t,n,u),Ta(t,n,u)):(nn&&o&&Gu(n),n.flags|=1,ri(t,n,a,u),n.child)}function rg(t,n,a,o,u,f){return zs(n),n.updateQueue=null,a=cm(n,o,a,u),lm(t),o=lf(),t!==null&&!Yn?(cf(t,n,f),Ta(t,n,f)):(nn&&o&&Gu(n),n.flags|=1,ri(t,n,a,f),n.child)}function og(t,n,a,o,u){if(zs(n),n.stateNode===null){var f=pr,y=a.contextType;typeof y=="object"&&y!==null&&(f=si(y)),f=new a(o,f),n.memoizedState=f.state!==null&&f.state!==void 0?f.state:null,f.updater=bf,n.stateNode=f,f._reactInternals=n,f=n.stateNode,f.props=o,f.state=n.memoizedState,f.refs={},Ju(n),y=a.contextType,f.context=typeof y=="object"&&y!==null?si(y):pr,f.state=n.memoizedState,y=a.getDerivedStateFromProps,typeof y=="function"&&(Ef(n,a,y,o),f.state=n.memoizedState),typeof a.getDerivedStateFromProps=="function"||typeof f.getSnapshotBeforeUpdate=="function"||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(y=f.state,typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount(),y!==f.state&&bf.enqueueReplaceState(f,f.state,null),No(n,o,f,u),Lo(),f.state=n.memoizedState),typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!0}else if(t===null){f=n.stateNode;var R=n.memoizedProps,q=Gs(a,R);f.props=q;var ht=f.context,bt=a.contextType;y=pr,typeof bt=="object"&&bt!==null&&(y=si(bt));var Ut=a.getDerivedStateFromProps;bt=typeof Ut=="function"||typeof f.getSnapshotBeforeUpdate=="function",R=n.pendingProps!==R,bt||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(R||ht!==y)&&jm(n,f,o,y),Ja=!1;var gt=n.memoizedState;f.state=gt,No(n,o,f,u),Lo(),ht=n.memoizedState,R||gt!==ht||Ja?(typeof Ut=="function"&&(Ef(n,a,Ut,o),ht=n.memoizedState),(q=Ja||Wm(n,a,q,o,gt,ht,y))?(bt||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(n.flags|=4194308)):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=o,n.memoizedState=ht),f.props=o,f.state=ht,f.context=y,o=q):(typeof f.componentDidMount=="function"&&(n.flags|=4194308),o=!1)}else{f=n.stateNode,$u(t,n),y=n.memoizedProps,bt=Gs(a,y),f.props=bt,Ut=n.pendingProps,gt=f.context,ht=a.contextType,q=pr,typeof ht=="object"&&ht!==null&&(q=si(ht)),R=a.getDerivedStateFromProps,(ht=typeof R=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(y!==Ut||gt!==q)&&jm(n,f,o,q),Ja=!1,gt=n.memoizedState,f.state=gt,No(n,o,f,u),Lo();var Mt=n.memoizedState;y!==Ut||gt!==Mt||Ja||t!==null&&t.dependencies!==null&&Ol(t.dependencies)?(typeof R=="function"&&(Ef(n,a,R,o),Mt=n.memoizedState),(bt=Ja||Wm(n,a,bt,o,gt,Mt,q)||t!==null&&t.dependencies!==null&&Ol(t.dependencies))?(ht||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(o,Mt,q),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(o,Mt,q)),typeof f.componentDidUpdate=="function"&&(n.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof f.componentDidUpdate!="function"||y===t.memoizedProps&&gt===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&gt===t.memoizedState||(n.flags|=1024),n.memoizedProps=o,n.memoizedState=Mt),f.props=o,f.state=Mt,f.context=q,o=bt):(typeof f.componentDidUpdate!="function"||y===t.memoizedProps&&gt===t.memoizedState||(n.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||y===t.memoizedProps&&gt===t.memoizedState||(n.flags|=1024),o=!1)}return f=o,$l(t,n),o=(n.flags&128)!==0,f||o?(f=n.stateNode,a=o&&typeof a.getDerivedStateFromError!="function"?null:f.render(),n.flags|=1,t!==null&&o?(n.child=Fs(n,t.child,null,u),n.child=Fs(n,null,a,u)):ri(t,n,a,u),n.memoizedState=f.state,t=n.child):t=Ta(t,n,u),t}function lg(t,n,a,o){return Ns(),n.flags|=256,ri(t,n,a,o),n.child}var Cf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function wf(t){return{baseLanes:t,cachePool:Qp()}}function Df(t,n,a){return t=t!==null?t.childLanes&~a:0,n&&(t|=zi),t}function cg(t,n,a){var o=n.pendingProps,u=!1,f=(n.flags&128)!==0,y;if((y=f)||(y=t!==null&&t.memoizedState===null?!1:(Vn.current&2)!==0),y&&(u=!0,n.flags&=-129),y=(n.flags&32)!==0,n.flags&=-33,t===null){if(nn){if(u?es(n):ns(),(t=Un)?(t=v0(t,qi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(n.memoizedState={dehydrated:t,treeContext:Ya!==null?{id:ca,overflow:ua}:null,retryLane:536870912,hydrationErrors:null},a=Vp(t),a.return=n,n.child=a,ai=n,Un=null)):t=null,t===null)throw Ka(n);return hh(t)?n.lanes=32:n.lanes=536870912,null}var R=o.children;return o=o.fallback,u?(ns(),u=n.mode,R=tc({mode:"hidden",children:R},u),o=Ls(o,u,a,null),R.return=n,o.return=n,R.sibling=o,n.child=R,o=n.child,o.memoizedState=wf(a),o.childLanes=Df(t,y,a),n.memoizedState=Cf,Io(null,o)):(es(n),Uf(n,R))}var q=t.memoizedState;if(q!==null&&(R=q.dehydrated,R!==null)){if(f)n.flags&256?(es(n),n.flags&=-257,n=Lf(t,n,a)):n.memoizedState!==null?(ns(),n.child=t.child,n.flags|=128,n=null):(ns(),R=o.fallback,u=n.mode,o=tc({mode:"visible",children:o.children},u),R=Ls(R,u,a,null),R.flags|=2,o.return=n,R.return=n,o.sibling=R,n.child=o,Fs(n,t.child,null,a),o=n.child,o.memoizedState=wf(a),o.childLanes=Df(t,y,a),n.memoizedState=Cf,n=Io(null,o));else if(es(n),hh(R)){if(y=R.nextSibling&&R.nextSibling.dataset,y)var ht=y.dgst;y=ht,o=Error(s(419)),o.stack="",o.digest=y,Ao({value:o,source:null,stack:null}),n=Lf(t,n,a)}else if(Yn||_r(t,n,a,!1),y=(a&t.childLanes)!==0,Yn||y){if(y=Tn,y!==null&&(o=ni(y,a),o!==0&&o!==q.retryLane))throw q.retryLane=o,Us(t,o),Ei(y,t,o),Af;fh(R)||cc(),n=Lf(t,n,a)}else fh(R)?(n.flags|=192,n.child=t.child,n=null):(t=q.treeContext,Un=ji(R.nextSibling),ai=n,nn=!0,Za=null,qi=!1,t!==null&&qp(n,t),n=Uf(n,o.children),n.flags|=4096);return n}return u?(ns(),R=o.fallback,u=n.mode,q=t.child,ht=q.sibling,o=xa(q,{mode:"hidden",children:o.children}),o.subtreeFlags=q.subtreeFlags&65011712,ht!==null?R=xa(ht,R):(R=Ls(R,u,a,null),R.flags|=2),R.return=n,o.return=n,o.sibling=R,n.child=o,Io(null,o),o=n.child,R=t.child.memoizedState,R===null?R=wf(a):(u=R.cachePool,u!==null?(q=Wn._currentValue,u=u.parent!==q?{parent:q,pool:q}:u):u=Qp(),R={baseLanes:R.baseLanes|a,cachePool:u}),o.memoizedState=R,o.childLanes=Df(t,y,a),n.memoizedState=Cf,Io(t.child,o)):(es(n),a=t.child,t=a.sibling,a=xa(a,{mode:"visible",children:o.children}),a.return=n,a.sibling=null,t!==null&&(y=n.deletions,y===null?(n.deletions=[t],n.flags|=16):y.push(t)),n.child=a,n.memoizedState=null,a)}function Uf(t,n){return n=tc({mode:"visible",children:n},t.mode),n.return=t,t.child=n}function tc(t,n){return t=Ui(22,t,null,n),t.lanes=0,t}function Lf(t,n,a){return Fs(n,t.child,null,a),t=Uf(n,n.pendingProps.children),t.flags|=2,n.memoizedState=null,t}function ug(t,n,a){t.lanes|=n;var o=t.alternate;o!==null&&(o.lanes|=n),Wu(t.return,n,a)}function Nf(t,n,a,o,u,f){var y=t.memoizedState;y===null?t.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:o,tail:a,tailMode:u,treeForkCount:f}:(y.isBackwards=n,y.rendering=null,y.renderingStartTime=0,y.last=o,y.tail=a,y.tailMode=u,y.treeForkCount=f)}function fg(t,n,a){var o=n.pendingProps,u=o.revealOrder,f=o.tail;o=o.children;var y=Vn.current,R=(y&2)!==0;if(R?(y=y&1|2,n.flags|=128):y&=1,Lt(Vn,y),ri(t,n,o,a),o=nn?To:0,!R&&t!==null&&(t.flags&128)!==0)t:for(t=n.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&ug(t,a,n);else if(t.tag===19)ug(t,a,n);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break t;for(;t.sibling===null;){if(t.return===null||t.return===n)break t;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(u){case"forwards":for(a=n.child,u=null;a!==null;)t=a.alternate,t!==null&&Vl(t)===null&&(u=a),a=a.sibling;a=u,a===null?(u=n.child,n.child=null):(u=a.sibling,a.sibling=null),Nf(n,!1,u,a,f,o);break;case"backwards":case"unstable_legacy-backwards":for(a=null,u=n.child,n.child=null;u!==null;){if(t=u.alternate,t!==null&&Vl(t)===null){n.child=u;break}t=u.sibling,u.sibling=a,a=u,u=t}Nf(n,!0,a,null,f,o);break;case"together":Nf(n,!1,null,null,void 0,o);break;default:n.memoizedState=null}return n.child}function Ta(t,n,a){if(t!==null&&(n.dependencies=t.dependencies),ss|=n.lanes,(a&n.childLanes)===0)if(t!==null){if(_r(t,n,a,!1),(a&n.childLanes)===0)return null}else return null;if(t!==null&&n.child!==t.child)throw Error(s(153));if(n.child!==null){for(t=n.child,a=xa(t,t.pendingProps),n.child=a,a.return=n;t.sibling!==null;)t=t.sibling,a=a.sibling=xa(t,t.pendingProps),a.return=n;a.sibling=null}return n.child}function Of(t,n){return(t.lanes&n)!==0?!0:(t=t.dependencies,!!(t!==null&&Ol(t)))}function Zx(t,n,a){switch(n.tag){case 3:zt(n,n.stateNode.containerInfo),Qa(n,Wn,t.memoizedState.cache),Ns();break;case 27:case 5:xe(n);break;case 4:zt(n,n.stateNode.containerInfo);break;case 10:Qa(n,n.type,n.memoizedProps.value);break;case 31:if(n.memoizedState!==null)return n.flags|=128,sf(n),null;break;case 13:var o=n.memoizedState;if(o!==null)return o.dehydrated!==null?(es(n),n.flags|=128,null):(a&n.child.childLanes)!==0?cg(t,n,a):(es(n),t=Ta(t,n,a),t!==null?t.sibling:null);es(n);break;case 19:var u=(t.flags&128)!==0;if(o=(a&n.childLanes)!==0,o||(_r(t,n,a,!1),o=(a&n.childLanes)!==0),u){if(o)return fg(t,n,a);n.flags|=128}if(u=n.memoizedState,u!==null&&(u.rendering=null,u.tail=null,u.lastEffect=null),Lt(Vn,Vn.current),o)break;return null;case 22:return n.lanes=0,ig(t,n,a,n.pendingProps);case 24:Qa(n,Wn,t.memoizedState.cache)}return Ta(t,n,a)}function hg(t,n,a){if(t!==null)if(t.memoizedProps!==n.pendingProps)Yn=!0;else{if(!Of(t,a)&&(n.flags&128)===0)return Yn=!1,Zx(t,n,a);Yn=(t.flags&131072)!==0}else Yn=!1,nn&&(n.flags&1048576)!==0&&Xp(n,To,n.index);switch(n.lanes=0,n.tag){case 16:t:{var o=n.pendingProps;if(t=Bs(n.elementType),n.type=t,typeof t=="function")Iu(t)?(o=Gs(t,o),n.tag=1,n=og(null,n,t,o,a)):(n.tag=0,n=Rf(null,n,t,o,a));else{if(t!=null){var u=t.$$typeof;if(u===z){n.tag=11,n=tg(null,n,t,o,a);break t}else if(u===D){n.tag=14,n=eg(null,n,t,o,a);break t}}throw n=nt(t)||t,Error(s(306,n,""))}}return n;case 0:return Rf(t,n,n.type,n.pendingProps,a);case 1:return o=n.type,u=Gs(o,n.pendingProps),og(t,n,o,u,a);case 3:t:{if(zt(n,n.stateNode.containerInfo),t===null)throw Error(s(387));o=n.pendingProps;var f=n.memoizedState;u=f.element,$u(t,n),No(n,o,null,a);var y=n.memoizedState;if(o=y.cache,Qa(n,Wn,o),o!==f.cache&&ju(n,[Wn],a,!0),Lo(),o=y.element,f.isDehydrated)if(f={element:o,isDehydrated:!1,cache:y.cache},n.updateQueue.baseState=f,n.memoizedState=f,n.flags&256){n=lg(t,n,o,a);break t}else if(o!==u){u=Vi(Error(s(424)),n),Ao(u),n=lg(t,n,o,a);break t}else for(t=n.stateNode.containerInfo,t.nodeType===9?t=t.body:t=t.nodeName==="HTML"?t.ownerDocument.body:t,Un=ji(t.firstChild),ai=n,nn=!0,Za=null,qi=!0,a=im(n,null,o,a),n.child=a;a;)a.flags=a.flags&-3|4096,a=a.sibling;else{if(Ns(),o===u){n=Ta(t,n,a);break t}ri(t,n,o,a)}n=n.child}return n;case 26:return $l(t,n),t===null?(a=E0(n.type,null,n.pendingProps,null))?n.memoizedState=a:nn||(a=n.type,t=n.pendingProps,o=gc(Ft.current).createElement(a),o[rn]=n,o[mn]=t,oi(o,a,t),te(o),n.stateNode=o):n.memoizedState=E0(n.type,t.memoizedProps,n.pendingProps,t.memoizedState),null;case 27:return xe(n),t===null&&nn&&(o=n.stateNode=y0(n.type,n.pendingProps,Ft.current),ai=n,qi=!0,u=Un,us(n.type)?(dh=u,Un=ji(o.firstChild)):Un=u),ri(t,n,n.pendingProps.children,a),$l(t,n),t===null&&(n.flags|=4194304),n.child;case 5:return t===null&&nn&&((u=o=Un)&&(o=Ty(o,n.type,n.pendingProps,qi),o!==null?(n.stateNode=o,ai=n,Un=ji(o.firstChild),qi=!1,u=!0):u=!1),u||Ka(n)),xe(n),u=n.type,f=n.pendingProps,y=t!==null?t.memoizedProps:null,o=f.children,lh(u,f)?o=null:y!==null&&lh(u,y)&&(n.flags|=32),n.memoizedState!==null&&(u=of(t,n,Hx,null,null,a),$o._currentValue=u),$l(t,n),ri(t,n,o,a),n.child;case 6:return t===null&&nn&&((t=a=Un)&&(a=Ay(a,n.pendingProps,qi),a!==null?(n.stateNode=a,ai=n,Un=null,t=!0):t=!1),t||Ka(n)),null;case 13:return cg(t,n,a);case 4:return zt(n,n.stateNode.containerInfo),o=n.pendingProps,t===null?n.child=Fs(n,null,o,a):ri(t,n,o,a),n.child;case 11:return tg(t,n,n.type,n.pendingProps,a);case 7:return ri(t,n,n.pendingProps,a),n.child;case 8:return ri(t,n,n.pendingProps.children,a),n.child;case 12:return ri(t,n,n.pendingProps.children,a),n.child;case 10:return o=n.pendingProps,Qa(n,n.type,o.value),ri(t,n,o.children,a),n.child;case 9:return u=n.type._context,o=n.pendingProps.children,zs(n),u=si(u),o=o(u),n.flags|=1,ri(t,n,o,a),n.child;case 14:return eg(t,n,n.type,n.pendingProps,a);case 15:return ng(t,n,n.type,n.pendingProps,a);case 19:return fg(t,n,a);case 31:return Yx(t,n,a);case 22:return ig(t,n,a,n.pendingProps);case 24:return zs(n),o=si(Wn),t===null?(u=Ku(),u===null&&(u=Tn,f=Yu(),u.pooledCache=f,f.refCount++,f!==null&&(u.pooledCacheLanes|=a),u=f),n.memoizedState={parent:o,cache:u},Ju(n),Qa(n,Wn,u)):((t.lanes&a)!==0&&($u(t,n),No(n,null,null,a),Lo()),u=t.memoizedState,f=n.memoizedState,u.parent!==o?(u={parent:o,cache:o},n.memoizedState=u,n.lanes===0&&(n.memoizedState=n.updateQueue.baseState=u),Qa(n,Wn,o)):(o=f.cache,Qa(n,Wn,o),o!==u.cache&&ju(n,[Wn],a,!0))),ri(t,n,n.pendingProps.children,a),n.child;case 29:throw n.pendingProps}throw Error(s(156,n.tag))}function Aa(t){t.flags|=4}function zf(t,n,a,o,u){if((n=(t.mode&32)!==0)&&(n=!1),n){if(t.flags|=16777216,(u&335544128)===u)if(t.stateNode.complete)t.flags|=8192;else if(Fg())t.flags|=8192;else throw Is=Il,Qu}else t.flags&=-16777217}function dg(t,n){if(n.type!=="stylesheet"||(n.state.loading&4)!==0)t.flags&=-16777217;else if(t.flags|=16777216,!C0(n))if(Fg())t.flags|=8192;else throw Is=Il,Qu}function ec(t,n){n!==null&&(t.flags|=4),t.flags&16384&&(n=t.tag!==22?Rn():536870912,t.lanes|=n,Dr|=n)}function Fo(t,n){if(!nn)switch(t.tailMode){case"hidden":n=t.tail;for(var a=null;n!==null;)n.alternate!==null&&(a=n),n=n.sibling;a===null?t.tail=null:a.sibling=null;break;case"collapsed":a=t.tail;for(var o=null;a!==null;)a.alternate!==null&&(o=a),a=a.sibling;o===null?n||t.tail===null?t.tail=null:t.tail.sibling=null:o.sibling=null}}function Ln(t){var n=t.alternate!==null&&t.alternate.child===t.child,a=0,o=0;if(n)for(var u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags&65011712,o|=u.flags&65011712,u.return=t,u=u.sibling;else for(u=t.child;u!==null;)a|=u.lanes|u.childLanes,o|=u.subtreeFlags,o|=u.flags,u.return=t,u=u.sibling;return t.subtreeFlags|=o,t.childLanes=a,n}function Kx(t,n,a){var o=n.pendingProps;switch(Vu(n),n.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ln(n),null;case 1:return Ln(n),null;case 3:return a=n.stateNode,o=null,t!==null&&(o=t.memoizedState.cache),n.memoizedState.cache!==o&&(n.flags|=2048),Sa(Wn),ae(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(t===null||t.child===null)&&(vr(n)?Aa(n):t===null||t.memoizedState.isDehydrated&&(n.flags&256)===0||(n.flags|=1024,Xu())),Ln(n),null;case 26:var u=n.type,f=n.memoizedState;return t===null?(Aa(n),f!==null?(Ln(n),dg(n,f)):(Ln(n),zf(n,u,null,o,a))):f?f!==t.memoizedState?(Aa(n),Ln(n),dg(n,f)):(Ln(n),n.flags&=-16777217):(t=t.memoizedProps,t!==o&&Aa(n),Ln(n),zf(n,u,t,o,a)),null;case 27:if(Pe(n),a=Ft.current,u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ln(n),null}t=K.current,vr(n)?Wp(n):(t=y0(u,o,a),n.stateNode=t,Aa(n))}return Ln(n),null;case 5:if(Pe(n),u=n.type,t!==null&&n.stateNode!=null)t.memoizedProps!==o&&Aa(n);else{if(!o){if(n.stateNode===null)throw Error(s(166));return Ln(n),null}if(f=K.current,vr(n))Wp(n);else{var y=gc(Ft.current);switch(f){case 1:f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case 2:f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;default:switch(u){case"svg":f=y.createElementNS("http://www.w3.org/2000/svg",u);break;case"math":f=y.createElementNS("http://www.w3.org/1998/Math/MathML",u);break;case"script":f=y.createElement("div"),f.innerHTML="<script><\/script>",f=f.removeChild(f.firstChild);break;case"select":f=typeof o.is=="string"?y.createElement("select",{is:o.is}):y.createElement("select"),o.multiple?f.multiple=!0:o.size&&(f.size=o.size);break;default:f=typeof o.is=="string"?y.createElement(u,{is:o.is}):y.createElement(u)}}f[rn]=n,f[mn]=o;t:for(y=n.child;y!==null;){if(y.tag===5||y.tag===6)f.appendChild(y.stateNode);else if(y.tag!==4&&y.tag!==27&&y.child!==null){y.child.return=y,y=y.child;continue}if(y===n)break t;for(;y.sibling===null;){if(y.return===null||y.return===n)break t;y=y.return}y.sibling.return=y.return,y=y.sibling}n.stateNode=f;t:switch(oi(f,u,o),u){case"button":case"input":case"select":case"textarea":o=!!o.autoFocus;break t;case"img":o=!0;break t;default:o=!1}o&&Aa(n)}}return Ln(n),zf(n,n.type,t===null?null:t.memoizedProps,n.pendingProps,a),null;case 6:if(t&&n.stateNode!=null)t.memoizedProps!==o&&Aa(n);else{if(typeof o!="string"&&n.stateNode===null)throw Error(s(166));if(t=Ft.current,vr(n)){if(t=n.stateNode,a=n.memoizedProps,o=null,u=ai,u!==null)switch(u.tag){case 27:case 5:o=u.memoizedProps}t[rn]=n,t=!!(t.nodeValue===a||o!==null&&o.suppressHydrationWarning===!0||c0(t.nodeValue,a)),t||Ka(n,!0)}else t=gc(t).createTextNode(o),t[rn]=n,n.stateNode=t}return Ln(n),null;case 31:if(a=n.memoizedState,t===null||t.memoizedState!==null){if(o=vr(n),a!==null){if(t===null){if(!o)throw Error(s(318));if(t=n.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(557));t[rn]=n}else Ns(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ln(n),t=!1}else a=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),t=!0;if(!t)return n.flags&256?(Ni(n),n):(Ni(n),null);if((n.flags&128)!==0)throw Error(s(558))}return Ln(n),null;case 13:if(o=n.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(u=vr(n),o!==null&&o.dehydrated!==null){if(t===null){if(!u)throw Error(s(318));if(u=n.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(s(317));u[rn]=n}else Ns(),(n.flags&128)===0&&(n.memoizedState=null),n.flags|=4;Ln(n),u=!1}else u=Xu(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=u),u=!0;if(!u)return n.flags&256?(Ni(n),n):(Ni(n),null)}return Ni(n),(n.flags&128)!==0?(n.lanes=a,n):(a=o!==null,t=t!==null&&t.memoizedState!==null,a&&(o=n.child,u=null,o.alternate!==null&&o.alternate.memoizedState!==null&&o.alternate.memoizedState.cachePool!==null&&(u=o.alternate.memoizedState.cachePool.pool),f=null,o.memoizedState!==null&&o.memoizedState.cachePool!==null&&(f=o.memoizedState.cachePool.pool),f!==u&&(o.flags|=2048)),a!==t&&a&&(n.child.flags|=8192),ec(n,n.updateQueue),Ln(n),null);case 4:return ae(),t===null&&ih(n.stateNode.containerInfo),Ln(n),null;case 10:return Sa(n.type),Ln(n),null;case 19:if(ct(Vn),o=n.memoizedState,o===null)return Ln(n),null;if(u=(n.flags&128)!==0,f=o.rendering,f===null)if(u)Fo(o,!1);else{if(Hn!==0||t!==null&&(t.flags&128)!==0)for(t=n.child;t!==null;){if(f=Vl(t),f!==null){for(n.flags|=128,Fo(o,!1),t=f.updateQueue,n.updateQueue=t,ec(n,t),n.subtreeFlags=0,t=a,a=n.child;a!==null;)Gp(a,t),a=a.sibling;return Lt(Vn,Vn.current&1|2),nn&&ya(n,o.treeForkCount),n.child}t=t.sibling}o.tail!==null&&xt()>rc&&(n.flags|=128,u=!0,Fo(o,!1),n.lanes=4194304)}else{if(!u)if(t=Vl(f),t!==null){if(n.flags|=128,u=!0,t=t.updateQueue,n.updateQueue=t,ec(n,t),Fo(o,!0),o.tail===null&&o.tailMode==="hidden"&&!f.alternate&&!nn)return Ln(n),null}else 2*xt()-o.renderingStartTime>rc&&a!==536870912&&(n.flags|=128,u=!0,Fo(o,!1),n.lanes=4194304);o.isBackwards?(f.sibling=n.child,n.child=f):(t=o.last,t!==null?t.sibling=f:n.child=f,o.last=f)}return o.tail!==null?(t=o.tail,o.rendering=t,o.tail=t.sibling,o.renderingStartTime=xt(),t.sibling=null,a=Vn.current,Lt(Vn,u?a&1|2:a&1),nn&&ya(n,o.treeForkCount),t):(Ln(n),null);case 22:case 23:return Ni(n),af(),o=n.memoizedState!==null,t!==null?t.memoizedState!==null!==o&&(n.flags|=8192):o&&(n.flags|=8192),o?(a&536870912)!==0&&(n.flags&128)===0&&(Ln(n),n.subtreeFlags&6&&(n.flags|=8192)):Ln(n),a=n.updateQueue,a!==null&&ec(n,a.retryQueue),a=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),o=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(o=n.memoizedState.cachePool.pool),o!==a&&(n.flags|=2048),t!==null&&ct(Ps),null;case 24:return a=null,t!==null&&(a=t.memoizedState.cache),n.memoizedState.cache!==a&&(n.flags|=2048),Sa(Wn),Ln(n),null;case 25:return null;case 30:return null}throw Error(s(156,n.tag))}function Qx(t,n){switch(Vu(n),n.tag){case 1:return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 3:return Sa(Wn),ae(),t=n.flags,(t&65536)!==0&&(t&128)===0?(n.flags=t&-65537|128,n):null;case 26:case 27:case 5:return Pe(n),null;case 31:if(n.memoizedState!==null){if(Ni(n),n.alternate===null)throw Error(s(340));Ns()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 13:if(Ni(n),t=n.memoizedState,t!==null&&t.dehydrated!==null){if(n.alternate===null)throw Error(s(340));Ns()}return t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 19:return ct(Vn),null;case 4:return ae(),null;case 10:return Sa(n.type),null;case 22:case 23:return Ni(n),af(),t!==null&&ct(Ps),t=n.flags,t&65536?(n.flags=t&-65537|128,n):null;case 24:return Sa(Wn),null;case 25:return null;default:return null}}function pg(t,n){switch(Vu(n),n.tag){case 3:Sa(Wn),ae();break;case 26:case 27:case 5:Pe(n);break;case 4:ae();break;case 31:n.memoizedState!==null&&Ni(n);break;case 13:Ni(n);break;case 19:ct(Vn);break;case 10:Sa(n.type);break;case 22:case 23:Ni(n),af(),t!==null&&ct(Ps);break;case 24:Sa(Wn)}}function Ho(t,n){try{var a=n.updateQueue,o=a!==null?a.lastEffect:null;if(o!==null){var u=o.next;a=u;do{if((a.tag&t)===t){o=void 0;var f=a.create,y=a.inst;o=f(),y.destroy=o}a=a.next}while(a!==u)}}catch(R){xn(n,n.return,R)}}function is(t,n,a){try{var o=n.updateQueue,u=o!==null?o.lastEffect:null;if(u!==null){var f=u.next;o=f;do{if((o.tag&t)===t){var y=o.inst,R=y.destroy;if(R!==void 0){y.destroy=void 0,u=n;var q=a,ht=R;try{ht()}catch(bt){xn(u,q,bt)}}}o=o.next}while(o!==f)}}catch(bt){xn(n,n.return,bt)}}function mg(t){var n=t.updateQueue;if(n!==null){var a=t.stateNode;try{sm(n,a)}catch(o){xn(t,t.return,o)}}}function gg(t,n,a){a.props=Gs(t.type,t.memoizedProps),a.state=t.memoizedState;try{a.componentWillUnmount()}catch(o){xn(t,n,o)}}function Go(t,n){try{var a=t.ref;if(a!==null){switch(t.tag){case 26:case 27:case 5:var o=t.stateNode;break;case 30:o=t.stateNode;break;default:o=t.stateNode}typeof a=="function"?t.refCleanup=a(o):a.current=o}}catch(u){xn(t,n,u)}}function fa(t,n){var a=t.ref,o=t.refCleanup;if(a!==null)if(typeof o=="function")try{o()}catch(u){xn(t,n,u)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof a=="function")try{a(null)}catch(u){xn(t,n,u)}else a.current=null}function vg(t){var n=t.type,a=t.memoizedProps,o=t.stateNode;try{t:switch(n){case"button":case"input":case"select":case"textarea":a.autoFocus&&o.focus();break t;case"img":a.src?o.src=a.src:a.srcSet&&(o.srcset=a.srcSet)}}catch(u){xn(t,t.return,u)}}function Pf(t,n,a){try{var o=t.stateNode;xy(o,t.type,a,n),o[mn]=n}catch(u){xn(t,t.return,u)}}function _g(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&us(t.type)||t.tag===4}function Bf(t){t:for(;;){for(;t.sibling===null;){if(t.return===null||_g(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&us(t.type)||t.flags&2||t.child===null||t.tag===4)continue t;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function If(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?(a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a).insertBefore(t,n):(n=a.nodeType===9?a.body:a.nodeName==="HTML"?a.ownerDocument.body:a,n.appendChild(t),a=a._reactRootContainer,a!=null||n.onclick!==null||(n.onclick=We));else if(o!==4&&(o===27&&us(t.type)&&(a=t.stateNode,n=null),t=t.child,t!==null))for(If(t,n,a),t=t.sibling;t!==null;)If(t,n,a),t=t.sibling}function nc(t,n,a){var o=t.tag;if(o===5||o===6)t=t.stateNode,n?a.insertBefore(t,n):a.appendChild(t);else if(o!==4&&(o===27&&us(t.type)&&(a=t.stateNode),t=t.child,t!==null))for(nc(t,n,a),t=t.sibling;t!==null;)nc(t,n,a),t=t.sibling}function xg(t){var n=t.stateNode,a=t.memoizedProps;try{for(var o=t.type,u=n.attributes;u.length;)n.removeAttributeNode(u[0]);oi(n,o,a),n[rn]=t,n[mn]=a}catch(f){xn(t,t.return,f)}}var Ra=!1,Zn=!1,Ff=!1,yg=typeof WeakSet=="function"?WeakSet:Set,ti=null;function Jx(t,n){if(t=t.containerInfo,rh=Ec,t=Lp(t),Uu(t)){if("selectionStart"in t)var a={start:t.selectionStart,end:t.selectionEnd};else t:{a=(a=t.ownerDocument)&&a.defaultView||window;var o=a.getSelection&&a.getSelection();if(o&&o.rangeCount!==0){a=o.anchorNode;var u=o.anchorOffset,f=o.focusNode;o=o.focusOffset;try{a.nodeType,f.nodeType}catch{a=null;break t}var y=0,R=-1,q=-1,ht=0,bt=0,Ut=t,gt=null;e:for(;;){for(var Mt;Ut!==a||u!==0&&Ut.nodeType!==3||(R=y+u),Ut!==f||o!==0&&Ut.nodeType!==3||(q=y+o),Ut.nodeType===3&&(y+=Ut.nodeValue.length),(Mt=Ut.firstChild)!==null;)gt=Ut,Ut=Mt;for(;;){if(Ut===t)break e;if(gt===a&&++ht===u&&(R=y),gt===f&&++bt===o&&(q=y),(Mt=Ut.nextSibling)!==null)break;Ut=gt,gt=Ut.parentNode}Ut=Mt}a=R===-1||q===-1?null:{start:R,end:q}}else a=null}a=a||{start:0,end:0}}else a=null;for(oh={focusedElem:t,selectionRange:a},Ec=!1,ti=n;ti!==null;)if(n=ti,t=n.child,(n.subtreeFlags&1028)!==0&&t!==null)t.return=n,ti=t;else for(;ti!==null;){switch(n=ti,f=n.alternate,t=n.flags,n.tag){case 0:if((t&4)!==0&&(t=n.updateQueue,t=t!==null?t.events:null,t!==null))for(a=0;a<t.length;a++)u=t[a],u.ref.impl=u.nextImpl;break;case 11:case 15:break;case 1:if((t&1024)!==0&&f!==null){t=void 0,a=n,u=f.memoizedProps,f=f.memoizedState,o=a.stateNode;try{var pe=Gs(a.type,u);t=o.getSnapshotBeforeUpdate(pe,f),o.__reactInternalSnapshotBeforeUpdate=t}catch(Ce){xn(a,a.return,Ce)}}break;case 3:if((t&1024)!==0){if(t=n.stateNode.containerInfo,a=t.nodeType,a===9)uh(t);else if(a===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":uh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if((t&1024)!==0)throw Error(s(163))}if(t=n.sibling,t!==null){t.return=n.return,ti=t;break}ti=n.return}}function Mg(t,n,a){var o=a.flags;switch(a.tag){case 0:case 11:case 15:wa(t,a),o&4&&Ho(5,a);break;case 1:if(wa(t,a),o&4)if(t=a.stateNode,n===null)try{t.componentDidMount()}catch(y){xn(a,a.return,y)}else{var u=Gs(a.type,n.memoizedProps);n=n.memoizedState;try{t.componentDidUpdate(u,n,t.__reactInternalSnapshotBeforeUpdate)}catch(y){xn(a,a.return,y)}}o&64&&mg(a),o&512&&Go(a,a.return);break;case 3:if(wa(t,a),o&64&&(t=a.updateQueue,t!==null)){if(n=null,a.child!==null)switch(a.child.tag){case 27:case 5:n=a.child.stateNode;break;case 1:n=a.child.stateNode}try{sm(t,n)}catch(y){xn(a,a.return,y)}}break;case 27:n===null&&o&4&&xg(a);case 26:case 5:wa(t,a),n===null&&o&4&&vg(a),o&512&&Go(a,a.return);break;case 12:wa(t,a);break;case 31:wa(t,a),o&4&&bg(t,a);break;case 13:wa(t,a),o&4&&Tg(t,a),o&64&&(t=a.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(a=oy.bind(null,a),Ry(t,a))));break;case 22:if(o=a.memoizedState!==null||Ra,!o){n=n!==null&&n.memoizedState!==null||Zn,u=Ra;var f=Zn;Ra=o,(Zn=n)&&!f?Da(t,a,(a.subtreeFlags&8772)!==0):wa(t,a),Ra=u,Zn=f}break;case 30:break;default:wa(t,a)}}function Sg(t){var n=t.alternate;n!==null&&(t.alternate=null,Sg(n)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(n=t.stateNode,n!==null&&dt(n)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Pn=null,xi=!1;function Ca(t,n,a){for(a=a.child;a!==null;)Eg(t,n,a),a=a.sibling}function Eg(t,n,a){if(re&&typeof re.onCommitFiberUnmount=="function")try{re.onCommitFiberUnmount(se,a)}catch{}switch(a.tag){case 26:Zn||fa(a,n),Ca(t,n,a),a.memoizedState?a.memoizedState.count--:a.stateNode&&(a=a.stateNode,a.parentNode.removeChild(a));break;case 27:Zn||fa(a,n);var o=Pn,u=xi;us(a.type)&&(Pn=a.stateNode,xi=!1),Ca(t,n,a),Ko(a.stateNode),Pn=o,xi=u;break;case 5:Zn||fa(a,n);case 6:if(o=Pn,u=xi,Pn=null,Ca(t,n,a),Pn=o,xi=u,Pn!==null)if(xi)try{(Pn.nodeType===9?Pn.body:Pn.nodeName==="HTML"?Pn.ownerDocument.body:Pn).removeChild(a.stateNode)}catch(f){xn(a,n,f)}else try{Pn.removeChild(a.stateNode)}catch(f){xn(a,n,f)}break;case 18:Pn!==null&&(xi?(t=Pn,m0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,a.stateNode),Ir(t)):m0(Pn,a.stateNode));break;case 4:o=Pn,u=xi,Pn=a.stateNode.containerInfo,xi=!0,Ca(t,n,a),Pn=o,xi=u;break;case 0:case 11:case 14:case 15:is(2,a,n),Zn||is(4,a,n),Ca(t,n,a);break;case 1:Zn||(fa(a,n),o=a.stateNode,typeof o.componentWillUnmount=="function"&&gg(a,n,o)),Ca(t,n,a);break;case 21:Ca(t,n,a);break;case 22:Zn=(o=Zn)||a.memoizedState!==null,Ca(t,n,a),Zn=o;break;default:Ca(t,n,a)}}function bg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{Ir(t)}catch(a){xn(n,n.return,a)}}}function Tg(t,n){if(n.memoizedState===null&&(t=n.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{Ir(t)}catch(a){xn(n,n.return,a)}}function $x(t){switch(t.tag){case 31:case 13:case 19:var n=t.stateNode;return n===null&&(n=t.stateNode=new yg),n;case 22:return t=t.stateNode,n=t._retryCache,n===null&&(n=t._retryCache=new yg),n;default:throw Error(s(435,t.tag))}}function ic(t,n){var a=$x(t);n.forEach(function(o){if(!a.has(o)){a.add(o);var u=ly.bind(null,t,o);o.then(u,u)}})}function yi(t,n){var a=n.deletions;if(a!==null)for(var o=0;o<a.length;o++){var u=a[o],f=t,y=n,R=y;t:for(;R!==null;){switch(R.tag){case 27:if(us(R.type)){Pn=R.stateNode,xi=!1;break t}break;case 5:Pn=R.stateNode,xi=!1;break t;case 3:case 4:Pn=R.stateNode.containerInfo,xi=!0;break t}R=R.return}if(Pn===null)throw Error(s(160));Eg(f,y,u),Pn=null,xi=!1,f=u.alternate,f!==null&&(f.return=null),u.return=null}if(n.subtreeFlags&13886)for(n=n.child;n!==null;)Ag(n,t),n=n.sibling}var na=null;function Ag(t,n){var a=t.alternate,o=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:yi(n,t),Mi(t),o&4&&(is(3,t,t.return),Ho(3,t),is(5,t,t.return));break;case 1:yi(n,t),Mi(t),o&512&&(Zn||a===null||fa(a,a.return)),o&64&&Ra&&(t=t.updateQueue,t!==null&&(o=t.callbacks,o!==null&&(a=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=a===null?o:a.concat(o))));break;case 26:var u=na;if(yi(n,t),Mi(t),o&512&&(Zn||a===null||fa(a,a.return)),o&4){var f=a!==null?a.memoizedState:null;if(o=t.memoizedState,a===null)if(o===null)if(t.stateNode===null){t:{o=t.type,a=t.memoizedProps,u=u.ownerDocument||u;e:switch(o){case"title":f=u.getElementsByTagName("title")[0],(!f||f[et]||f[rn]||f.namespaceURI==="http://www.w3.org/2000/svg"||f.hasAttribute("itemprop"))&&(f=u.createElement(o),u.head.insertBefore(f,u.querySelector("head > title"))),oi(f,o,a),f[rn]=t,te(f),o=f;break t;case"link":var y=A0("link","href",u).get(o+(a.href||""));if(y){for(var R=0;R<y.length;R++)if(f=y[R],f.getAttribute("href")===(a.href==null||a.href===""?null:a.href)&&f.getAttribute("rel")===(a.rel==null?null:a.rel)&&f.getAttribute("title")===(a.title==null?null:a.title)&&f.getAttribute("crossorigin")===(a.crossOrigin==null?null:a.crossOrigin)){y.splice(R,1);break e}}f=u.createElement(o),oi(f,o,a),u.head.appendChild(f);break;case"meta":if(y=A0("meta","content",u).get(o+(a.content||""))){for(R=0;R<y.length;R++)if(f=y[R],f.getAttribute("content")===(a.content==null?null:""+a.content)&&f.getAttribute("name")===(a.name==null?null:a.name)&&f.getAttribute("property")===(a.property==null?null:a.property)&&f.getAttribute("http-equiv")===(a.httpEquiv==null?null:a.httpEquiv)&&f.getAttribute("charset")===(a.charSet==null?null:a.charSet)){y.splice(R,1);break e}}f=u.createElement(o),oi(f,o,a),u.head.appendChild(f);break;default:throw Error(s(468,o))}f[rn]=t,te(f),o=f}t.stateNode=o}else R0(u,t.type,t.stateNode);else t.stateNode=T0(u,o,t.memoizedProps);else f!==o?(f===null?a.stateNode!==null&&(a=a.stateNode,a.parentNode.removeChild(a)):f.count--,o===null?R0(u,t.type,t.stateNode):T0(u,o,t.memoizedProps)):o===null&&t.stateNode!==null&&Pf(t,t.memoizedProps,a.memoizedProps)}break;case 27:yi(n,t),Mi(t),o&512&&(Zn||a===null||fa(a,a.return)),a!==null&&o&4&&Pf(t,t.memoizedProps,a.memoizedProps);break;case 5:if(yi(n,t),Mi(t),o&512&&(Zn||a===null||fa(a,a.return)),t.flags&32){u=t.stateNode;try{De(u,"")}catch(pe){xn(t,t.return,pe)}}o&4&&t.stateNode!=null&&(u=t.memoizedProps,Pf(t,u,a!==null?a.memoizedProps:u)),o&1024&&(Ff=!0);break;case 6:if(yi(n,t),Mi(t),o&4){if(t.stateNode===null)throw Error(s(162));o=t.memoizedProps,a=t.stateNode;try{a.nodeValue=o}catch(pe){xn(t,t.return,pe)}}break;case 3:if(xc=null,u=na,na=vc(n.containerInfo),yi(n,t),na=u,Mi(t),o&4&&a!==null&&a.memoizedState.isDehydrated)try{Ir(n.containerInfo)}catch(pe){xn(t,t.return,pe)}Ff&&(Ff=!1,Rg(t));break;case 4:o=na,na=vc(t.stateNode.containerInfo),yi(n,t),Mi(t),na=o;break;case 12:yi(n,t),Mi(t);break;case 31:yi(n,t),Mi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,ic(t,o)));break;case 13:yi(n,t),Mi(t),t.child.flags&8192&&t.memoizedState!==null!=(a!==null&&a.memoizedState!==null)&&(sc=xt()),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,ic(t,o)));break;case 22:u=t.memoizedState!==null;var q=a!==null&&a.memoizedState!==null,ht=Ra,bt=Zn;if(Ra=ht||u,Zn=bt||q,yi(n,t),Zn=bt,Ra=ht,Mi(t),o&8192)t:for(n=t.stateNode,n._visibility=u?n._visibility&-2:n._visibility|1,u&&(a===null||q||Ra||Zn||Vs(t)),a=null,n=t;;){if(n.tag===5||n.tag===26){if(a===null){q=a=n;try{if(f=q.stateNode,u)y=f.style,typeof y.setProperty=="function"?y.setProperty("display","none","important"):y.display="none";else{R=q.stateNode;var Ut=q.memoizedProps.style,gt=Ut!=null&&Ut.hasOwnProperty("display")?Ut.display:null;R.style.display=gt==null||typeof gt=="boolean"?"":(""+gt).trim()}}catch(pe){xn(q,q.return,pe)}}}else if(n.tag===6){if(a===null){q=n;try{q.stateNode.nodeValue=u?"":q.memoizedProps}catch(pe){xn(q,q.return,pe)}}}else if(n.tag===18){if(a===null){q=n;try{var Mt=q.stateNode;u?g0(Mt,!0):g0(q.stateNode,!1)}catch(pe){xn(q,q.return,pe)}}}else if((n.tag!==22&&n.tag!==23||n.memoizedState===null||n===t)&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break t;for(;n.sibling===null;){if(n.return===null||n.return===t)break t;a===n&&(a=null),n=n.return}a===n&&(a=null),n.sibling.return=n.return,n=n.sibling}o&4&&(o=t.updateQueue,o!==null&&(a=o.retryQueue,a!==null&&(o.retryQueue=null,ic(t,a))));break;case 19:yi(n,t),Mi(t),o&4&&(o=t.updateQueue,o!==null&&(t.updateQueue=null,ic(t,o)));break;case 30:break;case 21:break;default:yi(n,t),Mi(t)}}function Mi(t){var n=t.flags;if(n&2){try{for(var a,o=t.return;o!==null;){if(_g(o)){a=o;break}o=o.return}if(a==null)throw Error(s(160));switch(a.tag){case 27:var u=a.stateNode,f=Bf(t);nc(t,f,u);break;case 5:var y=a.stateNode;a.flags&32&&(De(y,""),a.flags&=-33);var R=Bf(t);nc(t,R,y);break;case 3:case 4:var q=a.stateNode.containerInfo,ht=Bf(t);If(t,ht,q);break;default:throw Error(s(161))}}catch(bt){xn(t,t.return,bt)}t.flags&=-3}n&4096&&(t.flags&=-4097)}function Rg(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var n=t;Rg(n),n.tag===5&&n.flags&1024&&n.stateNode.reset(),t=t.sibling}}function wa(t,n){if(n.subtreeFlags&8772)for(n=n.child;n!==null;)Mg(t,n.alternate,n),n=n.sibling}function Vs(t){for(t=t.child;t!==null;){var n=t;switch(n.tag){case 0:case 11:case 14:case 15:is(4,n,n.return),Vs(n);break;case 1:fa(n,n.return);var a=n.stateNode;typeof a.componentWillUnmount=="function"&&gg(n,n.return,a),Vs(n);break;case 27:Ko(n.stateNode);case 26:case 5:fa(n,n.return),Vs(n);break;case 22:n.memoizedState===null&&Vs(n);break;case 30:Vs(n);break;default:Vs(n)}t=t.sibling}}function Da(t,n,a){for(a=a&&(n.subtreeFlags&8772)!==0,n=n.child;n!==null;){var o=n.alternate,u=t,f=n,y=f.flags;switch(f.tag){case 0:case 11:case 15:Da(u,f,a),Ho(4,f);break;case 1:if(Da(u,f,a),o=f,u=o.stateNode,typeof u.componentDidMount=="function")try{u.componentDidMount()}catch(ht){xn(o,o.return,ht)}if(o=f,u=o.updateQueue,u!==null){var R=o.stateNode;try{var q=u.shared.hiddenCallbacks;if(q!==null)for(u.shared.hiddenCallbacks=null,u=0;u<q.length;u++)am(q[u],R)}catch(ht){xn(o,o.return,ht)}}a&&y&64&&mg(f),Go(f,f.return);break;case 27:xg(f);case 26:case 5:Da(u,f,a),a&&o===null&&y&4&&vg(f),Go(f,f.return);break;case 12:Da(u,f,a);break;case 31:Da(u,f,a),a&&y&4&&bg(u,f);break;case 13:Da(u,f,a),a&&y&4&&Tg(u,f);break;case 22:f.memoizedState===null&&Da(u,f,a),Go(f,f.return);break;case 30:break;default:Da(u,f,a)}n=n.sibling}}function Hf(t,n){var a=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(a=t.memoizedState.cachePool.pool),t=null,n.memoizedState!==null&&n.memoizedState.cachePool!==null&&(t=n.memoizedState.cachePool.pool),t!==a&&(t!=null&&t.refCount++,a!=null&&Ro(a))}function Gf(t,n){t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Ro(t))}function ia(t,n,a,o){if(n.subtreeFlags&10256)for(n=n.child;n!==null;)Cg(t,n,a,o),n=n.sibling}function Cg(t,n,a,o){var u=n.flags;switch(n.tag){case 0:case 11:case 15:ia(t,n,a,o),u&2048&&Ho(9,n);break;case 1:ia(t,n,a,o);break;case 3:ia(t,n,a,o),u&2048&&(t=null,n.alternate!==null&&(t=n.alternate.memoizedState.cache),n=n.memoizedState.cache,n!==t&&(n.refCount++,t!=null&&Ro(t)));break;case 12:if(u&2048){ia(t,n,a,o),t=n.stateNode;try{var f=n.memoizedProps,y=f.id,R=f.onPostCommit;typeof R=="function"&&R(y,n.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(q){xn(n,n.return,q)}}else ia(t,n,a,o);break;case 31:ia(t,n,a,o);break;case 13:ia(t,n,a,o);break;case 23:break;case 22:f=n.stateNode,y=n.alternate,n.memoizedState!==null?f._visibility&2?ia(t,n,a,o):Vo(t,n):f._visibility&2?ia(t,n,a,o):(f._visibility|=2,Rr(t,n,a,o,(n.subtreeFlags&10256)!==0||!1)),u&2048&&Hf(y,n);break;case 24:ia(t,n,a,o),u&2048&&Gf(n.alternate,n);break;default:ia(t,n,a,o)}}function Rr(t,n,a,o,u){for(u=u&&((n.subtreeFlags&10256)!==0||!1),n=n.child;n!==null;){var f=t,y=n,R=a,q=o,ht=y.flags;switch(y.tag){case 0:case 11:case 15:Rr(f,y,R,q,u),Ho(8,y);break;case 23:break;case 22:var bt=y.stateNode;y.memoizedState!==null?bt._visibility&2?Rr(f,y,R,q,u):Vo(f,y):(bt._visibility|=2,Rr(f,y,R,q,u)),u&&ht&2048&&Hf(y.alternate,y);break;case 24:Rr(f,y,R,q,u),u&&ht&2048&&Gf(y.alternate,y);break;default:Rr(f,y,R,q,u)}n=n.sibling}}function Vo(t,n){if(n.subtreeFlags&10256)for(n=n.child;n!==null;){var a=t,o=n,u=o.flags;switch(o.tag){case 22:Vo(a,o),u&2048&&Hf(o.alternate,o);break;case 24:Vo(a,o),u&2048&&Gf(o.alternate,o);break;default:Vo(a,o)}n=n.sibling}}var ko=8192;function Cr(t,n,a){if(t.subtreeFlags&ko)for(t=t.child;t!==null;)wg(t,n,a),t=t.sibling}function wg(t,n,a){switch(t.tag){case 26:Cr(t,n,a),t.flags&ko&&t.memoizedState!==null&&Fy(a,na,t.memoizedState,t.memoizedProps);break;case 5:Cr(t,n,a);break;case 3:case 4:var o=na;na=vc(t.stateNode.containerInfo),Cr(t,n,a),na=o;break;case 22:t.memoizedState===null&&(o=t.alternate,o!==null&&o.memoizedState!==null?(o=ko,ko=16777216,Cr(t,n,a),ko=o):Cr(t,n,a));break;default:Cr(t,n,a)}}function Dg(t){var n=t.alternate;if(n!==null&&(t=n.child,t!==null)){n.child=null;do n=t.sibling,t.sibling=null,t=n;while(t!==null)}}function Xo(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];ti=o,Lg(o,t)}Dg(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)Ug(t),t=t.sibling}function Ug(t){switch(t.tag){case 0:case 11:case 15:Xo(t),t.flags&2048&&is(9,t,t.return);break;case 3:Xo(t);break;case 12:Xo(t);break;case 22:var n=t.stateNode;t.memoizedState!==null&&n._visibility&2&&(t.return===null||t.return.tag!==13)?(n._visibility&=-3,ac(t)):Xo(t);break;default:Xo(t)}}function ac(t){var n=t.deletions;if((t.flags&16)!==0){if(n!==null)for(var a=0;a<n.length;a++){var o=n[a];ti=o,Lg(o,t)}Dg(t)}for(t=t.child;t!==null;){switch(n=t,n.tag){case 0:case 11:case 15:is(8,n,n.return),ac(n);break;case 22:a=n.stateNode,a._visibility&2&&(a._visibility&=-3,ac(n));break;default:ac(n)}t=t.sibling}}function Lg(t,n){for(;ti!==null;){var a=ti;switch(a.tag){case 0:case 11:case 15:is(8,a,n);break;case 23:case 22:if(a.memoizedState!==null&&a.memoizedState.cachePool!==null){var o=a.memoizedState.cachePool.pool;o!=null&&o.refCount++}break;case 24:Ro(a.memoizedState.cache)}if(o=a.child,o!==null)o.return=a,ti=o;else t:for(a=t;ti!==null;){o=ti;var u=o.sibling,f=o.return;if(Sg(o),o===a){ti=null;break t}if(u!==null){u.return=f,ti=u;break t}ti=f}}}var ty={getCacheForType:function(t){var n=si(Wn),a=n.data.get(t);return a===void 0&&(a=t(),n.data.set(t,a)),a},cacheSignal:function(){return si(Wn).controller.signal}},ey=typeof WeakMap=="function"?WeakMap:Map,gn=0,Tn=null,Je=null,tn=0,_n=0,Oi=null,as=!1,wr=!1,Vf=!1,Ua=0,Hn=0,ss=0,ks=0,kf=0,zi=0,Dr=0,qo=null,Si=null,Xf=!1,sc=0,Ng=0,rc=1/0,oc=null,rs=null,Qn=0,os=null,Ur=null,La=0,qf=0,Wf=null,Og=null,Wo=0,jf=null;function Pi(){return(gn&2)!==0&&tn!==0?tn&-tn:w.T!==null?$f():vn()}function zg(){if(zi===0)if((tn&536870912)===0||nn){var t=St;St<<=1,(St&3932160)===0&&(St=262144),zi=t}else zi=536870912;return t=Li.current,t!==null&&(t.flags|=32),zi}function Ei(t,n,a){(t===Tn&&(_n===2||_n===9)||t.cancelPendingCommit!==null)&&(Lr(t,0),ls(t,tn,zi,!1)),Nn(t,a),((gn&2)===0||t!==Tn)&&(t===Tn&&((gn&2)===0&&(ks|=a),Hn===4&&ls(t,tn,zi,!1)),ha(t))}function Pg(t,n,a){if((gn&6)!==0)throw Error(s(327));var o=!a&&(n&127)===0&&(n&t.expiredLanes)===0||Pt(t,n),u=o?ay(t,n):Zf(t,n,!0),f=o;do{if(u===0){wr&&!o&&ls(t,n,0,!1);break}else{if(a=t.current.alternate,f&&!ny(a)){u=Zf(t,n,!1),f=!1;continue}if(u===2){if(f=n,t.errorRecoveryDisabledLanes&f)var y=0;else y=t.pendingLanes&-536870913,y=y!==0?y:y&536870912?536870912:0;if(y!==0){n=y;t:{var R=t;u=qo;var q=R.current.memoizedState.isDehydrated;if(q&&(Lr(R,y).flags|=256),y=Zf(R,y,!1),y!==2){if(Vf&&!q){R.errorRecoveryDisabledLanes|=f,ks|=f,u=4;break t}f=Si,Si=u,f!==null&&(Si===null?Si=f:Si.push.apply(Si,f))}u=y}if(f=!1,u!==2)continue}}if(u===1){Lr(t,0),ls(t,n,0,!0);break}t:{switch(o=t,f=u,f){case 0:case 1:throw Error(s(345));case 4:if((n&4194048)!==n)break;case 6:ls(o,n,zi,!as);break t;case 2:Si=null;break;case 3:case 5:break;default:throw Error(s(329))}if((n&62914560)===n&&(u=sc+300-xt(),10<u)){if(ls(o,n,zi,!as),$t(o,0,!0)!==0)break t;La=n,o.timeoutHandle=d0(Bg.bind(null,o,a,Si,oc,Xf,n,zi,ks,Dr,as,f,"Throttled",-0,0),u);break t}Bg(o,a,Si,oc,Xf,n,zi,ks,Dr,as,f,null,-0,0)}}break}while(!0);ha(t)}function Bg(t,n,a,o,u,f,y,R,q,ht,bt,Ut,gt,Mt){if(t.timeoutHandle=-1,Ut=n.subtreeFlags,Ut&8192||(Ut&16785408)===16785408){Ut={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:We},wg(n,f,Ut);var pe=(f&62914560)===f?sc-xt():(f&4194048)===f?Ng-xt():0;if(pe=Hy(Ut,pe),pe!==null){La=f,t.cancelPendingCommit=pe(qg.bind(null,t,n,f,a,o,u,y,R,q,bt,Ut,null,gt,Mt)),ls(t,f,y,!ht);return}}qg(t,n,f,a,o,u,y,R,q)}function ny(t){for(var n=t;;){var a=n.tag;if((a===0||a===11||a===15)&&n.flags&16384&&(a=n.updateQueue,a!==null&&(a=a.stores,a!==null)))for(var o=0;o<a.length;o++){var u=a[o],f=u.getSnapshot;u=u.value;try{if(!Di(f(),u))return!1}catch{return!1}}if(a=n.child,n.subtreeFlags&16384&&a!==null)a.return=n,n=a;else{if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function ls(t,n,a,o){n&=~kf,n&=~ks,t.suspendedLanes|=n,t.pingedLanes&=~n,o&&(t.warmLanes|=n),o=t.expirationTimes;for(var u=n;0<u;){var f=31-Te(u),y=1<<f;o[f]=-1,u&=~y}a!==0&&ta(t,a,n)}function lc(){return(gn&6)===0?(jo(0),!1):!0}function Yf(){if(Je!==null){if(_n===0)var t=Je.return;else t=Je,Ma=Os=null,uf(t),Sr=null,wo=0,t=Je;for(;t!==null;)pg(t.alternate,t),t=t.return;Je=null}}function Lr(t,n){var a=t.timeoutHandle;a!==-1&&(t.timeoutHandle=-1,Sy(a)),a=t.cancelPendingCommit,a!==null&&(t.cancelPendingCommit=null,a()),La=0,Yf(),Tn=t,Je=a=xa(t.current,null),tn=n,_n=0,Oi=null,as=!1,wr=Pt(t,n),Vf=!1,Dr=zi=kf=ks=ss=Hn=0,Si=qo=null,Xf=!1,(n&8)!==0&&(n|=n&32);var o=t.entangledLanes;if(o!==0)for(t=t.entanglements,o&=n;0<o;){var u=31-Te(o),f=1<<u;n|=t[u],o&=~f}return Ua=n,wl(),a}function Ig(t,n){ze=null,w.H=Bo,n===Mr||n===Bl?(n=tm(),_n=3):n===Qu?(n=tm(),_n=4):_n=n===Af?8:n!==null&&typeof n=="object"&&typeof n.then=="function"?6:1,Oi=n,Je===null&&(Hn=1,Ql(t,Vi(n,t.current)))}function Fg(){var t=Li.current;return t===null?!0:(tn&4194048)===tn?Wi===null:(tn&62914560)===tn||(tn&536870912)!==0?t===Wi:!1}function Hg(){var t=w.H;return w.H=Bo,t===null?Bo:t}function Gg(){var t=w.A;return w.A=ty,t}function cc(){Hn=4,as||(tn&4194048)!==tn&&Li.current!==null||(wr=!0),(ss&134217727)===0&&(ks&134217727)===0||Tn===null||ls(Tn,tn,zi,!1)}function Zf(t,n,a){var o=gn;gn|=2;var u=Hg(),f=Gg();(Tn!==t||tn!==n)&&(oc=null,Lr(t,n)),n=!1;var y=Hn;t:do try{if(_n!==0&&Je!==null){var R=Je,q=Oi;switch(_n){case 8:Yf(),y=6;break t;case 3:case 2:case 9:case 6:Li.current===null&&(n=!0);var ht=_n;if(_n=0,Oi=null,Nr(t,R,q,ht),a&&wr){y=0;break t}break;default:ht=_n,_n=0,Oi=null,Nr(t,R,q,ht)}}iy(),y=Hn;break}catch(bt){Ig(t,bt)}while(!0);return n&&t.shellSuspendCounter++,Ma=Os=null,gn=o,w.H=u,w.A=f,Je===null&&(Tn=null,tn=0,wl()),y}function iy(){for(;Je!==null;)Vg(Je)}function ay(t,n){var a=gn;gn|=2;var o=Hg(),u=Gg();Tn!==t||tn!==n?(oc=null,rc=xt()+500,Lr(t,n)):wr=Pt(t,n);t:do try{if(_n!==0&&Je!==null){n=Je;var f=Oi;e:switch(_n){case 1:_n=0,Oi=null,Nr(t,n,f,1);break;case 2:case 9:if(Jp(f)){_n=0,Oi=null,kg(n);break}n=function(){_n!==2&&_n!==9||Tn!==t||(_n=7),ha(t)},f.then(n,n);break t;case 3:_n=7;break t;case 4:_n=5;break t;case 7:Jp(f)?(_n=0,Oi=null,kg(n)):(_n=0,Oi=null,Nr(t,n,f,7));break;case 5:var y=null;switch(Je.tag){case 26:y=Je.memoizedState;case 5:case 27:var R=Je;if(y?C0(y):R.stateNode.complete){_n=0,Oi=null;var q=R.sibling;if(q!==null)Je=q;else{var ht=R.return;ht!==null?(Je=ht,uc(ht)):Je=null}break e}}_n=0,Oi=null,Nr(t,n,f,5);break;case 6:_n=0,Oi=null,Nr(t,n,f,6);break;case 8:Yf(),Hn=6;break t;default:throw Error(s(462))}}sy();break}catch(bt){Ig(t,bt)}while(!0);return Ma=Os=null,w.H=o,w.A=u,gn=a,Je!==null?0:(Tn=null,tn=0,wl(),Hn)}function sy(){for(;Je!==null&&!A();)Vg(Je)}function Vg(t){var n=hg(t.alternate,t,Ua);t.memoizedProps=t.pendingProps,n===null?uc(t):Je=n}function kg(t){var n=t,a=n.alternate;switch(n.tag){case 15:case 0:n=rg(a,n,n.pendingProps,n.type,void 0,tn);break;case 11:n=rg(a,n,n.pendingProps,n.type.render,n.ref,tn);break;case 5:uf(n);default:pg(a,n),n=Je=Gp(n,Ua),n=hg(a,n,Ua)}t.memoizedProps=t.pendingProps,n===null?uc(t):Je=n}function Nr(t,n,a,o){Ma=Os=null,uf(n),Sr=null,wo=0;var u=n.return;try{if(jx(t,u,n,a,tn)){Hn=1,Ql(t,Vi(a,t.current)),Je=null;return}}catch(f){if(u!==null)throw Je=u,f;Hn=1,Ql(t,Vi(a,t.current)),Je=null;return}n.flags&32768?(nn||o===1?t=!0:wr||(tn&536870912)!==0?t=!1:(as=t=!0,(o===2||o===9||o===3||o===6)&&(o=Li.current,o!==null&&o.tag===13&&(o.flags|=16384))),Xg(n,t)):uc(n)}function uc(t){var n=t;do{if((n.flags&32768)!==0){Xg(n,as);return}t=n.return;var a=Kx(n.alternate,n,Ua);if(a!==null){Je=a;return}if(n=n.sibling,n!==null){Je=n;return}Je=n=t}while(n!==null);Hn===0&&(Hn=5)}function Xg(t,n){do{var a=Qx(t.alternate,t);if(a!==null){a.flags&=32767,Je=a;return}if(a=t.return,a!==null&&(a.flags|=32768,a.subtreeFlags=0,a.deletions=null),!n&&(t=t.sibling,t!==null)){Je=t;return}Je=t=a}while(t!==null);Hn=6,Je=null}function qg(t,n,a,o,u,f,y,R,q){t.cancelPendingCommit=null;do fc();while(Qn!==0);if((gn&6)!==0)throw Error(s(327));if(n!==null){if(n===t.current)throw Error(s(177));if(f=n.lanes|n.childLanes,f|=Pu,Cn(t,a,f,y,R,q),t===Tn&&(Je=Tn=null,tn=0),Ur=n,os=t,La=a,qf=f,Wf=u,Og=o,(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?(t.callbackNode=null,t.callbackPriority=0,cy(Xt,function(){return Kg(),null})):(t.callbackNode=null,t.callbackPriority=0),o=(n.flags&13878)!==0,(n.subtreeFlags&13878)!==0||o){o=w.T,w.T=null,u=X.p,X.p=2,y=gn,gn|=4;try{Jx(t,n,a)}finally{gn=y,X.p=u,w.T=o}}Qn=1,Wg(),jg(),Yg()}}function Wg(){if(Qn===1){Qn=0;var t=os,n=Ur,a=(n.flags&13878)!==0;if((n.subtreeFlags&13878)!==0||a){a=w.T,w.T=null;var o=X.p;X.p=2;var u=gn;gn|=4;try{Ag(n,t);var f=oh,y=Lp(t.containerInfo),R=f.focusedElem,q=f.selectionRange;if(y!==R&&R&&R.ownerDocument&&Up(R.ownerDocument.documentElement,R)){if(q!==null&&Uu(R)){var ht=q.start,bt=q.end;if(bt===void 0&&(bt=ht),"selectionStart"in R)R.selectionStart=ht,R.selectionEnd=Math.min(bt,R.value.length);else{var Ut=R.ownerDocument||document,gt=Ut&&Ut.defaultView||window;if(gt.getSelection){var Mt=gt.getSelection(),pe=R.textContent.length,Ce=Math.min(q.start,pe),Sn=q.end===void 0?Ce:Math.min(q.end,pe);!Mt.extend&&Ce>Sn&&(y=Sn,Sn=Ce,Ce=y);var st=Dp(R,Ce),J=Dp(R,Sn);if(st&&J&&(Mt.rangeCount!==1||Mt.anchorNode!==st.node||Mt.anchorOffset!==st.offset||Mt.focusNode!==J.node||Mt.focusOffset!==J.offset)){var ut=Ut.createRange();ut.setStart(st.node,st.offset),Mt.removeAllRanges(),Ce>Sn?(Mt.addRange(ut),Mt.extend(J.node,J.offset)):(ut.setEnd(J.node,J.offset),Mt.addRange(ut))}}}}for(Ut=[],Mt=R;Mt=Mt.parentNode;)Mt.nodeType===1&&Ut.push({element:Mt,left:Mt.scrollLeft,top:Mt.scrollTop});for(typeof R.focus=="function"&&R.focus(),R=0;R<Ut.length;R++){var Rt=Ut[R];Rt.element.scrollLeft=Rt.left,Rt.element.scrollTop=Rt.top}}Ec=!!rh,oh=rh=null}finally{gn=u,X.p=o,w.T=a}}t.current=n,Qn=2}}function jg(){if(Qn===2){Qn=0;var t=os,n=Ur,a=(n.flags&8772)!==0;if((n.subtreeFlags&8772)!==0||a){a=w.T,w.T=null;var o=X.p;X.p=2;var u=gn;gn|=4;try{Mg(t,n.alternate,n)}finally{gn=u,X.p=o,w.T=a}}Qn=3}}function Yg(){if(Qn===4||Qn===3){Qn=0,rt();var t=os,n=Ur,a=La,o=Og;(n.subtreeFlags&10256)!==0||(n.flags&10256)!==0?Qn=5:(Qn=0,Ur=os=null,Zg(t,t.pendingLanes));var u=t.pendingLanes;if(u===0&&(rs=null),ii(a),n=n.stateNode,re&&typeof re.onCommitFiberRoot=="function")try{re.onCommitFiberRoot(se,n,void 0,(n.current.flags&128)===128)}catch{}if(o!==null){n=w.T,u=X.p,X.p=2,w.T=null;try{for(var f=t.onRecoverableError,y=0;y<o.length;y++){var R=o[y];f(R.value,{componentStack:R.stack})}}finally{w.T=n,X.p=u}}(La&3)!==0&&fc(),ha(t),u=t.pendingLanes,(a&261930)!==0&&(u&42)!==0?t===jf?Wo++:(Wo=0,jf=t):Wo=0,jo(0)}}function Zg(t,n){(t.pooledCacheLanes&=n)===0&&(n=t.pooledCache,n!=null&&(t.pooledCache=null,Ro(n)))}function fc(){return Wg(),jg(),Yg(),Kg()}function Kg(){if(Qn!==5)return!1;var t=os,n=qf;qf=0;var a=ii(La),o=w.T,u=X.p;try{X.p=32>a?32:a,w.T=null,a=Wf,Wf=null;var f=os,y=La;if(Qn=0,Ur=os=null,La=0,(gn&6)!==0)throw Error(s(331));var R=gn;if(gn|=4,Ug(f.current),Cg(f,f.current,y,a),gn=R,jo(0,!1),re&&typeof re.onPostCommitFiberRoot=="function")try{re.onPostCommitFiberRoot(se,f)}catch{}return!0}finally{X.p=u,w.T=o,Zg(t,n)}}function Qg(t,n,a){n=Vi(a,n),n=Tf(t.stateNode,n,2),t=ts(t,n,2),t!==null&&(Nn(t,2),ha(t))}function xn(t,n,a){if(t.tag===3)Qg(t,t,a);else for(;n!==null;){if(n.tag===3){Qg(n,t,a);break}else if(n.tag===1){var o=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof o.componentDidCatch=="function"&&(rs===null||!rs.has(o))){t=Vi(a,t),a=Jm(2),o=ts(n,a,2),o!==null&&($m(a,o,n,t),Nn(o,2),ha(o));break}}n=n.return}}function Kf(t,n,a){var o=t.pingCache;if(o===null){o=t.pingCache=new ey;var u=new Set;o.set(n,u)}else u=o.get(n),u===void 0&&(u=new Set,o.set(n,u));u.has(a)||(Vf=!0,u.add(a),t=ry.bind(null,t,n,a),n.then(t,t))}function ry(t,n,a){var o=t.pingCache;o!==null&&o.delete(n),t.pingedLanes|=t.suspendedLanes&a,t.warmLanes&=~a,Tn===t&&(tn&a)===a&&(Hn===4||Hn===3&&(tn&62914560)===tn&&300>xt()-sc?(gn&2)===0&&Lr(t,0):kf|=a,Dr===tn&&(Dr=0)),ha(t)}function Jg(t,n){n===0&&(n=Rn()),t=Us(t,n),t!==null&&(Nn(t,n),ha(t))}function oy(t){var n=t.memoizedState,a=0;n!==null&&(a=n.retryLane),Jg(t,a)}function ly(t,n){var a=0;switch(t.tag){case 31:case 13:var o=t.stateNode,u=t.memoizedState;u!==null&&(a=u.retryLane);break;case 19:o=t.stateNode;break;case 22:o=t.stateNode._retryCache;break;default:throw Error(s(314))}o!==null&&o.delete(n),Jg(t,a)}function cy(t,n){return me(t,n)}var hc=null,Or=null,Qf=!1,dc=!1,Jf=!1,cs=0;function ha(t){t!==Or&&t.next===null&&(Or===null?hc=Or=t:Or=Or.next=t),dc=!0,Qf||(Qf=!0,fy())}function jo(t,n){if(!Jf&&dc){Jf=!0;do for(var a=!1,o=hc;o!==null;){if(t!==0){var u=o.pendingLanes;if(u===0)var f=0;else{var y=o.suspendedLanes,R=o.pingedLanes;f=(1<<31-Te(42|t)+1)-1,f&=u&~(y&~R),f=f&201326741?f&201326741|1:f?f|2:0}f!==0&&(a=!0,n0(o,f))}else f=tn,f=$t(o,o===Tn?f:0,o.cancelPendingCommit!==null||o.timeoutHandle!==-1),(f&3)===0||Pt(o,f)||(a=!0,n0(o,f));o=o.next}while(a);Jf=!1}}function uy(){$g()}function $g(){dc=Qf=!1;var t=0;cs!==0&&My()&&(t=cs);for(var n=xt(),a=null,o=hc;o!==null;){var u=o.next,f=t0(o,n);f===0?(o.next=null,a===null?hc=u:a.next=u,u===null&&(Or=a)):(a=o,(t!==0||(f&3)!==0)&&(dc=!0)),o=u}Qn!==0&&Qn!==5||jo(t),cs!==0&&(cs=0)}function t0(t,n){for(var a=t.suspendedLanes,o=t.pingedLanes,u=t.expirationTimes,f=t.pendingLanes&-62914561;0<f;){var y=31-Te(f),R=1<<y,q=u[y];q===-1?((R&a)===0||(R&o)!==0)&&(u[y]=pn(R,n)):q<=n&&(t.expiredLanes|=R),f&=~R}if(n=Tn,a=tn,a=$t(t,t===n?a:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o=t.callbackNode,a===0||t===n&&(_n===2||_n===9)||t.cancelPendingCommit!==null)return o!==null&&o!==null&&P(o),t.callbackNode=null,t.callbackPriority=0;if((a&3)===0||Pt(t,a)){if(n=a&-a,n===t.callbackPriority)return n;switch(o!==null&&P(o),ii(a)){case 2:case 8:a=ie;break;case 32:a=Xt;break;case 268435456:a=qt;break;default:a=Xt}return o=e0.bind(null,t),a=me(a,o),t.callbackPriority=n,t.callbackNode=a,n}return o!==null&&o!==null&&P(o),t.callbackPriority=2,t.callbackNode=null,2}function e0(t,n){if(Qn!==0&&Qn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var a=t.callbackNode;if(fc()&&t.callbackNode!==a)return null;var o=tn;return o=$t(t,t===Tn?o:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),o===0?null:(Pg(t,o,n),t0(t,xt()),t.callbackNode!=null&&t.callbackNode===a?e0.bind(null,t):null)}function n0(t,n){if(fc())return null;Pg(t,n,!0)}function fy(){Ey(function(){(gn&6)!==0?me(W,uy):$g()})}function $f(){if(cs===0){var t=xr;t===0&&(t=Qt,Qt<<=1,(Qt&261888)===0&&(Qt=256)),cs=t}return cs}function i0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:He(""+t)}function a0(t,n){var a=n.ownerDocument.createElement("input");return a.name=n.name,a.value=n.value,t.id&&a.setAttribute("form",t.id),n.parentNode.insertBefore(a,n),t=new FormData(t),a.parentNode.removeChild(a),t}function hy(t,n,a,o,u){if(n==="submit"&&a&&a.stateNode===u){var f=i0((u[mn]||null).action),y=o.submitter;y&&(n=(n=y[mn]||null)?i0(n.formAction):y.getAttribute("formAction"),n!==null&&(f=n,y=null));var R=new Tl("action","action",null,o,u);t.push({event:R,listeners:[{instance:null,listener:function(){if(o.defaultPrevented){if(cs!==0){var q=y?a0(u,y):new FormData(u);xf(a,{pending:!0,data:q,method:u.method,action:f},null,q)}}else typeof f=="function"&&(R.preventDefault(),q=y?a0(u,y):new FormData(u),xf(a,{pending:!0,data:q,method:u.method,action:f},f,q))},currentTarget:u}]})}}for(var th=0;th<zu.length;th++){var eh=zu[th],dy=eh.toLowerCase(),py=eh[0].toUpperCase()+eh.slice(1);ea(dy,"on"+py)}ea(zp,"onAnimationEnd"),ea(Pp,"onAnimationIteration"),ea(Bp,"onAnimationStart"),ea("dblclick","onDoubleClick"),ea("focusin","onFocus"),ea("focusout","onBlur"),ea(Dx,"onTransitionRun"),ea(Ux,"onTransitionStart"),ea(Lx,"onTransitionCancel"),ea(Ip,"onTransitionEnd"),ue("onMouseEnter",["mouseout","mouseover"]),ue("onMouseLeave",["mouseout","mouseover"]),ue("onPointerEnter",["pointerout","pointerover"]),ue("onPointerLeave",["pointerout","pointerover"]),Ee("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),Ee("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),Ee("onBeforeInput",["compositionend","keypress","textInput","paste"]),Ee("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),Ee("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),Ee("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Yo="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),my=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Yo));function s0(t,n){n=(n&4)!==0;for(var a=0;a<t.length;a++){var o=t[a],u=o.event;o=o.listeners;t:{var f=void 0;if(n)for(var y=o.length-1;0<=y;y--){var R=o[y],q=R.instance,ht=R.currentTarget;if(R=R.listener,q!==f&&u.isPropagationStopped())break t;f=R,u.currentTarget=ht;try{f(u)}catch(bt){Cl(bt)}u.currentTarget=null,f=q}else for(y=0;y<o.length;y++){if(R=o[y],q=R.instance,ht=R.currentTarget,R=R.listener,q!==f&&u.isPropagationStopped())break t;f=R,u.currentTarget=ht;try{f(u)}catch(bt){Cl(bt)}u.currentTarget=null,f=q}}}}function $e(t,n){var a=n[Ci];a===void 0&&(a=n[Ci]=new Set);var o=t+"__bubble";a.has(o)||(r0(n,t,2,!1),a.add(o))}function nh(t,n,a){var o=0;n&&(o|=4),r0(a,t,o,n)}var pc="_reactListening"+Math.random().toString(36).slice(2);function ih(t){if(!t[pc]){t[pc]=!0,he.forEach(function(a){a!=="selectionchange"&&(my.has(a)||nh(a,!1,t),nh(a,!0,t))});var n=t.nodeType===9?t:t.ownerDocument;n===null||n[pc]||(n[pc]=!0,nh("selectionchange",!1,n))}}function r0(t,n,a,o){switch(z0(n)){case 2:var u=ky;break;case 8:u=Xy;break;default:u=_h}a=u.bind(null,n,a,t),u=void 0,!ye||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(u=!0),o?u!==void 0?t.addEventListener(n,a,{capture:!0,passive:u}):t.addEventListener(n,a,!0):u!==void 0?t.addEventListener(n,a,{passive:u}):t.addEventListener(n,a,!1)}function ah(t,n,a,o,u){var f=o;if((n&1)===0&&(n&2)===0&&o!==null)t:for(;;){if(o===null)return;var y=o.tag;if(y===3||y===4){var R=o.stateNode.containerInfo;if(R===u)break;if(y===4)for(y=o.return;y!==null;){var q=y.tag;if((q===3||q===4)&&y.stateNode.containerInfo===u)return;y=y.return}for(;R!==null;){if(y=ft(R),y===null)return;if(q=y.tag,q===5||q===6||q===26||q===27){o=f=y;continue t}R=R.parentNode}}o=o.return}Ae(function(){var ht=f,bt=Zt(a),Ut=[];t:{var gt=Fp.get(t);if(gt!==void 0){var Mt=Tl,pe=t;switch(t){case"keypress":if(ja(a)===0)break t;case"keydown":case"keyup":Mt=lx;break;case"focusin":pe="focus",Mt=Au;break;case"focusout":pe="blur",Mt=Au;break;case"beforeblur":case"afterblur":Mt=Au;break;case"click":if(a.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":Mt=pp;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":Mt=K_;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":Mt=fx;break;case zp:case Pp:case Bp:Mt=$_;break;case Ip:Mt=dx;break;case"scroll":case"scrollend":Mt=Y_;break;case"wheel":Mt=mx;break;case"copy":case"cut":case"paste":Mt=ex;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":Mt=gp;break;case"toggle":case"beforetoggle":Mt=vx}var Ce=(n&4)!==0,Sn=!Ce&&(t==="scroll"||t==="scrollend"),st=Ce?gt!==null?gt+"Capture":null:gt;Ce=[];for(var J=ht,ut;J!==null;){var Rt=J;if(ut=Rt.stateNode,Rt=Rt.tag,Rt!==5&&Rt!==26&&Rt!==27||ut===null||st===null||(Rt=zn(J,st),Rt!=null&&Ce.push(Zo(J,Rt,ut))),Sn)break;J=J.return}0<Ce.length&&(gt=new Mt(gt,pe,null,a,bt),Ut.push({event:gt,listeners:Ce}))}}if((n&7)===0){t:{if(gt=t==="mouseover"||t==="pointerover",Mt=t==="mouseout"||t==="pointerout",gt&&a!==mt&&(pe=a.relatedTarget||a.fromElement)&&(ft(pe)||pe[li]))break t;if((Mt||gt)&&(gt=bt.window===bt?bt:(gt=bt.ownerDocument)?gt.defaultView||gt.parentWindow:window,Mt?(pe=a.relatedTarget||a.toElement,Mt=ht,pe=pe?ft(pe):null,pe!==null&&(Sn=c(pe),Ce=pe.tag,pe!==Sn||Ce!==5&&Ce!==27&&Ce!==6)&&(pe=null)):(Mt=null,pe=ht),Mt!==pe)){if(Ce=pp,Rt="onMouseLeave",st="onMouseEnter",J="mouse",(t==="pointerout"||t==="pointerover")&&(Ce=gp,Rt="onPointerLeave",st="onPointerEnter",J="pointer"),Sn=Mt==null?gt:Vt(Mt),ut=pe==null?gt:Vt(pe),gt=new Ce(Rt,J+"leave",Mt,a,bt),gt.target=Sn,gt.relatedTarget=ut,Rt=null,ft(bt)===ht&&(Ce=new Ce(st,J+"enter",pe,a,bt),Ce.target=ut,Ce.relatedTarget=Sn,Rt=Ce),Sn=Rt,Mt&&pe)e:{for(Ce=gy,st=Mt,J=pe,ut=0,Rt=st;Rt;Rt=Ce(Rt))ut++;Rt=0;for(var be=J;be;be=Ce(be))Rt++;for(;0<ut-Rt;)st=Ce(st),ut--;for(;0<Rt-ut;)J=Ce(J),Rt--;for(;ut--;){if(st===J||J!==null&&st===J.alternate){Ce=st;break e}st=Ce(st),J=Ce(J)}Ce=null}else Ce=null;Mt!==null&&o0(Ut,gt,Mt,Ce,!1),pe!==null&&Sn!==null&&o0(Ut,Sn,pe,Ce,!0)}}t:{if(gt=ht?Vt(ht):window,Mt=gt.nodeName&&gt.nodeName.toLowerCase(),Mt==="select"||Mt==="input"&&gt.type==="file")var hn=bp;else if(Sp(gt))if(Tp)hn=Rx;else{hn=Tx;var ve=bx}else Mt=gt.nodeName,!Mt||Mt.toLowerCase()!=="input"||gt.type!=="checkbox"&&gt.type!=="radio"?ht&&In(ht.elementType)&&(hn=bp):hn=Ax;if(hn&&(hn=hn(t,ht))){Ep(Ut,hn,a,bt);break t}ve&&ve(t,gt,ht),t==="focusout"&&ht&&gt.type==="number"&&ht.memoizedProps.value!=null&&fe(gt,"number",gt.value)}switch(ve=ht?Vt(ht):window,t){case"focusin":(Sp(ve)||ve.contentEditable==="true")&&(fr=ve,Lu=ht,bo=null);break;case"focusout":bo=Lu=fr=null;break;case"mousedown":Nu=!0;break;case"contextmenu":case"mouseup":case"dragend":Nu=!1,Np(Ut,a,bt);break;case"selectionchange":if(wx)break;case"keydown":case"keyup":Np(Ut,a,bt)}var Ge;if(Cu)t:{switch(t){case"compositionstart":var en="onCompositionStart";break t;case"compositionend":en="onCompositionEnd";break t;case"compositionupdate":en="onCompositionUpdate";break t}en=void 0}else ur?yp(t,a)&&(en="onCompositionEnd"):t==="keydown"&&a.keyCode===229&&(en="onCompositionStart");en&&(vp&&a.locale!=="ko"&&(ur||en!=="onCompositionStart"?en==="onCompositionEnd"&&ur&&(Ge=vo()):(hi=bt,Wa="value"in hi?hi.value:hi.textContent,ur=!0)),ve=mc(ht,en),0<ve.length&&(en=new mp(en,t,null,a,bt),Ut.push({event:en,listeners:ve}),Ge?en.data=Ge:(Ge=Mp(a),Ge!==null&&(en.data=Ge)))),(Ge=xx?yx(t,a):Mx(t,a))&&(en=mc(ht,"onBeforeInput"),0<en.length&&(ve=new mp("onBeforeInput","beforeinput",null,a,bt),Ut.push({event:ve,listeners:en}),ve.data=Ge)),hy(Ut,t,ht,a,bt)}s0(Ut,n)})}function Zo(t,n,a){return{instance:t,listener:n,currentTarget:a}}function mc(t,n){for(var a=n+"Capture",o=[];t!==null;){var u=t,f=u.stateNode;if(u=u.tag,u!==5&&u!==26&&u!==27||f===null||(u=zn(t,a),u!=null&&o.unshift(Zo(t,u,f)),u=zn(t,n),u!=null&&o.push(Zo(t,u,f))),t.tag===3)return o;t=t.return}return[]}function gy(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function o0(t,n,a,o,u){for(var f=n._reactName,y=[];a!==null&&a!==o;){var R=a,q=R.alternate,ht=R.stateNode;if(R=R.tag,q!==null&&q===o)break;R!==5&&R!==26&&R!==27||ht===null||(q=ht,u?(ht=zn(a,f),ht!=null&&y.unshift(Zo(a,ht,q))):u||(ht=zn(a,f),ht!=null&&y.push(Zo(a,ht,q)))),a=a.return}y.length!==0&&t.push({event:n,listeners:y})}var vy=/\r\n?/g,_y=/\u0000|\uFFFD/g;function l0(t){return(typeof t=="string"?t:""+t).replace(vy,`
`).replace(_y,"")}function c0(t,n){return n=l0(n),l0(t)===n}function Mn(t,n,a,o,u,f){switch(a){case"children":typeof o=="string"?n==="body"||n==="textarea"&&o===""||De(t,o):(typeof o=="number"||typeof o=="bigint")&&n!=="body"&&De(t,""+o);break;case"className":L(t,"class",o);break;case"tabIndex":L(t,"tabindex",o);break;case"dir":case"role":case"viewBox":case"width":case"height":L(t,a,o);break;case"style":On(t,o,f);break;case"data":if(n!=="object"){L(t,"data",o);break}case"src":case"href":if(o===""&&(n!=="a"||a!=="href")){t.removeAttribute(a);break}if(o==null||typeof o=="function"||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=He(""+o),t.setAttribute(a,o);break;case"action":case"formAction":if(typeof o=="function"){t.setAttribute(a,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof f=="function"&&(a==="formAction"?(n!=="input"&&Mn(t,n,"name",u.name,u,null),Mn(t,n,"formEncType",u.formEncType,u,null),Mn(t,n,"formMethod",u.formMethod,u,null),Mn(t,n,"formTarget",u.formTarget,u,null)):(Mn(t,n,"encType",u.encType,u,null),Mn(t,n,"method",u.method,u,null),Mn(t,n,"target",u.target,u,null)));if(o==null||typeof o=="symbol"||typeof o=="boolean"){t.removeAttribute(a);break}o=He(""+o),t.setAttribute(a,o);break;case"onClick":o!=null&&(t.onclick=We);break;case"onScroll":o!=null&&$e("scroll",t);break;case"onScrollEnd":o!=null&&$e("scrollend",t);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"multiple":t.multiple=o&&typeof o!="function"&&typeof o!="symbol";break;case"muted":t.muted=o&&typeof o!="function"&&typeof o!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(o==null||typeof o=="function"||typeof o=="boolean"||typeof o=="symbol"){t.removeAttribute("xlink:href");break}a=He(""+o),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",a);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""+o):t.removeAttribute(a);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":o&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,""):t.removeAttribute(a);break;case"capture":case"download":o===!0?t.setAttribute(a,""):o!==!1&&o!=null&&typeof o!="function"&&typeof o!="symbol"?t.setAttribute(a,o):t.removeAttribute(a);break;case"cols":case"rows":case"size":case"span":o!=null&&typeof o!="function"&&typeof o!="symbol"&&!isNaN(o)&&1<=o?t.setAttribute(a,o):t.removeAttribute(a);break;case"rowSpan":case"start":o==null||typeof o=="function"||typeof o=="symbol"||isNaN(o)?t.removeAttribute(a):t.setAttribute(a,o);break;case"popover":$e("beforetoggle",t),$e("toggle",t),U(t,"popover",o);break;case"xlinkActuate":lt(t,"http://www.w3.org/1999/xlink","xlink:actuate",o);break;case"xlinkArcrole":lt(t,"http://www.w3.org/1999/xlink","xlink:arcrole",o);break;case"xlinkRole":lt(t,"http://www.w3.org/1999/xlink","xlink:role",o);break;case"xlinkShow":lt(t,"http://www.w3.org/1999/xlink","xlink:show",o);break;case"xlinkTitle":lt(t,"http://www.w3.org/1999/xlink","xlink:title",o);break;case"xlinkType":lt(t,"http://www.w3.org/1999/xlink","xlink:type",o);break;case"xmlBase":lt(t,"http://www.w3.org/XML/1998/namespace","xml:base",o);break;case"xmlLang":lt(t,"http://www.w3.org/XML/1998/namespace","xml:lang",o);break;case"xmlSpace":lt(t,"http://www.w3.org/XML/1998/namespace","xml:space",o);break;case"is":U(t,"is",o);break;case"innerText":case"textContent":break;default:(!(2<a.length)||a[0]!=="o"&&a[0]!=="O"||a[1]!=="n"&&a[1]!=="N")&&(a=ln.get(a)||a,U(t,a,o))}}function sh(t,n,a,o,u,f){switch(a){case"style":On(t,o,f);break;case"dangerouslySetInnerHTML":if(o!=null){if(typeof o!="object"||!("__html"in o))throw Error(s(61));if(a=o.__html,a!=null){if(u.children!=null)throw Error(s(60));t.innerHTML=a}}break;case"children":typeof o=="string"?De(t,o):(typeof o=="number"||typeof o=="bigint")&&De(t,""+o);break;case"onScroll":o!=null&&$e("scroll",t);break;case"onScrollEnd":o!=null&&$e("scrollend",t);break;case"onClick":o!=null&&(t.onclick=We);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!Re.hasOwnProperty(a))t:{if(a[0]==="o"&&a[1]==="n"&&(u=a.endsWith("Capture"),n=a.slice(2,u?a.length-7:void 0),f=t[mn]||null,f=f!=null?f[a]:null,typeof f=="function"&&t.removeEventListener(n,f,u),typeof o=="function")){typeof f!="function"&&f!==null&&(a in t?t[a]=null:t.hasAttribute(a)&&t.removeAttribute(a)),t.addEventListener(n,o,u);break t}a in t?t[a]=o:o===!0?t.setAttribute(a,""):U(t,a,o)}}}function oi(t,n,a){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":$e("error",t),$e("load",t);var o=!1,u=!1,f;for(f in a)if(a.hasOwnProperty(f)){var y=a[f];if(y!=null)switch(f){case"src":o=!0;break;case"srcSet":u=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Mn(t,n,f,y,a,null)}}u&&Mn(t,n,"srcSet",a.srcSet,a,null),o&&Mn(t,n,"src",a.src,a,null);return;case"input":$e("invalid",t);var R=f=y=u=null,q=null,ht=null;for(o in a)if(a.hasOwnProperty(o)){var bt=a[o];if(bt!=null)switch(o){case"name":u=bt;break;case"type":y=bt;break;case"checked":q=bt;break;case"defaultChecked":ht=bt;break;case"value":f=bt;break;case"defaultValue":R=bt;break;case"children":case"dangerouslySetInnerHTML":if(bt!=null)throw Error(s(137,n));break;default:Mn(t,n,o,bt,a,null)}}ge(t,f,R,q,ht,y,u,!1);return;case"select":$e("invalid",t),o=y=f=null;for(u in a)if(a.hasOwnProperty(u)&&(R=a[u],R!=null))switch(u){case"value":f=R;break;case"defaultValue":y=R;break;case"multiple":o=R;default:Mn(t,n,u,R,a,null)}n=f,a=y,t.multiple=!!o,n!=null?de(t,!!o,n,!1):a!=null&&de(t,!!o,a,!0);return;case"textarea":$e("invalid",t),f=u=o=null;for(y in a)if(a.hasOwnProperty(y)&&(R=a[y],R!=null))switch(y){case"value":o=R;break;case"defaultValue":u=R;break;case"children":f=R;break;case"dangerouslySetInnerHTML":if(R!=null)throw Error(s(91));break;default:Mn(t,n,y,R,a,null)}fn(t,o,u,f);return;case"option":for(q in a)a.hasOwnProperty(q)&&(o=a[q],o!=null)&&(q==="selected"?t.selected=o&&typeof o!="function"&&typeof o!="symbol":Mn(t,n,q,o,a,null));return;case"dialog":$e("beforetoggle",t),$e("toggle",t),$e("cancel",t),$e("close",t);break;case"iframe":case"object":$e("load",t);break;case"video":case"audio":for(o=0;o<Yo.length;o++)$e(Yo[o],t);break;case"image":$e("error",t),$e("load",t);break;case"details":$e("toggle",t);break;case"embed":case"source":case"link":$e("error",t),$e("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(ht in a)if(a.hasOwnProperty(ht)&&(o=a[ht],o!=null))switch(ht){case"children":case"dangerouslySetInnerHTML":throw Error(s(137,n));default:Mn(t,n,ht,o,a,null)}return;default:if(In(n)){for(bt in a)a.hasOwnProperty(bt)&&(o=a[bt],o!==void 0&&sh(t,n,bt,o,a,void 0));return}}for(R in a)a.hasOwnProperty(R)&&(o=a[R],o!=null&&Mn(t,n,R,o,a,null))}function xy(t,n,a,o){switch(n){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var u=null,f=null,y=null,R=null,q=null,ht=null,bt=null;for(Mt in a){var Ut=a[Mt];if(a.hasOwnProperty(Mt)&&Ut!=null)switch(Mt){case"checked":break;case"value":break;case"defaultValue":q=Ut;default:o.hasOwnProperty(Mt)||Mn(t,n,Mt,null,o,Ut)}}for(var gt in o){var Mt=o[gt];if(Ut=a[gt],o.hasOwnProperty(gt)&&(Mt!=null||Ut!=null))switch(gt){case"type":f=Mt;break;case"name":u=Mt;break;case"checked":ht=Mt;break;case"defaultChecked":bt=Mt;break;case"value":y=Mt;break;case"defaultValue":R=Mt;break;case"children":case"dangerouslySetInnerHTML":if(Mt!=null)throw Error(s(137,n));break;default:Mt!==Ut&&Mn(t,n,gt,Mt,o,Ut)}}Yt(t,y,R,q,ht,bt,f,u);return;case"select":Mt=y=R=gt=null;for(f in a)if(q=a[f],a.hasOwnProperty(f)&&q!=null)switch(f){case"value":break;case"multiple":Mt=q;default:o.hasOwnProperty(f)||Mn(t,n,f,null,o,q)}for(u in o)if(f=o[u],q=a[u],o.hasOwnProperty(u)&&(f!=null||q!=null))switch(u){case"value":gt=f;break;case"defaultValue":R=f;break;case"multiple":y=f;default:f!==q&&Mn(t,n,u,f,o,q)}n=R,a=y,o=Mt,gt!=null?de(t,!!a,gt,!1):!!o!=!!a&&(n!=null?de(t,!!a,n,!0):de(t,!!a,a?[]:"",!1));return;case"textarea":Mt=gt=null;for(R in a)if(u=a[R],a.hasOwnProperty(R)&&u!=null&&!o.hasOwnProperty(R))switch(R){case"value":break;case"children":break;default:Mn(t,n,R,null,o,u)}for(y in o)if(u=o[y],f=a[y],o.hasOwnProperty(y)&&(u!=null||f!=null))switch(y){case"value":gt=u;break;case"defaultValue":Mt=u;break;case"children":break;case"dangerouslySetInnerHTML":if(u!=null)throw Error(s(91));break;default:u!==f&&Mn(t,n,y,u,o,f)}Se(t,gt,Mt);return;case"option":for(var pe in a)gt=a[pe],a.hasOwnProperty(pe)&&gt!=null&&!o.hasOwnProperty(pe)&&(pe==="selected"?t.selected=!1:Mn(t,n,pe,null,o,gt));for(q in o)gt=o[q],Mt=a[q],o.hasOwnProperty(q)&&gt!==Mt&&(gt!=null||Mt!=null)&&(q==="selected"?t.selected=gt&&typeof gt!="function"&&typeof gt!="symbol":Mn(t,n,q,gt,o,Mt));return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var Ce in a)gt=a[Ce],a.hasOwnProperty(Ce)&&gt!=null&&!o.hasOwnProperty(Ce)&&Mn(t,n,Ce,null,o,gt);for(ht in o)if(gt=o[ht],Mt=a[ht],o.hasOwnProperty(ht)&&gt!==Mt&&(gt!=null||Mt!=null))switch(ht){case"children":case"dangerouslySetInnerHTML":if(gt!=null)throw Error(s(137,n));break;default:Mn(t,n,ht,gt,o,Mt)}return;default:if(In(n)){for(var Sn in a)gt=a[Sn],a.hasOwnProperty(Sn)&&gt!==void 0&&!o.hasOwnProperty(Sn)&&sh(t,n,Sn,void 0,o,gt);for(bt in o)gt=o[bt],Mt=a[bt],!o.hasOwnProperty(bt)||gt===Mt||gt===void 0&&Mt===void 0||sh(t,n,bt,gt,o,Mt);return}}for(var st in a)gt=a[st],a.hasOwnProperty(st)&&gt!=null&&!o.hasOwnProperty(st)&&Mn(t,n,st,null,o,gt);for(Ut in o)gt=o[Ut],Mt=a[Ut],!o.hasOwnProperty(Ut)||gt===Mt||gt==null&&Mt==null||Mn(t,n,Ut,gt,o,Mt)}function u0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function yy(){if(typeof performance.getEntriesByType=="function"){for(var t=0,n=0,a=performance.getEntriesByType("resource"),o=0;o<a.length;o++){var u=a[o],f=u.transferSize,y=u.initiatorType,R=u.duration;if(f&&R&&u0(y)){for(y=0,R=u.responseEnd,o+=1;o<a.length;o++){var q=a[o],ht=q.startTime;if(ht>R)break;var bt=q.transferSize,Ut=q.initiatorType;bt&&u0(Ut)&&(q=q.responseEnd,y+=bt*(q<R?1:(R-ht)/(q-ht)))}if(--o,n+=8*(f+y)/(u.duration/1e3),t++,10<t)break}}if(0<t)return n/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var rh=null,oh=null;function gc(t){return t.nodeType===9?t:t.ownerDocument}function f0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function h0(t,n){if(t===0)switch(n){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&n==="foreignObject"?0:t}function lh(t,n){return t==="textarea"||t==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.children=="bigint"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var ch=null;function My(){var t=window.event;return t&&t.type==="popstate"?t===ch?!1:(ch=t,!0):(ch=null,!1)}var d0=typeof setTimeout=="function"?setTimeout:void 0,Sy=typeof clearTimeout=="function"?clearTimeout:void 0,p0=typeof Promise=="function"?Promise:void 0,Ey=typeof queueMicrotask=="function"?queueMicrotask:typeof p0<"u"?function(t){return p0.resolve(null).then(t).catch(by)}:d0;function by(t){setTimeout(function(){throw t})}function us(t){return t==="head"}function m0(t,n){var a=n,o=0;do{var u=a.nextSibling;if(t.removeChild(a),u&&u.nodeType===8)if(a=u.data,a==="/$"||a==="/&"){if(o===0){t.removeChild(u),Ir(n);return}o--}else if(a==="$"||a==="$?"||a==="$~"||a==="$!"||a==="&")o++;else if(a==="html")Ko(t.ownerDocument.documentElement);else if(a==="head"){a=t.ownerDocument.head,Ko(a);for(var f=a.firstChild;f;){var y=f.nextSibling,R=f.nodeName;f[et]||R==="SCRIPT"||R==="STYLE"||R==="LINK"&&f.rel.toLowerCase()==="stylesheet"||a.removeChild(f),f=y}}else a==="body"&&Ko(t.ownerDocument.body);a=u}while(a);Ir(n)}function g0(t,n){var a=t;t=0;do{var o=a.nextSibling;if(a.nodeType===1?n?(a._stashedDisplay=a.style.display,a.style.display="none"):(a.style.display=a._stashedDisplay||"",a.getAttribute("style")===""&&a.removeAttribute("style")):a.nodeType===3&&(n?(a._stashedText=a.nodeValue,a.nodeValue=""):a.nodeValue=a._stashedText||""),o&&o.nodeType===8)if(a=o.data,a==="/$"){if(t===0)break;t--}else a!=="$"&&a!=="$?"&&a!=="$~"&&a!=="$!"||t++;a=o}while(a)}function uh(t){var n=t.firstChild;for(n&&n.nodeType===10&&(n=n.nextSibling);n;){var a=n;switch(n=n.nextSibling,a.nodeName){case"HTML":case"HEAD":case"BODY":uh(a),dt(a);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(a.rel.toLowerCase()==="stylesheet")continue}t.removeChild(a)}}function Ty(t,n,a,o){for(;t.nodeType===1;){var u=a;if(t.nodeName.toLowerCase()!==n.toLowerCase()){if(!o&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(o){if(!t[et])switch(n){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(f=t.getAttribute("rel"),f==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(f!==u.rel||t.getAttribute("href")!==(u.href==null||u.href===""?null:u.href)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin)||t.getAttribute("title")!==(u.title==null?null:u.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(f=t.getAttribute("src"),(f!==(u.src==null?null:u.src)||t.getAttribute("type")!==(u.type==null?null:u.type)||t.getAttribute("crossorigin")!==(u.crossOrigin==null?null:u.crossOrigin))&&f&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(n==="input"&&t.type==="hidden"){var f=u.name==null?null:""+u.name;if(u.type==="hidden"&&t.getAttribute("name")===f)return t}else return t;if(t=ji(t.nextSibling),t===null)break}return null}function Ay(t,n,a){if(n==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!a||(t=ji(t.nextSibling),t===null))return null;return t}function v0(t,n){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=ji(t.nextSibling),t===null))return null;return t}function fh(t){return t.data==="$?"||t.data==="$~"}function hh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function Ry(t,n){var a=t.ownerDocument;if(t.data==="$~")t._reactRetry=n;else if(t.data!=="$?"||a.readyState!=="loading")n();else{var o=function(){n(),a.removeEventListener("DOMContentLoaded",o)};a.addEventListener("DOMContentLoaded",o),t._reactRetry=o}}function ji(t){for(;t!=null;t=t.nextSibling){var n=t.nodeType;if(n===1||n===3)break;if(n===8){if(n=t.data,n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"||n==="F!"||n==="F")break;if(n==="/$"||n==="/&")return null}}return t}var dh=null;function _0(t){t=t.nextSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="/$"||a==="/&"){if(n===0)return ji(t.nextSibling);n--}else a!=="$"&&a!=="$!"&&a!=="$?"&&a!=="$~"&&a!=="&"||n++}t=t.nextSibling}return null}function x0(t){t=t.previousSibling;for(var n=0;t;){if(t.nodeType===8){var a=t.data;if(a==="$"||a==="$!"||a==="$?"||a==="$~"||a==="&"){if(n===0)return t;n--}else a!=="/$"&&a!=="/&"||n++}t=t.previousSibling}return null}function y0(t,n,a){switch(n=gc(a),t){case"html":if(t=n.documentElement,!t)throw Error(s(452));return t;case"head":if(t=n.head,!t)throw Error(s(453));return t;case"body":if(t=n.body,!t)throw Error(s(454));return t;default:throw Error(s(451))}}function Ko(t){for(var n=t.attributes;n.length;)t.removeAttributeNode(n[0]);dt(t)}var Yi=new Map,M0=new Set;function vc(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Na=X.d;X.d={f:Cy,r:wy,D:Dy,C:Uy,L:Ly,m:Ny,X:zy,S:Oy,M:Py};function Cy(){var t=Na.f(),n=lc();return t||n}function wy(t){var n=it(t);n!==null&&n.tag===5&&n.type==="form"?Im(n):Na.r(t)}var zr=typeof document>"u"?null:document;function S0(t,n,a){var o=zr;if(o&&typeof n=="string"&&n){var u=Nt(n);u='link[rel="'+t+'"][href="'+u+'"]',typeof a=="string"&&(u+='[crossorigin="'+a+'"]'),M0.has(u)||(M0.add(u),t={rel:t,crossOrigin:a,href:n},o.querySelector(u)===null&&(n=o.createElement("link"),oi(n,"link",t),te(n),o.head.appendChild(n)))}}function Dy(t){Na.D(t),S0("dns-prefetch",t,null)}function Uy(t,n){Na.C(t,n),S0("preconnect",t,n)}function Ly(t,n,a){Na.L(t,n,a);var o=zr;if(o&&t&&n){var u='link[rel="preload"][as="'+Nt(n)+'"]';n==="image"&&a&&a.imageSrcSet?(u+='[imagesrcset="'+Nt(a.imageSrcSet)+'"]',typeof a.imageSizes=="string"&&(u+='[imagesizes="'+Nt(a.imageSizes)+'"]')):u+='[href="'+Nt(t)+'"]';var f=u;switch(n){case"style":f=Pr(t);break;case"script":f=Br(t)}Yi.has(f)||(t=g({rel:"preload",href:n==="image"&&a&&a.imageSrcSet?void 0:t,as:n},a),Yi.set(f,t),o.querySelector(u)!==null||n==="style"&&o.querySelector(Qo(f))||n==="script"&&o.querySelector(Jo(f))||(n=o.createElement("link"),oi(n,"link",t),te(n),o.head.appendChild(n)))}}function Ny(t,n){Na.m(t,n);var a=zr;if(a&&t){var o=n&&typeof n.as=="string"?n.as:"script",u='link[rel="modulepreload"][as="'+Nt(o)+'"][href="'+Nt(t)+'"]',f=u;switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":f=Br(t)}if(!Yi.has(f)&&(t=g({rel:"modulepreload",href:t},n),Yi.set(f,t),a.querySelector(u)===null)){switch(o){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(a.querySelector(Jo(f)))return}o=a.createElement("link"),oi(o,"link",t),te(o),a.head.appendChild(o)}}}function Oy(t,n,a){Na.S(t,n,a);var o=zr;if(o&&t){var u=ee(o).hoistableStyles,f=Pr(t);n=n||"default";var y=u.get(f);if(!y){var R={loading:0,preload:null};if(y=o.querySelector(Qo(f)))R.loading=5;else{t=g({rel:"stylesheet",href:t,"data-precedence":n},a),(a=Yi.get(f))&&ph(t,a);var q=y=o.createElement("link");te(q),oi(q,"link",t),q._p=new Promise(function(ht,bt){q.onload=ht,q.onerror=bt}),q.addEventListener("load",function(){R.loading|=1}),q.addEventListener("error",function(){R.loading|=2}),R.loading|=4,_c(y,n,o)}y={type:"stylesheet",instance:y,count:1,state:R},u.set(f,y)}}}function zy(t,n){Na.X(t,n);var a=zr;if(a&&t){var o=ee(a).hoistableScripts,u=Br(t),f=o.get(u);f||(f=a.querySelector(Jo(u)),f||(t=g({src:t,async:!0},n),(n=Yi.get(u))&&mh(t,n),f=a.createElement("script"),te(f),oi(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function Py(t,n){Na.M(t,n);var a=zr;if(a&&t){var o=ee(a).hoistableScripts,u=Br(t),f=o.get(u);f||(f=a.querySelector(Jo(u)),f||(t=g({src:t,async:!0,type:"module"},n),(n=Yi.get(u))&&mh(t,n),f=a.createElement("script"),te(f),oi(f,"link",t),a.head.appendChild(f)),f={type:"script",instance:f,count:1,state:null},o.set(u,f))}}function E0(t,n,a,o){var u=(u=Ft.current)?vc(u):null;if(!u)throw Error(s(446));switch(t){case"meta":case"title":return null;case"style":return typeof a.precedence=="string"&&typeof a.href=="string"?(n=Pr(a.href),a=ee(u).hoistableStyles,o=a.get(n),o||(o={type:"style",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};case"link":if(a.rel==="stylesheet"&&typeof a.href=="string"&&typeof a.precedence=="string"){t=Pr(a.href);var f=ee(u).hoistableStyles,y=f.get(t);if(y||(u=u.ownerDocument||u,y={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},f.set(t,y),(f=u.querySelector(Qo(t)))&&!f._p&&(y.instance=f,y.state.loading=5),Yi.has(t)||(a={rel:"preload",as:"style",href:a.href,crossOrigin:a.crossOrigin,integrity:a.integrity,media:a.media,hrefLang:a.hrefLang,referrerPolicy:a.referrerPolicy},Yi.set(t,a),f||By(u,t,a,y.state))),n&&o===null)throw Error(s(528,""));return y}if(n&&o!==null)throw Error(s(529,""));return null;case"script":return n=a.async,a=a.src,typeof a=="string"&&n&&typeof n!="function"&&typeof n!="symbol"?(n=Br(a),a=ee(u).hoistableScripts,o=a.get(n),o||(o={type:"script",instance:null,count:0,state:null},a.set(n,o)),o):{type:"void",instance:null,count:0,state:null};default:throw Error(s(444,t))}}function Pr(t){return'href="'+Nt(t)+'"'}function Qo(t){return'link[rel="stylesheet"]['+t+"]"}function b0(t){return g({},t,{"data-precedence":t.precedence,precedence:null})}function By(t,n,a,o){t.querySelector('link[rel="preload"][as="style"]['+n+"]")?o.loading=1:(n=t.createElement("link"),o.preload=n,n.addEventListener("load",function(){return o.loading|=1}),n.addEventListener("error",function(){return o.loading|=2}),oi(n,"link",a),te(n),t.head.appendChild(n))}function Br(t){return'[src="'+Nt(t)+'"]'}function Jo(t){return"script[async]"+t}function T0(t,n,a){if(n.count++,n.instance===null)switch(n.type){case"style":var o=t.querySelector('style[data-href~="'+Nt(a.href)+'"]');if(o)return n.instance=o,te(o),o;var u=g({},a,{"data-href":a.href,"data-precedence":a.precedence,href:null,precedence:null});return o=(t.ownerDocument||t).createElement("style"),te(o),oi(o,"style",u),_c(o,a.precedence,t),n.instance=o;case"stylesheet":u=Pr(a.href);var f=t.querySelector(Qo(u));if(f)return n.state.loading|=4,n.instance=f,te(f),f;o=b0(a),(u=Yi.get(u))&&ph(o,u),f=(t.ownerDocument||t).createElement("link"),te(f);var y=f;return y._p=new Promise(function(R,q){y.onload=R,y.onerror=q}),oi(f,"link",o),n.state.loading|=4,_c(f,a.precedence,t),n.instance=f;case"script":return f=Br(a.src),(u=t.querySelector(Jo(f)))?(n.instance=u,te(u),u):(o=a,(u=Yi.get(f))&&(o=g({},a),mh(o,u)),t=t.ownerDocument||t,u=t.createElement("script"),te(u),oi(u,"link",o),t.head.appendChild(u),n.instance=u);case"void":return null;default:throw Error(s(443,n.type))}else n.type==="stylesheet"&&(n.state.loading&4)===0&&(o=n.instance,n.state.loading|=4,_c(o,a.precedence,t));return n.instance}function _c(t,n,a){for(var o=a.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),u=o.length?o[o.length-1]:null,f=u,y=0;y<o.length;y++){var R=o[y];if(R.dataset.precedence===n)f=R;else if(f!==u)break}f?f.parentNode.insertBefore(t,f.nextSibling):(n=a.nodeType===9?a.head:a,n.insertBefore(t,n.firstChild))}function ph(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.title==null&&(t.title=n.title)}function mh(t,n){t.crossOrigin==null&&(t.crossOrigin=n.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=n.referrerPolicy),t.integrity==null&&(t.integrity=n.integrity)}var xc=null;function A0(t,n,a){if(xc===null){var o=new Map,u=xc=new Map;u.set(a,o)}else u=xc,o=u.get(a),o||(o=new Map,u.set(a,o));if(o.has(t))return o;for(o.set(t,null),a=a.getElementsByTagName(t),u=0;u<a.length;u++){var f=a[u];if(!(f[et]||f[rn]||t==="link"&&f.getAttribute("rel")==="stylesheet")&&f.namespaceURI!=="http://www.w3.org/2000/svg"){var y=f.getAttribute(n)||"";y=t+y;var R=o.get(y);R?R.push(f):o.set(y,[f])}}return o}function R0(t,n,a){t=t.ownerDocument||t,t.head.insertBefore(a,n==="title"?t.querySelector("head > title"):null)}function Iy(t,n,a){if(a===1||n.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof n.precedence!="string"||typeof n.href!="string"||n.href==="")break;return!0;case"link":if(typeof n.rel!="string"||typeof n.href!="string"||n.href===""||n.onLoad||n.onError)break;return n.rel==="stylesheet"?(t=n.disabled,typeof n.precedence=="string"&&t==null):!0;case"script":if(n.async&&typeof n.async!="function"&&typeof n.async!="symbol"&&!n.onLoad&&!n.onError&&n.src&&typeof n.src=="string")return!0}return!1}function C0(t){return!(t.type==="stylesheet"&&(t.state.loading&3)===0)}function Fy(t,n,a,o){if(a.type==="stylesheet"&&(typeof o.media!="string"||matchMedia(o.media).matches!==!1)&&(a.state.loading&4)===0){if(a.instance===null){var u=Pr(o.href),f=n.querySelector(Qo(u));if(f){n=f._p,n!==null&&typeof n=="object"&&typeof n.then=="function"&&(t.count++,t=yc.bind(t),n.then(t,t)),a.state.loading|=4,a.instance=f,te(f);return}f=n.ownerDocument||n,o=b0(o),(u=Yi.get(u))&&ph(o,u),f=f.createElement("link"),te(f);var y=f;y._p=new Promise(function(R,q){y.onload=R,y.onerror=q}),oi(f,"link",o),a.instance=f}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(a,n),(n=a.state.preload)&&(a.state.loading&3)===0&&(t.count++,a=yc.bind(t),n.addEventListener("load",a),n.addEventListener("error",a))}}var gh=0;function Hy(t,n){return t.stylesheets&&t.count===0&&Sc(t,t.stylesheets),0<t.count||0<t.imgCount?function(a){var o=setTimeout(function(){if(t.stylesheets&&Sc(t,t.stylesheets),t.unsuspend){var f=t.unsuspend;t.unsuspend=null,f()}},6e4+n);0<t.imgBytes&&gh===0&&(gh=62500*yy());var u=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&Sc(t,t.stylesheets),t.unsuspend)){var f=t.unsuspend;t.unsuspend=null,f()}},(t.imgBytes>gh?50:800)+n);return t.unsuspend=a,function(){t.unsuspend=null,clearTimeout(o),clearTimeout(u)}}:null}function yc(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)Sc(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Mc=null;function Sc(t,n){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Mc=new Map,n.forEach(Gy,t),Mc=null,yc.call(t))}function Gy(t,n){if(!(n.state.loading&4)){var a=Mc.get(t);if(a)var o=a.get(null);else{a=new Map,Mc.set(t,a);for(var u=t.querySelectorAll("link[data-precedence],style[data-precedence]"),f=0;f<u.length;f++){var y=u[f];(y.nodeName==="LINK"||y.getAttribute("media")!=="not all")&&(a.set(y.dataset.precedence,y),o=y)}o&&a.set(null,o)}u=n.instance,y=u.getAttribute("data-precedence"),f=a.get(y)||o,f===o&&a.set(null,u),a.set(y,u),this.count++,o=yc.bind(this),u.addEventListener("load",o),u.addEventListener("error",o),f?f.parentNode.insertBefore(u,f.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(u,t.firstChild)),n.state.loading|=4}}var $o={$$typeof:F,Provider:null,Consumer:null,_currentValue:G,_currentValue2:G,_threadCount:0};function Vy(t,n,a,o,u,f,y,R,q){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=qe(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=qe(0),this.hiddenUpdates=qe(null),this.identifierPrefix=o,this.onUncaughtError=u,this.onCaughtError=f,this.onRecoverableError=y,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=q,this.incompleteTransitions=new Map}function w0(t,n,a,o,u,f,y,R,q,ht,bt,Ut){return t=new Vy(t,n,a,y,q,ht,bt,Ut,R),n=1,f===!0&&(n|=24),f=Ui(3,null,null,n),t.current=f,f.stateNode=t,n=Yu(),n.refCount++,t.pooledCache=n,n.refCount++,f.memoizedState={element:o,isDehydrated:a,cache:n},Ju(f),t}function D0(t){return t?(t=pr,t):pr}function U0(t,n,a,o,u,f){u=D0(u),o.context===null?o.context=u:o.pendingContext=u,o=$a(n),o.payload={element:a},f=f===void 0?null:f,f!==null&&(o.callback=f),a=ts(t,o,n),a!==null&&(Ei(a,t,n),Uo(a,t,n))}function L0(t,n){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var a=t.retryLane;t.retryLane=a!==0&&a<n?a:n}}function vh(t,n){L0(t,n),(t=t.alternate)&&L0(t,n)}function N0(t){if(t.tag===13||t.tag===31){var n=Us(t,67108864);n!==null&&Ei(n,t,67108864),vh(t,67108864)}}function O0(t){if(t.tag===13||t.tag===31){var n=Pi();n=Be(n);var a=Us(t,n);a!==null&&Ei(a,t,n),vh(t,n)}}var Ec=!0;function ky(t,n,a,o){var u=w.T;w.T=null;var f=X.p;try{X.p=2,_h(t,n,a,o)}finally{X.p=f,w.T=u}}function Xy(t,n,a,o){var u=w.T;w.T=null;var f=X.p;try{X.p=8,_h(t,n,a,o)}finally{X.p=f,w.T=u}}function _h(t,n,a,o){if(Ec){var u=xh(o);if(u===null)ah(t,n,o,bc,a),P0(t,o);else if(Wy(u,t,n,a,o))o.stopPropagation();else if(P0(t,o),n&4&&-1<qy.indexOf(t)){for(;u!==null;){var f=it(u);if(f!==null)switch(f.tag){case 3:if(f=f.stateNode,f.current.memoizedState.isDehydrated){var y=Jt(f.pendingLanes);if(y!==0){var R=f;for(R.pendingLanes|=2,R.entangledLanes|=2;y;){var q=1<<31-Te(y);R.entanglements[1]|=q,y&=~q}ha(f),(gn&6)===0&&(rc=xt()+500,jo(0))}}break;case 31:case 13:R=Us(f,2),R!==null&&Ei(R,f,2),lc(),vh(f,2)}if(f=xh(o),f===null&&ah(t,n,o,bc,a),f===u)break;u=f}u!==null&&o.stopPropagation()}else ah(t,n,o,null,a)}}function xh(t){return t=Zt(t),yh(t)}var bc=null;function yh(t){if(bc=null,t=ft(t),t!==null){var n=c(t);if(n===null)t=null;else{var a=n.tag;if(a===13){if(t=d(n),t!==null)return t;t=null}else if(a===31){if(t=h(n),t!==null)return t;t=null}else if(a===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;t=null}else n!==t&&(t=null)}}return bc=t,null}function z0(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(At()){case W:return 2;case ie:return 8;case Xt:case Ot:return 32;case qt:return 268435456;default:return 32}default:return 32}}var Mh=!1,fs=null,hs=null,ds=null,tl=new Map,el=new Map,ps=[],qy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function P0(t,n){switch(t){case"focusin":case"focusout":fs=null;break;case"dragenter":case"dragleave":hs=null;break;case"mouseover":case"mouseout":ds=null;break;case"pointerover":case"pointerout":tl.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":el.delete(n.pointerId)}}function nl(t,n,a,o,u,f){return t===null||t.nativeEvent!==f?(t={blockedOn:n,domEventName:a,eventSystemFlags:o,nativeEvent:f,targetContainers:[u]},n!==null&&(n=it(n),n!==null&&N0(n)),t):(t.eventSystemFlags|=o,n=t.targetContainers,u!==null&&n.indexOf(u)===-1&&n.push(u),t)}function Wy(t,n,a,o,u){switch(n){case"focusin":return fs=nl(fs,t,n,a,o,u),!0;case"dragenter":return hs=nl(hs,t,n,a,o,u),!0;case"mouseover":return ds=nl(ds,t,n,a,o,u),!0;case"pointerover":var f=u.pointerId;return tl.set(f,nl(tl.get(f)||null,t,n,a,o,u)),!0;case"gotpointercapture":return f=u.pointerId,el.set(f,nl(el.get(f)||null,t,n,a,o,u)),!0}return!1}function B0(t){var n=ft(t.target);if(n!==null){var a=c(n);if(a!==null){if(n=a.tag,n===13){if(n=d(a),n!==null){t.blockedOn=n,Ie(t.priority,function(){O0(a)});return}}else if(n===31){if(n=h(a),n!==null){t.blockedOn=n,Ie(t.priority,function(){O0(a)});return}}else if(n===3&&a.stateNode.current.memoizedState.isDehydrated){t.blockedOn=a.tag===3?a.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Tc(t){if(t.blockedOn!==null)return!1;for(var n=t.targetContainers;0<n.length;){var a=xh(t.nativeEvent);if(a===null){a=t.nativeEvent;var o=new a.constructor(a.type,a);mt=o,a.target.dispatchEvent(o),mt=null}else return n=it(a),n!==null&&N0(n),t.blockedOn=a,!1;n.shift()}return!0}function I0(t,n,a){Tc(t)&&a.delete(n)}function jy(){Mh=!1,fs!==null&&Tc(fs)&&(fs=null),hs!==null&&Tc(hs)&&(hs=null),ds!==null&&Tc(ds)&&(ds=null),tl.forEach(I0),el.forEach(I0)}function Ac(t,n){t.blockedOn===n&&(t.blockedOn=null,Mh||(Mh=!0,r.unstable_scheduleCallback(r.unstable_NormalPriority,jy)))}var Rc=null;function F0(t){Rc!==t&&(Rc=t,r.unstable_scheduleCallback(r.unstable_NormalPriority,function(){Rc===t&&(Rc=null);for(var n=0;n<t.length;n+=3){var a=t[n],o=t[n+1],u=t[n+2];if(typeof o!="function"){if(yh(o||a)===null)continue;break}var f=it(a);f!==null&&(t.splice(n,3),n-=3,xf(f,{pending:!0,data:u,method:a.method,action:o},o,u))}}))}function Ir(t){function n(q){return Ac(q,t)}fs!==null&&Ac(fs,t),hs!==null&&Ac(hs,t),ds!==null&&Ac(ds,t),tl.forEach(n),el.forEach(n);for(var a=0;a<ps.length;a++){var o=ps[a];o.blockedOn===t&&(o.blockedOn=null)}for(;0<ps.length&&(a=ps[0],a.blockedOn===null);)B0(a),a.blockedOn===null&&ps.shift();if(a=(t.ownerDocument||t).$$reactFormReplay,a!=null)for(o=0;o<a.length;o+=3){var u=a[o],f=a[o+1],y=u[mn]||null;if(typeof f=="function")y||F0(a);else if(y){var R=null;if(f&&f.hasAttribute("formAction")){if(u=f,y=f[mn]||null)R=y.formAction;else if(yh(u)!==null)continue}else R=y.action;typeof R=="function"?a[o+1]=R:(a.splice(o,3),o-=3),F0(a)}}}function H0(){function t(f){f.canIntercept&&f.info==="react-transition"&&f.intercept({handler:function(){return new Promise(function(y){return u=y})},focusReset:"manual",scroll:"manual"})}function n(){u!==null&&(u(),u=null),o||setTimeout(a,20)}function a(){if(!o&&!navigation.transition){var f=navigation.currentEntry;f&&f.url!=null&&navigation.navigate(f.url,{state:f.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var o=!1,u=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",n),navigation.addEventListener("navigateerror",n),setTimeout(a,100),function(){o=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",n),navigation.removeEventListener("navigateerror",n),u!==null&&(u(),u=null)}}}function Sh(t){this._internalRoot=t}Cc.prototype.render=Sh.prototype.render=function(t){var n=this._internalRoot;if(n===null)throw Error(s(409));var a=n.current,o=Pi();U0(a,o,t,n,null,null)},Cc.prototype.unmount=Sh.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var n=t.containerInfo;U0(t.current,2,null,t,null,null),lc(),n[li]=null}};function Cc(t){this._internalRoot=t}Cc.prototype.unstable_scheduleHydration=function(t){if(t){var n=vn();t={blockedOn:null,target:t,priority:n};for(var a=0;a<ps.length&&n!==0&&n<ps[a].priority;a++);ps.splice(a,0,t),a===0&&B0(t)}};var G0=e.version;if(G0!=="19.2.8")throw Error(s(527,G0,"19.2.8"));X.findDOMNode=function(t){var n=t._reactInternals;if(n===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=m(n),t=t!==null?_(t):null,t=t===null?null:t.stateNode,t};var Yy={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:w,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var wc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!wc.isDisabled&&wc.supportsFiber)try{se=wc.inject(Yy),re=wc}catch{}}return al.createRoot=function(t,n){if(!l(t))throw Error(s(299));var a=!1,o="",u=Ym,f=Zm,y=Km;return n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(o=n.identifierPrefix),n.onUncaughtError!==void 0&&(u=n.onUncaughtError),n.onCaughtError!==void 0&&(f=n.onCaughtError),n.onRecoverableError!==void 0&&(y=n.onRecoverableError)),n=w0(t,1,!1,null,null,a,o,null,u,f,y,H0),t[li]=n.current,ih(t),new Sh(n)},al.hydrateRoot=function(t,n,a){if(!l(t))throw Error(s(299));var o=!1,u="",f=Ym,y=Zm,R=Km,q=null;return a!=null&&(a.unstable_strictMode===!0&&(o=!0),a.identifierPrefix!==void 0&&(u=a.identifierPrefix),a.onUncaughtError!==void 0&&(f=a.onUncaughtError),a.onCaughtError!==void 0&&(y=a.onCaughtError),a.onRecoverableError!==void 0&&(R=a.onRecoverableError),a.formState!==void 0&&(q=a.formState)),n=w0(t,1,!0,n,a??null,o,u,q,f,y,R,H0),n.context=D0(null),a=n.current,o=Pi(),o=Be(o),u=$a(o),u.callback=null,ts(a,u,o),a=o,n.current.lanes=a,Nn(n,a),ha(n),t[li]=n.current,ih(t),new Cc(n)},al.version="19.2.8",al}var Q0;function aM(){if(Q0)return Th.exports;Q0=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(e){console.error(e)}}return r(),Th.exports=iM(),Th.exports}var sM=aM();const tp="170",rM=0,J0=1,oM=2,l_=1,lM=2,Fa=3,As=0,Ai=1,Ga=2,Es=0,ir=1,eo=2,$0=3,tv=4,cM=5,Js=100,uM=101,fM=102,hM=103,dM=104,pM=200,mM=201,gM=202,vM=203,rd=204,od=205,_M=206,xM=207,yM=208,MM=209,SM=210,EM=211,bM=212,TM=213,AM=214,ld=0,cd=1,ud=2,ro=3,fd=4,hd=5,dd=6,pd=7,c_=0,RM=1,CM=2,bs=0,wM=1,DM=2,UM=3,LM=4,NM=5,OM=6,zM=7,u_=300,oo=301,lo=302,md=303,gd=304,xu=306,vd=1e3,tr=1001,_d=1002,Fi=1003,PM=1004,Dc=1005,ma=1006,wh=1007,er=1008,Xa=1009,f_=1010,h_=1011,_l=1012,ep=1013,sr=1014,ga=1015,Ml=1016,np=1017,ip=1018,co=1020,d_=35902,p_=1021,m_=1022,oa=1023,g_=1024,v_=1025,ao=1026,uo=1027,ap=1028,sp=1029,__=1030,rp=1031,op=1033,ru=33776,ou=33777,lu=33778,cu=33779,xd=35840,yd=35841,Md=35842,Sd=35843,Ed=36196,bd=37492,Td=37496,Ad=37808,Rd=37809,Cd=37810,wd=37811,Dd=37812,Ud=37813,Ld=37814,Nd=37815,Od=37816,zd=37817,Pd=37818,Bd=37819,Id=37820,Fd=37821,uu=36492,Hd=36494,Gd=36495,x_=36283,Vd=36284,kd=36285,Xd=36286,BM=3200,IM=3201,FM=0,HM=1,Ss="",Ki="srgb",ho="srgb-linear",yu="linear",En="srgb",Fr=7680,ev=519,GM=512,VM=513,kM=514,y_=515,XM=516,qM=517,WM=518,jM=519,nv=35044,iv="300 es",Va=2e3,pu=2001;class po{addEventListener(e,i){this._listeners===void 0&&(this._listeners={});const s=this._listeners;s[e]===void 0&&(s[e]=[]),s[e].indexOf(i)===-1&&s[e].push(i)}hasEventListener(e,i){if(this._listeners===void 0)return!1;const s=this._listeners;return s[e]!==void 0&&s[e].indexOf(i)!==-1}removeEventListener(e,i){if(this._listeners===void 0)return;const l=this._listeners[e];if(l!==void 0){const c=l.indexOf(i);c!==-1&&l.splice(c,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const s=this._listeners[e.type];if(s!==void 0){e.target=this;const l=s.slice(0);for(let c=0,d=l.length;c<d;c++)l[c].call(this,e);e.target=null}}}const ui=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],fu=Math.PI/180,qd=180/Math.PI;function Sl(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0,s=Math.random()*4294967295|0;return(ui[r&255]+ui[r>>8&255]+ui[r>>16&255]+ui[r>>24&255]+"-"+ui[e&255]+ui[e>>8&255]+"-"+ui[e>>16&15|64]+ui[e>>24&255]+"-"+ui[i&63|128]+ui[i>>8&255]+"-"+ui[i>>16&255]+ui[i>>24&255]+ui[s&255]+ui[s>>8&255]+ui[s>>16&255]+ui[s>>24&255]).toLowerCase()}function Ti(r,e,i){return Math.max(e,Math.min(i,r))}function YM(r,e){return(r%e+e)%e}function Dh(r,e,i){return(1-i)*r+i*e}function sl(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function bi(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class An{constructor(e=0,i=0){An.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const i=this.x,s=this.y,l=e.elements;return this.x=l[0]*i+l[3]*s+l[6],this.y=l[1]*i+l[4]*s+l[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(i,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ti(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y;return i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){const s=Math.cos(i),l=Math.sin(i),c=this.x-e.x,d=this.y-e.y;return this.x=c*s-d*l+e.x,this.y=c*l+d*s+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,i,s,l,c,d,h,p,m){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,d,h,p,m)}set(e,i,s,l,c,d,h,p,m){const _=this.elements;return _[0]=e,_[1]=l,_[2]=h,_[3]=i,_[4]=c,_[5]=p,_[6]=s,_[7]=d,_[8]=m,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],this}extractBasis(e,i,s){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),s.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,d=s[0],h=s[3],p=s[6],m=s[1],_=s[4],g=s[7],x=s[2],S=s[5],E=s[8],T=l[0],M=l[3],v=l[6],I=l[1],F=l[4],z=l[7],Q=l[2],H=l[5],D=l[8];return c[0]=d*T+h*I+p*Q,c[3]=d*M+h*F+p*H,c[6]=d*v+h*z+p*D,c[1]=m*T+_*I+g*Q,c[4]=m*M+_*F+g*H,c[7]=m*v+_*z+g*D,c[2]=x*T+S*I+E*Q,c[5]=x*M+S*F+E*H,c[8]=x*v+S*z+E*D,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8];return i*d*_-i*h*m-s*c*_+s*h*p+l*c*m-l*d*p}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8],g=_*d-h*m,x=h*p-_*c,S=m*c-d*p,E=i*g+s*x+l*S;if(E===0)return this.set(0,0,0,0,0,0,0,0,0);const T=1/E;return e[0]=g*T,e[1]=(l*m-_*s)*T,e[2]=(h*s-l*d)*T,e[3]=x*T,e[4]=(_*i-l*p)*T,e[5]=(l*c-h*i)*T,e[6]=S*T,e[7]=(s*p-m*i)*T,e[8]=(d*i-s*c)*T,this}transpose(){let e;const i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,s,l,c,d,h){const p=Math.cos(c),m=Math.sin(c);return this.set(s*p,s*m,-s*(p*d+m*h)+d+e,-l*m,l*p,-l*(-m*d+p*h)+h+i,0,0,1),this}scale(e,i){return this.premultiply(Uh.makeScale(e,i)),this}rotate(e){return this.premultiply(Uh.makeRotation(-e)),this}translate(e,i){return this.premultiply(Uh.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,s,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<9;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<9;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Uh=new Ve;function M_(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function mu(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function ZM(){const r=mu("canvas");return r.style.display="block",r}const av={};function ml(r){r in av||(av[r]=!0,console.warn(r))}function KM(r,e,i){return new Promise(function(s,l){function c(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:l();break;case r.TIMEOUT_EXPIRED:setTimeout(c,i);break;default:s()}}setTimeout(c,i)})}function QM(r){const e=r.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function JM(r){const e=r.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const un={enabled:!0,workingColorSpace:ho,spaces:{},convert:function(r,e,i){return this.enabled===!1||e===i||!e||!i||(this.spaces[e].transfer===En&&(r.r=ka(r.r),r.g=ka(r.g),r.b=ka(r.b)),this.spaces[e].primaries!==this.spaces[i].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[i].fromXYZ)),this.spaces[i].transfer===En&&(r.r=so(r.r),r.g=so(r.g),r.b=so(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ss?yu:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,i){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[i].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};function ka(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function so(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}const sv=[.64,.33,.3,.6,.15,.06],rv=[.2126,.7152,.0722],ov=[.3127,.329],lv=new Ve().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),cv=new Ve().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);un.define({[ho]:{primaries:sv,whitePoint:ov,transfer:yu,toXYZ:lv,fromXYZ:cv,luminanceCoefficients:rv,workingColorSpaceConfig:{unpackColorSpace:Ki},outputColorSpaceConfig:{drawingBufferColorSpace:Ki}},[Ki]:{primaries:sv,whitePoint:ov,transfer:En,toXYZ:lv,fromXYZ:cv,luminanceCoefficients:rv,outputColorSpaceConfig:{drawingBufferColorSpace:Ki}}});let Hr;class $M{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Hr===void 0&&(Hr=mu("canvas")),Hr.width=e.width,Hr.height=e.height;const s=Hr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Hr}return i.width>2048||i.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),i.toDataURL("image/jpeg",.6)):i.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const i=mu("canvas");i.width=e.width,i.height=e.height;const s=i.getContext("2d");s.drawImage(e,0,0,e.width,e.height);const l=s.getImageData(0,0,e.width,e.height),c=l.data;for(let d=0;d<c.length;d++)c[d]=ka(c[d]/255)*255;return s.putImageData(l,0,0),i}else if(e.data){const i=e.data.slice(0);for(let s=0;s<i.length;s++)i instanceof Uint8Array||i instanceof Uint8ClampedArray?i[s]=Math.floor(ka(i[s]/255)*255):i[s]=ka(i[s]);return{data:i,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let tS=0;class S_{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:tS++}),this.uuid=Sl(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const s={uuid:this.uuid,url:""},l=this.data;if(l!==null){let c;if(Array.isArray(l)){c=[];for(let d=0,h=l.length;d<h;d++)l[d].isDataTexture?c.push(Lh(l[d].image)):c.push(Lh(l[d]))}else c=Lh(l);s.url=c}return i||(e.images[this.uuid]=s),s}}function Lh(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$M.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let eS=0;class gi extends po{constructor(e=gi.DEFAULT_IMAGE,i=gi.DEFAULT_MAPPING,s=tr,l=tr,c=ma,d=er,h=oa,p=Xa,m=gi.DEFAULT_ANISOTROPY,_=Ss){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:eS++}),this.uuid=Sl(),this.name="",this.source=new S_(e),this.mipmaps=[],this.mapping=i,this.channel=0,this.wrapS=s,this.wrapT=l,this.magFilter=c,this.minFilter=d,this.anisotropy=m,this.format=h,this.internalFormat=null,this.type=p,this.offset=new An(0,0),this.repeat=new An(1,1),this.center=new An(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=_,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const i=e===void 0||typeof e=="string";if(!i&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const s={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(s.userData=this.userData),i||(e.textures[this.uuid]=s),s}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==u_)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case vd:e.x=e.x-Math.floor(e.x);break;case tr:e.x=e.x<0?0:1;break;case _d:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case vd:e.y=e.y-Math.floor(e.y);break;case tr:e.y=e.y<0?0:1;break;case _d:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}gi.DEFAULT_IMAGE=null;gi.DEFAULT_MAPPING=u_;gi.DEFAULT_ANISOTROPY=1;class Xn{constructor(e=0,i=0,s=0,l=1){Xn.prototype.isVector4=!0,this.x=e,this.y=i,this.z=s,this.w=l}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,i,s,l){return this.x=e,this.y=i,this.z=s,this.w=l,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;case 3:this.w=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this.w=e.w+i.w,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this.w+=e.w*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this.w=e.w-i.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=this.w,d=e.elements;return this.x=d[0]*i+d[4]*s+d[8]*l+d[12]*c,this.y=d[1]*i+d[5]*s+d[9]*l+d[13]*c,this.z=d[2]*i+d[6]*s+d[10]*l+d[14]*c,this.w=d[3]*i+d[7]*s+d[11]*l+d[15]*c,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const i=Math.sqrt(1-e.w*e.w);return i<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/i,this.y=e.y/i,this.z=e.z/i),this}setAxisAngleFromRotationMatrix(e){let i,s,l,c;const p=e.elements,m=p[0],_=p[4],g=p[8],x=p[1],S=p[5],E=p[9],T=p[2],M=p[6],v=p[10];if(Math.abs(_-x)<.01&&Math.abs(g-T)<.01&&Math.abs(E-M)<.01){if(Math.abs(_+x)<.1&&Math.abs(g+T)<.1&&Math.abs(E+M)<.1&&Math.abs(m+S+v-3)<.1)return this.set(1,0,0,0),this;i=Math.PI;const F=(m+1)/2,z=(S+1)/2,Q=(v+1)/2,H=(_+x)/4,D=(g+T)/4,j=(E+M)/4;return F>z&&F>Q?F<.01?(s=0,l=.707106781,c=.707106781):(s=Math.sqrt(F),l=H/s,c=D/s):z>Q?z<.01?(s=.707106781,l=0,c=.707106781):(l=Math.sqrt(z),s=H/l,c=j/l):Q<.01?(s=.707106781,l=.707106781,c=0):(c=Math.sqrt(Q),s=D/c,l=j/c),this.set(s,l,c,i),this}let I=Math.sqrt((M-E)*(M-E)+(g-T)*(g-T)+(x-_)*(x-_));return Math.abs(I)<.001&&(I=1),this.x=(M-E)/I,this.y=(g-T)/I,this.z=(x-_)/I,this.w=Math.acos((m+S+v-1)/2),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this.w=i[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this.z=Math.max(e.z,Math.min(i.z,this.z)),this.w=Math.max(e.w,Math.min(i.w,this.w)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this.z=Math.max(e,Math.min(i,this.z)),this.w=Math.max(e,Math.min(i,this.w)),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(i,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this.w+=(e.w-this.w)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this.w=e.w+(i.w-e.w)*s,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this.w=e[i+3],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e[i+3]=this.w,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this.w=e.getW(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class nS extends po{constructor(e=1,i=1,s={}){super(),this.isRenderTarget=!0,this.width=e,this.height=i,this.depth=1,this.scissor=new Xn(0,0,e,i),this.scissorTest=!1,this.viewport=new Xn(0,0,e,i);const l={width:e,height:i,depth:1};s=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ma,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},s);const c=new gi(l,s.mapping,s.wrapS,s.wrapT,s.magFilter,s.minFilter,s.format,s.type,s.anisotropy,s.colorSpace);c.flipY=!1,c.generateMipmaps=s.generateMipmaps,c.internalFormat=s.internalFormat,this.textures=[];const d=s.count;for(let h=0;h<d;h++)this.textures[h]=c.clone(),this.textures[h].isRenderTargetTexture=!0;this.depthBuffer=s.depthBuffer,this.stencilBuffer=s.stencilBuffer,this.resolveDepthBuffer=s.resolveDepthBuffer,this.resolveStencilBuffer=s.resolveStencilBuffer,this.depthTexture=s.depthTexture,this.samples=s.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,i,s=1){if(this.width!==e||this.height!==i||this.depth!==s){this.width=e,this.height=i,this.depth=s;for(let l=0,c=this.textures.length;l<c;l++)this.textures[l].image.width=e,this.textures[l].image.height=i,this.textures[l].image.depth=s;this.dispose()}this.viewport.set(0,0,e,i),this.scissor.set(0,0,e,i)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let s=0,l=e.textures.length;s<l;s++)this.textures[s]=e.textures[s].clone(),this.textures[s].isRenderTargetTexture=!0;const i=Object.assign({},e.texture.image);return this.texture.source=new S_(i),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class rr extends nS{constructor(e=1,i=1,s={}){super(e,i,s),this.isWebGLRenderTarget=!0}}class E_ extends gi{constructor(e=null,i=1,s=1,l=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=tr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class iS extends gi{constructor(e=null,i=1,s=1,l=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:i,height:s,depth:l},this.magFilter=Fi,this.minFilter=Fi,this.wrapR=tr,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class El{constructor(e=0,i=0,s=0,l=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=s,this._w=l}static slerpFlat(e,i,s,l,c,d,h){let p=s[l+0],m=s[l+1],_=s[l+2],g=s[l+3];const x=c[d+0],S=c[d+1],E=c[d+2],T=c[d+3];if(h===0){e[i+0]=p,e[i+1]=m,e[i+2]=_,e[i+3]=g;return}if(h===1){e[i+0]=x,e[i+1]=S,e[i+2]=E,e[i+3]=T;return}if(g!==T||p!==x||m!==S||_!==E){let M=1-h;const v=p*x+m*S+_*E+g*T,I=v>=0?1:-1,F=1-v*v;if(F>Number.EPSILON){const Q=Math.sqrt(F),H=Math.atan2(Q,v*I);M=Math.sin(M*H)/Q,h=Math.sin(h*H)/Q}const z=h*I;if(p=p*M+x*z,m=m*M+S*z,_=_*M+E*z,g=g*M+T*z,M===1-h){const Q=1/Math.sqrt(p*p+m*m+_*_+g*g);p*=Q,m*=Q,_*=Q,g*=Q}}e[i]=p,e[i+1]=m,e[i+2]=_,e[i+3]=g}static multiplyQuaternionsFlat(e,i,s,l,c,d){const h=s[l],p=s[l+1],m=s[l+2],_=s[l+3],g=c[d],x=c[d+1],S=c[d+2],E=c[d+3];return e[i]=h*E+_*g+p*S-m*x,e[i+1]=p*E+_*x+m*g-h*S,e[i+2]=m*E+_*S+h*x-p*g,e[i+3]=_*E-h*g-p*x-m*S,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,s,l){return this._x=e,this._y=i,this._z=s,this._w=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){const s=e._x,l=e._y,c=e._z,d=e._order,h=Math.cos,p=Math.sin,m=h(s/2),_=h(l/2),g=h(c/2),x=p(s/2),S=p(l/2),E=p(c/2);switch(d){case"XYZ":this._x=x*_*g+m*S*E,this._y=m*S*g-x*_*E,this._z=m*_*E+x*S*g,this._w=m*_*g-x*S*E;break;case"YXZ":this._x=x*_*g+m*S*E,this._y=m*S*g-x*_*E,this._z=m*_*E-x*S*g,this._w=m*_*g+x*S*E;break;case"ZXY":this._x=x*_*g-m*S*E,this._y=m*S*g+x*_*E,this._z=m*_*E+x*S*g,this._w=m*_*g-x*S*E;break;case"ZYX":this._x=x*_*g-m*S*E,this._y=m*S*g+x*_*E,this._z=m*_*E-x*S*g,this._w=m*_*g+x*S*E;break;case"YZX":this._x=x*_*g+m*S*E,this._y=m*S*g+x*_*E,this._z=m*_*E-x*S*g,this._w=m*_*g-x*S*E;break;case"XZY":this._x=x*_*g-m*S*E,this._y=m*S*g-x*_*E,this._z=m*_*E+x*S*g,this._w=m*_*g+x*S*E;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+d)}return i===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,i){const s=i/2,l=Math.sin(s);return this._x=e.x*l,this._y=e.y*l,this._z=e.z*l,this._w=Math.cos(s),this._onChangeCallback(),this}setFromRotationMatrix(e){const i=e.elements,s=i[0],l=i[4],c=i[8],d=i[1],h=i[5],p=i[9],m=i[2],_=i[6],g=i[10],x=s+h+g;if(x>0){const S=.5/Math.sqrt(x+1);this._w=.25/S,this._x=(_-p)*S,this._y=(c-m)*S,this._z=(d-l)*S}else if(s>h&&s>g){const S=2*Math.sqrt(1+s-h-g);this._w=(_-p)/S,this._x=.25*S,this._y=(l+d)/S,this._z=(c+m)/S}else if(h>g){const S=2*Math.sqrt(1+h-s-g);this._w=(c-m)/S,this._x=(l+d)/S,this._y=.25*S,this._z=(p+_)/S}else{const S=2*Math.sqrt(1+g-s-h);this._w=(d-l)/S,this._x=(c+m)/S,this._y=(p+_)/S,this._z=.25*S}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let s=e.dot(i)+1;return s<Number.EPSILON?(s=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=s):(this._x=0,this._y=-e.z,this._z=e.y,this._w=s)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x,this._w=s),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ti(this.dot(e),-1,1)))}rotateTowards(e,i){const s=this.angleTo(e);if(s===0)return this;const l=Math.min(1,i/s);return this.slerp(e,l),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){const s=e._x,l=e._y,c=e._z,d=e._w,h=i._x,p=i._y,m=i._z,_=i._w;return this._x=s*_+d*h+l*m-c*p,this._y=l*_+d*p+c*h-s*m,this._z=c*_+d*m+s*p-l*h,this._w=d*_-s*h-l*p-c*m,this._onChangeCallback(),this}slerp(e,i){if(i===0)return this;if(i===1)return this.copy(e);const s=this._x,l=this._y,c=this._z,d=this._w;let h=d*e._w+s*e._x+l*e._y+c*e._z;if(h<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,h=-h):this.copy(e),h>=1)return this._w=d,this._x=s,this._y=l,this._z=c,this;const p=1-h*h;if(p<=Number.EPSILON){const S=1-i;return this._w=S*d+i*this._w,this._x=S*s+i*this._x,this._y=S*l+i*this._y,this._z=S*c+i*this._z,this.normalize(),this}const m=Math.sqrt(p),_=Math.atan2(m,h),g=Math.sin((1-i)*_)/m,x=Math.sin(i*_)/m;return this._w=d*g+this._w*x,this._x=s*g+this._x*x,this._y=l*g+this._y*x,this._z=c*g+this._z*x,this._onChangeCallback(),this}slerpQuaternions(e,i,s){return this.copy(e).slerp(i,s)}random(){const e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),s=Math.random(),l=Math.sqrt(1-s),c=Math.sqrt(s);return this.set(l*Math.sin(e),l*Math.cos(e),c*Math.sin(i),c*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class vt{constructor(e=0,i=0,s=0){vt.prototype.isVector3=!0,this.x=e,this.y=i,this.z=s}set(e,i,s){return s===void 0&&(s=this.z),this.x=e,this.y=i,this.z=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(uv.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(uv.setFromAxisAngle(e,i))}applyMatrix3(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[3]*s+c[6]*l,this.y=c[1]*i+c[4]*s+c[7]*l,this.z=c[2]*i+c[5]*s+c[8]*l,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const i=this.x,s=this.y,l=this.z,c=e.elements,d=1/(c[3]*i+c[7]*s+c[11]*l+c[15]);return this.x=(c[0]*i+c[4]*s+c[8]*l+c[12])*d,this.y=(c[1]*i+c[5]*s+c[9]*l+c[13])*d,this.z=(c[2]*i+c[6]*s+c[10]*l+c[14])*d,this}applyQuaternion(e){const i=this.x,s=this.y,l=this.z,c=e.x,d=e.y,h=e.z,p=e.w,m=2*(d*l-h*s),_=2*(h*i-c*l),g=2*(c*s-d*i);return this.x=i+p*m+d*g-h*_,this.y=s+p*_+h*m-c*g,this.z=l+p*g+c*_-d*m,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const i=this.x,s=this.y,l=this.z,c=e.elements;return this.x=c[0]*i+c[4]*s+c[8]*l,this.y=c[1]*i+c[5]*s+c[9]*l,this.z=c[2]*i+c[6]*s+c[10]*l,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this.z=Math.max(e.z,Math.min(i.z,this.z)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this.z=Math.max(e,Math.min(i,this.z)),this}clampLength(e,i){const s=this.length();return this.divideScalar(s||1).multiplyScalar(Math.max(e,Math.min(i,s)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,s){return this.x=e.x+(i.x-e.x)*s,this.y=e.y+(i.y-e.y)*s,this.z=e.z+(i.z-e.z)*s,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){const s=e.x,l=e.y,c=e.z,d=i.x,h=i.y,p=i.z;return this.x=l*p-c*h,this.y=c*d-s*p,this.z=s*h-l*d,this}projectOnVector(e){const i=e.lengthSq();if(i===0)return this.set(0,0,0);const s=e.dot(this)/i;return this.copy(e).multiplyScalar(s)}projectOnPlane(e){return Nh.copy(this).projectOnVector(e),this.sub(Nh)}reflect(e){return this.sub(Nh.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const i=Math.sqrt(this.lengthSq()*e.lengthSq());if(i===0)return Math.PI/2;const s=this.dot(e)/i;return Math.acos(Ti(s,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const i=this.x-e.x,s=this.y-e.y,l=this.z-e.z;return i*i+s*s+l*l}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,s){const l=Math.sin(i)*e;return this.x=l*Math.sin(s),this.y=Math.cos(i)*e,this.z=l*Math.cos(s),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,s){return this.x=e*Math.sin(i),this.y=s,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){const i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){const i=this.setFromMatrixColumn(e,0).length(),s=this.setFromMatrixColumn(e,1).length(),l=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=s,this.z=l,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,i*4)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,i*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,i=Math.random()*2-1,s=Math.sqrt(1-i*i);return this.x=s*Math.cos(e),this.y=i,this.z=s*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Nh=new vt,uv=new El;class lr{constructor(e=new vt(1/0,1/0,1/0),i=new vt(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=i}set(e,i){return this.min.copy(e),this.max.copy(i),this}setFromArray(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i+=3)this.expandByPoint(aa.fromArray(e,i));return this}setFromBufferAttribute(e){this.makeEmpty();for(let i=0,s=e.count;i<s;i++)this.expandByPoint(aa.fromBufferAttribute(e,i));return this}setFromPoints(e){this.makeEmpty();for(let i=0,s=e.length;i<s;i++)this.expandByPoint(e[i]);return this}setFromCenterAndSize(e,i){const s=aa.copy(i).multiplyScalar(.5);return this.min.copy(e).sub(s),this.max.copy(e).add(s),this}setFromObject(e,i=!1){return this.makeEmpty(),this.expandByObject(e,i)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,i=!1){e.updateWorldMatrix(!1,!1);const s=e.geometry;if(s!==void 0){const c=s.getAttribute("position");if(i===!0&&c!==void 0&&e.isInstancedMesh!==!0)for(let d=0,h=c.count;d<h;d++)e.isMesh===!0?e.getVertexPosition(d,aa):aa.fromBufferAttribute(c,d),aa.applyMatrix4(e.matrixWorld),this.expandByPoint(aa);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Uc.copy(e.boundingBox)):(s.boundingBox===null&&s.computeBoundingBox(),Uc.copy(s.boundingBox)),Uc.applyMatrix4(e.matrixWorld),this.union(Uc)}const l=e.children;for(let c=0,d=l.length;c<d;c++)this.expandByObject(l[c],i);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,i){return i.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,aa),aa.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let i,s;return e.normal.x>0?(i=e.normal.x*this.min.x,s=e.normal.x*this.max.x):(i=e.normal.x*this.max.x,s=e.normal.x*this.min.x),e.normal.y>0?(i+=e.normal.y*this.min.y,s+=e.normal.y*this.max.y):(i+=e.normal.y*this.max.y,s+=e.normal.y*this.min.y),e.normal.z>0?(i+=e.normal.z*this.min.z,s+=e.normal.z*this.max.z):(i+=e.normal.z*this.max.z,s+=e.normal.z*this.min.z),i<=-e.constant&&s>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(rl),Lc.subVectors(this.max,rl),Gr.subVectors(e.a,rl),Vr.subVectors(e.b,rl),kr.subVectors(e.c,rl),gs.subVectors(Vr,Gr),vs.subVectors(kr,Vr),Xs.subVectors(Gr,kr);let i=[0,-gs.z,gs.y,0,-vs.z,vs.y,0,-Xs.z,Xs.y,gs.z,0,-gs.x,vs.z,0,-vs.x,Xs.z,0,-Xs.x,-gs.y,gs.x,0,-vs.y,vs.x,0,-Xs.y,Xs.x,0];return!Oh(i,Gr,Vr,kr,Lc)||(i=[1,0,0,0,1,0,0,0,1],!Oh(i,Gr,Vr,kr,Lc))?!1:(Nc.crossVectors(gs,vs),i=[Nc.x,Nc.y,Nc.z],Oh(i,Gr,Vr,kr,Lc))}clampPoint(e,i){return i.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,aa).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(aa).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Oa[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Oa[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Oa[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Oa[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Oa[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Oa[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Oa[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Oa[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Oa),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Oa=[new vt,new vt,new vt,new vt,new vt,new vt,new vt,new vt],aa=new vt,Uc=new lr,Gr=new vt,Vr=new vt,kr=new vt,gs=new vt,vs=new vt,Xs=new vt,rl=new vt,Lc=new vt,Nc=new vt,qs=new vt;function Oh(r,e,i,s,l){for(let c=0,d=r.length-3;c<=d;c+=3){qs.fromArray(r,c);const h=l.x*Math.abs(qs.x)+l.y*Math.abs(qs.y)+l.z*Math.abs(qs.z),p=e.dot(qs),m=i.dot(qs),_=s.dot(qs);if(Math.max(-Math.max(p,m,_),Math.min(p,m,_))>h)return!1}return!0}const aS=new lr,ol=new vt,zh=new vt;class cr{constructor(e=new vt,i=-1){this.isSphere=!0,this.center=e,this.radius=i}set(e,i){return this.center.copy(e),this.radius=i,this}setFromPoints(e,i){const s=this.center;i!==void 0?s.copy(i):aS.setFromPoints(e).getCenter(s);let l=0;for(let c=0,d=e.length;c<d;c++)l=Math.max(l,s.distanceToSquared(e[c]));return this.radius=Math.sqrt(l),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const i=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=i*i}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,i){const s=this.center.distanceToSquared(e);return i.copy(e),s>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ol.subVectors(e,this.center);const i=ol.lengthSq();if(i>this.radius*this.radius){const s=Math.sqrt(i),l=(s-this.radius)*.5;this.center.addScaledVector(ol,l/s),this.radius+=l}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ol.copy(e.center).add(zh)),this.expandByPoint(ol.copy(e.center).sub(zh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const za=new vt,Ph=new vt,Oc=new vt,_s=new vt,Bh=new vt,zc=new vt,Ih=new vt;class lp{constructor(e=new vt,i=new vt(0,0,-1)){this.origin=e,this.direction=i}set(e,i){return this.origin.copy(e),this.direction.copy(i),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,i){return i.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,za)),this}closestPointToPoint(e,i){i.subVectors(e,this.origin);const s=i.dot(this.direction);return s<0?i.copy(this.origin):i.copy(this.origin).addScaledVector(this.direction,s)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const i=za.subVectors(e,this.origin).dot(this.direction);return i<0?this.origin.distanceToSquared(e):(za.copy(this.origin).addScaledVector(this.direction,i),za.distanceToSquared(e))}distanceSqToSegment(e,i,s,l){Ph.copy(e).add(i).multiplyScalar(.5),Oc.copy(i).sub(e).normalize(),_s.copy(this.origin).sub(Ph);const c=e.distanceTo(i)*.5,d=-this.direction.dot(Oc),h=_s.dot(this.direction),p=-_s.dot(Oc),m=_s.lengthSq(),_=Math.abs(1-d*d);let g,x,S,E;if(_>0)if(g=d*p-h,x=d*h-p,E=c*_,g>=0)if(x>=-E)if(x<=E){const T=1/_;g*=T,x*=T,S=g*(g+d*x+2*h)+x*(d*g+x+2*p)+m}else x=c,g=Math.max(0,-(d*x+h)),S=-g*g+x*(x+2*p)+m;else x=-c,g=Math.max(0,-(d*x+h)),S=-g*g+x*(x+2*p)+m;else x<=-E?(g=Math.max(0,-(-d*c+h)),x=g>0?-c:Math.min(Math.max(-c,-p),c),S=-g*g+x*(x+2*p)+m):x<=E?(g=0,x=Math.min(Math.max(-c,-p),c),S=x*(x+2*p)+m):(g=Math.max(0,-(d*c+h)),x=g>0?c:Math.min(Math.max(-c,-p),c),S=-g*g+x*(x+2*p)+m);else x=d>0?-c:c,g=Math.max(0,-(d*x+h)),S=-g*g+x*(x+2*p)+m;return s&&s.copy(this.origin).addScaledVector(this.direction,g),l&&l.copy(Ph).addScaledVector(Oc,x),S}intersectSphere(e,i){za.subVectors(e.center,this.origin);const s=za.dot(this.direction),l=za.dot(za)-s*s,c=e.radius*e.radius;if(l>c)return null;const d=Math.sqrt(c-l),h=s-d,p=s+d;return p<0?null:h<0?this.at(p,i):this.at(h,i)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const i=e.normal.dot(this.direction);if(i===0)return e.distanceToPoint(this.origin)===0?0:null;const s=-(this.origin.dot(e.normal)+e.constant)/i;return s>=0?s:null}intersectPlane(e,i){const s=this.distanceToPlane(e);return s===null?null:this.at(s,i)}intersectsPlane(e){const i=e.distanceToPoint(this.origin);return i===0||e.normal.dot(this.direction)*i<0}intersectBox(e,i){let s,l,c,d,h,p;const m=1/this.direction.x,_=1/this.direction.y,g=1/this.direction.z,x=this.origin;return m>=0?(s=(e.min.x-x.x)*m,l=(e.max.x-x.x)*m):(s=(e.max.x-x.x)*m,l=(e.min.x-x.x)*m),_>=0?(c=(e.min.y-x.y)*_,d=(e.max.y-x.y)*_):(c=(e.max.y-x.y)*_,d=(e.min.y-x.y)*_),s>d||c>l||((c>s||isNaN(s))&&(s=c),(d<l||isNaN(l))&&(l=d),g>=0?(h=(e.min.z-x.z)*g,p=(e.max.z-x.z)*g):(h=(e.max.z-x.z)*g,p=(e.min.z-x.z)*g),s>p||h>l)||((h>s||s!==s)&&(s=h),(p<l||l!==l)&&(l=p),l<0)?null:this.at(s>=0?s:l,i)}intersectsBox(e){return this.intersectBox(e,za)!==null}intersectTriangle(e,i,s,l,c){Bh.subVectors(i,e),zc.subVectors(s,e),Ih.crossVectors(Bh,zc);let d=this.direction.dot(Ih),h;if(d>0){if(l)return null;h=1}else if(d<0)h=-1,d=-d;else return null;_s.subVectors(this.origin,e);const p=h*this.direction.dot(zc.crossVectors(_s,zc));if(p<0)return null;const m=h*this.direction.dot(Bh.cross(_s));if(m<0||p+m>d)return null;const _=-h*_s.dot(Ih);return _<0?null:this.at(_/d,c)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Dn{constructor(e,i,s,l,c,d,h,p,m,_,g,x,S,E,T,M){Dn.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,i,s,l,c,d,h,p,m,_,g,x,S,E,T,M)}set(e,i,s,l,c,d,h,p,m,_,g,x,S,E,T,M){const v=this.elements;return v[0]=e,v[4]=i,v[8]=s,v[12]=l,v[1]=c,v[5]=d,v[9]=h,v[13]=p,v[2]=m,v[6]=_,v[10]=g,v[14]=x,v[3]=S,v[7]=E,v[11]=T,v[15]=M,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Dn().fromArray(this.elements)}copy(e){const i=this.elements,s=e.elements;return i[0]=s[0],i[1]=s[1],i[2]=s[2],i[3]=s[3],i[4]=s[4],i[5]=s[5],i[6]=s[6],i[7]=s[7],i[8]=s[8],i[9]=s[9],i[10]=s[10],i[11]=s[11],i[12]=s[12],i[13]=s[13],i[14]=s[14],i[15]=s[15],this}copyPosition(e){const i=this.elements,s=e.elements;return i[12]=s[12],i[13]=s[13],i[14]=s[14],this}setFromMatrix3(e){const i=e.elements;return this.set(i[0],i[3],i[6],0,i[1],i[4],i[7],0,i[2],i[5],i[8],0,0,0,0,1),this}extractBasis(e,i,s){return e.setFromMatrixColumn(this,0),i.setFromMatrixColumn(this,1),s.setFromMatrixColumn(this,2),this}makeBasis(e,i,s){return this.set(e.x,i.x,s.x,0,e.y,i.y,s.y,0,e.z,i.z,s.z,0,0,0,0,1),this}extractRotation(e){const i=this.elements,s=e.elements,l=1/Xr.setFromMatrixColumn(e,0).length(),c=1/Xr.setFromMatrixColumn(e,1).length(),d=1/Xr.setFromMatrixColumn(e,2).length();return i[0]=s[0]*l,i[1]=s[1]*l,i[2]=s[2]*l,i[3]=0,i[4]=s[4]*c,i[5]=s[5]*c,i[6]=s[6]*c,i[7]=0,i[8]=s[8]*d,i[9]=s[9]*d,i[10]=s[10]*d,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromEuler(e){const i=this.elements,s=e.x,l=e.y,c=e.z,d=Math.cos(s),h=Math.sin(s),p=Math.cos(l),m=Math.sin(l),_=Math.cos(c),g=Math.sin(c);if(e.order==="XYZ"){const x=d*_,S=d*g,E=h*_,T=h*g;i[0]=p*_,i[4]=-p*g,i[8]=m,i[1]=S+E*m,i[5]=x-T*m,i[9]=-h*p,i[2]=T-x*m,i[6]=E+S*m,i[10]=d*p}else if(e.order==="YXZ"){const x=p*_,S=p*g,E=m*_,T=m*g;i[0]=x+T*h,i[4]=E*h-S,i[8]=d*m,i[1]=d*g,i[5]=d*_,i[9]=-h,i[2]=S*h-E,i[6]=T+x*h,i[10]=d*p}else if(e.order==="ZXY"){const x=p*_,S=p*g,E=m*_,T=m*g;i[0]=x-T*h,i[4]=-d*g,i[8]=E+S*h,i[1]=S+E*h,i[5]=d*_,i[9]=T-x*h,i[2]=-d*m,i[6]=h,i[10]=d*p}else if(e.order==="ZYX"){const x=d*_,S=d*g,E=h*_,T=h*g;i[0]=p*_,i[4]=E*m-S,i[8]=x*m+T,i[1]=p*g,i[5]=T*m+x,i[9]=S*m-E,i[2]=-m,i[6]=h*p,i[10]=d*p}else if(e.order==="YZX"){const x=d*p,S=d*m,E=h*p,T=h*m;i[0]=p*_,i[4]=T-x*g,i[8]=E*g+S,i[1]=g,i[5]=d*_,i[9]=-h*_,i[2]=-m*_,i[6]=S*g+E,i[10]=x-T*g}else if(e.order==="XZY"){const x=d*p,S=d*m,E=h*p,T=h*m;i[0]=p*_,i[4]=-g,i[8]=m*_,i[1]=x*g+T,i[5]=d*_,i[9]=S*g-E,i[2]=E*g-S,i[6]=h*_,i[10]=T*g+x}return i[3]=0,i[7]=0,i[11]=0,i[12]=0,i[13]=0,i[14]=0,i[15]=1,this}makeRotationFromQuaternion(e){return this.compose(sS,e,rS)}lookAt(e,i,s){const l=this.elements;return Bi.subVectors(e,i),Bi.lengthSq()===0&&(Bi.z=1),Bi.normalize(),xs.crossVectors(s,Bi),xs.lengthSq()===0&&(Math.abs(s.z)===1?Bi.x+=1e-4:Bi.z+=1e-4,Bi.normalize(),xs.crossVectors(s,Bi)),xs.normalize(),Pc.crossVectors(Bi,xs),l[0]=xs.x,l[4]=Pc.x,l[8]=Bi.x,l[1]=xs.y,l[5]=Pc.y,l[9]=Bi.y,l[2]=xs.z,l[6]=Pc.z,l[10]=Bi.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){const s=e.elements,l=i.elements,c=this.elements,d=s[0],h=s[4],p=s[8],m=s[12],_=s[1],g=s[5],x=s[9],S=s[13],E=s[2],T=s[6],M=s[10],v=s[14],I=s[3],F=s[7],z=s[11],Q=s[15],H=l[0],D=l[4],j=l[8],N=l[12],b=l[1],B=l[5],Y=l[9],Z=l[13],nt=l[2],_t=l[6],w=l[10],X=l[14],G=l[3],ot=l[7],Dt=l[11],V=l[15];return c[0]=d*H+h*b+p*nt+m*G,c[4]=d*D+h*B+p*_t+m*ot,c[8]=d*j+h*Y+p*w+m*Dt,c[12]=d*N+h*Z+p*X+m*V,c[1]=_*H+g*b+x*nt+S*G,c[5]=_*D+g*B+x*_t+S*ot,c[9]=_*j+g*Y+x*w+S*Dt,c[13]=_*N+g*Z+x*X+S*V,c[2]=E*H+T*b+M*nt+v*G,c[6]=E*D+T*B+M*_t+v*ot,c[10]=E*j+T*Y+M*w+v*Dt,c[14]=E*N+T*Z+M*X+v*V,c[3]=I*H+F*b+z*nt+Q*G,c[7]=I*D+F*B+z*_t+Q*ot,c[11]=I*j+F*Y+z*w+Q*Dt,c[15]=I*N+F*Z+z*X+Q*V,this}multiplyScalar(e){const i=this.elements;return i[0]*=e,i[4]*=e,i[8]*=e,i[12]*=e,i[1]*=e,i[5]*=e,i[9]*=e,i[13]*=e,i[2]*=e,i[6]*=e,i[10]*=e,i[14]*=e,i[3]*=e,i[7]*=e,i[11]*=e,i[15]*=e,this}determinant(){const e=this.elements,i=e[0],s=e[4],l=e[8],c=e[12],d=e[1],h=e[5],p=e[9],m=e[13],_=e[2],g=e[6],x=e[10],S=e[14],E=e[3],T=e[7],M=e[11],v=e[15];return E*(+c*p*g-l*m*g-c*h*x+s*m*x+l*h*S-s*p*S)+T*(+i*p*S-i*m*x+c*d*x-l*d*S+l*m*_-c*p*_)+M*(+i*m*g-i*h*S-c*d*g+s*d*S+c*h*_-s*m*_)+v*(-l*h*_-i*p*g+i*h*x+l*d*g-s*d*x+s*p*_)}transpose(){const e=this.elements;let i;return i=e[1],e[1]=e[4],e[4]=i,i=e[2],e[2]=e[8],e[8]=i,i=e[6],e[6]=e[9],e[9]=i,i=e[3],e[3]=e[12],e[12]=i,i=e[7],e[7]=e[13],e[13]=i,i=e[11],e[11]=e[14],e[14]=i,this}setPosition(e,i,s){const l=this.elements;return e.isVector3?(l[12]=e.x,l[13]=e.y,l[14]=e.z):(l[12]=e,l[13]=i,l[14]=s),this}invert(){const e=this.elements,i=e[0],s=e[1],l=e[2],c=e[3],d=e[4],h=e[5],p=e[6],m=e[7],_=e[8],g=e[9],x=e[10],S=e[11],E=e[12],T=e[13],M=e[14],v=e[15],I=g*M*m-T*x*m+T*p*S-h*M*S-g*p*v+h*x*v,F=E*x*m-_*M*m-E*p*S+d*M*S+_*p*v-d*x*v,z=_*T*m-E*g*m+E*h*S-d*T*S-_*h*v+d*g*v,Q=E*g*p-_*T*p-E*h*x+d*T*x+_*h*M-d*g*M,H=i*I+s*F+l*z+c*Q;if(H===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const D=1/H;return e[0]=I*D,e[1]=(T*x*c-g*M*c-T*l*S+s*M*S+g*l*v-s*x*v)*D,e[2]=(h*M*c-T*p*c+T*l*m-s*M*m-h*l*v+s*p*v)*D,e[3]=(g*p*c-h*x*c-g*l*m+s*x*m+h*l*S-s*p*S)*D,e[4]=F*D,e[5]=(_*M*c-E*x*c+E*l*S-i*M*S-_*l*v+i*x*v)*D,e[6]=(E*p*c-d*M*c-E*l*m+i*M*m+d*l*v-i*p*v)*D,e[7]=(d*x*c-_*p*c+_*l*m-i*x*m-d*l*S+i*p*S)*D,e[8]=z*D,e[9]=(E*g*c-_*T*c-E*s*S+i*T*S+_*s*v-i*g*v)*D,e[10]=(d*T*c-E*h*c+E*s*m-i*T*m-d*s*v+i*h*v)*D,e[11]=(_*h*c-d*g*c-_*s*m+i*g*m+d*s*S-i*h*S)*D,e[12]=Q*D,e[13]=(_*T*l-E*g*l+E*s*x-i*T*x-_*s*M+i*g*M)*D,e[14]=(E*h*l-d*T*l-E*s*p+i*T*p+d*s*M-i*h*M)*D,e[15]=(d*g*l-_*h*l+_*s*p-i*g*p-d*s*x+i*h*x)*D,this}scale(e){const i=this.elements,s=e.x,l=e.y,c=e.z;return i[0]*=s,i[4]*=l,i[8]*=c,i[1]*=s,i[5]*=l,i[9]*=c,i[2]*=s,i[6]*=l,i[10]*=c,i[3]*=s,i[7]*=l,i[11]*=c,this}getMaxScaleOnAxis(){const e=this.elements,i=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],s=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],l=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(i,s,l))}makeTranslation(e,i,s){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,i,0,0,1,s,0,0,0,1),this}makeRotationX(e){const i=Math.cos(e),s=Math.sin(e);return this.set(1,0,0,0,0,i,-s,0,0,s,i,0,0,0,0,1),this}makeRotationY(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,0,s,0,0,1,0,0,-s,0,i,0,0,0,0,1),this}makeRotationZ(e){const i=Math.cos(e),s=Math.sin(e);return this.set(i,-s,0,0,s,i,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,i){const s=Math.cos(i),l=Math.sin(i),c=1-s,d=e.x,h=e.y,p=e.z,m=c*d,_=c*h;return this.set(m*d+s,m*h-l*p,m*p+l*h,0,m*h+l*p,_*h+s,_*p-l*d,0,m*p-l*h,_*p+l*d,c*p*p+s,0,0,0,0,1),this}makeScale(e,i,s){return this.set(e,0,0,0,0,i,0,0,0,0,s,0,0,0,0,1),this}makeShear(e,i,s,l,c,d){return this.set(1,s,c,0,e,1,d,0,i,l,1,0,0,0,0,1),this}compose(e,i,s){const l=this.elements,c=i._x,d=i._y,h=i._z,p=i._w,m=c+c,_=d+d,g=h+h,x=c*m,S=c*_,E=c*g,T=d*_,M=d*g,v=h*g,I=p*m,F=p*_,z=p*g,Q=s.x,H=s.y,D=s.z;return l[0]=(1-(T+v))*Q,l[1]=(S+z)*Q,l[2]=(E-F)*Q,l[3]=0,l[4]=(S-z)*H,l[5]=(1-(x+v))*H,l[6]=(M+I)*H,l[7]=0,l[8]=(E+F)*D,l[9]=(M-I)*D,l[10]=(1-(x+T))*D,l[11]=0,l[12]=e.x,l[13]=e.y,l[14]=e.z,l[15]=1,this}decompose(e,i,s){const l=this.elements;let c=Xr.set(l[0],l[1],l[2]).length();const d=Xr.set(l[4],l[5],l[6]).length(),h=Xr.set(l[8],l[9],l[10]).length();this.determinant()<0&&(c=-c),e.x=l[12],e.y=l[13],e.z=l[14],sa.copy(this);const m=1/c,_=1/d,g=1/h;return sa.elements[0]*=m,sa.elements[1]*=m,sa.elements[2]*=m,sa.elements[4]*=_,sa.elements[5]*=_,sa.elements[6]*=_,sa.elements[8]*=g,sa.elements[9]*=g,sa.elements[10]*=g,i.setFromRotationMatrix(sa),s.x=c,s.y=d,s.z=h,this}makePerspective(e,i,s,l,c,d,h=Va){const p=this.elements,m=2*c/(i-e),_=2*c/(s-l),g=(i+e)/(i-e),x=(s+l)/(s-l);let S,E;if(h===Va)S=-(d+c)/(d-c),E=-2*d*c/(d-c);else if(h===pu)S=-d/(d-c),E=-d*c/(d-c);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+h);return p[0]=m,p[4]=0,p[8]=g,p[12]=0,p[1]=0,p[5]=_,p[9]=x,p[13]=0,p[2]=0,p[6]=0,p[10]=S,p[14]=E,p[3]=0,p[7]=0,p[11]=-1,p[15]=0,this}makeOrthographic(e,i,s,l,c,d,h=Va){const p=this.elements,m=1/(i-e),_=1/(s-l),g=1/(d-c),x=(i+e)*m,S=(s+l)*_;let E,T;if(h===Va)E=(d+c)*g,T=-2*g;else if(h===pu)E=c*g,T=-1*g;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+h);return p[0]=2*m,p[4]=0,p[8]=0,p[12]=-x,p[1]=0,p[5]=2*_,p[9]=0,p[13]=-S,p[2]=0,p[6]=0,p[10]=T,p[14]=-E,p[3]=0,p[7]=0,p[11]=0,p[15]=1,this}equals(e){const i=this.elements,s=e.elements;for(let l=0;l<16;l++)if(i[l]!==s[l])return!1;return!0}fromArray(e,i=0){for(let s=0;s<16;s++)this.elements[s]=e[s+i];return this}toArray(e=[],i=0){const s=this.elements;return e[i]=s[0],e[i+1]=s[1],e[i+2]=s[2],e[i+3]=s[3],e[i+4]=s[4],e[i+5]=s[5],e[i+6]=s[6],e[i+7]=s[7],e[i+8]=s[8],e[i+9]=s[9],e[i+10]=s[10],e[i+11]=s[11],e[i+12]=s[12],e[i+13]=s[13],e[i+14]=s[14],e[i+15]=s[15],e}}const Xr=new vt,sa=new Dn,sS=new vt(0,0,0),rS=new vt(1,1,1),xs=new vt,Pc=new vt,Bi=new vt,fv=new Dn,hv=new El;class qa{constructor(e=0,i=0,s=0,l=qa.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=i,this._z=s,this._order=l}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,i,s,l=this._order){return this._x=e,this._y=i,this._z=s,this._order=l,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,i=this._order,s=!0){const l=e.elements,c=l[0],d=l[4],h=l[8],p=l[1],m=l[5],_=l[9],g=l[2],x=l[6],S=l[10];switch(i){case"XYZ":this._y=Math.asin(Ti(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(-_,S),this._z=Math.atan2(-d,c)):(this._x=Math.atan2(x,m),this._z=0);break;case"YXZ":this._x=Math.asin(-Ti(_,-1,1)),Math.abs(_)<.9999999?(this._y=Math.atan2(h,S),this._z=Math.atan2(p,m)):(this._y=Math.atan2(-g,c),this._z=0);break;case"ZXY":this._x=Math.asin(Ti(x,-1,1)),Math.abs(x)<.9999999?(this._y=Math.atan2(-g,S),this._z=Math.atan2(-d,m)):(this._y=0,this._z=Math.atan2(p,c));break;case"ZYX":this._y=Math.asin(-Ti(g,-1,1)),Math.abs(g)<.9999999?(this._x=Math.atan2(x,S),this._z=Math.atan2(p,c)):(this._x=0,this._z=Math.atan2(-d,m));break;case"YZX":this._z=Math.asin(Ti(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(-_,m),this._y=Math.atan2(-g,c)):(this._x=0,this._y=Math.atan2(h,S));break;case"XZY":this._z=Math.asin(-Ti(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(x,m),this._y=Math.atan2(h,c)):(this._x=Math.atan2(-_,S),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+i)}return this._order=i,s===!0&&this._onChangeCallback(),this}setFromQuaternion(e,i,s){return fv.makeRotationFromQuaternion(e),this.setFromRotationMatrix(fv,i,s)}setFromVector3(e,i=this._order){return this.set(e.x,e.y,e.z,i)}reorder(e){return hv.setFromEuler(this),this.setFromQuaternion(hv,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}qa.DEFAULT_ORDER="XYZ";class b_{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let oS=0;const dv=new vt,qr=new El,Pa=new Dn,Bc=new vt,ll=new vt,lS=new vt,cS=new El,pv=new vt(1,0,0),mv=new vt(0,1,0),gv=new vt(0,0,1),vv={type:"added"},uS={type:"removed"},Wr={type:"childadded",child:null},Fh={type:"childremoved",child:null};class vi extends po{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:oS++}),this.uuid=Sl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=vi.DEFAULT_UP.clone();const e=new vt,i=new qa,s=new El,l=new vt(1,1,1);function c(){s.setFromEuler(i,!1)}function d(){i.setFromQuaternion(s,void 0,!1)}i._onChange(c),s._onChange(d),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:i},quaternion:{configurable:!0,enumerable:!0,value:s},scale:{configurable:!0,enumerable:!0,value:l},modelViewMatrix:{value:new Dn},normalMatrix:{value:new Ve}}),this.matrix=new Dn,this.matrixWorld=new Dn,this.matrixAutoUpdate=vi.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=vi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new b_,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,i){this.quaternion.setFromAxisAngle(e,i)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,i){return qr.setFromAxisAngle(e,i),this.quaternion.multiply(qr),this}rotateOnWorldAxis(e,i){return qr.setFromAxisAngle(e,i),this.quaternion.premultiply(qr),this}rotateX(e){return this.rotateOnAxis(pv,e)}rotateY(e){return this.rotateOnAxis(mv,e)}rotateZ(e){return this.rotateOnAxis(gv,e)}translateOnAxis(e,i){return dv.copy(e).applyQuaternion(this.quaternion),this.position.add(dv.multiplyScalar(i)),this}translateX(e){return this.translateOnAxis(pv,e)}translateY(e){return this.translateOnAxis(mv,e)}translateZ(e){return this.translateOnAxis(gv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pa.copy(this.matrixWorld).invert())}lookAt(e,i,s){e.isVector3?Bc.copy(e):Bc.set(e,i,s);const l=this.parent;this.updateWorldMatrix(!0,!1),ll.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pa.lookAt(ll,Bc,this.up):Pa.lookAt(Bc,ll,this.up),this.quaternion.setFromRotationMatrix(Pa),l&&(Pa.extractRotation(l.matrixWorld),qr.setFromRotationMatrix(Pa),this.quaternion.premultiply(qr.invert()))}add(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.add(arguments[i]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(vv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let s=0;s<arguments.length;s++)this.remove(arguments[s]);return this}const i=this.children.indexOf(e);return i!==-1&&(e.parent=null,this.children.splice(i,1),e.dispatchEvent(uS),Fh.child=e,this.dispatchEvent(Fh),Fh.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pa.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(vv),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,i){if(this[e]===i)return this;for(let s=0,l=this.children.length;s<l;s++){const d=this.children[s].getObjectByProperty(e,i);if(d!==void 0)return d}}getObjectsByProperty(e,i,s=[]){this[e]===i&&s.push(this);const l=this.children;for(let c=0,d=l.length;c<d;c++)l[c].getObjectsByProperty(e,i,s);return s}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,e,lS),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ll,cS,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const i=this.matrixWorld.elements;return e.set(i[8],i[9],i[10]).normalize()}raycast(){}traverse(e){e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].traverseVisible(e)}traverseAncestors(e){const i=this.parent;i!==null&&(e(i),i.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const i=this.children;for(let s=0,l=i.length;s<l;s++)i[s].updateMatrixWorld(e)}updateWorldMatrix(e,i){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),i===!0){const l=this.children;for(let c=0,d=l.length;c<d;c++)l[c].updateWorldMatrix(!1,!0)}}toJSON(e){const i=e===void 0||typeof e=="string",s={};i&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},s.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const l={};l.uuid=this.uuid,l.type=this.type,this.name!==""&&(l.name=this.name),this.castShadow===!0&&(l.castShadow=!0),this.receiveShadow===!0&&(l.receiveShadow=!0),this.visible===!1&&(l.visible=!1),this.frustumCulled===!1&&(l.frustumCulled=!1),this.renderOrder!==0&&(l.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(l.userData=this.userData),l.layers=this.layers.mask,l.matrix=this.matrix.toArray(),l.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(l.matrixAutoUpdate=!1),this.isInstancedMesh&&(l.type="InstancedMesh",l.count=this.count,l.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(l.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(l.type="BatchedMesh",l.perObjectFrustumCulled=this.perObjectFrustumCulled,l.sortObjects=this.sortObjects,l.drawRanges=this._drawRanges,l.reservedRanges=this._reservedRanges,l.visibility=this._visibility,l.active=this._active,l.bounds=this._bounds.map(h=>({boxInitialized:h.boxInitialized,boxMin:h.box.min.toArray(),boxMax:h.box.max.toArray(),sphereInitialized:h.sphereInitialized,sphereRadius:h.sphere.radius,sphereCenter:h.sphere.center.toArray()})),l.maxInstanceCount=this._maxInstanceCount,l.maxVertexCount=this._maxVertexCount,l.maxIndexCount=this._maxIndexCount,l.geometryInitialized=this._geometryInitialized,l.geometryCount=this._geometryCount,l.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(l.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(l.boundingSphere={center:l.boundingSphere.center.toArray(),radius:l.boundingSphere.radius}),this.boundingBox!==null&&(l.boundingBox={min:l.boundingBox.min.toArray(),max:l.boundingBox.max.toArray()}));function c(h,p){return h[p.uuid]===void 0&&(h[p.uuid]=p.toJSON(e)),p.uuid}if(this.isScene)this.background&&(this.background.isColor?l.background=this.background.toJSON():this.background.isTexture&&(l.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(l.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){l.geometry=c(e.geometries,this.geometry);const h=this.geometry.parameters;if(h!==void 0&&h.shapes!==void 0){const p=h.shapes;if(Array.isArray(p))for(let m=0,_=p.length;m<_;m++){const g=p[m];c(e.shapes,g)}else c(e.shapes,p)}}if(this.isSkinnedMesh&&(l.bindMode=this.bindMode,l.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(c(e.skeletons,this.skeleton),l.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const h=[];for(let p=0,m=this.material.length;p<m;p++)h.push(c(e.materials,this.material[p]));l.material=h}else l.material=c(e.materials,this.material);if(this.children.length>0){l.children=[];for(let h=0;h<this.children.length;h++)l.children.push(this.children[h].toJSON(e).object)}if(this.animations.length>0){l.animations=[];for(let h=0;h<this.animations.length;h++){const p=this.animations[h];l.animations.push(c(e.animations,p))}}if(i){const h=d(e.geometries),p=d(e.materials),m=d(e.textures),_=d(e.images),g=d(e.shapes),x=d(e.skeletons),S=d(e.animations),E=d(e.nodes);h.length>0&&(s.geometries=h),p.length>0&&(s.materials=p),m.length>0&&(s.textures=m),_.length>0&&(s.images=_),g.length>0&&(s.shapes=g),x.length>0&&(s.skeletons=x),S.length>0&&(s.animations=S),E.length>0&&(s.nodes=E)}return s.object=l,s;function d(h){const p=[];for(const m in h){const _=h[m];delete _.metadata,p.push(_)}return p}}clone(e){return new this.constructor().copy(this,e)}copy(e,i=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),i===!0)for(let s=0;s<e.children.length;s++){const l=e.children[s];this.add(l.clone())}return this}}vi.DEFAULT_UP=new vt(0,1,0);vi.DEFAULT_MATRIX_AUTO_UPDATE=!0;vi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ra=new vt,Ba=new vt,Hh=new vt,Ia=new vt,jr=new vt,Yr=new vt,_v=new vt,Gh=new vt,Vh=new vt,kh=new vt,Xh=new Xn,qh=new Xn,Wh=new Xn;class Ji{constructor(e=new vt,i=new vt,s=new vt){this.a=e,this.b=i,this.c=s}static getNormal(e,i,s,l){l.subVectors(s,i),ra.subVectors(e,i),l.cross(ra);const c=l.lengthSq();return c>0?l.multiplyScalar(1/Math.sqrt(c)):l.set(0,0,0)}static getBarycoord(e,i,s,l,c){ra.subVectors(l,i),Ba.subVectors(s,i),Hh.subVectors(e,i);const d=ra.dot(ra),h=ra.dot(Ba),p=ra.dot(Hh),m=Ba.dot(Ba),_=Ba.dot(Hh),g=d*m-h*h;if(g===0)return c.set(0,0,0),null;const x=1/g,S=(m*p-h*_)*x,E=(d*_-h*p)*x;return c.set(1-S-E,E,S)}static containsPoint(e,i,s,l){return this.getBarycoord(e,i,s,l,Ia)===null?!1:Ia.x>=0&&Ia.y>=0&&Ia.x+Ia.y<=1}static getInterpolation(e,i,s,l,c,d,h,p){return this.getBarycoord(e,i,s,l,Ia)===null?(p.x=0,p.y=0,"z"in p&&(p.z=0),"w"in p&&(p.w=0),null):(p.setScalar(0),p.addScaledVector(c,Ia.x),p.addScaledVector(d,Ia.y),p.addScaledVector(h,Ia.z),p)}static getInterpolatedAttribute(e,i,s,l,c,d){return Xh.setScalar(0),qh.setScalar(0),Wh.setScalar(0),Xh.fromBufferAttribute(e,i),qh.fromBufferAttribute(e,s),Wh.fromBufferAttribute(e,l),d.setScalar(0),d.addScaledVector(Xh,c.x),d.addScaledVector(qh,c.y),d.addScaledVector(Wh,c.z),d}static isFrontFacing(e,i,s,l){return ra.subVectors(s,i),Ba.subVectors(e,i),ra.cross(Ba).dot(l)<0}set(e,i,s){return this.a.copy(e),this.b.copy(i),this.c.copy(s),this}setFromPointsAndIndices(e,i,s,l){return this.a.copy(e[i]),this.b.copy(e[s]),this.c.copy(e[l]),this}setFromAttributeAndIndices(e,i,s,l){return this.a.fromBufferAttribute(e,i),this.b.fromBufferAttribute(e,s),this.c.fromBufferAttribute(e,l),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ra.subVectors(this.c,this.b),Ba.subVectors(this.a,this.b),ra.cross(Ba).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ji.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,i){return Ji.getBarycoord(e,this.a,this.b,this.c,i)}getInterpolation(e,i,s,l,c){return Ji.getInterpolation(e,this.a,this.b,this.c,i,s,l,c)}containsPoint(e){return Ji.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ji.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,i){const s=this.a,l=this.b,c=this.c;let d,h;jr.subVectors(l,s),Yr.subVectors(c,s),Gh.subVectors(e,s);const p=jr.dot(Gh),m=Yr.dot(Gh);if(p<=0&&m<=0)return i.copy(s);Vh.subVectors(e,l);const _=jr.dot(Vh),g=Yr.dot(Vh);if(_>=0&&g<=_)return i.copy(l);const x=p*g-_*m;if(x<=0&&p>=0&&_<=0)return d=p/(p-_),i.copy(s).addScaledVector(jr,d);kh.subVectors(e,c);const S=jr.dot(kh),E=Yr.dot(kh);if(E>=0&&S<=E)return i.copy(c);const T=S*m-p*E;if(T<=0&&m>=0&&E<=0)return h=m/(m-E),i.copy(s).addScaledVector(Yr,h);const M=_*E-S*g;if(M<=0&&g-_>=0&&S-E>=0)return _v.subVectors(c,l),h=(g-_)/(g-_+(S-E)),i.copy(l).addScaledVector(_v,h);const v=1/(M+T+x);return d=T*v,h=x*v,i.copy(s).addScaledVector(jr,d).addScaledVector(Yr,h)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const T_={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ys={h:0,s:0,l:0},Ic={h:0,s:0,l:0};function jh(r,e,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?r+(e-r)*6*i:i<1/2?e:i<2/3?r+(e-r)*6*(2/3-i):r}class an{constructor(e,i,s){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,s)}set(e,i,s){if(i===void 0&&s===void 0){const l=e;l&&l.isColor?this.copy(l):typeof l=="number"?this.setHex(l):typeof l=="string"&&this.setStyle(l)}else this.setRGB(e,i,s);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=Ki){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,un.toWorkingColorSpace(this,i),this}setRGB(e,i,s,l=un.workingColorSpace){return this.r=e,this.g=i,this.b=s,un.toWorkingColorSpace(this,l),this}setHSL(e,i,s,l=un.workingColorSpace){if(e=YM(e,1),i=Ti(i,0,1),s=Ti(s,0,1),i===0)this.r=this.g=this.b=s;else{const c=s<=.5?s*(1+i):s+i-s*i,d=2*s-c;this.r=jh(d,c,e+1/3),this.g=jh(d,c,e),this.b=jh(d,c,e-1/3)}return un.toWorkingColorSpace(this,l),this}setStyle(e,i=Ki){function s(c){c!==void 0&&parseFloat(c)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let l;if(l=/^(\w+)\(([^\)]*)\)/.exec(e)){let c;const d=l[1],h=l[2];switch(d){case"rgb":case"rgba":if(c=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(255,parseInt(c[1],10))/255,Math.min(255,parseInt(c[2],10))/255,Math.min(255,parseInt(c[3],10))/255,i);if(c=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setRGB(Math.min(100,parseInt(c[1],10))/100,Math.min(100,parseInt(c[2],10))/100,Math.min(100,parseInt(c[3],10))/100,i);break;case"hsl":case"hsla":if(c=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h))return s(c[4]),this.setHSL(parseFloat(c[1])/360,parseFloat(c[2])/100,parseFloat(c[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(l=/^\#([A-Fa-f\d]+)$/.exec(e)){const c=l[1],d=c.length;if(d===3)return this.setRGB(parseInt(c.charAt(0),16)/15,parseInt(c.charAt(1),16)/15,parseInt(c.charAt(2),16)/15,i);if(d===6)return this.setHex(parseInt(c,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=Ki){const s=T_[e.toLowerCase()];return s!==void 0?this.setHex(s,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ka(e.r),this.g=ka(e.g),this.b=ka(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ki){return un.fromWorkingColorSpace(fi.copy(this),e),Math.round(Ti(fi.r*255,0,255))*65536+Math.round(Ti(fi.g*255,0,255))*256+Math.round(Ti(fi.b*255,0,255))}getHexString(e=Ki){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=un.workingColorSpace){un.fromWorkingColorSpace(fi.copy(this),i);const s=fi.r,l=fi.g,c=fi.b,d=Math.max(s,l,c),h=Math.min(s,l,c);let p,m;const _=(h+d)/2;if(h===d)p=0,m=0;else{const g=d-h;switch(m=_<=.5?g/(d+h):g/(2-d-h),d){case s:p=(l-c)/g+(l<c?6:0);break;case l:p=(c-s)/g+2;break;case c:p=(s-l)/g+4;break}p/=6}return e.h=p,e.s=m,e.l=_,e}getRGB(e,i=un.workingColorSpace){return un.fromWorkingColorSpace(fi.copy(this),i),e.r=fi.r,e.g=fi.g,e.b=fi.b,e}getStyle(e=Ki){un.fromWorkingColorSpace(fi.copy(this),e);const i=fi.r,s=fi.g,l=fi.b;return e!==Ki?`color(${e} ${i.toFixed(3)} ${s.toFixed(3)} ${l.toFixed(3)})`:`rgb(${Math.round(i*255)},${Math.round(s*255)},${Math.round(l*255)})`}offsetHSL(e,i,s){return this.getHSL(ys),this.setHSL(ys.h+e,ys.s+i,ys.l+s)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,s){return this.r=e.r+(i.r-e.r)*s,this.g=e.g+(i.g-e.g)*s,this.b=e.b+(i.b-e.b)*s,this}lerpHSL(e,i){this.getHSL(ys),e.getHSL(Ic);const s=Dh(ys.h,Ic.h,i),l=Dh(ys.s,Ic.s,i),c=Dh(ys.l,Ic.l,i);return this.setHSL(s,l,c),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const i=this.r,s=this.g,l=this.b,c=e.elements;return this.r=c[0]*i+c[3]*s+c[6]*l,this.g=c[1]*i+c[4]*s+c[7]*l,this.b=c[2]*i+c[5]*s+c[8]*l,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const fi=new an;an.NAMES=T_;let fS=0;class mo extends po{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:fS++}),this.uuid=Sl(),this.name="",this.blending=ir,this.side=As,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rd,this.blendDst=od,this.blendEquation=Js,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new an(0,0,0),this.blendAlpha=0,this.depthFunc=ro,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ev,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fr,this.stencilZFail=Fr,this.stencilZPass=Fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const i in e){const s=e[i];if(s===void 0){console.warn(`THREE.Material: parameter '${i}' has value of undefined.`);continue}const l=this[i];if(l===void 0){console.warn(`THREE.Material: '${i}' is not a property of THREE.${this.type}.`);continue}l&&l.isColor?l.set(s):l&&l.isVector3&&s&&s.isVector3?l.copy(s):this[i]=s}}toJSON(e){const i=e===void 0||typeof e=="string";i&&(e={textures:{},images:{}});const s={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.color&&this.color.isColor&&(s.color=this.color.getHex()),this.roughness!==void 0&&(s.roughness=this.roughness),this.metalness!==void 0&&(s.metalness=this.metalness),this.sheen!==void 0&&(s.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(s.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(s.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(s.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(s.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(s.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(s.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(s.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(s.shininess=this.shininess),this.clearcoat!==void 0&&(s.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(s.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(s.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(s.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(s.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,s.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(s.dispersion=this.dispersion),this.iridescence!==void 0&&(s.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(s.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(s.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(s.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(s.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(s.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(s.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(s.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(s.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(s.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(s.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(s.lightMap=this.lightMap.toJSON(e).uuid,s.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(s.aoMap=this.aoMap.toJSON(e).uuid,s.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(s.bumpMap=this.bumpMap.toJSON(e).uuid,s.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(s.normalMap=this.normalMap.toJSON(e).uuid,s.normalMapType=this.normalMapType,s.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(s.displacementMap=this.displacementMap.toJSON(e).uuid,s.displacementScale=this.displacementScale,s.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(s.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(s.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(s.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(s.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(s.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(s.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(s.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(s.combine=this.combine)),this.envMapRotation!==void 0&&(s.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(s.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(s.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(s.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(s.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(s.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(s.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(s.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(s.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(s.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(s.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(s.size=this.size),this.shadowSide!==null&&(s.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(s.sizeAttenuation=this.sizeAttenuation),this.blending!==ir&&(s.blending=this.blending),this.side!==As&&(s.side=this.side),this.vertexColors===!0&&(s.vertexColors=!0),this.opacity<1&&(s.opacity=this.opacity),this.transparent===!0&&(s.transparent=!0),this.blendSrc!==rd&&(s.blendSrc=this.blendSrc),this.blendDst!==od&&(s.blendDst=this.blendDst),this.blendEquation!==Js&&(s.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(s.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(s.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(s.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(s.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(s.blendAlpha=this.blendAlpha),this.depthFunc!==ro&&(s.depthFunc=this.depthFunc),this.depthTest===!1&&(s.depthTest=this.depthTest),this.depthWrite===!1&&(s.depthWrite=this.depthWrite),this.colorWrite===!1&&(s.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(s.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ev&&(s.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(s.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(s.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fr&&(s.stencilFail=this.stencilFail),this.stencilZFail!==Fr&&(s.stencilZFail=this.stencilZFail),this.stencilZPass!==Fr&&(s.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(s.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(s.rotation=this.rotation),this.polygonOffset===!0&&(s.polygonOffset=!0),this.polygonOffsetFactor!==0&&(s.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(s.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(s.linewidth=this.linewidth),this.dashSize!==void 0&&(s.dashSize=this.dashSize),this.gapSize!==void 0&&(s.gapSize=this.gapSize),this.scale!==void 0&&(s.scale=this.scale),this.dithering===!0&&(s.dithering=!0),this.alphaTest>0&&(s.alphaTest=this.alphaTest),this.alphaHash===!0&&(s.alphaHash=!0),this.alphaToCoverage===!0&&(s.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(s.premultipliedAlpha=!0),this.forceSinglePass===!0&&(s.forceSinglePass=!0),this.wireframe===!0&&(s.wireframe=!0),this.wireframeLinewidth>1&&(s.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(s.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(s.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(s.flatShading=!0),this.visible===!1&&(s.visible=!1),this.toneMapped===!1&&(s.toneMapped=!1),this.fog===!1&&(s.fog=!1),Object.keys(this.userData).length>0&&(s.userData=this.userData);function l(c){const d=[];for(const h in c){const p=c[h];delete p.metadata,d.push(p)}return d}if(i){const c=l(e.textures),d=l(e.images);c.length>0&&(s.textures=c),d.length>0&&(s.images=d)}return s}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const i=e.clippingPlanes;let s=null;if(i!==null){const l=i.length;s=new Array(l);for(let c=0;c!==l;++c)s[c]=i[c].clone()}return this.clippingPlanes=s,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class A_ extends mo{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new an(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new qa,this.combine=c_,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Kn=new vt,Fc=new An;class wn{constructor(e,i,s=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=i,this.count=e!==void 0?e.length/i:0,this.normalized=s,this.usage=nv,this.updateRanges=[],this.gpuType=ga,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,i){this.updateRanges.push({start:e,count:i})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,i,s){e*=this.itemSize,s*=i.itemSize;for(let l=0,c=this.itemSize;l<c;l++)this.array[e+l]=i.array[s+l];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let i=0,s=this.count;i<s;i++)Fc.fromBufferAttribute(this,i),Fc.applyMatrix3(e),this.setXY(i,Fc.x,Fc.y);else if(this.itemSize===3)for(let i=0,s=this.count;i<s;i++)Kn.fromBufferAttribute(this,i),Kn.applyMatrix3(e),this.setXYZ(i,Kn.x,Kn.y,Kn.z);return this}applyMatrix4(e){for(let i=0,s=this.count;i<s;i++)Kn.fromBufferAttribute(this,i),Kn.applyMatrix4(e),this.setXYZ(i,Kn.x,Kn.y,Kn.z);return this}applyNormalMatrix(e){for(let i=0,s=this.count;i<s;i++)Kn.fromBufferAttribute(this,i),Kn.applyNormalMatrix(e),this.setXYZ(i,Kn.x,Kn.y,Kn.z);return this}transformDirection(e){for(let i=0,s=this.count;i<s;i++)Kn.fromBufferAttribute(this,i),Kn.transformDirection(e),this.setXYZ(i,Kn.x,Kn.y,Kn.z);return this}set(e,i=0){return this.array.set(e,i),this}getComponent(e,i){let s=this.array[e*this.itemSize+i];return this.normalized&&(s=sl(s,this.array)),s}setComponent(e,i,s){return this.normalized&&(s=bi(s,this.array)),this.array[e*this.itemSize+i]=s,this}getX(e){let i=this.array[e*this.itemSize];return this.normalized&&(i=sl(i,this.array)),i}setX(e,i){return this.normalized&&(i=bi(i,this.array)),this.array[e*this.itemSize]=i,this}getY(e){let i=this.array[e*this.itemSize+1];return this.normalized&&(i=sl(i,this.array)),i}setY(e,i){return this.normalized&&(i=bi(i,this.array)),this.array[e*this.itemSize+1]=i,this}getZ(e){let i=this.array[e*this.itemSize+2];return this.normalized&&(i=sl(i,this.array)),i}setZ(e,i){return this.normalized&&(i=bi(i,this.array)),this.array[e*this.itemSize+2]=i,this}getW(e){let i=this.array[e*this.itemSize+3];return this.normalized&&(i=sl(i,this.array)),i}setW(e,i){return this.normalized&&(i=bi(i,this.array)),this.array[e*this.itemSize+3]=i,this}setXY(e,i,s){return e*=this.itemSize,this.normalized&&(i=bi(i,this.array),s=bi(s,this.array)),this.array[e+0]=i,this.array[e+1]=s,this}setXYZ(e,i,s,l){return e*=this.itemSize,this.normalized&&(i=bi(i,this.array),s=bi(s,this.array),l=bi(l,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this}setXYZW(e,i,s,l,c){return e*=this.itemSize,this.normalized&&(i=bi(i,this.array),s=bi(s,this.array),l=bi(l,this.array),c=bi(c,this.array)),this.array[e+0]=i,this.array[e+1]=s,this.array[e+2]=l,this.array[e+3]=c,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==nv&&(e.usage=this.usage),e}}class R_ extends wn{constructor(e,i,s){super(new Uint16Array(e),i,s)}}class C_ extends wn{constructor(e,i,s){super(new Uint32Array(e),i,s)}}class va extends wn{constructor(e,i,s){super(new Float32Array(e),i,s)}}let hS=0;const Zi=new Dn,Yh=new vi,Zr=new vt,Ii=new lr,cl=new lr,ei=new vt;class Ri extends po{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:hS++}),this.uuid=Sl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(M_(e)?C_:R_)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,i){return this.attributes[e]=i,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,i,s=0){this.groups.push({start:e,count:i,materialIndex:s})}clearGroups(){this.groups=[]}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}applyMatrix4(e){const i=this.attributes.position;i!==void 0&&(i.applyMatrix4(e),i.needsUpdate=!0);const s=this.attributes.normal;if(s!==void 0){const c=new Ve().getNormalMatrix(e);s.applyNormalMatrix(c),s.needsUpdate=!0}const l=this.attributes.tangent;return l!==void 0&&(l.transformDirection(e),l.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Zi.makeRotationFromQuaternion(e),this.applyMatrix4(Zi),this}rotateX(e){return Zi.makeRotationX(e),this.applyMatrix4(Zi),this}rotateY(e){return Zi.makeRotationY(e),this.applyMatrix4(Zi),this}rotateZ(e){return Zi.makeRotationZ(e),this.applyMatrix4(Zi),this}translate(e,i,s){return Zi.makeTranslation(e,i,s),this.applyMatrix4(Zi),this}scale(e,i,s){return Zi.makeScale(e,i,s),this.applyMatrix4(Zi),this}lookAt(e){return Yh.lookAt(e),Yh.updateMatrix(),this.applyMatrix4(Yh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this}setFromPoints(e){const i=this.getAttribute("position");if(i===void 0){const s=[];for(let l=0,c=e.length;l<c;l++){const d=e[l];s.push(d.x,d.y,d.z||0)}this.setAttribute("position",new va(s,3))}else{for(let s=0,l=i.count;s<l;s++){const c=e[s];i.setXYZ(s,c.x,c.y,c.z||0)}e.length>i.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),i.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lr);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new vt(-1/0,-1/0,-1/0),new vt(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),i)for(let s=0,l=i.length;s<l;s++){const c=i[s];Ii.setFromBufferAttribute(c),this.morphTargetsRelative?(ei.addVectors(this.boundingBox.min,Ii.min),this.boundingBox.expandByPoint(ei),ei.addVectors(this.boundingBox.max,Ii.max),this.boundingBox.expandByPoint(ei)):(this.boundingBox.expandByPoint(Ii.min),this.boundingBox.expandByPoint(Ii.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cr);const e=this.attributes.position,i=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new vt,1/0);return}if(e){const s=this.boundingSphere.center;if(Ii.setFromBufferAttribute(e),i)for(let c=0,d=i.length;c<d;c++){const h=i[c];cl.setFromBufferAttribute(h),this.morphTargetsRelative?(ei.addVectors(Ii.min,cl.min),Ii.expandByPoint(ei),ei.addVectors(Ii.max,cl.max),Ii.expandByPoint(ei)):(Ii.expandByPoint(cl.min),Ii.expandByPoint(cl.max))}Ii.getCenter(s);let l=0;for(let c=0,d=e.count;c<d;c++)ei.fromBufferAttribute(e,c),l=Math.max(l,s.distanceToSquared(ei));if(i)for(let c=0,d=i.length;c<d;c++){const h=i[c],p=this.morphTargetsRelative;for(let m=0,_=h.count;m<_;m++)ei.fromBufferAttribute(h,m),p&&(Zr.fromBufferAttribute(e,m),ei.add(Zr)),l=Math.max(l,s.distanceToSquared(ei))}this.boundingSphere.radius=Math.sqrt(l),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,i=this.attributes;if(e===null||i.position===void 0||i.normal===void 0||i.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const s=i.position,l=i.normal,c=i.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new wn(new Float32Array(4*s.count),4));const d=this.getAttribute("tangent"),h=[],p=[];for(let j=0;j<s.count;j++)h[j]=new vt,p[j]=new vt;const m=new vt,_=new vt,g=new vt,x=new An,S=new An,E=new An,T=new vt,M=new vt;function v(j,N,b){m.fromBufferAttribute(s,j),_.fromBufferAttribute(s,N),g.fromBufferAttribute(s,b),x.fromBufferAttribute(c,j),S.fromBufferAttribute(c,N),E.fromBufferAttribute(c,b),_.sub(m),g.sub(m),S.sub(x),E.sub(x);const B=1/(S.x*E.y-E.x*S.y);isFinite(B)&&(T.copy(_).multiplyScalar(E.y).addScaledVector(g,-S.y).multiplyScalar(B),M.copy(g).multiplyScalar(S.x).addScaledVector(_,-E.x).multiplyScalar(B),h[j].add(T),h[N].add(T),h[b].add(T),p[j].add(M),p[N].add(M),p[b].add(M))}let I=this.groups;I.length===0&&(I=[{start:0,count:e.count}]);for(let j=0,N=I.length;j<N;++j){const b=I[j],B=b.start,Y=b.count;for(let Z=B,nt=B+Y;Z<nt;Z+=3)v(e.getX(Z+0),e.getX(Z+1),e.getX(Z+2))}const F=new vt,z=new vt,Q=new vt,H=new vt;function D(j){Q.fromBufferAttribute(l,j),H.copy(Q);const N=h[j];F.copy(N),F.sub(Q.multiplyScalar(Q.dot(N))).normalize(),z.crossVectors(H,N);const B=z.dot(p[j])<0?-1:1;d.setXYZW(j,F.x,F.y,F.z,B)}for(let j=0,N=I.length;j<N;++j){const b=I[j],B=b.start,Y=b.count;for(let Z=B,nt=B+Y;Z<nt;Z+=3)D(e.getX(Z+0)),D(e.getX(Z+1)),D(e.getX(Z+2))}}computeVertexNormals(){const e=this.index,i=this.getAttribute("position");if(i!==void 0){let s=this.getAttribute("normal");if(s===void 0)s=new wn(new Float32Array(i.count*3),3),this.setAttribute("normal",s);else for(let x=0,S=s.count;x<S;x++)s.setXYZ(x,0,0,0);const l=new vt,c=new vt,d=new vt,h=new vt,p=new vt,m=new vt,_=new vt,g=new vt;if(e)for(let x=0,S=e.count;x<S;x+=3){const E=e.getX(x+0),T=e.getX(x+1),M=e.getX(x+2);l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,T),d.fromBufferAttribute(i,M),_.subVectors(d,c),g.subVectors(l,c),_.cross(g),h.fromBufferAttribute(s,E),p.fromBufferAttribute(s,T),m.fromBufferAttribute(s,M),h.add(_),p.add(_),m.add(_),s.setXYZ(E,h.x,h.y,h.z),s.setXYZ(T,p.x,p.y,p.z),s.setXYZ(M,m.x,m.y,m.z)}else for(let x=0,S=i.count;x<S;x+=3)l.fromBufferAttribute(i,x+0),c.fromBufferAttribute(i,x+1),d.fromBufferAttribute(i,x+2),_.subVectors(d,c),g.subVectors(l,c),_.cross(g),s.setXYZ(x+0,_.x,_.y,_.z),s.setXYZ(x+1,_.x,_.y,_.z),s.setXYZ(x+2,_.x,_.y,_.z);this.normalizeNormals(),s.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let i=0,s=e.count;i<s;i++)ei.fromBufferAttribute(e,i),ei.normalize(),e.setXYZ(i,ei.x,ei.y,ei.z)}toNonIndexed(){function e(h,p){const m=h.array,_=h.itemSize,g=h.normalized,x=new m.constructor(p.length*_);let S=0,E=0;for(let T=0,M=p.length;T<M;T++){h.isInterleavedBufferAttribute?S=p[T]*h.data.stride+h.offset:S=p[T]*_;for(let v=0;v<_;v++)x[E++]=m[S++]}return new wn(x,_,g)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const i=new Ri,s=this.index.array,l=this.attributes;for(const h in l){const p=l[h],m=e(p,s);i.setAttribute(h,m)}const c=this.morphAttributes;for(const h in c){const p=[],m=c[h];for(let _=0,g=m.length;_<g;_++){const x=m[_],S=e(x,s);p.push(S)}i.morphAttributes[h]=p}i.morphTargetsRelative=this.morphTargetsRelative;const d=this.groups;for(let h=0,p=d.length;h<p;h++){const m=d[h];i.addGroup(m.start,m.count,m.materialIndex)}return i}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const p=this.parameters;for(const m in p)p[m]!==void 0&&(e[m]=p[m]);return e}e.data={attributes:{}};const i=this.index;i!==null&&(e.data.index={type:i.array.constructor.name,array:Array.prototype.slice.call(i.array)});const s=this.attributes;for(const p in s){const m=s[p];e.data.attributes[p]=m.toJSON(e.data)}const l={};let c=!1;for(const p in this.morphAttributes){const m=this.morphAttributes[p],_=[];for(let g=0,x=m.length;g<x;g++){const S=m[g];_.push(S.toJSON(e.data))}_.length>0&&(l[p]=_,c=!0)}c&&(e.data.morphAttributes=l,e.data.morphTargetsRelative=this.morphTargetsRelative);const d=this.groups;d.length>0&&(e.data.groups=JSON.parse(JSON.stringify(d)));const h=this.boundingSphere;return h!==null&&(e.data.boundingSphere={center:h.center.toArray(),radius:h.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const i={};this.name=e.name;const s=e.index;s!==null&&this.setIndex(s.clone(i));const l=e.attributes;for(const m in l){const _=l[m];this.setAttribute(m,_.clone(i))}const c=e.morphAttributes;for(const m in c){const _=[],g=c[m];for(let x=0,S=g.length;x<S;x++)_.push(g[x].clone(i));this.morphAttributes[m]=_}this.morphTargetsRelative=e.morphTargetsRelative;const d=e.groups;for(let m=0,_=d.length;m<_;m++){const g=d[m];this.addGroup(g.start,g.count,g.materialIndex)}const h=e.boundingBox;h!==null&&(this.boundingBox=h.clone());const p=e.boundingSphere;return p!==null&&(this.boundingSphere=p.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const xv=new Dn,Ws=new lp,Hc=new cr,yv=new vt,Gc=new vt,Vc=new vt,kc=new vt,Zh=new vt,Xc=new vt,Mv=new vt,qc=new vt;class $i extends vi{constructor(e=new Ri,i=new A_){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}getVertexPosition(e,i){const s=this.geometry,l=s.attributes.position,c=s.morphAttributes.position,d=s.morphTargetsRelative;i.fromBufferAttribute(l,e);const h=this.morphTargetInfluences;if(c&&h){Xc.set(0,0,0);for(let p=0,m=c.length;p<m;p++){const _=h[p],g=c[p];_!==0&&(Zh.fromBufferAttribute(g,e),d?Xc.addScaledVector(Zh,_):Xc.addScaledVector(Zh.sub(i),_))}i.add(Xc)}return i}raycast(e,i){const s=this.geometry,l=this.material,c=this.matrixWorld;l!==void 0&&(s.boundingSphere===null&&s.computeBoundingSphere(),Hc.copy(s.boundingSphere),Hc.applyMatrix4(c),Ws.copy(e.ray).recast(e.near),!(Hc.containsPoint(Ws.origin)===!1&&(Ws.intersectSphere(Hc,yv)===null||Ws.origin.distanceToSquared(yv)>(e.far-e.near)**2))&&(xv.copy(c).invert(),Ws.copy(e.ray).applyMatrix4(xv),!(s.boundingBox!==null&&Ws.intersectsBox(s.boundingBox)===!1)&&this._computeIntersections(e,i,Ws)))}_computeIntersections(e,i,s){let l;const c=this.geometry,d=this.material,h=c.index,p=c.attributes.position,m=c.attributes.uv,_=c.attributes.uv1,g=c.attributes.normal,x=c.groups,S=c.drawRange;if(h!==null)if(Array.isArray(d))for(let E=0,T=x.length;E<T;E++){const M=x[E],v=d[M.materialIndex],I=Math.max(M.start,S.start),F=Math.min(h.count,Math.min(M.start+M.count,S.start+S.count));for(let z=I,Q=F;z<Q;z+=3){const H=h.getX(z),D=h.getX(z+1),j=h.getX(z+2);l=Wc(this,v,e,s,m,_,g,H,D,j),l&&(l.faceIndex=Math.floor(z/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),T=Math.min(h.count,S.start+S.count);for(let M=E,v=T;M<v;M+=3){const I=h.getX(M),F=h.getX(M+1),z=h.getX(M+2);l=Wc(this,d,e,s,m,_,g,I,F,z),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}else if(p!==void 0)if(Array.isArray(d))for(let E=0,T=x.length;E<T;E++){const M=x[E],v=d[M.materialIndex],I=Math.max(M.start,S.start),F=Math.min(p.count,Math.min(M.start+M.count,S.start+S.count));for(let z=I,Q=F;z<Q;z+=3){const H=z,D=z+1,j=z+2;l=Wc(this,v,e,s,m,_,g,H,D,j),l&&(l.faceIndex=Math.floor(z/3),l.face.materialIndex=M.materialIndex,i.push(l))}}else{const E=Math.max(0,S.start),T=Math.min(p.count,S.start+S.count);for(let M=E,v=T;M<v;M+=3){const I=M,F=M+1,z=M+2;l=Wc(this,d,e,s,m,_,g,I,F,z),l&&(l.faceIndex=Math.floor(M/3),i.push(l))}}}}function dS(r,e,i,s,l,c,d,h){let p;if(e.side===Ai?p=s.intersectTriangle(d,c,l,!0,h):p=s.intersectTriangle(l,c,d,e.side===As,h),p===null)return null;qc.copy(h),qc.applyMatrix4(r.matrixWorld);const m=i.ray.origin.distanceTo(qc);return m<i.near||m>i.far?null:{distance:m,point:qc.clone(),object:r}}function Wc(r,e,i,s,l,c,d,h,p,m){r.getVertexPosition(h,Gc),r.getVertexPosition(p,Vc),r.getVertexPosition(m,kc);const _=dS(r,e,i,s,Gc,Vc,kc,Mv);if(_){const g=new vt;Ji.getBarycoord(Mv,Gc,Vc,kc,g),l&&(_.uv=Ji.getInterpolatedAttribute(l,h,p,m,g,new An)),c&&(_.uv1=Ji.getInterpolatedAttribute(c,h,p,m,g,new An)),d&&(_.normal=Ji.getInterpolatedAttribute(d,h,p,m,g,new vt),_.normal.dot(s.direction)>0&&_.normal.multiplyScalar(-1));const x={a:h,b:p,c:m,normal:new vt,materialIndex:0};Ji.getNormal(Gc,Vc,kc,x.normal),_.face=x,_.barycoord=g}return _}class or extends Ri{constructor(e=1,i=1,s=1,l=1,c=1,d=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:i,depth:s,widthSegments:l,heightSegments:c,depthSegments:d};const h=this;l=Math.floor(l),c=Math.floor(c),d=Math.floor(d);const p=[],m=[],_=[],g=[];let x=0,S=0;E("z","y","x",-1,-1,s,i,e,d,c,0),E("z","y","x",1,-1,s,i,-e,d,c,1),E("x","z","y",1,1,e,s,i,l,d,2),E("x","z","y",1,-1,e,s,-i,l,d,3),E("x","y","z",1,-1,e,i,s,l,c,4),E("x","y","z",-1,-1,e,i,-s,l,c,5),this.setIndex(p),this.setAttribute("position",new va(m,3)),this.setAttribute("normal",new va(_,3)),this.setAttribute("uv",new va(g,2));function E(T,M,v,I,F,z,Q,H,D,j,N){const b=z/D,B=Q/j,Y=z/2,Z=Q/2,nt=H/2,_t=D+1,w=j+1;let X=0,G=0;const ot=new vt;for(let Dt=0;Dt<w;Dt++){const V=Dt*B-Z;for(let ct=0;ct<_t;ct++){const Lt=ct*b-Y;ot[T]=Lt*I,ot[M]=V*F,ot[v]=nt,m.push(ot.x,ot.y,ot.z),ot[T]=0,ot[M]=0,ot[v]=H>0?1:-1,_.push(ot.x,ot.y,ot.z),g.push(ct/D),g.push(1-Dt/j),X+=1}}for(let Dt=0;Dt<j;Dt++)for(let V=0;V<D;V++){const ct=x+V+_t*Dt,Lt=x+V+_t*(Dt+1),K=x+(V+1)+_t*(Dt+1),yt=x+(V+1)+_t*Dt;p.push(ct,Lt,yt),p.push(Lt,K,yt),G+=6}h.addGroup(S,G,N),S+=G,x+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new or(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function fo(r){const e={};for(const i in r){e[i]={};for(const s in r[i]){const l=r[i][s];l&&(l.isColor||l.isMatrix3||l.isMatrix4||l.isVector2||l.isVector3||l.isVector4||l.isTexture||l.isQuaternion)?l.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[i][s]=null):e[i][s]=l.clone():Array.isArray(l)?e[i][s]=l.slice():e[i][s]=l}}return e}function pi(r){const e={};for(let i=0;i<r.length;i++){const s=fo(r[i]);for(const l in s)e[l]=s[l]}return e}function pS(r){const e=[];for(let i=0;i<r.length;i++)e.push(r[i].clone());return e}function w_(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:un.workingColorSpace}const mS={clone:fo,merge:pi};var gS=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,vS=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class mi extends mo{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=gS,this.fragmentShader=vS,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=fo(e.uniforms),this.uniformsGroups=pS(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const i=super.toJSON(e);i.glslVersion=this.glslVersion,i.uniforms={};for(const l in this.uniforms){const d=this.uniforms[l].value;d&&d.isTexture?i.uniforms[l]={type:"t",value:d.toJSON(e).uuid}:d&&d.isColor?i.uniforms[l]={type:"c",value:d.getHex()}:d&&d.isVector2?i.uniforms[l]={type:"v2",value:d.toArray()}:d&&d.isVector3?i.uniforms[l]={type:"v3",value:d.toArray()}:d&&d.isVector4?i.uniforms[l]={type:"v4",value:d.toArray()}:d&&d.isMatrix3?i.uniforms[l]={type:"m3",value:d.toArray()}:d&&d.isMatrix4?i.uniforms[l]={type:"m4",value:d.toArray()}:i.uniforms[l]={value:d}}Object.keys(this.defines).length>0&&(i.defines=this.defines),i.vertexShader=this.vertexShader,i.fragmentShader=this.fragmentShader,i.lights=this.lights,i.clipping=this.clipping;const s={};for(const l in this.extensions)this.extensions[l]===!0&&(s[l]=!0);return Object.keys(s).length>0&&(i.extensions=s),i}}class D_ extends vi{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Dn,this.projectionMatrix=new Dn,this.projectionMatrixInverse=new Dn,this.coordinateSystem=Va}copy(e,i){return super.copy(e,i),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,i){super.updateWorldMatrix(e,i),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Ms=new vt,Sv=new An,Ev=new An;class Qi extends D_{constructor(e=50,i=1,s=.1,l=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=s,this.far=l,this.focus=10,this.aspect=i,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const i=.5*this.getFilmHeight()/e;this.fov=qd*2*Math.atan(i),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(fu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qd*2*Math.atan(Math.tan(fu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,i,s){Ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ms.x,Ms.y).multiplyScalar(-e/Ms.z),Ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),s.set(Ms.x,Ms.y).multiplyScalar(-e/Ms.z)}getViewSize(e,i){return this.getViewBounds(e,Sv,Ev),i.subVectors(Ev,Sv)}setViewOffset(e,i,s,l,c,d){this.aspect=e/i,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let i=e*Math.tan(fu*.5*this.fov)/this.zoom,s=2*i,l=this.aspect*s,c=-.5*l;const d=this.view;if(this.view!==null&&this.view.enabled){const p=d.fullWidth,m=d.fullHeight;c+=d.offsetX*l/p,i-=d.offsetY*s/m,l*=d.width/p,s*=d.height/m}const h=this.filmOffset;h!==0&&(c+=e*h/this.getFilmWidth()),this.projectionMatrix.makePerspective(c,c+l,i,i-s,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.fov=this.fov,i.object.zoom=this.zoom,i.object.near=this.near,i.object.far=this.far,i.object.focus=this.focus,i.object.aspect=this.aspect,this.view!==null&&(i.object.view=Object.assign({},this.view)),i.object.filmGauge=this.filmGauge,i.object.filmOffset=this.filmOffset,i}}const Kr=-90,Qr=1;class _S extends vi{constructor(e,i,s){super(),this.type="CubeCamera",this.renderTarget=s,this.coordinateSystem=null,this.activeMipmapLevel=0;const l=new Qi(Kr,Qr,e,i);l.layers=this.layers,this.add(l);const c=new Qi(Kr,Qr,e,i);c.layers=this.layers,this.add(c);const d=new Qi(Kr,Qr,e,i);d.layers=this.layers,this.add(d);const h=new Qi(Kr,Qr,e,i);h.layers=this.layers,this.add(h);const p=new Qi(Kr,Qr,e,i);p.layers=this.layers,this.add(p);const m=new Qi(Kr,Qr,e,i);m.layers=this.layers,this.add(m)}updateCoordinateSystem(){const e=this.coordinateSystem,i=this.children.concat(),[s,l,c,d,h,p]=i;for(const m of i)this.remove(m);if(e===Va)s.up.set(0,1,0),s.lookAt(1,0,0),l.up.set(0,1,0),l.lookAt(-1,0,0),c.up.set(0,0,-1),c.lookAt(0,1,0),d.up.set(0,0,1),d.lookAt(0,-1,0),h.up.set(0,1,0),h.lookAt(0,0,1),p.up.set(0,1,0),p.lookAt(0,0,-1);else if(e===pu)s.up.set(0,-1,0),s.lookAt(-1,0,0),l.up.set(0,-1,0),l.lookAt(1,0,0),c.up.set(0,0,1),c.lookAt(0,1,0),d.up.set(0,0,-1),d.lookAt(0,-1,0),h.up.set(0,-1,0),h.lookAt(0,0,1),p.up.set(0,-1,0),p.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const m of i)this.add(m),m.updateMatrixWorld()}update(e,i){this.parent===null&&this.updateMatrixWorld();const{renderTarget:s,activeMipmapLevel:l}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[c,d,h,p,m,_]=this.children,g=e.getRenderTarget(),x=e.getActiveCubeFace(),S=e.getActiveMipmapLevel(),E=e.xr.enabled;e.xr.enabled=!1;const T=s.texture.generateMipmaps;s.texture.generateMipmaps=!1,e.setRenderTarget(s,0,l),e.render(i,c),e.setRenderTarget(s,1,l),e.render(i,d),e.setRenderTarget(s,2,l),e.render(i,h),e.setRenderTarget(s,3,l),e.render(i,p),e.setRenderTarget(s,4,l),e.render(i,m),s.texture.generateMipmaps=T,e.setRenderTarget(s,5,l),e.render(i,_),e.setRenderTarget(g,x,S),e.xr.enabled=E,s.texture.needsPMREMUpdate=!0}}class U_ extends gi{constructor(e,i,s,l,c,d,h,p,m,_){e=e!==void 0?e:[],i=i!==void 0?i:oo,super(e,i,s,l,c,d,h,p,m,_),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class xS extends rr{constructor(e=1,i={}){super(e,e,i),this.isWebGLCubeRenderTarget=!0;const s={width:e,height:e,depth:1},l=[s,s,s,s,s,s];this.texture=new U_(l,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=i.generateMipmaps!==void 0?i.generateMipmaps:!1,this.texture.minFilter=i.minFilter!==void 0?i.minFilter:ma}fromEquirectangularTexture(e,i){this.texture.type=i.type,this.texture.colorSpace=i.colorSpace,this.texture.generateMipmaps=i.generateMipmaps,this.texture.minFilter=i.minFilter,this.texture.magFilter=i.magFilter;const s={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},l=new or(5,5,5),c=new mi({name:"CubemapFromEquirect",uniforms:fo(s.uniforms),vertexShader:s.vertexShader,fragmentShader:s.fragmentShader,side:Ai,blending:Es});c.uniforms.tEquirect.value=i;const d=new $i(l,c),h=i.minFilter;return i.minFilter===er&&(i.minFilter=ma),new _S(1,10,this).update(e,d),i.minFilter=h,d.geometry.dispose(),d.material.dispose(),this}clear(e,i,s,l){const c=e.getRenderTarget();for(let d=0;d<6;d++)e.setRenderTarget(this,d),e.clear(i,s,l);e.setRenderTarget(c)}}const Kh=new vt,yS=new vt,MS=new Ve;class Ks{constructor(e=new vt(1,0,0),i=0){this.isPlane=!0,this.normal=e,this.constant=i}set(e,i){return this.normal.copy(e),this.constant=i,this}setComponents(e,i,s,l){return this.normal.set(e,i,s),this.constant=l,this}setFromNormalAndCoplanarPoint(e,i){return this.normal.copy(e),this.constant=-i.dot(this.normal),this}setFromCoplanarPoints(e,i,s){const l=Kh.subVectors(s,i).cross(yS.subVectors(e,i)).normalize();return this.setFromNormalAndCoplanarPoint(l,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,i){return i.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,i){const s=e.delta(Kh),l=this.normal.dot(s);if(l===0)return this.distanceToPoint(e.start)===0?i.copy(e.start):null;const c=-(e.start.dot(this.normal)+this.constant)/l;return c<0||c>1?null:i.copy(e.start).addScaledVector(s,c)}intersectsLine(e){const i=this.distanceToPoint(e.start),s=this.distanceToPoint(e.end);return i<0&&s>0||s<0&&i>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,i){const s=i||MS.getNormalMatrix(e),l=this.coplanarPoint(Kh).applyMatrix4(e),c=this.normal.applyMatrix3(s).normalize();return this.constant=-l.dot(c),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const js=new cr,jc=new vt;class L_{constructor(e=new Ks,i=new Ks,s=new Ks,l=new Ks,c=new Ks,d=new Ks){this.planes=[e,i,s,l,c,d]}set(e,i,s,l,c,d){const h=this.planes;return h[0].copy(e),h[1].copy(i),h[2].copy(s),h[3].copy(l),h[4].copy(c),h[5].copy(d),this}copy(e){const i=this.planes;for(let s=0;s<6;s++)i[s].copy(e.planes[s]);return this}setFromProjectionMatrix(e,i=Va){const s=this.planes,l=e.elements,c=l[0],d=l[1],h=l[2],p=l[3],m=l[4],_=l[5],g=l[6],x=l[7],S=l[8],E=l[9],T=l[10],M=l[11],v=l[12],I=l[13],F=l[14],z=l[15];if(s[0].setComponents(p-c,x-m,M-S,z-v).normalize(),s[1].setComponents(p+c,x+m,M+S,z+v).normalize(),s[2].setComponents(p+d,x+_,M+E,z+I).normalize(),s[3].setComponents(p-d,x-_,M-E,z-I).normalize(),s[4].setComponents(p-h,x-g,M-T,z-F).normalize(),i===Va)s[5].setComponents(p+h,x+g,M+T,z+F).normalize();else if(i===pu)s[5].setComponents(h,g,T,F).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+i);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),js.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const i=e.geometry;i.boundingSphere===null&&i.computeBoundingSphere(),js.copy(i.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(js)}intersectsSprite(e){return js.center.set(0,0,0),js.radius=.7071067811865476,js.applyMatrix4(e.matrixWorld),this.intersectsSphere(js)}intersectsSphere(e){const i=this.planes,s=e.center,l=-e.radius;for(let c=0;c<6;c++)if(i[c].distanceToPoint(s)<l)return!1;return!0}intersectsBox(e){const i=this.planes;for(let s=0;s<6;s++){const l=i[s];if(jc.x=l.normal.x>0?e.max.x:e.min.x,jc.y=l.normal.y>0?e.max.y:e.min.y,jc.z=l.normal.z>0?e.max.z:e.min.z,l.distanceToPoint(jc)<0)return!1}return!0}containsPoint(e){const i=this.planes;for(let s=0;s<6;s++)if(i[s].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function N_(){let r=null,e=!1,i=null,s=null;function l(c,d){i(c,d),s=r.requestAnimationFrame(l)}return{start:function(){e!==!0&&i!==null&&(s=r.requestAnimationFrame(l),e=!0)},stop:function(){r.cancelAnimationFrame(s),e=!1},setAnimationLoop:function(c){i=c},setContext:function(c){r=c}}}function SS(r){const e=new WeakMap;function i(h,p){const m=h.array,_=h.usage,g=m.byteLength,x=r.createBuffer();r.bindBuffer(p,x),r.bufferData(p,m,_),h.onUploadCallback();let S;if(m instanceof Float32Array)S=r.FLOAT;else if(m instanceof Uint16Array)h.isFloat16BufferAttribute?S=r.HALF_FLOAT:S=r.UNSIGNED_SHORT;else if(m instanceof Int16Array)S=r.SHORT;else if(m instanceof Uint32Array)S=r.UNSIGNED_INT;else if(m instanceof Int32Array)S=r.INT;else if(m instanceof Int8Array)S=r.BYTE;else if(m instanceof Uint8Array)S=r.UNSIGNED_BYTE;else if(m instanceof Uint8ClampedArray)S=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+m);return{buffer:x,type:S,bytesPerElement:m.BYTES_PER_ELEMENT,version:h.version,size:g}}function s(h,p,m){const _=p.array,g=p.updateRanges;if(r.bindBuffer(m,h),g.length===0)r.bufferSubData(m,0,_);else{g.sort((S,E)=>S.start-E.start);let x=0;for(let S=1;S<g.length;S++){const E=g[x],T=g[S];T.start<=E.start+E.count+1?E.count=Math.max(E.count,T.start+T.count-E.start):(++x,g[x]=T)}g.length=x+1;for(let S=0,E=g.length;S<E;S++){const T=g[S];r.bufferSubData(m,T.start*_.BYTES_PER_ELEMENT,_,T.start,T.count)}p.clearUpdateRanges()}p.onUploadCallback()}function l(h){return h.isInterleavedBufferAttribute&&(h=h.data),e.get(h)}function c(h){h.isInterleavedBufferAttribute&&(h=h.data);const p=e.get(h);p&&(r.deleteBuffer(p.buffer),e.delete(h))}function d(h,p){if(h.isInterleavedBufferAttribute&&(h=h.data),h.isGLBufferAttribute){const _=e.get(h);(!_||_.version<h.version)&&e.set(h,{buffer:h.buffer,type:h.type,bytesPerElement:h.elementSize,version:h.version});return}const m=e.get(h);if(m===void 0)e.set(h,i(h,p));else if(m.version<h.version){if(m.size!==h.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");s(m.buffer,h,p),m.version=h.version}}return{get:l,remove:c,update:d}}class Mu extends Ri{constructor(e=1,i=1,s=1,l=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:i,widthSegments:s,heightSegments:l};const c=e/2,d=i/2,h=Math.floor(s),p=Math.floor(l),m=h+1,_=p+1,g=e/h,x=i/p,S=[],E=[],T=[],M=[];for(let v=0;v<_;v++){const I=v*x-d;for(let F=0;F<m;F++){const z=F*g-c;E.push(z,-I,0),T.push(0,0,1),M.push(F/h),M.push(1-v/p)}}for(let v=0;v<p;v++)for(let I=0;I<h;I++){const F=I+m*v,z=I+m*(v+1),Q=I+1+m*(v+1),H=I+1+m*v;S.push(F,z,H),S.push(z,Q,H)}this.setIndex(S),this.setAttribute("position",new va(E,3)),this.setAttribute("normal",new va(T,3)),this.setAttribute("uv",new va(M,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mu(e.width,e.height,e.widthSegments,e.heightSegments)}}var ES=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,bS=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,TS=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,AS=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,RS=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,CS=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wS=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,DS=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,US=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,LS=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,NS=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,OS=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zS=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,PS=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,BS=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,IS=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,FS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,HS=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,GS=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,VS=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,kS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,XS=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qS=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,WS=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,jS=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,YS=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,ZS=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,KS=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,QS=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,JS=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,$S="gl_FragColor = linearToOutputTexel( gl_FragColor );",tE=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,eE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,nE=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,iE=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,aE=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,sE=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,rE=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,oE=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,lE=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,cE=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,uE=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,fE=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,hE=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,dE=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,pE=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,mE=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,gE=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,vE=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_E=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xE=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yE=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,ME=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,SE=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,EE=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,bE=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,TE=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,AE=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,RE=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,CE=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,wE=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,DE=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,UE=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,LE=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,NE=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,OE=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,zE=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,PE=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,BE=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,IE=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,FE=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,HE=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,GE=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,VE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kE=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,XE=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qE=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,WE=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,jE=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,YE=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,ZE=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,KE=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,QE=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,JE=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,$E=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,tb=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,eb=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,nb=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ib=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ab=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,sb=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,rb=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,ob=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,lb=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,cb=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,ub=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,fb=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,hb=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,db=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,pb=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,mb=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,gb=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,vb=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_b=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,xb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yb=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Mb=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sb=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Eb=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Tb=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ab=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rb=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,wb=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Db=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Ub=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Lb=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nb=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ob=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,zb=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Pb=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bb=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ib=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fb=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Hb=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Gb=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vb=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,kb=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Xb=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qb=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wb=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jb=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yb=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zb=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kb=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Qb=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jb=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$b=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,t1=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,e1=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:ES,alphahash_pars_fragment:bS,alphamap_fragment:TS,alphamap_pars_fragment:AS,alphatest_fragment:RS,alphatest_pars_fragment:CS,aomap_fragment:wS,aomap_pars_fragment:DS,batching_pars_vertex:US,batching_vertex:LS,begin_vertex:NS,beginnormal_vertex:OS,bsdfs:zS,iridescence_fragment:PS,bumpmap_pars_fragment:BS,clipping_planes_fragment:IS,clipping_planes_pars_fragment:FS,clipping_planes_pars_vertex:HS,clipping_planes_vertex:GS,color_fragment:VS,color_pars_fragment:kS,color_pars_vertex:XS,color_vertex:qS,common:WS,cube_uv_reflection_fragment:jS,defaultnormal_vertex:YS,displacementmap_pars_vertex:ZS,displacementmap_vertex:KS,emissivemap_fragment:QS,emissivemap_pars_fragment:JS,colorspace_fragment:$S,colorspace_pars_fragment:tE,envmap_fragment:eE,envmap_common_pars_fragment:nE,envmap_pars_fragment:iE,envmap_pars_vertex:aE,envmap_physical_pars_fragment:mE,envmap_vertex:sE,fog_vertex:rE,fog_pars_vertex:oE,fog_fragment:lE,fog_pars_fragment:cE,gradientmap_pars_fragment:uE,lightmap_pars_fragment:fE,lights_lambert_fragment:hE,lights_lambert_pars_fragment:dE,lights_pars_begin:pE,lights_toon_fragment:gE,lights_toon_pars_fragment:vE,lights_phong_fragment:_E,lights_phong_pars_fragment:xE,lights_physical_fragment:yE,lights_physical_pars_fragment:ME,lights_fragment_begin:SE,lights_fragment_maps:EE,lights_fragment_end:bE,logdepthbuf_fragment:TE,logdepthbuf_pars_fragment:AE,logdepthbuf_pars_vertex:RE,logdepthbuf_vertex:CE,map_fragment:wE,map_pars_fragment:DE,map_particle_fragment:UE,map_particle_pars_fragment:LE,metalnessmap_fragment:NE,metalnessmap_pars_fragment:OE,morphinstance_vertex:zE,morphcolor_vertex:PE,morphnormal_vertex:BE,morphtarget_pars_vertex:IE,morphtarget_vertex:FE,normal_fragment_begin:HE,normal_fragment_maps:GE,normal_pars_fragment:VE,normal_pars_vertex:kE,normal_vertex:XE,normalmap_pars_fragment:qE,clearcoat_normal_fragment_begin:WE,clearcoat_normal_fragment_maps:jE,clearcoat_pars_fragment:YE,iridescence_pars_fragment:ZE,opaque_fragment:KE,packing:QE,premultiplied_alpha_fragment:JE,project_vertex:$E,dithering_fragment:tb,dithering_pars_fragment:eb,roughnessmap_fragment:nb,roughnessmap_pars_fragment:ib,shadowmap_pars_fragment:ab,shadowmap_pars_vertex:sb,shadowmap_vertex:rb,shadowmask_pars_fragment:ob,skinbase_vertex:lb,skinning_pars_vertex:cb,skinning_vertex:ub,skinnormal_vertex:fb,specularmap_fragment:hb,specularmap_pars_fragment:db,tonemapping_fragment:pb,tonemapping_pars_fragment:mb,transmission_fragment:gb,transmission_pars_fragment:vb,uv_pars_fragment:_b,uv_pars_vertex:xb,uv_vertex:yb,worldpos_vertex:Mb,background_vert:Sb,background_frag:Eb,backgroundCube_vert:bb,backgroundCube_frag:Tb,cube_vert:Ab,cube_frag:Rb,depth_vert:Cb,depth_frag:wb,distanceRGBA_vert:Db,distanceRGBA_frag:Ub,equirect_vert:Lb,equirect_frag:Nb,linedashed_vert:Ob,linedashed_frag:zb,meshbasic_vert:Pb,meshbasic_frag:Bb,meshlambert_vert:Ib,meshlambert_frag:Fb,meshmatcap_vert:Hb,meshmatcap_frag:Gb,meshnormal_vert:Vb,meshnormal_frag:kb,meshphong_vert:Xb,meshphong_frag:qb,meshphysical_vert:Wb,meshphysical_frag:jb,meshtoon_vert:Yb,meshtoon_frag:Zb,points_vert:Kb,points_frag:Qb,shadow_vert:Jb,shadow_frag:$b,sprite_vert:t1,sprite_frag:e1},le={common:{diffuse:{value:new an(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new An(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new an(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new an(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new an(16777215)},opacity:{value:1},center:{value:new An(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},da={basic:{uniforms:pi([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:pi([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new an(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:pi([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new an(0)},specular:{value:new an(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:pi([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new an(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:pi([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new an(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:pi([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:pi([le.points,le.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:pi([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:pi([le.common,le.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:pi([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:pi([le.sprite,le.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:pi([le.common,le.displacementmap,{referencePosition:{value:new vt},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:pi([le.lights,le.fog,{color:{value:new an(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};da.physical={uniforms:pi([da.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new An(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new an(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new An},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new an(0)},specularColor:{value:new an(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new An},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const Yc={r:0,b:0,g:0},Ys=new qa,n1=new Dn;function i1(r,e,i,s,l,c,d){const h=new an(0);let p=c===!0?0:1,m,_,g=null,x=0,S=null;function E(I){let F=I.isScene===!0?I.background:null;return F&&F.isTexture&&(F=(I.backgroundBlurriness>0?i:e).get(F)),F}function T(I){let F=!1;const z=E(I);z===null?v(h,p):z&&z.isColor&&(v(z,1),F=!0);const Q=r.xr.getEnvironmentBlendMode();Q==="additive"?s.buffers.color.setClear(0,0,0,1,d):Q==="alpha-blend"&&s.buffers.color.setClear(0,0,0,0,d),(r.autoClear||F)&&(s.buffers.depth.setTest(!0),s.buffers.depth.setMask(!0),s.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function M(I,F){const z=E(F);z&&(z.isCubeTexture||z.mapping===xu)?(_===void 0&&(_=new $i(new or(1,1,1),new mi({name:"BackgroundCubeMaterial",uniforms:fo(da.backgroundCube.uniforms),vertexShader:da.backgroundCube.vertexShader,fragmentShader:da.backgroundCube.fragmentShader,side:Ai,depthTest:!1,depthWrite:!1,fog:!1})),_.geometry.deleteAttribute("normal"),_.geometry.deleteAttribute("uv"),_.onBeforeRender=function(Q,H,D){this.matrixWorld.copyPosition(D.matrixWorld)},Object.defineProperty(_.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),l.update(_)),Ys.copy(F.backgroundRotation),Ys.x*=-1,Ys.y*=-1,Ys.z*=-1,z.isCubeTexture&&z.isRenderTargetTexture===!1&&(Ys.y*=-1,Ys.z*=-1),_.material.uniforms.envMap.value=z,_.material.uniforms.flipEnvMap.value=z.isCubeTexture&&z.isRenderTargetTexture===!1?-1:1,_.material.uniforms.backgroundBlurriness.value=F.backgroundBlurriness,_.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,_.material.uniforms.backgroundRotation.value.setFromMatrix4(n1.makeRotationFromEuler(Ys)),_.material.toneMapped=un.getTransfer(z.colorSpace)!==En,(g!==z||x!==z.version||S!==r.toneMapping)&&(_.material.needsUpdate=!0,g=z,x=z.version,S=r.toneMapping),_.layers.enableAll(),I.unshift(_,_.geometry,_.material,0,0,null)):z&&z.isTexture&&(m===void 0&&(m=new $i(new Mu(2,2),new mi({name:"BackgroundMaterial",uniforms:fo(da.background.uniforms),vertexShader:da.background.vertexShader,fragmentShader:da.background.fragmentShader,side:As,depthTest:!1,depthWrite:!1,fog:!1})),m.geometry.deleteAttribute("normal"),Object.defineProperty(m.material,"map",{get:function(){return this.uniforms.t2D.value}}),l.update(m)),m.material.uniforms.t2D.value=z,m.material.uniforms.backgroundIntensity.value=F.backgroundIntensity,m.material.toneMapped=un.getTransfer(z.colorSpace)!==En,z.matrixAutoUpdate===!0&&z.updateMatrix(),m.material.uniforms.uvTransform.value.copy(z.matrix),(g!==z||x!==z.version||S!==r.toneMapping)&&(m.material.needsUpdate=!0,g=z,x=z.version,S=r.toneMapping),m.layers.enableAll(),I.unshift(m,m.geometry,m.material,0,0,null))}function v(I,F){I.getRGB(Yc,w_(r)),s.buffers.color.setClear(Yc.r,Yc.g,Yc.b,F,d)}return{getClearColor:function(){return h},setClearColor:function(I,F=1){h.set(I),p=F,v(h,p)},getClearAlpha:function(){return p},setClearAlpha:function(I){p=I,v(h,p)},render:T,addToRenderList:M}}function a1(r,e){const i=r.getParameter(r.MAX_VERTEX_ATTRIBS),s={},l=x(null);let c=l,d=!1;function h(b,B,Y,Z,nt){let _t=!1;const w=g(Z,Y,B);c!==w&&(c=w,m(c.object)),_t=S(b,Z,Y,nt),_t&&E(b,Z,Y,nt),nt!==null&&e.update(nt,r.ELEMENT_ARRAY_BUFFER),(_t||d)&&(d=!1,z(b,B,Y,Z),nt!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(nt).buffer))}function p(){return r.createVertexArray()}function m(b){return r.bindVertexArray(b)}function _(b){return r.deleteVertexArray(b)}function g(b,B,Y){const Z=Y.wireframe===!0;let nt=s[b.id];nt===void 0&&(nt={},s[b.id]=nt);let _t=nt[B.id];_t===void 0&&(_t={},nt[B.id]=_t);let w=_t[Z];return w===void 0&&(w=x(p()),_t[Z]=w),w}function x(b){const B=[],Y=[],Z=[];for(let nt=0;nt<i;nt++)B[nt]=0,Y[nt]=0,Z[nt]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:Y,attributeDivisors:Z,object:b,attributes:{},index:null}}function S(b,B,Y,Z){const nt=c.attributes,_t=B.attributes;let w=0;const X=Y.getAttributes();for(const G in X)if(X[G].location>=0){const Dt=nt[G];let V=_t[G];if(V===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(V=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(V=b.instanceColor)),Dt===void 0||Dt.attribute!==V||V&&Dt.data!==V.data)return!0;w++}return c.attributesNum!==w||c.index!==Z}function E(b,B,Y,Z){const nt={},_t=B.attributes;let w=0;const X=Y.getAttributes();for(const G in X)if(X[G].location>=0){let Dt=_t[G];Dt===void 0&&(G==="instanceMatrix"&&b.instanceMatrix&&(Dt=b.instanceMatrix),G==="instanceColor"&&b.instanceColor&&(Dt=b.instanceColor));const V={};V.attribute=Dt,Dt&&Dt.data&&(V.data=Dt.data),nt[G]=V,w++}c.attributes=nt,c.attributesNum=w,c.index=Z}function T(){const b=c.newAttributes;for(let B=0,Y=b.length;B<Y;B++)b[B]=0}function M(b){v(b,0)}function v(b,B){const Y=c.newAttributes,Z=c.enabledAttributes,nt=c.attributeDivisors;Y[b]=1,Z[b]===0&&(r.enableVertexAttribArray(b),Z[b]=1),nt[b]!==B&&(r.vertexAttribDivisor(b,B),nt[b]=B)}function I(){const b=c.newAttributes,B=c.enabledAttributes;for(let Y=0,Z=B.length;Y<Z;Y++)B[Y]!==b[Y]&&(r.disableVertexAttribArray(Y),B[Y]=0)}function F(b,B,Y,Z,nt,_t,w){w===!0?r.vertexAttribIPointer(b,B,Y,nt,_t):r.vertexAttribPointer(b,B,Y,Z,nt,_t)}function z(b,B,Y,Z){T();const nt=Z.attributes,_t=Y.getAttributes(),w=B.defaultAttributeValues;for(const X in _t){const G=_t[X];if(G.location>=0){let ot=nt[X];if(ot===void 0&&(X==="instanceMatrix"&&b.instanceMatrix&&(ot=b.instanceMatrix),X==="instanceColor"&&b.instanceColor&&(ot=b.instanceColor)),ot!==void 0){const Dt=ot.normalized,V=ot.itemSize,ct=e.get(ot);if(ct===void 0)continue;const Lt=ct.buffer,K=ct.type,yt=ct.bytesPerElement,Ft=K===r.INT||K===r.UNSIGNED_INT||ot.gpuType===ep;if(ot.isInterleavedBufferAttribute){const wt=ot.data,zt=wt.stride,ae=ot.offset;if(wt.isInstancedInterleavedBuffer){for(let xe=0;xe<G.locationSize;xe++)v(G.location+xe,wt.meshPerAttribute);b.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let xe=0;xe<G.locationSize;xe++)M(G.location+xe);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let xe=0;xe<G.locationSize;xe++)F(G.location+xe,V/G.locationSize,K,Dt,zt*yt,(ae+V/G.locationSize*xe)*yt,Ft)}else{if(ot.isInstancedBufferAttribute){for(let wt=0;wt<G.locationSize;wt++)v(G.location+wt,ot.meshPerAttribute);b.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ot.meshPerAttribute*ot.count)}else for(let wt=0;wt<G.locationSize;wt++)M(G.location+wt);r.bindBuffer(r.ARRAY_BUFFER,Lt);for(let wt=0;wt<G.locationSize;wt++)F(G.location+wt,V/G.locationSize,K,Dt,V*yt,V/G.locationSize*wt*yt,Ft)}}else if(w!==void 0){const Dt=w[X];if(Dt!==void 0)switch(Dt.length){case 2:r.vertexAttrib2fv(G.location,Dt);break;case 3:r.vertexAttrib3fv(G.location,Dt);break;case 4:r.vertexAttrib4fv(G.location,Dt);break;default:r.vertexAttrib1fv(G.location,Dt)}}}}I()}function Q(){j();for(const b in s){const B=s[b];for(const Y in B){const Z=B[Y];for(const nt in Z)_(Z[nt].object),delete Z[nt];delete B[Y]}delete s[b]}}function H(b){if(s[b.id]===void 0)return;const B=s[b.id];for(const Y in B){const Z=B[Y];for(const nt in Z)_(Z[nt].object),delete Z[nt];delete B[Y]}delete s[b.id]}function D(b){for(const B in s){const Y=s[B];if(Y[b.id]===void 0)continue;const Z=Y[b.id];for(const nt in Z)_(Z[nt].object),delete Z[nt];delete Y[b.id]}}function j(){N(),d=!0,c!==l&&(c=l,m(c.object))}function N(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:h,reset:j,resetDefaultState:N,dispose:Q,releaseStatesOfGeometry:H,releaseStatesOfProgram:D,initAttributes:T,enableAttribute:M,disableUnusedAttributes:I}}function s1(r,e,i){let s;function l(m){s=m}function c(m,_){r.drawArrays(s,m,_),i.update(_,s,1)}function d(m,_,g){g!==0&&(r.drawArraysInstanced(s,m,_,g),i.update(_,s,g))}function h(m,_,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(s,m,0,_,0,g);let S=0;for(let E=0;E<g;E++)S+=_[E];i.update(S,s,1)}function p(m,_,g,x){if(g===0)return;const S=e.get("WEBGL_multi_draw");if(S===null)for(let E=0;E<m.length;E++)d(m[E],_[E],x[E]);else{S.multiDrawArraysInstancedWEBGL(s,m,0,_,0,x,0,g);let E=0;for(let T=0;T<g;T++)E+=_[T]*x[T];i.update(E,s,1)}}this.setMode=l,this.render=c,this.renderInstances=d,this.renderMultiDraw=h,this.renderMultiDrawInstances=p}function r1(r,e,i,s){let l;function c(){if(l!==void 0)return l;if(e.has("EXT_texture_filter_anisotropic")===!0){const D=e.get("EXT_texture_filter_anisotropic");l=r.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else l=0;return l}function d(D){return!(D!==oa&&s.convert(D)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function h(D){const j=D===Ml&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(D!==Xa&&s.convert(D)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&D!==ga&&!j)}function p(D){if(D==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";D="mediump"}return D==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let m=i.precision!==void 0?i.precision:"highp";const _=p(m);_!==m&&(console.warn("THREE.WebGLRenderer:",m,"not supported, using",_,"instead."),m=_);const g=i.logarithmicDepthBuffer===!0,x=i.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),S=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),E=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),T=r.getParameter(r.MAX_TEXTURE_SIZE),M=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),v=r.getParameter(r.MAX_VERTEX_ATTRIBS),I=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),F=r.getParameter(r.MAX_VARYING_VECTORS),z=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),Q=E>0,H=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:c,getMaxPrecision:p,textureFormatReadable:d,textureTypeReadable:h,precision:m,logarithmicDepthBuffer:g,reverseDepthBuffer:x,maxTextures:S,maxVertexTextures:E,maxTextureSize:T,maxCubemapSize:M,maxAttributes:v,maxVertexUniforms:I,maxVaryings:F,maxFragmentUniforms:z,vertexTextures:Q,maxSamples:H}}function o1(r){const e=this;let i=null,s=0,l=!1,c=!1;const d=new Ks,h=new Ve,p={value:null,needsUpdate:!1};this.uniform=p,this.numPlanes=0,this.numIntersection=0,this.init=function(g,x){const S=g.length!==0||x||s!==0||l;return l=x,s=g.length,S},this.beginShadows=function(){c=!0,_(null)},this.endShadows=function(){c=!1},this.setGlobalState=function(g,x){i=_(g,x,0)},this.setState=function(g,x,S){const E=g.clippingPlanes,T=g.clipIntersection,M=g.clipShadows,v=r.get(g);if(!l||E===null||E.length===0||c&&!M)c?_(null):m();else{const I=c?0:s,F=I*4;let z=v.clippingState||null;p.value=z,z=_(E,x,F,S);for(let Q=0;Q!==F;++Q)z[Q]=i[Q];v.clippingState=z,this.numIntersection=T?this.numPlanes:0,this.numPlanes+=I}};function m(){p.value!==i&&(p.value=i,p.needsUpdate=s>0),e.numPlanes=s,e.numIntersection=0}function _(g,x,S,E){const T=g!==null?g.length:0;let M=null;if(T!==0){if(M=p.value,E!==!0||M===null){const v=S+T*4,I=x.matrixWorldInverse;h.getNormalMatrix(I),(M===null||M.length<v)&&(M=new Float32Array(v));for(let F=0,z=S;F!==T;++F,z+=4)d.copy(g[F]).applyMatrix4(I,h),d.normal.toArray(M,z),M[z+3]=d.constant}p.value=M,p.needsUpdate=!0}return e.numPlanes=T,e.numIntersection=0,M}}function l1(r){let e=new WeakMap;function i(d,h){return h===md?d.mapping=oo:h===gd&&(d.mapping=lo),d}function s(d){if(d&&d.isTexture){const h=d.mapping;if(h===md||h===gd)if(e.has(d)){const p=e.get(d).texture;return i(p,d.mapping)}else{const p=d.image;if(p&&p.height>0){const m=new xS(p.height);return m.fromEquirectangularTexture(r,d),e.set(d,m),d.addEventListener("dispose",l),i(m.texture,d.mapping)}else return null}}return d}function l(d){const h=d.target;h.removeEventListener("dispose",l);const p=e.get(h);p!==void 0&&(e.delete(h),p.dispose())}function c(){e=new WeakMap}return{get:s,dispose:c}}class O_ extends D_{constructor(e=-1,i=1,s=1,l=-1,c=.1,d=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=i,this.top=s,this.bottom=l,this.near=c,this.far=d,this.updateProjectionMatrix()}copy(e,i){return super.copy(e,i),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,i,s,l,c,d){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=i,this.view.offsetX=s,this.view.offsetY=l,this.view.width=c,this.view.height=d,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),i=(this.top-this.bottom)/(2*this.zoom),s=(this.right+this.left)/2,l=(this.top+this.bottom)/2;let c=s-e,d=s+e,h=l+i,p=l-i;if(this.view!==null&&this.view.enabled){const m=(this.right-this.left)/this.view.fullWidth/this.zoom,_=(this.top-this.bottom)/this.view.fullHeight/this.zoom;c+=m*this.view.offsetX,d=c+m*this.view.width,h-=_*this.view.offsetY,p=h-_*this.view.height}this.projectionMatrix.makeOrthographic(c,d,h,p,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const i=super.toJSON(e);return i.object.zoom=this.zoom,i.object.left=this.left,i.object.right=this.right,i.object.top=this.top,i.object.bottom=this.bottom,i.object.near=this.near,i.object.far=this.far,this.view!==null&&(i.object.view=Object.assign({},this.view)),i}}const no=4,bv=[.125,.215,.35,.446,.526,.582],$s=20,Qh=new O_,Tv=new an;let Jh=null,$h=0,td=0,ed=!1;const Qs=(1+Math.sqrt(5))/2,Jr=1/Qs,Av=[new vt(-Qs,Jr,0),new vt(Qs,Jr,0),new vt(-Jr,0,Qs),new vt(Jr,0,Qs),new vt(0,Qs,-Jr),new vt(0,Qs,Jr),new vt(-1,1,-1),new vt(1,1,-1),new vt(-1,1,1),new vt(1,1,1)];class Rv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,i=0,s=.1,l=100){Jh=this._renderer.getRenderTarget(),$h=this._renderer.getActiveCubeFace(),td=this._renderer.getActiveMipmapLevel(),ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,s,l,c),i>0&&this._blur(c,0,0,i),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,i=null){return this._fromTexture(e,i)}fromCubemap(e,i=null){return this._fromTexture(e,i)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Dv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Jh,$h,td),this._renderer.xr.enabled=ed,e.scissorTest=!1,Zc(e,0,0,e.width,e.height)}_fromTexture(e,i){e.mapping===oo||e.mapping===lo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Jh=this._renderer.getRenderTarget(),$h=this._renderer.getActiveCubeFace(),td=this._renderer.getActiveMipmapLevel(),ed=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const s=i||this._allocateTargets();return this._textureToCubeUV(e,s),this._applyPMREM(s),this._cleanup(s),s}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),i=4*this._cubeSize,s={magFilter:ma,minFilter:ma,generateMipmaps:!1,type:Ml,format:oa,colorSpace:ho,depthBuffer:!1},l=Cv(e,i,s);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==i){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Cv(e,i,s);const{_lodMax:c}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=c1(c)),this._blurMaterial=u1(c,e,i)}return l}_compileMaterial(e){const i=new $i(this._lodPlanes[0],e);this._renderer.compile(i,Qh)}_sceneToCubeUV(e,i,s,l){const h=new Qi(90,1,i,s),p=[1,-1,1,1,1,1],m=[1,1,1,-1,-1,-1],_=this._renderer,g=_.autoClear,x=_.toneMapping;_.getClearColor(Tv),_.toneMapping=bs,_.autoClear=!1;const S=new A_({name:"PMREM.Background",side:Ai,depthWrite:!1,depthTest:!1}),E=new $i(new or,S);let T=!1;const M=e.background;M?M.isColor&&(S.color.copy(M),e.background=null,T=!0):(S.color.copy(Tv),T=!0);for(let v=0;v<6;v++){const I=v%3;I===0?(h.up.set(0,p[v],0),h.lookAt(m[v],0,0)):I===1?(h.up.set(0,0,p[v]),h.lookAt(0,m[v],0)):(h.up.set(0,p[v],0),h.lookAt(0,0,m[v]));const F=this._cubeSize;Zc(l,I*F,v>2?F:0,F,F),_.setRenderTarget(l),T&&_.render(E,h),_.render(e,h)}E.geometry.dispose(),E.material.dispose(),_.toneMapping=x,_.autoClear=g,e.background=M}_textureToCubeUV(e,i){const s=this._renderer,l=e.mapping===oo||e.mapping===lo;l?(this._cubemapMaterial===null&&(this._cubemapMaterial=Dv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wv());const c=l?this._cubemapMaterial:this._equirectMaterial,d=new $i(this._lodPlanes[0],c),h=c.uniforms;h.envMap.value=e;const p=this._cubeSize;Zc(i,0,0,3*p,2*p),s.setRenderTarget(i),s.render(d,Qh)}_applyPMREM(e){const i=this._renderer,s=i.autoClear;i.autoClear=!1;const l=this._lodPlanes.length;for(let c=1;c<l;c++){const d=Math.sqrt(this._sigmas[c]*this._sigmas[c]-this._sigmas[c-1]*this._sigmas[c-1]),h=Av[(l-c-1)%Av.length];this._blur(e,c-1,c,d,h)}i.autoClear=s}_blur(e,i,s,l,c){const d=this._pingPongRenderTarget;this._halfBlur(e,d,i,s,l,"latitudinal",c),this._halfBlur(d,e,s,s,l,"longitudinal",c)}_halfBlur(e,i,s,l,c,d,h){const p=this._renderer,m=this._blurMaterial;d!=="latitudinal"&&d!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const _=3,g=new $i(this._lodPlanes[l],m),x=m.uniforms,S=this._sizeLods[s]-1,E=isFinite(c)?Math.PI/(2*S):2*Math.PI/(2*$s-1),T=c/E,M=isFinite(c)?1+Math.floor(_*T):$s;M>$s&&console.warn(`sigmaRadians, ${c}, is too large and will clip, as it requested ${M} samples when the maximum is set to ${$s}`);const v=[];let I=0;for(let D=0;D<$s;++D){const j=D/T,N=Math.exp(-j*j/2);v.push(N),D===0?I+=N:D<M&&(I+=2*N)}for(let D=0;D<v.length;D++)v[D]=v[D]/I;x.envMap.value=e.texture,x.samples.value=M,x.weights.value=v,x.latitudinal.value=d==="latitudinal",h&&(x.poleAxis.value=h);const{_lodMax:F}=this;x.dTheta.value=E,x.mipInt.value=F-s;const z=this._sizeLods[l],Q=3*z*(l>F-no?l-F+no:0),H=4*(this._cubeSize-z);Zc(i,Q,H,3*z,2*z),p.setRenderTarget(i),p.render(g,Qh)}}function c1(r){const e=[],i=[],s=[];let l=r;const c=r-no+1+bv.length;for(let d=0;d<c;d++){const h=Math.pow(2,l);i.push(h);let p=1/h;d>r-no?p=bv[d-r+no-1]:d===0&&(p=0),s.push(p);const m=1/(h-2),_=-m,g=1+m,x=[_,_,g,_,g,g,_,_,g,g,_,g],S=6,E=6,T=3,M=2,v=1,I=new Float32Array(T*E*S),F=new Float32Array(M*E*S),z=new Float32Array(v*E*S);for(let H=0;H<S;H++){const D=H%3*2/3-1,j=H>2?0:-1,N=[D,j,0,D+2/3,j,0,D+2/3,j+1,0,D,j,0,D+2/3,j+1,0,D,j+1,0];I.set(N,T*E*H),F.set(x,M*E*H);const b=[H,H,H,H,H,H];z.set(b,v*E*H)}const Q=new Ri;Q.setAttribute("position",new wn(I,T)),Q.setAttribute("uv",new wn(F,M)),Q.setAttribute("faceIndex",new wn(z,v)),e.push(Q),l>no&&l--}return{lodPlanes:e,sizeLods:i,sigmas:s}}function Cv(r,e,i){const s=new rr(r,e,i);return s.texture.mapping=xu,s.texture.name="PMREM.cubeUv",s.scissorTest=!0,s}function Zc(r,e,i,s,l){r.viewport.set(e,i,s,l),r.scissor.set(e,i,s,l)}function u1(r,e,i){const s=new Float32Array($s),l=new vt(0,1,0);return new mi({name:"SphericalGaussianBlur",defines:{n:$s,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/i,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:s},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:cp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Es,depthTest:!1,depthWrite:!1})}function wv(){return new mi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:cp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Es,depthTest:!1,depthWrite:!1})}function Dv(){return new mi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:cp(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Es,depthTest:!1,depthWrite:!1})}function cp(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function f1(r){let e=new WeakMap,i=null;function s(h){if(h&&h.isTexture){const p=h.mapping,m=p===md||p===gd,_=p===oo||p===lo;if(m||_){let g=e.get(h);const x=g!==void 0?g.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==x)return i===null&&(i=new Rv(r)),g=m?i.fromEquirectangular(h,g):i.fromCubemap(h,g),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),g.texture;if(g!==void 0)return g.texture;{const S=h.image;return m&&S&&S.height>0||_&&S&&l(S)?(i===null&&(i=new Rv(r)),g=m?i.fromEquirectangular(h):i.fromCubemap(h),g.texture.pmremVersion=h.pmremVersion,e.set(h,g),h.addEventListener("dispose",c),g.texture):null}}}return h}function l(h){let p=0;const m=6;for(let _=0;_<m;_++)h[_]!==void 0&&p++;return p===m}function c(h){const p=h.target;p.removeEventListener("dispose",c);const m=e.get(p);m!==void 0&&(e.delete(p),m.dispose())}function d(){e=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function h1(r){const e={};function i(s){if(e[s]!==void 0)return e[s];let l;switch(s){case"WEBGL_depth_texture":l=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":l=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":l=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":l=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:l=r.getExtension(s)}return e[s]=l,l}return{has:function(s){return i(s)!==null},init:function(){i("EXT_color_buffer_float"),i("WEBGL_clip_cull_distance"),i("OES_texture_float_linear"),i("EXT_color_buffer_half_float"),i("WEBGL_multisampled_render_to_texture"),i("WEBGL_render_shared_exponent")},get:function(s){const l=i(s);return l===null&&ml("THREE.WebGLRenderer: "+s+" extension not supported."),l}}}function d1(r,e,i,s){const l={},c=new WeakMap;function d(g){const x=g.target;x.index!==null&&e.remove(x.index);for(const E in x.attributes)e.remove(x.attributes[E]);for(const E in x.morphAttributes){const T=x.morphAttributes[E];for(let M=0,v=T.length;M<v;M++)e.remove(T[M])}x.removeEventListener("dispose",d),delete l[x.id];const S=c.get(x);S&&(e.remove(S),c.delete(x)),s.releaseStatesOfGeometry(x),x.isInstancedBufferGeometry===!0&&delete x._maxInstanceCount,i.memory.geometries--}function h(g,x){return l[x.id]===!0||(x.addEventListener("dispose",d),l[x.id]=!0,i.memory.geometries++),x}function p(g){const x=g.attributes;for(const E in x)e.update(x[E],r.ARRAY_BUFFER);const S=g.morphAttributes;for(const E in S){const T=S[E];for(let M=0,v=T.length;M<v;M++)e.update(T[M],r.ARRAY_BUFFER)}}function m(g){const x=[],S=g.index,E=g.attributes.position;let T=0;if(S!==null){const I=S.array;T=S.version;for(let F=0,z=I.length;F<z;F+=3){const Q=I[F+0],H=I[F+1],D=I[F+2];x.push(Q,H,H,D,D,Q)}}else if(E!==void 0){const I=E.array;T=E.version;for(let F=0,z=I.length/3-1;F<z;F+=3){const Q=F+0,H=F+1,D=F+2;x.push(Q,H,H,D,D,Q)}}else return;const M=new(M_(x)?C_:R_)(x,1);M.version=T;const v=c.get(g);v&&e.remove(v),c.set(g,M)}function _(g){const x=c.get(g);if(x){const S=g.index;S!==null&&x.version<S.version&&m(g)}else m(g);return c.get(g)}return{get:h,update:p,getWireframeAttribute:_}}function p1(r,e,i){let s;function l(x){s=x}let c,d;function h(x){c=x.type,d=x.bytesPerElement}function p(x,S){r.drawElements(s,S,c,x*d),i.update(S,s,1)}function m(x,S,E){E!==0&&(r.drawElementsInstanced(s,S,c,x*d,E),i.update(S,s,E))}function _(x,S,E){if(E===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(s,S,0,c,x,0,E);let M=0;for(let v=0;v<E;v++)M+=S[v];i.update(M,s,1)}function g(x,S,E,T){if(E===0)return;const M=e.get("WEBGL_multi_draw");if(M===null)for(let v=0;v<x.length;v++)m(x[v]/d,S[v],T[v]);else{M.multiDrawElementsInstancedWEBGL(s,S,0,c,x,0,T,0,E);let v=0;for(let I=0;I<E;I++)v+=S[I]*T[I];i.update(v,s,1)}}this.setMode=l,this.setIndex=h,this.render=p,this.renderInstances=m,this.renderMultiDraw=_,this.renderMultiDrawInstances=g}function m1(r){const e={geometries:0,textures:0},i={frame:0,calls:0,triangles:0,points:0,lines:0};function s(c,d,h){switch(i.calls++,d){case r.TRIANGLES:i.triangles+=h*(c/3);break;case r.LINES:i.lines+=h*(c/2);break;case r.LINE_STRIP:i.lines+=h*(c-1);break;case r.LINE_LOOP:i.lines+=h*c;break;case r.POINTS:i.points+=h*c;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",d);break}}function l(){i.calls=0,i.triangles=0,i.points=0,i.lines=0}return{memory:e,render:i,programs:null,autoReset:!0,reset:l,update:s}}function g1(r,e,i){const s=new WeakMap,l=new Xn;function c(d,h,p){const m=d.morphTargetInfluences,_=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,g=_!==void 0?_.length:0;let x=s.get(h);if(x===void 0||x.count!==g){let b=function(){j.dispose(),s.delete(h),h.removeEventListener("dispose",b)};var S=b;x!==void 0&&x.texture.dispose();const E=h.morphAttributes.position!==void 0,T=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,v=h.morphAttributes.position||[],I=h.morphAttributes.normal||[],F=h.morphAttributes.color||[];let z=0;E===!0&&(z=1),T===!0&&(z=2),M===!0&&(z=3);let Q=h.attributes.position.count*z,H=1;Q>e.maxTextureSize&&(H=Math.ceil(Q/e.maxTextureSize),Q=e.maxTextureSize);const D=new Float32Array(Q*H*4*g),j=new E_(D,Q,H,g);j.type=ga,j.needsUpdate=!0;const N=z*4;for(let B=0;B<g;B++){const Y=v[B],Z=I[B],nt=F[B],_t=Q*H*4*B;for(let w=0;w<Y.count;w++){const X=w*N;E===!0&&(l.fromBufferAttribute(Y,w),D[_t+X+0]=l.x,D[_t+X+1]=l.y,D[_t+X+2]=l.z,D[_t+X+3]=0),T===!0&&(l.fromBufferAttribute(Z,w),D[_t+X+4]=l.x,D[_t+X+5]=l.y,D[_t+X+6]=l.z,D[_t+X+7]=0),M===!0&&(l.fromBufferAttribute(nt,w),D[_t+X+8]=l.x,D[_t+X+9]=l.y,D[_t+X+10]=l.z,D[_t+X+11]=nt.itemSize===4?l.w:1)}}x={count:g,texture:j,size:new An(Q,H)},s.set(h,x),h.addEventListener("dispose",b)}if(d.isInstancedMesh===!0&&d.morphTexture!==null)p.getUniforms().setValue(r,"morphTexture",d.morphTexture,i);else{let E=0;for(let M=0;M<m.length;M++)E+=m[M];const T=h.morphTargetsRelative?1:1-E;p.getUniforms().setValue(r,"morphTargetBaseInfluence",T),p.getUniforms().setValue(r,"morphTargetInfluences",m)}p.getUniforms().setValue(r,"morphTargetsTexture",x.texture,i),p.getUniforms().setValue(r,"morphTargetsTextureSize",x.size)}return{update:c}}function v1(r,e,i,s){let l=new WeakMap;function c(p){const m=s.render.frame,_=p.geometry,g=e.get(p,_);if(l.get(g)!==m&&(e.update(g),l.set(g,m)),p.isInstancedMesh&&(p.hasEventListener("dispose",h)===!1&&p.addEventListener("dispose",h),l.get(p)!==m&&(i.update(p.instanceMatrix,r.ARRAY_BUFFER),p.instanceColor!==null&&i.update(p.instanceColor,r.ARRAY_BUFFER),l.set(p,m))),p.isSkinnedMesh){const x=p.skeleton;l.get(x)!==m&&(x.update(),l.set(x,m))}return g}function d(){l=new WeakMap}function h(p){const m=p.target;m.removeEventListener("dispose",h),i.remove(m.instanceMatrix),m.instanceColor!==null&&i.remove(m.instanceColor)}return{update:c,dispose:d}}class z_ extends gi{constructor(e,i,s,l,c,d,h,p,m,_=ao){if(_!==ao&&_!==uo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");s===void 0&&_===ao&&(s=sr),s===void 0&&_===uo&&(s=co),super(null,l,c,d,h,p,_,s,m),this.isDepthTexture=!0,this.image={width:e,height:i},this.magFilter=h!==void 0?h:Fi,this.minFilter=p!==void 0?p:Fi,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const i=super.toJSON(e);return this.compareFunction!==null&&(i.compareFunction=this.compareFunction),i}}const P_=new gi,Uv=new z_(1,1),B_=new E_,I_=new iS,F_=new U_,Lv=[],Nv=[],Ov=new Float32Array(16),zv=new Float32Array(9),Pv=new Float32Array(4);function go(r,e,i){const s=r[0];if(s<=0||s>0)return r;const l=e*i;let c=Lv[l];if(c===void 0&&(c=new Float32Array(l),Lv[l]=c),e!==0){s.toArray(c,0);for(let d=1,h=0;d!==e;++d)h+=i,r[d].toArray(c,h)}return c}function Jn(r,e){if(r.length!==e.length)return!1;for(let i=0,s=r.length;i<s;i++)if(r[i]!==e[i])return!1;return!0}function $n(r,e){for(let i=0,s=e.length;i<s;i++)r[i]=e[i]}function Su(r,e){let i=Nv[e];i===void 0&&(i=new Int32Array(e),Nv[e]=i);for(let s=0;s!==e;++s)i[s]=r.allocateTextureUnit();return i}function _1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1f(this.addr,e),i[0]=e)}function x1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Jn(i,e))return;r.uniform2fv(this.addr,e),$n(i,e)}}function y1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else if(e.r!==void 0)(i[0]!==e.r||i[1]!==e.g||i[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),i[0]=e.r,i[1]=e.g,i[2]=e.b);else{if(Jn(i,e))return;r.uniform3fv(this.addr,e),$n(i,e)}}function M1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Jn(i,e))return;r.uniform4fv(this.addr,e),$n(i,e)}}function S1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Jn(i,e))return;r.uniformMatrix2fv(this.addr,!1,e),$n(i,e)}else{if(Jn(i,s))return;Pv.set(s),r.uniformMatrix2fv(this.addr,!1,Pv),$n(i,s)}}function E1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Jn(i,e))return;r.uniformMatrix3fv(this.addr,!1,e),$n(i,e)}else{if(Jn(i,s))return;zv.set(s),r.uniformMatrix3fv(this.addr,!1,zv),$n(i,s)}}function b1(r,e){const i=this.cache,s=e.elements;if(s===void 0){if(Jn(i,e))return;r.uniformMatrix4fv(this.addr,!1,e),$n(i,e)}else{if(Jn(i,s))return;Ov.set(s),r.uniformMatrix4fv(this.addr,!1,Ov),$n(i,s)}}function T1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1i(this.addr,e),i[0]=e)}function A1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Jn(i,e))return;r.uniform2iv(this.addr,e),$n(i,e)}}function R1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Jn(i,e))return;r.uniform3iv(this.addr,e),$n(i,e)}}function C1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Jn(i,e))return;r.uniform4iv(this.addr,e),$n(i,e)}}function w1(r,e){const i=this.cache;i[0]!==e&&(r.uniform1ui(this.addr,e),i[0]=e)}function D1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),i[0]=e.x,i[1]=e.y);else{if(Jn(i,e))return;r.uniform2uiv(this.addr,e),$n(i,e)}}function U1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),i[0]=e.x,i[1]=e.y,i[2]=e.z);else{if(Jn(i,e))return;r.uniform3uiv(this.addr,e),$n(i,e)}}function L1(r,e){const i=this.cache;if(e.x!==void 0)(i[0]!==e.x||i[1]!==e.y||i[2]!==e.z||i[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),i[0]=e.x,i[1]=e.y,i[2]=e.z,i[3]=e.w);else{if(Jn(i,e))return;r.uniform4uiv(this.addr,e),$n(i,e)}}function N1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l);let c;this.type===r.SAMPLER_2D_SHADOW?(Uv.compareFunction=y_,c=Uv):c=P_,i.setTexture2D(e||c,l)}function O1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture3D(e||I_,l)}function z1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTextureCube(e||F_,l)}function P1(r,e,i){const s=this.cache,l=i.allocateTextureUnit();s[0]!==l&&(r.uniform1i(this.addr,l),s[0]=l),i.setTexture2DArray(e||B_,l)}function B1(r){switch(r){case 5126:return _1;case 35664:return x1;case 35665:return y1;case 35666:return M1;case 35674:return S1;case 35675:return E1;case 35676:return b1;case 5124:case 35670:return T1;case 35667:case 35671:return A1;case 35668:case 35672:return R1;case 35669:case 35673:return C1;case 5125:return w1;case 36294:return D1;case 36295:return U1;case 36296:return L1;case 35678:case 36198:case 36298:case 36306:case 35682:return N1;case 35679:case 36299:case 36307:return O1;case 35680:case 36300:case 36308:case 36293:return z1;case 36289:case 36303:case 36311:case 36292:return P1}}function I1(r,e){r.uniform1fv(this.addr,e)}function F1(r,e){const i=go(e,this.size,2);r.uniform2fv(this.addr,i)}function H1(r,e){const i=go(e,this.size,3);r.uniform3fv(this.addr,i)}function G1(r,e){const i=go(e,this.size,4);r.uniform4fv(this.addr,i)}function V1(r,e){const i=go(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,i)}function k1(r,e){const i=go(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,i)}function X1(r,e){const i=go(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,i)}function q1(r,e){r.uniform1iv(this.addr,e)}function W1(r,e){r.uniform2iv(this.addr,e)}function j1(r,e){r.uniform3iv(this.addr,e)}function Y1(r,e){r.uniform4iv(this.addr,e)}function Z1(r,e){r.uniform1uiv(this.addr,e)}function K1(r,e){r.uniform2uiv(this.addr,e)}function Q1(r,e){r.uniform3uiv(this.addr,e)}function J1(r,e){r.uniform4uiv(this.addr,e)}function $1(r,e,i){const s=this.cache,l=e.length,c=Su(i,l);Jn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let d=0;d!==l;++d)i.setTexture2D(e[d]||P_,c[d])}function tT(r,e,i){const s=this.cache,l=e.length,c=Su(i,l);Jn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let d=0;d!==l;++d)i.setTexture3D(e[d]||I_,c[d])}function eT(r,e,i){const s=this.cache,l=e.length,c=Su(i,l);Jn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let d=0;d!==l;++d)i.setTextureCube(e[d]||F_,c[d])}function nT(r,e,i){const s=this.cache,l=e.length,c=Su(i,l);Jn(s,c)||(r.uniform1iv(this.addr,c),$n(s,c));for(let d=0;d!==l;++d)i.setTexture2DArray(e[d]||B_,c[d])}function iT(r){switch(r){case 5126:return I1;case 35664:return F1;case 35665:return H1;case 35666:return G1;case 35674:return V1;case 35675:return k1;case 35676:return X1;case 5124:case 35670:return q1;case 35667:case 35671:return W1;case 35668:case 35672:return j1;case 35669:case 35673:return Y1;case 5125:return Z1;case 36294:return K1;case 36295:return Q1;case 36296:return J1;case 35678:case 36198:case 36298:case 36306:case 35682:return $1;case 35679:case 36299:case 36307:return tT;case 35680:case 36300:case 36308:case 36293:return eT;case 36289:case 36303:case 36311:case 36292:return nT}}class aT{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.setValue=B1(i.type)}}class sT{constructor(e,i,s){this.id=e,this.addr=s,this.cache=[],this.type=i.type,this.size=i.size,this.setValue=iT(i.type)}}class rT{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,i,s){const l=this.seq;for(let c=0,d=l.length;c!==d;++c){const h=l[c];h.setValue(e,i[h.id],s)}}}const nd=/(\w+)(\])?(\[|\.)?/g;function Bv(r,e){r.seq.push(e),r.map[e.id]=e}function oT(r,e,i){const s=r.name,l=s.length;for(nd.lastIndex=0;;){const c=nd.exec(s),d=nd.lastIndex;let h=c[1];const p=c[2]==="]",m=c[3];if(p&&(h=h|0),m===void 0||m==="["&&d+2===l){Bv(i,m===void 0?new aT(h,r,e):new sT(h,r,e));break}else{let g=i.map[h];g===void 0&&(g=new rT(h),Bv(i,g)),i=g}}}class hu{constructor(e,i){this.seq=[],this.map={};const s=e.getProgramParameter(i,e.ACTIVE_UNIFORMS);for(let l=0;l<s;++l){const c=e.getActiveUniform(i,l),d=e.getUniformLocation(i,c.name);oT(c,d,this)}}setValue(e,i,s,l){const c=this.map[i];c!==void 0&&c.setValue(e,s,l)}setOptional(e,i,s){const l=i[s];l!==void 0&&this.setValue(e,s,l)}static upload(e,i,s,l){for(let c=0,d=i.length;c!==d;++c){const h=i[c],p=s[h.id];p.needsUpdate!==!1&&h.setValue(e,p.value,l)}}static seqWithValue(e,i){const s=[];for(let l=0,c=e.length;l!==c;++l){const d=e[l];d.id in i&&s.push(d)}return s}}function Iv(r,e,i){const s=r.createShader(e);return r.shaderSource(s,i),r.compileShader(s),s}const lT=37297;let cT=0;function uT(r,e){const i=r.split(`
`),s=[],l=Math.max(e-6,0),c=Math.min(e+6,i.length);for(let d=l;d<c;d++){const h=d+1;s.push(`${h===e?">":" "} ${h}: ${i[d]}`)}return s.join(`
`)}const Fv=new Ve;function fT(r){un._getMatrix(Fv,un.workingColorSpace,r);const e=`mat3( ${Fv.elements.map(i=>i.toFixed(4))} )`;switch(un.getTransfer(r)){case yu:return[e,"LinearTransferOETF"];case En:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Hv(r,e,i){const s=r.getShaderParameter(e,r.COMPILE_STATUS),l=r.getShaderInfoLog(e).trim();if(s&&l==="")return"";const c=/ERROR: 0:(\d+)/.exec(l);if(c){const d=parseInt(c[1]);return i.toUpperCase()+`

`+l+`

`+uT(r.getShaderSource(e),d)}else return l}function hT(r,e){const i=fT(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${i[1]}( vec4( value.rgb * ${i[0]}, value.a ) );`,"}"].join(`
`)}function dT(r,e){let i;switch(e){case wM:i="Linear";break;case DM:i="Reinhard";break;case UM:i="Cineon";break;case LM:i="ACESFilmic";break;case OM:i="AgX";break;case zM:i="Neutral";break;case NM:i="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),i="Linear"}return"vec3 "+r+"( vec3 color ) { return "+i+"ToneMapping( color ); }"}const Kc=new vt;function pT(){un.getLuminanceCoefficients(Kc);const r=Kc.x.toFixed(4),e=Kc.y.toFixed(4),i=Kc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${i} );`,"	return dot( weights, rgb );","}"].join(`
`)}function mT(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gl).join(`
`)}function gT(r){const e=[];for(const i in r){const s=r[i];s!==!1&&e.push("#define "+i+" "+s)}return e.join(`
`)}function vT(r,e){const i={},s=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let l=0;l<s;l++){const c=r.getActiveAttrib(e,l),d=c.name;let h=1;c.type===r.FLOAT_MAT2&&(h=2),c.type===r.FLOAT_MAT3&&(h=3),c.type===r.FLOAT_MAT4&&(h=4),i[d]={type:c.type,location:r.getAttribLocation(e,d),locationSize:h}}return i}function gl(r){return r!==""}function Gv(r,e){const i=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,i).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Vv(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const _T=/^[ \t]*#include +<([\w\d./]+)>/gm;function Wd(r){return r.replace(_T,yT)}const xT=new Map;function yT(r,e){let i=je[e];if(i===void 0){const s=xT.get(e);if(s!==void 0)i=je[s],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,s);else throw new Error("Can not resolve #include <"+e+">")}return Wd(i)}const MT=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function kv(r){return r.replace(MT,ST)}function ST(r,e,i,s){let l="";for(let c=parseInt(e);c<parseInt(i);c++)l+=s.replace(/\[\s*i\s*\]/g,"[ "+c+" ]").replace(/UNROLLED_LOOP_INDEX/g,c);return l}function Xv(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ET(r){let e="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===l_?e="SHADOWMAP_TYPE_PCF":r.shadowMapType===lM?e="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===Fa&&(e="SHADOWMAP_TYPE_VSM"),e}function bT(r){let e="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case oo:case lo:e="ENVMAP_TYPE_CUBE";break;case xu:e="ENVMAP_TYPE_CUBE_UV";break}return e}function TT(r){let e="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===lo&&(e="ENVMAP_MODE_REFRACTION"),e}function AT(r){let e="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case c_:e="ENVMAP_BLENDING_MULTIPLY";break;case RM:e="ENVMAP_BLENDING_MIX";break;case CM:e="ENVMAP_BLENDING_ADD";break}return e}function RT(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const i=Math.log2(e)-2,s=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,i),112)),texelHeight:s,maxMip:i}}function CT(r,e,i,s){const l=r.getContext(),c=i.defines;let d=i.vertexShader,h=i.fragmentShader;const p=ET(i),m=bT(i),_=TT(i),g=AT(i),x=RT(i),S=mT(i),E=gT(c),T=l.createProgram();let M,v,I=i.glslVersion?"#version "+i.glslVersion+`
`:"";i.isRawShaderMaterial?(M=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(gl).join(`
`),M.length>0&&(M+=`
`),v=["#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E].filter(gl).join(`
`),v.length>0&&(v+=`
`)):(M=[Xv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",i.batching?"#define USE_BATCHING":"",i.batchingColor?"#define USE_BATCHING_COLOR":"",i.instancing?"#define USE_INSTANCING":"",i.instancingColor?"#define USE_INSTANCING_COLOR":"",i.instancingMorph?"#define USE_INSTANCING_MORPH":"",i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.map?"#define USE_MAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+_:"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.displacementMap?"#define USE_DISPLACEMENTMAP":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.mapUv?"#define MAP_UV "+i.mapUv:"",i.alphaMapUv?"#define ALPHAMAP_UV "+i.alphaMapUv:"",i.lightMapUv?"#define LIGHTMAP_UV "+i.lightMapUv:"",i.aoMapUv?"#define AOMAP_UV "+i.aoMapUv:"",i.emissiveMapUv?"#define EMISSIVEMAP_UV "+i.emissiveMapUv:"",i.bumpMapUv?"#define BUMPMAP_UV "+i.bumpMapUv:"",i.normalMapUv?"#define NORMALMAP_UV "+i.normalMapUv:"",i.displacementMapUv?"#define DISPLACEMENTMAP_UV "+i.displacementMapUv:"",i.metalnessMapUv?"#define METALNESSMAP_UV "+i.metalnessMapUv:"",i.roughnessMapUv?"#define ROUGHNESSMAP_UV "+i.roughnessMapUv:"",i.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+i.anisotropyMapUv:"",i.clearcoatMapUv?"#define CLEARCOATMAP_UV "+i.clearcoatMapUv:"",i.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+i.clearcoatNormalMapUv:"",i.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+i.clearcoatRoughnessMapUv:"",i.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+i.iridescenceMapUv:"",i.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+i.iridescenceThicknessMapUv:"",i.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+i.sheenColorMapUv:"",i.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+i.sheenRoughnessMapUv:"",i.specularMapUv?"#define SPECULARMAP_UV "+i.specularMapUv:"",i.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+i.specularColorMapUv:"",i.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+i.specularIntensityMapUv:"",i.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+i.transmissionMapUv:"",i.thicknessMapUv?"#define THICKNESSMAP_UV "+i.thicknessMapUv:"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.flatShading?"#define FLAT_SHADED":"",i.skinning?"#define USE_SKINNING":"",i.morphTargets?"#define USE_MORPHTARGETS":"",i.morphNormals&&i.flatShading===!1?"#define USE_MORPHNORMALS":"",i.morphColors?"#define USE_MORPHCOLORS":"",i.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+i.morphTextureStride:"",i.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+i.morphTargetsCount:"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.sizeAttenuation?"#define USE_SIZEATTENUATION":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gl).join(`
`),v=[Xv(i),"#define SHADER_TYPE "+i.shaderType,"#define SHADER_NAME "+i.shaderName,E,i.useFog&&i.fog?"#define USE_FOG":"",i.useFog&&i.fogExp2?"#define FOG_EXP2":"",i.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",i.map?"#define USE_MAP":"",i.matcap?"#define USE_MATCAP":"",i.envMap?"#define USE_ENVMAP":"",i.envMap?"#define "+m:"",i.envMap?"#define "+_:"",i.envMap?"#define "+g:"",x?"#define CUBEUV_TEXEL_WIDTH "+x.texelWidth:"",x?"#define CUBEUV_TEXEL_HEIGHT "+x.texelHeight:"",x?"#define CUBEUV_MAX_MIP "+x.maxMip+".0":"",i.lightMap?"#define USE_LIGHTMAP":"",i.aoMap?"#define USE_AOMAP":"",i.bumpMap?"#define USE_BUMPMAP":"",i.normalMap?"#define USE_NORMALMAP":"",i.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",i.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",i.emissiveMap?"#define USE_EMISSIVEMAP":"",i.anisotropy?"#define USE_ANISOTROPY":"",i.anisotropyMap?"#define USE_ANISOTROPYMAP":"",i.clearcoat?"#define USE_CLEARCOAT":"",i.clearcoatMap?"#define USE_CLEARCOATMAP":"",i.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",i.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",i.dispersion?"#define USE_DISPERSION":"",i.iridescence?"#define USE_IRIDESCENCE":"",i.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",i.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",i.specularMap?"#define USE_SPECULARMAP":"",i.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",i.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",i.roughnessMap?"#define USE_ROUGHNESSMAP":"",i.metalnessMap?"#define USE_METALNESSMAP":"",i.alphaMap?"#define USE_ALPHAMAP":"",i.alphaTest?"#define USE_ALPHATEST":"",i.alphaHash?"#define USE_ALPHAHASH":"",i.sheen?"#define USE_SHEEN":"",i.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",i.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",i.transmission?"#define USE_TRANSMISSION":"",i.transmissionMap?"#define USE_TRANSMISSIONMAP":"",i.thicknessMap?"#define USE_THICKNESSMAP":"",i.vertexTangents&&i.flatShading===!1?"#define USE_TANGENT":"",i.vertexColors||i.instancingColor||i.batchingColor?"#define USE_COLOR":"",i.vertexAlphas?"#define USE_COLOR_ALPHA":"",i.vertexUv1s?"#define USE_UV1":"",i.vertexUv2s?"#define USE_UV2":"",i.vertexUv3s?"#define USE_UV3":"",i.pointsUvs?"#define USE_POINTS_UV":"",i.gradientMap?"#define USE_GRADIENTMAP":"",i.flatShading?"#define FLAT_SHADED":"",i.doubleSided?"#define DOUBLE_SIDED":"",i.flipSided?"#define FLIP_SIDED":"",i.shadowMapEnabled?"#define USE_SHADOWMAP":"",i.shadowMapEnabled?"#define "+p:"",i.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",i.numLightProbes>0?"#define USE_LIGHT_PROBES":"",i.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",i.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",i.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",i.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",i.toneMapping!==bs?"#define TONE_MAPPING":"",i.toneMapping!==bs?je.tonemapping_pars_fragment:"",i.toneMapping!==bs?dT("toneMapping",i.toneMapping):"",i.dithering?"#define DITHERING":"",i.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,hT("linearToOutputTexel",i.outputColorSpace),pT(),i.useDepthPacking?"#define DEPTH_PACKING "+i.depthPacking:"",`
`].filter(gl).join(`
`)),d=Wd(d),d=Gv(d,i),d=Vv(d,i),h=Wd(h),h=Gv(h,i),h=Vv(h,i),d=kv(d),h=kv(h),i.isRawShaderMaterial!==!0&&(I=`#version 300 es
`,M=[S,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+M,v=["#define varying in",i.glslVersion===iv?"":"layout(location = 0) out highp vec4 pc_fragColor;",i.glslVersion===iv?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+v);const F=I+M+d,z=I+v+h,Q=Iv(l,l.VERTEX_SHADER,F),H=Iv(l,l.FRAGMENT_SHADER,z);l.attachShader(T,Q),l.attachShader(T,H),i.index0AttributeName!==void 0?l.bindAttribLocation(T,0,i.index0AttributeName):i.morphTargets===!0&&l.bindAttribLocation(T,0,"position"),l.linkProgram(T);function D(B){if(r.debug.checkShaderErrors){const Y=l.getProgramInfoLog(T).trim(),Z=l.getShaderInfoLog(Q).trim(),nt=l.getShaderInfoLog(H).trim();let _t=!0,w=!0;if(l.getProgramParameter(T,l.LINK_STATUS)===!1)if(_t=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(l,T,Q,H);else{const X=Hv(l,Q,"vertex"),G=Hv(l,H,"fragment");console.error("THREE.WebGLProgram: Shader Error "+l.getError()+" - VALIDATE_STATUS "+l.getProgramParameter(T,l.VALIDATE_STATUS)+`

Material Name: `+B.name+`
Material Type: `+B.type+`

Program Info Log: `+Y+`
`+X+`
`+G)}else Y!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Y):(Z===""||nt==="")&&(w=!1);w&&(B.diagnostics={runnable:_t,programLog:Y,vertexShader:{log:Z,prefix:M},fragmentShader:{log:nt,prefix:v}})}l.deleteShader(Q),l.deleteShader(H),j=new hu(l,T),N=vT(l,T)}let j;this.getUniforms=function(){return j===void 0&&D(this),j};let N;this.getAttributes=function(){return N===void 0&&D(this),N};let b=i.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return b===!1&&(b=l.getProgramParameter(T,lT)),b},this.destroy=function(){s.releaseStatesOfProgram(this),l.deleteProgram(T),this.program=void 0},this.type=i.shaderType,this.name=i.shaderName,this.id=cT++,this.cacheKey=e,this.usedTimes=1,this.program=T,this.vertexShader=Q,this.fragmentShader=H,this}let wT=0;class DT{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const i=e.vertexShader,s=e.fragmentShader,l=this._getShaderStage(i),c=this._getShaderStage(s),d=this._getShaderCacheForMaterial(e);return d.has(l)===!1&&(d.add(l),l.usedTimes++),d.has(c)===!1&&(d.add(c),c.usedTimes++),this}remove(e){const i=this.materialCache.get(e);for(const s of i)s.usedTimes--,s.usedTimes===0&&this.shaderCache.delete(s.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const i=this.materialCache;let s=i.get(e);return s===void 0&&(s=new Set,i.set(e,s)),s}_getShaderStage(e){const i=this.shaderCache;let s=i.get(e);return s===void 0&&(s=new UT(e),i.set(e,s)),s}}class UT{constructor(e){this.id=wT++,this.code=e,this.usedTimes=0}}function LT(r,e,i,s,l,c,d){const h=new b_,p=new DT,m=new Set,_=[],g=l.logarithmicDepthBuffer,x=l.vertexTextures;let S=l.precision;const E={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function T(N){return m.add(N),N===0?"uv":`uv${N}`}function M(N,b,B,Y,Z){const nt=Y.fog,_t=Z.geometry,w=N.isMeshStandardMaterial?Y.environment:null,X=(N.isMeshStandardMaterial?i:e).get(N.envMap||w),G=X&&X.mapping===xu?X.image.height:null,ot=E[N.type];N.precision!==null&&(S=l.getMaxPrecision(N.precision),S!==N.precision&&console.warn("THREE.WebGLProgram.getParameters:",N.precision,"not supported, using",S,"instead."));const Dt=_t.morphAttributes.position||_t.morphAttributes.normal||_t.morphAttributes.color,V=Dt!==void 0?Dt.length:0;let ct=0;_t.morphAttributes.position!==void 0&&(ct=1),_t.morphAttributes.normal!==void 0&&(ct=2),_t.morphAttributes.color!==void 0&&(ct=3);let Lt,K,yt,Ft;if(ot){const qe=da[ot];Lt=qe.vertexShader,K=qe.fragmentShader}else Lt=N.vertexShader,K=N.fragmentShader,p.update(N),yt=p.getVertexShaderID(N),Ft=p.getFragmentShaderID(N);const wt=r.getRenderTarget(),zt=r.state.buffers.depth.getReversed(),ae=Z.isInstancedMesh===!0,xe=Z.isBatchedMesh===!0,Pe=!!N.map,we=!!N.matcap,ke=!!X,at=!!N.aoMap,Bn=!!N.lightMap,Ue=!!N.bumpMap,jt=!!N.normalMap,Kt=!!N.displacementMap,Xe=!!N.emissiveMap,me=!!N.metalnessMap,P=!!N.roughnessMap,A=N.anisotropy>0,rt=N.clearcoat>0,xt=N.dispersion>0,At=N.iridescence>0,W=N.sheen>0,ie=N.transmission>0,Xt=A&&!!N.anisotropyMap,Ot=rt&&!!N.clearcoatMap,qt=rt&&!!N.clearcoatNormalMap,pt=rt&&!!N.clearcoatRoughnessMap,Gt=At&&!!N.iridescenceMap,se=At&&!!N.iridescenceThicknessMap,re=W&&!!N.sheenColorMap,Wt=W&&!!N.sheenRoughnessMap,Te=!!N.specularMap,Me=!!N.specularColorMap,Oe=!!N.specularIntensityMap,$=ie&&!!N.transmissionMap,Qt=ie&&!!N.thicknessMap,St=!!N.gradientMap,Tt=!!N.alphaMap,Jt=N.alphaTest>0,$t=!!N.alphaHash,Pt=!!N.extensions;let pn=bs;N.toneMapped&&(wt===null||wt.isXRRenderTarget===!0)&&(pn=r.toneMapping);const Rn={shaderID:ot,shaderType:N.type,shaderName:N.name,vertexShader:Lt,fragmentShader:K,defines:N.defines,customVertexShaderID:yt,customFragmentShaderID:Ft,isRawShaderMaterial:N.isRawShaderMaterial===!0,glslVersion:N.glslVersion,precision:S,batching:xe,batchingColor:xe&&Z._colorsTexture!==null,instancing:ae,instancingColor:ae&&Z.instanceColor!==null,instancingMorph:ae&&Z.morphTexture!==null,supportsVertexTextures:x,outputColorSpace:wt===null?r.outputColorSpace:wt.isXRRenderTarget===!0?wt.texture.colorSpace:ho,alphaToCoverage:!!N.alphaToCoverage,map:Pe,matcap:we,envMap:ke,envMapMode:ke&&X.mapping,envMapCubeUVHeight:G,aoMap:at,lightMap:Bn,bumpMap:Ue,normalMap:jt,displacementMap:x&&Kt,emissiveMap:Xe,normalMapObjectSpace:jt&&N.normalMapType===HM,normalMapTangentSpace:jt&&N.normalMapType===FM,metalnessMap:me,roughnessMap:P,anisotropy:A,anisotropyMap:Xt,clearcoat:rt,clearcoatMap:Ot,clearcoatNormalMap:qt,clearcoatRoughnessMap:pt,dispersion:xt,iridescence:At,iridescenceMap:Gt,iridescenceThicknessMap:se,sheen:W,sheenColorMap:re,sheenRoughnessMap:Wt,specularMap:Te,specularColorMap:Me,specularIntensityMap:Oe,transmission:ie,transmissionMap:$,thicknessMap:Qt,gradientMap:St,opaque:N.transparent===!1&&N.blending===ir&&N.alphaToCoverage===!1,alphaMap:Tt,alphaTest:Jt,alphaHash:$t,combine:N.combine,mapUv:Pe&&T(N.map.channel),aoMapUv:at&&T(N.aoMap.channel),lightMapUv:Bn&&T(N.lightMap.channel),bumpMapUv:Ue&&T(N.bumpMap.channel),normalMapUv:jt&&T(N.normalMap.channel),displacementMapUv:Kt&&T(N.displacementMap.channel),emissiveMapUv:Xe&&T(N.emissiveMap.channel),metalnessMapUv:me&&T(N.metalnessMap.channel),roughnessMapUv:P&&T(N.roughnessMap.channel),anisotropyMapUv:Xt&&T(N.anisotropyMap.channel),clearcoatMapUv:Ot&&T(N.clearcoatMap.channel),clearcoatNormalMapUv:qt&&T(N.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:pt&&T(N.clearcoatRoughnessMap.channel),iridescenceMapUv:Gt&&T(N.iridescenceMap.channel),iridescenceThicknessMapUv:se&&T(N.iridescenceThicknessMap.channel),sheenColorMapUv:re&&T(N.sheenColorMap.channel),sheenRoughnessMapUv:Wt&&T(N.sheenRoughnessMap.channel),specularMapUv:Te&&T(N.specularMap.channel),specularColorMapUv:Me&&T(N.specularColorMap.channel),specularIntensityMapUv:Oe&&T(N.specularIntensityMap.channel),transmissionMapUv:$&&T(N.transmissionMap.channel),thicknessMapUv:Qt&&T(N.thicknessMap.channel),alphaMapUv:Tt&&T(N.alphaMap.channel),vertexTangents:!!_t.attributes.tangent&&(jt||A),vertexColors:N.vertexColors,vertexAlphas:N.vertexColors===!0&&!!_t.attributes.color&&_t.attributes.color.itemSize===4,pointsUvs:Z.isPoints===!0&&!!_t.attributes.uv&&(Pe||Tt),fog:!!nt,useFog:N.fog===!0,fogExp2:!!nt&&nt.isFogExp2,flatShading:N.flatShading===!0,sizeAttenuation:N.sizeAttenuation===!0,logarithmicDepthBuffer:g,reverseDepthBuffer:zt,skinning:Z.isSkinnedMesh===!0,morphTargets:_t.morphAttributes.position!==void 0,morphNormals:_t.morphAttributes.normal!==void 0,morphColors:_t.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:ct,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:d.numPlanes,numClipIntersection:d.numIntersection,dithering:N.dithering,shadowMapEnabled:r.shadowMap.enabled&&B.length>0,shadowMapType:r.shadowMap.type,toneMapping:pn,decodeVideoTexture:Pe&&N.map.isVideoTexture===!0&&un.getTransfer(N.map.colorSpace)===En,decodeVideoTextureEmissive:Xe&&N.emissiveMap.isVideoTexture===!0&&un.getTransfer(N.emissiveMap.colorSpace)===En,premultipliedAlpha:N.premultipliedAlpha,doubleSided:N.side===Ga,flipSided:N.side===Ai,useDepthPacking:N.depthPacking>=0,depthPacking:N.depthPacking||0,index0AttributeName:N.index0AttributeName,extensionClipCullDistance:Pt&&N.extensions.clipCullDistance===!0&&s.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pt&&N.extensions.multiDraw===!0||xe)&&s.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:s.has("KHR_parallel_shader_compile"),customProgramCacheKey:N.customProgramCacheKey()};return Rn.vertexUv1s=m.has(1),Rn.vertexUv2s=m.has(2),Rn.vertexUv3s=m.has(3),m.clear(),Rn}function v(N){const b=[];if(N.shaderID?b.push(N.shaderID):(b.push(N.customVertexShaderID),b.push(N.customFragmentShaderID)),N.defines!==void 0)for(const B in N.defines)b.push(B),b.push(N.defines[B]);return N.isRawShaderMaterial===!1&&(I(b,N),F(b,N),b.push(r.outputColorSpace)),b.push(N.customProgramCacheKey),b.join()}function I(N,b){N.push(b.precision),N.push(b.outputColorSpace),N.push(b.envMapMode),N.push(b.envMapCubeUVHeight),N.push(b.mapUv),N.push(b.alphaMapUv),N.push(b.lightMapUv),N.push(b.aoMapUv),N.push(b.bumpMapUv),N.push(b.normalMapUv),N.push(b.displacementMapUv),N.push(b.emissiveMapUv),N.push(b.metalnessMapUv),N.push(b.roughnessMapUv),N.push(b.anisotropyMapUv),N.push(b.clearcoatMapUv),N.push(b.clearcoatNormalMapUv),N.push(b.clearcoatRoughnessMapUv),N.push(b.iridescenceMapUv),N.push(b.iridescenceThicknessMapUv),N.push(b.sheenColorMapUv),N.push(b.sheenRoughnessMapUv),N.push(b.specularMapUv),N.push(b.specularColorMapUv),N.push(b.specularIntensityMapUv),N.push(b.transmissionMapUv),N.push(b.thicknessMapUv),N.push(b.combine),N.push(b.fogExp2),N.push(b.sizeAttenuation),N.push(b.morphTargetsCount),N.push(b.morphAttributeCount),N.push(b.numDirLights),N.push(b.numPointLights),N.push(b.numSpotLights),N.push(b.numSpotLightMaps),N.push(b.numHemiLights),N.push(b.numRectAreaLights),N.push(b.numDirLightShadows),N.push(b.numPointLightShadows),N.push(b.numSpotLightShadows),N.push(b.numSpotLightShadowsWithMaps),N.push(b.numLightProbes),N.push(b.shadowMapType),N.push(b.toneMapping),N.push(b.numClippingPlanes),N.push(b.numClipIntersection),N.push(b.depthPacking)}function F(N,b){h.disableAll(),b.supportsVertexTextures&&h.enable(0),b.instancing&&h.enable(1),b.instancingColor&&h.enable(2),b.instancingMorph&&h.enable(3),b.matcap&&h.enable(4),b.envMap&&h.enable(5),b.normalMapObjectSpace&&h.enable(6),b.normalMapTangentSpace&&h.enable(7),b.clearcoat&&h.enable(8),b.iridescence&&h.enable(9),b.alphaTest&&h.enable(10),b.vertexColors&&h.enable(11),b.vertexAlphas&&h.enable(12),b.vertexUv1s&&h.enable(13),b.vertexUv2s&&h.enable(14),b.vertexUv3s&&h.enable(15),b.vertexTangents&&h.enable(16),b.anisotropy&&h.enable(17),b.alphaHash&&h.enable(18),b.batching&&h.enable(19),b.dispersion&&h.enable(20),b.batchingColor&&h.enable(21),N.push(h.mask),h.disableAll(),b.fog&&h.enable(0),b.useFog&&h.enable(1),b.flatShading&&h.enable(2),b.logarithmicDepthBuffer&&h.enable(3),b.reverseDepthBuffer&&h.enable(4),b.skinning&&h.enable(5),b.morphTargets&&h.enable(6),b.morphNormals&&h.enable(7),b.morphColors&&h.enable(8),b.premultipliedAlpha&&h.enable(9),b.shadowMapEnabled&&h.enable(10),b.doubleSided&&h.enable(11),b.flipSided&&h.enable(12),b.useDepthPacking&&h.enable(13),b.dithering&&h.enable(14),b.transmission&&h.enable(15),b.sheen&&h.enable(16),b.opaque&&h.enable(17),b.pointsUvs&&h.enable(18),b.decodeVideoTexture&&h.enable(19),b.decodeVideoTextureEmissive&&h.enable(20),b.alphaToCoverage&&h.enable(21),N.push(h.mask)}function z(N){const b=E[N.type];let B;if(b){const Y=da[b];B=mS.clone(Y.uniforms)}else B=N.uniforms;return B}function Q(N,b){let B;for(let Y=0,Z=_.length;Y<Z;Y++){const nt=_[Y];if(nt.cacheKey===b){B=nt,++B.usedTimes;break}}return B===void 0&&(B=new CT(r,b,N,c),_.push(B)),B}function H(N){if(--N.usedTimes===0){const b=_.indexOf(N);_[b]=_[_.length-1],_.pop(),N.destroy()}}function D(N){p.remove(N)}function j(){p.dispose()}return{getParameters:M,getProgramCacheKey:v,getUniforms:z,acquireProgram:Q,releaseProgram:H,releaseShaderCache:D,programs:_,dispose:j}}function NT(){let r=new WeakMap;function e(d){return r.has(d)}function i(d){let h=r.get(d);return h===void 0&&(h={},r.set(d,h)),h}function s(d){r.delete(d)}function l(d,h,p){r.get(d)[h]=p}function c(){r=new WeakMap}return{has:e,get:i,remove:s,update:l,dispose:c}}function OT(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function qv(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Wv(){const r=[];let e=0;const i=[],s=[],l=[];function c(){e=0,i.length=0,s.length=0,l.length=0}function d(g,x,S,E,T,M){let v=r[e];return v===void 0?(v={id:g.id,object:g,geometry:x,material:S,groupOrder:E,renderOrder:g.renderOrder,z:T,group:M},r[e]=v):(v.id=g.id,v.object=g,v.geometry=x,v.material=S,v.groupOrder=E,v.renderOrder=g.renderOrder,v.z=T,v.group=M),e++,v}function h(g,x,S,E,T,M){const v=d(g,x,S,E,T,M);S.transmission>0?s.push(v):S.transparent===!0?l.push(v):i.push(v)}function p(g,x,S,E,T,M){const v=d(g,x,S,E,T,M);S.transmission>0?s.unshift(v):S.transparent===!0?l.unshift(v):i.unshift(v)}function m(g,x){i.length>1&&i.sort(g||OT),s.length>1&&s.sort(x||qv),l.length>1&&l.sort(x||qv)}function _(){for(let g=e,x=r.length;g<x;g++){const S=r[g];if(S.id===null)break;S.id=null,S.object=null,S.geometry=null,S.material=null,S.group=null}}return{opaque:i,transmissive:s,transparent:l,init:c,push:h,unshift:p,finish:_,sort:m}}function zT(){let r=new WeakMap;function e(s,l){const c=r.get(s);let d;return c===void 0?(d=new Wv,r.set(s,[d])):l>=c.length?(d=new Wv,c.push(d)):d=c[l],d}function i(){r=new WeakMap}return{get:e,dispose:i}}function PT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={direction:new vt,color:new an};break;case"SpotLight":i={position:new vt,direction:new vt,color:new an,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":i={position:new vt,color:new an,distance:0,decay:0};break;case"HemisphereLight":i={direction:new vt,skyColor:new an,groundColor:new an};break;case"RectAreaLight":i={color:new an,position:new vt,halfWidth:new vt,halfHeight:new vt};break}return r[e.id]=i,i}}}function BT(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let i;switch(e.type){case"DirectionalLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new An};break;case"SpotLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new An};break;case"PointLight":i={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new An,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=i,i}}}let IT=0;function FT(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function HT(r){const e=new PT,i=BT(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let m=0;m<9;m++)s.probe.push(new vt);const l=new vt,c=new Dn,d=new Dn;function h(m){let _=0,g=0,x=0;for(let N=0;N<9;N++)s.probe[N].set(0,0,0);let S=0,E=0,T=0,M=0,v=0,I=0,F=0,z=0,Q=0,H=0,D=0;m.sort(FT);for(let N=0,b=m.length;N<b;N++){const B=m[N],Y=B.color,Z=B.intensity,nt=B.distance,_t=B.shadow&&B.shadow.map?B.shadow.map.texture:null;if(B.isAmbientLight)_+=Y.r*Z,g+=Y.g*Z,x+=Y.b*Z;else if(B.isLightProbe){for(let w=0;w<9;w++)s.probe[w].addScaledVector(B.sh.coefficients[w],Z);D++}else if(B.isDirectionalLight){const w=e.get(B);if(w.color.copy(B.color).multiplyScalar(B.intensity),B.castShadow){const X=B.shadow,G=i.get(B);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,s.directionalShadow[S]=G,s.directionalShadowMap[S]=_t,s.directionalShadowMatrix[S]=B.shadow.matrix,I++}s.directional[S]=w,S++}else if(B.isSpotLight){const w=e.get(B);w.position.setFromMatrixPosition(B.matrixWorld),w.color.copy(Y).multiplyScalar(Z),w.distance=nt,w.coneCos=Math.cos(B.angle),w.penumbraCos=Math.cos(B.angle*(1-B.penumbra)),w.decay=B.decay,s.spot[T]=w;const X=B.shadow;if(B.map&&(s.spotLightMap[Q]=B.map,Q++,X.updateMatrices(B),B.castShadow&&H++),s.spotLightMatrix[T]=X.matrix,B.castShadow){const G=i.get(B);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,s.spotShadow[T]=G,s.spotShadowMap[T]=_t,z++}T++}else if(B.isRectAreaLight){const w=e.get(B);w.color.copy(Y).multiplyScalar(Z),w.halfWidth.set(B.width*.5,0,0),w.halfHeight.set(0,B.height*.5,0),s.rectArea[M]=w,M++}else if(B.isPointLight){const w=e.get(B);if(w.color.copy(B.color).multiplyScalar(B.intensity),w.distance=B.distance,w.decay=B.decay,B.castShadow){const X=B.shadow,G=i.get(B);G.shadowIntensity=X.intensity,G.shadowBias=X.bias,G.shadowNormalBias=X.normalBias,G.shadowRadius=X.radius,G.shadowMapSize=X.mapSize,G.shadowCameraNear=X.camera.near,G.shadowCameraFar=X.camera.far,s.pointShadow[E]=G,s.pointShadowMap[E]=_t,s.pointShadowMatrix[E]=B.shadow.matrix,F++}s.point[E]=w,E++}else if(B.isHemisphereLight){const w=e.get(B);w.skyColor.copy(B.color).multiplyScalar(Z),w.groundColor.copy(B.groundColor).multiplyScalar(Z),s.hemi[v]=w,v++}}M>0&&(r.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=le.LTC_FLOAT_1,s.rectAreaLTC2=le.LTC_FLOAT_2):(s.rectAreaLTC1=le.LTC_HALF_1,s.rectAreaLTC2=le.LTC_HALF_2)),s.ambient[0]=_,s.ambient[1]=g,s.ambient[2]=x;const j=s.hash;(j.directionalLength!==S||j.pointLength!==E||j.spotLength!==T||j.rectAreaLength!==M||j.hemiLength!==v||j.numDirectionalShadows!==I||j.numPointShadows!==F||j.numSpotShadows!==z||j.numSpotMaps!==Q||j.numLightProbes!==D)&&(s.directional.length=S,s.spot.length=T,s.rectArea.length=M,s.point.length=E,s.hemi.length=v,s.directionalShadow.length=I,s.directionalShadowMap.length=I,s.pointShadow.length=F,s.pointShadowMap.length=F,s.spotShadow.length=z,s.spotShadowMap.length=z,s.directionalShadowMatrix.length=I,s.pointShadowMatrix.length=F,s.spotLightMatrix.length=z+Q-H,s.spotLightMap.length=Q,s.numSpotLightShadowsWithMaps=H,s.numLightProbes=D,j.directionalLength=S,j.pointLength=E,j.spotLength=T,j.rectAreaLength=M,j.hemiLength=v,j.numDirectionalShadows=I,j.numPointShadows=F,j.numSpotShadows=z,j.numSpotMaps=Q,j.numLightProbes=D,s.version=IT++)}function p(m,_){let g=0,x=0,S=0,E=0,T=0;const M=_.matrixWorldInverse;for(let v=0,I=m.length;v<I;v++){const F=m[v];if(F.isDirectionalLight){const z=s.directional[g];z.direction.setFromMatrixPosition(F.matrixWorld),l.setFromMatrixPosition(F.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(M),g++}else if(F.isSpotLight){const z=s.spot[S];z.position.setFromMatrixPosition(F.matrixWorld),z.position.applyMatrix4(M),z.direction.setFromMatrixPosition(F.matrixWorld),l.setFromMatrixPosition(F.target.matrixWorld),z.direction.sub(l),z.direction.transformDirection(M),S++}else if(F.isRectAreaLight){const z=s.rectArea[E];z.position.setFromMatrixPosition(F.matrixWorld),z.position.applyMatrix4(M),d.identity(),c.copy(F.matrixWorld),c.premultiply(M),d.extractRotation(c),z.halfWidth.set(F.width*.5,0,0),z.halfHeight.set(0,F.height*.5,0),z.halfWidth.applyMatrix4(d),z.halfHeight.applyMatrix4(d),E++}else if(F.isPointLight){const z=s.point[x];z.position.setFromMatrixPosition(F.matrixWorld),z.position.applyMatrix4(M),x++}else if(F.isHemisphereLight){const z=s.hemi[T];z.direction.setFromMatrixPosition(F.matrixWorld),z.direction.transformDirection(M),T++}}}return{setup:h,setupView:p,state:s}}function jv(r){const e=new HT(r),i=[],s=[];function l(_){m.camera=_,i.length=0,s.length=0}function c(_){i.push(_)}function d(_){s.push(_)}function h(){e.setup(i)}function p(_){e.setupView(i,_)}const m={lightsArray:i,shadowsArray:s,camera:null,lights:e,transmissionRenderTarget:{}};return{init:l,state:m,setupLights:h,setupLightsView:p,pushLight:c,pushShadow:d}}function GT(r){let e=new WeakMap;function i(l,c=0){const d=e.get(l);let h;return d===void 0?(h=new jv(r),e.set(l,[h])):c>=d.length?(h=new jv(r),d.push(h)):h=d[c],h}function s(){e=new WeakMap}return{get:i,dispose:s}}class VT extends mo{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=BM,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class kT extends mo{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const XT=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,qT=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function WT(r,e,i){let s=new L_;const l=new An,c=new An,d=new Xn,h=new VT({depthPacking:IM}),p=new kT,m={},_=i.maxTextureSize,g={[As]:Ai,[Ai]:As,[Ga]:Ga},x=new mi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new An},radius:{value:4}},vertexShader:XT,fragmentShader:qT}),S=x.clone();S.defines.HORIZONTAL_PASS=1;const E=new Ri;E.setAttribute("position",new wn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const T=new $i(E,x),M=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=l_;let v=this.type;this.render=function(H,D,j){if(M.enabled===!1||M.autoUpdate===!1&&M.needsUpdate===!1||H.length===0)return;const N=r.getRenderTarget(),b=r.getActiveCubeFace(),B=r.getActiveMipmapLevel(),Y=r.state;Y.setBlending(Es),Y.buffers.color.setClear(1,1,1,1),Y.buffers.depth.setTest(!0),Y.setScissorTest(!1);const Z=v!==Fa&&this.type===Fa,nt=v===Fa&&this.type!==Fa;for(let _t=0,w=H.length;_t<w;_t++){const X=H[_t],G=X.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;l.copy(G.mapSize);const ot=G.getFrameExtents();if(l.multiply(ot),c.copy(G.mapSize),(l.x>_||l.y>_)&&(l.x>_&&(c.x=Math.floor(_/ot.x),l.x=c.x*ot.x,G.mapSize.x=c.x),l.y>_&&(c.y=Math.floor(_/ot.y),l.y=c.y*ot.y,G.mapSize.y=c.y)),G.map===null||Z===!0||nt===!0){const V=this.type!==Fa?{minFilter:Fi,magFilter:Fi}:{};G.map!==null&&G.map.dispose(),G.map=new rr(l.x,l.y,V),G.map.texture.name=X.name+".shadowMap",G.camera.updateProjectionMatrix()}r.setRenderTarget(G.map),r.clear();const Dt=G.getViewportCount();for(let V=0;V<Dt;V++){const ct=G.getViewport(V);d.set(c.x*ct.x,c.y*ct.y,c.x*ct.z,c.y*ct.w),Y.viewport(d),G.updateMatrices(X,V),s=G.getFrustum(),z(D,j,G.camera,X,this.type)}G.isPointLightShadow!==!0&&this.type===Fa&&I(G,j),G.needsUpdate=!1}v=this.type,M.needsUpdate=!1,r.setRenderTarget(N,b,B)};function I(H,D){const j=e.update(T);x.defines.VSM_SAMPLES!==H.blurSamples&&(x.defines.VSM_SAMPLES=H.blurSamples,S.defines.VSM_SAMPLES=H.blurSamples,x.needsUpdate=!0,S.needsUpdate=!0),H.mapPass===null&&(H.mapPass=new rr(l.x,l.y)),x.uniforms.shadow_pass.value=H.map.texture,x.uniforms.resolution.value=H.mapSize,x.uniforms.radius.value=H.radius,r.setRenderTarget(H.mapPass),r.clear(),r.renderBufferDirect(D,null,j,x,T,null),S.uniforms.shadow_pass.value=H.mapPass.texture,S.uniforms.resolution.value=H.mapSize,S.uniforms.radius.value=H.radius,r.setRenderTarget(H.map),r.clear(),r.renderBufferDirect(D,null,j,S,T,null)}function F(H,D,j,N){let b=null;const B=j.isPointLight===!0?H.customDistanceMaterial:H.customDepthMaterial;if(B!==void 0)b=B;else if(b=j.isPointLight===!0?p:h,r.localClippingEnabled&&D.clipShadows===!0&&Array.isArray(D.clippingPlanes)&&D.clippingPlanes.length!==0||D.displacementMap&&D.displacementScale!==0||D.alphaMap&&D.alphaTest>0||D.map&&D.alphaTest>0){const Y=b.uuid,Z=D.uuid;let nt=m[Y];nt===void 0&&(nt={},m[Y]=nt);let _t=nt[Z];_t===void 0&&(_t=b.clone(),nt[Z]=_t,D.addEventListener("dispose",Q)),b=_t}if(b.visible=D.visible,b.wireframe=D.wireframe,N===Fa?b.side=D.shadowSide!==null?D.shadowSide:D.side:b.side=D.shadowSide!==null?D.shadowSide:g[D.side],b.alphaMap=D.alphaMap,b.alphaTest=D.alphaTest,b.map=D.map,b.clipShadows=D.clipShadows,b.clippingPlanes=D.clippingPlanes,b.clipIntersection=D.clipIntersection,b.displacementMap=D.displacementMap,b.displacementScale=D.displacementScale,b.displacementBias=D.displacementBias,b.wireframeLinewidth=D.wireframeLinewidth,b.linewidth=D.linewidth,j.isPointLight===!0&&b.isMeshDistanceMaterial===!0){const Y=r.properties.get(b);Y.light=j}return b}function z(H,D,j,N,b){if(H.visible===!1)return;if(H.layers.test(D.layers)&&(H.isMesh||H.isLine||H.isPoints)&&(H.castShadow||H.receiveShadow&&b===Fa)&&(!H.frustumCulled||s.intersectsObject(H))){H.modelViewMatrix.multiplyMatrices(j.matrixWorldInverse,H.matrixWorld);const Z=e.update(H),nt=H.material;if(Array.isArray(nt)){const _t=Z.groups;for(let w=0,X=_t.length;w<X;w++){const G=_t[w],ot=nt[G.materialIndex];if(ot&&ot.visible){const Dt=F(H,ot,N,b);H.onBeforeShadow(r,H,D,j,Z,Dt,G),r.renderBufferDirect(j,null,Z,Dt,H,G),H.onAfterShadow(r,H,D,j,Z,Dt,G)}}}else if(nt.visible){const _t=F(H,nt,N,b);H.onBeforeShadow(r,H,D,j,Z,_t,null),r.renderBufferDirect(j,null,Z,_t,H,null),H.onAfterShadow(r,H,D,j,Z,_t,null)}}const Y=H.children;for(let Z=0,nt=Y.length;Z<nt;Z++)z(Y[Z],D,j,N,b)}function Q(H){H.target.removeEventListener("dispose",Q);for(const j in m){const N=m[j],b=H.target.uuid;b in N&&(N[b].dispose(),delete N[b])}}}const jT={[ld]:cd,[ud]:dd,[fd]:pd,[ro]:hd,[cd]:ld,[dd]:ud,[pd]:fd,[hd]:ro};function YT(r,e){function i(){let $=!1;const Qt=new Xn;let St=null;const Tt=new Xn(0,0,0,0);return{setMask:function(Jt){St!==Jt&&!$&&(r.colorMask(Jt,Jt,Jt,Jt),St=Jt)},setLocked:function(Jt){$=Jt},setClear:function(Jt,$t,Pt,pn,Rn){Rn===!0&&(Jt*=pn,$t*=pn,Pt*=pn),Qt.set(Jt,$t,Pt,pn),Tt.equals(Qt)===!1&&(r.clearColor(Jt,$t,Pt,pn),Tt.copy(Qt))},reset:function(){$=!1,St=null,Tt.set(-1,0,0,0)}}}function s(){let $=!1,Qt=!1,St=null,Tt=null,Jt=null;return{setReversed:function($t){if(Qt!==$t){const Pt=e.get("EXT_clip_control");Qt?Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.ZERO_TO_ONE_EXT):Pt.clipControlEXT(Pt.LOWER_LEFT_EXT,Pt.NEGATIVE_ONE_TO_ONE_EXT);const pn=Jt;Jt=null,this.setClear(pn)}Qt=$t},getReversed:function(){return Qt},setTest:function($t){$t?wt(r.DEPTH_TEST):zt(r.DEPTH_TEST)},setMask:function($t){St!==$t&&!$&&(r.depthMask($t),St=$t)},setFunc:function($t){if(Qt&&($t=jT[$t]),Tt!==$t){switch($t){case ld:r.depthFunc(r.NEVER);break;case cd:r.depthFunc(r.ALWAYS);break;case ud:r.depthFunc(r.LESS);break;case ro:r.depthFunc(r.LEQUAL);break;case fd:r.depthFunc(r.EQUAL);break;case hd:r.depthFunc(r.GEQUAL);break;case dd:r.depthFunc(r.GREATER);break;case pd:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}Tt=$t}},setLocked:function($t){$=$t},setClear:function($t){Jt!==$t&&(Qt&&($t=1-$t),r.clearDepth($t),Jt=$t)},reset:function(){$=!1,St=null,Tt=null,Jt=null,Qt=!1}}}function l(){let $=!1,Qt=null,St=null,Tt=null,Jt=null,$t=null,Pt=null,pn=null,Rn=null;return{setTest:function(qe){$||(qe?wt(r.STENCIL_TEST):zt(r.STENCIL_TEST))},setMask:function(qe){Qt!==qe&&!$&&(r.stencilMask(qe),Qt=qe)},setFunc:function(qe,Nn,Cn){(St!==qe||Tt!==Nn||Jt!==Cn)&&(r.stencilFunc(qe,Nn,Cn),St=qe,Tt=Nn,Jt=Cn)},setOp:function(qe,Nn,Cn){($t!==qe||Pt!==Nn||pn!==Cn)&&(r.stencilOp(qe,Nn,Cn),$t=qe,Pt=Nn,pn=Cn)},setLocked:function(qe){$=qe},setClear:function(qe){Rn!==qe&&(r.clearStencil(qe),Rn=qe)},reset:function(){$=!1,Qt=null,St=null,Tt=null,Jt=null,$t=null,Pt=null,pn=null,Rn=null}}}const c=new i,d=new s,h=new l,p=new WeakMap,m=new WeakMap;let _={},g={},x=new WeakMap,S=[],E=null,T=!1,M=null,v=null,I=null,F=null,z=null,Q=null,H=null,D=new an(0,0,0),j=0,N=!1,b=null,B=null,Y=null,Z=null,nt=null;const _t=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let w=!1,X=0;const G=r.getParameter(r.VERSION);G.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(G)[1]),w=X>=1):G.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),w=X>=2);let ot=null,Dt={};const V=r.getParameter(r.SCISSOR_BOX),ct=r.getParameter(r.VIEWPORT),Lt=new Xn().fromArray(V),K=new Xn().fromArray(ct);function yt($,Qt,St,Tt){const Jt=new Uint8Array(4),$t=r.createTexture();r.bindTexture($,$t),r.texParameteri($,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri($,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Pt=0;Pt<St;Pt++)$===r.TEXTURE_3D||$===r.TEXTURE_2D_ARRAY?r.texImage3D(Qt,0,r.RGBA,1,1,Tt,0,r.RGBA,r.UNSIGNED_BYTE,Jt):r.texImage2D(Qt+Pt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Jt);return $t}const Ft={};Ft[r.TEXTURE_2D]=yt(r.TEXTURE_2D,r.TEXTURE_2D,1),Ft[r.TEXTURE_CUBE_MAP]=yt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ft[r.TEXTURE_2D_ARRAY]=yt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),Ft[r.TEXTURE_3D]=yt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),c.setClear(0,0,0,1),d.setClear(1),h.setClear(0),wt(r.DEPTH_TEST),d.setFunc(ro),Ue(!1),jt(J0),wt(r.CULL_FACE),at(Es);function wt($){_[$]!==!0&&(r.enable($),_[$]=!0)}function zt($){_[$]!==!1&&(r.disable($),_[$]=!1)}function ae($,Qt){return g[$]!==Qt?(r.bindFramebuffer($,Qt),g[$]=Qt,$===r.DRAW_FRAMEBUFFER&&(g[r.FRAMEBUFFER]=Qt),$===r.FRAMEBUFFER&&(g[r.DRAW_FRAMEBUFFER]=Qt),!0):!1}function xe($,Qt){let St=S,Tt=!1;if($){St=x.get(Qt),St===void 0&&(St=[],x.set(Qt,St));const Jt=$.textures;if(St.length!==Jt.length||St[0]!==r.COLOR_ATTACHMENT0){for(let $t=0,Pt=Jt.length;$t<Pt;$t++)St[$t]=r.COLOR_ATTACHMENT0+$t;St.length=Jt.length,Tt=!0}}else St[0]!==r.BACK&&(St[0]=r.BACK,Tt=!0);Tt&&r.drawBuffers(St)}function Pe($){return E!==$?(r.useProgram($),E=$,!0):!1}const we={[Js]:r.FUNC_ADD,[uM]:r.FUNC_SUBTRACT,[fM]:r.FUNC_REVERSE_SUBTRACT};we[hM]=r.MIN,we[dM]=r.MAX;const ke={[pM]:r.ZERO,[mM]:r.ONE,[gM]:r.SRC_COLOR,[rd]:r.SRC_ALPHA,[SM]:r.SRC_ALPHA_SATURATE,[yM]:r.DST_COLOR,[_M]:r.DST_ALPHA,[vM]:r.ONE_MINUS_SRC_COLOR,[od]:r.ONE_MINUS_SRC_ALPHA,[MM]:r.ONE_MINUS_DST_COLOR,[xM]:r.ONE_MINUS_DST_ALPHA,[EM]:r.CONSTANT_COLOR,[bM]:r.ONE_MINUS_CONSTANT_COLOR,[TM]:r.CONSTANT_ALPHA,[AM]:r.ONE_MINUS_CONSTANT_ALPHA};function at($,Qt,St,Tt,Jt,$t,Pt,pn,Rn,qe){if($===Es){T===!0&&(zt(r.BLEND),T=!1);return}if(T===!1&&(wt(r.BLEND),T=!0),$!==cM){if($!==M||qe!==N){if((v!==Js||z!==Js)&&(r.blendEquation(r.FUNC_ADD),v=Js,z=Js),qe)switch($){case ir:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case eo:r.blendFunc(r.ONE,r.ONE);break;case $0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tv:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case ir:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case eo:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case $0:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case tv:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}I=null,F=null,Q=null,H=null,D.set(0,0,0),j=0,M=$,N=qe}return}Jt=Jt||Qt,$t=$t||St,Pt=Pt||Tt,(Qt!==v||Jt!==z)&&(r.blendEquationSeparate(we[Qt],we[Jt]),v=Qt,z=Jt),(St!==I||Tt!==F||$t!==Q||Pt!==H)&&(r.blendFuncSeparate(ke[St],ke[Tt],ke[$t],ke[Pt]),I=St,F=Tt,Q=$t,H=Pt),(pn.equals(D)===!1||Rn!==j)&&(r.blendColor(pn.r,pn.g,pn.b,Rn),D.copy(pn),j=Rn),M=$,N=!1}function Bn($,Qt){$.side===Ga?zt(r.CULL_FACE):wt(r.CULL_FACE);let St=$.side===Ai;Qt&&(St=!St),Ue(St),$.blending===ir&&$.transparent===!1?at(Es):at($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),d.setFunc($.depthFunc),d.setTest($.depthTest),d.setMask($.depthWrite),c.setMask($.colorWrite);const Tt=$.stencilWrite;h.setTest(Tt),Tt&&(h.setMask($.stencilWriteMask),h.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),h.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Xe($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?wt(r.SAMPLE_ALPHA_TO_COVERAGE):zt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Ue($){b!==$&&($?r.frontFace(r.CW):r.frontFace(r.CCW),b=$)}function jt($){$!==rM?(wt(r.CULL_FACE),$!==B&&($===J0?r.cullFace(r.BACK):$===oM?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):zt(r.CULL_FACE),B=$}function Kt($){$!==Y&&(w&&r.lineWidth($),Y=$)}function Xe($,Qt,St){$?(wt(r.POLYGON_OFFSET_FILL),(Z!==Qt||nt!==St)&&(r.polygonOffset(Qt,St),Z=Qt,nt=St)):zt(r.POLYGON_OFFSET_FILL)}function me($){$?wt(r.SCISSOR_TEST):zt(r.SCISSOR_TEST)}function P($){$===void 0&&($=r.TEXTURE0+_t-1),ot!==$&&(r.activeTexture($),ot=$)}function A($,Qt,St){St===void 0&&(ot===null?St=r.TEXTURE0+_t-1:St=ot);let Tt=Dt[St];Tt===void 0&&(Tt={type:void 0,texture:void 0},Dt[St]=Tt),(Tt.type!==$||Tt.texture!==Qt)&&(ot!==St&&(r.activeTexture(St),ot=St),r.bindTexture($,Qt||Ft[$]),Tt.type=$,Tt.texture=Qt)}function rt(){const $=Dt[ot];$!==void 0&&$.type!==void 0&&(r.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function xt(){try{r.compressedTexImage2D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function At(){try{r.compressedTexImage3D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function W(){try{r.texSubImage2D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ie(){try{r.texSubImage3D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Xt(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ot(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function qt(){try{r.texStorage2D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function pt(){try{r.texStorage3D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Gt(){try{r.texImage2D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function se(){try{r.texImage3D.apply(r,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function re($){Lt.equals($)===!1&&(r.scissor($.x,$.y,$.z,$.w),Lt.copy($))}function Wt($){K.equals($)===!1&&(r.viewport($.x,$.y,$.z,$.w),K.copy($))}function Te($,Qt){let St=m.get(Qt);St===void 0&&(St=new WeakMap,m.set(Qt,St));let Tt=St.get($);Tt===void 0&&(Tt=r.getUniformBlockIndex(Qt,$.name),St.set($,Tt))}function Me($,Qt){const Tt=m.get(Qt).get($);p.get(Qt)!==Tt&&(r.uniformBlockBinding(Qt,Tt,$.__bindingPointIndex),p.set(Qt,Tt))}function Oe(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),d.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),_={},ot=null,Dt={},g={},x=new WeakMap,S=[],E=null,T=!1,M=null,v=null,I=null,F=null,z=null,Q=null,H=null,D=new an(0,0,0),j=0,N=!1,b=null,B=null,Y=null,Z=null,nt=null,Lt.set(0,0,r.canvas.width,r.canvas.height),K.set(0,0,r.canvas.width,r.canvas.height),c.reset(),d.reset(),h.reset()}return{buffers:{color:c,depth:d,stencil:h},enable:wt,disable:zt,bindFramebuffer:ae,drawBuffers:xe,useProgram:Pe,setBlending:at,setMaterial:Bn,setFlipSided:Ue,setCullFace:jt,setLineWidth:Kt,setPolygonOffset:Xe,setScissorTest:me,activeTexture:P,bindTexture:A,unbindTexture:rt,compressedTexImage2D:xt,compressedTexImage3D:At,texImage2D:Gt,texImage3D:se,updateUBOMapping:Te,uniformBlockBinding:Me,texStorage2D:qt,texStorage3D:pt,texSubImage2D:W,texSubImage3D:ie,compressedTexSubImage2D:Xt,compressedTexSubImage3D:Ot,scissor:re,viewport:Wt,reset:Oe}}function Yv(r,e,i,s){const l=ZT(s);switch(i){case p_:return r*e;case g_:return r*e;case v_:return r*e*2;case ap:return r*e/l.components*l.byteLength;case sp:return r*e/l.components*l.byteLength;case __:return r*e*2/l.components*l.byteLength;case rp:return r*e*2/l.components*l.byteLength;case m_:return r*e*3/l.components*l.byteLength;case oa:return r*e*4/l.components*l.byteLength;case op:return r*e*4/l.components*l.byteLength;case ru:case ou:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case lu:case cu:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case yd:case Sd:return Math.max(r,16)*Math.max(e,8)/4;case xd:case Md:return Math.max(r,8)*Math.max(e,8)/2;case Ed:case bd:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Td:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Ad:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Rd:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Cd:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case wd:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Dd:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Ud:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Ld:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Nd:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Od:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case zd:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Pd:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Bd:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Id:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Fd:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case uu:case Hd:case Gd:return Math.ceil(r/4)*Math.ceil(e/4)*16;case x_:case Vd:return Math.ceil(r/4)*Math.ceil(e/4)*8;case kd:case Xd:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${i} format.`)}function ZT(r){switch(r){case Xa:case f_:return{byteLength:1,components:1};case _l:case h_:case Ml:return{byteLength:2,components:1};case np:case ip:return{byteLength:2,components:4};case sr:case ep:case ga:return{byteLength:4,components:1};case d_:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}function KT(r,e,i,s,l,c,d){const h=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),m=new An,_=new WeakMap;let g;const x=new WeakMap;let S=!1;try{S=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(P,A){return S?new OffscreenCanvas(P,A):mu("canvas")}function T(P,A,rt){let xt=1;const At=me(P);if((At.width>rt||At.height>rt)&&(xt=rt/Math.max(At.width,At.height)),xt<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const W=Math.floor(xt*At.width),ie=Math.floor(xt*At.height);g===void 0&&(g=E(W,ie));const Xt=A?E(W,ie):g;return Xt.width=W,Xt.height=ie,Xt.getContext("2d").drawImage(P,0,0,W,ie),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+At.width+"x"+At.height+") to ("+W+"x"+ie+")."),Xt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+At.width+"x"+At.height+")."),P;return P}function M(P){return P.generateMipmaps}function v(P){r.generateMipmap(P)}function I(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function F(P,A,rt,xt,At=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let W=A;if(A===r.RED&&(rt===r.FLOAT&&(W=r.R32F),rt===r.HALF_FLOAT&&(W=r.R16F),rt===r.UNSIGNED_BYTE&&(W=r.R8)),A===r.RED_INTEGER&&(rt===r.UNSIGNED_BYTE&&(W=r.R8UI),rt===r.UNSIGNED_SHORT&&(W=r.R16UI),rt===r.UNSIGNED_INT&&(W=r.R32UI),rt===r.BYTE&&(W=r.R8I),rt===r.SHORT&&(W=r.R16I),rt===r.INT&&(W=r.R32I)),A===r.RG&&(rt===r.FLOAT&&(W=r.RG32F),rt===r.HALF_FLOAT&&(W=r.RG16F),rt===r.UNSIGNED_BYTE&&(W=r.RG8)),A===r.RG_INTEGER&&(rt===r.UNSIGNED_BYTE&&(W=r.RG8UI),rt===r.UNSIGNED_SHORT&&(W=r.RG16UI),rt===r.UNSIGNED_INT&&(W=r.RG32UI),rt===r.BYTE&&(W=r.RG8I),rt===r.SHORT&&(W=r.RG16I),rt===r.INT&&(W=r.RG32I)),A===r.RGB_INTEGER&&(rt===r.UNSIGNED_BYTE&&(W=r.RGB8UI),rt===r.UNSIGNED_SHORT&&(W=r.RGB16UI),rt===r.UNSIGNED_INT&&(W=r.RGB32UI),rt===r.BYTE&&(W=r.RGB8I),rt===r.SHORT&&(W=r.RGB16I),rt===r.INT&&(W=r.RGB32I)),A===r.RGBA_INTEGER&&(rt===r.UNSIGNED_BYTE&&(W=r.RGBA8UI),rt===r.UNSIGNED_SHORT&&(W=r.RGBA16UI),rt===r.UNSIGNED_INT&&(W=r.RGBA32UI),rt===r.BYTE&&(W=r.RGBA8I),rt===r.SHORT&&(W=r.RGBA16I),rt===r.INT&&(W=r.RGBA32I)),A===r.RGB&&rt===r.UNSIGNED_INT_5_9_9_9_REV&&(W=r.RGB9_E5),A===r.RGBA){const ie=At?yu:un.getTransfer(xt);rt===r.FLOAT&&(W=r.RGBA32F),rt===r.HALF_FLOAT&&(W=r.RGBA16F),rt===r.UNSIGNED_BYTE&&(W=ie===En?r.SRGB8_ALPHA8:r.RGBA8),rt===r.UNSIGNED_SHORT_4_4_4_4&&(W=r.RGBA4),rt===r.UNSIGNED_SHORT_5_5_5_1&&(W=r.RGB5_A1)}return(W===r.R16F||W===r.R32F||W===r.RG16F||W===r.RG32F||W===r.RGBA16F||W===r.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function z(P,A){let rt;return P?A===null||A===sr||A===co?rt=r.DEPTH24_STENCIL8:A===ga?rt=r.DEPTH32F_STENCIL8:A===_l&&(rt=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===sr||A===co?rt=r.DEPTH_COMPONENT24:A===ga?rt=r.DEPTH_COMPONENT32F:A===_l&&(rt=r.DEPTH_COMPONENT16),rt}function Q(P,A){return M(P)===!0||P.isFramebufferTexture&&P.minFilter!==Fi&&P.minFilter!==ma?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function H(P){const A=P.target;A.removeEventListener("dispose",H),j(A),A.isVideoTexture&&_.delete(A)}function D(P){const A=P.target;A.removeEventListener("dispose",D),b(A)}function j(P){const A=s.get(P);if(A.__webglInit===void 0)return;const rt=P.source,xt=x.get(rt);if(xt){const At=xt[A.__cacheKey];At.usedTimes--,At.usedTimes===0&&N(P),Object.keys(xt).length===0&&x.delete(rt)}s.remove(P)}function N(P){const A=s.get(P);r.deleteTexture(A.__webglTexture);const rt=P.source,xt=x.get(rt);delete xt[A.__cacheKey],d.memory.textures--}function b(P){const A=s.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),s.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let xt=0;xt<6;xt++){if(Array.isArray(A.__webglFramebuffer[xt]))for(let At=0;At<A.__webglFramebuffer[xt].length;At++)r.deleteFramebuffer(A.__webglFramebuffer[xt][At]);else r.deleteFramebuffer(A.__webglFramebuffer[xt]);A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer[xt])}else{if(Array.isArray(A.__webglFramebuffer))for(let xt=0;xt<A.__webglFramebuffer.length;xt++)r.deleteFramebuffer(A.__webglFramebuffer[xt]);else r.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&r.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&r.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let xt=0;xt<A.__webglColorRenderbuffer.length;xt++)A.__webglColorRenderbuffer[xt]&&r.deleteRenderbuffer(A.__webglColorRenderbuffer[xt]);A.__webglDepthRenderbuffer&&r.deleteRenderbuffer(A.__webglDepthRenderbuffer)}const rt=P.textures;for(let xt=0,At=rt.length;xt<At;xt++){const W=s.get(rt[xt]);W.__webglTexture&&(r.deleteTexture(W.__webglTexture),d.memory.textures--),s.remove(rt[xt])}s.remove(P)}let B=0;function Y(){B=0}function Z(){const P=B;return P>=l.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+l.maxTextures),B+=1,P}function nt(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function _t(P,A){const rt=s.get(P);if(P.isVideoTexture&&Kt(P),P.isRenderTargetTexture===!1&&P.version>0&&rt.__version!==P.version){const xt=P.image;if(xt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(xt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{K(rt,P,A);return}}i.bindTexture(r.TEXTURE_2D,rt.__webglTexture,r.TEXTURE0+A)}function w(P,A){const rt=s.get(P);if(P.version>0&&rt.__version!==P.version){K(rt,P,A);return}i.bindTexture(r.TEXTURE_2D_ARRAY,rt.__webglTexture,r.TEXTURE0+A)}function X(P,A){const rt=s.get(P);if(P.version>0&&rt.__version!==P.version){K(rt,P,A);return}i.bindTexture(r.TEXTURE_3D,rt.__webglTexture,r.TEXTURE0+A)}function G(P,A){const rt=s.get(P);if(P.version>0&&rt.__version!==P.version){yt(rt,P,A);return}i.bindTexture(r.TEXTURE_CUBE_MAP,rt.__webglTexture,r.TEXTURE0+A)}const ot={[vd]:r.REPEAT,[tr]:r.CLAMP_TO_EDGE,[_d]:r.MIRRORED_REPEAT},Dt={[Fi]:r.NEAREST,[PM]:r.NEAREST_MIPMAP_NEAREST,[Dc]:r.NEAREST_MIPMAP_LINEAR,[ma]:r.LINEAR,[wh]:r.LINEAR_MIPMAP_NEAREST,[er]:r.LINEAR_MIPMAP_LINEAR},V={[GM]:r.NEVER,[jM]:r.ALWAYS,[VM]:r.LESS,[y_]:r.LEQUAL,[kM]:r.EQUAL,[WM]:r.GEQUAL,[XM]:r.GREATER,[qM]:r.NOTEQUAL};function ct(P,A){if(A.type===ga&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===ma||A.magFilter===wh||A.magFilter===Dc||A.magFilter===er||A.minFilter===ma||A.minFilter===wh||A.minFilter===Dc||A.minFilter===er)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,ot[A.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,ot[A.wrapT]),(P===r.TEXTURE_3D||P===r.TEXTURE_2D_ARRAY)&&r.texParameteri(P,r.TEXTURE_WRAP_R,ot[A.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,Dt[A.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,Dt[A.minFilter]),A.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,V[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===Fi||A.minFilter!==Dc&&A.minFilter!==er||A.type===ga&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||s.get(A).__currentAnisotropy){const rt=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,rt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,l.getMaxAnisotropy())),s.get(A).__currentAnisotropy=A.anisotropy}}}function Lt(P,A){let rt=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",H));const xt=A.source;let At=x.get(xt);At===void 0&&(At={},x.set(xt,At));const W=nt(A);if(W!==P.__cacheKey){At[W]===void 0&&(At[W]={texture:r.createTexture(),usedTimes:0},d.memory.textures++,rt=!0),At[W].usedTimes++;const ie=At[P.__cacheKey];ie!==void 0&&(At[P.__cacheKey].usedTimes--,ie.usedTimes===0&&N(A)),P.__cacheKey=W,P.__webglTexture=At[W].texture}return rt}function K(P,A,rt){let xt=r.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(xt=r.TEXTURE_2D_ARRAY),A.isData3DTexture&&(xt=r.TEXTURE_3D);const At=Lt(P,A),W=A.source;i.bindTexture(xt,P.__webglTexture,r.TEXTURE0+rt);const ie=s.get(W);if(W.version!==ie.__version||At===!0){i.activeTexture(r.TEXTURE0+rt);const Xt=un.getPrimaries(un.workingColorSpace),Ot=A.colorSpace===Ss?null:un.getPrimaries(A.colorSpace),qt=A.colorSpace===Ss||Xt===Ot?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,qt);let pt=T(A.image,!1,l.maxTextureSize);pt=Xe(A,pt);const Gt=c.convert(A.format,A.colorSpace),se=c.convert(A.type);let re=F(A.internalFormat,Gt,se,A.colorSpace,A.isVideoTexture);ct(xt,A);let Wt;const Te=A.mipmaps,Me=A.isVideoTexture!==!0,Oe=ie.__version===void 0||At===!0,$=W.dataReady,Qt=Q(A,pt);if(A.isDepthTexture)re=z(A.format===uo,A.type),Oe&&(Me?i.texStorage2D(r.TEXTURE_2D,1,re,pt.width,pt.height):i.texImage2D(r.TEXTURE_2D,0,re,pt.width,pt.height,0,Gt,se,null));else if(A.isDataTexture)if(Te.length>0){Me&&Oe&&i.texStorage2D(r.TEXTURE_2D,Qt,re,Te[0].width,Te[0].height);for(let St=0,Tt=Te.length;St<Tt;St++)Wt=Te[St],Me?$&&i.texSubImage2D(r.TEXTURE_2D,St,0,0,Wt.width,Wt.height,Gt,se,Wt.data):i.texImage2D(r.TEXTURE_2D,St,re,Wt.width,Wt.height,0,Gt,se,Wt.data);A.generateMipmaps=!1}else Me?(Oe&&i.texStorage2D(r.TEXTURE_2D,Qt,re,pt.width,pt.height),$&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,pt.width,pt.height,Gt,se,pt.data)):i.texImage2D(r.TEXTURE_2D,0,re,pt.width,pt.height,0,Gt,se,pt.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Me&&Oe&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Qt,re,Te[0].width,Te[0].height,pt.depth);for(let St=0,Tt=Te.length;St<Tt;St++)if(Wt=Te[St],A.format!==oa)if(Gt!==null)if(Me){if($)if(A.layerUpdates.size>0){const Jt=Yv(Wt.width,Wt.height,A.format,A.type);for(const $t of A.layerUpdates){const Pt=Wt.data.subarray($t*Jt/Wt.data.BYTES_PER_ELEMENT,($t+1)*Jt/Wt.data.BYTES_PER_ELEMENT);i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,$t,Wt.width,Wt.height,1,Gt,Pt)}A.clearLayerUpdates()}else i.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,0,Wt.width,Wt.height,pt.depth,Gt,Wt.data)}else i.compressedTexImage3D(r.TEXTURE_2D_ARRAY,St,re,Wt.width,Wt.height,pt.depth,0,Wt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Me?$&&i.texSubImage3D(r.TEXTURE_2D_ARRAY,St,0,0,0,Wt.width,Wt.height,pt.depth,Gt,se,Wt.data):i.texImage3D(r.TEXTURE_2D_ARRAY,St,re,Wt.width,Wt.height,pt.depth,0,Gt,se,Wt.data)}else{Me&&Oe&&i.texStorage2D(r.TEXTURE_2D,Qt,re,Te[0].width,Te[0].height);for(let St=0,Tt=Te.length;St<Tt;St++)Wt=Te[St],A.format!==oa?Gt!==null?Me?$&&i.compressedTexSubImage2D(r.TEXTURE_2D,St,0,0,Wt.width,Wt.height,Gt,Wt.data):i.compressedTexImage2D(r.TEXTURE_2D,St,re,Wt.width,Wt.height,0,Wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Me?$&&i.texSubImage2D(r.TEXTURE_2D,St,0,0,Wt.width,Wt.height,Gt,se,Wt.data):i.texImage2D(r.TEXTURE_2D,St,re,Wt.width,Wt.height,0,Gt,se,Wt.data)}else if(A.isDataArrayTexture)if(Me){if(Oe&&i.texStorage3D(r.TEXTURE_2D_ARRAY,Qt,re,pt.width,pt.height,pt.depth),$)if(A.layerUpdates.size>0){const St=Yv(pt.width,pt.height,A.format,A.type);for(const Tt of A.layerUpdates){const Jt=pt.data.subarray(Tt*St/pt.data.BYTES_PER_ELEMENT,(Tt+1)*St/pt.data.BYTES_PER_ELEMENT);i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Tt,pt.width,pt.height,1,Gt,se,Jt)}A.clearLayerUpdates()}else i.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,pt.width,pt.height,pt.depth,Gt,se,pt.data)}else i.texImage3D(r.TEXTURE_2D_ARRAY,0,re,pt.width,pt.height,pt.depth,0,Gt,se,pt.data);else if(A.isData3DTexture)Me?(Oe&&i.texStorage3D(r.TEXTURE_3D,Qt,re,pt.width,pt.height,pt.depth),$&&i.texSubImage3D(r.TEXTURE_3D,0,0,0,0,pt.width,pt.height,pt.depth,Gt,se,pt.data)):i.texImage3D(r.TEXTURE_3D,0,re,pt.width,pt.height,pt.depth,0,Gt,se,pt.data);else if(A.isFramebufferTexture){if(Oe)if(Me)i.texStorage2D(r.TEXTURE_2D,Qt,re,pt.width,pt.height);else{let St=pt.width,Tt=pt.height;for(let Jt=0;Jt<Qt;Jt++)i.texImage2D(r.TEXTURE_2D,Jt,re,St,Tt,0,Gt,se,null),St>>=1,Tt>>=1}}else if(Te.length>0){if(Me&&Oe){const St=me(Te[0]);i.texStorage2D(r.TEXTURE_2D,Qt,re,St.width,St.height)}for(let St=0,Tt=Te.length;St<Tt;St++)Wt=Te[St],Me?$&&i.texSubImage2D(r.TEXTURE_2D,St,0,0,Gt,se,Wt):i.texImage2D(r.TEXTURE_2D,St,re,Gt,se,Wt);A.generateMipmaps=!1}else if(Me){if(Oe){const St=me(pt);i.texStorage2D(r.TEXTURE_2D,Qt,re,St.width,St.height)}$&&i.texSubImage2D(r.TEXTURE_2D,0,0,0,Gt,se,pt)}else i.texImage2D(r.TEXTURE_2D,0,re,Gt,se,pt);M(A)&&v(xt),ie.__version=W.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function yt(P,A,rt){if(A.image.length!==6)return;const xt=Lt(P,A),At=A.source;i.bindTexture(r.TEXTURE_CUBE_MAP,P.__webglTexture,r.TEXTURE0+rt);const W=s.get(At);if(At.version!==W.__version||xt===!0){i.activeTexture(r.TEXTURE0+rt);const ie=un.getPrimaries(un.workingColorSpace),Xt=A.colorSpace===Ss?null:un.getPrimaries(A.colorSpace),Ot=A.colorSpace===Ss||ie===Xt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,A.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,A.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);const qt=A.isCompressedTexture||A.image[0].isCompressedTexture,pt=A.image[0]&&A.image[0].isDataTexture,Gt=[];for(let Tt=0;Tt<6;Tt++)!qt&&!pt?Gt[Tt]=T(A.image[Tt],!0,l.maxCubemapSize):Gt[Tt]=pt?A.image[Tt].image:A.image[Tt],Gt[Tt]=Xe(A,Gt[Tt]);const se=Gt[0],re=c.convert(A.format,A.colorSpace),Wt=c.convert(A.type),Te=F(A.internalFormat,re,Wt,A.colorSpace),Me=A.isVideoTexture!==!0,Oe=W.__version===void 0||xt===!0,$=At.dataReady;let Qt=Q(A,se);ct(r.TEXTURE_CUBE_MAP,A);let St;if(qt){Me&&Oe&&i.texStorage2D(r.TEXTURE_CUBE_MAP,Qt,Te,se.width,se.height);for(let Tt=0;Tt<6;Tt++){St=Gt[Tt].mipmaps;for(let Jt=0;Jt<St.length;Jt++){const $t=St[Jt];A.format!==oa?re!==null?Me?$&&i.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,0,0,$t.width,$t.height,re,$t.data):i.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,Te,$t.width,$t.height,0,$t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Me?$&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,0,0,$t.width,$t.height,re,Wt,$t.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt,Te,$t.width,$t.height,0,re,Wt,$t.data)}}}else{if(St=A.mipmaps,Me&&Oe){St.length>0&&Qt++;const Tt=me(Gt[0]);i.texStorage2D(r.TEXTURE_CUBE_MAP,Qt,Te,Tt.width,Tt.height)}for(let Tt=0;Tt<6;Tt++)if(pt){Me?$&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,Gt[Tt].width,Gt[Tt].height,re,Wt,Gt[Tt].data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,Te,Gt[Tt].width,Gt[Tt].height,0,re,Wt,Gt[Tt].data);for(let Jt=0;Jt<St.length;Jt++){const Pt=St[Jt].image[Tt].image;Me?$&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,0,0,Pt.width,Pt.height,re,Wt,Pt.data):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,Te,Pt.width,Pt.height,0,re,Wt,Pt.data)}}else{Me?$&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,0,0,re,Wt,Gt[Tt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,0,Te,re,Wt,Gt[Tt]);for(let Jt=0;Jt<St.length;Jt++){const $t=St[Jt];Me?$&&i.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,0,0,re,Wt,$t.image[Tt]):i.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Tt,Jt+1,Te,re,Wt,$t.image[Tt])}}}M(A)&&v(r.TEXTURE_CUBE_MAP),W.__version=At.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function Ft(P,A,rt,xt,At,W){const ie=c.convert(rt.format,rt.colorSpace),Xt=c.convert(rt.type),Ot=F(rt.internalFormat,ie,Xt,rt.colorSpace),qt=s.get(A),pt=s.get(rt);if(pt.__renderTarget=A,!qt.__hasExternalTextures){const Gt=Math.max(1,A.width>>W),se=Math.max(1,A.height>>W);At===r.TEXTURE_3D||At===r.TEXTURE_2D_ARRAY?i.texImage3D(At,W,Ot,Gt,se,A.depth,0,ie,Xt,null):i.texImage2D(At,W,Ot,Gt,se,0,ie,Xt,null)}i.bindFramebuffer(r.FRAMEBUFFER,P),jt(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,xt,At,pt.__webglTexture,0,Ue(A)):(At===r.TEXTURE_2D||At>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&At<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,xt,At,pt.__webglTexture,W),i.bindFramebuffer(r.FRAMEBUFFER,null)}function wt(P,A,rt){if(r.bindRenderbuffer(r.RENDERBUFFER,P),A.depthBuffer){const xt=A.depthTexture,At=xt&&xt.isDepthTexture?xt.type:null,W=z(A.stencilBuffer,At),ie=A.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Xt=Ue(A);jt(A)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,Xt,W,A.width,A.height):rt?r.renderbufferStorageMultisample(r.RENDERBUFFER,Xt,W,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,W,A.width,A.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,ie,r.RENDERBUFFER,P)}else{const xt=A.textures;for(let At=0;At<xt.length;At++){const W=xt[At],ie=c.convert(W.format,W.colorSpace),Xt=c.convert(W.type),Ot=F(W.internalFormat,ie,Xt,W.colorSpace),qt=Ue(A);rt&&jt(A)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,qt,Ot,A.width,A.height):jt(A)?h.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,qt,Ot,A.width,A.height):r.renderbufferStorage(r.RENDERBUFFER,Ot,A.width,A.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function zt(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(i.bindFramebuffer(r.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const xt=s.get(A.depthTexture);xt.__renderTarget=A,(!xt.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),_t(A.depthTexture,0);const At=xt.__webglTexture,W=Ue(A);if(A.depthTexture.format===ao)jt(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,At,0,W):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,At,0);else if(A.depthTexture.format===uo)jt(A)?h.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,At,0,W):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,At,0);else throw new Error("Unknown depthTexture format")}function ae(P){const A=s.get(P),rt=P.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==P.depthTexture){const xt=P.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),xt){const At=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,xt.removeEventListener("dispose",At)};xt.addEventListener("dispose",At),A.__depthDisposeCallback=At}A.__boundDepthTexture=xt}if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(rt)throw new Error("target.depthTexture not supported in Cube render targets");zt(A.__webglFramebuffer,P)}else if(rt){A.__webglDepthbuffer=[];for(let xt=0;xt<6;xt++)if(i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer[xt]),A.__webglDepthbuffer[xt]===void 0)A.__webglDepthbuffer[xt]=r.createRenderbuffer(),wt(A.__webglDepthbuffer[xt],P,!1);else{const At=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,W=A.__webglDepthbuffer[xt];r.bindRenderbuffer(r.RENDERBUFFER,W),r.framebufferRenderbuffer(r.FRAMEBUFFER,At,r.RENDERBUFFER,W)}}else if(i.bindFramebuffer(r.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=r.createRenderbuffer(),wt(A.__webglDepthbuffer,P,!1);else{const xt=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,At=A.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,At),r.framebufferRenderbuffer(r.FRAMEBUFFER,xt,r.RENDERBUFFER,At)}i.bindFramebuffer(r.FRAMEBUFFER,null)}function xe(P,A,rt){const xt=s.get(P);A!==void 0&&Ft(xt.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),rt!==void 0&&ae(P)}function Pe(P){const A=P.texture,rt=s.get(P),xt=s.get(A);P.addEventListener("dispose",D);const At=P.textures,W=P.isWebGLCubeRenderTarget===!0,ie=At.length>1;if(ie||(xt.__webglTexture===void 0&&(xt.__webglTexture=r.createTexture()),xt.__version=A.version,d.memory.textures++),W){rt.__webglFramebuffer=[];for(let Xt=0;Xt<6;Xt++)if(A.mipmaps&&A.mipmaps.length>0){rt.__webglFramebuffer[Xt]=[];for(let Ot=0;Ot<A.mipmaps.length;Ot++)rt.__webglFramebuffer[Xt][Ot]=r.createFramebuffer()}else rt.__webglFramebuffer[Xt]=r.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){rt.__webglFramebuffer=[];for(let Xt=0;Xt<A.mipmaps.length;Xt++)rt.__webglFramebuffer[Xt]=r.createFramebuffer()}else rt.__webglFramebuffer=r.createFramebuffer();if(ie)for(let Xt=0,Ot=At.length;Xt<Ot;Xt++){const qt=s.get(At[Xt]);qt.__webglTexture===void 0&&(qt.__webglTexture=r.createTexture(),d.memory.textures++)}if(P.samples>0&&jt(P)===!1){rt.__webglMultisampledFramebuffer=r.createFramebuffer(),rt.__webglColorRenderbuffer=[],i.bindFramebuffer(r.FRAMEBUFFER,rt.__webglMultisampledFramebuffer);for(let Xt=0;Xt<At.length;Xt++){const Ot=At[Xt];rt.__webglColorRenderbuffer[Xt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,rt.__webglColorRenderbuffer[Xt]);const qt=c.convert(Ot.format,Ot.colorSpace),pt=c.convert(Ot.type),Gt=F(Ot.internalFormat,qt,pt,Ot.colorSpace,P.isXRRenderTarget===!0),se=Ue(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,se,Gt,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Xt,r.RENDERBUFFER,rt.__webglColorRenderbuffer[Xt])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(rt.__webglDepthRenderbuffer=r.createRenderbuffer(),wt(rt.__webglDepthRenderbuffer,P,!0)),i.bindFramebuffer(r.FRAMEBUFFER,null)}}if(W){i.bindTexture(r.TEXTURE_CUBE_MAP,xt.__webglTexture),ct(r.TEXTURE_CUBE_MAP,A);for(let Xt=0;Xt<6;Xt++)if(A.mipmaps&&A.mipmaps.length>0)for(let Ot=0;Ot<A.mipmaps.length;Ot++)Ft(rt.__webglFramebuffer[Xt][Ot],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Xt,Ot);else Ft(rt.__webglFramebuffer[Xt],P,A,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Xt,0);M(A)&&v(r.TEXTURE_CUBE_MAP),i.unbindTexture()}else if(ie){for(let Xt=0,Ot=At.length;Xt<Ot;Xt++){const qt=At[Xt],pt=s.get(qt);i.bindTexture(r.TEXTURE_2D,pt.__webglTexture),ct(r.TEXTURE_2D,qt),Ft(rt.__webglFramebuffer,P,qt,r.COLOR_ATTACHMENT0+Xt,r.TEXTURE_2D,0),M(qt)&&v(r.TEXTURE_2D)}i.unbindTexture()}else{let Xt=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(Xt=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),i.bindTexture(Xt,xt.__webglTexture),ct(Xt,A),A.mipmaps&&A.mipmaps.length>0)for(let Ot=0;Ot<A.mipmaps.length;Ot++)Ft(rt.__webglFramebuffer[Ot],P,A,r.COLOR_ATTACHMENT0,Xt,Ot);else Ft(rt.__webglFramebuffer,P,A,r.COLOR_ATTACHMENT0,Xt,0);M(A)&&v(Xt),i.unbindTexture()}P.depthBuffer&&ae(P)}function we(P){const A=P.textures;for(let rt=0,xt=A.length;rt<xt;rt++){const At=A[rt];if(M(At)){const W=I(P),ie=s.get(At).__webglTexture;i.bindTexture(W,ie),v(W),i.unbindTexture()}}}const ke=[],at=[];function Bn(P){if(P.samples>0){if(jt(P)===!1){const A=P.textures,rt=P.width,xt=P.height;let At=r.COLOR_BUFFER_BIT;const W=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,ie=s.get(P),Xt=A.length>1;if(Xt)for(let Ot=0;Ot<A.length;Ot++)i.bindFramebuffer(r.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ot,r.RENDERBUFFER,null),i.bindFramebuffer(r.FRAMEBUFFER,ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ot,r.TEXTURE_2D,null,0);i.bindFramebuffer(r.READ_FRAMEBUFFER,ie.__webglMultisampledFramebuffer),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,ie.__webglFramebuffer);for(let Ot=0;Ot<A.length;Ot++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(At|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(At|=r.STENCIL_BUFFER_BIT)),Xt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,ie.__webglColorRenderbuffer[Ot]);const qt=s.get(A[Ot]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,qt,0)}r.blitFramebuffer(0,0,rt,xt,0,0,rt,xt,At,r.NEAREST),p===!0&&(ke.length=0,at.length=0,ke.push(r.COLOR_ATTACHMENT0+Ot),P.depthBuffer&&P.resolveDepthBuffer===!1&&(ke.push(W),at.push(W),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,at)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,ke))}if(i.bindFramebuffer(r.READ_FRAMEBUFFER,null),i.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Xt)for(let Ot=0;Ot<A.length;Ot++){i.bindFramebuffer(r.FRAMEBUFFER,ie.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ot,r.RENDERBUFFER,ie.__webglColorRenderbuffer[Ot]);const qt=s.get(A[Ot]).__webglTexture;i.bindFramebuffer(r.FRAMEBUFFER,ie.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+Ot,r.TEXTURE_2D,qt,0)}i.bindFramebuffer(r.DRAW_FRAMEBUFFER,ie.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&p){const A=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[A])}}}function Ue(P){return Math.min(l.maxSamples,P.samples)}function jt(P){const A=s.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Kt(P){const A=d.render.frame;_.get(P)!==A&&(_.set(P,A),P.update())}function Xe(P,A){const rt=P.colorSpace,xt=P.format,At=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||rt!==ho&&rt!==Ss&&(un.getTransfer(rt)===En?(xt!==oa||At!==Xa)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",rt)),A}function me(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(m.width=P.naturalWidth||P.width,m.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(m.width=P.displayWidth,m.height=P.displayHeight):(m.width=P.width,m.height=P.height),m}this.allocateTextureUnit=Z,this.resetTextureUnits=Y,this.setTexture2D=_t,this.setTexture2DArray=w,this.setTexture3D=X,this.setTextureCube=G,this.rebindTextures=xe,this.setupRenderTarget=Pe,this.updateRenderTargetMipmap=we,this.updateMultisampleRenderTarget=Bn,this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=Ft,this.useMultisampledRTT=jt}function QT(r,e){function i(s,l=Ss){let c;const d=un.getTransfer(l);if(s===Xa)return r.UNSIGNED_BYTE;if(s===np)return r.UNSIGNED_SHORT_4_4_4_4;if(s===ip)return r.UNSIGNED_SHORT_5_5_5_1;if(s===d_)return r.UNSIGNED_INT_5_9_9_9_REV;if(s===f_)return r.BYTE;if(s===h_)return r.SHORT;if(s===_l)return r.UNSIGNED_SHORT;if(s===ep)return r.INT;if(s===sr)return r.UNSIGNED_INT;if(s===ga)return r.FLOAT;if(s===Ml)return r.HALF_FLOAT;if(s===p_)return r.ALPHA;if(s===m_)return r.RGB;if(s===oa)return r.RGBA;if(s===g_)return r.LUMINANCE;if(s===v_)return r.LUMINANCE_ALPHA;if(s===ao)return r.DEPTH_COMPONENT;if(s===uo)return r.DEPTH_STENCIL;if(s===ap)return r.RED;if(s===sp)return r.RED_INTEGER;if(s===__)return r.RG;if(s===rp)return r.RG_INTEGER;if(s===op)return r.RGBA_INTEGER;if(s===ru||s===ou||s===lu||s===cu)if(d===En)if(c=e.get("WEBGL_compressed_texture_s3tc_srgb"),c!==null){if(s===ru)return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(s===ou)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(s===lu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(s===cu)return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(c=e.get("WEBGL_compressed_texture_s3tc"),c!==null){if(s===ru)return c.COMPRESSED_RGB_S3TC_DXT1_EXT;if(s===ou)return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(s===lu)return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(s===cu)return c.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(s===xd||s===yd||s===Md||s===Sd)if(c=e.get("WEBGL_compressed_texture_pvrtc"),c!==null){if(s===xd)return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(s===yd)return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(s===Md)return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(s===Sd)return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(s===Ed||s===bd||s===Td)if(c=e.get("WEBGL_compressed_texture_etc"),c!==null){if(s===Ed||s===bd)return d===En?c.COMPRESSED_SRGB8_ETC2:c.COMPRESSED_RGB8_ETC2;if(s===Td)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:c.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(s===Ad||s===Rd||s===Cd||s===wd||s===Dd||s===Ud||s===Ld||s===Nd||s===Od||s===zd||s===Pd||s===Bd||s===Id||s===Fd)if(c=e.get("WEBGL_compressed_texture_astc"),c!==null){if(s===Ad)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:c.COMPRESSED_RGBA_ASTC_4x4_KHR;if(s===Rd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:c.COMPRESSED_RGBA_ASTC_5x4_KHR;if(s===Cd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:c.COMPRESSED_RGBA_ASTC_5x5_KHR;if(s===wd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:c.COMPRESSED_RGBA_ASTC_6x5_KHR;if(s===Dd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:c.COMPRESSED_RGBA_ASTC_6x6_KHR;if(s===Ud)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:c.COMPRESSED_RGBA_ASTC_8x5_KHR;if(s===Ld)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:c.COMPRESSED_RGBA_ASTC_8x6_KHR;if(s===Nd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:c.COMPRESSED_RGBA_ASTC_8x8_KHR;if(s===Od)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:c.COMPRESSED_RGBA_ASTC_10x5_KHR;if(s===zd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:c.COMPRESSED_RGBA_ASTC_10x6_KHR;if(s===Pd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:c.COMPRESSED_RGBA_ASTC_10x8_KHR;if(s===Bd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:c.COMPRESSED_RGBA_ASTC_10x10_KHR;if(s===Id)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:c.COMPRESSED_RGBA_ASTC_12x10_KHR;if(s===Fd)return d===En?c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:c.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(s===uu||s===Hd||s===Gd)if(c=e.get("EXT_texture_compression_bptc"),c!==null){if(s===uu)return d===En?c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:c.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(s===Hd)return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(s===Gd)return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(s===x_||s===Vd||s===kd||s===Xd)if(c=e.get("EXT_texture_compression_rgtc"),c!==null){if(s===uu)return c.COMPRESSED_RED_RGTC1_EXT;if(s===Vd)return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(s===kd)return c.COMPRESSED_RED_GREEN_RGTC2_EXT;if(s===Xd)return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return s===co?r.UNSIGNED_INT_24_8:r[s]!==void 0?r[s]:null}return{convert:i}}class JT extends Qi{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Qc extends vi{constructor(){super(),this.isGroup=!0,this.type="Group"}}const $T={type:"move"};class id{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Qc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Qc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new vt,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new vt),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Qc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new vt,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new vt),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const i=this._hand;if(i)for(const s of e.hand.values())this._getHandJoint(i,s)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,i,s){let l=null,c=null,d=null;const h=this._targetRay,p=this._grip,m=this._hand;if(e&&i.session.visibilityState!=="visible-blurred"){if(m&&e.hand){d=!0;for(const T of e.hand.values()){const M=i.getJointPose(T,s),v=this._getHandJoint(m,T);M!==null&&(v.matrix.fromArray(M.transform.matrix),v.matrix.decompose(v.position,v.rotation,v.scale),v.matrixWorldNeedsUpdate=!0,v.jointRadius=M.radius),v.visible=M!==null}const _=m.joints["index-finger-tip"],g=m.joints["thumb-tip"],x=_.position.distanceTo(g.position),S=.02,E=.005;m.inputState.pinching&&x>S+E?(m.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!m.inputState.pinching&&x<=S-E&&(m.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else p!==null&&e.gripSpace&&(c=i.getPose(e.gripSpace,s),c!==null&&(p.matrix.fromArray(c.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,c.linearVelocity?(p.hasLinearVelocity=!0,p.linearVelocity.copy(c.linearVelocity)):p.hasLinearVelocity=!1,c.angularVelocity?(p.hasAngularVelocity=!0,p.angularVelocity.copy(c.angularVelocity)):p.hasAngularVelocity=!1));h!==null&&(l=i.getPose(e.targetRaySpace,s),l===null&&c!==null&&(l=c),l!==null&&(h.matrix.fromArray(l.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,l.linearVelocity?(h.hasLinearVelocity=!0,h.linearVelocity.copy(l.linearVelocity)):h.hasLinearVelocity=!1,l.angularVelocity?(h.hasAngularVelocity=!0,h.angularVelocity.copy(l.angularVelocity)):h.hasAngularVelocity=!1,this.dispatchEvent($T)))}return h!==null&&(h.visible=l!==null),p!==null&&(p.visible=c!==null),m!==null&&(m.visible=d!==null),this}_getHandJoint(e,i){if(e.joints[i.jointName]===void 0){const s=new Qc;s.matrixAutoUpdate=!1,s.visible=!1,e.joints[i.jointName]=s,e.add(s)}return e.joints[i.jointName]}}const tA=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,eA=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class nA{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,i,s){if(this.texture===null){const l=new gi,c=e.properties.get(l);c.__webglTexture=i.texture,(i.depthNear!=s.depthNear||i.depthFar!=s.depthFar)&&(this.depthNear=i.depthNear,this.depthFar=i.depthFar),this.texture=l}}getMesh(e){if(this.texture!==null&&this.mesh===null){const i=e.cameras[0].viewport,s=new mi({vertexShader:tA,fragmentShader:eA,uniforms:{depthColor:{value:this.texture},depthWidth:{value:i.z},depthHeight:{value:i.w}}});this.mesh=new $i(new Mu(20,20),s)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class iA extends po{constructor(e,i){super();const s=this;let l=null,c=1,d=null,h="local-floor",p=1,m=null,_=null,g=null,x=null,S=null,E=null;const T=new nA,M=i.getContextAttributes();let v=null,I=null;const F=[],z=[],Q=new An;let H=null;const D=new Qi;D.viewport=new Xn;const j=new Qi;j.viewport=new Xn;const N=[D,j],b=new JT;let B=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(K){let yt=F[K];return yt===void 0&&(yt=new id,F[K]=yt),yt.getTargetRaySpace()},this.getControllerGrip=function(K){let yt=F[K];return yt===void 0&&(yt=new id,F[K]=yt),yt.getGripSpace()},this.getHand=function(K){let yt=F[K];return yt===void 0&&(yt=new id,F[K]=yt),yt.getHandSpace()};function Z(K){const yt=z.indexOf(K.inputSource);if(yt===-1)return;const Ft=F[yt];Ft!==void 0&&(Ft.update(K.inputSource,K.frame,m||d),Ft.dispatchEvent({type:K.type,data:K.inputSource}))}function nt(){l.removeEventListener("select",Z),l.removeEventListener("selectstart",Z),l.removeEventListener("selectend",Z),l.removeEventListener("squeeze",Z),l.removeEventListener("squeezestart",Z),l.removeEventListener("squeezeend",Z),l.removeEventListener("end",nt),l.removeEventListener("inputsourceschange",_t);for(let K=0;K<F.length;K++){const yt=z[K];yt!==null&&(z[K]=null,F[K].disconnect(yt))}B=null,Y=null,T.reset(),e.setRenderTarget(v),S=null,x=null,g=null,l=null,I=null,Lt.stop(),s.isPresenting=!1,e.setPixelRatio(H),e.setSize(Q.width,Q.height,!1),s.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(K){c=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(K){h=K,s.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return m||d},this.setReferenceSpace=function(K){m=K},this.getBaseLayer=function(){return x!==null?x:S},this.getBinding=function(){return g},this.getFrame=function(){return E},this.getSession=function(){return l},this.setSession=async function(K){if(l=K,l!==null){if(v=e.getRenderTarget(),l.addEventListener("select",Z),l.addEventListener("selectstart",Z),l.addEventListener("selectend",Z),l.addEventListener("squeeze",Z),l.addEventListener("squeezestart",Z),l.addEventListener("squeezeend",Z),l.addEventListener("end",nt),l.addEventListener("inputsourceschange",_t),M.xrCompatible!==!0&&await i.makeXRCompatible(),H=e.getPixelRatio(),e.getSize(Q),l.renderState.layers===void 0){const yt={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:c};S=new XRWebGLLayer(l,i,yt),l.updateRenderState({baseLayer:S}),e.setPixelRatio(1),e.setSize(S.framebufferWidth,S.framebufferHeight,!1),I=new rr(S.framebufferWidth,S.framebufferHeight,{format:oa,type:Xa,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil})}else{let yt=null,Ft=null,wt=null;M.depth&&(wt=M.stencil?i.DEPTH24_STENCIL8:i.DEPTH_COMPONENT24,yt=M.stencil?uo:ao,Ft=M.stencil?co:sr);const zt={colorFormat:i.RGBA8,depthFormat:wt,scaleFactor:c};g=new XRWebGLBinding(l,i),x=g.createProjectionLayer(zt),l.updateRenderState({layers:[x]}),e.setPixelRatio(1),e.setSize(x.textureWidth,x.textureHeight,!1),I=new rr(x.textureWidth,x.textureHeight,{format:oa,type:Xa,depthTexture:new z_(x.textureWidth,x.textureHeight,Ft,void 0,void 0,void 0,void 0,void 0,void 0,yt),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:x.ignoreDepthValues===!1})}I.isXRRenderTarget=!0,this.setFoveation(p),m=null,d=await l.requestReferenceSpace(h),Lt.setContext(l),Lt.start(),s.isPresenting=!0,s.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(l!==null)return l.environmentBlendMode},this.getDepthTexture=function(){return T.getDepthTexture()};function _t(K){for(let yt=0;yt<K.removed.length;yt++){const Ft=K.removed[yt],wt=z.indexOf(Ft);wt>=0&&(z[wt]=null,F[wt].disconnect(Ft))}for(let yt=0;yt<K.added.length;yt++){const Ft=K.added[yt];let wt=z.indexOf(Ft);if(wt===-1){for(let ae=0;ae<F.length;ae++)if(ae>=z.length){z.push(Ft),wt=ae;break}else if(z[ae]===null){z[ae]=Ft,wt=ae;break}if(wt===-1)break}const zt=F[wt];zt&&zt.connect(Ft)}}const w=new vt,X=new vt;function G(K,yt,Ft){w.setFromMatrixPosition(yt.matrixWorld),X.setFromMatrixPosition(Ft.matrixWorld);const wt=w.distanceTo(X),zt=yt.projectionMatrix.elements,ae=Ft.projectionMatrix.elements,xe=zt[14]/(zt[10]-1),Pe=zt[14]/(zt[10]+1),we=(zt[9]+1)/zt[5],ke=(zt[9]-1)/zt[5],at=(zt[8]-1)/zt[0],Bn=(ae[8]+1)/ae[0],Ue=xe*at,jt=xe*Bn,Kt=wt/(-at+Bn),Xe=Kt*-at;if(yt.matrixWorld.decompose(K.position,K.quaternion,K.scale),K.translateX(Xe),K.translateZ(Kt),K.matrixWorld.compose(K.position,K.quaternion,K.scale),K.matrixWorldInverse.copy(K.matrixWorld).invert(),zt[10]===-1)K.projectionMatrix.copy(yt.projectionMatrix),K.projectionMatrixInverse.copy(yt.projectionMatrixInverse);else{const me=xe+Kt,P=Pe+Kt,A=Ue-Xe,rt=jt+(wt-Xe),xt=we*Pe/P*me,At=ke*Pe/P*me;K.projectionMatrix.makePerspective(A,rt,xt,At,me,P),K.projectionMatrixInverse.copy(K.projectionMatrix).invert()}}function ot(K,yt){yt===null?K.matrixWorld.copy(K.matrix):K.matrixWorld.multiplyMatrices(yt.matrixWorld,K.matrix),K.matrixWorldInverse.copy(K.matrixWorld).invert()}this.updateCamera=function(K){if(l===null)return;let yt=K.near,Ft=K.far;T.texture!==null&&(T.depthNear>0&&(yt=T.depthNear),T.depthFar>0&&(Ft=T.depthFar)),b.near=j.near=D.near=yt,b.far=j.far=D.far=Ft,(B!==b.near||Y!==b.far)&&(l.updateRenderState({depthNear:b.near,depthFar:b.far}),B=b.near,Y=b.far),D.layers.mask=K.layers.mask|2,j.layers.mask=K.layers.mask|4,b.layers.mask=D.layers.mask|j.layers.mask;const wt=K.parent,zt=b.cameras;ot(b,wt);for(let ae=0;ae<zt.length;ae++)ot(zt[ae],wt);zt.length===2?G(b,D,j):b.projectionMatrix.copy(D.projectionMatrix),Dt(K,b,wt)};function Dt(K,yt,Ft){Ft===null?K.matrix.copy(yt.matrixWorld):(K.matrix.copy(Ft.matrixWorld),K.matrix.invert(),K.matrix.multiply(yt.matrixWorld)),K.matrix.decompose(K.position,K.quaternion,K.scale),K.updateMatrixWorld(!0),K.projectionMatrix.copy(yt.projectionMatrix),K.projectionMatrixInverse.copy(yt.projectionMatrixInverse),K.isPerspectiveCamera&&(K.fov=qd*2*Math.atan(1/K.projectionMatrix.elements[5]),K.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(x===null&&S===null))return p},this.setFoveation=function(K){p=K,x!==null&&(x.fixedFoveation=K),S!==null&&S.fixedFoveation!==void 0&&(S.fixedFoveation=K)},this.hasDepthSensing=function(){return T.texture!==null},this.getDepthSensingMesh=function(){return T.getMesh(b)};let V=null;function ct(K,yt){if(_=yt.getViewerPose(m||d),E=yt,_!==null){const Ft=_.views;S!==null&&(e.setRenderTargetFramebuffer(I,S.framebuffer),e.setRenderTarget(I));let wt=!1;Ft.length!==b.cameras.length&&(b.cameras.length=0,wt=!0);for(let ae=0;ae<Ft.length;ae++){const xe=Ft[ae];let Pe=null;if(S!==null)Pe=S.getViewport(xe);else{const ke=g.getViewSubImage(x,xe);Pe=ke.viewport,ae===0&&(e.setRenderTargetTextures(I,ke.colorTexture,x.ignoreDepthValues?void 0:ke.depthStencilTexture),e.setRenderTarget(I))}let we=N[ae];we===void 0&&(we=new Qi,we.layers.enable(ae),we.viewport=new Xn,N[ae]=we),we.matrix.fromArray(xe.transform.matrix),we.matrix.decompose(we.position,we.quaternion,we.scale),we.projectionMatrix.fromArray(xe.projectionMatrix),we.projectionMatrixInverse.copy(we.projectionMatrix).invert(),we.viewport.set(Pe.x,Pe.y,Pe.width,Pe.height),ae===0&&(b.matrix.copy(we.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),wt===!0&&b.cameras.push(we)}const zt=l.enabledFeatures;if(zt&&zt.includes("depth-sensing")){const ae=g.getDepthInformation(Ft[0]);ae&&ae.isValid&&ae.texture&&T.init(e,ae,l.renderState)}}for(let Ft=0;Ft<F.length;Ft++){const wt=z[Ft],zt=F[Ft];wt!==null&&zt!==void 0&&zt.update(wt,yt,m||d)}V&&V(K,yt),yt.detectedPlanes&&s.dispatchEvent({type:"planesdetected",data:yt}),E=null}const Lt=new N_;Lt.setAnimationLoop(ct),this.setAnimationLoop=function(K){V=K},this.dispose=function(){}}}const Zs=new qa,aA=new Dn;function sA(r,e){function i(M,v){M.matrixAutoUpdate===!0&&M.updateMatrix(),v.value.copy(M.matrix)}function s(M,v){v.color.getRGB(M.fogColor.value,w_(r)),v.isFog?(M.fogNear.value=v.near,M.fogFar.value=v.far):v.isFogExp2&&(M.fogDensity.value=v.density)}function l(M,v,I,F,z){v.isMeshBasicMaterial||v.isMeshLambertMaterial?c(M,v):v.isMeshToonMaterial?(c(M,v),g(M,v)):v.isMeshPhongMaterial?(c(M,v),_(M,v)):v.isMeshStandardMaterial?(c(M,v),x(M,v),v.isMeshPhysicalMaterial&&S(M,v,z)):v.isMeshMatcapMaterial?(c(M,v),E(M,v)):v.isMeshDepthMaterial?c(M,v):v.isMeshDistanceMaterial?(c(M,v),T(M,v)):v.isMeshNormalMaterial?c(M,v):v.isLineBasicMaterial?(d(M,v),v.isLineDashedMaterial&&h(M,v)):v.isPointsMaterial?p(M,v,I,F):v.isSpriteMaterial?m(M,v):v.isShadowMaterial?(M.color.value.copy(v.color),M.opacity.value=v.opacity):v.isShaderMaterial&&(v.uniformsNeedUpdate=!1)}function c(M,v){M.opacity.value=v.opacity,v.color&&M.diffuse.value.copy(v.color),v.emissive&&M.emissive.value.copy(v.emissive).multiplyScalar(v.emissiveIntensity),v.map&&(M.map.value=v.map,i(v.map,M.mapTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,i(v.alphaMap,M.alphaMapTransform)),v.bumpMap&&(M.bumpMap.value=v.bumpMap,i(v.bumpMap,M.bumpMapTransform),M.bumpScale.value=v.bumpScale,v.side===Ai&&(M.bumpScale.value*=-1)),v.normalMap&&(M.normalMap.value=v.normalMap,i(v.normalMap,M.normalMapTransform),M.normalScale.value.copy(v.normalScale),v.side===Ai&&M.normalScale.value.negate()),v.displacementMap&&(M.displacementMap.value=v.displacementMap,i(v.displacementMap,M.displacementMapTransform),M.displacementScale.value=v.displacementScale,M.displacementBias.value=v.displacementBias),v.emissiveMap&&(M.emissiveMap.value=v.emissiveMap,i(v.emissiveMap,M.emissiveMapTransform)),v.specularMap&&(M.specularMap.value=v.specularMap,i(v.specularMap,M.specularMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest);const I=e.get(v),F=I.envMap,z=I.envMapRotation;F&&(M.envMap.value=F,Zs.copy(z),Zs.x*=-1,Zs.y*=-1,Zs.z*=-1,F.isCubeTexture&&F.isRenderTargetTexture===!1&&(Zs.y*=-1,Zs.z*=-1),M.envMapRotation.value.setFromMatrix4(aA.makeRotationFromEuler(Zs)),M.flipEnvMap.value=F.isCubeTexture&&F.isRenderTargetTexture===!1?-1:1,M.reflectivity.value=v.reflectivity,M.ior.value=v.ior,M.refractionRatio.value=v.refractionRatio),v.lightMap&&(M.lightMap.value=v.lightMap,M.lightMapIntensity.value=v.lightMapIntensity,i(v.lightMap,M.lightMapTransform)),v.aoMap&&(M.aoMap.value=v.aoMap,M.aoMapIntensity.value=v.aoMapIntensity,i(v.aoMap,M.aoMapTransform))}function d(M,v){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,v.map&&(M.map.value=v.map,i(v.map,M.mapTransform))}function h(M,v){M.dashSize.value=v.dashSize,M.totalSize.value=v.dashSize+v.gapSize,M.scale.value=v.scale}function p(M,v,I,F){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,M.size.value=v.size*I,M.scale.value=F*.5,v.map&&(M.map.value=v.map,i(v.map,M.uvTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,i(v.alphaMap,M.alphaMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest)}function m(M,v){M.diffuse.value.copy(v.color),M.opacity.value=v.opacity,M.rotation.value=v.rotation,v.map&&(M.map.value=v.map,i(v.map,M.mapTransform)),v.alphaMap&&(M.alphaMap.value=v.alphaMap,i(v.alphaMap,M.alphaMapTransform)),v.alphaTest>0&&(M.alphaTest.value=v.alphaTest)}function _(M,v){M.specular.value.copy(v.specular),M.shininess.value=Math.max(v.shininess,1e-4)}function g(M,v){v.gradientMap&&(M.gradientMap.value=v.gradientMap)}function x(M,v){M.metalness.value=v.metalness,v.metalnessMap&&(M.metalnessMap.value=v.metalnessMap,i(v.metalnessMap,M.metalnessMapTransform)),M.roughness.value=v.roughness,v.roughnessMap&&(M.roughnessMap.value=v.roughnessMap,i(v.roughnessMap,M.roughnessMapTransform)),v.envMap&&(M.envMapIntensity.value=v.envMapIntensity)}function S(M,v,I){M.ior.value=v.ior,v.sheen>0&&(M.sheenColor.value.copy(v.sheenColor).multiplyScalar(v.sheen),M.sheenRoughness.value=v.sheenRoughness,v.sheenColorMap&&(M.sheenColorMap.value=v.sheenColorMap,i(v.sheenColorMap,M.sheenColorMapTransform)),v.sheenRoughnessMap&&(M.sheenRoughnessMap.value=v.sheenRoughnessMap,i(v.sheenRoughnessMap,M.sheenRoughnessMapTransform))),v.clearcoat>0&&(M.clearcoat.value=v.clearcoat,M.clearcoatRoughness.value=v.clearcoatRoughness,v.clearcoatMap&&(M.clearcoatMap.value=v.clearcoatMap,i(v.clearcoatMap,M.clearcoatMapTransform)),v.clearcoatRoughnessMap&&(M.clearcoatRoughnessMap.value=v.clearcoatRoughnessMap,i(v.clearcoatRoughnessMap,M.clearcoatRoughnessMapTransform)),v.clearcoatNormalMap&&(M.clearcoatNormalMap.value=v.clearcoatNormalMap,i(v.clearcoatNormalMap,M.clearcoatNormalMapTransform),M.clearcoatNormalScale.value.copy(v.clearcoatNormalScale),v.side===Ai&&M.clearcoatNormalScale.value.negate())),v.dispersion>0&&(M.dispersion.value=v.dispersion),v.iridescence>0&&(M.iridescence.value=v.iridescence,M.iridescenceIOR.value=v.iridescenceIOR,M.iridescenceThicknessMinimum.value=v.iridescenceThicknessRange[0],M.iridescenceThicknessMaximum.value=v.iridescenceThicknessRange[1],v.iridescenceMap&&(M.iridescenceMap.value=v.iridescenceMap,i(v.iridescenceMap,M.iridescenceMapTransform)),v.iridescenceThicknessMap&&(M.iridescenceThicknessMap.value=v.iridescenceThicknessMap,i(v.iridescenceThicknessMap,M.iridescenceThicknessMapTransform))),v.transmission>0&&(M.transmission.value=v.transmission,M.transmissionSamplerMap.value=I.texture,M.transmissionSamplerSize.value.set(I.width,I.height),v.transmissionMap&&(M.transmissionMap.value=v.transmissionMap,i(v.transmissionMap,M.transmissionMapTransform)),M.thickness.value=v.thickness,v.thicknessMap&&(M.thicknessMap.value=v.thicknessMap,i(v.thicknessMap,M.thicknessMapTransform)),M.attenuationDistance.value=v.attenuationDistance,M.attenuationColor.value.copy(v.attenuationColor)),v.anisotropy>0&&(M.anisotropyVector.value.set(v.anisotropy*Math.cos(v.anisotropyRotation),v.anisotropy*Math.sin(v.anisotropyRotation)),v.anisotropyMap&&(M.anisotropyMap.value=v.anisotropyMap,i(v.anisotropyMap,M.anisotropyMapTransform))),M.specularIntensity.value=v.specularIntensity,M.specularColor.value.copy(v.specularColor),v.specularColorMap&&(M.specularColorMap.value=v.specularColorMap,i(v.specularColorMap,M.specularColorMapTransform)),v.specularIntensityMap&&(M.specularIntensityMap.value=v.specularIntensityMap,i(v.specularIntensityMap,M.specularIntensityMapTransform))}function E(M,v){v.matcap&&(M.matcap.value=v.matcap)}function T(M,v){const I=e.get(v).light;M.referencePosition.value.setFromMatrixPosition(I.matrixWorld),M.nearDistance.value=I.shadow.camera.near,M.farDistance.value=I.shadow.camera.far}return{refreshFogUniforms:s,refreshMaterialUniforms:l}}function rA(r,e,i,s){let l={},c={},d=[];const h=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function p(I,F){const z=F.program;s.uniformBlockBinding(I,z)}function m(I,F){let z=l[I.id];z===void 0&&(E(I),z=_(I),l[I.id]=z,I.addEventListener("dispose",M));const Q=F.program;s.updateUBOMapping(I,Q);const H=e.render.frame;c[I.id]!==H&&(x(I),c[I.id]=H)}function _(I){const F=g();I.__bindingPointIndex=F;const z=r.createBuffer(),Q=I.__size,H=I.usage;return r.bindBuffer(r.UNIFORM_BUFFER,z),r.bufferData(r.UNIFORM_BUFFER,Q,H),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,F,z),z}function g(){for(let I=0;I<h;I++)if(d.indexOf(I)===-1)return d.push(I),I;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function x(I){const F=l[I.id],z=I.uniforms,Q=I.__cache;r.bindBuffer(r.UNIFORM_BUFFER,F);for(let H=0,D=z.length;H<D;H++){const j=Array.isArray(z[H])?z[H]:[z[H]];for(let N=0,b=j.length;N<b;N++){const B=j[N];if(S(B,H,N,Q)===!0){const Y=B.__offset,Z=Array.isArray(B.value)?B.value:[B.value];let nt=0;for(let _t=0;_t<Z.length;_t++){const w=Z[_t],X=T(w);typeof w=="number"||typeof w=="boolean"?(B.__data[0]=w,r.bufferSubData(r.UNIFORM_BUFFER,Y+nt,B.__data)):w.isMatrix3?(B.__data[0]=w.elements[0],B.__data[1]=w.elements[1],B.__data[2]=w.elements[2],B.__data[3]=0,B.__data[4]=w.elements[3],B.__data[5]=w.elements[4],B.__data[6]=w.elements[5],B.__data[7]=0,B.__data[8]=w.elements[6],B.__data[9]=w.elements[7],B.__data[10]=w.elements[8],B.__data[11]=0):(w.toArray(B.__data,nt),nt+=X.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,Y,B.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function S(I,F,z,Q){const H=I.value,D=F+"_"+z;if(Q[D]===void 0)return typeof H=="number"||typeof H=="boolean"?Q[D]=H:Q[D]=H.clone(),!0;{const j=Q[D];if(typeof H=="number"||typeof H=="boolean"){if(j!==H)return Q[D]=H,!0}else if(j.equals(H)===!1)return j.copy(H),!0}return!1}function E(I){const F=I.uniforms;let z=0;const Q=16;for(let D=0,j=F.length;D<j;D++){const N=Array.isArray(F[D])?F[D]:[F[D]];for(let b=0,B=N.length;b<B;b++){const Y=N[b],Z=Array.isArray(Y.value)?Y.value:[Y.value];for(let nt=0,_t=Z.length;nt<_t;nt++){const w=Z[nt],X=T(w),G=z%Q,ot=G%X.boundary,Dt=G+ot;z+=ot,Dt!==0&&Q-Dt<X.storage&&(z+=Q-Dt),Y.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=z,z+=X.storage}}}const H=z%Q;return H>0&&(z+=Q-H),I.__size=z,I.__cache={},this}function T(I){const F={boundary:0,storage:0};return typeof I=="number"||typeof I=="boolean"?(F.boundary=4,F.storage=4):I.isVector2?(F.boundary=8,F.storage=8):I.isVector3||I.isColor?(F.boundary=16,F.storage=12):I.isVector4?(F.boundary=16,F.storage=16):I.isMatrix3?(F.boundary=48,F.storage=48):I.isMatrix4?(F.boundary=64,F.storage=64):I.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",I),F}function M(I){const F=I.target;F.removeEventListener("dispose",M);const z=d.indexOf(F.__bindingPointIndex);d.splice(z,1),r.deleteBuffer(l[F.id]),delete l[F.id],delete c[F.id]}function v(){for(const I in l)r.deleteBuffer(l[I]);d=[],l={},c={}}return{bind:p,update:m,dispose:v}}class H_{constructor(e={}){const{canvas:i=ZM(),context:s=null,depth:l=!0,stencil:c=!1,alpha:d=!1,antialias:h=!1,premultipliedAlpha:p=!0,preserveDrawingBuffer:m=!1,powerPreference:_="default",failIfMajorPerformanceCaveat:g=!1,reverseDepthBuffer:x=!1}=e;this.isWebGLRenderer=!0;let S;if(s!==null){if(typeof WebGLRenderingContext<"u"&&s instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");S=s.getContextAttributes().alpha}else S=d;const E=new Uint32Array(4),T=new Int32Array(4);let M=null,v=null;const I=[],F=[];this.domElement=i,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ki,this.toneMapping=bs,this.toneMappingExposure=1;const z=this;let Q=!1,H=0,D=0,j=null,N=-1,b=null;const B=new Xn,Y=new Xn;let Z=null;const nt=new an(0);let _t=0,w=i.width,X=i.height,G=1,ot=null,Dt=null;const V=new Xn(0,0,w,X),ct=new Xn(0,0,w,X);let Lt=!1;const K=new L_;let yt=!1,Ft=!1;const wt=new Dn,zt=new Dn,ae=new vt,xe=new Xn,Pe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let we=!1;function ke(){return j===null?G:1}let at=s;function Bn(C,et){return i.getContext(C,et)}try{const C={alpha:!0,depth:l,stencil:c,antialias:h,premultipliedAlpha:p,preserveDrawingBuffer:m,powerPreference:_,failIfMajorPerformanceCaveat:g};if("setAttribute"in i&&i.setAttribute("data-engine",`three.js r${tp}`),i.addEventListener("webglcontextlost",Tt,!1),i.addEventListener("webglcontextrestored",Jt,!1),i.addEventListener("webglcontextcreationerror",$t,!1),at===null){const et="webgl2";if(at=Bn(et,C),at===null)throw Bn(et)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Ue,jt,Kt,Xe,me,P,A,rt,xt,At,W,ie,Xt,Ot,qt,pt,Gt,se,re,Wt,Te,Me,Oe,$;function Qt(){Ue=new h1(at),Ue.init(),Me=new QT(at,Ue),jt=new r1(at,Ue,e,Me),Kt=new YT(at,Ue),jt.reverseDepthBuffer&&x&&Kt.buffers.depth.setReversed(!0),Xe=new m1(at),me=new NT,P=new KT(at,Ue,Kt,me,jt,Me,Xe),A=new l1(z),rt=new f1(z),xt=new SS(at),Oe=new a1(at,xt),At=new d1(at,xt,Xe,Oe),W=new v1(at,At,xt,Xe),re=new g1(at,jt,P),pt=new o1(me),ie=new LT(z,A,rt,Ue,jt,Oe,pt),Xt=new sA(z,me),Ot=new zT,qt=new GT(Ue),se=new i1(z,A,rt,Kt,W,S,p),Gt=new WT(z,W,jt),$=new rA(at,Xe,jt,Kt),Wt=new s1(at,Ue,Xe),Te=new p1(at,Ue,Xe),Xe.programs=ie.programs,z.capabilities=jt,z.extensions=Ue,z.properties=me,z.renderLists=Ot,z.shadowMap=Gt,z.state=Kt,z.info=Xe}Qt();const St=new iA(z,at);this.xr=St,this.getContext=function(){return at},this.getContextAttributes=function(){return at.getContextAttributes()},this.forceContextLoss=function(){const C=Ue.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Ue.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(C){C!==void 0&&(G=C,this.setSize(w,X,!1))},this.getSize=function(C){return C.set(w,X)},this.setSize=function(C,et,dt=!0){if(St.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}w=C,X=et,i.width=Math.floor(C*G),i.height=Math.floor(et*G),dt===!0&&(i.style.width=C+"px",i.style.height=et+"px"),this.setViewport(0,0,C,et)},this.getDrawingBufferSize=function(C){return C.set(w*G,X*G).floor()},this.setDrawingBufferSize=function(C,et,dt){w=C,X=et,G=dt,i.width=Math.floor(C*dt),i.height=Math.floor(et*dt),this.setViewport(0,0,C,et)},this.getCurrentViewport=function(C){return C.copy(B)},this.getViewport=function(C){return C.copy(V)},this.setViewport=function(C,et,dt,ft){C.isVector4?V.set(C.x,C.y,C.z,C.w):V.set(C,et,dt,ft),Kt.viewport(B.copy(V).multiplyScalar(G).round())},this.getScissor=function(C){return C.copy(ct)},this.setScissor=function(C,et,dt,ft){C.isVector4?ct.set(C.x,C.y,C.z,C.w):ct.set(C,et,dt,ft),Kt.scissor(Y.copy(ct).multiplyScalar(G).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(C){Kt.setScissorTest(Lt=C)},this.setOpaqueSort=function(C){ot=C},this.setTransparentSort=function(C){Dt=C},this.getClearColor=function(C){return C.copy(se.getClearColor())},this.setClearColor=function(){se.setClearColor.apply(se,arguments)},this.getClearAlpha=function(){return se.getClearAlpha()},this.setClearAlpha=function(){se.setClearAlpha.apply(se,arguments)},this.clear=function(C=!0,et=!0,dt=!0){let ft=0;if(C){let it=!1;if(j!==null){const Vt=j.texture.format;it=Vt===op||Vt===rp||Vt===sp}if(it){const Vt=j.texture.type,ee=Vt===Xa||Vt===sr||Vt===_l||Vt===co||Vt===np||Vt===ip,te=se.getClearColor(),he=se.getClearAlpha(),Re=te.r,Ee=te.g,ue=te.b;ee?(E[0]=Re,E[1]=Ee,E[2]=ue,E[3]=he,at.clearBufferuiv(at.COLOR,0,E)):(T[0]=Re,T[1]=Ee,T[2]=ue,T[3]=he,at.clearBufferiv(at.COLOR,0,T))}else ft|=at.COLOR_BUFFER_BIT}et&&(ft|=at.DEPTH_BUFFER_BIT),dt&&(ft|=at.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),at.clear(ft)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){i.removeEventListener("webglcontextlost",Tt,!1),i.removeEventListener("webglcontextrestored",Jt,!1),i.removeEventListener("webglcontextcreationerror",$t,!1),Ot.dispose(),qt.dispose(),me.dispose(),A.dispose(),rt.dispose(),W.dispose(),Oe.dispose(),$.dispose(),ie.dispose(),St.dispose(),St.removeEventListener("sessionstart",ta),St.removeEventListener("sessionend",Hi),ni.stop()};function Tt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),Q=!0}function Jt(){console.log("THREE.WebGLRenderer: Context Restored."),Q=!1;const C=Xe.autoReset,et=Gt.enabled,dt=Gt.autoUpdate,ft=Gt.needsUpdate,it=Gt.type;Qt(),Xe.autoReset=C,Gt.enabled=et,Gt.autoUpdate=dt,Gt.needsUpdate=ft,Gt.type=it}function $t(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function Pt(C){const et=C.target;et.removeEventListener("dispose",Pt),pn(et)}function pn(C){Rn(C),me.remove(C)}function Rn(C){const et=me.get(C).programs;et!==void 0&&(et.forEach(function(dt){ie.releaseProgram(dt)}),C.isShaderMaterial&&ie.releaseShaderCache(C))}this.renderBufferDirect=function(C,et,dt,ft,it,Vt){et===null&&(et=Pe);const ee=it.isMesh&&it.matrixWorld.determinant()<0,te=Ci(C,et,dt,ft,it);Kt.setMaterial(ft,ee);let he=dt.index,Re=1;if(ft.wireframe===!0){if(he=At.getWireframeAttribute(dt),he===void 0)return;Re=2}const Ee=dt.drawRange,ue=dt.attributes.position;let Ne=Ee.start*Re,sn=(Ee.start+Ee.count)*Re;Vt!==null&&(Ne=Math.max(Ne,Vt.start*Re),sn=Math.min(sn,(Vt.start+Vt.count)*Re)),he!==null?(Ne=Math.max(Ne,0),sn=Math.min(sn,he.count)):ue!=null&&(Ne=Math.max(Ne,0),sn=Math.min(sn,ue.count));const on=sn-Ne;if(on<0||on===1/0)return;Oe.setup(it,ft,te,dt,he);let O,U=Wt;if(he!==null&&(O=xt.get(he),U=Te,U.setIndex(O)),it.isMesh)ft.wireframe===!0?(Kt.setLineWidth(ft.wireframeLinewidth*ke()),U.setMode(at.LINES)):U.setMode(at.TRIANGLES);else if(it.isLine){let L=ft.linewidth;L===void 0&&(L=1),Kt.setLineWidth(L*ke()),it.isLineSegments?U.setMode(at.LINES):it.isLineLoop?U.setMode(at.LINE_LOOP):U.setMode(at.LINE_STRIP)}else it.isPoints?U.setMode(at.POINTS):it.isSprite&&U.setMode(at.TRIANGLES);if(it.isBatchedMesh)if(it._multiDrawInstances!==null)U.renderMultiDrawInstances(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount,it._multiDrawInstances);else if(Ue.get("WEBGL_multi_draw"))U.renderMultiDraw(it._multiDrawStarts,it._multiDrawCounts,it._multiDrawCount);else{const L=it._multiDrawStarts,lt=it._multiDrawCounts,tt=it._multiDrawCount,Et=he?xt.get(he).bytesPerElement:1,It=me.get(ft).currentProgram.getUniforms();for(let Ct=0;Ct<tt;Ct++)It.setValue(at,"_gl_DrawID",Ct),U.render(L[Ct]/Et,lt[Ct])}else if(it.isInstancedMesh)U.renderInstances(Ne,on,it.count);else if(dt.isInstancedBufferGeometry){const L=dt._maxInstanceCount!==void 0?dt._maxInstanceCount:1/0,lt=Math.min(dt.instanceCount,L);U.renderInstances(Ne,on,lt)}else U.render(Ne,on)};function qe(C,et,dt){C.transparent===!0&&C.side===Ga&&C.forceSinglePass===!1?(C.side=Ai,C.needsUpdate=!0,rn(C,et,dt),C.side=As,C.needsUpdate=!0,rn(C,et,dt),C.side=Ga):rn(C,et,dt)}this.compile=function(C,et,dt=null){dt===null&&(dt=C),v=qt.get(dt),v.init(et),F.push(v),dt.traverseVisible(function(it){it.isLight&&it.layers.test(et.layers)&&(v.pushLight(it),it.castShadow&&v.pushShadow(it))}),C!==dt&&C.traverseVisible(function(it){it.isLight&&it.layers.test(et.layers)&&(v.pushLight(it),it.castShadow&&v.pushShadow(it))}),v.setupLights();const ft=new Set;return C.traverse(function(it){if(!(it.isMesh||it.isPoints||it.isLine||it.isSprite))return;const Vt=it.material;if(Vt)if(Array.isArray(Vt))for(let ee=0;ee<Vt.length;ee++){const te=Vt[ee];qe(te,dt,it),ft.add(te)}else qe(Vt,dt,it),ft.add(Vt)}),F.pop(),v=null,ft},this.compileAsync=function(C,et,dt=null){const ft=this.compile(C,et,dt);return new Promise(it=>{function Vt(){if(ft.forEach(function(ee){me.get(ee).currentProgram.isReady()&&ft.delete(ee)}),ft.size===0){it(C);return}setTimeout(Vt,10)}Ue.get("KHR_parallel_shader_compile")!==null?Vt():setTimeout(Vt,10)})};let Nn=null;function Cn(C){Nn&&Nn(C)}function ta(){ni.stop()}function Hi(){ni.start()}const ni=new N_;ni.setAnimationLoop(Cn),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(C){Nn=C,St.setAnimationLoop(C),C===null?ni.stop():ni.start()},St.addEventListener("sessionstart",ta),St.addEventListener("sessionend",Hi),this.render=function(C,et){if(et!==void 0&&et.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Q===!0)return;if(C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),et.parent===null&&et.matrixWorldAutoUpdate===!0&&et.updateMatrixWorld(),St.enabled===!0&&St.isPresenting===!0&&(St.cameraAutoUpdate===!0&&St.updateCamera(et),et=St.getCamera()),C.isScene===!0&&C.onBeforeRender(z,C,et,j),v=qt.get(C,F.length),v.init(et),F.push(v),zt.multiplyMatrices(et.projectionMatrix,et.matrixWorldInverse),K.setFromProjectionMatrix(zt),Ft=this.localClippingEnabled,yt=pt.init(this.clippingPlanes,Ft),M=Ot.get(C,I.length),M.init(),I.push(M),St.enabled===!0&&St.isPresenting===!0){const Vt=z.xr.getDepthSensingMesh();Vt!==null&&Be(Vt,et,-1/0,z.sortObjects)}Be(C,et,0,z.sortObjects),M.finish(),z.sortObjects===!0&&M.sort(ot,Dt),we=St.enabled===!1||St.isPresenting===!1||St.hasDepthSensing()===!1,we&&se.addToRenderList(M,C),this.info.render.frame++,yt===!0&&pt.beginShadows();const dt=v.state.shadowsArray;Gt.render(dt,C,et),yt===!0&&pt.endShadows(),this.info.autoReset===!0&&this.info.reset();const ft=M.opaque,it=M.transmissive;if(v.setupLights(),et.isArrayCamera){const Vt=et.cameras;if(it.length>0)for(let ee=0,te=Vt.length;ee<te;ee++){const he=Vt[ee];vn(ft,it,C,he)}we&&se.render(C);for(let ee=0,te=Vt.length;ee<te;ee++){const he=Vt[ee];ii(M,C,he,he.viewport)}}else it.length>0&&vn(ft,it,C,et),we&&se.render(C),ii(M,C,et);j!==null&&(P.updateMultisampleRenderTarget(j),P.updateRenderTargetMipmap(j)),C.isScene===!0&&C.onAfterRender(z,C,et),Oe.resetDefaultState(),N=-1,b=null,F.pop(),F.length>0?(v=F[F.length-1],yt===!0&&pt.setGlobalState(z.clippingPlanes,v.state.camera)):v=null,I.pop(),I.length>0?M=I[I.length-1]:M=null};function Be(C,et,dt,ft){if(C.visible===!1)return;if(C.layers.test(et.layers)){if(C.isGroup)dt=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(et);else if(C.isLight)v.pushLight(C),C.castShadow&&v.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||K.intersectsSprite(C)){ft&&xe.setFromMatrixPosition(C.matrixWorld).applyMatrix4(zt);const ee=W.update(C),te=C.material;te.visible&&M.push(C,ee,te,dt,xe.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(!C.frustumCulled||K.intersectsObject(C))){const ee=W.update(C),te=C.material;if(ft&&(C.boundingSphere!==void 0?(C.boundingSphere===null&&C.computeBoundingSphere(),xe.copy(C.boundingSphere.center)):(ee.boundingSphere===null&&ee.computeBoundingSphere(),xe.copy(ee.boundingSphere.center)),xe.applyMatrix4(C.matrixWorld).applyMatrix4(zt)),Array.isArray(te)){const he=ee.groups;for(let Re=0,Ee=he.length;Re<Ee;Re++){const ue=he[Re],Ne=te[ue.materialIndex];Ne&&Ne.visible&&M.push(C,ee,Ne,dt,xe.z,ue)}}else te.visible&&M.push(C,ee,te,dt,xe.z,null)}}const Vt=C.children;for(let ee=0,te=Vt.length;ee<te;ee++)Be(Vt[ee],et,dt,ft)}function ii(C,et,dt,ft){const it=C.opaque,Vt=C.transmissive,ee=C.transparent;v.setupLightsView(dt),yt===!0&&pt.setGlobalState(z.clippingPlanes,dt),ft&&Kt.viewport(B.copy(ft)),it.length>0&&Ie(it,et,dt),Vt.length>0&&Ie(Vt,et,dt),ee.length>0&&Ie(ee,et,dt),Kt.buffers.depth.setTest(!0),Kt.buffers.depth.setMask(!0),Kt.buffers.color.setMask(!0),Kt.setPolygonOffset(!1)}function vn(C,et,dt,ft){if((dt.isScene===!0?dt.overrideMaterial:null)!==null)return;v.state.transmissionRenderTarget[ft.id]===void 0&&(v.state.transmissionRenderTarget[ft.id]=new rr(1,1,{generateMipmaps:!0,type:Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float")?Ml:Xa,minFilter:er,samples:4,stencilBuffer:c,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:un.workingColorSpace}));const Vt=v.state.transmissionRenderTarget[ft.id],ee=ft.viewport||B;Vt.setSize(ee.z,ee.w);const te=z.getRenderTarget();z.setRenderTarget(Vt),z.getClearColor(nt),_t=z.getClearAlpha(),_t<1&&z.setClearColor(16777215,.5),z.clear(),we&&se.render(dt);const he=z.toneMapping;z.toneMapping=bs;const Re=ft.viewport;if(ft.viewport!==void 0&&(ft.viewport=void 0),v.setupLightsView(ft),yt===!0&&pt.setGlobalState(z.clippingPlanes,ft),Ie(C,dt,ft),P.updateMultisampleRenderTarget(Vt),P.updateRenderTargetMipmap(Vt),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let Ee=!1;for(let ue=0,Ne=et.length;ue<Ne;ue++){const sn=et[ue],on=sn.object,O=sn.geometry,U=sn.material,L=sn.group;if(U.side===Ga&&on.layers.test(ft.layers)){const lt=U.side;U.side=Ai,U.needsUpdate=!0,bn(on,dt,ft,O,U,L),U.side=lt,U.needsUpdate=!0,Ee=!0}}Ee===!0&&(P.updateMultisampleRenderTarget(Vt),P.updateRenderTargetMipmap(Vt))}z.setRenderTarget(te),z.setClearColor(nt,_t),Re!==void 0&&(ft.viewport=Re),z.toneMapping=he}function Ie(C,et,dt){const ft=et.isScene===!0?et.overrideMaterial:null;for(let it=0,Vt=C.length;it<Vt;it++){const ee=C[it],te=ee.object,he=ee.geometry,Re=ft===null?ee.material:ft,Ee=ee.group;te.layers.test(dt.layers)&&bn(te,et,dt,he,Re,Ee)}}function bn(C,et,dt,ft,it,Vt){C.onBeforeRender(z,et,dt,ft,it,Vt),C.modelViewMatrix.multiplyMatrices(dt.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),it.onBeforeRender(z,et,dt,ft,C,Vt),it.transparent===!0&&it.side===Ga&&it.forceSinglePass===!1?(it.side=Ai,it.needsUpdate=!0,z.renderBufferDirect(dt,et,ft,it,C,Vt),it.side=As,it.needsUpdate=!0,z.renderBufferDirect(dt,et,ft,it,C,Vt),it.side=Ga):z.renderBufferDirect(dt,et,ft,it,C,Vt),C.onAfterRender(z,et,dt,ft,it,Vt)}function rn(C,et,dt){et.isScene!==!0&&(et=Pe);const ft=me.get(C),it=v.state.lights,Vt=v.state.shadowsArray,ee=it.state.version,te=ie.getParameters(C,it.state,Vt,et,dt),he=ie.getProgramCacheKey(te);let Re=ft.programs;ft.environment=C.isMeshStandardMaterial?et.environment:null,ft.fog=et.fog,ft.envMap=(C.isMeshStandardMaterial?rt:A).get(C.envMap||ft.environment),ft.envMapRotation=ft.environment!==null&&C.envMap===null?et.environmentRotation:C.envMapRotation,Re===void 0&&(C.addEventListener("dispose",Pt),Re=new Map,ft.programs=Re);let Ee=Re.get(he);if(Ee!==void 0){if(ft.currentProgram===Ee&&ft.lightsStateVersion===ee)return li(C,te),Ee}else te.uniforms=ie.getUniforms(C),C.onBeforeCompile(te,z),Ee=ie.acquireProgram(te,he),Re.set(he,Ee),ft.uniforms=te.uniforms;const ue=ft.uniforms;return(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(ue.clippingPlanes=pt.uniform),li(C,te),ft.needsLights=wi(C),ft.lightsStateVersion=ee,ft.needsLights&&(ue.ambientLightColor.value=it.state.ambient,ue.lightProbe.value=it.state.probe,ue.directionalLights.value=it.state.directional,ue.directionalLightShadows.value=it.state.directionalShadow,ue.spotLights.value=it.state.spot,ue.spotLightShadows.value=it.state.spotShadow,ue.rectAreaLights.value=it.state.rectArea,ue.ltc_1.value=it.state.rectAreaLTC1,ue.ltc_2.value=it.state.rectAreaLTC2,ue.pointLights.value=it.state.point,ue.pointLightShadows.value=it.state.pointShadow,ue.hemisphereLights.value=it.state.hemi,ue.directionalShadowMap.value=it.state.directionalShadowMap,ue.directionalShadowMatrix.value=it.state.directionalShadowMatrix,ue.spotShadowMap.value=it.state.spotShadowMap,ue.spotLightMatrix.value=it.state.spotLightMatrix,ue.spotLightMap.value=it.state.spotLightMap,ue.pointShadowMap.value=it.state.pointShadowMap,ue.pointShadowMatrix.value=it.state.pointShadowMatrix),ft.currentProgram=Ee,ft.uniformsList=null,Ee}function mn(C){if(C.uniformsList===null){const et=C.currentProgram.getUniforms();C.uniformsList=hu.seqWithValue(et.seq,C.uniforms)}return C.uniformsList}function li(C,et){const dt=me.get(C);dt.outputColorSpace=et.outputColorSpace,dt.batching=et.batching,dt.batchingColor=et.batchingColor,dt.instancing=et.instancing,dt.instancingColor=et.instancingColor,dt.instancingMorph=et.instancingMorph,dt.skinning=et.skinning,dt.morphTargets=et.morphTargets,dt.morphNormals=et.morphNormals,dt.morphColors=et.morphColors,dt.morphTargetsCount=et.morphTargetsCount,dt.numClippingPlanes=et.numClippingPlanes,dt.numIntersection=et.numClipIntersection,dt.vertexAlphas=et.vertexAlphas,dt.vertexTangents=et.vertexTangents,dt.toneMapping=et.toneMapping}function Ci(C,et,dt,ft,it){et.isScene!==!0&&(et=Pe),P.resetTextureUnits();const Vt=et.fog,ee=ft.isMeshStandardMaterial?et.environment:null,te=j===null?z.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ho,he=(ft.isMeshStandardMaterial?rt:A).get(ft.envMap||ee),Re=ft.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,Ee=!!dt.attributes.tangent&&(!!ft.normalMap||ft.anisotropy>0),ue=!!dt.morphAttributes.position,Ne=!!dt.morphAttributes.normal,sn=!!dt.morphAttributes.color;let on=bs;ft.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(on=z.toneMapping);const O=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,U=O!==void 0?O.length:0,L=me.get(ft),lt=v.state.lights;if(yt===!0&&(Ft===!0||C!==b)){const Yt=C===b&&ft.id===N;pt.setState(ft,C,Yt)}let tt=!1;ft.version===L.__version?(L.needsLights&&L.lightsStateVersion!==lt.state.version||L.outputColorSpace!==te||it.isBatchedMesh&&L.batching===!1||!it.isBatchedMesh&&L.batching===!0||it.isBatchedMesh&&L.batchingColor===!0&&it.colorTexture===null||it.isBatchedMesh&&L.batchingColor===!1&&it.colorTexture!==null||it.isInstancedMesh&&L.instancing===!1||!it.isInstancedMesh&&L.instancing===!0||it.isSkinnedMesh&&L.skinning===!1||!it.isSkinnedMesh&&L.skinning===!0||it.isInstancedMesh&&L.instancingColor===!0&&it.instanceColor===null||it.isInstancedMesh&&L.instancingColor===!1&&it.instanceColor!==null||it.isInstancedMesh&&L.instancingMorph===!0&&it.morphTexture===null||it.isInstancedMesh&&L.instancingMorph===!1&&it.morphTexture!==null||L.envMap!==he||ft.fog===!0&&L.fog!==Vt||L.numClippingPlanes!==void 0&&(L.numClippingPlanes!==pt.numPlanes||L.numIntersection!==pt.numIntersection)||L.vertexAlphas!==Re||L.vertexTangents!==Ee||L.morphTargets!==ue||L.morphNormals!==Ne||L.morphColors!==sn||L.toneMapping!==on||L.morphTargetsCount!==U)&&(tt=!0):(tt=!0,L.__version=ft.version);let Et=L.currentProgram;tt===!0&&(Et=rn(ft,et,it));let It=!1,Ct=!1,Ht=!1;const Bt=Et.getUniforms(),oe=L.uniforms;if(Kt.useProgram(Et.program)&&(It=!0,Ct=!0,Ht=!0),ft.id!==N&&(N=ft.id,Ct=!0),It||b!==C){Kt.buffers.depth.getReversed()?(wt.copy(C.projectionMatrix),QM(wt),JM(wt),Bt.setValue(at,"projectionMatrix",wt)):Bt.setValue(at,"projectionMatrix",C.projectionMatrix),Bt.setValue(at,"viewMatrix",C.matrixWorldInverse);const ge=Bt.map.cameraPosition;ge!==void 0&&ge.setValue(at,ae.setFromMatrixPosition(C.matrixWorld)),jt.logarithmicDepthBuffer&&Bt.setValue(at,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),(ft.isMeshPhongMaterial||ft.isMeshToonMaterial||ft.isMeshLambertMaterial||ft.isMeshBasicMaterial||ft.isMeshStandardMaterial||ft.isShaderMaterial)&&Bt.setValue(at,"isOrthographic",C.isOrthographicCamera===!0),b!==C&&(b=C,Ct=!0,Ht=!0)}if(it.isSkinnedMesh){Bt.setOptional(at,it,"bindMatrix"),Bt.setOptional(at,it,"bindMatrixInverse");const Yt=it.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),Bt.setValue(at,"boneTexture",Yt.boneTexture,P))}it.isBatchedMesh&&(Bt.setOptional(at,it,"batchingTexture"),Bt.setValue(at,"batchingTexture",it._matricesTexture,P),Bt.setOptional(at,it,"batchingIdTexture"),Bt.setValue(at,"batchingIdTexture",it._indirectTexture,P),Bt.setOptional(at,it,"batchingColorTexture"),it._colorsTexture!==null&&Bt.setValue(at,"batchingColorTexture",it._colorsTexture,P));const Nt=dt.morphAttributes;if((Nt.position!==void 0||Nt.normal!==void 0||Nt.color!==void 0)&&re.update(it,dt,Et),(Ct||L.receiveShadow!==it.receiveShadow)&&(L.receiveShadow=it.receiveShadow,Bt.setValue(at,"receiveShadow",it.receiveShadow)),ft.isMeshGouraudMaterial&&ft.envMap!==null&&(oe.envMap.value=he,oe.flipEnvMap.value=he.isCubeTexture&&he.isRenderTargetTexture===!1?-1:1),ft.isMeshStandardMaterial&&ft.envMap===null&&et.environment!==null&&(oe.envMapIntensity.value=et.environmentIntensity),Ct&&(Bt.setValue(at,"toneMappingExposure",z.toneMappingExposure),L.needsLights&&la(oe,Ht),Vt&&ft.fog===!0&&Xt.refreshFogUniforms(oe,Vt),Xt.refreshMaterialUniforms(oe,ft,G,X,v.state.transmissionRenderTarget[C.id]),hu.upload(at,mn(L),oe,P)),ft.isShaderMaterial&&ft.uniformsNeedUpdate===!0&&(hu.upload(at,mn(L),oe,P),ft.uniformsNeedUpdate=!1),ft.isSpriteMaterial&&Bt.setValue(at,"center",it.center),Bt.setValue(at,"modelViewMatrix",it.modelViewMatrix),Bt.setValue(at,"normalMatrix",it.normalMatrix),Bt.setValue(at,"modelMatrix",it.matrixWorld),ft.isShaderMaterial||ft.isRawShaderMaterial){const Yt=ft.uniformsGroups;for(let ge=0,fe=Yt.length;ge<fe;ge++){const de=Yt[ge];$.update(de,Et),$.bind(de,Et)}}return Et}function la(C,et){C.ambientLightColor.needsUpdate=et,C.lightProbe.needsUpdate=et,C.directionalLights.needsUpdate=et,C.directionalLightShadows.needsUpdate=et,C.pointLights.needsUpdate=et,C.pointLightShadows.needsUpdate=et,C.spotLights.needsUpdate=et,C.spotLightShadows.needsUpdate=et,C.rectAreaLights.needsUpdate=et,C.hemisphereLights.needsUpdate=et}function wi(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return H},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(C,et,dt){me.get(C.texture).__webglTexture=et,me.get(C.depthTexture).__webglTexture=dt;const ft=me.get(C);ft.__hasExternalTextures=!0,ft.__autoAllocateDepthBuffer=dt===void 0,ft.__autoAllocateDepthBuffer||Ue.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ft.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(C,et){const dt=me.get(C);dt.__webglFramebuffer=et,dt.__useDefaultFramebuffer=et===void 0},this.setRenderTarget=function(C,et=0,dt=0){j=C,H=et,D=dt;let ft=!0,it=null,Vt=!1,ee=!1;if(C){const he=me.get(C);if(he.__useDefaultFramebuffer!==void 0)Kt.bindFramebuffer(at.FRAMEBUFFER,null),ft=!1;else if(he.__webglFramebuffer===void 0)P.setupRenderTarget(C);else if(he.__hasExternalTextures)P.rebindTextures(C,me.get(C.texture).__webglTexture,me.get(C.depthTexture).__webglTexture);else if(C.depthBuffer){const ue=C.depthTexture;if(he.__boundDepthTexture!==ue){if(ue!==null&&me.has(ue)&&(C.width!==ue.image.width||C.height!==ue.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(C)}}const Re=C.texture;(Re.isData3DTexture||Re.isDataArrayTexture||Re.isCompressedArrayTexture)&&(ee=!0);const Ee=me.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(Array.isArray(Ee[et])?it=Ee[et][dt]:it=Ee[et],Vt=!0):C.samples>0&&P.useMultisampledRTT(C)===!1?it=me.get(C).__webglMultisampledFramebuffer:Array.isArray(Ee)?it=Ee[dt]:it=Ee,B.copy(C.viewport),Y.copy(C.scissor),Z=C.scissorTest}else B.copy(V).multiplyScalar(G).floor(),Y.copy(ct).multiplyScalar(G).floor(),Z=Lt;if(Kt.bindFramebuffer(at.FRAMEBUFFER,it)&&ft&&Kt.drawBuffers(C,it),Kt.viewport(B),Kt.scissor(Y),Kt.setScissorTest(Z),Vt){const he=me.get(C.texture);at.framebufferTexture2D(at.FRAMEBUFFER,at.COLOR_ATTACHMENT0,at.TEXTURE_CUBE_MAP_POSITIVE_X+et,he.__webglTexture,dt)}else if(ee){const he=me.get(C.texture),Re=et||0;at.framebufferTextureLayer(at.FRAMEBUFFER,at.COLOR_ATTACHMENT0,he.__webglTexture,dt||0,Re)}N=-1},this.readRenderTargetPixels=function(C,et,dt,ft,it,Vt,ee){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let te=me.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ee!==void 0&&(te=te[ee]),te){Kt.bindFramebuffer(at.FRAMEBUFFER,te);try{const he=C.texture,Re=he.format,Ee=he.type;if(!jt.textureFormatReadable(Re)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!jt.textureTypeReadable(Ee)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}et>=0&&et<=C.width-ft&&dt>=0&&dt<=C.height-it&&at.readPixels(et,dt,ft,it,Me.convert(Re),Me.convert(Ee),Vt)}finally{const he=j!==null?me.get(j).__webglFramebuffer:null;Kt.bindFramebuffer(at.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(C,et,dt,ft,it,Vt,ee){if(!(C&&C.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let te=me.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&ee!==void 0&&(te=te[ee]),te){const he=C.texture,Re=he.format,Ee=he.type;if(!jt.textureFormatReadable(Re))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!jt.textureTypeReadable(Ee))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(et>=0&&et<=C.width-ft&&dt>=0&&dt<=C.height-it){Kt.bindFramebuffer(at.FRAMEBUFFER,te);const ue=at.createBuffer();at.bindBuffer(at.PIXEL_PACK_BUFFER,ue),at.bufferData(at.PIXEL_PACK_BUFFER,Vt.byteLength,at.STREAM_READ),at.readPixels(et,dt,ft,it,Me.convert(Re),Me.convert(Ee),0);const Ne=j!==null?me.get(j).__webglFramebuffer:null;Kt.bindFramebuffer(at.FRAMEBUFFER,Ne);const sn=at.fenceSync(at.SYNC_GPU_COMMANDS_COMPLETE,0);return at.flush(),await KM(at,sn,4),at.bindBuffer(at.PIXEL_PACK_BUFFER,ue),at.getBufferSubData(at.PIXEL_PACK_BUFFER,0,Vt),at.deleteBuffer(ue),at.deleteSync(sn),Vt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(C,et=null,dt=0){C.isTexture!==!0&&(ml("WebGLRenderer: copyFramebufferToTexture function signature has changed."),et=arguments[0]||null,C=arguments[1]);const ft=Math.pow(2,-dt),it=Math.floor(C.image.width*ft),Vt=Math.floor(C.image.height*ft),ee=et!==null?et.x:0,te=et!==null?et.y:0;P.setTexture2D(C,0),at.copyTexSubImage2D(at.TEXTURE_2D,dt,0,0,ee,te,it,Vt),Kt.unbindTexture()},this.copyTextureToTexture=function(C,et,dt=null,ft=null,it=0){C.isTexture!==!0&&(ml("WebGLRenderer: copyTextureToTexture function signature has changed."),ft=arguments[0]||null,C=arguments[1],et=arguments[2],it=arguments[3]||0,dt=null);let Vt,ee,te,he,Re,Ee,ue,Ne,sn;const on=C.isCompressedTexture?C.mipmaps[it]:C.image;dt!==null?(Vt=dt.max.x-dt.min.x,ee=dt.max.y-dt.min.y,te=dt.isBox3?dt.max.z-dt.min.z:1,he=dt.min.x,Re=dt.min.y,Ee=dt.isBox3?dt.min.z:0):(Vt=on.width,ee=on.height,te=on.depth||1,he=0,Re=0,Ee=0),ft!==null?(ue=ft.x,Ne=ft.y,sn=ft.z):(ue=0,Ne=0,sn=0);const O=Me.convert(et.format),U=Me.convert(et.type);let L;et.isData3DTexture?(P.setTexture3D(et,0),L=at.TEXTURE_3D):et.isDataArrayTexture||et.isCompressedArrayTexture?(P.setTexture2DArray(et,0),L=at.TEXTURE_2D_ARRAY):(P.setTexture2D(et,0),L=at.TEXTURE_2D),at.pixelStorei(at.UNPACK_FLIP_Y_WEBGL,et.flipY),at.pixelStorei(at.UNPACK_PREMULTIPLY_ALPHA_WEBGL,et.premultiplyAlpha),at.pixelStorei(at.UNPACK_ALIGNMENT,et.unpackAlignment);const lt=at.getParameter(at.UNPACK_ROW_LENGTH),tt=at.getParameter(at.UNPACK_IMAGE_HEIGHT),Et=at.getParameter(at.UNPACK_SKIP_PIXELS),It=at.getParameter(at.UNPACK_SKIP_ROWS),Ct=at.getParameter(at.UNPACK_SKIP_IMAGES);at.pixelStorei(at.UNPACK_ROW_LENGTH,on.width),at.pixelStorei(at.UNPACK_IMAGE_HEIGHT,on.height),at.pixelStorei(at.UNPACK_SKIP_PIXELS,he),at.pixelStorei(at.UNPACK_SKIP_ROWS,Re),at.pixelStorei(at.UNPACK_SKIP_IMAGES,Ee);const Ht=C.isDataArrayTexture||C.isData3DTexture,Bt=et.isDataArrayTexture||et.isData3DTexture;if(C.isRenderTargetTexture||C.isDepthTexture){const oe=me.get(C),Nt=me.get(et),Yt=me.get(oe.__renderTarget),ge=me.get(Nt.__renderTarget);Kt.bindFramebuffer(at.READ_FRAMEBUFFER,Yt.__webglFramebuffer),Kt.bindFramebuffer(at.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let fe=0;fe<te;fe++)Ht&&at.framebufferTextureLayer(at.READ_FRAMEBUFFER,at.COLOR_ATTACHMENT0,me.get(C).__webglTexture,it,Ee+fe),C.isDepthTexture?(Bt&&at.framebufferTextureLayer(at.DRAW_FRAMEBUFFER,at.COLOR_ATTACHMENT0,me.get(et).__webglTexture,it,sn+fe),at.blitFramebuffer(he,Re,Vt,ee,ue,Ne,Vt,ee,at.DEPTH_BUFFER_BIT,at.NEAREST)):Bt?at.copyTexSubImage3D(L,it,ue,Ne,sn+fe,he,Re,Vt,ee):at.copyTexSubImage2D(L,it,ue,Ne,sn+fe,he,Re,Vt,ee);Kt.bindFramebuffer(at.READ_FRAMEBUFFER,null),Kt.bindFramebuffer(at.DRAW_FRAMEBUFFER,null)}else Bt?C.isDataTexture||C.isData3DTexture?at.texSubImage3D(L,it,ue,Ne,sn,Vt,ee,te,O,U,on.data):et.isCompressedArrayTexture?at.compressedTexSubImage3D(L,it,ue,Ne,sn,Vt,ee,te,O,on.data):at.texSubImage3D(L,it,ue,Ne,sn,Vt,ee,te,O,U,on):C.isDataTexture?at.texSubImage2D(at.TEXTURE_2D,it,ue,Ne,Vt,ee,O,U,on.data):C.isCompressedTexture?at.compressedTexSubImage2D(at.TEXTURE_2D,it,ue,Ne,on.width,on.height,O,on.data):at.texSubImage2D(at.TEXTURE_2D,it,ue,Ne,Vt,ee,O,U,on);at.pixelStorei(at.UNPACK_ROW_LENGTH,lt),at.pixelStorei(at.UNPACK_IMAGE_HEIGHT,tt),at.pixelStorei(at.UNPACK_SKIP_PIXELS,Et),at.pixelStorei(at.UNPACK_SKIP_ROWS,It),at.pixelStorei(at.UNPACK_SKIP_IMAGES,Ct),it===0&&et.generateMipmaps&&at.generateMipmap(L),Kt.unbindTexture()},this.copyTextureToTexture3D=function(C,et,dt=null,ft=null,it=0){return C.isTexture!==!0&&(ml("WebGLRenderer: copyTextureToTexture3D function signature has changed."),dt=arguments[0]||null,ft=arguments[1]||null,C=arguments[2],et=arguments[3],it=arguments[4]||0),ml('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(C,et,dt,ft,it)},this.initRenderTarget=function(C){me.get(C).__webglFramebuffer===void 0&&P.setupRenderTarget(C)},this.initTexture=function(C){C.isCubeTexture?P.setTextureCube(C,0):C.isData3DTexture?P.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?P.setTexture2DArray(C,0):P.setTexture2D(C,0),Kt.unbindTexture()},this.resetState=function(){H=0,D=0,j=null,Kt.reset(),Oe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Va}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const i=this.getContext();i.drawingBufferColorspace=un._getDrawingBufferColorSpace(e),i.unpackColorSpace=un._getUnpackColorSpace()}}class up{constructor(e,i=25e-5){this.isFogExp2=!0,this.name="",this.color=new an(e),this.density=i}clone(){return new up(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class G_ extends vi{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new qa,this.environmentIntensity=1,this.environmentRotation=new qa,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,i){return super.copy(e,i),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const i=super.toJSON(e);return this.fog!==null&&(i.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(i.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(i.object.backgroundIntensity=this.backgroundIntensity),i.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(i.object.environmentIntensity=this.environmentIntensity),i.object.environmentRotation=this.environmentRotation.toArray(),i}}class oA extends gi{constructor(e=null,i=1,s=1,l,c,d,h,p,m=Fi,_=Fi,g,x){super(null,d,h,p,m,_,l,c,g,x),this.isDataTexture=!0,this.image={data:e,width:i,height:s},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gu extends wn{constructor(e,i,s,l=1){super(e,i,s),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=l}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $r=new Dn,Zv=new Dn,Jc=[],Kv=new lr,lA=new Dn,ul=new $i,fl=new cr;class cA extends $i{constructor(e,i,s){super(e,i),this.isInstancedMesh=!0,this.instanceMatrix=new gu(new Float32Array(s*16),16),this.instanceColor=null,this.morphTexture=null,this.count=s,this.boundingBox=null,this.boundingSphere=null;for(let l=0;l<s;l++)this.setMatrixAt(l,lA)}computeBoundingBox(){const e=this.geometry,i=this.count;this.boundingBox===null&&(this.boundingBox=new lr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let s=0;s<i;s++)this.getMatrixAt(s,$r),Kv.copy(e.boundingBox).applyMatrix4($r),this.boundingBox.union(Kv)}computeBoundingSphere(){const e=this.geometry,i=this.count;this.boundingSphere===null&&(this.boundingSphere=new cr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let s=0;s<i;s++)this.getMatrixAt(s,$r),fl.copy(e.boundingSphere).applyMatrix4($r),this.boundingSphere.union(fl)}copy(e,i){return super.copy(e,i),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,i){i.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,i){i.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,i){const s=i.morphTargetInfluences,l=this.morphTexture.source.data.data,c=s.length+1,d=e*c+1;for(let h=0;h<s.length;h++)s[h]=l[d+h]}raycast(e,i){const s=this.matrixWorld,l=this.count;if(ul.geometry=this.geometry,ul.material=this.material,ul.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),fl.copy(this.boundingSphere),fl.applyMatrix4(s),e.ray.intersectsSphere(fl)!==!1))for(let c=0;c<l;c++){this.getMatrixAt(c,$r),Zv.multiplyMatrices(s,$r),ul.matrixWorld=Zv,ul.raycast(e,Jc);for(let d=0,h=Jc.length;d<h;d++){const p=Jc[d];p.instanceId=c,p.object=this,i.push(p)}Jc.length=0}}setColorAt(e,i){this.instanceColor===null&&(this.instanceColor=new gu(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),i.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,i){i.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,i){const s=i.morphTargetInfluences,l=s.length+1;this.morphTexture===null&&(this.morphTexture=new oA(new Float32Array(l*this.count),l,this.count,ap,ga));const c=this.morphTexture.source.data.data;let d=0;for(let m=0;m<s.length;m++)d+=s[m];const h=this.geometry.morphTargetsRelative?1:1-d,p=l*e;c[p]=h,c.set(s,p+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class V_ extends mo{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new an(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const vu=new vt,_u=new vt,Qv=new Dn,hl=new lp,$c=new cr,ad=new vt,Jv=new vt;class uA extends vi{constructor(e=new Ri,i=new V_){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[0];for(let l=1,c=i.count;l<c;l++)vu.fromBufferAttribute(i,l-1),_u.fromBufferAttribute(i,l),s[l]=s[l-1],s[l]+=vu.distanceTo(_u);e.setAttribute("lineDistance",new va(s,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Line.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),$c.copy(s.boundingSphere),$c.applyMatrix4(l),$c.radius+=c,e.ray.intersectsSphere($c)===!1)return;Qv.copy(l).invert(),hl.copy(e.ray).applyMatrix4(Qv);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=this.isLineSegments?2:1,_=s.index,x=s.attributes.position;if(_!==null){const S=Math.max(0,d.start),E=Math.min(_.count,d.start+d.count);for(let T=S,M=E-1;T<M;T+=m){const v=_.getX(T),I=_.getX(T+1),F=tu(this,e,hl,p,v,I);F&&i.push(F)}if(this.isLineLoop){const T=_.getX(E-1),M=_.getX(S),v=tu(this,e,hl,p,T,M);v&&i.push(v)}}else{const S=Math.max(0,d.start),E=Math.min(x.count,d.start+d.count);for(let T=S,M=E-1;T<M;T+=m){const v=tu(this,e,hl,p,T,T+1);v&&i.push(v)}if(this.isLineLoop){const T=tu(this,e,hl,p,E-1,S);T&&i.push(T)}}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function tu(r,e,i,s,l,c){const d=r.geometry.attributes.position;if(vu.fromBufferAttribute(d,l),_u.fromBufferAttribute(d,c),i.distanceSqToSegment(vu,_u,ad,Jv)>s)return;ad.applyMatrix4(r.matrixWorld);const p=e.ray.origin.distanceTo(ad);if(!(p<e.near||p>e.far))return{distance:p,point:Jv.clone().applyMatrix4(r.matrixWorld),index:l,face:null,faceIndex:null,barycoord:null,object:r}}const $v=new vt,t_=new vt;class jd extends uA{constructor(e,i){super(e,i),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const i=e.attributes.position,s=[];for(let l=0,c=i.count;l<c;l+=2)$v.fromBufferAttribute(i,l),t_.fromBufferAttribute(i,l+1),s[l]=l===0?0:s[l-1],s[l+1]=s[l]+$v.distanceTo(t_);e.setAttribute("lineDistance",new va(s,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fA extends mo{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new an(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const e_=new Dn,Yd=new lp,eu=new cr,nu=new vt;class Zd extends vi{constructor(e=new Ri,i=new fA){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=i,this.updateMorphTargets()}copy(e,i){return super.copy(e,i),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,i){const s=this.geometry,l=this.matrixWorld,c=e.params.Points.threshold,d=s.drawRange;if(s.boundingSphere===null&&s.computeBoundingSphere(),eu.copy(s.boundingSphere),eu.applyMatrix4(l),eu.radius+=c,e.ray.intersectsSphere(eu)===!1)return;e_.copy(l).invert(),Yd.copy(e.ray).applyMatrix4(e_);const h=c/((this.scale.x+this.scale.y+this.scale.z)/3),p=h*h,m=s.index,g=s.attributes.position;if(m!==null){const x=Math.max(0,d.start),S=Math.min(m.count,d.start+d.count);for(let E=x,T=S;E<T;E++){const M=m.getX(E);nu.fromBufferAttribute(g,M),n_(nu,M,p,l,e,i,this)}}else{const x=Math.max(0,d.start),S=Math.min(g.count,d.start+d.count);for(let E=x,T=S;E<T;E++)nu.fromBufferAttribute(g,E),n_(nu,E,p,l,e,i,this)}}updateMorphTargets(){const i=this.geometry.morphAttributes,s=Object.keys(i);if(s.length>0){const l=i[s[0]];if(l!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let c=0,d=l.length;c<d;c++){const h=l[c].name||String(c);this.morphTargetInfluences.push(0),this.morphTargetDictionary[h]=c}}}}}function n_(r,e,i,s,l,c,d){const h=Yd.distanceSqToPoint(r);if(h<i){const p=new vt;Yd.closestPointToPoint(r,p),p.applyMatrix4(s);const m=l.ray.origin.distanceTo(p);if(m<l.near||m>l.far)return;c.push({distance:m,distanceToRay:Math.sqrt(h),point:p,index:e,face:null,faceIndex:null,barycoord:null,object:d})}}const iu=new vt,au=new vt,sd=new vt,su=new Ji;class hA extends Ri{constructor(e=null,i=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:i},e!==null){const l=Math.pow(10,4),c=Math.cos(fu*i),d=e.getIndex(),h=e.getAttribute("position"),p=d?d.count:h.count,m=[0,0,0],_=["a","b","c"],g=new Array(3),x={},S=[];for(let E=0;E<p;E+=3){d?(m[0]=d.getX(E),m[1]=d.getX(E+1),m[2]=d.getX(E+2)):(m[0]=E,m[1]=E+1,m[2]=E+2);const{a:T,b:M,c:v}=su;if(T.fromBufferAttribute(h,m[0]),M.fromBufferAttribute(h,m[1]),v.fromBufferAttribute(h,m[2]),su.getNormal(sd),g[0]=`${Math.round(T.x*l)},${Math.round(T.y*l)},${Math.round(T.z*l)}`,g[1]=`${Math.round(M.x*l)},${Math.round(M.y*l)},${Math.round(M.z*l)}`,g[2]=`${Math.round(v.x*l)},${Math.round(v.y*l)},${Math.round(v.z*l)}`,!(g[0]===g[1]||g[1]===g[2]||g[2]===g[0]))for(let I=0;I<3;I++){const F=(I+1)%3,z=g[I],Q=g[F],H=su[_[I]],D=su[_[F]],j=`${z}_${Q}`,N=`${Q}_${z}`;N in x&&x[N]?(sd.dot(x[N].normal)<=c&&(S.push(H.x,H.y,H.z),S.push(D.x,D.y,D.z)),x[N]=null):j in x||(x[j]={index0:m[I],index1:m[F],normal:sd.clone()})}}for(const E in x)if(x[E]){const{index0:T,index1:M}=x[E];iu.fromBufferAttribute(h,T),au.fromBufferAttribute(h,M),S.push(iu.x,iu.y,iu.z),S.push(au.x,au.y,au.z)}this.setAttribute("position",new va(S,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:tp}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=tp);function dA(r,e=300){if(!r||!Array.isArray(r.nodes)||!Array.isArray(r.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const i=r.nodes.filter(p=>p&&typeof p.id=="string"),s=i.slice().sort((p,m)=>p.id.localeCompare(m.id)).slice(0,e),l=new Set(s.map(p=>p.id)),d=[...new Set(s.map(p=>p.type||"unknown"))].sort().map((p,m)=>({id:p,name:p.replaceAll("_"," "),dark:`hsl(${m*137.508%360}, 48%, 77%)`,light:`hsl(${m*137.508%360}, 45%, 34%)`,anchor:[Math.cos(m*2.4),Math.sin(m*1.7),Math.sin(m*2.4)]})),h=Object.fromEntries(s.map(p=>[p.id,{label:p.label||p.name||p.id,kind:p.type||"unknown",path:p.properties?.path||p.properties?.filePath||p.uri||"",status:p.properties?.status||"Im aktuellen Graph-Snapshot",prov:[p.id,p.updatedAt].filter(Boolean).join(" · ")}]));return{CLUSTERS:d,META:h,NODES:s.map(p=>[p.id,p.type||"unknown",p.type==="file"?3:2,p.label||p.name||p.id]),EDGES:r.edges.filter(p=>l.has(p.sourceId)&&l.has(p.targetId)).map(p=>[p.sourceId,p.targetId,["links_to","references"].includes(p.type)?"rel":"pre"]),totalNodes:i.length,totalEdges:r.edges.length}}function pA(r){const{CLUSTERS:e,NODES:i,EDGES:s,META:l}=dA(r);let c="dark";for(const b of e)b.color=b[c];const d=Object.fromEntries(e.map(b=>[b.id,b])),h=i.map(([b,B,Y,Z],nt)=>({i:nt,id:b,name:l[b].label,cid:B,w:Y,desc:Z,cluster:d[B],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),p=Object.fromEntries(h.map(b=>[b.id,b]));for(const b of h)b.meta=l[b.id]||{};const m=[];for(const[b,B,Y]of s){const Z=p[b],nt=p[B];if(!Z||!nt){console.warn("[atlas] Dropped invalid edge:",b,"→",B);continue}m.push({s:Z,t:nt,kind:Y,i:m.length,alpha:1}),Y==="pre"?(Z.out.push(nt),nt.in.push(Z)):(Z.rel.push(nt),nt.rel.push(Z))}const _=b=>b.out.length+b.in.length+b.rel.length,g=h.map(()=>[]);for(const b of m)g[b.s.i].push(b.t.i),g[b.t.i].push(b.s.i);const x=42;for(const b of e){const[B,Y,Z]=b.anchor,nt=Math.hypot(B,Y,Z)||1;b.dir=[B/nt,Y/nt,Z/nt]}const S=new Array(h.length).fill(-1);(function(){let B=!0,Y=0;for(const Z of h)Z.in.length||(S[Z.i]=0);for(;B&&Y++<40;){B=!1;for(const Z of h){let nt=Z.in.length?-1:0;for(const _t of Z.in)S[_t.i]>=0&&(nt=Math.max(nt,S[_t.i]+1));nt>=0&&nt!==S[Z.i]&&(S[Z.i]=nt,B=!0)}}for(let Z=0;Z<S.length;Z++)S[Z]<0&&(S[Z]=2)})();const E=Math.max(1,...S),T={atlas:[],shell:[],tier:[]};h.forEach((b,B)=>{const Y=b.cluster.dir,Z=1-Math.min(_(b),12)/26;T.atlas.push([Y[0]*x*Z,Y[1]*x*Z,Y[2]*x*Z]);const nt=e.indexOf(b.cluster),_t=h.filter(ot=>ot.cid===b.cid).indexOf(b),w=h.filter(ot=>ot.cid===b.cid).length,X=(nt/e.length+_t/w/e.length)*Math.PI*2,G=(_t/w-.5)*1.5;T.shell.push([x*.95*Math.cos(G)*Math.cos(X),x*.95*Math.sin(G),x*.95*Math.cos(G)*Math.sin(X)]),T.tier.push([Y[0]*x*.72,(S[B]/E-.5)*x*1.5,Y[2]*x*.72])});let M="atlas";h.forEach((b,B)=>{const Y=T.atlas[B];b.x=Y[0]+(Math.random()-.5)*16,b.y=Y[1]+(Math.random()-.5)*16,b.z=Y[2]+(Math.random()-.5)*16});let v=1;const I=9,F=.04,z=130,Q=.05;function H(){if(v<.004)return;const b=T[M];for(let B=0;B<h.length;B++){const Y=h[B];for(let Z=B+1;Z<h.length;Z++){const nt=h[Z];let _t=Y.x-nt.x,w=Y.y-nt.y,X=Y.z-nt.z,G=_t*_t+w*w+X*X+.6;const ot=z/G,Dt=Math.sqrt(G);_t/=Dt,w/=Dt,X/=Dt,Y.vx+=_t*ot,Y.vy+=w*ot,Y.vz+=X*ot,nt.vx-=_t*ot,nt.vy-=w*ot,nt.vz-=X*ot}}for(const B of m){const Y=B.s,Z=B.t;let nt=Z.x-Y.x,_t=Z.y-Y.y,w=Z.z-Y.z;const X=Math.hypot(nt,_t,w)||1,G=(X-I)*F;nt/=X,_t/=X,w/=X,Y.vx+=nt*G,Y.vy+=_t*G,Y.vz+=w*G,Z.vx-=nt*G,Z.vy-=_t*G,Z.vz-=w*G}for(let B=0;B<h.length;B++){const Y=h[B],Z=b[B];Y.vx+=(Z[0]-Y.x)*Q,Y.vy+=(Z[1]-Y.y)*Q,Y.vz+=(Z[2]-Y.z)*Q;const nt=.82;Y.vx*=nt,Y.vy*=nt,Y.vz*=nt,Y.x+=Y.vx*v,Y.y+=Y.vy*v,Y.z+=Y.vz*v}v*=.988}for(let b=0;b<220;b++)H();const D=46;function j(){let b=0;for(const B of h)b=Math.max(b,Math.hypot(B.x,B.y,B.z));return Math.max(10,b)/Math.sin(D*Math.PI/360)*.88}function N({els:b,emit:B}){const Y=new AbortController,{signal:Z}=Y,nt=(xt,At,W,ie)=>xt.addEventListener(At,W,{...ie,signal:Z});let _t=0;const{stage:w}=b;let X,G,ot,Dt,V,ct,Lt=!0;try{X=new H_({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{Lt=!1}if(X||(Lt=!1),!Lt)return B.gate(!0),{dispose(){}};{let C=function(mt,Zt){const kt=re.uniforms.uPx.value;for(const ne of h){wi.set(ne.x,ne.y,ne.z);const _e=ot.position.distanceTo(wi);wi.project(ot),ne.sx=(wi.x*.5+.5)*mt,ne.sy=(-wi.y*.5+.5)*Zt,ne.sz=wi.z,ne.sr=ne.size*ne.scale*kt/Math.max(_e,1)*.5}},Vt=function(){et.fill(1),dt.fill(1),ft.fill(1);const mt=it,Zt=kt=>!mt||kt.name.toLowerCase().includes(mt)||kt.desc.toLowerCase().includes(mt)||(kt.meta.path||"").toLowerCase().includes(mt)||(kt.meta.kind||"").toLowerCase().includes(mt);for(const kt of h)kt.vis=!Ci.has(kt.cid)&&Zt(kt),kt.vis||(et[kt.i]=0,dt[kt.i]=.6);for(const kt of m)(!kt.s.vis||!kt.t.vis)&&(ft[kt.i]=0);if(bn){for(const kt of h)kt.vis&&(et[kt.i]=bn.has(kt.i)?1:la,dt[kt.i]=bn.has(kt.i)?1.25:.8);for(const kt of m)ft[kt.i]&&(ft[kt.i]=bn.has(kt.s.i)&&bn.has(kt.t.i)?1.35:la*.5)}else if(Ie){const kt=new Set([Ie.i,...g[Ie.i]]);for(const ne of h)ne.vis&&(et[ne.i]=kt.has(ne.i)?1:la,dt[ne.i]=ne===Ie?1.75:kt.has(ne.i)?1.15:.75);for(const ne of m)ft[ne.i]&&(ft[ne.i]=ne.s===Ie||ne.t===Ie?1.4:la*.45)}return vn&&vn.vis&&(et[vn.i]=1,dt[vn.i]=Math.max(dt[vn.i],1.6)),{nT:et,sT:dt,eT:ft}},ee=function(mt){Ie=mt,bn=null,b.pathbar.classList.remove("on"),Pt.tx=mt.x,Pt.ty=mt.y,Pt.tz=mt.z,Pt.tDist=Math.min(Pt.tDist,$t*.72),cn(mt),Ye(),De()},te=function(){Ie=null,bn=null,Pt.tx=Pt.ty=Pt.tz=0,b.pathbar.classList.remove("on"),cn(null),Ye(),De()},he=function(mt,Zt){const kt=new Array(h.length).fill(-1),ne=new Set([mt.i]),_e=[mt.i];for(;_e.length;){const zn=_e.shift();if(zn===Zt.i)break;for(const Ze of g[zn])!ne.has(Ze)&&h[Ze].vis&&(ne.add(Ze),kt[Ze]=zn,_e.push(Ze))}if(!ne.has(Zt.i)){b.chain.textContent="Keine Kausalkette zwischen diesen Objekten",b.pathbar.classList.add("on");return}const Ke=[];let Ae=Zt.i;for(;Ae!==-1&&(Ke.unshift(Ae),Ae!==mt.i);)Ae=kt[Ae];bn=new Set(Ke),b.chain.textContent=Ke.map(zn=>h[zn].name).join(" → "),b.pathbar.classList.add("on"),De()},Re=function(){bn=null,b.pathbar.classList.remove("on"),De()},on=function(mt,Zt){let kt=0;const ne=new Set;mn&&sn.forEach(Ae=>ne.add(Ae)),Ie&&(ne.add(Ie.i),g[Ie.i].forEach(Ae=>ne.add(Ae))),bn&&bn.forEach(Ae=>ne.add(Ae)),vn&&ne.add(vn.i);const _e=[...ne].map(Ae=>h[Ae]).filter(Ae=>Ae.vis&&Ae.sz<1&&Ae.sx>-60&&Ae.sx<mt+60&&Ae.sy>-20&&Ae.sy<Zt+20).sort((Ae,zn)=>Ae.sz-zn.sz),Ke=[];for(const Ae of _e){if(kt>=Ne.length)break;const zn=Ae.name.length*11.5+8,Ze=[Ae.sx-zn/2,Ae.sy-18,zn,16];if(Ke.some(Qe=>Ze[0]<Qe[0]+Qe[2]&&Ze[0]+Ze[2]>Qe[0]&&Ze[1]<Qe[1]+Qe[3]&&Ze[1]+Ze[3]>Qe[1]))continue;Ke.push(Ze);const ye=Ne[kt++];ye.textContent=Ae.name,ye.className="lab"+(Ae===vn||Ae===Ie?"":" sm"),ye.style.transform=`translate(-50%,-50%) translate(${Ae.sx.toFixed(1)}px,${(Ae.sy-17).toFixed(1)}px)`,ye.style.opacity=Math.min(1,Ae.alpha*1.3),ye.style.color=Ae===vn||Ae===Ie?Ae.cluster.color:""}for(;kt<Ne.length;kt++)Ne[kt].style.opacity=0},Ht=function(mt){_t=requestAnimationFrame(Ht);const Zt=Math.min(.05,(mt-O)/1e3);O=mt;const kt=w.clientWidth,ne=w.clientHeight;if(!kt||!ne)return;X.domElement.width!==Math.round(kt*X.getPixelRatio())&&(X.setSize(kt,ne,!1),ot.aspect=kt/ne,ot.updateProjectionMatrix(),se.uniforms.uPx.value=re.uniforms.uPx.value=ne/(2*Math.tan(ot.fov*Math.PI/360))),H(),rn&&(Pt.tTheta+=Zt*.09);const _e=1-Math.pow(.0016,Zt);if(Pt.theta+=(Pt.tTheta-Pt.theta)*_e,Pt.phi+=(Pt.tPhi-Pt.phi)*_e,Pt.dist+=(Pt.tDist-Pt.dist)*_e,Pt.cx+=(Pt.tx-Pt.cx)*_e,Pt.cy+=(Pt.ty-Pt.cy)*_e,Pt.cz+=(Pt.tz-Pt.cz)*_e,ot.position.set(Pt.cx+Pt.dist*Math.sin(Pt.phi)*Math.cos(Pt.theta),Pt.cy+Pt.dist*Math.cos(Pt.phi),Pt.cz+Pt.dist*Math.sin(Pt.phi)*Math.sin(Pt.theta)),ot.lookAt(Pt.cx,Pt.cy,Pt.cz),C(kt,ne),ii.live&&!pn){let ye=null;for(const Qe of h){if(!Qe.vis||Qe.sz>1)continue;const hi=Qe.sx-ii.x,Wa=Qe.sy-ii.y,_a=Qe.sr+7;hi*hi+Wa*Wa>_a*_a||(!ye||Qe.sz<ye.sz)&&(ye=Qe)}ye!==vn&&(vn=ye,Cn.style.cursor=ye?"pointer":"grab",De())}const{nT:Ke,sT:Ae,eT:zn}=Vt(),Ze=1-Math.pow(.002,Zt);for(const ye of h)ye.alpha+=(Ke[ye.i]-ye.alpha)*Ze,ye.scale+=(Ae[ye.i]-ye.scale)*Ze,lt.array[ye.i*3]=ye.x,lt.array[ye.i*3+1]=ye.y,lt.array[ye.i*3+2]=ye.z,tt.array[ye.i]=ye.alpha,Et.array[ye.i]=ye.scale;lt.needsUpdate=tt.needsUpdate=Et.needsUpdate=!0;for(const ye of m){ye.alpha+=(zn[ye.i]-ye.alpha)*Ze;const Qe=ye.i*6;It.array[Qe]=ye.s.x,It.array[Qe+1]=ye.s.y,It.array[Qe+2]=ye.s.z,It.array[Qe+3]=ye.t.x,It.array[Qe+4]=ye.t.y,It.array[Qe+5]=ye.t.z,Ct.array[ye.i*2]=Ct.array[ye.i*2+1]=ye.alpha}It.needsUpdate=Ct.needsUpdate=!0,Jt.uniforms.uTime.value=mt/1e3,Jt.uniforms.uFlow.value+=((li?1:0)-Jt.uniforms.uFlow.value)*Ze,on(kt,ne),X.render(G,ot),U+=1/Math.max(Zt,1e-4),L++,L>=30&&(b.sFps.textContent=Math.round(U/L),U=L=0)},Bt=function(mt=.55){v=Math.max(v,mt)},oe=function(mt){M=mt,b.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[M],Bt(1)},fe=function(){Pt.tTheta=.7,Pt.tPhi=1.15,Pt.tDist=j(),te(),Bt(.8),Hi()},de=function(){B.tools({flow:li,label:mn,spin:rn})},Se=function(mt){c=mt,document.documentElement.dataset.theme=mt,B.theme(mt);const Zt=mt==="light";for(const _e of e)_e.color=_e[mt];h.forEach((_e,Ke)=>{const Ae=xt(_e.cluster.color);ie[Ke*3]=Ae[0],ie[Ke*3+1]=Ae[1],ie[Ke*3+2]=Ae[2]}),pt.getAttribute("aColor").needsUpdate=!0,m.forEach((_e,Ke)=>{Me.set(xt(_e.s.cluster.color),Ke*6),Me.set(xt(_e.t.cluster.color),Ke*6+3)}),Tt.getAttribute("aColor").needsUpdate=!0;const kt=Zt?ir:eo;for(const _e of[se,re,Jt])_e.uniforms.uLight.value=Zt?1:0,_e.blending=kt,_e.needsUpdate=!0;const ne=Zt?16053489:328967;X.setClearColor(ne,1),G.fog.color.setHex(ne),G.fog.density=Zt?.0042:.0068,Ye(),Ie&&cn(Ie)},De=function(){b.hudSel.textContent=bn?`Kausalkette · ${bn.size} Stationen`:Ie?Ie.name:vn?vn.name:"Nichts ausgewählt"},Fe=function(mt){Ci.has(mt)?Ci.delete(mt):Ci.add(mt),Ye(),Bt(.4)},Ye=function(){const mt=b.q.value.trim().toLowerCase(),Zt=h.filter(ne=>!Ci.has(ne.cid)&&(!mt||ne.name.toLowerCase().includes(mt)||ne.desc.toLowerCase().includes(mt))).sort((ne,_e)=>_(_e)-_(ne));B.list({q:mt,rows:Zt.map(ne=>({i:ne.i,name:ne.name,color:ne.cluster.color,deg:_(ne),on:ne===Ie}))}),b.sNode.textContent=Zt.length;const kt=m.filter(ne=>Zt.includes(ne.s)&&Zt.includes(ne.t)).length;b.sEdge.textContent=kt,b.sDeg.textContent=Zt.length?(kt*2/Zt.length).toFixed(1):"0"},ln=function(mt){it=mt.trim().toLowerCase(),Ye(),Bt(.25)},cn=function(mt){B.drawer(mt&&{i:mt.i,name:mt.name,desc:mt.desc,cname:mt.cluster.name,color:mt.cluster.color,deg:_(mt),depth:S[mt.i],kind:mt.meta.kind||"",path:mt.meta.path||"",status:mt.meta.status||"",prov:mt.meta.prov||"",groups:[["Ursache · eingehend",mt.in,"IN"],["Wirkung · ausgehend",mt.out,"OUT"],["Assoziiert · Backlinks",mt.rel,"REL"]].filter(([,Zt])=>Zt.length).map(([Zt,kt,ne])=>({title:Zt,tag:ne,items:kt.map(_e=>({i:_e.i,name:_e.name,color:_e.cluster.color}))}))})},He=function(mt){const Zt=h[mt],kt=T[M],ne=kt[Zt.i].slice();for(let _e=0;_e<kt.length;_e++)kt[_e][0]-=ne[0],kt[_e][1]-=ne[1],kt[_e][2]-=ne[2];Pt.tx=Pt.ty=Pt.tz=0,Bt(1)},We=function(mt){const Zt=h[mt];b.chain.textContent="Start bei "+Zt.name+" — Shift+Klick auf das Zielobjekt",b.pathbar.classList.add("on")};var K=C,yt=Vt,Ft=ee,wt=te,zt=he,ae=Re,xe=on,Pe=Ht,we=Bt,ke=oe,at=fe,Bn=de,Ue=Se,jt=De,Kt=Fe,Xe=Ye,me=ln,P=cn,A=He,rt=We;X.setPixelRatio(Math.min(devicePixelRatio,2)),w.appendChild(X.domElement),G=new G_,G.fog=new up(328967,.0068),ot=new Qi(D,1,1,1400);const xt=mt=>{const Zt=new an(mt);return[Zt.r,Zt.g,Zt.b]},At=h.length,W=new Float32Array(At*3),ie=new Float32Array(At*3),Xt=new Float32Array(At),Ot=new Float32Array(At),qt=new Float32Array(At);h.forEach((mt,Zt)=>{const kt=xt(mt.cluster.color);ie[Zt*3]=kt[0],ie[Zt*3+1]=kt[1],ie[Zt*3+2]=kt[2],Xt[Zt]=mt.size=.95+mt.w*.4,Ot[Zt]=1,qt[Zt]=1});const pt=new Ri;pt.setAttribute("position",new wn(W,3)),pt.setAttribute("aColor",new wn(ie,3)),pt.setAttribute("aSize",new wn(Xt,1)),pt.setAttribute("aAlpha",new wn(Ot,1)),pt.setAttribute("aScale",new wn(qt,1));const Gt=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,se=new mi({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:Gt,fragmentShader:`
      varying vec3 vColor; varying float vAlpha;
      uniform float uLight;
      void main(){
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        // Cubic falloff instead of gaussian: the edge dies away cleaner and
        // never smears into a square blob up close.
        float halo = pow(1.0 - d, 3.0);
        if (uLight > 0.5) {
          // On white paper this layer is not "glow" but a ring of ink bleeding
          // into the paper — it only darkens, never brightens.
          gl_FragColor = vec4(vColor * 0.62, halo * 0.16 * vAlpha);
        } else {
          gl_FragColor = vec4(vColor * halo, halo * 0.34 * vAlpha);
        }
      }`,transparent:!0,blending:eo,depthWrite:!1}),re=new mi({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:Gt,fragmentShader:`
      varying vec3 vColor; varying float vAlpha;
      uniform float uLight;
      void main(){
        float d = length(gl_PointCoord - 0.5) * 2.0;
        if (d > 1.0) discard;
        if (uLight > 0.5) {
          // Solid bead: darkening the rim acts as self-shadowing and gives
          // the bead volume on white paper
          float disc = smoothstep(1.0, 0.84, d);
          float edge = smoothstep(0.40, 1.0, d);
          gl_FragColor = vec4(mix(vColor, vColor * 0.58, edge), disc * 0.95 * vAlpha);
        } else {
          float core = smoothstep(1.0, 0.28, d);
          float rim  = smoothstep(1.0, 0.82, d) * smoothstep(0.55, 0.80, d);
          vec3 c = vColor * (0.45 + 0.85 * core) + vec3(rim * 0.55);
          gl_FragColor = vec4(c, (core * 0.92 + rim * 0.75) * vAlpha);
        }
      }`,transparent:!0,blending:eo,depthWrite:!1});Dt=new Zd(pt,se),V=new Zd(pt,re),Dt.frustumCulled=!1,V.frustumCulled=!1,G.add(Dt,V);const Wt=m.length,Te=new Float32Array(Wt*6),Me=new Float32Array(Wt*6),Oe=new Float32Array(Wt*2),$=new Float32Array(Wt*2),Qt=new Float32Array(Wt*2),St=new Float32Array(Wt*2);m.forEach((mt,Zt)=>{const kt=xt(mt.s.cluster.color),ne=xt(mt.t.cluster.color);Me.set(kt,Zt*6),Me.set(ne,Zt*6+3),Oe[Zt*2]=0,Oe[Zt*2+1]=1;const _e=Zt*.6180339887%1;$[Zt*2]=_e,$[Zt*2+1]=_e,Qt[Zt*2]=Qt[Zt*2+1]=1,St[Zt*2]=St[Zt*2+1]=mt.kind==="pre"?1:0});const Tt=new Ri;Tt.setAttribute("position",new wn(Te,3)),Tt.setAttribute("aColor",new wn(Me,3)),Tt.setAttribute("aT",new wn(Oe,1)),Tt.setAttribute("aSeed",new wn($,1)),Tt.setAttribute("aAlpha",new wn(Qt,1)),Tt.setAttribute("aDir",new wn(St,1));const Jt=new mi({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
      attribute vec3 aColor; attribute float aT, aSeed, aAlpha, aDir;
      varying vec3 vColor; varying float vT, vSeed, vAlpha, vDir;
      void main(){
        vColor = aColor; vT = aT; vSeed = aSeed; vAlpha = aAlpha; vDir = aDir;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,fragmentShader:`
      precision mediump float;
      varying vec3 vColor; varying float vT, vSeed, vAlpha, vDir;
      uniform float uTime, uFlow, uLight;
      void main(){
        // The pulse position loops over 0..1; brightness uses the shortest
        // distance on the ring, otherwise it flickers at the wrap seam.
        float head = fract(vSeed + uTime * 0.16);
        float d = abs(vT - head);
        d = min(d, 1.0 - d);
        float pulse = exp(-pow(d * 7.0, 2.0)) * vDir * uFlow;
        if (uLight > 0.5) {
          gl_FragColor = vec4(mix(vColor * 0.42, vColor, pulse), vAlpha * (0.20 + 0.55 * pulse));
        } else {
          gl_FragColor = vec4(vColor * (0.55 + 1.10 * pulse), vAlpha * (0.13 + 0.80 * pulse));
        }
      }`,transparent:!0,blending:eo,depthWrite:!1});ct=new jd(Tt,Jt),ct.frustumCulled=!1,G.add(ct);const $t=j(),Pt={theta:.7,phi:1.15,dist:$t,tTheta:.7,tPhi:1.15,tDist:$t,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let pn=!1,Rn=0,qe=0,Nn=0;const Cn=X.domElement;nt(Cn,"pointerdown",mt=>{pn=!0,Nn=0,Rn=mt.clientX,qe=mt.clientY,Cn.setPointerCapture(mt.pointerId)}),nt(Cn,"pointerup",mt=>{pn=!1,Cn.releasePointerCapture(mt.pointerId)}),nt(Cn,"pointermove",mt=>{const Zt=Cn.getBoundingClientRect();if(ii.x=mt.clientX-Zt.left,ii.y=mt.clientY-Zt.top,ii.live=!0,!pn)return;const kt=mt.clientX-Rn,ne=mt.clientY-qe;Nn+=Math.abs(kt)+Math.abs(ne),Rn=mt.clientX,qe=mt.clientY,Pt.tTheta-=kt*.0052,Pt.tPhi=Math.max(.12,Math.min(Math.PI-.12,Pt.tPhi-ne*.0052)),rn=!1,de()}),nt(Cn,"pointerleave",()=>{ii.live=!1});const ta=b.zlvl,Hi=()=>{ta.textContent=Math.round($t/Pt.tDist*100)+"%"},ni=mt=>{Pt.tDist=Math.max($t*.22,Math.min($t*2.6,Pt.tDist*mt)),Hi()};nt(Cn,"wheel",mt=>{mt.preventDefault(),ni(1+Math.sign(mt.deltaY)*.11)},{passive:!1});const Be=()=>{Pt.tDist=$t,Hi()};Hi();const ii={x:-1,y:-1,live:!1};let vn=null,Ie=null,bn=null,rn=!0,mn=!0,li=!0;const Ci=new Set,la=.12,wi=new vt;nt(Cn,"click",mt=>{if(!(Nn>5)){if(!vn){mt.shiftKey||te();return}if(mt.shiftKey&&Ie&&vn!==Ie){he(Ie,vn);return}ee(vn)}});const et=new Float32Array(h.length),dt=new Float32Array(h.length),ft=new Float32Array(m.length);let it="";const Ee=b.labels,ue=14,Ne=Array.from({length:44},()=>{const mt=document.createElement("div");return mt.className="lab",mt.style.opacity=0,Ee.appendChild(mt),mt}),sn=[...h].sort((mt,Zt)=>_(Zt)-_(mt)).slice(0,ue).map(mt=>mt.i);let O=performance.now(),U=0,L=0;const lt=pt.getAttribute("position"),tt=pt.getAttribute("aAlpha"),Et=pt.getAttribute("aScale"),It=Tt.getAttribute("position"),Ct=Tt.getAttribute("aAlpha");_t=requestAnimationFrame(Ht);const Nt=()=>{li=!li,de()},Yt=()=>{mn=!mn,de()},ge=()=>{rn=!rn,de()},fn=()=>Se(c==="light"?"dark":"light");nt(window,"keydown",mt=>{if(/^(INPUT|TEXTAREA)$/.test(mt.target.tagName)){mt.key==="Escape"&&mt.target.blur();return}mt.key==="Escape"?te():mt.key==="l"||mt.key==="L"?(mn=!mn,de()):mt.key==="r"||mt.key==="R"?fe():mt.key===" "?(mt.preventDefault(),rn=!rn,de()):mt.key==="/"?(mt.preventDefault(),b.q.focus()):mt.key==="="||mt.key==="+"?ni(1/1.18):(mt.key==="-"||mt.key==="_")&&ni(1.18)});const On=mt=>ee(h[mt]),In=mt=>{vn=mt===null?null:h[mt]};return Se(c),Ye(),cn(null),de(),De(),{setView:oe,toggleFlow:Nt,toggleLabel:Yt,toggleSpin:ge,reset:fe,toggleTheme:fn,dolly:ni,zoomReset:Be,toggleCluster:Fe,selectAt:On,hoverAt:In,setQuery:ln,clearPath:Re,centerOn:He,startPath:We,dispose(){Y.abort(),cancelAnimationFrame(_t),pt.dispose(),Tt.dispose(),se.dispose(),re.dispose(),Jt.dispose(),X.dispose(),Cn.remove(),b.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:h,edges:m,deg:_,createAtlas:N}}const Gn=[],nr=[],Ha=[],xl=[],Ts={},qn=[],du=[],pa=7.2,io=6,yl=["--k1","--k2","--k3","--k4","--k5","--k6"],fp=r=>getComputedStyle(document.documentElement).getPropertyValue(r).trim(),mA=r=>r.agentColor||fp(yl[(r.ki??0)%yl.length]),i_=r=>fp(yl[r.ki%yl.length]),k_=new Map;let X_="loc";function gA(r){X_=r}const vA=r=>{const e=Math.max(1,...Gn.map(s=>s.loc)),i=Math.max(1,...Gn.map(s=>s.usedBy.length));return r.dying?0:X_==="loc"?1.5+r.loc/e*26:1.5+r.usedBy.length/i*26},Kd=new Set,_A=r=>(Kd.add(r),()=>Kd.delete(r)),Rs=()=>Kd.forEach(r=>r());function ar(r,e,i="ok"){du.unshift({t:new Date,ws:r,msg:e,kind:i,id:Math.random().toString(36).slice(2)}),du.length>60&&du.pop()}function Eu(){let e=0,i=0,s=0;const l=xl.filter(h=>qn.find(p=>p.id===h)),c=new Set;for(const h of l){const p=Gn.filter(S=>S.dir===h&&!S.dying);if(!p.length&&qn.find(S=>S.id===h)?.dying)continue;const m=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,p.length)))),_=m*pa+io,g=Math.max(1,Math.ceil(Math.max(1,p.length)/m))*pa+io;i+_>74&&i>0&&(e+=s,i=0,s=0);let x=Ha.find(S=>S.dir===h);x||(x={dir:h,x:i+_/2,z:e+g/2,w:.01,h:.01},Ha.push(x)),Object.assign(x,{tx:i,tz:e,tw:_,th:g,cols:m}),c.add(h),i+=_,s=Math.max(s,g)}const d=Ha.filter(h=>c.has(h.dir));if(d.length){const h=Math.max(...d.map(m=>m.tx+m.tw))/2,p=Math.max(...d.map(m=>m.tz+m.th))/2;for(const m of d)m.tx-=h,m.tz-=p;for(const m of d)Gn.filter(g=>g.dir===m.dir).forEach((g,x)=>{g.tx=m.tx+io/2+x%m.cols*pa+pa/2,g.tz=m.tz+io/2+Math.floor(x/m.cols)*pa+pa/2,g.x===void 0&&(g.x=g.tx,g.z=g.tz)})}for(let h=Ha.length-1;h>=0;h--)!c.has(Ha[h].dir)&&!Gn.some(p=>p.dir===Ha[h].dir)&&Ha.splice(h,1);for(const h of l)k_.set(h,.5)}function q_(r,e,i=!1){let s=qn.find(l=>l.id===r);return s||(s={id:r,name:e||r,ki:qn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:i},qn.push(s),xl.includes(r)||xl.push(r),ar(e||r,"workspace registered","reg"),Eu(),Rs(),s)}function hp(r,{path:e,loc:i=40,deps:s=[],note:l="",agentColor:c=null,agentName:d=null,access:h=null}){const p=e.split("/").pop(),m=e.includes("/")&&e.startsWith(r.id+"/")?e:`${r.id}/${e}`;let _=Ts[m];if(_)return _.loc+=Math.max(2,Math.round(i*.25)),_.pulse=1,c&&(_.agentColor=c,_.agentName=d,_.access=h),_;_={path:m,name:p,dir:r.id,top:r.id,ki:r.ki,loc:i,deps:[],usedBy:[],note:l,agentColor:c,agentName:d,access:h,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let g of s){g.includes("/")||(g=`${r.id}/${g}`);const x=Ts[g];x&&(_.deps.push(g),nr.push({from:_,to:x}),x.usedBy.push(m))}return Gn.push(_),Ts[m]=_,Eu(),Rs(),_}function xA(){let r=!1;for(let e=Gn.length-1;e>=0;e--){const i=Gn[e];if(i.dying&&i.h<.25){Gn.splice(e,1),delete Ts[i.path],r=!0;for(let s=nr.length-1;s>=0;s--)(nr[s].from===i||nr[s].to===i)&&nr.splice(s,1);for(const s of Gn){const l=s.deps.indexOf(i.path);l>=0&&s.deps.splice(l,1);const c=s.usedBy.indexOf(i.path);c>=0&&s.usedBy.splice(c,1)}}}for(let e=qn.length-1;e>=0;e--){const i=qn[e];if(i.dying&&!Gn.some(s=>s.dir===i.id)){qn.splice(e,1);const s=xl.indexOf(i.id);s>=0&&xl.splice(s,1),r=!0}}r&&(Eu(),Rs())}setInterval(()=>{let r=!1;for(const e of qn)e.load>.01&&(e.load*=.82,r=!0);r&&Rs()},600);const Qd=[["plugbrain-core",["runtime/orb.js","runtime/loop.js","runtime/checkpoint.js","core/registry.js","core/scheduler.js","core/bus.js"]],["agent-mesh",["mesh/trails.js","mesh/signals.js","mesh/swarm.js","mesh/registry.js"]],["gitnexus",["nexus/codegraph.js","nexus/indexer.js","nexus/query.js"]],["plugnetz",["netz/shell.ts","netz/routes.ts","netz/peers.ts"]]],a_=["checkpoint written","task delegated","signal emitted","module indexed","state verified","job completed","agent pinged","trace persisted"];let W_=null,Jd=!0;function yA(){const r=qn.filter(c=>c.sim&&!c.dying);if(!r.length)return;const e=r[Math.floor(Math.random()*r.length)],i=Qd.find(c=>c[0]===e.id),s=Gn.filter(c=>c.dir===e.id);if(Math.random()<.62)if(s.length&&Math.random()<.55){const c=s[Math.floor(Math.random()*s.length)];c.loc+=6+Math.round(Math.random()*26),c.pulse=1,ar(e.name,`${c.name} +${Math.round(6+Math.random()*20)} lines`)}else{const c=i[1].filter(m=>!Ts[`${e.id}/${m}`]),d=[`mod-${Math.random().toString(36).slice(2,6)}.js`],h=c.length?c[0]:`lib/${d[0]}`,p=s.length?[s[Math.floor(Math.random()*s.length)].name]:[];hp(e,{path:h,loc:30+Math.round(Math.random()*160),deps:p}),ar(e.name,`new module ${h.split("/").pop()}`,"new")}else{const c=s.length?s[Math.floor(Math.random()*s.length)]:null;c&&(c.pulse=1),ar(e.name,a_[Math.floor(Math.random()*a_.length)])}e.load=Math.min(1,e.load+.35),e.events++,Rs()}function MA(){Qd.forEach(([r])=>q_(r,r,!0));for(const[r,e]of Qd){const i=qn.find(s=>s.id===r);e.slice(0,3).forEach((s,l)=>hp(i,{path:s,loc:40+Math.round(Math.random()*180),deps:l?[e[l-1].split("/").pop()]:[]}))}W_=setInterval(yA,1100)}function SA(){if(Jd){Jd=!1,clearInterval(W_);for(const r of qn.filter(e=>e.sim))r.dying=!0,Gn.filter(e=>e.dir===r.id).forEach(e=>{e.dying=!0}),ar(r.name,"simulation cleared — runtime connected","sys");Rs()}}const vl={register({id:r,name:e}={}){return r?(SA(),q_(String(r),e&&String(e),!1)):console.warn("[PlugBrainCity] register() needs an id")},grow(r,{path:e,loc:i=40,deps:s=[],note:l="",agentColor:c=null,agentName:d=null,access:h=null}={}){const p=qn.find(m=>m.id===r);return!p||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(p.load=Math.min(1,p.load+.3),p.events++,hp(p,{path:e,loc:i,deps:s,note:l,agentColor:c,agentName:d,access:h}))},event(r,e){const i=qn.find(l=>l.id===r);if(!i)return;const s=Gn.filter(l=>l.dir===r&&!l.dying);s.length&&(s[Math.floor(Math.random()*s.length)].pulse=1),i.load=Math.min(1,i.load+.25),i.events++,ar(i.name,String(e||"event")),Rs()},unregister(r){const e=qn.find(i=>i.id===r);e&&(e.dying=!0,Gn.filter(i=>i.dir===r).forEach(i=>{i.dying=!0}),ar(e.name,"workspace unregistered","sys"),Eu(),Rs())},list:()=>qn.map(r=>({id:r.id,name:r.name,buildings:Gn.filter(e=>e.dir===r.id).length})),simulated:()=>Jd};window.PlugBrainCity=vl;const to=1024,dl=2048,s_=96,r_=new Map;function EA(r){if(!r.agentColor)return null;const e=r.agentColor+(r.access||"");let i=r_.get(e);if(!i){i=new an;const s=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(r.agentColor);if(s){const l=r.access==="read"?Math.max(.18,+s[3]/100*.55):+s[3]/100;i.setHSL(+s[1]/360,+s[2]/100,l)}else try{i.set(r.agentColor)}catch{i.setHSL(0,0,.5)}r_.set(e,i)}return i}function bA(r,e,i,{onSelect:s,onZoom:l}){let c;try{c=new H_({antialias:!0,alpha:!0,canvas:r})}catch{}if(!c)return null;MA(),c.setPixelRatio(Math.min(devicePixelRatio,2)),c.setClearColor(0,0);const d=new G_,h=new O_(-1,1,1,-1,-400,600),p=`
  attribute vec3 aColor; attribute vec2 aHi;   // x = highlight, y = fade
  varying vec3 vN, vW, vColor; varying vec2 vHi;
  void main(){
    vColor = aColor; vHi = aHi;
    vec3 tp = position;
    #ifdef USE_INSTANCING
      tp = (instanceMatrix * vec4(position, 1.0)).xyz;
      vN = normalize(mat3(instanceMatrix) * normal);
    #else
      vN = normal;
    #endif
    vW = tp;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(tp, 1.0);
  }`,m=`
  precision highp float;
  varying vec3 vN, vW, vColor; varying vec2 vHi;
  uniform float uHatch, uTime;
  void main(){
    vec3 n = normalize(vN);
    // One fixed brightness per axis: an isometric drawing doesn't need real
    // lighting, it needs the three faces instantly distinguishable.
    float f = n.y > 0.5 ? 1.0 : (abs(n.x) > 0.5 ? 0.74 : 0.56);
    vec3 paper = vec3(0.867, 0.827, 0.706);
    vec3 c = mix(paper, vColor, 0.62) * f;

    // Hatching: drawn only on upward faces, in world space, so the lines
    // continue across neighbouring buildings.
    if (n.y > 0.5 && uHatch > 0.5) {
      float s = sin((vW.x + vW.z) * 3.2 + vW.y * 0.4);
      c -= vec3(0.055) * smoothstep(0.72, 1.0, abs(s));
    }
    c = mix(c, vec3(0.98, 0.94, 0.86), vHi.x * 0.42);
    c = mix(paper * 0.94, c, mix(0.30, 1.0, 1.0 - vHi.y));
    gl_FragColor = vec4(c, 1.0);
  }`,_=new or(1,1,1),g=new mi({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:p,fragmentShader:m}),x=new cA(_,g,to);x.frustumCulled=!1;const S=new gu(new Float32Array(to*3),3),E=new gu(new Float32Array(to*2),2);_.setAttribute("aColor",S),_.setAttribute("aHi",E),d.add(x);const T=new hA(_),M=new V_({color:3814695,transparent:!0,opacity:.3}),v=[];for(let jt=0;jt<to;jt++){const Kt=new jd(T,M);Kt.visible=!1,v.push(Kt),d.add(Kt)}const I=()=>new mi({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
    void main(){ vN = normal; vW = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying vec3 vN; varying vec3 vW;
    void main(){
      float f = vN.y > 0.5 ? 1.0 : 0.78;
      vec3 c = vec3(0.816, 0.776, 0.651) * f;
      if (vN.y > 0.5) {
        // A fine grid on the plot's top face, so it reads as surveyed land.
        vec2 g = abs(fract(vW.xz * 0.5) - 0.5);
        c -= vec3(0.03) * smoothstep(0.46, 0.5, max(g.x, g.y));
      }
      gl_FragColor = vec4(c, 1.0);
    }`}),F=[],z=new or(1,1,1);for(let jt=0;jt<s_;jt++){const Kt=new $i(z,I());Kt.visible=!1,F.push(Kt),d.add(Kt)}const Q=3,H=new Float32Array(dl*Q*3),D=new Float32Array(dl*Q),j=new Ri;j.setAttribute("position",new wn(H,3)),j.setAttribute("aA",new wn(D,1));const N=new Zd(j,new mi({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));N.frustumCulled=!1,d.add(N);const b=new Float32Array(dl*6),B=new Float32Array(dl*2),Y=new Ri;Y.setAttribute("position",new wn(b,3)),Y.setAttribute("aA",new wn(B,1));const Z=new jd(Y,new mi({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));Z.frustumCulled=!1,d.add(Z);const nt={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},_t=Math.atan(1/Math.SQRT2);let w=!1,X=0,G=0,ot=!0;const Dt={x:-1,y:-1,live:!1};r.addEventListener("pointerdown",jt=>{w=!0,G=0,X=jt.clientX,r.setPointerCapture(jt.pointerId),r.classList.add("drag")}),r.addEventListener("pointerup",jt=>{w=!1,r.classList.remove("drag"),r.releasePointerCapture(jt.pointerId)}),r.addEventListener("pointermove",jt=>{const Kt=r.getBoundingClientRect();Dt.x=jt.clientX-Kt.left,Dt.y=jt.clientY-Kt.top,Dt.live=!0,w&&(G+=Math.abs(jt.clientX-X),nt.tYaw-=(jt.clientX-X)*.006,X=jt.clientX,ot=!1,ae(!1))}),r.addEventListener("pointerleave",()=>{Dt.live=!1});const V=nt.tZoom,ct=()=>l(Math.round(V/nt.tZoom*100)),Lt=jt=>{nt.tZoom=Math.max(4,Math.min(60,nt.tZoom*jt)),ct()};r.addEventListener("wheel",jt=>{jt.preventDefault(),Lt(1+Math.sign(jt.deltaY)*.11)},{passive:!1}),ct();let K=null,yt=null,Ft=null,wt="",zt=null,ae=()=>{};r.addEventListener("click",()=>{G>5||s(K&&yt!==K?K:null)});const xe=yl.map(jt=>new an(fp(jt)||"#8a4b2a")),Pe=new vt,we=new Dn,ke=new an;let at=!0,Bn=performance.now();function Ue(jt){requestAnimationFrame(Ue);const Kt=Math.min(.05,(jt-Bn)/1e3);Bn=jt;const Xe=e.clientWidth,me=e.clientHeight;if(!Xe||!me)return;r.width!==Math.round(Xe*c.getPixelRatio())&&c.setSize(Xe,me,!1);const P=1-Math.pow(.002,Kt);xA(),ot&&(nt.tYaw+=Kt*.12),nt.yaw+=(nt.tYaw-nt.yaw)*P,nt.zoom+=(nt.tZoom-nt.zoom)*P;const A=nt.zoom*4,rt=A*(Xe/me);h.left=-rt,h.right=rt,h.top=A,h.bottom=-A,h.updateProjectionMatrix();const xt=180;h.position.set(Math.cos(nt.yaw)*Math.cos(_t)*xt,Math.sin(_t)*xt,Math.sin(nt.yaw)*Math.cos(_t)*xt),h.lookAt(0,6,0);for(let Ot=0;Ot<s_;Ot++){const qt=F[Ot],pt=Ha[Ot];if(!pt||Ot>=Ha.length){qt.visible=!1;continue}pt.x=pt.x===void 0?pt.tx+pt.tw/2:pt.x,pt.z=pt.z===void 0?pt.tz+pt.th/2:pt.z;const Gt=pt.tx+pt.tw/2,se=pt.tz+pt.th/2;pt.x+=(Gt-pt.x)*P,pt.z+=(se-pt.z)*P,pt.w+=(pt.tw-pt.w)*P,pt.h+=(pt.th-pt.h)*P,qt.visible=!0,qt.position.set(pt.x,-.25,pt.z),qt.scale.set(Math.max(.01,pt.w-io*.45),.5,Math.max(.01,pt.h-io*.45))}const At=yt?new Set([yt.path,...yt.deps,...yt.usedBy]):null,W=yt||K||Ft,ie=Math.min(Gn.length,to);x.count=ie;for(let Ot=0;Ot<ie;Ot++){const qt=Gn[Ot];qt.x!==qt.tx&&(qt.x+=(qt.tx-qt.x)*P*.7),qt.z!==qt.tz&&(qt.z+=(qt.tz-qt.z)*P*.7);const pt=vA(qt);qt.h=qt.h===void 0?pt:qt.h+(pt-qt.h)*(qt.dying?P*1.4:P*.6),qt.pulse=Math.max(0,(qt.pulse||0)-Kt*1.6),we.makeScale(pa*.68,Math.max(.01,qt.h),pa*.68),we.setPosition(qt.x,qt.h/2,qt.z),x.setMatrixAt(Ot,we);const Gt=v[Ot];Gt.visible=!0,Gt.scale.set(pa*.68,Math.max(.01,qt.h),pa*.68),Gt.position.set(qt.x,qt.h/2,qt.z);const se=EA(qt);se?ke.copy(se):ke.copy(xe[(qt.ki??0)%xe.length]).offsetHSL(0,0,(k_.get(qt.dir)-.5)*.17),S.array[Ot*3]=ke.r,S.array[Ot*3+1]=ke.g,S.array[Ot*3+2]=ke.b;const re=qt===W?1:Math.min(.85,qt.pulse||0);let Wt=At?At.has(qt.path)?0:1:wt&&!qt.path.toLowerCase().includes(wt)?1:0;!At&&!wt&&zt&&(Wt=qt.top===zt?0:1),E.array[Ot*2]+=(re-E.array[Ot*2])*P,E.array[Ot*2+1]+=(Wt-E.array[Ot*2+1])*P}for(let Ot=ie;Ot<to;Ot++)v[Ot].visible=!1;x.instanceMatrix.needsUpdate=!0,S.needsUpdate=E.needsUpdate=!0;const Xt=Math.min(nr.length,dl);Y.setDrawRange(0,Xt*2),j.setDrawRange(0,Xt*Q);for(let Ot=0;Ot<Xt;Ot++){const qt=nr[Ot],pt=qt.from,Gt=qt.to,se=Ot*6;b[se]=pt.x,b[se+1]=pt.h,b[se+2]=pt.z,b[se+3]=Gt.x,b[se+4]=Gt.h,b[se+5]=Gt.z;const re=!At||At.has(pt.path)&&At.has(Gt.path),Wt=yt&&(pt===yt||Gt===yt),Te=Wt?.55:re?.1:.02;B[Ot*2]+=(Te-B[Ot*2])*P,B[Ot*2+1]=B[Ot*2];for(let Me=0;Me<Q;Me++){const Oe=Ot*Q+Me,$=(jt/2600+(Ot*.37+Me/Q))%1,Qt=Math.sin($*Math.PI)*Math.hypot(Gt.x-pt.x,Gt.z-pt.z)*.22;H[Oe*3]=pt.x+(Gt.x-pt.x)*$,H[Oe*3+1]=pt.h+(Gt.h-pt.h)*$+Qt+1.2,H[Oe*3+2]=pt.z+(Gt.z-pt.z)*$,D[Oe]=(at?1:0)*(Wt?1:re?.45:.06)*Math.sin($*Math.PI)}}if(Y.getAttribute("position").needsUpdate=!0,Y.getAttribute("aA").needsUpdate=!0,j.getAttribute("position").needsUpdate=!0,j.getAttribute("aA").needsUpdate=!0,N.material.uniforms.uPx.value=3.4*c.getPixelRatio(),Dt.live&&!w){let Ot=null,qt=676;for(let pt=0;pt<ie;pt++){const Gt=Gn[pt];if(Gt.dying||Gt.h<1)continue;Pe.set(Gt.x,Gt.h*.6,Gt.z).project(h);const se=(Pe.x*.5+.5)*Xe,re=(-Pe.y*.5+.5)*me,Wt=(se-Dt.x)**2+(re-Dt.y)**2;Wt<qt&&(qt=Wt,Ot=Gt,Gt.sx=se,Gt.sy=re)}K=Ot,r.style.cursor=w?"grabbing":Ot?"pointer":"grab"}else Dt.live||(K=null);K?(i.style.display="block",i.style.left=K.sx+"px",i.style.top=K.sy+"px",i.innerHTML=`<b>${K.name}</b> · ${K.loc} lines<br>${K.dir} · referenced by ${K.usedBy.length}`):i.style.display="none",c.render(d,h)}return requestAnimationFrame(Ue),{setFlow:jt=>{at=jt},setHatch:jt=>{g.uniforms.uHatch.value=jt?1:0},setSpin:jt=>{ot=jt},spinning:()=>ot,onSpinChange:jt=>{ae=jt},dolly:Lt,reset:()=>{nt.tYaw=Math.PI*.25,nt.tZoom=V,ct()},setSel:jt=>{yt=jt},setRailHover:jt=>{Ft=jt},setQuery:jt=>{wt=jt},setFocusTop:jt=>{zt=jt}}}const TA=1e3,pl=new Map;function o_(r){const e=r?.properties?.path||r?.properties?.filePath||r?.uri;return typeof e=="string"&&e.length>0?e:null}function AA(r){const e=r?.properties?.loc??r?.properties?.lines??r?.properties?.size,i=Number(e);return Number.isFinite(i)&&i>0?Math.min(4e3,Math.round(i)):40}function RA(r){const e=r?.workspace,i=r?.graph?.nodes;if(!e?.id||!Array.isArray(i))return{workspaces:pl.size,buildings:0,added:0};const s=String(e.id);if(!pl.has(s)){vl.register({id:s,name:e.name||s}),pl.set(s,new Set);for(const g of qn.slice())g.sim&&g.id!==s&&vl.unregister(g.id)}const l=pl.get(s),c=Array.isArray(r.graph.edges)?r.graph.edges:[],d=new Map(i.filter(g=>g&&typeof g.id=="string").map(g=>[g.id,g])),h=new Map;for(const g of c){const x=d.get(g?.sourceId),S=d.get(g?.targetId);if(!x||!S)continue;const E=o_(S);E&&(h.has(x.id)||h.set(x.id,[]),h.get(x.id).push(E))}const p=[];for(const g of i){const x=o_(g);x&&p.push({node:g,path:x})}p.sort((g,x)=>g.path.localeCompare(x.path));const m=p.slice(0,TA);let _=0;for(const{node:g,path:x}of m){if(l.has(x))continue;l.add(x);const S=g.properties||{};vl.grow(s,{path:x,loc:AA(g),deps:h.get(g.id)||[],note:g.type||"",agentColor:S.agentColor||S.readerColor||null,agentName:S.agentName||S.readerName||null,access:S.agentColor?"write":S.readerColor?"read":null}),_+=1}return _>0&&vl.event(s,`${_} indexed object${_===1?"":"s"} added`),{workspaces:pl.size,buildings:l.size,added:_,total:p.length,truncated:p.length>m.length}}function CA({snapshot:r}){const[e,i]=ce.useState(null);ce.useEffect(()=>{if(!r)return;const w=RA(r);i({buildings:w.buildings,total:w.total??w.buildings,truncated:!!w.truncated})},[r]);const[s,l]=ce.useState(!0),[c,d]=ce.useState("loc"),[h,p]=ce.useState(!0),[m,_]=ce.useState(!0),[g,x]=ce.useState(!0),[S,E]=ce.useState(100),[T,M]=ce.useState(null),[v,I]=ce.useState(""),[F,z]=ce.useState(null),[Q,H]=ce.useState(!0),[,D]=ce.useReducer(w=>w+1,0),j=ce.useRef(null),N=ce.useRef(null),b=ce.useRef(null),B=ce.useRef(null);ce.useEffect(()=>{const w=bA(j.current,N.current,b.current,{onSelect:X=>M(X),onZoom:X=>E(X)});if(!w){l(!1);return}B.current=w,w.onSpinChange(X=>x(X))},[]),ce.useEffect(()=>_A(()=>D()),[]),ce.useEffect(()=>{B.current?.setSel(T)},[T]),ce.useEffect(()=>{B.current?.setQuery(v)},[v]),ce.useEffect(()=>{B.current?.setFocusTop(F)},[F]),ce.useEffect(()=>{const w=X=>{const G=X.target;if(/^(INPUT|TEXTAREA)$/.test(G.tagName)){X.key==="Escape"&&G.blur();return}X.key==="Escape"?(M(null),z(null)):X.key==="="||X.key==="+"?B.current?.dolly(.8474576271186441):X.key==="-"||X.key==="_"?B.current?.dolly(1.18):(X.key==="e"||X.key==="E")&&H(ot=>!ot)};return addEventListener("keydown",w),()=>removeEventListener("keydown",w)},[]);const Y=Gn.reduce((w,X)=>w+X.loc,0),Z=qn.reduce((w,X)=>w+X.events,0),nt=(w,X)=>X.length?k.jsxs(k.Fragment,{children:[k.jsxs("h3",{children:[w+" ",k.jsx("span",{style:{color:"var(--faint)"},children:X.length})]}),X.map(G=>Ts[G]&&k.jsxs("div",{className:"dep","data-p":G,onClick:()=>M(Ts[G]),children:[k.jsx("span",{className:"sw",style:{background:mA(Ts[G])}}),k.jsx("span",{children:G})]},G))]}):null,_t=e?.truncated?`Karte zeigt ${e.buildings} von ${e.total} indexierten Objekten — die Stadt-Engine rendert aus einem festen Pool.`:null;return k.jsxs("div",{id:"app",className:T?void 0:"closed",children:[_t&&k.jsx("div",{className:"brain-note",children:_t}),k.jsxs("aside",{children:[k.jsxs("div",{className:"hd",children:[k.jsx("h1",{children:"PlugBrain City"}),k.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),k.jsxs("div",{className:"kpis",children:[k.jsxs("div",{children:[k.jsx("b",{id:"k-ws",children:qn.length}),k.jsx("i",{children:"workspaces"})]}),k.jsxs("div",{children:[k.jsx("b",{id:"k-bld",children:Gn.length}),k.jsx("i",{children:"buildings"})]}),k.jsxs("div",{children:[k.jsx("b",{id:"k-ev",children:Z}),k.jsx("i",{children:"events"})]})]})]}),k.jsx("div",{className:"q",children:k.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:w=>I(w.target.value.trim().toLowerCase())})}),k.jsx("div",{className:"tree",id:"tree",children:qn.length?qn.map(w=>{const X=Gn.filter(ot=>ot.dir===w.id),G=X.reduce((ot,Dt)=>ot+Dt.loc,0);return k.jsxs("div",{className:"ws"+(F===w.id?" on":"")+(w.dying?" dying":""),onClick:()=>z(ot=>ot===w.id?null:w.id),children:[k.jsxs("div",{className:"wsrow",children:[k.jsx("span",{className:"sw",style:{background:i_(w)}}),k.jsx("span",{className:"nm",children:w.name}),w.sim?k.jsx("span",{className:"tag",children:"sim"}):null,k.jsxs("span",{className:"lc",children:[X.length," bld · ",G]})]}),k.jsx("div",{className:"loadbar",children:k.jsx("i",{style:{width:Math.round(w.load*100)+"%",background:i_(w)}})})]},w.id)}):k.jsxs("div",{className:"empty",children:["No workspaces registered.",k.jsx("br",{}),k.jsx("br",{}),k.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),k.jsxs("div",{id:"stage",ref:N,children:[k.jsx("canvas",{id:"cv",ref:j}),k.jsx("div",{id:"tip",ref:b}),k.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",k.jsx("b",{id:"crumb-t",children:T?T.path.toUpperCase():F?F.toUpperCase():"CITY OVERVIEW"})]}),Q&&k.jsx("div",{id:"feed",children:du.slice(0,9).map(w=>k.jsxs("div",{className:"fe",children:[k.jsx("span",{className:"ft",children:w.t.toLocaleTimeString("en-GB",{hour12:!1})}),k.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:w.ws}),k.jsx("span",{className:"fm",children:w.msg})]},w.id))}),k.jsx("div",{id:"legend",children:k.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${c==="loc"?"size":"references"} · flashes = activity`})}),k.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([w,X])=>k.jsx("button",{className:"tb"+(c===w?" on":""),"data-h":w,type:"button",onClick:()=>{gA(w),d(w)},children:X},w)),k.jsx("div",{className:"vsep"}),k.jsx("button",{className:"tb"+(h?" on":""),id:"t-flow",type:"button",onClick:()=>{p(w=>(B.current?.setFlow(!w),!w))},children:"Flow"}),k.jsx("button",{className:"tb"+(m?" on":""),id:"t-hatch",type:"button",onClick:()=>{_(w=>(B.current?.setHatch(!w),!w))},children:"Hatching"}),k.jsx("button",{className:"tb"+(g?" on":""),id:"t-spin",type:"button",onClick:()=>{x(w=>(B.current?.setSpin(!w),!w))},children:"Orbit"}),k.jsx("button",{className:"tb"+(Q?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>H(w=>!w),children:"Feed"}),k.jsx("div",{className:"vsep"}),k.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>B.current?.dolly(1.18),children:"−"}),k.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>B.current?.reset(),children:S+"%"}),k.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>B.current?.dolly(1/1.18),children:"＋"}),k.jsx("div",{className:"vsep"}),k.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{B.current?.reset(),M(null),z(null)},children:"Reset"})]}),k.jsxs("div",{id:"gate",style:s?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",k.jsx("br",{}),"The workspace registry remains available."]})]}),k.jsx("div",{id:"side",children:k.jsx("div",{id:"dt",children:T&&k.jsxs("div",{className:"dt",children:[k.jsx("div",{className:"kind",children:T.dir+"/"}),k.jsx("h2",{children:T.name}),T.note?k.jsx("div",{className:"note",children:T.note}):null,k.jsxs("dl",{children:[k.jsx("dt",{children:"Size"}),k.jsx("dd",{children:T.loc}),k.jsx("dt",{children:"References"}),k.jsx("dd",{children:T.deps.length}),k.jsx("dt",{children:"Referenced by"}),k.jsx("dd",{children:T.usedBy.length}),k.jsx("dt",{children:"Share of total"}),k.jsx("dd",{children:Y?(T.loc/Y*100).toFixed(1)+"%":"—"})]}),nt("References",T.deps),nt("Referenced by",T.usedBy)]})})})]})}function wA({getAgents:r,ROLES:e,STATES:i,LINK_R:s}){const l=["#8ab2d1","#aaf7b3","#ffc09a","#c6a1ce","#efedbd","#8ac1a0","#d6dee8","#e0a355","#9ec4b8","#b4aac8","#9db6cc","#c8ab9e","#7f9db8","#a8c8a0","#d1a3a3","#a3a3c8"],c=new Map;let d=0;function h(T){if(c.has(T))return c.get(T);const M=l[(T.n-1)%l.length],v={hue:M,rgb:M.match(/[0-9a-f]{2}/gi).map(I=>parseInt(I,16)).join(","),trail:[],last:null};return c.set(T,v),v}function p(T){c.delete(T)}const m=.45,_=42,g=26;function x(T){d+=T;for(const M of r()){const v=h(M);if(M.off)continue;const I=v.last,F=!I||Math.hypot(M.x-I.x,M.y-I.y)>g,z=!I||d-I.t>m;F&&z&&(v.trail.push({x:M.x,y:M.y,t:d,busy:M.task?1:0}),v.trail.length>_&&v.trail.shift(),v.last={x:M.x,y:M.y,t:d})}for(const M of[...c.keys()])r().includes(M)||p(M)}function S(T){T.save(),T.lineCap="round",T.lineJoin="round";for(const M of r()){const v=c.get(M);if(!v||v.trail.length<2)continue;const I=v.trail;for(let F=I.length-1;F>0;F--){const z=I[F],Q=I[F-1],H=(d-z.t)/(_*m),D=Math.max(0,(1-H)*.34)*(z.busy?1:.55);D<.015||(T.strokeStyle=`rgba(${v.rgb},${D.toFixed(3)})`,T.lineWidth=z.busy?1.6:1,T.beginPath(),T.moveTo(Q.x,Q.y),T.lineTo(z.x,z.y),T.stroke())}}T.restore()}function E(){const T=[];for(const M of r()){const v=c.get(M)||h(M),I=e[M.ri],F=i[M.state];let z=0;for(const Q of r())Q!==M&&Math.hypot(M.x-Q.x,M.y-Q.y)<s&&z++;T.push({n:M.n,hue:v.hue,role:I.cn,tag:I.tag,roleColor:I.color,state:M.off?"OFFLINE":M.state,stateCn:M.off?"Offline":F.cn,task:M.task?"#"+M.task.id:null,queue:M.queue.length,util:M.span>0?M.busy/M.span:0,trail:v.trail.length,links:z,pos:[Math.round(M.x),Math.round(M.y)]})}return T.sort((M,v)=>M.n-v.n),T}return{step:x,draw:S,snapshot:E,register:h,forget:p,hueOf:T=>(c.get(T)||h(T)).hue}}function DA({els:r,emit:e}){const i=new AbortController,{signal:s}=i,l=(O,U,L,lt)=>O.addEventListener(U,L,{...lt,signal:s}),c=Math.PI*2,d=(O,U,L)=>O+(U-O)*L,h=O=>O-Math.floor(O),p=(O,U)=>{const L=Math.sin(O*12.9898+U*78.233)*43758.5453;return L-Math.floor(L)};function m(O,U){const L=Math.floor(O),lt=Math.floor(U);let tt=O-L,Et=U-lt;tt=tt*tt*(3-2*tt),Et=Et*Et*(3-2*Et);const It=p(L,lt),Ct=p(L+1,lt),Ht=p(L,lt+1),Bt=p(L+1,lt+1);return It+(Ct-It)*tt+(Ht-It)*Et+(It-Ct-Ht+Bt)*tt*Et}function _(O,U){const L=Math.PI*(3-Math.sqrt(5)),lt=1-2*(O+.5)/U,tt=Math.sqrt(1-lt*lt),Et=O*L;return[tt*Math.cos(Et),lt,tt*Math.sin(Et)]}const g=(O,U)=>Math.atan2(Math.sin(O-U),Math.cos(O-U));function x(O,U,L,lt,tt){const Et=Math.sin(U),It=Math.cos(U),Ct=Math.sin(O),Ht=Math.cos(O);return(Bt,oe,Nt)=>{const Yt=Bt*Ht+Nt*Ct,ge=-Bt*Ct+Nt*Ht;return[L+Yt*tt,lt-(oe*It-ge*Et)*tt,oe*Et+ge*It]}}const S=(O,U)=>(O/300)**U;function E(O,U,L){const lt=[];for(const tt of O)(tt.a??1)<.02||(tt.r=Math.max(L,tt.r),lt.push(tt));return lt.sort((tt,Et)=>tt.z-Et.z),{dots:lt,lines:U.filter(tt=>(tt.a??1)>=.02)}}function T(O,U,L){const lt=O/2,tt=lt*.82,Et=x(U*.12,.3,lt,lt,1),It=S(O,L.rsPow),Ct=[];for(let Ht=0;Ht<L.orbitN;Ht++){const Bt=p(Ht,1.7),oe=p(Ht,5.2),Nt=p(Ht,8.9),Yt=tt*(.45+.52*Bt),ge=Bt*c,fe=Math.acos(2*oe-1),de=Math.sin(fe)*Math.cos(ge),Se=Math.cos(fe),fn=Math.sin(fe)*Math.sin(ge);let De=-Se,Fe=de;const Ye=0,On=Math.max(1e-6,Math.hypot(De,Fe));De/=On,Fe/=On;const In=Se*Ye-fn*Fe,ln=fn*De-de*Ye,cn=de*Fe-Se*De,He=(.25+.55*Nt)*(Nt>.5?1:-1);for(let We=0;We<L.ghostN;We++){const mt=We/L.ghostN*c,Zt=Math.cos(mt),kt=Math.sin(mt),[ne,_e,Ke]=Et((De*Zt+In*kt)*Yt,(Fe*Zt+ln*kt)*Yt,(Ye*Zt+cn*kt)*Yt);Ct.push({x:ne,y:_e,z:Ke,r:L.ghostR*It,white:.72,a:L.ghostA*(.4+.6*((Ke/Yt+1)/2))})}for(let We=0;We<L.particles;We++){const mt=U*He+We/L.particles*c+oe*6,Zt=Math.cos(mt),kt=Math.sin(mt),[ne,_e,Ke]=Et((De*Zt+In*kt)*Yt,(Fe*Zt+ln*kt)*Yt,(Ye*Zt+cn*kt)*Yt),Ae=(Ke/Yt+1)/2;Ct.push({x:ne,y:_e,z:Ke,r:(L.partR+L.partRDepth*Ae)*It,white:.3-.22*Ae})}}return E(Ct,[],L.rMin)}function M(O,U,L){const tt=O/2,Et=tt*.82,It=x(U*.5,.4+.06*Math.sin(U*.35),tt,tt,Et),Ct=U*(.5+(1.7-.5)*L.scanMul),Ht=S(O,L.rsPow),Bt=[];for(let oe=0;oe<=L.latRings;oe++){const Nt=-Math.PI/2+oe/L.latRings*Math.PI,Yt=Math.cos(Nt),ge=Math.sin(Nt),fe=Math.max(1,Math.round(Math.abs(Yt)*L.lonDensity));for(let de=0;de<fe;de++){const Se=de/fe*c,[fn,De,Fe]=It(Yt*Math.cos(Se),ge,Yt*Math.sin(Se)),Ye=(Fe+1)/2,On=g(Se+U*.5,Ct),In=Math.exp(-(On*On)/.18)*Math.max(0,Fe);Bt.push({x:fn,y:De,z:Fe,r:(L.rBase+L.rDepth*Ye+L.rBoost*In)*Ht,white:L.inkFar-L.inkSpan*Ye,a:L.dimBase+(1-L.dimBase)*Math.min(1,In)})}}return E(Bt,[],L.rMin)}function v(O,U,L){const lt=O/2,tt=lt*.82,Et=x(U*.55,.35+.1*Math.sin(U*.9),lt,lt,tt),It=S(O,L.rsPow),Ct=L.moveCount,Ht=[];for(let Se=0;Se<Ct;Se++){const fn=Math.min(2,Math.floor(p(Se,2.3)*3)),De=-1+.5*Math.min(3,Math.floor(p(Se,5.9)*4));Ht.push({axis:fn,lo:De,hi:De+.5,ang:(p(Se,7.7)<.5?1:-1)*Math.PI/2})}const Bt=.42,oe=1.2,Nt=2*Ct*Bt+oe,Yt=U%Nt,ge=new Array(Ct).fill(0);let fe=-1;if(Yt<2*Ct*Bt){const Se=Math.floor(Yt/Bt),fn=(Yt-Se*Bt)/Bt,De=1-(1-Math.min(1,fn/.7))**3;if(Se<Ct){for(let Fe=0;Fe<Se;Fe++)ge[Fe]=1;ge[Se]=De,fe=Se}else{const Fe=2*Ct-1-Se;for(let Ye=0;Ye<Fe;Ye++)ge[Ye]=1;ge[Fe]=1-De,fe=Fe}}const de=[];for(let Se=0;Se<=L.latRings;Se++){const fn=-Math.PI/2+Se/L.latRings*Math.PI,De=Math.cos(fn),Fe=Math.sin(fn),Ye=Math.max(1,Math.round(Math.abs(De)*L.lonDensity));for(let On=0;On<Ye;On++){const In=On/Ye*c;let ln=De*Math.cos(In),cn=Fe,He=De*Math.sin(In),We=!1;for(let _e=0;_e<Ct;_e++){if(ge[_e]<=0)continue;const Ke=Ht[_e],Ae=Ke.axis===0?ln:Ke.axis===1?cn:He;if(Ae<Ke.lo||Ae>=Ke.hi)continue;_e===fe&&(We=!0);const zn=Ke.ang*ge[_e],Ze=Math.cos(zn),ye=Math.sin(zn);if(Ke.axis===0){const Qe=cn*Ze-He*ye;He=cn*ye+He*Ze,cn=Qe}else if(Ke.axis===1){const Qe=ln*Ze+He*ye;He=-ln*ye+He*Ze,ln=Qe}else{const Qe=ln*Ze-cn*ye;cn=ln*ye+cn*Ze,ln=Qe}}const[mt,Zt,kt]=Et(ln,cn,He),ne=(kt+1)/2;de.push({x:mt,y:Zt,z:kt,r:(L.rBase+L.rDepth*ne+(We?L.rActive:0))*It,white:L.inkFar-L.inkSpan*ne-(We?.14:0)})}}return E(de,[],L.rMin)}function I(O,U,L){const lt=O/2,tt=lt*.874,Et=x(U*.18,.38,lt,lt,1),It=S(O,L.rsPow),Ct=[];for(let Ht=0;Ht<=L.rings;Ht++){const Bt=-Math.PI/2+Ht/L.rings*Math.PI,oe=Math.cos(Bt),Nt=Math.sin(Bt),Yt=.62*Math.sin(U*2.1-Ht*.52)+.38*Math.sin(U*1.27+Ht*.83),ge=tt*(.88+.105*Yt),fe=Math.max(1,Math.round(Math.abs(oe)*L.lonDensity));for(let de=0;de<fe;de++){const Se=de/fe*c,[fn,De,Fe]=Et(oe*Math.cos(Se)*ge,Nt*ge,oe*Math.sin(Se)*ge),Ye=(Fe/tt+1)/2,On=Math.max(0,Yt);Ct.push({x:fn,y:De,z:Fe,r:(L.rBase+L.rDepth*Ye)*(1+.4*On)*It,white:.66-.56*Ye-.1*On})}}return E(Ct,[],L.rMin)}function F(O,U,L){const lt=O/2,tt=lt*.8,Et=x(U*.12,.32,lt,lt,tt),It=S(O,L.rsPow),Ct=L.nodeN,Ht=[];for(let Nt=0;Nt<Ct;Nt++){const Yt=_(Nt,Ct),ge=Yt[0]+.6*(m(Nt*.31+9,U*.24)-.5),fe=Yt[1]+.6*(m(Nt*.53+27,U*.21)-.5),de=Yt[2]+.6*(m(Nt*.77+55,U*.27)-.5),Se=Math.hypot(ge,fe,de);Ht.push([ge/Se,fe/Se,de/Se])}const Bt=[],oe=[];for(let Nt=0;Nt<Ct;Nt++)for(let Yt=Nt+1;Yt<Ct;Yt++){const ge=Math.hypot(Ht[Nt][0]-Ht[Yt][0],Ht[Nt][1]-Ht[Yt][1],Ht[Nt][2]-Ht[Yt][2]);if(ge>=L.thr)continue;const[fe,de,Se]=Et(Ht[Nt][0],Ht[Nt][1],Ht[Nt][2]),[fn,De,Fe]=Et(Ht[Yt][0],Ht[Yt][1],Ht[Yt][2]);Bt.push({x1:fe,y1:de,x2:fn,y2:De,white:.42,a:(1-ge/L.thr)*(.3+.55*(((Se+Fe)/2+1)/2)),w:Math.max(.6,L.lineW*It)})}for(let Nt=0;Nt<Ct;Nt++){const[Yt,ge,fe]=Et(Ht[Nt][0],Ht[Nt][1],Ht[Nt][2]),de=(fe+1)/2;oe.push({x:Yt,y:ge,z:fe,r:(L.nodeR+L.nodeRDepth*de)*(1+.25*Math.sin(U*1.4+Nt*2.7))*It,white:.55-.45*de})}for(let Nt=0;Nt<L.signals;Nt++){const Yt=Math.floor(U*.55+Nt*7.31),ge=Math.floor(p(Yt,Nt*3.1+1.7)*Ct),fe=Math.floor(p(Yt,Nt*5.7+4.2)*Ct);if(ge===fe)continue;const de=h(U*.55+Nt*7.31),Se=d(Ht[ge][0],Ht[fe][0],de),fn=d(Ht[ge][1],Ht[fe][1],de),De=d(Ht[ge][2],Ht[fe][2],de),Fe=Math.max(1e-6,Math.hypot(Se,fn,De)),[Ye,On,In]=Et(Se/Fe,fn/Fe,De/Fe),ln=(In+1)/2;oe.push({x:Ye,y:On,z:In,r:(L.nodeR*1.5+L.nodeRDepth*ln)*It,white:.05,a:.5+.5*ln})}return E(oe,Bt,L.rMin)}function z(O,U,L){const lt=O/2,tt=lt*.76,Et=x(U*.4,.3,lt,lt,1),It=S(O,L.rsPow),Ct=[];for(let Ht=0;Ht<L.ghostN;Ht++){const Bt=_(Ht,L.ghostN),[oe,Nt,Yt]=Et(Bt[0]*tt,Bt[1]*tt,Bt[2]*tt);Ct.push({x:oe,y:Nt,z:Yt,r:.8*It,white:.78,a:.1+.22*((Yt/tt+1)/2)})}for(let Ht=0;Ht<3;Ht++){const Bt=Ht/3*c;for(let oe=0;oe<L.strandN;oe++){const Nt=(h(oe/L.strandN+U*.045)*2-1)*.96,Yt=Math.sqrt(Math.max(0,1-Nt*Nt)),ge=Math.min(1,(1-Math.abs(Nt))/.1),fe=Nt*Math.PI*L.turns+Bt,de=1+.075*Math.sin(Nt*Math.PI*L.turns*2+Bt*2+U*.8),Se=Yt*tt*de,[fn,De,Fe]=Et(Math.cos(fe)*Se,Nt*tt*de,Math.sin(fe)*Se),Ye=(Fe/tt+1)/2;Ct.push({x:fn,y:De,z:Fe,r:(L.rBase+L.rDepth*Ye)*It,white:.55-.45*Ye,a:ge*(.45+.55*Ye)})}}return E(Ct,[],L.rMin)}function Q(O,U,L){const lt=O/2,tt=lt*.78,Et=L.spin,It=.3,Ct=x(U*.1*Et,It,lt,lt,1),Ht=S(O,L.rsPow),Bt=[];for(let cn=0;cn<L.ghostN;cn++){const He=_(cn,L.ghostN),[We,mt,Zt]=Ct(He[0]*tt,He[1]*tt,He[2]*tt);Bt.push({x:We,y:mt,z:Zt,r:.8*Ht,white:.78,a:.1+.22*((Zt/tt+1)/2)})}const oe=U*.24*Et,Nt=L.faceOn?-It:.55+.3*Math.sin(U*.18)*Et,Yt=Math.cos(oe),ge=0,fe=Math.sin(oe),de=-fe*Math.sin(Nt),Se=Math.cos(Nt),fn=Yt*Math.sin(Nt),De=ge*fn-fe*Se,Fe=fe*de-Yt*fn,Ye=Yt*Se-ge*de,On=.23*L.wobMul,In=L.faceOn?tt/(1+.85*On):tt,ln=Math.max(1,Math.round(L.lanes*L.bandMul));for(let cn=0;cn<ln;cn++){const He=(cn-(ln-1)/2)*.075,We=Math.abs(cn-(ln-1)/2)/Math.max(1,(ln-1)/2);for(let mt=0;mt<L.segs;mt++){const Zt=mt/L.segs*c,kt=(.16*Math.sin(Zt*3-U*1.7+cn*.22)+.07*Math.sin(Zt*5+U*1.1))*L.wobMul,ne=L.faceOn?1+kt:1,_e=L.faceOn?He:He+kt,Ke=Math.cos(Zt),Ae=Math.sin(Zt),zn=Yt*Ke+de*Ae+De*_e,Ze=ge*Ke+Se*Ae+Fe*_e,ye=fe*Ke+fn*Ae+Ye*_e,Qe=Math.hypot(zn,Ze,ye),hi=In*ne,[Wa,_a,vo]=Ct(zn/Qe*hi,Ze/Qe*hi,ye/Qe*hi),ja=(vo/tt+1)/2;Bt.push({x:Wa,y:_a,z:vo,r:(L.rBase+L.rDepth*ja)*(1-.25*We)*Ht,white:.52-.44*ja+.18*We,a:.4+.6*ja})}}return E(Bt,[],L.rMin)}const H=O=>{const U=O.length,L=[];let lt=0;for(let tt=0;tt<U;tt++){const Et=Math.hypot(O[(tt+1)%U][0]-O[tt][0],O[(tt+1)%U][1]-O[tt][1]);L.push(Et),lt+=Et}return tt=>{let Et=tt*lt,It=0;for(;Et>L[It]&&It<U-1;)Et-=L[It],It++;const Ct=O[It],Ht=O[(It+1)%U],Bt=L[It]?Math.min(1,Et/L[It]):0;return[Ct[0]+(Ht[0]-Ct[0])*Bt,Ct[1]+(Ht[1]-Ct[1])*Bt]}},D=[O=>{const U=-Math.PI/2+O*c;return[Math.cos(U)*.24,Math.sin(U)*.24]},H([[0,-.26],[.24,.16],[-.24,.16]]),H([[0,-.2],[.2,-.2],[.2,.2],[-.2,.2],[-.2,-.2]])];function j(O,U,L){const It=D.length,Ct=U%(2.3*It),Ht=Math.floor(Ct/2.3),Bt=Ct-Ht*2.3,oe=Bt>1.4?(Bt-1.4)/.9:0,Nt=oe*oe*(3-2*oe),Yt=D[Ht],ge=D[(Ht+1)%It],fe=160,de=[],Se=[];for(let He=0;He<fe;He++){const We=Yt(He/fe),mt=ge(He/fe);de.push([(We[0]+(mt[0]-We[0])*Nt)*L.spread,(We[1]+(mt[1]-We[1])*Nt)*L.spread])}let fn=0;for(let He=0;He<fe;He++){const We=Math.hypot(de[(He+1)%fe][0]-de[He][0],de[(He+1)%fe][1]-de[He][1]);Se.push(We),fn+=We}const De=Math.max(6,Math.round(34*L.iconD)),Fe=L.rDot*1.35*L.spread,Ye=1+.02*Math.sin(Bt*3.1),On=O/2,In=[];let ln=0,cn=0;for(let He=0;He<De;He++){const We=He/De*fn;for(;cn+Se[ln]<We&&ln<fe-1;)cn+=Se[ln],ln++;const mt=de[ln],Zt=de[(ln+1)%fe],kt=Se[ln]?Math.min(1,(We-cn)/Se[ln]):0;In.push({x:On+(mt[0]+(Zt[0]-mt[0])*kt)*Ye*O,y:On+(mt[1]+(Zt[1]-mt[1])*kt)*Ye*O,z:0,r:Math.max(.35,Fe*O),white:.1})}return E(In,[],L.rMin)}const N={globe:{latRings:17,lonDensity:44,rBase:.6,rDepth:1.7,rBoost:1,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},orbits:{orbitN:12,ghostN:40,ghostR:.9,ghostA:.5,particles:3,partR:1.2,partRDepth:1.6,rsPow:.6,rMin:.3},rubik:{latRings:15,lonDensity:40,moveCount:14,rBase:.6,rDepth:1.7,rActive:.3,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},wave:{rings:15,lonDensity:40,rBase:.6,rDepth:1.7,rsPow:.6,rMin:.3},web:{nodeN:30,thr:.72,signals:5,nodeR:1.4,nodeRDepth:1.8,lineW:.8,rsPow:.6,rMin:.3},braid:{strandN:52,turns:3,ghostN:150,rBase:1.2,rDepth:1.8,rsPow:.6,rMin:.3},ribbon:{lanes:5,segs:88,ghostN:150,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},ring:{lanes:5,segs:88,ghostN:0,faceOn:1,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},morph:{rDot:.021,iconD:1,rMin:.25}},b={orbits:{64:{speed:1.885,count:1,size:1},20:{speed:3.9,count:.238,size:2.4}},globe:{64:{speed:2.015,count:.42,size:1.15,x:{scanMul:4.08,dimBase:.45}},20:{speed:2.665,count:.105,size:1.75,x:{scanMul:4.335,dimBase:.45}}},rubik:{64:{speed:1.82,count:.35,size:1.05},20:{speed:1.95,count:.088,size:1.9}},wave:{64:{speed:4.388,count:.341,size:1},20:{speed:3.998,count:.105,size:1.6}},web:{64:{speed:3.315,count:1.35,size:.95},20:{speed:6.63,count:.25,size:1.52}},braid:{64:{speed:1.625,count:.5,size:1},20:{speed:2.75,count:.1125,size:1.36}},ribbon:{64:{speed:2.34,count:.25,size:.85,x:{spin:0,bandMul:3.9,wobMul:1}},20:{speed:3.12,count:.051,size:1.073,x:{spin:0,bandMul:4.94,wobMul:1}}},ring:{64:{speed:3.24,count:.25,size:.956,x:{spin:0,bandMul:3.627,wobMul:.368}},20:{speed:3.78,count:.028,size:1.622,x:{spin:0,bandMul:3.968,wobMul:.565}}},morph:{64:{speed:2.405,count:.702,size:.395,x:{spread:1.45}},20:{speed:2.08,count:.53,size:1.011,x:{spread:1.45}}}},B=[["latRings","lonDensity"],["rings","lonDensity"],["lanes","segs"]],Y=["orbitN","ghostN","nodeN","strandN","signals"],Z=["rBase","rDepth","rActive","rDot","ghostR","partR","partRDepth","nodeR","nodeRDepth"],nt={orbits:T,globe:M,rubik:v,wave:I,web:F,braid:z,ribbon:Q,ring:Q,morph:j},_t=new Map;function w(O,U){const L=O+U,lt=_t.get(L);if(lt)return lt;const tt=b[O][U],Et={...N[O]},It=Math.sqrt(tt.count),Ct=new Set;for(const[Bt,oe]of B)Et[Bt]!=null&&Et[oe]!=null&&!Ct.has(Bt)&&!Ct.has(oe)&&(Et[Bt]=Math.max(2,Math.round(Et[Bt]*It)),Et[oe]=Math.max(2,Math.round(Et[oe]*It)),Ct.add(Bt),Ct.add(oe));for(const Bt of Y)Et[Bt]!=null&&Et[Bt]!==0&&!Ct.has(Bt)&&(Et[Bt]=Math.max(1,Math.round(Et[Bt]*tt.count)));Et.iconD!=null&&(Et.iconD=Math.max(.02,Et.iconD*tt.count));for(const Bt of Z)Et[Bt]!=null&&(Et[Bt]=Et[Bt]*tt.size);const Ht={fn:nt[O],speed:tt.speed,opts:Object.assign({spin:1,faceOn:0,bandMul:1,wobMul:1,spread:1,scanMul:1,dimBase:1},Et,tt.x||{})};return _t.set(L,Ht),Ht}function X(O,U,L,lt,tt,Et){const It=w(U,L),Ct=It.fn(L,lt*It.speed,It.opts),[Ht,Bt,oe]=tt;for(const Nt of Ct.lines){const Yt=1-Math.min(1,Math.max(0,Nt.white));O.strokeStyle=`rgba(${Yt*Ht|0},${Yt*Bt|0},${Yt*oe|0},${(Nt.a??1)*Et})`,O.lineWidth=Nt.w,O.beginPath(),O.moveTo(Nt.x1,Nt.y1),O.lineTo(Nt.x2,Nt.y2),O.stroke()}for(const Nt of Ct.dots){const Yt=1-Math.min(1,Math.max(0,Nt.white));O.fillStyle=`rgba(${Yt*Ht|0},${Yt*Bt|0},${Yt*oe|0},${(Nt.a??1)*Et})`,O.beginPath(),O.arc(Nt.x,Nt.y,Nt.r,0,c),O.fill()}}const G={IDLE:{mode:"ring",cn:"Idle"},RECV:{mode:"wave",cn:"Receive"},PLAN:{mode:"morph",cn:"Plan"},SCAN:{mode:"globe",cn:"Retrieve"},EXEC:{mode:"orbits",cn:"Execute"},DBUG:{mode:"rubik",cn:"Debug"},SYNC:{mode:"web",cn:"Coordinate"},MERG:{mode:"braid",cn:"Merge"},WRIT:{mode:"ribbon",cn:"Compose"}},ot=[{id:"plan",cn:"Planning",tag:"PLAN",color:"#d6dee8",prog:[["PLAN",.8],["SYNC",.5]],rework:0},{id:"find",cn:"Research",tag:"FIND",color:"#9db6cc",prog:[["SCAN",1.6],["WRIT",.8]],rework:0},{id:"code",cn:"Coding",tag:"CODE",color:"#9ec4b8",prog:[["EXEC",2.9],["DBUG",1.4]],rework:.1},{id:"crit",cn:"Review",tag:"CRIT",color:"#b4aac8",prog:[["SCAN",.8],["MERG",1.2]],rework:.18},{id:"ship",cn:"Delivery",tag:"SHIP",color:"#c8ab9e",prog:[["MERG",.7],["WRIT",.7]],rework:0}],Dt={plan:1,find:2,code:3,crit:1,ship:1},V=16,ct=210,Lt=128,K=64,yt=620,Ft=178,wt=16;let zt=[],ae=[],xe=[],Pe=[],we=[],ke=0,at=0,Bn=0,Ue=20,jt=1,Kt=null,Xe=0,me=0;const P={x:-9999,y:-9999,in:!1};let A=20260418;const rt=()=>(A=A*1664525+1013904223>>>0)/4294967296,{field:xt,glow:At}=r,W=xt.getContext("2d");let ie=innerWidth,Xt=innerHeight,Ot=46;function qt(O){const U=ie>1080?268:240,L=ie-Ot,lt=ot.length;return{x:U+(O+.5)/lt*(L-U),y:Xt*.5-16,rx:Math.max(40,(L-U)/lt*.33),ry:Math.max(60,Xt*.28)}}const pt=O=>{const U=qt(O.ri);return{x:U.x+(rt()-.5)*U.rx*2,y:U.y+(rt()-.5)*U.ry*2}};function Gt(O){const U=qt(O),L={n:++Bn,ri:O,x:U.x+(rt()-.5)*U.rx*2,y:U.y+(rt()-.5)*U.ry*2,head:rt()*c,wp:null,phase:rt()*40,state:"IDLE",task:null,step:0,left:0,queue:[],off:!1,busy:0,span:0,pulse:0,hist:new Array(28).fill(0),histT:0};return L.wp=pt(L),L}let se=!1;const re=new Map,Wt={PLANNED:"IDLE",RUNNING:"EXEC",BLOCKED:"DBUG",REVIEW:"SCAN",REPAIR:"DBUG",VERIFIED:"MERG",MERGED:"MERG",DONE:"WRIT"},Te={PLANNED:"plan",RUNNING:"code",BLOCKED:"code",REVIEW:"crit",REPAIR:"code",VERIFIED:"crit",MERGED:"ship",DONE:"ship"};function Me(){zt=[],ae=[],xe=[],Pe=[],we=[],ke=0,at=0,Bn=0,me=0,ot.forEach((O,U)=>{for(let L=0;L<Dt[O.id];L++)zt.push(Gt(U))});for(let O=0;O<2700;O++)qe(1/30)}function Oe(O){const U=zt.filter(lt=>lt.ri===O&&!lt.off);if(!U.length)return null;const L=U.filter(lt=>lt.state==="IDLE"&&!lt.task&&!lt.queue.length);return L.length?L[Math.floor(rt()*L.length)]:U.reduce((lt,tt)=>tt.queue.length<lt.queue.length?tt:lt)}function $(O,U){const L=Oe(U);return L?(L.queue.push(O),L.pulse=1,!0):(ae.push({t:O,ri:U}),!1)}function Qt(O,U,L){const lt=Oe(L);if(!lt){ae.push({t:U,ri:L});return}xe.push({from:O,to:lt,task:U,f:0,back:L<O.ri})}function St(O){const[U,L]=ot[O.ri].prog[O.step];O.state=U,O.left=L*(.75+rt()*.5)}const Tt=30;function Jt(O,U){if(O.off){O.state="IDLE";return}const L=Math.exp(-U/Tt);if(O.span=O.span*L+U,O.task?O.busy=O.busy*L+U:O.busy*=L,!O.task){if(!O.queue.length){O.state="IDLE";return}O.task=O.queue.shift(),O.state="RECV",O.left=.34,O.step=-1}if(O.left-=U,O.left>0)return;if(O.step<0){O.step=0,St(O);return}if(O.step++,O.step<ot[O.ri].prog.length){St(O);return}const lt=ot[O.ri],tt=O.task;if(O.task=null,O.step=0,O.state="IDLE",tt.hops++,O.ri>0&&rt()<lt.rework){tt.rework++,Qt(O,tt,O.ri-1);return}if(O.ri===ot.length-1){tt.doneAt=ke,me++,we.push(tt),we.length>80&&we.shift();return}Qt(O,tt,O.ri+1)}const $t=.055,Pt=K*1.42;function pn(O,U){const L=!!O.task;(!O.wp||Math.hypot(O.wp.x-O.x,O.wp.y-O.y)<16)&&(O.wp=pt(O));let lt=O.wp.x,tt=O.wp.y;if(P.in){const Ct=Math.hypot(P.x-O.x,P.y-O.y);if(Ct<Lt){const Ht=1-Ct/Lt;lt=d(lt,P.x,Ht*.85),tt=d(tt,P.y,Ht*.85)}}O.head+=Math.max(-$t,Math.min($t,g(Math.atan2(tt-O.y,lt-O.x),O.head)));const Et=(L?7:30)*U;O.x+=Math.cos(O.head)*Et,O.y+=Math.sin(O.head)*Et;for(const Ct of zt){if(Ct===O)continue;const Ht=O.x-Ct.x,Bt=O.y-Ct.y,oe=Ht*Ht+Bt*Bt;if(oe>Pt*Pt)continue;const Nt=Math.max(.001,Math.sqrt(oe)),Yt=(1-Nt/Pt)*34*U,ge=Math.abs(Bt)<1?O.n<Ct.n?-Pt:Pt:Bt,fe=Math.max(.001,Math.hypot(Ht,ge));O.x+=Ht/fe*Yt*.5,O.y+=ge/fe*Yt*1.5}const It=qt(O.ri);O.x=d(O.x,Math.max(It.x-It.rx*1.5,Math.min(It.x+It.rx*1.5,O.x)),.08),O.y=d(O.y,Math.max(It.y-It.ry*1.2,Math.min(It.y+It.ry*1.2,O.y)),.08),O.pulse>0&&(O.pulse-=U*1.6),O.histT+=U,O.histT>1&&(O.histT=0,O.hist.push(L?1:0),O.hist.shift())}function Rn(){return ae.length+xe.length+zt.reduce((O,U)=>O+U.queue.length+(U.task?1:0),0)}function qe(O){ke+=O,se||(Xe-=O,Xe<=0&&(Xe=-Math.log(1-rt())*(60/Ue),Rn()<V&&$({id:++at,at:ke,hops:0,rework:0},0)));for(let U=ae.length-1;U>=0;U--){const L=Oe(ae[U].ri);L&&(L.queue.push(ae[U].t),L.pulse=1,ae.splice(U,1))}for(const U of zt)se||Jt(U,O),pn(U,O);for(let U=xe.length-1;U>=0;U--){const L=xe[U],lt=Math.max(1,Math.hypot(L.to.x-L.from.x,L.to.y-L.from.y));L.f+=ct*O/lt,L.f>=1&&(zt.includes(L.to)&&!L.to.off?(L.to.queue.push(L.task),L.to.pulse=1):ae.push({t:L.task,ri:L.to.ri}),xe.splice(U,1))}for(let U=Pe.length-1;U>=0;U--)Pe[U].t+=O*1.6,Pe[U].t>1&&Pe.splice(U,1)}const Nn=[223,227,232],Cn=[207,217,228],ta="ui-monospace, 'Geist Mono Variable', SFMono-Regular, Menlo, monospace",Hi=O=>[1,3,5].map(U=>parseInt(O.slice(U,U+2),16)).join(",");for(const O of ot)O.rgb=Hi(O.color);function ni(O){W.clearRect(0,0,ie,Xt),W.textAlign="center";for(let U=0;U<ot.length;U++){const L=ot[U],lt=qt(U),tt=zt.filter(It=>It.ri===U&&!It.off).length,Et=zt.filter(It=>It.ri===U).reduce((It,Ct)=>It+Ct.queue.length,0);W.strokeStyle=`rgba(${L.rgb},0.055)`,W.lineWidth=1,W.beginPath(),W.moveTo(lt.x,74),W.lineTo(lt.x,Xt-66),W.stroke(),W.strokeStyle=`rgba(${L.rgb},0.16)`,W.beginPath(),W.moveTo(lt.x-lt.rx*.8,62),W.lineTo(lt.x+lt.rx*.8,62),W.stroke(),W.font=`10px ${ta}`,W.fillStyle=`rgba(${L.rgb},${tt?.78:.34})`,W.fillText(`${U+1}. ${L.cn} ${L.tag}`,lt.x,40),W.font=`9px ${ta}`,W.fillStyle="rgba(150,160,172,0.5)",W.fillText(tt?`${tt} agents · queue ${Et}`:"No agents",lt.x,53)}W.textAlign="left",W.lineWidth=.7,W.setLineDash([3,5]);for(let U=0;U<zt.length;U++)for(let L=U+1;L<zt.length;L++){const lt=zt[U],tt=zt[L],Et=Math.hypot(lt.x-tt.x,lt.y-tt.y);Et>Ft||(W.strokeStyle=`rgba(190,200,212,${(.42*(1-Et/Ft)).toFixed(3)})`,W.beginPath(),W.moveTo(lt.x,lt.y),W.lineTo(tt.x,tt.y),W.stroke())}W.setLineDash([]);for(const U of xe){const L=d(U.from.x,U.to.x,U.f),lt=d(U.from.y,U.to.y,U.f),tt=U.back?"224,104,95":"186,203,220";W.strokeStyle=`rgba(${tt},0.18)`,W.lineWidth=.9,W.beginPath(),W.moveTo(U.from.x,U.from.y),W.lineTo(U.to.x,U.to.y),W.stroke();const Et=Math.max(0,U.f-.14),It=d(U.from.x,U.to.x,Et),Ct=d(U.from.y,U.to.y,Et),Ht=W.createLinearGradient(It,Ct,L,lt);Ht.addColorStop(0,`rgba(${tt},0)`),Ht.addColorStop(1,`rgba(${tt},0.85)`),W.strokeStyle=Ht,W.lineWidth=1.6,W.beginPath(),W.moveTo(It,Ct),W.lineTo(L,lt),W.stroke(),W.fillStyle=`rgba(${tt},0.95)`,W.beginPath(),W.arc(L,lt,2.3,0,c),W.fill()}W.font=`9.5px ${ta}`,W.textBaseline="middle";for(const U of zt){const L=ot[U.ri],lt=Kt===U,tt=P.in&&Math.hypot(P.x-U.x,P.y-U.y)<K*.62;if(U.off||(W.strokeStyle="rgba(150,160,172,0.42)",W.lineWidth=.8,W.beginPath(),W.moveTo(U.x-Math.cos(U.head)*K*.4,U.y-Math.sin(U.head)*K*.4),W.lineTo(U.x-Math.cos(U.head)*K*.74,U.y-Math.sin(U.head)*K*.74),W.stroke(),U.wp&&!U.task&&(W.fillStyle="rgba(150,160,172,0.45)",W.beginPath(),W.arc(U.wp.x,U.wp.y,1.6,0,c),W.fill())),W.save(),W.translate(U.x-K/2,U.y-K/2),X(W,G[U.state].mode,K,O+U.phase,lt?Cn:Nn,U.off?.16:1),W.restore(),U.pulse>0){const Yt=U.pulse;W.strokeStyle=`rgba(200,214,228,${(Yt*.7).toFixed(3)})`,W.lineWidth=1,W.beginPath(),W.arc(U.x,U.y,K*.42+(1-Yt)*22,0,c),W.stroke()}(lt||tt)&&(W.strokeStyle=lt?"rgba(207,217,228,0.75)":"rgba(190,200,212,0.30)",W.lineWidth=1,W.setLineDash([2,4]),W.beginPath(),W.arc(U.x,U.y,K*.6,0,c),W.stroke(),W.setLineDash([]));const Et=`A${U.n} ${L.tag}`,It=U.off?" OFFLINE":" "+U.state,Ct=W.measureText(Et).width,Ht=W.measureText(It).width,oe=U.x+K*.42+Ct+Ht>ie-12?U.x-K*.42-Ct-Ht:U.x+K*.42,Nt=U.y-K*.3;W.fillStyle=U.off?"rgba(120,128,138,.55)":L.color,W.fillText(Et,oe,Nt),W.fillStyle=U.off?"rgba(100,108,118,.5)":"rgba(190,200,212,0.62)",W.fillText(It,oe+Ct,Nt),U.queue.length&&(W.fillStyle="rgba(207,217,228,0.92)",W.fillText(`+${U.queue.length}`,oe,Nt+12))}P.in&&(W.strokeStyle="rgba(190,200,212,0.13)",W.lineWidth=.5,W.setLineDash([6,8]),W.beginPath(),W.arc(P.x,P.y,Lt,0,c),W.stroke(),W.setLineDash([]));for(const U of Pe)W.strokeStyle=`rgba(224,104,95,${((1-U.t)*.75).toFixed(3)})`,W.lineWidth=2*(1-U.t),W.beginPath(),W.arc(U.x,U.y,12+U.t*150,0,c),W.stroke()}const Be=At.getContext("webgl",{alpha:!1,antialias:!1});let ii=()=>{};if(Be){const O=`precision mediump float;
    uniform vec2 uRes; uniform float uTime, uN; uniform vec3 uA[${wt}];
    float h21(vec2 p){ return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453); }
    float vn(vec2 p){
      vec2 i = floor(p), f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1,0)), f.x),
                 mix(h21(i + vec2(0,1)), h21(i + vec2(1,1)), f.x), f.y);
    }
    void main(){
      vec2 p = gl_FragCoord.xy, uv = p / uRes;
      float g = 0.0;
      for (int i = 0; i < ${wt}; i++) {
        if (float(i) >= uN) break;
        vec2 d = (p - uA[i].xy) / uRes.y;
        g += uA[i].z * exp(-dot(d, d) * 30.0);
      }
      // brushed: anisotropy is the whole trick — isotropic noise always reads as cloud, never metal
      float sheen = vn(vec2(uv.x * 3.0 + uTime * 0.010, uv.y * 44.0)) * 0.62
                  + vn(vec2(uv.x * 7.0 - uTime * 0.006, uv.y * 96.0)) * 0.38;
      vec3 col = mix(vec3(0.062, 0.067, 0.076), vec3(0.030, 0.032, 0.038), uv.y);
      col += vec3(0.052, 0.057, 0.066) * (sheen - 0.5);
      col += vec3(0.66, 0.74, 0.86) * g * 0.125;
      col *= 1.0 - 0.44 * smoothstep(0.36, 1.0, length(uv - 0.5) * 1.30);
      gl_FragColor = vec4(col, 1.0);
    }`,U=(Nt,Yt)=>{const ge=Be.createShader(Nt);return Be.shaderSource(ge,Yt),Be.compileShader(ge),ge},L=Be.createProgram();Be.attachShader(L,U(Be.VERTEX_SHADER,"attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}")),Be.attachShader(L,U(Be.FRAGMENT_SHADER,O)),Be.linkProgram(L),Be.useProgram(L);const lt=Be.createBuffer();Be.bindBuffer(Be.ARRAY_BUFFER,lt),Be.bufferData(Be.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),Be.STATIC_DRAW);const tt=Be.getAttribLocation(L,"p");Be.enableVertexAttribArray(tt),Be.vertexAttribPointer(tt,2,Be.FLOAT,!1,0,0);const Et=Nt=>Be.getUniformLocation(L,Nt),It=Et("uRes"),Ct=Et("uTime"),Ht=Et("uN"),Bt=Et("uA[0]"),oe=new Float32Array(wt*3);ii=(Nt,Yt)=>{const ge=Math.min(wt,zt.length);for(let fe=0;fe<ge;fe++){const de=zt[fe];oe[fe*3]=de.x*Yt,oe[fe*3+1]=(Xt-de.y)*Yt,oe[fe*3+2]=de.off?.05:de.task?1:.22}Be.uniform2f(It,At.width,At.height),Be.uniform1f(Ct,Nt),Be.uniform1f(Ht,ge),Be.uniform3fv(Bt,oe),Be.drawArrays(Be.TRIANGLES,0,3)}}const vn=r.roster;function Ie(){const O=Math.min(devicePixelRatio,2);vn.innerHTML=ot.map((U,L)=>{const lt=zt.filter(tt=>tt.ri===L);return`<div class="grp"><h2><i style="background:${U.color}"></i>${U.cn} ${U.tag}<span class="sp"></span>
      <button data-sub="${L}" type="button"${lt.length?"":" disabled"}>−</button>
      <button data-add="${L}" type="button"${zt.length>=wt?" disabled":""}>+</button></h2>
      ${lt.map(tt=>`<div class="ag" data-n="${tt.n}"><canvas></canvas>
        <span class="nm">${tt.label||"A"+tt.n}</span><span class="st"></span>
        <span class="q"></span><span class="bar"><i></i></span></div>`).join("")}
    </div>`}).join("");for(const U of vn.querySelectorAll("canvas"))U.width=20*O,U.height=20*O,U.getContext("2d").setTransform(O,0,0,O,0,0)}l(vn,"click",O=>{const U=O.target.closest("[data-add]"),L=O.target.closest("[data-sub]");if(U){zt.length<wt&&(zt.push(Gt(+U.dataset.add)),Ie());return}if(L){const tt=+L.dataset.sub,Et=zt.filter(Ct=>Ct.ri===tt);if(!Et.length)return;const It=Et[Et.length-1];zt=zt.filter(Ct=>Ct!==It),Kt===It&&(Kt=null,mn());for(const Ct of[...It.task?[It.task]:[],...It.queue])$(Ct,tt);Ie();return}const lt=O.target.closest("[data-n]");lt&&(Kt=zt.find(tt=>tt.n===+lt.dataset.n)||null,mn(),Ie())});function bn(O){for(const U of vn.querySelectorAll(".ag")){const L=zt.find(It=>It.n===+U.dataset.n);if(!L)continue;const lt=U.querySelector("canvas").getContext("2d");lt.clearRect(0,0,20,20),X(lt,G[L.state].mode,20,O+L.phase,Kt===L?Cn:Nn,L.off?.2:1),U.querySelector(".st").textContent=L.off?"OFFLINE":`${L.state} ${G[L.state].cn}`,U.querySelector(".q").textContent=L.queue.length?`+${L.queue.length}`:"";const tt=L.span>0?L.busy/L.span:0,Et=U.querySelector(".bar i");Et.style.width=(tt*100).toFixed(0)+"%",Et.style.background=tt>.86?"var(--bad)":tt>.75?"var(--warn)":"var(--muted)",U.classList.toggle("on",Kt===L),U.classList.toggle("down",L.off)}}function rn(){const O=Kt,U=ot[O.ri],L=O.span>0?O.busy/O.span:0,lt=G[O.state];return{n:O.n,color:U.color,cn:U.cn,prog:U.prog.map(tt=>tt[0]).join(" → "),off:O.off,st:`${O.state} ${lt.cn}`,md:lt.mode,tk:O.task?"#"+O.task.id:"—",q:O.queue.length,u:(L*100).toFixed(0)+"%",hist:O.hist.map(tt=>!!tt)}}function mn(){if(!Kt||!zt.includes(Kt)){Kt=null,e.card(null);return}e.card(rn())}function li(){!Kt||!zt.includes(Kt)||e.card(rn())}function Ci(O){const U=Kt;U&&(O==="off"?(U.off=!U.off,U.off&&wi(U)):C(U),mn(),Ie())}function la(){Kt=null,mn(),Ie()}function wi(O){const U=[...O.task?[O.task]:[],...O.queue];O.task=null,O.queue=[],O.state="IDLE",O.step=0;for(const L of U){const lt=Oe(O.ri);lt&&lt!==O?(lt.queue.push(L),lt.pulse=1):ae.push({t:L,ri:O.ri})}}function C(O){!O.task&&!O.queue.length||(Pe.push({x:O.x,y:O.y,t:0}),wi(O))}function et(){const O=Math.min(60,ke),U=we.filter(Et=>Et.doneAt>ke-60),L=we.slice(-20).map(Et=>Et.doneAt-Et.at).sort((Et,It)=>Et-It),lt=ot.map((Et,It)=>{const Ct=zt.filter(oe=>oe.ri===It&&!oe.off),Ht=Ct.reduce((oe,Nt)=>oe+Nt.span,0),Bt=Ct.reduce((oe,Nt)=>oe+Nt.busy,0);return{r:Et,n:Ct.length,u:Ht>0?Bt/Ht:0,q:Ct.reduce((oe,Nt)=>oe+Nt.queue.length,0)}});let tt=0;for(let Et=0;Et<zt.length;Et++)for(let It=Et+1;It<zt.length;It++)Math.hypot(zt[Et].x-zt[It].x,zt[Et].y-zt[It].y)<Ft&&tt++;return{thr:O>3?U.length/O*60:0,lead:L.length?L[Math.floor(L.length/2)]:0,wip:Rn(),fin:me,util:lt,links:tt}}function dt(){const O=et();li(),r.tally.innerHTML=`<b>${zt.filter(tt=>!tt.off).length}</b> active · <b>${zt.filter(tt=>tt.task).length}</b> working<br>
     <b>${O.links}</b> links · <b>${xe.length}</b> messages in transit · <b>${O.fin}</b> delivered`,r.stats.innerHTML=`
    <div class="m"><u>Throughput</u><b>${O.thr.toFixed(1)}<s>tasks/min</s></b></div>
    <div class="m"><u>Lead time</u><b>${O.lead.toFixed(1)}<s>sec</s></b></div>
    <div class="m"><u>Work in progress</u><b>${O.wip}<s>/${V}</s></b></div>
    ${O.util.map(tt=>`<div class="m"><u>${tt.r.cn}</u><b style="color:${tt.u>.86?"var(--bad)":tt.u>.75?"var(--warn)":"var(--ink)"}">${(tt.u*100).toFixed(0)}<s>%</s></b></div>`).join("")}`;const U=O.util.find(tt=>tt.n===0),L=O.util.reduce((tt,Et)=>Et.u>tt.u?Et:tt),lt=O.util.reduce((tt,Et)=>Et.q>tt.q?Et:tt);r.verdict.innerHTML=U?`<b>${U.r.cn}</b> has no agents; work is blocked upstream.`:ke<15?"Warming up: throughput becomes reliable after a full minute of completions.":L.u>.86?`Bottleneck: <b>${L.r.cn}</b> at ${(L.u*100).toFixed(0)}% utilization. Add capacity here first.`:lt.q>=3?`<b>${lt.r.cn}</b> has ${lt.q} queued tasks; this is arrival variability, not yet a sustained capacity gap.`:`No clear bottleneck. <b>${L.r.cn}</b> is busiest at ${(L.u*100).toFixed(0)}%. Raise arrival rate to stress the system.`}const ft=O=>{Ue=+O},it=O=>{jt=+O,e.speed(jt)},Vt=(O,U)=>zt.find(L=>Math.hypot(L.x-O,L.y-U)<K*.62)||null;let ee=null,te=!1;l(xt,"pointermove",O=>{P.x=O.clientX,P.y=O.clientY,P.in=!0}),l(xt,"pointerleave",()=>{P.in=!1,P.x=P.y=-9999}),l(xt,"pointerdown",O=>{const U=Vt(O.clientX,O.clientY);te=!1,U&&(ee=setTimeout(()=>{te=!0,C(U),Ie()},yt))}),l(window,"pointerup",O=>{clearTimeout(ee),!(te||O.target!==xt)&&(Kt=Vt(O.clientX,O.clientY),mn(),Ie())}),l(window,"keydown",O=>{O.key==="Escape"&&(Kt=null,mn(),Ie()),O.key===" "&&!O.target.closest("button,input")&&(O.preventDefault(),it(jt?0:1))});function he(){const O=Math.min(devicePixelRatio,2);ie=innerWidth,Xt=innerHeight;for(const U of[xt,At])(U.width!==Math.round(ie*O)||U.height!==Math.round(Xt*O))&&(U.width=Math.round(ie*O),U.height=Math.round(Xt*O),U===xt?W.setTransform(O,0,0,O,0,0):Be&&Be.viewport(0,0,U.width,U.height));return O}const Re=matchMedia("(prefers-reduced-motion: reduce)"),Ee=wA({getAgents:()=>zt,ROLES:ot,STATES:G,LINK_R:Ft});let ue=0,Ne=1;he(),Me(),Ie();let sn=0;(function O(U){sn=requestAnimationFrame(O);const L=he(),lt=Math.min(.05,(U-ue)/1e3);ue=U,Ot=d(Ot,Kt&&ie>1080?300:46,1-Math.exp(-lt*5)),jt&&qe(lt*jt);const tt=Re.matches?0:ke;Be&&ii(U/1e3,L),Ee.step(lt*jt||0),ni(tt),Ee.draw(W),bn(tt),Ne+=lt,Ne>.25&&(Ne=0,dt())})(0);function on(O){if(!Array.isArray(O)||O.length===0)return se&&(se=!1,re.clear(),Me(),Ie()),{live:!1,agents:0};se=!0;const U=new Set,L=[];for(const lt of O.slice(0,wt)){const tt=String(lt.id);if(U.has(tt))continue;U.add(tt);const Et=Te[lt.status]||"code",It=Math.max(0,ot.findIndex(Ht=>Ht.id===Et));let Ct=re.get(tt);Ct||(Ct=Gt(It),re.set(tt,Ct)),Ct.ri=It,Ct.label=lt.label||tt,Ct.state=Wt[lt.status]||"IDLE",Ct.task=null,Ct.queue=[],Ct.off=!1,L.push(Ct)}for(const lt of[...re.keys()])U.has(lt)||re.delete(lt);return zt=L,ae=[],xe=[],Ie(),{live:!0,agents:zt.length}}return{setLam:ft,setSpeed:it,cardAct:Ci,closeCard:la,mesh:Ee,setFleet:on,dispose(){i.abort(),cancelAnimationFrame(sn),clearTimeout(ee)}}}const UA=["info","ok","warn","bad"];function LA({mesh:r}){const e=new Map,i=new Map,s=[];let l=new Map,c=new Map;const d=(H,D)=>(e.get(H)||[]).forEach(j=>j(D));function h(H,D,j){s.unshift({ts:new Date,level:UA.includes(H)?H:"info",text:D,id:j}),s.length>60&&s.pop(),F(),d("note",s[0])}function p({id:H,name:D,n:j}={}){if(!H)throw new Error("PlugBrainMesh.register: {id} is required");const N=r.snapshot();let b=j;if(b==null){const Z=N.find(nt=>![...l.values()].includes(nt.n));b=Z?Z.n:null}if(b==null)return h("warn",`register ${H}: no free field agent left`),null;l.set(H,b);const B=(N.find(Z=>Z.n===b)||{}).hue||"#8ab2d1",Y={id:H,name:D||H,n:b,hue:B,ts:Date.now()};return i.set(H,Y),h("ok",`registered ${Y.name} → field agent A${b}`,H),d("register",Y),v(N),Y}function m(H){if(!i.delete(H))return!1;const D=l.get(H);return l.delete(H),h("info",`unregistered ${H} (A${D} returns to the pool)`,H),d("unregister",{id:H,n:D}),v(),!0}function _(H,D,j="info"){h(j,D,H)}const g=document.createElement("div");g.id="mesh-root",g.innerHTML=`
    <button id="mesh-toggle" type="button" title="Agent registry (m)">◈ mesh</button>
    <div id="mesh-panel" aria-hidden="true">
      <div class="mp-head">
        <h3>Agent Registry</h3><span class="mp-count"></span>
        <button class="mp-x" type="button" title="close">✕</button>
      </div>
      <div class="mp-list"></div>
      <div class="mp-foot">PlugBrainMesh · register() · note() · unregister()</div>
    </div>
    <div id="mesh-feed"></div>`,document.body.appendChild(g);const x=g.querySelector("#mesh-panel"),S=g.querySelector(".mp-list"),E=g.querySelector("#mesh-feed"),T=g.querySelector("#mesh-toggle"),M=H=>{x.setAttribute("aria-hidden",String(!H)),T.classList.toggle("on",H),H&&v()};T.addEventListener("click",()=>M(x.getAttribute("aria-hidden")==="true")),g.querySelector(".mp-x").addEventListener("click",()=>M(!1)),window.addEventListener("keydown",H=>{H.key.toLowerCase()==="m"&&!H.target.closest("input,button")&&M(x.getAttribute("aria-hidden")==="true")});function v(H=r.snapshot()){g.querySelector(".mp-count").textContent=`${H.length} on field · ${i.size} registered`,S.innerHTML=H.map(D=>{const j=[...i.values()].find(B=>B.n===D.n),N=j?j.name:`A${D.n}`,b=Math.round(D.util*100);return`<div class="mp-row" data-n="${D.n}">
        <i class="mp-hue" style="background:${D.hue}"></i>
        <span class="mp-name">${N}${j?` <s>A${D.n}</s>`:""}</span>
        <span class="mp-state ${D.state==="OFFLINE"?"off":""}">${D.stateCn}</span>
        <span class="mp-task">${D.task||""}</span>
        <span class="mp-bar"><i style="width:${b}%;background:${b>86?"var(--bad)":b>75?"var(--warn)":D.hue}"></i></span>
      </div>`}).join("")}const I=H=>H.toTimeString().slice(0,8);function F(){E.innerHTML=s.slice(0,9).map((H,D)=>`<div class="mf-line" style="opacity:${1-D*.1}">
        <s>${I(H.ts)}</s><i class="mf-${H.level}"></i><span>${H.text}</span>
      </div>`).join("")}let z=setInterval(()=>{const H=r.snapshot();for(const D of H){const j=c.get(D.n);if(j&&j!==D.state){const N=[...i.values()].find(Y=>Y.n===D.n),b=N?N.name:`A${D.n}`,B=D.state==="DBUG"?"warn":D.state==="EXEC"?"ok":"info";h(B,`${b} · ${j} → ${D.state}${D.task?" · "+D.task:""}`,N?.id)}c.set(D.n,D.state)}x.getAttribute("aria-hidden")==="false"&&v(H)},800);const Q={register:p,unregister:m,note:_,list:()=>[...i.values()],feed:()=>[...s],on:(H,D)=>(e.has(H)||e.set(H,new Set),e.get(H).add(D),()=>e.get(H).delete(D)),dispose:()=>{clearInterval(z),g.remove()}};return window.PlugBrainMesh=Q,h("ok","agent mesh module online — simulated fleet auto-registered"),Q}const NA=[[0,"⏸"],[1,"1×"],[2,"2×"],[4,"4×"]];function OA({tasks:r}){const e=ce.useRef(null),i=ce.useRef(null),s=ce.useRef(null),l=ce.useRef(null),c=ce.useRef(null),d=ce.useRef(null),h=ce.useRef(null),[p,m]=ce.useState(null),[_,g]=ce.useState(20),[x,S]=ce.useState(1);return ce.useEffect(()=>{const E=DA({els:{glow:e.current,field:i.current,roster:s.current,tally:l.current,stats:c.current,verdict:d.current},emit:{card:m,speed:S}});h.current=E;const T=LA({mesh:E.mesh});return()=>{T.dispose(),E.dispose(),h.current=null}},[]),ce.useEffect(()=>{h.current?.setFleet(r.map(E=>({id:E.id,label:E.assignedAgentId||E.title||E.id,status:E.status})))},[r]),k.jsxs(k.Fragment,{children:[k.jsx("canvas",{id:"glow",ref:e}),k.jsx("canvas",{id:"field",ref:i}),k.jsxs("div",{className:"ov",id:"hud",children:[k.jsxs("h1",{children:[k.jsx("i",{}),"Agent Mesh",k.jsx("em",{children:"Workflow"})]}),k.jsx("div",{className:"tally",id:"tally",ref:l,children:"—"})]}),k.jsx("div",{className:"ov",id:"roster",ref:s}),k.jsx("div",{className:"ov"+(p?" on":""),id:"inspect",children:p&&k.jsxs(k.Fragment,{children:[k.jsxs("h3",{children:[k.jsx("i",{style:{background:p.color}}),"A",p.n," · ",p.cn,k.jsx("button",{className:"x",type:"button",onClick:()=>h.current?.closeCard(),children:"✕"})]}),k.jsxs("div",{className:"kv",children:[k.jsx("span",{children:"Current state"}),k.jsx("b",{id:"i-st",children:p.st}),k.jsx("span",{children:"State visualization"}),k.jsx("b",{id:"i-md",children:p.md}),k.jsx("span",{children:"Task"}),k.jsx("b",{id:"i-tk",children:p.tk}),k.jsx("span",{children:"Queue"}),k.jsx("b",{id:"i-q",children:p.q}),k.jsx("span",{children:"Utilization"}),k.jsx("b",{id:"i-u",children:p.u}),k.jsx("span",{children:"State program"}),k.jsx("b",{children:p.prog})]}),k.jsx("div",{className:"hist",children:p.hist.map((E,T)=>k.jsx("i",{style:{height:E?"100%":"16%",background:E?p.color:"var(--line)"}},T))}),k.jsx("div",{className:"note",children:"The strip shows busy and idle time over the last 28 seconds. Long gaps mean spare capacity; a full strip marks a constraint."}),k.jsxs("div",{className:"act",children:[k.jsx("button",{className:"btn"+(p.off?" on":""),"data-act":"off",type:"button",onClick:()=>h.current?.cardAct("off"),children:p.off?"Bring online":"Take offline"}),k.jsx("button",{className:"btn","data-act":"kick",type:"button",onClick:()=>h.current?.cardAct("kick"),children:"Interrupt and reassign"})]})]})}),k.jsxs("div",{className:"ov",id:"ctl",children:[k.jsxs("div",{className:"fld",children:["Arrival rate ",k.jsxs("b",{id:"lamv",children:[_," /min"]}),k.jsx("input",{type:"range",id:"lam",min:"4",max:"46",step:"1",value:_,onChange:E=>{g(+E.target.value),h.current?.setLam(+E.target.value)}})]}),k.jsx("div",{className:"seg",id:"spd",children:NA.map(([E,T])=>k.jsx("button",{className:x===E?"on":"","data-s":E,type:"button",onClick:()=>h.current?.setSpeed(E),children:T},E))}),k.jsx("span",{className:"sp"}),k.jsx("div",{id:"stats",ref:c}),k.jsx("div",{id:"verdict",ref:d,children:"—"})]}),k.jsx("div",{id:"tip",children:"Move cursor near agents to call them · click to inspect · hold to interrupt and reassign · Space to pause"})]})}const j_=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Agenten und Zustände aus dem PlugBoard-Ledger"}];function zA(){const r=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),i=r||e;return j_.some(s=>s.id===i)?i:"atlas"}function PA(){const[r,e]=ce.useState(null),[i,s]=ce.useState([]),[l,c]=ce.useState(!0),[d,h]=ce.useState(""),[p,m]=ce.useState(0),[_,g]=ce.useState(zA),[x,S]=ce.useState(null),[E,T]=ce.useState(null),[M,v]=ce.useState(!1);ce.useEffect(()=>{try{localStorage.setItem("plugbrain.view",_)}catch{}},[_]);const I=ce.useRef(null);ce.useEffect(()=>{I.current=E},[E]),ce.useEffect(()=>{const Q=new URLSearchParams(location.search).get("workspace");fetch("/api/timeline"+(Q?"?workspace="+encodeURIComponent(Q):"")).then(H=>H.json()).then(H=>{H?.bounds?.first&&S(H.bounds)}).catch(()=>{})},[]),ce.useEffect(()=>{if(!M||!x)return;const Q=new Date(x.first).getTime(),H=new Date(x.last).getTime(),D=Math.max(1,H-Q);let j=E?Math.round((new Date(E).getTime()-Q)/D*60):0;const N=setInterval(()=>{if(j+=1,j>=60){T(null),v(!1);return}T(new Date(Q+D*j/60).toISOString())},220);return()=>clearInterval(N)},[M,x]),ce.useEffect(()=>{const Q=new AbortController;let H,D="",j="";const N=new URLSearchParams(location.search).get("workspace");async function b(){try{const B=new URLSearchParams;N&&B.set("workspace",N),I.current&&B.set("until",I.current);const Y=await fetch("/api/atlas/snapshot"+(B.toString()?`?${B}`:""),{signal:Q.signal});if(!Y.ok)throw new Error(`Brain-Verbindung: HTTP ${Y.status}`);const Z=await Y.json();if(!Z.workspace?.canonicalPath||!Array.isArray(Z.graph?.nodes)||!Array.isArray(Z.graph?.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const nt=JSON.stringify([Z.workspace,Z.graph,Z.coverage]);nt!==D&&(e(Z),D=nt),h("")}catch(B){Q.signal.aborted||h(B instanceof Error?B.message:String(B))}try{const B=await fetch("/api/agents"+(N?"?workspace="+encodeURIComponent(N):""),{signal:Q.signal});if(!B.ok)throw new Error(String(B.status));const Y=await B.json(),nt=(Array.isArray(Y?.agents)?Y.agents:[]).map(w=>({id:w.id,title:w.name,assignedAgentId:w.name,status:w.filesTouched>0?"RUNNING":w.actions>0?"REVIEW":"PLANNED"})),_t=JSON.stringify(nt);_t!==j&&(s(nt),j=_t),c(!0)}catch{Q.signal.aborted||c(!1)}Q.signal.aborted||(H=setTimeout(b,3e3))}return b(),()=>{Q.abort(),clearTimeout(H)}},[p,E]);const F=r?.graph.nodes.length??0,z=d?`Verbindung unterbrochen · ${d}`:r?`${F} Objekte · ${r.coverage?.complete?"laufend aktualisiert":"Index unvollständig"}`:"Index wird geladen …";return k.jsxs(k.Fragment,{children:[k.jsxs("div",{className:"live-status",role:"status",children:[k.jsx("strong",{children:r?.workspace.name||"PlugBrain"}),k.jsx("span",{children:r?.workspace.canonicalPath||"Workspace wird verbunden …"}),k.jsx("span",{children:z}),k.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:j_.map(Q=>k.jsx("button",{type:"button",title:Q.hint,className:Q.id===_?"on":void 0,"aria-pressed":Q.id===_,onClick:()=>g(Q.id),children:Q.label},Q.id))}),d&&k.jsx("button",{type:"button",onClick:()=>m(Q=>Q+1),children:"Erneut verbinden"})]}),x&&k.jsxs("div",{className:"brain-timelapse",children:[k.jsx("button",{type:"button",onClick:()=>v(Q=>!Q),title:"Wachstum abspielen",children:M?"❚❚":"▶"}),k.jsx("input",{type:"range",min:0,max:60,step:1,value:E&&x?Math.round((new Date(E).getTime()-new Date(x.first).getTime())/Math.max(1,new Date(x.last).getTime()-new Date(x.first).getTime())*60):60,onChange:Q=>{v(!1);const H=Number(Q.target.value);if(H>=60){T(null);return}const D=new Date(x.first).getTime(),j=new Date(x.last).getTime();T(new Date(D+(j-D)*H/60).toISOString())}}),k.jsx("span",{children:E?new Date(E).toLocaleTimeString():"jetzt"})]}),_==="atlas"&&(r&&F>0?k.jsx(FA,{graph:r.graph}):k.jsx("div",{className:"brain-empty",children:d||(r?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …")})),_==="city"&&k.jsx("div",{className:"brain-view brain-view-city",children:k.jsx(CA,{snapshot:r})}),_==="mesh"&&k.jsxs("div",{className:"brain-view brain-view-mesh",children:[!l&&k.jsx("div",{className:"brain-note",children:"Agenten-Register nicht erreichbar — es werden keine echten Agenten angezeigt."}),l&&i.length===0&&k.jsx("div",{className:"brain-note",children:"Noch kein Agent hat diesen Workspace angefasst. Die Engine läuft in Eigensimulation — das sind keine echten Agenten."}),k.jsx(OA,{tasks:i})]})]})}const BA=r=>/✗|STALE|REPAIR|Quarantäne|secret|offen/i.test(r);function IA(r,e){if(!e)return r;const i=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return r.split(i).map((s,l)=>l%2?k.jsx("mark",{children:s},l):s)}function FA({graph:r}){const{CLUSTERS:e,nodes:i,edges:s,createAtlas:l}=ce.useMemo(()=>pA(r),[r]),c=Object.fromEntries(e.map(G=>[G.id,i.filter(ot=>ot.cid===G.id).length])),d=ce.useRef(null),h=ce.useRef(null),p=ce.useRef(null),m=ce.useRef(null),_=ce.useRef(null),g=ce.useRef(null),x=ce.useRef(null),S=ce.useRef(null),E=ce.useRef(null),T=ce.useRef(null),M=ce.useRef(null),v=ce.useRef(null),I=ce.useRef(null),[F,z]=ce.useState(!1),[Q,H]=ce.useState({q:"",rows:[]}),[D,j]=ce.useState(null),[N,b]=ce.useState({flow:!0,label:!0,spin:!1}),[B,Y]=ce.useState("atlas"),[Z,nt]=ce.useState("dark"),[_t,w]=ce.useState([]);ce.useEffect(()=>{const G=l({els:{stage:d.current,labels:h.current,hudMode:p.current,hudSel:m.current,pathbar:_.current,chain:g.current,zlvl:x.current,sNode:S.current,sEdge:E.current,sDeg:T.current,sFps:M.current,q:v.current},emit:{gate:z,list:H,drawer:j,tools:b,theme:nt}});return I.current=G,()=>{G.dispose(),I.current=null}},[l]);const X=G=>{w(ot=>ot.includes(G)?ot.filter(Dt=>Dt!==G):[...ot,G]),I.current?.toggleCluster(G)};return k.jsxs("div",{id:"app",className:D?"open":"",children:[k.jsxs("aside",{children:[k.jsxs("div",{className:"brand",children:[k.jsxs("h1",{children:[k.jsx("span",{className:"dot"}),"PlugBrain"]}),k.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",k.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),k.jsxs("div",{className:"searchbox",children:[k.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[k.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),k.jsx("path",{d:"M10.5 10.5 14 14"})]}),k.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol, Mission, Pack suchen…",autoComplete:"off",spellCheck:!1,ref:v,onChange:G=>I.current?.setQuery(G.target.value)})]}),k.jsx("div",{className:"legend",id:"legend",children:e.map(G=>k.jsxs("button",{className:"cl"+(_t.includes(G.id)?" off":""),type:"button",onClick:()=>X(G.id),children:[k.jsx("i",{style:{background:G.color}}),G.name,k.jsx("b",{children:c[G.id]})]},G.id))}),k.jsx("div",{className:"listwrap",id:"list",children:Q.rows.length?Q.rows.map(G=>k.jsxs("div",{className:"lrow"+(G.on?" on":""),"data-i":G.i,onClick:()=>I.current?.selectAt(G.i),onMouseOver:()=>I.current?.hoverAt(G.i),onMouseLeave:()=>I.current?.hoverAt(null),children:[k.jsx("i",{style:{background:G.color}}),k.jsx("span",{children:IA(G.name,Q.q)}),k.jsx("b",{children:G.deg})]},G.i)):k.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),k.jsxs("div",{className:"foot",children:[k.jsxs("div",{children:[k.jsx("div",{className:"k",id:"s-node",ref:S,children:"—"}),k.jsx("div",{className:"l",children:"Objekte"})]}),k.jsxs("div",{children:[k.jsx("div",{className:"k",id:"s-edge",ref:E,children:"—"}),k.jsx("div",{className:"l",children:"Kanten"})]}),k.jsxs("div",{children:[k.jsx("div",{className:"k",id:"s-deg",ref:T,children:"—"}),k.jsx("div",{className:"l",children:"Ø-Grad"})]}),k.jsxs("div",{children:[k.jsx("div",{className:"k",id:"s-fps",ref:M,children:"—"}),k.jsx("div",{className:"l",children:"FPS"})]})]})]}),k.jsxs("div",{id:"stage",ref:d,children:[k.jsx("div",{id:"labels",ref:h}),k.jsxs("div",{id:"hud",children:[k.jsx("div",{children:k.jsx("b",{id:"hud-mode",ref:p,children:"GALAXIE · FREIER ORBIT"})}),k.jsx("div",{id:"hud-sel",ref:m,children:"Nichts ausgewählt"}),k.jsxs("div",{id:"hud-sys",children:[i.length," VON ",r.nodes.length," OBJEKTEN · ",s.length," VON ",r.edges.length," KANTEN"]})]}),k.jsxs("div",{id:"pathbar",ref:_,children:[k.jsx("span",{className:"chain",id:"chain",ref:g}),k.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>I.current?.clearPath(),children:"✕"})]}),k.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([G,ot])=>k.jsx("button",{className:"tb"+(B===G?" on":""),"data-view":G,type:"button",onClick:()=>{Y(G),I.current?.setView(G)},children:ot},G)),k.jsx("span",{className:"sep"}),k.jsx("button",{className:"tb"+(N.flow?" on":""),id:"t-flow",type:"button",onClick:()=>I.current?.toggleFlow(),children:"Signalfluss"}),k.jsx("button",{className:"tb"+(N.label?" on":""),id:"t-label",type:"button",onClick:()=>I.current?.toggleLabel(),children:"Labels"}),k.jsx("button",{className:"tb"+(N.spin?" on":""),id:"t-spin",type:"button",onClick:()=>I.current?.toggleSpin(),children:"Auto-Orbit"}),k.jsx("span",{className:"sep"}),k.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>I.current?.dolly(1.18),children:"−"}),k.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:x,onClick:()=>I.current?.zoomReset(),children:"100%"}),k.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>I.current?.dolly(1/1.18),children:"＋"}),k.jsx("span",{className:"sep"}),k.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>I.current?.toggleTheme(),children:Z==="light"?"Nacht":"Tag"}),k.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>I.current?.reset(),children:"Reset"})]}),k.jsxs("div",{id:"hint",children:["Ziehen rotiert · Scrollen oder ",k.jsx("kbd",{children:"+"}),"/",k.jsx("kbd",{children:"−"})," zoomt · Klick fokussiert ein Objekt",k.jsx("br",{})," ",k.jsx("kbd",{children:"Shift"}),"+Klick auf ein zweites Objekt zeigt die kürzeste Kausalkette · ",k.jsx("kbd",{children:"Esc"})," löst die Auswahl"]}),k.jsxs("div",{id:"gate",style:F?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",k.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]}),k.jsx("div",{id:"drawer",children:k.jsx("div",{className:"dr",id:"dr",children:D&&k.jsxs(k.Fragment,{children:[k.jsxs("div",{className:"dr-head",children:[k.jsxs("div",{className:"kind",children:[k.jsx("i",{style:{background:D.color}}),D.cname," · Grad ",D.deg," · Ebene ",D.depth]}),k.jsx("h2",{children:D.name}),k.jsx("p",{children:D.desc}),k.jsxs("dl",{className:"prov",children:[D.kind&&k.jsxs(k.Fragment,{children:[k.jsx("dt",{children:"Typ"}),k.jsx("dd",{children:D.kind})]}),D.path&&k.jsxs(k.Fragment,{children:[k.jsx("dt",{children:"Pfad"}),k.jsx("dd",{className:"mono",children:D.path})]}),D.status&&k.jsxs(k.Fragment,{children:[k.jsx("dt",{children:"Status"}),k.jsx("dd",{className:BA(D.status)?"bad":"",children:D.status})]}),D.prov&&k.jsxs(k.Fragment,{children:[k.jsx("dt",{children:"Provenienz"}),k.jsx("dd",{children:D.prov})]})]})]}),k.jsx("div",{className:"dr-body",children:D.groups.map(G=>k.jsxs("div",{className:"dr-sec",children:[k.jsxs("h3",{children:[G.title," ",k.jsx("b",{style:{color:"var(--faint)",opacity:.6},children:G.items.length})]}),G.items.map(ot=>k.jsxs("div",{className:"nb","data-i":ot.i,onClick:()=>I.current?.selectAt(ot.i),children:[k.jsx("i",{style:{background:ot.color}}),k.jsx("span",{children:ot.name}),k.jsx("u",{children:G.tag})]},ot.i))]},G.tag))}),k.jsxs("div",{className:"dr-act",children:[k.jsx("button",{className:"btn",id:"a-center",type:"button",onClick:()=>I.current?.centerOn(D.i),children:"Hier zentrieren"}),k.jsx("button",{className:"btn primary",id:"a-path",type:"button",onClick:()=>I.current?.startPath(D.i),children:"Kausalkette ab hier"})]})]})})})]})}sM.createRoot(document.getElementById("root")).render(k.jsx(ce.StrictMode,{children:k.jsx(PA,{})}));

(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var Hv={exports:{}},ef={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ny=Symbol.for("react.transitional.element"),Uy=Symbol.for("react.fragment");function Gv(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:Ny,type:e,key:i,ref:t!==void 0?t:null,props:n}}ef.Fragment=Uy;ef.jsx=Gv;ef.jsxs=Gv;Hv.exports=ef;var z=Hv.exports,Vv={exports:{}},he={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Op=Symbol.for("react.transitional.element"),Ly=Symbol.for("react.portal"),Oy=Symbol.for("react.fragment"),Py=Symbol.for("react.strict_mode"),zy=Symbol.for("react.profiler"),Iy=Symbol.for("react.consumer"),By=Symbol.for("react.context"),Fy=Symbol.for("react.forward_ref"),Hy=Symbol.for("react.suspense"),Gy=Symbol.for("react.memo"),kv=Symbol.for("react.lazy"),Vy=Symbol.for("react.activity"),n0=Symbol.iterator;function ky(e){return e===null||typeof e!="object"?null:(e=n0&&e[n0]||e["@@iterator"],typeof e=="function"?e:null)}var Xv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Wv=Object.assign,qv={};function bo(e,t,n){this.props=e,this.context=t,this.refs=qv,this.updater=n||Xv}bo.prototype.isReactComponent={};bo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};bo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Yv(){}Yv.prototype=bo.prototype;function Pp(e,t,n){this.props=e,this.context=t,this.refs=qv,this.updater=n||Xv}var zp=Pp.prototype=new Yv;zp.constructor=Pp;Wv(zp,bo.prototype);zp.isPureReactComponent=!0;var i0=Array.isArray;function Xd(){}var rn={H:null,A:null,T:null,S:null},Zv=Object.prototype.hasOwnProperty;function Ip(e,t,n){var i=n.ref;return{$$typeof:Op,type:e,key:t,ref:i!==void 0?i:null,props:n}}function Xy(e,t){return Ip(e.type,t,e.props)}function Bp(e){return typeof e=="object"&&e!==null&&e.$$typeof===Op}function Wy(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var a0=/\/+/g;function Rf(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Wy(""+e.key):t.toString(36)}function qy(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(Xd,Xd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Lr(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case Op:case Ly:r=!0;break;case kv:return r=e._init,Lr(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+Rf(e,0):i,i0(a)?(n="",r!=null&&(n=r.replace(a0,"$&/")+"/"),Lr(a,t,n,"",function(c){return c})):a!=null&&(Bp(a)&&(a=Xy(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(a0,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(i0(e))for(var l=0;l<e.length;l++)i=e[l],s=o+Rf(i,l),r+=Lr(i,t,n,s,a);else if(l=ky(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+Rf(i,l++),r+=Lr(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return Lr(qy(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function tc(e,t,n){if(e==null)return e;var i=[],a=0;return Lr(e,i,"","",function(s){return t.call(n,s,a++)}),i}function Yy(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var s0=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Zy={map:tc,forEach:function(e,t,n){tc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return tc(e,function(){t++}),t},toArray:function(e){return tc(e,function(t){return t})||[]},only:function(e){if(!Bp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};he.Activity=Vy;he.Children=Zy;he.Component=bo;he.Fragment=Oy;he.Profiler=zy;he.PureComponent=Pp;he.StrictMode=Py;he.Suspense=Hy;he.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=rn;he.__COMPILER_RUNTIME={__proto__:null,c:function(e){return rn.H.useMemoCache(e)}};he.cache=function(e){return function(){return e.apply(null,arguments)}};he.cacheSignal=function(){return null};he.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=Wv({},e.props),a=e.key;if(t!=null)for(s in t.key!==void 0&&(a=""+t.key),t)!Zv.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(i[s]=t[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Ip(e.type,a,i)};he.createContext=function(e){return e={$$typeof:By,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:Iy,_context:e},e};he.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)Zv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Ip(e,s,a)};he.createRef=function(){return{current:null}};he.forwardRef=function(e){return{$$typeof:Fy,render:e}};he.isValidElement=Bp;he.lazy=function(e){return{$$typeof:kv,_payload:{_status:-1,_result:e},_init:Yy}};he.memo=function(e,t){return{$$typeof:Gy,type:e,compare:t===void 0?null:t}};he.startTransition=function(e){var t=rn.T,n={};rn.T=n;try{var i=e(),a=rn.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Xd,s0)}catch(s){s0(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),rn.T=t}};he.unstable_useCacheRefresh=function(){return rn.H.useCacheRefresh()};he.use=function(e){return rn.H.use(e)};he.useActionState=function(e,t,n){return rn.H.useActionState(e,t,n)};he.useCallback=function(e,t){return rn.H.useCallback(e,t)};he.useContext=function(e){return rn.H.useContext(e)};he.useDebugValue=function(){};he.useDeferredValue=function(e,t){return rn.H.useDeferredValue(e,t)};he.useEffect=function(e,t){return rn.H.useEffect(e,t)};he.useEffectEvent=function(e){return rn.H.useEffectEvent(e)};he.useId=function(){return rn.H.useId()};he.useImperativeHandle=function(e,t,n){return rn.H.useImperativeHandle(e,t,n)};he.useInsertionEffect=function(e,t){return rn.H.useInsertionEffect(e,t)};he.useLayoutEffect=function(e,t){return rn.H.useLayoutEffect(e,t)};he.useMemo=function(e,t){return rn.H.useMemo(e,t)};he.useOptimistic=function(e,t){return rn.H.useOptimistic(e,t)};he.useReducer=function(e,t,n){return rn.H.useReducer(e,t,n)};he.useRef=function(e){return rn.H.useRef(e)};he.useState=function(e){return rn.H.useState(e)};he.useSyncExternalStore=function(e,t,n){return rn.H.useSyncExternalStore(e,t,n)};he.useTransition=function(){return rn.H.useTransition()};he.version="19.2.8";Vv.exports=he;var It=Vv.exports,jv={exports:{}},nf={},Kv={exports:{}},Qv={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(B,F){var O=B.length;B.push(F);t:for(;0<O;){var X=O-1>>>1,ht=B[X];if(0<a(ht,F))B[X]=F,B[O]=ht,O=X;else break t}}function n(B){return B.length===0?null:B[0]}function i(B){if(B.length===0)return null;var F=B[0],O=B.pop();if(O!==F){B[0]=O;t:for(var X=0,ht=B.length,bt=ht>>>1;X<bt;){var Nt=2*(X+1)-1,re=B[Nt],Qt=Nt+1,ae=B[Qt];if(0>a(re,O))Qt<ht&&0>a(ae,re)?(B[X]=ae,B[Qt]=O,X=Qt):(B[X]=re,B[Nt]=O,X=Nt);else if(Qt<ht&&0>a(ae,O))B[X]=ae,B[Qt]=O,X=Qt;else break t}}return F}function a(B,F){var O=B.sortIndex-F.sortIndex;return O!==0?O:B.id-F.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();e.unstable_now=function(){return r.now()-o}}var l=[],c=[],d=1,h=null,u=3,p=!1,g=!1,y=!1,m=!1,f=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;function S(B){for(var F=n(c);F!==null;){if(F.callback===null)i(c);else if(F.startTime<=B)i(c),F.sortIndex=F.expirationTime,t(l,F);else break;F=n(c)}}function U(B){if(y=!1,S(B),!g)if(n(l)!==null)g=!0,C||(C=!0,I());else{var F=n(c);F!==null&&k(U,F.startTime-B)}}var C=!1,E=-1,_=5,w=-1;function D(){return m?!0:!(e.unstable_now()-w<_)}function L(){if(m=!1,C){var B=e.unstable_now();w=B;var F=!0;try{t:{g=!1,y&&(y=!1,v(E),E=-1),p=!0;var O=u;try{e:{for(S(B),h=n(l);h!==null&&!(h.expirationTime>B&&D());){var X=h.callback;if(typeof X=="function"){h.callback=null,u=h.priorityLevel;var ht=X(h.expirationTime<=B);if(B=e.unstable_now(),typeof ht=="function"){h.callback=ht,S(B),F=!0;break e}h===n(l)&&i(l),S(B)}else i(l);h=n(l)}if(h!==null)F=!0;else{var bt=n(c);bt!==null&&k(U,bt.startTime-B),F=!1}}break t}finally{h=null,u=O,p=!1}F=void 0}}finally{F?I():C=!1}}}var I;if(typeof M=="function")I=function(){M(L)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,V=P.port2;P.port1.onmessage=L,I=function(){V.postMessage(null)}}else I=function(){f(L,0)};function k(B,F){E=f(function(){B(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(B){B.callback=null},e.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):_=0<B?Math.floor(1e3/B):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_next=function(B){switch(u){case 1:case 2:case 3:var F=3;break;default:F=u}var O=u;u=F;try{return B()}finally{u=O}},e.unstable_requestPaint=function(){m=!0},e.unstable_runWithPriority=function(B,F){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var O=u;u=B;try{return F()}finally{u=O}},e.unstable_scheduleCallback=function(B,F,O){var X=e.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?X+O:X):O=X,B){case 1:var ht=-1;break;case 2:ht=250;break;case 5:ht=1073741823;break;case 4:ht=1e4;break;default:ht=5e3}return ht=O+ht,B={id:d++,callback:F,priorityLevel:B,startTime:O,expirationTime:ht,sortIndex:-1},O>X?(B.sortIndex=O,t(c,B),n(l)===null&&B===n(c)&&(y?(v(E),E=-1):y=!0,k(U,O-X))):(B.sortIndex=ht,t(l,B),g||p||(g=!0,C||(C=!0,I()))),B},e.unstable_shouldYield=D,e.unstable_wrapCallback=function(B){var F=u;return function(){var O=u;u=F;try{return B.apply(this,arguments)}finally{u=O}}}})(Qv);Kv.exports=Qv;var jy=Kv.exports,Jv={exports:{}},Kn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ky=It;function $v(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ya(){}var Yn={d:{f:Ya,r:function(){throw Error($v(522))},D:Ya,C:Ya,L:Ya,m:Ya,X:Ya,S:Ya,M:Ya},p:0,findDOMNode:null},Qy=Symbol.for("react.portal");function Jy(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:Qy,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var rl=Ky.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function af(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Kn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Yn;Kn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error($v(299));return Jy(e,t,null,n)};Kn.flushSync=function(e){var t=rl.T,n=Yn.p;try{if(rl.T=null,Yn.p=2,e)return e()}finally{rl.T=t,Yn.p=n,Yn.d.f()}};Kn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Yn.d.C(e,t))};Kn.prefetchDNS=function(e){typeof e=="string"&&Yn.d.D(e)};Kn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=af(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Yn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&Yn.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Kn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=af(t.as,t.crossOrigin);Yn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Yn.d.M(e)};Kn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=af(n,t.crossOrigin);Yn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Kn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=af(t.as,t.crossOrigin);Yn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Yn.d.m(e)};Kn.requestFormReset=function(e){Yn.d.r(e)};Kn.unstable_batchedUpdates=function(e,t){return e(t)};Kn.useFormState=function(e,t,n){return rl.H.useFormState(e,t,n)};Kn.useFormStatus=function(){return rl.H.useHostTransitionStatus()};Kn.version="19.2.8";function t_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(t_)}catch(e){console.error(e)}}t_(),Jv.exports=Kn;var $y=Jv.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yn=jy,e_=It,tM=$y;function mt(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function n_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Fl(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function i_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function a_(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function r0(e){if(Fl(e)!==e)throw Error(mt(188))}function eM(e){var t=e.alternate;if(!t){if(t=Fl(e),t===null)throw Error(mt(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return r0(a),e;if(s===i)return r0(a),t;s=s.sibling}throw Error(mt(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(mt(189))}}if(n.alternate!==i)throw Error(mt(190))}if(n.tag!==3)throw Error(mt(188));return n.stateNode.current===n?e:t}function s_(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=s_(e),t!==null)return t;e=e.sibling}return null}var on=Object.assign,nM=Symbol.for("react.element"),ec=Symbol.for("react.transitional.element"),Jo=Symbol.for("react.portal"),zr=Symbol.for("react.fragment"),r_=Symbol.for("react.strict_mode"),Wd=Symbol.for("react.profiler"),o_=Symbol.for("react.consumer"),wa=Symbol.for("react.context"),Fp=Symbol.for("react.forward_ref"),qd=Symbol.for("react.suspense"),Yd=Symbol.for("react.suspense_list"),Hp=Symbol.for("react.memo"),ts=Symbol.for("react.lazy"),Zd=Symbol.for("react.activity"),iM=Symbol.for("react.memo_cache_sentinel"),o0=Symbol.iterator;function Oo(e){return e===null||typeof e!="object"?null:(e=o0&&e[o0]||e["@@iterator"],typeof e=="function"?e:null)}var aM=Symbol.for("react.client.reference");function jd(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===aM?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case zr:return"Fragment";case Wd:return"Profiler";case r_:return"StrictMode";case qd:return"Suspense";case Yd:return"SuspenseList";case Zd:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Jo:return"Portal";case wa:return e.displayName||"Context";case o_:return(e._context.displayName||"Context")+".Consumer";case Fp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Hp:return t=e.displayName||null,t!==null?t:jd(e.type)||"Memo";case ts:t=e._payload,e=e._init;try{return jd(e(t))}catch{}}return null}var $o=Array.isArray,se=e_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,He=tM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,qs={pending:!1,data:null,method:null,action:null},Kd=[],Ir=-1;function fa(e){return{current:e}}function wn(e){0>Ir||(e.current=Kd[Ir],Kd[Ir]=null,Ir--)}function tn(e,t){Ir++,Kd[Ir]=e.current,e.current=t}var oa=fa(null),yl=fa(null),ps=fa(null),vu=fa(null);function _u(e,t){switch(tn(ps,t),tn(yl,e),tn(oa,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?hg(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=hg(t),e=RS(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}wn(oa),tn(oa,e)}function ro(){wn(oa),wn(yl),wn(ps)}function Qd(e){e.memoizedState!==null&&tn(vu,e);var t=oa.current,n=RS(t,e.type);t!==n&&(tn(yl,e),tn(oa,n))}function xu(e){yl.current===e&&(wn(oa),wn(yl)),vu.current===e&&(wn(vu),Ul._currentValue=qs)}var Cf,l0;function Is(e){if(Cf===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Cf=t&&t[1]||"",l0=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Cf+e+l0}var wf=!1;function Df(e,t){if(!e||wf)return"";wf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var u=p}Reflect.construct(e,[],h)}else{try{h.call()}catch(p){u=p}e.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}(h=e())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=i&&0<=a);break}}}finally{wf=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Is(n):""}function sM(e,t){switch(e.tag){case 26:case 27:case 5:return Is(e.type);case 16:return Is("Lazy");case 13:return e.child!==t&&t!==null?Is("Suspense Fallback"):Is("Suspense");case 19:return Is("SuspenseList");case 0:case 15:return Df(e.type,!1);case 11:return Df(e.type.render,!1);case 1:return Df(e.type,!0);case 31:return Is("Activity");default:return""}}function c0(e){try{var t="",n=null;do t+=sM(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var Jd=Object.prototype.hasOwnProperty,Gp=yn.unstable_scheduleCallback,Nf=yn.unstable_cancelCallback,rM=yn.unstable_shouldYield,oM=yn.unstable_requestPaint,mi=yn.unstable_now,lM=yn.unstable_getCurrentPriorityLevel,l_=yn.unstable_ImmediatePriority,c_=yn.unstable_UserBlockingPriority,Su=yn.unstable_NormalPriority,cM=yn.unstable_LowPriority,u_=yn.unstable_IdlePriority,uM=yn.log,fM=yn.unstable_setDisableYieldValue,Hl=null,gi=null;function os(e){if(typeof uM=="function"&&fM(e),gi&&typeof gi.setStrictMode=="function")try{gi.setStrictMode(Hl,e)}catch{}}var vi=Math.clz32?Math.clz32:pM,dM=Math.log,hM=Math.LN2;function pM(e){return e>>>=0,e===0?32:31-(dM(e)/hM|0)|0}var nc=256,ic=262144,ac=4194304;function Bs(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function sf(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Bs(i):(r&=o,r!==0?a=Bs(r):n||(n=o&~e,n!==0&&(a=Bs(n))))):(o=i&~s,o!==0?a=Bs(o):r!==0?a=Bs(r):n||(n=i&~e,n!==0&&(a=Bs(n)))),a===0?0:t!==0&&t!==a&&!(t&s)&&(s=a&-a,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:a}function Gl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function mM(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function f_(){var e=ac;return ac<<=1,!(ac&62914560)&&(ac=4194304),e}function Uf(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Vl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function gM(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var d=31-vi(n),h=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var p=u[d];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&d_(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function d_(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-vi(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function h_(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-vi(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function p_(e,t){var n=t&-t;return n=n&42?1:Vp(n),n&(e.suspendedLanes|t)?0:n}function Vp(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function kp(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function m_(){var e=He.p;return e!==0?e:(e=window.event,e===void 0?32:BS(e.type))}function u0(e,t){var n=He.p;try{return He.p=e,t()}finally{He.p=n}}var Cs=Math.random().toString(36).slice(2),On="__reactFiber$"+Cs,ri="__reactProps$"+Cs,Eo="__reactContainer$"+Cs,$d="__reactEvents$"+Cs,vM="__reactListeners$"+Cs,_M="__reactHandles$"+Cs,f0="__reactResources$"+Cs,kl="__reactMarker$"+Cs;function Xp(e){delete e[On],delete e[ri],delete e[$d],delete e[vM],delete e[_M]}function Br(e){var t=e[On];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Eo]||n[On]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=_g(e);e!==null;){if(n=e[On])return n;e=_g(e)}return t}e=n,n=e.parentNode}return null}function To(e){if(e=e[On]||e[Eo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function tl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(mt(33))}function Qr(e){var t=e[f0];return t||(t=e[f0]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Rn(e){e[kl]=!0}var g_=new Set,v_={};function or(e,t){oo(e,t),oo(e+"Capture",t)}function oo(e,t){for(v_[e]=t,e=0;e<t.length;e++)g_.add(t[e])}var xM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),d0={},h0={};function SM(e){return Jd.call(h0,e)?!0:Jd.call(d0,e)?!1:xM.test(e)?h0[e]=!0:(d0[e]=!0,!1)}function Yc(e,t,n){if(SM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function sc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function ma(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Ri(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function __(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function yM(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function th(e){if(!e._valueTracker){var t=__(e)?"checked":"value";e._valueTracker=yM(e,t,""+e[t])}}function x_(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=__(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function yu(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var MM=/[\n"\\]/g;function Ni(e){return e.replace(MM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function eh(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ri(t)):e.value!==""+Ri(t)&&(e.value=""+Ri(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?nh(e,r,Ri(t)):n!=null?nh(e,r,Ri(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Ri(o):e.removeAttribute("name")}function S_(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){th(e);return}n=n!=null?""+Ri(n):"",t=t!=null?""+Ri(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),th(e)}function nh(e,t,n){t==="number"&&yu(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Jr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Ri(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function y_(e,t,n){if(t!=null&&(t=""+Ri(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Ri(n):""}function M_(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(mt(92));if($o(i)){if(1<i.length)throw Error(mt(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Ri(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),th(e)}function lo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var bM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function p0(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||bM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function b_(e,t,n){if(t!=null&&typeof t!="object")throw Error(mt(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&p0(e,a,i)}else for(var s in t)t.hasOwnProperty(s)&&p0(e,s,t[s])}function Wp(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var EM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),TM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zc(e){return TM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Da(){}var ih=null;function qp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fr=null,$r=null;function m0(e){var t=To(e);if(t&&(e=t.stateNode)){var n=e[ri]||null;t:switch(e=t.stateNode,t.type){case"input":if(eh(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ni(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[ri]||null;if(!a)throw Error(mt(90));eh(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&x_(i)}break t;case"textarea":y_(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Jr(e,!!n.multiple,t,!1)}}}var Lf=!1;function E_(e,t,n){if(Lf)return e(t,n);Lf=!0;try{var i=e(t);return i}finally{if(Lf=!1,(Fr!==null||$r!==null)&&(vf(),Fr&&(t=Fr,e=$r,$r=Fr=null,m0(t),e)))for(t=0;t<e.length;t++)m0(e[t])}}function Ml(e,t){var n=e.stateNode;if(n===null)return null;var i=n[ri]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(mt(231,t,typeof n));return n}var Ba=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ah=!1;if(Ba)try{var Po={};Object.defineProperty(Po,"passive",{get:function(){ah=!0}}),window.addEventListener("test",Po,Po),window.removeEventListener("test",Po,Po)}catch{ah=!1}var ls=null,Yp=null,jc=null;function T_(){if(jc)return jc;var e,t=Yp,n=t.length,i,a="value"in ls?ls.value:ls.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return jc=a.slice(e,1<i?1-i:void 0)}function Kc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function rc(){return!0}function g0(){return!1}function oi(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?rc:g0,this.isPropagationStopped=g0,this}return on(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=rc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=rc)},persist:function(){},isPersistent:rc}),t}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rf=oi(lr),Xl=on({},lr,{view:0,detail:0}),AM=oi(Xl),Of,Pf,zo,of=on({},Xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zo&&(zo&&e.type==="mousemove"?(Of=e.screenX-zo.screenX,Pf=e.screenY-zo.screenY):Pf=Of=0,zo=e),Of)},movementY:function(e){return"movementY"in e?e.movementY:Pf}}),v0=oi(of),RM=on({},of,{dataTransfer:0}),CM=oi(RM),wM=on({},Xl,{relatedTarget:0}),zf=oi(wM),DM=on({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),NM=oi(DM),UM=on({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),LM=oi(UM),OM=on({},lr,{data:0}),_0=oi(OM),PM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},zM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},IM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function BM(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=IM[e])?!!t[e]:!1}function Zp(){return BM}var FM=on({},Xl,{key:function(e){if(e.key){var t=PM[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Kc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?zM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zp,charCode:function(e){return e.type==="keypress"?Kc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Kc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),HM=oi(FM),GM=on({},of,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),x0=oi(GM),VM=on({},Xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zp}),kM=oi(VM),XM=on({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),WM=oi(XM),qM=on({},of,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),YM=oi(qM),ZM=on({},lr,{newState:0,oldState:0}),jM=oi(ZM),KM=[9,13,27,32],jp=Ba&&"CompositionEvent"in window,ol=null;Ba&&"documentMode"in document&&(ol=document.documentMode);var QM=Ba&&"TextEvent"in window&&!ol,A_=Ba&&(!jp||ol&&8<ol&&11>=ol),S0=" ",y0=!1;function R_(e,t){switch(e){case"keyup":return KM.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function C_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hr=!1;function JM(e,t){switch(e){case"compositionend":return C_(t);case"keypress":return t.which!==32?null:(y0=!0,S0);case"textInput":return e=t.data,e===S0&&y0?null:e;default:return null}}function $M(e,t){if(Hr)return e==="compositionend"||!jp&&R_(e,t)?(e=T_(),jc=Yp=ls=null,Hr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return A_&&t.locale!=="ko"?null:t.data;default:return null}}var tb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function M0(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!tb[e.type]:t==="textarea"}function w_(e,t,n,i){Fr?$r?$r.push(i):$r=[i]:Fr=i,t=Fu(t,"onChange"),0<t.length&&(n=new rf("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var ll=null,bl=null;function eb(e){ES(e,0)}function lf(e){var t=tl(e);if(x_(t))return e}function b0(e,t){if(e==="change")return t}var D_=!1;if(Ba){var If;if(Ba){var Bf="oninput"in document;if(!Bf){var E0=document.createElement("div");E0.setAttribute("oninput","return;"),Bf=typeof E0.oninput=="function"}If=Bf}else If=!1;D_=If&&(!document.documentMode||9<document.documentMode)}function T0(){ll&&(ll.detachEvent("onpropertychange",N_),bl=ll=null)}function N_(e){if(e.propertyName==="value"&&lf(bl)){var t=[];w_(t,bl,e,qp(e)),E_(eb,t)}}function nb(e,t,n){e==="focusin"?(T0(),ll=t,bl=n,ll.attachEvent("onpropertychange",N_)):e==="focusout"&&T0()}function ib(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return lf(bl)}function ab(e,t){if(e==="click")return lf(t)}function sb(e,t){if(e==="input"||e==="change")return lf(t)}function rb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var xi=typeof Object.is=="function"?Object.is:rb;function El(e,t){if(xi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!Jd.call(t,a)||!xi(e[a],t[a]))return!1}return!0}function A0(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function R0(e,t){var n=A0(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=A0(n)}}function U_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?U_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function L_(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=yu(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=yu(e.document)}return t}function Kp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var ob=Ba&&"documentMode"in document&&11>=document.documentMode,Gr=null,sh=null,cl=null,rh=!1;function C0(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;rh||Gr==null||Gr!==yu(i)||(i=Gr,"selectionStart"in i&&Kp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),cl&&El(cl,i)||(cl=i,i=Fu(sh,"onSelect"),0<i.length&&(t=new rf("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Gr)))}function Us(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Vr={animationend:Us("Animation","AnimationEnd"),animationiteration:Us("Animation","AnimationIteration"),animationstart:Us("Animation","AnimationStart"),transitionrun:Us("Transition","TransitionRun"),transitionstart:Us("Transition","TransitionStart"),transitioncancel:Us("Transition","TransitionCancel"),transitionend:Us("Transition","TransitionEnd")},Ff={},O_={};Ba&&(O_=document.createElement("div").style,"AnimationEvent"in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),"TransitionEvent"in window||delete Vr.transitionend.transition);function cr(e){if(Ff[e])return Ff[e];if(!Vr[e])return e;var t=Vr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in O_)return Ff[e]=t[n];return e}var P_=cr("animationend"),z_=cr("animationiteration"),I_=cr("animationstart"),lb=cr("transitionrun"),cb=cr("transitionstart"),ub=cr("transitioncancel"),B_=cr("transitionend"),F_=new Map,oh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");oh.push("scrollEnd");function Ki(e,t){F_.set(e,t),or(t,[e])}var Mu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ti=[],kr=0,Qp=0;function cf(){for(var e=kr,t=Qp=kr=0;t<e;){var n=Ti[t];Ti[t++]=null;var i=Ti[t];Ti[t++]=null;var a=Ti[t];Ti[t++]=null;var s=Ti[t];if(Ti[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&H_(n,a,s)}}function uf(e,t,n,i){Ti[kr++]=e,Ti[kr++]=t,Ti[kr++]=n,Ti[kr++]=i,Qp|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function Jp(e,t,n,i){return uf(e,t,n,i),bu(e)}function ur(e,t){return uf(e,null,null,t),bu(e)}function H_(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,a&&t!==null&&(a=31-vi(n),e=s.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),s):null}function bu(e){if(50<_l)throw _l=0,Ch=null,Error(mt(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Xr={};function fb(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(e,t,n,i){return new fb(e,t,n,i)}function $p(e){return e=e.prototype,!(!e||!e.isReactComponent)}function La(e,t){var n=e.alternate;return n===null?(n=hi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function G_(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Qc(e,t,n,i,a,s){var r=0;if(i=e,typeof e=="function")$p(e)&&(r=1);else if(typeof e=="string")r=gE(e,n,oa.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Zd:return e=hi(31,n,t,a),e.elementType=Zd,e.lanes=s,e;case zr:return Ys(n.children,a,s,t);case r_:r=8,a|=24;break;case Wd:return e=hi(12,n,t,a|2),e.elementType=Wd,e.lanes=s,e;case qd:return e=hi(13,n,t,a),e.elementType=qd,e.lanes=s,e;case Yd:return e=hi(19,n,t,a),e.elementType=Yd,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case wa:r=10;break t;case o_:r=9;break t;case Fp:r=11;break t;case Hp:r=14;break t;case ts:r=16,i=null;break t}r=29,n=Error(mt(130,e===null?"null":typeof e,"")),i=null}return t=hi(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function Ys(e,t,n,i){return e=hi(7,e,i,t),e.lanes=n,e}function Hf(e,t,n){return e=hi(6,e,null,t),e.lanes=n,e}function V_(e){var t=hi(18,null,null,0);return t.stateNode=e,t}function Gf(e,t,n){return t=hi(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var w0=new WeakMap;function Ui(e,t){if(typeof e=="object"&&e!==null){var n=w0.get(e);return n!==void 0?n:(t={value:e,source:t,stack:c0(t)},w0.set(e,t),t)}return{value:e,source:t,stack:c0(t)}}var Wr=[],qr=0,Eu=null,Tl=0,Ci=[],wi=0,bs=null,ia=1,aa="";function Aa(e,t){Wr[qr++]=Tl,Wr[qr++]=Eu,Eu=e,Tl=t}function k_(e,t,n){Ci[wi++]=ia,Ci[wi++]=aa,Ci[wi++]=bs,bs=e;var i=ia;e=aa;var a=32-vi(i)-1;i&=~(1<<a),n+=1;var s=32-vi(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,ia=1<<32-vi(t)+a|n<<a|i,aa=s+e}else ia=1<<s|n<<a|i,aa=e}function tm(e){e.return!==null&&(Aa(e,1),k_(e,1,0))}function em(e){for(;e===Eu;)Eu=Wr[--qr],Wr[qr]=null,Tl=Wr[--qr],Wr[qr]=null;for(;e===bs;)bs=Ci[--wi],Ci[wi]=null,aa=Ci[--wi],Ci[wi]=null,ia=Ci[--wi],Ci[wi]=null}function X_(e,t){Ci[wi++]=ia,Ci[wi++]=aa,Ci[wi++]=bs,ia=t.id,aa=t.overflow,bs=e}var Pn=null,sn=null,Ne=!1,ms=null,Li=!1,lh=Error(mt(519));function Es(e){var t=Error(mt(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Al(Ui(t,e)),lh}function D0(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[On]=e,t[ri]=i,n){case"dialog":Ee("cancel",t),Ee("close",t);break;case"iframe":case"object":case"embed":Ee("load",t);break;case"video":case"audio":for(n=0;n<Dl.length;n++)Ee(Dl[n],t);break;case"source":Ee("error",t);break;case"img":case"image":case"link":Ee("error",t),Ee("load",t);break;case"details":Ee("toggle",t);break;case"input":Ee("invalid",t),S_(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Ee("invalid",t);break;case"textarea":Ee("invalid",t),M_(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||AS(t.textContent,n)?(i.popover!=null&&(Ee("beforetoggle",t),Ee("toggle",t)),i.onScroll!=null&&Ee("scroll",t),i.onScrollEnd!=null&&Ee("scrollend",t),i.onClick!=null&&(t.onclick=Da),t=!0):t=!1,t||Es(e,!0)}function N0(e){for(Pn=e.return;Pn;)switch(Pn.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Pn=Pn.return}}function gr(e){if(e!==Pn)return!1;if(!Ne)return N0(e),Ne=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Lh(e.type,e.memoizedProps)),n=!n),n&&sn&&Es(e),N0(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(mt(317));sn=vg(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(mt(317));sn=vg(e)}else t===27?(t=sn,ws(e.type)?(e=Ih,Ih=null,sn=e):sn=t):sn=Pn?Ii(e.stateNode.nextSibling):null;return!0}function Js(){sn=Pn=null,Ne=!1}function Vf(){var e=ms;return e!==null&&(ii===null?ii=e:ii.push.apply(ii,e),ms=null),e}function Al(e){ms===null?ms=[e]:ms.push(e)}var ch=fa(null),fr=null,Na=null;function ns(e,t,n){tn(ch,t._currentValue),t._currentValue=n}function Oa(e){e._currentValue=ch.current,wn(ch)}function uh(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function fh(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),uh(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(mt(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),uh(r,n,e),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ao(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(mt(387));if(r=r.memoizedProps,r!==null){var o=a.type;xi(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===vu.current){if(r=a.alternate,r===null)throw Error(mt(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(Ul):e=[Ul])}a=a.return}e!==null&&fh(t,e,n,i),t.flags|=262144}function Tu(e){for(e=e.firstContext;e!==null;){if(!xi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function $s(e){fr=e,Na=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function zn(e){return W_(fr,e)}function oc(e,t){return fr===null&&$s(e),W_(e,t)}function W_(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Na===null){if(e===null)throw Error(mt(308));Na=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Na=Na.next=t;return n}var db=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},hb=yn.unstable_scheduleCallback,pb=yn.unstable_NormalPriority,_n={$$typeof:wa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function nm(){return{controller:new db,data:new Map,refCount:0}}function Wl(e){e.refCount--,e.refCount===0&&hb(pb,function(){e.controller.abort()})}var ul=null,dh=0,co=0,to=null;function mb(e,t){if(ul===null){var n=ul=[];dh=0,co=Rm(),to={status:"pending",value:void 0,then:function(i){n.push(i)}}}return dh++,t.then(U0,U0),t}function U0(){if(--dh===0&&ul!==null){to!==null&&(to.status="fulfilled");var e=ul;ul=null,co=0,to=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function gb(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var L0=se.S;se.S=function(e,t){sS=mi(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&mb(e,t),L0!==null&&L0(e,t)};var Zs=fa(null);function im(){var e=Zs.current;return e!==null?e:Qe.pooledCache}function Jc(e,t){t===null?tn(Zs,Zs.current):tn(Zs,t.pool)}function q_(){var e=im();return e===null?null:{parent:_n._currentValue,pool:e}}var Ro=Error(mt(460)),am=Error(mt(474)),ff=Error(mt(542)),Au={then:function(){}};function O0(e){return e=e.status,e==="fulfilled"||e==="rejected"}function Y_(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Da,Da),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,z0(e),e;default:if(typeof t.status=="string")t.then(Da,Da);else{if(e=Qe,e!==null&&100<e.shellSuspendCounter)throw Error(mt(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,z0(e),e}throw js=t,Ro}}function Fs(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(js=n,Ro):n}}var js=null;function P0(){if(js===null)throw Error(mt(459));var e=js;return js=null,e}function z0(e){if(e===Ro||e===ff)throw Error(mt(483))}var eo=null,Rl=0;function lc(e){var t=Rl;return Rl+=1,eo===null&&(eo=[]),Y_(eo,e,t)}function Io(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function cc(e,t){throw t.$$typeof===nM?Error(mt(525)):(e=Object.prototype.toString.call(t),Error(mt(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Z_(e){function t(f,v){if(e){var M=f.deletions;M===null?(f.deletions=[v],f.flags|=16):M.push(v)}}function n(f,v){if(!e)return null;for(;v!==null;)t(f,v),v=v.sibling;return null}function i(f){for(var v=new Map;f!==null;)f.key!==null?v.set(f.key,f):v.set(f.index,f),f=f.sibling;return v}function a(f,v){return f=La(f,v),f.index=0,f.sibling=null,f}function s(f,v,M){return f.index=M,e?(M=f.alternate,M!==null?(M=M.index,M<v?(f.flags|=67108866,v):M):(f.flags|=67108866,v)):(f.flags|=1048576,v)}function r(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function o(f,v,M,S){return v===null||v.tag!==6?(v=Hf(M,f.mode,S),v.return=f,v):(v=a(v,M),v.return=f,v)}function l(f,v,M,S){var U=M.type;return U===zr?d(f,v,M.props.children,S,M.key):v!==null&&(v.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===ts&&Fs(U)===v.type)?(v=a(v,M.props),Io(v,M),v.return=f,v):(v=Qc(M.type,M.key,M.props,null,f.mode,S),Io(v,M),v.return=f,v)}function c(f,v,M,S){return v===null||v.tag!==4||v.stateNode.containerInfo!==M.containerInfo||v.stateNode.implementation!==M.implementation?(v=Gf(M,f.mode,S),v.return=f,v):(v=a(v,M.children||[]),v.return=f,v)}function d(f,v,M,S,U){return v===null||v.tag!==7?(v=Ys(M,f.mode,S,U),v.return=f,v):(v=a(v,M),v.return=f,v)}function h(f,v,M){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Hf(""+v,f.mode,M),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ec:return M=Qc(v.type,v.key,v.props,null,f.mode,M),Io(M,v),M.return=f,M;case Jo:return v=Gf(v,f.mode,M),v.return=f,v;case ts:return v=Fs(v),h(f,v,M)}if($o(v)||Oo(v))return v=Ys(v,f.mode,M,null),v.return=f,v;if(typeof v.then=="function")return h(f,lc(v),M);if(v.$$typeof===wa)return h(f,oc(f,v),M);cc(f,v)}return null}function u(f,v,M,S){var U=v!==null?v.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return U!==null?null:o(f,v,""+M,S);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case ec:return M.key===U?l(f,v,M,S):null;case Jo:return M.key===U?c(f,v,M,S):null;case ts:return M=Fs(M),u(f,v,M,S)}if($o(M)||Oo(M))return U!==null?null:d(f,v,M,S,null);if(typeof M.then=="function")return u(f,v,lc(M),S);if(M.$$typeof===wa)return u(f,v,oc(f,M),S);cc(f,M)}return null}function p(f,v,M,S,U){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return f=f.get(M)||null,o(v,f,""+S,U);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ec:return f=f.get(S.key===null?M:S.key)||null,l(v,f,S,U);case Jo:return f=f.get(S.key===null?M:S.key)||null,c(v,f,S,U);case ts:return S=Fs(S),p(f,v,M,S,U)}if($o(S)||Oo(S))return f=f.get(M)||null,d(v,f,S,U,null);if(typeof S.then=="function")return p(f,v,M,lc(S),U);if(S.$$typeof===wa)return p(f,v,M,oc(v,S),U);cc(v,S)}return null}function g(f,v,M,S){for(var U=null,C=null,E=v,_=v=0,w=null;E!==null&&_<M.length;_++){E.index>_?(w=E,E=null):w=E.sibling;var D=u(f,E,M[_],S);if(D===null){E===null&&(E=w);break}e&&E&&D.alternate===null&&t(f,E),v=s(D,v,_),C===null?U=D:C.sibling=D,C=D,E=w}if(_===M.length)return n(f,E),Ne&&Aa(f,_),U;if(E===null){for(;_<M.length;_++)E=h(f,M[_],S),E!==null&&(v=s(E,v,_),C===null?U=E:C.sibling=E,C=E);return Ne&&Aa(f,_),U}for(E=i(E);_<M.length;_++)w=p(E,f,_,M[_],S),w!==null&&(e&&w.alternate!==null&&E.delete(w.key===null?_:w.key),v=s(w,v,_),C===null?U=w:C.sibling=w,C=w);return e&&E.forEach(function(L){return t(f,L)}),Ne&&Aa(f,_),U}function y(f,v,M,S){if(M==null)throw Error(mt(151));for(var U=null,C=null,E=v,_=v=0,w=null,D=M.next();E!==null&&!D.done;_++,D=M.next()){E.index>_?(w=E,E=null):w=E.sibling;var L=u(f,E,D.value,S);if(L===null){E===null&&(E=w);break}e&&E&&L.alternate===null&&t(f,E),v=s(L,v,_),C===null?U=L:C.sibling=L,C=L,E=w}if(D.done)return n(f,E),Ne&&Aa(f,_),U;if(E===null){for(;!D.done;_++,D=M.next())D=h(f,D.value,S),D!==null&&(v=s(D,v,_),C===null?U=D:C.sibling=D,C=D);return Ne&&Aa(f,_),U}for(E=i(E);!D.done;_++,D=M.next())D=p(E,f,_,D.value,S),D!==null&&(e&&D.alternate!==null&&E.delete(D.key===null?_:D.key),v=s(D,v,_),C===null?U=D:C.sibling=D,C=D);return e&&E.forEach(function(I){return t(f,I)}),Ne&&Aa(f,_),U}function m(f,v,M,S){if(typeof M=="object"&&M!==null&&M.type===zr&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case ec:t:{for(var U=M.key;v!==null;){if(v.key===U){if(U=M.type,U===zr){if(v.tag===7){n(f,v.sibling),S=a(v,M.props.children),S.return=f,f=S;break t}}else if(v.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===ts&&Fs(U)===v.type){n(f,v.sibling),S=a(v,M.props),Io(S,M),S.return=f,f=S;break t}n(f,v);break}else t(f,v);v=v.sibling}M.type===zr?(S=Ys(M.props.children,f.mode,S,M.key),S.return=f,f=S):(S=Qc(M.type,M.key,M.props,null,f.mode,S),Io(S,M),S.return=f,f=S)}return r(f);case Jo:t:{for(U=M.key;v!==null;){if(v.key===U)if(v.tag===4&&v.stateNode.containerInfo===M.containerInfo&&v.stateNode.implementation===M.implementation){n(f,v.sibling),S=a(v,M.children||[]),S.return=f,f=S;break t}else{n(f,v);break}else t(f,v);v=v.sibling}S=Gf(M,f.mode,S),S.return=f,f=S}return r(f);case ts:return M=Fs(M),m(f,v,M,S)}if($o(M))return g(f,v,M,S);if(Oo(M)){if(U=Oo(M),typeof U!="function")throw Error(mt(150));return M=U.call(M),y(f,v,M,S)}if(typeof M.then=="function")return m(f,v,lc(M),S);if(M.$$typeof===wa)return m(f,v,oc(f,M),S);cc(f,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,v!==null&&v.tag===6?(n(f,v.sibling),S=a(v,M),S.return=f,f=S):(n(f,v),S=Hf(M,f.mode,S),S.return=f,f=S),r(f)):n(f,v)}return function(f,v,M,S){try{Rl=0;var U=m(f,v,M,S);return eo=null,U}catch(E){if(E===Ro||E===ff)throw E;var C=hi(29,E,null,f.mode);return C.lanes=S,C.return=f,C}finally{}}}var tr=Z_(!0),j_=Z_(!1),es=!1;function sm(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function hh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function gs(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function vs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,Fe&2){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=bu(e),H_(e,null,n),t}return uf(e,i,t,n),bu(e)}function fl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,h_(e,n)}}function kf(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var ph=!1;function dl(){if(ph){var e=to;if(e!==null)throw e}}function hl(e,t,n,i){ph=!1;var a=e.updateQueue;es=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=a.baseState;r=0,d=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(Re&u)===u:(i&u)===u){u!==0&&u===co&&(ph=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,y=o;u=t;var m=n;switch(y.tag){case 1:if(g=y.payload,typeof g=="function"){h=g.call(m,h,u);break t}h=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=y.payload,u=typeof g=="function"?g.call(m,h,u):g,u==null)break t;h=on({},h,u);break t;case 2:es=!0}}u=o.callback,u!==null&&(e.flags|=64,p&&(e.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);d===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,s===null&&(a.shared.lanes=0),As|=r,e.lanes=r,e.memoizedState=h}}function K_(e,t){if(typeof e!="function")throw Error(mt(191,e));e.call(t)}function Q_(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)K_(n[e],t)}var uo=fa(null),Ru=fa(0);function I0(e,t){e=Va,tn(Ru,e),tn(uo,t),Va=e|t.baseLanes}function mh(){tn(Ru,Va),tn(uo,uo.current)}function rm(){Va=Ru.current,wn(uo),wn(Ru)}var Si=fa(null),zi=null;function is(e){var t=e.alternate;tn(dn,dn.current&1),tn(Si,e),zi===null&&(t===null||uo.current!==null||t.memoizedState!==null)&&(zi=e)}function gh(e){tn(dn,dn.current),tn(Si,e),zi===null&&(zi=e)}function J_(e){e.tag===22?(tn(dn,dn.current),tn(Si,e),zi===null&&(zi=e)):as()}function as(){tn(dn,dn.current),tn(Si,Si.current)}function di(e){wn(Si),zi===e&&(zi=null),wn(dn)}var dn=fa(0);function Cu(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Ph(n)||zh(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fa=0,pe=null,Ke=null,gn=null,wu=!1,no=!1,er=!1,Du=0,Cl=0,io=null,vb=0;function cn(){throw Error(mt(321))}function om(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!xi(e[n],t[n]))return!1;return!0}function lm(e,t,n,i,a,s){return Fa=s,pe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,se.H=e===null||e.memoizedState===null?wx:xm,er=!1,s=n(i,a),er=!1,no&&(s=tx(t,n,i,a)),$_(e),s}function $_(e){se.H=wl;var t=Ke!==null&&Ke.next!==null;if(Fa=0,gn=Ke=pe=null,wu=!1,Cl=0,io=null,t)throw Error(mt(300));e===null||xn||(e=e.dependencies,e!==null&&Tu(e)&&(xn=!0))}function tx(e,t,n,i){pe=e;var a=0;do{if(no&&(io=null),Cl=0,no=!1,25<=a)throw Error(mt(301));if(a+=1,gn=Ke=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}se.H=Dx,s=t(n,i)}while(no);return s}function _b(){var e=se.H,t=e.useState()[0];return t=typeof t.then=="function"?ql(t):t,e=e.useState()[0],(Ke!==null?Ke.memoizedState:null)!==e&&(pe.flags|=1024),t}function cm(){var e=Du!==0;return Du=0,e}function um(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function fm(e){if(wu){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}wu=!1}Fa=0,gn=Ke=pe=null,no=!1,Cl=Du=0,io=null}function qn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?pe.memoizedState=gn=e:gn=gn.next=e,gn}function pn(){if(Ke===null){var e=pe.alternate;e=e!==null?e.memoizedState:null}else e=Ke.next;var t=gn===null?pe.memoizedState:gn.next;if(t!==null)gn=t,Ke=e;else{if(e===null)throw pe.alternate===null?Error(mt(467)):Error(mt(310));Ke=e,e={memoizedState:Ke.memoizedState,baseState:Ke.baseState,baseQueue:Ke.baseQueue,queue:Ke.queue,next:null},gn===null?pe.memoizedState=gn=e:gn=gn.next=e}return gn}function df(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ql(e){var t=Cl;return Cl+=1,io===null&&(io=[]),e=Y_(io,e,t),t=pe,(gn===null?t.memoizedState:gn.next)===null&&(t=t.alternate,se.H=t===null||t.memoizedState===null?wx:xm),e}function hf(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ql(e);if(e.$$typeof===wa)return zn(e)}throw Error(mt(438,String(e)))}function dm(e){var t=null,n=pe.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=pe.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=df(),pe.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=iM;return t.index++,n}function Ha(e,t){return typeof t=="function"?t(e):t}function $c(e){var t=pn();return hm(t,Ke,e)}function hm(e,t,n){var i=e.queue;if(i===null)throw Error(mt(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,d=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(Re&h)===h:(Fa&h)===h){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===co&&(d=!0);else if((Fa&u)===u){c=c.next,u===co&&(d=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=s):l=l.next=h,pe.lanes|=u,As|=u;h=c.action,er&&n(s,h),s=c.hasEagerState?c.eagerState:n(s,h)}else u={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,pe.lanes|=h,As|=h;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!xi(s,e.memoizedState)&&(xn=!0,d&&(n=to,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Xf(e){var t=pn(),n=t.queue;if(n===null)throw Error(mt(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);xi(s,t.memoizedState)||(xn=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function ex(e,t,n){var i=pe,a=pn(),s=Ne;if(s){if(n===void 0)throw Error(mt(407));n=n()}else n=t();var r=!xi((Ke||a).memoizedState,n);if(r&&(a.memoizedState=n,xn=!0),a=a.queue,pm(ax.bind(null,i,a,e),[e]),a.getSnapshot!==t||r||gn!==null&&gn.memoizedState.tag&1){if(i.flags|=2048,fo(9,{destroy:void 0},ix.bind(null,i,a,n,t),null),Qe===null)throw Error(mt(349));s||Fa&127||nx(i,t,n)}return n}function nx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=pe.updateQueue,t===null?(t=df(),pe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function ix(e,t,n,i){t.value=n,t.getSnapshot=i,sx(t)&&rx(e)}function ax(e,t,n){return n(function(){sx(t)&&rx(e)})}function sx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!xi(e,n)}catch{return!0}}function rx(e){var t=ur(e,2);t!==null&&ai(t,e,2)}function vh(e){var t=qn();if(typeof e=="function"){var n=e;if(e=n(),er){os(!0);try{n()}finally{os(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:e},t}function ox(e,t,n,i){return e.baseState=n,hm(e,Ke,typeof i=="function"?i:Ha)}function xb(e,t,n,i,a){if(mf(e))throw Error(mt(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};se.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,lx(t,s)):(s.next=n.next,t.pending=n.next=s)}}function lx(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=se.T,r={};se.T=r;try{var o=n(a,i),l=se.S;l!==null&&l(r,o),B0(e,t,o)}catch(c){_h(e,t,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),se.T=s}}else try{s=n(a,i),B0(e,t,s)}catch(c){_h(e,t,c)}}function B0(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){F0(e,t,i)},function(i){return _h(e,t,i)}):F0(e,t,n)}function F0(e,t,n){t.status="fulfilled",t.value=n,cx(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,lx(e,n)))}function _h(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,cx(t),t=t.next;while(t!==i)}e.action=null}function cx(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function ux(e,t){return t}function H0(e,t){if(Ne){var n=Qe.formState;if(n!==null){t:{var i=pe;if(Ne){if(sn){e:{for(var a=sn,s=Li;a.nodeType!==8;){if(!s){a=null;break e}if(a=Ii(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){sn=Ii(a.nextSibling),i=a.data==="F!";break t}}Es(i)}i=!1}i&&(t=n[0])}}return n=qn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ux,lastRenderedState:t},n.queue=i,n=Ax.bind(null,pe,i),i.dispatch=n,i=vh(!1),s=_m.bind(null,pe,!1,i.queue),i=qn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=xb.bind(null,pe,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function G0(e){var t=pn();return fx(t,Ke,e)}function fx(e,t,n){if(t=hm(e,t,ux)[0],e=$c(Ha)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=ql(t)}catch(r){throw r===Ro?ff:r}else i=t;t=pn();var a=t.queue,s=a.dispatch;return n!==t.memoizedState&&(pe.flags|=2048,fo(9,{destroy:void 0},Sb.bind(null,a,n),null)),[i,s,e]}function Sb(e,t){e.action=t}function V0(e){var t=pn(),n=Ke;if(n!==null)return fx(t,n,e);pn(),t=t.memoizedState,n=pn();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function fo(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=pe.updateQueue,t===null&&(t=df(),pe.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function dx(){return pn().memoizedState}function tu(e,t,n,i){var a=qn();pe.flags|=e,a.memoizedState=fo(1|t,{destroy:void 0},n,i===void 0?null:i)}function pf(e,t,n,i){var a=pn();i=i===void 0?null:i;var s=a.memoizedState.inst;Ke!==null&&i!==null&&om(i,Ke.memoizedState.deps)?a.memoizedState=fo(t,s,n,i):(pe.flags|=e,a.memoizedState=fo(1|t,s,n,i))}function k0(e,t){tu(8390656,8,e,t)}function pm(e,t){pf(2048,8,e,t)}function yb(e){pe.flags|=4;var t=pe.updateQueue;if(t===null)t=df(),pe.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function hx(e){var t=pn().memoizedState;return yb({ref:t,nextImpl:e}),function(){if(Fe&2)throw Error(mt(440));return t.impl.apply(void 0,arguments)}}function px(e,t){return pf(4,2,e,t)}function mx(e,t){return pf(4,4,e,t)}function gx(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function vx(e,t,n){n=n!=null?n.concat([e]):null,pf(4,4,gx.bind(null,t,e),n)}function mm(){}function _x(e,t){var n=pn();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&om(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function xx(e,t){var n=pn();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&om(t,i[1]))return i[0];if(i=e(),er){os(!0);try{e()}finally{os(!1)}}return n.memoizedState=[i,t],i}function gm(e,t,n){return n===void 0||Fa&1073741824&&!(Re&261930)?e.memoizedState=t:(e.memoizedState=n,e=oS(),pe.lanes|=e,As|=e,n)}function Sx(e,t,n,i){return xi(n,t)?n:uo.current!==null?(e=gm(e,n,i),xi(e,t)||(xn=!0),e):!(Fa&42)||Fa&1073741824&&!(Re&261930)?(xn=!0,e.memoizedState=n):(e=oS(),pe.lanes|=e,As|=e,t)}function yx(e,t,n,i,a){var s=He.p;He.p=s!==0&&8>s?s:8;var r=se.T,o={};se.T=o,_m(e,!1,t,n);try{var l=a(),c=se.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=gb(l,i);pl(e,t,d,_i(e))}else pl(e,t,i,_i(e))}catch(h){pl(e,t,{then:function(){},status:"rejected",reason:h},_i())}finally{He.p=s,r!==null&&o.types!==null&&(r.types=o.types),se.T=r}}function Mb(){}function xh(e,t,n,i){if(e.tag!==5)throw Error(mt(476));var a=Mx(e).queue;yx(e,a,t,qs,n===null?Mb:function(){return bx(e),n(i)})}function Mx(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:qs,baseState:qs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:qs},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function bx(e){var t=Mx(e);t.next===null&&(t=e.alternate.memoizedState),pl(e,t.next.queue,{},_i())}function vm(){return zn(Ul)}function Ex(){return pn().memoizedState}function Tx(){return pn().memoizedState}function bb(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=_i();e=gs(n);var i=vs(t,e,n);i!==null&&(ai(i,t,n),fl(i,t,n)),t={cache:nm()},e.payload=t;return}t=t.return}}function Eb(e,t,n){var i=_i();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mf(e)?Rx(t,n):(n=Jp(e,t,n,i),n!==null&&(ai(n,e,i),Cx(n,t,i)))}function Ax(e,t,n){var i=_i();pl(e,t,n,i)}function pl(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(mf(e))Rx(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,xi(o,r))return uf(e,t,a,0),Qe===null&&cf(),!1}catch{}finally{}if(n=Jp(e,t,a,i),n!==null)return ai(n,e,i),Cx(n,t,i),!0}return!1}function _m(e,t,n,i){if(i={lane:2,revertLane:Rm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},mf(e)){if(t)throw Error(mt(479))}else t=Jp(e,n,i,2),t!==null&&ai(t,e,2)}function mf(e){var t=e.alternate;return e===pe||t!==null&&t===pe}function Rx(e,t){no=wu=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Cx(e,t,n){if(n&4194048){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,h_(e,n)}}var wl={readContext:zn,use:hf,useCallback:cn,useContext:cn,useEffect:cn,useImperativeHandle:cn,useLayoutEffect:cn,useInsertionEffect:cn,useMemo:cn,useReducer:cn,useRef:cn,useState:cn,useDebugValue:cn,useDeferredValue:cn,useTransition:cn,useSyncExternalStore:cn,useId:cn,useHostTransitionStatus:cn,useFormState:cn,useActionState:cn,useOptimistic:cn,useMemoCache:cn,useCacheRefresh:cn};wl.useEffectEvent=cn;var wx={readContext:zn,use:hf,useCallback:function(e,t){return qn().memoizedState=[e,t===void 0?null:t],e},useContext:zn,useEffect:k0,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,tu(4194308,4,gx.bind(null,t,e),n)},useLayoutEffect:function(e,t){return tu(4194308,4,e,t)},useInsertionEffect:function(e,t){tu(4,2,e,t)},useMemo:function(e,t){var n=qn();t=t===void 0?null:t;var i=e();if(er){os(!0);try{e()}finally{os(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=qn();if(n!==void 0){var a=n(t);if(er){os(!0);try{n(t)}finally{os(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=Eb.bind(null,pe,e),[i.memoizedState,e]},useRef:function(e){var t=qn();return e={current:e},t.memoizedState=e},useState:function(e){e=vh(e);var t=e.queue,n=Ax.bind(null,pe,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:mm,useDeferredValue:function(e,t){var n=qn();return gm(n,e,t)},useTransition:function(){var e=vh(!1);return e=yx.bind(null,pe,e.queue,!0,!1),qn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=pe,a=qn();if(Ne){if(n===void 0)throw Error(mt(407));n=n()}else{if(n=t(),Qe===null)throw Error(mt(349));Re&127||nx(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,k0(ax.bind(null,i,s,e),[e]),i.flags|=2048,fo(9,{destroy:void 0},ix.bind(null,i,s,n,t),null),n},useId:function(){var e=qn(),t=Qe.identifierPrefix;if(Ne){var n=aa,i=ia;n=(i&~(1<<32-vi(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Du++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=vb++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:vm,useFormState:H0,useActionState:H0,useOptimistic:function(e){var t=qn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=_m.bind(null,pe,!0,n),n.dispatch=t,[e,t]},useMemoCache:dm,useCacheRefresh:function(){return qn().memoizedState=bb.bind(null,pe)},useEffectEvent:function(e){var t=qn(),n={impl:e};return t.memoizedState=n,function(){if(Fe&2)throw Error(mt(440));return n.impl.apply(void 0,arguments)}}},xm={readContext:zn,use:hf,useCallback:_x,useContext:zn,useEffect:pm,useImperativeHandle:vx,useInsertionEffect:px,useLayoutEffect:mx,useMemo:xx,useReducer:$c,useRef:dx,useState:function(){return $c(Ha)},useDebugValue:mm,useDeferredValue:function(e,t){var n=pn();return Sx(n,Ke.memoizedState,e,t)},useTransition:function(){var e=$c(Ha)[0],t=pn().memoizedState;return[typeof e=="boolean"?e:ql(e),t]},useSyncExternalStore:ex,useId:Ex,useHostTransitionStatus:vm,useFormState:G0,useActionState:G0,useOptimistic:function(e,t){var n=pn();return ox(n,Ke,e,t)},useMemoCache:dm,useCacheRefresh:Tx};xm.useEffectEvent=hx;var Dx={readContext:zn,use:hf,useCallback:_x,useContext:zn,useEffect:pm,useImperativeHandle:vx,useInsertionEffect:px,useLayoutEffect:mx,useMemo:xx,useReducer:Xf,useRef:dx,useState:function(){return Xf(Ha)},useDebugValue:mm,useDeferredValue:function(e,t){var n=pn();return Ke===null?gm(n,e,t):Sx(n,Ke.memoizedState,e,t)},useTransition:function(){var e=Xf(Ha)[0],t=pn().memoizedState;return[typeof e=="boolean"?e:ql(e),t]},useSyncExternalStore:ex,useId:Ex,useHostTransitionStatus:vm,useFormState:V0,useActionState:V0,useOptimistic:function(e,t){var n=pn();return Ke!==null?ox(n,Ke,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:dm,useCacheRefresh:Tx};Dx.useEffectEvent=hx;function Wf(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:on({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Sh={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=_i(),a=gs(i);a.payload=t,n!=null&&(a.callback=n),t=vs(e,a,i),t!==null&&(ai(t,e,i),fl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=_i(),a=gs(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=vs(e,a,i),t!==null&&(ai(t,e,i),fl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=_i(),i=gs(n);i.tag=2,t!=null&&(i.callback=t),t=vs(e,i,n),t!==null&&(ai(t,e,n),fl(t,e,n))}};function X0(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!El(n,i)||!El(a,s):!0}function W0(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Sh.enqueueReplaceState(t,t.state,null)}function nr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=on({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function Nx(e){Mu(e)}function Ux(e){console.error(e)}function Lx(e){Mu(e)}function Nu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function q0(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function yh(e,t,n){return n=gs(n),n.tag=3,n.payload={element:null},n.callback=function(){Nu(e,t)},n}function Ox(e){return e=gs(e),e.tag=3,e}function Px(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){q0(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){q0(t,n,i),typeof a!="function"&&(_s===null?_s=new Set([this]):_s.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Tb(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ao(t,n,a,!0),n=Si.current,n!==null){switch(n.tag){case 31:case 13:return zi===null?zu():n.alternate===null&&un===0&&(un=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Au?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),nd(e,i,a)),!1;case 22:return n.flags|=65536,i===Au?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),nd(e,i,a)),!1}throw Error(mt(435,n.tag))}return nd(e,i,a),zu(),!1}if(Ne)return t=Si.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==lh&&(e=Error(mt(422),{cause:i}),Al(Ui(e,n)))):(i!==lh&&(t=Error(mt(423),{cause:i}),Al(Ui(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=Ui(i,n),a=yh(e.stateNode,i,a),kf(e,a),un!==4&&(un=2)),!1;var s=Error(mt(520),{cause:i});if(s=Ui(s,n),vl===null?vl=[s]:vl.push(s),un!==4&&(un=2),t===null)return!0;i=Ui(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=yh(n.stateNode,i,e),kf(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(_s===null||!_s.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ox(a),Px(a,e,n,i),kf(n,a),!1}n=n.return}while(n!==null);return!1}var Sm=Error(mt(461)),xn=!1;function Ln(e,t,n,i){t.child=e===null?j_(t,null,n,i):tr(t,e.child,n,i)}function Y0(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return $s(t),i=lm(e,t,n,r,s,a),o=cm(),e!==null&&!xn?(um(e,t,a),Ga(e,t,a)):(Ne&&o&&tm(t),t.flags|=1,Ln(e,t,i,a),t.child)}function Z0(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!$p(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,zx(e,t,s,i,a)):(e=Qc(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!ym(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:El,n(r,i)&&e.ref===t.ref)return Ga(e,t,a)}return t.flags|=1,e=La(s,i),e.ref=t.ref,e.return=t,t.child=e}function zx(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(El(s,i)&&e.ref===t.ref)if(xn=!1,t.pendingProps=i=s,ym(e,a))e.flags&131072&&(xn=!0);else return t.lanes=e.lanes,Ga(e,t,a)}return Mh(e,t,n,i,a)}function Ix(e,t,n,i){var a=i.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(t.flags&128){if(s=s!==null?s.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,t.child=null;return j0(e,t,s,n,i)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Jc(t,s!==null?s.cachePool:null),s!==null?I0(t,s):mh(),J_(t);else return i=t.lanes=536870912,j0(e,t,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Jc(t,s.cachePool),I0(t,s),as(),t.memoizedState=null):(e!==null&&Jc(t,null),mh(),as());return Ln(e,t,a,n),t.child}function el(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function j0(e,t,n,i,a){var s=im();return s=s===null?null:{parent:_n._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&Jc(t,null),mh(),J_(t),e!==null&&Ao(e,t,i,!0),t.childLanes=a,null}function eu(e,t){return t=Uu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function K0(e,t,n){return tr(t,e.child,null,n),e=eu(t,t.pendingProps),e.flags|=2,di(t),t.memoizedState=null,e}function Ab(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Ne){if(i.mode==="hidden")return e=eu(t,i),t.lanes=536870912,el(null,e);if(gh(t),(e=sn)?(e=wS(e,Li),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=V_(e),n.return=t,t.child=n,Pn=t,sn=null)):e=null,e===null)throw Es(t);return t.lanes=536870912,null}return eu(t,i)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(gh(t),a)if(t.flags&256)t.flags&=-257,t=K0(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(mt(558));else if(xn||Ao(e,t,n,!1),a=(n&e.childLanes)!==0,xn||a){if(i=Qe,i!==null&&(r=p_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,ur(e,r),ai(i,e,r),Sm;zu(),t=K0(e,t,n)}else e=s.treeContext,sn=Ii(r.nextSibling),Pn=t,Ne=!0,ms=null,Li=!1,e!==null&&X_(t,e),t=eu(t,i),t.flags|=4096;return t}return e=La(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function nu(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(mt(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Mh(e,t,n,i,a){return $s(t),n=lm(e,t,n,i,void 0,a),i=cm(),e!==null&&!xn?(um(e,t,a),Ga(e,t,a)):(Ne&&i&&tm(t),t.flags|=1,Ln(e,t,n,a),t.child)}function Q0(e,t,n,i,a,s){return $s(t),t.updateQueue=null,n=tx(t,i,n,a),$_(e),i=cm(),e!==null&&!xn?(um(e,t,s),Ga(e,t,s)):(Ne&&i&&tm(t),t.flags|=1,Ln(e,t,n,s),t.child)}function J0(e,t,n,i,a){if($s(t),t.stateNode===null){var s=Xr,r=n.contextType;typeof r=="object"&&r!==null&&(s=zn(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Sh,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},sm(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?zn(r):Xr,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Wf(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&Sh.enqueueReplaceState(s,s.state,null),hl(t,i,s,a),dl(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=nr(n,o);s.props=l;var c=s.context,d=n.contextType;r=Xr,typeof d=="object"&&d!==null&&(r=zn(d));var h=n.getDerivedStateFromProps;d=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&W0(t,s,i,r),es=!1;var u=t.memoizedState;s.state=u,hl(t,i,s,a),dl(),c=t.memoizedState,o||u!==c||es?(typeof h=="function"&&(Wf(t,n,h,i),c=t.memoizedState),(l=es||X0(t,n,l,i,u,c,r))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,hh(e,t),r=t.memoizedProps,d=nr(n,r),s.props=d,h=t.pendingProps,u=s.context,c=n.contextType,l=Xr,typeof c=="object"&&c!==null&&(l=zn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==h||u!==l)&&W0(t,s,i,l),es=!1,u=t.memoizedState,s.state=u,hl(t,i,s,a),dl();var p=t.memoizedState;r!==h||u!==p||es||e!==null&&e.dependencies!==null&&Tu(e.dependencies)?(typeof o=="function"&&(Wf(t,n,o,i),p=t.memoizedState),(d=es||X0(t,n,d,i,u,p,l)||e!==null&&e.dependencies!==null&&Tu(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),s.props=i,s.state=p,s.context=l,i=d):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,nu(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=tr(t,e.child,null,a),t.child=tr(t,null,n,a)):Ln(e,t,n,a),t.memoizedState=s.state,e=t.child):e=Ga(e,t,a),e}function $0(e,t,n,i){return Js(),t.flags|=256,Ln(e,t,n,i),t.child}var qf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(e){return{baseLanes:e,cachePool:q_()}}function Zf(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=pi),e}function Bx(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(dn.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Ne){if(a?is(t):as(),(e=sn)?(e=wS(e,Li),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=V_(e),n.return=t,t.child=n,Pn=t,sn=null)):e=null,e===null)throw Es(t);return zh(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(as(),a=t.mode,o=Uu({mode:"hidden",children:o},a),i=Ys(i,a,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=Yf(n),i.childLanes=Zf(e,r,n),t.memoizedState=qf,el(null,i)):(is(t),bh(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)t.flags&256?(is(t),t.flags&=-257,t=jf(e,t,n)):t.memoizedState!==null?(as(),t.child=e.child,t.flags|=128,t=null):(as(),o=i.fallback,a=t.mode,i=Uu({mode:"visible",children:i.children},a),o=Ys(o,a,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,tr(t,e.child,null,n),i=t.child,i.memoizedState=Yf(n),i.childLanes=Zf(e,r,n),t.memoizedState=qf,t=el(null,i));else if(is(t),zh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(mt(419)),i.stack="",i.digest=r,Al({value:i,source:null,stack:null}),t=jf(e,t,n)}else if(xn||Ao(e,t,n,!1),r=(n&e.childLanes)!==0,xn||r){if(r=Qe,r!==null&&(i=p_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,ur(e,i),ai(r,e,i),Sm;Ph(o)||zu(),t=jf(e,t,n)}else Ph(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,sn=Ii(o.nextSibling),Pn=t,Ne=!0,ms=null,Li=!1,e!==null&&X_(t,e),t=bh(t,i.children),t.flags|=4096);return t}return a?(as(),o=i.fallback,a=t.mode,l=e.child,c=l.sibling,i=La(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=La(c,o):(o=Ys(o,a,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,el(null,i),i=t.child,o=e.child.memoizedState,o===null?o=Yf(n):(a=o.cachePool,a!==null?(l=_n._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=q_(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Zf(e,r,n),t.memoizedState=qf,el(e.child,i)):(is(t),n=e.child,e=n.sibling,n=La(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function bh(e,t){return t=Uu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Uu(e,t){return e=hi(22,e,null,t),e.lanes=0,e}function jf(e,t,n){return tr(t,e.child,null,n),e=bh(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function tg(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),uh(e.return,t,n)}function Kf(e,t,n,i,a,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function Fx(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=dn.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,tn(dn,r),Ln(e,t,i,n),i=Ne?Tl:0,!o&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tg(e,n,t);else if(e.tag===19)tg(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&Cu(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Kf(t,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&Cu(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Kf(t,!0,n,null,s,i);break;case"together":Kf(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Ga(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),As|=t.lanes,!(n&t.childLanes))if(e!==null){if(Ao(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(mt(153));if(t.child!==null){for(e=t.child,n=La(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=La(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function ym(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Tu(e)))}function Rb(e,t,n){switch(t.tag){case 3:_u(t,t.stateNode.containerInfo),ns(t,_n,e.memoizedState.cache),Js();break;case 27:case 5:Qd(t);break;case 4:_u(t,t.stateNode.containerInfo);break;case 10:ns(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,gh(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(is(t),t.flags|=128,null):n&t.child.childLanes?Bx(e,t,n):(is(t),e=Ga(e,t,n),e!==null?e.sibling:null);is(t);break;case 19:var a=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Ao(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return Fx(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),tn(dn,dn.current),i)break;return null;case 22:return t.lanes=0,Ix(e,t,n,t.pendingProps);case 24:ns(t,_n,e.memoizedState.cache)}return Ga(e,t,n)}function Hx(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)xn=!0;else{if(!ym(e,n)&&!(t.flags&128))return xn=!1,Rb(e,t,n);xn=!!(e.flags&131072)}else xn=!1,Ne&&t.flags&1048576&&k_(t,Tl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Fs(t.elementType),t.type=e,typeof e=="function")$p(e)?(i=nr(e,i),t.tag=1,t=J0(null,t,e,i,n)):(t.tag=0,t=Mh(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===Fp){t.tag=11,t=Y0(null,t,e,i,n);break t}else if(a===Hp){t.tag=14,t=Z0(null,t,e,i,n);break t}}throw t=jd(e)||e,Error(mt(306,t,""))}}return t;case 0:return Mh(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=nr(i,t.pendingProps),J0(e,t,i,a,n);case 3:t:{if(_u(t,t.stateNode.containerInfo),e===null)throw Error(mt(387));i=t.pendingProps;var s=t.memoizedState;a=s.element,hh(e,t),hl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,ns(t,_n,i),i!==s.cache&&fh(t,[_n],n,!0),dl(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=$0(e,t,i,n);break t}else if(i!==a){a=Ui(Error(mt(424)),t),Al(a),t=$0(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(sn=Ii(e.firstChild),Pn=t,Ne=!0,ms=null,Li=!0,n=j_(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Js(),i===a){t=Ga(e,t,n);break t}Ln(e,t,i,n)}t=t.child}return t;case 26:return nu(e,t),e===null?(n=Sg(t.type,null,t.pendingProps,null))?t.memoizedState=n:Ne||(n=t.type,e=t.pendingProps,i=Hu(ps.current).createElement(n),i[On]=t,i[ri]=e,Fn(i,n,e),Rn(i),t.stateNode=i):t.memoizedState=Sg(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Qd(t),e===null&&Ne&&(i=t.stateNode=DS(t.type,t.pendingProps,ps.current),Pn=t,Li=!0,a=sn,ws(t.type)?(Ih=a,sn=Ii(i.firstChild)):sn=a),Ln(e,t,t.pendingProps.children,n),nu(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Ne&&((a=i=sn)&&(i=iE(i,t.type,t.pendingProps,Li),i!==null?(t.stateNode=i,Pn=t,sn=Ii(i.firstChild),Li=!1,a=!0):a=!1),a||Es(t)),Qd(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Lh(a,s)?i=null:r!==null&&Lh(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=lm(e,t,_b,null,null,n),Ul._currentValue=a),nu(e,t),Ln(e,t,i,n),t.child;case 6:return e===null&&Ne&&((e=n=sn)&&(n=aE(n,t.pendingProps,Li),n!==null?(t.stateNode=n,Pn=t,sn=null,e=!0):e=!1),e||Es(t)),null;case 13:return Bx(e,t,n);case 4:return _u(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=tr(t,null,i,n):Ln(e,t,i,n),t.child;case 11:return Y0(e,t,t.type,t.pendingProps,n);case 7:return Ln(e,t,t.pendingProps,n),t.child;case 8:return Ln(e,t,t.pendingProps.children,n),t.child;case 12:return Ln(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,ns(t,t.type,i.value),Ln(e,t,i.children,n),t.child;case 9:return a=t.type._context,i=t.pendingProps.children,$s(t),a=zn(a),i=i(a),t.flags|=1,Ln(e,t,i,n),t.child;case 14:return Z0(e,t,t.type,t.pendingProps,n);case 15:return zx(e,t,t.type,t.pendingProps,n);case 19:return Fx(e,t,n);case 31:return Ab(e,t,n);case 22:return Ix(e,t,n,t.pendingProps);case 24:return $s(t),i=zn(_n),e===null?(a=im(),a===null&&(a=Qe,s=nm(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},sm(t),ns(t,_n,a)):(e.lanes&n&&(hh(e,t),hl(t,null,null,n),dl()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ns(t,_n,i)):(i=s.cache,ns(t,_n,i),i!==a.cache&&fh(t,[_n],n,!0))),Ln(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(mt(156,t.tag))}function ga(e){e.flags|=4}function Qf(e,t,n,i,a){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(uS())e.flags|=8192;else throw js=Au,am}else e.flags&=-16777217}function eg(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!LS(t))if(uS())e.flags|=8192;else throw js=Au,am}function uc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?f_():536870912,e.lanes|=t,ho|=t)}function Bo(e,t){if(!Ne)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function an(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function Cb(e,t,n){var i=t.pendingProps;switch(em(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(t),null;case 1:return an(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Oa(_n),ro(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(gr(t)?ga(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Vf())),an(t),null;case 26:var a=t.type,s=t.memoizedState;return e===null?(ga(t),s!==null?(an(t),eg(t,s)):(an(t),Qf(t,a,null,i,n))):s?s!==e.memoizedState?(ga(t),an(t),eg(t,s)):(an(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&ga(t),an(t),Qf(t,a,e,i,n)),null;case 27:if(xu(t),n=ps.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ga(t);else{if(!i){if(t.stateNode===null)throw Error(mt(166));return an(t),null}e=oa.current,gr(t)?D0(t):(e=DS(a,i,n),t.stateNode=e,ga(t))}return an(t),null;case 5:if(xu(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ga(t);else{if(!i){if(t.stateNode===null)throw Error(mt(166));return an(t),null}if(s=oa.current,gr(t))D0(t);else{var r=Hu(ps.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[On]=t,s[ri]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;t:switch(Fn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&ga(t)}}return an(t),Qf(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&ga(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(mt(166));if(e=ps.current,gr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=Pn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[On]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||AS(e.nodeValue,n)),e||Es(t,!0)}else e=Hu(e).createTextNode(i),e[On]=t,t.stateNode=e}return an(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=gr(t),n!==null){if(e===null){if(!i)throw Error(mt(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(mt(557));e[On]=t}else Js(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;an(t),e=!1}else n=Vf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(di(t),t):(di(t),null);if(t.flags&128)throw Error(mt(558))}return an(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=gr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(mt(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(mt(317));a[On]=t}else Js(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;an(t),a=!1}else a=Vf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(di(t),t):(di(t),null)}return di(t),t.flags&128?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),uc(t,t.updateQueue),an(t),null);case 4:return ro(),e===null&&Cm(t.stateNode.containerInfo),an(t),null;case 10:return Oa(t.type),an(t),null;case 19:if(wn(dn),i=t.memoizedState,i===null)return an(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)Bo(i,!1);else{if(un!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=Cu(e),s!==null){for(t.flags|=128,Bo(i,!1),e=s.updateQueue,t.updateQueue=e,uc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)G_(n,e),n=n.sibling;return tn(dn,dn.current&1|2),Ne&&Aa(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&mi()>Ou&&(t.flags|=128,a=!0,Bo(i,!1),t.lanes=4194304)}else{if(!a)if(e=Cu(s),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,uc(t,e),Bo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Ne)return an(t),null}else 2*mi()-i.renderingStartTime>Ou&&n!==536870912&&(t.flags|=128,a=!0,Bo(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(e=i.last,e!==null?e.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=mi(),e.sibling=null,n=dn.current,tn(dn,a?n&1|2:n&1),Ne&&Aa(t,i.treeForkCount),e):(an(t),null);case 22:case 23:return di(t),rm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?n&536870912&&!(t.flags&128)&&(an(t),t.subtreeFlags&6&&(t.flags|=8192)):an(t),n=t.updateQueue,n!==null&&uc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&wn(Zs),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Oa(_n),an(t),null;case 25:return null;case 30:return null}throw Error(mt(156,t.tag))}function wb(e,t){switch(em(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Oa(_n),ro(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return xu(t),null;case 31:if(t.memoizedState!==null){if(di(t),t.alternate===null)throw Error(mt(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(di(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(mt(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return wn(dn),null;case 4:return ro(),null;case 10:return Oa(t.type),null;case 22:case 23:return di(t),rm(),e!==null&&wn(Zs),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Oa(_n),null;case 25:return null;default:return null}}function Gx(e,t){switch(em(t),t.tag){case 3:Oa(_n),ro();break;case 26:case 27:case 5:xu(t);break;case 4:ro();break;case 31:t.memoizedState!==null&&di(t);break;case 13:di(t);break;case 19:wn(dn);break;case 10:Oa(t.type);break;case 22:case 23:di(t),rm(),e!==null&&wn(Zs);break;case 24:Oa(_n)}}function Yl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){Ye(t,t.return,o)}}function Ts(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(d){Ye(a,l,d)}}}i=i.next}while(i!==s)}}catch(d){Ye(t,t.return,d)}}function Vx(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Q_(t,n)}catch(i){Ye(e,e.return,i)}}}function kx(e,t,n){n.props=nr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){Ye(e,t,i)}}function ml(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(a){Ye(e,t,a)}}function sa(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){Ye(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Ye(e,t,a)}else n.current=null}function Xx(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){Ye(e,e.return,a)}}function Jf(e,t,n){try{var i=e.stateNode;Qb(i,e.type,n,t),i[ri]=t}catch(a){Ye(e,e.return,a)}}function Wx(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ws(e.type)||e.tag===4}function $f(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||Wx(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ws(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Eh(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Da));else if(i!==4&&(i===27&&ws(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Eh(e,t,n),e=e.sibling;e!==null;)Eh(e,t,n),e=e.sibling}function Lu(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&ws(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Lu(e,t,n),e=e.sibling;e!==null;)Lu(e,t,n),e=e.sibling}function qx(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);Fn(t,i,n),t[On]=e,t[ri]=n}catch(s){Ye(e,e.return,s)}}var Ra=!1,vn=!1,td=!1,ng=typeof WeakSet=="function"?WeakSet:Set,An=null;function Db(e,t){if(e=e.containerInfo,Nh=Xu,e=L_(e),Kp(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,d=0,h=e,u=null;e:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=r+a),h!==s||i!==0&&h.nodeType!==3||(l=r+i),h.nodeType===3&&(r+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===e)break e;if(u===n&&++c===a&&(o=r),u===s&&++d===i&&(l=r),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Uh={focusedElem:e,selectionRange:n},Xu=!1,An=t;An!==null;)if(t=An,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,An=e;else for(;An!==null;){switch(t=An,s=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&s!==null){e=void 0,n=t,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=nr(n.type,a);e=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=e}catch(y){Ye(n,n.return,y)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)Oh(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":Oh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(mt(163))}if(e=t.sibling,e!==null){e.return=t.return,An=e;break}An=t.return}}function Yx(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:_a(e,n),i&4&&Yl(5,n);break;case 1:if(_a(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){Ye(n,n.return,r)}else{var a=nr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){Ye(n,n.return,r)}}i&64&&Vx(n),i&512&&ml(n,n.return);break;case 3:if(_a(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Q_(e,t)}catch(r){Ye(n,n.return,r)}}break;case 27:t===null&&i&4&&qx(n);case 26:case 5:_a(e,n),t===null&&i&4&&Xx(n),i&512&&ml(n,n.return);break;case 12:_a(e,n);break;case 31:_a(e,n),i&4&&Kx(e,n);break;case 13:_a(e,n),i&4&&Qx(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Fb.bind(null,n),sE(e,n))));break;case 22:if(i=n.memoizedState!==null||Ra,!i){t=t!==null&&t.memoizedState!==null||vn,a=Ra;var s=vn;Ra=i,(vn=t)&&!s?Ea(e,n,(n.subtreeFlags&8772)!==0):_a(e,n),Ra=a,vn=s}break;case 30:break;default:_a(e,n)}}function Zx(e){var t=e.alternate;t!==null&&(e.alternate=null,Zx(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Xp(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ln=null,ni=!1;function va(e,t,n){for(n=n.child;n!==null;)jx(e,t,n),n=n.sibling}function jx(e,t,n){if(gi&&typeof gi.onCommitFiberUnmount=="function")try{gi.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 26:vn||sa(n,t),va(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:vn||sa(n,t);var i=ln,a=ni;ws(n.type)&&(ln=n.stateNode,ni=!1),va(e,t,n),xl(n.stateNode),ln=i,ni=a;break;case 5:vn||sa(n,t);case 6:if(i=ln,a=ni,ln=null,va(e,t,n),ln=i,ni=a,ln!==null)if(ni)try{(ln.nodeType===9?ln.body:ln.nodeName==="HTML"?ln.ownerDocument.body:ln).removeChild(n.stateNode)}catch(s){Ye(n,t,s)}else try{ln.removeChild(n.stateNode)}catch(s){Ye(n,t,s)}break;case 18:ln!==null&&(ni?(e=ln,mg(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),vo(e)):mg(ln,n.stateNode));break;case 4:i=ln,a=ni,ln=n.stateNode.containerInfo,ni=!0,va(e,t,n),ln=i,ni=a;break;case 0:case 11:case 14:case 15:Ts(2,n,t),vn||Ts(4,n,t),va(e,t,n);break;case 1:vn||(sa(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&kx(n,t,i)),va(e,t,n);break;case 21:va(e,t,n);break;case 22:vn=(i=vn)||n.memoizedState!==null,va(e,t,n),vn=i;break;default:va(e,t,n)}}function Kx(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{vo(e)}catch(n){Ye(t,t.return,n)}}}function Qx(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{vo(e)}catch(n){Ye(t,t.return,n)}}function Nb(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new ng),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new ng),t;default:throw Error(mt(435,e.tag))}}function fc(e,t){var n=Nb(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=Hb.bind(null,e,i);i.then(a,a)}})}function $n(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(ws(o.type)){ln=o.stateNode,ni=!1;break t}break;case 5:ln=o.stateNode,ni=!1;break t;case 3:case 4:ln=o.stateNode.containerInfo,ni=!0;break t}o=o.return}if(ln===null)throw Error(mt(160));jx(s,r,a),ln=null,ni=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Jx(t,e),t=t.sibling}var Yi=null;function Jx(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:$n(t,e),ti(e),i&4&&(Ts(3,e,e.return),Yl(3,e),Ts(5,e,e.return));break;case 1:$n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),i&64&&Ra&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Yi;if($n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,a=a.ownerDocument||a;e:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[kl]||s[On]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),Fn(s,i,n),s[On]=e,Rn(s),i=s;break t;case"link":var r=Mg("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;case"meta":if(r=Mg("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;default:throw Error(mt(468,i))}s[On]=e,Rn(s),i=s}e.stateNode=i}else bg(a,e.type,e.stateNode);else e.stateNode=yg(a,i,e.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?bg(a,e.type,e.stateNode):yg(a,i,e.memoizedProps)):i===null&&e.stateNode!==null&&Jf(e,e.memoizedProps,n.memoizedProps)}break;case 27:$n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),n!==null&&i&4&&Jf(e,e.memoizedProps,n.memoizedProps);break;case 5:if($n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),e.flags&32){a=e.stateNode;try{lo(a,"")}catch(g){Ye(e,e.return,g)}}i&4&&e.stateNode!=null&&(a=e.memoizedProps,Jf(e,a,n!==null?n.memoizedProps:a)),i&1024&&(td=!0);break;case 6:if($n(t,e),ti(e),i&4){if(e.stateNode===null)throw Error(mt(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(g){Ye(e,e.return,g)}}break;case 3:if(su=null,a=Yi,Yi=Gu(t.containerInfo),$n(t,e),Yi=a,ti(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{vo(t.containerInfo)}catch(g){Ye(e,e.return,g)}td&&(td=!1,$x(e));break;case 4:i=Yi,Yi=Gu(e.stateNode.containerInfo),$n(t,e),ti(e),Yi=i;break;case 12:$n(t,e),ti(e);break;case 31:$n(t,e),ti(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,fc(e,i)));break;case 13:$n(t,e),ti(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(gf=mi()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,fc(e,i)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Ra,d=vn;if(Ra=c||a,vn=d||l,$n(t,e),vn=d,Ra=c,ti(e),i&8192)t:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Ra||vn||Hs(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,u=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){Ye(l,l.return,g)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){Ye(l,l.return,g)}}}else if(t.tag===18){if(n===null){l=t;try{var p=l.stateNode;a?gg(p,!0):gg(l.stateNode,!1)}catch(g){Ye(l,l.return,g)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,fc(e,n))));break;case 19:$n(t,e),ti(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,fc(e,i)));break;case 30:break;case 21:break;default:$n(t,e),ti(e)}}function ti(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(Wx(i)){n=i;break}i=i.return}if(n==null)throw Error(mt(160));switch(n.tag){case 27:var a=n.stateNode,s=$f(e);Lu(e,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(lo(r,""),n.flags&=-33);var o=$f(e);Lu(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=$f(e);Eh(e,c,l);break;default:throw Error(mt(161))}}catch(d){Ye(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function $x(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;$x(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _a(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Yx(e,t.alternate,t),t=t.sibling}function Hs(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ts(4,t,t.return),Hs(t);break;case 1:sa(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&kx(t,t.return,n),Hs(t);break;case 27:xl(t.stateNode);case 26:case 5:sa(t,t.return),Hs(t);break;case 22:t.memoizedState===null&&Hs(t);break;case 30:Hs(t);break;default:Hs(t)}e=e.sibling}}function Ea(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags;switch(s.tag){case 0:case 11:case 15:Ea(a,s,n),Yl(4,s);break;case 1:if(Ea(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){Ye(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)K_(l[a],o)}catch(c){Ye(i,i.return,c)}}n&&r&64&&Vx(s),ml(s,s.return);break;case 27:qx(s);case 26:case 5:Ea(a,s,n),n&&i===null&&r&4&&Xx(s),ml(s,s.return);break;case 12:Ea(a,s,n);break;case 31:Ea(a,s,n),n&&r&4&&Kx(a,s);break;case 13:Ea(a,s,n),n&&r&4&&Qx(a,s);break;case 22:s.memoizedState===null&&Ea(a,s,n),ml(s,s.return);break;case 30:break;default:Ea(a,s,n)}t=t.sibling}}function Mm(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Wl(n))}function bm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Wl(e))}function ki(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)tS(e,t,n,i),t=t.sibling}function tS(e,t,n,i){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ki(e,t,n,i),a&2048&&Yl(9,t);break;case 1:ki(e,t,n,i);break;case 3:ki(e,t,n,i),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Wl(e)));break;case 12:if(a&2048){ki(e,t,n,i),e=t.stateNode;try{var s=t.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){Ye(t,t.return,l)}}else ki(e,t,n,i);break;case 31:ki(e,t,n,i);break;case 13:ki(e,t,n,i);break;case 23:break;case 22:s=t.stateNode,r=t.alternate,t.memoizedState!==null?s._visibility&2?ki(e,t,n,i):gl(e,t):s._visibility&2?ki(e,t,n,i):(s._visibility|=2,Or(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),a&2048&&Mm(r,t);break;case 24:ki(e,t,n,i),a&2048&&bm(t.alternate,t);break;default:ki(e,t,n,i)}}function Or(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Or(s,r,o,l,a),Yl(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?Or(s,r,o,l,a):gl(s,r):(d._visibility|=2,Or(s,r,o,l,a)),a&&c&2048&&Mm(r.alternate,r);break;case 24:Or(s,r,o,l,a),a&&c&2048&&bm(r.alternate,r);break;default:Or(s,r,o,l,a)}t=t.sibling}}function gl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:gl(n,i),a&2048&&Mm(i.alternate,i);break;case 24:gl(n,i),a&2048&&bm(i.alternate,i);break;default:gl(n,i)}t=t.sibling}}var nl=8192;function vr(e,t,n){if(e.subtreeFlags&nl)for(e=e.child;e!==null;)eS(e,t,n),e=e.sibling}function eS(e,t,n){switch(e.tag){case 26:vr(e,t,n),e.flags&nl&&e.memoizedState!==null&&vE(n,Yi,e.memoizedState,e.memoizedProps);break;case 5:vr(e,t,n);break;case 3:case 4:var i=Yi;Yi=Gu(e.stateNode.containerInfo),vr(e,t,n),Yi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=nl,nl=16777216,vr(e,t,n),nl=i):vr(e,t,n));break;default:vr(e,t,n)}}function nS(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fo(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];An=i,aS(i,e)}nS(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)iS(e),e=e.sibling}function iS(e){switch(e.tag){case 0:case 11:case 15:Fo(e),e.flags&2048&&Ts(9,e,e.return);break;case 3:Fo(e);break;case 12:Fo(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,iu(e)):Fo(e);break;default:Fo(e)}}function iu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];An=i,aS(i,e)}nS(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ts(8,t,t.return),iu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,iu(t));break;default:iu(t)}e=e.sibling}}function aS(e,t){for(;An!==null;){var n=An;switch(n.tag){case 0:case 11:case 15:Ts(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Wl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,An=i;else t:for(n=e;An!==null;){i=An;var a=i.sibling,s=i.return;if(Zx(i),i===n){An=null;break t}if(a!==null){a.return=s,An=a;break t}An=s}}}var Ub={getCacheForType:function(e){var t=zn(_n),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return zn(_n).controller.signal}},Lb=typeof WeakMap=="function"?WeakMap:Map,Fe=0,Qe=null,Te=null,Re=0,qe=0,fi=null,cs=!1,Co=!1,Em=!1,Va=0,un=0,As=0,Ks=0,Tm=0,pi=0,ho=0,vl=null,ii=null,Th=!1,gf=0,sS=0,Ou=1/0,Pu=null,_s=null,Sn=0,xs=null,po=null,Pa=0,Ah=0,Rh=null,rS=null,_l=0,Ch=null;function _i(){return Fe&2&&Re!==0?Re&-Re:se.T!==null?Rm():m_()}function oS(){if(pi===0)if(!(Re&536870912)||Ne){var e=ic;ic<<=1,!(ic&3932160)&&(ic=262144),pi=e}else pi=536870912;return e=Si.current,e!==null&&(e.flags|=32),pi}function ai(e,t,n){(e===Qe&&(qe===2||qe===9)||e.cancelPendingCommit!==null)&&(mo(e,0),us(e,Re,pi,!1)),Vl(e,n),(!(Fe&2)||e!==Qe)&&(e===Qe&&(!(Fe&2)&&(Ks|=n),un===4&&us(e,Re,pi,!1)),da(e))}function lS(e,t,n){if(Fe&6)throw Error(mt(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Gl(e,t),a=i?zb(e,t):ed(e,t,!0),s=i;do{if(a===0){Co&&!i&&us(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!Ob(n)){a=ed(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=vl;var l=o.current.memoizedState.isDehydrated;if(l&&(mo(o,r).flags|=256),r=ed(o,r,!1),r!==2){if(Em&&!l){o.errorRecoveryDisabledLanes|=s,Ks|=s,a=4;break t}s=ii,ii=a,s!==null&&(ii===null?ii=s:ii.push.apply(ii,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){mo(e,0),us(e,t,0,!0);break}t:{switch(i=e,s=a,s){case 0:case 1:throw Error(mt(345));case 4:if((t&4194048)!==t)break;case 6:us(i,t,pi,!cs);break t;case 2:ii=null;break;case 3:case 5:break;default:throw Error(mt(329))}if((t&62914560)===t&&(a=gf+300-mi(),10<a)){if(us(i,t,pi,!cs),sf(i,0,!0)!==0)break t;Pa=t,i.timeoutHandle=CS(ig.bind(null,i,n,ii,Pu,Th,t,pi,Ks,ho,cs,s,"Throttled",-0,0),a);break t}ig(i,n,ii,Pu,Th,t,pi,Ks,ho,cs,s,null,-0,0)}}break}while(!0);da(e)}function ig(e,t,n,i,a,s,r,o,l,c,d,h,u,p){if(e.timeoutHandle=-1,h=t.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Da},eS(t,s,h);var g=(s&62914560)===s?gf-mi():(s&4194048)===s?sS-mi():0;if(g=_E(h,g),g!==null){Pa=s,e.cancelPendingCommit=g(sg.bind(null,e,t,s,n,i,a,r,o,l,d,h,null,u,p)),us(e,s,r,!c);return}}sg(e,t,s,n,i,a,r,o,l)}function Ob(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!xi(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function us(e,t,n,i){t&=~Tm,t&=~Ks,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-vi(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&d_(e,n,t)}function vf(){return Fe&6?!0:(Zl(0),!1)}function Am(){if(Te!==null){if(qe===0)var e=Te.return;else e=Te,Na=fr=null,fm(e),eo=null,Rl=0,e=Te;for(;e!==null;)Gx(e.alternate,e),e=e.return;Te=null}}function mo(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,tE(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Pa=0,Am(),Qe=e,Te=n=La(e.current,null),Re=t,qe=0,fi=null,cs=!1,Co=Gl(e,t),Em=!1,ho=pi=Tm=Ks=As=un=0,ii=vl=null,Th=!1,t&8&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var a=31-vi(i),s=1<<a;t|=e[a],i&=~s}return Va=t,cf(),n}function cS(e,t){pe=null,se.H=wl,t===Ro||t===ff?(t=P0(),qe=3):t===am?(t=P0(),qe=4):qe=t===Sm?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,fi=t,Te===null&&(un=1,Nu(e,Ui(t,e.current)))}function uS(){var e=Si.current;return e===null?!0:(Re&4194048)===Re?zi===null:(Re&62914560)===Re||Re&536870912?e===zi:!1}function fS(){var e=se.H;return se.H=wl,e===null?wl:e}function dS(){var e=se.A;return se.A=Ub,e}function zu(){un=4,cs||(Re&4194048)!==Re&&Si.current!==null||(Co=!0),!(As&134217727)&&!(Ks&134217727)||Qe===null||us(Qe,Re,pi,!1)}function ed(e,t,n){var i=Fe;Fe|=2;var a=fS(),s=dS();(Qe!==e||Re!==t)&&(Pu=null,mo(e,t)),t=!1;var r=un;t:do try{if(qe!==0&&Te!==null){var o=Te,l=fi;switch(qe){case 8:Am(),r=6;break t;case 3:case 2:case 9:case 6:Si.current===null&&(t=!0);var c=qe;if(qe=0,fi=null,Yr(e,o,l,c),n&&Co){r=0;break t}break;default:c=qe,qe=0,fi=null,Yr(e,o,l,c)}}Pb(),r=un;break}catch(d){cS(e,d)}while(!0);return t&&e.shellSuspendCounter++,Na=fr=null,Fe=i,se.H=a,se.A=s,Te===null&&(Qe=null,Re=0,cf()),r}function Pb(){for(;Te!==null;)hS(Te)}function zb(e,t){var n=Fe;Fe|=2;var i=fS(),a=dS();Qe!==e||Re!==t?(Pu=null,Ou=mi()+500,mo(e,t)):Co=Gl(e,t);t:do try{if(qe!==0&&Te!==null){t=Te;var s=fi;e:switch(qe){case 1:qe=0,fi=null,Yr(e,t,s,1);break;case 2:case 9:if(O0(s)){qe=0,fi=null,ag(t);break}t=function(){qe!==2&&qe!==9||Qe!==e||(qe=7),da(e)},s.then(t,t);break t;case 3:qe=7;break t;case 4:qe=5;break t;case 7:O0(s)?(qe=0,fi=null,ag(t)):(qe=0,fi=null,Yr(e,t,s,7));break;case 5:var r=null;switch(Te.tag){case 26:r=Te.memoizedState;case 5:case 27:var o=Te;if(r?LS(r):o.stateNode.complete){qe=0,fi=null;var l=o.sibling;if(l!==null)Te=l;else{var c=o.return;c!==null?(Te=c,_f(c)):Te=null}break e}}qe=0,fi=null,Yr(e,t,s,5);break;case 6:qe=0,fi=null,Yr(e,t,s,6);break;case 8:Am(),un=6;break t;default:throw Error(mt(462))}}Ib();break}catch(d){cS(e,d)}while(!0);return Na=fr=null,se.H=i,se.A=a,Fe=n,Te!==null?0:(Qe=null,Re=0,cf(),un)}function Ib(){for(;Te!==null&&!rM();)hS(Te)}function hS(e){var t=Hx(e.alternate,e,Va);e.memoizedProps=e.pendingProps,t===null?_f(e):Te=t}function ag(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Q0(n,t,t.pendingProps,t.type,void 0,Re);break;case 11:t=Q0(n,t,t.pendingProps,t.type.render,t.ref,Re);break;case 5:fm(t);default:Gx(n,t),t=Te=G_(t,Va),t=Hx(n,t,Va)}e.memoizedProps=e.pendingProps,t===null?_f(e):Te=t}function Yr(e,t,n,i){Na=fr=null,fm(t),eo=null,Rl=0;var a=t.return;try{if(Tb(e,a,t,n,Re)){un=1,Nu(e,Ui(n,e.current)),Te=null;return}}catch(s){if(a!==null)throw Te=a,s;un=1,Nu(e,Ui(n,e.current)),Te=null;return}t.flags&32768?(Ne||i===1?e=!0:Co||Re&536870912?e=!1:(cs=e=!0,(i===2||i===9||i===3||i===6)&&(i=Si.current,i!==null&&i.tag===13&&(i.flags|=16384))),pS(t,e)):_f(t)}function _f(e){var t=e;do{if(t.flags&32768){pS(t,cs);return}e=t.return;var n=Cb(t.alternate,t,Va);if(n!==null){Te=n;return}if(t=t.sibling,t!==null){Te=t;return}Te=t=e}while(t!==null);un===0&&(un=5)}function pS(e,t){do{var n=wb(e.alternate,e);if(n!==null){n.flags&=32767,Te=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Te=e;return}Te=e=n}while(e!==null);un=6,Te=null}function sg(e,t,n,i,a,s,r,o,l){e.cancelPendingCommit=null;do xf();while(Sn!==0);if(Fe&6)throw Error(mt(327));if(t!==null){if(t===e.current)throw Error(mt(177));if(s=t.lanes|t.childLanes,s|=Qp,gM(e,n,s,r,o,l),e===Qe&&(Te=Qe=null,Re=0),po=t,xs=e,Pa=n,Ah=s,Rh=a,rS=i,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,Gb(Su,function(){return xS(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,t.subtreeFlags&13878||i){i=se.T,se.T=null,a=He.p,He.p=2,r=Fe,Fe|=4;try{Db(e,t,n)}finally{Fe=r,He.p=a,se.T=i}}Sn=1,mS(),gS(),vS()}}function mS(){if(Sn===1){Sn=0;var e=xs,t=po,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=se.T,se.T=null;var i=He.p;He.p=2;var a=Fe;Fe|=4;try{Jx(t,e);var s=Uh,r=L_(e.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&U_(o.ownerDocument.documentElement,o)){if(l!==null&&Kp(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var h=o.ownerDocument||document,u=h&&h.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,y=Math.min(l.start,g),m=l.end===void 0?y:Math.min(l.end,g);!p.extend&&y>m&&(r=m,m=y,y=r);var f=R0(o,y),v=R0(o,m);if(f&&v&&(p.rangeCount!==1||p.anchorNode!==f.node||p.anchorOffset!==f.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var M=h.createRange();M.setStart(f.node,f.offset),p.removeAllRanges(),y>m?(p.addRange(M),p.extend(v.node,v.offset)):(M.setEnd(v.node,v.offset),p.addRange(M))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var S=h[o];S.element.scrollLeft=S.left,S.element.scrollTop=S.top}}Xu=!!Nh,Uh=Nh=null}finally{Fe=a,He.p=i,se.T=n}}e.current=t,Sn=2}}function gS(){if(Sn===2){Sn=0;var e=xs,t=po,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=se.T,se.T=null;var i=He.p;He.p=2;var a=Fe;Fe|=4;try{Yx(e,t.alternate,t)}finally{Fe=a,He.p=i,se.T=n}}Sn=3}}function vS(){if(Sn===4||Sn===3){Sn=0,oM();var e=xs,t=po,n=Pa,i=rS;t.subtreeFlags&10256||t.flags&10256?Sn=5:(Sn=0,po=xs=null,_S(e,e.pendingLanes));var a=e.pendingLanes;if(a===0&&(_s=null),kp(n),t=t.stateNode,gi&&typeof gi.onCommitFiberRoot=="function")try{gi.onCommitFiberRoot(Hl,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=se.T,a=He.p,He.p=2,se.T=null;try{for(var s=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{se.T=t,He.p=a}}Pa&3&&xf(),da(e),a=e.pendingLanes,n&261930&&a&42?e===Ch?_l++:(_l=0,Ch=e):_l=0,Zl(0)}}function _S(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Wl(t)))}function xf(){return mS(),gS(),vS(),xS()}function xS(){if(Sn!==5)return!1;var e=xs,t=Ah;Ah=0;var n=kp(Pa),i=se.T,a=He.p;try{He.p=32>n?32:n,se.T=null,n=Rh,Rh=null;var s=xs,r=Pa;if(Sn=0,po=xs=null,Pa=0,Fe&6)throw Error(mt(331));var o=Fe;if(Fe|=4,iS(s.current),tS(s,s.current,r,n),Fe=o,Zl(0,!1),gi&&typeof gi.onPostCommitFiberRoot=="function")try{gi.onPostCommitFiberRoot(Hl,s)}catch{}return!0}finally{He.p=a,se.T=i,_S(e,t)}}function rg(e,t,n){t=Ui(n,t),t=yh(e.stateNode,t,2),e=vs(e,t,2),e!==null&&(Vl(e,2),da(e))}function Ye(e,t,n){if(e.tag===3)rg(e,e,n);else for(;t!==null;){if(t.tag===3){rg(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_s===null||!_s.has(i))){e=Ui(n,e),n=Ox(2),i=vs(t,n,2),i!==null&&(Px(n,i,t,e),Vl(i,2),da(i));break}}t=t.return}}function nd(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new Lb;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Em=!0,a.add(n),e=Bb.bind(null,e,t,n),t.then(e,e))}function Bb(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Qe===e&&(Re&n)===n&&(un===4||un===3&&(Re&62914560)===Re&&300>mi()-gf?!(Fe&2)&&mo(e,0):Tm|=n,ho===Re&&(ho=0)),da(e)}function SS(e,t){t===0&&(t=f_()),e=ur(e,t),e!==null&&(Vl(e,t),da(e))}function Fb(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),SS(e,n)}function Hb(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(mt(314))}i!==null&&i.delete(t),SS(e,n)}function Gb(e,t){return Gp(e,t)}var Iu=null,Pr=null,wh=!1,Bu=!1,id=!1,fs=0;function da(e){e!==Pr&&e.next===null&&(Pr===null?Iu=Pr=e:Pr=Pr.next=e),Bu=!0,wh||(wh=!0,kb())}function Zl(e,t){if(!id&&Bu){id=!0;do for(var n=!1,i=Iu;i!==null;){if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-vi(42|e)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,og(i,s))}else s=Re,s=sf(i,i===Qe?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Gl(i,s)||(n=!0,og(i,s));i=i.next}while(n);id=!1}}function Vb(){yS()}function yS(){Bu=wh=!1;var e=0;fs!==0&&$b()&&(e=fs);for(var t=mi(),n=null,i=Iu;i!==null;){var a=i.next,s=MS(i,t);s===0?(i.next=null,n===null?Iu=a:n.next=a,a===null&&(Pr=n)):(n=i,(e!==0||s&3)&&(Bu=!0)),i=a}Sn!==0&&Sn!==5||Zl(e),fs!==0&&(fs=0)}function MS(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-vi(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=mM(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=Qe,n=Re,n=sf(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(qe===2||qe===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Nf(i),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Gl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Nf(i),kp(n)){case 2:case 8:n=c_;break;case 32:n=Su;break;case 268435456:n=u_;break;default:n=Su}return i=bS.bind(null,e),n=Gp(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Nf(i),e.callbackPriority=2,e.callbackNode=null,2}function bS(e,t){if(Sn!==0&&Sn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(xf()&&e.callbackNode!==n)return null;var i=Re;return i=sf(e,e===Qe?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(lS(e,i,t),MS(e,mi()),e.callbackNode!=null&&e.callbackNode===n?bS.bind(null,e):null)}function og(e,t){if(xf())return null;lS(e,t,!0)}function kb(){eE(function(){Fe&6?Gp(l_,Vb):yS()})}function Rm(){if(fs===0){var e=co;e===0&&(e=nc,nc<<=1,!(nc&261888)&&(nc=256)),fs=e}return fs}function lg(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Zc(""+e)}function cg(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Xb(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=lg((a[ri]||null).action),r=i.submitter;r&&(t=(t=r[ri]||null)?lg(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new rf("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(fs!==0){var l=r?cg(a,r):new FormData(a);xh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?cg(a,r):new FormData(a),xh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var ad=0;ad<oh.length;ad++){var sd=oh[ad],Wb=sd.toLowerCase(),qb=sd[0].toUpperCase()+sd.slice(1);Ki(Wb,"on"+qb)}Ki(P_,"onAnimationEnd");Ki(z_,"onAnimationIteration");Ki(I_,"onAnimationStart");Ki("dblclick","onDoubleClick");Ki("focusin","onFocus");Ki("focusout","onBlur");Ki(lb,"onTransitionRun");Ki(cb,"onTransitionStart");Ki(ub,"onTransitionCancel");Ki(B_,"onTransitionEnd");oo("onMouseEnter",["mouseout","mouseover"]);oo("onMouseLeave",["mouseout","mouseover"]);oo("onPointerEnter",["pointerout","pointerover"]);oo("onPointerLeave",["pointerout","pointerover"]);or("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));or("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));or("onBeforeInput",["compositionend","keypress","textInput","paste"]);or("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));or("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));or("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Yb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Dl));function ES(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(d){Mu(d)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(d){Mu(d)}a.currentTarget=null,s=l}}}}function Ee(e,t){var n=t[$d];n===void 0&&(n=t[$d]=new Set);var i=e+"__bubble";n.has(i)||(TS(t,e,2,!1),n.add(i))}function rd(e,t,n){var i=0;t&&(i|=4),TS(n,e,i,t)}var dc="_reactListening"+Math.random().toString(36).slice(2);function Cm(e){if(!e[dc]){e[dc]=!0,g_.forEach(function(n){n!=="selectionchange"&&(Yb.has(n)||rd(n,!1,e),rd(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[dc]||(t[dc]=!0,rd("selectionchange",!1,t))}}function TS(e,t,n,i){switch(BS(t)){case 2:var a=yE;break;case 8:a=ME;break;default:a=Um}n=a.bind(null,t,n,e),a=void 0,!ah||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function od(e,t,n,i,a){var s=i;if(!(t&1)&&!(t&2)&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Br(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}E_(function(){var c=s,d=qp(n),h=[];t:{var u=F_.get(e);if(u!==void 0){var p=rf,g=e;switch(e){case"keypress":if(Kc(n)===0)break t;case"keydown":case"keyup":p=HM;break;case"focusin":g="focus",p=zf;break;case"focusout":g="blur",p=zf;break;case"beforeblur":case"afterblur":p=zf;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=v0;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=CM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=kM;break;case P_:case z_:case I_:p=NM;break;case B_:p=WM;break;case"scroll":case"scrollend":p=AM;break;case"wheel":p=YM;break;case"copy":case"cut":case"paste":p=LM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=x0;break;case"toggle":case"beforetoggle":p=jM}var y=(t&4)!==0,m=!y&&(e==="scroll"||e==="scrollend"),f=y?u!==null?u+"Capture":null:u;y=[];for(var v=c,M;v!==null;){var S=v;if(M=S.stateNode,S=S.tag,S!==5&&S!==26&&S!==27||M===null||f===null||(S=Ml(v,f),S!=null&&y.push(Nl(v,S,M))),m)break;v=v.return}0<y.length&&(u=new p(u,g,null,n,d),h.push({event:u,listeners:y}))}}if(!(t&7)){t:{if(u=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",u&&n!==ih&&(g=n.relatedTarget||n.fromElement)&&(Br(g)||g[Eo]))break t;if((p||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Br(g):null,g!==null&&(m=Fl(g),y=g.tag,g!==m||y!==5&&y!==27&&y!==6)&&(g=null)):(p=null,g=c),p!==g)){if(y=v0,S="onMouseLeave",f="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(y=x0,S="onPointerLeave",f="onPointerEnter",v="pointer"),m=p==null?u:tl(p),M=g==null?u:tl(g),u=new y(S,v+"leave",p,n,d),u.target=m,u.relatedTarget=M,S=null,Br(d)===c&&(y=new y(f,v+"enter",g,n,d),y.target=M,y.relatedTarget=m,S=y),m=S,p&&g)e:{for(y=Zb,f=p,v=g,M=0,S=f;S;S=y(S))M++;S=0;for(var U=v;U;U=y(U))S++;for(;0<M-S;)f=y(f),M--;for(;0<S-M;)v=y(v),S--;for(;M--;){if(f===v||v!==null&&f===v.alternate){y=f;break e}f=y(f),v=y(v)}y=null}else y=null;p!==null&&ug(h,u,p,y,!1),g!==null&&m!==null&&ug(h,m,g,y,!0)}}t:{if(u=c?tl(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var C=b0;else if(M0(u))if(D_)C=sb;else{C=ib;var E=nb}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Wp(c.elementType)&&(C=b0):C=ab;if(C&&(C=C(e,c))){w_(h,C,n,d);break t}E&&E(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&nh(u,"number",u.value)}switch(E=c?tl(c):window,e){case"focusin":(M0(E)||E.contentEditable==="true")&&(Gr=E,sh=c,cl=null);break;case"focusout":cl=sh=Gr=null;break;case"mousedown":rh=!0;break;case"contextmenu":case"mouseup":case"dragend":rh=!1,C0(h,n,d);break;case"selectionchange":if(ob)break;case"keydown":case"keyup":C0(h,n,d)}var _;if(jp)t:{switch(e){case"compositionstart":var w="onCompositionStart";break t;case"compositionend":w="onCompositionEnd";break t;case"compositionupdate":w="onCompositionUpdate";break t}w=void 0}else Hr?R_(e,n)&&(w="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(w="onCompositionStart");w&&(A_&&n.locale!=="ko"&&(Hr||w!=="onCompositionStart"?w==="onCompositionEnd"&&Hr&&(_=T_()):(ls=d,Yp="value"in ls?ls.value:ls.textContent,Hr=!0)),E=Fu(c,w),0<E.length&&(w=new _0(w,e,null,n,d),h.push({event:w,listeners:E}),_?w.data=_:(_=C_(n),_!==null&&(w.data=_)))),(_=QM?JM(e,n):$M(e,n))&&(w=Fu(c,"onBeforeInput"),0<w.length&&(E=new _0("onBeforeInput","beforeinput",null,n,d),h.push({event:E,listeners:w}),E.data=_)),Xb(h,e,c,n,d)}ES(h,t)})}function Nl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Fu(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Ml(e,n),a!=null&&i.unshift(Nl(e,a,s)),a=Ml(e,t),a!=null&&i.push(Nl(e,a,s))),e.tag===3)return i;e=e.return}return[]}function Zb(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function ug(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Ml(n,s),c!=null&&r.unshift(Nl(n,c,l))):a||(c=Ml(n,s),c!=null&&r.push(Nl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var jb=/\r\n?/g,Kb=/\u0000|\uFFFD/g;function fg(e){return(typeof e=="string"?e:""+e).replace(jb,`
`).replace(Kb,"")}function AS(e,t){return t=fg(t),fg(e)===t}function je(e,t,n,i,a,s){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||lo(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&lo(e,""+i);break;case"className":sc(e,"class",i);break;case"tabIndex":sc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":sc(e,n,i);break;case"style":b_(e,i,s);break;case"data":if(t!=="object"){sc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Zc(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&je(e,t,"name",a.name,a,null),je(e,t,"formEncType",a.formEncType,a,null),je(e,t,"formMethod",a.formMethod,a,null),je(e,t,"formTarget",a.formTarget,a,null)):(je(e,t,"encType",a.encType,a,null),je(e,t,"method",a.method,a,null),je(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Zc(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Da);break;case"onScroll":i!=null&&Ee("scroll",e);break;case"onScrollEnd":i!=null&&Ee("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(mt(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(mt(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Zc(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Ee("beforetoggle",e),Ee("toggle",e),Yc(e,"popover",i);break;case"xlinkActuate":ma(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ma(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ma(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ma(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ma(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ma(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ma(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ma(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ma(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Yc(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=EM.get(n)||n,Yc(e,n,i))}}function Dh(e,t,n,i,a,s){switch(n){case"style":b_(e,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(mt(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(mt(60));e.innerHTML=n}}break;case"children":typeof i=="string"?lo(e,i):(typeof i=="number"||typeof i=="bigint")&&lo(e,""+i);break;case"onScroll":i!=null&&Ee("scroll",e);break;case"onScrollEnd":i!=null&&Ee("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Da);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!v_.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),s=e[ri]||null,s=s!=null?s[n]:null,typeof s=="function"&&e.removeEventListener(t,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,a);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):Yc(e,n,i)}}}function Fn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Ee("error",e),Ee("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(mt(137,t));default:je(e,t,s,r,n,null)}}a&&je(e,t,"srcSet",n.srcSet,n,null),i&&je(e,t,"src",n.src,n,null);return;case"input":Ee("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(mt(137,t));break;default:je(e,t,i,d,n,null)}}S_(e,s,o,l,c,r,a,!1);return;case"select":Ee("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:je(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?Jr(e,!!i,t,!1):n!=null&&Jr(e,!!i,n,!0);return;case"textarea":Ee("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(mt(91));break;default:je(e,t,r,o,n,null)}M_(e,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:je(e,t,l,i,n,null)}return;case"dialog":Ee("beforetoggle",e),Ee("toggle",e),Ee("cancel",e),Ee("close",e);break;case"iframe":case"object":Ee("load",e);break;case"video":case"audio":for(i=0;i<Dl.length;i++)Ee(Dl[i],e);break;case"image":Ee("error",e),Ee("load",e);break;case"details":Ee("toggle",e);break;case"embed":case"source":case"link":Ee("error",e),Ee("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(mt(137,t));default:je(e,t,c,i,n,null)}return;default:if(Wp(t)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Dh(e,t,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&je(e,t,o,i,n,null))}function Qb(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,d=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||je(e,t,p,null,i,h)}}for(var u in i){var p=i[u];if(h=n[u],i.hasOwnProperty(u)&&(p!=null||h!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(mt(137,t));break;default:p!==h&&je(e,t,u,p,i,h)}}eh(e,r,o,l,c,d,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||je(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&je(e,t,a,s,i,l)}t=o,n=r,i=p,u!=null?Jr(e,!!n,u,!1):!!i!=!!n&&(t!=null?Jr(e,!!n,t,!0):Jr(e,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:je(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(mt(91));break;default:a!==s&&je(e,t,r,a,i,s)}y_(e,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":e.selected=!1;break;default:je(e,t,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":e.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:je(e,t,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var y in n)u=n[y],n.hasOwnProperty(y)&&u!=null&&!i.hasOwnProperty(y)&&je(e,t,y,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(mt(137,t));break;default:je(e,t,c,u,i,p)}return;default:if(Wp(t)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Dh(e,t,m,void 0,i,u);for(d in i)u=i[d],p=n[d],!i.hasOwnProperty(d)||u===p||u===void 0&&p===void 0||Dh(e,t,d,u,i,p);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&je(e,t,f,null,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u==null&&p==null||je(e,t,h,u,i,p)}function dg(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function Jb(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&dg(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,h=l.initiatorType;d&&dg(h)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(s+r)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Nh=null,Uh=null;function Hu(e){return e.nodeType===9?e:e.ownerDocument}function hg(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function RS(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Lh(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var ld=null;function $b(){var e=window.event;return e&&e.type==="popstate"?e===ld?!1:(ld=e,!0):(ld=null,!1)}var CS=typeof setTimeout=="function"?setTimeout:void 0,tE=typeof clearTimeout=="function"?clearTimeout:void 0,pg=typeof Promise=="function"?Promise:void 0,eE=typeof queueMicrotask=="function"?queueMicrotask:typeof pg<"u"?function(e){return pg.resolve(null).then(e).catch(nE)}:CS;function nE(e){setTimeout(function(){throw e})}function ws(e){return e==="head"}function mg(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),vo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")xl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,xl(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[kl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&xl(e.ownerDocument.body);n=a}while(n);vo(t)}function gg(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function Oh(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Oh(n),Xp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function iE(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[kl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Ii(e.nextSibling),e===null)break}return null}function aE(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ii(e.nextSibling),e===null))return null;return e}function wS(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ii(e.nextSibling),e===null))return null;return e}function Ph(e){return e.data==="$?"||e.data==="$~"}function zh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function sE(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Ii(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Ih=null;function vg(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ii(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function _g(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function DS(e,t,n){switch(t=Hu(n),e){case"html":if(e=t.documentElement,!e)throw Error(mt(452));return e;case"head":if(e=t.head,!e)throw Error(mt(453));return e;case"body":if(e=t.body,!e)throw Error(mt(454));return e;default:throw Error(mt(451))}}function xl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Xp(e)}var Fi=new Map,xg=new Set;function Gu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Wa=He.d;He.d={f:rE,r:oE,D:lE,C:cE,L:uE,m:fE,X:hE,S:dE,M:pE};function rE(){var e=Wa.f(),t=vf();return e||t}function oE(e){var t=To(e);t!==null&&t.tag===5&&t.type==="form"?bx(t):Wa.r(e)}var wo=typeof document>"u"?null:document;function NS(e,t,n){var i=wo;if(i&&typeof t=="string"&&t){var a=Ni(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),xg.has(a)||(xg.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),Fn(t,"link",e),Rn(t),i.head.appendChild(t)))}}function lE(e){Wa.D(e),NS("dns-prefetch",e,null)}function cE(e,t){Wa.C(e,t),NS("preconnect",e,t)}function uE(e,t,n){Wa.L(e,t,n);var i=wo;if(i&&e&&t){var a='link[rel="preload"][as="'+Ni(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Ni(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Ni(n.imageSizes)+'"]')):a+='[href="'+Ni(e)+'"]';var s=a;switch(t){case"style":s=go(e);break;case"script":s=Do(e)}Fi.has(s)||(e=on({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Fi.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(jl(s))||t==="script"&&i.querySelector(Kl(s))||(t=i.createElement("link"),Fn(t,"link",e),Rn(t),i.head.appendChild(t)))}}function fE(e,t){Wa.m(e,t);var n=wo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+Ni(i)+'"][href="'+Ni(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Do(e)}if(!Fi.has(s)&&(e=on({rel:"modulepreload",href:e},t),Fi.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Kl(s)))return}i=n.createElement("link"),Fn(i,"link",e),Rn(i),n.head.appendChild(i)}}}function dE(e,t,n){Wa.S(e,t,n);var i=wo;if(i&&e){var a=Qr(i).hoistableStyles,s=go(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(jl(s)))o.loading=5;else{e=on({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Fi.get(s))&&wm(e,n);var l=r=i.createElement("link");Rn(l),Fn(l,"link",e),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,au(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function hE(e,t){Wa.X(e,t);var n=wo;if(n&&e){var i=Qr(n).hoistableScripts,a=Do(e),s=i.get(a);s||(s=n.querySelector(Kl(a)),s||(e=on({src:e,async:!0},t),(t=Fi.get(a))&&Dm(e,t),s=n.createElement("script"),Rn(s),Fn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function pE(e,t){Wa.M(e,t);var n=wo;if(n&&e){var i=Qr(n).hoistableScripts,a=Do(e),s=i.get(a);s||(s=n.querySelector(Kl(a)),s||(e=on({src:e,async:!0,type:"module"},t),(t=Fi.get(a))&&Dm(e,t),s=n.createElement("script"),Rn(s),Fn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function Sg(e,t,n,i){var a=(a=ps.current)?Gu(a):null;if(!a)throw Error(mt(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=go(n.href),n=Qr(a).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=go(n.href);var s=Qr(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(jl(e)))&&!s._p&&(r.instance=s,r.state.loading=5),Fi.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Fi.set(e,n),s||mE(a,e,n,r.state))),t&&i===null)throw Error(mt(528,""));return r}if(t&&i!==null)throw Error(mt(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Do(n),n=Qr(a).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(mt(444,e))}}function go(e){return'href="'+Ni(e)+'"'}function jl(e){return'link[rel="stylesheet"]['+e+"]"}function US(e){return on({},e,{"data-precedence":e.precedence,precedence:null})}function mE(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),Fn(t,"link",n),Rn(t),e.head.appendChild(t))}function Do(e){return'[src="'+Ni(e)+'"]'}function Kl(e){return"script[async]"+e}function yg(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Ni(n.href)+'"]');if(i)return t.instance=i,Rn(i),i;var a=on({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Rn(i),Fn(i,"style",a),au(i,n.precedence,e),t.instance=i;case"stylesheet":a=go(n.href);var s=e.querySelector(jl(a));if(s)return t.state.loading|=4,t.instance=s,Rn(s),s;i=US(n),(a=Fi.get(a))&&wm(i,a),s=(e.ownerDocument||e).createElement("link"),Rn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),t.state.loading|=4,au(s,n.precedence,e),t.instance=s;case"script":return s=Do(n.src),(a=e.querySelector(Kl(s)))?(t.instance=a,Rn(a),a):(i=n,(a=Fi.get(s))&&(i=on({},n),Dm(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),Rn(a),Fn(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(mt(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(i=t.instance,t.state.loading|=4,au(i,n.precedence,e));return t.instance}function au(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function wm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Dm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var su=null;function Mg(e,t,n){if(su===null){var i=new Map,a=su=new Map;a.set(n,i)}else a=su,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[kl]||s[On]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function bg(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function gE(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function LS(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function vE(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=go(i.href),s=t.querySelector(jl(a));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=Vu.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,Rn(s);return}s=t.ownerDocument||t,i=US(i),(a=Fi.get(a))&&wm(i,a),s=s.createElement("link"),Rn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=Vu.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var cd=0;function _E(e,t){return e.stylesheets&&e.count===0&&ru(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&ru(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&cd===0&&(cd=62500*Jb());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ru(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>cd?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Vu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ru(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var ku=null;function ru(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ku=new Map,t.forEach(xE,e),ku=null,Vu.call(e))}function xE(e,t){if(!(t.state.loading&4)){var n=ku.get(e);if(n)var i=n.get(null);else{n=new Map,ku.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Vu.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var Ul={$$typeof:wa,Provider:null,Consumer:null,_currentValue:qs,_currentValue2:qs,_threadCount:0};function SE(e,t,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Uf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uf(0),this.hiddenUpdates=Uf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function OS(e,t,n,i,a,s,r,o,l,c,d,h){return e=new SE(e,t,n,r,l,c,d,h,o),t=1,s===!0&&(t|=24),s=hi(3,null,null,t),e.current=s,s.stateNode=e,t=nm(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},sm(s),e}function PS(e){return e?(e=Xr,e):Xr}function zS(e,t,n,i,a,s){a=PS(a),i.context===null?i.context=a:i.pendingContext=a,i=gs(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=vs(e,i,t),n!==null&&(ai(n,e,t),fl(n,e,t))}function Eg(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Nm(e,t){Eg(e,t),(e=e.alternate)&&Eg(e,t)}function IS(e){if(e.tag===13||e.tag===31){var t=ur(e,67108864);t!==null&&ai(t,e,67108864),Nm(e,67108864)}}function Tg(e){if(e.tag===13||e.tag===31){var t=_i();t=Vp(t);var n=ur(e,t);n!==null&&ai(n,e,t),Nm(e,t)}}var Xu=!0;function yE(e,t,n,i){var a=se.T;se.T=null;var s=He.p;try{He.p=2,Um(e,t,n,i)}finally{He.p=s,se.T=a}}function ME(e,t,n,i){var a=se.T;se.T=null;var s=He.p;try{He.p=8,Um(e,t,n,i)}finally{He.p=s,se.T=a}}function Um(e,t,n,i){if(Xu){var a=Bh(i);if(a===null)od(e,t,i,Wu,n),Ag(e,i);else if(EE(a,e,t,n,i))i.stopPropagation();else if(Ag(e,i),t&4&&-1<bE.indexOf(e)){for(;a!==null;){var s=To(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Bs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-vi(r);o.entanglements[1]|=l,r&=~l}da(s),!(Fe&6)&&(Ou=mi()+500,Zl(0))}}break;case 31:case 13:o=ur(s,2),o!==null&&ai(o,s,2),vf(),Nm(s,2)}if(s=Bh(i),s===null&&od(e,t,i,Wu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else od(e,t,i,null,n)}}function Bh(e){return e=qp(e),Lm(e)}var Wu=null;function Lm(e){if(Wu=null,e=Br(e),e!==null){var t=Fl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=i_(t),e!==null)return e;e=null}else if(n===31){if(e=a_(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return Wu=e,null}function BS(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(lM()){case l_:return 2;case c_:return 8;case Su:case cM:return 32;case u_:return 268435456;default:return 32}default:return 32}}var Fh=!1,Ss=null,ys=null,Ms=null,Ll=new Map,Ol=new Map,ss=[],bE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function Ag(e,t){switch(e){case"focusin":case"focusout":Ss=null;break;case"dragenter":case"dragleave":ys=null;break;case"mouseover":case"mouseout":Ms=null;break;case"pointerover":case"pointerout":Ll.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ol.delete(t.pointerId)}}function Ho(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=To(t),t!==null&&IS(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function EE(e,t,n,i,a){switch(t){case"focusin":return Ss=Ho(Ss,e,t,n,i,a),!0;case"dragenter":return ys=Ho(ys,e,t,n,i,a),!0;case"mouseover":return Ms=Ho(Ms,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return Ll.set(s,Ho(Ll.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ol.set(s,Ho(Ol.get(s)||null,e,t,n,i,a)),!0}return!1}function FS(e){var t=Br(e.target);if(t!==null){var n=Fl(t);if(n!==null){if(t=n.tag,t===13){if(t=i_(n),t!==null){e.blockedOn=t,u0(e.priority,function(){Tg(n)});return}}else if(t===31){if(t=a_(n),t!==null){e.blockedOn=t,u0(e.priority,function(){Tg(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ou(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);ih=i,n.target.dispatchEvent(i),ih=null}else return t=To(n),t!==null&&IS(t),e.blockedOn=n,!1;t.shift()}return!0}function Rg(e,t,n){ou(e)&&n.delete(t)}function TE(){Fh=!1,Ss!==null&&ou(Ss)&&(Ss=null),ys!==null&&ou(ys)&&(ys=null),Ms!==null&&ou(Ms)&&(Ms=null),Ll.forEach(Rg),Ol.forEach(Rg)}function hc(e,t){e.blockedOn===t&&(e.blockedOn=null,Fh||(Fh=!0,yn.unstable_scheduleCallback(yn.unstable_NormalPriority,TE)))}var pc=null;function Cg(e){pc!==e&&(pc=e,yn.unstable_scheduleCallback(yn.unstable_NormalPriority,function(){pc===e&&(pc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(Lm(i||n)===null)continue;break}var s=To(n);s!==null&&(e.splice(t,3),t-=3,xh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function vo(e){function t(l){return hc(l,e)}Ss!==null&&hc(Ss,e),ys!==null&&hc(ys,e),Ms!==null&&hc(Ms,e),Ll.forEach(t),Ol.forEach(t);for(var n=0;n<ss.length;n++){var i=ss[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ss.length&&(n=ss[0],n.blockedOn===null);)FS(n),n.blockedOn===null&&ss.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[ri]||null;if(typeof s=="function")r||Cg(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[ri]||null)o=r.formAction;else if(Lm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),Cg(n)}}}function HS(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function Om(e){this._internalRoot=e}Sf.prototype.render=Om.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(mt(409));var n=t.current,i=_i();zS(n,i,e,t,null,null)};Sf.prototype.unmount=Om.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;zS(e.current,2,null,e,null,null),vf(),t[Eo]=null}};function Sf(e){this._internalRoot=e}Sf.prototype.unstable_scheduleHydration=function(e){if(e){var t=m_();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ss.length&&t!==0&&t<ss[n].priority;n++);ss.splice(n,0,e),n===0&&FS(e)}};var wg=e_.version;if(wg!=="19.2.8")throw Error(mt(527,wg,"19.2.8"));He.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(mt(188)):(e=Object.keys(e).join(","),Error(mt(268,e)));return e=eM(t),e=e!==null?s_(e):null,e=e===null?null:e.stateNode,e};var AE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:se,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mc.isDisabled&&mc.supportsFiber)try{Hl=mc.inject(AE),gi=mc}catch{}}nf.createRoot=function(e,t){if(!n_(e))throw Error(mt(299));var n=!1,i="",a=Nx,s=Ux,r=Lx;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=OS(e,1,!1,null,null,n,i,null,a,s,r,HS),e[Eo]=t.current,Cm(e),new Om(t)};nf.hydrateRoot=function(e,t,n){if(!n_(e))throw Error(mt(299));var i=!1,a="",s=Nx,r=Ux,o=Lx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=OS(e,1,!0,t,n??null,i,a,l,s,r,o,HS),t.context=PS(null),n=t.current,i=_i(),i=Vp(i),a=gs(i),a.callback=null,vs(n,a,i),n=i,t.current.lanes=n,Vl(t,n),da(t),e[Eo]=t.current,Cm(e),new Sf(t)};nf.version="19.2.8";function GS(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(GS)}catch(e){console.error(e)}}GS(),jv.exports=nf;var RE=jv.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Pm="185",CE=0,Dg=1,wE=2,lu=1,DE=2,il=3,Rs=0,si=1,Ca=2,za=0,Qs=1,Zr=2,Ng=3,Ug=4,NE=5,Vs=100,UE=101,LE=102,OE=103,PE=104,zE=200,IE=201,BE=202,FE=203,Hh=204,Gh=205,HE=206,GE=207,VE=208,kE=209,XE=210,WE=211,qE=212,YE=213,ZE=214,Vh=0,kh=1,Xh=2,_o=3,Wh=4,qh=5,Yh=6,Zh=7,VS=0,jE=1,KE=2,la=0,kS=1,XS=2,WS=3,qS=4,YS=5,ZS=6,jS=7,KS=300,ir=301,xo=302,ud=303,fd=304,yf=306,jh=1e3,Ua=1001,Kh=1002,In=1003,QE=1004,gc=1005,kn=1006,dd=1007,Xs=1008,Oi=1009,QS=1010,JS=1011,Pl=1012,zm=1013,ua=1014,Zi=1015,ka=1016,Im=1017,Bm=1018,zl=1020,$S=35902,ty=35899,ey=1021,ny=1022,ji=1023,Xa=1026,Ws=1027,Fm=1028,Hm=1029,ar=1030,Gm=1031,Vm=1033,cu=33776,uu=33777,fu=33778,du=33779,Qh=35840,Jh=35841,$h=35842,tp=35843,ep=36196,np=37492,ip=37496,ap=37488,sp=37489,qu=37490,rp=37491,op=37808,lp=37809,cp=37810,up=37811,fp=37812,dp=37813,hp=37814,pp=37815,mp=37816,gp=37817,vp=37818,_p=37819,xp=37820,Sp=37821,yp=36492,Mp=36494,bp=36495,Ep=36283,Tp=36284,Yu=36285,Ap=36286,JE=3200,Lg=0,$E=1,rs="",Ai="srgb",Zu="srgb-linear",ju="linear",We="srgb",_r=7680,Og=519,t1=512,e1=513,n1=514,km=515,i1=516,a1=517,Xm=518,s1=519,Pg=35044,zg="300 es",ra=2e3,Ku=2001;function r1(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Qu(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function o1(){const e=Qu("canvas");return e.style.display="block",e}const Ig={};function Bg(...e){const t="THREE."+e.shift();console.log(t,...e)}function iy(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function ie(...e){e=iy(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Pe(...e){e=iy(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ao(...e){const t=e.join(" ");t in Ig||(Ig[t]=!0,ie(...e))}function l1(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const c1={[Vh]:kh,[Xh]:Yh,[Wh]:Zh,[_o]:qh,[kh]:Vh,[Yh]:Xh,[Zh]:Wh,[qh]:_o};class dr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const a=i[t];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hu=Math.PI/180,Rp=180/Math.PI;function Ql(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gn[e&255]+Gn[e>>8&255]+Gn[e>>16&255]+Gn[e>>24&255]+"-"+Gn[t&255]+Gn[t>>8&255]+"-"+Gn[t>>16&15|64]+Gn[t>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[i&255]+Gn[i>>8&255]+Gn[i>>16&255]+Gn[i>>24&255]).toLowerCase()}function De(e,t,n){return Math.max(t,Math.min(n,e))}function u1(e,t){return(e%t+t)%t}function hd(e,t,n){return(1-n)*e+n*t}function Go(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ei(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Km=class Km{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=De(this.x,t.x,n.x),this.y=De(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=De(this.x,t,n),this.y=De(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(De(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(De(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Km.prototype.isVector2=!0;let Ge=Km;class No{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],h=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],y=s[r+3];if(h!==y||l!==u||c!==p||d!==g){let m=l*u+c*p+d*g+h*y;m<0&&(u=-u,p=-p,g=-g,y=-y,m=-m);let f=1-o;if(m<.9995){const v=Math.acos(m),M=Math.sin(v);f=Math.sin(f*v)/M,o=Math.sin(o*v)/M,l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+y*o}else{l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+y*o;const v=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=v,c*=v,d*=v,h*=v}}t[n]=l,t[n+1]=c,t[n+2]=d,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],h=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return t[n]=o*g+d*h+l*p-c*u,t[n+1]=l*g+d*u+c*h-o*p,t[n+2]=c*g+d*p+o*u-l*h,t[n+3]=d*g-o*h-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),h=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:ie("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(De(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Qm=class Qm{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Fg.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Fg.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){const n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),d=2*(o*n-s*a),h=2*(s*i-r*n);return this.x=n+l*c+r*h-o*d,this.y=i+l*d+o*c-s*h,this.z=a+l*h+s*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=De(this.x,t.x,n.x),this.y=De(this.y,t.y,n.y),this.z=De(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=De(this.x,t,n),this.y=De(this.y,t,n),this.z=De(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(De(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return pd.copy(this).projectOnVector(t),this.sub(pd)}reflect(t){return this.sub(pd.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(De(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Qm.prototype.isVector3=!0;let J=Qm;const pd=new J,Fg=new No,Jm=class Jm{constructor(t,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){const d=this.elements;return d[0]=t,d[1]=a,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],y=a[0],m=a[3],f=a[6],v=a[1],M=a[4],S=a[7],U=a[2],C=a[5],E=a[8];return s[0]=r*y+o*v+l*U,s[3]=r*m+o*M+l*C,s[6]=r*f+o*S+l*E,s[1]=c*y+d*v+h*U,s[4]=c*m+d*M+h*C,s[7]=c*f+d*S+h*E,s[2]=u*y+p*v+g*U,s[5]=u*m+p*M+g*C,s[8]=u*f+p*S+g*E,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return n*r*d-n*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],h=d*r-o*c,u=o*l-d*s,p=c*s-r*l,g=n*h+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=h*y,t[1]=(a*c-d*i)*y,t[2]=(o*i-a*r)*y,t[3]=u*y,t[4]=(d*n-a*l)*y,t[5]=(a*s-o*n)*y,t[6]=p*y,t[7]=(i*l-c*n)*y,t[8]=(r*n-i*s)*y,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return ao("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(md.makeScale(t,n)),this}rotate(t){return ao("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(md.makeRotation(-t)),this}translate(t,n){return ao("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(md.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Jm.prototype.isMatrix3=!0;let de=Jm;const md=new de,Hg=new de().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gg=new de().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function f1(){const e={enabled:!0,workingColorSpace:Zu,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===We&&(a.r=Ia(a.r),a.g=Ia(a.g),a.b=Ia(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===We&&(a.r=so(a.r),a.g=so(a.g),a.b=so(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===rs?ju:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return ao("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return ao("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Zu]:{primaries:t,whitePoint:i,transfer:ju,toXYZ:Hg,fromXYZ:Gg,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:t,whitePoint:i,transfer:We,toXYZ:Hg,fromXYZ:Gg,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),e}const we=f1();function Ia(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function so(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let xr;class d1{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{xr===void 0&&(xr=Qu("canvas")),xr.width=t.width,xr.height=t.height;const a=xr.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=xr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Qu("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Ia(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ia(n[i]/255)*255):n[i]=Ia(n[i]);return{data:n,width:t.width,height:t.height}}else return ie("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let h1=0;class Wm{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:h1++}),this.uuid=Ql(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(gd(a[r].image)):s.push(gd(a[r]))}else s=gd(a);i.url=s}return n||(t.images[this.uuid]=i),i}}function gd(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?d1.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(ie("Texture: Unable to serialize Texture."),{})}let p1=0;const vd=new J;class Zn extends dr{constructor(t=Zn.DEFAULT_IMAGE,n=Zn.DEFAULT_MAPPING,i=Ua,a=Ua,s=kn,r=Xs,o=ji,l=Oi,c=Zn.DEFAULT_ANISOTROPY,d=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p1++}),this.uuid=Ql(),this.name="",this.source=new Wm(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new de,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vd).x}get height(){return this.source.getSize(vd).y}get depth(){return this.source.getSize(vd).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){ie(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){ie(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==KS)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jh:t.x=t.x-Math.floor(t.x);break;case Ua:t.x=t.x<0?0:1;break;case Kh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jh:t.y=t.y-Math.floor(t.y);break;case Ua:t.y=t.y<0?0:1;break;case Kh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Zn.DEFAULT_IMAGE=null;Zn.DEFAULT_MAPPING=KS;Zn.DEFAULT_ANISOTROPY=1;const $m=class $m{constructor(t=0,n=0,i=0,a=1){this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s;const l=t.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],y=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+y)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,S=(p+1)/2,U=(f+1)/2,C=(d+u)/4,E=(h+y)/4,_=(g+m)/4;return M>S&&M>U?M<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(M),a=C/i,s=E/i):S>U?S<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(S),i=C/a,s=_/a):U<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(U),i=E/s,a=_/s),this.set(i,a,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(h-y)*(h-y)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-y)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=De(this.x,t.x,n.x),this.y=De(this.y,t.y,n.y),this.z=De(this.z,t.z,n.z),this.w=De(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=De(this.x,t,n),this.y=De(this.y,t,n),this.z=De(this.z,t,n),this.w=De(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(De(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};$m.prototype.isVector4=!0;let fn=$m;class m1 extends dr{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new fn(0,0,t,n),this.scissorTest=!1,this.viewport=new fn(0,0,t,n),this.textures=[];const a={width:t,height:n,depth:i.depth},s=new Zn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},t.textures[n].image);this.textures[n].source=new Wm(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ca extends m1{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class ay extends Zn{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class g1 extends Zn{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const tf=class tf{constructor(t,n,i,a,s,r,o,l,c,d,h,u,p,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,d,h,u,p,g,y,m)}set(t,n,i,a,s,r,o,l,c,d,h,u,p,g,y,m){const f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=y,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tf().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,i=t.elements,a=1/Sr.setFromMatrixColumn(t,0).length(),s=1/Sr.setFromMatrixColumn(t,1).length(),r=1/Sr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const u=r*d,p=r*h,g=o*d,y=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=u-y*c,n[9]=-o*l,n[2]=y-u*c,n[6]=g+p*c,n[10]=r*l}else if(t.order==="YXZ"){const u=l*d,p=l*h,g=c*d,y=c*h;n[0]=u+y*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*h,n[5]=r*d,n[9]=-o,n[2]=p*o-g,n[6]=y+u*o,n[10]=r*l}else if(t.order==="ZXY"){const u=l*d,p=l*h,g=c*d,y=c*h;n[0]=u-y*o,n[4]=-r*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*d,n[9]=y-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){const u=r*d,p=r*h,g=o*d,y=o*h;n[0]=l*d,n[4]=g*c-p,n[8]=u*c+y,n[1]=l*h,n[5]=y*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){const u=r*l,p=r*c,g=o*l,y=o*c;n[0]=l*d,n[4]=y-u*h,n[8]=g*h+p,n[1]=h,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*h+g,n[10]=u-y*h}else if(t.order==="XZY"){const u=r*l,p=r*c,g=o*l,y=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=u*h+y,n[5]=r*d,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*d,n[10]=y*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(v1,t,_1)}lookAt(t,n,i){const a=this.elements;return ci.subVectors(t,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Za.crossVectors(i,ci),Za.lengthSq()===0&&(Math.abs(i.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Za.crossVectors(i,ci)),Za.normalize(),vc.crossVectors(ci,Za),a[0]=Za.x,a[4]=vc.x,a[8]=ci.x,a[1]=Za.y,a[5]=vc.y,a[9]=ci.y,a[2]=Za.z,a[6]=vc.z,a[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],y=i[6],m=i[10],f=i[14],v=i[3],M=i[7],S=i[11],U=i[15],C=a[0],E=a[4],_=a[8],w=a[12],D=a[1],L=a[5],I=a[9],P=a[13],V=a[2],k=a[6],B=a[10],F=a[14],O=a[3],X=a[7],ht=a[11],bt=a[15];return s[0]=r*C+o*D+l*V+c*O,s[4]=r*E+o*L+l*k+c*X,s[8]=r*_+o*I+l*B+c*ht,s[12]=r*w+o*P+l*F+c*bt,s[1]=d*C+h*D+u*V+p*O,s[5]=d*E+h*L+u*k+p*X,s[9]=d*_+h*I+u*B+p*ht,s[13]=d*w+h*P+u*F+p*bt,s[2]=g*C+y*D+m*V+f*O,s[6]=g*E+y*L+m*k+f*X,s[10]=g*_+y*I+m*B+f*ht,s[14]=g*w+y*P+m*F+f*bt,s[3]=v*C+M*D+S*V+U*O,s[7]=v*E+M*L+S*k+U*X,s[11]=v*_+M*I+S*B+U*ht,s[15]=v*w+M*P+S*F+U*bt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],d=t[2],h=t[6],u=t[10],p=t[14],g=t[3],y=t[7],m=t[11],f=t[15],v=l*p-c*u,M=o*p-c*h,S=o*u-l*h,U=r*p-c*d,C=r*u-l*d,E=r*h-o*d;return n*(y*v-m*M+f*S)-i*(g*v-m*U+f*C)+a*(g*M-y*U+f*E)-s*(g*S-y*C+m*E)}determinantAffine(){const t=this.elements,n=t[0],i=t[4],a=t[8],s=t[1],r=t[5],o=t[9],l=t[2],c=t[6],d=t[10];return n*(r*d-o*c)-i*(s*d-o*l)+a*(s*c-r*l)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],h=t[9],u=t[10],p=t[11],g=t[12],y=t[13],m=t[14],f=t[15],v=n*o-i*r,M=n*l-a*r,S=n*c-s*r,U=i*l-a*o,C=i*c-s*o,E=a*c-s*l,_=d*y-h*g,w=d*m-u*g,D=d*f-p*g,L=h*m-u*y,I=h*f-p*y,P=u*f-p*m,V=v*P-M*I+S*L+U*D-C*w+E*_;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/V;return t[0]=(o*P-l*I+c*L)*k,t[1]=(a*I-i*P-s*L)*k,t[2]=(y*E-m*C+f*U)*k,t[3]=(u*C-h*E-p*U)*k,t[4]=(l*D-r*P-c*w)*k,t[5]=(n*P-a*D+s*w)*k,t[6]=(m*S-g*E-f*M)*k,t[7]=(d*E-u*S+p*M)*k,t[8]=(r*I-o*D+c*_)*k,t[9]=(i*D-n*I-s*_)*k,t[10]=(g*C-y*S+f*v)*k,t[11]=(h*S-d*C-p*v)*k,t[12]=(o*w-r*L-l*_)*k,t[13]=(n*L-i*w+a*_)*k,t[14]=(y*M-g*U-m*v)*k,t[15]=(d*U-h*M+u*v)*k,this}scale(t){const n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,d=r+r,h=o+o,u=s*c,p=s*d,g=s*h,y=r*d,m=r*h,f=o*h,v=l*c,M=l*d,S=l*h,U=i.x,C=i.y,E=i.z;return a[0]=(1-(y+f))*U,a[1]=(p+S)*U,a[2]=(g-M)*U,a[3]=0,a[4]=(p-S)*C,a[5]=(1-(u+f))*C,a[6]=(m+v)*C,a[7]=0,a[8]=(g+M)*E,a[9]=(m-v)*E,a[10]=(1-(u+y))*E,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){const a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=Sr.set(a[0],a[1],a[2]).length();const o=Sr.set(a[4],a[5],a[6]).length(),l=Sr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Xi.copy(this);const c=1/r,d=1/o,h=1/l;return Xi.elements[0]*=c,Xi.elements[1]*=c,Xi.elements[2]*=c,Xi.elements[4]*=d,Xi.elements[5]*=d,Xi.elements[6]*=d,Xi.elements[8]*=h,Xi.elements[9]*=h,Xi.elements[10]*=h,n.setFromRotationMatrix(Xi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2*s/(n-t),h=2*s/(i-a),u=(n+t)/(n-t),p=(i+a)/(i-a);let g,y;if(l)g=s/(r-s),y=r*s/(r-s);else if(o===ra)g=-(r+s)/(r-s),y=-2*r*s/(r-s);else if(o===Ku)g=-r/(r-s),y=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2/(n-t),h=2/(i-a),u=-(n+t)/(n-t),p=-(i+a)/(i-a);let g,y;if(l)g=1/(r-s),y=r/(r-s);else if(o===ra)g=-2/(r-s),y=-(r+s)/(r-s);else if(o===Ku)g=-1/(r-s),y=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};tf.prototype.isMatrix4=!0;let en=tf;const Sr=new J,Xi=new en,v1=new J(0,0,0),_1=new J(1,1,1),Za=new J,vc=new J,ci=new J,Vg=new en,kg=new No;class sr{constructor(t=0,n=0,i=0,a=sr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],h=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(De(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-De(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(De(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-De(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(De(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-De(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:ie("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Vg.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Vg,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return kg.setFromEuler(this),this.setFromQuaternion(kg,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sr.DEFAULT_ORDER="XYZ";class sy{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let x1=0;const Xg=new J,yr=new No,xa=new en,_c=new J,Vo=new J,S1=new J,y1=new No,Wg=new J(1,0,0),qg=new J(0,1,0),Yg=new J(0,0,1),Zg={type:"added"},M1={type:"removed"},Mr={type:"childadded",child:null},_d={type:"childremoved",child:null};class jn extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:x1++}),this.uuid=Ql(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=jn.DEFAULT_UP.clone();const t=new J,n=new sr,i=new No,a=new J(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new en},normalMatrix:{value:new de}}),this.matrix=new en,this.matrixWorld=new en,this.matrixAutoUpdate=jn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new sy,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return yr.setFromAxisAngle(t,n),this.quaternion.multiply(yr),this}rotateOnWorldAxis(t,n){return yr.setFromAxisAngle(t,n),this.quaternion.premultiply(yr),this}rotateX(t){return this.rotateOnAxis(Wg,t)}rotateY(t){return this.rotateOnAxis(qg,t)}rotateZ(t){return this.rotateOnAxis(Yg,t)}translateOnAxis(t,n){return Xg.copy(t).applyQuaternion(this.quaternion),this.position.add(Xg.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Wg,t)}translateY(t){return this.translateOnAxis(qg,t)}translateZ(t){return this.translateOnAxis(Yg,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?_c.copy(t):_c.set(t,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(Vo,_c,this.up):xa.lookAt(_c,Vo,this.up),this.quaternion.setFromRotationMatrix(xa),a&&(xa.extractRotation(a.matrixWorld),yr.setFromRotationMatrix(xa),this.quaternion.premultiply(yr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Pe("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Zg),Mr.child=t,this.dispatchEvent(Mr),Mr.child=null):Pe("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(M1),_d.child=t,this.dispatchEvent(_d),_d.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xa.multiply(t.parent.matrixWorld)),t.applyMatrix4(xa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Zg),Mr.child=t,this.dispatchEvent(Mr),Mr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,t,S1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,y1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,a=t.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),h=r(t.shapes),u=r(t.skeletons),p=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const a=t.children[i];this.add(a.clone())}return this}}jn.DEFAULT_UP=new J(0,1,0);jn.DEFAULT_MATRIX_AUTO_UPDATE=!0;jn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xc extends jn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const b1={type:"move"};class xd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const y of t.hand.values()){const m=n.getJointPose(y,i),f=this._getHandJoint(c,y);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(b1)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new xc;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const ry={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ja={h:0,s:0,l:0},Sc={h:0,s:0,l:0};function Sd(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class Ae{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,we.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=we.workingColorSpace){return this.r=t,this.g=n,this.b=i,we.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=we.workingColorSpace){if(t=u1(t,1),n=De(n,0,1),i=De(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Sd(r,s,t+1/3),this.g=Sd(r,s,t),this.b=Sd(r,s,t-1/3)}return we.colorSpaceToWorking(this,a),this}setStyle(t,n=Ai){function i(s){s!==void 0&&parseFloat(s)<1&&ie("Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:ie("Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);ie("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ai){const i=ry[t.toLowerCase()];return i!==void 0?this.setHex(i,n):ie("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ia(t.r),this.g=Ia(t.g),this.b=Ia(t.b),this}copyLinearToSRGB(t){return this.r=so(t.r),this.g=so(t.g),this.b=so(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ai){return we.workingToColorSpace(Vn.copy(this),t),Math.round(De(Vn.r*255,0,255))*65536+Math.round(De(Vn.g*255,0,255))*256+Math.round(De(Vn.b*255,0,255))}getHexString(t=Ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=we.workingColorSpace){we.workingToColorSpace(Vn.copy(this),n);const i=Vn.r,a=Vn.g,s=Vn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=d<=.5?h/(r+o):h/(2-r-o),r){case i:l=(a-s)/h+(a<s?6:0);break;case a:l=(s-i)/h+2;break;case s:l=(i-a)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,n=we.workingColorSpace){return we.workingToColorSpace(Vn.copy(this),n),t.r=Vn.r,t.g=Vn.g,t.b=Vn.b,t}getStyle(t=Ai){we.workingToColorSpace(Vn.copy(this),t);const n=Vn.r,i=Vn.g,a=Vn.b;return t!==Ai?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(ja),this.setHSL(ja.h+t,ja.s+n,ja.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ja),t.getHSL(Sc);const i=hd(ja.h,Sc.h,n),a=hd(ja.s,Sc.s,n),s=hd(ja.l,Sc.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new Ae;Ae.NAMES=ry;class qm{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ae(t),this.density=n}clone(){return new qm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class oy extends jn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sr,this.environmentIntensity=1,this.environmentRotation=new sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Wi=new J,Sa=new J,yd=new J,ya=new J,br=new J,Er=new J,jg=new J,Md=new J,bd=new J,Ed=new J,Td=new fn,Ad=new fn,Rd=new fn;class Pi{constructor(t=new J,n=new J,i=new J){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),Wi.subVectors(t,n),a.cross(Wi);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){Wi.subVectors(a,n),Sa.subVectors(i,n),yd.subVectors(t,n);const r=Wi.dot(Wi),o=Wi.dot(Sa),l=Wi.dot(yd),c=Sa.dot(Sa),d=Sa.dot(yd),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*d)*u,g=(r*d-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,ya)===null?!1:ya.x>=0&&ya.y>=0&&ya.x+ya.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,ya)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ya.x),l.addScaledVector(r,ya.y),l.addScaledVector(o,ya.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return Td.setScalar(0),Ad.setScalar(0),Rd.setScalar(0),Td.fromBufferAttribute(t,n),Ad.fromBufferAttribute(t,i),Rd.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(Td,s.x),r.addScaledVector(Ad,s.y),r.addScaledVector(Rd,s.z),r}static isFrontFacing(t,n,i,a){return Wi.subVectors(i,n),Sa.subVectors(t,n),Wi.cross(Sa).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wi.subVectors(this.c,this.b),Sa.subVectors(this.a,this.b),Wi.cross(Sa).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Pi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return Pi.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return Pi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,a=this.b,s=this.c;let r,o;br.subVectors(a,i),Er.subVectors(s,i),Md.subVectors(t,i);const l=br.dot(Md),c=Er.dot(Md);if(l<=0&&c<=0)return n.copy(i);bd.subVectors(t,a);const d=br.dot(bd),h=Er.dot(bd);if(d>=0&&h<=d)return n.copy(a);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(br,r);Ed.subVectors(t,s);const p=br.dot(Ed),g=Er.dot(Ed);if(g>=0&&p<=g)return n.copy(s);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Er,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return jg.subVectors(s,a),o=(h-d)/(h-d+(p-g)),n.copy(a).addScaledVector(jg,o);const f=1/(m+y+u);return r=y*f,o=u*f,n.copy(i).addScaledVector(br,r).addScaledVector(Er,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class hr{constructor(t=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(qi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(qi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=qi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,qi):qi.fromBufferAttribute(s,r),qi.applyMatrix4(t.matrixWorld),this.expandByPoint(qi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),yc.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),yc.copy(i.boundingBox)),yc.applyMatrix4(t.matrixWorld),this.union(yc)}const a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qi),qi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ko),Mc.subVectors(this.max,ko),Tr.subVectors(t.a,ko),Ar.subVectors(t.b,ko),Rr.subVectors(t.c,ko),Ka.subVectors(Ar,Tr),Qa.subVectors(Rr,Ar),Ls.subVectors(Tr,Rr);let n=[0,-Ka.z,Ka.y,0,-Qa.z,Qa.y,0,-Ls.z,Ls.y,Ka.z,0,-Ka.x,Qa.z,0,-Qa.x,Ls.z,0,-Ls.x,-Ka.y,Ka.x,0,-Qa.y,Qa.x,0,-Ls.y,Ls.x,0];return!Cd(n,Tr,Ar,Rr,Mc)||(n=[1,0,0,0,1,0,0,0,1],!Cd(n,Tr,Ar,Rr,Mc))?!1:(bc.crossVectors(Ka,Qa),n=[bc.x,bc.y,bc.z],Cd(n,Tr,Ar,Rr,Mc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ma),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ma=[new J,new J,new J,new J,new J,new J,new J,new J],qi=new J,yc=new hr,Tr=new J,Ar=new J,Rr=new J,Ka=new J,Qa=new J,Ls=new J,ko=new J,Mc=new J,bc=new J,Os=new J;function Cd(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){Os.fromArray(e,s);const o=a.x*Math.abs(Os.x)+a.y*Math.abs(Os.y)+a.z*Math.abs(Os.z),l=t.dot(Os),c=n.dot(Os),d=i.dot(Os);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const mn=new J,Ec=new Ge;let E1=0;class Xe extends dr{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:E1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Pg,this.updateRanges=[],this.gpuType=Zi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ec.fromBufferAttribute(this,n),Ec.applyMatrix3(t),this.setXY(n,Ec.x,Ec.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Go(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=ei(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Go(n,this.array)),n}setX(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Go(n,this.array)),n}setY(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Go(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Go(n,this.array)),n}setW(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),i=ei(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),i=ei(i,this.array),a=ei(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),i=ei(i,this.array),a=ei(a,this.array),s=ei(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Pg&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class ly extends Xe{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class cy extends Xe{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Bi extends Xe{constructor(t,n,i){super(new Float32Array(t),n,i)}}const T1=new hr,Xo=new J,wd=new J;class pr{constructor(t=new J,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):T1.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xo.subVectors(t,this.center);const n=Xo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Xo,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(wd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xo.copy(t.center).add(wd)),this.expandByPoint(Xo.copy(t.center).sub(wd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let A1=0;const Ei=new en,Dd=new jn,Cr=new J,ui=new hr,Wo=new hr,Tn=new J;class Xn extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:A1++}),this.uuid=Ql(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(r1(t)?cy:ly)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new de().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,n,i){return Ei.makeTranslation(t,n,i),this.applyMatrix4(Ei),this}scale(t,n,i){return Ei.makeScale(t,n,i),this.applyMatrix4(Ei),this}lookAt(t){return Dd.lookAt(t),Dd.updateMatrix(),this.applyMatrix4(Dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=t.length;a<s;a++){const r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Bi(i,3))}else{const i=Math.min(t.length,n.count);for(let a=0;a<i;a++){const s=t[a];n.setXYZ(a,s.x,s.y,s.z||0)}t.length>n.count&&ie("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];ui.setFromBufferAttribute(s),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Pe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Pe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(t){const i=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Wo.setFromBufferAttribute(o),this.morphTargetsRelative?(Tn.addVectors(ui.min,Wo.min),ui.expandByPoint(Tn),Tn.addVectors(ui.max,Wo.max),ui.expandByPoint(Tn)):(ui.expandByPoint(Wo.min),ui.expandByPoint(Wo.max))}ui.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)Tn.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(Tn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Tn.fromBufferAttribute(o,c),l&&(Cr.fromBufferAttribute(t,c),Tn.add(Cr)),a=Math.max(a,i.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&Pe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Pe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Xe(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let _=0;_<i.count;_++)o[_]=new J,l[_]=new J;const c=new J,d=new J,h=new J,u=new Ge,p=new Ge,g=new Ge,y=new J,m=new J;function f(_,w,D){c.fromBufferAttribute(i,_),d.fromBufferAttribute(i,w),h.fromBufferAttribute(i,D),u.fromBufferAttribute(s,_),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,D),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(y.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(L),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(L),o[_].add(y),o[w].add(y),o[D].add(y),l[_].add(m),l[w].add(m),l[D].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let _=0,w=v.length;_<w;++_){const D=v[_],L=D.start,I=D.count;for(let P=L,V=L+I;P<V;P+=3)f(t.getX(P+0),t.getX(P+1),t.getX(P+2))}const M=new J,S=new J,U=new J,C=new J;function E(_){U.fromBufferAttribute(a,_),C.copy(U);const w=o[_];M.copy(w),M.sub(U.multiplyScalar(U.dot(w))).normalize(),S.crossVectors(C,w);const L=S.dot(l[_])<0?-1:1;r.setXYZW(_,M.x,M.y,M.z,L)}for(let _=0,w=v.length;_<w;++_){const D=v[_],L=D.start,I=D.count;for(let P=L,V=L+I;P<V;P+=3)E(t.getX(P+0)),E(t.getX(P+1)),E(t.getX(P+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Xe(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new J,s=new J,r=new J,o=new J,l=new J,c=new J,d=new J,h=new J;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),y=t.getX(u+1),m=t.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,y),r.fromBufferAttribute(n,m),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,y),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(y,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Tn.fromBufferAttribute(t,n),Tn.normalize(),t.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let y=0,m=l.length;y<m;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new Xe(u,d,h)}if(this.index===null)return ie("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Xn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=t(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(t.data))}d.length>0&&(a[l]=d,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const a=t.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const s=t.morphAttributes;for(const c in s){const d=[],h=s[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let R1=0;class Uo extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:R1++}),this.uuid=Ql(),this.name="",this.type="Material",this.blending=Qs,this.side=Rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hh,this.blendDst=Gh,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=_o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Og,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){ie(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){ie(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(i.blending=this.blending),this.side!==Rs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hh&&(i.blendSrc=this.blendSrc),this.blendDst!==Gh&&(i.blendDst=this.blendDst),this.blendEquation!==Vs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_o&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Og&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_r&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_r&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_r&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new Ae().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ge().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ge().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ba=new J,Nd=new J,Tc=new J,Ja=new J,Ud=new J,Ac=new J,Ld=new J;class Ym{constructor(t=new J,n=new J(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ba)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ba.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ba.copy(this.origin).addScaledVector(this.direction,n),ba.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){Nd.copy(t).add(n).multiplyScalar(.5),Tc.copy(n).sub(t).normalize(),Ja.copy(this.origin).sub(Nd);const s=t.distanceTo(n)*.5,r=-this.direction.dot(Tc),o=Ja.dot(this.direction),l=-Ja.dot(Tc),c=Ja.lengthSq(),d=Math.abs(1-r*r);let h,u,p,g;if(d>0)if(h=r*l-o,u=r*o-l,g=s*d,h>=0)if(u>=-g)if(u<=g){const y=1/d;h*=y,u*=y,p=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(Nd).addScaledVector(Tc,u),p}intersectSphere(t,n){ba.subVectors(t.center,this.origin);const i=ba.dot(this.direction),a=ba.dot(ba)-i*i,s=t.radius*t.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),d>=0?(s=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(s=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(t.min.z-u.z)*h,l=(t.max.z-u.z)*h):(o=(t.max.z-u.z)*h,l=(t.min.z-u.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,ba)!==null}intersectTriangle(t,n,i,a,s){Ud.subVectors(n,t),Ac.subVectors(i,t),Ld.crossVectors(Ud,Ac);let r=this.direction.dot(Ld),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ja.subVectors(this.origin,t);const l=o*this.direction.dot(Ac.crossVectors(Ja,Ac));if(l<0)return null;const c=o*this.direction.dot(Ud.cross(Ja));if(c<0||l+c>r)return null;const d=-o*Ja.dot(Ld);return d<0?null:this.at(d/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class uy extends Uo{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.combine=VS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Kg=new en,Ps=new Ym,Rc=new pr,Qg=new J,Cc=new J,wc=new J,Dc=new J,Od=new J,Nc=new J,Jg=new J,Uc=new J;class Hi extends jn{constructor(t=new Xn,n=new uy){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(s&&o){Nc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Od.fromBufferAttribute(h,t),r?Nc.addScaledVector(Od,d):Nc.addScaledVector(Od.sub(n),d))}n.add(Nc)}return n}raycast(t,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rc.copy(i.boundingSphere),Rc.applyMatrix4(s),Ps.copy(t.ray).recast(t.near),!(Rc.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(Rc,Qg)===null||Ps.origin.distanceToSquared(Qg)>(t.far-t.near)**2))&&(Kg.copy(s).invert(),Ps.copy(t.ray).applyMatrix4(Kg),!(i.boundingBox!==null&&Ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Ps)))}_computeIntersections(t,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,y=u.length;g<y;g++){const m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,U=M;S<U;S+=3){const C=o.getX(S),E=o.getX(S+1),_=o.getX(S+2);a=Lc(this,f,t,i,c,d,h,C,E,_),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const v=o.getX(m),M=o.getX(m+1),S=o.getX(m+2);a=Lc(this,r,t,i,c,d,h,v,M,S),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,y=u.length;g<y;g++){const m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let S=v,U=M;S<U;S+=3){const C=S,E=S+1,_=S+2;a=Lc(this,f,t,i,c,d,h,C,E,_),a&&(a.faceIndex=Math.floor(S/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let m=g,f=y;m<f;m+=3){const v=m,M=m+1,S=m+2;a=Lc(this,r,t,i,c,d,h,v,M,S),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function C1(e,t,n,i,a,s,r,o){let l;if(t.side===si?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===Rs,o),l===null)return null;Uc.copy(o),Uc.applyMatrix4(e.matrixWorld);const c=n.ray.origin.distanceTo(Uc);return c<n.near||c>n.far?null:{distance:c,point:Uc.clone(),object:e}}function Lc(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,Cc),e.getVertexPosition(l,wc),e.getVertexPosition(c,Dc);const d=C1(e,t,n,i,Cc,wc,Dc,Jg);if(d){const h=new J;Pi.getBarycoord(Jg,Cc,wc,Dc,h),a&&(d.uv=Pi.getInterpolatedAttribute(a,o,l,c,h,new Ge)),s&&(d.uv1=Pi.getInterpolatedAttribute(s,o,l,c,h,new Ge)),r&&(d.normal=Pi.getInterpolatedAttribute(r,o,l,c,h,new J),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new J,materialIndex:0};Pi.getNormal(Cc,wc,Dc,u.normal),d.face=u,d.barycoord=h}return d}class fy extends Zn{constructor(t=null,n=1,i=1,a,s,r,o,l,c=In,d=In,h,u){super(null,r,o,l,c,d,a,s,h,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jr extends Xe{constructor(t,n,i,a=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const wr=new en,$g=new en,Oc=[],tv=new hr,w1=new en,qo=new Hi,Yo=new pr;class ev extends Hi{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new jr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,w1)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new hr),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,wr),tv.copy(t.boundingBox).applyMatrix4(wr),this.boundingBox.union(tv)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new pr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,wr),Yo.copy(t.boundingSphere).applyMatrix4(wr),this.boundingSphere.union(Yo)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=t*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(t,n){const i=this.matrixWorld,a=this.count;if(qo.geometry=this.geometry,qo.material=this.material,qo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yo.copy(this.boundingSphere),Yo.applyMatrix4(i),t.ray.intersectsSphere(Yo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,wr),$g.multiplyMatrices(i,wr),qo.matrixWorld=$g,qo.raycast(t,Oc);for(let r=0,o=Oc.length;r<o;r++){const l=Oc[r];l.instanceId=s,l.object=this,n.push(l)}Oc.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new jr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new fy(new Float32Array(a*this.count),a,this.count,Fm,Zi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*t;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pd=new J,D1=new J,N1=new de;class Gs{constructor(t=new J(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const a=Pd.subVectors(i,n).cross(D1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){const a=t.delta(Pd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(a,r)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||N1.getNormalMatrix(t),a=this.coplanarPoint(Pd).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zs=new pr,U1=new Ge(.5,.5),Pc=new J;class dy{constructor(t=new Gs,n=new Gs,i=new Gs,a=new Gs,s=new Gs,r=new Gs){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=ra,i=!1){const a=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],h=s[5],u=s[6],p=s[7],g=s[8],y=s[9],m=s[10],f=s[11],v=s[12],M=s[13],S=s[14],U=s[15];if(a[0].setComponents(c-r,p-d,f-g,U-v).normalize(),a[1].setComponents(c+r,p+d,f+g,U+v).normalize(),a[2].setComponents(c+o,p+h,f+y,U+M).normalize(),a[3].setComponents(c-o,p-h,f-y,U-M).normalize(),i)a[4].setComponents(l,u,m,S).normalize(),a[5].setComponents(c-l,p-u,f-m,U-S).normalize();else if(a[4].setComponents(c-l,p-u,f-m,U-S).normalize(),n===ra)a[5].setComponents(c+l,p+u,f+m,U+S).normalize();else if(n===Ku)a[5].setComponents(l,u,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(t){zs.center.set(0,0,0);const n=U1.distanceTo(t.center);return zs.radius=.7071067811865476+n,zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(t){const n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Pc.x=a.normal.x>0?t.max.x:t.min.x,Pc.y=a.normal.y>0?t.max.y:t.min.y,Pc.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(Pc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class hy extends Uo{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Ju=new J,$u=new J,nv=new en,Zo=new Ym,zc=new pr,zd=new J,iv=new J;class L1 extends jn{constructor(t=new Xn,n=new hy){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Ju.fromBufferAttribute(n,a-1),$u.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Ju.distanceTo($u);t.setAttribute("lineDistance",new Bi(i,1))}else ie("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,a=this.matrixWorld,s=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zc.copy(i.boundingSphere),zc.applyMatrix4(a),zc.radius+=s,t.ray.intersectsSphere(zc)===!1)return;nv.copy(a).invert(),Zo.copy(t.ray).applyMatrix4(nv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let y=p,m=g-1;y<m;y+=c){const f=d.getX(y),v=d.getX(y+1),M=Ic(this,t,Zo,l,f,v,y);M&&n.push(M)}if(this.isLineLoop){const y=d.getX(g-1),m=d.getX(p),f=Ic(this,t,Zo,l,y,m,g-1);f&&n.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let y=p,m=g-1;y<m;y+=c){const f=Ic(this,t,Zo,l,y,y+1,y);f&&n.push(f)}if(this.isLineLoop){const y=Ic(this,t,Zo,l,g-1,p,g-1);y&&n.push(y)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ic(e,t,n,i,a,s,r){const o=e.geometry.attributes.position;if(Ju.fromBufferAttribute(o,a),$u.fromBufferAttribute(o,s),n.distanceSqToSegment(Ju,$u,zd,iv)>i)return;zd.applyMatrix4(e.matrixWorld);const c=t.ray.origin.distanceTo(zd);if(!(c<t.near||c>t.far))return{distance:c,point:iv.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}const av=new J,sv=new J;class pu extends L1{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)av.fromBufferAttribute(n,a),sv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+av.distanceTo(sv);t.setAttribute("lineDistance",new Bi(i,1))}else ie("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class O1 extends Uo{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const rv=new en,Cp=new Ym,Bc=new pr,Fc=new J;class wp extends jn{constructor(t=new Xn,n=new O1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,a=this.matrixWorld,s=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bc.copy(i.boundingSphere),Bc.applyMatrix4(a),Bc.radius+=s,t.ray.intersectsSphere(Bc)===!1)return;rv.copy(a).invert(),Cp.copy(t.ray).applyMatrix4(rv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,y=p;g<y;g++){const m=c.getX(g);Fc.fromBufferAttribute(h,m),ov(Fc,m,l,a,t,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let g=u,y=p;g<y;g++)Fc.fromBufferAttribute(h,g),ov(Fc,g,l,a,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ov(e,t,n,i,a,s,r){const o=Cp.distanceSqToPoint(e);if(o<n){const l=new J;Cp.closestPointToPoint(e,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class py extends Zn{constructor(t=[],n=ir,i,a,s,r,o,l,c,d){super(t,n,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class So extends Zn{constructor(t,n,i=ua,a,s,r,o=In,l=In,c,d=Xa,h=1){if(d!==Xa&&d!==Ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:n,depth:h};super(u,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Wm(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class P1 extends So{constructor(t,n=ua,i=ir,a,s,r=In,o=In,l,c=Xa){const d={width:t,height:t,depth:1},h=[d,d,d,d,d,d];super(t,t,n,i,a,s,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class my extends Zn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class rr extends Xn{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,t,r,s,0),g("z","y","x",1,-1,i,n,-t,r,s,1),g("x","z","y",1,1,t,i,n,a,r,2),g("x","z","y",1,-1,t,i,-n,a,r,3),g("x","y","z",1,-1,t,n,i,a,s,4),g("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new Bi(c,3)),this.setAttribute("normal",new Bi(d,3)),this.setAttribute("uv",new Bi(h,2));function g(y,m,f,v,M,S,U,C,E,_,w){const D=S/E,L=U/_,I=S/2,P=U/2,V=C/2,k=E+1,B=_+1;let F=0,O=0;const X=new J;for(let ht=0;ht<B;ht++){const bt=ht*L-P;for(let Nt=0;Nt<k;Nt++){const re=Nt*D-I;X[y]=re*v,X[m]=bt*M,X[f]=V,c.push(X.x,X.y,X.z),X[y]=0,X[m]=0,X[f]=C>0?1:-1,d.push(X.x,X.y,X.z),h.push(Nt/E),h.push(1-ht/_),F+=1}}for(let ht=0;ht<_;ht++)for(let bt=0;bt<E;bt++){const Nt=u+bt+k*ht,re=u+bt+k*(ht+1),Qt=u+(bt+1)+k*(ht+1),ae=u+(bt+1)+k*ht;l.push(Nt,re,ae),l.push(re,Qt,ae),O+=6}o.addGroup(p,O,w),p+=O,u+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const Hc=new J,Gc=new J,Id=new J,Vc=new Pi;class z1 extends Xn{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){const a=Math.pow(10,4),s=Math.cos(hu*n),r=t.getIndex(),o=t.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:y,b:m,c:f}=Vc;if(y.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Vc.getNormal(Id),h[0]=`${Math.round(y.x*a)},${Math.round(y.y*a)},${Math.round(y.z*a)}`,h[1]=`${Math.round(m.x*a)},${Math.round(m.y*a)},${Math.round(m.z*a)}`,h[2]=`${Math.round(f.x*a)},${Math.round(f.y*a)},${Math.round(f.z*a)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const M=(v+1)%3,S=h[v],U=h[M],C=Vc[d[v]],E=Vc[d[M]],_=`${S}_${U}`,w=`${U}_${S}`;w in u&&u[w]?(Id.dot(u[w].normal)<=s&&(p.push(C.x,C.y,C.z),p.push(E.x,E.y,E.z)),u[w]=null):_ in u||(u[_]={index0:c[v],index1:c[M],normal:Id.clone()})}}for(const g in u)if(u[g]){const{index0:y,index1:m}=u[g];Hc.fromBufferAttribute(o,y),Gc.fromBufferAttribute(o,m),p.push(Hc.x,Hc.y,Hc.z),p.push(Gc.x,Gc.y,Gc.z)}this.setAttribute("position",new Bi(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class Mf extends Xn{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};const s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,h=t/o,u=n/l,p=[],g=[],y=[],m=[];for(let f=0;f<d;f++){const v=f*u-r;for(let M=0;M<c;M++){const S=M*h-s;g.push(S,-v,0),y.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){const M=v+c*f,S=v+c*(f+1),U=v+1+c*(f+1),C=v+1+c*f;p.push(M,S,C),p.push(S,U,C)}this.setIndex(p),this.setAttribute("position",new Bi(g,3)),this.setAttribute("normal",new Bi(y,3)),this.setAttribute("uv",new Bi(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mf(t.width,t.height,t.widthSegments,t.heightSegments)}}function yo(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const a=e[n][i];if(lv(a))a.isRenderTargetTexture?(ie("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone();else if(Array.isArray(a))if(lv(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();t[n][i]=s}else t[n][i]=a.slice();else t[n][i]=a}}return t}function Wn(e){const t={};for(let n=0;n<e.length;n++){const i=yo(e[n]);for(const a in i)t[a]=i[a]}return t}function lv(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function I1(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function gy(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:we.workingColorSpace}const B1={clone:yo,merge:Wn};var F1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,H1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Uo{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=F1,this.fragmentShader=H1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=yo(t.uniforms),this.uniformsGroups=I1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const i in t.uniforms){const a=t.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new Ae().setHex(a.value);break;case"v2":this.uniforms[i].value=new Ge().fromArray(a.value);break;case"v3":this.uniforms[i].value=new J().fromArray(a.value);break;case"v4":this.uniforms[i].value=new fn().fromArray(a.value);break;case"m3":this.uniforms[i].value=new de().fromArray(a.value);break;case"m4":this.uniforms[i].value=new en().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class G1 extends Bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class V1 extends Uo{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=JE,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class k1 extends Uo{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const kc=new J,Xc=new No,$i=new J;class vy extends jn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new en,this.projectionMatrix=new en,this.projectionMatrixInverse=new en,this.coordinateSystem=ra,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(kc,Xc,$i),$i.x===1&&$i.y===1&&$i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Xc,$i.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(kc,Xc,$i),$i.x===1&&$i.y===1&&$i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Xc,$i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $a=new J,cv=new Ge,uv=new Ge;class Di extends vy{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Rp*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(hu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Rp*2*Math.atan(Math.tan(hu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){$a.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($a.x,$a.y).multiplyScalar(-t/$a.z),$a.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($a.x,$a.y).multiplyScalar(-t/$a.z)}getViewSize(t,n){return this.getViewBounds(t,cv,uv),n.subVectors(uv,cv)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(hu*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Zm extends vy{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Dr=-90,Nr=1;class X1 extends jn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Di(Dr,Nr,t,n);a.layers=this.layers,this.add(a);const s=new Di(Dr,Nr,t,n);s.layers=this.layers,this.add(s);const r=new Di(Dr,Nr,t,n);r.layers=this.layers,this.add(r);const o=new Di(Dr,Nr,t,n);o.layers=this.layers,this.add(o);const l=new Di(Dr,Nr,t,n);l.layers=this.layers,this.add(l);const c=new Di(Dr,Nr,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(t===ra)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Ku)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,1,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=y,t.setRenderTarget(i,5,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(h,u,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class W1 extends Di{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const t0=class t0{constructor(t,n,i,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,a){const s=this.elements;return s[0]=t,s[2]=n,s[1]=i,s[3]=a,this}};t0.prototype.isMatrix2=!0;let fv=t0;function dv(e,t,n,i){const a=q1(i);switch(n){case ey:return e*t;case Fm:return e*t/a.components*a.byteLength;case Hm:return e*t/a.components*a.byteLength;case ar:return e*t*2/a.components*a.byteLength;case Gm:return e*t*2/a.components*a.byteLength;case ny:return e*t*3/a.components*a.byteLength;case ji:return e*t*4/a.components*a.byteLength;case Vm:return e*t*4/a.components*a.byteLength;case cu:case uu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case fu:case du:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Jh:case tp:return Math.max(e,16)*Math.max(t,8)/4;case Qh:case $h:return Math.max(e,8)*Math.max(t,8)/2;case ep:case np:case ap:case sp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ip:case qu:case rp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case op:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lp:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case cp:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case up:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case fp:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case dp:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case hp:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case pp:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case mp:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case gp:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case vp:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case _p:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case xp:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Sp:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case yp:case Mp:case bp:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ep:case Tp:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Yu:case Ap:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function q1(e){switch(e){case Oi:case QS:return{byteLength:1,components:1};case Pl:case JS:case ka:return{byteLength:2,components:1};case Im:case Bm:return{byteLength:2,components:4};case ua:case zm:case Zi:return{byteLength:4,components:1};case $S:case ty:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pm}}));typeof window<"u"&&(window.__THREE__?ie("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function _y(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function Y1(e){const t=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(e.bindBuffer(c,o),h.length===0)e.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],y=h[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,h[u]=y)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const y=h[p];e.bufferSubData(c,y.start*d.BYTES_PER_ELEMENT,d,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var Z1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,j1=`#ifdef USE_ALPHAHASH
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
#endif`,K1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Q1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,J1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tT=`#ifdef USE_AOMAP
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
#endif`,eT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,nT=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,iT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,aT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,sT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,oT=`#ifdef USE_IRIDESCENCE
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
#endif`,lT=`#ifdef USE_BUMPMAP
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
#endif`,cT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,uT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,fT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,hT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,pT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,mT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,gT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,vT=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,_T=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,xT=`vec3 transformedNormal = objectNormal;
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
#endif`,ST=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,yT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,MT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,bT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ET="gl_FragColor = linearToOutputTexel( gl_FragColor );",TT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,AT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,RT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,CT=`#ifdef USE_ENVMAP
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
#endif`,wT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,DT=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,NT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,UT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,LT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,OT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,PT=`#ifdef USE_GRADIENTMAP
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
}`,zT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,IT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,BT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,FT=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#endif
#include <lightprobes_pars_fragment>`,HT=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
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
#endif`,GT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,VT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,kT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,XT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,WT=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,qT=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
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
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
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
		return 0.5 / max( gv + gl, EPSILON );
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
	vec3 f0 = material.specularColorBlended;
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
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
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,YT=`
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
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ZT=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
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
#endif`,jT=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,KT=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,QT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,JT=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$T=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,tA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,eA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,aA=`#if defined( USE_POINTS_UV )
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
#endif`,sA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,rA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,uA=`#ifdef USE_MORPHTARGETS
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
#endif`,fA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,hA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,pA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,vA=`#ifdef USE_NORMALMAP
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
#endif`,_A=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,SA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,yA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,MA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,EA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,AA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,RA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,wA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,DA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,NA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,UA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
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
#endif`,LA=`float getShadowMask() {
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,OA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,PA=`#ifdef USE_SKINNING
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
#endif`,zA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,IA=`#ifdef USE_SKINNING
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
#endif`,BA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,FA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,HA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,GA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,VA=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,kA=`#ifdef USE_TRANSMISSION
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
#endif`,XA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,WA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ZA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jA=`uniform sampler2D t2D;
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
}`,KA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,QA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,JA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$A=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t2=`#include <common>
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
}`,e2=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,n2=`#define DISTANCE
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
}`,i2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,a2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,s2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r2=`uniform float scale;
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
}`,o2=`uniform vec3 diffuse;
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
}`,l2=`#include <common>
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
}`,c2=`uniform vec3 diffuse;
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
}`,u2=`#define LAMBERT
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
}`,f2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,d2=`#define MATCAP
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
}`,h2=`#define MATCAP
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
}`,p2=`#define NORMAL
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
}`,m2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,g2=`#define PHONG
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
}`,v2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,_2=`#define STANDARD
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
}`,x2=`#define STANDARD
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,S2=`#define TOON
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
}`,y2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,M2=`uniform float size;
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
}`,b2=`uniform vec3 diffuse;
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
}`,E2=`#include <common>
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
}`,T2=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,A2=`uniform float rotation;
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
}`,R2=`uniform vec3 diffuse;
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
}`,ve={alphahash_fragment:Z1,alphahash_pars_fragment:j1,alphamap_fragment:K1,alphamap_pars_fragment:Q1,alphatest_fragment:J1,alphatest_pars_fragment:$1,aomap_fragment:tT,aomap_pars_fragment:eT,batching_pars_vertex:nT,batching_vertex:iT,begin_vertex:aT,beginnormal_vertex:sT,bsdfs:rT,iridescence_fragment:oT,bumpmap_pars_fragment:lT,clipping_planes_fragment:cT,clipping_planes_pars_fragment:uT,clipping_planes_pars_vertex:fT,clipping_planes_vertex:dT,color_fragment:hT,color_pars_fragment:pT,color_pars_vertex:mT,color_vertex:gT,common:vT,cube_uv_reflection_fragment:_T,defaultnormal_vertex:xT,displacementmap_pars_vertex:ST,displacementmap_vertex:yT,emissivemap_fragment:MT,emissivemap_pars_fragment:bT,colorspace_fragment:ET,colorspace_pars_fragment:TT,envmap_fragment:AT,envmap_common_pars_fragment:RT,envmap_pars_fragment:CT,envmap_pars_vertex:wT,envmap_physical_pars_fragment:HT,envmap_vertex:DT,fog_vertex:NT,fog_pars_vertex:UT,fog_fragment:LT,fog_pars_fragment:OT,gradientmap_pars_fragment:PT,lightmap_pars_fragment:zT,lights_lambert_fragment:IT,lights_lambert_pars_fragment:BT,lights_pars_begin:FT,lights_toon_fragment:GT,lights_toon_pars_fragment:VT,lights_phong_fragment:kT,lights_phong_pars_fragment:XT,lights_physical_fragment:WT,lights_physical_pars_fragment:qT,lights_fragment_begin:YT,lights_fragment_maps:ZT,lights_fragment_end:jT,lightprobes_pars_fragment:KT,logdepthbuf_fragment:QT,logdepthbuf_pars_fragment:JT,logdepthbuf_pars_vertex:$T,logdepthbuf_vertex:tA,map_fragment:eA,map_pars_fragment:nA,map_particle_fragment:iA,map_particle_pars_fragment:aA,metalnessmap_fragment:sA,metalnessmap_pars_fragment:rA,morphinstance_vertex:oA,morphcolor_vertex:lA,morphnormal_vertex:cA,morphtarget_pars_vertex:uA,morphtarget_vertex:fA,normal_fragment_begin:dA,normal_fragment_maps:hA,normal_pars_fragment:pA,normal_pars_vertex:mA,normal_vertex:gA,normalmap_pars_fragment:vA,clearcoat_normal_fragment_begin:_A,clearcoat_normal_fragment_maps:xA,clearcoat_pars_fragment:SA,iridescence_pars_fragment:yA,opaque_fragment:MA,packing:bA,premultiplied_alpha_fragment:EA,project_vertex:TA,dithering_fragment:AA,dithering_pars_fragment:RA,roughnessmap_fragment:CA,roughnessmap_pars_fragment:wA,shadowmap_pars_fragment:DA,shadowmap_pars_vertex:NA,shadowmap_vertex:UA,shadowmask_pars_fragment:LA,skinbase_vertex:OA,skinning_pars_vertex:PA,skinning_vertex:zA,skinnormal_vertex:IA,specularmap_fragment:BA,specularmap_pars_fragment:FA,tonemapping_fragment:HA,tonemapping_pars_fragment:GA,transmission_fragment:VA,transmission_pars_fragment:kA,uv_pars_fragment:XA,uv_pars_vertex:WA,uv_vertex:qA,worldpos_vertex:YA,background_vert:ZA,background_frag:jA,backgroundCube_vert:KA,backgroundCube_frag:QA,cube_vert:JA,cube_frag:$A,depth_vert:t2,depth_frag:e2,distance_vert:n2,distance_frag:i2,equirect_vert:a2,equirect_frag:s2,linedashed_vert:r2,linedashed_frag:o2,meshbasic_vert:l2,meshbasic_frag:c2,meshlambert_vert:u2,meshlambert_frag:f2,meshmatcap_vert:d2,meshmatcap_frag:h2,meshnormal_vert:p2,meshnormal_frag:m2,meshphong_vert:g2,meshphong_frag:v2,meshphysical_vert:_2,meshphysical_frag:x2,meshtoon_vert:S2,meshtoon_frag:y2,points_vert:M2,points_frag:b2,shadow_vert:E2,shadow_frag:T2,sprite_vert:A2,sprite_frag:R2},zt={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new de}},envmap:{envMap:{value:null},envMapRotation:{value:new de},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new de}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new de}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new de},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new de},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new de},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new de}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new de}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new de}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0},uvTransform:{value:new de}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new de},alphaMap:{value:null},alphaMapTransform:{value:new de},alphaTest:{value:0}}},ea={basic:{uniforms:Wn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.fog]),vertexShader:ve.meshbasic_vert,fragmentShader:ve.meshbasic_frag},lambert:{uniforms:Wn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new Ae(0)},envMapIntensity:{value:1}}]),vertexShader:ve.meshlambert_vert,fragmentShader:ve.meshlambert_frag},phong:{uniforms:Wn([zt.common,zt.specularmap,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,zt.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ve.meshphong_vert,fragmentShader:ve.meshphong_frag},standard:{uniforms:Wn([zt.common,zt.envmap,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.roughnessmap,zt.metalnessmap,zt.fog,zt.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ve.meshphysical_vert,fragmentShader:ve.meshphysical_frag},toon:{uniforms:Wn([zt.common,zt.aomap,zt.lightmap,zt.emissivemap,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.gradientmap,zt.fog,zt.lights,{emissive:{value:new Ae(0)}}]),vertexShader:ve.meshtoon_vert,fragmentShader:ve.meshtoon_frag},matcap:{uniforms:Wn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,zt.fog,{matcap:{value:null}}]),vertexShader:ve.meshmatcap_vert,fragmentShader:ve.meshmatcap_frag},points:{uniforms:Wn([zt.points,zt.fog]),vertexShader:ve.points_vert,fragmentShader:ve.points_frag},dashed:{uniforms:Wn([zt.common,zt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ve.linedashed_vert,fragmentShader:ve.linedashed_frag},depth:{uniforms:Wn([zt.common,zt.displacementmap]),vertexShader:ve.depth_vert,fragmentShader:ve.depth_frag},normal:{uniforms:Wn([zt.common,zt.bumpmap,zt.normalmap,zt.displacementmap,{opacity:{value:1}}]),vertexShader:ve.meshnormal_vert,fragmentShader:ve.meshnormal_frag},sprite:{uniforms:Wn([zt.sprite,zt.fog]),vertexShader:ve.sprite_vert,fragmentShader:ve.sprite_frag},background:{uniforms:{uvTransform:{value:new de},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ve.background_vert,fragmentShader:ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new de}},vertexShader:ve.backgroundCube_vert,fragmentShader:ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ve.cube_vert,fragmentShader:ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ve.equirect_vert,fragmentShader:ve.equirect_frag},distance:{uniforms:Wn([zt.common,zt.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ve.distance_vert,fragmentShader:ve.distance_frag},shadow:{uniforms:Wn([zt.lights,zt.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:ve.shadow_vert,fragmentShader:ve.shadow_frag}};ea.physical={uniforms:Wn([ea.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new de},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new de},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new de},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new de},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new de},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new de},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new de},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new de},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new de},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new de},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new de},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new de}}]),vertexShader:ve.meshphysical_vert,fragmentShader:ve.meshphysical_frag};const Wc={r:0,b:0,g:0},C2=new en,xy=new de;xy.set(-1,0,0,0,1,0,0,0,1);function w2(e,t,n,i,a,s){const r=new Ae(0);let o=a===!0?0:1,l,c,d=null,h=0,u=null;function p(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const S=v.backgroundBlurriness>0;M=t.get(M,S)}return M}function g(v){let M=!1;const S=p(v);S===null?m(r,o):S&&S.isColor&&(m(S,1),M=!0);const U=e.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,s):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function y(v,M){const S=p(M);S&&(S.isCubeTexture||S.mapping===yf)?(c===void 0&&(c=new Hi(new rr(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:yo(ea.backgroundCube.uniforms),vertexShader:ea.backgroundCube.vertexShader,fragmentShader:ea.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(U,C,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(C2.makeRotationFromEuler(M.backgroundRotation)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(xy),c.material.toneMapped=we.getTransfer(S.colorSpace)!==We,(d!==S||h!==S.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,d=S,h=S.version,u=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Hi(new Mf(2,2),new Bn({name:"BackgroundMaterial",uniforms:yo(ea.background.uniforms),vertexShader:ea.background.vertexShader,fragmentShader:ea.background.fragmentShader,side:Rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=we.getTransfer(S.colorSpace)!==We,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||h!==S.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,d=S,h=S.version,u=e.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,M){v.getRGB(Wc,gy(e)),n.buffers.color.setClear(Wc.r,Wc.g,Wc.b,M,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,M=1){r.set(v),o=M,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:g,addToRenderList:y,dispose:f}}function D2(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(L,I,P,V,k){let B=!1;const F=h(L,V,P,I);s!==F&&(s=F,c(s.object)),B=p(L,V,P,k),B&&g(L,V,P,k),k!==null&&t.update(k,e.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,S(L,I,P,V),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return e.createVertexArray()}function c(L){return e.bindVertexArray(L)}function d(L){return e.deleteVertexArray(L)}function h(L,I,P,V){const k=V.wireframe===!0;let B=i[I.id];B===void 0&&(B={},i[I.id]=B);const F=L.isInstancedMesh===!0?L.id:0;let O=B[F];O===void 0&&(O={},B[F]=O);let X=O[P.id];X===void 0&&(X={},O[P.id]=X);let ht=X[k];return ht===void 0&&(ht=u(l()),X[k]=ht),ht}function u(L){const I=[],P=[],V=[];for(let k=0;k<n;k++)I[k]=0,P[k]=0,V[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:P,attributeDivisors:V,object:L,attributes:{},index:null}}function p(L,I,P,V){const k=s.attributes,B=I.attributes;let F=0;const O=P.getAttributes();for(const X in O)if(O[X].location>=0){const bt=k[X];let Nt=B[X];if(Nt===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(Nt=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(Nt=L.instanceColor)),bt===void 0||bt.attribute!==Nt||Nt&&bt.data!==Nt.data)return!0;F++}return s.attributesNum!==F||s.index!==V}function g(L,I,P,V){const k={},B=I.attributes;let F=0;const O=P.getAttributes();for(const X in O)if(O[X].location>=0){let bt=B[X];bt===void 0&&(X==="instanceMatrix"&&L.instanceMatrix&&(bt=L.instanceMatrix),X==="instanceColor"&&L.instanceColor&&(bt=L.instanceColor));const Nt={};Nt.attribute=bt,bt&&bt.data&&(Nt.data=bt.data),k[X]=Nt,F++}s.attributes=k,s.attributesNum=F,s.index=V}function y(){const L=s.newAttributes;for(let I=0,P=L.length;I<P;I++)L[I]=0}function m(L){f(L,0)}function f(L,I){const P=s.newAttributes,V=s.enabledAttributes,k=s.attributeDivisors;P[L]=1,V[L]===0&&(e.enableVertexAttribArray(L),V[L]=1),k[L]!==I&&(e.vertexAttribDivisor(L,I),k[L]=I)}function v(){const L=s.newAttributes,I=s.enabledAttributes;for(let P=0,V=I.length;P<V;P++)I[P]!==L[P]&&(e.disableVertexAttribArray(P),I[P]=0)}function M(L,I,P,V,k,B,F){F===!0?e.vertexAttribIPointer(L,I,P,k,B):e.vertexAttribPointer(L,I,P,V,k,B)}function S(L,I,P,V){y();const k=V.attributes,B=P.getAttributes(),F=I.defaultAttributeValues;for(const O in B){const X=B[O];if(X.location>=0){let ht=k[O];if(ht===void 0&&(O==="instanceMatrix"&&L.instanceMatrix&&(ht=L.instanceMatrix),O==="instanceColor"&&L.instanceColor&&(ht=L.instanceColor)),ht!==void 0){const bt=ht.normalized,Nt=ht.itemSize,re=t.get(ht);if(re===void 0)continue;const Qt=re.buffer,ae=re.type,dt=re.bytesPerElement,At=ae===e.INT||ae===e.UNSIGNED_INT||ht.gpuType===zm;if(ht.isInterleavedBufferAttribute){const lt=ht.data,Bt=lt.stride,qt=ht.offset;if(lt.isInstancedInterleavedBuffer){for(let Zt=0;Zt<X.locationSize;Zt++)f(X.location+Zt,lt.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let Zt=0;Zt<X.locationSize;Zt++)m(X.location+Zt);e.bindBuffer(e.ARRAY_BUFFER,Qt);for(let Zt=0;Zt<X.locationSize;Zt++)M(X.location+Zt,Nt/X.locationSize,ae,bt,Bt*dt,(qt+Nt/X.locationSize*Zt)*dt,At)}else{if(ht.isInstancedBufferAttribute){for(let lt=0;lt<X.locationSize;lt++)f(X.location+lt,ht.meshPerAttribute);L.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let lt=0;lt<X.locationSize;lt++)m(X.location+lt);e.bindBuffer(e.ARRAY_BUFFER,Qt);for(let lt=0;lt<X.locationSize;lt++)M(X.location+lt,Nt/X.locationSize,ae,bt,Nt*dt,Nt/X.locationSize*lt*dt,At)}}else if(F!==void 0){const bt=F[O];if(bt!==void 0)switch(bt.length){case 2:e.vertexAttrib2fv(X.location,bt);break;case 3:e.vertexAttrib3fv(X.location,bt);break;case 4:e.vertexAttrib4fv(X.location,bt);break;default:e.vertexAttrib1fv(X.location,bt)}}}}v()}function U(){w();for(const L in i){const I=i[L];for(const P in I){const V=I[P];for(const k in V){const B=V[k];for(const F in B)d(B[F].object),delete B[F];delete V[k]}}delete i[L]}}function C(L){if(i[L.id]===void 0)return;const I=i[L.id];for(const P in I){const V=I[P];for(const k in V){const B=V[k];for(const F in B)d(B[F].object),delete B[F];delete V[k]}}delete i[L.id]}function E(L){for(const I in i){const P=i[I];for(const V in P){const k=P[V];if(k[L.id]===void 0)continue;const B=k[L.id];for(const F in B)d(B[F].object),delete B[F];delete k[L.id]}}}function _(L){for(const I in i){const P=i[I],V=L.isInstancedMesh===!0?L.id:0,k=P[V];if(k!==void 0){for(const B in k){const F=k[B];for(const O in F)d(F[O].object),delete F[O];delete k[B]}delete P[V],Object.keys(P).length===0&&delete i[I]}}}function w(){D(),r=!0,s!==a&&(s=a,c(s.object))}function D(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:w,resetDefaultState:D,dispose:U,releaseStatesOfGeometry:C,releaseStatesOfObject:_,releaseStatesOfProgram:E,initAttributes:y,enableAttribute:m,disableUnusedAttributes:v}}function N2(e,t,n){let i;function a(l){i=l}function s(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,d){d!==0&&(e.drawArraysInstanced(i,l,c,d),n.update(c,i,d))}function o(l,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function U2(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const E=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(E){return!(E!==ji&&i.convert(E)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){const _=E===ka&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(E!==Oi&&i.convert(E)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&E!==Zi&&!_)}function l(E){if(E==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(ie("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&ie("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),U=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:S,maxSamples:U,samples:C}}function L2(e){const t=this;let n=null,i=0,a=!1,s=!1;const r=new Gs,o=new de,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||a;return a=u,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,y=h.clipIntersection,m=h.clipShadows,f=e.get(h);if(!a||g===null||g.length===0||s&&!m)s?d(null):c();else{const v=s?0:i,M=v*4;let S=f.clippingState||null;l.value=S,S=d(g,u,M,p);for(let U=0;U!==M;++U)S[U]=n[U];f.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,u,p,g){const y=h!==null?h.length:0;let m=null;if(y!==0){if(m=l.value,g!==!0||m===null){const f=p+y*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,S=p;M!==y;++M,S+=4)r.copy(h[M]).applyMatrix4(v,o),r.normal.toArray(m,S),m[S+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,m}}const ds=4,hv=[.125,.215,.35,.446,.526,.582],ks=20,O2=256,jo=new Zm,pv=new Ae;let Bd=null,Fd=0,Hd=0,Gd=!1;const P2=new J;class mv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=P2}=s;Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_v(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Bd,Fd,Hd),this._renderer.xr.enabled=Gd,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ir||t.mapping===xo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:ka,format:ji,colorSpace:Zu,depthBuffer:!1},a=gv(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=gv(t,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=z2(s)),this._blurMaterial=B2(s,t,n),this._ggxMaterial=I2(s,t,n)}return a}_compileMaterial(t){const n=new Hi(new Xn,t);this._renderer.compile(n,jo)}_sceneToCubeUV(t,n,i,a,s){const l=new Di(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(pv),h.toneMapping=la,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hi(new rr,new uy({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let f=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,f=!0):(m.color.copy(pv),f=!0);for(let M=0;M<6;M++){const S=M%3;S===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[M],s.y,s.z)):S===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[M]));const U=this._cubeSize;Ur(a,S*U,M>2?U:0,U,U),h.setRenderTarget(a),f&&h.render(y,l),h.render(t,l)}h.toneMapping=p,h.autoClear=u,t.background=v}_textureToCubeUV(t,n){const i=this._renderer,a=t.mapping===ir||t.mapping===xo;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=_v()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vv());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Ur(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,jo)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(t,s-1,s);n.autoClear=i}_applyGGXFilter(t,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=0+c*1.25,p=h*u,{_lodMax:g}=this,y=this._sizeLods[i],m=3*y*(i>g-ds?i-g+ds:0),f=4*(this._cubeSize-y);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-n,Ur(s,m,f,3*y,2*y),a.setRenderTarget(s),a.render(o,jo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ur(t,m,f,3*y,2*y),a.setRenderTarget(t),a.render(o,jo)}_blur(t,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&Pe("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[a];h.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ks-1),y=s/g,m=isFinite(s)?1+Math.floor(d*y):ks;m>ks&&ie(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ks}`);const f=[];let v=0;for(let E=0;E<ks;++E){const _=E/y,w=Math.exp(-_*_/2);f.push(w),E===0?v+=w:E<m&&(v+=2*w)}for(let E=0;E<f.length;E++)f[E]=f[E]/v;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const S=this._sizeLods[a],U=3*S*(a>M-ds?a-M+ds:0),C=4*(this._cubeSize-S);Ur(n,U,C,3*S,2*S),l.setRenderTarget(n),l.render(h,jo)}}function z2(e){const t=[],n=[],i=[];let a=e;const s=e-ds+1+hv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let l=1/o;r>e-ds?l=hv[r-e+ds-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,y=3,m=2,f=1,v=new Float32Array(y*g*p),M=new Float32Array(m*g*p),S=new Float32Array(f*g*p);for(let C=0;C<p;C++){const E=C%3*2/3-1,_=C>2?0:-1,w=[E,_,0,E+2/3,_,0,E+2/3,_+1,0,E,_,0,E+2/3,_+1,0,E,_+1,0];v.set(w,y*g*C),M.set(u,m*g*C);const D=[C,C,C,C,C,C];S.set(D,f*g*C)}const U=new Xn;U.setAttribute("position",new Xe(v,y)),U.setAttribute("uv",new Xe(M,m)),U.setAttribute("faceIndex",new Xe(S,f)),i.push(new Hi(U,null)),a>ds&&a--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function gv(e,t,n){const i=new ca(e,t,n);return i.texture.mapping=yf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function I2(e,t,n){return new Bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:O2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bf(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function B2(e,t,n){const i=new Float32Array(ks),a=new J(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:ks,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function vv(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function _v(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function bf(){return`

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
	`}class Sy extends ca{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new py(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new rr(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:yo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:si,blending:za});s.uniforms.tEquirect.value=n;const r=new Hi(a,s),o=n.minFilter;return n.minFilter===Xs&&(n.minFilter=kn),new X1(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}}function F2(e){let t=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===ud||p===fd)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const y=new Sy(g.height);return y.fromEquirectangularTexture(e,u),t.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===ud||p===fd,y=p===ir||p===xo;if(g||y){let m=n.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new mv(e)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return g&&v&&v.height>0||y&&v&&l(v)?(i===null&&(i=new mv(e)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===ud?u.mapping=ir:p===fd&&(u.mapping=xo),u}function l(u){let p=0;const g=6;for(let y=0;y<g;y++)u[y]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function h(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function H2(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const a=e.getExtension(i);return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&ao("WebGLRenderer: "+i+" extension not supported."),a}}}function G2(e,t,n,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(t.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)t.update(u[p],e.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let y=0;if(g===void 0)return;if(p!==null){const v=p.array;y=p.version;for(let M=0,S=v.length;M<S;M+=3){const U=v[M+0],C=v[M+1],E=v[M+2];u.push(U,C,C,E,E,U)}}else{const v=g.array;y=g.version;for(let M=0,S=v.length/3-1;M<S;M+=3){const U=M+0,C=M+1,E=M+2;u.push(U,C,C,E,E,U)}}const m=new(g.count>=65535?cy:ly)(u,1);m.version=y;const f=s.get(h);f&&t.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function V2(e,t,n){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,u){e.drawElements(i,u,s,h*r),n.update(u,i,1)}function c(h,u,p){p!==0&&(e.drawElementsInstanced(i,u,s,h*r,p),n.update(u,i,p))}function d(h,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let y=0;for(let m=0;m<p;m++)y+=u[m];n.update(y,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function k2(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:Pe("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function X2(e,t,n){const i=new WeakMap,a=new fn;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let D=function(){_.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var p=D;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),y===!0&&(S=2),m===!0&&(S=3);let U=o.attributes.position.count*S,C=1;U>t.maxTextureSize&&(C=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const E=new Float32Array(U*C*4*h),_=new ay(E,U,C,h);_.type=Zi,_.needsUpdate=!0;const w=S*4;for(let L=0;L<h;L++){const I=f[L],P=v[L],V=M[L],k=U*C*4*L;for(let B=0;B<I.count;B++){const F=B*w;g===!0&&(a.fromBufferAttribute(I,B),E[k+F+0]=a.x,E[k+F+1]=a.y,E[k+F+2]=a.z,E[k+F+3]=0),y===!0&&(a.fromBufferAttribute(P,B),E[k+F+4]=a.x,E[k+F+5]=a.y,E[k+F+6]=a.z,E[k+F+7]=0),m===!0&&(a.fromBufferAttribute(V,B),E[k+F+8]=a.x,E[k+F+9]=a.y,E[k+F+10]=a.z,E[k+F+11]=V.itemSize===4?a.w:1)}}u={count:h,texture:_,size:new Ge(U,C)},i.set(o,u),o.addEventListener("dispose",D)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(e,"morphTargetBaseInfluence",y),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:s}}function W2(e,t,n,i,a){let s=new WeakMap;function r(c){const d=a.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==d&&(t.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const q2={[kS]:"LINEAR_TONE_MAPPING",[XS]:"REINHARD_TONE_MAPPING",[WS]:"CINEON_TONE_MAPPING",[qS]:"ACES_FILMIC_TONE_MAPPING",[ZS]:"AGX_TONE_MAPPING",[jS]:"NEUTRAL_TONE_MAPPING",[YS]:"CUSTOM_TONE_MAPPING"};function Y2(e,t,n,i,a,s){const r=new ca(t,n,{type:e,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new So(t,n):void 0}),o=new ca(t,n,{type:ka,depthBuffer:!1,stencilBuffer:!1}),l=new Xn;l.setAttribute("position",new Bi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bi([0,2,0,0,2,0],2));const c=new G1({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Hi(l,c),h=new Zm(-1,1,1,-1,0,1);let u=null,p=null,g=!1,y,m=null,f=[],v=!1;this.setSize=function(M,S){r.setSize(M,S),o.setSize(M,S);for(let U=0;U<f.length;U++){const C=f[U];C.setSize&&C.setSize(M,S)}},this.setEffects=function(M){f=M,v=f.length>0&&f[0].isRenderPass===!0;const S=r.width,U=r.height;for(let C=0;C<f.length;C++){const E=f[C];E.setSize&&E.setSize(S,U)}},this.begin=function(M,S){if(g||M.toneMapping===la&&f.length===0)return!1;if(m=S,S!==null){const U=S.width,C=S.height;(r.width!==U||r.height!==C)&&this.setSize(U,C)}return v===!1&&M.setRenderTarget(r),y=M.toneMapping,M.toneMapping=la,!0},this.hasRenderPass=function(){return v},this.end=function(M,S){M.toneMapping=y,g=!0;let U=r,C=o;for(let E=0;E<f.length;E++){const _=f[E];if(_.enabled!==!1&&(_.render(M,C,U,S),_.needsSwap!==!1)){const w=U;U=C,C=w}}if(u!==M.outputColorSpace||p!==M.toneMapping){u=M.outputColorSpace,p=M.toneMapping,c.defines={},we.getTransfer(u)===We&&(c.defines.SRGB_TRANSFER="");const E=q2[p];E&&(c.defines[E]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=U.texture,M.setRenderTarget(m),M.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const yy=new Zn,Dp=new So(1,1),My=new ay,by=new g1,Ey=new py,xv=[],Sv=[],yv=new Float32Array(16),Mv=new Float32Array(9),bv=new Float32Array(4);function Lo(e,t,n){const i=e[0];if(i<=0||i>0)return e;const a=t*n;let s=xv[a];if(s===void 0&&(s=new Float32Array(a),xv[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Mn(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function bn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Ef(e,t){let n=Sv[t];n===void 0&&(n=new Int32Array(t),Sv[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Z2(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function j2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;e.uniform2fv(this.addr,t),bn(n,t)}}function K2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Mn(n,t))return;e.uniform3fv(this.addr,t),bn(n,t)}}function Q2(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;e.uniform4fv(this.addr,t),bn(n,t)}}function J2(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Mn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),bn(n,t)}else{if(Mn(n,i))return;bv.set(i),e.uniformMatrix2fv(this.addr,!1,bv),bn(n,i)}}function $2(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Mn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),bn(n,t)}else{if(Mn(n,i))return;Mv.set(i),e.uniformMatrix3fv(this.addr,!1,Mv),bn(n,i)}}function tR(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Mn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),bn(n,t)}else{if(Mn(n,i))return;yv.set(i),e.uniformMatrix4fv(this.addr,!1,yv),bn(n,i)}}function eR(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function nR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;e.uniform2iv(this.addr,t),bn(n,t)}}function iR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mn(n,t))return;e.uniform3iv(this.addr,t),bn(n,t)}}function aR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;e.uniform4iv(this.addr,t),bn(n,t)}}function sR(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function rR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;e.uniform2uiv(this.addr,t),bn(n,t)}}function oR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mn(n,t))return;e.uniform3uiv(this.addr,t),bn(n,t)}}function lR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;e.uniform4uiv(this.addr,t),bn(n,t)}}function cR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(Dp.compareFunction=n.isReversedDepthBuffer()?Xm:km,s=Dp):s=yy,n.setTexture2D(t||s,a)}function uR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||by,a)}function fR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||Ey,a)}function dR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||My,a)}function hR(e){switch(e){case 5126:return Z2;case 35664:return j2;case 35665:return K2;case 35666:return Q2;case 35674:return J2;case 35675:return $2;case 35676:return tR;case 5124:case 35670:return eR;case 35667:case 35671:return nR;case 35668:case 35672:return iR;case 35669:case 35673:return aR;case 5125:return sR;case 36294:return rR;case 36295:return oR;case 36296:return lR;case 35678:case 36198:case 36298:case 36306:case 35682:return cR;case 35679:case 36299:case 36307:return uR;case 35680:case 36300:case 36308:case 36293:return fR;case 36289:case 36303:case 36311:case 36292:return dR}}function pR(e,t){e.uniform1fv(this.addr,t)}function mR(e,t){const n=Lo(t,this.size,2);e.uniform2fv(this.addr,n)}function gR(e,t){const n=Lo(t,this.size,3);e.uniform3fv(this.addr,n)}function vR(e,t){const n=Lo(t,this.size,4);e.uniform4fv(this.addr,n)}function _R(e,t){const n=Lo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function xR(e,t){const n=Lo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function SR(e,t){const n=Lo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function yR(e,t){e.uniform1iv(this.addr,t)}function MR(e,t){e.uniform2iv(this.addr,t)}function bR(e,t){e.uniform3iv(this.addr,t)}function ER(e,t){e.uniform4iv(this.addr,t)}function TR(e,t){e.uniform1uiv(this.addr,t)}function AR(e,t){e.uniform2uiv(this.addr,t)}function RR(e,t){e.uniform3uiv(this.addr,t)}function CR(e,t){e.uniform4uiv(this.addr,t)}function wR(e,t,n){const i=this.cache,a=t.length,s=Ef(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));let r;this.type===e.SAMPLER_2D_SHADOW?r=Dp:r=yy;for(let o=0;o!==a;++o)n.setTexture2D(t[o]||r,s[o])}function DR(e,t,n){const i=this.cache,a=t.length,s=Ef(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||by,s[r])}function NR(e,t,n){const i=this.cache,a=t.length,s=Ef(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||Ey,s[r])}function UR(e,t,n){const i=this.cache,a=t.length,s=Ef(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||My,s[r])}function LR(e){switch(e){case 5126:return pR;case 35664:return mR;case 35665:return gR;case 35666:return vR;case 35674:return _R;case 35675:return xR;case 35676:return SR;case 5124:case 35670:return yR;case 35667:case 35671:return MR;case 35668:case 35672:return bR;case 35669:case 35673:return ER;case 5125:return TR;case 36294:return AR;case 36295:return RR;case 36296:return CR;case 35678:case 36198:case 36298:case 36306:case 35682:return wR;case 35679:case 36299:case 36307:return DR;case 35680:case 36300:case 36308:case 36293:return NR;case 36289:case 36303:case 36311:case 36292:return UR}}class OR{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=hR(n.type)}}class PR{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=LR(n.type)}}class zR{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(t,n[o.id],i)}}}const Vd=/(\w+)(\])?(\[|\.)?/g;function Ev(e,t){e.seq.push(t),e.map[t.id]=t}function IR(e,t,n){const i=e.name,a=i.length;for(Vd.lastIndex=0;;){const s=Vd.exec(i),r=Vd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Ev(n,c===void 0?new OR(o,e,t):new PR(o,e,t));break}else{let h=n.map[o];h===void 0&&(h=new zR(o),Ev(n,h)),n=h}}}class mu{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);IR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(t,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){const a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){const i=[];for(let a=0,s=t.length;a!==s;++a){const r=t[a];r.id in n&&i.push(r)}return i}}function Tv(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const BR=37297;let FR=0;function HR(e,t){const n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Av=new de;function GR(e){we._getMatrix(Av,we.workingColorSpace,e);const t=`mat3( ${Av.elements.map(n=>n.toFixed(4))} )`;switch(we.getTransfer(e)){case ju:return[t,"LinearTransferOETF"];case We:return[t,"sRGBTransferOETF"];default:return ie("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function Rv(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+HR(e.getShaderSource(t),o)}else return s}function VR(e,t){const n=GR(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const kR={[kS]:"Linear",[XS]:"Reinhard",[WS]:"Cineon",[qS]:"ACESFilmic",[ZS]:"AgX",[jS]:"Neutral",[YS]:"Custom"};function XR(e,t){const n=kR[t];return n===void 0?(ie("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const qc=new J;function WR(){we.getLuminanceCoefficients(qc);const e=qc.x.toFixed(4),t=qc.y.toFixed(4),n=qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function qR(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function YR(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function ZR(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=e.getActiveAttrib(t,a),r=s.name;let o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function al(e){return e!==""}function Cv(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function wv(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const jR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Np(e){return e.replace(jR,QR)}const KR=new Map;function QR(e,t){let n=ve[t];if(n===void 0){const i=KR.get(t);if(i!==void 0)n=ve[i],ie('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Np(n)}const JR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dv(e){return e.replace(JR,$R)}function $R(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Nv(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const t3={[lu]:"SHADOWMAP_TYPE_PCF",[il]:"SHADOWMAP_TYPE_VSM"};function e3(e){return t3[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const n3={[ir]:"ENVMAP_TYPE_CUBE",[xo]:"ENVMAP_TYPE_CUBE",[yf]:"ENVMAP_TYPE_CUBE_UV"};function i3(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":n3[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const a3={[xo]:"ENVMAP_MODE_REFRACTION"};function s3(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":a3[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const r3={[VS]:"ENVMAP_BLENDING_MULTIPLY",[jE]:"ENVMAP_BLENDING_MIX",[KE]:"ENVMAP_BLENDING_ADD"};function o3(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":r3[e.combine]||"ENVMAP_BLENDING_NONE"}function l3(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function c3(e,t,n,i){const a=e.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=e3(n),c=i3(n),d=s3(n),h=o3(n),u=l3(n),p=qR(n),g=YR(s),y=a.createProgram();let m,f,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),f.length>0&&(f+=`
`)):(m=[Nv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),f=[Nv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==la?"#define TONE_MAPPING":"",n.toneMapping!==la?ve.tonemapping_pars_fragment:"",n.toneMapping!==la?XR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ve.colorspace_pars_fragment,VR("linearToOutputTexel",n.outputColorSpace),WR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(al).join(`
`)),r=Np(r),r=Cv(r,n),r=wv(r,n),o=Np(o),o=Cv(o,n),o=wv(o,n),r=Dv(r),o=Dv(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===zg?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===zg?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=v+m+r,S=v+f+o,U=Tv(a,a.VERTEX_SHADER,M),C=Tv(a,a.FRAGMENT_SHADER,S);a.attachShader(y,U),a.attachShader(y,C),n.index0AttributeName!==void 0?a.bindAttribLocation(y,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(y,0,"position"),a.linkProgram(y);function E(L){if(e.debug.checkShaderErrors){const I=a.getProgramInfoLog(y)||"",P=a.getShaderInfoLog(U)||"",V=a.getShaderInfoLog(C)||"",k=I.trim(),B=P.trim(),F=V.trim();let O=!0,X=!0;if(a.getProgramParameter(y,a.LINK_STATUS)===!1)if(O=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,y,U,C);else{const ht=Rv(a,U,"vertex"),bt=Rv(a,C,"fragment");Pe("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(y,a.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+k+`
`+ht+`
`+bt)}else k!==""?ie("WebGLProgram: Program Info Log:",k):(B===""||F==="")&&(X=!1);X&&(L.diagnostics={runnable:O,programLog:k,vertexShader:{log:B,prefix:m},fragmentShader:{log:F,prefix:f}})}a.deleteShader(U),a.deleteShader(C),_=new mu(a,y),w=ZR(a,y)}let _;this.getUniforms=function(){return _===void 0&&E(this),_};let w;this.getAttributes=function(){return w===void 0&&E(this),w};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=a.getProgramParameter(y,BR)),D},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(y),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=FR++,this.cacheKey=t,this.usedTimes=1,this.program=y,this.vertexShader=U,this.fragmentShader=C,this}let u3=0;class f3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){const a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new d3(t),n.set(t,i)),i}}class d3{constructor(t){this.id=u3++,this.code=t,this.usedTimes=0}}function h3(e){return e===ar||e===qu||e===Yu}function p3(e,t,n,i,a,s){const r=new sy,o=new f3,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(_){return l.add(_),_===0?"uv":`uv${_}`}function y(_,w,D,L,I,P){const V=L.fog,k=I.geometry,B=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?L.environment:null,F=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,O=t.get(_.envMap||B,F),X=O&&O.mapping===yf?O.image.height:null,ht=p[_.type];_.precision!==null&&(u=i.getMaxPrecision(_.precision),u!==_.precision&&ie("WebGLProgram.getParameters:",_.precision,"not supported, using",u,"instead."));const bt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Nt=bt!==void 0?bt.length:0;let re=0;k.morphAttributes.position!==void 0&&(re=1),k.morphAttributes.normal!==void 0&&(re=2),k.morphAttributes.color!==void 0&&(re=3);let Qt,ae,dt,At;if(ht){const Ht=ea[ht];Qt=Ht.vertexShader,ae=Ht.fragmentShader}else{Qt=_.vertexShader,ae=_.fragmentShader;const Ht=o.getVertexShaderStage(_),Me=o.getFragmentShaderStage(_);o.update(_,Ht,Me),dt=Ht.id,At=Me.id}const lt=e.getRenderTarget(),Bt=e.state.buffers.depth.getReversed(),qt=I.isInstancedMesh===!0,Zt=I.isBatchedMesh===!0,Ue=!!_.map,ee=!!_.matcap,Le=!!O,xe=!!_.aoMap,me=!!_.lightMap,ze=!!_.bumpMap&&_.wireframe===!1,ce=!!_.normalMap,Je=!!_.displacementMap,nn=!!_.emissiveMap,ue=!!_.metalnessMap,Ot=!!_.roughnessMap,H=_.anisotropy>0,fe=_.clearcoat>0,ne=_.dispersion>0,b=_.iridescence>0,x=_.sheen>0,Y=_.transmission>0,K=H&&!!_.anisotropyMap,it=fe&&!!_.clearcoatMap,St=fe&&!!_.clearcoatNormalMap,Ct=fe&&!!_.clearcoatRoughnessMap,st=b&&!!_.iridescenceMap,j=b&&!!_.iridescenceThicknessMap,ut=x&&!!_.sheenColorMap,gt=x&&!!_.sheenRoughnessMap,_t=!!_.specularMap,yt=!!_.specularColorMap,Ft=!!_.specularIntensityMap,kt=Y&&!!_.transmissionMap,$t=Y&&!!_.thicknessMap,G=!!_.gradientMap,Et=!!_.alphaMap,ct=_.alphaTest>0,rt=!!_.alphaHash,Ut=!!_.extensions;let vt=la;_.toneMapped&&(lt===null||lt.isXRRenderTarget===!0)&&(vt=e.toneMapping);const Xt={shaderID:ht,shaderType:_.type,shaderName:_.name,vertexShader:Qt,fragmentShader:ae,defines:_.defines,customVertexShaderID:dt,customFragmentShaderID:At,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:u,batching:Zt,batchingColor:Zt&&I._colorsTexture!==null,instancing:qt,instancingColor:qt&&I.instanceColor!==null,instancingMorph:qt&&I.morphTexture!==null,outputColorSpace:lt===null?e.outputColorSpace:lt.isXRRenderTarget===!0?lt.texture.colorSpace:we.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:Ue,matcap:ee,envMap:Le,envMapMode:Le&&O.mapping,envMapCubeUVHeight:X,aoMap:xe,lightMap:me,bumpMap:ze,normalMap:ce,displacementMap:Je,emissiveMap:nn,normalMapObjectSpace:ce&&_.normalMapType===$E,normalMapTangentSpace:ce&&_.normalMapType===Lg,packedNormalMap:ce&&_.normalMapType===Lg&&h3(_.normalMap.format),metalnessMap:ue,roughnessMap:Ot,anisotropy:H,anisotropyMap:K,clearcoat:fe,clearcoatMap:it,clearcoatNormalMap:St,clearcoatRoughnessMap:Ct,dispersion:ne,iridescence:b,iridescenceMap:st,iridescenceThicknessMap:j,sheen:x,sheenColorMap:ut,sheenRoughnessMap:gt,specularMap:_t,specularColorMap:yt,specularIntensityMap:Ft,transmission:Y,transmissionMap:kt,thicknessMap:$t,gradientMap:G,opaque:_.transparent===!1&&_.blending===Qs&&_.alphaToCoverage===!1,alphaMap:Et,alphaTest:ct,alphaHash:rt,combine:_.combine,mapUv:Ue&&g(_.map.channel),aoMapUv:xe&&g(_.aoMap.channel),lightMapUv:me&&g(_.lightMap.channel),bumpMapUv:ze&&g(_.bumpMap.channel),normalMapUv:ce&&g(_.normalMap.channel),displacementMapUv:Je&&g(_.displacementMap.channel),emissiveMapUv:nn&&g(_.emissiveMap.channel),metalnessMapUv:ue&&g(_.metalnessMap.channel),roughnessMapUv:Ot&&g(_.roughnessMap.channel),anisotropyMapUv:K&&g(_.anisotropyMap.channel),clearcoatMapUv:it&&g(_.clearcoatMap.channel),clearcoatNormalMapUv:St&&g(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ct&&g(_.clearcoatRoughnessMap.channel),iridescenceMapUv:st&&g(_.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(_.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&g(_.sheenColorMap.channel),sheenRoughnessMapUv:gt&&g(_.sheenRoughnessMap.channel),specularMapUv:_t&&g(_.specularMap.channel),specularColorMapUv:yt&&g(_.specularColorMap.channel),specularIntensityMapUv:Ft&&g(_.specularIntensityMap.channel),transmissionMapUv:kt&&g(_.transmissionMap.channel),thicknessMapUv:$t&&g(_.thicknessMap.channel),alphaMapUv:Et&&g(_.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(ce||H),vertexNormals:!!k.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!k.attributes.uv&&(Ue||Et),fog:!!V,useFog:_.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||k.attributes.normal===void 0&&ce===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Bt,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Nt,morphTextureStride:re,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:P.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:_.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:vt,decodeVideoTexture:Ue&&_.map.isVideoTexture===!0&&we.getTransfer(_.map.colorSpace)===We,decodeVideoTextureEmissive:nn&&_.emissiveMap.isVideoTexture===!0&&we.getTransfer(_.emissiveMap.colorSpace)===We,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ca,flipSided:_.side===si,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Ut&&_.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ut&&_.extensions.multiDraw===!0||Zt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Xt.vertexUv1s=l.has(1),Xt.vertexUv2s=l.has(2),Xt.vertexUv3s=l.has(3),l.clear(),Xt}function m(_){const w=[];if(_.shaderID?w.push(_.shaderID):(w.push(_.customVertexShaderID),w.push(_.customFragmentShaderID)),_.defines!==void 0)for(const D in _.defines)w.push(D),w.push(_.defines[D]);return _.isRawShaderMaterial===!1&&(f(w,_),v(w,_),w.push(e.outputColorSpace)),w.push(_.customProgramCacheKey),w.join()}function f(_,w){_.push(w.precision),_.push(w.outputColorSpace),_.push(w.envMapMode),_.push(w.envMapCubeUVHeight),_.push(w.mapUv),_.push(w.alphaMapUv),_.push(w.lightMapUv),_.push(w.aoMapUv),_.push(w.bumpMapUv),_.push(w.normalMapUv),_.push(w.displacementMapUv),_.push(w.emissiveMapUv),_.push(w.metalnessMapUv),_.push(w.roughnessMapUv),_.push(w.anisotropyMapUv),_.push(w.clearcoatMapUv),_.push(w.clearcoatNormalMapUv),_.push(w.clearcoatRoughnessMapUv),_.push(w.iridescenceMapUv),_.push(w.iridescenceThicknessMapUv),_.push(w.sheenColorMapUv),_.push(w.sheenRoughnessMapUv),_.push(w.specularMapUv),_.push(w.specularColorMapUv),_.push(w.specularIntensityMapUv),_.push(w.transmissionMapUv),_.push(w.thicknessMapUv),_.push(w.combine),_.push(w.fogExp2),_.push(w.sizeAttenuation),_.push(w.morphTargetsCount),_.push(w.morphAttributeCount),_.push(w.numDirLights),_.push(w.numPointLights),_.push(w.numSpotLights),_.push(w.numSpotLightMaps),_.push(w.numHemiLights),_.push(w.numRectAreaLights),_.push(w.numDirLightShadows),_.push(w.numPointLightShadows),_.push(w.numSpotLightShadows),_.push(w.numSpotLightShadowsWithMaps),_.push(w.numLightProbes),_.push(w.shadowMapType),_.push(w.toneMapping),_.push(w.numClippingPlanes),_.push(w.numClipIntersection),_.push(w.depthPacking)}function v(_,w){r.disableAll(),w.instancing&&r.enable(0),w.instancingColor&&r.enable(1),w.instancingMorph&&r.enable(2),w.matcap&&r.enable(3),w.envMap&&r.enable(4),w.normalMapObjectSpace&&r.enable(5),w.normalMapTangentSpace&&r.enable(6),w.clearcoat&&r.enable(7),w.iridescence&&r.enable(8),w.alphaTest&&r.enable(9),w.vertexColors&&r.enable(10),w.vertexAlphas&&r.enable(11),w.vertexUv1s&&r.enable(12),w.vertexUv2s&&r.enable(13),w.vertexUv3s&&r.enable(14),w.vertexTangents&&r.enable(15),w.anisotropy&&r.enable(16),w.alphaHash&&r.enable(17),w.batching&&r.enable(18),w.dispersion&&r.enable(19),w.batchingColor&&r.enable(20),w.gradientMap&&r.enable(21),w.packedNormalMap&&r.enable(22),w.vertexNormals&&r.enable(23),_.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reversedDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.decodeVideoTextureEmissive&&r.enable(20),w.alphaToCoverage&&r.enable(21),w.numLightProbeGrids>0&&r.enable(22),w.hasPositionAttribute&&r.enable(23),_.push(r.mask)}function M(_){const w=p[_.type];let D;if(w){const L=ea[w];D=B1.clone(L.uniforms)}else D=_.uniforms;return D}function S(_,w){let D=d.get(w);return D!==void 0?++D.usedTimes:(D=new c3(e,w,_,a),c.push(D),d.set(w,D)),D}function U(_){if(--_.usedTimes===0){const w=c.indexOf(_);c[w]=c[c.length-1],c.pop(),d.delete(_.cacheKey),_.destroy()}}function C(_){o.remove(_)}function E(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:M,acquireProgram:S,releaseProgram:U,releaseShaderCache:C,programs:c,dispose:E}}function m3(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function g3(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Uv(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Lv(){const e=[];let t=0;const n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,y,m,f){let v=e[t];return v===void 0?(v={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:f},e[t]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=g,v.materialVariant=r(u),v.groupOrder=y,v.renderOrder=u.renderOrder,v.z=m,v.group=f),t++,v}function l(u,p,g,y,m,f){const v=o(u,p,g,y,m,f);g.transmission>0?i.push(v):g.transparent===!0?a.push(v):n.push(v)}function c(u,p,g,y,m,f){const v=o(u,p,g,y,m,f);g.transmission>0?i.unshift(v):g.transparent===!0?a.unshift(v):n.unshift(v)}function d(u,p,g){n.length>1&&n.sort(u||g3),i.length>1&&i.sort(p||Uv),a.length>1&&a.sort(p||Uv),g&&(n.reverse(),i.reverse(),a.reverse())}function h(){for(let u=t,p=e.length;u<p;u++){const g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:h,sort:d}}function v3(){let e=new WeakMap;function t(i,a){const s=e.get(i);let r;return s===void 0?(r=new Lv,e.set(i,[r])):a>=s.length?(r=new Lv,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function _3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new J,color:new Ae};break;case"SpotLight":n={position:new J,direction:new J,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":n={color:new Ae,position:new J,halfWidth:new J,halfHeight:new J};break}return e[t.id]=n,n}}}function x3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let S3=0;function y3(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function M3(e){const t=new _3,n=x3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new J);const a=new J,s=new en,r=new en;function o(c){let d=0,h=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,y=0,m=0,f=0,v=0,M=0,S=0,U=0,C=0,E=0;c.sort(y3);for(let w=0,D=c.length;w<D;w++){const L=c[w],I=L.color,P=L.intensity,V=L.distance;let k=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===ar?k=L.shadow.map.texture:k=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)d+=I.r*P,h+=I.g*P,u+=I.b*P;else if(L.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(L.sh.coefficients[B],P);E++}else if(L.isDirectionalLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const F=L.shadow,O=n.get(L);O.shadowIntensity=F.intensity,O.shadowBias=F.bias,O.shadowNormalBias=F.normalBias,O.shadowRadius=F.radius,O.shadowMapSize=F.mapSize,i.directionalShadow[p]=O,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=L.shadow.matrix,v++}i.directional[p]=B,p++}else if(L.isSpotLight){const B=t.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(I).multiplyScalar(P),B.distance=V,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,i.spot[y]=B;const F=L.shadow;if(L.map&&(i.spotLightMap[U]=L.map,U++,F.updateMatrices(L),L.castShadow&&C++),i.spotLightMatrix[y]=F.matrix,L.castShadow){const O=n.get(L);O.shadowIntensity=F.intensity,O.shadowBias=F.bias,O.shadowNormalBias=F.normalBias,O.shadowRadius=F.radius,O.shadowMapSize=F.mapSize,i.spotShadow[y]=O,i.spotShadowMap[y]=k,S++}y++}else if(L.isRectAreaLight){const B=t.get(L);B.color.copy(I).multiplyScalar(P),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),i.rectArea[m]=B,m++}else if(L.isPointLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),B.distance=L.distance,B.decay=L.decay,L.castShadow){const F=L.shadow,O=n.get(L);O.shadowIntensity=F.intensity,O.shadowBias=F.bias,O.shadowNormalBias=F.normalBias,O.shadowRadius=F.radius,O.shadowMapSize=F.mapSize,O.shadowCameraNear=F.camera.near,O.shadowCameraFar=F.camera.far,i.pointShadow[g]=O,i.pointShadowMap[g]=k,i.pointShadowMatrix[g]=L.shadow.matrix,M++}i.point[g]=B,g++}else if(L.isHemisphereLight){const B=t.get(L);B.skyColor.copy(L.color).multiplyScalar(P),B.groundColor.copy(L.groundColor).multiplyScalar(P),i.hemi[f]=B,f++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=zt.LTC_FLOAT_1,i.rectAreaLTC2=zt.LTC_FLOAT_2):(i.rectAreaLTC1=zt.LTC_HALF_1,i.rectAreaLTC2=zt.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const _=i.hash;(_.directionalLength!==p||_.pointLength!==g||_.spotLength!==y||_.rectAreaLength!==m||_.hemiLength!==f||_.numDirectionalShadows!==v||_.numPointShadows!==M||_.numSpotShadows!==S||_.numSpotMaps!==U||_.numLightProbes!==E)&&(i.directional.length=p,i.spot.length=y,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+U-C,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=E,_.directionalLength=p,_.pointLength=g,_.spotLength=y,_.rectAreaLength=m,_.hemiLength=f,_.numDirectionalShadows=v,_.numPointShadows=M,_.numSpotShadows=S,_.numSpotMaps=U,_.numLightProbes=E,i.version=S3++)}function l(c,d){let h=0,u=0,p=0,g=0,y=0;const m=d.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){const M=c[f];if(M.isDirectionalLight){const S=i.directional[h];S.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(m),h++}else if(M.isSpotLight){const S=i.spot[p];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),S.direction.sub(a),S.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),r.identity(),s.copy(M.matrixWorld),s.premultiply(m),r.extractRotation(s),S.halfWidth.set(M.width*.5,0,0),S.halfHeight.set(0,M.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(M.matrixWorld),S.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const S=i.hemi[y];S.direction.setFromMatrixPosition(M.matrixWorld),S.direction.transformDirection(m),y++}}}return{setup:o,setupView:l,state:i}}function Ov(e){const t=new M3(e),n=[],i=[],a=[];function s(u){h.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){t.setup(n)}function d(u){t.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:d,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function b3(e){let t=new WeakMap;function n(a,s=0){const r=t.get(a);let o;return r===void 0?(o=new Ov(e),t.set(a,[o])):s>=r.length?(o=new Ov(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const E3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,T3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,A3=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],R3=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Pv=new en,Ko=new J,kd=new J;function C3(e,t,n){let i=new dy;const a=new Ge,s=new Ge,r=new fn,o=new V1,l=new k1,c={},d=n.maxTextureSize,h={[Rs]:si,[si]:Rs,[Ca]:Ca},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:E3,fragmentShader:T3}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Xn;g.setAttribute("position",new Xe(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Hi(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let f=this.type;this.render=function(C,E,_){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===DE&&(ie("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=lu);const w=e.getRenderTarget(),D=e.getActiveCubeFace(),L=e.getActiveMipmapLevel(),I=e.state;I.setBlending(za),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const P=f!==this.type;P&&E.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(k=>k.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,k=C.length;V<k;V++){const B=C[V],F=B.shadow;if(F===void 0){ie("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;a.copy(F.mapSize);const O=F.getFrameExtents();a.multiply(O),s.copy(F.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/O.x),a.x=s.x*O.x,F.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/O.y),a.y=s.y*O.y,F.mapSize.y=s.y));const X=e.state.buffers.depth.getReversed();if(F.camera._reversedDepth=X,F.map===null||P===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===il){if(B.isPointLight){ie("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ca(a.x,a.y,{format:ar,type:ka,minFilter:kn,magFilter:kn,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new So(a.x,a.y,Zi),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=Xa,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=In,F.map.depthTexture.magFilter=In}else B.isPointLight?(F.map=new Sy(a.x),F.map.depthTexture=new P1(a.x,ua)):(F.map=new ca(a.x,a.y),F.map.depthTexture=new So(a.x,a.y,ua)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=Xa,this.type===lu?(F.map.depthTexture.compareFunction=X?Xm:km,F.map.depthTexture.minFilter=kn,F.map.depthTexture.magFilter=kn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=In,F.map.depthTexture.magFilter=In);F.camera.updateProjectionMatrix()}const ht=F.map.isWebGLCubeRenderTarget?6:1;for(let bt=0;bt<ht;bt++){if(F.map.isWebGLCubeRenderTarget)e.setRenderTarget(F.map,bt),e.clear();else{bt===0&&(e.setRenderTarget(F.map),e.clear());const Nt=F.getViewport(bt);r.set(s.x*Nt.x,s.y*Nt.y,s.x*Nt.z,s.y*Nt.w),I.viewport(r)}if(B.isPointLight){const Nt=F.camera,re=F.matrix,Qt=B.distance||Nt.far;Qt!==Nt.far&&(Nt.far=Qt,Nt.updateProjectionMatrix()),Ko.setFromMatrixPosition(B.matrixWorld),Nt.position.copy(Ko),kd.copy(Nt.position),kd.add(A3[bt]),Nt.up.copy(R3[bt]),Nt.lookAt(kd),Nt.updateMatrixWorld(),re.makeTranslation(-Ko.x,-Ko.y,-Ko.z),Pv.multiplyMatrices(Nt.projectionMatrix,Nt.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Pv,Nt.coordinateSystem,Nt.reversedDepth)}else F.updateMatrices(B);i=F.getFrustum(),S(E,_,F.camera,B,this.type)}F.isPointLightShadow!==!0&&this.type===il&&v(F,_),F.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(w,D,L)};function v(C,E){const _=t.update(y);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ca(a.x,a.y,{format:ar,type:ka})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(E,null,_,u,y,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(E,null,_,p,y,null)}function M(C,E,_,w){let D=null;const L=_.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(L!==void 0)D=L;else if(D=_.isPointLight===!0?l:o,e.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){const I=D.uuid,P=E.uuid;let V=c[I];V===void 0&&(V={},c[I]=V);let k=V[P];k===void 0&&(k=D.clone(),V[P]=k,E.addEventListener("dispose",U)),D=k}if(D.visible=E.visible,D.wireframe=E.wireframe,w===il?D.side=E.shadowSide!==null?E.shadowSide:E.side:D.side=E.shadowSide!==null?E.shadowSide:h[E.side],D.alphaMap=E.alphaMap,D.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,D.map=E.map,D.clipShadows=E.clipShadows,D.clippingPlanes=E.clippingPlanes,D.clipIntersection=E.clipIntersection,D.displacementMap=E.displacementMap,D.displacementScale=E.displacementScale,D.displacementBias=E.displacementBias,D.wireframeLinewidth=E.wireframeLinewidth,D.linewidth=E.linewidth,_.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const I=e.properties.get(D);I.light=_}return D}function S(C,E,_,w,D){if(C.visible===!1)return;if(C.layers.test(E.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&D===il)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(_.matrixWorldInverse,C.matrixWorld);const P=t.update(C),V=C.material;if(Array.isArray(V)){const k=P.groups;for(let B=0,F=k.length;B<F;B++){const O=k[B],X=V[O.materialIndex];if(X&&X.visible){const ht=M(C,X,w,D);C.onBeforeShadow(e,C,E,_,P,ht,O),e.renderBufferDirect(_,null,P,ht,C,O),C.onAfterShadow(e,C,E,_,P,ht,O)}}}else if(V.visible){const k=M(C,V,w,D);C.onBeforeShadow(e,C,E,_,P,k,null),e.renderBufferDirect(_,null,P,k,C,null),C.onAfterShadow(e,C,E,_,P,k,null)}}const I=C.children;for(let P=0,V=I.length;P<V;P++)S(I[P],E,_,w,D)}function U(C){C.target.removeEventListener("dispose",U);for(const _ in c){const w=c[_],D=C.target.uuid;D in w&&(w[D].dispose(),delete w[D])}}}function w3(e,t){function n(){let G=!1;const Et=new fn;let ct=null;const rt=new fn(0,0,0,0);return{setMask:function(Ut){ct!==Ut&&!G&&(e.colorMask(Ut,Ut,Ut,Ut),ct=Ut)},setLocked:function(Ut){G=Ut},setClear:function(Ut,vt,Xt,Ht,Me){Me===!0&&(Ut*=Ht,vt*=Ht,Xt*=Ht),Et.set(Ut,vt,Xt,Ht),rt.equals(Et)===!1&&(e.clearColor(Ut,vt,Xt,Ht),rt.copy(Et))},reset:function(){G=!1,ct=null,rt.set(-1,0,0,0)}}}function i(){let G=!1,Et=!1,ct=null,rt=null,Ut=null;return{setReversed:function(vt){if(Et!==vt){const Xt=t.get("EXT_clip_control");vt?Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.ZERO_TO_ONE_EXT):Xt.clipControlEXT(Xt.LOWER_LEFT_EXT,Xt.NEGATIVE_ONE_TO_ONE_EXT),Et=vt;const Ht=Ut;Ut=null,this.setClear(Ht)}},getReversed:function(){return Et},setTest:function(vt){vt?lt(e.DEPTH_TEST):Bt(e.DEPTH_TEST)},setMask:function(vt){ct!==vt&&!G&&(e.depthMask(vt),ct=vt)},setFunc:function(vt){if(Et&&(vt=c1[vt]),rt!==vt){switch(vt){case Vh:e.depthFunc(e.NEVER);break;case kh:e.depthFunc(e.ALWAYS);break;case Xh:e.depthFunc(e.LESS);break;case _o:e.depthFunc(e.LEQUAL);break;case Wh:e.depthFunc(e.EQUAL);break;case qh:e.depthFunc(e.GEQUAL);break;case Yh:e.depthFunc(e.GREATER);break;case Zh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}rt=vt}},setLocked:function(vt){G=vt},setClear:function(vt){Ut!==vt&&(Ut=vt,Et&&(vt=1-vt),e.clearDepth(vt))},reset:function(){G=!1,ct=null,rt=null,Ut=null,Et=!1}}}function a(){let G=!1,Et=null,ct=null,rt=null,Ut=null,vt=null,Xt=null,Ht=null,Me=null;return{setTest:function(Ie){G||(Ie?lt(e.STENCIL_TEST):Bt(e.STENCIL_TEST))},setMask:function(Ie){Et!==Ie&&!G&&(e.stencilMask(Ie),Et=Ie)},setFunc:function(Ie,Dn,Nn){(ct!==Ie||rt!==Dn||Ut!==Nn)&&(e.stencilFunc(Ie,Dn,Nn),ct=Ie,rt=Dn,Ut=Nn)},setOp:function(Ie,Dn,Nn){(vt!==Ie||Xt!==Dn||Ht!==Nn)&&(e.stencilOp(Ie,Dn,Nn),vt=Ie,Xt=Dn,Ht=Nn)},setLocked:function(Ie){G=Ie},setClear:function(Ie){Me!==Ie&&(e.clearStencil(Ie),Me=Ie)},reset:function(){G=!1,Et=null,ct=null,rt=null,Ut=null,vt=null,Xt=null,Ht=null,Me=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},h={},u={},p=new WeakMap,g=[],y=null,m=!1,f=null,v=null,M=null,S=null,U=null,C=null,E=null,_=new Ae(0,0,0),w=0,D=!1,L=null,I=null,P=null,V=null,k=null;const B=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,O=0;const X=e.getParameter(e.VERSION);X.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(X)[1]),F=O>=1):X.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),F=O>=2);let ht=null,bt={};const Nt=e.getParameter(e.SCISSOR_BOX),re=e.getParameter(e.VIEWPORT),Qt=new fn().fromArray(Nt),ae=new fn().fromArray(re);function dt(G,Et,ct,rt){const Ut=new Uint8Array(4),vt=e.createTexture();e.bindTexture(G,vt),e.texParameteri(G,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(G,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let Xt=0;Xt<ct;Xt++)G===e.TEXTURE_3D||G===e.TEXTURE_2D_ARRAY?e.texImage3D(Et,0,e.RGBA,1,1,rt,0,e.RGBA,e.UNSIGNED_BYTE,Ut):e.texImage2D(Et+Xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Ut);return vt}const At={};At[e.TEXTURE_2D]=dt(e.TEXTURE_2D,e.TEXTURE_2D,1),At[e.TEXTURE_CUBE_MAP]=dt(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),At[e.TEXTURE_2D_ARRAY]=dt(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),At[e.TEXTURE_3D]=dt(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),lt(e.DEPTH_TEST),r.setFunc(_o),ze(!1),ce(Dg),lt(e.CULL_FACE),xe(za);function lt(G){d[G]!==!0&&(e.enable(G),d[G]=!0)}function Bt(G){d[G]!==!1&&(e.disable(G),d[G]=!1)}function qt(G,Et){return u[G]!==Et?(e.bindFramebuffer(G,Et),u[G]=Et,G===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=Et),G===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=Et),!0):!1}function Zt(G,Et){let ct=g,rt=!1;if(G){ct=p.get(Et),ct===void 0&&(ct=[],p.set(Et,ct));const Ut=G.textures;if(ct.length!==Ut.length||ct[0]!==e.COLOR_ATTACHMENT0){for(let vt=0,Xt=Ut.length;vt<Xt;vt++)ct[vt]=e.COLOR_ATTACHMENT0+vt;ct.length=Ut.length,rt=!0}}else ct[0]!==e.BACK&&(ct[0]=e.BACK,rt=!0);rt&&e.drawBuffers(ct)}function Ue(G){return y!==G?(e.useProgram(G),y=G,!0):!1}const ee={[Vs]:e.FUNC_ADD,[UE]:e.FUNC_SUBTRACT,[LE]:e.FUNC_REVERSE_SUBTRACT};ee[OE]=e.MIN,ee[PE]=e.MAX;const Le={[zE]:e.ZERO,[IE]:e.ONE,[BE]:e.SRC_COLOR,[Hh]:e.SRC_ALPHA,[XE]:e.SRC_ALPHA_SATURATE,[VE]:e.DST_COLOR,[HE]:e.DST_ALPHA,[FE]:e.ONE_MINUS_SRC_COLOR,[Gh]:e.ONE_MINUS_SRC_ALPHA,[kE]:e.ONE_MINUS_DST_COLOR,[GE]:e.ONE_MINUS_DST_ALPHA,[WE]:e.CONSTANT_COLOR,[qE]:e.ONE_MINUS_CONSTANT_COLOR,[YE]:e.CONSTANT_ALPHA,[ZE]:e.ONE_MINUS_CONSTANT_ALPHA};function xe(G,Et,ct,rt,Ut,vt,Xt,Ht,Me,Ie){if(G===za){m===!0&&(Bt(e.BLEND),m=!1);return}if(m===!1&&(lt(e.BLEND),m=!0),G!==NE){if(G!==f||Ie!==D){if((v!==Vs||U!==Vs)&&(e.blendEquation(e.FUNC_ADD),v=Vs,U=Vs),Ie)switch(G){case Qs:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Zr:e.blendFunc(e.ONE,e.ONE);break;case Ng:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Ug:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Pe("WebGLState: Invalid blending: ",G);break}else switch(G){case Qs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Zr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Ng:Pe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ug:Pe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Pe("WebGLState: Invalid blending: ",G);break}M=null,S=null,C=null,E=null,_.set(0,0,0),w=0,f=G,D=Ie}return}Ut=Ut||Et,vt=vt||ct,Xt=Xt||rt,(Et!==v||Ut!==U)&&(e.blendEquationSeparate(ee[Et],ee[Ut]),v=Et,U=Ut),(ct!==M||rt!==S||vt!==C||Xt!==E)&&(e.blendFuncSeparate(Le[ct],Le[rt],Le[vt],Le[Xt]),M=ct,S=rt,C=vt,E=Xt),(Ht.equals(_)===!1||Me!==w)&&(e.blendColor(Ht.r,Ht.g,Ht.b,Me),_.copy(Ht),w=Me),f=G,D=!1}function me(G,Et){G.side===Ca?Bt(e.CULL_FACE):lt(e.CULL_FACE);let ct=G.side===si;Et&&(ct=!ct),ze(ct),G.blending===Qs&&G.transparent===!1?xe(za):xe(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),r.setFunc(G.depthFunc),r.setTest(G.depthTest),r.setMask(G.depthWrite),s.setMask(G.colorWrite);const rt=G.stencilWrite;o.setTest(rt),rt&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),nn(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?lt(e.SAMPLE_ALPHA_TO_COVERAGE):Bt(e.SAMPLE_ALPHA_TO_COVERAGE)}function ze(G){L!==G&&(G?e.frontFace(e.CW):e.frontFace(e.CCW),L=G)}function ce(G){G!==CE?(lt(e.CULL_FACE),G!==I&&(G===Dg?e.cullFace(e.BACK):G===wE?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Bt(e.CULL_FACE),I=G}function Je(G){G!==P&&(F&&e.lineWidth(G),P=G)}function nn(G,Et,ct){G?(lt(e.POLYGON_OFFSET_FILL),(V!==Et||k!==ct)&&(V=Et,k=ct,r.getReversed()&&(Et=-Et),e.polygonOffset(Et,ct))):Bt(e.POLYGON_OFFSET_FILL)}function ue(G){G?lt(e.SCISSOR_TEST):Bt(e.SCISSOR_TEST)}function Ot(G){G===void 0&&(G=e.TEXTURE0+B-1),ht!==G&&(e.activeTexture(G),ht=G)}function H(G,Et,ct){ct===void 0&&(ht===null?ct=e.TEXTURE0+B-1:ct=ht);let rt=bt[ct];rt===void 0&&(rt={type:void 0,texture:void 0},bt[ct]=rt),(rt.type!==G||rt.texture!==Et)&&(ht!==ct&&(e.activeTexture(ct),ht=ct),e.bindTexture(G,Et||At[G]),rt.type=G,rt.texture=Et)}function fe(){const G=bt[ht];G!==void 0&&G.type!==void 0&&(e.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function ne(){try{e.compressedTexImage2D(...arguments)}catch(G){Pe("WebGLState:",G)}}function b(){try{e.compressedTexImage3D(...arguments)}catch(G){Pe("WebGLState:",G)}}function x(){try{e.texSubImage2D(...arguments)}catch(G){Pe("WebGLState:",G)}}function Y(){try{e.texSubImage3D(...arguments)}catch(G){Pe("WebGLState:",G)}}function K(){try{e.compressedTexSubImage2D(...arguments)}catch(G){Pe("WebGLState:",G)}}function it(){try{e.compressedTexSubImage3D(...arguments)}catch(G){Pe("WebGLState:",G)}}function St(){try{e.texStorage2D(...arguments)}catch(G){Pe("WebGLState:",G)}}function Ct(){try{e.texStorage3D(...arguments)}catch(G){Pe("WebGLState:",G)}}function st(){try{e.texImage2D(...arguments)}catch(G){Pe("WebGLState:",G)}}function j(){try{e.texImage3D(...arguments)}catch(G){Pe("WebGLState:",G)}}function ut(G){return h[G]!==void 0?h[G]:e.getParameter(G)}function gt(G,Et){h[G]!==Et&&(e.pixelStorei(G,Et),h[G]=Et)}function _t(G){Qt.equals(G)===!1&&(e.scissor(G.x,G.y,G.z,G.w),Qt.copy(G))}function yt(G){ae.equals(G)===!1&&(e.viewport(G.x,G.y,G.z,G.w),ae.copy(G))}function Ft(G,Et){let ct=c.get(Et);ct===void 0&&(ct=new WeakMap,c.set(Et,ct));let rt=ct.get(G);rt===void 0&&(rt=e.getUniformBlockIndex(Et,G.name),ct.set(G,rt))}function kt(G,Et){const rt=c.get(Et).get(G);l.get(Et)!==rt&&(e.uniformBlockBinding(Et,rt,G.__bindingPointIndex),l.set(Et,rt))}function $t(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},h={},ht=null,bt={},u={},p=new WeakMap,g=[],y=null,m=!1,f=null,v=null,M=null,S=null,U=null,C=null,E=null,_=new Ae(0,0,0),w=0,D=!1,L=null,I=null,P=null,V=null,k=null,Qt.set(0,0,e.canvas.width,e.canvas.height),ae.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:lt,disable:Bt,bindFramebuffer:qt,drawBuffers:Zt,useProgram:Ue,setBlending:xe,setMaterial:me,setFlipSided:ze,setCullFace:ce,setLineWidth:Je,setPolygonOffset:nn,setScissorTest:ue,activeTexture:Ot,bindTexture:H,unbindTexture:fe,compressedTexImage2D:ne,compressedTexImage3D:b,texImage2D:st,texImage3D:j,pixelStorei:gt,getParameter:ut,updateUBOMapping:Ft,uniformBlockBinding:kt,texStorage2D:St,texStorage3D:Ct,texSubImage2D:x,texSubImage3D:Y,compressedTexSubImage2D:K,compressedTexSubImage3D:it,scissor:_t,viewport:yt,reset:$t}}function D3(e,t,n,i,a,s,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ge,d=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(b,x){return g?new OffscreenCanvas(b,x):Qu("canvas")}function m(b,x,Y){let K=1;const it=ne(b);if((it.width>Y||it.height>Y)&&(K=Y/Math.max(it.width,it.height)),K<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const St=Math.floor(K*it.width),Ct=Math.floor(K*it.height);u===void 0&&(u=y(St,Ct));const st=x?y(St,Ct):u;return st.width=St,st.height=Ct,st.getContext("2d").drawImage(b,0,0,St,Ct),ie("WebGLRenderer: Texture has been resized from ("+it.width+"x"+it.height+") to ("+St+"x"+Ct+")."),st}else return"data"in b&&ie("WebGLRenderer: Image in DataTexture is too big ("+it.width+"x"+it.height+")."),b;return b}function f(b){return b.generateMipmaps}function v(b){e.generateMipmap(b)}function M(b){return b.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?e.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function S(b,x,Y,K,it,St=!1){if(b!==null){if(e[b]!==void 0)return e[b];ie("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Ct;K&&(Ct=t.get("EXT_texture_norm16"),Ct||ie("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let st=x;if(x===e.RED&&(Y===e.FLOAT&&(st=e.R32F),Y===e.HALF_FLOAT&&(st=e.R16F),Y===e.UNSIGNED_BYTE&&(st=e.R8),Y===e.UNSIGNED_SHORT&&Ct&&(st=Ct.R16_EXT),Y===e.SHORT&&Ct&&(st=Ct.R16_SNORM_EXT)),x===e.RED_INTEGER&&(Y===e.UNSIGNED_BYTE&&(st=e.R8UI),Y===e.UNSIGNED_SHORT&&(st=e.R16UI),Y===e.UNSIGNED_INT&&(st=e.R32UI),Y===e.BYTE&&(st=e.R8I),Y===e.SHORT&&(st=e.R16I),Y===e.INT&&(st=e.R32I)),x===e.RG&&(Y===e.FLOAT&&(st=e.RG32F),Y===e.HALF_FLOAT&&(st=e.RG16F),Y===e.UNSIGNED_BYTE&&(st=e.RG8),Y===e.UNSIGNED_SHORT&&Ct&&(st=Ct.RG16_EXT),Y===e.SHORT&&Ct&&(st=Ct.RG16_SNORM_EXT)),x===e.RG_INTEGER&&(Y===e.UNSIGNED_BYTE&&(st=e.RG8UI),Y===e.UNSIGNED_SHORT&&(st=e.RG16UI),Y===e.UNSIGNED_INT&&(st=e.RG32UI),Y===e.BYTE&&(st=e.RG8I),Y===e.SHORT&&(st=e.RG16I),Y===e.INT&&(st=e.RG32I)),x===e.RGB_INTEGER&&(Y===e.UNSIGNED_BYTE&&(st=e.RGB8UI),Y===e.UNSIGNED_SHORT&&(st=e.RGB16UI),Y===e.UNSIGNED_INT&&(st=e.RGB32UI),Y===e.BYTE&&(st=e.RGB8I),Y===e.SHORT&&(st=e.RGB16I),Y===e.INT&&(st=e.RGB32I)),x===e.RGBA_INTEGER&&(Y===e.UNSIGNED_BYTE&&(st=e.RGBA8UI),Y===e.UNSIGNED_SHORT&&(st=e.RGBA16UI),Y===e.UNSIGNED_INT&&(st=e.RGBA32UI),Y===e.BYTE&&(st=e.RGBA8I),Y===e.SHORT&&(st=e.RGBA16I),Y===e.INT&&(st=e.RGBA32I)),x===e.RGB&&(Y===e.UNSIGNED_SHORT&&Ct&&(st=Ct.RGB16_EXT),Y===e.SHORT&&Ct&&(st=Ct.RGB16_SNORM_EXT),Y===e.UNSIGNED_INT_5_9_9_9_REV&&(st=e.RGB9_E5),Y===e.UNSIGNED_INT_10F_11F_11F_REV&&(st=e.R11F_G11F_B10F)),x===e.RGBA){const j=St?ju:we.getTransfer(it);Y===e.FLOAT&&(st=e.RGBA32F),Y===e.HALF_FLOAT&&(st=e.RGBA16F),Y===e.UNSIGNED_BYTE&&(st=j===We?e.SRGB8_ALPHA8:e.RGBA8),Y===e.UNSIGNED_SHORT&&Ct&&(st=Ct.RGBA16_EXT),Y===e.SHORT&&Ct&&(st=Ct.RGBA16_SNORM_EXT),Y===e.UNSIGNED_SHORT_4_4_4_4&&(st=e.RGBA4),Y===e.UNSIGNED_SHORT_5_5_5_1&&(st=e.RGB5_A1)}return(st===e.R16F||st===e.R32F||st===e.RG16F||st===e.RG32F||st===e.RGBA16F||st===e.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function U(b,x){let Y;return b?x===null||x===ua||x===zl?Y=e.DEPTH24_STENCIL8:x===Zi?Y=e.DEPTH32F_STENCIL8:x===Pl&&(Y=e.DEPTH24_STENCIL8,ie("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===ua||x===zl?Y=e.DEPTH_COMPONENT24:x===Zi?Y=e.DEPTH_COMPONENT32F:x===Pl&&(Y=e.DEPTH_COMPONENT16),Y}function C(b,x){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==In&&b.minFilter!==kn?Math.log2(Math.max(x.width,x.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?x.mipmaps.length:1}function E(b){const x=b.target;x.removeEventListener("dispose",E),w(x),x.isVideoTexture&&d.delete(x),x.isHTMLTexture&&h.delete(x)}function _(b){const x=b.target;x.removeEventListener("dispose",_),L(x)}function w(b){const x=i.get(b);if(x.__webglInit===void 0)return;const Y=b.source,K=p.get(Y);if(K){const it=K[x.__cacheKey];it.usedTimes--,it.usedTimes===0&&D(b),Object.keys(K).length===0&&p.delete(Y)}i.remove(b)}function D(b){const x=i.get(b);e.deleteTexture(x.__webglTexture);const Y=b.source,K=p.get(Y);delete K[x.__cacheKey],r.memory.textures--}function L(b){const x=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(x.__webglFramebuffer[K]))for(let it=0;it<x.__webglFramebuffer[K].length;it++)e.deleteFramebuffer(x.__webglFramebuffer[K][it]);else e.deleteFramebuffer(x.__webglFramebuffer[K]);x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer[K])}else{if(Array.isArray(x.__webglFramebuffer))for(let K=0;K<x.__webglFramebuffer.length;K++)e.deleteFramebuffer(x.__webglFramebuffer[K]);else e.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&e.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&e.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let K=0;K<x.__webglColorRenderbuffer.length;K++)x.__webglColorRenderbuffer[K]&&e.deleteRenderbuffer(x.__webglColorRenderbuffer[K]);x.__webglDepthRenderbuffer&&e.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const Y=b.textures;for(let K=0,it=Y.length;K<it;K++){const St=i.get(Y[K]);St.__webglTexture&&(e.deleteTexture(St.__webglTexture),r.memory.textures--),i.remove(Y[K])}i.remove(b)}let I=0;function P(){I=0}function V(){return I}function k(b){I=b}function B(){const b=I;return b>=a.maxTextures&&ie("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),I+=1,b}function F(b){const x=[];return x.push(b.wrapS),x.push(b.wrapT),x.push(b.wrapR||0),x.push(b.magFilter),x.push(b.minFilter),x.push(b.anisotropy),x.push(b.internalFormat),x.push(b.format),x.push(b.type),x.push(b.generateMipmaps),x.push(b.premultiplyAlpha),x.push(b.flipY),x.push(b.unpackAlignment),x.push(b.colorSpace),x.join()}function O(b,x){const Y=i.get(b);if(b.isVideoTexture&&H(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&Y.__version!==b.version){const K=b.image;if(K===null)ie("WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)ie("WebGLRenderer: Texture marked for update but image is incomplete");else{Bt(Y,b,x);return}}else b.isExternalTexture&&(Y.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,Y.__webglTexture,e.TEXTURE0+x)}function X(b,x){const Y=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&Y.__version!==b.version){Bt(Y,b,x);return}else b.isExternalTexture&&(Y.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,Y.__webglTexture,e.TEXTURE0+x)}function ht(b,x){const Y=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&Y.__version!==b.version){Bt(Y,b,x);return}n.bindTexture(e.TEXTURE_3D,Y.__webglTexture,e.TEXTURE0+x)}function bt(b,x){const Y=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&Y.__version!==b.version){qt(Y,b,x);return}n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture,e.TEXTURE0+x)}const Nt={[jh]:e.REPEAT,[Ua]:e.CLAMP_TO_EDGE,[Kh]:e.MIRRORED_REPEAT},re={[In]:e.NEAREST,[QE]:e.NEAREST_MIPMAP_NEAREST,[gc]:e.NEAREST_MIPMAP_LINEAR,[kn]:e.LINEAR,[dd]:e.LINEAR_MIPMAP_NEAREST,[Xs]:e.LINEAR_MIPMAP_LINEAR},Qt={[t1]:e.NEVER,[s1]:e.ALWAYS,[e1]:e.LESS,[km]:e.LEQUAL,[n1]:e.EQUAL,[Xm]:e.GEQUAL,[i1]:e.GREATER,[a1]:e.NOTEQUAL};function ae(b,x){if(x.type===Zi&&t.has("OES_texture_float_linear")===!1&&(x.magFilter===kn||x.magFilter===dd||x.magFilter===gc||x.magFilter===Xs||x.minFilter===kn||x.minFilter===dd||x.minFilter===gc||x.minFilter===Xs)&&ie("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(b,e.TEXTURE_WRAP_S,Nt[x.wrapS]),e.texParameteri(b,e.TEXTURE_WRAP_T,Nt[x.wrapT]),(b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY)&&e.texParameteri(b,e.TEXTURE_WRAP_R,Nt[x.wrapR]),e.texParameteri(b,e.TEXTURE_MAG_FILTER,re[x.magFilter]),e.texParameteri(b,e.TEXTURE_MIN_FILTER,re[x.minFilter]),x.compareFunction&&(e.texParameteri(b,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(b,e.TEXTURE_COMPARE_FUNC,Qt[x.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===In||x.minFilter!==gc&&x.minFilter!==Xs||x.type===Zi&&t.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||i.get(x).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");e.texParameterf(b,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,a.getMaxAnisotropy())),i.get(x).__currentAnisotropy=x.anisotropy}}}function dt(b,x){let Y=!1;b.__webglInit===void 0&&(b.__webglInit=!0,x.addEventListener("dispose",E));const K=x.source;let it=p.get(K);it===void 0&&(it={},p.set(K,it));const St=F(x);if(St!==b.__cacheKey){it[St]===void 0&&(it[St]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,Y=!0),it[St].usedTimes++;const Ct=it[b.__cacheKey];Ct!==void 0&&(it[b.__cacheKey].usedTimes--,Ct.usedTimes===0&&D(x)),b.__cacheKey=St,b.__webglTexture=it[St].texture}return Y}function At(b,x,Y){return Math.floor(Math.floor(b/Y)/x)}function lt(b,x,Y,K){const St=b.updateRanges;if(St.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,x.width,x.height,Y,K,x.data);else{St.sort((gt,_t)=>gt.start-_t.start);let Ct=0;for(let gt=1;gt<St.length;gt++){const _t=St[Ct],yt=St[gt],Ft=_t.start+_t.count,kt=At(yt.start,x.width,4),$t=At(_t.start,x.width,4);yt.start<=Ft+1&&kt===$t&&At(yt.start+yt.count-1,x.width,4)===kt?_t.count=Math.max(_t.count,yt.start+yt.count-_t.start):(++Ct,St[Ct]=yt)}St.length=Ct+1;const st=n.getParameter(e.UNPACK_ROW_LENGTH),j=n.getParameter(e.UNPACK_SKIP_PIXELS),ut=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,x.width);for(let gt=0,_t=St.length;gt<_t;gt++){const yt=St[gt],Ft=Math.floor(yt.start/4),kt=Math.ceil(yt.count/4),$t=Ft%x.width,G=Math.floor(Ft/x.width),Et=kt,ct=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,$t),n.pixelStorei(e.UNPACK_SKIP_ROWS,G),n.texSubImage2D(e.TEXTURE_2D,0,$t,G,Et,ct,Y,K,x.data)}b.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,st),n.pixelStorei(e.UNPACK_SKIP_PIXELS,j),n.pixelStorei(e.UNPACK_SKIP_ROWS,ut)}}function Bt(b,x,Y){let K=e.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(K=e.TEXTURE_2D_ARRAY),x.isData3DTexture&&(K=e.TEXTURE_3D);const it=dt(b,x),St=x.source;n.bindTexture(K,b.__webglTexture,e.TEXTURE0+Y);const Ct=i.get(St);if(St.version!==Ct.__version||it===!0){if(n.activeTexture(e.TEXTURE0+Y),(typeof ImageBitmap<"u"&&x.image instanceof ImageBitmap)===!1){const ct=we.getPrimaries(we.workingColorSpace),rt=x.colorSpace===rs?null:we.getPrimaries(x.colorSpace),Ut=x.colorSpace===rs||ct===rt?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut)}n.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment);let j=m(x.image,!1,a.maxTextureSize);j=fe(x,j);const ut=s.convert(x.format,x.colorSpace),gt=s.convert(x.type);let _t=S(x.internalFormat,ut,gt,x.normalized,x.colorSpace,x.isVideoTexture);ae(K,x);let yt;const Ft=x.mipmaps,kt=x.isVideoTexture!==!0,$t=Ct.__version===void 0||it===!0,G=St.dataReady,Et=C(x,j);if(x.isDepthTexture)_t=U(x.format===Ws,x.type),$t&&(kt?n.texStorage2D(e.TEXTURE_2D,1,_t,j.width,j.height):n.texImage2D(e.TEXTURE_2D,0,_t,j.width,j.height,0,ut,gt,null));else if(x.isDataTexture)if(Ft.length>0){kt&&$t&&n.texStorage2D(e.TEXTURE_2D,Et,_t,Ft[0].width,Ft[0].height);for(let ct=0,rt=Ft.length;ct<rt;ct++)yt=Ft[ct],kt?G&&n.texSubImage2D(e.TEXTURE_2D,ct,0,0,yt.width,yt.height,ut,gt,yt.data):n.texImage2D(e.TEXTURE_2D,ct,_t,yt.width,yt.height,0,ut,gt,yt.data);x.generateMipmaps=!1}else kt?($t&&n.texStorage2D(e.TEXTURE_2D,Et,_t,j.width,j.height),G&&lt(x,j,ut,gt)):n.texImage2D(e.TEXTURE_2D,0,_t,j.width,j.height,0,ut,gt,j.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){kt&&$t&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Et,_t,Ft[0].width,Ft[0].height,j.depth);for(let ct=0,rt=Ft.length;ct<rt;ct++)if(yt=Ft[ct],x.format!==ji)if(ut!==null)if(kt){if(G)if(x.layerUpdates.size>0){const Ut=dv(yt.width,yt.height,x.format,x.type);for(const vt of x.layerUpdates){const Xt=yt.data.subarray(vt*Ut/yt.data.BYTES_PER_ELEMENT,(vt+1)*Ut/yt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ct,0,0,vt,yt.width,yt.height,1,ut,Xt)}x.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ct,0,0,0,yt.width,yt.height,j.depth,ut,yt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ct,_t,yt.width,yt.height,j.depth,0,yt.data,0,0);else ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else kt?G&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,ct,0,0,0,yt.width,yt.height,j.depth,ut,gt,yt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,ct,_t,yt.width,yt.height,j.depth,0,ut,gt,yt.data)}else{kt&&$t&&n.texStorage2D(e.TEXTURE_2D,Et,_t,Ft[0].width,Ft[0].height);for(let ct=0,rt=Ft.length;ct<rt;ct++)yt=Ft[ct],x.format!==ji?ut!==null?kt?G&&n.compressedTexSubImage2D(e.TEXTURE_2D,ct,0,0,yt.width,yt.height,ut,yt.data):n.compressedTexImage2D(e.TEXTURE_2D,ct,_t,yt.width,yt.height,0,yt.data):ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):kt?G&&n.texSubImage2D(e.TEXTURE_2D,ct,0,0,yt.width,yt.height,ut,gt,yt.data):n.texImage2D(e.TEXTURE_2D,ct,_t,yt.width,yt.height,0,ut,gt,yt.data)}else if(x.isDataArrayTexture)if(kt){if($t&&n.texStorage3D(e.TEXTURE_2D_ARRAY,Et,_t,j.width,j.height,j.depth),G)if(x.layerUpdates.size>0){const ct=dv(j.width,j.height,x.format,x.type);for(const rt of x.layerUpdates){const Ut=j.data.subarray(rt*ct/j.data.BYTES_PER_ELEMENT,(rt+1)*ct/j.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,rt,j.width,j.height,1,ut,gt,Ut)}x.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ut,gt,j.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,_t,j.width,j.height,j.depth,0,ut,gt,j.data);else if(x.isData3DTexture)kt?($t&&n.texStorage3D(e.TEXTURE_3D,Et,_t,j.width,j.height,j.depth),G&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ut,gt,j.data)):n.texImage3D(e.TEXTURE_3D,0,_t,j.width,j.height,j.depth,0,ut,gt,j.data);else if(x.isFramebufferTexture){if($t)if(kt)n.texStorage2D(e.TEXTURE_2D,Et,_t,j.width,j.height);else{let ct=j.width,rt=j.height;for(let Ut=0;Ut<Et;Ut++)n.texImage2D(e.TEXTURE_2D,Ut,_t,ct,rt,0,ut,gt,null),ct>>=1,rt>>=1}}else if(x.isHTMLTexture){if("texElementImage2D"in e){const ct=e.canvas;if(ct.hasAttribute("layoutsubtree")||ct.setAttribute("layoutsubtree","true"),j.parentNode!==ct){ct.appendChild(j),h.add(x),ct.onpaint=rt=>{const Ut=rt.changedElements;for(const vt of h)Ut.includes(vt.image)&&(vt.needsUpdate=!0)},ct.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,j);else{const Ut=e.RGBA,vt=e.RGBA,Xt=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,Ut,vt,Xt,j)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Ft.length>0){if(kt&&$t){const ct=ne(Ft[0]);n.texStorage2D(e.TEXTURE_2D,Et,_t,ct.width,ct.height)}for(let ct=0,rt=Ft.length;ct<rt;ct++)yt=Ft[ct],kt?G&&n.texSubImage2D(e.TEXTURE_2D,ct,0,0,ut,gt,yt):n.texImage2D(e.TEXTURE_2D,ct,_t,ut,gt,yt);x.generateMipmaps=!1}else if(kt){if($t){const ct=ne(j);n.texStorage2D(e.TEXTURE_2D,Et,_t,ct.width,ct.height)}G&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ut,gt,j)}else n.texImage2D(e.TEXTURE_2D,0,_t,ut,gt,j);f(x)&&v(K),Ct.__version=St.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function qt(b,x,Y){if(x.image.length!==6)return;const K=dt(b,x),it=x.source;n.bindTexture(e.TEXTURE_CUBE_MAP,b.__webglTexture,e.TEXTURE0+Y);const St=i.get(it);if(it.version!==St.__version||K===!0){n.activeTexture(e.TEXTURE0+Y);const Ct=we.getPrimaries(we.workingColorSpace),st=x.colorSpace===rs?null:we.getPrimaries(x.colorSpace),j=x.colorSpace===rs||Ct===st?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,x.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,x.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ut=x.isCompressedTexture||x.image[0].isCompressedTexture,gt=x.image[0]&&x.image[0].isDataTexture,_t=[];for(let vt=0;vt<6;vt++)!ut&&!gt?_t[vt]=m(x.image[vt],!0,a.maxCubemapSize):_t[vt]=gt?x.image[vt].image:x.image[vt],_t[vt]=fe(x,_t[vt]);const yt=_t[0],Ft=s.convert(x.format,x.colorSpace),kt=s.convert(x.type),$t=S(x.internalFormat,Ft,kt,x.normalized,x.colorSpace),G=x.isVideoTexture!==!0,Et=St.__version===void 0||K===!0,ct=it.dataReady;let rt=C(x,yt);ae(e.TEXTURE_CUBE_MAP,x);let Ut;if(ut){G&&Et&&n.texStorage2D(e.TEXTURE_CUBE_MAP,rt,$t,yt.width,yt.height);for(let vt=0;vt<6;vt++){Ut=_t[vt].mipmaps;for(let Xt=0;Xt<Ut.length;Xt++){const Ht=Ut[Xt];x.format!==ji?Ft!==null?G?ct&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,0,0,Ht.width,Ht.height,Ft,Ht.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,$t,Ht.width,Ht.height,0,Ht.data):ie("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?ct&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,0,0,Ht.width,Ht.height,Ft,kt,Ht.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt,$t,Ht.width,Ht.height,0,Ft,kt,Ht.data)}}}else{if(Ut=x.mipmaps,G&&Et){Ut.length>0&&rt++;const vt=ne(_t[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,rt,$t,vt.width,vt.height)}for(let vt=0;vt<6;vt++)if(gt){G?ct&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,_t[vt].width,_t[vt].height,Ft,kt,_t[vt].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,$t,_t[vt].width,_t[vt].height,0,Ft,kt,_t[vt].data);for(let Xt=0;Xt<Ut.length;Xt++){const Me=Ut[Xt].image[vt].image;G?ct&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,0,0,Me.width,Me.height,Ft,kt,Me.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,$t,Me.width,Me.height,0,Ft,kt,Me.data)}}else{G?ct&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Ft,kt,_t[vt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,$t,Ft,kt,_t[vt]);for(let Xt=0;Xt<Ut.length;Xt++){const Ht=Ut[Xt];G?ct&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,0,0,Ft,kt,Ht.image[vt]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,Xt+1,$t,Ft,kt,Ht.image[vt])}}}f(x)&&v(e.TEXTURE_CUBE_MAP),St.__version=it.version,x.onUpdate&&x.onUpdate(x)}b.__version=x.version}function Zt(b,x,Y,K,it,St){const Ct=s.convert(Y.format,Y.colorSpace),st=s.convert(Y.type),j=S(Y.internalFormat,Ct,st,Y.normalized,Y.colorSpace),ut=i.get(x),gt=i.get(Y);if(gt.__renderTarget=x,!ut.__hasExternalTextures){const _t=Math.max(1,x.width>>St),yt=Math.max(1,x.height>>St);it===e.TEXTURE_3D||it===e.TEXTURE_2D_ARRAY?n.texImage3D(it,St,j,_t,yt,x.depth,0,Ct,st,null):n.texImage2D(it,St,j,_t,yt,0,Ct,st,null)}n.bindFramebuffer(e.FRAMEBUFFER,b),Ot(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,K,it,gt.__webglTexture,0,ue(x)):(it===e.TEXTURE_2D||it>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&it<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,K,it,gt.__webglTexture,St),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ue(b,x,Y){if(e.bindRenderbuffer(e.RENDERBUFFER,b),x.depthBuffer){const K=x.depthTexture,it=K&&K.isDepthTexture?K.type:null,St=U(x.stencilBuffer,it),Ct=x.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ot(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ue(x),St,x.width,x.height):Y?e.renderbufferStorageMultisample(e.RENDERBUFFER,ue(x),St,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,St,x.width,x.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,Ct,e.RENDERBUFFER,b)}else{const K=x.textures;for(let it=0;it<K.length;it++){const St=K[it],Ct=s.convert(St.format,St.colorSpace),st=s.convert(St.type),j=S(St.internalFormat,Ct,st,St.normalized,St.colorSpace);Ot(x)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ue(x),j,x.width,x.height):Y?e.renderbufferStorageMultisample(e.RENDERBUFFER,ue(x),j,x.width,x.height):e.renderbufferStorage(e.RENDERBUFFER,j,x.width,x.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ee(b,x,Y){const K=x.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,b),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const it=i.get(x.depthTexture);if(it.__renderTarget=x,(!it.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),K){if(it.__webglInit===void 0&&(it.__webglInit=!0,x.depthTexture.addEventListener("dispose",E)),it.__webglTexture===void 0){it.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,it.__webglTexture),ae(e.TEXTURE_CUBE_MAP,x.depthTexture);const ut=s.convert(x.depthTexture.format),gt=s.convert(x.depthTexture.type);let _t;x.depthTexture.format===Xa?_t=e.DEPTH_COMPONENT24:x.depthTexture.format===Ws&&(_t=e.DEPTH24_STENCIL8);for(let yt=0;yt<6;yt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+yt,0,_t,x.width,x.height,0,ut,gt,null)}}else O(x.depthTexture,0);const St=it.__webglTexture,Ct=ue(x),st=K?e.TEXTURE_CUBE_MAP_POSITIVE_X+Y:e.TEXTURE_2D,j=x.depthTexture.format===Ws?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(x.depthTexture.format===Xa)Ot(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,st,St,0,Ct):e.framebufferTexture2D(e.FRAMEBUFFER,j,st,St,0);else if(x.depthTexture.format===Ws)Ot(x)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,j,st,St,0,Ct):e.framebufferTexture2D(e.FRAMEBUFFER,j,st,St,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Le(b){const x=i.get(b),Y=b.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==b.depthTexture){const K=b.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),K){const it=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,K.removeEventListener("dispose",it)};K.addEventListener("dispose",it),x.__depthDisposeCallback=it}x.__boundDepthTexture=K}if(b.depthTexture&&!x.__autoAllocateDepthBuffer)if(Y)for(let K=0;K<6;K++)ee(x.__webglFramebuffer[K],b,K);else{const K=b.texture.mipmaps;K&&K.length>0?ee(x.__webglFramebuffer[0],b,0):ee(x.__webglFramebuffer,b,0)}else if(Y){x.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[K]),x.__webglDepthbuffer[K]===void 0)x.__webglDepthbuffer[K]=e.createRenderbuffer(),Ue(x.__webglDepthbuffer[K],b,!1);else{const it=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=x.__webglDepthbuffer[K];e.bindRenderbuffer(e.RENDERBUFFER,St),e.framebufferRenderbuffer(e.FRAMEBUFFER,it,e.RENDERBUFFER,St)}}else{const K=b.texture.mipmaps;if(K&&K.length>0?n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=e.createRenderbuffer(),Ue(x.__webglDepthbuffer,b,!1);else{const it=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=x.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,St),e.framebufferRenderbuffer(e.FRAMEBUFFER,it,e.RENDERBUFFER,St)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function xe(b,x,Y){const K=i.get(b);x!==void 0&&Zt(K.__webglFramebuffer,b,b.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),Y!==void 0&&Le(b)}function me(b){const x=b.texture,Y=i.get(b),K=i.get(x);b.addEventListener("dispose",_);const it=b.textures,St=b.isWebGLCubeRenderTarget===!0,Ct=it.length>1;if(Ct||(K.__webglTexture===void 0&&(K.__webglTexture=e.createTexture()),K.__version=x.version,r.memory.textures++),St){Y.__webglFramebuffer=[];for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0){Y.__webglFramebuffer[st]=[];for(let j=0;j<x.mipmaps.length;j++)Y.__webglFramebuffer[st][j]=e.createFramebuffer()}else Y.__webglFramebuffer[st]=e.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){Y.__webglFramebuffer=[];for(let st=0;st<x.mipmaps.length;st++)Y.__webglFramebuffer[st]=e.createFramebuffer()}else Y.__webglFramebuffer=e.createFramebuffer();if(Ct)for(let st=0,j=it.length;st<j;st++){const ut=i.get(it[st]);ut.__webglTexture===void 0&&(ut.__webglTexture=e.createTexture(),r.memory.textures++)}if(b.samples>0&&Ot(b)===!1){Y.__webglMultisampledFramebuffer=e.createFramebuffer(),Y.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let st=0;st<it.length;st++){const j=it[st];Y.__webglColorRenderbuffer[st]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,Y.__webglColorRenderbuffer[st]);const ut=s.convert(j.format,j.colorSpace),gt=s.convert(j.type),_t=S(j.internalFormat,ut,gt,j.normalized,j.colorSpace,b.isXRRenderTarget===!0),yt=ue(b);e.renderbufferStorageMultisample(e.RENDERBUFFER,yt,_t,b.width,b.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+st,e.RENDERBUFFER,Y.__webglColorRenderbuffer[st])}e.bindRenderbuffer(e.RENDERBUFFER,null),b.depthBuffer&&(Y.__webglDepthRenderbuffer=e.createRenderbuffer(),Ue(Y.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(St){n.bindTexture(e.TEXTURE_CUBE_MAP,K.__webglTexture),ae(e.TEXTURE_CUBE_MAP,x);for(let st=0;st<6;st++)if(x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Zt(Y.__webglFramebuffer[st][j],b,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,j);else Zt(Y.__webglFramebuffer[st],b,x,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+st,0);f(x)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(Ct){for(let st=0,j=it.length;st<j;st++){const ut=it[st],gt=i.get(ut);let _t=e.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(_t=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(_t,gt.__webglTexture),ae(_t,ut),Zt(Y.__webglFramebuffer,b,ut,e.COLOR_ATTACHMENT0+st,_t,0),f(ut)&&v(_t)}n.unbindTexture()}else{let st=e.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(st=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(st,K.__webglTexture),ae(st,x),x.mipmaps&&x.mipmaps.length>0)for(let j=0;j<x.mipmaps.length;j++)Zt(Y.__webglFramebuffer[j],b,x,e.COLOR_ATTACHMENT0,st,j);else Zt(Y.__webglFramebuffer,b,x,e.COLOR_ATTACHMENT0,st,0);f(x)&&v(st),n.unbindTexture()}b.depthBuffer&&Le(b)}function ze(b){const x=b.textures;for(let Y=0,K=x.length;Y<K;Y++){const it=x[Y];if(f(it)){const St=M(b),Ct=i.get(it).__webglTexture;n.bindTexture(St,Ct),v(St),n.unbindTexture()}}}const ce=[],Je=[];function nn(b){if(b.samples>0){if(Ot(b)===!1){const x=b.textures,Y=b.width,K=b.height;let it=e.COLOR_BUFFER_BIT;const St=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Ct=i.get(b),st=x.length>1;if(st)for(let ut=0;ut<x.length;ut++)n.bindFramebuffer(e.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ut,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,Ct.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ut,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer);const j=b.texture.mipmaps;j&&j.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let ut=0;ut<x.length;ut++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(it|=e.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(it|=e.STENCIL_BUFFER_BIT)),st){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,Ct.__webglColorRenderbuffer[ut]);const gt=i.get(x[ut]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,gt,0)}e.blitFramebuffer(0,0,Y,K,0,0,Y,K,it,e.NEAREST),l===!0&&(ce.length=0,Je.length=0,ce.push(e.COLOR_ATTACHMENT0+ut),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ce.push(St),Je.push(St),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Je)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ce))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),st)for(let ut=0;ut<x.length;ut++){n.bindFramebuffer(e.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ut,e.RENDERBUFFER,Ct.__webglColorRenderbuffer[ut]);const gt=i.get(x[ut]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,Ct.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ut,e.TEXTURE_2D,gt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const x=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[x])}}}function ue(b){return Math.min(a.maxSamples,b.samples)}function Ot(b){const x=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function H(b){const x=r.render.frame;d.get(b)!==x&&(d.set(b,x),b.update())}function fe(b,x){const Y=b.colorSpace,K=b.format,it=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||Y!==Zu&&Y!==rs&&(we.getTransfer(Y)===We?(K!==ji||it!==Oi)&&ie("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Pe("WebGLTextures: Unsupported texture color space:",Y)),x}function ne(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=P,this.getTextureUnits=V,this.setTextureUnits=k,this.setTexture2D=O,this.setTexture2DArray=X,this.setTexture3D=ht,this.setTextureCube=bt,this.rebindTextures=xe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=ze,this.updateMultisampleRenderTarget=nn,this.setupDepthRenderbuffer=Le,this.setupFrameBufferTexture=Zt,this.useMultisampledRTT=Ot,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function N3(e,t){function n(i,a=rs){let s;const r=we.getTransfer(a);if(i===Oi)return e.UNSIGNED_BYTE;if(i===Im)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Bm)return e.UNSIGNED_SHORT_5_5_5_1;if(i===$S)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===ty)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===QS)return e.BYTE;if(i===JS)return e.SHORT;if(i===Pl)return e.UNSIGNED_SHORT;if(i===zm)return e.INT;if(i===ua)return e.UNSIGNED_INT;if(i===Zi)return e.FLOAT;if(i===ka)return e.HALF_FLOAT;if(i===ey)return e.ALPHA;if(i===ny)return e.RGB;if(i===ji)return e.RGBA;if(i===Xa)return e.DEPTH_COMPONENT;if(i===Ws)return e.DEPTH_STENCIL;if(i===Fm)return e.RED;if(i===Hm)return e.RED_INTEGER;if(i===ar)return e.RG;if(i===Gm)return e.RG_INTEGER;if(i===Vm)return e.RGBA_INTEGER;if(i===cu||i===uu||i===fu||i===du)if(r===We)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===cu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===cu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===du)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Qh||i===Jh||i===$h||i===tp)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Qh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Jh)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$h)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===tp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ep||i===np||i===ip||i===ap||i===sp||i===qu||i===rp)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ep||i===np)return r===We?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ip)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===ap)return s.COMPRESSED_R11_EAC;if(i===sp)return s.COMPRESSED_SIGNED_R11_EAC;if(i===qu)return s.COMPRESSED_RG11_EAC;if(i===rp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===op||i===lp||i===cp||i===up||i===fp||i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===Sp)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===op)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===cp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===up)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===fp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===dp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===hp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===pp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===mp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===_p)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===xp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sp)return r===We?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yp||i===Mp||i===bp)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===yp)return r===We?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Mp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ep||i===Tp||i===Yu||i===Ap)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ep)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Tp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ap)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zl?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const U3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,L3=`
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

}`;class O3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new my(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Bn({vertexShader:U3,fragmentShader:L3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Hi(new Mf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class P3 extends dr{constructor(t,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const y=typeof XRWebGLBinding<"u",m=new O3,f={},v=n.getContextAttributes();let M=null,S=null;const U=[],C=[],E=new Ge;let _=null;const w=new Di;w.viewport=new fn;const D=new Di;D.viewport=new fn;const L=[w,D],I=new W1;let P=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(dt){let At=U[dt];return At===void 0&&(At=new xd,U[dt]=At),At.getTargetRaySpace()},this.getControllerGrip=function(dt){let At=U[dt];return At===void 0&&(At=new xd,U[dt]=At),At.getGripSpace()},this.getHand=function(dt){let At=U[dt];return At===void 0&&(At=new xd,U[dt]=At),At.getHandSpace()};function k(dt){const At=C.indexOf(dt.inputSource);if(At===-1)return;const lt=U[At];lt!==void 0&&(lt.update(dt.inputSource,dt.frame,c||r),lt.dispatchEvent({type:dt.type,data:dt.inputSource}))}function B(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",F);for(let dt=0;dt<U.length;dt++){const At=C[dt];At!==null&&(C[dt]=null,U[dt].disconnect(At))}P=null,V=null,m.reset();for(const dt in f)delete f[dt];t.setRenderTarget(M),p=null,u=null,h=null,a=null,S=null,ae.stop(),i.isPresenting=!1,t.setPixelRatio(_),t.setSize(E.width,E.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(dt){s=dt,i.isPresenting===!0&&ie("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(dt){o=dt,i.isPresenting===!0&&ie("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(dt){c=dt},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&y&&(h=new XRWebGLBinding(a,n)),h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(dt){if(a=dt,a!==null){if(M=t.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",B),a.addEventListener("inputsourceschange",F),v.xrCompatible!==!0&&await n.makeXRCompatible(),_=t.getPixelRatio(),t.getSize(E),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let lt=null,Bt=null,qt=null;v.depth&&(qt=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,lt=v.stencil?Ws:Xa,Bt=v.stencil?zl:ua);const Zt={colorFormat:n.RGBA8,depthFormat:qt,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Zt),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new ca(u.textureWidth,u.textureHeight,{format:ji,type:Oi,depthTexture:new So(u.textureWidth,u.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,lt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const lt={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,lt),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new ca(p.framebufferWidth,p.framebufferHeight,{format:ji,type:Oi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),ae.setContext(a),ae.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(dt){for(let At=0;At<dt.removed.length;At++){const lt=dt.removed[At],Bt=C.indexOf(lt);Bt>=0&&(C[Bt]=null,U[Bt].disconnect(lt))}for(let At=0;At<dt.added.length;At++){const lt=dt.added[At];let Bt=C.indexOf(lt);if(Bt===-1){for(let Zt=0;Zt<U.length;Zt++)if(Zt>=C.length){C.push(lt),Bt=Zt;break}else if(C[Zt]===null){C[Zt]=lt,Bt=Zt;break}if(Bt===-1)break}const qt=U[Bt];qt&&qt.connect(lt)}}const O=new J,X=new J;function ht(dt,At,lt){O.setFromMatrixPosition(At.matrixWorld),X.setFromMatrixPosition(lt.matrixWorld);const Bt=O.distanceTo(X),qt=At.projectionMatrix.elements,Zt=lt.projectionMatrix.elements,Ue=qt[14]/(qt[10]-1),ee=qt[14]/(qt[10]+1),Le=(qt[9]+1)/qt[5],xe=(qt[9]-1)/qt[5],me=(qt[8]-1)/qt[0],ze=(Zt[8]+1)/Zt[0],ce=Ue*me,Je=Ue*ze,nn=Bt/(-me+ze),ue=nn*-me;if(At.matrixWorld.decompose(dt.position,dt.quaternion,dt.scale),dt.translateX(ue),dt.translateZ(nn),dt.matrixWorld.compose(dt.position,dt.quaternion,dt.scale),dt.matrixWorldInverse.copy(dt.matrixWorld).invert(),qt[10]===-1)dt.projectionMatrix.copy(At.projectionMatrix),dt.projectionMatrixInverse.copy(At.projectionMatrixInverse);else{const Ot=Ue+nn,H=ee+nn,fe=ce-ue,ne=Je+(Bt-ue),b=Le*ee/H*Ot,x=xe*ee/H*Ot;dt.projectionMatrix.makePerspective(fe,ne,b,x,Ot,H),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert()}}function bt(dt,At){At===null?dt.matrixWorld.copy(dt.matrix):dt.matrixWorld.multiplyMatrices(At.matrixWorld,dt.matrix),dt.matrixWorldInverse.copy(dt.matrixWorld).invert()}this.updateCamera=function(dt){if(a===null)return;let At=dt.near,lt=dt.far;m.texture!==null&&(m.depthNear>0&&(At=m.depthNear),m.depthFar>0&&(lt=m.depthFar)),I.near=D.near=w.near=At,I.far=D.far=w.far=lt,(P!==I.near||V!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),P=I.near,V=I.far),I.layers.mask=dt.layers.mask|6,w.layers.mask=I.layers.mask&-5,D.layers.mask=I.layers.mask&-3;const Bt=dt.parent,qt=I.cameras;bt(I,Bt);for(let Zt=0;Zt<qt.length;Zt++)bt(qt[Zt],Bt);qt.length===2?ht(I,w,D):I.projectionMatrix.copy(w.projectionMatrix),Nt(dt,I,Bt)};function Nt(dt,At,lt){lt===null?dt.matrix.copy(At.matrixWorld):(dt.matrix.copy(lt.matrixWorld),dt.matrix.invert(),dt.matrix.multiply(At.matrixWorld)),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.updateMatrixWorld(!0),dt.projectionMatrix.copy(At.projectionMatrix),dt.projectionMatrixInverse.copy(At.projectionMatrixInverse),dt.isPerspectiveCamera&&(dt.fov=Rp*2*Math.atan(1/dt.projectionMatrix.elements[5]),dt.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(dt){l=dt,u!==null&&(u.fixedFoveation=dt),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=dt)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(dt){return f[dt]};let re=null;function Qt(dt,At){if(d=At.getViewerPose(c||r),g=At,d!==null){const lt=d.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let Bt=!1;lt.length!==I.cameras.length&&(I.cameras.length=0,Bt=!0);for(let ee=0;ee<lt.length;ee++){const Le=lt[ee];let xe=null;if(p!==null)xe=p.getViewport(Le);else{const ze=h.getViewSubImage(u,Le);xe=ze.viewport,ee===0&&(t.setRenderTargetTextures(S,ze.colorTexture,ze.depthStencilTexture),t.setRenderTarget(S))}let me=L[ee];me===void 0&&(me=new Di,me.layers.enable(ee),me.viewport=new fn,L[ee]=me),me.matrix.fromArray(Le.transform.matrix),me.matrix.decompose(me.position,me.quaternion,me.scale),me.projectionMatrix.fromArray(Le.projectionMatrix),me.projectionMatrixInverse.copy(me.projectionMatrix).invert(),me.viewport.set(xe.x,xe.y,xe.width,xe.height),ee===0&&(I.matrix.copy(me.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Bt===!0&&I.cameras.push(me)}const qt=a.enabledFeatures;if(qt&&qt.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&y){h=i.getBinding();const ee=h.getDepthInformation(lt[0]);ee&&ee.isValid&&ee.texture&&m.init(ee,a.renderState)}if(qt&&qt.includes("camera-access")&&y){t.state.unbindTexture(),h=i.getBinding();for(let ee=0;ee<lt.length;ee++){const Le=lt[ee].camera;if(Le){let xe=f[Le];xe||(xe=new my,f[Le]=xe);const me=h.getCameraImage(Le);xe.sourceTexture=me}}}}for(let lt=0;lt<U.length;lt++){const Bt=C[lt],qt=U[lt];Bt!==null&&qt!==void 0&&qt.update(Bt,At,c||r)}re&&re(dt,At),At.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:At}),g=null}const ae=new _y;ae.setAnimationLoop(Qt),this.setAnimationLoop=function(dt){re=dt},this.dispose=function(){}}}const z3=new en,Ty=new de;Ty.set(-1,0,0,0,1,0,0,0,1);function I3(e,t){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,gy(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,v,M,S){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,S)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),y(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===si&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===si&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=t.get(f),M=v.envMap,S=v.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(z3.makeRotationFromEuler(S)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ty),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=M*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===si&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function y(m,f){const v=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function B3(e,t,n,i){let a={},s={},r=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(S,U){const C=U.program;i.uniformBlockBinding(S,C)}function c(S,U){let C=a[S.id];C===void 0&&(m(S),C=d(S),a[S.id]=C,S.addEventListener("dispose",v));const E=U.program;i.updateUBOMapping(S,E);const _=t.render.frame;s[S.id]!==_&&(u(S),s[S.id]=_)}function d(S){const U=h();S.__bindingPointIndex=U;const C=e.createBuffer(),E=S.__size,_=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,C),e.bufferData(e.UNIFORM_BUFFER,E,_),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,U,C),C}function h(){for(let S=0;S<o;S++)if(r.indexOf(S)===-1)return r.push(S),S;return Pe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const U=a[S.id],C=S.uniforms,E=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,U);for(let _=0,w=C.length;_<w;_++){const D=C[_];if(Array.isArray(D))for(let L=0,I=D.length;L<I;L++)p(D[L],_,L,E);else p(D,_,0,E)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(S,U,C,E){if(y(S,U,C,E)===!0){const _=S.__offset,w=S.value;if(Array.isArray(w)){let D=0;for(let L=0;L<w.length;L++){const I=w[L],P=f(I);g(I,S.__data,D),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(D+=P.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,S.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,_,S.__data)}}function g(S,U,C){typeof S=="number"||typeof S=="boolean"?U[0]=S:S.isMatrix3?(U[0]=S.elements[0],U[1]=S.elements[1],U[2]=S.elements[2],U[3]=0,U[4]=S.elements[3],U[5]=S.elements[4],U[6]=S.elements[5],U[7]=0,U[8]=S.elements[6],U[9]=S.elements[7],U[10]=S.elements[8],U[11]=0):ArrayBuffer.isView(S)?U.set(new S.constructor(S.buffer,S.byteOffset,U.length)):S.toArray(U,C)}function y(S,U,C,E){const _=S.value,w=U+"_"+C;if(E[w]===void 0)return typeof _=="number"||typeof _=="boolean"?E[w]=_:ArrayBuffer.isView(_)?E[w]=_.slice():E[w]=_.clone(),!0;{const D=E[w];if(typeof _=="number"||typeof _=="boolean"){if(D!==_)return E[w]=_,!0}else{if(ArrayBuffer.isView(_))return!0;if(D.equals(_)===!1)return D.copy(_),!0}}return!1}function m(S){const U=S.uniforms;let C=0;const E=16;for(let w=0,D=U.length;w<D;w++){const L=Array.isArray(U[w])?U[w]:[U[w]];for(let I=0,P=L.length;I<P;I++){const V=L[I],k=Array.isArray(V.value)?V.value:[V.value];for(let B=0,F=k.length;B<F;B++){const O=k[B],X=f(O),ht=C%E,bt=ht%X.boundary,Nt=ht+bt;C+=bt,Nt!==0&&E-Nt<X.storage&&(C+=E-Nt),V.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),V.__offset=C,C+=X.storage}}}const _=C%E;return _>0&&(C+=E-_),S.__size=C,S.__cache={},this}function f(S){const U={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(U.boundary=4,U.storage=4):S.isVector2?(U.boundary=8,U.storage=8):S.isVector3||S.isColor?(U.boundary=16,U.storage=12):S.isVector4?(U.boundary=16,U.storage=16):S.isMatrix3?(U.boundary=48,U.storage=48):S.isMatrix4?(U.boundary=64,U.storage=64):S.isTexture?ie("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(S)?(U.boundary=16,U.storage=S.byteLength):ie("WebGLRenderer: Unsupported uniform value type.",S),U}function v(S){const U=S.target;U.removeEventListener("dispose",v);const C=r.indexOf(U.__bindingPointIndex);r.splice(C,1),e.deleteBuffer(a[U.id]),delete a[U.id],delete s[U.id]}function M(){for(const S in a)e.deleteBuffer(a[S]);r=[],a={},s={}}return{bind:l,update:c,dispose:M}}const F3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ta=null;function H3(){return ta===null&&(ta=new fy(F3,16,16,ar,ka),ta.name="DFG_LUT",ta.minFilter=kn,ta.magFilter=kn,ta.wrapS=Ua,ta.wrapT=Ua,ta.generateMipmaps=!1,ta.needsUpdate=!0),ta}class Ay{constructor(t={}){const{canvas:n=o1(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Oi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const y=p,m=new Set([Vm,Gm,Hm]),f=new Set([Oi,ua,Pl,zl,Im,Bm]),v=new Uint32Array(4),M=new Int32Array(4),S=new J;let U=null,C=null;const E=[],_=[];let w=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let L=!1,I=null,P=null,V=null,k=null;this._outputColorSpace=Ai;let B=0,F=0,O=null,X=-1,ht=null;const bt=new fn,Nt=new fn;let re=null;const Qt=new Ae(0);let ae=0,dt=n.width,At=n.height,lt=1,Bt=null,qt=null;const Zt=new fn(0,0,dt,At),Ue=new fn(0,0,dt,At);let ee=!1;const Le=new dy;let xe=!1,me=!1;const ze=new en,ce=new J,Je=new fn,nn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ue=!1;function Ot(){return O===null?lt:1}let H=i;function fe(A,Z){return n.getContext(A,Z)}try{const A={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Pm}`),n.addEventListener("webglcontextlost",Me,!1),n.addEventListener("webglcontextrestored",Ie,!1),n.addEventListener("webglcontextcreationerror",Dn,!1),H===null){const Z="webgl2";if(H=fe(Z,A),H===null)throw fe(Z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw Pe("WebGLRenderer: "+A.message),A}let ne,b,x,Y,K,it,St,Ct,st,j,ut,gt,_t,yt,Ft,kt,$t,G,Et,ct,rt,Ut,vt;function Xt(){ne=new H2(H),ne.init(),rt=new N3(H,ne),b=new U2(H,ne,t,rt),x=new w3(H,ne),b.reversedDepthBuffer&&u&&x.buffers.depth.setReversed(!0),P=H.createFramebuffer(),V=H.createFramebuffer(),k=H.createFramebuffer(),Y=new k2(H),K=new m3,it=new D3(H,ne,x,K,b,rt,Y),St=new F2(D),Ct=new Y1(H),Ut=new D2(H,Ct),st=new G2(H,Ct,Y,Ut),j=new W2(H,st,Ct,Ut,Y),G=new X2(H,b,it),Ft=new L2(K),ut=new p3(D,St,ne,b,Ut,Ft),gt=new I3(D,K),_t=new v3,yt=new b3(ne),$t=new w2(D,St,x,j,g,l),kt=new C3(D,j,b),vt=new B3(H,Y,b,x),Et=new N2(H,ne,Y),ct=new V2(H,ne,Y),Y.programs=ut.programs,D.capabilities=b,D.extensions=ne,D.properties=K,D.renderLists=_t,D.shadowMap=kt,D.state=x,D.info=Y}Xt(),y!==Oi&&(w=new Y2(y,n.width,n.height,o,a,s));const Ht=new P3(D,H);this.xr=Ht,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=ne.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=ne.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return lt},this.setPixelRatio=function(A){A!==void 0&&(lt=A,this.setSize(dt,At,!1))},this.getSize=function(A){return A.set(dt,At)},this.setSize=function(A,Z,nt=!0){if(Ht.isPresenting){ie("WebGLRenderer: Can't change size while VR device is presenting.");return}dt=A,At=Z,n.width=Math.floor(A*lt),n.height=Math.floor(Z*lt),nt===!0&&(n.style.width=A+"px",n.style.height=Z+"px"),w!==null&&w.setSize(n.width,n.height),this.setViewport(0,0,A,Z)},this.getDrawingBufferSize=function(A){return A.set(dt*lt,At*lt).floor()},this.setDrawingBufferSize=function(A,Z,nt){dt=A,At=Z,lt=nt,n.width=Math.floor(A*nt),n.height=Math.floor(Z*nt),this.setViewport(0,0,A,Z)},this.setEffects=function(A){if(y===Oi){Pe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let Z=0;Z<A.length;Z++)if(A[Z].isOutputPass===!0){ie("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(bt)},this.getViewport=function(A){return A.copy(Zt)},this.setViewport=function(A,Z,nt,Q){A.isVector4?Zt.set(A.x,A.y,A.z,A.w):Zt.set(A,Z,nt,Q),x.viewport(bt.copy(Zt).multiplyScalar(lt).round())},this.getScissor=function(A){return A.copy(Ue)},this.setScissor=function(A,Z,nt,Q){A.isVector4?Ue.set(A.x,A.y,A.z,A.w):Ue.set(A,Z,nt,Q),x.scissor(Nt.copy(Ue).multiplyScalar(lt).round())},this.getScissorTest=function(){return ee},this.setScissorTest=function(A){x.setScissorTest(ee=A)},this.setOpaqueSort=function(A){Bt=A},this.setTransparentSort=function(A){qt=A},this.getClearColor=function(A){return A.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor(...arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha(...arguments)},this.clear=function(A=!0,Z=!0,nt=!0){let Q=0;if(A){let $=!1;if(O!==null){const Lt=O.texture.format;$=m.has(Lt)}if($){const Lt=O.texture.type,T=f.has(Lt),R=$t.getClearColor(),N=$t.getClearAlpha(),W=R.r,q=R.g,tt=R.b;T?(v[0]=W,v[1]=q,v[2]=tt,v[3]=N,H.clearBufferuiv(H.COLOR,0,v)):(M[0]=W,M[1]=q,M[2]=tt,M[3]=N,H.clearBufferiv(H.COLOR,0,M))}else Q|=H.COLOR_BUFFER_BIT}Z&&(Q|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),nt&&(Q|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Q!==0&&H.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){n.removeEventListener("webglcontextlost",Me,!1),n.removeEventListener("webglcontextrestored",Ie,!1),n.removeEventListener("webglcontextcreationerror",Dn,!1),$t.dispose(),_t.dispose(),yt.dispose(),K.dispose(),St.dispose(),j.dispose(),Ut.dispose(),vt.dispose(),ut.dispose(),Ht.dispose(),Ht.removeEventListener("sessionstart",li),Ht.removeEventListener("sessionend",Hn),Qn.stop()};function Me(A){A.preventDefault(),Bg("WebGLRenderer: Context Lost."),L=!0}function Ie(){Bg("WebGLRenderer: Context Restored."),L=!1;const A=Y.autoReset,Z=kt.enabled,nt=kt.autoUpdate,Q=kt.needsUpdate,$=kt.type;Xt(),Y.autoReset=A,kt.enabled=Z,kt.autoUpdate=nt,kt.needsUpdate=Q,kt.type=$}function Dn(A){Pe("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Nn(A){const Z=A.target;Z.removeEventListener("dispose",Nn),Ce(Z)}function Ce(A){yi(A),K.remove(A)}function yi(A){const Z=K.get(A).programs;Z!==void 0&&(Z.forEach(function(nt){ut.releaseProgram(nt)}),A.isShaderMaterial&&ut.releaseShaderCache(A))}this.renderBufferDirect=function(A,Z,nt,Q,$,Lt){Z===null&&(Z=nn);const T=$.isMesh&&$.matrixWorld.determinantAffine()<0,R=pa(A,Z,nt,Q,$);x.setMaterial(Q,T);let N=nt.index,W=1;if(Q.wireframe===!0){if(N=st.getWireframeAttribute(nt),N===void 0)return;W=2}const q=nt.drawRange,tt=nt.attributes.position;let et=q.start*W,ft=(q.start+q.count)*W;Lt!==null&&(et=Math.max(et,Lt.start*W),ft=Math.min(ft,(Lt.start+Lt.count)*W)),N!==null?(et=Math.max(et,0),ft=Math.min(ft,N.count)):tt!=null&&(et=Math.max(et,0),ft=Math.min(ft,tt.count));const pt=ft-et;if(pt<0||pt===1/0)return;Ut.setup($,Q,R,nt,N);let Mt,Tt=Et;if(N!==null&&(Mt=Ct.get(N),Tt=ct,Tt.setIndex(Mt)),$.isMesh)Q.wireframe===!0?(x.setLineWidth(Q.wireframeLinewidth*Ot()),Tt.setMode(H.LINES)):Tt.setMode(H.TRIANGLES);else if($.isLine){let xt=Q.linewidth;xt===void 0&&(xt=1),x.setLineWidth(xt*Ot()),$.isLineSegments?Tt.setMode(H.LINES):$.isLineLoop?Tt.setMode(H.LINE_LOOP):Tt.setMode(H.LINE_STRIP)}else $.isPoints?Tt.setMode(H.POINTS):$.isSprite&&Tt.setMode(H.TRIANGLES);if($.isBatchedMesh)if(ne.get("WEBGL_multi_draw"))Tt.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const xt=$._multiDrawStarts,ot=$._multiDrawCounts,Wt=$._multiDrawCount,Rt=N?Ct.get(N).bytesPerElement:1,Gt=K.get(Q).currentProgram.getUniforms();for(let Yt=0;Yt<Wt;Yt++)Gt.setValue(H,"_gl_DrawID",Yt),Tt.render(xt[Yt]/Rt,ot[Yt])}else if($.isInstancedMesh)Tt.renderInstances(et,pt,$.count);else if(nt.isInstancedBufferGeometry){const xt=nt._maxInstanceCount!==void 0?nt._maxInstanceCount:1/0,ot=Math.min(nt.instanceCount,xt);Tt.renderInstances(et,pt,ot)}else Tt.render(et,pt)};function $e(A,Z,nt){A.transparent===!0&&A.side===Ca&&A.forceSinglePass===!1?(A.side=si,A.needsUpdate=!0,Jn(A,Z,nt),A.side=Rs,A.needsUpdate=!0,Jn(A,Z,nt),A.side=Ca):Jn(A,Z,nt)}this.compile=function(A,Z,nt=null){nt===null&&(nt=A),C=yt.get(nt),C.init(Z),_.push(C),nt.traverseVisible(function($){$.isLight&&$.layers.test(Z.layers)&&(C.pushLight($),$.castShadow&&C.pushShadow($))}),A!==nt&&A.traverseVisible(function($){$.isLight&&$.layers.test(Z.layers)&&(C.pushLight($),$.castShadow&&C.pushShadow($))}),C.setupLights();const Q=new Set;return A.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const Lt=$.material;if(Lt)if(Array.isArray(Lt))for(let T=0;T<Lt.length;T++){const R=Lt[T];$e(R,nt,$),Q.add(R)}else $e(Lt,nt,$),Q.add(Lt)}),C=_.pop(),Q},this.compileAsync=function(A,Z,nt=null){const Q=this.compile(A,Z,nt);return new Promise($=>{function Lt(){if(Q.forEach(function(T){K.get(T).currentProgram.isReady()&&Q.delete(T)}),Q.size===0){$(A);return}setTimeout(Lt,10)}ne.get("KHR_parallel_shader_compile")!==null?Lt():setTimeout(Lt,10)})};let be=null;function Un(A){be&&be(A)}function li(){Qn.stop()}function Hn(){Qn.start()}const Qn=new _y;Qn.setAnimationLoop(Un),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(A){be=A,Ht.setAnimationLoop(A),A===null?Qn.stop():Qn.start()},Ht.addEventListener("sessionstart",li),Ht.addEventListener("sessionend",Hn),this.render=function(A,Z){if(Z!==void 0&&Z.isCamera!==!0){Pe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;I!==null&&I.renderStart(A,Z);const nt=Ht.enabled===!0&&Ht.isPresenting===!0,Q=w!==null&&(O===null||nt)&&w.begin(D,O);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),Ht.enabled===!0&&Ht.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ht.cameraAutoUpdate===!0&&Ht.updateCamera(Z),Z=Ht.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,Z,O),C=yt.get(A,_.length),C.init(Z),C.state.textureUnits=it.getTextureUnits(),_.push(C),ze.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),Le.setFromProjectionMatrix(ze,ra,Z.reversedDepth),me=this.localClippingEnabled,xe=Ft.init(this.clippingPlanes,me),U=_t.get(A,E.length),U.init(),E.push(U),Ht.enabled===!0&&Ht.isPresenting===!0){const T=D.xr.getDepthSensingMesh();T!==null&&Gi(T,Z,-1/0,D.sortObjects)}Gi(A,Z,0,D.sortObjects),U.finish(),D.sortObjects===!0&&U.sort(Bt,qt,Z.reversedDepth),ue=Ht.enabled===!1||Ht.isPresenting===!1||Ht.hasDepthSensing()===!1,ue&&$t.addToRenderList(U,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),xe===!0&&Ft.beginShadows();const $=C.state.shadowsArray;if(kt.render($,A,Z),xe===!0&&Ft.endShadows(),(Q&&w.hasRenderPass())===!1){const T=U.opaque,R=U.transmissive;if(C.setupLights(),Z.isArrayCamera){const N=Z.cameras;if(R.length>0)for(let W=0,q=N.length;W<q;W++){const tt=N[W];Mi(T,R,A,tt)}ue&&$t.render(A);for(let W=0,q=N.length;W<q;W++){const tt=N[W];ha(U,A,tt,tt.viewport)}}else R.length>0&&Mi(T,R,A,Z),ue&&$t.render(A),ha(U,A,Z)}O!==null&&F===0&&(it.updateMultisampleRenderTarget(O),it.updateRenderTargetMipmap(O)),Q&&w.end(D),A.isScene===!0&&A.onAfterRender(D,A,Z),Ut.resetDefaultState(),X=-1,ht=null,_.pop(),_.length>0?(C=_[_.length-1],it.setTextureUnits(C.state.textureUnits),xe===!0&&Ft.setGlobalState(D.clippingPlanes,C.state.camera)):C=null,E.pop(),E.length>0?U=E[E.length-1]:U=null,I!==null&&I.renderEnd()};function Gi(A,Z,nt,Q){if(A.visible===!1)return;if(A.layers.test(Z.layers)){if(A.isGroup)nt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Z);else if(A.isLightProbeGrid)C.pushLightProbeGrid(A);else if(A.isLight)C.pushLight(A),A.castShadow&&C.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Le.intersectsSprite(A)){Q&&Je.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ze);const T=j.update(A),R=A.material;R.visible&&U.push(A,T,R,nt,Je.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Le.intersectsObject(A))){const T=j.update(A),R=A.material;if(Q&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Je.copy(A.boundingSphere.center)):(T.boundingSphere===null&&T.computeBoundingSphere(),Je.copy(T.boundingSphere.center)),Je.applyMatrix4(A.matrixWorld).applyMatrix4(ze)),Array.isArray(R)){const N=T.groups;for(let W=0,q=N.length;W<q;W++){const tt=N[W],et=R[tt.materialIndex];et&&et.visible&&U.push(A,T,et,nt,Je.z,tt)}}else R.visible&&U.push(A,T,R,nt,Je.z,null)}}const Lt=A.children;for(let T=0,R=Lt.length;T<R;T++)Gi(Lt[T],Z,nt,Q)}function ha(A,Z,nt,Q){const{opaque:$,transmissive:Lt,transparent:T}=A;C.setupLightsView(nt),xe===!0&&Ft.setGlobalState(D.clippingPlanes,nt),Q&&x.viewport(bt.copy(Q)),$.length>0&&Qi($,Z,nt),Lt.length>0&&Qi(Lt,Z,nt),T.length>0&&Qi(T,Z,nt),x.buffers.depth.setTest(!0),x.buffers.depth.setMask(!0),x.buffers.color.setMask(!0),x.setPolygonOffset(!1)}function Mi(A,Z,nt,Q){if((nt.isScene===!0?nt.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[Q.id]===void 0){const et=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[Q.id]=new ca(1,1,{generateMipmaps:!0,type:et?ka:Oi,minFilter:Xs,samples:Math.max(4,b.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:we.workingColorSpace})}const Lt=C.state.transmissionRenderTarget[Q.id],T=Q.viewport||bt;Lt.setSize(T.z*D.transmissionResolutionScale,T.w*D.transmissionResolutionScale);const R=D.getRenderTarget(),N=D.getActiveCubeFace(),W=D.getActiveMipmapLevel();D.setRenderTarget(Lt),D.getClearColor(Qt),ae=D.getClearAlpha(),ae<1&&D.setClearColor(16777215,.5),D.clear(),ue&&$t.render(nt);const q=D.toneMapping;D.toneMapping=la;const tt=Q.viewport;if(Q.viewport!==void 0&&(Q.viewport=void 0),C.setupLightsView(Q),xe===!0&&Ft.setGlobalState(D.clippingPlanes,Q),Qi(A,nt,Q),it.updateMultisampleRenderTarget(Lt),it.updateRenderTargetMipmap(Lt),ne.has("WEBGL_multisampled_render_to_texture")===!1){let et=!1;for(let ft=0,pt=Z.length;ft<pt;ft++){const Mt=Z[ft],{object:Tt,geometry:xt,material:ot,group:Wt}=Mt;if(ot.side===Ca&&Tt.layers.test(Q.layers)){const Rt=ot.side;ot.side=si,ot.needsUpdate=!0,Vi(Tt,nt,Q,xt,ot,Wt),ot.side=Rt,ot.needsUpdate=!0,et=!0}}et===!0&&(it.updateMultisampleRenderTarget(Lt),it.updateRenderTargetMipmap(Lt))}D.setRenderTarget(R,N,W),D.setClearColor(Qt,ae),tt!==void 0&&(Q.viewport=tt),D.toneMapping=q}function Qi(A,Z,nt){const Q=Z.isScene===!0?Z.overrideMaterial:null;for(let $=0,Lt=A.length;$<Lt;$++){const T=A[$],{object:R,geometry:N,group:W}=T;let q=T.material;q.allowOverride===!0&&Q!==null&&(q=Q),R.layers.test(nt.layers)&&Vi(R,Z,nt,N,q,W)}}function Vi(A,Z,nt,Q,$,Lt){A.onBeforeRender(D,Z,nt,Q,$,Lt),A.modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),$.onBeforeRender(D,Z,nt,Q,A,Lt),$.transparent===!0&&$.side===Ca&&$.forceSinglePass===!1?($.side=si,$.needsUpdate=!0,D.renderBufferDirect(nt,Z,Q,$,A,Lt),$.side=Rs,$.needsUpdate=!0,D.renderBufferDirect(nt,Z,Q,$,A,Lt),$.side=Ca):D.renderBufferDirect(nt,Z,Q,$,A,Lt),A.onAfterRender(D,Z,nt,Q,$,Lt)}function Jn(A,Z,nt){Z.isScene!==!0&&(Z=nn);const Q=K.get(A),$=C.state.lights,Lt=C.state.shadowsArray,T=$.state.version,R=ut.getParameters(A,$.state,Lt,Z,nt,C.state.lightProbeGridArray),N=ut.getProgramCacheKey(R);let W=Q.programs;Q.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?Z.environment:null,Q.fog=Z.fog;const q=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;Q.envMap=St.get(A.envMap||Q.environment,q),Q.envMapRotation=Q.environment!==null&&A.envMap===null?Z.environmentRotation:A.envMapRotation,W===void 0&&(A.addEventListener("dispose",Nn),W=new Map,Q.programs=W);let tt=W.get(N);if(tt!==void 0){if(Q.currentProgram===tt&&Q.lightsStateVersion===T)return qa(A,R),tt}else R.uniforms=ut.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,nt,R),A.onBeforeCompile(R,D),tt=ut.acquireProgram(R,N),W.set(N,tt),Q.uniforms=R.uniforms;const et=Q.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(et.clippingPlanes=Ft.uniform),qa(A,R),Q.needsLights=Ns(A),Q.lightsStateVersion=T,Q.needsLights&&(et.ambientLightColor.value=$.state.ambient,et.lightProbe.value=$.state.probe,et.directionalLights.value=$.state.directional,et.directionalLightShadows.value=$.state.directionalShadow,et.spotLights.value=$.state.spot,et.spotLightShadows.value=$.state.spotShadow,et.rectAreaLights.value=$.state.rectArea,et.ltc_1.value=$.state.rectAreaLTC1,et.ltc_2.value=$.state.rectAreaLTC2,et.pointLights.value=$.state.point,et.pointLightShadows.value=$.state.pointShadow,et.hemisphereLights.value=$.state.hemi,et.directionalShadowMatrix.value=$.state.directionalShadowMatrix,et.spotLightMatrix.value=$.state.spotLightMatrix,et.spotLightMap.value=$.state.spotLightMap,et.pointShadowMatrix.value=$.state.pointShadowMatrix),Q.lightProbeGrid=C.state.lightProbeGridArray.length>0,Q.currentProgram=tt,Q.uniformsList=null,tt}function bi(A){if(A.uniformsList===null){const Z=A.currentProgram.getUniforms();A.uniformsList=mu.seqWithValue(Z.seq,A.uniforms)}return A.uniformsList}function qa(A,Z){const nt=K.get(A);nt.outputColorSpace=Z.outputColorSpace,nt.batching=Z.batching,nt.batchingColor=Z.batchingColor,nt.instancing=Z.instancing,nt.instancingColor=Z.instancingColor,nt.instancingMorph=Z.instancingMorph,nt.skinning=Z.skinning,nt.morphTargets=Z.morphTargets,nt.morphNormals=Z.morphNormals,nt.morphColors=Z.morphColors,nt.morphTargetsCount=Z.morphTargetsCount,nt.numClippingPlanes=Z.numClippingPlanes,nt.numIntersection=Z.numClipIntersection,nt.vertexAlphas=Z.vertexAlphas,nt.vertexTangents=Z.vertexTangents,nt.toneMapping=Z.toneMapping}function Ds(A,Z){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;S.setFromMatrixPosition(Z.matrixWorld);for(let nt=0,Q=A.length;nt<Q;nt++){const $=A[nt];if($.texture!==null&&$.boundingBox.containsPoint(S))return $}return null}function pa(A,Z,nt,Q,$){Z.isScene!==!0&&(Z=nn),it.resetTextureUnits();const Lt=Z.fog,T=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial?Z.environment:null,R=O===null?D.outputColorSpace:O.isXRRenderTarget===!0?O.texture.colorSpace:we.workingColorSpace,N=Q.isMeshStandardMaterial||Q.isMeshLambertMaterial&&!Q.envMap||Q.isMeshPhongMaterial&&!Q.envMap,W=St.get(Q.envMap||T,N),q=Q.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,tt=!!nt.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),et=!!nt.morphAttributes.position,ft=!!nt.morphAttributes.normal,pt=!!nt.morphAttributes.color;let Mt=la;Q.toneMapped&&(O===null||O.isXRRenderTarget===!0)&&(Mt=D.toneMapping);const Tt=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,xt=Tt!==void 0?Tt.length:0,ot=K.get(Q),Wt=C.state.lights;if(xe===!0&&(me===!0||A!==ht)){const le=A===ht&&Q.id===X;Ft.setState(Q,A,le)}let Rt=!1;Q.version===ot.__version?(ot.needsLights&&ot.lightsStateVersion!==Wt.state.version||ot.outputColorSpace!==R||$.isBatchedMesh&&ot.batching===!1||!$.isBatchedMesh&&ot.batching===!0||$.isBatchedMesh&&ot.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&ot.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&ot.instancing===!1||!$.isInstancedMesh&&ot.instancing===!0||$.isSkinnedMesh&&ot.skinning===!1||!$.isSkinnedMesh&&ot.skinning===!0||$.isInstancedMesh&&ot.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&ot.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&ot.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&ot.instancingMorph===!1&&$.morphTexture!==null||ot.envMap!==W||Q.fog===!0&&ot.fog!==Lt||ot.numClippingPlanes!==void 0&&(ot.numClippingPlanes!==Ft.numPlanes||ot.numIntersection!==Ft.numIntersection)||ot.vertexAlphas!==q||ot.vertexTangents!==tt||ot.morphTargets!==et||ot.morphNormals!==ft||ot.morphColors!==pt||ot.toneMapping!==Mt||ot.morphTargetsCount!==xt||!!ot.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(Rt=!0):(Rt=!0,ot.__version=Q.version);let Gt=ot.currentProgram;Rt===!0&&(Gt=Jn(Q,Z,$),I&&Q.isNodeMaterial&&I.onUpdateProgram(Q,Gt,ot));let Yt=!1,Se=!1,oe=!1;const Vt=Gt.getUniforms(),jt=ot.uniforms;if(x.useProgram(Gt.program)&&(Yt=!0,Se=!0,oe=!0),Q.id!==X&&(X=Q.id,Se=!0),ot.needsLights){const le=Ds(C.state.lightProbeGridArray,$);ot.lightProbeGrid!==le&&(ot.lightProbeGrid=le,Se=!0)}if(Yt||ht!==A){x.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Vt.setValue(H,"projectionMatrix",A.projectionMatrix),Vt.setValue(H,"viewMatrix",A.matrixWorldInverse);const ge=Vt.map.cameraPosition;ge!==void 0&&ge.setValue(H,ce.setFromMatrixPosition(A.matrixWorld)),b.logarithmicDepthBuffer&&Vt.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&Vt.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),ht!==A&&(ht=A,Se=!0,oe=!0)}if(ot.needsLights&&(Wt.state.directionalShadowMap.length>0&&Vt.setValue(H,"directionalShadowMap",Wt.state.directionalShadowMap,it),Wt.state.spotShadowMap.length>0&&Vt.setValue(H,"spotShadowMap",Wt.state.spotShadowMap,it),Wt.state.pointShadowMap.length>0&&Vt.setValue(H,"pointShadowMap",Wt.state.pointShadowMap,it)),$.isSkinnedMesh){Vt.setOptional(H,$,"bindMatrix"),Vt.setOptional(H,$,"bindMatrixInverse");const le=$.skeleton;le&&(le.boneTexture===null&&le.computeBoneTexture(),Vt.setValue(H,"boneTexture",le.boneTexture,it))}$.isBatchedMesh&&(Vt.setOptional(H,$,"batchingTexture"),Vt.setValue(H,"batchingTexture",$._matricesTexture,it),Vt.setOptional(H,$,"batchingIdTexture"),Vt.setValue(H,"batchingIdTexture",$._indirectTexture,it),Vt.setOptional(H,$,"batchingColorTexture"),$._colorsTexture!==null&&Vt.setValue(H,"batchingColorTexture",$._colorsTexture,it));const Ve=nt.morphAttributes;if((Ve.position!==void 0||Ve.normal!==void 0||Ve.color!==void 0)&&G.update($,nt,Gt),(Se||ot.receiveShadow!==$.receiveShadow)&&(ot.receiveShadow=$.receiveShadow,Vt.setValue(H,"receiveShadow",$.receiveShadow)),(Q.isMeshStandardMaterial||Q.isMeshLambertMaterial||Q.isMeshPhongMaterial)&&Q.envMap===null&&Z.environment!==null&&(jt.envMapIntensity.value=Z.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=H3()),Se){if(Vt.setValue(H,"toneMappingExposure",D.toneMappingExposure),ot.needsLights&&Ji(jt,oe),Lt&&Q.fog===!0&&gt.refreshFogUniforms(jt,Lt),gt.refreshMaterialUniforms(jt,Q,lt,At,C.state.transmissionRenderTarget[A.id]),ot.needsLights&&ot.lightProbeGrid){const le=ot.lightProbeGrid;jt.probesSH.value=le.texture,jt.probesMin.value.copy(le.boundingBox.min),jt.probesMax.value.copy(le.boundingBox.max),jt.probesResolution.value.copy(le.resolution)}mu.upload(H,bi(ot),jt,it)}if(Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(mu.upload(H,bi(ot),jt,it),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&Vt.setValue(H,"center",$.center),Vt.setValue(H,"modelViewMatrix",$.modelViewMatrix),Vt.setValue(H,"normalMatrix",$.normalMatrix),Vt.setValue(H,"modelMatrix",$.matrixWorld),Q.uniformsGroups!==void 0){const le=Q.uniformsGroups;for(let ge=0,ye=le.length;ge<ye;ge++){const _e=le[ge];vt.update(_e,Gt),vt.bind(_e,Gt)}}return Gt}function Ji(A,Z){A.ambientLightColor.needsUpdate=Z,A.lightProbe.needsUpdate=Z,A.directionalLights.needsUpdate=Z,A.directionalLightShadows.needsUpdate=Z,A.pointLights.needsUpdate=Z,A.pointLightShadows.needsUpdate=Z,A.spotLights.needsUpdate=Z,A.spotLightShadows.needsUpdate=Z,A.rectAreaLights.needsUpdate=Z,A.hemisphereLights.needsUpdate=Z}function Ns(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return O},this.setRenderTargetTextures=function(A,Z,nt){const Q=K.get(A);Q.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,Q.__autoAllocateDepthBuffer===!1&&(Q.__useRenderToTexture=!1),K.get(A.texture).__webglTexture=Z,K.get(A.depthTexture).__webglTexture=Q.__autoAllocateDepthBuffer?void 0:nt,Q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Z){const nt=K.get(A);nt.__webglFramebuffer=Z,nt.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(A,Z=0,nt=0){O=A,B=Z,F=nt;let Q=null,$=!1,Lt=!1;if(A){const R=K.get(A);if(R.__useDefaultFramebuffer!==void 0){x.bindFramebuffer(H.FRAMEBUFFER,R.__webglFramebuffer),bt.copy(A.viewport),Nt.copy(A.scissor),re=A.scissorTest,x.viewport(bt),x.scissor(Nt),x.setScissorTest(re),X=-1;return}else if(R.__webglFramebuffer===void 0)it.setupRenderTarget(A);else if(R.__hasExternalTextures)it.rebindTextures(A,K.get(A.texture).__webglTexture,K.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const q=A.depthTexture;if(R.__boundDepthTexture!==q){if(q!==null&&K.has(q)&&(A.width!==q.image.width||A.height!==q.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");it.setupDepthRenderbuffer(A)}}const N=A.texture;(N.isData3DTexture||N.isDataArrayTexture||N.isCompressedArrayTexture)&&(Lt=!0);const W=K.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(W[Z])?Q=W[Z][nt]:Q=W[Z],$=!0):A.samples>0&&it.useMultisampledRTT(A)===!1?Q=K.get(A).__webglMultisampledFramebuffer:Array.isArray(W)?Q=W[nt]:Q=W,bt.copy(A.viewport),Nt.copy(A.scissor),re=A.scissorTest}else bt.copy(Zt).multiplyScalar(lt).floor(),Nt.copy(Ue).multiplyScalar(lt).floor(),re=ee;if(nt!==0&&(Q=P),x.bindFramebuffer(H.FRAMEBUFFER,Q)&&x.drawBuffers(A,Q),x.viewport(bt),x.scissor(Nt),x.setScissorTest(re),$){const R=K.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+Z,R.__webglTexture,nt)}else if(Lt){const R=Z;for(let N=0;N<A.textures.length;N++){const W=K.get(A.textures[N]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+N,W.__webglTexture,nt,R)}}else if(A!==null&&nt!==0){const R=K.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,R.__webglTexture,nt)}X=-1},this.readRenderTargetPixels=function(A,Z,nt,Q,$,Lt,T,R=0){if(!(A&&A.isWebGLRenderTarget)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let N=K.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&T!==void 0&&(N=N[T]),N){x.bindFramebuffer(H.FRAMEBUFFER,N);try{const W=A.textures[R],q=W.format,tt=W.type;if(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+R),!b.textureFormatReadable(q)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(tt)){Pe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=A.width-Q&&nt>=0&&nt<=A.height-$&&H.readPixels(Z,nt,Q,$,rt.convert(q),rt.convert(tt),Lt)}finally{const W=O!==null?K.get(O).__webglFramebuffer:null;x.bindFramebuffer(H.FRAMEBUFFER,W)}}},this.readRenderTargetPixelsAsync=async function(A,Z,nt,Q,$,Lt,T,R=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let N=K.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&T!==void 0&&(N=N[T]),N)if(Z>=0&&Z<=A.width-Q&&nt>=0&&nt<=A.height-$){x.bindFramebuffer(H.FRAMEBUFFER,N);const W=A.textures[R],q=W.format,tt=W.type;if(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+R),!b.textureFormatReadable(q))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const et=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,et),H.bufferData(H.PIXEL_PACK_BUFFER,Lt.byteLength,H.STREAM_READ),H.readPixels(Z,nt,Q,$,rt.convert(q),rt.convert(tt),0);const ft=O!==null?K.get(O).__webglFramebuffer:null;x.bindFramebuffer(H.FRAMEBUFFER,ft);const pt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await l1(H,pt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,et),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Lt),H.deleteBuffer(et),H.deleteSync(pt),Lt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Z=null,nt=0){const Q=Math.pow(2,-nt),$=Math.floor(A.image.width*Q),Lt=Math.floor(A.image.height*Q),T=Z!==null?Z.x:0,R=Z!==null?Z.y:0;it.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,nt,0,0,T,R,$,Lt),x.unbindTexture()},this.copyTextureToTexture=function(A,Z,nt=null,Q=null,$=0,Lt=0){let T,R,N,W,q,tt,et,ft,pt;const Mt=A.isCompressedTexture?A.mipmaps[Lt]:A.image;if(nt!==null)T=nt.max.x-nt.min.x,R=nt.max.y-nt.min.y,N=nt.isBox3?nt.max.z-nt.min.z:1,W=nt.min.x,q=nt.min.y,tt=nt.isBox3?nt.min.z:0;else{const jt=Math.pow(2,-$);T=Math.floor(Mt.width*jt),R=Math.floor(Mt.height*jt),A.isDataArrayTexture?N=Mt.depth:A.isData3DTexture?N=Math.floor(Mt.depth*jt):N=1,W=0,q=0,tt=0}Q!==null?(et=Q.x,ft=Q.y,pt=Q.z):(et=0,ft=0,pt=0);const Tt=rt.convert(Z.format),xt=rt.convert(Z.type);let ot;Z.isData3DTexture?(it.setTexture3D(Z,0),ot=H.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(it.setTexture2DArray(Z,0),ot=H.TEXTURE_2D_ARRAY):(it.setTexture2D(Z,0),ot=H.TEXTURE_2D),x.activeTexture(H.TEXTURE0),x.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,Z.flipY),x.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),x.pixelStorei(H.UNPACK_ALIGNMENT,Z.unpackAlignment);const Wt=x.getParameter(H.UNPACK_ROW_LENGTH),Rt=x.getParameter(H.UNPACK_IMAGE_HEIGHT),Gt=x.getParameter(H.UNPACK_SKIP_PIXELS),Yt=x.getParameter(H.UNPACK_SKIP_ROWS),Se=x.getParameter(H.UNPACK_SKIP_IMAGES);x.pixelStorei(H.UNPACK_ROW_LENGTH,Mt.width),x.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Mt.height),x.pixelStorei(H.UNPACK_SKIP_PIXELS,W),x.pixelStorei(H.UNPACK_SKIP_ROWS,q),x.pixelStorei(H.UNPACK_SKIP_IMAGES,tt);const oe=A.isDataArrayTexture||A.isData3DTexture,Vt=Z.isDataArrayTexture||Z.isData3DTexture;if(A.isDepthTexture){const jt=K.get(A),Ve=K.get(Z),le=K.get(jt.__renderTarget),ge=K.get(Ve.__renderTarget);x.bindFramebuffer(H.READ_FRAMEBUFFER,le.__webglFramebuffer),x.bindFramebuffer(H.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let ye=0;ye<N;ye++)oe&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,K.get(A).__webglTexture,$,tt+ye),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,K.get(Z).__webglTexture,Lt,pt+ye)),H.blitFramebuffer(W,q,T,R,et,ft,T,R,H.DEPTH_BUFFER_BIT,H.NEAREST);x.bindFramebuffer(H.READ_FRAMEBUFFER,null),x.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if($!==0||A.isRenderTargetTexture||K.has(A)){const jt=K.get(A),Ve=K.get(Z);x.bindFramebuffer(H.READ_FRAMEBUFFER,V),x.bindFramebuffer(H.DRAW_FRAMEBUFFER,k);for(let le=0;le<N;le++)oe?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,jt.__webglTexture,$,tt+le):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,jt.__webglTexture,$),Vt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Ve.__webglTexture,Lt,pt+le):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Ve.__webglTexture,Lt),$!==0?H.blitFramebuffer(W,q,T,R,et,ft,T,R,H.COLOR_BUFFER_BIT,H.NEAREST):Vt?H.copyTexSubImage3D(ot,Lt,et,ft,pt+le,W,q,T,R):H.copyTexSubImage2D(ot,Lt,et,ft,W,q,T,R);x.bindFramebuffer(H.READ_FRAMEBUFFER,null),x.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Vt?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(ot,Lt,et,ft,pt,T,R,N,Tt,xt,Mt.data):Z.isCompressedArrayTexture?H.compressedTexSubImage3D(ot,Lt,et,ft,pt,T,R,N,Tt,Mt.data):H.texSubImage3D(ot,Lt,et,ft,pt,T,R,N,Tt,xt,Mt):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Lt,et,ft,T,R,Tt,xt,Mt.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Lt,et,ft,Mt.width,Mt.height,Tt,Mt.data):H.texSubImage2D(H.TEXTURE_2D,Lt,et,ft,T,R,Tt,xt,Mt);x.pixelStorei(H.UNPACK_ROW_LENGTH,Wt),x.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Rt),x.pixelStorei(H.UNPACK_SKIP_PIXELS,Gt),x.pixelStorei(H.UNPACK_SKIP_ROWS,Yt),x.pixelStorei(H.UNPACK_SKIP_IMAGES,Se),Lt===0&&Z.generateMipmaps&&H.generateMipmap(ot),x.unbindTexture()},this.initRenderTarget=function(A){K.get(A).__webglFramebuffer===void 0&&it.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?it.setTextureCube(A,0):A.isData3DTexture?it.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?it.setTexture2DArray(A,0):it.setTexture2D(A,0),x.unbindTexture()},this.resetState=function(){B=0,F=0,O=null,x.reset(),Ut.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=we._getDrawingBufferColorSpace(t),n.unpackColorSpace=we._getUnpackColorSpace()}}function G3(e,t=300){if(!e||!Array.isArray(e.nodes)||!Array.isArray(e.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=e.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,t),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,d,h;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((d=l.properties)==null?void 0:d.filePath)||l.uri||"",status:((h=l.properties)==null?void 0:h.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:e.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:e.edges.length}}function V3(e){const{CLUSTERS:t,NODES:n,EDGES:i,META:a}=G3(e);let s="dark";for(const D of t)D.color=D[s];const r=Object.fromEntries(t.map(D=>[D.id,D])),o=n.map(([D,L,I,P],V)=>({i:V,id:D,name:a[D].label,cid:L,w:I,desc:P,cluster:r[L],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(D=>[D.id,D]));for(const D of o)D.meta=a[D.id]||{};const c=[];for(const[D,L,I]of i){const P=l[D],V=l[L];if(!P||!V){console.warn("[atlas] Dropped invalid edge:",D,"→",L);continue}c.push({s:P,t:V,kind:I,i:c.length,alpha:1}),I==="pre"?(P.out.push(V),V.in.push(P)):(P.rel.push(V),V.rel.push(P))}const d=D=>D.out.length+D.in.length+D.rel.length,h=o.map(()=>[]);for(const D of c)h[D.s.i].push(D.t.i),h[D.t.i].push(D.s.i);const u=42;for(const D of t){const[L,I,P]=D.anchor,V=Math.hypot(L,I,P)||1;D.dir=[L/V,I/V,P/V]}const p=new Array(o.length).fill(-1);(function(){let L=!0,I=0;for(const P of o)P.in.length||(p[P.i]=0);for(;L&&I++<40;){L=!1;for(const P of o){let V=P.in.length?-1:0;for(const k of P.in)p[k.i]>=0&&(V=Math.max(V,p[k.i]+1));V>=0&&V!==p[P.i]&&(p[P.i]=V,L=!0)}}for(let P=0;P<p.length;P++)p[P]<0&&(p[P]=2)})();const g=Math.max(1,...p),y={atlas:[],shell:[],tier:[]};o.forEach((D,L)=>{const I=D.cluster.dir,P=1-Math.min(d(D),12)/26;y.atlas.push([I[0]*u*P,I[1]*u*P,I[2]*u*P]);const V=t.indexOf(D.cluster),k=o.filter(X=>X.cid===D.cid).indexOf(D),B=o.filter(X=>X.cid===D.cid).length,F=(V/t.length+k/B/t.length)*Math.PI*2,O=(k/B-.5)*1.5;y.shell.push([u*.95*Math.cos(O)*Math.cos(F),u*.95*Math.sin(O),u*.95*Math.cos(O)*Math.sin(F)]),y.tier.push([I[0]*u*.72,(p[L]/g-.5)*u*1.5,I[2]*u*.72])});let m="atlas";o.forEach((D,L)=>{const I=y.atlas[L];D.x=I[0]+(Math.random()-.5)*16,D.y=I[1]+(Math.random()-.5)*16,D.z=I[2]+(Math.random()-.5)*16});let f=1;const v=9,M=.04,S=130,U=.05;function C(){if(f<.004)return;const D=y[m];for(let L=0;L<o.length;L++){const I=o[L];for(let P=L+1;P<o.length;P++){const V=o[P];let k=I.x-V.x,B=I.y-V.y,F=I.z-V.z,O=k*k+B*B+F*F+.6;const X=S/O,ht=Math.sqrt(O);k/=ht,B/=ht,F/=ht,I.vx+=k*X,I.vy+=B*X,I.vz+=F*X,V.vx-=k*X,V.vy-=B*X,V.vz-=F*X}}for(const L of c){const I=L.s,P=L.t;let V=P.x-I.x,k=P.y-I.y,B=P.z-I.z;const F=Math.hypot(V,k,B)||1,O=(F-v)*M;V/=F,k/=F,B/=F,I.vx+=V*O,I.vy+=k*O,I.vz+=B*O,P.vx-=V*O,P.vy-=k*O,P.vz-=B*O}for(let L=0;L<o.length;L++){const I=o[L],P=D[L];I.vx+=(P[0]-I.x)*U,I.vy+=(P[1]-I.y)*U,I.vz+=(P[2]-I.z)*U;const V=.82;I.vx*=V,I.vy*=V,I.vz*=V,I.x+=I.vx*f,I.y+=I.vy*f,I.z+=I.vz*f}f*=.988}for(let D=0;D<220;D++)C();const E=46;function _(){let D=0;for(const L of o)D=Math.max(D,Math.hypot(L.x,L.y,L.z));return Math.max(10,D)/Math.sin(E*Math.PI/360)*.88}function w({els:D,emit:L}){const I=new AbortController,{signal:P}=I,V=(fe,ne,b,x)=>fe.addEventListener(ne,b,{...x,signal:P});let k=0;const{stage:B}=D;let F,O,X,ht,bt,Nt,re=!0;try{F=new Ay({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{re=!1}if(F||(re=!1),!re)return L.gate(!0),{dispose(){}};{let Qi=function(at,Dt){const wt=j.uniforms.uPx.value;for(const Pt of o){Mi.set(Pt.x,Pt.y,Pt.z);const Kt=X.position.distanceTo(Mi);Mi.project(X),Pt.sx=(Mi.x*.5+.5)*at,Pt.sy=(-Mi.y*.5+.5)*Dt,Pt.sz=Mi.z,Pt.sr=Pt.size*Pt.scale*wt/Math.max(Kt,1)*.5}},Ds=function(){Vi.fill(1),Jn.fill(1),bi.fill(1);const at=qa,Dt=wt=>!at||wt.name.toLowerCase().includes(at)||wt.desc.toLowerCase().includes(at)||(wt.meta.path||"").toLowerCase().includes(at)||(wt.meta.kind||"").toLowerCase().includes(at);for(const wt of o)wt.vis=!Gi.has(wt.cid)&&Dt(wt),wt.vis||(Vi[wt.i]=0,Jn[wt.i]=.6);for(const wt of c)(!wt.s.vis||!wt.t.vis)&&(bi[wt.i]=0);if(Un){for(const wt of o)wt.vis&&(Vi[wt.i]=Un.has(wt.i)?1:ha,Jn[wt.i]=Un.has(wt.i)?1.25:.8);for(const wt of c)bi[wt.i]&&(bi[wt.i]=Un.has(wt.s.i)&&Un.has(wt.t.i)?1.35:ha*.5)}else if(be){const wt=new Set([be.i,...h[be.i]]);for(const Pt of o)Pt.vis&&(Vi[Pt.i]=wt.has(Pt.i)?1:ha,Jn[Pt.i]=Pt===be?1.75:wt.has(Pt.i)?1.15:.75);for(const Pt of c)bi[Pt.i]&&(bi[Pt.i]=Pt.s===be||Pt.t===be?1.4:ha*.45)}return $e&&$e.vis&&(Vi[$e.i]=1,Jn[$e.i]=Math.max(Jn[$e.i],1.6)),{nT:Vi,sT:Jn,eT:bi}},pa=function(at){be=at,Un=null,D.pathbar.classList.remove("on"),rt.tx=at.x,rt.ty=at.y,rt.tz=at.z,rt.tDist=Math.min(rt.tDist,ct*.72),ye(at),jt(),oe()},Ji=function(){be=null,Un=null,rt.tx=rt.ty=rt.tz=0,D.pathbar.classList.remove("on"),ye(null),jt(),oe()},Ns=function(at,Dt){const wt=new Array(o.length).fill(-1),Pt=new Set([at.i]),Kt=[at.i];for(;Kt.length;){const En=Kt.shift();if(En===Dt.i)break;for(const Ze of h[En])!Pt.has(Ze)&&o[Ze].vis&&(Pt.add(Ze),wt[Ze]=En,Kt.push(Ze))}if(!Pt.has(Dt.i)){D.chain.textContent="Keine Kausalkette zwischen diesen Objekten",D.pathbar.classList.add("on");return}const Oe=[];let te=Dt.i;for(;te!==-1&&(Oe.unshift(te),te!==at.i);)te=wt[te];Un=new Set(Oe),D.chain.textContent=Oe.map(En=>o[En].name).join(" → "),D.pathbar.classList.add("on"),oe()},A=function(){Un=null,D.pathbar.classList.remove("on"),oe()},Lt=function(at,Dt){let wt=0;const Pt=new Set;Hn&&$.forEach(te=>Pt.add(te)),be&&(Pt.add(be.i),h[be.i].forEach(te=>Pt.add(te))),Un&&Un.forEach(te=>Pt.add(te)),$e&&Pt.add($e.i);const Kt=[...Pt].map(te=>o[te]).filter(te=>te.vis&&te.sz<1&&te.sx>-60&&te.sx<at+60&&te.sy>-20&&te.sy<Dt+20).sort((te,En)=>te.sz-En.sz),Oe=[];for(const te of Kt){if(wt>=Q.length)break;const En=te.name.length*11.5+8,Ze=[te.sx-En/2,te.sy-18,En,16];if(Oe.some(Be=>Ze[0]<Be[0]+Be[2]&&Ze[0]+Ze[2]>Be[0]&&Ze[1]<Be[1]+Be[3]&&Ze[1]+Ze[3]>Be[1]))continue;Oe.push(Ze);const Jt=Q[wt++];Jt.textContent=te.name,Jt.className="lab"+(te===$e||te===be?"":" sm"),Jt.style.transform=`translate(-50%,-50%) translate(${te.sx.toFixed(1)}px,${(te.sy-17).toFixed(1)}px)`,Jt.style.opacity=Math.min(1,te.alpha*1.3),Jt.style.color=te===$e||te===be?te.cluster.color:""}for(;wt<Q.length;wt++)Q[wt].style.opacity=0},pt=function(at){k=requestAnimationFrame(pt);const Dt=Math.min(.05,(at-T)/1e3);T=at;const wt=B.clientWidth,Pt=B.clientHeight;if(!wt||!Pt)return;F.domElement.width!==Math.round(wt*F.getPixelRatio())&&(F.setSize(wt,Pt,!1),X.aspect=wt/Pt,X.updateProjectionMatrix(),st.uniforms.uPx.value=j.uniforms.uPx.value=Pt/(2*Math.tan(X.fov*Math.PI/360))),C(),li&&(rt.tTheta+=Dt*.09);const Kt=1-Math.pow(.0016,Dt);if(rt.theta+=(rt.tTheta-rt.theta)*Kt,rt.phi+=(rt.tPhi-rt.phi)*Kt,rt.dist+=(rt.tDist-rt.dist)*Kt,rt.cx+=(rt.tx-rt.cx)*Kt,rt.cy+=(rt.ty-rt.cy)*Kt,rt.cz+=(rt.tz-rt.cz)*Kt,X.position.set(rt.cx+rt.dist*Math.sin(rt.phi)*Math.cos(rt.theta),rt.cy+rt.dist*Math.cos(rt.phi),rt.cz+rt.dist*Math.sin(rt.phi)*Math.sin(rt.theta)),X.lookAt(rt.cx,rt.cy,rt.cz),Qi(wt,Pt),yi.live&&!Ut){let Jt=null;for(const Be of o){if(!Be.vis||Be.sz>1)continue;const mr=Be.sx-yi.x,Jl=Be.sy-yi.y,$l=Be.sr+7;mr*mr+Jl*Jl>$l*$l||(!Jt||Be.sz<Jt.sz)&&(Jt=Be)}Jt!==$e&&($e=Jt,Me.style.cursor=Jt?"pointer":"grab",oe())}const{nT:Oe,sT:te,eT:En}=Ds(),Ze=1-Math.pow(.002,Dt);for(const Jt of o)Jt.alpha+=(Oe[Jt.i]-Jt.alpha)*Ze,Jt.scale+=(te[Jt.i]-Jt.scale)*Ze,W.array[Jt.i*3]=Jt.x,W.array[Jt.i*3+1]=Jt.y,W.array[Jt.i*3+2]=Jt.z,q.array[Jt.i]=Jt.alpha,tt.array[Jt.i]=Jt.scale;W.needsUpdate=q.needsUpdate=tt.needsUpdate=!0;for(const Jt of c){Jt.alpha+=(En[Jt.i]-Jt.alpha)*Ze;const Be=Jt.i*6;et.array[Be]=Jt.s.x,et.array[Be+1]=Jt.s.y,et.array[Be+2]=Jt.s.z,et.array[Be+3]=Jt.t.x,et.array[Be+4]=Jt.t.y,et.array[Be+5]=Jt.t.z,ft.array[Jt.i*2]=ft.array[Jt.i*2+1]=Jt.alpha}et.needsUpdate=ft.needsUpdate=!0,Et.uniforms.uTime.value=at/1e3,Et.uniforms.uFlow.value+=((Qn?1:0)-Et.uniforms.uFlow.value)*Ze,Lt(wt,Pt),F.render(O,X),R+=1/Math.max(Dt,1e-4),N++,N>=30&&(D.sFps.textContent=Math.round(R/N),R=N=0)},Mt=function(at=.55){f=Math.max(f,at)},Tt=function(at){m=at,D.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[m],Mt(1)},Rt=function(){rt.tTheta=.7,rt.tPhi=1.15,rt.tDist=_(),Ji(),Mt(.8),Dn()},Gt=function(){L.tools({flow:Qn,label:Hn,spin:li})},Yt=function(at){s=at,document.documentElement.dataset.theme=at,L.theme(at);const Dt=at==="light";for(const Kt of t)Kt.color=Kt[at];o.forEach((Kt,Oe)=>{const te=fe(Kt.cluster.color);x[Oe*3]=te[0],x[Oe*3+1]=te[1],x[Oe*3+2]=te[2]}),St.getAttribute("aColor").needsUpdate=!0,c.forEach((Kt,Oe)=>{_t.set(fe(Kt.s.cluster.color),Oe*6),_t.set(fe(Kt.t.cluster.color),Oe*6+3)}),G.getAttribute("aColor").needsUpdate=!0;const wt=Dt?Qs:Zr;for(const Kt of[st,j,Et])Kt.uniforms.uLight.value=Dt?1:0,Kt.blending=wt,Kt.needsUpdate=!0;const Pt=Dt?16053489:328967;F.setClearColor(Pt,1),O.fog.color.setHex(Pt),O.fog.density=Dt?.0042:.0068,jt(),be&&ye(be)},oe=function(){D.hudSel.textContent=Un?`Kausalkette · ${Un.size} Stationen`:be?be.name:$e?$e.name:"Nichts ausgewählt"},Vt=function(at){Gi.has(at)?Gi.delete(at):Gi.add(at),jt(),Mt(.4)},jt=function(){const at=D.q.value.trim().toLowerCase(),Dt=o.filter(Pt=>!Gi.has(Pt.cid)&&(!at||Pt.name.toLowerCase().includes(at)||Pt.desc.toLowerCase().includes(at))).sort((Pt,Kt)=>d(Kt)-d(Pt));L.list({q:at,rows:Dt.map(Pt=>({i:Pt.i,name:Pt.name,color:Pt.cluster.color,deg:d(Pt),on:Pt===be}))}),D.sNode.textContent=Dt.length;const wt=c.filter(Pt=>Dt.includes(Pt.s)&&Dt.includes(Pt.t)).length;D.sEdge.textContent=wt,D.sDeg.textContent=Dt.length?(wt*2/Dt.length).toFixed(1):"0"},ge=function(at){qa=at.trim().toLowerCase(),jt(),Mt(.25)},ye=function(at){L.drawer(at&&{i:at.i,name:at.name,desc:at.desc,cname:at.cluster.name,color:at.cluster.color,deg:d(at),depth:p[at.i],kind:at.meta.kind||"",path:at.meta.path||"",status:at.meta.status||"",prov:at.meta.prov||"",groups:[["Ursache · eingehend",at.in,"IN"],["Wirkung · ausgehend",at.out,"OUT"],["Assoziiert · Backlinks",at.rel,"REL"]].filter(([,Dt])=>Dt.length).map(([Dt,wt,Pt])=>({title:Dt,tag:Pt,items:wt.map(Kt=>({i:Kt.i,name:Kt.name,color:Kt.cluster.color}))}))})},_e=function(at){const Dt=o[at],wt=y[m],Pt=wt[Dt.i].slice();for(let Kt=0;Kt<wt.length;Kt++)wt[Kt][0]-=Pt[0],wt[Kt][1]-=Pt[1],wt[Kt][2]-=Pt[2];rt.tx=rt.ty=rt.tz=0,Mt(1)},ke=function(at){const Dt=o[at];D.chain.textContent="Start bei "+Dt.name+" — Shift+Klick auf das Zielobjekt",D.pathbar.classList.add("on")};var Qt=Qi,ae=Ds,dt=pa,At=Ji,lt=Ns,Bt=A,qt=Lt,Zt=pt,Ue=Mt,ee=Tt,Le=Rt,xe=Gt,me=Yt,ze=oe,ce=Vt,Je=jt,nn=ge,ue=ye,Ot=_e,H=ke;F.setPixelRatio(Math.min(devicePixelRatio,2)),B.appendChild(F.domElement),O=new oy,O.fog=new qm(328967,.0068),X=new Di(E,1,1,1400);const fe=at=>{const Dt=new Ae(at);return[Dt.r,Dt.g,Dt.b]},ne=o.length,b=new Float32Array(ne*3),x=new Float32Array(ne*3),Y=new Float32Array(ne),K=new Float32Array(ne),it=new Float32Array(ne);o.forEach((at,Dt)=>{const wt=fe(at.cluster.color);x[Dt*3]=wt[0],x[Dt*3+1]=wt[1],x[Dt*3+2]=wt[2],Y[Dt]=at.size=.95+at.w*.4,K[Dt]=1,it[Dt]=1});const St=new Xn;St.setAttribute("position",new Xe(b,3)),St.setAttribute("aColor",new Xe(x,3)),St.setAttribute("aSize",new Xe(Y,1)),St.setAttribute("aAlpha",new Xe(K,1)),St.setAttribute("aScale",new Xe(it,1));const Ct=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,st=new Bn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:Ct,fragmentShader:`
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
      }`,transparent:!0,blending:Zr,depthWrite:!1}),j=new Bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:Ct,fragmentShader:`
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
      }`,transparent:!0,blending:Zr,depthWrite:!1});ht=new wp(St,st),bt=new wp(St,j),ht.frustumCulled=!1,bt.frustumCulled=!1,O.add(ht,bt);const ut=c.length,gt=new Float32Array(ut*6),_t=new Float32Array(ut*6),yt=new Float32Array(ut*2),Ft=new Float32Array(ut*2),kt=new Float32Array(ut*2),$t=new Float32Array(ut*2);c.forEach((at,Dt)=>{const wt=fe(at.s.cluster.color),Pt=fe(at.t.cluster.color);_t.set(wt,Dt*6),_t.set(Pt,Dt*6+3),yt[Dt*2]=0,yt[Dt*2+1]=1;const Kt=Dt*.6180339887%1;Ft[Dt*2]=Kt,Ft[Dt*2+1]=Kt,kt[Dt*2]=kt[Dt*2+1]=1,$t[Dt*2]=$t[Dt*2+1]=at.kind==="pre"?1:0});const G=new Xn;G.setAttribute("position",new Xe(gt,3)),G.setAttribute("aColor",new Xe(_t,3)),G.setAttribute("aT",new Xe(yt,1)),G.setAttribute("aSeed",new Xe(Ft,1)),G.setAttribute("aAlpha",new Xe(kt,1)),G.setAttribute("aDir",new Xe($t,1));const Et=new Bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:Zr,depthWrite:!1});Nt=new pu(G,Et),Nt.frustumCulled=!1,O.add(Nt);const ct=_(),rt={theta:.7,phi:1.15,dist:ct,tTheta:.7,tPhi:1.15,tDist:ct,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let Ut=!1,vt=0,Xt=0,Ht=0;const Me=F.domElement;V(Me,"pointerdown",at=>{Ut=!0,Ht=0,vt=at.clientX,Xt=at.clientY,Me.setPointerCapture(at.pointerId)}),V(Me,"pointerup",at=>{Ut=!1,Me.releasePointerCapture(at.pointerId)}),V(Me,"pointermove",at=>{const Dt=Me.getBoundingClientRect();if(yi.x=at.clientX-Dt.left,yi.y=at.clientY-Dt.top,yi.live=!0,!Ut)return;const wt=at.clientX-vt,Pt=at.clientY-Xt;Ht+=Math.abs(wt)+Math.abs(Pt),vt=at.clientX,Xt=at.clientY,rt.tTheta-=wt*.0052,rt.tPhi=Math.max(.12,Math.min(Math.PI-.12,rt.tPhi-Pt*.0052)),li=!1,Gt()}),V(Me,"pointerleave",()=>{yi.live=!1});const Ie=D.zlvl,Dn=()=>{Ie.textContent=Math.round(ct/rt.tDist*100)+"%"},Nn=at=>{rt.tDist=Math.max(ct*.22,Math.min(ct*2.6,rt.tDist*at)),Dn()};V(Me,"wheel",at=>{at.preventDefault(),Nn(1+Math.sign(at.deltaY)*.11)},{passive:!1});const Ce=()=>{rt.tDist=ct,Dn()};Dn();const yi={x:-1,y:-1,live:!1};let $e=null,be=null,Un=null,li=!0,Hn=!0,Qn=!0;const Gi=new Set,ha=.12,Mi=new J;V(Me,"click",at=>{if(!(Ht>5)){if(!$e){at.shiftKey||Ji();return}if(at.shiftKey&&be&&$e!==be){Ns(be,$e);return}pa($e)}});const Vi=new Float32Array(o.length),Jn=new Float32Array(o.length),bi=new Float32Array(c.length);let qa="";const Z=D.labels,nt=14,Q=Array.from({length:44},()=>{const at=document.createElement("div");return at.className="lab",at.style.opacity=0,Z.appendChild(at),at}),$=[...o].sort((at,Dt)=>d(Dt)-d(at)).slice(0,nt).map(at=>at.i);let T=performance.now(),R=0,N=0;const W=St.getAttribute("position"),q=St.getAttribute("aAlpha"),tt=St.getAttribute("aScale"),et=G.getAttribute("position"),ft=G.getAttribute("aAlpha");k=requestAnimationFrame(pt);const xt=()=>{Qn=!Qn,Gt()},ot=()=>{Hn=!Hn,Gt()},Wt=()=>{li=!li,Gt()},Se=()=>Yt(s==="light"?"dark":"light");V(window,"keydown",at=>{if(/^(INPUT|TEXTAREA)$/.test(at.target.tagName)){at.key==="Escape"&&at.target.blur();return}at.key==="Escape"?Ji():at.key==="l"||at.key==="L"?(Hn=!Hn,Gt()):at.key==="r"||at.key==="R"?Rt():at.key===" "?(at.preventDefault(),li=!li,Gt()):at.key==="/"?(at.preventDefault(),D.q.focus()):at.key==="="||at.key==="+"?Nn(1/1.18):(at.key==="-"||at.key==="_")&&Nn(1.18)});const Ve=at=>pa(o[at]),le=at=>{$e=at===null?null:o[at]};return Yt(s),jt(),ye(null),Gt(),oe(),{setView:Tt,toggleFlow:xt,toggleLabel:ot,toggleSpin:Wt,reset:Rt,toggleTheme:Se,dolly:Nn,zoomReset:Ce,toggleCluster:Vt,selectAt:Ve,hoverAt:le,setQuery:ge,clearPath:A,centerOn:_e,startPath:ke,dispose(){I.abort(),cancelAnimationFrame(k),St.dispose(),G.dispose(),st.dispose(),j.dispose(),Et.dispose(),F.dispose(),Me.remove(),D.labels.replaceChildren()}}}}return{CLUSTERS:t,nodes:o,edges:c,deg:d,createAtlas:w}}function Ry(e){if(typeof e!="string"||e==="")return e;const t=e.split(/[\\/]/).filter(Boolean);return t.length>0?t[t.length-1]:e}const hn=[],hs=[],Ta=[],Il=[],Sl={},Cn=[],gu=[],na=7.2,Kr=6,Bl=["--k1","--k2","--k3","--k4","--k5","--k6"],jm=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),k3=e=>e.agentColor||jm(Bl[(e.ki??0)%Bl.length]),zv=e=>jm(Bl[e.ki%Bl.length]),Cy=new Map;let wy="loc";function X3(e){wy=e}const W3=e=>{const t=Math.max(1,...hn.map(i=>i.loc)),n=Math.max(1,...hn.map(i=>i.usedBy.length));return e.dying?0:wy==="loc"?1.5+e.loc/t*26:1.5+e.usedBy.length/n*26},Up=new Set,q3=e=>(Up.add(e),()=>Up.delete(e)),Mo=()=>Up.forEach(e=>e());function Lp(e,t,n="ok"){gu.unshift({t:new Date,ws:e,msg:t,kind:n,id:Math.random().toString(36).slice(2)}),gu.length>60&&gu.pop()}function Tf(){var o;let t=0,n=0,i=0;const a=Il.filter(l=>Cn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=hn.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=Cn.find(g=>g.id===l))!=null&&o.dying))continue;const d=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),h=d*na+Kr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/d))*na+Kr;n+h>74&&n>0&&(t+=i,n=0,i=0);let p=Ta.find(g=>g.dir===l);p||(p={dir:l,x:n+h/2,z:t+u/2,w:.01,h:.01},Ta.push(p)),Object.assign(p,{tx:n,tz:t,tw:h,th:u,cols:d}),s.add(l),n+=h,i=Math.max(i,u)}const r=Ta.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(d=>d.tx+d.tw))/2,c=Math.max(...r.map(d=>d.tz+d.th))/2;for(const d of r)d.tx-=l,d.tz-=c;for(const d of r)hn.filter(u=>u.dir===d.dir).forEach((u,p)=>{u.tx=d.tx+Kr/2+p%d.cols*na+na/2,u.tz=d.tz+Kr/2+Math.floor(p/d.cols)*na+na/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=Ta.length-1;l>=0;l--)!s.has(Ta[l].dir)&&!hn.some(c=>c.dir===Ta[l].dir)&&Ta.splice(l,1);for(const l of a)Cy.set(l,.5)}function Y3(e,t,n=!1){let i=Cn.find(a=>a.id===e);return i||(i={id:e,name:t||e,ki:Cn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},Cn.push(i),Il.includes(e)||Il.push(e),Lp(t||e,"workspace registered","reg"),Tf(),Mo(),i)}function Z3(e,{path:t,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=t.split("/").pop(),c=t.includes("/")&&t.startsWith(e.id+"/")?t:`${e.id}/${t}`;let d=Sl[c];if(d)return d.loc+=Math.max(2,Math.round(n*.25)),d.pulse=1,s&&(d.agentColor=s,d.agentName=r,d.access=o),d;d={path:c,name:l,dir:e.id,top:e.id,ki:e.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let h of i){h.includes("/")||(h=`${e.id}/${h}`);const u=Sl[h];u&&(d.deps.push(h),hs.push({from:d,to:u}),u.usedBy.push(c))}return hn.push(d),Sl[c]=d,Tf(),Mo(),d}function j3(){let e=!1;for(let t=hn.length-1;t>=0;t--){const n=hn[t];if(n.dying&&n.h<.25){hn.splice(t,1),delete Sl[n.path],e=!0;for(let i=hs.length-1;i>=0;i--)(hs[i].from===n||hs[i].to===n)&&hs.splice(i,1);for(const i of hn){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let t=Cn.length-1;t>=0;t--){const n=Cn[t];if(n.dying&&!hn.some(i=>i.dir===n.id)){Cn.splice(t,1);const i=Il.indexOf(n.id);i>=0&&Il.splice(i,1),e=!0}}e&&(Tf(),Mo())}setInterval(()=>{let e=!1;for(const t of Cn)t.load>.01&&(t.load*=.82,e=!0);e&&Mo()},600);const sl={register({id:e,name:t}={}){return e?Y3(String(e),t&&String(t),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(e,{path:t,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=Cn.find(c=>c.id===e);return!l||!t?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,Z3(l,{path:t,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(e,t){const n=Cn.find(a=>a.id===e);if(!n)return;const i=hn.filter(a=>a.dir===e&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Lp(n.name,String(t||"event")),Mo()},unregister(e){const t=Cn.find(n=>n.id===e);t&&(t.dying=!0,hn.filter(n=>n.dir===e).forEach(n=>{n.dying=!0}),Lp(t.name,"workspace unregistered","sys"),Tf(),Mo())},list:()=>Cn.map(e=>({id:e.id,name:e.name,buildings:hn.filter(t=>t.dir===e.id).length})),simulated:()=>!1};window.PlugBrainCity=sl;const K3=1024,Q3=2048,Iv=96,Bv=new Map;function J3(e){if(!e.agentColor)return null;const t=e.agentColor+(e.access||"");let n=Bv.get(t);if(!n){n=new Ae;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(e.agentColor);if(i){const a=e.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(e.agentColor)}catch{n.setHSL(0,0,.5)}Bv.set(t,n)}return n}function $3(e,t,n,{onSelect:i,onZoom:a}){let s;try{s=new Ay({antialias:!0,alpha:!0,canvas:e})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new oy,o=new Zm(-1,1,1,-1,-400,600),l=`
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
  }`,c=`
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
  }`,d=new rr(1,1,1),h=new Bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=K3,p=new ev(d,h,u);p.frustumCulled=!1;let g=new jr(new Float32Array(u*3),3),y=new jr(new Float32Array(u*2),2);d.setAttribute("aColor",g),d.setAttribute("aHi",y),r.add(p);const m=new z1(d),f=new hy({color:3814695,transparent:!0,opacity:.3});let v=[];for(let Ot=0;Ot<u;Ot++){const H=new pu(m,f);H.visible=!1,v.push(H),r.add(H)}const M=(Ot,H)=>{let fe=Math.max(1,Ot);for(;fe<H;)fe*=2;return fe};function S(Ot){if(Ot<=u)return;const H=M(u,Ot),fe=p,ne=v,b=new ev(d,h,H);b.frustumCulled=!1,b.count=0;const x=new jr(new Float32Array(H*3),3),Y=new jr(new Float32Array(H*2),2);d.setAttribute("aColor",x),d.setAttribute("aHi",Y);const K=[];for(let it=0;it<H;it++){const St=new pu(m,f);St.visible=!1,K.push(St),r.add(St)}r.remove(fe);for(const it of ne)r.remove(it);p=b,g=x,y=Y,v=K,u=H}const U=()=>new Bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),C=[],E=new rr(1,1,1);for(let Ot=0;Ot<Iv;Ot++){const H=new Hi(E,U());H.visible=!1,C.push(H),r.add(H)}const _=3;let w=Q3,D=new Float32Array(w*_*3),L=new Float32Array(w*_);const I=new Xn;I.setAttribute("position",new Xe(D,3)),I.setAttribute("aA",new Xe(L,1));const P=new wp(I,new Bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));P.frustumCulled=!1,r.add(P);let V=new Float32Array(w*6),k=new Float32Array(w*2);const B=new Xn;B.setAttribute("position",new Xe(V,3)),B.setAttribute("aA",new Xe(k,1));const F=new pu(B,new Bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));F.frustumCulled=!1,r.add(F);function O(Ot){Ot<=w||(w=M(w,Ot),D=new Float32Array(w*_*3),L=new Float32Array(w*_),V=new Float32Array(w*6),k=new Float32Array(w*2),I.setAttribute("position",new Xe(D,3)),I.setAttribute("aA",new Xe(L,1)),B.setAttribute("position",new Xe(V,3)),B.setAttribute("aA",new Xe(k,1)))}const X={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},ht=Math.atan(1/Math.SQRT2);let bt=!1,Nt=0,re=0,Qt=!0;const ae={x:-1,y:-1,live:!1};e.addEventListener("pointerdown",Ot=>{bt=!0,re=0,Nt=Ot.clientX,e.setPointerCapture(Ot.pointerId),e.classList.add("drag")}),e.addEventListener("pointerup",Ot=>{bt=!1,e.classList.remove("drag"),e.releasePointerCapture(Ot.pointerId)}),e.addEventListener("pointermove",Ot=>{const H=e.getBoundingClientRect();ae.x=Ot.clientX-H.left,ae.y=Ot.clientY-H.top,ae.live=!0,bt&&(re+=Math.abs(Ot.clientX-Nt),X.tYaw-=(Ot.clientX-Nt)*.006,Nt=Ot.clientX,Qt=!1,Le(!1))}),e.addEventListener("pointerleave",()=>{ae.live=!1});const dt=X.tZoom,At=()=>a(Math.round(dt/X.tZoom*100)),lt=Ot=>{X.tZoom=Math.max(4,Math.min(60,X.tZoom*Ot)),At()};e.addEventListener("wheel",Ot=>{Ot.preventDefault(),lt(1+Math.sign(Ot.deltaY)*.11)},{passive:!1}),At();let Bt=null,qt=null,Zt=null,Ue="",ee=null,Le=()=>{};e.addEventListener("click",()=>{re>5||i(Bt&&qt!==Bt?Bt:null)});const xe=Bl.map(Ot=>new Ae(jm(Ot)||"#8a4b2a")),me=new J,ze=new en,ce=new Ae;let Je=!0,nn=performance.now();function ue(Ot){requestAnimationFrame(ue);const H=Math.min(.05,(Ot-nn)/1e3);nn=Ot;const fe=t.clientWidth,ne=t.clientHeight;if(!fe||!ne)return;e.width!==Math.round(fe*s.getPixelRatio())&&s.setSize(fe,ne,!1);const b=1-Math.pow(.002,H);j3(),S(hn.length),O(hs.length),Qt&&(X.tYaw+=H*.12),X.yaw+=(X.tYaw-X.yaw)*b,X.zoom+=(X.tZoom-X.zoom)*b;const x=X.zoom*4,Y=x*(fe/ne);o.left=-Y,o.right=Y,o.top=x,o.bottom=-x,o.updateProjectionMatrix();const K=180;o.position.set(Math.cos(X.yaw)*Math.cos(ht)*K,Math.sin(ht)*K,Math.sin(X.yaw)*Math.cos(ht)*K),o.lookAt(0,6,0);for(let j=0;j<Iv;j++){const ut=C[j],gt=Ta[j];if(!gt||j>=Ta.length){ut.visible=!1;continue}gt.x=gt.x===void 0?gt.tx+gt.tw/2:gt.x,gt.z=gt.z===void 0?gt.tz+gt.th/2:gt.z;const _t=gt.tx+gt.tw/2,yt=gt.tz+gt.th/2;gt.x+=(_t-gt.x)*b,gt.z+=(yt-gt.z)*b,gt.w+=(gt.tw-gt.w)*b,gt.h+=(gt.th-gt.h)*b,ut.visible=!0,ut.position.set(gt.x,-.25,gt.z),ut.scale.set(Math.max(.01,gt.w-Kr*.45),.5,Math.max(.01,gt.h-Kr*.45))}const it=qt?new Set([qt.path,...qt.deps,...qt.usedBy]):null,St=qt||Bt||Zt,Ct=hn.length;p.count=Ct;for(let j=0;j<Ct;j++){const ut=hn[j];ut.x!==ut.tx&&(ut.x+=(ut.tx-ut.x)*b*.7),ut.z!==ut.tz&&(ut.z+=(ut.tz-ut.z)*b*.7);const gt=W3(ut);ut.h=ut.h===void 0?gt:ut.h+(gt-ut.h)*(ut.dying?b*1.4:b*.6),ut.pulse=Math.max(0,(ut.pulse||0)-H*1.6),ze.makeScale(na*.68,Math.max(.01,ut.h),na*.68),ze.setPosition(ut.x,ut.h/2,ut.z),p.setMatrixAt(j,ze);const _t=v[j];_t.visible=!0,_t.scale.set(na*.68,Math.max(.01,ut.h),na*.68),_t.position.set(ut.x,ut.h/2,ut.z);const yt=J3(ut);yt?ce.copy(yt):ce.copy(xe[(ut.ki??0)%xe.length]).offsetHSL(0,0,(Cy.get(ut.dir)-.5)*.17),g.array[j*3]=ce.r,g.array[j*3+1]=ce.g,g.array[j*3+2]=ce.b;const Ft=ut===St?1:Math.min(.85,ut.pulse||0);let kt=it?it.has(ut.path)?0:1:Ue&&!ut.path.toLowerCase().includes(Ue)?1:0;!it&&!Ue&&ee&&(kt=ut.top===ee?0:1),y.array[j*2]+=(Ft-y.array[j*2])*b,y.array[j*2+1]+=(kt-y.array[j*2+1])*b}for(let j=Ct;j<u;j++)v[j].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=y.needsUpdate=!0;const st=hs.length;B.setDrawRange(0,st*2),I.setDrawRange(0,st*_);for(let j=0;j<st;j++){const ut=hs[j],gt=ut.from,_t=ut.to,yt=j*6;V[yt]=gt.x,V[yt+1]=gt.h,V[yt+2]=gt.z,V[yt+3]=_t.x,V[yt+4]=_t.h,V[yt+5]=_t.z;const Ft=!it||it.has(gt.path)&&it.has(_t.path),kt=qt&&(gt===qt||_t===qt),$t=kt?.55:Ft?.1:.02;k[j*2]+=($t-k[j*2])*b,k[j*2+1]=k[j*2];for(let G=0;G<_;G++){const Et=j*_+G,ct=(Ot/2600+(j*.37+G/_))%1,rt=Math.sin(ct*Math.PI)*Math.hypot(_t.x-gt.x,_t.z-gt.z)*.22;D[Et*3]=gt.x+(_t.x-gt.x)*ct,D[Et*3+1]=gt.h+(_t.h-gt.h)*ct+rt+1.2,D[Et*3+2]=gt.z+(_t.z-gt.z)*ct,L[Et]=(Je?1:0)*(kt?1:Ft?.45:.06)*Math.sin(ct*Math.PI)}}if(B.getAttribute("position").needsUpdate=!0,B.getAttribute("aA").needsUpdate=!0,I.getAttribute("position").needsUpdate=!0,I.getAttribute("aA").needsUpdate=!0,P.material.uniforms.uPx.value=3.4*s.getPixelRatio(),ae.live&&!bt){let j=null,ut=26*26;for(let gt=0;gt<Ct;gt++){const _t=hn[gt];if(_t.dying||_t.h<1)continue;me.set(_t.x,_t.h*.6,_t.z).project(o);const yt=(me.x*.5+.5)*fe,Ft=(-me.y*.5+.5)*ne,kt=(yt-ae.x)**2+(Ft-ae.y)**2;kt<ut&&(ut=kt,j=_t,_t.sx=yt,_t.sy=Ft)}Bt=j,e.style.cursor=bt?"grabbing":j?"pointer":"grab"}else ae.live||(Bt=null);Bt?(n.style.display="block",n.style.left=Bt.sx+"px",n.style.top=Bt.sy+"px",n.innerHTML=`<b>${Bt.name}</b> · ${Bt.loc} lines<br>${Bt.dir} · referenced by ${Bt.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(ue),{setFlow:Ot=>{Je=Ot},setHatch:Ot=>{h.uniforms.uHatch.value=Ot?1:0},setSpin:Ot=>{Qt=Ot},spinning:()=>Qt,onSpinChange:Ot=>{Le=Ot},dolly:lt,reset:()=>{X.tYaw=Math.PI*.25,X.tZoom=dt,At()},setSel:Ot=>{qt=Ot},setRailHover:Ot=>{Zt=Ot},setQuery:Ot=>{Ue=Ot},setFocusTop:Ot=>{ee=Ot}}}const Qo=new Map;function Fv(e){var n,i;const t=((n=e==null?void 0:e.properties)==null?void 0:n.path)||((i=e==null?void 0:e.properties)==null?void 0:i.filePath)||(e==null?void 0:e.uri);return typeof t=="string"&&t.length>0?t:null}function tC(e){var i,a,s;const t=((i=e==null?void 0:e.properties)==null?void 0:i.loc)??((a=e==null?void 0:e.properties)==null?void 0:a.lines)??((s=e==null?void 0:e.properties)==null?void 0:s.size),n=Number(t);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function eC(e){var d;const t=e==null?void 0:e.workspace,n=(d=e==null?void 0:e.graph)==null?void 0:d.nodes;if(!(t!=null&&t.id)||!Array.isArray(n))return{workspaces:Qo.size,buildings:0,added:0};const i=String(t.id);if(!Qo.has(i)){sl.register({id:i,name:Ry(t.name||i)}),Qo.set(i,new Set);for(const h of Cn.slice())h.sim&&h.id!==i&&sl.unregister(h.id)}const a=Qo.get(i),s=Array.isArray(e.graph.edges)?e.graph.edges:[],r=new Map(n.filter(h=>h&&typeof h.id=="string").map(h=>[h.id,h])),o=new Map;for(const h of s){const u=r.get(h==null?void 0:h.sourceId),p=r.get(h==null?void 0:h.targetId);if(!u||!p)continue;const g=Fv(p);g&&(o.has(u.id)||o.set(u.id,[]),o.get(u.id).push(g))}const l=[];for(const h of n){const u=Fv(h);u&&l.push({node:h,path:u})}l.sort((h,u)=>h.path.localeCompare(u.path));let c=0;for(const{node:h,path:u}of l){if(a.has(u))continue;a.add(u);const p=h.properties||{};sl.grow(i,{path:u,loc:tC(h),deps:o.get(h.id)||[],note:h.type||"",agentColor:p.agentColor||p.readerColor||null,agentName:p.agentName||p.readerName||null,access:p.agentColor?"write":p.readerColor?"read":null}),c+=1}return c>0&&sl.event(i,`${c} indexed object${c===1?"":"s"} added`),{workspaces:Qo.size,buildings:a.size,added:c,total:l.length,truncated:!1}}function nC({snapshot:e}){It.useEffect(()=>{e&&eC(e)},[e]);const[t,n]=It.useState(!0),[i,a]=It.useState("loc"),[s,r]=It.useState(!0),[o,l]=It.useState(!0),[c,d]=It.useState(!0),[h,u]=It.useState(100),[p,g]=It.useState(null),[y,m]=It.useState(""),[f,v]=It.useState(null),[M,S]=It.useState(!0),[,U]=It.useReducer(P=>P+1,0),C=It.useRef(null),E=It.useRef(null),_=It.useRef(null),w=It.useRef(null);It.useEffect(()=>{const P=$3(C.current,E.current,_.current,{onSelect:V=>g(V),onZoom:V=>u(V)});if(!P){n(!1);return}w.current=P,P.onSpinChange(V=>d(V))},[]),It.useEffect(()=>{const P=q3(()=>U());return()=>{P()}},[]),It.useEffect(()=>{var P;(P=w.current)==null||P.setSel(p)},[p]),It.useEffect(()=>{var P;(P=w.current)==null||P.setQuery(y)},[y]),It.useEffect(()=>{var P;(P=w.current)==null||P.setFocusTop(f)},[f]),It.useEffect(()=>{const P=V=>{var B,F;const k=V.target;if(/^(INPUT|TEXTAREA)$/.test(k.tagName)){V.key==="Escape"&&k.blur();return}V.key==="Escape"?(g(null),v(null)):V.key==="="||V.key==="+"?(B=w.current)==null||B.dolly(.8474576271186441):V.key==="-"||V.key==="_"?(F=w.current)==null||F.dolly(1.18):(V.key==="e"||V.key==="E")&&S(O=>!O)};return addEventListener("keydown",P),()=>removeEventListener("keydown",P)},[]);const D=hn.reduce((P,V)=>P+V.loc,0),L=Cn.reduce((P,V)=>P+V.events,0),I=(P,V)=>V.length?z.jsxs(z.Fragment,{children:[z.jsxs("h3",{children:[P+" ",z.jsx("span",{style:{color:"var(--faint)"},children:V.length})]}),V.map(k=>{const B=Sl[k];return B&&z.jsxs("div",{className:"dep","data-p":k,onClick:()=>g(B),children:[z.jsx("span",{className:"sw",style:{background:k3(B)}}),z.jsx("span",{children:k})]},k)})]}):null;return z.jsxs("div",{id:"app",className:p?void 0:"closed",children:[z.jsxs("aside",{children:[z.jsxs("div",{className:"hd",children:[z.jsx("h1",{children:"PlugBrain City"}),z.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),z.jsxs("div",{className:"kpis",children:[z.jsxs("div",{children:[z.jsx("b",{id:"k-ws",children:Cn.length}),z.jsx("i",{children:"workspaces"})]}),z.jsxs("div",{children:[z.jsx("b",{id:"k-bld",children:hn.length}),z.jsx("i",{children:"buildings"})]}),z.jsxs("div",{children:[z.jsx("b",{id:"k-ev",children:L}),z.jsx("i",{children:"events"})]})]})]}),z.jsx("div",{className:"q",children:z.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:P=>m(P.target.value.trim().toLowerCase())})}),z.jsx("div",{className:"tree",id:"tree",children:Cn.length?Cn.map(P=>{const V=hn.filter(B=>B.dir===P.id),k=V.reduce((B,F)=>B+F.loc,0);return z.jsxs("div",{className:"ws"+(f===P.id?" on":"")+(P.dying?" dying":""),onClick:()=>v(B=>B===P.id?null:P.id),children:[z.jsxs("div",{className:"wsrow",children:[z.jsx("span",{className:"sw",style:{background:zv(P)}}),z.jsx("span",{className:"nm",children:P.name}),P.sim?z.jsx("span",{className:"tag",children:"sim"}):null,z.jsxs("span",{className:"lc",children:[V.length," bld · ",k]})]}),z.jsx("div",{className:"loadbar",children:z.jsx("i",{style:{width:Math.round(P.load*100)+"%",background:zv(P)}})})]},P.id)}):z.jsxs("div",{className:"empty",children:["No workspaces registered.",z.jsx("br",{}),z.jsx("br",{}),z.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),z.jsxs("div",{id:"stage",ref:E,children:[z.jsx("canvas",{id:"cv",ref:C}),z.jsx("div",{id:"tip",ref:_}),z.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",z.jsx("b",{id:"crumb-t",children:p?p.path.toUpperCase():f?f.toUpperCase():"CITY OVERVIEW"})]}),M&&z.jsx("div",{id:"feed",children:gu.slice(0,9).map(P=>z.jsxs("div",{className:"fe",children:[z.jsx("span",{className:"ft",children:P.t.toLocaleTimeString("en-GB",{hour12:!1})}),z.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:P.ws}),z.jsx("span",{className:"fm",children:P.msg})]},P.id))}),z.jsx("div",{id:"legend",children:z.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${i==="loc"?"size":"references"} · flashes = activity`})}),z.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([P,V])=>z.jsx("button",{className:"tb"+(i===P?" on":""),"data-h":P,type:"button",onClick:()=>{X3(P),a(P)},children:V},P)),z.jsx("div",{className:"vsep"}),z.jsx("button",{className:"tb"+(s?" on":""),id:"t-flow",type:"button",onClick:()=>{r(P=>{var V;return(V=w.current)==null||V.setFlow(!P),!P})},children:"Flow"}),z.jsx("button",{className:"tb"+(o?" on":""),id:"t-hatch",type:"button",onClick:()=>{l(P=>{var V;return(V=w.current)==null||V.setHatch(!P),!P})},children:"Hatching"}),z.jsx("button",{className:"tb"+(c?" on":""),id:"t-spin",type:"button",onClick:()=>{d(P=>{var V;return(V=w.current)==null||V.setSpin(!P),!P})},children:"Orbit"}),z.jsx("button",{className:"tb"+(M?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>S(P=>!P),children:"Feed"}),z.jsx("div",{className:"vsep"}),z.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var P;return(P=w.current)==null?void 0:P.dolly(1.18)},children:"−"}),z.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var P;return(P=w.current)==null?void 0:P.reset()},children:h+"%"}),z.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var P;return(P=w.current)==null?void 0:P.dolly(1/1.18)},children:"＋"}),z.jsx("div",{className:"vsep"}),z.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var P;(P=w.current)==null||P.reset(),g(null),v(null)},children:"Reset"})]}),z.jsxs("div",{id:"gate",style:t?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",z.jsx("br",{}),"The workspace registry remains available."]})]}),z.jsx("div",{id:"side",children:z.jsx("div",{id:"dt",children:p&&z.jsxs("div",{className:"dt",children:[z.jsx("div",{className:"kind",children:p.dir+"/"}),z.jsx("h2",{children:p.name}),p.note?z.jsx("div",{className:"note",children:p.note}):null,z.jsxs("dl",{children:[z.jsx("dt",{children:"Size"}),z.jsx("dd",{children:p.loc}),z.jsx("dt",{children:"References"}),z.jsx("dd",{children:p.deps.length}),z.jsx("dt",{children:"Referenced by"}),z.jsx("dd",{children:p.usedBy.length}),z.jsx("dt",{children:"Share of total"}),z.jsx("dd",{children:D?(p.loc/D*100).toFixed(1)+"%":"—"})]}),I("References",p.deps),I("Referenced by",p.usedBy)]})})})]})}function iC({getAgents:e,ROLES:t,STATES:n,LINK_R:i}){const a=["#8ab2d1","#aaf7b3","#ffc09a","#c6a1ce","#efedbd","#8ac1a0","#d6dee8","#e0a355","#9ec4b8","#b4aac8","#9db6cc","#c8ab9e","#7f9db8","#a8c8a0","#d1a3a3","#a3a3c8"],s=new Map;let r=0;function o(y){if(s.has(y))return s.get(y);const m=a[(y.n-1)%a.length],f={hue:m,rgb:m.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)).join(","),trail:[],last:null};return s.set(y,f),f}function l(y){s.delete(y)}const c=.45,d=42,h=26;function u(y){r+=y;for(const m of e()){const f=o(m);if(m.off)continue;const v=f.last,M=!v||Math.hypot(m.x-v.x,m.y-v.y)>h,S=!v||r-v.t>c;M&&S&&(f.trail.push({x:m.x,y:m.y,t:r,busy:m.task?1:0}),f.trail.length>d&&f.trail.shift(),f.last={x:m.x,y:m.y,t:r})}for(const m of[...s.keys()])e().includes(m)||l(m)}function p(y){y.save(),y.lineCap="round",y.lineJoin="round";for(const m of e()){const f=s.get(m);if(!f||f.trail.length<2)continue;const v=f.trail;for(let M=v.length-1;M>0;M--){const S=v[M],U=v[M-1],C=(r-S.t)/(d*c),E=Math.max(0,(1-C)*.34)*(S.busy?1:.55);E<.015||(y.strokeStyle=`rgba(${f.rgb},${E.toFixed(3)})`,y.lineWidth=S.busy?1.6:1,y.beginPath(),y.moveTo(U.x,U.y),y.lineTo(S.x,S.y),y.stroke())}}y.restore()}function g(){const y=[];for(const m of e()){const f=s.get(m)||o(m),v=t[m.ri],M=n[m.state];let S=0;for(const U of e())U!==m&&Math.hypot(m.x-U.x,m.y-U.y)<i&&S++;y.push({n:m.n,hue:f.hue,role:v.cn,tag:v.tag,roleColor:v.color,state:m.off?"OFFLINE":m.state,stateCn:m.off?"Offline":M.cn,task:m.task?"#"+m.task.id:null,queue:m.queue.length,util:m.span>0?m.busy/m.span:0,trail:f.trail.length,links:S,pos:[Math.round(m.x),Math.round(m.y)]})}return y.sort((m,f)=>m.n-f.n),y}return{step:u,draw:p,snapshot:g,register:o,forget:l,hueOf:y=>(s.get(y)||o(y)).hue}}function aC({els:e,emit:t}){const n=new AbortController,{signal:i}=n,a=(T,R,N,W)=>T.addEventListener(R,N,{...W,signal:i}),s=Math.PI*2,r=(T,R,N)=>T+(R-T)*N,o=T=>T-Math.floor(T),l=(T,R)=>{const N=Math.sin(T*12.9898+R*78.233)*43758.5453;return N-Math.floor(N)};function c(T,R){const N=Math.floor(T),W=Math.floor(R);let q=T-N,tt=R-W;q=q*q*(3-2*q),tt=tt*tt*(3-2*tt);const et=l(N,W),ft=l(N+1,W),pt=l(N,W+1),Mt=l(N+1,W+1);return et+(ft-et)*q+(pt-et)*tt+(et-ft-pt+Mt)*q*tt}function d(T,R){const N=Math.PI*(3-Math.sqrt(5)),W=1-2*(T+.5)/R,q=Math.sqrt(1-W*W),tt=T*N;return[q*Math.cos(tt),W,q*Math.sin(tt)]}const h=(T,R)=>Math.atan2(Math.sin(T-R),Math.cos(T-R));function u(T,R,N,W,q){const tt=Math.sin(R),et=Math.cos(R),ft=Math.sin(T),pt=Math.cos(T);return(Mt,Tt,xt)=>{const ot=Mt*pt+xt*ft,Wt=-Mt*ft+xt*pt;return[N+ot*q,W-(Tt*et-Wt*tt)*q,Tt*tt+Wt*et]}}const p=(T,R)=>(T/300)**R;function g(T,R,N){const W=[];for(const q of T)(q.a??1)<.02||(q.r=Math.max(N,q.r),W.push(q));return W.sort((q,tt)=>q.z-tt.z),{dots:W,lines:R.filter(q=>(q.a??1)>=.02)}}function y(T,R,N){const W=T/2,q=W*.82,tt=u(R*.12,.3,W,W,1),et=p(T,N.rsPow),ft=[];for(let pt=0;pt<N.orbitN;pt++){const Mt=l(pt,1.7),Tt=l(pt,5.2),xt=l(pt,8.9),ot=q*(.45+.52*Mt),Wt=Mt*s,Rt=Math.acos(2*Tt-1),Gt=Math.sin(Rt)*Math.cos(Wt),Yt=Math.cos(Rt),Se=Math.sin(Rt)*Math.sin(Wt);let oe=-Yt,Vt=Gt;const jt=0,Ve=Math.max(1e-6,Math.hypot(oe,Vt));oe/=Ve,Vt/=Ve;const le=Yt*jt-Se*Vt,ge=Se*oe-Gt*jt,ye=Gt*Vt-Yt*oe,_e=(.25+.55*xt)*(xt>.5?1:-1);for(let ke=0;ke<N.ghostN;ke++){const at=ke/N.ghostN*s,Dt=Math.cos(at),wt=Math.sin(at),[Pt,Kt,Oe]=tt((oe*Dt+le*wt)*ot,(Vt*Dt+ge*wt)*ot,(jt*Dt+ye*wt)*ot);ft.push({x:Pt,y:Kt,z:Oe,r:N.ghostR*et,white:.72,a:N.ghostA*(.4+.6*((Oe/ot+1)/2))})}for(let ke=0;ke<N.particles;ke++){const at=R*_e+ke/N.particles*s+Tt*6,Dt=Math.cos(at),wt=Math.sin(at),[Pt,Kt,Oe]=tt((oe*Dt+le*wt)*ot,(Vt*Dt+ge*wt)*ot,(jt*Dt+ye*wt)*ot),te=(Oe/ot+1)/2;ft.push({x:Pt,y:Kt,z:Oe,r:(N.partR+N.partRDepth*te)*et,white:.3-.22*te})}}return g(ft,[],N.rMin)}function m(T,R,N){const q=T/2,tt=q*.82,et=u(R*.5,.4+.06*Math.sin(R*.35),q,q,tt),ft=R*(.5+(1.7-.5)*N.scanMul),pt=p(T,N.rsPow),Mt=[];for(let Tt=0;Tt<=N.latRings;Tt++){const xt=-Math.PI/2+Tt/N.latRings*Math.PI,ot=Math.cos(xt),Wt=Math.sin(xt),Rt=Math.max(1,Math.round(Math.abs(ot)*N.lonDensity));for(let Gt=0;Gt<Rt;Gt++){const Yt=Gt/Rt*s,[Se,oe,Vt]=et(ot*Math.cos(Yt),Wt,ot*Math.sin(Yt)),jt=(Vt+1)/2,Ve=h(Yt+R*.5,ft),le=Math.exp(-(Ve*Ve)/.18)*Math.max(0,Vt);Mt.push({x:Se,y:oe,z:Vt,r:(N.rBase+N.rDepth*jt+N.rBoost*le)*pt,white:N.inkFar-N.inkSpan*jt,a:N.dimBase+(1-N.dimBase)*Math.min(1,le)})}}return g(Mt,[],N.rMin)}function f(T,R,N){const W=T/2,q=W*.82,tt=u(R*.55,.35+.1*Math.sin(R*.9),W,W,q),et=p(T,N.rsPow),ft=N.moveCount,pt=[];for(let Yt=0;Yt<ft;Yt++){const Se=Math.min(2,Math.floor(l(Yt,2.3)*3)),oe=-1+.5*Math.min(3,Math.floor(l(Yt,5.9)*4));pt.push({axis:Se,lo:oe,hi:oe+.5,ang:(l(Yt,7.7)<.5?1:-1)*Math.PI/2})}const Mt=.42,Tt=1.2,xt=2*ft*Mt+Tt,ot=R%xt,Wt=new Array(ft).fill(0);let Rt=-1;if(ot<2*ft*Mt){const Yt=Math.floor(ot/Mt),Se=(ot-Yt*Mt)/Mt,oe=1-(1-Math.min(1,Se/.7))**3;if(Yt<ft){for(let Vt=0;Vt<Yt;Vt++)Wt[Vt]=1;Wt[Yt]=oe,Rt=Yt}else{const Vt=2*ft-1-Yt;for(let jt=0;jt<Vt;jt++)Wt[jt]=1;Wt[Vt]=1-oe,Rt=Vt}}const Gt=[];for(let Yt=0;Yt<=N.latRings;Yt++){const Se=-Math.PI/2+Yt/N.latRings*Math.PI,oe=Math.cos(Se),Vt=Math.sin(Se),jt=Math.max(1,Math.round(Math.abs(oe)*N.lonDensity));for(let Ve=0;Ve<jt;Ve++){const le=Ve/jt*s;let ge=oe*Math.cos(le),ye=Vt,_e=oe*Math.sin(le),ke=!1;for(let Kt=0;Kt<ft;Kt++){if(Wt[Kt]<=0)continue;const Oe=pt[Kt],te=Oe.axis===0?ge:Oe.axis===1?ye:_e;if(te<Oe.lo||te>=Oe.hi)continue;Kt===Rt&&(ke=!0);const En=Oe.ang*Wt[Kt],Ze=Math.cos(En),Jt=Math.sin(En);if(Oe.axis===0){const Be=ye*Ze-_e*Jt;_e=ye*Jt+_e*Ze,ye=Be}else if(Oe.axis===1){const Be=ge*Ze+_e*Jt;_e=-ge*Jt+_e*Ze,ge=Be}else{const Be=ge*Ze-ye*Jt;ye=ge*Jt+ye*Ze,ge=Be}}const[at,Dt,wt]=tt(ge,ye,_e),Pt=(wt+1)/2;Gt.push({x:at,y:Dt,z:wt,r:(N.rBase+N.rDepth*Pt+(ke?N.rActive:0))*et,white:N.inkFar-N.inkSpan*Pt-(ke?.14:0)})}}return g(Gt,[],N.rMin)}function v(T,R,N){const W=T/2,q=W*.874,tt=u(R*.18,.38,W,W,1),et=p(T,N.rsPow),ft=[];for(let pt=0;pt<=N.rings;pt++){const Mt=-Math.PI/2+pt/N.rings*Math.PI,Tt=Math.cos(Mt),xt=Math.sin(Mt),ot=.62*Math.sin(R*2.1-pt*.52)+.38*Math.sin(R*1.27+pt*.83),Wt=q*(.88+.105*ot),Rt=Math.max(1,Math.round(Math.abs(Tt)*N.lonDensity));for(let Gt=0;Gt<Rt;Gt++){const Yt=Gt/Rt*s,[Se,oe,Vt]=tt(Tt*Math.cos(Yt)*Wt,xt*Wt,Tt*Math.sin(Yt)*Wt),jt=(Vt/q+1)/2,Ve=Math.max(0,ot);ft.push({x:Se,y:oe,z:Vt,r:(N.rBase+N.rDepth*jt)*(1+.4*Ve)*et,white:.66-.56*jt-.1*Ve})}}return g(ft,[],N.rMin)}function M(T,R,N){const W=T/2,q=W*.8,tt=u(R*.12,.32,W,W,q),et=p(T,N.rsPow),ft=N.nodeN,pt=[];for(let xt=0;xt<ft;xt++){const ot=d(xt,ft),Wt=ot[0]+.6*(c(xt*.31+9,R*.24)-.5),Rt=ot[1]+.6*(c(xt*.53+27,R*.21)-.5),Gt=ot[2]+.6*(c(xt*.77+55,R*.27)-.5),Yt=Math.hypot(Wt,Rt,Gt);pt.push([Wt/Yt,Rt/Yt,Gt/Yt])}const Mt=[],Tt=[];for(let xt=0;xt<ft;xt++)for(let ot=xt+1;ot<ft;ot++){const Wt=Math.hypot(pt[xt][0]-pt[ot][0],pt[xt][1]-pt[ot][1],pt[xt][2]-pt[ot][2]);if(Wt>=N.thr)continue;const[Rt,Gt,Yt]=tt(pt[xt][0],pt[xt][1],pt[xt][2]),[Se,oe,Vt]=tt(pt[ot][0],pt[ot][1],pt[ot][2]);Mt.push({x1:Rt,y1:Gt,x2:Se,y2:oe,white:.42,a:(1-Wt/N.thr)*(.3+.55*(((Yt+Vt)/2+1)/2)),w:Math.max(.6,N.lineW*et)})}for(let xt=0;xt<ft;xt++){const[ot,Wt,Rt]=tt(pt[xt][0],pt[xt][1],pt[xt][2]),Gt=(Rt+1)/2;Tt.push({x:ot,y:Wt,z:Rt,r:(N.nodeR+N.nodeRDepth*Gt)*(1+.25*Math.sin(R*1.4+xt*2.7))*et,white:.55-.45*Gt})}for(let xt=0;xt<N.signals;xt++){const ot=Math.floor(R*.55+xt*7.31),Wt=Math.floor(l(ot,xt*3.1+1.7)*ft),Rt=Math.floor(l(ot,xt*5.7+4.2)*ft);if(Wt===Rt)continue;const Gt=o(R*.55+xt*7.31),Yt=r(pt[Wt][0],pt[Rt][0],Gt),Se=r(pt[Wt][1],pt[Rt][1],Gt),oe=r(pt[Wt][2],pt[Rt][2],Gt),Vt=Math.max(1e-6,Math.hypot(Yt,Se,oe)),[jt,Ve,le]=tt(Yt/Vt,Se/Vt,oe/Vt),ge=(le+1)/2;Tt.push({x:jt,y:Ve,z:le,r:(N.nodeR*1.5+N.nodeRDepth*ge)*et,white:.05,a:.5+.5*ge})}return g(Tt,Mt,N.rMin)}function S(T,R,N){const W=T/2,q=W*.76,tt=u(R*.4,.3,W,W,1),et=p(T,N.rsPow),ft=[];for(let pt=0;pt<N.ghostN;pt++){const Mt=d(pt,N.ghostN),[Tt,xt,ot]=tt(Mt[0]*q,Mt[1]*q,Mt[2]*q);ft.push({x:Tt,y:xt,z:ot,r:.8*et,white:.78,a:.1+.22*((ot/q+1)/2)})}for(let pt=0;pt<3;pt++){const Mt=pt/3*s;for(let Tt=0;Tt<N.strandN;Tt++){const xt=(o(Tt/N.strandN+R*.045)*2-1)*.96,ot=Math.sqrt(Math.max(0,1-xt*xt)),Wt=Math.min(1,(1-Math.abs(xt))/.1),Rt=xt*Math.PI*N.turns+Mt,Gt=1+.075*Math.sin(xt*Math.PI*N.turns*2+Mt*2+R*.8),Yt=ot*q*Gt,[Se,oe,Vt]=tt(Math.cos(Rt)*Yt,xt*q*Gt,Math.sin(Rt)*Yt),jt=(Vt/q+1)/2;ft.push({x:Se,y:oe,z:Vt,r:(N.rBase+N.rDepth*jt)*et,white:.55-.45*jt,a:Wt*(.45+.55*jt)})}}return g(ft,[],N.rMin)}function U(T,R,N){const W=T/2,q=W*.78,tt=N.spin,et=.3,ft=u(R*.1*tt,et,W,W,1),pt=p(T,N.rsPow),Mt=[];for(let ye=0;ye<N.ghostN;ye++){const _e=d(ye,N.ghostN),[ke,at,Dt]=ft(_e[0]*q,_e[1]*q,_e[2]*q);Mt.push({x:ke,y:at,z:Dt,r:.8*pt,white:.78,a:.1+.22*((Dt/q+1)/2)})}const Tt=R*.24*tt,xt=N.faceOn?-et:.55+.3*Math.sin(R*.18)*tt,ot=Math.cos(Tt),Wt=0,Rt=Math.sin(Tt),Gt=-Rt*Math.sin(xt),Yt=Math.cos(xt),Se=ot*Math.sin(xt),oe=Wt*Se-Rt*Yt,Vt=Rt*Gt-ot*Se,jt=ot*Yt-Wt*Gt,Ve=.23*N.wobMul,le=N.faceOn?q/(1+.85*Ve):q,ge=Math.max(1,Math.round(N.lanes*N.bandMul));for(let ye=0;ye<ge;ye++){const _e=(ye-(ge-1)/2)*.075,ke=Math.abs(ye-(ge-1)/2)/Math.max(1,(ge-1)/2);for(let at=0;at<N.segs;at++){const Dt=at/N.segs*s,wt=(.16*Math.sin(Dt*3-R*1.7+ye*.22)+.07*Math.sin(Dt*5+R*1.1))*N.wobMul,Pt=N.faceOn?1+wt:1,Kt=N.faceOn?_e:_e+wt,Oe=Math.cos(Dt),te=Math.sin(Dt),En=ot*Oe+Gt*te+oe*Kt,Ze=Wt*Oe+Yt*te+Vt*Kt,Jt=Rt*Oe+Se*te+jt*Kt,Be=Math.hypot(En,Ze,Jt),mr=le*Pt,[Jl,$l,e0]=ft(En/Be*mr,Ze/Be*mr,Jt/Be*mr),Af=(e0/q+1)/2;Mt.push({x:Jl,y:$l,z:e0,r:(N.rBase+N.rDepth*Af)*(1-.25*ke)*pt,white:.52-.44*Af+.18*ke,a:.4+.6*Af})}}return g(Mt,[],N.rMin)}const C=T=>{const R=T.length,N=[];let W=0;for(let q=0;q<R;q++){const tt=Math.hypot(T[(q+1)%R][0]-T[q][0],T[(q+1)%R][1]-T[q][1]);N.push(tt),W+=tt}return q=>{let tt=q*W,et=0;for(;tt>N[et]&&et<R-1;)tt-=N[et],et++;const ft=T[et],pt=T[(et+1)%R],Mt=N[et]?Math.min(1,tt/N[et]):0;return[ft[0]+(pt[0]-ft[0])*Mt,ft[1]+(pt[1]-ft[1])*Mt]}},E=[T=>{const R=-Math.PI/2+T*s;return[Math.cos(R)*.24,Math.sin(R)*.24]},C([[0,-.26],[.24,.16],[-.24,.16]]),C([[0,-.2],[.2,-.2],[.2,.2],[-.2,.2],[-.2,-.2]])];function _(T,R,N){const et=E.length,ft=R%(2.3*et),pt=Math.floor(ft/2.3),Mt=ft-pt*2.3,Tt=Mt>1.4?(Mt-1.4)/.9:0,xt=Tt*Tt*(3-2*Tt),ot=E[pt],Wt=E[(pt+1)%et],Rt=160,Gt=[],Yt=[];for(let _e=0;_e<Rt;_e++){const ke=ot(_e/Rt),at=Wt(_e/Rt);Gt.push([(ke[0]+(at[0]-ke[0])*xt)*N.spread,(ke[1]+(at[1]-ke[1])*xt)*N.spread])}let Se=0;for(let _e=0;_e<Rt;_e++){const ke=Math.hypot(Gt[(_e+1)%Rt][0]-Gt[_e][0],Gt[(_e+1)%Rt][1]-Gt[_e][1]);Yt.push(ke),Se+=ke}const oe=Math.max(6,Math.round(34*N.iconD)),Vt=N.rDot*1.35*N.spread,jt=1+.02*Math.sin(Mt*3.1),Ve=T/2,le=[];let ge=0,ye=0;for(let _e=0;_e<oe;_e++){const ke=_e/oe*Se;for(;ye+Yt[ge]<ke&&ge<Rt-1;)ye+=Yt[ge],ge++;const at=Gt[ge],Dt=Gt[(ge+1)%Rt],wt=Yt[ge]?Math.min(1,(ke-ye)/Yt[ge]):0;le.push({x:Ve+(at[0]+(Dt[0]-at[0])*wt)*jt*T,y:Ve+(at[1]+(Dt[1]-at[1])*wt)*jt*T,z:0,r:Math.max(.35,Vt*T),white:.1})}return g(le,[],N.rMin)}const w={globe:{latRings:17,lonDensity:44,rBase:.6,rDepth:1.7,rBoost:1,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},orbits:{orbitN:12,ghostN:40,ghostR:.9,ghostA:.5,particles:3,partR:1.2,partRDepth:1.6,rsPow:.6,rMin:.3},rubik:{latRings:15,lonDensity:40,moveCount:14,rBase:.6,rDepth:1.7,rActive:.3,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},wave:{rings:15,lonDensity:40,rBase:.6,rDepth:1.7,rsPow:.6,rMin:.3},web:{nodeN:30,thr:.72,signals:5,nodeR:1.4,nodeRDepth:1.8,lineW:.8,rsPow:.6,rMin:.3},braid:{strandN:52,turns:3,ghostN:150,rBase:1.2,rDepth:1.8,rsPow:.6,rMin:.3},ribbon:{lanes:5,segs:88,ghostN:150,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},ring:{lanes:5,segs:88,ghostN:0,faceOn:1,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},morph:{rDot:.021,iconD:1,rMin:.25}},D={orbits:{64:{speed:1.885,count:1,size:1},20:{speed:3.9,count:.238,size:2.4}},globe:{64:{speed:2.015,count:.42,size:1.15,x:{scanMul:4.08,dimBase:.45}},20:{speed:2.665,count:.105,size:1.75,x:{scanMul:4.335,dimBase:.45}}},rubik:{64:{speed:1.82,count:.35,size:1.05},20:{speed:1.95,count:.088,size:1.9}},wave:{64:{speed:4.388,count:.341,size:1},20:{speed:3.998,count:.105,size:1.6}},web:{64:{speed:3.315,count:1.35,size:.95},20:{speed:6.63,count:.25,size:1.52}},braid:{64:{speed:1.625,count:.5,size:1},20:{speed:2.75,count:.1125,size:1.36}},ribbon:{64:{speed:2.34,count:.25,size:.85,x:{spin:0,bandMul:3.9,wobMul:1}},20:{speed:3.12,count:.051,size:1.073,x:{spin:0,bandMul:4.94,wobMul:1}}},ring:{64:{speed:3.24,count:.25,size:.956,x:{spin:0,bandMul:3.627,wobMul:.368}},20:{speed:3.78,count:.028,size:1.622,x:{spin:0,bandMul:3.968,wobMul:.565}}},morph:{64:{speed:2.405,count:.702,size:.395,x:{spread:1.45}},20:{speed:2.08,count:.53,size:1.011,x:{spread:1.45}}}},L=[["latRings","lonDensity"],["rings","lonDensity"],["lanes","segs"]],I=["orbitN","ghostN","nodeN","strandN","signals"],P=["rBase","rDepth","rActive","rDot","ghostR","partR","partRDepth","nodeR","nodeRDepth"],V={orbits:y,globe:m,rubik:f,wave:v,web:M,braid:S,ribbon:U,ring:U,morph:_},k=new Map;function B(T,R){const N=T+R,W=k.get(N);if(W)return W;const q=D[T][R],tt={...w[T]},et=Math.sqrt(q.count),ft=new Set;for(const[Mt,Tt]of L)tt[Mt]!=null&&tt[Tt]!=null&&!ft.has(Mt)&&!ft.has(Tt)&&(tt[Mt]=Math.max(2,Math.round(tt[Mt]*et)),tt[Tt]=Math.max(2,Math.round(tt[Tt]*et)),ft.add(Mt),ft.add(Tt));for(const Mt of I)tt[Mt]!=null&&tt[Mt]!==0&&!ft.has(Mt)&&(tt[Mt]=Math.max(1,Math.round(tt[Mt]*q.count)));tt.iconD!=null&&(tt.iconD=Math.max(.02,tt.iconD*q.count));for(const Mt of P)tt[Mt]!=null&&(tt[Mt]=tt[Mt]*q.size);const pt={fn:V[T],speed:q.speed,opts:Object.assign({spin:1,faceOn:0,bandMul:1,wobMul:1,spread:1,scanMul:1,dimBase:1},tt,q.x||{})};return k.set(N,pt),pt}function F(T,R,N,W,q,tt){const et=B(R,N),ft=et.fn(N,W*et.speed,et.opts),[pt,Mt,Tt]=q;for(const xt of ft.lines){const ot=1-Math.min(1,Math.max(0,xt.white));T.strokeStyle=`rgba(${ot*pt|0},${ot*Mt|0},${ot*Tt|0},${(xt.a??1)*tt})`,T.lineWidth=xt.w,T.beginPath(),T.moveTo(xt.x1,xt.y1),T.lineTo(xt.x2,xt.y2),T.stroke()}for(const xt of ft.dots){const ot=1-Math.min(1,Math.max(0,xt.white));T.fillStyle=`rgba(${ot*pt|0},${ot*Mt|0},${ot*Tt|0},${(xt.a??1)*tt})`,T.beginPath(),T.arc(xt.x,xt.y,xt.r,0,s),T.fill()}}const O={IDLE:{mode:"ring",cn:"Idle"},RECV:{mode:"wave",cn:"Receive"},PLAN:{mode:"morph",cn:"Plan"},SCAN:{mode:"globe",cn:"Retrieve"},EXEC:{mode:"orbits",cn:"Execute"},DBUG:{mode:"rubik",cn:"Debug"},SYNC:{mode:"web",cn:"Coordinate"},MERG:{mode:"braid",cn:"Merge"},WRIT:{mode:"ribbon",cn:"Compose"}},X=[{id:"plan",cn:"Planning",tag:"PLAN",color:"#d6dee8",prog:[["PLAN",.8],["SYNC",.5]],rework:0},{id:"find",cn:"Research",tag:"FIND",color:"#9db6cc",prog:[["SCAN",1.6],["WRIT",.8]],rework:0},{id:"code",cn:"Coding",tag:"CODE",color:"#9ec4b8",prog:[["EXEC",2.9],["DBUG",1.4]],rework:.1},{id:"crit",cn:"Review",tag:"CRIT",color:"#b4aac8",prog:[["SCAN",.8],["MERG",1.2]],rework:.18},{id:"ship",cn:"Delivery",tag:"SHIP",color:"#c8ab9e",prog:[["MERG",.7],["WRIT",.7]],rework:0}],ht={plan:1,find:2,code:3,crit:1,ship:1},bt=16,Nt=210,re=128,Qt=64,ae=620,dt=178,At=16;let lt=[],Bt=[],qt=[],Zt=[],Ue=[],ee=0,Le=0,xe=0,me=20,ze=1,ce=null,Je=0,nn=0;const ue={x:-9999,y:-9999,in:!1};let Ot=20260418;const H=()=>(Ot=Ot*1664525+1013904223>>>0)/4294967296,{field:fe,glow:ne}=e,b=fe.getContext("2d");let x=innerWidth,Y=innerHeight,K=46;function it(T){const R=x>1080?268:240,N=x-K,W=X.length;return{x:R+(T+.5)/W*(N-R),y:Y*.5-16,rx:Math.max(40,(N-R)/W*.33),ry:Math.max(60,Y*.28)}}const St=T=>{const R=it(T.ri);return{x:R.x+(H()-.5)*R.rx*2,y:R.y+(H()-.5)*R.ry*2}};function Ct(T){const R=it(T),N={n:++xe,ri:T,x:R.x+(H()-.5)*R.rx*2,y:R.y+(H()-.5)*R.ry*2,head:H()*s,wp:null,phase:H()*40,state:"IDLE",task:null,step:0,left:0,queue:[],off:!1,busy:0,span:0,pulse:0,hist:new Array(28).fill(0),histT:0};return N.wp=St(N),N}let st=!1;const j=new Map,ut={PLANNED:"IDLE",RUNNING:"EXEC",BLOCKED:"DBUG",REVIEW:"SCAN",REPAIR:"DBUG",VERIFIED:"MERG",MERGED:"MERG",DONE:"WRIT"},gt={PLANNED:"plan",RUNNING:"code",BLOCKED:"code",REVIEW:"crit",REPAIR:"code",VERIFIED:"crit",MERGED:"ship",DONE:"ship"};function _t(){lt=[],Bt=[],qt=[],Zt=[],Ue=[],ee=0,Le=0,xe=0,nn=0,X.forEach((T,R)=>{for(let N=0;N<ht[T.id];N++)lt.push(Ct(R))});for(let T=0;T<90*30;T++)Xt(1/30)}function yt(T){const R=lt.filter(W=>W.ri===T&&!W.off);if(!R.length)return null;const N=R.filter(W=>W.state==="IDLE"&&!W.task&&!W.queue.length);return N.length?N[Math.floor(H()*N.length)]:R.reduce((W,q)=>q.queue.length<W.queue.length?q:W)}function Ft(T,R){const N=yt(R);return N?(N.queue.push(T),N.pulse=1,!0):(Bt.push({t:T,ri:R}),!1)}function kt(T,R,N){const W=yt(N);if(!W){Bt.push({t:R,ri:N});return}qt.push({from:T,to:W,task:R,f:0,back:N<T.ri})}function $t(T){const[R,N]=X[T.ri].prog[T.step];T.state=R,T.left=N*(.75+H()*.5)}const G=30;function Et(T,R){if(T.off){T.state="IDLE";return}const N=Math.exp(-R/G);if(T.span=T.span*N+R,T.task?T.busy=T.busy*N+R:T.busy*=N,!T.task){if(!T.queue.length){T.state="IDLE";return}T.task=T.queue.shift(),T.state="RECV",T.left=.34,T.step=-1}if(T.left-=R,T.left>0)return;if(T.step<0){T.step=0,$t(T);return}if(T.step++,T.step<X[T.ri].prog.length){$t(T);return}const W=X[T.ri],q=T.task;if(T.task=null,T.step=0,T.state="IDLE",q.hops++,T.ri>0&&H()<W.rework){q.rework++,kt(T,q,T.ri-1);return}if(T.ri===X.length-1){q.doneAt=ee,nn++,Ue.push(q),Ue.length>80&&Ue.shift();return}kt(T,q,T.ri+1)}const ct=.055,rt=Qt*1.42;function Ut(T,R){const N=!!T.task;(!T.wp||Math.hypot(T.wp.x-T.x,T.wp.y-T.y)<16)&&(T.wp=St(T));let W=T.wp.x,q=T.wp.y;if(ue.in){const ft=Math.hypot(ue.x-T.x,ue.y-T.y);if(ft<re){const pt=1-ft/re;W=r(W,ue.x,pt*.85),q=r(q,ue.y,pt*.85)}}T.head+=Math.max(-ct,Math.min(ct,h(Math.atan2(q-T.y,W-T.x),T.head)));const tt=(N?7:30)*R;T.x+=Math.cos(T.head)*tt,T.y+=Math.sin(T.head)*tt;for(const ft of lt){if(ft===T)continue;const pt=T.x-ft.x,Mt=T.y-ft.y,Tt=pt*pt+Mt*Mt;if(Tt>rt*rt)continue;const xt=Math.max(.001,Math.sqrt(Tt)),ot=(1-xt/rt)*34*R,Wt=Math.abs(Mt)<1?T.n<ft.n?-rt:rt:Mt,Rt=Math.max(.001,Math.hypot(pt,Wt));T.x+=pt/Rt*ot*.5,T.y+=Wt/Rt*ot*1.5}const et=it(T.ri);T.x=r(T.x,Math.max(et.x-et.rx*1.5,Math.min(et.x+et.rx*1.5,T.x)),.08),T.y=r(T.y,Math.max(et.y-et.ry*1.2,Math.min(et.y+et.ry*1.2,T.y)),.08),T.pulse>0&&(T.pulse-=R*1.6),T.histT+=R,T.histT>1&&(T.histT=0,T.hist.push(N?1:0),T.hist.shift())}function vt(){return Bt.length+qt.length+lt.reduce((T,R)=>T+R.queue.length+(R.task?1:0),0)}function Xt(T){ee+=T,st||(Je-=T,Je<=0&&(Je=-Math.log(1-H())*(60/me),vt()<bt&&Ft({id:++Le,at:ee,hops:0,rework:0},0)));for(let R=Bt.length-1;R>=0;R--){const N=yt(Bt[R].ri);N&&(N.queue.push(Bt[R].t),N.pulse=1,Bt.splice(R,1))}for(const R of lt)st||Et(R,T),Ut(R,T);for(let R=qt.length-1;R>=0;R--){const N=qt[R],W=Math.max(1,Math.hypot(N.to.x-N.from.x,N.to.y-N.from.y));N.f+=Nt*T/W,N.f>=1&&(lt.includes(N.to)&&!N.to.off?(N.to.queue.push(N.task),N.to.pulse=1):Bt.push({t:N.task,ri:N.to.ri}),qt.splice(R,1))}for(let R=Zt.length-1;R>=0;R--)Zt[R].t+=T*1.6,Zt[R].t>1&&Zt.splice(R,1)}const Ht=[223,227,232],Me=[207,217,228],Ie="ui-monospace, 'Geist Mono Variable', SFMono-Regular, Menlo, monospace",Dn=T=>[1,3,5].map(R=>parseInt(T.slice(R,R+2),16)).join(",");for(const T of X)T.rgb=Dn(T.color);function Nn(T){b.clearRect(0,0,x,Y),b.textAlign="center";for(let R=0;R<X.length;R++){const N=X[R],W=it(R),q=lt.filter(et=>et.ri===R&&!et.off).length,tt=lt.filter(et=>et.ri===R).reduce((et,ft)=>et+ft.queue.length,0);b.strokeStyle=`rgba(${N.rgb},0.055)`,b.lineWidth=1,b.beginPath(),b.moveTo(W.x,74),b.lineTo(W.x,Y-66),b.stroke(),b.strokeStyle=`rgba(${N.rgb},0.16)`,b.beginPath(),b.moveTo(W.x-W.rx*.8,62),b.lineTo(W.x+W.rx*.8,62),b.stroke(),b.font=`10px ${Ie}`,b.fillStyle=`rgba(${N.rgb},${q?.78:.34})`,b.fillText(`${R+1}. ${N.cn} ${N.tag}`,W.x,40),b.font=`9px ${Ie}`,b.fillStyle="rgba(150,160,172,0.5)",b.fillText(q?`${q} agents · queue ${tt}`:"No agents",W.x,53)}b.textAlign="left",b.lineWidth=.7,b.setLineDash([3,5]);for(let R=0;R<lt.length;R++)for(let N=R+1;N<lt.length;N++){const W=lt[R],q=lt[N],tt=Math.hypot(W.x-q.x,W.y-q.y);tt>dt||(b.strokeStyle=`rgba(190,200,212,${(.42*(1-tt/dt)).toFixed(3)})`,b.beginPath(),b.moveTo(W.x,W.y),b.lineTo(q.x,q.y),b.stroke())}b.setLineDash([]);for(const R of qt){const N=r(R.from.x,R.to.x,R.f),W=r(R.from.y,R.to.y,R.f),q=R.back?"224,104,95":"186,203,220";b.strokeStyle=`rgba(${q},0.18)`,b.lineWidth=.9,b.beginPath(),b.moveTo(R.from.x,R.from.y),b.lineTo(R.to.x,R.to.y),b.stroke();const tt=Math.max(0,R.f-.14),et=r(R.from.x,R.to.x,tt),ft=r(R.from.y,R.to.y,tt),pt=b.createLinearGradient(et,ft,N,W);pt.addColorStop(0,`rgba(${q},0)`),pt.addColorStop(1,`rgba(${q},0.85)`),b.strokeStyle=pt,b.lineWidth=1.6,b.beginPath(),b.moveTo(et,ft),b.lineTo(N,W),b.stroke(),b.fillStyle=`rgba(${q},0.95)`,b.beginPath(),b.arc(N,W,2.3,0,s),b.fill()}b.font=`9.5px ${Ie}`,b.textBaseline="middle";for(const R of lt){const N=X[R.ri],W=ce===R,q=ue.in&&Math.hypot(ue.x-R.x,ue.y-R.y)<Qt*.62;if(R.off||(b.strokeStyle="rgba(150,160,172,0.42)",b.lineWidth=.8,b.beginPath(),b.moveTo(R.x-Math.cos(R.head)*Qt*.4,R.y-Math.sin(R.head)*Qt*.4),b.lineTo(R.x-Math.cos(R.head)*Qt*.74,R.y-Math.sin(R.head)*Qt*.74),b.stroke(),R.wp&&!R.task&&(b.fillStyle="rgba(150,160,172,0.45)",b.beginPath(),b.arc(R.wp.x,R.wp.y,1.6,0,s),b.fill())),b.save(),b.translate(R.x-Qt/2,R.y-Qt/2),F(b,O[R.state].mode,Qt,T+R.phase,W?Me:Ht,R.off?.16:1),b.restore(),R.pulse>0){const ot=R.pulse;b.strokeStyle=`rgba(200,214,228,${(ot*.7).toFixed(3)})`,b.lineWidth=1,b.beginPath(),b.arc(R.x,R.y,Qt*.42+(1-ot)*22,0,s),b.stroke()}(W||q)&&(b.strokeStyle=W?"rgba(207,217,228,0.75)":"rgba(190,200,212,0.30)",b.lineWidth=1,b.setLineDash([2,4]),b.beginPath(),b.arc(R.x,R.y,Qt*.6,0,s),b.stroke(),b.setLineDash([]));const tt=`A${R.n} ${N.tag}`,et=R.off?" OFFLINE":" "+R.state,ft=b.measureText(tt).width,pt=b.measureText(et).width,Tt=R.x+Qt*.42+ft+pt>x-12?R.x-Qt*.42-ft-pt:R.x+Qt*.42,xt=R.y-Qt*.3;b.fillStyle=R.off?"rgba(120,128,138,.55)":N.color,b.fillText(tt,Tt,xt),b.fillStyle=R.off?"rgba(100,108,118,.5)":"rgba(190,200,212,0.62)",b.fillText(et,Tt+ft,xt),R.queue.length&&(b.fillStyle="rgba(207,217,228,0.92)",b.fillText(`+${R.queue.length}`,Tt,xt+12))}ue.in&&(b.strokeStyle="rgba(190,200,212,0.13)",b.lineWidth=.5,b.setLineDash([6,8]),b.beginPath(),b.arc(ue.x,ue.y,re,0,s),b.stroke(),b.setLineDash([]));for(const R of Zt)b.strokeStyle=`rgba(224,104,95,${((1-R.t)*.75).toFixed(3)})`,b.lineWidth=2*(1-R.t),b.beginPath(),b.arc(R.x,R.y,12+R.t*150,0,s),b.stroke()}const Ce=ne.getContext("webgl",{alpha:!1,antialias:!1});let yi=()=>{};if(Ce){const T=`precision mediump float;
    uniform vec2 uRes; uniform float uTime, uN; uniform vec3 uA[${At}];
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
      for (int i = 0; i < ${At}; i++) {
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
    }`,R=(xt,ot)=>{const Wt=Ce.createShader(xt);return Ce.shaderSource(Wt,ot),Ce.compileShader(Wt),Wt},N=Ce.createProgram();Ce.attachShader(N,R(Ce.VERTEX_SHADER,"attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}")),Ce.attachShader(N,R(Ce.FRAGMENT_SHADER,T)),Ce.linkProgram(N),Ce.useProgram(N);const W=Ce.createBuffer();Ce.bindBuffer(Ce.ARRAY_BUFFER,W),Ce.bufferData(Ce.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),Ce.STATIC_DRAW);const q=Ce.getAttribLocation(N,"p");Ce.enableVertexAttribArray(q),Ce.vertexAttribPointer(q,2,Ce.FLOAT,!1,0,0);const tt=xt=>Ce.getUniformLocation(N,xt),et=tt("uRes"),ft=tt("uTime"),pt=tt("uN"),Mt=tt("uA[0]"),Tt=new Float32Array(At*3);yi=(xt,ot)=>{const Wt=Math.min(At,lt.length);for(let Rt=0;Rt<Wt;Rt++){const Gt=lt[Rt];Tt[Rt*3]=Gt.x*ot,Tt[Rt*3+1]=(Y-Gt.y)*ot,Tt[Rt*3+2]=Gt.off?.05:Gt.task?1:.22}Ce.uniform2f(et,ne.width,ne.height),Ce.uniform1f(ft,xt),Ce.uniform1f(pt,Wt),Ce.uniform3fv(Mt,Tt),Ce.drawArrays(Ce.TRIANGLES,0,3)}}const $e=e.roster;function be(){const T=Math.min(devicePixelRatio,2);$e.innerHTML=X.map((R,N)=>{const W=lt.filter(q=>q.ri===N);return`<div class="grp"><h2><i style="background:${R.color}"></i>${R.cn} ${R.tag}<span class="sp"></span>
      <button data-sub="${N}" type="button"${W.length?"":" disabled"}>−</button>
      <button data-add="${N}" type="button"${lt.length>=At?" disabled":""}>+</button></h2>
      ${W.map(q=>`<div class="ag" data-n="${q.n}"><canvas></canvas>
        <span class="nm">${q.label||"A"+q.n}</span><span class="st"></span>
        <span class="q"></span><span class="bar"><i></i></span></div>`).join("")}
    </div>`}).join("");for(const R of $e.querySelectorAll("canvas"))R.width=20*T,R.height=20*T,R.getContext("2d").setTransform(T,0,0,T,0,0)}a($e,"click",T=>{const R=T.target.closest("[data-add]"),N=T.target.closest("[data-sub]");if(R){lt.length<At&&(lt.push(Ct(+R.dataset.add)),be());return}if(N){const q=+N.dataset.sub,tt=lt.filter(ft=>ft.ri===q);if(!tt.length)return;const et=tt[tt.length-1];lt=lt.filter(ft=>ft!==et),ce===et&&(ce=null,Hn());for(const ft of[...et.task?[et.task]:[],...et.queue])Ft(ft,q);be();return}const W=T.target.closest("[data-n]");W&&(ce=lt.find(q=>q.n===+W.dataset.n)||null,Hn(),be())});function Un(T){for(const R of $e.querySelectorAll(".ag")){const N=lt.find(et=>et.n===+R.dataset.n);if(!N)continue;const W=R.querySelector("canvas").getContext("2d");W.clearRect(0,0,20,20),F(W,O[N.state].mode,20,T+N.phase,ce===N?Me:Ht,N.off?.2:1),R.querySelector(".st").textContent=N.off?"OFFLINE":`${N.state} ${O[N.state].cn}`,R.querySelector(".q").textContent=N.queue.length?`+${N.queue.length}`:"";const q=N.span>0?N.busy/N.span:0,tt=R.querySelector(".bar i");tt.style.width=(q*100).toFixed(0)+"%",tt.style.background=q>.86?"var(--bad)":q>.75?"var(--warn)":"var(--muted)",R.classList.toggle("on",ce===N),R.classList.toggle("down",N.off)}}function li(){const T=ce,R=X[T.ri],N=T.span>0?T.busy/T.span:0,W=O[T.state];return{n:T.n,color:R.color,cn:R.cn,prog:R.prog.map(q=>q[0]).join(" → "),off:T.off,st:`${T.state} ${W.cn}`,md:W.mode,tk:T.task?"#"+T.task.id:"—",q:T.queue.length,u:(N*100).toFixed(0)+"%",hist:T.hist.map(q=>!!q)}}function Hn(){if(!ce||!lt.includes(ce)){ce=null,t.card(null);return}t.card(li())}function Qn(){!ce||!lt.includes(ce)||t.card(li())}function Gi(T){const R=ce;R&&(T==="off"?(R.off=!R.off,R.off&&Mi(R)):Qi(R),Hn(),be())}function ha(){ce=null,Hn(),be()}function Mi(T){const R=[...T.task?[T.task]:[],...T.queue];T.task=null,T.queue=[],T.state="IDLE",T.step=0;for(const N of R){const W=yt(T.ri);W&&W!==T?(W.queue.push(N),W.pulse=1):Bt.push({t:N,ri:T.ri})}}function Qi(T){!T.task&&!T.queue.length||(Zt.push({x:T.x,y:T.y,t:0}),Mi(T))}function Vi(){const T=Math.min(60,ee),R=Ue.filter(tt=>tt.doneAt>ee-60),N=Ue.slice(-20).map(tt=>tt.doneAt-tt.at).sort((tt,et)=>tt-et),W=X.map((tt,et)=>{const ft=lt.filter(Tt=>Tt.ri===et&&!Tt.off),pt=ft.reduce((Tt,xt)=>Tt+xt.span,0),Mt=ft.reduce((Tt,xt)=>Tt+xt.busy,0);return{r:tt,n:ft.length,u:pt>0?Mt/pt:0,q:ft.reduce((Tt,xt)=>Tt+xt.queue.length,0)}});let q=0;for(let tt=0;tt<lt.length;tt++)for(let et=tt+1;et<lt.length;et++)Math.hypot(lt[tt].x-lt[et].x,lt[tt].y-lt[et].y)<dt&&q++;return{thr:T>3?R.length/T*60:0,lead:N.length?N[Math.floor(N.length/2)]:0,wip:vt(),fin:nn,util:W,links:q}}function Jn(){const T=Vi();Qn(),e.tally.innerHTML=`<b>${lt.filter(q=>!q.off).length}</b> active · <b>${lt.filter(q=>q.task).length}</b> working<br>
     <b>${T.links}</b> links · <b>${qt.length}</b> messages in transit · <b>${T.fin}</b> delivered`,e.stats.innerHTML=`
    <div class="m"><u>Throughput</u><b>${T.thr.toFixed(1)}<s>tasks/min</s></b></div>
    <div class="m"><u>Lead time</u><b>${T.lead.toFixed(1)}<s>sec</s></b></div>
    <div class="m"><u>Work in progress</u><b>${T.wip}<s>/${bt}</s></b></div>
    ${T.util.map(q=>`<div class="m"><u>${q.r.cn}</u><b style="color:${q.u>.86?"var(--bad)":q.u>.75?"var(--warn)":"var(--ink)"}">${(q.u*100).toFixed(0)}<s>%</s></b></div>`).join("")}`;const R=T.util.find(q=>q.n===0),N=T.util.reduce((q,tt)=>tt.u>q.u?tt:q),W=T.util.reduce((q,tt)=>tt.q>q.q?tt:q);e.verdict.innerHTML=R?`<b>${R.r.cn}</b> has no agents; work is blocked upstream.`:ee<15?"Warming up: throughput becomes reliable after a full minute of completions.":N.u>.86?`Bottleneck: <b>${N.r.cn}</b> at ${(N.u*100).toFixed(0)}% utilization. Add capacity here first.`:W.q>=3?`<b>${W.r.cn}</b> has ${W.q} queued tasks; this is arrival variability, not yet a sustained capacity gap.`:`No clear bottleneck. <b>${N.r.cn}</b> is busiest at ${(N.u*100).toFixed(0)}%. Raise arrival rate to stress the system.`}const bi=T=>{me=+T},qa=T=>{ze=+T,t.speed(ze)},Ds=(T,R)=>lt.find(N=>Math.hypot(N.x-T,N.y-R)<Qt*.62)||null;let pa=null,Ji=!1;a(fe,"pointermove",T=>{ue.x=T.clientX,ue.y=T.clientY,ue.in=!0}),a(fe,"pointerleave",()=>{ue.in=!1,ue.x=ue.y=-9999}),a(fe,"pointerdown",T=>{const R=Ds(T.clientX,T.clientY);Ji=!1,R&&(pa=setTimeout(()=>{Ji=!0,Qi(R),be()},ae))}),a(window,"pointerup",T=>{clearTimeout(pa),!(Ji||T.target!==fe)&&(ce=Ds(T.clientX,T.clientY),Hn(),be())}),a(window,"keydown",T=>{T.key==="Escape"&&(ce=null,Hn(),be()),T.key===" "&&!T.target.closest("button,input")&&(T.preventDefault(),qa(ze?0:1))});function Ns(){const T=Math.min(devicePixelRatio,2);x=innerWidth,Y=innerHeight;for(const R of[fe,ne])(R.width!==Math.round(x*T)||R.height!==Math.round(Y*T))&&(R.width=Math.round(x*T),R.height=Math.round(Y*T),R===fe?b.setTransform(T,0,0,T,0,0):Ce&&Ce.viewport(0,0,R.width,R.height));return T}const A=matchMedia("(prefers-reduced-motion: reduce)"),Z=iC({getAgents:()=>lt,ROLES:X,STATES:O,LINK_R:dt});let nt=0,Q=1;Ns(),_t(),be();let $=0;(function T(R){$=requestAnimationFrame(T);const N=Ns(),W=Math.min(.05,(R-nt)/1e3);nt=R,K=r(K,ce&&x>1080?300:46,1-Math.exp(-W*5)),ze&&Xt(W*ze);const q=A.matches?0:ee;Ce&&yi(R/1e3,N),Z.step(W*ze||0),Nn(q),Z.draw(b),Un(q),Q+=W,Q>.25&&(Q=0,Jn())})(0);function Lt(T){if(!Array.isArray(T)||T.length===0)return st&&(st=!1,j.clear(),_t(),be()),{live:!1,agents:0};st=!0;const R=new Set,N=[];for(const W of T.slice(0,At)){const q=String(W.id);if(R.has(q))continue;R.add(q);const tt=gt[W.status]||"code",et=Math.max(0,X.findIndex(pt=>pt.id===tt));let ft=j.get(q);ft||(ft=Ct(et),j.set(q,ft)),ft.ri=et,ft.label=W.label||q,ft.state=ut[W.status]||"IDLE",ft.task=null,ft.queue=[],ft.off=!1,N.push(ft)}for(const W of[...j.keys()])R.has(W)||j.delete(W);return lt=N,Bt=[],qt=[],be(),{live:!0,agents:lt.length}}return{setLam:bi,setSpeed:qa,cardAct:Gi,closeCard:ha,mesh:Z,setFleet:Lt,dispose(){n.abort(),cancelAnimationFrame($),clearTimeout(pa)}}}const sC=["info","ok","warn","bad"];function rC({mesh:e}){const t=new Map,n=new Map,i=[];let a=new Map,s=new Map;const r=(C,E)=>(t.get(C)||[]).forEach(_=>_(E));function o(C,E,_){i.unshift({ts:new Date,level:sC.includes(C)?C:"info",text:E,id:_}),i.length>60&&i.pop(),M(),r("note",i[0])}function l({id:C,name:E,n:_}={}){if(!C)throw new Error("PlugBrainMesh.register: {id} is required");const w=e.snapshot();let D=_;if(D==null){const P=w.find(V=>![...a.values()].includes(V.n));D=P?P.n:null}if(D==null)return o("warn",`register ${C}: no free field agent left`),null;a.set(C,D);const L=(w.find(P=>P.n===D)||{}).hue||"#8ab2d1",I={id:C,name:E||C,n:D,hue:L,ts:Date.now()};return n.set(C,I),o("ok",`registered ${I.name} → field agent A${D}`,C),r("register",I),f(w),I}function c(C){if(!n.delete(C))return!1;const E=a.get(C);return a.delete(C),o("info",`unregistered ${C} (A${E} returns to the pool)`,C),r("unregister",{id:C,n:E}),f(),!0}function d(C,E,_="info"){o(_,E,C)}const h=document.createElement("div");h.id="mesh-root",h.innerHTML=`
    <button id="mesh-toggle" type="button" title="Agent registry (m)">◈ mesh</button>
    <div id="mesh-panel" aria-hidden="true">
      <div class="mp-head">
        <h3>Agent Registry</h3><span class="mp-count"></span>
        <button class="mp-x" type="button" title="close">✕</button>
      </div>
      <div class="mp-list"></div>
      <div class="mp-foot">PlugBrainMesh · register() · note() · unregister()</div>
    </div>
    <div id="mesh-feed"></div>`,document.body.appendChild(h);const u=h.querySelector("#mesh-panel"),p=h.querySelector(".mp-list"),g=h.querySelector("#mesh-feed"),y=h.querySelector("#mesh-toggle"),m=C=>{u.setAttribute("aria-hidden",String(!C)),y.classList.toggle("on",C),C&&f()};y.addEventListener("click",()=>m(u.getAttribute("aria-hidden")==="true")),h.querySelector(".mp-x").addEventListener("click",()=>m(!1)),window.addEventListener("keydown",C=>{C.key.toLowerCase()==="m"&&!C.target.closest("input,button")&&m(u.getAttribute("aria-hidden")==="true")});function f(C=e.snapshot()){h.querySelector(".mp-count").textContent=`${C.length} on field · ${n.size} registered`,p.innerHTML=C.map(E=>{const _=[...n.values()].find(L=>L.n===E.n),w=_?_.name:`A${E.n}`,D=Math.round(E.util*100);return`<div class="mp-row" data-n="${E.n}">
        <i class="mp-hue" style="background:${E.hue}"></i>
        <span class="mp-name">${w}${_?` <s>A${E.n}</s>`:""}</span>
        <span class="mp-state ${E.state==="OFFLINE"?"off":""}">${E.stateCn}</span>
        <span class="mp-task">${E.task||""}</span>
        <span class="mp-bar"><i style="width:${D}%;background:${D>86?"var(--bad)":D>75?"var(--warn)":E.hue}"></i></span>
      </div>`}).join("")}const v=C=>C.toTimeString().slice(0,8);function M(){g.innerHTML=i.slice(0,9).map((C,E)=>`<div class="mf-line" style="opacity:${1-E*.1}">
        <s>${v(C.ts)}</s><i class="mf-${C.level}"></i><span>${C.text}</span>
      </div>`).join("")}let S=setInterval(()=>{const C=e.snapshot();for(const E of C){const _=s.get(E.n);if(_&&_!==E.state){const w=[...n.values()].find(I=>I.n===E.n),D=w?w.name:`A${E.n}`,L=E.state==="DBUG"?"warn":E.state==="EXEC"?"ok":"info";o(L,`${D} · ${_} → ${E.state}${E.task?" · "+E.task:""}`,w==null?void 0:w.id)}s.set(E.n,E.state)}u.getAttribute("aria-hidden")==="false"&&f(C)},800);const U={register:l,unregister:c,note:d,list:()=>[...n.values()],feed:()=>[...i],on:(C,E)=>(t.has(C)||t.set(C,new Set),t.get(C).add(E),()=>t.get(C).delete(E)),dispose:()=>{clearInterval(S),h.remove()}};return window.PlugBrainMesh=U,o("ok","agent mesh module online — simulated fleet auto-registered"),U}const oC=[[0,"⏸"],[1,"1×"],[2,"2×"],[4,"4×"]];function lC({tasks:e}){const t=It.useRef(null),n=It.useRef(null),i=It.useRef(null),a=It.useRef(null),s=It.useRef(null),r=It.useRef(null),o=It.useRef(null),[l,c]=It.useState(null),[d,h]=It.useState(20),[u,p]=It.useState(1);return It.useEffect(()=>{const g=aC({els:{glow:t.current,field:n.current,roster:i.current,tally:a.current,stats:s.current,verdict:r.current},emit:{card:c,speed:p}});o.current=g;const y=rC({mesh:g.mesh});return()=>{y.dispose(),g.dispose(),o.current=null}},[]),It.useEffect(()=>{var g;(g=o.current)==null||g.setFleet(e.map(y=>({id:y.id,label:y.assignedAgentId||y.title||y.id,status:y.status})))},[e]),z.jsxs(z.Fragment,{children:[z.jsx("canvas",{id:"glow",ref:t}),z.jsx("canvas",{id:"field",ref:n}),z.jsxs("div",{className:"ov",id:"hud",children:[z.jsxs("h1",{children:[z.jsx("i",{}),"Agent Mesh",z.jsx("em",{children:"Workflow"})]}),z.jsx("div",{className:"tally",id:"tally",ref:a,children:"—"})]}),z.jsx("div",{className:"ov",id:"roster",ref:i}),z.jsx("div",{className:"ov"+(l?" on":""),id:"inspect",children:l&&z.jsxs(z.Fragment,{children:[z.jsxs("h3",{children:[z.jsx("i",{style:{background:l.color}}),"A",l.n," · ",l.cn,z.jsx("button",{className:"x",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.closeCard()},children:"✕"})]}),z.jsxs("div",{className:"kv",children:[z.jsx("span",{children:"Current state"}),z.jsx("b",{id:"i-st",children:l.st}),z.jsx("span",{children:"State visualization"}),z.jsx("b",{id:"i-md",children:l.md}),z.jsx("span",{children:"Task"}),z.jsx("b",{id:"i-tk",children:l.tk}),z.jsx("span",{children:"Queue"}),z.jsx("b",{id:"i-q",children:l.q}),z.jsx("span",{children:"Utilization"}),z.jsx("b",{id:"i-u",children:l.u}),z.jsx("span",{children:"State program"}),z.jsx("b",{children:l.prog})]}),z.jsx("div",{className:"hist",children:l.hist.map((g,y)=>z.jsx("i",{style:{height:g?"100%":"16%",background:g?l.color:"var(--line)"}},y))}),z.jsx("div",{className:"note",children:"The strip shows busy and idle time over the last 28 seconds. Long gaps mean spare capacity; a full strip marks a constraint."}),z.jsxs("div",{className:"act",children:[z.jsx("button",{className:"btn"+(l.off?" on":""),"data-act":"off",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.cardAct("off")},children:l.off?"Bring online":"Take offline"}),z.jsx("button",{className:"btn","data-act":"kick",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.cardAct("kick")},children:"Interrupt and reassign"})]})]})}),z.jsxs("div",{className:"ov",id:"ctl",children:[z.jsxs("div",{className:"fld",children:["Arrival rate ",z.jsxs("b",{id:"lamv",children:[d," /min"]}),z.jsx("input",{type:"range",id:"lam",min:"4",max:"46",step:"1",value:d,onChange:g=>{var y;h(+g.target.value),(y=o.current)==null||y.setLam(+g.target.value)}})]}),z.jsx("div",{className:"seg",id:"spd",children:oC.map(([g,y])=>z.jsx("button",{className:u===g?"on":"","data-s":g,type:"button",onClick:()=>{var m;return(m=o.current)==null?void 0:m.setSpeed(g)},children:y},g))}),z.jsx("span",{className:"sp"}),z.jsx("div",{id:"stats",ref:s}),z.jsx("div",{id:"verdict",ref:r,children:"—"})]}),z.jsx("div",{id:"tip",children:"Move cursor near agents to call them · click to inspect · hold to interrupt and reassign · Space to pause"})]})}const Dy=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Agenten und Zustände aus dem PlugBoard-Ledger"}],cC=Ry,uC=2e4;function fC(){const e=new URLSearchParams(location.search).get("view"),t=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=e||t;return Dy.some(i=>i.id===n)?n:"atlas"}function dC(){var C;const[e,t]=It.useState(null),[n,i]=It.useState([]),[a,s]=It.useState(!0),[r,o]=It.useState(""),[l,c]=It.useState(0),[d,h]=It.useState(fC),[u,p]=It.useState(null),[g,y]=It.useState(null),[m,f]=It.useState(!1);It.useEffect(()=>{try{localStorage.setItem("plugbrain.view",d)}catch{}},[d]);const v=It.useRef(null);It.useEffect(()=>{v.current=g},[g]),It.useEffect(()=>{const E=new URLSearchParams(location.search).get("workspace");fetch("/api/timeline"+(E?"?workspace="+encodeURIComponent(E):"")).then(_=>_.json()).then(_=>{var w;(w=_==null?void 0:_.bounds)!=null&&w.first&&p(_.bounds)}).catch(()=>{})},[]),It.useEffect(()=>{if(!m||!u)return;const E=new Date(u.first).getTime(),_=new Date(u.last).getTime(),w=Math.max(1,_-E);let D=g?Math.round((new Date(g).getTime()-E)/w*60):0;const L=setInterval(()=>{if(D+=1,D>=60){y(null),f(!1);return}y(new Date(E+w*D/60).toISOString())},220);return()=>clearInterval(L)},[m,u]),It.useEffect(()=>{const E=new AbortController;let _,w="",D="";const L=new URLSearchParams(location.search).get("workspace");async function I(){var P,V,k;try{const B=new URLSearchParams;L&&B.set("workspace",L),B.set("limit",String(uC)),v.current&&B.set("until",v.current);const F=await fetch("/api/atlas/snapshot"+(B.toString()?`?${B}`:""),{signal:E.signal});if(!F.ok)throw new Error(`Brain-Verbindung: HTTP ${F.status}`);const O=await F.json();if(!((P=O.workspace)!=null&&P.canonicalPath)||!Array.isArray((V=O.graph)==null?void 0:V.nodes)||!Array.isArray((k=O.graph)==null?void 0:k.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const X=JSON.stringify([O.workspace,O.graph,O.coverage]);X!==w&&(t(O),w=X),o("")}catch(B){E.signal.aborted||o(B instanceof Error?B.message:String(B))}try{const B=await fetch("/api/agents"+(L?"?workspace="+encodeURIComponent(L):""),{signal:E.signal});if(!B.ok)throw new Error(String(B.status));const F=await B.json(),X=(Array.isArray(F==null?void 0:F.agents)?F.agents:[]).map(bt=>({id:bt.id,title:bt.name,assignedAgentId:bt.name,status:bt.filesTouched>0?"RUNNING":bt.actions>0?"REVIEW":"PLANNED"})),ht=JSON.stringify(X);ht!==D&&(i(X),D=ht),s(!0)}catch{E.signal.aborted||s(!1)}E.signal.aborted||(_=setTimeout(I,3e3))}return I(),()=>{E.abort(),clearTimeout(_)}},[l,g]);const M=(e==null?void 0:e.graph.nodes.length)??0,S=(e==null?void 0:e.graph.edges.length)??0,U=r?"getrennt":e?(C=e.coverage)!=null&&C.complete?"live":"Index unvollständig":"lädt …";return z.jsxs(z.Fragment,{children:[z.jsxs("div",{className:"live-status",role:"status",children:[z.jsx("strong",{className:"live-status__name",title:(e==null?void 0:e.workspace.canonicalPath)??"",children:e?cC(e.workspace.name):"PlugBrain"}),z.jsxs("span",{className:"live-status__figures",children:[z.jsx("b",{children:M})," Objekte ",z.jsx("b",{children:S})," Kanten"]}),z.jsx("span",{className:r?"live-status__state is-bad":"live-status__state",children:U}),z.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:Dy.map(E=>z.jsx("button",{type:"button",title:E.hint,className:E.id===d?"on":void 0,"aria-pressed":E.id===d,onClick:()=>h(E.id),children:E.label},E.id))}),r&&z.jsx("button",{type:"button",onClick:()=>c(E=>E+1),children:"Erneut verbinden"})]}),u&&z.jsxs("div",{className:"brain-timelapse",children:[z.jsx("button",{type:"button",onClick:()=>f(E=>!E),title:"Wachstum abspielen",children:m?"❚❚":"▶"}),z.jsx("input",{type:"range",min:0,max:60,step:1,value:g&&u?Math.round((new Date(g).getTime()-new Date(u.first).getTime())/Math.max(1,new Date(u.last).getTime()-new Date(u.first).getTime())*60):60,onChange:E=>{f(!1);const _=Number(E.target.value);if(_>=60){y(null);return}const w=new Date(u.first).getTime(),D=new Date(u.last).getTime();y(new Date(w+(D-w)*_/60).toISOString())}}),z.jsx("span",{children:g?new Date(g).toLocaleTimeString():"jetzt"})]}),d==="atlas"&&(e&&M>0?z.jsx(mC,{graph:e.graph}):z.jsx("div",{className:"brain-empty",children:r||(e?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …")})),d==="city"&&z.jsx("div",{className:"brain-view brain-view-city",children:z.jsx(nC,{snapshot:e})}),d==="mesh"&&z.jsxs("div",{className:"brain-view brain-view-mesh",children:[!a&&z.jsx("div",{className:"brain-note",children:"Agenten-Register nicht erreichbar — es werden keine echten Agenten angezeigt."}),a&&n.length===0&&z.jsx("div",{className:"brain-note",children:"Noch kein Agent hat diesen Workspace angefasst. Die Engine läuft in Eigensimulation — das sind keine echten Agenten."}),z.jsx(lC,{tasks:n})]})]})}const hC=e=>/✗|STALE|REPAIR|Quarantäne|secret|offen/i.test(e);function pC(e,t){if(!t)return e;const n=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return e.split(n).map((i,a)=>a%2?z.jsx("mark",{children:i},a):i)}function mC({graph:e}){const{CLUSTERS:t,nodes:n,edges:i,createAtlas:a}=It.useMemo(()=>V3(e),[e]),s=Object.fromEntries(t.map(O=>[O.id,n.filter(X=>X.cid===O.id).length])),r=It.useRef(null),o=It.useRef(null),l=It.useRef(null),c=It.useRef(null),d=It.useRef(null),h=It.useRef(null),u=It.useRef(null),p=It.useRef(null),g=It.useRef(null),y=It.useRef(null),m=It.useRef(null),f=It.useRef(null),v=It.useRef(null),[M,S]=It.useState(!1),[U,C]=It.useState({q:"",rows:[]}),[E,_]=It.useState(null),[w,D]=It.useState({flow:!0,label:!0,spin:!1}),[L,I]=It.useState("atlas"),[P,V]=It.useState("dark"),[k,B]=It.useState([]);It.useEffect(()=>{const O=a({els:{stage:r.current,labels:o.current,hudMode:l.current,hudSel:c.current,pathbar:d.current,chain:h.current,zlvl:u.current,sNode:p.current,sEdge:g.current,sDeg:y.current,sFps:m.current,q:f.current},emit:{gate:S,list:C,drawer:_,tools:D,theme:V}});return v.current=O,()=>{O.dispose(),v.current=null}},[a]);const F=O=>{var X;B(ht=>ht.includes(O)?ht.filter(bt=>bt!==O):[...ht,O]),(X=v.current)==null||X.toggleCluster(O)};return z.jsxs("div",{id:"app",className:E?"open":"",children:[z.jsxs("aside",{children:[z.jsxs("div",{className:"brand",children:[z.jsxs("h1",{children:[z.jsx("span",{className:"dot"}),"PlugBrain"]}),z.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",z.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),z.jsxs("div",{className:"searchbox",children:[z.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[z.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),z.jsx("path",{d:"M10.5 10.5 14 14"})]}),z.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol, Mission, Pack suchen…",autoComplete:"off",spellCheck:!1,ref:f,onChange:O=>{var X;return(X=v.current)==null?void 0:X.setQuery(O.target.value)}})]}),z.jsx("div",{className:"legend",id:"legend",children:t.map(O=>z.jsxs("button",{className:"cl"+(k.includes(O.id)?" off":""),type:"button",onClick:()=>F(O.id),children:[z.jsx("i",{style:{background:O.color}}),O.name,z.jsx("b",{children:s[O.id]})]},O.id))}),z.jsx("div",{className:"listwrap",id:"list",children:U.rows.length?U.rows.map(O=>z.jsxs("div",{className:"lrow"+(O.on?" on":""),"data-i":O.i,onClick:()=>{var X;return(X=v.current)==null?void 0:X.selectAt(O.i)},onMouseOver:()=>{var X;return(X=v.current)==null?void 0:X.hoverAt(O.i)},onMouseLeave:()=>{var X;return(X=v.current)==null?void 0:X.hoverAt(null)},children:[z.jsx("i",{style:{background:O.color}}),z.jsx("span",{children:pC(O.name,U.q)}),z.jsx("b",{children:O.deg})]},O.i)):z.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),z.jsxs("div",{className:"foot",children:[z.jsxs("div",{children:[z.jsx("div",{className:"k",id:"s-node",ref:p,children:"—"}),z.jsx("div",{className:"l",children:"Objekte"})]}),z.jsxs("div",{children:[z.jsx("div",{className:"k",id:"s-edge",ref:g,children:"—"}),z.jsx("div",{className:"l",children:"Kanten"})]}),z.jsxs("div",{children:[z.jsx("div",{className:"k",id:"s-deg",ref:y,children:"—"}),z.jsx("div",{className:"l",children:"Ø-Grad"})]}),z.jsxs("div",{children:[z.jsx("div",{className:"k",id:"s-fps",ref:m,children:"—"}),z.jsx("div",{className:"l",children:"FPS"})]})]})]}),z.jsxs("div",{id:"stage",ref:r,children:[z.jsx("div",{id:"labels",ref:o}),z.jsxs("div",{id:"hud",children:[z.jsx("div",{children:z.jsx("b",{id:"hud-mode",ref:l,children:"GALAXIE · FREIER ORBIT"})}),z.jsx("div",{id:"hud-sel",ref:c,children:"Nichts ausgewählt"}),z.jsxs("div",{id:"hud-sys",children:[n.length," VON ",e.nodes.length," OBJEKTEN · ",i.length," VON ",e.edges.length," KANTEN"]})]}),z.jsxs("div",{id:"pathbar",ref:d,children:[z.jsx("span",{className:"chain",id:"chain",ref:h}),z.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.clearPath()},children:"✕"})]}),z.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([O,X])=>z.jsx("button",{className:"tb"+(L===O?" on":""),"data-view":O,type:"button",onClick:()=>{var ht;I(O),(ht=v.current)==null||ht.setView(O)},children:X},O)),z.jsx("span",{className:"sep"}),z.jsx("button",{className:"tb"+(w.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.toggleFlow()},children:"Signalfluss"}),z.jsx("button",{className:"tb"+(w.label?" on":""),id:"t-label",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.toggleLabel()},children:"Labels"}),z.jsx("button",{className:"tb"+(w.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.toggleSpin()},children:"Auto-Orbit"}),z.jsx("span",{className:"sep"}),z.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var O;return(O=v.current)==null?void 0:O.dolly(1.18)},children:"−"}),z.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:u,onClick:()=>{var O;return(O=v.current)==null?void 0:O.zoomReset()},children:"100%"}),z.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var O;return(O=v.current)==null?void 0:O.dolly(1/1.18)},children:"＋"}),z.jsx("span",{className:"sep"}),z.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var O;return(O=v.current)==null?void 0:O.toggleTheme()},children:P==="light"?"Nacht":"Tag"}),z.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.reset()},children:"Reset"})]}),z.jsxs("div",{id:"hint",children:["Ziehen rotiert · Scrollen oder ",z.jsx("kbd",{children:"+"}),"/",z.jsx("kbd",{children:"−"})," zoomt · Klick fokussiert ein Objekt",z.jsx("br",{})," ",z.jsx("kbd",{children:"Shift"}),"+Klick auf ein zweites Objekt zeigt die kürzeste Kausalkette · ",z.jsx("kbd",{children:"Esc"})," löst die Auswahl"]}),z.jsxs("div",{id:"gate",style:M?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",z.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]}),z.jsx("div",{id:"drawer",children:z.jsx("div",{className:"dr",id:"dr",children:E&&z.jsxs(z.Fragment,{children:[z.jsxs("div",{className:"dr-head",children:[z.jsxs("div",{className:"kind",children:[z.jsx("i",{style:{background:E.color}}),E.cname," · Grad ",E.deg," · Ebene ",E.depth]}),z.jsx("h2",{children:E.name}),z.jsx("p",{children:E.desc}),z.jsxs("dl",{className:"prov",children:[E.kind&&z.jsxs(z.Fragment,{children:[z.jsx("dt",{children:"Typ"}),z.jsx("dd",{children:E.kind})]}),E.path&&z.jsxs(z.Fragment,{children:[z.jsx("dt",{children:"Pfad"}),z.jsx("dd",{className:"mono",children:E.path})]}),E.status&&z.jsxs(z.Fragment,{children:[z.jsx("dt",{children:"Status"}),z.jsx("dd",{className:hC(E.status)?"bad":"",children:E.status})]}),E.prov&&z.jsxs(z.Fragment,{children:[z.jsx("dt",{children:"Provenienz"}),z.jsx("dd",{children:E.prov})]})]})]}),z.jsx("div",{className:"dr-body",children:E.groups.map(O=>z.jsxs("div",{className:"dr-sec",children:[z.jsxs("h3",{children:[O.title," ",z.jsx("b",{style:{color:"var(--faint)",opacity:.6},children:O.items.length})]}),O.items.map(X=>z.jsxs("div",{className:"nb","data-i":X.i,onClick:()=>{var ht;return(ht=v.current)==null?void 0:ht.selectAt(X.i)},children:[z.jsx("i",{style:{background:X.color}}),z.jsx("span",{children:X.name}),z.jsx("u",{children:O.tag})]},X.i))]},O.tag))}),z.jsxs("div",{className:"dr-act",children:[z.jsx("button",{className:"btn",id:"a-center",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.centerOn(E.i)},children:"Hier zentrieren"}),z.jsx("button",{className:"btn primary",id:"a-path",type:"button",onClick:()=>{var O;return(O=v.current)==null?void 0:O.startPath(E.i)},children:"Kausalkette ab hier"})]})]})})})]})}RE.createRoot(document.getElementById("root")).render(z.jsx(It.StrictMode,{children:z.jsx(dC,{})}));

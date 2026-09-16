(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var Zv={exports:{}},af={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var kS=Symbol.for("react.transitional.element"),XS=Symbol.for("react.fragment");function Kv(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:kS,type:t,key:i,ref:e!==void 0?e:null,props:n}}af.Fragment=XS;af.jsx=Kv;af.jsxs=Kv;Zv.exports=af;var M=Zv.exports,Qv={exports:{}},pt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hp=Symbol.for("react.transitional.element"),WS=Symbol.for("react.portal"),qS=Symbol.for("react.fragment"),jS=Symbol.for("react.strict_mode"),YS=Symbol.for("react.profiler"),ZS=Symbol.for("react.consumer"),KS=Symbol.for("react.context"),QS=Symbol.for("react.forward_ref"),$S=Symbol.for("react.suspense"),JS=Symbol.for("react.memo"),$v=Symbol.for("react.lazy"),eM=Symbol.for("react.activity"),cg=Symbol.iterator;function tM(t){return t===null||typeof t!="object"?null:(t=cg&&t[cg]||t["@@iterator"],typeof t=="function"?t:null)}var Jv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},e_=Object.assign,t_={};function bo(t,e,n){this.props=t,this.context=e,this.refs=t_,this.updater=n||Jv}bo.prototype.isReactComponent={};bo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};bo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function n_(){}n_.prototype=bo.prototype;function Gp(t,e,n){this.props=t,this.context=e,this.refs=t_,this.updater=n||Jv}var Vp=Gp.prototype=new n_;Vp.constructor=Gp;e_(Vp,bo.prototype);Vp.isPureReactComponent=!0;var ug=Array.isArray;function Yd(){}var rn={H:null,A:null,T:null,S:null},i_=Object.prototype.hasOwnProperty;function kp(t,e,n){var i=n.ref;return{$$typeof:Hp,type:t,key:e,ref:i!==void 0?i:null,props:n}}function nM(t,e){return kp(t.type,e,t.props)}function Xp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Hp}function iM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var fg=/\/+/g;function Df(t,e){return typeof t=="object"&&t!==null&&t.key!=null?iM(""+t.key):e.toString(36)}function aM(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Yd,Yd):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Lr(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Hp:case WS:r=!0;break;case $v:return r=t._init,Lr(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+Df(t,0):i,ug(a)?(n="",r!=null&&(n=r.replace(fg,"$&/")+"/"),Lr(a,e,n,"",function(c){return c})):a!=null&&(Xp(a)&&(a=nM(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(fg,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(ug(t))for(var l=0;l<t.length;l++)i=t[l],s=o+Df(i,l),r+=Lr(i,e,n,s,a);else if(l=tM(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+Df(i,l++),r+=Lr(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return Lr(aM(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function ec(t,e,n){if(t==null)return t;var i=[],a=0;return Lr(t,i,"","",function(s){return e.call(n,s,a++)}),i}function sM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var dg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},rM={map:ec,forEach:function(t,e,n){ec(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ec(t,function(){e++}),e},toArray:function(t){return ec(t,function(e){return e})||[]},only:function(t){if(!Xp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};pt.Activity=eM;pt.Children=rM;pt.Component=bo;pt.Fragment=qS;pt.Profiler=YS;pt.PureComponent=Gp;pt.StrictMode=jS;pt.Suspense=$S;pt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=rn;pt.__COMPILER_RUNTIME={__proto__:null,c:function(t){return rn.H.useMemoCache(t)}};pt.cache=function(t){return function(){return t.apply(null,arguments)}};pt.cacheSignal=function(){return null};pt.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=e_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!i_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return kp(t.type,a,i)};pt.createContext=function(t){return t={$$typeof:KS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:ZS,_context:t},t};pt.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)i_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return kp(t,s,a)};pt.createRef=function(){return{current:null}};pt.forwardRef=function(t){return{$$typeof:QS,render:t}};pt.isValidElement=Xp;pt.lazy=function(t){return{$$typeof:$v,_payload:{_status:-1,_result:t},_init:sM}};pt.memo=function(t,e){return{$$typeof:JS,type:t,compare:e===void 0?null:e}};pt.startTransition=function(t){var e=rn.T,n={};rn.T=n;try{var i=t(),a=rn.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Yd,dg)}catch(s){dg(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),rn.T=e}};pt.unstable_useCacheRefresh=function(){return rn.H.useCacheRefresh()};pt.use=function(t){return rn.H.use(t)};pt.useActionState=function(t,e,n){return rn.H.useActionState(t,e,n)};pt.useCallback=function(t,e){return rn.H.useCallback(t,e)};pt.useContext=function(t){return rn.H.useContext(t)};pt.useDebugValue=function(){};pt.useDeferredValue=function(t,e){return rn.H.useDeferredValue(t,e)};pt.useEffect=function(t,e){return rn.H.useEffect(t,e)};pt.useEffectEvent=function(t){return rn.H.useEffectEvent(t)};pt.useId=function(){return rn.H.useId()};pt.useImperativeHandle=function(t,e,n){return rn.H.useImperativeHandle(t,e,n)};pt.useInsertionEffect=function(t,e){return rn.H.useInsertionEffect(t,e)};pt.useLayoutEffect=function(t,e){return rn.H.useLayoutEffect(t,e)};pt.useMemo=function(t,e){return rn.H.useMemo(t,e)};pt.useOptimistic=function(t,e){return rn.H.useOptimistic(t,e)};pt.useReducer=function(t,e,n){return rn.H.useReducer(t,e,n)};pt.useRef=function(t){return rn.H.useRef(t)};pt.useState=function(t){return rn.H.useState(t)};pt.useSyncExternalStore=function(t,e,n){return rn.H.useSyncExternalStore(t,e,n)};pt.useTransition=function(){return rn.H.useTransition()};pt.version="19.2.8";Qv.exports=pt;var xe=Qv.exports,a_={exports:{}},sf={},s_={exports:{}},r_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(F,H){var I=F.length;F.push(H);e:for(;0<I;){var j=I-1>>>1,de=F[j];if(0<a(de,H))F[j]=H,F[I]=de,I=j;else break e}}function n(F){return F.length===0?null:F[0]}function i(F){if(F.length===0)return null;var H=F[0],I=F.pop();if(I!==H){F[0]=I;e:for(var j=0,de=F.length,Te=de>>>1;j<Te;){var Oe=2*(j+1)-1,et=F[Oe],$e=Oe+1,st=F[$e];if(0>a(et,I))$e<de&&0>a(st,et)?(F[j]=st,F[$e]=I,j=$e):(F[j]=et,F[Oe]=I,j=Oe);else if($e<de&&0>a(st,I))F[j]=st,F[$e]=I,j=$e;else break e}}return H}function a(F,H){var I=F.sortIndex-H.sortIndex;return I!==0?I:F.id-H.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],d=1,h=null,u=3,p=!1,g=!1,b=!1,m=!1,f=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,S=typeof setImmediate<"u"?setImmediate:null;function x(F){for(var H=n(c);H!==null;){if(H.callback===null)i(c);else if(H.startTime<=F)i(c),H.sortIndex=H.expirationTime,e(l,H);else break;H=n(c)}}function N(F){if(b=!1,x(F),!g)if(n(l)!==null)g=!0,w||(w=!0,B());else{var H=n(c);H!==null&&k(N,H.startTime-F)}}var w=!1,C=-1,y=5,D=-1;function U(){return m?!0:!(t.unstable_now()-D<y)}function P(){if(m=!1,w){var F=t.unstable_now();D=F;var H=!0;try{e:{g=!1,b&&(b=!1,v(C),C=-1),p=!0;var I=u;try{t:{for(x(F),h=n(l);h!==null&&!(h.expirationTime>F&&U());){var j=h.callback;if(typeof j=="function"){h.callback=null,u=h.priorityLevel;var de=j(h.expirationTime<=F);if(F=t.unstable_now(),typeof de=="function"){h.callback=de,x(F),H=!0;break t}h===n(l)&&i(l),x(F)}else i(l);h=n(l)}if(h!==null)H=!0;else{var Te=n(c);Te!==null&&k(N,Te.startTime-F),H=!1}}break e}finally{h=null,u=I,p=!1}H=void 0}}finally{H?B():w=!1}}}var B;if(typeof S=="function")B=function(){S(P)};else if(typeof MessageChannel<"u"){var z=new MessageChannel,G=z.port2;z.port1.onmessage=P,B=function(){G.postMessage(null)}}else B=function(){f(P,0)};function k(F,H){C=f(function(){F(t.unstable_now())},H)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(F){F.callback=null},t.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<F?Math.floor(1e3/F):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(F){switch(u){case 1:case 2:case 3:var H=3;break;default:H=u}var I=u;u=H;try{return F()}finally{u=I}},t.unstable_requestPaint=function(){m=!0},t.unstable_runWithPriority=function(F,H){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var I=u;u=F;try{return H()}finally{u=I}},t.unstable_scheduleCallback=function(F,H,I){var j=t.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?j+I:j):I=j,F){case 1:var de=-1;break;case 2:de=250;break;case 5:de=1073741823;break;case 4:de=1e4;break;default:de=5e3}return de=I+de,F={id:d++,callback:H,priorityLevel:F,startTime:I,expirationTime:de,sortIndex:-1},I>j?(F.sortIndex=I,e(c,F),n(l)===null&&F===n(c)&&(b?(v(C),C=-1):b=!0,k(N,I-j))):(F.sortIndex=de,e(l,F),g||p||(g=!0,w||(w=!0,B()))),F},t.unstable_shouldYield=U,t.unstable_wrapCallback=function(F){var H=u;return function(){var I=u;u=H;try{return F.apply(this,arguments)}finally{u=I}}}})(r_);s_.exports=r_;var oM=s_.exports,o_={exports:{}},Kn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var lM=xe;function l_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ja(){}var jn={d:{f:ja,r:function(){throw Error(l_(522))},D:ja,C:ja,L:ja,m:ja,X:ja,S:ja,M:ja},p:0,findDOMNode:null},cM=Symbol.for("react.portal");function uM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:cM,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var rl=lM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function rf(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Kn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=jn;Kn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(l_(299));return uM(t,e,null,n)};Kn.flushSync=function(t){var e=rl.T,n=jn.p;try{if(rl.T=null,jn.p=2,t)return t()}finally{rl.T=e,jn.p=n,jn.d.f()}};Kn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,jn.d.C(t,e))};Kn.prefetchDNS=function(t){typeof t=="string"&&jn.d.D(t)};Kn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=rf(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?jn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&jn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Kn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=rf(e.as,e.crossOrigin);jn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&jn.d.M(t)};Kn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=rf(n,e.crossOrigin);jn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Kn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=rf(e.as,e.crossOrigin);jn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else jn.d.m(t)};Kn.requestFormReset=function(t){jn.d.r(t)};Kn.unstable_batchedUpdates=function(t,e){return t(e)};Kn.useFormState=function(t,e,n){return rl.H.useFormState(t,e,n)};Kn.useFormStatus=function(){return rl.H.useHostTransitionStatus()};Kn.version="19.2.8";function c_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c_)}catch(t){console.error(t)}}c_(),o_.exports=Kn;var fM=o_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sn=oM,u_=xe,dM=fM;function _e(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function f_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Fl(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function d_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function h_(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function hg(t){if(Fl(t)!==t)throw Error(_e(188))}function hM(t){var e=t.alternate;if(!e){if(e=Fl(t),e===null)throw Error(_e(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return hg(a),t;if(s===i)return hg(a),e;s=s.sibling}throw Error(_e(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(_e(189))}}if(n.alternate!==i)throw Error(_e(190))}if(n.tag!==3)throw Error(_e(188));return n.stateNode.current===n?t:e}function p_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=p_(t),e!==null)return e;t=t.sibling}return null}var on=Object.assign,pM=Symbol.for("react.element"),tc=Symbol.for("react.transitional.element"),$o=Symbol.for("react.portal"),zr=Symbol.for("react.fragment"),m_=Symbol.for("react.strict_mode"),Zd=Symbol.for("react.profiler"),g_=Symbol.for("react.consumer"),Ca=Symbol.for("react.context"),Wp=Symbol.for("react.forward_ref"),Kd=Symbol.for("react.suspense"),Qd=Symbol.for("react.suspense_list"),qp=Symbol.for("react.memo"),es=Symbol.for("react.lazy"),$d=Symbol.for("react.activity"),mM=Symbol.for("react.memo_cache_sentinel"),pg=Symbol.iterator;function Oo(t){return t===null||typeof t!="object"?null:(t=pg&&t[pg]||t["@@iterator"],typeof t=="function"?t:null)}var gM=Symbol.for("react.client.reference");function Jd(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===gM?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case zr:return"Fragment";case Zd:return"Profiler";case m_:return"StrictMode";case Kd:return"Suspense";case Qd:return"SuspenseList";case $d:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case $o:return"Portal";case Ca:return t.displayName||"Context";case g_:return(t._context.displayName||"Context")+".Consumer";case Wp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case qp:return e=t.displayName||null,e!==null?e:Jd(t.type)||"Memo";case es:e=t._payload,t=t._init;try{return Jd(t(e))}catch{}}return null}var Jo=Array.isArray,lt=u_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ht=dM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,qs={pending:!1,data:null,method:null,action:null},eh=[],Ir=-1;function fa(t){return{current:t}}function Cn(t){0>Ir||(t.current=eh[Ir],eh[Ir]=null,Ir--)}function tn(t,e){Ir++,eh[Ir]=t.current,t.current=e}var oa=fa(null),Sl=fa(null),ps=fa(null),xu=fa(null);function yu(t,e){switch(tn(ps,e),tn(Sl,t),tn(oa,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?y0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=y0(e),t=zy(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Cn(oa),tn(oa,t)}function ro(){Cn(oa),Cn(Sl),Cn(ps)}function th(t){t.memoizedState!==null&&tn(xu,t);var e=oa.current,n=zy(e,t.type);e!==n&&(tn(Sl,t),tn(oa,n))}function Su(t){Sl.current===t&&(Cn(oa),Cn(Sl)),xu.current===t&&(Cn(xu),Ul._currentValue=qs)}var Nf,mg;function Is(t){if(Nf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Nf=e&&e[1]||"",mg=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Nf+t+mg}var Uf=!1;function Lf(t,e){if(!t||Uf)return"";Uf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var u=p}Reflect.construct(t,[],h)}else{try{h.call()}catch(p){u=p}t.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}(h=t())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=i&&0<=a);break}}}finally{Uf=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Is(n):""}function vM(t,e){switch(t.tag){case 26:case 27:case 5:return Is(t.type);case 16:return Is("Lazy");case 13:return t.child!==e&&e!==null?Is("Suspense Fallback"):Is("Suspense");case 19:return Is("SuspenseList");case 0:case 15:return Lf(t.type,!1);case 11:return Lf(t.type.render,!1);case 1:return Lf(t.type,!0);case 31:return Is("Activity");default:return""}}function gg(t){try{var e="",n=null;do e+=vM(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var nh=Object.prototype.hasOwnProperty,jp=Sn.unstable_scheduleCallback,Of=Sn.unstable_cancelCallback,_M=Sn.unstable_shouldYield,xM=Sn.unstable_requestPaint,mi=Sn.unstable_now,yM=Sn.unstable_getCurrentPriorityLevel,v_=Sn.unstable_ImmediatePriority,__=Sn.unstable_UserBlockingPriority,Mu=Sn.unstable_NormalPriority,SM=Sn.unstable_LowPriority,x_=Sn.unstable_IdlePriority,MM=Sn.log,bM=Sn.unstable_setDisableYieldValue,Hl=null,gi=null;function os(t){if(typeof MM=="function"&&bM(t),gi&&typeof gi.setStrictMode=="function")try{gi.setStrictMode(Hl,t)}catch{}}var vi=Math.clz32?Math.clz32:AM,EM=Math.log,TM=Math.LN2;function AM(t){return t>>>=0,t===0?32:31-(EM(t)/TM|0)|0}var nc=256,ic=262144,ac=4194304;function Bs(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function of(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Bs(i):(r&=o,r!==0?a=Bs(r):n||(n=o&~t,n!==0&&(a=Bs(n))))):(o=i&~s,o!==0?a=Bs(o):r!==0?a=Bs(r):n||(n=i&~t,n!==0&&(a=Bs(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function Gl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function RM(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function y_(){var t=ac;return ac<<=1,!(ac&62914560)&&(ac=4194304),t}function Pf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Vl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function wM(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-vi(n),h=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var p=u[d];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&S_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function S_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-vi(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function M_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-vi(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function b_(t,e){var n=e&-e;return n=n&42?1:Yp(n),n&(t.suspendedLanes|e)?0:n}function Yp(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Zp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function E_(){var t=Ht.p;return t!==0?t:(t=window.event,t===void 0?32:jy(t.type))}function vg(t,e){var n=Ht.p;try{return Ht.p=t,e()}finally{Ht.p=n}}var ws=Math.random().toString(36).slice(2),On="__reactFiber$"+ws,ri="__reactProps$"+ws,Eo="__reactContainer$"+ws,ih="__reactEvents$"+ws,CM="__reactListeners$"+ws,DM="__reactHandles$"+ws,_g="__reactResources$"+ws,kl="__reactMarker$"+ws;function Kp(t){delete t[On],delete t[ri],delete t[ih],delete t[CM],delete t[DM]}function Br(t){var e=t[On];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Eo]||n[On]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=T0(t);t!==null;){if(n=t[On])return n;t=T0(t)}return e}t=n,n=t.parentNode}return null}function To(t){if(t=t[On]||t[Eo]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function el(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(_e(33))}function Qr(t){var e=t[_g];return e||(e=t[_g]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function Rn(t){t[kl]=!0}var T_=new Set,A_={};function or(t,e){oo(t,e),oo(t+"Capture",e)}function oo(t,e){for(A_[t]=e,t=0;t<e.length;t++)T_.add(e[t])}var NM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),xg={},yg={};function UM(t){return nh.call(yg,t)?!0:nh.call(xg,t)?!1:NM.test(t)?yg[t]=!0:(xg[t]=!0,!1)}function Zc(t,e,n){if(UM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function sc(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function ma(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function Ri(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function R_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function LM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ah(t){if(!t._valueTracker){var e=R_(t)?"checked":"value";t._valueTracker=LM(t,e,""+t[e])}}function w_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=R_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function bu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var OM=/[\n"\\]/g;function Ni(t){return t.replace(OM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function sh(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+Ri(e)):t.value!==""+Ri(e)&&(t.value=""+Ri(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?rh(t,r,Ri(e)):n!=null?rh(t,r,Ri(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+Ri(o):t.removeAttribute("name")}function C_(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){ah(t);return}n=n!=null?""+Ri(n):"",e=e!=null?""+Ri(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),ah(t)}function rh(t,e,n){e==="number"&&bu(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function $r(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+Ri(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function D_(t,e,n){if(e!=null&&(e=""+Ri(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+Ri(n):""}function N_(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(_e(92));if(Jo(i)){if(1<i.length)throw Error(_e(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=Ri(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),ah(t)}function lo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var PM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Sg(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||PM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function U_(t,e,n){if(e!=null&&typeof e!="object")throw Error(_e(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&Sg(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&Sg(t,s,e[s])}function Qp(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var zM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),IM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Kc(t){return IM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Da(){}var oh=null;function $p(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Fr=null,Jr=null;function Mg(t){var e=To(t);if(e&&(t=e.stateNode)){var n=t[ri]||null;e:switch(t=e.stateNode,e.type){case"input":if(sh(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ni(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[ri]||null;if(!a)throw Error(_e(90));sh(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&w_(i)}break e;case"textarea":D_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&$r(t,!!n.multiple,e,!1)}}}var zf=!1;function L_(t,e,n){if(zf)return t(e,n);zf=!0;try{var i=t(e);return i}finally{if(zf=!1,(Fr!==null||Jr!==null)&&(xf(),Fr&&(e=Fr,t=Jr,Jr=Fr=null,Mg(e),t)))for(e=0;e<t.length;e++)Mg(t[e])}}function Ml(t,e){var n=t.stateNode;if(n===null)return null;var i=n[ri]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(_e(231,e,typeof n));return n}var Ba=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),lh=!1;if(Ba)try{var Po={};Object.defineProperty(Po,"passive",{get:function(){lh=!0}}),window.addEventListener("test",Po,Po),window.removeEventListener("test",Po,Po)}catch{lh=!1}var ls=null,Jp=null,Qc=null;function O_(){if(Qc)return Qc;var t,e=Jp,n=e.length,i,a="value"in ls?ls.value:ls.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Qc=a.slice(t,1<i?1-i:void 0)}function $c(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function rc(){return!0}function bg(){return!1}function oi(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?rc:bg,this.isPropagationStopped=bg,this}return on(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=rc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=rc)},persist:function(){},isPersistent:rc}),e}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lf=oi(lr),Xl=on({},lr,{view:0,detail:0}),BM=oi(Xl),If,Bf,zo,cf=on({},Xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:em,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==zo&&(zo&&t.type==="mousemove"?(If=t.screenX-zo.screenX,Bf=t.screenY-zo.screenY):Bf=If=0,zo=t),If)},movementY:function(t){return"movementY"in t?t.movementY:Bf}}),Eg=oi(cf),FM=on({},cf,{dataTransfer:0}),HM=oi(FM),GM=on({},Xl,{relatedTarget:0}),Ff=oi(GM),VM=on({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),kM=oi(VM),XM=on({},lr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),WM=oi(XM),qM=on({},lr,{data:0}),Tg=oi(qM),jM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},YM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ZM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function KM(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ZM[t])?!!e[t]:!1}function em(){return KM}var QM=on({},Xl,{key:function(t){if(t.key){var e=jM[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=$c(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?YM[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:em,charCode:function(t){return t.type==="keypress"?$c(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?$c(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),$M=oi(QM),JM=on({},cf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Ag=oi(JM),eb=on({},Xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:em}),tb=oi(eb),nb=on({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),ib=oi(nb),ab=on({},cf,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),sb=oi(ab),rb=on({},lr,{newState:0,oldState:0}),ob=oi(rb),lb=[9,13,27,32],tm=Ba&&"CompositionEvent"in window,ol=null;Ba&&"documentMode"in document&&(ol=document.documentMode);var cb=Ba&&"TextEvent"in window&&!ol,P_=Ba&&(!tm||ol&&8<ol&&11>=ol),Rg=" ",wg=!1;function z_(t,e){switch(t){case"keyup":return lb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function I_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Hr=!1;function ub(t,e){switch(t){case"compositionend":return I_(e);case"keypress":return e.which!==32?null:(wg=!0,Rg);case"textInput":return t=e.data,t===Rg&&wg?null:t;default:return null}}function fb(t,e){if(Hr)return t==="compositionend"||!tm&&z_(t,e)?(t=O_(),Qc=Jp=ls=null,Hr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return P_&&e.locale!=="ko"?null:e.data;default:return null}}var db={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Cg(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!db[t.type]:e==="textarea"}function B_(t,e,n,i){Fr?Jr?Jr.push(i):Jr=[i]:Fr=i,e=Gu(e,"onChange"),0<e.length&&(n=new lf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ll=null,bl=null;function hb(t){Ly(t,0)}function uf(t){var e=el(t);if(w_(e))return t}function Dg(t,e){if(t==="change")return e}var F_=!1;if(Ba){var Hf;if(Ba){var Gf="oninput"in document;if(!Gf){var Ng=document.createElement("div");Ng.setAttribute("oninput","return;"),Gf=typeof Ng.oninput=="function"}Hf=Gf}else Hf=!1;F_=Hf&&(!document.documentMode||9<document.documentMode)}function Ug(){ll&&(ll.detachEvent("onpropertychange",H_),bl=ll=null)}function H_(t){if(t.propertyName==="value"&&uf(bl)){var e=[];B_(e,bl,t,$p(t)),L_(hb,e)}}function pb(t,e,n){t==="focusin"?(Ug(),ll=e,bl=n,ll.attachEvent("onpropertychange",H_)):t==="focusout"&&Ug()}function mb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uf(bl)}function gb(t,e){if(t==="click")return uf(e)}function vb(t,e){if(t==="input"||t==="change")return uf(e)}function _b(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var xi=typeof Object.is=="function"?Object.is:_b;function El(t,e){if(xi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!nh.call(e,a)||!xi(t[a],e[a]))return!1}return!0}function Lg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Og(t,e){var n=Lg(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Lg(n)}}function G_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?G_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function V_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=bu(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=bu(t.document)}return e}function nm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var xb=Ba&&"documentMode"in document&&11>=document.documentMode,Gr=null,ch=null,cl=null,uh=!1;function Pg(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;uh||Gr==null||Gr!==bu(i)||(i=Gr,"selectionStart"in i&&nm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),cl&&El(cl,i)||(cl=i,i=Gu(ch,"onSelect"),0<i.length&&(e=new lf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Gr)))}function Us(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Vr={animationend:Us("Animation","AnimationEnd"),animationiteration:Us("Animation","AnimationIteration"),animationstart:Us("Animation","AnimationStart"),transitionrun:Us("Transition","TransitionRun"),transitionstart:Us("Transition","TransitionStart"),transitioncancel:Us("Transition","TransitionCancel"),transitionend:Us("Transition","TransitionEnd")},Vf={},k_={};Ba&&(k_=document.createElement("div").style,"AnimationEvent"in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),"TransitionEvent"in window||delete Vr.transitionend.transition);function cr(t){if(Vf[t])return Vf[t];if(!Vr[t])return t;var e=Vr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in k_)return Vf[t]=e[n];return t}var X_=cr("animationend"),W_=cr("animationiteration"),q_=cr("animationstart"),yb=cr("transitionrun"),Sb=cr("transitionstart"),Mb=cr("transitioncancel"),j_=cr("transitionend"),Y_=new Map,fh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");fh.push("scrollEnd");function Ki(t,e){Y_.set(t,e),or(e,[t])}var Eu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ti=[],kr=0,im=0;function ff(){for(var t=kr,e=im=kr=0;e<t;){var n=Ti[e];Ti[e++]=null;var i=Ti[e];Ti[e++]=null;var a=Ti[e];Ti[e++]=null;var s=Ti[e];if(Ti[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&Z_(n,a,s)}}function df(t,e,n,i){Ti[kr++]=t,Ti[kr++]=e,Ti[kr++]=n,Ti[kr++]=i,im|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function am(t,e,n,i){return df(t,e,n,i),Tu(t)}function ur(t,e){return df(t,null,null,e),Tu(t)}function Z_(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-vi(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function Tu(t){if(50<_l)throw _l=0,Uh=null,Error(_e(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Xr={};function bb(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(t,e,n,i){return new bb(t,e,n,i)}function sm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function La(t,e){var n=t.alternate;return n===null?(n=hi(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function K_(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Jc(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")sm(t)&&(r=1);else if(typeof t=="string")r=wE(t,n,oa.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case $d:return t=hi(31,n,e,a),t.elementType=$d,t.lanes=s,t;case zr:return js(n.children,a,s,e);case m_:r=8,a|=24;break;case Zd:return t=hi(12,n,e,a|2),t.elementType=Zd,t.lanes=s,t;case Kd:return t=hi(13,n,e,a),t.elementType=Kd,t.lanes=s,t;case Qd:return t=hi(19,n,e,a),t.elementType=Qd,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ca:r=10;break e;case g_:r=9;break e;case Wp:r=11;break e;case qp:r=14;break e;case es:r=16,i=null;break e}r=29,n=Error(_e(130,t===null?"null":typeof t,"")),i=null}return e=hi(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function js(t,e,n,i){return t=hi(7,t,i,e),t.lanes=n,t}function kf(t,e,n){return t=hi(6,t,null,e),t.lanes=n,t}function Q_(t){var e=hi(18,null,null,0);return e.stateNode=t,e}function Xf(t,e,n){return e=hi(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var zg=new WeakMap;function Ui(t,e){if(typeof t=="object"&&t!==null){var n=zg.get(t);return n!==void 0?n:(e={value:t,source:e,stack:gg(e)},zg.set(t,e),e)}return{value:t,source:e,stack:gg(e)}}var Wr=[],qr=0,Au=null,Tl=0,wi=[],Ci=0,bs=null,ia=1,aa="";function Aa(t,e){Wr[qr++]=Tl,Wr[qr++]=Au,Au=t,Tl=e}function $_(t,e,n){wi[Ci++]=ia,wi[Ci++]=aa,wi[Ci++]=bs,bs=t;var i=ia;t=aa;var a=32-vi(i)-1;i&=~(1<<a),n+=1;var s=32-vi(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,ia=1<<32-vi(e)+a|n<<a|i,aa=s+t}else ia=1<<s|n<<a|i,aa=t}function rm(t){t.return!==null&&(Aa(t,1),$_(t,1,0))}function om(t){for(;t===Au;)Au=Wr[--qr],Wr[qr]=null,Tl=Wr[--qr],Wr[qr]=null;for(;t===bs;)bs=wi[--Ci],wi[Ci]=null,aa=wi[--Ci],wi[Ci]=null,ia=wi[--Ci],wi[Ci]=null}function J_(t,e){wi[Ci++]=ia,wi[Ci++]=aa,wi[Ci++]=bs,ia=e.id,aa=e.overflow,bs=t}var Pn=null,sn=null,Lt=!1,ms=null,Li=!1,dh=Error(_e(519));function Es(t){var e=Error(_e(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Al(Ui(e,t)),dh}function Ig(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[On]=t,e[ri]=i,n){case"dialog":Tt("cancel",e),Tt("close",e);break;case"iframe":case"object":case"embed":Tt("load",e);break;case"video":case"audio":for(n=0;n<Dl.length;n++)Tt(Dl[n],e);break;case"source":Tt("error",e);break;case"img":case"image":case"link":Tt("error",e),Tt("load",e);break;case"details":Tt("toggle",e);break;case"input":Tt("invalid",e),C_(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Tt("invalid",e);break;case"textarea":Tt("invalid",e),N_(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||Py(e.textContent,n)?(i.popover!=null&&(Tt("beforetoggle",e),Tt("toggle",e)),i.onScroll!=null&&Tt("scroll",e),i.onScrollEnd!=null&&Tt("scrollend",e),i.onClick!=null&&(e.onclick=Da),e=!0):e=!1,e||Es(t,!0)}function Bg(t){for(Pn=t.return;Pn;)switch(Pn.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Pn=Pn.return}}function gr(t){if(t!==Pn)return!1;if(!Lt)return Bg(t),Lt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Ih(t.type,t.memoizedProps)),n=!n),n&&sn&&Es(t),Bg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(_e(317));sn=E0(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(_e(317));sn=E0(t)}else e===27?(e=sn,Cs(t.type)?(t=Gh,Gh=null,sn=t):sn=e):sn=Pn?Ii(t.stateNode.nextSibling):null;return!0}function $s(){sn=Pn=null,Lt=!1}function Wf(){var t=ms;return t!==null&&(ii===null?ii=t:ii.push.apply(ii,t),ms=null),t}function Al(t){ms===null?ms=[t]:ms.push(t)}var hh=fa(null),fr=null,Na=null;function ns(t,e,n){tn(hh,e._currentValue),e._currentValue=n}function Oa(t){t._currentValue=hh.current,Cn(hh)}function ph(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function mh(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ph(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(_e(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),ph(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ao(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(_e(387));if(r=r.memoizedProps,r!==null){var o=a.type;xi(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===xu.current){if(r=a.alternate,r===null)throw Error(_e(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Ul):t=[Ul])}a=a.return}t!==null&&mh(e,t,n,i),e.flags|=262144}function Ru(t){for(t=t.firstContext;t!==null;){if(!xi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Js(t){fr=t,Na=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function zn(t){return ex(fr,t)}function oc(t,e){return fr===null&&Js(t),ex(t,e)}function ex(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Na===null){if(t===null)throw Error(_e(308));Na=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Na=Na.next=e;return n}var Eb=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Tb=Sn.unstable_scheduleCallback,Ab=Sn.unstable_NormalPriority,_n={$$typeof:Ca,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function lm(){return{controller:new Eb,data:new Map,refCount:0}}function Wl(t){t.refCount--,t.refCount===0&&Tb(Ab,function(){t.controller.abort()})}var ul=null,gh=0,co=0,eo=null;function Rb(t,e){if(ul===null){var n=ul=[];gh=0,co=Lm(),eo={status:"pending",value:void 0,then:function(i){n.push(i)}}}return gh++,e.then(Fg,Fg),e}function Fg(){if(--gh===0&&ul!==null){eo!==null&&(eo.status="fulfilled");var t=ul;ul=null,co=0,eo=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function wb(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Hg=lt.S;lt.S=function(t,e){py=mi(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Rb(t,e),Hg!==null&&Hg(t,e)};var Ys=fa(null);function cm(){var t=Ys.current;return t!==null?t:Jt.pooledCache}function eu(t,e){e===null?tn(Ys,Ys.current):tn(Ys,e.pool)}function tx(){var t=cm();return t===null?null:{parent:_n._currentValue,pool:t}}var Ro=Error(_e(460)),um=Error(_e(474)),hf=Error(_e(542)),wu={then:function(){}};function Gg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function nx(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Da,Da),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,kg(t),t;default:if(typeof e.status=="string")e.then(Da,Da);else{if(t=Jt,t!==null&&100<t.shellSuspendCounter)throw Error(_e(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,kg(t),t}throw Zs=e,Ro}}function Fs(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Zs=n,Ro):n}}var Zs=null;function Vg(){if(Zs===null)throw Error(_e(459));var t=Zs;return Zs=null,t}function kg(t){if(t===Ro||t===hf)throw Error(_e(483))}var to=null,Rl=0;function lc(t){var e=Rl;return Rl+=1,to===null&&(to=[]),nx(to,t,e)}function Io(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function cc(t,e){throw e.$$typeof===pM?Error(_e(525)):(t=Object.prototype.toString.call(e),Error(_e(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function ix(t){function e(f,v){if(t){var S=f.deletions;S===null?(f.deletions=[v],f.flags|=16):S.push(v)}}function n(f,v){if(!t)return null;for(;v!==null;)e(f,v),v=v.sibling;return null}function i(f){for(var v=new Map;f!==null;)f.key!==null?v.set(f.key,f):v.set(f.index,f),f=f.sibling;return v}function a(f,v){return f=La(f,v),f.index=0,f.sibling=null,f}function s(f,v,S){return f.index=S,t?(S=f.alternate,S!==null?(S=S.index,S<v?(f.flags|=67108866,v):S):(f.flags|=67108866,v)):(f.flags|=1048576,v)}function r(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function o(f,v,S,x){return v===null||v.tag!==6?(v=kf(S,f.mode,x),v.return=f,v):(v=a(v,S),v.return=f,v)}function l(f,v,S,x){var N=S.type;return N===zr?d(f,v,S.props.children,x,S.key):v!==null&&(v.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===es&&Fs(N)===v.type)?(v=a(v,S.props),Io(v,S),v.return=f,v):(v=Jc(S.type,S.key,S.props,null,f.mode,x),Io(v,S),v.return=f,v)}function c(f,v,S,x){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=Xf(S,f.mode,x),v.return=f,v):(v=a(v,S.children||[]),v.return=f,v)}function d(f,v,S,x,N){return v===null||v.tag!==7?(v=js(S,f.mode,x,N),v.return=f,v):(v=a(v,S),v.return=f,v)}function h(f,v,S){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=kf(""+v,f.mode,S),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case tc:return S=Jc(v.type,v.key,v.props,null,f.mode,S),Io(S,v),S.return=f,S;case $o:return v=Xf(v,f.mode,S),v.return=f,v;case es:return v=Fs(v),h(f,v,S)}if(Jo(v)||Oo(v))return v=js(v,f.mode,S,null),v.return=f,v;if(typeof v.then=="function")return h(f,lc(v),S);if(v.$$typeof===Ca)return h(f,oc(f,v),S);cc(f,v)}return null}function u(f,v,S,x){var N=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return N!==null?null:o(f,v,""+S,x);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case tc:return S.key===N?l(f,v,S,x):null;case $o:return S.key===N?c(f,v,S,x):null;case es:return S=Fs(S),u(f,v,S,x)}if(Jo(S)||Oo(S))return N!==null?null:d(f,v,S,x,null);if(typeof S.then=="function")return u(f,v,lc(S),x);if(S.$$typeof===Ca)return u(f,v,oc(f,S),x);cc(f,S)}return null}function p(f,v,S,x,N){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return f=f.get(S)||null,o(v,f,""+x,N);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case tc:return f=f.get(x.key===null?S:x.key)||null,l(v,f,x,N);case $o:return f=f.get(x.key===null?S:x.key)||null,c(v,f,x,N);case es:return x=Fs(x),p(f,v,S,x,N)}if(Jo(x)||Oo(x))return f=f.get(S)||null,d(v,f,x,N,null);if(typeof x.then=="function")return p(f,v,S,lc(x),N);if(x.$$typeof===Ca)return p(f,v,S,oc(v,x),N);cc(v,x)}return null}function g(f,v,S,x){for(var N=null,w=null,C=v,y=v=0,D=null;C!==null&&y<S.length;y++){C.index>y?(D=C,C=null):D=C.sibling;var U=u(f,C,S[y],x);if(U===null){C===null&&(C=D);break}t&&C&&U.alternate===null&&e(f,C),v=s(U,v,y),w===null?N=U:w.sibling=U,w=U,C=D}if(y===S.length)return n(f,C),Lt&&Aa(f,y),N;if(C===null){for(;y<S.length;y++)C=h(f,S[y],x),C!==null&&(v=s(C,v,y),w===null?N=C:w.sibling=C,w=C);return Lt&&Aa(f,y),N}for(C=i(C);y<S.length;y++)D=p(C,f,y,S[y],x),D!==null&&(t&&D.alternate!==null&&C.delete(D.key===null?y:D.key),v=s(D,v,y),w===null?N=D:w.sibling=D,w=D);return t&&C.forEach(function(P){return e(f,P)}),Lt&&Aa(f,y),N}function b(f,v,S,x){if(S==null)throw Error(_e(151));for(var N=null,w=null,C=v,y=v=0,D=null,U=S.next();C!==null&&!U.done;y++,U=S.next()){C.index>y?(D=C,C=null):D=C.sibling;var P=u(f,C,U.value,x);if(P===null){C===null&&(C=D);break}t&&C&&P.alternate===null&&e(f,C),v=s(P,v,y),w===null?N=P:w.sibling=P,w=P,C=D}if(U.done)return n(f,C),Lt&&Aa(f,y),N;if(C===null){for(;!U.done;y++,U=S.next())U=h(f,U.value,x),U!==null&&(v=s(U,v,y),w===null?N=U:w.sibling=U,w=U);return Lt&&Aa(f,y),N}for(C=i(C);!U.done;y++,U=S.next())U=p(C,f,y,U.value,x),U!==null&&(t&&U.alternate!==null&&C.delete(U.key===null?y:U.key),v=s(U,v,y),w===null?N=U:w.sibling=U,w=U);return t&&C.forEach(function(B){return e(f,B)}),Lt&&Aa(f,y),N}function m(f,v,S,x){if(typeof S=="object"&&S!==null&&S.type===zr&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case tc:e:{for(var N=S.key;v!==null;){if(v.key===N){if(N=S.type,N===zr){if(v.tag===7){n(f,v.sibling),x=a(v,S.props.children),x.return=f,f=x;break e}}else if(v.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===es&&Fs(N)===v.type){n(f,v.sibling),x=a(v,S.props),Io(x,S),x.return=f,f=x;break e}n(f,v);break}else e(f,v);v=v.sibling}S.type===zr?(x=js(S.props.children,f.mode,x,S.key),x.return=f,f=x):(x=Jc(S.type,S.key,S.props,null,f.mode,x),Io(x,S),x.return=f,f=x)}return r(f);case $o:e:{for(N=S.key;v!==null;){if(v.key===N)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){n(f,v.sibling),x=a(v,S.children||[]),x.return=f,f=x;break e}else{n(f,v);break}else e(f,v);v=v.sibling}x=Xf(S,f.mode,x),x.return=f,f=x}return r(f);case es:return S=Fs(S),m(f,v,S,x)}if(Jo(S))return g(f,v,S,x);if(Oo(S)){if(N=Oo(S),typeof N!="function")throw Error(_e(150));return S=N.call(S),b(f,v,S,x)}if(typeof S.then=="function")return m(f,v,lc(S),x);if(S.$$typeof===Ca)return m(f,v,oc(f,S),x);cc(f,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,v!==null&&v.tag===6?(n(f,v.sibling),x=a(v,S),x.return=f,f=x):(n(f,v),x=kf(S,f.mode,x),x.return=f,f=x),r(f)):n(f,v)}return function(f,v,S,x){try{Rl=0;var N=m(f,v,S,x);return to=null,N}catch(C){if(C===Ro||C===hf)throw C;var w=hi(29,C,null,f.mode);return w.lanes=x,w.return=f,w}finally{}}}var er=ix(!0),ax=ix(!1),ts=!1;function fm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function vh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function gs(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function vs(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ft&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=Tu(t),Z_(t,null,n),e}return df(t,i,e,n),Tu(t)}function fl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,M_(t,n)}}function qf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var _h=!1;function dl(){if(_h){var t=eo;if(t!==null)throw t}}function hl(t,e,n,i){_h=!1;var a=t.updateQueue;ts=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=a.baseState;r=0,d=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(Ct&u)===u:(i&u)===u){u!==0&&u===co&&(_h=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,b=o;u=e;var m=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){h=g.call(m,h,u);break e}h=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(m,h,u):g,u==null)break e;h=on({},h,u);break e;case 2:ts=!0}}u=o.callback,u!==null&&(t.flags|=64,p&&(t.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);d===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,s===null&&(a.shared.lanes=0),As|=r,t.lanes=r,t.memoizedState=h}}function sx(t,e){if(typeof t!="function")throw Error(_e(191,t));t.call(e)}function rx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)sx(n[t],e)}var uo=fa(null),Cu=fa(0);function Xg(t,e){t=Va,tn(Cu,t),tn(uo,e),Va=t|e.baseLanes}function xh(){tn(Cu,Va),tn(uo,uo.current)}function dm(){Va=Cu.current,Cn(uo),Cn(Cu)}var yi=fa(null),zi=null;function is(t){var e=t.alternate;tn(dn,dn.current&1),tn(yi,t),zi===null&&(e===null||uo.current!==null||e.memoizedState!==null)&&(zi=t)}function yh(t){tn(dn,dn.current),tn(yi,t),zi===null&&(zi=t)}function ox(t){t.tag===22?(tn(dn,dn.current),tn(yi,t),zi===null&&(zi=t)):as()}function as(){tn(dn,dn.current),tn(yi,yi.current)}function di(t){Cn(yi),zi===t&&(zi=null),Cn(dn)}var dn=fa(0);function Du(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Fh(n)||Hh(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Fa=0,mt=null,$t=null,gn=null,Nu=!1,no=!1,tr=!1,Uu=0,wl=0,io=null,Cb=0;function cn(){throw Error(_e(321))}function hm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!xi(t[n],e[n]))return!1;return!0}function pm(t,e,n,i,a,s){return Fa=s,mt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,lt.H=t===null||t.memoizedState===null?Bx:Tm,tr=!1,s=n(i,a),tr=!1,no&&(s=cx(e,n,i,a)),lx(t),s}function lx(t){lt.H=Cl;var e=$t!==null&&$t.next!==null;if(Fa=0,gn=$t=mt=null,Nu=!1,wl=0,io=null,e)throw Error(_e(300));t===null||xn||(t=t.dependencies,t!==null&&Ru(t)&&(xn=!0))}function cx(t,e,n,i){mt=t;var a=0;do{if(no&&(io=null),wl=0,no=!1,25<=a)throw Error(_e(301));if(a+=1,gn=$t=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}lt.H=Fx,s=e(n,i)}while(no);return s}function Db(){var t=lt.H,e=t.useState()[0];return e=typeof e.then=="function"?ql(e):e,t=t.useState()[0],($t!==null?$t.memoizedState:null)!==t&&(mt.flags|=1024),e}function mm(){var t=Uu!==0;return Uu=0,t}function gm(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function vm(t){if(Nu){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Nu=!1}Fa=0,gn=$t=mt=null,no=!1,wl=Uu=0,io=null}function qn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?mt.memoizedState=gn=t:gn=gn.next=t,gn}function pn(){if($t===null){var t=mt.alternate;t=t!==null?t.memoizedState:null}else t=$t.next;var e=gn===null?mt.memoizedState:gn.next;if(e!==null)gn=e,$t=t;else{if(t===null)throw mt.alternate===null?Error(_e(467)):Error(_e(310));$t=t,t={memoizedState:$t.memoizedState,baseState:$t.baseState,baseQueue:$t.baseQueue,queue:$t.queue,next:null},gn===null?mt.memoizedState=gn=t:gn=gn.next=t}return gn}function pf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ql(t){var e=wl;return wl+=1,io===null&&(io=[]),t=nx(io,t,e),e=mt,(gn===null?e.memoizedState:gn.next)===null&&(e=e.alternate,lt.H=e===null||e.memoizedState===null?Bx:Tm),t}function mf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return ql(t);if(t.$$typeof===Ca)return zn(t)}throw Error(_e(438,String(t)))}function _m(t){var e=null,n=mt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=mt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=pf(),mt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=mM;return e.index++,n}function Ha(t,e){return typeof e=="function"?e(t):e}function tu(t){var e=pn();return xm(e,$t,t)}function xm(t,e,n){var i=t.queue;if(i===null)throw Error(_e(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,d=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(Ct&h)===h:(Fa&h)===h){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===co&&(d=!0);else if((Fa&u)===u){c=c.next,u===co&&(d=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=s):l=l.next=h,mt.lanes|=u,As|=u;h=c.action,tr&&n(s,h),s=c.hasEagerState?c.eagerState:n(s,h)}else u={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,mt.lanes|=h,As|=h;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!xi(s,t.memoizedState)&&(xn=!0,d&&(n=eo,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function jf(t){var e=pn(),n=e.queue;if(n===null)throw Error(_e(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);xi(s,e.memoizedState)||(xn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function ux(t,e,n){var i=mt,a=pn(),s=Lt;if(s){if(n===void 0)throw Error(_e(407));n=n()}else n=e();var r=!xi(($t||a).memoizedState,n);if(r&&(a.memoizedState=n,xn=!0),a=a.queue,ym(hx.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||gn!==null&&gn.memoizedState.tag&1){if(i.flags|=2048,fo(9,{destroy:void 0},dx.bind(null,i,a,n,e),null),Jt===null)throw Error(_e(349));s||Fa&127||fx(i,e,n)}return n}function fx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=mt.updateQueue,e===null?(e=pf(),mt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function dx(t,e,n,i){e.value=n,e.getSnapshot=i,px(e)&&mx(t)}function hx(t,e,n){return n(function(){px(e)&&mx(t)})}function px(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!xi(t,n)}catch{return!0}}function mx(t){var e=ur(t,2);e!==null&&ai(e,t,2)}function Sh(t){var e=qn();if(typeof t=="function"){var n=t;if(t=n(),tr){os(!0);try{n()}finally{os(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:t},e}function gx(t,e,n,i){return t.baseState=n,xm(t,$t,typeof i=="function"?i:Ha)}function Nb(t,e,n,i,a){if(vf(t))throw Error(_e(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};lt.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,vx(e,s)):(s.next=n.next,e.pending=n.next=s)}}function vx(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=lt.T,r={};lt.T=r;try{var o=n(a,i),l=lt.S;l!==null&&l(r,o),Wg(t,e,o)}catch(c){Mh(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),lt.T=s}}else try{s=n(a,i),Wg(t,e,s)}catch(c){Mh(t,e,c)}}function Wg(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){qg(t,e,i)},function(i){return Mh(t,e,i)}):qg(t,e,n)}function qg(t,e,n){e.status="fulfilled",e.value=n,_x(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,vx(t,n)))}function Mh(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,_x(e),e=e.next;while(e!==i)}t.action=null}function _x(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function xx(t,e){return e}function jg(t,e){if(Lt){var n=Jt.formState;if(n!==null){e:{var i=mt;if(Lt){if(sn){t:{for(var a=sn,s=Li;a.nodeType!==8;){if(!s){a=null;break t}if(a=Ii(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){sn=Ii(a.nextSibling),i=a.data==="F!";break e}}Es(i)}i=!1}i&&(e=n[0])}}return n=qn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:xx,lastRenderedState:e},n.queue=i,n=Px.bind(null,mt,i),i.dispatch=n,i=Sh(!1),s=Em.bind(null,mt,!1,i.queue),i=qn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=Nb.bind(null,mt,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Yg(t){var e=pn();return yx(e,$t,t)}function yx(t,e,n){if(e=xm(t,e,xx)[0],t=tu(Ha)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=ql(e)}catch(r){throw r===Ro?hf:r}else i=e;e=pn();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&(mt.flags|=2048,fo(9,{destroy:void 0},Ub.bind(null,a,n),null)),[i,s,t]}function Ub(t,e){t.action=e}function Zg(t){var e=pn(),n=$t;if(n!==null)return yx(e,n,t);pn(),e=e.memoizedState,n=pn();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function fo(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=mt.updateQueue,e===null&&(e=pf(),mt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function Sx(){return pn().memoizedState}function nu(t,e,n,i){var a=qn();mt.flags|=t,a.memoizedState=fo(1|e,{destroy:void 0},n,i===void 0?null:i)}function gf(t,e,n,i){var a=pn();i=i===void 0?null:i;var s=a.memoizedState.inst;$t!==null&&i!==null&&hm(i,$t.memoizedState.deps)?a.memoizedState=fo(e,s,n,i):(mt.flags|=t,a.memoizedState=fo(1|e,s,n,i))}function Kg(t,e){nu(8390656,8,t,e)}function ym(t,e){gf(2048,8,t,e)}function Lb(t){mt.flags|=4;var e=mt.updateQueue;if(e===null)e=pf(),mt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Mx(t){var e=pn().memoizedState;return Lb({ref:e,nextImpl:t}),function(){if(Ft&2)throw Error(_e(440));return e.impl.apply(void 0,arguments)}}function bx(t,e){return gf(4,2,t,e)}function Ex(t,e){return gf(4,4,t,e)}function Tx(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Ax(t,e,n){n=n!=null?n.concat([t]):null,gf(4,4,Tx.bind(null,e,t),n)}function Sm(){}function Rx(t,e){var n=pn();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&hm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function wx(t,e){var n=pn();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&hm(e,i[1]))return i[0];if(i=t(),tr){os(!0);try{t()}finally{os(!1)}}return n.memoizedState=[i,e],i}function Mm(t,e,n){return n===void 0||Fa&1073741824&&!(Ct&261930)?t.memoizedState=e:(t.memoizedState=n,t=gy(),mt.lanes|=t,As|=t,n)}function Cx(t,e,n,i){return xi(n,e)?n:uo.current!==null?(t=Mm(t,n,i),xi(t,e)||(xn=!0),t):!(Fa&42)||Fa&1073741824&&!(Ct&261930)?(xn=!0,t.memoizedState=n):(t=gy(),mt.lanes|=t,As|=t,e)}function Dx(t,e,n,i,a){var s=Ht.p;Ht.p=s!==0&&8>s?s:8;var r=lt.T,o={};lt.T=o,Em(t,!1,e,n);try{var l=a(),c=lt.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=wb(l,i);pl(t,e,d,_i(t))}else pl(t,e,i,_i(t))}catch(h){pl(t,e,{then:function(){},status:"rejected",reason:h},_i())}finally{Ht.p=s,r!==null&&o.types!==null&&(r.types=o.types),lt.T=r}}function Ob(){}function bh(t,e,n,i){if(t.tag!==5)throw Error(_e(476));var a=Nx(t).queue;Dx(t,a,e,qs,n===null?Ob:function(){return Ux(t),n(i)})}function Nx(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:qs,baseState:qs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:qs},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Ux(t){var e=Nx(t);e.next===null&&(e=t.alternate.memoizedState),pl(t,e.next.queue,{},_i())}function bm(){return zn(Ul)}function Lx(){return pn().memoizedState}function Ox(){return pn().memoizedState}function Pb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=_i();t=gs(n);var i=vs(e,t,n);i!==null&&(ai(i,e,n),fl(i,e,n)),e={cache:lm()},t.payload=e;return}e=e.return}}function zb(t,e,n){var i=_i();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},vf(t)?zx(e,n):(n=am(t,e,n,i),n!==null&&(ai(n,t,i),Ix(n,e,i)))}function Px(t,e,n){var i=_i();pl(t,e,n,i)}function pl(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(vf(t))zx(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,xi(o,r))return df(t,e,a,0),Jt===null&&ff(),!1}catch{}finally{}if(n=am(t,e,a,i),n!==null)return ai(n,t,i),Ix(n,e,i),!0}return!1}function Em(t,e,n,i){if(i={lane:2,revertLane:Lm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},vf(t)){if(e)throw Error(_e(479))}else e=am(t,n,i,2),e!==null&&ai(e,t,2)}function vf(t){var e=t.alternate;return t===mt||e!==null&&e===mt}function zx(t,e){no=Nu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Ix(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,M_(t,n)}}var Cl={readContext:zn,use:mf,useCallback:cn,useContext:cn,useEffect:cn,useImperativeHandle:cn,useLayoutEffect:cn,useInsertionEffect:cn,useMemo:cn,useReducer:cn,useRef:cn,useState:cn,useDebugValue:cn,useDeferredValue:cn,useTransition:cn,useSyncExternalStore:cn,useId:cn,useHostTransitionStatus:cn,useFormState:cn,useActionState:cn,useOptimistic:cn,useMemoCache:cn,useCacheRefresh:cn};Cl.useEffectEvent=cn;var Bx={readContext:zn,use:mf,useCallback:function(t,e){return qn().memoizedState=[t,e===void 0?null:e],t},useContext:zn,useEffect:Kg,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,nu(4194308,4,Tx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return nu(4194308,4,t,e)},useInsertionEffect:function(t,e){nu(4,2,t,e)},useMemo:function(t,e){var n=qn();e=e===void 0?null:e;var i=t();if(tr){os(!0);try{t()}finally{os(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=qn();if(n!==void 0){var a=n(e);if(tr){os(!0);try{n(e)}finally{os(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=zb.bind(null,mt,t),[i.memoizedState,t]},useRef:function(t){var e=qn();return t={current:t},e.memoizedState=t},useState:function(t){t=Sh(t);var e=t.queue,n=Px.bind(null,mt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Sm,useDeferredValue:function(t,e){var n=qn();return Mm(n,t,e)},useTransition:function(){var t=Sh(!1);return t=Dx.bind(null,mt,t.queue,!0,!1),qn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=mt,a=qn();if(Lt){if(n===void 0)throw Error(_e(407));n=n()}else{if(n=e(),Jt===null)throw Error(_e(349));Ct&127||fx(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Kg(hx.bind(null,i,s,t),[t]),i.flags|=2048,fo(9,{destroy:void 0},dx.bind(null,i,s,n,e),null),n},useId:function(){var t=qn(),e=Jt.identifierPrefix;if(Lt){var n=aa,i=ia;n=(i&~(1<<32-vi(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Uu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Cb++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:bm,useFormState:jg,useActionState:jg,useOptimistic:function(t){var e=qn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Em.bind(null,mt,!0,n),n.dispatch=e,[t,e]},useMemoCache:_m,useCacheRefresh:function(){return qn().memoizedState=Pb.bind(null,mt)},useEffectEvent:function(t){var e=qn(),n={impl:t};return e.memoizedState=n,function(){if(Ft&2)throw Error(_e(440));return n.impl.apply(void 0,arguments)}}},Tm={readContext:zn,use:mf,useCallback:Rx,useContext:zn,useEffect:ym,useImperativeHandle:Ax,useInsertionEffect:bx,useLayoutEffect:Ex,useMemo:wx,useReducer:tu,useRef:Sx,useState:function(){return tu(Ha)},useDebugValue:Sm,useDeferredValue:function(t,e){var n=pn();return Cx(n,$t.memoizedState,t,e)},useTransition:function(){var t=tu(Ha)[0],e=pn().memoizedState;return[typeof t=="boolean"?t:ql(t),e]},useSyncExternalStore:ux,useId:Lx,useHostTransitionStatus:bm,useFormState:Yg,useActionState:Yg,useOptimistic:function(t,e){var n=pn();return gx(n,$t,t,e)},useMemoCache:_m,useCacheRefresh:Ox};Tm.useEffectEvent=Mx;var Fx={readContext:zn,use:mf,useCallback:Rx,useContext:zn,useEffect:ym,useImperativeHandle:Ax,useInsertionEffect:bx,useLayoutEffect:Ex,useMemo:wx,useReducer:jf,useRef:Sx,useState:function(){return jf(Ha)},useDebugValue:Sm,useDeferredValue:function(t,e){var n=pn();return $t===null?Mm(n,t,e):Cx(n,$t.memoizedState,t,e)},useTransition:function(){var t=jf(Ha)[0],e=pn().memoizedState;return[typeof t=="boolean"?t:ql(t),e]},useSyncExternalStore:ux,useId:Lx,useHostTransitionStatus:bm,useFormState:Zg,useActionState:Zg,useOptimistic:function(t,e){var n=pn();return $t!==null?gx(n,$t,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:_m,useCacheRefresh:Ox};Fx.useEffectEvent=Mx;function Yf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:on({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Eh={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=_i(),a=gs(i);a.payload=e,n!=null&&(a.callback=n),e=vs(t,a,i),e!==null&&(ai(e,t,i),fl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=_i(),a=gs(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=vs(t,a,i),e!==null&&(ai(e,t,i),fl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=_i(),i=gs(n);i.tag=2,e!=null&&(i.callback=e),e=vs(t,i,n),e!==null&&(ai(e,t,n),fl(e,t,n))}};function Qg(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!El(n,i)||!El(a,s):!0}function $g(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Eh.enqueueReplaceState(e,e.state,null)}function nr(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=on({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function Hx(t){Eu(t)}function Gx(t){console.error(t)}function Vx(t){Eu(t)}function Lu(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function Jg(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Th(t,e,n){return n=gs(n),n.tag=3,n.payload={element:null},n.callback=function(){Lu(t,e)},n}function kx(t){return t=gs(t),t.tag=3,t}function Xx(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){Jg(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){Jg(e,n,i),typeof a!="function"&&(_s===null?_s=new Set([this]):_s.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Ib(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&Ao(e,n,a,!0),n=yi.current,n!==null){switch(n.tag){case 31:case 13:return zi===null?Bu():n.alternate===null&&un===0&&(un=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===wu?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),sd(t,i,a)),!1;case 22:return n.flags|=65536,i===wu?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),sd(t,i,a)),!1}throw Error(_e(435,n.tag))}return sd(t,i,a),Bu(),!1}if(Lt)return e=yi.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==dh&&(t=Error(_e(422),{cause:i}),Al(Ui(t,n)))):(i!==dh&&(e=Error(_e(423),{cause:i}),Al(Ui(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=Ui(i,n),a=Th(t.stateNode,i,a),qf(t,a),un!==4&&(un=2)),!1;var s=Error(_e(520),{cause:i});if(s=Ui(s,n),vl===null?vl=[s]:vl.push(s),un!==4&&(un=2),e===null)return!0;i=Ui(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Th(n.stateNode,i,t),qf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(_s===null||!_s.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=kx(a),Xx(a,t,n,i),qf(n,a),!1}n=n.return}while(n!==null);return!1}var Am=Error(_e(461)),xn=!1;function Ln(t,e,n,i){e.child=t===null?ax(e,null,n,i):er(e,t.child,n,i)}function e0(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Js(e),i=pm(t,e,n,r,s,a),o=mm(),t!==null&&!xn?(gm(t,e,a),Ga(t,e,a)):(Lt&&o&&rm(e),e.flags|=1,Ln(t,e,i,a),e.child)}function t0(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!sm(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,Wx(t,e,s,i,a)):(t=Jc(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Rm(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:El,n(r,i)&&t.ref===e.ref)return Ga(t,e,a)}return e.flags|=1,t=La(s,i),t.ref=e.ref,t.return=e,e.child=t}function Wx(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(El(s,i)&&t.ref===e.ref)if(xn=!1,e.pendingProps=i=s,Rm(t,a))t.flags&131072&&(xn=!0);else return e.lanes=t.lanes,Ga(t,e,a)}return Ah(t,e,n,i,a)}function qx(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return n0(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&eu(e,s!==null?s.cachePool:null),s!==null?Xg(e,s):xh(),ox(e);else return i=e.lanes=536870912,n0(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(eu(e,s.cachePool),Xg(e,s),as(),e.memoizedState=null):(t!==null&&eu(e,null),xh(),as());return Ln(t,e,a,n),e.child}function tl(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function n0(t,e,n,i,a){var s=cm();return s=s===null?null:{parent:_n._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&eu(e,null),xh(),ox(e),t!==null&&Ao(t,e,i,!0),e.childLanes=a,null}function iu(t,e){return e=Ou({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function i0(t,e,n){return er(e,t.child,null,n),t=iu(e,e.pendingProps),t.flags|=2,di(e),e.memoizedState=null,t}function Bb(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(Lt){if(i.mode==="hidden")return t=iu(e,i),e.lanes=536870912,tl(null,t);if(yh(e),(t=sn)?(t=By(t,Li),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=Q_(t),n.return=e,e.child=n,Pn=e,sn=null)):t=null,t===null)throw Es(e);return e.lanes=536870912,null}return iu(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(yh(e),a)if(e.flags&256)e.flags&=-257,e=i0(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(_e(558));else if(xn||Ao(t,e,n,!1),a=(n&t.childLanes)!==0,xn||a){if(i=Jt,i!==null&&(r=b_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,ur(t,r),ai(i,t,r),Am;Bu(),e=i0(t,e,n)}else t=s.treeContext,sn=Ii(r.nextSibling),Pn=e,Lt=!0,ms=null,Li=!1,t!==null&&J_(e,t),e=iu(e,i),e.flags|=4096;return e}return t=La(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function au(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(_e(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ah(t,e,n,i,a){return Js(e),n=pm(t,e,n,i,void 0,a),i=mm(),t!==null&&!xn?(gm(t,e,a),Ga(t,e,a)):(Lt&&i&&rm(e),e.flags|=1,Ln(t,e,n,a),e.child)}function a0(t,e,n,i,a,s){return Js(e),e.updateQueue=null,n=cx(e,i,n,a),lx(t),i=mm(),t!==null&&!xn?(gm(t,e,s),Ga(t,e,s)):(Lt&&i&&rm(e),e.flags|=1,Ln(t,e,n,s),e.child)}function s0(t,e,n,i,a){if(Js(e),e.stateNode===null){var s=Xr,r=n.contextType;typeof r=="object"&&r!==null&&(s=zn(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Eh,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},fm(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?zn(r):Xr,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Yf(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&Eh.enqueueReplaceState(s,s.state,null),hl(e,i,s,a),dl(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=nr(n,o);s.props=l;var c=s.context,d=n.contextType;r=Xr,typeof d=="object"&&d!==null&&(r=zn(d));var h=n.getDerivedStateFromProps;d=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&$g(e,s,i,r),ts=!1;var u=e.memoizedState;s.state=u,hl(e,i,s,a),dl(),c=e.memoizedState,o||u!==c||ts?(typeof h=="function"&&(Yf(e,n,h,i),c=e.memoizedState),(l=ts||Qg(e,n,l,i,u,c,r))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,vh(t,e),r=e.memoizedProps,d=nr(n,r),s.props=d,h=e.pendingProps,u=s.context,c=n.contextType,l=Xr,typeof c=="object"&&c!==null&&(l=zn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==h||u!==l)&&$g(e,s,i,l),ts=!1,u=e.memoizedState,s.state=u,hl(e,i,s,a),dl();var p=e.memoizedState;r!==h||u!==p||ts||t!==null&&t.dependencies!==null&&Ru(t.dependencies)?(typeof o=="function"&&(Yf(e,n,o,i),p=e.memoizedState),(d=ts||Qg(e,n,d,i,u,p,l)||t!==null&&t.dependencies!==null&&Ru(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=p),s.props=i,s.state=p,s.context=l,i=d):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,au(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=er(e,t.child,null,a),e.child=er(e,null,n,a)):Ln(t,e,n,a),e.memoizedState=s.state,t=e.child):t=Ga(t,e,a),t}function r0(t,e,n,i){return $s(),e.flags|=256,Ln(t,e,n,i),e.child}var Zf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Kf(t){return{baseLanes:t,cachePool:tx()}}function Qf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pi),t}function jx(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:(dn.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(Lt){if(a?is(e):as(),(t=sn)?(t=By(t,Li),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=Q_(t),n.return=e,e.child=n,Pn=e,sn=null)):t=null,t===null)throw Es(e);return Hh(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(as(),a=e.mode,o=Ou({mode:"hidden",children:o},a),i=js(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=Kf(n),i.childLanes=Qf(t,r,n),e.memoizedState=Zf,tl(null,i)):(is(e),Rh(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?(is(e),e.flags&=-257,e=$f(t,e,n)):e.memoizedState!==null?(as(),e.child=t.child,e.flags|=128,e=null):(as(),o=i.fallback,a=e.mode,i=Ou({mode:"visible",children:i.children},a),o=js(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,er(e,t.child,null,n),i=e.child,i.memoizedState=Kf(n),i.childLanes=Qf(t,r,n),e.memoizedState=Zf,e=tl(null,i));else if(is(e),Hh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(_e(419)),i.stack="",i.digest=r,Al({value:i,source:null,stack:null}),e=$f(t,e,n)}else if(xn||Ao(t,e,n,!1),r=(n&t.childLanes)!==0,xn||r){if(r=Jt,r!==null&&(i=b_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,ur(t,i),ai(r,t,i),Am;Fh(o)||Bu(),e=$f(t,e,n)}else Fh(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,sn=Ii(o.nextSibling),Pn=e,Lt=!0,ms=null,Li=!1,t!==null&&J_(e,t),e=Rh(e,i.children),e.flags|=4096);return e}return a?(as(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=La(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=La(c,o):(o=js(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,tl(null,i),i=e.child,o=t.child.memoizedState,o===null?o=Kf(n):(a=o.cachePool,a!==null?(l=_n._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=tx(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Qf(t,r,n),e.memoizedState=Zf,tl(t.child,i)):(is(e),n=t.child,t=n.sibling,n=La(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function Rh(t,e){return e=Ou({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ou(t,e){return t=hi(22,t,null,e),t.lanes=0,t}function $f(t,e,n){return er(e,t.child,null,n),t=Rh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function o0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),ph(t.return,e,n)}function Jf(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function Yx(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=dn.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,tn(dn,r),Ln(t,e,i,n),i=Lt?Tl:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&o0(t,n,e);else if(t.tag===19)o0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Du(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Jf(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Du(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Jf(e,!0,n,null,s,i);break;case"together":Jf(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Ga(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),As|=e.lanes,!(n&e.childLanes))if(t!==null){if(Ao(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(_e(153));if(e.child!==null){for(t=e.child,n=La(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=La(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Rm(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Ru(t)))}function Fb(t,e,n){switch(e.tag){case 3:yu(e,e.stateNode.containerInfo),ns(e,_n,t.memoizedState.cache),$s();break;case 27:case 5:th(e);break;case 4:yu(e,e.stateNode.containerInfo);break;case 10:ns(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,yh(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(is(e),e.flags|=128,null):n&e.child.childLanes?jx(t,e,n):(is(e),t=Ga(t,e,n),t!==null?t.sibling:null);is(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(Ao(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return Yx(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),tn(dn,dn.current),i)break;return null;case 22:return e.lanes=0,qx(t,e,n,e.pendingProps);case 24:ns(e,_n,t.memoizedState.cache)}return Ga(t,e,n)}function Zx(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)xn=!0;else{if(!Rm(t,n)&&!(e.flags&128))return xn=!1,Fb(t,e,n);xn=!!(t.flags&131072)}else xn=!1,Lt&&e.flags&1048576&&$_(e,Tl,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Fs(e.elementType),e.type=t,typeof t=="function")sm(t)?(i=nr(t,i),e.tag=1,e=s0(null,e,t,i,n)):(e.tag=0,e=Ah(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Wp){e.tag=11,e=e0(null,e,t,i,n);break e}else if(a===qp){e.tag=14,e=t0(null,e,t,i,n);break e}}throw e=Jd(t)||t,Error(_e(306,e,""))}}return e;case 0:return Ah(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=nr(i,e.pendingProps),s0(t,e,i,a,n);case 3:e:{if(yu(e,e.stateNode.containerInfo),t===null)throw Error(_e(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,vh(t,e),hl(e,i,null,n);var r=e.memoizedState;if(i=r.cache,ns(e,_n,i),i!==s.cache&&mh(e,[_n],n,!0),dl(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=r0(t,e,i,n);break e}else if(i!==a){a=Ui(Error(_e(424)),e),Al(a),e=r0(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(sn=Ii(t.firstChild),Pn=e,Lt=!0,ms=null,Li=!0,n=ax(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if($s(),i===a){e=Ga(t,e,n);break e}Ln(t,e,i,n)}e=e.child}return e;case 26:return au(t,e),t===null?(n=R0(e.type,null,e.pendingProps,null))?e.memoizedState=n:Lt||(n=e.type,t=e.pendingProps,i=Vu(ps.current).createElement(n),i[On]=e,i[ri]=t,Fn(i,n,t),Rn(i),e.stateNode=i):e.memoizedState=R0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return th(e),t===null&&Lt&&(i=e.stateNode=Fy(e.type,e.pendingProps,ps.current),Pn=e,Li=!0,a=sn,Cs(e.type)?(Gh=a,sn=Ii(i.firstChild)):sn=a),Ln(t,e,e.pendingProps.children,n),au(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&Lt&&((a=i=sn)&&(i=mE(i,e.type,e.pendingProps,Li),i!==null?(e.stateNode=i,Pn=e,sn=Ii(i.firstChild),Li=!1,a=!0):a=!1),a||Es(e)),th(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,Ih(a,s)?i=null:r!==null&&Ih(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=pm(t,e,Db,null,null,n),Ul._currentValue=a),au(t,e),Ln(t,e,i,n),e.child;case 6:return t===null&&Lt&&((t=n=sn)&&(n=gE(n,e.pendingProps,Li),n!==null?(e.stateNode=n,Pn=e,sn=null,t=!0):t=!1),t||Es(e)),null;case 13:return jx(t,e,n);case 4:return yu(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=er(e,null,i,n):Ln(t,e,i,n),e.child;case 11:return e0(t,e,e.type,e.pendingProps,n);case 7:return Ln(t,e,e.pendingProps,n),e.child;case 8:return Ln(t,e,e.pendingProps.children,n),e.child;case 12:return Ln(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,ns(e,e.type,i.value),Ln(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,Js(e),a=zn(a),i=i(a),e.flags|=1,Ln(t,e,i,n),e.child;case 14:return t0(t,e,e.type,e.pendingProps,n);case 15:return Wx(t,e,e.type,e.pendingProps,n);case 19:return Yx(t,e,n);case 31:return Bb(t,e,n);case 22:return qx(t,e,n,e.pendingProps);case 24:return Js(e),i=zn(_n),t===null?(a=cm(),a===null&&(a=Jt,s=lm(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},fm(e),ns(e,_n,a)):(t.lanes&n&&(vh(t,e),hl(e,null,null,n),dl()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),ns(e,_n,i)):(i=s.cache,ns(e,_n,i),i!==a.cache&&mh(e,[_n],n,!0))),Ln(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(_e(156,e.tag))}function ga(t){t.flags|=4}function ed(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(xy())t.flags|=8192;else throw Zs=wu,um}else t.flags&=-16777217}function l0(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!Vy(e))if(xy())t.flags|=8192;else throw Zs=wu,um}function uc(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?y_():536870912,t.lanes|=e,ho|=e)}function Bo(t,e){if(!Lt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function an(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Hb(t,e,n){var i=e.pendingProps;switch(om(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(e),null;case 1:return an(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Oa(_n),ro(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(gr(e)?ga(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Wf())),an(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(ga(e),s!==null?(an(e),l0(e,s)):(an(e),ed(e,a,null,i,n))):s?s!==t.memoizedState?(ga(e),an(e),l0(e,s)):(an(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&ga(e),an(e),ed(e,a,t,i,n)),null;case 27:if(Su(e),n=ps.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ga(e);else{if(!i){if(e.stateNode===null)throw Error(_e(166));return an(e),null}t=oa.current,gr(e)?Ig(e):(t=Fy(a,i,n),e.stateNode=t,ga(e))}return an(e),null;case 5:if(Su(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ga(e);else{if(!i){if(e.stateNode===null)throw Error(_e(166));return an(e),null}if(s=oa.current,gr(e))Ig(e);else{var r=Vu(ps.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[On]=e,s[ri]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(Fn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&ga(e)}}return an(e),ed(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&ga(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(_e(166));if(t=ps.current,gr(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=Pn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[On]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||Py(t.nodeValue,n)),t||Es(e,!0)}else t=Vu(t).createTextNode(i),t[On]=e,e.stateNode=t}return an(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=gr(e),n!==null){if(t===null){if(!i)throw Error(_e(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(_e(557));t[On]=e}else $s(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;an(e),t=!1}else n=Wf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(di(e),e):(di(e),null);if(e.flags&128)throw Error(_e(558))}return an(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=gr(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(_e(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(_e(317));a[On]=e}else $s(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;an(e),a=!1}else a=Wf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(di(e),e):(di(e),null)}return di(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),uc(e,e.updateQueue),an(e),null);case 4:return ro(),t===null&&Om(e.stateNode.containerInfo),an(e),null;case 10:return Oa(e.type),an(e),null;case 19:if(Cn(dn),i=e.memoizedState,i===null)return an(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)Bo(i,!1);else{if(un!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Du(t),s!==null){for(e.flags|=128,Bo(i,!1),t=s.updateQueue,e.updateQueue=t,uc(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)K_(n,t),n=n.sibling;return tn(dn,dn.current&1|2),Lt&&Aa(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&mi()>zu&&(e.flags|=128,a=!0,Bo(i,!1),e.lanes=4194304)}else{if(!a)if(t=Du(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,uc(e,t),Bo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Lt)return an(e),null}else 2*mi()-i.renderingStartTime>zu&&n!==536870912&&(e.flags|=128,a=!0,Bo(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=mi(),t.sibling=null,n=dn.current,tn(dn,a?n&1|2:n&1),Lt&&Aa(e,i.treeForkCount),t):(an(e),null);case 22:case 23:return di(e),dm(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(an(e),e.subtreeFlags&6&&(e.flags|=8192)):an(e),n=e.updateQueue,n!==null&&uc(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&Cn(Ys),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Oa(_n),an(e),null;case 25:return null;case 30:return null}throw Error(_e(156,e.tag))}function Gb(t,e){switch(om(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Oa(_n),ro(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Su(e),null;case 31:if(e.memoizedState!==null){if(di(e),e.alternate===null)throw Error(_e(340));$s()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(di(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(_e(340));$s()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Cn(dn),null;case 4:return ro(),null;case 10:return Oa(e.type),null;case 22:case 23:return di(e),dm(),t!==null&&Cn(Ys),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Oa(_n),null;case 25:return null;default:return null}}function Kx(t,e){switch(om(e),e.tag){case 3:Oa(_n),ro();break;case 26:case 27:case 5:Su(e);break;case 4:ro();break;case 31:e.memoizedState!==null&&di(e);break;case 13:di(e);break;case 19:Cn(dn);break;case 10:Oa(e.type);break;case 22:case 23:di(e),dm(),t!==null&&Cn(Ys);break;case 24:Oa(_n)}}function jl(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){Yt(e,e.return,o)}}function Ts(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(d){Yt(a,l,d)}}}i=i.next}while(i!==s)}}catch(d){Yt(e,e.return,d)}}function Qx(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{rx(e,n)}catch(i){Yt(t,t.return,i)}}}function $x(t,e,n){n.props=nr(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){Yt(t,e,i)}}function ml(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){Yt(t,e,a)}}function sa(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){Yt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Yt(t,e,a)}else n.current=null}function Jx(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){Yt(t,t.return,a)}}function td(t,e,n){try{var i=t.stateNode;cE(i,t.type,n,e),i[ri]=e}catch(a){Yt(t,t.return,a)}}function ey(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Cs(t.type)||t.tag===4}function nd(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||ey(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Cs(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function wh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Da));else if(i!==4&&(i===27&&Cs(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(wh(t,e,n),t=t.sibling;t!==null;)wh(t,e,n),t=t.sibling}function Pu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&Cs(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Pu(t,e,n),t=t.sibling;t!==null;)Pu(t,e,n),t=t.sibling}function ty(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Fn(e,i,n),e[On]=t,e[ri]=n}catch(s){Yt(t,t.return,s)}}var Ra=!1,vn=!1,id=!1,c0=typeof WeakSet=="function"?WeakSet:Set,An=null;function Vb(t,e){if(t=t.containerInfo,Ph=qu,t=V_(t),nm(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,d=0,h=t,u=null;t:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=r+a),h!==s||i!==0&&h.nodeType!==3||(l=r+i),h.nodeType===3&&(r+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++d===i&&(l=r),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(zh={focusedElem:t,selectionRange:n},qu=!1,An=e;An!==null;)if(e=An,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,An=t;else for(;An!==null;){switch(e=An,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=nr(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(b){Yt(n,n.return,b)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Bh(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Bh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(_e(163))}if(t=e.sibling,t!==null){t.return=e.return,An=t;break}An=e.return}}function ny(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:_a(t,n),i&4&&jl(5,n);break;case 1:if(_a(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){Yt(n,n.return,r)}else{var a=nr(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){Yt(n,n.return,r)}}i&64&&Qx(n),i&512&&ml(n,n.return);break;case 3:if(_a(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{rx(t,e)}catch(r){Yt(n,n.return,r)}}break;case 27:e===null&&i&4&&ty(n);case 26:case 5:_a(t,n),e===null&&i&4&&Jx(n),i&512&&ml(n,n.return);break;case 12:_a(t,n);break;case 31:_a(t,n),i&4&&sy(t,n);break;case 13:_a(t,n),i&4&&ry(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=Qb.bind(null,n),vE(t,n))));break;case 22:if(i=n.memoizedState!==null||Ra,!i){e=e!==null&&e.memoizedState!==null||vn,a=Ra;var s=vn;Ra=i,(vn=e)&&!s?Ea(t,n,(n.subtreeFlags&8772)!==0):_a(t,n),Ra=a,vn=s}break;case 30:break;default:_a(t,n)}}function iy(t){var e=t.alternate;e!==null&&(t.alternate=null,iy(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Kp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var ln=null,ni=!1;function va(t,e,n){for(n=n.child;n!==null;)ay(t,e,n),n=n.sibling}function ay(t,e,n){if(gi&&typeof gi.onCommitFiberUnmount=="function")try{gi.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 26:vn||sa(n,e),va(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:vn||sa(n,e);var i=ln,a=ni;Cs(n.type)&&(ln=n.stateNode,ni=!1),va(t,e,n),xl(n.stateNode),ln=i,ni=a;break;case 5:vn||sa(n,e);case 6:if(i=ln,a=ni,ln=null,va(t,e,n),ln=i,ni=a,ln!==null)if(ni)try{(ln.nodeType===9?ln.body:ln.nodeName==="HTML"?ln.ownerDocument.body:ln).removeChild(n.stateNode)}catch(s){Yt(n,e,s)}else try{ln.removeChild(n.stateNode)}catch(s){Yt(n,e,s)}break;case 18:ln!==null&&(ni?(t=ln,M0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),vo(t)):M0(ln,n.stateNode));break;case 4:i=ln,a=ni,ln=n.stateNode.containerInfo,ni=!0,va(t,e,n),ln=i,ni=a;break;case 0:case 11:case 14:case 15:Ts(2,n,e),vn||Ts(4,n,e),va(t,e,n);break;case 1:vn||(sa(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&$x(n,e,i)),va(t,e,n);break;case 21:va(t,e,n);break;case 22:vn=(i=vn)||n.memoizedState!==null,va(t,e,n),vn=i;break;default:va(t,e,n)}}function sy(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{vo(t)}catch(n){Yt(e,e.return,n)}}}function ry(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{vo(t)}catch(n){Yt(e,e.return,n)}}function kb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new c0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new c0),e;default:throw Error(_e(435,t.tag))}}function fc(t,e){var n=kb(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=$b.bind(null,t,i);i.then(a,a)}})}function Jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(Cs(o.type)){ln=o.stateNode,ni=!1;break e}break;case 5:ln=o.stateNode,ni=!1;break e;case 3:case 4:ln=o.stateNode.containerInfo,ni=!0;break e}o=o.return}if(ln===null)throw Error(_e(160));ay(s,r,a),ln=null,ni=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)oy(e,t),e=e.sibling}var ji=null;function oy(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Jn(e,t),ei(t),i&4&&(Ts(3,t,t.return),jl(3,t),Ts(5,t,t.return));break;case 1:Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),i&64&&Ra&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=ji;if(Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[kl]||s[On]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),Fn(s,i,n),s[On]=t,Rn(s),i=s;break e;case"link":var r=C0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;case"meta":if(r=C0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;default:throw Error(_e(468,i))}s[On]=t,Rn(s),i=s}t.stateNode=i}else D0(a,t.type,t.stateNode);else t.stateNode=w0(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?D0(a,t.type,t.stateNode):w0(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&td(t,t.memoizedProps,n.memoizedProps)}break;case 27:Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),n!==null&&i&4&&td(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),t.flags&32){a=t.stateNode;try{lo(a,"")}catch(g){Yt(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,td(t,a,n!==null?n.memoizedProps:a)),i&1024&&(id=!0);break;case 6:if(Jn(e,t),ei(t),i&4){if(t.stateNode===null)throw Error(_e(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){Yt(t,t.return,g)}}break;case 3:if(ou=null,a=ji,ji=ku(e.containerInfo),Jn(e,t),ji=a,ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{vo(e.containerInfo)}catch(g){Yt(t,t.return,g)}id&&(id=!1,ly(t));break;case 4:i=ji,ji=ku(t.stateNode.containerInfo),Jn(e,t),ei(t),ji=i;break;case 12:Jn(e,t),ei(t);break;case 31:Jn(e,t),ei(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,fc(t,i)));break;case 13:Jn(e,t),ei(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_f=mi()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,fc(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Ra,d=vn;if(Ra=c||a,vn=d||l,Jn(e,t),vn=d,Ra=c,ei(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||Ra||vn||Hs(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,u=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){Yt(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){Yt(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var p=l.stateNode;a?b0(p,!0):b0(l.stateNode,!1)}catch(g){Yt(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,fc(t,n))));break;case 19:Jn(e,t),ei(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,fc(t,i)));break;case 30:break;case 21:break;default:Jn(e,t),ei(t)}}function ei(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(ey(i)){n=i;break}i=i.return}if(n==null)throw Error(_e(160));switch(n.tag){case 27:var a=n.stateNode,s=nd(t);Pu(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(lo(r,""),n.flags&=-33);var o=nd(t);Pu(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=nd(t);wh(t,c,l);break;default:throw Error(_e(161))}}catch(d){Yt(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function ly(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;ly(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function _a(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)ny(t,e.alternate,e),e=e.sibling}function Hs(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Ts(4,e,e.return),Hs(e);break;case 1:sa(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&$x(e,e.return,n),Hs(e);break;case 27:xl(e.stateNode);case 26:case 5:sa(e,e.return),Hs(e);break;case 22:e.memoizedState===null&&Hs(e);break;case 30:Hs(e);break;default:Hs(e)}t=t.sibling}}function Ea(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:Ea(a,s,n),jl(4,s);break;case 1:if(Ea(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){Yt(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)sx(l[a],o)}catch(c){Yt(i,i.return,c)}}n&&r&64&&Qx(s),ml(s,s.return);break;case 27:ty(s);case 26:case 5:Ea(a,s,n),n&&i===null&&r&4&&Jx(s),ml(s,s.return);break;case 12:Ea(a,s,n);break;case 31:Ea(a,s,n),n&&r&4&&sy(a,s);break;case 13:Ea(a,s,n),n&&r&4&&ry(a,s);break;case 22:s.memoizedState===null&&Ea(a,s,n),ml(s,s.return);break;case 30:break;default:Ea(a,s,n)}e=e.sibling}}function wm(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Wl(n))}function Cm(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Wl(t))}function ki(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)cy(t,e,n,i),e=e.sibling}function cy(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:ki(t,e,n,i),a&2048&&jl(9,e);break;case 1:ki(t,e,n,i);break;case 3:ki(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Wl(t)));break;case 12:if(a&2048){ki(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){Yt(e,e.return,l)}}else ki(t,e,n,i);break;case 31:ki(t,e,n,i);break;case 13:ki(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?ki(t,e,n,i):gl(t,e):s._visibility&2?ki(t,e,n,i):(s._visibility|=2,Or(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&wm(r,e);break;case 24:ki(t,e,n,i),a&2048&&Cm(e.alternate,e);break;default:ki(t,e,n,i)}}function Or(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Or(s,r,o,l,a),jl(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?Or(s,r,o,l,a):gl(s,r):(d._visibility|=2,Or(s,r,o,l,a)),a&&c&2048&&wm(r.alternate,r);break;case 24:Or(s,r,o,l,a),a&&c&2048&&Cm(r.alternate,r);break;default:Or(s,r,o,l,a)}e=e.sibling}}function gl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:gl(n,i),a&2048&&wm(i.alternate,i);break;case 24:gl(n,i),a&2048&&Cm(i.alternate,i);break;default:gl(n,i)}e=e.sibling}}var nl=8192;function vr(t,e,n){if(t.subtreeFlags&nl)for(t=t.child;t!==null;)uy(t,e,n),t=t.sibling}function uy(t,e,n){switch(t.tag){case 26:vr(t,e,n),t.flags&nl&&t.memoizedState!==null&&CE(n,ji,t.memoizedState,t.memoizedProps);break;case 5:vr(t,e,n);break;case 3:case 4:var i=ji;ji=ku(t.stateNode.containerInfo),vr(t,e,n),ji=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=nl,nl=16777216,vr(t,e,n),nl=i):vr(t,e,n));break;default:vr(t,e,n)}}function fy(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Fo(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];An=i,hy(i,t)}fy(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)dy(t),t=t.sibling}function dy(t){switch(t.tag){case 0:case 11:case 15:Fo(t),t.flags&2048&&Ts(9,t,t.return);break;case 3:Fo(t);break;case 12:Fo(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,su(t)):Fo(t);break;default:Fo(t)}}function su(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];An=i,hy(i,t)}fy(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Ts(8,e,e.return),su(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,su(e));break;default:su(e)}t=t.sibling}}function hy(t,e){for(;An!==null;){var n=An;switch(n.tag){case 0:case 11:case 15:Ts(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Wl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,An=i;else e:for(n=t;An!==null;){i=An;var a=i.sibling,s=i.return;if(iy(i),i===n){An=null;break e}if(a!==null){a.return=s,An=a;break e}An=s}}}var Xb={getCacheForType:function(t){var e=zn(_n),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return zn(_n).controller.signal}},Wb=typeof WeakMap=="function"?WeakMap:Map,Ft=0,Jt=null,At=null,Ct=0,jt=0,fi=null,cs=!1,wo=!1,Dm=!1,Va=0,un=0,As=0,Ks=0,Nm=0,pi=0,ho=0,vl=null,ii=null,Ch=!1,_f=0,py=0,zu=1/0,Iu=null,_s=null,yn=0,xs=null,po=null,Pa=0,Dh=0,Nh=null,my=null,_l=0,Uh=null;function _i(){return Ft&2&&Ct!==0?Ct&-Ct:lt.T!==null?Lm():E_()}function gy(){if(pi===0)if(!(Ct&536870912)||Lt){var t=ic;ic<<=1,!(ic&3932160)&&(ic=262144),pi=t}else pi=536870912;return t=yi.current,t!==null&&(t.flags|=32),pi}function ai(t,e,n){(t===Jt&&(jt===2||jt===9)||t.cancelPendingCommit!==null)&&(mo(t,0),us(t,Ct,pi,!1)),Vl(t,n),(!(Ft&2)||t!==Jt)&&(t===Jt&&(!(Ft&2)&&(Ks|=n),un===4&&us(t,Ct,pi,!1)),da(t))}function vy(t,e,n){if(Ft&6)throw Error(_e(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Gl(t,e),a=i?Yb(t,e):ad(t,e,!0),s=i;do{if(a===0){wo&&!i&&us(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!qb(n)){a=ad(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=vl;var l=o.current.memoizedState.isDehydrated;if(l&&(mo(o,r).flags|=256),r=ad(o,r,!1),r!==2){if(Dm&&!l){o.errorRecoveryDisabledLanes|=s,Ks|=s,a=4;break e}s=ii,ii=a,s!==null&&(ii===null?ii=s:ii.push.apply(ii,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){mo(t,0),us(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(_e(345));case 4:if((e&4194048)!==e)break;case 6:us(i,e,pi,!cs);break e;case 2:ii=null;break;case 3:case 5:break;default:throw Error(_e(329))}if((e&62914560)===e&&(a=_f+300-mi(),10<a)){if(us(i,e,pi,!cs),of(i,0,!0)!==0)break e;Pa=e,i.timeoutHandle=Iy(u0.bind(null,i,n,ii,Iu,Ch,e,pi,Ks,ho,cs,s,"Throttled",-0,0),a);break e}u0(i,n,ii,Iu,Ch,e,pi,Ks,ho,cs,s,null,-0,0)}}break}while(!0);da(t)}function u0(t,e,n,i,a,s,r,o,l,c,d,h,u,p){if(t.timeoutHandle=-1,h=e.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Da},uy(e,s,h);var g=(s&62914560)===s?_f-mi():(s&4194048)===s?py-mi():0;if(g=DE(h,g),g!==null){Pa=s,t.cancelPendingCommit=g(d0.bind(null,t,e,s,n,i,a,r,o,l,d,h,null,u,p)),us(t,s,r,!c);return}}d0(t,e,s,n,i,a,r,o,l)}function qb(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!xi(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function us(t,e,n,i){e&=~Nm,e&=~Ks,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-vi(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&S_(t,n,e)}function xf(){return Ft&6?!0:(Yl(0),!1)}function Um(){if(At!==null){if(jt===0)var t=At.return;else t=At,Na=fr=null,vm(t),to=null,Rl=0,t=At;for(;t!==null;)Kx(t.alternate,t),t=t.return;At=null}}function mo(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,dE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pa=0,Um(),Jt=t,At=n=La(t.current,null),Ct=e,jt=0,fi=null,cs=!1,wo=Gl(t,e),Dm=!1,ho=pi=Nm=Ks=As=un=0,ii=vl=null,Ch=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-vi(i),s=1<<a;e|=t[a],i&=~s}return Va=e,ff(),n}function _y(t,e){mt=null,lt.H=Cl,e===Ro||e===hf?(e=Vg(),jt=3):e===um?(e=Vg(),jt=4):jt=e===Am?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,fi=e,At===null&&(un=1,Lu(t,Ui(e,t.current)))}function xy(){var t=yi.current;return t===null?!0:(Ct&4194048)===Ct?zi===null:(Ct&62914560)===Ct||Ct&536870912?t===zi:!1}function yy(){var t=lt.H;return lt.H=Cl,t===null?Cl:t}function Sy(){var t=lt.A;return lt.A=Xb,t}function Bu(){un=4,cs||(Ct&4194048)!==Ct&&yi.current!==null||(wo=!0),!(As&134217727)&&!(Ks&134217727)||Jt===null||us(Jt,Ct,pi,!1)}function ad(t,e,n){var i=Ft;Ft|=2;var a=yy(),s=Sy();(Jt!==t||Ct!==e)&&(Iu=null,mo(t,e)),e=!1;var r=un;e:do try{if(jt!==0&&At!==null){var o=At,l=fi;switch(jt){case 8:Um(),r=6;break e;case 3:case 2:case 9:case 6:yi.current===null&&(e=!0);var c=jt;if(jt=0,fi=null,jr(t,o,l,c),n&&wo){r=0;break e}break;default:c=jt,jt=0,fi=null,jr(t,o,l,c)}}jb(),r=un;break}catch(d){_y(t,d)}while(!0);return e&&t.shellSuspendCounter++,Na=fr=null,Ft=i,lt.H=a,lt.A=s,At===null&&(Jt=null,Ct=0,ff()),r}function jb(){for(;At!==null;)My(At)}function Yb(t,e){var n=Ft;Ft|=2;var i=yy(),a=Sy();Jt!==t||Ct!==e?(Iu=null,zu=mi()+500,mo(t,e)):wo=Gl(t,e);e:do try{if(jt!==0&&At!==null){e=At;var s=fi;t:switch(jt){case 1:jt=0,fi=null,jr(t,e,s,1);break;case 2:case 9:if(Gg(s)){jt=0,fi=null,f0(e);break}e=function(){jt!==2&&jt!==9||Jt!==t||(jt=7),da(t)},s.then(e,e);break e;case 3:jt=7;break e;case 4:jt=5;break e;case 7:Gg(s)?(jt=0,fi=null,f0(e)):(jt=0,fi=null,jr(t,e,s,7));break;case 5:var r=null;switch(At.tag){case 26:r=At.memoizedState;case 5:case 27:var o=At;if(r?Vy(r):o.stateNode.complete){jt=0,fi=null;var l=o.sibling;if(l!==null)At=l;else{var c=o.return;c!==null?(At=c,yf(c)):At=null}break t}}jt=0,fi=null,jr(t,e,s,5);break;case 6:jt=0,fi=null,jr(t,e,s,6);break;case 8:Um(),un=6;break e;default:throw Error(_e(462))}}Zb();break}catch(d){_y(t,d)}while(!0);return Na=fr=null,lt.H=i,lt.A=a,Ft=n,At!==null?0:(Jt=null,Ct=0,ff(),un)}function Zb(){for(;At!==null&&!_M();)My(At)}function My(t){var e=Zx(t.alternate,t,Va);t.memoizedProps=t.pendingProps,e===null?yf(t):At=e}function f0(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=a0(n,e,e.pendingProps,e.type,void 0,Ct);break;case 11:e=a0(n,e,e.pendingProps,e.type.render,e.ref,Ct);break;case 5:vm(e);default:Kx(n,e),e=At=K_(e,Va),e=Zx(n,e,Va)}t.memoizedProps=t.pendingProps,e===null?yf(t):At=e}function jr(t,e,n,i){Na=fr=null,vm(e),to=null,Rl=0;var a=e.return;try{if(Ib(t,a,e,n,Ct)){un=1,Lu(t,Ui(n,t.current)),At=null;return}}catch(s){if(a!==null)throw At=a,s;un=1,Lu(t,Ui(n,t.current)),At=null;return}e.flags&32768?(Lt||i===1?t=!0:wo||Ct&536870912?t=!1:(cs=t=!0,(i===2||i===9||i===3||i===6)&&(i=yi.current,i!==null&&i.tag===13&&(i.flags|=16384))),by(e,t)):yf(e)}function yf(t){var e=t;do{if(e.flags&32768){by(e,cs);return}t=e.return;var n=Hb(e.alternate,e,Va);if(n!==null){At=n;return}if(e=e.sibling,e!==null){At=e;return}At=e=t}while(e!==null);un===0&&(un=5)}function by(t,e){do{var n=Gb(t.alternate,t);if(n!==null){n.flags&=32767,At=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){At=t;return}At=t=n}while(t!==null);un=6,At=null}function d0(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do Sf();while(yn!==0);if(Ft&6)throw Error(_e(327));if(e!==null){if(e===t.current)throw Error(_e(177));if(s=e.lanes|e.childLanes,s|=im,wM(t,n,s,r,o,l),t===Jt&&(At=Jt=null,Ct=0),po=e,xs=t,Pa=n,Dh=s,Nh=a,my=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,Jb(Mu,function(){return wy(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=lt.T,lt.T=null,a=Ht.p,Ht.p=2,r=Ft,Ft|=4;try{Vb(t,e,n)}finally{Ft=r,Ht.p=a,lt.T=i}}yn=1,Ey(),Ty(),Ay()}}function Ey(){if(yn===1){yn=0;var t=xs,e=po,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=lt.T,lt.T=null;var i=Ht.p;Ht.p=2;var a=Ft;Ft|=4;try{oy(e,t);var s=zh,r=V_(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&G_(o.ownerDocument.documentElement,o)){if(l!==null&&nm(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var h=o.ownerDocument||document,u=h&&h.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),m=l.end===void 0?b:Math.min(l.end,g);!p.extend&&b>m&&(r=m,m=b,b=r);var f=Og(o,b),v=Og(o,m);if(f&&v&&(p.rangeCount!==1||p.anchorNode!==f.node||p.anchorOffset!==f.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var S=h.createRange();S.setStart(f.node,f.offset),p.removeAllRanges(),b>m?(p.addRange(S),p.extend(v.node,v.offset)):(S.setEnd(v.node,v.offset),p.addRange(S))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var x=h[o];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}qu=!!Ph,zh=Ph=null}finally{Ft=a,Ht.p=i,lt.T=n}}t.current=e,yn=2}}function Ty(){if(yn===2){yn=0;var t=xs,e=po,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=lt.T,lt.T=null;var i=Ht.p;Ht.p=2;var a=Ft;Ft|=4;try{ny(t,e.alternate,e)}finally{Ft=a,Ht.p=i,lt.T=n}}yn=3}}function Ay(){if(yn===4||yn===3){yn=0,xM();var t=xs,e=po,n=Pa,i=my;e.subtreeFlags&10256||e.flags&10256?yn=5:(yn=0,po=xs=null,Ry(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(_s=null),Zp(n),e=e.stateNode,gi&&typeof gi.onCommitFiberRoot=="function")try{gi.onCommitFiberRoot(Hl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=lt.T,a=Ht.p,Ht.p=2,lt.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{lt.T=e,Ht.p=a}}Pa&3&&Sf(),da(t),a=t.pendingLanes,n&261930&&a&42?t===Uh?_l++:(_l=0,Uh=t):_l=0,Yl(0)}}function Ry(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Wl(e)))}function Sf(){return Ey(),Ty(),Ay(),wy()}function wy(){if(yn!==5)return!1;var t=xs,e=Dh;Dh=0;var n=Zp(Pa),i=lt.T,a=Ht.p;try{Ht.p=32>n?32:n,lt.T=null,n=Nh,Nh=null;var s=xs,r=Pa;if(yn=0,po=xs=null,Pa=0,Ft&6)throw Error(_e(331));var o=Ft;if(Ft|=4,dy(s.current),cy(s,s.current,r,n),Ft=o,Yl(0,!1),gi&&typeof gi.onPostCommitFiberRoot=="function")try{gi.onPostCommitFiberRoot(Hl,s)}catch{}return!0}finally{Ht.p=a,lt.T=i,Ry(t,e)}}function h0(t,e,n){e=Ui(n,e),e=Th(t.stateNode,e,2),t=vs(t,e,2),t!==null&&(Vl(t,2),da(t))}function Yt(t,e,n){if(t.tag===3)h0(t,t,n);else for(;e!==null;){if(e.tag===3){h0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_s===null||!_s.has(i))){t=Ui(n,t),n=kx(2),i=vs(e,n,2),i!==null&&(Xx(n,i,e,t),Vl(i,2),da(i));break}}e=e.return}}function sd(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Wb;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(Dm=!0,a.add(n),t=Kb.bind(null,t,e,n),e.then(t,t))}function Kb(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Jt===t&&(Ct&n)===n&&(un===4||un===3&&(Ct&62914560)===Ct&&300>mi()-_f?!(Ft&2)&&mo(t,0):Nm|=n,ho===Ct&&(ho=0)),da(t)}function Cy(t,e){e===0&&(e=y_()),t=ur(t,e),t!==null&&(Vl(t,e),da(t))}function Qb(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Cy(t,n)}function $b(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(_e(314))}i!==null&&i.delete(e),Cy(t,n)}function Jb(t,e){return jp(t,e)}var Fu=null,Pr=null,Lh=!1,Hu=!1,rd=!1,fs=0;function da(t){t!==Pr&&t.next===null&&(Pr===null?Fu=Pr=t:Pr=Pr.next=t),Hu=!0,Lh||(Lh=!0,tE())}function Yl(t,e){if(!rd&&Hu){rd=!0;do for(var n=!1,i=Fu;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-vi(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,p0(i,s))}else s=Ct,s=of(i,i===Jt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Gl(i,s)||(n=!0,p0(i,s));i=i.next}while(n);rd=!1}}function eE(){Dy()}function Dy(){Hu=Lh=!1;var t=0;fs!==0&&fE()&&(t=fs);for(var e=mi(),n=null,i=Fu;i!==null;){var a=i.next,s=Ny(i,e);s===0?(i.next=null,n===null?Fu=a:n.next=a,a===null&&(Pr=n)):(n=i,(t!==0||s&3)&&(Hu=!0)),i=a}yn!==0&&yn!==5||Yl(t),fs!==0&&(fs=0)}function Ny(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-vi(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=RM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=Jt,n=Ct,n=of(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(jt===2||jt===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&Of(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Gl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&Of(i),Zp(n)){case 2:case 8:n=__;break;case 32:n=Mu;break;case 268435456:n=x_;break;default:n=Mu}return i=Uy.bind(null,t),n=jp(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&Of(i),t.callbackPriority=2,t.callbackNode=null,2}function Uy(t,e){if(yn!==0&&yn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Sf()&&t.callbackNode!==n)return null;var i=Ct;return i=of(t,t===Jt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(vy(t,i,e),Ny(t,mi()),t.callbackNode!=null&&t.callbackNode===n?Uy.bind(null,t):null)}function p0(t,e){if(Sf())return null;vy(t,e,!0)}function tE(){hE(function(){Ft&6?jp(v_,eE):Dy()})}function Lm(){if(fs===0){var t=co;t===0&&(t=nc,nc<<=1,!(nc&261888)&&(nc=256)),fs=t}return fs}function m0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Kc(""+t)}function g0(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function nE(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=m0((a[ri]||null).action),r=i.submitter;r&&(e=(e=r[ri]||null)?m0(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new lf("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(fs!==0){var l=r?g0(a,r):new FormData(a);bh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?g0(a,r):new FormData(a),bh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var od=0;od<fh.length;od++){var ld=fh[od],iE=ld.toLowerCase(),aE=ld[0].toUpperCase()+ld.slice(1);Ki(iE,"on"+aE)}Ki(X_,"onAnimationEnd");Ki(W_,"onAnimationIteration");Ki(q_,"onAnimationStart");Ki("dblclick","onDoubleClick");Ki("focusin","onFocus");Ki("focusout","onBlur");Ki(yb,"onTransitionRun");Ki(Sb,"onTransitionStart");Ki(Mb,"onTransitionCancel");Ki(j_,"onTransitionEnd");oo("onMouseEnter",["mouseout","mouseover"]);oo("onMouseLeave",["mouseout","mouseover"]);oo("onPointerEnter",["pointerout","pointerover"]);oo("onPointerLeave",["pointerout","pointerover"]);or("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));or("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));or("onBeforeInput",["compositionend","keypress","textInput","paste"]);or("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));or("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));or("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Dl));function Ly(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){Eu(d)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){Eu(d)}a.currentTarget=null,s=l}}}}function Tt(t,e){var n=e[ih];n===void 0&&(n=e[ih]=new Set);var i=t+"__bubble";n.has(i)||(Oy(e,t,2,!1),n.add(i))}function cd(t,e,n){var i=0;e&&(i|=4),Oy(n,t,i,e)}var dc="_reactListening"+Math.random().toString(36).slice(2);function Om(t){if(!t[dc]){t[dc]=!0,T_.forEach(function(n){n!=="selectionchange"&&(sE.has(n)||cd(n,!1,t),cd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[dc]||(e[dc]=!0,cd("selectionchange",!1,e))}}function Oy(t,e,n,i){switch(jy(e)){case 2:var a=LE;break;case 8:a=OE;break;default:a=Bm}n=a.bind(null,e,n,t),a=void 0,!lh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function ud(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Br(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}L_(function(){var c=s,d=$p(n),h=[];e:{var u=Y_.get(t);if(u!==void 0){var p=lf,g=t;switch(t){case"keypress":if($c(n)===0)break e;case"keydown":case"keyup":p=$M;break;case"focusin":g="focus",p=Ff;break;case"focusout":g="blur",p=Ff;break;case"beforeblur":case"afterblur":p=Ff;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Eg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=HM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=tb;break;case X_:case W_:case q_:p=kM;break;case j_:p=ib;break;case"scroll":case"scrollend":p=BM;break;case"wheel":p=sb;break;case"copy":case"cut":case"paste":p=WM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Ag;break;case"toggle":case"beforetoggle":p=ob}var b=(e&4)!==0,m=!b&&(t==="scroll"||t==="scrollend"),f=b?u!==null?u+"Capture":null:u;b=[];for(var v=c,S;v!==null;){var x=v;if(S=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||S===null||f===null||(x=Ml(v,f),x!=null&&b.push(Nl(v,x,S))),m)break;v=v.return}0<b.length&&(u=new p(u,g,null,n,d),h.push({event:u,listeners:b}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==oh&&(g=n.relatedTarget||n.fromElement)&&(Br(g)||g[Eo]))break e;if((p||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Br(g):null,g!==null&&(m=Fl(g),b=g.tag,g!==m||b!==5&&b!==27&&b!==6)&&(g=null)):(p=null,g=c),p!==g)){if(b=Eg,x="onMouseLeave",f="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(b=Ag,x="onPointerLeave",f="onPointerEnter",v="pointer"),m=p==null?u:el(p),S=g==null?u:el(g),u=new b(x,v+"leave",p,n,d),u.target=m,u.relatedTarget=S,x=null,Br(d)===c&&(b=new b(f,v+"enter",g,n,d),b.target=S,b.relatedTarget=m,x=b),m=x,p&&g)t:{for(b=rE,f=p,v=g,S=0,x=f;x;x=b(x))S++;x=0;for(var N=v;N;N=b(N))x++;for(;0<S-x;)f=b(f),S--;for(;0<x-S;)v=b(v),x--;for(;S--;){if(f===v||v!==null&&f===v.alternate){b=f;break t}f=b(f),v=b(v)}b=null}else b=null;p!==null&&v0(h,u,p,b,!1),g!==null&&m!==null&&v0(h,m,g,b,!0)}}e:{if(u=c?el(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var w=Dg;else if(Cg(u))if(F_)w=vb;else{w=mb;var C=pb}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Qp(c.elementType)&&(w=Dg):w=gb;if(w&&(w=w(t,c))){B_(h,w,n,d);break e}C&&C(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&rh(u,"number",u.value)}switch(C=c?el(c):window,t){case"focusin":(Cg(C)||C.contentEditable==="true")&&(Gr=C,ch=c,cl=null);break;case"focusout":cl=ch=Gr=null;break;case"mousedown":uh=!0;break;case"contextmenu":case"mouseup":case"dragend":uh=!1,Pg(h,n,d);break;case"selectionchange":if(xb)break;case"keydown":case"keyup":Pg(h,n,d)}var y;if(tm)e:{switch(t){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else Hr?z_(t,n)&&(D="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(P_&&n.locale!=="ko"&&(Hr||D!=="onCompositionStart"?D==="onCompositionEnd"&&Hr&&(y=O_()):(ls=d,Jp="value"in ls?ls.value:ls.textContent,Hr=!0)),C=Gu(c,D),0<C.length&&(D=new Tg(D,t,null,n,d),h.push({event:D,listeners:C}),y?D.data=y:(y=I_(n),y!==null&&(D.data=y)))),(y=cb?ub(t,n):fb(t,n))&&(D=Gu(c,"onBeforeInput"),0<D.length&&(C=new Tg("onBeforeInput","beforeinput",null,n,d),h.push({event:C,listeners:D}),C.data=y)),nE(h,t,c,n,d)}Ly(h,e)})}function Nl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Gu(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Ml(t,n),a!=null&&i.unshift(Nl(t,a,s)),a=Ml(t,e),a!=null&&i.push(Nl(t,a,s))),t.tag===3)return i;t=t.return}return[]}function rE(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function v0(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Ml(n,s),c!=null&&r.unshift(Nl(n,c,l))):a||(c=Ml(n,s),c!=null&&r.push(Nl(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var oE=/\r\n?/g,lE=/\u0000|\uFFFD/g;function _0(t){return(typeof t=="string"?t:""+t).replace(oE,`
`).replace(lE,"")}function Py(t,e){return e=_0(e),_0(t)===e}function Qt(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||lo(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&lo(t,""+i);break;case"className":sc(t,"class",i);break;case"tabIndex":sc(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":sc(t,n,i);break;case"style":U_(t,i,s);break;case"data":if(e!=="object"){sc(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Kc(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Qt(t,e,"name",a.name,a,null),Qt(t,e,"formEncType",a.formEncType,a,null),Qt(t,e,"formMethod",a.formMethod,a,null),Qt(t,e,"formTarget",a.formTarget,a,null)):(Qt(t,e,"encType",a.encType,a,null),Qt(t,e,"method",a.method,a,null),Qt(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Kc(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=Da);break;case"onScroll":i!=null&&Tt("scroll",t);break;case"onScrollEnd":i!=null&&Tt("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(_e(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(_e(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=Kc(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":Tt("beforetoggle",t),Tt("toggle",t),Zc(t,"popover",i);break;case"xlinkActuate":ma(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ma(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ma(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ma(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ma(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ma(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ma(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ma(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ma(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Zc(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=zM.get(n)||n,Zc(t,n,i))}}function Oh(t,e,n,i,a,s){switch(n){case"style":U_(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(_e(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(_e(60));t.innerHTML=n}}break;case"children":typeof i=="string"?lo(t,i):(typeof i=="number"||typeof i=="bigint")&&lo(t,""+i);break;case"onScroll":i!=null&&Tt("scroll",t);break;case"onScrollEnd":i!=null&&Tt("scrollend",t);break;case"onClick":i!=null&&(t.onclick=Da);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!A_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[ri]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):Zc(t,n,i)}}}function Fn(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Tt("error",t),Tt("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(_e(137,e));default:Qt(t,e,s,r,n,null)}}a&&Qt(t,e,"srcSet",n.srcSet,n,null),i&&Qt(t,e,"src",n.src,n,null);return;case"input":Tt("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(_e(137,e));break;default:Qt(t,e,i,d,n,null)}}C_(t,s,o,l,c,r,a,!1);return;case"select":Tt("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Qt(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?$r(t,!!i,e,!1):n!=null&&$r(t,!!i,n,!0);return;case"textarea":Tt("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(_e(91));break;default:Qt(t,e,r,o,n,null)}N_(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Qt(t,e,l,i,n,null)}return;case"dialog":Tt("beforetoggle",t),Tt("toggle",t),Tt("cancel",t),Tt("close",t);break;case"iframe":case"object":Tt("load",t);break;case"video":case"audio":for(i=0;i<Dl.length;i++)Tt(Dl[i],t);break;case"image":Tt("error",t),Tt("load",t);break;case"details":Tt("toggle",t);break;case"embed":case"source":case"link":Tt("error",t),Tt("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(_e(137,e));default:Qt(t,e,c,i,n,null)}return;default:if(Qp(e)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Oh(t,e,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Qt(t,e,o,i,n,null))}function cE(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,d=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||Qt(t,e,p,null,i,h)}}for(var u in i){var p=i[u];if(h=n[u],i.hasOwnProperty(u)&&(p!=null||h!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(_e(137,e));break;default:p!==h&&Qt(t,e,u,p,i,h)}}sh(t,r,o,l,c,d,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||Qt(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Qt(t,e,a,s,i,l)}e=o,n=r,i=p,u!=null?$r(t,!!n,u,!1):!!i!=!!n&&(e!=null?$r(t,!!n,e,!0):$r(t,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Qt(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(_e(91));break;default:a!==s&&Qt(t,e,r,a,i,s)}D_(t,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:Qt(t,e,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Qt(t,e,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&Qt(t,e,b,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(_e(137,e));break;default:Qt(t,e,c,u,i,p)}return;default:if(Qp(e)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Oh(t,e,m,void 0,i,u);for(d in i)u=i[d],p=n[d],!i.hasOwnProperty(d)||u===p||u===void 0&&p===void 0||Oh(t,e,d,u,i,p);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&Qt(t,e,f,null,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u==null&&p==null||Qt(t,e,h,u,i,p)}function x0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function uE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&x0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,h=l.initiatorType;d&&x0(h)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Ph=null,zh=null;function Vu(t){return t.nodeType===9?t:t.ownerDocument}function y0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function zy(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Ih(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var fd=null;function fE(){var t=window.event;return t&&t.type==="popstate"?t===fd?!1:(fd=t,!0):(fd=null,!1)}var Iy=typeof setTimeout=="function"?setTimeout:void 0,dE=typeof clearTimeout=="function"?clearTimeout:void 0,S0=typeof Promise=="function"?Promise:void 0,hE=typeof queueMicrotask=="function"?queueMicrotask:typeof S0<"u"?function(t){return S0.resolve(null).then(t).catch(pE)}:Iy;function pE(t){setTimeout(function(){throw t})}function Cs(t){return t==="head"}function M0(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),vo(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")xl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,xl(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[kl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&xl(t.ownerDocument.body);n=a}while(n);vo(e)}function b0(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Bh(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Bh(n),Kp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function mE(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[kl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ii(t.nextSibling),t===null)break}return null}function gE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ii(t.nextSibling),t===null))return null;return t}function By(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ii(t.nextSibling),t===null))return null;return t}function Fh(t){return t.data==="$?"||t.data==="$~"}function Hh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function vE(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Ii(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Gh=null;function E0(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ii(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function T0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function Fy(t,e,n){switch(e=Vu(n),t){case"html":if(t=e.documentElement,!t)throw Error(_e(452));return t;case"head":if(t=e.head,!t)throw Error(_e(453));return t;case"body":if(t=e.body,!t)throw Error(_e(454));return t;default:throw Error(_e(451))}}function xl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Kp(t)}var Fi=new Map,A0=new Set;function ku(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Wa=Ht.d;Ht.d={f:_E,r:xE,D:yE,C:SE,L:ME,m:bE,X:TE,S:EE,M:AE};function _E(){var t=Wa.f(),e=xf();return t||e}function xE(t){var e=To(t);e!==null&&e.tag===5&&e.type==="form"?Ux(e):Wa.r(t)}var Co=typeof document>"u"?null:document;function Hy(t,e,n){var i=Co;if(i&&typeof e=="string"&&e){var a=Ni(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),A0.has(a)||(A0.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),Fn(e,"link",t),Rn(e),i.head.appendChild(e)))}}function yE(t){Wa.D(t),Hy("dns-prefetch",t,null)}function SE(t,e){Wa.C(t,e),Hy("preconnect",t,e)}function ME(t,e,n){Wa.L(t,e,n);var i=Co;if(i&&t&&e){var a='link[rel="preload"][as="'+Ni(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Ni(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Ni(n.imageSizes)+'"]')):a+='[href="'+Ni(t)+'"]';var s=a;switch(e){case"style":s=go(t);break;case"script":s=Do(t)}Fi.has(s)||(t=on({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Fi.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(Zl(s))||e==="script"&&i.querySelector(Kl(s))||(e=i.createElement("link"),Fn(e,"link",t),Rn(e),i.head.appendChild(e)))}}function bE(t,e){Wa.m(t,e);var n=Co;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Ni(i)+'"][href="'+Ni(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Do(t)}if(!Fi.has(s)&&(t=on({rel:"modulepreload",href:t},e),Fi.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Kl(s)))return}i=n.createElement("link"),Fn(i,"link",t),Rn(i),n.head.appendChild(i)}}}function EE(t,e,n){Wa.S(t,e,n);var i=Co;if(i&&t){var a=Qr(i).hoistableStyles,s=go(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Zl(s)))o.loading=5;else{t=on({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Fi.get(s))&&Pm(t,n);var l=r=i.createElement("link");Rn(l),Fn(l,"link",t),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,ru(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function TE(t,e){Wa.X(t,e);var n=Co;if(n&&t){var i=Qr(n).hoistableScripts,a=Do(t),s=i.get(a);s||(s=n.querySelector(Kl(a)),s||(t=on({src:t,async:!0},e),(e=Fi.get(a))&&zm(t,e),s=n.createElement("script"),Rn(s),Fn(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function AE(t,e){Wa.M(t,e);var n=Co;if(n&&t){var i=Qr(n).hoistableScripts,a=Do(t),s=i.get(a);s||(s=n.querySelector(Kl(a)),s||(t=on({src:t,async:!0,type:"module"},e),(e=Fi.get(a))&&zm(t,e),s=n.createElement("script"),Rn(s),Fn(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function R0(t,e,n,i){var a=(a=ps.current)?ku(a):null;if(!a)throw Error(_e(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=go(n.href),n=Qr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=go(n.href);var s=Qr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(Zl(t)))&&!s._p&&(r.instance=s,r.state.loading=5),Fi.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Fi.set(t,n),s||RE(a,t,n,r.state))),e&&i===null)throw Error(_e(528,""));return r}if(e&&i!==null)throw Error(_e(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Do(n),n=Qr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(_e(444,t))}}function go(t){return'href="'+Ni(t)+'"'}function Zl(t){return'link[rel="stylesheet"]['+t+"]"}function Gy(t){return on({},t,{"data-precedence":t.precedence,precedence:null})}function RE(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),Fn(e,"link",n),Rn(e),t.head.appendChild(e))}function Do(t){return'[src="'+Ni(t)+'"]'}function Kl(t){return"script[async]"+t}function w0(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Ni(n.href)+'"]');if(i)return e.instance=i,Rn(i),i;var a=on({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),Rn(i),Fn(i,"style",a),ru(i,n.precedence,t),e.instance=i;case"stylesheet":a=go(n.href);var s=t.querySelector(Zl(a));if(s)return e.state.loading|=4,e.instance=s,Rn(s),s;i=Gy(n),(a=Fi.get(a))&&Pm(i,a),s=(t.ownerDocument||t).createElement("link"),Rn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),e.state.loading|=4,ru(s,n.precedence,t),e.instance=s;case"script":return s=Do(n.src),(a=t.querySelector(Kl(s)))?(e.instance=a,Rn(a),a):(i=n,(a=Fi.get(s))&&(i=on({},n),zm(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),Rn(a),Fn(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(_e(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,ru(i,n.precedence,t));return e.instance}function ru(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Pm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function zm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var ou=null;function C0(t,e,n){if(ou===null){var i=new Map,a=ou=new Map;a.set(n,i)}else a=ou,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[kl]||s[On]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function D0(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function wE(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Vy(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function CE(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=go(i.href),s=e.querySelector(Zl(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Xu.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,Rn(s);return}s=e.ownerDocument||e,i=Gy(i),(a=Fi.get(a))&&Pm(i,a),s=s.createElement("link"),Rn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Xu.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var dd=0;function DE(t,e){return t.stylesheets&&t.count===0&&lu(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&lu(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&dd===0&&(dd=62500*uE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&lu(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>dd?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Xu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)lu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Wu=null;function lu(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Wu=new Map,e.forEach(NE,t),Wu=null,Xu.call(t))}function NE(t,e){if(!(e.state.loading&4)){var n=Wu.get(t);if(n)var i=n.get(null);else{n=new Map,Wu.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Xu.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Ul={$$typeof:Ca,Provider:null,Consumer:null,_currentValue:qs,_currentValue2:qs,_threadCount:0};function UE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Pf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pf(0),this.hiddenUpdates=Pf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function ky(t,e,n,i,a,s,r,o,l,c,d,h){return t=new UE(t,e,n,r,l,c,d,h,o),e=1,s===!0&&(e|=24),s=hi(3,null,null,e),t.current=s,s.stateNode=t,e=lm(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},fm(s),t}function Xy(t){return t?(t=Xr,t):Xr}function Wy(t,e,n,i,a,s){a=Xy(a),i.context===null?i.context=a:i.pendingContext=a,i=gs(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=vs(t,i,e),n!==null&&(ai(n,t,e),fl(n,t,e))}function N0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Im(t,e){N0(t,e),(t=t.alternate)&&N0(t,e)}function qy(t){if(t.tag===13||t.tag===31){var e=ur(t,67108864);e!==null&&ai(e,t,67108864),Im(t,67108864)}}function U0(t){if(t.tag===13||t.tag===31){var e=_i();e=Yp(e);var n=ur(t,e);n!==null&&ai(n,t,e),Im(t,e)}}var qu=!0;function LE(t,e,n,i){var a=lt.T;lt.T=null;var s=Ht.p;try{Ht.p=2,Bm(t,e,n,i)}finally{Ht.p=s,lt.T=a}}function OE(t,e,n,i){var a=lt.T;lt.T=null;var s=Ht.p;try{Ht.p=8,Bm(t,e,n,i)}finally{Ht.p=s,lt.T=a}}function Bm(t,e,n,i){if(qu){var a=Vh(i);if(a===null)ud(t,e,i,ju,n),L0(t,i);else if(zE(a,t,e,n,i))i.stopPropagation();else if(L0(t,i),e&4&&-1<PE.indexOf(t)){for(;a!==null;){var s=To(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Bs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-vi(r);o.entanglements[1]|=l,r&=~l}da(s),!(Ft&6)&&(zu=mi()+500,Yl(0))}}break;case 31:case 13:o=ur(s,2),o!==null&&ai(o,s,2),xf(),Im(s,2)}if(s=Vh(i),s===null&&ud(t,e,i,ju,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else ud(t,e,i,null,n)}}function Vh(t){return t=$p(t),Fm(t)}var ju=null;function Fm(t){if(ju=null,t=Br(t),t!==null){var e=Fl(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=d_(e),t!==null)return t;t=null}else if(n===31){if(t=h_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return ju=t,null}function jy(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(yM()){case v_:return 2;case __:return 8;case Mu:case SM:return 32;case x_:return 268435456;default:return 32}default:return 32}}var kh=!1,ys=null,Ss=null,Ms=null,Ll=new Map,Ol=new Map,ss=[],PE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function L0(t,e){switch(t){case"focusin":case"focusout":ys=null;break;case"dragenter":case"dragleave":Ss=null;break;case"mouseover":case"mouseout":Ms=null;break;case"pointerover":case"pointerout":Ll.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ol.delete(e.pointerId)}}function Ho(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=To(e),e!==null&&qy(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function zE(t,e,n,i,a){switch(e){case"focusin":return ys=Ho(ys,t,e,n,i,a),!0;case"dragenter":return Ss=Ho(Ss,t,e,n,i,a),!0;case"mouseover":return Ms=Ho(Ms,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return Ll.set(s,Ho(Ll.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ol.set(s,Ho(Ol.get(s)||null,t,e,n,i,a)),!0}return!1}function Yy(t){var e=Br(t.target);if(e!==null){var n=Fl(e);if(n!==null){if(e=n.tag,e===13){if(e=d_(n),e!==null){t.blockedOn=e,vg(t.priority,function(){U0(n)});return}}else if(e===31){if(e=h_(n),e!==null){t.blockedOn=e,vg(t.priority,function(){U0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function cu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Vh(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);oh=i,n.target.dispatchEvent(i),oh=null}else return e=To(n),e!==null&&qy(e),t.blockedOn=n,!1;e.shift()}return!0}function O0(t,e,n){cu(t)&&n.delete(e)}function IE(){kh=!1,ys!==null&&cu(ys)&&(ys=null),Ss!==null&&cu(Ss)&&(Ss=null),Ms!==null&&cu(Ms)&&(Ms=null),Ll.forEach(O0),Ol.forEach(O0)}function hc(t,e){t.blockedOn===e&&(t.blockedOn=null,kh||(kh=!0,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,IE)))}var pc=null;function P0(t){pc!==t&&(pc=t,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,function(){pc===t&&(pc=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(Fm(i||n)===null)continue;break}var s=To(n);s!==null&&(t.splice(e,3),e-=3,bh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function vo(t){function e(l){return hc(l,t)}ys!==null&&hc(ys,t),Ss!==null&&hc(Ss,t),Ms!==null&&hc(Ms,t),Ll.forEach(e),Ol.forEach(e);for(var n=0;n<ss.length;n++){var i=ss[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<ss.length&&(n=ss[0],n.blockedOn===null);)Yy(n),n.blockedOn===null&&ss.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[ri]||null;if(typeof s=="function")r||P0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[ri]||null)o=r.formAction;else if(Fm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),P0(n)}}}function Zy(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Hm(t){this._internalRoot=t}Mf.prototype.render=Hm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(_e(409));var n=e.current,i=_i();Wy(n,i,t,e,null,null)};Mf.prototype.unmount=Hm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wy(t.current,2,null,t,null,null),xf(),e[Eo]=null}};function Mf(t){this._internalRoot=t}Mf.prototype.unstable_scheduleHydration=function(t){if(t){var e=E_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ss.length&&e!==0&&e<ss[n].priority;n++);ss.splice(n,0,t),n===0&&Yy(t)}};var z0=u_.version;if(z0!=="19.2.8")throw Error(_e(527,z0,"19.2.8"));Ht.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(_e(188)):(t=Object.keys(t).join(","),Error(_e(268,t)));return t=hM(e),t=t!==null?p_(t):null,t=t===null?null:t.stateNode,t};var BE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:lt,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mc.isDisabled&&mc.supportsFiber)try{Hl=mc.inject(BE),gi=mc}catch{}}sf.createRoot=function(t,e){if(!f_(t))throw Error(_e(299));var n=!1,i="",a=Hx,s=Gx,r=Vx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=ky(t,1,!1,null,null,n,i,null,a,s,r,Zy),t[Eo]=e.current,Om(t),new Hm(e)};sf.hydrateRoot=function(t,e,n){if(!f_(t))throw Error(_e(299));var i=!1,a="",s=Hx,r=Gx,o=Vx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=ky(t,1,!0,e,n??null,i,a,l,s,r,o,Zy),e.context=Xy(null),n=e.current,i=_i(),i=Yp(i),a=gs(i),a.callback=null,vs(n,a,i),n=i,e.current.lanes=n,Vl(e,n),da(e),t[Eo]=e.current,Om(t),new Mf(e)};sf.version="19.2.8";function Ky(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ky)}catch(t){console.error(t)}}Ky(),a_.exports=sf;var FE=a_.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Gm="185",HE=0,I0=1,GE=2,uu=1,VE=2,il=3,Rs=0,si=1,wa=2,za=0,Qs=1,Yr=2,B0=3,F0=4,kE=5,Vs=100,XE=101,WE=102,qE=103,jE=104,YE=200,ZE=201,KE=202,QE=203,Xh=204,Wh=205,$E=206,JE=207,e1=208,t1=209,n1=210,i1=211,a1=212,s1=213,r1=214,qh=0,jh=1,Yh=2,_o=3,Zh=4,Kh=5,Qh=6,$h=7,Qy=0,o1=1,l1=2,la=0,$y=1,Jy=2,eS=3,tS=4,nS=5,iS=6,aS=7,sS=300,ir=301,xo=302,hd=303,pd=304,bf=306,Jh=1e3,Ua=1001,ep=1002,In=1003,c1=1004,gc=1005,kn=1006,md=1007,Xs=1008,Oi=1009,rS=1010,oS=1011,Pl=1012,Vm=1013,ua=1014,Yi=1015,ka=1016,km=1017,Xm=1018,zl=1020,lS=35902,cS=35899,uS=1021,fS=1022,Zi=1023,Xa=1026,Ws=1027,Wm=1028,qm=1029,ar=1030,jm=1031,Ym=1033,fu=33776,du=33777,hu=33778,pu=33779,tp=35840,np=35841,ip=35842,ap=35843,sp=36196,rp=37492,op=37496,lp=37488,cp=37489,Yu=37490,up=37491,fp=37808,dp=37809,hp=37810,pp=37811,mp=37812,gp=37813,vp=37814,_p=37815,xp=37816,yp=37817,Sp=37818,Mp=37819,bp=37820,Ep=37821,Tp=36492,Ap=36494,Rp=36495,wp=36283,Cp=36284,Zu=36285,Dp=36286,u1=3200,H0=0,f1=1,rs="",Ai="srgb",Ku="srgb-linear",Qu="linear",qt="srgb",_r=7680,G0=519,d1=512,h1=513,p1=514,Zm=515,m1=516,g1=517,Km=518,v1=519,V0=35044,k0="300 es",ra=2e3,$u=2001;function _1(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ju(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function x1(){const t=Ju("canvas");return t.style.display="block",t}const X0={};function W0(...t){const e="THREE."+t.shift();console.log(e,...t)}function dS(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function ot(...t){t=dS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function zt(...t){t=dS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function ao(...t){const e=t.join(" ");e in X0||(X0[e]=!0,ot(...t))}function y1(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const S1={[qh]:jh,[Yh]:Qh,[Zh]:$h,[_o]:Kh,[jh]:qh,[Qh]:Yh,[$h]:Zh,[Kh]:_o};class dr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],mu=Math.PI/180,Np=180/Math.PI;function Ql(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gn[t&255]+Gn[t>>8&255]+Gn[t>>16&255]+Gn[t>>24&255]+"-"+Gn[e&255]+Gn[e>>8&255]+"-"+Gn[e>>16&15|64]+Gn[e>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[i&255]+Gn[i>>8&255]+Gn[i>>16&255]+Gn[i>>24&255]).toLowerCase()}function Ut(t,e,n){return Math.max(e,Math.min(n,t))}function M1(t,e){return(t%e+e)%e}function gd(t,e,n){return(1-n)*t+n*e}function Go(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ti(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ig=class ig{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ut(this.x,e.x,n.x),this.y=Ut(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ut(this.x,e,n),this.y=Ut(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ig.prototype.isVector2=!0;let Gt=ig;class No{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],h=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],b=s[r+3];if(h!==b||l!==u||c!==p||d!==g){let m=l*u+c*p+d*g+h*b;m<0&&(u=-u,p=-p,g=-g,b=-b,m=-m);let f=1-o;if(m<.9995){const v=Math.acos(m),S=Math.sin(v);f=Math.sin(f*v)/S,o=Math.sin(o*v)/S,l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+b*o}else{l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+b*o;const v=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=v,c*=v,d*=v,h*=v}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],h=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return e[n]=o*g+d*h+l*p-c*u,e[n+1]=l*g+d*u+c*h-o*p,e[n+2]=c*g+d*p+o*u-l*h,e[n+3]=d*g-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),h=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:ot("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ag=class ag{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(q0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(q0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),d=2*(o*n-s*a),h=2*(s*i-r*n);return this.x=n+l*c+r*h-o*d,this.y=i+l*d+o*c-s*h,this.z=a+l*h+s*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ut(this.x,e.x,n.x),this.y=Ut(this.y,e.y,n.y),this.z=Ut(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ut(this.x,e,n),this.y=Ut(this.y,e,n),this.z=Ut(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return vd.copy(this).projectOnVector(e),this.sub(vd)}reflect(e){return this.sub(vd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ag.prototype.isVector3=!0;let J=ag;const vd=new J,q0=new No,sg=class sg{constructor(e,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],b=a[0],m=a[3],f=a[6],v=a[1],S=a[4],x=a[7],N=a[2],w=a[5],C=a[8];return s[0]=r*b+o*v+l*N,s[3]=r*m+o*S+l*w,s[6]=r*f+o*x+l*C,s[1]=c*b+d*v+h*N,s[4]=c*m+d*S+h*w,s[7]=c*f+d*x+h*C,s[2]=u*b+p*v+g*N,s[5]=u*m+p*S+g*w,s[8]=u*f+p*x+g*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*r*d-n*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*r-o*c,u=o*l-d*s,p=c*s-r*l,g=n*h+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=h*b,e[1]=(a*c-d*i)*b,e[2]=(o*i-a*r)*b,e[3]=u*b,e[4]=(d*n-a*l)*b,e[5]=(a*s-o*n)*b,e[6]=p*b,e[7]=(i*l-c*n)*b,e[8]=(r*n-i*s)*b,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return ao("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(_d.makeScale(e,n)),this}rotate(e){return ao("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(_d.makeRotation(-e)),this}translate(e,n){return ao("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(_d.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};sg.prototype.isMatrix3=!0;let dt=sg;const _d=new dt,j0=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Y0=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function b1(){const t={enabled:!0,workingColorSpace:Ku,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===qt&&(a.r=Ia(a.r),a.g=Ia(a.g),a.b=Ia(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===qt&&(a.r=so(a.r),a.g=so(a.g),a.b=so(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===rs?Qu:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return ao("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return ao("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ku]:{primaries:e,whitePoint:i,transfer:Qu,toXYZ:j0,fromXYZ:Y0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:e,whitePoint:i,transfer:qt,toXYZ:j0,fromXYZ:Y0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),t}const Nt=b1();function Ia(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function so(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let xr;class E1{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xr===void 0&&(xr=Ju("canvas")),xr.width=e.width,xr.height=e.height;const a=xr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=xr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ju("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Ia(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ia(n[i]/255)*255):n[i]=Ia(n[i]);return{data:n,width:e.width,height:e.height}}else return ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let T1=0;class Qm{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T1++}),this.uuid=Ql(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(xd(a[r].image)):s.push(xd(a[r]))}else s=xd(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function xd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?E1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(ot("Texture: Unable to serialize Texture."),{})}let A1=0;const yd=new J;class Yn extends dr{constructor(e=Yn.DEFAULT_IMAGE,n=Yn.DEFAULT_MAPPING,i=Ua,a=Ua,s=kn,r=Xs,o=Zi,l=Oi,c=Yn.DEFAULT_ANISOTROPY,d=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:A1++}),this.uuid=Ql(),this.name="",this.source=new Qm(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(yd).x}get height(){return this.source.getSize(yd).y}get depth(){return this.source.getSize(yd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){ot(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){ot(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jh:e.x=e.x-Math.floor(e.x);break;case Ua:e.x=e.x<0?0:1;break;case ep:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jh:e.y=e.y-Math.floor(e.y);break;case Ua:e.y=e.y<0?0:1;break;case ep:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=sS;Yn.DEFAULT_ANISOTROPY=1;const rg=class rg{constructor(e=0,n=0,i=0,a=1){this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],b=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-b)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+b)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,x=(p+1)/2,N=(f+1)/2,w=(d+u)/4,C=(h+b)/4,y=(g+m)/4;return S>x&&S>N?S<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(S),a=w/i,s=C/i):x>N?x<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(x),i=w/a,s=y/a):N<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(N),i=C/s,a=y/s),this.set(i,a,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(h-b)*(h-b)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-b)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ut(this.x,e.x,n.x),this.y=Ut(this.y,e.y,n.y),this.z=Ut(this.z,e.z,n.z),this.w=Ut(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ut(this.x,e,n),this.y=Ut(this.y,e,n),this.z=Ut(this.z,e,n),this.w=Ut(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rg.prototype.isVector4=!0;let fn=rg;class R1 extends dr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new fn(0,0,e,n),this.scissorTest=!1,this.viewport=new fn(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new Yn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new Qm(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ca extends R1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class hS extends Yn{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class w1 extends Yn{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nf=class nf{constructor(e,n,i,a,s,r,o,l,c,d,h,u,p,g,b,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,d,h,u,p,g,b,m)}set(e,n,i,a,s,r,o,l,c,d,h,u,p,g,b,m){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=b,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nf().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,a=1/yr.setFromMatrixColumn(e,0).length(),s=1/yr.setFromMatrixColumn(e,1).length(),r=1/yr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=r*d,p=r*h,g=o*d,b=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+p*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,b=c*h;n[0]=u+b*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*h,n[5]=r*d,n[9]=-o,n[2]=p*o-g,n[6]=b+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,b=c*h;n[0]=u-b*o,n[4]=-r*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*d,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*d,p=r*h,g=o*d,b=o*h;n[0]=l*d,n[4]=g*c-p,n[8]=u*c+b,n[1]=l*h,n[5]=b*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*d,n[4]=b-u*h,n[8]=g*h+p,n[1]=h,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*h+g,n[10]=u-b*h}else if(e.order==="XZY"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=u*h+b,n[5]=r*d,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*d,n[10]=b*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(C1,e,D1)}lookAt(e,n,i){const a=this.elements;return ci.subVectors(e,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Ya.crossVectors(i,ci),Ya.lengthSq()===0&&(Math.abs(i.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Ya.crossVectors(i,ci)),Ya.normalize(),vc.crossVectors(ci,Ya),a[0]=Ya.x,a[4]=vc.x,a[8]=ci.x,a[1]=Ya.y,a[5]=vc.y,a[9]=ci.y,a[2]=Ya.z,a[6]=vc.z,a[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],b=i[6],m=i[10],f=i[14],v=i[3],S=i[7],x=i[11],N=i[15],w=a[0],C=a[4],y=a[8],D=a[12],U=a[1],P=a[5],B=a[9],z=a[13],G=a[2],k=a[6],F=a[10],H=a[14],I=a[3],j=a[7],de=a[11],Te=a[15];return s[0]=r*w+o*U+l*G+c*I,s[4]=r*C+o*P+l*k+c*j,s[8]=r*y+o*B+l*F+c*de,s[12]=r*D+o*z+l*H+c*Te,s[1]=d*w+h*U+u*G+p*I,s[5]=d*C+h*P+u*k+p*j,s[9]=d*y+h*B+u*F+p*de,s[13]=d*D+h*z+u*H+p*Te,s[2]=g*w+b*U+m*G+f*I,s[6]=g*C+b*P+m*k+f*j,s[10]=g*y+b*B+m*F+f*de,s[14]=g*D+b*z+m*H+f*Te,s[3]=v*w+S*U+x*G+N*I,s[7]=v*C+S*P+x*k+N*j,s[11]=v*y+S*B+x*F+N*de,s[15]=v*D+S*z+x*H+N*Te,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],b=e[7],m=e[11],f=e[15],v=l*p-c*u,S=o*p-c*h,x=o*u-l*h,N=r*p-c*d,w=r*u-l*d,C=r*h-o*d;return n*(b*v-m*S+f*x)-i*(g*v-m*N+f*w)+a*(g*S-b*N+f*C)-s*(g*x-b*w+m*C)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return n*(r*d-o*c)-i*(s*d-o*l)+a*(s*c-r*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],b=e[13],m=e[14],f=e[15],v=n*o-i*r,S=n*l-a*r,x=n*c-s*r,N=i*l-a*o,w=i*c-s*o,C=a*c-s*l,y=d*b-h*g,D=d*m-u*g,U=d*f-p*g,P=h*m-u*b,B=h*f-p*b,z=u*f-p*m,G=v*z-S*B+x*P+N*U-w*D+C*y;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/G;return e[0]=(o*z-l*B+c*P)*k,e[1]=(a*B-i*z-s*P)*k,e[2]=(b*C-m*w+f*N)*k,e[3]=(u*w-h*C-p*N)*k,e[4]=(l*U-r*z-c*D)*k,e[5]=(n*z-a*U+s*D)*k,e[6]=(m*x-g*C-f*S)*k,e[7]=(d*C-u*x+p*S)*k,e[8]=(r*B-o*U+c*y)*k,e[9]=(i*U-n*B-s*y)*k,e[10]=(g*w-b*x+f*v)*k,e[11]=(h*x-d*w-p*v)*k,e[12]=(o*D-r*P-l*y)*k,e[13]=(n*P-i*D+a*y)*k,e[14]=(b*S-g*N-m*v)*k,e[15]=(d*N-h*S+u*v)*k,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,d=r+r,h=o+o,u=s*c,p=s*d,g=s*h,b=r*d,m=r*h,f=o*h,v=l*c,S=l*d,x=l*h,N=i.x,w=i.y,C=i.z;return a[0]=(1-(b+f))*N,a[1]=(p+x)*N,a[2]=(g-S)*N,a[3]=0,a[4]=(p-x)*w,a[5]=(1-(u+f))*w,a[6]=(m+v)*w,a[7]=0,a[8]=(g+S)*C,a[9]=(m-v)*C,a[10]=(1-(u+b))*C,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=yr.set(a[0],a[1],a[2]).length();const o=yr.set(a[4],a[5],a[6]).length(),l=yr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Xi.copy(this);const c=1/r,d=1/o,h=1/l;return Xi.elements[0]*=c,Xi.elements[1]*=c,Xi.elements[2]*=c,Xi.elements[4]*=d,Xi.elements[5]*=d,Xi.elements[6]*=d,Xi.elements[8]*=h,Xi.elements[9]*=h,Xi.elements[10]*=h,n.setFromRotationMatrix(Xi),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2*s/(n-e),h=2*s/(i-a),u=(n+e)/(n-e),p=(i+a)/(i-a);let g,b;if(l)g=s/(r-s),b=r*s/(r-s);else if(o===ra)g=-(r+s)/(r-s),b=-2*r*s/(r-s);else if(o===$u)g=-r/(r-s),b=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2/(n-e),h=2/(i-a),u=-(n+e)/(n-e),p=-(i+a)/(i-a);let g,b;if(l)g=1/(r-s),b=r/(r-s);else if(o===ra)g=-2/(r-s),b=-(r+s)/(r-s);else if(o===$u)g=-1/(r-s),b=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};nf.prototype.isMatrix4=!0;let nn=nf;const yr=new J,Xi=new nn,C1=new J(0,0,0),D1=new J(1,1,1),Ya=new J,vc=new J,ci=new J,Z0=new nn,K0=new No;class sr{constructor(e=0,n=0,i=0,a=sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],h=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ut(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Z0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Z0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return K0.setFromEuler(this),this.setFromQuaternion(K0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sr.DEFAULT_ORDER="XYZ";class pS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let N1=0;const Q0=new J,Sr=new No,xa=new nn,_c=new J,Vo=new J,U1=new J,L1=new No,$0=new J(1,0,0),J0=new J(0,1,0),ev=new J(0,0,1),tv={type:"added"},O1={type:"removed"},Mr={type:"childadded",child:null},Sd={type:"childremoved",child:null};class Zn extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:N1++}),this.uuid=Ql(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zn.DEFAULT_UP.clone();const e=new J,n=new sr,i=new No,a=new J(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new nn},normalMatrix:{value:new dt}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=Zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new pS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Sr.setFromAxisAngle(e,n),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(e,n){return Sr.setFromAxisAngle(e,n),this.quaternion.premultiply(Sr),this}rotateX(e){return this.rotateOnAxis($0,e)}rotateY(e){return this.rotateOnAxis(J0,e)}rotateZ(e){return this.rotateOnAxis(ev,e)}translateOnAxis(e,n){return Q0.copy(e).applyQuaternion(this.quaternion),this.position.add(Q0.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis($0,e)}translateY(e){return this.translateOnAxis(J0,e)}translateZ(e){return this.translateOnAxis(ev,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?_c.copy(e):_c.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(Vo,_c,this.up):xa.lookAt(_c,Vo,this.up),this.quaternion.setFromRotationMatrix(xa),a&&(xa.extractRotation(a.matrixWorld),Sr.setFromRotationMatrix(xa),this.quaternion.premultiply(Sr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(zt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(tv),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(O1),Sd.child=e,this.dispatchEvent(Sd),Sd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xa.multiply(e.parent.matrixWorld)),e.applyMatrix4(xa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(tv),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,e,U1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,L1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Zn.DEFAULT_UP=new J(0,1,0);Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xc extends Zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const P1={type:"move"};class Md{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const b of e.hand.values()){const m=n.getJointPose(b,i),f=this._getHandJoint(c,b);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(P1)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new xc;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const mS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Za={h:0,s:0,l:0},yc={h:0,s:0,l:0};function bd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Rt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ai){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=Nt.workingColorSpace){return this.r=e,this.g=n,this.b=i,Nt.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=Nt.workingColorSpace){if(e=M1(e,1),n=Ut(n,0,1),i=Ut(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=bd(r,s,e+1/3),this.g=bd(r,s,e),this.b=bd(r,s,e-1/3)}return Nt.colorSpaceToWorking(this,a),this}setStyle(e,n=Ai){function i(s){s!==void 0&&parseFloat(s)<1&&ot("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:ot("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);ot("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ai){const i=mS[e.toLowerCase()];return i!==void 0?this.setHex(i,n):ot("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}copyLinearToSRGB(e){return this.r=so(e.r),this.g=so(e.g),this.b=so(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ai){return Nt.workingToColorSpace(Vn.copy(this),e),Math.round(Ut(Vn.r*255,0,255))*65536+Math.round(Ut(Vn.g*255,0,255))*256+Math.round(Ut(Vn.b*255,0,255))}getHexString(e=Ai){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Nt.workingColorSpace){Nt.workingToColorSpace(Vn.copy(this),n);const i=Vn.r,a=Vn.g,s=Vn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=d<=.5?h/(r+o):h/(2-r-o),r){case i:l=(a-s)/h+(a<s?6:0);break;case a:l=(s-i)/h+2;break;case s:l=(i-a)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=Nt.workingColorSpace){return Nt.workingToColorSpace(Vn.copy(this),n),e.r=Vn.r,e.g=Vn.g,e.b=Vn.b,e}getStyle(e=Ai){Nt.workingToColorSpace(Vn.copy(this),e);const n=Vn.r,i=Vn.g,a=Vn.b;return e!==Ai?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(Za),this.setHSL(Za.h+e,Za.s+n,Za.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Za),e.getHSL(yc);const i=gd(Za.h,yc.h,n),a=gd(Za.s,yc.s,n),s=gd(Za.l,yc.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new Rt;Rt.NAMES=mS;class $m{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Rt(e),this.density=n}clone(){return new $m(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class gS extends Zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sr,this.environmentIntensity=1,this.environmentRotation=new sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Wi=new J,ya=new J,Ed=new J,Sa=new J,br=new J,Er=new J,nv=new J,Td=new J,Ad=new J,Rd=new J,wd=new fn,Cd=new fn,Dd=new fn;class Pi{constructor(e=new J,n=new J,i=new J){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Wi.subVectors(e,n),a.cross(Wi);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Wi.subVectors(a,n),ya.subVectors(i,n),Ed.subVectors(e,n);const r=Wi.dot(Wi),o=Wi.dot(ya),l=Wi.dot(Ed),c=ya.dot(ya),d=ya.dot(Ed),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*d)*u,g=(r*d-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,Sa)===null?!1:Sa.x>=0&&Sa.y>=0&&Sa.x+Sa.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,Sa)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sa.x),l.addScaledVector(r,Sa.y),l.addScaledVector(o,Sa.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return wd.setScalar(0),Cd.setScalar(0),Dd.setScalar(0),wd.fromBufferAttribute(e,n),Cd.fromBufferAttribute(e,i),Dd.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(wd,s.x),r.addScaledVector(Cd,s.y),r.addScaledVector(Dd,s.z),r}static isFrontFacing(e,n,i,a){return Wi.subVectors(i,n),ya.subVectors(e,n),Wi.cross(ya).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wi.subVectors(this.c,this.b),ya.subVectors(this.a,this.b),Wi.cross(ya).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Pi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Pi.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;br.subVectors(a,i),Er.subVectors(s,i),Td.subVectors(e,i);const l=br.dot(Td),c=Er.dot(Td);if(l<=0&&c<=0)return n.copy(i);Ad.subVectors(e,a);const d=br.dot(Ad),h=Er.dot(Ad);if(d>=0&&h<=d)return n.copy(a);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(br,r);Rd.subVectors(e,s);const p=br.dot(Rd),g=Er.dot(Rd);if(g>=0&&p<=g)return n.copy(s);const b=p*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Er,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return nv.subVectors(s,a),o=(h-d)/(h-d+(p-g)),n.copy(a).addScaledVector(nv,o);const f=1/(m+b+u);return r=b*f,o=u*f,n.copy(i).addScaledVector(br,r).addScaledVector(Er,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hr{constructor(e=new J(1/0,1/0,1/0),n=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(qi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(qi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=qi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,qi):qi.fromBufferAttribute(s,r),qi.applyMatrix4(e.matrixWorld),this.expandByPoint(qi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sc.copy(i.boundingBox)),Sc.applyMatrix4(e.matrixWorld),this.union(Sc)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,qi),qi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ko),Mc.subVectors(this.max,ko),Tr.subVectors(e.a,ko),Ar.subVectors(e.b,ko),Rr.subVectors(e.c,ko),Ka.subVectors(Ar,Tr),Qa.subVectors(Rr,Ar),Ls.subVectors(Tr,Rr);let n=[0,-Ka.z,Ka.y,0,-Qa.z,Qa.y,0,-Ls.z,Ls.y,Ka.z,0,-Ka.x,Qa.z,0,-Qa.x,Ls.z,0,-Ls.x,-Ka.y,Ka.x,0,-Qa.y,Qa.x,0,-Ls.y,Ls.x,0];return!Nd(n,Tr,Ar,Rr,Mc)||(n=[1,0,0,0,1,0,0,0,1],!Nd(n,Tr,Ar,Rr,Mc))?!1:(bc.crossVectors(Ka,Qa),n=[bc.x,bc.y,bc.z],Nd(n,Tr,Ar,Rr,Mc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,qi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(qi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ma),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ma=[new J,new J,new J,new J,new J,new J,new J,new J],qi=new J,Sc=new hr,Tr=new J,Ar=new J,Rr=new J,Ka=new J,Qa=new J,Ls=new J,ko=new J,Mc=new J,bc=new J,Os=new J;function Nd(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){Os.fromArray(t,s);const o=a.x*Math.abs(Os.x)+a.y*Math.abs(Os.y)+a.z*Math.abs(Os.z),l=e.dot(Os),c=n.dot(Os),d=i.dot(Os);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const mn=new J,Ec=new Gt;let z1=0;class Xt extends dr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:z1++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=V0,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ec.fromBufferAttribute(this,n),Ec.applyMatrix3(e),this.setXY(n,Ec.x,Ec.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Go(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=ti(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Go(n,this.array)),n}setX(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Go(n,this.array)),n}setY(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Go(n,this.array)),n}setZ(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Go(n,this.array)),n}setW(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=ti(n,this.array),i=ti(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=ti(n,this.array),i=ti(i,this.array),a=ti(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=ti(n,this.array),i=ti(i,this.array),a=ti(a,this.array),s=ti(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==V0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class vS extends Xt{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class _S extends Xt{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Bi extends Xt{constructor(e,n,i){super(new Float32Array(e),n,i)}}const I1=new hr,Xo=new J,Ud=new J;class pr{constructor(e=new J,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):I1.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Xo.subVectors(e,this.center);const n=Xo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Xo,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ud.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Xo.copy(e.center).add(Ud)),this.expandByPoint(Xo.copy(e.center).sub(Ud))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let B1=0;const Ei=new nn,Ld=new Zn,wr=new J,ui=new hr,Wo=new hr,Tn=new J;class Xn extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:B1++}),this.uuid=Ql(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(_1(e)?_S:vS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new dt().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,n,i){return Ei.makeTranslation(e,n,i),this.applyMatrix4(Ei),this}scale(e,n,i){return Ei.makeScale(e,n,i),this.applyMatrix4(Ei),this}lookAt(e){return Ld.lookAt(e),Ld.updateMatrix(),this.applyMatrix4(Ld.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(wr).negate(),this.translate(wr.x,wr.y,wr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Bi(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];ui.setFromBufferAttribute(s),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){const i=this.boundingSphere.center;if(ui.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Wo.setFromBufferAttribute(o),this.morphTargetsRelative?(Tn.addVectors(ui.min,Wo.min),ui.expandByPoint(Tn),Tn.addVectors(ui.max,Wo.max),ui.expandByPoint(Tn)):(ui.expandByPoint(Wo.min),ui.expandByPoint(Wo.max))}ui.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Tn.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Tn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Tn.fromBufferAttribute(o,c),l&&(wr.fromBufferAttribute(e,c),Tn.add(wr)),a=Math.max(a,i.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Xt(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new J,l[y]=new J;const c=new J,d=new J,h=new J,u=new Gt,p=new Gt,g=new Gt,b=new J,m=new J;function f(y,D,U){c.fromBufferAttribute(i,y),d.fromBufferAttribute(i,D),h.fromBufferAttribute(i,U),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,D),g.fromBufferAttribute(s,U),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const P=1/(p.x*g.y-g.x*p.y);isFinite(P)&&(b.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(P),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(P),o[y].add(b),o[D].add(b),o[U].add(b),l[y].add(m),l[D].add(m),l[U].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let y=0,D=v.length;y<D;++y){const U=v[y],P=U.start,B=U.count;for(let z=P,G=P+B;z<G;z+=3)f(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const S=new J,x=new J,N=new J,w=new J;function C(y){N.fromBufferAttribute(a,y),w.copy(N);const D=o[y];S.copy(D),S.sub(N.multiplyScalar(N.dot(D))).normalize(),x.crossVectors(w,D);const P=x.dot(l[y])<0?-1:1;r.setXYZW(y,S.x,S.y,S.z,P)}for(let y=0,D=v.length;y<D;++y){const U=v[y],P=U.start,B=U.count;for(let z=P,G=P+B;z<G;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Xt(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new J,s=new J,r=new J,o=new J,l=new J,c=new J,d=new J,h=new J;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),b=e.getX(u+1),m=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,b),r.fromBufferAttribute(n,m),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Tn.fromBufferAttribute(e,n),Tn.normalize(),e.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let b=0,m=l.length;b<m;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new Xt(u,d,h)}if(this.index===null)return ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Xn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(a[l]=d,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let F1=0;class Uo extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:F1++}),this.uuid=Ql(),this.name="",this.type="Material",this.blending=Qs,this.side=Rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xh,this.blendDst=Wh,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Rt(0,0,0),this.blendAlpha=0,this.depthFunc=_o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=G0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){ot(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){ot(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(i.blending=this.blending),this.side!==Rs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xh&&(i.blendSrc=this.blendSrc),this.blendDst!==Wh&&(i.blendDst=this.blendDst),this.blendEquation!==Vs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_o&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==G0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_r&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_r&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_r&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Rt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Gt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Gt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ba=new J,Od=new J,Tc=new J,$a=new J,Pd=new J,Ac=new J,zd=new J;class Jm{constructor(e=new J,n=new J(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ba)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ba.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ba.copy(this.origin).addScaledVector(this.direction,n),ba.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Od.copy(e).add(n).multiplyScalar(.5),Tc.copy(n).sub(e).normalize(),$a.copy(this.origin).sub(Od);const s=e.distanceTo(n)*.5,r=-this.direction.dot(Tc),o=$a.dot(this.direction),l=-$a.dot(Tc),c=$a.lengthSq(),d=Math.abs(1-r*r);let h,u,p,g;if(d>0)if(h=r*l-o,u=r*o-l,g=s*d,h>=0)if(u>=-g)if(u<=g){const b=1/d;h*=b,u*=b,p=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(Od).addScaledVector(Tc,u),p}intersectSphere(e,n){ba.subVectors(e.center,this.origin);const i=ba.dot(this.direction),a=ba.dot(ba)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,ba)!==null}intersectTriangle(e,n,i,a,s){Pd.subVectors(n,e),Ac.subVectors(i,e),zd.crossVectors(Pd,Ac);let r=this.direction.dot(zd),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;$a.subVectors(this.origin,e);const l=o*this.direction.dot(Ac.crossVectors($a,Ac));if(l<0)return null;const c=o*this.direction.dot(Pd.cross($a));if(c<0||l+c>r)return null;const d=-o*$a.dot(zd);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class xS extends Uo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.combine=Qy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const iv=new nn,Ps=new Jm,Rc=new pr,av=new J,wc=new J,Cc=new J,Dc=new J,Id=new J,Nc=new J,sv=new J,Uc=new J;class Hi extends Zn{constructor(e=new Xn,n=new xS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Nc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Id.fromBufferAttribute(h,e),r?Nc.addScaledVector(Id,d):Nc.addScaledVector(Id.sub(n),d))}n.add(Nc)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rc.copy(i.boundingSphere),Rc.applyMatrix4(s),Ps.copy(e.ray).recast(e.near),!(Rc.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(Rc,av)===null||Ps.origin.distanceToSquared(av)>(e.far-e.near)**2))&&(iv.copy(s).invert(),Ps.copy(e.ray).applyMatrix4(iv),!(i.boundingBox!==null&&Ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ps)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,N=S;x<N;x+=3){const w=o.getX(x),C=o.getX(x+1),y=o.getX(x+2);a=Lc(this,f,e,i,c,d,h,w,C,y),a&&(a.faceIndex=Math.floor(x/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let m=g,f=b;m<f;m+=3){const v=o.getX(m),S=o.getX(m+1),x=o.getX(m+2);a=Lc(this,r,e,i,c,d,h,v,S,x),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let x=v,N=S;x<N;x+=3){const w=x,C=x+1,y=x+2;a=Lc(this,f,e,i,c,d,h,w,C,y),a&&(a.faceIndex=Math.floor(x/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let m=g,f=b;m<f;m+=3){const v=m,S=m+1,x=m+2;a=Lc(this,r,e,i,c,d,h,v,S,x),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function H1(t,e,n,i,a,s,r,o){let l;if(e.side===si?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===Rs,o),l===null)return null;Uc.copy(o),Uc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Uc);return c<n.near||c>n.far?null:{distance:c,point:Uc.clone(),object:t}}function Lc(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,wc),t.getVertexPosition(l,Cc),t.getVertexPosition(c,Dc);const d=H1(t,e,n,i,wc,Cc,Dc,sv);if(d){const h=new J;Pi.getBarycoord(sv,wc,Cc,Dc,h),a&&(d.uv=Pi.getInterpolatedAttribute(a,o,l,c,h,new Gt)),s&&(d.uv1=Pi.getInterpolatedAttribute(s,o,l,c,h,new Gt)),r&&(d.normal=Pi.getInterpolatedAttribute(r,o,l,c,h,new J),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new J,materialIndex:0};Pi.getNormal(wc,Cc,Dc,u.normal),d.face=u,d.barycoord=h}return d}class yS extends Yn{constructor(e=null,n=1,i=1,a,s,r,o,l,c=In,d=In,h,u){super(null,r,o,l,c,d,a,s,h,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zr extends Xt{constructor(e,n,i,a=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Cr=new nn,rv=new nn,Oc=[],ov=new hr,G1=new nn,qo=new Hi,jo=new pr;class lv extends Hi{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Zr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,G1)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new hr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Cr),ov.copy(e.boundingBox).applyMatrix4(Cr),this.boundingBox.union(ov)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new pr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Cr),jo.copy(e.boundingSphere).applyMatrix4(Cr),this.boundingSphere.union(jo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(e,n){const i=this.matrixWorld,a=this.count;if(qo.geometry=this.geometry,qo.material=this.material,qo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jo.copy(this.boundingSphere),jo.applyMatrix4(i),e.ray.intersectsSphere(jo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,Cr),rv.multiplyMatrices(i,Cr),qo.matrixWorld=rv,qo.raycast(e,Oc);for(let r=0,o=Oc.length;r<o;r++){const l=Oc[r];l.instanceId=s,l.object=this,n.push(l)}Oc.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new Zr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new yS(new Float32Array(a*this.count),a,this.count,Wm,Yi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Bd=new J,V1=new J,k1=new dt;class Gs{constructor(e=new J(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=Bd.subVectors(i,n).cross(V1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const a=e.delta(Bd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||k1.getNormalMatrix(e),a=this.coplanarPoint(Bd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zs=new pr,X1=new Gt(.5,.5),Pc=new J;class SS{constructor(e=new Gs,n=new Gs,i=new Gs,a=new Gs,s=new Gs,r=new Gs){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ra,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],h=s[5],u=s[6],p=s[7],g=s[8],b=s[9],m=s[10],f=s[11],v=s[12],S=s[13],x=s[14],N=s[15];if(a[0].setComponents(c-r,p-d,f-g,N-v).normalize(),a[1].setComponents(c+r,p+d,f+g,N+v).normalize(),a[2].setComponents(c+o,p+h,f+b,N+S).normalize(),a[3].setComponents(c-o,p-h,f-b,N-S).normalize(),i)a[4].setComponents(l,u,m,x).normalize(),a[5].setComponents(c-l,p-u,f-m,N-x).normalize();else if(a[4].setComponents(c-l,p-u,f-m,N-x).normalize(),n===ra)a[5].setComponents(c+l,p+u,f+m,N+x).normalize();else if(n===$u)a[5].setComponents(l,u,m,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(e){zs.center.set(0,0,0);const n=X1.distanceTo(e.center);return zs.radius=.7071067811865476+n,zs.applyMatrix4(e.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Pc.x=a.normal.x>0?e.max.x:e.min.x,Pc.y=a.normal.y>0?e.max.y:e.min.y,Pc.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Pc)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class MS extends Uo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ef=new J,tf=new J,cv=new nn,Yo=new Jm,zc=new pr,Fd=new J,uv=new J;class W1 extends Zn{constructor(e=new Xn,n=new MS){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)ef.fromBufferAttribute(n,a-1),tf.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=ef.distanceTo(tf);e.setAttribute("lineDistance",new Bi(i,1))}else ot("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zc.copy(i.boundingSphere),zc.applyMatrix4(a),zc.radius+=s,e.ray.intersectsSphere(zc)===!1)return;cv.copy(a).invert(),Yo.copy(e.ray).applyMatrix4(cv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let b=p,m=g-1;b<m;b+=c){const f=d.getX(b),v=d.getX(b+1),S=Ic(this,e,Yo,l,f,v,b);S&&n.push(S)}if(this.isLineLoop){const b=d.getX(g-1),m=d.getX(p),f=Ic(this,e,Yo,l,b,m,g-1);f&&n.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let b=p,m=g-1;b<m;b+=c){const f=Ic(this,e,Yo,l,b,b+1,b);f&&n.push(f)}if(this.isLineLoop){const b=Ic(this,e,Yo,l,g-1,p,g-1);b&&n.push(b)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ic(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(ef.fromBufferAttribute(o,a),tf.fromBufferAttribute(o,s),n.distanceSqToSegment(ef,tf,Fd,uv)>i)return;Fd.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Fd);if(!(c<e.near||c>e.far))return{distance:c,point:uv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const fv=new J,dv=new J;class gu extends W1{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)fv.fromBufferAttribute(n,a),dv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+fv.distanceTo(dv);e.setAttribute("lineDistance",new Bi(i,1))}else ot("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class q1 extends Uo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hv=new nn,Up=new Jm,Bc=new pr,Fc=new J;class Lp extends Zn{constructor(e=new Xn,n=new q1){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bc.copy(i.boundingSphere),Bc.applyMatrix4(a),Bc.radius+=s,e.ray.intersectsSphere(Bc)===!1)return;hv.copy(a).invert(),Up.copy(e.ray).applyMatrix4(hv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,b=p;g<b;g++){const m=c.getX(g);Fc.fromBufferAttribute(h,m),pv(Fc,m,l,a,e,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let g=u,b=p;g<b;g++)Fc.fromBufferAttribute(h,g),pv(Fc,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function pv(t,e,n,i,a,s,r){const o=Up.distanceSqToPoint(t);if(o<n){const l=new J;Up.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class bS extends Yn{constructor(e=[],n=ir,i,a,s,r,o,l,c,d){super(e,n,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class yo extends Yn{constructor(e,n,i=ua,a,s,r,o=In,l=In,c,d=Xa,h=1){if(d!==Xa&&d!==Ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:h};super(u,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Qm(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class j1 extends yo{constructor(e,n=ua,i=ir,a,s,r=In,o=In,l,c=Xa){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,n,i,a,s,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ES extends Yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class rr extends Xn{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new Bi(c,3)),this.setAttribute("normal",new Bi(d,3)),this.setAttribute("uv",new Bi(h,2));function g(b,m,f,v,S,x,N,w,C,y,D){const U=x/C,P=N/y,B=x/2,z=N/2,G=w/2,k=C+1,F=y+1;let H=0,I=0;const j=new J;for(let de=0;de<F;de++){const Te=de*P-z;for(let Oe=0;Oe<k;Oe++){const et=Oe*U-B;j[b]=et*v,j[m]=Te*S,j[f]=G,c.push(j.x,j.y,j.z),j[b]=0,j[m]=0,j[f]=w>0?1:-1,d.push(j.x,j.y,j.z),h.push(Oe/C),h.push(1-de/y),H+=1}}for(let de=0;de<y;de++)for(let Te=0;Te<C;Te++){const Oe=u+Te+k*de,et=u+Te+k*(de+1),$e=u+(Te+1)+k*(de+1),st=u+(Te+1)+k*de;l.push(Oe,et,st),l.push(et,$e,st),I+=6}o.addGroup(p,I,D),p+=I,u+=H}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Hc=new J,Gc=new J,Hd=new J,Vc=new Pi;class Y1 extends Xn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const a=Math.pow(10,4),s=Math.cos(mu*n),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:b,b:m,c:f}=Vc;if(b.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Vc.getNormal(Hd),h[0]=`${Math.round(b.x*a)},${Math.round(b.y*a)},${Math.round(b.z*a)}`,h[1]=`${Math.round(m.x*a)},${Math.round(m.y*a)},${Math.round(m.z*a)}`,h[2]=`${Math.round(f.x*a)},${Math.round(f.y*a)},${Math.round(f.z*a)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const S=(v+1)%3,x=h[v],N=h[S],w=Vc[d[v]],C=Vc[d[S]],y=`${x}_${N}`,D=`${N}_${x}`;D in u&&u[D]?(Hd.dot(u[D].normal)<=s&&(p.push(w.x,w.y,w.z),p.push(C.x,C.y,C.z)),u[D]=null):y in u||(u[y]={index0:c[v],index1:c[S],normal:Hd.clone()})}}for(const g in u)if(u[g]){const{index0:b,index1:m}=u[g];Hc.fromBufferAttribute(o,b),Gc.fromBufferAttribute(o,m),p.push(Hc.x,Hc.y,Hc.z),p.push(Gc.x,Gc.y,Gc.z)}this.setAttribute("position",new Bi(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ef extends Xn{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,h=e/o,u=n/l,p=[],g=[],b=[],m=[];for(let f=0;f<d;f++){const v=f*u-r;for(let S=0;S<c;S++){const x=S*h-s;g.push(x,-v,0),b.push(0,0,1),m.push(S/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){const S=v+c*f,x=v+c*(f+1),N=v+1+c*(f+1),w=v+1+c*f;p.push(S,x,w),p.push(x,N,w)}this.setIndex(p),this.setAttribute("position",new Bi(g,3)),this.setAttribute("normal",new Bi(b,3)),this.setAttribute("uv",new Bi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ef(e.width,e.height,e.widthSegments,e.heightSegments)}}function So(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];if(mv(a))a.isRenderTargetTexture?(ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone();else if(Array.isArray(a))if(mv(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();e[n][i]=s}else e[n][i]=a.slice();else e[n][i]=a}}return e}function Wn(t){const e={};for(let n=0;n<t.length;n++){const i=So(t[n]);for(const a in i)e[a]=i[a]}return e}function mv(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function Z1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function TS(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Nt.workingColorSpace}const K1={clone:So,merge:Wn};var Q1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Uo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Q1,this.fragmentShader=$1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=So(e.uniforms),this.uniformsGroups=Z1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const a=e.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new Rt().setHex(a.value);break;case"v2":this.uniforms[i].value=new Gt().fromArray(a.value);break;case"v3":this.uniforms[i].value=new J().fromArray(a.value);break;case"v4":this.uniforms[i].value=new fn().fromArray(a.value);break;case"m3":this.uniforms[i].value=new dt().fromArray(a.value);break;case"m4":this.uniforms[i].value=new nn().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class J1 extends Bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class eT extends Uo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=u1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class tT extends Uo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const kc=new J,Xc=new No,Ji=new J;class AS extends Zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=ra,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(kc,Xc,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Xc,Ji.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(kc,Xc,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Xc,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ja=new J,gv=new Gt,vv=new Gt;class Di extends AS{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Np*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(mu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Np*2*Math.atan(Math.tan(mu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ja.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ja.x,Ja.y).multiplyScalar(-e/Ja.z),Ja.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ja.x,Ja.y).multiplyScalar(-e/Ja.z)}getViewSize(e,n){return this.getViewBounds(e,gv,vv),n.subVectors(vv,gv)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(mu*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class eg extends AS{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Dr=-90,Nr=1;class nT extends Zn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Di(Dr,Nr,e,n);a.layers=this.layers,this.add(a);const s=new Di(Dr,Nr,e,n);s.layers=this.layers,this.add(s);const r=new Di(Dr,Nr,e,n);r.layers=this.layers,this.add(r);const o=new Di(Dr,Nr,e,n);o.layers=this.layers,this.add(o);const l=new Di(Dr,Nr,e,n);l.layers=this.layers,this.add(l);const c=new Di(Dr,Nr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===ra)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$u)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class iT extends Di{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const og=class og{constructor(e,n,i,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,a){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=a,this}};og.prototype.isMatrix2=!0;let _v=og;function xv(t,e,n,i){const a=aT(i);switch(n){case uS:return t*e;case Wm:return t*e/a.components*a.byteLength;case qm:return t*e/a.components*a.byteLength;case ar:return t*e*2/a.components*a.byteLength;case jm:return t*e*2/a.components*a.byteLength;case fS:return t*e*3/a.components*a.byteLength;case Zi:return t*e*4/a.components*a.byteLength;case Ym:return t*e*4/a.components*a.byteLength;case fu:case du:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case hu:case pu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case np:case ap:return Math.max(t,16)*Math.max(e,8)/4;case tp:case ip:return Math.max(t,8)*Math.max(e,8)/2;case sp:case rp:case lp:case cp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case op:case Yu:case up:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case fp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case dp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case hp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case pp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case mp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case gp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case vp:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case _p:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case xp:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case yp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Mp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case bp:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Ep:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Tp:case Ap:case Rp:return Math.ceil(t/4)*Math.ceil(e/4)*16;case wp:case Cp:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Zu:case Dp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function aT(t){switch(t){case Oi:case rS:return{byteLength:1,components:1};case Pl:case oS:case ka:return{byteLength:2,components:1};case km:case Xm:return{byteLength:2,components:4};case ua:case Vm:case Yi:return{byteLength:4,components:1};case lS:case cS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Gm}}));typeof window<"u"&&(window.__THREE__?ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Gm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function RS(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function sT(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],b=h[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,h[u]=b)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const b=h[p];t.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var rT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,oT=`#ifdef USE_ALPHAHASH
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
#endif`,lT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,uT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,fT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dT=`#ifdef USE_AOMAP
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
#endif`,hT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pT=`#ifdef USE_BATCHING
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
#endif`,mT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,gT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,_T=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,xT=`#ifdef USE_IRIDESCENCE
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
#endif`,yT=`#ifdef USE_BUMPMAP
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
#endif`,ST=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,MT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,bT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ET=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,TT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,AT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,RT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,wT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,CT=`#define PI 3.141592653589793
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
} // validated`,DT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,NT=`vec3 transformedNormal = objectNormal;
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
#endif`,UT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,LT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,OT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,PT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zT="gl_FragColor = linearToOutputTexel( gl_FragColor );",IT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,BT=`#ifdef USE_ENVMAP
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
#endif`,FT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,HT=`#ifdef USE_ENVMAP
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
#endif`,GT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,VT=`#ifdef USE_ENVMAP
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
#endif`,kT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,XT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,WT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,jT=`#ifdef USE_GRADIENTMAP
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
}`,YT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ZT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,KT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,QT=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,$T=`#ifdef USE_ENVMAP
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
#endif`,JT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,eA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,iA=`PhysicalMaterial material;
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
#endif`,aA=`uniform sampler2D dfgLUT;
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
}`,sA=`
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
#endif`,rA=`#if defined( RE_IndirectDiffuse )
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
#endif`,oA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lA=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,cA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,uA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,fA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,dA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gA=`#if defined( USE_POINTS_UV )
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
#endif`,vA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_A=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,yA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,SA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,MA=`#ifdef USE_MORPHTARGETS
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
#endif`,bA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,EA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,TA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,AA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,RA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,CA=`#ifdef USE_NORMALMAP
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
#endif`,DA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,NA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,UA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,LA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,OA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,PA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,zA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,IA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,BA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,FA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,HA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,GA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,VA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,kA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,XA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,WA=`float getShadowMask() {
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
}`,qA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,jA=`#ifdef USE_SKINNING
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
#endif`,YA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ZA=`#ifdef USE_SKINNING
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
#endif`,KA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,QA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$A=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,JA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,e2=`#ifdef USE_TRANSMISSION
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
#endif`,t2=`#ifdef USE_TRANSMISSION
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
#endif`,n2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,i2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,a2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const r2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,o2=`uniform sampler2D t2D;
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
}`,l2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,c2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,u2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d2=`#include <common>
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
}`,h2=`#if DEPTH_PACKING == 3200
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
}`,p2=`#define DISTANCE
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
}`,m2=`#define DISTANCE
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
}`,g2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,v2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,_2=`uniform float scale;
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
}`,x2=`uniform vec3 diffuse;
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
}`,y2=`#include <common>
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
}`,S2=`uniform vec3 diffuse;
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
}`,M2=`#define LAMBERT
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
}`,b2=`#define LAMBERT
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
}`,E2=`#define MATCAP
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
}`,T2=`#define MATCAP
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
}`,A2=`#define NORMAL
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
}`,R2=`#define NORMAL
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
}`,w2=`#define PHONG
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
}`,C2=`#define PHONG
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
}`,D2=`#define STANDARD
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
}`,N2=`#define STANDARD
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
}`,U2=`#define TOON
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
}`,L2=`#define TOON
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
}`,O2=`uniform float size;
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
}`,P2=`uniform vec3 diffuse;
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
}`,z2=`#include <common>
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
}`,I2=`uniform vec3 color;
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
}`,B2=`uniform float rotation;
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
}`,F2=`uniform vec3 diffuse;
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
}`,_t={alphahash_fragment:rT,alphahash_pars_fragment:oT,alphamap_fragment:lT,alphamap_pars_fragment:cT,alphatest_fragment:uT,alphatest_pars_fragment:fT,aomap_fragment:dT,aomap_pars_fragment:hT,batching_pars_vertex:pT,batching_vertex:mT,begin_vertex:gT,beginnormal_vertex:vT,bsdfs:_T,iridescence_fragment:xT,bumpmap_pars_fragment:yT,clipping_planes_fragment:ST,clipping_planes_pars_fragment:MT,clipping_planes_pars_vertex:bT,clipping_planes_vertex:ET,color_fragment:TT,color_pars_fragment:AT,color_pars_vertex:RT,color_vertex:wT,common:CT,cube_uv_reflection_fragment:DT,defaultnormal_vertex:NT,displacementmap_pars_vertex:UT,displacementmap_vertex:LT,emissivemap_fragment:OT,emissivemap_pars_fragment:PT,colorspace_fragment:zT,colorspace_pars_fragment:IT,envmap_fragment:BT,envmap_common_pars_fragment:FT,envmap_pars_fragment:HT,envmap_pars_vertex:GT,envmap_physical_pars_fragment:$T,envmap_vertex:VT,fog_vertex:kT,fog_pars_vertex:XT,fog_fragment:WT,fog_pars_fragment:qT,gradientmap_pars_fragment:jT,lightmap_pars_fragment:YT,lights_lambert_fragment:ZT,lights_lambert_pars_fragment:KT,lights_pars_begin:QT,lights_toon_fragment:JT,lights_toon_pars_fragment:eA,lights_phong_fragment:tA,lights_phong_pars_fragment:nA,lights_physical_fragment:iA,lights_physical_pars_fragment:aA,lights_fragment_begin:sA,lights_fragment_maps:rA,lights_fragment_end:oA,lightprobes_pars_fragment:lA,logdepthbuf_fragment:cA,logdepthbuf_pars_fragment:uA,logdepthbuf_pars_vertex:fA,logdepthbuf_vertex:dA,map_fragment:hA,map_pars_fragment:pA,map_particle_fragment:mA,map_particle_pars_fragment:gA,metalnessmap_fragment:vA,metalnessmap_pars_fragment:_A,morphinstance_vertex:xA,morphcolor_vertex:yA,morphnormal_vertex:SA,morphtarget_pars_vertex:MA,morphtarget_vertex:bA,normal_fragment_begin:EA,normal_fragment_maps:TA,normal_pars_fragment:AA,normal_pars_vertex:RA,normal_vertex:wA,normalmap_pars_fragment:CA,clearcoat_normal_fragment_begin:DA,clearcoat_normal_fragment_maps:NA,clearcoat_pars_fragment:UA,iridescence_pars_fragment:LA,opaque_fragment:OA,packing:PA,premultiplied_alpha_fragment:zA,project_vertex:IA,dithering_fragment:BA,dithering_pars_fragment:FA,roughnessmap_fragment:HA,roughnessmap_pars_fragment:GA,shadowmap_pars_fragment:VA,shadowmap_pars_vertex:kA,shadowmap_vertex:XA,shadowmask_pars_fragment:WA,skinbase_vertex:qA,skinning_pars_vertex:jA,skinning_vertex:YA,skinnormal_vertex:ZA,specularmap_fragment:KA,specularmap_pars_fragment:QA,tonemapping_fragment:$A,tonemapping_pars_fragment:JA,transmission_fragment:e2,transmission_pars_fragment:t2,uv_pars_fragment:n2,uv_pars_vertex:i2,uv_vertex:a2,worldpos_vertex:s2,background_vert:r2,background_frag:o2,backgroundCube_vert:l2,backgroundCube_frag:c2,cube_vert:u2,cube_frag:f2,depth_vert:d2,depth_frag:h2,distance_vert:p2,distance_frag:m2,equirect_vert:g2,equirect_frag:v2,linedashed_vert:_2,linedashed_frag:x2,meshbasic_vert:y2,meshbasic_frag:S2,meshlambert_vert:M2,meshlambert_frag:b2,meshmatcap_vert:E2,meshmatcap_frag:T2,meshnormal_vert:A2,meshnormal_frag:R2,meshphong_vert:w2,meshphong_frag:C2,meshphysical_vert:D2,meshphysical_frag:N2,meshtoon_vert:U2,meshtoon_frag:L2,points_vert:O2,points_frag:P2,shadow_vert:z2,shadow_frag:I2,sprite_vert:B2,sprite_frag:F2},Fe={common:{diffuse:{value:new Rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new Rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new Rt(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},ta={basic:{uniforms:Wn([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:Wn([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Rt(0)},envMapIntensity:{value:1}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:Wn([Fe.common,Fe.specularmap,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,Fe.lights,{emissive:{value:new Rt(0)},specular:{value:new Rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:Wn([Fe.common,Fe.envmap,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.roughnessmap,Fe.metalnessmap,Fe.fog,Fe.lights,{emissive:{value:new Rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:Wn([Fe.common,Fe.aomap,Fe.lightmap,Fe.emissivemap,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.gradientmap,Fe.fog,Fe.lights,{emissive:{value:new Rt(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:Wn([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,Fe.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:Wn([Fe.points,Fe.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:Wn([Fe.common,Fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:Wn([Fe.common,Fe.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:Wn([Fe.common,Fe.bumpmap,Fe.normalmap,Fe.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:Wn([Fe.sprite,Fe.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distance:{uniforms:Wn([Fe.common,Fe.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distance_vert,fragmentShader:_t.distance_frag},shadow:{uniforms:Wn([Fe.lights,Fe.fog,{color:{value:new Rt(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};ta.physical={uniforms:Wn([ta.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new Rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new Rt(0)},specularColor:{value:new Rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const Wc={r:0,b:0,g:0},H2=new nn,wS=new dt;wS.set(-1,0,0,0,1,0,0,0,1);function G2(t,e,n,i,a,s){const r=new Rt(0);let o=a===!0?0:1,l,c,d=null,h=0,u=null;function p(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){const x=v.backgroundBlurriness>0;S=e.get(S,x)}return S}function g(v){let S=!1;const x=p(v);x===null?m(r,o):x&&x.isColor&&(m(x,1),S=!0);const N=t.xr.getEnvironmentBlendMode();N==="additive"?n.buffers.color.setClear(0,0,0,1,s):N==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function b(v,S){const x=p(S);x&&(x.isCubeTexture||x.mapping===bf)?(c===void 0&&(c=new Hi(new rr(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:So(ta.backgroundCube.uniforms),vertexShader:ta.backgroundCube.vertexShader,fragmentShader:ta.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(N,w,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(H2.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(wS),c.material.toneMapped=Nt.getTransfer(x.colorSpace)!==qt,(d!==x||h!==x.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,d=x,h=x.version,u=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Hi(new Ef(2,2),new Bn({name:"BackgroundMaterial",uniforms:So(ta.background.uniforms),vertexShader:ta.background.vertexShader,fragmentShader:ta.background.fragmentShader,side:Rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Nt.getTransfer(x.colorSpace)!==qt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||h!==x.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,d=x,h=x.version,u=t.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,S){v.getRGB(Wc,TS(t)),n.buffers.color.setClear(Wc.r,Wc.g,Wc.b,S,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,S=1){r.set(v),o=S,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:g,addToRenderList:b,dispose:f}}function V2(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(P,B,z,G,k){let F=!1;const H=h(P,G,z,B);s!==H&&(s=H,c(s.object)),F=p(P,G,z,k),F&&g(P,G,z,k),k!==null&&e.update(k,t.ELEMENT_ARRAY_BUFFER),(F||r)&&(r=!1,x(P,B,z,G),k!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function l(){return t.createVertexArray()}function c(P){return t.bindVertexArray(P)}function d(P){return t.deleteVertexArray(P)}function h(P,B,z,G){const k=G.wireframe===!0;let F=i[B.id];F===void 0&&(F={},i[B.id]=F);const H=P.isInstancedMesh===!0?P.id:0;let I=F[H];I===void 0&&(I={},F[H]=I);let j=I[z.id];j===void 0&&(j={},I[z.id]=j);let de=j[k];return de===void 0&&(de=u(l()),j[k]=de),de}function u(P){const B=[],z=[],G=[];for(let k=0;k<n;k++)B[k]=0,z[k]=0,G[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:z,attributeDivisors:G,object:P,attributes:{},index:null}}function p(P,B,z,G){const k=s.attributes,F=B.attributes;let H=0;const I=z.getAttributes();for(const j in I)if(I[j].location>=0){const Te=k[j];let Oe=F[j];if(Oe===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(Oe=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(Oe=P.instanceColor)),Te===void 0||Te.attribute!==Oe||Oe&&Te.data!==Oe.data)return!0;H++}return s.attributesNum!==H||s.index!==G}function g(P,B,z,G){const k={},F=B.attributes;let H=0;const I=z.getAttributes();for(const j in I)if(I[j].location>=0){let Te=F[j];Te===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(Te=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(Te=P.instanceColor));const Oe={};Oe.attribute=Te,Te&&Te.data&&(Oe.data=Te.data),k[j]=Oe,H++}s.attributes=k,s.attributesNum=H,s.index=G}function b(){const P=s.newAttributes;for(let B=0,z=P.length;B<z;B++)P[B]=0}function m(P){f(P,0)}function f(P,B){const z=s.newAttributes,G=s.enabledAttributes,k=s.attributeDivisors;z[P]=1,G[P]===0&&(t.enableVertexAttribArray(P),G[P]=1),k[P]!==B&&(t.vertexAttribDivisor(P,B),k[P]=B)}function v(){const P=s.newAttributes,B=s.enabledAttributes;for(let z=0,G=B.length;z<G;z++)B[z]!==P[z]&&(t.disableVertexAttribArray(z),B[z]=0)}function S(P,B,z,G,k,F,H){H===!0?t.vertexAttribIPointer(P,B,z,k,F):t.vertexAttribPointer(P,B,z,G,k,F)}function x(P,B,z,G){b();const k=G.attributes,F=z.getAttributes(),H=B.defaultAttributeValues;for(const I in F){const j=F[I];if(j.location>=0){let de=k[I];if(de===void 0&&(I==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),I==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),de!==void 0){const Te=de.normalized,Oe=de.itemSize,et=e.get(de);if(et===void 0)continue;const $e=et.buffer,st=et.type,pe=et.bytesPerElement,Re=st===t.INT||st===t.UNSIGNED_INT||de.gpuType===Vm;if(de.isInterleavedBufferAttribute){const ce=de.data,ze=ce.stride,We=de.offset;if(ce.isInstancedInterleavedBuffer){for(let Ze=0;Ze<j.locationSize;Ze++)f(j.location+Ze,ce.meshPerAttribute);P.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let Ze=0;Ze<j.locationSize;Ze++)m(j.location+Ze);t.bindBuffer(t.ARRAY_BUFFER,$e);for(let Ze=0;Ze<j.locationSize;Ze++)S(j.location+Ze,Oe/j.locationSize,st,Te,ze*pe,(We+Oe/j.locationSize*Ze)*pe,Re)}else{if(de.isInstancedBufferAttribute){for(let ce=0;ce<j.locationSize;ce++)f(j.location+ce,de.meshPerAttribute);P.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=de.meshPerAttribute*de.count)}else for(let ce=0;ce<j.locationSize;ce++)m(j.location+ce);t.bindBuffer(t.ARRAY_BUFFER,$e);for(let ce=0;ce<j.locationSize;ce++)S(j.location+ce,Oe/j.locationSize,st,Te,Oe*pe,Oe/j.locationSize*ce*pe,Re)}}else if(H!==void 0){const Te=H[I];if(Te!==void 0)switch(Te.length){case 2:t.vertexAttrib2fv(j.location,Te);break;case 3:t.vertexAttrib3fv(j.location,Te);break;case 4:t.vertexAttrib4fv(j.location,Te);break;default:t.vertexAttrib1fv(j.location,Te)}}}}v()}function N(){D();for(const P in i){const B=i[P];for(const z in B){const G=B[z];for(const k in G){const F=G[k];for(const H in F)d(F[H].object),delete F[H];delete G[k]}}delete i[P]}}function w(P){if(i[P.id]===void 0)return;const B=i[P.id];for(const z in B){const G=B[z];for(const k in G){const F=G[k];for(const H in F)d(F[H].object),delete F[H];delete G[k]}}delete i[P.id]}function C(P){for(const B in i){const z=i[B];for(const G in z){const k=z[G];if(k[P.id]===void 0)continue;const F=k[P.id];for(const H in F)d(F[H].object),delete F[H];delete k[P.id]}}}function y(P){for(const B in i){const z=i[B],G=P.isInstancedMesh===!0?P.id:0,k=z[G];if(k!==void 0){for(const F in k){const H=k[F];for(const I in H)d(H[I].object),delete H[I];delete k[F]}delete z[G],Object.keys(z).length===0&&delete i[B]}}}function D(){U(),r=!0,s!==a&&(s=a,c(s.object))}function U(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:D,resetDefaultState:U,dispose:N,releaseStatesOfGeometry:w,releaseStatesOfObject:y,releaseStatesOfProgram:C,initAttributes:b,enableAttribute:m,disableUnusedAttributes:v}}function k2(t,e,n){let i;function a(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,d){d!==0&&(t.drawArraysInstanced(i,l,c,d),n.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function X2(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(C){return!(C!==Zi&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const y=C===ka&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Oi&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Yi&&!y)}function l(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(ot("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),N=t.getParameter(t.MAX_SAMPLES),w=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:x,maxSamples:N,samples:w}}function W2(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new Gs,o=new dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||a;return a=u,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,b=h.clipIntersection,m=h.clipShadows,f=t.get(h);if(!a||g===null||g.length===0||s&&!m)s?d(null):c();else{const v=s?0:i,S=v*4;let x=f.clippingState||null;l.value=x,x=d(g,u,S,p);for(let N=0;N!==S;++N)x[N]=n[N];f.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,p,g){const b=h!==null?h.length:0;let m=null;if(b!==0){if(m=l.value,g!==!0||m===null){const f=p+b*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,x=p;S!==b;++S,x+=4)r.copy(h[S]).applyMatrix4(v,o),r.normal.toArray(m,x),m[x+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,m}}const ds=4,yv=[.125,.215,.35,.446,.526,.582],ks=20,q2=256,Zo=new eg,Sv=new Rt;let Gd=null,Vd=0,kd=0,Xd=!1;const j2=new J;class Mv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=j2}=s;Gd=this._renderer.getRenderTarget(),Vd=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Tv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ev(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Gd,Vd,kd),this._renderer.xr.enabled=Xd,e.scissorTest=!1,Ur(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===ir||e.mapping===xo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gd=this._renderer.getRenderTarget(),Vd=this._renderer.getActiveCubeFace(),kd=this._renderer.getActiveMipmapLevel(),Xd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:ka,format:Zi,colorSpace:Ku,depthBuffer:!1},a=bv(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bv(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Y2(s)),this._blurMaterial=K2(s,e,n),this._ggxMaterial=Z2(s,e,n)}return a}_compileMaterial(e){const n=new Hi(new Xn,e);this._renderer.compile(n,Zo)}_sceneToCubeUV(e,n,i,a,s){const l=new Di(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Sv),h.toneMapping=la,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hi(new rr,new xS({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,m=b.material;let f=!1;const v=e.background;v?v.isColor&&(m.color.copy(v),e.background=null,f=!0):(m.color.copy(Sv),f=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[S],s.y,s.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[S]));const N=this._cubeSize;Ur(a,x*N,S>2?N:0,N,N),h.setRenderTarget(a),f&&h.render(b,l),h.render(e,l)}h.toneMapping=p,h.autoClear=u,e.background=v}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===ir||e.mapping===xo;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Tv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ev());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ur(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Zo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=0+c*1.25,p=h*u,{_lodMax:g}=this,b=this._sizeLods[i],m=3*b*(i>g-ds?i-g+ds:0),f=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-n,Ur(s,m,f,3*b,2*b),a.setRenderTarget(s),a.render(o,Zo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ur(e,m,f,3*b,2*b),a.setRenderTarget(e),a.render(o,Zo)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&zt("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[a];h.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ks-1),b=s/g,m=isFinite(s)?1+Math.floor(d*b):ks;m>ks&&ot(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ks}`);const f=[];let v=0;for(let C=0;C<ks;++C){const y=C/b,D=Math.exp(-y*y/2);f.push(D),C===0?v+=D:C<m&&(v+=2*D)}for(let C=0;C<f.length;C++)f[C]=f[C]/v;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-i;const x=this._sizeLods[a],N=3*x*(a>S-ds?a-S+ds:0),w=4*(this._cubeSize-x);Ur(n,N,w,3*x,2*x),l.setRenderTarget(n),l.render(h,Zo)}}function Y2(t){const e=[],n=[],i=[];let a=t;const s=t-ds+1+yv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-ds?l=yv[r-t+ds-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,b=3,m=2,f=1,v=new Float32Array(b*g*p),S=new Float32Array(m*g*p),x=new Float32Array(f*g*p);for(let w=0;w<p;w++){const C=w%3*2/3-1,y=w>2?0:-1,D=[C,y,0,C+2/3,y,0,C+2/3,y+1,0,C,y,0,C+2/3,y+1,0,C,y+1,0];v.set(D,b*g*w),S.set(u,m*g*w);const U=[w,w,w,w,w,w];x.set(U,f*g*w)}const N=new Xn;N.setAttribute("position",new Xt(v,b)),N.setAttribute("uv",new Xt(S,m)),N.setAttribute("faceIndex",new Xt(x,f)),i.push(new Hi(N,null)),a>ds&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function bv(t,e,n){const i=new ca(t,e,n);return i.texture.mapping=bf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function Z2(t,e,n){return new Bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:q2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function K2(t,e,n){const i=new Float32Array(ks),a=new J(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:ks,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Tf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function Ev(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function Tv(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function Tf(){return`

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
	`}class CS extends ca{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new bS(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new rr(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:So(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:si,blending:za});s.uniforms.tEquirect.value=n;const r=new Hi(a,s),o=n.minFilter;return n.minFilter===Xs&&(n.minFilter=kn),new nT(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function Q2(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===hd||p===pd)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new CS(g.height);return b.fromEquirectangularTexture(t,u),e.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===hd||p===pd,b=p===ir||p===xo;if(g||b){let m=n.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Mv(t)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return g&&v&&v.height>0||b&&v&&l(v)?(i===null&&(i=new Mv(t)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===hd?u.mapping=ir:p===pd&&(u.mapping=xo),u}function l(u){let p=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function $2(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&ao("WebGLRenderer: "+i+" extension not supported."),a}}}function J2(t,e,n,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let b=0;if(g===void 0)return;if(p!==null){const v=p.array;b=p.version;for(let S=0,x=v.length;S<x;S+=3){const N=v[S+0],w=v[S+1],C=v[S+2];u.push(N,w,w,C,C,N)}}else{const v=g.array;b=g.version;for(let S=0,x=v.length/3-1;S<x;S+=3){const N=S+0,w=S+1,C=S+2;u.push(N,w,w,C,C,N)}}const m=new(g.count>=65535?_S:vS)(u,1);m.version=b;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function eR(t,e,n){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,u){t.drawElements(i,u,s,h*r),n.update(u,i,1)}function c(h,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,h*r,p),n.update(u,i,p))}function d(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let b=0;for(let m=0;m<p;m++)b+=u[m];n.update(b,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function tR(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:zt("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function nR(t,e,n){const i=new WeakMap,a=new fn;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let U=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",U)};var p=U;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),b===!0&&(x=2),m===!0&&(x=3);let N=o.attributes.position.count*x,w=1;N>e.maxTextureSize&&(w=Math.ceil(N/e.maxTextureSize),N=e.maxTextureSize);const C=new Float32Array(N*w*4*h),y=new hS(C,N,w,h);y.type=Yi,y.needsUpdate=!0;const D=x*4;for(let P=0;P<h;P++){const B=f[P],z=v[P],G=S[P],k=N*w*4*P;for(let F=0;F<B.count;F++){const H=F*D;g===!0&&(a.fromBufferAttribute(B,F),C[k+H+0]=a.x,C[k+H+1]=a.y,C[k+H+2]=a.z,C[k+H+3]=0),b===!0&&(a.fromBufferAttribute(z,F),C[k+H+4]=a.x,C[k+H+5]=a.y,C[k+H+6]=a.z,C[k+H+7]=0),m===!0&&(a.fromBufferAttribute(G,F),C[k+H+8]=a.x,C[k+H+9]=a.y,C[k+H+10]=a.z,C[k+H+11]=G.itemSize===4?a.w:1)}}u={count:h,texture:y,size:new Gt(N,w)},i.set(o,u),o.addEventListener("dispose",U)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const b=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",b),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function iR(t,e,n,i,a){let s=new WeakMap;function r(c){const d=a.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const aR={[$y]:"LINEAR_TONE_MAPPING",[Jy]:"REINHARD_TONE_MAPPING",[eS]:"CINEON_TONE_MAPPING",[tS]:"ACES_FILMIC_TONE_MAPPING",[iS]:"AGX_TONE_MAPPING",[aS]:"NEUTRAL_TONE_MAPPING",[nS]:"CUSTOM_TONE_MAPPING"};function sR(t,e,n,i,a,s){const r=new ca(e,n,{type:t,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new yo(e,n):void 0}),o=new ca(e,n,{type:ka,depthBuffer:!1,stencilBuffer:!1}),l=new Xn;l.setAttribute("position",new Bi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bi([0,2,0,0,2,0],2));const c=new J1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Hi(l,c),h=new eg(-1,1,1,-1,0,1);let u=null,p=null,g=!1,b,m=null,f=[],v=!1;this.setSize=function(S,x){r.setSize(S,x),o.setSize(S,x);for(let N=0;N<f.length;N++){const w=f[N];w.setSize&&w.setSize(S,x)}},this.setEffects=function(S){f=S,v=f.length>0&&f[0].isRenderPass===!0;const x=r.width,N=r.height;for(let w=0;w<f.length;w++){const C=f[w];C.setSize&&C.setSize(x,N)}},this.begin=function(S,x){if(g||S.toneMapping===la&&f.length===0)return!1;if(m=x,x!==null){const N=x.width,w=x.height;(r.width!==N||r.height!==w)&&this.setSize(N,w)}return v===!1&&S.setRenderTarget(r),b=S.toneMapping,S.toneMapping=la,!0},this.hasRenderPass=function(){return v},this.end=function(S,x){S.toneMapping=b,g=!0;let N=r,w=o;for(let C=0;C<f.length;C++){const y=f[C];if(y.enabled!==!1&&(y.render(S,w,N,x),y.needsSwap!==!1)){const D=N;N=w,w=D}}if(u!==S.outputColorSpace||p!==S.toneMapping){u=S.outputColorSpace,p=S.toneMapping,c.defines={},Nt.getTransfer(u)===qt&&(c.defines.SRGB_TRANSFER="");const C=aR[p];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=N.texture,S.setRenderTarget(m),S.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const DS=new Yn,Op=new yo(1,1),NS=new hS,US=new w1,LS=new bS,Av=[],Rv=[],wv=new Float32Array(16),Cv=new Float32Array(9),Dv=new Float32Array(4);function Lo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=Av[a];if(s===void 0&&(s=new Float32Array(a),Av[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function Mn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function bn(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Af(t,e){let n=Rv[e];n===void 0&&(n=new Int32Array(e),Rv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function rR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function oR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Mn(n,e))return;t.uniform2fv(this.addr,e),bn(n,e)}}function lR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Mn(n,e))return;t.uniform3fv(this.addr,e),bn(n,e)}}function cR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Mn(n,e))return;t.uniform4fv(this.addr,e),bn(n,e)}}function uR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Mn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),bn(n,e)}else{if(Mn(n,i))return;Dv.set(i),t.uniformMatrix2fv(this.addr,!1,Dv),bn(n,i)}}function fR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Mn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),bn(n,e)}else{if(Mn(n,i))return;Cv.set(i),t.uniformMatrix3fv(this.addr,!1,Cv),bn(n,i)}}function dR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Mn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),bn(n,e)}else{if(Mn(n,i))return;wv.set(i),t.uniformMatrix4fv(this.addr,!1,wv),bn(n,i)}}function hR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function pR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Mn(n,e))return;t.uniform2iv(this.addr,e),bn(n,e)}}function mR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Mn(n,e))return;t.uniform3iv(this.addr,e),bn(n,e)}}function gR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Mn(n,e))return;t.uniform4iv(this.addr,e),bn(n,e)}}function vR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function _R(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Mn(n,e))return;t.uniform2uiv(this.addr,e),bn(n,e)}}function xR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Mn(n,e))return;t.uniform3uiv(this.addr,e),bn(n,e)}}function yR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Mn(n,e))return;t.uniform4uiv(this.addr,e),bn(n,e)}}function SR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Op.compareFunction=n.isReversedDepthBuffer()?Km:Zm,s=Op):s=DS,n.setTexture2D(e||s,a)}function MR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||US,a)}function bR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||LS,a)}function ER(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||NS,a)}function TR(t){switch(t){case 5126:return rR;case 35664:return oR;case 35665:return lR;case 35666:return cR;case 35674:return uR;case 35675:return fR;case 35676:return dR;case 5124:case 35670:return hR;case 35667:case 35671:return pR;case 35668:case 35672:return mR;case 35669:case 35673:return gR;case 5125:return vR;case 36294:return _R;case 36295:return xR;case 36296:return yR;case 35678:case 36198:case 36298:case 36306:case 35682:return SR;case 35679:case 36299:case 36307:return MR;case 35680:case 36300:case 36308:case 36293:return bR;case 36289:case 36303:case 36311:case 36292:return ER}}function AR(t,e){t.uniform1fv(this.addr,e)}function RR(t,e){const n=Lo(e,this.size,2);t.uniform2fv(this.addr,n)}function wR(t,e){const n=Lo(e,this.size,3);t.uniform3fv(this.addr,n)}function CR(t,e){const n=Lo(e,this.size,4);t.uniform4fv(this.addr,n)}function DR(t,e){const n=Lo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function NR(t,e){const n=Lo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function UR(t,e){const n=Lo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function LR(t,e){t.uniform1iv(this.addr,e)}function OR(t,e){t.uniform2iv(this.addr,e)}function PR(t,e){t.uniform3iv(this.addr,e)}function zR(t,e){t.uniform4iv(this.addr,e)}function IR(t,e){t.uniform1uiv(this.addr,e)}function BR(t,e){t.uniform2uiv(this.addr,e)}function FR(t,e){t.uniform3uiv(this.addr,e)}function HR(t,e){t.uniform4uiv(this.addr,e)}function GR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Op:r=DS;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function VR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||US,s[r])}function kR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||LS,s[r])}function XR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||NS,s[r])}function WR(t){switch(t){case 5126:return AR;case 35664:return RR;case 35665:return wR;case 35666:return CR;case 35674:return DR;case 35675:return NR;case 35676:return UR;case 5124:case 35670:return LR;case 35667:case 35671:return OR;case 35668:case 35672:return PR;case 35669:case 35673:return zR;case 5125:return IR;case 36294:return BR;case 36295:return FR;case 36296:return HR;case 35678:case 36198:case 36298:case 36306:case 35682:return GR;case 35679:case 36299:case 36307:return VR;case 35680:case 36300:case 36308:case 36293:return kR;case 36289:case 36303:case 36311:case 36292:return XR}}class qR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=TR(n.type)}}class jR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=WR(n.type)}}class YR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const Wd=/(\w+)(\])?(\[|\.)?/g;function Nv(t,e){t.seq.push(e),t.map[e.id]=e}function ZR(t,e,n){const i=t.name,a=i.length;for(Wd.lastIndex=0;;){const s=Wd.exec(i),r=Wd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Nv(n,c===void 0?new qR(o,t,e):new jR(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new YR(o),Nv(n,h)),n=h}}}class vu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);ZR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Uv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const KR=37297;let QR=0;function $R(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Lv=new dt;function JR(t){Nt._getMatrix(Lv,Nt.workingColorSpace,t);const e=`mat3( ${Lv.elements.map(n=>n.toFixed(4))} )`;switch(Nt.getTransfer(t)){case Qu:return[e,"LinearTransferOETF"];case qt:return[e,"sRGBTransferOETF"];default:return ot("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Ov(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+$R(t.getShaderSource(e),o)}else return s}function ew(t,e){const n=JR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const tw={[$y]:"Linear",[Jy]:"Reinhard",[eS]:"Cineon",[tS]:"ACESFilmic",[iS]:"AgX",[aS]:"Neutral",[nS]:"Custom"};function nw(t,e){const n=tw[e];return n===void 0?(ot("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const qc=new J;function iw(){Nt.getLuminanceCoefficients(qc);const t=qc.x.toFixed(4),e=qc.y.toFixed(4),n=qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function aw(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function sw(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function rw(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function al(t){return t!==""}function Pv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function zv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ow=/^[ \t]*#include +<([\w\d./]+)>/gm;function Pp(t){return t.replace(ow,cw)}const lw=new Map;function cw(t,e){let n=_t[e];if(n===void 0){const i=lw.get(e);if(i!==void 0)n=_t[i],ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Pp(n)}const uw=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Iv(t){return t.replace(uw,fw)}function fw(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Bv(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const dw={[uu]:"SHADOWMAP_TYPE_PCF",[il]:"SHADOWMAP_TYPE_VSM"};function hw(t){return dw[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const pw={[ir]:"ENVMAP_TYPE_CUBE",[xo]:"ENVMAP_TYPE_CUBE",[bf]:"ENVMAP_TYPE_CUBE_UV"};function mw(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":pw[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const gw={[xo]:"ENVMAP_MODE_REFRACTION"};function vw(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":gw[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const _w={[Qy]:"ENVMAP_BLENDING_MULTIPLY",[o1]:"ENVMAP_BLENDING_MIX",[l1]:"ENVMAP_BLENDING_ADD"};function xw(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":_w[t.combine]||"ENVMAP_BLENDING_NONE"}function yw(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Sw(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=hw(n),c=mw(n),d=vw(n),h=xw(n),u=yw(n),p=aw(n),g=sw(s),b=a.createProgram();let m,f,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),f.length>0&&(f+=`
`)):(m=[Bv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),f=[Bv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==la?"#define TONE_MAPPING":"",n.toneMapping!==la?_t.tonemapping_pars_fragment:"",n.toneMapping!==la?nw("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,ew("linearToOutputTexel",n.outputColorSpace),iw(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(al).join(`
`)),r=Pp(r),r=Pv(r,n),r=zv(r,n),o=Pp(o),o=Pv(o,n),o=zv(o,n),r=Iv(r),o=Iv(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===k0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===k0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=v+m+r,x=v+f+o,N=Uv(a,a.VERTEX_SHADER,S),w=Uv(a,a.FRAGMENT_SHADER,x);a.attachShader(b,N),a.attachShader(b,w),n.index0AttributeName!==void 0?a.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function C(P){if(t.debug.checkShaderErrors){const B=a.getProgramInfoLog(b)||"",z=a.getShaderInfoLog(N)||"",G=a.getShaderInfoLog(w)||"",k=B.trim(),F=z.trim(),H=G.trim();let I=!0,j=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(I=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,b,N,w);else{const de=Ov(a,N,"vertex"),Te=Ov(a,w,"fragment");zt("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+k+`
`+de+`
`+Te)}else k!==""?ot("WebGLProgram: Program Info Log:",k):(F===""||H==="")&&(j=!1);j&&(P.diagnostics={runnable:I,programLog:k,vertexShader:{log:F,prefix:m},fragmentShader:{log:H,prefix:f}})}a.deleteShader(N),a.deleteShader(w),y=new vu(a,b),D=rw(a,b)}let y;this.getUniforms=function(){return y===void 0&&C(this),y};let D;this.getAttributes=function(){return D===void 0&&C(this),D};let U=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=a.getProgramParameter(b,KR)),U},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=QR++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=N,this.fragmentShader=w,this}let Mw=0;class bw{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Ew(e),n.set(e,i)),i}}class Ew{constructor(e){this.id=Mw++,this.code=e,this.usedTimes=0}}function Tw(t){return t===ar||t===Yu||t===Zu}function Aw(t,e,n,i,a,s){const r=new pS,o=new bw,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,D,U,P,B,z){const G=P.fog,k=B.geometry,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?P.environment:null,H=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,I=e.get(y.envMap||F,H),j=I&&I.mapping===bf?I.image.height:null,de=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&ot("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const Te=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Oe=Te!==void 0?Te.length:0;let et=0;k.morphAttributes.position!==void 0&&(et=1),k.morphAttributes.normal!==void 0&&(et=2),k.morphAttributes.color!==void 0&&(et=3);let $e,st,pe,Re;if(de){const Ve=ta[de];$e=Ve.vertexShader,st=Ve.fragmentShader}else{$e=y.vertexShader,st=y.fragmentShader;const Ve=o.getVertexShaderStage(y),bt=o.getFragmentShaderStage(y);o.update(y,Ve,bt),pe=Ve.id,Re=bt.id}const ce=t.getRenderTarget(),ze=t.state.buffers.depth.getReversed(),We=B.isInstancedMesh===!0,Ze=B.isBatchedMesh===!0,wt=!!y.map,tt=!!y.matcap,Mt=!!I,gt=!!y.aoMap,ht=!!y.lightMap,Ot=!!y.bumpMap&&y.wireframe===!1,rt=!!y.normalMap,Wt=!!y.displacementMap,Zt=!!y.emissiveMap,ct=!!y.metalnessMap,Z=!!y.roughnessMap,O=y.anisotropy>0,He=y.clearcoat>0,Ue=y.dispersion>0,E=y.iridescence>0,_=y.sheen>0,W=y.transmission>0,Q=O&&!!y.anisotropyMap,ie=He&&!!y.clearcoatMap,me=He&&!!y.clearcoatNormalMap,be=He&&!!y.clearcoatRoughnessMap,ae=E&&!!y.iridescenceMap,K=E&&!!y.iridescenceThicknessMap,ue=_&&!!y.sheenColorMap,ge=_&&!!y.sheenRoughnessMap,Se=!!y.specularMap,Ee=!!y.specularColorMap,Ge=!!y.specularIntensityMap,qe=W&&!!y.transmissionMap,it=W&&!!y.thicknessMap,V=!!y.gradientMap,we=!!y.alphaMap,fe=y.alphaTest>0,oe=!!y.alphaHash,Pe=!!y.extensions;let ye=la;y.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(ye=t.toneMapping);const je={shaderID:de,shaderType:y.type,shaderName:y.name,vertexShader:$e,fragmentShader:st,defines:y.defines,customVertexShaderID:pe,customFragmentShaderID:Re,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ze,batchingColor:Ze&&B._colorsTexture!==null,instancing:We,instancingColor:We&&B.instanceColor!==null,instancingMorph:We&&B.morphTexture!==null,outputColorSpace:ce===null?t.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Nt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:wt,matcap:tt,envMap:Mt,envMapMode:Mt&&I.mapping,envMapCubeUVHeight:j,aoMap:gt,lightMap:ht,bumpMap:Ot,normalMap:rt,displacementMap:Wt,emissiveMap:Zt,normalMapObjectSpace:rt&&y.normalMapType===f1,normalMapTangentSpace:rt&&y.normalMapType===H0,packedNormalMap:rt&&y.normalMapType===H0&&Tw(y.normalMap.format),metalnessMap:ct,roughnessMap:Z,anisotropy:O,anisotropyMap:Q,clearcoat:He,clearcoatMap:ie,clearcoatNormalMap:me,clearcoatRoughnessMap:be,dispersion:Ue,iridescence:E,iridescenceMap:ae,iridescenceThicknessMap:K,sheen:_,sheenColorMap:ue,sheenRoughnessMap:ge,specularMap:Se,specularColorMap:Ee,specularIntensityMap:Ge,transmission:W,transmissionMap:qe,thicknessMap:it,gradientMap:V,opaque:y.transparent===!1&&y.blending===Qs&&y.alphaToCoverage===!1,alphaMap:we,alphaTest:fe,alphaHash:oe,combine:y.combine,mapUv:wt&&g(y.map.channel),aoMapUv:gt&&g(y.aoMap.channel),lightMapUv:ht&&g(y.lightMap.channel),bumpMapUv:Ot&&g(y.bumpMap.channel),normalMapUv:rt&&g(y.normalMap.channel),displacementMapUv:Wt&&g(y.displacementMap.channel),emissiveMapUv:Zt&&g(y.emissiveMap.channel),metalnessMapUv:ct&&g(y.metalnessMap.channel),roughnessMapUv:Z&&g(y.roughnessMap.channel),anisotropyMapUv:Q&&g(y.anisotropyMap.channel),clearcoatMapUv:ie&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:me&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ae&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ge&&g(y.sheenRoughnessMap.channel),specularMapUv:Se&&g(y.specularMap.channel),specularColorMapUv:Ee&&g(y.specularColorMap.channel),specularIntensityMapUv:Ge&&g(y.specularIntensityMap.channel),transmissionMapUv:qe&&g(y.transmissionMap.channel),thicknessMapUv:it&&g(y.thicknessMap.channel),alphaMapUv:we&&g(y.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(rt||O),vertexNormals:!!k.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!k.attributes.uv&&(wt||we),fog:!!G,useFog:y.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||k.attributes.normal===void 0&&rt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ze,skinning:B.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Oe,morphTextureStride:et,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&U.length>0,shadowMapType:t.shadowMap.type,toneMapping:ye,decodeVideoTexture:wt&&y.map.isVideoTexture===!0&&Nt.getTransfer(y.map.colorSpace)===qt,decodeVideoTextureEmissive:Zt&&y.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(y.emissiveMap.colorSpace)===qt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===wa,flipSided:y.side===si,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Pe&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&y.extensions.multiDraw===!0||Ze)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return je.vertexUv1s=l.has(1),je.vertexUv2s=l.has(2),je.vertexUv3s=l.has(3),l.clear(),je}function m(y){const D=[];if(y.shaderID?D.push(y.shaderID):(D.push(y.customVertexShaderID),D.push(y.customFragmentShaderID)),y.defines!==void 0)for(const U in y.defines)D.push(U),D.push(y.defines[U]);return y.isRawShaderMaterial===!1&&(f(D,y),v(D,y),D.push(t.outputColorSpace)),D.push(y.customProgramCacheKey),D.join()}function f(y,D){y.push(D.precision),y.push(D.outputColorSpace),y.push(D.envMapMode),y.push(D.envMapCubeUVHeight),y.push(D.mapUv),y.push(D.alphaMapUv),y.push(D.lightMapUv),y.push(D.aoMapUv),y.push(D.bumpMapUv),y.push(D.normalMapUv),y.push(D.displacementMapUv),y.push(D.emissiveMapUv),y.push(D.metalnessMapUv),y.push(D.roughnessMapUv),y.push(D.anisotropyMapUv),y.push(D.clearcoatMapUv),y.push(D.clearcoatNormalMapUv),y.push(D.clearcoatRoughnessMapUv),y.push(D.iridescenceMapUv),y.push(D.iridescenceThicknessMapUv),y.push(D.sheenColorMapUv),y.push(D.sheenRoughnessMapUv),y.push(D.specularMapUv),y.push(D.specularColorMapUv),y.push(D.specularIntensityMapUv),y.push(D.transmissionMapUv),y.push(D.thicknessMapUv),y.push(D.combine),y.push(D.fogExp2),y.push(D.sizeAttenuation),y.push(D.morphTargetsCount),y.push(D.morphAttributeCount),y.push(D.numDirLights),y.push(D.numPointLights),y.push(D.numSpotLights),y.push(D.numSpotLightMaps),y.push(D.numHemiLights),y.push(D.numRectAreaLights),y.push(D.numDirLightShadows),y.push(D.numPointLightShadows),y.push(D.numSpotLightShadows),y.push(D.numSpotLightShadowsWithMaps),y.push(D.numLightProbes),y.push(D.shadowMapType),y.push(D.toneMapping),y.push(D.numClippingPlanes),y.push(D.numClipIntersection),y.push(D.depthPacking)}function v(y,D){r.disableAll(),D.instancing&&r.enable(0),D.instancingColor&&r.enable(1),D.instancingMorph&&r.enable(2),D.matcap&&r.enable(3),D.envMap&&r.enable(4),D.normalMapObjectSpace&&r.enable(5),D.normalMapTangentSpace&&r.enable(6),D.clearcoat&&r.enable(7),D.iridescence&&r.enable(8),D.alphaTest&&r.enable(9),D.vertexColors&&r.enable(10),D.vertexAlphas&&r.enable(11),D.vertexUv1s&&r.enable(12),D.vertexUv2s&&r.enable(13),D.vertexUv3s&&r.enable(14),D.vertexTangents&&r.enable(15),D.anisotropy&&r.enable(16),D.alphaHash&&r.enable(17),D.batching&&r.enable(18),D.dispersion&&r.enable(19),D.batchingColor&&r.enable(20),D.gradientMap&&r.enable(21),D.packedNormalMap&&r.enable(22),D.vertexNormals&&r.enable(23),y.push(r.mask),r.disableAll(),D.fog&&r.enable(0),D.useFog&&r.enable(1),D.flatShading&&r.enable(2),D.logarithmicDepthBuffer&&r.enable(3),D.reversedDepthBuffer&&r.enable(4),D.skinning&&r.enable(5),D.morphTargets&&r.enable(6),D.morphNormals&&r.enable(7),D.morphColors&&r.enable(8),D.premultipliedAlpha&&r.enable(9),D.shadowMapEnabled&&r.enable(10),D.doubleSided&&r.enable(11),D.flipSided&&r.enable(12),D.useDepthPacking&&r.enable(13),D.dithering&&r.enable(14),D.transmission&&r.enable(15),D.sheen&&r.enable(16),D.opaque&&r.enable(17),D.pointsUvs&&r.enable(18),D.decodeVideoTexture&&r.enable(19),D.decodeVideoTextureEmissive&&r.enable(20),D.alphaToCoverage&&r.enable(21),D.numLightProbeGrids>0&&r.enable(22),D.hasPositionAttribute&&r.enable(23),y.push(r.mask)}function S(y){const D=p[y.type];let U;if(D){const P=ta[D];U=K1.clone(P.uniforms)}else U=y.uniforms;return U}function x(y,D){let U=d.get(D);return U!==void 0?++U.usedTimes:(U=new Sw(t,D,y,a),c.push(U),d.set(D,U)),U}function N(y){if(--y.usedTimes===0){const D=c.indexOf(y);c[D]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function w(y){o.remove(y)}function C(){o.dispose()}return{getParameters:b,getProgramCacheKey:m,getUniforms:S,acquireProgram:x,releaseProgram:N,releaseShaderCache:w,programs:c,dispose:C}}function Rw(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function ww(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Fv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Hv(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,b,m,f){let v=t[e];return v===void 0?(v={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:m,group:f},t[e]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=g,v.materialVariant=r(u),v.groupOrder=b,v.renderOrder=u.renderOrder,v.z=m,v.group=f),e++,v}function l(u,p,g,b,m,f){const v=o(u,p,g,b,m,f);g.transmission>0?i.push(v):g.transparent===!0?a.push(v):n.push(v)}function c(u,p,g,b,m,f){const v=o(u,p,g,b,m,f);g.transmission>0?i.unshift(v):g.transparent===!0?a.unshift(v):n.unshift(v)}function d(u,p,g){n.length>1&&n.sort(u||ww),i.length>1&&i.sort(p||Fv),a.length>1&&a.sort(p||Fv),g&&(n.reverse(),i.reverse(),a.reverse())}function h(){for(let u=e,p=t.length;u<p;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:h,sort:d}}function Cw(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new Hv,t.set(i,[r])):a>=s.length?(r=new Hv,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function Dw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new J,color:new Rt};break;case"SpotLight":n={position:new J,direction:new J,color:new Rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new J,color:new Rt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new J,skyColor:new Rt,groundColor:new Rt};break;case"RectAreaLight":n={color:new Rt,position:new J,halfWidth:new J,halfHeight:new J};break}return t[e.id]=n,n}}}function Nw(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let Uw=0;function Lw(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Ow(t){const e=new Dw,n=Nw(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new J);const a=new J,s=new nn,r=new nn;function o(c){let d=0,h=0,u=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let p=0,g=0,b=0,m=0,f=0,v=0,S=0,x=0,N=0,w=0,C=0;c.sort(Lw);for(let D=0,U=c.length;D<U;D++){const P=c[D],B=P.color,z=P.intensity,G=P.distance;let k=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===ar?k=P.shadow.map.texture:k=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)d+=B.r*z,h+=B.g*z,u+=B.b*z;else if(P.isLightProbe){for(let F=0;F<9;F++)i.probe[F].addScaledVector(P.sh.coefficients[F],z);C++}else if(P.isDirectionalLight){const F=e.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const H=P.shadow,I=n.get(P);I.shadowIntensity=H.intensity,I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=P.shadow.matrix,v++}i.directional[p]=F,p++}else if(P.isSpotLight){const F=e.get(P);F.position.setFromMatrixPosition(P.matrixWorld),F.color.copy(B).multiplyScalar(z),F.distance=G,F.coneCos=Math.cos(P.angle),F.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),F.decay=P.decay,i.spot[b]=F;const H=P.shadow;if(P.map&&(i.spotLightMap[N]=P.map,N++,H.updateMatrices(P),P.castShadow&&w++),i.spotLightMatrix[b]=H.matrix,P.castShadow){const I=n.get(P);I.shadowIntensity=H.intensity,I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,i.spotShadow[b]=I,i.spotShadowMap[b]=k,x++}b++}else if(P.isRectAreaLight){const F=e.get(P);F.color.copy(B).multiplyScalar(z),F.halfWidth.set(P.width*.5,0,0),F.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=F,m++}else if(P.isPointLight){const F=e.get(P);if(F.color.copy(P.color).multiplyScalar(P.intensity),F.distance=P.distance,F.decay=P.decay,P.castShadow){const H=P.shadow,I=n.get(P);I.shadowIntensity=H.intensity,I.shadowBias=H.bias,I.shadowNormalBias=H.normalBias,I.shadowRadius=H.radius,I.shadowMapSize=H.mapSize,I.shadowCameraNear=H.camera.near,I.shadowCameraFar=H.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=k,i.pointShadowMatrix[g]=P.shadow.matrix,S++}i.point[g]=F,g++}else if(P.isHemisphereLight){const F=e.get(P);F.skyColor.copy(P.color).multiplyScalar(z),F.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[f]=F,f++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Fe.LTC_FLOAT_1,i.rectAreaLTC2=Fe.LTC_FLOAT_2):(i.rectAreaLTC1=Fe.LTC_HALF_1,i.rectAreaLTC2=Fe.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==p||y.pointLength!==g||y.spotLength!==b||y.rectAreaLength!==m||y.hemiLength!==f||y.numDirectionalShadows!==v||y.numPointShadows!==S||y.numSpotShadows!==x||y.numSpotMaps!==N||y.numLightProbes!==C)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=x+N-w,i.spotLightMap.length=N,i.numSpotLightShadowsWithMaps=w,i.numLightProbes=C,y.directionalLength=p,y.pointLength=g,y.spotLength=b,y.rectAreaLength=m,y.hemiLength=f,y.numDirectionalShadows=v,y.numPointShadows=S,y.numSpotShadows=x,y.numSpotMaps=N,y.numLightProbes=C,i.version=Uw++)}function l(c,d){let h=0,u=0,p=0,g=0,b=0;const m=d.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){const S=c[f];if(S.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(m),h++}else if(S.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),r.identity(),s.copy(S.matrixWorld),s.premultiply(m),r.extractRotation(s),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),g++}else if(S.isPointLight){const x=i.point[u];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const x=i.hemi[b];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(m),b++}}}return{setup:o,setupView:l,state:i}}function Gv(t){const e=new Ow(t),n=[],i=[],a=[];function s(u){h.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){e.setup(n)}function d(u){e.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:d,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function Pw(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Gv(t),e.set(a,[o])):s>=r.length?(o=new Gv(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const zw=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Iw=`uniform sampler2D shadow_pass;
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
}`,Bw=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],Fw=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],Vv=new nn,Ko=new J,qd=new J;function Hw(t,e,n){let i=new SS;const a=new Gt,s=new Gt,r=new fn,o=new eT,l=new tT,c={},d=n.maxTextureSize,h={[Rs]:si,[si]:Rs,[wa]:wa},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:zw,fragmentShader:Iw}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Xn;g.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Hi(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=uu;let f=this.type;this.render=function(w,C,y){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||w.length===0)return;this.type===VE&&(ot("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=uu);const D=t.getRenderTarget(),U=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),B=t.state;B.setBlending(za),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=f!==this.type;z&&C.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(k=>k.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,k=w.length;G<k;G++){const F=w[G],H=F.shadow;if(H===void 0){ot("WebGLShadowMap:",F,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;a.copy(H.mapSize);const I=H.getFrameExtents();a.multiply(I),s.copy(H.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/I.x),a.x=s.x*I.x,H.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/I.y),a.y=s.y*I.y,H.mapSize.y=s.y));const j=t.state.buffers.depth.getReversed();if(H.camera._reversedDepth=j,H.map===null||z===!0){if(H.map!==null&&(H.map.depthTexture!==null&&(H.map.depthTexture.dispose(),H.map.depthTexture=null),H.map.dispose()),this.type===il){if(F.isPointLight){ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}H.map=new ca(a.x,a.y,{format:ar,type:ka,minFilter:kn,magFilter:kn,generateMipmaps:!1}),H.map.texture.name=F.name+".shadowMap",H.map.depthTexture=new yo(a.x,a.y,Yi),H.map.depthTexture.name=F.name+".shadowMapDepth",H.map.depthTexture.format=Xa,H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=In,H.map.depthTexture.magFilter=In}else F.isPointLight?(H.map=new CS(a.x),H.map.depthTexture=new j1(a.x,ua)):(H.map=new ca(a.x,a.y),H.map.depthTexture=new yo(a.x,a.y,ua)),H.map.depthTexture.name=F.name+".shadowMap",H.map.depthTexture.format=Xa,this.type===uu?(H.map.depthTexture.compareFunction=j?Km:Zm,H.map.depthTexture.minFilter=kn,H.map.depthTexture.magFilter=kn):(H.map.depthTexture.compareFunction=null,H.map.depthTexture.minFilter=In,H.map.depthTexture.magFilter=In);H.camera.updateProjectionMatrix()}const de=H.map.isWebGLCubeRenderTarget?6:1;for(let Te=0;Te<de;Te++){if(H.map.isWebGLCubeRenderTarget)t.setRenderTarget(H.map,Te),t.clear();else{Te===0&&(t.setRenderTarget(H.map),t.clear());const Oe=H.getViewport(Te);r.set(s.x*Oe.x,s.y*Oe.y,s.x*Oe.z,s.y*Oe.w),B.viewport(r)}if(F.isPointLight){const Oe=H.camera,et=H.matrix,$e=F.distance||Oe.far;$e!==Oe.far&&(Oe.far=$e,Oe.updateProjectionMatrix()),Ko.setFromMatrixPosition(F.matrixWorld),Oe.position.copy(Ko),qd.copy(Oe.position),qd.add(Bw[Te]),Oe.up.copy(Fw[Te]),Oe.lookAt(qd),Oe.updateMatrixWorld(),et.makeTranslation(-Ko.x,-Ko.y,-Ko.z),Vv.multiplyMatrices(Oe.projectionMatrix,Oe.matrixWorldInverse),H._frustum.setFromProjectionMatrix(Vv,Oe.coordinateSystem,Oe.reversedDepth)}else H.updateMatrices(F);i=H.getFrustum(),x(C,y,H.camera,F,this.type)}H.isPointLightShadow!==!0&&this.type===il&&v(H,y),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,t.setRenderTarget(D,U,P)};function v(w,C){const y=e.update(b);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null&&(w.mapPass=new ca(a.x,a.y,{format:ar,type:ka})),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value=w.mapSize,u.uniforms.radius.value=w.radius,t.setRenderTarget(w.mapPass),t.clear(),t.renderBufferDirect(C,null,y,u,b,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value=w.mapSize,p.uniforms.radius.value=w.radius,t.setRenderTarget(w.map),t.clear(),t.renderBufferDirect(C,null,y,p,b,null)}function S(w,C,y,D){let U=null;const P=y.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(P!==void 0)U=P;else if(U=y.isPointLight===!0?l:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const B=U.uuid,z=C.uuid;let G=c[B];G===void 0&&(G={},c[B]=G);let k=G[z];k===void 0&&(k=U.clone(),G[z]=k,C.addEventListener("dispose",N)),U=k}if(U.visible=C.visible,U.wireframe=C.wireframe,D===il?U.side=C.shadowSide!==null?C.shadowSide:C.side:U.side=C.shadowSide!==null?C.shadowSide:h[C.side],U.alphaMap=C.alphaMap,U.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,U.map=C.map,U.clipShadows=C.clipShadows,U.clippingPlanes=C.clippingPlanes,U.clipIntersection=C.clipIntersection,U.displacementMap=C.displacementMap,U.displacementScale=C.displacementScale,U.displacementBias=C.displacementBias,U.wireframeLinewidth=C.wireframeLinewidth,U.linewidth=C.linewidth,y.isPointLight===!0&&U.isMeshDistanceMaterial===!0){const B=t.properties.get(U);B.light=y}return U}function x(w,C,y,D,U){if(w.visible===!1)return;if(w.layers.test(C.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&U===il)&&(!w.frustumCulled||i.intersectsObject(w))){w.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,w.matrixWorld);const z=e.update(w),G=w.material;if(Array.isArray(G)){const k=z.groups;for(let F=0,H=k.length;F<H;F++){const I=k[F],j=G[I.materialIndex];if(j&&j.visible){const de=S(w,j,D,U);w.onBeforeShadow(t,w,C,y,z,de,I),t.renderBufferDirect(y,null,z,de,w,I),w.onAfterShadow(t,w,C,y,z,de,I)}}}else if(G.visible){const k=S(w,G,D,U);w.onBeforeShadow(t,w,C,y,z,k,null),t.renderBufferDirect(y,null,z,k,w,null),w.onAfterShadow(t,w,C,y,z,k,null)}}const B=w.children;for(let z=0,G=B.length;z<G;z++)x(B[z],C,y,D,U)}function N(w){w.target.removeEventListener("dispose",N);for(const y in c){const D=c[y],U=w.target.uuid;U in D&&(D[U].dispose(),delete D[U])}}}function Gw(t,e){function n(){let V=!1;const we=new fn;let fe=null;const oe=new fn(0,0,0,0);return{setMask:function(Pe){fe!==Pe&&!V&&(t.colorMask(Pe,Pe,Pe,Pe),fe=Pe)},setLocked:function(Pe){V=Pe},setClear:function(Pe,ye,je,Ve,bt){bt===!0&&(Pe*=Ve,ye*=Ve,je*=Ve),we.set(Pe,ye,je,Ve),oe.equals(we)===!1&&(t.clearColor(Pe,ye,je,Ve),oe.copy(we))},reset:function(){V=!1,fe=null,oe.set(-1,0,0,0)}}}function i(){let V=!1,we=!1,fe=null,oe=null,Pe=null;return{setReversed:function(ye){if(we!==ye){const je=e.get("EXT_clip_control");ye?je.clipControlEXT(je.LOWER_LEFT_EXT,je.ZERO_TO_ONE_EXT):je.clipControlEXT(je.LOWER_LEFT_EXT,je.NEGATIVE_ONE_TO_ONE_EXT),we=ye;const Ve=Pe;Pe=null,this.setClear(Ve)}},getReversed:function(){return we},setTest:function(ye){ye?ce(t.DEPTH_TEST):ze(t.DEPTH_TEST)},setMask:function(ye){fe!==ye&&!V&&(t.depthMask(ye),fe=ye)},setFunc:function(ye){if(we&&(ye=S1[ye]),oe!==ye){switch(ye){case qh:t.depthFunc(t.NEVER);break;case jh:t.depthFunc(t.ALWAYS);break;case Yh:t.depthFunc(t.LESS);break;case _o:t.depthFunc(t.LEQUAL);break;case Zh:t.depthFunc(t.EQUAL);break;case Kh:t.depthFunc(t.GEQUAL);break;case Qh:t.depthFunc(t.GREATER);break;case $h:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}oe=ye}},setLocked:function(ye){V=ye},setClear:function(ye){Pe!==ye&&(Pe=ye,we&&(ye=1-ye),t.clearDepth(ye))},reset:function(){V=!1,fe=null,oe=null,Pe=null,we=!1}}}function a(){let V=!1,we=null,fe=null,oe=null,Pe=null,ye=null,je=null,Ve=null,bt=null;return{setTest:function(It){V||(It?ce(t.STENCIL_TEST):ze(t.STENCIL_TEST))},setMask:function(It){we!==It&&!V&&(t.stencilMask(It),we=It)},setFunc:function(It,Dn,Nn){(fe!==It||oe!==Dn||Pe!==Nn)&&(t.stencilFunc(It,Dn,Nn),fe=It,oe=Dn,Pe=Nn)},setOp:function(It,Dn,Nn){(ye!==It||je!==Dn||Ve!==Nn)&&(t.stencilOp(It,Dn,Nn),ye=It,je=Dn,Ve=Nn)},setLocked:function(It){V=It},setClear:function(It){bt!==It&&(t.clearStencil(It),bt=It)},reset:function(){V=!1,we=null,fe=null,oe=null,Pe=null,ye=null,je=null,Ve=null,bt=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},h={},u={},p=new WeakMap,g=[],b=null,m=!1,f=null,v=null,S=null,x=null,N=null,w=null,C=null,y=new Rt(0,0,0),D=0,U=!1,P=null,B=null,z=null,G=null,k=null;const F=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,I=0;const j=t.getParameter(t.VERSION);j.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(j)[1]),H=I>=1):j.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),H=I>=2);let de=null,Te={};const Oe=t.getParameter(t.SCISSOR_BOX),et=t.getParameter(t.VIEWPORT),$e=new fn().fromArray(Oe),st=new fn().fromArray(et);function pe(V,we,fe,oe){const Pe=new Uint8Array(4),ye=t.createTexture();t.bindTexture(V,ye),t.texParameteri(V,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(V,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let je=0;je<fe;je++)V===t.TEXTURE_3D||V===t.TEXTURE_2D_ARRAY?t.texImage3D(we,0,t.RGBA,1,1,oe,0,t.RGBA,t.UNSIGNED_BYTE,Pe):t.texImage2D(we+je,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Pe);return ye}const Re={};Re[t.TEXTURE_2D]=pe(t.TEXTURE_2D,t.TEXTURE_2D,1),Re[t.TEXTURE_CUBE_MAP]=pe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[t.TEXTURE_2D_ARRAY]=pe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Re[t.TEXTURE_3D]=pe(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ce(t.DEPTH_TEST),r.setFunc(_o),Ot(!1),rt(I0),ce(t.CULL_FACE),gt(za);function ce(V){d[V]!==!0&&(t.enable(V),d[V]=!0)}function ze(V){d[V]!==!1&&(t.disable(V),d[V]=!1)}function We(V,we){return u[V]!==we?(t.bindFramebuffer(V,we),u[V]=we,V===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=we),V===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=we),!0):!1}function Ze(V,we){let fe=g,oe=!1;if(V){fe=p.get(we),fe===void 0&&(fe=[],p.set(we,fe));const Pe=V.textures;if(fe.length!==Pe.length||fe[0]!==t.COLOR_ATTACHMENT0){for(let ye=0,je=Pe.length;ye<je;ye++)fe[ye]=t.COLOR_ATTACHMENT0+ye;fe.length=Pe.length,oe=!0}}else fe[0]!==t.BACK&&(fe[0]=t.BACK,oe=!0);oe&&t.drawBuffers(fe)}function wt(V){return b!==V?(t.useProgram(V),b=V,!0):!1}const tt={[Vs]:t.FUNC_ADD,[XE]:t.FUNC_SUBTRACT,[WE]:t.FUNC_REVERSE_SUBTRACT};tt[qE]=t.MIN,tt[jE]=t.MAX;const Mt={[YE]:t.ZERO,[ZE]:t.ONE,[KE]:t.SRC_COLOR,[Xh]:t.SRC_ALPHA,[n1]:t.SRC_ALPHA_SATURATE,[e1]:t.DST_COLOR,[$E]:t.DST_ALPHA,[QE]:t.ONE_MINUS_SRC_COLOR,[Wh]:t.ONE_MINUS_SRC_ALPHA,[t1]:t.ONE_MINUS_DST_COLOR,[JE]:t.ONE_MINUS_DST_ALPHA,[i1]:t.CONSTANT_COLOR,[a1]:t.ONE_MINUS_CONSTANT_COLOR,[s1]:t.CONSTANT_ALPHA,[r1]:t.ONE_MINUS_CONSTANT_ALPHA};function gt(V,we,fe,oe,Pe,ye,je,Ve,bt,It){if(V===za){m===!0&&(ze(t.BLEND),m=!1);return}if(m===!1&&(ce(t.BLEND),m=!0),V!==kE){if(V!==f||It!==U){if((v!==Vs||N!==Vs)&&(t.blendEquation(t.FUNC_ADD),v=Vs,N=Vs),It)switch(V){case Qs:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Yr:t.blendFunc(t.ONE,t.ONE);break;case B0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case F0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:zt("WebGLState: Invalid blending: ",V);break}else switch(V){case Qs:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Yr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case B0:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case F0:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",V);break}S=null,x=null,w=null,C=null,y.set(0,0,0),D=0,f=V,U=It}return}Pe=Pe||we,ye=ye||fe,je=je||oe,(we!==v||Pe!==N)&&(t.blendEquationSeparate(tt[we],tt[Pe]),v=we,N=Pe),(fe!==S||oe!==x||ye!==w||je!==C)&&(t.blendFuncSeparate(Mt[fe],Mt[oe],Mt[ye],Mt[je]),S=fe,x=oe,w=ye,C=je),(Ve.equals(y)===!1||bt!==D)&&(t.blendColor(Ve.r,Ve.g,Ve.b,bt),y.copy(Ve),D=bt),f=V,U=!1}function ht(V,we){V.side===wa?ze(t.CULL_FACE):ce(t.CULL_FACE);let fe=V.side===si;we&&(fe=!fe),Ot(fe),V.blending===Qs&&V.transparent===!1?gt(za):gt(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),r.setFunc(V.depthFunc),r.setTest(V.depthTest),r.setMask(V.depthWrite),s.setMask(V.colorWrite);const oe=V.stencilWrite;o.setTest(oe),oe&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Zt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ce(t.SAMPLE_ALPHA_TO_COVERAGE):ze(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(V){P!==V&&(V?t.frontFace(t.CW):t.frontFace(t.CCW),P=V)}function rt(V){V!==HE?(ce(t.CULL_FACE),V!==B&&(V===I0?t.cullFace(t.BACK):V===GE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):ze(t.CULL_FACE),B=V}function Wt(V){V!==z&&(H&&t.lineWidth(V),z=V)}function Zt(V,we,fe){V?(ce(t.POLYGON_OFFSET_FILL),(G!==we||k!==fe)&&(G=we,k=fe,r.getReversed()&&(we=-we),t.polygonOffset(we,fe))):ze(t.POLYGON_OFFSET_FILL)}function ct(V){V?ce(t.SCISSOR_TEST):ze(t.SCISSOR_TEST)}function Z(V){V===void 0&&(V=t.TEXTURE0+F-1),de!==V&&(t.activeTexture(V),de=V)}function O(V,we,fe){fe===void 0&&(de===null?fe=t.TEXTURE0+F-1:fe=de);let oe=Te[fe];oe===void 0&&(oe={type:void 0,texture:void 0},Te[fe]=oe),(oe.type!==V||oe.texture!==we)&&(de!==fe&&(t.activeTexture(fe),de=fe),t.bindTexture(V,we||Re[V]),oe.type=V,oe.texture=we)}function He(){const V=Te[de];V!==void 0&&V.type!==void 0&&(t.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function Ue(){try{t.compressedTexImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function E(){try{t.compressedTexImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function _(){try{t.texSubImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function W(){try{t.texSubImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function Q(){try{t.compressedTexSubImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function ie(){try{t.compressedTexSubImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function me(){try{t.texStorage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function be(){try{t.texStorage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function ae(){try{t.texImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function K(){try{t.texImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function ue(V){return h[V]!==void 0?h[V]:t.getParameter(V)}function ge(V,we){h[V]!==we&&(t.pixelStorei(V,we),h[V]=we)}function Se(V){$e.equals(V)===!1&&(t.scissor(V.x,V.y,V.z,V.w),$e.copy(V))}function Ee(V){st.equals(V)===!1&&(t.viewport(V.x,V.y,V.z,V.w),st.copy(V))}function Ge(V,we){let fe=c.get(we);fe===void 0&&(fe=new WeakMap,c.set(we,fe));let oe=fe.get(V);oe===void 0&&(oe=t.getUniformBlockIndex(we,V.name),fe.set(V,oe))}function qe(V,we){const oe=c.get(we).get(V);l.get(we)!==oe&&(t.uniformBlockBinding(we,oe,V.__bindingPointIndex),l.set(we,oe))}function it(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),d={},h={},de=null,Te={},u={},p=new WeakMap,g=[],b=null,m=!1,f=null,v=null,S=null,x=null,N=null,w=null,C=null,y=new Rt(0,0,0),D=0,U=!1,P=null,B=null,z=null,G=null,k=null,$e.set(0,0,t.canvas.width,t.canvas.height),st.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:ce,disable:ze,bindFramebuffer:We,drawBuffers:Ze,useProgram:wt,setBlending:gt,setMaterial:ht,setFlipSided:Ot,setCullFace:rt,setLineWidth:Wt,setPolygonOffset:Zt,setScissorTest:ct,activeTexture:Z,bindTexture:O,unbindTexture:He,compressedTexImage2D:Ue,compressedTexImage3D:E,texImage2D:ae,texImage3D:K,pixelStorei:ge,getParameter:ue,updateUBOMapping:Ge,uniformBlockBinding:qe,texStorage2D:me,texStorage3D:be,texSubImage2D:_,texSubImage3D:W,compressedTexSubImage2D:Q,compressedTexSubImage3D:ie,scissor:Se,viewport:Ee,reset:it}}function Vw(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,d=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(E,_){return g?new OffscreenCanvas(E,_):Ju("canvas")}function m(E,_,W){let Q=1;const ie=Ue(E);if((ie.width>W||ie.height>W)&&(Q=W/Math.max(ie.width,ie.height)),Q<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const me=Math.floor(Q*ie.width),be=Math.floor(Q*ie.height);u===void 0&&(u=b(me,be));const ae=_?b(me,be):u;return ae.width=me,ae.height=be,ae.getContext("2d").drawImage(E,0,0,me,be),ot("WebGLRenderer: Texture has been resized from ("+ie.width+"x"+ie.height+") to ("+me+"x"+be+")."),ae}else return"data"in E&&ot("WebGLRenderer: Image in DataTexture is too big ("+ie.width+"x"+ie.height+")."),E;return E}function f(E){return E.generateMipmaps}function v(E){t.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?t.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(E,_,W,Q,ie,me=!1){if(E!==null){if(t[E]!==void 0)return t[E];ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let be;Q&&(be=e.get("EXT_texture_norm16"),be||ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=_;if(_===t.RED&&(W===t.FLOAT&&(ae=t.R32F),W===t.HALF_FLOAT&&(ae=t.R16F),W===t.UNSIGNED_BYTE&&(ae=t.R8),W===t.UNSIGNED_SHORT&&be&&(ae=be.R16_EXT),W===t.SHORT&&be&&(ae=be.R16_SNORM_EXT)),_===t.RED_INTEGER&&(W===t.UNSIGNED_BYTE&&(ae=t.R8UI),W===t.UNSIGNED_SHORT&&(ae=t.R16UI),W===t.UNSIGNED_INT&&(ae=t.R32UI),W===t.BYTE&&(ae=t.R8I),W===t.SHORT&&(ae=t.R16I),W===t.INT&&(ae=t.R32I)),_===t.RG&&(W===t.FLOAT&&(ae=t.RG32F),W===t.HALF_FLOAT&&(ae=t.RG16F),W===t.UNSIGNED_BYTE&&(ae=t.RG8),W===t.UNSIGNED_SHORT&&be&&(ae=be.RG16_EXT),W===t.SHORT&&be&&(ae=be.RG16_SNORM_EXT)),_===t.RG_INTEGER&&(W===t.UNSIGNED_BYTE&&(ae=t.RG8UI),W===t.UNSIGNED_SHORT&&(ae=t.RG16UI),W===t.UNSIGNED_INT&&(ae=t.RG32UI),W===t.BYTE&&(ae=t.RG8I),W===t.SHORT&&(ae=t.RG16I),W===t.INT&&(ae=t.RG32I)),_===t.RGB_INTEGER&&(W===t.UNSIGNED_BYTE&&(ae=t.RGB8UI),W===t.UNSIGNED_SHORT&&(ae=t.RGB16UI),W===t.UNSIGNED_INT&&(ae=t.RGB32UI),W===t.BYTE&&(ae=t.RGB8I),W===t.SHORT&&(ae=t.RGB16I),W===t.INT&&(ae=t.RGB32I)),_===t.RGBA_INTEGER&&(W===t.UNSIGNED_BYTE&&(ae=t.RGBA8UI),W===t.UNSIGNED_SHORT&&(ae=t.RGBA16UI),W===t.UNSIGNED_INT&&(ae=t.RGBA32UI),W===t.BYTE&&(ae=t.RGBA8I),W===t.SHORT&&(ae=t.RGBA16I),W===t.INT&&(ae=t.RGBA32I)),_===t.RGB&&(W===t.UNSIGNED_SHORT&&be&&(ae=be.RGB16_EXT),W===t.SHORT&&be&&(ae=be.RGB16_SNORM_EXT),W===t.UNSIGNED_INT_5_9_9_9_REV&&(ae=t.RGB9_E5),W===t.UNSIGNED_INT_10F_11F_11F_REV&&(ae=t.R11F_G11F_B10F)),_===t.RGBA){const K=me?Qu:Nt.getTransfer(ie);W===t.FLOAT&&(ae=t.RGBA32F),W===t.HALF_FLOAT&&(ae=t.RGBA16F),W===t.UNSIGNED_BYTE&&(ae=K===qt?t.SRGB8_ALPHA8:t.RGBA8),W===t.UNSIGNED_SHORT&&be&&(ae=be.RGBA16_EXT),W===t.SHORT&&be&&(ae=be.RGBA16_SNORM_EXT),W===t.UNSIGNED_SHORT_4_4_4_4&&(ae=t.RGBA4),W===t.UNSIGNED_SHORT_5_5_5_1&&(ae=t.RGB5_A1)}return(ae===t.R16F||ae===t.R32F||ae===t.RG16F||ae===t.RG32F||ae===t.RGBA16F||ae===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function N(E,_){let W;return E?_===null||_===ua||_===zl?W=t.DEPTH24_STENCIL8:_===Yi?W=t.DEPTH32F_STENCIL8:_===Pl&&(W=t.DEPTH24_STENCIL8,ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ua||_===zl?W=t.DEPTH_COMPONENT24:_===Yi?W=t.DEPTH_COMPONENT32F:_===Pl&&(W=t.DEPTH_COMPONENT16),W}function w(E,_){return f(E)===!0||E.isFramebufferTexture&&E.minFilter!==In&&E.minFilter!==kn?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function C(E){const _=E.target;_.removeEventListener("dispose",C),D(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function y(E){const _=E.target;_.removeEventListener("dispose",y),P(_)}function D(E){const _=i.get(E);if(_.__webglInit===void 0)return;const W=E.source,Q=p.get(W);if(Q){const ie=Q[_.__cacheKey];ie.usedTimes--,ie.usedTimes===0&&U(E),Object.keys(Q).length===0&&p.delete(W)}i.remove(E)}function U(E){const _=i.get(E);t.deleteTexture(_.__webglTexture);const W=E.source,Q=p.get(W);delete Q[_.__cacheKey],r.memory.textures--}function P(E){const _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(_.__webglFramebuffer[Q]))for(let ie=0;ie<_.__webglFramebuffer[Q].length;ie++)t.deleteFramebuffer(_.__webglFramebuffer[Q][ie]);else t.deleteFramebuffer(_.__webglFramebuffer[Q]);_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer[Q])}else{if(Array.isArray(_.__webglFramebuffer))for(let Q=0;Q<_.__webglFramebuffer.length;Q++)t.deleteFramebuffer(_.__webglFramebuffer[Q]);else t.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&t.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Q=0;Q<_.__webglColorRenderbuffer.length;Q++)_.__webglColorRenderbuffer[Q]&&t.deleteRenderbuffer(_.__webglColorRenderbuffer[Q]);_.__webglDepthRenderbuffer&&t.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const W=E.textures;for(let Q=0,ie=W.length;Q<ie;Q++){const me=i.get(W[Q]);me.__webglTexture&&(t.deleteTexture(me.__webglTexture),r.memory.textures--),i.remove(W[Q])}i.remove(E)}let B=0;function z(){B=0}function G(){return B}function k(E){B=E}function F(){const E=B;return E>=a.maxTextures&&ot("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+a.maxTextures),B+=1,E}function H(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function I(E,_){const W=i.get(E);if(E.isVideoTexture&&O(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&W.__version!==E.version){const Q=E.image;if(Q===null)ot("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)ot("WebGLRenderer: Texture marked for update but image is incomplete");else{ze(W,E,_);return}}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,W.__webglTexture,t.TEXTURE0+_)}function j(E,_){const W=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){ze(W,E,_);return}else E.isExternalTexture&&(W.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,W.__webglTexture,t.TEXTURE0+_)}function de(E,_){const W=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&W.__version!==E.version){ze(W,E,_);return}n.bindTexture(t.TEXTURE_3D,W.__webglTexture,t.TEXTURE0+_)}function Te(E,_){const W=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&W.__version!==E.version){We(W,E,_);return}n.bindTexture(t.TEXTURE_CUBE_MAP,W.__webglTexture,t.TEXTURE0+_)}const Oe={[Jh]:t.REPEAT,[Ua]:t.CLAMP_TO_EDGE,[ep]:t.MIRRORED_REPEAT},et={[In]:t.NEAREST,[c1]:t.NEAREST_MIPMAP_NEAREST,[gc]:t.NEAREST_MIPMAP_LINEAR,[kn]:t.LINEAR,[md]:t.LINEAR_MIPMAP_NEAREST,[Xs]:t.LINEAR_MIPMAP_LINEAR},$e={[d1]:t.NEVER,[v1]:t.ALWAYS,[h1]:t.LESS,[Zm]:t.LEQUAL,[p1]:t.EQUAL,[Km]:t.GEQUAL,[m1]:t.GREATER,[g1]:t.NOTEQUAL};function st(E,_){if(_.type===Yi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===kn||_.magFilter===md||_.magFilter===gc||_.magFilter===Xs||_.minFilter===kn||_.minFilter===md||_.minFilter===gc||_.minFilter===Xs)&&ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(E,t.TEXTURE_WRAP_S,Oe[_.wrapS]),t.texParameteri(E,t.TEXTURE_WRAP_T,Oe[_.wrapT]),(E===t.TEXTURE_3D||E===t.TEXTURE_2D_ARRAY)&&t.texParameteri(E,t.TEXTURE_WRAP_R,Oe[_.wrapR]),t.texParameteri(E,t.TEXTURE_MAG_FILTER,et[_.magFilter]),t.texParameteri(E,t.TEXTURE_MIN_FILTER,et[_.minFilter]),_.compareFunction&&(t.texParameteri(E,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(E,t.TEXTURE_COMPARE_FUNC,$e[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===In||_.minFilter!==gc&&_.minFilter!==Xs||_.type===Yi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");t.texParameterf(E,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function pe(E,_){let W=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",C));const Q=_.source;let ie=p.get(Q);ie===void 0&&(ie={},p.set(Q,ie));const me=H(_);if(me!==E.__cacheKey){ie[me]===void 0&&(ie[me]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,W=!0),ie[me].usedTimes++;const be=ie[E.__cacheKey];be!==void 0&&(ie[E.__cacheKey].usedTimes--,be.usedTimes===0&&U(_)),E.__cacheKey=me,E.__webglTexture=ie[me].texture}return W}function Re(E,_,W){return Math.floor(Math.floor(E/W)/_)}function ce(E,_,W,Q){const me=E.updateRanges;if(me.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,_.width,_.height,W,Q,_.data);else{me.sort((ge,Se)=>ge.start-Se.start);let be=0;for(let ge=1;ge<me.length;ge++){const Se=me[be],Ee=me[ge],Ge=Se.start+Se.count,qe=Re(Ee.start,_.width,4),it=Re(Se.start,_.width,4);Ee.start<=Ge+1&&qe===it&&Re(Ee.start+Ee.count-1,_.width,4)===qe?Se.count=Math.max(Se.count,Ee.start+Ee.count-Se.start):(++be,me[be]=Ee)}me.length=be+1;const ae=n.getParameter(t.UNPACK_ROW_LENGTH),K=n.getParameter(t.UNPACK_SKIP_PIXELS),ue=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,_.width);for(let ge=0,Se=me.length;ge<Se;ge++){const Ee=me[ge],Ge=Math.floor(Ee.start/4),qe=Math.ceil(Ee.count/4),it=Ge%_.width,V=Math.floor(Ge/_.width),we=qe,fe=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,it),n.pixelStorei(t.UNPACK_SKIP_ROWS,V),n.texSubImage2D(t.TEXTURE_2D,0,it,V,we,fe,W,Q,_.data)}E.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ae),n.pixelStorei(t.UNPACK_SKIP_PIXELS,K),n.pixelStorei(t.UNPACK_SKIP_ROWS,ue)}}function ze(E,_,W){let Q=t.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Q=t.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Q=t.TEXTURE_3D);const ie=pe(E,_),me=_.source;n.bindTexture(Q,E.__webglTexture,t.TEXTURE0+W);const be=i.get(me);if(me.version!==be.__version||ie===!0){if(n.activeTexture(t.TEXTURE0+W),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const fe=Nt.getPrimaries(Nt.workingColorSpace),oe=_.colorSpace===rs?null:Nt.getPrimaries(_.colorSpace),Pe=_.colorSpace===rs||fe===oe?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}n.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment);let K=m(_.image,!1,a.maxTextureSize);K=He(_,K);const ue=s.convert(_.format,_.colorSpace),ge=s.convert(_.type);let Se=x(_.internalFormat,ue,ge,_.normalized,_.colorSpace,_.isVideoTexture);st(Q,_);let Ee;const Ge=_.mipmaps,qe=_.isVideoTexture!==!0,it=be.__version===void 0||ie===!0,V=me.dataReady,we=w(_,K);if(_.isDepthTexture)Se=N(_.format===Ws,_.type),it&&(qe?n.texStorage2D(t.TEXTURE_2D,1,Se,K.width,K.height):n.texImage2D(t.TEXTURE_2D,0,Se,K.width,K.height,0,ue,ge,null));else if(_.isDataTexture)if(Ge.length>0){qe&&it&&n.texStorage2D(t.TEXTURE_2D,we,Se,Ge[0].width,Ge[0].height);for(let fe=0,oe=Ge.length;fe<oe;fe++)Ee=Ge[fe],qe?V&&n.texSubImage2D(t.TEXTURE_2D,fe,0,0,Ee.width,Ee.height,ue,ge,Ee.data):n.texImage2D(t.TEXTURE_2D,fe,Se,Ee.width,Ee.height,0,ue,ge,Ee.data);_.generateMipmaps=!1}else qe?(it&&n.texStorage2D(t.TEXTURE_2D,we,Se,K.width,K.height),V&&ce(_,K,ue,ge)):n.texImage2D(t.TEXTURE_2D,0,Se,K.width,K.height,0,ue,ge,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){qe&&it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,we,Se,Ge[0].width,Ge[0].height,K.depth);for(let fe=0,oe=Ge.length;fe<oe;fe++)if(Ee=Ge[fe],_.format!==Zi)if(ue!==null)if(qe){if(V)if(_.layerUpdates.size>0){const Pe=xv(Ee.width,Ee.height,_.format,_.type);for(const ye of _.layerUpdates){const je=Ee.data.subarray(ye*Pe/Ee.data.BYTES_PER_ELEMENT,(ye+1)*Pe/Ee.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,ye,Ee.width,Ee.height,1,ue,je)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,0,Ee.width,Ee.height,K.depth,ue,Ee.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,fe,Se,Ee.width,Ee.height,K.depth,0,Ee.data,0,0);else ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else qe?V&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,0,Ee.width,Ee.height,K.depth,ue,ge,Ee.data):n.texImage3D(t.TEXTURE_2D_ARRAY,fe,Se,Ee.width,Ee.height,K.depth,0,ue,ge,Ee.data)}else{qe&&it&&n.texStorage2D(t.TEXTURE_2D,we,Se,Ge[0].width,Ge[0].height);for(let fe=0,oe=Ge.length;fe<oe;fe++)Ee=Ge[fe],_.format!==Zi?ue!==null?qe?V&&n.compressedTexSubImage2D(t.TEXTURE_2D,fe,0,0,Ee.width,Ee.height,ue,Ee.data):n.compressedTexImage2D(t.TEXTURE_2D,fe,Se,Ee.width,Ee.height,0,Ee.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qe?V&&n.texSubImage2D(t.TEXTURE_2D,fe,0,0,Ee.width,Ee.height,ue,ge,Ee.data):n.texImage2D(t.TEXTURE_2D,fe,Se,Ee.width,Ee.height,0,ue,ge,Ee.data)}else if(_.isDataArrayTexture)if(qe){if(it&&n.texStorage3D(t.TEXTURE_2D_ARRAY,we,Se,K.width,K.height,K.depth),V)if(_.layerUpdates.size>0){const fe=xv(K.width,K.height,_.format,_.type);for(const oe of _.layerUpdates){const Pe=K.data.subarray(oe*fe/K.data.BYTES_PER_ELEMENT,(oe+1)*fe/K.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,oe,K.width,K.height,1,ue,ge,Pe)}_.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,ue,ge,K.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Se,K.width,K.height,K.depth,0,ue,ge,K.data);else if(_.isData3DTexture)qe?(it&&n.texStorage3D(t.TEXTURE_3D,we,Se,K.width,K.height,K.depth),V&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,ue,ge,K.data)):n.texImage3D(t.TEXTURE_3D,0,Se,K.width,K.height,K.depth,0,ue,ge,K.data);else if(_.isFramebufferTexture){if(it)if(qe)n.texStorage2D(t.TEXTURE_2D,we,Se,K.width,K.height);else{let fe=K.width,oe=K.height;for(let Pe=0;Pe<we;Pe++)n.texImage2D(t.TEXTURE_2D,Pe,Se,fe,oe,0,ue,ge,null),fe>>=1,oe>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in t){const fe=t.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),K.parentNode!==fe){fe.appendChild(K),h.add(_),fe.onpaint=oe=>{const Pe=oe.changedElements;for(const ye of h)Pe.includes(ye.image)&&(ye.needsUpdate=!0)},fe.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,K);else{const Pe=t.RGBA,ye=t.RGBA,je=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,Pe,ye,je,K)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Ge.length>0){if(qe&&it){const fe=Ue(Ge[0]);n.texStorage2D(t.TEXTURE_2D,we,Se,fe.width,fe.height)}for(let fe=0,oe=Ge.length;fe<oe;fe++)Ee=Ge[fe],qe?V&&n.texSubImage2D(t.TEXTURE_2D,fe,0,0,ue,ge,Ee):n.texImage2D(t.TEXTURE_2D,fe,Se,ue,ge,Ee);_.generateMipmaps=!1}else if(qe){if(it){const fe=Ue(K);n.texStorage2D(t.TEXTURE_2D,we,Se,fe.width,fe.height)}V&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ue,ge,K)}else n.texImage2D(t.TEXTURE_2D,0,Se,ue,ge,K);f(_)&&v(Q),be.__version=me.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function We(E,_,W){if(_.image.length!==6)return;const Q=pe(E,_),ie=_.source;n.bindTexture(t.TEXTURE_CUBE_MAP,E.__webglTexture,t.TEXTURE0+W);const me=i.get(ie);if(ie.version!==me.__version||Q===!0){n.activeTexture(t.TEXTURE0+W);const be=Nt.getPrimaries(Nt.workingColorSpace),ae=_.colorSpace===rs?null:Nt.getPrimaries(_.colorSpace),K=_.colorSpace===rs||be===ae?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const ue=_.isCompressedTexture||_.image[0].isCompressedTexture,ge=_.image[0]&&_.image[0].isDataTexture,Se=[];for(let ye=0;ye<6;ye++)!ue&&!ge?Se[ye]=m(_.image[ye],!0,a.maxCubemapSize):Se[ye]=ge?_.image[ye].image:_.image[ye],Se[ye]=He(_,Se[ye]);const Ee=Se[0],Ge=s.convert(_.format,_.colorSpace),qe=s.convert(_.type),it=x(_.internalFormat,Ge,qe,_.normalized,_.colorSpace),V=_.isVideoTexture!==!0,we=me.__version===void 0||Q===!0,fe=ie.dataReady;let oe=w(_,Ee);st(t.TEXTURE_CUBE_MAP,_);let Pe;if(ue){V&&we&&n.texStorage2D(t.TEXTURE_CUBE_MAP,oe,it,Ee.width,Ee.height);for(let ye=0;ye<6;ye++){Pe=Se[ye].mipmaps;for(let je=0;je<Pe.length;je++){const Ve=Pe[je];_.format!==Zi?Ge!==null?V?fe&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je,0,0,Ve.width,Ve.height,Ge,Ve.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je,it,Ve.width,Ve.height,0,Ve.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je,0,0,Ve.width,Ve.height,Ge,qe,Ve.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je,it,Ve.width,Ve.height,0,Ge,qe,Ve.data)}}}else{if(Pe=_.mipmaps,V&&we){Pe.length>0&&oe++;const ye=Ue(Se[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,oe,it,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(ge){V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Se[ye].width,Se[ye].height,Ge,qe,Se[ye].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,it,Se[ye].width,Se[ye].height,0,Ge,qe,Se[ye].data);for(let je=0;je<Pe.length;je++){const bt=Pe[je].image[ye].image;V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je+1,0,0,bt.width,bt.height,Ge,qe,bt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je+1,it,bt.width,bt.height,0,Ge,qe,bt.data)}}else{V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,Ge,qe,Se[ye]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,it,Ge,qe,Se[ye]);for(let je=0;je<Pe.length;je++){const Ve=Pe[je];V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je+1,0,0,Ge,qe,Ve.image[ye]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ye,je+1,it,Ge,qe,Ve.image[ye])}}}f(_)&&v(t.TEXTURE_CUBE_MAP),me.__version=ie.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function Ze(E,_,W,Q,ie,me){const be=s.convert(W.format,W.colorSpace),ae=s.convert(W.type),K=x(W.internalFormat,be,ae,W.normalized,W.colorSpace),ue=i.get(_),ge=i.get(W);if(ge.__renderTarget=_,!ue.__hasExternalTextures){const Se=Math.max(1,_.width>>me),Ee=Math.max(1,_.height>>me);ie===t.TEXTURE_3D||ie===t.TEXTURE_2D_ARRAY?n.texImage3D(ie,me,K,Se,Ee,_.depth,0,be,ae,null):n.texImage2D(ie,me,K,Se,Ee,0,be,ae,null)}n.bindFramebuffer(t.FRAMEBUFFER,E),Z(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Q,ie,ge.__webglTexture,0,ct(_)):(ie===t.TEXTURE_2D||ie>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&ie<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Q,ie,ge.__webglTexture,me),n.bindFramebuffer(t.FRAMEBUFFER,null)}function wt(E,_,W){if(t.bindRenderbuffer(t.RENDERBUFFER,E),_.depthBuffer){const Q=_.depthTexture,ie=Q&&Q.isDepthTexture?Q.type:null,me=N(_.stencilBuffer,ie),be=_.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Z(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ct(_),me,_.width,_.height):W?t.renderbufferStorageMultisample(t.RENDERBUFFER,ct(_),me,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,me,_.width,_.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,be,t.RENDERBUFFER,E)}else{const Q=_.textures;for(let ie=0;ie<Q.length;ie++){const me=Q[ie],be=s.convert(me.format,me.colorSpace),ae=s.convert(me.type),K=x(me.internalFormat,be,ae,me.normalized,me.colorSpace);Z(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,ct(_),K,_.width,_.height):W?t.renderbufferStorageMultisample(t.RENDERBUFFER,ct(_),K,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,K,_.width,_.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function tt(E,_,W){const Q=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const ie=i.get(_.depthTexture);if(ie.__renderTarget=_,(!ie.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Q){if(ie.__webglInit===void 0&&(ie.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),ie.__webglTexture===void 0){ie.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,ie.__webglTexture),st(t.TEXTURE_CUBE_MAP,_.depthTexture);const ue=s.convert(_.depthTexture.format),ge=s.convert(_.depthTexture.type);let Se;_.depthTexture.format===Xa?Se=t.DEPTH_COMPONENT24:_.depthTexture.format===Ws&&(Se=t.DEPTH24_STENCIL8);for(let Ee=0;Ee<6;Ee++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Ee,0,Se,_.width,_.height,0,ue,ge,null)}}else I(_.depthTexture,0);const me=ie.__webglTexture,be=ct(_),ae=Q?t.TEXTURE_CUBE_MAP_POSITIVE_X+W:t.TEXTURE_2D,K=_.depthTexture.format===Ws?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(_.depthTexture.format===Xa)Z(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,ae,me,0,be):t.framebufferTexture2D(t.FRAMEBUFFER,K,ae,me,0);else if(_.depthTexture.format===Ws)Z(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,ae,me,0,be):t.framebufferTexture2D(t.FRAMEBUFFER,K,ae,me,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Mt(E){const _=i.get(E),W=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const Q=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Q){const ie=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Q.removeEventListener("dispose",ie)};Q.addEventListener("dispose",ie),_.__depthDisposeCallback=ie}_.__boundDepthTexture=Q}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(W)for(let Q=0;Q<6;Q++)tt(_.__webglFramebuffer[Q],E,Q);else{const Q=E.texture.mipmaps;Q&&Q.length>0?tt(_.__webglFramebuffer[0],E,0):tt(_.__webglFramebuffer,E,0)}else if(W){_.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[Q]),_.__webglDepthbuffer[Q]===void 0)_.__webglDepthbuffer[Q]=t.createRenderbuffer(),wt(_.__webglDepthbuffer[Q],E,!1);else{const ie=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=_.__webglDepthbuffer[Q];t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ie,t.RENDERBUFFER,me)}}else{const Q=E.texture.mipmaps;if(Q&&Q.length>0?n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=t.createRenderbuffer(),wt(_.__webglDepthbuffer,E,!1);else{const ie=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,me=_.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,me),t.framebufferRenderbuffer(t.FRAMEBUFFER,ie,t.RENDERBUFFER,me)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function gt(E,_,W){const Q=i.get(E);_!==void 0&&Ze(Q.__webglFramebuffer,E,E.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),W!==void 0&&Mt(E)}function ht(E){const _=E.texture,W=i.get(E),Q=i.get(_);E.addEventListener("dispose",y);const ie=E.textures,me=E.isWebGLCubeRenderTarget===!0,be=ie.length>1;if(be||(Q.__webglTexture===void 0&&(Q.__webglTexture=t.createTexture()),Q.__version=_.version,r.memory.textures++),me){W.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer[ae]=[];for(let K=0;K<_.mipmaps.length;K++)W.__webglFramebuffer[ae][K]=t.createFramebuffer()}else W.__webglFramebuffer[ae]=t.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){W.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)W.__webglFramebuffer[ae]=t.createFramebuffer()}else W.__webglFramebuffer=t.createFramebuffer();if(be)for(let ae=0,K=ie.length;ae<K;ae++){const ue=i.get(ie[ae]);ue.__webglTexture===void 0&&(ue.__webglTexture=t.createTexture(),r.memory.textures++)}if(E.samples>0&&Z(E)===!1){W.__webglMultisampledFramebuffer=t.createFramebuffer(),W.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ae=0;ae<ie.length;ae++){const K=ie[ae];W.__webglColorRenderbuffer[ae]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,W.__webglColorRenderbuffer[ae]);const ue=s.convert(K.format,K.colorSpace),ge=s.convert(K.type),Se=x(K.internalFormat,ue,ge,K.normalized,K.colorSpace,E.isXRRenderTarget===!0),Ee=ct(E);t.renderbufferStorageMultisample(t.RENDERBUFFER,Ee,Se,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ae,t.RENDERBUFFER,W.__webglColorRenderbuffer[ae])}t.bindRenderbuffer(t.RENDERBUFFER,null),E.depthBuffer&&(W.__webglDepthRenderbuffer=t.createRenderbuffer(),wt(W.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(me){n.bindTexture(t.TEXTURE_CUBE_MAP,Q.__webglTexture),st(t.TEXTURE_CUBE_MAP,_);for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Ze(W.__webglFramebuffer[ae][K],E,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,K);else Ze(W.__webglFramebuffer[ae],E,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);f(_)&&v(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(be){for(let ae=0,K=ie.length;ae<K;ae++){const ue=ie[ae],ge=i.get(ue);let Se=t.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(Se=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Se,ge.__webglTexture),st(Se,ue),Ze(W.__webglFramebuffer,E,ue,t.COLOR_ATTACHMENT0+ae,Se,0),f(ue)&&v(Se)}n.unbindTexture()}else{let ae=t.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ae=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ae,Q.__webglTexture),st(ae,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Ze(W.__webglFramebuffer[K],E,_,t.COLOR_ATTACHMENT0,ae,K);else Ze(W.__webglFramebuffer,E,_,t.COLOR_ATTACHMENT0,ae,0);f(_)&&v(ae),n.unbindTexture()}E.depthBuffer&&Mt(E)}function Ot(E){const _=E.textures;for(let W=0,Q=_.length;W<Q;W++){const ie=_[W];if(f(ie)){const me=S(E),be=i.get(ie).__webglTexture;n.bindTexture(me,be),v(me),n.unbindTexture()}}}const rt=[],Wt=[];function Zt(E){if(E.samples>0){if(Z(E)===!1){const _=E.textures,W=E.width,Q=E.height;let ie=t.COLOR_BUFFER_BIT;const me=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,be=i.get(E),ae=_.length>1;if(ae)for(let ue=0;ue<_.length;ue++)n.bindFramebuffer(t.FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,be.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);const K=E.texture.mipmaps;K&&K.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let ue=0;ue<_.length;ue++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(ie|=t.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(ie|=t.STENCIL_BUFFER_BIT)),ae){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,be.__webglColorRenderbuffer[ue]);const ge=i.get(_[ue]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ge,0)}t.blitFramebuffer(0,0,W,Q,0,0,W,Q,ie,t.NEAREST),l===!0&&(rt.length=0,Wt.length=0,rt.push(t.COLOR_ATTACHMENT0+ue),E.depthBuffer&&E.resolveDepthBuffer===!1&&(rt.push(me),Wt.push(me),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Wt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,rt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ae)for(let ue=0;ue<_.length;ue++){n.bindFramebuffer(t.FRAMEBUFFER,be.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.RENDERBUFFER,be.__webglColorRenderbuffer[ue]);const ge=i.get(_[ue]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,be.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ue,t.TEXTURE_2D,ge,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const _=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[_])}}}function ct(E){return Math.min(a.maxSamples,E.samples)}function Z(E){const _=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function O(E){const _=r.render.frame;d.get(E)!==_&&(d.set(E,_),E.update())}function He(E,_){const W=E.colorSpace,Q=E.format,ie=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||W!==Ku&&W!==rs&&(Nt.getTransfer(W)===qt?(Q!==Zi||ie!==Oi)&&ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",W)),_}function Ue(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=z,this.getTextureUnits=G,this.setTextureUnits=k,this.setTexture2D=I,this.setTexture2DArray=j,this.setTexture3D=de,this.setTextureCube=Te,this.rebindTextures=gt,this.setupRenderTarget=ht,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=Zt,this.setupDepthRenderbuffer=Mt,this.setupFrameBufferTexture=Ze,this.useMultisampledRTT=Z,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function kw(t,e){function n(i,a=rs){let s;const r=Nt.getTransfer(a);if(i===Oi)return t.UNSIGNED_BYTE;if(i===km)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Xm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===lS)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===cS)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===rS)return t.BYTE;if(i===oS)return t.SHORT;if(i===Pl)return t.UNSIGNED_SHORT;if(i===Vm)return t.INT;if(i===ua)return t.UNSIGNED_INT;if(i===Yi)return t.FLOAT;if(i===ka)return t.HALF_FLOAT;if(i===uS)return t.ALPHA;if(i===fS)return t.RGB;if(i===Zi)return t.RGBA;if(i===Xa)return t.DEPTH_COMPONENT;if(i===Ws)return t.DEPTH_STENCIL;if(i===Wm)return t.RED;if(i===qm)return t.RED_INTEGER;if(i===ar)return t.RG;if(i===jm)return t.RG_INTEGER;if(i===Ym)return t.RGBA_INTEGER;if(i===fu||i===du||i===hu||i===pu)if(r===qt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===fu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===hu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===pu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===fu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===du)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===hu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===pu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===tp||i===np||i===ip||i===ap)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===tp)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===np)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ip)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ap)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===sp||i===rp||i===op||i===lp||i===cp||i===Yu||i===up)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===sp||i===rp)return r===qt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===op)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===lp)return s.COMPRESSED_R11_EAC;if(i===cp)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Yu)return s.COMPRESSED_RG11_EAC;if(i===up)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===fp||i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===yp||i===Sp||i===Mp||i===bp||i===Ep)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===fp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===dp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===pp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===gp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===vp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_p)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Mp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===bp)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Ep)return r===qt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Tp||i===Ap||i===Rp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Tp)return r===qt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ap)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Rp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wp||i===Cp||i===Zu||i===Dp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===wp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Cp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Zu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zl?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const Xw=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ww=`
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

}`;class qw{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new ES(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Bn({vertexShader:Xw,fragmentShader:Ww,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Hi(new Ef(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class jw extends dr{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const b=typeof XRWebGLBinding<"u",m=new qw,f={},v=n.getContextAttributes();let S=null,x=null;const N=[],w=[],C=new Gt;let y=null;const D=new Di;D.viewport=new fn;const U=new Di;U.viewport=new fn;const P=[D,U],B=new iT;let z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(pe){let Re=N[pe];return Re===void 0&&(Re=new Md,N[pe]=Re),Re.getTargetRaySpace()},this.getControllerGrip=function(pe){let Re=N[pe];return Re===void 0&&(Re=new Md,N[pe]=Re),Re.getGripSpace()},this.getHand=function(pe){let Re=N[pe];return Re===void 0&&(Re=new Md,N[pe]=Re),Re.getHandSpace()};function k(pe){const Re=w.indexOf(pe.inputSource);if(Re===-1)return;const ce=N[Re];ce!==void 0&&(ce.update(pe.inputSource,pe.frame,c||r),ce.dispatchEvent({type:pe.type,data:pe.inputSource}))}function F(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",F),a.removeEventListener("inputsourceschange",H);for(let pe=0;pe<N.length;pe++){const Re=w[pe];Re!==null&&(w[pe]=null,N[pe].disconnect(Re))}z=null,G=null,m.reset();for(const pe in f)delete f[pe];e.setRenderTarget(S),p=null,u=null,h=null,a=null,x=null,st.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(pe){s=pe,i.isPresenting===!0&&ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(pe){o=pe,i.isPresenting===!0&&ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(pe){c=pe},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&b&&(h=new XRWebGLBinding(a,n)),h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(pe){if(a=pe,a!==null){if(S=e.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",F),a.addEventListener("inputsourceschange",H),v.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(C),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let ce=null,ze=null,We=null;v.depth&&(We=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ce=v.stencil?Ws:Xa,ze=v.stencil?zl:ua);const Ze={colorFormat:n.RGBA8,depthFormat:We,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Ze),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new ca(u.textureWidth,u.textureHeight,{format:Zi,type:Oi,depthTexture:new yo(u.textureWidth,u.textureHeight,ze,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ce={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,ce),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new ca(p.framebufferWidth,p.framebufferHeight,{format:Zi,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),st.setContext(a),st.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function H(pe){for(let Re=0;Re<pe.removed.length;Re++){const ce=pe.removed[Re],ze=w.indexOf(ce);ze>=0&&(w[ze]=null,N[ze].disconnect(ce))}for(let Re=0;Re<pe.added.length;Re++){const ce=pe.added[Re];let ze=w.indexOf(ce);if(ze===-1){for(let Ze=0;Ze<N.length;Ze++)if(Ze>=w.length){w.push(ce),ze=Ze;break}else if(w[Ze]===null){w[Ze]=ce,ze=Ze;break}if(ze===-1)break}const We=N[ze];We&&We.connect(ce)}}const I=new J,j=new J;function de(pe,Re,ce){I.setFromMatrixPosition(Re.matrixWorld),j.setFromMatrixPosition(ce.matrixWorld);const ze=I.distanceTo(j),We=Re.projectionMatrix.elements,Ze=ce.projectionMatrix.elements,wt=We[14]/(We[10]-1),tt=We[14]/(We[10]+1),Mt=(We[9]+1)/We[5],gt=(We[9]-1)/We[5],ht=(We[8]-1)/We[0],Ot=(Ze[8]+1)/Ze[0],rt=wt*ht,Wt=wt*Ot,Zt=ze/(-ht+Ot),ct=Zt*-ht;if(Re.matrixWorld.decompose(pe.position,pe.quaternion,pe.scale),pe.translateX(ct),pe.translateZ(Zt),pe.matrixWorld.compose(pe.position,pe.quaternion,pe.scale),pe.matrixWorldInverse.copy(pe.matrixWorld).invert(),We[10]===-1)pe.projectionMatrix.copy(Re.projectionMatrix),pe.projectionMatrixInverse.copy(Re.projectionMatrixInverse);else{const Z=wt+Zt,O=tt+Zt,He=rt-ct,Ue=Wt+(ze-ct),E=Mt*tt/O*Z,_=gt*tt/O*Z;pe.projectionMatrix.makePerspective(He,Ue,E,_,Z,O),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert()}}function Te(pe,Re){Re===null?pe.matrixWorld.copy(pe.matrix):pe.matrixWorld.multiplyMatrices(Re.matrixWorld,pe.matrix),pe.matrixWorldInverse.copy(pe.matrixWorld).invert()}this.updateCamera=function(pe){if(a===null)return;let Re=pe.near,ce=pe.far;m.texture!==null&&(m.depthNear>0&&(Re=m.depthNear),m.depthFar>0&&(ce=m.depthFar)),B.near=U.near=D.near=Re,B.far=U.far=D.far=ce,(z!==B.near||G!==B.far)&&(a.updateRenderState({depthNear:B.near,depthFar:B.far}),z=B.near,G=B.far),B.layers.mask=pe.layers.mask|6,D.layers.mask=B.layers.mask&-5,U.layers.mask=B.layers.mask&-3;const ze=pe.parent,We=B.cameras;Te(B,ze);for(let Ze=0;Ze<We.length;Ze++)Te(We[Ze],ze);We.length===2?de(B,D,U):B.projectionMatrix.copy(D.projectionMatrix),Oe(pe,B,ze)};function Oe(pe,Re,ce){ce===null?pe.matrix.copy(Re.matrixWorld):(pe.matrix.copy(ce.matrixWorld),pe.matrix.invert(),pe.matrix.multiply(Re.matrixWorld)),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.updateMatrixWorld(!0),pe.projectionMatrix.copy(Re.projectionMatrix),pe.projectionMatrixInverse.copy(Re.projectionMatrixInverse),pe.isPerspectiveCamera&&(pe.fov=Np*2*Math.atan(1/pe.projectionMatrix.elements[5]),pe.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(pe){l=pe,u!==null&&(u.fixedFoveation=pe),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=pe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(B)},this.getCameraTexture=function(pe){return f[pe]};let et=null;function $e(pe,Re){if(d=Re.getViewerPose(c||r),g=Re,d!==null){const ce=d.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ze=!1;ce.length!==B.cameras.length&&(B.cameras.length=0,ze=!0);for(let tt=0;tt<ce.length;tt++){const Mt=ce[tt];let gt=null;if(p!==null)gt=p.getViewport(Mt);else{const Ot=h.getViewSubImage(u,Mt);gt=Ot.viewport,tt===0&&(e.setRenderTargetTextures(x,Ot.colorTexture,Ot.depthStencilTexture),e.setRenderTarget(x))}let ht=P[tt];ht===void 0&&(ht=new Di,ht.layers.enable(tt),ht.viewport=new fn,P[tt]=ht),ht.matrix.fromArray(Mt.transform.matrix),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.projectionMatrix.fromArray(Mt.projectionMatrix),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert(),ht.viewport.set(gt.x,gt.y,gt.width,gt.height),tt===0&&(B.matrix.copy(ht.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),ze===!0&&B.cameras.push(ht)}const We=a.enabledFeatures;if(We&&We.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){h=i.getBinding();const tt=h.getDepthInformation(ce[0]);tt&&tt.isValid&&tt.texture&&m.init(tt,a.renderState)}if(We&&We.includes("camera-access")&&b){e.state.unbindTexture(),h=i.getBinding();for(let tt=0;tt<ce.length;tt++){const Mt=ce[tt].camera;if(Mt){let gt=f[Mt];gt||(gt=new ES,f[Mt]=gt);const ht=h.getCameraImage(Mt);gt.sourceTexture=ht}}}}for(let ce=0;ce<N.length;ce++){const ze=w[ce],We=N[ce];ze!==null&&We!==void 0&&We.update(ze,Re,c||r)}et&&et(pe,Re),Re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Re}),g=null}const st=new RS;st.setAnimationLoop($e),this.setAnimationLoop=function(pe){et=pe},this.dispose=function(){}}}const Yw=new nn,OS=new dt;OS.set(-1,0,0,0,1,0,0,0,1);function Zw(t,e){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,TS(t)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,v,S,x){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,x)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),b(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===si&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===si&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=e.get(f),S=v.envMap,x=v.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4(Yw.makeRotationFromEuler(x)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(OS),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=S*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===si&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function b(m,f){const v=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function Kw(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,N){const w=N.program;i.uniformBlockBinding(x,w)}function c(x,N){let w=a[x.id];w===void 0&&(m(x),w=d(x),a[x.id]=w,x.addEventListener("dispose",v));const C=N.program;i.updateUBOMapping(x,C);const y=e.render.frame;s[x.id]!==y&&(u(x),s[x.id]=y)}function d(x){const N=h();x.__bindingPointIndex=N;const w=t.createBuffer(),C=x.__size,y=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,w),t.bufferData(t.UNIFORM_BUFFER,C,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,N,w),w}function h(){for(let x=0;x<o;x++)if(r.indexOf(x)===-1)return r.push(x),x;return zt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const N=a[x.id],w=x.uniforms,C=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,N);for(let y=0,D=w.length;y<D;y++){const U=w[y];if(Array.isArray(U))for(let P=0,B=U.length;P<B;P++)p(U[P],y,P,C);else p(U,y,0,C)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(x,N,w,C){if(b(x,N,w,C)===!0){const y=x.__offset,D=x.value;if(Array.isArray(D)){let U=0;for(let P=0;P<D.length;P++){const B=D[P],z=f(B);g(B,x.__data,U),typeof B!="number"&&typeof B!="boolean"&&!B.isMatrix3&&!ArrayBuffer.isView(B)&&(U+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(D,x.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,y,x.__data)}}function g(x,N,w){typeof x=="number"||typeof x=="boolean"?N[0]=x:x.isMatrix3?(N[0]=x.elements[0],N[1]=x.elements[1],N[2]=x.elements[2],N[3]=0,N[4]=x.elements[3],N[5]=x.elements[4],N[6]=x.elements[5],N[7]=0,N[8]=x.elements[6],N[9]=x.elements[7],N[10]=x.elements[8],N[11]=0):ArrayBuffer.isView(x)?N.set(new x.constructor(x.buffer,x.byteOffset,N.length)):x.toArray(N,w)}function b(x,N,w,C){const y=x.value,D=N+"_"+w;if(C[D]===void 0)return typeof y=="number"||typeof y=="boolean"?C[D]=y:ArrayBuffer.isView(y)?C[D]=y.slice():C[D]=y.clone(),!0;{const U=C[D];if(typeof y=="number"||typeof y=="boolean"){if(U!==y)return C[D]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(U.equals(y)===!1)return U.copy(y),!0}}return!1}function m(x){const N=x.uniforms;let w=0;const C=16;for(let D=0,U=N.length;D<U;D++){const P=Array.isArray(N[D])?N[D]:[N[D]];for(let B=0,z=P.length;B<z;B++){const G=P[B],k=Array.isArray(G.value)?G.value:[G.value];for(let F=0,H=k.length;F<H;F++){const I=k[F],j=f(I),de=w%C,Te=de%j.boundary,Oe=de+Te;w+=Te,Oe!==0&&C-Oe<j.storage&&(w+=C-Oe),G.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=w,w+=j.storage}}}const y=w%C;return y>0&&(w+=C-y),x.__size=w,x.__cache={},this}function f(x){const N={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(N.boundary=4,N.storage=4):x.isVector2?(N.boundary=8,N.storage=8):x.isVector3||x.isColor?(N.boundary=16,N.storage=12):x.isVector4?(N.boundary=16,N.storage=16):x.isMatrix3?(N.boundary=48,N.storage=48):x.isMatrix4?(N.boundary=64,N.storage=64):x.isTexture?ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(N.boundary=16,N.storage=x.byteLength):ot("WebGLRenderer: Unsupported uniform value type.",x),N}function v(x){const N=x.target;N.removeEventListener("dispose",v);const w=r.indexOf(N.__bindingPointIndex);r.splice(w,1),t.deleteBuffer(a[N.id]),delete a[N.id],delete s[N.id]}function S(){for(const x in a)t.deleteBuffer(a[x]);r=[],a={},s={}}return{bind:l,update:c,dispose:S}}const Qw=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ea=null;function $w(){return ea===null&&(ea=new yS(Qw,16,16,ar,ka),ea.name="DFG_LUT",ea.minFilter=kn,ea.magFilter=kn,ea.wrapS=Ua,ea.wrapT=Ua,ea.generateMipmaps=!1,ea.needsUpdate=!0),ea}class PS{constructor(e={}){const{canvas:n=x1(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Oi}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const b=p,m=new Set([Ym,jm,qm]),f=new Set([Oi,ua,Pl,zl,km,Xm]),v=new Uint32Array(4),S=new Int32Array(4),x=new J;let N=null,w=null;const C=[],y=[];let D=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const U=this;let P=!1,B=null,z=null,G=null,k=null;this._outputColorSpace=Ai;let F=0,H=0,I=null,j=-1,de=null;const Te=new fn,Oe=new fn;let et=null;const $e=new Rt(0);let st=0,pe=n.width,Re=n.height,ce=1,ze=null,We=null;const Ze=new fn(0,0,pe,Re),wt=new fn(0,0,pe,Re);let tt=!1;const Mt=new SS;let gt=!1,ht=!1;const Ot=new nn,rt=new J,Wt=new fn,Zt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ct=!1;function Z(){return I===null?ce:1}let O=i;function He(A,Y){return n.getContext(A,Y)}try{const A={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Gm}`),n.addEventListener("webglcontextlost",bt,!1),n.addEventListener("webglcontextrestored",It,!1),n.addEventListener("webglcontextcreationerror",Dn,!1),O===null){const Y="webgl2";if(O=He(Y,A),O===null)throw He(Y)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw zt("WebGLRenderer: "+A.message),A}let Ue,E,_,W,Q,ie,me,be,ae,K,ue,ge,Se,Ee,Ge,qe,it,V,we,fe,oe,Pe,ye;function je(){Ue=new $2(O),Ue.init(),oe=new kw(O,Ue),E=new X2(O,Ue,e,oe),_=new Gw(O,Ue),E.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),z=O.createFramebuffer(),G=O.createFramebuffer(),k=O.createFramebuffer(),W=new tR(O),Q=new Rw,ie=new Vw(O,Ue,_,Q,E,oe,W),me=new Q2(U),be=new sT(O),Pe=new V2(O,be),ae=new J2(O,be,W,Pe),K=new iR(O,ae,be,Pe,W),V=new nR(O,E,ie),Ge=new W2(Q),ue=new Aw(U,me,Ue,E,Pe,Ge),ge=new Zw(U,Q),Se=new Cw,Ee=new Pw(Ue),it=new G2(U,me,_,K,g,l),qe=new Hw(U,K,E),ye=new Kw(O,W,E,_),we=new k2(O,Ue,W),fe=new eR(O,Ue,W),W.programs=ue.programs,U.capabilities=E,U.extensions=Ue,U.properties=Q,U.renderLists=Se,U.shadowMap=qe,U.state=_,U.info=W}je(),b!==Oi&&(D=new sR(b,n.width,n.height,o,a,s));const Ve=new jw(U,O);this.xr=Ve,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const A=Ue.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=Ue.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(A){A!==void 0&&(ce=A,this.setSize(pe,Re,!1))},this.getSize=function(A){return A.set(pe,Re)},this.setSize=function(A,Y,se=!0){if(Ve.isPresenting){ot("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=A,Re=Y,n.width=Math.floor(A*ce),n.height=Math.floor(Y*ce),se===!0&&(n.style.width=A+"px",n.style.height=Y+"px"),D!==null&&D.setSize(n.width,n.height),this.setViewport(0,0,A,Y)},this.getDrawingBufferSize=function(A){return A.set(pe*ce,Re*ce).floor()},this.setDrawingBufferSize=function(A,Y,se){pe=A,Re=Y,ce=se,n.width=Math.floor(A*se),n.height=Math.floor(Y*se),this.setViewport(0,0,A,Y)},this.setEffects=function(A){if(b===Oi){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let Y=0;Y<A.length;Y++)if(A[Y].isOutputPass===!0){ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Te)},this.getViewport=function(A){return A.copy(Ze)},this.setViewport=function(A,Y,se,$){A.isVector4?Ze.set(A.x,A.y,A.z,A.w):Ze.set(A,Y,se,$),_.viewport(Te.copy(Ze).multiplyScalar(ce).round())},this.getScissor=function(A){return A.copy(wt)},this.setScissor=function(A,Y,se,$){A.isVector4?wt.set(A.x,A.y,A.z,A.w):wt.set(A,Y,se,$),_.scissor(Oe.copy(wt).multiplyScalar(ce).round())},this.getScissorTest=function(){return tt},this.setScissorTest=function(A){_.setScissorTest(tt=A)},this.setOpaqueSort=function(A){ze=A},this.setTransparentSort=function(A){We=A},this.getClearColor=function(A){return A.copy(it.getClearColor())},this.setClearColor=function(){it.setClearColor(...arguments)},this.getClearAlpha=function(){return it.getClearAlpha()},this.setClearAlpha=function(){it.setClearAlpha(...arguments)},this.clear=function(A=!0,Y=!0,se=!0){let $=0;if(A){let ee=!1;if(I!==null){const Ie=I.texture.format;ee=m.has(Ie)}if(ee){const Ie=I.texture.type,T=f.has(Ie),R=it.getClearColor(),L=it.getClearAlpha(),X=R.r,q=R.g,te=R.b;T?(v[0]=X,v[1]=q,v[2]=te,v[3]=L,O.clearBufferuiv(O.COLOR,0,v)):(S[0]=X,S[1]=q,S[2]=te,S[3]=L,O.clearBufferiv(O.COLOR,0,S))}else $|=O.COLOR_BUFFER_BIT}Y&&($|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),se&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),B=A},this.dispose=function(){n.removeEventListener("webglcontextlost",bt,!1),n.removeEventListener("webglcontextrestored",It,!1),n.removeEventListener("webglcontextcreationerror",Dn,!1),it.dispose(),Se.dispose(),Ee.dispose(),Q.dispose(),me.dispose(),K.dispose(),Pe.dispose(),ye.dispose(),ue.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",li),Ve.removeEventListener("sessionend",Hn),Qn.stop()};function bt(A){A.preventDefault(),W0("WebGLRenderer: Context Lost."),P=!0}function It(){W0("WebGLRenderer: Context Restored."),P=!1;const A=W.autoReset,Y=qe.enabled,se=qe.autoUpdate,$=qe.needsUpdate,ee=qe.type;je(),W.autoReset=A,qe.enabled=Y,qe.autoUpdate=se,qe.needsUpdate=$,qe.type=ee}function Dn(A){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Nn(A){const Y=A.target;Y.removeEventListener("dispose",Nn),Dt(Y)}function Dt(A){Si(A),Q.remove(A)}function Si(A){const Y=Q.get(A).programs;Y!==void 0&&(Y.forEach(function(se){ue.releaseProgram(se)}),A.isShaderMaterial&&ue.releaseShaderCache(A))}this.renderBufferDirect=function(A,Y,se,$,ee,Ie){Y===null&&(Y=Zt);const T=ee.isMesh&&ee.matrixWorld.determinantAffine()<0,R=pa(A,Y,se,$,ee);_.setMaterial($,T);let L=se.index,X=1;if($.wireframe===!0){if(L=ae.getWireframeAttribute(se),L===void 0)return;X=2}const q=se.drawRange,te=se.attributes.position;let ne=q.start*X,he=(q.start+q.count)*X;Ie!==null&&(ne=Math.max(ne,Ie.start*X),he=Math.min(he,(Ie.start+Ie.count)*X)),L!==null?(ne=Math.max(ne,0),he=Math.min(he,L.count)):te!=null&&(ne=Math.max(ne,0),he=Math.min(he,te.count));const ve=he-ne;if(ve<0||ve===1/0)return;Pe.setup(ee,$,R,se,L);let Ae,Ce=we;if(L!==null&&(Ae=be.get(L),Ce=fe,Ce.setIndex(Ae)),ee.isMesh)$.wireframe===!0?(_.setLineWidth($.wireframeLinewidth*Z()),Ce.setMode(O.LINES)):Ce.setMode(O.TRIANGLES);else if(ee.isLine){let Me=$.linewidth;Me===void 0&&(Me=1),_.setLineWidth(Me*Z()),ee.isLineSegments?Ce.setMode(O.LINES):ee.isLineLoop?Ce.setMode(O.LINE_LOOP):Ce.setMode(O.LINE_STRIP)}else ee.isPoints?Ce.setMode(O.POINTS):ee.isSprite&&Ce.setMode(O.TRIANGLES);if(ee.isBatchedMesh)if(Ue.get("WEBGL_multi_draw"))Ce.renderMultiDraw(ee._multiDrawStarts,ee._multiDrawCounts,ee._multiDrawCount);else{const Me=ee._multiDrawStarts,le=ee._multiDrawCounts,Ye=ee._multiDrawCount,De=L?be.get(L).bytesPerElement:1,ke=Q.get($).currentProgram.getUniforms();for(let Ke=0;Ke<Ye;Ke++)ke.setValue(O,"_gl_DrawID",Ke),Ce.render(Me[Ke]/De,le[Ke])}else if(ee.isInstancedMesh)Ce.renderInstances(ne,ve,ee.count);else if(se.isInstancedBufferGeometry){const Me=se._maxInstanceCount!==void 0?se._maxInstanceCount:1/0,le=Math.min(se.instanceCount,Me);Ce.renderInstances(ne,ve,le)}else Ce.render(ne,ve)};function en(A,Y,se){A.transparent===!0&&A.side===wa&&A.forceSinglePass===!1?(A.side=si,A.needsUpdate=!0,$n(A,Y,se),A.side=Rs,A.needsUpdate=!0,$n(A,Y,se),A.side=wa):$n(A,Y,se)}this.compile=function(A,Y,se=null){se===null&&(se=A),w=Ee.get(se),w.init(Y),y.push(w),se.traverseVisible(function(ee){ee.isLight&&ee.layers.test(Y.layers)&&(w.pushLight(ee),ee.castShadow&&w.pushShadow(ee))}),A!==se&&A.traverseVisible(function(ee){ee.isLight&&ee.layers.test(Y.layers)&&(w.pushLight(ee),ee.castShadow&&w.pushShadow(ee))}),w.setupLights();const $=new Set;return A.traverse(function(ee){if(!(ee.isMesh||ee.isPoints||ee.isLine||ee.isSprite))return;const Ie=ee.material;if(Ie)if(Array.isArray(Ie))for(let T=0;T<Ie.length;T++){const R=Ie[T];en(R,se,ee),$.add(R)}else en(Ie,se,ee),$.add(Ie)}),w=y.pop(),$},this.compileAsync=function(A,Y,se=null){const $=this.compile(A,Y,se);return new Promise(ee=>{function Ie(){if($.forEach(function(T){Q.get(T).currentProgram.isReady()&&$.delete(T)}),$.size===0){ee(A);return}setTimeout(Ie,10)}Ue.get("KHR_parallel_shader_compile")!==null?Ie():setTimeout(Ie,10)})};let Et=null;function Un(A){Et&&Et(A)}function li(){Qn.stop()}function Hn(){Qn.start()}const Qn=new RS;Qn.setAnimationLoop(Un),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(A){Et=A,Ve.setAnimationLoop(A),A===null?Qn.stop():Qn.start()},Ve.addEventListener("sessionstart",li),Ve.addEventListener("sessionend",Hn),this.render=function(A,Y){if(Y!==void 0&&Y.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(P===!0)return;B!==null&&B.renderStart(A,Y);const se=Ve.enabled===!0&&Ve.isPresenting===!0,$=D!==null&&(I===null||se)&&D.begin(U,I);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),Y.parent===null&&Y.matrixWorldAutoUpdate===!0&&Y.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(Y),Y=Ve.getCamera()),A.isScene===!0&&A.onBeforeRender(U,A,Y,I),w=Ee.get(A,y.length),w.init(Y),w.state.textureUnits=ie.getTextureUnits(),y.push(w),Ot.multiplyMatrices(Y.projectionMatrix,Y.matrixWorldInverse),Mt.setFromProjectionMatrix(Ot,ra,Y.reversedDepth),ht=this.localClippingEnabled,gt=Ge.init(this.clippingPlanes,ht),N=Se.get(A,C.length),N.init(),C.push(N),Ve.enabled===!0&&Ve.isPresenting===!0){const T=U.xr.getDepthSensingMesh();T!==null&&Gi(T,Y,-1/0,U.sortObjects)}Gi(A,Y,0,U.sortObjects),N.finish(),U.sortObjects===!0&&N.sort(ze,We,Y.reversedDepth),ct=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,ct&&it.addToRenderList(N,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),gt===!0&&Ge.beginShadows();const ee=w.state.shadowsArray;if(qe.render(ee,A,Y),gt===!0&&Ge.endShadows(),($&&D.hasRenderPass())===!1){const T=N.opaque,R=N.transmissive;if(w.setupLights(),Y.isArrayCamera){const L=Y.cameras;if(R.length>0)for(let X=0,q=L.length;X<q;X++){const te=L[X];Mi(T,R,A,te)}ct&&it.render(A);for(let X=0,q=L.length;X<q;X++){const te=L[X];ha(N,A,te,te.viewport)}}else R.length>0&&Mi(T,R,A,Y),ct&&it.render(A),ha(N,A,Y)}I!==null&&H===0&&(ie.updateMultisampleRenderTarget(I),ie.updateRenderTargetMipmap(I)),$&&D.end(U),A.isScene===!0&&A.onAfterRender(U,A,Y),Pe.resetDefaultState(),j=-1,de=null,y.pop(),y.length>0?(w=y[y.length-1],ie.setTextureUnits(w.state.textureUnits),gt===!0&&Ge.setGlobalState(U.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?N=C[C.length-1]:N=null,B!==null&&B.renderEnd()};function Gi(A,Y,se,$){if(A.visible===!1)return;if(A.layers.test(Y.layers)){if(A.isGroup)se=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(Y);else if(A.isLightProbeGrid)w.pushLightProbeGrid(A);else if(A.isLight)w.pushLight(A),A.castShadow&&w.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Mt.intersectsSprite(A)){$&&Wt.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Ot);const T=K.update(A),R=A.material;R.visible&&N.push(A,T,R,se,Wt.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Mt.intersectsObject(A))){const T=K.update(A),R=A.material;if($&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Wt.copy(A.boundingSphere.center)):(T.boundingSphere===null&&T.computeBoundingSphere(),Wt.copy(T.boundingSphere.center)),Wt.applyMatrix4(A.matrixWorld).applyMatrix4(Ot)),Array.isArray(R)){const L=T.groups;for(let X=0,q=L.length;X<q;X++){const te=L[X],ne=R[te.materialIndex];ne&&ne.visible&&N.push(A,T,ne,se,Wt.z,te)}}else R.visible&&N.push(A,T,R,se,Wt.z,null)}}const Ie=A.children;for(let T=0,R=Ie.length;T<R;T++)Gi(Ie[T],Y,se,$)}function ha(A,Y,se,$){const{opaque:ee,transmissive:Ie,transparent:T}=A;w.setupLightsView(se),gt===!0&&Ge.setGlobalState(U.clippingPlanes,se),$&&_.viewport(Te.copy($)),ee.length>0&&Qi(ee,Y,se),Ie.length>0&&Qi(Ie,Y,se),T.length>0&&Qi(T,Y,se),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Mi(A,Y,se,$){if((se.isScene===!0?se.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[$.id]===void 0){const ne=Ue.has("EXT_color_buffer_half_float")||Ue.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[$.id]=new ca(1,1,{generateMipmaps:!0,type:ne?ka:Oi,minFilter:Xs,samples:Math.max(4,E.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace})}const Ie=w.state.transmissionRenderTarget[$.id],T=$.viewport||Te;Ie.setSize(T.z*U.transmissionResolutionScale,T.w*U.transmissionResolutionScale);const R=U.getRenderTarget(),L=U.getActiveCubeFace(),X=U.getActiveMipmapLevel();U.setRenderTarget(Ie),U.getClearColor($e),st=U.getClearAlpha(),st<1&&U.setClearColor(16777215,.5),U.clear(),ct&&it.render(se);const q=U.toneMapping;U.toneMapping=la;const te=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),w.setupLightsView($),gt===!0&&Ge.setGlobalState(U.clippingPlanes,$),Qi(A,se,$),ie.updateMultisampleRenderTarget(Ie),ie.updateRenderTargetMipmap(Ie),Ue.has("WEBGL_multisampled_render_to_texture")===!1){let ne=!1;for(let he=0,ve=Y.length;he<ve;he++){const Ae=Y[he],{object:Ce,geometry:Me,material:le,group:Ye}=Ae;if(le.side===wa&&Ce.layers.test($.layers)){const De=le.side;le.side=si,le.needsUpdate=!0,Vi(Ce,se,$,Me,le,Ye),le.side=De,le.needsUpdate=!0,ne=!0}}ne===!0&&(ie.updateMultisampleRenderTarget(Ie),ie.updateRenderTargetMipmap(Ie))}U.setRenderTarget(R,L,X),U.setClearColor($e,st),te!==void 0&&($.viewport=te),U.toneMapping=q}function Qi(A,Y,se){const $=Y.isScene===!0?Y.overrideMaterial:null;for(let ee=0,Ie=A.length;ee<Ie;ee++){const T=A[ee],{object:R,geometry:L,group:X}=T;let q=T.material;q.allowOverride===!0&&$!==null&&(q=$),R.layers.test(se.layers)&&Vi(R,Y,se,L,q,X)}}function Vi(A,Y,se,$,ee,Ie){A.onBeforeRender(U,Y,se,$,ee,Ie),A.modelViewMatrix.multiplyMatrices(se.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),ee.onBeforeRender(U,Y,se,$,A,Ie),ee.transparent===!0&&ee.side===wa&&ee.forceSinglePass===!1?(ee.side=si,ee.needsUpdate=!0,U.renderBufferDirect(se,Y,$,ee,A,Ie),ee.side=Rs,ee.needsUpdate=!0,U.renderBufferDirect(se,Y,$,ee,A,Ie),ee.side=wa):U.renderBufferDirect(se,Y,$,ee,A,Ie),A.onAfterRender(U,Y,se,$,ee,Ie)}function $n(A,Y,se){Y.isScene!==!0&&(Y=Zt);const $=Q.get(A),ee=w.state.lights,Ie=w.state.shadowsArray,T=ee.state.version,R=ue.getParameters(A,ee.state,Ie,Y,se,w.state.lightProbeGridArray),L=ue.getProgramCacheKey(R);let X=$.programs;$.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?Y.environment:null,$.fog=Y.fog;const q=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;$.envMap=me.get(A.envMap||$.environment,q),$.envMapRotation=$.environment!==null&&A.envMap===null?Y.environmentRotation:A.envMapRotation,X===void 0&&(A.addEventListener("dispose",Nn),X=new Map,$.programs=X);let te=X.get(L);if(te!==void 0){if($.currentProgram===te&&$.lightsStateVersion===T)return qa(A,R),te}else R.uniforms=ue.getUniforms(A),B!==null&&A.isNodeMaterial&&B.build(A,se,R),A.onBeforeCompile(R,U),te=ue.acquireProgram(R,L),X.set(L,te),$.uniforms=R.uniforms;const ne=$.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(ne.clippingPlanes=Ge.uniform),qa(A,R),$.needsLights=Ns(A),$.lightsStateVersion=T,$.needsLights&&(ne.ambientLightColor.value=ee.state.ambient,ne.lightProbe.value=ee.state.probe,ne.directionalLights.value=ee.state.directional,ne.directionalLightShadows.value=ee.state.directionalShadow,ne.spotLights.value=ee.state.spot,ne.spotLightShadows.value=ee.state.spotShadow,ne.rectAreaLights.value=ee.state.rectArea,ne.ltc_1.value=ee.state.rectAreaLTC1,ne.ltc_2.value=ee.state.rectAreaLTC2,ne.pointLights.value=ee.state.point,ne.pointLightShadows.value=ee.state.pointShadow,ne.hemisphereLights.value=ee.state.hemi,ne.directionalShadowMatrix.value=ee.state.directionalShadowMatrix,ne.spotLightMatrix.value=ee.state.spotLightMatrix,ne.spotLightMap.value=ee.state.spotLightMap,ne.pointShadowMatrix.value=ee.state.pointShadowMatrix),$.lightProbeGrid=w.state.lightProbeGridArray.length>0,$.currentProgram=te,$.uniformsList=null,te}function bi(A){if(A.uniformsList===null){const Y=A.currentProgram.getUniforms();A.uniformsList=vu.seqWithValue(Y.seq,A.uniforms)}return A.uniformsList}function qa(A,Y){const se=Q.get(A);se.outputColorSpace=Y.outputColorSpace,se.batching=Y.batching,se.batchingColor=Y.batchingColor,se.instancing=Y.instancing,se.instancingColor=Y.instancingColor,se.instancingMorph=Y.instancingMorph,se.skinning=Y.skinning,se.morphTargets=Y.morphTargets,se.morphNormals=Y.morphNormals,se.morphColors=Y.morphColors,se.morphTargetsCount=Y.morphTargetsCount,se.numClippingPlanes=Y.numClippingPlanes,se.numIntersection=Y.numClipIntersection,se.vertexAlphas=Y.vertexAlphas,se.vertexTangents=Y.vertexTangents,se.toneMapping=Y.toneMapping}function Ds(A,Y){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;x.setFromMatrixPosition(Y.matrixWorld);for(let se=0,$=A.length;se<$;se++){const ee=A[se];if(ee.texture!==null&&ee.boundingBox.containsPoint(x))return ee}return null}function pa(A,Y,se,$,ee){Y.isScene!==!0&&(Y=Zt),ie.resetTextureUnits();const Ie=Y.fog,T=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?Y.environment:null,R=I===null?U.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Nt.workingColorSpace,L=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,X=me.get($.envMap||T,L),q=$.vertexColors===!0&&!!se.attributes.color&&se.attributes.color.itemSize===4,te=!!se.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),ne=!!se.morphAttributes.position,he=!!se.morphAttributes.normal,ve=!!se.morphAttributes.color;let Ae=la;$.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Ae=U.toneMapping);const Ce=se.morphAttributes.position||se.morphAttributes.normal||se.morphAttributes.color,Me=Ce!==void 0?Ce.length:0,le=Q.get($),Ye=w.state.lights;if(gt===!0&&(ht===!0||A!==de)){const ft=A===de&&$.id===j;Ge.setState($,A,ft)}let De=!1;$.version===le.__version?(le.needsLights&&le.lightsStateVersion!==Ye.state.version||le.outputColorSpace!==R||ee.isBatchedMesh&&le.batching===!1||!ee.isBatchedMesh&&le.batching===!0||ee.isBatchedMesh&&le.batchingColor===!0&&ee.colorTexture===null||ee.isBatchedMesh&&le.batchingColor===!1&&ee.colorTexture!==null||ee.isInstancedMesh&&le.instancing===!1||!ee.isInstancedMesh&&le.instancing===!0||ee.isSkinnedMesh&&le.skinning===!1||!ee.isSkinnedMesh&&le.skinning===!0||ee.isInstancedMesh&&le.instancingColor===!0&&ee.instanceColor===null||ee.isInstancedMesh&&le.instancingColor===!1&&ee.instanceColor!==null||ee.isInstancedMesh&&le.instancingMorph===!0&&ee.morphTexture===null||ee.isInstancedMesh&&le.instancingMorph===!1&&ee.morphTexture!==null||le.envMap!==X||$.fog===!0&&le.fog!==Ie||le.numClippingPlanes!==void 0&&(le.numClippingPlanes!==Ge.numPlanes||le.numIntersection!==Ge.numIntersection)||le.vertexAlphas!==q||le.vertexTangents!==te||le.morphTargets!==ne||le.morphNormals!==he||le.morphColors!==ve||le.toneMapping!==Ae||le.morphTargetsCount!==Me||!!le.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(De=!0):(De=!0,le.__version=$.version);let ke=le.currentProgram;De===!0&&(ke=$n($,Y,ee),B&&$.isNodeMaterial&&B.onUpdateProgram($,ke,le));let Ke=!1,yt=!1,ut=!1;const Xe=ke.getUniforms(),Qe=le.uniforms;if(_.useProgram(ke.program)&&(Ke=!0,yt=!0,ut=!0),$.id!==j&&(j=$.id,yt=!0),le.needsLights){const ft=Ds(w.state.lightProbeGridArray,ee);le.lightProbeGrid!==ft&&(le.lightProbeGrid=ft,yt=!0)}if(Ke||de!==A){_.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Xe.setValue(O,"projectionMatrix",A.projectionMatrix),Xe.setValue(O,"viewMatrix",A.matrixWorldInverse);const vt=Xe.map.cameraPosition;vt!==void 0&&vt.setValue(O,rt.setFromMatrixPosition(A.matrixWorld)),E.logarithmicDepthBuffer&&Xe.setValue(O,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&Xe.setValue(O,"isOrthographic",A.isOrthographicCamera===!0),de!==A&&(de=A,yt=!0,ut=!0)}if(le.needsLights&&(Ye.state.directionalShadowMap.length>0&&Xe.setValue(O,"directionalShadowMap",Ye.state.directionalShadowMap,ie),Ye.state.spotShadowMap.length>0&&Xe.setValue(O,"spotShadowMap",Ye.state.spotShadowMap,ie),Ye.state.pointShadowMap.length>0&&Xe.setValue(O,"pointShadowMap",Ye.state.pointShadowMap,ie)),ee.isSkinnedMesh){Xe.setOptional(O,ee,"bindMatrix"),Xe.setOptional(O,ee,"bindMatrixInverse");const ft=ee.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),Xe.setValue(O,"boneTexture",ft.boneTexture,ie))}ee.isBatchedMesh&&(Xe.setOptional(O,ee,"batchingTexture"),Xe.setValue(O,"batchingTexture",ee._matricesTexture,ie),Xe.setOptional(O,ee,"batchingIdTexture"),Xe.setValue(O,"batchingIdTexture",ee._indirectTexture,ie),Xe.setOptional(O,ee,"batchingColorTexture"),ee._colorsTexture!==null&&Xe.setValue(O,"batchingColorTexture",ee._colorsTexture,ie));const Vt=se.morphAttributes;if((Vt.position!==void 0||Vt.normal!==void 0||Vt.color!==void 0)&&V.update(ee,se,ke),(yt||le.receiveShadow!==ee.receiveShadow)&&(le.receiveShadow=ee.receiveShadow,Xe.setValue(O,"receiveShadow",ee.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&Y.environment!==null&&(Qe.envMapIntensity.value=Y.environmentIntensity),Qe.dfgLUT!==void 0&&(Qe.dfgLUT.value=$w()),yt){if(Xe.setValue(O,"toneMappingExposure",U.toneMappingExposure),le.needsLights&&$i(Qe,ut),Ie&&$.fog===!0&&ge.refreshFogUniforms(Qe,Ie),ge.refreshMaterialUniforms(Qe,$,ce,Re,w.state.transmissionRenderTarget[A.id]),le.needsLights&&le.lightProbeGrid){const ft=le.lightProbeGrid;Qe.probesSH.value=ft.texture,Qe.probesMin.value.copy(ft.boundingBox.min),Qe.probesMax.value.copy(ft.boundingBox.max),Qe.probesResolution.value.copy(ft.resolution)}vu.upload(O,bi(le),Qe,ie)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(vu.upload(O,bi(le),Qe,ie),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&Xe.setValue(O,"center",ee.center),Xe.setValue(O,"modelViewMatrix",ee.modelViewMatrix),Xe.setValue(O,"normalMatrix",ee.normalMatrix),Xe.setValue(O,"modelMatrix",ee.matrixWorld),$.uniformsGroups!==void 0){const ft=$.uniformsGroups;for(let vt=0,St=ft.length;vt<St;vt++){const xt=ft[vt];ye.update(xt,ke),ye.bind(xt,ke)}}return ke}function $i(A,Y){A.ambientLightColor.needsUpdate=Y,A.lightProbe.needsUpdate=Y,A.directionalLights.needsUpdate=Y,A.directionalLightShadows.needsUpdate=Y,A.pointLights.needsUpdate=Y,A.pointLightShadows.needsUpdate=Y,A.spotLights.needsUpdate=Y,A.spotLightShadows.needsUpdate=Y,A.rectAreaLights.needsUpdate=Y,A.hemisphereLights.needsUpdate=Y}function Ns(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return H},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(A,Y,se){const $=Q.get(A);$.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=Y,Q.get(A.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:se,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,Y){const se=Q.get(A);se.__webglFramebuffer=Y,se.__useDefaultFramebuffer=Y===void 0},this.setRenderTarget=function(A,Y=0,se=0){I=A,F=Y,H=se;let $=null,ee=!1,Ie=!1;if(A){const R=Q.get(A);if(R.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(O.FRAMEBUFFER,R.__webglFramebuffer),Te.copy(A.viewport),Oe.copy(A.scissor),et=A.scissorTest,_.viewport(Te),_.scissor(Oe),_.setScissorTest(et),j=-1;return}else if(R.__webglFramebuffer===void 0)ie.setupRenderTarget(A);else if(R.__hasExternalTextures)ie.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const q=A.depthTexture;if(R.__boundDepthTexture!==q){if(q!==null&&Q.has(q)&&(A.width!==q.image.width||A.height!==q.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(A)}}const L=A.texture;(L.isData3DTexture||L.isDataArrayTexture||L.isCompressedArrayTexture)&&(Ie=!0);const X=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(X[Y])?$=X[Y][se]:$=X[Y],ee=!0):A.samples>0&&ie.useMultisampledRTT(A)===!1?$=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(X)?$=X[se]:$=X,Te.copy(A.viewport),Oe.copy(A.scissor),et=A.scissorTest}else Te.copy(Ze).multiplyScalar(ce).floor(),Oe.copy(wt).multiplyScalar(ce).floor(),et=tt;if(se!==0&&($=z),_.bindFramebuffer(O.FRAMEBUFFER,$)&&_.drawBuffers(A,$),_.viewport(Te),_.scissor(Oe),_.setScissorTest(et),ee){const R=Q.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+Y,R.__webglTexture,se)}else if(Ie){const R=Y;for(let L=0;L<A.textures.length;L++){const X=Q.get(A.textures[L]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+L,X.__webglTexture,se,R)}}else if(A!==null&&se!==0){const R=Q.get(A.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,R.__webglTexture,se)}j=-1},this.readRenderTargetPixels=function(A,Y,se,$,ee,Ie,T,R=0){if(!(A&&A.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let L=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&T!==void 0&&(L=L[T]),L){_.bindFramebuffer(O.FRAMEBUFFER,L);try{const X=A.textures[R],q=X.format,te=X.type;if(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+R),!E.textureFormatReadable(q)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!E.textureTypeReadable(te)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Y>=0&&Y<=A.width-$&&se>=0&&se<=A.height-ee&&O.readPixels(Y,se,$,ee,oe.convert(q),oe.convert(te),Ie)}finally{const X=I!==null?Q.get(I).__webglFramebuffer:null;_.bindFramebuffer(O.FRAMEBUFFER,X)}}},this.readRenderTargetPixelsAsync=async function(A,Y,se,$,ee,Ie,T,R=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let L=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&T!==void 0&&(L=L[T]),L)if(Y>=0&&Y<=A.width-$&&se>=0&&se<=A.height-ee){_.bindFramebuffer(O.FRAMEBUFFER,L);const X=A.textures[R],q=X.format,te=X.type;if(A.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+R),!E.textureFormatReadable(q))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!E.textureTypeReadable(te))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ne=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,ne),O.bufferData(O.PIXEL_PACK_BUFFER,Ie.byteLength,O.STREAM_READ),O.readPixels(Y,se,$,ee,oe.convert(q),oe.convert(te),0);const he=I!==null?Q.get(I).__webglFramebuffer:null;_.bindFramebuffer(O.FRAMEBUFFER,he);const ve=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await y1(O,ve,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,ne),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,Ie),O.deleteBuffer(ne),O.deleteSync(ve),Ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,Y=null,se=0){const $=Math.pow(2,-se),ee=Math.floor(A.image.width*$),Ie=Math.floor(A.image.height*$),T=Y!==null?Y.x:0,R=Y!==null?Y.y:0;ie.setTexture2D(A,0),O.copyTexSubImage2D(O.TEXTURE_2D,se,0,0,T,R,ee,Ie),_.unbindTexture()},this.copyTextureToTexture=function(A,Y,se=null,$=null,ee=0,Ie=0){let T,R,L,X,q,te,ne,he,ve;const Ae=A.isCompressedTexture?A.mipmaps[Ie]:A.image;if(se!==null)T=se.max.x-se.min.x,R=se.max.y-se.min.y,L=se.isBox3?se.max.z-se.min.z:1,X=se.min.x,q=se.min.y,te=se.isBox3?se.min.z:0;else{const Qe=Math.pow(2,-ee);T=Math.floor(Ae.width*Qe),R=Math.floor(Ae.height*Qe),A.isDataArrayTexture?L=Ae.depth:A.isData3DTexture?L=Math.floor(Ae.depth*Qe):L=1,X=0,q=0,te=0}$!==null?(ne=$.x,he=$.y,ve=$.z):(ne=0,he=0,ve=0);const Ce=oe.convert(Y.format),Me=oe.convert(Y.type);let le;Y.isData3DTexture?(ie.setTexture3D(Y,0),le=O.TEXTURE_3D):Y.isDataArrayTexture||Y.isCompressedArrayTexture?(ie.setTexture2DArray(Y,0),le=O.TEXTURE_2D_ARRAY):(ie.setTexture2D(Y,0),le=O.TEXTURE_2D),_.activeTexture(O.TEXTURE0),_.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,Y.flipY),_.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Y.premultiplyAlpha),_.pixelStorei(O.UNPACK_ALIGNMENT,Y.unpackAlignment);const Ye=_.getParameter(O.UNPACK_ROW_LENGTH),De=_.getParameter(O.UNPACK_IMAGE_HEIGHT),ke=_.getParameter(O.UNPACK_SKIP_PIXELS),Ke=_.getParameter(O.UNPACK_SKIP_ROWS),yt=_.getParameter(O.UNPACK_SKIP_IMAGES);_.pixelStorei(O.UNPACK_ROW_LENGTH,Ae.width),_.pixelStorei(O.UNPACK_IMAGE_HEIGHT,Ae.height),_.pixelStorei(O.UNPACK_SKIP_PIXELS,X),_.pixelStorei(O.UNPACK_SKIP_ROWS,q),_.pixelStorei(O.UNPACK_SKIP_IMAGES,te);const ut=A.isDataArrayTexture||A.isData3DTexture,Xe=Y.isDataArrayTexture||Y.isData3DTexture;if(A.isDepthTexture){const Qe=Q.get(A),Vt=Q.get(Y),ft=Q.get(Qe.__renderTarget),vt=Q.get(Vt.__renderTarget);_.bindFramebuffer(O.READ_FRAMEBUFFER,ft.__webglFramebuffer),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let St=0;St<L;St++)ut&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,ee,te+St),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Q.get(Y).__webglTexture,Ie,ve+St)),O.blitFramebuffer(X,q,T,R,ne,he,T,R,O.DEPTH_BUFFER_BIT,O.NEAREST);_.bindFramebuffer(O.READ_FRAMEBUFFER,null),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(ee!==0||A.isRenderTargetTexture||Q.has(A)){const Qe=Q.get(A),Vt=Q.get(Y);_.bindFramebuffer(O.READ_FRAMEBUFFER,G),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,k);for(let ft=0;ft<L;ft++)ut?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qe.__webglTexture,ee,te+ft):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qe.__webglTexture,ee),Xe?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Vt.__webglTexture,Ie,ve+ft):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Vt.__webglTexture,Ie),ee!==0?O.blitFramebuffer(X,q,T,R,ne,he,T,R,O.COLOR_BUFFER_BIT,O.NEAREST):Xe?O.copyTexSubImage3D(le,Ie,ne,he,ve+ft,X,q,T,R):O.copyTexSubImage2D(le,Ie,ne,he,X,q,T,R);_.bindFramebuffer(O.READ_FRAMEBUFFER,null),_.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else Xe?A.isDataTexture||A.isData3DTexture?O.texSubImage3D(le,Ie,ne,he,ve,T,R,L,Ce,Me,Ae.data):Y.isCompressedArrayTexture?O.compressedTexSubImage3D(le,Ie,ne,he,ve,T,R,L,Ce,Ae.data):O.texSubImage3D(le,Ie,ne,he,ve,T,R,L,Ce,Me,Ae):A.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,Ie,ne,he,T,R,Ce,Me,Ae.data):A.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,Ie,ne,he,Ae.width,Ae.height,Ce,Ae.data):O.texSubImage2D(O.TEXTURE_2D,Ie,ne,he,T,R,Ce,Me,Ae);_.pixelStorei(O.UNPACK_ROW_LENGTH,Ye),_.pixelStorei(O.UNPACK_IMAGE_HEIGHT,De),_.pixelStorei(O.UNPACK_SKIP_PIXELS,ke),_.pixelStorei(O.UNPACK_SKIP_ROWS,Ke),_.pixelStorei(O.UNPACK_SKIP_IMAGES,yt),Ie===0&&Y.generateMipmaps&&O.generateMipmap(le),_.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&ie.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ie.setTextureCube(A,0):A.isData3DTexture?ie.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ie.setTexture2DArray(A,0):ie.setTexture2D(A,0),_.unbindTexture()},this.resetState=function(){F=0,H=0,I=null,_.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Nt._getUnpackColorSpace()}}function Jw(t,e=300){if(!t||!Array.isArray(t.nodes)||!Array.isArray(t.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=t.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,e),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,d,h,u;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((d=l.properties)==null?void 0:d.filePath)||(l.uri&&l.uri.startsWith("file://")?l.uri.replace(/^file:\/\//,""):l.uri&&l.uri.startsWith("symbol://")?l.uri.replace(/^symbol:\/\//,"").split("#")[0]:l.uri)||"",line:((h=l.properties)==null?void 0:h.line)||null,status:((u=l.properties)==null?void 0:u.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:t.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:t.edges.length}}function e3(t){const{CLUSTERS:e,NODES:n,EDGES:i,META:a}=Jw(t);let s="dark";for(const U of e)U.color=U[s];const r=Object.fromEntries(e.map(U=>[U.id,U])),o=n.map(([U,P,B,z],G)=>({i:G,id:U,name:a[U].label,cid:P,w:B,desc:z,cluster:r[P],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(U=>[U.id,U]));for(const U of o)U.meta=a[U.id]||{};const c=[];for(const[U,P,B]of i){const z=l[U],G=l[P];if(!z||!G){console.warn("[atlas] Dropped invalid edge:",U,"→",P);continue}c.push({s:z,t:G,kind:B,i:c.length,alpha:1}),B==="pre"?(z.out.push(G),G.in.push(z)):(z.rel.push(G),G.rel.push(z))}const d=U=>U.out.length+U.in.length+U.rel.length,h=o.map(()=>[]);for(const U of c)h[U.s.i].push(U.t.i),h[U.t.i].push(U.s.i);const u=42;for(const U of e){const[P,B,z]=U.anchor,G=Math.hypot(P,B,z)||1;U.dir=[P/G,B/G,z/G]}const p=new Array(o.length).fill(-1);(function(){let P=!0,B=0;for(const z of o)z.in.length||(p[z.i]=0);for(;P&&B++<40;){P=!1;for(const z of o){let G=z.in.length?-1:0;for(const k of z.in)p[k.i]>=0&&(G=Math.max(G,p[k.i]+1));G>=0&&G!==p[z.i]&&(p[z.i]=G,P=!0)}}for(let z=0;z<p.length;z++)p[z]<0&&(p[z]=2)})();const g=Math.max(1,...p),b={atlas:[],shell:[],tier:[]};o.forEach((U,P)=>{const B=U.cluster.dir,z=1-Math.min(d(U),12)/26;b.atlas.push([B[0]*u*z,B[1]*u*z,B[2]*u*z]);const G=e.indexOf(U.cluster),k=o.filter(j=>j.cid===U.cid).indexOf(U),F=o.filter(j=>j.cid===U.cid).length,H=(G/e.length+k/F/e.length)*Math.PI*2,I=(k/F-.5)*1.5;b.shell.push([u*.95*Math.cos(I)*Math.cos(H),u*.95*Math.sin(I),u*.95*Math.cos(I)*Math.sin(H)]),b.tier.push([B[0]*u*.72,(p[P]/g-.5)*u*1.5,B[2]*u*.72])});let m="atlas";o.forEach((U,P)=>{const B=b.atlas[P];U.x=B[0]+(Math.random()-.5)*16,U.y=B[1]+(Math.random()-.5)*16,U.z=B[2]+(Math.random()-.5)*16});let f=1;const v=9,S=.04,x=130,N=.05;function w(){if(f<.004)return;const U=b[m];for(let P=0;P<o.length;P++){const B=o[P];for(let z=P+1;z<o.length;z++){const G=o[z];let k=B.x-G.x,F=B.y-G.y,H=B.z-G.z,I=k*k+F*F+H*H+.6;const j=x/I,de=Math.sqrt(I);k/=de,F/=de,H/=de,B.vx+=k*j,B.vy+=F*j,B.vz+=H*j,G.vx-=k*j,G.vy-=F*j,G.vz-=H*j}}for(const P of c){const B=P.s,z=P.t;let G=z.x-B.x,k=z.y-B.y,F=z.z-B.z;const H=Math.hypot(G,k,F)||1,I=(H-v)*S;G/=H,k/=H,F/=H,B.vx+=G*I,B.vy+=k*I,B.vz+=F*I,z.vx-=G*I,z.vy-=k*I,z.vz-=F*I}for(let P=0;P<o.length;P++){const B=o[P],z=U[P];B.vx+=(z[0]-B.x)*N,B.vy+=(z[1]-B.y)*N,B.vz+=(z[2]-B.z)*N;const G=.82;B.vx*=G,B.vy*=G,B.vz*=G,B.x+=B.vx*f,B.y+=B.vy*f,B.z+=B.vz*f}f*=.988}for(let U=0;U<220;U++)w();const C=46;function y(){let U=0;for(const P of o)U=Math.max(U,Math.hypot(P.x,P.y,P.z));return Math.max(10,U)/Math.sin(C*Math.PI/360)*.88}function D({els:U,emit:P}){const B=new AbortController,{signal:z}=B,G=(He,Ue,E,_)=>He.addEventListener(Ue,E,{..._,signal:z});let k=0;const{stage:F}=U;let H,I,j,de,Te,Oe,et=!0;try{H=new PS({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{et=!1}if(H||(et=!1),!et)return P.gate(!0),{dispose(){}};{let Qi=function(re,Le){const Ne=K.uniforms.uPx.value;for(const Be of o){Mi.set(Be.x,Be.y,Be.z);const Je=j.position.distanceTo(Mi);Mi.project(j),Be.sx=(Mi.x*.5+.5)*re,Be.sy=(-Mi.y*.5+.5)*Le,Be.sz=Mi.z,Be.sr=Be.size*Be.scale*Ne/Math.max(Je,1)*.5}},Ds=function(){Vi.fill(1),$n.fill(1),bi.fill(1);const re=qa,Le=Ne=>!re||Ne.name.toLowerCase().includes(re)||Ne.desc.toLowerCase().includes(re)||(Ne.meta.path||"").toLowerCase().includes(re)||(Ne.meta.kind||"").toLowerCase().includes(re);for(const Ne of o)Ne.vis=!Gi.has(Ne.cid)&&Le(Ne),Ne.vis||(Vi[Ne.i]=0,$n[Ne.i]=.6);for(const Ne of c)(!Ne.s.vis||!Ne.t.vis)&&(bi[Ne.i]=0);if(Un){for(const Ne of o)Ne.vis&&(Vi[Ne.i]=Un.has(Ne.i)?1:ha,$n[Ne.i]=Un.has(Ne.i)?1.25:.8);for(const Ne of c)bi[Ne.i]&&(bi[Ne.i]=Un.has(Ne.s.i)&&Un.has(Ne.t.i)?1.35:ha*.5)}else if(Et){const Ne=new Set([Et.i,...h[Et.i]]);for(const Be of o)Be.vis&&(Vi[Be.i]=Ne.has(Be.i)?1:ha,$n[Be.i]=Be===Et?1.75:Ne.has(Be.i)?1.15:.75);for(const Be of c)bi[Be.i]&&(bi[Be.i]=Be.s===Et||Be.t===Et?1.4:ha*.45)}return en&&en.vis&&(Vi[en.i]=1,$n[en.i]=Math.max($n[en.i],1.6)),{nT:Vi,sT:$n,eT:bi}},pa=function(re){Et=re,Un=null,U.pathbar.classList.remove("on"),oe.tx=re.x,oe.ty=re.y,oe.tz=re.z,oe.tDist=Math.min(oe.tDist,fe*.72),St(re),Qe(),ut()},$i=function(){Et=null,Un=null,oe.tx=oe.ty=oe.tz=0,U.pathbar.classList.remove("on"),St(null),Qe(),ut()},Ns=function(re,Le){const Ne=new Array(o.length).fill(-1),Be=new Set([re.i]),Je=[re.i];for(;Je.length;){const En=Je.shift();if(En===Le.i)break;for(const Kt of h[En])!Be.has(Kt)&&o[Kt].vis&&(Be.add(Kt),Ne[Kt]=En,Je.push(Kt))}if(!Be.has(Le.i)){U.chain.textContent="Keine Kausalkette zwischen diesen Objekten",U.pathbar.classList.add("on");return}const Pt=[];let at=Le.i;for(;at!==-1&&(Pt.unshift(at),at!==re.i);)at=Ne[at];Un=new Set(Pt),U.chain.textContent=Pt.map(En=>o[En].name).join(" → "),U.pathbar.classList.add("on"),ut()},A=function(){Un=null,U.pathbar.classList.remove("on"),ut()},Ie=function(re,Le){let Ne=0;const Be=new Set;Hn&&ee.forEach(at=>Be.add(at)),Et&&(Be.add(Et.i),h[Et.i].forEach(at=>Be.add(at))),Un&&Un.forEach(at=>Be.add(at)),en&&Be.add(en.i);const Je=[...Be].map(at=>o[at]).filter(at=>at.vis&&at.sz<1&&at.sx>-60&&at.sx<re+60&&at.sy>-20&&at.sy<Le+20).sort((at,En)=>at.sz-En.sz),Pt=[];for(const at of Je){if(Ne>=$.length)break;const En=at.name.length*11.5+8,Kt=[at.sx-En/2,at.sy-18,En,16];if(Pt.some(Bt=>Kt[0]<Bt[0]+Bt[2]&&Kt[0]+Kt[2]>Bt[0]&&Kt[1]<Bt[1]+Bt[3]&&Kt[1]+Kt[3]>Bt[1]))continue;Pt.push(Kt);const nt=$[Ne++];nt.textContent=at.name,nt.className="lab"+(at===en||at===Et?"":" sm"),nt.style.transform=`translate(-50%,-50%) translate(${at.sx.toFixed(1)}px,${(at.sy-17).toFixed(1)}px)`,nt.style.opacity=Math.min(1,at.alpha*1.3),nt.style.color=at===en||at===Et?at.cluster.color:""}for(;Ne<$.length;Ne++)$[Ne].style.opacity=0},ve=function(re){k=requestAnimationFrame(ve);const Le=Math.min(.05,(re-T)/1e3);T=re;const Ne=F.clientWidth,Be=F.clientHeight;if(!Ne||!Be)return;H.domElement.width!==Math.round(Ne*H.getPixelRatio())&&(H.setSize(Ne,Be,!1),j.aspect=Ne/Be,j.updateProjectionMatrix(),ae.uniforms.uPx.value=K.uniforms.uPx.value=Be/(2*Math.tan(j.fov*Math.PI/360))),w(),li&&(oe.tTheta+=Le*.09);const Je=1-Math.pow(.0016,Le);if(oe.theta+=(oe.tTheta-oe.theta)*Je,oe.phi+=(oe.tPhi-oe.phi)*Je,oe.dist+=(oe.tDist-oe.dist)*Je,oe.cx+=(oe.tx-oe.cx)*Je,oe.cy+=(oe.ty-oe.cy)*Je,oe.cz+=(oe.tz-oe.cz)*Je,j.position.set(oe.cx+oe.dist*Math.sin(oe.phi)*Math.cos(oe.theta),oe.cy+oe.dist*Math.cos(oe.phi),oe.cz+oe.dist*Math.sin(oe.phi)*Math.sin(oe.theta)),j.lookAt(oe.cx,oe.cy,oe.cz),Qi(Ne,Be),Si.live&&!Pe){let nt=null;for(const Bt of o){if(!Bt.vis||Bt.sz>1)continue;const mr=Bt.sx-Si.x,$l=Bt.sy-Si.y,Jl=Bt.sr+7;mr*mr+$l*$l>Jl*Jl||(!nt||Bt.sz<nt.sz)&&(nt=Bt)}nt!==en&&(en=nt,bt.style.cursor=nt?"pointer":"grab",ut())}const{nT:Pt,sT:at,eT:En}=Ds(),Kt=1-Math.pow(.002,Le);for(const nt of o)nt.alpha+=(Pt[nt.i]-nt.alpha)*Kt,nt.scale+=(at[nt.i]-nt.scale)*Kt,X.array[nt.i*3]=nt.x,X.array[nt.i*3+1]=nt.y,X.array[nt.i*3+2]=nt.z,q.array[nt.i]=nt.alpha,te.array[nt.i]=nt.scale;X.needsUpdate=q.needsUpdate=te.needsUpdate=!0;for(const nt of c){nt.alpha+=(En[nt.i]-nt.alpha)*Kt;const Bt=nt.i*6;ne.array[Bt]=nt.s.x,ne.array[Bt+1]=nt.s.y,ne.array[Bt+2]=nt.s.z,ne.array[Bt+3]=nt.t.x,ne.array[Bt+4]=nt.t.y,ne.array[Bt+5]=nt.t.z,he.array[nt.i*2]=he.array[nt.i*2+1]=nt.alpha}ne.needsUpdate=he.needsUpdate=!0,we.uniforms.uTime.value=re/1e3,we.uniforms.uFlow.value+=((Qn?1:0)-we.uniforms.uFlow.value)*Kt,Ie(Ne,Be),H.render(I,j),R+=1/Math.max(Le,1e-4),L++,L>=30&&(U.sFps.textContent=Math.round(R/L),R=L=0)},Ae=function(re=.55){f=Math.max(f,re)},Ce=function(re){m=re,U.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[m],Ae(1)},De=function(){oe.tTheta=.7,oe.tPhi=1.15,oe.tDist=y(),$i(),Ae(.8),Dn()},ke=function(){P.tools({flow:Qn,label:Hn,spin:li})},Ke=function(re){s=re,document.documentElement.dataset.theme=re,P.theme(re);const Le=re==="light";for(const Je of e)Je.color=Je[re];o.forEach((Je,Pt)=>{const at=He(Je.cluster.color);_[Pt*3]=at[0],_[Pt*3+1]=at[1],_[Pt*3+2]=at[2]}),me.getAttribute("aColor").needsUpdate=!0,c.forEach((Je,Pt)=>{Se.set(He(Je.s.cluster.color),Pt*6),Se.set(He(Je.t.cluster.color),Pt*6+3)}),V.getAttribute("aColor").needsUpdate=!0;const Ne=Le?Qs:Yr;for(const Je of[ae,K,we])Je.uniforms.uLight.value=Le?1:0,Je.blending=Ne,Je.needsUpdate=!0;const Be=Le?16053489:328967;H.setClearColor(Be,1),I.fog.color.setHex(Be),I.fog.density=Le?.0042:.0068,Qe(),Et&&St(Et)},ut=function(){U.hudSel.textContent=Un?`Kausalkette · ${Un.size} Stationen`:Et?Et.name:en?en.name:"Nichts ausgewählt"},Xe=function(re){Gi.has(re)?Gi.delete(re):Gi.add(re),Qe(),Ae(.4)},Qe=function(){const re=U.q.value.trim().toLowerCase(),Le=o.filter(Be=>!Gi.has(Be.cid)&&(!re||Be.name.toLowerCase().includes(re)||Be.desc.toLowerCase().includes(re))).sort((Be,Je)=>d(Je)-d(Be));P.list({q:re,rows:Le.map(Be=>({i:Be.i,name:Be.name,color:Be.cluster.color,deg:d(Be),on:Be===Et}))}),U.sNode.textContent=Le.length;const Ne=c.filter(Be=>Le.includes(Be.s)&&Le.includes(Be.t)).length;U.sEdge.textContent=Ne,U.sDeg.textContent=Le.length?(Ne*2/Le.length).toFixed(1):"0"},vt=function(re){qa=re.trim().toLowerCase(),Qe(),Ae(.25)},St=function(re){P.drawer(re&&{i:re.i,name:re.name,desc:re.desc,cname:re.cluster.name,color:re.cluster.color,deg:d(re),depth:p[re.i],kind:re.meta.kind||"",path:re.meta.path||"",line:re.meta.line||null,status:re.meta.status||"",prov:re.meta.prov||"",groups:[["Ursache · eingehend",re.in,"IN"],["Wirkung · ausgehend",re.out,"OUT"],["Assoziiert · Backlinks",re.rel,"REL"]].filter(([,Le])=>Le.length).map(([Le,Ne,Be])=>({title:Le,tag:Be,items:Ne.map(Je=>({i:Je.i,name:Je.name,color:Je.cluster.color}))}))})},xt=function(re){const Le=o[re],Ne=b[m],Be=Ne[Le.i].slice();for(let Je=0;Je<Ne.length;Je++)Ne[Je][0]-=Be[0],Ne[Je][1]-=Be[1],Ne[Je][2]-=Be[2];oe.tx=oe.ty=oe.tz=0,Ae(1)},kt=function(re){const Le=o[re];U.chain.textContent="Start bei "+Le.name+" — Shift+Klick auf das Zielobjekt",U.pathbar.classList.add("on")};var $e=Qi,st=Ds,pe=pa,Re=$i,ce=Ns,ze=A,We=Ie,Ze=ve,wt=Ae,tt=Ce,Mt=De,gt=ke,ht=Ke,Ot=ut,rt=Xe,Wt=Qe,Zt=vt,ct=St,Z=xt,O=kt;H.setPixelRatio(Math.min(devicePixelRatio,2)),F.appendChild(H.domElement),I=new gS,I.fog=new $m(328967,.0068),j=new Di(C,1,1,1400);const He=re=>{const Le=new Rt(re);return[Le.r,Le.g,Le.b]},Ue=o.length,E=new Float32Array(Ue*3),_=new Float32Array(Ue*3),W=new Float32Array(Ue),Q=new Float32Array(Ue),ie=new Float32Array(Ue);o.forEach((re,Le)=>{const Ne=He(re.cluster.color);_[Le*3]=Ne[0],_[Le*3+1]=Ne[1],_[Le*3+2]=Ne[2],W[Le]=re.size=.95+re.w*.4,Q[Le]=1,ie[Le]=1});const me=new Xn;me.setAttribute("position",new Xt(E,3)),me.setAttribute("aColor",new Xt(_,3)),me.setAttribute("aSize",new Xt(W,1)),me.setAttribute("aAlpha",new Xt(Q,1)),me.setAttribute("aScale",new Xt(ie,1));const be=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,ae=new Bn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:be,fragmentShader:`
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
      }`,transparent:!0,blending:Yr,depthWrite:!1}),K=new Bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:be,fragmentShader:`
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
      }`,transparent:!0,blending:Yr,depthWrite:!1});de=new Lp(me,ae),Te=new Lp(me,K),de.frustumCulled=!1,Te.frustumCulled=!1,I.add(de,Te);const ue=c.length,ge=new Float32Array(ue*6),Se=new Float32Array(ue*6),Ee=new Float32Array(ue*2),Ge=new Float32Array(ue*2),qe=new Float32Array(ue*2),it=new Float32Array(ue*2);c.forEach((re,Le)=>{const Ne=He(re.s.cluster.color),Be=He(re.t.cluster.color);Se.set(Ne,Le*6),Se.set(Be,Le*6+3),Ee[Le*2]=0,Ee[Le*2+1]=1;const Je=Le*.6180339887%1;Ge[Le*2]=Je,Ge[Le*2+1]=Je,qe[Le*2]=qe[Le*2+1]=1,it[Le*2]=it[Le*2+1]=re.kind==="pre"?1:0});const V=new Xn;V.setAttribute("position",new Xt(ge,3)),V.setAttribute("aColor",new Xt(Se,3)),V.setAttribute("aT",new Xt(Ee,1)),V.setAttribute("aSeed",new Xt(Ge,1)),V.setAttribute("aAlpha",new Xt(qe,1)),V.setAttribute("aDir",new Xt(it,1));const we=new Bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:Yr,depthWrite:!1});Oe=new gu(V,we),Oe.frustumCulled=!1,I.add(Oe);const fe=y(),oe={theta:.7,phi:1.15,dist:fe,tTheta:.7,tPhi:1.15,tDist:fe,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let Pe=!1,ye=0,je=0,Ve=0;const bt=H.domElement;G(bt,"pointerdown",re=>{Pe=!0,Ve=0,ye=re.clientX,je=re.clientY,bt.setPointerCapture(re.pointerId)}),G(bt,"pointerup",re=>{Pe=!1,bt.releasePointerCapture(re.pointerId)}),G(bt,"pointermove",re=>{const Le=bt.getBoundingClientRect();if(Si.x=re.clientX-Le.left,Si.y=re.clientY-Le.top,Si.live=!0,!Pe)return;const Ne=re.clientX-ye,Be=re.clientY-je;Ve+=Math.abs(Ne)+Math.abs(Be),ye=re.clientX,je=re.clientY,oe.tTheta-=Ne*.0052,oe.tPhi=Math.max(.12,Math.min(Math.PI-.12,oe.tPhi-Be*.0052)),li=!1,ke()}),G(bt,"pointerleave",()=>{Si.live=!1});const It=U.zlvl,Dn=()=>{It.textContent=Math.round(fe/oe.tDist*100)+"%"},Nn=re=>{oe.tDist=Math.max(fe*.22,Math.min(fe*2.6,oe.tDist*re)),Dn()};G(bt,"wheel",re=>{re.preventDefault(),Nn(1+Math.sign(re.deltaY)*.11)},{passive:!1});const Dt=()=>{oe.tDist=fe,Dn()};Dn();const Si={x:-1,y:-1,live:!1};let en=null,Et=null,Un=null,li=!0,Hn=!0,Qn=!0;const Gi=new Set,ha=.12,Mi=new J;G(bt,"click",re=>{if(!(Ve>5)){if(!en){re.shiftKey||$i();return}if(re.shiftKey&&Et&&en!==Et){Ns(Et,en);return}pa(en)}});const Vi=new Float32Array(o.length),$n=new Float32Array(o.length),bi=new Float32Array(c.length);let qa="";const Y=U.labels,se=14,$=Array.from({length:44},()=>{const re=document.createElement("div");return re.className="lab",re.style.opacity=0,Y.appendChild(re),re}),ee=[...o].sort((re,Le)=>d(Le)-d(re)).slice(0,se).map(re=>re.i);let T=performance.now(),R=0,L=0;const X=me.getAttribute("position"),q=me.getAttribute("aAlpha"),te=me.getAttribute("aScale"),ne=V.getAttribute("position"),he=V.getAttribute("aAlpha");k=requestAnimationFrame(ve);const Me=()=>{Qn=!Qn,ke()},le=()=>{Hn=!Hn,ke()},Ye=()=>{li=!li,ke()},yt=()=>Ke(s==="light"?"dark":"light");G(window,"keydown",re=>{if(/^(INPUT|TEXTAREA)$/.test(re.target.tagName)){re.key==="Escape"&&re.target.blur();return}re.key==="Escape"?$i():re.key==="l"||re.key==="L"?(Hn=!Hn,ke()):re.key==="r"||re.key==="R"?De():re.key===" "?(re.preventDefault(),li=!li,ke()):re.key==="/"?(re.preventDefault(),U.q.focus()):re.key==="="||re.key==="+"?Nn(1/1.18):(re.key==="-"||re.key==="_")&&Nn(1.18)});const Vt=re=>pa(o[re]),ft=re=>{en=re===null?null:o[re]};return Ke(s),Qe(),St(null),ke(),ut(),{setView:Ce,toggleFlow:Me,toggleLabel:le,toggleSpin:Ye,reset:De,toggleTheme:yt,dolly:Nn,zoomReset:Dt,toggleCluster:Xe,selectAt:Vt,hoverAt:ft,setQuery:vt,clearPath:A,centerOn:xt,startPath:kt,dispose(){B.abort(),cancelAnimationFrame(k),me.dispose(),V.dispose(),ae.dispose(),K.dispose(),we.dispose(),H.dispose(),bt.remove(),U.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:o,edges:c,deg:d,createAtlas:D}}function zS(t){if(typeof t!="string"||t==="")return t;const e=t.split(/[\\/]/).filter(Boolean);return e.length>0?e[e.length-1]:t}const IS="plugbrain.workspace";function t3(){try{return localStorage.getItem(IS)||""}catch{return""}}function n3(t){try{localStorage.setItem(IS,t)}catch{}}async function kv(){const t=await fetch("/api/galaxy");if(!t.ok)throw new Error(`Galaxie: HTTP ${t.status}`);const e=await t.json();if(!(e!=null&&e.ok)||!Array.isArray(e.planets))throw new Error("Die Galaxie antwortet unvollständig.");return e.planets}async function i3(t,e){var a;const n=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:t,name:e})});if(!n.ok){const s=await n.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Registrieren: HTTP ${n.status}`)}const i=await n.json();if(!(i!=null&&i.ok)||!((a=i.workspace)!=null&&a.id))throw new Error("Registrieren: unvollständige Antwort.");return await BS(i.workspace.id),i.workspace.id}async function BS(t){const e=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:t})});if(!e.ok)throw new Error(`Indizieren: HTTP ${e.status}`);const n=await e.json();if(!(n!=null&&n.ok))throw new Error("Indizieren: unvollständige Antwort.");return n.result}const zp="plugbrain.auth_token",Ip="plugbrain.agent_id";function FS(){try{const t=new URLSearchParams(window.location.search).get("token");return t?(localStorage.setItem(zp,t),t):localStorage.getItem(zp)||"plug-atlas-test-token-20260917"}catch{return"plug-atlas-test-token-20260917"}}function a3(t){try{localStorage.setItem(zp,t)}catch{}}function Rf(){try{const t=new URLSearchParams(window.location.search).get("agent");return t?(localStorage.setItem(Ip,t),t):localStorage.getItem(Ip)||"agy"}catch{return"agy"}}function s3(t){try{localStorage.setItem(Ip,t)}catch{}}function tg(){const t=FS(),e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["x-plug-auth-token"]=t),e}async function r3(t){const e=await fetch(`/api/git?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Git-Status HTTP ${e.status}`);return e.json()}async function o3(t,e){const n=await fetch(`/api/provenance?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Provenance HTTP ${n.status}`);return n.json()}async function l3(t,e,n=Rf()){const i=await fetch("/api/agent/search",{method:"POST",headers:tg(),body:JSON.stringify({workspace:t,agentId:n,query:e})});if(!i.ok){const s=await i.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Search HTTP ${i.status}`)}const a=await i.json();return Array.isArray(a==null?void 0:a.hits)?a.hits:[]}async function c3(t,e,n=Rf()){const i=await fetch("/api/agent/read",{method:"POST",headers:tg(),body:JSON.stringify({workspace:t,agentId:n,path:e})});if(!i.ok){const s=await i.json().catch(()=>null),r=(s==null?void 0:s.error)??`HTTP ${i.status}`;return{ok:!1,path:e,content:"",bytes:0,lang:null,error:r}}const a=await i.json();return{ok:!0,path:a.path??e,content:a.content??"",bytes:a.bytes??0,lang:a.lang??null}}async function Xv(t,e,n=Rf()){const i=await fetch("/api/context/pack",{method:"POST",headers:tg(),body:JSON.stringify({workspaceId:t,goal:e,agentId:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Context Pack HTTP ${i.status}`)}return i.json()}async function u3(t){const e=await fetch(`/api/context/pack/${encodeURIComponent(t)}/staleness`);if(!e.ok){const n=await e.json().catch(()=>null);throw new Error((n==null?void 0:n.error)??`Staleness HTTP ${e.status}`)}return e.json()}const hn=[],hs=[],Ta=[],Il=[],yl={},wn=[],_u=[],na=7.2,Kr=6,Bl=["--k1","--k2","--k3","--k4","--k5","--k6"],ng=t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),f3=t=>t.agentColor||ng(Bl[(t.ki??0)%Bl.length]),Wv=t=>ng(Bl[t.ki%Bl.length]),HS=new Map;let GS="loc";function d3(t){GS=t}const h3=t=>{const e=Math.max(1,...hn.map(i=>i.loc)),n=Math.max(1,...hn.map(i=>i.usedBy.length));return t.dying?0:GS==="loc"?1.5+t.loc/e*26:1.5+t.usedBy.length/n*26},Bp=new Set,p3=t=>(Bp.add(t),()=>Bp.delete(t)),Mo=()=>Bp.forEach(t=>t());function Fp(t,e,n="ok"){_u.unshift({t:new Date,ws:t,msg:e,kind:n,id:Math.random().toString(36).slice(2)}),_u.length>60&&_u.pop()}function wf(){var o;let e=0,n=0,i=0;const a=Il.filter(l=>wn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=hn.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=wn.find(g=>g.id===l))!=null&&o.dying))continue;const d=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),h=d*na+Kr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/d))*na+Kr;n+h>74&&n>0&&(e+=i,n=0,i=0);let p=Ta.find(g=>g.dir===l);p||(p={dir:l,x:n+h/2,z:e+u/2,w:.01,h:.01},Ta.push(p)),Object.assign(p,{tx:n,tz:e,tw:h,th:u,cols:d}),s.add(l),n+=h,i=Math.max(i,u)}const r=Ta.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(d=>d.tx+d.tw))/2,c=Math.max(...r.map(d=>d.tz+d.th))/2;for(const d of r)d.tx-=l,d.tz-=c;for(const d of r)hn.filter(u=>u.dir===d.dir).forEach((u,p)=>{u.tx=d.tx+Kr/2+p%d.cols*na+na/2,u.tz=d.tz+Kr/2+Math.floor(p/d.cols)*na+na/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=Ta.length-1;l>=0;l--)!s.has(Ta[l].dir)&&!hn.some(c=>c.dir===Ta[l].dir)&&Ta.splice(l,1);for(const l of a)HS.set(l,.5)}function m3(t,e,n=!1){let i=wn.find(a=>a.id===t);return i||(i={id:t,name:e||t,ki:wn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},wn.push(i),Il.includes(t)||Il.push(t),Fp(e||t,"workspace registered","reg"),wf(),Mo(),i)}function g3(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=e.split("/").pop(),c=e.includes("/")&&e.startsWith(t.id+"/")?e:`${t.id}/${e}`;let d=yl[c];if(d)return d.loc+=Math.max(2,Math.round(n*.25)),d.pulse=1,s&&(d.agentColor=s,d.agentName=r,d.access=o),d;d={path:c,name:l,dir:t.id,top:t.id,ki:t.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let h of i){h.includes("/")||(h=`${t.id}/${h}`);const u=yl[h];u&&(d.deps.push(h),hs.push({from:d,to:u}),u.usedBy.push(c))}return hn.push(d),yl[c]=d,wf(),Mo(),d}function v3(){let t=!1;for(let e=hn.length-1;e>=0;e--){const n=hn[e];if(n.dying&&n.h<.25){hn.splice(e,1),delete yl[n.path],t=!0;for(let i=hs.length-1;i>=0;i--)(hs[i].from===n||hs[i].to===n)&&hs.splice(i,1);for(const i of hn){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let e=wn.length-1;e>=0;e--){const n=wn[e];if(n.dying&&!hn.some(i=>i.dir===n.id)){wn.splice(e,1);const i=Il.indexOf(n.id);i>=0&&Il.splice(i,1),t=!0}}t&&(wf(),Mo())}setInterval(()=>{let t=!1;for(const e of wn)e.load>.01&&(e.load*=.82,t=!0);t&&Mo()},600);const sl={register({id:t,name:e}={}){return t?m3(String(t),e&&String(e),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=wn.find(c=>c.id===t);return!l||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,g3(l,{path:e,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(t,e){const n=wn.find(a=>a.id===t);if(!n)return;const i=hn.filter(a=>a.dir===t&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Fp(n.name,String(e||"event")),Mo()},unregister(t){const e=wn.find(n=>n.id===t);e&&(e.dying=!0,hn.filter(n=>n.dir===t).forEach(n=>{n.dying=!0}),Fp(e.name,"workspace unregistered","sys"),wf(),Mo())},list:()=>wn.map(t=>({id:t.id,name:t.name,buildings:hn.filter(e=>e.dir===t.id).length})),simulated:()=>!1};window.PlugBrainCity=sl;const _3=1024,x3=2048,qv=96,jv=new Map;function y3(t){if(!t.agentColor)return null;const e=t.agentColor+(t.access||"");let n=jv.get(e);if(!n){n=new Rt;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(t.agentColor);if(i){const a=t.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(t.agentColor)}catch{n.setHSL(0,0,.5)}jv.set(e,n)}return n}function S3(t,e,n,{onSelect:i,onZoom:a}){let s;try{s=new PS({antialias:!0,alpha:!0,canvas:t})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new gS,o=new eg(-1,1,1,-1,-400,600),l=`
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
  }`,d=new rr(1,1,1),h=new Bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=_3,p=new lv(d,h,u);p.frustumCulled=!1;let g=new Zr(new Float32Array(u*3),3),b=new Zr(new Float32Array(u*2),2);d.setAttribute("aColor",g),d.setAttribute("aHi",b),r.add(p);const m=new Y1(d),f=new MS({color:3814695,transparent:!0,opacity:.3});let v=[];for(let Z=0;Z<u;Z++){const O=new gu(m,f);O.visible=!1,v.push(O),r.add(O)}const S=(Z,O)=>{let He=Math.max(1,Z);for(;He<O;)He*=2;return He};function x(Z){if(Z<=u)return;const O=S(u,Z),He=p,Ue=v,E=new lv(d,h,O);E.frustumCulled=!1,E.count=0;const _=new Zr(new Float32Array(O*3),3),W=new Zr(new Float32Array(O*2),2);d.setAttribute("aColor",_),d.setAttribute("aHi",W);const Q=[];for(let ie=0;ie<O;ie++){const me=new gu(m,f);me.visible=!1,Q.push(me),r.add(me)}r.remove(He);for(const ie of Ue)r.remove(ie);p=E,g=_,b=W,v=Q,u=O}const N=()=>new Bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),w=[],C=new rr(1,1,1);for(let Z=0;Z<qv;Z++){const O=new Hi(C,N());O.visible=!1,w.push(O),r.add(O)}const y=3;let D=x3,U=new Float32Array(D*y*3),P=new Float32Array(D*y);const B=new Xn;B.setAttribute("position",new Xt(U,3)),B.setAttribute("aA",new Xt(P,1));const z=new Lp(B,new Bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));z.frustumCulled=!1,r.add(z);let G=new Float32Array(D*6),k=new Float32Array(D*2);const F=new Xn;F.setAttribute("position",new Xt(G,3)),F.setAttribute("aA",new Xt(k,1));const H=new gu(F,new Bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));H.frustumCulled=!1,r.add(H);function I(Z){Z<=D||(D=S(D,Z),U=new Float32Array(D*y*3),P=new Float32Array(D*y),G=new Float32Array(D*6),k=new Float32Array(D*2),B.setAttribute("position",new Xt(U,3)),B.setAttribute("aA",new Xt(P,1)),F.setAttribute("position",new Xt(G,3)),F.setAttribute("aA",new Xt(k,1)))}const j={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},de=Math.atan(1/Math.SQRT2);let Te=!1,Oe=0,et=0,$e=!0;const st={x:-1,y:-1,live:!1};t.addEventListener("pointerdown",Z=>{Te=!0,et=0,Oe=Z.clientX,t.setPointerCapture(Z.pointerId),t.classList.add("drag")}),t.addEventListener("pointerup",Z=>{Te=!1,t.classList.remove("drag"),t.releasePointerCapture(Z.pointerId)}),t.addEventListener("pointermove",Z=>{const O=t.getBoundingClientRect();st.x=Z.clientX-O.left,st.y=Z.clientY-O.top,st.live=!0,Te&&(et+=Math.abs(Z.clientX-Oe),j.tYaw-=(Z.clientX-Oe)*.006,Oe=Z.clientX,$e=!1,Mt(!1))}),t.addEventListener("pointerleave",()=>{st.live=!1});const pe=j.tZoom,Re=()=>a(Math.round(pe/j.tZoom*100)),ce=Z=>{j.tZoom=Math.max(4,Math.min(60,j.tZoom*Z)),Re()};t.addEventListener("wheel",Z=>{Z.preventDefault(),ce(1+Math.sign(Z.deltaY)*.11)},{passive:!1}),Re();let ze=null,We=null,Ze=null,wt="",tt=null,Mt=()=>{};t.addEventListener("click",()=>{et>5||i(ze&&We!==ze?ze:null)});const gt=Bl.map(Z=>new Rt(ng(Z)||"#8a4b2a")),ht=new J,Ot=new nn,rt=new Rt;let Wt=!0,Zt=performance.now();function ct(Z){requestAnimationFrame(ct);const O=Math.min(.05,(Z-Zt)/1e3);Zt=Z;const He=e.clientWidth,Ue=e.clientHeight;if(!He||!Ue)return;t.width!==Math.round(He*s.getPixelRatio())&&s.setSize(He,Ue,!1);const E=1-Math.pow(.002,O);v3(),x(hn.length),I(hs.length),$e&&(j.tYaw+=O*.12),j.yaw+=(j.tYaw-j.yaw)*E,j.zoom+=(j.tZoom-j.zoom)*E;const _=j.zoom*4,W=_*(He/Ue);o.left=-W,o.right=W,o.top=_,o.bottom=-_,o.updateProjectionMatrix();const Q=180;o.position.set(Math.cos(j.yaw)*Math.cos(de)*Q,Math.sin(de)*Q,Math.sin(j.yaw)*Math.cos(de)*Q),o.lookAt(0,6,0);for(let K=0;K<qv;K++){const ue=w[K],ge=Ta[K];if(!ge||K>=Ta.length){ue.visible=!1;continue}ge.x=ge.x===void 0?ge.tx+ge.tw/2:ge.x,ge.z=ge.z===void 0?ge.tz+ge.th/2:ge.z;const Se=ge.tx+ge.tw/2,Ee=ge.tz+ge.th/2;ge.x+=(Se-ge.x)*E,ge.z+=(Ee-ge.z)*E,ge.w+=(ge.tw-ge.w)*E,ge.h+=(ge.th-ge.h)*E,ue.visible=!0,ue.position.set(ge.x,-.25,ge.z),ue.scale.set(Math.max(.01,ge.w-Kr*.45),.5,Math.max(.01,ge.h-Kr*.45))}const ie=We?new Set([We.path,...We.deps,...We.usedBy]):null,me=We||ze||Ze,be=hn.length;p.count=be;for(let K=0;K<be;K++){const ue=hn[K];ue.x!==ue.tx&&(ue.x+=(ue.tx-ue.x)*E*.7),ue.z!==ue.tz&&(ue.z+=(ue.tz-ue.z)*E*.7);const ge=h3(ue);ue.h=ue.h===void 0?ge:ue.h+(ge-ue.h)*(ue.dying?E*1.4:E*.6),ue.pulse=Math.max(0,(ue.pulse||0)-O*1.6),Ot.makeScale(na*.68,Math.max(.01,ue.h),na*.68),Ot.setPosition(ue.x,ue.h/2,ue.z),p.setMatrixAt(K,Ot);const Se=v[K];Se.visible=!0,Se.scale.set(na*.68,Math.max(.01,ue.h),na*.68),Se.position.set(ue.x,ue.h/2,ue.z);const Ee=y3(ue);Ee?rt.copy(Ee):rt.copy(gt[(ue.ki??0)%gt.length]).offsetHSL(0,0,(HS.get(ue.dir)-.5)*.17),g.array[K*3]=rt.r,g.array[K*3+1]=rt.g,g.array[K*3+2]=rt.b;const Ge=ue===me?1:Math.min(.85,ue.pulse||0);let qe=ie?ie.has(ue.path)?0:1:wt&&!ue.path.toLowerCase().includes(wt)?1:0;!ie&&!wt&&tt&&(qe=ue.top===tt?0:1),b.array[K*2]+=(Ge-b.array[K*2])*E,b.array[K*2+1]+=(qe-b.array[K*2+1])*E}for(let K=be;K<u;K++)v[K].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=b.needsUpdate=!0;const ae=hs.length;F.setDrawRange(0,ae*2),B.setDrawRange(0,ae*y);for(let K=0;K<ae;K++){const ue=hs[K],ge=ue.from,Se=ue.to,Ee=K*6;G[Ee]=ge.x,G[Ee+1]=ge.h,G[Ee+2]=ge.z,G[Ee+3]=Se.x,G[Ee+4]=Se.h,G[Ee+5]=Se.z;const Ge=!ie||ie.has(ge.path)&&ie.has(Se.path),qe=We&&(ge===We||Se===We),it=qe?.55:Ge?.1:.02;k[K*2]+=(it-k[K*2])*E,k[K*2+1]=k[K*2];for(let V=0;V<y;V++){const we=K*y+V,fe=(Z/2600+(K*.37+V/y))%1,oe=Math.sin(fe*Math.PI)*Math.hypot(Se.x-ge.x,Se.z-ge.z)*.22;U[we*3]=ge.x+(Se.x-ge.x)*fe,U[we*3+1]=ge.h+(Se.h-ge.h)*fe+oe+1.2,U[we*3+2]=ge.z+(Se.z-ge.z)*fe,P[we]=(Wt?1:0)*(qe?1:Ge?.45:.06)*Math.sin(fe*Math.PI)}}if(F.getAttribute("position").needsUpdate=!0,F.getAttribute("aA").needsUpdate=!0,B.getAttribute("position").needsUpdate=!0,B.getAttribute("aA").needsUpdate=!0,z.material.uniforms.uPx.value=3.4*s.getPixelRatio(),st.live&&!Te){let K=null,ue=26*26;for(let ge=0;ge<be;ge++){const Se=hn[ge];if(Se.dying||Se.h<1)continue;ht.set(Se.x,Se.h*.6,Se.z).project(o);const Ee=(ht.x*.5+.5)*He,Ge=(-ht.y*.5+.5)*Ue,qe=(Ee-st.x)**2+(Ge-st.y)**2;qe<ue&&(ue=qe,K=Se,Se.sx=Ee,Se.sy=Ge)}ze=K,t.style.cursor=Te?"grabbing":K?"pointer":"grab"}else st.live||(ze=null);ze?(n.style.display="block",n.style.left=ze.sx+"px",n.style.top=ze.sy+"px",n.innerHTML=`<b>${ze.name}</b> · ${ze.loc} lines<br>${ze.dir} · referenced by ${ze.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(ct),{setFlow:Z=>{Wt=Z},setHatch:Z=>{h.uniforms.uHatch.value=Z?1:0},setSpin:Z=>{$e=Z},spinning:()=>$e,onSpinChange:Z=>{Mt=Z},dolly:ce,reset:()=>{j.tYaw=Math.PI*.25,j.tZoom=pe,Re()},setSel:Z=>{We=Z},setRailHover:Z=>{Ze=Z},setQuery:Z=>{wt=Z},setFocusTop:Z=>{tt=Z}}}const Qo=new Map;function Yv(t){var n,i;const e=((n=t==null?void 0:t.properties)==null?void 0:n.path)||((i=t==null?void 0:t.properties)==null?void 0:i.filePath)||(t==null?void 0:t.uri);return typeof e=="string"&&e.length>0?e:null}function M3(t){var i,a,s;const e=((i=t==null?void 0:t.properties)==null?void 0:i.loc)??((a=t==null?void 0:t.properties)==null?void 0:a.lines)??((s=t==null?void 0:t.properties)==null?void 0:s.size),n=Number(e);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function b3(t){var d;const e=t==null?void 0:t.workspace,n=(d=t==null?void 0:t.graph)==null?void 0:d.nodes;if(!(e!=null&&e.id)||!Array.isArray(n))return{workspaces:Qo.size,buildings:0,added:0};const i=String(e.id);if(!Qo.has(i)){sl.register({id:i,name:zS(e.name||i)}),Qo.set(i,new Set);for(const h of wn.slice())h.sim&&h.id!==i&&sl.unregister(h.id)}const a=Qo.get(i),s=Array.isArray(t.graph.edges)?t.graph.edges:[],r=new Map(n.filter(h=>h&&typeof h.id=="string").map(h=>[h.id,h])),o=new Map;for(const h of s){const u=r.get(h==null?void 0:h.sourceId),p=r.get(h==null?void 0:h.targetId);if(!u||!p)continue;const g=Yv(p);g&&(o.has(u.id)||o.set(u.id,[]),o.get(u.id).push(g))}const l=[];for(const h of n){const u=Yv(h);u&&l.push({node:h,path:u})}l.sort((h,u)=>h.path.localeCompare(u.path));let c=0;for(const{node:h,path:u}of l){if(a.has(u))continue;a.add(u);const p=h.properties||{};sl.grow(i,{path:u,loc:M3(h),deps:o.get(h.id)||[],note:h.type||"",agentColor:p.agentColor||p.readerColor||null,agentName:p.agentName||p.readerName||null,access:p.agentColor?"write":p.readerColor?"read":null}),c+=1}return c>0&&sl.event(i,`${c} indexed object${c===1?"":"s"} added`),{workspaces:Qo.size,buildings:a.size,added:c,total:l.length,truncated:!1}}function E3({snapshot:t}){xe.useEffect(()=>{t&&b3(t)},[t]);const[e,n]=xe.useState(!0),[i,a]=xe.useState("loc"),[s,r]=xe.useState(!0),[o,l]=xe.useState(!0),[c,d]=xe.useState(!0),[h,u]=xe.useState(100),[p,g]=xe.useState(null),[b,m]=xe.useState(""),[f,v]=xe.useState(null),[S,x]=xe.useState(!0),[,N]=xe.useReducer(z=>z+1,0),w=xe.useRef(null),C=xe.useRef(null),y=xe.useRef(null),D=xe.useRef(null);xe.useEffect(()=>{const z=S3(w.current,C.current,y.current,{onSelect:G=>g(G),onZoom:G=>u(G)});if(!z){n(!1);return}D.current=z,z.onSpinChange(G=>d(G))},[]),xe.useEffect(()=>{const z=p3(()=>N());return()=>{z()}},[]),xe.useEffect(()=>{var z;(z=D.current)==null||z.setSel(p)},[p]),xe.useEffect(()=>{var z;(z=D.current)==null||z.setQuery(b)},[b]),xe.useEffect(()=>{var z;(z=D.current)==null||z.setFocusTop(f)},[f]),xe.useEffect(()=>{const z=G=>{var F,H;const k=G.target;if(/^(INPUT|TEXTAREA)$/.test(k.tagName)){G.key==="Escape"&&k.blur();return}G.key==="Escape"?(g(null),v(null)):G.key==="="||G.key==="+"?(F=D.current)==null||F.dolly(.8474576271186441):G.key==="-"||G.key==="_"?(H=D.current)==null||H.dolly(1.18):(G.key==="e"||G.key==="E")&&x(I=>!I)};return addEventListener("keydown",z),()=>removeEventListener("keydown",z)},[]);const U=hn.reduce((z,G)=>z+G.loc,0),P=wn.reduce((z,G)=>z+G.events,0),B=(z,G)=>G.length?M.jsxs(M.Fragment,{children:[M.jsxs("h3",{children:[z+" ",M.jsx("span",{style:{color:"var(--faint)"},children:G.length})]}),G.map(k=>{const F=yl[k];return F&&M.jsxs("div",{className:"dep","data-p":k,onClick:()=>g(F),children:[M.jsx("span",{className:"sw",style:{background:f3(F)}}),M.jsx("span",{children:k})]},k)})]}):null;return M.jsxs("div",{id:"app",className:p?void 0:"closed",children:[M.jsxs("aside",{children:[M.jsxs("div",{className:"hd",children:[M.jsx("h1",{children:"PlugBrain City"}),M.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),M.jsxs("div",{className:"kpis",children:[M.jsxs("div",{children:[M.jsx("b",{id:"k-ws",children:wn.length}),M.jsx("i",{children:"workspaces"})]}),M.jsxs("div",{children:[M.jsx("b",{id:"k-bld",children:hn.length}),M.jsx("i",{children:"buildings"})]}),M.jsxs("div",{children:[M.jsx("b",{id:"k-ev",children:P}),M.jsx("i",{children:"events"})]})]})]}),M.jsx("div",{className:"q",children:M.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:z=>m(z.target.value.trim().toLowerCase())})}),M.jsx("div",{className:"tree",id:"tree",children:wn.length?wn.map(z=>{const G=hn.filter(F=>F.dir===z.id),k=G.reduce((F,H)=>F+H.loc,0);return M.jsxs("div",{className:"ws"+(f===z.id?" on":"")+(z.dying?" dying":""),onClick:()=>v(F=>F===z.id?null:z.id),children:[M.jsxs("div",{className:"wsrow",children:[M.jsx("span",{className:"sw",style:{background:Wv(z)}}),M.jsx("span",{className:"nm",children:z.name}),z.sim?M.jsx("span",{className:"tag",children:"sim"}):null,M.jsxs("span",{className:"lc",children:[G.length," bld · ",k]})]}),M.jsx("div",{className:"loadbar",children:M.jsx("i",{style:{width:Math.round(z.load*100)+"%",background:Wv(z)}})})]},z.id)}):M.jsxs("div",{className:"empty",children:["No workspaces registered.",M.jsx("br",{}),M.jsx("br",{}),M.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),M.jsxs("div",{id:"stage",ref:C,children:[M.jsx("canvas",{id:"cv",ref:w}),M.jsx("div",{id:"tip",ref:y}),M.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",M.jsx("b",{id:"crumb-t",children:p?p.path.toUpperCase():f?f.toUpperCase():"CITY OVERVIEW"})]}),S&&M.jsx("div",{id:"feed",children:_u.slice(0,9).map(z=>M.jsxs("div",{className:"fe",children:[M.jsx("span",{className:"ft",children:z.t.toLocaleTimeString("en-GB",{hour12:!1})}),M.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:z.ws}),M.jsx("span",{className:"fm",children:z.msg})]},z.id))}),M.jsx("div",{id:"legend",children:M.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${i==="loc"?"size":"references"} · flashes = activity`})}),M.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([z,G])=>M.jsx("button",{className:"tb"+(i===z?" on":""),"data-h":z,type:"button",onClick:()=>{d3(z),a(z)},children:G},z)),M.jsx("div",{className:"vsep"}),M.jsx("button",{className:"tb"+(s?" on":""),id:"t-flow",type:"button",onClick:()=>{r(z=>{var G;return(G=D.current)==null||G.setFlow(!z),!z})},children:"Flow"}),M.jsx("button",{className:"tb"+(o?" on":""),id:"t-hatch",type:"button",onClick:()=>{l(z=>{var G;return(G=D.current)==null||G.setHatch(!z),!z})},children:"Hatching"}),M.jsx("button",{className:"tb"+(c?" on":""),id:"t-spin",type:"button",onClick:()=>{d(z=>{var G;return(G=D.current)==null||G.setSpin(!z),!z})},children:"Orbit"}),M.jsx("button",{className:"tb"+(S?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>x(z=>!z),children:"Feed"}),M.jsx("div",{className:"vsep"}),M.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var z;return(z=D.current)==null?void 0:z.dolly(1.18)},children:"−"}),M.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var z;return(z=D.current)==null?void 0:z.reset()},children:h+"%"}),M.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var z;return(z=D.current)==null?void 0:z.dolly(1/1.18)},children:"＋"}),M.jsx("div",{className:"vsep"}),M.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var z;(z=D.current)==null||z.reset(),g(null),v(null)},children:"Reset"})]}),M.jsxs("div",{id:"gate",style:e?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",M.jsx("br",{}),"The workspace registry remains available."]})]}),M.jsx("div",{id:"side",children:M.jsx("div",{id:"dt",children:p&&M.jsxs("div",{className:"dt",children:[M.jsx("div",{className:"kind",children:p.dir+"/"}),M.jsx("h2",{children:p.name}),p.note?M.jsx("div",{className:"note",children:p.note}):null,M.jsxs("dl",{children:[M.jsx("dt",{children:"Size"}),M.jsx("dd",{children:p.loc}),M.jsx("dt",{children:"References"}),M.jsx("dd",{children:p.deps.length}),M.jsx("dt",{children:"Referenced by"}),M.jsx("dd",{children:p.usedBy.length}),M.jsx("dt",{children:"Share of total"}),M.jsx("dd",{children:U?(p.loc/U*100).toFixed(1)+"%":"—"})]}),B("References",p.deps),B("Referenced by",p.usedBy)]})})})]})}function T3({getAgents:t,ROLES:e,STATES:n,LINK_R:i}){const a=["#8ab2d1","#aaf7b3","#ffc09a","#c6a1ce","#efedbd","#8ac1a0","#d6dee8","#e0a355","#9ec4b8","#b4aac8","#9db6cc","#c8ab9e","#7f9db8","#a8c8a0","#d1a3a3","#a3a3c8"],s=new Map;let r=0;function o(b){if(s.has(b))return s.get(b);const m=a[(b.n-1)%a.length],f={hue:m,rgb:m.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)).join(","),trail:[],last:null};return s.set(b,f),f}function l(b){s.delete(b)}const c=.45,d=42,h=26;function u(b){r+=b;for(const m of t()){const f=o(m);if(m.off)continue;const v=f.last,S=!v||Math.hypot(m.x-v.x,m.y-v.y)>h,x=!v||r-v.t>c;S&&x&&(f.trail.push({x:m.x,y:m.y,t:r,busy:m.task?1:0}),f.trail.length>d&&f.trail.shift(),f.last={x:m.x,y:m.y,t:r})}for(const m of[...s.keys()])t().includes(m)||l(m)}function p(b){b.save(),b.lineCap="round",b.lineJoin="round";for(const m of t()){const f=s.get(m);if(!f||f.trail.length<2)continue;const v=f.trail;for(let S=v.length-1;S>0;S--){const x=v[S],N=v[S-1],w=(r-x.t)/(d*c),C=Math.max(0,(1-w)*.34)*(x.busy?1:.55);C<.015||(b.strokeStyle=`rgba(${f.rgb},${C.toFixed(3)})`,b.lineWidth=x.busy?1.6:1,b.beginPath(),b.moveTo(N.x,N.y),b.lineTo(x.x,x.y),b.stroke())}}b.restore()}function g(){const b=[];for(const m of t()){const f=s.get(m)||o(m),v=e[m.ri],S=n[m.state];let x=0;for(const N of t())N!==m&&Math.hypot(m.x-N.x,m.y-N.y)<i&&x++;b.push({n:m.n,hue:f.hue,role:v.cn,tag:v.tag,roleColor:v.color,state:m.off?"OFFLINE":m.state,stateCn:m.off?"Offline":S.cn,task:m.task?"#"+m.task.id:null,queue:m.queue.length,util:m.span>0?m.busy/m.span:0,trail:f.trail.length,links:x,pos:[Math.round(m.x),Math.round(m.y)]})}return b.sort((m,f)=>m.n-f.n),b}return{step:u,draw:p,snapshot:g,register:o,forget:l,hueOf:b=>(s.get(b)||o(b)).hue}}function A3({els:t,emit:e}){const n=new AbortController,{signal:i}=n,a=(T,R,L,X)=>T.addEventListener(R,L,{...X,signal:i}),s=Math.PI*2,r=(T,R,L)=>T+(R-T)*L,o=T=>T-Math.floor(T),l=(T,R)=>{const L=Math.sin(T*12.9898+R*78.233)*43758.5453;return L-Math.floor(L)};function c(T,R){const L=Math.floor(T),X=Math.floor(R);let q=T-L,te=R-X;q=q*q*(3-2*q),te=te*te*(3-2*te);const ne=l(L,X),he=l(L+1,X),ve=l(L,X+1),Ae=l(L+1,X+1);return ne+(he-ne)*q+(ve-ne)*te+(ne-he-ve+Ae)*q*te}function d(T,R){const L=Math.PI*(3-Math.sqrt(5)),X=1-2*(T+.5)/R,q=Math.sqrt(1-X*X),te=T*L;return[q*Math.cos(te),X,q*Math.sin(te)]}const h=(T,R)=>Math.atan2(Math.sin(T-R),Math.cos(T-R));function u(T,R,L,X,q){const te=Math.sin(R),ne=Math.cos(R),he=Math.sin(T),ve=Math.cos(T);return(Ae,Ce,Me)=>{const le=Ae*ve+Me*he,Ye=-Ae*he+Me*ve;return[L+le*q,X-(Ce*ne-Ye*te)*q,Ce*te+Ye*ne]}}const p=(T,R)=>(T/300)**R;function g(T,R,L){const X=[];for(const q of T)(q.a??1)<.02||(q.r=Math.max(L,q.r),X.push(q));return X.sort((q,te)=>q.z-te.z),{dots:X,lines:R.filter(q=>(q.a??1)>=.02)}}function b(T,R,L){const X=T/2,q=X*.82,te=u(R*.12,.3,X,X,1),ne=p(T,L.rsPow),he=[];for(let ve=0;ve<L.orbitN;ve++){const Ae=l(ve,1.7),Ce=l(ve,5.2),Me=l(ve,8.9),le=q*(.45+.52*Ae),Ye=Ae*s,De=Math.acos(2*Ce-1),ke=Math.sin(De)*Math.cos(Ye),Ke=Math.cos(De),yt=Math.sin(De)*Math.sin(Ye);let ut=-Ke,Xe=ke;const Qe=0,Vt=Math.max(1e-6,Math.hypot(ut,Xe));ut/=Vt,Xe/=Vt;const ft=Ke*Qe-yt*Xe,vt=yt*ut-ke*Qe,St=ke*Xe-Ke*ut,xt=(.25+.55*Me)*(Me>.5?1:-1);for(let kt=0;kt<L.ghostN;kt++){const re=kt/L.ghostN*s,Le=Math.cos(re),Ne=Math.sin(re),[Be,Je,Pt]=te((ut*Le+ft*Ne)*le,(Xe*Le+vt*Ne)*le,(Qe*Le+St*Ne)*le);he.push({x:Be,y:Je,z:Pt,r:L.ghostR*ne,white:.72,a:L.ghostA*(.4+.6*((Pt/le+1)/2))})}for(let kt=0;kt<L.particles;kt++){const re=R*xt+kt/L.particles*s+Ce*6,Le=Math.cos(re),Ne=Math.sin(re),[Be,Je,Pt]=te((ut*Le+ft*Ne)*le,(Xe*Le+vt*Ne)*le,(Qe*Le+St*Ne)*le),at=(Pt/le+1)/2;he.push({x:Be,y:Je,z:Pt,r:(L.partR+L.partRDepth*at)*ne,white:.3-.22*at})}}return g(he,[],L.rMin)}function m(T,R,L){const q=T/2,te=q*.82,ne=u(R*.5,.4+.06*Math.sin(R*.35),q,q,te),he=R*(.5+(1.7-.5)*L.scanMul),ve=p(T,L.rsPow),Ae=[];for(let Ce=0;Ce<=L.latRings;Ce++){const Me=-Math.PI/2+Ce/L.latRings*Math.PI,le=Math.cos(Me),Ye=Math.sin(Me),De=Math.max(1,Math.round(Math.abs(le)*L.lonDensity));for(let ke=0;ke<De;ke++){const Ke=ke/De*s,[yt,ut,Xe]=ne(le*Math.cos(Ke),Ye,le*Math.sin(Ke)),Qe=(Xe+1)/2,Vt=h(Ke+R*.5,he),ft=Math.exp(-(Vt*Vt)/.18)*Math.max(0,Xe);Ae.push({x:yt,y:ut,z:Xe,r:(L.rBase+L.rDepth*Qe+L.rBoost*ft)*ve,white:L.inkFar-L.inkSpan*Qe,a:L.dimBase+(1-L.dimBase)*Math.min(1,ft)})}}return g(Ae,[],L.rMin)}function f(T,R,L){const X=T/2,q=X*.82,te=u(R*.55,.35+.1*Math.sin(R*.9),X,X,q),ne=p(T,L.rsPow),he=L.moveCount,ve=[];for(let Ke=0;Ke<he;Ke++){const yt=Math.min(2,Math.floor(l(Ke,2.3)*3)),ut=-1+.5*Math.min(3,Math.floor(l(Ke,5.9)*4));ve.push({axis:yt,lo:ut,hi:ut+.5,ang:(l(Ke,7.7)<.5?1:-1)*Math.PI/2})}const Ae=.42,Ce=1.2,Me=2*he*Ae+Ce,le=R%Me,Ye=new Array(he).fill(0);let De=-1;if(le<2*he*Ae){const Ke=Math.floor(le/Ae),yt=(le-Ke*Ae)/Ae,ut=1-(1-Math.min(1,yt/.7))**3;if(Ke<he){for(let Xe=0;Xe<Ke;Xe++)Ye[Xe]=1;Ye[Ke]=ut,De=Ke}else{const Xe=2*he-1-Ke;for(let Qe=0;Qe<Xe;Qe++)Ye[Qe]=1;Ye[Xe]=1-ut,De=Xe}}const ke=[];for(let Ke=0;Ke<=L.latRings;Ke++){const yt=-Math.PI/2+Ke/L.latRings*Math.PI,ut=Math.cos(yt),Xe=Math.sin(yt),Qe=Math.max(1,Math.round(Math.abs(ut)*L.lonDensity));for(let Vt=0;Vt<Qe;Vt++){const ft=Vt/Qe*s;let vt=ut*Math.cos(ft),St=Xe,xt=ut*Math.sin(ft),kt=!1;for(let Je=0;Je<he;Je++){if(Ye[Je]<=0)continue;const Pt=ve[Je],at=Pt.axis===0?vt:Pt.axis===1?St:xt;if(at<Pt.lo||at>=Pt.hi)continue;Je===De&&(kt=!0);const En=Pt.ang*Ye[Je],Kt=Math.cos(En),nt=Math.sin(En);if(Pt.axis===0){const Bt=St*Kt-xt*nt;xt=St*nt+xt*Kt,St=Bt}else if(Pt.axis===1){const Bt=vt*Kt+xt*nt;xt=-vt*nt+xt*Kt,vt=Bt}else{const Bt=vt*Kt-St*nt;St=vt*nt+St*Kt,vt=Bt}}const[re,Le,Ne]=te(vt,St,xt),Be=(Ne+1)/2;ke.push({x:re,y:Le,z:Ne,r:(L.rBase+L.rDepth*Be+(kt?L.rActive:0))*ne,white:L.inkFar-L.inkSpan*Be-(kt?.14:0)})}}return g(ke,[],L.rMin)}function v(T,R,L){const X=T/2,q=X*.874,te=u(R*.18,.38,X,X,1),ne=p(T,L.rsPow),he=[];for(let ve=0;ve<=L.rings;ve++){const Ae=-Math.PI/2+ve/L.rings*Math.PI,Ce=Math.cos(Ae),Me=Math.sin(Ae),le=.62*Math.sin(R*2.1-ve*.52)+.38*Math.sin(R*1.27+ve*.83),Ye=q*(.88+.105*le),De=Math.max(1,Math.round(Math.abs(Ce)*L.lonDensity));for(let ke=0;ke<De;ke++){const Ke=ke/De*s,[yt,ut,Xe]=te(Ce*Math.cos(Ke)*Ye,Me*Ye,Ce*Math.sin(Ke)*Ye),Qe=(Xe/q+1)/2,Vt=Math.max(0,le);he.push({x:yt,y:ut,z:Xe,r:(L.rBase+L.rDepth*Qe)*(1+.4*Vt)*ne,white:.66-.56*Qe-.1*Vt})}}return g(he,[],L.rMin)}function S(T,R,L){const X=T/2,q=X*.8,te=u(R*.12,.32,X,X,q),ne=p(T,L.rsPow),he=L.nodeN,ve=[];for(let Me=0;Me<he;Me++){const le=d(Me,he),Ye=le[0]+.6*(c(Me*.31+9,R*.24)-.5),De=le[1]+.6*(c(Me*.53+27,R*.21)-.5),ke=le[2]+.6*(c(Me*.77+55,R*.27)-.5),Ke=Math.hypot(Ye,De,ke);ve.push([Ye/Ke,De/Ke,ke/Ke])}const Ae=[],Ce=[];for(let Me=0;Me<he;Me++)for(let le=Me+1;le<he;le++){const Ye=Math.hypot(ve[Me][0]-ve[le][0],ve[Me][1]-ve[le][1],ve[Me][2]-ve[le][2]);if(Ye>=L.thr)continue;const[De,ke,Ke]=te(ve[Me][0],ve[Me][1],ve[Me][2]),[yt,ut,Xe]=te(ve[le][0],ve[le][1],ve[le][2]);Ae.push({x1:De,y1:ke,x2:yt,y2:ut,white:.42,a:(1-Ye/L.thr)*(.3+.55*(((Ke+Xe)/2+1)/2)),w:Math.max(.6,L.lineW*ne)})}for(let Me=0;Me<he;Me++){const[le,Ye,De]=te(ve[Me][0],ve[Me][1],ve[Me][2]),ke=(De+1)/2;Ce.push({x:le,y:Ye,z:De,r:(L.nodeR+L.nodeRDepth*ke)*(1+.25*Math.sin(R*1.4+Me*2.7))*ne,white:.55-.45*ke})}for(let Me=0;Me<L.signals;Me++){const le=Math.floor(R*.55+Me*7.31),Ye=Math.floor(l(le,Me*3.1+1.7)*he),De=Math.floor(l(le,Me*5.7+4.2)*he);if(Ye===De)continue;const ke=o(R*.55+Me*7.31),Ke=r(ve[Ye][0],ve[De][0],ke),yt=r(ve[Ye][1],ve[De][1],ke),ut=r(ve[Ye][2],ve[De][2],ke),Xe=Math.max(1e-6,Math.hypot(Ke,yt,ut)),[Qe,Vt,ft]=te(Ke/Xe,yt/Xe,ut/Xe),vt=(ft+1)/2;Ce.push({x:Qe,y:Vt,z:ft,r:(L.nodeR*1.5+L.nodeRDepth*vt)*ne,white:.05,a:.5+.5*vt})}return g(Ce,Ae,L.rMin)}function x(T,R,L){const X=T/2,q=X*.76,te=u(R*.4,.3,X,X,1),ne=p(T,L.rsPow),he=[];for(let ve=0;ve<L.ghostN;ve++){const Ae=d(ve,L.ghostN),[Ce,Me,le]=te(Ae[0]*q,Ae[1]*q,Ae[2]*q);he.push({x:Ce,y:Me,z:le,r:.8*ne,white:.78,a:.1+.22*((le/q+1)/2)})}for(let ve=0;ve<3;ve++){const Ae=ve/3*s;for(let Ce=0;Ce<L.strandN;Ce++){const Me=(o(Ce/L.strandN+R*.045)*2-1)*.96,le=Math.sqrt(Math.max(0,1-Me*Me)),Ye=Math.min(1,(1-Math.abs(Me))/.1),De=Me*Math.PI*L.turns+Ae,ke=1+.075*Math.sin(Me*Math.PI*L.turns*2+Ae*2+R*.8),Ke=le*q*ke,[yt,ut,Xe]=te(Math.cos(De)*Ke,Me*q*ke,Math.sin(De)*Ke),Qe=(Xe/q+1)/2;he.push({x:yt,y:ut,z:Xe,r:(L.rBase+L.rDepth*Qe)*ne,white:.55-.45*Qe,a:Ye*(.45+.55*Qe)})}}return g(he,[],L.rMin)}function N(T,R,L){const X=T/2,q=X*.78,te=L.spin,ne=.3,he=u(R*.1*te,ne,X,X,1),ve=p(T,L.rsPow),Ae=[];for(let St=0;St<L.ghostN;St++){const xt=d(St,L.ghostN),[kt,re,Le]=he(xt[0]*q,xt[1]*q,xt[2]*q);Ae.push({x:kt,y:re,z:Le,r:.8*ve,white:.78,a:.1+.22*((Le/q+1)/2)})}const Ce=R*.24*te,Me=L.faceOn?-ne:.55+.3*Math.sin(R*.18)*te,le=Math.cos(Ce),Ye=0,De=Math.sin(Ce),ke=-De*Math.sin(Me),Ke=Math.cos(Me),yt=le*Math.sin(Me),ut=Ye*yt-De*Ke,Xe=De*ke-le*yt,Qe=le*Ke-Ye*ke,Vt=.23*L.wobMul,ft=L.faceOn?q/(1+.85*Vt):q,vt=Math.max(1,Math.round(L.lanes*L.bandMul));for(let St=0;St<vt;St++){const xt=(St-(vt-1)/2)*.075,kt=Math.abs(St-(vt-1)/2)/Math.max(1,(vt-1)/2);for(let re=0;re<L.segs;re++){const Le=re/L.segs*s,Ne=(.16*Math.sin(Le*3-R*1.7+St*.22)+.07*Math.sin(Le*5+R*1.1))*L.wobMul,Be=L.faceOn?1+Ne:1,Je=L.faceOn?xt:xt+Ne,Pt=Math.cos(Le),at=Math.sin(Le),En=le*Pt+ke*at+ut*Je,Kt=Ye*Pt+Ke*at+Xe*Je,nt=De*Pt+yt*at+Qe*Je,Bt=Math.hypot(En,Kt,nt),mr=ft*Be,[$l,Jl,lg]=he(En/Bt*mr,Kt/Bt*mr,nt/Bt*mr),Cf=(lg/q+1)/2;Ae.push({x:$l,y:Jl,z:lg,r:(L.rBase+L.rDepth*Cf)*(1-.25*kt)*ve,white:.52-.44*Cf+.18*kt,a:.4+.6*Cf})}}return g(Ae,[],L.rMin)}const w=T=>{const R=T.length,L=[];let X=0;for(let q=0;q<R;q++){const te=Math.hypot(T[(q+1)%R][0]-T[q][0],T[(q+1)%R][1]-T[q][1]);L.push(te),X+=te}return q=>{let te=q*X,ne=0;for(;te>L[ne]&&ne<R-1;)te-=L[ne],ne++;const he=T[ne],ve=T[(ne+1)%R],Ae=L[ne]?Math.min(1,te/L[ne]):0;return[he[0]+(ve[0]-he[0])*Ae,he[1]+(ve[1]-he[1])*Ae]}},C=[T=>{const R=-Math.PI/2+T*s;return[Math.cos(R)*.24,Math.sin(R)*.24]},w([[0,-.26],[.24,.16],[-.24,.16]]),w([[0,-.2],[.2,-.2],[.2,.2],[-.2,.2],[-.2,-.2]])];function y(T,R,L){const ne=C.length,he=R%(2.3*ne),ve=Math.floor(he/2.3),Ae=he-ve*2.3,Ce=Ae>1.4?(Ae-1.4)/.9:0,Me=Ce*Ce*(3-2*Ce),le=C[ve],Ye=C[(ve+1)%ne],De=160,ke=[],Ke=[];for(let xt=0;xt<De;xt++){const kt=le(xt/De),re=Ye(xt/De);ke.push([(kt[0]+(re[0]-kt[0])*Me)*L.spread,(kt[1]+(re[1]-kt[1])*Me)*L.spread])}let yt=0;for(let xt=0;xt<De;xt++){const kt=Math.hypot(ke[(xt+1)%De][0]-ke[xt][0],ke[(xt+1)%De][1]-ke[xt][1]);Ke.push(kt),yt+=kt}const ut=Math.max(6,Math.round(34*L.iconD)),Xe=L.rDot*1.35*L.spread,Qe=1+.02*Math.sin(Ae*3.1),Vt=T/2,ft=[];let vt=0,St=0;for(let xt=0;xt<ut;xt++){const kt=xt/ut*yt;for(;St+Ke[vt]<kt&&vt<De-1;)St+=Ke[vt],vt++;const re=ke[vt],Le=ke[(vt+1)%De],Ne=Ke[vt]?Math.min(1,(kt-St)/Ke[vt]):0;ft.push({x:Vt+(re[0]+(Le[0]-re[0])*Ne)*Qe*T,y:Vt+(re[1]+(Le[1]-re[1])*Ne)*Qe*T,z:0,r:Math.max(.35,Xe*T),white:.1})}return g(ft,[],L.rMin)}const D={globe:{latRings:17,lonDensity:44,rBase:.6,rDepth:1.7,rBoost:1,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},orbits:{orbitN:12,ghostN:40,ghostR:.9,ghostA:.5,particles:3,partR:1.2,partRDepth:1.6,rsPow:.6,rMin:.3},rubik:{latRings:15,lonDensity:40,moveCount:14,rBase:.6,rDepth:1.7,rActive:.3,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},wave:{rings:15,lonDensity:40,rBase:.6,rDepth:1.7,rsPow:.6,rMin:.3},web:{nodeN:30,thr:.72,signals:5,nodeR:1.4,nodeRDepth:1.8,lineW:.8,rsPow:.6,rMin:.3},braid:{strandN:52,turns:3,ghostN:150,rBase:1.2,rDepth:1.8,rsPow:.6,rMin:.3},ribbon:{lanes:5,segs:88,ghostN:150,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},ring:{lanes:5,segs:88,ghostN:0,faceOn:1,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},morph:{rDot:.021,iconD:1,rMin:.25}},U={orbits:{64:{speed:1.885,count:1,size:1},20:{speed:3.9,count:.238,size:2.4}},globe:{64:{speed:2.015,count:.42,size:1.15,x:{scanMul:4.08,dimBase:.45}},20:{speed:2.665,count:.105,size:1.75,x:{scanMul:4.335,dimBase:.45}}},rubik:{64:{speed:1.82,count:.35,size:1.05},20:{speed:1.95,count:.088,size:1.9}},wave:{64:{speed:4.388,count:.341,size:1},20:{speed:3.998,count:.105,size:1.6}},web:{64:{speed:3.315,count:1.35,size:.95},20:{speed:6.63,count:.25,size:1.52}},braid:{64:{speed:1.625,count:.5,size:1},20:{speed:2.75,count:.1125,size:1.36}},ribbon:{64:{speed:2.34,count:.25,size:.85,x:{spin:0,bandMul:3.9,wobMul:1}},20:{speed:3.12,count:.051,size:1.073,x:{spin:0,bandMul:4.94,wobMul:1}}},ring:{64:{speed:3.24,count:.25,size:.956,x:{spin:0,bandMul:3.627,wobMul:.368}},20:{speed:3.78,count:.028,size:1.622,x:{spin:0,bandMul:3.968,wobMul:.565}}},morph:{64:{speed:2.405,count:.702,size:.395,x:{spread:1.45}},20:{speed:2.08,count:.53,size:1.011,x:{spread:1.45}}}},P=[["latRings","lonDensity"],["rings","lonDensity"],["lanes","segs"]],B=["orbitN","ghostN","nodeN","strandN","signals"],z=["rBase","rDepth","rActive","rDot","ghostR","partR","partRDepth","nodeR","nodeRDepth"],G={orbits:b,globe:m,rubik:f,wave:v,web:S,braid:x,ribbon:N,ring:N,morph:y},k=new Map;function F(T,R){const L=T+R,X=k.get(L);if(X)return X;const q=U[T][R],te={...D[T]},ne=Math.sqrt(q.count),he=new Set;for(const[Ae,Ce]of P)te[Ae]!=null&&te[Ce]!=null&&!he.has(Ae)&&!he.has(Ce)&&(te[Ae]=Math.max(2,Math.round(te[Ae]*ne)),te[Ce]=Math.max(2,Math.round(te[Ce]*ne)),he.add(Ae),he.add(Ce));for(const Ae of B)te[Ae]!=null&&te[Ae]!==0&&!he.has(Ae)&&(te[Ae]=Math.max(1,Math.round(te[Ae]*q.count)));te.iconD!=null&&(te.iconD=Math.max(.02,te.iconD*q.count));for(const Ae of z)te[Ae]!=null&&(te[Ae]=te[Ae]*q.size);const ve={fn:G[T],speed:q.speed,opts:Object.assign({spin:1,faceOn:0,bandMul:1,wobMul:1,spread:1,scanMul:1,dimBase:1},te,q.x||{})};return k.set(L,ve),ve}function H(T,R,L,X,q,te){const ne=F(R,L),he=ne.fn(L,X*ne.speed,ne.opts),[ve,Ae,Ce]=q;for(const Me of he.lines){const le=1-Math.min(1,Math.max(0,Me.white));T.strokeStyle=`rgba(${le*ve|0},${le*Ae|0},${le*Ce|0},${(Me.a??1)*te})`,T.lineWidth=Me.w,T.beginPath(),T.moveTo(Me.x1,Me.y1),T.lineTo(Me.x2,Me.y2),T.stroke()}for(const Me of he.dots){const le=1-Math.min(1,Math.max(0,Me.white));T.fillStyle=`rgba(${le*ve|0},${le*Ae|0},${le*Ce|0},${(Me.a??1)*te})`,T.beginPath(),T.arc(Me.x,Me.y,Me.r,0,s),T.fill()}}const I={IDLE:{mode:"ring",cn:"Idle"},RECV:{mode:"wave",cn:"Receive"},PLAN:{mode:"morph",cn:"Plan"},SCAN:{mode:"globe",cn:"Retrieve"},EXEC:{mode:"orbits",cn:"Execute"},DBUG:{mode:"rubik",cn:"Debug"},SYNC:{mode:"web",cn:"Coordinate"},MERG:{mode:"braid",cn:"Merge"},WRIT:{mode:"ribbon",cn:"Compose"}},j=[{id:"plan",cn:"Planning",tag:"PLAN",color:"#d6dee8",prog:[["PLAN",.8],["SYNC",.5]],rework:0},{id:"find",cn:"Research",tag:"FIND",color:"#9db6cc",prog:[["SCAN",1.6],["WRIT",.8]],rework:0},{id:"code",cn:"Coding",tag:"CODE",color:"#9ec4b8",prog:[["EXEC",2.9],["DBUG",1.4]],rework:.1},{id:"crit",cn:"Review",tag:"CRIT",color:"#b4aac8",prog:[["SCAN",.8],["MERG",1.2]],rework:.18},{id:"ship",cn:"Delivery",tag:"SHIP",color:"#c8ab9e",prog:[["MERG",.7],["WRIT",.7]],rework:0}],de={plan:1,find:2,code:3,crit:1,ship:1},Te=16,Oe=210,et=128,$e=64,st=620,pe=178,Re=16;let ce=[],ze=[],We=[],Ze=[],wt=[],tt=0,Mt=0,gt=0,ht=20,Ot=1,rt=null,Wt=0,Zt=0;const ct={x:-9999,y:-9999,in:!1};let Z=20260418;const O=()=>(Z=Z*1664525+1013904223>>>0)/4294967296,{field:He,glow:Ue}=t,E=He.getContext("2d");let _=innerWidth,W=innerHeight,Q=46;function ie(T){const R=_>1080?268:240,L=_-Q,X=j.length;return{x:R+(T+.5)/X*(L-R),y:W*.5-16,rx:Math.max(40,(L-R)/X*.33),ry:Math.max(60,W*.28)}}const me=T=>{const R=ie(T.ri);return{x:R.x+(O()-.5)*R.rx*2,y:R.y+(O()-.5)*R.ry*2}};function be(T){const R=ie(T),L={n:++gt,ri:T,x:R.x+(O()-.5)*R.rx*2,y:R.y+(O()-.5)*R.ry*2,head:O()*s,wp:null,phase:O()*40,state:"IDLE",task:null,step:0,left:0,queue:[],off:!1,busy:0,span:0,pulse:0,hist:new Array(28).fill(0),histT:0};return L.wp=me(L),L}let ae=!1;const K=new Map,ue={PLANNED:"IDLE",RUNNING:"EXEC",BLOCKED:"DBUG",REVIEW:"SCAN",REPAIR:"DBUG",VERIFIED:"MERG",MERGED:"MERG",DONE:"WRIT"},ge={PLANNED:"plan",RUNNING:"code",BLOCKED:"code",REVIEW:"crit",REPAIR:"code",VERIFIED:"crit",MERGED:"ship",DONE:"ship"};function Se(){ce=[],ze=[],We=[],Ze=[],wt=[],tt=0,Mt=0,gt=0,Zt=0,j.forEach((T,R)=>{for(let L=0;L<de[T.id];L++)ce.push(be(R))});for(let T=0;T<90*30;T++)je(1/30)}function Ee(T){const R=ce.filter(X=>X.ri===T&&!X.off);if(!R.length)return null;const L=R.filter(X=>X.state==="IDLE"&&!X.task&&!X.queue.length);return L.length?L[Math.floor(O()*L.length)]:R.reduce((X,q)=>q.queue.length<X.queue.length?q:X)}function Ge(T,R){const L=Ee(R);return L?(L.queue.push(T),L.pulse=1,!0):(ze.push({t:T,ri:R}),!1)}function qe(T,R,L){const X=Ee(L);if(!X){ze.push({t:R,ri:L});return}We.push({from:T,to:X,task:R,f:0,back:L<T.ri})}function it(T){const[R,L]=j[T.ri].prog[T.step];T.state=R,T.left=L*(.75+O()*.5)}const V=30;function we(T,R){if(T.off){T.state="IDLE";return}const L=Math.exp(-R/V);if(T.span=T.span*L+R,T.task?T.busy=T.busy*L+R:T.busy*=L,!T.task){if(!T.queue.length){T.state="IDLE";return}T.task=T.queue.shift(),T.state="RECV",T.left=.34,T.step=-1}if(T.left-=R,T.left>0)return;if(T.step<0){T.step=0,it(T);return}if(T.step++,T.step<j[T.ri].prog.length){it(T);return}const X=j[T.ri],q=T.task;if(T.task=null,T.step=0,T.state="IDLE",q.hops++,T.ri>0&&O()<X.rework){q.rework++,qe(T,q,T.ri-1);return}if(T.ri===j.length-1){q.doneAt=tt,Zt++,wt.push(q),wt.length>80&&wt.shift();return}qe(T,q,T.ri+1)}const fe=.055,oe=$e*1.42;function Pe(T,R){const L=!!T.task;(!T.wp||Math.hypot(T.wp.x-T.x,T.wp.y-T.y)<16)&&(T.wp=me(T));let X=T.wp.x,q=T.wp.y;if(ct.in){const he=Math.hypot(ct.x-T.x,ct.y-T.y);if(he<et){const ve=1-he/et;X=r(X,ct.x,ve*.85),q=r(q,ct.y,ve*.85)}}T.head+=Math.max(-fe,Math.min(fe,h(Math.atan2(q-T.y,X-T.x),T.head)));const te=(L?7:30)*R;T.x+=Math.cos(T.head)*te,T.y+=Math.sin(T.head)*te;for(const he of ce){if(he===T)continue;const ve=T.x-he.x,Ae=T.y-he.y,Ce=ve*ve+Ae*Ae;if(Ce>oe*oe)continue;const Me=Math.max(.001,Math.sqrt(Ce)),le=(1-Me/oe)*34*R,Ye=Math.abs(Ae)<1?T.n<he.n?-oe:oe:Ae,De=Math.max(.001,Math.hypot(ve,Ye));T.x+=ve/De*le*.5,T.y+=Ye/De*le*1.5}const ne=ie(T.ri);T.x=r(T.x,Math.max(ne.x-ne.rx*1.5,Math.min(ne.x+ne.rx*1.5,T.x)),.08),T.y=r(T.y,Math.max(ne.y-ne.ry*1.2,Math.min(ne.y+ne.ry*1.2,T.y)),.08),T.pulse>0&&(T.pulse-=R*1.6),T.histT+=R,T.histT>1&&(T.histT=0,T.hist.push(L?1:0),T.hist.shift())}function ye(){return ze.length+We.length+ce.reduce((T,R)=>T+R.queue.length+(R.task?1:0),0)}function je(T){tt+=T,ae||(Wt-=T,Wt<=0&&(Wt=-Math.log(1-O())*(60/ht),ye()<Te&&Ge({id:++Mt,at:tt,hops:0,rework:0},0)));for(let R=ze.length-1;R>=0;R--){const L=Ee(ze[R].ri);L&&(L.queue.push(ze[R].t),L.pulse=1,ze.splice(R,1))}for(const R of ce)ae||we(R,T),Pe(R,T);for(let R=We.length-1;R>=0;R--){const L=We[R],X=Math.max(1,Math.hypot(L.to.x-L.from.x,L.to.y-L.from.y));L.f+=Oe*T/X,L.f>=1&&(ce.includes(L.to)&&!L.to.off?(L.to.queue.push(L.task),L.to.pulse=1):ze.push({t:L.task,ri:L.to.ri}),We.splice(R,1))}for(let R=Ze.length-1;R>=0;R--)Ze[R].t+=T*1.6,Ze[R].t>1&&Ze.splice(R,1)}const Ve=[223,227,232],bt=[207,217,228],It="ui-monospace, 'Geist Mono Variable', SFMono-Regular, Menlo, monospace",Dn=T=>[1,3,5].map(R=>parseInt(T.slice(R,R+2),16)).join(",");for(const T of j)T.rgb=Dn(T.color);function Nn(T){E.clearRect(0,0,_,W),E.textAlign="center";for(let R=0;R<j.length;R++){const L=j[R],X=ie(R),q=ce.filter(ne=>ne.ri===R&&!ne.off).length,te=ce.filter(ne=>ne.ri===R).reduce((ne,he)=>ne+he.queue.length,0);E.strokeStyle=`rgba(${L.rgb},0.055)`,E.lineWidth=1,E.beginPath(),E.moveTo(X.x,74),E.lineTo(X.x,W-66),E.stroke(),E.strokeStyle=`rgba(${L.rgb},0.16)`,E.beginPath(),E.moveTo(X.x-X.rx*.8,62),E.lineTo(X.x+X.rx*.8,62),E.stroke(),E.font=`10px ${It}`,E.fillStyle=`rgba(${L.rgb},${q?.78:.34})`,E.fillText(`${R+1}. ${L.cn} ${L.tag}`,X.x,40),E.font=`9px ${It}`,E.fillStyle="rgba(150,160,172,0.5)",E.fillText(q?`${q} agents · queue ${te}`:"No agents",X.x,53)}E.textAlign="left",E.lineWidth=.7,E.setLineDash([3,5]);for(let R=0;R<ce.length;R++)for(let L=R+1;L<ce.length;L++){const X=ce[R],q=ce[L],te=Math.hypot(X.x-q.x,X.y-q.y);te>pe||(E.strokeStyle=`rgba(190,200,212,${(.42*(1-te/pe)).toFixed(3)})`,E.beginPath(),E.moveTo(X.x,X.y),E.lineTo(q.x,q.y),E.stroke())}E.setLineDash([]);for(const R of We){const L=r(R.from.x,R.to.x,R.f),X=r(R.from.y,R.to.y,R.f),q=R.back?"224,104,95":"186,203,220";E.strokeStyle=`rgba(${q},0.18)`,E.lineWidth=.9,E.beginPath(),E.moveTo(R.from.x,R.from.y),E.lineTo(R.to.x,R.to.y),E.stroke();const te=Math.max(0,R.f-.14),ne=r(R.from.x,R.to.x,te),he=r(R.from.y,R.to.y,te),ve=E.createLinearGradient(ne,he,L,X);ve.addColorStop(0,`rgba(${q},0)`),ve.addColorStop(1,`rgba(${q},0.85)`),E.strokeStyle=ve,E.lineWidth=1.6,E.beginPath(),E.moveTo(ne,he),E.lineTo(L,X),E.stroke(),E.fillStyle=`rgba(${q},0.95)`,E.beginPath(),E.arc(L,X,2.3,0,s),E.fill()}E.font=`9.5px ${It}`,E.textBaseline="middle";for(const R of ce){const L=j[R.ri],X=rt===R,q=ct.in&&Math.hypot(ct.x-R.x,ct.y-R.y)<$e*.62;if(R.off||(E.strokeStyle="rgba(150,160,172,0.42)",E.lineWidth=.8,E.beginPath(),E.moveTo(R.x-Math.cos(R.head)*$e*.4,R.y-Math.sin(R.head)*$e*.4),E.lineTo(R.x-Math.cos(R.head)*$e*.74,R.y-Math.sin(R.head)*$e*.74),E.stroke(),R.wp&&!R.task&&(E.fillStyle="rgba(150,160,172,0.45)",E.beginPath(),E.arc(R.wp.x,R.wp.y,1.6,0,s),E.fill())),E.save(),E.translate(R.x-$e/2,R.y-$e/2),H(E,I[R.state].mode,$e,T+R.phase,X?bt:Ve,R.off?.16:1),E.restore(),R.pulse>0){const le=R.pulse;E.strokeStyle=`rgba(200,214,228,${(le*.7).toFixed(3)})`,E.lineWidth=1,E.beginPath(),E.arc(R.x,R.y,$e*.42+(1-le)*22,0,s),E.stroke()}(X||q)&&(E.strokeStyle=X?"rgba(207,217,228,0.75)":"rgba(190,200,212,0.30)",E.lineWidth=1,E.setLineDash([2,4]),E.beginPath(),E.arc(R.x,R.y,$e*.6,0,s),E.stroke(),E.setLineDash([]));const te=`A${R.n} ${L.tag}`,ne=R.off?" OFFLINE":" "+R.state,he=E.measureText(te).width,ve=E.measureText(ne).width,Ce=R.x+$e*.42+he+ve>_-12?R.x-$e*.42-he-ve:R.x+$e*.42,Me=R.y-$e*.3;E.fillStyle=R.off?"rgba(120,128,138,.55)":L.color,E.fillText(te,Ce,Me),E.fillStyle=R.off?"rgba(100,108,118,.5)":"rgba(190,200,212,0.62)",E.fillText(ne,Ce+he,Me),R.queue.length&&(E.fillStyle="rgba(207,217,228,0.92)",E.fillText(`+${R.queue.length}`,Ce,Me+12))}ct.in&&(E.strokeStyle="rgba(190,200,212,0.13)",E.lineWidth=.5,E.setLineDash([6,8]),E.beginPath(),E.arc(ct.x,ct.y,et,0,s),E.stroke(),E.setLineDash([]));for(const R of Ze)E.strokeStyle=`rgba(224,104,95,${((1-R.t)*.75).toFixed(3)})`,E.lineWidth=2*(1-R.t),E.beginPath(),E.arc(R.x,R.y,12+R.t*150,0,s),E.stroke()}const Dt=Ue.getContext("webgl",{alpha:!1,antialias:!1});let Si=()=>{};if(Dt){const T=`precision mediump float;
    uniform vec2 uRes; uniform float uTime, uN; uniform vec3 uA[${Re}];
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
      for (int i = 0; i < ${Re}; i++) {
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
    }`,R=(Me,le)=>{const Ye=Dt.createShader(Me);return Dt.shaderSource(Ye,le),Dt.compileShader(Ye),Ye},L=Dt.createProgram();Dt.attachShader(L,R(Dt.VERTEX_SHADER,"attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}")),Dt.attachShader(L,R(Dt.FRAGMENT_SHADER,T)),Dt.linkProgram(L),Dt.useProgram(L);const X=Dt.createBuffer();Dt.bindBuffer(Dt.ARRAY_BUFFER,X),Dt.bufferData(Dt.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),Dt.STATIC_DRAW);const q=Dt.getAttribLocation(L,"p");Dt.enableVertexAttribArray(q),Dt.vertexAttribPointer(q,2,Dt.FLOAT,!1,0,0);const te=Me=>Dt.getUniformLocation(L,Me),ne=te("uRes"),he=te("uTime"),ve=te("uN"),Ae=te("uA[0]"),Ce=new Float32Array(Re*3);Si=(Me,le)=>{const Ye=Math.min(Re,ce.length);for(let De=0;De<Ye;De++){const ke=ce[De];Ce[De*3]=ke.x*le,Ce[De*3+1]=(W-ke.y)*le,Ce[De*3+2]=ke.off?.05:ke.task?1:.22}Dt.uniform2f(ne,Ue.width,Ue.height),Dt.uniform1f(he,Me),Dt.uniform1f(ve,Ye),Dt.uniform3fv(Ae,Ce),Dt.drawArrays(Dt.TRIANGLES,0,3)}}const en=t.roster;function Et(){const T=Math.min(devicePixelRatio,2);en.innerHTML=j.map((R,L)=>{const X=ce.filter(q=>q.ri===L);return`<div class="grp"><h2><i style="background:${R.color}"></i>${R.cn} ${R.tag}<span class="sp"></span>
      <button data-sub="${L}" type="button"${X.length?"":" disabled"}>−</button>
      <button data-add="${L}" type="button"${ce.length>=Re?" disabled":""}>+</button></h2>
      ${X.map(q=>`<div class="ag" data-n="${q.n}"><canvas></canvas>
        <span class="nm">${q.label||"A"+q.n}</span><span class="st"></span>
        <span class="q"></span><span class="bar"><i></i></span></div>`).join("")}
    </div>`}).join("");for(const R of en.querySelectorAll("canvas"))R.width=20*T,R.height=20*T,R.getContext("2d").setTransform(T,0,0,T,0,0)}a(en,"click",T=>{const R=T.target.closest("[data-add]"),L=T.target.closest("[data-sub]");if(R){ce.length<Re&&(ce.push(be(+R.dataset.add)),Et());return}if(L){const q=+L.dataset.sub,te=ce.filter(he=>he.ri===q);if(!te.length)return;const ne=te[te.length-1];ce=ce.filter(he=>he!==ne),rt===ne&&(rt=null,Hn());for(const he of[...ne.task?[ne.task]:[],...ne.queue])Ge(he,q);Et();return}const X=T.target.closest("[data-n]");X&&(rt=ce.find(q=>q.n===+X.dataset.n)||null,Hn(),Et())});function Un(T){for(const R of en.querySelectorAll(".ag")){const L=ce.find(ne=>ne.n===+R.dataset.n);if(!L)continue;const X=R.querySelector("canvas").getContext("2d");X.clearRect(0,0,20,20),H(X,I[L.state].mode,20,T+L.phase,rt===L?bt:Ve,L.off?.2:1),R.querySelector(".st").textContent=L.off?"OFFLINE":`${L.state} ${I[L.state].cn}`,R.querySelector(".q").textContent=L.queue.length?`+${L.queue.length}`:"";const q=L.span>0?L.busy/L.span:0,te=R.querySelector(".bar i");te.style.width=(q*100).toFixed(0)+"%",te.style.background=q>.86?"var(--bad)":q>.75?"var(--warn)":"var(--muted)",R.classList.toggle("on",rt===L),R.classList.toggle("down",L.off)}}function li(){const T=rt,R=j[T.ri],L=T.span>0?T.busy/T.span:0,X=I[T.state];return{n:T.n,color:R.color,cn:R.cn,prog:R.prog.map(q=>q[0]).join(" → "),off:T.off,st:`${T.state} ${X.cn}`,md:X.mode,tk:T.task?"#"+T.task.id:"—",q:T.queue.length,u:(L*100).toFixed(0)+"%",hist:T.hist.map(q=>!!q)}}function Hn(){if(!rt||!ce.includes(rt)){rt=null,e.card(null);return}e.card(li())}function Qn(){!rt||!ce.includes(rt)||e.card(li())}function Gi(T){const R=rt;R&&(T==="off"?(R.off=!R.off,R.off&&Mi(R)):Qi(R),Hn(),Et())}function ha(){rt=null,Hn(),Et()}function Mi(T){const R=[...T.task?[T.task]:[],...T.queue];T.task=null,T.queue=[],T.state="IDLE",T.step=0;for(const L of R){const X=Ee(T.ri);X&&X!==T?(X.queue.push(L),X.pulse=1):ze.push({t:L,ri:T.ri})}}function Qi(T){!T.task&&!T.queue.length||(Ze.push({x:T.x,y:T.y,t:0}),Mi(T))}function Vi(){const T=Math.min(60,tt),R=wt.filter(te=>te.doneAt>tt-60),L=wt.slice(-20).map(te=>te.doneAt-te.at).sort((te,ne)=>te-ne),X=j.map((te,ne)=>{const he=ce.filter(Ce=>Ce.ri===ne&&!Ce.off),ve=he.reduce((Ce,Me)=>Ce+Me.span,0),Ae=he.reduce((Ce,Me)=>Ce+Me.busy,0);return{r:te,n:he.length,u:ve>0?Ae/ve:0,q:he.reduce((Ce,Me)=>Ce+Me.queue.length,0)}});let q=0;for(let te=0;te<ce.length;te++)for(let ne=te+1;ne<ce.length;ne++)Math.hypot(ce[te].x-ce[ne].x,ce[te].y-ce[ne].y)<pe&&q++;return{thr:T>3?R.length/T*60:0,lead:L.length?L[Math.floor(L.length/2)]:0,wip:ye(),fin:Zt,util:X,links:q}}function $n(){const T=Vi();Qn(),t.tally.innerHTML=`<b>${ce.filter(q=>!q.off).length}</b> active · <b>${ce.filter(q=>q.task).length}</b> working<br>
     <b>${T.links}</b> links · <b>${We.length}</b> messages in transit · <b>${T.fin}</b> delivered`,t.stats.innerHTML=`
    <div class="m"><u>Throughput</u><b>${T.thr.toFixed(1)}<s>tasks/min</s></b></div>
    <div class="m"><u>Lead time</u><b>${T.lead.toFixed(1)}<s>sec</s></b></div>
    <div class="m"><u>Work in progress</u><b>${T.wip}<s>/${Te}</s></b></div>
    ${T.util.map(q=>`<div class="m"><u>${q.r.cn}</u><b style="color:${q.u>.86?"var(--bad)":q.u>.75?"var(--warn)":"var(--ink)"}">${(q.u*100).toFixed(0)}<s>%</s></b></div>`).join("")}`;const R=T.util.find(q=>q.n===0),L=T.util.reduce((q,te)=>te.u>q.u?te:q),X=T.util.reduce((q,te)=>te.q>q.q?te:q);t.verdict.innerHTML=R?`<b>${R.r.cn}</b> has no agents; work is blocked upstream.`:tt<15?"Warming up: throughput becomes reliable after a full minute of completions.":L.u>.86?`Bottleneck: <b>${L.r.cn}</b> at ${(L.u*100).toFixed(0)}% utilization. Add capacity here first.`:X.q>=3?`<b>${X.r.cn}</b> has ${X.q} queued tasks; this is arrival variability, not yet a sustained capacity gap.`:`No clear bottleneck. <b>${L.r.cn}</b> is busiest at ${(L.u*100).toFixed(0)}%. Raise arrival rate to stress the system.`}const bi=T=>{ht=+T},qa=T=>{Ot=+T,e.speed(Ot)},Ds=(T,R)=>ce.find(L=>Math.hypot(L.x-T,L.y-R)<$e*.62)||null;let pa=null,$i=!1;a(He,"pointermove",T=>{ct.x=T.clientX,ct.y=T.clientY,ct.in=!0}),a(He,"pointerleave",()=>{ct.in=!1,ct.x=ct.y=-9999}),a(He,"pointerdown",T=>{const R=Ds(T.clientX,T.clientY);$i=!1,R&&(pa=setTimeout(()=>{$i=!0,Qi(R),Et()},st))}),a(window,"pointerup",T=>{clearTimeout(pa),!($i||T.target!==He)&&(rt=Ds(T.clientX,T.clientY),Hn(),Et())}),a(window,"keydown",T=>{T.key==="Escape"&&(rt=null,Hn(),Et()),T.key===" "&&!T.target.closest("button,input")&&(T.preventDefault(),qa(Ot?0:1))});function Ns(){const T=Math.min(devicePixelRatio,2);_=innerWidth,W=innerHeight;for(const R of[He,Ue])(R.width!==Math.round(_*T)||R.height!==Math.round(W*T))&&(R.width=Math.round(_*T),R.height=Math.round(W*T),R===He?E.setTransform(T,0,0,T,0,0):Dt&&Dt.viewport(0,0,R.width,R.height));return T}const A=matchMedia("(prefers-reduced-motion: reduce)"),Y=T3({getAgents:()=>ce,ROLES:j,STATES:I,LINK_R:pe});let se=0,$=1;Ns(),Se(),Et();let ee=0;(function T(R){ee=requestAnimationFrame(T);const L=Ns(),X=Math.min(.05,(R-se)/1e3);se=R,Q=r(Q,rt&&_>1080?300:46,1-Math.exp(-X*5)),Ot&&je(X*Ot);const q=A.matches?0:tt;Dt&&Si(R/1e3,L),Y.step(X*Ot||0),Nn(q),Y.draw(E),Un(q),$+=X,$>.25&&($=0,$n())})(0);function Ie(T){if(!Array.isArray(T)||T.length===0)return ae&&(ae=!1,K.clear(),Se(),Et()),{live:!1,agents:0};ae=!0;const R=new Set,L=[];for(const X of T.slice(0,Re)){const q=String(X.id);if(R.has(q))continue;R.add(q);const te=ge[X.status]||"code",ne=Math.max(0,j.findIndex(ve=>ve.id===te));let he=K.get(q);he||(he=be(ne),K.set(q,he)),he.ri=ne,he.label=X.label||q,he.state=ue[X.status]||"IDLE",he.task=null,he.queue=[],he.off=!1,L.push(he)}for(const X of[...K.keys()])R.has(X)||K.delete(X);return ce=L,ze=[],We=[],Et(),{live:!0,agents:ce.length}}return{setLam:bi,setSpeed:qa,cardAct:Gi,closeCard:ha,mesh:Y,setFleet:Ie,dispose(){n.abort(),cancelAnimationFrame(ee),clearTimeout(pa)}}}const R3=["info","ok","warn","bad"];function w3({mesh:t}){const e=new Map,n=new Map,i=[];let a=new Map,s=new Map;const r=(w,C)=>(e.get(w)||[]).forEach(y=>y(C));function o(w,C,y){i.unshift({ts:new Date,level:R3.includes(w)?w:"info",text:C,id:y}),i.length>60&&i.pop(),S(),r("note",i[0])}function l({id:w,name:C,n:y}={}){if(!w)throw new Error("PlugBrainMesh.register: {id} is required");const D=t.snapshot();let U=y;if(U==null){const z=D.find(G=>![...a.values()].includes(G.n));U=z?z.n:null}if(U==null)return o("warn",`register ${w}: no free field agent left`),null;a.set(w,U);const P=(D.find(z=>z.n===U)||{}).hue||"#8ab2d1",B={id:w,name:C||w,n:U,hue:P,ts:Date.now()};return n.set(w,B),o("ok",`registered ${B.name} → field agent A${U}`,w),r("register",B),f(D),B}function c(w){if(!n.delete(w))return!1;const C=a.get(w);return a.delete(w),o("info",`unregistered ${w} (A${C} returns to the pool)`,w),r("unregister",{id:w,n:C}),f(),!0}function d(w,C,y="info"){o(y,C,w)}const h=document.createElement("div");h.id="mesh-root",h.innerHTML=`
    <button id="mesh-toggle" type="button" title="Agent registry (m)">◈ mesh</button>
    <div id="mesh-panel" aria-hidden="true">
      <div class="mp-head">
        <h3>Agent Registry</h3><span class="mp-count"></span>
        <button class="mp-x" type="button" title="close">✕</button>
      </div>
      <div class="mp-list"></div>
      <div class="mp-foot">PlugBrainMesh · register() · note() · unregister()</div>
    </div>
    <div id="mesh-feed"></div>`,document.body.appendChild(h);const u=h.querySelector("#mesh-panel"),p=h.querySelector(".mp-list"),g=h.querySelector("#mesh-feed"),b=h.querySelector("#mesh-toggle"),m=w=>{u.setAttribute("aria-hidden",String(!w)),b.classList.toggle("on",w),w&&f()};b.addEventListener("click",()=>m(u.getAttribute("aria-hidden")==="true")),h.querySelector(".mp-x").addEventListener("click",()=>m(!1)),window.addEventListener("keydown",w=>{w.key.toLowerCase()==="m"&&!w.target.closest("input,button")&&m(u.getAttribute("aria-hidden")==="true")});function f(w=t.snapshot()){h.querySelector(".mp-count").textContent=`${w.length} on field · ${n.size} registered`,p.innerHTML=w.map(C=>{const y=[...n.values()].find(P=>P.n===C.n),D=y?y.name:`A${C.n}`,U=Math.round(C.util*100);return`<div class="mp-row" data-n="${C.n}">
        <i class="mp-hue" style="background:${C.hue}"></i>
        <span class="mp-name">${D}${y?` <s>A${C.n}</s>`:""}</span>
        <span class="mp-state ${C.state==="OFFLINE"?"off":""}">${C.stateCn}</span>
        <span class="mp-task">${C.task||""}</span>
        <span class="mp-bar"><i style="width:${U}%;background:${U>86?"var(--bad)":U>75?"var(--warn)":C.hue}"></i></span>
      </div>`}).join("")}const v=w=>w.toTimeString().slice(0,8);function S(){g.innerHTML=i.slice(0,9).map((w,C)=>`<div class="mf-line" style="opacity:${1-C*.1}">
        <s>${v(w.ts)}</s><i class="mf-${w.level}"></i><span>${w.text}</span>
      </div>`).join("")}let x=setInterval(()=>{const w=t.snapshot();for(const C of w){const y=s.get(C.n);if(y&&y!==C.state){const D=[...n.values()].find(B=>B.n===C.n),U=D?D.name:`A${C.n}`,P=C.state==="DBUG"?"warn":C.state==="EXEC"?"ok":"info";o(P,`${U} · ${y} → ${C.state}${C.task?" · "+C.task:""}`,D==null?void 0:D.id)}s.set(C.n,C.state)}u.getAttribute("aria-hidden")==="false"&&f(w)},800);const N={register:l,unregister:c,note:d,list:()=>[...n.values()],feed:()=>[...i],on:(w,C)=>(e.has(w)||e.set(w,new Set),e.get(w).add(C),()=>e.get(w).delete(C)),dispose:()=>{clearInterval(x),h.remove()}};return window.PlugBrainMesh=N,o("ok","agent mesh module online — simulated fleet auto-registered"),N}const C3=[[0,"⏸"],[1,"1×"],[2,"2×"],[4,"4×"]];function D3({tasks:t}){const e=xe.useRef(null),n=xe.useRef(null),i=xe.useRef(null),a=xe.useRef(null),s=xe.useRef(null),r=xe.useRef(null),o=xe.useRef(null),[l,c]=xe.useState(null),[d,h]=xe.useState(20),[u,p]=xe.useState(1);return xe.useEffect(()=>{const g=A3({els:{glow:e.current,field:n.current,roster:i.current,tally:a.current,stats:s.current,verdict:r.current},emit:{card:c,speed:p}});o.current=g;const b=w3({mesh:g.mesh});return()=>{b.dispose(),g.dispose(),o.current=null}},[]),xe.useEffect(()=>{var g;(g=o.current)==null||g.setFleet(t.map(b=>({id:b.id,label:b.assignedAgentId||b.title||b.id,status:b.status})))},[t]),M.jsxs(M.Fragment,{children:[M.jsx("canvas",{id:"glow",ref:e}),M.jsx("canvas",{id:"field",ref:n}),M.jsxs("div",{className:"ov",id:"hud",children:[M.jsxs("h1",{children:[M.jsx("i",{}),"Agent Mesh",M.jsx("em",{children:"Workflow"})]}),M.jsx("div",{className:"tally",id:"tally",ref:a,children:"—"})]}),M.jsx("div",{className:"ov",id:"roster",ref:i}),M.jsx("div",{className:"ov"+(l?" on":""),id:"inspect",children:l&&M.jsxs(M.Fragment,{children:[M.jsxs("h3",{children:[M.jsx("i",{style:{background:l.color}}),"A",l.n," · ",l.cn,M.jsx("button",{className:"x",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.closeCard()},children:"✕"})]}),M.jsxs("div",{className:"kv",children:[M.jsx("span",{children:"Current state"}),M.jsx("b",{id:"i-st",children:l.st}),M.jsx("span",{children:"State visualization"}),M.jsx("b",{id:"i-md",children:l.md}),M.jsx("span",{children:"Task"}),M.jsx("b",{id:"i-tk",children:l.tk}),M.jsx("span",{children:"Queue"}),M.jsx("b",{id:"i-q",children:l.q}),M.jsx("span",{children:"Utilization"}),M.jsx("b",{id:"i-u",children:l.u}),M.jsx("span",{children:"State program"}),M.jsx("b",{children:l.prog})]}),M.jsx("div",{className:"hist",children:l.hist.map((g,b)=>M.jsx("i",{style:{height:g?"100%":"16%",background:g?l.color:"var(--line)"}},b))}),M.jsx("div",{className:"note",children:"The strip shows busy and idle time over the last 28 seconds. Long gaps mean spare capacity; a full strip marks a constraint."}),M.jsxs("div",{className:"act",children:[M.jsx("button",{className:"btn"+(l.off?" on":""),"data-act":"off",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.cardAct("off")},children:l.off?"Bring online":"Take offline"}),M.jsx("button",{className:"btn","data-act":"kick",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.cardAct("kick")},children:"Interrupt and reassign"})]})]})}),M.jsxs("div",{className:"ov",id:"ctl",children:[M.jsxs("div",{className:"fld",children:["Arrival rate ",M.jsxs("b",{id:"lamv",children:[d," /min"]}),M.jsx("input",{type:"range",id:"lam",min:"4",max:"46",step:"1",value:d,onChange:g=>{var b;h(+g.target.value),(b=o.current)==null||b.setLam(+g.target.value)}})]}),M.jsx("div",{className:"seg",id:"spd",children:C3.map(([g,b])=>M.jsx("button",{className:u===g?"on":"","data-s":g,type:"button",onClick:()=>{var m;return(m=o.current)==null?void 0:m.setSpeed(g)},children:b},g))}),M.jsx("span",{className:"sp"}),M.jsx("div",{id:"stats",ref:s}),M.jsx("div",{id:"verdict",ref:r,children:"—"})]}),M.jsx("div",{id:"tip",children:"Move cursor near agents to call them · click to inspect · hold to interrupt and reassign · Space to pause"})]})}function N3({tasks:t,depth:e}){if(t.length===0)return M.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});t.filter(s=>s.state==="pending");const n=t.filter(s=>s.state==="claimed"),i=t.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return M.jsxs("div",{className:"queue",children:[M.jsxs("div",{className:"queue__figures",children:[M.jsx(jc,{value:e,label:"WARTEND",tone:e>8?"hot":void 0}),M.jsx(jc,{value:n.length,label:"IN ARBEIT"}),M.jsx(jc,{value:i.length,label:"GELIEFERT"}),M.jsx(jc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),M.jsx("ol",{className:"queue__list",children:t.map(s=>M.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[M.jsx("span",{className:"queue__state",children:U3[s.state]??s.state}),M.jsx("span",{className:"queue__title",title:s.title,children:s.title}),M.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&M.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&M.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const U3={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function jc({value:t,label:e,tone:n}){return M.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[M.jsx("strong",{children:t}),M.jsx("span",{children:e})]})}function Yc({workspaceId:t,path:e,highlightLine:n,onClose:i}){const[a,s]=xe.useState(!0),[r,o]=xe.useState(null),[l,c]=xe.useState(null),[d,h]=xe.useState(null),u=xe.useRef(null);if(xe.useEffect(()=>{let m=!0;return s(!0),o(null),Promise.allSettled([c3(t,e),r3(t),o3(t,e)]).then(([f,v,S])=>{var x;m&&(f.status==="fulfilled"?o(f.value):o({ok:!1,path:e,content:"",bytes:0,lang:null,error:String(((x=f.reason)==null?void 0:x.message)??f.reason)}),v.status==="fulfilled"&&c(v.value),S.status==="fulfilled"&&h(S.value),s(!1))}),()=>{m=!1}},[t,e]),xe.useEffect(()=>{!a&&u.current&&u.current.scrollIntoView({behavior:"smooth",block:"center"})},[a,n]),a)return M.jsxs("div",{className:"source-container source-container--loading",children:[M.jsx("div",{className:"source-spinner"}),M.jsxs("p",{children:["Lade Dateiinhalt aus dem Brain (",e,") …"]})]});if(!r||!r.ok)return M.jsxs("div",{className:"source-container source-container--error",role:"alert",children:[M.jsxs("div",{className:"source-header",children:[M.jsx("span",{className:"source-header__path mono",children:e}),i&&M.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Schließen",children:"✕"})]}),M.jsxs("div",{className:"source-error-box",children:[M.jsx("div",{className:"source-error-icon",children:"⚠️"}),M.jsx("h3",{children:"Fehler beim Laden der Datei"}),M.jsx("p",{className:"source-error-msg",children:(r==null?void 0:r.error)||"Die Datei existiert nicht im Workspace oder der Pfad ist ungültig."}),M.jsxs("div",{className:"source-error-details mono",children:["Workspace: ",t,M.jsx("br",{}),"Pfad: ",e]})]})]});const p=r.content.split(/\r?\n/),g=p.length,b=l!=null&&l.head?l.head.slice(0,8):null;return M.jsxs("div",{className:"source-container",children:[M.jsxs("div",{className:"source-header",children:[M.jsxs("div",{className:"source-header__meta",children:[M.jsx("span",{className:"source-header__icon",children:"📄"}),M.jsx("span",{className:"source-header__path mono",title:r.path,children:r.path}),r.lang&&M.jsx("span",{className:"source-badge source-badge--lang",children:r.lang}),M.jsxs("span",{className:"source-badge source-badge--info",children:[g," Zeilen · ",r.bytes," B"]}),b&&M.jsxs("span",{className:"source-badge source-badge--git",title:`Git Revision: ${l==null?void 0:l.head}`,children:["git: ",b," (",(l==null?void 0:l.branch)??"detached",")"]}),(d==null?void 0:d.owner)&&M.jsxs("span",{className:"source-badge source-badge--agent",style:{borderColor:d.owner.color},title:`Zuletzt geändert durch ${d.owner.name} (${d.owner.at})`,children:[M.jsx("i",{style:{background:d.owner.color}}),d.owner.name]})]}),M.jsxs("div",{className:"source-header__actions",children:[n&&M.jsxs("span",{className:"source-badge source-badge--highlight",children:["Fokus: Zeile ",n]}),i&&M.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Quellansicht schließen",children:"✕"})]})]}),M.jsx("div",{className:"source-body",children:M.jsx("div",{className:"source-code-view",children:M.jsx("table",{className:"source-table",children:M.jsx("tbody",{children:p.map((m,f)=>{const v=f+1,S=n===v;return M.jsxs("tr",{ref:S?u:void 0,className:`source-line-row ${S?"source-line-row--highlight":""}`,children:[M.jsx("td",{className:"source-line-num mono","data-line":v,children:v}),M.jsx("td",{className:"source-line-code mono",children:M.jsx("pre",{children:m||" "})})]},v)})})})})})]})}function L3(t){const e={name:"",path:"",isDir:!0,children:new Map};for(const n of t){const i=n.path.split(/[\\/]/).filter(Boolean);let a=e;for(let s=0;s<i.length;s++){const r=i[s];if(s===i.length-1)a.children.set(r,{name:r,path:n.path,isDir:!1,children:new Map,file:n});else{let l=a.children.get(r);l||(l={name:r,path:i.slice(0,s+1).join("/"),isDir:!0,children:new Map},a.children.set(r,l)),a=l}}}return e}function O3({workspaceName:t,files:e,activePath:n,onSelectFile:i}){const[a,s]=xe.useState(""),[r,o]=xe.useState(new Set),l=xe.useMemo(()=>L3(e),[e]),c=h=>{o(u=>{const p=new Set(u);return p.has(h)?p.delete(h):p.add(h),p})},d=(h,u=0)=>{var g,b,m;if(h.isDir){const f=r.has(h.path),v=Array.from(h.children.values()).sort((x,N)=>x.isDir!==N.isDir?x.isDir?-1:1:x.name.localeCompare(N.name)),S=a?v.filter(x=>x.path.toLowerCase().includes(a.toLowerCase())):v;return a&&S.length===0&&!h.name.toLowerCase().includes(a.toLowerCase())?null:M.jsxs("div",{className:"tree-dir-group",children:[h.name&&M.jsxs("div",{className:`tree-item tree-item--dir ${u===0?"tree-item--root":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>c(h.path),children:[M.jsx("span",{className:"tree-icon",children:f?"📁":"📂"}),M.jsx("span",{className:"tree-label",children:h.name}),M.jsx("span",{className:"tree-badge tree-badge--count",children:h.children.size})]}),(!f||a)&&M.jsx("div",{className:"tree-dir-children",children:S.map(x=>d(x,h.name?u+1:u))})]},h.path||"root")}const p=n===h.path;return a&&!h.path.toLowerCase().includes(a.toLowerCase())?null:M.jsxs("div",{className:`tree-item tree-item--file ${p?"tree-item--active":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>i(h.path),title:h.path,children:[M.jsx("span",{className:"tree-icon",children:"📄"}),M.jsx("span",{className:"tree-label mono",children:h.name}),((g=h.file)==null?void 0:g.lang)&&M.jsx("span",{className:"tree-badge tree-badge--lang",children:h.file.lang}),((b=h.file)==null?void 0:b.loc)!==void 0&&M.jsxs("span",{className:"tree-badge tree-badge--loc",children:[h.file.loc," L"]}),((m=h.file)==null?void 0:m.agent)&&M.jsx("span",{className:"tree-agent-dot",style:{background:h.file.agent.color},title:`Owner: ${h.file.agent.name}`})]},h.path)};return M.jsxs("div",{className:"explorer-view",children:[M.jsxs("div",{className:"explorer-header",children:[M.jsxs("div",{className:"explorer-title",children:[M.jsx("span",{className:"explorer-title__icon",children:"🗂️"}),M.jsxs("strong",{children:[t||"Workspace"," Explorer"]})]}),M.jsx("div",{className:"explorer-stats",children:M.jsxs("span",{children:[e.length," Dateien aus Brain"]})})]}),M.jsxs("div",{className:"explorer-search",children:[M.jsx("input",{type:"text",placeholder:"Dateibaum filtern …",value:a,onChange:h=>s(h.target.value),className:"explorer-search__input"}),a&&M.jsx("button",{type:"button",className:"explorer-search__clear",onClick:()=>s(""),children:"✕"})]}),M.jsx("div",{className:"explorer-tree",children:e.length===0?M.jsx("div",{className:"explorer-empty",children:"Keine Dateien im Snapshot vorhanden."}):d(l)})]})}function P3({workspaceId:t,onSelectHit:e}){const[n,i]=xe.useState(()=>new URLSearchParams(window.location.search).get("q")||""),[a,s]=xe.useState([]),[r,o]=xe.useState(!1),[l,c]=xe.useState(""),[d,h]=xe.useState(""),u=async(p,g)=>{p&&p.preventDefault();const b=(g??n).trim();if(b){o(!0),c("");try{const m=await l3(t,b);s(m),h(b)}catch(m){c((m==null?void 0:m.message)||"Fehler bei der Suche über /api/agent/search"),s([])}finally{o(!1)}}};return xe.useEffect(()=>{const p=new URLSearchParams(window.location.search).get("q");p&&t&&u(void 0,p)},[t]),M.jsxs("div",{className:"search-view",children:[M.jsx("div",{className:"search-view__header",children:M.jsxs("div",{className:"search-view__title",children:[M.jsx("span",{className:"search-view__icon",children:"🔍"}),M.jsx("strong",{children:"Agent Code- & Symbolsuche"}),M.jsx("span",{className:"search-view__endpoint mono",children:"/api/agent/search"})]})}),M.jsx("form",{className:"search-form",onSubmit:u,children:M.jsxs("div",{className:"search-input-group",children:[M.jsx("input",{type:"search",className:"search-input",placeholder:"Symbol, Variable, Klasse, Datei (z. B. authKey) …",value:n,onChange:p=>i(p.target.value),autoFocus:!0}),M.jsx("button",{type:"submit",className:"search-submit-btn",disabled:r||!n.trim(),children:r?"Suche …":"Suchen"})]})}),l&&M.jsxs("div",{className:"search-error-alert",role:"alert",children:["⚠️ ",l]}),M.jsxs("div",{className:"search-results",children:[d&&M.jsx("div",{className:"search-results-summary",children:a.length===0?`Keine Treffer für "${d}" im Brain-Index`:`${a.length} Treffer für "${d}":`}),M.jsx("div",{className:"search-hits-list",children:a.map((p,g)=>M.jsxs("div",{className:"search-hit-card",onClick:()=>e(p.path,p.line),children:[M.jsxs("div",{className:"search-hit-card__head",children:[M.jsx("span",{className:"search-hit-name mono",children:p.name}),M.jsx("span",{className:`search-hit-kind search-hit-kind--${p.kind}`,children:p.kind}),p.line!==null&&M.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",p.line]})]}),M.jsxs("div",{className:"search-hit-path mono",title:p.path,children:["📄 ",p.path]})]},`${p.path}-${p.name}-${p.line??g}`))})]})]})}function z3(t){const e=[],n=t.split(`
`);for(const i of n){const a=i.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/);a&&e.push({path:a[1],reasons:a[2]})}return e}function I3({workspaceId:t,onSelectSource:e}){const[n,i]=xe.useState(()=>new URLSearchParams(window.location.search).get("goal")||"authKey security tests"),[a,s]=xe.useState(!1),[r,o]=xe.useState(""),[l,c]=xe.useState(null),[d,h]=xe.useState(null),[u,p]=xe.useState(!1),[g,b]=xe.useState(!1);xe.useEffect(()=>{const S=new URLSearchParams(window.location.search).get("goal");S&&t&&(s(!0),Xv(t,S).then(x=>{c(x),x.id&&f(x.id)}).catch(x=>o((x==null?void 0:x.message)||"Fehler beim Erzeugen")).finally(()=>s(!1)))},[t]);const m=async S=>{S&&S.preventDefault();const x=n.trim();if(x){s(!0),o(""),c(null),h(null);try{const N=await Xv(t,x);c(N),N.id&&f(N.id)}catch(N){o((N==null?void 0:N.message)||"Fehler beim Erzeugen des Context Packs")}finally{s(!1)}}},f=async S=>{p(!0);try{const x=await u3(S);h(x)}catch(x){console.error("Staleness check error:",x)}finally{p(!1)}},v=l!=null&&l.body?z3(l.body):[];return M.jsxs("div",{className:"pack-view",children:[M.jsx("div",{className:"pack-view__header",children:M.jsxs("div",{className:"pack-view__title",children:[M.jsx("span",{className:"pack-view__icon",children:"📦"}),M.jsx("strong",{children:"Context-Pack-Inspector"}),M.jsx("span",{className:"pack-view__endpoint mono",children:"/api/context/pack"})]})}),M.jsx("form",{className:"pack-form",onSubmit:m,children:M.jsxs("div",{className:"pack-form__field",children:[M.jsx("label",{htmlFor:"pack-goal-input",children:"Aufgabe / Ziel für den Agenten:"}),M.jsxs("div",{className:"pack-input-row",children:[M.jsx("input",{id:"pack-goal-input",type:"text",className:"pack-input",value:n,onChange:S=>i(S.target.value),placeholder:"z. B. authKey security tests"}),M.jsx("button",{type:"submit",className:"pack-create-btn",disabled:a||!n.trim(),children:a?"Erzeuge …":"Pack erzeugen"})]})]})}),r&&M.jsxs("div",{className:"pack-error-alert",role:"alert",children:["⚠️ ",r]}),l&&M.jsx("div",{className:"pack-details",children:M.jsxs("div",{className:"pack-card",children:[M.jsxs("div",{className:"pack-card__header",children:[M.jsxs("div",{className:"pack-card__meta",children:[M.jsx("span",{className:"pack-id mono",children:l.id}),M.jsxs("span",{className:"pack-badge pack-badge--version",children:["v",l.version]}),M.jsxs("span",{className:"pack-badge pack-badge--sources",children:[l.sources," Quellen"]})]}),M.jsxs("div",{className:"pack-card__staleness",children:[u?M.jsx("span",{className:"pack-staleness-badge pack-staleness-badge--loading",children:"Prüfe …"}):d?M.jsx("span",{className:`pack-staleness-badge ${d.stale?"pack-staleness-badge--stale":"pack-staleness-badge--fresh"}`,children:d.stale?"🔴 Veraltet":"🟢 Frisch"}):null,M.jsx("button",{type:"button",className:"pack-staleness-btn",onClick:()=>f(l.id),disabled:u,title:"Staleness gegen aktuellen Brain-Index prüfen",children:"Neu prüfen"})]})]}),d&&d.stale&&M.jsxs("div",{className:"pack-stale-warning",children:[M.jsx("strong",{children:"Quellen haben sich geändert:"}),d.changed.length>0&&M.jsxs("div",{children:["Geändert: ",d.changed.join(", ")]}),d.missing.length>0&&M.jsxs("div",{children:["Fehlt: ",d.missing.join(", ")]})]}),M.jsxs("div",{className:"pack-sources-section",children:[M.jsx("h4",{children:"Extrahierte Quellen aus dem Index:"}),v.length===0?M.jsx("div",{className:"pack-sources-empty",children:"Keine spezifischen Quelltreffer für dieses Ziel gefunden."}):M.jsx("div",{className:"pack-sources-list",children:v.map(S=>M.jsxs("div",{className:"pack-source-item",onClick:()=>e(S.path),title:`Klicken, um ${S.path} in Quellansicht zu öffnen`,children:[M.jsxs("div",{className:"pack-source-path mono",children:["📄 ",S.path]}),M.jsx("div",{className:"pack-source-why",children:S.reasons})]},S.path))})]}),M.jsx("div",{className:"pack-body-toggle",children:M.jsx("button",{type:"button",className:"pack-toggle-raw-btn",onClick:()=>b(S=>!S),children:g?"Markdown-Text verbergen":"Vollständigen Pack-Markdown anzeigen"})}),g&&M.jsx("div",{className:"pack-raw-markdown mono",children:M.jsx("pre",{children:l.body})})]})})]})}const VS=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"explorer",label:"Explorer",hint:"Echter Quellbaum aus dem Brain"},{id:"search",label:"Suche",hint:"Code- & Symbolsuche über /api/agent/search"},{id:"packs",label:"Packs",hint:"Context-Pack-Inspector"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Agenten und Zustände aus dem PlugBoard-Ledger"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],jd=zS,B3=2e4;function F3(){const t=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=t||e;return VS.some(i=>i.id===n)?n:"atlas"}function H3(){const t=new URLSearchParams(location.search).get("workspace");return t||t3()}function G3(){var Wt,Zt,ct;const[t,e]=xe.useState(null),[n,i]=xe.useState([]),[a,s]=xe.useState({depth:0,tasks:[]}),[r,o]=xe.useState(!0),[l,c]=xe.useState(""),[d,h]=xe.useState(0),[u,p]=xe.useState(F3),[g,b]=xe.useState(H3),[m,f]=xe.useState([]),[v,S]=xe.useState(!1),[x,N]=xe.useState(""),[w,C]=xe.useState(!1),[y,D]=xe.useState(""),[U,P]=xe.useState(""),[B,z]=xe.useState(null),[G,k]=xe.useState(null),[F,H]=xe.useState(!1),[I,j]=xe.useState([]),[de,Te]=xe.useState(()=>{const Z=new URLSearchParams(location.search).get("file"),O=Number(new URLSearchParams(location.search).get("line"));return Z?{path:Z,line:Number.isFinite(O)?O:null}:null}),[Oe,et]=xe.useState(!1),[$e,st]=xe.useState(FS()),[pe,Re]=xe.useState(Rf());xe.useEffect(()=>{try{localStorage.setItem("plugbrain.view",u)}catch{}},[u]);const ce=xe.useRef(null);xe.useEffect(()=>{ce.current=G},[G]);const ze=Z=>{b(Z),n3(Z);const O=new URL(location.href);Z?O.searchParams.set("workspace",Z):O.searchParams.delete("workspace"),history.replaceState(null,"",O.toString())};xe.useEffect(()=>{if(!g)return;let Z=!0;return fetch(`/api/graph?workspace=${encodeURIComponent(g)}&limit=5000`).then(O=>O.json()).then(O=>{if(!Z||!(O!=null&&O.nodes))return;const He=O.nodes.filter(Ue=>{var E;return Ue.type==="file"&&(Ue.path||((E=Ue.properties)==null?void 0:E.path))}).map(Ue=>{var E,_,W,Q;return{id:Ue.id,path:Ue.path||((E=Ue.properties)==null?void 0:E.path),label:Ue.label||Ue.path,lang:Ue.lang||((_=Ue.properties)==null?void 0:_.lang),loc:Ue.loc??((W=Ue.properties)==null?void 0:W.lines)??0,agent:Ue.agent||((Q=Ue.properties)!=null&&Q.agentId?{id:Ue.properties.agentId,name:Ue.properties.agentName,color:Ue.properties.agentColor}:null)}});j(He)}).catch(()=>{}),()=>{Z=!1}},[g,d]),xe.useEffect(()=>{let Z=!0;return kv().then(O=>{if(Z&&(f(O),!g&&O.length>0)){const He=[...O].sort((Ue,E)=>(E.indexedAt??"").localeCompare(Ue.indexedAt??""))[0];He&&ze(He.id)}}).catch(()=>{Z&&D("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{Z=!1}},[]);const We=async Z=>{Z.preventDefault();const O=x.trim();if(O!==""){C(!0),D(""),P("");try{const He=await i3(O);kv().then(Ue=>{Ue.length>0&&f(Ue)}).catch(()=>{}),P("Vault registriert und indiziert."),N(""),S(!1),ze(He)}catch(He){D(He instanceof Error?He.message:String(He))}finally{C(!1)}}},Ze=async()=>{if(!(!g||w)){C(!0),D(""),P("");try{const Z=await BS(g);P(`Neu indiziert: ${(Z==null?void 0:Z.files)??0} Dateien, ${(Z==null?void 0:Z.symbols)??0} Symbole, ${(Z==null?void 0:Z.edges)??0} Kanten.`)}catch(Z){D(Z instanceof Error?Z.message:String(Z))}finally{C(!1)}}},wt=Z=>{Z.preventDefault(),a3($e.trim()),s3(pe.trim()),et(!1)},tt=M.jsxs("form",{className:"brain-vault",onSubmit:We,children:[M.jsxs("div",{className:"brain-vault__row",children:[M.jsx("input",{className:"brain-vault__path",value:x,onChange:Z=>N(Z.target.value),placeholder:"Pfad eines Ordners, z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),M.jsx("button",{type:"submit",className:"brain-vault__open",disabled:w||x.trim()==="",children:w?"Indiziere …":"Als Vault öffnen"})]}),g&&M.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:M.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:w,onClick:()=>void Ze(),children:w?"…":"Neu indizieren"})}),y&&M.jsx("p",{className:"brain-vault__error",role:"alert",children:y}),U&&M.jsx("p",{className:"brain-vault__done",role:"status",children:U})]});xe.useEffect(()=>{const Z=g||void 0;fetch("/api/timeline"+(Z?"?workspace="+encodeURIComponent(Z):"")).then(O=>O.json()).then(O=>{var He;(He=O==null?void 0:O.bounds)!=null&&He.first&&z(O.bounds)}).catch(()=>{})},[g]),xe.useEffect(()=>{if(!F||!B)return;const Z=new Date(B.first).getTime(),O=new Date(B.last).getTime(),He=Math.max(1,O-Z);let Ue=G?Math.round((new Date(G).getTime()-Z)/He*60):0;const E=setInterval(()=>{if(Ue+=1,Ue>=60){k(null),H(!1);return}k(new Date(Z+He*Ue/60).toISOString())},220);return()=>clearInterval(E)},[F,B]),xe.useEffect(()=>{const Z=new AbortController;let O,He="",Ue="";const E=g||void 0;async function _(){var W,Q,ie;try{const me=new URLSearchParams;E&&me.set("workspace",E),me.set("limit",String(B3)),ce.current&&me.set("until",ce.current);const be=await fetch("/api/atlas/snapshot"+(me.toString()?`?${me}`:""),{signal:Z.signal});if(!be.ok)throw new Error(`Brain-Verbindung: HTTP ${be.status}`);const ae=await be.json();if(!((W=ae.workspace)!=null&&W.canonicalPath)||!Array.isArray((Q=ae.graph)==null?void 0:Q.nodes)||!Array.isArray((ie=ae.graph)==null?void 0:ie.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const K=JSON.stringify([ae.workspace,ae.graph,ae.coverage]);K!==He&&(e(ae),He=K),c("")}catch(me){Z.signal.aborted||c(me instanceof Error?me.message:String(me))}try{const me=await fetch("/api/agents"+(E?"?workspace="+encodeURIComponent(E):""),{signal:Z.signal});if(!me.ok)throw new Error(String(me.status));const be=await me.json(),K=(Array.isArray(be==null?void 0:be.agents)?be.agents:[]).map(ge=>({id:ge.id,title:ge.name,assignedAgentId:ge.name,status:ge.filesTouched>0?"RUNNING":ge.actions>0?"REVIEW":"PLANNED"})),ue=JSON.stringify(K);ue!==Ue&&(i(K),Ue=ue),o(!0)}catch{Z.signal.aborted||o(!1)}try{const me=await fetch("/api/queue"+(E?"?workspace="+encodeURIComponent(E):""),{signal:Z.signal});if(me.ok){const be=await me.json();(be==null?void 0:be.ok)===!0&&Array.isArray(be.tasks)&&s({depth:Number(be.depth??0),tasks:be.tasks})}}catch{}Z.signal.aborted||(O=setTimeout(_,3e3))}return _(),()=>{Z.abort(),clearTimeout(O)}},[d,G,g]);const Mt=(t==null?void 0:t.graph.nodes.length)??I.length,gt=(t==null?void 0:t.graph.edges.length)??0,ht=l?"getrennt (offline)":t||I.length>0?((Wt=t==null?void 0:t.coverage)==null?void 0:Wt.complete)??!0?"live":"Index unvollständig":"lädt …",Ot=xe.useMemo(()=>{var Z;return I.length>0?I:(Z=t==null?void 0:t.graph)!=null&&Z.nodes?t.graph.nodes.filter(O=>{var He;return O.type==="file"&&(((He=O.properties)==null?void 0:He.path)||O.path)}).map(O=>{var Ue,E,_,W;const He=((Ue=O.properties)==null?void 0:Ue.path)||O.path||"";return{id:O.id,path:He,label:O.label||O.name||He,lang:((E=O.properties)==null?void 0:E.lang)??O.lang??null,loc:((_=O.properties)==null?void 0:_.lines)??O.loc??0,agent:(W=O.properties)!=null&&W.agentId?{id:O.properties.agentId,name:O.properties.agentName||O.properties.agentId,color:O.properties.agentColor||"#60a5fa"}:null}}):[]},[I,t]),rt=(Z,O)=>{Z&&Te({path:Z,line:O})};return M.jsxs(M.Fragment,{children:[l&&M.jsx("div",{className:"brain-offline-banner",role:"alert",children:M.jsxs("div",{className:"brain-offline-banner__inner",children:[M.jsx("span",{className:"brain-offline-badge",children:"OFFLINE"}),M.jsxs("span",{className:"brain-offline-text",children:[M.jsx("strong",{children:"Server nicht erreichbar:"})," ",l," — läuft ",M.jsx("code",{children:"plugbrain serve"}),"?"]}),M.jsx("button",{type:"button",className:"brain-offline-btn",onClick:()=>h(Z=>Z+1),children:"Erneut verbinden"})]})}),M.jsxs("div",{className:"live-status",role:"status",children:[M.jsx("strong",{className:"live-status__name",title:(t==null?void 0:t.workspace.canonicalPath)??"",children:t?jd(t.workspace.name):((Zt=m.find(Z=>Z.id===g))==null?void 0:Zt.name)||"PlugBrain"}),g&&m.length>0&&M.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:M.jsx("select",{value:g,onChange:Z=>{const O=Z.target.value;O&&ze(O)},children:m.map(Z=>M.jsx("option",{value:Z.id,children:jd(Z.name)},Z.id))})}),g&&M.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{S(Z=>!Z),D(""),P("")},title:"Einen Ordner als neuen Vault öffnen",children:v?"Schließen":"Vault öffnen"}),M.jsxs("span",{className:"live-status__figures",children:[M.jsx("b",{children:Mt})," Objekte ",M.jsx("b",{children:gt})," Kanten"]}),M.jsx("span",{className:l?"live-status__state is-bad":"live-status__state",children:ht}),M.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:VS.map(Z=>M.jsx("button",{type:"button",title:Z.hint,className:Z.id===u?"on":void 0,"aria-pressed":Z.id===u,onClick:()=>{p(Z.id)},children:Z.label},Z.id))}),M.jsx("button",{type:"button",className:"brain-auth-btn",onClick:()=>et(!0),title:"Auth-Token konfigurieren",children:"🔑 Auth"}),l&&M.jsx("button",{type:"button",onClick:()=>h(Z=>Z+1),children:"Erneut verbinden"})]}),Oe&&M.jsx("div",{className:"brain-modal-backdrop",onClick:()=>et(!1),children:M.jsxs("div",{className:"brain-modal",onClick:Z=>Z.stopPropagation(),children:[M.jsxs("div",{className:"brain-modal__header",children:[M.jsx("h3",{children:"PlugBrain Authentifizierung"}),M.jsx("button",{type:"button",className:"brain-modal__close",onClick:()=>et(!1),children:"✕"})]}),M.jsxs("form",{onSubmit:wt,children:[M.jsxs("div",{className:"brain-modal__field",children:[M.jsxs("label",{children:["Bearer Token (aus ",M.jsx("code",{children:"auth.token"}),"):"]}),M.jsx("input",{type:"text",className:"brain-modal__input mono",value:$e,onChange:Z=>st(Z.target.value),placeholder:"plug-..."})]}),M.jsxs("div",{className:"brain-modal__field",children:[M.jsx("label",{children:"Agent ID:"}),M.jsx("input",{type:"text",className:"brain-modal__input mono",value:pe,onChange:Z=>Re(Z.target.value),placeholder:"agy"})]}),M.jsxs("div",{className:"brain-modal__actions",children:[M.jsx("button",{type:"button",onClick:()=>et(!1),children:"Abbrechen"}),M.jsx("button",{type:"submit",className:"primary",children:"Speichern"})]})]})]})}),B&&(u==="atlas"||u==="city"||u==="mesh")&&M.jsxs("div",{className:"brain-timelapse",children:[M.jsx("button",{type:"button",onClick:()=>H(Z=>!Z),title:"Wachstum abspielen",children:F?"❚❚":"▶"}),M.jsx("input",{type:"range",min:0,max:60,step:1,value:G&&B?Math.round((new Date(G).getTime()-new Date(B.first).getTime())/Math.max(1,new Date(B.last).getTime()-new Date(B.first).getTime())*60):60,onChange:Z=>{H(!1);const O=Number(Z.target.value);if(O>=60){k(null);return}const He=new Date(B.first).getTime(),Ue=new Date(B.last).getTime();k(new Date(He+(Ue-He)*O/60).toISOString())}}),M.jsx("span",{children:G?new Date(G).toLocaleTimeString():"jetzt"})]}),v&&g&&tt,g?M.jsxs("div",{className:"brain-workspace-layout",children:[u==="atlas"&&(t&&Mt>0?M.jsxs("div",{className:"atlas-wrapper",children:[M.jsx(k3,{graph:t.graph,onOpenSource:rt}),de&&M.jsx("div",{className:"atlas-source-overlay",children:M.jsx(Yc,{workspaceId:g,path:de.path,highlightLine:de.line,onClose:()=>Te(null)})})]}):M.jsx("div",{className:"brain-empty",children:l?M.jsxs("div",{className:"brain-empty--offline-box",children:[M.jsx("div",{className:"offline-icon",children:"🔌"}),M.jsx("h3",{children:"Server getrennt (Offline-Zustand)"}),M.jsx("p",{children:"Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt."}),M.jsx("button",{type:"button",className:"btn primary",onClick:()=>h(Z=>Z+1),children:"Erneut verbinden"})]}):t?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …"})),u==="explorer"&&M.jsxs("div",{className:"workbench-split",children:[M.jsx("div",{className:"workbench-pane workbench-pane--side",children:M.jsx(O3,{workspaceName:(t==null?void 0:t.workspace.name)??(((ct=m.find(Z=>Z.id===g))==null?void 0:ct.name)||"Workspace"),files:Ot,activePath:de==null?void 0:de.path,onSelectFile:Z=>rt(Z)})}),M.jsx("div",{className:"workbench-pane workbench-pane--main",children:de?M.jsx(Yc,{workspaceId:g,path:de.path,highlightLine:de.line,onClose:()=>Te(null)}):M.jsxs("div",{className:"source-placeholder",children:[M.jsx("div",{className:"source-placeholder__icon",children:"📂"}),M.jsx("h3",{children:"Datei im Explorer auswählen"}),M.jsx("p",{children:"Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen."})]})})]}),u==="search"&&M.jsxs("div",{className:"workbench-split",children:[M.jsx("div",{className:"workbench-pane workbench-pane--side",children:M.jsx(P3,{workspaceId:g,onSelectHit:(Z,O)=>rt(Z,O)})}),M.jsx("div",{className:"workbench-pane workbench-pane--main",children:de?M.jsx(Yc,{workspaceId:g,path:de.path,highlightLine:de.line,onClose:()=>Te(null)}):M.jsxs("div",{className:"source-placeholder",children:[M.jsx("div",{className:"source-placeholder__icon",children:"🔍"}),M.jsxs("h3",{children:["Code- und Symbolsuche über ",M.jsx("code",{children:"/api/agent/search"})]}),M.jsxs("p",{children:["Gib einen Suchbegriff ein (z. B. ",M.jsx("code",{children:"authKey"}),"). Ein Klick auf einen Treffer öffnet direkt die Quelle."]})]})})]}),u==="packs"&&M.jsxs("div",{className:"workbench-split",children:[M.jsx("div",{className:"workbench-pane workbench-pane--side",children:M.jsx(I3,{workspaceId:g,onSelectSource:Z=>rt(Z)})}),M.jsx("div",{className:"workbench-pane workbench-pane--main",children:de?M.jsx(Yc,{workspaceId:g,path:de.path,highlightLine:de.line,onClose:()=>Te(null)}):M.jsxs("div",{className:"source-placeholder",children:[M.jsx("div",{className:"source-placeholder__icon",children:"📦"}),M.jsx("h3",{children:"Context-Pack-Inspector"}),M.jsx("p",{children:"Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen."})]})})]}),u==="city"&&M.jsx("div",{className:"brain-view brain-view-city",children:M.jsx(E3,{snapshot:t})}),u==="queue"&&M.jsx("div",{className:"brain-view brain-view-queue",children:M.jsx(N3,{tasks:a.tasks,depth:a.depth})}),u==="mesh"&&M.jsxs("div",{className:"brain-view brain-view-mesh",children:[!r&&M.jsx("div",{className:"brain-note",children:"Agenten-Register nicht erreichbar — es werden keine echten Agenten angezeigt."}),r&&n.length===0&&M.jsx("div",{className:"brain-note",children:"Noch kein Agent hat diesen Workspace angefasst. Die Engine läuft in Eigensimulation — das sind keine echten Agenten."}),M.jsx(D3,{tasks:n})]})]}):M.jsxs("div",{className:"brain-landing",role:"main",children:[M.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),M.jsx("p",{className:"brain-landing__lead",children:"Ein Ordner als Vault öffnen — der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."}),tt,m.length>0&&M.jsxs("div",{className:"brain-vault__known",children:[M.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),m.map(Z=>M.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>ze(Z.id),children:[jd(Z.name)," ",M.jsx("em",{title:Z.root,children:Z.indexedAt?"indiziert":"nicht indiziert"})]},Z.id))]})]})]})}function V3(t,e){if(!e)return t;const n=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return t.split(n).map((i,a)=>a%2?M.jsx("mark",{children:i},a):i)}function k3({graph:t,onOpenSource:e}){const{CLUSTERS:n,nodes:i,edges:a,createAtlas:s}=xe.useMemo(()=>e3(t),[t]),r=Object.fromEntries(n.map(I=>[I.id,i.filter(j=>j.cid===I.id).length])),o=xe.useRef(null),l=xe.useRef(null),c=xe.useRef(null),d=xe.useRef(null),h=xe.useRef(null),u=xe.useRef(null),p=xe.useRef(null),g=xe.useRef(null),b=xe.useRef(null),m=xe.useRef(null),f=xe.useRef(null),v=xe.useRef(null),S=xe.useRef(null),[x,N]=xe.useState(!1),[w,C]=xe.useState({q:"",rows:[]}),[y,D]=xe.useState({flow:!0,label:!0,spin:!1}),[U,P]=xe.useState("atlas"),[B,z]=xe.useState("dark"),[G,k]=xe.useState([]),F=I=>{I!=null&&I.path&&e(I.path,I.line??null)};xe.useEffect(()=>{const I=s({els:{stage:o.current,labels:l.current,hudMode:c.current,hudSel:d.current,pathbar:h.current,chain:u.current,zlvl:p.current,sNode:g.current,sEdge:b.current,sDeg:m.current,sFps:f.current,q:v.current},emit:{gate:N,list:C,drawer:F,tools:D,theme:z}});return S.current=I,()=>{I.dispose(),S.current=null}},[s]);const H=I=>{var j;k(de=>de.includes(I)?de.filter(Te=>Te!==I):[...de,I]),(j=S.current)==null||j.toggleCluster(I)};return M.jsxs("div",{id:"app",children:[M.jsxs("aside",{children:[M.jsxs("div",{className:"brand",children:[M.jsxs("h1",{children:[M.jsx("span",{className:"dot"}),"PlugBrain"]}),M.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",M.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),M.jsxs("div",{className:"searchbox",children:[M.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[M.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),M.jsx("path",{d:"M10.5 10.5 14 14"})]}),M.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol im Graph suchen…",autoComplete:"off",spellCheck:!1,ref:v,onChange:I=>{var j;return(j=S.current)==null?void 0:j.setQuery(I.target.value)}})]}),M.jsx("div",{className:"legend",id:"legend",children:n.map(I=>M.jsxs("button",{className:"cl"+(G.includes(I.id)?" off":""),type:"button",onClick:()=>H(I.id),children:[M.jsx("i",{style:{background:I.color}}),I.name,M.jsx("b",{children:r[I.id]})]},I.id))}),M.jsx("div",{className:"listwrap",id:"list",children:w.rows.length?w.rows.map(I=>M.jsxs("div",{className:"lrow"+(I.on?" on":""),"data-i":I.i,onClick:()=>{var de,Te;(de=S.current)==null||de.selectAt(I.i);const j=i[I.i];(Te=j==null?void 0:j.meta)!=null&&Te.path&&e(j.meta.path,j.meta.line)},onMouseOver:()=>{var j;return(j=S.current)==null?void 0:j.hoverAt(I.i)},onMouseLeave:()=>{var j;return(j=S.current)==null?void 0:j.hoverAt(null)},children:[M.jsx("i",{style:{background:I.color}}),M.jsx("span",{children:V3(I.name,w.q)}),M.jsx("b",{children:I.deg})]},I.i)):M.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),M.jsxs("div",{className:"foot",children:[M.jsxs("div",{children:[M.jsx("div",{className:"k",id:"s-node",ref:g,children:"—"}),M.jsx("div",{className:"l",children:"Objekte"})]}),M.jsxs("div",{children:[M.jsx("div",{className:"k",id:"s-edge",ref:b,children:"—"}),M.jsx("div",{className:"l",children:"Kanten"})]}),M.jsxs("div",{children:[M.jsx("div",{className:"k",id:"s-deg",ref:m,children:"—"}),M.jsx("div",{className:"l",children:"Ø-Grad"})]}),M.jsxs("div",{children:[M.jsx("div",{className:"k",id:"s-fps",ref:f,children:"—"}),M.jsx("div",{className:"l",children:"FPS"})]})]})]}),M.jsxs("div",{id:"stage",ref:o,children:[M.jsx("div",{id:"labels",ref:l}),M.jsxs("div",{id:"hud",children:[M.jsx("div",{children:M.jsx("b",{id:"hud-mode",ref:c,children:"GALAXIE · FREIER ORBIT"})}),M.jsx("div",{id:"hud-sel",ref:d,children:"Knoten anklicken, um Quelle direkt zu öffnen"}),M.jsxs("div",{id:"hud-sys",children:[i.length," VON ",t.nodes.length," OBJEKTEN · ",a.length," VON ",t.edges.length," KANTEN"]})]}),M.jsxs("div",{id:"pathbar",ref:h,children:[M.jsx("span",{className:"chain",id:"chain",ref:u}),M.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.clearPath()},children:"✕"})]}),M.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([I,j])=>M.jsx("button",{className:"tb"+(U===I?" on":""),"data-view":I,type:"button",onClick:()=>{var de;P(I),(de=S.current)==null||de.setView(I)},children:j},I)),M.jsx("span",{className:"sep"}),M.jsx("button",{className:"tb"+(y.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleFlow()},children:"Signalfluss"}),M.jsx("button",{className:"tb"+(y.label?" on":""),id:"t-label",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleLabel()},children:"Labels"}),M.jsx("button",{className:"tb"+(y.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleSpin()},children:"Auto-Orbit"}),M.jsx("span",{className:"sep"}),M.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var I;return(I=S.current)==null?void 0:I.dolly(1.18)},children:"−"}),M.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:p,onClick:()=>{var I;return(I=S.current)==null?void 0:I.zoomReset()},children:"100%"}),M.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var I;return(I=S.current)==null?void 0:I.dolly(1/1.18)},children:"＋"}),M.jsx("span",{className:"sep"}),M.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleTheme()},children:B==="light"?"Nacht":"Tag"}),M.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.reset()},children:"Reset"})]}),M.jsx("div",{id:"hint",children:"Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt"}),M.jsxs("div",{id:"gate",style:x?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",M.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]})]})}FE.createRoot(document.getElementById("root")).render(M.jsx(xe.StrictMode,{children:M.jsx(G3,{})}));

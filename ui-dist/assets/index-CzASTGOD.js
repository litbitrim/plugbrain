(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var a_={exports:{}},af={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nM=Symbol.for("react.transitional.element"),iM=Symbol.for("react.fragment");function s_(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:nM,type:t,key:i,ref:e!==void 0?e:null,props:n}}af.Fragment=iM;af.jsx=s_;af.jsxs=s_;a_.exports=af;var f=a_.exports,r_={exports:{}},$e={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gp=Symbol.for("react.transitional.element"),aM=Symbol.for("react.portal"),sM=Symbol.for("react.fragment"),rM=Symbol.for("react.strict_mode"),oM=Symbol.for("react.profiler"),lM=Symbol.for("react.consumer"),cM=Symbol.for("react.context"),uM=Symbol.for("react.forward_ref"),fM=Symbol.for("react.suspense"),dM=Symbol.for("react.memo"),o_=Symbol.for("react.lazy"),hM=Symbol.for("react.activity"),dg=Symbol.iterator;function pM(t){return t===null||typeof t!="object"?null:(t=dg&&t[dg]||t["@@iterator"],typeof t=="function"?t:null)}var l_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},c_=Object.assign,u_={};function So(t,e,n){this.props=t,this.context=e,this.refs=u_,this.updater=n||l_}So.prototype.isReactComponent={};So.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};So.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function f_(){}f_.prototype=So.prototype;function kp(t,e,n){this.props=t,this.context=e,this.refs=u_,this.updater=n||l_}var Vp=kp.prototype=new f_;Vp.constructor=kp;c_(Vp,So.prototype);Vp.isPureReactComponent=!0;var hg=Array.isArray;function Zd(){}var Xt={H:null,A:null,T:null,S:null},d_=Object.prototype.hasOwnProperty;function jp(t,e,n){var i=n.ref;return{$$typeof:Gp,type:t,key:e,ref:i!==void 0?i:null,props:n}}function mM(t,e){return jp(t.type,e,t.props)}function Xp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Gp}function gM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var pg=/\/+/g;function Cf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?gM(""+t.key):e.toString(36)}function vM(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Zd,Zd):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Nr(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Gp:case aM:r=!0;break;case o_:return r=t._init,Nr(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+Cf(t,0):i,hg(a)?(n="",r!=null&&(n=r.replace(pg,"$&/")+"/"),Nr(a,e,n,"",function(c){return c})):a!=null&&(Xp(a)&&(a=mM(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(pg,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(hg(t))for(var l=0;l<t.length;l++)i=t[l],s=o+Cf(i,l),r+=Nr(i,e,n,s,a);else if(l=pM(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+Cf(i,l++),r+=Nr(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return Nr(vM(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function ec(t,e,n){if(t==null)return t;var i=[],a=0;return Nr(t,i,"","",function(s){return e.call(n,s,a++)}),i}function _M(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var mg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},xM={map:ec,forEach:function(t,e,n){ec(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ec(t,function(){e++}),e},toArray:function(t){return ec(t,function(e){return e})||[]},only:function(t){if(!Xp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};$e.Activity=hM;$e.Children=xM;$e.Component=So;$e.Fragment=sM;$e.Profiler=oM;$e.PureComponent=kp;$e.StrictMode=rM;$e.Suspense=fM;$e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Xt;$e.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Xt.H.useMemoCache(t)}};$e.cache=function(t){return function(){return t.apply(null,arguments)}};$e.cacheSignal=function(){return null};$e.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=c_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!d_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return jp(t.type,a,i)};$e.createContext=function(t){return t={$$typeof:cM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:lM,_context:t},t};$e.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)d_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return jp(t,s,a)};$e.createRef=function(){return{current:null}};$e.forwardRef=function(t){return{$$typeof:uM,render:t}};$e.isValidElement=Xp;$e.lazy=function(t){return{$$typeof:o_,_payload:{_status:-1,_result:t},_init:_M}};$e.memo=function(t,e){return{$$typeof:dM,type:t,compare:e===void 0?null:e}};$e.startTransition=function(t){var e=Xt.T,n={};Xt.T=n;try{var i=t(),a=Xt.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Zd,mg)}catch(s){mg(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),Xt.T=e}};$e.unstable_useCacheRefresh=function(){return Xt.H.useCacheRefresh()};$e.use=function(t){return Xt.H.use(t)};$e.useActionState=function(t,e,n){return Xt.H.useActionState(t,e,n)};$e.useCallback=function(t,e){return Xt.H.useCallback(t,e)};$e.useContext=function(t){return Xt.H.useContext(t)};$e.useDebugValue=function(){};$e.useDeferredValue=function(t,e){return Xt.H.useDeferredValue(t,e)};$e.useEffect=function(t,e){return Xt.H.useEffect(t,e)};$e.useEffectEvent=function(t){return Xt.H.useEffectEvent(t)};$e.useId=function(){return Xt.H.useId()};$e.useImperativeHandle=function(t,e,n){return Xt.H.useImperativeHandle(t,e,n)};$e.useInsertionEffect=function(t,e){return Xt.H.useInsertionEffect(t,e)};$e.useLayoutEffect=function(t,e){return Xt.H.useLayoutEffect(t,e)};$e.useMemo=function(t,e){return Xt.H.useMemo(t,e)};$e.useOptimistic=function(t,e){return Xt.H.useOptimistic(t,e)};$e.useReducer=function(t,e,n){return Xt.H.useReducer(t,e,n)};$e.useRef=function(t){return Xt.H.useRef(t)};$e.useState=function(t){return Xt.H.useState(t)};$e.useSyncExternalStore=function(t,e,n){return Xt.H.useSyncExternalStore(t,e,n)};$e.useTransition=function(){return Xt.H.useTransition()};$e.version="19.2.8";r_.exports=$e;var J=r_.exports,h_={exports:{}},sf={},p_={exports:{}},m_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(B,I){var L=B.length;B.push(I);e:for(;0<L;){var V=L-1>>>1,re=B[V];if(0<a(re,I))B[V]=I,B[L]=re,L=V;else break e}}function n(B){return B.length===0?null:B[0]}function i(B){if(B.length===0)return null;var I=B[0],L=B.pop();if(L!==I){B[0]=L;e:for(var V=0,re=B.length,ce=re>>>1;V<ce;){var _e=2*(V+1)-1,ke=B[_e],Je=_e+1,He=B[Je];if(0>a(ke,L))Je<re&&0>a(He,ke)?(B[V]=He,B[Je]=L,V=Je):(B[V]=ke,B[_e]=L,V=_e);else if(Je<re&&0>a(He,L))B[V]=He,B[Je]=L,V=Je;else break e}}return I}function a(B,I){var L=B.sortIndex-I.sortIndex;return L!==0?L:B.id-I.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],d=1,p=null,u=3,m=!1,g=!1,b=!1,_=!1,h=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,S=typeof setImmediate<"u"?setImmediate:null;function x(B){for(var I=n(c);I!==null;){if(I.callback===null)i(c);else if(I.startTime<=B)i(c),I.sortIndex=I.expirationTime,e(l,I);else break;I=n(c)}}function A(B){if(b=!1,x(B),!g)if(n(l)!==null)g=!0,R||(R=!0,O());else{var I=n(c);I!==null&&z(A,I.startTime-B)}}var R=!1,T=-1,M=5,C=-1;function w(){return _?!0:!(t.unstable_now()-C<M)}function U(){if(_=!1,R){var B=t.unstable_now();C=B;var I=!0;try{e:{g=!1,b&&(b=!1,v(T),T=-1),m=!0;var L=u;try{t:{for(x(B),p=n(l);p!==null&&!(p.expirationTime>B&&w());){var V=p.callback;if(typeof V=="function"){p.callback=null,u=p.priorityLevel;var re=V(p.expirationTime<=B);if(B=t.unstable_now(),typeof re=="function"){p.callback=re,x(B),I=!0;break t}p===n(l)&&i(l),x(B)}else i(l);p=n(l)}if(p!==null)I=!0;else{var ce=n(c);ce!==null&&z(A,ce.startTime-B),I=!1}}break e}finally{p=null,u=L,m=!1}I=void 0}}finally{I?O():R=!1}}}var O;if(typeof S=="function")O=function(){S(U)};else if(typeof MessageChannel<"u"){var k=new MessageChannel,P=k.port2;k.port1.onmessage=U,O=function(){P.postMessage(null)}}else O=function(){h(U,0)};function z(B,I){T=h(function(){B(t.unstable_now())},I)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(B){B.callback=null},t.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<B?Math.floor(1e3/B):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(B){switch(u){case 1:case 2:case 3:var I=3;break;default:I=u}var L=u;u=I;try{return B()}finally{u=L}},t.unstable_requestPaint=function(){_=!0},t.unstable_runWithPriority=function(B,I){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var L=u;u=B;try{return I()}finally{u=L}},t.unstable_scheduleCallback=function(B,I,L){var V=t.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?V+L:V):L=V,B){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=L+re,B={id:d++,callback:I,priorityLevel:B,startTime:L,expirationTime:re,sortIndex:-1},L>V?(B.sortIndex=L,e(c,B),n(l)===null&&B===n(c)&&(b?(v(T),T=-1):b=!0,z(A,L-V))):(B.sortIndex=re,e(l,B),g||m||(g=!0,R||(R=!0,O()))),B},t.unstable_shouldYield=w,t.unstable_wrapCallback=function(B){var I=u;return function(){var L=u;u=I;try{return B.apply(this,arguments)}finally{u=L}}}})(m_);p_.exports=m_;var SM=p_.exports,g_={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var yM=J;function v_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function ka(){}var zn={d:{f:ka,r:function(){throw Error(v_(522))},D:ka,C:ka,L:ka,m:ka,X:ka,S:ka,M:ka},p:0,findDOMNode:null},MM=Symbol.for("react.portal");function bM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:MM,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var sl=yM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function rf(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=zn;Fn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(v_(299));return bM(t,e,null,n)};Fn.flushSync=function(t){var e=sl.T,n=zn.p;try{if(sl.T=null,zn.p=2,t)return t()}finally{sl.T=e,zn.p=n,zn.d.f()}};Fn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,zn.d.C(t,e))};Fn.prefetchDNS=function(t){typeof t=="string"&&zn.d.D(t)};Fn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=rf(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?zn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&zn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Fn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=rf(e.as,e.crossOrigin);zn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&zn.d.M(t)};Fn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=rf(n,e.crossOrigin);zn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Fn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=rf(e.as,e.crossOrigin);zn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else zn.d.m(t)};Fn.requestFormReset=function(t){zn.d.r(t)};Fn.unstable_batchedUpdates=function(t,e){return t(e)};Fn.useFormState=function(t,e,n){return sl.H.useFormState(t,e,n)};Fn.useFormStatus=function(){return sl.H.useHostTransitionStatus()};Fn.version="19.2.8";function __(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(__)}catch(t){console.error(t)}}__(),g_.exports=Fn;var EM=g_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var un=SM,x_=J,TM=EM;function ue(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function S_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Bl(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function M_(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function gg(t){if(Bl(t)!==t)throw Error(ue(188))}function AM(t){var e=t.alternate;if(!e){if(e=Bl(t),e===null)throw Error(ue(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return gg(a),t;if(s===i)return gg(a),e;s=s.sibling}throw Error(ue(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(ue(189))}}if(n.alternate!==i)throw Error(ue(190))}if(n.tag!==3)throw Error(ue(188));return n.stateNode.current===n?t:e}function b_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=b_(t),e!==null)return e;t=t.sibling}return null}var Wt=Object.assign,wM=Symbol.for("react.element"),tc=Symbol.for("react.transitional.element"),Qo=Symbol.for("react.portal"),Lr=Symbol.for("react.fragment"),E_=Symbol.for("react.strict_mode"),Kd=Symbol.for("react.profiler"),T_=Symbol.for("react.consumer"),Ea=Symbol.for("react.context"),Wp=Symbol.for("react.forward_ref"),Qd=Symbol.for("react.suspense"),$d=Symbol.for("react.suspense_list"),qp=Symbol.for("react.memo"),Za=Symbol.for("react.lazy"),Jd=Symbol.for("react.activity"),CM=Symbol.for("react.memo_cache_sentinel"),vg=Symbol.iterator;function Oo(t){return t===null||typeof t!="object"?null:(t=vg&&t[vg]||t["@@iterator"],typeof t=="function"?t:null)}var RM=Symbol.for("react.client.reference");function eh(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===RM?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Lr:return"Fragment";case Kd:return"Profiler";case E_:return"StrictMode";case Qd:return"Suspense";case $d:return"SuspenseList";case Jd:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Qo:return"Portal";case Ea:return t.displayName||"Context";case T_:return(t._context.displayName||"Context")+".Consumer";case Wp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case qp:return e=t.displayName||null,e!==null?e:eh(t.type)||"Memo";case Za:e=t._payload,t=t._init;try{return eh(t(e))}catch{}}return null}var $o=Array.isArray,Ve=x_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,yt=TM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Gs={pending:!1,data:null,method:null,action:null},th=[],Or=-1;function aa(t){return{current:t}}function xn(t){0>Or||(t.current=th[Or],th[Or]=null,Or--)}function Ft(t,e){Or++,th[Or]=t.current,t.current=e}var ea=aa(null),Sl=aa(null),cs=aa(null),xu=aa(null);function Su(t,e){switch(Ft(cs,e),Ft(Sl,t),Ft(ea,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?b0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=b0(e),t=XS(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}xn(ea),Ft(ea,t)}function io(){xn(ea),xn(Sl),xn(cs)}function nh(t){t.memoizedState!==null&&Ft(xu,t);var e=ea.current,n=XS(e,t.type);e!==n&&(Ft(Sl,t),Ft(ea,n))}function yu(t){Sl.current===t&&(xn(ea),xn(Sl)),xu.current===t&&(xn(xu),Dl._currentValue=Gs)}var Rf,_g;function Us(t){if(Rf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Rf=e&&e[1]||"",_g=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Rf+t+_g}var Nf=!1;function Df(t,e){if(!t||Nf)return"";Nf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var p=function(){throw Error()};if(Object.defineProperty(p.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(p,[])}catch(m){var u=m}Reflect.construct(t,[],p)}else{try{p.call()}catch(m){u=m}t.call(p.prototype)}}else{try{throw Error()}catch(m){u=m}(p=t())&&typeof p.catch=="function"&&p.catch(function(){})}}catch(m){if(m&&u&&typeof m.stack=="string")return[m.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=i&&0<=a);break}}}finally{Nf=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Us(n):""}function NM(t,e){switch(t.tag){case 26:case 27:case 5:return Us(t.type);case 16:return Us("Lazy");case 13:return t.child!==e&&e!==null?Us("Suspense Fallback"):Us("Suspense");case 19:return Us("SuspenseList");case 0:case 15:return Df(t.type,!1);case 11:return Df(t.type.render,!1);case 1:return Df(t.type,!0);case 31:return Us("Activity");default:return""}}function xg(t){try{var e="",n=null;do e+=NM(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var ih=Object.prototype.hasOwnProperty,Yp=un.unstable_scheduleCallback,Uf=un.unstable_cancelCallback,DM=un.unstable_shouldYield,UM=un.unstable_requestPaint,ii=un.unstable_now,LM=un.unstable_getCurrentPriorityLevel,A_=un.unstable_ImmediatePriority,w_=un.unstable_UserBlockingPriority,Mu=un.unstable_NormalPriority,OM=un.unstable_LowPriority,C_=un.unstable_IdlePriority,PM=un.log,zM=un.unstable_setDisableYieldValue,Fl=null,ai=null;function ns(t){if(typeof PM=="function"&&zM(t),ai&&typeof ai.setStrictMode=="function")try{ai.setStrictMode(Fl,t)}catch{}}var si=Math.clz32?Math.clz32:FM,IM=Math.log,BM=Math.LN2;function FM(t){return t>>>=0,t===0?32:31-(IM(t)/BM|0)|0}var nc=256,ic=262144,ac=4194304;function Ls(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function of(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Ls(i):(r&=o,r!==0?a=Ls(r):n||(n=o&~t,n!==0&&(a=Ls(n))))):(o=i&~s,o!==0?a=Ls(o):r!==0?a=Ls(r):n||(n=i&~t,n!==0&&(a=Ls(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function Hl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function HM(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function R_(){var t=ac;return ac<<=1,!(ac&62914560)&&(ac=4194304),t}function Lf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Gl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function GM(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-si(n),p=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var m=u[d];m!==null&&(m.lane&=-536870913)}n&=~p}i!==0&&N_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function N_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-si(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function D_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-si(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function U_(t,e){var n=e&-e;return n=n&42?1:Zp(n),n&(t.suspendedLanes|e)?0:n}function Zp(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Kp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function L_(){var t=yt.p;return t!==0?t:(t=window.event,t===void 0?32:ny(t.type))}function Sg(t,e){var n=yt.p;try{return yt.p=t,e()}finally{yt.p=n}}var bs=Math.random().toString(36).slice(2),yn="__reactFiber$"+bs,Zn="__reactProps$"+bs,yo="__reactContainer$"+bs,ah="__reactEvents$"+bs,kM="__reactListeners$"+bs,VM="__reactHandles$"+bs,yg="__reactResources$"+bs,kl="__reactMarker$"+bs;function Qp(t){delete t[yn],delete t[Zn],delete t[ah],delete t[kM],delete t[VM]}function Pr(t){var e=t[yn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[yo]||n[yn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=C0(t);t!==null;){if(n=t[yn])return n;t=C0(t)}return e}t=n,n=t.parentNode}return null}function Mo(t){if(t=t[yn]||t[yo]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Jo(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(ue(33))}function Yr(t){var e=t[yg];return e||(e=t[yg]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function vn(t){t[kl]=!0}var O_=new Set,P_={};function nr(t,e){ao(t,e),ao(t+"Capture",e)}function ao(t,e){for(P_[t]=e,t=0;t<e.length;t++)O_.add(e[t])}var jM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Mg={},bg={};function XM(t){return ih.call(bg,t)?!0:ih.call(Mg,t)?!1:jM.test(t)?bg[t]=!0:(Mg[t]=!0,!1)}function Yc(t,e,n){if(XM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function sc(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function ua(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function _i(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function z_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function WM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function sh(t){if(!t._valueTracker){var e=z_(t)?"checked":"value";t._valueTracker=WM(t,e,""+t[e])}}function I_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=z_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function bu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var qM=/[\n"\\]/g;function Mi(t){return t.replace(qM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function rh(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+_i(e)):t.value!==""+_i(e)&&(t.value=""+_i(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?oh(t,r,_i(e)):n!=null?oh(t,r,_i(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+_i(o):t.removeAttribute("name")}function B_(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){sh(t);return}n=n!=null?""+_i(n):"",e=e!=null?""+_i(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),sh(t)}function oh(t,e,n){e==="number"&&bu(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Zr(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+_i(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function F_(t,e,n){if(e!=null&&(e=""+_i(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+_i(n):""}function H_(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(ue(92));if($o(i)){if(1<i.length)throw Error(ue(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=_i(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),sh(t)}function so(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var YM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Eg(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||YM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function G_(t,e,n){if(e!=null&&typeof e!="object")throw Error(ue(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&Eg(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&Eg(t,s,e[s])}function $p(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ZM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),KM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zc(t){return KM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ta(){}var lh=null;function Jp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var zr=null,Kr=null;function Tg(t){var e=Mo(t);if(e&&(t=e.stateNode)){var n=t[Zn]||null;e:switch(t=e.stateNode,e.type){case"input":if(rh(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Mi(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[Zn]||null;if(!a)throw Error(ue(90));rh(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&I_(i)}break e;case"textarea":F_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&Zr(t,!!n.multiple,e,!1)}}}var Of=!1;function k_(t,e,n){if(Of)return t(e,n);Of=!0;try{var i=t(e);return i}finally{if(Of=!1,(zr!==null||Kr!==null)&&(xf(),zr&&(e=zr,t=Kr,Kr=zr=null,Tg(e),t)))for(e=0;e<t.length;e++)Tg(t[e])}}function yl(t,e){var n=t.stateNode;if(n===null)return null;var i=n[Zn]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ue(231,e,typeof n));return n}var La=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ch=!1;if(La)try{var Po={};Object.defineProperty(Po,"passive",{get:function(){ch=!0}}),window.addEventListener("test",Po,Po),window.removeEventListener("test",Po,Po)}catch{ch=!1}var is=null,em=null,Kc=null;function V_(){if(Kc)return Kc;var t,e=em,n=e.length,i,a="value"in is?is.value:is.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Kc=a.slice(t,1<i?1-i:void 0)}function Qc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function rc(){return!0}function Ag(){return!1}function Kn(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?rc:Ag,this.isPropagationStopped=Ag,this}return Wt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=rc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=rc)},persist:function(){},isPersistent:rc}),e}var ir={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},lf=Kn(ir),Vl=Wt({},ir,{view:0,detail:0}),QM=Kn(Vl),Pf,zf,zo,cf=Wt({},Vl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tm,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==zo&&(zo&&t.type==="mousemove"?(Pf=t.screenX-zo.screenX,zf=t.screenY-zo.screenY):zf=Pf=0,zo=t),Pf)},movementY:function(t){return"movementY"in t?t.movementY:zf}}),wg=Kn(cf),$M=Wt({},cf,{dataTransfer:0}),JM=Kn($M),eb=Wt({},Vl,{relatedTarget:0}),If=Kn(eb),tb=Wt({},ir,{animationName:0,elapsedTime:0,pseudoElement:0}),nb=Kn(tb),ib=Wt({},ir,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ab=Kn(ib),sb=Wt({},ir,{data:0}),Cg=Kn(sb),rb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ob={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},lb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cb(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=lb[t])?!!e[t]:!1}function tm(){return cb}var ub=Wt({},Vl,{key:function(t){if(t.key){var e=rb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Qc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ob[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tm,charCode:function(t){return t.type==="keypress"?Qc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Qc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),fb=Kn(ub),db=Wt({},cf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Rg=Kn(db),hb=Wt({},Vl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tm}),pb=Kn(hb),mb=Wt({},ir,{propertyName:0,elapsedTime:0,pseudoElement:0}),gb=Kn(mb),vb=Wt({},cf,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),_b=Kn(vb),xb=Wt({},ir,{newState:0,oldState:0}),Sb=Kn(xb),yb=[9,13,27,32],nm=La&&"CompositionEvent"in window,rl=null;La&&"documentMode"in document&&(rl=document.documentMode);var Mb=La&&"TextEvent"in window&&!rl,j_=La&&(!nm||rl&&8<rl&&11>=rl),Ng=" ",Dg=!1;function X_(t,e){switch(t){case"keyup":return yb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function W_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ir=!1;function bb(t,e){switch(t){case"compositionend":return W_(e);case"keypress":return e.which!==32?null:(Dg=!0,Ng);case"textInput":return t=e.data,t===Ng&&Dg?null:t;default:return null}}function Eb(t,e){if(Ir)return t==="compositionend"||!nm&&X_(t,e)?(t=V_(),Kc=em=is=null,Ir=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return j_&&e.locale!=="ko"?null:e.data;default:return null}}var Tb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ug(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Tb[t.type]:e==="textarea"}function q_(t,e,n,i){zr?Kr?Kr.push(i):Kr=[i]:zr=i,e=Gu(e,"onChange"),0<e.length&&(n=new lf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var ol=null,Ml=null;function Ab(t){kS(t,0)}function uf(t){var e=Jo(t);if(I_(e))return t}function Lg(t,e){if(t==="change")return e}var Y_=!1;if(La){var Bf;if(La){var Ff="oninput"in document;if(!Ff){var Og=document.createElement("div");Og.setAttribute("oninput","return;"),Ff=typeof Og.oninput=="function"}Bf=Ff}else Bf=!1;Y_=Bf&&(!document.documentMode||9<document.documentMode)}function Pg(){ol&&(ol.detachEvent("onpropertychange",Z_),Ml=ol=null)}function Z_(t){if(t.propertyName==="value"&&uf(Ml)){var e=[];q_(e,Ml,t,Jp(t)),k_(Ab,e)}}function wb(t,e,n){t==="focusin"?(Pg(),ol=e,Ml=n,ol.attachEvent("onpropertychange",Z_)):t==="focusout"&&Pg()}function Cb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return uf(Ml)}function Rb(t,e){if(t==="click")return uf(e)}function Nb(t,e){if(t==="input"||t==="change")return uf(e)}function Db(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var oi=typeof Object.is=="function"?Object.is:Db;function bl(t,e){if(oi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!ih.call(e,a)||!oi(t[a],e[a]))return!1}return!0}function zg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ig(t,e){var n=zg(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=zg(n)}}function K_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?K_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Q_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=bu(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=bu(t.document)}return e}function im(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Ub=La&&"documentMode"in document&&11>=document.documentMode,Br=null,uh=null,ll=null,fh=!1;function Bg(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;fh||Br==null||Br!==bu(i)||(i=Br,"selectionStart"in i&&im(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ll&&bl(ll,i)||(ll=i,i=Gu(uh,"onSelect"),0<i.length&&(e=new lf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Br)))}function ws(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Fr={animationend:ws("Animation","AnimationEnd"),animationiteration:ws("Animation","AnimationIteration"),animationstart:ws("Animation","AnimationStart"),transitionrun:ws("Transition","TransitionRun"),transitionstart:ws("Transition","TransitionStart"),transitioncancel:ws("Transition","TransitionCancel"),transitionend:ws("Transition","TransitionEnd")},Hf={},$_={};La&&($_=document.createElement("div").style,"AnimationEvent"in window||(delete Fr.animationend.animation,delete Fr.animationiteration.animation,delete Fr.animationstart.animation),"TransitionEvent"in window||delete Fr.transitionend.transition);function ar(t){if(Hf[t])return Hf[t];if(!Fr[t])return t;var e=Fr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in $_)return Hf[t]=e[n];return t}var J_=ar("animationend"),ex=ar("animationiteration"),tx=ar("animationstart"),Lb=ar("transitionrun"),Ob=ar("transitionstart"),Pb=ar("transitioncancel"),nx=ar("transitionend"),ix=new Map,dh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");dh.push("scrollEnd");function Hi(t,e){ix.set(t,e),nr(e,[t])}var Eu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},gi=[],Hr=0,am=0;function ff(){for(var t=Hr,e=am=Hr=0;e<t;){var n=gi[e];gi[e++]=null;var i=gi[e];gi[e++]=null;var a=gi[e];gi[e++]=null;var s=gi[e];if(gi[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&ax(n,a,s)}}function df(t,e,n,i){gi[Hr++]=t,gi[Hr++]=e,gi[Hr++]=n,gi[Hr++]=i,am|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function sm(t,e,n,i){return df(t,e,n,i),Tu(t)}function sr(t,e){return df(t,null,null,e),Tu(t)}function ax(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-si(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function Tu(t){if(50<vl)throw vl=0,Lh=null,Error(ue(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Gr={};function zb(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,e,n,i){return new zb(t,e,n,i)}function rm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Ca(t,e){var n=t.alternate;return n===null?(n=ti(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function sx(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function $c(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")rm(t)&&(r=1);else if(typeof t=="string")r=GE(t,n,ea.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case Jd:return t=ti(31,n,e,a),t.elementType=Jd,t.lanes=s,t;case Lr:return ks(n.children,a,s,e);case E_:r=8,a|=24;break;case Kd:return t=ti(12,n,e,a|2),t.elementType=Kd,t.lanes=s,t;case Qd:return t=ti(13,n,e,a),t.elementType=Qd,t.lanes=s,t;case $d:return t=ti(19,n,e,a),t.elementType=$d,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ea:r=10;break e;case T_:r=9;break e;case Wp:r=11;break e;case qp:r=14;break e;case Za:r=16,i=null;break e}r=29,n=Error(ue(130,t===null?"null":typeof t,"")),i=null}return e=ti(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function ks(t,e,n,i){return t=ti(7,t,i,e),t.lanes=n,t}function Gf(t,e,n){return t=ti(6,t,null,e),t.lanes=n,t}function rx(t){var e=ti(18,null,null,0);return e.stateNode=t,e}function kf(t,e,n){return e=ti(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Fg=new WeakMap;function bi(t,e){if(typeof t=="object"&&t!==null){var n=Fg.get(t);return n!==void 0?n:(e={value:t,source:e,stack:xg(e)},Fg.set(t,e),e)}return{value:t,source:e,stack:xg(e)}}var kr=[],Vr=0,Au=null,El=0,xi=[],Si=0,_s=null,Ki=1,Qi="";function ya(t,e){kr[Vr++]=El,kr[Vr++]=Au,Au=t,El=e}function ox(t,e,n){xi[Si++]=Ki,xi[Si++]=Qi,xi[Si++]=_s,_s=t;var i=Ki;t=Qi;var a=32-si(i)-1;i&=~(1<<a),n+=1;var s=32-si(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,Ki=1<<32-si(e)+a|n<<a|i,Qi=s+t}else Ki=1<<s|n<<a|i,Qi=t}function om(t){t.return!==null&&(ya(t,1),ox(t,1,0))}function lm(t){for(;t===Au;)Au=kr[--Vr],kr[Vr]=null,El=kr[--Vr],kr[Vr]=null;for(;t===_s;)_s=xi[--Si],xi[Si]=null,Qi=xi[--Si],xi[Si]=null,Ki=xi[--Si],xi[Si]=null}function lx(t,e){xi[Si++]=Ki,xi[Si++]=Qi,xi[Si++]=_s,Ki=e.id,Qi=e.overflow,_s=t}var Mn=null,jt=null,mt=!1,us=null,Ei=!1,hh=Error(ue(519));function xs(t){var e=Error(ue(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Tl(bi(e,t)),hh}function Hg(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[yn]=t,e[Zn]=i,n){case"dialog":ot("cancel",e),ot("close",e);break;case"iframe":case"object":case"embed":ot("load",e);break;case"video":case"audio":for(n=0;n<Rl.length;n++)ot(Rl[n],e);break;case"source":ot("error",e);break;case"img":case"image":case"link":ot("error",e),ot("load",e);break;case"details":ot("toggle",e);break;case"input":ot("invalid",e),B_(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":ot("invalid",e);break;case"textarea":ot("invalid",e),H_(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||jS(e.textContent,n)?(i.popover!=null&&(ot("beforetoggle",e),ot("toggle",e)),i.onScroll!=null&&ot("scroll",e),i.onScrollEnd!=null&&ot("scrollend",e),i.onClick!=null&&(e.onclick=Ta),e=!0):e=!1,e||xs(t,!0)}function Gg(t){for(Mn=t.return;Mn;)switch(Mn.tag){case 5:case 31:case 13:Ei=!1;return;case 27:case 3:Ei=!0;return;default:Mn=Mn.return}}function fr(t){if(t!==Mn)return!1;if(!mt)return Gg(t),mt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Bh(t.type,t.memoizedProps)),n=!n),n&&jt&&xs(t),Gg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ue(317));jt=w0(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ue(317));jt=w0(t)}else e===27?(e=jt,Es(t.type)?(t=kh,kh=null,jt=t):jt=e):jt=Mn?Ci(t.stateNode.nextSibling):null;return!0}function qs(){jt=Mn=null,mt=!1}function Vf(){var t=us;return t!==null&&(Wn===null?Wn=t:Wn.push.apply(Wn,t),us=null),t}function Tl(t){us===null?us=[t]:us.push(t)}var ph=aa(null),rr=null,Aa=null;function Qa(t,e,n){Ft(ph,e._currentValue),e._currentValue=n}function Ra(t){t._currentValue=ph.current,xn(ph)}function mh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function gh(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),mh(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(ue(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),mh(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function bo(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(ue(387));if(r=r.memoizedProps,r!==null){var o=a.type;oi(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===xu.current){if(r=a.alternate,r===null)throw Error(ue(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Dl):t=[Dl])}a=a.return}t!==null&&gh(e,t,n,i),e.flags|=262144}function wu(t){for(t=t.firstContext;t!==null;){if(!oi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ys(t){rr=t,Aa=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function bn(t){return cx(rr,t)}function oc(t,e){return rr===null&&Ys(t),cx(t,e)}function cx(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Aa===null){if(t===null)throw Error(ue(308));Aa=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Aa=Aa.next=e;return n}var Ib=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Bb=un.unstable_scheduleCallback,Fb=un.unstable_NormalPriority,on={$$typeof:Ea,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function cm(){return{controller:new Ib,data:new Map,refCount:0}}function jl(t){t.refCount--,t.refCount===0&&Bb(Fb,function(){t.controller.abort()})}var cl=null,vh=0,ro=0,Qr=null;function Hb(t,e){if(cl===null){var n=cl=[];vh=0,ro=Om(),Qr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return vh++,e.then(kg,kg),e}function kg(){if(--vh===0&&cl!==null){Qr!==null&&(Qr.status="fulfilled");var t=cl;cl=null,ro=0,Qr=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Gb(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Vg=Ve.S;Ve.S=function(t,e){bS=ii(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Hb(t,e),Vg!==null&&Vg(t,e)};var Vs=aa(null);function um(){var t=Vs.current;return t!==null?t:zt.pooledCache}function Jc(t,e){e===null?Ft(Vs,Vs.current):Ft(Vs,e.pool)}function ux(){var t=um();return t===null?null:{parent:on._currentValue,pool:t}}var Eo=Error(ue(460)),fm=Error(ue(474)),hf=Error(ue(542)),Cu={then:function(){}};function jg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function fx(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Ta,Ta),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Wg(t),t;default:if(typeof e.status=="string")e.then(Ta,Ta);else{if(t=zt,t!==null&&100<t.shellSuspendCounter)throw Error(ue(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Wg(t),t}throw js=e,Eo}}function Os(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(js=n,Eo):n}}var js=null;function Xg(){if(js===null)throw Error(ue(459));var t=js;return js=null,t}function Wg(t){if(t===Eo||t===hf)throw Error(ue(483))}var $r=null,Al=0;function lc(t){var e=Al;return Al+=1,$r===null&&($r=[]),fx($r,t,e)}function Io(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function cc(t,e){throw e.$$typeof===wM?Error(ue(525)):(t=Object.prototype.toString.call(e),Error(ue(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function dx(t){function e(h,v){if(t){var S=h.deletions;S===null?(h.deletions=[v],h.flags|=16):S.push(v)}}function n(h,v){if(!t)return null;for(;v!==null;)e(h,v),v=v.sibling;return null}function i(h){for(var v=new Map;h!==null;)h.key!==null?v.set(h.key,h):v.set(h.index,h),h=h.sibling;return v}function a(h,v){return h=Ca(h,v),h.index=0,h.sibling=null,h}function s(h,v,S){return h.index=S,t?(S=h.alternate,S!==null?(S=S.index,S<v?(h.flags|=67108866,v):S):(h.flags|=67108866,v)):(h.flags|=1048576,v)}function r(h){return t&&h.alternate===null&&(h.flags|=67108866),h}function o(h,v,S,x){return v===null||v.tag!==6?(v=Gf(S,h.mode,x),v.return=h,v):(v=a(v,S),v.return=h,v)}function l(h,v,S,x){var A=S.type;return A===Lr?d(h,v,S.props.children,x,S.key):v!==null&&(v.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Za&&Os(A)===v.type)?(v=a(v,S.props),Io(v,S),v.return=h,v):(v=$c(S.type,S.key,S.props,null,h.mode,x),Io(v,S),v.return=h,v)}function c(h,v,S,x){return v===null||v.tag!==4||v.stateNode.containerInfo!==S.containerInfo||v.stateNode.implementation!==S.implementation?(v=kf(S,h.mode,x),v.return=h,v):(v=a(v,S.children||[]),v.return=h,v)}function d(h,v,S,x,A){return v===null||v.tag!==7?(v=ks(S,h.mode,x,A),v.return=h,v):(v=a(v,S),v.return=h,v)}function p(h,v,S){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Gf(""+v,h.mode,S),v.return=h,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case tc:return S=$c(v.type,v.key,v.props,null,h.mode,S),Io(S,v),S.return=h,S;case Qo:return v=kf(v,h.mode,S),v.return=h,v;case Za:return v=Os(v),p(h,v,S)}if($o(v)||Oo(v))return v=ks(v,h.mode,S,null),v.return=h,v;if(typeof v.then=="function")return p(h,lc(v),S);if(v.$$typeof===Ea)return p(h,oc(h,v),S);cc(h,v)}return null}function u(h,v,S,x){var A=v!==null?v.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return A!==null?null:o(h,v,""+S,x);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case tc:return S.key===A?l(h,v,S,x):null;case Qo:return S.key===A?c(h,v,S,x):null;case Za:return S=Os(S),u(h,v,S,x)}if($o(S)||Oo(S))return A!==null?null:d(h,v,S,x,null);if(typeof S.then=="function")return u(h,v,lc(S),x);if(S.$$typeof===Ea)return u(h,v,oc(h,S),x);cc(h,S)}return null}function m(h,v,S,x,A){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return h=h.get(S)||null,o(v,h,""+x,A);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case tc:return h=h.get(x.key===null?S:x.key)||null,l(v,h,x,A);case Qo:return h=h.get(x.key===null?S:x.key)||null,c(v,h,x,A);case Za:return x=Os(x),m(h,v,S,x,A)}if($o(x)||Oo(x))return h=h.get(S)||null,d(v,h,x,A,null);if(typeof x.then=="function")return m(h,v,S,lc(x),A);if(x.$$typeof===Ea)return m(h,v,S,oc(v,x),A);cc(v,x)}return null}function g(h,v,S,x){for(var A=null,R=null,T=v,M=v=0,C=null;T!==null&&M<S.length;M++){T.index>M?(C=T,T=null):C=T.sibling;var w=u(h,T,S[M],x);if(w===null){T===null&&(T=C);break}t&&T&&w.alternate===null&&e(h,T),v=s(w,v,M),R===null?A=w:R.sibling=w,R=w,T=C}if(M===S.length)return n(h,T),mt&&ya(h,M),A;if(T===null){for(;M<S.length;M++)T=p(h,S[M],x),T!==null&&(v=s(T,v,M),R===null?A=T:R.sibling=T,R=T);return mt&&ya(h,M),A}for(T=i(T);M<S.length;M++)C=m(T,h,M,S[M],x),C!==null&&(t&&C.alternate!==null&&T.delete(C.key===null?M:C.key),v=s(C,v,M),R===null?A=C:R.sibling=C,R=C);return t&&T.forEach(function(U){return e(h,U)}),mt&&ya(h,M),A}function b(h,v,S,x){if(S==null)throw Error(ue(151));for(var A=null,R=null,T=v,M=v=0,C=null,w=S.next();T!==null&&!w.done;M++,w=S.next()){T.index>M?(C=T,T=null):C=T.sibling;var U=u(h,T,w.value,x);if(U===null){T===null&&(T=C);break}t&&T&&U.alternate===null&&e(h,T),v=s(U,v,M),R===null?A=U:R.sibling=U,R=U,T=C}if(w.done)return n(h,T),mt&&ya(h,M),A;if(T===null){for(;!w.done;M++,w=S.next())w=p(h,w.value,x),w!==null&&(v=s(w,v,M),R===null?A=w:R.sibling=w,R=w);return mt&&ya(h,M),A}for(T=i(T);!w.done;M++,w=S.next())w=m(T,h,M,w.value,x),w!==null&&(t&&w.alternate!==null&&T.delete(w.key===null?M:w.key),v=s(w,v,M),R===null?A=w:R.sibling=w,R=w);return t&&T.forEach(function(O){return e(h,O)}),mt&&ya(h,M),A}function _(h,v,S,x){if(typeof S=="object"&&S!==null&&S.type===Lr&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case tc:e:{for(var A=S.key;v!==null;){if(v.key===A){if(A=S.type,A===Lr){if(v.tag===7){n(h,v.sibling),x=a(v,S.props.children),x.return=h,h=x;break e}}else if(v.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===Za&&Os(A)===v.type){n(h,v.sibling),x=a(v,S.props),Io(x,S),x.return=h,h=x;break e}n(h,v);break}else e(h,v);v=v.sibling}S.type===Lr?(x=ks(S.props.children,h.mode,x,S.key),x.return=h,h=x):(x=$c(S.type,S.key,S.props,null,h.mode,x),Io(x,S),x.return=h,h=x)}return r(h);case Qo:e:{for(A=S.key;v!==null;){if(v.key===A)if(v.tag===4&&v.stateNode.containerInfo===S.containerInfo&&v.stateNode.implementation===S.implementation){n(h,v.sibling),x=a(v,S.children||[]),x.return=h,h=x;break e}else{n(h,v);break}else e(h,v);v=v.sibling}x=kf(S,h.mode,x),x.return=h,h=x}return r(h);case Za:return S=Os(S),_(h,v,S,x)}if($o(S))return g(h,v,S,x);if(Oo(S)){if(A=Oo(S),typeof A!="function")throw Error(ue(150));return S=A.call(S),b(h,v,S,x)}if(typeof S.then=="function")return _(h,v,lc(S),x);if(S.$$typeof===Ea)return _(h,v,oc(h,S),x);cc(h,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,v!==null&&v.tag===6?(n(h,v.sibling),x=a(v,S),x.return=h,h=x):(n(h,v),x=Gf(S,h.mode,x),x.return=h,h=x),r(h)):n(h,v)}return function(h,v,S,x){try{Al=0;var A=_(h,v,S,x);return $r=null,A}catch(T){if(T===Eo||T===hf)throw T;var R=ti(29,T,null,h.mode);return R.lanes=x,R.return=h,R}finally{}}}var Zs=dx(!0),hx=dx(!1),Ka=!1;function dm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function _h(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function fs(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function ds(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,St&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=Tu(t),ax(t,null,n),e}return df(t,i,e,n),Tu(t)}function ul(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,D_(t,n)}}function jf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var xh=!1;function fl(){if(xh){var t=Qr;if(t!==null)throw t}}function dl(t,e,n,i){xh=!1;var a=t.updateQueue;Ka=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var p=a.baseState;r=0,d=c=l=null,o=s;do{var u=o.lane&-536870913,m=u!==o.lane;if(m?(ft&u)===u:(i&u)===u){u!==0&&u===ro&&(xh=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,b=o;u=e;var _=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){p=g.call(_,p,u);break e}p=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(_,p,u):g,u==null)break e;p=Wt({},p,u);break e;case 2:Ka=!0}}u=o.callback,u!==null&&(t.flags|=64,m&&(t.flags|=8192),m=a.callbacks,m===null?a.callbacks=[u]:m.push(u))}else m={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=m,l=p):d=d.next=m,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;m=o,o=m.next,m.next=null,a.lastBaseUpdate=m,a.shared.pending=null}}while(!0);d===null&&(l=p),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,s===null&&(a.shared.lanes=0),ys|=r,t.lanes=r,t.memoizedState=p}}function px(t,e){if(typeof t!="function")throw Error(ue(191,t));t.call(e)}function mx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)px(n[t],e)}var oo=aa(null),Ru=aa(0);function qg(t,e){t=Ia,Ft(Ru,t),Ft(oo,e),Ia=t|e.baseLanes}function Sh(){Ft(Ru,Ia),Ft(oo,oo.current)}function hm(){Ia=Ru.current,xn(oo),xn(Ru)}var li=aa(null),wi=null;function $a(t){var e=t.alternate;Ft(tn,tn.current&1),Ft(li,t),wi===null&&(e===null||oo.current!==null||e.memoizedState!==null)&&(wi=t)}function yh(t){Ft(tn,tn.current),Ft(li,t),wi===null&&(wi=t)}function gx(t){t.tag===22?(Ft(tn,tn.current),Ft(li,t),wi===null&&(wi=t)):Ja()}function Ja(){Ft(tn,tn.current),Ft(li,li.current)}function ei(t){xn(li),wi===t&&(wi=null),xn(tn)}var tn=aa(0);function Nu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Hh(n)||Gh(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Oa=0,nt=null,Pt=null,sn=null,Du=!1,Jr=!1,Ks=!1,Uu=0,wl=0,eo=null,kb=0;function Zt(){throw Error(ue(321))}function pm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!oi(t[n],e[n]))return!1;return!0}function mm(t,e,n,i,a,s){return Oa=s,nt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ve.H=t===null||t.memoizedState===null?qx:Am,Ks=!1,s=n(i,a),Ks=!1,Jr&&(s=_x(e,n,i,a)),vx(t),s}function vx(t){Ve.H=Cl;var e=Pt!==null&&Pt.next!==null;if(Oa=0,sn=Pt=nt=null,Du=!1,wl=0,eo=null,e)throw Error(ue(300));t===null||ln||(t=t.dependencies,t!==null&&wu(t)&&(ln=!0))}function _x(t,e,n,i){nt=t;var a=0;do{if(Jr&&(eo=null),wl=0,Jr=!1,25<=a)throw Error(ue(301));if(a+=1,sn=Pt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Ve.H=Yx,s=e(n,i)}while(Jr);return s}function Vb(){var t=Ve.H,e=t.useState()[0];return e=typeof e.then=="function"?Xl(e):e,t=t.useState()[0],(Pt!==null?Pt.memoizedState:null)!==t&&(nt.flags|=1024),e}function gm(){var t=Uu!==0;return Uu=0,t}function vm(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function _m(t){if(Du){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Du=!1}Oa=0,sn=Pt=nt=null,Jr=!1,wl=Uu=0,eo=null}function Pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return sn===null?nt.memoizedState=sn=t:sn=sn.next=t,sn}function nn(){if(Pt===null){var t=nt.alternate;t=t!==null?t.memoizedState:null}else t=Pt.next;var e=sn===null?nt.memoizedState:sn.next;if(e!==null)sn=e,Pt=t;else{if(t===null)throw nt.alternate===null?Error(ue(467)):Error(ue(310));Pt=t,t={memoizedState:Pt.memoizedState,baseState:Pt.baseState,baseQueue:Pt.baseQueue,queue:Pt.queue,next:null},sn===null?nt.memoizedState=sn=t:sn=sn.next=t}return sn}function pf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Xl(t){var e=wl;return wl+=1,eo===null&&(eo=[]),t=fx(eo,t,e),e=nt,(sn===null?e.memoizedState:sn.next)===null&&(e=e.alternate,Ve.H=e===null||e.memoizedState===null?qx:Am),t}function mf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Xl(t);if(t.$$typeof===Ea)return bn(t)}throw Error(ue(438,String(t)))}function xm(t){var e=null,n=nt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=nt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=pf(),nt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=CM;return e.index++,n}function Pa(t,e){return typeof e=="function"?e(t):e}function eu(t){var e=nn();return Sm(e,Pt,t)}function Sm(t,e,n){var i=t.queue;if(i===null)throw Error(ue(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,d=!1;do{var p=c.lane&-536870913;if(p!==c.lane?(ft&p)===p:(Oa&p)===p){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),p===ro&&(d=!0);else if((Oa&u)===u){c=c.next,u===ro&&(d=!0);continue}else p={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=p,r=s):l=l.next=p,nt.lanes|=u,ys|=u;p=c.action,Ks&&n(s,p),s=c.hasEagerState?c.eagerState:n(s,p)}else u={lane:p,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,nt.lanes|=p,ys|=p;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!oi(s,t.memoizedState)&&(ln=!0,d&&(n=Qr,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function Xf(t){var e=nn(),n=e.queue;if(n===null)throw Error(ue(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);oi(s,e.memoizedState)||(ln=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function xx(t,e,n){var i=nt,a=nn(),s=mt;if(s){if(n===void 0)throw Error(ue(407));n=n()}else n=e();var r=!oi((Pt||a).memoizedState,n);if(r&&(a.memoizedState=n,ln=!0),a=a.queue,ym(Mx.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||sn!==null&&sn.memoizedState.tag&1){if(i.flags|=2048,lo(9,{destroy:void 0},yx.bind(null,i,a,n,e),null),zt===null)throw Error(ue(349));s||Oa&127||Sx(i,e,n)}return n}function Sx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=nt.updateQueue,e===null?(e=pf(),nt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function yx(t,e,n,i){e.value=n,e.getSnapshot=i,bx(e)&&Ex(t)}function Mx(t,e,n){return n(function(){bx(e)&&Ex(t)})}function bx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!oi(t,n)}catch{return!0}}function Ex(t){var e=sr(t,2);e!==null&&qn(e,t,2)}function Mh(t){var e=Pn();if(typeof t=="function"){var n=t;if(t=n(),Ks){ns(!0);try{n()}finally{ns(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pa,lastRenderedState:t},e}function Tx(t,e,n,i){return t.baseState=n,Sm(t,Pt,typeof i=="function"?i:Pa)}function jb(t,e,n,i,a){if(vf(t))throw Error(ue(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Ve.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,Ax(e,s)):(s.next=n.next,e.pending=n.next=s)}}function Ax(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=Ve.T,r={};Ve.T=r;try{var o=n(a,i),l=Ve.S;l!==null&&l(r,o),Yg(t,e,o)}catch(c){bh(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),Ve.T=s}}else try{s=n(a,i),Yg(t,e,s)}catch(c){bh(t,e,c)}}function Yg(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Zg(t,e,i)},function(i){return bh(t,e,i)}):Zg(t,e,n)}function Zg(t,e,n){e.status="fulfilled",e.value=n,wx(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Ax(t,n)))}function bh(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,wx(e),e=e.next;while(e!==i)}t.action=null}function wx(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Cx(t,e){return e}function Kg(t,e){if(mt){var n=zt.formState;if(n!==null){e:{var i=nt;if(mt){if(jt){t:{for(var a=jt,s=Ei;a.nodeType!==8;){if(!s){a=null;break t}if(a=Ci(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){jt=Ci(a.nextSibling),i=a.data==="F!";break e}}xs(i)}i=!1}i&&(e=n[0])}}return n=Pn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Cx,lastRenderedState:e},n.queue=i,n=jx.bind(null,nt,i),i.dispatch=n,i=Mh(!1),s=Tm.bind(null,nt,!1,i.queue),i=Pn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=jb.bind(null,nt,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Qg(t){var e=nn();return Rx(e,Pt,t)}function Rx(t,e,n){if(e=Sm(t,e,Cx)[0],t=eu(Pa)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Xl(e)}catch(r){throw r===Eo?hf:r}else i=e;e=nn();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&(nt.flags|=2048,lo(9,{destroy:void 0},Xb.bind(null,a,n),null)),[i,s,t]}function Xb(t,e){t.action=e}function $g(t){var e=nn(),n=Pt;if(n!==null)return Rx(e,n,t);nn(),e=e.memoizedState,n=nn();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function lo(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=nt.updateQueue,e===null&&(e=pf(),nt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function Nx(){return nn().memoizedState}function tu(t,e,n,i){var a=Pn();nt.flags|=t,a.memoizedState=lo(1|e,{destroy:void 0},n,i===void 0?null:i)}function gf(t,e,n,i){var a=nn();i=i===void 0?null:i;var s=a.memoizedState.inst;Pt!==null&&i!==null&&pm(i,Pt.memoizedState.deps)?a.memoizedState=lo(e,s,n,i):(nt.flags|=t,a.memoizedState=lo(1|e,s,n,i))}function Jg(t,e){tu(8390656,8,t,e)}function ym(t,e){gf(2048,8,t,e)}function Wb(t){nt.flags|=4;var e=nt.updateQueue;if(e===null)e=pf(),nt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Dx(t){var e=nn().memoizedState;return Wb({ref:e,nextImpl:t}),function(){if(St&2)throw Error(ue(440));return e.impl.apply(void 0,arguments)}}function Ux(t,e){return gf(4,2,t,e)}function Lx(t,e){return gf(4,4,t,e)}function Ox(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Px(t,e,n){n=n!=null?n.concat([t]):null,gf(4,4,Ox.bind(null,e,t),n)}function Mm(){}function zx(t,e){var n=nn();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&pm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Ix(t,e){var n=nn();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&pm(e,i[1]))return i[0];if(i=t(),Ks){ns(!0);try{t()}finally{ns(!1)}}return n.memoizedState=[i,e],i}function bm(t,e,n){return n===void 0||Oa&1073741824&&!(ft&261930)?t.memoizedState=e:(t.memoizedState=n,t=TS(),nt.lanes|=t,ys|=t,n)}function Bx(t,e,n,i){return oi(n,e)?n:oo.current!==null?(t=bm(t,n,i),oi(t,e)||(ln=!0),t):!(Oa&42)||Oa&1073741824&&!(ft&261930)?(ln=!0,t.memoizedState=n):(t=TS(),nt.lanes|=t,ys|=t,e)}function Fx(t,e,n,i,a){var s=yt.p;yt.p=s!==0&&8>s?s:8;var r=Ve.T,o={};Ve.T=o,Tm(t,!1,e,n);try{var l=a(),c=Ve.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=Gb(l,i);hl(t,e,d,ri(t))}else hl(t,e,i,ri(t))}catch(p){hl(t,e,{then:function(){},status:"rejected",reason:p},ri())}finally{yt.p=s,r!==null&&o.types!==null&&(r.types=o.types),Ve.T=r}}function qb(){}function Eh(t,e,n,i){if(t.tag!==5)throw Error(ue(476));var a=Hx(t).queue;Fx(t,a,e,Gs,n===null?qb:function(){return Gx(t),n(i)})}function Hx(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Gs,baseState:Gs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pa,lastRenderedState:Gs},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Pa,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Gx(t){var e=Hx(t);e.next===null&&(e=t.alternate.memoizedState),hl(t,e.next.queue,{},ri())}function Em(){return bn(Dl)}function kx(){return nn().memoizedState}function Vx(){return nn().memoizedState}function Yb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ri();t=fs(n);var i=ds(e,t,n);i!==null&&(qn(i,e,n),ul(i,e,n)),e={cache:cm()},t.payload=e;return}e=e.return}}function Zb(t,e,n){var i=ri();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},vf(t)?Xx(e,n):(n=sm(t,e,n,i),n!==null&&(qn(n,t,i),Wx(n,e,i)))}function jx(t,e,n){var i=ri();hl(t,e,n,i)}function hl(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(vf(t))Xx(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,oi(o,r))return df(t,e,a,0),zt===null&&ff(),!1}catch{}finally{}if(n=sm(t,e,a,i),n!==null)return qn(n,t,i),Wx(n,e,i),!0}return!1}function Tm(t,e,n,i){if(i={lane:2,revertLane:Om(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},vf(t)){if(e)throw Error(ue(479))}else e=sm(t,n,i,2),e!==null&&qn(e,t,2)}function vf(t){var e=t.alternate;return t===nt||e!==null&&e===nt}function Xx(t,e){Jr=Du=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Wx(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,D_(t,n)}}var Cl={readContext:bn,use:mf,useCallback:Zt,useContext:Zt,useEffect:Zt,useImperativeHandle:Zt,useLayoutEffect:Zt,useInsertionEffect:Zt,useMemo:Zt,useReducer:Zt,useRef:Zt,useState:Zt,useDebugValue:Zt,useDeferredValue:Zt,useTransition:Zt,useSyncExternalStore:Zt,useId:Zt,useHostTransitionStatus:Zt,useFormState:Zt,useActionState:Zt,useOptimistic:Zt,useMemoCache:Zt,useCacheRefresh:Zt};Cl.useEffectEvent=Zt;var qx={readContext:bn,use:mf,useCallback:function(t,e){return Pn().memoizedState=[t,e===void 0?null:e],t},useContext:bn,useEffect:Jg,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,tu(4194308,4,Ox.bind(null,e,t),n)},useLayoutEffect:function(t,e){return tu(4194308,4,t,e)},useInsertionEffect:function(t,e){tu(4,2,t,e)},useMemo:function(t,e){var n=Pn();e=e===void 0?null:e;var i=t();if(Ks){ns(!0);try{t()}finally{ns(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=Pn();if(n!==void 0){var a=n(e);if(Ks){ns(!0);try{n(e)}finally{ns(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=Zb.bind(null,nt,t),[i.memoizedState,t]},useRef:function(t){var e=Pn();return t={current:t},e.memoizedState=t},useState:function(t){t=Mh(t);var e=t.queue,n=jx.bind(null,nt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Mm,useDeferredValue:function(t,e){var n=Pn();return bm(n,t,e)},useTransition:function(){var t=Mh(!1);return t=Fx.bind(null,nt,t.queue,!0,!1),Pn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=nt,a=Pn();if(mt){if(n===void 0)throw Error(ue(407));n=n()}else{if(n=e(),zt===null)throw Error(ue(349));ft&127||Sx(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Jg(Mx.bind(null,i,s,t),[t]),i.flags|=2048,lo(9,{destroy:void 0},yx.bind(null,i,s,n,e),null),n},useId:function(){var t=Pn(),e=zt.identifierPrefix;if(mt){var n=Qi,i=Ki;n=(i&~(1<<32-si(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Uu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=kb++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Em,useFormState:Kg,useActionState:Kg,useOptimistic:function(t){var e=Pn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Tm.bind(null,nt,!0,n),n.dispatch=e,[t,e]},useMemoCache:xm,useCacheRefresh:function(){return Pn().memoizedState=Yb.bind(null,nt)},useEffectEvent:function(t){var e=Pn(),n={impl:t};return e.memoizedState=n,function(){if(St&2)throw Error(ue(440));return n.impl.apply(void 0,arguments)}}},Am={readContext:bn,use:mf,useCallback:zx,useContext:bn,useEffect:ym,useImperativeHandle:Px,useInsertionEffect:Ux,useLayoutEffect:Lx,useMemo:Ix,useReducer:eu,useRef:Nx,useState:function(){return eu(Pa)},useDebugValue:Mm,useDeferredValue:function(t,e){var n=nn();return Bx(n,Pt.memoizedState,t,e)},useTransition:function(){var t=eu(Pa)[0],e=nn().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:xx,useId:kx,useHostTransitionStatus:Em,useFormState:Qg,useActionState:Qg,useOptimistic:function(t,e){var n=nn();return Tx(n,Pt,t,e)},useMemoCache:xm,useCacheRefresh:Vx};Am.useEffectEvent=Dx;var Yx={readContext:bn,use:mf,useCallback:zx,useContext:bn,useEffect:ym,useImperativeHandle:Px,useInsertionEffect:Ux,useLayoutEffect:Lx,useMemo:Ix,useReducer:Xf,useRef:Nx,useState:function(){return Xf(Pa)},useDebugValue:Mm,useDeferredValue:function(t,e){var n=nn();return Pt===null?bm(n,t,e):Bx(n,Pt.memoizedState,t,e)},useTransition:function(){var t=Xf(Pa)[0],e=nn().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:xx,useId:kx,useHostTransitionStatus:Em,useFormState:$g,useActionState:$g,useOptimistic:function(t,e){var n=nn();return Pt!==null?Tx(n,Pt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:xm,useCacheRefresh:Vx};Yx.useEffectEvent=Dx;function Wf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Wt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Th={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=ri(),a=fs(i);a.payload=e,n!=null&&(a.callback=n),e=ds(t,a,i),e!==null&&(qn(e,t,i),ul(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=ri(),a=fs(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=ds(t,a,i),e!==null&&(qn(e,t,i),ul(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ri(),i=fs(n);i.tag=2,e!=null&&(i.callback=e),e=ds(t,i,n),e!==null&&(qn(e,t,n),ul(e,t,n))}};function e0(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!bl(n,i)||!bl(a,s):!0}function t0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Th.enqueueReplaceState(e,e.state,null)}function Qs(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=Wt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function Zx(t){Eu(t)}function Kx(t){console.error(t)}function Qx(t){Eu(t)}function Lu(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function n0(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Ah(t,e,n){return n=fs(n),n.tag=3,n.payload={element:null},n.callback=function(){Lu(t,e)},n}function $x(t){return t=fs(t),t.tag=3,t}function Jx(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){n0(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){n0(e,n,i),typeof a!="function"&&(hs===null?hs=new Set([this]):hs.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Kb(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&bo(e,n,a,!0),n=li.current,n!==null){switch(n.tag){case 31:case 13:return wi===null?Bu():n.alternate===null&&Kt===0&&(Kt=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Cu?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),id(t,i,a)),!1;case 22:return n.flags|=65536,i===Cu?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),id(t,i,a)),!1}throw Error(ue(435,n.tag))}return id(t,i,a),Bu(),!1}if(mt)return e=li.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==hh&&(t=Error(ue(422),{cause:i}),Tl(bi(t,n)))):(i!==hh&&(e=Error(ue(423),{cause:i}),Tl(bi(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=bi(i,n),a=Ah(t.stateNode,i,a),jf(t,a),Kt!==4&&(Kt=2)),!1;var s=Error(ue(520),{cause:i});if(s=bi(s,n),gl===null?gl=[s]:gl.push(s),Kt!==4&&(Kt=2),e===null)return!0;i=bi(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Ah(n.stateNode,i,t),jf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(hs===null||!hs.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=$x(a),Jx(a,t,n,i),jf(n,a),!1}n=n.return}while(n!==null);return!1}var wm=Error(ue(461)),ln=!1;function Sn(t,e,n,i){e.child=t===null?hx(e,null,n,i):Zs(e,t.child,n,i)}function i0(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Ys(e),i=mm(t,e,n,r,s,a),o=gm(),t!==null&&!ln?(vm(t,e,a),za(t,e,a)):(mt&&o&&om(e),e.flags|=1,Sn(t,e,i,a),e.child)}function a0(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!rm(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,eS(t,e,s,i,a)):(t=$c(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Cm(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:bl,n(r,i)&&t.ref===e.ref)return za(t,e,a)}return e.flags|=1,t=Ca(s,i),t.ref=e.ref,t.return=e,e.child=t}function eS(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(bl(s,i)&&t.ref===e.ref)if(ln=!1,e.pendingProps=i=s,Cm(t,a))t.flags&131072&&(ln=!0);else return e.lanes=t.lanes,za(t,e,a)}return wh(t,e,n,i,a)}function tS(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return s0(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Jc(e,s!==null?s.cachePool:null),s!==null?qg(e,s):Sh(),gx(e);else return i=e.lanes=536870912,s0(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Jc(e,s.cachePool),qg(e,s),Ja(),e.memoizedState=null):(t!==null&&Jc(e,null),Sh(),Ja());return Sn(t,e,a,n),e.child}function el(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function s0(t,e,n,i,a){var s=um();return s=s===null?null:{parent:on._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Jc(e,null),Sh(),gx(e),t!==null&&bo(t,e,i,!0),e.childLanes=a,null}function nu(t,e){return e=Ou({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function r0(t,e,n){return Zs(e,t.child,null,n),t=nu(e,e.pendingProps),t.flags|=2,ei(e),e.memoizedState=null,t}function Qb(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(mt){if(i.mode==="hidden")return t=nu(e,i),e.lanes=536870912,el(null,t);if(yh(e),(t=jt)?(t=qS(t,Ei),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_s!==null?{id:Ki,overflow:Qi}:null,retryLane:536870912,hydrationErrors:null},n=rx(t),n.return=e,e.child=n,Mn=e,jt=null)):t=null,t===null)throw xs(e);return e.lanes=536870912,null}return nu(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(yh(e),a)if(e.flags&256)e.flags&=-257,e=r0(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(ue(558));else if(ln||bo(t,e,n,!1),a=(n&t.childLanes)!==0,ln||a){if(i=zt,i!==null&&(r=U_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,sr(t,r),qn(i,t,r),wm;Bu(),e=r0(t,e,n)}else t=s.treeContext,jt=Ci(r.nextSibling),Mn=e,mt=!0,us=null,Ei=!1,t!==null&&lx(e,t),e=nu(e,i),e.flags|=4096;return e}return t=Ca(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function iu(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(ue(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function wh(t,e,n,i,a){return Ys(e),n=mm(t,e,n,i,void 0,a),i=gm(),t!==null&&!ln?(vm(t,e,a),za(t,e,a)):(mt&&i&&om(e),e.flags|=1,Sn(t,e,n,a),e.child)}function o0(t,e,n,i,a,s){return Ys(e),e.updateQueue=null,n=_x(e,i,n,a),vx(t),i=gm(),t!==null&&!ln?(vm(t,e,s),za(t,e,s)):(mt&&i&&om(e),e.flags|=1,Sn(t,e,n,s),e.child)}function l0(t,e,n,i,a){if(Ys(e),e.stateNode===null){var s=Gr,r=n.contextType;typeof r=="object"&&r!==null&&(s=bn(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Th,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},dm(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?bn(r):Gr,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Wf(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&Th.enqueueReplaceState(s,s.state,null),dl(e,i,s,a),fl(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=Qs(n,o);s.props=l;var c=s.context,d=n.contextType;r=Gr,typeof d=="object"&&d!==null&&(r=bn(d));var p=n.getDerivedStateFromProps;d=typeof p=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&t0(e,s,i,r),Ka=!1;var u=e.memoizedState;s.state=u,dl(e,i,s,a),fl(),c=e.memoizedState,o||u!==c||Ka?(typeof p=="function"&&(Wf(e,n,p,i),c=e.memoizedState),(l=Ka||e0(e,n,l,i,u,c,r))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,_h(t,e),r=e.memoizedProps,d=Qs(n,r),s.props=d,p=e.pendingProps,u=s.context,c=n.contextType,l=Gr,typeof c=="object"&&c!==null&&(l=bn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==p||u!==l)&&t0(e,s,i,l),Ka=!1,u=e.memoizedState,s.state=u,dl(e,i,s,a),fl();var m=e.memoizedState;r!==p||u!==m||Ka||t!==null&&t.dependencies!==null&&wu(t.dependencies)?(typeof o=="function"&&(Wf(e,n,o,i),m=e.memoizedState),(d=Ka||e0(e,n,d,i,u,m,l)||t!==null&&t.dependencies!==null&&wu(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,m,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,m,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=m),s.props=i,s.state=m,s.context=l,i=d):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,iu(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=Zs(e,t.child,null,a),e.child=Zs(e,null,n,a)):Sn(t,e,n,a),e.memoizedState=s.state,t=e.child):t=za(t,e,a),t}function c0(t,e,n,i){return qs(),e.flags|=256,Sn(t,e,n,i),e.child}var qf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(t){return{baseLanes:t,cachePool:ux()}}function Zf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ni),t}function nS(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:(tn.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(mt){if(a?$a(e):Ja(),(t=jt)?(t=qS(t,Ei),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:_s!==null?{id:Ki,overflow:Qi}:null,retryLane:536870912,hydrationErrors:null},n=rx(t),n.return=e,e.child=n,Mn=e,jt=null)):t=null,t===null)throw xs(e);return Gh(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(Ja(),a=e.mode,o=Ou({mode:"hidden",children:o},a),i=ks(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=Yf(n),i.childLanes=Zf(t,r,n),e.memoizedState=qf,el(null,i)):($a(e),Ch(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?($a(e),e.flags&=-257,e=Kf(t,e,n)):e.memoizedState!==null?(Ja(),e.child=t.child,e.flags|=128,e=null):(Ja(),o=i.fallback,a=e.mode,i=Ou({mode:"visible",children:i.children},a),o=ks(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,Zs(e,t.child,null,n),i=e.child,i.memoizedState=Yf(n),i.childLanes=Zf(t,r,n),e.memoizedState=qf,e=el(null,i));else if($a(e),Gh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(ue(419)),i.stack="",i.digest=r,Tl({value:i,source:null,stack:null}),e=Kf(t,e,n)}else if(ln||bo(t,e,n,!1),r=(n&t.childLanes)!==0,ln||r){if(r=zt,r!==null&&(i=U_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,sr(t,i),qn(r,t,i),wm;Hh(o)||Bu(),e=Kf(t,e,n)}else Hh(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,jt=Ci(o.nextSibling),Mn=e,mt=!0,us=null,Ei=!1,t!==null&&lx(e,t),e=Ch(e,i.children),e.flags|=4096);return e}return a?(Ja(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=Ca(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=Ca(c,o):(o=ks(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,el(null,i),i=e.child,o=t.child.memoizedState,o===null?o=Yf(n):(a=o.cachePool,a!==null?(l=on._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=ux(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Zf(t,r,n),e.memoizedState=qf,el(t.child,i)):($a(e),n=t.child,t=n.sibling,n=Ca(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function Ch(t,e){return e=Ou({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Ou(t,e){return t=ti(22,t,null,e),t.lanes=0,t}function Kf(t,e,n){return Zs(e,t.child,null,n),t=Ch(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function u0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),mh(t.return,e,n)}function Qf(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function iS(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=tn.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,Ft(tn,r),Sn(t,e,i,n),i=mt?El:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&u0(t,n,e);else if(t.tag===19)u0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Nu(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Qf(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Nu(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Qf(e,!0,n,null,s,i);break;case"together":Qf(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function za(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),ys|=e.lanes,!(n&e.childLanes))if(t!==null){if(bo(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(ue(153));if(e.child!==null){for(t=e.child,n=Ca(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Ca(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Cm(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&wu(t)))}function $b(t,e,n){switch(e.tag){case 3:Su(e,e.stateNode.containerInfo),Qa(e,on,t.memoizedState.cache),qs();break;case 27:case 5:nh(e);break;case 4:Su(e,e.stateNode.containerInfo);break;case 10:Qa(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,yh(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?($a(e),e.flags|=128,null):n&e.child.childLanes?nS(t,e,n):($a(e),t=za(t,e,n),t!==null?t.sibling:null);$a(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(bo(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return iS(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ft(tn,tn.current),i)break;return null;case 22:return e.lanes=0,tS(t,e,n,e.pendingProps);case 24:Qa(e,on,t.memoizedState.cache)}return za(t,e,n)}function aS(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)ln=!0;else{if(!Cm(t,n)&&!(e.flags&128))return ln=!1,$b(t,e,n);ln=!!(t.flags&131072)}else ln=!1,mt&&e.flags&1048576&&ox(e,El,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Os(e.elementType),e.type=t,typeof t=="function")rm(t)?(i=Qs(t,i),e.tag=1,e=l0(null,e,t,i,n)):(e.tag=0,e=wh(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Wp){e.tag=11,e=i0(null,e,t,i,n);break e}else if(a===qp){e.tag=14,e=a0(null,e,t,i,n);break e}}throw e=eh(t)||t,Error(ue(306,e,""))}}return e;case 0:return wh(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=Qs(i,e.pendingProps),l0(t,e,i,a,n);case 3:e:{if(Su(e,e.stateNode.containerInfo),t===null)throw Error(ue(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,_h(t,e),dl(e,i,null,n);var r=e.memoizedState;if(i=r.cache,Qa(e,on,i),i!==s.cache&&gh(e,[on],n,!0),fl(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=c0(t,e,i,n);break e}else if(i!==a){a=bi(Error(ue(424)),e),Tl(a),e=c0(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(jt=Ci(t.firstChild),Mn=e,mt=!0,us=null,Ei=!0,n=hx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(qs(),i===a){e=za(t,e,n);break e}Sn(t,e,i,n)}e=e.child}return e;case 26:return iu(t,e),t===null?(n=N0(e.type,null,e.pendingProps,null))?e.memoizedState=n:mt||(n=e.type,t=e.pendingProps,i=ku(cs.current).createElement(n),i[yn]=e,i[Zn]=t,An(i,n,t),vn(i),e.stateNode=i):e.memoizedState=N0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return nh(e),t===null&&mt&&(i=e.stateNode=YS(e.type,e.pendingProps,cs.current),Mn=e,Ei=!0,a=jt,Es(e.type)?(kh=a,jt=Ci(i.firstChild)):jt=a),Sn(t,e,e.pendingProps.children,n),iu(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&mt&&((a=i=jt)&&(i=CE(i,e.type,e.pendingProps,Ei),i!==null?(e.stateNode=i,Mn=e,jt=Ci(i.firstChild),Ei=!1,a=!0):a=!1),a||xs(e)),nh(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,Bh(a,s)?i=null:r!==null&&Bh(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=mm(t,e,Vb,null,null,n),Dl._currentValue=a),iu(t,e),Sn(t,e,i,n),e.child;case 6:return t===null&&mt&&((t=n=jt)&&(n=RE(n,e.pendingProps,Ei),n!==null?(e.stateNode=n,Mn=e,jt=null,t=!0):t=!1),t||xs(e)),null;case 13:return nS(t,e,n);case 4:return Su(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Zs(e,null,i,n):Sn(t,e,i,n),e.child;case 11:return i0(t,e,e.type,e.pendingProps,n);case 7:return Sn(t,e,e.pendingProps,n),e.child;case 8:return Sn(t,e,e.pendingProps.children,n),e.child;case 12:return Sn(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,Qa(e,e.type,i.value),Sn(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,Ys(e),a=bn(a),i=i(a),e.flags|=1,Sn(t,e,i,n),e.child;case 14:return a0(t,e,e.type,e.pendingProps,n);case 15:return eS(t,e,e.type,e.pendingProps,n);case 19:return iS(t,e,n);case 31:return Qb(t,e,n);case 22:return tS(t,e,n,e.pendingProps);case 24:return Ys(e),i=bn(on),t===null?(a=um(),a===null&&(a=zt,s=cm(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},dm(e),Qa(e,on,a)):(t.lanes&n&&(_h(t,e),dl(e,null,null,n),fl()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Qa(e,on,i)):(i=s.cache,Qa(e,on,i),i!==a.cache&&gh(e,[on],n,!0))),Sn(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(ue(156,e.tag))}function fa(t){t.flags|=4}function $f(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(CS())t.flags|=8192;else throw js=Cu,fm}else t.flags&=-16777217}function f0(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!QS(e))if(CS())t.flags|=8192;else throw js=Cu,fm}function uc(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?R_():536870912,t.lanes|=e,co|=e)}function Bo(t,e){if(!mt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Vt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Jb(t,e,n){var i=e.pendingProps;switch(lm(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Vt(e),null;case 1:return Vt(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Ra(on),io(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(fr(e)?fa(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Vf())),Vt(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(fa(e),s!==null?(Vt(e),f0(e,s)):(Vt(e),$f(e,a,null,i,n))):s?s!==t.memoizedState?(fa(e),Vt(e),f0(e,s)):(Vt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&fa(e),Vt(e),$f(e,a,t,i,n)),null;case 27:if(yu(e),n=cs.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&fa(e);else{if(!i){if(e.stateNode===null)throw Error(ue(166));return Vt(e),null}t=ea.current,fr(e)?Hg(e):(t=YS(a,i,n),e.stateNode=t,fa(e))}return Vt(e),null;case 5:if(yu(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&fa(e);else{if(!i){if(e.stateNode===null)throw Error(ue(166));return Vt(e),null}if(s=ea.current,fr(e))Hg(e);else{var r=ku(cs.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[yn]=e,s[Zn]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(An(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&fa(e)}}return Vt(e),$f(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&fa(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ue(166));if(t=cs.current,fr(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=Mn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[yn]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||jS(t.nodeValue,n)),t||xs(e,!0)}else t=ku(t).createTextNode(i),t[yn]=e,e.stateNode=t}return Vt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=fr(e),n!==null){if(t===null){if(!i)throw Error(ue(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ue(557));t[yn]=e}else qs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),t=!1}else n=Vf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ei(e),e):(ei(e),null);if(e.flags&128)throw Error(ue(558))}return Vt(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=fr(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(ue(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(ue(317));a[yn]=e}else qs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Vt(e),a=!1}else a=Vf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(ei(e),e):(ei(e),null)}return ei(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),uc(e,e.updateQueue),Vt(e),null);case 4:return io(),t===null&&Pm(e.stateNode.containerInfo),Vt(e),null;case 10:return Ra(e.type),Vt(e),null;case 19:if(xn(tn),i=e.memoizedState,i===null)return Vt(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)Bo(i,!1);else{if(Kt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Nu(t),s!==null){for(e.flags|=128,Bo(i,!1),t=s.updateQueue,e.updateQueue=t,uc(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)sx(n,t),n=n.sibling;return Ft(tn,tn.current&1|2),mt&&ya(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&ii()>zu&&(e.flags|=128,a=!0,Bo(i,!1),e.lanes=4194304)}else{if(!a)if(t=Nu(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,uc(e,t),Bo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!mt)return Vt(e),null}else 2*ii()-i.renderingStartTime>zu&&n!==536870912&&(e.flags|=128,a=!0,Bo(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ii(),t.sibling=null,n=tn.current,Ft(tn,a?n&1|2:n&1),mt&&ya(e,i.treeForkCount),t):(Vt(e),null);case 22:case 23:return ei(e),hm(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(Vt(e),e.subtreeFlags&6&&(e.flags|=8192)):Vt(e),n=e.updateQueue,n!==null&&uc(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&xn(Vs),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Ra(on),Vt(e),null;case 25:return null;case 30:return null}throw Error(ue(156,e.tag))}function eE(t,e){switch(lm(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ra(on),io(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return yu(e),null;case 31:if(e.memoizedState!==null){if(ei(e),e.alternate===null)throw Error(ue(340));qs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ei(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ue(340));qs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return xn(tn),null;case 4:return io(),null;case 10:return Ra(e.type),null;case 22:case 23:return ei(e),hm(),t!==null&&xn(Vs),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Ra(on),null;case 25:return null;default:return null}}function sS(t,e){switch(lm(e),e.tag){case 3:Ra(on),io();break;case 26:case 27:case 5:yu(e);break;case 4:io();break;case 31:e.memoizedState!==null&&ei(e);break;case 13:ei(e);break;case 19:xn(tn);break;case 10:Ra(e.type);break;case 22:case 23:ei(e),hm(),t!==null&&xn(Vs);break;case 24:Ra(on)}}function Wl(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){Ut(e,e.return,o)}}function Ss(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(d){Ut(a,l,d)}}}i=i.next}while(i!==s)}}catch(d){Ut(e,e.return,d)}}function rS(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{mx(e,n)}catch(i){Ut(t,t.return,i)}}}function oS(t,e,n){n.props=Qs(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){Ut(t,e,i)}}function pl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){Ut(t,e,a)}}function $i(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){Ut(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Ut(t,e,a)}else n.current=null}function lS(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){Ut(t,t.return,a)}}function Jf(t,e,n){try{var i=t.stateNode;ME(i,t.type,n,e),i[Zn]=e}catch(a){Ut(t,t.return,a)}}function cS(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Es(t.type)||t.tag===4}function ed(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||cS(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Es(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ta));else if(i!==4&&(i===27&&Es(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Rh(t,e,n),t=t.sibling;t!==null;)Rh(t,e,n),t=t.sibling}function Pu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&Es(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Pu(t,e,n),t=t.sibling;t!==null;)Pu(t,e,n),t=t.sibling}function uS(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);An(e,i,n),e[yn]=t,e[Zn]=n}catch(s){Ut(t,t.return,s)}}var Ma=!1,rn=!1,td=!1,d0=typeof WeakSet=="function"?WeakSet:Set,gn=null;function tE(t,e){if(t=t.containerInfo,zh=Wu,t=Q_(t),im(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,d=0,p=t,u=null;t:for(;;){for(var m;p!==n||a!==0&&p.nodeType!==3||(o=r+a),p!==s||i!==0&&p.nodeType!==3||(l=r+i),p.nodeType===3&&(r+=p.nodeValue.length),(m=p.firstChild)!==null;)u=p,p=m;for(;;){if(p===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++d===i&&(l=r),(m=p.nextSibling)!==null)break;p=u,u=p.parentNode}p=m}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ih={focusedElem:t,selectionRange:n},Wu=!1,gn=e;gn!==null;)if(e=gn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,gn=t;else for(;gn!==null;){switch(e=gn,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=Qs(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(b){Ut(n,n.return,b)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Fh(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Fh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(ue(163))}if(t=e.sibling,t!==null){t.return=e.return,gn=t;break}gn=e.return}}function fS(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:ha(t,n),i&4&&Wl(5,n);break;case 1:if(ha(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){Ut(n,n.return,r)}else{var a=Qs(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){Ut(n,n.return,r)}}i&64&&rS(n),i&512&&pl(n,n.return);break;case 3:if(ha(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{mx(t,e)}catch(r){Ut(n,n.return,r)}}break;case 27:e===null&&i&4&&uS(n);case 26:case 5:ha(t,n),e===null&&i&4&&lS(n),i&512&&pl(n,n.return);break;case 12:ha(t,n);break;case 31:ha(t,n),i&4&&pS(t,n);break;case 13:ha(t,n),i&4&&mS(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=uE.bind(null,n),NE(t,n))));break;case 22:if(i=n.memoizedState!==null||Ma,!i){e=e!==null&&e.memoizedState!==null||rn,a=Ma;var s=rn;Ma=i,(rn=e)&&!s?xa(t,n,(n.subtreeFlags&8772)!==0):ha(t,n),Ma=a,rn=s}break;case 30:break;default:ha(t,n)}}function dS(t){var e=t.alternate;e!==null&&(t.alternate=null,dS(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Qp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var qt=null,Xn=!1;function da(t,e,n){for(n=n.child;n!==null;)hS(t,e,n),n=n.sibling}function hS(t,e,n){if(ai&&typeof ai.onCommitFiberUnmount=="function")try{ai.onCommitFiberUnmount(Fl,n)}catch{}switch(n.tag){case 26:rn||$i(n,e),da(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:rn||$i(n,e);var i=qt,a=Xn;Es(n.type)&&(qt=n.stateNode,Xn=!1),da(t,e,n),_l(n.stateNode),qt=i,Xn=a;break;case 5:rn||$i(n,e);case 6:if(i=qt,a=Xn,qt=null,da(t,e,n),qt=i,Xn=a,qt!==null)if(Xn)try{(qt.nodeType===9?qt.body:qt.nodeName==="HTML"?qt.ownerDocument.body:qt).removeChild(n.stateNode)}catch(s){Ut(n,e,s)}else try{qt.removeChild(n.stateNode)}catch(s){Ut(n,e,s)}break;case 18:qt!==null&&(Xn?(t=qt,T0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),po(t)):T0(qt,n.stateNode));break;case 4:i=qt,a=Xn,qt=n.stateNode.containerInfo,Xn=!0,da(t,e,n),qt=i,Xn=a;break;case 0:case 11:case 14:case 15:Ss(2,n,e),rn||Ss(4,n,e),da(t,e,n);break;case 1:rn||($i(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&oS(n,e,i)),da(t,e,n);break;case 21:da(t,e,n);break;case 22:rn=(i=rn)||n.memoizedState!==null,da(t,e,n),rn=i;break;default:da(t,e,n)}}function pS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{po(t)}catch(n){Ut(e,e.return,n)}}}function mS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{po(t)}catch(n){Ut(e,e.return,n)}}function nE(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new d0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new d0),e;default:throw Error(ue(435,t.tag))}}function fc(t,e){var n=nE(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=fE.bind(null,t,i);i.then(a,a)}})}function kn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(Es(o.type)){qt=o.stateNode,Xn=!1;break e}break;case 5:qt=o.stateNode,Xn=!1;break e;case 3:case 4:qt=o.stateNode.containerInfo,Xn=!0;break e}o=o.return}if(qt===null)throw Error(ue(160));hS(s,r,a),qt=null,Xn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)gS(e,t),e=e.sibling}var Ii=null;function gS(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:kn(e,t),Vn(t),i&4&&(Ss(3,t,t.return),Wl(3,t),Ss(5,t,t.return));break;case 1:kn(e,t),Vn(t),i&512&&(rn||n===null||$i(n,n.return)),i&64&&Ma&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Ii;if(kn(e,t),Vn(t),i&512&&(rn||n===null||$i(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[kl]||s[yn]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),An(s,i,n),s[yn]=t,vn(s),i=s;break e;case"link":var r=U0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),An(s,i,n),a.head.appendChild(s);break;case"meta":if(r=U0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),An(s,i,n),a.head.appendChild(s);break;default:throw Error(ue(468,i))}s[yn]=t,vn(s),i=s}t.stateNode=i}else L0(a,t.type,t.stateNode);else t.stateNode=D0(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?L0(a,t.type,t.stateNode):D0(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&Jf(t,t.memoizedProps,n.memoizedProps)}break;case 27:kn(e,t),Vn(t),i&512&&(rn||n===null||$i(n,n.return)),n!==null&&i&4&&Jf(t,t.memoizedProps,n.memoizedProps);break;case 5:if(kn(e,t),Vn(t),i&512&&(rn||n===null||$i(n,n.return)),t.flags&32){a=t.stateNode;try{so(a,"")}catch(g){Ut(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,Jf(t,a,n!==null?n.memoizedProps:a)),i&1024&&(td=!0);break;case 6:if(kn(e,t),Vn(t),i&4){if(t.stateNode===null)throw Error(ue(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){Ut(t,t.return,g)}}break;case 3:if(ru=null,a=Ii,Ii=Vu(e.containerInfo),kn(e,t),Ii=a,Vn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{po(e.containerInfo)}catch(g){Ut(t,t.return,g)}td&&(td=!1,vS(t));break;case 4:i=Ii,Ii=Vu(t.stateNode.containerInfo),kn(e,t),Vn(t),Ii=i;break;case 12:kn(e,t),Vn(t);break;case 31:kn(e,t),Vn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,fc(t,i)));break;case 13:kn(e,t),Vn(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(_f=ii()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,fc(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Ma,d=rn;if(Ma=c||a,rn=d||l,kn(e,t),rn=d,Ma=c,Vn(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||Ma||rn||Ps(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var p=l.memoizedProps.style,u=p!=null&&p.hasOwnProperty("display")?p.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){Ut(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){Ut(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var m=l.stateNode;a?A0(m,!0):A0(l.stateNode,!1)}catch(g){Ut(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,fc(t,n))));break;case 19:kn(e,t),Vn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,fc(t,i)));break;case 30:break;case 21:break;default:kn(e,t),Vn(t)}}function Vn(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(cS(i)){n=i;break}i=i.return}if(n==null)throw Error(ue(160));switch(n.tag){case 27:var a=n.stateNode,s=ed(t);Pu(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(so(r,""),n.flags&=-33);var o=ed(t);Pu(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=ed(t);Rh(t,c,l);break;default:throw Error(ue(161))}}catch(d){Ut(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function vS(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;vS(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function ha(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)fS(t,e.alternate,e),e=e.sibling}function Ps(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Ss(4,e,e.return),Ps(e);break;case 1:$i(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&oS(e,e.return,n),Ps(e);break;case 27:_l(e.stateNode);case 26:case 5:$i(e,e.return),Ps(e);break;case 22:e.memoizedState===null&&Ps(e);break;case 30:Ps(e);break;default:Ps(e)}t=t.sibling}}function xa(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:xa(a,s,n),Wl(4,s);break;case 1:if(xa(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){Ut(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)px(l[a],o)}catch(c){Ut(i,i.return,c)}}n&&r&64&&rS(s),pl(s,s.return);break;case 27:uS(s);case 26:case 5:xa(a,s,n),n&&i===null&&r&4&&lS(s),pl(s,s.return);break;case 12:xa(a,s,n);break;case 31:xa(a,s,n),n&&r&4&&pS(a,s);break;case 13:xa(a,s,n),n&&r&4&&mS(a,s);break;case 22:s.memoizedState===null&&xa(a,s,n),pl(s,s.return);break;case 30:break;default:xa(a,s,n)}e=e.sibling}}function Rm(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&jl(n))}function Nm(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&jl(t))}function Li(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)_S(t,e,n,i),e=e.sibling}function _S(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Li(t,e,n,i),a&2048&&Wl(9,e);break;case 1:Li(t,e,n,i);break;case 3:Li(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&jl(t)));break;case 12:if(a&2048){Li(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){Ut(e,e.return,l)}}else Li(t,e,n,i);break;case 31:Li(t,e,n,i);break;case 13:Li(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?Li(t,e,n,i):ml(t,e):s._visibility&2?Li(t,e,n,i):(s._visibility|=2,Dr(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&Rm(r,e);break;case 24:Li(t,e,n,i),a&2048&&Nm(e.alternate,e);break;default:Li(t,e,n,i)}}function Dr(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Dr(s,r,o,l,a),Wl(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?Dr(s,r,o,l,a):ml(s,r):(d._visibility|=2,Dr(s,r,o,l,a)),a&&c&2048&&Rm(r.alternate,r);break;case 24:Dr(s,r,o,l,a),a&&c&2048&&Nm(r.alternate,r);break;default:Dr(s,r,o,l,a)}e=e.sibling}}function ml(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:ml(n,i),a&2048&&Rm(i.alternate,i);break;case 24:ml(n,i),a&2048&&Nm(i.alternate,i);break;default:ml(n,i)}e=e.sibling}}var tl=8192;function dr(t,e,n){if(t.subtreeFlags&tl)for(t=t.child;t!==null;)xS(t,e,n),t=t.sibling}function xS(t,e,n){switch(t.tag){case 26:dr(t,e,n),t.flags&tl&&t.memoizedState!==null&&kE(n,Ii,t.memoizedState,t.memoizedProps);break;case 5:dr(t,e,n);break;case 3:case 4:var i=Ii;Ii=Vu(t.stateNode.containerInfo),dr(t,e,n),Ii=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=tl,tl=16777216,dr(t,e,n),tl=i):dr(t,e,n));break;default:dr(t,e,n)}}function SS(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Fo(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];gn=i,MS(i,t)}SS(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)yS(t),t=t.sibling}function yS(t){switch(t.tag){case 0:case 11:case 15:Fo(t),t.flags&2048&&Ss(9,t,t.return);break;case 3:Fo(t);break;case 12:Fo(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,au(t)):Fo(t);break;default:Fo(t)}}function au(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];gn=i,MS(i,t)}SS(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Ss(8,e,e.return),au(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,au(e));break;default:au(e)}t=t.sibling}}function MS(t,e){for(;gn!==null;){var n=gn;switch(n.tag){case 0:case 11:case 15:Ss(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:jl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,gn=i;else e:for(n=t;gn!==null;){i=gn;var a=i.sibling,s=i.return;if(dS(i),i===n){gn=null;break e}if(a!==null){a.return=s,gn=a;break e}gn=s}}}var iE={getCacheForType:function(t){var e=bn(on),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return bn(on).controller.signal}},aE=typeof WeakMap=="function"?WeakMap:Map,St=0,zt=null,lt=null,ft=0,Dt=0,Jn=null,as=!1,To=!1,Dm=!1,Ia=0,Kt=0,ys=0,Xs=0,Um=0,ni=0,co=0,gl=null,Wn=null,Nh=!1,_f=0,bS=0,zu=1/0,Iu=null,hs=null,cn=0,ps=null,uo=null,Na=0,Dh=0,Uh=null,ES=null,vl=0,Lh=null;function ri(){return St&2&&ft!==0?ft&-ft:Ve.T!==null?Om():L_()}function TS(){if(ni===0)if(!(ft&536870912)||mt){var t=ic;ic<<=1,!(ic&3932160)&&(ic=262144),ni=t}else ni=536870912;return t=li.current,t!==null&&(t.flags|=32),ni}function qn(t,e,n){(t===zt&&(Dt===2||Dt===9)||t.cancelPendingCommit!==null)&&(fo(t,0),ss(t,ft,ni,!1)),Gl(t,n),(!(St&2)||t!==zt)&&(t===zt&&(!(St&2)&&(Xs|=n),Kt===4&&ss(t,ft,ni,!1)),sa(t))}function AS(t,e,n){if(St&6)throw Error(ue(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Hl(t,e),a=i?oE(t,e):nd(t,e,!0),s=i;do{if(a===0){To&&!i&&ss(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!sE(n)){a=nd(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=gl;var l=o.current.memoizedState.isDehydrated;if(l&&(fo(o,r).flags|=256),r=nd(o,r,!1),r!==2){if(Dm&&!l){o.errorRecoveryDisabledLanes|=s,Xs|=s,a=4;break e}s=Wn,Wn=a,s!==null&&(Wn===null?Wn=s:Wn.push.apply(Wn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){fo(t,0),ss(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(ue(345));case 4:if((e&4194048)!==e)break;case 6:ss(i,e,ni,!as);break e;case 2:Wn=null;break;case 3:case 5:break;default:throw Error(ue(329))}if((e&62914560)===e&&(a=_f+300-ii(),10<a)){if(ss(i,e,ni,!as),of(i,0,!0)!==0)break e;Na=e,i.timeoutHandle=WS(h0.bind(null,i,n,Wn,Iu,Nh,e,ni,Xs,co,as,s,"Throttled",-0,0),a);break e}h0(i,n,Wn,Iu,Nh,e,ni,Xs,co,as,s,null,-0,0)}}break}while(!0);sa(t)}function h0(t,e,n,i,a,s,r,o,l,c,d,p,u,m){if(t.timeoutHandle=-1,p=e.subtreeFlags,p&8192||(p&16785408)===16785408){p={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ta},xS(e,s,p);var g=(s&62914560)===s?_f-ii():(s&4194048)===s?bS-ii():0;if(g=VE(p,g),g!==null){Na=s,t.cancelPendingCommit=g(m0.bind(null,t,e,s,n,i,a,r,o,l,d,p,null,u,m)),ss(t,s,r,!c);return}}m0(t,e,s,n,i,a,r,o,l)}function sE(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!oi(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ss(t,e,n,i){e&=~Um,e&=~Xs,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-si(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&N_(t,n,e)}function xf(){return St&6?!0:(ql(0),!1)}function Lm(){if(lt!==null){if(Dt===0)var t=lt.return;else t=lt,Aa=rr=null,_m(t),$r=null,Al=0,t=lt;for(;t!==null;)sS(t.alternate,t),t=t.return;lt=null}}function fo(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,TE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Na=0,Lm(),zt=t,lt=n=Ca(t.current,null),ft=e,Dt=0,Jn=null,as=!1,To=Hl(t,e),Dm=!1,co=ni=Um=Xs=ys=Kt=0,Wn=gl=null,Nh=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-si(i),s=1<<a;e|=t[a],i&=~s}return Ia=e,ff(),n}function wS(t,e){nt=null,Ve.H=Cl,e===Eo||e===hf?(e=Xg(),Dt=3):e===fm?(e=Xg(),Dt=4):Dt=e===wm?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Jn=e,lt===null&&(Kt=1,Lu(t,bi(e,t.current)))}function CS(){var t=li.current;return t===null?!0:(ft&4194048)===ft?wi===null:(ft&62914560)===ft||ft&536870912?t===wi:!1}function RS(){var t=Ve.H;return Ve.H=Cl,t===null?Cl:t}function NS(){var t=Ve.A;return Ve.A=iE,t}function Bu(){Kt=4,as||(ft&4194048)!==ft&&li.current!==null||(To=!0),!(ys&134217727)&&!(Xs&134217727)||zt===null||ss(zt,ft,ni,!1)}function nd(t,e,n){var i=St;St|=2;var a=RS(),s=NS();(zt!==t||ft!==e)&&(Iu=null,fo(t,e)),e=!1;var r=Kt;e:do try{if(Dt!==0&&lt!==null){var o=lt,l=Jn;switch(Dt){case 8:Lm(),r=6;break e;case 3:case 2:case 9:case 6:li.current===null&&(e=!0);var c=Dt;if(Dt=0,Jn=null,jr(t,o,l,c),n&&To){r=0;break e}break;default:c=Dt,Dt=0,Jn=null,jr(t,o,l,c)}}rE(),r=Kt;break}catch(d){wS(t,d)}while(!0);return e&&t.shellSuspendCounter++,Aa=rr=null,St=i,Ve.H=a,Ve.A=s,lt===null&&(zt=null,ft=0,ff()),r}function rE(){for(;lt!==null;)DS(lt)}function oE(t,e){var n=St;St|=2;var i=RS(),a=NS();zt!==t||ft!==e?(Iu=null,zu=ii()+500,fo(t,e)):To=Hl(t,e);e:do try{if(Dt!==0&&lt!==null){e=lt;var s=Jn;t:switch(Dt){case 1:Dt=0,Jn=null,jr(t,e,s,1);break;case 2:case 9:if(jg(s)){Dt=0,Jn=null,p0(e);break}e=function(){Dt!==2&&Dt!==9||zt!==t||(Dt=7),sa(t)},s.then(e,e);break e;case 3:Dt=7;break e;case 4:Dt=5;break e;case 7:jg(s)?(Dt=0,Jn=null,p0(e)):(Dt=0,Jn=null,jr(t,e,s,7));break;case 5:var r=null;switch(lt.tag){case 26:r=lt.memoizedState;case 5:case 27:var o=lt;if(r?QS(r):o.stateNode.complete){Dt=0,Jn=null;var l=o.sibling;if(l!==null)lt=l;else{var c=o.return;c!==null?(lt=c,Sf(c)):lt=null}break t}}Dt=0,Jn=null,jr(t,e,s,5);break;case 6:Dt=0,Jn=null,jr(t,e,s,6);break;case 8:Lm(),Kt=6;break e;default:throw Error(ue(462))}}lE();break}catch(d){wS(t,d)}while(!0);return Aa=rr=null,Ve.H=i,Ve.A=a,St=n,lt!==null?0:(zt=null,ft=0,ff(),Kt)}function lE(){for(;lt!==null&&!DM();)DS(lt)}function DS(t){var e=aS(t.alternate,t,Ia);t.memoizedProps=t.pendingProps,e===null?Sf(t):lt=e}function p0(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=o0(n,e,e.pendingProps,e.type,void 0,ft);break;case 11:e=o0(n,e,e.pendingProps,e.type.render,e.ref,ft);break;case 5:_m(e);default:sS(n,e),e=lt=sx(e,Ia),e=aS(n,e,Ia)}t.memoizedProps=t.pendingProps,e===null?Sf(t):lt=e}function jr(t,e,n,i){Aa=rr=null,_m(e),$r=null,Al=0;var a=e.return;try{if(Kb(t,a,e,n,ft)){Kt=1,Lu(t,bi(n,t.current)),lt=null;return}}catch(s){if(a!==null)throw lt=a,s;Kt=1,Lu(t,bi(n,t.current)),lt=null;return}e.flags&32768?(mt||i===1?t=!0:To||ft&536870912?t=!1:(as=t=!0,(i===2||i===9||i===3||i===6)&&(i=li.current,i!==null&&i.tag===13&&(i.flags|=16384))),US(e,t)):Sf(e)}function Sf(t){var e=t;do{if(e.flags&32768){US(e,as);return}t=e.return;var n=Jb(e.alternate,e,Ia);if(n!==null){lt=n;return}if(e=e.sibling,e!==null){lt=e;return}lt=e=t}while(e!==null);Kt===0&&(Kt=5)}function US(t,e){do{var n=eE(t.alternate,t);if(n!==null){n.flags&=32767,lt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){lt=t;return}lt=t=n}while(t!==null);Kt=6,lt=null}function m0(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do yf();while(cn!==0);if(St&6)throw Error(ue(327));if(e!==null){if(e===t.current)throw Error(ue(177));if(s=e.lanes|e.childLanes,s|=am,GM(t,n,s,r,o,l),t===zt&&(lt=zt=null,ft=0),uo=e,ps=t,Na=n,Dh=s,Uh=a,ES=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,dE(Mu,function(){return IS(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=Ve.T,Ve.T=null,a=yt.p,yt.p=2,r=St,St|=4;try{tE(t,e,n)}finally{St=r,yt.p=a,Ve.T=i}}cn=1,LS(),OS(),PS()}}function LS(){if(cn===1){cn=0;var t=ps,e=uo,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Ve.T,Ve.T=null;var i=yt.p;yt.p=2;var a=St;St|=4;try{gS(e,t);var s=Ih,r=Q_(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&K_(o.ownerDocument.documentElement,o)){if(l!==null&&im(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var p=o.ownerDocument||document,u=p&&p.defaultView||window;if(u.getSelection){var m=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),_=l.end===void 0?b:Math.min(l.end,g);!m.extend&&b>_&&(r=_,_=b,b=r);var h=Ig(o,b),v=Ig(o,_);if(h&&v&&(m.rangeCount!==1||m.anchorNode!==h.node||m.anchorOffset!==h.offset||m.focusNode!==v.node||m.focusOffset!==v.offset)){var S=p.createRange();S.setStart(h.node,h.offset),m.removeAllRanges(),b>_?(m.addRange(S),m.extend(v.node,v.offset)):(S.setEnd(v.node,v.offset),m.addRange(S))}}}}for(p=[],m=o;m=m.parentNode;)m.nodeType===1&&p.push({element:m,left:m.scrollLeft,top:m.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<p.length;o++){var x=p[o];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}Wu=!!zh,Ih=zh=null}finally{St=a,yt.p=i,Ve.T=n}}t.current=e,cn=2}}function OS(){if(cn===2){cn=0;var t=ps,e=uo,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Ve.T,Ve.T=null;var i=yt.p;yt.p=2;var a=St;St|=4;try{fS(t,e.alternate,e)}finally{St=a,yt.p=i,Ve.T=n}}cn=3}}function PS(){if(cn===4||cn===3){cn=0,UM();var t=ps,e=uo,n=Na,i=ES;e.subtreeFlags&10256||e.flags&10256?cn=5:(cn=0,uo=ps=null,zS(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(hs=null),Kp(n),e=e.stateNode,ai&&typeof ai.onCommitFiberRoot=="function")try{ai.onCommitFiberRoot(Fl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=Ve.T,a=yt.p,yt.p=2,Ve.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{Ve.T=e,yt.p=a}}Na&3&&yf(),sa(t),a=t.pendingLanes,n&261930&&a&42?t===Lh?vl++:(vl=0,Lh=t):vl=0,ql(0)}}function zS(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,jl(e)))}function yf(){return LS(),OS(),PS(),IS()}function IS(){if(cn!==5)return!1;var t=ps,e=Dh;Dh=0;var n=Kp(Na),i=Ve.T,a=yt.p;try{yt.p=32>n?32:n,Ve.T=null,n=Uh,Uh=null;var s=ps,r=Na;if(cn=0,uo=ps=null,Na=0,St&6)throw Error(ue(331));var o=St;if(St|=4,yS(s.current),_S(s,s.current,r,n),St=o,ql(0,!1),ai&&typeof ai.onPostCommitFiberRoot=="function")try{ai.onPostCommitFiberRoot(Fl,s)}catch{}return!0}finally{yt.p=a,Ve.T=i,zS(t,e)}}function g0(t,e,n){e=bi(n,e),e=Ah(t.stateNode,e,2),t=ds(t,e,2),t!==null&&(Gl(t,2),sa(t))}function Ut(t,e,n){if(t.tag===3)g0(t,t,n);else for(;e!==null;){if(e.tag===3){g0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(hs===null||!hs.has(i))){t=bi(n,t),n=$x(2),i=ds(e,n,2),i!==null&&(Jx(n,i,e,t),Gl(i,2),sa(i));break}}e=e.return}}function id(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new aE;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(Dm=!0,a.add(n),t=cE.bind(null,t,e,n),e.then(t,t))}function cE(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,zt===t&&(ft&n)===n&&(Kt===4||Kt===3&&(ft&62914560)===ft&&300>ii()-_f?!(St&2)&&fo(t,0):Um|=n,co===ft&&(co=0)),sa(t)}function BS(t,e){e===0&&(e=R_()),t=sr(t,e),t!==null&&(Gl(t,e),sa(t))}function uE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),BS(t,n)}function fE(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(ue(314))}i!==null&&i.delete(e),BS(t,n)}function dE(t,e){return Yp(t,e)}var Fu=null,Ur=null,Oh=!1,Hu=!1,ad=!1,rs=0;function sa(t){t!==Ur&&t.next===null&&(Ur===null?Fu=Ur=t:Ur=Ur.next=t),Hu=!0,Oh||(Oh=!0,pE())}function ql(t,e){if(!ad&&Hu){ad=!0;do for(var n=!1,i=Fu;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-si(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,v0(i,s))}else s=ft,s=of(i,i===zt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Hl(i,s)||(n=!0,v0(i,s));i=i.next}while(n);ad=!1}}function hE(){FS()}function FS(){Hu=Oh=!1;var t=0;rs!==0&&EE()&&(t=rs);for(var e=ii(),n=null,i=Fu;i!==null;){var a=i.next,s=HS(i,e);s===0?(i.next=null,n===null?Fu=a:n.next=a,a===null&&(Ur=n)):(n=i,(t!==0||s&3)&&(Hu=!0)),i=a}cn!==0&&cn!==5||ql(t),rs!==0&&(rs=0)}function HS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-si(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=HM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=zt,n=ft,n=of(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(Dt===2||Dt===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&Uf(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Hl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&Uf(i),Kp(n)){case 2:case 8:n=w_;break;case 32:n=Mu;break;case 268435456:n=C_;break;default:n=Mu}return i=GS.bind(null,t),n=Yp(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&Uf(i),t.callbackPriority=2,t.callbackNode=null,2}function GS(t,e){if(cn!==0&&cn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(yf()&&t.callbackNode!==n)return null;var i=ft;return i=of(t,t===zt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(AS(t,i,e),HS(t,ii()),t.callbackNode!=null&&t.callbackNode===n?GS.bind(null,t):null)}function v0(t,e){if(yf())return null;AS(t,e,!0)}function pE(){AE(function(){St&6?Yp(A_,hE):FS()})}function Om(){if(rs===0){var t=ro;t===0&&(t=nc,nc<<=1,!(nc&261888)&&(nc=256)),rs=t}return rs}function _0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Zc(""+t)}function x0(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function mE(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=_0((a[Zn]||null).action),r=i.submitter;r&&(e=(e=r[Zn]||null)?_0(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new lf("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(rs!==0){var l=r?x0(a,r):new FormData(a);Eh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?x0(a,r):new FormData(a),Eh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var sd=0;sd<dh.length;sd++){var rd=dh[sd],gE=rd.toLowerCase(),vE=rd[0].toUpperCase()+rd.slice(1);Hi(gE,"on"+vE)}Hi(J_,"onAnimationEnd");Hi(ex,"onAnimationIteration");Hi(tx,"onAnimationStart");Hi("dblclick","onDoubleClick");Hi("focusin","onFocus");Hi("focusout","onBlur");Hi(Lb,"onTransitionRun");Hi(Ob,"onTransitionStart");Hi(Pb,"onTransitionCancel");Hi(nx,"onTransitionEnd");ao("onMouseEnter",["mouseout","mouseover"]);ao("onMouseLeave",["mouseout","mouseover"]);ao("onPointerEnter",["pointerout","pointerover"]);ao("onPointerLeave",["pointerout","pointerover"]);nr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));nr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));nr("onBeforeInput",["compositionend","keypress","textInput","paste"]);nr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));nr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));nr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Rl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),_E=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rl));function kS(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){Eu(d)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){Eu(d)}a.currentTarget=null,s=l}}}}function ot(t,e){var n=e[ah];n===void 0&&(n=e[ah]=new Set);var i=t+"__bubble";n.has(i)||(VS(e,t,2,!1),n.add(i))}function od(t,e,n){var i=0;e&&(i|=4),VS(n,t,i,e)}var dc="_reactListening"+Math.random().toString(36).slice(2);function Pm(t){if(!t[dc]){t[dc]=!0,O_.forEach(function(n){n!=="selectionchange"&&(_E.has(n)||od(n,!1,t),od(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[dc]||(e[dc]=!0,od("selectionchange",!1,e))}}function VS(t,e,n,i){switch(ny(e)){case 2:var a=WE;break;case 8:a=qE;break;default:a=Fm}n=a.bind(null,e,n,t),a=void 0,!ch||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function ld(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Pr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}k_(function(){var c=s,d=Jp(n),p=[];e:{var u=ix.get(t);if(u!==void 0){var m=lf,g=t;switch(t){case"keypress":if(Qc(n)===0)break e;case"keydown":case"keyup":m=fb;break;case"focusin":g="focus",m=If;break;case"focusout":g="blur",m=If;break;case"beforeblur":case"afterblur":m=If;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":m=wg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":m=JM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":m=pb;break;case J_:case ex:case tx:m=nb;break;case nx:m=gb;break;case"scroll":case"scrollend":m=QM;break;case"wheel":m=_b;break;case"copy":case"cut":case"paste":m=ab;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":m=Rg;break;case"toggle":case"beforetoggle":m=Sb}var b=(e&4)!==0,_=!b&&(t==="scroll"||t==="scrollend"),h=b?u!==null?u+"Capture":null:u;b=[];for(var v=c,S;v!==null;){var x=v;if(S=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||S===null||h===null||(x=yl(v,h),x!=null&&b.push(Nl(v,x,S))),_)break;v=v.return}0<b.length&&(u=new m(u,g,null,n,d),p.push({event:u,listeners:b}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",m=t==="mouseout"||t==="pointerout",u&&n!==lh&&(g=n.relatedTarget||n.fromElement)&&(Pr(g)||g[yo]))break e;if((m||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,m?(g=n.relatedTarget||n.toElement,m=c,g=g?Pr(g):null,g!==null&&(_=Bl(g),b=g.tag,g!==_||b!==5&&b!==27&&b!==6)&&(g=null)):(m=null,g=c),m!==g)){if(b=wg,x="onMouseLeave",h="onMouseEnter",v="mouse",(t==="pointerout"||t==="pointerover")&&(b=Rg,x="onPointerLeave",h="onPointerEnter",v="pointer"),_=m==null?u:Jo(m),S=g==null?u:Jo(g),u=new b(x,v+"leave",m,n,d),u.target=_,u.relatedTarget=S,x=null,Pr(d)===c&&(b=new b(h,v+"enter",g,n,d),b.target=S,b.relatedTarget=_,x=b),_=x,m&&g)t:{for(b=xE,h=m,v=g,S=0,x=h;x;x=b(x))S++;x=0;for(var A=v;A;A=b(A))x++;for(;0<S-x;)h=b(h),S--;for(;0<x-S;)v=b(v),x--;for(;S--;){if(h===v||v!==null&&h===v.alternate){b=h;break t}h=b(h),v=b(v)}b=null}else b=null;m!==null&&S0(p,u,m,b,!1),g!==null&&_!==null&&S0(p,_,g,b,!0)}}e:{if(u=c?Jo(c):window,m=u.nodeName&&u.nodeName.toLowerCase(),m==="select"||m==="input"&&u.type==="file")var R=Lg;else if(Ug(u))if(Y_)R=Nb;else{R=Cb;var T=wb}else m=u.nodeName,!m||m.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&$p(c.elementType)&&(R=Lg):R=Rb;if(R&&(R=R(t,c))){q_(p,R,n,d);break e}T&&T(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&oh(u,"number",u.value)}switch(T=c?Jo(c):window,t){case"focusin":(Ug(T)||T.contentEditable==="true")&&(Br=T,uh=c,ll=null);break;case"focusout":ll=uh=Br=null;break;case"mousedown":fh=!0;break;case"contextmenu":case"mouseup":case"dragend":fh=!1,Bg(p,n,d);break;case"selectionchange":if(Ub)break;case"keydown":case"keyup":Bg(p,n,d)}var M;if(nm)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Ir?X_(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(j_&&n.locale!=="ko"&&(Ir||C!=="onCompositionStart"?C==="onCompositionEnd"&&Ir&&(M=V_()):(is=d,em="value"in is?is.value:is.textContent,Ir=!0)),T=Gu(c,C),0<T.length&&(C=new Cg(C,t,null,n,d),p.push({event:C,listeners:T}),M?C.data=M:(M=W_(n),M!==null&&(C.data=M)))),(M=Mb?bb(t,n):Eb(t,n))&&(C=Gu(c,"onBeforeInput"),0<C.length&&(T=new Cg("onBeforeInput","beforeinput",null,n,d),p.push({event:T,listeners:C}),T.data=M)),mE(p,t,c,n,d)}kS(p,e)})}function Nl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Gu(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=yl(t,n),a!=null&&i.unshift(Nl(t,a,s)),a=yl(t,e),a!=null&&i.push(Nl(t,a,s))),t.tag===3)return i;t=t.return}return[]}function xE(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function S0(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=yl(n,s),c!=null&&r.unshift(Nl(n,c,l))):a||(c=yl(n,s),c!=null&&r.push(Nl(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var SE=/\r\n?/g,yE=/\u0000|\uFFFD/g;function y0(t){return(typeof t=="string"?t:""+t).replace(SE,`
`).replace(yE,"")}function jS(t,e){return e=y0(e),y0(t)===e}function Ot(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||so(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&so(t,""+i);break;case"className":sc(t,"class",i);break;case"tabIndex":sc(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":sc(t,n,i);break;case"style":G_(t,i,s);break;case"data":if(e!=="object"){sc(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Zc(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Ot(t,e,"name",a.name,a,null),Ot(t,e,"formEncType",a.formEncType,a,null),Ot(t,e,"formMethod",a.formMethod,a,null),Ot(t,e,"formTarget",a.formTarget,a,null)):(Ot(t,e,"encType",a.encType,a,null),Ot(t,e,"method",a.method,a,null),Ot(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Zc(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=Ta);break;case"onScroll":i!=null&&ot("scroll",t);break;case"onScrollEnd":i!=null&&ot("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(ue(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(ue(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=Zc(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":ot("beforetoggle",t),ot("toggle",t),Yc(t,"popover",i);break;case"xlinkActuate":ua(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ua(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ua(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ua(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ua(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ua(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ua(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ua(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ua(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":Yc(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=ZM.get(n)||n,Yc(t,n,i))}}function Ph(t,e,n,i,a,s){switch(n){case"style":G_(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(ue(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(ue(60));t.innerHTML=n}}break;case"children":typeof i=="string"?so(t,i):(typeof i=="number"||typeof i=="bigint")&&so(t,""+i);break;case"onScroll":i!=null&&ot("scroll",t);break;case"onScrollEnd":i!=null&&ot("scrollend",t);break;case"onClick":i!=null&&(t.onclick=Ta);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!P_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[Zn]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):Yc(t,n,i)}}}function An(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":ot("error",t),ot("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(ue(137,e));default:Ot(t,e,s,r,n,null)}}a&&Ot(t,e,"srcSet",n.srcSet,n,null),i&&Ot(t,e,"src",n.src,n,null);return;case"input":ot("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(ue(137,e));break;default:Ot(t,e,i,d,n,null)}}B_(t,s,o,l,c,r,a,!1);return;case"select":ot("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Ot(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?Zr(t,!!i,e,!1):n!=null&&Zr(t,!!i,n,!0);return;case"textarea":ot("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(ue(91));break;default:Ot(t,e,r,o,n,null)}H_(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ot(t,e,l,i,n,null)}return;case"dialog":ot("beforetoggle",t),ot("toggle",t),ot("cancel",t),ot("close",t);break;case"iframe":case"object":ot("load",t);break;case"video":case"audio":for(i=0;i<Rl.length;i++)ot(Rl[i],t);break;case"image":ot("error",t),ot("load",t);break;case"details":ot("toggle",t);break;case"embed":case"source":case"link":ot("error",t),ot("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(ue(137,e));default:Ot(t,e,c,i,n,null)}return;default:if($p(e)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Ph(t,e,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Ot(t,e,o,i,n,null))}function ME(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,d=null;for(m in n){var p=n[m];if(n.hasOwnProperty(m)&&p!=null)switch(m){case"checked":break;case"value":break;case"defaultValue":l=p;default:i.hasOwnProperty(m)||Ot(t,e,m,null,i,p)}}for(var u in i){var m=i[u];if(p=n[u],i.hasOwnProperty(u)&&(m!=null||p!=null))switch(u){case"type":s=m;break;case"name":a=m;break;case"checked":c=m;break;case"defaultChecked":d=m;break;case"value":r=m;break;case"defaultValue":o=m;break;case"children":case"dangerouslySetInnerHTML":if(m!=null)throw Error(ue(137,e));break;default:m!==p&&Ot(t,e,u,m,i,p)}}rh(t,r,o,l,c,d,s,a);return;case"select":m=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":m=l;default:i.hasOwnProperty(s)||Ot(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Ot(t,e,a,s,i,l)}e=o,n=r,i=m,u!=null?Zr(t,!!n,u,!1):!!i!=!!n&&(e!=null?Zr(t,!!n,e,!0):Zr(t,!!n,n?[]:"",!1));return;case"textarea":m=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Ot(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":m=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(ue(91));break;default:a!==s&&Ot(t,e,r,a,i,s)}F_(t,u,m);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:Ot(t,e,g,null,i,u)}for(l in i)if(u=i[l],m=n[l],i.hasOwnProperty(l)&&u!==m&&(u!=null||m!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Ot(t,e,l,u,i,m)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&Ot(t,e,b,null,i,u);for(c in i)if(u=i[c],m=n[c],i.hasOwnProperty(c)&&u!==m&&(u!=null||m!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(ue(137,e));break;default:Ot(t,e,c,u,i,m)}return;default:if($p(e)){for(var _ in n)u=n[_],n.hasOwnProperty(_)&&u!==void 0&&!i.hasOwnProperty(_)&&Ph(t,e,_,void 0,i,u);for(d in i)u=i[d],m=n[d],!i.hasOwnProperty(d)||u===m||u===void 0&&m===void 0||Ph(t,e,d,u,i,m);return}}for(var h in n)u=n[h],n.hasOwnProperty(h)&&u!=null&&!i.hasOwnProperty(h)&&Ot(t,e,h,null,i,u);for(p in i)u=i[p],m=n[p],!i.hasOwnProperty(p)||u===m||u==null&&m==null||Ot(t,e,p,u,i,m)}function M0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function bE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&M0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,p=l.initiatorType;d&&M0(p)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var zh=null,Ih=null;function ku(t){return t.nodeType===9?t:t.ownerDocument}function b0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function XS(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Bh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var cd=null;function EE(){var t=window.event;return t&&t.type==="popstate"?t===cd?!1:(cd=t,!0):(cd=null,!1)}var WS=typeof setTimeout=="function"?setTimeout:void 0,TE=typeof clearTimeout=="function"?clearTimeout:void 0,E0=typeof Promise=="function"?Promise:void 0,AE=typeof queueMicrotask=="function"?queueMicrotask:typeof E0<"u"?function(t){return E0.resolve(null).then(t).catch(wE)}:WS;function wE(t){setTimeout(function(){throw t})}function Es(t){return t==="head"}function T0(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),po(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")_l(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,_l(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[kl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&_l(t.ownerDocument.body);n=a}while(n);po(e)}function A0(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Fh(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Fh(n),Qp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function CE(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[kl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ci(t.nextSibling),t===null)break}return null}function RE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ci(t.nextSibling),t===null))return null;return t}function qS(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ci(t.nextSibling),t===null))return null;return t}function Hh(t){return t.data==="$?"||t.data==="$~"}function Gh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function NE(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Ci(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var kh=null;function w0(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ci(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function C0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function YS(t,e,n){switch(e=ku(n),t){case"html":if(t=e.documentElement,!t)throw Error(ue(452));return t;case"head":if(t=e.head,!t)throw Error(ue(453));return t;case"body":if(t=e.body,!t)throw Error(ue(454));return t;default:throw Error(ue(451))}}function _l(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Qp(t)}var Ni=new Map,R0=new Set;function Vu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ha=yt.d;yt.d={f:DE,r:UE,D:LE,C:OE,L:PE,m:zE,X:BE,S:IE,M:FE};function DE(){var t=Ha.f(),e=xf();return t||e}function UE(t){var e=Mo(t);e!==null&&e.tag===5&&e.type==="form"?Gx(e):Ha.r(t)}var Ao=typeof document>"u"?null:document;function ZS(t,e,n){var i=Ao;if(i&&typeof e=="string"&&e){var a=Mi(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),R0.has(a)||(R0.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),An(e,"link",t),vn(e),i.head.appendChild(e)))}}function LE(t){Ha.D(t),ZS("dns-prefetch",t,null)}function OE(t,e){Ha.C(t,e),ZS("preconnect",t,e)}function PE(t,e,n){Ha.L(t,e,n);var i=Ao;if(i&&t&&e){var a='link[rel="preload"][as="'+Mi(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Mi(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Mi(n.imageSizes)+'"]')):a+='[href="'+Mi(t)+'"]';var s=a;switch(e){case"style":s=ho(t);break;case"script":s=wo(t)}Ni.has(s)||(t=Wt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ni.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(Yl(s))||e==="script"&&i.querySelector(Zl(s))||(e=i.createElement("link"),An(e,"link",t),vn(e),i.head.appendChild(e)))}}function zE(t,e){Ha.m(t,e);var n=Ao;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Mi(i)+'"][href="'+Mi(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=wo(t)}if(!Ni.has(s)&&(t=Wt({rel:"modulepreload",href:t},e),Ni.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Zl(s)))return}i=n.createElement("link"),An(i,"link",t),vn(i),n.head.appendChild(i)}}}function IE(t,e,n){Ha.S(t,e,n);var i=Ao;if(i&&t){var a=Yr(i).hoistableStyles,s=ho(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Yl(s)))o.loading=5;else{t=Wt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ni.get(s))&&zm(t,n);var l=r=i.createElement("link");vn(l),An(l,"link",t),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,su(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function BE(t,e){Ha.X(t,e);var n=Ao;if(n&&t){var i=Yr(n).hoistableScripts,a=wo(t),s=i.get(a);s||(s=n.querySelector(Zl(a)),s||(t=Wt({src:t,async:!0},e),(e=Ni.get(a))&&Im(t,e),s=n.createElement("script"),vn(s),An(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function FE(t,e){Ha.M(t,e);var n=Ao;if(n&&t){var i=Yr(n).hoistableScripts,a=wo(t),s=i.get(a);s||(s=n.querySelector(Zl(a)),s||(t=Wt({src:t,async:!0,type:"module"},e),(e=Ni.get(a))&&Im(t,e),s=n.createElement("script"),vn(s),An(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function N0(t,e,n,i){var a=(a=cs.current)?Vu(a):null;if(!a)throw Error(ue(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=ho(n.href),n=Yr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=ho(n.href);var s=Yr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(Yl(t)))&&!s._p&&(r.instance=s,r.state.loading=5),Ni.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ni.set(t,n),s||HE(a,t,n,r.state))),e&&i===null)throw Error(ue(528,""));return r}if(e&&i!==null)throw Error(ue(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=wo(n),n=Yr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(ue(444,t))}}function ho(t){return'href="'+Mi(t)+'"'}function Yl(t){return'link[rel="stylesheet"]['+t+"]"}function KS(t){return Wt({},t,{"data-precedence":t.precedence,precedence:null})}function HE(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),An(e,"link",n),vn(e),t.head.appendChild(e))}function wo(t){return'[src="'+Mi(t)+'"]'}function Zl(t){return"script[async]"+t}function D0(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Mi(n.href)+'"]');if(i)return e.instance=i,vn(i),i;var a=Wt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),vn(i),An(i,"style",a),su(i,n.precedence,t),e.instance=i;case"stylesheet":a=ho(n.href);var s=t.querySelector(Yl(a));if(s)return e.state.loading|=4,e.instance=s,vn(s),s;i=KS(n),(a=Ni.get(a))&&zm(i,a),s=(t.ownerDocument||t).createElement("link"),vn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),An(s,"link",i),e.state.loading|=4,su(s,n.precedence,t),e.instance=s;case"script":return s=wo(n.src),(a=t.querySelector(Zl(s)))?(e.instance=a,vn(a),a):(i=n,(a=Ni.get(s))&&(i=Wt({},n),Im(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),vn(a),An(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(ue(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,su(i,n.precedence,t));return e.instance}function su(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function zm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Im(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var ru=null;function U0(t,e,n){if(ru===null){var i=new Map,a=ru=new Map;a.set(n,i)}else a=ru,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[kl]||s[yn]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function L0(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function GE(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function QS(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function kE(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=ho(i.href),s=e.querySelector(Yl(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=ju.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,vn(s);return}s=e.ownerDocument||e,i=KS(i),(a=Ni.get(a))&&zm(i,a),s=s.createElement("link"),vn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),An(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=ju.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var ud=0;function VE(t,e){return t.stylesheets&&t.count===0&&ou(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&ou(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&ud===0&&(ud=62500*bE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&ou(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>ud?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function ju(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ou(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Xu=null;function ou(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xu=new Map,e.forEach(jE,t),Xu=null,ju.call(t))}function jE(t,e){if(!(e.state.loading&4)){var n=Xu.get(t);if(n)var i=n.get(null);else{n=new Map,Xu.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=ju.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Dl={$$typeof:Ea,Provider:null,Consumer:null,_currentValue:Gs,_currentValue2:Gs,_threadCount:0};function XE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Lf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Lf(0),this.hiddenUpdates=Lf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function $S(t,e,n,i,a,s,r,o,l,c,d,p){return t=new XE(t,e,n,r,l,c,d,p,o),e=1,s===!0&&(e|=24),s=ti(3,null,null,e),t.current=s,s.stateNode=t,e=cm(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},dm(s),t}function JS(t){return t?(t=Gr,t):Gr}function ey(t,e,n,i,a,s){a=JS(a),i.context===null?i.context=a:i.pendingContext=a,i=fs(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=ds(t,i,e),n!==null&&(qn(n,t,e),ul(n,t,e))}function O0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Bm(t,e){O0(t,e),(t=t.alternate)&&O0(t,e)}function ty(t){if(t.tag===13||t.tag===31){var e=sr(t,67108864);e!==null&&qn(e,t,67108864),Bm(t,67108864)}}function P0(t){if(t.tag===13||t.tag===31){var e=ri();e=Zp(e);var n=sr(t,e);n!==null&&qn(n,t,e),Bm(t,e)}}var Wu=!0;function WE(t,e,n,i){var a=Ve.T;Ve.T=null;var s=yt.p;try{yt.p=2,Fm(t,e,n,i)}finally{yt.p=s,Ve.T=a}}function qE(t,e,n,i){var a=Ve.T;Ve.T=null;var s=yt.p;try{yt.p=8,Fm(t,e,n,i)}finally{yt.p=s,Ve.T=a}}function Fm(t,e,n,i){if(Wu){var a=Vh(i);if(a===null)ld(t,e,i,qu,n),z0(t,i);else if(ZE(a,t,e,n,i))i.stopPropagation();else if(z0(t,i),e&4&&-1<YE.indexOf(t)){for(;a!==null;){var s=Mo(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Ls(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-si(r);o.entanglements[1]|=l,r&=~l}sa(s),!(St&6)&&(zu=ii()+500,ql(0))}}break;case 31:case 13:o=sr(s,2),o!==null&&qn(o,s,2),xf(),Bm(s,2)}if(s=Vh(i),s===null&&ld(t,e,i,qu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else ld(t,e,i,null,n)}}function Vh(t){return t=Jp(t),Hm(t)}var qu=null;function Hm(t){if(qu=null,t=Pr(t),t!==null){var e=Bl(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=y_(e),t!==null)return t;t=null}else if(n===31){if(t=M_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return qu=t,null}function ny(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(LM()){case A_:return 2;case w_:return 8;case Mu:case OM:return 32;case C_:return 268435456;default:return 32}default:return 32}}var jh=!1,ms=null,gs=null,vs=null,Ul=new Map,Ll=new Map,es=[],YE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function z0(t,e){switch(t){case"focusin":case"focusout":ms=null;break;case"dragenter":case"dragleave":gs=null;break;case"mouseover":case"mouseout":vs=null;break;case"pointerover":case"pointerout":Ul.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ll.delete(e.pointerId)}}function Ho(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=Mo(e),e!==null&&ty(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function ZE(t,e,n,i,a){switch(e){case"focusin":return ms=Ho(ms,t,e,n,i,a),!0;case"dragenter":return gs=Ho(gs,t,e,n,i,a),!0;case"mouseover":return vs=Ho(vs,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return Ul.set(s,Ho(Ul.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ll.set(s,Ho(Ll.get(s)||null,t,e,n,i,a)),!0}return!1}function iy(t){var e=Pr(t.target);if(e!==null){var n=Bl(e);if(n!==null){if(e=n.tag,e===13){if(e=y_(n),e!==null){t.blockedOn=e,Sg(t.priority,function(){P0(n)});return}}else if(e===31){if(e=M_(n),e!==null){t.blockedOn=e,Sg(t.priority,function(){P0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function lu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Vh(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);lh=i,n.target.dispatchEvent(i),lh=null}else return e=Mo(n),e!==null&&ty(e),t.blockedOn=n,!1;e.shift()}return!0}function I0(t,e,n){lu(t)&&n.delete(e)}function KE(){jh=!1,ms!==null&&lu(ms)&&(ms=null),gs!==null&&lu(gs)&&(gs=null),vs!==null&&lu(vs)&&(vs=null),Ul.forEach(I0),Ll.forEach(I0)}function hc(t,e){t.blockedOn===e&&(t.blockedOn=null,jh||(jh=!0,un.unstable_scheduleCallback(un.unstable_NormalPriority,KE)))}var pc=null;function B0(t){pc!==t&&(pc=t,un.unstable_scheduleCallback(un.unstable_NormalPriority,function(){pc===t&&(pc=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(Hm(i||n)===null)continue;break}var s=Mo(n);s!==null&&(t.splice(e,3),e-=3,Eh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function po(t){function e(l){return hc(l,t)}ms!==null&&hc(ms,t),gs!==null&&hc(gs,t),vs!==null&&hc(vs,t),Ul.forEach(e),Ll.forEach(e);for(var n=0;n<es.length;n++){var i=es[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<es.length&&(n=es[0],n.blockedOn===null);)iy(n),n.blockedOn===null&&es.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[Zn]||null;if(typeof s=="function")r||B0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[Zn]||null)o=r.formAction;else if(Hm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),B0(n)}}}function ay(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Gm(t){this._internalRoot=t}Mf.prototype.render=Gm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ue(409));var n=e.current,i=ri();ey(n,i,t,e,null,null)};Mf.prototype.unmount=Gm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ey(t.current,2,null,t,null,null),xf(),e[yo]=null}};function Mf(t){this._internalRoot=t}Mf.prototype.unstable_scheduleHydration=function(t){if(t){var e=L_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<es.length&&e!==0&&e<es[n].priority;n++);es.splice(n,0,t),n===0&&iy(t)}};var F0=x_.version;if(F0!=="19.2.8")throw Error(ue(527,F0,"19.2.8"));yt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ue(188)):(t=Object.keys(t).join(","),Error(ue(268,t)));return t=AM(e),t=t!==null?b_(t):null,t=t===null?null:t.stateNode,t};var QE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:Ve,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mc.isDisabled&&mc.supportsFiber)try{Fl=mc.inject(QE),ai=mc}catch{}}sf.createRoot=function(t,e){if(!S_(t))throw Error(ue(299));var n=!1,i="",a=Zx,s=Kx,r=Qx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=$S(t,1,!1,null,null,n,i,null,a,s,r,ay),t[yo]=e.current,Pm(t),new Gm(e)};sf.hydrateRoot=function(t,e,n){if(!S_(t))throw Error(ue(299));var i=!1,a="",s=Zx,r=Kx,o=Qx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=$S(t,1,!0,e,n??null,i,a,l,s,r,o,ay),e.context=JS(null),n=e.current,i=ri(),i=Zp(i),a=fs(i),a.callback=null,ds(n,a,i),n=i,e.current.lanes=n,Gl(e,n),sa(e),t[yo]=e.current,Pm(t),new Mf(e)};sf.version="19.2.8";function sy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sy)}catch(t){console.error(t)}}sy(),h_.exports=sf;var $E=h_.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const km="185",JE=0,H0=1,eT=2,cu=1,tT=2,nl=3,Ms=0,Yn=1,ba=2,Da=0,Ws=1,Xr=2,G0=3,k0=4,nT=5,Is=100,iT=101,aT=102,sT=103,rT=104,oT=200,lT=201,cT=202,uT=203,Xh=204,Wh=205,fT=206,dT=207,hT=208,pT=209,mT=210,gT=211,vT=212,_T=213,xT=214,qh=0,Yh=1,Zh=2,mo=3,Kh=4,Qh=5,$h=6,Jh=7,ry=0,ST=1,yT=2,ta=0,oy=1,ly=2,cy=3,uy=4,fy=5,dy=6,hy=7,py=300,$s=301,go=302,fd=303,dd=304,bf=306,ep=1e3,wa=1001,tp=1002,En=1003,MT=1004,gc=1005,Rn=1006,hd=1007,Fs=1008,Ti=1009,my=1010,gy=1011,Ol=1012,Vm=1013,ia=1014,Bi=1015,Ba=1016,jm=1017,Xm=1018,Pl=1020,vy=35902,_y=35899,xy=1021,Sy=1022,Fi=1023,Fa=1026,Hs=1027,Wm=1028,qm=1029,Js=1030,Ym=1031,Zm=1033,uu=33776,fu=33777,du=33778,hu=33779,np=35840,ip=35841,ap=35842,sp=35843,rp=36196,op=37492,lp=37496,cp=37488,up=37489,Yu=37490,fp=37491,dp=37808,hp=37809,pp=37810,mp=37811,gp=37812,vp=37813,_p=37814,xp=37815,Sp=37816,yp=37817,Mp=37818,bp=37819,Ep=37820,Tp=37821,Ap=36492,wp=36494,Cp=36495,Rp=36283,Np=36284,Zu=36285,Dp=36286,bT=3200,V0=0,ET=1,ts="",vi="srgb",Ku="srgb-linear",Qu="linear",Nt="srgb",hr=7680,j0=519,TT=512,AT=513,wT=514,Km=515,CT=516,RT=517,Qm=518,NT=519,X0=35044,W0="300 es",Ji=2e3,$u=2001;function DT(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Ju(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function UT(){const t=Ju("canvas");return t.style.display="block",t}const q0={};function Y0(...t){const e="THREE."+t.shift();console.log(e,...t)}function yy(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ge(...t){t=yy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function vt(...t){t=yy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function to(...t){const e=t.join(" ");e in q0||(q0[e]=!0,Ge(...t))}function LT(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const OT={[qh]:Yh,[Zh]:$h,[Kh]:Jh,[mo]:Qh,[Yh]:qh,[$h]:Zh,[Jh]:Kh,[Qh]:mo};class or{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const wn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pu=Math.PI/180,Up=180/Math.PI;function Kl(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(wn[t&255]+wn[t>>8&255]+wn[t>>16&255]+wn[t>>24&255]+"-"+wn[e&255]+wn[e>>8&255]+"-"+wn[e>>16&15|64]+wn[e>>24&255]+"-"+wn[n&63|128]+wn[n>>8&255]+"-"+wn[n>>16&255]+wn[n>>24&255]+wn[i&255]+wn[i>>8&255]+wn[i>>16&255]+wn[i>>24&255]).toLowerCase()}function pt(t,e,n){return Math.max(e,Math.min(n,t))}function PT(t,e){return(t%e+e)%e}function pd(t,e,n){return(1-n)*t+n*e}function Go(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function jn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ig=class ig{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=pt(this.x,e.x,n.x),this.y=pt(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=pt(this.x,e,n),this.y=pt(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ig.prototype.isVector2=!0;let Mt=ig;class Co{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],p=i[a+3],u=s[r+0],m=s[r+1],g=s[r+2],b=s[r+3];if(p!==b||l!==u||c!==m||d!==g){let _=l*u+c*m+d*g+p*b;_<0&&(u=-u,m=-m,g=-g,b=-b,_=-_);let h=1-o;if(_<.9995){const v=Math.acos(_),S=Math.sin(v);h=Math.sin(h*v)/S,o=Math.sin(o*v)/S,l=l*h+u*o,c=c*h+m*o,d=d*h+g*o,p=p*h+b*o}else{l=l*h+u*o,c=c*h+m*o,d=d*h+g*o,p=p*h+b*o;const v=1/Math.sqrt(l*l+c*c+d*d+p*p);l*=v,c*=v,d*=v,p*=v}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=p}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],p=s[r],u=s[r+1],m=s[r+2],g=s[r+3];return e[n]=o*g+d*p+l*m-c*u,e[n+1]=l*g+d*u+c*p-o*m,e[n+2]=c*g+d*m+o*u-l*p,e[n+3]=d*g-o*p-l*u-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),p=o(s/2),u=l(i/2),m=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*d*p+c*m*g,this._y=c*m*p-u*d*g,this._z=c*d*g+u*m*p,this._w=c*d*p-u*m*g;break;case"YXZ":this._x=u*d*p+c*m*g,this._y=c*m*p-u*d*g,this._z=c*d*g-u*m*p,this._w=c*d*p+u*m*g;break;case"ZXY":this._x=u*d*p-c*m*g,this._y=c*m*p+u*d*g,this._z=c*d*g+u*m*p,this._w=c*d*p-u*m*g;break;case"ZYX":this._x=u*d*p-c*m*g,this._y=c*m*p+u*d*g,this._z=c*d*g-u*m*p,this._w=c*d*p+u*m*g;break;case"YZX":this._x=u*d*p+c*m*g,this._y=c*m*p+u*d*g,this._z=c*d*g-u*m*p,this._w=c*d*p-u*m*g;break;case"XZY":this._x=u*d*p-c*m*g,this._y=c*m*p-u*d*g,this._z=c*d*g+u*m*p,this._w=c*d*p+u*m*g;break;default:Ge("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],p=n[10],u=i+o+p;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(d-l)*m,this._y=(s-c)*m,this._z=(r-a)*m}else if(i>o&&i>p){const m=2*Math.sqrt(1+i-o-p);this._w=(d-l)/m,this._x=.25*m,this._y=(a+r)/m,this._z=(s+c)/m}else if(o>p){const m=2*Math.sqrt(1+o-i-p);this._w=(s-c)/m,this._x=(a+r)/m,this._y=.25*m,this._z=(l+d)/m}else{const m=2*Math.sqrt(1+p-i-o);this._w=(r-a)/m,this._x=(s+c)/m,this._y=(l+d)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ag=class ag{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Z0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Z0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),d=2*(o*n-s*a),p=2*(s*i-r*n);return this.x=n+l*c+r*p-o*d,this.y=i+l*d+o*c-s*p,this.z=a+l*p+s*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=pt(this.x,e.x,n.x),this.y=pt(this.y,e.y,n.y),this.z=pt(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=pt(this.x,e,n),this.y=pt(this.y,e,n),this.z=pt(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return md.copy(this).projectOnVector(e),this.sub(md)}reflect(e){return this.sub(md.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ag.prototype.isVector3=!0;let Y=ag;const md=new Y,Z0=new Co,sg=class sg{constructor(e,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],p=i[7],u=i[2],m=i[5],g=i[8],b=a[0],_=a[3],h=a[6],v=a[1],S=a[4],x=a[7],A=a[2],R=a[5],T=a[8];return s[0]=r*b+o*v+l*A,s[3]=r*_+o*S+l*R,s[6]=r*h+o*x+l*T,s[1]=c*b+d*v+p*A,s[4]=c*_+d*S+p*R,s[7]=c*h+d*x+p*T,s[2]=u*b+m*v+g*A,s[5]=u*_+m*S+g*R,s[8]=u*h+m*x+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*r*d-n*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=d*r-o*c,u=o*l-d*s,m=c*s-r*l,g=n*p+i*u+a*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=p*b,e[1]=(a*c-d*i)*b,e[2]=(o*i-a*r)*b,e[3]=u*b,e[4]=(d*n-a*l)*b,e[5]=(a*s-o*n)*b,e[6]=m*b,e[7]=(i*l-c*n)*b,e[8]=(r*n-i*s)*b,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return to("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gd.makeScale(e,n)),this}rotate(e){return to("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gd.makeRotation(-e)),this}translate(e,n){return to("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};sg.prototype.isMatrix3=!0;let Ye=sg;const gd=new Ye,K0=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Q0=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zT(){const t={enabled:!0,workingColorSpace:Ku,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Nt&&(a.r=Ua(a.r),a.g=Ua(a.g),a.b=Ua(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Nt&&(a.r=no(a.r),a.g=no(a.g),a.b=no(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===ts?Qu:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return to("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return to("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ku]:{primaries:e,whitePoint:i,transfer:Qu,toXYZ:K0,fromXYZ:Q0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:vi},outputColorSpaceConfig:{drawingBufferColorSpace:vi}},[vi]:{primaries:e,whitePoint:i,transfer:Nt,toXYZ:K0,fromXYZ:Q0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:vi}}}),t}const ht=zT();function Ua(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function no(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let pr;class IT{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{pr===void 0&&(pr=Ju("canvas")),pr.width=e.width,pr.height=e.height;const a=pr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=pr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Ju("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Ua(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ua(n[i]/255)*255):n[i]=Ua(n[i]);return{data:n,width:e.width,height:e.height}}else return Ge("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let BT=0;class $m{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:BT++}),this.uuid=Kl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(vd(a[r].image)):s.push(vd(a[r]))}else s=vd(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function vd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?IT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ge("Texture: Unable to serialize Texture."),{})}let FT=0;const _d=new Y;class In extends or{constructor(e=In.DEFAULT_IMAGE,n=In.DEFAULT_MAPPING,i=wa,a=wa,s=Rn,r=Fs,o=Fi,l=Ti,c=In.DEFAULT_ANISOTROPY,d=ts){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:FT++}),this.uuid=Kl(),this.name="",this.source=new $m(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Mt(0,0),this.repeat=new Mt(1,1),this.center=new Mt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_d).x}get height(){return this.source.getSize(_d).y}get depth(){return this.source.getSize(_d).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ge(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Ge(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==py)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ep:e.x=e.x-Math.floor(e.x);break;case wa:e.x=e.x<0?0:1;break;case tp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ep:e.y=e.y-Math.floor(e.y);break;case wa:e.y=e.y<0?0:1;break;case tp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=py;In.DEFAULT_ANISOTROPY=1;const rg=class rg{constructor(e=0,n=0,i=0,a=1){this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],d=l[4],p=l[8],u=l[1],m=l[5],g=l[9],b=l[2],_=l[6],h=l[10];if(Math.abs(d-u)<.01&&Math.abs(p-b)<.01&&Math.abs(g-_)<.01){if(Math.abs(d+u)<.1&&Math.abs(p+b)<.1&&Math.abs(g+_)<.1&&Math.abs(c+m+h-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,x=(m+1)/2,A=(h+1)/2,R=(d+u)/4,T=(p+b)/4,M=(g+_)/4;return S>x&&S>A?S<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(S),a=R/i,s=T/i):x>A?x<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(x),i=R/a,s=M/a):A<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(A),i=T/s,a=M/s),this.set(i,a,s,n),this}let v=Math.sqrt((_-g)*(_-g)+(p-b)*(p-b)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(_-g)/v,this.y=(p-b)/v,this.z=(u-d)/v,this.w=Math.acos((c+m+h-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=pt(this.x,e.x,n.x),this.y=pt(this.y,e.y,n.y),this.z=pt(this.z,e.z,n.z),this.w=pt(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=pt(this.x,e,n),this.y=pt(this.y,e,n),this.z=pt(this.z,e,n),this.w=pt(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rg.prototype.isVector4=!0;let Qt=rg;class HT extends or{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Qt(0,0,e,n),this.scissorTest=!1,this.viewport=new Qt(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new In(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:Rn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new $m(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class na extends HT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class My extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=En,this.minFilter=En,this.wrapR=wa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class GT extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=En,this.minFilter=En,this.wrapR=wa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const nf=class nf{constructor(e,n,i,a,s,r,o,l,c,d,p,u,m,g,b,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,d,p,u,m,g,b,_)}set(e,n,i,a,s,r,o,l,c,d,p,u,m,g,b,_){const h=this.elements;return h[0]=e,h[4]=n,h[8]=i,h[12]=a,h[1]=s,h[5]=r,h[9]=o,h[13]=l,h[2]=c,h[6]=d,h[10]=p,h[14]=u,h[3]=m,h[7]=g,h[11]=b,h[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new nf().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,a=1/mr.setFromMatrixColumn(e,0).length(),s=1/mr.setFromMatrixColumn(e,1).length(),r=1/mr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),p=Math.sin(s);if(e.order==="XYZ"){const u=r*d,m=r*p,g=o*d,b=o*p;n[0]=l*d,n[4]=-l*p,n[8]=c,n[1]=m+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+m*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*d,m=l*p,g=c*d,b=c*p;n[0]=u+b*o,n[4]=g*o-m,n[8]=r*c,n[1]=r*p,n[5]=r*d,n[9]=-o,n[2]=m*o-g,n[6]=b+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*d,m=l*p,g=c*d,b=c*p;n[0]=u-b*o,n[4]=-r*p,n[8]=g+m*o,n[1]=m+g*o,n[5]=r*d,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*d,m=r*p,g=o*d,b=o*p;n[0]=l*d,n[4]=g*c-m,n[8]=u*c+b,n[1]=l*p,n[5]=b*c+u,n[9]=m*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,m=r*c,g=o*l,b=o*c;n[0]=l*d,n[4]=b-u*p,n[8]=g*p+m,n[1]=p,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=m*p+g,n[10]=u-b*p}else if(e.order==="XZY"){const u=r*l,m=r*c,g=o*l,b=o*c;n[0]=l*d,n[4]=-p,n[8]=c*d,n[1]=u*p+b,n[5]=r*d,n[9]=m*p-g,n[2]=g*p-m,n[6]=o*d,n[10]=b*p+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kT,e,VT)}lookAt(e,n,i){const a=this.elements;return Qn.subVectors(e,n),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Va.crossVectors(i,Qn),Va.lengthSq()===0&&(Math.abs(i.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Va.crossVectors(i,Qn)),Va.normalize(),vc.crossVectors(Qn,Va),a[0]=Va.x,a[4]=vc.x,a[8]=Qn.x,a[1]=Va.y,a[5]=vc.y,a[9]=Qn.y,a[2]=Va.z,a[6]=vc.z,a[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],p=i[5],u=i[9],m=i[13],g=i[2],b=i[6],_=i[10],h=i[14],v=i[3],S=i[7],x=i[11],A=i[15],R=a[0],T=a[4],M=a[8],C=a[12],w=a[1],U=a[5],O=a[9],k=a[13],P=a[2],z=a[6],B=a[10],I=a[14],L=a[3],V=a[7],re=a[11],ce=a[15];return s[0]=r*R+o*w+l*P+c*L,s[4]=r*T+o*U+l*z+c*V,s[8]=r*M+o*O+l*B+c*re,s[12]=r*C+o*k+l*I+c*ce,s[1]=d*R+p*w+u*P+m*L,s[5]=d*T+p*U+u*z+m*V,s[9]=d*M+p*O+u*B+m*re,s[13]=d*C+p*k+u*I+m*ce,s[2]=g*R+b*w+_*P+h*L,s[6]=g*T+b*U+_*z+h*V,s[10]=g*M+b*O+_*B+h*re,s[14]=g*C+b*k+_*I+h*ce,s[3]=v*R+S*w+x*P+A*L,s[7]=v*T+S*U+x*z+A*V,s[11]=v*M+S*O+x*B+A*re,s[15]=v*C+S*k+x*I+A*ce,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],p=e[6],u=e[10],m=e[14],g=e[3],b=e[7],_=e[11],h=e[15],v=l*m-c*u,S=o*m-c*p,x=o*u-l*p,A=r*m-c*d,R=r*u-l*d,T=r*p-o*d;return n*(b*v-_*S+h*x)-i*(g*v-_*A+h*R)+a*(g*S-b*A+h*T)-s*(g*x-b*R+_*T)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return n*(r*d-o*c)-i*(s*d-o*l)+a*(s*c-r*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],p=e[9],u=e[10],m=e[11],g=e[12],b=e[13],_=e[14],h=e[15],v=n*o-i*r,S=n*l-a*r,x=n*c-s*r,A=i*l-a*o,R=i*c-s*o,T=a*c-s*l,M=d*b-p*g,C=d*_-u*g,w=d*h-m*g,U=p*_-u*b,O=p*h-m*b,k=u*h-m*_,P=v*k-S*O+x*U+A*w-R*C+T*M;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/P;return e[0]=(o*k-l*O+c*U)*z,e[1]=(a*O-i*k-s*U)*z,e[2]=(b*T-_*R+h*A)*z,e[3]=(u*R-p*T-m*A)*z,e[4]=(l*w-r*k-c*C)*z,e[5]=(n*k-a*w+s*C)*z,e[6]=(_*x-g*T-h*S)*z,e[7]=(d*T-u*x+m*S)*z,e[8]=(r*O-o*w+c*M)*z,e[9]=(i*w-n*O-s*M)*z,e[10]=(g*R-b*x+h*v)*z,e[11]=(p*x-d*R-m*v)*z,e[12]=(o*C-r*U-l*M)*z,e[13]=(n*U-i*C+a*M)*z,e[14]=(b*S-g*A-_*v)*z,e[15]=(d*A-p*S+u*v)*z,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,d=r+r,p=o+o,u=s*c,m=s*d,g=s*p,b=r*d,_=r*p,h=o*p,v=l*c,S=l*d,x=l*p,A=i.x,R=i.y,T=i.z;return a[0]=(1-(b+h))*A,a[1]=(m+x)*A,a[2]=(g-S)*A,a[3]=0,a[4]=(m-x)*R,a[5]=(1-(u+h))*R,a[6]=(_+v)*R,a[7]=0,a[8]=(g+S)*T,a[9]=(_-v)*T,a[10]=(1-(u+b))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=mr.set(a[0],a[1],a[2]).length();const o=mr.set(a[4],a[5],a[6]).length(),l=mr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Oi.copy(this);const c=1/r,d=1/o,p=1/l;return Oi.elements[0]*=c,Oi.elements[1]*=c,Oi.elements[2]*=c,Oi.elements[4]*=d,Oi.elements[5]*=d,Oi.elements[6]*=d,Oi.elements[8]*=p,Oi.elements[9]*=p,Oi.elements[10]*=p,n.setFromRotationMatrix(Oi),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=Ji,l=!1){const c=this.elements,d=2*s/(n-e),p=2*s/(i-a),u=(n+e)/(n-e),m=(i+a)/(i-a);let g,b;if(l)g=s/(r-s),b=r*s/(r-s);else if(o===Ji)g=-(r+s)/(r-s),b=-2*r*s/(r-s);else if(o===$u)g=-r/(r-s),b=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=p,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=Ji,l=!1){const c=this.elements,d=2/(n-e),p=2/(i-a),u=-(n+e)/(n-e),m=-(i+a)/(i-a);let g,b;if(l)g=1/(r-s),b=r/(r-s);else if(o===Ji)g=-2/(r-s),b=-(r+s)/(r-s);else if(o===$u)g=-1/(r-s),b=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=p,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};nf.prototype.isMatrix4=!0;let Ht=nf;const mr=new Y,Oi=new Ht,kT=new Y(0,0,0),VT=new Y(1,1,1),Va=new Y,vc=new Y,Qn=new Y,$0=new Ht,J0=new Co;class er{constructor(e=0,n=0,i=0,a=er.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],p=a[2],u=a[6],m=a[10];switch(n){case"XYZ":this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,m),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-p,s),this._z=0);break;case"ZXY":this._x=Math.asin(pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-p,m),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-pt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-p,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-pt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,m),this._y=0);break;default:Ge("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return $0.makeRotationFromQuaternion(e),this.setFromRotationMatrix($0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return J0.setFromEuler(this),this.setFromQuaternion(J0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}er.DEFAULT_ORDER="XYZ";class by{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jT=0;const ev=new Y,gr=new Co,pa=new Ht,_c=new Y,ko=new Y,XT=new Y,WT=new Co,tv=new Y(1,0,0),nv=new Y(0,1,0),iv=new Y(0,0,1),av={type:"added"},qT={type:"removed"},vr={type:"childadded",child:null},xd={type:"childremoved",child:null};class Bn extends or{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jT++}),this.uuid=Kl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bn.DEFAULT_UP.clone();const e=new Y,n=new er,i=new Co,a=new Y(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Ht},normalMatrix:{value:new Ye}}),this.matrix=new Ht,this.matrixWorld=new Ht,this.matrixAutoUpdate=Bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new by,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return gr.setFromAxisAngle(e,n),this.quaternion.multiply(gr),this}rotateOnWorldAxis(e,n){return gr.setFromAxisAngle(e,n),this.quaternion.premultiply(gr),this}rotateX(e){return this.rotateOnAxis(tv,e)}rotateY(e){return this.rotateOnAxis(nv,e)}rotateZ(e){return this.rotateOnAxis(iv,e)}translateOnAxis(e,n){return ev.copy(e).applyQuaternion(this.quaternion),this.position.add(ev.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(tv,e)}translateY(e){return this.translateOnAxis(nv,e)}translateZ(e){return this.translateOnAxis(iv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pa.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?_c.copy(e):_c.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),ko.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pa.lookAt(ko,_c,this.up):pa.lookAt(_c,ko,this.up),this.quaternion.setFromRotationMatrix(pa),a&&(pa.extractRotation(a.matrixWorld),gr.setFromRotationMatrix(pa),this.quaternion.premultiply(gr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(vt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(av),vr.child=e,this.dispatchEvent(vr),vr.child=null):vt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(qT),xd.child=e,this.dispatchEvent(xd),xd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pa.multiply(e.parent.matrixWorld)),e.applyMatrix4(pa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(av),vr.child=e,this.dispatchEvent(vr),vr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,e,XT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ko,WT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const p=l[c];s(e.shapes,p)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),p=r(e.shapes),u=r(e.skeletons),m=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),p.length>0&&(i.shapes=p),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Bn.DEFAULT_UP=new Y(0,1,0);Bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xc extends Bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const YT={type:"move"};class Sd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const b of e.hand.values()){const _=n.getJointPose(b,i),h=this._getHandJoint(c,b);_!==null&&(h.matrix.fromArray(_.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=_.radius),h.visible=_!==null}const d=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],u=d.position.distanceTo(p.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(YT)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new xc;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Ey={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ja={h:0,s:0,l:0},Sc={h:0,s:0,l:0};function yd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class ct{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=vi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ht.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=ht.workingColorSpace){return this.r=e,this.g=n,this.b=i,ht.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=ht.workingColorSpace){if(e=PT(e,1),n=pt(n,0,1),i=pt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=yd(r,s,e+1/3),this.g=yd(r,s,e),this.b=yd(r,s,e-1/3)}return ht.colorSpaceToWorking(this,a),this}setStyle(e,n=vi){function i(s){s!==void 0&&parseFloat(s)<1&&Ge("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ge("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);Ge("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=vi){const i=Ey[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ge("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ua(e.r),this.g=Ua(e.g),this.b=Ua(e.b),this}copyLinearToSRGB(e){return this.r=no(e.r),this.g=no(e.g),this.b=no(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=vi){return ht.workingToColorSpace(Cn.copy(this),e),Math.round(pt(Cn.r*255,0,255))*65536+Math.round(pt(Cn.g*255,0,255))*256+Math.round(pt(Cn.b*255,0,255))}getHexString(e=vi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=ht.workingColorSpace){ht.workingToColorSpace(Cn.copy(this),n);const i=Cn.r,a=Cn.g,s=Cn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const p=r-o;switch(c=d<=.5?p/(r+o):p/(2-r-o),r){case i:l=(a-s)/p+(a<s?6:0);break;case a:l=(s-i)/p+2;break;case s:l=(i-a)/p+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=ht.workingColorSpace){return ht.workingToColorSpace(Cn.copy(this),n),e.r=Cn.r,e.g=Cn.g,e.b=Cn.b,e}getStyle(e=vi){ht.workingToColorSpace(Cn.copy(this),e);const n=Cn.r,i=Cn.g,a=Cn.b;return e!==vi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(ja),this.setHSL(ja.h+e,ja.s+n,ja.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ja),e.getHSL(Sc);const i=pd(ja.h,Sc.h,n),a=pd(ja.s,Sc.s,n),s=pd(ja.l,Sc.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Cn=new ct;ct.NAMES=Ey;class Jm{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new ct(e),this.density=n}clone(){return new Jm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ty extends Bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new er,this.environmentIntensity=1,this.environmentRotation=new er,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Pi=new Y,ma=new Y,Md=new Y,ga=new Y,_r=new Y,xr=new Y,sv=new Y,bd=new Y,Ed=new Y,Td=new Y,Ad=new Qt,wd=new Qt,Cd=new Qt;class Ai{constructor(e=new Y,n=new Y,i=new Y){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Pi.subVectors(e,n),a.cross(Pi);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Pi.subVectors(a,n),ma.subVectors(i,n),Md.subVectors(e,n);const r=Pi.dot(Pi),o=Pi.dot(ma),l=Pi.dot(Md),c=ma.dot(ma),d=ma.dot(Md),p=r*c-o*o;if(p===0)return s.set(0,0,0),null;const u=1/p,m=(c*l-o*d)*u,g=(r*d-o*l)*u;return s.set(1-m-g,g,m)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,ga)===null?!1:ga.x>=0&&ga.y>=0&&ga.x+ga.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,ga)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ga.x),l.addScaledVector(r,ga.y),l.addScaledVector(o,ga.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return Ad.setScalar(0),wd.setScalar(0),Cd.setScalar(0),Ad.fromBufferAttribute(e,n),wd.fromBufferAttribute(e,i),Cd.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Ad,s.x),r.addScaledVector(wd,s.y),r.addScaledVector(Cd,s.z),r}static isFrontFacing(e,n,i,a){return Pi.subVectors(i,n),ma.subVectors(e,n),Pi.cross(ma).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pi.subVectors(this.c,this.b),ma.subVectors(this.a,this.b),Pi.cross(ma).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ai.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Ai.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Ai.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Ai.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ai.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;_r.subVectors(a,i),xr.subVectors(s,i),bd.subVectors(e,i);const l=_r.dot(bd),c=xr.dot(bd);if(l<=0&&c<=0)return n.copy(i);Ed.subVectors(e,a);const d=_r.dot(Ed),p=xr.dot(Ed);if(d>=0&&p<=d)return n.copy(a);const u=l*p-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(_r,r);Td.subVectors(e,s);const m=_r.dot(Td),g=xr.dot(Td);if(g>=0&&m<=g)return n.copy(s);const b=m*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(xr,o);const _=d*g-m*p;if(_<=0&&p-d>=0&&m-g>=0)return sv.subVectors(s,a),o=(p-d)/(p-d+(m-g)),n.copy(a).addScaledVector(sv,o);const h=1/(_+b+u);return r=b*h,o=u*h,n.copy(i).addScaledVector(_r,r).addScaledVector(xr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class lr{constructor(e=new Y(1/0,1/0,1/0),n=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(zi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(zi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=zi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,zi):zi.fromBufferAttribute(s,r),zi.applyMatrix4(e.matrixWorld),this.expandByPoint(zi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),yc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),yc.copy(i.boundingBox)),yc.applyMatrix4(e.matrixWorld),this.union(yc)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,zi),zi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),Mc.subVectors(this.max,Vo),Sr.subVectors(e.a,Vo),yr.subVectors(e.b,Vo),Mr.subVectors(e.c,Vo),Xa.subVectors(yr,Sr),Wa.subVectors(Mr,yr),Cs.subVectors(Sr,Mr);let n=[0,-Xa.z,Xa.y,0,-Wa.z,Wa.y,0,-Cs.z,Cs.y,Xa.z,0,-Xa.x,Wa.z,0,-Wa.x,Cs.z,0,-Cs.x,-Xa.y,Xa.x,0,-Wa.y,Wa.x,0,-Cs.y,Cs.x,0];return!Rd(n,Sr,yr,Mr,Mc)||(n=[1,0,0,0,1,0,0,0,1],!Rd(n,Sr,yr,Mr,Mc))?!1:(bc.crossVectors(Xa,Wa),n=[bc.x,bc.y,bc.z],Rd(n,Sr,yr,Mr,Mc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,zi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(zi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(va[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),va[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),va[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),va[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),va[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),va[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),va[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),va[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(va),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const va=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],zi=new Y,yc=new lr,Sr=new Y,yr=new Y,Mr=new Y,Xa=new Y,Wa=new Y,Cs=new Y,Vo=new Y,Mc=new Y,bc=new Y,Rs=new Y;function Rd(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){Rs.fromArray(t,s);const o=a.x*Math.abs(Rs.x)+a.y*Math.abs(Rs.y)+a.z*Math.abs(Rs.z),l=e.dot(Rs),c=n.dot(Rs),d=i.dot(Rs);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const an=new Y,Ec=new Mt;let ZT=0;class At extends or{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:ZT++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=X0,this.updateRanges=[],this.gpuType=Bi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ec.fromBufferAttribute(this,n),Ec.applyMatrix3(e),this.setXY(n,Ec.x,Ec.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)an.fromBufferAttribute(this,n),an.applyMatrix3(e),this.setXYZ(n,an.x,an.y,an.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)an.fromBufferAttribute(this,n),an.applyMatrix4(e),this.setXYZ(n,an.x,an.y,an.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)an.fromBufferAttribute(this,n),an.applyNormalMatrix(e),this.setXYZ(n,an.x,an.y,an.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)an.fromBufferAttribute(this,n),an.transformDirection(e),this.setXYZ(n,an.x,an.y,an.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Go(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=jn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Go(n,this.array)),n}setX(e,n){return this.normalized&&(n=jn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Go(n,this.array)),n}setY(e,n){return this.normalized&&(n=jn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Go(n,this.array)),n}setZ(e,n){return this.normalized&&(n=jn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Go(n,this.array)),n}setW(e,n){return this.normalized&&(n=jn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=jn(n,this.array),i=jn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=jn(n,this.array),i=jn(i,this.array),a=jn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=jn(n,this.array),i=jn(i,this.array),a=jn(a,this.array),s=jn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==X0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ay extends At{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class wy extends At{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Ri extends At{constructor(e,n,i){super(new Float32Array(e),n,i)}}const KT=new lr,jo=new Y,Nd=new Y;class cr{constructor(e=new Y,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):KT.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;jo.subVectors(e,this.center);const n=jo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(jo,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(jo.copy(e.center).add(Nd)),this.expandByPoint(jo.copy(e.center).sub(Nd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let QT=0;const mi=new Ht,Dd=new Bn,br=new Y,$n=new lr,Xo=new lr,mn=new Y;class Nn extends or{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:QT++}),this.uuid=Kl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(DT(e)?wy:Ay)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return mi.makeRotationFromQuaternion(e),this.applyMatrix4(mi),this}rotateX(e){return mi.makeRotationX(e),this.applyMatrix4(mi),this}rotateY(e){return mi.makeRotationY(e),this.applyMatrix4(mi),this}rotateZ(e){return mi.makeRotationZ(e),this.applyMatrix4(mi),this}translate(e,n,i){return mi.makeTranslation(e,n,i),this.applyMatrix4(mi),this}scale(e,n,i){return mi.makeScale(e,n,i),this.applyMatrix4(mi),this}lookAt(e){return Dd.lookAt(e),Dd.updateMatrix(),this.applyMatrix4(Dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Ri(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&Ge("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new lr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];$n.setFromBufferAttribute(s),this.morphTargetsRelative?(mn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(mn),mn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(mn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&vt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new cr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){vt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){const i=this.boundingSphere.center;if($n.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Xo.setFromBufferAttribute(o),this.morphTargetsRelative?(mn.addVectors($n.min,Xo.min),$n.expandByPoint(mn),mn.addVectors($n.max,Xo.max),$n.expandByPoint(mn)):($n.expandByPoint(Xo.min),$n.expandByPoint(Xo.max))}$n.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)mn.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(mn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)mn.fromBufferAttribute(o,c),l&&(br.fromBufferAttribute(e,c),mn.add(br)),a=Math.max(a,i.distanceToSquared(mn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&vt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){vt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new At(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let M=0;M<i.count;M++)o[M]=new Y,l[M]=new Y;const c=new Y,d=new Y,p=new Y,u=new Mt,m=new Mt,g=new Mt,b=new Y,_=new Y;function h(M,C,w){c.fromBufferAttribute(i,M),d.fromBufferAttribute(i,C),p.fromBufferAttribute(i,w),u.fromBufferAttribute(s,M),m.fromBufferAttribute(s,C),g.fromBufferAttribute(s,w),d.sub(c),p.sub(c),m.sub(u),g.sub(u);const U=1/(m.x*g.y-g.x*m.y);isFinite(U)&&(b.copy(d).multiplyScalar(g.y).addScaledVector(p,-m.y).multiplyScalar(U),_.copy(p).multiplyScalar(m.x).addScaledVector(d,-g.x).multiplyScalar(U),o[M].add(b),o[C].add(b),o[w].add(b),l[M].add(_),l[C].add(_),l[w].add(_))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let M=0,C=v.length;M<C;++M){const w=v[M],U=w.start,O=w.count;for(let k=U,P=U+O;k<P;k+=3)h(e.getX(k+0),e.getX(k+1),e.getX(k+2))}const S=new Y,x=new Y,A=new Y,R=new Y;function T(M){A.fromBufferAttribute(a,M),R.copy(A);const C=o[M];S.copy(C),S.sub(A.multiplyScalar(A.dot(C))).normalize(),x.crossVectors(R,C);const U=x.dot(l[M])<0?-1:1;r.setXYZW(M,S.x,S.y,S.z,U)}for(let M=0,C=v.length;M<C;++M){const w=v[M],U=w.start,O=w.count;for(let k=U,P=U+O;k<P;k+=3)T(e.getX(k+0)),T(e.getX(k+1)),T(e.getX(k+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new At(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const a=new Y,s=new Y,r=new Y,o=new Y,l=new Y,c=new Y,d=new Y,p=new Y;if(e)for(let u=0,m=e.count;u<m;u+=3){const g=e.getX(u+0),b=e.getX(u+1),_=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,b),r.fromBufferAttribute(n,_),d.subVectors(r,s),p.subVectors(a,s),d.cross(p),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,_),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z)}else for(let u=0,m=n.count;u<m;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,s),p.subVectors(a,s),d.cross(p),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)mn.fromBufferAttribute(e,n),mn.normalize(),e.setXYZ(n,mn.x,mn.y,mn.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,p=o.normalized,u=new c.constructor(l.length*d);let m=0,g=0;for(let b=0,_=l.length;b<_;b++){o.isInterleavedBufferAttribute?m=l[b]*o.data.stride+o.offset:m=l[b]*d;for(let h=0;h<d;h++)u[g++]=c[m++]}return new At(u,d,p)}if(this.index===null)return Ge("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Nn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,p=c.length;d<p;d++){const u=c[d],m=e(u,i);l.push(m)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let p=0,u=c.length;p<u;p++){const m=c[p];d.push(m.toJSON(e.data))}d.length>0&&(a[l]=d,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],p=s[c];for(let u=0,m=p.length;u<m;u++)d.push(p[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const p=r[c];this.addGroup(p.start,p.count,p.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let $T=0;class Ro extends or{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$T++}),this.uuid=Kl(),this.name="",this.type="Material",this.blending=Ws,this.side=Ms,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Xh,this.blendDst=Wh,this.blendEquation=Is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ct(0,0,0),this.blendAlpha=0,this.depthFunc=mo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=j0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=hr,this.stencilZFail=hr,this.stencilZPass=hr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ge(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Ge(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(i.blending=this.blending),this.side!==Ms&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Xh&&(i.blendSrc=this.blendSrc),this.blendDst!==Wh&&(i.blendDst=this.blendDst),this.blendEquation!==Is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==mo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==j0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==hr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==hr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==hr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new ct().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Mt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Mt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const _a=new Y,Ud=new Y,Tc=new Y,qa=new Y,Ld=new Y,Ac=new Y,Od=new Y;class eg{constructor(e=new Y,n=new Y(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_a)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=_a.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(_a.copy(this.origin).addScaledVector(this.direction,n),_a.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Ud.copy(e).add(n).multiplyScalar(.5),Tc.copy(n).sub(e).normalize(),qa.copy(this.origin).sub(Ud);const s=e.distanceTo(n)*.5,r=-this.direction.dot(Tc),o=qa.dot(this.direction),l=-qa.dot(Tc),c=qa.lengthSq(),d=Math.abs(1-r*r);let p,u,m,g;if(d>0)if(p=r*l-o,u=r*o-l,g=s*d,p>=0)if(u>=-g)if(u<=g){const b=1/d;p*=b,u*=b,m=p*(p+r*u+2*o)+u*(r*p+u+2*l)+c}else u=s,p=Math.max(0,-(r*u+o)),m=-p*p+u*(u+2*l)+c;else u=-s,p=Math.max(0,-(r*u+o)),m=-p*p+u*(u+2*l)+c;else u<=-g?(p=Math.max(0,-(-r*s+o)),u=p>0?-s:Math.min(Math.max(-s,-l),s),m=-p*p+u*(u+2*l)+c):u<=g?(p=0,u=Math.min(Math.max(-s,-l),s),m=u*(u+2*l)+c):(p=Math.max(0,-(r*s+o)),u=p>0?s:Math.min(Math.max(-s,-l),s),m=-p*p+u*(u+2*l)+c);else u=r>0?-s:s,p=Math.max(0,-(r*u+o)),m=-p*p+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,p),a&&a.copy(Ud).addScaledVector(Tc,u),m}intersectSphere(e,n){_a.subVectors(e.center,this.origin);const i=_a.dot(this.direction),a=_a.dot(_a)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,p=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),p>=0?(o=(e.min.z-u.z)*p,l=(e.max.z-u.z)*p):(o=(e.max.z-u.z)*p,l=(e.min.z-u.z)*p),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,_a)!==null}intersectTriangle(e,n,i,a,s){Ld.subVectors(n,e),Ac.subVectors(i,e),Od.crossVectors(Ld,Ac);let r=this.direction.dot(Od),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;qa.subVectors(this.origin,e);const l=o*this.direction.dot(Ac.crossVectors(qa,Ac));if(l<0)return null;const c=o*this.direction.dot(Ld.cross(qa));if(c<0||l+c>r)return null;const d=-o*qa.dot(Od);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Cy extends Ro{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ct(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new er,this.combine=ry,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rv=new Ht,Ns=new eg,wc=new cr,ov=new Y,Cc=new Y,Rc=new Y,Nc=new Y,Pd=new Y,Dc=new Y,lv=new Y,Uc=new Y;class Di extends Bn{constructor(e=new Nn,n=new Cy){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Dc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],p=s[l];d!==0&&(Pd.fromBufferAttribute(p,e),r?Dc.addScaledVector(Pd,d):Dc.addScaledVector(Pd.sub(n),d))}n.add(Dc)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),wc.copy(i.boundingSphere),wc.applyMatrix4(s),Ns.copy(e.ray).recast(e.near),!(wc.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(wc,ov)===null||Ns.origin.distanceToSquared(ov)>(e.far-e.near)**2))&&(rv.copy(s).invert(),Ns.copy(e.ray).applyMatrix4(rv),!(i.boundingBox!==null&&Ns.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ns)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,p=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const _=u[g],h=r[_.materialIndex],v=Math.max(_.start,m.start),S=Math.min(o.count,Math.min(_.start+_.count,m.start+m.count));for(let x=v,A=S;x<A;x+=3){const R=o.getX(x),T=o.getX(x+1),M=o.getX(x+2);a=Lc(this,h,e,i,c,d,p,R,T,M),a&&(a.faceIndex=Math.floor(x/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const g=Math.max(0,m.start),b=Math.min(o.count,m.start+m.count);for(let _=g,h=b;_<h;_+=3){const v=o.getX(_),S=o.getX(_+1),x=o.getX(_+2);a=Lc(this,r,e,i,c,d,p,v,S,x),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const _=u[g],h=r[_.materialIndex],v=Math.max(_.start,m.start),S=Math.min(l.count,Math.min(_.start+_.count,m.start+m.count));for(let x=v,A=S;x<A;x+=3){const R=x,T=x+1,M=x+2;a=Lc(this,h,e,i,c,d,p,R,T,M),a&&(a.faceIndex=Math.floor(x/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const g=Math.max(0,m.start),b=Math.min(l.count,m.start+m.count);for(let _=g,h=b;_<h;_+=3){const v=_,S=_+1,x=_+2;a=Lc(this,r,e,i,c,d,p,v,S,x),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}}}function JT(t,e,n,i,a,s,r,o){let l;if(e.side===Yn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===Ms,o),l===null)return null;Uc.copy(o),Uc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Uc);return c<n.near||c>n.far?null:{distance:c,point:Uc.clone(),object:t}}function Lc(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,Cc),t.getVertexPosition(l,Rc),t.getVertexPosition(c,Nc);const d=JT(t,e,n,i,Cc,Rc,Nc,lv);if(d){const p=new Y;Ai.getBarycoord(lv,Cc,Rc,Nc,p),a&&(d.uv=Ai.getInterpolatedAttribute(a,o,l,c,p,new Mt)),s&&(d.uv1=Ai.getInterpolatedAttribute(s,o,l,c,p,new Mt)),r&&(d.normal=Ai.getInterpolatedAttribute(r,o,l,c,p,new Y),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new Y,materialIndex:0};Ai.getNormal(Cc,Rc,Nc,u.normal),d.face=u,d.barycoord=p}return d}class Ry extends In{constructor(e=null,n=1,i=1,a,s,r,o,l,c=En,d=En,p,u){super(null,r,o,l,c,d,a,s,p,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Wr extends At{constructor(e,n,i,a=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Er=new Ht,cv=new Ht,Oc=[],uv=new lr,eA=new Ht,Wo=new Di,qo=new cr;class fv extends Di{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Wr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,eA)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new lr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Er),uv.copy(e.boundingBox).applyMatrix4(Er),this.boundingBox.union(uv)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new cr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Er),qo.copy(e.boundingSphere).applyMatrix4(Er),this.boundingSphere.union(qo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(e,n){const i=this.matrixWorld,a=this.count;if(Wo.geometry=this.geometry,Wo.material=this.material,Wo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qo.copy(this.boundingSphere),qo.applyMatrix4(i),e.ray.intersectsSphere(qo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,Er),cv.multiplyMatrices(i,Er),Wo.matrixWorld=cv,Wo.raycast(e,Oc);for(let r=0,o=Oc.length;r<o;r++){const l=Oc[r];l.instanceId=s,l.object=this,n.push(l)}Oc.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new Wr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ry(new Float32Array(a*this.count),a,this.count,Wm,Bi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const zd=new Y,tA=new Y,nA=new Ye;class zs{constructor(e=new Y(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=zd.subVectors(i,n).cross(tA.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const a=e.delta(zd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||nA.getNormalMatrix(e),a=this.coplanarPoint(zd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ds=new cr,iA=new Mt(.5,.5),Pc=new Y;class Ny{constructor(e=new zs,n=new zs,i=new zs,a=new zs,s=new zs,r=new zs){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ji,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],p=s[5],u=s[6],m=s[7],g=s[8],b=s[9],_=s[10],h=s[11],v=s[12],S=s[13],x=s[14],A=s[15];if(a[0].setComponents(c-r,m-d,h-g,A-v).normalize(),a[1].setComponents(c+r,m+d,h+g,A+v).normalize(),a[2].setComponents(c+o,m+p,h+b,A+S).normalize(),a[3].setComponents(c-o,m-p,h-b,A-S).normalize(),i)a[4].setComponents(l,u,_,x).normalize(),a[5].setComponents(c-l,m-u,h-_,A-x).normalize();else if(a[4].setComponents(c-l,m-u,h-_,A-x).normalize(),n===Ji)a[5].setComponents(c+l,m+u,h+_,A+x).normalize();else if(n===$u)a[5].setComponents(l,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ds)}intersectsSprite(e){Ds.center.set(0,0,0);const n=iA.distanceTo(e.center);return Ds.radius=.7071067811865476+n,Ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ds)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Pc.x=a.normal.x>0?e.max.x:e.min.x,Pc.y=a.normal.y>0?e.max.y:e.min.y,Pc.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Pc)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dy extends Ro{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ct(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ef=new Y,tf=new Y,dv=new Ht,Yo=new eg,zc=new cr,Id=new Y,hv=new Y;class aA extends Bn{constructor(e=new Nn,n=new Dy){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)ef.fromBufferAttribute(n,a-1),tf.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=ef.distanceTo(tf);e.setAttribute("lineDistance",new Ri(i,1))}else Ge("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zc.copy(i.boundingSphere),zc.applyMatrix4(a),zc.radius+=s,e.ray.intersectsSphere(zc)===!1)return;dv.copy(a).invert(),Yo.copy(e.ray).applyMatrix4(dv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const m=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let b=m,_=g-1;b<_;b+=c){const h=d.getX(b),v=d.getX(b+1),S=Ic(this,e,Yo,l,h,v,b);S&&n.push(S)}if(this.isLineLoop){const b=d.getX(g-1),_=d.getX(m),h=Ic(this,e,Yo,l,b,_,g-1);h&&n.push(h)}}else{const m=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let b=m,_=g-1;b<_;b+=c){const h=Ic(this,e,Yo,l,b,b+1,b);h&&n.push(h)}if(this.isLineLoop){const b=Ic(this,e,Yo,l,g-1,m,g-1);b&&n.push(b)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ic(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(ef.fromBufferAttribute(o,a),tf.fromBufferAttribute(o,s),n.distanceSqToSegment(ef,tf,Id,hv)>i)return;Id.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Id);if(!(c<e.near||c>e.far))return{distance:c,point:hv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const pv=new Y,mv=new Y;class mu extends aA{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)pv.fromBufferAttribute(n,a),mv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+pv.distanceTo(mv);e.setAttribute("lineDistance",new Ri(i,1))}else Ge("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class sA extends Ro{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ct(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const gv=new Ht,Lp=new eg,Bc=new cr,Fc=new Y;class Op extends Bn{constructor(e=new Nn,n=new sA){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bc.copy(i.boundingSphere),Bc.applyMatrix4(a),Bc.radius+=s,e.ray.intersectsSphere(Bc)===!1)return;gv.copy(a).invert(),Lp.copy(e.ray).applyMatrix4(gv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,p=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),m=Math.min(c.count,r.start+r.count);for(let g=u,b=m;g<b;g++){const _=c.getX(g);Fc.fromBufferAttribute(p,_),vv(Fc,_,l,a,e,n,this)}}else{const u=Math.max(0,r.start),m=Math.min(p.count,r.start+r.count);for(let g=u,b=m;g<b;g++)Fc.fromBufferAttribute(p,g),vv(Fc,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function vv(t,e,n,i,a,s,r){const o=Lp.distanceSqToPoint(t);if(o<n){const l=new Y;Lp.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Uy extends In{constructor(e=[],n=$s,i,a,s,r,o,l,c,d){super(e,n,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class vo extends In{constructor(e,n,i=ia,a,s,r,o=En,l=En,c,d=Fa,p=1){if(d!==Fa&&d!==Hs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:p};super(u,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $m(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class rA extends vo{constructor(e,n=ia,i=$s,a,s,r=En,o=En,l,c=Fa){const d={width:e,height:e,depth:1},p=[d,d,d,d,d,d];super(e,e,n,i,a,s,r,o,l,c),this.image=p,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ly extends In{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class tr extends Nn{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],p=[];let u=0,m=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new Ri(c,3)),this.setAttribute("normal",new Ri(d,3)),this.setAttribute("uv",new Ri(p,2));function g(b,_,h,v,S,x,A,R,T,M,C){const w=x/T,U=A/M,O=x/2,k=A/2,P=R/2,z=T+1,B=M+1;let I=0,L=0;const V=new Y;for(let re=0;re<B;re++){const ce=re*U-k;for(let _e=0;_e<z;_e++){const ke=_e*w-O;V[b]=ke*v,V[_]=ce*S,V[h]=P,c.push(V.x,V.y,V.z),V[b]=0,V[_]=0,V[h]=R>0?1:-1,d.push(V.x,V.y,V.z),p.push(_e/T),p.push(1-re/M),I+=1}}for(let re=0;re<M;re++)for(let ce=0;ce<T;ce++){const _e=u+ce+z*re,ke=u+ce+z*(re+1),Je=u+(ce+1)+z*(re+1),He=u+(ce+1)+z*re;l.push(_e,ke,He),l.push(ke,Je,He),L+=6}o.addGroup(m,L,C),m+=L,u+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new tr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Hc=new Y,Gc=new Y,Bd=new Y,kc=new Ai;class oA extends Nn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const a=Math.pow(10,4),s=Math.cos(pu*n),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],d=["a","b","c"],p=new Array(3),u={},m=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:b,b:_,c:h}=kc;if(b.fromBufferAttribute(o,c[0]),_.fromBufferAttribute(o,c[1]),h.fromBufferAttribute(o,c[2]),kc.getNormal(Bd),p[0]=`${Math.round(b.x*a)},${Math.round(b.y*a)},${Math.round(b.z*a)}`,p[1]=`${Math.round(_.x*a)},${Math.round(_.y*a)},${Math.round(_.z*a)}`,p[2]=`${Math.round(h.x*a)},${Math.round(h.y*a)},${Math.round(h.z*a)}`,!(p[0]===p[1]||p[1]===p[2]||p[2]===p[0]))for(let v=0;v<3;v++){const S=(v+1)%3,x=p[v],A=p[S],R=kc[d[v]],T=kc[d[S]],M=`${x}_${A}`,C=`${A}_${x}`;C in u&&u[C]?(Bd.dot(u[C].normal)<=s&&(m.push(R.x,R.y,R.z),m.push(T.x,T.y,T.z)),u[C]=null):M in u||(u[M]={index0:c[v],index1:c[S],normal:Bd.clone()})}}for(const g in u)if(u[g]){const{index0:b,index1:_}=u[g];Hc.fromBufferAttribute(o,b),Gc.fromBufferAttribute(o,_),m.push(Hc.x,Hc.y,Hc.z),m.push(Gc.x,Gc.y,Gc.z)}this.setAttribute("position",new Ri(m,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Ef extends Nn{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,p=e/o,u=n/l,m=[],g=[],b=[],_=[];for(let h=0;h<d;h++){const v=h*u-r;for(let S=0;S<c;S++){const x=S*p-s;g.push(x,-v,0),b.push(0,0,1),_.push(S/o),_.push(1-h/l)}}for(let h=0;h<l;h++)for(let v=0;v<o;v++){const S=v+c*h,x=v+c*(h+1),A=v+1+c*(h+1),R=v+1+c*h;m.push(S,x,R),m.push(x,A,R)}this.setIndex(m),this.setAttribute("position",new Ri(g,3)),this.setAttribute("normal",new Ri(b,3)),this.setAttribute("uv",new Ri(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ef(e.width,e.height,e.widthSegments,e.heightSegments)}}function _o(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];if(_v(a))a.isRenderTargetTexture?(Ge("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone();else if(Array.isArray(a))if(_v(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();e[n][i]=s}else e[n][i]=a.slice();else e[n][i]=a}}return e}function On(t){const e={};for(let n=0;n<t.length;n++){const i=_o(t[n]);for(const a in i)e[a]=i[a]}return e}function _v(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function lA(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Oy(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ht.workingColorSpace}const cA={clone:_o,merge:On};var uA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Tn extends Ro{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=uA,this.fragmentShader=fA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_o(e.uniforms),this.uniformsGroups=lA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const a=e.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new ct().setHex(a.value);break;case"v2":this.uniforms[i].value=new Mt().fromArray(a.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(a.value);break;case"v4":this.uniforms[i].value=new Qt().fromArray(a.value);break;case"m3":this.uniforms[i].value=new Ye().fromArray(a.value);break;case"m4":this.uniforms[i].value=new Ht().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class dA extends Tn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class hA extends Ro{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=bT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class pA extends Ro{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vc=new Y,jc=new Co,Wi=new Y;class Py extends Bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ht,this.projectionMatrix=new Ht,this.projectionMatrixInverse=new Ht,this.coordinateSystem=Ji,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vc,jc,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,jc,Wi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Vc,jc,Wi),Wi.x===1&&Wi.y===1&&Wi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,jc,Wi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ya=new Y,xv=new Mt,Sv=new Mt;class yi extends Py{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Up*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(pu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Up*2*Math.atan(Math.tan(pu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ya.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ya.x,Ya.y).multiplyScalar(-e/Ya.z),Ya.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ya.x,Ya.y).multiplyScalar(-e/Ya.z)}getViewSize(e,n){return this.getViewBounds(e,xv,Sv),n.subVectors(Sv,xv)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(pu*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class tg extends Py{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Tr=-90,Ar=1;class mA extends Bn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new yi(Tr,Ar,e,n);a.layers=this.layers,this.add(a);const s=new yi(Tr,Ar,e,n);s.layers=this.layers,this.add(s);const r=new yi(Tr,Ar,e,n);r.layers=this.layers,this.add(r);const o=new yi(Tr,Ar,e,n);o.layers=this.layers,this.add(o);const l=new yi(Tr,Ar,e,n);l.layers=this.layers,this.add(l);const c=new yi(Tr,Ar,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===Ji)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===$u)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,p=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(p,u,m),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class gA extends yi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const og=class og{constructor(e,n,i,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,a){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=a,this}};og.prototype.isMatrix2=!0;let yv=og;function Mv(t,e,n,i){const a=vA(i);switch(n){case xy:return t*e;case Wm:return t*e/a.components*a.byteLength;case qm:return t*e/a.components*a.byteLength;case Js:return t*e*2/a.components*a.byteLength;case Ym:return t*e*2/a.components*a.byteLength;case Sy:return t*e*3/a.components*a.byteLength;case Fi:return t*e*4/a.components*a.byteLength;case Zm:return t*e*4/a.components*a.byteLength;case uu:case fu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case du:case hu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ip:case sp:return Math.max(t,16)*Math.max(e,8)/4;case np:case ap:return Math.max(t,8)*Math.max(e,8)/2;case rp:case op:case cp:case up:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case lp:case Yu:case fp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case dp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case pp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case mp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case gp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case vp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case _p:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case xp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Sp:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case yp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Mp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case bp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Ep:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Tp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Ap:case wp:case Cp:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Rp:case Np:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Zu:case Dp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function vA(t){switch(t){case Ti:case my:return{byteLength:1,components:1};case Ol:case gy:case Ba:return{byteLength:2,components:1};case jm:case Xm:return{byteLength:2,components:4};case ia:case Vm:case Bi:return{byteLength:4,components:1};case vy:case _y:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:km}}));typeof window<"u"&&(window.__THREE__?Ge("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=km);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zy(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function _A(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,p=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,d),o.onUploadCallback();let m;if(c instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=t.SHORT;else if(c instanceof Uint32Array)m=t.UNSIGNED_INT;else if(c instanceof Int32Array)m=t.INT;else if(c instanceof Int8Array)m=t.BYTE;else if(c instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:p}}function i(o,l,c){const d=l.array,p=l.updateRanges;if(t.bindBuffer(c,o),p.length===0)t.bufferSubData(c,0,d);else{p.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<p.length;m++){const g=p[u],b=p[m];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,p[u]=b)}p.length=u+1;for(let m=0,g=p.length;m<g;m++){const b=p[m];t.bufferSubData(c,b.start*d.BYTES_PER_ELEMENT,d,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var xA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,SA=`#ifdef USE_ALPHAHASH
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
#endif`,yA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,MA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,bA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,EA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,TA=`#ifdef USE_AOMAP
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
#endif`,AA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wA=`#ifdef USE_BATCHING
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
#endif`,CA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,RA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,NA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,DA=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,UA=`#ifdef USE_IRIDESCENCE
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
#endif`,LA=`#ifdef USE_BUMPMAP
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
#endif`,OA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,PA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,zA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,IA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,BA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,FA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,HA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,GA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,kA=`#define PI 3.141592653589793
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
} // validated`,VA=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,jA=`vec3 transformedNormal = objectNormal;
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
#endif`,XA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,WA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,YA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ZA="gl_FragColor = linearToOutputTexel( gl_FragColor );",KA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,QA=`#ifdef USE_ENVMAP
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
#endif`,$A=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,JA=`#ifdef USE_ENVMAP
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
#endif`,e1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t1=`#ifdef USE_ENVMAP
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
#endif`,n1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,i1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,a1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,s1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,r1=`#ifdef USE_GRADIENTMAP
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
}`,o1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,l1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,c1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,u1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,f1=`#ifdef USE_ENVMAP
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
#endif`,d1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,h1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,p1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,m1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,g1=`PhysicalMaterial material;
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
#endif`,v1=`uniform sampler2D dfgLUT;
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
}`,_1=`
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
#endif`,x1=`#if defined( RE_IndirectDiffuse )
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
#endif`,S1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,y1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,M1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,b1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,T1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,A1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,w1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,C1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,R1=`#if defined( USE_POINTS_UV )
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
#endif`,N1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,D1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,U1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,L1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,O1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,P1=`#ifdef USE_MORPHTARGETS
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
#endif`,z1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,I1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,B1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,F1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,k1=`#ifdef USE_NORMALMAP
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
#endif`,V1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,X1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,W1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,q1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Y1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Z1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,K1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,J1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,ew=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,tw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,iw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,aw=`float getShadowMask() {
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
}`,sw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rw=`#ifdef USE_SKINNING
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
#endif`,ow=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,lw=`#ifdef USE_SKINNING
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
#endif`,cw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,uw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,fw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hw=`#ifdef USE_TRANSMISSION
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
#endif`,pw=`#ifdef USE_TRANSMISSION
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
#endif`,mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_w=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const xw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Sw=`uniform sampler2D t2D;
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
}`,yw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ew=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tw=`#include <common>
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
}`,Aw=`#if DEPTH_PACKING == 3200
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
}`,ww=`#define DISTANCE
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
}`,Cw=`#define DISTANCE
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
}`,Rw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dw=`uniform float scale;
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
}`,Uw=`uniform vec3 diffuse;
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
}`,Lw=`#include <common>
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
}`,Ow=`uniform vec3 diffuse;
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
}`,Pw=`#define LAMBERT
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
}`,zw=`#define LAMBERT
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
}`,Iw=`#define MATCAP
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
}`,Bw=`#define MATCAP
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
}`,Fw=`#define NORMAL
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
}`,Hw=`#define NORMAL
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
}`,Gw=`#define PHONG
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
}`,kw=`#define PHONG
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
}`,Vw=`#define STANDARD
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
}`,jw=`#define STANDARD
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
}`,Xw=`#define TOON
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
}`,Ww=`#define TOON
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
}`,qw=`uniform float size;
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
}`,Yw=`uniform vec3 diffuse;
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
}`,Zw=`#include <common>
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
}`,Kw=`uniform vec3 color;
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
}`,Qw=`uniform float rotation;
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
}`,$w=`uniform vec3 diffuse;
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
}`,st={alphahash_fragment:xA,alphahash_pars_fragment:SA,alphamap_fragment:yA,alphamap_pars_fragment:MA,alphatest_fragment:bA,alphatest_pars_fragment:EA,aomap_fragment:TA,aomap_pars_fragment:AA,batching_pars_vertex:wA,batching_vertex:CA,begin_vertex:RA,beginnormal_vertex:NA,bsdfs:DA,iridescence_fragment:UA,bumpmap_pars_fragment:LA,clipping_planes_fragment:OA,clipping_planes_pars_fragment:PA,clipping_planes_pars_vertex:zA,clipping_planes_vertex:IA,color_fragment:BA,color_pars_fragment:FA,color_pars_vertex:HA,color_vertex:GA,common:kA,cube_uv_reflection_fragment:VA,defaultnormal_vertex:jA,displacementmap_pars_vertex:XA,displacementmap_vertex:WA,emissivemap_fragment:qA,emissivemap_pars_fragment:YA,colorspace_fragment:ZA,colorspace_pars_fragment:KA,envmap_fragment:QA,envmap_common_pars_fragment:$A,envmap_pars_fragment:JA,envmap_pars_vertex:e1,envmap_physical_pars_fragment:f1,envmap_vertex:t1,fog_vertex:n1,fog_pars_vertex:i1,fog_fragment:a1,fog_pars_fragment:s1,gradientmap_pars_fragment:r1,lightmap_pars_fragment:o1,lights_lambert_fragment:l1,lights_lambert_pars_fragment:c1,lights_pars_begin:u1,lights_toon_fragment:d1,lights_toon_pars_fragment:h1,lights_phong_fragment:p1,lights_phong_pars_fragment:m1,lights_physical_fragment:g1,lights_physical_pars_fragment:v1,lights_fragment_begin:_1,lights_fragment_maps:x1,lights_fragment_end:S1,lightprobes_pars_fragment:y1,logdepthbuf_fragment:M1,logdepthbuf_pars_fragment:b1,logdepthbuf_pars_vertex:E1,logdepthbuf_vertex:T1,map_fragment:A1,map_pars_fragment:w1,map_particle_fragment:C1,map_particle_pars_fragment:R1,metalnessmap_fragment:N1,metalnessmap_pars_fragment:D1,morphinstance_vertex:U1,morphcolor_vertex:L1,morphnormal_vertex:O1,morphtarget_pars_vertex:P1,morphtarget_vertex:z1,normal_fragment_begin:I1,normal_fragment_maps:B1,normal_pars_fragment:F1,normal_pars_vertex:H1,normal_vertex:G1,normalmap_pars_fragment:k1,clearcoat_normal_fragment_begin:V1,clearcoat_normal_fragment_maps:j1,clearcoat_pars_fragment:X1,iridescence_pars_fragment:W1,opaque_fragment:q1,packing:Y1,premultiplied_alpha_fragment:Z1,project_vertex:K1,dithering_fragment:Q1,dithering_pars_fragment:$1,roughnessmap_fragment:J1,roughnessmap_pars_fragment:ew,shadowmap_pars_fragment:tw,shadowmap_pars_vertex:nw,shadowmap_vertex:iw,shadowmask_pars_fragment:aw,skinbase_vertex:sw,skinning_pars_vertex:rw,skinning_vertex:ow,skinnormal_vertex:lw,specularmap_fragment:cw,specularmap_pars_fragment:uw,tonemapping_fragment:fw,tonemapping_pars_fragment:dw,transmission_fragment:hw,transmission_pars_fragment:pw,uv_pars_fragment:mw,uv_pars_vertex:gw,uv_vertex:vw,worldpos_vertex:_w,background_vert:xw,background_frag:Sw,backgroundCube_vert:yw,backgroundCube_frag:Mw,cube_vert:bw,cube_frag:Ew,depth_vert:Tw,depth_frag:Aw,distance_vert:ww,distance_frag:Cw,equirect_vert:Rw,equirect_frag:Nw,linedashed_vert:Dw,linedashed_frag:Uw,meshbasic_vert:Lw,meshbasic_frag:Ow,meshlambert_vert:Pw,meshlambert_frag:zw,meshmatcap_vert:Iw,meshmatcap_frag:Bw,meshnormal_vert:Fw,meshnormal_frag:Hw,meshphong_vert:Gw,meshphong_frag:kw,meshphysical_vert:Vw,meshphysical_frag:jw,meshtoon_vert:Xw,meshtoon_frag:Ww,points_vert:qw,points_frag:Yw,shadow_vert:Zw,shadow_frag:Kw,sprite_vert:Qw,sprite_frag:$w},Ee={common:{diffuse:{value:new ct(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new Mt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ct(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new ct(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new ct(16777215)},opacity:{value:1},center:{value:new Mt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}},Yi={basic:{uniforms:On([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.fog]),vertexShader:st.meshbasic_vert,fragmentShader:st.meshbasic_frag},lambert:{uniforms:On([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ct(0)},envMapIntensity:{value:1}}]),vertexShader:st.meshlambert_vert,fragmentShader:st.meshlambert_frag},phong:{uniforms:On([Ee.common,Ee.specularmap,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,Ee.lights,{emissive:{value:new ct(0)},specular:{value:new ct(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:st.meshphong_vert,fragmentShader:st.meshphong_frag},standard:{uniforms:On([Ee.common,Ee.envmap,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.roughnessmap,Ee.metalnessmap,Ee.fog,Ee.lights,{emissive:{value:new ct(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag},toon:{uniforms:On([Ee.common,Ee.aomap,Ee.lightmap,Ee.emissivemap,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.gradientmap,Ee.fog,Ee.lights,{emissive:{value:new ct(0)}}]),vertexShader:st.meshtoon_vert,fragmentShader:st.meshtoon_frag},matcap:{uniforms:On([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,Ee.fog,{matcap:{value:null}}]),vertexShader:st.meshmatcap_vert,fragmentShader:st.meshmatcap_frag},points:{uniforms:On([Ee.points,Ee.fog]),vertexShader:st.points_vert,fragmentShader:st.points_frag},dashed:{uniforms:On([Ee.common,Ee.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:st.linedashed_vert,fragmentShader:st.linedashed_frag},depth:{uniforms:On([Ee.common,Ee.displacementmap]),vertexShader:st.depth_vert,fragmentShader:st.depth_frag},normal:{uniforms:On([Ee.common,Ee.bumpmap,Ee.normalmap,Ee.displacementmap,{opacity:{value:1}}]),vertexShader:st.meshnormal_vert,fragmentShader:st.meshnormal_frag},sprite:{uniforms:On([Ee.sprite,Ee.fog]),vertexShader:st.sprite_vert,fragmentShader:st.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:st.background_vert,fragmentShader:st.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:st.backgroundCube_vert,fragmentShader:st.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:st.cube_vert,fragmentShader:st.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:st.equirect_vert,fragmentShader:st.equirect_frag},distance:{uniforms:On([Ee.common,Ee.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:st.distance_vert,fragmentShader:st.distance_frag},shadow:{uniforms:On([Ee.lights,Ee.fog,{color:{value:new ct(0)},opacity:{value:1}}]),vertexShader:st.shadow_vert,fragmentShader:st.shadow_frag}};Yi.physical={uniforms:On([Yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new Mt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new ct(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new Mt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new ct(0)},specularColor:{value:new ct(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new Mt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:st.meshphysical_vert,fragmentShader:st.meshphysical_frag};const Xc={r:0,b:0,g:0},Jw=new Ht,Iy=new Ye;Iy.set(-1,0,0,0,1,0,0,0,1);function eC(t,e,n,i,a,s){const r=new ct(0);let o=a===!0?0:1,l,c,d=null,p=0,u=null;function m(v){let S=v.isScene===!0?v.background:null;if(S&&S.isTexture){const x=v.backgroundBlurriness>0;S=e.get(S,x)}return S}function g(v){let S=!1;const x=m(v);x===null?_(r,o):x&&x.isColor&&(_(x,1),S=!0);const A=t.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function b(v,S){const x=m(S);x&&(x.isCubeTexture||x.mapping===bf)?(c===void 0&&(c=new Di(new tr(1,1,1),new Tn({name:"BackgroundCubeMaterial",uniforms:_o(Yi.backgroundCube.uniforms),vertexShader:Yi.backgroundCube.vertexShader,fragmentShader:Yi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Jw.makeRotationFromEuler(S.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Iy),c.material.toneMapped=ht.getTransfer(x.colorSpace)!==Nt,(d!==x||p!==x.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,d=x,p=x.version,u=t.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Di(new Ef(2,2),new Tn({name:"BackgroundMaterial",uniforms:_o(Yi.background.uniforms),vertexShader:Yi.background.vertexShader,fragmentShader:Yi.background.fragmentShader,side:Ms,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=ht.getTransfer(x.colorSpace)!==Nt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||p!==x.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,d=x,p=x.version,u=t.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function _(v,S){v.getRGB(Xc,Oy(t)),n.buffers.color.setClear(Xc.r,Xc.g,Xc.b,S,s)}function h(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,S=1){r.set(v),o=S,_(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,_(r,o)},render:g,addToRenderList:b,dispose:h}}function tC(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(U,O,k,P,z){let B=!1;const I=p(U,P,k,O);s!==I&&(s=I,c(s.object)),B=m(U,P,k,z),B&&g(U,P,k,z),z!==null&&e.update(z,t.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,x(U,O,k,P),z!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return t.createVertexArray()}function c(U){return t.bindVertexArray(U)}function d(U){return t.deleteVertexArray(U)}function p(U,O,k,P){const z=P.wireframe===!0;let B=i[O.id];B===void 0&&(B={},i[O.id]=B);const I=U.isInstancedMesh===!0?U.id:0;let L=B[I];L===void 0&&(L={},B[I]=L);let V=L[k.id];V===void 0&&(V={},L[k.id]=V);let re=V[z];return re===void 0&&(re=u(l()),V[z]=re),re}function u(U){const O=[],k=[],P=[];for(let z=0;z<n;z++)O[z]=0,k[z]=0,P[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:k,attributeDivisors:P,object:U,attributes:{},index:null}}function m(U,O,k,P){const z=s.attributes,B=O.attributes;let I=0;const L=k.getAttributes();for(const V in L)if(L[V].location>=0){const ce=z[V];let _e=B[V];if(_e===void 0&&(V==="instanceMatrix"&&U.instanceMatrix&&(_e=U.instanceMatrix),V==="instanceColor"&&U.instanceColor&&(_e=U.instanceColor)),ce===void 0||ce.attribute!==_e||_e&&ce.data!==_e.data)return!0;I++}return s.attributesNum!==I||s.index!==P}function g(U,O,k,P){const z={},B=O.attributes;let I=0;const L=k.getAttributes();for(const V in L)if(L[V].location>=0){let ce=B[V];ce===void 0&&(V==="instanceMatrix"&&U.instanceMatrix&&(ce=U.instanceMatrix),V==="instanceColor"&&U.instanceColor&&(ce=U.instanceColor));const _e={};_e.attribute=ce,ce&&ce.data&&(_e.data=ce.data),z[V]=_e,I++}s.attributes=z,s.attributesNum=I,s.index=P}function b(){const U=s.newAttributes;for(let O=0,k=U.length;O<k;O++)U[O]=0}function _(U){h(U,0)}function h(U,O){const k=s.newAttributes,P=s.enabledAttributes,z=s.attributeDivisors;k[U]=1,P[U]===0&&(t.enableVertexAttribArray(U),P[U]=1),z[U]!==O&&(t.vertexAttribDivisor(U,O),z[U]=O)}function v(){const U=s.newAttributes,O=s.enabledAttributes;for(let k=0,P=O.length;k<P;k++)O[k]!==U[k]&&(t.disableVertexAttribArray(k),O[k]=0)}function S(U,O,k,P,z,B,I){I===!0?t.vertexAttribIPointer(U,O,k,z,B):t.vertexAttribPointer(U,O,k,P,z,B)}function x(U,O,k,P){b();const z=P.attributes,B=k.getAttributes(),I=O.defaultAttributeValues;for(const L in B){const V=B[L];if(V.location>=0){let re=z[L];if(re===void 0&&(L==="instanceMatrix"&&U.instanceMatrix&&(re=U.instanceMatrix),L==="instanceColor"&&U.instanceColor&&(re=U.instanceColor)),re!==void 0){const ce=re.normalized,_e=re.itemSize,ke=e.get(re);if(ke===void 0)continue;const Je=ke.buffer,He=ke.type,se=ke.bytesPerElement,ge=He===t.INT||He===t.UNSIGNED_INT||re.gpuType===Vm;if(re.isInterleavedBufferAttribute){const he=re.data,Te=he.stride,Ie=re.offset;if(he.isInstancedInterleavedBuffer){for(let W=0;W<V.locationSize;W++)h(V.location+W,he.meshPerAttribute);U.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let W=0;W<V.locationSize;W++)_(V.location+W);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let W=0;W<V.locationSize;W++)S(V.location+W,_e/V.locationSize,He,ce,Te*se,(Ie+_e/V.locationSize*W)*se,ge)}else{if(re.isInstancedBufferAttribute){for(let he=0;he<V.locationSize;he++)h(V.location+he,re.meshPerAttribute);U.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let he=0;he<V.locationSize;he++)_(V.location+he);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let he=0;he<V.locationSize;he++)S(V.location+he,_e/V.locationSize,He,ce,_e*se,_e/V.locationSize*he*se,ge)}}else if(I!==void 0){const ce=I[L];if(ce!==void 0)switch(ce.length){case 2:t.vertexAttrib2fv(V.location,ce);break;case 3:t.vertexAttrib3fv(V.location,ce);break;case 4:t.vertexAttrib4fv(V.location,ce);break;default:t.vertexAttrib1fv(V.location,ce)}}}}v()}function A(){C();for(const U in i){const O=i[U];for(const k in O){const P=O[k];for(const z in P){const B=P[z];for(const I in B)d(B[I].object),delete B[I];delete P[z]}}delete i[U]}}function R(U){if(i[U.id]===void 0)return;const O=i[U.id];for(const k in O){const P=O[k];for(const z in P){const B=P[z];for(const I in B)d(B[I].object),delete B[I];delete P[z]}}delete i[U.id]}function T(U){for(const O in i){const k=i[O];for(const P in k){const z=k[P];if(z[U.id]===void 0)continue;const B=z[U.id];for(const I in B)d(B[I].object),delete B[I];delete z[U.id]}}}function M(U){for(const O in i){const k=i[O],P=U.isInstancedMesh===!0?U.id:0,z=k[P];if(z!==void 0){for(const B in z){const I=z[B];for(const L in I)d(I[L].object),delete I[L];delete z[B]}delete k[P],Object.keys(k).length===0&&delete i[O]}}}function C(){w(),r=!0,s!==a&&(s=a,c(s.object))}function w(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:M,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:_,disableUnusedAttributes:v}}function nC(t,e,n){let i;function a(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,d){d!==0&&(t.drawArraysInstanced(i,l,c,d),n.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let m=0;m<d;m++)u+=c[m];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function iC(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Fi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const M=T===Ba&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Ti&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Bi&&!M)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(Ge("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const p=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Ge("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),h=t.getParameter(t.MAX_VERTEX_ATTRIBS),v=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),A=t.getParameter(t.MAX_SAMPLES),R=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:p,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:_,maxAttributes:h,maxVertexUniforms:v,maxVaryings:S,maxFragmentUniforms:x,maxSamples:A,samples:R}}function aC(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new zs,o=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(p,u){const m=p.length!==0||u||i!==0||a;return a=u,i=p.length,m},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(p,u){n=d(p,u,0)},this.setState=function(p,u,m){const g=p.clippingPlanes,b=p.clipIntersection,_=p.clipShadows,h=t.get(p);if(!a||g===null||g.length===0||s&&!_)s?d(null):c();else{const v=s?0:i,S=v*4;let x=h.clippingState||null;l.value=x,x=d(g,u,S,m);for(let A=0;A!==S;++A)x[A]=n[A];h.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(p,u,m,g){const b=p!==null?p.length:0;let _=null;if(b!==0){if(_=l.value,g!==!0||_===null){const h=m+b*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(_===null||_.length<h)&&(_=new Float32Array(h));for(let S=0,x=m;S!==b;++S,x+=4)r.copy(p[S]).applyMatrix4(v,o),r.normal.toArray(_,x),_[x+3]=r.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,_}}const os=4,bv=[.125,.215,.35,.446,.526,.582],Bs=20,sC=256,Zo=new tg,Ev=new ct;let Fd=null,Hd=0,Gd=0,kd=!1;const rC=new Y;class Tv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=rC}=s;Fd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Gd=this._renderer.getActiveMipmapLevel(),kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fd,Hd,Gd),this._renderer.xr.enabled=kd,e.scissorTest=!1,wr(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===$s||e.mapping===go?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Gd=this._renderer.getActiveMipmapLevel(),kd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Rn,minFilter:Rn,generateMipmaps:!1,type:Ba,format:Fi,colorSpace:Ku,depthBuffer:!1},a=Av(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Av(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=oC(s)),this._blurMaterial=cC(s,e,n),this._ggxMaterial=lC(s,e,n)}return a}_compileMaterial(e){const n=new Di(new Nn,e);this._renderer.compile(n,Zo)}_sceneToCubeUV(e,n,i,a,s){const l=new yi(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],p=this._renderer,u=p.autoClear,m=p.toneMapping;p.getClearColor(Ev),p.toneMapping=ta,p.autoClear=!1,p.state.buffers.depth.getReversed()&&(p.setRenderTarget(a),p.clearDepth(),p.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Di(new tr,new Cy({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,_=b.material;let h=!1;const v=e.background;v?v.isColor&&(_.color.copy(v),e.background=null,h=!0):(_.color.copy(Ev),h=!0);for(let S=0;S<6;S++){const x=S%3;x===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[S],s.y,s.z)):x===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[S]));const A=this._cubeSize;wr(a,x*A,S>2?A:0,A,A),p.setRenderTarget(a),h&&p.render(b,l),p.render(e,l)}p.toneMapping=m,p.autoClear=u,e.background=v}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===$s||e.mapping===go;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wv());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;wr(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Zo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),p=Math.sqrt(c*c-d*d),u=0+c*1.25,m=p*u,{_lodMax:g}=this,b=this._sizeLods[i],_=3*b*(i>g-os?i-g+os:0),h=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=m,l.mipInt.value=g-n,wr(s,_,h,3*b,2*b),a.setRenderTarget(s),a.render(o,Zo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,wr(e,_,h,3*b,2*b),a.setRenderTarget(e),a.render(o,Zo)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&vt("blur direction must be either latitudinal or longitudinal!");const d=3,p=this._lodMeshes[a];p.material=c;const u=c.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Bs-1),b=s/g,_=isFinite(s)?1+Math.floor(d*b):Bs;_>Bs&&Ge(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Bs}`);const h=[];let v=0;for(let T=0;T<Bs;++T){const M=T/b,C=Math.exp(-M*M/2);h.push(C),T===0?v+=C:T<_&&(v+=2*C)}for(let T=0;T<h.length;T++)h[T]=h[T]/v;u.envMap.value=e.texture,u.samples.value=_,u.weights.value=h,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-i;const x=this._sizeLods[a],A=3*x*(a>S-os?a-S+os:0),R=4*(this._cubeSize-x);wr(n,A,R,3*x,2*x),l.setRenderTarget(n),l.render(p,Zo)}}function oC(t){const e=[],n=[],i=[];let a=t;const s=t-os+1+bv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-os?l=bv[r-t+os-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,p=1+c,u=[d,d,p,d,p,p,d,d,p,p,d,p],m=6,g=6,b=3,_=2,h=1,v=new Float32Array(b*g*m),S=new Float32Array(_*g*m),x=new Float32Array(h*g*m);for(let R=0;R<m;R++){const T=R%3*2/3-1,M=R>2?0:-1,C=[T,M,0,T+2/3,M,0,T+2/3,M+1,0,T,M,0,T+2/3,M+1,0,T,M+1,0];v.set(C,b*g*R),S.set(u,_*g*R);const w=[R,R,R,R,R,R];x.set(w,h*g*R)}const A=new Nn;A.setAttribute("position",new At(v,b)),A.setAttribute("uv",new At(S,_)),A.setAttribute("faceIndex",new At(x,h)),i.push(new Di(A,null)),a>os&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Av(t,e,n){const i=new na(t,e,n);return i.texture.mapping=bf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function wr(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function lC(t,e,n){return new Tn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:sC,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Tf(),fragmentShader:`

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
		`,blending:Da,depthTest:!1,depthWrite:!1})}function cC(t,e,n){const i=new Float32Array(Bs),a=new Y(0,1,0);return new Tn({name:"SphericalGaussianBlur",defines:{n:Bs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Tf(),fragmentShader:`

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
		`,blending:Da,depthTest:!1,depthWrite:!1})}function wv(){return new Tn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tf(),fragmentShader:`

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
		`,blending:Da,depthTest:!1,depthWrite:!1})}function Cv(){return new Tn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Da,depthTest:!1,depthWrite:!1})}function Tf(){return`

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
	`}class By extends na{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Uy(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new tr(5,5,5),s=new Tn({name:"CubemapFromEquirect",uniforms:_o(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yn,blending:Da});s.uniforms.tEquirect.value=n;const r=new Di(a,s),o=n.minFilter;return n.minFilter===Fs&&(n.minFilter=Rn),new mA(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function uC(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,m=!1){return u==null?null:m?r(u):s(u)}function s(u){if(u&&u.isTexture){const m=u.mapping;if(m===fd||m===dd)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new By(g.height);return b.fromEquirectangularTexture(t,u),e.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const m=u.mapping,g=m===fd||m===dd,b=m===$s||m===go;if(g||b){let _=n.get(u);const h=_!==void 0?_.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==h)return i===null&&(i=new Tv(t)),_=g?i.fromEquirectangular(u,_):i.fromCubemap(u,_),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),_.texture;if(_!==void 0)return _.texture;{const v=u.image;return g&&v&&v.height>0||b&&v&&l(v)?(i===null&&(i=new Tv(t)),_=g?i.fromEquirectangular(u):i.fromCubemap(u),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),u.addEventListener("dispose",d),_.texture):null}}}return u}function o(u,m){return m===fd?u.mapping=$s:m===dd&&(u.mapping=go),u}function l(u){let m=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&m++;return m===g}function c(u){const m=u.target;m.removeEventListener("dispose",c);const g=e.get(m);g!==void 0&&(e.delete(m),g.dispose())}function d(u){const m=u.target;m.removeEventListener("dispose",d);const g=n.get(m);g!==void 0&&(n.delete(m),g.dispose())}function p(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:p}}function fC(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&to("WebGLRenderer: "+i+" extension not supported."),a}}}function dC(t,e,n,i){const a={},s=new WeakMap;function r(p){const u=p.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const m=s.get(u);m&&(e.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(p,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(p){const u=p.attributes;for(const m in u)e.update(u[m],t.ARRAY_BUFFER)}function c(p){const u=[],m=p.index,g=p.attributes.position;let b=0;if(g===void 0)return;if(m!==null){const v=m.array;b=m.version;for(let S=0,x=v.length;S<x;S+=3){const A=v[S+0],R=v[S+1],T=v[S+2];u.push(A,R,R,T,T,A)}}else{const v=g.array;b=g.version;for(let S=0,x=v.length/3-1;S<x;S+=3){const A=S+0,R=S+1,T=S+2;u.push(A,R,R,T,T,A)}}const _=new(g.count>=65535?wy:Ay)(u,1);_.version=b;const h=s.get(p);h&&e.remove(h),s.set(p,_)}function d(p){const u=s.get(p);if(u){const m=p.index;m!==null&&u.version<m.version&&c(p)}else c(p);return s.get(p)}return{get:o,update:l,getWireframeAttribute:d}}function hC(t,e,n){let i;function a(p){i=p}let s,r;function o(p){s=p.type,r=p.bytesPerElement}function l(p,u){t.drawElements(i,u,s,p*r),n.update(u,i,1)}function c(p,u,m){m!==0&&(t.drawElementsInstanced(i,u,s,p*r,m),n.update(u,i,m))}function d(p,u,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,p,0,m);let b=0;for(let _=0;_<m;_++)b+=u[_];n.update(b,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function pC(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:vt("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function mC(t,e,n){const i=new WeakMap,a=new Qt;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,p=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==p){let w=function(){M.dispose(),i.delete(o),o.removeEventListener("dispose",w)};var m=w;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,h=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),b===!0&&(x=2),_===!0&&(x=3);let A=o.attributes.position.count*x,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const T=new Float32Array(A*R*4*p),M=new My(T,A,R,p);M.type=Bi,M.needsUpdate=!0;const C=x*4;for(let U=0;U<p;U++){const O=h[U],k=v[U],P=S[U],z=A*R*4*U;for(let B=0;B<O.count;B++){const I=B*C;g===!0&&(a.fromBufferAttribute(O,B),T[z+I+0]=a.x,T[z+I+1]=a.y,T[z+I+2]=a.z,T[z+I+3]=0),b===!0&&(a.fromBufferAttribute(k,B),T[z+I+4]=a.x,T[z+I+5]=a.y,T[z+I+6]=a.z,T[z+I+7]=0),_===!0&&(a.fromBufferAttribute(P,B),T[z+I+8]=a.x,T[z+I+9]=a.y,T[z+I+10]=a.z,T[z+I+11]=P.itemSize===4?a.w:1)}}u={count:p,texture:M,size:new Mt(A,R)},i.set(o,u),o.addEventListener("dispose",w)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let _=0;_<c.length;_++)g+=c[_];const b=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",b),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function gC(t,e,n,i,a){let s=new WeakMap;function r(c){const d=a.render.frame,p=c.geometry,u=e.get(c,p);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const m=c.skeleton;s.get(m)!==d&&(m.update(),s.set(m,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const vC={[oy]:"LINEAR_TONE_MAPPING",[ly]:"REINHARD_TONE_MAPPING",[cy]:"CINEON_TONE_MAPPING",[uy]:"ACES_FILMIC_TONE_MAPPING",[dy]:"AGX_TONE_MAPPING",[hy]:"NEUTRAL_TONE_MAPPING",[fy]:"CUSTOM_TONE_MAPPING"};function _C(t,e,n,i,a,s){const r=new na(e,n,{type:t,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new vo(e,n):void 0}),o=new na(e,n,{type:Ba,depthBuffer:!1,stencilBuffer:!1}),l=new Nn;l.setAttribute("position",new Ri([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Ri([0,2,0,0,2,0],2));const c=new dA({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Di(l,c),p=new tg(-1,1,1,-1,0,1);let u=null,m=null,g=!1,b,_=null,h=[],v=!1;this.setSize=function(S,x){r.setSize(S,x),o.setSize(S,x);for(let A=0;A<h.length;A++){const R=h[A];R.setSize&&R.setSize(S,x)}},this.setEffects=function(S){h=S,v=h.length>0&&h[0].isRenderPass===!0;const x=r.width,A=r.height;for(let R=0;R<h.length;R++){const T=h[R];T.setSize&&T.setSize(x,A)}},this.begin=function(S,x){if(g||S.toneMapping===ta&&h.length===0)return!1;if(_=x,x!==null){const A=x.width,R=x.height;(r.width!==A||r.height!==R)&&this.setSize(A,R)}return v===!1&&S.setRenderTarget(r),b=S.toneMapping,S.toneMapping=ta,!0},this.hasRenderPass=function(){return v},this.end=function(S,x){S.toneMapping=b,g=!0;let A=r,R=o;for(let T=0;T<h.length;T++){const M=h[T];if(M.enabled!==!1&&(M.render(S,R,A,x),M.needsSwap!==!1)){const C=A;A=R,R=C}}if(u!==S.outputColorSpace||m!==S.toneMapping){u=S.outputColorSpace,m=S.toneMapping,c.defines={},ht.getTransfer(u)===Nt&&(c.defines.SRGB_TRANSFER="");const T=vC[m];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,S.setRenderTarget(_),S.render(d,p),_=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Fy=new In,Pp=new vo(1,1),Hy=new My,Gy=new GT,ky=new Uy,Rv=[],Nv=[],Dv=new Float32Array(16),Uv=new Float32Array(9),Lv=new Float32Array(4);function No(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=Rv[a];if(s===void 0&&(s=new Float32Array(a),Rv[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function fn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function dn(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Af(t,e){let n=Nv[e];n===void 0&&(n=new Int32Array(e),Nv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function xC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function SC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(fn(n,e))return;t.uniform2fv(this.addr,e),dn(n,e)}}function yC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(fn(n,e))return;t.uniform3fv(this.addr,e),dn(n,e)}}function MC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(fn(n,e))return;t.uniform4fv(this.addr,e),dn(n,e)}}function bC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(fn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),dn(n,e)}else{if(fn(n,i))return;Lv.set(i),t.uniformMatrix2fv(this.addr,!1,Lv),dn(n,i)}}function EC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(fn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),dn(n,e)}else{if(fn(n,i))return;Uv.set(i),t.uniformMatrix3fv(this.addr,!1,Uv),dn(n,i)}}function TC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(fn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),dn(n,e)}else{if(fn(n,i))return;Dv.set(i),t.uniformMatrix4fv(this.addr,!1,Dv),dn(n,i)}}function AC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function wC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(fn(n,e))return;t.uniform2iv(this.addr,e),dn(n,e)}}function CC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(fn(n,e))return;t.uniform3iv(this.addr,e),dn(n,e)}}function RC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(fn(n,e))return;t.uniform4iv(this.addr,e),dn(n,e)}}function NC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function DC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(fn(n,e))return;t.uniform2uiv(this.addr,e),dn(n,e)}}function UC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(fn(n,e))return;t.uniform3uiv(this.addr,e),dn(n,e)}}function LC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(fn(n,e))return;t.uniform4uiv(this.addr,e),dn(n,e)}}function OC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Pp.compareFunction=n.isReversedDepthBuffer()?Qm:Km,s=Pp):s=Fy,n.setTexture2D(e||s,a)}function PC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||Gy,a)}function zC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||ky,a)}function IC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||Hy,a)}function BC(t){switch(t){case 5126:return xC;case 35664:return SC;case 35665:return yC;case 35666:return MC;case 35674:return bC;case 35675:return EC;case 35676:return TC;case 5124:case 35670:return AC;case 35667:case 35671:return wC;case 35668:case 35672:return CC;case 35669:case 35673:return RC;case 5125:return NC;case 36294:return DC;case 36295:return UC;case 36296:return LC;case 35678:case 36198:case 36298:case 36306:case 35682:return OC;case 35679:case 36299:case 36307:return PC;case 35680:case 36300:case 36308:case 36293:return zC;case 36289:case 36303:case 36311:case 36292:return IC}}function FC(t,e){t.uniform1fv(this.addr,e)}function HC(t,e){const n=No(e,this.size,2);t.uniform2fv(this.addr,n)}function GC(t,e){const n=No(e,this.size,3);t.uniform3fv(this.addr,n)}function kC(t,e){const n=No(e,this.size,4);t.uniform4fv(this.addr,n)}function VC(t,e){const n=No(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function jC(t,e){const n=No(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function XC(t,e){const n=No(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function WC(t,e){t.uniform1iv(this.addr,e)}function qC(t,e){t.uniform2iv(this.addr,e)}function YC(t,e){t.uniform3iv(this.addr,e)}function ZC(t,e){t.uniform4iv(this.addr,e)}function KC(t,e){t.uniform1uiv(this.addr,e)}function QC(t,e){t.uniform2uiv(this.addr,e)}function $C(t,e){t.uniform3uiv(this.addr,e)}function JC(t,e){t.uniform4uiv(this.addr,e)}function eR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);fn(i,s)||(t.uniform1iv(this.addr,s),dn(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Pp:r=Fy;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function tR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);fn(i,s)||(t.uniform1iv(this.addr,s),dn(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||Gy,s[r])}function nR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);fn(i,s)||(t.uniform1iv(this.addr,s),dn(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||ky,s[r])}function iR(t,e,n){const i=this.cache,a=e.length,s=Af(n,a);fn(i,s)||(t.uniform1iv(this.addr,s),dn(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||Hy,s[r])}function aR(t){switch(t){case 5126:return FC;case 35664:return HC;case 35665:return GC;case 35666:return kC;case 35674:return VC;case 35675:return jC;case 35676:return XC;case 5124:case 35670:return WC;case 35667:case 35671:return qC;case 35668:case 35672:return YC;case 35669:case 35673:return ZC;case 5125:return KC;case 36294:return QC;case 36295:return $C;case 36296:return JC;case 35678:case 36198:case 36298:case 36306:case 35682:return eR;case 35679:case 36299:case 36307:return tR;case 35680:case 36300:case 36308:case 36293:return nR;case 36289:case 36303:case 36311:case 36292:return iR}}class sR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=BC(n.type)}}class rR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=aR(n.type)}}class oR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const Vd=/(\w+)(\])?(\[|\.)?/g;function Ov(t,e){t.seq.push(e),t.map[e.id]=e}function lR(t,e,n){const i=t.name,a=i.length;for(Vd.lastIndex=0;;){const s=Vd.exec(i),r=Vd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Ov(n,c===void 0?new sR(o,t,e):new rR(o,t,e));break}else{let p=n.map[o];p===void 0&&(p=new oR(o),Ov(n,p)),n=p}}}class gu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);lR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Pv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const cR=37297;let uR=0;function fR(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const zv=new Ye;function dR(t){ht._getMatrix(zv,ht.workingColorSpace,t);const e=`mat3( ${zv.elements.map(n=>n.toFixed(4))} )`;switch(ht.getTransfer(t)){case Qu:return[e,"LinearTransferOETF"];case Nt:return[e,"sRGBTransferOETF"];default:return Ge("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Iv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+fR(t.getShaderSource(e),o)}else return s}function hR(t,e){const n=dR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const pR={[oy]:"Linear",[ly]:"Reinhard",[cy]:"Cineon",[uy]:"ACESFilmic",[dy]:"AgX",[hy]:"Neutral",[fy]:"Custom"};function mR(t,e){const n=pR[e];return n===void 0?(Ge("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wc=new Y;function gR(){ht.getLuminanceCoefficients(Wc);const t=Wc.x.toFixed(4),e=Wc.y.toFixed(4),n=Wc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(il).join(`
`)}function _R(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function xR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function il(t){return t!==""}function Bv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const SR=/^[ \t]*#include +<([\w\d./]+)>/gm;function zp(t){return t.replace(SR,MR)}const yR=new Map;function MR(t,e){let n=st[e];if(n===void 0){const i=yR.get(e);if(i!==void 0)n=st[i],Ge('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return zp(n)}const bR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hv(t){return t.replace(bR,ER)}function ER(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Gv(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const TR={[cu]:"SHADOWMAP_TYPE_PCF",[nl]:"SHADOWMAP_TYPE_VSM"};function AR(t){return TR[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const wR={[$s]:"ENVMAP_TYPE_CUBE",[go]:"ENVMAP_TYPE_CUBE",[bf]:"ENVMAP_TYPE_CUBE_UV"};function CR(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":wR[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const RR={[go]:"ENVMAP_MODE_REFRACTION"};function NR(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":RR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const DR={[ry]:"ENVMAP_BLENDING_MULTIPLY",[ST]:"ENVMAP_BLENDING_MIX",[yT]:"ENVMAP_BLENDING_ADD"};function UR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":DR[t.combine]||"ENVMAP_BLENDING_NONE"}function LR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function OR(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=AR(n),c=CR(n),d=NR(n),p=UR(n),u=LR(n),m=vR(n),g=_R(s),b=a.createProgram();let _,h,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(il).join(`
`),_.length>0&&(_+=`
`),h=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(il).join(`
`),h.length>0&&(h+=`
`)):(_=[Gv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(il).join(`
`),h=[Gv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+p:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ta?"#define TONE_MAPPING":"",n.toneMapping!==ta?st.tonemapping_pars_fragment:"",n.toneMapping!==ta?mR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",st.colorspace_pars_fragment,hR("linearToOutputTexel",n.outputColorSpace),gR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(il).join(`
`)),r=zp(r),r=Bv(r,n),r=Fv(r,n),o=zp(o),o=Bv(o,n),o=Fv(o,n),r=Hv(r),o=Hv(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,_=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,h=["#define varying in",n.glslVersion===W0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===W0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);const S=v+_+r,x=v+h+o,A=Pv(a,a.VERTEX_SHADER,S),R=Pv(a,a.FRAGMENT_SHADER,x);a.attachShader(b,A),a.attachShader(b,R),n.index0AttributeName!==void 0?a.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function T(U){if(t.debug.checkShaderErrors){const O=a.getProgramInfoLog(b)||"",k=a.getShaderInfoLog(A)||"",P=a.getShaderInfoLog(R)||"",z=O.trim(),B=k.trim(),I=P.trim();let L=!0,V=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(L=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,b,A,R);else{const re=Iv(a,A,"vertex"),ce=Iv(a,R,"fragment");vt("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+U.name+`
Material Type: `+U.type+`

Program Info Log: `+z+`
`+re+`
`+ce)}else z!==""?Ge("WebGLProgram: Program Info Log:",z):(B===""||I==="")&&(V=!1);V&&(U.diagnostics={runnable:L,programLog:z,vertexShader:{log:B,prefix:_},fragmentShader:{log:I,prefix:h}})}a.deleteShader(A),a.deleteShader(R),M=new gu(a,b),C=xR(a,b)}let M;this.getUniforms=function(){return M===void 0&&T(this),M};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=a.getProgramParameter(b,cR)),w},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=uR++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=A,this.fragmentShader=R,this}let PR=0;class zR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new IR(e),n.set(e,i)),i}}class IR{constructor(e){this.id=PR++,this.code=e,this.usedTimes=0}}function BR(t){return t===Js||t===Yu||t===Zu}function FR(t,e,n,i,a,s){const r=new by,o=new zR,l=new Set,c=[],d=new Map,p=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function b(M,C,w,U,O,k){const P=U.fog,z=O.geometry,B=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,I=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,L=e.get(M.envMap||B,I),V=L&&L.mapping===bf?L.image.height:null,re=m[M.type];M.precision!==null&&(u=i.getMaxPrecision(M.precision),u!==M.precision&&Ge("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const ce=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,_e=ce!==void 0?ce.length:0;let ke=0;z.morphAttributes.position!==void 0&&(ke=1),z.morphAttributes.normal!==void 0&&(ke=2),z.morphAttributes.color!==void 0&&(ke=3);let Je,He,se,ge;if(re){const Me=Yi[re];Je=Me.vertexShader,He=Me.fragmentShader}else{Je=M.vertexShader,He=M.fragmentShader;const Me=o.getVertexShaderStage(M),Ke=o.getFragmentShaderStage(M);o.update(M,Me,Ke),se=Me.id,ge=Ke.id}const he=t.getRenderTarget(),Te=t.state.buffers.depth.getReversed(),Ie=O.isInstancedMesh===!0,W=O.isBatchedMesh===!0,De=!!M.map,Be=!!M.matcap,je=!!L,qe=!!M.aoMap,Ze=!!M.lightMap,xt=!!M.bumpMap&&M.wireframe===!1,dt=!!M.normalMap,ut=!!M.displacementMap,It=!!M.emissiveMap,wt=!!M.metalnessMap,Se=!!M.roughnessMap,H=M.anisotropy>0,et=M.clearcoat>0,Xe=M.dispersion>0,N=M.iridescence>0,y=M.sheen>0,X=M.transmission>0,Z=H&&!!M.anisotropyMap,te=et&&!!M.clearcoatMap,de=et&&!!M.clearcoatNormalMap,ve=et&&!!M.clearcoatRoughnessMap,ne=N&&!!M.iridescenceMap,q=N&&!!M.iridescenceThicknessMap,ie=y&&!!M.sheenColorMap,fe=y&&!!M.sheenRoughnessMap,oe=!!M.specularMap,pe=!!M.specularColorMap,Re=!!M.specularIntensityMap,Ue=X&&!!M.transmissionMap,Fe=X&&!!M.thicknessMap,G=!!M.gradientMap,me=!!M.alphaMap,D=M.alphaTest>0,F=!!M.alphaHash,le=!!M.extensions;let Q=ta;M.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Q=t.toneMapping);const xe={shaderID:re,shaderType:M.type,shaderName:M.name,vertexShader:Je,fragmentShader:He,defines:M.defines,customVertexShaderID:se,customFragmentShaderID:ge,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:W,batchingColor:W&&O._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&O.instanceColor!==null,instancingMorph:Ie&&O.morphTexture!==null,outputColorSpace:he===null?t.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:ht.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:De,matcap:Be,envMap:je,envMapMode:je&&L.mapping,envMapCubeUVHeight:V,aoMap:qe,lightMap:Ze,bumpMap:xt,normalMap:dt,displacementMap:ut,emissiveMap:It,normalMapObjectSpace:dt&&M.normalMapType===ET,normalMapTangentSpace:dt&&M.normalMapType===V0,packedNormalMap:dt&&M.normalMapType===V0&&BR(M.normalMap.format),metalnessMap:wt,roughnessMap:Se,anisotropy:H,anisotropyMap:Z,clearcoat:et,clearcoatMap:te,clearcoatNormalMap:de,clearcoatRoughnessMap:ve,dispersion:Xe,iridescence:N,iridescenceMap:ne,iridescenceThicknessMap:q,sheen:y,sheenColorMap:ie,sheenRoughnessMap:fe,specularMap:oe,specularColorMap:pe,specularIntensityMap:Re,transmission:X,transmissionMap:Ue,thicknessMap:Fe,gradientMap:G,opaque:M.transparent===!1&&M.blending===Ws&&M.alphaToCoverage===!1,alphaMap:me,alphaTest:D,alphaHash:F,combine:M.combine,mapUv:De&&g(M.map.channel),aoMapUv:qe&&g(M.aoMap.channel),lightMapUv:Ze&&g(M.lightMap.channel),bumpMapUv:xt&&g(M.bumpMap.channel),normalMapUv:dt&&g(M.normalMap.channel),displacementMapUv:ut&&g(M.displacementMap.channel),emissiveMapUv:It&&g(M.emissiveMap.channel),metalnessMapUv:wt&&g(M.metalnessMap.channel),roughnessMapUv:Se&&g(M.roughnessMap.channel),anisotropyMapUv:Z&&g(M.anisotropyMap.channel),clearcoatMapUv:te&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:ne&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:q&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:fe&&g(M.sheenRoughnessMap.channel),specularMapUv:oe&&g(M.specularMap.channel),specularColorMapUv:pe&&g(M.specularColorMap.channel),specularIntensityMapUv:Re&&g(M.specularIntensityMap.channel),transmissionMapUv:Ue&&g(M.transmissionMap.channel),thicknessMapUv:Fe&&g(M.thicknessMap.channel),alphaMapUv:me&&g(M.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(dt||H),vertexNormals:!!z.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!z.attributes.uv&&(De||me),fog:!!P,useFog:M.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||z.attributes.normal===void 0&&dt===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:p,reversedDepthBuffer:Te,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:ke,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:k.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:t.shadowMap.enabled&&w.length>0,shadowMapType:t.shadowMap.type,toneMapping:Q,decodeVideoTexture:De&&M.map.isVideoTexture===!0&&ht.getTransfer(M.map.colorSpace)===Nt,decodeVideoTextureEmissive:It&&M.emissiveMap.isVideoTexture===!0&&ht.getTransfer(M.emissiveMap.colorSpace)===Nt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===ba,flipSided:M.side===Yn,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:le&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(le&&M.extensions.multiDraw===!0||W)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return xe.vertexUv1s=l.has(1),xe.vertexUv2s=l.has(2),xe.vertexUv3s=l.has(3),l.clear(),xe}function _(M){const C=[];if(M.shaderID?C.push(M.shaderID):(C.push(M.customVertexShaderID),C.push(M.customFragmentShaderID)),M.defines!==void 0)for(const w in M.defines)C.push(w),C.push(M.defines[w]);return M.isRawShaderMaterial===!1&&(h(C,M),v(C,M),C.push(t.outputColorSpace)),C.push(M.customProgramCacheKey),C.join()}function h(M,C){M.push(C.precision),M.push(C.outputColorSpace),M.push(C.envMapMode),M.push(C.envMapCubeUVHeight),M.push(C.mapUv),M.push(C.alphaMapUv),M.push(C.lightMapUv),M.push(C.aoMapUv),M.push(C.bumpMapUv),M.push(C.normalMapUv),M.push(C.displacementMapUv),M.push(C.emissiveMapUv),M.push(C.metalnessMapUv),M.push(C.roughnessMapUv),M.push(C.anisotropyMapUv),M.push(C.clearcoatMapUv),M.push(C.clearcoatNormalMapUv),M.push(C.clearcoatRoughnessMapUv),M.push(C.iridescenceMapUv),M.push(C.iridescenceThicknessMapUv),M.push(C.sheenColorMapUv),M.push(C.sheenRoughnessMapUv),M.push(C.specularMapUv),M.push(C.specularColorMapUv),M.push(C.specularIntensityMapUv),M.push(C.transmissionMapUv),M.push(C.thicknessMapUv),M.push(C.combine),M.push(C.fogExp2),M.push(C.sizeAttenuation),M.push(C.morphTargetsCount),M.push(C.morphAttributeCount),M.push(C.numDirLights),M.push(C.numPointLights),M.push(C.numSpotLights),M.push(C.numSpotLightMaps),M.push(C.numHemiLights),M.push(C.numRectAreaLights),M.push(C.numDirLightShadows),M.push(C.numPointLightShadows),M.push(C.numSpotLightShadows),M.push(C.numSpotLightShadowsWithMaps),M.push(C.numLightProbes),M.push(C.shadowMapType),M.push(C.toneMapping),M.push(C.numClippingPlanes),M.push(C.numClipIntersection),M.push(C.depthPacking)}function v(M,C){r.disableAll(),C.instancing&&r.enable(0),C.instancingColor&&r.enable(1),C.instancingMorph&&r.enable(2),C.matcap&&r.enable(3),C.envMap&&r.enable(4),C.normalMapObjectSpace&&r.enable(5),C.normalMapTangentSpace&&r.enable(6),C.clearcoat&&r.enable(7),C.iridescence&&r.enable(8),C.alphaTest&&r.enable(9),C.vertexColors&&r.enable(10),C.vertexAlphas&&r.enable(11),C.vertexUv1s&&r.enable(12),C.vertexUv2s&&r.enable(13),C.vertexUv3s&&r.enable(14),C.vertexTangents&&r.enable(15),C.anisotropy&&r.enable(16),C.alphaHash&&r.enable(17),C.batching&&r.enable(18),C.dispersion&&r.enable(19),C.batchingColor&&r.enable(20),C.gradientMap&&r.enable(21),C.packedNormalMap&&r.enable(22),C.vertexNormals&&r.enable(23),M.push(r.mask),r.disableAll(),C.fog&&r.enable(0),C.useFog&&r.enable(1),C.flatShading&&r.enable(2),C.logarithmicDepthBuffer&&r.enable(3),C.reversedDepthBuffer&&r.enable(4),C.skinning&&r.enable(5),C.morphTargets&&r.enable(6),C.morphNormals&&r.enable(7),C.morphColors&&r.enable(8),C.premultipliedAlpha&&r.enable(9),C.shadowMapEnabled&&r.enable(10),C.doubleSided&&r.enable(11),C.flipSided&&r.enable(12),C.useDepthPacking&&r.enable(13),C.dithering&&r.enable(14),C.transmission&&r.enable(15),C.sheen&&r.enable(16),C.opaque&&r.enable(17),C.pointsUvs&&r.enable(18),C.decodeVideoTexture&&r.enable(19),C.decodeVideoTextureEmissive&&r.enable(20),C.alphaToCoverage&&r.enable(21),C.numLightProbeGrids>0&&r.enable(22),C.hasPositionAttribute&&r.enable(23),M.push(r.mask)}function S(M){const C=m[M.type];let w;if(C){const U=Yi[C];w=cA.clone(U.uniforms)}else w=M.uniforms;return w}function x(M,C){let w=d.get(C);return w!==void 0?++w.usedTimes:(w=new OR(t,C,M,a),c.push(w),d.set(C,w)),w}function A(M){if(--M.usedTimes===0){const C=c.indexOf(M);c[C]=c[c.length-1],c.pop(),d.delete(M.cacheKey),M.destroy()}}function R(M){o.remove(M)}function T(){o.dispose()}return{getParameters:b,getProgramCacheKey:_,getUniforms:S,acquireProgram:x,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:T}}function HR(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function GR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function kv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Vv(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,g,b,_,h){let v=t[e];return v===void 0?(v={id:u.id,object:u,geometry:m,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:_,group:h},t[e]=v):(v.id=u.id,v.object=u,v.geometry=m,v.material=g,v.materialVariant=r(u),v.groupOrder=b,v.renderOrder=u.renderOrder,v.z=_,v.group=h),e++,v}function l(u,m,g,b,_,h){const v=o(u,m,g,b,_,h);g.transmission>0?i.push(v):g.transparent===!0?a.push(v):n.push(v)}function c(u,m,g,b,_,h){const v=o(u,m,g,b,_,h);g.transmission>0?i.unshift(v):g.transparent===!0?a.unshift(v):n.unshift(v)}function d(u,m,g){n.length>1&&n.sort(u||GR),i.length>1&&i.sort(m||kv),a.length>1&&a.sort(m||kv),g&&(n.reverse(),i.reverse(),a.reverse())}function p(){for(let u=e,m=t.length;u<m;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:p,sort:d}}function kR(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new Vv,t.set(i,[r])):a>=s.length?(r=new Vv,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function VR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new Y,color:new ct};break;case"SpotLight":n={position:new Y,direction:new Y,color:new ct,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Y,color:new ct,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Y,skyColor:new ct,groundColor:new ct};break;case"RectAreaLight":n={color:new ct,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return t[e.id]=n,n}}}function jR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Mt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let XR=0;function WR(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function qR(t){const e=new VR,n=jR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Y);const a=new Y,s=new Ht,r=new Ht;function o(c){let d=0,p=0,u=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let m=0,g=0,b=0,_=0,h=0,v=0,S=0,x=0,A=0,R=0,T=0;c.sort(WR);for(let C=0,w=c.length;C<w;C++){const U=c[C],O=U.color,k=U.intensity,P=U.distance;let z=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Js?z=U.shadow.map.texture:z=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)d+=O.r*k,p+=O.g*k,u+=O.b*k;else if(U.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(U.sh.coefficients[B],k);T++}else if(U.isDirectionalLight){const B=e.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const I=U.shadow,L=n.get(U);L.shadowIntensity=I.intensity,L.shadowBias=I.bias,L.shadowNormalBias=I.normalBias,L.shadowRadius=I.radius,L.shadowMapSize=I.mapSize,i.directionalShadow[m]=L,i.directionalShadowMap[m]=z,i.directionalShadowMatrix[m]=U.shadow.matrix,v++}i.directional[m]=B,m++}else if(U.isSpotLight){const B=e.get(U);B.position.setFromMatrixPosition(U.matrixWorld),B.color.copy(O).multiplyScalar(k),B.distance=P,B.coneCos=Math.cos(U.angle),B.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),B.decay=U.decay,i.spot[b]=B;const I=U.shadow;if(U.map&&(i.spotLightMap[A]=U.map,A++,I.updateMatrices(U),U.castShadow&&R++),i.spotLightMatrix[b]=I.matrix,U.castShadow){const L=n.get(U);L.shadowIntensity=I.intensity,L.shadowBias=I.bias,L.shadowNormalBias=I.normalBias,L.shadowRadius=I.radius,L.shadowMapSize=I.mapSize,i.spotShadow[b]=L,i.spotShadowMap[b]=z,x++}b++}else if(U.isRectAreaLight){const B=e.get(U);B.color.copy(O).multiplyScalar(k),B.halfWidth.set(U.width*.5,0,0),B.halfHeight.set(0,U.height*.5,0),i.rectArea[_]=B,_++}else if(U.isPointLight){const B=e.get(U);if(B.color.copy(U.color).multiplyScalar(U.intensity),B.distance=U.distance,B.decay=U.decay,U.castShadow){const I=U.shadow,L=n.get(U);L.shadowIntensity=I.intensity,L.shadowBias=I.bias,L.shadowNormalBias=I.normalBias,L.shadowRadius=I.radius,L.shadowMapSize=I.mapSize,L.shadowCameraNear=I.camera.near,L.shadowCameraFar=I.camera.far,i.pointShadow[g]=L,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=U.shadow.matrix,S++}i.point[g]=B,g++}else if(U.isHemisphereLight){const B=e.get(U);B.skyColor.copy(U.color).multiplyScalar(k),B.groundColor.copy(U.groundColor).multiplyScalar(k),i.hemi[h]=B,h++}}_>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ee.LTC_FLOAT_1,i.rectAreaLTC2=Ee.LTC_FLOAT_2):(i.rectAreaLTC1=Ee.LTC_HALF_1,i.rectAreaLTC2=Ee.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=p,i.ambient[2]=u;const M=i.hash;(M.directionalLength!==m||M.pointLength!==g||M.spotLength!==b||M.rectAreaLength!==_||M.hemiLength!==h||M.numDirectionalShadows!==v||M.numPointShadows!==S||M.numSpotShadows!==x||M.numSpotMaps!==A||M.numLightProbes!==T)&&(i.directional.length=m,i.spot.length=b,i.rectArea.length=_,i.point.length=g,i.hemi.length=h,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=x+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=T,M.directionalLength=m,M.pointLength=g,M.spotLength=b,M.rectAreaLength=_,M.hemiLength=h,M.numDirectionalShadows=v,M.numPointShadows=S,M.numSpotShadows=x,M.numSpotMaps=A,M.numLightProbes=T,i.version=XR++)}function l(c,d){let p=0,u=0,m=0,g=0,b=0;const _=d.matrixWorldInverse;for(let h=0,v=c.length;h<v;h++){const S=c[h];if(S.isDirectionalLight){const x=i.directional[p];x.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(_),p++}else if(S.isSpotLight){const x=i.spot[m];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(_),x.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(_),m++}else if(S.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(_),r.identity(),s.copy(S.matrixWorld),s.premultiply(_),r.extractRotation(s),x.halfWidth.set(S.width*.5,0,0),x.halfHeight.set(0,S.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),g++}else if(S.isPointLight){const x=i.point[u];x.position.setFromMatrixPosition(S.matrixWorld),x.position.applyMatrix4(_),u++}else if(S.isHemisphereLight){const x=i.hemi[b];x.direction.setFromMatrixPosition(S.matrixWorld),x.direction.transformDirection(_),b++}}}return{setup:o,setupView:l,state:i}}function jv(t){const e=new qR(t),n=[],i=[],a=[];function s(u){p.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){e.setup(n)}function d(u){e.setupView(n,u)}const p={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:p,setupLights:c,setupLightsView:d,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function YR(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new jv(t),e.set(a,[o])):s>=r.length?(o=new jv(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const ZR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,KR=`uniform sampler2D shadow_pass;
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
}`,QR=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],$R=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],Xv=new Ht,Ko=new Y,jd=new Y;function JR(t,e,n){let i=new Ny;const a=new Mt,s=new Mt,r=new Qt,o=new hA,l=new pA,c={},d=n.maxTextureSize,p={[Ms]:Yn,[Yn]:Ms,[ba]:ba},u=new Tn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Mt},radius:{value:4}},vertexShader:ZR,fragmentShader:KR}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new Nn;g.setAttribute("position",new At(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Di(g,u),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cu;let h=this.type;this.render=function(R,T,M){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||R.length===0)return;this.type===tT&&(Ge("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=cu);const C=t.getRenderTarget(),w=t.getActiveCubeFace(),U=t.getActiveMipmapLevel(),O=t.state;O.setBlending(Da),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const k=h!==this.type;k&&T.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(z=>z.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,z=R.length;P<z;P++){const B=R[P],I=B.shadow;if(I===void 0){Ge("WebGLShadowMap:",B,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;a.copy(I.mapSize);const L=I.getFrameExtents();a.multiply(L),s.copy(I.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/L.x),a.x=s.x*L.x,I.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/L.y),a.y=s.y*L.y,I.mapSize.y=s.y));const V=t.state.buffers.depth.getReversed();if(I.camera._reversedDepth=V,I.map===null||k===!0){if(I.map!==null&&(I.map.depthTexture!==null&&(I.map.depthTexture.dispose(),I.map.depthTexture=null),I.map.dispose()),this.type===nl){if(B.isPointLight){Ge("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}I.map=new na(a.x,a.y,{format:Js,type:Ba,minFilter:Rn,magFilter:Rn,generateMipmaps:!1}),I.map.texture.name=B.name+".shadowMap",I.map.depthTexture=new vo(a.x,a.y,Bi),I.map.depthTexture.name=B.name+".shadowMapDepth",I.map.depthTexture.format=Fa,I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=En,I.map.depthTexture.magFilter=En}else B.isPointLight?(I.map=new By(a.x),I.map.depthTexture=new rA(a.x,ia)):(I.map=new na(a.x,a.y),I.map.depthTexture=new vo(a.x,a.y,ia)),I.map.depthTexture.name=B.name+".shadowMap",I.map.depthTexture.format=Fa,this.type===cu?(I.map.depthTexture.compareFunction=V?Qm:Km,I.map.depthTexture.minFilter=Rn,I.map.depthTexture.magFilter=Rn):(I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=En,I.map.depthTexture.magFilter=En);I.camera.updateProjectionMatrix()}const re=I.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<re;ce++){if(I.map.isWebGLCubeRenderTarget)t.setRenderTarget(I.map,ce),t.clear();else{ce===0&&(t.setRenderTarget(I.map),t.clear());const _e=I.getViewport(ce);r.set(s.x*_e.x,s.y*_e.y,s.x*_e.z,s.y*_e.w),O.viewport(r)}if(B.isPointLight){const _e=I.camera,ke=I.matrix,Je=B.distance||_e.far;Je!==_e.far&&(_e.far=Je,_e.updateProjectionMatrix()),Ko.setFromMatrixPosition(B.matrixWorld),_e.position.copy(Ko),jd.copy(_e.position),jd.add(QR[ce]),_e.up.copy($R[ce]),_e.lookAt(jd),_e.updateMatrixWorld(),ke.makeTranslation(-Ko.x,-Ko.y,-Ko.z),Xv.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),I._frustum.setFromProjectionMatrix(Xv,_e.coordinateSystem,_e.reversedDepth)}else I.updateMatrices(B);i=I.getFrustum(),x(T,M,I.camera,B,this.type)}I.isPointLightShadow!==!0&&this.type===nl&&v(I,M),I.needsUpdate=!1}h=this.type,_.needsUpdate=!1,t.setRenderTarget(C,w,U)};function v(R,T){const M=e.update(b);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new na(a.x,a.y,{format:Js,type:Ba})),u.uniforms.shadow_pass.value=R.map.depthTexture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(T,null,M,u,b,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(T,null,M,m,b,null)}function S(R,T,M,C){let w=null;const U=M.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(U!==void 0)w=U;else if(w=M.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const O=w.uuid,k=T.uuid;let P=c[O];P===void 0&&(P={},c[O]=P);let z=P[k];z===void 0&&(z=w.clone(),P[k]=z,T.addEventListener("dispose",A)),w=z}if(w.visible=T.visible,w.wireframe=T.wireframe,C===nl?w.side=T.shadowSide!==null?T.shadowSide:T.side:w.side=T.shadowSide!==null?T.shadowSide:p[T.side],w.alphaMap=T.alphaMap,w.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,w.map=T.map,w.clipShadows=T.clipShadows,w.clippingPlanes=T.clippingPlanes,w.clipIntersection=T.clipIntersection,w.displacementMap=T.displacementMap,w.displacementScale=T.displacementScale,w.displacementBias=T.displacementBias,w.wireframeLinewidth=T.wireframeLinewidth,w.linewidth=T.linewidth,M.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const O=t.properties.get(w);O.light=M}return w}function x(R,T,M,C,w){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&w===nl)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,R.matrixWorld);const k=e.update(R),P=R.material;if(Array.isArray(P)){const z=k.groups;for(let B=0,I=z.length;B<I;B++){const L=z[B],V=P[L.materialIndex];if(V&&V.visible){const re=S(R,V,C,w);R.onBeforeShadow(t,R,T,M,k,re,L),t.renderBufferDirect(M,null,k,re,R,L),R.onAfterShadow(t,R,T,M,k,re,L)}}}else if(P.visible){const z=S(R,P,C,w);R.onBeforeShadow(t,R,T,M,k,z,null),t.renderBufferDirect(M,null,k,z,R,null),R.onAfterShadow(t,R,T,M,k,z,null)}}const O=R.children;for(let k=0,P=O.length;k<P;k++)x(O[k],T,M,C,w)}function A(R){R.target.removeEventListener("dispose",A);for(const M in c){const C=c[M],w=R.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}function e3(t,e){function n(){let G=!1;const me=new Qt;let D=null;const F=new Qt(0,0,0,0);return{setMask:function(le){D!==le&&!G&&(t.colorMask(le,le,le,le),D=le)},setLocked:function(le){G=le},setClear:function(le,Q,xe,Me,Ke){Ke===!0&&(le*=Me,Q*=Me,xe*=Me),me.set(le,Q,xe,Me),F.equals(me)===!1&&(t.clearColor(le,Q,xe,Me),F.copy(me))},reset:function(){G=!1,D=null,F.set(-1,0,0,0)}}}function i(){let G=!1,me=!1,D=null,F=null,le=null;return{setReversed:function(Q){if(me!==Q){const xe=e.get("EXT_clip_control");Q?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),me=Q;const Me=le;le=null,this.setClear(Me)}},getReversed:function(){return me},setTest:function(Q){Q?he(t.DEPTH_TEST):Te(t.DEPTH_TEST)},setMask:function(Q){D!==Q&&!G&&(t.depthMask(Q),D=Q)},setFunc:function(Q){if(me&&(Q=OT[Q]),F!==Q){switch(Q){case qh:t.depthFunc(t.NEVER);break;case Yh:t.depthFunc(t.ALWAYS);break;case Zh:t.depthFunc(t.LESS);break;case mo:t.depthFunc(t.LEQUAL);break;case Kh:t.depthFunc(t.EQUAL);break;case Qh:t.depthFunc(t.GEQUAL);break;case $h:t.depthFunc(t.GREATER);break;case Jh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}F=Q}},setLocked:function(Q){G=Q},setClear:function(Q){le!==Q&&(le=Q,me&&(Q=1-Q),t.clearDepth(Q))},reset:function(){G=!1,D=null,F=null,le=null,me=!1}}}function a(){let G=!1,me=null,D=null,F=null,le=null,Q=null,xe=null,Me=null,Ke=null;return{setTest:function(gt){G||(gt?he(t.STENCIL_TEST):Te(t.STENCIL_TEST))},setMask:function(gt){me!==gt&&!G&&(t.stencilMask(gt),me=gt)},setFunc:function(gt,bt,Bt){(D!==gt||F!==bt||le!==Bt)&&(t.stencilFunc(gt,bt,Bt),D=gt,F=bt,le=Bt)},setOp:function(gt,bt,Bt){(Q!==gt||xe!==bt||Me!==Bt)&&(t.stencilOp(gt,bt,Bt),Q=gt,xe=bt,Me=Bt)},setLocked:function(gt){G=gt},setClear:function(gt){Ke!==gt&&(t.clearStencil(gt),Ke=gt)},reset:function(){G=!1,me=null,D=null,F=null,le=null,Q=null,xe=null,Me=null,Ke=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},p={},u={},m=new WeakMap,g=[],b=null,_=!1,h=null,v=null,S=null,x=null,A=null,R=null,T=null,M=new ct(0,0,0),C=0,w=!1,U=null,O=null,k=null,P=null,z=null;const B=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,L=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(L=parseFloat(/^WebGL (\d)/.exec(V)[1]),I=L>=1):V.indexOf("OpenGL ES")!==-1&&(L=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),I=L>=2);let re=null,ce={};const _e=t.getParameter(t.SCISSOR_BOX),ke=t.getParameter(t.VIEWPORT),Je=new Qt().fromArray(_e),He=new Qt().fromArray(ke);function se(G,me,D,F){const le=new Uint8Array(4),Q=t.createTexture();t.bindTexture(G,Q),t.texParameteri(G,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(G,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let xe=0;xe<D;xe++)G===t.TEXTURE_3D||G===t.TEXTURE_2D_ARRAY?t.texImage3D(me,0,t.RGBA,1,1,F,0,t.RGBA,t.UNSIGNED_BYTE,le):t.texImage2D(me+xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,le);return Q}const ge={};ge[t.TEXTURE_2D]=se(t.TEXTURE_2D,t.TEXTURE_2D,1),ge[t.TEXTURE_CUBE_MAP]=se(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ge[t.TEXTURE_2D_ARRAY]=se(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ge[t.TEXTURE_3D]=se(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),he(t.DEPTH_TEST),r.setFunc(mo),xt(!1),dt(H0),he(t.CULL_FACE),qe(Da);function he(G){d[G]!==!0&&(t.enable(G),d[G]=!0)}function Te(G){d[G]!==!1&&(t.disable(G),d[G]=!1)}function Ie(G,me){return u[G]!==me?(t.bindFramebuffer(G,me),u[G]=me,G===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=me),G===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=me),!0):!1}function W(G,me){let D=g,F=!1;if(G){D=m.get(me),D===void 0&&(D=[],m.set(me,D));const le=G.textures;if(D.length!==le.length||D[0]!==t.COLOR_ATTACHMENT0){for(let Q=0,xe=le.length;Q<xe;Q++)D[Q]=t.COLOR_ATTACHMENT0+Q;D.length=le.length,F=!0}}else D[0]!==t.BACK&&(D[0]=t.BACK,F=!0);F&&t.drawBuffers(D)}function De(G){return b!==G?(t.useProgram(G),b=G,!0):!1}const Be={[Is]:t.FUNC_ADD,[iT]:t.FUNC_SUBTRACT,[aT]:t.FUNC_REVERSE_SUBTRACT};Be[sT]=t.MIN,Be[rT]=t.MAX;const je={[oT]:t.ZERO,[lT]:t.ONE,[cT]:t.SRC_COLOR,[Xh]:t.SRC_ALPHA,[mT]:t.SRC_ALPHA_SATURATE,[hT]:t.DST_COLOR,[fT]:t.DST_ALPHA,[uT]:t.ONE_MINUS_SRC_COLOR,[Wh]:t.ONE_MINUS_SRC_ALPHA,[pT]:t.ONE_MINUS_DST_COLOR,[dT]:t.ONE_MINUS_DST_ALPHA,[gT]:t.CONSTANT_COLOR,[vT]:t.ONE_MINUS_CONSTANT_COLOR,[_T]:t.CONSTANT_ALPHA,[xT]:t.ONE_MINUS_CONSTANT_ALPHA};function qe(G,me,D,F,le,Q,xe,Me,Ke,gt){if(G===Da){_===!0&&(Te(t.BLEND),_=!1);return}if(_===!1&&(he(t.BLEND),_=!0),G!==nT){if(G!==h||gt!==w){if((v!==Is||A!==Is)&&(t.blendEquation(t.FUNC_ADD),v=Is,A=Is),gt)switch(G){case Ws:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xr:t.blendFunc(t.ONE,t.ONE);break;case G0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case k0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:vt("WebGLState: Invalid blending: ",G);break}else switch(G){case Ws:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case G0:vt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case k0:vt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:vt("WebGLState: Invalid blending: ",G);break}S=null,x=null,R=null,T=null,M.set(0,0,0),C=0,h=G,w=gt}return}le=le||me,Q=Q||D,xe=xe||F,(me!==v||le!==A)&&(t.blendEquationSeparate(Be[me],Be[le]),v=me,A=le),(D!==S||F!==x||Q!==R||xe!==T)&&(t.blendFuncSeparate(je[D],je[F],je[Q],je[xe]),S=D,x=F,R=Q,T=xe),(Me.equals(M)===!1||Ke!==C)&&(t.blendColor(Me.r,Me.g,Me.b,Ke),M.copy(Me),C=Ke),h=G,w=!1}function Ze(G,me){G.side===ba?Te(t.CULL_FACE):he(t.CULL_FACE);let D=G.side===Yn;me&&(D=!D),xt(D),G.blending===Ws&&G.transparent===!1?qe(Da):qe(G.blending,G.blendEquation,G.blendSrc,G.blendDst,G.blendEquationAlpha,G.blendSrcAlpha,G.blendDstAlpha,G.blendColor,G.blendAlpha,G.premultipliedAlpha),r.setFunc(G.depthFunc),r.setTest(G.depthTest),r.setMask(G.depthWrite),s.setMask(G.colorWrite);const F=G.stencilWrite;o.setTest(F),F&&(o.setMask(G.stencilWriteMask),o.setFunc(G.stencilFunc,G.stencilRef,G.stencilFuncMask),o.setOp(G.stencilFail,G.stencilZFail,G.stencilZPass)),It(G.polygonOffset,G.polygonOffsetFactor,G.polygonOffsetUnits),G.alphaToCoverage===!0?he(t.SAMPLE_ALPHA_TO_COVERAGE):Te(t.SAMPLE_ALPHA_TO_COVERAGE)}function xt(G){U!==G&&(G?t.frontFace(t.CW):t.frontFace(t.CCW),U=G)}function dt(G){G!==JE?(he(t.CULL_FACE),G!==O&&(G===H0?t.cullFace(t.BACK):G===eT?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Te(t.CULL_FACE),O=G}function ut(G){G!==k&&(I&&t.lineWidth(G),k=G)}function It(G,me,D){G?(he(t.POLYGON_OFFSET_FILL),(P!==me||z!==D)&&(P=me,z=D,r.getReversed()&&(me=-me),t.polygonOffset(me,D))):Te(t.POLYGON_OFFSET_FILL)}function wt(G){G?he(t.SCISSOR_TEST):Te(t.SCISSOR_TEST)}function Se(G){G===void 0&&(G=t.TEXTURE0+B-1),re!==G&&(t.activeTexture(G),re=G)}function H(G,me,D){D===void 0&&(re===null?D=t.TEXTURE0+B-1:D=re);let F=ce[D];F===void 0&&(F={type:void 0,texture:void 0},ce[D]=F),(F.type!==G||F.texture!==me)&&(re!==D&&(t.activeTexture(D),re=D),t.bindTexture(G,me||ge[G]),F.type=G,F.texture=me)}function et(){const G=ce[re];G!==void 0&&G.type!==void 0&&(t.bindTexture(G.type,null),G.type=void 0,G.texture=void 0)}function Xe(){try{t.compressedTexImage2D(...arguments)}catch(G){vt("WebGLState:",G)}}function N(){try{t.compressedTexImage3D(...arguments)}catch(G){vt("WebGLState:",G)}}function y(){try{t.texSubImage2D(...arguments)}catch(G){vt("WebGLState:",G)}}function X(){try{t.texSubImage3D(...arguments)}catch(G){vt("WebGLState:",G)}}function Z(){try{t.compressedTexSubImage2D(...arguments)}catch(G){vt("WebGLState:",G)}}function te(){try{t.compressedTexSubImage3D(...arguments)}catch(G){vt("WebGLState:",G)}}function de(){try{t.texStorage2D(...arguments)}catch(G){vt("WebGLState:",G)}}function ve(){try{t.texStorage3D(...arguments)}catch(G){vt("WebGLState:",G)}}function ne(){try{t.texImage2D(...arguments)}catch(G){vt("WebGLState:",G)}}function q(){try{t.texImage3D(...arguments)}catch(G){vt("WebGLState:",G)}}function ie(G){return p[G]!==void 0?p[G]:t.getParameter(G)}function fe(G,me){p[G]!==me&&(t.pixelStorei(G,me),p[G]=me)}function oe(G){Je.equals(G)===!1&&(t.scissor(G.x,G.y,G.z,G.w),Je.copy(G))}function pe(G){He.equals(G)===!1&&(t.viewport(G.x,G.y,G.z,G.w),He.copy(G))}function Re(G,me){let D=c.get(me);D===void 0&&(D=new WeakMap,c.set(me,D));let F=D.get(G);F===void 0&&(F=t.getUniformBlockIndex(me,G.name),D.set(G,F))}function Ue(G,me){const F=c.get(me).get(G);l.get(me)!==F&&(t.uniformBlockBinding(me,F,G.__bindingPointIndex),l.set(me,F))}function Fe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),d={},p={},re=null,ce={},u={},m=new WeakMap,g=[],b=null,_=!1,h=null,v=null,S=null,x=null,A=null,R=null,T=null,M=new ct(0,0,0),C=0,w=!1,U=null,O=null,k=null,P=null,z=null,Je.set(0,0,t.canvas.width,t.canvas.height),He.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:he,disable:Te,bindFramebuffer:Ie,drawBuffers:W,useProgram:De,setBlending:qe,setMaterial:Ze,setFlipSided:xt,setCullFace:dt,setLineWidth:ut,setPolygonOffset:It,setScissorTest:wt,activeTexture:Se,bindTexture:H,unbindTexture:et,compressedTexImage2D:Xe,compressedTexImage3D:N,texImage2D:ne,texImage3D:q,pixelStorei:fe,getParameter:ie,updateUBOMapping:Re,uniformBlockBinding:Ue,texStorage2D:de,texStorage3D:ve,texSubImage2D:y,texSubImage3D:X,compressedTexSubImage2D:Z,compressedTexSubImage3D:te,scissor:oe,viewport:pe,reset:Fe}}function t3(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Mt,d=new WeakMap,p=new Set;let u;const m=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(N,y){return g?new OffscreenCanvas(N,y):Ju("canvas")}function _(N,y,X){let Z=1;const te=Xe(N);if((te.width>X||te.height>X)&&(Z=X/Math.max(te.width,te.height)),Z<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const de=Math.floor(Z*te.width),ve=Math.floor(Z*te.height);u===void 0&&(u=b(de,ve));const ne=y?b(de,ve):u;return ne.width=de,ne.height=ve,ne.getContext("2d").drawImage(N,0,0,de,ve),Ge("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+de+"x"+ve+")."),ne}else return"data"in N&&Ge("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),N;return N}function h(N){return N.generateMipmaps}function v(N){t.generateMipmap(N)}function S(N){return N.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?t.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(N,y,X,Z,te,de=!1){if(N!==null){if(t[N]!==void 0)return t[N];Ge("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ve;Z&&(ve=e.get("EXT_texture_norm16"),ve||Ge("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ne=y;if(y===t.RED&&(X===t.FLOAT&&(ne=t.R32F),X===t.HALF_FLOAT&&(ne=t.R16F),X===t.UNSIGNED_BYTE&&(ne=t.R8),X===t.UNSIGNED_SHORT&&ve&&(ne=ve.R16_EXT),X===t.SHORT&&ve&&(ne=ve.R16_SNORM_EXT)),y===t.RED_INTEGER&&(X===t.UNSIGNED_BYTE&&(ne=t.R8UI),X===t.UNSIGNED_SHORT&&(ne=t.R16UI),X===t.UNSIGNED_INT&&(ne=t.R32UI),X===t.BYTE&&(ne=t.R8I),X===t.SHORT&&(ne=t.R16I),X===t.INT&&(ne=t.R32I)),y===t.RG&&(X===t.FLOAT&&(ne=t.RG32F),X===t.HALF_FLOAT&&(ne=t.RG16F),X===t.UNSIGNED_BYTE&&(ne=t.RG8),X===t.UNSIGNED_SHORT&&ve&&(ne=ve.RG16_EXT),X===t.SHORT&&ve&&(ne=ve.RG16_SNORM_EXT)),y===t.RG_INTEGER&&(X===t.UNSIGNED_BYTE&&(ne=t.RG8UI),X===t.UNSIGNED_SHORT&&(ne=t.RG16UI),X===t.UNSIGNED_INT&&(ne=t.RG32UI),X===t.BYTE&&(ne=t.RG8I),X===t.SHORT&&(ne=t.RG16I),X===t.INT&&(ne=t.RG32I)),y===t.RGB_INTEGER&&(X===t.UNSIGNED_BYTE&&(ne=t.RGB8UI),X===t.UNSIGNED_SHORT&&(ne=t.RGB16UI),X===t.UNSIGNED_INT&&(ne=t.RGB32UI),X===t.BYTE&&(ne=t.RGB8I),X===t.SHORT&&(ne=t.RGB16I),X===t.INT&&(ne=t.RGB32I)),y===t.RGBA_INTEGER&&(X===t.UNSIGNED_BYTE&&(ne=t.RGBA8UI),X===t.UNSIGNED_SHORT&&(ne=t.RGBA16UI),X===t.UNSIGNED_INT&&(ne=t.RGBA32UI),X===t.BYTE&&(ne=t.RGBA8I),X===t.SHORT&&(ne=t.RGBA16I),X===t.INT&&(ne=t.RGBA32I)),y===t.RGB&&(X===t.UNSIGNED_SHORT&&ve&&(ne=ve.RGB16_EXT),X===t.SHORT&&ve&&(ne=ve.RGB16_SNORM_EXT),X===t.UNSIGNED_INT_5_9_9_9_REV&&(ne=t.RGB9_E5),X===t.UNSIGNED_INT_10F_11F_11F_REV&&(ne=t.R11F_G11F_B10F)),y===t.RGBA){const q=de?Qu:ht.getTransfer(te);X===t.FLOAT&&(ne=t.RGBA32F),X===t.HALF_FLOAT&&(ne=t.RGBA16F),X===t.UNSIGNED_BYTE&&(ne=q===Nt?t.SRGB8_ALPHA8:t.RGBA8),X===t.UNSIGNED_SHORT&&ve&&(ne=ve.RGBA16_EXT),X===t.SHORT&&ve&&(ne=ve.RGBA16_SNORM_EXT),X===t.UNSIGNED_SHORT_4_4_4_4&&(ne=t.RGBA4),X===t.UNSIGNED_SHORT_5_5_5_1&&(ne=t.RGB5_A1)}return(ne===t.R16F||ne===t.R32F||ne===t.RG16F||ne===t.RG32F||ne===t.RGBA16F||ne===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ne}function A(N,y){let X;return N?y===null||y===ia||y===Pl?X=t.DEPTH24_STENCIL8:y===Bi?X=t.DEPTH32F_STENCIL8:y===Ol&&(X=t.DEPTH24_STENCIL8,Ge("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ia||y===Pl?X=t.DEPTH_COMPONENT24:y===Bi?X=t.DEPTH_COMPONENT32F:y===Ol&&(X=t.DEPTH_COMPONENT16),X}function R(N,y){return h(N)===!0||N.isFramebufferTexture&&N.minFilter!==En&&N.minFilter!==Rn?Math.log2(Math.max(y.width,y.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?y.mipmaps.length:1}function T(N){const y=N.target;y.removeEventListener("dispose",T),C(y),y.isVideoTexture&&d.delete(y),y.isHTMLTexture&&p.delete(y)}function M(N){const y=N.target;y.removeEventListener("dispose",M),U(y)}function C(N){const y=i.get(N);if(y.__webglInit===void 0)return;const X=N.source,Z=m.get(X);if(Z){const te=Z[y.__cacheKey];te.usedTimes--,te.usedTimes===0&&w(N),Object.keys(Z).length===0&&m.delete(X)}i.remove(N)}function w(N){const y=i.get(N);t.deleteTexture(y.__webglTexture);const X=N.source,Z=m.get(X);delete Z[y.__cacheKey],r.memory.textures--}function U(N){const y=i.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),i.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(y.__webglFramebuffer[Z]))for(let te=0;te<y.__webglFramebuffer[Z].length;te++)t.deleteFramebuffer(y.__webglFramebuffer[Z][te]);else t.deleteFramebuffer(y.__webglFramebuffer[Z]);y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer[Z])}else{if(Array.isArray(y.__webglFramebuffer))for(let Z=0;Z<y.__webglFramebuffer.length;Z++)t.deleteFramebuffer(y.__webglFramebuffer[Z]);else t.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&t.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&t.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let Z=0;Z<y.__webglColorRenderbuffer.length;Z++)y.__webglColorRenderbuffer[Z]&&t.deleteRenderbuffer(y.__webglColorRenderbuffer[Z]);y.__webglDepthRenderbuffer&&t.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const X=N.textures;for(let Z=0,te=X.length;Z<te;Z++){const de=i.get(X[Z]);de.__webglTexture&&(t.deleteTexture(de.__webglTexture),r.memory.textures--),i.remove(X[Z])}i.remove(N)}let O=0;function k(){O=0}function P(){return O}function z(N){O=N}function B(){const N=O;return N>=a.maxTextures&&Ge("WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+a.maxTextures),O+=1,N}function I(N){const y=[];return y.push(N.wrapS),y.push(N.wrapT),y.push(N.wrapR||0),y.push(N.magFilter),y.push(N.minFilter),y.push(N.anisotropy),y.push(N.internalFormat),y.push(N.format),y.push(N.type),y.push(N.generateMipmaps),y.push(N.premultiplyAlpha),y.push(N.flipY),y.push(N.unpackAlignment),y.push(N.colorSpace),y.join()}function L(N,y){const X=i.get(N);if(N.isVideoTexture&&H(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&X.__version!==N.version){const Z=N.image;if(Z===null)Ge("WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)Ge("WebGLRenderer: Texture marked for update but image is incomplete");else{Te(X,N,y);return}}else N.isExternalTexture&&(X.__webglTexture=N.sourceTexture?N.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,X.__webglTexture,t.TEXTURE0+y)}function V(N,y){const X=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&X.__version!==N.version){Te(X,N,y);return}else N.isExternalTexture&&(X.__webglTexture=N.sourceTexture?N.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,X.__webglTexture,t.TEXTURE0+y)}function re(N,y){const X=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&X.__version!==N.version){Te(X,N,y);return}n.bindTexture(t.TEXTURE_3D,X.__webglTexture,t.TEXTURE0+y)}function ce(N,y){const X=i.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&X.__version!==N.version){Ie(X,N,y);return}n.bindTexture(t.TEXTURE_CUBE_MAP,X.__webglTexture,t.TEXTURE0+y)}const _e={[ep]:t.REPEAT,[wa]:t.CLAMP_TO_EDGE,[tp]:t.MIRRORED_REPEAT},ke={[En]:t.NEAREST,[MT]:t.NEAREST_MIPMAP_NEAREST,[gc]:t.NEAREST_MIPMAP_LINEAR,[Rn]:t.LINEAR,[hd]:t.LINEAR_MIPMAP_NEAREST,[Fs]:t.LINEAR_MIPMAP_LINEAR},Je={[TT]:t.NEVER,[NT]:t.ALWAYS,[AT]:t.LESS,[Km]:t.LEQUAL,[wT]:t.EQUAL,[Qm]:t.GEQUAL,[CT]:t.GREATER,[RT]:t.NOTEQUAL};function He(N,y){if(y.type===Bi&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Rn||y.magFilter===hd||y.magFilter===gc||y.magFilter===Fs||y.minFilter===Rn||y.minFilter===hd||y.minFilter===gc||y.minFilter===Fs)&&Ge("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(N,t.TEXTURE_WRAP_S,_e[y.wrapS]),t.texParameteri(N,t.TEXTURE_WRAP_T,_e[y.wrapT]),(N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY)&&t.texParameteri(N,t.TEXTURE_WRAP_R,_e[y.wrapR]),t.texParameteri(N,t.TEXTURE_MAG_FILTER,ke[y.magFilter]),t.texParameteri(N,t.TEXTURE_MIN_FILTER,ke[y.minFilter]),y.compareFunction&&(t.texParameteri(N,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(N,t.TEXTURE_COMPARE_FUNC,Je[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===En||y.minFilter!==gc&&y.minFilter!==Fs||y.type===Bi&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){const X=e.get("EXT_texture_filter_anisotropic");t.texParameterf(N,X.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,a.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function se(N,y){let X=!1;N.__webglInit===void 0&&(N.__webglInit=!0,y.addEventListener("dispose",T));const Z=y.source;let te=m.get(Z);te===void 0&&(te={},m.set(Z,te));const de=I(y);if(de!==N.__cacheKey){te[de]===void 0&&(te[de]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,X=!0),te[de].usedTimes++;const ve=te[N.__cacheKey];ve!==void 0&&(te[N.__cacheKey].usedTimes--,ve.usedTimes===0&&w(y)),N.__cacheKey=de,N.__webglTexture=te[de].texture}return X}function ge(N,y,X){return Math.floor(Math.floor(N/X)/y)}function he(N,y,X,Z){const de=N.updateRanges;if(de.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,y.width,y.height,X,Z,y.data);else{de.sort((fe,oe)=>fe.start-oe.start);let ve=0;for(let fe=1;fe<de.length;fe++){const oe=de[ve],pe=de[fe],Re=oe.start+oe.count,Ue=ge(pe.start,y.width,4),Fe=ge(oe.start,y.width,4);pe.start<=Re+1&&Ue===Fe&&ge(pe.start+pe.count-1,y.width,4)===Ue?oe.count=Math.max(oe.count,pe.start+pe.count-oe.start):(++ve,de[ve]=pe)}de.length=ve+1;const ne=n.getParameter(t.UNPACK_ROW_LENGTH),q=n.getParameter(t.UNPACK_SKIP_PIXELS),ie=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,y.width);for(let fe=0,oe=de.length;fe<oe;fe++){const pe=de[fe],Re=Math.floor(pe.start/4),Ue=Math.ceil(pe.count/4),Fe=Re%y.width,G=Math.floor(Re/y.width),me=Ue,D=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Fe),n.pixelStorei(t.UNPACK_SKIP_ROWS,G),n.texSubImage2D(t.TEXTURE_2D,0,Fe,G,me,D,X,Z,y.data)}N.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ne),n.pixelStorei(t.UNPACK_SKIP_PIXELS,q),n.pixelStorei(t.UNPACK_SKIP_ROWS,ie)}}function Te(N,y,X){let Z=t.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=t.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=t.TEXTURE_3D);const te=se(N,y),de=y.source;n.bindTexture(Z,N.__webglTexture,t.TEXTURE0+X);const ve=i.get(de);if(de.version!==ve.__version||te===!0){if(n.activeTexture(t.TEXTURE0+X),(typeof ImageBitmap<"u"&&y.image instanceof ImageBitmap)===!1){const D=ht.getPrimaries(ht.workingColorSpace),F=y.colorSpace===ts?null:ht.getPrimaries(y.colorSpace),le=y.colorSpace===ts||D===F?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,le)}n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment);let q=_(y.image,!1,a.maxTextureSize);q=et(y,q);const ie=s.convert(y.format,y.colorSpace),fe=s.convert(y.type);let oe=x(y.internalFormat,ie,fe,y.normalized,y.colorSpace,y.isVideoTexture);He(Z,y);let pe;const Re=y.mipmaps,Ue=y.isVideoTexture!==!0,Fe=ve.__version===void 0||te===!0,G=de.dataReady,me=R(y,q);if(y.isDepthTexture)oe=A(y.format===Hs,y.type),Fe&&(Ue?n.texStorage2D(t.TEXTURE_2D,1,oe,q.width,q.height):n.texImage2D(t.TEXTURE_2D,0,oe,q.width,q.height,0,ie,fe,null));else if(y.isDataTexture)if(Re.length>0){Ue&&Fe&&n.texStorage2D(t.TEXTURE_2D,me,oe,Re[0].width,Re[0].height);for(let D=0,F=Re.length;D<F;D++)pe=Re[D],Ue?G&&n.texSubImage2D(t.TEXTURE_2D,D,0,0,pe.width,pe.height,ie,fe,pe.data):n.texImage2D(t.TEXTURE_2D,D,oe,pe.width,pe.height,0,ie,fe,pe.data);y.generateMipmaps=!1}else Ue?(Fe&&n.texStorage2D(t.TEXTURE_2D,me,oe,q.width,q.height),G&&he(y,q,ie,fe)):n.texImage2D(t.TEXTURE_2D,0,oe,q.width,q.height,0,ie,fe,q.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ue&&Fe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,me,oe,Re[0].width,Re[0].height,q.depth);for(let D=0,F=Re.length;D<F;D++)if(pe=Re[D],y.format!==Fi)if(ie!==null)if(Ue){if(G)if(y.layerUpdates.size>0){const le=Mv(pe.width,pe.height,y.format,y.type);for(const Q of y.layerUpdates){const xe=pe.data.subarray(Q*le/pe.data.BYTES_PER_ELEMENT,(Q+1)*le/pe.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,D,0,0,Q,pe.width,pe.height,1,ie,xe)}y.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,D,0,0,0,pe.width,pe.height,q.depth,ie,pe.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,D,oe,pe.width,pe.height,q.depth,0,pe.data,0,0);else Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ue?G&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,D,0,0,0,pe.width,pe.height,q.depth,ie,fe,pe.data):n.texImage3D(t.TEXTURE_2D_ARRAY,D,oe,pe.width,pe.height,q.depth,0,ie,fe,pe.data)}else{Ue&&Fe&&n.texStorage2D(t.TEXTURE_2D,me,oe,Re[0].width,Re[0].height);for(let D=0,F=Re.length;D<F;D++)pe=Re[D],y.format!==Fi?ie!==null?Ue?G&&n.compressedTexSubImage2D(t.TEXTURE_2D,D,0,0,pe.width,pe.height,ie,pe.data):n.compressedTexImage2D(t.TEXTURE_2D,D,oe,pe.width,pe.height,0,pe.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ue?G&&n.texSubImage2D(t.TEXTURE_2D,D,0,0,pe.width,pe.height,ie,fe,pe.data):n.texImage2D(t.TEXTURE_2D,D,oe,pe.width,pe.height,0,ie,fe,pe.data)}else if(y.isDataArrayTexture)if(Ue){if(Fe&&n.texStorage3D(t.TEXTURE_2D_ARRAY,me,oe,q.width,q.height,q.depth),G)if(y.layerUpdates.size>0){const D=Mv(q.width,q.height,y.format,y.type);for(const F of y.layerUpdates){const le=q.data.subarray(F*D/q.data.BYTES_PER_ELEMENT,(F+1)*D/q.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,F,q.width,q.height,1,ie,fe,le)}y.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,q.width,q.height,q.depth,ie,fe,q.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,oe,q.width,q.height,q.depth,0,ie,fe,q.data);else if(y.isData3DTexture)Ue?(Fe&&n.texStorage3D(t.TEXTURE_3D,me,oe,q.width,q.height,q.depth),G&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,q.width,q.height,q.depth,ie,fe,q.data)):n.texImage3D(t.TEXTURE_3D,0,oe,q.width,q.height,q.depth,0,ie,fe,q.data);else if(y.isFramebufferTexture){if(Fe)if(Ue)n.texStorage2D(t.TEXTURE_2D,me,oe,q.width,q.height);else{let D=q.width,F=q.height;for(let le=0;le<me;le++)n.texImage2D(t.TEXTURE_2D,le,oe,D,F,0,ie,fe,null),D>>=1,F>>=1}}else if(y.isHTMLTexture){if("texElementImage2D"in t){const D=t.canvas;if(D.hasAttribute("layoutsubtree")||D.setAttribute("layoutsubtree","true"),q.parentNode!==D){D.appendChild(q),p.add(y),D.onpaint=F=>{const le=F.changedElements;for(const Q of p)le.includes(Q.image)&&(Q.needsUpdate=!0)},D.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,q);else{const le=t.RGBA,Q=t.RGBA,xe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,le,Q,xe,q)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Ue&&Fe){const D=Xe(Re[0]);n.texStorage2D(t.TEXTURE_2D,me,oe,D.width,D.height)}for(let D=0,F=Re.length;D<F;D++)pe=Re[D],Ue?G&&n.texSubImage2D(t.TEXTURE_2D,D,0,0,ie,fe,pe):n.texImage2D(t.TEXTURE_2D,D,oe,ie,fe,pe);y.generateMipmaps=!1}else if(Ue){if(Fe){const D=Xe(q);n.texStorage2D(t.TEXTURE_2D,me,oe,D.width,D.height)}G&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ie,fe,q)}else n.texImage2D(t.TEXTURE_2D,0,oe,ie,fe,q);h(y)&&v(Z),ve.__version=de.version,y.onUpdate&&y.onUpdate(y)}N.__version=y.version}function Ie(N,y,X){if(y.image.length!==6)return;const Z=se(N,y),te=y.source;n.bindTexture(t.TEXTURE_CUBE_MAP,N.__webglTexture,t.TEXTURE0+X);const de=i.get(te);if(te.version!==de.__version||Z===!0){n.activeTexture(t.TEXTURE0+X);const ve=ht.getPrimaries(ht.workingColorSpace),ne=y.colorSpace===ts?null:ht.getPrimaries(y.colorSpace),q=y.colorSpace===ts||ve===ne?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,q);const ie=y.isCompressedTexture||y.image[0].isCompressedTexture,fe=y.image[0]&&y.image[0].isDataTexture,oe=[];for(let Q=0;Q<6;Q++)!ie&&!fe?oe[Q]=_(y.image[Q],!0,a.maxCubemapSize):oe[Q]=fe?y.image[Q].image:y.image[Q],oe[Q]=et(y,oe[Q]);const pe=oe[0],Re=s.convert(y.format,y.colorSpace),Ue=s.convert(y.type),Fe=x(y.internalFormat,Re,Ue,y.normalized,y.colorSpace),G=y.isVideoTexture!==!0,me=de.__version===void 0||Z===!0,D=te.dataReady;let F=R(y,pe);He(t.TEXTURE_CUBE_MAP,y);let le;if(ie){G&&me&&n.texStorage2D(t.TEXTURE_CUBE_MAP,F,Fe,pe.width,pe.height);for(let Q=0;Q<6;Q++){le=oe[Q].mipmaps;for(let xe=0;xe<le.length;xe++){const Me=le[xe];y.format!==Fi?Re!==null?G?D&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,0,0,Me.width,Me.height,Re,Me.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,Fe,Me.width,Me.height,0,Me.data):Ge("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):G?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,0,0,Me.width,Me.height,Re,Ue,Me.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe,Fe,Me.width,Me.height,0,Re,Ue,Me.data)}}}else{if(le=y.mipmaps,G&&me){le.length>0&&F++;const Q=Xe(oe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,F,Fe,Q.width,Q.height)}for(let Q=0;Q<6;Q++)if(fe){G?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,oe[Q].width,oe[Q].height,Re,Ue,oe[Q].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Fe,oe[Q].width,oe[Q].height,0,Re,Ue,oe[Q].data);for(let xe=0;xe<le.length;xe++){const Ke=le[xe].image[Q].image;G?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,0,0,Ke.width,Ke.height,Re,Ue,Ke.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,Fe,Ke.width,Ke.height,0,Re,Ue,Ke.data)}}else{G?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,0,0,Re,Ue,oe[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0,Fe,Re,Ue,oe[Q]);for(let xe=0;xe<le.length;xe++){const Me=le[xe];G?D&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,0,0,Re,Ue,Me.image[Q]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,xe+1,Fe,Re,Ue,Me.image[Q])}}}h(y)&&v(t.TEXTURE_CUBE_MAP),de.__version=te.version,y.onUpdate&&y.onUpdate(y)}N.__version=y.version}function W(N,y,X,Z,te,de){const ve=s.convert(X.format,X.colorSpace),ne=s.convert(X.type),q=x(X.internalFormat,ve,ne,X.normalized,X.colorSpace),ie=i.get(y),fe=i.get(X);if(fe.__renderTarget=y,!ie.__hasExternalTextures){const oe=Math.max(1,y.width>>de),pe=Math.max(1,y.height>>de);te===t.TEXTURE_3D||te===t.TEXTURE_2D_ARRAY?n.texImage3D(te,de,q,oe,pe,y.depth,0,ve,ne,null):n.texImage2D(te,de,q,oe,pe,0,ve,ne,null)}n.bindFramebuffer(t.FRAMEBUFFER,N),Se(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Z,te,fe.__webglTexture,0,wt(y)):(te===t.TEXTURE_2D||te>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Z,te,fe.__webglTexture,de),n.bindFramebuffer(t.FRAMEBUFFER,null)}function De(N,y,X){if(t.bindRenderbuffer(t.RENDERBUFFER,N),y.depthBuffer){const Z=y.depthTexture,te=Z&&Z.isDepthTexture?Z.type:null,de=A(y.stencilBuffer,te),ve=y.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Se(y)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,wt(y),de,y.width,y.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,wt(y),de,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,de,y.width,y.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ve,t.RENDERBUFFER,N)}else{const Z=y.textures;for(let te=0;te<Z.length;te++){const de=Z[te],ve=s.convert(de.format,de.colorSpace),ne=s.convert(de.type),q=x(de.internalFormat,ve,ne,de.normalized,de.colorSpace);Se(y)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,wt(y),q,y.width,y.height):X?t.renderbufferStorageMultisample(t.RENDERBUFFER,wt(y),q,y.width,y.height):t.renderbufferStorage(t.RENDERBUFFER,q,y.width,y.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Be(N,y,X){const Z=y.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,N),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=i.get(y.depthTexture);if(te.__renderTarget=y,(!te.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),Z){if(te.__webglInit===void 0&&(te.__webglInit=!0,y.depthTexture.addEventListener("dispose",T)),te.__webglTexture===void 0){te.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,te.__webglTexture),He(t.TEXTURE_CUBE_MAP,y.depthTexture);const ie=s.convert(y.depthTexture.format),fe=s.convert(y.depthTexture.type);let oe;y.depthTexture.format===Fa?oe=t.DEPTH_COMPONENT24:y.depthTexture.format===Hs&&(oe=t.DEPTH24_STENCIL8);for(let pe=0;pe<6;pe++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,oe,y.width,y.height,0,ie,fe,null)}}else L(y.depthTexture,0);const de=te.__webglTexture,ve=wt(y),ne=Z?t.TEXTURE_CUBE_MAP_POSITIVE_X+X:t.TEXTURE_2D,q=y.depthTexture.format===Hs?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(y.depthTexture.format===Fa)Se(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,ne,de,0,ve):t.framebufferTexture2D(t.FRAMEBUFFER,q,ne,de,0);else if(y.depthTexture.format===Hs)Se(y)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,q,ne,de,0,ve):t.framebufferTexture2D(t.FRAMEBUFFER,q,ne,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function je(N){const y=i.get(N),X=N.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==N.depthTexture){const Z=N.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Z){const te=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",te)};Z.addEventListener("dispose",te),y.__depthDisposeCallback=te}y.__boundDepthTexture=Z}if(N.depthTexture&&!y.__autoAllocateDepthBuffer)if(X)for(let Z=0;Z<6;Z++)Be(y.__webglFramebuffer[Z],N,Z);else{const Z=N.texture.mipmaps;Z&&Z.length>0?Be(y.__webglFramebuffer[0],N,0):Be(y.__webglFramebuffer,N,0)}else if(X){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=t.createRenderbuffer(),De(y.__webglDepthbuffer[Z],N,!1);else{const te=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=y.__webglDepthbuffer[Z];t.bindRenderbuffer(t.RENDERBUFFER,de),t.framebufferRenderbuffer(t.FRAMEBUFFER,te,t.RENDERBUFFER,de)}}else{const Z=N.texture.mipmaps;if(Z&&Z.length>0?n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=t.createRenderbuffer(),De(y.__webglDepthbuffer,N,!1);else{const te=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=y.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,de),t.framebufferRenderbuffer(t.FRAMEBUFFER,te,t.RENDERBUFFER,de)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function qe(N,y,X){const Z=i.get(N);y!==void 0&&W(Z.__webglFramebuffer,N,N.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),X!==void 0&&je(N)}function Ze(N){const y=N.texture,X=i.get(N),Z=i.get(y);N.addEventListener("dispose",M);const te=N.textures,de=N.isWebGLCubeRenderTarget===!0,ve=te.length>1;if(ve||(Z.__webglTexture===void 0&&(Z.__webglTexture=t.createTexture()),Z.__version=y.version,r.memory.textures++),de){X.__webglFramebuffer=[];for(let ne=0;ne<6;ne++)if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer[ne]=[];for(let q=0;q<y.mipmaps.length;q++)X.__webglFramebuffer[ne][q]=t.createFramebuffer()}else X.__webglFramebuffer[ne]=t.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){X.__webglFramebuffer=[];for(let ne=0;ne<y.mipmaps.length;ne++)X.__webglFramebuffer[ne]=t.createFramebuffer()}else X.__webglFramebuffer=t.createFramebuffer();if(ve)for(let ne=0,q=te.length;ne<q;ne++){const ie=i.get(te[ne]);ie.__webglTexture===void 0&&(ie.__webglTexture=t.createTexture(),r.memory.textures++)}if(N.samples>0&&Se(N)===!1){X.__webglMultisampledFramebuffer=t.createFramebuffer(),X.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,X.__webglMultisampledFramebuffer);for(let ne=0;ne<te.length;ne++){const q=te[ne];X.__webglColorRenderbuffer[ne]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,X.__webglColorRenderbuffer[ne]);const ie=s.convert(q.format,q.colorSpace),fe=s.convert(q.type),oe=x(q.internalFormat,ie,fe,q.normalized,q.colorSpace,N.isXRRenderTarget===!0),pe=wt(N);t.renderbufferStorageMultisample(t.RENDERBUFFER,pe,oe,N.width,N.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.RENDERBUFFER,X.__webglColorRenderbuffer[ne])}t.bindRenderbuffer(t.RENDERBUFFER,null),N.depthBuffer&&(X.__webglDepthRenderbuffer=t.createRenderbuffer(),De(X.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(de){n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),He(t.TEXTURE_CUBE_MAP,y);for(let ne=0;ne<6;ne++)if(y.mipmaps&&y.mipmaps.length>0)for(let q=0;q<y.mipmaps.length;q++)W(X.__webglFramebuffer[ne][q],N,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,q);else W(X.__webglFramebuffer[ne],N,y,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ne,0);h(y)&&v(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ve){for(let ne=0,q=te.length;ne<q;ne++){const ie=te[ne],fe=i.get(ie);let oe=t.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(oe=N.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(oe,fe.__webglTexture),He(oe,ie),W(X.__webglFramebuffer,N,ie,t.COLOR_ATTACHMENT0+ne,oe,0),h(ie)&&v(oe)}n.unbindTexture()}else{let ne=t.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ne=N.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ne,Z.__webglTexture),He(ne,y),y.mipmaps&&y.mipmaps.length>0)for(let q=0;q<y.mipmaps.length;q++)W(X.__webglFramebuffer[q],N,y,t.COLOR_ATTACHMENT0,ne,q);else W(X.__webglFramebuffer,N,y,t.COLOR_ATTACHMENT0,ne,0);h(y)&&v(ne),n.unbindTexture()}N.depthBuffer&&je(N)}function xt(N){const y=N.textures;for(let X=0,Z=y.length;X<Z;X++){const te=y[X];if(h(te)){const de=S(N),ve=i.get(te).__webglTexture;n.bindTexture(de,ve),v(de),n.unbindTexture()}}}const dt=[],ut=[];function It(N){if(N.samples>0){if(Se(N)===!1){const y=N.textures,X=N.width,Z=N.height;let te=t.COLOR_BUFFER_BIT;const de=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ve=i.get(N),ne=y.length>1;if(ne)for(let ie=0;ie<y.length;ie++)n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ve.__webglMultisampledFramebuffer);const q=N.texture.mipmaps;q&&q.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ve.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ve.__webglFramebuffer);for(let ie=0;ie<y.length;ie++){if(N.resolveDepthBuffer&&(N.depthBuffer&&(te|=t.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&(te|=t.STENCIL_BUFFER_BIT)),ne){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ve.__webglColorRenderbuffer[ie]);const fe=i.get(y[ie]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,fe,0)}t.blitFramebuffer(0,0,X,Z,0,0,X,Z,te,t.NEAREST),l===!0&&(dt.length=0,ut.length=0,dt.push(t.COLOR_ATTACHMENT0+ie),N.depthBuffer&&N.resolveDepthBuffer===!1&&(dt.push(de),ut.push(de),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,ut)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,dt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ne)for(let ie=0;ie<y.length;ie++){n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,ve.__webglColorRenderbuffer[ie]);const fe=i.get(y[ie]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ve.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.TEXTURE_2D,fe,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ve.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&l){const y=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[y])}}}function wt(N){return Math.min(a.maxSamples,N.samples)}function Se(N){const y=i.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function H(N){const y=r.render.frame;d.get(N)!==y&&(d.set(N,y),N.update())}function et(N,y){const X=N.colorSpace,Z=N.format,te=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||X!==Ku&&X!==ts&&(ht.getTransfer(X)===Nt?(Z!==Fi||te!==Ti)&&Ge("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):vt("WebGLTextures: Unsupported texture color space:",X)),y}function Xe(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=k,this.getTextureUnits=P,this.setTextureUnits=z,this.setTexture2D=L,this.setTexture2DArray=V,this.setTexture3D=re,this.setTextureCube=ce,this.rebindTextures=qe,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=xt,this.updateMultisampleRenderTarget=It,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=W,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function n3(t,e){function n(i,a=ts){let s;const r=ht.getTransfer(a);if(i===Ti)return t.UNSIGNED_BYTE;if(i===jm)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Xm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===vy)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_y)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===my)return t.BYTE;if(i===gy)return t.SHORT;if(i===Ol)return t.UNSIGNED_SHORT;if(i===Vm)return t.INT;if(i===ia)return t.UNSIGNED_INT;if(i===Bi)return t.FLOAT;if(i===Ba)return t.HALF_FLOAT;if(i===xy)return t.ALPHA;if(i===Sy)return t.RGB;if(i===Fi)return t.RGBA;if(i===Fa)return t.DEPTH_COMPONENT;if(i===Hs)return t.DEPTH_STENCIL;if(i===Wm)return t.RED;if(i===qm)return t.RED_INTEGER;if(i===Js)return t.RG;if(i===Ym)return t.RG_INTEGER;if(i===Zm)return t.RGBA_INTEGER;if(i===uu||i===fu||i===du||i===hu)if(r===Nt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===uu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===uu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===du)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===np||i===ip||i===ap||i===sp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===np)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ip)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ap)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===rp||i===op||i===lp||i===cp||i===up||i===Yu||i===fp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===rp||i===op)return r===Nt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===lp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===cp)return s.COMPRESSED_R11_EAC;if(i===up)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Yu)return s.COMPRESSED_RG11_EAC;if(i===fp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===Sp||i===yp||i===Mp||i===bp||i===Ep||i===Tp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===dp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_p)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ep)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tp)return r===Nt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ap||i===wp||i===Cp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ap)return r===Nt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rp||i===Np||i===Zu||i===Dp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Np)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Zu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Pl?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const i3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,a3=`
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

}`;class s3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Ly(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Tn({vertexShader:i3,fragmentShader:a3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Di(new Ef(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class r3 extends or{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,p=null,u=null,m=null,g=null;const b=typeof XRWebGLBinding<"u",_=new s3,h={},v=n.getContextAttributes();let S=null,x=null;const A=[],R=[],T=new Mt;let M=null;const C=new yi;C.viewport=new Qt;const w=new yi;w.viewport=new Qt;const U=[C,w],O=new gA;let k=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let ge=A[se];return ge===void 0&&(ge=new Sd,A[se]=ge),ge.getTargetRaySpace()},this.getControllerGrip=function(se){let ge=A[se];return ge===void 0&&(ge=new Sd,A[se]=ge),ge.getGripSpace()},this.getHand=function(se){let ge=A[se];return ge===void 0&&(ge=new Sd,A[se]=ge),ge.getHandSpace()};function z(se){const ge=R.indexOf(se.inputSource);if(ge===-1)return;const he=A[ge];he!==void 0&&(he.update(se.inputSource,se.frame,c||r),he.dispatchEvent({type:se.type,data:se.inputSource}))}function B(){a.removeEventListener("select",z),a.removeEventListener("selectstart",z),a.removeEventListener("selectend",z),a.removeEventListener("squeeze",z),a.removeEventListener("squeezestart",z),a.removeEventListener("squeezeend",z),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",I);for(let se=0;se<A.length;se++){const ge=R[se];ge!==null&&(R[se]=null,A[se].disconnect(ge))}k=null,P=null,_.reset();for(const se in h)delete h[se];e.setRenderTarget(S),m=null,u=null,p=null,a=null,x=null,He.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){s=se,i.isPresenting===!0&&Ge("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,i.isPresenting===!0&&Ge("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return p===null&&b&&(p=new XRWebGLBinding(a,n)),p},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(se){if(a=se,a!==null){if(S=e.getRenderTarget(),a.addEventListener("select",z),a.addEventListener("selectstart",z),a.addEventListener("selectend",z),a.addEventListener("squeeze",z),a.addEventListener("squeezestart",z),a.addEventListener("squeezeend",z),a.addEventListener("end",B),a.addEventListener("inputsourceschange",I),v.xrCompatible!==!0&&await n.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(T),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let he=null,Te=null,Ie=null;v.depth&&(Ie=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,he=v.stencil?Hs:Fa,Te=v.stencil?Pl:ia);const W={colorFormat:n.RGBA8,depthFormat:Ie,scaleFactor:s};p=this.getBinding(),u=p.createProjectionLayer(W),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new na(u.textureWidth,u.textureHeight,{format:Fi,type:Ti,depthTexture:new vo(u.textureWidth,u.textureHeight,Te,void 0,void 0,void 0,void 0,void 0,void 0,he),stencilBuffer:v.stencil,colorSpace:e.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const he={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(a,n,he),a.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),x=new na(m.framebufferWidth,m.framebufferHeight,{format:Fi,type:Ti,colorSpace:e.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),He.setContext(a),He.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function I(se){for(let ge=0;ge<se.removed.length;ge++){const he=se.removed[ge],Te=R.indexOf(he);Te>=0&&(R[Te]=null,A[Te].disconnect(he))}for(let ge=0;ge<se.added.length;ge++){const he=se.added[ge];let Te=R.indexOf(he);if(Te===-1){for(let W=0;W<A.length;W++)if(W>=R.length){R.push(he),Te=W;break}else if(R[W]===null){R[W]=he,Te=W;break}if(Te===-1)break}const Ie=A[Te];Ie&&Ie.connect(he)}}const L=new Y,V=new Y;function re(se,ge,he){L.setFromMatrixPosition(ge.matrixWorld),V.setFromMatrixPosition(he.matrixWorld);const Te=L.distanceTo(V),Ie=ge.projectionMatrix.elements,W=he.projectionMatrix.elements,De=Ie[14]/(Ie[10]-1),Be=Ie[14]/(Ie[10]+1),je=(Ie[9]+1)/Ie[5],qe=(Ie[9]-1)/Ie[5],Ze=(Ie[8]-1)/Ie[0],xt=(W[8]+1)/W[0],dt=De*Ze,ut=De*xt,It=Te/(-Ze+xt),wt=It*-Ze;if(ge.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(wt),se.translateZ(It),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),Ie[10]===-1)se.projectionMatrix.copy(ge.projectionMatrix),se.projectionMatrixInverse.copy(ge.projectionMatrixInverse);else{const Se=De+It,H=Be+It,et=dt-wt,Xe=ut+(Te-wt),N=je*Be/H*Se,y=qe*Be/H*Se;se.projectionMatrix.makePerspective(et,Xe,N,y,Se,H),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function ce(se,ge){ge===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(ge.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(a===null)return;let ge=se.near,he=se.far;_.texture!==null&&(_.depthNear>0&&(ge=_.depthNear),_.depthFar>0&&(he=_.depthFar)),O.near=w.near=C.near=ge,O.far=w.far=C.far=he,(k!==O.near||P!==O.far)&&(a.updateRenderState({depthNear:O.near,depthFar:O.far}),k=O.near,P=O.far),O.layers.mask=se.layers.mask|6,C.layers.mask=O.layers.mask&-5,w.layers.mask=O.layers.mask&-3;const Te=se.parent,Ie=O.cameras;ce(O,Te);for(let W=0;W<Ie.length;W++)ce(Ie[W],Te);Ie.length===2?re(O,C,w):O.projectionMatrix.copy(C.projectionMatrix),_e(se,O,Te)};function _e(se,ge,he){he===null?se.matrix.copy(ge.matrixWorld):(se.matrix.copy(he.matrixWorld),se.matrix.invert(),se.matrix.multiply(ge.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(ge.projectionMatrix),se.projectionMatrixInverse.copy(ge.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=Up*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(se){l=se,u!==null&&(u.fixedFoveation=se),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=se)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(O)},this.getCameraTexture=function(se){return h[se]};let ke=null;function Je(se,ge){if(d=ge.getViewerPose(c||r),g=ge,d!==null){const he=d.views;m!==null&&(e.setRenderTargetFramebuffer(x,m.framebuffer),e.setRenderTarget(x));let Te=!1;he.length!==O.cameras.length&&(O.cameras.length=0,Te=!0);for(let Be=0;Be<he.length;Be++){const je=he[Be];let qe=null;if(m!==null)qe=m.getViewport(je);else{const xt=p.getViewSubImage(u,je);qe=xt.viewport,Be===0&&(e.setRenderTargetTextures(x,xt.colorTexture,xt.depthStencilTexture),e.setRenderTarget(x))}let Ze=U[Be];Ze===void 0&&(Ze=new yi,Ze.layers.enable(Be),Ze.viewport=new Qt,U[Be]=Ze),Ze.matrix.fromArray(je.transform.matrix),Ze.matrix.decompose(Ze.position,Ze.quaternion,Ze.scale),Ze.projectionMatrix.fromArray(je.projectionMatrix),Ze.projectionMatrixInverse.copy(Ze.projectionMatrix).invert(),Ze.viewport.set(qe.x,qe.y,qe.width,qe.height),Be===0&&(O.matrix.copy(Ze.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Te===!0&&O.cameras.push(Ze)}const Ie=a.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){p=i.getBinding();const Be=p.getDepthInformation(he[0]);Be&&Be.isValid&&Be.texture&&_.init(Be,a.renderState)}if(Ie&&Ie.includes("camera-access")&&b){e.state.unbindTexture(),p=i.getBinding();for(let Be=0;Be<he.length;Be++){const je=he[Be].camera;if(je){let qe=h[je];qe||(qe=new Ly,h[je]=qe);const Ze=p.getCameraImage(je);qe.sourceTexture=Ze}}}}for(let he=0;he<A.length;he++){const Te=R[he],Ie=A[he];Te!==null&&Ie!==void 0&&Ie.update(Te,ge,c||r)}ke&&ke(se,ge),ge.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ge}),g=null}const He=new zy;He.setAnimationLoop(Je),this.setAnimationLoop=function(se){ke=se},this.dispose=function(){}}}const o3=new Ht,Vy=new Ye;Vy.set(-1,0,0,0,1,0,0,0,1);function l3(t,e){function n(_,h){_.matrixAutoUpdate===!0&&_.updateMatrix(),h.value.copy(_.matrix)}function i(_,h){h.color.getRGB(_.fogColor.value,Oy(t)),h.isFog?(_.fogNear.value=h.near,_.fogFar.value=h.far):h.isFogExp2&&(_.fogDensity.value=h.density)}function a(_,h,v,S,x){h.isNodeMaterial?h.uniformsNeedUpdate=!1:h.isMeshBasicMaterial?s(_,h):h.isMeshLambertMaterial?(s(_,h),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)):h.isMeshToonMaterial?(s(_,h),p(_,h)):h.isMeshPhongMaterial?(s(_,h),d(_,h),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)):h.isMeshStandardMaterial?(s(_,h),u(_,h),h.isMeshPhysicalMaterial&&m(_,h,x)):h.isMeshMatcapMaterial?(s(_,h),g(_,h)):h.isMeshDepthMaterial?s(_,h):h.isMeshDistanceMaterial?(s(_,h),b(_,h)):h.isMeshNormalMaterial?s(_,h):h.isLineBasicMaterial?(r(_,h),h.isLineDashedMaterial&&o(_,h)):h.isPointsMaterial?l(_,h,v,S):h.isSpriteMaterial?c(_,h):h.isShadowMaterial?(_.color.value.copy(h.color),_.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function s(_,h){_.opacity.value=h.opacity,h.color&&_.diffuse.value.copy(h.color),h.emissive&&_.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(_.map.value=h.map,n(h.map,_.mapTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,n(h.alphaMap,_.alphaMapTransform)),h.bumpMap&&(_.bumpMap.value=h.bumpMap,n(h.bumpMap,_.bumpMapTransform),_.bumpScale.value=h.bumpScale,h.side===Yn&&(_.bumpScale.value*=-1)),h.normalMap&&(_.normalMap.value=h.normalMap,n(h.normalMap,_.normalMapTransform),_.normalScale.value.copy(h.normalScale),h.side===Yn&&_.normalScale.value.negate()),h.displacementMap&&(_.displacementMap.value=h.displacementMap,n(h.displacementMap,_.displacementMapTransform),_.displacementScale.value=h.displacementScale,_.displacementBias.value=h.displacementBias),h.emissiveMap&&(_.emissiveMap.value=h.emissiveMap,n(h.emissiveMap,_.emissiveMapTransform)),h.specularMap&&(_.specularMap.value=h.specularMap,n(h.specularMap,_.specularMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest);const v=e.get(h),S=v.envMap,x=v.envMapRotation;S&&(_.envMap.value=S,_.envMapRotation.value.setFromMatrix4(o3.makeRotationFromEuler(x)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(Vy),_.reflectivity.value=h.reflectivity,_.ior.value=h.ior,_.refractionRatio.value=h.refractionRatio),h.lightMap&&(_.lightMap.value=h.lightMap,_.lightMapIntensity.value=h.lightMapIntensity,n(h.lightMap,_.lightMapTransform)),h.aoMap&&(_.aoMap.value=h.aoMap,_.aoMapIntensity.value=h.aoMapIntensity,n(h.aoMap,_.aoMapTransform))}function r(_,h){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,h.map&&(_.map.value=h.map,n(h.map,_.mapTransform))}function o(_,h){_.dashSize.value=h.dashSize,_.totalSize.value=h.dashSize+h.gapSize,_.scale.value=h.scale}function l(_,h,v,S){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,_.size.value=h.size*v,_.scale.value=S*.5,h.map&&(_.map.value=h.map,n(h.map,_.uvTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,n(h.alphaMap,_.alphaMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest)}function c(_,h){_.diffuse.value.copy(h.color),_.opacity.value=h.opacity,_.rotation.value=h.rotation,h.map&&(_.map.value=h.map,n(h.map,_.mapTransform)),h.alphaMap&&(_.alphaMap.value=h.alphaMap,n(h.alphaMap,_.alphaMapTransform)),h.alphaTest>0&&(_.alphaTest.value=h.alphaTest)}function d(_,h){_.specular.value.copy(h.specular),_.shininess.value=Math.max(h.shininess,1e-4)}function p(_,h){h.gradientMap&&(_.gradientMap.value=h.gradientMap)}function u(_,h){_.metalness.value=h.metalness,h.metalnessMap&&(_.metalnessMap.value=h.metalnessMap,n(h.metalnessMap,_.metalnessMapTransform)),_.roughness.value=h.roughness,h.roughnessMap&&(_.roughnessMap.value=h.roughnessMap,n(h.roughnessMap,_.roughnessMapTransform)),h.envMap&&(_.envMapIntensity.value=h.envMapIntensity)}function m(_,h,v){_.ior.value=h.ior,h.sheen>0&&(_.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),_.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(_.sheenColorMap.value=h.sheenColorMap,n(h.sheenColorMap,_.sheenColorMapTransform)),h.sheenRoughnessMap&&(_.sheenRoughnessMap.value=h.sheenRoughnessMap,n(h.sheenRoughnessMap,_.sheenRoughnessMapTransform))),h.clearcoat>0&&(_.clearcoat.value=h.clearcoat,_.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(_.clearcoatMap.value=h.clearcoatMap,n(h.clearcoatMap,_.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,n(h.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(_.clearcoatNormalMap.value=h.clearcoatNormalMap,n(h.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Yn&&_.clearcoatNormalScale.value.negate())),h.dispersion>0&&(_.dispersion.value=h.dispersion),h.iridescence>0&&(_.iridescence.value=h.iridescence,_.iridescenceIOR.value=h.iridescenceIOR,_.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(_.iridescenceMap.value=h.iridescenceMap,n(h.iridescenceMap,_.iridescenceMapTransform)),h.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=h.iridescenceThicknessMap,n(h.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),h.transmission>0&&(_.transmission.value=h.transmission,_.transmissionSamplerMap.value=v.texture,_.transmissionSamplerSize.value.set(v.width,v.height),h.transmissionMap&&(_.transmissionMap.value=h.transmissionMap,n(h.transmissionMap,_.transmissionMapTransform)),_.thickness.value=h.thickness,h.thicknessMap&&(_.thicknessMap.value=h.thicknessMap,n(h.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=h.attenuationDistance,_.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(_.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(_.anisotropyMap.value=h.anisotropyMap,n(h.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=h.specularIntensity,_.specularColor.value.copy(h.specularColor),h.specularColorMap&&(_.specularColorMap.value=h.specularColorMap,n(h.specularColorMap,_.specularColorMapTransform)),h.specularIntensityMap&&(_.specularIntensityMap.value=h.specularIntensityMap,n(h.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,h){h.matcap&&(_.matcap.value=h.matcap)}function b(_,h){const v=e.get(h).light;_.referencePosition.value.setFromMatrixPosition(v.matrixWorld),_.nearDistance.value=v.shadow.camera.near,_.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function c3(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){const R=A.program;i.uniformBlockBinding(x,R)}function c(x,A){let R=a[x.id];R===void 0&&(_(x),R=d(x),a[x.id]=R,x.addEventListener("dispose",v));const T=A.program;i.updateUBOMapping(x,T);const M=e.render.frame;s[x.id]!==M&&(u(x),s[x.id]=M)}function d(x){const A=p();x.__bindingPointIndex=A;const R=t.createBuffer(),T=x.__size,M=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,R),t.bufferData(t.UNIFORM_BUFFER,T,M),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,A,R),R}function p(){for(let x=0;x<o;x++)if(r.indexOf(x)===-1)return r.push(x),x;return vt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const A=a[x.id],R=x.uniforms,T=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,A);for(let M=0,C=R.length;M<C;M++){const w=R[M];if(Array.isArray(w))for(let U=0,O=w.length;U<O;U++)m(w[U],M,U,T);else m(w,M,0,T)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(x,A,R,T){if(b(x,A,R,T)===!0){const M=x.__offset,C=x.value;if(Array.isArray(C)){let w=0;for(let U=0;U<C.length;U++){const O=C[U],k=h(O);g(O,x.__data,w),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(w+=k.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(C,x.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,M,x.__data)}}function g(x,A,R){typeof x=="number"||typeof x=="boolean"?A[0]=x:x.isMatrix3?(A[0]=x.elements[0],A[1]=x.elements[1],A[2]=x.elements[2],A[3]=0,A[4]=x.elements[3],A[5]=x.elements[4],A[6]=x.elements[5],A[7]=0,A[8]=x.elements[6],A[9]=x.elements[7],A[10]=x.elements[8],A[11]=0):ArrayBuffer.isView(x)?A.set(new x.constructor(x.buffer,x.byteOffset,A.length)):x.toArray(A,R)}function b(x,A,R,T){const M=x.value,C=A+"_"+R;if(T[C]===void 0)return typeof M=="number"||typeof M=="boolean"?T[C]=M:ArrayBuffer.isView(M)?T[C]=M.slice():T[C]=M.clone(),!0;{const w=T[C];if(typeof M=="number"||typeof M=="boolean"){if(w!==M)return T[C]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(w.equals(M)===!1)return w.copy(M),!0}}return!1}function _(x){const A=x.uniforms;let R=0;const T=16;for(let C=0,w=A.length;C<w;C++){const U=Array.isArray(A[C])?A[C]:[A[C]];for(let O=0,k=U.length;O<k;O++){const P=U[O],z=Array.isArray(P.value)?P.value:[P.value];for(let B=0,I=z.length;B<I;B++){const L=z[B],V=h(L),re=R%T,ce=re%V.boundary,_e=re+ce;R+=ce,_e!==0&&T-_e<V.storage&&(R+=T-_e),P.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=R,R+=V.storage}}}const M=R%T;return M>0&&(R+=T-M),x.__size=R,x.__cache={},this}function h(x){const A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?Ge("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(A.boundary=16,A.storage=x.byteLength):Ge("WebGLRenderer: Unsupported uniform value type.",x),A}function v(x){const A=x.target;A.removeEventListener("dispose",v);const R=r.indexOf(A.__bindingPointIndex);r.splice(R,1),t.deleteBuffer(a[A.id]),delete a[A.id],delete s[A.id]}function S(){for(const x in a)t.deleteBuffer(a[x]);r=[],a={},s={}}return{bind:l,update:c,dispose:S}}const u3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let qi=null;function f3(){return qi===null&&(qi=new Ry(u3,16,16,Js,Ba),qi.name="DFG_LUT",qi.minFilter=Rn,qi.magFilter=Rn,qi.wrapS=wa,qi.wrapT=wa,qi.generateMipmaps=!1,qi.needsUpdate=!0),qi}class jy{constructor(e={}){const{canvas:n=UT(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:p=!1,reversedDepthBuffer:u=!1,outputBufferType:m=Ti}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const b=m,_=new Set([Zm,Ym,qm]),h=new Set([Ti,ia,Ol,Pl,jm,Xm]),v=new Uint32Array(4),S=new Int32Array(4),x=new Y;let A=null,R=null;const T=[],M=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ta,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let U=!1,O=null,k=null,P=null,z=null;this._outputColorSpace=vi;let B=0,I=0,L=null,V=-1,re=null;const ce=new Qt,_e=new Qt;let ke=null;const Je=new ct(0);let He=0,se=n.width,ge=n.height,he=1,Te=null,Ie=null;const W=new Qt(0,0,se,ge),De=new Qt(0,0,se,ge);let Be=!1;const je=new Ny;let qe=!1,Ze=!1;const xt=new Ht,dt=new Y,ut=new Qt,It={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let wt=!1;function Se(){return L===null?he:1}let H=i;function et(E,j){return n.getContext(E,j)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:p};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${km}`),n.addEventListener("webglcontextlost",Ke,!1),n.addEventListener("webglcontextrestored",gt,!1),n.addEventListener("webglcontextcreationerror",bt,!1),H===null){const j="webgl2";if(H=et(j,E),H===null)throw et(j)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw vt("WebGLRenderer: "+E.message),E}let Xe,N,y,X,Z,te,de,ve,ne,q,ie,fe,oe,pe,Re,Ue,Fe,G,me,D,F,le,Q;function xe(){Xe=new fC(H),Xe.init(),F=new n3(H,Xe),N=new iC(H,Xe,e,F),y=new e3(H,Xe),N.reversedDepthBuffer&&u&&y.buffers.depth.setReversed(!0),k=H.createFramebuffer(),P=H.createFramebuffer(),z=H.createFramebuffer(),X=new pC(H),Z=new HR,te=new t3(H,Xe,y,Z,N,F,X),de=new uC(w),ve=new _A(H),le=new tC(H,ve),ne=new dC(H,ve,X,le),q=new gC(H,ne,ve,le,X),G=new mC(H,N,te),Re=new aC(Z),ie=new FR(w,de,Xe,N,le,Re),fe=new l3(w,Z),oe=new kR,pe=new YR(Xe),Fe=new eC(w,de,y,q,g,l),Ue=new JR(w,q,N),Q=new c3(H,X,N,y),me=new nC(H,Xe,X),D=new hC(H,Xe,X),X.programs=ie.programs,w.capabilities=N,w.extensions=Xe,w.properties=Z,w.renderLists=oe,w.shadowMap=Ue,w.state=y,w.info=X}xe(),b!==Ti&&(C=new _C(b,n.width,n.height,o,a,s));const Me=new r3(w,H);this.xr=Me,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const E=Xe.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Xe.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return he},this.setPixelRatio=function(E){E!==void 0&&(he=E,this.setSize(se,ge,!1))},this.getSize=function(E){return E.set(se,ge)},this.setSize=function(E,j,ee=!0){if(Me.isPresenting){Ge("WebGLRenderer: Can't change size while VR device is presenting.");return}se=E,ge=j,n.width=Math.floor(E*he),n.height=Math.floor(j*he),ee===!0&&(n.style.width=E+"px",n.style.height=j+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,E,j)},this.getDrawingBufferSize=function(E){return E.set(se*he,ge*he).floor()},this.setDrawingBufferSize=function(E,j,ee){se=E,ge=j,he=ee,n.width=Math.floor(E*ee),n.height=Math.floor(j*ee),this.setViewport(0,0,E,j)},this.setEffects=function(E){if(b===Ti){vt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let j=0;j<E.length;j++)if(E[j].isOutputPass===!0){Ge("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(ce)},this.getViewport=function(E){return E.copy(W)},this.setViewport=function(E,j,ee,K){E.isVector4?W.set(E.x,E.y,E.z,E.w):W.set(E,j,ee,K),y.viewport(ce.copy(W).multiplyScalar(he).round())},this.getScissor=function(E){return E.copy(De)},this.setScissor=function(E,j,ee,K){E.isVector4?De.set(E.x,E.y,E.z,E.w):De.set(E,j,ee,K),y.scissor(_e.copy(De).multiplyScalar(he).round())},this.getScissorTest=function(){return Be},this.setScissorTest=function(E){y.setScissorTest(Be=E)},this.setOpaqueSort=function(E){Te=E},this.setTransparentSort=function(E){Ie=E},this.getClearColor=function(E){return E.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(E=!0,j=!0,ee=!0){let K=0;if(E){let $=!1;if(L!==null){const be=L.texture.format;$=_.has(be)}if($){const be=L.texture.type,Ae=h.has(be),ye=Fe.getClearColor(),Le=Fe.getClearAlpha(),Pe=ye.r,We=ye.g,tt=ye.b;Ae?(v[0]=Pe,v[1]=We,v[2]=tt,v[3]=Le,H.clearBufferuiv(H.COLOR,0,v)):(S[0]=Pe,S[1]=We,S[2]=tt,S[3]=Le,H.clearBufferiv(H.COLOR,0,S))}else K|=H.COLOR_BUFFER_BIT}j&&(K|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ee&&(K|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&H.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),O=E},this.dispose=function(){n.removeEventListener("webglcontextlost",Ke,!1),n.removeEventListener("webglcontextrestored",gt,!1),n.removeEventListener("webglcontextcreationerror",bt,!1),Fe.dispose(),oe.dispose(),pe.dispose(),Z.dispose(),de.dispose(),q.dispose(),le.dispose(),Q.dispose(),ie.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",ki),Me.removeEventListener("sessionend",ra),fi.stop()};function Ke(E){E.preventDefault(),Y0("WebGLRenderer: Context Lost."),U=!0}function gt(){Y0("WebGLRenderer: Context Restored."),U=!1;const E=X.autoReset,j=Ue.enabled,ee=Ue.autoUpdate,K=Ue.needsUpdate,$=Ue.type;xe(),X.autoReset=E,Ue.enabled=j,Ue.autoUpdate=ee,Ue.needsUpdate=K,Ue.type=$}function bt(E){vt("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Bt(E){const j=E.target;j.removeEventListener("dispose",Bt),ci(j)}function ci(E){ui(E),Z.remove(E)}function ui(E){const j=Z.get(E).programs;j!==void 0&&(j.forEach(function(ee){ie.releaseProgram(ee)}),E.isShaderMaterial&&ie.releaseShaderCache(E))}this.renderBufferDirect=function(E,j,ee,K,$,be){j===null&&(j=It);const Ae=$.isMesh&&$.matrixWorld.determinantAffine()<0,ye=Uo(E,j,ee,K,$);y.setMaterial(K,Ae);let Le=ee.index,Pe=1;if(K.wireframe===!0){if(Le=ne.getWireframeAttribute(ee),Le===void 0)return;Pe=2}const We=ee.drawRange,tt=ee.attributes.position;let Oe=We.start*Pe,_t=(We.start+We.count)*Pe;be!==null&&(Oe=Math.max(Oe,be.start*Pe),_t=Math.min(_t,(be.start+be.count)*Pe)),Le!==null?(Oe=Math.max(Oe,0),_t=Math.min(_t,Le.count)):tt!=null&&(Oe=Math.max(Oe,0),_t=Math.min(_t,tt.count));const kt=_t-Oe;if(kt<0||kt===1/0)return;le.setup($,K,ye,ee,Le);let Ct,Et=me;if(Le!==null&&(Ct=ve.get(Le),Et=D,Et.setIndex(Ct)),$.isMesh)K.wireframe===!0?(y.setLineWidth(K.wireframeLinewidth*Se()),Et.setMode(H.LINES)):Et.setMode(H.TRIANGLES);else if($.isLine){let hn=K.linewidth;hn===void 0&&(hn=1),y.setLineWidth(hn*Se()),$.isLineSegments?Et.setMode(H.LINES):$.isLineLoop?Et.setMode(H.LINE_LOOP):Et.setMode(H.LINE_STRIP)}else $.isPoints?Et.setMode(H.POINTS):$.isSprite&&Et.setMode(H.TRIANGLES);if($.isBatchedMesh)if(Xe.get("WEBGL_multi_draw"))Et.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{const hn=$._multiDrawStarts,we=$._multiDrawCounts,Un=$._multiDrawCount,rt=Le?ve.get(Le).bytesPerElement:1,Jt=Z.get(K).currentProgram.getUniforms();for(let Hn=0;Hn<Un;Hn++)Jt.setValue(H,"_gl_DrawID",Hn),Et.render(hn[Hn]/rt,we[Hn])}else if($.isInstancedMesh)Et.renderInstances(Oe,kt,$.count);else if(ee.isInstancedBufferGeometry){const hn=ee._maxInstanceCount!==void 0?ee._maxInstanceCount:1/0,we=Math.min(ee.instanceCount,hn);Et.renderInstances(Oe,kt,we)}else Et.render(Oe,kt)};function $t(E,j,ee){E.transparent===!0&&E.side===ba&&E.forceSinglePass===!1?(E.side=Yn,E.needsUpdate=!0,di(E,j,ee),E.side=Ms,E.needsUpdate=!0,di(E,j,ee),E.side=ba):di(E,j,ee)}this.compile=function(E,j,ee=null){ee===null&&(ee=E),R=pe.get(ee),R.init(j),M.push(R),ee.traverseVisible(function($){$.isLight&&$.layers.test(j.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),E!==ee&&E.traverseVisible(function($){$.isLight&&$.layers.test(j.layers)&&(R.pushLight($),$.castShadow&&R.pushShadow($))}),R.setupLights();const K=new Set;return E.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;const be=$.material;if(be)if(Array.isArray(be))for(let Ae=0;Ae<be.length;Ae++){const ye=be[Ae];$t(ye,ee,$),K.add(ye)}else $t(be,ee,$),K.add(be)}),R=M.pop(),K},this.compileAsync=function(E,j,ee=null){const K=this.compile(E,j,ee);return new Promise($=>{function be(){if(K.forEach(function(Ae){Z.get(Ae).currentProgram.isReady()&&K.delete(Ae)}),K.size===0){$(E);return}setTimeout(be,10)}Xe.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let Gt=null;function Dn(E){Gt&&Gt(E)}function ki(){fi.stop()}function ra(){fi.start()}const fi=new zy;fi.setAnimationLoop(Dn),typeof self<"u"&&fi.setContext(self),this.setAnimationLoop=function(E){Gt=E,Me.setAnimationLoop(E),E===null?fi.stop():fi.start()},Me.addEventListener("sessionstart",ki),Me.addEventListener("sessionend",ra),this.render=function(E,j){if(j!==void 0&&j.isCamera!==!0){vt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(U===!0)return;O!==null&&O.renderStart(E,j);const ee=Me.enabled===!0&&Me.isPresenting===!0,K=C!==null&&(L===null||ee)&&C.begin(w,L);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(j),j=Me.getCamera()),E.isScene===!0&&E.onBeforeRender(w,E,j,L),R=pe.get(E,M.length),R.init(j),R.state.textureUnits=te.getTextureUnits(),M.push(R),xt.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),je.setFromProjectionMatrix(xt,Ji,j.reversedDepth),Ze=this.localClippingEnabled,qe=Re.init(this.clippingPlanes,Ze),A=oe.get(E,T.length),A.init(),T.push(A),Me.enabled===!0&&Me.isPresenting===!0){const Ae=w.xr.getDepthSensingMesh();Ae!==null&&oa(Ae,j,-1/0,w.sortObjects)}oa(E,j,0,w.sortObjects),A.finish(),w.sortObjects===!0&&A.sort(Te,Ie,j.reversedDepth),wt=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,wt&&Fe.addToRenderList(A,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),qe===!0&&Re.beginShadows();const $=R.state.shadowsArray;if(Ue.render($,E,j),qe===!0&&Re.endShadows(),(K&&C.hasRenderPass())===!1){const Ae=A.opaque,ye=A.transmissive;if(R.setupLights(),j.isArrayCamera){const Le=j.cameras;if(ye.length>0)for(let Pe=0,We=Le.length;Pe<We;Pe++){const tt=Le[Pe];la(Ae,ye,E,tt)}wt&&Fe.render(E);for(let Pe=0,We=Le.length;Pe<We;Pe++){const tt=Le[Pe];Ts(A,E,tt,tt.viewport)}}else ye.length>0&&la(Ae,ye,E,j),wt&&Fe.render(E),Ts(A,E,j)}L!==null&&I===0&&(te.updateMultisampleRenderTarget(L),te.updateRenderTargetMipmap(L)),K&&C.end(w),E.isScene===!0&&E.onAfterRender(w,E,j),le.resetDefaultState(),V=-1,re=null,M.pop(),M.length>0?(R=M[M.length-1],te.setTextureUnits(R.state.textureUnits),qe===!0&&Re.setGlobalState(w.clippingPlanes,R.state.camera)):R=null,T.pop(),T.length>0?A=T[T.length-1]:A=null,O!==null&&O.renderEnd()};function oa(E,j,ee,K){if(E.visible===!1)return;if(E.layers.test(j.layers)){if(E.isGroup)ee=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(j);else if(E.isLightProbeGrid)R.pushLightProbeGrid(E);else if(E.isLight)R.pushLight(E),E.castShadow&&R.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||je.intersectsSprite(E)){K&&ut.setFromMatrixPosition(E.matrixWorld).applyMatrix4(xt);const Ae=q.update(E),ye=E.material;ye.visible&&A.push(E,Ae,ye,ee,ut.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||je.intersectsObject(E))){const Ae=q.update(E),ye=E.material;if(K&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),ut.copy(E.boundingSphere.center)):(Ae.boundingSphere===null&&Ae.computeBoundingSphere(),ut.copy(Ae.boundingSphere.center)),ut.applyMatrix4(E.matrixWorld).applyMatrix4(xt)),Array.isArray(ye)){const Le=Ae.groups;for(let Pe=0,We=Le.length;Pe<We;Pe++){const tt=Le[Pe],Oe=ye[tt.materialIndex];Oe&&Oe.visible&&A.push(E,Ae,Oe,ee,ut.z,tt)}}else ye.visible&&A.push(E,Ae,ye,ee,ut.z,null)}}const be=E.children;for(let Ae=0,ye=be.length;Ae<ye;Ae++)oa(be[Ae],j,ee,K)}function Ts(E,j,ee,K){const{opaque:$,transmissive:be,transparent:Ae}=E;R.setupLightsView(ee),qe===!0&&Re.setGlobalState(w.clippingPlanes,ee),K&&y.viewport(ce.copy(K)),$.length>0&&As($,j,ee),be.length>0&&As(be,j,ee),Ae.length>0&&As(Ae,j,ee),y.buffers.depth.setTest(!0),y.buffers.depth.setMask(!0),y.buffers.color.setMask(!0),y.setPolygonOffset(!1)}function la(E,j,ee,K){if((ee.isScene===!0?ee.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[K.id]===void 0){const Oe=Xe.has("EXT_color_buffer_half_float")||Xe.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[K.id]=new na(1,1,{generateMipmaps:!0,type:Oe?Ba:Ti,minFilter:Fs,samples:Math.max(4,N.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ht.workingColorSpace})}const be=R.state.transmissionRenderTarget[K.id],Ae=K.viewport||ce;be.setSize(Ae.z*w.transmissionResolutionScale,Ae.w*w.transmissionResolutionScale);const ye=w.getRenderTarget(),Le=w.getActiveCubeFace(),Pe=w.getActiveMipmapLevel();w.setRenderTarget(be),w.getClearColor(Je),He=w.getClearAlpha(),He<1&&w.setClearColor(16777215,.5),w.clear(),wt&&Fe.render(ee);const We=w.toneMapping;w.toneMapping=ta;const tt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),R.setupLightsView(K),qe===!0&&Re.setGlobalState(w.clippingPlanes,K),As(E,ee,K),te.updateMultisampleRenderTarget(be),te.updateRenderTargetMipmap(be),Xe.has("WEBGL_multisampled_render_to_texture")===!1){let Oe=!1;for(let _t=0,kt=j.length;_t<kt;_t++){const Ct=j[_t],{object:Et,geometry:hn,material:we,group:Un}=Ct;if(we.side===ba&&Et.layers.test(K.layers)){const rt=we.side;we.side=Yn,we.needsUpdate=!0,ca(Et,ee,K,hn,we,Un),we.side=rt,we.needsUpdate=!0,Oe=!0}}Oe===!0&&(te.updateMultisampleRenderTarget(be),te.updateRenderTargetMipmap(be))}w.setRenderTarget(ye,Le,Pe),w.setClearColor(Je,He),tt!==void 0&&(K.viewport=tt),w.toneMapping=We}function As(E,j,ee){const K=j.isScene===!0?j.overrideMaterial:null;for(let $=0,be=E.length;$<be;$++){const Ae=E[$],{object:ye,geometry:Le,group:Pe}=Ae;let We=Ae.material;We.allowOverride===!0&&K!==null&&(We=K),ye.layers.test(ee.layers)&&ca(ye,j,ee,Le,We,Pe)}}function ca(E,j,ee,K,$,be){E.onBeforeRender(w,j,ee,K,$,be),E.modelViewMatrix.multiplyMatrices(ee.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),$.onBeforeRender(w,j,ee,K,E,be),$.transparent===!0&&$.side===ba&&$.forceSinglePass===!1?($.side=Yn,$.needsUpdate=!0,w.renderBufferDirect(ee,j,K,$,E,be),$.side=Ms,$.needsUpdate=!0,w.renderBufferDirect(ee,j,K,$,E,be),$.side=ba):w.renderBufferDirect(ee,j,K,$,E,be),E.onAfterRender(w,j,ee,K,$,be)}function di(E,j,ee){j.isScene!==!0&&(j=It);const K=Z.get(E),$=R.state.lights,be=R.state.shadowsArray,Ae=$.state.version,ye=ie.getParameters(E,$.state,be,j,ee,R.state.lightProbeGridArray),Le=ie.getProgramCacheKey(ye);let Pe=K.programs;K.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?j.environment:null,K.fog=j.fog;const We=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;K.envMap=de.get(E.envMap||K.environment,We),K.envMapRotation=K.environment!==null&&E.envMap===null?j.environmentRotation:E.envMapRotation,Pe===void 0&&(E.addEventListener("dispose",Bt),Pe=new Map,K.programs=Pe);let tt=Pe.get(Le);if(tt!==void 0){if(K.currentProgram===tt&&K.lightsStateVersion===Ae)return Do(E,ye),tt}else ye.uniforms=ie.getUniforms(E),O!==null&&E.isNodeMaterial&&O.build(E,ee,ye),E.onBeforeCompile(ye,w),tt=ie.acquireProgram(ye,Le),Pe.set(Le,tt),K.uniforms=ye.uniforms;const Oe=K.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Oe.clippingPlanes=Re.uniform),Do(E,ye),K.needsLights=Jl(E),K.lightsStateVersion=Ae,K.needsLights&&(Oe.ambientLightColor.value=$.state.ambient,Oe.lightProbe.value=$.state.probe,Oe.directionalLights.value=$.state.directional,Oe.directionalLightShadows.value=$.state.directionalShadow,Oe.spotLights.value=$.state.spot,Oe.spotLightShadows.value=$.state.spotShadow,Oe.rectAreaLights.value=$.state.rectArea,Oe.ltc_1.value=$.state.rectAreaLTC1,Oe.ltc_2.value=$.state.rectAreaLTC2,Oe.pointLights.value=$.state.point,Oe.pointLightShadows.value=$.state.pointShadow,Oe.hemisphereLights.value=$.state.hemi,Oe.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Oe.spotLightMatrix.value=$.state.spotLightMatrix,Oe.spotLightMap.value=$.state.spotLightMap,Oe.pointShadowMatrix.value=$.state.pointShadowMatrix),K.lightProbeGrid=R.state.lightProbeGridArray.length>0,K.currentProgram=tt,K.uniformsList=null,tt}function Vi(E){if(E.uniformsList===null){const j=E.currentProgram.getUniforms();E.uniformsList=gu.seqWithValue(j.seq,E.uniforms)}return E.uniformsList}function Do(E,j){const ee=Z.get(E);ee.outputColorSpace=j.outputColorSpace,ee.batching=j.batching,ee.batchingColor=j.batchingColor,ee.instancing=j.instancing,ee.instancingColor=j.instancingColor,ee.instancingMorph=j.instancingMorph,ee.skinning=j.skinning,ee.morphTargets=j.morphTargets,ee.morphNormals=j.morphNormals,ee.morphColors=j.morphColors,ee.morphTargetsCount=j.morphTargetsCount,ee.numClippingPlanes=j.numClippingPlanes,ee.numIntersection=j.numClipIntersection,ee.vertexAlphas=j.vertexAlphas,ee.vertexTangents=j.vertexTangents,ee.toneMapping=j.toneMapping}function $l(E,j){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;x.setFromMatrixPosition(j.matrixWorld);for(let ee=0,K=E.length;ee<K;ee++){const $=E[ee];if($.texture!==null&&$.boundingBox.containsPoint(x))return $}return null}function Uo(E,j,ee,K,$){j.isScene!==!0&&(j=It),te.resetTextureUnits();const be=j.fog,Ae=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?j.environment:null,ye=L===null?w.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:ht.workingColorSpace,Le=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Pe=de.get(K.envMap||Ae,Le),We=K.vertexColors===!0&&!!ee.attributes.color&&ee.attributes.color.itemSize===4,tt=!!ee.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Oe=!!ee.morphAttributes.position,_t=!!ee.morphAttributes.normal,kt=!!ee.morphAttributes.color;let Ct=ta;K.toneMapped&&(L===null||L.isXRRenderTarget===!0)&&(Ct=w.toneMapping);const Et=ee.morphAttributes.position||ee.morphAttributes.normal||ee.morphAttributes.color,hn=Et!==void 0?Et.length:0,we=Z.get(K),Un=R.state.lights;if(qe===!0&&(Ze===!0||E!==re)){const Lt=E===re&&K.id===V;Re.setState(K,E,Lt)}let rt=!1;K.version===we.__version?(we.needsLights&&we.lightsStateVersion!==Un.state.version||we.outputColorSpace!==ye||$.isBatchedMesh&&we.batching===!1||!$.isBatchedMesh&&we.batching===!0||$.isBatchedMesh&&we.batchingColor===!0&&$.colorTexture===null||$.isBatchedMesh&&we.batchingColor===!1&&$.colorTexture!==null||$.isInstancedMesh&&we.instancing===!1||!$.isInstancedMesh&&we.instancing===!0||$.isSkinnedMesh&&we.skinning===!1||!$.isSkinnedMesh&&we.skinning===!0||$.isInstancedMesh&&we.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&we.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&we.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&we.instancingMorph===!1&&$.morphTexture!==null||we.envMap!==Pe||K.fog===!0&&we.fog!==be||we.numClippingPlanes!==void 0&&(we.numClippingPlanes!==Re.numPlanes||we.numIntersection!==Re.numIntersection)||we.vertexAlphas!==We||we.vertexTangents!==tt||we.morphTargets!==Oe||we.morphNormals!==_t||we.morphColors!==kt||we.toneMapping!==Ct||we.morphTargetsCount!==hn||!!we.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(rt=!0):(rt=!0,we.__version=K.version);let Jt=we.currentProgram;rt===!0&&(Jt=di(K,j,$),O&&K.isNodeMaterial&&O.onUpdateProgram(K,Jt,we));let Hn=!1,ji=!1,Gn=!1;const Tt=Jt.getUniforms(),Rt=we.uniforms;if(y.useProgram(Jt.program)&&(Hn=!0,ji=!0,Gn=!0),K.id!==V&&(V=K.id,ji=!0),we.needsLights){const Lt=$l(R.state.lightProbeGridArray,$);we.lightProbeGrid!==Lt&&(we.lightProbeGrid=Lt,ji=!0)}if(Hn||re!==E){y.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Tt.setValue(H,"projectionMatrix",E.projectionMatrix),Tt.setValue(H,"viewMatrix",E.matrixWorldInverse);const Ui=Tt.map.cameraPosition;Ui!==void 0&&Ui.setValue(H,dt.setFromMatrixPosition(E.matrixWorld)),N.logarithmicDepthBuffer&&Tt.setValue(H,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&Tt.setValue(H,"isOrthographic",E.isOrthographicCamera===!0),re!==E&&(re=E,ji=!0,Gn=!0)}if(we.needsLights&&(Un.state.directionalShadowMap.length>0&&Tt.setValue(H,"directionalShadowMap",Un.state.directionalShadowMap,te),Un.state.spotShadowMap.length>0&&Tt.setValue(H,"spotShadowMap",Un.state.spotShadowMap,te),Un.state.pointShadowMap.length>0&&Tt.setValue(H,"pointShadowMap",Un.state.pointShadowMap,te)),$.isSkinnedMesh){Tt.setOptional(H,$,"bindMatrix"),Tt.setOptional(H,$,"bindMatrixInverse");const Lt=$.skeleton;Lt&&(Lt.boneTexture===null&&Lt.computeBoneTexture(),Tt.setValue(H,"boneTexture",Lt.boneTexture,te))}$.isBatchedMesh&&(Tt.setOptional(H,$,"batchingTexture"),Tt.setValue(H,"batchingTexture",$._matricesTexture,te),Tt.setOptional(H,$,"batchingIdTexture"),Tt.setValue(H,"batchingIdTexture",$._indirectTexture,te),Tt.setOptional(H,$,"batchingColorTexture"),$._colorsTexture!==null&&Tt.setValue(H,"batchingColorTexture",$._colorsTexture,te));const Xi=ee.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&G.update($,ee,Jt),(ji||we.receiveShadow!==$.receiveShadow)&&(we.receiveShadow=$.receiveShadow,Tt.setValue(H,"receiveShadow",$.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&j.environment!==null&&(Rt.envMapIntensity.value=j.environmentIntensity),Rt.dfgLUT!==void 0&&(Rt.dfgLUT.value=f3()),ji){if(Tt.setValue(H,"toneMappingExposure",w.toneMappingExposure),we.needsLights&&ur(Rt,Gn),be&&K.fog===!0&&fe.refreshFogUniforms(Rt,be),fe.refreshMaterialUniforms(Rt,K,he,ge,R.state.transmissionRenderTarget[E.id]),we.needsLights&&we.lightProbeGrid){const Lt=we.lightProbeGrid;Rt.probesSH.value=Lt.texture,Rt.probesMin.value.copy(Lt.boundingBox.min),Rt.probesMax.value.copy(Lt.boundingBox.max),Rt.probesResolution.value.copy(Lt.resolution)}gu.upload(H,Vi(we),Rt,te)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(gu.upload(H,Vi(we),Rt,te),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&Tt.setValue(H,"center",$.center),Tt.setValue(H,"modelViewMatrix",$.modelViewMatrix),Tt.setValue(H,"normalMatrix",$.normalMatrix),Tt.setValue(H,"modelMatrix",$.matrixWorld),K.uniformsGroups!==void 0){const Lt=K.uniformsGroups;for(let Ui=0,hi=Lt.length;Ui<hi;Ui++){const Lo=Lt[Ui];Q.update(Lo,Jt),Q.bind(Lo,Jt)}}return Jt}function ur(E,j){E.ambientLightColor.needsUpdate=j,E.lightProbe.needsUpdate=j,E.directionalLights.needsUpdate=j,E.directionalLightShadows.needsUpdate=j,E.pointLights.needsUpdate=j,E.pointLightShadows.needsUpdate=j,E.spotLights.needsUpdate=j,E.spotLightShadows.needsUpdate=j,E.rectAreaLights.needsUpdate=j,E.hemisphereLights.needsUpdate=j}function Jl(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(E,j,ee){const K=Z.get(E);K.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),Z.get(E.texture).__webglTexture=j,Z.get(E.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:ee,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,j){const ee=Z.get(E);ee.__webglFramebuffer=j,ee.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(E,j=0,ee=0){L=E,B=j,I=ee;let K=null,$=!1,be=!1;if(E){const ye=Z.get(E);if(ye.__useDefaultFramebuffer!==void 0){y.bindFramebuffer(H.FRAMEBUFFER,ye.__webglFramebuffer),ce.copy(E.viewport),_e.copy(E.scissor),ke=E.scissorTest,y.viewport(ce),y.scissor(_e),y.setScissorTest(ke),V=-1;return}else if(ye.__webglFramebuffer===void 0)te.setupRenderTarget(E);else if(ye.__hasExternalTextures)te.rebindTextures(E,Z.get(E.texture).__webglTexture,Z.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const We=E.depthTexture;if(ye.__boundDepthTexture!==We){if(We!==null&&Z.has(We)&&(E.width!==We.image.width||E.height!==We.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");te.setupDepthRenderbuffer(E)}}const Le=E.texture;(Le.isData3DTexture||Le.isDataArrayTexture||Le.isCompressedArrayTexture)&&(be=!0);const Pe=Z.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[j])?K=Pe[j][ee]:K=Pe[j],$=!0):E.samples>0&&te.useMultisampledRTT(E)===!1?K=Z.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?K=Pe[ee]:K=Pe,ce.copy(E.viewport),_e.copy(E.scissor),ke=E.scissorTest}else ce.copy(W).multiplyScalar(he).floor(),_e.copy(De).multiplyScalar(he).floor(),ke=Be;if(ee!==0&&(K=k),y.bindFramebuffer(H.FRAMEBUFFER,K)&&y.drawBuffers(E,K),y.viewport(ce),y.scissor(_e),y.setScissorTest(ke),$){const ye=Z.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+j,ye.__webglTexture,ee)}else if(be){const ye=j;for(let Le=0;Le<E.textures.length;Le++){const Pe=Z.get(E.textures[Le]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+Le,Pe.__webglTexture,ee,ye)}}else if(E!==null&&ee!==0){const ye=Z.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ye.__webglTexture,ee)}V=-1},this.readRenderTargetPixels=function(E,j,ee,K,$,be,Ae,ye=0){if(!(E&&E.isWebGLRenderTarget)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Le=Z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ae!==void 0&&(Le=Le[Ae]),Le){y.bindFramebuffer(H.FRAMEBUFFER,Le);try{const Pe=E.textures[ye],We=Pe.format,tt=Pe.type;if(E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+ye),!N.textureFormatReadable(We)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!N.textureTypeReadable(tt)){vt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=E.width-K&&ee>=0&&ee<=E.height-$&&H.readPixels(j,ee,K,$,F.convert(We),F.convert(tt),be)}finally{const Pe=L!==null?Z.get(L).__webglFramebuffer:null;y.bindFramebuffer(H.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,j,ee,K,$,be,Ae,ye=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Le=Z.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ae!==void 0&&(Le=Le[Ae]),Le)if(j>=0&&j<=E.width-K&&ee>=0&&ee<=E.height-$){y.bindFramebuffer(H.FRAMEBUFFER,Le);const Pe=E.textures[ye],We=Pe.format,tt=Pe.type;if(E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+ye),!N.textureFormatReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!N.textureTypeReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Oe=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Oe),H.bufferData(H.PIXEL_PACK_BUFFER,be.byteLength,H.STREAM_READ),H.readPixels(j,ee,K,$,F.convert(We),F.convert(tt),0);const _t=L!==null?Z.get(L).__webglFramebuffer:null;y.bindFramebuffer(H.FRAMEBUFFER,_t);const kt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await LT(H,kt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Oe),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,be),H.deleteBuffer(Oe),H.deleteSync(kt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,j=null,ee=0){const K=Math.pow(2,-ee),$=Math.floor(E.image.width*K),be=Math.floor(E.image.height*K),Ae=j!==null?j.x:0,ye=j!==null?j.y:0;te.setTexture2D(E,0),H.copyTexSubImage2D(H.TEXTURE_2D,ee,0,0,Ae,ye,$,be),y.unbindTexture()},this.copyTextureToTexture=function(E,j,ee=null,K=null,$=0,be=0){let Ae,ye,Le,Pe,We,tt,Oe,_t,kt;const Ct=E.isCompressedTexture?E.mipmaps[be]:E.image;if(ee!==null)Ae=ee.max.x-ee.min.x,ye=ee.max.y-ee.min.y,Le=ee.isBox3?ee.max.z-ee.min.z:1,Pe=ee.min.x,We=ee.min.y,tt=ee.isBox3?ee.min.z:0;else{const Rt=Math.pow(2,-$);Ae=Math.floor(Ct.width*Rt),ye=Math.floor(Ct.height*Rt),E.isDataArrayTexture?Le=Ct.depth:E.isData3DTexture?Le=Math.floor(Ct.depth*Rt):Le=1,Pe=0,We=0,tt=0}K!==null?(Oe=K.x,_t=K.y,kt=K.z):(Oe=0,_t=0,kt=0);const Et=F.convert(j.format),hn=F.convert(j.type);let we;j.isData3DTexture?(te.setTexture3D(j,0),we=H.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(te.setTexture2DArray(j,0),we=H.TEXTURE_2D_ARRAY):(te.setTexture2D(j,0),we=H.TEXTURE_2D),y.activeTexture(H.TEXTURE0),y.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,j.flipY),y.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),y.pixelStorei(H.UNPACK_ALIGNMENT,j.unpackAlignment);const Un=y.getParameter(H.UNPACK_ROW_LENGTH),rt=y.getParameter(H.UNPACK_IMAGE_HEIGHT),Jt=y.getParameter(H.UNPACK_SKIP_PIXELS),Hn=y.getParameter(H.UNPACK_SKIP_ROWS),ji=y.getParameter(H.UNPACK_SKIP_IMAGES);y.pixelStorei(H.UNPACK_ROW_LENGTH,Ct.width),y.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ct.height),y.pixelStorei(H.UNPACK_SKIP_PIXELS,Pe),y.pixelStorei(H.UNPACK_SKIP_ROWS,We),y.pixelStorei(H.UNPACK_SKIP_IMAGES,tt);const Gn=E.isDataArrayTexture||E.isData3DTexture,Tt=j.isDataArrayTexture||j.isData3DTexture;if(E.isDepthTexture){const Rt=Z.get(E),Xi=Z.get(j),Lt=Z.get(Rt.__renderTarget),Ui=Z.get(Xi.__renderTarget);y.bindFramebuffer(H.READ_FRAMEBUFFER,Lt.__webglFramebuffer),y.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ui.__webglFramebuffer);for(let hi=0;hi<Le;hi++)Gn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Z.get(E).__webglTexture,$,tt+hi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Z.get(j).__webglTexture,be,kt+hi)),H.blitFramebuffer(Pe,We,Ae,ye,Oe,_t,Ae,ye,H.DEPTH_BUFFER_BIT,H.NEAREST);y.bindFramebuffer(H.READ_FRAMEBUFFER,null),y.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if($!==0||E.isRenderTargetTexture||Z.has(E)){const Rt=Z.get(E),Xi=Z.get(j);y.bindFramebuffer(H.READ_FRAMEBUFFER,P),y.bindFramebuffer(H.DRAW_FRAMEBUFFER,z);for(let Lt=0;Lt<Le;Lt++)Gn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Rt.__webglTexture,$,tt+Lt):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Rt.__webglTexture,$),Tt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Xi.__webglTexture,be,kt+Lt):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Xi.__webglTexture,be),$!==0?H.blitFramebuffer(Pe,We,Ae,ye,Oe,_t,Ae,ye,H.COLOR_BUFFER_BIT,H.NEAREST):Tt?H.copyTexSubImage3D(we,be,Oe,_t,kt+Lt,Pe,We,Ae,ye):H.copyTexSubImage2D(we,be,Oe,_t,Pe,We,Ae,ye);y.bindFramebuffer(H.READ_FRAMEBUFFER,null),y.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Tt?E.isDataTexture||E.isData3DTexture?H.texSubImage3D(we,be,Oe,_t,kt,Ae,ye,Le,Et,hn,Ct.data):j.isCompressedArrayTexture?H.compressedTexSubImage3D(we,be,Oe,_t,kt,Ae,ye,Le,Et,Ct.data):H.texSubImage3D(we,be,Oe,_t,kt,Ae,ye,Le,Et,hn,Ct):E.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,be,Oe,_t,Ae,ye,Et,hn,Ct.data):E.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,be,Oe,_t,Ct.width,Ct.height,Et,Ct.data):H.texSubImage2D(H.TEXTURE_2D,be,Oe,_t,Ae,ye,Et,hn,Ct);y.pixelStorei(H.UNPACK_ROW_LENGTH,Un),y.pixelStorei(H.UNPACK_IMAGE_HEIGHT,rt),y.pixelStorei(H.UNPACK_SKIP_PIXELS,Jt),y.pixelStorei(H.UNPACK_SKIP_ROWS,Hn),y.pixelStorei(H.UNPACK_SKIP_IMAGES,ji),be===0&&j.generateMipmaps&&H.generateMipmap(we),y.unbindTexture()},this.initRenderTarget=function(E){Z.get(E).__webglFramebuffer===void 0&&te.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?te.setTextureCube(E,0):E.isData3DTexture?te.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?te.setTexture2DArray(E,0):te.setTexture2D(E,0),y.unbindTexture()},this.resetState=function(){B=0,I=0,L=null,y.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ji}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=ht._getDrawingBufferColorSpace(e),n.unpackColorSpace=ht._getUnpackColorSpace()}}function d3(t,e=300){if(!t||!Array.isArray(t.nodes)||!Array.isArray(t.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=t.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,e),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,d,p,u;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((d=l.properties)==null?void 0:d.filePath)||(l.uri&&l.uri.startsWith("file://")?l.uri.replace(/^file:\/\//,""):l.uri&&l.uri.startsWith("symbol://")?l.uri.replace(/^symbol:\/\//,"").split("#")[0]:l.uri)||"",line:((p=l.properties)==null?void 0:p.line)||null,status:((u=l.properties)==null?void 0:u.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:t.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:t.edges.length}}function h3(t){const{CLUSTERS:e,NODES:n,EDGES:i,META:a}=d3(t);let s="dark";for(const w of e)w.color=w[s];const r=Object.fromEntries(e.map(w=>[w.id,w])),o=n.map(([w,U,O,k],P)=>({i:P,id:w,name:a[w].label,cid:U,w:O,desc:k,cluster:r[U],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(w=>[w.id,w]));for(const w of o)w.meta=a[w.id]||{};const c=[];for(const[w,U,O]of i){const k=l[w],P=l[U];if(!k||!P){console.warn("[atlas] Dropped invalid edge:",w,"→",U);continue}c.push({s:k,t:P,kind:O,i:c.length,alpha:1}),O==="pre"?(k.out.push(P),P.in.push(k)):(k.rel.push(P),P.rel.push(k))}const d=w=>w.out.length+w.in.length+w.rel.length,p=o.map(()=>[]);for(const w of c)p[w.s.i].push(w.t.i),p[w.t.i].push(w.s.i);const u=42;for(const w of e){const[U,O,k]=w.anchor,P=Math.hypot(U,O,k)||1;w.dir=[U/P,O/P,k/P]}const m=new Array(o.length).fill(-1);(function(){let U=!0,O=0;for(const k of o)k.in.length||(m[k.i]=0);for(;U&&O++<40;){U=!1;for(const k of o){let P=k.in.length?-1:0;for(const z of k.in)m[z.i]>=0&&(P=Math.max(P,m[z.i]+1));P>=0&&P!==m[k.i]&&(m[k.i]=P,U=!0)}}for(let k=0;k<m.length;k++)m[k]<0&&(m[k]=2)})();const g=Math.max(1,...m),b={atlas:[],shell:[],tier:[]};o.forEach((w,U)=>{const O=w.cluster.dir,k=1-Math.min(d(w),12)/26;b.atlas.push([O[0]*u*k,O[1]*u*k,O[2]*u*k]);const P=e.indexOf(w.cluster),z=o.filter(V=>V.cid===w.cid).indexOf(w),B=o.filter(V=>V.cid===w.cid).length,I=(P/e.length+z/B/e.length)*Math.PI*2,L=(z/B-.5)*1.5;b.shell.push([u*.95*Math.cos(L)*Math.cos(I),u*.95*Math.sin(L),u*.95*Math.cos(L)*Math.sin(I)]),b.tier.push([O[0]*u*.72,(m[U]/g-.5)*u*1.5,O[2]*u*.72])});let _="atlas";o.forEach((w,U)=>{const O=b.atlas[U];w.x=O[0]+(Math.random()-.5)*16,w.y=O[1]+(Math.random()-.5)*16,w.z=O[2]+(Math.random()-.5)*16});let h=1;const v=9,S=.04,x=130,A=.05;function R(){if(h<.004)return;const w=b[_];for(let U=0;U<o.length;U++){const O=o[U];for(let k=U+1;k<o.length;k++){const P=o[k];let z=O.x-P.x,B=O.y-P.y,I=O.z-P.z,L=z*z+B*B+I*I+.6;const V=x/L,re=Math.sqrt(L);z/=re,B/=re,I/=re,O.vx+=z*V,O.vy+=B*V,O.vz+=I*V,P.vx-=z*V,P.vy-=B*V,P.vz-=I*V}}for(const U of c){const O=U.s,k=U.t;let P=k.x-O.x,z=k.y-O.y,B=k.z-O.z;const I=Math.hypot(P,z,B)||1,L=(I-v)*S;P/=I,z/=I,B/=I,O.vx+=P*L,O.vy+=z*L,O.vz+=B*L,k.vx-=P*L,k.vy-=z*L,k.vz-=B*L}for(let U=0;U<o.length;U++){const O=o[U],k=w[U];O.vx+=(k[0]-O.x)*A,O.vy+=(k[1]-O.y)*A,O.vz+=(k[2]-O.z)*A;const P=.82;O.vx*=P,O.vy*=P,O.vz*=P,O.x+=O.vx*h,O.y+=O.vy*h,O.z+=O.vz*h}h*=.988}for(let w=0;w<220;w++)R();const T=46;function M(){let w=0;for(const U of o)w=Math.max(w,Math.hypot(U.x,U.y,U.z));return Math.max(10,w)/Math.sin(T*Math.PI/360)*.88}function C({els:w,emit:U}){const O=new AbortController,{signal:k}=O,P=(et,Xe,N,y)=>et.addEventListener(Xe,N,{...y,signal:k});let z=0;const{stage:B}=w;let I,L,V,re,ce,_e,ke=!0;try{I=new jy({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{ke=!1}if(I||(ke=!1),!ke)return U.gate(!0),{dispose(){}};{let As=function(ae,ze){const Ce=q.uniforms.uPx.value;for(const Ne of o){la.set(Ne.x,Ne.y,Ne.z);const it=V.position.distanceTo(la);la.project(V),Ne.sx=(la.x*.5+.5)*ae,Ne.sy=(-la.y*.5+.5)*ze,Ne.sz=la.z,Ne.sr=Ne.size*Ne.scale*Ce/Math.max(it,1)*.5}},$l=function(){ca.fill(1),di.fill(1),Vi.fill(1);const ae=Do,ze=Ce=>!ae||Ce.name.toLowerCase().includes(ae)||Ce.desc.toLowerCase().includes(ae)||(Ce.meta.path||"").toLowerCase().includes(ae)||(Ce.meta.kind||"").toLowerCase().includes(ae);for(const Ce of o)Ce.vis=!oa.has(Ce.cid)&&ze(Ce),Ce.vis||(ca[Ce.i]=0,di[Ce.i]=.6);for(const Ce of c)(!Ce.s.vis||!Ce.t.vis)&&(Vi[Ce.i]=0);if(Dn){for(const Ce of o)Ce.vis&&(ca[Ce.i]=Dn.has(Ce.i)?1:Ts,di[Ce.i]=Dn.has(Ce.i)?1.25:.8);for(const Ce of c)Vi[Ce.i]&&(Vi[Ce.i]=Dn.has(Ce.s.i)&&Dn.has(Ce.t.i)?1.35:Ts*.5)}else if(Gt){const Ce=new Set([Gt.i,...p[Gt.i]]);for(const Ne of o)Ne.vis&&(ca[Ne.i]=Ce.has(Ne.i)?1:Ts,di[Ne.i]=Ne===Gt?1.75:Ce.has(Ne.i)?1.15:.75);for(const Ne of c)Vi[Ne.i]&&(Vi[Ne.i]=Ne.s===Gt||Ne.t===Gt?1.4:Ts*.45)}return $t&&$t.vis&&(ca[$t.i]=1,di[$t.i]=Math.max(di[$t.i],1.6)),{nT:ca,sT:di,eT:Vi}},Uo=function(ae){Gt=ae,Dn=null,w.pathbar.classList.remove("on"),F.tx=ae.x,F.ty=ae.y,F.tz=ae.z,F.tDist=Math.min(F.tDist,D*.72),hi(ae),Rt(),Gn()},ur=function(){Gt=null,Dn=null,F.tx=F.ty=F.tz=0,w.pathbar.classList.remove("on"),hi(null),Rt(),Gn()},Jl=function(ae,ze){const Ce=new Array(o.length).fill(-1),Ne=new Set([ae.i]),it=[ae.i];for(;it.length;){const pi=it.shift();if(pi===ze.i)break;for(const pn of p[pi])!Ne.has(pn)&&o[pn].vis&&(Ne.add(pn),Ce[pn]=pi,it.push(pn))}if(!Ne.has(ze.i)){w.chain.textContent="Keine Kausalkette zwischen diesen Objekten",w.pathbar.classList.add("on");return}const Ln=[];let at=ze.i;for(;at!==-1&&(Ln.unshift(at),at!==ae.i);)at=Ce[at];Dn=new Set(Ln),w.chain.textContent=Ln.map(pi=>o[pi].name).join(" → "),w.pathbar.classList.add("on"),Gn()},E=function(){Dn=null,w.pathbar.classList.remove("on"),Gn()},be=function(ae,ze){let Ce=0;const Ne=new Set;ra&&$.forEach(at=>Ne.add(at)),Gt&&(Ne.add(Gt.i),p[Gt.i].forEach(at=>Ne.add(at))),Dn&&Dn.forEach(at=>Ne.add(at)),$t&&Ne.add($t.i);const it=[...Ne].map(at=>o[at]).filter(at=>at.vis&&at.sz<1&&at.sx>-60&&at.sx<ae+60&&at.sy>-20&&at.sy<ze+20).sort((at,pi)=>at.sz-pi.sz),Ln=[];for(const at of it){if(Ce>=K.length)break;const pi=at.name.length*11.5+8,pn=[at.sx-pi/2,at.sy-18,pi,16];if(Ln.some(en=>pn[0]<en[0]+en[2]&&pn[0]+pn[2]>en[0]&&pn[1]<en[1]+en[3]&&pn[1]+pn[3]>en[1]))continue;Ln.push(pn);const Qe=K[Ce++];Qe.textContent=at.name,Qe.className="lab"+(at===$t||at===Gt?"":" sm"),Qe.style.transform=`translate(-50%,-50%) translate(${at.sx.toFixed(1)}px,${(at.sy-17).toFixed(1)}px)`,Qe.style.opacity=Math.min(1,at.alpha*1.3),Qe.style.color=at===$t||at===Gt?at.cluster.color:""}for(;Ce<K.length;Ce++)K[Ce].style.opacity=0},kt=function(ae){z=requestAnimationFrame(kt);const ze=Math.min(.05,(ae-Ae)/1e3);Ae=ae;const Ce=B.clientWidth,Ne=B.clientHeight;if(!Ce||!Ne)return;I.domElement.width!==Math.round(Ce*I.getPixelRatio())&&(I.setSize(Ce,Ne,!1),V.aspect=Ce/Ne,V.updateProjectionMatrix(),ne.uniforms.uPx.value=q.uniforms.uPx.value=Ne/(2*Math.tan(V.fov*Math.PI/360))),R(),ki&&(F.tTheta+=ze*.09);const it=1-Math.pow(.0016,ze);if(F.theta+=(F.tTheta-F.theta)*it,F.phi+=(F.tPhi-F.phi)*it,F.dist+=(F.tDist-F.dist)*it,F.cx+=(F.tx-F.cx)*it,F.cy+=(F.ty-F.cy)*it,F.cz+=(F.tz-F.cz)*it,V.position.set(F.cx+F.dist*Math.sin(F.phi)*Math.cos(F.theta),F.cy+F.dist*Math.cos(F.phi),F.cz+F.dist*Math.sin(F.phi)*Math.sin(F.theta)),V.lookAt(F.cx,F.cy,F.cz),As(Ce,Ne),ui.live&&!le){let Qe=null;for(const en of o){if(!en.vis||en.sz>1)continue;const cg=en.sx-ui.x,ug=en.sy-ui.y,fg=en.sr+7;cg*cg+ug*ug>fg*fg||(!Qe||en.sz<Qe.sz)&&(Qe=en)}Qe!==$t&&($t=Qe,Ke.style.cursor=Qe?"pointer":"grab",Gn())}const{nT:Ln,sT:at,eT:pi}=$l(),pn=1-Math.pow(.002,ze);for(const Qe of o)Qe.alpha+=(Ln[Qe.i]-Qe.alpha)*pn,Qe.scale+=(at[Qe.i]-Qe.scale)*pn,Pe.array[Qe.i*3]=Qe.x,Pe.array[Qe.i*3+1]=Qe.y,Pe.array[Qe.i*3+2]=Qe.z,We.array[Qe.i]=Qe.alpha,tt.array[Qe.i]=Qe.scale;Pe.needsUpdate=We.needsUpdate=tt.needsUpdate=!0;for(const Qe of c){Qe.alpha+=(pi[Qe.i]-Qe.alpha)*pn;const en=Qe.i*6;Oe.array[en]=Qe.s.x,Oe.array[en+1]=Qe.s.y,Oe.array[en+2]=Qe.s.z,Oe.array[en+3]=Qe.t.x,Oe.array[en+4]=Qe.t.y,Oe.array[en+5]=Qe.t.z,_t.array[Qe.i*2]=_t.array[Qe.i*2+1]=Qe.alpha}Oe.needsUpdate=_t.needsUpdate=!0,me.uniforms.uTime.value=ae/1e3,me.uniforms.uFlow.value+=((fi?1:0)-me.uniforms.uFlow.value)*pn,be(Ce,Ne),I.render(L,V),ye+=1/Math.max(ze,1e-4),Le++,Le>=30&&(w.sFps.textContent=Math.round(ye/Le),ye=Le=0)},Ct=function(ae=.55){h=Math.max(h,ae)},Et=function(ae){_=ae,w.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[_],Ct(1)},rt=function(){F.tTheta=.7,F.tPhi=1.15,F.tDist=M(),ur(),Ct(.8),bt()},Jt=function(){U.tools({flow:fi,label:ra,spin:ki})},Hn=function(ae){s=ae,document.documentElement.dataset.theme=ae,U.theme(ae);const ze=ae==="light";for(const it of e)it.color=it[ae];o.forEach((it,Ln)=>{const at=et(it.cluster.color);y[Ln*3]=at[0],y[Ln*3+1]=at[1],y[Ln*3+2]=at[2]}),de.getAttribute("aColor").needsUpdate=!0,c.forEach((it,Ln)=>{oe.set(et(it.s.cluster.color),Ln*6),oe.set(et(it.t.cluster.color),Ln*6+3)}),G.getAttribute("aColor").needsUpdate=!0;const Ce=ze?Ws:Xr;for(const it of[ne,q,me])it.uniforms.uLight.value=ze?1:0,it.blending=Ce,it.needsUpdate=!0;const Ne=ze?16053489:328967;I.setClearColor(Ne,1),L.fog.color.setHex(Ne),L.fog.density=ze?.0042:.0068,Rt(),Gt&&hi(Gt)},Gn=function(){w.hudSel.textContent=Dn?`Kausalkette · ${Dn.size} Stationen`:Gt?Gt.name:$t?$t.name:"Nichts ausgewählt"},Tt=function(ae){oa.has(ae)?oa.delete(ae):oa.add(ae),Rt(),Ct(.4)},Rt=function(){const ae=w.q.value.trim().toLowerCase(),ze=o.filter(Ne=>!oa.has(Ne.cid)&&(!ae||Ne.name.toLowerCase().includes(ae)||Ne.desc.toLowerCase().includes(ae))).sort((Ne,it)=>d(it)-d(Ne));U.list({q:ae,rows:ze.map(Ne=>({i:Ne.i,name:Ne.name,color:Ne.cluster.color,deg:d(Ne),on:Ne===Gt}))}),w.sNode.textContent=ze.length;const Ce=c.filter(Ne=>ze.includes(Ne.s)&&ze.includes(Ne.t)).length;w.sEdge.textContent=Ce,w.sDeg.textContent=ze.length?(Ce*2/ze.length).toFixed(1):"0"},Ui=function(ae){Do=ae.trim().toLowerCase(),Rt(),Ct(.25)},hi=function(ae){U.drawer(ae&&{i:ae.i,name:ae.name,desc:ae.desc,cname:ae.cluster.name,color:ae.cluster.color,deg:d(ae),depth:m[ae.i],kind:ae.meta.kind||"",path:ae.meta.path||"",line:ae.meta.line||null,status:ae.meta.status||"",prov:ae.meta.prov||"",groups:[["Ursache · eingehend",ae.in,"IN"],["Wirkung · ausgehend",ae.out,"OUT"],["Assoziiert · Backlinks",ae.rel,"REL"]].filter(([,ze])=>ze.length).map(([ze,Ce,Ne])=>({title:ze,tag:Ne,items:Ce.map(it=>({i:it.i,name:it.name,color:it.cluster.color}))}))})},Lo=function(ae){const ze=o[ae],Ce=b[_],Ne=Ce[ze.i].slice();for(let it=0;it<Ce.length;it++)Ce[it][0]-=Ne[0],Ce[it][1]-=Ne[1],Ce[it][2]-=Ne[2];F.tx=F.ty=F.tz=0,Ct(1)},lg=function(ae){const ze=o[ae];w.chain.textContent="Start bei "+ze.name+" — Shift+Klick auf das Zielobjekt",w.pathbar.classList.add("on")};var Je=As,He=$l,se=Uo,ge=ur,he=Jl,Te=E,Ie=be,W=kt,De=Ct,Be=Et,je=rt,qe=Jt,Ze=Hn,xt=Gn,dt=Tt,ut=Rt,It=Ui,wt=hi,Se=Lo,H=lg;I.setPixelRatio(Math.min(devicePixelRatio,2)),B.appendChild(I.domElement),L=new Ty,L.fog=new Jm(328967,.0068),V=new yi(T,1,1,1400);const et=ae=>{const ze=new ct(ae);return[ze.r,ze.g,ze.b]},Xe=o.length,N=new Float32Array(Xe*3),y=new Float32Array(Xe*3),X=new Float32Array(Xe),Z=new Float32Array(Xe),te=new Float32Array(Xe);o.forEach((ae,ze)=>{const Ce=et(ae.cluster.color);y[ze*3]=Ce[0],y[ze*3+1]=Ce[1],y[ze*3+2]=Ce[2],X[ze]=ae.size=.95+ae.w*.4,Z[ze]=1,te[ze]=1});const de=new Nn;de.setAttribute("position",new At(N,3)),de.setAttribute("aColor",new At(y,3)),de.setAttribute("aSize",new At(X,1)),de.setAttribute("aAlpha",new At(Z,1)),de.setAttribute("aScale",new At(te,1));const ve=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,ne=new Tn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:ve,fragmentShader:`
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
      }`,transparent:!0,blending:Xr,depthWrite:!1}),q=new Tn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:ve,fragmentShader:`
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
      }`,transparent:!0,blending:Xr,depthWrite:!1});re=new Op(de,ne),ce=new Op(de,q),re.frustumCulled=!1,ce.frustumCulled=!1,L.add(re,ce);const ie=c.length,fe=new Float32Array(ie*6),oe=new Float32Array(ie*6),pe=new Float32Array(ie*2),Re=new Float32Array(ie*2),Ue=new Float32Array(ie*2),Fe=new Float32Array(ie*2);c.forEach((ae,ze)=>{const Ce=et(ae.s.cluster.color),Ne=et(ae.t.cluster.color);oe.set(Ce,ze*6),oe.set(Ne,ze*6+3),pe[ze*2]=0,pe[ze*2+1]=1;const it=ze*.6180339887%1;Re[ze*2]=it,Re[ze*2+1]=it,Ue[ze*2]=Ue[ze*2+1]=1,Fe[ze*2]=Fe[ze*2+1]=ae.kind==="pre"?1:0});const G=new Nn;G.setAttribute("position",new At(fe,3)),G.setAttribute("aColor",new At(oe,3)),G.setAttribute("aT",new At(pe,1)),G.setAttribute("aSeed",new At(Re,1)),G.setAttribute("aAlpha",new At(Ue,1)),G.setAttribute("aDir",new At(Fe,1));const me=new Tn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:Xr,depthWrite:!1});_e=new mu(G,me),_e.frustumCulled=!1,L.add(_e);const D=M(),F={theta:.7,phi:1.15,dist:D,tTheta:.7,tPhi:1.15,tDist:D,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let le=!1,Q=0,xe=0,Me=0;const Ke=I.domElement;P(Ke,"pointerdown",ae=>{le=!0,Me=0,Q=ae.clientX,xe=ae.clientY,Ke.setPointerCapture(ae.pointerId)}),P(Ke,"pointerup",ae=>{le=!1,Ke.releasePointerCapture(ae.pointerId)}),P(Ke,"pointermove",ae=>{const ze=Ke.getBoundingClientRect();if(ui.x=ae.clientX-ze.left,ui.y=ae.clientY-ze.top,ui.live=!0,!le)return;const Ce=ae.clientX-Q,Ne=ae.clientY-xe;Me+=Math.abs(Ce)+Math.abs(Ne),Q=ae.clientX,xe=ae.clientY,F.tTheta-=Ce*.0052,F.tPhi=Math.max(.12,Math.min(Math.PI-.12,F.tPhi-Ne*.0052)),ki=!1,Jt()}),P(Ke,"pointerleave",()=>{ui.live=!1});const gt=w.zlvl,bt=()=>{gt.textContent=Math.round(D/F.tDist*100)+"%"},Bt=ae=>{F.tDist=Math.max(D*.22,Math.min(D*2.6,F.tDist*ae)),bt()};P(Ke,"wheel",ae=>{ae.preventDefault(),Bt(1+Math.sign(ae.deltaY)*.11)},{passive:!1});const ci=()=>{F.tDist=D,bt()};bt();const ui={x:-1,y:-1,live:!1};let $t=null,Gt=null,Dn=null,ki=!0,ra=!0,fi=!0;const oa=new Set,Ts=.12,la=new Y;P(Ke,"click",ae=>{if(!(Me>5)){if(!$t){ae.shiftKey||ur();return}if(ae.shiftKey&&Gt&&$t!==Gt){Jl(Gt,$t);return}Uo($t)}});const ca=new Float32Array(o.length),di=new Float32Array(o.length),Vi=new Float32Array(c.length);let Do="";const j=w.labels,ee=14,K=Array.from({length:44},()=>{const ae=document.createElement("div");return ae.className="lab",ae.style.opacity=0,j.appendChild(ae),ae}),$=[...o].sort((ae,ze)=>d(ze)-d(ae)).slice(0,ee).map(ae=>ae.i);let Ae=performance.now(),ye=0,Le=0;const Pe=de.getAttribute("position"),We=de.getAttribute("aAlpha"),tt=de.getAttribute("aScale"),Oe=G.getAttribute("position"),_t=G.getAttribute("aAlpha");z=requestAnimationFrame(kt);const hn=()=>{fi=!fi,Jt()},we=()=>{ra=!ra,Jt()},Un=()=>{ki=!ki,Jt()},ji=()=>Hn(s==="light"?"dark":"light");P(window,"keydown",ae=>{if(/^(INPUT|TEXTAREA)$/.test(ae.target.tagName)){ae.key==="Escape"&&ae.target.blur();return}ae.key==="Escape"?ur():ae.key==="l"||ae.key==="L"?(ra=!ra,Jt()):ae.key==="r"||ae.key==="R"?rt():ae.key===" "?(ae.preventDefault(),ki=!ki,Jt()):ae.key==="/"?(ae.preventDefault(),w.q.focus()):ae.key==="="||ae.key==="+"?Bt(1/1.18):(ae.key==="-"||ae.key==="_")&&Bt(1.18)});const Xi=ae=>Uo(o[ae]),Lt=ae=>{$t=ae===null?null:o[ae]};return Hn(s),Rt(),hi(null),Jt(),Gn(),{setView:Et,toggleFlow:hn,toggleLabel:we,toggleSpin:Un,reset:rt,toggleTheme:ji,dolly:Bt,zoomReset:ci,toggleCluster:Tt,selectAt:Xi,hoverAt:Lt,setQuery:Ui,clearPath:E,centerOn:Lo,startPath:lg,dispose(){O.abort(),cancelAnimationFrame(z),de.dispose(),G.dispose(),ne.dispose(),q.dispose(),me.dispose(),I.dispose(),Ke.remove(),w.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:o,edges:c,deg:d,createAtlas:C}}function Xy(t){if(typeof t!="string"||t==="")return t;const e=t.split(/[\\/]/).filter(Boolean);return e.length>0?e[e.length-1]:t}const Wy="plugbrain.workspace";function p3(){try{return localStorage.getItem(Wy)||""}catch{return""}}function m3(t){try{localStorage.setItem(Wy,t)}catch{}}async function Wv(){const t=await fetch("/api/galaxy");if(!t.ok)throw new Error(`Galaxie: HTTP ${t.status}`);const e=await t.json();if(!(e!=null&&e.ok)||!Array.isArray(e.planets))throw new Error("Die Galaxie antwortet unvollständig.");return e.planets}function qv(t){if(typeof t!="string")return"";const e=t.trim();if(e==="")return"";if(/^[a-zA-Z]:[\\/]/.test(e)||/^[\\/]{2}/.test(e)){const i=e.replace(/\\/g,"/"),a=i.startsWith("//")?`//${i.slice(2).replace(/\/{2,}/g,"/")}`:i.replace(/\/{2,}/g,"/");return(a==="//"||/^[a-zA-Z]:\/$/.test(a)?a:a.replace(/\/+$/,"")).toLowerCase()}return e==="/"?e:e.replace(/\/+$/,"")}function g3(t,e){var i;const n=qv(e);return!n||!Array.isArray(t)?"":((i=t.find(a=>typeof(a==null?void 0:a.id)=="string"&&qv(a.root)===n))==null?void 0:i.id)??""}async function v3(t,e,n){var s;const i=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:t,name:e})});if(!i.ok){const r=await i.json().catch(()=>null);throw new Error((r==null?void 0:r.error)??`Registrieren: HTTP ${i.status}`)}const a=await i.json();if(!(a!=null&&a.ok)||!((s=a.workspace)!=null&&s.id))throw new Error("Registrieren: unvollständige Antwort.");return await qy(a.workspace.id,n),a.workspace.id}function Ip(t){var r,o,l;const e=t==null?void 0:t.run;if(!e)return"Kein Indexlauf bekannt.";if(t.stale)return t.ownerAlive&&!t.recoverable?"Indexlauf ohne neuen Fortschritt; der Owner-Prozess läuft noch. Die Sperre bleibt geschützt.":"Indexlauf ohne neuen Fortschritt; der frühere Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.";const n=Math.max(0,Math.round((Date.now()-Date.parse(e.startedAt))/1e3)),i={starting:"startet",scan:"sammelt Dateien",classify:"vergleicht",write:"schreibt",resolve:"verknüpft",publish:"veröffentlicht",done:"fertig",failed:"fehlgeschlagen"}[e.phase]??e.phase;if(e.finishedAt)return e.ok?`Fertig: ${((r=e.result)==null?void 0:r.files)??e.scanned} Dateien, ${((o=e.result)==null?void 0:o.symbols)??0} Symbole, ${((l=e.result)==null?void 0:l.edges)??0} Kanten in ${n} s.`:`Indexlauf fehlgeschlagen: ${e.error??"unbekannter Grund"}`;const a=e.total>0?`/${e.total}`:"",s=e.total>0?` (${Math.round(e.processed/e.total*100)} %)`:"";return`Indexiert: ${i} ${e.processed}${a}${s} — ${n} s`}function _3(t,e){return t!=null&&t.running||t!=null&&t.stale?Ip(t):e.startsWith("Indexiert:")||e.startsWith("Indexlauf ohne neuen Fortschritt;")?"":e}async function x3(t){const e=await fetch(`/api/index/progress?workspace=${encodeURIComponent(t)}`);return e.ok?e.json():null}const S3=t=>new Promise(e=>setTimeout(e,t));async function y3(t,e){for(;;){await S3(900);const n=await x3(t);if(n===null)throw new Error("Der Fortschritt ist nicht abrufbar.");if(e==null||e(n),n.running)continue;if(n.stale)throw n.ownerAlive&&!n.recoverable?new Error("Der Indexlauf meldet keinen neuen Fortschritt, aber der Owner-Prozess läuft noch. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):new Error("Der Indexlauf ist verstummt und sein Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.");const i=n.run;if(!i)throw new Error("Kein Indexlauf bekannt.");if(i.ok)return i.result;throw new Error(i.error??"Indexlauf fehlgeschlagen.")}}async function qy(t,e){const n=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:t})}),i=await n.json().catch(()=>null);if(n.status===409&&(i!=null&&i.busy))throw i.ownerAlive&&!i.recoverable?new Error("Ein stiller Indexlauf gehört noch einem lebenden Owner-Prozess. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):i.recoverable?new Error("Der vorherige Index-Owner ist nicht mehr aktiv. Der Lauf kann erneut gestartet werden."):new Error(i.error??"Ein Indexlauf ist bereits unterwegs.");if(!n.ok)throw new Error(`Indizieren: HTTP ${n.status}`);if(!(i!=null&&i.ok))throw new Error("Indizieren: unvollständige Antwort.");return i.result!==void 0&&i.result!==null?i.result:y3(t,e)}const Yy="plugbrain.auth_token",Bp="plugbrain.agent_id";function M3(){var t,e;try{return((e=(t=window.__PLUGBRAIN__)==null?void 0:t.token)==null?void 0:e.trim())??""}catch{return""}}function Zy(){var n,i;let t="";try{t=((n=new URLSearchParams(window.location.search).get("token"))==null?void 0:n.trim())??""}catch{}if(t)return Ky(t),t;const e=M3();if(e)return e;try{return((i=localStorage.getItem(Yy))==null?void 0:i.trim())??""}catch{return""}}function Ky(t){try{localStorage.setItem(Yy,t)}catch{}}function Gi(){try{const t=new URLSearchParams(window.location.search).get("agent");return t?(localStorage.setItem(Bp,t),t):localStorage.getItem(Bp)||"agy"}catch{return"agy"}}function b3(t){try{localStorage.setItem(Bp,t)}catch{}}function Ga(){const t=Zy(),e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["x-plug-auth-token"]=t),e}async function E3(t){const e=await fetch(`/api/planet?workspace=${encodeURIComponent(t)}`);if(!e.ok){const i=await e.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Planet inventory HTTP ${e.status}`)}const n=await e.json();if(!(n!=null&&n.ok)||!n.planet||!Array.isArray(n.planet.checkouts))throw new Error("Planet-Inventar unvollständig");return n.planet}async function T3(t,e){const n=await fetch("/api/planet/selection",{method:"POST",headers:Ga(),body:JSON.stringify({workspace:t,checkoutIds:e})}),i=await n.json().catch(()=>null);if(!n.ok||!(i!=null&&i.ok)||!i.planet)throw new Error((i==null?void 0:i.error)??`Code-Auswahl HTTP ${n.status}`);return i.planet}async function Qy(t){const e=await fetch(`/api/git?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Git-Status HTTP ${e.status}`);return e.json()}async function A3(t){const e=await fetch(`/api/mesh?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Mesh HTTP ${e.status}`);const n=await e.json(),i=n==null?void 0:n.mesh;if(!(n!=null&&n.ok)||!i||i.workspaceId!==t||!Array.isArray(i.nodes)||!Array.isArray(i.edges))throw new Error("Mesh-Projektion unvollständig oder für einen anderen Workspace");return i}async function w3(t,e={}){const n=new URLSearchParams({workspace:t});e.agentId&&n.set("agentId",e.agentId),e.taskId&&n.set("taskId",e.taskId),e.workerId&&n.set("workerId",e.workerId),e.limit!==void 0&&n.set("limit",String(e.limit));const i=await fetch(`/api/mesh/timeline?${n}`);if(!i.ok)throw new Error(`Mesh-Zeitleiste HTTP ${i.status}`);const a=await i.json();if(!(a!=null&&a.ok)||!Array.isArray(a.timeline))throw new Error("Mesh-Zeitleiste unvollständig");return a.timeline}async function C3(t,e){const n=await fetch(`/api/provenance?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Provenance HTTP ${n.status}`);return n.json()}async function R3(t,e=Gi(),n="AGY"){const i=await fetch("/api/agent/attach",{method:"POST",headers:Ga(),body:JSON.stringify({workspace:t,agentId:e,name:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Agent Attach HTTP ${i.status}`)}return i.json()}const vu=new Map;function Ql(t,e=Gi()){const n=`${t}\0${e}`,i=vu.get(n);if(i)return i;const a=R3(t,e).then(()=>{}).catch(()=>{vu.delete(n)});return vu.set(n,a),a}function N3(){vu.clear()}async function D3(t,e,n=Gi()){await Ql(t,n);const i=await fetch("/api/agent/search",{method:"POST",headers:Ga(),body:JSON.stringify({workspace:t,agentId:n,query:e})});if(!i.ok){const s=await i.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Search HTTP ${i.status}`)}const a=await i.json();return Array.isArray(a==null?void 0:a.hits)?a.hits:[]}async function U3(t,e,n=Gi()){await Ql(t,n);const i=await fetch("/api/agent/read",{method:"POST",headers:Ga(),body:JSON.stringify({workspace:t,agentId:n,path:e})});if(!i.ok){const s=await i.json().catch(()=>null),r=(s==null?void 0:s.error)??`HTTP ${i.status}`;return{ok:!1,path:e,content:"",bytes:0,lang:null,error:r}}const a=await i.json();return{ok:!0,path:a.path??e,content:a.content??"",bytes:a.bytes??0,lang:a.lang??null}}async function Yv(t,e,n=Gi()){const i=await fetch("/api/context/pack",{method:"POST",headers:Ga(),body:JSON.stringify({workspaceId:t,goal:e,agentId:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Context Pack HTTP ${i.status}`)}return i.json()}async function L3(t){const e=await fetch(`/api/context/pack/${encodeURIComponent(t)}/staleness`);if(!e.ok){const n=await e.json().catch(()=>null);throw new Error((n==null?void 0:n.error)??`Staleness HTTP ${e.status}`)}return e.json()}async function O3(t,e){const n=await fetch(`/api/notes/query?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}`,{headers:Ga()});if(!n.ok){const i=await n.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Notes Query HTTP ${n.status}`)}return n.json()}async function $y(t,e,n=30){const i=await fetch(`/api/notes/search?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}&limit=${n}&lines=1`,{headers:Ga()});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Notizsuche HTTP ${i.status}`)}return i.json()}async function P3(t,e){const n=await fetch(`/api/notes/backlinks?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.backlinks)?i.backlinks:[]}async function z3(t){const e=await fetch(`/api/notes?workspace=${encodeURIComponent(t)}&limit=5000`),n=await e.json().catch(()=>null);if(!e.ok||!(n!=null&&n.ok))throw new Error((n==null?void 0:n.error)??`Notizen HTTP ${e.status}`);return Array.isArray(n.notes)?n.notes:[]}async function Xd(t,e,n=Gi()){await Ql(t,n);const i=await fetch(`/api/notes/read?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}&agentId=${encodeURIComponent(n)}`),a=await i.json().catch(()=>null);if(!i.ok||!(a!=null&&a.ok)||!a.note)throw new Error((a==null?void 0:a.error)??`Notiz lesen HTTP ${i.status}`);return a.note}async function Zv(t,e,n,i,a=Gi(),s=!1){await Ql(t,a);const r=await fetch("/api/notes/write",{method:"POST",headers:Ga(),body:JSON.stringify({workspace:t,agentId:a,path:e,content:n,...i?{expectedHash:i}:{},...s?{createOnly:!0}:{}})}),o=await r.json().catch(()=>null);if(!r.ok||!(o!=null&&o.ok)){const l=new Error((o==null?void 0:o.error)??`Notiz speichern HTTP ${r.status}`);throw Object.assign(l,{conflict:o==null?void 0:o.conflict,status:r.status}),l}return o}async function I3(t,e={}){const n=new URLSearchParams({workspace:t});e.focus&&n.set("focus",e.focus),e.depth!==void 0&&n.set("depth",String(e.depth)),e.filter&&n.set("filter",e.filter),e.limit!==void 0&&n.set("limit",String(e.limit));const i=await fetch(`/api/notes/graph?${n}`),a=await i.json().catch(()=>null);if(!i.ok||!(a!=null&&a.ok)||!a.graph)throw new Error((a==null?void 0:a.error)??`Wissensgraph HTTP ${i.status}`);return a.graph}async function B3(t,e){const n=await fetch(`/api/notes/attachments?workspace=${encodeURIComponent(t)}&note=${encodeURIComponent(e)}`),i=await n.json().catch(()=>null);if(!n.ok||!(i!=null&&i.ok))throw new Error((i==null?void 0:i.error)??`Anhänge HTTP ${n.status}`);return Array.isArray(i.attachments)?i.attachments:[]}async function F3(t,e,n,i=Gi()){await Ql(t,i);const a=new Uint8Array(await n.arrayBuffer());let s="";for(let c=0;c<a.length;c+=32768)s+=String.fromCharCode(...a.subarray(c,c+32768));const r=btoa(s),o=await fetch("/api/notes/attachment",{method:"POST",headers:Ga(),body:JSON.stringify({workspace:t,agentId:i,note:e,name:n.name,base64:r})}),l=await o.json().catch(()=>null);if(!o.ok||!(l!=null&&l.ok)||!l.attachment)throw new Error((l==null?void 0:l.error)??`Anhang speichern HTTP ${o.status}`);return l.attachment}function H3(t,e,n,i=Gi()){return`/api/notes/attachment?workspace=${encodeURIComponent(t)}&note=${encodeURIComponent(e)}&name=${encodeURIComponent(n)}&agentId=${encodeURIComponent(i)}`}function Kv(t,e,n=Gi()){const i=new URLSearchParams({workspace:t,agentId:n});return e&&i.set("note",e),`/api/notes/export?${i}`}const Yt=[],ls=[],Sa=[],zl=[],xl={},_n=[],_u=[],Zi=7.2,qr=6,Il=["--k1","--k2","--k3","--k4","--k5","--k6"],ng=t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),G3=t=>t.agentColor||ng(Il[(t.ki??0)%Il.length]),Qv=t=>ng(Il[t.ki%Il.length]),Jy=new Map;let eM="loc";function k3(t){eM=t}const V3=t=>{const e=Math.max(1,...Yt.map(i=>i.loc)),n=Math.max(1,...Yt.map(i=>i.usedBy.length));return t.dying?0:eM==="loc"?1.5+t.loc/e*26:1.5+t.usedBy.length/n*26},Fp=new Set,j3=t=>(Fp.add(t),()=>Fp.delete(t)),xo=()=>Fp.forEach(t=>t());function Hp(t,e,n="ok"){_u.unshift({t:new Date,ws:t,msg:e,kind:n,id:Math.random().toString(36).slice(2)}),_u.length>60&&_u.pop()}function wf(){var o;let e=0,n=0,i=0;const a=zl.filter(l=>_n.find(c=>c.id===l)),s=new Set;for(const l of a){const c=Yt.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=_n.find(g=>g.id===l))!=null&&o.dying))continue;const d=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),p=d*Zi+qr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/d))*Zi+qr;n+p>74&&n>0&&(e+=i,n=0,i=0);let m=Sa.find(g=>g.dir===l);m||(m={dir:l,x:n+p/2,z:e+u/2,w:.01,h:.01},Sa.push(m)),Object.assign(m,{tx:n,tz:e,tw:p,th:u,cols:d}),s.add(l),n+=p,i=Math.max(i,u)}const r=Sa.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(d=>d.tx+d.tw))/2,c=Math.max(...r.map(d=>d.tz+d.th))/2;for(const d of r)d.tx-=l,d.tz-=c;for(const d of r)Yt.filter(u=>u.dir===d.dir).forEach((u,m)=>{u.tx=d.tx+qr/2+m%d.cols*Zi+Zi/2,u.tz=d.tz+qr/2+Math.floor(m/d.cols)*Zi+Zi/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=Sa.length-1;l>=0;l--)!s.has(Sa[l].dir)&&!Yt.some(c=>c.dir===Sa[l].dir)&&Sa.splice(l,1);for(const l of a)Jy.set(l,.5)}function X3(t,e,n=!1){let i=_n.find(a=>a.id===t);return i||(i={id:t,name:e||t,ki:_n.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},_n.push(i),zl.includes(t)||zl.push(t),Hp(e||t,"workspace registered","reg"),wf(),xo(),i)}function W3(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=e.split("/").pop(),c=e.includes("/")&&e.startsWith(t.id+"/")?e:`${t.id}/${e}`;let d=xl[c];if(d)return d.loc+=Math.max(2,Math.round(n*.25)),d.pulse=1,s&&(d.agentColor=s,d.agentName=r,d.access=o),d;d={path:c,name:l,dir:t.id,top:t.id,ki:t.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let p of i){p.includes("/")||(p=`${t.id}/${p}`);const u=xl[p];u&&(d.deps.push(p),ls.push({from:d,to:u}),u.usedBy.push(c))}return Yt.push(d),xl[c]=d,wf(),xo(),d}function q3(){let t=!1;for(let e=Yt.length-1;e>=0;e--){const n=Yt[e];if(n.dying&&n.h<.25){Yt.splice(e,1),delete xl[n.path],t=!0;for(let i=ls.length-1;i>=0;i--)(ls[i].from===n||ls[i].to===n)&&ls.splice(i,1);for(const i of Yt){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let e=_n.length-1;e>=0;e--){const n=_n[e];if(n.dying&&!Yt.some(i=>i.dir===n.id)){_n.splice(e,1);const i=zl.indexOf(n.id);i>=0&&zl.splice(i,1),t=!0}}t&&(wf(),xo())}setInterval(()=>{let t=!1;for(const e of _n)e.load>.01&&(e.load*=.82,t=!0);t&&xo()},600);const al={register({id:t,name:e}={}){return t?X3(String(t),e&&String(e),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=_n.find(c=>c.id===t);return!l||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,W3(l,{path:e,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(t,e){const n=_n.find(a=>a.id===t);if(!n)return;const i=Yt.filter(a=>a.dir===t&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Hp(n.name,String(e||"event")),xo()},unregister(t){const e=_n.find(n=>n.id===t);e&&(e.dying=!0,Yt.filter(n=>n.dir===t).forEach(n=>{n.dying=!0}),Hp(e.name,"workspace unregistered","sys"),wf(),xo())},list:()=>_n.map(t=>({id:t.id,name:t.name,buildings:Yt.filter(e=>e.dir===t.id).length})),simulated:()=>!1};window.PlugBrainCity=al;const Y3=1024,Z3=2048,$v=96,Jv=new Map;function K3(t){if(!t.agentColor)return null;const e=t.agentColor+(t.access||"");let n=Jv.get(e);if(!n){n=new ct;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(t.agentColor);if(i){const a=t.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(t.agentColor)}catch{n.setHSL(0,0,.5)}Jv.set(e,n)}return n}function Q3(t,e,n,{onSelect:i,onZoom:a}){let s;try{s=new jy({antialias:!0,alpha:!0,canvas:t})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new Ty,o=new tg(-1,1,1,-1,-400,600),l=`
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
  }`,d=new tr(1,1,1),p=new Tn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=Y3,m=new fv(d,p,u);m.frustumCulled=!1;let g=new Wr(new Float32Array(u*3),3),b=new Wr(new Float32Array(u*2),2);d.setAttribute("aColor",g),d.setAttribute("aHi",b),r.add(m);const _=new oA(d),h=new Dy({color:3814695,transparent:!0,opacity:.3});let v=[];for(let Se=0;Se<u;Se++){const H=new mu(_,h);H.visible=!1,v.push(H),r.add(H)}const S=(Se,H)=>{let et=Math.max(1,Se);for(;et<H;)et*=2;return et};function x(Se){if(Se<=u)return;const H=S(u,Se),et=m,Xe=v,N=new fv(d,p,H);N.frustumCulled=!1,N.count=0;const y=new Wr(new Float32Array(H*3),3),X=new Wr(new Float32Array(H*2),2);d.setAttribute("aColor",y),d.setAttribute("aHi",X);const Z=[];for(let te=0;te<H;te++){const de=new mu(_,h);de.visible=!1,Z.push(de),r.add(de)}r.remove(et);for(const te of Xe)r.remove(te);m=N,g=y,b=X,v=Z,u=H}const A=()=>new Tn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),R=[],T=new tr(1,1,1);for(let Se=0;Se<$v;Se++){const H=new Di(T,A());H.visible=!1,R.push(H),r.add(H)}const M=3;let C=Z3,w=new Float32Array(C*M*3),U=new Float32Array(C*M);const O=new Nn;O.setAttribute("position",new At(w,3)),O.setAttribute("aA",new At(U,1));const k=new Op(O,new Tn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));k.frustumCulled=!1,r.add(k);let P=new Float32Array(C*6),z=new Float32Array(C*2);const B=new Nn;B.setAttribute("position",new At(P,3)),B.setAttribute("aA",new At(z,1));const I=new mu(B,new Tn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));I.frustumCulled=!1,r.add(I);function L(Se){Se<=C||(C=S(C,Se),w=new Float32Array(C*M*3),U=new Float32Array(C*M),P=new Float32Array(C*6),z=new Float32Array(C*2),O.setAttribute("position",new At(w,3)),O.setAttribute("aA",new At(U,1)),B.setAttribute("position",new At(P,3)),B.setAttribute("aA",new At(z,1)))}const V={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},re=Math.atan(1/Math.SQRT2);let ce=!1,_e=0,ke=0,Je=!0;const He={x:-1,y:-1,live:!1};t.addEventListener("pointerdown",Se=>{ce=!0,ke=0,_e=Se.clientX,t.setPointerCapture(Se.pointerId),t.classList.add("drag")}),t.addEventListener("pointerup",Se=>{ce=!1,t.classList.remove("drag"),t.releasePointerCapture(Se.pointerId)}),t.addEventListener("pointermove",Se=>{const H=t.getBoundingClientRect();He.x=Se.clientX-H.left,He.y=Se.clientY-H.top,He.live=!0,ce&&(ke+=Math.abs(Se.clientX-_e),V.tYaw-=(Se.clientX-_e)*.006,_e=Se.clientX,Je=!1,je(!1))}),t.addEventListener("pointerleave",()=>{He.live=!1});const se=V.tZoom,ge=()=>a(Math.round(se/V.tZoom*100)),he=Se=>{V.tZoom=Math.max(4,Math.min(60,V.tZoom*Se)),ge()};t.addEventListener("wheel",Se=>{Se.preventDefault(),he(1+Math.sign(Se.deltaY)*.11)},{passive:!1}),ge();let Te=null,Ie=null,W=null,De="",Be=null,je=()=>{};t.addEventListener("click",()=>{ke>5||i(Te&&Ie!==Te?Te:null)});const qe=Il.map(Se=>new ct(ng(Se)||"#8a4b2a")),Ze=new Y,xt=new Ht,dt=new ct;let ut=!0,It=performance.now();function wt(Se){requestAnimationFrame(wt);const H=Math.min(.05,(Se-It)/1e3);It=Se;const et=e.clientWidth,Xe=e.clientHeight;if(!et||!Xe)return;t.width!==Math.round(et*s.getPixelRatio())&&s.setSize(et,Xe,!1);const N=1-Math.pow(.002,H);q3(),x(Yt.length),L(ls.length),Je&&(V.tYaw+=H*.12),V.yaw+=(V.tYaw-V.yaw)*N,V.zoom+=(V.tZoom-V.zoom)*N;const y=V.zoom*4,X=y*(et/Xe);o.left=-X,o.right=X,o.top=y,o.bottom=-y,o.updateProjectionMatrix();const Z=180;o.position.set(Math.cos(V.yaw)*Math.cos(re)*Z,Math.sin(re)*Z,Math.sin(V.yaw)*Math.cos(re)*Z),o.lookAt(0,6,0);for(let q=0;q<$v;q++){const ie=R[q],fe=Sa[q];if(!fe||q>=Sa.length){ie.visible=!1;continue}fe.x=fe.x===void 0?fe.tx+fe.tw/2:fe.x,fe.z=fe.z===void 0?fe.tz+fe.th/2:fe.z;const oe=fe.tx+fe.tw/2,pe=fe.tz+fe.th/2;fe.x+=(oe-fe.x)*N,fe.z+=(pe-fe.z)*N,fe.w+=(fe.tw-fe.w)*N,fe.h+=(fe.th-fe.h)*N,ie.visible=!0,ie.position.set(fe.x,-.25,fe.z),ie.scale.set(Math.max(.01,fe.w-qr*.45),.5,Math.max(.01,fe.h-qr*.45))}const te=Ie?new Set([Ie.path,...Ie.deps,...Ie.usedBy]):null,de=Ie||Te||W,ve=Yt.length;m.count=ve;for(let q=0;q<ve;q++){const ie=Yt[q];ie.x!==ie.tx&&(ie.x+=(ie.tx-ie.x)*N*.7),ie.z!==ie.tz&&(ie.z+=(ie.tz-ie.z)*N*.7);const fe=V3(ie);ie.h=ie.h===void 0?fe:ie.h+(fe-ie.h)*(ie.dying?N*1.4:N*.6),ie.pulse=Math.max(0,(ie.pulse||0)-H*1.6),xt.makeScale(Zi*.68,Math.max(.01,ie.h),Zi*.68),xt.setPosition(ie.x,ie.h/2,ie.z),m.setMatrixAt(q,xt);const oe=v[q];oe.visible=!0,oe.scale.set(Zi*.68,Math.max(.01,ie.h),Zi*.68),oe.position.set(ie.x,ie.h/2,ie.z);const pe=K3(ie);pe?dt.copy(pe):dt.copy(qe[(ie.ki??0)%qe.length]).offsetHSL(0,0,(Jy.get(ie.dir)-.5)*.17),g.array[q*3]=dt.r,g.array[q*3+1]=dt.g,g.array[q*3+2]=dt.b;const Re=ie===de?1:Math.min(.85,ie.pulse||0);let Ue=te?te.has(ie.path)?0:1:De&&!ie.path.toLowerCase().includes(De)?1:0;!te&&!De&&Be&&(Ue=ie.top===Be?0:1),b.array[q*2]+=(Re-b.array[q*2])*N,b.array[q*2+1]+=(Ue-b.array[q*2+1])*N}for(let q=ve;q<u;q++)v[q].visible=!1;m.instanceMatrix.needsUpdate=!0,g.needsUpdate=b.needsUpdate=!0;const ne=ls.length;B.setDrawRange(0,ne*2),O.setDrawRange(0,ne*M);for(let q=0;q<ne;q++){const ie=ls[q],fe=ie.from,oe=ie.to,pe=q*6;P[pe]=fe.x,P[pe+1]=fe.h,P[pe+2]=fe.z,P[pe+3]=oe.x,P[pe+4]=oe.h,P[pe+5]=oe.z;const Re=!te||te.has(fe.path)&&te.has(oe.path),Ue=Ie&&(fe===Ie||oe===Ie),Fe=Ue?.55:Re?.1:.02;z[q*2]+=(Fe-z[q*2])*N,z[q*2+1]=z[q*2];for(let G=0;G<M;G++){const me=q*M+G,D=(Se/2600+(q*.37+G/M))%1,F=Math.sin(D*Math.PI)*Math.hypot(oe.x-fe.x,oe.z-fe.z)*.22;w[me*3]=fe.x+(oe.x-fe.x)*D,w[me*3+1]=fe.h+(oe.h-fe.h)*D+F+1.2,w[me*3+2]=fe.z+(oe.z-fe.z)*D,U[me]=(ut?1:0)*(Ue?1:Re?.45:.06)*Math.sin(D*Math.PI)}}if(B.getAttribute("position").needsUpdate=!0,B.getAttribute("aA").needsUpdate=!0,O.getAttribute("position").needsUpdate=!0,O.getAttribute("aA").needsUpdate=!0,k.material.uniforms.uPx.value=3.4*s.getPixelRatio(),He.live&&!ce){let q=null,ie=26*26;for(let fe=0;fe<ve;fe++){const oe=Yt[fe];if(oe.dying||oe.h<1)continue;Ze.set(oe.x,oe.h*.6,oe.z).project(o);const pe=(Ze.x*.5+.5)*et,Re=(-Ze.y*.5+.5)*Xe,Ue=(pe-He.x)**2+(Re-He.y)**2;Ue<ie&&(ie=Ue,q=oe,oe.sx=pe,oe.sy=Re)}Te=q,t.style.cursor=ce?"grabbing":q?"pointer":"grab"}else He.live||(Te=null);Te?(n.style.display="block",n.style.left=Te.sx+"px",n.style.top=Te.sy+"px",n.innerHTML=`<b>${Te.name}</b> · ${Te.loc} lines<br>${Te.dir} · referenced by ${Te.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(wt),{setFlow:Se=>{ut=Se},setHatch:Se=>{p.uniforms.uHatch.value=Se?1:0},setSpin:Se=>{Je=Se},spinning:()=>Je,onSpinChange:Se=>{je=Se},dolly:he,reset:()=>{V.tYaw=Math.PI*.25,V.tZoom=se,ge()},setSel:Se=>{Ie=Se},setRailHover:Se=>{W=Se},setQuery:Se=>{De=Se},setFocusTop:Se=>{Be=Se}}}const Cr=new Map;function e_(t){var n,i;const e=((n=t==null?void 0:t.properties)==null?void 0:n.path)||((i=t==null?void 0:t.properties)==null?void 0:i.filePath)||(t==null?void 0:t.uri);return typeof e=="string"&&e.length>0?e:null}function $3(t){var i,a,s;const e=((i=t==null?void 0:t.properties)==null?void 0:i.loc)??((a=t==null?void 0:t.properties)==null?void 0:a.lines)??((s=t==null?void 0:t.properties)==null?void 0:s.size),n=Number(e);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function J3(t,e){const i=String(t).replace(/\\/g,"/").split("/");return i[0]==="Code"&&i[1]?i[1].split("--")[0]:["Master","Roadmap","Auftrag","Planung","Codebasis","PLUG-Ordner","Aufräumen"].includes(i[0])?i[0]:e}function e2(t){var d;const e=t==null?void 0:t.workspace,n=(d=t==null?void 0:t.graph)==null?void 0:d.nodes;if(!(e!=null&&e.id)||!Array.isArray(n))return{workspaces:Cr.size,buildings:0,added:0};const i=Xy(e.name||e.canonicalPath||e.id)||e.id;for(const p of _n.slice())p.sim&&al.unregister(p.id);const a=Array.isArray(t.graph.edges)?t.graph.edges:[],s=new Map(n.filter(p=>p&&typeof p.id=="string").map(p=>[p.id,p])),r=new Map;for(const p of a){const u=s.get(p==null?void 0:p.sourceId),m=s.get(p==null?void 0:p.targetId);if(!u||!m)continue;const g=e_(m);g&&(r.has(u.id)||r.set(u.id,[]),r.get(u.id).push(g))}const o=[];for(const p of n){const u=e_(p);u&&o.push({node:p,path:u})}o.sort((p,u)=>p.path.localeCompare(u.path));let l=0,c=0;for(const{node:p,path:u}of o){const m=J3(u,i);Cr.has(m)||(al.register({id:m,name:m}),Cr.set(m,new Set));const g=Cr.get(m);if(g.has(u))continue;g.add(u),c+=g.size;const b=p.properties||{};al.grow(m,{path:u,loc:$3(p),deps:r.get(p.id)||[],note:p.type||"",agentColor:b.agentColor||b.readerColor||null,agentName:b.agentName||b.readerName||null,access:b.agentColor?"write":b.readerColor?"read":null}),l+=1}return l>0&&al.event(String(e.id),`${l} indexed object${l===1?"":"s"} added across ${Cr.size} districts`),{workspaces:Cr.size,buildings:c,added:l,total:o.length,truncated:!1}}function t2({snapshot:t,onSelectFile:e}){J.useEffect(()=>{t&&e2(t)},[t]);const[n,i]=J.useState(!0),[a,s]=J.useState("loc"),[r,o]=J.useState(!0),[l,c]=J.useState(!0),[d,p]=J.useState(!0),[u,m]=J.useState(100),[g,b]=J.useState(null),[_,h]=J.useState(""),[v,S]=J.useState(null),[x,A]=J.useState(!0),[,R]=J.useReducer(P=>P+1,0),T=J.useRef(null),M=J.useRef(null),C=J.useRef(null),w=J.useRef(null);J.useEffect(()=>{const P=Q3(T.current,M.current,C.current,{onSelect:z=>b(z),onZoom:z=>m(z)});if(!P){i(!1);return}w.current=P,P.onSpinChange(z=>p(z))},[]),J.useEffect(()=>{const P=j3(()=>R());return()=>{P()}},[]),J.useEffect(()=>{!g&&Yt.length>0&&b(Yt[0])},[Yt.length,g]),J.useEffect(()=>{var P;(P=w.current)==null||P.setSel(g)},[g]),J.useEffect(()=>{var P;(P=w.current)==null||P.setQuery(_)},[_]),J.useEffect(()=>{var P;(P=w.current)==null||P.setFocusTop(v)},[v]),J.useEffect(()=>{const P=z=>{var I,L;const B=z.target;if(/^(INPUT|TEXTAREA)$/.test(B.tagName)){z.key==="Escape"&&B.blur();return}z.key==="Escape"?(b(null),S(null)):z.key==="="||z.key==="+"?(I=w.current)==null||I.dolly(.8474576271186441):z.key==="-"||z.key==="_"?(L=w.current)==null||L.dolly(1.18):(z.key==="e"||z.key==="E")&&A(V=>!V)};return addEventListener("keydown",P),()=>removeEventListener("keydown",P)},[]);const U=Yt.reduce((P,z)=>P+z.loc,0),O=_n.reduce((P,z)=>P+z.events,0),k=(P,z)=>z.length?f.jsxs(f.Fragment,{children:[f.jsxs("h3",{children:[P+" ",f.jsx("span",{style:{color:"var(--faint)"},children:z.length})]}),z.map(B=>{const I=xl[B];return I&&f.jsxs("div",{className:"dep","data-p":B,onClick:()=>b(I),children:[f.jsx("span",{className:"sw",style:{background:G3(I)}}),f.jsx("span",{children:B})]},B)})]}):null;return f.jsxs("div",{id:"app",className:g?void 0:"closed",children:[f.jsxs("aside",{children:[f.jsxs("div",{className:"hd",children:[f.jsx("h1",{children:"PlugBrain City"}),f.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),f.jsxs("div",{className:"kpis",children:[f.jsxs("div",{children:[f.jsx("b",{id:"k-ws",children:_n.length}),f.jsx("i",{children:"workspaces"})]}),f.jsxs("div",{children:[f.jsx("b",{id:"k-bld",children:Yt.length}),f.jsx("i",{children:"buildings"})]}),f.jsxs("div",{children:[f.jsx("b",{id:"k-ev",children:O}),f.jsx("i",{children:"events"})]})]})]}),f.jsx("div",{className:"q",children:f.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:P=>h(P.target.value.trim().toLowerCase())})}),f.jsx("div",{className:"tree",id:"tree",children:_n.length?_n.map(P=>{const z=Yt.filter(I=>I.dir===P.id),B=z.reduce((I,L)=>I+L.loc,0);return f.jsxs("div",{className:"ws"+(v===P.id?" on":"")+(P.dying?" dying":""),onClick:()=>S(I=>I===P.id?null:P.id),children:[f.jsxs("div",{className:"wsrow",children:[f.jsx("span",{className:"sw",style:{background:Qv(P)}}),f.jsx("span",{className:"nm",children:P.name}),P.sim?f.jsx("span",{className:"tag",children:"sim"}):null,f.jsxs("span",{className:"lc",children:[z.length," bld · ",B]})]}),f.jsx("div",{className:"loadbar",children:f.jsx("i",{style:{width:Math.round(P.load*100)+"%",background:Qv(P)}})})]},P.id)}):f.jsxs("div",{className:"empty",children:["No workspaces registered.",f.jsx("br",{}),f.jsx("br",{}),f.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),f.jsxs("div",{id:"stage",ref:M,children:[f.jsx("canvas",{id:"cv",ref:T}),f.jsx("div",{id:"tip",ref:C}),f.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",f.jsx("b",{id:"crumb-t",children:g?g.path.toUpperCase():v?v.toUpperCase():"CITY OVERVIEW"})]}),x&&f.jsx("div",{id:"feed",children:_u.slice(0,9).map(P=>f.jsxs("div",{className:"fe",children:[f.jsx("span",{className:"ft",children:P.t.toLocaleTimeString("en-GB",{hour12:!1})}),f.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:P.ws}),f.jsx("span",{className:"fm",children:P.msg})]},P.id))}),f.jsx("div",{id:"legend",children:f.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${a==="loc"?"size":"references"} · flashes = activity`})}),f.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([P,z])=>f.jsx("button",{className:"tb"+(a===P?" on":""),"data-h":P,type:"button",onClick:()=>{k3(P),s(P)},children:z},P)),f.jsx("div",{className:"vsep"}),f.jsx("button",{className:"tb"+(r?" on":""),id:"t-flow",type:"button",onClick:()=>{o(P=>{var z;return(z=w.current)==null||z.setFlow(!P),!P})},children:"Flow"}),f.jsx("button",{className:"tb"+(l?" on":""),id:"t-hatch",type:"button",onClick:()=>{c(P=>{var z;return(z=w.current)==null||z.setHatch(!P),!P})},children:"Hatching"}),f.jsx("button",{className:"tb"+(d?" on":""),id:"t-spin",type:"button",onClick:()=>{p(P=>{var z;return(z=w.current)==null||z.setSpin(!P),!P})},children:"Orbit"}),f.jsx("button",{className:"tb"+(x?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>A(P=>!P),children:"Feed"}),f.jsx("div",{className:"vsep"}),f.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var P;return(P=w.current)==null?void 0:P.dolly(1.18)},children:"−"}),f.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var P;return(P=w.current)==null?void 0:P.reset()},children:u+"%"}),f.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var P;return(P=w.current)==null?void 0:P.dolly(1/1.18)},children:"＋"}),f.jsx("div",{className:"vsep"}),f.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var P;(P=w.current)==null||P.reset(),b(null),S(null)},children:"Reset"})]}),f.jsxs("div",{id:"gate",style:n?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",f.jsx("br",{}),"The workspace registry remains available."]})]}),f.jsx("div",{id:"side",children:f.jsx("div",{id:"dt",children:g&&f.jsxs("div",{className:"dt",children:[f.jsx("div",{className:"kind",children:g.dir+"/"}),f.jsx("h2",{children:g.name}),g.note?f.jsx("div",{className:"note",children:g.note}):null,e&&f.jsx("button",{type:"button",className:"btn primary",style:{marginTop:"10px",marginBottom:"14px",width:"100%",padding:"8px 12px"},onClick:()=>e(g.path),children:"📄 Datei in Quellansicht öffnen"}),f.jsxs("dl",{children:[f.jsx("dt",{children:"Size"}),f.jsx("dd",{children:g.loc}),f.jsx("dt",{children:"References"}),f.jsx("dd",{children:g.deps.length}),f.jsx("dt",{children:"Referenced by"}),f.jsx("dd",{children:g.usedBy.length}),f.jsx("dt",{children:"Share of total"}),f.jsx("dd",{children:U?(g.loc/U*100).toFixed(1)+"%":"—"})]}),k("References",g.deps),k("Referenced by",g.usedBy)]})})})]})}const t_={agent:"Agent",task:"Aufgabe",worker:"Worker",worktree:"Worktree",file:"Datei",artifact:"Artefakt",route:"Route"},n_={live:"Live-Ereignis",recovered:"wiederhergestelltes Ereignis","historical-import":"historischer Import"};function Wd(t){const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function qd(t){if(t.kind!=="worker")return null;switch(t.proof){case"process-started":return"Start im Trace beobachtet — keine Aussage über den aktuellen Prozesszustand.";case"finished":return"Abschluss im Trace beobachtet.";case"proof-unavailable":return"Kein beobachteter Prozessstart; dieser Worker wird nicht als laufend dargestellt.";default:return"Kein Prozessbeweis vorhanden."}}function n2(t){const e=t.id.slice(t.id.indexOf(":")+1);return t.kind==="agent"?{agentId:e}:t.kind==="task"?{taskId:e}:t.kind==="worker"?{workerId:e}:null}function i_(t,e){var n;return((n=t.find(i=>i.id===e))==null?void 0:n.label)??e}function i2({mesh:t,workspaceId:e,onSelectFile:n,focusAgentId:i}){const[a,s]=J.useState(null),[r,o]=J.useState([]),[l,c]=J.useState(!1),[d,p]=J.useState(""),u=J.useMemo(()=>(t==null?void 0:t.nodes.find(g=>g.id===a))??null,[t,a]);return J.useEffect(()=>{if(!i)return;const g=`agent:${i}`;t!=null&&t.nodes.some(b=>b.id===g)&&s(g)},[i,t]),J.useEffect(()=>{a!==null&&u===null&&s(null)},[u,a]),J.useEffect(()=>{const g=u?n2(u):null;if(!e||g===null){o([]),p(""),c(!1);return}let b=!0;return c(!0),p(""),w3(e,{...g,limit:12}).then(_=>{b&&o(_)}).catch(()=>{b&&(o([]),p("Die Trace-Zeitleiste ist derzeit nicht verfügbar."))}).finally(()=>{b&&c(!1)}),()=>{b=!1}},[u,e]),e?t===null||t.workspaceId!==e?f.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[f.jsx("h2",{children:"Agent Mesh"}),f.jsx("p",{children:"Die Core-Trace-Projektion ist für diesen Workspace noch nicht verfügbar."}),f.jsx("p",{className:"mesh-trace__muted",children:"Es werden weder Registry-Einträge noch historische Aktivitätszähler als Ersatz angezeigt."})]}):t.nodes.length===0&&t.edges.length===0?f.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[f.jsx("h2",{children:"Agent Mesh"}),f.jsx("p",{children:"Für diesen Workspace wurde noch keine trace-gestützte Arbeit beobachtet."}),f.jsx("p",{className:"mesh-trace__muted",children:"Keine simulierten Agenten, keine Roster-Fallbacks und kein daraus abgeleiteter Prozessstatus."})]}):f.jsxs("section",{className:"mesh-trace","aria-label":"Trace-backed Agent Mesh",children:[f.jsxs("header",{className:"mesh-trace__header",children:[f.jsxs("div",{children:[f.jsxs("h2",{children:["Agent Mesh ",f.jsx("span",{children:"Trace-backed"})]}),f.jsx("p",{children:"Jeder Knoten und jede Kante stammt aus einem autoritätsbestätigten Trace-Ereignis."})]}),f.jsxs("dl",{className:"mesh-trace__totals",children:[f.jsxs("div",{children:[f.jsx("dt",{children:"Knoten"}),f.jsx("dd",{children:t.totals.nodes??t.nodes.length})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Kanten"}),f.jsx("dd",{children:t.totals.edges??t.edges.length})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"ohne Startbeweis"}),f.jsx("dd",{children:t.unprovenWorkers.length})]})]})]}),t.unprovenWorkers.length>0&&f.jsxs("aside",{className:"mesh-trace__notice","aria-label":"Unproven workers",children:[f.jsx("strong",{children:"Unbelegte Worker werden nicht als laufend angezeigt."}),f.jsx("ul",{children:t.unprovenWorkers.map(g=>f.jsxs("li",{children:[f.jsx("code",{children:g.workerId}),g.taskId?f.jsxs(f.Fragment,{children:[" · Aufgabe ",f.jsx("code",{children:g.taskId})]}):""," — ",g.reason]},g.workerId))})]}),f.jsxs("div",{className:"mesh-trace__grid",children:[f.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace nodes",children:[f.jsxs("h3",{children:["Knoten ",f.jsx("span",{children:t.nodes.length})]}),f.jsx("ol",{className:"mesh-trace__nodes",children:t.nodes.map(g=>{const b=qd(g),_=g.id===a;return f.jsx("li",{children:f.jsxs("button",{type:"button",className:_?"mesh-trace__node is-selected":"mesh-trace__node",onClick:()=>s(g.id),"aria-pressed":_,children:[f.jsx("span",{className:"mesh-trace__kind",children:t_[g.kind]}),f.jsx("span",{className:"mesh-trace__label",title:g.label,children:g.label}),f.jsxs("span",{className:"mesh-trace__events",children:[g.eventCount," Ereignis",g.eventCount===1?"":"se"]}),f.jsx("span",{className:"mesh-trace__provenance",title:"Ereignis-Provenienz, nicht aktueller Prozessstatus",children:n_[g.provenance]}),b&&f.jsx("span",{className:"mesh-trace__proof",children:b})]})},g.id)})})]}),f.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace edges",children:[f.jsxs("h3",{children:["Kanten ",f.jsx("span",{children:t.edges.length})]}),f.jsx("ol",{className:"mesh-trace__edges",children:t.edges.map(g=>f.jsxs("li",{children:[f.jsx("span",{className:"mesh-trace__edge-kind",children:g.kind}),f.jsx("span",{title:g.from,children:i_(t.nodes,g.from)}),f.jsx("span",{"aria-hidden":"true",children:"→"}),f.jsx("span",{title:g.to,children:i_(t.nodes,g.to)}),f.jsxs("small",{children:[g.count," Ereignis",g.count===1?"":"se"," · Belege: ",g.evidence.join(", ")]})]},g.id))})]})]}),u&&f.jsxs("aside",{className:"mesh-trace__detail","aria-label":"Details for "+u.label,children:[f.jsxs("div",{className:"mesh-trace__detail-head",children:[f.jsxs("div",{children:[f.jsx("span",{className:"mesh-trace__kind",children:t_[u.kind]}),f.jsx("h3",{children:u.label})]}),f.jsx("button",{type:"button",onClick:()=>s(null),"aria-label":"Detailansicht schließen",children:"×"})]}),f.jsxs("dl",{children:[f.jsxs("div",{children:[f.jsx("dt",{children:"Erstmals"}),f.jsx("dd",{children:Wd(u.firstSeen)})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Zuletzt"}),f.jsx("dd",{children:Wd(u.lastSeen)})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Provenienz"}),f.jsx("dd",{children:n_[u.provenance]})]}),qd(u)&&f.jsxs("div",{children:[f.jsx("dt",{children:"Worker-Beweis"}),f.jsx("dd",{children:qd(u)})]}),Object.entries(u.detail).map(([g,b])=>f.jsxs("div",{children:[f.jsx("dt",{children:g}),f.jsx("dd",{children:b??"—"})]},g))]}),u.kind==="file"&&n&&f.jsx("button",{type:"button",className:"mesh-trace__source",onClick:()=>n(u.label),children:"Datei im Source-View öffnen"}),f.jsxs("section",{className:"mesh-trace__timeline","aria-label":"Trace timeline",children:[f.jsx("h4",{children:"Beobachtete Ereignisse"}),l&&f.jsx("p",{children:"Lade Trace-Ereignisse …"}),d&&f.jsx("p",{role:"status",children:d}),!l&&!d&&r.length===0&&f.jsx("p",{children:"Für diesen Knotentyp gibt es keine gefilterte Zeitleiste."}),f.jsx("ol",{children:r.map(g=>f.jsxs("li",{children:[f.jsx("code",{children:g.type})," ",f.jsx("time",{dateTime:g.occurredAt,children:Wd(g.occurredAt)}),f.jsx("span",{children:g.summary})]},g.eventId))})]})]})]}):f.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[f.jsx("h2",{children:"Agent Mesh"}),f.jsx("p",{children:"Wähle einen registrierten Workspace. Ohne Workspace kann keine Trace-Projektion behauptet werden."})]})}function a2({tasks:t,depth:e}){if(t.length===0)return f.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});t.filter(s=>s.state==="pending");const n=t.filter(s=>s.state==="claimed"),i=t.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return f.jsxs("div",{className:"queue",children:[f.jsxs("div",{className:"queue__figures",children:[f.jsx(qc,{value:e,label:"WARTEND",tone:e>8?"hot":void 0}),f.jsx(qc,{value:n.length,label:"IN ARBEIT"}),f.jsx(qc,{value:i.length,label:"GELIEFERT"}),f.jsx(qc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),f.jsx("ol",{className:"queue__list",children:t.map(s=>f.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[f.jsx("span",{className:"queue__state",children:s2[s.state]??s.state}),f.jsx("span",{className:"queue__title",title:s.title,children:s.title}),f.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&f.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&f.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const s2={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function qc({value:t,label:e,tone:n}){return f.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[f.jsx("strong",{children:t}),f.jsx("span",{children:e})]})}const r2=8e3;function o2(t,e=r2){return new Promise((n,i)=>{const a=globalThis.setTimeout(()=>{i(new Error(`Brain-Dateiabruf hat nach ${e/1e3} Sekunden nicht geantwortet. Bitte nach dem Indexlauf erneut versuchen.`))},e);t.then(s=>{globalThis.clearTimeout(a),n(s)},s=>{globalThis.clearTimeout(a),i(s)})})}function Rr({workspaceId:t,path:e,highlightLine:n,onClose:i,onNavigateFile:a}){const[s,r]=J.useState(!0),[o,l]=J.useState(null),[c,d]=J.useState(null),[p,u]=J.useState(null),[m,g]=J.useState([]),b=J.useRef(null);if(J.useEffect(()=>{let S=!0;return r(!0),l(null),d(null),u(null),g([]),o2(U3(t,e)).then(x=>{S&&(l(x),r(!1))}).catch(x=>{S&&(l({ok:!1,path:e,content:"",bytes:0,lang:null,error:String((x==null?void 0:x.message)??x)}),r(!1))}),Qy(t).then(x=>{S&&d(x)}).catch(()=>{}),C3(t,e).then(x=>{S&&u(x)}).catch(()=>{}),P3(t,e).then(x=>{S&&g(x)}).catch(()=>{}),()=>{S=!1}},[t,e]),J.useEffect(()=>{!s&&b.current&&b.current.scrollIntoView({behavior:"smooth",block:"center"})},[s,n]),s)return f.jsxs("div",{className:"source-container source-container--loading",children:[f.jsx("div",{className:"source-spinner"}),f.jsxs("p",{children:["Lade Dateiinhalt aus dem Brain (",e,") …"]})]});if(!o||!o.ok)return f.jsxs("div",{className:"source-container source-container--error",role:"alert",children:[f.jsxs("div",{className:"source-header",children:[f.jsx("span",{className:"source-header__path mono",children:e}),i&&f.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Schließen",children:"✕"})]}),f.jsxs("div",{className:"source-error-box",children:[f.jsx("div",{className:"source-error-icon",children:"⚠️"}),f.jsx("h3",{children:"Fehler beim Laden der Datei"}),f.jsx("p",{className:"source-error-msg",children:(o==null?void 0:o.error)||"Die Datei existiert nicht im Workspace oder der Pfad ist ungültig."}),f.jsxs("div",{className:"source-error-details mono",children:["Workspace: ",t,f.jsx("br",{}),"Pfad: ",e]})]})]});const _=o.content.split(/\r?\n/),h=_.length,v=c!=null&&c.head?c.head.slice(0,8):null;return f.jsxs("div",{className:"source-container",children:[f.jsxs("div",{className:"source-header",children:[f.jsxs("div",{className:"source-header__meta",children:[f.jsx("span",{className:"source-header__icon",children:"📄"}),f.jsx("span",{className:"source-header__path mono",title:o.path,children:o.path}),o.lang&&f.jsx("span",{className:"source-badge source-badge--lang",children:o.lang}),f.jsxs("span",{className:"source-badge source-badge--info",children:[h," Zeilen · ",o.bytes," B"]}),v&&f.jsxs("span",{className:"source-badge source-badge--git",title:`Git Revision: ${c==null?void 0:c.head}`,children:["git: ",v," (",(c==null?void 0:c.branch)??"detached",")"]}),(p==null?void 0:p.owner)&&f.jsxs("span",{className:"source-badge source-badge--agent",style:{borderColor:p.owner.color},title:`Zuletzt geändert durch ${p.owner.name} (${p.owner.at})`,children:[f.jsx("i",{style:{background:p.owner.color}}),p.owner.name]})]}),f.jsxs("div",{className:"source-header__actions",children:[n&&f.jsxs("span",{className:"source-badge source-badge--highlight",children:["Fokus: Zeile ",n]}),i&&f.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Quellansicht schließen",children:"✕"})]})]}),f.jsxs("div",{className:"source-body",children:[f.jsx("div",{className:"source-code-view",children:f.jsx("table",{className:"source-table",children:f.jsx("tbody",{children:_.map((S,x)=>{const A=x+1,R=n===A;return f.jsxs("tr",{ref:R?b:void 0,className:`source-line-row ${R?"source-line-row--highlight":""}`,children:[f.jsx("td",{className:"source-line-num mono","data-line":A,children:A}),f.jsx("td",{className:"source-line-code mono",children:f.jsx("pre",{children:S||" "})})]},A)})})})}),m.length>0&&f.jsxs("div",{className:"source-backlinks",style:{padding:"12px 16px",borderTop:"1px solid var(--line)",background:"rgba(255,255,255,0.02)"},children:[f.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["← Rückverweise / Backlinks (",m.length,")"]}),f.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:m.map((S,x)=>f.jsxs("div",{className:"search-hit-card",style:{padding:"6px 10px",fontSize:"11px",cursor:"pointer"},onClick:()=>a==null?void 0:a(S.path,S.line),title:`Zeile ${S.line} in ${S.path}`,children:[f.jsx("span",{className:"mono",style:{color:"var(--accent)"},children:S.path}),f.jsxs("span",{style:{color:"var(--faint)",marginLeft:"6px"},children:[":",S.line]}),S.alias&&f.jsxs("span",{style:{marginLeft:"4px",fontStyle:"italic"},children:["(",S.alias,")"]})]},x))})]})]})]})}function l2(t){const e={name:"",path:"",isDir:!0,children:new Map};for(const n of t){const i=n.path.split(/[\\/]/).filter(Boolean);let a=e;for(let s=0;s<i.length;s++){const r=i[s];if(s===i.length-1)a.children.set(r,{name:r,path:n.path,isDir:!1,children:new Map,file:n});else{let l=a.children.get(r);l||(l={name:r,path:i.slice(0,s+1).join("/"),isDir:!0,children:new Map},a.children.set(r,l)),a=l}}}return e}function c2({workspaceName:t,files:e,activePath:n,onSelectFile:i}){const[a,s]=J.useState(""),[r,o]=J.useState(new Set),l=J.useMemo(()=>l2(e),[e]),c=p=>{o(u=>{const m=new Set(u);return m.has(p)?m.delete(p):m.add(p),m})},d=(p,u=0)=>{var g,b,_;if(p.isDir){const h=r.has(p.path),v=Array.from(p.children.values()).sort((x,A)=>x.isDir!==A.isDir?x.isDir?-1:1:x.name.localeCompare(A.name)),S=a?v.filter(x=>x.path.toLowerCase().includes(a.toLowerCase())):v;return a&&S.length===0&&!p.name.toLowerCase().includes(a.toLowerCase())?null:f.jsxs("div",{className:"tree-dir-group",children:[p.name&&f.jsxs("div",{className:`tree-item tree-item--dir ${u===0?"tree-item--root":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>c(p.path),children:[f.jsx("span",{className:"tree-icon",children:h?"📁":"📂"}),f.jsx("span",{className:"tree-label",children:p.name}),f.jsx("span",{className:"tree-badge tree-badge--count",children:p.children.size})]}),(!h||a)&&f.jsx("div",{className:"tree-dir-children",children:S.map(x=>d(x,p.name?u+1:u))})]},p.path||"root")}const m=n===p.path;return a&&!p.path.toLowerCase().includes(a.toLowerCase())?null:f.jsxs("div",{className:`tree-item tree-item--file ${m?"tree-item--active":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>i(p.path),title:p.path,children:[f.jsx("span",{className:"tree-icon",children:"📄"}),f.jsx("span",{className:"tree-label mono",children:p.name}),((g=p.file)==null?void 0:g.lang)&&f.jsx("span",{className:"tree-badge tree-badge--lang",children:p.file.lang}),((b=p.file)==null?void 0:b.loc)!==void 0&&f.jsxs("span",{className:"tree-badge tree-badge--loc",children:[p.file.loc," L"]}),((_=p.file)==null?void 0:_.agent)&&f.jsx("span",{className:"tree-agent-dot",style:{background:p.file.agent.color},title:`Owner: ${p.file.agent.name}`})]},p.path)};return f.jsxs("div",{className:"explorer-view",children:[f.jsxs("div",{className:"explorer-header",children:[f.jsxs("div",{className:"explorer-title",children:[f.jsx("span",{className:"explorer-title__icon",children:"🗂️"}),f.jsxs("strong",{children:[t||"Workspace"," Explorer"]})]}),f.jsx("div",{className:"explorer-stats",children:f.jsxs("span",{children:[e.length," Dateien aus Brain"]})})]}),f.jsxs("div",{className:"explorer-search",children:[f.jsx("input",{type:"text",placeholder:"Dateibaum filtern …",value:a,onChange:p=>s(p.target.value),className:"explorer-search__input"}),a&&f.jsx("button",{type:"button",className:"explorer-search__clear",onClick:()=>s(""),children:"✕"})]}),f.jsx("div",{className:"explorer-tree",children:e.length===0?f.jsx("div",{className:"explorer-empty",children:"Keine Dateien im Snapshot vorhanden."}):d(l)})]})}function u2({workspaceId:t,onSelectHit:e}){const[n,i]=J.useState(()=>{const T=new URLSearchParams(window.location.search).get("mode");return T==="notes"||T==="prose"?T:"code"}),[a,s]=J.useState(()=>new URLSearchParams(window.location.search).get("q")||""),[r,o]=J.useState([]),[l,c]=J.useState([]),[d,p]=J.useState([]),[u,m]=J.useState(0),[g,b]=J.useState(null),[_,h]=J.useState(!1),[v,S]=J.useState(""),[x,A]=J.useState(""),R=async(T,M,C)=>{T&&T.preventDefault();const w=C??n,U=(M??a).trim();if(!U)return;h(!0),S(""),b(null);const O=performance.now();try{if(w==="code"){const k=await D3(t,U);o(k),c([]),p([])}else if(w==="prose"){const k=await $y(t,U);p(k.hits||[]),m(k.total??0),o([]),c([])}else{const k=await O3(t,U);c(k.notes||[]),o([]),p([])}b(Math.round(performance.now()-O)),A(U)}catch(k){S((k==null?void 0:k.message)||`Fehler bei der Suche (${w})`),o([]),c([]),p([])}finally{h(!1)}};return J.useEffect(()=>{const T=new URLSearchParams(window.location.search).get("q");T&&t&&R(void 0,T,n)},[t]),f.jsxs("div",{className:"search-view",children:[f.jsxs("div",{className:"search-view__header",children:[f.jsxs("div",{className:"search-view__title",children:[f.jsx("span",{className:"search-view__icon",children:"🔍"}),f.jsx("strong",{children:n==="code"?"Agent Code- & Symbolsuche":n==="prose"?"Notiz-Volltextsuche":"Notizen- & Property-Abfrage"}),f.jsx("span",{className:"search-view__endpoint mono",children:n==="code"?"/api/agent/search":n==="prose"?"/api/notes/search":"/api/notes/query"})]}),f.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[f.jsx("button",{type:"button",className:`tb ${n==="code"?"on":""}`,onClick:()=>{i("code"),a.trim()&&R(void 0,a,"code")},children:"Code & Symbole"}),f.jsx("button",{type:"button",className:`tb ${n==="notes"?"on":""}`,onClick:()=>{i("notes"),a.trim()||s("typ=gate UND stand=offen"),R(void 0,a.trim()||"typ=gate UND stand=offen","notes")},children:"Notizen & Properties (Bases)"}),f.jsx("button",{type:"button",className:`tb ${n==="prose"?"on":""}`,onClick:()=>{i("prose"),a.trim()||s("Gateway Owner"),R(void 0,a.trim()||"Gateway Owner","prose")},children:"Notiz-Volltext"})]})]}),f.jsx("form",{className:"search-form",onSubmit:R,style:{marginTop:"10px"},children:f.jsxs("div",{className:"search-input-group",children:[f.jsx("input",{type:"search",className:"search-input",placeholder:n==="code"?"Symbol, Variable, Klasse, Datei (z. B. authKey) …":n==="prose"?"Satz oder Stichwörter aus dem Notiztext (z. B. Gateway Owner) …":"Bases-Filter: typ=gate UND stand=offen oder typ=mission …",value:a,onChange:T=>s(T.target.value),autoFocus:!0}),f.jsx("button",{type:"submit",className:"search-submit-btn",disabled:_||!a.trim(),children:_?"Suche …":"Suchen"})]})}),v&&f.jsxs("div",{className:"search-error-alert",role:"alert",children:["⚠️ ",v]}),f.jsxs("div",{className:"search-results",children:[x&&f.jsxs("div",{className:"search-results-summary",children:[n==="code"?r.length===0?`Keine Code-Treffer für "${x}" im Brain-Index`:`${r.length} Treffer für "${x}":`:n==="prose"?d.length===0?`Kein Notiztext enthält "${x}"`:`${u} Notiz(en) im Text, ${d.length} angezeigt`:l.length===0?`Keine Notizen entsprechen dem Filter "${x}"`:`${l.length} Notiz(en) gefunden für "${x}":`,g!==null&&f.jsxs("span",{className:"search-results-time mono",style:{marginLeft:"8px",opacity:.7},children:[g," ms"]})]}),n==="code"?f.jsx("div",{className:"search-hits-list",children:r.map((T,M)=>f.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[f.jsxs("div",{className:"search-hit-card__head",children:[f.jsx("span",{className:"search-hit-name mono",children:T.name}),f.jsx("span",{className:`search-hit-kind search-hit-kind--${T.kind}`,children:T.kind}),T.line!==null&&f.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),f.jsxs("div",{className:"search-hit-path mono",title:T.path,children:["📄 ",T.path]})]},`${T.path}-${T.name}-${T.line??M}`))}):n==="prose"?f.jsx("div",{className:"search-hits-list",children:d.map(T=>f.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[f.jsxs("div",{className:"search-hit-card__head",children:[f.jsx("span",{className:"search-hit-name",children:T.title}),T.line!==null&&f.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),T.snippet&&f.jsx("div",{className:"search-hit-snippet",children:T.snippet}),f.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]})]},`${T.path}-${T.line??0}`))}):f.jsx("div",{className:"search-hits-list",children:l.map(T=>f.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path),children:[f.jsxs("div",{className:"search-hit-card__head",children:[f.jsx("span",{className:"search-hit-name",children:T.title}),T.typ&&f.jsx("span",{className:"search-hit-kind search-hit-kind--class",children:T.typ}),T.stand&&f.jsx("span",{className:"source-badge",style:{fontSize:"11px",marginLeft:"6px"},children:T.stand})]}),f.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]}),(T.inLinks!==void 0||T.outLinks!==void 0)&&f.jsxs("div",{style:{fontSize:"11px",color:"var(--faint)",marginTop:"4px"},children:["Verlinkungen: → ",T.outLinks??0," ausgehend · ← ",T.inLinks??0," Rückverweise"]})]},T.path))})]})]})}function f2({workspaceId:t,focus:e,onOpenNote:n}){const[i,a]=J.useState(1),[s,r]=J.useState(120),[o,l]=J.useState(null),[c,d]=J.useState(0),[p,u]=J.useState("");J.useEffect(()=>{let v=!0;return u(""),I3(t,{focus:e,depth:i,limit:s}).then(S=>{v&&(l(S),d(0))}).catch(S=>{v&&(l(null),u(S instanceof Error?S.message:String(S)))}),()=>{v=!1}},[t,e,i,s]);const m=J.useMemo(()=>((o==null?void 0:o.nodes)??[]).slice().sort((v,S)=>Number(S.focus)-Number(v.focus)||S.inLinks+S.outLinks-(v.inLinks+v.outLinks)||v.path.localeCompare(S.path)),[o]),g=m[c]??null,b=J.useMemo(()=>!g||!o?[]:o.edges.filter(v=>v.source===g.id||v.target===g.id).map(v=>m.find(S=>S.id===(v.source===g.id?v.target:v.source))).filter(v=>v!==void 0),[g,o,m]),_=v=>d(S=>Math.max(0,Math.min(m.length-1,S+v))),h=v=>{m.length&&(v.key==="ArrowDown"||v.key==="ArrowRight"?(v.preventDefault(),_(1)):v.key==="ArrowUp"||v.key==="ArrowLeft"?(v.preventDefault(),_(-1)):v.key==="Home"?(v.preventDefault(),d(0)):v.key==="End"?(v.preventDefault(),d(m.length-1)):v.key==="Enter"&&g&&(v.preventDefault(),n(g.path)))};return f.jsxs("section",{className:"knowledge-graph","aria-label":"Wissensgraph",onKeyDown:h,tabIndex:0,children:[f.jsxs("header",{className:"knowledge-graph__head",children:[f.jsxs("div",{children:[f.jsx("h2",{children:"Wissensgraph"}),f.jsx("p",{children:"Aus den indizierten Wiki-Links; keine berechneten Ersatzknoten."})]}),f.jsxs("label",{children:["Tiefe ",f.jsxs("select",{value:i,onChange:v=>a(Number(v.target.value)),children:[f.jsx("option",{value:0,children:"Nur Fokus"}),f.jsx("option",{value:1,children:"1 Hop"}),f.jsx("option",{value:2,children:"2 Hops"}),f.jsx("option",{value:3,children:"3 Hops"})]})]}),f.jsxs("label",{children:["LOD ",f.jsxs("select",{value:s,onChange:v=>r(Number(v.target.value)),children:[f.jsx("option",{value:60,children:"Kompakt (60)"}),f.jsx("option",{value:120,children:"Standard (120)"}),f.jsx("option",{value:300,children:"Detail (300)"})]})]})]}),p&&f.jsx("p",{className:"notes-conflict",role:"alert",children:p}),!p&&o&&f.jsxs("p",{className:"knowledge-graph__coverage",role:"status",children:[o.coverage.selected," von ",o.coverage.notesInScope," Notizen · ",o.edges.length," Verweise",o.coverage.truncated?" · für diese LOD begrenzt":""]}),f.jsxs("div",{className:"knowledge-graph__body",children:[f.jsxs("ol",{className:"knowledge-graph__list","aria-label":"Graphknoten, Pfeiltasten wählen, Eingabe öffnen",children:[m.map((v,S)=>{var x;return f.jsx("li",{children:f.jsxs("button",{type:"button",className:S===c?"on":"",onFocus:()=>d(S),onClick:()=>n(v.path),children:[f.jsx("i",{style:{background:(x=o==null?void 0:o.groups.find(A=>A.name===v.group))==null?void 0:x.color}}),f.jsxs("span",{children:[f.jsx("strong",{children:v.title}),f.jsx("small",{children:v.path})]}),f.jsx("b",{children:v.inLinks+v.outLinks})]})},v.id)}),!m.length&&f.jsx("li",{className:"knowledge-graph__empty",children:"Keine Knoten für diese Auswahl."})]}),f.jsx("aside",{className:"knowledge-graph__inspector","aria-live":"polite",children:g?f.jsxs(f.Fragment,{children:[f.jsx("h3",{children:"Inspector"}),f.jsx("strong",{children:g.title}),f.jsx("code",{children:g.path}),f.jsxs("dl",{children:[f.jsxs("div",{children:[f.jsx("dt",{children:"Typ"}),f.jsx("dd",{children:g.properties.typ??"—"})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Status"}),f.jsx("dd",{children:g.properties.stand??"—"})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Tags"}),f.jsx("dd",{children:g.properties.tags.map(v=>`#${v}`).join(" ")||"—"})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Verweise"}),f.jsxs("dd",{children:[g.outLinks," hinaus · ",g.inLinks," herein"]})]})]}),f.jsx("button",{type:"button",className:"primary",onClick:()=>n(g.path),children:"Notiz öffnen"}),b.length>0&&f.jsxs("section",{children:[f.jsx("h4",{children:"Verknüpft"}),b.map(v=>f.jsx("button",{type:"button",onClick:()=>n(v.path),children:v.title},v.id))]})]}):f.jsx("p",{children:"Wähle einen Knoten aus der Liste."})})]})]})}function d2({workspaceId:t,onOpenSource:e,onOpenRevision:n,onOpenAgentRun:i}){const[a,s]=J.useState([]),[r,o]=J.useState(null),[l,c]=J.useState(""),[d,p]=J.useState(""),[u,m]=J.useState(""),[g,b]=J.useState([]),[_,h]=J.useState([]),[v,S]=J.useState(!1),[x,A]=J.useState(""),[R,T]=J.useState(""),[M,C]=J.useState(null),[w,U]=J.useState("editor"),[O,k]=J.useState("notiz"),[P,z]=J.useState("entwurf"),B=J.useRef(null),I=async()=>{const W=await z3(t);return s(W),W},L=async W=>{S(!0),T(""),A("");try{const De=await Xd(t,W);o(De),c(De.content),h(await B3(t,De.path))}catch(De){A(De instanceof Error?De.message:String(De))}finally{S(!1)}};J.useEffect(()=>{I().then(W=>{if(W[0])return L(W[0].path)}).catch(W=>A(String(W)))},[t]);const V=J.useMemo(()=>[...new Set(a.flatMap(W=>W.tags||[]))].sort(),[a]),re=J.useMemo(()=>a.filter(W=>{var De;return!d||((De=W.tags)==null?void 0:De.includes(d))}),[a,d]),ce=async()=>{if(!(!r||v)){S(!0),T(""),A("");try{const W=r.content,De=await Zv(t,r.path,l,r.hash||void 0,void 0,r.hash==="");C({path:r.path,content:W,savedHash:De.hash});const Be=await Xd(t,r.path);o(Be),c(Be.content),await I(),A(De.created?"Notiz angelegt und im Brain indiziert.":"Gespeichert und im Brain indiziert.")}catch(W){T(W!=null&&W.conflict?`${W.message} Bitte neu laden und die Änderungen zusammenführen.`:""),A(W!=null&&W.conflict?"":W instanceof Error?W.message:String(W))}finally{S(!1)}}},_e=async()=>{if(!(!M||!r||M.path!==r.path||v)){S(!0),T("");try{await Zv(t,M.path,M.content,M.savedHash);const W=await Xd(t,M.path);o(W),c(W.content),C(null),await I(),A("Letzte Speicherung rückgängig gemacht.")}catch(W){T(W!=null&&W.conflict?`${W.message} Rückgängig wurde nicht erzwungen.`:""),A(W!=null&&W.conflict?"":String(W))}finally{S(!1)}}},ke=()=>{var dt,ut;const W=new Date().toISOString().replace(/[-:.TZ]/g,"").slice(0,14),De=((ut=(dt=globalThis.crypto)==null?void 0:dt.randomUUID)==null?void 0:ut.call(dt).slice(0,8))??Math.random().toString(36).slice(2,10),Be=O==="notiz"?"notiz":O,je=O==="entscheidung"?"Entscheidung":O==="widerspruch"?"Widerspruch":"Notiz",qe=`Notizen/${je}-${W}-${De}.md`,Ze=O==="notiz"?"":`---
typ: ${Be}
stand: ${P}
bezug: 
code: 
revision: 
agentenlauf: 
---

`,xt={path:qe,title:`Neue ${je}`,typ:Be,stand:P,tags:[],inLinks:0,outLinks:0,content:`${Ze}# Neue ${je}

`,hash:"",properties:[],links:[],backlinks:[]};o(xt),c(xt.content),h([]),T(""),A("Neue Notiz: Namen oder Inhalt bearbeiten und speichern.")},Je=async W=>{if(!(!W||!r)){S(!0),A("");try{const De=await F3(t,r.path,W);h(Be=>[...Be.filter(je=>je.name!==De.name),De].sort((je,qe)=>je.name.localeCompare(qe.name))),A(`Anhang ${De.name} gespeichert.`)}catch(De){A(De instanceof Error?De.message:String(De))}finally{S(!1),B.current&&(B.current.value="")}}},He=async W=>{if(W.preventDefault(),!!u.trim()){S(!0),A("");try{b((await $y(t,u.trim())).hits)}catch(De){A(De instanceof Error?De.message:String(De))}finally{S(!1)}}},se=W=>{var De;return((De=r==null?void 0:r.properties.find(Be=>Be.key.toLowerCase()===W))==null?void 0:De.value.trim())||null},ge=se("bezug"),he=se("code"),Te=se("revision"),Ie=se("agentenlauf");return f.jsxs("main",{className:"notes-workbench",children:[f.jsxs("aside",{className:"notes-sidebar",children:[f.jsxs("div",{className:"notes-sidebar__head",children:[f.jsx("strong",{children:"Wissen"}),f.jsxs("span",{children:[f.jsx("button",{type:"button",className:w==="editor"?"on":"",onClick:()=>U("editor"),children:"Editor"}),f.jsx("button",{type:"button",className:w==="graph"?"on":"",onClick:()=>U("graph"),children:"Graph"})]})]}),f.jsxs("div",{className:"notes-create",children:[f.jsxs("select",{"aria-label":"Typ der neuen Wissensnotiz",value:O,onChange:W=>k(W.target.value),children:[f.jsx("option",{value:"notiz",children:"Notiz"}),f.jsx("option",{value:"entscheidung",children:"Entscheidung"}),f.jsx("option",{value:"widerspruch",children:"Widerspruch"})]}),O!=="notiz"&&f.jsxs("select",{"aria-label":"Status der neuen Wissensnotiz",value:P,onChange:W=>z(W.target.value),children:[f.jsx("option",{value:"entwurf",children:"Entwurf"}),f.jsx("option",{value:"offen",children:"Offen"}),f.jsx("option",{value:"entschieden",children:"Entschieden"}),f.jsx("option",{value:"geklärt",children:"Geklärt"})]}),f.jsx("button",{type:"button",onClick:ke,children:"Neu"})]}),f.jsxs("form",{className:"notes-search",onSubmit:He,children:[f.jsx("input",{value:u,onChange:W=>m(W.target.value),placeholder:"Volltext suchen …"}),f.jsx("button",{disabled:v,children:"Suchen"})]}),f.jsxs("div",{className:"notes-tags",children:[f.jsx("button",{type:"button",className:d?"":"on",onClick:()=>p(""),children:"Alle"}),V.map(W=>f.jsxs("button",{type:"button",className:d===W?"on":"",onClick:()=>p(W),children:["#",W]},W))]}),g.length>0&&f.jsx("div",{className:"notes-results",children:g.map(W=>f.jsxs("button",{type:"button",onClick:()=>void L(W.path),children:[f.jsx("strong",{children:W.title}),f.jsxs("span",{children:[W.path,W.line?`:${W.line}`:""]}),W.snippet&&f.jsx("small",{children:W.snippet})]},`${W.path}:${W.line}`))}),f.jsx("div",{className:"notes-list",children:re.map(W=>f.jsxs("button",{type:"button",className:(r==null?void 0:r.path)===W.path?"on":"",onClick:()=>void L(W.path),children:[f.jsx("strong",{children:W.title}),f.jsx("span",{children:W.path}),f.jsxs("small",{children:[(W.tags||[]).map(De=>`#${De}`).join(" ")," ",W.inLinks?`←${W.inLinks}`:""]})]},W.path))})]}),f.jsxs("section",{className:"notes-editor",children:[w==="graph"&&f.jsx(f2,{workspaceId:t,focus:r==null?void 0:r.path,onOpenNote:W=>{U("editor"),L(W)}}),w==="editor"&&(r?f.jsxs(f.Fragment,{children:[f.jsxs("header",{className:"notes-editor__head",children:[f.jsxs("div",{children:[f.jsx("strong",{children:r.title}),f.jsx("span",{children:r.path}),r.typ&&f.jsxs("small",{children:[r.typ,r.stand?` · ${r.stand}`:""]})]}),f.jsxs("div",{children:[f.jsx("a",{href:Kv(t,r.path),children:"Notiz exportieren"}),f.jsx("a",{href:Kv(t),children:"Vault exportieren"}),f.jsx("button",{type:"button",disabled:v||!M||M.path!==r.path,onClick:()=>void _e(),children:"Rückgängig"}),f.jsx("button",{type:"button",className:"primary",disabled:v,onClick:()=>void ce(),children:"Speichern"})]})]}),R&&f.jsx("p",{className:"notes-conflict",role:"alert",children:R}),x&&f.jsx("p",{className:"notes-notice",role:"status",children:x}),f.jsx("textarea",{"aria-label":"Notizinhalt",value:l,onChange:W=>c(W.target.value),spellCheck:!1}),f.jsxs("footer",{className:"notes-editor__meta",children:[f.jsxs("section",{children:[f.jsx("h3",{children:"Links"}),r.links.length?r.links.map(W=>f.jsxs("button",{type:"button",disabled:!W.path,onClick:()=>W.path&&void L(W.path),children:[W.alias||W.target,W.path?"":" (nicht aufgelöst)"]},`${W.target}:${W.line}`)):f.jsx("span",{children:"Keine Wiki-Links."})]}),f.jsxs("section",{children:[f.jsx("h3",{children:"Backlinks"}),r.backlinks.length?r.backlinks.map(W=>f.jsxs("button",{type:"button",onClick:()=>void L(W.path),children:["← ",W.title," · Zeile ",W.line]},`${W.path}:${W.line}`)):f.jsx("span",{children:"Keine Rückverweise."})]}),(ge||he||Te||Ie)&&f.jsxs("section",{children:[f.jsx("h3",{children:"Verknüpfungen"}),ge&&f.jsxs("button",{type:"button",onClick:()=>void L(ge.replace(/^\[\[|\]\]$/g,"")),children:["Entscheidung/Widerspruch: ",ge]}),he&&f.jsxs("button",{type:"button",disabled:!e,onClick:()=>e==null?void 0:e(he),children:["Datei: ",he]}),Te&&f.jsxs("button",{type:"button",disabled:!n,onClick:()=>n==null?void 0:n(Te),children:["Revision: ",Te]}),Ie&&f.jsxs("button",{type:"button",disabled:!i,onClick:()=>i==null?void 0:i(Ie),children:["Agentenlauf: ",Ie]})]}),f.jsxs("section",{children:[f.jsx("h3",{children:"Anhänge"}),f.jsx("input",{ref:B,type:"file",hidden:!0,onChange:W=>{var De;return void Je((De=W.target.files)==null?void 0:De[0])}}),f.jsx("button",{type:"button",disabled:v||r.hash==="",title:r.hash===""?"Die Notiz zuerst speichern":void 0,onClick:()=>{var W;return(W=B.current)==null?void 0:W.click()},children:"Datei anhängen"}),r.hash===""&&f.jsx("span",{children:"Notiz zuerst speichern."}),_.map(W=>f.jsxs("a",{href:H3(t,r.path,W.name),children:[W.name," · ",W.bytes," B"]},W.path))]})]})]}):f.jsx("p",{className:"notes-empty",children:"Keine Notiz im gewählten Vault."}))]})]})}function h2(t){const e=[],n=t.split(`
`);for(const i of n){const a=i.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/);a&&e.push({path:a[1],reasons:a[2]})}return e}function p2({workspaceId:t,onSelectSource:e}){const[n,i]=J.useState(()=>new URLSearchParams(window.location.search).get("goal")||"authKey security tests"),[a,s]=J.useState(!1),[r,o]=J.useState(""),[l,c]=J.useState(null),[d,p]=J.useState(null),[u,m]=J.useState(!1),[g,b]=J.useState(!1);J.useEffect(()=>{const S=new URLSearchParams(window.location.search).get("goal");S&&t&&(s(!0),Yv(t,S).then(x=>{c(x),x.id&&h(x.id)}).catch(x=>o((x==null?void 0:x.message)||"Fehler beim Erzeugen")).finally(()=>s(!1)))},[t]);const _=async S=>{S&&S.preventDefault();const x=n.trim();if(x){s(!0),o(""),c(null),p(null);try{const A=await Yv(t,x);c(A),A.id&&h(A.id)}catch(A){o((A==null?void 0:A.message)||"Fehler beim Erzeugen des Context Packs")}finally{s(!1)}}},h=async S=>{m(!0);try{const x=await L3(S);p(x)}catch(x){console.error("Staleness check error:",x)}finally{m(!1)}},v=l!=null&&l.body?h2(l.body):[];return f.jsxs("div",{className:"pack-view",children:[f.jsx("div",{className:"pack-view__header",children:f.jsxs("div",{className:"pack-view__title",children:[f.jsx("span",{className:"pack-view__icon",children:"📦"}),f.jsx("strong",{children:"Context-Pack-Inspector"}),f.jsx("span",{className:"pack-view__endpoint mono",children:"/api/context/pack"})]})}),f.jsx("form",{className:"pack-form",onSubmit:_,children:f.jsxs("div",{className:"pack-form__field",children:[f.jsx("label",{htmlFor:"pack-goal-input",children:"Aufgabe / Ziel für den Agenten:"}),f.jsxs("div",{className:"pack-input-row",children:[f.jsx("input",{id:"pack-goal-input",type:"text",className:"pack-input",value:n,onChange:S=>i(S.target.value),placeholder:"z. B. authKey security tests"}),f.jsx("button",{type:"submit",className:"pack-create-btn",disabled:a||!n.trim(),children:a?"Erzeuge …":"Pack erzeugen"})]})]})}),r&&f.jsxs("div",{className:"pack-error-alert",role:"alert",children:["⚠️ ",r]}),l&&f.jsx("div",{className:"pack-details",children:f.jsxs("div",{className:"pack-card",children:[f.jsxs("div",{className:"pack-card__header",children:[f.jsxs("div",{className:"pack-card__meta",children:[f.jsx("span",{className:"pack-id mono",children:l.id}),f.jsxs("span",{className:"pack-badge pack-badge--version",children:["v",l.version]}),f.jsxs("span",{className:"pack-badge pack-badge--sources",children:[l.sources," Quellen"]})]}),f.jsxs("div",{className:"pack-card__staleness",children:[u?f.jsx("span",{className:"pack-staleness-badge pack-staleness-badge--loading",children:"Prüfe …"}):d?f.jsx("span",{className:`pack-staleness-badge ${d.stale?"pack-staleness-badge--stale":"pack-staleness-badge--fresh"}`,children:d.stale?"🔴 Veraltet":"🟢 Frisch"}):null,f.jsx("button",{type:"button",className:"pack-staleness-btn",onClick:()=>h(l.id),disabled:u,title:"Staleness gegen aktuellen Brain-Index prüfen",children:"Neu prüfen"})]})]}),d&&d.stale&&f.jsxs("div",{className:"pack-stale-warning",children:[f.jsx("strong",{children:"Quellen haben sich geändert:"}),d.changed.length>0&&f.jsxs("div",{children:["Geändert: ",d.changed.join(", ")]}),d.missing.length>0&&f.jsxs("div",{children:["Fehlt: ",d.missing.join(", ")]})]}),f.jsxs("div",{className:"pack-sources-section",children:[f.jsx("h4",{children:"Extrahierte Quellen aus dem Index:"}),v.length===0?f.jsx("div",{className:"pack-sources-empty",children:"Keine spezifischen Quelltreffer für dieses Ziel gefunden."}):f.jsx("div",{className:"pack-sources-list",children:v.map(S=>f.jsxs("div",{className:"pack-source-item",onClick:()=>e(S.path),title:`Klicken, um ${S.path} in Quellansicht zu öffnen`,children:[f.jsxs("div",{className:"pack-source-path mono",children:["📄 ",S.path]}),f.jsx("div",{className:"pack-source-why",children:S.reasons})]},S.path))})]}),f.jsx("div",{className:"pack-body-toggle",children:f.jsx("button",{type:"button",className:"pack-toggle-raw-btn",onClick:()=>b(S=>!S),children:g?"Markdown-Text verbergen":"Vollständigen Pack-Markdown anzeigen"})}),g&&f.jsx("div",{className:"pack-raw-markdown mono",children:f.jsx("pre",{children:l.body})})]})})]})}const tM=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"notes",label:"Wissen",hint:"Notizen, Links, Backlinks, Tags und Anhänge"},{id:"explorer",label:"Explorer",hint:"Echter Quellbaum aus dem Brain"},{id:"search",label:"Suche",hint:"Code- & Symbolsuche über /api/agent/search"},{id:"packs",label:"Packs",hint:"Context-Pack-Inspector"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Nachweisbare Arbeit und Übergaben aus dem Core-Trace"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],Yd=Xy,m2=2e3;function g2(){const t=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=t||e;return tM.some(i=>i.id===n)?n:"atlas"}function v2(){const t=new URLSearchParams(location.search);return t.has("workspace")?t.get("workspace")??"":t.has("workspaceRoot")?"":p3()}function _2(){var Fe,G,me;const[t,e]=J.useState(null),[n,i]=J.useState(null),[a,s]=J.useState({depth:0,tasks:[]}),[r,o]=J.useState(""),[l,c]=J.useState(0),[d,p]=J.useState(g2),[u,m]=J.useState(v2),g=J.useMemo(()=>{const D=new URLSearchParams(location.search);return D.has("workspace")?null:D.get("workspaceRoot")},[]),[b,_]=J.useState([]),[h,v]=J.useState(!1),[S,x]=J.useState(""),[A,R]=J.useState(!1),[T,M]=J.useState(""),[C,w]=J.useState(""),[U,O]=J.useState(""),[k,P]=J.useState(null),[z,B]=J.useState(null),[I,L]=J.useState(!1),[V,re]=J.useState([]),[ce,_e]=J.useState(()=>{const D=new URLSearchParams(location.search).get("file"),F=Number(new URLSearchParams(location.search).get("line"));return D?{path:D,line:Number.isFinite(F)?F:null}:null}),[ke,Je]=J.useState(null),[He,se]=J.useState(null),[ge,he]=J.useState(!1),[Te,Ie]=J.useState(Zy()),[W,De]=J.useState(Gi()),[Be,je]=J.useState(!1),[qe,Ze]=J.useState(null),[xt,dt]=J.useState([]),[ut,It]=J.useState(!1),[wt,Se]=J.useState("");J.useEffect(()=>{try{localStorage.setItem("plugbrain.view",d)}catch{}},[d]),J.useEffect(()=>{d==="mesh"&&(L(!1),B(null))},[d]);const H=J.useRef(null);J.useEffect(()=>{H.current=z},[z]);const et=D=>{m(D),m3(D);const F=new URL(location.href);D?F.searchParams.set("workspace",D):F.searchParams.delete("workspace"),D&&F.searchParams.delete("workspaceRoot"),history.replaceState(null,"",F.toString())};J.useEffect(()=>{if(!u)return;let D=!0;return fetch(`/api/graph?workspace=${encodeURIComponent(u)}&limit=5000`).then(F=>F.json()).then(F=>{if(!D||!(F!=null&&F.nodes))return;const le=F.nodes.filter(Q=>{var xe;return Q.type==="file"&&(Q.path||((xe=Q.properties)==null?void 0:xe.path))}).map(Q=>{var xe,Me,Ke,gt;return{id:Q.id,path:Q.path||((xe=Q.properties)==null?void 0:xe.path),label:Q.label||Q.path,lang:Q.lang||((Me=Q.properties)==null?void 0:Me.lang),loc:Q.loc??((Ke=Q.properties)==null?void 0:Ke.lines)??0,agent:Q.agent||((gt=Q.properties)!=null&&gt.agentId?{id:Q.properties.agentId,name:Q.properties.agentName,color:Q.properties.agentColor}:null)}});re(le)}).catch(()=>{}),()=>{D=!1}},[u,l]),J.useEffect(()=>{let D=!0;return Wv().then(F=>{if(D){if(_(F),!u&&g!==null){const le=g3(F,g);le&&et(le);return}if(!u&&F.length>0){const le=[...F].sort((Q,xe)=>(xe.indexedAt??"").localeCompare(Q.indexedAt??""))[0];le&&et(le.id)}}}).catch(()=>{D&&M("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{D=!1}},[]);const Xe=async D=>{D.preventDefault();const F=S.trim();if(F!==""){R(!0),M(""),w(""),O("Vault registriert — Indexlauf wird vorbereitet …");try{const le=await v3(F,void 0,Q=>O(Ip(Q)));Wv().then(Q=>{Q.length>0&&_(Q)}).catch(()=>{}),w("Vault registriert und indiziert."),x(""),v(!1),et(le),c(Q=>Q+1)}catch(le){M(le instanceof Error?le.message:String(le))}finally{R(!1),O("")}}},N=async()=>{if(!(!u||A)){R(!0),M(""),w(""),O("Indexlauf wird vorbereitet …");try{const D=await qy(u,F=>O(Ip(F)));w(`Neu indiziert: ${(D==null?void 0:D.files)??0} Dateien, ${(D==null?void 0:D.symbols)??0} Symbole, ${(D==null?void 0:D.edges)??0} Kanten.`),c(F=>F+1)}catch(D){M(D instanceof Error?D.message:String(D))}finally{R(!1),O("")}}};J.useEffect(()=>{if(!u)return;let D=!0,F;const le=async()=>{try{const Q=await fetch(`/api/index/progress?workspace=${encodeURIComponent(u)}`);if(Q.ok){const xe=await Q.json();if(!D)return;O(Me=>_3(xe,Me))}}catch{}D&&(F=setTimeout(()=>void le(),1500))};return le(),()=>{D=!1,clearTimeout(F)}},[u]);const y=D=>{D.preventDefault(),Ky(Te.trim()),b3(W.trim()),N3(),c(F=>F+1),he(!1)},X=async()=>{if(!(!u||ut)){It(!0),Se("");try{const D=await E3(u);Ze(D),dt([...D.indexSelection.checkoutIds]),je(!0)}catch(D){Se(D instanceof Error?D.message:String(D)),je(!0)}finally{It(!1)}}},Z=D=>{dt(F=>F.includes(D)?F.filter(le=>le!==D):[...F,D])},te=async D=>{if(D.preventDefault(),!(!u||ut)){It(!0),Se("");try{const F=await T3(u,xt);Ze(F),dt([...F.indexSelection.checkoutIds]),w(F.indexSelection.checkoutIds.length===0?"Code-Auswahl gespeichert: bewusst keine Code-Checkouts aktiv.":`Code-Auswahl gespeichert: ${F.indexSelection.checkoutIds.length} Checkout(s) aktiv.`),je(!1),c(le=>le+1)}catch(F){Se(F instanceof Error?F.message:String(F))}finally{It(!1)}}},de=f.jsxs("form",{className:"brain-vault",onSubmit:Xe,children:[f.jsxs("div",{className:"brain-vault__row",children:[f.jsx("input",{className:"brain-vault__path",value:S,onChange:D=>x(D.target.value),placeholder:"Pfad eines Ordners (auch ohne .git), z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),f.jsx("button",{type:"submit",className:"brain-vault__open",disabled:A||S.trim()==="",children:A?"Indiziere …":"Als Vault öffnen"})]}),u&&f.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:f.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:A,onClick:()=>void N(),children:A?"läuft …":"Neu indizieren"})}),U&&f.jsx("p",{className:"brain-vault__progress",role:"status","aria-live":"polite",children:U}),T&&f.jsx("p",{className:"brain-vault__error",role:"alert",children:T}),C&&f.jsx("p",{className:"brain-vault__done",role:"status",children:C})]});J.useEffect(()=>{const D=u||void 0;fetch("/api/timeline"+(D?"?workspace="+encodeURIComponent(D):"")).then(F=>F.json()).then(F=>{var le;(le=F==null?void 0:F.bounds)!=null&&le.first&&P(F.bounds)}).catch(()=>{})},[u]),J.useEffect(()=>{if(!I||!k)return;const D=new Date(k.first).getTime(),F=new Date(k.last).getTime(),le=Math.max(1,F-D);let Q=z?Math.round((new Date(z).getTime()-D)/le*60):0;const xe=setInterval(()=>{if(Q+=1,Q>=60){B(null),L(!1);return}B(new Date(D+le*Q/60).toISOString())},220);return()=>clearInterval(xe)},[I,k]),J.useEffect(()=>{const D=new AbortController;let F,le="";const Q=u||void 0;async function xe(){var Me,Ke,gt;try{const bt=new URLSearchParams;Q&&bt.set("workspace",Q),bt.set("limit",String(m2)),H.current&&bt.set("until",H.current);const Bt=await fetch("/api/atlas/snapshot"+(bt.toString()?`?${bt}`:""),{signal:D.signal});if(!Bt.ok)throw new Error(`Brain-Verbindung: HTTP ${Bt.status}`);const ci=await Bt.json();if(!((Me=ci.workspace)!=null&&Me.canonicalPath)||!Array.isArray((Ke=ci.graph)==null?void 0:Ke.nodes)||!Array.isArray((gt=ci.graph)==null?void 0:gt.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const ui=`${ci.workspace.id}:${ci.updatedAt??""}:${ci.graph.nodes.length}:${ci.graph.edges.length}`;ui!==le&&(e(ci),le=ui),o("")}catch(bt){D.signal.aborted||o(bt instanceof Error?bt.message:String(bt))}if(Q)try{const bt=await A3(Q);D.signal.aborted||i(bt)}catch{D.signal.aborted||i(null)}else D.signal.aborted||i(null);try{const bt=await fetch("/api/queue"+(Q?"?workspace="+encodeURIComponent(Q):""),{signal:D.signal});if(bt.ok){const Bt=await bt.json();(Bt==null?void 0:Bt.ok)===!0&&Array.isArray(Bt.tasks)&&s({depth:Number(Bt.depth??0),tasks:Bt.tasks})}}catch{}D.signal.aborted||(F=setTimeout(xe,3e3))}return xe(),()=>{D.abort(),clearTimeout(F)}},[l,z,u]);const ve=(t==null?void 0:t.graph.nodes.length)??V.length,ne=(t==null?void 0:t.graph.edges.length)??0,q=t!=null&&t.coverage?!t.coverage.indexComplete:!1,ie=r?"getrennt (offline)":t||V.length>0?q?`${((Fe=t==null?void 0:t.coverage)==null?void 0:Fe.staleFiles)??0} Datei(en) warten auf den Index`:"live":"lädt …",fe=J.useMemo(()=>{var D;return V.length>0?V:(D=t==null?void 0:t.graph)!=null&&D.nodes?t.graph.nodes.filter(F=>{var le;return F.type==="file"&&(((le=F.properties)==null?void 0:le.path)||F.path)}).map(F=>{var Q,xe,Me,Ke;const le=((Q=F.properties)==null?void 0:Q.path)||F.path||"";return{id:F.id,path:le,label:F.label||F.name||le,lang:((xe=F.properties)==null?void 0:xe.lang)??F.lang??null,loc:((Me=F.properties)==null?void 0:Me.lines)??F.loc??0,agent:(Ke=F.properties)!=null&&Ke.agentId?{id:F.properties.agentId,name:F.properties.agentName||F.properties.agentId,color:F.properties.agentColor||"#60a5fa"}:null}}):[]},[V,t]),oe=(D,F)=>{D&&(Je(null),_e({path:D,line:F}))},pe=D=>{oe(D),p("explorer")},Re=D=>{_e(null),Je(D),p("explorer")},Ue=D=>{se(D),p("mesh")};return f.jsxs(f.Fragment,{children:[r&&f.jsx("div",{className:"brain-offline-banner",role:"alert",children:f.jsxs("div",{className:"brain-offline-banner__inner",children:[f.jsx("span",{className:"brain-offline-badge",children:"OFFLINE"}),f.jsxs("span",{className:"brain-offline-text",children:[f.jsx("strong",{children:"Server nicht erreichbar:"})," ",r," — läuft ",f.jsx("code",{children:"plugbrain serve"}),"?"]}),f.jsx("button",{type:"button",className:"brain-offline-btn",onClick:()=>c(D=>D+1),children:"Erneut verbinden"})]})}),f.jsxs("div",{className:"live-status",role:"status",children:[f.jsx("strong",{className:"live-status__name",title:(t==null?void 0:t.workspace.canonicalPath)??"",children:t?Yd(t.workspace.name):((G=b.find(D=>D.id===u))==null?void 0:G.name)||"PlugBrain"}),u&&b.length>0&&f.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:f.jsx("select",{value:u,onChange:D=>{const F=D.target.value;F&&et(F)},children:b.map(D=>f.jsx("option",{value:D.id,children:Yd(D.name)},D.id))})}),u&&f.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{v(D=>!D),M(""),w("")},title:"Einen Ordner als neuen Vault öffnen",children:h?"Schließen":"Vault öffnen"}),u&&f.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>void X(),disabled:ut,title:"Aktive Code-Checkouts aus dem Planet-Inventar auswählen",children:ut?"Lade Code …":"Code-Auswahl"}),f.jsxs("span",{className:"live-status__figures",children:[f.jsx("b",{children:ve})," Objekte ",f.jsx("b",{children:ne})," Kanten",(t==null?void 0:t.coverage)&&t.coverage.totalFiles>t.coverage.shownFiles&&f.jsxs("span",{className:"live-status__sample",title:`Ausschnitt: ${t.coverage.shownFiles} von ${t.coverage.totalFiles} Dateien des Index`,children:[" ","· Ausschnitt aus ",t.coverage.totalFiles," Dateien"]})]}),f.jsx("span",{className:r?"live-status__state is-bad":"live-status__state",children:ie}),f.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:tM.map(D=>f.jsx("button",{type:"button",title:D.hint,className:D.id===d?"on":void 0,"aria-pressed":D.id===d,onClick:()=>{p(D.id)},children:D.label},D.id))}),f.jsx("button",{type:"button",className:"brain-auth-btn",onClick:()=>he(!0),title:"Auth-Token konfigurieren",children:"🔑 Auth"}),r&&f.jsx("button",{type:"button",onClick:()=>c(D=>D+1),children:"Erneut verbinden"})]}),ge&&f.jsx("div",{className:"brain-modal-backdrop",onClick:()=>he(!1),children:f.jsxs("div",{className:"brain-modal",onClick:D=>D.stopPropagation(),children:[f.jsxs("div",{className:"brain-modal__header",children:[f.jsx("h3",{children:"PlugBrain Authentifizierung"}),f.jsx("button",{type:"button",className:"brain-modal__close",onClick:()=>he(!1),children:"✕"})]}),f.jsxs("form",{onSubmit:y,children:[f.jsxs("div",{className:"brain-modal__field",children:[f.jsxs("label",{children:["Bearer Token (aus ",f.jsx("code",{children:"auth.token"}),"):"]}),f.jsx("input",{type:"text",className:"brain-modal__input mono",value:Te,onChange:D=>Ie(D.target.value),placeholder:"plug-..."})]}),f.jsxs("div",{className:"brain-modal__field",children:[f.jsx("label",{children:"Agent ID:"}),f.jsx("input",{type:"text",className:"brain-modal__input mono",value:W,onChange:D=>De(D.target.value),placeholder:"agy"})]}),f.jsxs("div",{className:"brain-modal__actions",children:[f.jsx("button",{type:"button",onClick:()=>he(!1),children:"Abbrechen"}),f.jsx("button",{type:"submit",className:"primary",children:"Speichern"})]})]})]})}),Be&&f.jsx("div",{className:"brain-modal-backdrop",onClick:()=>!ut&&je(!1),children:f.jsxs("div",{className:"brain-modal brain-selection-modal",onClick:D=>D.stopPropagation(),children:[f.jsxs("div",{className:"brain-modal__header",children:[f.jsx("h3",{children:"Aktive Code-Checkouts"}),f.jsx("button",{type:"button",className:"brain-modal__close",disabled:ut,onClick:()=>je(!1),children:"✕"})]}),f.jsx("p",{className:"brain-selection-modal__hint",children:"Das Inventar bleibt vollständig sichtbar. Nur die hier bewusst markierten Checkout-IDs werden beim nächsten Scan als aktiver Code indexiert."}),f.jsxs("form",{onSubmit:te,children:[wt&&f.jsx("p",{className:"brain-vault__error",role:"alert",children:wt}),qe===null?f.jsx("p",{className:"brain-selection-modal__hint",children:"Planet-Inventar wird geladen …"}):qe.checkouts.length===0?f.jsx("p",{className:"brain-selection-modal__hint",children:"Dieser Workspace hat keine discoverbaren Code-Checkouts."}):f.jsxs("fieldset",{className:"brain-selection-list",disabled:ut,children:[f.jsx("legend",{children:"Checkout-Inventar"}),qe.checkouts.map(D=>f.jsxs("label",{className:D.retiredAt?"is-retired":void 0,children:[f.jsx("input",{type:"checkbox",checked:xt.includes(D.id),disabled:D.retiredAt!==null,onChange:()=>Z(D.id)}),f.jsxs("span",{children:[f.jsx("strong",{children:D.relPrefix}),f.jsxs("small",{children:[D.id," · ",D.branch??"detached",D.retiredAt?" · retired":""]})]})]},D.id))]}),f.jsx("p",{className:"brain-selection-modal__hint",children:"Keine Auswahl ist ausdrücklich „notes only“; sie startet keinen leeren Code-Scan."}),f.jsxs("div",{className:"brain-modal__actions",children:[f.jsx("button",{type:"button",disabled:ut,onClick:()=>je(!1),children:"Abbrechen"}),f.jsx("button",{type:"submit",className:"primary",disabled:ut||qe===null,children:ut?"Speichert …":"Auswahl speichern"})]})]})]})}),k&&(d==="atlas"||d==="city")&&f.jsxs("div",{className:"brain-timelapse",children:[f.jsx("button",{type:"button",onClick:()=>L(D=>!D),title:"Wachstum abspielen",children:I?"❚❚":"▶"}),f.jsx("input",{type:"range",min:0,max:60,step:1,value:z&&k?Math.round((new Date(z).getTime()-new Date(k.first).getTime())/Math.max(1,new Date(k.last).getTime()-new Date(k.first).getTime())*60):60,onChange:D=>{L(!1);const F=Number(D.target.value);if(F>=60){B(null);return}const le=new Date(k.first).getTime(),Q=new Date(k.last).getTime();B(new Date(le+(Q-le)*F/60).toISOString())}}),f.jsx("span",{children:z?new Date(z).toLocaleTimeString():"jetzt"})]}),h&&u&&de,u?f.jsxs("div",{className:"brain-workspace-layout",children:[d==="atlas"&&(t&&ve>0?f.jsxs("div",{className:"atlas-wrapper",children:[f.jsx(y2,{graph:t.graph,onOpenSource:oe}),ce&&f.jsx("div",{className:"atlas-source-overlay",children:f.jsx(Rr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>_e(null)})})]}):f.jsx("div",{className:"brain-empty",children:r?f.jsxs("div",{className:"brain-empty--offline-box",children:[f.jsx("div",{className:"offline-icon",children:"🔌"}),f.jsx("h3",{children:"Server getrennt (Offline-Zustand)"}),f.jsx("p",{children:"Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt."}),f.jsx("button",{type:"button",className:"btn primary",onClick:()=>c(D=>D+1),children:"Erneut verbinden"})]}):t?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …"})),d==="notes"&&f.jsx(d2,{workspaceId:u,onOpenSource:pe,onOpenRevision:Re,onOpenAgentRun:Ue}),d==="explorer"&&f.jsxs("div",{className:"workbench-split",children:[f.jsx("div",{className:"workbench-pane workbench-pane--side",children:f.jsx(c2,{workspaceName:(t==null?void 0:t.workspace.name)??(((me=b.find(D=>D.id===u))==null?void 0:me.name)||"Workspace"),files:fe,activePath:ce==null?void 0:ce.path,onSelectFile:D=>oe(D)})}),f.jsx("div",{className:"workbench-pane workbench-pane--main",children:ce?f.jsx(Rr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>_e(null)}):ke?f.jsx(x2,{workspaceId:u,revision:ke,onClose:()=>Je(null)}):f.jsxs("div",{className:"source-placeholder",children:[f.jsx("div",{className:"source-placeholder__icon",children:"📂"}),f.jsx("h3",{children:"Datei im Explorer auswählen"}),f.jsx("p",{children:"Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen."})]})})]}),d==="search"&&f.jsxs("div",{className:"workbench-split",children:[f.jsx("div",{className:"workbench-pane workbench-pane--side",children:f.jsx(u2,{workspaceId:u,onSelectHit:(D,F)=>oe(D,F)})}),f.jsx("div",{className:"workbench-pane workbench-pane--main",children:ce?f.jsx(Rr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>_e(null)}):f.jsxs("div",{className:"source-placeholder",children:[f.jsx("div",{className:"source-placeholder__icon",children:"🔍"}),f.jsxs("h3",{children:["Code- und Symbolsuche über ",f.jsx("code",{children:"/api/agent/search"})]}),f.jsxs("p",{children:["Gib einen Suchbegriff ein (z. B. ",f.jsx("code",{children:"authKey"}),"). Ein Klick auf einen Treffer öffnet direkt die Quelle."]})]})})]}),d==="packs"&&f.jsxs("div",{className:"workbench-split",children:[f.jsx("div",{className:"workbench-pane workbench-pane--side",children:f.jsx(p2,{workspaceId:u,onSelectSource:D=>oe(D)})}),f.jsx("div",{className:"workbench-pane workbench-pane--main",children:ce?f.jsx(Rr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>_e(null)}):f.jsxs("div",{className:"source-placeholder",children:[f.jsx("div",{className:"source-placeholder__icon",children:"📦"}),f.jsx("h3",{children:"Context-Pack-Inspector"}),f.jsx("p",{children:"Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen."})]})})]}),d==="city"&&f.jsxs("div",{className:"brain-view brain-view-city",children:[f.jsx(t2,{snapshot:t,onSelectFile:oe}),ce&&f.jsx("div",{className:"atlas-source-overlay",children:f.jsx(Rr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>_e(null),onNavigateFile:(D,F)=>oe(D,F)})})]}),d==="queue"&&f.jsx("div",{className:"brain-view brain-view-queue",children:f.jsx(a2,{tasks:a.tasks,depth:a.depth})}),d==="mesh"&&f.jsxs("div",{className:"brain-view brain-view-mesh",children:[f.jsx(i2,{mesh:n,workspaceId:u,onSelectFile:oe,focusAgentId:He}),ce&&f.jsx("div",{className:"atlas-source-overlay",children:f.jsx(Rr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>_e(null),onNavigateFile:(D,F)=>oe(D,F)})})]})]}):f.jsxs("div",{className:"brain-landing",role:"main",children:[f.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),f.jsxs("p",{className:"brain-landing__lead",children:["Einen Ordner als Vault öffnen — auch einen Wissensordner ohne ",f.jsx("code",{children:".git"}),". Der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."]}),de,b.length>0&&f.jsxs("div",{className:"brain-vault__known",children:[f.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),b.map(D=>f.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>et(D.id),children:[Yd(D.name)," ",f.jsx("em",{title:D.root,children:D.indexedAt?"indiziert":"nicht indiziert"})]},D.id))]})]})]})}function x2({workspaceId:t,revision:e,onClose:n}){var l;const[i,a]=J.useState(null),[s,r]=J.useState("");J.useEffect(()=>{let c=!0;return a(null),r(""),Qy(t).then(d=>{c&&a(d)}).catch(d=>{c&&r(d instanceof Error?d.message:String(d))}),()=>{c=!1}},[t,e]);const o=(l=i==null?void 0:i.commits)==null?void 0:l.find(c=>c.hash===e||c.hash.startsWith(e));return f.jsxs("section",{className:"source-placeholder revision-inspector","aria-live":"polite",children:[f.jsx("div",{className:"source-placeholder__icon",children:"⌁"}),f.jsx("h3",{children:"Revision-Inspector"}),f.jsx("p",{children:f.jsx("code",{children:e})}),s&&f.jsx("p",{role:"alert",children:s}),!s&&!i&&f.jsx("p",{children:"Prüfe die reale Git-Historie …"}),i&&!i.isRepo&&f.jsx("p",{children:"Dieser Wissensordner ist absichtlich kein Git-Workspace; für diese Revision gibt es keine Git-Historie."}),(i==null?void 0:i.isRepo)&&o&&f.jsxs("dl",{children:[f.jsxs("div",{children:[f.jsx("dt",{children:"Hash"}),f.jsx("dd",{children:f.jsx("code",{children:o.hash})})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Autor"}),f.jsx("dd",{children:o.author})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Zeit"}),f.jsx("dd",{children:o.date})]}),f.jsxs("div",{children:[f.jsx("dt",{children:"Nachricht"}),f.jsx("dd",{children:o.message})]})]}),(i==null?void 0:i.isRepo)&&!o&&f.jsx("p",{children:"Die geladene Historie enthält diese Revision nicht. Der Link bleibt unverändert; keine Ersatzrevision wird behauptet."}),f.jsx("button",{type:"button",onClick:n,children:"Inspector schließen"})]})}function S2(t,e){if(!e)return t;const n=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return t.split(n).map((i,a)=>a%2?f.jsx("mark",{children:i},a):i)}function y2({graph:t,onOpenSource:e}){const{CLUSTERS:n,nodes:i,edges:a,createAtlas:s}=J.useMemo(()=>h3(t),[t]),r=Object.fromEntries(n.map(L=>[L.id,i.filter(V=>V.cid===L.id).length])),o=J.useRef(null),l=J.useRef(null),c=J.useRef(null),d=J.useRef(null),p=J.useRef(null),u=J.useRef(null),m=J.useRef(null),g=J.useRef(null),b=J.useRef(null),_=J.useRef(null),h=J.useRef(null),v=J.useRef(null),S=J.useRef(null),[x,A]=J.useState(!1),[R,T]=J.useState({q:"",rows:[]}),[M,C]=J.useState({flow:!0,label:!0,spin:!1}),[w,U]=J.useState("atlas"),[O,k]=J.useState("dark"),[P,z]=J.useState([]),B=L=>{L!=null&&L.path&&e(L.path,L.line??null)};J.useEffect(()=>{const L=s({els:{stage:o.current,labels:l.current,hudMode:c.current,hudSel:d.current,pathbar:p.current,chain:u.current,zlvl:m.current,sNode:g.current,sEdge:b.current,sDeg:_.current,sFps:h.current,q:v.current},emit:{gate:A,list:T,drawer:B,tools:C,theme:k}});return S.current=L,()=>{L.dispose(),S.current=null}},[s]);const I=L=>{var V;z(re=>re.includes(L)?re.filter(ce=>ce!==L):[...re,L]),(V=S.current)==null||V.toggleCluster(L)};return f.jsxs("div",{id:"app",className:"atlas-app",children:[f.jsxs("aside",{children:[f.jsxs("div",{className:"brand",children:[f.jsxs("h1",{children:[f.jsx("span",{className:"dot"}),"PlugBrain"]}),f.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",f.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),f.jsxs("div",{className:"searchbox",children:[f.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[f.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),f.jsx("path",{d:"M10.5 10.5 14 14"})]}),f.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol im Graph suchen…",autoComplete:"off",spellCheck:!1,ref:v,onChange:L=>{var V;return(V=S.current)==null?void 0:V.setQuery(L.target.value)}})]}),f.jsx("div",{className:"legend",id:"legend",children:n.map(L=>f.jsxs("button",{className:"cl"+(P.includes(L.id)?" off":""),type:"button",onClick:()=>I(L.id),children:[f.jsx("i",{style:{background:L.color}}),L.name,f.jsx("b",{children:r[L.id]})]},L.id))}),f.jsx("div",{className:"listwrap",id:"list",children:R.rows.length?R.rows.map(L=>f.jsxs("div",{className:"lrow"+(L.on?" on":""),"data-i":L.i,onClick:()=>{var re,ce;(re=S.current)==null||re.selectAt(L.i);const V=i[L.i];(ce=V==null?void 0:V.meta)!=null&&ce.path&&e(V.meta.path,V.meta.line)},onMouseOver:()=>{var V;return(V=S.current)==null?void 0:V.hoverAt(L.i)},onMouseLeave:()=>{var V;return(V=S.current)==null?void 0:V.hoverAt(null)},children:[f.jsx("i",{style:{background:L.color}}),f.jsx("span",{children:S2(L.name,R.q)}),f.jsx("b",{children:L.deg})]},L.i)):f.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),f.jsxs("div",{className:"foot",children:[f.jsxs("div",{children:[f.jsx("div",{className:"k",id:"s-node",ref:g,children:"—"}),f.jsx("div",{className:"l",children:"Objekte"})]}),f.jsxs("div",{children:[f.jsx("div",{className:"k",id:"s-edge",ref:b,children:"—"}),f.jsx("div",{className:"l",children:"Kanten"})]}),f.jsxs("div",{children:[f.jsx("div",{className:"k",id:"s-deg",ref:_,children:"—"}),f.jsx("div",{className:"l",children:"Ø-Grad"})]}),f.jsxs("div",{children:[f.jsx("div",{className:"k",id:"s-fps",ref:h,children:"—"}),f.jsx("div",{className:"l",children:"FPS"})]})]})]}),f.jsxs("div",{id:"stage",ref:o,children:[f.jsx("div",{id:"labels",ref:l}),f.jsxs("div",{id:"hud",children:[f.jsx("div",{children:f.jsx("b",{id:"hud-mode",ref:c,children:"GALAXIE · FREIER ORBIT"})}),f.jsx("div",{id:"hud-sel",ref:d,children:"Knoten anklicken, um Quelle direkt zu öffnen"}),f.jsxs("div",{id:"hud-sys",children:[i.length," VON ",t.nodes.length," OBJEKTEN · ",a.length," VON ",t.edges.length," KANTEN"]})]}),f.jsxs("div",{id:"pathbar",ref:p,children:[f.jsx("span",{className:"chain",id:"chain",ref:u}),f.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var L;return(L=S.current)==null?void 0:L.clearPath()},children:"✕"})]}),f.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([L,V])=>f.jsx("button",{className:"tb"+(w===L?" on":""),"data-view":L,type:"button",onClick:()=>{var re;U(L),(re=S.current)==null||re.setView(L)},children:V},L)),f.jsx("span",{className:"sep"}),f.jsx("button",{className:"tb"+(M.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var L;return(L=S.current)==null?void 0:L.toggleFlow()},children:"Signalfluss"}),f.jsx("button",{className:"tb"+(M.label?" on":""),id:"t-label",type:"button",onClick:()=>{var L;return(L=S.current)==null?void 0:L.toggleLabel()},children:"Labels"}),f.jsx("button",{className:"tb"+(M.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var L;return(L=S.current)==null?void 0:L.toggleSpin()},children:"Auto-Orbit"}),f.jsx("span",{className:"sep"}),f.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var L;return(L=S.current)==null?void 0:L.dolly(1.18)},children:"−"}),f.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:m,onClick:()=>{var L;return(L=S.current)==null?void 0:L.zoomReset()},children:"100%"}),f.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var L;return(L=S.current)==null?void 0:L.dolly(1/1.18)},children:"＋"}),f.jsx("span",{className:"sep"}),f.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var L;return(L=S.current)==null?void 0:L.toggleTheme()},children:O==="light"?"Nacht":"Tag"}),f.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var L;return(L=S.current)==null?void 0:L.reset()},children:"Reset"})]}),f.jsx("div",{id:"hint",children:"Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt"}),f.jsxs("div",{id:"gate",style:x?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",f.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]})]})}$E.createRoot(document.getElementById("root")).render(f.jsx(J.StrictMode,{children:f.jsx(_2,{})}));

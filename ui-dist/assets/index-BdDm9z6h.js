(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var e_={exports:{}},tf={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ky=Symbol.for("react.transitional.element"),Qy=Symbol.for("react.fragment");function t_(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:Ky,type:t,key:i,ref:e!==void 0?e:null,props:n}}tf.Fragment=Qy;tf.jsx=t_;tf.jsxs=t_;e_.exports=tf;var m=e_.exports,n_={exports:{}},Ye={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fp=Symbol.for("react.transitional.element"),Jy=Symbol.for("react.portal"),$y=Symbol.for("react.fragment"),eM=Symbol.for("react.strict_mode"),tM=Symbol.for("react.profiler"),nM=Symbol.for("react.consumer"),iM=Symbol.for("react.context"),aM=Symbol.for("react.forward_ref"),sM=Symbol.for("react.suspense"),rM=Symbol.for("react.memo"),i_=Symbol.for("react.lazy"),oM=Symbol.for("react.activity"),ug=Symbol.iterator;function lM(t){return t===null||typeof t!="object"?null:(t=ug&&t[ug]||t["@@iterator"],typeof t=="function"?t:null)}var a_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},s_=Object.assign,r_={};function vo(t,e,n){this.props=t,this.context=e,this.refs=r_,this.updater=n||a_}vo.prototype.isReactComponent={};vo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};vo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function o_(){}o_.prototype=vo.prototype;function Hp(t,e,n){this.props=t,this.context=e,this.refs=r_,this.updater=n||a_}var Gp=Hp.prototype=new o_;Gp.constructor=Hp;s_(Gp,vo.prototype);Gp.isPureReactComponent=!0;var fg=Array.isArray;function qd(){}var Vt={H:null,A:null,T:null,S:null},l_=Object.prototype.hasOwnProperty;function Vp(t,e,n){var i=n.ref;return{$$typeof:Fp,type:t,key:e,ref:i!==void 0?i:null,props:n}}function cM(t,e){return Vp(t.type,e,t.props)}function kp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Fp}function uM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var dg=/\/+/g;function wf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?uM(""+t.key):e.toString(36)}function fM(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(qd,qd):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function wr(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Fp:case Jy:r=!0;break;case i_:return r=t._init,wr(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+wf(t,0):i,fg(a)?(n="",r!=null&&(n=r.replace(dg,"$&/")+"/"),wr(a,e,n,"",function(c){return c})):a!=null&&(kp(a)&&(a=cM(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(dg,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(fg(t))for(var l=0;l<t.length;l++)i=t[l],s=o+wf(i,l),r+=wr(i,e,n,s,a);else if(l=lM(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+wf(i,l++),r+=wr(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return wr(fM(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function Jl(t,e,n){if(t==null)return t;var i=[],a=0;return wr(t,i,"","",function(s){return e.call(n,s,a++)}),i}function dM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var hg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},hM={map:Jl,forEach:function(t,e,n){Jl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Jl(t,function(){e++}),e},toArray:function(t){return Jl(t,function(e){return e})||[]},only:function(t){if(!kp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ye.Activity=oM;Ye.Children=hM;Ye.Component=vo;Ye.Fragment=$y;Ye.Profiler=tM;Ye.PureComponent=Hp;Ye.StrictMode=eM;Ye.Suspense=sM;Ye.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Vt;Ye.__COMPILER_RUNTIME={__proto__:null,c:function(t){return Vt.H.useMemoCache(t)}};Ye.cache=function(t){return function(){return t.apply(null,arguments)}};Ye.cacheSignal=function(){return null};Ye.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=s_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!l_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Vp(t.type,a,i)};Ye.createContext=function(t){return t={$$typeof:iM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:nM,_context:t},t};Ye.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)l_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Vp(t,s,a)};Ye.createRef=function(){return{current:null}};Ye.forwardRef=function(t){return{$$typeof:aM,render:t}};Ye.isValidElement=kp;Ye.lazy=function(t){return{$$typeof:i_,_payload:{_status:-1,_result:t},_init:dM}};Ye.memo=function(t,e){return{$$typeof:rM,type:t,compare:e===void 0?null:e}};Ye.startTransition=function(t){var e=Vt.T,n={};Vt.T=n;try{var i=t(),a=Vt.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(qd,hg)}catch(s){hg(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),Vt.T=e}};Ye.unstable_useCacheRefresh=function(){return Vt.H.useCacheRefresh()};Ye.use=function(t){return Vt.H.use(t)};Ye.useActionState=function(t,e,n){return Vt.H.useActionState(t,e,n)};Ye.useCallback=function(t,e){return Vt.H.useCallback(t,e)};Ye.useContext=function(t){return Vt.H.useContext(t)};Ye.useDebugValue=function(){};Ye.useDeferredValue=function(t,e){return Vt.H.useDeferredValue(t,e)};Ye.useEffect=function(t,e){return Vt.H.useEffect(t,e)};Ye.useEffectEvent=function(t){return Vt.H.useEffectEvent(t)};Ye.useId=function(){return Vt.H.useId()};Ye.useImperativeHandle=function(t,e,n){return Vt.H.useImperativeHandle(t,e,n)};Ye.useInsertionEffect=function(t,e){return Vt.H.useInsertionEffect(t,e)};Ye.useLayoutEffect=function(t,e){return Vt.H.useLayoutEffect(t,e)};Ye.useMemo=function(t,e){return Vt.H.useMemo(t,e)};Ye.useOptimistic=function(t,e){return Vt.H.useOptimistic(t,e)};Ye.useReducer=function(t,e,n){return Vt.H.useReducer(t,e,n)};Ye.useRef=function(t){return Vt.H.useRef(t)};Ye.useState=function(t){return Vt.H.useState(t)};Ye.useSyncExternalStore=function(t,e,n){return Vt.H.useSyncExternalStore(t,e,n)};Ye.useTransition=function(){return Vt.H.useTransition()};Ye.version="19.2.8";n_.exports=Ye;var se=n_.exports,c_={exports:{}},nf={},u_={exports:{}},f_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(I,z){var U=I.length;I.push(z);e:for(;0<U;){var k=U-1>>>1,re=I[k];if(0<a(re,z))I[k]=z,I[U]=re,U=k;else break e}}function n(I){return I.length===0?null:I[0]}function i(I){if(I.length===0)return null;var z=I[0],U=I.pop();if(U!==z){I[0]=U;e:for(var k=0,re=I.length,le=re>>>1;k<le;){var _e=2*(k+1)-1,ke=I[_e],Ze=_e+1,Fe=I[Ze];if(0>a(ke,U))Ze<re&&0>a(Fe,ke)?(I[k]=Fe,I[Ze]=U,k=Ze):(I[k]=ke,I[_e]=U,k=_e);else if(Ze<re&&0>a(Fe,U))I[k]=Fe,I[Ze]=U,k=Ze;else break e}}return z}function a(I,z){var U=I.sortIndex-z.sortIndex;return U!==0?U:I.id-z.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],f=1,h=null,u=3,p=!1,g=!1,b=!1,_=!1,d=typeof setTimeout=="function"?setTimeout:null,S=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;function x(I){for(var z=n(c);z!==null;){if(z.callback===null)i(c);else if(z.startTime<=I)i(c),z.sortIndex=z.expirationTime,e(l,z);else break;z=n(c)}}function w(I){if(b=!1,x(I),!g)if(n(l)!==null)g=!0,N||(N=!0,O());else{var z=n(c);z!==null&&P(w,z.startTime-I)}}var N=!1,T=-1,y=5,C=-1;function R(){return _?!0:!(t.unstable_now()-C<y)}function D(){if(_=!1,N){var I=t.unstable_now();C=I;var z=!0;try{e:{g=!1,b&&(b=!1,S(T),T=-1),p=!0;var U=u;try{t:{for(x(I),h=n(l);h!==null&&!(h.expirationTime>I&&R());){var k=h.callback;if(typeof k=="function"){h.callback=null,u=h.priorityLevel;var re=k(h.expirationTime<=I);if(I=t.unstable_now(),typeof re=="function"){h.callback=re,x(I),z=!0;break t}h===n(l)&&i(l),x(I)}else i(l);h=n(l)}if(h!==null)z=!0;else{var le=n(c);le!==null&&P(w,le.startTime-I),z=!1}}break e}finally{h=null,u=U,p=!1}z=void 0}}finally{z?O():N=!1}}}var O;if(typeof M=="function")O=function(){M(D)};else if(typeof MessageChannel<"u"){var H=new MessageChannel,L=H.port2;H.port1.onmessage=D,O=function(){L.postMessage(null)}}else O=function(){d(D,0)};function P(I,z){T=d(function(){I(t.unstable_now())},z)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(I){I.callback=null},t.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<I?Math.floor(1e3/I):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(I){switch(u){case 1:case 2:case 3:var z=3;break;default:z=u}var U=u;u=z;try{return I()}finally{u=U}},t.unstable_requestPaint=function(){_=!0},t.unstable_runWithPriority=function(I,z){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var U=u;u=I;try{return z()}finally{u=U}},t.unstable_scheduleCallback=function(I,z,U){var k=t.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?k+U:k):U=k,I){case 1:var re=-1;break;case 2:re=250;break;case 5:re=1073741823;break;case 4:re=1e4;break;default:re=5e3}return re=U+re,I={id:f++,callback:z,priorityLevel:I,startTime:U,expirationTime:re,sortIndex:-1},U>k?(I.sortIndex=U,e(c,I),n(l)===null&&I===n(c)&&(b?(S(T),T=-1):b=!0,P(w,U-k))):(I.sortIndex=re,e(l,I),g||p||(g=!0,N||(N=!0,O()))),I},t.unstable_shouldYield=R,t.unstable_wrapCallback=function(I){var z=u;return function(){var U=u;u=z;try{return I.apply(this,arguments)}finally{u=U}}}})(f_);u_.exports=f_;var pM=u_.exports,d_={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mM=se;function h_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Fa(){}var zn={d:{f:Fa,r:function(){throw Error(h_(522))},D:Fa,C:Fa,L:Fa,m:Fa,X:Fa,S:Fa,M:Fa},p:0,findDOMNode:null},gM=Symbol.for("react.portal");function vM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gM,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var al=mM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function af(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=zn;Fn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(h_(299));return vM(t,e,null,n)};Fn.flushSync=function(t){var e=al.T,n=zn.p;try{if(al.T=null,zn.p=2,t)return t()}finally{al.T=e,zn.p=n,zn.d.f()}};Fn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,zn.d.C(t,e))};Fn.prefetchDNS=function(t){typeof t=="string"&&zn.d.D(t)};Fn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=af(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?zn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&zn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Fn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=af(e.as,e.crossOrigin);zn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&zn.d.M(t)};Fn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=af(n,e.crossOrigin);zn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Fn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=af(e.as,e.crossOrigin);zn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else zn.d.m(t)};Fn.requestFormReset=function(t){zn.d.r(t)};Fn.unstable_batchedUpdates=function(t,e){return t(e)};Fn.useFormState=function(t,e,n){return al.H.useFormState(t,e,n)};Fn.useFormStatus=function(){return al.H.useHostTransitionStatus()};Fn.version="19.2.8";function p_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p_)}catch(t){console.error(t)}}p_(),d_.exports=Fn;var _M=d_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ln=pM,m_=se,xM=_M;function oe(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function g_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Il(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function __(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function pg(t){if(Il(t)!==t)throw Error(oe(188))}function SM(t){var e=t.alternate;if(!e){if(e=Il(t),e===null)throw Error(oe(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return pg(a),t;if(s===i)return pg(a),e;s=s.sibling}throw Error(oe(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(oe(189))}}if(n.alternate!==i)throw Error(oe(190))}if(n.tag!==3)throw Error(oe(188));return n.stateNode.current===n?t:e}function x_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=x_(t),e!==null)return e;t=t.sibling}return null}var kt=Object.assign,yM=Symbol.for("react.element"),$l=Symbol.for("react.transitional.element"),Ko=Symbol.for("react.portal"),Nr=Symbol.for("react.fragment"),S_=Symbol.for("react.strict_mode"),Yd=Symbol.for("react.profiler"),y_=Symbol.for("react.consumer"),Ma=Symbol.for("react.context"),Xp=Symbol.for("react.forward_ref"),Zd=Symbol.for("react.suspense"),Kd=Symbol.for("react.suspense_list"),Wp=Symbol.for("react.memo"),ja=Symbol.for("react.lazy"),Qd=Symbol.for("react.activity"),MM=Symbol.for("react.memo_cache_sentinel"),mg=Symbol.iterator;function Lo(t){return t===null||typeof t!="object"?null:(t=mg&&t[mg]||t["@@iterator"],typeof t=="function"?t:null)}var bM=Symbol.for("react.client.reference");function Jd(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===bM?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Nr:return"Fragment";case Yd:return"Profiler";case S_:return"StrictMode";case Zd:return"Suspense";case Kd:return"SuspenseList";case Qd:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Ko:return"Portal";case Ma:return t.displayName||"Context";case y_:return(t._context.displayName||"Context")+".Consumer";case Xp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Wp:return e=t.displayName||null,e!==null?e:Jd(t.type)||"Memo";case ja:e=t._payload,t=t._init;try{return Jd(t(e))}catch{}}return null}var Qo=Array.isArray,Ve=m_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,gt=xM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Bs={pending:!1,data:null,method:null,action:null},$d=[],Dr=-1;function ta(t){return{current:t}}function vn(t){0>Dr||(t.current=$d[Dr],$d[Dr]=null,Dr--)}function zt(t,e){Dr++,$d[Dr]=t.current,t.current=e}var Qi=ta(null),xl=ta(null),rs=ta(null),vu=ta(null);function _u(t,e){switch(zt(rs,e),zt(xl,t),zt(Qi,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?y0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=y0(e),t=GS(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}vn(Qi),zt(Qi,t)}function eo(){vn(Qi),vn(xl),vn(rs)}function eh(t){t.memoizedState!==null&&zt(vu,t);var e=Qi.current,n=GS(e,t.type);e!==n&&(zt(xl,t),zt(Qi,n))}function xu(t){xl.current===t&&(vn(Qi),vn(xl)),vu.current===t&&(vn(vu),Nl._currentValue=Bs)}var Rf,gg;function Cs(t){if(Rf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Rf=e&&e[1]||"",gg=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Rf+t+gg}var Cf=!1;function Nf(t,e){if(!t||Cf)return"";Cf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var u=p}Reflect.construct(t,[],h)}else{try{h.call()}catch(p){u=p}t.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}(h=t())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var f=`
`+l[i].replace(" at new "," at ");return t.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",t.displayName)),f}while(1<=i&&0<=a);break}}}finally{Cf=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Cs(n):""}function EM(t,e){switch(t.tag){case 26:case 27:case 5:return Cs(t.type);case 16:return Cs("Lazy");case 13:return t.child!==e&&e!==null?Cs("Suspense Fallback"):Cs("Suspense");case 19:return Cs("SuspenseList");case 0:case 15:return Nf(t.type,!1);case 11:return Nf(t.type.render,!1);case 1:return Nf(t.type,!0);case 31:return Cs("Activity");default:return""}}function vg(t){try{var e="",n=null;do e+=EM(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var th=Object.prototype.hasOwnProperty,jp=ln.unstable_scheduleCallback,Df=ln.unstable_cancelCallback,TM=ln.unstable_shouldYield,AM=ln.unstable_requestPaint,ii=ln.unstable_now,wM=ln.unstable_getCurrentPriorityLevel,M_=ln.unstable_ImmediatePriority,b_=ln.unstable_UserBlockingPriority,Su=ln.unstable_NormalPriority,RM=ln.unstable_LowPriority,E_=ln.unstable_IdlePriority,CM=ln.log,NM=ln.unstable_setDisableYieldValue,Bl=null,ai=null;function $a(t){if(typeof CM=="function"&&NM(t),ai&&typeof ai.setStrictMode=="function")try{ai.setStrictMode(Bl,t)}catch{}}var si=Math.clz32?Math.clz32:LM,DM=Math.log,UM=Math.LN2;function LM(t){return t>>>=0,t===0?32:31-(DM(t)/UM|0)|0}var ec=256,tc=262144,nc=4194304;function Ns(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function sf(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Ns(i):(r&=o,r!==0?a=Ns(r):n||(n=o&~t,n!==0&&(a=Ns(n))))):(o=i&~s,o!==0?a=Ns(o):r!==0?a=Ns(r):n||(n=i&~t,n!==0&&(a=Ns(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function Fl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function OM(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function T_(){var t=nc;return nc<<=1,!(nc&62914560)&&(nc=4194304),t}function Uf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Hl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function PM(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var f=31-si(n),h=1<<f;o[f]=0,l[f]=-1;var u=c[f];if(u!==null)for(c[f]=null,f=0;f<u.length;f++){var p=u[f];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&A_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function A_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-si(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function w_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-si(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function R_(t,e){var n=e&-e;return n=n&42?1:qp(n),n&(t.suspendedLanes|e)?0:n}function qp(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Yp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function C_(){var t=gt.p;return t!==0?t:(t=window.event,t===void 0?32:JS(t.type))}function _g(t,e){var n=gt.p;try{return gt.p=t,e()}finally{gt.p=n}}var Ss=Math.random().toString(36).slice(2),xn="__reactFiber$"+Ss,Zn="__reactProps$"+Ss,_o="__reactContainer$"+Ss,nh="__reactEvents$"+Ss,zM="__reactListeners$"+Ss,IM="__reactHandles$"+Ss,xg="__reactResources$"+Ss,Gl="__reactMarker$"+Ss;function Zp(t){delete t[xn],delete t[Zn],delete t[nh],delete t[zM],delete t[IM]}function Ur(t){var e=t[xn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[_o]||n[xn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=A0(t);t!==null;){if(n=t[xn])return n;t=A0(t)}return e}t=n,n=t.parentNode}return null}function xo(t){if(t=t[xn]||t[_o]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Jo(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(oe(33))}function Wr(t){var e=t[xg];return e||(e=t[xg]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function mn(t){t[Gl]=!0}var N_=new Set,D_={};function $s(t,e){to(t,e),to(t+"Capture",e)}function to(t,e){for(D_[t]=e,t=0;t<e.length;t++)N_.add(e[t])}var BM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Sg={},yg={};function FM(t){return th.call(yg,t)?!0:th.call(Sg,t)?!1:BM.test(t)?yg[t]=!0:(Sg[t]=!0,!1)}function jc(t,e,n){if(FM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function ic(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function la(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function gi(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function U_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function HM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ih(t){if(!t._valueTracker){var e=U_(t)?"checked":"value";t._valueTracker=HM(t,e,""+t[e])}}function L_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=U_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function yu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var GM=/[\n"\\]/g;function Si(t){return t.replace(GM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ah(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+gi(e)):t.value!==""+gi(e)&&(t.value=""+gi(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?sh(t,r,gi(e)):n!=null?sh(t,r,gi(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+gi(o):t.removeAttribute("name")}function O_(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){ih(t);return}n=n!=null?""+gi(n):"",e=e!=null?""+gi(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),ih(t)}function sh(t,e,n){e==="number"&&yu(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function jr(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+gi(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function P_(t,e,n){if(e!=null&&(e=""+gi(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+gi(n):""}function z_(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(oe(92));if(Qo(i)){if(1<i.length)throw Error(oe(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=gi(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),ih(t)}function no(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var VM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Mg(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||VM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function I_(t,e,n){if(e!=null&&typeof e!="object")throw Error(oe(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&Mg(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&Mg(t,s,e[s])}function Kp(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),XM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qc(t){return XM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ba(){}var rh=null;function Qp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Lr=null,qr=null;function bg(t){var e=xo(t);if(e&&(t=e.stateNode)){var n=t[Zn]||null;e:switch(t=e.stateNode,e.type){case"input":if(ah(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Si(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[Zn]||null;if(!a)throw Error(oe(90));ah(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&L_(i)}break e;case"textarea":P_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&jr(t,!!n.multiple,e,!1)}}}var Lf=!1;function B_(t,e,n){if(Lf)return t(e,n);Lf=!0;try{var i=t(e);return i}finally{if(Lf=!1,(Lr!==null||qr!==null)&&(vf(),Lr&&(e=Lr,t=qr,qr=Lr=null,bg(e),t)))for(e=0;e<t.length;e++)bg(t[e])}}function Sl(t,e){var n=t.stateNode;if(n===null)return null;var i=n[Zn]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(oe(231,e,typeof n));return n}var Da=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oh=!1;if(Da)try{var Oo={};Object.defineProperty(Oo,"passive",{get:function(){oh=!0}}),window.addEventListener("test",Oo,Oo),window.removeEventListener("test",Oo,Oo)}catch{oh=!1}var es=null,Jp=null,Yc=null;function F_(){if(Yc)return Yc;var t,e=Jp,n=e.length,i,a="value"in es?es.value:es.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Yc=a.slice(t,1<i?1-i:void 0)}function Zc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ac(){return!0}function Eg(){return!1}function Kn(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ac:Eg,this.isPropagationStopped=Eg,this}return kt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ac)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ac)},persist:function(){},isPersistent:ac}),e}var er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rf=Kn(er),Vl=kt({},er,{view:0,detail:0}),WM=Kn(Vl),Of,Pf,Po,of=kt({},Vl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$p,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Po&&(Po&&t.type==="mousemove"?(Of=t.screenX-Po.screenX,Pf=t.screenY-Po.screenY):Pf=Of=0,Po=t),Of)},movementY:function(t){return"movementY"in t?t.movementY:Pf}}),Tg=Kn(of),jM=kt({},of,{dataTransfer:0}),qM=Kn(jM),YM=kt({},Vl,{relatedTarget:0}),zf=Kn(YM),ZM=kt({},er,{animationName:0,elapsedTime:0,pseudoElement:0}),KM=Kn(ZM),QM=kt({},er,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),JM=Kn(QM),$M=kt({},er,{data:0}),Ag=Kn($M),eb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},tb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ib(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=nb[t])?!!e[t]:!1}function $p(){return ib}var ab=kt({},Vl,{key:function(t){if(t.key){var e=eb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?tb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$p,charCode:function(t){return t.type==="keypress"?Zc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),sb=Kn(ab),rb=kt({},of,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wg=Kn(rb),ob=kt({},Vl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$p}),lb=Kn(ob),cb=kt({},er,{propertyName:0,elapsedTime:0,pseudoElement:0}),ub=Kn(cb),fb=kt({},of,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),db=Kn(fb),hb=kt({},er,{newState:0,oldState:0}),pb=Kn(hb),mb=[9,13,27,32],em=Da&&"CompositionEvent"in window,sl=null;Da&&"documentMode"in document&&(sl=document.documentMode);var gb=Da&&"TextEvent"in window&&!sl,H_=Da&&(!em||sl&&8<sl&&11>=sl),Rg=" ",Cg=!1;function G_(t,e){switch(t){case"keyup":return mb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function V_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Or=!1;function vb(t,e){switch(t){case"compositionend":return V_(e);case"keypress":return e.which!==32?null:(Cg=!0,Rg);case"textInput":return t=e.data,t===Rg&&Cg?null:t;default:return null}}function _b(t,e){if(Or)return t==="compositionend"||!em&&G_(t,e)?(t=F_(),Yc=Jp=es=null,Or=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return H_&&e.locale!=="ko"?null:e.data;default:return null}}var xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ng(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!xb[t.type]:e==="textarea"}function k_(t,e,n,i){Lr?qr?qr.push(i):qr=[i]:Lr=i,e=Fu(e,"onChange"),0<e.length&&(n=new rf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var rl=null,yl=null;function Sb(t){BS(t,0)}function lf(t){var e=Jo(t);if(L_(e))return t}function Dg(t,e){if(t==="change")return e}var X_=!1;if(Da){var If;if(Da){var Bf="oninput"in document;if(!Bf){var Ug=document.createElement("div");Ug.setAttribute("oninput","return;"),Bf=typeof Ug.oninput=="function"}If=Bf}else If=!1;X_=If&&(!document.documentMode||9<document.documentMode)}function Lg(){rl&&(rl.detachEvent("onpropertychange",W_),yl=rl=null)}function W_(t){if(t.propertyName==="value"&&lf(yl)){var e=[];k_(e,yl,t,Qp(t)),B_(Sb,e)}}function yb(t,e,n){t==="focusin"?(Lg(),rl=e,yl=n,rl.attachEvent("onpropertychange",W_)):t==="focusout"&&Lg()}function Mb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return lf(yl)}function bb(t,e){if(t==="click")return lf(e)}function Eb(t,e){if(t==="input"||t==="change")return lf(e)}function Tb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var oi=typeof Object.is=="function"?Object.is:Tb;function Ml(t,e){if(oi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!th.call(e,a)||!oi(t[a],e[a]))return!1}return!0}function Og(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Pg(t,e){var n=Og(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Og(n)}}function j_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?j_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function q_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=yu(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=yu(t.document)}return e}function tm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Ab=Da&&"documentMode"in document&&11>=document.documentMode,Pr=null,lh=null,ol=null,ch=!1;function zg(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ch||Pr==null||Pr!==yu(i)||(i=Pr,"selectionStart"in i&&tm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ol&&Ml(ol,i)||(ol=i,i=Fu(lh,"onSelect"),0<i.length&&(e=new rf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Pr)))}function Es(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var zr={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},Ff={},Y_={};Da&&(Y_=document.createElement("div").style,"AnimationEvent"in window||(delete zr.animationend.animation,delete zr.animationiteration.animation,delete zr.animationstart.animation),"TransitionEvent"in window||delete zr.transitionend.transition);function tr(t){if(Ff[t])return Ff[t];if(!zr[t])return t;var e=zr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Y_)return Ff[t]=e[n];return t}var Z_=tr("animationend"),K_=tr("animationiteration"),Q_=tr("animationstart"),wb=tr("transitionrun"),Rb=tr("transitionstart"),Cb=tr("transitioncancel"),J_=tr("transitionend"),$_=new Map,uh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");uh.push("scrollEnd");function Bi(t,e){$_.set(t,e),$s(e,[t])}var Mu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},pi=[],Ir=0,nm=0;function cf(){for(var t=Ir,e=nm=Ir=0;e<t;){var n=pi[e];pi[e++]=null;var i=pi[e];pi[e++]=null;var a=pi[e];pi[e++]=null;var s=pi[e];if(pi[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&ex(n,a,s)}}function uf(t,e,n,i){pi[Ir++]=t,pi[Ir++]=e,pi[Ir++]=n,pi[Ir++]=i,nm|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function im(t,e,n,i){return uf(t,e,n,i),bu(t)}function nr(t,e){return uf(t,null,null,e),bu(t)}function ex(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-si(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function bu(t){if(50<gl)throw gl=0,Dh=null,Error(oe(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Br={};function Nb(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,e,n,i){return new Nb(t,e,n,i)}function am(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Aa(t,e){var n=t.alternate;return n===null?(n=ti(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function tx(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Kc(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")am(t)&&(r=1);else if(typeof t=="string")r=PE(t,n,Qi.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case Qd:return t=ti(31,n,e,a),t.elementType=Qd,t.lanes=s,t;case Nr:return Fs(n.children,a,s,e);case S_:r=8,a|=24;break;case Yd:return t=ti(12,n,e,a|2),t.elementType=Yd,t.lanes=s,t;case Zd:return t=ti(13,n,e,a),t.elementType=Zd,t.lanes=s,t;case Kd:return t=ti(19,n,e,a),t.elementType=Kd,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ma:r=10;break e;case y_:r=9;break e;case Xp:r=11;break e;case Wp:r=14;break e;case ja:r=16,i=null;break e}r=29,n=Error(oe(130,t===null?"null":typeof t,"")),i=null}return e=ti(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function Fs(t,e,n,i){return t=ti(7,t,i,e),t.lanes=n,t}function Hf(t,e,n){return t=ti(6,t,null,e),t.lanes=n,t}function nx(t){var e=ti(18,null,null,0);return e.stateNode=t,e}function Gf(t,e,n){return e=ti(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Ig=new WeakMap;function yi(t,e){if(typeof t=="object"&&t!==null){var n=Ig.get(t);return n!==void 0?n:(e={value:t,source:e,stack:vg(e)},Ig.set(t,e),e)}return{value:t,source:e,stack:vg(e)}}var Fr=[],Hr=0,Eu=null,bl=0,vi=[],_i=0,ms=null,qi=1,Yi="";function xa(t,e){Fr[Hr++]=bl,Fr[Hr++]=Eu,Eu=t,bl=e}function ix(t,e,n){vi[_i++]=qi,vi[_i++]=Yi,vi[_i++]=ms,ms=t;var i=qi;t=Yi;var a=32-si(i)-1;i&=~(1<<a),n+=1;var s=32-si(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,qi=1<<32-si(e)+a|n<<a|i,Yi=s+t}else qi=1<<s|n<<a|i,Yi=t}function sm(t){t.return!==null&&(xa(t,1),ix(t,1,0))}function rm(t){for(;t===Eu;)Eu=Fr[--Hr],Fr[Hr]=null,bl=Fr[--Hr],Fr[Hr]=null;for(;t===ms;)ms=vi[--_i],vi[_i]=null,Yi=vi[--_i],vi[_i]=null,qi=vi[--_i],vi[_i]=null}function ax(t,e){vi[_i++]=qi,vi[_i++]=Yi,vi[_i++]=ms,qi=e.id,Yi=e.overflow,ms=t}var Sn=null,Gt=null,ut=!1,os=null,Mi=!1,fh=Error(oe(519));function gs(t){var e=Error(oe(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw El(yi(e,t)),fh}function Bg(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[xn]=t,e[Zn]=i,n){case"dialog":at("cancel",e),at("close",e);break;case"iframe":case"object":case"embed":at("load",e);break;case"video":case"audio":for(n=0;n<Rl.length;n++)at(Rl[n],e);break;case"source":at("error",e);break;case"img":case"image":case"link":at("error",e),at("load",e);break;case"details":at("toggle",e);break;case"input":at("invalid",e),O_(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":at("invalid",e);break;case"textarea":at("invalid",e),z_(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||HS(e.textContent,n)?(i.popover!=null&&(at("beforetoggle",e),at("toggle",e)),i.onScroll!=null&&at("scroll",e),i.onScrollEnd!=null&&at("scrollend",e),i.onClick!=null&&(e.onclick=ba),e=!0):e=!1,e||gs(t,!0)}function Fg(t){for(Sn=t.return;Sn;)switch(Sn.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:Sn=Sn.return}}function lr(t){if(t!==Sn)return!1;if(!ut)return Fg(t),ut=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||zh(t.type,t.memoizedProps)),n=!n),n&&Gt&&gs(t),Fg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(oe(317));Gt=T0(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(oe(317));Gt=T0(t)}else e===27?(e=Gt,ys(t.type)?(t=Hh,Hh=null,Gt=t):Gt=e):Gt=Sn?Ai(t.stateNode.nextSibling):null;return!0}function Xs(){Gt=Sn=null,ut=!1}function Vf(){var t=os;return t!==null&&(jn===null?jn=t:jn.push.apply(jn,t),os=null),t}function El(t){os===null?os=[t]:os.push(t)}var dh=ta(null),ir=null,Ea=null;function Ya(t,e,n){zt(dh,e._currentValue),e._currentValue=n}function wa(t){t._currentValue=dh.current,vn(dh)}function hh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ph(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),hh(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(oe(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),hh(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function So(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(oe(387));if(r=r.memoizedProps,r!==null){var o=a.type;oi(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===vu.current){if(r=a.alternate,r===null)throw Error(oe(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Nl):t=[Nl])}a=a.return}t!==null&&ph(e,t,n,i),e.flags|=262144}function Tu(t){for(t=t.firstContext;t!==null;){if(!oi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ws(t){ir=t,Ea=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function yn(t){return sx(ir,t)}function sc(t,e){return ir===null&&Ws(t),sx(t,e)}function sx(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ea===null){if(t===null)throw Error(oe(308));Ea=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ea=Ea.next=e;return n}var Db=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Ub=ln.unstable_scheduleCallback,Lb=ln.unstable_NormalPriority,sn={$$typeof:Ma,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function om(){return{controller:new Db,data:new Map,refCount:0}}function kl(t){t.refCount--,t.refCount===0&&Ub(Lb,function(){t.controller.abort()})}var ll=null,mh=0,io=0,Yr=null;function Ob(t,e){if(ll===null){var n=ll=[];mh=0,io=Um(),Yr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return mh++,e.then(Hg,Hg),e}function Hg(){if(--mh===0&&ll!==null){Yr!==null&&(Yr.status="fulfilled");var t=ll;ll=null,io=0,Yr=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Pb(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Gg=Ve.S;Ve.S=function(t,e){xS=ii(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Ob(t,e),Gg!==null&&Gg(t,e)};var Hs=ta(null);function lm(){var t=Hs.current;return t!==null?t:Pt.pooledCache}function Qc(t,e){e===null?zt(Hs,Hs.current):zt(Hs,e.pool)}function rx(){var t=lm();return t===null?null:{parent:sn._currentValue,pool:t}}var yo=Error(oe(460)),cm=Error(oe(474)),ff=Error(oe(542)),Au={then:function(){}};function Vg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ox(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(ba,ba),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Xg(t),t;default:if(typeof e.status=="string")e.then(ba,ba);else{if(t=Pt,t!==null&&100<t.shellSuspendCounter)throw Error(oe(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Xg(t),t}throw Gs=e,yo}}function Ds(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gs=n,yo):n}}var Gs=null;function kg(){if(Gs===null)throw Error(oe(459));var t=Gs;return Gs=null,t}function Xg(t){if(t===yo||t===ff)throw Error(oe(483))}var Zr=null,Tl=0;function rc(t){var e=Tl;return Tl+=1,Zr===null&&(Zr=[]),ox(Zr,t,e)}function zo(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function oc(t,e){throw e.$$typeof===yM?Error(oe(525)):(t=Object.prototype.toString.call(e),Error(oe(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function lx(t){function e(d,S){if(t){var M=d.deletions;M===null?(d.deletions=[S],d.flags|=16):M.push(S)}}function n(d,S){if(!t)return null;for(;S!==null;)e(d,S),S=S.sibling;return null}function i(d){for(var S=new Map;d!==null;)d.key!==null?S.set(d.key,d):S.set(d.index,d),d=d.sibling;return S}function a(d,S){return d=Aa(d,S),d.index=0,d.sibling=null,d}function s(d,S,M){return d.index=M,t?(M=d.alternate,M!==null?(M=M.index,M<S?(d.flags|=67108866,S):M):(d.flags|=67108866,S)):(d.flags|=1048576,S)}function r(d){return t&&d.alternate===null&&(d.flags|=67108866),d}function o(d,S,M,x){return S===null||S.tag!==6?(S=Hf(M,d.mode,x),S.return=d,S):(S=a(S,M),S.return=d,S)}function l(d,S,M,x){var w=M.type;return w===Nr?f(d,S,M.props.children,x,M.key):S!==null&&(S.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ja&&Ds(w)===S.type)?(S=a(S,M.props),zo(S,M),S.return=d,S):(S=Kc(M.type,M.key,M.props,null,d.mode,x),zo(S,M),S.return=d,S)}function c(d,S,M,x){return S===null||S.tag!==4||S.stateNode.containerInfo!==M.containerInfo||S.stateNode.implementation!==M.implementation?(S=Gf(M,d.mode,x),S.return=d,S):(S=a(S,M.children||[]),S.return=d,S)}function f(d,S,M,x,w){return S===null||S.tag!==7?(S=Fs(M,d.mode,x,w),S.return=d,S):(S=a(S,M),S.return=d,S)}function h(d,S,M){if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return S=Hf(""+S,d.mode,M),S.return=d,S;if(typeof S=="object"&&S!==null){switch(S.$$typeof){case $l:return M=Kc(S.type,S.key,S.props,null,d.mode,M),zo(M,S),M.return=d,M;case Ko:return S=Gf(S,d.mode,M),S.return=d,S;case ja:return S=Ds(S),h(d,S,M)}if(Qo(S)||Lo(S))return S=Fs(S,d.mode,M,null),S.return=d,S;if(typeof S.then=="function")return h(d,rc(S),M);if(S.$$typeof===Ma)return h(d,sc(d,S),M);oc(d,S)}return null}function u(d,S,M,x){var w=S!==null?S.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return w!==null?null:o(d,S,""+M,x);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case $l:return M.key===w?l(d,S,M,x):null;case Ko:return M.key===w?c(d,S,M,x):null;case ja:return M=Ds(M),u(d,S,M,x)}if(Qo(M)||Lo(M))return w!==null?null:f(d,S,M,x,null);if(typeof M.then=="function")return u(d,S,rc(M),x);if(M.$$typeof===Ma)return u(d,S,sc(d,M),x);oc(d,M)}return null}function p(d,S,M,x,w){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return d=d.get(M)||null,o(S,d,""+x,w);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case $l:return d=d.get(x.key===null?M:x.key)||null,l(S,d,x,w);case Ko:return d=d.get(x.key===null?M:x.key)||null,c(S,d,x,w);case ja:return x=Ds(x),p(d,S,M,x,w)}if(Qo(x)||Lo(x))return d=d.get(M)||null,f(S,d,x,w,null);if(typeof x.then=="function")return p(d,S,M,rc(x),w);if(x.$$typeof===Ma)return p(d,S,M,sc(S,x),w);oc(S,x)}return null}function g(d,S,M,x){for(var w=null,N=null,T=S,y=S=0,C=null;T!==null&&y<M.length;y++){T.index>y?(C=T,T=null):C=T.sibling;var R=u(d,T,M[y],x);if(R===null){T===null&&(T=C);break}t&&T&&R.alternate===null&&e(d,T),S=s(R,S,y),N===null?w=R:N.sibling=R,N=R,T=C}if(y===M.length)return n(d,T),ut&&xa(d,y),w;if(T===null){for(;y<M.length;y++)T=h(d,M[y],x),T!==null&&(S=s(T,S,y),N===null?w=T:N.sibling=T,N=T);return ut&&xa(d,y),w}for(T=i(T);y<M.length;y++)C=p(T,d,y,M[y],x),C!==null&&(t&&C.alternate!==null&&T.delete(C.key===null?y:C.key),S=s(C,S,y),N===null?w=C:N.sibling=C,N=C);return t&&T.forEach(function(D){return e(d,D)}),ut&&xa(d,y),w}function b(d,S,M,x){if(M==null)throw Error(oe(151));for(var w=null,N=null,T=S,y=S=0,C=null,R=M.next();T!==null&&!R.done;y++,R=M.next()){T.index>y?(C=T,T=null):C=T.sibling;var D=u(d,T,R.value,x);if(D===null){T===null&&(T=C);break}t&&T&&D.alternate===null&&e(d,T),S=s(D,S,y),N===null?w=D:N.sibling=D,N=D,T=C}if(R.done)return n(d,T),ut&&xa(d,y),w;if(T===null){for(;!R.done;y++,R=M.next())R=h(d,R.value,x),R!==null&&(S=s(R,S,y),N===null?w=R:N.sibling=R,N=R);return ut&&xa(d,y),w}for(T=i(T);!R.done;y++,R=M.next())R=p(T,d,y,R.value,x),R!==null&&(t&&R.alternate!==null&&T.delete(R.key===null?y:R.key),S=s(R,S,y),N===null?w=R:N.sibling=R,N=R);return t&&T.forEach(function(O){return e(d,O)}),ut&&xa(d,y),w}function _(d,S,M,x){if(typeof M=="object"&&M!==null&&M.type===Nr&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case $l:e:{for(var w=M.key;S!==null;){if(S.key===w){if(w=M.type,w===Nr){if(S.tag===7){n(d,S.sibling),x=a(S,M.props.children),x.return=d,d=x;break e}}else if(S.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===ja&&Ds(w)===S.type){n(d,S.sibling),x=a(S,M.props),zo(x,M),x.return=d,d=x;break e}n(d,S);break}else e(d,S);S=S.sibling}M.type===Nr?(x=Fs(M.props.children,d.mode,x,M.key),x.return=d,d=x):(x=Kc(M.type,M.key,M.props,null,d.mode,x),zo(x,M),x.return=d,d=x)}return r(d);case Ko:e:{for(w=M.key;S!==null;){if(S.key===w)if(S.tag===4&&S.stateNode.containerInfo===M.containerInfo&&S.stateNode.implementation===M.implementation){n(d,S.sibling),x=a(S,M.children||[]),x.return=d,d=x;break e}else{n(d,S);break}else e(d,S);S=S.sibling}x=Gf(M,d.mode,x),x.return=d,d=x}return r(d);case ja:return M=Ds(M),_(d,S,M,x)}if(Qo(M))return g(d,S,M,x);if(Lo(M)){if(w=Lo(M),typeof w!="function")throw Error(oe(150));return M=w.call(M),b(d,S,M,x)}if(typeof M.then=="function")return _(d,S,rc(M),x);if(M.$$typeof===Ma)return _(d,S,sc(d,M),x);oc(d,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,S!==null&&S.tag===6?(n(d,S.sibling),x=a(S,M),x.return=d,d=x):(n(d,S),x=Hf(M,d.mode,x),x.return=d,d=x),r(d)):n(d,S)}return function(d,S,M,x){try{Tl=0;var w=_(d,S,M,x);return Zr=null,w}catch(T){if(T===yo||T===ff)throw T;var N=ti(29,T,null,d.mode);return N.lanes=x,N.return=d,N}finally{}}}var js=lx(!0),cx=lx(!1),qa=!1;function um(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ls(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function cs(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,mt&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=bu(t),ex(t,null,n),e}return uf(t,i,e,n),bu(t)}function cl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,w_(t,n)}}function kf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var vh=!1;function ul(){if(vh){var t=Yr;if(t!==null)throw t}}function fl(t,e,n,i){vh=!1;var a=t.updateQueue;qa=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var h=a.baseState;r=0,f=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(ot&u)===u:(i&u)===u){u!==0&&u===io&&(vh=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,b=o;u=e;var _=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){h=g.call(_,h,u);break e}h=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(_,h,u):g,u==null)break e;h=kt({},h,u);break e;case 2:qa=!0}}u=o.callback,u!==null&&(t.flags|=64,p&&(t.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=h):f=f.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);f===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=f,s===null&&(a.shared.lanes=0),_s|=r,t.lanes=r,t.memoizedState=h}}function ux(t,e){if(typeof t!="function")throw Error(oe(191,t));t.call(e)}function fx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)ux(n[t],e)}var ao=ta(null),wu=ta(0);function Wg(t,e){t=Pa,zt(wu,t),zt(ao,e),Pa=t|e.baseLanes}function _h(){zt(wu,Pa),zt(ao,ao.current)}function fm(){Pa=wu.current,vn(ao),vn(wu)}var li=ta(null),Ti=null;function Za(t){var e=t.alternate;zt($t,$t.current&1),zt(li,t),Ti===null&&(e===null||ao.current!==null||e.memoizedState!==null)&&(Ti=t)}function xh(t){zt($t,$t.current),zt(li,t),Ti===null&&(Ti=t)}function dx(t){t.tag===22?(zt($t,$t.current),zt(li,t),Ti===null&&(Ti=t)):Ka()}function Ka(){zt($t,$t.current),zt(li,li.current)}function ei(t){vn(li),Ti===t&&(Ti=null),vn($t)}var $t=ta(0);function Ru(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Bh(n)||Fh(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ua=0,Qe=null,Lt=null,nn=null,Cu=!1,Kr=!1,qs=!1,Nu=0,Al=0,Qr=null,zb=0;function qt(){throw Error(oe(321))}function dm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!oi(t[n],e[n]))return!1;return!0}function hm(t,e,n,i,a,s){return Ua=s,Qe=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Ve.H=t===null||t.memoizedState===null?kx:Em,qs=!1,s=n(i,a),qs=!1,Kr&&(s=px(e,n,i,a)),hx(t),s}function hx(t){Ve.H=wl;var e=Lt!==null&&Lt.next!==null;if(Ua=0,nn=Lt=Qe=null,Cu=!1,Al=0,Qr=null,e)throw Error(oe(300));t===null||rn||(t=t.dependencies,t!==null&&Tu(t)&&(rn=!0))}function px(t,e,n,i){Qe=t;var a=0;do{if(Kr&&(Qr=null),Al=0,Kr=!1,25<=a)throw Error(oe(301));if(a+=1,nn=Lt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}Ve.H=Xx,s=e(n,i)}while(Kr);return s}function Ib(){var t=Ve.H,e=t.useState()[0];return e=typeof e.then=="function"?Xl(e):e,t=t.useState()[0],(Lt!==null?Lt.memoizedState:null)!==t&&(Qe.flags|=1024),e}function pm(){var t=Nu!==0;return Nu=0,t}function mm(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function gm(t){if(Cu){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Cu=!1}Ua=0,nn=Lt=Qe=null,Kr=!1,Al=Nu=0,Qr=null}function Pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return nn===null?Qe.memoizedState=nn=t:nn=nn.next=t,nn}function en(){if(Lt===null){var t=Qe.alternate;t=t!==null?t.memoizedState:null}else t=Lt.next;var e=nn===null?Qe.memoizedState:nn.next;if(e!==null)nn=e,Lt=t;else{if(t===null)throw Qe.alternate===null?Error(oe(467)):Error(oe(310));Lt=t,t={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},nn===null?Qe.memoizedState=nn=t:nn=nn.next=t}return nn}function df(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Xl(t){var e=Al;return Al+=1,Qr===null&&(Qr=[]),t=ox(Qr,t,e),e=Qe,(nn===null?e.memoizedState:nn.next)===null&&(e=e.alternate,Ve.H=e===null||e.memoizedState===null?kx:Em),t}function hf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Xl(t);if(t.$$typeof===Ma)return yn(t)}throw Error(oe(438,String(t)))}function vm(t){var e=null,n=Qe.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=Qe.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=df(),Qe.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=MM;return e.index++,n}function La(t,e){return typeof e=="function"?e(t):e}function Jc(t){var e=en();return _m(e,Lt,t)}function _m(t,e,n){var i=t.queue;if(i===null)throw Error(oe(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,f=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(ot&h)===h:(Ua&h)===h){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===io&&(f=!0);else if((Ua&u)===u){c=c.next,u===io&&(f=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=s):l=l.next=h,Qe.lanes|=u,_s|=u;h=c.action,qs&&n(s,h),s=c.hasEagerState?c.eagerState:n(s,h)}else u={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,Qe.lanes|=h,_s|=h;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!oi(s,t.memoizedState)&&(rn=!0,f&&(n=Yr,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function Xf(t){var e=en(),n=e.queue;if(n===null)throw Error(oe(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);oi(s,e.memoizedState)||(rn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function mx(t,e,n){var i=Qe,a=en(),s=ut;if(s){if(n===void 0)throw Error(oe(407));n=n()}else n=e();var r=!oi((Lt||a).memoizedState,n);if(r&&(a.memoizedState=n,rn=!0),a=a.queue,xm(_x.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||nn!==null&&nn.memoizedState.tag&1){if(i.flags|=2048,so(9,{destroy:void 0},vx.bind(null,i,a,n,e),null),Pt===null)throw Error(oe(349));s||Ua&127||gx(i,e,n)}return n}function gx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Qe.updateQueue,e===null?(e=df(),Qe.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function vx(t,e,n,i){e.value=n,e.getSnapshot=i,xx(e)&&Sx(t)}function _x(t,e,n){return n(function(){xx(e)&&Sx(t)})}function xx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!oi(t,n)}catch{return!0}}function Sx(t){var e=nr(t,2);e!==null&&qn(e,t,2)}function Sh(t){var e=Pn();if(typeof t=="function"){var n=t;if(t=n(),qs){$a(!0);try{n()}finally{$a(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:t},e}function yx(t,e,n,i){return t.baseState=n,_m(t,Lt,typeof i=="function"?i:La)}function Bb(t,e,n,i,a){if(mf(t))throw Error(oe(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};Ve.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,Mx(e,s)):(s.next=n.next,e.pending=n.next=s)}}function Mx(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=Ve.T,r={};Ve.T=r;try{var o=n(a,i),l=Ve.S;l!==null&&l(r,o),jg(t,e,o)}catch(c){yh(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),Ve.T=s}}else try{s=n(a,i),jg(t,e,s)}catch(c){yh(t,e,c)}}function jg(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){qg(t,e,i)},function(i){return yh(t,e,i)}):qg(t,e,n)}function qg(t,e,n){e.status="fulfilled",e.value=n,bx(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Mx(t,n)))}function yh(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,bx(e),e=e.next;while(e!==i)}t.action=null}function bx(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ex(t,e){return e}function Yg(t,e){if(ut){var n=Pt.formState;if(n!==null){e:{var i=Qe;if(ut){if(Gt){t:{for(var a=Gt,s=Mi;a.nodeType!==8;){if(!s){a=null;break t}if(a=Ai(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Gt=Ai(a.nextSibling),i=a.data==="F!";break e}}gs(i)}i=!1}i&&(e=n[0])}}return n=Pn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ex,lastRenderedState:e},n.queue=i,n=Hx.bind(null,Qe,i),i.dispatch=n,i=Sh(!1),s=bm.bind(null,Qe,!1,i.queue),i=Pn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=Bb.bind(null,Qe,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Zg(t){var e=en();return Tx(e,Lt,t)}function Tx(t,e,n){if(e=_m(t,e,Ex)[0],t=Jc(La)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Xl(e)}catch(r){throw r===yo?ff:r}else i=e;e=en();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&(Qe.flags|=2048,so(9,{destroy:void 0},Fb.bind(null,a,n),null)),[i,s,t]}function Fb(t,e){t.action=e}function Kg(t){var e=en(),n=Lt;if(n!==null)return Tx(e,n,t);en(),e=e.memoizedState,n=en();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function so(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=Qe.updateQueue,e===null&&(e=df(),Qe.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function Ax(){return en().memoizedState}function $c(t,e,n,i){var a=Pn();Qe.flags|=t,a.memoizedState=so(1|e,{destroy:void 0},n,i===void 0?null:i)}function pf(t,e,n,i){var a=en();i=i===void 0?null:i;var s=a.memoizedState.inst;Lt!==null&&i!==null&&dm(i,Lt.memoizedState.deps)?a.memoizedState=so(e,s,n,i):(Qe.flags|=t,a.memoizedState=so(1|e,s,n,i))}function Qg(t,e){$c(8390656,8,t,e)}function xm(t,e){pf(2048,8,t,e)}function Hb(t){Qe.flags|=4;var e=Qe.updateQueue;if(e===null)e=df(),Qe.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function wx(t){var e=en().memoizedState;return Hb({ref:e,nextImpl:t}),function(){if(mt&2)throw Error(oe(440));return e.impl.apply(void 0,arguments)}}function Rx(t,e){return pf(4,2,t,e)}function Cx(t,e){return pf(4,4,t,e)}function Nx(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Dx(t,e,n){n=n!=null?n.concat([t]):null,pf(4,4,Nx.bind(null,e,t),n)}function Sm(){}function Ux(t,e){var n=en();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&dm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Lx(t,e){var n=en();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&dm(e,i[1]))return i[0];if(i=t(),qs){$a(!0);try{t()}finally{$a(!1)}}return n.memoizedState=[i,e],i}function ym(t,e,n){return n===void 0||Ua&1073741824&&!(ot&261930)?t.memoizedState=e:(t.memoizedState=n,t=yS(),Qe.lanes|=t,_s|=t,n)}function Ox(t,e,n,i){return oi(n,e)?n:ao.current!==null?(t=ym(t,n,i),oi(t,e)||(rn=!0),t):!(Ua&42)||Ua&1073741824&&!(ot&261930)?(rn=!0,t.memoizedState=n):(t=yS(),Qe.lanes|=t,_s|=t,e)}function Px(t,e,n,i,a){var s=gt.p;gt.p=s!==0&&8>s?s:8;var r=Ve.T,o={};Ve.T=o,bm(t,!1,e,n);try{var l=a(),c=Ve.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=Pb(l,i);dl(t,e,f,ri(t))}else dl(t,e,i,ri(t))}catch(h){dl(t,e,{then:function(){},status:"rejected",reason:h},ri())}finally{gt.p=s,r!==null&&o.types!==null&&(r.types=o.types),Ve.T=r}}function Gb(){}function Mh(t,e,n,i){if(t.tag!==5)throw Error(oe(476));var a=zx(t).queue;Px(t,a,e,Bs,n===null?Gb:function(){return Ix(t),n(i)})}function zx(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Bs,baseState:Bs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:Bs},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Ix(t){var e=zx(t);e.next===null&&(e=t.alternate.memoizedState),dl(t,e.next.queue,{},ri())}function Mm(){return yn(Nl)}function Bx(){return en().memoizedState}function Fx(){return en().memoizedState}function Vb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ri();t=ls(n);var i=cs(e,t,n);i!==null&&(qn(i,e,n),cl(i,e,n)),e={cache:om()},t.payload=e;return}e=e.return}}function kb(t,e,n){var i=ri();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mf(t)?Gx(e,n):(n=im(t,e,n,i),n!==null&&(qn(n,t,i),Vx(n,e,i)))}function Hx(t,e,n){var i=ri();dl(t,e,n,i)}function dl(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(mf(t))Gx(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,oi(o,r))return uf(t,e,a,0),Pt===null&&cf(),!1}catch{}finally{}if(n=im(t,e,a,i),n!==null)return qn(n,t,i),Vx(n,e,i),!0}return!1}function bm(t,e,n,i){if(i={lane:2,revertLane:Um(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},mf(t)){if(e)throw Error(oe(479))}else e=im(t,n,i,2),e!==null&&qn(e,t,2)}function mf(t){var e=t.alternate;return t===Qe||e!==null&&e===Qe}function Gx(t,e){Kr=Cu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vx(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,w_(t,n)}}var wl={readContext:yn,use:hf,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useLayoutEffect:qt,useInsertionEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useSyncExternalStore:qt,useId:qt,useHostTransitionStatus:qt,useFormState:qt,useActionState:qt,useOptimistic:qt,useMemoCache:qt,useCacheRefresh:qt};wl.useEffectEvent=qt;var kx={readContext:yn,use:hf,useCallback:function(t,e){return Pn().memoizedState=[t,e===void 0?null:e],t},useContext:yn,useEffect:Qg,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,$c(4194308,4,Nx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $c(4194308,4,t,e)},useInsertionEffect:function(t,e){$c(4,2,t,e)},useMemo:function(t,e){var n=Pn();e=e===void 0?null:e;var i=t();if(qs){$a(!0);try{t()}finally{$a(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=Pn();if(n!==void 0){var a=n(e);if(qs){$a(!0);try{n(e)}finally{$a(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=kb.bind(null,Qe,t),[i.memoizedState,t]},useRef:function(t){var e=Pn();return t={current:t},e.memoizedState=t},useState:function(t){t=Sh(t);var e=t.queue,n=Hx.bind(null,Qe,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Sm,useDeferredValue:function(t,e){var n=Pn();return ym(n,t,e)},useTransition:function(){var t=Sh(!1);return t=Px.bind(null,Qe,t.queue,!0,!1),Pn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=Qe,a=Pn();if(ut){if(n===void 0)throw Error(oe(407));n=n()}else{if(n=e(),Pt===null)throw Error(oe(349));ot&127||gx(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Qg(_x.bind(null,i,s,t),[t]),i.flags|=2048,so(9,{destroy:void 0},vx.bind(null,i,s,n,e),null),n},useId:function(){var t=Pn(),e=Pt.identifierPrefix;if(ut){var n=Yi,i=qi;n=(i&~(1<<32-si(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Nu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=zb++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Mm,useFormState:Yg,useActionState:Yg,useOptimistic:function(t){var e=Pn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=bm.bind(null,Qe,!0,n),n.dispatch=e,[t,e]},useMemoCache:vm,useCacheRefresh:function(){return Pn().memoizedState=Vb.bind(null,Qe)},useEffectEvent:function(t){var e=Pn(),n={impl:t};return e.memoizedState=n,function(){if(mt&2)throw Error(oe(440));return n.impl.apply(void 0,arguments)}}},Em={readContext:yn,use:hf,useCallback:Ux,useContext:yn,useEffect:xm,useImperativeHandle:Dx,useInsertionEffect:Rx,useLayoutEffect:Cx,useMemo:Lx,useReducer:Jc,useRef:Ax,useState:function(){return Jc(La)},useDebugValue:Sm,useDeferredValue:function(t,e){var n=en();return Ox(n,Lt.memoizedState,t,e)},useTransition:function(){var t=Jc(La)[0],e=en().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:mx,useId:Bx,useHostTransitionStatus:Mm,useFormState:Zg,useActionState:Zg,useOptimistic:function(t,e){var n=en();return yx(n,Lt,t,e)},useMemoCache:vm,useCacheRefresh:Fx};Em.useEffectEvent=wx;var Xx={readContext:yn,use:hf,useCallback:Ux,useContext:yn,useEffect:xm,useImperativeHandle:Dx,useInsertionEffect:Rx,useLayoutEffect:Cx,useMemo:Lx,useReducer:Xf,useRef:Ax,useState:function(){return Xf(La)},useDebugValue:Sm,useDeferredValue:function(t,e){var n=en();return Lt===null?ym(n,t,e):Ox(n,Lt.memoizedState,t,e)},useTransition:function(){var t=Xf(La)[0],e=en().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:mx,useId:Bx,useHostTransitionStatus:Mm,useFormState:Kg,useActionState:Kg,useOptimistic:function(t,e){var n=en();return Lt!==null?yx(n,Lt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:vm,useCacheRefresh:Fx};Xx.useEffectEvent=wx;function Wf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:kt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var bh={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=ri(),a=ls(i);a.payload=e,n!=null&&(a.callback=n),e=cs(t,a,i),e!==null&&(qn(e,t,i),cl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=ri(),a=ls(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=cs(t,a,i),e!==null&&(qn(e,t,i),cl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ri(),i=ls(n);i.tag=2,e!=null&&(i.callback=e),e=cs(t,i,n),e!==null&&(qn(e,t,n),cl(e,t,n))}};function Jg(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!Ml(n,i)||!Ml(a,s):!0}function $g(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&bh.enqueueReplaceState(e,e.state,null)}function Ys(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=kt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function Wx(t){Mu(t)}function jx(t){console.error(t)}function qx(t){Mu(t)}function Du(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function e0(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Eh(t,e,n){return n=ls(n),n.tag=3,n.payload={element:null},n.callback=function(){Du(t,e)},n}function Yx(t){return t=ls(t),t.tag=3,t}function Zx(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){e0(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){e0(e,n,i),typeof a!="function"&&(us===null?us=new Set([this]):us.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Xb(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&So(e,n,a,!0),n=li.current,n!==null){switch(n.tag){case 31:case 13:return Ti===null?zu():n.alternate===null&&Yt===0&&(Yt=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Au?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),nd(t,i,a)),!1;case 22:return n.flags|=65536,i===Au?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),nd(t,i,a)),!1}throw Error(oe(435,n.tag))}return nd(t,i,a),zu(),!1}if(ut)return e=li.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==fh&&(t=Error(oe(422),{cause:i}),El(yi(t,n)))):(i!==fh&&(e=Error(oe(423),{cause:i}),El(yi(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=yi(i,n),a=Eh(t.stateNode,i,a),kf(t,a),Yt!==4&&(Yt=2)),!1;var s=Error(oe(520),{cause:i});if(s=yi(s,n),ml===null?ml=[s]:ml.push(s),Yt!==4&&(Yt=2),e===null)return!0;i=yi(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Eh(n.stateNode,i,t),kf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(us===null||!us.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Yx(a),Zx(a,t,n,i),kf(n,a),!1}n=n.return}while(n!==null);return!1}var Tm=Error(oe(461)),rn=!1;function _n(t,e,n,i){e.child=t===null?cx(e,null,n,i):js(e,t.child,n,i)}function t0(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Ws(e),i=hm(t,e,n,r,s,a),o=pm(),t!==null&&!rn?(mm(t,e,a),Oa(t,e,a)):(ut&&o&&sm(e),e.flags|=1,_n(t,e,i,a),e.child)}function n0(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!am(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,Kx(t,e,s,i,a)):(t=Kc(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Am(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ml,n(r,i)&&t.ref===e.ref)return Oa(t,e,a)}return e.flags|=1,t=Aa(s,i),t.ref=e.ref,t.return=e,e.child=t}function Kx(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(Ml(s,i)&&t.ref===e.ref)if(rn=!1,e.pendingProps=i=s,Am(t,a))t.flags&131072&&(rn=!0);else return e.lanes=t.lanes,Oa(t,e,a)}return Th(t,e,n,i,a)}function Qx(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return i0(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Qc(e,s!==null?s.cachePool:null),s!==null?Wg(e,s):_h(),dx(e);else return i=e.lanes=536870912,i0(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Qc(e,s.cachePool),Wg(e,s),Ka(),e.memoizedState=null):(t!==null&&Qc(e,null),_h(),Ka());return _n(t,e,a,n),e.child}function $o(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function i0(t,e,n,i,a){var s=lm();return s=s===null?null:{parent:sn._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Qc(e,null),_h(),dx(e),t!==null&&So(t,e,i,!0),e.childLanes=a,null}function eu(t,e){return e=Uu({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function a0(t,e,n){return js(e,t.child,null,n),t=eu(e,e.pendingProps),t.flags|=2,ei(e),e.memoizedState=null,t}function Wb(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(ut){if(i.mode==="hidden")return t=eu(e,i),e.lanes=536870912,$o(null,t);if(xh(e),(t=Gt)?(t=kS(t,Mi),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:ms!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},n=nx(t),n.return=e,e.child=n,Sn=e,Gt=null)):t=null,t===null)throw gs(e);return e.lanes=536870912,null}return eu(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(xh(e),a)if(e.flags&256)e.flags&=-257,e=a0(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(oe(558));else if(rn||So(t,e,n,!1),a=(n&t.childLanes)!==0,rn||a){if(i=Pt,i!==null&&(r=R_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,nr(t,r),qn(i,t,r),Tm;zu(),e=a0(t,e,n)}else t=s.treeContext,Gt=Ai(r.nextSibling),Sn=e,ut=!0,os=null,Mi=!1,t!==null&&ax(e,t),e=eu(e,i),e.flags|=4096;return e}return t=Aa(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function tu(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(oe(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Th(t,e,n,i,a){return Ws(e),n=hm(t,e,n,i,void 0,a),i=pm(),t!==null&&!rn?(mm(t,e,a),Oa(t,e,a)):(ut&&i&&sm(e),e.flags|=1,_n(t,e,n,a),e.child)}function s0(t,e,n,i,a,s){return Ws(e),e.updateQueue=null,n=px(e,i,n,a),hx(t),i=pm(),t!==null&&!rn?(mm(t,e,s),Oa(t,e,s)):(ut&&i&&sm(e),e.flags|=1,_n(t,e,n,s),e.child)}function r0(t,e,n,i,a){if(Ws(e),e.stateNode===null){var s=Br,r=n.contextType;typeof r=="object"&&r!==null&&(s=yn(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=bh,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},um(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?yn(r):Br,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Wf(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&bh.enqueueReplaceState(s,s.state,null),fl(e,i,s,a),ul(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=Ys(n,o);s.props=l;var c=s.context,f=n.contextType;r=Br,typeof f=="object"&&f!==null&&(r=yn(f));var h=n.getDerivedStateFromProps;f=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&$g(e,s,i,r),qa=!1;var u=e.memoizedState;s.state=u,fl(e,i,s,a),ul(),c=e.memoizedState,o||u!==c||qa?(typeof h=="function"&&(Wf(e,n,h,i),c=e.memoizedState),(l=qa||Jg(e,n,l,i,u,c,r))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,gh(t,e),r=e.memoizedProps,f=Ys(n,r),s.props=f,h=e.pendingProps,u=s.context,c=n.contextType,l=Br,typeof c=="object"&&c!==null&&(l=yn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==h||u!==l)&&$g(e,s,i,l),qa=!1,u=e.memoizedState,s.state=u,fl(e,i,s,a),ul();var p=e.memoizedState;r!==h||u!==p||qa||t!==null&&t.dependencies!==null&&Tu(t.dependencies)?(typeof o=="function"&&(Wf(e,n,o,i),p=e.memoizedState),(f=qa||Jg(e,n,f,i,u,p,l)||t!==null&&t.dependencies!==null&&Tu(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=p),s.props=i,s.state=p,s.context=l,i=f):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,tu(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=js(e,t.child,null,a),e.child=js(e,null,n,a)):_n(t,e,n,a),e.memoizedState=s.state,t=e.child):t=Oa(t,e,a),t}function o0(t,e,n,i){return Xs(),e.flags|=256,_n(t,e,n,i),e.child}var jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qf(t){return{baseLanes:t,cachePool:rx()}}function Yf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ni),t}function Jx(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:($t.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(ut){if(a?Za(e):Ka(),(t=Gt)?(t=kS(t,Mi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:ms!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},n=nx(t),n.return=e,e.child=n,Sn=e,Gt=null)):t=null,t===null)throw gs(e);return Fh(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(Ka(),a=e.mode,o=Uu({mode:"hidden",children:o},a),i=Fs(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=qf(n),i.childLanes=Yf(t,r,n),e.memoizedState=jf,$o(null,i)):(Za(e),Ah(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?(Za(e),e.flags&=-257,e=Zf(t,e,n)):e.memoizedState!==null?(Ka(),e.child=t.child,e.flags|=128,e=null):(Ka(),o=i.fallback,a=e.mode,i=Uu({mode:"visible",children:i.children},a),o=Fs(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,js(e,t.child,null,n),i=e.child,i.memoizedState=qf(n),i.childLanes=Yf(t,r,n),e.memoizedState=jf,e=$o(null,i));else if(Za(e),Fh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(oe(419)),i.stack="",i.digest=r,El({value:i,source:null,stack:null}),e=Zf(t,e,n)}else if(rn||So(t,e,n,!1),r=(n&t.childLanes)!==0,rn||r){if(r=Pt,r!==null&&(i=R_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,nr(t,i),qn(r,t,i),Tm;Bh(o)||zu(),e=Zf(t,e,n)}else Bh(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,Gt=Ai(o.nextSibling),Sn=e,ut=!0,os=null,Mi=!1,t!==null&&ax(e,t),e=Ah(e,i.children),e.flags|=4096);return e}return a?(Ka(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=Aa(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=Aa(c,o):(o=Fs(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,$o(null,i),i=e.child,o=t.child.memoizedState,o===null?o=qf(n):(a=o.cachePool,a!==null?(l=sn._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=rx(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Yf(t,r,n),e.memoizedState=jf,$o(t.child,i)):(Za(e),n=t.child,t=n.sibling,n=Aa(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function Ah(t,e){return e=Uu({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Uu(t,e){return t=ti(22,t,null,e),t.lanes=0,t}function Zf(t,e,n){return js(e,t.child,null,n),t=Ah(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function l0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),hh(t.return,e,n)}function Kf(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function $x(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=$t.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,zt($t,r),_n(t,e,i,n),i=ut?bl:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&l0(t,n,e);else if(t.tag===19)l0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Ru(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Kf(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Ru(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Kf(e,!0,n,null,s,i);break;case"together":Kf(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Oa(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),_s|=e.lanes,!(n&e.childLanes))if(t!==null){if(So(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(oe(153));if(e.child!==null){for(t=e.child,n=Aa(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Aa(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Am(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Tu(t)))}function jb(t,e,n){switch(e.tag){case 3:_u(e,e.stateNode.containerInfo),Ya(e,sn,t.memoizedState.cache),Xs();break;case 27:case 5:eh(e);break;case 4:_u(e,e.stateNode.containerInfo);break;case 10:Ya(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,xh(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(Za(e),e.flags|=128,null):n&e.child.childLanes?Jx(t,e,n):(Za(e),t=Oa(t,e,n),t!==null?t.sibling:null);Za(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(So(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return $x(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),zt($t,$t.current),i)break;return null;case 22:return e.lanes=0,Qx(t,e,n,e.pendingProps);case 24:Ya(e,sn,t.memoizedState.cache)}return Oa(t,e,n)}function eS(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)rn=!0;else{if(!Am(t,n)&&!(e.flags&128))return rn=!1,jb(t,e,n);rn=!!(t.flags&131072)}else rn=!1,ut&&e.flags&1048576&&ix(e,bl,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Ds(e.elementType),e.type=t,typeof t=="function")am(t)?(i=Ys(t,i),e.tag=1,e=r0(null,e,t,i,n)):(e.tag=0,e=Th(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Xp){e.tag=11,e=t0(null,e,t,i,n);break e}else if(a===Wp){e.tag=14,e=n0(null,e,t,i,n);break e}}throw e=Jd(t)||t,Error(oe(306,e,""))}}return e;case 0:return Th(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=Ys(i,e.pendingProps),r0(t,e,i,a,n);case 3:e:{if(_u(e,e.stateNode.containerInfo),t===null)throw Error(oe(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,gh(t,e),fl(e,i,null,n);var r=e.memoizedState;if(i=r.cache,Ya(e,sn,i),i!==s.cache&&ph(e,[sn],n,!0),ul(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=o0(t,e,i,n);break e}else if(i!==a){a=yi(Error(oe(424)),e),El(a),e=o0(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Gt=Ai(t.firstChild),Sn=e,ut=!0,os=null,Mi=!0,n=cx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Xs(),i===a){e=Oa(t,e,n);break e}_n(t,e,i,n)}e=e.child}return e;case 26:return tu(t,e),t===null?(n=R0(e.type,null,e.pendingProps,null))?e.memoizedState=n:ut||(n=e.type,t=e.pendingProps,i=Hu(rs.current).createElement(n),i[xn]=e,i[Zn]=t,En(i,n,t),mn(i),e.stateNode=i):e.memoizedState=R0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return eh(e),t===null&&ut&&(i=e.stateNode=XS(e.type,e.pendingProps,rs.current),Sn=e,Mi=!0,a=Gt,ys(e.type)?(Hh=a,Gt=Ai(i.firstChild)):Gt=a),_n(t,e,e.pendingProps.children,n),tu(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&ut&&((a=i=Gt)&&(i=ME(i,e.type,e.pendingProps,Mi),i!==null?(e.stateNode=i,Sn=e,Gt=Ai(i.firstChild),Mi=!1,a=!0):a=!1),a||gs(e)),eh(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,zh(a,s)?i=null:r!==null&&zh(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=hm(t,e,Ib,null,null,n),Nl._currentValue=a),tu(t,e),_n(t,e,i,n),e.child;case 6:return t===null&&ut&&((t=n=Gt)&&(n=bE(n,e.pendingProps,Mi),n!==null?(e.stateNode=n,Sn=e,Gt=null,t=!0):t=!1),t||gs(e)),null;case 13:return Jx(t,e,n);case 4:return _u(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=js(e,null,i,n):_n(t,e,i,n),e.child;case 11:return t0(t,e,e.type,e.pendingProps,n);case 7:return _n(t,e,e.pendingProps,n),e.child;case 8:return _n(t,e,e.pendingProps.children,n),e.child;case 12:return _n(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,Ya(e,e.type,i.value),_n(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,Ws(e),a=yn(a),i=i(a),e.flags|=1,_n(t,e,i,n),e.child;case 14:return n0(t,e,e.type,e.pendingProps,n);case 15:return Kx(t,e,e.type,e.pendingProps,n);case 19:return $x(t,e,n);case 31:return Wb(t,e,n);case 22:return Qx(t,e,n,e.pendingProps);case 24:return Ws(e),i=yn(sn),t===null?(a=lm(),a===null&&(a=Pt,s=om(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},um(e),Ya(e,sn,a)):(t.lanes&n&&(gh(t,e),fl(e,null,null,n),ul()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Ya(e,sn,i)):(i=s.cache,Ya(e,sn,i),i!==a.cache&&ph(e,[sn],n,!0))),_n(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(oe(156,e.tag))}function ca(t){t.flags|=4}function Qf(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(ES())t.flags|=8192;else throw Gs=Au,cm}else t.flags&=-16777217}function c0(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!qS(e))if(ES())t.flags|=8192;else throw Gs=Au,cm}function lc(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?T_():536870912,t.lanes|=e,ro|=e)}function Io(t,e){if(!ut)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Ht(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function qb(t,e,n){var i=e.pendingProps;switch(rm(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Ht(e),null;case 1:return Ht(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),wa(sn),eo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(lr(e)?ca(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Vf())),Ht(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(ca(e),s!==null?(Ht(e),c0(e,s)):(Ht(e),Qf(e,a,null,i,n))):s?s!==t.memoizedState?(ca(e),Ht(e),c0(e,s)):(Ht(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&ca(e),Ht(e),Qf(e,a,t,i,n)),null;case 27:if(xu(e),n=rs.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ca(e);else{if(!i){if(e.stateNode===null)throw Error(oe(166));return Ht(e),null}t=Qi.current,lr(e)?Bg(e):(t=XS(a,i,n),e.stateNode=t,ca(e))}return Ht(e),null;case 5:if(xu(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ca(e);else{if(!i){if(e.stateNode===null)throw Error(oe(166));return Ht(e),null}if(s=Qi.current,lr(e))Bg(e);else{var r=Hu(rs.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[xn]=e,s[Zn]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(En(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&ca(e)}}return Ht(e),Qf(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&ca(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(oe(166));if(t=rs.current,lr(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=Sn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[xn]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||HS(t.nodeValue,n)),t||gs(e,!0)}else t=Hu(t).createTextNode(i),t[xn]=e,e.stateNode=t}return Ht(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=lr(e),n!==null){if(t===null){if(!i)throw Error(oe(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(oe(557));t[xn]=e}else Xs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ht(e),t=!1}else n=Vf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ei(e),e):(ei(e),null);if(e.flags&128)throw Error(oe(558))}return Ht(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=lr(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(oe(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(oe(317));a[xn]=e}else Xs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Ht(e),a=!1}else a=Vf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(ei(e),e):(ei(e),null)}return ei(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),lc(e,e.updateQueue),Ht(e),null);case 4:return eo(),t===null&&Lm(e.stateNode.containerInfo),Ht(e),null;case 10:return wa(e.type),Ht(e),null;case 19:if(vn($t),i=e.memoizedState,i===null)return Ht(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)Io(i,!1);else{if(Yt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Ru(t),s!==null){for(e.flags|=128,Io(i,!1),t=s.updateQueue,e.updateQueue=t,lc(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)tx(n,t),n=n.sibling;return zt($t,$t.current&1|2),ut&&xa(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&ii()>Ou&&(e.flags|=128,a=!0,Io(i,!1),e.lanes=4194304)}else{if(!a)if(t=Ru(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,lc(e,t),Io(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!ut)return Ht(e),null}else 2*ii()-i.renderingStartTime>Ou&&n!==536870912&&(e.flags|=128,a=!0,Io(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ii(),t.sibling=null,n=$t.current,zt($t,a?n&1|2:n&1),ut&&xa(e,i.treeForkCount),t):(Ht(e),null);case 22:case 23:return ei(e),fm(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(Ht(e),e.subtreeFlags&6&&(e.flags|=8192)):Ht(e),n=e.updateQueue,n!==null&&lc(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&vn(Hs),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),wa(sn),Ht(e),null;case 25:return null;case 30:return null}throw Error(oe(156,e.tag))}function Yb(t,e){switch(rm(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return wa(sn),eo(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return xu(e),null;case 31:if(e.memoizedState!==null){if(ei(e),e.alternate===null)throw Error(oe(340));Xs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ei(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(oe(340));Xs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return vn($t),null;case 4:return eo(),null;case 10:return wa(e.type),null;case 22:case 23:return ei(e),fm(),t!==null&&vn(Hs),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return wa(sn),null;case 25:return null;default:return null}}function tS(t,e){switch(rm(e),e.tag){case 3:wa(sn),eo();break;case 26:case 27:case 5:xu(e);break;case 4:eo();break;case 31:e.memoizedState!==null&&ei(e);break;case 13:ei(e);break;case 19:vn($t);break;case 10:wa(e.type);break;case 22:case 23:ei(e),fm(),t!==null&&vn(Hs);break;case 24:wa(sn)}}function Wl(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){Rt(e,e.return,o)}}function vs(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(f){Rt(a,l,f)}}}i=i.next}while(i!==s)}}catch(f){Rt(e,e.return,f)}}function nS(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{fx(e,n)}catch(i){Rt(t,t.return,i)}}}function iS(t,e,n){n.props=Ys(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){Rt(t,e,i)}}function hl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){Rt(t,e,a)}}function Zi(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){Rt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){Rt(t,e,a)}else n.current=null}function aS(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){Rt(t,t.return,a)}}function Jf(t,e,n){try{var i=t.stateNode;gE(i,t.type,n,e),i[Zn]=e}catch(a){Rt(t,t.return,a)}}function sS(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ys(t.type)||t.tag===4}function $f(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||sS(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ys(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function wh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ba));else if(i!==4&&(i===27&&ys(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(wh(t,e,n),t=t.sibling;t!==null;)wh(t,e,n),t=t.sibling}function Lu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&ys(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Lu(t,e,n),t=t.sibling;t!==null;)Lu(t,e,n),t=t.sibling}function rS(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);En(e,i,n),e[xn]=t,e[Zn]=n}catch(s){Rt(t,t.return,s)}}var Sa=!1,an=!1,ed=!1,u0=typeof WeakSet=="function"?WeakSet:Set,pn=null;function Zb(t,e){if(t=t.containerInfo,Oh=Xu,t=q_(t),tm(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,f=0,h=t,u=null;t:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=r+a),h!==s||i!==0&&h.nodeType!==3||(l=r+i),h.nodeType===3&&(r+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++f===i&&(l=r),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ph={focusedElem:t,selectionRange:n},Xu=!1,pn=e;pn!==null;)if(e=pn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pn=t;else for(;pn!==null;){switch(e=pn,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=Ys(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(b){Rt(n,n.return,b)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Ih(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Ih(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(oe(163))}if(t=e.sibling,t!==null){t.return=e.return,pn=t;break}pn=e.return}}function oS(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:fa(t,n),i&4&&Wl(5,n);break;case 1:if(fa(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){Rt(n,n.return,r)}else{var a=Ys(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){Rt(n,n.return,r)}}i&64&&nS(n),i&512&&hl(n,n.return);break;case 3:if(fa(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{fx(t,e)}catch(r){Rt(n,n.return,r)}}break;case 27:e===null&&i&4&&rS(n);case 26:case 5:fa(t,n),e===null&&i&4&&aS(n),i&512&&hl(n,n.return);break;case 12:fa(t,n);break;case 31:fa(t,n),i&4&&uS(t,n);break;case 13:fa(t,n),i&4&&fS(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=aE.bind(null,n),EE(t,n))));break;case 22:if(i=n.memoizedState!==null||Sa,!i){e=e!==null&&e.memoizedState!==null||an,a=Sa;var s=an;Sa=i,(an=e)&&!s?va(t,n,(n.subtreeFlags&8772)!==0):fa(t,n),Sa=a,an=s}break;case 30:break;default:fa(t,n)}}function lS(t){var e=t.alternate;e!==null&&(t.alternate=null,lS(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Zp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Wt=null,Wn=!1;function ua(t,e,n){for(n=n.child;n!==null;)cS(t,e,n),n=n.sibling}function cS(t,e,n){if(ai&&typeof ai.onCommitFiberUnmount=="function")try{ai.onCommitFiberUnmount(Bl,n)}catch{}switch(n.tag){case 26:an||Zi(n,e),ua(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:an||Zi(n,e);var i=Wt,a=Wn;ys(n.type)&&(Wt=n.stateNode,Wn=!1),ua(t,e,n),vl(n.stateNode),Wt=i,Wn=a;break;case 5:an||Zi(n,e);case 6:if(i=Wt,a=Wn,Wt=null,ua(t,e,n),Wt=i,Wn=a,Wt!==null)if(Wn)try{(Wt.nodeType===9?Wt.body:Wt.nodeName==="HTML"?Wt.ownerDocument.body:Wt).removeChild(n.stateNode)}catch(s){Rt(n,e,s)}else try{Wt.removeChild(n.stateNode)}catch(s){Rt(n,e,s)}break;case 18:Wt!==null&&(Wn?(t=Wt,b0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),uo(t)):b0(Wt,n.stateNode));break;case 4:i=Wt,a=Wn,Wt=n.stateNode.containerInfo,Wn=!0,ua(t,e,n),Wt=i,Wn=a;break;case 0:case 11:case 14:case 15:vs(2,n,e),an||vs(4,n,e),ua(t,e,n);break;case 1:an||(Zi(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&iS(n,e,i)),ua(t,e,n);break;case 21:ua(t,e,n);break;case 22:an=(i=an)||n.memoizedState!==null,ua(t,e,n),an=i;break;default:ua(t,e,n)}}function uS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{uo(t)}catch(n){Rt(e,e.return,n)}}}function fS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{uo(t)}catch(n){Rt(e,e.return,n)}}function Kb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new u0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new u0),e;default:throw Error(oe(435,t.tag))}}function cc(t,e){var n=Kb(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=sE.bind(null,t,i);i.then(a,a)}})}function Vn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(ys(o.type)){Wt=o.stateNode,Wn=!1;break e}break;case 5:Wt=o.stateNode,Wn=!1;break e;case 3:case 4:Wt=o.stateNode.containerInfo,Wn=!0;break e}o=o.return}if(Wt===null)throw Error(oe(160));cS(s,r,a),Wt=null,Wn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)dS(e,t),e=e.sibling}var Pi=null;function dS(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Vn(e,t),kn(t),i&4&&(vs(3,t,t.return),Wl(3,t),vs(5,t,t.return));break;case 1:Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),i&64&&Sa&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Pi;if(Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[Gl]||s[xn]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),En(s,i,n),s[xn]=t,mn(s),i=s;break e;case"link":var r=N0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),En(s,i,n),a.head.appendChild(s);break;case"meta":if(r=N0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),En(s,i,n),a.head.appendChild(s);break;default:throw Error(oe(468,i))}s[xn]=t,mn(s),i=s}t.stateNode=i}else D0(a,t.type,t.stateNode);else t.stateNode=C0(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?D0(a,t.type,t.stateNode):C0(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&Jf(t,t.memoizedProps,n.memoizedProps)}break;case 27:Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),n!==null&&i&4&&Jf(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),t.flags&32){a=t.stateNode;try{no(a,"")}catch(g){Rt(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,Jf(t,a,n!==null?n.memoizedProps:a)),i&1024&&(ed=!0);break;case 6:if(Vn(e,t),kn(t),i&4){if(t.stateNode===null)throw Error(oe(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){Rt(t,t.return,g)}}break;case 3:if(au=null,a=Pi,Pi=Gu(e.containerInfo),Vn(e,t),Pi=a,kn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{uo(e.containerInfo)}catch(g){Rt(t,t.return,g)}ed&&(ed=!1,hS(t));break;case 4:i=Pi,Pi=Gu(t.stateNode.containerInfo),Vn(e,t),kn(t),Pi=i;break;case 12:Vn(e,t),kn(t);break;case 31:Vn(e,t),kn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,cc(t,i)));break;case 13:Vn(e,t),kn(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(gf=ii()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,cc(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Sa,f=an;if(Sa=c||a,an=f||l,Vn(e,t),an=f,Sa=c,kn(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||Sa||an||Us(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,u=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){Rt(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){Rt(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var p=l.stateNode;a?E0(p,!0):E0(l.stateNode,!1)}catch(g){Rt(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,cc(t,n))));break;case 19:Vn(e,t),kn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,cc(t,i)));break;case 30:break;case 21:break;default:Vn(e,t),kn(t)}}function kn(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(sS(i)){n=i;break}i=i.return}if(n==null)throw Error(oe(160));switch(n.tag){case 27:var a=n.stateNode,s=$f(t);Lu(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(no(r,""),n.flags&=-33);var o=$f(t);Lu(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=$f(t);wh(t,c,l);break;default:throw Error(oe(161))}}catch(f){Rt(t,t.return,f)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function hS(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;hS(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function fa(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)oS(t,e.alternate,e),e=e.sibling}function Us(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:vs(4,e,e.return),Us(e);break;case 1:Zi(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&iS(e,e.return,n),Us(e);break;case 27:vl(e.stateNode);case 26:case 5:Zi(e,e.return),Us(e);break;case 22:e.memoizedState===null&&Us(e);break;case 30:Us(e);break;default:Us(e)}t=t.sibling}}function va(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:va(a,s,n),Wl(4,s);break;case 1:if(va(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){Rt(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)ux(l[a],o)}catch(c){Rt(i,i.return,c)}}n&&r&64&&nS(s),hl(s,s.return);break;case 27:rS(s);case 26:case 5:va(a,s,n),n&&i===null&&r&4&&aS(s),hl(s,s.return);break;case 12:va(a,s,n);break;case 31:va(a,s,n),n&&r&4&&uS(a,s);break;case 13:va(a,s,n),n&&r&4&&fS(a,s);break;case 22:s.memoizedState===null&&va(a,s,n),hl(s,s.return);break;case 30:break;default:va(a,s,n)}e=e.sibling}}function wm(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&kl(n))}function Rm(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&kl(t))}function Di(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)pS(t,e,n,i),e=e.sibling}function pS(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Di(t,e,n,i),a&2048&&Wl(9,e);break;case 1:Di(t,e,n,i);break;case 3:Di(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&kl(t)));break;case 12:if(a&2048){Di(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){Rt(e,e.return,l)}}else Di(t,e,n,i);break;case 31:Di(t,e,n,i);break;case 13:Di(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?Di(t,e,n,i):pl(t,e):s._visibility&2?Di(t,e,n,i):(s._visibility|=2,Rr(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&wm(r,e);break;case 24:Di(t,e,n,i),a&2048&&Rm(e.alternate,e);break;default:Di(t,e,n,i)}}function Rr(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Rr(s,r,o,l,a),Wl(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?Rr(s,r,o,l,a):pl(s,r):(f._visibility|=2,Rr(s,r,o,l,a)),a&&c&2048&&wm(r.alternate,r);break;case 24:Rr(s,r,o,l,a),a&&c&2048&&Rm(r.alternate,r);break;default:Rr(s,r,o,l,a)}e=e.sibling}}function pl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:pl(n,i),a&2048&&wm(i.alternate,i);break;case 24:pl(n,i),a&2048&&Rm(i.alternate,i);break;default:pl(n,i)}e=e.sibling}}var el=8192;function cr(t,e,n){if(t.subtreeFlags&el)for(t=t.child;t!==null;)mS(t,e,n),t=t.sibling}function mS(t,e,n){switch(t.tag){case 26:cr(t,e,n),t.flags&el&&t.memoizedState!==null&&zE(n,Pi,t.memoizedState,t.memoizedProps);break;case 5:cr(t,e,n);break;case 3:case 4:var i=Pi;Pi=Gu(t.stateNode.containerInfo),cr(t,e,n),Pi=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=el,el=16777216,cr(t,e,n),el=i):cr(t,e,n));break;default:cr(t,e,n)}}function gS(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Bo(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pn=i,_S(i,t)}gS(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)vS(t),t=t.sibling}function vS(t){switch(t.tag){case 0:case 11:case 15:Bo(t),t.flags&2048&&vs(9,t,t.return);break;case 3:Bo(t);break;case 12:Bo(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,nu(t)):Bo(t);break;default:Bo(t)}}function nu(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pn=i,_S(i,t)}gS(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:vs(8,e,e.return),nu(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,nu(e));break;default:nu(e)}t=t.sibling}}function _S(t,e){for(;pn!==null;){var n=pn;switch(n.tag){case 0:case 11:case 15:vs(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:kl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,pn=i;else e:for(n=t;pn!==null;){i=pn;var a=i.sibling,s=i.return;if(lS(i),i===n){pn=null;break e}if(a!==null){a.return=s,pn=a;break e}pn=s}}}var Qb={getCacheForType:function(t){var e=yn(sn),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return yn(sn).controller.signal}},Jb=typeof WeakMap=="function"?WeakMap:Map,mt=0,Pt=null,st=null,ot=0,wt=0,$n=null,ts=!1,Mo=!1,Cm=!1,Pa=0,Yt=0,_s=0,Vs=0,Nm=0,ni=0,ro=0,ml=null,jn=null,Rh=!1,gf=0,xS=0,Ou=1/0,Pu=null,us=null,on=0,fs=null,oo=null,Ra=0,Ch=0,Nh=null,SS=null,gl=0,Dh=null;function ri(){return mt&2&&ot!==0?ot&-ot:Ve.T!==null?Um():C_()}function yS(){if(ni===0)if(!(ot&536870912)||ut){var t=tc;tc<<=1,!(tc&3932160)&&(tc=262144),ni=t}else ni=536870912;return t=li.current,t!==null&&(t.flags|=32),ni}function qn(t,e,n){(t===Pt&&(wt===2||wt===9)||t.cancelPendingCommit!==null)&&(lo(t,0),ns(t,ot,ni,!1)),Hl(t,n),(!(mt&2)||t!==Pt)&&(t===Pt&&(!(mt&2)&&(Vs|=n),Yt===4&&ns(t,ot,ni,!1)),na(t))}function MS(t,e,n){if(mt&6)throw Error(oe(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Fl(t,e),a=i?tE(t,e):td(t,e,!0),s=i;do{if(a===0){Mo&&!i&&ns(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!$b(n)){a=td(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=ml;var l=o.current.memoizedState.isDehydrated;if(l&&(lo(o,r).flags|=256),r=td(o,r,!1),r!==2){if(Cm&&!l){o.errorRecoveryDisabledLanes|=s,Vs|=s,a=4;break e}s=jn,jn=a,s!==null&&(jn===null?jn=s:jn.push.apply(jn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){lo(t,0),ns(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(oe(345));case 4:if((e&4194048)!==e)break;case 6:ns(i,e,ni,!ts);break e;case 2:jn=null;break;case 3:case 5:break;default:throw Error(oe(329))}if((e&62914560)===e&&(a=gf+300-ii(),10<a)){if(ns(i,e,ni,!ts),sf(i,0,!0)!==0)break e;Ra=e,i.timeoutHandle=VS(f0.bind(null,i,n,jn,Pu,Rh,e,ni,Vs,ro,ts,s,"Throttled",-0,0),a);break e}f0(i,n,jn,Pu,Rh,e,ni,Vs,ro,ts,s,null,-0,0)}}break}while(!0);na(t)}function f0(t,e,n,i,a,s,r,o,l,c,f,h,u,p){if(t.timeoutHandle=-1,h=e.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ba},mS(e,s,h);var g=(s&62914560)===s?gf-ii():(s&4194048)===s?xS-ii():0;if(g=IE(h,g),g!==null){Ra=s,t.cancelPendingCommit=g(h0.bind(null,t,e,s,n,i,a,r,o,l,f,h,null,u,p)),ns(t,s,r,!c);return}}h0(t,e,s,n,i,a,r,o,l)}function $b(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!oi(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ns(t,e,n,i){e&=~Nm,e&=~Vs,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-si(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&A_(t,n,e)}function vf(){return mt&6?!0:(jl(0),!1)}function Dm(){if(st!==null){if(wt===0)var t=st.return;else t=st,Ea=ir=null,gm(t),Zr=null,Tl=0,t=st;for(;t!==null;)tS(t.alternate,t),t=t.return;st=null}}function lo(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,xE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Ra=0,Dm(),Pt=t,st=n=Aa(t.current,null),ot=e,wt=0,$n=null,ts=!1,Mo=Fl(t,e),Cm=!1,ro=ni=Nm=Vs=_s=Yt=0,jn=ml=null,Rh=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-si(i),s=1<<a;e|=t[a],i&=~s}return Pa=e,cf(),n}function bS(t,e){Qe=null,Ve.H=wl,e===yo||e===ff?(e=kg(),wt=3):e===cm?(e=kg(),wt=4):wt=e===Tm?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,$n=e,st===null&&(Yt=1,Du(t,yi(e,t.current)))}function ES(){var t=li.current;return t===null?!0:(ot&4194048)===ot?Ti===null:(ot&62914560)===ot||ot&536870912?t===Ti:!1}function TS(){var t=Ve.H;return Ve.H=wl,t===null?wl:t}function AS(){var t=Ve.A;return Ve.A=Qb,t}function zu(){Yt=4,ts||(ot&4194048)!==ot&&li.current!==null||(Mo=!0),!(_s&134217727)&&!(Vs&134217727)||Pt===null||ns(Pt,ot,ni,!1)}function td(t,e,n){var i=mt;mt|=2;var a=TS(),s=AS();(Pt!==t||ot!==e)&&(Pu=null,lo(t,e)),e=!1;var r=Yt;e:do try{if(wt!==0&&st!==null){var o=st,l=$n;switch(wt){case 8:Dm(),r=6;break e;case 3:case 2:case 9:case 6:li.current===null&&(e=!0);var c=wt;if(wt=0,$n=null,Gr(t,o,l,c),n&&Mo){r=0;break e}break;default:c=wt,wt=0,$n=null,Gr(t,o,l,c)}}eE(),r=Yt;break}catch(f){bS(t,f)}while(!0);return e&&t.shellSuspendCounter++,Ea=ir=null,mt=i,Ve.H=a,Ve.A=s,st===null&&(Pt=null,ot=0,cf()),r}function eE(){for(;st!==null;)wS(st)}function tE(t,e){var n=mt;mt|=2;var i=TS(),a=AS();Pt!==t||ot!==e?(Pu=null,Ou=ii()+500,lo(t,e)):Mo=Fl(t,e);e:do try{if(wt!==0&&st!==null){e=st;var s=$n;t:switch(wt){case 1:wt=0,$n=null,Gr(t,e,s,1);break;case 2:case 9:if(Vg(s)){wt=0,$n=null,d0(e);break}e=function(){wt!==2&&wt!==9||Pt!==t||(wt=7),na(t)},s.then(e,e);break e;case 3:wt=7;break e;case 4:wt=5;break e;case 7:Vg(s)?(wt=0,$n=null,d0(e)):(wt=0,$n=null,Gr(t,e,s,7));break;case 5:var r=null;switch(st.tag){case 26:r=st.memoizedState;case 5:case 27:var o=st;if(r?qS(r):o.stateNode.complete){wt=0,$n=null;var l=o.sibling;if(l!==null)st=l;else{var c=o.return;c!==null?(st=c,_f(c)):st=null}break t}}wt=0,$n=null,Gr(t,e,s,5);break;case 6:wt=0,$n=null,Gr(t,e,s,6);break;case 8:Dm(),Yt=6;break e;default:throw Error(oe(462))}}nE();break}catch(f){bS(t,f)}while(!0);return Ea=ir=null,Ve.H=i,Ve.A=a,mt=n,st!==null?0:(Pt=null,ot=0,cf(),Yt)}function nE(){for(;st!==null&&!TM();)wS(st)}function wS(t){var e=eS(t.alternate,t,Pa);t.memoizedProps=t.pendingProps,e===null?_f(t):st=e}function d0(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=s0(n,e,e.pendingProps,e.type,void 0,ot);break;case 11:e=s0(n,e,e.pendingProps,e.type.render,e.ref,ot);break;case 5:gm(e);default:tS(n,e),e=st=tx(e,Pa),e=eS(n,e,Pa)}t.memoizedProps=t.pendingProps,e===null?_f(t):st=e}function Gr(t,e,n,i){Ea=ir=null,gm(e),Zr=null,Tl=0;var a=e.return;try{if(Xb(t,a,e,n,ot)){Yt=1,Du(t,yi(n,t.current)),st=null;return}}catch(s){if(a!==null)throw st=a,s;Yt=1,Du(t,yi(n,t.current)),st=null;return}e.flags&32768?(ut||i===1?t=!0:Mo||ot&536870912?t=!1:(ts=t=!0,(i===2||i===9||i===3||i===6)&&(i=li.current,i!==null&&i.tag===13&&(i.flags|=16384))),RS(e,t)):_f(e)}function _f(t){var e=t;do{if(e.flags&32768){RS(e,ts);return}t=e.return;var n=qb(e.alternate,e,Pa);if(n!==null){st=n;return}if(e=e.sibling,e!==null){st=e;return}st=e=t}while(e!==null);Yt===0&&(Yt=5)}function RS(t,e){do{var n=Yb(t.alternate,t);if(n!==null){n.flags&=32767,st=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){st=t;return}st=t=n}while(t!==null);Yt=6,st=null}function h0(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do xf();while(on!==0);if(mt&6)throw Error(oe(327));if(e!==null){if(e===t.current)throw Error(oe(177));if(s=e.lanes|e.childLanes,s|=nm,PM(t,n,s,r,o,l),t===Pt&&(st=Pt=null,ot=0),oo=e,fs=t,Ra=n,Ch=s,Nh=a,SS=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,rE(Su,function(){return LS(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=Ve.T,Ve.T=null,a=gt.p,gt.p=2,r=mt,mt|=4;try{Zb(t,e,n)}finally{mt=r,gt.p=a,Ve.T=i}}on=1,CS(),NS(),DS()}}function CS(){if(on===1){on=0;var t=fs,e=oo,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=Ve.T,Ve.T=null;var i=gt.p;gt.p=2;var a=mt;mt|=4;try{dS(e,t);var s=Ph,r=q_(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&j_(o.ownerDocument.documentElement,o)){if(l!==null&&tm(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var h=o.ownerDocument||document,u=h&&h.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),_=l.end===void 0?b:Math.min(l.end,g);!p.extend&&b>_&&(r=_,_=b,b=r);var d=Pg(o,b),S=Pg(o,_);if(d&&S&&(p.rangeCount!==1||p.anchorNode!==d.node||p.anchorOffset!==d.offset||p.focusNode!==S.node||p.focusOffset!==S.offset)){var M=h.createRange();M.setStart(d.node,d.offset),p.removeAllRanges(),b>_?(p.addRange(M),p.extend(S.node,S.offset)):(M.setEnd(S.node,S.offset),p.addRange(M))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var x=h[o];x.element.scrollLeft=x.left,x.element.scrollTop=x.top}}Xu=!!Oh,Ph=Oh=null}finally{mt=a,gt.p=i,Ve.T=n}}t.current=e,on=2}}function NS(){if(on===2){on=0;var t=fs,e=oo,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=Ve.T,Ve.T=null;var i=gt.p;gt.p=2;var a=mt;mt|=4;try{oS(t,e.alternate,e)}finally{mt=a,gt.p=i,Ve.T=n}}on=3}}function DS(){if(on===4||on===3){on=0,AM();var t=fs,e=oo,n=Ra,i=SS;e.subtreeFlags&10256||e.flags&10256?on=5:(on=0,oo=fs=null,US(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(us=null),Yp(n),e=e.stateNode,ai&&typeof ai.onCommitFiberRoot=="function")try{ai.onCommitFiberRoot(Bl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=Ve.T,a=gt.p,gt.p=2,Ve.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{Ve.T=e,gt.p=a}}Ra&3&&xf(),na(t),a=t.pendingLanes,n&261930&&a&42?t===Dh?gl++:(gl=0,Dh=t):gl=0,jl(0)}}function US(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,kl(e)))}function xf(){return CS(),NS(),DS(),LS()}function LS(){if(on!==5)return!1;var t=fs,e=Ch;Ch=0;var n=Yp(Ra),i=Ve.T,a=gt.p;try{gt.p=32>n?32:n,Ve.T=null,n=Nh,Nh=null;var s=fs,r=Ra;if(on=0,oo=fs=null,Ra=0,mt&6)throw Error(oe(331));var o=mt;if(mt|=4,vS(s.current),pS(s,s.current,r,n),mt=o,jl(0,!1),ai&&typeof ai.onPostCommitFiberRoot=="function")try{ai.onPostCommitFiberRoot(Bl,s)}catch{}return!0}finally{gt.p=a,Ve.T=i,US(t,e)}}function p0(t,e,n){e=yi(n,e),e=Eh(t.stateNode,e,2),t=cs(t,e,2),t!==null&&(Hl(t,2),na(t))}function Rt(t,e,n){if(t.tag===3)p0(t,t,n);else for(;e!==null;){if(e.tag===3){p0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(us===null||!us.has(i))){t=yi(n,t),n=Yx(2),i=cs(e,n,2),i!==null&&(Zx(n,i,e,t),Hl(i,2),na(i));break}}e=e.return}}function nd(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Jb;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(Cm=!0,a.add(n),t=iE.bind(null,t,e,n),e.then(t,t))}function iE(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Pt===t&&(ot&n)===n&&(Yt===4||Yt===3&&(ot&62914560)===ot&&300>ii()-gf?!(mt&2)&&lo(t,0):Nm|=n,ro===ot&&(ro=0)),na(t)}function OS(t,e){e===0&&(e=T_()),t=nr(t,e),t!==null&&(Hl(t,e),na(t))}function aE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),OS(t,n)}function sE(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(oe(314))}i!==null&&i.delete(e),OS(t,n)}function rE(t,e){return jp(t,e)}var Iu=null,Cr=null,Uh=!1,Bu=!1,id=!1,is=0;function na(t){t!==Cr&&t.next===null&&(Cr===null?Iu=Cr=t:Cr=Cr.next=t),Bu=!0,Uh||(Uh=!0,lE())}function jl(t,e){if(!id&&Bu){id=!0;do for(var n=!1,i=Iu;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-si(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,m0(i,s))}else s=ot,s=sf(i,i===Pt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Fl(i,s)||(n=!0,m0(i,s));i=i.next}while(n);id=!1}}function oE(){PS()}function PS(){Bu=Uh=!1;var t=0;is!==0&&_E()&&(t=is);for(var e=ii(),n=null,i=Iu;i!==null;){var a=i.next,s=zS(i,e);s===0?(i.next=null,n===null?Iu=a:n.next=a,a===null&&(Cr=n)):(n=i,(t!==0||s&3)&&(Bu=!0)),i=a}on!==0&&on!==5||jl(t),is!==0&&(is=0)}function zS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-si(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=OM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=Pt,n=ot,n=sf(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(wt===2||wt===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&Df(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Fl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&Df(i),Yp(n)){case 2:case 8:n=b_;break;case 32:n=Su;break;case 268435456:n=E_;break;default:n=Su}return i=IS.bind(null,t),n=jp(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&Df(i),t.callbackPriority=2,t.callbackNode=null,2}function IS(t,e){if(on!==0&&on!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(xf()&&t.callbackNode!==n)return null;var i=ot;return i=sf(t,t===Pt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(MS(t,i,e),zS(t,ii()),t.callbackNode!=null&&t.callbackNode===n?IS.bind(null,t):null)}function m0(t,e){if(xf())return null;MS(t,e,!0)}function lE(){SE(function(){mt&6?jp(M_,oE):PS()})}function Um(){if(is===0){var t=io;t===0&&(t=ec,ec<<=1,!(ec&261888)&&(ec=256)),is=t}return is}function g0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:qc(""+t)}function v0(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function cE(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=g0((a[Zn]||null).action),r=i.submitter;r&&(e=(e=r[Zn]||null)?g0(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new rf("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(is!==0){var l=r?v0(a,r):new FormData(a);Mh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?v0(a,r):new FormData(a),Mh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var ad=0;ad<uh.length;ad++){var sd=uh[ad],uE=sd.toLowerCase(),fE=sd[0].toUpperCase()+sd.slice(1);Bi(uE,"on"+fE)}Bi(Z_,"onAnimationEnd");Bi(K_,"onAnimationIteration");Bi(Q_,"onAnimationStart");Bi("dblclick","onDoubleClick");Bi("focusin","onFocus");Bi("focusout","onBlur");Bi(wb,"onTransitionRun");Bi(Rb,"onTransitionStart");Bi(Cb,"onTransitionCancel");Bi(J_,"onTransitionEnd");to("onMouseEnter",["mouseout","mouseover"]);to("onMouseLeave",["mouseout","mouseover"]);to("onPointerEnter",["pointerout","pointerover"]);to("onPointerLeave",["pointerout","pointerover"]);$s("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));$s("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));$s("onBeforeInput",["compositionend","keypress","textInput","paste"]);$s("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));$s("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));$s("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Rl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Rl));function BS(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(f){Mu(f)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(f){Mu(f)}a.currentTarget=null,s=l}}}}function at(t,e){var n=e[nh];n===void 0&&(n=e[nh]=new Set);var i=t+"__bubble";n.has(i)||(FS(e,t,2,!1),n.add(i))}function rd(t,e,n){var i=0;e&&(i|=4),FS(n,t,i,e)}var uc="_reactListening"+Math.random().toString(36).slice(2);function Lm(t){if(!t[uc]){t[uc]=!0,N_.forEach(function(n){n!=="selectionchange"&&(dE.has(n)||rd(n,!1,t),rd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[uc]||(e[uc]=!0,rd("selectionchange",!1,e))}}function FS(t,e,n,i){switch(JS(e)){case 2:var a=HE;break;case 8:a=GE;break;default:a=Im}n=a.bind(null,e,n,t),a=void 0,!oh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function od(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Ur(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}B_(function(){var c=s,f=Qp(n),h=[];e:{var u=$_.get(t);if(u!==void 0){var p=rf,g=t;switch(t){case"keypress":if(Zc(n)===0)break e;case"keydown":case"keyup":p=sb;break;case"focusin":g="focus",p=zf;break;case"focusout":g="blur",p=zf;break;case"beforeblur":case"afterblur":p=zf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Tg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=qM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=lb;break;case Z_:case K_:case Q_:p=KM;break;case J_:p=ub;break;case"scroll":case"scrollend":p=WM;break;case"wheel":p=db;break;case"copy":case"cut":case"paste":p=JM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=wg;break;case"toggle":case"beforetoggle":p=pb}var b=(e&4)!==0,_=!b&&(t==="scroll"||t==="scrollend"),d=b?u!==null?u+"Capture":null:u;b=[];for(var S=c,M;S!==null;){var x=S;if(M=x.stateNode,x=x.tag,x!==5&&x!==26&&x!==27||M===null||d===null||(x=Sl(S,d),x!=null&&b.push(Cl(S,x,M))),_)break;S=S.return}0<b.length&&(u=new p(u,g,null,n,f),h.push({event:u,listeners:b}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==rh&&(g=n.relatedTarget||n.fromElement)&&(Ur(g)||g[_o]))break e;if((p||u)&&(u=f.window===f?f:(u=f.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Ur(g):null,g!==null&&(_=Il(g),b=g.tag,g!==_||b!==5&&b!==27&&b!==6)&&(g=null)):(p=null,g=c),p!==g)){if(b=Tg,x="onMouseLeave",d="onMouseEnter",S="mouse",(t==="pointerout"||t==="pointerover")&&(b=wg,x="onPointerLeave",d="onPointerEnter",S="pointer"),_=p==null?u:Jo(p),M=g==null?u:Jo(g),u=new b(x,S+"leave",p,n,f),u.target=_,u.relatedTarget=M,x=null,Ur(f)===c&&(b=new b(d,S+"enter",g,n,f),b.target=M,b.relatedTarget=_,x=b),_=x,p&&g)t:{for(b=hE,d=p,S=g,M=0,x=d;x;x=b(x))M++;x=0;for(var w=S;w;w=b(w))x++;for(;0<M-x;)d=b(d),M--;for(;0<x-M;)S=b(S),x--;for(;M--;){if(d===S||S!==null&&d===S.alternate){b=d;break t}d=b(d),S=b(S)}b=null}else b=null;p!==null&&_0(h,u,p,b,!1),g!==null&&_!==null&&_0(h,_,g,b,!0)}}e:{if(u=c?Jo(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var N=Dg;else if(Ng(u))if(X_)N=Eb;else{N=Mb;var T=yb}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Kp(c.elementType)&&(N=Dg):N=bb;if(N&&(N=N(t,c))){k_(h,N,n,f);break e}T&&T(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&sh(u,"number",u.value)}switch(T=c?Jo(c):window,t){case"focusin":(Ng(T)||T.contentEditable==="true")&&(Pr=T,lh=c,ol=null);break;case"focusout":ol=lh=Pr=null;break;case"mousedown":ch=!0;break;case"contextmenu":case"mouseup":case"dragend":ch=!1,zg(h,n,f);break;case"selectionchange":if(Ab)break;case"keydown":case"keyup":zg(h,n,f)}var y;if(em)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Or?G_(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(H_&&n.locale!=="ko"&&(Or||C!=="onCompositionStart"?C==="onCompositionEnd"&&Or&&(y=F_()):(es=f,Jp="value"in es?es.value:es.textContent,Or=!0)),T=Fu(c,C),0<T.length&&(C=new Ag(C,t,null,n,f),h.push({event:C,listeners:T}),y?C.data=y:(y=V_(n),y!==null&&(C.data=y)))),(y=gb?vb(t,n):_b(t,n))&&(C=Fu(c,"onBeforeInput"),0<C.length&&(T=new Ag("onBeforeInput","beforeinput",null,n,f),h.push({event:T,listeners:C}),T.data=y)),cE(h,t,c,n,f)}BS(h,e)})}function Cl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Fu(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Sl(t,n),a!=null&&i.unshift(Cl(t,a,s)),a=Sl(t,e),a!=null&&i.push(Cl(t,a,s))),t.tag===3)return i;t=t.return}return[]}function hE(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function _0(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Sl(n,s),c!=null&&r.unshift(Cl(n,c,l))):a||(c=Sl(n,s),c!=null&&r.push(Cl(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var pE=/\r\n?/g,mE=/\u0000|\uFFFD/g;function x0(t){return(typeof t=="string"?t:""+t).replace(pE,`
`).replace(mE,"")}function HS(t,e){return e=x0(e),x0(t)===e}function Ut(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||no(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&no(t,""+i);break;case"className":ic(t,"class",i);break;case"tabIndex":ic(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":ic(t,n,i);break;case"style":I_(t,i,s);break;case"data":if(e!=="object"){ic(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=qc(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Ut(t,e,"name",a.name,a,null),Ut(t,e,"formEncType",a.formEncType,a,null),Ut(t,e,"formMethod",a.formMethod,a,null),Ut(t,e,"formTarget",a.formTarget,a,null)):(Ut(t,e,"encType",a.encType,a,null),Ut(t,e,"method",a.method,a,null),Ut(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=qc(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=ba);break;case"onScroll":i!=null&&at("scroll",t);break;case"onScrollEnd":i!=null&&at("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(oe(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(oe(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=qc(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":at("beforetoggle",t),at("toggle",t),jc(t,"popover",i);break;case"xlinkActuate":la(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":la(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":la(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":la(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":la(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":la(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":la(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":la(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":la(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":jc(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=kM.get(n)||n,jc(t,n,i))}}function Lh(t,e,n,i,a,s){switch(n){case"style":I_(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(oe(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(oe(60));t.innerHTML=n}}break;case"children":typeof i=="string"?no(t,i):(typeof i=="number"||typeof i=="bigint")&&no(t,""+i);break;case"onScroll":i!=null&&at("scroll",t);break;case"onScrollEnd":i!=null&&at("scrollend",t);break;case"onClick":i!=null&&(t.onclick=ba);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!D_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[Zn]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):jc(t,n,i)}}}function En(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":at("error",t),at("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(oe(137,e));default:Ut(t,e,s,r,n,null)}}a&&Ut(t,e,"srcSet",n.srcSet,n,null),i&&Ut(t,e,"src",n.src,n,null);return;case"input":at("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":a=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":s=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(oe(137,e));break;default:Ut(t,e,i,f,n,null)}}O_(t,s,o,l,c,r,a,!1);return;case"select":at("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Ut(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?jr(t,!!i,e,!1):n!=null&&jr(t,!!i,n,!0);return;case"textarea":at("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(oe(91));break;default:Ut(t,e,r,o,n,null)}z_(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ut(t,e,l,i,n,null)}return;case"dialog":at("beforetoggle",t),at("toggle",t),at("cancel",t),at("close",t);break;case"iframe":case"object":at("load",t);break;case"video":case"audio":for(i=0;i<Rl.length;i++)at(Rl[i],t);break;case"image":at("error",t),at("load",t);break;case"details":at("toggle",t);break;case"embed":case"source":case"link":at("error",t),at("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(oe(137,e));default:Ut(t,e,c,i,n,null)}return;default:if(Kp(e)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Lh(t,e,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Ut(t,e,o,i,n,null))}function gE(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,f=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||Ut(t,e,p,null,i,h)}}for(var u in i){var p=i[u];if(h=n[u],i.hasOwnProperty(u)&&(p!=null||h!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":f=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(oe(137,e));break;default:p!==h&&Ut(t,e,u,p,i,h)}}ah(t,r,o,l,c,f,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||Ut(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Ut(t,e,a,s,i,l)}e=o,n=r,i=p,u!=null?jr(t,!!n,u,!1):!!i!=!!n&&(e!=null?jr(t,!!n,e,!0):jr(t,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Ut(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(oe(91));break;default:a!==s&&Ut(t,e,r,a,i,s)}P_(t,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:Ut(t,e,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Ut(t,e,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&Ut(t,e,b,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(oe(137,e));break;default:Ut(t,e,c,u,i,p)}return;default:if(Kp(e)){for(var _ in n)u=n[_],n.hasOwnProperty(_)&&u!==void 0&&!i.hasOwnProperty(_)&&Lh(t,e,_,void 0,i,u);for(f in i)u=i[f],p=n[f],!i.hasOwnProperty(f)||u===p||u===void 0&&p===void 0||Lh(t,e,f,u,i,p);return}}for(var d in n)u=n[d],n.hasOwnProperty(d)&&u!=null&&!i.hasOwnProperty(d)&&Ut(t,e,d,null,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u==null&&p==null||Ut(t,e,h,u,i,p)}function S0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function vE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&S0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,h=l.initiatorType;f&&S0(h)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Oh=null,Ph=null;function Hu(t){return t.nodeType===9?t:t.ownerDocument}function y0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function GS(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function zh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ld=null;function _E(){var t=window.event;return t&&t.type==="popstate"?t===ld?!1:(ld=t,!0):(ld=null,!1)}var VS=typeof setTimeout=="function"?setTimeout:void 0,xE=typeof clearTimeout=="function"?clearTimeout:void 0,M0=typeof Promise=="function"?Promise:void 0,SE=typeof queueMicrotask=="function"?queueMicrotask:typeof M0<"u"?function(t){return M0.resolve(null).then(t).catch(yE)}:VS;function yE(t){setTimeout(function(){throw t})}function ys(t){return t==="head"}function b0(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),uo(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")vl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,vl(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[Gl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&vl(t.ownerDocument.body);n=a}while(n);uo(e)}function E0(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Ih(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Ih(n),Zp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function ME(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[Gl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ai(t.nextSibling),t===null)break}return null}function bE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ai(t.nextSibling),t===null))return null;return t}function kS(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ai(t.nextSibling),t===null))return null;return t}function Bh(t){return t.data==="$?"||t.data==="$~"}function Fh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function EE(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Ai(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Hh=null;function T0(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ai(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function A0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function XS(t,e,n){switch(e=Hu(n),t){case"html":if(t=e.documentElement,!t)throw Error(oe(452));return t;case"head":if(t=e.head,!t)throw Error(oe(453));return t;case"body":if(t=e.body,!t)throw Error(oe(454));return t;default:throw Error(oe(451))}}function vl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Zp(t)}var Ri=new Map,w0=new Set;function Gu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ba=gt.d;gt.d={f:TE,r:AE,D:wE,C:RE,L:CE,m:NE,X:UE,S:DE,M:LE};function TE(){var t=Ba.f(),e=vf();return t||e}function AE(t){var e=xo(t);e!==null&&e.tag===5&&e.type==="form"?Ix(e):Ba.r(t)}var bo=typeof document>"u"?null:document;function WS(t,e,n){var i=bo;if(i&&typeof e=="string"&&e){var a=Si(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),w0.has(a)||(w0.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),En(e,"link",t),mn(e),i.head.appendChild(e)))}}function wE(t){Ba.D(t),WS("dns-prefetch",t,null)}function RE(t,e){Ba.C(t,e),WS("preconnect",t,e)}function CE(t,e,n){Ba.L(t,e,n);var i=bo;if(i&&t&&e){var a='link[rel="preload"][as="'+Si(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Si(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Si(n.imageSizes)+'"]')):a+='[href="'+Si(t)+'"]';var s=a;switch(e){case"style":s=co(t);break;case"script":s=Eo(t)}Ri.has(s)||(t=kt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ri.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(ql(s))||e==="script"&&i.querySelector(Yl(s))||(e=i.createElement("link"),En(e,"link",t),mn(e),i.head.appendChild(e)))}}function NE(t,e){Ba.m(t,e);var n=bo;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Si(i)+'"][href="'+Si(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Eo(t)}if(!Ri.has(s)&&(t=kt({rel:"modulepreload",href:t},e),Ri.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Yl(s)))return}i=n.createElement("link"),En(i,"link",t),mn(i),n.head.appendChild(i)}}}function DE(t,e,n){Ba.S(t,e,n);var i=bo;if(i&&t){var a=Wr(i).hoistableStyles,s=co(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(ql(s)))o.loading=5;else{t=kt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ri.get(s))&&Om(t,n);var l=r=i.createElement("link");mn(l),En(l,"link",t),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,iu(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function UE(t,e){Ba.X(t,e);var n=bo;if(n&&t){var i=Wr(n).hoistableScripts,a=Eo(t),s=i.get(a);s||(s=n.querySelector(Yl(a)),s||(t=kt({src:t,async:!0},e),(e=Ri.get(a))&&Pm(t,e),s=n.createElement("script"),mn(s),En(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function LE(t,e){Ba.M(t,e);var n=bo;if(n&&t){var i=Wr(n).hoistableScripts,a=Eo(t),s=i.get(a);s||(s=n.querySelector(Yl(a)),s||(t=kt({src:t,async:!0,type:"module"},e),(e=Ri.get(a))&&Pm(t,e),s=n.createElement("script"),mn(s),En(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function R0(t,e,n,i){var a=(a=rs.current)?Gu(a):null;if(!a)throw Error(oe(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=co(n.href),n=Wr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=co(n.href);var s=Wr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(ql(t)))&&!s._p&&(r.instance=s,r.state.loading=5),Ri.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ri.set(t,n),s||OE(a,t,n,r.state))),e&&i===null)throw Error(oe(528,""));return r}if(e&&i!==null)throw Error(oe(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Eo(n),n=Wr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(oe(444,t))}}function co(t){return'href="'+Si(t)+'"'}function ql(t){return'link[rel="stylesheet"]['+t+"]"}function jS(t){return kt({},t,{"data-precedence":t.precedence,precedence:null})}function OE(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),En(e,"link",n),mn(e),t.head.appendChild(e))}function Eo(t){return'[src="'+Si(t)+'"]'}function Yl(t){return"script[async]"+t}function C0(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Si(n.href)+'"]');if(i)return e.instance=i,mn(i),i;var a=kt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),mn(i),En(i,"style",a),iu(i,n.precedence,t),e.instance=i;case"stylesheet":a=co(n.href);var s=t.querySelector(ql(a));if(s)return e.state.loading|=4,e.instance=s,mn(s),s;i=jS(n),(a=Ri.get(a))&&Om(i,a),s=(t.ownerDocument||t).createElement("link"),mn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),En(s,"link",i),e.state.loading|=4,iu(s,n.precedence,t),e.instance=s;case"script":return s=Eo(n.src),(a=t.querySelector(Yl(s)))?(e.instance=a,mn(a),a):(i=n,(a=Ri.get(s))&&(i=kt({},n),Pm(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),mn(a),En(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(oe(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,iu(i,n.precedence,t));return e.instance}function iu(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Om(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Pm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var au=null;function N0(t,e,n){if(au===null){var i=new Map,a=au=new Map;a.set(n,i)}else a=au,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[Gl]||s[xn]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function D0(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function PE(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function qS(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function zE(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=co(i.href),s=e.querySelector(ql(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Vu.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,mn(s);return}s=e.ownerDocument||e,i=jS(i),(a=Ri.get(a))&&Om(i,a),s=s.createElement("link"),mn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),En(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Vu.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var cd=0;function IE(t,e){return t.stylesheets&&t.count===0&&su(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&su(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&cd===0&&(cd=62500*vE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&su(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>cd?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Vu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)su(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ku=null;function su(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ku=new Map,e.forEach(BE,t),ku=null,Vu.call(t))}function BE(t,e){if(!(e.state.loading&4)){var n=ku.get(t);if(n)var i=n.get(null);else{n=new Map,ku.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Vu.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Nl={$$typeof:Ma,Provider:null,Consumer:null,_currentValue:Bs,_currentValue2:Bs,_threadCount:0};function FE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Uf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uf(0),this.hiddenUpdates=Uf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function YS(t,e,n,i,a,s,r,o,l,c,f,h){return t=new FE(t,e,n,r,l,c,f,h,o),e=1,s===!0&&(e|=24),s=ti(3,null,null,e),t.current=s,s.stateNode=t,e=om(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},um(s),t}function ZS(t){return t?(t=Br,t):Br}function KS(t,e,n,i,a,s){a=ZS(a),i.context===null?i.context=a:i.pendingContext=a,i=ls(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=cs(t,i,e),n!==null&&(qn(n,t,e),cl(n,t,e))}function U0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function zm(t,e){U0(t,e),(t=t.alternate)&&U0(t,e)}function QS(t){if(t.tag===13||t.tag===31){var e=nr(t,67108864);e!==null&&qn(e,t,67108864),zm(t,67108864)}}function L0(t){if(t.tag===13||t.tag===31){var e=ri();e=qp(e);var n=nr(t,e);n!==null&&qn(n,t,e),zm(t,e)}}var Xu=!0;function HE(t,e,n,i){var a=Ve.T;Ve.T=null;var s=gt.p;try{gt.p=2,Im(t,e,n,i)}finally{gt.p=s,Ve.T=a}}function GE(t,e,n,i){var a=Ve.T;Ve.T=null;var s=gt.p;try{gt.p=8,Im(t,e,n,i)}finally{gt.p=s,Ve.T=a}}function Im(t,e,n,i){if(Xu){var a=Gh(i);if(a===null)od(t,e,i,Wu,n),O0(t,i);else if(kE(a,t,e,n,i))i.stopPropagation();else if(O0(t,i),e&4&&-1<VE.indexOf(t)){for(;a!==null;){var s=xo(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Ns(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-si(r);o.entanglements[1]|=l,r&=~l}na(s),!(mt&6)&&(Ou=ii()+500,jl(0))}}break;case 31:case 13:o=nr(s,2),o!==null&&qn(o,s,2),vf(),zm(s,2)}if(s=Gh(i),s===null&&od(t,e,i,Wu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else od(t,e,i,null,n)}}function Gh(t){return t=Qp(t),Bm(t)}var Wu=null;function Bm(t){if(Wu=null,t=Ur(t),t!==null){var e=Il(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v_(e),t!==null)return t;t=null}else if(n===31){if(t=__(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Wu=t,null}function JS(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(wM()){case M_:return 2;case b_:return 8;case Su:case RM:return 32;case E_:return 268435456;default:return 32}default:return 32}}var Vh=!1,ds=null,hs=null,ps=null,Dl=new Map,Ul=new Map,Qa=[],VE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function O0(t,e){switch(t){case"focusin":case"focusout":ds=null;break;case"dragenter":case"dragleave":hs=null;break;case"mouseover":case"mouseout":ps=null;break;case"pointerover":case"pointerout":Dl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ul.delete(e.pointerId)}}function Fo(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=xo(e),e!==null&&QS(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function kE(t,e,n,i,a){switch(e){case"focusin":return ds=Fo(ds,t,e,n,i,a),!0;case"dragenter":return hs=Fo(hs,t,e,n,i,a),!0;case"mouseover":return ps=Fo(ps,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return Dl.set(s,Fo(Dl.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ul.set(s,Fo(Ul.get(s)||null,t,e,n,i,a)),!0}return!1}function $S(t){var e=Ur(t.target);if(e!==null){var n=Il(e);if(n!==null){if(e=n.tag,e===13){if(e=v_(n),e!==null){t.blockedOn=e,_g(t.priority,function(){L0(n)});return}}else if(e===31){if(e=__(n),e!==null){t.blockedOn=e,_g(t.priority,function(){L0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ru(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Gh(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);rh=i,n.target.dispatchEvent(i),rh=null}else return e=xo(n),e!==null&&QS(e),t.blockedOn=n,!1;e.shift()}return!0}function P0(t,e,n){ru(t)&&n.delete(e)}function XE(){Vh=!1,ds!==null&&ru(ds)&&(ds=null),hs!==null&&ru(hs)&&(hs=null),ps!==null&&ru(ps)&&(ps=null),Dl.forEach(P0),Ul.forEach(P0)}function fc(t,e){t.blockedOn===e&&(t.blockedOn=null,Vh||(Vh=!0,ln.unstable_scheduleCallback(ln.unstable_NormalPriority,XE)))}var dc=null;function z0(t){dc!==t&&(dc=t,ln.unstable_scheduleCallback(ln.unstable_NormalPriority,function(){dc===t&&(dc=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(Bm(i||n)===null)continue;break}var s=xo(n);s!==null&&(t.splice(e,3),e-=3,Mh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function uo(t){function e(l){return fc(l,t)}ds!==null&&fc(ds,t),hs!==null&&fc(hs,t),ps!==null&&fc(ps,t),Dl.forEach(e),Ul.forEach(e);for(var n=0;n<Qa.length;n++){var i=Qa[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<Qa.length&&(n=Qa[0],n.blockedOn===null);)$S(n),n.blockedOn===null&&Qa.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[Zn]||null;if(typeof s=="function")r||z0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[Zn]||null)o=r.formAction;else if(Bm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),z0(n)}}}function ey(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Fm(t){this._internalRoot=t}Sf.prototype.render=Fm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(oe(409));var n=e.current,i=ri();KS(n,i,t,e,null,null)};Sf.prototype.unmount=Fm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;KS(t.current,2,null,t,null,null),vf(),e[_o]=null}};function Sf(t){this._internalRoot=t}Sf.prototype.unstable_scheduleHydration=function(t){if(t){var e=C_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Qa.length&&e!==0&&e<Qa[n].priority;n++);Qa.splice(n,0,t),n===0&&$S(t)}};var I0=m_.version;if(I0!=="19.2.8")throw Error(oe(527,I0,"19.2.8"));gt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(oe(188)):(t=Object.keys(t).join(","),Error(oe(268,t)));return t=SM(e),t=t!==null?x_(t):null,t=t===null?null:t.stateNode,t};var WE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:Ve,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hc.isDisabled&&hc.supportsFiber)try{Bl=hc.inject(WE),ai=hc}catch{}}nf.createRoot=function(t,e){if(!g_(t))throw Error(oe(299));var n=!1,i="",a=Wx,s=jx,r=qx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=YS(t,1,!1,null,null,n,i,null,a,s,r,ey),t[_o]=e.current,Lm(t),new Fm(e)};nf.hydrateRoot=function(t,e,n){if(!g_(t))throw Error(oe(299));var i=!1,a="",s=Wx,r=jx,o=qx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=YS(t,1,!0,e,n??null,i,a,l,s,r,o,ey),e.context=ZS(null),n=e.current,i=ri(),i=qp(i),a=ls(i),a.callback=null,cs(n,a,i),n=i,e.current.lanes=n,Hl(e,n),na(e),t[_o]=e.current,Lm(t),new Sf(e)};nf.version="19.2.8";function ty(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ty)}catch(t){console.error(t)}}ty(),c_.exports=nf;var jE=c_.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hm="185",qE=0,B0=1,YE=2,ou=1,ZE=2,tl=3,xs=0,Yn=1,ya=2,Ca=0,ks=1,Vr=2,F0=3,H0=4,KE=5,Os=100,QE=101,JE=102,$E=103,eT=104,tT=200,nT=201,iT=202,aT=203,kh=204,Xh=205,sT=206,rT=207,oT=208,lT=209,cT=210,uT=211,fT=212,dT=213,hT=214,Wh=0,jh=1,qh=2,fo=3,Yh=4,Zh=5,Kh=6,Qh=7,ny=0,pT=1,mT=2,Ji=0,iy=1,ay=2,sy=3,ry=4,oy=5,ly=6,cy=7,uy=300,Zs=301,ho=302,ud=303,fd=304,yf=306,Jh=1e3,Ta=1001,$h=1002,Mn=1003,gT=1004,pc=1005,wn=1006,dd=1007,zs=1008,bi=1009,fy=1010,dy=1011,Ll=1012,Gm=1013,ea=1014,zi=1015,za=1016,Vm=1017,km=1018,Ol=1020,hy=35902,py=35899,my=1021,gy=1022,Ii=1023,Ia=1026,Is=1027,Xm=1028,Wm=1029,Ks=1030,jm=1031,qm=1033,lu=33776,cu=33777,uu=33778,fu=33779,ep=35840,tp=35841,np=35842,ip=35843,ap=36196,sp=37492,rp=37496,op=37488,lp=37489,ju=37490,cp=37491,up=37808,fp=37809,dp=37810,hp=37811,pp=37812,mp=37813,gp=37814,vp=37815,_p=37816,xp=37817,Sp=37818,yp=37819,Mp=37820,bp=37821,Ep=36492,Tp=36494,Ap=36495,wp=36283,Rp=36284,qu=36285,Cp=36286,vT=3200,G0=0,_T=1,Ja="",mi="srgb",Yu="srgb-linear",Zu="linear",At="srgb",ur=7680,V0=519,xT=512,ST=513,yT=514,Ym=515,MT=516,bT=517,Zm=518,ET=519,k0=35044,X0="300 es",Ki=2e3,Ku=2001;function TT(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Qu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function AT(){const t=Qu("canvas");return t.style.display="block",t}const W0={};function j0(...t){const e="THREE."+t.shift();console.log(e,...t)}function vy(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function He(...t){t=vy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function ht(...t){t=vy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Jr(...t){const e=t.join(" ");e in W0||(W0[e]=!0,He(...t))}function wT(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const RT={[Wh]:jh,[qh]:Kh,[Yh]:Qh,[fo]:Zh,[jh]:Wh,[Kh]:qh,[Qh]:Yh,[Zh]:fo};class ar{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],du=Math.PI/180,Np=180/Math.PI;function Zl(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tn[t&255]+Tn[t>>8&255]+Tn[t>>16&255]+Tn[t>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[n&63|128]+Tn[n>>8&255]+"-"+Tn[n>>16&255]+Tn[n>>24&255]+Tn[i&255]+Tn[i>>8&255]+Tn[i>>16&255]+Tn[i>>24&255]).toLowerCase()}function ct(t,e,n){return Math.max(e,Math.min(n,t))}function CT(t,e){return(t%e+e)%e}function hd(t,e,n){return(1-n)*t+n*e}function Ho(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const tg=class tg{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=ct(this.x,e.x,n.x),this.y=ct(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=ct(this.x,e,n),this.y=ct(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};tg.prototype.isVector2=!0;let vt=tg;class To{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],f=i[a+2],h=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],b=s[r+3];if(h!==b||l!==u||c!==p||f!==g){let _=l*u+c*p+f*g+h*b;_<0&&(u=-u,p=-p,g=-g,b=-b,_=-_);let d=1-o;if(_<.9995){const S=Math.acos(_),M=Math.sin(S);d=Math.sin(d*S)/M,o=Math.sin(o*S)/M,l=l*d+u*o,c=c*d+p*o,f=f*d+g*o,h=h*d+b*o}else{l=l*d+u*o,c=c*d+p*o,f=f*d+g*o,h=h*d+b*o;const S=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=S,c*=S,f*=S,h*=S}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],f=i[a+3],h=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return e[n]=o*g+f*h+l*p-c*u,e[n+1]=l*g+f*u+c*h-o*p,e[n+2]=c*g+f*p+o*u-l*h,e[n+3]=f*g-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(a/2),h=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*f*h+c*p*g,this._y=c*p*h-u*f*g,this._z=c*f*g+u*p*h,this._w=c*f*h-u*p*g;break;case"YXZ":this._x=u*f*h+c*p*g,this._y=c*p*h-u*f*g,this._z=c*f*g-u*p*h,this._w=c*f*h+u*p*g;break;case"ZXY":this._x=u*f*h-c*p*g,this._y=c*p*h+u*f*g,this._z=c*f*g+u*p*h,this._w=c*f*h-u*p*g;break;case"ZYX":this._x=u*f*h-c*p*g,this._y=c*p*h+u*f*g,this._z=c*f*g-u*p*h,this._w=c*f*h+u*p*g;break;case"YZX":this._x=u*f*h+c*p*g,this._y=c*p*h+u*f*g,this._z=c*f*g-u*p*h,this._w=c*f*h-u*p*g;break;case"XZY":this._x=u*f*h-c*p*g,this._y=c*p*h-u*f*g,this._z=c*f*g+u*p*h,this._w=c*f*h+u*p*g;break;default:He("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(f-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ct(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+a*c-s*l,this._y=a*f+r*l+s*o-i*c,this._z=s*f+r*c+i*l-a*o,this._w=r*f-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ng=class ng{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(q0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(q0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),f=2*(o*n-s*a),h=2*(s*i-r*n);return this.x=n+l*c+r*h-o*f,this.y=i+l*f+o*c-s*h,this.z=a+l*h+s*f-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=ct(this.x,e.x,n.x),this.y=ct(this.y,e.y,n.y),this.z=ct(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=ct(this.x,e,n),this.y=ct(this.y,e,n),this.z=ct(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pd.copy(this).projectOnVector(e),this.sub(pd)}reflect(e){return this.sub(pd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ct(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ng.prototype.isVector3=!0;let j=ng;const pd=new j,q0=new To,ig=class ig{constructor(e,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const f=this.elements;return f[0]=e,f[1]=a,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],h=i[7],u=i[2],p=i[5],g=i[8],b=a[0],_=a[3],d=a[6],S=a[1],M=a[4],x=a[7],w=a[2],N=a[5],T=a[8];return s[0]=r*b+o*S+l*w,s[3]=r*_+o*M+l*N,s[6]=r*d+o*x+l*T,s[1]=c*b+f*S+h*w,s[4]=c*_+f*M+h*N,s[7]=c*d+f*x+h*T,s[2]=u*b+p*S+g*w,s[5]=u*_+p*M+g*N,s[8]=u*d+p*x+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return n*r*f-n*o*c-i*s*f+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=f*r-o*c,u=o*l-f*s,p=c*s-r*l,g=n*h+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=h*b,e[1]=(a*c-f*i)*b,e[2]=(o*i-a*r)*b,e[3]=u*b,e[4]=(f*n-a*l)*b,e[5]=(a*s-o*n)*b,e[6]=p*b,e[7]=(i*l-c*n)*b,e[8]=(r*n-i*s)*b,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return Jr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(md.makeScale(e,n)),this}rotate(e){return Jr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(md.makeRotation(-e)),this}translate(e,n){return Jr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(md.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ig.prototype.isMatrix3=!0;let We=ig;const md=new We,Y0=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Z0=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function NT(){const t={enabled:!0,workingColorSpace:Yu,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===At&&(a.r=Na(a.r),a.g=Na(a.g),a.b=Na(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===At&&(a.r=$r(a.r),a.g=$r(a.g),a.b=$r(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Ja?Zu:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return Jr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return Jr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Yu]:{primaries:e,whitePoint:i,transfer:Zu,toXYZ:Y0,fromXYZ:Z0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:e,whitePoint:i,transfer:At,toXYZ:Y0,fromXYZ:Z0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),t}const lt=NT();function Na(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function $r(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let fr;class DT{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{fr===void 0&&(fr=Qu("canvas")),fr.width=e.width,fr.height=e.height;const a=fr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=fr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Qu("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Na(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Na(n[i]/255)*255):n[i]=Na(n[i]);return{data:n,width:e.width,height:e.height}}else return He("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let UT=0;class Km{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:UT++}),this.uuid=Zl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(gd(a[r].image)):s.push(gd(a[r]))}else s=gd(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function gd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?DT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(He("Texture: Unable to serialize Texture."),{})}let LT=0;const vd=new j;class In extends ar{constructor(e=In.DEFAULT_IMAGE,n=In.DEFAULT_MAPPING,i=Ta,a=Ta,s=wn,r=zs,o=Ii,l=bi,c=In.DEFAULT_ANISOTROPY,f=Ja){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:LT++}),this.uuid=Zl(),this.name="",this.source=new Km(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new vt(0,0),this.repeat=new vt(1,1),this.center=new vt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vd).x}get height(){return this.source.getSize(vd).y}get depth(){return this.source.getSize(vd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){He(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){He(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jh:e.x=e.x-Math.floor(e.x);break;case Ta:e.x=e.x<0?0:1;break;case $h:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jh:e.y=e.y-Math.floor(e.y);break;case Ta:e.y=e.y<0?0:1;break;case $h:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=uy;In.DEFAULT_ANISOTROPY=1;const ag=class ag{constructor(e=0,n=0,i=0,a=1){this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],f=l[4],h=l[8],u=l[1],p=l[5],g=l[9],b=l[2],_=l[6],d=l[10];if(Math.abs(f-u)<.01&&Math.abs(h-b)<.01&&Math.abs(g-_)<.01){if(Math.abs(f+u)<.1&&Math.abs(h+b)<.1&&Math.abs(g+_)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,x=(p+1)/2,w=(d+1)/2,N=(f+u)/4,T=(h+b)/4,y=(g+_)/4;return M>x&&M>w?M<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(M),a=N/i,s=T/i):x>w?x<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(x),i=N/a,s=y/a):w<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(w),i=T/s,a=y/s),this.set(i,a,s,n),this}let S=Math.sqrt((_-g)*(_-g)+(h-b)*(h-b)+(u-f)*(u-f));return Math.abs(S)<.001&&(S=1),this.x=(_-g)/S,this.y=(h-b)/S,this.z=(u-f)/S,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=ct(this.x,e.x,n.x),this.y=ct(this.y,e.y,n.y),this.z=ct(this.z,e.z,n.z),this.w=ct(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=ct(this.x,e,n),this.y=ct(this.y,e,n),this.z=ct(this.z,e,n),this.w=ct(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ct(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ag.prototype.isVector4=!0;let Zt=ag;class OT extends ar{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Zt(0,0,e,n),this.scissorTest=!1,this.viewport=new Zt(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new In(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new Km(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $i extends OT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class _y extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class PT extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ef=class ef{constructor(e,n,i,a,s,r,o,l,c,f,h,u,p,g,b,_){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,f,h,u,p,g,b,_)}set(e,n,i,a,s,r,o,l,c,f,h,u,p,g,b,_){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=a,d[1]=s,d[5]=r,d[9]=o,d[13]=l,d[2]=c,d[6]=f,d[10]=h,d[14]=u,d[3]=p,d[7]=g,d[11]=b,d[15]=_,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ef().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,a=1/dr.setFromMatrixColumn(e,0).length(),s=1/dr.setFromMatrixColumn(e,1).length(),r=1/dr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=r*f,p=r*h,g=o*f,b=o*h;n[0]=l*f,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+p*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*f,p=l*h,g=c*f,b=c*h;n[0]=u+b*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*h,n[5]=r*f,n[9]=-o,n[2]=p*o-g,n[6]=b+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*f,p=l*h,g=c*f,b=c*h;n[0]=u-b*o,n[4]=-r*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*f,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*f,p=r*h,g=o*f,b=o*h;n[0]=l*f,n[4]=g*c-p,n[8]=u*c+b,n[1]=l*h,n[5]=b*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*f,n[4]=b-u*h,n[8]=g*h+p,n[1]=h,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*h+g,n[10]=u-b*h}else if(e.order==="XZY"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*f,n[4]=-h,n[8]=c*f,n[1]=u*h+b,n[5]=r*f,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*f,n[10]=b*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zT,e,IT)}lookAt(e,n,i){const a=this.elements;return Qn.subVectors(e,n),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Ha.crossVectors(i,Qn),Ha.lengthSq()===0&&(Math.abs(i.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Ha.crossVectors(i,Qn)),Ha.normalize(),mc.crossVectors(Qn,Ha),a[0]=Ha.x,a[4]=mc.x,a[8]=Qn.x,a[1]=Ha.y,a[5]=mc.y,a[9]=Qn.y,a[2]=Ha.z,a[6]=mc.z,a[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],h=i[5],u=i[9],p=i[13],g=i[2],b=i[6],_=i[10],d=i[14],S=i[3],M=i[7],x=i[11],w=i[15],N=a[0],T=a[4],y=a[8],C=a[12],R=a[1],D=a[5],O=a[9],H=a[13],L=a[2],P=a[6],I=a[10],z=a[14],U=a[3],k=a[7],re=a[11],le=a[15];return s[0]=r*N+o*R+l*L+c*U,s[4]=r*T+o*D+l*P+c*k,s[8]=r*y+o*O+l*I+c*re,s[12]=r*C+o*H+l*z+c*le,s[1]=f*N+h*R+u*L+p*U,s[5]=f*T+h*D+u*P+p*k,s[9]=f*y+h*O+u*I+p*re,s[13]=f*C+h*H+u*z+p*le,s[2]=g*N+b*R+_*L+d*U,s[6]=g*T+b*D+_*P+d*k,s[10]=g*y+b*O+_*I+d*re,s[14]=g*C+b*H+_*z+d*le,s[3]=S*N+M*R+x*L+w*U,s[7]=S*T+M*D+x*P+w*k,s[11]=S*y+M*O+x*I+w*re,s[15]=S*C+M*H+x*z+w*le,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],f=e[2],h=e[6],u=e[10],p=e[14],g=e[3],b=e[7],_=e[11],d=e[15],S=l*p-c*u,M=o*p-c*h,x=o*u-l*h,w=r*p-c*f,N=r*u-l*f,T=r*h-o*f;return n*(b*S-_*M+d*x)-i*(g*S-_*w+d*N)+a*(g*M-b*w+d*T)-s*(g*x-b*N+_*T)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return n*(r*f-o*c)-i*(s*f-o*l)+a*(s*c-r*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=e[9],u=e[10],p=e[11],g=e[12],b=e[13],_=e[14],d=e[15],S=n*o-i*r,M=n*l-a*r,x=n*c-s*r,w=i*l-a*o,N=i*c-s*o,T=a*c-s*l,y=f*b-h*g,C=f*_-u*g,R=f*d-p*g,D=h*_-u*b,O=h*d-p*b,H=u*d-p*_,L=S*H-M*O+x*D+w*R-N*C+T*y;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/L;return e[0]=(o*H-l*O+c*D)*P,e[1]=(a*O-i*H-s*D)*P,e[2]=(b*T-_*N+d*w)*P,e[3]=(u*N-h*T-p*w)*P,e[4]=(l*R-r*H-c*C)*P,e[5]=(n*H-a*R+s*C)*P,e[6]=(_*x-g*T-d*M)*P,e[7]=(f*T-u*x+p*M)*P,e[8]=(r*O-o*R+c*y)*P,e[9]=(i*R-n*O-s*y)*P,e[10]=(g*N-b*x+d*S)*P,e[11]=(h*x-f*N-p*S)*P,e[12]=(o*C-r*D-l*y)*P,e[13]=(n*D-i*C+a*y)*P,e[14]=(b*M-g*w-_*S)*P,e[15]=(f*w-h*M+u*S)*P,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,f=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,f*o+i,f*l-a*r,0,c*l-a*o,f*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,f=r+r,h=o+o,u=s*c,p=s*f,g=s*h,b=r*f,_=r*h,d=o*h,S=l*c,M=l*f,x=l*h,w=i.x,N=i.y,T=i.z;return a[0]=(1-(b+d))*w,a[1]=(p+x)*w,a[2]=(g-M)*w,a[3]=0,a[4]=(p-x)*N,a[5]=(1-(u+d))*N,a[6]=(_+S)*N,a[7]=0,a[8]=(g+M)*T,a[9]=(_-S)*T,a[10]=(1-(u+b))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=dr.set(a[0],a[1],a[2]).length();const o=dr.set(a[4],a[5],a[6]).length(),l=dr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Ui.copy(this);const c=1/r,f=1/o,h=1/l;return Ui.elements[0]*=c,Ui.elements[1]*=c,Ui.elements[2]*=c,Ui.elements[4]*=f,Ui.elements[5]*=f,Ui.elements[6]*=f,Ui.elements[8]*=h,Ui.elements[9]*=h,Ui.elements[10]*=h,n.setFromRotationMatrix(Ui),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=Ki,l=!1){const c=this.elements,f=2*s/(n-e),h=2*s/(i-a),u=(n+e)/(n-e),p=(i+a)/(i-a);let g,b;if(l)g=s/(r-s),b=r*s/(r-s);else if(o===Ki)g=-(r+s)/(r-s),b=-2*r*s/(r-s);else if(o===Ku)g=-r/(r-s),b=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=Ki,l=!1){const c=this.elements,f=2/(n-e),h=2/(i-a),u=-(n+e)/(n-e),p=-(i+a)/(i-a);let g,b;if(l)g=1/(r-s),b=r/(r-s);else if(o===Ki)g=-2/(r-s),b=-(r+s)/(r-s);else if(o===Ku)g=-1/(r-s),b=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};ef.prototype.isMatrix4=!0;let It=ef;const dr=new j,Ui=new It,zT=new j(0,0,0),IT=new j(1,1,1),Ha=new j,mc=new j,Qn=new j,K0=new It,Q0=new To;class Qs{constructor(e=0,n=0,i=0,a=Qs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],f=a[9],h=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(ct(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ct(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ct(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ct(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ct(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ct(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:He("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return K0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(K0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Q0.setFromEuler(this),this.setFromQuaternion(Q0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qs.DEFAULT_ORDER="XYZ";class xy{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let BT=0;const J0=new j,hr=new To,da=new It,gc=new j,Go=new j,FT=new j,HT=new To,$0=new j(1,0,0),ev=new j(0,1,0),tv=new j(0,0,1),nv={type:"added"},GT={type:"removed"},pr={type:"childadded",child:null},_d={type:"childremoved",child:null};class Bn extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:BT++}),this.uuid=Zl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bn.DEFAULT_UP.clone();const e=new j,n=new Qs,i=new To,a=new j(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new It},normalMatrix:{value:new We}}),this.matrix=new It,this.matrixWorld=new It,this.matrixAutoUpdate=Bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xy,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return hr.setFromAxisAngle(e,n),this.quaternion.multiply(hr),this}rotateOnWorldAxis(e,n){return hr.setFromAxisAngle(e,n),this.quaternion.premultiply(hr),this}rotateX(e){return this.rotateOnAxis($0,e)}rotateY(e){return this.rotateOnAxis(ev,e)}rotateZ(e){return this.rotateOnAxis(tv,e)}translateOnAxis(e,n){return J0.copy(e).applyQuaternion(this.quaternion),this.position.add(J0.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis($0,e)}translateY(e){return this.translateOnAxis(ev,e)}translateZ(e){return this.translateOnAxis(tv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(da.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?gc.copy(e):gc.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?da.lookAt(Go,gc,this.up):da.lookAt(gc,Go,this.up),this.quaternion.setFromRotationMatrix(da),a&&(da.extractRotation(a.matrixWorld),hr.setFromRotationMatrix(da),this.quaternion.premultiply(hr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(ht("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nv),pr.child=e,this.dispatchEvent(pr),pr.child=null):ht("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(GT),_d.child=e,this.dispatchEvent(_d),_d.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),da.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),da.multiply(e.parent.matrixWorld)),e.applyMatrix4(da),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nv),pr.child=e,this.dispatchEvent(pr),pr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,FT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,HT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),f=r(e.images),h=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Bn.DEFAULT_UP=new j(0,1,0);Bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vc extends Bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VT={type:"move"};class xd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new j,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new j),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new j,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new j,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const b of e.hand.values()){const _=n.getJointPose(b,i),d=this._getHandJoint(c,b);_!==null&&(d.matrix.fromArray(_.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=_.radius),d.visible=_!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=f.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(VT)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new vc;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Sy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ga={h:0,s:0,l:0},_c={h:0,s:0,l:0};function Sd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class rt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=mi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=lt.workingColorSpace){return this.r=e,this.g=n,this.b=i,lt.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=lt.workingColorSpace){if(e=CT(e,1),n=ct(n,0,1),i=ct(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Sd(r,s,e+1/3),this.g=Sd(r,s,e),this.b=Sd(r,s,e-1/3)}return lt.colorSpaceToWorking(this,a),this}setStyle(e,n=mi){function i(s){s!==void 0&&parseFloat(s)<1&&He("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:He("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);He("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=mi){const i=Sy[e.toLowerCase()];return i!==void 0?this.setHex(i,n):He("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Na(e.r),this.g=Na(e.g),this.b=Na(e.b),this}copyLinearToSRGB(e){return this.r=$r(e.r),this.g=$r(e.g),this.b=$r(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mi){return lt.workingToColorSpace(An.copy(this),e),Math.round(ct(An.r*255,0,255))*65536+Math.round(ct(An.g*255,0,255))*256+Math.round(ct(An.b*255,0,255))}getHexString(e=mi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=lt.workingColorSpace){lt.workingToColorSpace(An.copy(this),n);const i=An.r,a=An.g,s=An.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const f=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=f<=.5?h/(r+o):h/(2-r-o),r){case i:l=(a-s)/h+(a<s?6:0);break;case a:l=(s-i)/h+2;break;case s:l=(i-a)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=lt.workingColorSpace){return lt.workingToColorSpace(An.copy(this),n),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=mi){lt.workingToColorSpace(An.copy(this),e);const n=An.r,i=An.g,a=An.b;return e!==mi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(Ga),this.setHSL(Ga.h+e,Ga.s+n,Ga.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ga),e.getHSL(_c);const i=hd(Ga.h,_c.h,n),a=hd(Ga.s,_c.s,n),s=hd(Ga.l,_c.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const An=new rt;rt.NAMES=Sy;class Qm{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new rt(e),this.density=n}clone(){return new Qm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yy extends Bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qs,this.environmentIntensity=1,this.environmentRotation=new Qs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Li=new j,ha=new j,yd=new j,pa=new j,mr=new j,gr=new j,iv=new j,Md=new j,bd=new j,Ed=new j,Td=new Zt,Ad=new Zt,wd=new Zt;class Ei{constructor(e=new j,n=new j,i=new j){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Li.subVectors(e,n),a.cross(Li);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Li.subVectors(a,n),ha.subVectors(i,n),yd.subVectors(e,n);const r=Li.dot(Li),o=Li.dot(ha),l=Li.dot(yd),c=ha.dot(ha),f=ha.dot(yd),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*f)*u,g=(r*f-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,pa)===null?!1:pa.x>=0&&pa.y>=0&&pa.x+pa.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,pa)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pa.x),l.addScaledVector(r,pa.y),l.addScaledVector(o,pa.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return Td.setScalar(0),Ad.setScalar(0),wd.setScalar(0),Td.fromBufferAttribute(e,n),Ad.fromBufferAttribute(e,i),wd.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Td,s.x),r.addScaledVector(Ad,s.y),r.addScaledVector(wd,s.z),r}static isFrontFacing(e,n,i,a){return Li.subVectors(i,n),ha.subVectors(e,n),Li.cross(ha).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),ha.subVectors(this.a,this.b),Li.cross(ha).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Ei.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Ei.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;mr.subVectors(a,i),gr.subVectors(s,i),Md.subVectors(e,i);const l=mr.dot(Md),c=gr.dot(Md);if(l<=0&&c<=0)return n.copy(i);bd.subVectors(e,a);const f=mr.dot(bd),h=gr.dot(bd);if(f>=0&&h<=f)return n.copy(a);const u=l*h-f*c;if(u<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector(mr,r);Ed.subVectors(e,s);const p=mr.dot(Ed),g=gr.dot(Ed);if(g>=0&&p<=g)return n.copy(s);const b=p*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(gr,o);const _=f*g-p*h;if(_<=0&&h-f>=0&&p-g>=0)return iv.subVectors(s,a),o=(h-f)/(h-f+(p-g)),n.copy(a).addScaledVector(iv,o);const d=1/(_+b+u);return r=b*d,o=u*d,n.copy(i).addScaledVector(mr,r).addScaledVector(gr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class sr{constructor(e=new j(1/0,1/0,1/0),n=new j(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Oi):Oi.fromBufferAttribute(s,r),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xc.copy(i.boundingBox)),xc.applyMatrix4(e.matrixWorld),this.union(xc)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),Sc.subVectors(this.max,Vo),vr.subVectors(e.a,Vo),_r.subVectors(e.b,Vo),xr.subVectors(e.c,Vo),Va.subVectors(_r,vr),ka.subVectors(xr,_r),Ts.subVectors(vr,xr);let n=[0,-Va.z,Va.y,0,-ka.z,ka.y,0,-Ts.z,Ts.y,Va.z,0,-Va.x,ka.z,0,-ka.x,Ts.z,0,-Ts.x,-Va.y,Va.x,0,-ka.y,ka.x,0,-Ts.y,Ts.x,0];return!Rd(n,vr,_r,xr,Sc)||(n=[1,0,0,0,1,0,0,0,1],!Rd(n,vr,_r,xr,Sc))?!1:(yc.crossVectors(Va,ka),n=[yc.x,yc.y,yc.z],Rd(n,vr,_r,xr,Sc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ma),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ma=[new j,new j,new j,new j,new j,new j,new j,new j],Oi=new j,xc=new sr,vr=new j,_r=new j,xr=new j,Va=new j,ka=new j,Ts=new j,Vo=new j,Sc=new j,yc=new j,As=new j;function Rd(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){As.fromArray(t,s);const o=a.x*Math.abs(As.x)+a.y*Math.abs(As.y)+a.z*Math.abs(As.z),l=e.dot(As),c=n.dot(As),f=i.dot(As);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const tn=new j,Mc=new vt;let kT=0;class yt extends ar{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kT++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=k0,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Mc.fromBufferAttribute(this,n),Mc.applyMatrix3(e),this.setXY(n,Mc.x,Mc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix3(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix4(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyNormalMatrix(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.transformDirection(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Ho(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ho(n,this.array)),n}setX(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ho(n,this.array)),n}setY(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ho(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ho(n,this.array)),n}setW(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array),a=Xn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array),a=Xn(a,this.array),s=Xn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==k0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class My extends yt{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class by extends yt{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class wi extends yt{constructor(e,n,i){super(new Float32Array(e),n,i)}}const XT=new sr,ko=new j,Cd=new j;class rr{constructor(e=new j,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):XT.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const n=ko.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(ko,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Cd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(Cd)),this.expandByPoint(ko.copy(e.center).sub(Cd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let WT=0;const hi=new It,Nd=new Bn,Sr=new j,Jn=new sr,Xo=new sr,hn=new j;class Rn extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:WT++}),this.uuid=Zl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(TT(e)?by:My)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,n,i){return hi.makeTranslation(e,n,i),this.applyMatrix4(hi),this}scale(e,n,i){return hi.makeScale(e,n,i),this.applyMatrix4(hi),this}lookAt(e){return Nd.lookAt(e),Nd.updateMatrix(),this.applyMatrix4(Nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Sr).negate(),this.translate(Sr.x,Sr.y,Sr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new wi(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&He("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new j(-1/0,-1/0,-1/0),new j(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];Jn.setFromBufferAttribute(s),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Jn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Jn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Jn.min),this.boundingBox.expandByPoint(Jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new j,1/0);return}if(e){const i=this.boundingSphere.center;if(Jn.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Xo.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(Jn.min,Xo.min),Jn.expandByPoint(hn),hn.addVectors(Jn.max,Xo.max),Jn.expandByPoint(hn)):(Jn.expandByPoint(Xo.min),Jn.expandByPoint(Xo.max))}Jn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)hn.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(hn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)hn.fromBufferAttribute(o,c),l&&(Sr.fromBufferAttribute(e,c),hn.add(Sr)),a=Math.max(a,i.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new yt(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new j,l[y]=new j;const c=new j,f=new j,h=new j,u=new vt,p=new vt,g=new vt,b=new j,_=new j;function d(y,C,R){c.fromBufferAttribute(i,y),f.fromBufferAttribute(i,C),h.fromBufferAttribute(i,R),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,C),g.fromBufferAttribute(s,R),f.sub(c),h.sub(c),p.sub(u),g.sub(u);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(b.copy(f).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(D),_.copy(h).multiplyScalar(p.x).addScaledVector(f,-g.x).multiplyScalar(D),o[y].add(b),o[C].add(b),o[R].add(b),l[y].add(_),l[C].add(_),l[R].add(_))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let y=0,C=S.length;y<C;++y){const R=S[y],D=R.start,O=R.count;for(let H=D,L=D+O;H<L;H+=3)d(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const M=new j,x=new j,w=new j,N=new j;function T(y){w.fromBufferAttribute(a,y),N.copy(w);const C=o[y];M.copy(C),M.sub(w.multiplyScalar(w.dot(C))).normalize(),x.crossVectors(N,C);const D=x.dot(l[y])<0?-1:1;r.setXYZW(y,M.x,M.y,M.z,D)}for(let y=0,C=S.length;y<C;++y){const R=S[y],D=R.start,O=R.count;for(let H=D,L=D+O;H<L;H+=3)T(e.getX(H+0)),T(e.getX(H+1)),T(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new yt(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new j,s=new j,r=new j,o=new j,l=new j,c=new j,f=new j,h=new j;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),b=e.getX(u+1),_=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,b),r.fromBufferAttribute(n,_),f.subVectors(r,s),h.subVectors(a,s),f.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,_),o.add(f),l.add(f),c.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(_,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),f.subVectors(r,s),h.subVectors(a,s),f.cross(h),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)hn.fromBufferAttribute(e,n),hn.normalize(),e.setXYZ(n,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,h=o.normalized,u=new c.constructor(l.length*f);let p=0,g=0;for(let b=0,_=l.length;b<_;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*f;for(let d=0;d<f;d++)u[g++]=c[p++]}return new yt(u,f,h)}if(this.index===null)return He("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Rn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,h=c.length;f<h;f++){const u=c[f],p=e(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];f.push(p.toJSON(e.data))}f.length>0&&(a[l]=f,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const f=a[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let u=0,p=h.length;u<p;u++)f.push(h[u].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,f=r.length;c<f;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let jT=0;class Ao extends ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jT++}),this.uuid=Zl(),this.name="",this.type="Material",this.blending=ks,this.side=xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kh,this.blendDst=Xh,this.blendEquation=Os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=fo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=V0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){He(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){He(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==xs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==kh&&(i.blendSrc=this.blendSrc),this.blendDst!==Xh&&(i.blendDst=this.blendDst),this.blendEquation!==Os&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==fo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==V0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new rt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new vt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new vt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ga=new j,Dd=new j,bc=new j,Xa=new j,Ud=new j,Ec=new j,Ld=new j;class Jm{constructor(e=new j,n=new j(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ga)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ga.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ga.copy(this.origin).addScaledVector(this.direction,n),ga.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Dd.copy(e).add(n).multiplyScalar(.5),bc.copy(n).sub(e).normalize(),Xa.copy(this.origin).sub(Dd);const s=e.distanceTo(n)*.5,r=-this.direction.dot(bc),o=Xa.dot(this.direction),l=-Xa.dot(bc),c=Xa.lengthSq(),f=Math.abs(1-r*r);let h,u,p,g;if(f>0)if(h=r*l-o,u=r*o-l,g=s*f,h>=0)if(u>=-g)if(u<=g){const b=1/f;h*=b,u*=b,p=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(Dd).addScaledVector(bc,u),p}intersectSphere(e,n){ga.subVectors(e.center,this.origin);const i=ga.dot(this.direction),a=ga.dot(ga)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),f>=0?(s=(e.min.y-u.y)*f,r=(e.max.y-u.y)*f):(s=(e.max.y-u.y)*f,r=(e.min.y-u.y)*f),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,ga)!==null}intersectTriangle(e,n,i,a,s){Ud.subVectors(n,e),Ec.subVectors(i,e),Ld.crossVectors(Ud,Ec);let r=this.direction.dot(Ld),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Xa.subVectors(this.origin,e);const l=o*this.direction.dot(Ec.crossVectors(Xa,Ec));if(l<0)return null;const c=o*this.direction.dot(Ud.cross(Xa));if(c<0||l+c>r)return null;const f=-o*Xa.dot(Ld);return f<0?null:this.at(f/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ey extends Ao{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qs,this.combine=ny,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const av=new It,ws=new Jm,Tc=new rr,sv=new j,Ac=new j,wc=new j,Rc=new j,Od=new j,Cc=new j,rv=new j,Nc=new j;class Ci extends Bn{constructor(e=new Rn,n=new Ey){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Cc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],h=s[l];f!==0&&(Od.fromBufferAttribute(h,e),r?Cc.addScaledVector(Od,f):Cc.addScaledVector(Od.sub(n),f))}n.add(Cc)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Tc.copy(i.boundingSphere),Tc.applyMatrix4(s),ws.copy(e.ray).recast(e.near),!(Tc.containsPoint(ws.origin)===!1&&(ws.intersectSphere(Tc,sv)===null||ws.origin.distanceToSquared(sv)>(e.far-e.near)**2))&&(av.copy(s).invert(),ws.copy(e.ray).applyMatrix4(av),!(i.boundingBox!==null&&ws.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ws)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const _=u[g],d=r[_.materialIndex],S=Math.max(_.start,p.start),M=Math.min(o.count,Math.min(_.start+_.count,p.start+p.count));for(let x=S,w=M;x<w;x+=3){const N=o.getX(x),T=o.getX(x+1),y=o.getX(x+2);a=Dc(this,d,e,i,c,f,h,N,T,y),a&&(a.faceIndex=Math.floor(x/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let _=g,d=b;_<d;_+=3){const S=o.getX(_),M=o.getX(_+1),x=o.getX(_+2);a=Dc(this,r,e,i,c,f,h,S,M,x),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const _=u[g],d=r[_.materialIndex],S=Math.max(_.start,p.start),M=Math.min(l.count,Math.min(_.start+_.count,p.start+p.count));for(let x=S,w=M;x<w;x+=3){const N=x,T=x+1,y=x+2;a=Dc(this,d,e,i,c,f,h,N,T,y),a&&(a.faceIndex=Math.floor(x/3),a.face.materialIndex=_.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let _=g,d=b;_<d;_+=3){const S=_,M=_+1,x=_+2;a=Dc(this,r,e,i,c,f,h,S,M,x),a&&(a.faceIndex=Math.floor(_/3),n.push(a))}}}}function qT(t,e,n,i,a,s,r,o){let l;if(e.side===Yn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===xs,o),l===null)return null;Nc.copy(o),Nc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Nc);return c<n.near||c>n.far?null:{distance:c,point:Nc.clone(),object:t}}function Dc(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,Ac),t.getVertexPosition(l,wc),t.getVertexPosition(c,Rc);const f=qT(t,e,n,i,Ac,wc,Rc,rv);if(f){const h=new j;Ei.getBarycoord(rv,Ac,wc,Rc,h),a&&(f.uv=Ei.getInterpolatedAttribute(a,o,l,c,h,new vt)),s&&(f.uv1=Ei.getInterpolatedAttribute(s,o,l,c,h,new vt)),r&&(f.normal=Ei.getInterpolatedAttribute(r,o,l,c,h,new j),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new j,materialIndex:0};Ei.getNormal(Ac,wc,Rc,u.normal),f.face=u,f.barycoord=h}return f}class Ty extends In{constructor(e=null,n=1,i=1,a,s,r,o,l,c=Mn,f=Mn,h,u){super(null,r,o,l,c,f,a,s,h,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kr extends yt{constructor(e,n,i,a=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const yr=new It,ov=new It,Uc=[],lv=new sr,YT=new It,Wo=new Ci,jo=new rr;class cv extends Ci{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new kr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,YT)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new sr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,yr),lv.copy(e.boundingBox).applyMatrix4(yr),this.boundingBox.union(lv)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new rr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,yr),jo.copy(e.boundingSphere).applyMatrix4(yr),this.boundingSphere.union(jo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(e,n){const i=this.matrixWorld,a=this.count;if(Wo.geometry=this.geometry,Wo.material=this.material,Wo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jo.copy(this.boundingSphere),jo.applyMatrix4(i),e.ray.intersectsSphere(jo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,yr),ov.multiplyMatrices(i,yr),Wo.matrixWorld=ov,Wo.raycast(e,Uc);for(let r=0,o=Uc.length;r<o;r++){const l=Uc[r];l.instanceId=s,l.object=this,n.push(l)}Uc.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new kr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ty(new Float32Array(a*this.count),a,this.count,Xm,zi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pd=new j,ZT=new j,KT=new We;class Ls{constructor(e=new j(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=Pd.subVectors(i,n).cross(ZT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const a=e.delta(Pd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||KT.getNormalMatrix(e),a=this.coplanarPoint(Pd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Rs=new rr,QT=new vt(.5,.5),Lc=new j;class Ay{constructor(e=new Ls,n=new Ls,i=new Ls,a=new Ls,s=new Ls,r=new Ls){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ki,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],f=s[4],h=s[5],u=s[6],p=s[7],g=s[8],b=s[9],_=s[10],d=s[11],S=s[12],M=s[13],x=s[14],w=s[15];if(a[0].setComponents(c-r,p-f,d-g,w-S).normalize(),a[1].setComponents(c+r,p+f,d+g,w+S).normalize(),a[2].setComponents(c+o,p+h,d+b,w+M).normalize(),a[3].setComponents(c-o,p-h,d-b,w-M).normalize(),i)a[4].setComponents(l,u,_,x).normalize(),a[5].setComponents(c-l,p-u,d-_,w-x).normalize();else if(a[4].setComponents(c-l,p-u,d-_,w-x).normalize(),n===Ki)a[5].setComponents(c+l,p+u,d+_,w+x).normalize();else if(n===Ku)a[5].setComponents(l,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Rs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Rs.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Rs)}intersectsSprite(e){Rs.center.set(0,0,0);const n=QT.distanceTo(e.center);return Rs.radius=.7071067811865476+n,Rs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Rs)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Lc.x=a.normal.x>0?e.max.x:e.min.x,Lc.y=a.normal.y>0?e.max.y:e.min.y,Lc.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Lc)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wy extends Ao{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ju=new j,$u=new j,uv=new It,qo=new Jm,Oc=new rr,zd=new j,fv=new j;class JT extends Bn{constructor(e=new Rn,n=new wy){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Ju.fromBufferAttribute(n,a-1),$u.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Ju.distanceTo($u);e.setAttribute("lineDistance",new wi(i,1))}else He("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oc.copy(i.boundingSphere),Oc.applyMatrix4(a),Oc.radius+=s,e.ray.intersectsSphere(Oc)===!1)return;uv.copy(a).invert(),qo.copy(e.ray).applyMatrix4(uv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,f=i.index,u=i.attributes.position;if(f!==null){const p=Math.max(0,r.start),g=Math.min(f.count,r.start+r.count);for(let b=p,_=g-1;b<_;b+=c){const d=f.getX(b),S=f.getX(b+1),M=Pc(this,e,qo,l,d,S,b);M&&n.push(M)}if(this.isLineLoop){const b=f.getX(g-1),_=f.getX(p),d=Pc(this,e,qo,l,b,_,g-1);d&&n.push(d)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let b=p,_=g-1;b<_;b+=c){const d=Pc(this,e,qo,l,b,b+1,b);d&&n.push(d)}if(this.isLineLoop){const b=Pc(this,e,qo,l,g-1,p,g-1);b&&n.push(b)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Pc(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(Ju.fromBufferAttribute(o,a),$u.fromBufferAttribute(o,s),n.distanceSqToSegment(Ju,$u,zd,fv)>i)return;zd.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(zd);if(!(c<e.near||c>e.far))return{distance:c,point:fv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const dv=new j,hv=new j;class hu extends JT{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)dv.fromBufferAttribute(n,a),hv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+dv.distanceTo(hv);e.setAttribute("lineDistance",new wi(i,1))}else He("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $T extends Ao{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pv=new It,Dp=new Jm,zc=new rr,Ic=new j;class Up extends Bn{constructor(e=new Rn,n=new $T){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zc.copy(i.boundingSphere),zc.applyMatrix4(a),zc.radius+=s,e.ray.intersectsSphere(zc)===!1)return;pv.copy(a).invert(),Dp.copy(e.ray).applyMatrix4(pv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,b=p;g<b;g++){const _=c.getX(g);Ic.fromBufferAttribute(h,_),mv(Ic,_,l,a,e,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let g=u,b=p;g<b;g++)Ic.fromBufferAttribute(h,g),mv(Ic,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function mv(t,e,n,i,a,s,r){const o=Dp.distanceSqToPoint(t);if(o<n){const l=new j;Dp.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Ry extends In{constructor(e=[],n=Zs,i,a,s,r,o,l,c,f){super(e,n,i,a,s,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class po extends In{constructor(e,n,i=ea,a,s,r,o=Mn,l=Mn,c,f=Ia,h=1){if(f!==Ia&&f!==Is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:h};super(u,a,s,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Km(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class eA extends po{constructor(e,n=ea,i=Zs,a,s,r=Mn,o=Mn,l,c=Ia){const f={width:e,height:e,depth:1},h=[f,f,f,f,f,f];super(e,e,n,i,a,s,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Cy extends In{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Js extends Rn{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],f=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new wi(c,3)),this.setAttribute("normal",new wi(f,3)),this.setAttribute("uv",new wi(h,2));function g(b,_,d,S,M,x,w,N,T,y,C){const R=x/T,D=w/y,O=x/2,H=w/2,L=N/2,P=T+1,I=y+1;let z=0,U=0;const k=new j;for(let re=0;re<I;re++){const le=re*D-H;for(let _e=0;_e<P;_e++){const ke=_e*R-O;k[b]=ke*S,k[_]=le*M,k[d]=L,c.push(k.x,k.y,k.z),k[b]=0,k[_]=0,k[d]=N>0?1:-1,f.push(k.x,k.y,k.z),h.push(_e/T),h.push(1-re/y),z+=1}}for(let re=0;re<y;re++)for(let le=0;le<T;le++){const _e=u+le+P*re,ke=u+le+P*(re+1),Ze=u+(le+1)+P*(re+1),Fe=u+(le+1)+P*re;l.push(_e,ke,Fe),l.push(ke,Ze,Fe),U+=6}o.addGroup(p,U,C),p+=U,u+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Bc=new j,Fc=new j,Id=new j,Hc=new Ei;class tA extends Rn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const a=Math.pow(10,4),s=Math.cos(du*n),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],f=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:b,b:_,c:d}=Hc;if(b.fromBufferAttribute(o,c[0]),_.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),Hc.getNormal(Id),h[0]=`${Math.round(b.x*a)},${Math.round(b.y*a)},${Math.round(b.z*a)}`,h[1]=`${Math.round(_.x*a)},${Math.round(_.y*a)},${Math.round(_.z*a)}`,h[2]=`${Math.round(d.x*a)},${Math.round(d.y*a)},${Math.round(d.z*a)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let S=0;S<3;S++){const M=(S+1)%3,x=h[S],w=h[M],N=Hc[f[S]],T=Hc[f[M]],y=`${x}_${w}`,C=`${w}_${x}`;C in u&&u[C]?(Id.dot(u[C].normal)<=s&&(p.push(N.x,N.y,N.z),p.push(T.x,T.y,T.z)),u[C]=null):y in u||(u[y]={index0:c[S],index1:c[M],normal:Id.clone()})}}for(const g in u)if(u[g]){const{index0:b,index1:_}=u[g];Bc.fromBufferAttribute(o,b),Fc.fromBufferAttribute(o,_),p.push(Bc.x,Bc.y,Bc.z),p.push(Fc.x,Fc.y,Fc.z)}this.setAttribute("position",new wi(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Mf extends Rn{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,f=l+1,h=e/o,u=n/l,p=[],g=[],b=[],_=[];for(let d=0;d<f;d++){const S=d*u-r;for(let M=0;M<c;M++){const x=M*h-s;g.push(x,-S,0),b.push(0,0,1),_.push(M/o),_.push(1-d/l)}}for(let d=0;d<l;d++)for(let S=0;S<o;S++){const M=S+c*d,x=S+c*(d+1),w=S+1+c*(d+1),N=S+1+c*d;p.push(M,x,N),p.push(x,w,N)}this.setIndex(p),this.setAttribute("position",new wi(g,3)),this.setAttribute("normal",new wi(b,3)),this.setAttribute("uv",new wi(_,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mf(e.width,e.height,e.widthSegments,e.heightSegments)}}function mo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];if(gv(a))a.isRenderTargetTexture?(He("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone();else if(Array.isArray(a))if(gv(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();e[n][i]=s}else e[n][i]=a.slice();else e[n][i]=a}}return e}function On(t){const e={};for(let n=0;n<t.length;n++){const i=mo(t[n]);for(const a in i)e[a]=i[a]}return e}function gv(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function nA(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ny(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}const iA={clone:mo,merge:On};var aA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Ao{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=aA,this.fragmentShader=sA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=mo(e.uniforms),this.uniformsGroups=nA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const a=e.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new rt().setHex(a.value);break;case"v2":this.uniforms[i].value=new vt().fromArray(a.value);break;case"v3":this.uniforms[i].value=new j().fromArray(a.value);break;case"v4":this.uniforms[i].value=new Zt().fromArray(a.value);break;case"m3":this.uniforms[i].value=new We().fromArray(a.value);break;case"m4":this.uniforms[i].value=new It().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class rA extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class oA extends Ao{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lA extends Ao{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Gc=new j,Vc=new To,ki=new j;class Dy extends Bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new It,this.projectionMatrix=new It,this.projectionMatrixInverse=new It,this.coordinateSystem=Ki,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Gc,Vc,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gc,Vc,ki.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Gc,Vc,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gc,Vc,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wa=new j,vv=new vt,_v=new vt;class xi extends Dy{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Np*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(du*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Np*2*Math.atan(Math.tan(du*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Wa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wa.x,Wa.y).multiplyScalar(-e/Wa.z),Wa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wa.x,Wa.y).multiplyScalar(-e/Wa.z)}getViewSize(e,n){return this.getViewBounds(e,vv,_v),n.subVectors(_v,vv)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(du*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class $m extends Dy{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Mr=-90,br=1;class cA extends Bn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new xi(Mr,br,e,n);a.layers=this.layers,this.add(a);const s=new xi(Mr,br,e,n);s.layers=this.layers,this.add(s);const r=new xi(Mr,br,e,n);r.layers=this.layers,this.add(r);const o=new xi(Mr,br,e,n);o.layers=this.layers,this.add(o);const l=new xi(Mr,br,e,n);l.layers=this.layers,this.add(l);const c=new xi(Mr,br,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===Ki)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ku)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,f]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let _=!1;e.isWebGLRenderer===!0?_=e.state.buffers.depth.getReversed():_=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,a),_&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class uA extends xi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const sg=class sg{constructor(e,n,i,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,a){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=a,this}};sg.prototype.isMatrix2=!0;let xv=sg;function Sv(t,e,n,i){const a=fA(i);switch(n){case my:return t*e;case Xm:return t*e/a.components*a.byteLength;case Wm:return t*e/a.components*a.byteLength;case Ks:return t*e*2/a.components*a.byteLength;case jm:return t*e*2/a.components*a.byteLength;case gy:return t*e*3/a.components*a.byteLength;case Ii:return t*e*4/a.components*a.byteLength;case qm:return t*e*4/a.components*a.byteLength;case lu:case cu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case uu:case fu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case tp:case ip:return Math.max(t,16)*Math.max(e,8)/4;case ep:case np:return Math.max(t,8)*Math.max(e,8)/2;case ap:case sp:case op:case lp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case rp:case ju:case cp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case up:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case fp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case dp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case hp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case pp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case mp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case gp:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case vp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case _p:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case xp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case yp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Mp:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case bp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Ep:case Tp:case Ap:return Math.ceil(t/4)*Math.ceil(e/4)*16;case wp:case Rp:return Math.ceil(t/4)*Math.ceil(e/4)*8;case qu:case Cp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function fA(t){switch(t){case bi:case fy:return{byteLength:1,components:1};case Ll:case dy:case za:return{byteLength:2,components:1};case Vm:case km:return{byteLength:2,components:4};case ea:case Gm:case zi:return{byteLength:4,components:1};case hy:case py:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hm}}));typeof window<"u"&&(window.__THREE__?He("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Uy(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function dA(t){const e=new WeakMap;function n(o,l){const c=o.array,f=o.usage,h=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,f),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const f=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,f);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],b=h[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,h[u]=b)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const b=h[p];t.bufferSubData(c,b.start*f.BYTES_PER_ELEMENT,f,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const f=e.get(o);(!f||f.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var hA=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pA=`#ifdef USE_ALPHAHASH
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
#endif`,mA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,_A=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,xA=`#ifdef USE_AOMAP
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
#endif`,SA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,yA=`#ifdef USE_BATCHING
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
#endif`,MA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,bA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,EA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,TA=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,AA=`#ifdef USE_IRIDESCENCE
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
#endif`,wA=`#ifdef USE_BUMPMAP
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
#endif`,RA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,CA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,NA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,DA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,UA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,LA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,OA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,PA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,zA=`#define PI 3.141592653589793
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
} // validated`,IA=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,BA=`vec3 transformedNormal = objectNormal;
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
#endif`,FA=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,HA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,GA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,VA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,kA="gl_FragColor = linearToOutputTexel( gl_FragColor );",XA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,WA=`#ifdef USE_ENVMAP
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
#endif`,jA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,qA=`#ifdef USE_ENVMAP
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
#endif`,YA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ZA=`#ifdef USE_ENVMAP
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
#endif`,KA=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,QA=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,JA=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$A=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,e1=`#ifdef USE_GRADIENTMAP
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
}`,t1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,n1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,i1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,a1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,s1=`#ifdef USE_ENVMAP
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
#endif`,r1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,o1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,l1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,c1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u1=`PhysicalMaterial material;
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
#endif`,f1=`uniform sampler2D dfgLUT;
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
}`,d1=`
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
#endif`,h1=`#if defined( RE_IndirectDiffuse )
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
#endif`,p1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,m1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,g1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,_1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,S1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,y1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,b1=`#if defined( USE_POINTS_UV )
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
#endif`,E1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,T1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,A1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,w1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,R1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,C1=`#ifdef USE_MORPHTARGETS
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
#endif`,N1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,D1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,U1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,L1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,O1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,P1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,z1=`#ifdef USE_NORMALMAP
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
#endif`,I1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,B1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,F1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,H1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,G1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,V1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,k1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,X1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,W1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,j1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Z1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K1=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Q1=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J1=`float getShadowMask() {
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
}`,$1=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ew=`#ifdef USE_SKINNING
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
#endif`,tw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,nw=`#ifdef USE_SKINNING
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
#endif`,iw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,aw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,rw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,ow=`#ifdef USE_TRANSMISSION
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
#endif`,lw=`#ifdef USE_TRANSMISSION
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
#endif`,cw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,dw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const hw=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,pw=`uniform sampler2D t2D;
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
}`,mw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,vw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_w=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xw=`#include <common>
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
}`,Sw=`#if DEPTH_PACKING == 3200
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
}`,yw=`#define DISTANCE
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
}`,Mw=`#define DISTANCE
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
}`,bw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ew=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Tw=`uniform float scale;
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
}`,Aw=`uniform vec3 diffuse;
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
}`,ww=`#include <common>
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
}`,Rw=`uniform vec3 diffuse;
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
}`,Cw=`#define LAMBERT
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
}`,Nw=`#define LAMBERT
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
}`,Dw=`#define MATCAP
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
}`,Uw=`#define MATCAP
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
}`,Lw=`#define NORMAL
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
}`,Ow=`#define NORMAL
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
}`,Pw=`#define PHONG
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
}`,zw=`#define PHONG
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
}`,Iw=`#define STANDARD
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
}`,Bw=`#define STANDARD
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
}`,Fw=`#define TOON
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
}`,Hw=`#define TOON
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
}`,Gw=`uniform float size;
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
}`,Vw=`uniform vec3 diffuse;
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
}`,kw=`#include <common>
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
}`,Xw=`uniform vec3 color;
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
}`,Ww=`uniform float rotation;
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
}`,jw=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:hA,alphahash_pars_fragment:pA,alphamap_fragment:mA,alphamap_pars_fragment:gA,alphatest_fragment:vA,alphatest_pars_fragment:_A,aomap_fragment:xA,aomap_pars_fragment:SA,batching_pars_vertex:yA,batching_vertex:MA,begin_vertex:bA,beginnormal_vertex:EA,bsdfs:TA,iridescence_fragment:AA,bumpmap_pars_fragment:wA,clipping_planes_fragment:RA,clipping_planes_pars_fragment:CA,clipping_planes_pars_vertex:NA,clipping_planes_vertex:DA,color_fragment:UA,color_pars_fragment:LA,color_pars_vertex:OA,color_vertex:PA,common:zA,cube_uv_reflection_fragment:IA,defaultnormal_vertex:BA,displacementmap_pars_vertex:FA,displacementmap_vertex:HA,emissivemap_fragment:GA,emissivemap_pars_fragment:VA,colorspace_fragment:kA,colorspace_pars_fragment:XA,envmap_fragment:WA,envmap_common_pars_fragment:jA,envmap_pars_fragment:qA,envmap_pars_vertex:YA,envmap_physical_pars_fragment:s1,envmap_vertex:ZA,fog_vertex:KA,fog_pars_vertex:QA,fog_fragment:JA,fog_pars_fragment:$A,gradientmap_pars_fragment:e1,lightmap_pars_fragment:t1,lights_lambert_fragment:n1,lights_lambert_pars_fragment:i1,lights_pars_begin:a1,lights_toon_fragment:r1,lights_toon_pars_fragment:o1,lights_phong_fragment:l1,lights_phong_pars_fragment:c1,lights_physical_fragment:u1,lights_physical_pars_fragment:f1,lights_fragment_begin:d1,lights_fragment_maps:h1,lights_fragment_end:p1,lightprobes_pars_fragment:m1,logdepthbuf_fragment:g1,logdepthbuf_pars_fragment:v1,logdepthbuf_pars_vertex:_1,logdepthbuf_vertex:x1,map_fragment:S1,map_pars_fragment:y1,map_particle_fragment:M1,map_particle_pars_fragment:b1,metalnessmap_fragment:E1,metalnessmap_pars_fragment:T1,morphinstance_vertex:A1,morphcolor_vertex:w1,morphnormal_vertex:R1,morphtarget_pars_vertex:C1,morphtarget_vertex:N1,normal_fragment_begin:D1,normal_fragment_maps:U1,normal_pars_fragment:L1,normal_pars_vertex:O1,normal_vertex:P1,normalmap_pars_fragment:z1,clearcoat_normal_fragment_begin:I1,clearcoat_normal_fragment_maps:B1,clearcoat_pars_fragment:F1,iridescence_pars_fragment:H1,opaque_fragment:G1,packing:V1,premultiplied_alpha_fragment:k1,project_vertex:X1,dithering_fragment:W1,dithering_pars_fragment:j1,roughnessmap_fragment:q1,roughnessmap_pars_fragment:Y1,shadowmap_pars_fragment:Z1,shadowmap_pars_vertex:K1,shadowmap_vertex:Q1,shadowmask_pars_fragment:J1,skinbase_vertex:$1,skinning_pars_vertex:ew,skinning_vertex:tw,skinnormal_vertex:nw,specularmap_fragment:iw,specularmap_pars_fragment:aw,tonemapping_fragment:sw,tonemapping_pars_fragment:rw,transmission_fragment:ow,transmission_pars_fragment:lw,uv_pars_fragment:cw,uv_pars_vertex:uw,uv_vertex:fw,worldpos_vertex:dw,background_vert:hw,background_frag:pw,backgroundCube_vert:mw,backgroundCube_frag:gw,cube_vert:vw,cube_frag:_w,depth_vert:xw,depth_frag:Sw,distance_vert:yw,distance_frag:Mw,equirect_vert:bw,equirect_frag:Ew,linedashed_vert:Tw,linedashed_frag:Aw,meshbasic_vert:ww,meshbasic_frag:Rw,meshlambert_vert:Cw,meshlambert_frag:Nw,meshmatcap_vert:Dw,meshmatcap_frag:Uw,meshnormal_vert:Lw,meshnormal_frag:Ow,meshphong_vert:Pw,meshphong_frag:zw,meshphysical_vert:Iw,meshphysical_frag:Bw,meshtoon_vert:Fw,meshtoon_frag:Hw,points_vert:Gw,points_frag:Vw,shadow_vert:kw,shadow_frag:Xw,sprite_vert:Ww,sprite_frag:jw},be={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new vt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new j},probesMax:{value:new j},probesResolution:{value:new j}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new vt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Wi={basic:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:On([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:On([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new rt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:On([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:On([be.points,be.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:On([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:On([be.common,be.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:On([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:On([be.sprite,be.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:On([be.common,be.displacementmap,{referencePosition:{value:new j},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:On([be.lights,be.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Wi.physical={uniforms:On([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new vt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new vt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new vt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const kc={r:0,b:0,g:0},qw=new It,Ly=new We;Ly.set(-1,0,0,0,1,0,0,0,1);function Yw(t,e,n,i,a,s){const r=new rt(0);let o=a===!0?0:1,l,c,f=null,h=0,u=null;function p(S){let M=S.isScene===!0?S.background:null;if(M&&M.isTexture){const x=S.backgroundBlurriness>0;M=e.get(M,x)}return M}function g(S){let M=!1;const x=p(S);x===null?_(r,o):x&&x.isColor&&(_(x,1),M=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function b(S,M){const x=p(M);x&&(x.isCubeTexture||x.mapping===yf)?(c===void 0&&(c=new Ci(new Js(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:mo(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,N,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=x,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qw.makeRotationFromEuler(M.backgroundRotation)).transpose(),x.isCubeTexture&&x.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ly),c.material.toneMapped=lt.getTransfer(x.colorSpace)!==At,(f!==x||h!==x.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,f=x,h=x.version,u=t.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new Ci(new Mf(2,2),new bn({name:"BackgroundMaterial",uniforms:mo(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=lt.getTransfer(x.colorSpace)!==At,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(f!==x||h!==x.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,f=x,h=x.version,u=t.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function _(S,M){S.getRGB(kc,Ny(t)),n.buffers.color.setClear(kc.r,kc.g,kc.b,M,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(S,M=1){r.set(S),o=M,_(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,_(r,o)},render:g,addToRenderList:b,dispose:d}}function Zw(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(D,O,H,L,P){let I=!1;const z=h(D,L,H,O);s!==z&&(s=z,c(s.object)),I=p(D,L,H,P),I&&g(D,L,H,P),P!==null&&e.update(P,t.ELEMENT_ARRAY_BUFFER),(I||r)&&(r=!1,x(D,O,H,L),P!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))}function l(){return t.createVertexArray()}function c(D){return t.bindVertexArray(D)}function f(D){return t.deleteVertexArray(D)}function h(D,O,H,L){const P=L.wireframe===!0;let I=i[O.id];I===void 0&&(I={},i[O.id]=I);const z=D.isInstancedMesh===!0?D.id:0;let U=I[z];U===void 0&&(U={},I[z]=U);let k=U[H.id];k===void 0&&(k={},U[H.id]=k);let re=k[P];return re===void 0&&(re=u(l()),k[P]=re),re}function u(D){const O=[],H=[],L=[];for(let P=0;P<n;P++)O[P]=0,H[P]=0,L[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:L,object:D,attributes:{},index:null}}function p(D,O,H,L){const P=s.attributes,I=O.attributes;let z=0;const U=H.getAttributes();for(const k in U)if(U[k].location>=0){const le=P[k];let _e=I[k];if(_e===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(_e=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(_e=D.instanceColor)),le===void 0||le.attribute!==_e||_e&&le.data!==_e.data)return!0;z++}return s.attributesNum!==z||s.index!==L}function g(D,O,H,L){const P={},I=O.attributes;let z=0;const U=H.getAttributes();for(const k in U)if(U[k].location>=0){let le=I[k];le===void 0&&(k==="instanceMatrix"&&D.instanceMatrix&&(le=D.instanceMatrix),k==="instanceColor"&&D.instanceColor&&(le=D.instanceColor));const _e={};_e.attribute=le,le&&le.data&&(_e.data=le.data),P[k]=_e,z++}s.attributes=P,s.attributesNum=z,s.index=L}function b(){const D=s.newAttributes;for(let O=0,H=D.length;O<H;O++)D[O]=0}function _(D){d(D,0)}function d(D,O){const H=s.newAttributes,L=s.enabledAttributes,P=s.attributeDivisors;H[D]=1,L[D]===0&&(t.enableVertexAttribArray(D),L[D]=1),P[D]!==O&&(t.vertexAttribDivisor(D,O),P[D]=O)}function S(){const D=s.newAttributes,O=s.enabledAttributes;for(let H=0,L=O.length;H<L;H++)O[H]!==D[H]&&(t.disableVertexAttribArray(H),O[H]=0)}function M(D,O,H,L,P,I,z){z===!0?t.vertexAttribIPointer(D,O,H,P,I):t.vertexAttribPointer(D,O,H,L,P,I)}function x(D,O,H,L){b();const P=L.attributes,I=H.getAttributes(),z=O.defaultAttributeValues;for(const U in I){const k=I[U];if(k.location>=0){let re=P[U];if(re===void 0&&(U==="instanceMatrix"&&D.instanceMatrix&&(re=D.instanceMatrix),U==="instanceColor"&&D.instanceColor&&(re=D.instanceColor)),re!==void 0){const le=re.normalized,_e=re.itemSize,ke=e.get(re);if(ke===void 0)continue;const Ze=ke.buffer,Fe=ke.type,ie=ke.bytesPerElement,ve=Fe===t.INT||Fe===t.UNSIGNED_INT||re.gpuType===Gm;if(re.isInterleavedBufferAttribute){const pe=re.data,Ce=pe.stride,Ie=re.offset;if(pe.isInstancedInterleavedBuffer){for(let Be=0;Be<k.locationSize;Be++)d(k.location+Be,pe.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=pe.meshPerAttribute*pe.count)}else for(let Be=0;Be<k.locationSize;Be++)_(k.location+Be);t.bindBuffer(t.ARRAY_BUFFER,Ze);for(let Be=0;Be<k.locationSize;Be++)M(k.location+Be,_e/k.locationSize,Fe,le,Ce*ie,(Ie+_e/k.locationSize*Be)*ie,ve)}else{if(re.isInstancedBufferAttribute){for(let pe=0;pe<k.locationSize;pe++)d(k.location+pe,re.meshPerAttribute);D.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let pe=0;pe<k.locationSize;pe++)_(k.location+pe);t.bindBuffer(t.ARRAY_BUFFER,Ze);for(let pe=0;pe<k.locationSize;pe++)M(k.location+pe,_e/k.locationSize,Fe,le,_e*ie,_e/k.locationSize*pe*ie,ve)}}else if(z!==void 0){const le=z[U];if(le!==void 0)switch(le.length){case 2:t.vertexAttrib2fv(k.location,le);break;case 3:t.vertexAttrib3fv(k.location,le);break;case 4:t.vertexAttrib4fv(k.location,le);break;default:t.vertexAttrib1fv(k.location,le)}}}}S()}function w(){C();for(const D in i){const O=i[D];for(const H in O){const L=O[H];for(const P in L){const I=L[P];for(const z in I)f(I[z].object),delete I[z];delete L[P]}}delete i[D]}}function N(D){if(i[D.id]===void 0)return;const O=i[D.id];for(const H in O){const L=O[H];for(const P in L){const I=L[P];for(const z in I)f(I[z].object),delete I[z];delete L[P]}}delete i[D.id]}function T(D){for(const O in i){const H=i[O];for(const L in H){const P=H[L];if(P[D.id]===void 0)continue;const I=P[D.id];for(const z in I)f(I[z].object),delete I[z];delete P[D.id]}}}function y(D){for(const O in i){const H=i[O],L=D.isInstancedMesh===!0?D.id:0,P=H[L];if(P!==void 0){for(const I in P){const z=P[I];for(const U in z)f(z[U].object),delete z[U];delete P[I]}delete H[L],Object.keys(H).length===0&&delete i[O]}}}function C(){R(),r=!0,s!==a&&(s=a,c(s.object))}function R(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:R,dispose:w,releaseStatesOfGeometry:N,releaseStatesOfObject:y,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:_,disableUnusedAttributes:S}}function Kw(t,e,n){let i;function a(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let u=0;for(let p=0;p<f;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function Qw(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Ii&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const y=T===za&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==bi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==zi&&!y)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(He("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&He("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=t.getParameter(t.MAX_TEXTURE_SIZE),_=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),S=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),x=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),N=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:_,maxAttributes:d,maxVertexUniforms:S,maxVaryings:M,maxFragmentUniforms:x,maxSamples:w,samples:N}}function Jw(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new Ls,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||a;return a=u,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=f(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,b=h.clipIntersection,_=h.clipShadows,d=t.get(h);if(!a||g===null||g.length===0||s&&!_)s?f(null):c();else{const S=s?0:i,M=S*4;let x=d.clippingState||null;l.value=x,x=f(g,u,M,p);for(let w=0;w!==M;++w)x[w]=n[w];d.clippingState=x,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=S}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,u,p,g){const b=h!==null?h.length:0;let _=null;if(b!==0){if(_=l.value,g!==!0||_===null){const d=p+b*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(_===null||_.length<d)&&(_=new Float32Array(d));for(let M=0,x=p;M!==b;++M,x+=4)r.copy(h[M]).applyMatrix4(S,o),r.normal.toArray(_,x),_[x+3]=r.constant}l.value=_,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,_}}const as=4,yv=[.125,.215,.35,.446,.526,.582],Ps=20,$w=256,Yo=new $m,Mv=new rt;let Bd=null,Fd=0,Hd=0,Gd=!1;const eR=new j;class bv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=eR}=s;Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Av(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bd,Fd,Hd),this._renderer.xr.enabled=Gd,e.scissorTest=!1,Er(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Zs||e.mapping===ho?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:za,format:Ii,colorSpace:Yu,depthBuffer:!1},a=Ev(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ev(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tR(s)),this._blurMaterial=iR(s,e,n),this._ggxMaterial=nR(s,e,n)}return a}_compileMaterial(e){const n=new Ci(new Rn,e);this._renderer.compile(n,Yo)}_sceneToCubeUV(e,n,i,a,s){const l=new xi(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Mv),h.toneMapping=Ji,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ci(new Js,new Ey({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,_=b.material;let d=!1;const S=e.background;S?S.isColor&&(_.color.copy(S),e.background=null,d=!0):(_.color.copy(Mv),d=!0);for(let M=0;M<6;M++){const x=M%3;x===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[M],s.y,s.z)):x===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[M]));const w=this._cubeSize;Er(a,x*w,M>2?w:0,w,w),h.setRenderTarget(a),d&&h.render(b,l),h.render(e,l)}h.toneMapping=p,h.autoClear=u,e.background=S}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===Zs||e.mapping===ho;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Av()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tv());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Er(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Yo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-f*f),u=0+c*1.25,p=h*u,{_lodMax:g}=this,b=this._sizeLods[i],_=3*b*(i>g-as?i-g+as:0),d=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-n,Er(s,_,d,3*b,2*b),a.setRenderTarget(s),a.render(o,Yo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Er(e,_,d,3*b,2*b),a.setRenderTarget(e),a.render(o,Yo)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&ht("blur direction must be either latitudinal or longitudinal!");const f=3,h=this._lodMeshes[a];h.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ps-1),b=s/g,_=isFinite(s)?1+Math.floor(f*b):Ps;_>Ps&&He(`sigmaRadians, ${s}, is too large and will clip, as it requested ${_} samples when the maximum is set to ${Ps}`);const d=[];let S=0;for(let T=0;T<Ps;++T){const y=T/b,C=Math.exp(-y*y/2);d.push(C),T===0?S+=C:T<_&&(S+=2*C)}for(let T=0;T<d.length;T++)d[T]=d[T]/S;u.envMap.value=e.texture,u.samples.value=_,u.weights.value=d,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const x=this._sizeLods[a],w=3*x*(a>M-as?a-M+as:0),N=4*(this._cubeSize-x);Er(n,w,N,3*x,2*x),l.setRenderTarget(n),l.render(h,Yo)}}function tR(t){const e=[],n=[],i=[];let a=t;const s=t-as+1+yv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-as?l=yv[r-t+as-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),f=-c,h=1+c,u=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,g=6,b=3,_=2,d=1,S=new Float32Array(b*g*p),M=new Float32Array(_*g*p),x=new Float32Array(d*g*p);for(let N=0;N<p;N++){const T=N%3*2/3-1,y=N>2?0:-1,C=[T,y,0,T+2/3,y,0,T+2/3,y+1,0,T,y,0,T+2/3,y+1,0,T,y+1,0];S.set(C,b*g*N),M.set(u,_*g*N);const R=[N,N,N,N,N,N];x.set(R,d*g*N)}const w=new Rn;w.setAttribute("position",new yt(S,b)),w.setAttribute("uv",new yt(M,_)),w.setAttribute("faceIndex",new yt(x,d)),i.push(new Ci(w,null)),a>as&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Ev(t,e,n){const i=new $i(t,e,n);return i.texture.mapping=yf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Er(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function nR(t,e,n){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$w,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Ca,depthTest:!1,depthWrite:!1})}function iR(t,e,n){const i=new Float32Array(Ps),a=new j(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Ca,depthTest:!1,depthWrite:!1})}function Tv(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Ca,depthTest:!1,depthWrite:!1})}function Av(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ca,depthTest:!1,depthWrite:!1})}function bf(){return`

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
	`}class Oy extends $i{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Ry(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Js(5,5,5),s=new bn({name:"CubemapFromEquirect",uniforms:mo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yn,blending:Ca});s.uniforms.tEquirect.value=n;const r=new Ci(a,s),o=n.minFilter;return n.minFilter===zs&&(n.minFilter=wn),new cA(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function aR(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===ud||p===fd)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new Oy(g.height);return b.fromEquirectangularTexture(t,u),e.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===ud||p===fd,b=p===Zs||p===ho;if(g||b){let _=n.get(u);const d=_!==void 0?_.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new bv(t)),_=g?i.fromEquirectangular(u,_):i.fromCubemap(u,_),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),_.texture;if(_!==void 0)return _.texture;{const S=u.image;return g&&S&&S.height>0||b&&S&&l(S)?(i===null&&(i=new bv(t)),_=g?i.fromEquirectangular(u):i.fromCubemap(u),_.texture.pmremVersion=u.pmremVersion,n.set(u,_),u.addEventListener("dispose",f),_.texture):null}}}return u}function o(u,p){return p===ud?u.mapping=Zs:p===fd&&(u.mapping=ho),u}function l(u){let p=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function f(u){const p=u.target;p.removeEventListener("dispose",f);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function sR(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&Jr("WebGLRenderer: "+i+" extension not supported."),a}}}function rR(t,e,n,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let b=0;if(g===void 0)return;if(p!==null){const S=p.array;b=p.version;for(let M=0,x=S.length;M<x;M+=3){const w=S[M+0],N=S[M+1],T=S[M+2];u.push(w,N,N,T,T,w)}}else{const S=g.array;b=g.version;for(let M=0,x=S.length/3-1;M<x;M+=3){const w=M+0,N=M+1,T=M+2;u.push(w,N,N,T,T,w)}}const _=new(g.count>=65535?by:My)(u,1);_.version=b;const d=s.get(h);d&&e.remove(d),s.set(h,_)}function f(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function oR(t,e,n){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,u){t.drawElements(i,u,s,h*r),n.update(u,i,1)}function c(h,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,h*r,p),n.update(u,i,p))}function f(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let b=0;for(let _=0;_<p;_++)b+=u[_];n.update(b,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function lR(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:ht("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function cR(t,e,n){const i=new WeakMap,a=new Zt;function s(r,o,l){const c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let R=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",R)};var p=R;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let x=0;g===!0&&(x=1),b===!0&&(x=2),_===!0&&(x=3);let w=o.attributes.position.count*x,N=1;w>e.maxTextureSize&&(N=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const T=new Float32Array(w*N*4*h),y=new _y(T,w,N,h);y.type=zi,y.needsUpdate=!0;const C=x*4;for(let D=0;D<h;D++){const O=d[D],H=S[D],L=M[D],P=w*N*4*D;for(let I=0;I<O.count;I++){const z=I*C;g===!0&&(a.fromBufferAttribute(O,I),T[P+z+0]=a.x,T[P+z+1]=a.y,T[P+z+2]=a.z,T[P+z+3]=0),b===!0&&(a.fromBufferAttribute(H,I),T[P+z+4]=a.x,T[P+z+5]=a.y,T[P+z+6]=a.z,T[P+z+7]=0),_===!0&&(a.fromBufferAttribute(L,I),T[P+z+8]=a.x,T[P+z+9]=a.y,T[P+z+10]=a.z,T[P+z+11]=L.itemSize===4?a.w:1)}}u={count:h,texture:y,size:new vt(w,N)},i.set(o,u),o.addEventListener("dispose",R)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let _=0;_<c.length;_++)g+=c[_];const b=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",b),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function uR(t,e,n,i,a){let s=new WeakMap;function r(c){const f=a.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==f&&(e.update(u),s.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==f&&(p.update(),s.set(p,f))}return u}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:r,dispose:o}}const fR={[iy]:"LINEAR_TONE_MAPPING",[ay]:"REINHARD_TONE_MAPPING",[sy]:"CINEON_TONE_MAPPING",[ry]:"ACES_FILMIC_TONE_MAPPING",[ly]:"AGX_TONE_MAPPING",[cy]:"NEUTRAL_TONE_MAPPING",[oy]:"CUSTOM_TONE_MAPPING"};function dR(t,e,n,i,a,s){const r=new $i(e,n,{type:t,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new po(e,n):void 0}),o=new $i(e,n,{type:za,depthBuffer:!1,stencilBuffer:!1}),l=new Rn;l.setAttribute("position",new wi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new wi([0,2,0,0,2,0],2));const c=new rA({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ci(l,c),h=new $m(-1,1,1,-1,0,1);let u=null,p=null,g=!1,b,_=null,d=[],S=!1;this.setSize=function(M,x){r.setSize(M,x),o.setSize(M,x);for(let w=0;w<d.length;w++){const N=d[w];N.setSize&&N.setSize(M,x)}},this.setEffects=function(M){d=M,S=d.length>0&&d[0].isRenderPass===!0;const x=r.width,w=r.height;for(let N=0;N<d.length;N++){const T=d[N];T.setSize&&T.setSize(x,w)}},this.begin=function(M,x){if(g||M.toneMapping===Ji&&d.length===0)return!1;if(_=x,x!==null){const w=x.width,N=x.height;(r.width!==w||r.height!==N)&&this.setSize(w,N)}return S===!1&&M.setRenderTarget(r),b=M.toneMapping,M.toneMapping=Ji,!0},this.hasRenderPass=function(){return S},this.end=function(M,x){M.toneMapping=b,g=!0;let w=r,N=o;for(let T=0;T<d.length;T++){const y=d[T];if(y.enabled!==!1&&(y.render(M,N,w,x),y.needsSwap!==!1)){const C=w;w=N,N=C}}if(u!==M.outputColorSpace||p!==M.toneMapping){u=M.outputColorSpace,p=M.toneMapping,c.defines={},lt.getTransfer(u)===At&&(c.defines.SRGB_TRANSFER="");const T=fR[p];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(_),M.render(f,h),_=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Py=new In,Lp=new po(1,1),zy=new _y,Iy=new PT,By=new Ry,wv=[],Rv=[],Cv=new Float32Array(16),Nv=new Float32Array(9),Dv=new Float32Array(4);function wo(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=wv[a];if(s===void 0&&(s=new Float32Array(a),wv[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function cn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function un(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ef(t,e){let n=Rv[e];n===void 0&&(n=new Int32Array(e),Rv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function hR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function pR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2fv(this.addr,e),un(n,e)}}function mR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(cn(n,e))return;t.uniform3fv(this.addr,e),un(n,e)}}function gR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4fv(this.addr,e),un(n,e)}}function vR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Dv.set(i),t.uniformMatrix2fv(this.addr,!1,Dv),un(n,i)}}function _R(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Nv.set(i),t.uniformMatrix3fv(this.addr,!1,Nv),un(n,i)}}function xR(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Cv.set(i),t.uniformMatrix4fv(this.addr,!1,Cv),un(n,i)}}function SR(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function yR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2iv(this.addr,e),un(n,e)}}function MR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(cn(n,e))return;t.uniform3iv(this.addr,e),un(n,e)}}function bR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4iv(this.addr,e),un(n,e)}}function ER(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function TR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2uiv(this.addr,e),un(n,e)}}function AR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(cn(n,e))return;t.uniform3uiv(this.addr,e),un(n,e)}}function wR(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4uiv(this.addr,e),un(n,e)}}function RR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Lp.compareFunction=n.isReversedDepthBuffer()?Zm:Ym,s=Lp):s=Py,n.setTexture2D(e||s,a)}function CR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||Iy,a)}function NR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||By,a)}function DR(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||zy,a)}function UR(t){switch(t){case 5126:return hR;case 35664:return pR;case 35665:return mR;case 35666:return gR;case 35674:return vR;case 35675:return _R;case 35676:return xR;case 5124:case 35670:return SR;case 35667:case 35671:return yR;case 35668:case 35672:return MR;case 35669:case 35673:return bR;case 5125:return ER;case 36294:return TR;case 36295:return AR;case 36296:return wR;case 35678:case 36198:case 36298:case 36306:case 35682:return RR;case 35679:case 36299:case 36307:return CR;case 35680:case 36300:case 36308:case 36293:return NR;case 36289:case 36303:case 36311:case 36292:return DR}}function LR(t,e){t.uniform1fv(this.addr,e)}function OR(t,e){const n=wo(e,this.size,2);t.uniform2fv(this.addr,n)}function PR(t,e){const n=wo(e,this.size,3);t.uniform3fv(this.addr,n)}function zR(t,e){const n=wo(e,this.size,4);t.uniform4fv(this.addr,n)}function IR(t,e){const n=wo(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function BR(t,e){const n=wo(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function FR(t,e){const n=wo(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function HR(t,e){t.uniform1iv(this.addr,e)}function GR(t,e){t.uniform2iv(this.addr,e)}function VR(t,e){t.uniform3iv(this.addr,e)}function kR(t,e){t.uniform4iv(this.addr,e)}function XR(t,e){t.uniform1uiv(this.addr,e)}function WR(t,e){t.uniform2uiv(this.addr,e)}function jR(t,e){t.uniform3uiv(this.addr,e)}function qR(t,e){t.uniform4uiv(this.addr,e)}function YR(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Lp:r=Py;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function ZR(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||Iy,s[r])}function KR(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||By,s[r])}function QR(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||zy,s[r])}function JR(t){switch(t){case 5126:return LR;case 35664:return OR;case 35665:return PR;case 35666:return zR;case 35674:return IR;case 35675:return BR;case 35676:return FR;case 5124:case 35670:return HR;case 35667:case 35671:return GR;case 35668:case 35672:return VR;case 35669:case 35673:return kR;case 5125:return XR;case 36294:return WR;case 36295:return jR;case 36296:return qR;case 35678:case 36198:case 36298:case 36306:case 35682:return YR;case 35679:case 36299:case 36307:return ZR;case 35680:case 36300:case 36308:case 36293:return KR;case 36289:case 36303:case 36311:case 36292:return QR}}class $R{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=UR(n.type)}}class eC{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=JR(n.type)}}class tC{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const Vd=/(\w+)(\])?(\[|\.)?/g;function Uv(t,e){t.seq.push(e),t.map[e.id]=e}function nC(t,e,n){const i=t.name,a=i.length;for(Vd.lastIndex=0;;){const s=Vd.exec(i),r=Vd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Uv(n,c===void 0?new $R(o,t,e):new eC(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new tC(o),Uv(n,h)),n=h}}}class pu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);nC(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Lv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const iC=37297;let aC=0;function sC(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Ov=new We;function rC(t){lt._getMatrix(Ov,lt.workingColorSpace,t);const e=`mat3( ${Ov.elements.map(n=>n.toFixed(4))} )`;switch(lt.getTransfer(t)){case Zu:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return He("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Pv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+sC(t.getShaderSource(e),o)}else return s}function oC(t,e){const n=rC(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const lC={[iy]:"Linear",[ay]:"Reinhard",[sy]:"Cineon",[ry]:"ACESFilmic",[ly]:"AgX",[cy]:"Neutral",[oy]:"Custom"};function cC(t,e){const n=lC[e];return n===void 0?(He("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new j;function uC(){lt.getLuminanceCoefficients(Xc);const t=Xc.x.toFixed(4),e=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fC(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nl).join(`
`)}function dC(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function hC(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function nl(t){return t!==""}function zv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Iv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pC=/^[ \t]*#include +<([\w\d./]+)>/gm;function Op(t){return t.replace(pC,gC)}const mC=new Map;function gC(t,e){let n=tt[e];if(n===void 0){const i=mC.get(e);if(i!==void 0)n=tt[i],He('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Op(n)}const vC=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bv(t){return t.replace(vC,_C)}function _C(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Fv(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const xC={[ou]:"SHADOWMAP_TYPE_PCF",[tl]:"SHADOWMAP_TYPE_VSM"};function SC(t){return xC[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const yC={[Zs]:"ENVMAP_TYPE_CUBE",[ho]:"ENVMAP_TYPE_CUBE",[yf]:"ENVMAP_TYPE_CUBE_UV"};function MC(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":yC[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const bC={[ho]:"ENVMAP_MODE_REFRACTION"};function EC(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":bC[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const TC={[ny]:"ENVMAP_BLENDING_MULTIPLY",[pT]:"ENVMAP_BLENDING_MIX",[mT]:"ENVMAP_BLENDING_ADD"};function AC(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":TC[t.combine]||"ENVMAP_BLENDING_NONE"}function wC(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function RC(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=SC(n),c=MC(n),f=EC(n),h=AC(n),u=wC(n),p=fC(n),g=dC(s),b=a.createProgram();let _,d,S=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(_=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(nl).join(`
`),_.length>0&&(_+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(nl).join(`
`),d.length>0&&(d+=`
`)):(_=[Fv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nl).join(`
`),d=[Fv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ji?"#define TONE_MAPPING":"",n.toneMapping!==Ji?tt.tonemapping_pars_fragment:"",n.toneMapping!==Ji?cC("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,oC("linearToOutputTexel",n.outputColorSpace),uC(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(nl).join(`
`)),r=Op(r),r=zv(r,n),r=Iv(r,n),o=Op(o),o=zv(o,n),o=Iv(o,n),r=Bv(r),o=Bv(o),n.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,_=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+_,d=["#define varying in",n.glslVersion===X0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===X0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=S+_+r,x=S+d+o,w=Lv(a,a.VERTEX_SHADER,M),N=Lv(a,a.FRAGMENT_SHADER,x);a.attachShader(b,w),a.attachShader(b,N),n.index0AttributeName!==void 0?a.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function T(D){if(t.debug.checkShaderErrors){const O=a.getProgramInfoLog(b)||"",H=a.getShaderInfoLog(w)||"",L=a.getShaderInfoLog(N)||"",P=O.trim(),I=H.trim(),z=L.trim();let U=!0,k=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(U=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,b,w,N);else{const re=Pv(a,w,"vertex"),le=Pv(a,N,"fragment");ht("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+P+`
`+re+`
`+le)}else P!==""?He("WebGLProgram: Program Info Log:",P):(I===""||z==="")&&(k=!1);k&&(D.diagnostics={runnable:U,programLog:P,vertexShader:{log:I,prefix:_},fragmentShader:{log:z,prefix:d}})}a.deleteShader(w),a.deleteShader(N),y=new pu(a,b),C=hC(a,b)}let y;this.getUniforms=function(){return y===void 0&&T(this),y};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let R=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=a.getProgramParameter(b,iC)),R},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=aC++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=w,this.fragmentShader=N,this}let CC=0;class NC{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new DC(e),n.set(e,i)),i}}class DC{constructor(e){this.id=CC++,this.code=e,this.usedTimes=0}}function UC(t){return t===Ks||t===ju||t===qu}function LC(t,e,n,i,a,s){const r=new xy,o=new NC,l=new Set,c=[],f=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,C,R,D,O,H){const L=D.fog,P=O.geometry,I=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,z=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,U=e.get(y.envMap||I,z),k=U&&U.mapping===yf?U.image.height:null,re=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&He("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const le=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,_e=le!==void 0?le.length:0;let ke=0;P.morphAttributes.position!==void 0&&(ke=1),P.morphAttributes.normal!==void 0&&(ke=2),P.morphAttributes.color!==void 0&&(ke=3);let Ze,Fe,ie,ve;if(re){const Ne=Wi[re];Ze=Ne.vertexShader,Fe=Ne.fragmentShader}else{Ze=y.vertexShader,Fe=y.fragmentShader;const Ne=o.getVertexShaderStage(y),dt=o.getFragmentShaderStage(y);o.update(y,Ne,dt),ie=Ne.id,ve=dt.id}const pe=t.getRenderTarget(),Ce=t.state.buffers.depth.getReversed(),Ie=O.isInstancedMesh===!0,Be=O.isBatchedMesh===!0,Mt=!!y.map,je=!!y.matcap,ft=!!U,nt=!!y.aoMap,et=!!y.lightMap,Ot=!!y.bumpMap&&y.wireframe===!1,Ct=!!y.normalMap,Xt=!!y.displacementMap,_t=!!y.emissiveMap,bt=!!y.metalnessMap,Se=!!y.roughnessMap,B=y.anisotropy>0,K=y.clearcoat>0,ae=y.dispersion>0,A=y.iridescence>0,v=y.sheen>0,G=y.transmission>0,X=B&&!!y.anisotropyMap,Z=K&&!!y.clearcoatMap,ce=K&&!!y.clearcoatNormalMap,he=K&&!!y.clearcoatRoughnessMap,Q=A&&!!y.iridescenceMap,W=A&&!!y.iridescenceThicknessMap,ee=v&&!!y.sheenColorMap,ue=v&&!!y.sheenRoughnessMap,de=!!y.specularMap,me=!!y.specularColorMap,Re=!!y.specularIntensityMap,Le=G&&!!y.transmissionMap,Ge=G&&!!y.thicknessMap,F=!!y.gradientMap,ge=!!y.alphaMap,te=y.alphaTest>0,$=!!y.alphaHash,ye=!!y.extensions;let fe=Ji;y.toneMapped&&(pe===null||pe.isXRRenderTarget===!0)&&(fe=t.toneMapping);const Oe={shaderID:re,shaderType:y.type,shaderName:y.name,vertexShader:Ze,fragmentShader:Fe,defines:y.defines,customVertexShaderID:ie,customFragmentShaderID:ve,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Be,batchingColor:Be&&O._colorsTexture!==null,instancing:Ie,instancingColor:Ie&&O.instanceColor!==null,instancingMorph:Ie&&O.morphTexture!==null,outputColorSpace:pe===null?t.outputColorSpace:pe.isXRRenderTarget===!0?pe.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Mt,matcap:je,envMap:ft,envMapMode:ft&&U.mapping,envMapCubeUVHeight:k,aoMap:nt,lightMap:et,bumpMap:Ot,normalMap:Ct,displacementMap:Xt,emissiveMap:_t,normalMapObjectSpace:Ct&&y.normalMapType===_T,normalMapTangentSpace:Ct&&y.normalMapType===G0,packedNormalMap:Ct&&y.normalMapType===G0&&UC(y.normalMap.format),metalnessMap:bt,roughnessMap:Se,anisotropy:B,anisotropyMap:X,clearcoat:K,clearcoatMap:Z,clearcoatNormalMap:ce,clearcoatRoughnessMap:he,dispersion:ae,iridescence:A,iridescenceMap:Q,iridescenceThicknessMap:W,sheen:v,sheenColorMap:ee,sheenRoughnessMap:ue,specularMap:de,specularColorMap:me,specularIntensityMap:Re,transmission:G,transmissionMap:Le,thicknessMap:Ge,gradientMap:F,opaque:y.transparent===!1&&y.blending===ks&&y.alphaToCoverage===!1,alphaMap:ge,alphaTest:te,alphaHash:$,combine:y.combine,mapUv:Mt&&g(y.map.channel),aoMapUv:nt&&g(y.aoMap.channel),lightMapUv:et&&g(y.lightMap.channel),bumpMapUv:Ot&&g(y.bumpMap.channel),normalMapUv:Ct&&g(y.normalMap.channel),displacementMapUv:Xt&&g(y.displacementMap.channel),emissiveMapUv:_t&&g(y.emissiveMap.channel),metalnessMapUv:bt&&g(y.metalnessMap.channel),roughnessMapUv:Se&&g(y.roughnessMap.channel),anisotropyMapUv:X&&g(y.anisotropyMap.channel),clearcoatMapUv:Z&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:ce&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:he&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:Q&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:W&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&g(y.sheenRoughnessMap.channel),specularMapUv:de&&g(y.specularMap.channel),specularColorMapUv:me&&g(y.specularColorMap.channel),specularIntensityMapUv:Re&&g(y.specularIntensityMap.channel),transmissionMapUv:Le&&g(y.transmissionMap.channel),thicknessMapUv:Ge&&g(y.thicknessMap.channel),alphaMapUv:ge&&g(y.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Ct||B),vertexNormals:!!P.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!P.attributes.uv&&(Mt||ge),fog:!!L,useFog:y.fog===!0,fogExp2:!!L&&L.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||P.attributes.normal===void 0&&Ct===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Ce,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:P.attributes.position!==void 0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:_e,morphTextureStride:ke,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&R.length>0,shadowMapType:t.shadowMap.type,toneMapping:fe,decodeVideoTexture:Mt&&y.map.isVideoTexture===!0&&lt.getTransfer(y.map.colorSpace)===At,decodeVideoTextureEmissive:_t&&y.emissiveMap.isVideoTexture===!0&&lt.getTransfer(y.emissiveMap.colorSpace)===At,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ya,flipSided:y.side===Yn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ye&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ye&&y.extensions.multiDraw===!0||Be)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Oe.vertexUv1s=l.has(1),Oe.vertexUv2s=l.has(2),Oe.vertexUv3s=l.has(3),l.clear(),Oe}function _(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const R in y.defines)C.push(R),C.push(y.defines[R]);return y.isRawShaderMaterial===!1&&(d(C,y),S(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function d(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function S(y,C){r.disableAll(),C.instancing&&r.enable(0),C.instancingColor&&r.enable(1),C.instancingMorph&&r.enable(2),C.matcap&&r.enable(3),C.envMap&&r.enable(4),C.normalMapObjectSpace&&r.enable(5),C.normalMapTangentSpace&&r.enable(6),C.clearcoat&&r.enable(7),C.iridescence&&r.enable(8),C.alphaTest&&r.enable(9),C.vertexColors&&r.enable(10),C.vertexAlphas&&r.enable(11),C.vertexUv1s&&r.enable(12),C.vertexUv2s&&r.enable(13),C.vertexUv3s&&r.enable(14),C.vertexTangents&&r.enable(15),C.anisotropy&&r.enable(16),C.alphaHash&&r.enable(17),C.batching&&r.enable(18),C.dispersion&&r.enable(19),C.batchingColor&&r.enable(20),C.gradientMap&&r.enable(21),C.packedNormalMap&&r.enable(22),C.vertexNormals&&r.enable(23),y.push(r.mask),r.disableAll(),C.fog&&r.enable(0),C.useFog&&r.enable(1),C.flatShading&&r.enable(2),C.logarithmicDepthBuffer&&r.enable(3),C.reversedDepthBuffer&&r.enable(4),C.skinning&&r.enable(5),C.morphTargets&&r.enable(6),C.morphNormals&&r.enable(7),C.morphColors&&r.enable(8),C.premultipliedAlpha&&r.enable(9),C.shadowMapEnabled&&r.enable(10),C.doubleSided&&r.enable(11),C.flipSided&&r.enable(12),C.useDepthPacking&&r.enable(13),C.dithering&&r.enable(14),C.transmission&&r.enable(15),C.sheen&&r.enable(16),C.opaque&&r.enable(17),C.pointsUvs&&r.enable(18),C.decodeVideoTexture&&r.enable(19),C.decodeVideoTextureEmissive&&r.enable(20),C.alphaToCoverage&&r.enable(21),C.numLightProbeGrids>0&&r.enable(22),C.hasPositionAttribute&&r.enable(23),y.push(r.mask)}function M(y){const C=p[y.type];let R;if(C){const D=Wi[C];R=iA.clone(D.uniforms)}else R=y.uniforms;return R}function x(y,C){let R=f.get(C);return R!==void 0?++R.usedTimes:(R=new RC(t,C,y,a),c.push(R),f.set(C,R)),R}function w(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),f.delete(y.cacheKey),y.destroy()}}function N(y){o.remove(y)}function T(){o.dispose()}return{getParameters:b,getProgramCacheKey:_,getUniforms:M,acquireProgram:x,releaseProgram:w,releaseShaderCache:N,programs:c,dispose:T}}function OC(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function PC(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Hv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Gv(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,b,_,d){let S=t[e];return S===void 0?(S={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:_,group:d},t[e]=S):(S.id=u.id,S.object=u,S.geometry=p,S.material=g,S.materialVariant=r(u),S.groupOrder=b,S.renderOrder=u.renderOrder,S.z=_,S.group=d),e++,S}function l(u,p,g,b,_,d){const S=o(u,p,g,b,_,d);g.transmission>0?i.push(S):g.transparent===!0?a.push(S):n.push(S)}function c(u,p,g,b,_,d){const S=o(u,p,g,b,_,d);g.transmission>0?i.unshift(S):g.transparent===!0?a.unshift(S):n.unshift(S)}function f(u,p,g){n.length>1&&n.sort(u||PC),i.length>1&&i.sort(p||Hv),a.length>1&&a.sort(p||Hv),g&&(n.reverse(),i.reverse(),a.reverse())}function h(){for(let u=e,p=t.length;u<p;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:h,sort:f}}function zC(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new Gv,t.set(i,[r])):a>=s.length?(r=new Gv,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function IC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new j,color:new rt};break;case"SpotLight":n={position:new j,direction:new j,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new j,color:new rt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new j,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":n={color:new rt,position:new j,halfWidth:new j,halfHeight:new j};break}return t[e.id]=n,n}}}function BC(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new vt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let FC=0;function HC(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function GC(t){const e=new IC,n=BC(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new j);const a=new j,s=new It,r=new It;function o(c){let f=0,h=0,u=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,g=0,b=0,_=0,d=0,S=0,M=0,x=0,w=0,N=0,T=0;c.sort(HC);for(let C=0,R=c.length;C<R;C++){const D=c[C],O=D.color,H=D.intensity,L=D.distance;let P=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ks?P=D.shadow.map.texture:P=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=O.r*H,h+=O.g*H,u+=O.b*H;else if(D.isLightProbe){for(let I=0;I<9;I++)i.probe[I].addScaledVector(D.sh.coefficients[I],H);T++}else if(D.isDirectionalLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const z=D.shadow,U=n.get(D);U.shadowIntensity=z.intensity,U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=P,i.directionalShadowMatrix[p]=D.shadow.matrix,S++}i.directional[p]=I,p++}else if(D.isSpotLight){const I=e.get(D);I.position.setFromMatrixPosition(D.matrixWorld),I.color.copy(O).multiplyScalar(H),I.distance=L,I.coneCos=Math.cos(D.angle),I.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),I.decay=D.decay,i.spot[b]=I;const z=D.shadow;if(D.map&&(i.spotLightMap[w]=D.map,w++,z.updateMatrices(D),D.castShadow&&N++),i.spotLightMatrix[b]=z.matrix,D.castShadow){const U=n.get(D);U.shadowIntensity=z.intensity,U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,i.spotShadow[b]=U,i.spotShadowMap[b]=P,x++}b++}else if(D.isRectAreaLight){const I=e.get(D);I.color.copy(O).multiplyScalar(H),I.halfWidth.set(D.width*.5,0,0),I.halfHeight.set(0,D.height*.5,0),i.rectArea[_]=I,_++}else if(D.isPointLight){const I=e.get(D);if(I.color.copy(D.color).multiplyScalar(D.intensity),I.distance=D.distance,I.decay=D.decay,D.castShadow){const z=D.shadow,U=n.get(D);U.shadowIntensity=z.intensity,U.shadowBias=z.bias,U.shadowNormalBias=z.normalBias,U.shadowRadius=z.radius,U.shadowMapSize=z.mapSize,U.shadowCameraNear=z.camera.near,U.shadowCameraFar=z.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=P,i.pointShadowMatrix[g]=D.shadow.matrix,M++}i.point[g]=I,g++}else if(D.isHemisphereLight){const I=e.get(D);I.skyColor.copy(D.color).multiplyScalar(H),I.groundColor.copy(D.groundColor).multiplyScalar(H),i.hemi[d]=I,d++}}_>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==p||y.pointLength!==g||y.spotLength!==b||y.rectAreaLength!==_||y.hemiLength!==d||y.numDirectionalShadows!==S||y.numPointShadows!==M||y.numSpotShadows!==x||y.numSpotMaps!==w||y.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=_,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=x,i.spotShadowMap.length=x,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=x+w-N,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=T,y.directionalLength=p,y.pointLength=g,y.spotLength=b,y.rectAreaLength=_,y.hemiLength=d,y.numDirectionalShadows=S,y.numPointShadows=M,y.numSpotShadows=x,y.numSpotMaps=w,y.numLightProbes=T,i.version=FC++)}function l(c,f){let h=0,u=0,p=0,g=0,b=0;const _=f.matrixWorldInverse;for(let d=0,S=c.length;d<S;d++){const M=c[d];if(M.isDirectionalLight){const x=i.directional[h];x.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(_),h++}else if(M.isSpotLight){const x=i.spot[p];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(_),x.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),x.direction.sub(a),x.direction.transformDirection(_),p++}else if(M.isRectAreaLight){const x=i.rectArea[g];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(_),r.identity(),s.copy(M.matrixWorld),s.premultiply(_),r.extractRotation(s),x.halfWidth.set(M.width*.5,0,0),x.halfHeight.set(0,M.height*.5,0),x.halfWidth.applyMatrix4(r),x.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const x=i.point[u];x.position.setFromMatrixPosition(M.matrixWorld),x.position.applyMatrix4(_),u++}else if(M.isHemisphereLight){const x=i.hemi[b];x.direction.setFromMatrixPosition(M.matrixWorld),x.direction.transformDirection(_),b++}}}return{setup:o,setupView:l,state:i}}function Vv(t){const e=new GC(t),n=[],i=[],a=[];function s(u){h.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){e.setup(n)}function f(u){e.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:f,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function VC(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Vv(t),e.set(a,[o])):s>=r.length?(o=new Vv(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const kC=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XC=`uniform sampler2D shadow_pass;
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
}`,WC=[new j(1,0,0),new j(-1,0,0),new j(0,1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1)],jC=[new j(0,-1,0),new j(0,-1,0),new j(0,0,1),new j(0,0,-1),new j(0,-1,0),new j(0,-1,0)],kv=new It,Zo=new j,kd=new j;function qC(t,e,n){let i=new Ay;const a=new vt,s=new vt,r=new Zt,o=new oA,l=new lA,c={},f=n.maxTextureSize,h={[xs]:Yn,[Yn]:xs,[ya]:ya},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new vt},radius:{value:4}},vertexShader:kC,fragmentShader:XC}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Rn;g.setAttribute("position",new yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ci(g,u),_=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ou;let d=this.type;this.render=function(N,T,y){if(_.enabled===!1||_.autoUpdate===!1&&_.needsUpdate===!1||N.length===0)return;this.type===ZE&&(He("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ou);const C=t.getRenderTarget(),R=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),O=t.state;O.setBlending(Ca),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=d!==this.type;H&&T.traverse(function(L){L.material&&(Array.isArray(L.material)?L.material.forEach(P=>P.needsUpdate=!0):L.material.needsUpdate=!0)});for(let L=0,P=N.length;L<P;L++){const I=N[L],z=I.shadow;if(z===void 0){He("WebGLShadowMap:",I,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;a.copy(z.mapSize);const U=z.getFrameExtents();a.multiply(U),s.copy(z.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/U.x),a.x=s.x*U.x,z.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/U.y),a.y=s.y*U.y,z.mapSize.y=s.y));const k=t.state.buffers.depth.getReversed();if(z.camera._reversedDepth=k,z.map===null||H===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===tl){if(I.isPointLight){He("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new $i(a.x,a.y,{format:Ks,type:za,minFilter:wn,magFilter:wn,generateMipmaps:!1}),z.map.texture.name=I.name+".shadowMap",z.map.depthTexture=new po(a.x,a.y,zi),z.map.depthTexture.name=I.name+".shadowMapDepth",z.map.depthTexture.format=Ia,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Mn,z.map.depthTexture.magFilter=Mn}else I.isPointLight?(z.map=new Oy(a.x),z.map.depthTexture=new eA(a.x,ea)):(z.map=new $i(a.x,a.y),z.map.depthTexture=new po(a.x,a.y,ea)),z.map.depthTexture.name=I.name+".shadowMap",z.map.depthTexture.format=Ia,this.type===ou?(z.map.depthTexture.compareFunction=k?Zm:Ym,z.map.depthTexture.minFilter=wn,z.map.depthTexture.magFilter=wn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Mn,z.map.depthTexture.magFilter=Mn);z.camera.updateProjectionMatrix()}const re=z.map.isWebGLCubeRenderTarget?6:1;for(let le=0;le<re;le++){if(z.map.isWebGLCubeRenderTarget)t.setRenderTarget(z.map,le),t.clear();else{le===0&&(t.setRenderTarget(z.map),t.clear());const _e=z.getViewport(le);r.set(s.x*_e.x,s.y*_e.y,s.x*_e.z,s.y*_e.w),O.viewport(r)}if(I.isPointLight){const _e=z.camera,ke=z.matrix,Ze=I.distance||_e.far;Ze!==_e.far&&(_e.far=Ze,_e.updateProjectionMatrix()),Zo.setFromMatrixPosition(I.matrixWorld),_e.position.copy(Zo),kd.copy(_e.position),kd.add(WC[le]),_e.up.copy(jC[le]),_e.lookAt(kd),_e.updateMatrixWorld(),ke.makeTranslation(-Zo.x,-Zo.y,-Zo.z),kv.multiplyMatrices(_e.projectionMatrix,_e.matrixWorldInverse),z._frustum.setFromProjectionMatrix(kv,_e.coordinateSystem,_e.reversedDepth)}else z.updateMatrices(I);i=z.getFrustum(),x(T,y,z.camera,I,this.type)}z.isPointLightShadow!==!0&&this.type===tl&&S(z,y),z.needsUpdate=!1}d=this.type,_.needsUpdate=!1,t.setRenderTarget(C,R,D)};function S(N,T){const y=e.update(b);u.defines.VSM_SAMPLES!==N.blurSamples&&(u.defines.VSM_SAMPLES=N.blurSamples,p.defines.VSM_SAMPLES=N.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new $i(a.x,a.y,{format:Ks,type:za})),u.uniforms.shadow_pass.value=N.map.depthTexture,u.uniforms.resolution.value=N.mapSize,u.uniforms.radius.value=N.radius,t.setRenderTarget(N.mapPass),t.clear(),t.renderBufferDirect(T,null,y,u,b,null),p.uniforms.shadow_pass.value=N.mapPass.texture,p.uniforms.resolution.value=N.mapSize,p.uniforms.radius.value=N.radius,t.setRenderTarget(N.map),t.clear(),t.renderBufferDirect(T,null,y,p,b,null)}function M(N,T,y,C){let R=null;const D=y.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(D!==void 0)R=D;else if(R=y.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const O=R.uuid,H=T.uuid;let L=c[O];L===void 0&&(L={},c[O]=L);let P=L[H];P===void 0&&(P=R.clone(),L[H]=P,T.addEventListener("dispose",w)),R=P}if(R.visible=T.visible,R.wireframe=T.wireframe,C===tl?R.side=T.shadowSide!==null?T.shadowSide:T.side:R.side=T.shadowSide!==null?T.shadowSide:h[T.side],R.alphaMap=T.alphaMap,R.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,R.map=T.map,R.clipShadows=T.clipShadows,R.clippingPlanes=T.clippingPlanes,R.clipIntersection=T.clipIntersection,R.displacementMap=T.displacementMap,R.displacementScale=T.displacementScale,R.displacementBias=T.displacementBias,R.wireframeLinewidth=T.wireframeLinewidth,R.linewidth=T.linewidth,y.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const O=t.properties.get(R);O.light=y}return R}function x(N,T,y,C,R){if(N.visible===!1)return;if(N.layers.test(T.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&R===tl)&&(!N.frustumCulled||i.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,N.matrixWorld);const H=e.update(N),L=N.material;if(Array.isArray(L)){const P=H.groups;for(let I=0,z=P.length;I<z;I++){const U=P[I],k=L[U.materialIndex];if(k&&k.visible){const re=M(N,k,C,R);N.onBeforeShadow(t,N,T,y,H,re,U),t.renderBufferDirect(y,null,H,re,N,U),N.onAfterShadow(t,N,T,y,H,re,U)}}}else if(L.visible){const P=M(N,L,C,R);N.onBeforeShadow(t,N,T,y,H,P,null),t.renderBufferDirect(y,null,H,P,N,null),N.onAfterShadow(t,N,T,y,H,P,null)}}const O=N.children;for(let H=0,L=O.length;H<L;H++)x(O[H],T,y,C,R)}function w(N){N.target.removeEventListener("dispose",w);for(const y in c){const C=c[y],R=N.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function YC(t,e){function n(){let F=!1;const ge=new Zt;let te=null;const $=new Zt(0,0,0,0);return{setMask:function(ye){te!==ye&&!F&&(t.colorMask(ye,ye,ye,ye),te=ye)},setLocked:function(ye){F=ye},setClear:function(ye,fe,Oe,Ne,dt){dt===!0&&(ye*=Ne,fe*=Ne,Oe*=Ne),ge.set(ye,fe,Oe,Ne),$.equals(ge)===!1&&(t.clearColor(ye,fe,Oe,Ne),$.copy(ge))},reset:function(){F=!1,te=null,$.set(-1,0,0,0)}}}function i(){let F=!1,ge=!1,te=null,$=null,ye=null;return{setReversed:function(fe){if(ge!==fe){const Oe=e.get("EXT_clip_control");fe?Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.ZERO_TO_ONE_EXT):Oe.clipControlEXT(Oe.LOWER_LEFT_EXT,Oe.NEGATIVE_ONE_TO_ONE_EXT),ge=fe;const Ne=ye;ye=null,this.setClear(Ne)}},getReversed:function(){return ge},setTest:function(fe){fe?pe(t.DEPTH_TEST):Ce(t.DEPTH_TEST)},setMask:function(fe){te!==fe&&!F&&(t.depthMask(fe),te=fe)},setFunc:function(fe){if(ge&&(fe=RT[fe]),$!==fe){switch(fe){case Wh:t.depthFunc(t.NEVER);break;case jh:t.depthFunc(t.ALWAYS);break;case qh:t.depthFunc(t.LESS);break;case fo:t.depthFunc(t.LEQUAL);break;case Yh:t.depthFunc(t.EQUAL);break;case Zh:t.depthFunc(t.GEQUAL);break;case Kh:t.depthFunc(t.GREATER);break;case Qh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}$=fe}},setLocked:function(fe){F=fe},setClear:function(fe){ye!==fe&&(ye=fe,ge&&(fe=1-fe),t.clearDepth(fe))},reset:function(){F=!1,te=null,$=null,ye=null,ge=!1}}}function a(){let F=!1,ge=null,te=null,$=null,ye=null,fe=null,Oe=null,Ne=null,dt=null;return{setTest:function(Nt){F||(Nt?pe(t.STENCIL_TEST):Ce(t.STENCIL_TEST))},setMask:function(Nt){ge!==Nt&&!F&&(t.stencilMask(Nt),ge=Nt)},setFunc:function(Nt,Cn,Nn){(te!==Nt||$!==Cn||ye!==Nn)&&(t.stencilFunc(Nt,Cn,Nn),te=Nt,$=Cn,ye=Nn)},setOp:function(Nt,Cn,Nn){(fe!==Nt||Oe!==Cn||Ne!==Nn)&&(t.stencilOp(Nt,Cn,Nn),fe=Nt,Oe=Cn,Ne=Nn)},setLocked:function(Nt){F=Nt},setClear:function(Nt){dt!==Nt&&(t.clearStencil(Nt),dt=Nt)},reset:function(){F=!1,ge=null,te=null,$=null,ye=null,fe=null,Oe=null,Ne=null,dt=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let f={},h={},u={},p=new WeakMap,g=[],b=null,_=!1,d=null,S=null,M=null,x=null,w=null,N=null,T=null,y=new rt(0,0,0),C=0,R=!1,D=null,O=null,H=null,L=null,P=null;const I=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,U=0;const k=t.getParameter(t.VERSION);k.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(k)[1]),z=U>=1):k.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(k)[1]),z=U>=2);let re=null,le={};const _e=t.getParameter(t.SCISSOR_BOX),ke=t.getParameter(t.VIEWPORT),Ze=new Zt().fromArray(_e),Fe=new Zt().fromArray(ke);function ie(F,ge,te,$){const ye=new Uint8Array(4),fe=t.createTexture();t.bindTexture(F,fe),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Oe=0;Oe<te;Oe++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(ge,0,t.RGBA,1,1,$,0,t.RGBA,t.UNSIGNED_BYTE,ye):t.texImage2D(ge+Oe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ye);return fe}const ve={};ve[t.TEXTURE_2D]=ie(t.TEXTURE_2D,t.TEXTURE_2D,1),ve[t.TEXTURE_CUBE_MAP]=ie(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[t.TEXTURE_2D_ARRAY]=ie(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),ve[t.TEXTURE_3D]=ie(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),pe(t.DEPTH_TEST),r.setFunc(fo),Ot(!1),Ct(B0),pe(t.CULL_FACE),nt(Ca);function pe(F){f[F]!==!0&&(t.enable(F),f[F]=!0)}function Ce(F){f[F]!==!1&&(t.disable(F),f[F]=!1)}function Ie(F,ge){return u[F]!==ge?(t.bindFramebuffer(F,ge),u[F]=ge,F===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=ge),F===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=ge),!0):!1}function Be(F,ge){let te=g,$=!1;if(F){te=p.get(ge),te===void 0&&(te=[],p.set(ge,te));const ye=F.textures;if(te.length!==ye.length||te[0]!==t.COLOR_ATTACHMENT0){for(let fe=0,Oe=ye.length;fe<Oe;fe++)te[fe]=t.COLOR_ATTACHMENT0+fe;te.length=ye.length,$=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,$=!0);$&&t.drawBuffers(te)}function Mt(F){return b!==F?(t.useProgram(F),b=F,!0):!1}const je={[Os]:t.FUNC_ADD,[QE]:t.FUNC_SUBTRACT,[JE]:t.FUNC_REVERSE_SUBTRACT};je[$E]=t.MIN,je[eT]=t.MAX;const ft={[tT]:t.ZERO,[nT]:t.ONE,[iT]:t.SRC_COLOR,[kh]:t.SRC_ALPHA,[cT]:t.SRC_ALPHA_SATURATE,[oT]:t.DST_COLOR,[sT]:t.DST_ALPHA,[aT]:t.ONE_MINUS_SRC_COLOR,[Xh]:t.ONE_MINUS_SRC_ALPHA,[lT]:t.ONE_MINUS_DST_COLOR,[rT]:t.ONE_MINUS_DST_ALPHA,[uT]:t.CONSTANT_COLOR,[fT]:t.ONE_MINUS_CONSTANT_COLOR,[dT]:t.CONSTANT_ALPHA,[hT]:t.ONE_MINUS_CONSTANT_ALPHA};function nt(F,ge,te,$,ye,fe,Oe,Ne,dt,Nt){if(F===Ca){_===!0&&(Ce(t.BLEND),_=!1);return}if(_===!1&&(pe(t.BLEND),_=!0),F!==KE){if(F!==d||Nt!==R){if((S!==Os||w!==Os)&&(t.blendEquation(t.FUNC_ADD),S=Os,w=Os),Nt)switch(F){case ks:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Vr:t.blendFunc(t.ONE,t.ONE);break;case F0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case H0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:ht("WebGLState: Invalid blending: ",F);break}else switch(F){case ks:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Vr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case F0:ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case H0:ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ht("WebGLState: Invalid blending: ",F);break}M=null,x=null,N=null,T=null,y.set(0,0,0),C=0,d=F,R=Nt}return}ye=ye||ge,fe=fe||te,Oe=Oe||$,(ge!==S||ye!==w)&&(t.blendEquationSeparate(je[ge],je[ye]),S=ge,w=ye),(te!==M||$!==x||fe!==N||Oe!==T)&&(t.blendFuncSeparate(ft[te],ft[$],ft[fe],ft[Oe]),M=te,x=$,N=fe,T=Oe),(Ne.equals(y)===!1||dt!==C)&&(t.blendColor(Ne.r,Ne.g,Ne.b,dt),y.copy(Ne),C=dt),d=F,R=!1}function et(F,ge){F.side===ya?Ce(t.CULL_FACE):pe(t.CULL_FACE);let te=F.side===Yn;ge&&(te=!te),Ot(te),F.blending===ks&&F.transparent===!1?nt(Ca):nt(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const $=F.stencilWrite;o.setTest($),$&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),_t(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?pe(t.SAMPLE_ALPHA_TO_COVERAGE):Ce(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(F){D!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),D=F)}function Ct(F){F!==qE?(pe(t.CULL_FACE),F!==O&&(F===B0?t.cullFace(t.BACK):F===YE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Ce(t.CULL_FACE),O=F}function Xt(F){F!==H&&(z&&t.lineWidth(F),H=F)}function _t(F,ge,te){F?(pe(t.POLYGON_OFFSET_FILL),(L!==ge||P!==te)&&(L=ge,P=te,r.getReversed()&&(ge=-ge),t.polygonOffset(ge,te))):Ce(t.POLYGON_OFFSET_FILL)}function bt(F){F?pe(t.SCISSOR_TEST):Ce(t.SCISSOR_TEST)}function Se(F){F===void 0&&(F=t.TEXTURE0+I-1),re!==F&&(t.activeTexture(F),re=F)}function B(F,ge,te){te===void 0&&(re===null?te=t.TEXTURE0+I-1:te=re);let $=le[te];$===void 0&&($={type:void 0,texture:void 0},le[te]=$),($.type!==F||$.texture!==ge)&&(re!==te&&(t.activeTexture(te),re=te),t.bindTexture(F,ge||ve[F]),$.type=F,$.texture=ge)}function K(){const F=le[re];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function ae(){try{t.compressedTexImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function A(){try{t.compressedTexImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function v(){try{t.texSubImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function G(){try{t.texSubImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function X(){try{t.compressedTexSubImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function Z(){try{t.compressedTexSubImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function ce(){try{t.texStorage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function he(){try{t.texStorage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function Q(){try{t.texImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function W(){try{t.texImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function ee(F){return h[F]!==void 0?h[F]:t.getParameter(F)}function ue(F,ge){h[F]!==ge&&(t.pixelStorei(F,ge),h[F]=ge)}function de(F){Ze.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),Ze.copy(F))}function me(F){Fe.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),Fe.copy(F))}function Re(F,ge){let te=c.get(ge);te===void 0&&(te=new WeakMap,c.set(ge,te));let $=te.get(F);$===void 0&&($=t.getUniformBlockIndex(ge,F.name),te.set(F,$))}function Le(F,ge){const $=c.get(ge).get(F);l.get(ge)!==$&&(t.uniformBlockBinding(ge,$,F.__bindingPointIndex),l.set(ge,$))}function Ge(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},h={},re=null,le={},u={},p=new WeakMap,g=[],b=null,_=!1,d=null,S=null,M=null,x=null,w=null,N=null,T=null,y=new rt(0,0,0),C=0,R=!1,D=null,O=null,H=null,L=null,P=null,Ze.set(0,0,t.canvas.width,t.canvas.height),Fe.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:pe,disable:Ce,bindFramebuffer:Ie,drawBuffers:Be,useProgram:Mt,setBlending:nt,setMaterial:et,setFlipSided:Ot,setCullFace:Ct,setLineWidth:Xt,setPolygonOffset:_t,setScissorTest:bt,activeTexture:Se,bindTexture:B,unbindTexture:K,compressedTexImage2D:ae,compressedTexImage3D:A,texImage2D:Q,texImage3D:W,pixelStorei:ue,getParameter:ee,updateUBOMapping:Re,uniformBlockBinding:Le,texStorage2D:ce,texStorage3D:he,texSubImage2D:v,texSubImage3D:G,compressedTexSubImage2D:X,compressedTexSubImage3D:Z,scissor:de,viewport:me,reset:Ge}}function ZC(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new vt,f=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(A,v){return g?new OffscreenCanvas(A,v):Qu("canvas")}function _(A,v,G){let X=1;const Z=ae(A);if((Z.width>G||Z.height>G)&&(X=G/Math.max(Z.width,Z.height)),X<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ce=Math.floor(X*Z.width),he=Math.floor(X*Z.height);u===void 0&&(u=b(ce,he));const Q=v?b(ce,he):u;return Q.width=ce,Q.height=he,Q.getContext("2d").drawImage(A,0,0,ce,he),He("WebGLRenderer: Texture has been resized from ("+Z.width+"x"+Z.height+") to ("+ce+"x"+he+")."),Q}else return"data"in A&&He("WebGLRenderer: Image in DataTexture is too big ("+Z.width+"x"+Z.height+")."),A;return A}function d(A){return A.generateMipmaps}function S(A){t.generateMipmap(A)}function M(A){return A.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?t.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function x(A,v,G,X,Z,ce=!1){if(A!==null){if(t[A]!==void 0)return t[A];He("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let he;X&&(he=e.get("EXT_texture_norm16"),he||He("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=v;if(v===t.RED&&(G===t.FLOAT&&(Q=t.R32F),G===t.HALF_FLOAT&&(Q=t.R16F),G===t.UNSIGNED_BYTE&&(Q=t.R8),G===t.UNSIGNED_SHORT&&he&&(Q=he.R16_EXT),G===t.SHORT&&he&&(Q=he.R16_SNORM_EXT)),v===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.R8UI),G===t.UNSIGNED_SHORT&&(Q=t.R16UI),G===t.UNSIGNED_INT&&(Q=t.R32UI),G===t.BYTE&&(Q=t.R8I),G===t.SHORT&&(Q=t.R16I),G===t.INT&&(Q=t.R32I)),v===t.RG&&(G===t.FLOAT&&(Q=t.RG32F),G===t.HALF_FLOAT&&(Q=t.RG16F),G===t.UNSIGNED_BYTE&&(Q=t.RG8),G===t.UNSIGNED_SHORT&&he&&(Q=he.RG16_EXT),G===t.SHORT&&he&&(Q=he.RG16_SNORM_EXT)),v===t.RG_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.RG8UI),G===t.UNSIGNED_SHORT&&(Q=t.RG16UI),G===t.UNSIGNED_INT&&(Q=t.RG32UI),G===t.BYTE&&(Q=t.RG8I),G===t.SHORT&&(Q=t.RG16I),G===t.INT&&(Q=t.RG32I)),v===t.RGB_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.RGB8UI),G===t.UNSIGNED_SHORT&&(Q=t.RGB16UI),G===t.UNSIGNED_INT&&(Q=t.RGB32UI),G===t.BYTE&&(Q=t.RGB8I),G===t.SHORT&&(Q=t.RGB16I),G===t.INT&&(Q=t.RGB32I)),v===t.RGBA_INTEGER&&(G===t.UNSIGNED_BYTE&&(Q=t.RGBA8UI),G===t.UNSIGNED_SHORT&&(Q=t.RGBA16UI),G===t.UNSIGNED_INT&&(Q=t.RGBA32UI),G===t.BYTE&&(Q=t.RGBA8I),G===t.SHORT&&(Q=t.RGBA16I),G===t.INT&&(Q=t.RGBA32I)),v===t.RGB&&(G===t.UNSIGNED_SHORT&&he&&(Q=he.RGB16_EXT),G===t.SHORT&&he&&(Q=he.RGB16_SNORM_EXT),G===t.UNSIGNED_INT_5_9_9_9_REV&&(Q=t.RGB9_E5),G===t.UNSIGNED_INT_10F_11F_11F_REV&&(Q=t.R11F_G11F_B10F)),v===t.RGBA){const W=ce?Zu:lt.getTransfer(Z);G===t.FLOAT&&(Q=t.RGBA32F),G===t.HALF_FLOAT&&(Q=t.RGBA16F),G===t.UNSIGNED_BYTE&&(Q=W===At?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT&&he&&(Q=he.RGBA16_EXT),G===t.SHORT&&he&&(Q=he.RGBA16_SNORM_EXT),G===t.UNSIGNED_SHORT_4_4_4_4&&(Q=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(Q=t.RGB5_A1)}return(Q===t.R16F||Q===t.R32F||Q===t.RG16F||Q===t.RG32F||Q===t.RGBA16F||Q===t.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function w(A,v){let G;return A?v===null||v===ea||v===Ol?G=t.DEPTH24_STENCIL8:v===zi?G=t.DEPTH32F_STENCIL8:v===Ll&&(G=t.DEPTH24_STENCIL8,He("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===ea||v===Ol?G=t.DEPTH_COMPONENT24:v===zi?G=t.DEPTH_COMPONENT32F:v===Ll&&(G=t.DEPTH_COMPONENT16),G}function N(A,v){return d(A)===!0||A.isFramebufferTexture&&A.minFilter!==Mn&&A.minFilter!==wn?Math.log2(Math.max(v.width,v.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?v.mipmaps.length:1}function T(A){const v=A.target;v.removeEventListener("dispose",T),C(v),v.isVideoTexture&&f.delete(v),v.isHTMLTexture&&h.delete(v)}function y(A){const v=A.target;v.removeEventListener("dispose",y),D(v)}function C(A){const v=i.get(A);if(v.__webglInit===void 0)return;const G=A.source,X=p.get(G);if(X){const Z=X[v.__cacheKey];Z.usedTimes--,Z.usedTimes===0&&R(A),Object.keys(X).length===0&&p.delete(G)}i.remove(A)}function R(A){const v=i.get(A);t.deleteTexture(v.__webglTexture);const G=A.source,X=p.get(G);delete X[v.__cacheKey],r.memory.textures--}function D(A){const v=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(v.__webglFramebuffer[X]))for(let Z=0;Z<v.__webglFramebuffer[X].length;Z++)t.deleteFramebuffer(v.__webglFramebuffer[X][Z]);else t.deleteFramebuffer(v.__webglFramebuffer[X]);v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer[X])}else{if(Array.isArray(v.__webglFramebuffer))for(let X=0;X<v.__webglFramebuffer.length;X++)t.deleteFramebuffer(v.__webglFramebuffer[X]);else t.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&t.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&t.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let X=0;X<v.__webglColorRenderbuffer.length;X++)v.__webglColorRenderbuffer[X]&&t.deleteRenderbuffer(v.__webglColorRenderbuffer[X]);v.__webglDepthRenderbuffer&&t.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const G=A.textures;for(let X=0,Z=G.length;X<Z;X++){const ce=i.get(G[X]);ce.__webglTexture&&(t.deleteTexture(ce.__webglTexture),r.memory.textures--),i.remove(G[X])}i.remove(A)}let O=0;function H(){O=0}function L(){return O}function P(A){O=A}function I(){const A=O;return A>=a.maxTextures&&He("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+a.maxTextures),O+=1,A}function z(A){const v=[];return v.push(A.wrapS),v.push(A.wrapT),v.push(A.wrapR||0),v.push(A.magFilter),v.push(A.minFilter),v.push(A.anisotropy),v.push(A.internalFormat),v.push(A.format),v.push(A.type),v.push(A.generateMipmaps),v.push(A.premultiplyAlpha),v.push(A.flipY),v.push(A.unpackAlignment),v.push(A.colorSpace),v.join()}function U(A,v){const G=i.get(A);if(A.isVideoTexture&&B(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&G.__version!==A.version){const X=A.image;if(X===null)He("WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)He("WebGLRenderer: Texture marked for update but image is incomplete");else{Ce(G,A,v);return}}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+v)}function k(A,v){const G=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){Ce(G,A,v);return}else A.isExternalTexture&&(G.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+v)}function re(A,v){const G=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&G.__version!==A.version){Ce(G,A,v);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+v)}function le(A,v){const G=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&G.__version!==A.version){Ie(G,A,v);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+v)}const _e={[Jh]:t.REPEAT,[Ta]:t.CLAMP_TO_EDGE,[$h]:t.MIRRORED_REPEAT},ke={[Mn]:t.NEAREST,[gT]:t.NEAREST_MIPMAP_NEAREST,[pc]:t.NEAREST_MIPMAP_LINEAR,[wn]:t.LINEAR,[dd]:t.LINEAR_MIPMAP_NEAREST,[zs]:t.LINEAR_MIPMAP_LINEAR},Ze={[xT]:t.NEVER,[ET]:t.ALWAYS,[ST]:t.LESS,[Ym]:t.LEQUAL,[yT]:t.EQUAL,[Zm]:t.GEQUAL,[MT]:t.GREATER,[bT]:t.NOTEQUAL};function Fe(A,v){if(v.type===zi&&e.has("OES_texture_float_linear")===!1&&(v.magFilter===wn||v.magFilter===dd||v.magFilter===pc||v.magFilter===zs||v.minFilter===wn||v.minFilter===dd||v.minFilter===pc||v.minFilter===zs)&&He("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(A,t.TEXTURE_WRAP_S,_e[v.wrapS]),t.texParameteri(A,t.TEXTURE_WRAP_T,_e[v.wrapT]),(A===t.TEXTURE_3D||A===t.TEXTURE_2D_ARRAY)&&t.texParameteri(A,t.TEXTURE_WRAP_R,_e[v.wrapR]),t.texParameteri(A,t.TEXTURE_MAG_FILTER,ke[v.magFilter]),t.texParameteri(A,t.TEXTURE_MIN_FILTER,ke[v.minFilter]),v.compareFunction&&(t.texParameteri(A,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(A,t.TEXTURE_COMPARE_FUNC,Ze[v.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Mn||v.minFilter!==pc&&v.minFilter!==zs||v.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");t.texParameterf(A,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,a.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function ie(A,v){let G=!1;A.__webglInit===void 0&&(A.__webglInit=!0,v.addEventListener("dispose",T));const X=v.source;let Z=p.get(X);Z===void 0&&(Z={},p.set(X,Z));const ce=z(v);if(ce!==A.__cacheKey){Z[ce]===void 0&&(Z[ce]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,G=!0),Z[ce].usedTimes++;const he=Z[A.__cacheKey];he!==void 0&&(Z[A.__cacheKey].usedTimes--,he.usedTimes===0&&R(v)),A.__cacheKey=ce,A.__webglTexture=Z[ce].texture}return G}function ve(A,v,G){return Math.floor(Math.floor(A/G)/v)}function pe(A,v,G,X){const ce=A.updateRanges;if(ce.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,v.width,v.height,G,X,v.data);else{ce.sort((ue,de)=>ue.start-de.start);let he=0;for(let ue=1;ue<ce.length;ue++){const de=ce[he],me=ce[ue],Re=de.start+de.count,Le=ve(me.start,v.width,4),Ge=ve(de.start,v.width,4);me.start<=Re+1&&Le===Ge&&ve(me.start+me.count-1,v.width,4)===Le?de.count=Math.max(de.count,me.start+me.count-de.start):(++he,ce[he]=me)}ce.length=he+1;const Q=n.getParameter(t.UNPACK_ROW_LENGTH),W=n.getParameter(t.UNPACK_SKIP_PIXELS),ee=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,v.width);for(let ue=0,de=ce.length;ue<de;ue++){const me=ce[ue],Re=Math.floor(me.start/4),Le=Math.ceil(me.count/4),Ge=Re%v.width,F=Math.floor(Re/v.width),ge=Le,te=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(t.UNPACK_SKIP_ROWS,F),n.texSubImage2D(t.TEXTURE_2D,0,Ge,F,ge,te,G,X,v.data)}A.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,Q),n.pixelStorei(t.UNPACK_SKIP_PIXELS,W),n.pixelStorei(t.UNPACK_SKIP_ROWS,ee)}}function Ce(A,v,G){let X=t.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(X=t.TEXTURE_2D_ARRAY),v.isData3DTexture&&(X=t.TEXTURE_3D);const Z=ie(A,v),ce=v.source;n.bindTexture(X,A.__webglTexture,t.TEXTURE0+G);const he=i.get(ce);if(ce.version!==he.__version||Z===!0){if(n.activeTexture(t.TEXTURE0+G),(typeof ImageBitmap<"u"&&v.image instanceof ImageBitmap)===!1){const te=lt.getPrimaries(lt.workingColorSpace),$=v.colorSpace===Ja?null:lt.getPrimaries(v.colorSpace),ye=v.colorSpace===Ja||te===$?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ye)}n.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment);let W=_(v.image,!1,a.maxTextureSize);W=K(v,W);const ee=s.convert(v.format,v.colorSpace),ue=s.convert(v.type);let de=x(v.internalFormat,ee,ue,v.normalized,v.colorSpace,v.isVideoTexture);Fe(X,v);let me;const Re=v.mipmaps,Le=v.isVideoTexture!==!0,Ge=he.__version===void 0||Z===!0,F=ce.dataReady,ge=N(v,W);if(v.isDepthTexture)de=w(v.format===Is,v.type),Ge&&(Le?n.texStorage2D(t.TEXTURE_2D,1,de,W.width,W.height):n.texImage2D(t.TEXTURE_2D,0,de,W.width,W.height,0,ee,ue,null));else if(v.isDataTexture)if(Re.length>0){Le&&Ge&&n.texStorage2D(t.TEXTURE_2D,ge,de,Re[0].width,Re[0].height);for(let te=0,$=Re.length;te<$;te++)me=Re[te],Le?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,me.width,me.height,ee,ue,me.data):n.texImage2D(t.TEXTURE_2D,te,de,me.width,me.height,0,ee,ue,me.data);v.generateMipmaps=!1}else Le?(Ge&&n.texStorage2D(t.TEXTURE_2D,ge,de,W.width,W.height),F&&pe(v,W,ee,ue)):n.texImage2D(t.TEXTURE_2D,0,de,W.width,W.height,0,ee,ue,W.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Le&&Ge&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,de,Re[0].width,Re[0].height,W.depth);for(let te=0,$=Re.length;te<$;te++)if(me=Re[te],v.format!==Ii)if(ee!==null)if(Le){if(F)if(v.layerUpdates.size>0){const ye=Sv(me.width,me.height,v.format,v.type);for(const fe of v.layerUpdates){const Oe=me.data.subarray(fe*ye/me.data.BYTES_PER_ELEMENT,(fe+1)*ye/me.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,fe,me.width,me.height,1,ee,Oe)}v.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,me.width,me.height,W.depth,ee,me.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,te,de,me.width,me.height,W.depth,0,me.data,0,0);else He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,me.width,me.height,W.depth,ee,ue,me.data):n.texImage3D(t.TEXTURE_2D_ARRAY,te,de,me.width,me.height,W.depth,0,ee,ue,me.data)}else{Le&&Ge&&n.texStorage2D(t.TEXTURE_2D,ge,de,Re[0].width,Re[0].height);for(let te=0,$=Re.length;te<$;te++)me=Re[te],v.format!==Ii?ee!==null?Le?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,te,0,0,me.width,me.height,ee,me.data):n.compressedTexImage2D(t.TEXTURE_2D,te,de,me.width,me.height,0,me.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,me.width,me.height,ee,ue,me.data):n.texImage2D(t.TEXTURE_2D,te,de,me.width,me.height,0,ee,ue,me.data)}else if(v.isDataArrayTexture)if(Le){if(Ge&&n.texStorage3D(t.TEXTURE_2D_ARRAY,ge,de,W.width,W.height,W.depth),F)if(v.layerUpdates.size>0){const te=Sv(W.width,W.height,v.format,v.type);for(const $ of v.layerUpdates){const ye=W.data.subarray($*te/W.data.BYTES_PER_ELEMENT,($+1)*te/W.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,$,W.width,W.height,1,ee,ue,ye)}v.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,ee,ue,W.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,de,W.width,W.height,W.depth,0,ee,ue,W.data);else if(v.isData3DTexture)Le?(Ge&&n.texStorage3D(t.TEXTURE_3D,ge,de,W.width,W.height,W.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,ee,ue,W.data)):n.texImage3D(t.TEXTURE_3D,0,de,W.width,W.height,W.depth,0,ee,ue,W.data);else if(v.isFramebufferTexture){if(Ge)if(Le)n.texStorage2D(t.TEXTURE_2D,ge,de,W.width,W.height);else{let te=W.width,$=W.height;for(let ye=0;ye<ge;ye++)n.texImage2D(t.TEXTURE_2D,ye,de,te,$,0,ee,ue,null),te>>=1,$>>=1}}else if(v.isHTMLTexture){if("texElementImage2D"in t){const te=t.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),W.parentNode!==te){te.appendChild(W),h.add(v),te.onpaint=$=>{const ye=$.changedElements;for(const fe of h)ye.includes(fe.image)&&(fe.needsUpdate=!0)},te.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,W);else{const ye=t.RGBA,fe=t.RGBA,Oe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,ye,fe,Oe,W)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Re.length>0){if(Le&&Ge){const te=ae(Re[0]);n.texStorage2D(t.TEXTURE_2D,ge,de,te.width,te.height)}for(let te=0,$=Re.length;te<$;te++)me=Re[te],Le?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,ee,ue,me):n.texImage2D(t.TEXTURE_2D,te,de,ee,ue,me);v.generateMipmaps=!1}else if(Le){if(Ge){const te=ae(W);n.texStorage2D(t.TEXTURE_2D,ge,de,te.width,te.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ee,ue,W)}else n.texImage2D(t.TEXTURE_2D,0,de,ee,ue,W);d(v)&&S(X),he.__version=ce.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Ie(A,v,G){if(v.image.length!==6)return;const X=ie(A,v),Z=v.source;n.bindTexture(t.TEXTURE_CUBE_MAP,A.__webglTexture,t.TEXTURE0+G);const ce=i.get(Z);if(Z.version!==ce.__version||X===!0){n.activeTexture(t.TEXTURE0+G);const he=lt.getPrimaries(lt.workingColorSpace),Q=v.colorSpace===Ja?null:lt.getPrimaries(v.colorSpace),W=v.colorSpace===Ja||he===Q?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,v.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,v.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);const ee=v.isCompressedTexture||v.image[0].isCompressedTexture,ue=v.image[0]&&v.image[0].isDataTexture,de=[];for(let fe=0;fe<6;fe++)!ee&&!ue?de[fe]=_(v.image[fe],!0,a.maxCubemapSize):de[fe]=ue?v.image[fe].image:v.image[fe],de[fe]=K(v,de[fe]);const me=de[0],Re=s.convert(v.format,v.colorSpace),Le=s.convert(v.type),Ge=x(v.internalFormat,Re,Le,v.normalized,v.colorSpace),F=v.isVideoTexture!==!0,ge=ce.__version===void 0||X===!0,te=Z.dataReady;let $=N(v,me);Fe(t.TEXTURE_CUBE_MAP,v);let ye;if(ee){F&&ge&&n.texStorage2D(t.TEXTURE_CUBE_MAP,$,Ge,me.width,me.height);for(let fe=0;fe<6;fe++){ye=de[fe].mipmaps;for(let Oe=0;Oe<ye.length;Oe++){const Ne=ye[Oe];v.format!==Ii?Re!==null?F?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe,0,0,Ne.width,Ne.height,Re,Ne.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe,Ge,Ne.width,Ne.height,0,Ne.data):He("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe,0,0,Ne.width,Ne.height,Re,Le,Ne.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe,Ge,Ne.width,Ne.height,0,Re,Le,Ne.data)}}}else{if(ye=v.mipmaps,F&&ge){ye.length>0&&$++;const fe=ae(de[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,$,Ge,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ue){F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,de[fe].width,de[fe].height,Re,Le,de[fe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Ge,de[fe].width,de[fe].height,0,Re,Le,de[fe].data);for(let Oe=0;Oe<ye.length;Oe++){const dt=ye[Oe].image[fe].image;F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe+1,0,0,dt.width,dt.height,Re,Le,dt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe+1,Ge,dt.width,dt.height,0,Re,Le,dt.data)}}else{F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Re,Le,de[fe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,Ge,Re,Le,de[fe]);for(let Oe=0;Oe<ye.length;Oe++){const Ne=ye[Oe];F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe+1,0,0,Re,Le,Ne.image[fe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+fe,Oe+1,Ge,Re,Le,Ne.image[fe])}}}d(v)&&S(t.TEXTURE_CUBE_MAP),ce.__version=Z.version,v.onUpdate&&v.onUpdate(v)}A.__version=v.version}function Be(A,v,G,X,Z,ce){const he=s.convert(G.format,G.colorSpace),Q=s.convert(G.type),W=x(G.internalFormat,he,Q,G.normalized,G.colorSpace),ee=i.get(v),ue=i.get(G);if(ue.__renderTarget=v,!ee.__hasExternalTextures){const de=Math.max(1,v.width>>ce),me=Math.max(1,v.height>>ce);Z===t.TEXTURE_3D||Z===t.TEXTURE_2D_ARRAY?n.texImage3D(Z,ce,W,de,me,v.depth,0,he,Q,null):n.texImage2D(Z,ce,W,de,me,0,he,Q,null)}n.bindFramebuffer(t.FRAMEBUFFER,A),Se(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,X,Z,ue.__webglTexture,0,bt(v)):(Z===t.TEXTURE_2D||Z>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&Z<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,X,Z,ue.__webglTexture,ce),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Mt(A,v,G){if(t.bindRenderbuffer(t.RENDERBUFFER,A),v.depthBuffer){const X=v.depthTexture,Z=X&&X.isDepthTexture?X.type:null,ce=w(v.stencilBuffer,Z),he=v.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Se(v)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,bt(v),ce,v.width,v.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,bt(v),ce,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,ce,v.width,v.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,he,t.RENDERBUFFER,A)}else{const X=v.textures;for(let Z=0;Z<X.length;Z++){const ce=X[Z],he=s.convert(ce.format,ce.colorSpace),Q=s.convert(ce.type),W=x(ce.internalFormat,he,Q,ce.normalized,ce.colorSpace);Se(v)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,bt(v),W,v.width,v.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,bt(v),W,v.width,v.height):t.renderbufferStorage(t.RENDERBUFFER,W,v.width,v.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function je(A,v,G){const X=v.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,A),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const Z=i.get(v.depthTexture);if(Z.__renderTarget=v,(!Z.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),X){if(Z.__webglInit===void 0&&(Z.__webglInit=!0,v.depthTexture.addEventListener("dispose",T)),Z.__webglTexture===void 0){Z.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,Z.__webglTexture),Fe(t.TEXTURE_CUBE_MAP,v.depthTexture);const ee=s.convert(v.depthTexture.format),ue=s.convert(v.depthTexture.type);let de;v.depthTexture.format===Ia?de=t.DEPTH_COMPONENT24:v.depthTexture.format===Is&&(de=t.DEPTH24_STENCIL8);for(let me=0;me<6;me++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,de,v.width,v.height,0,ee,ue,null)}}else U(v.depthTexture,0);const ce=Z.__webglTexture,he=bt(v),Q=X?t.TEXTURE_CUBE_MAP_POSITIVE_X+G:t.TEXTURE_2D,W=v.depthTexture.format===Is?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(v.depthTexture.format===Ia)Se(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,W,Q,ce,0,he):t.framebufferTexture2D(t.FRAMEBUFFER,W,Q,ce,0);else if(v.depthTexture.format===Is)Se(v)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,W,Q,ce,0,he):t.framebufferTexture2D(t.FRAMEBUFFER,W,Q,ce,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ft(A){const v=i.get(A),G=A.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==A.depthTexture){const X=A.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),X){const Z=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,X.removeEventListener("dispose",Z)};X.addEventListener("dispose",Z),v.__depthDisposeCallback=Z}v.__boundDepthTexture=X}if(A.depthTexture&&!v.__autoAllocateDepthBuffer)if(G)for(let X=0;X<6;X++)je(v.__webglFramebuffer[X],A,X);else{const X=A.texture.mipmaps;X&&X.length>0?je(v.__webglFramebuffer[0],A,0):je(v.__webglFramebuffer,A,0)}else if(G){v.__webglDepthbuffer=[];for(let X=0;X<6;X++)if(n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[X]),v.__webglDepthbuffer[X]===void 0)v.__webglDepthbuffer[X]=t.createRenderbuffer(),Mt(v.__webglDepthbuffer[X],A,!1);else{const Z=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer[X];t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,Z,t.RENDERBUFFER,ce)}}else{const X=A.texture.mipmaps;if(X&&X.length>0?n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=t.createRenderbuffer(),Mt(v.__webglDepthbuffer,A,!1);else{const Z=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ce=v.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,ce),t.framebufferRenderbuffer(t.FRAMEBUFFER,Z,t.RENDERBUFFER,ce)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function nt(A,v,G){const X=i.get(A);v!==void 0&&Be(X.__webglFramebuffer,A,A.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&ft(A)}function et(A){const v=A.texture,G=i.get(A),X=i.get(v);A.addEventListener("dispose",y);const Z=A.textures,ce=A.isWebGLCubeRenderTarget===!0,he=Z.length>1;if(he||(X.__webglTexture===void 0&&(X.__webglTexture=t.createTexture()),X.__version=v.version,r.memory.textures++),ce){G.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer[Q]=[];for(let W=0;W<v.mipmaps.length;W++)G.__webglFramebuffer[Q][W]=t.createFramebuffer()}else G.__webglFramebuffer[Q]=t.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){G.__webglFramebuffer=[];for(let Q=0;Q<v.mipmaps.length;Q++)G.__webglFramebuffer[Q]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(he)for(let Q=0,W=Z.length;Q<W;Q++){const ee=i.get(Z[Q]);ee.__webglTexture===void 0&&(ee.__webglTexture=t.createTexture(),r.memory.textures++)}if(A.samples>0&&Se(A)===!1){G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let Q=0;Q<Z.length;Q++){const W=Z[Q];G.__webglColorRenderbuffer[Q]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[Q]);const ee=s.convert(W.format,W.colorSpace),ue=s.convert(W.type),de=x(W.internalFormat,ee,ue,W.normalized,W.colorSpace,A.isXRRenderTarget===!0),me=bt(A);t.renderbufferStorageMultisample(t.RENDERBUFFER,me,de,A.width,A.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Q,t.RENDERBUFFER,G.__webglColorRenderbuffer[Q])}t.bindRenderbuffer(t.RENDERBUFFER,null),A.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),Mt(G.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(ce){n.bindTexture(t.TEXTURE_CUBE_MAP,X.__webglTexture),Fe(t.TEXTURE_CUBE_MAP,v);for(let Q=0;Q<6;Q++)if(v.mipmaps&&v.mipmaps.length>0)for(let W=0;W<v.mipmaps.length;W++)Be(G.__webglFramebuffer[Q][W],A,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,W);else Be(G.__webglFramebuffer[Q],A,v,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);d(v)&&S(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(he){for(let Q=0,W=Z.length;Q<W;Q++){const ee=Z[Q],ue=i.get(ee);let de=t.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(de=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(de,ue.__webglTexture),Fe(de,ee),Be(G.__webglFramebuffer,A,ee,t.COLOR_ATTACHMENT0+Q,de,0),d(ee)&&S(de)}n.unbindTexture()}else{let Q=t.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(Q,X.__webglTexture),Fe(Q,v),v.mipmaps&&v.mipmaps.length>0)for(let W=0;W<v.mipmaps.length;W++)Be(G.__webglFramebuffer[W],A,v,t.COLOR_ATTACHMENT0,Q,W);else Be(G.__webglFramebuffer,A,v,t.COLOR_ATTACHMENT0,Q,0);d(v)&&S(Q),n.unbindTexture()}A.depthBuffer&&ft(A)}function Ot(A){const v=A.textures;for(let G=0,X=v.length;G<X;G++){const Z=v[G];if(d(Z)){const ce=M(A),he=i.get(Z).__webglTexture;n.bindTexture(ce,he),S(ce),n.unbindTexture()}}}const Ct=[],Xt=[];function _t(A){if(A.samples>0){if(Se(A)===!1){const v=A.textures,G=A.width,X=A.height;let Z=t.COLOR_BUFFER_BIT;const ce=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,he=i.get(A),Q=v.length>1;if(Q)for(let ee=0;ee<v.length;ee++)n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,he.__webglMultisampledFramebuffer);const W=A.texture.mipmaps;W&&W.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglFramebuffer);for(let ee=0;ee<v.length;ee++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(Z|=t.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(Z|=t.STENCIL_BUFFER_BIT)),Q){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,he.__webglColorRenderbuffer[ee]);const ue=i.get(v[ee]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ue,0)}t.blitFramebuffer(0,0,G,X,0,0,G,X,Z,t.NEAREST),l===!0&&(Ct.length=0,Xt.length=0,Ct.push(t.COLOR_ATTACHMENT0+ee),A.depthBuffer&&A.resolveDepthBuffer===!1&&(Ct.push(ce),Xt.push(ce),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Xt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,Ct))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),Q)for(let ee=0;ee<v.length;ee++){n.bindFramebuffer(t.FRAMEBUFFER,he.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.RENDERBUFFER,he.__webglColorRenderbuffer[ee]);const ue=i.get(v[ee]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,he.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.TEXTURE_2D,ue,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,he.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&l){const v=A.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[v])}}}function bt(A){return Math.min(a.maxSamples,A.samples)}function Se(A){const v=i.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function B(A){const v=r.render.frame;f.get(A)!==v&&(f.set(A,v),A.update())}function K(A,v){const G=A.colorSpace,X=A.format,Z=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||G!==Yu&&G!==Ja&&(lt.getTransfer(G)===At?(X!==Ii||Z!==bi)&&He("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ht("WebGLTextures: Unsupported texture color space:",G)),v}function ae(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=I,this.resetTextureUnits=H,this.getTextureUnits=L,this.setTextureUnits=P,this.setTexture2D=U,this.setTexture2DArray=k,this.setTexture3D=re,this.setTextureCube=le,this.rebindTextures=nt,this.setupRenderTarget=et,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=_t,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=Be,this.useMultisampledRTT=Se,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function KC(t,e){function n(i,a=Ja){let s;const r=lt.getTransfer(a);if(i===bi)return t.UNSIGNED_BYTE;if(i===Vm)return t.UNSIGNED_SHORT_4_4_4_4;if(i===km)return t.UNSIGNED_SHORT_5_5_5_1;if(i===hy)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===py)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===fy)return t.BYTE;if(i===dy)return t.SHORT;if(i===Ll)return t.UNSIGNED_SHORT;if(i===Gm)return t.INT;if(i===ea)return t.UNSIGNED_INT;if(i===zi)return t.FLOAT;if(i===za)return t.HALF_FLOAT;if(i===my)return t.ALPHA;if(i===gy)return t.RGB;if(i===Ii)return t.RGBA;if(i===Ia)return t.DEPTH_COMPONENT;if(i===Is)return t.DEPTH_STENCIL;if(i===Xm)return t.RED;if(i===Wm)return t.RED_INTEGER;if(i===Ks)return t.RG;if(i===jm)return t.RG_INTEGER;if(i===qm)return t.RGBA_INTEGER;if(i===lu||i===cu||i===uu||i===fu)if(r===At)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===lu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===lu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ep||i===tp||i===np||i===ip)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ep)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===tp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===np)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ip)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ap||i===sp||i===rp||i===op||i===lp||i===ju||i===cp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ap||i===sp)return r===At?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===rp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===op)return s.COMPRESSED_R11_EAC;if(i===lp)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ju)return s.COMPRESSED_RG11_EAC;if(i===cp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===up||i===fp||i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===Sp||i===yp||i===Mp||i===bp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===up)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===mp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_p)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bp)return r===At?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ep||i===Tp||i===Ap)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ep)return r===At?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Tp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ap)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wp||i===Rp||i===qu||i===Cp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===wp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Cp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ol?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const QC=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JC=`
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

}`;class $C{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Cy(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new bn({vertexShader:QC,fragmentShader:JC,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ci(new Mf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class e3 extends ar{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,f=null,h=null,u=null,p=null,g=null;const b=typeof XRWebGLBinding<"u",_=new $C,d={},S=n.getContextAttributes();let M=null,x=null;const w=[],N=[],T=new vt;let y=null;const C=new xi;C.viewport=new Zt;const R=new xi;R.viewport=new Zt;const D=[C,R],O=new uA;let H=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let ve=w[ie];return ve===void 0&&(ve=new xd,w[ie]=ve),ve.getTargetRaySpace()},this.getControllerGrip=function(ie){let ve=w[ie];return ve===void 0&&(ve=new xd,w[ie]=ve),ve.getGripSpace()},this.getHand=function(ie){let ve=w[ie];return ve===void 0&&(ve=new xd,w[ie]=ve),ve.getHandSpace()};function P(ie){const ve=N.indexOf(ie.inputSource);if(ve===-1)return;const pe=w[ve];pe!==void 0&&(pe.update(ie.inputSource,ie.frame,c||r),pe.dispatchEvent({type:ie.type,data:ie.inputSource}))}function I(){a.removeEventListener("select",P),a.removeEventListener("selectstart",P),a.removeEventListener("selectend",P),a.removeEventListener("squeeze",P),a.removeEventListener("squeezestart",P),a.removeEventListener("squeezeend",P),a.removeEventListener("end",I),a.removeEventListener("inputsourceschange",z);for(let ie=0;ie<w.length;ie++){const ve=N[ie];ve!==null&&(N[ie]=null,w[ie].disconnect(ve))}H=null,L=null,_.reset();for(const ie in d)delete d[ie];e.setRenderTarget(M),p=null,u=null,h=null,a=null,x=null,Fe.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ie){s=ie,i.isPresenting===!0&&He("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){o=ie,i.isPresenting===!0&&He("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&b&&(h=new XRWebGLBinding(a,n)),h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(ie){if(a=ie,a!==null){if(M=e.getRenderTarget(),a.addEventListener("select",P),a.addEventListener("selectstart",P),a.addEventListener("selectend",P),a.addEventListener("squeeze",P),a.addEventListener("squeezestart",P),a.addEventListener("squeezeend",P),a.addEventListener("end",I),a.addEventListener("inputsourceschange",z),S.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(T),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let pe=null,Ce=null,Ie=null;S.depth&&(Ie=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,pe=S.stencil?Is:Ia,Ce=S.stencil?Ol:ea);const Be={colorFormat:n.RGBA8,depthFormat:Ie,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Be),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),x=new $i(u.textureWidth,u.textureHeight,{format:Ii,type:bi,depthTexture:new po(u.textureWidth,u.textureHeight,Ce,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const pe={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,pe),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new $i(p.framebufferWidth,p.framebufferHeight,{format:Ii,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),Fe.setContext(a),Fe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function z(ie){for(let ve=0;ve<ie.removed.length;ve++){const pe=ie.removed[ve],Ce=N.indexOf(pe);Ce>=0&&(N[Ce]=null,w[Ce].disconnect(pe))}for(let ve=0;ve<ie.added.length;ve++){const pe=ie.added[ve];let Ce=N.indexOf(pe);if(Ce===-1){for(let Be=0;Be<w.length;Be++)if(Be>=N.length){N.push(pe),Ce=Be;break}else if(N[Be]===null){N[Be]=pe,Ce=Be;break}if(Ce===-1)break}const Ie=w[Ce];Ie&&Ie.connect(pe)}}const U=new j,k=new j;function re(ie,ve,pe){U.setFromMatrixPosition(ve.matrixWorld),k.setFromMatrixPosition(pe.matrixWorld);const Ce=U.distanceTo(k),Ie=ve.projectionMatrix.elements,Be=pe.projectionMatrix.elements,Mt=Ie[14]/(Ie[10]-1),je=Ie[14]/(Ie[10]+1),ft=(Ie[9]+1)/Ie[5],nt=(Ie[9]-1)/Ie[5],et=(Ie[8]-1)/Ie[0],Ot=(Be[8]+1)/Be[0],Ct=Mt*et,Xt=Mt*Ot,_t=Ce/(-et+Ot),bt=_t*-et;if(ve.matrixWorld.decompose(ie.position,ie.quaternion,ie.scale),ie.translateX(bt),ie.translateZ(_t),ie.matrixWorld.compose(ie.position,ie.quaternion,ie.scale),ie.matrixWorldInverse.copy(ie.matrixWorld).invert(),Ie[10]===-1)ie.projectionMatrix.copy(ve.projectionMatrix),ie.projectionMatrixInverse.copy(ve.projectionMatrixInverse);else{const Se=Mt+_t,B=je+_t,K=Ct-bt,ae=Xt+(Ce-bt),A=ft*je/B*Se,v=nt*je/B*Se;ie.projectionMatrix.makePerspective(K,ae,A,v,Se,B),ie.projectionMatrixInverse.copy(ie.projectionMatrix).invert()}}function le(ie,ve){ve===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(ve.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(a===null)return;let ve=ie.near,pe=ie.far;_.texture!==null&&(_.depthNear>0&&(ve=_.depthNear),_.depthFar>0&&(pe=_.depthFar)),O.near=R.near=C.near=ve,O.far=R.far=C.far=pe,(H!==O.near||L!==O.far)&&(a.updateRenderState({depthNear:O.near,depthFar:O.far}),H=O.near,L=O.far),O.layers.mask=ie.layers.mask|6,C.layers.mask=O.layers.mask&-5,R.layers.mask=O.layers.mask&-3;const Ce=ie.parent,Ie=O.cameras;le(O,Ce);for(let Be=0;Be<Ie.length;Be++)le(Ie[Be],Ce);Ie.length===2?re(O,C,R):O.projectionMatrix.copy(C.projectionMatrix),_e(ie,O,Ce)};function _e(ie,ve,pe){pe===null?ie.matrix.copy(ve.matrixWorld):(ie.matrix.copy(pe.matrixWorld),ie.matrix.invert(),ie.matrix.multiply(ve.matrixWorld)),ie.matrix.decompose(ie.position,ie.quaternion,ie.scale),ie.updateMatrixWorld(!0),ie.projectionMatrix.copy(ve.projectionMatrix),ie.projectionMatrixInverse.copy(ve.projectionMatrixInverse),ie.isPerspectiveCamera&&(ie.fov=Np*2*Math.atan(1/ie.projectionMatrix.elements[5]),ie.zoom=1)}this.getCamera=function(){return O},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(ie){l=ie,u!==null&&(u.fixedFoveation=ie),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ie)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(O)},this.getCameraTexture=function(ie){return d[ie]};let ke=null;function Ze(ie,ve){if(f=ve.getViewerPose(c||r),g=ve,f!==null){const pe=f.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Ce=!1;pe.length!==O.cameras.length&&(O.cameras.length=0,Ce=!0);for(let je=0;je<pe.length;je++){const ft=pe[je];let nt=null;if(p!==null)nt=p.getViewport(ft);else{const Ot=h.getViewSubImage(u,ft);nt=Ot.viewport,je===0&&(e.setRenderTargetTextures(x,Ot.colorTexture,Ot.depthStencilTexture),e.setRenderTarget(x))}let et=D[je];et===void 0&&(et=new xi,et.layers.enable(je),et.viewport=new Zt,D[je]=et),et.matrix.fromArray(ft.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(ft.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(nt.x,nt.y,nt.width,nt.height),je===0&&(O.matrix.copy(et.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),Ce===!0&&O.cameras.push(et)}const Ie=a.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){h=i.getBinding();const je=h.getDepthInformation(pe[0]);je&&je.isValid&&je.texture&&_.init(je,a.renderState)}if(Ie&&Ie.includes("camera-access")&&b){e.state.unbindTexture(),h=i.getBinding();for(let je=0;je<pe.length;je++){const ft=pe[je].camera;if(ft){let nt=d[ft];nt||(nt=new Cy,d[ft]=nt);const et=h.getCameraImage(ft);nt.sourceTexture=et}}}}for(let pe=0;pe<w.length;pe++){const Ce=N[pe],Ie=w[pe];Ce!==null&&Ie!==void 0&&Ie.update(Ce,ve,c||r)}ke&&ke(ie,ve),ve.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ve}),g=null}const Fe=new Uy;Fe.setAnimationLoop(Ze),this.setAnimationLoop=function(ie){ke=ie},this.dispose=function(){}}}const t3=new It,Fy=new We;Fy.set(-1,0,0,0,1,0,0,0,1);function n3(t,e){function n(_,d){_.matrixAutoUpdate===!0&&_.updateMatrix(),d.value.copy(_.matrix)}function i(_,d){d.color.getRGB(_.fogColor.value,Ny(t)),d.isFog?(_.fogNear.value=d.near,_.fogFar.value=d.far):d.isFogExp2&&(_.fogDensity.value=d.density)}function a(_,d,S,M,x){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(_,d):d.isMeshLambertMaterial?(s(_,d),d.envMap&&(_.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(_,d),h(_,d)):d.isMeshPhongMaterial?(s(_,d),f(_,d),d.envMap&&(_.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(_,d),u(_,d),d.isMeshPhysicalMaterial&&p(_,d,x)):d.isMeshMatcapMaterial?(s(_,d),g(_,d)):d.isMeshDepthMaterial?s(_,d):d.isMeshDistanceMaterial?(s(_,d),b(_,d)):d.isMeshNormalMaterial?s(_,d):d.isLineBasicMaterial?(r(_,d),d.isLineDashedMaterial&&o(_,d)):d.isPointsMaterial?l(_,d,S,M):d.isSpriteMaterial?c(_,d):d.isShadowMaterial?(_.color.value.copy(d.color),_.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(_,d){_.opacity.value=d.opacity,d.color&&_.diffuse.value.copy(d.color),d.emissive&&_.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(_.map.value=d.map,n(d.map,_.mapTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,n(d.alphaMap,_.alphaMapTransform)),d.bumpMap&&(_.bumpMap.value=d.bumpMap,n(d.bumpMap,_.bumpMapTransform),_.bumpScale.value=d.bumpScale,d.side===Yn&&(_.bumpScale.value*=-1)),d.normalMap&&(_.normalMap.value=d.normalMap,n(d.normalMap,_.normalMapTransform),_.normalScale.value.copy(d.normalScale),d.side===Yn&&_.normalScale.value.negate()),d.displacementMap&&(_.displacementMap.value=d.displacementMap,n(d.displacementMap,_.displacementMapTransform),_.displacementScale.value=d.displacementScale,_.displacementBias.value=d.displacementBias),d.emissiveMap&&(_.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,_.emissiveMapTransform)),d.specularMap&&(_.specularMap.value=d.specularMap,n(d.specularMap,_.specularMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest);const S=e.get(d),M=S.envMap,x=S.envMapRotation;M&&(_.envMap.value=M,_.envMapRotation.value.setFromMatrix4(t3.makeRotationFromEuler(x)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&_.envMapRotation.value.premultiply(Fy),_.reflectivity.value=d.reflectivity,_.ior.value=d.ior,_.refractionRatio.value=d.refractionRatio),d.lightMap&&(_.lightMap.value=d.lightMap,_.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,_.lightMapTransform)),d.aoMap&&(_.aoMap.value=d.aoMap,_.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,_.aoMapTransform))}function r(_,d){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,d.map&&(_.map.value=d.map,n(d.map,_.mapTransform))}function o(_,d){_.dashSize.value=d.dashSize,_.totalSize.value=d.dashSize+d.gapSize,_.scale.value=d.scale}function l(_,d,S,M){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,_.size.value=d.size*S,_.scale.value=M*.5,d.map&&(_.map.value=d.map,n(d.map,_.uvTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,n(d.alphaMap,_.alphaMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest)}function c(_,d){_.diffuse.value.copy(d.color),_.opacity.value=d.opacity,_.rotation.value=d.rotation,d.map&&(_.map.value=d.map,n(d.map,_.mapTransform)),d.alphaMap&&(_.alphaMap.value=d.alphaMap,n(d.alphaMap,_.alphaMapTransform)),d.alphaTest>0&&(_.alphaTest.value=d.alphaTest)}function f(_,d){_.specular.value.copy(d.specular),_.shininess.value=Math.max(d.shininess,1e-4)}function h(_,d){d.gradientMap&&(_.gradientMap.value=d.gradientMap)}function u(_,d){_.metalness.value=d.metalness,d.metalnessMap&&(_.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,_.metalnessMapTransform)),_.roughness.value=d.roughness,d.roughnessMap&&(_.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,_.roughnessMapTransform)),d.envMap&&(_.envMapIntensity.value=d.envMapIntensity)}function p(_,d,S){_.ior.value=d.ior,d.sheen>0&&(_.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),_.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(_.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,_.sheenColorMapTransform)),d.sheenRoughnessMap&&(_.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,_.sheenRoughnessMapTransform))),d.clearcoat>0&&(_.clearcoat.value=d.clearcoat,_.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(_.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,_.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(_.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,_.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(_.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,_.clearcoatNormalMapTransform),_.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Yn&&_.clearcoatNormalScale.value.negate())),d.dispersion>0&&(_.dispersion.value=d.dispersion),d.iridescence>0&&(_.iridescence.value=d.iridescence,_.iridescenceIOR.value=d.iridescenceIOR,_.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],_.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(_.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,_.iridescenceMapTransform)),d.iridescenceThicknessMap&&(_.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,_.iridescenceThicknessMapTransform))),d.transmission>0&&(_.transmission.value=d.transmission,_.transmissionSamplerMap.value=S.texture,_.transmissionSamplerSize.value.set(S.width,S.height),d.transmissionMap&&(_.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,_.transmissionMapTransform)),_.thickness.value=d.thickness,d.thicknessMap&&(_.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,_.thicknessMapTransform)),_.attenuationDistance.value=d.attenuationDistance,_.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(_.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(_.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,_.anisotropyMapTransform))),_.specularIntensity.value=d.specularIntensity,_.specularColor.value.copy(d.specularColor),d.specularColorMap&&(_.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,_.specularColorMapTransform)),d.specularIntensityMap&&(_.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,_.specularIntensityMapTransform))}function g(_,d){d.matcap&&(_.matcap.value=d.matcap)}function b(_,d){const S=e.get(d).light;_.referencePosition.value.setFromMatrixPosition(S.matrixWorld),_.nearDistance.value=S.shadow.camera.near,_.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function i3(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,w){const N=w.program;i.uniformBlockBinding(x,N)}function c(x,w){let N=a[x.id];N===void 0&&(_(x),N=f(x),a[x.id]=N,x.addEventListener("dispose",S));const T=w.program;i.updateUBOMapping(x,T);const y=e.render.frame;s[x.id]!==y&&(u(x),s[x.id]=y)}function f(x){const w=h();x.__bindingPointIndex=w;const N=t.createBuffer(),T=x.__size,y=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,N),t.bufferData(t.UNIFORM_BUFFER,T,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,N),N}function h(){for(let x=0;x<o;x++)if(r.indexOf(x)===-1)return r.push(x),x;return ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const w=a[x.id],N=x.uniforms,T=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let y=0,C=N.length;y<C;y++){const R=N[y];if(Array.isArray(R))for(let D=0,O=R.length;D<O;D++)p(R[D],y,D,T);else p(R,y,0,T)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(x,w,N,T){if(b(x,w,N,T)===!0){const y=x.__offset,C=x.value;if(Array.isArray(C)){let R=0;for(let D=0;D<C.length;D++){const O=C[D],H=d(O);g(O,x.__data,R),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(R+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(C,x.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,y,x.__data)}}function g(x,w,N){typeof x=="number"||typeof x=="boolean"?w[0]=x:x.isMatrix3?(w[0]=x.elements[0],w[1]=x.elements[1],w[2]=x.elements[2],w[3]=0,w[4]=x.elements[3],w[5]=x.elements[4],w[6]=x.elements[5],w[7]=0,w[8]=x.elements[6],w[9]=x.elements[7],w[10]=x.elements[8],w[11]=0):ArrayBuffer.isView(x)?w.set(new x.constructor(x.buffer,x.byteOffset,w.length)):x.toArray(w,N)}function b(x,w,N,T){const y=x.value,C=w+"_"+N;if(T[C]===void 0)return typeof y=="number"||typeof y=="boolean"?T[C]=y:ArrayBuffer.isView(y)?T[C]=y.slice():T[C]=y.clone(),!0;{const R=T[C];if(typeof y=="number"||typeof y=="boolean"){if(R!==y)return T[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(R.equals(y)===!1)return R.copy(y),!0}}return!1}function _(x){const w=x.uniforms;let N=0;const T=16;for(let C=0,R=w.length;C<R;C++){const D=Array.isArray(w[C])?w[C]:[w[C]];for(let O=0,H=D.length;O<H;O++){const L=D[O],P=Array.isArray(L.value)?L.value:[L.value];for(let I=0,z=P.length;I<z;I++){const U=P[I],k=d(U),re=N%T,le=re%k.boundary,_e=re+le;N+=le,_e!==0&&T-_e<k.storage&&(N+=T-_e),L.__data=new Float32Array(k.storage/Float32Array.BYTES_PER_ELEMENT),L.__offset=N,N+=k.storage}}}const y=N%T;return y>0&&(N+=T-y),x.__size=N,x.__cache={},this}function d(x){const w={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(w.boundary=4,w.storage=4):x.isVector2?(w.boundary=8,w.storage=8):x.isVector3||x.isColor?(w.boundary=16,w.storage=12):x.isVector4?(w.boundary=16,w.storage=16):x.isMatrix3?(w.boundary=48,w.storage=48):x.isMatrix4?(w.boundary=64,w.storage=64):x.isTexture?He("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(w.boundary=16,w.storage=x.byteLength):He("WebGLRenderer: Unsupported uniform value type.",x),w}function S(x){const w=x.target;w.removeEventListener("dispose",S);const N=r.indexOf(w.__bindingPointIndex);r.splice(N,1),t.deleteBuffer(a[w.id]),delete a[w.id],delete s[w.id]}function M(){for(const x in a)t.deleteBuffer(a[x]);r=[],a={},s={}}return{bind:l,update:c,dispose:M}}const a3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xi=null;function s3(){return Xi===null&&(Xi=new Ty(a3,16,16,Ks,za),Xi.name="DFG_LUT",Xi.minFilter=wn,Xi.magFilter=wn,Xi.wrapS=Ta,Xi.wrapT=Ta,Xi.generateMipmaps=!1,Xi.needsUpdate=!0),Xi}class Hy{constructor(e={}){const{canvas:n=AT(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=bi}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const b=p,_=new Set([qm,jm,Wm]),d=new Set([bi,ea,Ll,Ol,Vm,km]),S=new Uint32Array(4),M=new Int32Array(4),x=new j;let w=null,N=null;const T=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let D=!1,O=null,H=null,L=null,P=null;this._outputColorSpace=mi;let I=0,z=0,U=null,k=-1,re=null;const le=new Zt,_e=new Zt;let ke=null;const Ze=new rt(0);let Fe=0,ie=n.width,ve=n.height,pe=1,Ce=null,Ie=null;const Be=new Zt(0,0,ie,ve),Mt=new Zt(0,0,ie,ve);let je=!1;const ft=new Ay;let nt=!1,et=!1;const Ot=new It,Ct=new j,Xt=new Zt,_t={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let bt=!1;function Se(){return U===null?pe:1}let B=i;function K(E,V){return n.getContext(E,V)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Hm}`),n.addEventListener("webglcontextlost",dt,!1),n.addEventListener("webglcontextrestored",Nt,!1),n.addEventListener("webglcontextcreationerror",Cn,!1),B===null){const V="webgl2";if(B=K(V,E),B===null)throw K(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw ht("WebGLRenderer: "+E.message),E}let ae,A,v,G,X,Z,ce,he,Q,W,ee,ue,de,me,Re,Le,Ge,F,ge,te,$,ye,fe;function Oe(){ae=new sR(B),ae.init(),$=new KC(B,ae),A=new Qw(B,ae,e,$),v=new YC(B,ae),A.reversedDepthBuffer&&u&&v.buffers.depth.setReversed(!0),H=B.createFramebuffer(),L=B.createFramebuffer(),P=B.createFramebuffer(),G=new lR(B),X=new OC,Z=new ZC(B,ae,v,X,A,$,G),ce=new aR(R),he=new dA(B),ye=new Zw(B,he),Q=new rR(B,he,G,ye),W=new uR(B,Q,he,ye,G),F=new cR(B,A,Z),Re=new Jw(X),ee=new LC(R,ce,ae,A,ye,Re),ue=new n3(R,X),de=new zC,me=new VC(ae),Ge=new Yw(R,ce,v,W,g,l),Le=new qC(R,W,A),fe=new i3(B,G,A,v),ge=new Kw(B,ae,G),te=new oR(B,ae,G),G.programs=ee.programs,R.capabilities=A,R.extensions=ae,R.properties=X,R.renderLists=de,R.shadowMap=Le,R.state=v,R.info=G}Oe(),b!==bi&&(C=new dR(b,n.width,n.height,o,a,s));const Ne=new e3(R,B);this.xr=Ne,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const E=ae.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ae.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return pe},this.setPixelRatio=function(E){E!==void 0&&(pe=E,this.setSize(ie,ve,!1))},this.getSize=function(E){return E.set(ie,ve)},this.setSize=function(E,V,J=!0){if(Ne.isPresenting){He("WebGLRenderer: Can't change size while VR device is presenting.");return}ie=E,ve=V,n.width=Math.floor(E*pe),n.height=Math.floor(V*pe),J===!0&&(n.style.width=E+"px",n.style.height=V+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,E,V)},this.getDrawingBufferSize=function(E){return E.set(ie*pe,ve*pe).floor()},this.setDrawingBufferSize=function(E,V,J){ie=E,ve=V,pe=J,n.width=Math.floor(E*J),n.height=Math.floor(V*J),this.setViewport(0,0,E,V)},this.setEffects=function(E){if(b===bi){ht("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let V=0;V<E.length;V++)if(E[V].isOutputPass===!0){He("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(le)},this.getViewport=function(E){return E.copy(Be)},this.setViewport=function(E,V,J,q){E.isVector4?Be.set(E.x,E.y,E.z,E.w):Be.set(E,V,J,q),v.viewport(le.copy(Be).multiplyScalar(pe).round())},this.getScissor=function(E){return E.copy(Mt)},this.setScissor=function(E,V,J,q){E.isVector4?Mt.set(E.x,E.y,E.z,E.w):Mt.set(E,V,J,q),v.scissor(_e.copy(Mt).multiplyScalar(pe).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(E){v.setScissorTest(je=E)},this.setOpaqueSort=function(E){Ce=E},this.setTransparentSort=function(E){Ie=E},this.getClearColor=function(E){return E.copy(Ge.getClearColor())},this.setClearColor=function(){Ge.setClearColor(...arguments)},this.getClearAlpha=function(){return Ge.getClearAlpha()},this.setClearAlpha=function(){Ge.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,J=!0){let q=0;if(E){let Y=!1;if(U!==null){const Me=U.texture.format;Y=_.has(Me)}if(Y){const Me=U.texture.type,Ee=d.has(Me),xe=Ge.getClearColor(),De=Ge.getClearAlpha(),Pe=xe.r,Xe=xe.g,Ke=xe.b;Ee?(S[0]=Pe,S[1]=Xe,S[2]=Ke,S[3]=De,B.clearBufferuiv(B.COLOR,0,S)):(M[0]=Pe,M[1]=Xe,M[2]=Ke,M[3]=De,B.clearBufferiv(B.COLOR,0,M))}else q|=B.COLOR_BUFFER_BIT}V&&(q|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(q|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&B.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),O=E},this.dispose=function(){n.removeEventListener("webglcontextlost",dt,!1),n.removeEventListener("webglcontextrestored",Nt,!1),n.removeEventListener("webglcontextcreationerror",Cn,!1),Ge.dispose(),de.dispose(),me.dispose(),X.dispose(),ce.dispose(),W.dispose(),ye.dispose(),fe.dispose(),ee.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",Fi),Ne.removeEventListener("sessionend",aa),ci.stop()};function dt(E){E.preventDefault(),j0("WebGLRenderer: Context Lost."),D=!0}function Nt(){j0("WebGLRenderer: Context Restored."),D=!1;const E=G.autoReset,V=Le.enabled,J=Le.autoUpdate,q=Le.needsUpdate,Y=Le.type;Oe(),G.autoReset=E,Le.enabled=V,Le.autoUpdate=J,Le.needsUpdate=q,Le.type=Y}function Cn(E){ht("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Nn(E){const V=E.target;V.removeEventListener("dispose",Nn),Af(V)}function Af(E){ia(E),X.remove(E)}function ia(E){const V=X.get(E).programs;V!==void 0&&(V.forEach(function(J){ee.releaseProgram(J)}),E.isShaderMaterial&&ee.releaseShaderCache(E))}this.renderBufferDirect=function(E,V,J,q,Y,Me){V===null&&(V=_t);const Ee=Y.isMesh&&Y.matrixWorld.determinantAffine()<0,xe=Do(E,V,J,q,Y);v.setMaterial(q,Ee);let De=J.index,Pe=1;if(q.wireframe===!0){if(De=Q.getWireframeAttribute(J),De===void 0)return;Pe=2}const Xe=J.drawRange,Ke=J.attributes.position;let Ue=Xe.start*Pe,pt=(Xe.start+Xe.count)*Pe;Me!==null&&(Ue=Math.max(Ue,Me.start*Pe),pt=Math.min(pt,(Me.start+Me.count)*Pe)),De!==null?(Ue=Math.max(Ue,0),pt=Math.min(pt,De.count)):Ke!=null&&(Ue=Math.max(Ue,0),pt=Math.min(pt,Ke.count));const Ft=pt-Ue;if(Ft<0||Ft===1/0)return;ye.setup(Y,q,xe,J,De);let Et,xt=ge;if(De!==null&&(Et=he.get(De),xt=te,xt.setIndex(Et)),Y.isMesh)q.wireframe===!0?(v.setLineWidth(q.wireframeLinewidth*Se()),xt.setMode(B.LINES)):xt.setMode(B.TRIANGLES);else if(Y.isLine){let fn=q.linewidth;fn===void 0&&(fn=1),v.setLineWidth(fn*Se()),Y.isLineSegments?xt.setMode(B.LINES):Y.isLineLoop?xt.setMode(B.LINE_LOOP):xt.setMode(B.LINE_STRIP)}else Y.isPoints?xt.setMode(B.POINTS):Y.isSprite&&xt.setMode(B.TRIANGLES);if(Y.isBatchedMesh)if(ae.get("WEBGL_multi_draw"))xt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{const fn=Y._multiDrawStarts,Te=Y._multiDrawCounts,Un=Y._multiDrawCount,it=De?he.get(De).bytesPerElement:1,Qt=X.get(q).currentProgram.getUniforms();for(let Hn=0;Hn<Un;Hn++)Qt.setValue(B,"_gl_DrawID",Hn),xt.render(fn[Hn]/it,Te[Hn])}else if(Y.isInstancedMesh)xt.renderInstances(Ue,Ft,Y.count);else if(J.isInstancedBufferGeometry){const fn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Te=Math.min(J.instanceCount,fn);xt.renderInstances(Ue,Ft,Te)}else xt.render(Ue,Ft)};function Kt(E,V,J){E.transparent===!0&&E.side===ya&&E.forceSinglePass===!1?(E.side=Yn,E.needsUpdate=!0,ui(E,V,J),E.side=xs,E.needsUpdate=!0,ui(E,V,J),E.side=ya):ui(E,V,J)}this.compile=function(E,V,J=null){J===null&&(J=E),N=me.get(J),N.init(V),y.push(N),J.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(N.pushLight(Y),Y.castShadow&&N.pushShadow(Y))}),E!==J&&E.traverseVisible(function(Y){Y.isLight&&Y.layers.test(V.layers)&&(N.pushLight(Y),Y.castShadow&&N.pushShadow(Y))}),N.setupLights();const q=new Set;return E.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;const Me=Y.material;if(Me)if(Array.isArray(Me))for(let Ee=0;Ee<Me.length;Ee++){const xe=Me[Ee];Kt(xe,J,Y),q.add(xe)}else Kt(Me,J,Y),q.add(Me)}),N=y.pop(),q},this.compileAsync=function(E,V,J=null){const q=this.compile(E,V,J);return new Promise(Y=>{function Me(){if(q.forEach(function(Ee){X.get(Ee).currentProgram.isReady()&&q.delete(Ee)}),q.size===0){Y(E);return}setTimeout(Me,10)}ae.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Bt=null;function Dn(E){Bt&&Bt(E)}function Fi(){ci.stop()}function aa(){ci.start()}const ci=new Uy;ci.setAnimationLoop(Dn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(E){Bt=E,Ne.setAnimationLoop(E),E===null?ci.stop():ci.start()},Ne.addEventListener("sessionstart",Fi),Ne.addEventListener("sessionend",aa),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0){ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(E,V);const J=Ne.enabled===!0&&Ne.isPresenting===!0,q=C!==null&&(U===null||J)&&C.begin(R,U);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(V),V=Ne.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,V,U),N=me.get(E,y.length),N.init(V),N.state.textureUnits=Z.getTextureUnits(),y.push(N),Ot.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),ft.setFromProjectionMatrix(Ot,Ki,V.reversedDepth),et=this.localClippingEnabled,nt=Re.init(this.clippingPlanes,et),w=de.get(E,T.length),w.init(),T.push(w),Ne.enabled===!0&&Ne.isPresenting===!0){const Ee=R.xr.getDepthSensingMesh();Ee!==null&&sa(Ee,V,-1/0,R.sortObjects)}sa(E,V,0,R.sortObjects),w.finish(),R.sortObjects===!0&&w.sort(Ce,Ie,V.reversedDepth),bt=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,bt&&Ge.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),nt===!0&&Re.beginShadows();const Y=N.state.shadowsArray;if(Le.render(Y,E,V),nt===!0&&Re.endShadows(),(q&&C.hasRenderPass())===!1){const Ee=w.opaque,xe=w.transmissive;if(N.setupLights(),V.isArrayCamera){const De=V.cameras;if(xe.length>0)for(let Pe=0,Xe=De.length;Pe<Xe;Pe++){const Ke=De[Pe];ra(Ee,xe,E,Ke)}bt&&Ge.render(E);for(let Pe=0,Xe=De.length;Pe<Xe;Pe++){const Ke=De[Pe];Ms(w,E,Ke,Ke.viewport)}}else xe.length>0&&ra(Ee,xe,E,V),bt&&Ge.render(E),Ms(w,E,V)}U!==null&&z===0&&(Z.updateMultisampleRenderTarget(U),Z.updateRenderTargetMipmap(U)),q&&C.end(R),E.isScene===!0&&E.onAfterRender(R,E,V),ye.resetDefaultState(),k=-1,re=null,y.pop(),y.length>0?(N=y[y.length-1],Z.setTextureUnits(N.state.textureUnits),nt===!0&&Re.setGlobalState(R.clippingPlanes,N.state.camera)):N=null,T.pop(),T.length>0?w=T[T.length-1]:w=null,O!==null&&O.renderEnd()};function sa(E,V,J,q){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLightProbeGrid)N.pushLightProbeGrid(E);else if(E.isLight)N.pushLight(E),E.castShadow&&N.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||ft.intersectsSprite(E)){q&&Xt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ot);const Ee=W.update(E),xe=E.material;xe.visible&&w.push(E,Ee,xe,J,Xt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||ft.intersectsObject(E))){const Ee=W.update(E),xe=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),Xt.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),Xt.copy(Ee.boundingSphere.center)),Xt.applyMatrix4(E.matrixWorld).applyMatrix4(Ot)),Array.isArray(xe)){const De=Ee.groups;for(let Pe=0,Xe=De.length;Pe<Xe;Pe++){const Ke=De[Pe],Ue=xe[Ke.materialIndex];Ue&&Ue.visible&&w.push(E,Ee,Ue,J,Xt.z,Ke)}}else xe.visible&&w.push(E,Ee,xe,J,Xt.z,null)}}const Me=E.children;for(let Ee=0,xe=Me.length;Ee<xe;Ee++)sa(Me[Ee],V,J,q)}function Ms(E,V,J,q){const{opaque:Y,transmissive:Me,transparent:Ee}=E;N.setupLightsView(J),nt===!0&&Re.setGlobalState(R.clippingPlanes,J),q&&v.viewport(le.copy(q)),Y.length>0&&bs(Y,V,J),Me.length>0&&bs(Me,V,J),Ee.length>0&&bs(Ee,V,J),v.buffers.depth.setTest(!0),v.buffers.depth.setMask(!0),v.buffers.color.setMask(!0),v.setPolygonOffset(!1)}function ra(E,V,J,q){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[q.id]===void 0){const Ue=ae.has("EXT_color_buffer_half_float")||ae.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[q.id]=new $i(1,1,{generateMipmaps:!0,type:Ue?za:bi,minFilter:zs,samples:Math.max(4,A.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:lt.workingColorSpace})}const Me=N.state.transmissionRenderTarget[q.id],Ee=q.viewport||le;Me.setSize(Ee.z*R.transmissionResolutionScale,Ee.w*R.transmissionResolutionScale);const xe=R.getRenderTarget(),De=R.getActiveCubeFace(),Pe=R.getActiveMipmapLevel();R.setRenderTarget(Me),R.getClearColor(Ze),Fe=R.getClearAlpha(),Fe<1&&R.setClearColor(16777215,.5),R.clear(),bt&&Ge.render(J);const Xe=R.toneMapping;R.toneMapping=Ji;const Ke=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),N.setupLightsView(q),nt===!0&&Re.setGlobalState(R.clippingPlanes,q),bs(E,J,q),Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me),ae.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let pt=0,Ft=V.length;pt<Ft;pt++){const Et=V[pt],{object:xt,geometry:fn,material:Te,group:Un}=Et;if(Te.side===ya&&xt.layers.test(q.layers)){const it=Te.side;Te.side=Yn,Te.needsUpdate=!0,oa(xt,J,q,fn,Te,Un),Te.side=it,Te.needsUpdate=!0,Ue=!0}}Ue===!0&&(Z.updateMultisampleRenderTarget(Me),Z.updateRenderTargetMipmap(Me))}R.setRenderTarget(xe,De,Pe),R.setClearColor(Ze,Fe),Ke!==void 0&&(q.viewport=Ke),R.toneMapping=Xe}function bs(E,V,J){const q=V.isScene===!0?V.overrideMaterial:null;for(let Y=0,Me=E.length;Y<Me;Y++){const Ee=E[Y],{object:xe,geometry:De,group:Pe}=Ee;let Xe=Ee.material;Xe.allowOverride===!0&&q!==null&&(Xe=q),xe.layers.test(J.layers)&&oa(xe,V,J,De,Xe,Pe)}}function oa(E,V,J,q,Y,Me){E.onBeforeRender(R,V,J,q,Y,Me),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),Y.onBeforeRender(R,V,J,q,E,Me),Y.transparent===!0&&Y.side===ya&&Y.forceSinglePass===!1?(Y.side=Yn,Y.needsUpdate=!0,R.renderBufferDirect(J,V,q,Y,E,Me),Y.side=xs,Y.needsUpdate=!0,R.renderBufferDirect(J,V,q,Y,E,Me),Y.side=ya):R.renderBufferDirect(J,V,q,Y,E,Me),E.onAfterRender(R,V,J,q,Y,Me)}function ui(E,V,J){V.isScene!==!0&&(V=_t);const q=X.get(E),Y=N.state.lights,Me=N.state.shadowsArray,Ee=Y.state.version,xe=ee.getParameters(E,Y.state,Me,V,J,N.state.lightProbeGridArray),De=ee.getProgramCacheKey(xe);let Pe=q.programs;q.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?V.environment:null,q.fog=V.fog;const Xe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;q.envMap=ce.get(E.envMap||q.environment,Xe),q.envMapRotation=q.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,Pe===void 0&&(E.addEventListener("dispose",Nn),Pe=new Map,q.programs=Pe);let Ke=Pe.get(De);if(Ke!==void 0){if(q.currentProgram===Ke&&q.lightsStateVersion===Ee)return No(E,xe),Ke}else xe.uniforms=ee.getUniforms(E),O!==null&&E.isNodeMaterial&&O.build(E,J,xe),E.onBeforeCompile(xe,R),Ke=ee.acquireProgram(xe,De),Pe.set(De,Ke),q.uniforms=xe.uniforms;const Ue=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ue.clippingPlanes=Re.uniform),No(E,xe),q.needsLights=Ql(E),q.lightsStateVersion=Ee,q.needsLights&&(Ue.ambientLightColor.value=Y.state.ambient,Ue.lightProbe.value=Y.state.probe,Ue.directionalLights.value=Y.state.directional,Ue.directionalLightShadows.value=Y.state.directionalShadow,Ue.spotLights.value=Y.state.spot,Ue.spotLightShadows.value=Y.state.spotShadow,Ue.rectAreaLights.value=Y.state.rectArea,Ue.ltc_1.value=Y.state.rectAreaLTC1,Ue.ltc_2.value=Y.state.rectAreaLTC2,Ue.pointLights.value=Y.state.point,Ue.pointLightShadows.value=Y.state.pointShadow,Ue.hemisphereLights.value=Y.state.hemi,Ue.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ue.spotLightMatrix.value=Y.state.spotLightMatrix,Ue.spotLightMap.value=Y.state.spotLightMap,Ue.pointShadowMatrix.value=Y.state.pointShadowMatrix),q.lightProbeGrid=N.state.lightProbeGridArray.length>0,q.currentProgram=Ke,q.uniformsList=null,Ke}function Hi(E){if(E.uniformsList===null){const V=E.currentProgram.getUniforms();E.uniformsList=pu.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function No(E,V){const J=X.get(E);J.outputColorSpace=V.outputColorSpace,J.batching=V.batching,J.batchingColor=V.batchingColor,J.instancing=V.instancing,J.instancingColor=V.instancingColor,J.instancingMorph=V.instancingMorph,J.skinning=V.skinning,J.morphTargets=V.morphTargets,J.morphNormals=V.morphNormals,J.morphColors=V.morphColors,J.morphTargetsCount=V.morphTargetsCount,J.numClippingPlanes=V.numClippingPlanes,J.numIntersection=V.numClipIntersection,J.vertexAlphas=V.vertexAlphas,J.vertexTangents=V.vertexTangents,J.toneMapping=V.toneMapping}function Kl(E,V){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;x.setFromMatrixPosition(V.matrixWorld);for(let J=0,q=E.length;J<q;J++){const Y=E[J];if(Y.texture!==null&&Y.boundingBox.containsPoint(x))return Y}return null}function Do(E,V,J,q,Y){V.isScene!==!0&&(V=_t),Z.resetTextureUnits();const Me=V.fog,Ee=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?V.environment:null,xe=U===null?R.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:lt.workingColorSpace,De=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Pe=ce.get(q.envMap||Ee,De),Xe=q.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Ke=!!J.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ue=!!J.morphAttributes.position,pt=!!J.morphAttributes.normal,Ft=!!J.morphAttributes.color;let Et=Ji;q.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(Et=R.toneMapping);const xt=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,fn=xt!==void 0?xt.length:0,Te=X.get(q),Un=N.state.lights;if(nt===!0&&(et===!0||E!==re)){const Dt=E===re&&q.id===k;Re.setState(q,E,Dt)}let it=!1;q.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Un.state.version||Te.outputColorSpace!==xe||Y.isBatchedMesh&&Te.batching===!1||!Y.isBatchedMesh&&Te.batching===!0||Y.isBatchedMesh&&Te.batchingColor===!0&&Y.colorTexture===null||Y.isBatchedMesh&&Te.batchingColor===!1&&Y.colorTexture!==null||Y.isInstancedMesh&&Te.instancing===!1||!Y.isInstancedMesh&&Te.instancing===!0||Y.isSkinnedMesh&&Te.skinning===!1||!Y.isSkinnedMesh&&Te.skinning===!0||Y.isInstancedMesh&&Te.instancingColor===!0&&Y.instanceColor===null||Y.isInstancedMesh&&Te.instancingColor===!1&&Y.instanceColor!==null||Y.isInstancedMesh&&Te.instancingMorph===!0&&Y.morphTexture===null||Y.isInstancedMesh&&Te.instancingMorph===!1&&Y.morphTexture!==null||Te.envMap!==Pe||q.fog===!0&&Te.fog!==Me||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==Re.numPlanes||Te.numIntersection!==Re.numIntersection)||Te.vertexAlphas!==Xe||Te.vertexTangents!==Ke||Te.morphTargets!==Ue||Te.morphNormals!==pt||Te.morphColors!==Ft||Te.toneMapping!==Et||Te.morphTargetsCount!==fn||!!Te.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Te.__version=q.version);let Qt=Te.currentProgram;it===!0&&(Qt=ui(q,V,Y),O&&q.isNodeMaterial&&O.onUpdateProgram(q,Qt,Te));let Hn=!1,Gi=!1,Gn=!1;const St=Qt.getUniforms(),Tt=Te.uniforms;if(v.useProgram(Qt.program)&&(Hn=!0,Gi=!0,Gn=!0),q.id!==k&&(k=q.id,Gi=!0),Te.needsLights){const Dt=Kl(N.state.lightProbeGridArray,Y);Te.lightProbeGrid!==Dt&&(Te.lightProbeGrid=Dt,Gi=!0)}if(Hn||re!==E){v.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),St.setValue(B,"projectionMatrix",E.projectionMatrix),St.setValue(B,"viewMatrix",E.matrixWorldInverse);const Ni=St.map.cameraPosition;Ni!==void 0&&Ni.setValue(B,Ct.setFromMatrixPosition(E.matrixWorld)),A.logarithmicDepthBuffer&&St.setValue(B,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&St.setValue(B,"isOrthographic",E.isOrthographicCamera===!0),re!==E&&(re=E,Gi=!0,Gn=!0)}if(Te.needsLights&&(Un.state.directionalShadowMap.length>0&&St.setValue(B,"directionalShadowMap",Un.state.directionalShadowMap,Z),Un.state.spotShadowMap.length>0&&St.setValue(B,"spotShadowMap",Un.state.spotShadowMap,Z),Un.state.pointShadowMap.length>0&&St.setValue(B,"pointShadowMap",Un.state.pointShadowMap,Z)),Y.isSkinnedMesh){St.setOptional(B,Y,"bindMatrix"),St.setOptional(B,Y,"bindMatrixInverse");const Dt=Y.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),St.setValue(B,"boneTexture",Dt.boneTexture,Z))}Y.isBatchedMesh&&(St.setOptional(B,Y,"batchingTexture"),St.setValue(B,"batchingTexture",Y._matricesTexture,Z),St.setOptional(B,Y,"batchingIdTexture"),St.setValue(B,"batchingIdTexture",Y._indirectTexture,Z),St.setOptional(B,Y,"batchingColorTexture"),Y._colorsTexture!==null&&St.setValue(B,"batchingColorTexture",Y._colorsTexture,Z));const Vi=J.morphAttributes;if((Vi.position!==void 0||Vi.normal!==void 0||Vi.color!==void 0)&&F.update(Y,J,Qt),(Gi||Te.receiveShadow!==Y.receiveShadow)&&(Te.receiveShadow=Y.receiveShadow,St.setValue(B,"receiveShadow",Y.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&V.environment!==null&&(Tt.envMapIntensity.value=V.environmentIntensity),Tt.dfgLUT!==void 0&&(Tt.dfgLUT.value=s3()),Gi){if(St.setValue(B,"toneMappingExposure",R.toneMappingExposure),Te.needsLights&&or(Tt,Gn),Me&&q.fog===!0&&ue.refreshFogUniforms(Tt,Me),ue.refreshMaterialUniforms(Tt,q,pe,ve,N.state.transmissionRenderTarget[E.id]),Te.needsLights&&Te.lightProbeGrid){const Dt=Te.lightProbeGrid;Tt.probesSH.value=Dt.texture,Tt.probesMin.value.copy(Dt.boundingBox.min),Tt.probesMax.value.copy(Dt.boundingBox.max),Tt.probesResolution.value.copy(Dt.resolution)}pu.upload(B,Hi(Te),Tt,Z)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(pu.upload(B,Hi(Te),Tt,Z),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&St.setValue(B,"center",Y.center),St.setValue(B,"modelViewMatrix",Y.modelViewMatrix),St.setValue(B,"normalMatrix",Y.normalMatrix),St.setValue(B,"modelMatrix",Y.matrixWorld),q.uniformsGroups!==void 0){const Dt=q.uniformsGroups;for(let Ni=0,fi=Dt.length;Ni<fi;Ni++){const Uo=Dt[Ni];fe.update(Uo,Qt),fe.bind(Uo,Qt)}}return Qt}function or(E,V){E.ambientLightColor.needsUpdate=V,E.lightProbe.needsUpdate=V,E.directionalLights.needsUpdate=V,E.directionalLightShadows.needsUpdate=V,E.pointLights.needsUpdate=V,E.pointLightShadows.needsUpdate=V,E.spotLights.needsUpdate=V,E.spotLightShadows.needsUpdate=V,E.rectAreaLights.needsUpdate=V,E.hemisphereLights.needsUpdate=V}function Ql(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return I},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,V,J){const q=X.get(E);q.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),X.get(E.texture).__webglTexture=V,X.get(E.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:J,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){const J=X.get(E);J.__webglFramebuffer=V,J.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(E,V=0,J=0){U=E,I=V,z=J;let q=null,Y=!1,Me=!1;if(E){const xe=X.get(E);if(xe.__useDefaultFramebuffer!==void 0){v.bindFramebuffer(B.FRAMEBUFFER,xe.__webglFramebuffer),le.copy(E.viewport),_e.copy(E.scissor),ke=E.scissorTest,v.viewport(le),v.scissor(_e),v.setScissorTest(ke),k=-1;return}else if(xe.__webglFramebuffer===void 0)Z.setupRenderTarget(E);else if(xe.__hasExternalTextures)Z.rebindTextures(E,X.get(E.texture).__webglTexture,X.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Xe=E.depthTexture;if(xe.__boundDepthTexture!==Xe){if(Xe!==null&&X.has(Xe)&&(E.width!==Xe.image.width||E.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Z.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Me=!0);const Pe=X.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Pe[V])?q=Pe[V][J]:q=Pe[V],Y=!0):E.samples>0&&Z.useMultisampledRTT(E)===!1?q=X.get(E).__webglMultisampledFramebuffer:Array.isArray(Pe)?q=Pe[J]:q=Pe,le.copy(E.viewport),_e.copy(E.scissor),ke=E.scissorTest}else le.copy(Be).multiplyScalar(pe).floor(),_e.copy(Mt).multiplyScalar(pe).floor(),ke=je;if(J!==0&&(q=H),v.bindFramebuffer(B.FRAMEBUFFER,q)&&v.drawBuffers(E,q),v.viewport(le),v.scissor(_e),v.setScissorTest(ke),Y){const xe=X.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+V,xe.__webglTexture,J)}else if(Me){const xe=V;for(let De=0;De<E.textures.length;De++){const Pe=X.get(E.textures[De]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+De,Pe.__webglTexture,J,xe)}}else if(E!==null&&J!==0){const xe=X.get(E.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,xe.__webglTexture,J)}k=-1},this.readRenderTargetPixels=function(E,V,J,q,Y,Me,Ee,xe=0){if(!(E&&E.isWebGLRenderTarget)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=X.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De){v.bindFramebuffer(B.FRAMEBUFFER,De);try{const Pe=E.textures[xe],Xe=Pe.format,Ke=Pe.type;if(E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xe),!A.textureFormatReadable(Xe)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!A.textureTypeReadable(Ke)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=E.width-q&&J>=0&&J<=E.height-Y&&B.readPixels(V,J,q,Y,$.convert(Xe),$.convert(Ke),Me)}finally{const Pe=U!==null?X.get(U).__webglFramebuffer:null;v.bindFramebuffer(B.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(E,V,J,q,Y,Me,Ee,xe=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=X.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De)if(V>=0&&V<=E.width-q&&J>=0&&J<=E.height-Y){v.bindFramebuffer(B.FRAMEBUFFER,De);const Pe=E.textures[xe],Xe=Pe.format,Ke=Pe.type;if(E.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+xe),!A.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!A.textureTypeReadable(Ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,Ue),B.bufferData(B.PIXEL_PACK_BUFFER,Me.byteLength,B.STREAM_READ),B.readPixels(V,J,q,Y,$.convert(Xe),$.convert(Ke),0);const pt=U!==null?X.get(U).__webglFramebuffer:null;v.bindFramebuffer(B.FRAMEBUFFER,pt);const Ft=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await wT(B,Ft,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,Ue),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,Me),B.deleteBuffer(Ue),B.deleteSync(Ft),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,V=null,J=0){const q=Math.pow(2,-J),Y=Math.floor(E.image.width*q),Me=Math.floor(E.image.height*q),Ee=V!==null?V.x:0,xe=V!==null?V.y:0;Z.setTexture2D(E,0),B.copyTexSubImage2D(B.TEXTURE_2D,J,0,0,Ee,xe,Y,Me),v.unbindTexture()},this.copyTextureToTexture=function(E,V,J=null,q=null,Y=0,Me=0){let Ee,xe,De,Pe,Xe,Ke,Ue,pt,Ft;const Et=E.isCompressedTexture?E.mipmaps[Me]:E.image;if(J!==null)Ee=J.max.x-J.min.x,xe=J.max.y-J.min.y,De=J.isBox3?J.max.z-J.min.z:1,Pe=J.min.x,Xe=J.min.y,Ke=J.isBox3?J.min.z:0;else{const Tt=Math.pow(2,-Y);Ee=Math.floor(Et.width*Tt),xe=Math.floor(Et.height*Tt),E.isDataArrayTexture?De=Et.depth:E.isData3DTexture?De=Math.floor(Et.depth*Tt):De=1,Pe=0,Xe=0,Ke=0}q!==null?(Ue=q.x,pt=q.y,Ft=q.z):(Ue=0,pt=0,Ft=0);const xt=$.convert(V.format),fn=$.convert(V.type);let Te;V.isData3DTexture?(Z.setTexture3D(V,0),Te=B.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(Z.setTexture2DArray(V,0),Te=B.TEXTURE_2D_ARRAY):(Z.setTexture2D(V,0),Te=B.TEXTURE_2D),v.activeTexture(B.TEXTURE0),v.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,V.flipY),v.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),v.pixelStorei(B.UNPACK_ALIGNMENT,V.unpackAlignment);const Un=v.getParameter(B.UNPACK_ROW_LENGTH),it=v.getParameter(B.UNPACK_IMAGE_HEIGHT),Qt=v.getParameter(B.UNPACK_SKIP_PIXELS),Hn=v.getParameter(B.UNPACK_SKIP_ROWS),Gi=v.getParameter(B.UNPACK_SKIP_IMAGES);v.pixelStorei(B.UNPACK_ROW_LENGTH,Et.width),v.pixelStorei(B.UNPACK_IMAGE_HEIGHT,Et.height),v.pixelStorei(B.UNPACK_SKIP_PIXELS,Pe),v.pixelStorei(B.UNPACK_SKIP_ROWS,Xe),v.pixelStorei(B.UNPACK_SKIP_IMAGES,Ke);const Gn=E.isDataArrayTexture||E.isData3DTexture,St=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){const Tt=X.get(E),Vi=X.get(V),Dt=X.get(Tt.__renderTarget),Ni=X.get(Vi.__renderTarget);v.bindFramebuffer(B.READ_FRAMEBUFFER,Dt.__webglFramebuffer),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,Ni.__webglFramebuffer);for(let fi=0;fi<De;fi++)Gn&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(E).__webglTexture,Y,Ke+fi),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,X.get(V).__webglTexture,Me,Ft+fi)),B.blitFramebuffer(Pe,Xe,Ee,xe,Ue,pt,Ee,xe,B.DEPTH_BUFFER_BIT,B.NEAREST);v.bindFramebuffer(B.READ_FRAMEBUFFER,null),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(Y!==0||E.isRenderTargetTexture||X.has(E)){const Tt=X.get(E),Vi=X.get(V);v.bindFramebuffer(B.READ_FRAMEBUFFER,L),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,P);for(let Dt=0;Dt<De;Dt++)Gn?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Tt.__webglTexture,Y,Ke+Dt):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Tt.__webglTexture,Y),St?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,Vi.__webglTexture,Me,Ft+Dt):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,Vi.__webglTexture,Me),Y!==0?B.blitFramebuffer(Pe,Xe,Ee,xe,Ue,pt,Ee,xe,B.COLOR_BUFFER_BIT,B.NEAREST):St?B.copyTexSubImage3D(Te,Me,Ue,pt,Ft+Dt,Pe,Xe,Ee,xe):B.copyTexSubImage2D(Te,Me,Ue,pt,Pe,Xe,Ee,xe);v.bindFramebuffer(B.READ_FRAMEBUFFER,null),v.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else St?E.isDataTexture||E.isData3DTexture?B.texSubImage3D(Te,Me,Ue,pt,Ft,Ee,xe,De,xt,fn,Et.data):V.isCompressedArrayTexture?B.compressedTexSubImage3D(Te,Me,Ue,pt,Ft,Ee,xe,De,xt,Et.data):B.texSubImage3D(Te,Me,Ue,pt,Ft,Ee,xe,De,xt,fn,Et):E.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,Me,Ue,pt,Ee,xe,xt,fn,Et.data):E.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,Me,Ue,pt,Et.width,Et.height,xt,Et.data):B.texSubImage2D(B.TEXTURE_2D,Me,Ue,pt,Ee,xe,xt,fn,Et);v.pixelStorei(B.UNPACK_ROW_LENGTH,Un),v.pixelStorei(B.UNPACK_IMAGE_HEIGHT,it),v.pixelStorei(B.UNPACK_SKIP_PIXELS,Qt),v.pixelStorei(B.UNPACK_SKIP_ROWS,Hn),v.pixelStorei(B.UNPACK_SKIP_IMAGES,Gi),Me===0&&V.generateMipmaps&&B.generateMipmap(Te),v.unbindTexture()},this.initRenderTarget=function(E){X.get(E).__webglFramebuffer===void 0&&Z.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Z.setTextureCube(E,0):E.isData3DTexture?Z.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Z.setTexture2DArray(E,0):Z.setTexture2D(E,0),v.unbindTexture()},this.resetState=function(){I=0,z=0,U=null,v.reset(),ye.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),n.unpackColorSpace=lt._getUnpackColorSpace()}}function r3(t,e=300){if(!t||!Array.isArray(t.nodes)||!Array.isArray(t.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=t.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,e),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,f,h,u;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((f=l.properties)==null?void 0:f.filePath)||(l.uri&&l.uri.startsWith("file://")?l.uri.replace(/^file:\/\//,""):l.uri&&l.uri.startsWith("symbol://")?l.uri.replace(/^symbol:\/\//,"").split("#")[0]:l.uri)||"",line:((h=l.properties)==null?void 0:h.line)||null,status:((u=l.properties)==null?void 0:u.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:t.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:t.edges.length}}function o3(t){const{CLUSTERS:e,NODES:n,EDGES:i,META:a}=r3(t);let s="dark";for(const R of e)R.color=R[s];const r=Object.fromEntries(e.map(R=>[R.id,R])),o=n.map(([R,D,O,H],L)=>({i:L,id:R,name:a[R].label,cid:D,w:O,desc:H,cluster:r[D],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(R=>[R.id,R]));for(const R of o)R.meta=a[R.id]||{};const c=[];for(const[R,D,O]of i){const H=l[R],L=l[D];if(!H||!L){console.warn("[atlas] Dropped invalid edge:",R,"→",D);continue}c.push({s:H,t:L,kind:O,i:c.length,alpha:1}),O==="pre"?(H.out.push(L),L.in.push(H)):(H.rel.push(L),L.rel.push(H))}const f=R=>R.out.length+R.in.length+R.rel.length,h=o.map(()=>[]);for(const R of c)h[R.s.i].push(R.t.i),h[R.t.i].push(R.s.i);const u=42;for(const R of e){const[D,O,H]=R.anchor,L=Math.hypot(D,O,H)||1;R.dir=[D/L,O/L,H/L]}const p=new Array(o.length).fill(-1);(function(){let D=!0,O=0;for(const H of o)H.in.length||(p[H.i]=0);for(;D&&O++<40;){D=!1;for(const H of o){let L=H.in.length?-1:0;for(const P of H.in)p[P.i]>=0&&(L=Math.max(L,p[P.i]+1));L>=0&&L!==p[H.i]&&(p[H.i]=L,D=!0)}}for(let H=0;H<p.length;H++)p[H]<0&&(p[H]=2)})();const g=Math.max(1,...p),b={atlas:[],shell:[],tier:[]};o.forEach((R,D)=>{const O=R.cluster.dir,H=1-Math.min(f(R),12)/26;b.atlas.push([O[0]*u*H,O[1]*u*H,O[2]*u*H]);const L=e.indexOf(R.cluster),P=o.filter(k=>k.cid===R.cid).indexOf(R),I=o.filter(k=>k.cid===R.cid).length,z=(L/e.length+P/I/e.length)*Math.PI*2,U=(P/I-.5)*1.5;b.shell.push([u*.95*Math.cos(U)*Math.cos(z),u*.95*Math.sin(U),u*.95*Math.cos(U)*Math.sin(z)]),b.tier.push([O[0]*u*.72,(p[D]/g-.5)*u*1.5,O[2]*u*.72])});let _="atlas";o.forEach((R,D)=>{const O=b.atlas[D];R.x=O[0]+(Math.random()-.5)*16,R.y=O[1]+(Math.random()-.5)*16,R.z=O[2]+(Math.random()-.5)*16});let d=1;const S=9,M=.04,x=130,w=.05;function N(){if(d<.004)return;const R=b[_];for(let D=0;D<o.length;D++){const O=o[D];for(let H=D+1;H<o.length;H++){const L=o[H];let P=O.x-L.x,I=O.y-L.y,z=O.z-L.z,U=P*P+I*I+z*z+.6;const k=x/U,re=Math.sqrt(U);P/=re,I/=re,z/=re,O.vx+=P*k,O.vy+=I*k,O.vz+=z*k,L.vx-=P*k,L.vy-=I*k,L.vz-=z*k}}for(const D of c){const O=D.s,H=D.t;let L=H.x-O.x,P=H.y-O.y,I=H.z-O.z;const z=Math.hypot(L,P,I)||1,U=(z-S)*M;L/=z,P/=z,I/=z,O.vx+=L*U,O.vy+=P*U,O.vz+=I*U,H.vx-=L*U,H.vy-=P*U,H.vz-=I*U}for(let D=0;D<o.length;D++){const O=o[D],H=R[D];O.vx+=(H[0]-O.x)*w,O.vy+=(H[1]-O.y)*w,O.vz+=(H[2]-O.z)*w;const L=.82;O.vx*=L,O.vy*=L,O.vz*=L,O.x+=O.vx*d,O.y+=O.vy*d,O.z+=O.vz*d}d*=.988}for(let R=0;R<220;R++)N();const T=46;function y(){let R=0;for(const D of o)R=Math.max(R,Math.hypot(D.x,D.y,D.z));return Math.max(10,R)/Math.sin(T*Math.PI/360)*.88}function C({els:R,emit:D}){const O=new AbortController,{signal:H}=O,L=(K,ae,A,v)=>K.addEventListener(ae,A,{...v,signal:H});let P=0;const{stage:I}=R;let z,U,k,re,le,_e,ke=!0;try{z=new Hy({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{ke=!1}if(z||(ke=!1),!ke)return D.gate(!0),{dispose(){}};{let bs=function(ne,ze){const Ae=W.uniforms.uPx.value;for(const we of o){ra.set(we.x,we.y,we.z);const Je=k.position.distanceTo(ra);ra.project(k),we.sx=(ra.x*.5+.5)*ne,we.sy=(-ra.y*.5+.5)*ze,we.sz=ra.z,we.sr=we.size*we.scale*Ae/Math.max(Je,1)*.5}},Kl=function(){oa.fill(1),ui.fill(1),Hi.fill(1);const ne=No,ze=Ae=>!ne||Ae.name.toLowerCase().includes(ne)||Ae.desc.toLowerCase().includes(ne)||(Ae.meta.path||"").toLowerCase().includes(ne)||(Ae.meta.kind||"").toLowerCase().includes(ne);for(const Ae of o)Ae.vis=!sa.has(Ae.cid)&&ze(Ae),Ae.vis||(oa[Ae.i]=0,ui[Ae.i]=.6);for(const Ae of c)(!Ae.s.vis||!Ae.t.vis)&&(Hi[Ae.i]=0);if(Dn){for(const Ae of o)Ae.vis&&(oa[Ae.i]=Dn.has(Ae.i)?1:Ms,ui[Ae.i]=Dn.has(Ae.i)?1.25:.8);for(const Ae of c)Hi[Ae.i]&&(Hi[Ae.i]=Dn.has(Ae.s.i)&&Dn.has(Ae.t.i)?1.35:Ms*.5)}else if(Bt){const Ae=new Set([Bt.i,...h[Bt.i]]);for(const we of o)we.vis&&(oa[we.i]=Ae.has(we.i)?1:Ms,ui[we.i]=we===Bt?1.75:Ae.has(we.i)?1.15:.75);for(const we of c)Hi[we.i]&&(Hi[we.i]=we.s===Bt||we.t===Bt?1.4:Ms*.45)}return Kt&&Kt.vis&&(oa[Kt.i]=1,ui[Kt.i]=Math.max(ui[Kt.i],1.6)),{nT:oa,sT:ui,eT:Hi}},Do=function(ne){Bt=ne,Dn=null,R.pathbar.classList.remove("on"),$.tx=ne.x,$.ty=ne.y,$.tz=ne.z,$.tDist=Math.min($.tDist,te*.72),fi(ne),Tt(),Gn()},or=function(){Bt=null,Dn=null,$.tx=$.ty=$.tz=0,R.pathbar.classList.remove("on"),fi(null),Tt(),Gn()},Ql=function(ne,ze){const Ae=new Array(o.length).fill(-1),we=new Set([ne.i]),Je=[ne.i];for(;Je.length;){const di=Je.shift();if(di===ze.i)break;for(const dn of h[di])!we.has(dn)&&o[dn].vis&&(we.add(dn),Ae[dn]=di,Je.push(dn))}if(!we.has(ze.i)){R.chain.textContent="Keine Kausalkette zwischen diesen Objekten",R.pathbar.classList.add("on");return}const Ln=[];let $e=ze.i;for(;$e!==-1&&(Ln.unshift($e),$e!==ne.i);)$e=Ae[$e];Dn=new Set(Ln),R.chain.textContent=Ln.map(di=>o[di].name).join(" → "),R.pathbar.classList.add("on"),Gn()},E=function(){Dn=null,R.pathbar.classList.remove("on"),Gn()},Me=function(ne,ze){let Ae=0;const we=new Set;aa&&Y.forEach($e=>we.add($e)),Bt&&(we.add(Bt.i),h[Bt.i].forEach($e=>we.add($e))),Dn&&Dn.forEach($e=>we.add($e)),Kt&&we.add(Kt.i);const Je=[...we].map($e=>o[$e]).filter($e=>$e.vis&&$e.sz<1&&$e.sx>-60&&$e.sx<ne+60&&$e.sy>-20&&$e.sy<ze+20).sort(($e,di)=>$e.sz-di.sz),Ln=[];for(const $e of Je){if(Ae>=q.length)break;const di=$e.name.length*11.5+8,dn=[$e.sx-di/2,$e.sy-18,di,16];if(Ln.some(Jt=>dn[0]<Jt[0]+Jt[2]&&dn[0]+dn[2]>Jt[0]&&dn[1]<Jt[1]+Jt[3]&&dn[1]+dn[3]>Jt[1]))continue;Ln.push(dn);const qe=q[Ae++];qe.textContent=$e.name,qe.className="lab"+($e===Kt||$e===Bt?"":" sm"),qe.style.transform=`translate(-50%,-50%) translate(${$e.sx.toFixed(1)}px,${($e.sy-17).toFixed(1)}px)`,qe.style.opacity=Math.min(1,$e.alpha*1.3),qe.style.color=$e===Kt||$e===Bt?$e.cluster.color:""}for(;Ae<q.length;Ae++)q[Ae].style.opacity=0},Ft=function(ne){P=requestAnimationFrame(Ft);const ze=Math.min(.05,(ne-Ee)/1e3);Ee=ne;const Ae=I.clientWidth,we=I.clientHeight;if(!Ae||!we)return;z.domElement.width!==Math.round(Ae*z.getPixelRatio())&&(z.setSize(Ae,we,!1),k.aspect=Ae/we,k.updateProjectionMatrix(),Q.uniforms.uPx.value=W.uniforms.uPx.value=we/(2*Math.tan(k.fov*Math.PI/360))),N(),Fi&&($.tTheta+=ze*.09);const Je=1-Math.pow(.0016,ze);if($.theta+=($.tTheta-$.theta)*Je,$.phi+=($.tPhi-$.phi)*Je,$.dist+=($.tDist-$.dist)*Je,$.cx+=($.tx-$.cx)*Je,$.cy+=($.ty-$.cy)*Je,$.cz+=($.tz-$.cz)*Je,k.position.set($.cx+$.dist*Math.sin($.phi)*Math.cos($.theta),$.cy+$.dist*Math.cos($.phi),$.cz+$.dist*Math.sin($.phi)*Math.sin($.theta)),k.lookAt($.cx,$.cy,$.cz),bs(Ae,we),ia.live&&!ye){let qe=null;for(const Jt of o){if(!Jt.vis||Jt.sz>1)continue;const og=Jt.sx-ia.x,lg=Jt.sy-ia.y,cg=Jt.sr+7;og*og+lg*lg>cg*cg||(!qe||Jt.sz<qe.sz)&&(qe=Jt)}qe!==Kt&&(Kt=qe,dt.style.cursor=qe?"pointer":"grab",Gn())}const{nT:Ln,sT:$e,eT:di}=Kl(),dn=1-Math.pow(.002,ze);for(const qe of o)qe.alpha+=(Ln[qe.i]-qe.alpha)*dn,qe.scale+=($e[qe.i]-qe.scale)*dn,Pe.array[qe.i*3]=qe.x,Pe.array[qe.i*3+1]=qe.y,Pe.array[qe.i*3+2]=qe.z,Xe.array[qe.i]=qe.alpha,Ke.array[qe.i]=qe.scale;Pe.needsUpdate=Xe.needsUpdate=Ke.needsUpdate=!0;for(const qe of c){qe.alpha+=(di[qe.i]-qe.alpha)*dn;const Jt=qe.i*6;Ue.array[Jt]=qe.s.x,Ue.array[Jt+1]=qe.s.y,Ue.array[Jt+2]=qe.s.z,Ue.array[Jt+3]=qe.t.x,Ue.array[Jt+4]=qe.t.y,Ue.array[Jt+5]=qe.t.z,pt.array[qe.i*2]=pt.array[qe.i*2+1]=qe.alpha}Ue.needsUpdate=pt.needsUpdate=!0,ge.uniforms.uTime.value=ne/1e3,ge.uniforms.uFlow.value+=((ci?1:0)-ge.uniforms.uFlow.value)*dn,Me(Ae,we),z.render(U,k),xe+=1/Math.max(ze,1e-4),De++,De>=30&&(R.sFps.textContent=Math.round(xe/De),xe=De=0)},Et=function(ne=.55){d=Math.max(d,ne)},xt=function(ne){_=ne,R.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[_],Et(1)},it=function(){$.tTheta=.7,$.tPhi=1.15,$.tDist=y(),or(),Et(.8),Cn()},Qt=function(){D.tools({flow:ci,label:aa,spin:Fi})},Hn=function(ne){s=ne,document.documentElement.dataset.theme=ne,D.theme(ne);const ze=ne==="light";for(const Je of e)Je.color=Je[ne];o.forEach((Je,Ln)=>{const $e=K(Je.cluster.color);v[Ln*3]=$e[0],v[Ln*3+1]=$e[1],v[Ln*3+2]=$e[2]}),ce.getAttribute("aColor").needsUpdate=!0,c.forEach((Je,Ln)=>{de.set(K(Je.s.cluster.color),Ln*6),de.set(K(Je.t.cluster.color),Ln*6+3)}),F.getAttribute("aColor").needsUpdate=!0;const Ae=ze?ks:Vr;for(const Je of[Q,W,ge])Je.uniforms.uLight.value=ze?1:0,Je.blending=Ae,Je.needsUpdate=!0;const we=ze?16053489:328967;z.setClearColor(we,1),U.fog.color.setHex(we),U.fog.density=ze?.0042:.0068,Tt(),Bt&&fi(Bt)},Gn=function(){R.hudSel.textContent=Dn?`Kausalkette · ${Dn.size} Stationen`:Bt?Bt.name:Kt?Kt.name:"Nichts ausgewählt"},St=function(ne){sa.has(ne)?sa.delete(ne):sa.add(ne),Tt(),Et(.4)},Tt=function(){const ne=R.q.value.trim().toLowerCase(),ze=o.filter(we=>!sa.has(we.cid)&&(!ne||we.name.toLowerCase().includes(ne)||we.desc.toLowerCase().includes(ne))).sort((we,Je)=>f(Je)-f(we));D.list({q:ne,rows:ze.map(we=>({i:we.i,name:we.name,color:we.cluster.color,deg:f(we),on:we===Bt}))}),R.sNode.textContent=ze.length;const Ae=c.filter(we=>ze.includes(we.s)&&ze.includes(we.t)).length;R.sEdge.textContent=Ae,R.sDeg.textContent=ze.length?(Ae*2/ze.length).toFixed(1):"0"},Ni=function(ne){No=ne.trim().toLowerCase(),Tt(),Et(.25)},fi=function(ne){D.drawer(ne&&{i:ne.i,name:ne.name,desc:ne.desc,cname:ne.cluster.name,color:ne.cluster.color,deg:f(ne),depth:p[ne.i],kind:ne.meta.kind||"",path:ne.meta.path||"",line:ne.meta.line||null,status:ne.meta.status||"",prov:ne.meta.prov||"",groups:[["Ursache · eingehend",ne.in,"IN"],["Wirkung · ausgehend",ne.out,"OUT"],["Assoziiert · Backlinks",ne.rel,"REL"]].filter(([,ze])=>ze.length).map(([ze,Ae,we])=>({title:ze,tag:we,items:Ae.map(Je=>({i:Je.i,name:Je.name,color:Je.cluster.color}))}))})},Uo=function(ne){const ze=o[ne],Ae=b[_],we=Ae[ze.i].slice();for(let Je=0;Je<Ae.length;Je++)Ae[Je][0]-=we[0],Ae[Je][1]-=we[1],Ae[Je][2]-=we[2];$.tx=$.ty=$.tz=0,Et(1)},rg=function(ne){const ze=o[ne];R.chain.textContent="Start bei "+ze.name+" — Shift+Klick auf das Zielobjekt",R.pathbar.classList.add("on")};var Ze=bs,Fe=Kl,ie=Do,ve=or,pe=Ql,Ce=E,Ie=Me,Be=Ft,Mt=Et,je=xt,ft=it,nt=Qt,et=Hn,Ot=Gn,Ct=St,Xt=Tt,_t=Ni,bt=fi,Se=Uo,B=rg;z.setPixelRatio(Math.min(devicePixelRatio,2)),I.appendChild(z.domElement),U=new yy,U.fog=new Qm(328967,.0068),k=new xi(T,1,1,1400);const K=ne=>{const ze=new rt(ne);return[ze.r,ze.g,ze.b]},ae=o.length,A=new Float32Array(ae*3),v=new Float32Array(ae*3),G=new Float32Array(ae),X=new Float32Array(ae),Z=new Float32Array(ae);o.forEach((ne,ze)=>{const Ae=K(ne.cluster.color);v[ze*3]=Ae[0],v[ze*3+1]=Ae[1],v[ze*3+2]=Ae[2],G[ze]=ne.size=.95+ne.w*.4,X[ze]=1,Z[ze]=1});const ce=new Rn;ce.setAttribute("position",new yt(A,3)),ce.setAttribute("aColor",new yt(v,3)),ce.setAttribute("aSize",new yt(G,1)),ce.setAttribute("aAlpha",new yt(X,1)),ce.setAttribute("aScale",new yt(Z,1));const he=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,Q=new bn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:he,fragmentShader:`
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
      }`,transparent:!0,blending:Vr,depthWrite:!1}),W=new bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:he,fragmentShader:`
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
      }`,transparent:!0,blending:Vr,depthWrite:!1});re=new Up(ce,Q),le=new Up(ce,W),re.frustumCulled=!1,le.frustumCulled=!1,U.add(re,le);const ee=c.length,ue=new Float32Array(ee*6),de=new Float32Array(ee*6),me=new Float32Array(ee*2),Re=new Float32Array(ee*2),Le=new Float32Array(ee*2),Ge=new Float32Array(ee*2);c.forEach((ne,ze)=>{const Ae=K(ne.s.cluster.color),we=K(ne.t.cluster.color);de.set(Ae,ze*6),de.set(we,ze*6+3),me[ze*2]=0,me[ze*2+1]=1;const Je=ze*.6180339887%1;Re[ze*2]=Je,Re[ze*2+1]=Je,Le[ze*2]=Le[ze*2+1]=1,Ge[ze*2]=Ge[ze*2+1]=ne.kind==="pre"?1:0});const F=new Rn;F.setAttribute("position",new yt(ue,3)),F.setAttribute("aColor",new yt(de,3)),F.setAttribute("aT",new yt(me,1)),F.setAttribute("aSeed",new yt(Re,1)),F.setAttribute("aAlpha",new yt(Le,1)),F.setAttribute("aDir",new yt(Ge,1));const ge=new bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:Vr,depthWrite:!1});_e=new hu(F,ge),_e.frustumCulled=!1,U.add(_e);const te=y(),$={theta:.7,phi:1.15,dist:te,tTheta:.7,tPhi:1.15,tDist:te,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let ye=!1,fe=0,Oe=0,Ne=0;const dt=z.domElement;L(dt,"pointerdown",ne=>{ye=!0,Ne=0,fe=ne.clientX,Oe=ne.clientY,dt.setPointerCapture(ne.pointerId)}),L(dt,"pointerup",ne=>{ye=!1,dt.releasePointerCapture(ne.pointerId)}),L(dt,"pointermove",ne=>{const ze=dt.getBoundingClientRect();if(ia.x=ne.clientX-ze.left,ia.y=ne.clientY-ze.top,ia.live=!0,!ye)return;const Ae=ne.clientX-fe,we=ne.clientY-Oe;Ne+=Math.abs(Ae)+Math.abs(we),fe=ne.clientX,Oe=ne.clientY,$.tTheta-=Ae*.0052,$.tPhi=Math.max(.12,Math.min(Math.PI-.12,$.tPhi-we*.0052)),Fi=!1,Qt()}),L(dt,"pointerleave",()=>{ia.live=!1});const Nt=R.zlvl,Cn=()=>{Nt.textContent=Math.round(te/$.tDist*100)+"%"},Nn=ne=>{$.tDist=Math.max(te*.22,Math.min(te*2.6,$.tDist*ne)),Cn()};L(dt,"wheel",ne=>{ne.preventDefault(),Nn(1+Math.sign(ne.deltaY)*.11)},{passive:!1});const Af=()=>{$.tDist=te,Cn()};Cn();const ia={x:-1,y:-1,live:!1};let Kt=null,Bt=null,Dn=null,Fi=!0,aa=!0,ci=!0;const sa=new Set,Ms=.12,ra=new j;L(dt,"click",ne=>{if(!(Ne>5)){if(!Kt){ne.shiftKey||or();return}if(ne.shiftKey&&Bt&&Kt!==Bt){Ql(Bt,Kt);return}Do(Kt)}});const oa=new Float32Array(o.length),ui=new Float32Array(o.length),Hi=new Float32Array(c.length);let No="";const V=R.labels,J=14,q=Array.from({length:44},()=>{const ne=document.createElement("div");return ne.className="lab",ne.style.opacity=0,V.appendChild(ne),ne}),Y=[...o].sort((ne,ze)=>f(ze)-f(ne)).slice(0,J).map(ne=>ne.i);let Ee=performance.now(),xe=0,De=0;const Pe=ce.getAttribute("position"),Xe=ce.getAttribute("aAlpha"),Ke=ce.getAttribute("aScale"),Ue=F.getAttribute("position"),pt=F.getAttribute("aAlpha");P=requestAnimationFrame(Ft);const fn=()=>{ci=!ci,Qt()},Te=()=>{aa=!aa,Qt()},Un=()=>{Fi=!Fi,Qt()},Gi=()=>Hn(s==="light"?"dark":"light");L(window,"keydown",ne=>{if(/^(INPUT|TEXTAREA)$/.test(ne.target.tagName)){ne.key==="Escape"&&ne.target.blur();return}ne.key==="Escape"?or():ne.key==="l"||ne.key==="L"?(aa=!aa,Qt()):ne.key==="r"||ne.key==="R"?it():ne.key===" "?(ne.preventDefault(),Fi=!Fi,Qt()):ne.key==="/"?(ne.preventDefault(),R.q.focus()):ne.key==="="||ne.key==="+"?Nn(1/1.18):(ne.key==="-"||ne.key==="_")&&Nn(1.18)});const Vi=ne=>Do(o[ne]),Dt=ne=>{Kt=ne===null?null:o[ne]};return Hn(s),Tt(),fi(null),Qt(),Gn(),{setView:xt,toggleFlow:fn,toggleLabel:Te,toggleSpin:Un,reset:it,toggleTheme:Gi,dolly:Nn,zoomReset:Af,toggleCluster:St,selectAt:Vi,hoverAt:Dt,setQuery:Ni,clearPath:E,centerOn:Uo,startPath:rg,dispose(){O.abort(),cancelAnimationFrame(P),ce.dispose(),F.dispose(),Q.dispose(),W.dispose(),ge.dispose(),z.dispose(),dt.remove(),R.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:o,edges:c,deg:f,createAtlas:C}}function l3(t){if(typeof t!="string"||t==="")return t;const e=t.split(/[\\/]/).filter(Boolean);return e.length>0?e[e.length-1]:t}const Gy="plugbrain.workspace";function c3(){try{return localStorage.getItem(Gy)||""}catch{return""}}function u3(t){try{localStorage.setItem(Gy,t)}catch{}}async function Xv(){const t=await fetch("/api/galaxy");if(!t.ok)throw new Error(`Galaxie: HTTP ${t.status}`);const e=await t.json();if(!(e!=null&&e.ok)||!Array.isArray(e.planets))throw new Error("Die Galaxie antwortet unvollständig.");return e.planets}function Wv(t){if(typeof t!="string")return"";const e=t.trim();if(e==="")return"";if(/^[a-zA-Z]:[\\/]/.test(e)||/^[\\/]{2}/.test(e)){const i=e.replace(/\\/g,"/"),a=i.startsWith("//")?`//${i.slice(2).replace(/\/{2,}/g,"/")}`:i.replace(/\/{2,}/g,"/");return(a==="//"||/^[a-zA-Z]:\/$/.test(a)?a:a.replace(/\/+$/,"")).toLowerCase()}return e==="/"?e:e.replace(/\/+$/,"")}function f3(t,e){var i;const n=Wv(e);return!n||!Array.isArray(t)?"":((i=t.find(a=>typeof(a==null?void 0:a.id)=="string"&&Wv(a.root)===n))==null?void 0:i.id)??""}async function d3(t,e,n){var s;const i=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:t,name:e})});if(!i.ok){const r=await i.json().catch(()=>null);throw new Error((r==null?void 0:r.error)??`Registrieren: HTTP ${i.status}`)}const a=await i.json();if(!(a!=null&&a.ok)||!((s=a.workspace)!=null&&s.id))throw new Error("Registrieren: unvollständige Antwort.");return await Vy(a.workspace.id,n),a.workspace.id}function Pp(t){var r,o,l;const e=t==null?void 0:t.run;if(!e)return"Kein Indexlauf bekannt.";if(t.stale)return t.ownerAlive&&!t.recoverable?"Indexlauf ohne neuen Fortschritt; der Owner-Prozess läuft noch. Die Sperre bleibt geschützt.":"Indexlauf ohne neuen Fortschritt; der frühere Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.";const n=Math.max(0,Math.round((Date.now()-Date.parse(e.startedAt))/1e3)),i={starting:"startet",scan:"sammelt Dateien",classify:"vergleicht",write:"schreibt",resolve:"verknüpft",publish:"veröffentlicht",done:"fertig",failed:"fehlgeschlagen"}[e.phase]??e.phase;if(e.finishedAt)return e.ok?`Fertig: ${((r=e.result)==null?void 0:r.files)??e.scanned} Dateien, ${((o=e.result)==null?void 0:o.symbols)??0} Symbole, ${((l=e.result)==null?void 0:l.edges)??0} Kanten in ${n} s.`:`Indexlauf fehlgeschlagen: ${e.error??"unbekannter Grund"}`;const a=e.total>0?`/${e.total}`:"",s=e.total>0?` (${Math.round(e.processed/e.total*100)} %)`:"";return`Indexiert: ${i} ${e.processed}${a}${s} — ${n} s`}function h3(t,e){return t!=null&&t.running||t!=null&&t.stale?Pp(t):e.startsWith("Indexiert:")||e.startsWith("Indexlauf ohne neuen Fortschritt;")?"":e}async function p3(t){const e=await fetch(`/api/index/progress?workspace=${encodeURIComponent(t)}`);return e.ok?e.json():null}const m3=t=>new Promise(e=>setTimeout(e,t));async function g3(t,e){for(;;){await m3(900);const n=await p3(t);if(n===null)throw new Error("Der Fortschritt ist nicht abrufbar.");if(e==null||e(n),n.running)continue;if(n.stale)throw n.ownerAlive&&!n.recoverable?new Error("Der Indexlauf meldet keinen neuen Fortschritt, aber der Owner-Prozess läuft noch. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):new Error("Der Indexlauf ist verstummt und sein Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.");const i=n.run;if(!i)throw new Error("Kein Indexlauf bekannt.");if(i.ok)return i.result;throw new Error(i.error??"Indexlauf fehlgeschlagen.")}}async function Vy(t,e){const n=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:t})}),i=await n.json().catch(()=>null);if(n.status===409&&(i!=null&&i.busy))throw i.ownerAlive&&!i.recoverable?new Error("Ein stiller Indexlauf gehört noch einem lebenden Owner-Prozess. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):i.recoverable?new Error("Der vorherige Index-Owner ist nicht mehr aktiv. Der Lauf kann erneut gestartet werden."):new Error(i.error??"Ein Indexlauf ist bereits unterwegs.");if(!n.ok)throw new Error(`Indizieren: HTTP ${n.status}`);if(!(i!=null&&i.ok))throw new Error("Indizieren: unvollständige Antwort.");return i.result!==void 0&&i.result!==null?i.result:g3(t,e)}const ky="plugbrain.auth_token",zp="plugbrain.agent_id";function v3(){var t,e;try{return((e=(t=window.__PLUGBRAIN__)==null?void 0:t.token)==null?void 0:e.trim())??""}catch{return""}}function Xy(){var n,i;let t="";try{t=((n=new URLSearchParams(window.location.search).get("token"))==null?void 0:n.trim())??""}catch{}if(t)return Wy(t),t;const e=v3();if(e)return e;try{return((i=localStorage.getItem(ky))==null?void 0:i.trim())??""}catch{return""}}function Wy(t){try{localStorage.setItem(ky,t)}catch{}}function Ro(){try{const t=new URLSearchParams(window.location.search).get("agent");return t?(localStorage.setItem(zp,t),t):localStorage.getItem(zp)||"agy"}catch{return"agy"}}function _3(t){try{localStorage.setItem(zp,t)}catch{}}function Co(){const t=Xy(),e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["x-plug-auth-token"]=t),e}async function x3(t){const e=await fetch(`/api/git?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Git-Status HTTP ${e.status}`);return e.json()}async function S3(t){const e=await fetch(`/api/mesh?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Mesh HTTP ${e.status}`);const n=await e.json(),i=n==null?void 0:n.mesh;if(!(n!=null&&n.ok)||!i||i.workspaceId!==t||!Array.isArray(i.nodes)||!Array.isArray(i.edges))throw new Error("Mesh-Projektion unvollständig oder für einen anderen Workspace");return i}async function y3(t,e={}){const n=new URLSearchParams({workspace:t});e.agentId&&n.set("agentId",e.agentId),e.taskId&&n.set("taskId",e.taskId),e.workerId&&n.set("workerId",e.workerId),e.limit!==void 0&&n.set("limit",String(e.limit));const i=await fetch(`/api/mesh/timeline?${n}`);if(!i.ok)throw new Error(`Mesh-Zeitleiste HTTP ${i.status}`);const a=await i.json();if(!(a!=null&&a.ok)||!Array.isArray(a.timeline))throw new Error("Mesh-Zeitleiste unvollständig");return a.timeline}async function M3(t,e){const n=await fetch(`/api/provenance?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Provenance HTTP ${n.status}`);return n.json()}async function b3(t,e=Ro(),n="AGY"){const i=await fetch("/api/agent/attach",{method:"POST",headers:Co(),body:JSON.stringify({workspace:t,agentId:e,name:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Agent Attach HTTP ${i.status}`)}return i.json()}const mu=new Map;function jy(t,e=Ro()){const n=`${t}\0${e}`,i=mu.get(n);if(i)return i;const a=b3(t,e).then(()=>{}).catch(()=>{mu.delete(n)});return mu.set(n,a),a}function E3(){mu.clear()}async function T3(t,e,n=Ro()){await jy(t,n);const i=await fetch("/api/agent/search",{method:"POST",headers:Co(),body:JSON.stringify({workspace:t,agentId:n,query:e})});if(!i.ok){const s=await i.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Search HTTP ${i.status}`)}const a=await i.json();return Array.isArray(a==null?void 0:a.hits)?a.hits:[]}async function A3(t,e,n=Ro()){await jy(t,n);const i=await fetch("/api/agent/read",{method:"POST",headers:Co(),body:JSON.stringify({workspace:t,agentId:n,path:e})});if(!i.ok){const s=await i.json().catch(()=>null),r=(s==null?void 0:s.error)??`HTTP ${i.status}`;return{ok:!1,path:e,content:"",bytes:0,lang:null,error:r}}const a=await i.json();return{ok:!0,path:a.path??e,content:a.content??"",bytes:a.bytes??0,lang:a.lang??null}}async function jv(t,e,n=Ro()){const i=await fetch("/api/context/pack",{method:"POST",headers:Co(),body:JSON.stringify({workspaceId:t,goal:e,agentId:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Context Pack HTTP ${i.status}`)}return i.json()}async function w3(t){const e=await fetch(`/api/context/pack/${encodeURIComponent(t)}/staleness`);if(!e.ok){const n=await e.json().catch(()=>null);throw new Error((n==null?void 0:n.error)??`Staleness HTTP ${e.status}`)}return e.json()}async function R3(t,e){const n=await fetch(`/api/notes/query?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}`,{headers:Co()});if(!n.ok){const i=await n.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Notes Query HTTP ${n.status}`)}return n.json()}async function C3(t,e,n=30){const i=await fetch(`/api/notes/search?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}&limit=${n}&lines=1`,{headers:Co()});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Notizsuche HTTP ${i.status}`)}return i.json()}async function N3(t,e){const n=await fetch(`/api/notes/backlinks?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.backlinks)?i.backlinks:[]}const jt=[],ss=[],_a=[],Pl=[],_l={},gn=[],gu=[],ji=7.2,Xr=6,zl=["--k1","--k2","--k3","--k4","--k5","--k6"],eg=t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),D3=t=>t.agentColor||eg(zl[(t.ki??0)%zl.length]),qv=t=>eg(zl[t.ki%zl.length]),qy=new Map;let Yy="loc";function U3(t){Yy=t}const L3=t=>{const e=Math.max(1,...jt.map(i=>i.loc)),n=Math.max(1,...jt.map(i=>i.usedBy.length));return t.dying?0:Yy==="loc"?1.5+t.loc/e*26:1.5+t.usedBy.length/n*26},Ip=new Set,O3=t=>(Ip.add(t),()=>Ip.delete(t)),go=()=>Ip.forEach(t=>t());function Bp(t,e,n="ok"){gu.unshift({t:new Date,ws:t,msg:e,kind:n,id:Math.random().toString(36).slice(2)}),gu.length>60&&gu.pop()}function Tf(){var o;let e=0,n=0,i=0;const a=Pl.filter(l=>gn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=jt.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=gn.find(g=>g.id===l))!=null&&o.dying))continue;const f=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),h=f*ji+Xr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/f))*ji+Xr;n+h>74&&n>0&&(e+=i,n=0,i=0);let p=_a.find(g=>g.dir===l);p||(p={dir:l,x:n+h/2,z:e+u/2,w:.01,h:.01},_a.push(p)),Object.assign(p,{tx:n,tz:e,tw:h,th:u,cols:f}),s.add(l),n+=h,i=Math.max(i,u)}const r=_a.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(f=>f.tx+f.tw))/2,c=Math.max(...r.map(f=>f.tz+f.th))/2;for(const f of r)f.tx-=l,f.tz-=c;for(const f of r)jt.filter(u=>u.dir===f.dir).forEach((u,p)=>{u.tx=f.tx+Xr/2+p%f.cols*ji+ji/2,u.tz=f.tz+Xr/2+Math.floor(p/f.cols)*ji+ji/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=_a.length-1;l>=0;l--)!s.has(_a[l].dir)&&!jt.some(c=>c.dir===_a[l].dir)&&_a.splice(l,1);for(const l of a)qy.set(l,.5)}function P3(t,e,n=!1){let i=gn.find(a=>a.id===t);return i||(i={id:t,name:e||t,ki:gn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},gn.push(i),Pl.includes(t)||Pl.push(t),Bp(e||t,"workspace registered","reg"),Tf(),go(),i)}function z3(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=e.split("/").pop(),c=e.includes("/")&&e.startsWith(t.id+"/")?e:`${t.id}/${e}`;let f=_l[c];if(f)return f.loc+=Math.max(2,Math.round(n*.25)),f.pulse=1,s&&(f.agentColor=s,f.agentName=r,f.access=o),f;f={path:c,name:l,dir:t.id,top:t.id,ki:t.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let h of i){h.includes("/")||(h=`${t.id}/${h}`);const u=_l[h];u&&(f.deps.push(h),ss.push({from:f,to:u}),u.usedBy.push(c))}return jt.push(f),_l[c]=f,Tf(),go(),f}function I3(){let t=!1;for(let e=jt.length-1;e>=0;e--){const n=jt[e];if(n.dying&&n.h<.25){jt.splice(e,1),delete _l[n.path],t=!0;for(let i=ss.length-1;i>=0;i--)(ss[i].from===n||ss[i].to===n)&&ss.splice(i,1);for(const i of jt){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let e=gn.length-1;e>=0;e--){const n=gn[e];if(n.dying&&!jt.some(i=>i.dir===n.id)){gn.splice(e,1);const i=Pl.indexOf(n.id);i>=0&&Pl.splice(i,1),t=!0}}t&&(Tf(),go())}setInterval(()=>{let t=!1;for(const e of gn)e.load>.01&&(e.load*=.82,t=!0);t&&go()},600);const il={register({id:t,name:e}={}){return t?P3(String(t),e&&String(e),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=gn.find(c=>c.id===t);return!l||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,z3(l,{path:e,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(t,e){const n=gn.find(a=>a.id===t);if(!n)return;const i=jt.filter(a=>a.dir===t&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Bp(n.name,String(e||"event")),go()},unregister(t){const e=gn.find(n=>n.id===t);e&&(e.dying=!0,jt.filter(n=>n.dir===t).forEach(n=>{n.dying=!0}),Bp(e.name,"workspace unregistered","sys"),Tf(),go())},list:()=>gn.map(t=>({id:t.id,name:t.name,buildings:jt.filter(e=>e.dir===t.id).length})),simulated:()=>!1};window.PlugBrainCity=il;const B3=1024,F3=2048,Yv=96,Zv=new Map;function H3(t){if(!t.agentColor)return null;const e=t.agentColor+(t.access||"");let n=Zv.get(e);if(!n){n=new rt;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(t.agentColor);if(i){const a=t.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(t.agentColor)}catch{n.setHSL(0,0,.5)}Zv.set(e,n)}return n}function G3(t,e,n,{onSelect:i,onZoom:a}){let s;try{s=new Hy({antialias:!0,alpha:!0,canvas:t})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new yy,o=new $m(-1,1,1,-1,-400,600),l=`
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
  }`,f=new Js(1,1,1),h=new bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=B3,p=new cv(f,h,u);p.frustumCulled=!1;let g=new kr(new Float32Array(u*3),3),b=new kr(new Float32Array(u*2),2);f.setAttribute("aColor",g),f.setAttribute("aHi",b),r.add(p);const _=new tA(f),d=new wy({color:3814695,transparent:!0,opacity:.3});let S=[];for(let Se=0;Se<u;Se++){const B=new hu(_,d);B.visible=!1,S.push(B),r.add(B)}const M=(Se,B)=>{let K=Math.max(1,Se);for(;K<B;)K*=2;return K};function x(Se){if(Se<=u)return;const B=M(u,Se),K=p,ae=S,A=new cv(f,h,B);A.frustumCulled=!1,A.count=0;const v=new kr(new Float32Array(B*3),3),G=new kr(new Float32Array(B*2),2);f.setAttribute("aColor",v),f.setAttribute("aHi",G);const X=[];for(let Z=0;Z<B;Z++){const ce=new hu(_,d);ce.visible=!1,X.push(ce),r.add(ce)}r.remove(K);for(const Z of ae)r.remove(Z);p=A,g=v,b=G,S=X,u=B}const w=()=>new bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),N=[],T=new Js(1,1,1);for(let Se=0;Se<Yv;Se++){const B=new Ci(T,w());B.visible=!1,N.push(B),r.add(B)}const y=3;let C=F3,R=new Float32Array(C*y*3),D=new Float32Array(C*y);const O=new Rn;O.setAttribute("position",new yt(R,3)),O.setAttribute("aA",new yt(D,1));const H=new Up(O,new bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));H.frustumCulled=!1,r.add(H);let L=new Float32Array(C*6),P=new Float32Array(C*2);const I=new Rn;I.setAttribute("position",new yt(L,3)),I.setAttribute("aA",new yt(P,1));const z=new hu(I,new bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));z.frustumCulled=!1,r.add(z);function U(Se){Se<=C||(C=M(C,Se),R=new Float32Array(C*y*3),D=new Float32Array(C*y),L=new Float32Array(C*6),P=new Float32Array(C*2),O.setAttribute("position",new yt(R,3)),O.setAttribute("aA",new yt(D,1)),I.setAttribute("position",new yt(L,3)),I.setAttribute("aA",new yt(P,1)))}const k={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},re=Math.atan(1/Math.SQRT2);let le=!1,_e=0,ke=0,Ze=!0;const Fe={x:-1,y:-1,live:!1};t.addEventListener("pointerdown",Se=>{le=!0,ke=0,_e=Se.clientX,t.setPointerCapture(Se.pointerId),t.classList.add("drag")}),t.addEventListener("pointerup",Se=>{le=!1,t.classList.remove("drag"),t.releasePointerCapture(Se.pointerId)}),t.addEventListener("pointermove",Se=>{const B=t.getBoundingClientRect();Fe.x=Se.clientX-B.left,Fe.y=Se.clientY-B.top,Fe.live=!0,le&&(ke+=Math.abs(Se.clientX-_e),k.tYaw-=(Se.clientX-_e)*.006,_e=Se.clientX,Ze=!1,ft(!1))}),t.addEventListener("pointerleave",()=>{Fe.live=!1});const ie=k.tZoom,ve=()=>a(Math.round(ie/k.tZoom*100)),pe=Se=>{k.tZoom=Math.max(4,Math.min(60,k.tZoom*Se)),ve()};t.addEventListener("wheel",Se=>{Se.preventDefault(),pe(1+Math.sign(Se.deltaY)*.11)},{passive:!1}),ve();let Ce=null,Ie=null,Be=null,Mt="",je=null,ft=()=>{};t.addEventListener("click",()=>{ke>5||i(Ce&&Ie!==Ce?Ce:null)});const nt=zl.map(Se=>new rt(eg(Se)||"#8a4b2a")),et=new j,Ot=new It,Ct=new rt;let Xt=!0,_t=performance.now();function bt(Se){requestAnimationFrame(bt);const B=Math.min(.05,(Se-_t)/1e3);_t=Se;const K=e.clientWidth,ae=e.clientHeight;if(!K||!ae)return;t.width!==Math.round(K*s.getPixelRatio())&&s.setSize(K,ae,!1);const A=1-Math.pow(.002,B);I3(),x(jt.length),U(ss.length),Ze&&(k.tYaw+=B*.12),k.yaw+=(k.tYaw-k.yaw)*A,k.zoom+=(k.tZoom-k.zoom)*A;const v=k.zoom*4,G=v*(K/ae);o.left=-G,o.right=G,o.top=v,o.bottom=-v,o.updateProjectionMatrix();const X=180;o.position.set(Math.cos(k.yaw)*Math.cos(re)*X,Math.sin(re)*X,Math.sin(k.yaw)*Math.cos(re)*X),o.lookAt(0,6,0);for(let W=0;W<Yv;W++){const ee=N[W],ue=_a[W];if(!ue||W>=_a.length){ee.visible=!1;continue}ue.x=ue.x===void 0?ue.tx+ue.tw/2:ue.x,ue.z=ue.z===void 0?ue.tz+ue.th/2:ue.z;const de=ue.tx+ue.tw/2,me=ue.tz+ue.th/2;ue.x+=(de-ue.x)*A,ue.z+=(me-ue.z)*A,ue.w+=(ue.tw-ue.w)*A,ue.h+=(ue.th-ue.h)*A,ee.visible=!0,ee.position.set(ue.x,-.25,ue.z),ee.scale.set(Math.max(.01,ue.w-Xr*.45),.5,Math.max(.01,ue.h-Xr*.45))}const Z=Ie?new Set([Ie.path,...Ie.deps,...Ie.usedBy]):null,ce=Ie||Ce||Be,he=jt.length;p.count=he;for(let W=0;W<he;W++){const ee=jt[W];ee.x!==ee.tx&&(ee.x+=(ee.tx-ee.x)*A*.7),ee.z!==ee.tz&&(ee.z+=(ee.tz-ee.z)*A*.7);const ue=L3(ee);ee.h=ee.h===void 0?ue:ee.h+(ue-ee.h)*(ee.dying?A*1.4:A*.6),ee.pulse=Math.max(0,(ee.pulse||0)-B*1.6),Ot.makeScale(ji*.68,Math.max(.01,ee.h),ji*.68),Ot.setPosition(ee.x,ee.h/2,ee.z),p.setMatrixAt(W,Ot);const de=S[W];de.visible=!0,de.scale.set(ji*.68,Math.max(.01,ee.h),ji*.68),de.position.set(ee.x,ee.h/2,ee.z);const me=H3(ee);me?Ct.copy(me):Ct.copy(nt[(ee.ki??0)%nt.length]).offsetHSL(0,0,(qy.get(ee.dir)-.5)*.17),g.array[W*3]=Ct.r,g.array[W*3+1]=Ct.g,g.array[W*3+2]=Ct.b;const Re=ee===ce?1:Math.min(.85,ee.pulse||0);let Le=Z?Z.has(ee.path)?0:1:Mt&&!ee.path.toLowerCase().includes(Mt)?1:0;!Z&&!Mt&&je&&(Le=ee.top===je?0:1),b.array[W*2]+=(Re-b.array[W*2])*A,b.array[W*2+1]+=(Le-b.array[W*2+1])*A}for(let W=he;W<u;W++)S[W].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=b.needsUpdate=!0;const Q=ss.length;I.setDrawRange(0,Q*2),O.setDrawRange(0,Q*y);for(let W=0;W<Q;W++){const ee=ss[W],ue=ee.from,de=ee.to,me=W*6;L[me]=ue.x,L[me+1]=ue.h,L[me+2]=ue.z,L[me+3]=de.x,L[me+4]=de.h,L[me+5]=de.z;const Re=!Z||Z.has(ue.path)&&Z.has(de.path),Le=Ie&&(ue===Ie||de===Ie),Ge=Le?.55:Re?.1:.02;P[W*2]+=(Ge-P[W*2])*A,P[W*2+1]=P[W*2];for(let F=0;F<y;F++){const ge=W*y+F,te=(Se/2600+(W*.37+F/y))%1,$=Math.sin(te*Math.PI)*Math.hypot(de.x-ue.x,de.z-ue.z)*.22;R[ge*3]=ue.x+(de.x-ue.x)*te,R[ge*3+1]=ue.h+(de.h-ue.h)*te+$+1.2,R[ge*3+2]=ue.z+(de.z-ue.z)*te,D[ge]=(Xt?1:0)*(Le?1:Re?.45:.06)*Math.sin(te*Math.PI)}}if(I.getAttribute("position").needsUpdate=!0,I.getAttribute("aA").needsUpdate=!0,O.getAttribute("position").needsUpdate=!0,O.getAttribute("aA").needsUpdate=!0,H.material.uniforms.uPx.value=3.4*s.getPixelRatio(),Fe.live&&!le){let W=null,ee=26*26;for(let ue=0;ue<he;ue++){const de=jt[ue];if(de.dying||de.h<1)continue;et.set(de.x,de.h*.6,de.z).project(o);const me=(et.x*.5+.5)*K,Re=(-et.y*.5+.5)*ae,Le=(me-Fe.x)**2+(Re-Fe.y)**2;Le<ee&&(ee=Le,W=de,de.sx=me,de.sy=Re)}Ce=W,t.style.cursor=le?"grabbing":W?"pointer":"grab"}else Fe.live||(Ce=null);Ce?(n.style.display="block",n.style.left=Ce.sx+"px",n.style.top=Ce.sy+"px",n.innerHTML=`<b>${Ce.name}</b> · ${Ce.loc} lines<br>${Ce.dir} · referenced by ${Ce.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(bt),{setFlow:Se=>{Xt=Se},setHatch:Se=>{h.uniforms.uHatch.value=Se?1:0},setSpin:Se=>{Ze=Se},spinning:()=>Ze,onSpinChange:Se=>{ft=Se},dolly:pe,reset:()=>{k.tYaw=Math.PI*.25,k.tZoom=ie,ve()},setSel:Se=>{Ie=Se},setRailHover:Se=>{Be=Se},setQuery:Se=>{Mt=Se},setFocusTop:Se=>{je=Se}}}const Tr=new Map;function Kv(t){var n,i;const e=((n=t==null?void 0:t.properties)==null?void 0:n.path)||((i=t==null?void 0:t.properties)==null?void 0:i.filePath)||(t==null?void 0:t.uri);return typeof e=="string"&&e.length>0?e:null}function V3(t){var i,a,s;const e=((i=t==null?void 0:t.properties)==null?void 0:i.loc)??((a=t==null?void 0:t.properties)==null?void 0:a.lines)??((s=t==null?void 0:t.properties)==null?void 0:s.size),n=Number(e);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function k3(t){const n=String(t).replace(/\\/g,"/").split("/");return n[0]==="Code"&&n[1]?n[1].split("--")[0]:["Master","Roadmap","Auftrag","Planung","Codebasis","PLUG-Ordner","Aufräumen"].includes(n[0])?n[0]:"plugpt-vault"}function X3(t){var c;const e=t==null?void 0:t.workspace,n=(c=t==null?void 0:t.graph)==null?void 0:c.nodes;if(!(e!=null&&e.id)||!Array.isArray(n))return{workspaces:Tr.size,buildings:0,added:0};for(const f of gn.slice())f.sim&&il.unregister(f.id);const i=Array.isArray(t.graph.edges)?t.graph.edges:[],a=new Map(n.filter(f=>f&&typeof f.id=="string").map(f=>[f.id,f])),s=new Map;for(const f of i){const h=a.get(f==null?void 0:f.sourceId),u=a.get(f==null?void 0:f.targetId);if(!h||!u)continue;const p=Kv(u);p&&(s.has(h.id)||s.set(h.id,[]),s.get(h.id).push(p))}const r=[];for(const f of n){const h=Kv(f);h&&r.push({node:f,path:h})}r.sort((f,h)=>f.path.localeCompare(h.path));let o=0,l=0;for(const{node:f,path:h}of r){const u=k3(h);Tr.has(u)||(il.register({id:u,name:u}),Tr.set(u,new Set));const p=Tr.get(u);if(p.has(h))continue;p.add(h),l+=p.size;const g=f.properties||{};il.grow(u,{path:h,loc:V3(f),deps:s.get(f.id)||[],note:f.type||"",agentColor:g.agentColor||g.readerColor||null,agentName:g.agentName||g.readerName||null,access:g.agentColor?"write":g.readerColor?"read":null}),o+=1}return o>0&&il.event(String(e.id),`${o} indexed object${o===1?"":"s"} added across ${Tr.size} districts`),{workspaces:Tr.size,buildings:l,added:o,total:r.length,truncated:!1}}function W3({snapshot:t,onSelectFile:e}){se.useEffect(()=>{t&&X3(t)},[t]);const[n,i]=se.useState(!0),[a,s]=se.useState("loc"),[r,o]=se.useState(!0),[l,c]=se.useState(!0),[f,h]=se.useState(!0),[u,p]=se.useState(100),[g,b]=se.useState(null),[_,d]=se.useState(""),[S,M]=se.useState(null),[x,w]=se.useState(!0),[,N]=se.useReducer(L=>L+1,0),T=se.useRef(null),y=se.useRef(null),C=se.useRef(null),R=se.useRef(null);se.useEffect(()=>{const L=G3(T.current,y.current,C.current,{onSelect:P=>b(P),onZoom:P=>p(P)});if(!L){i(!1);return}R.current=L,L.onSpinChange(P=>h(P))},[]),se.useEffect(()=>{const L=O3(()=>N());return()=>{L()}},[]),se.useEffect(()=>{!g&&jt.length>0&&b(jt[0])},[jt.length,g]),se.useEffect(()=>{var L;(L=R.current)==null||L.setSel(g)},[g]),se.useEffect(()=>{var L;(L=R.current)==null||L.setQuery(_)},[_]),se.useEffect(()=>{var L;(L=R.current)==null||L.setFocusTop(S)},[S]),se.useEffect(()=>{const L=P=>{var z,U;const I=P.target;if(/^(INPUT|TEXTAREA)$/.test(I.tagName)){P.key==="Escape"&&I.blur();return}P.key==="Escape"?(b(null),M(null)):P.key==="="||P.key==="+"?(z=R.current)==null||z.dolly(.8474576271186441):P.key==="-"||P.key==="_"?(U=R.current)==null||U.dolly(1.18):(P.key==="e"||P.key==="E")&&w(k=>!k)};return addEventListener("keydown",L),()=>removeEventListener("keydown",L)},[]);const D=jt.reduce((L,P)=>L+P.loc,0),O=gn.reduce((L,P)=>L+P.events,0),H=(L,P)=>P.length?m.jsxs(m.Fragment,{children:[m.jsxs("h3",{children:[L+" ",m.jsx("span",{style:{color:"var(--faint)"},children:P.length})]}),P.map(I=>{const z=_l[I];return z&&m.jsxs("div",{className:"dep","data-p":I,onClick:()=>b(z),children:[m.jsx("span",{className:"sw",style:{background:D3(z)}}),m.jsx("span",{children:I})]},I)})]}):null;return m.jsxs("div",{id:"app",className:g?void 0:"closed",children:[m.jsxs("aside",{children:[m.jsxs("div",{className:"hd",children:[m.jsx("h1",{children:"PlugBrain City"}),m.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),m.jsxs("div",{className:"kpis",children:[m.jsxs("div",{children:[m.jsx("b",{id:"k-ws",children:gn.length}),m.jsx("i",{children:"workspaces"})]}),m.jsxs("div",{children:[m.jsx("b",{id:"k-bld",children:jt.length}),m.jsx("i",{children:"buildings"})]}),m.jsxs("div",{children:[m.jsx("b",{id:"k-ev",children:O}),m.jsx("i",{children:"events"})]})]})]}),m.jsx("div",{className:"q",children:m.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:L=>d(L.target.value.trim().toLowerCase())})}),m.jsx("div",{className:"tree",id:"tree",children:gn.length?gn.map(L=>{const P=jt.filter(z=>z.dir===L.id),I=P.reduce((z,U)=>z+U.loc,0);return m.jsxs("div",{className:"ws"+(S===L.id?" on":"")+(L.dying?" dying":""),onClick:()=>M(z=>z===L.id?null:L.id),children:[m.jsxs("div",{className:"wsrow",children:[m.jsx("span",{className:"sw",style:{background:qv(L)}}),m.jsx("span",{className:"nm",children:L.name}),L.sim?m.jsx("span",{className:"tag",children:"sim"}):null,m.jsxs("span",{className:"lc",children:[P.length," bld · ",I]})]}),m.jsx("div",{className:"loadbar",children:m.jsx("i",{style:{width:Math.round(L.load*100)+"%",background:qv(L)}})})]},L.id)}):m.jsxs("div",{className:"empty",children:["No workspaces registered.",m.jsx("br",{}),m.jsx("br",{}),m.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),m.jsxs("div",{id:"stage",ref:y,children:[m.jsx("canvas",{id:"cv",ref:T}),m.jsx("div",{id:"tip",ref:C}),m.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",m.jsx("b",{id:"crumb-t",children:g?g.path.toUpperCase():S?S.toUpperCase():"CITY OVERVIEW"})]}),x&&m.jsx("div",{id:"feed",children:gu.slice(0,9).map(L=>m.jsxs("div",{className:"fe",children:[m.jsx("span",{className:"ft",children:L.t.toLocaleTimeString("en-GB",{hour12:!1})}),m.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:L.ws}),m.jsx("span",{className:"fm",children:L.msg})]},L.id))}),m.jsx("div",{id:"legend",children:m.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${a==="loc"?"size":"references"} · flashes = activity`})}),m.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([L,P])=>m.jsx("button",{className:"tb"+(a===L?" on":""),"data-h":L,type:"button",onClick:()=>{U3(L),s(L)},children:P},L)),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb"+(r?" on":""),id:"t-flow",type:"button",onClick:()=>{o(L=>{var P;return(P=R.current)==null||P.setFlow(!L),!L})},children:"Flow"}),m.jsx("button",{className:"tb"+(l?" on":""),id:"t-hatch",type:"button",onClick:()=>{c(L=>{var P;return(P=R.current)==null||P.setHatch(!L),!L})},children:"Hatching"}),m.jsx("button",{className:"tb"+(f?" on":""),id:"t-spin",type:"button",onClick:()=>{h(L=>{var P;return(P=R.current)==null||P.setSpin(!L),!L})},children:"Orbit"}),m.jsx("button",{className:"tb"+(x?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>w(L=>!L),children:"Feed"}),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var L;return(L=R.current)==null?void 0:L.dolly(1.18)},children:"−"}),m.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var L;return(L=R.current)==null?void 0:L.reset()},children:u+"%"}),m.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var L;return(L=R.current)==null?void 0:L.dolly(1/1.18)},children:"＋"}),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var L;(L=R.current)==null||L.reset(),b(null),M(null)},children:"Reset"})]}),m.jsxs("div",{id:"gate",style:n?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",m.jsx("br",{}),"The workspace registry remains available."]})]}),m.jsx("div",{id:"side",children:m.jsx("div",{id:"dt",children:g&&m.jsxs("div",{className:"dt",children:[m.jsx("div",{className:"kind",children:g.dir+"/"}),m.jsx("h2",{children:g.name}),g.note?m.jsx("div",{className:"note",children:g.note}):null,e&&m.jsx("button",{type:"button",className:"btn primary",style:{marginTop:"10px",marginBottom:"14px",width:"100%",padding:"8px 12px"},onClick:()=>e(g.path),children:"📄 Datei in Quellansicht öffnen"}),m.jsxs("dl",{children:[m.jsx("dt",{children:"Size"}),m.jsx("dd",{children:g.loc}),m.jsx("dt",{children:"References"}),m.jsx("dd",{children:g.deps.length}),m.jsx("dt",{children:"Referenced by"}),m.jsx("dd",{children:g.usedBy.length}),m.jsx("dt",{children:"Share of total"}),m.jsx("dd",{children:D?(g.loc/D*100).toFixed(1)+"%":"—"})]}),H("References",g.deps),H("Referenced by",g.usedBy)]})})})]})}const Qv={agent:"Agent",task:"Aufgabe",worker:"Worker",worktree:"Worktree",file:"Datei",artifact:"Artefakt",route:"Route"},Jv={live:"Live-Ereignis",recovered:"wiederhergestelltes Ereignis","historical-import":"historischer Import"};function Xd(t){const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function Wd(t){if(t.kind!=="worker")return null;switch(t.proof){case"process-started":return"Start im Trace beobachtet — keine Aussage über den aktuellen Prozesszustand.";case"finished":return"Abschluss im Trace beobachtet.";case"proof-unavailable":return"Kein beobachteter Prozessstart; dieser Worker wird nicht als laufend dargestellt.";default:return"Kein Prozessbeweis vorhanden."}}function j3(t){const e=t.id.slice(t.id.indexOf(":")+1);return t.kind==="agent"?{agentId:e}:t.kind==="task"?{taskId:e}:t.kind==="worker"?{workerId:e}:null}function $v(t,e){var n;return((n=t.find(i=>i.id===e))==null?void 0:n.label)??e}function q3({mesh:t,workspaceId:e,onSelectFile:n}){const[i,a]=se.useState(null),[s,r]=se.useState([]),[o,l]=se.useState(!1),[c,f]=se.useState(""),h=se.useMemo(()=>(t==null?void 0:t.nodes.find(p=>p.id===i))??null,[t,i]);return se.useEffect(()=>{i!==null&&h===null&&a(null)},[h,i]),se.useEffect(()=>{const p=h?j3(h):null;if(!e||p===null){r([]),f(""),l(!1);return}let g=!0;return l(!0),f(""),y3(e,{...p,limit:12}).then(b=>{g&&r(b)}).catch(()=>{g&&(r([]),f("Die Trace-Zeitleiste ist derzeit nicht verfügbar."))}).finally(()=>{g&&l(!1)}),()=>{g=!1}},[h,e]),e?t===null||t.workspaceId!==e?m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Die Core-Trace-Projektion ist für diesen Workspace noch nicht verfügbar."}),m.jsx("p",{className:"mesh-trace__muted",children:"Es werden weder Registry-Einträge noch historische Aktivitätszähler als Ersatz angezeigt."})]}):t.nodes.length===0&&t.edges.length===0?m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Für diesen Workspace wurde noch keine trace-gestützte Arbeit beobachtet."}),m.jsx("p",{className:"mesh-trace__muted",children:"Keine simulierten Agenten, keine Roster-Fallbacks und kein daraus abgeleiteter Prozessstatus."})]}):m.jsxs("section",{className:"mesh-trace","aria-label":"Trace-backed Agent Mesh",children:[m.jsxs("header",{className:"mesh-trace__header",children:[m.jsxs("div",{children:[m.jsxs("h2",{children:["Agent Mesh ",m.jsx("span",{children:"Trace-backed"})]}),m.jsx("p",{children:"Jeder Knoten und jede Kante stammt aus einem autoritätsbestätigten Trace-Ereignis."})]}),m.jsxs("dl",{className:"mesh-trace__totals",children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Knoten"}),m.jsx("dd",{children:t.totals.nodes??t.nodes.length})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Kanten"}),m.jsx("dd",{children:t.totals.edges??t.edges.length})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"ohne Startbeweis"}),m.jsx("dd",{children:t.unprovenWorkers.length})]})]})]}),t.unprovenWorkers.length>0&&m.jsxs("aside",{className:"mesh-trace__notice","aria-label":"Unproven workers",children:[m.jsx("strong",{children:"Unbelegte Worker werden nicht als laufend angezeigt."}),m.jsx("ul",{children:t.unprovenWorkers.map(p=>m.jsxs("li",{children:[m.jsx("code",{children:p.workerId}),p.taskId?m.jsxs(m.Fragment,{children:[" · Aufgabe ",m.jsx("code",{children:p.taskId})]}):""," — ",p.reason]},p.workerId))})]}),m.jsxs("div",{className:"mesh-trace__grid",children:[m.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace nodes",children:[m.jsxs("h3",{children:["Knoten ",m.jsx("span",{children:t.nodes.length})]}),m.jsx("ol",{className:"mesh-trace__nodes",children:t.nodes.map(p=>{const g=Wd(p),b=p.id===i;return m.jsx("li",{children:m.jsxs("button",{type:"button",className:b?"mesh-trace__node is-selected":"mesh-trace__node",onClick:()=>a(p.id),"aria-pressed":b,children:[m.jsx("span",{className:"mesh-trace__kind",children:Qv[p.kind]}),m.jsx("span",{className:"mesh-trace__label",title:p.label,children:p.label}),m.jsxs("span",{className:"mesh-trace__events",children:[p.eventCount," Ereignis",p.eventCount===1?"":"se"]}),m.jsx("span",{className:"mesh-trace__provenance",title:"Ereignis-Provenienz, nicht aktueller Prozessstatus",children:Jv[p.provenance]}),g&&m.jsx("span",{className:"mesh-trace__proof",children:g})]})},p.id)})})]}),m.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace edges",children:[m.jsxs("h3",{children:["Kanten ",m.jsx("span",{children:t.edges.length})]}),m.jsx("ol",{className:"mesh-trace__edges",children:t.edges.map(p=>m.jsxs("li",{children:[m.jsx("span",{className:"mesh-trace__edge-kind",children:p.kind}),m.jsx("span",{title:p.from,children:$v(t.nodes,p.from)}),m.jsx("span",{"aria-hidden":"true",children:"→"}),m.jsx("span",{title:p.to,children:$v(t.nodes,p.to)}),m.jsxs("small",{children:[p.count," Ereignis",p.count===1?"":"se"," · Belege: ",p.evidence.join(", ")]})]},p.id))})]})]}),h&&m.jsxs("aside",{className:"mesh-trace__detail","aria-label":"Details for "+h.label,children:[m.jsxs("div",{className:"mesh-trace__detail-head",children:[m.jsxs("div",{children:[m.jsx("span",{className:"mesh-trace__kind",children:Qv[h.kind]}),m.jsx("h3",{children:h.label})]}),m.jsx("button",{type:"button",onClick:()=>a(null),"aria-label":"Detailansicht schließen",children:"×"})]}),m.jsxs("dl",{children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Erstmals"}),m.jsx("dd",{children:Xd(h.firstSeen)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Zuletzt"}),m.jsx("dd",{children:Xd(h.lastSeen)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Provenienz"}),m.jsx("dd",{children:Jv[h.provenance]})]}),Wd(h)&&m.jsxs("div",{children:[m.jsx("dt",{children:"Worker-Beweis"}),m.jsx("dd",{children:Wd(h)})]}),Object.entries(h.detail).map(([p,g])=>m.jsxs("div",{children:[m.jsx("dt",{children:p}),m.jsx("dd",{children:g??"—"})]},p))]}),h.kind==="file"&&n&&m.jsx("button",{type:"button",className:"mesh-trace__source",onClick:()=>n(h.label),children:"Datei im Source-View öffnen"}),m.jsxs("section",{className:"mesh-trace__timeline","aria-label":"Trace timeline",children:[m.jsx("h4",{children:"Beobachtete Ereignisse"}),o&&m.jsx("p",{children:"Lade Trace-Ereignisse …"}),c&&m.jsx("p",{role:"status",children:c}),!o&&!c&&s.length===0&&m.jsx("p",{children:"Für diesen Knotentyp gibt es keine gefilterte Zeitleiste."}),m.jsx("ol",{children:s.map(p=>m.jsxs("li",{children:[m.jsx("code",{children:p.type})," ",m.jsx("time",{dateTime:p.occurredAt,children:Xd(p.occurredAt)}),m.jsx("span",{children:p.summary})]},p.eventId))})]})]})]}):m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Wähle einen registrierten Workspace. Ohne Workspace kann keine Trace-Projektion behauptet werden."})]})}function Y3({tasks:t,depth:e}){if(t.length===0)return m.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});t.filter(s=>s.state==="pending");const n=t.filter(s=>s.state==="claimed"),i=t.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return m.jsxs("div",{className:"queue",children:[m.jsxs("div",{className:"queue__figures",children:[m.jsx(Wc,{value:e,label:"WARTEND",tone:e>8?"hot":void 0}),m.jsx(Wc,{value:n.length,label:"IN ARBEIT"}),m.jsx(Wc,{value:i.length,label:"GELIEFERT"}),m.jsx(Wc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),m.jsx("ol",{className:"queue__list",children:t.map(s=>m.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[m.jsx("span",{className:"queue__state",children:Z3[s.state]??s.state}),m.jsx("span",{className:"queue__title",title:s.title,children:s.title}),m.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&m.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&m.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const Z3={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function Wc({value:t,label:e,tone:n}){return m.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[m.jsx("strong",{children:t}),m.jsx("span",{children:e})]})}const K3=8e3;function Q3(t,e=K3){return new Promise((n,i)=>{const a=globalThis.setTimeout(()=>{i(new Error(`Brain-Dateiabruf hat nach ${e/1e3} Sekunden nicht geantwortet. Bitte nach dem Indexlauf erneut versuchen.`))},e);t.then(s=>{globalThis.clearTimeout(a),n(s)},s=>{globalThis.clearTimeout(a),i(s)})})}function Ar({workspaceId:t,path:e,highlightLine:n,onClose:i,onNavigateFile:a}){const[s,r]=se.useState(!0),[o,l]=se.useState(null),[c,f]=se.useState(null),[h,u]=se.useState(null),[p,g]=se.useState([]),b=se.useRef(null);if(se.useEffect(()=>{let M=!0;return r(!0),l(null),f(null),u(null),g([]),Q3(A3(t,e)).then(x=>{M&&(l(x),r(!1))}).catch(x=>{M&&(l({ok:!1,path:e,content:"",bytes:0,lang:null,error:String((x==null?void 0:x.message)??x)}),r(!1))}),x3(t).then(x=>{M&&f(x)}).catch(()=>{}),M3(t,e).then(x=>{M&&u(x)}).catch(()=>{}),N3(t,e).then(x=>{M&&g(x)}).catch(()=>{}),()=>{M=!1}},[t,e]),se.useEffect(()=>{!s&&b.current&&b.current.scrollIntoView({behavior:"smooth",block:"center"})},[s,n]),s)return m.jsxs("div",{className:"source-container source-container--loading",children:[m.jsx("div",{className:"source-spinner"}),m.jsxs("p",{children:["Lade Dateiinhalt aus dem Brain (",e,") …"]})]});if(!o||!o.ok)return m.jsxs("div",{className:"source-container source-container--error",role:"alert",children:[m.jsxs("div",{className:"source-header",children:[m.jsx("span",{className:"source-header__path mono",children:e}),i&&m.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Schließen",children:"✕"})]}),m.jsxs("div",{className:"source-error-box",children:[m.jsx("div",{className:"source-error-icon",children:"⚠️"}),m.jsx("h3",{children:"Fehler beim Laden der Datei"}),m.jsx("p",{className:"source-error-msg",children:(o==null?void 0:o.error)||"Die Datei existiert nicht im Workspace oder der Pfad ist ungültig."}),m.jsxs("div",{className:"source-error-details mono",children:["Workspace: ",t,m.jsx("br",{}),"Pfad: ",e]})]})]});const _=o.content.split(/\r?\n/),d=_.length,S=c!=null&&c.head?c.head.slice(0,8):null;return m.jsxs("div",{className:"source-container",children:[m.jsxs("div",{className:"source-header",children:[m.jsxs("div",{className:"source-header__meta",children:[m.jsx("span",{className:"source-header__icon",children:"📄"}),m.jsx("span",{className:"source-header__path mono",title:o.path,children:o.path}),o.lang&&m.jsx("span",{className:"source-badge source-badge--lang",children:o.lang}),m.jsxs("span",{className:"source-badge source-badge--info",children:[d," Zeilen · ",o.bytes," B"]}),S&&m.jsxs("span",{className:"source-badge source-badge--git",title:`Git Revision: ${c==null?void 0:c.head}`,children:["git: ",S," (",(c==null?void 0:c.branch)??"detached",")"]}),(h==null?void 0:h.owner)&&m.jsxs("span",{className:"source-badge source-badge--agent",style:{borderColor:h.owner.color},title:`Zuletzt geändert durch ${h.owner.name} (${h.owner.at})`,children:[m.jsx("i",{style:{background:h.owner.color}}),h.owner.name]})]}),m.jsxs("div",{className:"source-header__actions",children:[n&&m.jsxs("span",{className:"source-badge source-badge--highlight",children:["Fokus: Zeile ",n]}),i&&m.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Quellansicht schließen",children:"✕"})]})]}),m.jsxs("div",{className:"source-body",children:[m.jsx("div",{className:"source-code-view",children:m.jsx("table",{className:"source-table",children:m.jsx("tbody",{children:_.map((M,x)=>{const w=x+1,N=n===w;return m.jsxs("tr",{ref:N?b:void 0,className:`source-line-row ${N?"source-line-row--highlight":""}`,children:[m.jsx("td",{className:"source-line-num mono","data-line":w,children:w}),m.jsx("td",{className:"source-line-code mono",children:m.jsx("pre",{children:M||" "})})]},w)})})})}),p.length>0&&m.jsxs("div",{className:"source-backlinks",style:{padding:"12px 16px",borderTop:"1px solid var(--line)",background:"rgba(255,255,255,0.02)"},children:[m.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["← Rückverweise / Backlinks (",p.length,")"]}),m.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:p.map((M,x)=>m.jsxs("div",{className:"search-hit-card",style:{padding:"6px 10px",fontSize:"11px",cursor:"pointer"},onClick:()=>a==null?void 0:a(M.path,M.line),title:`Zeile ${M.line} in ${M.path}`,children:[m.jsx("span",{className:"mono",style:{color:"var(--accent)"},children:M.path}),m.jsxs("span",{style:{color:"var(--faint)",marginLeft:"6px"},children:[":",M.line]}),M.alias&&m.jsxs("span",{style:{marginLeft:"4px",fontStyle:"italic"},children:["(",M.alias,")"]})]},x))})]})]})]})}function J3(t){const e={name:"",path:"",isDir:!0,children:new Map};for(const n of t){const i=n.path.split(/[\\/]/).filter(Boolean);let a=e;for(let s=0;s<i.length;s++){const r=i[s];if(s===i.length-1)a.children.set(r,{name:r,path:n.path,isDir:!1,children:new Map,file:n});else{let l=a.children.get(r);l||(l={name:r,path:i.slice(0,s+1).join("/"),isDir:!0,children:new Map},a.children.set(r,l)),a=l}}}return e}function $3({workspaceName:t,files:e,activePath:n,onSelectFile:i}){const[a,s]=se.useState(""),[r,o]=se.useState(new Set),l=se.useMemo(()=>J3(e),[e]),c=h=>{o(u=>{const p=new Set(u);return p.has(h)?p.delete(h):p.add(h),p})},f=(h,u=0)=>{var g,b,_;if(h.isDir){const d=r.has(h.path),S=Array.from(h.children.values()).sort((x,w)=>x.isDir!==w.isDir?x.isDir?-1:1:x.name.localeCompare(w.name)),M=a?S.filter(x=>x.path.toLowerCase().includes(a.toLowerCase())):S;return a&&M.length===0&&!h.name.toLowerCase().includes(a.toLowerCase())?null:m.jsxs("div",{className:"tree-dir-group",children:[h.name&&m.jsxs("div",{className:`tree-item tree-item--dir ${u===0?"tree-item--root":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>c(h.path),children:[m.jsx("span",{className:"tree-icon",children:d?"📁":"📂"}),m.jsx("span",{className:"tree-label",children:h.name}),m.jsx("span",{className:"tree-badge tree-badge--count",children:h.children.size})]}),(!d||a)&&m.jsx("div",{className:"tree-dir-children",children:M.map(x=>f(x,h.name?u+1:u))})]},h.path||"root")}const p=n===h.path;return a&&!h.path.toLowerCase().includes(a.toLowerCase())?null:m.jsxs("div",{className:`tree-item tree-item--file ${p?"tree-item--active":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>i(h.path),title:h.path,children:[m.jsx("span",{className:"tree-icon",children:"📄"}),m.jsx("span",{className:"tree-label mono",children:h.name}),((g=h.file)==null?void 0:g.lang)&&m.jsx("span",{className:"tree-badge tree-badge--lang",children:h.file.lang}),((b=h.file)==null?void 0:b.loc)!==void 0&&m.jsxs("span",{className:"tree-badge tree-badge--loc",children:[h.file.loc," L"]}),((_=h.file)==null?void 0:_.agent)&&m.jsx("span",{className:"tree-agent-dot",style:{background:h.file.agent.color},title:`Owner: ${h.file.agent.name}`})]},h.path)};return m.jsxs("div",{className:"explorer-view",children:[m.jsxs("div",{className:"explorer-header",children:[m.jsxs("div",{className:"explorer-title",children:[m.jsx("span",{className:"explorer-title__icon",children:"🗂️"}),m.jsxs("strong",{children:[t||"Workspace"," Explorer"]})]}),m.jsx("div",{className:"explorer-stats",children:m.jsxs("span",{children:[e.length," Dateien aus Brain"]})})]}),m.jsxs("div",{className:"explorer-search",children:[m.jsx("input",{type:"text",placeholder:"Dateibaum filtern …",value:a,onChange:h=>s(h.target.value),className:"explorer-search__input"}),a&&m.jsx("button",{type:"button",className:"explorer-search__clear",onClick:()=>s(""),children:"✕"})]}),m.jsx("div",{className:"explorer-tree",children:e.length===0?m.jsx("div",{className:"explorer-empty",children:"Keine Dateien im Snapshot vorhanden."}):f(l)})]})}function e2({workspaceId:t,onSelectHit:e}){const[n,i]=se.useState(()=>{const T=new URLSearchParams(window.location.search).get("mode");return T==="notes"||T==="prose"?T:"code"}),[a,s]=se.useState(()=>new URLSearchParams(window.location.search).get("q")||""),[r,o]=se.useState([]),[l,c]=se.useState([]),[f,h]=se.useState([]),[u,p]=se.useState(0),[g,b]=se.useState(null),[_,d]=se.useState(!1),[S,M]=se.useState(""),[x,w]=se.useState(""),N=async(T,y,C)=>{T&&T.preventDefault();const R=C??n,D=(y??a).trim();if(!D)return;d(!0),M(""),b(null);const O=performance.now();try{if(R==="code"){const H=await T3(t,D);o(H),c([]),h([])}else if(R==="prose"){const H=await C3(t,D);h(H.hits||[]),p(H.total??0),o([]),c([])}else{const H=await R3(t,D);c(H.notes||[]),o([]),h([])}b(Math.round(performance.now()-O)),w(D)}catch(H){M((H==null?void 0:H.message)||`Fehler bei der Suche (${R})`),o([]),c([]),h([])}finally{d(!1)}};return se.useEffect(()=>{const T=new URLSearchParams(window.location.search).get("q");T&&t&&N(void 0,T,n)},[t]),m.jsxs("div",{className:"search-view",children:[m.jsxs("div",{className:"search-view__header",children:[m.jsxs("div",{className:"search-view__title",children:[m.jsx("span",{className:"search-view__icon",children:"🔍"}),m.jsx("strong",{children:n==="code"?"Agent Code- & Symbolsuche":n==="prose"?"Notiz-Volltextsuche":"Notizen- & Property-Abfrage"}),m.jsx("span",{className:"search-view__endpoint mono",children:n==="code"?"/api/agent/search":n==="prose"?"/api/notes/search":"/api/notes/query"})]}),m.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[m.jsx("button",{type:"button",className:`tb ${n==="code"?"on":""}`,onClick:()=>{i("code"),a.trim()&&N(void 0,a,"code")},children:"Code & Symbole"}),m.jsx("button",{type:"button",className:`tb ${n==="notes"?"on":""}`,onClick:()=>{i("notes"),a.trim()||s("typ=gate UND stand=offen"),N(void 0,a.trim()||"typ=gate UND stand=offen","notes")},children:"Notizen & Properties (Bases)"}),m.jsx("button",{type:"button",className:`tb ${n==="prose"?"on":""}`,onClick:()=>{i("prose"),a.trim()||s("Gateway Owner"),N(void 0,a.trim()||"Gateway Owner","prose")},children:"Notiz-Volltext"})]})]}),m.jsx("form",{className:"search-form",onSubmit:N,style:{marginTop:"10px"},children:m.jsxs("div",{className:"search-input-group",children:[m.jsx("input",{type:"search",className:"search-input",placeholder:n==="code"?"Symbol, Variable, Klasse, Datei (z. B. authKey) …":n==="prose"?"Satz oder Stichwörter aus dem Notiztext (z. B. Gateway Owner) …":"Bases-Filter: typ=gate UND stand=offen oder typ=mission …",value:a,onChange:T=>s(T.target.value),autoFocus:!0}),m.jsx("button",{type:"submit",className:"search-submit-btn",disabled:_||!a.trim(),children:_?"Suche …":"Suchen"})]})}),S&&m.jsxs("div",{className:"search-error-alert",role:"alert",children:["⚠️ ",S]}),m.jsxs("div",{className:"search-results",children:[x&&m.jsxs("div",{className:"search-results-summary",children:[n==="code"?r.length===0?`Keine Code-Treffer für "${x}" im Brain-Index`:`${r.length} Treffer für "${x}":`:n==="prose"?f.length===0?`Kein Notiztext enthält "${x}"`:`${u} Notiz(en) im Text, ${f.length} angezeigt`:l.length===0?`Keine Notizen entsprechen dem Filter "${x}"`:`${l.length} Notiz(en) gefunden für "${x}":`,g!==null&&m.jsxs("span",{className:"search-results-time mono",style:{marginLeft:"8px",opacity:.7},children:[g," ms"]})]}),n==="code"?m.jsx("div",{className:"search-hits-list",children:r.map((T,y)=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name mono",children:T.name}),m.jsx("span",{className:`search-hit-kind search-hit-kind--${T.kind}`,children:T.kind}),T.line!==null&&m.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,children:["📄 ",T.path]})]},`${T.path}-${T.name}-${T.line??y}`))}):n==="prose"?m.jsx("div",{className:"search-hits-list",children:f.map(T=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name",children:T.title}),T.line!==null&&m.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),T.snippet&&m.jsx("div",{className:"search-hit-snippet",children:T.snippet}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]})]},`${T.path}-${T.line??0}`))}):m.jsx("div",{className:"search-hits-list",children:l.map(T=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name",children:T.title}),T.typ&&m.jsx("span",{className:"search-hit-kind search-hit-kind--class",children:T.typ}),T.stand&&m.jsx("span",{className:"source-badge",style:{fontSize:"11px",marginLeft:"6px"},children:T.stand})]}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]}),(T.inLinks!==void 0||T.outLinks!==void 0)&&m.jsxs("div",{style:{fontSize:"11px",color:"var(--faint)",marginTop:"4px"},children:["Verlinkungen: → ",T.outLinks??0," ausgehend · ← ",T.inLinks??0," Rückverweise"]})]},T.path))})]})]})}function t2(t){const e=[],n=t.split(`
`);for(const i of n){const a=i.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/);a&&e.push({path:a[1],reasons:a[2]})}return e}function n2({workspaceId:t,onSelectSource:e}){const[n,i]=se.useState(()=>new URLSearchParams(window.location.search).get("goal")||"authKey security tests"),[a,s]=se.useState(!1),[r,o]=se.useState(""),[l,c]=se.useState(null),[f,h]=se.useState(null),[u,p]=se.useState(!1),[g,b]=se.useState(!1);se.useEffect(()=>{const M=new URLSearchParams(window.location.search).get("goal");M&&t&&(s(!0),jv(t,M).then(x=>{c(x),x.id&&d(x.id)}).catch(x=>o((x==null?void 0:x.message)||"Fehler beim Erzeugen")).finally(()=>s(!1)))},[t]);const _=async M=>{M&&M.preventDefault();const x=n.trim();if(x){s(!0),o(""),c(null),h(null);try{const w=await jv(t,x);c(w),w.id&&d(w.id)}catch(w){o((w==null?void 0:w.message)||"Fehler beim Erzeugen des Context Packs")}finally{s(!1)}}},d=async M=>{p(!0);try{const x=await w3(M);h(x)}catch(x){console.error("Staleness check error:",x)}finally{p(!1)}},S=l!=null&&l.body?t2(l.body):[];return m.jsxs("div",{className:"pack-view",children:[m.jsx("div",{className:"pack-view__header",children:m.jsxs("div",{className:"pack-view__title",children:[m.jsx("span",{className:"pack-view__icon",children:"📦"}),m.jsx("strong",{children:"Context-Pack-Inspector"}),m.jsx("span",{className:"pack-view__endpoint mono",children:"/api/context/pack"})]})}),m.jsx("form",{className:"pack-form",onSubmit:_,children:m.jsxs("div",{className:"pack-form__field",children:[m.jsx("label",{htmlFor:"pack-goal-input",children:"Aufgabe / Ziel für den Agenten:"}),m.jsxs("div",{className:"pack-input-row",children:[m.jsx("input",{id:"pack-goal-input",type:"text",className:"pack-input",value:n,onChange:M=>i(M.target.value),placeholder:"z. B. authKey security tests"}),m.jsx("button",{type:"submit",className:"pack-create-btn",disabled:a||!n.trim(),children:a?"Erzeuge …":"Pack erzeugen"})]})]})}),r&&m.jsxs("div",{className:"pack-error-alert",role:"alert",children:["⚠️ ",r]}),l&&m.jsx("div",{className:"pack-details",children:m.jsxs("div",{className:"pack-card",children:[m.jsxs("div",{className:"pack-card__header",children:[m.jsxs("div",{className:"pack-card__meta",children:[m.jsx("span",{className:"pack-id mono",children:l.id}),m.jsxs("span",{className:"pack-badge pack-badge--version",children:["v",l.version]}),m.jsxs("span",{className:"pack-badge pack-badge--sources",children:[l.sources," Quellen"]})]}),m.jsxs("div",{className:"pack-card__staleness",children:[u?m.jsx("span",{className:"pack-staleness-badge pack-staleness-badge--loading",children:"Prüfe …"}):f?m.jsx("span",{className:`pack-staleness-badge ${f.stale?"pack-staleness-badge--stale":"pack-staleness-badge--fresh"}`,children:f.stale?"🔴 Veraltet":"🟢 Frisch"}):null,m.jsx("button",{type:"button",className:"pack-staleness-btn",onClick:()=>d(l.id),disabled:u,title:"Staleness gegen aktuellen Brain-Index prüfen",children:"Neu prüfen"})]})]}),f&&f.stale&&m.jsxs("div",{className:"pack-stale-warning",children:[m.jsx("strong",{children:"Quellen haben sich geändert:"}),f.changed.length>0&&m.jsxs("div",{children:["Geändert: ",f.changed.join(", ")]}),f.missing.length>0&&m.jsxs("div",{children:["Fehlt: ",f.missing.join(", ")]})]}),m.jsxs("div",{className:"pack-sources-section",children:[m.jsx("h4",{children:"Extrahierte Quellen aus dem Index:"}),S.length===0?m.jsx("div",{className:"pack-sources-empty",children:"Keine spezifischen Quelltreffer für dieses Ziel gefunden."}):m.jsx("div",{className:"pack-sources-list",children:S.map(M=>m.jsxs("div",{className:"pack-source-item",onClick:()=>e(M.path),title:`Klicken, um ${M.path} in Quellansicht zu öffnen`,children:[m.jsxs("div",{className:"pack-source-path mono",children:["📄 ",M.path]}),m.jsx("div",{className:"pack-source-why",children:M.reasons})]},M.path))})]}),m.jsx("div",{className:"pack-body-toggle",children:m.jsx("button",{type:"button",className:"pack-toggle-raw-btn",onClick:()=>b(M=>!M),children:g?"Markdown-Text verbergen":"Vollständigen Pack-Markdown anzeigen"})}),g&&m.jsx("div",{className:"pack-raw-markdown mono",children:m.jsx("pre",{children:l.body})})]})})]})}const Zy=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"explorer",label:"Explorer",hint:"Echter Quellbaum aus dem Brain"},{id:"search",label:"Suche",hint:"Code- & Symbolsuche über /api/agent/search"},{id:"packs",label:"Packs",hint:"Context-Pack-Inspector"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Nachweisbare Arbeit und Übergaben aus dem Core-Trace"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],jd=l3,i2=2e3;function a2(){const t=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=t||e;return Zy.some(i=>i.id===n)?n:"atlas"}function s2(){const t=new URLSearchParams(location.search);return t.has("workspace")?t.get("workspace")??"":t.has("workspaceRoot")?"":c3()}function r2(){var bt,Se,B;const[t,e]=se.useState(null),[n,i]=se.useState(null),[a,s]=se.useState({depth:0,tasks:[]}),[r,o]=se.useState(""),[l,c]=se.useState(0),[f,h]=se.useState(a2),[u,p]=se.useState(s2),g=se.useMemo(()=>{const K=new URLSearchParams(location.search);return K.has("workspace")?null:K.get("workspaceRoot")},[]),[b,_]=se.useState([]),[d,S]=se.useState(!1),[M,x]=se.useState(""),[w,N]=se.useState(!1),[T,y]=se.useState(""),[C,R]=se.useState(""),[D,O]=se.useState(""),[H,L]=se.useState(null),[P,I]=se.useState(null),[z,U]=se.useState(!1),[k,re]=se.useState([]),[le,_e]=se.useState(()=>{const K=new URLSearchParams(location.search).get("file"),ae=Number(new URLSearchParams(location.search).get("line"));return K?{path:K,line:Number.isFinite(ae)?ae:null}:null}),[ke,Ze]=se.useState(!1),[Fe,ie]=se.useState(Xy()),[ve,pe]=se.useState(Ro());se.useEffect(()=>{try{localStorage.setItem("plugbrain.view",f)}catch{}},[f]),se.useEffect(()=>{f==="mesh"&&(U(!1),I(null))},[f]);const Ce=se.useRef(null);se.useEffect(()=>{Ce.current=P},[P]);const Ie=K=>{p(K),u3(K);const ae=new URL(location.href);K?ae.searchParams.set("workspace",K):ae.searchParams.delete("workspace"),K&&ae.searchParams.delete("workspaceRoot"),history.replaceState(null,"",ae.toString())};se.useEffect(()=>{if(!u)return;let K=!0;return fetch(`/api/graph?workspace=${encodeURIComponent(u)}&limit=5000`).then(ae=>ae.json()).then(ae=>{if(!K||!(ae!=null&&ae.nodes))return;const A=ae.nodes.filter(v=>{var G;return v.type==="file"&&(v.path||((G=v.properties)==null?void 0:G.path))}).map(v=>{var G,X,Z,ce;return{id:v.id,path:v.path||((G=v.properties)==null?void 0:G.path),label:v.label||v.path,lang:v.lang||((X=v.properties)==null?void 0:X.lang),loc:v.loc??((Z=v.properties)==null?void 0:Z.lines)??0,agent:v.agent||((ce=v.properties)!=null&&ce.agentId?{id:v.properties.agentId,name:v.properties.agentName,color:v.properties.agentColor}:null)}});re(A)}).catch(()=>{}),()=>{K=!1}},[u,l]),se.useEffect(()=>{let K=!0;return Xv().then(ae=>{if(K){if(_(ae),!u&&g!==null){const A=f3(ae,g);A&&Ie(A);return}if(!u&&ae.length>0){const A=[...ae].sort((v,G)=>(G.indexedAt??"").localeCompare(v.indexedAt??""))[0];A&&Ie(A.id)}}}).catch(()=>{K&&y("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{K=!1}},[]);const Be=async K=>{K.preventDefault();const ae=M.trim();if(ae!==""){N(!0),y(""),R(""),O("Vault registriert — Indexlauf wird vorbereitet …");try{const A=await d3(ae,void 0,v=>O(Pp(v)));Xv().then(v=>{v.length>0&&_(v)}).catch(()=>{}),R("Vault registriert und indiziert."),x(""),S(!1),Ie(A),c(v=>v+1)}catch(A){y(A instanceof Error?A.message:String(A))}finally{N(!1),O("")}}},Mt=async()=>{if(!(!u||w)){N(!0),y(""),R(""),O("Indexlauf wird vorbereitet …");try{const K=await Vy(u,ae=>O(Pp(ae)));R(`Neu indiziert: ${(K==null?void 0:K.files)??0} Dateien, ${(K==null?void 0:K.symbols)??0} Symbole, ${(K==null?void 0:K.edges)??0} Kanten.`),c(ae=>ae+1)}catch(K){y(K instanceof Error?K.message:String(K))}finally{N(!1),O("")}}};se.useEffect(()=>{if(!u)return;let K=!0,ae;const A=async()=>{try{const v=await fetch(`/api/index/progress?workspace=${encodeURIComponent(u)}`);if(v.ok){const G=await v.json();if(!K)return;O(X=>h3(G,X))}}catch{}K&&(ae=setTimeout(()=>void A(),1500))};return A(),()=>{K=!1,clearTimeout(ae)}},[u]);const je=K=>{K.preventDefault(),Wy(Fe.trim()),_3(ve.trim()),E3(),c(ae=>ae+1),Ze(!1)},ft=m.jsxs("form",{className:"brain-vault",onSubmit:Be,children:[m.jsxs("div",{className:"brain-vault__row",children:[m.jsx("input",{className:"brain-vault__path",value:M,onChange:K=>x(K.target.value),placeholder:"Pfad eines Ordners, z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),m.jsx("button",{type:"submit",className:"brain-vault__open",disabled:w||M.trim()==="",children:w?"Indiziere …":"Als Vault öffnen"})]}),u&&m.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:m.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:w,onClick:()=>void Mt(),children:w?"läuft …":"Neu indizieren"})}),D&&m.jsx("p",{className:"brain-vault__progress",role:"status","aria-live":"polite",children:D}),T&&m.jsx("p",{className:"brain-vault__error",role:"alert",children:T}),C&&m.jsx("p",{className:"brain-vault__done",role:"status",children:C})]});se.useEffect(()=>{const K=u||void 0;fetch("/api/timeline"+(K?"?workspace="+encodeURIComponent(K):"")).then(ae=>ae.json()).then(ae=>{var A;(A=ae==null?void 0:ae.bounds)!=null&&A.first&&L(ae.bounds)}).catch(()=>{})},[u]),se.useEffect(()=>{if(!z||!H)return;const K=new Date(H.first).getTime(),ae=new Date(H.last).getTime(),A=Math.max(1,ae-K);let v=P?Math.round((new Date(P).getTime()-K)/A*60):0;const G=setInterval(()=>{if(v+=1,v>=60){I(null),U(!1);return}I(new Date(K+A*v/60).toISOString())},220);return()=>clearInterval(G)},[z,H]),se.useEffect(()=>{const K=new AbortController;let ae,A="";const v=u||void 0;async function G(){var X,Z,ce;try{const he=new URLSearchParams;v&&he.set("workspace",v),he.set("limit",String(i2)),Ce.current&&he.set("until",Ce.current);const Q=await fetch("/api/atlas/snapshot"+(he.toString()?`?${he}`:""),{signal:K.signal});if(!Q.ok)throw new Error(`Brain-Verbindung: HTTP ${Q.status}`);const W=await Q.json();if(!((X=W.workspace)!=null&&X.canonicalPath)||!Array.isArray((Z=W.graph)==null?void 0:Z.nodes)||!Array.isArray((ce=W.graph)==null?void 0:ce.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const ee=`${W.workspace.id}:${W.updatedAt??""}:${W.graph.nodes.length}:${W.graph.edges.length}`;ee!==A&&(e(W),A=ee),o("")}catch(he){K.signal.aborted||o(he instanceof Error?he.message:String(he))}if(v)try{const he=await S3(v);K.signal.aborted||i(he)}catch{K.signal.aborted||i(null)}else K.signal.aborted||i(null);try{const he=await fetch("/api/queue"+(v?"?workspace="+encodeURIComponent(v):""),{signal:K.signal});if(he.ok){const Q=await he.json();(Q==null?void 0:Q.ok)===!0&&Array.isArray(Q.tasks)&&s({depth:Number(Q.depth??0),tasks:Q.tasks})}}catch{}K.signal.aborted||(ae=setTimeout(G,3e3))}return G(),()=>{K.abort(),clearTimeout(ae)}},[l,P,u]);const nt=(t==null?void 0:t.graph.nodes.length)??k.length,et=(t==null?void 0:t.graph.edges.length)??0,Ot=t!=null&&t.coverage?!t.coverage.indexComplete:!1,Ct=r?"getrennt (offline)":t||k.length>0?Ot?`${((bt=t==null?void 0:t.coverage)==null?void 0:bt.staleFiles)??0} Datei(en) warten auf den Index`:"live":"lädt …",Xt=se.useMemo(()=>{var K;return k.length>0?k:(K=t==null?void 0:t.graph)!=null&&K.nodes?t.graph.nodes.filter(ae=>{var A;return ae.type==="file"&&(((A=ae.properties)==null?void 0:A.path)||ae.path)}).map(ae=>{var v,G,X,Z;const A=((v=ae.properties)==null?void 0:v.path)||ae.path||"";return{id:ae.id,path:A,label:ae.label||ae.name||A,lang:((G=ae.properties)==null?void 0:G.lang)??ae.lang??null,loc:((X=ae.properties)==null?void 0:X.lines)??ae.loc??0,agent:(Z=ae.properties)!=null&&Z.agentId?{id:ae.properties.agentId,name:ae.properties.agentName||ae.properties.agentId,color:ae.properties.agentColor||"#60a5fa"}:null}}):[]},[k,t]),_t=(K,ae)=>{K&&_e({path:K,line:ae})};return m.jsxs(m.Fragment,{children:[r&&m.jsx("div",{className:"brain-offline-banner",role:"alert",children:m.jsxs("div",{className:"brain-offline-banner__inner",children:[m.jsx("span",{className:"brain-offline-badge",children:"OFFLINE"}),m.jsxs("span",{className:"brain-offline-text",children:[m.jsx("strong",{children:"Server nicht erreichbar:"})," ",r," — läuft ",m.jsx("code",{children:"plugbrain serve"}),"?"]}),m.jsx("button",{type:"button",className:"brain-offline-btn",onClick:()=>c(K=>K+1),children:"Erneut verbinden"})]})}),m.jsxs("div",{className:"live-status",role:"status",children:[m.jsx("strong",{className:"live-status__name",title:(t==null?void 0:t.workspace.canonicalPath)??"",children:t?jd(t.workspace.name):((Se=b.find(K=>K.id===u))==null?void 0:Se.name)||"PlugBrain"}),u&&b.length>0&&m.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:m.jsx("select",{value:u,onChange:K=>{const ae=K.target.value;ae&&Ie(ae)},children:b.map(K=>m.jsx("option",{value:K.id,children:jd(K.name)},K.id))})}),u&&m.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{S(K=>!K),y(""),R("")},title:"Einen Ordner als neuen Vault öffnen",children:d?"Schließen":"Vault öffnen"}),m.jsxs("span",{className:"live-status__figures",children:[m.jsx("b",{children:nt})," Objekte ",m.jsx("b",{children:et})," Kanten",(t==null?void 0:t.coverage)&&t.coverage.totalFiles>t.coverage.shownFiles&&m.jsxs("span",{className:"live-status__sample",title:`Ausschnitt: ${t.coverage.shownFiles} von ${t.coverage.totalFiles} Dateien des Index`,children:[" ","· Ausschnitt aus ",t.coverage.totalFiles," Dateien"]})]}),m.jsx("span",{className:r?"live-status__state is-bad":"live-status__state",children:Ct}),m.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:Zy.map(K=>m.jsx("button",{type:"button",title:K.hint,className:K.id===f?"on":void 0,"aria-pressed":K.id===f,onClick:()=>{h(K.id)},children:K.label},K.id))}),m.jsx("button",{type:"button",className:"brain-auth-btn",onClick:()=>Ze(!0),title:"Auth-Token konfigurieren",children:"🔑 Auth"}),r&&m.jsx("button",{type:"button",onClick:()=>c(K=>K+1),children:"Erneut verbinden"})]}),ke&&m.jsx("div",{className:"brain-modal-backdrop",onClick:()=>Ze(!1),children:m.jsxs("div",{className:"brain-modal",onClick:K=>K.stopPropagation(),children:[m.jsxs("div",{className:"brain-modal__header",children:[m.jsx("h3",{children:"PlugBrain Authentifizierung"}),m.jsx("button",{type:"button",className:"brain-modal__close",onClick:()=>Ze(!1),children:"✕"})]}),m.jsxs("form",{onSubmit:je,children:[m.jsxs("div",{className:"brain-modal__field",children:[m.jsxs("label",{children:["Bearer Token (aus ",m.jsx("code",{children:"auth.token"}),"):"]}),m.jsx("input",{type:"text",className:"brain-modal__input mono",value:Fe,onChange:K=>ie(K.target.value),placeholder:"plug-..."})]}),m.jsxs("div",{className:"brain-modal__field",children:[m.jsx("label",{children:"Agent ID:"}),m.jsx("input",{type:"text",className:"brain-modal__input mono",value:ve,onChange:K=>pe(K.target.value),placeholder:"agy"})]}),m.jsxs("div",{className:"brain-modal__actions",children:[m.jsx("button",{type:"button",onClick:()=>Ze(!1),children:"Abbrechen"}),m.jsx("button",{type:"submit",className:"primary",children:"Speichern"})]})]})]})}),H&&(f==="atlas"||f==="city")&&m.jsxs("div",{className:"brain-timelapse",children:[m.jsx("button",{type:"button",onClick:()=>U(K=>!K),title:"Wachstum abspielen",children:z?"❚❚":"▶"}),m.jsx("input",{type:"range",min:0,max:60,step:1,value:P&&H?Math.round((new Date(P).getTime()-new Date(H.first).getTime())/Math.max(1,new Date(H.last).getTime()-new Date(H.first).getTime())*60):60,onChange:K=>{U(!1);const ae=Number(K.target.value);if(ae>=60){I(null);return}const A=new Date(H.first).getTime(),v=new Date(H.last).getTime();I(new Date(A+(v-A)*ae/60).toISOString())}}),m.jsx("span",{children:P?new Date(P).toLocaleTimeString():"jetzt"})]}),d&&u&&ft,u?m.jsxs("div",{className:"brain-workspace-layout",children:[f==="atlas"&&(t&&nt>0?m.jsxs("div",{className:"atlas-wrapper",children:[m.jsx(l2,{graph:t.graph,onOpenSource:_t}),le&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(Ar,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>_e(null)})})]}):m.jsx("div",{className:"brain-empty",children:r?m.jsxs("div",{className:"brain-empty--offline-box",children:[m.jsx("div",{className:"offline-icon",children:"🔌"}),m.jsx("h3",{children:"Server getrennt (Offline-Zustand)"}),m.jsx("p",{children:"Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt."}),m.jsx("button",{type:"button",className:"btn primary",onClick:()=>c(K=>K+1),children:"Erneut verbinden"})]}):t?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …"})),f==="explorer"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx($3,{workspaceName:(t==null?void 0:t.workspace.name)??(((B=b.find(K=>K.id===u))==null?void 0:B.name)||"Workspace"),files:Xt,activePath:le==null?void 0:le.path,onSelectFile:K=>_t(K)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:le?m.jsx(Ar,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>_e(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"📂"}),m.jsx("h3",{children:"Datei im Explorer auswählen"}),m.jsx("p",{children:"Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen."})]})})]}),f==="search"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(e2,{workspaceId:u,onSelectHit:(K,ae)=>_t(K,ae)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:le?m.jsx(Ar,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>_e(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"🔍"}),m.jsxs("h3",{children:["Code- und Symbolsuche über ",m.jsx("code",{children:"/api/agent/search"})]}),m.jsxs("p",{children:["Gib einen Suchbegriff ein (z. B. ",m.jsx("code",{children:"authKey"}),"). Ein Klick auf einen Treffer öffnet direkt die Quelle."]})]})})]}),f==="packs"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(n2,{workspaceId:u,onSelectSource:K=>_t(K)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:le?m.jsx(Ar,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>_e(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"📦"}),m.jsx("h3",{children:"Context-Pack-Inspector"}),m.jsx("p",{children:"Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen."})]})})]}),f==="city"&&m.jsxs("div",{className:"brain-view brain-view-city",children:[m.jsx(W3,{snapshot:t,onSelectFile:_t}),le&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(Ar,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>_e(null),onNavigateFile:(K,ae)=>_t(K,ae)})})]}),f==="queue"&&m.jsx("div",{className:"brain-view brain-view-queue",children:m.jsx(Y3,{tasks:a.tasks,depth:a.depth})}),f==="mesh"&&m.jsxs("div",{className:"brain-view brain-view-mesh",children:[m.jsx(q3,{mesh:n,workspaceId:u,onSelectFile:_t}),le&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(Ar,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>_e(null),onNavigateFile:(K,ae)=>_t(K,ae)})})]})]}):m.jsxs("div",{className:"brain-landing",role:"main",children:[m.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),m.jsx("p",{className:"brain-landing__lead",children:"Ein Ordner als Vault öffnen — der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."}),ft,b.length>0&&m.jsxs("div",{className:"brain-vault__known",children:[m.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),b.map(K=>m.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>Ie(K.id),children:[jd(K.name)," ",m.jsx("em",{title:K.root,children:K.indexedAt?"indiziert":"nicht indiziert"})]},K.id))]})]})]})}function o2(t,e){if(!e)return t;const n=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return t.split(n).map((i,a)=>a%2?m.jsx("mark",{children:i},a):i)}function l2({graph:t,onOpenSource:e}){const{CLUSTERS:n,nodes:i,edges:a,createAtlas:s}=se.useMemo(()=>o3(t),[t]),r=Object.fromEntries(n.map(U=>[U.id,i.filter(k=>k.cid===U.id).length])),o=se.useRef(null),l=se.useRef(null),c=se.useRef(null),f=se.useRef(null),h=se.useRef(null),u=se.useRef(null),p=se.useRef(null),g=se.useRef(null),b=se.useRef(null),_=se.useRef(null),d=se.useRef(null),S=se.useRef(null),M=se.useRef(null),[x,w]=se.useState(!1),[N,T]=se.useState({q:"",rows:[]}),[y,C]=se.useState({flow:!0,label:!0,spin:!1}),[R,D]=se.useState("atlas"),[O,H]=se.useState("dark"),[L,P]=se.useState([]),I=U=>{U!=null&&U.path&&e(U.path,U.line??null)};se.useEffect(()=>{const U=s({els:{stage:o.current,labels:l.current,hudMode:c.current,hudSel:f.current,pathbar:h.current,chain:u.current,zlvl:p.current,sNode:g.current,sEdge:b.current,sDeg:_.current,sFps:d.current,q:S.current},emit:{gate:w,list:T,drawer:I,tools:C,theme:H}});return M.current=U,()=>{U.dispose(),M.current=null}},[s]);const z=U=>{var k;P(re=>re.includes(U)?re.filter(le=>le!==U):[...re,U]),(k=M.current)==null||k.toggleCluster(U)};return m.jsxs("div",{id:"app",children:[m.jsxs("aside",{children:[m.jsxs("div",{className:"brand",children:[m.jsxs("h1",{children:[m.jsx("span",{className:"dot"}),"PlugBrain"]}),m.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",m.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),m.jsxs("div",{className:"searchbox",children:[m.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[m.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),m.jsx("path",{d:"M10.5 10.5 14 14"})]}),m.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol im Graph suchen…",autoComplete:"off",spellCheck:!1,ref:S,onChange:U=>{var k;return(k=M.current)==null?void 0:k.setQuery(U.target.value)}})]}),m.jsx("div",{className:"legend",id:"legend",children:n.map(U=>m.jsxs("button",{className:"cl"+(L.includes(U.id)?" off":""),type:"button",onClick:()=>z(U.id),children:[m.jsx("i",{style:{background:U.color}}),U.name,m.jsx("b",{children:r[U.id]})]},U.id))}),m.jsx("div",{className:"listwrap",id:"list",children:N.rows.length?N.rows.map(U=>m.jsxs("div",{className:"lrow"+(U.on?" on":""),"data-i":U.i,onClick:()=>{var re,le;(re=M.current)==null||re.selectAt(U.i);const k=i[U.i];(le=k==null?void 0:k.meta)!=null&&le.path&&e(k.meta.path,k.meta.line)},onMouseOver:()=>{var k;return(k=M.current)==null?void 0:k.hoverAt(U.i)},onMouseLeave:()=>{var k;return(k=M.current)==null?void 0:k.hoverAt(null)},children:[m.jsx("i",{style:{background:U.color}}),m.jsx("span",{children:o2(U.name,N.q)}),m.jsx("b",{children:U.deg})]},U.i)):m.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),m.jsxs("div",{className:"foot",children:[m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-node",ref:g,children:"—"}),m.jsx("div",{className:"l",children:"Objekte"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-edge",ref:b,children:"—"}),m.jsx("div",{className:"l",children:"Kanten"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-deg",ref:_,children:"—"}),m.jsx("div",{className:"l",children:"Ø-Grad"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-fps",ref:d,children:"—"}),m.jsx("div",{className:"l",children:"FPS"})]})]})]}),m.jsxs("div",{id:"stage",ref:o,children:[m.jsx("div",{id:"labels",ref:l}),m.jsxs("div",{id:"hud",children:[m.jsx("div",{children:m.jsx("b",{id:"hud-mode",ref:c,children:"GALAXIE · FREIER ORBIT"})}),m.jsx("div",{id:"hud-sel",ref:f,children:"Knoten anklicken, um Quelle direkt zu öffnen"}),m.jsxs("div",{id:"hud-sys",children:[i.length," VON ",t.nodes.length," OBJEKTEN · ",a.length," VON ",t.edges.length," KANTEN"]})]}),m.jsxs("div",{id:"pathbar",ref:h,children:[m.jsx("span",{className:"chain",id:"chain",ref:u}),m.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.clearPath()},children:"✕"})]}),m.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([U,k])=>m.jsx("button",{className:"tb"+(R===U?" on":""),"data-view":U,type:"button",onClick:()=>{var re;D(U),(re=M.current)==null||re.setView(U)},children:k},U)),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb"+(y.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleFlow()},children:"Signalfluss"}),m.jsx("button",{className:"tb"+(y.label?" on":""),id:"t-label",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleLabel()},children:"Labels"}),m.jsx("button",{className:"tb"+(y.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleSpin()},children:"Auto-Orbit"}),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var U;return(U=M.current)==null?void 0:U.dolly(1.18)},children:"−"}),m.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:p,onClick:()=>{var U;return(U=M.current)==null?void 0:U.zoomReset()},children:"100%"}),m.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var U;return(U=M.current)==null?void 0:U.dolly(1/1.18)},children:"＋"}),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleTheme()},children:O==="light"?"Nacht":"Tag"}),m.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.reset()},children:"Reset"})]}),m.jsx("div",{id:"hint",children:"Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt"}),m.jsxs("div",{id:"gate",style:x?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",m.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]})]})}jE.createRoot(document.getElementById("root")).render(m.jsx(se.StrictMode,{children:m.jsx(r2,{})}));

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var e_={exports:{}},tf={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Ky=Symbol.for("react.transitional.element"),Qy=Symbol.for("react.fragment");function t_(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:Ky,type:t,key:i,ref:e!==void 0?e:null,props:n}}tf.Fragment=Qy;tf.jsx=t_;tf.jsxs=t_;e_.exports=tf;var m=e_.exports,n_={exports:{}},Ze={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Fp=Symbol.for("react.transitional.element"),Jy=Symbol.for("react.portal"),$y=Symbol.for("react.fragment"),eM=Symbol.for("react.strict_mode"),tM=Symbol.for("react.profiler"),nM=Symbol.for("react.consumer"),iM=Symbol.for("react.context"),aM=Symbol.for("react.forward_ref"),sM=Symbol.for("react.suspense"),rM=Symbol.for("react.memo"),i_=Symbol.for("react.lazy"),oM=Symbol.for("react.activity"),ug=Symbol.iterator;function lM(t){return t===null||typeof t!="object"?null:(t=ug&&t[ug]||t["@@iterator"],typeof t=="function"?t:null)}var a_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},s_=Object.assign,r_={};function _o(t,e,n){this.props=t,this.context=e,this.refs=r_,this.updater=n||a_}_o.prototype.isReactComponent={};_o.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};_o.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function o_(){}o_.prototype=_o.prototype;function Hp(t,e,n){this.props=t,this.context=e,this.refs=r_,this.updater=n||a_}var Gp=Hp.prototype=new o_;Gp.constructor=Hp;s_(Gp,_o.prototype);Gp.isPureReactComponent=!0;var fg=Array.isArray;function qd(){}var kt={H:null,A:null,T:null,S:null},l_=Object.prototype.hasOwnProperty;function Vp(t,e,n){var i=n.ref;return{$$typeof:Fp,type:t,key:e,ref:i!==void 0?i:null,props:n}}function cM(t,e){return Vp(t.type,e,t.props)}function kp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Fp}function uM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var dg=/\/+/g;function wf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?uM(""+t.key):e.toString(36)}function fM(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(qd,qd):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Cr(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Fp:case Jy:r=!0;break;case i_:return r=t._init,Cr(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+wf(t,0):i,fg(a)?(n="",r!=null&&(n=r.replace(dg,"$&/")+"/"),Cr(a,e,n,"",function(c){return c})):a!=null&&(kp(a)&&(a=cM(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(dg,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(fg(t))for(var l=0;l<t.length;l++)i=t[l],s=o+wf(i,l),r+=Cr(i,e,n,s,a);else if(l=lM(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+wf(i,l++),r+=Cr(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return Cr(fM(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function Jl(t,e,n){if(t==null)return t;var i=[],a=0;return Cr(t,i,"","",function(s){return e.call(n,s,a++)}),i}function dM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var hg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},hM={map:Jl,forEach:function(t,e,n){Jl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Jl(t,function(){e++}),e},toArray:function(t){return Jl(t,function(e){return e})||[]},only:function(t){if(!kp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Activity=oM;Ze.Children=hM;Ze.Component=_o;Ze.Fragment=$y;Ze.Profiler=tM;Ze.PureComponent=Hp;Ze.StrictMode=eM;Ze.Suspense=sM;Ze.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=kt;Ze.__COMPILER_RUNTIME={__proto__:null,c:function(t){return kt.H.useMemoCache(t)}};Ze.cache=function(t){return function(){return t.apply(null,arguments)}};Ze.cacheSignal=function(){return null};Ze.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=s_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!l_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Vp(t.type,a,i)};Ze.createContext=function(t){return t={$$typeof:iM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:nM,_context:t},t};Ze.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)l_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Vp(t,s,a)};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:aM,render:t}};Ze.isValidElement=kp;Ze.lazy=function(t){return{$$typeof:i_,_payload:{_status:-1,_result:t},_init:dM}};Ze.memo=function(t,e){return{$$typeof:rM,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=kt.T,n={};kt.T=n;try{var i=t(),a=kt.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(qd,hg)}catch(s){hg(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),kt.T=e}};Ze.unstable_useCacheRefresh=function(){return kt.H.useCacheRefresh()};Ze.use=function(t){return kt.H.use(t)};Ze.useActionState=function(t,e,n){return kt.H.useActionState(t,e,n)};Ze.useCallback=function(t,e){return kt.H.useCallback(t,e)};Ze.useContext=function(t){return kt.H.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t,e){return kt.H.useDeferredValue(t,e)};Ze.useEffect=function(t,e){return kt.H.useEffect(t,e)};Ze.useEffectEvent=function(t){return kt.H.useEffectEvent(t)};Ze.useId=function(){return kt.H.useId()};Ze.useImperativeHandle=function(t,e,n){return kt.H.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return kt.H.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return kt.H.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return kt.H.useMemo(t,e)};Ze.useOptimistic=function(t,e){return kt.H.useOptimistic(t,e)};Ze.useReducer=function(t,e,n){return kt.H.useReducer(t,e,n)};Ze.useRef=function(t){return kt.H.useRef(t)};Ze.useState=function(t){return kt.H.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return kt.H.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return kt.H.useTransition()};Ze.version="19.2.8";n_.exports=Ze;var ae=n_.exports,c_={exports:{}},nf={},u_={exports:{}},f_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(B,I){var U=B.length;B.push(I);e:for(;0<U;){var X=U-1>>>1,oe=B[X];if(0<a(oe,I))B[X]=I,B[U]=oe,U=X;else break e}}function n(B){return B.length===0?null:B[0]}function i(B){if(B.length===0)return null;var I=B[0],U=B.pop();if(U!==I){B[0]=U;e:for(var X=0,oe=B.length,ce=oe>>>1;X<ce;){var xe=2*(X+1)-1,ke=B[xe],Ke=xe+1,Be=B[Ke];if(0>a(ke,U))Ke<oe&&0>a(Be,ke)?(B[X]=Be,B[Ke]=U,X=Ke):(B[X]=ke,B[xe]=U,X=xe);else if(Ke<oe&&0>a(Be,U))B[X]=Be,B[Ke]=U,X=Ke;else break e}}return I}function a(B,I){var U=B.sortIndex-I.sortIndex;return U!==0?U:B.id-I.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],f=1,h=null,u=3,p=!1,g=!1,b=!1,v=!1,d=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;function _(B){for(var I=n(c);I!==null;){if(I.callback===null)i(c);else if(I.startTime<=B)i(c),I.sortIndex=I.expirationTime,e(l,I);else break;I=n(c)}}function A(B){if(b=!1,_(B),!g)if(n(l)!==null)g=!0,R||(R=!0,P());else{var I=n(c);I!==null&&z(A,I.startTime-B)}}var R=!1,T=-1,y=5,C=-1;function w(){return v?!0:!(t.unstable_now()-C<y)}function D(){if(v=!1,R){var B=t.unstable_now();C=B;var I=!0;try{e:{g=!1,b&&(b=!1,x(T),T=-1),p=!0;var U=u;try{t:{for(_(B),h=n(l);h!==null&&!(h.expirationTime>B&&w());){var X=h.callback;if(typeof X=="function"){h.callback=null,u=h.priorityLevel;var oe=X(h.expirationTime<=B);if(B=t.unstable_now(),typeof oe=="function"){h.callback=oe,_(B),I=!0;break t}h===n(l)&&i(l),_(B)}else i(l);h=n(l)}if(h!==null)I=!0;else{var ce=n(c);ce!==null&&z(A,ce.startTime-B),I=!1}}break e}finally{h=null,u=U,p=!1}I=void 0}}finally{I?P():R=!1}}}var P;if(typeof M=="function")P=function(){M(D)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,O=G.port2;G.port1.onmessage=D,P=function(){O.postMessage(null)}}else P=function(){d(D,0)};function z(B,I){T=d(function(){B(t.unstable_now())},I)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(B){B.callback=null},t.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<B?Math.floor(1e3/B):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(B){switch(u){case 1:case 2:case 3:var I=3;break;default:I=u}var U=u;u=I;try{return B()}finally{u=U}},t.unstable_requestPaint=function(){v=!0},t.unstable_runWithPriority=function(B,I){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var U=u;u=B;try{return I()}finally{u=U}},t.unstable_scheduleCallback=function(B,I,U){var X=t.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?X+U:X):U=X,B){case 1:var oe=-1;break;case 2:oe=250;break;case 5:oe=1073741823;break;case 4:oe=1e4;break;default:oe=5e3}return oe=U+oe,B={id:f++,callback:I,priorityLevel:B,startTime:U,expirationTime:oe,sortIndex:-1},U>X?(B.sortIndex=U,e(c,B),n(l)===null&&B===n(c)&&(b?(x(T),T=-1):b=!0,z(A,U-X))):(B.sortIndex=oe,e(l,B),g||p||(g=!0,R||(R=!0,P()))),B},t.unstable_shouldYield=w,t.unstable_wrapCallback=function(B){var I=u;return function(){var U=u;u=I;try{return B.apply(this,arguments)}finally{u=U}}}})(f_);u_.exports=f_;var pM=u_.exports,d_={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var mM=ae;function h_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Fa(){}var zn={d:{f:Fa,r:function(){throw Error(h_(522))},D:Fa,C:Fa,L:Fa,m:Fa,X:Fa,S:Fa,M:Fa},p:0,findDOMNode:null},gM=Symbol.for("react.portal");function vM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:gM,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var al=mM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function af(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=zn;Fn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(h_(299));return vM(t,e,null,n)};Fn.flushSync=function(t){var e=al.T,n=zn.p;try{if(al.T=null,zn.p=2,t)return t()}finally{al.T=e,zn.p=n,zn.d.f()}};Fn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,zn.d.C(t,e))};Fn.prefetchDNS=function(t){typeof t=="string"&&zn.d.D(t)};Fn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=af(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?zn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&zn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Fn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=af(e.as,e.crossOrigin);zn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&zn.d.M(t)};Fn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=af(n,e.crossOrigin);zn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Fn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=af(e.as,e.crossOrigin);zn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else zn.d.m(t)};Fn.requestFormReset=function(t){zn.d.r(t)};Fn.unstable_batchedUpdates=function(t,e){return t(e)};Fn.useFormState=function(t,e,n){return al.H.useFormState(t,e,n)};Fn.useFormStatus=function(){return al.H.useHostTransitionStatus()};Fn.version="19.2.8";function p_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(p_)}catch(t){console.error(t)}}p_(),d_.exports=Fn;var _M=d_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ln=pM,m_=ae,xM=_M;function le(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function g_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Il(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function v_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function __(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function pg(t){if(Il(t)!==t)throw Error(le(188))}function SM(t){var e=t.alternate;if(!e){if(e=Il(t),e===null)throw Error(le(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return pg(a),t;if(s===i)return pg(a),e;s=s.sibling}throw Error(le(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(le(189))}}if(n.alternate!==i)throw Error(le(190))}if(n.tag!==3)throw Error(le(188));return n.stateNode.current===n?t:e}function x_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=x_(t),e!==null)return e;t=t.sibling}return null}var Xt=Object.assign,yM=Symbol.for("react.element"),$l=Symbol.for("react.transitional.element"),Ko=Symbol.for("react.portal"),Dr=Symbol.for("react.fragment"),S_=Symbol.for("react.strict_mode"),Yd=Symbol.for("react.profiler"),y_=Symbol.for("react.consumer"),Ma=Symbol.for("react.context"),Xp=Symbol.for("react.forward_ref"),Zd=Symbol.for("react.suspense"),Kd=Symbol.for("react.suspense_list"),Wp=Symbol.for("react.memo"),ja=Symbol.for("react.lazy"),Qd=Symbol.for("react.activity"),MM=Symbol.for("react.memo_cache_sentinel"),mg=Symbol.iterator;function Lo(t){return t===null||typeof t!="object"?null:(t=mg&&t[mg]||t["@@iterator"],typeof t=="function"?t:null)}var bM=Symbol.for("react.client.reference");function Jd(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===bM?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Dr:return"Fragment";case Yd:return"Profiler";case S_:return"StrictMode";case Zd:return"Suspense";case Kd:return"SuspenseList";case Qd:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Ko:return"Portal";case Ma:return t.displayName||"Context";case y_:return(t._context.displayName||"Context")+".Consumer";case Xp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Wp:return e=t.displayName||null,e!==null?e:Jd(t.type)||"Memo";case ja:e=t._payload,t=t._init;try{return Jd(t(e))}catch{}}return null}var Qo=Array.isArray,He=m_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,vt=xM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Bs={pending:!1,data:null,method:null,action:null},$d=[],Ur=-1;function ta(t){return{current:t}}function vn(t){0>Ur||(t.current=$d[Ur],$d[Ur]=null,Ur--)}function It(t,e){Ur++,$d[Ur]=t.current,t.current=e}var Qi=ta(null),xl=ta(null),rs=ta(null),vu=ta(null);function _u(t,e){switch(It(rs,e),It(xl,t),It(Qi,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?y0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=y0(e),t=GS(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}vn(Qi),It(Qi,t)}function to(){vn(Qi),vn(xl),vn(rs)}function eh(t){t.memoizedState!==null&&It(vu,t);var e=Qi.current,n=GS(e,t.type);e!==n&&(It(xl,t),It(Qi,n))}function xu(t){xl.current===t&&(vn(Qi),vn(xl)),vu.current===t&&(vn(vu),Nl._currentValue=Bs)}var Cf,gg;function Rs(t){if(Cf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Cf=e&&e[1]||"",gg=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Cf+t+gg}var Rf=!1;function Nf(t,e){if(!t||Rf)return"";Rf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var u=p}Reflect.construct(t,[],h)}else{try{h.call()}catch(p){u=p}t.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}(h=t())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var f=`
`+l[i].replace(" at new "," at ");return t.displayName&&f.includes("<anonymous>")&&(f=f.replace("<anonymous>",t.displayName)),f}while(1<=i&&0<=a);break}}}finally{Rf=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Rs(n):""}function EM(t,e){switch(t.tag){case 26:case 27:case 5:return Rs(t.type);case 16:return Rs("Lazy");case 13:return t.child!==e&&e!==null?Rs("Suspense Fallback"):Rs("Suspense");case 19:return Rs("SuspenseList");case 0:case 15:return Nf(t.type,!1);case 11:return Nf(t.type.render,!1);case 1:return Nf(t.type,!0);case 31:return Rs("Activity");default:return""}}function vg(t){try{var e="",n=null;do e+=EM(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var th=Object.prototype.hasOwnProperty,jp=ln.unstable_scheduleCallback,Df=ln.unstable_cancelCallback,TM=ln.unstable_shouldYield,AM=ln.unstable_requestPaint,ii=ln.unstable_now,wM=ln.unstable_getCurrentPriorityLevel,M_=ln.unstable_ImmediatePriority,b_=ln.unstable_UserBlockingPriority,Su=ln.unstable_NormalPriority,CM=ln.unstable_LowPriority,E_=ln.unstable_IdlePriority,RM=ln.log,NM=ln.unstable_setDisableYieldValue,Bl=null,ai=null;function $a(t){if(typeof RM=="function"&&NM(t),ai&&typeof ai.setStrictMode=="function")try{ai.setStrictMode(Bl,t)}catch{}}var si=Math.clz32?Math.clz32:LM,DM=Math.log,UM=Math.LN2;function LM(t){return t>>>=0,t===0?32:31-(DM(t)/UM|0)|0}var ec=256,tc=262144,nc=4194304;function Ns(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function sf(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Ns(i):(r&=o,r!==0?a=Ns(r):n||(n=o&~t,n!==0&&(a=Ns(n))))):(o=i&~s,o!==0?a=Ns(o):r!==0?a=Ns(r):n||(n=i&~t,n!==0&&(a=Ns(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function Fl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function OM(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function T_(){var t=nc;return nc<<=1,!(nc&62914560)&&(nc=4194304),t}function Uf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Hl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function PM(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var f=31-si(n),h=1<<f;o[f]=0,l[f]=-1;var u=c[f];if(u!==null)for(c[f]=null,f=0;f<u.length;f++){var p=u[f];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&A_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function A_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-si(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function w_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-si(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function C_(t,e){var n=e&-e;return n=n&42?1:qp(n),n&(t.suspendedLanes|e)?0:n}function qp(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Yp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function R_(){var t=vt.p;return t!==0?t:(t=window.event,t===void 0?32:JS(t.type))}function _g(t,e){var n=vt.p;try{return vt.p=t,e()}finally{vt.p=n}}var Ss=Math.random().toString(36).slice(2),xn="__reactFiber$"+Ss,Zn="__reactProps$"+Ss,xo="__reactContainer$"+Ss,nh="__reactEvents$"+Ss,zM="__reactListeners$"+Ss,IM="__reactHandles$"+Ss,xg="__reactResources$"+Ss,Gl="__reactMarker$"+Ss;function Zp(t){delete t[xn],delete t[Zn],delete t[nh],delete t[zM],delete t[IM]}function Lr(t){var e=t[xn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[xo]||n[xn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=A0(t);t!==null;){if(n=t[xn])return n;t=A0(t)}return e}t=n,n=t.parentNode}return null}function So(t){if(t=t[xn]||t[xo]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function Jo(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(le(33))}function jr(t){var e=t[xg];return e||(e=t[xg]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function mn(t){t[Gl]=!0}var N_=new Set,D_={};function $s(t,e){no(t,e),no(t+"Capture",e)}function no(t,e){for(D_[t]=e,t=0;t<e.length;t++)N_.add(e[t])}var BM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Sg={},yg={};function FM(t){return th.call(yg,t)?!0:th.call(Sg,t)?!1:BM.test(t)?yg[t]=!0:(Sg[t]=!0,!1)}function jc(t,e,n){if(FM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function ic(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function la(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function gi(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function U_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function HM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function ih(t){if(!t._valueTracker){var e=U_(t)?"checked":"value";t._valueTracker=HM(t,e,""+t[e])}}function L_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=U_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function yu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var GM=/[\n"\\]/g;function Si(t){return t.replace(GM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function ah(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+gi(e)):t.value!==""+gi(e)&&(t.value=""+gi(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?sh(t,r,gi(e)):n!=null?sh(t,r,gi(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+gi(o):t.removeAttribute("name")}function O_(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){ih(t);return}n=n!=null?""+gi(n):"",e=e!=null?""+gi(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),ih(t)}function sh(t,e,n){e==="number"&&yu(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function qr(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+gi(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function P_(t,e,n){if(e!=null&&(e=""+gi(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+gi(n):""}function z_(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(le(92));if(Qo(i)){if(1<i.length)throw Error(le(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=gi(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),ih(t)}function io(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var VM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Mg(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||VM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function I_(t,e,n){if(e!=null&&typeof e!="object")throw Error(le(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&Mg(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&Mg(t,s,e[s])}function Kp(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var kM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),XM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function qc(t){return XM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function ba(){}var rh=null;function Qp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Or=null,Yr=null;function bg(t){var e=So(t);if(e&&(t=e.stateNode)){var n=t[Zn]||null;e:switch(t=e.stateNode,e.type){case"input":if(ah(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Si(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[Zn]||null;if(!a)throw Error(le(90));ah(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&L_(i)}break e;case"textarea":P_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&qr(t,!!n.multiple,e,!1)}}}var Lf=!1;function B_(t,e,n){if(Lf)return t(e,n);Lf=!0;try{var i=t(e);return i}finally{if(Lf=!1,(Or!==null||Yr!==null)&&(vf(),Or&&(e=Or,t=Yr,Yr=Or=null,bg(e),t)))for(e=0;e<t.length;e++)bg(t[e])}}function Sl(t,e){var n=t.stateNode;if(n===null)return null;var i=n[Zn]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(le(231,e,typeof n));return n}var Da=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),oh=!1;if(Da)try{var Oo={};Object.defineProperty(Oo,"passive",{get:function(){oh=!0}}),window.addEventListener("test",Oo,Oo),window.removeEventListener("test",Oo,Oo)}catch{oh=!1}var es=null,Jp=null,Yc=null;function F_(){if(Yc)return Yc;var t,e=Jp,n=e.length,i,a="value"in es?es.value:es.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Yc=a.slice(t,1<i?1-i:void 0)}function Zc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function ac(){return!0}function Eg(){return!1}function Kn(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?ac:Eg,this.isPropagationStopped=Eg,this}return Xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=ac)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=ac)},persist:function(){},isPersistent:ac}),e}var er={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},rf=Kn(er),Vl=Xt({},er,{view:0,detail:0}),WM=Kn(Vl),Of,Pf,Po,of=Xt({},Vl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$p,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Po&&(Po&&t.type==="mousemove"?(Of=t.screenX-Po.screenX,Pf=t.screenY-Po.screenY):Pf=Of=0,Po=t),Of)},movementY:function(t){return"movementY"in t?t.movementY:Pf}}),Tg=Kn(of),jM=Xt({},of,{dataTransfer:0}),qM=Kn(jM),YM=Xt({},Vl,{relatedTarget:0}),zf=Kn(YM),ZM=Xt({},er,{animationName:0,elapsedTime:0,pseudoElement:0}),KM=Kn(ZM),QM=Xt({},er,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),JM=Kn(QM),$M=Xt({},er,{data:0}),Ag=Kn($M),eb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},tb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},nb={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function ib(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=nb[t])?!!e[t]:!1}function $p(){return ib}var ab=Xt({},Vl,{key:function(t){if(t.key){var e=eb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Zc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?tb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$p,charCode:function(t){return t.type==="keypress"?Zc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Zc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),sb=Kn(ab),rb=Xt({},of,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),wg=Kn(rb),ob=Xt({},Vl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$p}),lb=Kn(ob),cb=Xt({},er,{propertyName:0,elapsedTime:0,pseudoElement:0}),ub=Kn(cb),fb=Xt({},of,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),db=Kn(fb),hb=Xt({},er,{newState:0,oldState:0}),pb=Kn(hb),mb=[9,13,27,32],em=Da&&"CompositionEvent"in window,sl=null;Da&&"documentMode"in document&&(sl=document.documentMode);var gb=Da&&"TextEvent"in window&&!sl,H_=Da&&(!em||sl&&8<sl&&11>=sl),Cg=" ",Rg=!1;function G_(t,e){switch(t){case"keyup":return mb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function V_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Pr=!1;function vb(t,e){switch(t){case"compositionend":return V_(e);case"keypress":return e.which!==32?null:(Rg=!0,Cg);case"textInput":return t=e.data,t===Cg&&Rg?null:t;default:return null}}function _b(t,e){if(Pr)return t==="compositionend"||!em&&G_(t,e)?(t=F_(),Yc=Jp=es=null,Pr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return H_&&e.locale!=="ko"?null:e.data;default:return null}}var xb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ng(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!xb[t.type]:e==="textarea"}function k_(t,e,n,i){Or?Yr?Yr.push(i):Yr=[i]:Or=i,e=Fu(e,"onChange"),0<e.length&&(n=new rf("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var rl=null,yl=null;function Sb(t){BS(t,0)}function lf(t){var e=Jo(t);if(L_(e))return t}function Dg(t,e){if(t==="change")return e}var X_=!1;if(Da){var If;if(Da){var Bf="oninput"in document;if(!Bf){var Ug=document.createElement("div");Ug.setAttribute("oninput","return;"),Bf=typeof Ug.oninput=="function"}If=Bf}else If=!1;X_=If&&(!document.documentMode||9<document.documentMode)}function Lg(){rl&&(rl.detachEvent("onpropertychange",W_),yl=rl=null)}function W_(t){if(t.propertyName==="value"&&lf(yl)){var e=[];k_(e,yl,t,Qp(t)),B_(Sb,e)}}function yb(t,e,n){t==="focusin"?(Lg(),rl=e,yl=n,rl.attachEvent("onpropertychange",W_)):t==="focusout"&&Lg()}function Mb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return lf(yl)}function bb(t,e){if(t==="click")return lf(e)}function Eb(t,e){if(t==="input"||t==="change")return lf(e)}function Tb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var oi=typeof Object.is=="function"?Object.is:Tb;function Ml(t,e){if(oi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!th.call(e,a)||!oi(t[a],e[a]))return!1}return!0}function Og(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Pg(t,e){var n=Og(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Og(n)}}function j_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?j_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function q_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=yu(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=yu(t.document)}return e}function tm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Ab=Da&&"documentMode"in document&&11>=document.documentMode,zr=null,lh=null,ol=null,ch=!1;function zg(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ch||zr==null||zr!==yu(i)||(i=zr,"selectionStart"in i&&tm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ol&&Ml(ol,i)||(ol=i,i=Fu(lh,"onSelect"),0<i.length&&(e=new rf("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=zr)))}function Es(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Ir={animationend:Es("Animation","AnimationEnd"),animationiteration:Es("Animation","AnimationIteration"),animationstart:Es("Animation","AnimationStart"),transitionrun:Es("Transition","TransitionRun"),transitionstart:Es("Transition","TransitionStart"),transitioncancel:Es("Transition","TransitionCancel"),transitionend:Es("Transition","TransitionEnd")},Ff={},Y_={};Da&&(Y_=document.createElement("div").style,"AnimationEvent"in window||(delete Ir.animationend.animation,delete Ir.animationiteration.animation,delete Ir.animationstart.animation),"TransitionEvent"in window||delete Ir.transitionend.transition);function tr(t){if(Ff[t])return Ff[t];if(!Ir[t])return t;var e=Ir[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Y_)return Ff[t]=e[n];return t}var Z_=tr("animationend"),K_=tr("animationiteration"),Q_=tr("animationstart"),wb=tr("transitionrun"),Cb=tr("transitionstart"),Rb=tr("transitioncancel"),J_=tr("transitionend"),$_=new Map,uh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");uh.push("scrollEnd");function Bi(t,e){$_.set(t,e),$s(e,[t])}var Mu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},pi=[],Br=0,nm=0;function cf(){for(var t=Br,e=nm=Br=0;e<t;){var n=pi[e];pi[e++]=null;var i=pi[e];pi[e++]=null;var a=pi[e];pi[e++]=null;var s=pi[e];if(pi[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&ex(n,a,s)}}function uf(t,e,n,i){pi[Br++]=t,pi[Br++]=e,pi[Br++]=n,pi[Br++]=i,nm|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function im(t,e,n,i){return uf(t,e,n,i),bu(t)}function nr(t,e){return uf(t,null,null,e),bu(t)}function ex(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-si(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function bu(t){if(50<gl)throw gl=0,Dh=null,Error(le(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Fr={};function Nb(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,e,n,i){return new Nb(t,e,n,i)}function am(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Aa(t,e){var n=t.alternate;return n===null?(n=ti(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function tx(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Kc(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")am(t)&&(r=1);else if(typeof t=="string")r=PE(t,n,Qi.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case Qd:return t=ti(31,n,e,a),t.elementType=Qd,t.lanes=s,t;case Dr:return Fs(n.children,a,s,e);case S_:r=8,a|=24;break;case Yd:return t=ti(12,n,e,a|2),t.elementType=Yd,t.lanes=s,t;case Zd:return t=ti(13,n,e,a),t.elementType=Zd,t.lanes=s,t;case Kd:return t=ti(19,n,e,a),t.elementType=Kd,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ma:r=10;break e;case y_:r=9;break e;case Xp:r=11;break e;case Wp:r=14;break e;case ja:r=16,i=null;break e}r=29,n=Error(le(130,t===null?"null":typeof t,"")),i=null}return e=ti(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function Fs(t,e,n,i){return t=ti(7,t,i,e),t.lanes=n,t}function Hf(t,e,n){return t=ti(6,t,null,e),t.lanes=n,t}function nx(t){var e=ti(18,null,null,0);return e.stateNode=t,e}function Gf(t,e,n){return e=ti(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Ig=new WeakMap;function yi(t,e){if(typeof t=="object"&&t!==null){var n=Ig.get(t);return n!==void 0?n:(e={value:t,source:e,stack:vg(e)},Ig.set(t,e),e)}return{value:t,source:e,stack:vg(e)}}var Hr=[],Gr=0,Eu=null,bl=0,vi=[],_i=0,ms=null,qi=1,Yi="";function xa(t,e){Hr[Gr++]=bl,Hr[Gr++]=Eu,Eu=t,bl=e}function ix(t,e,n){vi[_i++]=qi,vi[_i++]=Yi,vi[_i++]=ms,ms=t;var i=qi;t=Yi;var a=32-si(i)-1;i&=~(1<<a),n+=1;var s=32-si(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,qi=1<<32-si(e)+a|n<<a|i,Yi=s+t}else qi=1<<s|n<<a|i,Yi=t}function sm(t){t.return!==null&&(xa(t,1),ix(t,1,0))}function rm(t){for(;t===Eu;)Eu=Hr[--Gr],Hr[Gr]=null,bl=Hr[--Gr],Hr[Gr]=null;for(;t===ms;)ms=vi[--_i],vi[_i]=null,Yi=vi[--_i],vi[_i]=null,qi=vi[--_i],vi[_i]=null}function ax(t,e){vi[_i++]=qi,vi[_i++]=Yi,vi[_i++]=ms,qi=e.id,Yi=e.overflow,ms=t}var Sn=null,Vt=null,ft=!1,os=null,Mi=!1,fh=Error(le(519));function gs(t){var e=Error(le(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw El(yi(e,t)),fh}function Bg(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[xn]=t,e[Zn]=i,n){case"dialog":at("cancel",e),at("close",e);break;case"iframe":case"object":case"embed":at("load",e);break;case"video":case"audio":for(n=0;n<Cl.length;n++)at(Cl[n],e);break;case"source":at("error",e);break;case"img":case"image":case"link":at("error",e),at("load",e);break;case"details":at("toggle",e);break;case"input":at("invalid",e),O_(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":at("invalid",e);break;case"textarea":at("invalid",e),z_(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||HS(e.textContent,n)?(i.popover!=null&&(at("beforetoggle",e),at("toggle",e)),i.onScroll!=null&&at("scroll",e),i.onScrollEnd!=null&&at("scrollend",e),i.onClick!=null&&(e.onclick=ba),e=!0):e=!1,e||gs(t,!0)}function Fg(t){for(Sn=t.return;Sn;)switch(Sn.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:Sn=Sn.return}}function cr(t){if(t!==Sn)return!1;if(!ft)return Fg(t),ft=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||zh(t.type,t.memoizedProps)),n=!n),n&&Vt&&gs(t),Fg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(le(317));Vt=T0(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(le(317));Vt=T0(t)}else e===27?(e=Vt,ys(t.type)?(t=Hh,Hh=null,Vt=t):Vt=e):Vt=Sn?Ai(t.stateNode.nextSibling):null;return!0}function Xs(){Vt=Sn=null,ft=!1}function Vf(){var t=os;return t!==null&&(jn===null?jn=t:jn.push.apply(jn,t),os=null),t}function El(t){os===null?os=[t]:os.push(t)}var dh=ta(null),ir=null,Ea=null;function Ya(t,e,n){It(dh,e._currentValue),e._currentValue=n}function wa(t){t._currentValue=dh.current,vn(dh)}function hh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function ph(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),hh(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(le(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),hh(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function yo(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(le(387));if(r=r.memoizedProps,r!==null){var o=a.type;oi(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===vu.current){if(r=a.alternate,r===null)throw Error(le(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Nl):t=[Nl])}a=a.return}t!==null&&ph(e,t,n,i),e.flags|=262144}function Tu(t){for(t=t.firstContext;t!==null;){if(!oi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Ws(t){ir=t,Ea=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function yn(t){return sx(ir,t)}function sc(t,e){return ir===null&&Ws(t),sx(t,e)}function sx(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ea===null){if(t===null)throw Error(le(308));Ea=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ea=Ea.next=e;return n}var Db=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Ub=ln.unstable_scheduleCallback,Lb=ln.unstable_NormalPriority,sn={$$typeof:Ma,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function om(){return{controller:new Db,data:new Map,refCount:0}}function kl(t){t.refCount--,t.refCount===0&&Ub(Lb,function(){t.controller.abort()})}var ll=null,mh=0,ao=0,Zr=null;function Ob(t,e){if(ll===null){var n=ll=[];mh=0,ao=Um(),Zr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return mh++,e.then(Hg,Hg),e}function Hg(){if(--mh===0&&ll!==null){Zr!==null&&(Zr.status="fulfilled");var t=ll;ll=null,ao=0,Zr=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Pb(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Gg=He.S;He.S=function(t,e){xS=ii(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Ob(t,e),Gg!==null&&Gg(t,e)};var Hs=ta(null);function lm(){var t=Hs.current;return t!==null?t:Pt.pooledCache}function Qc(t,e){e===null?It(Hs,Hs.current):It(Hs,e.pool)}function rx(){var t=lm();return t===null?null:{parent:sn._currentValue,pool:t}}var Mo=Error(le(460)),cm=Error(le(474)),ff=Error(le(542)),Au={then:function(){}};function Vg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function ox(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(ba,ba),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Xg(t),t;default:if(typeof e.status=="string")e.then(ba,ba);else{if(t=Pt,t!==null&&100<t.shellSuspendCounter)throw Error(le(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Xg(t),t}throw Gs=e,Mo}}function Ds(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Gs=n,Mo):n}}var Gs=null;function kg(){if(Gs===null)throw Error(le(459));var t=Gs;return Gs=null,t}function Xg(t){if(t===Mo||t===ff)throw Error(le(483))}var Kr=null,Tl=0;function rc(t){var e=Tl;return Tl+=1,Kr===null&&(Kr=[]),ox(Kr,t,e)}function zo(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function oc(t,e){throw e.$$typeof===yM?Error(le(525)):(t=Object.prototype.toString.call(e),Error(le(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function lx(t){function e(d,x){if(t){var M=d.deletions;M===null?(d.deletions=[x],d.flags|=16):M.push(x)}}function n(d,x){if(!t)return null;for(;x!==null;)e(d,x),x=x.sibling;return null}function i(d){for(var x=new Map;d!==null;)d.key!==null?x.set(d.key,d):x.set(d.index,d),d=d.sibling;return x}function a(d,x){return d=Aa(d,x),d.index=0,d.sibling=null,d}function s(d,x,M){return d.index=M,t?(M=d.alternate,M!==null?(M=M.index,M<x?(d.flags|=67108866,x):M):(d.flags|=67108866,x)):(d.flags|=1048576,x)}function r(d){return t&&d.alternate===null&&(d.flags|=67108866),d}function o(d,x,M,_){return x===null||x.tag!==6?(x=Hf(M,d.mode,_),x.return=d,x):(x=a(x,M),x.return=d,x)}function l(d,x,M,_){var A=M.type;return A===Dr?f(d,x,M.props.children,_,M.key):x!==null&&(x.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ja&&Ds(A)===x.type)?(x=a(x,M.props),zo(x,M),x.return=d,x):(x=Kc(M.type,M.key,M.props,null,d.mode,_),zo(x,M),x.return=d,x)}function c(d,x,M,_){return x===null||x.tag!==4||x.stateNode.containerInfo!==M.containerInfo||x.stateNode.implementation!==M.implementation?(x=Gf(M,d.mode,_),x.return=d,x):(x=a(x,M.children||[]),x.return=d,x)}function f(d,x,M,_,A){return x===null||x.tag!==7?(x=Fs(M,d.mode,_,A),x.return=d,x):(x=a(x,M),x.return=d,x)}function h(d,x,M){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return x=Hf(""+x,d.mode,M),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case $l:return M=Kc(x.type,x.key,x.props,null,d.mode,M),zo(M,x),M.return=d,M;case Ko:return x=Gf(x,d.mode,M),x.return=d,x;case ja:return x=Ds(x),h(d,x,M)}if(Qo(x)||Lo(x))return x=Fs(x,d.mode,M,null),x.return=d,x;if(typeof x.then=="function")return h(d,rc(x),M);if(x.$$typeof===Ma)return h(d,sc(d,x),M);oc(d,x)}return null}function u(d,x,M,_){var A=x!==null?x.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return A!==null?null:o(d,x,""+M,_);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case $l:return M.key===A?l(d,x,M,_):null;case Ko:return M.key===A?c(d,x,M,_):null;case ja:return M=Ds(M),u(d,x,M,_)}if(Qo(M)||Lo(M))return A!==null?null:f(d,x,M,_,null);if(typeof M.then=="function")return u(d,x,rc(M),_);if(M.$$typeof===Ma)return u(d,x,sc(d,M),_);oc(d,M)}return null}function p(d,x,M,_,A){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return d=d.get(M)||null,o(x,d,""+_,A);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case $l:return d=d.get(_.key===null?M:_.key)||null,l(x,d,_,A);case Ko:return d=d.get(_.key===null?M:_.key)||null,c(x,d,_,A);case ja:return _=Ds(_),p(d,x,M,_,A)}if(Qo(_)||Lo(_))return d=d.get(M)||null,f(x,d,_,A,null);if(typeof _.then=="function")return p(d,x,M,rc(_),A);if(_.$$typeof===Ma)return p(d,x,M,sc(x,_),A);oc(x,_)}return null}function g(d,x,M,_){for(var A=null,R=null,T=x,y=x=0,C=null;T!==null&&y<M.length;y++){T.index>y?(C=T,T=null):C=T.sibling;var w=u(d,T,M[y],_);if(w===null){T===null&&(T=C);break}t&&T&&w.alternate===null&&e(d,T),x=s(w,x,y),R===null?A=w:R.sibling=w,R=w,T=C}if(y===M.length)return n(d,T),ft&&xa(d,y),A;if(T===null){for(;y<M.length;y++)T=h(d,M[y],_),T!==null&&(x=s(T,x,y),R===null?A=T:R.sibling=T,R=T);return ft&&xa(d,y),A}for(T=i(T);y<M.length;y++)C=p(T,d,y,M[y],_),C!==null&&(t&&C.alternate!==null&&T.delete(C.key===null?y:C.key),x=s(C,x,y),R===null?A=C:R.sibling=C,R=C);return t&&T.forEach(function(D){return e(d,D)}),ft&&xa(d,y),A}function b(d,x,M,_){if(M==null)throw Error(le(151));for(var A=null,R=null,T=x,y=x=0,C=null,w=M.next();T!==null&&!w.done;y++,w=M.next()){T.index>y?(C=T,T=null):C=T.sibling;var D=u(d,T,w.value,_);if(D===null){T===null&&(T=C);break}t&&T&&D.alternate===null&&e(d,T),x=s(D,x,y),R===null?A=D:R.sibling=D,R=D,T=C}if(w.done)return n(d,T),ft&&xa(d,y),A;if(T===null){for(;!w.done;y++,w=M.next())w=h(d,w.value,_),w!==null&&(x=s(w,x,y),R===null?A=w:R.sibling=w,R=w);return ft&&xa(d,y),A}for(T=i(T);!w.done;y++,w=M.next())w=p(T,d,y,w.value,_),w!==null&&(t&&w.alternate!==null&&T.delete(w.key===null?y:w.key),x=s(w,x,y),R===null?A=w:R.sibling=w,R=w);return t&&T.forEach(function(P){return e(d,P)}),ft&&xa(d,y),A}function v(d,x,M,_){if(typeof M=="object"&&M!==null&&M.type===Dr&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case $l:e:{for(var A=M.key;x!==null;){if(x.key===A){if(A=M.type,A===Dr){if(x.tag===7){n(d,x.sibling),_=a(x,M.props.children),_.return=d,d=_;break e}}else if(x.elementType===A||typeof A=="object"&&A!==null&&A.$$typeof===ja&&Ds(A)===x.type){n(d,x.sibling),_=a(x,M.props),zo(_,M),_.return=d,d=_;break e}n(d,x);break}else e(d,x);x=x.sibling}M.type===Dr?(_=Fs(M.props.children,d.mode,_,M.key),_.return=d,d=_):(_=Kc(M.type,M.key,M.props,null,d.mode,_),zo(_,M),_.return=d,d=_)}return r(d);case Ko:e:{for(A=M.key;x!==null;){if(x.key===A)if(x.tag===4&&x.stateNode.containerInfo===M.containerInfo&&x.stateNode.implementation===M.implementation){n(d,x.sibling),_=a(x,M.children||[]),_.return=d,d=_;break e}else{n(d,x);break}else e(d,x);x=x.sibling}_=Gf(M,d.mode,_),_.return=d,d=_}return r(d);case ja:return M=Ds(M),v(d,x,M,_)}if(Qo(M))return g(d,x,M,_);if(Lo(M)){if(A=Lo(M),typeof A!="function")throw Error(le(150));return M=A.call(M),b(d,x,M,_)}if(typeof M.then=="function")return v(d,x,rc(M),_);if(M.$$typeof===Ma)return v(d,x,sc(d,M),_);oc(d,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,x!==null&&x.tag===6?(n(d,x.sibling),_=a(x,M),_.return=d,d=_):(n(d,x),_=Hf(M,d.mode,_),_.return=d,d=_),r(d)):n(d,x)}return function(d,x,M,_){try{Tl=0;var A=v(d,x,M,_);return Kr=null,A}catch(T){if(T===Mo||T===ff)throw T;var R=ti(29,T,null,d.mode);return R.lanes=_,R.return=d,R}finally{}}}var js=lx(!0),cx=lx(!1),qa=!1;function um(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function gh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function ls(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function cs(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,gt&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=bu(t),ex(t,null,n),e}return uf(t,i,e,n),bu(t)}function cl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,w_(t,n)}}function kf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var vh=!1;function ul(){if(vh){var t=Zr;if(t!==null)throw t}}function fl(t,e,n,i){vh=!1;var a=t.updateQueue;qa=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var f=t.alternate;f!==null&&(f=f.updateQueue,o=f.lastBaseUpdate,o!==r&&(o===null?f.firstBaseUpdate=c:o.next=c,f.lastBaseUpdate=l))}if(s!==null){var h=a.baseState;r=0,f=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(ot&u)===u:(i&u)===u){u!==0&&u===ao&&(vh=!0),f!==null&&(f=f.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,b=o;u=e;var v=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){h=g.call(v,h,u);break e}h=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(v,h,u):g,u==null)break e;h=Xt({},h,u);break e;case 2:qa=!0}}u=o.callback,u!==null&&(t.flags|=64,p&&(t.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},f===null?(c=f=p,l=h):f=f.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);f===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=f,s===null&&(a.shared.lanes=0),_s|=r,t.lanes=r,t.memoizedState=h}}function ux(t,e){if(typeof t!="function")throw Error(le(191,t));t.call(e)}function fx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)ux(n[t],e)}var so=ta(null),wu=ta(0);function Wg(t,e){t=Pa,It(wu,t),It(so,e),Pa=t|e.baseLanes}function _h(){It(wu,Pa),It(so,so.current)}function fm(){Pa=wu.current,vn(so),vn(wu)}var li=ta(null),Ti=null;function Za(t){var e=t.alternate;It($t,$t.current&1),It(li,t),Ti===null&&(e===null||so.current!==null||e.memoizedState!==null)&&(Ti=t)}function xh(t){It($t,$t.current),It(li,t),Ti===null&&(Ti=t)}function dx(t){t.tag===22?(It($t,$t.current),It(li,t),Ti===null&&(Ti=t)):Ka()}function Ka(){It($t,$t.current),It(li,li.current)}function ei(t){vn(li),Ti===t&&(Ti=null),vn($t)}var $t=ta(0);function Cu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Bh(n)||Fh(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Ua=0,Je=null,Lt=null,nn=null,Ru=!1,Qr=!1,qs=!1,Nu=0,Al=0,Jr=null,zb=0;function qt(){throw Error(le(321))}function dm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!oi(t[n],e[n]))return!1;return!0}function hm(t,e,n,i,a,s){return Ua=s,Je=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,He.H=t===null||t.memoizedState===null?kx:Em,qs=!1,s=n(i,a),qs=!1,Qr&&(s=px(e,n,i,a)),hx(t),s}function hx(t){He.H=wl;var e=Lt!==null&&Lt.next!==null;if(Ua=0,nn=Lt=Je=null,Ru=!1,Al=0,Jr=null,e)throw Error(le(300));t===null||rn||(t=t.dependencies,t!==null&&Tu(t)&&(rn=!0))}function px(t,e,n,i){Je=t;var a=0;do{if(Qr&&(Jr=null),Al=0,Qr=!1,25<=a)throw Error(le(301));if(a+=1,nn=Lt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}He.H=Xx,s=e(n,i)}while(Qr);return s}function Ib(){var t=He.H,e=t.useState()[0];return e=typeof e.then=="function"?Xl(e):e,t=t.useState()[0],(Lt!==null?Lt.memoizedState:null)!==t&&(Je.flags|=1024),e}function pm(){var t=Nu!==0;return Nu=0,t}function mm(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function gm(t){if(Ru){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Ru=!1}Ua=0,nn=Lt=Je=null,Qr=!1,Al=Nu=0,Jr=null}function Pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return nn===null?Je.memoizedState=nn=t:nn=nn.next=t,nn}function en(){if(Lt===null){var t=Je.alternate;t=t!==null?t.memoizedState:null}else t=Lt.next;var e=nn===null?Je.memoizedState:nn.next;if(e!==null)nn=e,Lt=t;else{if(t===null)throw Je.alternate===null?Error(le(467)):Error(le(310));Lt=t,t={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},nn===null?Je.memoizedState=nn=t:nn=nn.next=t}return nn}function df(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Xl(t){var e=Al;return Al+=1,Jr===null&&(Jr=[]),t=ox(Jr,t,e),e=Je,(nn===null?e.memoizedState:nn.next)===null&&(e=e.alternate,He.H=e===null||e.memoizedState===null?kx:Em),t}function hf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Xl(t);if(t.$$typeof===Ma)return yn(t)}throw Error(le(438,String(t)))}function vm(t){var e=null,n=Je.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=Je.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=df(),Je.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=MM;return e.index++,n}function La(t,e){return typeof e=="function"?e(t):e}function Jc(t){var e=en();return _m(e,Lt,t)}function _m(t,e,n){var i=t.queue;if(i===null)throw Error(le(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,f=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(ot&h)===h:(Ua&h)===h){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===ao&&(f=!0);else if((Ua&u)===u){c=c.next,u===ao&&(f=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=s):l=l.next=h,Je.lanes|=u,_s|=u;h=c.action,qs&&n(s,h),s=c.hasEagerState?c.eagerState:n(s,h)}else u={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,Je.lanes|=h,_s|=h;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!oi(s,t.memoizedState)&&(rn=!0,f&&(n=Zr,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function Xf(t){var e=en(),n=e.queue;if(n===null)throw Error(le(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);oi(s,e.memoizedState)||(rn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function mx(t,e,n){var i=Je,a=en(),s=ft;if(s){if(n===void 0)throw Error(le(407));n=n()}else n=e();var r=!oi((Lt||a).memoizedState,n);if(r&&(a.memoizedState=n,rn=!0),a=a.queue,xm(_x.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||nn!==null&&nn.memoizedState.tag&1){if(i.flags|=2048,ro(9,{destroy:void 0},vx.bind(null,i,a,n,e),null),Pt===null)throw Error(le(349));s||Ua&127||gx(i,e,n)}return n}function gx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Je.updateQueue,e===null?(e=df(),Je.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function vx(t,e,n,i){e.value=n,e.getSnapshot=i,xx(e)&&Sx(t)}function _x(t,e,n){return n(function(){xx(e)&&Sx(t)})}function xx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!oi(t,n)}catch{return!0}}function Sx(t){var e=nr(t,2);e!==null&&qn(e,t,2)}function Sh(t){var e=Pn();if(typeof t=="function"){var n=t;if(t=n(),qs){$a(!0);try{n()}finally{$a(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:t},e}function yx(t,e,n,i){return t.baseState=n,_m(t,Lt,typeof i=="function"?i:La)}function Bb(t,e,n,i,a){if(mf(t))throw Error(le(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};He.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,Mx(e,s)):(s.next=n.next,e.pending=n.next=s)}}function Mx(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=He.T,r={};He.T=r;try{var o=n(a,i),l=He.S;l!==null&&l(r,o),jg(t,e,o)}catch(c){yh(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),He.T=s}}else try{s=n(a,i),jg(t,e,s)}catch(c){yh(t,e,c)}}function jg(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){qg(t,e,i)},function(i){return yh(t,e,i)}):qg(t,e,n)}function qg(t,e,n){e.status="fulfilled",e.value=n,bx(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Mx(t,n)))}function yh(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,bx(e),e=e.next;while(e!==i)}t.action=null}function bx(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Ex(t,e){return e}function Yg(t,e){if(ft){var n=Pt.formState;if(n!==null){e:{var i=Je;if(ft){if(Vt){t:{for(var a=Vt,s=Mi;a.nodeType!==8;){if(!s){a=null;break t}if(a=Ai(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Vt=Ai(a.nextSibling),i=a.data==="F!";break e}}gs(i)}i=!1}i&&(e=n[0])}}return n=Pn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ex,lastRenderedState:e},n.queue=i,n=Hx.bind(null,Je,i),i.dispatch=n,i=Sh(!1),s=bm.bind(null,Je,!1,i.queue),i=Pn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=Bb.bind(null,Je,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Zg(t){var e=en();return Tx(e,Lt,t)}function Tx(t,e,n){if(e=_m(t,e,Ex)[0],t=Jc(La)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Xl(e)}catch(r){throw r===Mo?ff:r}else i=e;e=en();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&(Je.flags|=2048,ro(9,{destroy:void 0},Fb.bind(null,a,n),null)),[i,s,t]}function Fb(t,e){t.action=e}function Kg(t){var e=en(),n=Lt;if(n!==null)return Tx(e,n,t);en(),e=e.memoizedState,n=en();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function ro(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=Je.updateQueue,e===null&&(e=df(),Je.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function Ax(){return en().memoizedState}function $c(t,e,n,i){var a=Pn();Je.flags|=t,a.memoizedState=ro(1|e,{destroy:void 0},n,i===void 0?null:i)}function pf(t,e,n,i){var a=en();i=i===void 0?null:i;var s=a.memoizedState.inst;Lt!==null&&i!==null&&dm(i,Lt.memoizedState.deps)?a.memoizedState=ro(e,s,n,i):(Je.flags|=t,a.memoizedState=ro(1|e,s,n,i))}function Qg(t,e){$c(8390656,8,t,e)}function xm(t,e){pf(2048,8,t,e)}function Hb(t){Je.flags|=4;var e=Je.updateQueue;if(e===null)e=df(),Je.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function wx(t){var e=en().memoizedState;return Hb({ref:e,nextImpl:t}),function(){if(gt&2)throw Error(le(440));return e.impl.apply(void 0,arguments)}}function Cx(t,e){return pf(4,2,t,e)}function Rx(t,e){return pf(4,4,t,e)}function Nx(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Dx(t,e,n){n=n!=null?n.concat([t]):null,pf(4,4,Nx.bind(null,e,t),n)}function Sm(){}function Ux(t,e){var n=en();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&dm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Lx(t,e){var n=en();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&dm(e,i[1]))return i[0];if(i=t(),qs){$a(!0);try{t()}finally{$a(!1)}}return n.memoizedState=[i,e],i}function ym(t,e,n){return n===void 0||Ua&1073741824&&!(ot&261930)?t.memoizedState=e:(t.memoizedState=n,t=yS(),Je.lanes|=t,_s|=t,n)}function Ox(t,e,n,i){return oi(n,e)?n:so.current!==null?(t=ym(t,n,i),oi(t,e)||(rn=!0),t):!(Ua&42)||Ua&1073741824&&!(ot&261930)?(rn=!0,t.memoizedState=n):(t=yS(),Je.lanes|=t,_s|=t,e)}function Px(t,e,n,i,a){var s=vt.p;vt.p=s!==0&&8>s?s:8;var r=He.T,o={};He.T=o,bm(t,!1,e,n);try{var l=a(),c=He.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var f=Pb(l,i);dl(t,e,f,ri(t))}else dl(t,e,i,ri(t))}catch(h){dl(t,e,{then:function(){},status:"rejected",reason:h},ri())}finally{vt.p=s,r!==null&&o.types!==null&&(r.types=o.types),He.T=r}}function Gb(){}function Mh(t,e,n,i){if(t.tag!==5)throw Error(le(476));var a=zx(t).queue;Px(t,a,e,Bs,n===null?Gb:function(){return Ix(t),n(i)})}function zx(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Bs,baseState:Bs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:Bs},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:La,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Ix(t){var e=zx(t);e.next===null&&(e=t.alternate.memoizedState),dl(t,e.next.queue,{},ri())}function Mm(){return yn(Nl)}function Bx(){return en().memoizedState}function Fx(){return en().memoizedState}function Vb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ri();t=ls(n);var i=cs(e,t,n);i!==null&&(qn(i,e,n),cl(i,e,n)),e={cache:om()},t.payload=e;return}e=e.return}}function kb(t,e,n){var i=ri();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},mf(t)?Gx(e,n):(n=im(t,e,n,i),n!==null&&(qn(n,t,i),Vx(n,e,i)))}function Hx(t,e,n){var i=ri();dl(t,e,n,i)}function dl(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(mf(t))Gx(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,oi(o,r))return uf(t,e,a,0),Pt===null&&cf(),!1}catch{}finally{}if(n=im(t,e,a,i),n!==null)return qn(n,t,i),Vx(n,e,i),!0}return!1}function bm(t,e,n,i){if(i={lane:2,revertLane:Um(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},mf(t)){if(e)throw Error(le(479))}else e=im(t,n,i,2),e!==null&&qn(e,t,2)}function mf(t){var e=t.alternate;return t===Je||e!==null&&e===Je}function Gx(t,e){Qr=Ru=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vx(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,w_(t,n)}}var wl={readContext:yn,use:hf,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useLayoutEffect:qt,useInsertionEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useSyncExternalStore:qt,useId:qt,useHostTransitionStatus:qt,useFormState:qt,useActionState:qt,useOptimistic:qt,useMemoCache:qt,useCacheRefresh:qt};wl.useEffectEvent=qt;var kx={readContext:yn,use:hf,useCallback:function(t,e){return Pn().memoizedState=[t,e===void 0?null:e],t},useContext:yn,useEffect:Qg,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,$c(4194308,4,Nx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return $c(4194308,4,t,e)},useInsertionEffect:function(t,e){$c(4,2,t,e)},useMemo:function(t,e){var n=Pn();e=e===void 0?null:e;var i=t();if(qs){$a(!0);try{t()}finally{$a(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=Pn();if(n!==void 0){var a=n(e);if(qs){$a(!0);try{n(e)}finally{$a(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=kb.bind(null,Je,t),[i.memoizedState,t]},useRef:function(t){var e=Pn();return t={current:t},e.memoizedState=t},useState:function(t){t=Sh(t);var e=t.queue,n=Hx.bind(null,Je,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Sm,useDeferredValue:function(t,e){var n=Pn();return ym(n,t,e)},useTransition:function(){var t=Sh(!1);return t=Px.bind(null,Je,t.queue,!0,!1),Pn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=Je,a=Pn();if(ft){if(n===void 0)throw Error(le(407));n=n()}else{if(n=e(),Pt===null)throw Error(le(349));ot&127||gx(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Qg(_x.bind(null,i,s,t),[t]),i.flags|=2048,ro(9,{destroy:void 0},vx.bind(null,i,s,n,e),null),n},useId:function(){var t=Pn(),e=Pt.identifierPrefix;if(ft){var n=Yi,i=qi;n=(i&~(1<<32-si(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Nu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=zb++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Mm,useFormState:Yg,useActionState:Yg,useOptimistic:function(t){var e=Pn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=bm.bind(null,Je,!0,n),n.dispatch=e,[t,e]},useMemoCache:vm,useCacheRefresh:function(){return Pn().memoizedState=Vb.bind(null,Je)},useEffectEvent:function(t){var e=Pn(),n={impl:t};return e.memoizedState=n,function(){if(gt&2)throw Error(le(440));return n.impl.apply(void 0,arguments)}}},Em={readContext:yn,use:hf,useCallback:Ux,useContext:yn,useEffect:xm,useImperativeHandle:Dx,useInsertionEffect:Cx,useLayoutEffect:Rx,useMemo:Lx,useReducer:Jc,useRef:Ax,useState:function(){return Jc(La)},useDebugValue:Sm,useDeferredValue:function(t,e){var n=en();return Ox(n,Lt.memoizedState,t,e)},useTransition:function(){var t=Jc(La)[0],e=en().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:mx,useId:Bx,useHostTransitionStatus:Mm,useFormState:Zg,useActionState:Zg,useOptimistic:function(t,e){var n=en();return yx(n,Lt,t,e)},useMemoCache:vm,useCacheRefresh:Fx};Em.useEffectEvent=wx;var Xx={readContext:yn,use:hf,useCallback:Ux,useContext:yn,useEffect:xm,useImperativeHandle:Dx,useInsertionEffect:Cx,useLayoutEffect:Rx,useMemo:Lx,useReducer:Xf,useRef:Ax,useState:function(){return Xf(La)},useDebugValue:Sm,useDeferredValue:function(t,e){var n=en();return Lt===null?ym(n,t,e):Ox(n,Lt.memoizedState,t,e)},useTransition:function(){var t=Xf(La)[0],e=en().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:mx,useId:Bx,useHostTransitionStatus:Mm,useFormState:Kg,useActionState:Kg,useOptimistic:function(t,e){var n=en();return Lt!==null?yx(n,Lt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:vm,useCacheRefresh:Fx};Xx.useEffectEvent=wx;function Wf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var bh={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=ri(),a=ls(i);a.payload=e,n!=null&&(a.callback=n),e=cs(t,a,i),e!==null&&(qn(e,t,i),cl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=ri(),a=ls(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=cs(t,a,i),e!==null&&(qn(e,t,i),cl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ri(),i=ls(n);i.tag=2,e!=null&&(i.callback=e),e=cs(t,i,n),e!==null&&(qn(e,t,n),cl(e,t,n))}};function Jg(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!Ml(n,i)||!Ml(a,s):!0}function $g(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&bh.enqueueReplaceState(e,e.state,null)}function Ys(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=Xt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function Wx(t){Mu(t)}function jx(t){console.error(t)}function qx(t){Mu(t)}function Du(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function e0(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Eh(t,e,n){return n=ls(n),n.tag=3,n.payload={element:null},n.callback=function(){Du(t,e)},n}function Yx(t){return t=ls(t),t.tag=3,t}function Zx(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){e0(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){e0(e,n,i),typeof a!="function"&&(us===null?us=new Set([this]):us.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Xb(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&yo(e,n,a,!0),n=li.current,n!==null){switch(n.tag){case 31:case 13:return Ti===null?zu():n.alternate===null&&Yt===0&&(Yt=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Au?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),nd(t,i,a)),!1;case 22:return n.flags|=65536,i===Au?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),nd(t,i,a)),!1}throw Error(le(435,n.tag))}return nd(t,i,a),zu(),!1}if(ft)return e=li.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==fh&&(t=Error(le(422),{cause:i}),El(yi(t,n)))):(i!==fh&&(e=Error(le(423),{cause:i}),El(yi(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=yi(i,n),a=Eh(t.stateNode,i,a),kf(t,a),Yt!==4&&(Yt=2)),!1;var s=Error(le(520),{cause:i});if(s=yi(s,n),ml===null?ml=[s]:ml.push(s),Yt!==4&&(Yt=2),e===null)return!0;i=yi(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Eh(n.stateNode,i,t),kf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(us===null||!us.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Yx(a),Zx(a,t,n,i),kf(n,a),!1}n=n.return}while(n!==null);return!1}var Tm=Error(le(461)),rn=!1;function _n(t,e,n,i){e.child=t===null?cx(e,null,n,i):js(e,t.child,n,i)}function t0(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Ws(e),i=hm(t,e,n,r,s,a),o=pm(),t!==null&&!rn?(mm(t,e,a),Oa(t,e,a)):(ft&&o&&sm(e),e.flags|=1,_n(t,e,i,a),e.child)}function n0(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!am(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,Kx(t,e,s,i,a)):(t=Kc(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Am(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ml,n(r,i)&&t.ref===e.ref)return Oa(t,e,a)}return e.flags|=1,t=Aa(s,i),t.ref=e.ref,t.return=e,e.child=t}function Kx(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(Ml(s,i)&&t.ref===e.ref)if(rn=!1,e.pendingProps=i=s,Am(t,a))t.flags&131072&&(rn=!0);else return e.lanes=t.lanes,Oa(t,e,a)}return Th(t,e,n,i,a)}function Qx(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return i0(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&Qc(e,s!==null?s.cachePool:null),s!==null?Wg(e,s):_h(),dx(e);else return i=e.lanes=536870912,i0(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(Qc(e,s.cachePool),Wg(e,s),Ka(),e.memoizedState=null):(t!==null&&Qc(e,null),_h(),Ka());return _n(t,e,a,n),e.child}function $o(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function i0(t,e,n,i,a){var s=lm();return s=s===null?null:{parent:sn._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&Qc(e,null),_h(),dx(e),t!==null&&yo(t,e,i,!0),e.childLanes=a,null}function eu(t,e){return e=Uu({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function a0(t,e,n){return js(e,t.child,null,n),t=eu(e,e.pendingProps),t.flags|=2,ei(e),e.memoizedState=null,t}function Wb(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(ft){if(i.mode==="hidden")return t=eu(e,i),e.lanes=536870912,$o(null,t);if(xh(e),(t=Vt)?(t=kS(t,Mi),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:ms!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},n=nx(t),n.return=e,e.child=n,Sn=e,Vt=null)):t=null,t===null)throw gs(e);return e.lanes=536870912,null}return eu(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(xh(e),a)if(e.flags&256)e.flags&=-257,e=a0(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(le(558));else if(rn||yo(t,e,n,!1),a=(n&t.childLanes)!==0,rn||a){if(i=Pt,i!==null&&(r=C_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,nr(t,r),qn(i,t,r),Tm;zu(),e=a0(t,e,n)}else t=s.treeContext,Vt=Ai(r.nextSibling),Sn=e,ft=!0,os=null,Mi=!1,t!==null&&ax(e,t),e=eu(e,i),e.flags|=4096;return e}return t=Aa(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function tu(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(le(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Th(t,e,n,i,a){return Ws(e),n=hm(t,e,n,i,void 0,a),i=pm(),t!==null&&!rn?(mm(t,e,a),Oa(t,e,a)):(ft&&i&&sm(e),e.flags|=1,_n(t,e,n,a),e.child)}function s0(t,e,n,i,a,s){return Ws(e),e.updateQueue=null,n=px(e,i,n,a),hx(t),i=pm(),t!==null&&!rn?(mm(t,e,s),Oa(t,e,s)):(ft&&i&&sm(e),e.flags|=1,_n(t,e,n,s),e.child)}function r0(t,e,n,i,a){if(Ws(e),e.stateNode===null){var s=Fr,r=n.contextType;typeof r=="object"&&r!==null&&(s=yn(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=bh,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},um(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?yn(r):Fr,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Wf(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&bh.enqueueReplaceState(s,s.state,null),fl(e,i,s,a),ul(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=Ys(n,o);s.props=l;var c=s.context,f=n.contextType;r=Fr,typeof f=="object"&&f!==null&&(r=yn(f));var h=n.getDerivedStateFromProps;f=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,f||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&$g(e,s,i,r),qa=!1;var u=e.memoizedState;s.state=u,fl(e,i,s,a),ul(),c=e.memoizedState,o||u!==c||qa?(typeof h=="function"&&(Wf(e,n,h,i),c=e.memoizedState),(l=qa||Jg(e,n,l,i,u,c,r))?(f||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,gh(t,e),r=e.memoizedProps,f=Ys(n,r),s.props=f,h=e.pendingProps,u=s.context,c=n.contextType,l=Fr,typeof c=="object"&&c!==null&&(l=yn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==h||u!==l)&&$g(e,s,i,l),qa=!1,u=e.memoizedState,s.state=u,fl(e,i,s,a),ul();var p=e.memoizedState;r!==h||u!==p||qa||t!==null&&t.dependencies!==null&&Tu(t.dependencies)?(typeof o=="function"&&(Wf(e,n,o,i),p=e.memoizedState),(f=qa||Jg(e,n,f,i,u,p,l)||t!==null&&t.dependencies!==null&&Tu(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=p),s.props=i,s.state=p,s.context=l,i=f):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,tu(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=js(e,t.child,null,a),e.child=js(e,null,n,a)):_n(t,e,n,a),e.memoizedState=s.state,t=e.child):t=Oa(t,e,a),t}function o0(t,e,n,i){return Xs(),e.flags|=256,_n(t,e,n,i),e.child}var jf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qf(t){return{baseLanes:t,cachePool:rx()}}function Yf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ni),t}function Jx(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:($t.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(ft){if(a?Za(e):Ka(),(t=Vt)?(t=kS(t,Mi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:ms!==null?{id:qi,overflow:Yi}:null,retryLane:536870912,hydrationErrors:null},n=nx(t),n.return=e,e.child=n,Sn=e,Vt=null)):t=null,t===null)throw gs(e);return Fh(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(Ka(),a=e.mode,o=Uu({mode:"hidden",children:o},a),i=Fs(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=qf(n),i.childLanes=Yf(t,r,n),e.memoizedState=jf,$o(null,i)):(Za(e),Ah(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?(Za(e),e.flags&=-257,e=Zf(t,e,n)):e.memoizedState!==null?(Ka(),e.child=t.child,e.flags|=128,e=null):(Ka(),o=i.fallback,a=e.mode,i=Uu({mode:"visible",children:i.children},a),o=Fs(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,js(e,t.child,null,n),i=e.child,i.memoizedState=qf(n),i.childLanes=Yf(t,r,n),e.memoizedState=jf,e=$o(null,i));else if(Za(e),Fh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(le(419)),i.stack="",i.digest=r,El({value:i,source:null,stack:null}),e=Zf(t,e,n)}else if(rn||yo(t,e,n,!1),r=(n&t.childLanes)!==0,rn||r){if(r=Pt,r!==null&&(i=C_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,nr(t,i),qn(r,t,i),Tm;Bh(o)||zu(),e=Zf(t,e,n)}else Bh(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,Vt=Ai(o.nextSibling),Sn=e,ft=!0,os=null,Mi=!1,t!==null&&ax(e,t),e=Ah(e,i.children),e.flags|=4096);return e}return a?(Ka(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=Aa(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=Aa(c,o):(o=Fs(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,$o(null,i),i=e.child,o=t.child.memoizedState,o===null?o=qf(n):(a=o.cachePool,a!==null?(l=sn._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=rx(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Yf(t,r,n),e.memoizedState=jf,$o(t.child,i)):(Za(e),n=t.child,t=n.sibling,n=Aa(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function Ah(t,e){return e=Uu({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Uu(t,e){return t=ti(22,t,null,e),t.lanes=0,t}function Zf(t,e,n){return js(e,t.child,null,n),t=Ah(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function l0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),hh(t.return,e,n)}function Kf(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function $x(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=$t.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,It($t,r),_n(t,e,i,n),i=ft?bl:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&l0(t,n,e);else if(t.tag===19)l0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Cu(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Kf(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Cu(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Kf(e,!0,n,null,s,i);break;case"together":Kf(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Oa(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),_s|=e.lanes,!(n&e.childLanes))if(t!==null){if(yo(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(le(153));if(e.child!==null){for(t=e.child,n=Aa(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=Aa(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Am(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Tu(t)))}function jb(t,e,n){switch(e.tag){case 3:_u(e,e.stateNode.containerInfo),Ya(e,sn,t.memoizedState.cache),Xs();break;case 27:case 5:eh(e);break;case 4:_u(e,e.stateNode.containerInfo);break;case 10:Ya(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,xh(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(Za(e),e.flags|=128,null):n&e.child.childLanes?Jx(t,e,n):(Za(e),t=Oa(t,e,n),t!==null?t.sibling:null);Za(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(yo(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return $x(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),It($t,$t.current),i)break;return null;case 22:return e.lanes=0,Qx(t,e,n,e.pendingProps);case 24:Ya(e,sn,t.memoizedState.cache)}return Oa(t,e,n)}function eS(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)rn=!0;else{if(!Am(t,n)&&!(e.flags&128))return rn=!1,jb(t,e,n);rn=!!(t.flags&131072)}else rn=!1,ft&&e.flags&1048576&&ix(e,bl,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Ds(e.elementType),e.type=t,typeof t=="function")am(t)?(i=Ys(t,i),e.tag=1,e=r0(null,e,t,i,n)):(e.tag=0,e=Th(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Xp){e.tag=11,e=t0(null,e,t,i,n);break e}else if(a===Wp){e.tag=14,e=n0(null,e,t,i,n);break e}}throw e=Jd(t)||t,Error(le(306,e,""))}}return e;case 0:return Th(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=Ys(i,e.pendingProps),r0(t,e,i,a,n);case 3:e:{if(_u(e,e.stateNode.containerInfo),t===null)throw Error(le(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,gh(t,e),fl(e,i,null,n);var r=e.memoizedState;if(i=r.cache,Ya(e,sn,i),i!==s.cache&&ph(e,[sn],n,!0),ul(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=o0(t,e,i,n);break e}else if(i!==a){a=yi(Error(le(424)),e),El(a),e=o0(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Vt=Ai(t.firstChild),Sn=e,ft=!0,os=null,Mi=!0,n=cx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Xs(),i===a){e=Oa(t,e,n);break e}_n(t,e,i,n)}e=e.child}return e;case 26:return tu(t,e),t===null?(n=C0(e.type,null,e.pendingProps,null))?e.memoizedState=n:ft||(n=e.type,t=e.pendingProps,i=Hu(rs.current).createElement(n),i[xn]=e,i[Zn]=t,En(i,n,t),mn(i),e.stateNode=i):e.memoizedState=C0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return eh(e),t===null&&ft&&(i=e.stateNode=XS(e.type,e.pendingProps,rs.current),Sn=e,Mi=!0,a=Vt,ys(e.type)?(Hh=a,Vt=Ai(i.firstChild)):Vt=a),_n(t,e,e.pendingProps.children,n),tu(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&ft&&((a=i=Vt)&&(i=ME(i,e.type,e.pendingProps,Mi),i!==null?(e.stateNode=i,Sn=e,Vt=Ai(i.firstChild),Mi=!1,a=!0):a=!1),a||gs(e)),eh(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,zh(a,s)?i=null:r!==null&&zh(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=hm(t,e,Ib,null,null,n),Nl._currentValue=a),tu(t,e),_n(t,e,i,n),e.child;case 6:return t===null&&ft&&((t=n=Vt)&&(n=bE(n,e.pendingProps,Mi),n!==null?(e.stateNode=n,Sn=e,Vt=null,t=!0):t=!1),t||gs(e)),null;case 13:return Jx(t,e,n);case 4:return _u(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=js(e,null,i,n):_n(t,e,i,n),e.child;case 11:return t0(t,e,e.type,e.pendingProps,n);case 7:return _n(t,e,e.pendingProps,n),e.child;case 8:return _n(t,e,e.pendingProps.children,n),e.child;case 12:return _n(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,Ya(e,e.type,i.value),_n(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,Ws(e),a=yn(a),i=i(a),e.flags|=1,_n(t,e,i,n),e.child;case 14:return n0(t,e,e.type,e.pendingProps,n);case 15:return Kx(t,e,e.type,e.pendingProps,n);case 19:return $x(t,e,n);case 31:return Wb(t,e,n);case 22:return Qx(t,e,n,e.pendingProps);case 24:return Ws(e),i=yn(sn),t===null?(a=lm(),a===null&&(a=Pt,s=om(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},um(e),Ya(e,sn,a)):(t.lanes&n&&(gh(t,e),fl(e,null,null,n),ul()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Ya(e,sn,i)):(i=s.cache,Ya(e,sn,i),i!==a.cache&&ph(e,[sn],n,!0))),_n(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(le(156,e.tag))}function ca(t){t.flags|=4}function Qf(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(ES())t.flags|=8192;else throw Gs=Au,cm}else t.flags&=-16777217}function c0(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!qS(e))if(ES())t.flags|=8192;else throw Gs=Au,cm}function lc(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?T_():536870912,t.lanes|=e,oo|=e)}function Io(t,e){if(!ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Gt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function qb(t,e,n){var i=e.pendingProps;switch(rm(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Gt(e),null;case 1:return Gt(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),wa(sn),to(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(cr(e)?ca(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,Vf())),Gt(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(ca(e),s!==null?(Gt(e),c0(e,s)):(Gt(e),Qf(e,a,null,i,n))):s?s!==t.memoizedState?(ca(e),Gt(e),c0(e,s)):(Gt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&ca(e),Gt(e),Qf(e,a,t,i,n)),null;case 27:if(xu(e),n=rs.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ca(e);else{if(!i){if(e.stateNode===null)throw Error(le(166));return Gt(e),null}t=Qi.current,cr(e)?Bg(e):(t=XS(a,i,n),e.stateNode=t,ca(e))}return Gt(e),null;case 5:if(xu(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ca(e);else{if(!i){if(e.stateNode===null)throw Error(le(166));return Gt(e),null}if(s=Qi.current,cr(e))Bg(e);else{var r=Hu(rs.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[xn]=e,s[Zn]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(En(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&ca(e)}}return Gt(e),Qf(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&ca(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(le(166));if(t=rs.current,cr(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=Sn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[xn]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||HS(t.nodeValue,n)),t||gs(e,!0)}else t=Hu(t).createTextNode(i),t[xn]=e,e.stateNode=t}return Gt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=cr(e),n!==null){if(t===null){if(!i)throw Error(le(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(le(557));t[xn]=e}else Xs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),t=!1}else n=Vf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ei(e),e):(ei(e),null);if(e.flags&128)throw Error(le(558))}return Gt(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=cr(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(le(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(le(317));a[xn]=e}else Xs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),a=!1}else a=Vf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(ei(e),e):(ei(e),null)}return ei(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),lc(e,e.updateQueue),Gt(e),null);case 4:return to(),t===null&&Lm(e.stateNode.containerInfo),Gt(e),null;case 10:return wa(e.type),Gt(e),null;case 19:if(vn($t),i=e.memoizedState,i===null)return Gt(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)Io(i,!1);else{if(Yt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Cu(t),s!==null){for(e.flags|=128,Io(i,!1),t=s.updateQueue,e.updateQueue=t,lc(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)tx(n,t),n=n.sibling;return It($t,$t.current&1|2),ft&&xa(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&ii()>Ou&&(e.flags|=128,a=!0,Io(i,!1),e.lanes=4194304)}else{if(!a)if(t=Cu(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,lc(e,t),Io(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!ft)return Gt(e),null}else 2*ii()-i.renderingStartTime>Ou&&n!==536870912&&(e.flags|=128,a=!0,Io(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ii(),t.sibling=null,n=$t.current,It($t,a?n&1|2:n&1),ft&&xa(e,i.treeForkCount),t):(Gt(e),null);case 22:case 23:return ei(e),fm(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(Gt(e),e.subtreeFlags&6&&(e.flags|=8192)):Gt(e),n=e.updateQueue,n!==null&&lc(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&vn(Hs),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),wa(sn),Gt(e),null;case 25:return null;case 30:return null}throw Error(le(156,e.tag))}function Yb(t,e){switch(rm(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return wa(sn),to(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return xu(e),null;case 31:if(e.memoizedState!==null){if(ei(e),e.alternate===null)throw Error(le(340));Xs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ei(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(le(340));Xs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return vn($t),null;case 4:return to(),null;case 10:return wa(e.type),null;case 22:case 23:return ei(e),fm(),t!==null&&vn(Hs),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return wa(sn),null;case 25:return null;default:return null}}function tS(t,e){switch(rm(e),e.tag){case 3:wa(sn),to();break;case 26:case 27:case 5:xu(e);break;case 4:to();break;case 31:e.memoizedState!==null&&ei(e);break;case 13:ei(e);break;case 19:vn($t);break;case 10:wa(e.type);break;case 22:case 23:ei(e),fm(),t!==null&&vn(Hs);break;case 24:wa(sn)}}function Wl(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){wt(e,e.return,o)}}function vs(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(f){wt(a,l,f)}}}i=i.next}while(i!==s)}}catch(f){wt(e,e.return,f)}}function nS(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{fx(e,n)}catch(i){wt(t,t.return,i)}}}function iS(t,e,n){n.props=Ys(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){wt(t,e,i)}}function hl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){wt(t,e,a)}}function Zi(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){wt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){wt(t,e,a)}else n.current=null}function aS(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){wt(t,t.return,a)}}function Jf(t,e,n){try{var i=t.stateNode;gE(i,t.type,n,e),i[Zn]=e}catch(a){wt(t,t.return,a)}}function sS(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&ys(t.type)||t.tag===4}function $f(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||sS(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&ys(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function wh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ba));else if(i!==4&&(i===27&&ys(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(wh(t,e,n),t=t.sibling;t!==null;)wh(t,e,n),t=t.sibling}function Lu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&ys(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Lu(t,e,n),t=t.sibling;t!==null;)Lu(t,e,n),t=t.sibling}function rS(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);En(e,i,n),e[xn]=t,e[Zn]=n}catch(s){wt(t,t.return,s)}}var Sa=!1,an=!1,ed=!1,u0=typeof WeakSet=="function"?WeakSet:Set,pn=null;function Zb(t,e){if(t=t.containerInfo,Oh=Xu,t=q_(t),tm(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,f=0,h=t,u=null;t:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=r+a),h!==s||i!==0&&h.nodeType!==3||(l=r+i),h.nodeType===3&&(r+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++f===i&&(l=r),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ph={focusedElem:t,selectionRange:n},Xu=!1,pn=e;pn!==null;)if(e=pn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pn=t;else for(;pn!==null;){switch(e=pn,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=Ys(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(b){wt(n,n.return,b)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Ih(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Ih(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(le(163))}if(t=e.sibling,t!==null){t.return=e.return,pn=t;break}pn=e.return}}function oS(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:fa(t,n),i&4&&Wl(5,n);break;case 1:if(fa(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){wt(n,n.return,r)}else{var a=Ys(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){wt(n,n.return,r)}}i&64&&nS(n),i&512&&hl(n,n.return);break;case 3:if(fa(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{fx(t,e)}catch(r){wt(n,n.return,r)}}break;case 27:e===null&&i&4&&rS(n);case 26:case 5:fa(t,n),e===null&&i&4&&aS(n),i&512&&hl(n,n.return);break;case 12:fa(t,n);break;case 31:fa(t,n),i&4&&uS(t,n);break;case 13:fa(t,n),i&4&&fS(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=aE.bind(null,n),EE(t,n))));break;case 22:if(i=n.memoizedState!==null||Sa,!i){e=e!==null&&e.memoizedState!==null||an,a=Sa;var s=an;Sa=i,(an=e)&&!s?va(t,n,(n.subtreeFlags&8772)!==0):fa(t,n),Sa=a,an=s}break;case 30:break;default:fa(t,n)}}function lS(t){var e=t.alternate;e!==null&&(t.alternate=null,lS(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Zp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var Wt=null,Wn=!1;function ua(t,e,n){for(n=n.child;n!==null;)cS(t,e,n),n=n.sibling}function cS(t,e,n){if(ai&&typeof ai.onCommitFiberUnmount=="function")try{ai.onCommitFiberUnmount(Bl,n)}catch{}switch(n.tag){case 26:an||Zi(n,e),ua(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:an||Zi(n,e);var i=Wt,a=Wn;ys(n.type)&&(Wt=n.stateNode,Wn=!1),ua(t,e,n),vl(n.stateNode),Wt=i,Wn=a;break;case 5:an||Zi(n,e);case 6:if(i=Wt,a=Wn,Wt=null,ua(t,e,n),Wt=i,Wn=a,Wt!==null)if(Wn)try{(Wt.nodeType===9?Wt.body:Wt.nodeName==="HTML"?Wt.ownerDocument.body:Wt).removeChild(n.stateNode)}catch(s){wt(n,e,s)}else try{Wt.removeChild(n.stateNode)}catch(s){wt(n,e,s)}break;case 18:Wt!==null&&(Wn?(t=Wt,b0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),fo(t)):b0(Wt,n.stateNode));break;case 4:i=Wt,a=Wn,Wt=n.stateNode.containerInfo,Wn=!0,ua(t,e,n),Wt=i,Wn=a;break;case 0:case 11:case 14:case 15:vs(2,n,e),an||vs(4,n,e),ua(t,e,n);break;case 1:an||(Zi(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&iS(n,e,i)),ua(t,e,n);break;case 21:ua(t,e,n);break;case 22:an=(i=an)||n.memoizedState!==null,ua(t,e,n),an=i;break;default:ua(t,e,n)}}function uS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{fo(t)}catch(n){wt(e,e.return,n)}}}function fS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{fo(t)}catch(n){wt(e,e.return,n)}}function Kb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new u0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new u0),e;default:throw Error(le(435,t.tag))}}function cc(t,e){var n=Kb(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=sE.bind(null,t,i);i.then(a,a)}})}function Vn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(ys(o.type)){Wt=o.stateNode,Wn=!1;break e}break;case 5:Wt=o.stateNode,Wn=!1;break e;case 3:case 4:Wt=o.stateNode.containerInfo,Wn=!0;break e}o=o.return}if(Wt===null)throw Error(le(160));cS(s,r,a),Wt=null,Wn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)dS(e,t),e=e.sibling}var Pi=null;function dS(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Vn(e,t),kn(t),i&4&&(vs(3,t,t.return),Wl(3,t),vs(5,t,t.return));break;case 1:Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),i&64&&Sa&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Pi;if(Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[Gl]||s[xn]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),En(s,i,n),s[xn]=t,mn(s),i=s;break e;case"link":var r=N0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),En(s,i,n),a.head.appendChild(s);break;case"meta":if(r=N0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),En(s,i,n),a.head.appendChild(s);break;default:throw Error(le(468,i))}s[xn]=t,mn(s),i=s}t.stateNode=i}else D0(a,t.type,t.stateNode);else t.stateNode=R0(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?D0(a,t.type,t.stateNode):R0(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&Jf(t,t.memoizedProps,n.memoizedProps)}break;case 27:Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),n!==null&&i&4&&Jf(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Vn(e,t),kn(t),i&512&&(an||n===null||Zi(n,n.return)),t.flags&32){a=t.stateNode;try{io(a,"")}catch(g){wt(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,Jf(t,a,n!==null?n.memoizedProps:a)),i&1024&&(ed=!0);break;case 6:if(Vn(e,t),kn(t),i&4){if(t.stateNode===null)throw Error(le(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){wt(t,t.return,g)}}break;case 3:if(au=null,a=Pi,Pi=Gu(e.containerInfo),Vn(e,t),Pi=a,kn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{fo(e.containerInfo)}catch(g){wt(t,t.return,g)}ed&&(ed=!1,hS(t));break;case 4:i=Pi,Pi=Gu(t.stateNode.containerInfo),Vn(e,t),kn(t),Pi=i;break;case 12:Vn(e,t),kn(t);break;case 31:Vn(e,t),kn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,cc(t,i)));break;case 13:Vn(e,t),kn(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(gf=ii()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,cc(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Sa,f=an;if(Sa=c||a,an=f||l,Vn(e,t),an=f,Sa=c,kn(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||Sa||an||Us(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,u=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){wt(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){wt(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var p=l.stateNode;a?E0(p,!0):E0(l.stateNode,!1)}catch(g){wt(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,cc(t,n))));break;case 19:Vn(e,t),kn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,cc(t,i)));break;case 30:break;case 21:break;default:Vn(e,t),kn(t)}}function kn(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(sS(i)){n=i;break}i=i.return}if(n==null)throw Error(le(160));switch(n.tag){case 27:var a=n.stateNode,s=$f(t);Lu(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(io(r,""),n.flags&=-33);var o=$f(t);Lu(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=$f(t);wh(t,c,l);break;default:throw Error(le(161))}}catch(f){wt(t,t.return,f)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function hS(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;hS(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function fa(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)oS(t,e.alternate,e),e=e.sibling}function Us(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:vs(4,e,e.return),Us(e);break;case 1:Zi(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&iS(e,e.return,n),Us(e);break;case 27:vl(e.stateNode);case 26:case 5:Zi(e,e.return),Us(e);break;case 22:e.memoizedState===null&&Us(e);break;case 30:Us(e);break;default:Us(e)}t=t.sibling}}function va(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:va(a,s,n),Wl(4,s);break;case 1:if(va(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){wt(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)ux(l[a],o)}catch(c){wt(i,i.return,c)}}n&&r&64&&nS(s),hl(s,s.return);break;case 27:rS(s);case 26:case 5:va(a,s,n),n&&i===null&&r&4&&aS(s),hl(s,s.return);break;case 12:va(a,s,n);break;case 31:va(a,s,n),n&&r&4&&uS(a,s);break;case 13:va(a,s,n),n&&r&4&&fS(a,s);break;case 22:s.memoizedState===null&&va(a,s,n),hl(s,s.return);break;case 30:break;default:va(a,s,n)}e=e.sibling}}function wm(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&kl(n))}function Cm(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&kl(t))}function Di(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)pS(t,e,n,i),e=e.sibling}function pS(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Di(t,e,n,i),a&2048&&Wl(9,e);break;case 1:Di(t,e,n,i);break;case 3:Di(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&kl(t)));break;case 12:if(a&2048){Di(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){wt(e,e.return,l)}}else Di(t,e,n,i);break;case 31:Di(t,e,n,i);break;case 13:Di(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?Di(t,e,n,i):pl(t,e):s._visibility&2?Di(t,e,n,i):(s._visibility|=2,Rr(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&wm(r,e);break;case 24:Di(t,e,n,i),a&2048&&Cm(e.alternate,e);break;default:Di(t,e,n,i)}}function Rr(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Rr(s,r,o,l,a),Wl(8,r);break;case 23:break;case 22:var f=r.stateNode;r.memoizedState!==null?f._visibility&2?Rr(s,r,o,l,a):pl(s,r):(f._visibility|=2,Rr(s,r,o,l,a)),a&&c&2048&&wm(r.alternate,r);break;case 24:Rr(s,r,o,l,a),a&&c&2048&&Cm(r.alternate,r);break;default:Rr(s,r,o,l,a)}e=e.sibling}}function pl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:pl(n,i),a&2048&&wm(i.alternate,i);break;case 24:pl(n,i),a&2048&&Cm(i.alternate,i);break;default:pl(n,i)}e=e.sibling}}var el=8192;function ur(t,e,n){if(t.subtreeFlags&el)for(t=t.child;t!==null;)mS(t,e,n),t=t.sibling}function mS(t,e,n){switch(t.tag){case 26:ur(t,e,n),t.flags&el&&t.memoizedState!==null&&zE(n,Pi,t.memoizedState,t.memoizedProps);break;case 5:ur(t,e,n);break;case 3:case 4:var i=Pi;Pi=Gu(t.stateNode.containerInfo),ur(t,e,n),Pi=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=el,el=16777216,ur(t,e,n),el=i):ur(t,e,n));break;default:ur(t,e,n)}}function gS(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Bo(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pn=i,_S(i,t)}gS(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)vS(t),t=t.sibling}function vS(t){switch(t.tag){case 0:case 11:case 15:Bo(t),t.flags&2048&&vs(9,t,t.return);break;case 3:Bo(t);break;case 12:Bo(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,nu(t)):Bo(t);break;default:Bo(t)}}function nu(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pn=i,_S(i,t)}gS(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:vs(8,e,e.return),nu(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,nu(e));break;default:nu(e)}t=t.sibling}}function _S(t,e){for(;pn!==null;){var n=pn;switch(n.tag){case 0:case 11:case 15:vs(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:kl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,pn=i;else e:for(n=t;pn!==null;){i=pn;var a=i.sibling,s=i.return;if(lS(i),i===n){pn=null;break e}if(a!==null){a.return=s,pn=a;break e}pn=s}}}var Qb={getCacheForType:function(t){var e=yn(sn),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return yn(sn).controller.signal}},Jb=typeof WeakMap=="function"?WeakMap:Map,gt=0,Pt=null,st=null,ot=0,At=0,$n=null,ts=!1,bo=!1,Rm=!1,Pa=0,Yt=0,_s=0,Vs=0,Nm=0,ni=0,oo=0,ml=null,jn=null,Ch=!1,gf=0,xS=0,Ou=1/0,Pu=null,us=null,on=0,fs=null,lo=null,Ca=0,Rh=0,Nh=null,SS=null,gl=0,Dh=null;function ri(){return gt&2&&ot!==0?ot&-ot:He.T!==null?Um():R_()}function yS(){if(ni===0)if(!(ot&536870912)||ft){var t=tc;tc<<=1,!(tc&3932160)&&(tc=262144),ni=t}else ni=536870912;return t=li.current,t!==null&&(t.flags|=32),ni}function qn(t,e,n){(t===Pt&&(At===2||At===9)||t.cancelPendingCommit!==null)&&(co(t,0),ns(t,ot,ni,!1)),Hl(t,n),(!(gt&2)||t!==Pt)&&(t===Pt&&(!(gt&2)&&(Vs|=n),Yt===4&&ns(t,ot,ni,!1)),na(t))}function MS(t,e,n){if(gt&6)throw Error(le(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Fl(t,e),a=i?tE(t,e):td(t,e,!0),s=i;do{if(a===0){bo&&!i&&ns(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!$b(n)){a=td(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=ml;var l=o.current.memoizedState.isDehydrated;if(l&&(co(o,r).flags|=256),r=td(o,r,!1),r!==2){if(Rm&&!l){o.errorRecoveryDisabledLanes|=s,Vs|=s,a=4;break e}s=jn,jn=a,s!==null&&(jn===null?jn=s:jn.push.apply(jn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){co(t,0),ns(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(le(345));case 4:if((e&4194048)!==e)break;case 6:ns(i,e,ni,!ts);break e;case 2:jn=null;break;case 3:case 5:break;default:throw Error(le(329))}if((e&62914560)===e&&(a=gf+300-ii(),10<a)){if(ns(i,e,ni,!ts),sf(i,0,!0)!==0)break e;Ca=e,i.timeoutHandle=VS(f0.bind(null,i,n,jn,Pu,Ch,e,ni,Vs,oo,ts,s,"Throttled",-0,0),a);break e}f0(i,n,jn,Pu,Ch,e,ni,Vs,oo,ts,s,null,-0,0)}}break}while(!0);na(t)}function f0(t,e,n,i,a,s,r,o,l,c,f,h,u,p){if(t.timeoutHandle=-1,h=e.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:ba},mS(e,s,h);var g=(s&62914560)===s?gf-ii():(s&4194048)===s?xS-ii():0;if(g=IE(h,g),g!==null){Ca=s,t.cancelPendingCommit=g(h0.bind(null,t,e,s,n,i,a,r,o,l,f,h,null,u,p)),ns(t,s,r,!c);return}}h0(t,e,s,n,i,a,r,o,l)}function $b(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!oi(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function ns(t,e,n,i){e&=~Nm,e&=~Vs,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-si(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&A_(t,n,e)}function vf(){return gt&6?!0:(jl(0),!1)}function Dm(){if(st!==null){if(At===0)var t=st.return;else t=st,Ea=ir=null,gm(t),Kr=null,Tl=0,t=st;for(;t!==null;)tS(t.alternate,t),t=t.return;st=null}}function co(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,xE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Ca=0,Dm(),Pt=t,st=n=Aa(t.current,null),ot=e,At=0,$n=null,ts=!1,bo=Fl(t,e),Rm=!1,oo=ni=Nm=Vs=_s=Yt=0,jn=ml=null,Ch=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-si(i),s=1<<a;e|=t[a],i&=~s}return Pa=e,cf(),n}function bS(t,e){Je=null,He.H=wl,e===Mo||e===ff?(e=kg(),At=3):e===cm?(e=kg(),At=4):At=e===Tm?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,$n=e,st===null&&(Yt=1,Du(t,yi(e,t.current)))}function ES(){var t=li.current;return t===null?!0:(ot&4194048)===ot?Ti===null:(ot&62914560)===ot||ot&536870912?t===Ti:!1}function TS(){var t=He.H;return He.H=wl,t===null?wl:t}function AS(){var t=He.A;return He.A=Qb,t}function zu(){Yt=4,ts||(ot&4194048)!==ot&&li.current!==null||(bo=!0),!(_s&134217727)&&!(Vs&134217727)||Pt===null||ns(Pt,ot,ni,!1)}function td(t,e,n){var i=gt;gt|=2;var a=TS(),s=AS();(Pt!==t||ot!==e)&&(Pu=null,co(t,e)),e=!1;var r=Yt;e:do try{if(At!==0&&st!==null){var o=st,l=$n;switch(At){case 8:Dm(),r=6;break e;case 3:case 2:case 9:case 6:li.current===null&&(e=!0);var c=At;if(At=0,$n=null,Vr(t,o,l,c),n&&bo){r=0;break e}break;default:c=At,At=0,$n=null,Vr(t,o,l,c)}}eE(),r=Yt;break}catch(f){bS(t,f)}while(!0);return e&&t.shellSuspendCounter++,Ea=ir=null,gt=i,He.H=a,He.A=s,st===null&&(Pt=null,ot=0,cf()),r}function eE(){for(;st!==null;)wS(st)}function tE(t,e){var n=gt;gt|=2;var i=TS(),a=AS();Pt!==t||ot!==e?(Pu=null,Ou=ii()+500,co(t,e)):bo=Fl(t,e);e:do try{if(At!==0&&st!==null){e=st;var s=$n;t:switch(At){case 1:At=0,$n=null,Vr(t,e,s,1);break;case 2:case 9:if(Vg(s)){At=0,$n=null,d0(e);break}e=function(){At!==2&&At!==9||Pt!==t||(At=7),na(t)},s.then(e,e);break e;case 3:At=7;break e;case 4:At=5;break e;case 7:Vg(s)?(At=0,$n=null,d0(e)):(At=0,$n=null,Vr(t,e,s,7));break;case 5:var r=null;switch(st.tag){case 26:r=st.memoizedState;case 5:case 27:var o=st;if(r?qS(r):o.stateNode.complete){At=0,$n=null;var l=o.sibling;if(l!==null)st=l;else{var c=o.return;c!==null?(st=c,_f(c)):st=null}break t}}At=0,$n=null,Vr(t,e,s,5);break;case 6:At=0,$n=null,Vr(t,e,s,6);break;case 8:Dm(),Yt=6;break e;default:throw Error(le(462))}}nE();break}catch(f){bS(t,f)}while(!0);return Ea=ir=null,He.H=i,He.A=a,gt=n,st!==null?0:(Pt=null,ot=0,cf(),Yt)}function nE(){for(;st!==null&&!TM();)wS(st)}function wS(t){var e=eS(t.alternate,t,Pa);t.memoizedProps=t.pendingProps,e===null?_f(t):st=e}function d0(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=s0(n,e,e.pendingProps,e.type,void 0,ot);break;case 11:e=s0(n,e,e.pendingProps,e.type.render,e.ref,ot);break;case 5:gm(e);default:tS(n,e),e=st=tx(e,Pa),e=eS(n,e,Pa)}t.memoizedProps=t.pendingProps,e===null?_f(t):st=e}function Vr(t,e,n,i){Ea=ir=null,gm(e),Kr=null,Tl=0;var a=e.return;try{if(Xb(t,a,e,n,ot)){Yt=1,Du(t,yi(n,t.current)),st=null;return}}catch(s){if(a!==null)throw st=a,s;Yt=1,Du(t,yi(n,t.current)),st=null;return}e.flags&32768?(ft||i===1?t=!0:bo||ot&536870912?t=!1:(ts=t=!0,(i===2||i===9||i===3||i===6)&&(i=li.current,i!==null&&i.tag===13&&(i.flags|=16384))),CS(e,t)):_f(e)}function _f(t){var e=t;do{if(e.flags&32768){CS(e,ts);return}t=e.return;var n=qb(e.alternate,e,Pa);if(n!==null){st=n;return}if(e=e.sibling,e!==null){st=e;return}st=e=t}while(e!==null);Yt===0&&(Yt=5)}function CS(t,e){do{var n=Yb(t.alternate,t);if(n!==null){n.flags&=32767,st=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){st=t;return}st=t=n}while(t!==null);Yt=6,st=null}function h0(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do xf();while(on!==0);if(gt&6)throw Error(le(327));if(e!==null){if(e===t.current)throw Error(le(177));if(s=e.lanes|e.childLanes,s|=nm,PM(t,n,s,r,o,l),t===Pt&&(st=Pt=null,ot=0),lo=e,fs=t,Ca=n,Rh=s,Nh=a,SS=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,rE(Su,function(){return LS(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=He.T,He.T=null,a=vt.p,vt.p=2,r=gt,gt|=4;try{Zb(t,e,n)}finally{gt=r,vt.p=a,He.T=i}}on=1,RS(),NS(),DS()}}function RS(){if(on===1){on=0;var t=fs,e=lo,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=He.T,He.T=null;var i=vt.p;vt.p=2;var a=gt;gt|=4;try{dS(e,t);var s=Ph,r=q_(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&j_(o.ownerDocument.documentElement,o)){if(l!==null&&tm(o)){var c=l.start,f=l.end;if(f===void 0&&(f=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(f,o.value.length);else{var h=o.ownerDocument||document,u=h&&h.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),v=l.end===void 0?b:Math.min(l.end,g);!p.extend&&b>v&&(r=v,v=b,b=r);var d=Pg(o,b),x=Pg(o,v);if(d&&x&&(p.rangeCount!==1||p.anchorNode!==d.node||p.anchorOffset!==d.offset||p.focusNode!==x.node||p.focusOffset!==x.offset)){var M=h.createRange();M.setStart(d.node,d.offset),p.removeAllRanges(),b>v?(p.addRange(M),p.extend(x.node,x.offset)):(M.setEnd(x.node,x.offset),p.addRange(M))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var _=h[o];_.element.scrollLeft=_.left,_.element.scrollTop=_.top}}Xu=!!Oh,Ph=Oh=null}finally{gt=a,vt.p=i,He.T=n}}t.current=e,on=2}}function NS(){if(on===2){on=0;var t=fs,e=lo,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=He.T,He.T=null;var i=vt.p;vt.p=2;var a=gt;gt|=4;try{oS(t,e.alternate,e)}finally{gt=a,vt.p=i,He.T=n}}on=3}}function DS(){if(on===4||on===3){on=0,AM();var t=fs,e=lo,n=Ca,i=SS;e.subtreeFlags&10256||e.flags&10256?on=5:(on=0,lo=fs=null,US(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(us=null),Yp(n),e=e.stateNode,ai&&typeof ai.onCommitFiberRoot=="function")try{ai.onCommitFiberRoot(Bl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=He.T,a=vt.p,vt.p=2,He.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{He.T=e,vt.p=a}}Ca&3&&xf(),na(t),a=t.pendingLanes,n&261930&&a&42?t===Dh?gl++:(gl=0,Dh=t):gl=0,jl(0)}}function US(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,kl(e)))}function xf(){return RS(),NS(),DS(),LS()}function LS(){if(on!==5)return!1;var t=fs,e=Rh;Rh=0;var n=Yp(Ca),i=He.T,a=vt.p;try{vt.p=32>n?32:n,He.T=null,n=Nh,Nh=null;var s=fs,r=Ca;if(on=0,lo=fs=null,Ca=0,gt&6)throw Error(le(331));var o=gt;if(gt|=4,vS(s.current),pS(s,s.current,r,n),gt=o,jl(0,!1),ai&&typeof ai.onPostCommitFiberRoot=="function")try{ai.onPostCommitFiberRoot(Bl,s)}catch{}return!0}finally{vt.p=a,He.T=i,US(t,e)}}function p0(t,e,n){e=yi(n,e),e=Eh(t.stateNode,e,2),t=cs(t,e,2),t!==null&&(Hl(t,2),na(t))}function wt(t,e,n){if(t.tag===3)p0(t,t,n);else for(;e!==null;){if(e.tag===3){p0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(us===null||!us.has(i))){t=yi(n,t),n=Yx(2),i=cs(e,n,2),i!==null&&(Zx(n,i,e,t),Hl(i,2),na(i));break}}e=e.return}}function nd(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Jb;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(Rm=!0,a.add(n),t=iE.bind(null,t,e,n),e.then(t,t))}function iE(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Pt===t&&(ot&n)===n&&(Yt===4||Yt===3&&(ot&62914560)===ot&&300>ii()-gf?!(gt&2)&&co(t,0):Nm|=n,oo===ot&&(oo=0)),na(t)}function OS(t,e){e===0&&(e=T_()),t=nr(t,e),t!==null&&(Hl(t,e),na(t))}function aE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),OS(t,n)}function sE(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(le(314))}i!==null&&i.delete(e),OS(t,n)}function rE(t,e){return jp(t,e)}var Iu=null,Nr=null,Uh=!1,Bu=!1,id=!1,is=0;function na(t){t!==Nr&&t.next===null&&(Nr===null?Iu=Nr=t:Nr=Nr.next=t),Bu=!0,Uh||(Uh=!0,lE())}function jl(t,e){if(!id&&Bu){id=!0;do for(var n=!1,i=Iu;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-si(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,m0(i,s))}else s=ot,s=sf(i,i===Pt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Fl(i,s)||(n=!0,m0(i,s));i=i.next}while(n);id=!1}}function oE(){PS()}function PS(){Bu=Uh=!1;var t=0;is!==0&&_E()&&(t=is);for(var e=ii(),n=null,i=Iu;i!==null;){var a=i.next,s=zS(i,e);s===0?(i.next=null,n===null?Iu=a:n.next=a,a===null&&(Nr=n)):(n=i,(t!==0||s&3)&&(Bu=!0)),i=a}on!==0&&on!==5||jl(t),is!==0&&(is=0)}function zS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-si(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=OM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=Pt,n=ot,n=sf(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(At===2||At===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&Df(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Fl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&Df(i),Yp(n)){case 2:case 8:n=b_;break;case 32:n=Su;break;case 268435456:n=E_;break;default:n=Su}return i=IS.bind(null,t),n=jp(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&Df(i),t.callbackPriority=2,t.callbackNode=null,2}function IS(t,e){if(on!==0&&on!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(xf()&&t.callbackNode!==n)return null;var i=ot;return i=sf(t,t===Pt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(MS(t,i,e),zS(t,ii()),t.callbackNode!=null&&t.callbackNode===n?IS.bind(null,t):null)}function m0(t,e){if(xf())return null;MS(t,e,!0)}function lE(){SE(function(){gt&6?jp(M_,oE):PS()})}function Um(){if(is===0){var t=ao;t===0&&(t=ec,ec<<=1,!(ec&261888)&&(ec=256)),is=t}return is}function g0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:qc(""+t)}function v0(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function cE(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=g0((a[Zn]||null).action),r=i.submitter;r&&(e=(e=r[Zn]||null)?g0(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new rf("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(is!==0){var l=r?v0(a,r):new FormData(a);Mh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?v0(a,r):new FormData(a),Mh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var ad=0;ad<uh.length;ad++){var sd=uh[ad],uE=sd.toLowerCase(),fE=sd[0].toUpperCase()+sd.slice(1);Bi(uE,"on"+fE)}Bi(Z_,"onAnimationEnd");Bi(K_,"onAnimationIteration");Bi(Q_,"onAnimationStart");Bi("dblclick","onDoubleClick");Bi("focusin","onFocus");Bi("focusout","onBlur");Bi(wb,"onTransitionRun");Bi(Cb,"onTransitionStart");Bi(Rb,"onTransitionCancel");Bi(J_,"onTransitionEnd");no("onMouseEnter",["mouseout","mouseover"]);no("onMouseLeave",["mouseout","mouseover"]);no("onPointerEnter",["pointerout","pointerover"]);no("onPointerLeave",["pointerout","pointerover"]);$s("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));$s("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));$s("onBeforeInput",["compositionend","keypress","textInput","paste"]);$s("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));$s("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));$s("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),dE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cl));function BS(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(f){Mu(f)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(f){Mu(f)}a.currentTarget=null,s=l}}}}function at(t,e){var n=e[nh];n===void 0&&(n=e[nh]=new Set);var i=t+"__bubble";n.has(i)||(FS(e,t,2,!1),n.add(i))}function rd(t,e,n){var i=0;e&&(i|=4),FS(n,t,i,e)}var uc="_reactListening"+Math.random().toString(36).slice(2);function Lm(t){if(!t[uc]){t[uc]=!0,N_.forEach(function(n){n!=="selectionchange"&&(dE.has(n)||rd(n,!1,t),rd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[uc]||(e[uc]=!0,rd("selectionchange",!1,e))}}function FS(t,e,n,i){switch(JS(e)){case 2:var a=HE;break;case 8:a=GE;break;default:a=Im}n=a.bind(null,e,n,t),a=void 0,!oh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function od(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Lr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}B_(function(){var c=s,f=Qp(n),h=[];e:{var u=$_.get(t);if(u!==void 0){var p=rf,g=t;switch(t){case"keypress":if(Zc(n)===0)break e;case"keydown":case"keyup":p=sb;break;case"focusin":g="focus",p=zf;break;case"focusout":g="blur",p=zf;break;case"beforeblur":case"afterblur":p=zf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Tg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=qM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=lb;break;case Z_:case K_:case Q_:p=KM;break;case J_:p=ub;break;case"scroll":case"scrollend":p=WM;break;case"wheel":p=db;break;case"copy":case"cut":case"paste":p=JM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=wg;break;case"toggle":case"beforetoggle":p=pb}var b=(e&4)!==0,v=!b&&(t==="scroll"||t==="scrollend"),d=b?u!==null?u+"Capture":null:u;b=[];for(var x=c,M;x!==null;){var _=x;if(M=_.stateNode,_=_.tag,_!==5&&_!==26&&_!==27||M===null||d===null||(_=Sl(x,d),_!=null&&b.push(Rl(x,_,M))),v)break;x=x.return}0<b.length&&(u=new p(u,g,null,n,f),h.push({event:u,listeners:b}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==rh&&(g=n.relatedTarget||n.fromElement)&&(Lr(g)||g[xo]))break e;if((p||u)&&(u=f.window===f?f:(u=f.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Lr(g):null,g!==null&&(v=Il(g),b=g.tag,g!==v||b!==5&&b!==27&&b!==6)&&(g=null)):(p=null,g=c),p!==g)){if(b=Tg,_="onMouseLeave",d="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(b=wg,_="onPointerLeave",d="onPointerEnter",x="pointer"),v=p==null?u:Jo(p),M=g==null?u:Jo(g),u=new b(_,x+"leave",p,n,f),u.target=v,u.relatedTarget=M,_=null,Lr(f)===c&&(b=new b(d,x+"enter",g,n,f),b.target=M,b.relatedTarget=v,_=b),v=_,p&&g)t:{for(b=hE,d=p,x=g,M=0,_=d;_;_=b(_))M++;_=0;for(var A=x;A;A=b(A))_++;for(;0<M-_;)d=b(d),M--;for(;0<_-M;)x=b(x),_--;for(;M--;){if(d===x||x!==null&&d===x.alternate){b=d;break t}d=b(d),x=b(x)}b=null}else b=null;p!==null&&_0(h,u,p,b,!1),g!==null&&v!==null&&_0(h,v,g,b,!0)}}e:{if(u=c?Jo(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var R=Dg;else if(Ng(u))if(X_)R=Eb;else{R=Mb;var T=yb}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Kp(c.elementType)&&(R=Dg):R=bb;if(R&&(R=R(t,c))){k_(h,R,n,f);break e}T&&T(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&sh(u,"number",u.value)}switch(T=c?Jo(c):window,t){case"focusin":(Ng(T)||T.contentEditable==="true")&&(zr=T,lh=c,ol=null);break;case"focusout":ol=lh=zr=null;break;case"mousedown":ch=!0;break;case"contextmenu":case"mouseup":case"dragend":ch=!1,zg(h,n,f);break;case"selectionchange":if(Ab)break;case"keydown":case"keyup":zg(h,n,f)}var y;if(em)e:{switch(t){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else Pr?G_(t,n)&&(C="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(C="onCompositionStart");C&&(H_&&n.locale!=="ko"&&(Pr||C!=="onCompositionStart"?C==="onCompositionEnd"&&Pr&&(y=F_()):(es=f,Jp="value"in es?es.value:es.textContent,Pr=!0)),T=Fu(c,C),0<T.length&&(C=new Ag(C,t,null,n,f),h.push({event:C,listeners:T}),y?C.data=y:(y=V_(n),y!==null&&(C.data=y)))),(y=gb?vb(t,n):_b(t,n))&&(C=Fu(c,"onBeforeInput"),0<C.length&&(T=new Ag("onBeforeInput","beforeinput",null,n,f),h.push({event:T,listeners:C}),T.data=y)),cE(h,t,c,n,f)}BS(h,e)})}function Rl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Fu(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Sl(t,n),a!=null&&i.unshift(Rl(t,a,s)),a=Sl(t,e),a!=null&&i.push(Rl(t,a,s))),t.tag===3)return i;t=t.return}return[]}function hE(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function _0(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Sl(n,s),c!=null&&r.unshift(Rl(n,c,l))):a||(c=Sl(n,s),c!=null&&r.push(Rl(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var pE=/\r\n?/g,mE=/\u0000|\uFFFD/g;function x0(t){return(typeof t=="string"?t:""+t).replace(pE,`
`).replace(mE,"")}function HS(t,e){return e=x0(e),x0(t)===e}function Ut(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||io(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&io(t,""+i);break;case"className":ic(t,"class",i);break;case"tabIndex":ic(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":ic(t,n,i);break;case"style":I_(t,i,s);break;case"data":if(e!=="object"){ic(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=qc(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Ut(t,e,"name",a.name,a,null),Ut(t,e,"formEncType",a.formEncType,a,null),Ut(t,e,"formMethod",a.formMethod,a,null),Ut(t,e,"formTarget",a.formTarget,a,null)):(Ut(t,e,"encType",a.encType,a,null),Ut(t,e,"method",a.method,a,null),Ut(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=qc(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=ba);break;case"onScroll":i!=null&&at("scroll",t);break;case"onScrollEnd":i!=null&&at("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(le(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(le(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=qc(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":at("beforetoggle",t),at("toggle",t),jc(t,"popover",i);break;case"xlinkActuate":la(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":la(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":la(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":la(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":la(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":la(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":la(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":la(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":la(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":jc(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=kM.get(n)||n,jc(t,n,i))}}function Lh(t,e,n,i,a,s){switch(n){case"style":I_(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(le(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(le(60));t.innerHTML=n}}break;case"children":typeof i=="string"?io(t,i):(typeof i=="number"||typeof i=="bigint")&&io(t,""+i);break;case"onScroll":i!=null&&at("scroll",t);break;case"onScrollEnd":i!=null&&at("scrollend",t);break;case"onClick":i!=null&&(t.onclick=ba);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!D_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[Zn]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):jc(t,n,i)}}}function En(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":at("error",t),at("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(le(137,e));default:Ut(t,e,s,r,n,null)}}a&&Ut(t,e,"srcSet",n.srcSet,n,null),i&&Ut(t,e,"src",n.src,n,null);return;case"input":at("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var f=n[i];if(f!=null)switch(i){case"name":a=f;break;case"type":r=f;break;case"checked":l=f;break;case"defaultChecked":c=f;break;case"value":s=f;break;case"defaultValue":o=f;break;case"children":case"dangerouslySetInnerHTML":if(f!=null)throw Error(le(137,e));break;default:Ut(t,e,i,f,n,null)}}O_(t,s,o,l,c,r,a,!1);return;case"select":at("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Ut(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?qr(t,!!i,e,!1):n!=null&&qr(t,!!i,n,!0);return;case"textarea":at("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(le(91));break;default:Ut(t,e,r,o,n,null)}z_(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ut(t,e,l,i,n,null)}return;case"dialog":at("beforetoggle",t),at("toggle",t),at("cancel",t),at("close",t);break;case"iframe":case"object":at("load",t);break;case"video":case"audio":for(i=0;i<Cl.length;i++)at(Cl[i],t);break;case"image":at("error",t),at("load",t);break;case"details":at("toggle",t);break;case"embed":case"source":case"link":at("error",t),at("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(le(137,e));default:Ut(t,e,c,i,n,null)}return;default:if(Kp(e)){for(f in n)n.hasOwnProperty(f)&&(i=n[f],i!==void 0&&Lh(t,e,f,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Ut(t,e,o,i,n,null))}function gE(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,f=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||Ut(t,e,p,null,i,h)}}for(var u in i){var p=i[u];if(h=n[u],i.hasOwnProperty(u)&&(p!=null||h!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":f=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(le(137,e));break;default:p!==h&&Ut(t,e,u,p,i,h)}}ah(t,r,o,l,c,f,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||Ut(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Ut(t,e,a,s,i,l)}e=o,n=r,i=p,u!=null?qr(t,!!n,u,!1):!!i!=!!n&&(e!=null?qr(t,!!n,e,!0):qr(t,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Ut(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(le(91));break;default:a!==s&&Ut(t,e,r,a,i,s)}P_(t,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:Ut(t,e,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Ut(t,e,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&Ut(t,e,b,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(le(137,e));break;default:Ut(t,e,c,u,i,p)}return;default:if(Kp(e)){for(var v in n)u=n[v],n.hasOwnProperty(v)&&u!==void 0&&!i.hasOwnProperty(v)&&Lh(t,e,v,void 0,i,u);for(f in i)u=i[f],p=n[f],!i.hasOwnProperty(f)||u===p||u===void 0&&p===void 0||Lh(t,e,f,u,i,p);return}}for(var d in n)u=n[d],n.hasOwnProperty(d)&&u!=null&&!i.hasOwnProperty(d)&&Ut(t,e,d,null,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u==null&&p==null||Ut(t,e,h,u,i,p)}function S0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function vE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&S0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var f=l.transferSize,h=l.initiatorType;f&&S0(h)&&(l=l.responseEnd,r+=f*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Oh=null,Ph=null;function Hu(t){return t.nodeType===9?t:t.ownerDocument}function y0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function GS(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function zh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var ld=null;function _E(){var t=window.event;return t&&t.type==="popstate"?t===ld?!1:(ld=t,!0):(ld=null,!1)}var VS=typeof setTimeout=="function"?setTimeout:void 0,xE=typeof clearTimeout=="function"?clearTimeout:void 0,M0=typeof Promise=="function"?Promise:void 0,SE=typeof queueMicrotask=="function"?queueMicrotask:typeof M0<"u"?function(t){return M0.resolve(null).then(t).catch(yE)}:VS;function yE(t){setTimeout(function(){throw t})}function ys(t){return t==="head"}function b0(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),fo(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")vl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,vl(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[Gl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&vl(t.ownerDocument.body);n=a}while(n);fo(e)}function E0(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Ih(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Ih(n),Zp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function ME(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[Gl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ai(t.nextSibling),t===null)break}return null}function bE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ai(t.nextSibling),t===null))return null;return t}function kS(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ai(t.nextSibling),t===null))return null;return t}function Bh(t){return t.data==="$?"||t.data==="$~"}function Fh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function EE(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Ai(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Hh=null;function T0(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ai(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function A0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function XS(t,e,n){switch(e=Hu(n),t){case"html":if(t=e.documentElement,!t)throw Error(le(452));return t;case"head":if(t=e.head,!t)throw Error(le(453));return t;case"body":if(t=e.body,!t)throw Error(le(454));return t;default:throw Error(le(451))}}function vl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Zp(t)}var Ci=new Map,w0=new Set;function Gu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Ba=vt.d;vt.d={f:TE,r:AE,D:wE,C:CE,L:RE,m:NE,X:UE,S:DE,M:LE};function TE(){var t=Ba.f(),e=vf();return t||e}function AE(t){var e=So(t);e!==null&&e.tag===5&&e.type==="form"?Ix(e):Ba.r(t)}var Eo=typeof document>"u"?null:document;function WS(t,e,n){var i=Eo;if(i&&typeof e=="string"&&e){var a=Si(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),w0.has(a)||(w0.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),En(e,"link",t),mn(e),i.head.appendChild(e)))}}function wE(t){Ba.D(t),WS("dns-prefetch",t,null)}function CE(t,e){Ba.C(t,e),WS("preconnect",t,e)}function RE(t,e,n){Ba.L(t,e,n);var i=Eo;if(i&&t&&e){var a='link[rel="preload"][as="'+Si(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Si(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Si(n.imageSizes)+'"]')):a+='[href="'+Si(t)+'"]';var s=a;switch(e){case"style":s=uo(t);break;case"script":s=To(t)}Ci.has(s)||(t=Xt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ci.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(ql(s))||e==="script"&&i.querySelector(Yl(s))||(e=i.createElement("link"),En(e,"link",t),mn(e),i.head.appendChild(e)))}}function NE(t,e){Ba.m(t,e);var n=Eo;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Si(i)+'"][href="'+Si(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=To(t)}if(!Ci.has(s)&&(t=Xt({rel:"modulepreload",href:t},e),Ci.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Yl(s)))return}i=n.createElement("link"),En(i,"link",t),mn(i),n.head.appendChild(i)}}}function DE(t,e,n){Ba.S(t,e,n);var i=Eo;if(i&&t){var a=jr(i).hoistableStyles,s=uo(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(ql(s)))o.loading=5;else{t=Xt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ci.get(s))&&Om(t,n);var l=r=i.createElement("link");mn(l),En(l,"link",t),l._p=new Promise(function(c,f){l.onload=c,l.onerror=f}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,iu(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function UE(t,e){Ba.X(t,e);var n=Eo;if(n&&t){var i=jr(n).hoistableScripts,a=To(t),s=i.get(a);s||(s=n.querySelector(Yl(a)),s||(t=Xt({src:t,async:!0},e),(e=Ci.get(a))&&Pm(t,e),s=n.createElement("script"),mn(s),En(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function LE(t,e){Ba.M(t,e);var n=Eo;if(n&&t){var i=jr(n).hoistableScripts,a=To(t),s=i.get(a);s||(s=n.querySelector(Yl(a)),s||(t=Xt({src:t,async:!0,type:"module"},e),(e=Ci.get(a))&&Pm(t,e),s=n.createElement("script"),mn(s),En(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function C0(t,e,n,i){var a=(a=rs.current)?Gu(a):null;if(!a)throw Error(le(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=uo(n.href),n=jr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=uo(n.href);var s=jr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(ql(t)))&&!s._p&&(r.instance=s,r.state.loading=5),Ci.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ci.set(t,n),s||OE(a,t,n,r.state))),e&&i===null)throw Error(le(528,""));return r}if(e&&i!==null)throw Error(le(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=To(n),n=jr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(le(444,t))}}function uo(t){return'href="'+Si(t)+'"'}function ql(t){return'link[rel="stylesheet"]['+t+"]"}function jS(t){return Xt({},t,{"data-precedence":t.precedence,precedence:null})}function OE(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),En(e,"link",n),mn(e),t.head.appendChild(e))}function To(t){return'[src="'+Si(t)+'"]'}function Yl(t){return"script[async]"+t}function R0(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Si(n.href)+'"]');if(i)return e.instance=i,mn(i),i;var a=Xt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),mn(i),En(i,"style",a),iu(i,n.precedence,t),e.instance=i;case"stylesheet":a=uo(n.href);var s=t.querySelector(ql(a));if(s)return e.state.loading|=4,e.instance=s,mn(s),s;i=jS(n),(a=Ci.get(a))&&Om(i,a),s=(t.ownerDocument||t).createElement("link"),mn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),En(s,"link",i),e.state.loading|=4,iu(s,n.precedence,t),e.instance=s;case"script":return s=To(n.src),(a=t.querySelector(Yl(s)))?(e.instance=a,mn(a),a):(i=n,(a=Ci.get(s))&&(i=Xt({},n),Pm(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),mn(a),En(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(le(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,iu(i,n.precedence,t));return e.instance}function iu(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Om(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Pm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var au=null;function N0(t,e,n){if(au===null){var i=new Map,a=au=new Map;a.set(n,i)}else a=au,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[Gl]||s[xn]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function D0(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function PE(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function qS(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function zE(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=uo(i.href),s=e.querySelector(ql(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=Vu.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,mn(s);return}s=e.ownerDocument||e,i=jS(i),(a=Ci.get(a))&&Om(i,a),s=s.createElement("link"),mn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),En(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=Vu.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var cd=0;function IE(t,e){return t.stylesheets&&t.count===0&&su(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&su(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&cd===0&&(cd=62500*vE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&su(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>cd?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function Vu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)su(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var ku=null;function su(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,ku=new Map,e.forEach(BE,t),ku=null,Vu.call(t))}function BE(t,e){if(!(e.state.loading&4)){var n=ku.get(t);if(n)var i=n.get(null);else{n=new Map,ku.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=Vu.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Nl={$$typeof:Ma,Provider:null,Consumer:null,_currentValue:Bs,_currentValue2:Bs,_threadCount:0};function FE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Uf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Uf(0),this.hiddenUpdates=Uf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function YS(t,e,n,i,a,s,r,o,l,c,f,h){return t=new FE(t,e,n,r,l,c,f,h,o),e=1,s===!0&&(e|=24),s=ti(3,null,null,e),t.current=s,s.stateNode=t,e=om(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},um(s),t}function ZS(t){return t?(t=Fr,t):Fr}function KS(t,e,n,i,a,s){a=ZS(a),i.context===null?i.context=a:i.pendingContext=a,i=ls(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=cs(t,i,e),n!==null&&(qn(n,t,e),cl(n,t,e))}function U0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function zm(t,e){U0(t,e),(t=t.alternate)&&U0(t,e)}function QS(t){if(t.tag===13||t.tag===31){var e=nr(t,67108864);e!==null&&qn(e,t,67108864),zm(t,67108864)}}function L0(t){if(t.tag===13||t.tag===31){var e=ri();e=qp(e);var n=nr(t,e);n!==null&&qn(n,t,e),zm(t,e)}}var Xu=!0;function HE(t,e,n,i){var a=He.T;He.T=null;var s=vt.p;try{vt.p=2,Im(t,e,n,i)}finally{vt.p=s,He.T=a}}function GE(t,e,n,i){var a=He.T;He.T=null;var s=vt.p;try{vt.p=8,Im(t,e,n,i)}finally{vt.p=s,He.T=a}}function Im(t,e,n,i){if(Xu){var a=Gh(i);if(a===null)od(t,e,i,Wu,n),O0(t,i);else if(kE(a,t,e,n,i))i.stopPropagation();else if(O0(t,i),e&4&&-1<VE.indexOf(t)){for(;a!==null;){var s=So(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Ns(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-si(r);o.entanglements[1]|=l,r&=~l}na(s),!(gt&6)&&(Ou=ii()+500,jl(0))}}break;case 31:case 13:o=nr(s,2),o!==null&&qn(o,s,2),vf(),zm(s,2)}if(s=Gh(i),s===null&&od(t,e,i,Wu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else od(t,e,i,null,n)}}function Gh(t){return t=Qp(t),Bm(t)}var Wu=null;function Bm(t){if(Wu=null,t=Lr(t),t!==null){var e=Il(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=v_(e),t!==null)return t;t=null}else if(n===31){if(t=__(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Wu=t,null}function JS(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(wM()){case M_:return 2;case b_:return 8;case Su:case CM:return 32;case E_:return 268435456;default:return 32}default:return 32}}var Vh=!1,ds=null,hs=null,ps=null,Dl=new Map,Ul=new Map,Qa=[],VE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function O0(t,e){switch(t){case"focusin":case"focusout":ds=null;break;case"dragenter":case"dragleave":hs=null;break;case"mouseover":case"mouseout":ps=null;break;case"pointerover":case"pointerout":Dl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ul.delete(e.pointerId)}}function Fo(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=So(e),e!==null&&QS(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function kE(t,e,n,i,a){switch(e){case"focusin":return ds=Fo(ds,t,e,n,i,a),!0;case"dragenter":return hs=Fo(hs,t,e,n,i,a),!0;case"mouseover":return ps=Fo(ps,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return Dl.set(s,Fo(Dl.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ul.set(s,Fo(Ul.get(s)||null,t,e,n,i,a)),!0}return!1}function $S(t){var e=Lr(t.target);if(e!==null){var n=Il(e);if(n!==null){if(e=n.tag,e===13){if(e=v_(n),e!==null){t.blockedOn=e,_g(t.priority,function(){L0(n)});return}}else if(e===31){if(e=__(n),e!==null){t.blockedOn=e,_g(t.priority,function(){L0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ru(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Gh(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);rh=i,n.target.dispatchEvent(i),rh=null}else return e=So(n),e!==null&&QS(e),t.blockedOn=n,!1;e.shift()}return!0}function P0(t,e,n){ru(t)&&n.delete(e)}function XE(){Vh=!1,ds!==null&&ru(ds)&&(ds=null),hs!==null&&ru(hs)&&(hs=null),ps!==null&&ru(ps)&&(ps=null),Dl.forEach(P0),Ul.forEach(P0)}function fc(t,e){t.blockedOn===e&&(t.blockedOn=null,Vh||(Vh=!0,ln.unstable_scheduleCallback(ln.unstable_NormalPriority,XE)))}var dc=null;function z0(t){dc!==t&&(dc=t,ln.unstable_scheduleCallback(ln.unstable_NormalPriority,function(){dc===t&&(dc=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(Bm(i||n)===null)continue;break}var s=So(n);s!==null&&(t.splice(e,3),e-=3,Mh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function fo(t){function e(l){return fc(l,t)}ds!==null&&fc(ds,t),hs!==null&&fc(hs,t),ps!==null&&fc(ps,t),Dl.forEach(e),Ul.forEach(e);for(var n=0;n<Qa.length;n++){var i=Qa[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<Qa.length&&(n=Qa[0],n.blockedOn===null);)$S(n),n.blockedOn===null&&Qa.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[Zn]||null;if(typeof s=="function")r||z0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[Zn]||null)o=r.formAction;else if(Bm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),z0(n)}}}function ey(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Fm(t){this._internalRoot=t}Sf.prototype.render=Fm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(le(409));var n=e.current,i=ri();KS(n,i,t,e,null,null)};Sf.prototype.unmount=Fm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;KS(t.current,2,null,t,null,null),vf(),e[xo]=null}};function Sf(t){this._internalRoot=t}Sf.prototype.unstable_scheduleHydration=function(t){if(t){var e=R_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Qa.length&&e!==0&&e<Qa[n].priority;n++);Qa.splice(n,0,t),n===0&&$S(t)}};var I0=m_.version;if(I0!=="19.2.8")throw Error(le(527,I0,"19.2.8"));vt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(le(188)):(t=Object.keys(t).join(","),Error(le(268,t)));return t=SM(e),t=t!==null?x_(t):null,t=t===null?null:t.stateNode,t};var WE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:He,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var hc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!hc.isDisabled&&hc.supportsFiber)try{Bl=hc.inject(WE),ai=hc}catch{}}nf.createRoot=function(t,e){if(!g_(t))throw Error(le(299));var n=!1,i="",a=Wx,s=jx,r=qx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=YS(t,1,!1,null,null,n,i,null,a,s,r,ey),t[xo]=e.current,Lm(t),new Fm(e)};nf.hydrateRoot=function(t,e,n){if(!g_(t))throw Error(le(299));var i=!1,a="",s=Wx,r=jx,o=qx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=YS(t,1,!0,e,n??null,i,a,l,s,r,o,ey),e.context=ZS(null),n=e.current,i=ri(),i=qp(i),a=ls(i),a.callback=null,cs(n,a,i),n=i,e.current.lanes=n,Hl(e,n),na(e),t[xo]=e.current,Lm(t),new Sf(e)};nf.version="19.2.8";function ty(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ty)}catch(t){console.error(t)}}ty(),c_.exports=nf;var jE=c_.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Hm="185",qE=0,B0=1,YE=2,ou=1,ZE=2,tl=3,xs=0,Yn=1,ya=2,Ra=0,ks=1,kr=2,F0=3,H0=4,KE=5,Os=100,QE=101,JE=102,$E=103,eT=104,tT=200,nT=201,iT=202,aT=203,kh=204,Xh=205,sT=206,rT=207,oT=208,lT=209,cT=210,uT=211,fT=212,dT=213,hT=214,Wh=0,jh=1,qh=2,ho=3,Yh=4,Zh=5,Kh=6,Qh=7,ny=0,pT=1,mT=2,Ji=0,iy=1,ay=2,sy=3,ry=4,oy=5,ly=6,cy=7,uy=300,Zs=301,po=302,ud=303,fd=304,yf=306,Jh=1e3,Ta=1001,$h=1002,Mn=1003,gT=1004,pc=1005,wn=1006,dd=1007,zs=1008,bi=1009,fy=1010,dy=1011,Ll=1012,Gm=1013,ea=1014,zi=1015,za=1016,Vm=1017,km=1018,Ol=1020,hy=35902,py=35899,my=1021,gy=1022,Ii=1023,Ia=1026,Is=1027,Xm=1028,Wm=1029,Ks=1030,jm=1031,qm=1033,lu=33776,cu=33777,uu=33778,fu=33779,ep=35840,tp=35841,np=35842,ip=35843,ap=36196,sp=37492,rp=37496,op=37488,lp=37489,ju=37490,cp=37491,up=37808,fp=37809,dp=37810,hp=37811,pp=37812,mp=37813,gp=37814,vp=37815,_p=37816,xp=37817,Sp=37818,yp=37819,Mp=37820,bp=37821,Ep=36492,Tp=36494,Ap=36495,wp=36283,Cp=36284,qu=36285,Rp=36286,vT=3200,G0=0,_T=1,Ja="",mi="srgb",Yu="srgb-linear",Zu="linear",Tt="srgb",fr=7680,V0=519,xT=512,ST=513,yT=514,Ym=515,MT=516,bT=517,Zm=518,ET=519,k0=35044,X0="300 es",Ki=2e3,Ku=2001;function TT(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function Qu(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function AT(){const t=Qu("canvas");return t.style.display="block",t}const W0={};function j0(...t){const e="THREE."+t.shift();console.log(e,...t)}function vy(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Fe(...t){t=vy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function ht(...t){t=vy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function $r(...t){const e=t.join(" ");e in W0||(W0[e]=!0,Fe(...t))}function wT(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const CT={[Wh]:jh,[qh]:Kh,[Yh]:Qh,[ho]:Zh,[jh]:Wh,[Kh]:qh,[Qh]:Yh,[Zh]:ho};class ar{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],du=Math.PI/180,Np=180/Math.PI;function Zl(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tn[t&255]+Tn[t>>8&255]+Tn[t>>16&255]+Tn[t>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[n&63|128]+Tn[n>>8&255]+"-"+Tn[n>>16&255]+Tn[n>>24&255]+Tn[i&255]+Tn[i>>8&255]+Tn[i>>16&255]+Tn[i>>24&255]).toLowerCase()}function ut(t,e,n){return Math.max(e,Math.min(n,t))}function RT(t,e){return(t%e+e)%e}function hd(t,e,n){return(1-n)*t+n*e}function Ho(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const tg=class tg{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=ut(this.x,e.x,n.x),this.y=ut(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=ut(this.x,e,n),this.y=ut(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};tg.prototype.isVector2=!0;let _t=tg;class Ao{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],f=i[a+2],h=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],b=s[r+3];if(h!==b||l!==u||c!==p||f!==g){let v=l*u+c*p+f*g+h*b;v<0&&(u=-u,p=-p,g=-g,b=-b,v=-v);let d=1-o;if(v<.9995){const x=Math.acos(v),M=Math.sin(x);d=Math.sin(d*x)/M,o=Math.sin(o*x)/M,l=l*d+u*o,c=c*d+p*o,f=f*d+g*o,h=h*d+b*o}else{l=l*d+u*o,c=c*d+p*o,f=f*d+g*o,h=h*d+b*o;const x=1/Math.sqrt(l*l+c*c+f*f+h*h);l*=x,c*=x,f*=x,h*=x}}e[n]=l,e[n+1]=c,e[n+2]=f,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],f=i[a+3],h=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return e[n]=o*g+f*h+l*p-c*u,e[n+1]=l*g+f*u+c*h-o*p,e[n+2]=c*g+f*p+o*u-l*h,e[n+3]=f*g-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),f=o(a/2),h=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*f*h+c*p*g,this._y=c*p*h-u*f*g,this._z=c*f*g+u*p*h,this._w=c*f*h-u*p*g;break;case"YXZ":this._x=u*f*h+c*p*g,this._y=c*p*h-u*f*g,this._z=c*f*g-u*p*h,this._w=c*f*h+u*p*g;break;case"ZXY":this._x=u*f*h-c*p*g,this._y=c*p*h+u*f*g,this._z=c*f*g+u*p*h,this._w=c*f*h-u*p*g;break;case"ZYX":this._x=u*f*h-c*p*g,this._y=c*p*h+u*f*g,this._z=c*f*g-u*p*h,this._w=c*f*h+u*p*g;break;case"YZX":this._x=u*f*h+c*p*g,this._y=c*p*h+u*f*g,this._z=c*f*g-u*p*h,this._w=c*f*h-u*p*g;break;case"XZY":this._x=u*f*h-c*p*g,this._y=c*p*h-u*f*g,this._z=c*f*g+u*p*h,this._w=c*f*h+u*p*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],f=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(f-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(f-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+f)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+f)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,f=n._w;return this._x=i*f+r*o+a*c-s*l,this._y=a*f+r*l+s*o-i*c,this._z=s*f+r*c+i*l-a*o,this._w=r*f-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),f=Math.sin(c);l=Math.sin(l*c)/f,n=Math.sin(n*c)/f,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ng=class ng{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(q0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(q0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),f=2*(o*n-s*a),h=2*(s*i-r*n);return this.x=n+l*c+r*h-o*f,this.y=i+l*f+o*c-s*h,this.z=a+l*h+s*f-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=ut(this.x,e.x,n.x),this.y=ut(this.y,e.y,n.y),this.z=ut(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=ut(this.x,e,n),this.y=ut(this.y,e,n),this.z=ut(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return pd.copy(this).projectOnVector(e),this.sub(pd)}reflect(e){return this.sub(pd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ng.prototype.isVector3=!0;let q=ng;const pd=new q,q0=new Ao,ig=class ig{constructor(e,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const f=this.elements;return f[0]=e,f[1]=a,f[2]=o,f[3]=n,f[4]=s,f[5]=l,f[6]=i,f[7]=r,f[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],f=i[4],h=i[7],u=i[2],p=i[5],g=i[8],b=a[0],v=a[3],d=a[6],x=a[1],M=a[4],_=a[7],A=a[2],R=a[5],T=a[8];return s[0]=r*b+o*x+l*A,s[3]=r*v+o*M+l*R,s[6]=r*d+o*_+l*T,s[1]=c*b+f*x+h*A,s[4]=c*v+f*M+h*R,s[7]=c*d+f*_+h*T,s[2]=u*b+p*x+g*A,s[5]=u*v+p*M+g*R,s[8]=u*d+p*_+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],f=e[8];return n*r*f-n*o*c-i*s*f+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=f*r-o*c,u=o*l-f*s,p=c*s-r*l,g=n*h+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=h*b,e[1]=(a*c-f*i)*b,e[2]=(o*i-a*r)*b,e[3]=u*b,e[4]=(f*n-a*l)*b,e[5]=(a*s-o*n)*b,e[6]=p*b,e[7]=(i*l-c*n)*b,e[8]=(r*n-i*s)*b,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return $r("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(md.makeScale(e,n)),this}rotate(e){return $r("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(md.makeRotation(-e)),this}translate(e,n){return $r("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(md.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};ig.prototype.isMatrix3=!0;let je=ig;const md=new je,Y0=new je().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Z0=new je().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function NT(){const t={enabled:!0,workingColorSpace:Yu,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Tt&&(a.r=Na(a.r),a.g=Na(a.g),a.b=Na(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Tt&&(a.r=eo(a.r),a.g=eo(a.g),a.b=eo(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===Ja?Zu:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return $r("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return $r("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Yu]:{primaries:e,whitePoint:i,transfer:Zu,toXYZ:Y0,fromXYZ:Z0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:e,whitePoint:i,transfer:Tt,toXYZ:Y0,fromXYZ:Z0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),t}const ct=NT();function Na(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function eo(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let dr;class DT{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{dr===void 0&&(dr=Qu("canvas")),dr.width=e.width,dr.height=e.height;const a=dr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=dr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=Qu("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Na(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Na(n[i]/255)*255):n[i]=Na(n[i]);return{data:n,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let UT=0;class Km{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:UT++}),this.uuid=Zl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(gd(a[r].image)):s.push(gd(a[r]))}else s=gd(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function gd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?DT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let LT=0;const vd=new q;class In extends ar{constructor(e=In.DEFAULT_IMAGE,n=In.DEFAULT_MAPPING,i=Ta,a=Ta,s=wn,r=zs,o=Ii,l=bi,c=In.DEFAULT_ANISOTROPY,f=Ja){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:LT++}),this.uuid=Zl(),this.name="",this.source=new Km(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new je,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=f,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(vd).x}get height(){return this.source.getSize(vd).y}get depth(){return this.source.getSize(vd).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Fe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Fe(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==uy)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jh:e.x=e.x-Math.floor(e.x);break;case Ta:e.x=e.x<0?0:1;break;case $h:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jh:e.y=e.y-Math.floor(e.y);break;case Ta:e.y=e.y<0?0:1;break;case $h:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=uy;In.DEFAULT_ANISOTROPY=1;const ag=class ag{constructor(e=0,n=0,i=0,a=1){this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],f=l[4],h=l[8],u=l[1],p=l[5],g=l[9],b=l[2],v=l[6],d=l[10];if(Math.abs(f-u)<.01&&Math.abs(h-b)<.01&&Math.abs(g-v)<.01){if(Math.abs(f+u)<.1&&Math.abs(h+b)<.1&&Math.abs(g+v)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,_=(p+1)/2,A=(d+1)/2,R=(f+u)/4,T=(h+b)/4,y=(g+v)/4;return M>_&&M>A?M<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(M),a=R/i,s=T/i):_>A?_<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(_),i=R/a,s=y/a):A<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(A),i=T/s,a=y/s),this.set(i,a,s,n),this}let x=Math.sqrt((v-g)*(v-g)+(h-b)*(h-b)+(u-f)*(u-f));return Math.abs(x)<.001&&(x=1),this.x=(v-g)/x,this.y=(h-b)/x,this.z=(u-f)/x,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=ut(this.x,e.x,n.x),this.y=ut(this.y,e.y,n.y),this.z=ut(this.z,e.z,n.z),this.w=ut(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=ut(this.x,e,n),this.y=ut(this.y,e,n),this.z=ut(this.z,e,n),this.w=ut(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};ag.prototype.isVector4=!0;let Zt=ag;class OT extends ar{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Zt(0,0,e,n),this.scissorTest=!1,this.viewport=new Zt(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new In(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new Km(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class $i extends OT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class _y extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class PT extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Ta,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ef=class ef{constructor(e,n,i,a,s,r,o,l,c,f,h,u,p,g,b,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,f,h,u,p,g,b,v)}set(e,n,i,a,s,r,o,l,c,f,h,u,p,g,b,v){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=a,d[1]=s,d[5]=r,d[9]=o,d[13]=l,d[2]=c,d[6]=f,d[10]=h,d[14]=u,d[3]=p,d[7]=g,d[11]=b,d[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ef().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,a=1/hr.setFromMatrixColumn(e,0).length(),s=1/hr.setFromMatrixColumn(e,1).length(),r=1/hr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),f=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=r*f,p=r*h,g=o*f,b=o*h;n[0]=l*f,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+p*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*f,p=l*h,g=c*f,b=c*h;n[0]=u+b*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*h,n[5]=r*f,n[9]=-o,n[2]=p*o-g,n[6]=b+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*f,p=l*h,g=c*f,b=c*h;n[0]=u-b*o,n[4]=-r*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*f,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*f,p=r*h,g=o*f,b=o*h;n[0]=l*f,n[4]=g*c-p,n[8]=u*c+b,n[1]=l*h,n[5]=b*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*f,n[4]=b-u*h,n[8]=g*h+p,n[1]=h,n[5]=r*f,n[9]=-o*f,n[2]=-c*f,n[6]=p*h+g,n[10]=u-b*h}else if(e.order==="XZY"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*f,n[4]=-h,n[8]=c*f,n[1]=u*h+b,n[5]=r*f,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*f,n[10]=b*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zT,e,IT)}lookAt(e,n,i){const a=this.elements;return Qn.subVectors(e,n),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Ha.crossVectors(i,Qn),Ha.lengthSq()===0&&(Math.abs(i.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Ha.crossVectors(i,Qn)),Ha.normalize(),mc.crossVectors(Qn,Ha),a[0]=Ha.x,a[4]=mc.x,a[8]=Qn.x,a[1]=Ha.y,a[5]=mc.y,a[9]=Qn.y,a[2]=Ha.z,a[6]=mc.z,a[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],f=i[1],h=i[5],u=i[9],p=i[13],g=i[2],b=i[6],v=i[10],d=i[14],x=i[3],M=i[7],_=i[11],A=i[15],R=a[0],T=a[4],y=a[8],C=a[12],w=a[1],D=a[5],P=a[9],G=a[13],O=a[2],z=a[6],B=a[10],I=a[14],U=a[3],X=a[7],oe=a[11],ce=a[15];return s[0]=r*R+o*w+l*O+c*U,s[4]=r*T+o*D+l*z+c*X,s[8]=r*y+o*P+l*B+c*oe,s[12]=r*C+o*G+l*I+c*ce,s[1]=f*R+h*w+u*O+p*U,s[5]=f*T+h*D+u*z+p*X,s[9]=f*y+h*P+u*B+p*oe,s[13]=f*C+h*G+u*I+p*ce,s[2]=g*R+b*w+v*O+d*U,s[6]=g*T+b*D+v*z+d*X,s[10]=g*y+b*P+v*B+d*oe,s[14]=g*C+b*G+v*I+d*ce,s[3]=x*R+M*w+_*O+A*U,s[7]=x*T+M*D+_*z+A*X,s[11]=x*y+M*P+_*B+A*oe,s[15]=x*C+M*G+_*I+A*ce,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],f=e[2],h=e[6],u=e[10],p=e[14],g=e[3],b=e[7],v=e[11],d=e[15],x=l*p-c*u,M=o*p-c*h,_=o*u-l*h,A=r*p-c*f,R=r*u-l*f,T=r*h-o*f;return n*(b*x-v*M+d*_)-i*(g*x-v*A+d*R)+a*(g*M-b*A+d*T)-s*(g*_-b*R+v*T)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],f=e[10];return n*(r*f-o*c)-i*(s*f-o*l)+a*(s*c-r*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],f=e[8],h=e[9],u=e[10],p=e[11],g=e[12],b=e[13],v=e[14],d=e[15],x=n*o-i*r,M=n*l-a*r,_=n*c-s*r,A=i*l-a*o,R=i*c-s*o,T=a*c-s*l,y=f*b-h*g,C=f*v-u*g,w=f*d-p*g,D=h*v-u*b,P=h*d-p*b,G=u*d-p*v,O=x*G-M*P+_*D+A*w-R*C+T*y;if(O===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/O;return e[0]=(o*G-l*P+c*D)*z,e[1]=(a*P-i*G-s*D)*z,e[2]=(b*T-v*R+d*A)*z,e[3]=(u*R-h*T-p*A)*z,e[4]=(l*w-r*G-c*C)*z,e[5]=(n*G-a*w+s*C)*z,e[6]=(v*_-g*T-d*M)*z,e[7]=(f*T-u*_+p*M)*z,e[8]=(r*P-o*w+c*y)*z,e[9]=(i*w-n*P-s*y)*z,e[10]=(g*R-b*_+d*x)*z,e[11]=(h*_-f*R-p*x)*z,e[12]=(o*C-r*D-l*y)*z,e[13]=(n*D-i*C+a*y)*z,e[14]=(b*M-g*A-v*x)*z,e[15]=(f*A-h*M+u*x)*z,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,f=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,f*o+i,f*l-a*r,0,c*l-a*o,f*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,f=r+r,h=o+o,u=s*c,p=s*f,g=s*h,b=r*f,v=r*h,d=o*h,x=l*c,M=l*f,_=l*h,A=i.x,R=i.y,T=i.z;return a[0]=(1-(b+d))*A,a[1]=(p+_)*A,a[2]=(g-M)*A,a[3]=0,a[4]=(p-_)*R,a[5]=(1-(u+d))*R,a[6]=(v+x)*R,a[7]=0,a[8]=(g+M)*T,a[9]=(v-x)*T,a[10]=(1-(u+b))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=hr.set(a[0],a[1],a[2]).length();const o=hr.set(a[4],a[5],a[6]).length(),l=hr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Ui.copy(this);const c=1/r,f=1/o,h=1/l;return Ui.elements[0]*=c,Ui.elements[1]*=c,Ui.elements[2]*=c,Ui.elements[4]*=f,Ui.elements[5]*=f,Ui.elements[6]*=f,Ui.elements[8]*=h,Ui.elements[9]*=h,Ui.elements[10]*=h,n.setFromRotationMatrix(Ui),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=Ki,l=!1){const c=this.elements,f=2*s/(n-e),h=2*s/(i-a),u=(n+e)/(n-e),p=(i+a)/(i-a);let g,b;if(l)g=s/(r-s),b=r*s/(r-s);else if(o===Ki)g=-(r+s)/(r-s),b=-2*r*s/(r-s);else if(o===Ku)g=-r/(r-s),b=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=Ki,l=!1){const c=this.elements,f=2/(n-e),h=2/(i-a),u=-(n+e)/(n-e),p=-(i+a)/(i-a);let g,b;if(l)g=1/(r-s),b=r/(r-s);else if(o===Ki)g=-2/(r-s),b=-(r+s)/(r-s);else if(o===Ku)g=-1/(r-s),b=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=f,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};ef.prototype.isMatrix4=!0;let Bt=ef;const hr=new q,Ui=new Bt,zT=new q(0,0,0),IT=new q(1,1,1),Ha=new q,mc=new q,Qn=new q,K0=new Bt,Q0=new Ao;class Qs{constructor(e=0,n=0,i=0,a=Qs.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],f=a[9],h=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-f,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-f,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ut(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-f,p),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return K0.makeRotationFromQuaternion(e),this.setFromRotationMatrix(K0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Q0.setFromEuler(this),this.setFromQuaternion(Q0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Qs.DEFAULT_ORDER="XYZ";class xy{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let BT=0;const J0=new q,pr=new Ao,da=new Bt,gc=new q,Go=new q,FT=new q,HT=new Ao,$0=new q(1,0,0),ev=new q(0,1,0),tv=new q(0,0,1),nv={type:"added"},GT={type:"removed"},mr={type:"childadded",child:null},_d={type:"childremoved",child:null};class Bn extends ar{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:BT++}),this.uuid=Zl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bn.DEFAULT_UP.clone();const e=new q,n=new Qs,i=new Ao,a=new q(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Bt},normalMatrix:{value:new je}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=Bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xy,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return pr.setFromAxisAngle(e,n),this.quaternion.multiply(pr),this}rotateOnWorldAxis(e,n){return pr.setFromAxisAngle(e,n),this.quaternion.premultiply(pr),this}rotateX(e){return this.rotateOnAxis($0,e)}rotateY(e){return this.rotateOnAxis(ev,e)}rotateZ(e){return this.rotateOnAxis(tv,e)}translateOnAxis(e,n){return J0.copy(e).applyQuaternion(this.quaternion),this.position.add(J0.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis($0,e)}translateY(e){return this.translateOnAxis(ev,e)}translateZ(e){return this.translateOnAxis(tv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(da.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?gc.copy(e):gc.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?da.lookAt(Go,gc,this.up):da.lookAt(gc,Go,this.up),this.quaternion.setFromRotationMatrix(da),a&&(da.extractRotation(a.matrixWorld),pr.setFromRotationMatrix(da),this.quaternion.premultiply(pr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(ht("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nv),mr.child=e,this.dispatchEvent(mr),mr.child=null):ht("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(GT),_d.child=e,this.dispatchEvent(_d),_d.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),da.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),da.multiply(e.parent.matrixWorld)),e.applyMatrix4(da),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nv),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,FT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,HT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,f=l.length;c<f;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),f=r(e.images),h=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),f.length>0&&(i.images=f),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const f=o[c];delete f.metadata,l.push(f)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Bn.DEFAULT_UP=new q(0,1,0);Bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class vc extends Bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const VT={type:"move"};class xd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new vc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new vc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new vc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const b of e.hand.values()){const v=n.getJointPose(b,i),d=this._getHandJoint(c,b);v!==null&&(d.matrix.fromArray(v.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=v.radius),d.visible=v!==null}const f=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=f.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(VT)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new vc;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Sy={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ga={h:0,s:0,l:0},_c={h:0,s:0,l:0};function Sd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class rt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=mi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=ct.workingColorSpace){return this.r=e,this.g=n,this.b=i,ct.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=ct.workingColorSpace){if(e=RT(e,1),n=ut(n,0,1),i=ut(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Sd(r,s,e+1/3),this.g=Sd(r,s,e),this.b=Sd(r,s,e-1/3)}return ct.colorSpaceToWorking(this,a),this}setStyle(e,n=mi){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Fe("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=mi){const i=Sy[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Na(e.r),this.g=Na(e.g),this.b=Na(e.b),this}copyLinearToSRGB(e){return this.r=eo(e.r),this.g=eo(e.g),this.b=eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mi){return ct.workingToColorSpace(An.copy(this),e),Math.round(ut(An.r*255,0,255))*65536+Math.round(ut(An.g*255,0,255))*256+Math.round(ut(An.b*255,0,255))}getHexString(e=mi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=ct.workingColorSpace){ct.workingToColorSpace(An.copy(this),n);const i=An.r,a=An.g,s=An.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const f=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=f<=.5?h/(r+o):h/(2-r-o),r){case i:l=(a-s)/h+(a<s?6:0);break;case a:l=(s-i)/h+2;break;case s:l=(i-a)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=f,e}getRGB(e,n=ct.workingColorSpace){return ct.workingToColorSpace(An.copy(this),n),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=mi){ct.workingToColorSpace(An.copy(this),e);const n=An.r,i=An.g,a=An.b;return e!==mi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(Ga),this.setHSL(Ga.h+e,Ga.s+n,Ga.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Ga),e.getHSL(_c);const i=hd(Ga.h,_c.h,n),a=hd(Ga.s,_c.s,n),s=hd(Ga.l,_c.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const An=new rt;rt.NAMES=Sy;class Qm{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new rt(e),this.density=n}clone(){return new Qm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class yy extends Bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Qs,this.environmentIntensity=1,this.environmentRotation=new Qs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Li=new q,ha=new q,yd=new q,pa=new q,gr=new q,vr=new q,iv=new q,Md=new q,bd=new q,Ed=new q,Td=new Zt,Ad=new Zt,wd=new Zt;class Ei{constructor(e=new q,n=new q,i=new q){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Li.subVectors(e,n),a.cross(Li);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Li.subVectors(a,n),ha.subVectors(i,n),yd.subVectors(e,n);const r=Li.dot(Li),o=Li.dot(ha),l=Li.dot(yd),c=ha.dot(ha),f=ha.dot(yd),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*f)*u,g=(r*f-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,pa)===null?!1:pa.x>=0&&pa.y>=0&&pa.x+pa.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,pa)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,pa.x),l.addScaledVector(r,pa.y),l.addScaledVector(o,pa.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return Td.setScalar(0),Ad.setScalar(0),wd.setScalar(0),Td.fromBufferAttribute(e,n),Ad.fromBufferAttribute(e,i),wd.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Td,s.x),r.addScaledVector(Ad,s.y),r.addScaledVector(wd,s.z),r}static isFrontFacing(e,n,i,a){return Li.subVectors(i,n),ha.subVectors(e,n),Li.cross(ha).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),ha.subVectors(this.a,this.b),Li.cross(ha).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Ei.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Ei.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;gr.subVectors(a,i),vr.subVectors(s,i),Md.subVectors(e,i);const l=gr.dot(Md),c=vr.dot(Md);if(l<=0&&c<=0)return n.copy(i);bd.subVectors(e,a);const f=gr.dot(bd),h=vr.dot(bd);if(f>=0&&h<=f)return n.copy(a);const u=l*h-f*c;if(u<=0&&l>=0&&f<=0)return r=l/(l-f),n.copy(i).addScaledVector(gr,r);Ed.subVectors(e,s);const p=gr.dot(Ed),g=vr.dot(Ed);if(g>=0&&p<=g)return n.copy(s);const b=p*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(vr,o);const v=f*g-p*h;if(v<=0&&h-f>=0&&p-g>=0)return iv.subVectors(s,a),o=(h-f)/(h-f+(p-g)),n.copy(a).addScaledVector(iv,o);const d=1/(v+b+u);return r=b*d,o=u*d,n.copy(i).addScaledVector(gr,r).addScaledVector(vr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class sr{constructor(e=new q(1/0,1/0,1/0),n=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Oi):Oi.fromBufferAttribute(s,r),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),xc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),xc.copy(i.boundingBox)),xc.applyMatrix4(e.matrixWorld),this.union(xc)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),Sc.subVectors(this.max,Vo),_r.subVectors(e.a,Vo),xr.subVectors(e.b,Vo),Sr.subVectors(e.c,Vo),Va.subVectors(xr,_r),ka.subVectors(Sr,xr),Ts.subVectors(_r,Sr);let n=[0,-Va.z,Va.y,0,-ka.z,ka.y,0,-Ts.z,Ts.y,Va.z,0,-Va.x,ka.z,0,-ka.x,Ts.z,0,-Ts.x,-Va.y,Va.x,0,-ka.y,ka.x,0,-Ts.y,Ts.x,0];return!Cd(n,_r,xr,Sr,Sc)||(n=[1,0,0,0,1,0,0,0,1],!Cd(n,_r,xr,Sr,Sc))?!1:(yc.crossVectors(Va,ka),n=[yc.x,yc.y,yc.z],Cd(n,_r,xr,Sr,Sc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ma),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ma=[new q,new q,new q,new q,new q,new q,new q,new q],Oi=new q,xc=new sr,_r=new q,xr=new q,Sr=new q,Va=new q,ka=new q,Ts=new q,Vo=new q,Sc=new q,yc=new q,As=new q;function Cd(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){As.fromArray(t,s);const o=a.x*Math.abs(As.x)+a.y*Math.abs(As.y)+a.z*Math.abs(As.z),l=e.dot(As),c=n.dot(As),f=i.dot(As);if(Math.max(-Math.max(l,c,f),Math.min(l,c,f))>o)return!1}return!0}const tn=new q,Mc=new _t;let kT=0;class Mt extends ar{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:kT++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=k0,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Mc.fromBufferAttribute(this,n),Mc.applyMatrix3(e),this.setXY(n,Mc.x,Mc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix3(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix4(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyNormalMatrix(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.transformDirection(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Ho(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ho(n,this.array)),n}setX(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ho(n,this.array)),n}setY(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ho(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ho(n,this.array)),n}setW(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array),a=Xn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array),a=Xn(a,this.array),s=Xn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==k0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class My extends Mt{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class by extends Mt{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class wi extends Mt{constructor(e,n,i){super(new Float32Array(e),n,i)}}const XT=new sr,ko=new q,Rd=new q;class rr{constructor(e=new q,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):XT.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const n=ko.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(ko,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(Rd)),this.expandByPoint(ko.copy(e.center).sub(Rd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let WT=0;const hi=new Bt,Nd=new Bn,yr=new q,Jn=new sr,Xo=new sr,hn=new q;class Cn extends ar{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:WT++}),this.uuid=Zl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(TT(e)?by:My)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new je().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,n,i){return hi.makeTranslation(e,n,i),this.applyMatrix4(hi),this}scale(e,n,i){return hi.makeScale(e,n,i),this.applyMatrix4(hi),this}lookAt(e){return Nd.lookAt(e),Nd.updateMatrix(),this.applyMatrix4(Nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(yr).negate(),this.translate(yr.x,yr.y,yr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new wi(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new sr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];Jn.setFromBufferAttribute(s),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Jn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Jn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Jn.min),this.boundingBox.expandByPoint(Jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if(Jn.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Xo.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(Jn.min,Xo.min),Jn.expandByPoint(hn),hn.addVectors(Jn.max,Xo.max),Jn.expandByPoint(hn)):(Jn.expandByPoint(Xo.min),Jn.expandByPoint(Xo.max))}Jn.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)hn.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(hn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,f=o.count;c<f;c++)hn.fromBufferAttribute(o,c),l&&(yr.fromBufferAttribute(e,c),hn.add(yr)),a=Math.max(a,i.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Mt(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new q,l[y]=new q;const c=new q,f=new q,h=new q,u=new _t,p=new _t,g=new _t,b=new q,v=new q;function d(y,C,w){c.fromBufferAttribute(i,y),f.fromBufferAttribute(i,C),h.fromBufferAttribute(i,w),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,C),g.fromBufferAttribute(s,w),f.sub(c),h.sub(c),p.sub(u),g.sub(u);const D=1/(p.x*g.y-g.x*p.y);isFinite(D)&&(b.copy(f).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(D),v.copy(h).multiplyScalar(p.x).addScaledVector(f,-g.x).multiplyScalar(D),o[y].add(b),o[C].add(b),o[w].add(b),l[y].add(v),l[C].add(v),l[w].add(v))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let y=0,C=x.length;y<C;++y){const w=x[y],D=w.start,P=w.count;for(let G=D,O=D+P;G<O;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new q,_=new q,A=new q,R=new q;function T(y){A.fromBufferAttribute(a,y),R.copy(A);const C=o[y];M.copy(C),M.sub(A.multiplyScalar(A.dot(C))).normalize(),_.crossVectors(R,C);const D=_.dot(l[y])<0?-1:1;r.setXYZW(y,M.x,M.y,M.z,D)}for(let y=0,C=x.length;y<C;++y){const w=x[y],D=w.start,P=w.count;for(let G=D,O=D+P;G<O;G+=3)T(e.getX(G+0)),T(e.getX(G+1)),T(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Mt(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new q,s=new q,r=new q,o=new q,l=new q,c=new q,f=new q,h=new q;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),b=e.getX(u+1),v=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,b),r.fromBufferAttribute(n,v),f.subVectors(r,s),h.subVectors(a,s),f.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,v),o.add(f),l.add(f),c.add(f),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),f.subVectors(r,s),h.subVectors(a,s),f.cross(h),i.setXYZ(u+0,f.x,f.y,f.z),i.setXYZ(u+1,f.x,f.y,f.z),i.setXYZ(u+2,f.x,f.y,f.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)hn.fromBufferAttribute(e,n),hn.normalize(),e.setXYZ(n,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){const c=o.array,f=o.itemSize,h=o.normalized,u=new c.constructor(l.length*f);let p=0,g=0;for(let b=0,v=l.length;b<v;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*f;for(let d=0;d<f;d++)u[g++]=c[p++]}return new Mt(u,f,h)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Cn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let f=0,h=c.length;f<h;f++){const u=c[f],p=e(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],f=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];f.push(p.toJSON(e.data))}f.length>0&&(a[l]=f,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const f=a[c];this.setAttribute(c,f.clone(n))}const s=e.morphAttributes;for(const c in s){const f=[],h=s[c];for(let u=0,p=h.length;u<p;u++)f.push(h[u].clone(n));this.morphAttributes[c]=f}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,f=r.length;c<f;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let jT=0;class wo extends ar{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jT++}),this.uuid=Zl(),this.name="",this.type="Material",this.blending=ks,this.side=xs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=kh,this.blendDst=Xh,this.blendEquation=Os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=ho,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=V0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Fe(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Fe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ks&&(i.blending=this.blending),this.side!==xs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==kh&&(i.blendSrc=this.blendSrc),this.blendDst!==Xh&&(i.blendDst=this.blendDst),this.blendEquation!==Os&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ho&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==V0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new rt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new _t().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ga=new q,Dd=new q,bc=new q,Xa=new q,Ud=new q,Ec=new q,Ld=new q;class Jm{constructor(e=new q,n=new q(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ga)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ga.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ga.copy(this.origin).addScaledVector(this.direction,n),ga.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Dd.copy(e).add(n).multiplyScalar(.5),bc.copy(n).sub(e).normalize(),Xa.copy(this.origin).sub(Dd);const s=e.distanceTo(n)*.5,r=-this.direction.dot(bc),o=Xa.dot(this.direction),l=-Xa.dot(bc),c=Xa.lengthSq(),f=Math.abs(1-r*r);let h,u,p,g;if(f>0)if(h=r*l-o,u=r*o-l,g=s*f,h>=0)if(u>=-g)if(u<=g){const b=1/f;h*=b,u*=b,p=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(Dd).addScaledVector(bc,u),p}intersectSphere(e,n){ga.subVectors(e.center,this.origin);const i=ga.dot(this.direction),a=ga.dot(ga)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,f=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),f>=0?(s=(e.min.y-u.y)*f,r=(e.max.y-u.y)*f):(s=(e.max.y-u.y)*f,r=(e.min.y-u.y)*f),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,ga)!==null}intersectTriangle(e,n,i,a,s){Ud.subVectors(n,e),Ec.subVectors(i,e),Ld.crossVectors(Ud,Ec);let r=this.direction.dot(Ld),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Xa.subVectors(this.origin,e);const l=o*this.direction.dot(Ec.crossVectors(Xa,Ec));if(l<0)return null;const c=o*this.direction.dot(Ud.cross(Xa));if(c<0||l+c>r)return null;const f=-o*Xa.dot(Ld);return f<0?null:this.at(f/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ey extends wo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Qs,this.combine=ny,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const av=new Bt,ws=new Jm,Tc=new rr,sv=new q,Ac=new q,wc=new q,Cc=new q,Od=new q,Rc=new q,rv=new q,Nc=new q;class Ri extends Bn{constructor(e=new Cn,n=new Ey){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Rc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const f=o[l],h=s[l];f!==0&&(Od.fromBufferAttribute(h,e),r?Rc.addScaledVector(Od,f):Rc.addScaledVector(Od.sub(n),f))}n.add(Rc)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Tc.copy(i.boundingSphere),Tc.applyMatrix4(s),ws.copy(e.ray).recast(e.near),!(Tc.containsPoint(ws.origin)===!1&&(ws.intersectSphere(Tc,sv)===null||ws.origin.distanceToSquared(sv)>(e.far-e.near)**2))&&(av.copy(s).invert(),ws.copy(e.ray).applyMatrix4(av),!(i.boundingBox!==null&&ws.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,ws)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,f=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const v=u[g],d=r[v.materialIndex],x=Math.max(v.start,p.start),M=Math.min(o.count,Math.min(v.start+v.count,p.start+p.count));for(let _=x,A=M;_<A;_+=3){const R=o.getX(_),T=o.getX(_+1),y=o.getX(_+2);a=Dc(this,d,e,i,c,f,h,R,T,y),a&&(a.faceIndex=Math.floor(_/3),a.face.materialIndex=v.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let v=g,d=b;v<d;v+=3){const x=o.getX(v),M=o.getX(v+1),_=o.getX(v+2);a=Dc(this,r,e,i,c,f,h,x,M,_),a&&(a.faceIndex=Math.floor(v/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const v=u[g],d=r[v.materialIndex],x=Math.max(v.start,p.start),M=Math.min(l.count,Math.min(v.start+v.count,p.start+p.count));for(let _=x,A=M;_<A;_+=3){const R=_,T=_+1,y=_+2;a=Dc(this,d,e,i,c,f,h,R,T,y),a&&(a.faceIndex=Math.floor(_/3),a.face.materialIndex=v.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let v=g,d=b;v<d;v+=3){const x=v,M=v+1,_=v+2;a=Dc(this,r,e,i,c,f,h,x,M,_),a&&(a.faceIndex=Math.floor(v/3),n.push(a))}}}}function qT(t,e,n,i,a,s,r,o){let l;if(e.side===Yn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===xs,o),l===null)return null;Nc.copy(o),Nc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Nc);return c<n.near||c>n.far?null:{distance:c,point:Nc.clone(),object:t}}function Dc(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,Ac),t.getVertexPosition(l,wc),t.getVertexPosition(c,Cc);const f=qT(t,e,n,i,Ac,wc,Cc,rv);if(f){const h=new q;Ei.getBarycoord(rv,Ac,wc,Cc,h),a&&(f.uv=Ei.getInterpolatedAttribute(a,o,l,c,h,new _t)),s&&(f.uv1=Ei.getInterpolatedAttribute(s,o,l,c,h,new _t)),r&&(f.normal=Ei.getInterpolatedAttribute(r,o,l,c,h,new q),f.normal.dot(i.direction)>0&&f.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new q,materialIndex:0};Ei.getNormal(Ac,wc,Cc,u.normal),f.face=u,f.barycoord=h}return f}class Ty extends In{constructor(e=null,n=1,i=1,a,s,r,o,l,c=Mn,f=Mn,h,u){super(null,r,o,l,c,f,a,s,h,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Xr extends Mt{constructor(e,n,i,a=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Mr=new Bt,ov=new Bt,Uc=[],lv=new sr,YT=new Bt,Wo=new Ri,jo=new rr;class cv extends Ri{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new Xr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,YT)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new sr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Mr),lv.copy(e.boundingBox).applyMatrix4(Mr),this.boundingBox.union(lv)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new rr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Mr),jo.copy(e.boundingSphere).applyMatrix4(Mr),this.boundingSphere.union(jo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(e,n){const i=this.matrixWorld,a=this.count;if(Wo.geometry=this.geometry,Wo.material=this.material,Wo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),jo.copy(this.boundingSphere),jo.applyMatrix4(i),e.ray.intersectsSphere(jo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,Mr),ov.multiplyMatrices(i,Mr),Wo.matrixWorld=ov,Wo.raycast(e,Uc);for(let r=0,o=Uc.length;r<o;r++){const l=Uc[r];l.instanceId=s,l.object=this,n.push(l)}Uc.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new Xr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ty(new Float32Array(a*this.count),a,this.count,Xm,zi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Pd=new q,ZT=new q,KT=new je;class Ls{constructor(e=new q(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=Pd.subVectors(i,n).cross(ZT.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const a=e.delta(Pd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||KT.getNormalMatrix(e),a=this.coplanarPoint(Pd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Cs=new rr,QT=new _t(.5,.5),Lc=new q;class Ay{constructor(e=new Ls,n=new Ls,i=new Ls,a=new Ls,s=new Ls,r=new Ls){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Ki,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],f=s[4],h=s[5],u=s[6],p=s[7],g=s[8],b=s[9],v=s[10],d=s[11],x=s[12],M=s[13],_=s[14],A=s[15];if(a[0].setComponents(c-r,p-f,d-g,A-x).normalize(),a[1].setComponents(c+r,p+f,d+g,A+x).normalize(),a[2].setComponents(c+o,p+h,d+b,A+M).normalize(),a[3].setComponents(c-o,p-h,d-b,A-M).normalize(),i)a[4].setComponents(l,u,v,_).normalize(),a[5].setComponents(c-l,p-u,d-v,A-_).normalize();else if(a[4].setComponents(c-l,p-u,d-v,A-_).normalize(),n===Ki)a[5].setComponents(c+l,p+u,d+v,A+_).normalize();else if(n===Ku)a[5].setComponents(l,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Cs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Cs.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Cs)}intersectsSprite(e){Cs.center.set(0,0,0);const n=QT.distanceTo(e.center);return Cs.radius=.7071067811865476+n,Cs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Cs)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Lc.x=a.normal.x>0?e.max.x:e.min.x,Lc.y=a.normal.y>0?e.max.y:e.min.y,Lc.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Lc)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class wy extends wo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ju=new q,$u=new q,uv=new Bt,qo=new Jm,Oc=new rr,zd=new q,fv=new q;class JT extends Bn{constructor(e=new Cn,n=new wy){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Ju.fromBufferAttribute(n,a-1),$u.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Ju.distanceTo($u);e.setAttribute("lineDistance",new wi(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oc.copy(i.boundingSphere),Oc.applyMatrix4(a),Oc.radius+=s,e.ray.intersectsSphere(Oc)===!1)return;uv.copy(a).invert(),qo.copy(e.ray).applyMatrix4(uv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,f=i.index,u=i.attributes.position;if(f!==null){const p=Math.max(0,r.start),g=Math.min(f.count,r.start+r.count);for(let b=p,v=g-1;b<v;b+=c){const d=f.getX(b),x=f.getX(b+1),M=Pc(this,e,qo,l,d,x,b);M&&n.push(M)}if(this.isLineLoop){const b=f.getX(g-1),v=f.getX(p),d=Pc(this,e,qo,l,b,v,g-1);d&&n.push(d)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let b=p,v=g-1;b<v;b+=c){const d=Pc(this,e,qo,l,b,b+1,b);d&&n.push(d)}if(this.isLineLoop){const b=Pc(this,e,qo,l,g-1,p,g-1);b&&n.push(b)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Pc(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(Ju.fromBufferAttribute(o,a),$u.fromBufferAttribute(o,s),n.distanceSqToSegment(Ju,$u,zd,fv)>i)return;zd.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(zd);if(!(c<e.near||c>e.far))return{distance:c,point:fv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const dv=new q,hv=new q;class hu extends JT{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)dv.fromBufferAttribute(n,a),hv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+dv.distanceTo(hv);e.setAttribute("lineDistance",new wi(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $T extends wo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const pv=new Bt,Dp=new Jm,zc=new rr,Ic=new q;class Up extends Bn{constructor(e=new Cn,n=new $T){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zc.copy(i.boundingSphere),zc.applyMatrix4(a),zc.radius+=s,e.ray.intersectsSphere(zc)===!1)return;pv.copy(a).invert(),Dp.copy(e.ray).applyMatrix4(pv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,b=p;g<b;g++){const v=c.getX(g);Ic.fromBufferAttribute(h,v),mv(Ic,v,l,a,e,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let g=u,b=p;g<b;g++)Ic.fromBufferAttribute(h,g),mv(Ic,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function mv(t,e,n,i,a,s,r){const o=Dp.distanceSqToPoint(t);if(o<n){const l=new q;Dp.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Cy extends In{constructor(e=[],n=Zs,i,a,s,r,o,l,c,f){super(e,n,i,a,s,r,o,l,c,f),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class mo extends In{constructor(e,n,i=ea,a,s,r,o=Mn,l=Mn,c,f=Ia,h=1){if(f!==Ia&&f!==Is)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:h};super(u,a,s,r,o,l,f,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Km(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class eA extends mo{constructor(e,n=ea,i=Zs,a,s,r=Mn,o=Mn,l,c=Ia){const f={width:e,height:e,depth:1},h=[f,f,f,f,f,f];super(e,e,n,i,a,s,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ry extends In{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Js extends Cn{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],f=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new wi(c,3)),this.setAttribute("normal",new wi(f,3)),this.setAttribute("uv",new wi(h,2));function g(b,v,d,x,M,_,A,R,T,y,C){const w=_/T,D=A/y,P=_/2,G=A/2,O=R/2,z=T+1,B=y+1;let I=0,U=0;const X=new q;for(let oe=0;oe<B;oe++){const ce=oe*D-G;for(let xe=0;xe<z;xe++){const ke=xe*w-P;X[b]=ke*x,X[v]=ce*M,X[d]=O,c.push(X.x,X.y,X.z),X[b]=0,X[v]=0,X[d]=R>0?1:-1,f.push(X.x,X.y,X.z),h.push(xe/T),h.push(1-oe/y),I+=1}}for(let oe=0;oe<y;oe++)for(let ce=0;ce<T;ce++){const xe=u+ce+z*oe,ke=u+ce+z*(oe+1),Ke=u+(ce+1)+z*(oe+1),Be=u+(ce+1)+z*oe;l.push(xe,ke,Be),l.push(ke,Ke,Be),U+=6}o.addGroup(p,U,C),p+=U,u+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Js(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Bc=new q,Fc=new q,Id=new q,Hc=new Ei;class tA extends Cn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const a=Math.pow(10,4),s=Math.cos(du*n),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],f=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:b,b:v,c:d}=Hc;if(b.fromBufferAttribute(o,c[0]),v.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),Hc.getNormal(Id),h[0]=`${Math.round(b.x*a)},${Math.round(b.y*a)},${Math.round(b.z*a)}`,h[1]=`${Math.round(v.x*a)},${Math.round(v.y*a)},${Math.round(v.z*a)}`,h[2]=`${Math.round(d.x*a)},${Math.round(d.y*a)},${Math.round(d.z*a)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let x=0;x<3;x++){const M=(x+1)%3,_=h[x],A=h[M],R=Hc[f[x]],T=Hc[f[M]],y=`${_}_${A}`,C=`${A}_${_}`;C in u&&u[C]?(Id.dot(u[C].normal)<=s&&(p.push(R.x,R.y,R.z),p.push(T.x,T.y,T.z)),u[C]=null):y in u||(u[y]={index0:c[x],index1:c[M],normal:Id.clone()})}}for(const g in u)if(u[g]){const{index0:b,index1:v}=u[g];Bc.fromBufferAttribute(o,b),Fc.fromBufferAttribute(o,v),p.push(Bc.x,Bc.y,Bc.z),p.push(Fc.x,Fc.y,Fc.z)}this.setAttribute("position",new wi(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class Mf extends Cn{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,f=l+1,h=e/o,u=n/l,p=[],g=[],b=[],v=[];for(let d=0;d<f;d++){const x=d*u-r;for(let M=0;M<c;M++){const _=M*h-s;g.push(_,-x,0),b.push(0,0,1),v.push(M/o),v.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<o;x++){const M=x+c*d,_=x+c*(d+1),A=x+1+c*(d+1),R=x+1+c*d;p.push(M,_,R),p.push(_,A,R)}this.setIndex(p),this.setAttribute("position",new wi(g,3)),this.setAttribute("normal",new wi(b,3)),this.setAttribute("uv",new wi(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mf(e.width,e.height,e.widthSegments,e.heightSegments)}}function go(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];if(gv(a))a.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone();else if(Array.isArray(a))if(gv(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();e[n][i]=s}else e[n][i]=a.slice();else e[n][i]=a}}return e}function On(t){const e={};for(let n=0;n<t.length;n++){const i=go(t[n]);for(const a in i)e[a]=i[a]}return e}function gv(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function nA(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Ny(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const iA={clone:go,merge:On};var aA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends wo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=aA,this.fragmentShader=sA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=go(e.uniforms),this.uniformsGroups=nA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const a=e.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new rt().setHex(a.value);break;case"v2":this.uniforms[i].value=new _t().fromArray(a.value);break;case"v3":this.uniforms[i].value=new q().fromArray(a.value);break;case"v4":this.uniforms[i].value=new Zt().fromArray(a.value);break;case"m3":this.uniforms[i].value=new je().fromArray(a.value);break;case"m4":this.uniforms[i].value=new Bt().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class rA extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class oA extends wo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class lA extends wo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Gc=new q,Vc=new Ao,ki=new q;class Dy extends Bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Ki,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Gc,Vc,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gc,Vc,ki.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Gc,Vc,ki),ki.x===1&&ki.y===1&&ki.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Gc,Vc,ki.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Wa=new q,vv=new _t,_v=new _t;class xi extends Dy{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Np*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(du*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Np*2*Math.atan(Math.tan(du*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Wa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Wa.x,Wa.y).multiplyScalar(-e/Wa.z),Wa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Wa.x,Wa.y).multiplyScalar(-e/Wa.z)}getViewSize(e,n){return this.getViewBounds(e,vv,_v),n.subVectors(_v,vv)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(du*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class $m extends Dy{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,f=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=f*this.view.offsetY,l=o-f*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const br=-90,Er=1;class cA extends Bn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new xi(br,Er,e,n);a.layers=this.layers,this.add(a);const s=new xi(br,Er,e,n);s.layers=this.layers,this.add(s);const r=new xi(br,Er,e,n);r.layers=this.layers,this.add(r);const o=new xi(br,Er,e,n);o.layers=this.layers,this.add(o);const l=new xi(br,Er,e,n);l.layers=this.layers,this.add(l);const c=new xi(br,Er,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===Ki)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ku)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,f]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,f),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class uA extends xi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const sg=class sg{constructor(e,n,i,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,a){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=a,this}};sg.prototype.isMatrix2=!0;let xv=sg;function Sv(t,e,n,i){const a=fA(i);switch(n){case my:return t*e;case Xm:return t*e/a.components*a.byteLength;case Wm:return t*e/a.components*a.byteLength;case Ks:return t*e*2/a.components*a.byteLength;case jm:return t*e*2/a.components*a.byteLength;case gy:return t*e*3/a.components*a.byteLength;case Ii:return t*e*4/a.components*a.byteLength;case qm:return t*e*4/a.components*a.byteLength;case lu:case cu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case uu:case fu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case tp:case ip:return Math.max(t,16)*Math.max(e,8)/4;case ep:case np:return Math.max(t,8)*Math.max(e,8)/2;case ap:case sp:case op:case lp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case rp:case ju:case cp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case up:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case fp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case dp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case hp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case pp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case mp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case gp:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case vp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case _p:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case xp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case yp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Mp:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case bp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Ep:case Tp:case Ap:return Math.ceil(t/4)*Math.ceil(e/4)*16;case wp:case Cp:return Math.ceil(t/4)*Math.ceil(e/4)*8;case qu:case Rp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function fA(t){switch(t){case bi:case fy:return{byteLength:1,components:1};case Ll:case dy:case za:return{byteLength:2,components:1};case Vm:case km:return{byteLength:2,components:4};case ea:case Gm:case zi:return{byteLength:4,components:1};case hy:case py:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Hm}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Hm);/**
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
#endif`,CA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,RA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,C1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,R1=`#ifdef USE_MORPHTARGETS
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
}`,Cw=`uniform vec3 diffuse;
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
}`,Rw=`#define LAMBERT
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
}`,tt={alphahash_fragment:hA,alphahash_pars_fragment:pA,alphamap_fragment:mA,alphamap_pars_fragment:gA,alphatest_fragment:vA,alphatest_pars_fragment:_A,aomap_fragment:xA,aomap_pars_fragment:SA,batching_pars_vertex:yA,batching_vertex:MA,begin_vertex:bA,beginnormal_vertex:EA,bsdfs:TA,iridescence_fragment:AA,bumpmap_pars_fragment:wA,clipping_planes_fragment:CA,clipping_planes_pars_fragment:RA,clipping_planes_pars_vertex:NA,clipping_planes_vertex:DA,color_fragment:UA,color_pars_fragment:LA,color_pars_vertex:OA,color_vertex:PA,common:zA,cube_uv_reflection_fragment:IA,defaultnormal_vertex:BA,displacementmap_pars_vertex:FA,displacementmap_vertex:HA,emissivemap_fragment:GA,emissivemap_pars_fragment:VA,colorspace_fragment:kA,colorspace_pars_fragment:XA,envmap_fragment:WA,envmap_common_pars_fragment:jA,envmap_pars_fragment:qA,envmap_pars_vertex:YA,envmap_physical_pars_fragment:s1,envmap_vertex:ZA,fog_vertex:KA,fog_pars_vertex:QA,fog_fragment:JA,fog_pars_fragment:$A,gradientmap_pars_fragment:e1,lightmap_pars_fragment:t1,lights_lambert_fragment:n1,lights_lambert_pars_fragment:i1,lights_pars_begin:a1,lights_toon_fragment:r1,lights_toon_pars_fragment:o1,lights_phong_fragment:l1,lights_phong_pars_fragment:c1,lights_physical_fragment:u1,lights_physical_pars_fragment:f1,lights_fragment_begin:d1,lights_fragment_maps:h1,lights_fragment_end:p1,lightprobes_pars_fragment:m1,logdepthbuf_fragment:g1,logdepthbuf_pars_fragment:v1,logdepthbuf_pars_vertex:_1,logdepthbuf_vertex:x1,map_fragment:S1,map_pars_fragment:y1,map_particle_fragment:M1,map_particle_pars_fragment:b1,metalnessmap_fragment:E1,metalnessmap_pars_fragment:T1,morphinstance_vertex:A1,morphcolor_vertex:w1,morphnormal_vertex:C1,morphtarget_pars_vertex:R1,morphtarget_vertex:N1,normal_fragment_begin:D1,normal_fragment_maps:U1,normal_pars_fragment:L1,normal_pars_vertex:O1,normal_vertex:P1,normalmap_pars_fragment:z1,clearcoat_normal_fragment_begin:I1,clearcoat_normal_fragment_maps:B1,clearcoat_pars_fragment:F1,iridescence_pars_fragment:H1,opaque_fragment:G1,packing:V1,premultiplied_alpha_fragment:k1,project_vertex:X1,dithering_fragment:W1,dithering_pars_fragment:j1,roughnessmap_fragment:q1,roughnessmap_pars_fragment:Y1,shadowmap_pars_fragment:Z1,shadowmap_pars_vertex:K1,shadowmap_vertex:Q1,shadowmask_pars_fragment:J1,skinbase_vertex:$1,skinning_pars_vertex:ew,skinning_vertex:tw,skinnormal_vertex:nw,specularmap_fragment:iw,specularmap_pars_fragment:aw,tonemapping_fragment:sw,tonemapping_pars_fragment:rw,transmission_fragment:ow,transmission_pars_fragment:lw,uv_pars_fragment:cw,uv_pars_vertex:uw,uv_vertex:fw,worldpos_vertex:dw,background_vert:hw,background_frag:pw,backgroundCube_vert:mw,backgroundCube_frag:gw,cube_vert:vw,cube_frag:_w,depth_vert:xw,depth_frag:Sw,distance_vert:yw,distance_frag:Mw,equirect_vert:bw,equirect_frag:Ew,linedashed_vert:Tw,linedashed_frag:Aw,meshbasic_vert:ww,meshbasic_frag:Cw,meshlambert_vert:Rw,meshlambert_frag:Nw,meshmatcap_vert:Dw,meshmatcap_frag:Uw,meshnormal_vert:Lw,meshnormal_frag:Ow,meshphong_vert:Pw,meshphong_frag:zw,meshphysical_vert:Iw,meshphysical_frag:Bw,meshtoon_vert:Fw,meshtoon_frag:Hw,points_vert:Gw,points_frag:Vw,shadow_vert:kw,shadow_frag:Xw,sprite_vert:Ww,sprite_frag:jw},be={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new je}},envmap:{envMap:{value:null},envMapRotation:{value:new je},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new je}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new je}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new je},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new je},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new je},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new je}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new je}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new je}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0},uvTransform:{value:new je}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new je},alphaMap:{value:null},alphaMapTransform:{value:new je},alphaTest:{value:0}}},Wi={basic:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:On([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:On([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new rt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:On([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:On([be.points,be.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:On([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:On([be.common,be.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:On([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:On([be.sprite,be.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new je},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new je}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:On([be.common,be.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:On([be.lights,be.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Wi.physical={uniforms:On([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new je},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new je},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new je},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new je},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new je},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new je},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new je},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new je},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new je},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new je},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new je},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new je}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const kc={r:0,b:0,g:0},qw=new Bt,Ly=new je;Ly.set(-1,0,0,0,1,0,0,0,1);function Yw(t,e,n,i,a,s){const r=new rt(0);let o=a===!0?0:1,l,c,f=null,h=0,u=null;function p(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const _=x.backgroundBlurriness>0;M=e.get(M,_)}return M}function g(x){let M=!1;const _=p(x);_===null?v(r,o):_&&_.isColor&&(v(_,1),M=!0);const A=t.xr.getEnvironmentBlendMode();A==="additive"?n.buffers.color.setClear(0,0,0,1,s):A==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function b(x,M){const _=p(M);_&&(_.isCubeTexture||_.mapping===yf)?(c===void 0&&(c=new Ri(new Js(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:go(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(A,R,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(qw.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Ly),c.material.toneMapped=ct.getTransfer(_.colorSpace)!==Tt,(f!==_||h!==_.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,f=_,h=_.version,u=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ri(new Mf(2,2),new bn({name:"BackgroundMaterial",uniforms:go(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:xs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ct.getTransfer(_.colorSpace)!==Tt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(f!==_||h!==_.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,f=_,h=_.version,u=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function v(x,M){x.getRGB(kc,Ny(t)),n.buffers.color.setClear(kc.r,kc.g,kc.b,M,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,M=1){r.set(x),o=M,v(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,v(r,o)},render:g,addToRenderList:b,dispose:d}}function Zw(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(D,P,G,O,z){let B=!1;const I=h(D,O,G,P);s!==I&&(s=I,c(s.object)),B=p(D,O,G,z),B&&g(D,O,G,z),z!==null&&e.update(z,t.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,_(D,P,G,O),z!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return t.createVertexArray()}function c(D){return t.bindVertexArray(D)}function f(D){return t.deleteVertexArray(D)}function h(D,P,G,O){const z=O.wireframe===!0;let B=i[P.id];B===void 0&&(B={},i[P.id]=B);const I=D.isInstancedMesh===!0?D.id:0;let U=B[I];U===void 0&&(U={},B[I]=U);let X=U[G.id];X===void 0&&(X={},U[G.id]=X);let oe=X[z];return oe===void 0&&(oe=u(l()),X[z]=oe),oe}function u(D){const P=[],G=[],O=[];for(let z=0;z<n;z++)P[z]=0,G[z]=0,O[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:G,attributeDivisors:O,object:D,attributes:{},index:null}}function p(D,P,G,O){const z=s.attributes,B=P.attributes;let I=0;const U=G.getAttributes();for(const X in U)if(U[X].location>=0){const ce=z[X];let xe=B[X];if(xe===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(xe=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(xe=D.instanceColor)),ce===void 0||ce.attribute!==xe||xe&&ce.data!==xe.data)return!0;I++}return s.attributesNum!==I||s.index!==O}function g(D,P,G,O){const z={},B=P.attributes;let I=0;const U=G.getAttributes();for(const X in U)if(U[X].location>=0){let ce=B[X];ce===void 0&&(X==="instanceMatrix"&&D.instanceMatrix&&(ce=D.instanceMatrix),X==="instanceColor"&&D.instanceColor&&(ce=D.instanceColor));const xe={};xe.attribute=ce,ce&&ce.data&&(xe.data=ce.data),z[X]=xe,I++}s.attributes=z,s.attributesNum=I,s.index=O}function b(){const D=s.newAttributes;for(let P=0,G=D.length;P<G;P++)D[P]=0}function v(D){d(D,0)}function d(D,P){const G=s.newAttributes,O=s.enabledAttributes,z=s.attributeDivisors;G[D]=1,O[D]===0&&(t.enableVertexAttribArray(D),O[D]=1),z[D]!==P&&(t.vertexAttribDivisor(D,P),z[D]=P)}function x(){const D=s.newAttributes,P=s.enabledAttributes;for(let G=0,O=P.length;G<O;G++)P[G]!==D[G]&&(t.disableVertexAttribArray(G),P[G]=0)}function M(D,P,G,O,z,B,I){I===!0?t.vertexAttribIPointer(D,P,G,z,B):t.vertexAttribPointer(D,P,G,O,z,B)}function _(D,P,G,O){b();const z=O.attributes,B=G.getAttributes(),I=P.defaultAttributeValues;for(const U in B){const X=B[U];if(X.location>=0){let oe=z[U];if(oe===void 0&&(U==="instanceMatrix"&&D.instanceMatrix&&(oe=D.instanceMatrix),U==="instanceColor"&&D.instanceColor&&(oe=D.instanceColor)),oe!==void 0){const ce=oe.normalized,xe=oe.itemSize,ke=e.get(oe);if(ke===void 0)continue;const Ke=ke.buffer,Be=ke.type,se=ke.bytesPerElement,_e=Be===t.INT||Be===t.UNSIGNED_INT||oe.gpuType===Gm;if(oe.isInterleavedBufferAttribute){const me=oe.data,Le=me.stride,ze=oe.offset;if(me.isInstancedInterleavedBuffer){for(let Ie=0;Ie<X.locationSize;Ie++)d(X.location+Ie,me.meshPerAttribute);D.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Ie=0;Ie<X.locationSize;Ie++)v(X.location+Ie);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let Ie=0;Ie<X.locationSize;Ie++)M(X.location+Ie,xe/X.locationSize,Be,ce,Le*se,(ze+xe/X.locationSize*Ie)*se,_e)}else{if(oe.isInstancedBufferAttribute){for(let me=0;me<X.locationSize;me++)d(X.location+me,oe.meshPerAttribute);D.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let me=0;me<X.locationSize;me++)v(X.location+me);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let me=0;me<X.locationSize;me++)M(X.location+me,xe/X.locationSize,Be,ce,xe*se,xe/X.locationSize*me*se,_e)}}else if(I!==void 0){const ce=I[U];if(ce!==void 0)switch(ce.length){case 2:t.vertexAttrib2fv(X.location,ce);break;case 3:t.vertexAttrib3fv(X.location,ce);break;case 4:t.vertexAttrib4fv(X.location,ce);break;default:t.vertexAttrib1fv(X.location,ce)}}}}x()}function A(){C();for(const D in i){const P=i[D];for(const G in P){const O=P[G];for(const z in O){const B=O[z];for(const I in B)f(B[I].object),delete B[I];delete O[z]}}delete i[D]}}function R(D){if(i[D.id]===void 0)return;const P=i[D.id];for(const G in P){const O=P[G];for(const z in O){const B=O[z];for(const I in B)f(B[I].object),delete B[I];delete O[z]}}delete i[D.id]}function T(D){for(const P in i){const G=i[P];for(const O in G){const z=G[O];if(z[D.id]===void 0)continue;const B=z[D.id];for(const I in B)f(B[I].object),delete B[I];delete z[D.id]}}}function y(D){for(const P in i){const G=i[P],O=D.isInstancedMesh===!0?D.id:0,z=G[O];if(z!==void 0){for(const B in z){const I=z[B];for(const U in I)f(I[U].object),delete I[U];delete z[B]}delete G[O],Object.keys(G).length===0&&delete i[P]}}}function C(){w(),r=!0,s!==a&&(s=a,c(s.object))}function w(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:C,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfObject:y,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:v,disableUnusedAttributes:x}}function Kw(t,e,n){let i;function a(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,f){f!==0&&(t.drawArraysInstanced(i,l,c,f),n.update(c,i,f))}function o(l,c,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,f);let u=0;for(let p=0;p<f;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function Qw(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Ii&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const y=T===za&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==bi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==zi&&!y)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const f=l(c);f!==c&&(Fe("WebGLRenderer:",c,"not supported, using",f,"instead."),c=f);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),A=t.getParameter(t.MAX_SAMPLES),R=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:v,maxAttributes:d,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,maxSamples:A,samples:R}}function Jw(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new Ls,o=new je,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||a;return a=u,i=h.length,p},this.beginShadows=function(){s=!0,f(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=f(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,b=h.clipIntersection,v=h.clipShadows,d=t.get(h);if(!a||g===null||g.length===0||s&&!v)s?f(null):c();else{const x=s?0:i,M=x*4;let _=d.clippingState||null;l.value=_,_=f(g,u,M,p);for(let A=0;A!==M;++A)_[A]=n[A];d.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function f(h,u,p,g){const b=h!==null?h.length:0;let v=null;if(b!==0){if(v=l.value,g!==!0||v===null){const d=p+b*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(v===null||v.length<d)&&(v=new Float32Array(d));for(let M=0,_=p;M!==b;++M,_+=4)r.copy(h[M]).applyMatrix4(x,o),r.normal.toArray(v,_),v[_+3]=r.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,v}}const as=4,yv=[.125,.215,.35,.446,.526,.582],Ps=20,$w=256,Yo=new $m,Mv=new rt;let Bd=null,Fd=0,Hd=0,Gd=!1;const eC=new q;class bv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=eC}=s;Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Av(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Tv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bd,Fd,Hd),this._renderer.xr.enabled=Gd,e.scissorTest=!1,Tr(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Zs||e.mapping===po?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bd=this._renderer.getRenderTarget(),Fd=this._renderer.getActiveCubeFace(),Hd=this._renderer.getActiveMipmapLevel(),Gd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:za,format:Ii,colorSpace:Yu,depthBuffer:!1},a=Ev(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ev(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=tC(s)),this._blurMaterial=iC(s,e,n),this._ggxMaterial=nC(s,e,n)}return a}_compileMaterial(e){const n=new Ri(new Cn,e);this._renderer.compile(n,Yo)}_sceneToCubeUV(e,n,i,a,s){const l=new xi(90,1,n,i),c=[1,-1,1,1,1,1],f=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(Mv),h.toneMapping=Ji,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ri(new Js,new Ey({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,v=b.material;let d=!1;const x=e.background;x?x.isColor&&(v.color.copy(x),e.background=null,d=!0):(v.color.copy(Mv),d=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+f[M],s.y,s.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+f[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+f[M]));const A=this._cubeSize;Tr(a,_*A,M>2?A:0,A,A),h.setRenderTarget(a),d&&h.render(b,l),h.render(e,l)}h.toneMapping=p,h.autoClear=u,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===Zs||e.mapping===po;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Av()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Tv());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Tr(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Yo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),f=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-f*f),u=0+c*1.25,p=h*u,{_lodMax:g}=this,b=this._sizeLods[i],v=3*b*(i>g-as?i-g+as:0),d=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-n,Tr(s,v,d,3*b,2*b),a.setRenderTarget(s),a.render(o,Yo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Tr(e,v,d,3*b,2*b),a.setRenderTarget(e),a.render(o,Yo)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&ht("blur direction must be either latitudinal or longitudinal!");const f=3,h=this._lodMeshes[a];h.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Ps-1),b=s/g,v=isFinite(s)?1+Math.floor(f*b):Ps;v>Ps&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Ps}`);const d=[];let x=0;for(let T=0;T<Ps;++T){const y=T/b,C=Math.exp(-y*y/2);d.push(C),T===0?x+=C:T<v&&(x+=2*C)}for(let T=0;T<d.length;T++)d[T]=d[T]/x;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=d,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const _=this._sizeLods[a],A=3*_*(a>M-as?a-M+as:0),R=4*(this._cubeSize-_);Tr(n,A,R,3*_,2*_),l.setRenderTarget(n),l.render(h,Yo)}}function tC(t){const e=[],n=[],i=[];let a=t;const s=t-as+1+yv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-as?l=yv[r-t+as-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),f=-c,h=1+c,u=[f,f,h,f,h,h,f,f,h,h,f,h],p=6,g=6,b=3,v=2,d=1,x=new Float32Array(b*g*p),M=new Float32Array(v*g*p),_=new Float32Array(d*g*p);for(let R=0;R<p;R++){const T=R%3*2/3-1,y=R>2?0:-1,C=[T,y,0,T+2/3,y,0,T+2/3,y+1,0,T,y,0,T+2/3,y+1,0,T,y+1,0];x.set(C,b*g*R),M.set(u,v*g*R);const w=[R,R,R,R,R,R];_.set(w,d*g*R)}const A=new Cn;A.setAttribute("position",new Mt(x,b)),A.setAttribute("uv",new Mt(M,v)),A.setAttribute("faceIndex",new Mt(_,d)),i.push(new Ri(A,null)),a>as&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Ev(t,e,n){const i=new $i(t,e,n);return i.texture.mapping=yf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Tr(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function nC(t,e,n){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:$w,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function iC(t,e,n){const i=new Float32Array(Ps),a=new q(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function Tv(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:bf(),fragmentShader:`

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
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function Av(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:bf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ra,depthTest:!1,depthWrite:!1})}function bf(){return`

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
	`}class Oy extends $i{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Cy(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new Js(5,5,5),s=new bn({name:"CubemapFromEquirect",uniforms:go(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yn,blending:Ra});s.uniforms.tEquirect.value=n;const r=new Ri(a,s),o=n.minFilter;return n.minFilter===zs&&(n.minFilter=wn),new cA(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function aC(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===ud||p===fd)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new Oy(g.height);return b.fromEquirectangularTexture(t,u),e.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===ud||p===fd,b=p===Zs||p===po;if(g||b){let v=n.get(u);const d=v!==void 0?v.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new bv(t)),v=g?i.fromEquirectangular(u,v):i.fromCubemap(u,v),v.texture.pmremVersion=u.pmremVersion,n.set(u,v),v.texture;if(v!==void 0)return v.texture;{const x=u.image;return g&&x&&x.height>0||b&&x&&l(x)?(i===null&&(i=new bv(t)),v=g?i.fromEquirectangular(u):i.fromCubemap(u),v.texture.pmremVersion=u.pmremVersion,n.set(u,v),u.addEventListener("dispose",f),v.texture):null}}}return u}function o(u,p){return p===ud?u.mapping=Zs:p===fd&&(u.mapping=po),u}function l(u){let p=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function f(u){const p=u.target;p.removeEventListener("dispose",f);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function sC(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&$r("WebGLRenderer: "+i+" extension not supported."),a}}}function rC(t,e,n,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let b=0;if(g===void 0)return;if(p!==null){const x=p.array;b=p.version;for(let M=0,_=x.length;M<_;M+=3){const A=x[M+0],R=x[M+1],T=x[M+2];u.push(A,R,R,T,T,A)}}else{const x=g.array;b=g.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const A=M+0,R=M+1,T=M+2;u.push(A,R,R,T,T,A)}}const v=new(g.count>=65535?by:My)(u,1);v.version=b;const d=s.get(h);d&&e.remove(d),s.set(h,v)}function f(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:f}}function oC(t,e,n){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,u){t.drawElements(i,u,s,h*r),n.update(u,i,1)}function c(h,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,h*r,p),n.update(u,i,p))}function f(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let b=0;for(let v=0;v<p;v++)b+=u[v];n.update(b,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=f}function lC(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:ht("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function cC(t,e,n){const i=new WeakMap,a=new Zt;function s(r,o,l){const c=r.morphTargetInfluences,f=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=f!==void 0?f.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let w=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",w)};var p=w;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),b===!0&&(_=2),v===!0&&(_=3);let A=o.attributes.position.count*_,R=1;A>e.maxTextureSize&&(R=Math.ceil(A/e.maxTextureSize),A=e.maxTextureSize);const T=new Float32Array(A*R*4*h),y=new _y(T,A,R,h);y.type=zi,y.needsUpdate=!0;const C=_*4;for(let D=0;D<h;D++){const P=d[D],G=x[D],O=M[D],z=A*R*4*D;for(let B=0;B<P.count;B++){const I=B*C;g===!0&&(a.fromBufferAttribute(P,B),T[z+I+0]=a.x,T[z+I+1]=a.y,T[z+I+2]=a.z,T[z+I+3]=0),b===!0&&(a.fromBufferAttribute(G,B),T[z+I+4]=a.x,T[z+I+5]=a.y,T[z+I+6]=a.z,T[z+I+7]=0),v===!0&&(a.fromBufferAttribute(O,B),T[z+I+8]=a.x,T[z+I+9]=a.y,T[z+I+10]=a.z,T[z+I+11]=O.itemSize===4?a.w:1)}}u={count:h,texture:y,size:new _t(A,R)},i.set(o,u),o.addEventListener("dispose",w)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let v=0;v<c.length;v++)g+=c[v];const b=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",b),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function uC(t,e,n,i,a){let s=new WeakMap;function r(c){const f=a.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==f&&(e.update(u),s.set(u,f)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==f&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,f))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==f&&(p.update(),s.set(p,f))}return u}function o(){s=new WeakMap}function l(c){const f=c.target;f.removeEventListener("dispose",l),i.releaseStatesOfObject(f),n.remove(f.instanceMatrix),f.instanceColor!==null&&n.remove(f.instanceColor)}return{update:r,dispose:o}}const fC={[iy]:"LINEAR_TONE_MAPPING",[ay]:"REINHARD_TONE_MAPPING",[sy]:"CINEON_TONE_MAPPING",[ry]:"ACES_FILMIC_TONE_MAPPING",[ly]:"AGX_TONE_MAPPING",[cy]:"NEUTRAL_TONE_MAPPING",[oy]:"CUSTOM_TONE_MAPPING"};function dC(t,e,n,i,a,s){const r=new $i(e,n,{type:t,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new mo(e,n):void 0}),o=new $i(e,n,{type:za,depthBuffer:!1,stencilBuffer:!1}),l=new Cn;l.setAttribute("position",new wi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new wi([0,2,0,0,2,0],2));const c=new rA({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),f=new Ri(l,c),h=new $m(-1,1,1,-1,0,1);let u=null,p=null,g=!1,b,v=null,d=[],x=!1;this.setSize=function(M,_){r.setSize(M,_),o.setSize(M,_);for(let A=0;A<d.length;A++){const R=d[A];R.setSize&&R.setSize(M,_)}},this.setEffects=function(M){d=M,x=d.length>0&&d[0].isRenderPass===!0;const _=r.width,A=r.height;for(let R=0;R<d.length;R++){const T=d[R];T.setSize&&T.setSize(_,A)}},this.begin=function(M,_){if(g||M.toneMapping===Ji&&d.length===0)return!1;if(v=_,_!==null){const A=_.width,R=_.height;(r.width!==A||r.height!==R)&&this.setSize(A,R)}return x===!1&&M.setRenderTarget(r),b=M.toneMapping,M.toneMapping=Ji,!0},this.hasRenderPass=function(){return x},this.end=function(M,_){M.toneMapping=b,g=!0;let A=r,R=o;for(let T=0;T<d.length;T++){const y=d[T];if(y.enabled!==!1&&(y.render(M,R,A,_),y.needsSwap!==!1)){const C=A;A=R,R=C}}if(u!==M.outputColorSpace||p!==M.toneMapping){u=M.outputColorSpace,p=M.toneMapping,c.defines={},ct.getTransfer(u)===Tt&&(c.defines.SRGB_TRANSFER="");const T=fC[p];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=A.texture,M.setRenderTarget(v),M.render(f,h),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Py=new In,Lp=new mo(1,1),zy=new _y,Iy=new PT,By=new Cy,wv=[],Cv=[],Rv=new Float32Array(16),Nv=new Float32Array(9),Dv=new Float32Array(4);function Co(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=wv[a];if(s===void 0&&(s=new Float32Array(a),wv[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function cn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function un(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Ef(t,e){let n=Cv[e];n===void 0&&(n=new Int32Array(e),Cv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function hC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function pC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2fv(this.addr,e),un(n,e)}}function mC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(cn(n,e))return;t.uniform3fv(this.addr,e),un(n,e)}}function gC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4fv(this.addr,e),un(n,e)}}function vC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Dv.set(i),t.uniformMatrix2fv(this.addr,!1,Dv),un(n,i)}}function _C(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Nv.set(i),t.uniformMatrix3fv(this.addr,!1,Nv),un(n,i)}}function xC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Rv.set(i),t.uniformMatrix4fv(this.addr,!1,Rv),un(n,i)}}function SC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function yC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2iv(this.addr,e),un(n,e)}}function MC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(cn(n,e))return;t.uniform3iv(this.addr,e),un(n,e)}}function bC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4iv(this.addr,e),un(n,e)}}function EC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function TC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2uiv(this.addr,e),un(n,e)}}function AC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(cn(n,e))return;t.uniform3uiv(this.addr,e),un(n,e)}}function wC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4uiv(this.addr,e),un(n,e)}}function CC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Lp.compareFunction=n.isReversedDepthBuffer()?Zm:Ym,s=Lp):s=Py,n.setTexture2D(e||s,a)}function RC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||Iy,a)}function NC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||By,a)}function DC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||zy,a)}function UC(t){switch(t){case 5126:return hC;case 35664:return pC;case 35665:return mC;case 35666:return gC;case 35674:return vC;case 35675:return _C;case 35676:return xC;case 5124:case 35670:return SC;case 35667:case 35671:return yC;case 35668:case 35672:return MC;case 35669:case 35673:return bC;case 5125:return EC;case 36294:return TC;case 36295:return AC;case 36296:return wC;case 35678:case 36198:case 36298:case 36306:case 35682:return CC;case 35679:case 36299:case 36307:return RC;case 35680:case 36300:case 36308:case 36293:return NC;case 36289:case 36303:case 36311:case 36292:return DC}}function LC(t,e){t.uniform1fv(this.addr,e)}function OC(t,e){const n=Co(e,this.size,2);t.uniform2fv(this.addr,n)}function PC(t,e){const n=Co(e,this.size,3);t.uniform3fv(this.addr,n)}function zC(t,e){const n=Co(e,this.size,4);t.uniform4fv(this.addr,n)}function IC(t,e){const n=Co(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function BC(t,e){const n=Co(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function FC(t,e){const n=Co(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function HC(t,e){t.uniform1iv(this.addr,e)}function GC(t,e){t.uniform2iv(this.addr,e)}function VC(t,e){t.uniform3iv(this.addr,e)}function kC(t,e){t.uniform4iv(this.addr,e)}function XC(t,e){t.uniform1uiv(this.addr,e)}function WC(t,e){t.uniform2uiv(this.addr,e)}function jC(t,e){t.uniform3uiv(this.addr,e)}function qC(t,e){t.uniform4uiv(this.addr,e)}function YC(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Lp:r=Py;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function ZC(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||Iy,s[r])}function KC(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||By,s[r])}function QC(t,e,n){const i=this.cache,a=e.length,s=Ef(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||zy,s[r])}function JC(t){switch(t){case 5126:return LC;case 35664:return OC;case 35665:return PC;case 35666:return zC;case 35674:return IC;case 35675:return BC;case 35676:return FC;case 5124:case 35670:return HC;case 35667:case 35671:return GC;case 35668:case 35672:return VC;case 35669:case 35673:return kC;case 5125:return XC;case 36294:return WC;case 36295:return jC;case 36296:return qC;case 35678:case 36198:case 36298:case 36306:case 35682:return YC;case 35679:case 36299:case 36307:return ZC;case 35680:case 36300:case 36308:case 36293:return KC;case 36289:case 36303:case 36311:case 36292:return QC}}class $C{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=UC(n.type)}}class eR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=JC(n.type)}}class tR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const Vd=/(\w+)(\])?(\[|\.)?/g;function Uv(t,e){t.seq.push(e),t.map[e.id]=e}function nR(t,e,n){const i=t.name,a=i.length;for(Vd.lastIndex=0;;){const s=Vd.exec(i),r=Vd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Uv(n,c===void 0?new $C(o,t,e):new eR(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new tR(o),Uv(n,h)),n=h}}}class pu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);nR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Lv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const iR=37297;let aR=0;function sR(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Ov=new je;function rR(t){ct._getMatrix(Ov,ct.workingColorSpace,t);const e=`mat3( ${Ov.elements.map(n=>n.toFixed(4))} )`;switch(ct.getTransfer(t)){case Zu:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Pv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+sR(t.getShaderSource(e),o)}else return s}function oR(t,e){const n=rR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const lR={[iy]:"Linear",[ay]:"Reinhard",[sy]:"Cineon",[ry]:"ACESFilmic",[ly]:"AgX",[cy]:"Neutral",[oy]:"Custom"};function cR(t,e){const n=lR[e];return n===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Xc=new q;function uR(){ct.getLuminanceCoefficients(Xc);const t=Xc.x.toFixed(4),e=Xc.y.toFixed(4),n=Xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function fR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nl).join(`
`)}function dR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function hR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function nl(t){return t!==""}function zv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Iv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const pR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Op(t){return t.replace(pR,gR)}const mR=new Map;function gR(t,e){let n=tt[e];if(n===void 0){const i=mR.get(e);if(i!==void 0)n=tt[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Op(n)}const vR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bv(t){return t.replace(vR,_R)}function _R(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Fv(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const xR={[ou]:"SHADOWMAP_TYPE_PCF",[tl]:"SHADOWMAP_TYPE_VSM"};function SR(t){return xR[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const yR={[Zs]:"ENVMAP_TYPE_CUBE",[po]:"ENVMAP_TYPE_CUBE",[yf]:"ENVMAP_TYPE_CUBE_UV"};function MR(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":yR[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const bR={[po]:"ENVMAP_MODE_REFRACTION"};function ER(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":bR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const TR={[ny]:"ENVMAP_BLENDING_MULTIPLY",[pT]:"ENVMAP_BLENDING_MIX",[mT]:"ENVMAP_BLENDING_ADD"};function AR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":TR[t.combine]||"ENVMAP_BLENDING_NONE"}function wR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function CR(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=SR(n),c=MR(n),f=ER(n),h=AR(n),u=wR(n),p=fR(n),g=dR(s),b=a.createProgram();let v,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(nl).join(`
`),v.length>0&&(v+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(nl).join(`
`),d.length>0&&(d+=`
`)):(v=[Fv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+f:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nl).join(`
`),d=[Fv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+f:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ji?"#define TONE_MAPPING":"",n.toneMapping!==Ji?tt.tonemapping_pars_fragment:"",n.toneMapping!==Ji?cR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,oR("linearToOutputTexel",n.outputColorSpace),uR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(nl).join(`
`)),r=Op(r),r=zv(r,n),r=Iv(r,n),o=Op(o),o=zv(o,n),o=Iv(o,n),r=Bv(r),o=Bv(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,v=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,d=["#define varying in",n.glslVersion===X0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===X0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=x+v+r,_=x+d+o,A=Lv(a,a.VERTEX_SHADER,M),R=Lv(a,a.FRAGMENT_SHADER,_);a.attachShader(b,A),a.attachShader(b,R),n.index0AttributeName!==void 0?a.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function T(D){if(t.debug.checkShaderErrors){const P=a.getProgramInfoLog(b)||"",G=a.getShaderInfoLog(A)||"",O=a.getShaderInfoLog(R)||"",z=P.trim(),B=G.trim(),I=O.trim();let U=!0,X=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(U=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,b,A,R);else{const oe=Pv(a,A,"vertex"),ce=Pv(a,R,"fragment");ht("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+z+`
`+oe+`
`+ce)}else z!==""?Fe("WebGLProgram: Program Info Log:",z):(B===""||I==="")&&(X=!1);X&&(D.diagnostics={runnable:U,programLog:z,vertexShader:{log:B,prefix:v},fragmentShader:{log:I,prefix:d}})}a.deleteShader(A),a.deleteShader(R),y=new pu(a,b),C=hR(a,b)}let y;this.getUniforms=function(){return y===void 0&&T(this),y};let C;this.getAttributes=function(){return C===void 0&&T(this),C};let w=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return w===!1&&(w=a.getProgramParameter(b,iR)),w},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=aR++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=A,this.fragmentShader=R,this}let RR=0;class NR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new DR(e),n.set(e,i)),i}}class DR{constructor(e){this.id=RR++,this.code=e,this.usedTimes=0}}function UR(t){return t===Ks||t===ju||t===qu}function LR(t,e,n,i,a,s){const r=new xy,o=new NR,l=new Set,c=[],f=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,C,w,D,P,G){const O=D.fog,z=P.geometry,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?D.environment:null,I=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,U=e.get(y.envMap||B,I),X=U&&U.mapping===yf?U.image.height:null,oe=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Fe("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const ce=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,xe=ce!==void 0?ce.length:0;let ke=0;z.morphAttributes.position!==void 0&&(ke=1),z.morphAttributes.normal!==void 0&&(ke=2),z.morphAttributes.color!==void 0&&(ke=3);let Ke,Be,se,_e;if(oe){const Ne=Wi[oe];Ke=Ne.vertexShader,Be=Ne.fragmentShader}else{Ke=y.vertexShader,Be=y.fragmentShader;const Ne=o.getVertexShaderStage(y),dt=o.getFragmentShaderStage(y);o.update(y,Ne,dt),se=Ne.id,_e=dt.id}const me=t.getRenderTarget(),Le=t.state.buffers.depth.getReversed(),ze=P.isInstancedMesh===!0,Ie=P.isBatchedMesh===!0,xt=!!y.map,We=!!y.matcap,lt=!!U,Ge=!!y.aoMap,qe=!!y.lightMap,Ct=!!y.bumpMap&&y.wireframe===!1,mt=!!y.normalMap,zt=!!y.displacementMap,Ot=!!y.emissiveMap,Rt=!!y.metalnessMap,ye=!!y.roughnessMap,H=y.anisotropy>0,nt=y.clearcoat>0,Ve=y.dispersion>0,N=y.iridescence>0,S=y.sheen>0,W=y.transmission>0,Y=H&&!!y.anisotropyMap,$=nt&&!!y.clearcoatMap,de=nt&&!!y.clearcoatNormalMap,ge=nt&&!!y.clearcoatRoughnessMap,ee=N&&!!y.iridescenceMap,j=N&&!!y.iridescenceThicknessMap,ne=S&&!!y.sheenColorMap,ue=S&&!!y.sheenRoughnessMap,L=!!y.specularMap,V=!!y.specularColorMap,he=!!y.specularIntensityMap,fe=W&&!!y.transmissionMap,Ce=W&&!!y.thicknessMap,F=!!y.gradientMap,pe=!!y.alphaMap,te=y.alphaTest>0,Q=!!y.alphaHash,ve=!!y.extensions;let re=Ji;y.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(re=t.toneMapping);const Re={shaderID:oe,shaderType:y.type,shaderName:y.name,vertexShader:Ke,fragmentShader:Be,defines:y.defines,customVertexShaderID:se,customFragmentShaderID:_e,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ie,batchingColor:Ie&&P._colorsTexture!==null,instancing:ze,instancingColor:ze&&P.instanceColor!==null,instancingMorph:ze&&P.morphTexture!==null,outputColorSpace:me===null?t.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:xt,matcap:We,envMap:lt,envMapMode:lt&&U.mapping,envMapCubeUVHeight:X,aoMap:Ge,lightMap:qe,bumpMap:Ct,normalMap:mt,displacementMap:zt,emissiveMap:Ot,normalMapObjectSpace:mt&&y.normalMapType===_T,normalMapTangentSpace:mt&&y.normalMapType===G0,packedNormalMap:mt&&y.normalMapType===G0&&UR(y.normalMap.format),metalnessMap:Rt,roughnessMap:ye,anisotropy:H,anisotropyMap:Y,clearcoat:nt,clearcoatMap:$,clearcoatNormalMap:de,clearcoatRoughnessMap:ge,dispersion:Ve,iridescence:N,iridescenceMap:ee,iridescenceThicknessMap:j,sheen:S,sheenColorMap:ne,sheenRoughnessMap:ue,specularMap:L,specularColorMap:V,specularIntensityMap:he,transmission:W,transmissionMap:fe,thicknessMap:Ce,gradientMap:F,opaque:y.transparent===!1&&y.blending===ks&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:te,alphaHash:Q,combine:y.combine,mapUv:xt&&g(y.map.channel),aoMapUv:Ge&&g(y.aoMap.channel),lightMapUv:qe&&g(y.lightMap.channel),bumpMapUv:Ct&&g(y.bumpMap.channel),normalMapUv:mt&&g(y.normalMap.channel),displacementMapUv:zt&&g(y.displacementMap.channel),emissiveMapUv:Ot&&g(y.emissiveMap.channel),metalnessMapUv:Rt&&g(y.metalnessMap.channel),roughnessMapUv:ye&&g(y.roughnessMap.channel),anisotropyMapUv:Y&&g(y.anisotropyMap.channel),clearcoatMapUv:$&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:j&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&g(y.sheenRoughnessMap.channel),specularMapUv:L&&g(y.specularMap.channel),specularColorMapUv:V&&g(y.specularColorMap.channel),specularIntensityMapUv:he&&g(y.specularIntensityMap.channel),transmissionMapUv:fe&&g(y.transmissionMap.channel),thicknessMapUv:Ce&&g(y.thicknessMap.channel),alphaMapUv:pe&&g(y.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(mt||H),vertexNormals:!!z.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!z.attributes.uv&&(xt||pe),fog:!!O,useFog:y.fog===!0,fogExp2:!!O&&O.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||z.attributes.normal===void 0&&mt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Le,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:z.attributes.position!==void 0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:ke,numDirLights:C.directional.length,numPointLights:C.point.length,numSpotLights:C.spot.length,numSpotLightMaps:C.spotLightMap.length,numRectAreaLights:C.rectArea.length,numHemiLights:C.hemi.length,numDirLightShadows:C.directionalShadowMap.length,numPointLightShadows:C.pointShadowMap.length,numSpotLightShadows:C.spotShadowMap.length,numSpotLightShadowsWithMaps:C.numSpotLightShadowsWithMaps,numLightProbes:C.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&w.length>0,shadowMapType:t.shadowMap.type,toneMapping:re,decodeVideoTexture:xt&&y.map.isVideoTexture===!0&&ct.getTransfer(y.map.colorSpace)===Tt,decodeVideoTextureEmissive:Ot&&y.emissiveMap.isVideoTexture===!0&&ct.getTransfer(y.emissiveMap.colorSpace)===Tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===ya,flipSided:y.side===Yn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ve&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&y.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function v(y){const C=[];if(y.shaderID?C.push(y.shaderID):(C.push(y.customVertexShaderID),C.push(y.customFragmentShaderID)),y.defines!==void 0)for(const w in y.defines)C.push(w),C.push(y.defines[w]);return y.isRawShaderMaterial===!1&&(d(C,y),x(C,y),C.push(t.outputColorSpace)),C.push(y.customProgramCacheKey),C.join()}function d(y,C){y.push(C.precision),y.push(C.outputColorSpace),y.push(C.envMapMode),y.push(C.envMapCubeUVHeight),y.push(C.mapUv),y.push(C.alphaMapUv),y.push(C.lightMapUv),y.push(C.aoMapUv),y.push(C.bumpMapUv),y.push(C.normalMapUv),y.push(C.displacementMapUv),y.push(C.emissiveMapUv),y.push(C.metalnessMapUv),y.push(C.roughnessMapUv),y.push(C.anisotropyMapUv),y.push(C.clearcoatMapUv),y.push(C.clearcoatNormalMapUv),y.push(C.clearcoatRoughnessMapUv),y.push(C.iridescenceMapUv),y.push(C.iridescenceThicknessMapUv),y.push(C.sheenColorMapUv),y.push(C.sheenRoughnessMapUv),y.push(C.specularMapUv),y.push(C.specularColorMapUv),y.push(C.specularIntensityMapUv),y.push(C.transmissionMapUv),y.push(C.thicknessMapUv),y.push(C.combine),y.push(C.fogExp2),y.push(C.sizeAttenuation),y.push(C.morphTargetsCount),y.push(C.morphAttributeCount),y.push(C.numDirLights),y.push(C.numPointLights),y.push(C.numSpotLights),y.push(C.numSpotLightMaps),y.push(C.numHemiLights),y.push(C.numRectAreaLights),y.push(C.numDirLightShadows),y.push(C.numPointLightShadows),y.push(C.numSpotLightShadows),y.push(C.numSpotLightShadowsWithMaps),y.push(C.numLightProbes),y.push(C.shadowMapType),y.push(C.toneMapping),y.push(C.numClippingPlanes),y.push(C.numClipIntersection),y.push(C.depthPacking)}function x(y,C){r.disableAll(),C.instancing&&r.enable(0),C.instancingColor&&r.enable(1),C.instancingMorph&&r.enable(2),C.matcap&&r.enable(3),C.envMap&&r.enable(4),C.normalMapObjectSpace&&r.enable(5),C.normalMapTangentSpace&&r.enable(6),C.clearcoat&&r.enable(7),C.iridescence&&r.enable(8),C.alphaTest&&r.enable(9),C.vertexColors&&r.enable(10),C.vertexAlphas&&r.enable(11),C.vertexUv1s&&r.enable(12),C.vertexUv2s&&r.enable(13),C.vertexUv3s&&r.enable(14),C.vertexTangents&&r.enable(15),C.anisotropy&&r.enable(16),C.alphaHash&&r.enable(17),C.batching&&r.enable(18),C.dispersion&&r.enable(19),C.batchingColor&&r.enable(20),C.gradientMap&&r.enable(21),C.packedNormalMap&&r.enable(22),C.vertexNormals&&r.enable(23),y.push(r.mask),r.disableAll(),C.fog&&r.enable(0),C.useFog&&r.enable(1),C.flatShading&&r.enable(2),C.logarithmicDepthBuffer&&r.enable(3),C.reversedDepthBuffer&&r.enable(4),C.skinning&&r.enable(5),C.morphTargets&&r.enable(6),C.morphNormals&&r.enable(7),C.morphColors&&r.enable(8),C.premultipliedAlpha&&r.enable(9),C.shadowMapEnabled&&r.enable(10),C.doubleSided&&r.enable(11),C.flipSided&&r.enable(12),C.useDepthPacking&&r.enable(13),C.dithering&&r.enable(14),C.transmission&&r.enable(15),C.sheen&&r.enable(16),C.opaque&&r.enable(17),C.pointsUvs&&r.enable(18),C.decodeVideoTexture&&r.enable(19),C.decodeVideoTextureEmissive&&r.enable(20),C.alphaToCoverage&&r.enable(21),C.numLightProbeGrids>0&&r.enable(22),C.hasPositionAttribute&&r.enable(23),y.push(r.mask)}function M(y){const C=p[y.type];let w;if(C){const D=Wi[C];w=iA.clone(D.uniforms)}else w=y.uniforms;return w}function _(y,C){let w=f.get(C);return w!==void 0?++w.usedTimes:(w=new CR(t,C,y,a),c.push(w),f.set(C,w)),w}function A(y){if(--y.usedTimes===0){const C=c.indexOf(y);c[C]=c[c.length-1],c.pop(),f.delete(y.cacheKey),y.destroy()}}function R(y){o.remove(y)}function T(){o.dispose()}return{getParameters:b,getProgramCacheKey:v,getUniforms:M,acquireProgram:_,releaseProgram:A,releaseShaderCache:R,programs:c,dispose:T}}function OR(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function PR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Hv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Gv(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,b,v,d){let x=t[e];return x===void 0?(x={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:v,group:d},t[e]=x):(x.id=u.id,x.object=u,x.geometry=p,x.material=g,x.materialVariant=r(u),x.groupOrder=b,x.renderOrder=u.renderOrder,x.z=v,x.group=d),e++,x}function l(u,p,g,b,v,d){const x=o(u,p,g,b,v,d);g.transmission>0?i.push(x):g.transparent===!0?a.push(x):n.push(x)}function c(u,p,g,b,v,d){const x=o(u,p,g,b,v,d);g.transmission>0?i.unshift(x):g.transparent===!0?a.unshift(x):n.unshift(x)}function f(u,p,g){n.length>1&&n.sort(u||PR),i.length>1&&i.sort(p||Hv),a.length>1&&a.sort(p||Hv),g&&(n.reverse(),i.reverse(),a.reverse())}function h(){for(let u=e,p=t.length;u<p;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:h,sort:f}}function zR(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new Gv,t.set(i,[r])):a>=s.length?(r=new Gv,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function IR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new q,color:new rt};break;case"SpotLight":n={position:new q,direction:new q,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new q,color:new rt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new q,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":n={color:new rt,position:new q,halfWidth:new q,halfHeight:new q};break}return t[e.id]=n,n}}}function BR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let FR=0;function HR(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function GR(t){const e=new IR,n=BR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const a=new q,s=new Bt,r=new Bt;function o(c){let f=0,h=0,u=0;for(let C=0;C<9;C++)i.probe[C].set(0,0,0);let p=0,g=0,b=0,v=0,d=0,x=0,M=0,_=0,A=0,R=0,T=0;c.sort(HR);for(let C=0,w=c.length;C<w;C++){const D=c[C],P=D.color,G=D.intensity,O=D.distance;let z=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Ks?z=D.shadow.map.texture:z=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)f+=P.r*G,h+=P.g*G,u+=P.b*G;else if(D.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(D.sh.coefficients[B],G);T++}else if(D.isDirectionalLight){const B=e.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){const I=D.shadow,U=n.get(D);U.shadowIntensity=I.intensity,U.shadowBias=I.bias,U.shadowNormalBias=I.normalBias,U.shadowRadius=I.radius,U.shadowMapSize=I.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=z,i.directionalShadowMatrix[p]=D.shadow.matrix,x++}i.directional[p]=B,p++}else if(D.isSpotLight){const B=e.get(D);B.position.setFromMatrixPosition(D.matrixWorld),B.color.copy(P).multiplyScalar(G),B.distance=O,B.coneCos=Math.cos(D.angle),B.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),B.decay=D.decay,i.spot[b]=B;const I=D.shadow;if(D.map&&(i.spotLightMap[A]=D.map,A++,I.updateMatrices(D),D.castShadow&&R++),i.spotLightMatrix[b]=I.matrix,D.castShadow){const U=n.get(D);U.shadowIntensity=I.intensity,U.shadowBias=I.bias,U.shadowNormalBias=I.normalBias,U.shadowRadius=I.radius,U.shadowMapSize=I.mapSize,i.spotShadow[b]=U,i.spotShadowMap[b]=z,_++}b++}else if(D.isRectAreaLight){const B=e.get(D);B.color.copy(P).multiplyScalar(G),B.halfWidth.set(D.width*.5,0,0),B.halfHeight.set(0,D.height*.5,0),i.rectArea[v]=B,v++}else if(D.isPointLight){const B=e.get(D);if(B.color.copy(D.color).multiplyScalar(D.intensity),B.distance=D.distance,B.decay=D.decay,D.castShadow){const I=D.shadow,U=n.get(D);U.shadowIntensity=I.intensity,U.shadowBias=I.bias,U.shadowNormalBias=I.normalBias,U.shadowRadius=I.radius,U.shadowMapSize=I.mapSize,U.shadowCameraNear=I.camera.near,U.shadowCameraFar=I.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=D.shadow.matrix,M++}i.point[g]=B,g++}else if(D.isHemisphereLight){const B=e.get(D);B.skyColor.copy(D.color).multiplyScalar(G),B.groundColor.copy(D.groundColor).multiplyScalar(G),i.hemi[d]=B,d++}}v>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=f,i.ambient[1]=h,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==p||y.pointLength!==g||y.spotLength!==b||y.rectAreaLength!==v||y.hemiLength!==d||y.numDirectionalShadows!==x||y.numPointShadows!==M||y.numSpotShadows!==_||y.numSpotMaps!==A||y.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=v,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=_+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=T,y.directionalLength=p,y.pointLength=g,y.spotLength=b,y.rectAreaLength=v,y.hemiLength=d,y.numDirectionalShadows=x,y.numPointShadows=M,y.numSpotShadows=_,y.numSpotMaps=A,y.numLightProbes=T,i.version=FR++)}function l(c,f){let h=0,u=0,p=0,g=0,b=0;const v=f.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const M=c[d];if(M.isDirectionalLight){const _=i.directional[h];_.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(v),h++}else if(M.isSpotLight){const _=i.spot[p];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(v),_.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(v),p++}else if(M.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(v),r.identity(),s.copy(M.matrixWorld),s.premultiply(v),r.extractRotation(s),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const _=i.point[u];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(v),u++}else if(M.isHemisphereLight){const _=i.hemi[b];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(v),b++}}}return{setup:o,setupView:l,state:i}}function Vv(t){const e=new GR(t),n=[],i=[],a=[];function s(u){h.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){e.setup(n)}function f(u){e.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:f,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function VR(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Vv(t),e.set(a,[o])):s>=r.length?(o=new Vv(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const kR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,XR=`uniform sampler2D shadow_pass;
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
}`,WR=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],jR=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],kv=new Bt,Zo=new q,kd=new q;function qR(t,e,n){let i=new Ay;const a=new _t,s=new _t,r=new Zt,o=new oA,l=new lA,c={},f=n.maxTextureSize,h={[xs]:Yn,[Yn]:xs,[ya]:ya},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:kR,fragmentShader:XR}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Cn;g.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ri(g,u),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ou;let d=this.type;this.render=function(R,T,y){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||R.length===0)return;this.type===ZE&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=ou);const C=t.getRenderTarget(),w=t.getActiveCubeFace(),D=t.getActiveMipmapLevel(),P=t.state;P.setBlending(Ra),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const G=d!==this.type;G&&T.traverse(function(O){O.material&&(Array.isArray(O.material)?O.material.forEach(z=>z.needsUpdate=!0):O.material.needsUpdate=!0)});for(let O=0,z=R.length;O<z;O++){const B=R[O],I=B.shadow;if(I===void 0){Fe("WebGLShadowMap:",B,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;a.copy(I.mapSize);const U=I.getFrameExtents();a.multiply(U),s.copy(I.mapSize),(a.x>f||a.y>f)&&(a.x>f&&(s.x=Math.floor(f/U.x),a.x=s.x*U.x,I.mapSize.x=s.x),a.y>f&&(s.y=Math.floor(f/U.y),a.y=s.y*U.y,I.mapSize.y=s.y));const X=t.state.buffers.depth.getReversed();if(I.camera._reversedDepth=X,I.map===null||G===!0){if(I.map!==null&&(I.map.depthTexture!==null&&(I.map.depthTexture.dispose(),I.map.depthTexture=null),I.map.dispose()),this.type===tl){if(B.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}I.map=new $i(a.x,a.y,{format:Ks,type:za,minFilter:wn,magFilter:wn,generateMipmaps:!1}),I.map.texture.name=B.name+".shadowMap",I.map.depthTexture=new mo(a.x,a.y,zi),I.map.depthTexture.name=B.name+".shadowMapDepth",I.map.depthTexture.format=Ia,I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=Mn,I.map.depthTexture.magFilter=Mn}else B.isPointLight?(I.map=new Oy(a.x),I.map.depthTexture=new eA(a.x,ea)):(I.map=new $i(a.x,a.y),I.map.depthTexture=new mo(a.x,a.y,ea)),I.map.depthTexture.name=B.name+".shadowMap",I.map.depthTexture.format=Ia,this.type===ou?(I.map.depthTexture.compareFunction=X?Zm:Ym,I.map.depthTexture.minFilter=wn,I.map.depthTexture.magFilter=wn):(I.map.depthTexture.compareFunction=null,I.map.depthTexture.minFilter=Mn,I.map.depthTexture.magFilter=Mn);I.camera.updateProjectionMatrix()}const oe=I.map.isWebGLCubeRenderTarget?6:1;for(let ce=0;ce<oe;ce++){if(I.map.isWebGLCubeRenderTarget)t.setRenderTarget(I.map,ce),t.clear();else{ce===0&&(t.setRenderTarget(I.map),t.clear());const xe=I.getViewport(ce);r.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),P.viewport(r)}if(B.isPointLight){const xe=I.camera,ke=I.matrix,Ke=B.distance||xe.far;Ke!==xe.far&&(xe.far=Ke,xe.updateProjectionMatrix()),Zo.setFromMatrixPosition(B.matrixWorld),xe.position.copy(Zo),kd.copy(xe.position),kd.add(WR[ce]),xe.up.copy(jR[ce]),xe.lookAt(kd),xe.updateMatrixWorld(),ke.makeTranslation(-Zo.x,-Zo.y,-Zo.z),kv.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),I._frustum.setFromProjectionMatrix(kv,xe.coordinateSystem,xe.reversedDepth)}else I.updateMatrices(B);i=I.getFrustum(),_(T,y,I.camera,B,this.type)}I.isPointLightShadow!==!0&&this.type===tl&&x(I,y),I.needsUpdate=!1}d=this.type,v.needsUpdate=!1,t.setRenderTarget(C,w,D)};function x(R,T){const y=e.update(b);u.defines.VSM_SAMPLES!==R.blurSamples&&(u.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new $i(a.x,a.y,{format:Ks,type:za})),u.uniforms.shadow_pass.value=R.map.depthTexture,u.uniforms.resolution.value=R.mapSize,u.uniforms.radius.value=R.radius,t.setRenderTarget(R.mapPass),t.clear(),t.renderBufferDirect(T,null,y,u,b,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,t.setRenderTarget(R.map),t.clear(),t.renderBufferDirect(T,null,y,p,b,null)}function M(R,T,y,C){let w=null;const D=y.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)w=D;else if(w=y.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const P=w.uuid,G=T.uuid;let O=c[P];O===void 0&&(O={},c[P]=O);let z=O[G];z===void 0&&(z=w.clone(),O[G]=z,T.addEventListener("dispose",A)),w=z}if(w.visible=T.visible,w.wireframe=T.wireframe,C===tl?w.side=T.shadowSide!==null?T.shadowSide:T.side:w.side=T.shadowSide!==null?T.shadowSide:h[T.side],w.alphaMap=T.alphaMap,w.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,w.map=T.map,w.clipShadows=T.clipShadows,w.clippingPlanes=T.clippingPlanes,w.clipIntersection=T.clipIntersection,w.displacementMap=T.displacementMap,w.displacementScale=T.displacementScale,w.displacementBias=T.displacementBias,w.wireframeLinewidth=T.wireframeLinewidth,w.linewidth=T.linewidth,y.isPointLight===!0&&w.isMeshDistanceMaterial===!0){const P=t.properties.get(w);P.light=y}return w}function _(R,T,y,C,w){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&w===tl)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,R.matrixWorld);const G=e.update(R),O=R.material;if(Array.isArray(O)){const z=G.groups;for(let B=0,I=z.length;B<I;B++){const U=z[B],X=O[U.materialIndex];if(X&&X.visible){const oe=M(R,X,C,w);R.onBeforeShadow(t,R,T,y,G,oe,U),t.renderBufferDirect(y,null,G,oe,R,U),R.onAfterShadow(t,R,T,y,G,oe,U)}}}else if(O.visible){const z=M(R,O,C,w);R.onBeforeShadow(t,R,T,y,G,z,null),t.renderBufferDirect(y,null,G,z,R,null),R.onAfterShadow(t,R,T,y,G,z,null)}}const P=R.children;for(let G=0,O=P.length;G<O;G++)_(P[G],T,y,C,w)}function A(R){R.target.removeEventListener("dispose",A);for(const y in c){const C=c[y],w=R.target.uuid;w in C&&(C[w].dispose(),delete C[w])}}}function YR(t,e){function n(){let F=!1;const pe=new Zt;let te=null;const Q=new Zt(0,0,0,0);return{setMask:function(ve){te!==ve&&!F&&(t.colorMask(ve,ve,ve,ve),te=ve)},setLocked:function(ve){F=ve},setClear:function(ve,re,Re,Ne,dt){dt===!0&&(ve*=Ne,re*=Ne,Re*=Ne),pe.set(ve,re,Re,Ne),Q.equals(pe)===!1&&(t.clearColor(ve,re,Re,Ne),Q.copy(pe))},reset:function(){F=!1,te=null,Q.set(-1,0,0,0)}}}function i(){let F=!1,pe=!1,te=null,Q=null,ve=null;return{setReversed:function(re){if(pe!==re){const Re=e.get("EXT_clip_control");re?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),pe=re;const Ne=ve;ve=null,this.setClear(Ne)}},getReversed:function(){return pe},setTest:function(re){re?me(t.DEPTH_TEST):Le(t.DEPTH_TEST)},setMask:function(re){te!==re&&!F&&(t.depthMask(re),te=re)},setFunc:function(re){if(pe&&(re=CT[re]),Q!==re){switch(re){case Wh:t.depthFunc(t.NEVER);break;case jh:t.depthFunc(t.ALWAYS);break;case qh:t.depthFunc(t.LESS);break;case ho:t.depthFunc(t.LEQUAL);break;case Yh:t.depthFunc(t.EQUAL);break;case Zh:t.depthFunc(t.GEQUAL);break;case Kh:t.depthFunc(t.GREATER);break;case Qh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Q=re}},setLocked:function(re){F=re},setClear:function(re){ve!==re&&(ve=re,pe&&(re=1-re),t.clearDepth(re))},reset:function(){F=!1,te=null,Q=null,ve=null,pe=!1}}}function a(){let F=!1,pe=null,te=null,Q=null,ve=null,re=null,Re=null,Ne=null,dt=null;return{setTest:function(Nt){F||(Nt?me(t.STENCIL_TEST):Le(t.STENCIL_TEST))},setMask:function(Nt){pe!==Nt&&!F&&(t.stencilMask(Nt),pe=Nt)},setFunc:function(Nt,Rn,Nn){(te!==Nt||Q!==Rn||ve!==Nn)&&(t.stencilFunc(Nt,Rn,Nn),te=Nt,Q=Rn,ve=Nn)},setOp:function(Nt,Rn,Nn){(re!==Nt||Re!==Rn||Ne!==Nn)&&(t.stencilOp(Nt,Rn,Nn),re=Nt,Re=Rn,Ne=Nn)},setLocked:function(Nt){F=Nt},setClear:function(Nt){dt!==Nt&&(t.clearStencil(Nt),dt=Nt)},reset:function(){F=!1,pe=null,te=null,Q=null,ve=null,re=null,Re=null,Ne=null,dt=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let f={},h={},u={},p=new WeakMap,g=[],b=null,v=!1,d=null,x=null,M=null,_=null,A=null,R=null,T=null,y=new rt(0,0,0),C=0,w=!1,D=null,P=null,G=null,O=null,z=null;const B=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let I=!1,U=0;const X=t.getParameter(t.VERSION);X.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(X)[1]),I=U>=1):X.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),I=U>=2);let oe=null,ce={};const xe=t.getParameter(t.SCISSOR_BOX),ke=t.getParameter(t.VIEWPORT),Ke=new Zt().fromArray(xe),Be=new Zt().fromArray(ke);function se(F,pe,te,Q){const ve=new Uint8Array(4),re=t.createTexture();t.bindTexture(F,re),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Re=0;Re<te;Re++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(pe,0,t.RGBA,1,1,Q,0,t.RGBA,t.UNSIGNED_BYTE,ve):t.texImage2D(pe+Re,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ve);return re}const _e={};_e[t.TEXTURE_2D]=se(t.TEXTURE_2D,t.TEXTURE_2D,1),_e[t.TEXTURE_CUBE_MAP]=se(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[t.TEXTURE_2D_ARRAY]=se(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),_e[t.TEXTURE_3D]=se(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),me(t.DEPTH_TEST),r.setFunc(ho),Ct(!1),mt(B0),me(t.CULL_FACE),Ge(Ra);function me(F){f[F]!==!0&&(t.enable(F),f[F]=!0)}function Le(F){f[F]!==!1&&(t.disable(F),f[F]=!1)}function ze(F,pe){return u[F]!==pe?(t.bindFramebuffer(F,pe),u[F]=pe,F===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=pe),F===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=pe),!0):!1}function Ie(F,pe){let te=g,Q=!1;if(F){te=p.get(pe),te===void 0&&(te=[],p.set(pe,te));const ve=F.textures;if(te.length!==ve.length||te[0]!==t.COLOR_ATTACHMENT0){for(let re=0,Re=ve.length;re<Re;re++)te[re]=t.COLOR_ATTACHMENT0+re;te.length=ve.length,Q=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,Q=!0);Q&&t.drawBuffers(te)}function xt(F){return b!==F?(t.useProgram(F),b=F,!0):!1}const We={[Os]:t.FUNC_ADD,[QE]:t.FUNC_SUBTRACT,[JE]:t.FUNC_REVERSE_SUBTRACT};We[$E]=t.MIN,We[eT]=t.MAX;const lt={[tT]:t.ZERO,[nT]:t.ONE,[iT]:t.SRC_COLOR,[kh]:t.SRC_ALPHA,[cT]:t.SRC_ALPHA_SATURATE,[oT]:t.DST_COLOR,[sT]:t.DST_ALPHA,[aT]:t.ONE_MINUS_SRC_COLOR,[Xh]:t.ONE_MINUS_SRC_ALPHA,[lT]:t.ONE_MINUS_DST_COLOR,[rT]:t.ONE_MINUS_DST_ALPHA,[uT]:t.CONSTANT_COLOR,[fT]:t.ONE_MINUS_CONSTANT_COLOR,[dT]:t.CONSTANT_ALPHA,[hT]:t.ONE_MINUS_CONSTANT_ALPHA};function Ge(F,pe,te,Q,ve,re,Re,Ne,dt,Nt){if(F===Ra){v===!0&&(Le(t.BLEND),v=!1);return}if(v===!1&&(me(t.BLEND),v=!0),F!==KE){if(F!==d||Nt!==w){if((x!==Os||A!==Os)&&(t.blendEquation(t.FUNC_ADD),x=Os,A=Os),Nt)switch(F){case ks:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case kr:t.blendFunc(t.ONE,t.ONE);break;case F0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case H0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:ht("WebGLState: Invalid blending: ",F);break}else switch(F){case ks:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case kr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case F0:ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case H0:ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ht("WebGLState: Invalid blending: ",F);break}M=null,_=null,R=null,T=null,y.set(0,0,0),C=0,d=F,w=Nt}return}ve=ve||pe,re=re||te,Re=Re||Q,(pe!==x||ve!==A)&&(t.blendEquationSeparate(We[pe],We[ve]),x=pe,A=ve),(te!==M||Q!==_||re!==R||Re!==T)&&(t.blendFuncSeparate(lt[te],lt[Q],lt[re],lt[Re]),M=te,_=Q,R=re,T=Re),(Ne.equals(y)===!1||dt!==C)&&(t.blendColor(Ne.r,Ne.g,Ne.b,dt),y.copy(Ne),C=dt),d=F,w=!1}function qe(F,pe){F.side===ya?Le(t.CULL_FACE):me(t.CULL_FACE);let te=F.side===Yn;pe&&(te=!te),Ct(te),F.blending===ks&&F.transparent===!1?Ge(Ra):Ge(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const Q=F.stencilWrite;o.setTest(Q),Q&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ot(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?me(t.SAMPLE_ALPHA_TO_COVERAGE):Le(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(F){D!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),D=F)}function mt(F){F!==qE?(me(t.CULL_FACE),F!==P&&(F===B0?t.cullFace(t.BACK):F===YE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Le(t.CULL_FACE),P=F}function zt(F){F!==G&&(I&&t.lineWidth(F),G=F)}function Ot(F,pe,te){F?(me(t.POLYGON_OFFSET_FILL),(O!==pe||z!==te)&&(O=pe,z=te,r.getReversed()&&(pe=-pe),t.polygonOffset(pe,te))):Le(t.POLYGON_OFFSET_FILL)}function Rt(F){F?me(t.SCISSOR_TEST):Le(t.SCISSOR_TEST)}function ye(F){F===void 0&&(F=t.TEXTURE0+B-1),oe!==F&&(t.activeTexture(F),oe=F)}function H(F,pe,te){te===void 0&&(oe===null?te=t.TEXTURE0+B-1:te=oe);let Q=ce[te];Q===void 0&&(Q={type:void 0,texture:void 0},ce[te]=Q),(Q.type!==F||Q.texture!==pe)&&(oe!==te&&(t.activeTexture(te),oe=te),t.bindTexture(F,pe||_e[F]),Q.type=F,Q.texture=pe)}function nt(){const F=ce[oe];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Ve(){try{t.compressedTexImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function N(){try{t.compressedTexImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function S(){try{t.texSubImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function W(){try{t.texSubImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function Y(){try{t.compressedTexSubImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function $(){try{t.compressedTexSubImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function de(){try{t.texStorage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function ge(){try{t.texStorage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function ee(){try{t.texImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function j(){try{t.texImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function ne(F){return h[F]!==void 0?h[F]:t.getParameter(F)}function ue(F,pe){h[F]!==pe&&(t.pixelStorei(F,pe),h[F]=pe)}function L(F){Ke.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),Ke.copy(F))}function V(F){Be.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),Be.copy(F))}function he(F,pe){let te=c.get(pe);te===void 0&&(te=new WeakMap,c.set(pe,te));let Q=te.get(F);Q===void 0&&(Q=t.getUniformBlockIndex(pe,F.name),te.set(F,Q))}function fe(F,pe){const Q=c.get(pe).get(F);l.get(pe)!==Q&&(t.uniformBlockBinding(pe,Q,F.__bindingPointIndex),l.set(pe,Q))}function Ce(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),f={},h={},oe=null,ce={},u={},p=new WeakMap,g=[],b=null,v=!1,d=null,x=null,M=null,_=null,A=null,R=null,T=null,y=new rt(0,0,0),C=0,w=!1,D=null,P=null,G=null,O=null,z=null,Ke.set(0,0,t.canvas.width,t.canvas.height),Be.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:me,disable:Le,bindFramebuffer:ze,drawBuffers:Ie,useProgram:xt,setBlending:Ge,setMaterial:qe,setFlipSided:Ct,setCullFace:mt,setLineWidth:zt,setPolygonOffset:Ot,setScissorTest:Rt,activeTexture:ye,bindTexture:H,unbindTexture:nt,compressedTexImage2D:Ve,compressedTexImage3D:N,texImage2D:ee,texImage3D:j,pixelStorei:ue,getParameter:ne,updateUBOMapping:he,uniformBlockBinding:fe,texStorage2D:de,texStorage3D:ge,texSubImage2D:S,texSubImage3D:W,compressedTexSubImage2D:Y,compressedTexSubImage3D:$,scissor:L,viewport:V,reset:Ce}}function ZR(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,f=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(N,S){return g?new OffscreenCanvas(N,S):Qu("canvas")}function v(N,S,W){let Y=1;const $=Ve(N);if(($.width>W||$.height>W)&&(Y=W/Math.max($.width,$.height)),Y<1)if(typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&N instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&N instanceof ImageBitmap||typeof VideoFrame<"u"&&N instanceof VideoFrame){const de=Math.floor(Y*$.width),ge=Math.floor(Y*$.height);u===void 0&&(u=b(de,ge));const ee=S?b(de,ge):u;return ee.width=de,ee.height=ge,ee.getContext("2d").drawImage(N,0,0,de,ge),Fe("WebGLRenderer: Texture has been resized from ("+$.width+"x"+$.height+") to ("+de+"x"+ge+")."),ee}else return"data"in N&&Fe("WebGLRenderer: Image in DataTexture is too big ("+$.width+"x"+$.height+")."),N;return N}function d(N){return N.generateMipmaps}function x(N){t.generateMipmap(N)}function M(N){return N.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:N.isWebGL3DRenderTarget?t.TEXTURE_3D:N.isWebGLArrayRenderTarget||N.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function _(N,S,W,Y,$,de=!1){if(N!==null){if(t[N]!==void 0)return t[N];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+N+"'")}let ge;Y&&(ge=e.get("EXT_texture_norm16"),ge||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=S;if(S===t.RED&&(W===t.FLOAT&&(ee=t.R32F),W===t.HALF_FLOAT&&(ee=t.R16F),W===t.UNSIGNED_BYTE&&(ee=t.R8),W===t.UNSIGNED_SHORT&&ge&&(ee=ge.R16_EXT),W===t.SHORT&&ge&&(ee=ge.R16_SNORM_EXT)),S===t.RED_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.R8UI),W===t.UNSIGNED_SHORT&&(ee=t.R16UI),W===t.UNSIGNED_INT&&(ee=t.R32UI),W===t.BYTE&&(ee=t.R8I),W===t.SHORT&&(ee=t.R16I),W===t.INT&&(ee=t.R32I)),S===t.RG&&(W===t.FLOAT&&(ee=t.RG32F),W===t.HALF_FLOAT&&(ee=t.RG16F),W===t.UNSIGNED_BYTE&&(ee=t.RG8),W===t.UNSIGNED_SHORT&&ge&&(ee=ge.RG16_EXT),W===t.SHORT&&ge&&(ee=ge.RG16_SNORM_EXT)),S===t.RG_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.RG8UI),W===t.UNSIGNED_SHORT&&(ee=t.RG16UI),W===t.UNSIGNED_INT&&(ee=t.RG32UI),W===t.BYTE&&(ee=t.RG8I),W===t.SHORT&&(ee=t.RG16I),W===t.INT&&(ee=t.RG32I)),S===t.RGB_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),W===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),W===t.UNSIGNED_INT&&(ee=t.RGB32UI),W===t.BYTE&&(ee=t.RGB8I),W===t.SHORT&&(ee=t.RGB16I),W===t.INT&&(ee=t.RGB32I)),S===t.RGBA_INTEGER&&(W===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),W===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),W===t.UNSIGNED_INT&&(ee=t.RGBA32UI),W===t.BYTE&&(ee=t.RGBA8I),W===t.SHORT&&(ee=t.RGBA16I),W===t.INT&&(ee=t.RGBA32I)),S===t.RGB&&(W===t.UNSIGNED_SHORT&&ge&&(ee=ge.RGB16_EXT),W===t.SHORT&&ge&&(ee=ge.RGB16_SNORM_EXT),W===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),W===t.UNSIGNED_INT_10F_11F_11F_REV&&(ee=t.R11F_G11F_B10F)),S===t.RGBA){const j=de?Zu:ct.getTransfer($);W===t.FLOAT&&(ee=t.RGBA32F),W===t.HALF_FLOAT&&(ee=t.RGBA16F),W===t.UNSIGNED_BYTE&&(ee=j===Tt?t.SRGB8_ALPHA8:t.RGBA8),W===t.UNSIGNED_SHORT&&ge&&(ee=ge.RGBA16_EXT),W===t.SHORT&&ge&&(ee=ge.RGBA16_SNORM_EXT),W===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),W===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function A(N,S){let W;return N?S===null||S===ea||S===Ol?W=t.DEPTH24_STENCIL8:S===zi?W=t.DEPTH32F_STENCIL8:S===Ll&&(W=t.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ea||S===Ol?W=t.DEPTH_COMPONENT24:S===zi?W=t.DEPTH_COMPONENT32F:S===Ll&&(W=t.DEPTH_COMPONENT16),W}function R(N,S){return d(N)===!0||N.isFramebufferTexture&&N.minFilter!==Mn&&N.minFilter!==wn?Math.log2(Math.max(S.width,S.height))+1:N.mipmaps!==void 0&&N.mipmaps.length>0?N.mipmaps.length:N.isCompressedTexture&&Array.isArray(N.image)?S.mipmaps.length:1}function T(N){const S=N.target;S.removeEventListener("dispose",T),C(S),S.isVideoTexture&&f.delete(S),S.isHTMLTexture&&h.delete(S)}function y(N){const S=N.target;S.removeEventListener("dispose",y),D(S)}function C(N){const S=i.get(N);if(S.__webglInit===void 0)return;const W=N.source,Y=p.get(W);if(Y){const $=Y[S.__cacheKey];$.usedTimes--,$.usedTimes===0&&w(N),Object.keys(Y).length===0&&p.delete(W)}i.remove(N)}function w(N){const S=i.get(N);t.deleteTexture(S.__webglTexture);const W=N.source,Y=p.get(W);delete Y[S.__cacheKey],r.memory.textures--}function D(N){const S=i.get(N);if(N.depthTexture&&(N.depthTexture.dispose(),i.remove(N.depthTexture)),N.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let $=0;$<S.__webglFramebuffer[Y].length;$++)t.deleteFramebuffer(S.__webglFramebuffer[Y][$]);else t.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)t.deleteFramebuffer(S.__webglFramebuffer[Y]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const W=N.textures;for(let Y=0,$=W.length;Y<$;Y++){const de=i.get(W[Y]);de.__webglTexture&&(t.deleteTexture(de.__webglTexture),r.memory.textures--),i.remove(W[Y])}i.remove(N)}let P=0;function G(){P=0}function O(){return P}function z(N){P=N}function B(){const N=P;return N>=a.maxTextures&&Fe("WebGLTextures: Trying to use "+N+" texture units while this GPU supports only "+a.maxTextures),P+=1,N}function I(N){const S=[];return S.push(N.wrapS),S.push(N.wrapT),S.push(N.wrapR||0),S.push(N.magFilter),S.push(N.minFilter),S.push(N.anisotropy),S.push(N.internalFormat),S.push(N.format),S.push(N.type),S.push(N.generateMipmaps),S.push(N.premultiplyAlpha),S.push(N.flipY),S.push(N.unpackAlignment),S.push(N.colorSpace),S.join()}function U(N,S){const W=i.get(N);if(N.isVideoTexture&&H(N),N.isRenderTargetTexture===!1&&N.isExternalTexture!==!0&&N.version>0&&W.__version!==N.version){const Y=N.image;if(Y===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(W,N,S);return}}else N.isExternalTexture&&(W.__webglTexture=N.sourceTexture?N.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,W.__webglTexture,t.TEXTURE0+S)}function X(N,S){const W=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&W.__version!==N.version){Le(W,N,S);return}else N.isExternalTexture&&(W.__webglTexture=N.sourceTexture?N.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,W.__webglTexture,t.TEXTURE0+S)}function oe(N,S){const W=i.get(N);if(N.isRenderTargetTexture===!1&&N.version>0&&W.__version!==N.version){Le(W,N,S);return}n.bindTexture(t.TEXTURE_3D,W.__webglTexture,t.TEXTURE0+S)}function ce(N,S){const W=i.get(N);if(N.isCubeDepthTexture!==!0&&N.version>0&&W.__version!==N.version){ze(W,N,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,W.__webglTexture,t.TEXTURE0+S)}const xe={[Jh]:t.REPEAT,[Ta]:t.CLAMP_TO_EDGE,[$h]:t.MIRRORED_REPEAT},ke={[Mn]:t.NEAREST,[gT]:t.NEAREST_MIPMAP_NEAREST,[pc]:t.NEAREST_MIPMAP_LINEAR,[wn]:t.LINEAR,[dd]:t.LINEAR_MIPMAP_NEAREST,[zs]:t.LINEAR_MIPMAP_LINEAR},Ke={[xT]:t.NEVER,[ET]:t.ALWAYS,[ST]:t.LESS,[Ym]:t.LEQUAL,[yT]:t.EQUAL,[Zm]:t.GEQUAL,[MT]:t.GREATER,[bT]:t.NOTEQUAL};function Be(N,S){if(S.type===zi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===wn||S.magFilter===dd||S.magFilter===pc||S.magFilter===zs||S.minFilter===wn||S.minFilter===dd||S.minFilter===pc||S.minFilter===zs)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(N,t.TEXTURE_WRAP_S,xe[S.wrapS]),t.texParameteri(N,t.TEXTURE_WRAP_T,xe[S.wrapT]),(N===t.TEXTURE_3D||N===t.TEXTURE_2D_ARRAY)&&t.texParameteri(N,t.TEXTURE_WRAP_R,xe[S.wrapR]),t.texParameteri(N,t.TEXTURE_MAG_FILTER,ke[S.magFilter]),t.texParameteri(N,t.TEXTURE_MIN_FILTER,ke[S.minFilter]),S.compareFunction&&(t.texParameteri(N,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(N,t.TEXTURE_COMPARE_FUNC,Ke[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Mn||S.minFilter!==pc&&S.minFilter!==zs||S.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const W=e.get("EXT_texture_filter_anisotropic");t.texParameterf(N,W.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,a.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function se(N,S){let W=!1;N.__webglInit===void 0&&(N.__webglInit=!0,S.addEventListener("dispose",T));const Y=S.source;let $=p.get(Y);$===void 0&&($={},p.set(Y,$));const de=I(S);if(de!==N.__cacheKey){$[de]===void 0&&($[de]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,W=!0),$[de].usedTimes++;const ge=$[N.__cacheKey];ge!==void 0&&($[N.__cacheKey].usedTimes--,ge.usedTimes===0&&w(S)),N.__cacheKey=de,N.__webglTexture=$[de].texture}return W}function _e(N,S,W){return Math.floor(Math.floor(N/W)/S)}function me(N,S,W,Y){const de=N.updateRanges;if(de.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,W,Y,S.data);else{de.sort((ue,L)=>ue.start-L.start);let ge=0;for(let ue=1;ue<de.length;ue++){const L=de[ge],V=de[ue],he=L.start+L.count,fe=_e(V.start,S.width,4),Ce=_e(L.start,S.width,4);V.start<=he+1&&fe===Ce&&_e(V.start+V.count-1,S.width,4)===fe?L.count=Math.max(L.count,V.start+V.count-L.start):(++ge,de[ge]=V)}de.length=ge+1;const ee=n.getParameter(t.UNPACK_ROW_LENGTH),j=n.getParameter(t.UNPACK_SKIP_PIXELS),ne=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let ue=0,L=de.length;ue<L;ue++){const V=de[ue],he=Math.floor(V.start/4),fe=Math.ceil(V.count/4),Ce=he%S.width,F=Math.floor(he/S.width),pe=fe,te=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),n.pixelStorei(t.UNPACK_SKIP_ROWS,F),n.texSubImage2D(t.TEXTURE_2D,0,Ce,F,pe,te,W,Y,S.data)}N.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ee),n.pixelStorei(t.UNPACK_SKIP_PIXELS,j),n.pixelStorei(t.UNPACK_SKIP_ROWS,ne)}}function Le(N,S,W){let Y=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=t.TEXTURE_3D);const $=se(N,S),de=S.source;n.bindTexture(Y,N.__webglTexture,t.TEXTURE0+W);const ge=i.get(de);if(de.version!==ge.__version||$===!0){if(n.activeTexture(t.TEXTURE0+W),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const te=ct.getPrimaries(ct.workingColorSpace),Q=S.colorSpace===Ja?null:ct.getPrimaries(S.colorSpace),ve=S.colorSpace===Ja||te===Q?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment);let j=v(S.image,!1,a.maxTextureSize);j=nt(S,j);const ne=s.convert(S.format,S.colorSpace),ue=s.convert(S.type);let L=_(S.internalFormat,ne,ue,S.normalized,S.colorSpace,S.isVideoTexture);Be(Y,S);let V;const he=S.mipmaps,fe=S.isVideoTexture!==!0,Ce=ge.__version===void 0||$===!0,F=de.dataReady,pe=R(S,j);if(S.isDepthTexture)L=A(S.format===Is,S.type),Ce&&(fe?n.texStorage2D(t.TEXTURE_2D,1,L,j.width,j.height):n.texImage2D(t.TEXTURE_2D,0,L,j.width,j.height,0,ne,ue,null));else if(S.isDataTexture)if(he.length>0){fe&&Ce&&n.texStorage2D(t.TEXTURE_2D,pe,L,he[0].width,he[0].height);for(let te=0,Q=he.length;te<Q;te++)V=he[te],fe?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,V.width,V.height,ne,ue,V.data):n.texImage2D(t.TEXTURE_2D,te,L,V.width,V.height,0,ne,ue,V.data);S.generateMipmaps=!1}else fe?(Ce&&n.texStorage2D(t.TEXTURE_2D,pe,L,j.width,j.height),F&&me(S,j,ne,ue)):n.texImage2D(t.TEXTURE_2D,0,L,j.width,j.height,0,ne,ue,j.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){fe&&Ce&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,L,he[0].width,he[0].height,j.depth);for(let te=0,Q=he.length;te<Q;te++)if(V=he[te],S.format!==Ii)if(ne!==null)if(fe){if(F)if(S.layerUpdates.size>0){const ve=Sv(V.width,V.height,S.format,S.type);for(const re of S.layerUpdates){const Re=V.data.subarray(re*ve/V.data.BYTES_PER_ELEMENT,(re+1)*ve/V.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,re,V.width,V.height,1,ne,Re)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,V.width,V.height,j.depth,ne,V.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,te,L,V.width,V.height,j.depth,0,V.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,V.width,V.height,j.depth,ne,ue,V.data):n.texImage3D(t.TEXTURE_2D_ARRAY,te,L,V.width,V.height,j.depth,0,ne,ue,V.data)}else{fe&&Ce&&n.texStorage2D(t.TEXTURE_2D,pe,L,he[0].width,he[0].height);for(let te=0,Q=he.length;te<Q;te++)V=he[te],S.format!==Ii?ne!==null?fe?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,te,0,0,V.width,V.height,ne,V.data):n.compressedTexImage2D(t.TEXTURE_2D,te,L,V.width,V.height,0,V.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,V.width,V.height,ne,ue,V.data):n.texImage2D(t.TEXTURE_2D,te,L,V.width,V.height,0,ne,ue,V.data)}else if(S.isDataArrayTexture)if(fe){if(Ce&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,L,j.width,j.height,j.depth),F)if(S.layerUpdates.size>0){const te=Sv(j.width,j.height,S.format,S.type);for(const Q of S.layerUpdates){const ve=j.data.subarray(Q*te/j.data.BYTES_PER_ELEMENT,(Q+1)*te/j.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Q,j.width,j.height,1,ne,ue,ve)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ne,ue,j.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,L,j.width,j.height,j.depth,0,ne,ue,j.data);else if(S.isData3DTexture)fe?(Ce&&n.texStorage3D(t.TEXTURE_3D,pe,L,j.width,j.height,j.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ne,ue,j.data)):n.texImage3D(t.TEXTURE_3D,0,L,j.width,j.height,j.depth,0,ne,ue,j.data);else if(S.isFramebufferTexture){if(Ce)if(fe)n.texStorage2D(t.TEXTURE_2D,pe,L,j.width,j.height);else{let te=j.width,Q=j.height;for(let ve=0;ve<pe;ve++)n.texImage2D(t.TEXTURE_2D,ve,L,te,Q,0,ne,ue,null),te>>=1,Q>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in t){const te=t.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),j.parentNode!==te){te.appendChild(j),h.add(S),te.onpaint=Q=>{const ve=Q.changedElements;for(const re of h)ve.includes(re.image)&&(re.needsUpdate=!0)},te.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,j);else{const ve=t.RGBA,re=t.RGBA,Re=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,ve,re,Re,j)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(he.length>0){if(fe&&Ce){const te=Ve(he[0]);n.texStorage2D(t.TEXTURE_2D,pe,L,te.width,te.height)}for(let te=0,Q=he.length;te<Q;te++)V=he[te],fe?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,ne,ue,V):n.texImage2D(t.TEXTURE_2D,te,L,ne,ue,V);S.generateMipmaps=!1}else if(fe){if(Ce){const te=Ve(j);n.texStorage2D(t.TEXTURE_2D,pe,L,te.width,te.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ne,ue,j)}else n.texImage2D(t.TEXTURE_2D,0,L,ne,ue,j);d(S)&&x(Y),ge.__version=de.version,S.onUpdate&&S.onUpdate(S)}N.__version=S.version}function ze(N,S,W){if(S.image.length!==6)return;const Y=se(N,S),$=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,N.__webglTexture,t.TEXTURE0+W);const de=i.get($);if($.version!==de.__version||Y===!0){n.activeTexture(t.TEXTURE0+W);const ge=ct.getPrimaries(ct.workingColorSpace),ee=S.colorSpace===Ja?null:ct.getPrimaries(S.colorSpace),j=S.colorSpace===Ja||ge===ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ne=S.isCompressedTexture||S.image[0].isCompressedTexture,ue=S.image[0]&&S.image[0].isDataTexture,L=[];for(let re=0;re<6;re++)!ne&&!ue?L[re]=v(S.image[re],!0,a.maxCubemapSize):L[re]=ue?S.image[re].image:S.image[re],L[re]=nt(S,L[re]);const V=L[0],he=s.convert(S.format,S.colorSpace),fe=s.convert(S.type),Ce=_(S.internalFormat,he,fe,S.normalized,S.colorSpace),F=S.isVideoTexture!==!0,pe=de.__version===void 0||Y===!0,te=$.dataReady;let Q=R(S,V);Be(t.TEXTURE_CUBE_MAP,S);let ve;if(ne){F&&pe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,Ce,V.width,V.height);for(let re=0;re<6;re++){ve=L[re].mipmaps;for(let Re=0;Re<ve.length;Re++){const Ne=ve[Re];S.format!==Ii?he!==null?F?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,0,0,Ne.width,Ne.height,he,Ne.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,Ce,Ne.width,Ne.height,0,Ne.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,0,0,Ne.width,Ne.height,he,fe,Ne.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re,Ce,Ne.width,Ne.height,0,he,fe,Ne.data)}}}else{if(ve=S.mipmaps,F&&pe){ve.length>0&&Q++;const re=Ve(L[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,Ce,re.width,re.height)}for(let re=0;re<6;re++)if(ue){F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,L[re].width,L[re].height,he,fe,L[re].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ce,L[re].width,L[re].height,0,he,fe,L[re].data);for(let Re=0;Re<ve.length;Re++){const dt=ve[Re].image[re].image;F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,0,0,dt.width,dt.height,he,fe,dt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,Ce,dt.width,dt.height,0,he,fe,dt.data)}}else{F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,0,0,he,fe,L[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,0,Ce,he,fe,L[re]);for(let Re=0;Re<ve.length;Re++){const Ne=ve[Re];F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,0,0,he,fe,Ne.image[re]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+re,Re+1,Ce,he,fe,Ne.image[re])}}}d(S)&&x(t.TEXTURE_CUBE_MAP),de.__version=$.version,S.onUpdate&&S.onUpdate(S)}N.__version=S.version}function Ie(N,S,W,Y,$,de){const ge=s.convert(W.format,W.colorSpace),ee=s.convert(W.type),j=_(W.internalFormat,ge,ee,W.normalized,W.colorSpace),ne=i.get(S),ue=i.get(W);if(ue.__renderTarget=S,!ne.__hasExternalTextures){const L=Math.max(1,S.width>>de),V=Math.max(1,S.height>>de);$===t.TEXTURE_3D||$===t.TEXTURE_2D_ARRAY?n.texImage3D($,de,j,L,V,S.depth,0,ge,ee,null):n.texImage2D($,de,j,L,V,0,ge,ee,null)}n.bindFramebuffer(t.FRAMEBUFFER,N),ye(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,$,ue.__webglTexture,0,Rt(S)):($===t.TEXTURE_2D||$>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&$<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,$,ue.__webglTexture,de),n.bindFramebuffer(t.FRAMEBUFFER,null)}function xt(N,S,W){if(t.bindRenderbuffer(t.RENDERBUFFER,N),S.depthBuffer){const Y=S.depthTexture,$=Y&&Y.isDepthTexture?Y.type:null,de=A(S.stencilBuffer,$),ge=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;ye(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Rt(S),de,S.width,S.height):W?t.renderbufferStorageMultisample(t.RENDERBUFFER,Rt(S),de,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,de,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ge,t.RENDERBUFFER,N)}else{const Y=S.textures;for(let $=0;$<Y.length;$++){const de=Y[$],ge=s.convert(de.format,de.colorSpace),ee=s.convert(de.type),j=_(de.internalFormat,ge,ee,de.normalized,de.colorSpace);ye(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Rt(S),j,S.width,S.height):W?t.renderbufferStorageMultisample(t.RENDERBUFFER,Rt(S),j,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,j,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function We(N,S,W){const Y=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,N),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const $=i.get(S.depthTexture);if($.__renderTarget=S,(!$.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y){if($.__webglInit===void 0&&($.__webglInit=!0,S.depthTexture.addEventListener("dispose",T)),$.__webglTexture===void 0){$.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,$.__webglTexture),Be(t.TEXTURE_CUBE_MAP,S.depthTexture);const ne=s.convert(S.depthTexture.format),ue=s.convert(S.depthTexture.type);let L;S.depthTexture.format===Ia?L=t.DEPTH_COMPONENT24:S.depthTexture.format===Is&&(L=t.DEPTH24_STENCIL8);for(let V=0;V<6;V++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+V,0,L,S.width,S.height,0,ne,ue,null)}}else U(S.depthTexture,0);const de=$.__webglTexture,ge=Rt(S),ee=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+W:t.TEXTURE_2D,j=S.depthTexture.format===Is?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ia)ye(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,ee,de,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,j,ee,de,0);else if(S.depthTexture.format===Is)ye(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,j,ee,de,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,j,ee,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(N){const S=i.get(N),W=N.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==N.depthTexture){const Y=N.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const $=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",$)};Y.addEventListener("dispose",$),S.__depthDisposeCallback=$}S.__boundDepthTexture=Y}if(N.depthTexture&&!S.__autoAllocateDepthBuffer)if(W)for(let Y=0;Y<6;Y++)We(S.__webglFramebuffer[Y],N,Y);else{const Y=N.texture.mipmaps;Y&&Y.length>0?We(S.__webglFramebuffer[0],N,0):We(S.__webglFramebuffer,N,0)}else if(W){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=t.createRenderbuffer(),xt(S.__webglDepthbuffer[Y],N,!1);else{const $=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,de),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,de)}}else{const Y=N.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),xt(S.__webglDepthbuffer,N,!1);else{const $=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,de),t.framebufferRenderbuffer(t.FRAMEBUFFER,$,t.RENDERBUFFER,de)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ge(N,S,W){const Y=i.get(N);S!==void 0&&Ie(Y.__webglFramebuffer,N,N.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),W!==void 0&&lt(N)}function qe(N){const S=N.texture,W=i.get(N),Y=i.get(S);N.addEventListener("dispose",y);const $=N.textures,de=N.isWebGLCubeRenderTarget===!0,ge=$.length>1;if(ge||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=S.version,r.memory.textures++),de){W.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer[ee]=[];for(let j=0;j<S.mipmaps.length;j++)W.__webglFramebuffer[ee][j]=t.createFramebuffer()}else W.__webglFramebuffer[ee]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){W.__webglFramebuffer=[];for(let ee=0;ee<S.mipmaps.length;ee++)W.__webglFramebuffer[ee]=t.createFramebuffer()}else W.__webglFramebuffer=t.createFramebuffer();if(ge)for(let ee=0,j=$.length;ee<j;ee++){const ne=i.get($[ee]);ne.__webglTexture===void 0&&(ne.__webglTexture=t.createTexture(),r.memory.textures++)}if(N.samples>0&&ye(N)===!1){W.__webglMultisampledFramebuffer=t.createFramebuffer(),W.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let ee=0;ee<$.length;ee++){const j=$[ee];W.__webglColorRenderbuffer[ee]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,W.__webglColorRenderbuffer[ee]);const ne=s.convert(j.format,j.colorSpace),ue=s.convert(j.type),L=_(j.internalFormat,ne,ue,j.normalized,j.colorSpace,N.isXRRenderTarget===!0),V=Rt(N);t.renderbufferStorageMultisample(t.RENDERBUFFER,V,L,N.width,N.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.RENDERBUFFER,W.__webglColorRenderbuffer[ee])}t.bindRenderbuffer(t.RENDERBUFFER,null),N.depthBuffer&&(W.__webglDepthRenderbuffer=t.createRenderbuffer(),xt(W.__webglDepthRenderbuffer,N,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(de){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),Be(t.TEXTURE_CUBE_MAP,S);for(let ee=0;ee<6;ee++)if(S.mipmaps&&S.mipmaps.length>0)for(let j=0;j<S.mipmaps.length;j++)Ie(W.__webglFramebuffer[ee][j],N,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,j);else Ie(W.__webglFramebuffer[ee],N,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);d(S)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ge){for(let ee=0,j=$.length;ee<j;ee++){const ne=$[ee],ue=i.get(ne);let L=t.TEXTURE_2D;(N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(L=N.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(L,ue.__webglTexture),Be(L,ne),Ie(W.__webglFramebuffer,N,ne,t.COLOR_ATTACHMENT0+ee,L,0),d(ne)&&x(L)}n.unbindTexture()}else{let ee=t.TEXTURE_2D;if((N.isWebGL3DRenderTarget||N.isWebGLArrayRenderTarget)&&(ee=N.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,Y.__webglTexture),Be(ee,S),S.mipmaps&&S.mipmaps.length>0)for(let j=0;j<S.mipmaps.length;j++)Ie(W.__webglFramebuffer[j],N,S,t.COLOR_ATTACHMENT0,ee,j);else Ie(W.__webglFramebuffer,N,S,t.COLOR_ATTACHMENT0,ee,0);d(S)&&x(ee),n.unbindTexture()}N.depthBuffer&&lt(N)}function Ct(N){const S=N.textures;for(let W=0,Y=S.length;W<Y;W++){const $=S[W];if(d($)){const de=M(N),ge=i.get($).__webglTexture;n.bindTexture(de,ge),x(de),n.unbindTexture()}}}const mt=[],zt=[];function Ot(N){if(N.samples>0){if(ye(N)===!1){const S=N.textures,W=N.width,Y=N.height;let $=t.COLOR_BUFFER_BIT;const de=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=i.get(N),ee=S.length>1;if(ee)for(let ne=0;ne<S.length;ne++)n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const j=N.texture.mipmaps;j&&j.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let ne=0;ne<S.length;ne++){if(N.resolveDepthBuffer&&(N.depthBuffer&&($|=t.DEPTH_BUFFER_BIT),N.stencilBuffer&&N.resolveStencilBuffer&&($|=t.STENCIL_BUFFER_BIT)),ee){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ge.__webglColorRenderbuffer[ne]);const ue=i.get(S[ne]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ue,0)}t.blitFramebuffer(0,0,W,Y,0,0,W,Y,$,t.NEAREST),l===!0&&(mt.length=0,zt.length=0,mt.push(t.COLOR_ATTACHMENT0+ne),N.depthBuffer&&N.resolveDepthBuffer===!1&&(mt.push(de),zt.push(de),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,zt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,mt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ee)for(let ne=0;ne<S.length;ne++){n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.RENDERBUFFER,ge.__webglColorRenderbuffer[ne]);const ue=i.get(S[ne]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ne,t.TEXTURE_2D,ue,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(N.depthBuffer&&N.resolveDepthBuffer===!1&&l){const S=N.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function Rt(N){return Math.min(a.maxSamples,N.samples)}function ye(N){const S=i.get(N);return N.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function H(N){const S=r.render.frame;f.get(N)!==S&&(f.set(N,S),N.update())}function nt(N,S){const W=N.colorSpace,Y=N.format,$=N.type;return N.isCompressedTexture===!0||N.isVideoTexture===!0||W!==Yu&&W!==Ja&&(ct.getTransfer(W)===Tt?(Y!==Ii||$!==bi)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ht("WebGLTextures: Unsupported texture color space:",W)),S}function Ve(N){return typeof HTMLImageElement<"u"&&N instanceof HTMLImageElement?(c.width=N.naturalWidth||N.width,c.height=N.naturalHeight||N.height):typeof VideoFrame<"u"&&N instanceof VideoFrame?(c.width=N.displayWidth,c.height=N.displayHeight):(c.width=N.width,c.height=N.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=G,this.getTextureUnits=O,this.setTextureUnits=z,this.setTexture2D=U,this.setTexture2DArray=X,this.setTexture3D=oe,this.setTextureCube=ce,this.rebindTextures=Ge,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=Ot,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=ye,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function KR(t,e){function n(i,a=Ja){let s;const r=ct.getTransfer(a);if(i===bi)return t.UNSIGNED_BYTE;if(i===Vm)return t.UNSIGNED_SHORT_4_4_4_4;if(i===km)return t.UNSIGNED_SHORT_5_5_5_1;if(i===hy)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===py)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===fy)return t.BYTE;if(i===dy)return t.SHORT;if(i===Ll)return t.UNSIGNED_SHORT;if(i===Gm)return t.INT;if(i===ea)return t.UNSIGNED_INT;if(i===zi)return t.FLOAT;if(i===za)return t.HALF_FLOAT;if(i===my)return t.ALPHA;if(i===gy)return t.RGB;if(i===Ii)return t.RGBA;if(i===Ia)return t.DEPTH_COMPONENT;if(i===Is)return t.DEPTH_STENCIL;if(i===Xm)return t.RED;if(i===Wm)return t.RED_INTEGER;if(i===Ks)return t.RG;if(i===jm)return t.RG_INTEGER;if(i===qm)return t.RGBA_INTEGER;if(i===lu||i===cu||i===uu||i===fu)if(r===Tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===lu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===cu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===fu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===lu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===cu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===fu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ep||i===tp||i===np||i===ip)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ep)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===tp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===np)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ip)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ap||i===sp||i===rp||i===op||i===lp||i===ju||i===cp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ap||i===sp)return r===Tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===rp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===op)return s.COMPRESSED_R11_EAC;if(i===lp)return s.COMPRESSED_SIGNED_R11_EAC;if(i===ju)return s.COMPRESSED_RG11_EAC;if(i===cp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===up||i===fp||i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===Sp||i===yp||i===Mp||i===bp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===up)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===fp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===hp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===pp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===mp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===_p)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ep||i===Tp||i===Ap)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ep)return r===Tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Tp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Ap)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wp||i===Cp||i===qu||i===Rp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===wp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Cp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ol?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const QR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,JR=`
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

}`;class $R{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Ry(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new bn({vertexShader:QR,fragmentShader:JR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ri(new Mf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class e3 extends ar{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,f=null,h=null,u=null,p=null,g=null;const b=typeof XRWebGLBinding<"u",v=new $R,d={},x=n.getContextAttributes();let M=null,_=null;const A=[],R=[],T=new _t;let y=null;const C=new xi;C.viewport=new Zt;const w=new xi;w.viewport=new Zt;const D=[C,w],P=new uA;let G=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(se){let _e=A[se];return _e===void 0&&(_e=new xd,A[se]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(se){let _e=A[se];return _e===void 0&&(_e=new xd,A[se]=_e),_e.getGripSpace()},this.getHand=function(se){let _e=A[se];return _e===void 0&&(_e=new xd,A[se]=_e),_e.getHandSpace()};function z(se){const _e=R.indexOf(se.inputSource);if(_e===-1)return;const me=A[_e];me!==void 0&&(me.update(se.inputSource,se.frame,c||r),me.dispatchEvent({type:se.type,data:se.inputSource}))}function B(){a.removeEventListener("select",z),a.removeEventListener("selectstart",z),a.removeEventListener("selectend",z),a.removeEventListener("squeeze",z),a.removeEventListener("squeezestart",z),a.removeEventListener("squeezeend",z),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",I);for(let se=0;se<A.length;se++){const _e=R[se];_e!==null&&(R[se]=null,A[se].disconnect(_e))}G=null,O=null,v.reset();for(const se in d)delete d[se];e.setRenderTarget(M),p=null,u=null,h=null,a=null,_=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(se){s=se,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(se){o=se,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(se){c=se},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&b&&(h=new XRWebGLBinding(a,n)),h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(se){if(a=se,a!==null){if(M=e.getRenderTarget(),a.addEventListener("select",z),a.addEventListener("selectstart",z),a.addEventListener("selectend",z),a.addEventListener("squeeze",z),a.addEventListener("squeezestart",z),a.addEventListener("squeezeend",z),a.addEventListener("end",B),a.addEventListener("inputsourceschange",I),x.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(T),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Le=null,ze=null;x.depth&&(ze=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,me=x.stencil?Is:Ia,Le=x.stencil?Ol:ea);const Ie={colorFormat:n.RGBA8,depthFormat:ze,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Ie),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new $i(u.textureWidth,u.textureHeight,{format:Ii,type:bi,depthTexture:new mo(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,me),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new $i(p.framebufferWidth,p.framebufferHeight,{format:Ii,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),Be.setContext(a),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function I(se){for(let _e=0;_e<se.removed.length;_e++){const me=se.removed[_e],Le=R.indexOf(me);Le>=0&&(R[Le]=null,A[Le].disconnect(me))}for(let _e=0;_e<se.added.length;_e++){const me=se.added[_e];let Le=R.indexOf(me);if(Le===-1){for(let Ie=0;Ie<A.length;Ie++)if(Ie>=R.length){R.push(me),Le=Ie;break}else if(R[Ie]===null){R[Ie]=me,Le=Ie;break}if(Le===-1)break}const ze=A[Le];ze&&ze.connect(me)}}const U=new q,X=new q;function oe(se,_e,me){U.setFromMatrixPosition(_e.matrixWorld),X.setFromMatrixPosition(me.matrixWorld);const Le=U.distanceTo(X),ze=_e.projectionMatrix.elements,Ie=me.projectionMatrix.elements,xt=ze[14]/(ze[10]-1),We=ze[14]/(ze[10]+1),lt=(ze[9]+1)/ze[5],Ge=(ze[9]-1)/ze[5],qe=(ze[8]-1)/ze[0],Ct=(Ie[8]+1)/Ie[0],mt=xt*qe,zt=xt*Ct,Ot=Le/(-qe+Ct),Rt=Ot*-qe;if(_e.matrixWorld.decompose(se.position,se.quaternion,se.scale),se.translateX(Rt),se.translateZ(Ot),se.matrixWorld.compose(se.position,se.quaternion,se.scale),se.matrixWorldInverse.copy(se.matrixWorld).invert(),ze[10]===-1)se.projectionMatrix.copy(_e.projectionMatrix),se.projectionMatrixInverse.copy(_e.projectionMatrixInverse);else{const ye=xt+Ot,H=We+Ot,nt=mt-Rt,Ve=zt+(Le-Rt),N=lt*We/H*ye,S=Ge*We/H*ye;se.projectionMatrix.makePerspective(nt,Ve,N,S,ye,H),se.projectionMatrixInverse.copy(se.projectionMatrix).invert()}}function ce(se,_e){_e===null?se.matrixWorld.copy(se.matrix):se.matrixWorld.multiplyMatrices(_e.matrixWorld,se.matrix),se.matrixWorldInverse.copy(se.matrixWorld).invert()}this.updateCamera=function(se){if(a===null)return;let _e=se.near,me=se.far;v.texture!==null&&(v.depthNear>0&&(_e=v.depthNear),v.depthFar>0&&(me=v.depthFar)),P.near=w.near=C.near=_e,P.far=w.far=C.far=me,(G!==P.near||O!==P.far)&&(a.updateRenderState({depthNear:P.near,depthFar:P.far}),G=P.near,O=P.far),P.layers.mask=se.layers.mask|6,C.layers.mask=P.layers.mask&-5,w.layers.mask=P.layers.mask&-3;const Le=se.parent,ze=P.cameras;ce(P,Le);for(let Ie=0;Ie<ze.length;Ie++)ce(ze[Ie],Le);ze.length===2?oe(P,C,w):P.projectionMatrix.copy(C.projectionMatrix),xe(se,P,Le)};function xe(se,_e,me){me===null?se.matrix.copy(_e.matrixWorld):(se.matrix.copy(me.matrixWorld),se.matrix.invert(),se.matrix.multiply(_e.matrixWorld)),se.matrix.decompose(se.position,se.quaternion,se.scale),se.updateMatrixWorld(!0),se.projectionMatrix.copy(_e.projectionMatrix),se.projectionMatrixInverse.copy(_e.projectionMatrixInverse),se.isPerspectiveCamera&&(se.fov=Np*2*Math.atan(1/se.projectionMatrix.elements[5]),se.zoom=1)}this.getCamera=function(){return P},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(se){l=se,u!==null&&(u.fixedFoveation=se),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=se)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(P)},this.getCameraTexture=function(se){return d[se]};let ke=null;function Ke(se,_e){if(f=_e.getViewerPose(c||r),g=_e,f!==null){const me=f.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let Le=!1;me.length!==P.cameras.length&&(P.cameras.length=0,Le=!0);for(let We=0;We<me.length;We++){const lt=me[We];let Ge=null;if(p!==null)Ge=p.getViewport(lt);else{const Ct=h.getViewSubImage(u,lt);Ge=Ct.viewport,We===0&&(e.setRenderTargetTextures(_,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(_))}let qe=D[We];qe===void 0&&(qe=new xi,qe.layers.enable(We),qe.viewport=new Zt,D[We]=qe),qe.matrix.fromArray(lt.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(lt.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),We===0&&(P.matrix.copy(qe.matrix),P.matrix.decompose(P.position,P.quaternion,P.scale)),Le===!0&&P.cameras.push(qe)}const ze=a.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){h=i.getBinding();const We=h.getDepthInformation(me[0]);We&&We.isValid&&We.texture&&v.init(We,a.renderState)}if(ze&&ze.includes("camera-access")&&b){e.state.unbindTexture(),h=i.getBinding();for(let We=0;We<me.length;We++){const lt=me[We].camera;if(lt){let Ge=d[lt];Ge||(Ge=new Ry,d[lt]=Ge);const qe=h.getCameraImage(lt);Ge.sourceTexture=qe}}}}for(let me=0;me<A.length;me++){const Le=R[me],ze=A[me];Le!==null&&ze!==void 0&&ze.update(Le,_e,c||r)}ke&&ke(se,_e),_e.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_e}),g=null}const Be=new Uy;Be.setAnimationLoop(Ke),this.setAnimationLoop=function(se){ke=se},this.dispose=function(){}}}const t3=new Bt,Fy=new je;Fy.set(-1,0,0,0,1,0,0,0,1);function n3(t,e){function n(v,d){v.matrixAutoUpdate===!0&&v.updateMatrix(),d.value.copy(v.matrix)}function i(v,d){d.color.getRGB(v.fogColor.value,Ny(t)),d.isFog?(v.fogNear.value=d.near,v.fogFar.value=d.far):d.isFogExp2&&(v.fogDensity.value=d.density)}function a(v,d,x,M,_){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(v,d):d.isMeshLambertMaterial?(s(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(v,d),h(v,d)):d.isMeshPhongMaterial?(s(v,d),f(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(v,d),u(v,d),d.isMeshPhysicalMaterial&&p(v,d,_)):d.isMeshMatcapMaterial?(s(v,d),g(v,d)):d.isMeshDepthMaterial?s(v,d):d.isMeshDistanceMaterial?(s(v,d),b(v,d)):d.isMeshNormalMaterial?s(v,d):d.isLineBasicMaterial?(r(v,d),d.isLineDashedMaterial&&o(v,d)):d.isPointsMaterial?l(v,d,x,M):d.isSpriteMaterial?c(v,d):d.isShadowMaterial?(v.color.value.copy(d.color),v.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(v,d){v.opacity.value=d.opacity,d.color&&v.diffuse.value.copy(d.color),d.emissive&&v.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.bumpMap&&(v.bumpMap.value=d.bumpMap,n(d.bumpMap,v.bumpMapTransform),v.bumpScale.value=d.bumpScale,d.side===Yn&&(v.bumpScale.value*=-1)),d.normalMap&&(v.normalMap.value=d.normalMap,n(d.normalMap,v.normalMapTransform),v.normalScale.value.copy(d.normalScale),d.side===Yn&&v.normalScale.value.negate()),d.displacementMap&&(v.displacementMap.value=d.displacementMap,n(d.displacementMap,v.displacementMapTransform),v.displacementScale.value=d.displacementScale,v.displacementBias.value=d.displacementBias),d.emissiveMap&&(v.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,v.emissiveMapTransform)),d.specularMap&&(v.specularMap.value=d.specularMap,n(d.specularMap,v.specularMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest);const x=e.get(d),M=x.envMap,_=x.envMapRotation;M&&(v.envMap.value=M,v.envMapRotation.value.setFromMatrix4(t3.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(Fy),v.reflectivity.value=d.reflectivity,v.ior.value=d.ior,v.refractionRatio.value=d.refractionRatio),d.lightMap&&(v.lightMap.value=d.lightMap,v.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,v.lightMapTransform)),d.aoMap&&(v.aoMap.value=d.aoMap,v.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,v.aoMapTransform))}function r(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform))}function o(v,d){v.dashSize.value=d.dashSize,v.totalSize.value=d.dashSize+d.gapSize,v.scale.value=d.scale}function l(v,d,x,M){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.size.value=d.size*x,v.scale.value=M*.5,d.map&&(v.map.value=d.map,n(d.map,v.uvTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function c(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.rotation.value=d.rotation,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function f(v,d){v.specular.value.copy(d.specular),v.shininess.value=Math.max(d.shininess,1e-4)}function h(v,d){d.gradientMap&&(v.gradientMap.value=d.gradientMap)}function u(v,d){v.metalness.value=d.metalness,d.metalnessMap&&(v.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,v.metalnessMapTransform)),v.roughness.value=d.roughness,d.roughnessMap&&(v.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,v.roughnessMapTransform)),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)}function p(v,d,x){v.ior.value=d.ior,d.sheen>0&&(v.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),v.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(v.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,v.sheenColorMapTransform)),d.sheenRoughnessMap&&(v.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,v.sheenRoughnessMapTransform))),d.clearcoat>0&&(v.clearcoat.value=d.clearcoat,v.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(v.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,v.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(v.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Yn&&v.clearcoatNormalScale.value.negate())),d.dispersion>0&&(v.dispersion.value=d.dispersion),d.iridescence>0&&(v.iridescence.value=d.iridescence,v.iridescenceIOR.value=d.iridescenceIOR,v.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(v.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,v.iridescenceMapTransform)),d.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),d.transmission>0&&(v.transmission.value=d.transmission,v.transmissionSamplerMap.value=x.texture,v.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(v.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,v.transmissionMapTransform)),v.thickness.value=d.thickness,d.thicknessMap&&(v.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=d.attenuationDistance,v.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(v.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(v.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=d.specularIntensity,v.specularColor.value.copy(d.specularColor),d.specularColorMap&&(v.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,v.specularColorMapTransform)),d.specularIntensityMap&&(v.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,v.specularIntensityMapTransform))}function g(v,d){d.matcap&&(v.matcap.value=d.matcap)}function b(v,d){const x=e.get(d).light;v.referencePosition.value.setFromMatrixPosition(x.matrixWorld),v.nearDistance.value=x.shadow.camera.near,v.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function i3(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,A){const R=A.program;i.uniformBlockBinding(_,R)}function c(_,A){let R=a[_.id];R===void 0&&(v(_),R=f(_),a[_.id]=R,_.addEventListener("dispose",x));const T=A.program;i.updateUBOMapping(_,T);const y=e.render.frame;s[_.id]!==y&&(u(_),s[_.id]=y)}function f(_){const A=h();_.__bindingPointIndex=A;const R=t.createBuffer(),T=_.__size,y=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,R),t.bufferData(t.UNIFORM_BUFFER,T,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,A,R),R}function h(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const A=a[_.id],R=_.uniforms,T=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,A);for(let y=0,C=R.length;y<C;y++){const w=R[y];if(Array.isArray(w))for(let D=0,P=w.length;D<P;D++)p(w[D],y,D,T);else p(w,y,0,T)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,A,R,T){if(b(_,A,R,T)===!0){const y=_.__offset,C=_.value;if(Array.isArray(C)){let w=0;for(let D=0;D<C.length;D++){const P=C[D],G=d(P);g(P,_.__data,w),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(w+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(C,_.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,y,_.__data)}}function g(_,A,R){typeof _=="number"||typeof _=="boolean"?A[0]=_:_.isMatrix3?(A[0]=_.elements[0],A[1]=_.elements[1],A[2]=_.elements[2],A[3]=0,A[4]=_.elements[3],A[5]=_.elements[4],A[6]=_.elements[5],A[7]=0,A[8]=_.elements[6],A[9]=_.elements[7],A[10]=_.elements[8],A[11]=0):ArrayBuffer.isView(_)?A.set(new _.constructor(_.buffer,_.byteOffset,A.length)):_.toArray(A,R)}function b(_,A,R,T){const y=_.value,C=A+"_"+R;if(T[C]===void 0)return typeof y=="number"||typeof y=="boolean"?T[C]=y:ArrayBuffer.isView(y)?T[C]=y.slice():T[C]=y.clone(),!0;{const w=T[C];if(typeof y=="number"||typeof y=="boolean"){if(w!==y)return T[C]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(w.equals(y)===!1)return w.copy(y),!0}}return!1}function v(_){const A=_.uniforms;let R=0;const T=16;for(let C=0,w=A.length;C<w;C++){const D=Array.isArray(A[C])?A[C]:[A[C]];for(let P=0,G=D.length;P<G;P++){const O=D[P],z=Array.isArray(O.value)?O.value:[O.value];for(let B=0,I=z.length;B<I;B++){const U=z[B],X=d(U),oe=R%T,ce=oe%X.boundary,xe=oe+ce;R+=ce,xe!==0&&T-xe<X.storage&&(R+=T-xe),O.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=R,R+=X.storage}}}const y=R%T;return y>0&&(R+=T-y),_.__size=R,_.__cache={},this}function d(_){const A={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(A.boundary=4,A.storage=4):_.isVector2?(A.boundary=8,A.storage=8):_.isVector3||_.isColor?(A.boundary=16,A.storage=12):_.isVector4?(A.boundary=16,A.storage=16):_.isMatrix3?(A.boundary=48,A.storage=48):_.isMatrix4?(A.boundary=64,A.storage=64):_.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(A.boundary=16,A.storage=_.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",_),A}function x(_){const A=_.target;A.removeEventListener("dispose",x);const R=r.indexOf(A.__bindingPointIndex);r.splice(R,1),t.deleteBuffer(a[A.id]),delete a[A.id],delete s[A.id]}function M(){for(const _ in a)t.deleteBuffer(a[_]);r=[],a={},s={}}return{bind:l,update:c,dispose:M}}const a3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Xi=null;function s3(){return Xi===null&&(Xi=new Ty(a3,16,16,Ks,za),Xi.name="DFG_LUT",Xi.minFilter=wn,Xi.magFilter=wn,Xi.wrapS=Ta,Xi.wrapT=Ta,Xi.generateMipmaps=!1,Xi.needsUpdate=!0),Xi}class Hy{constructor(e={}){const{canvas:n=AT(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:f="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=bi}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const b=p,v=new Set([qm,jm,Wm]),d=new Set([bi,ea,Ll,Ol,Vm,km]),x=new Uint32Array(4),M=new Int32Array(4),_=new q;let A=null,R=null;const T=[],y=[];let C=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const w=this;let D=!1,P=null,G=null,O=null,z=null;this._outputColorSpace=mi;let B=0,I=0,U=null,X=-1,oe=null;const ce=new Zt,xe=new Zt;let ke=null;const Ke=new rt(0);let Be=0,se=n.width,_e=n.height,me=1,Le=null,ze=null;const Ie=new Zt(0,0,se,_e),xt=new Zt(0,0,se,_e);let We=!1;const lt=new Ay;let Ge=!1,qe=!1;const Ct=new Bt,mt=new q,zt=new Zt,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Rt=!1;function ye(){return U===null?me:1}let H=i;function nt(E,k){return n.getContext(E,k)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:f,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Hm}`),n.addEventListener("webglcontextlost",dt,!1),n.addEventListener("webglcontextrestored",Nt,!1),n.addEventListener("webglcontextcreationerror",Rn,!1),H===null){const k="webgl2";if(H=nt(k,E),H===null)throw nt(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw ht("WebGLRenderer: "+E.message),E}let Ve,N,S,W,Y,$,de,ge,ee,j,ne,ue,L,V,he,fe,Ce,F,pe,te,Q,ve,re;function Re(){Ve=new sC(H),Ve.init(),Q=new KR(H,Ve),N=new Qw(H,Ve,e,Q),S=new YR(H,Ve),N.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),G=H.createFramebuffer(),O=H.createFramebuffer(),z=H.createFramebuffer(),W=new lC(H),Y=new OR,$=new ZR(H,Ve,S,Y,N,Q,W),de=new aC(w),ge=new dA(H),ve=new Zw(H,ge),ee=new rC(H,ge,W,ve),j=new uC(H,ee,ge,ve,W),F=new cC(H,N,$),he=new Jw(Y),ne=new LR(w,de,Ve,N,ve,he),ue=new n3(w,Y),L=new zR,V=new VR(Ve),Ce=new Yw(w,de,S,j,g,l),fe=new qR(w,j,N),re=new i3(H,W,N,S),pe=new Kw(H,Ve,W),te=new oC(H,Ve,W),W.programs=ne.programs,w.capabilities=N,w.extensions=Ve,w.properties=Y,w.renderLists=L,w.shadowMap=fe,w.state=S,w.info=W}Re(),b!==bi&&(C=new dC(b,n.width,n.height,o,a,s));const Ne=new e3(w,H);this.xr=Ne,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(E){E!==void 0&&(me=E,this.setSize(se,_e,!1))},this.getSize=function(E){return E.set(se,_e)},this.setSize=function(E,k,J=!0){if(Ne.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}se=E,_e=k,n.width=Math.floor(E*me),n.height=Math.floor(k*me),J===!0&&(n.style.width=E+"px",n.style.height=k+"px"),C!==null&&C.setSize(n.width,n.height),this.setViewport(0,0,E,k)},this.getDrawingBufferSize=function(E){return E.set(se*me,_e*me).floor()},this.setDrawingBufferSize=function(E,k,J){se=E,_e=k,me=J,n.width=Math.floor(E*J),n.height=Math.floor(k*J),this.setViewport(0,0,E,k)},this.setEffects=function(E){if(b===bi){ht("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let k=0;k<E.length;k++)if(E[k].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(ce)},this.getViewport=function(E){return E.copy(Ie)},this.setViewport=function(E,k,J,Z){E.isVector4?Ie.set(E.x,E.y,E.z,E.w):Ie.set(E,k,J,Z),S.viewport(ce.copy(Ie).multiplyScalar(me).round())},this.getScissor=function(E){return E.copy(xt)},this.setScissor=function(E,k,J,Z){E.isVector4?xt.set(E.x,E.y,E.z,E.w):xt.set(E,k,J,Z),S.scissor(xe.copy(xt).multiplyScalar(me).round())},this.getScissorTest=function(){return We},this.setScissorTest=function(E){S.setScissorTest(We=E)},this.setOpaqueSort=function(E){Le=E},this.setTransparentSort=function(E){ze=E},this.getClearColor=function(E){return E.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(E=!0,k=!0,J=!0){let Z=0;if(E){let K=!1;if(U!==null){const Me=U.texture.format;K=v.has(Me)}if(K){const Me=U.texture.type,Ee=d.has(Me),Se=Ce.getClearColor(),De=Ce.getClearAlpha(),Oe=Se.r,Xe=Se.g,Qe=Se.b;Ee?(x[0]=Oe,x[1]=Xe,x[2]=Qe,x[3]=De,H.clearBufferuiv(H.COLOR,0,x)):(M[0]=Oe,M[1]=Xe,M[2]=Qe,M[3]=De,H.clearBufferiv(H.COLOR,0,M))}else Z|=H.COLOR_BUFFER_BIT}k&&(Z|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Z|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&H.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),P=E},this.dispose=function(){n.removeEventListener("webglcontextlost",dt,!1),n.removeEventListener("webglcontextrestored",Nt,!1),n.removeEventListener("webglcontextcreationerror",Rn,!1),Ce.dispose(),L.dispose(),V.dispose(),Y.dispose(),de.dispose(),j.dispose(),ve.dispose(),re.dispose(),ne.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",Fi),Ne.removeEventListener("sessionend",aa),ci.stop()};function dt(E){E.preventDefault(),j0("WebGLRenderer: Context Lost."),D=!0}function Nt(){j0("WebGLRenderer: Context Restored."),D=!1;const E=W.autoReset,k=fe.enabled,J=fe.autoUpdate,Z=fe.needsUpdate,K=fe.type;Re(),W.autoReset=E,fe.enabled=k,fe.autoUpdate=J,fe.needsUpdate=Z,fe.type=K}function Rn(E){ht("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Nn(E){const k=E.target;k.removeEventListener("dispose",Nn),Af(k)}function Af(E){ia(E),Y.remove(E)}function ia(E){const k=Y.get(E).programs;k!==void 0&&(k.forEach(function(J){ne.releaseProgram(J)}),E.isShaderMaterial&&ne.releaseShaderCache(E))}this.renderBufferDirect=function(E,k,J,Z,K,Me){k===null&&(k=Ot);const Ee=K.isMesh&&K.matrixWorld.determinantAffine()<0,Se=Do(E,k,J,Z,K);S.setMaterial(Z,Ee);let De=J.index,Oe=1;if(Z.wireframe===!0){if(De=ee.getWireframeAttribute(J),De===void 0)return;Oe=2}const Xe=J.drawRange,Qe=J.attributes.position;let Ue=Xe.start*Oe,pt=(Xe.start+Xe.count)*Oe;Me!==null&&(Ue=Math.max(Ue,Me.start*Oe),pt=Math.min(pt,(Me.start+Me.count)*Oe)),De!==null?(Ue=Math.max(Ue,0),pt=Math.min(pt,De.count)):Qe!=null&&(Ue=Math.max(Ue,0),pt=Math.min(pt,Qe.count));const Ht=pt-Ue;if(Ht<0||Ht===1/0)return;ve.setup(K,Z,Se,J,De);let bt,St=pe;if(De!==null&&(bt=ge.get(De),St=te,St.setIndex(bt)),K.isMesh)Z.wireframe===!0?(S.setLineWidth(Z.wireframeLinewidth*ye()),St.setMode(H.LINES)):St.setMode(H.TRIANGLES);else if(K.isLine){let fn=Z.linewidth;fn===void 0&&(fn=1),S.setLineWidth(fn*ye()),K.isLineSegments?St.setMode(H.LINES):K.isLineLoop?St.setMode(H.LINE_LOOP):St.setMode(H.LINE_STRIP)}else K.isPoints?St.setMode(H.POINTS):K.isSprite&&St.setMode(H.TRIANGLES);if(K.isBatchedMesh)if(Ve.get("WEBGL_multi_draw"))St.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const fn=K._multiDrawStarts,Te=K._multiDrawCounts,Un=K._multiDrawCount,it=De?ge.get(De).bytesPerElement:1,Qt=Y.get(Z).currentProgram.getUniforms();for(let Hn=0;Hn<Un;Hn++)Qt.setValue(H,"_gl_DrawID",Hn),St.render(fn[Hn]/it,Te[Hn])}else if(K.isInstancedMesh)St.renderInstances(Ue,Ht,K.count);else if(J.isInstancedBufferGeometry){const fn=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Te=Math.min(J.instanceCount,fn);St.renderInstances(Ue,Ht,Te)}else St.render(Ue,Ht)};function Kt(E,k,J){E.transparent===!0&&E.side===ya&&E.forceSinglePass===!1?(E.side=Yn,E.needsUpdate=!0,ui(E,k,J),E.side=xs,E.needsUpdate=!0,ui(E,k,J),E.side=ya):ui(E,k,J)}this.compile=function(E,k,J=null){J===null&&(J=E),R=V.get(J),R.init(k),y.push(R),J.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),E!==J&&E.traverseVisible(function(K){K.isLight&&K.layers.test(k.layers)&&(R.pushLight(K),K.castShadow&&R.pushShadow(K))}),R.setupLights();const Z=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Me=K.material;if(Me)if(Array.isArray(Me))for(let Ee=0;Ee<Me.length;Ee++){const Se=Me[Ee];Kt(Se,J,K),Z.add(Se)}else Kt(Me,J,K),Z.add(Me)}),R=y.pop(),Z},this.compileAsync=function(E,k,J=null){const Z=this.compile(E,k,J);return new Promise(K=>{function Me(){if(Z.forEach(function(Ee){Y.get(Ee).currentProgram.isReady()&&Z.delete(Ee)}),Z.size===0){K(E);return}setTimeout(Me,10)}Ve.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Ft=null;function Dn(E){Ft&&Ft(E)}function Fi(){ci.stop()}function aa(){ci.start()}const ci=new Uy;ci.setAnimationLoop(Dn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(E){Ft=E,Ne.setAnimationLoop(E),E===null?ci.stop():ci.start()},Ne.addEventListener("sessionstart",Fi),Ne.addEventListener("sessionend",aa),this.render=function(E,k){if(k!==void 0&&k.isCamera!==!0){ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;P!==null&&P.renderStart(E,k);const J=Ne.enabled===!0&&Ne.isPresenting===!0,Z=C!==null&&(U===null||J)&&C.begin(w,U);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(k),k=Ne.getCamera()),E.isScene===!0&&E.onBeforeRender(w,E,k,U),R=V.get(E,y.length),R.init(k),R.state.textureUnits=$.getTextureUnits(),y.push(R),Ct.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),lt.setFromProjectionMatrix(Ct,Ki,k.reversedDepth),qe=this.localClippingEnabled,Ge=he.init(this.clippingPlanes,qe),A=L.get(E,T.length),A.init(),T.push(A),Ne.enabled===!0&&Ne.isPresenting===!0){const Ee=w.xr.getDepthSensingMesh();Ee!==null&&sa(Ee,k,-1/0,w.sortObjects)}sa(E,k,0,w.sortObjects),A.finish(),w.sortObjects===!0&&A.sort(Le,ze,k.reversedDepth),Rt=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,Rt&&Ce.addToRenderList(A,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ge===!0&&he.beginShadows();const K=R.state.shadowsArray;if(fe.render(K,E,k),Ge===!0&&he.endShadows(),(Z&&C.hasRenderPass())===!1){const Ee=A.opaque,Se=A.transmissive;if(R.setupLights(),k.isArrayCamera){const De=k.cameras;if(Se.length>0)for(let Oe=0,Xe=De.length;Oe<Xe;Oe++){const Qe=De[Oe];ra(Ee,Se,E,Qe)}Rt&&Ce.render(E);for(let Oe=0,Xe=De.length;Oe<Xe;Oe++){const Qe=De[Oe];Ms(A,E,Qe,Qe.viewport)}}else Se.length>0&&ra(Ee,Se,E,k),Rt&&Ce.render(E),Ms(A,E,k)}U!==null&&I===0&&($.updateMultisampleRenderTarget(U),$.updateRenderTargetMipmap(U)),Z&&C.end(w),E.isScene===!0&&E.onAfterRender(w,E,k),ve.resetDefaultState(),X=-1,oe=null,y.pop(),y.length>0?(R=y[y.length-1],$.setTextureUnits(R.state.textureUnits),Ge===!0&&he.setGlobalState(w.clippingPlanes,R.state.camera)):R=null,T.pop(),T.length>0?A=T[T.length-1]:A=null,P!==null&&P.renderEnd()};function sa(E,k,J,Z){if(E.visible===!1)return;if(E.layers.test(k.layers)){if(E.isGroup)J=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(k);else if(E.isLightProbeGrid)R.pushLightProbeGrid(E);else if(E.isLight)R.pushLight(E),E.castShadow&&R.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||lt.intersectsSprite(E)){Z&&zt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ct);const Ee=j.update(E),Se=E.material;Se.visible&&A.push(E,Ee,Se,J,zt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||lt.intersectsObject(E))){const Ee=j.update(E),Se=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),zt.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),zt.copy(Ee.boundingSphere.center)),zt.applyMatrix4(E.matrixWorld).applyMatrix4(Ct)),Array.isArray(Se)){const De=Ee.groups;for(let Oe=0,Xe=De.length;Oe<Xe;Oe++){const Qe=De[Oe],Ue=Se[Qe.materialIndex];Ue&&Ue.visible&&A.push(E,Ee,Ue,J,zt.z,Qe)}}else Se.visible&&A.push(E,Ee,Se,J,zt.z,null)}}const Me=E.children;for(let Ee=0,Se=Me.length;Ee<Se;Ee++)sa(Me[Ee],k,J,Z)}function Ms(E,k,J,Z){const{opaque:K,transmissive:Me,transparent:Ee}=E;R.setupLightsView(J),Ge===!0&&he.setGlobalState(w.clippingPlanes,J),Z&&S.viewport(ce.copy(Z)),K.length>0&&bs(K,k,J),Me.length>0&&bs(Me,k,J),Ee.length>0&&bs(Ee,k,J),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function ra(E,k,J,Z){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[Z.id]===void 0){const Ue=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[Z.id]=new $i(1,1,{generateMipmaps:!0,type:Ue?za:bi,minFilter:zs,samples:Math.max(4,N.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace})}const Me=R.state.transmissionRenderTarget[Z.id],Ee=Z.viewport||ce;Me.setSize(Ee.z*w.transmissionResolutionScale,Ee.w*w.transmissionResolutionScale);const Se=w.getRenderTarget(),De=w.getActiveCubeFace(),Oe=w.getActiveMipmapLevel();w.setRenderTarget(Me),w.getClearColor(Ke),Be=w.getClearAlpha(),Be<1&&w.setClearColor(16777215,.5),w.clear(),Rt&&Ce.render(J);const Xe=w.toneMapping;w.toneMapping=Ji;const Qe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),R.setupLightsView(Z),Ge===!0&&he.setGlobalState(w.clippingPlanes,Z),bs(E,J,Z),$.updateMultisampleRenderTarget(Me),$.updateRenderTargetMipmap(Me),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let pt=0,Ht=k.length;pt<Ht;pt++){const bt=k[pt],{object:St,geometry:fn,material:Te,group:Un}=bt;if(Te.side===ya&&St.layers.test(Z.layers)){const it=Te.side;Te.side=Yn,Te.needsUpdate=!0,oa(St,J,Z,fn,Te,Un),Te.side=it,Te.needsUpdate=!0,Ue=!0}}Ue===!0&&($.updateMultisampleRenderTarget(Me),$.updateRenderTargetMipmap(Me))}w.setRenderTarget(Se,De,Oe),w.setClearColor(Ke,Be),Qe!==void 0&&(Z.viewport=Qe),w.toneMapping=Xe}function bs(E,k,J){const Z=k.isScene===!0?k.overrideMaterial:null;for(let K=0,Me=E.length;K<Me;K++){const Ee=E[K],{object:Se,geometry:De,group:Oe}=Ee;let Xe=Ee.material;Xe.allowOverride===!0&&Z!==null&&(Xe=Z),Se.layers.test(J.layers)&&oa(Se,k,J,De,Xe,Oe)}}function oa(E,k,J,Z,K,Me){E.onBeforeRender(w,k,J,Z,K,Me),E.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(w,k,J,Z,E,Me),K.transparent===!0&&K.side===ya&&K.forceSinglePass===!1?(K.side=Yn,K.needsUpdate=!0,w.renderBufferDirect(J,k,Z,K,E,Me),K.side=xs,K.needsUpdate=!0,w.renderBufferDirect(J,k,Z,K,E,Me),K.side=ya):w.renderBufferDirect(J,k,Z,K,E,Me),E.onAfterRender(w,k,J,Z,K,Me)}function ui(E,k,J){k.isScene!==!0&&(k=Ot);const Z=Y.get(E),K=R.state.lights,Me=R.state.shadowsArray,Ee=K.state.version,Se=ne.getParameters(E,K.state,Me,k,J,R.state.lightProbeGridArray),De=ne.getProgramCacheKey(Se);let Oe=Z.programs;Z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?k.environment:null,Z.fog=k.fog;const Xe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Z.envMap=de.get(E.envMap||Z.environment,Xe),Z.envMapRotation=Z.environment!==null&&E.envMap===null?k.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",Nn),Oe=new Map,Z.programs=Oe);let Qe=Oe.get(De);if(Qe!==void 0){if(Z.currentProgram===Qe&&Z.lightsStateVersion===Ee)return No(E,Se),Qe}else Se.uniforms=ne.getUniforms(E),P!==null&&E.isNodeMaterial&&P.build(E,J,Se),E.onBeforeCompile(Se,w),Qe=ne.acquireProgram(Se,De),Oe.set(De,Qe),Z.uniforms=Se.uniforms;const Ue=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ue.clippingPlanes=he.uniform),No(E,Se),Z.needsLights=Ql(E),Z.lightsStateVersion=Ee,Z.needsLights&&(Ue.ambientLightColor.value=K.state.ambient,Ue.lightProbe.value=K.state.probe,Ue.directionalLights.value=K.state.directional,Ue.directionalLightShadows.value=K.state.directionalShadow,Ue.spotLights.value=K.state.spot,Ue.spotLightShadows.value=K.state.spotShadow,Ue.rectAreaLights.value=K.state.rectArea,Ue.ltc_1.value=K.state.rectAreaLTC1,Ue.ltc_2.value=K.state.rectAreaLTC2,Ue.pointLights.value=K.state.point,Ue.pointLightShadows.value=K.state.pointShadow,Ue.hemisphereLights.value=K.state.hemi,Ue.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ue.spotLightMatrix.value=K.state.spotLightMatrix,Ue.spotLightMap.value=K.state.spotLightMap,Ue.pointShadowMatrix.value=K.state.pointShadowMatrix),Z.lightProbeGrid=R.state.lightProbeGridArray.length>0,Z.currentProgram=Qe,Z.uniformsList=null,Qe}function Hi(E){if(E.uniformsList===null){const k=E.currentProgram.getUniforms();E.uniformsList=pu.seqWithValue(k.seq,E.uniforms)}return E.uniformsList}function No(E,k){const J=Y.get(E);J.outputColorSpace=k.outputColorSpace,J.batching=k.batching,J.batchingColor=k.batchingColor,J.instancing=k.instancing,J.instancingColor=k.instancingColor,J.instancingMorph=k.instancingMorph,J.skinning=k.skinning,J.morphTargets=k.morphTargets,J.morphNormals=k.morphNormals,J.morphColors=k.morphColors,J.morphTargetsCount=k.morphTargetsCount,J.numClippingPlanes=k.numClippingPlanes,J.numIntersection=k.numClipIntersection,J.vertexAlphas=k.vertexAlphas,J.vertexTangents=k.vertexTangents,J.toneMapping=k.toneMapping}function Kl(E,k){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;_.setFromMatrixPosition(k.matrixWorld);for(let J=0,Z=E.length;J<Z;J++){const K=E[J];if(K.texture!==null&&K.boundingBox.containsPoint(_))return K}return null}function Do(E,k,J,Z,K){k.isScene!==!0&&(k=Ot),$.resetTextureUnits();const Me=k.fog,Ee=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?k.environment:null,Se=U===null?w.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ct.workingColorSpace,De=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Oe=de.get(Z.envMap||Ee,De),Xe=Z.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Qe=!!J.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ue=!!J.morphAttributes.position,pt=!!J.morphAttributes.normal,Ht=!!J.morphAttributes.color;let bt=Ji;Z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(bt=w.toneMapping);const St=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,fn=St!==void 0?St.length:0,Te=Y.get(Z),Un=R.state.lights;if(Ge===!0&&(qe===!0||E!==oe)){const Dt=E===oe&&Z.id===X;he.setState(Z,E,Dt)}let it=!1;Z.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Un.state.version||Te.outputColorSpace!==Se||K.isBatchedMesh&&Te.batching===!1||!K.isBatchedMesh&&Te.batching===!0||K.isBatchedMesh&&Te.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Te.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Te.instancing===!1||!K.isInstancedMesh&&Te.instancing===!0||K.isSkinnedMesh&&Te.skinning===!1||!K.isSkinnedMesh&&Te.skinning===!0||K.isInstancedMesh&&Te.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Te.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Te.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Te.instancingMorph===!1&&K.morphTexture!==null||Te.envMap!==Oe||Z.fog===!0&&Te.fog!==Me||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==he.numPlanes||Te.numIntersection!==he.numIntersection)||Te.vertexAlphas!==Xe||Te.vertexTangents!==Qe||Te.morphTargets!==Ue||Te.morphNormals!==pt||Te.morphColors!==Ht||Te.toneMapping!==bt||Te.morphTargetsCount!==fn||!!Te.lightProbeGrid!=R.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Te.__version=Z.version);let Qt=Te.currentProgram;it===!0&&(Qt=ui(Z,k,K),P&&Z.isNodeMaterial&&P.onUpdateProgram(Z,Qt,Te));let Hn=!1,Gi=!1,Gn=!1;const yt=Qt.getUniforms(),Et=Te.uniforms;if(S.useProgram(Qt.program)&&(Hn=!0,Gi=!0,Gn=!0),Z.id!==X&&(X=Z.id,Gi=!0),Te.needsLights){const Dt=Kl(R.state.lightProbeGridArray,K);Te.lightProbeGrid!==Dt&&(Te.lightProbeGrid=Dt,Gi=!0)}if(Hn||oe!==E){S.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),yt.setValue(H,"projectionMatrix",E.projectionMatrix),yt.setValue(H,"viewMatrix",E.matrixWorldInverse);const Ni=yt.map.cameraPosition;Ni!==void 0&&Ni.setValue(H,mt.setFromMatrixPosition(E.matrixWorld)),N.logarithmicDepthBuffer&&yt.setValue(H,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&yt.setValue(H,"isOrthographic",E.isOrthographicCamera===!0),oe!==E&&(oe=E,Gi=!0,Gn=!0)}if(Te.needsLights&&(Un.state.directionalShadowMap.length>0&&yt.setValue(H,"directionalShadowMap",Un.state.directionalShadowMap,$),Un.state.spotShadowMap.length>0&&yt.setValue(H,"spotShadowMap",Un.state.spotShadowMap,$),Un.state.pointShadowMap.length>0&&yt.setValue(H,"pointShadowMap",Un.state.pointShadowMap,$)),K.isSkinnedMesh){yt.setOptional(H,K,"bindMatrix"),yt.setOptional(H,K,"bindMatrixInverse");const Dt=K.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),yt.setValue(H,"boneTexture",Dt.boneTexture,$))}K.isBatchedMesh&&(yt.setOptional(H,K,"batchingTexture"),yt.setValue(H,"batchingTexture",K._matricesTexture,$),yt.setOptional(H,K,"batchingIdTexture"),yt.setValue(H,"batchingIdTexture",K._indirectTexture,$),yt.setOptional(H,K,"batchingColorTexture"),K._colorsTexture!==null&&yt.setValue(H,"batchingColorTexture",K._colorsTexture,$));const Vi=J.morphAttributes;if((Vi.position!==void 0||Vi.normal!==void 0||Vi.color!==void 0)&&F.update(K,J,Qt),(Gi||Te.receiveShadow!==K.receiveShadow)&&(Te.receiveShadow=K.receiveShadow,yt.setValue(H,"receiveShadow",K.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&k.environment!==null&&(Et.envMapIntensity.value=k.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=s3()),Gi){if(yt.setValue(H,"toneMappingExposure",w.toneMappingExposure),Te.needsLights&&lr(Et,Gn),Me&&Z.fog===!0&&ue.refreshFogUniforms(Et,Me),ue.refreshMaterialUniforms(Et,Z,me,_e,R.state.transmissionRenderTarget[E.id]),Te.needsLights&&Te.lightProbeGrid){const Dt=Te.lightProbeGrid;Et.probesSH.value=Dt.texture,Et.probesMin.value.copy(Dt.boundingBox.min),Et.probesMax.value.copy(Dt.boundingBox.max),Et.probesResolution.value.copy(Dt.resolution)}pu.upload(H,Hi(Te),Et,$)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(pu.upload(H,Hi(Te),Et,$),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&yt.setValue(H,"center",K.center),yt.setValue(H,"modelViewMatrix",K.modelViewMatrix),yt.setValue(H,"normalMatrix",K.normalMatrix),yt.setValue(H,"modelMatrix",K.matrixWorld),Z.uniformsGroups!==void 0){const Dt=Z.uniformsGroups;for(let Ni=0,fi=Dt.length;Ni<fi;Ni++){const Uo=Dt[Ni];re.update(Uo,Qt),re.bind(Uo,Qt)}}return Qt}function lr(E,k){E.ambientLightColor.needsUpdate=k,E.lightProbe.needsUpdate=k,E.directionalLights.needsUpdate=k,E.directionalLightShadows.needsUpdate=k,E.pointLights.needsUpdate=k,E.pointLightShadows.needsUpdate=k,E.spotLights.needsUpdate=k,E.spotLightShadows.needsUpdate=k,E.rectAreaLights.needsUpdate=k,E.hemisphereLights.needsUpdate=k}function Ql(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,k,J){const Z=Y.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Y.get(E.texture).__webglTexture=k,Y.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:J,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,k){const J=Y.get(E);J.__webglFramebuffer=k,J.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(E,k=0,J=0){U=E,B=k,I=J;let Z=null,K=!1,Me=!1;if(E){const Se=Y.get(E);if(Se.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(H.FRAMEBUFFER,Se.__webglFramebuffer),ce.copy(E.viewport),xe.copy(E.scissor),ke=E.scissorTest,S.viewport(ce),S.scissor(xe),S.setScissorTest(ke),X=-1;return}else if(Se.__webglFramebuffer===void 0)$.setupRenderTarget(E);else if(Se.__hasExternalTextures)$.rebindTextures(E,Y.get(E.texture).__webglTexture,Y.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Xe=E.depthTexture;if(Se.__boundDepthTexture!==Xe){if(Xe!==null&&Y.has(Xe)&&(E.width!==Xe.image.width||E.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");$.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Me=!0);const Oe=Y.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Oe[k])?Z=Oe[k][J]:Z=Oe[k],K=!0):E.samples>0&&$.useMultisampledRTT(E)===!1?Z=Y.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?Z=Oe[J]:Z=Oe,ce.copy(E.viewport),xe.copy(E.scissor),ke=E.scissorTest}else ce.copy(Ie).multiplyScalar(me).floor(),xe.copy(xt).multiplyScalar(me).floor(),ke=We;if(J!==0&&(Z=G),S.bindFramebuffer(H.FRAMEBUFFER,Z)&&S.drawBuffers(E,Z),S.viewport(ce),S.scissor(xe),S.setScissorTest(ke),K){const Se=Y.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+k,Se.__webglTexture,J)}else if(Me){const Se=k;for(let De=0;De<E.textures.length;De++){const Oe=Y.get(E.textures[De]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+De,Oe.__webglTexture,J,Se)}}else if(E!==null&&J!==0){const Se=Y.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Se.__webglTexture,J)}X=-1},this.readRenderTargetPixels=function(E,k,J,Z,K,Me,Ee,Se=0){if(!(E&&E.isWebGLRenderTarget)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De){S.bindFramebuffer(H.FRAMEBUFFER,De);try{const Oe=E.textures[Se],Xe=Oe.format,Qe=Oe.type;if(E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Se),!N.textureFormatReadable(Xe)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!N.textureTypeReadable(Qe)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=E.width-Z&&J>=0&&J<=E.height-K&&H.readPixels(k,J,Z,K,Q.convert(Xe),Q.convert(Qe),Me)}finally{const Oe=U!==null?Y.get(U).__webglFramebuffer:null;S.bindFramebuffer(H.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,k,J,Z,K,Me,Ee,Se=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De)if(k>=0&&k<=E.width-Z&&J>=0&&J<=E.height-K){S.bindFramebuffer(H.FRAMEBUFFER,De);const Oe=E.textures[Se],Xe=Oe.format,Qe=Oe.type;if(E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Se),!N.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!N.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Ue),H.bufferData(H.PIXEL_PACK_BUFFER,Me.byteLength,H.STREAM_READ),H.readPixels(k,J,Z,K,Q.convert(Xe),Q.convert(Qe),0);const pt=U!==null?Y.get(U).__webglFramebuffer:null;S.bindFramebuffer(H.FRAMEBUFFER,pt);const Ht=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await wT(H,Ht,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Ue),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Me),H.deleteBuffer(Ue),H.deleteSync(Ht),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,k=null,J=0){const Z=Math.pow(2,-J),K=Math.floor(E.image.width*Z),Me=Math.floor(E.image.height*Z),Ee=k!==null?k.x:0,Se=k!==null?k.y:0;$.setTexture2D(E,0),H.copyTexSubImage2D(H.TEXTURE_2D,J,0,0,Ee,Se,K,Me),S.unbindTexture()},this.copyTextureToTexture=function(E,k,J=null,Z=null,K=0,Me=0){let Ee,Se,De,Oe,Xe,Qe,Ue,pt,Ht;const bt=E.isCompressedTexture?E.mipmaps[Me]:E.image;if(J!==null)Ee=J.max.x-J.min.x,Se=J.max.y-J.min.y,De=J.isBox3?J.max.z-J.min.z:1,Oe=J.min.x,Xe=J.min.y,Qe=J.isBox3?J.min.z:0;else{const Et=Math.pow(2,-K);Ee=Math.floor(bt.width*Et),Se=Math.floor(bt.height*Et),E.isDataArrayTexture?De=bt.depth:E.isData3DTexture?De=Math.floor(bt.depth*Et):De=1,Oe=0,Xe=0,Qe=0}Z!==null?(Ue=Z.x,pt=Z.y,Ht=Z.z):(Ue=0,pt=0,Ht=0);const St=Q.convert(k.format),fn=Q.convert(k.type);let Te;k.isData3DTexture?($.setTexture3D(k,0),Te=H.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?($.setTexture2DArray(k,0),Te=H.TEXTURE_2D_ARRAY):($.setTexture2D(k,0),Te=H.TEXTURE_2D),S.activeTexture(H.TEXTURE0),S.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,k.flipY),S.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),S.pixelStorei(H.UNPACK_ALIGNMENT,k.unpackAlignment);const Un=S.getParameter(H.UNPACK_ROW_LENGTH),it=S.getParameter(H.UNPACK_IMAGE_HEIGHT),Qt=S.getParameter(H.UNPACK_SKIP_PIXELS),Hn=S.getParameter(H.UNPACK_SKIP_ROWS),Gi=S.getParameter(H.UNPACK_SKIP_IMAGES);S.pixelStorei(H.UNPACK_ROW_LENGTH,bt.width),S.pixelStorei(H.UNPACK_IMAGE_HEIGHT,bt.height),S.pixelStorei(H.UNPACK_SKIP_PIXELS,Oe),S.pixelStorei(H.UNPACK_SKIP_ROWS,Xe),S.pixelStorei(H.UNPACK_SKIP_IMAGES,Qe);const Gn=E.isDataArrayTexture||E.isData3DTexture,yt=k.isDataArrayTexture||k.isData3DTexture;if(E.isDepthTexture){const Et=Y.get(E),Vi=Y.get(k),Dt=Y.get(Et.__renderTarget),Ni=Y.get(Vi.__renderTarget);S.bindFramebuffer(H.READ_FRAMEBUFFER,Dt.__webglFramebuffer),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ni.__webglFramebuffer);for(let fi=0;fi<De;fi++)Gn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(E).__webglTexture,K,Qe+fi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(k).__webglTexture,Me,Ht+fi)),H.blitFramebuffer(Oe,Xe,Ee,Se,Ue,pt,Ee,Se,H.DEPTH_BUFFER_BIT,H.NEAREST);S.bindFramebuffer(H.READ_FRAMEBUFFER,null),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||Y.has(E)){const Et=Y.get(E),Vi=Y.get(k);S.bindFramebuffer(H.READ_FRAMEBUFFER,O),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,z);for(let Dt=0;Dt<De;Dt++)Gn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Et.__webglTexture,K,Qe+Dt):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Et.__webglTexture,K),yt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Vi.__webglTexture,Me,Ht+Dt):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Vi.__webglTexture,Me),K!==0?H.blitFramebuffer(Oe,Xe,Ee,Se,Ue,pt,Ee,Se,H.COLOR_BUFFER_BIT,H.NEAREST):yt?H.copyTexSubImage3D(Te,Me,Ue,pt,Ht+Dt,Oe,Xe,Ee,Se):H.copyTexSubImage2D(Te,Me,Ue,pt,Oe,Xe,Ee,Se);S.bindFramebuffer(H.READ_FRAMEBUFFER,null),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else yt?E.isDataTexture||E.isData3DTexture?H.texSubImage3D(Te,Me,Ue,pt,Ht,Ee,Se,De,St,fn,bt.data):k.isCompressedArrayTexture?H.compressedTexSubImage3D(Te,Me,Ue,pt,Ht,Ee,Se,De,St,bt.data):H.texSubImage3D(Te,Me,Ue,pt,Ht,Ee,Se,De,St,fn,bt):E.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Me,Ue,pt,Ee,Se,St,fn,bt.data):E.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Me,Ue,pt,bt.width,bt.height,St,bt.data):H.texSubImage2D(H.TEXTURE_2D,Me,Ue,pt,Ee,Se,St,fn,bt);S.pixelStorei(H.UNPACK_ROW_LENGTH,Un),S.pixelStorei(H.UNPACK_IMAGE_HEIGHT,it),S.pixelStorei(H.UNPACK_SKIP_PIXELS,Qt),S.pixelStorei(H.UNPACK_SKIP_ROWS,Hn),S.pixelStorei(H.UNPACK_SKIP_IMAGES,Gi),Me===0&&k.generateMipmaps&&H.generateMipmap(Te),S.unbindTexture()},this.initRenderTarget=function(E){Y.get(E).__webglFramebuffer===void 0&&$.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?$.setTextureCube(E,0):E.isData3DTexture?$.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?$.setTexture2DArray(E,0):$.setTexture2D(E,0),S.unbindTexture()},this.resetState=function(){B=0,I=0,U=null,S.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ki}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),n.unpackColorSpace=ct._getUnpackColorSpace()}}function r3(t,e=300){if(!t||!Array.isArray(t.nodes)||!Array.isArray(t.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=t.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,e),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,f,h,u;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((f=l.properties)==null?void 0:f.filePath)||(l.uri&&l.uri.startsWith("file://")?l.uri.replace(/^file:\/\//,""):l.uri&&l.uri.startsWith("symbol://")?l.uri.replace(/^symbol:\/\//,"").split("#")[0]:l.uri)||"",line:((h=l.properties)==null?void 0:h.line)||null,status:((u=l.properties)==null?void 0:u.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:t.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:t.edges.length}}function o3(t){const{CLUSTERS:e,NODES:n,EDGES:i,META:a}=r3(t);let s="dark";for(const w of e)w.color=w[s];const r=Object.fromEntries(e.map(w=>[w.id,w])),o=n.map(([w,D,P,G],O)=>({i:O,id:w,name:a[w].label,cid:D,w:P,desc:G,cluster:r[D],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(w=>[w.id,w]));for(const w of o)w.meta=a[w.id]||{};const c=[];for(const[w,D,P]of i){const G=l[w],O=l[D];if(!G||!O){console.warn("[atlas] Dropped invalid edge:",w,"→",D);continue}c.push({s:G,t:O,kind:P,i:c.length,alpha:1}),P==="pre"?(G.out.push(O),O.in.push(G)):(G.rel.push(O),O.rel.push(G))}const f=w=>w.out.length+w.in.length+w.rel.length,h=o.map(()=>[]);for(const w of c)h[w.s.i].push(w.t.i),h[w.t.i].push(w.s.i);const u=42;for(const w of e){const[D,P,G]=w.anchor,O=Math.hypot(D,P,G)||1;w.dir=[D/O,P/O,G/O]}const p=new Array(o.length).fill(-1);(function(){let D=!0,P=0;for(const G of o)G.in.length||(p[G.i]=0);for(;D&&P++<40;){D=!1;for(const G of o){let O=G.in.length?-1:0;for(const z of G.in)p[z.i]>=0&&(O=Math.max(O,p[z.i]+1));O>=0&&O!==p[G.i]&&(p[G.i]=O,D=!0)}}for(let G=0;G<p.length;G++)p[G]<0&&(p[G]=2)})();const g=Math.max(1,...p),b={atlas:[],shell:[],tier:[]};o.forEach((w,D)=>{const P=w.cluster.dir,G=1-Math.min(f(w),12)/26;b.atlas.push([P[0]*u*G,P[1]*u*G,P[2]*u*G]);const O=e.indexOf(w.cluster),z=o.filter(X=>X.cid===w.cid).indexOf(w),B=o.filter(X=>X.cid===w.cid).length,I=(O/e.length+z/B/e.length)*Math.PI*2,U=(z/B-.5)*1.5;b.shell.push([u*.95*Math.cos(U)*Math.cos(I),u*.95*Math.sin(U),u*.95*Math.cos(U)*Math.sin(I)]),b.tier.push([P[0]*u*.72,(p[D]/g-.5)*u*1.5,P[2]*u*.72])});let v="atlas";o.forEach((w,D)=>{const P=b.atlas[D];w.x=P[0]+(Math.random()-.5)*16,w.y=P[1]+(Math.random()-.5)*16,w.z=P[2]+(Math.random()-.5)*16});let d=1;const x=9,M=.04,_=130,A=.05;function R(){if(d<.004)return;const w=b[v];for(let D=0;D<o.length;D++){const P=o[D];for(let G=D+1;G<o.length;G++){const O=o[G];let z=P.x-O.x,B=P.y-O.y,I=P.z-O.z,U=z*z+B*B+I*I+.6;const X=_/U,oe=Math.sqrt(U);z/=oe,B/=oe,I/=oe,P.vx+=z*X,P.vy+=B*X,P.vz+=I*X,O.vx-=z*X,O.vy-=B*X,O.vz-=I*X}}for(const D of c){const P=D.s,G=D.t;let O=G.x-P.x,z=G.y-P.y,B=G.z-P.z;const I=Math.hypot(O,z,B)||1,U=(I-x)*M;O/=I,z/=I,B/=I,P.vx+=O*U,P.vy+=z*U,P.vz+=B*U,G.vx-=O*U,G.vy-=z*U,G.vz-=B*U}for(let D=0;D<o.length;D++){const P=o[D],G=w[D];P.vx+=(G[0]-P.x)*A,P.vy+=(G[1]-P.y)*A,P.vz+=(G[2]-P.z)*A;const O=.82;P.vx*=O,P.vy*=O,P.vz*=O,P.x+=P.vx*d,P.y+=P.vy*d,P.z+=P.vz*d}d*=.988}for(let w=0;w<220;w++)R();const T=46;function y(){let w=0;for(const D of o)w=Math.max(w,Math.hypot(D.x,D.y,D.z));return Math.max(10,w)/Math.sin(T*Math.PI/360)*.88}function C({els:w,emit:D}){const P=new AbortController,{signal:G}=P,O=(nt,Ve,N,S)=>nt.addEventListener(Ve,N,{...S,signal:G});let z=0;const{stage:B}=w;let I,U,X,oe,ce,xe,ke=!0;try{I=new Hy({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{ke=!1}if(I||(ke=!1),!ke)return D.gate(!0),{dispose(){}};{let bs=function(ie,Pe){const Ae=j.uniforms.uPx.value;for(const we of o){ra.set(we.x,we.y,we.z);const $e=X.position.distanceTo(ra);ra.project(X),we.sx=(ra.x*.5+.5)*ie,we.sy=(-ra.y*.5+.5)*Pe,we.sz=ra.z,we.sr=we.size*we.scale*Ae/Math.max($e,1)*.5}},Kl=function(){oa.fill(1),ui.fill(1),Hi.fill(1);const ie=No,Pe=Ae=>!ie||Ae.name.toLowerCase().includes(ie)||Ae.desc.toLowerCase().includes(ie)||(Ae.meta.path||"").toLowerCase().includes(ie)||(Ae.meta.kind||"").toLowerCase().includes(ie);for(const Ae of o)Ae.vis=!sa.has(Ae.cid)&&Pe(Ae),Ae.vis||(oa[Ae.i]=0,ui[Ae.i]=.6);for(const Ae of c)(!Ae.s.vis||!Ae.t.vis)&&(Hi[Ae.i]=0);if(Dn){for(const Ae of o)Ae.vis&&(oa[Ae.i]=Dn.has(Ae.i)?1:Ms,ui[Ae.i]=Dn.has(Ae.i)?1.25:.8);for(const Ae of c)Hi[Ae.i]&&(Hi[Ae.i]=Dn.has(Ae.s.i)&&Dn.has(Ae.t.i)?1.35:Ms*.5)}else if(Ft){const Ae=new Set([Ft.i,...h[Ft.i]]);for(const we of o)we.vis&&(oa[we.i]=Ae.has(we.i)?1:Ms,ui[we.i]=we===Ft?1.75:Ae.has(we.i)?1.15:.75);for(const we of c)Hi[we.i]&&(Hi[we.i]=we.s===Ft||we.t===Ft?1.4:Ms*.45)}return Kt&&Kt.vis&&(oa[Kt.i]=1,ui[Kt.i]=Math.max(ui[Kt.i],1.6)),{nT:oa,sT:ui,eT:Hi}},Do=function(ie){Ft=ie,Dn=null,w.pathbar.classList.remove("on"),Q.tx=ie.x,Q.ty=ie.y,Q.tz=ie.z,Q.tDist=Math.min(Q.tDist,te*.72),fi(ie),Et(),Gn()},lr=function(){Ft=null,Dn=null,Q.tx=Q.ty=Q.tz=0,w.pathbar.classList.remove("on"),fi(null),Et(),Gn()},Ql=function(ie,Pe){const Ae=new Array(o.length).fill(-1),we=new Set([ie.i]),$e=[ie.i];for(;$e.length;){const di=$e.shift();if(di===Pe.i)break;for(const dn of h[di])!we.has(dn)&&o[dn].vis&&(we.add(dn),Ae[dn]=di,$e.push(dn))}if(!we.has(Pe.i)){w.chain.textContent="Keine Kausalkette zwischen diesen Objekten",w.pathbar.classList.add("on");return}const Ln=[];let et=Pe.i;for(;et!==-1&&(Ln.unshift(et),et!==ie.i);)et=Ae[et];Dn=new Set(Ln),w.chain.textContent=Ln.map(di=>o[di].name).join(" → "),w.pathbar.classList.add("on"),Gn()},E=function(){Dn=null,w.pathbar.classList.remove("on"),Gn()},Me=function(ie,Pe){let Ae=0;const we=new Set;aa&&K.forEach(et=>we.add(et)),Ft&&(we.add(Ft.i),h[Ft.i].forEach(et=>we.add(et))),Dn&&Dn.forEach(et=>we.add(et)),Kt&&we.add(Kt.i);const $e=[...we].map(et=>o[et]).filter(et=>et.vis&&et.sz<1&&et.sx>-60&&et.sx<ie+60&&et.sy>-20&&et.sy<Pe+20).sort((et,di)=>et.sz-di.sz),Ln=[];for(const et of $e){if(Ae>=Z.length)break;const di=et.name.length*11.5+8,dn=[et.sx-di/2,et.sy-18,di,16];if(Ln.some(Jt=>dn[0]<Jt[0]+Jt[2]&&dn[0]+dn[2]>Jt[0]&&dn[1]<Jt[1]+Jt[3]&&dn[1]+dn[3]>Jt[1]))continue;Ln.push(dn);const Ye=Z[Ae++];Ye.textContent=et.name,Ye.className="lab"+(et===Kt||et===Ft?"":" sm"),Ye.style.transform=`translate(-50%,-50%) translate(${et.sx.toFixed(1)}px,${(et.sy-17).toFixed(1)}px)`,Ye.style.opacity=Math.min(1,et.alpha*1.3),Ye.style.color=et===Kt||et===Ft?et.cluster.color:""}for(;Ae<Z.length;Ae++)Z[Ae].style.opacity=0},Ht=function(ie){z=requestAnimationFrame(Ht);const Pe=Math.min(.05,(ie-Ee)/1e3);Ee=ie;const Ae=B.clientWidth,we=B.clientHeight;if(!Ae||!we)return;I.domElement.width!==Math.round(Ae*I.getPixelRatio())&&(I.setSize(Ae,we,!1),X.aspect=Ae/we,X.updateProjectionMatrix(),ee.uniforms.uPx.value=j.uniforms.uPx.value=we/(2*Math.tan(X.fov*Math.PI/360))),R(),Fi&&(Q.tTheta+=Pe*.09);const $e=1-Math.pow(.0016,Pe);if(Q.theta+=(Q.tTheta-Q.theta)*$e,Q.phi+=(Q.tPhi-Q.phi)*$e,Q.dist+=(Q.tDist-Q.dist)*$e,Q.cx+=(Q.tx-Q.cx)*$e,Q.cy+=(Q.ty-Q.cy)*$e,Q.cz+=(Q.tz-Q.cz)*$e,X.position.set(Q.cx+Q.dist*Math.sin(Q.phi)*Math.cos(Q.theta),Q.cy+Q.dist*Math.cos(Q.phi),Q.cz+Q.dist*Math.sin(Q.phi)*Math.sin(Q.theta)),X.lookAt(Q.cx,Q.cy,Q.cz),bs(Ae,we),ia.live&&!ve){let Ye=null;for(const Jt of o){if(!Jt.vis||Jt.sz>1)continue;const og=Jt.sx-ia.x,lg=Jt.sy-ia.y,cg=Jt.sr+7;og*og+lg*lg>cg*cg||(!Ye||Jt.sz<Ye.sz)&&(Ye=Jt)}Ye!==Kt&&(Kt=Ye,dt.style.cursor=Ye?"pointer":"grab",Gn())}const{nT:Ln,sT:et,eT:di}=Kl(),dn=1-Math.pow(.002,Pe);for(const Ye of o)Ye.alpha+=(Ln[Ye.i]-Ye.alpha)*dn,Ye.scale+=(et[Ye.i]-Ye.scale)*dn,Oe.array[Ye.i*3]=Ye.x,Oe.array[Ye.i*3+1]=Ye.y,Oe.array[Ye.i*3+2]=Ye.z,Xe.array[Ye.i]=Ye.alpha,Qe.array[Ye.i]=Ye.scale;Oe.needsUpdate=Xe.needsUpdate=Qe.needsUpdate=!0;for(const Ye of c){Ye.alpha+=(di[Ye.i]-Ye.alpha)*dn;const Jt=Ye.i*6;Ue.array[Jt]=Ye.s.x,Ue.array[Jt+1]=Ye.s.y,Ue.array[Jt+2]=Ye.s.z,Ue.array[Jt+3]=Ye.t.x,Ue.array[Jt+4]=Ye.t.y,Ue.array[Jt+5]=Ye.t.z,pt.array[Ye.i*2]=pt.array[Ye.i*2+1]=Ye.alpha}Ue.needsUpdate=pt.needsUpdate=!0,pe.uniforms.uTime.value=ie/1e3,pe.uniforms.uFlow.value+=((ci?1:0)-pe.uniforms.uFlow.value)*dn,Me(Ae,we),I.render(U,X),Se+=1/Math.max(Pe,1e-4),De++,De>=30&&(w.sFps.textContent=Math.round(Se/De),Se=De=0)},bt=function(ie=.55){d=Math.max(d,ie)},St=function(ie){v=ie,w.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[v],bt(1)},it=function(){Q.tTheta=.7,Q.tPhi=1.15,Q.tDist=y(),lr(),bt(.8),Rn()},Qt=function(){D.tools({flow:ci,label:aa,spin:Fi})},Hn=function(ie){s=ie,document.documentElement.dataset.theme=ie,D.theme(ie);const Pe=ie==="light";for(const $e of e)$e.color=$e[ie];o.forEach(($e,Ln)=>{const et=nt($e.cluster.color);S[Ln*3]=et[0],S[Ln*3+1]=et[1],S[Ln*3+2]=et[2]}),de.getAttribute("aColor").needsUpdate=!0,c.forEach(($e,Ln)=>{L.set(nt($e.s.cluster.color),Ln*6),L.set(nt($e.t.cluster.color),Ln*6+3)}),F.getAttribute("aColor").needsUpdate=!0;const Ae=Pe?ks:kr;for(const $e of[ee,j,pe])$e.uniforms.uLight.value=Pe?1:0,$e.blending=Ae,$e.needsUpdate=!0;const we=Pe?16053489:328967;I.setClearColor(we,1),U.fog.color.setHex(we),U.fog.density=Pe?.0042:.0068,Et(),Ft&&fi(Ft)},Gn=function(){w.hudSel.textContent=Dn?`Kausalkette · ${Dn.size} Stationen`:Ft?Ft.name:Kt?Kt.name:"Nichts ausgewählt"},yt=function(ie){sa.has(ie)?sa.delete(ie):sa.add(ie),Et(),bt(.4)},Et=function(){const ie=w.q.value.trim().toLowerCase(),Pe=o.filter(we=>!sa.has(we.cid)&&(!ie||we.name.toLowerCase().includes(ie)||we.desc.toLowerCase().includes(ie))).sort((we,$e)=>f($e)-f(we));D.list({q:ie,rows:Pe.map(we=>({i:we.i,name:we.name,color:we.cluster.color,deg:f(we),on:we===Ft}))}),w.sNode.textContent=Pe.length;const Ae=c.filter(we=>Pe.includes(we.s)&&Pe.includes(we.t)).length;w.sEdge.textContent=Ae,w.sDeg.textContent=Pe.length?(Ae*2/Pe.length).toFixed(1):"0"},Ni=function(ie){No=ie.trim().toLowerCase(),Et(),bt(.25)},fi=function(ie){D.drawer(ie&&{i:ie.i,name:ie.name,desc:ie.desc,cname:ie.cluster.name,color:ie.cluster.color,deg:f(ie),depth:p[ie.i],kind:ie.meta.kind||"",path:ie.meta.path||"",line:ie.meta.line||null,status:ie.meta.status||"",prov:ie.meta.prov||"",groups:[["Ursache · eingehend",ie.in,"IN"],["Wirkung · ausgehend",ie.out,"OUT"],["Assoziiert · Backlinks",ie.rel,"REL"]].filter(([,Pe])=>Pe.length).map(([Pe,Ae,we])=>({title:Pe,tag:we,items:Ae.map($e=>({i:$e.i,name:$e.name,color:$e.cluster.color}))}))})},Uo=function(ie){const Pe=o[ie],Ae=b[v],we=Ae[Pe.i].slice();for(let $e=0;$e<Ae.length;$e++)Ae[$e][0]-=we[0],Ae[$e][1]-=we[1],Ae[$e][2]-=we[2];Q.tx=Q.ty=Q.tz=0,bt(1)},rg=function(ie){const Pe=o[ie];w.chain.textContent="Start bei "+Pe.name+" — Shift+Klick auf das Zielobjekt",w.pathbar.classList.add("on")};var Ke=bs,Be=Kl,se=Do,_e=lr,me=Ql,Le=E,ze=Me,Ie=Ht,xt=bt,We=St,lt=it,Ge=Qt,qe=Hn,Ct=Gn,mt=yt,zt=Et,Ot=Ni,Rt=fi,ye=Uo,H=rg;I.setPixelRatio(Math.min(devicePixelRatio,2)),B.appendChild(I.domElement),U=new yy,U.fog=new Qm(328967,.0068),X=new xi(T,1,1,1400);const nt=ie=>{const Pe=new rt(ie);return[Pe.r,Pe.g,Pe.b]},Ve=o.length,N=new Float32Array(Ve*3),S=new Float32Array(Ve*3),W=new Float32Array(Ve),Y=new Float32Array(Ve),$=new Float32Array(Ve);o.forEach((ie,Pe)=>{const Ae=nt(ie.cluster.color);S[Pe*3]=Ae[0],S[Pe*3+1]=Ae[1],S[Pe*3+2]=Ae[2],W[Pe]=ie.size=.95+ie.w*.4,Y[Pe]=1,$[Pe]=1});const de=new Cn;de.setAttribute("position",new Mt(N,3)),de.setAttribute("aColor",new Mt(S,3)),de.setAttribute("aSize",new Mt(W,1)),de.setAttribute("aAlpha",new Mt(Y,1)),de.setAttribute("aScale",new Mt($,1));const ge=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,ee=new bn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:ge,fragmentShader:`
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
      }`,transparent:!0,blending:kr,depthWrite:!1}),j=new bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:ge,fragmentShader:`
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
      }`,transparent:!0,blending:kr,depthWrite:!1});oe=new Up(de,ee),ce=new Up(de,j),oe.frustumCulled=!1,ce.frustumCulled=!1,U.add(oe,ce);const ne=c.length,ue=new Float32Array(ne*6),L=new Float32Array(ne*6),V=new Float32Array(ne*2),he=new Float32Array(ne*2),fe=new Float32Array(ne*2),Ce=new Float32Array(ne*2);c.forEach((ie,Pe)=>{const Ae=nt(ie.s.cluster.color),we=nt(ie.t.cluster.color);L.set(Ae,Pe*6),L.set(we,Pe*6+3),V[Pe*2]=0,V[Pe*2+1]=1;const $e=Pe*.6180339887%1;he[Pe*2]=$e,he[Pe*2+1]=$e,fe[Pe*2]=fe[Pe*2+1]=1,Ce[Pe*2]=Ce[Pe*2+1]=ie.kind==="pre"?1:0});const F=new Cn;F.setAttribute("position",new Mt(ue,3)),F.setAttribute("aColor",new Mt(L,3)),F.setAttribute("aT",new Mt(V,1)),F.setAttribute("aSeed",new Mt(he,1)),F.setAttribute("aAlpha",new Mt(fe,1)),F.setAttribute("aDir",new Mt(Ce,1));const pe=new bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:kr,depthWrite:!1});xe=new hu(F,pe),xe.frustumCulled=!1,U.add(xe);const te=y(),Q={theta:.7,phi:1.15,dist:te,tTheta:.7,tPhi:1.15,tDist:te,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let ve=!1,re=0,Re=0,Ne=0;const dt=I.domElement;O(dt,"pointerdown",ie=>{ve=!0,Ne=0,re=ie.clientX,Re=ie.clientY,dt.setPointerCapture(ie.pointerId)}),O(dt,"pointerup",ie=>{ve=!1,dt.releasePointerCapture(ie.pointerId)}),O(dt,"pointermove",ie=>{const Pe=dt.getBoundingClientRect();if(ia.x=ie.clientX-Pe.left,ia.y=ie.clientY-Pe.top,ia.live=!0,!ve)return;const Ae=ie.clientX-re,we=ie.clientY-Re;Ne+=Math.abs(Ae)+Math.abs(we),re=ie.clientX,Re=ie.clientY,Q.tTheta-=Ae*.0052,Q.tPhi=Math.max(.12,Math.min(Math.PI-.12,Q.tPhi-we*.0052)),Fi=!1,Qt()}),O(dt,"pointerleave",()=>{ia.live=!1});const Nt=w.zlvl,Rn=()=>{Nt.textContent=Math.round(te/Q.tDist*100)+"%"},Nn=ie=>{Q.tDist=Math.max(te*.22,Math.min(te*2.6,Q.tDist*ie)),Rn()};O(dt,"wheel",ie=>{ie.preventDefault(),Nn(1+Math.sign(ie.deltaY)*.11)},{passive:!1});const Af=()=>{Q.tDist=te,Rn()};Rn();const ia={x:-1,y:-1,live:!1};let Kt=null,Ft=null,Dn=null,Fi=!0,aa=!0,ci=!0;const sa=new Set,Ms=.12,ra=new q;O(dt,"click",ie=>{if(!(Ne>5)){if(!Kt){ie.shiftKey||lr();return}if(ie.shiftKey&&Ft&&Kt!==Ft){Ql(Ft,Kt);return}Do(Kt)}});const oa=new Float32Array(o.length),ui=new Float32Array(o.length),Hi=new Float32Array(c.length);let No="";const k=w.labels,J=14,Z=Array.from({length:44},()=>{const ie=document.createElement("div");return ie.className="lab",ie.style.opacity=0,k.appendChild(ie),ie}),K=[...o].sort((ie,Pe)=>f(Pe)-f(ie)).slice(0,J).map(ie=>ie.i);let Ee=performance.now(),Se=0,De=0;const Oe=de.getAttribute("position"),Xe=de.getAttribute("aAlpha"),Qe=de.getAttribute("aScale"),Ue=F.getAttribute("position"),pt=F.getAttribute("aAlpha");z=requestAnimationFrame(Ht);const fn=()=>{ci=!ci,Qt()},Te=()=>{aa=!aa,Qt()},Un=()=>{Fi=!Fi,Qt()},Gi=()=>Hn(s==="light"?"dark":"light");O(window,"keydown",ie=>{if(/^(INPUT|TEXTAREA)$/.test(ie.target.tagName)){ie.key==="Escape"&&ie.target.blur();return}ie.key==="Escape"?lr():ie.key==="l"||ie.key==="L"?(aa=!aa,Qt()):ie.key==="r"||ie.key==="R"?it():ie.key===" "?(ie.preventDefault(),Fi=!Fi,Qt()):ie.key==="/"?(ie.preventDefault(),w.q.focus()):ie.key==="="||ie.key==="+"?Nn(1/1.18):(ie.key==="-"||ie.key==="_")&&Nn(1.18)});const Vi=ie=>Do(o[ie]),Dt=ie=>{Kt=ie===null?null:o[ie]};return Hn(s),Et(),fi(null),Qt(),Gn(),{setView:St,toggleFlow:fn,toggleLabel:Te,toggleSpin:Un,reset:it,toggleTheme:Gi,dolly:Nn,zoomReset:Af,toggleCluster:yt,selectAt:Vi,hoverAt:Dt,setQuery:Ni,clearPath:E,centerOn:Uo,startPath:rg,dispose(){P.abort(),cancelAnimationFrame(z),de.dispose(),F.dispose(),ee.dispose(),j.dispose(),pe.dispose(),I.dispose(),dt.remove(),w.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:o,edges:c,deg:f,createAtlas:C}}function l3(t){if(typeof t!="string"||t==="")return t;const e=t.split(/[\\/]/).filter(Boolean);return e.length>0?e[e.length-1]:t}const Gy="plugbrain.workspace";function c3(){try{return localStorage.getItem(Gy)||""}catch{return""}}function u3(t){try{localStorage.setItem(Gy,t)}catch{}}async function Xv(){const t=await fetch("/api/galaxy");if(!t.ok)throw new Error(`Galaxie: HTTP ${t.status}`);const e=await t.json();if(!(e!=null&&e.ok)||!Array.isArray(e.planets))throw new Error("Die Galaxie antwortet unvollständig.");return e.planets}function Wv(t){if(typeof t!="string")return"";const e=t.trim();if(e==="")return"";if(/^[a-zA-Z]:[\\/]/.test(e)||/^[\\/]{2}/.test(e)){const i=e.replace(/\\/g,"/"),a=i.startsWith("//")?`//${i.slice(2).replace(/\/{2,}/g,"/")}`:i.replace(/\/{2,}/g,"/");return(a==="//"||/^[a-zA-Z]:\/$/.test(a)?a:a.replace(/\/+$/,"")).toLowerCase()}return e==="/"?e:e.replace(/\/+$/,"")}function f3(t,e){var i;const n=Wv(e);return!n||!Array.isArray(t)?"":((i=t.find(a=>typeof(a==null?void 0:a.id)=="string"&&Wv(a.root)===n))==null?void 0:i.id)??""}async function d3(t,e,n){var s;const i=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:t,name:e})});if(!i.ok){const r=await i.json().catch(()=>null);throw new Error((r==null?void 0:r.error)??`Registrieren: HTTP ${i.status}`)}const a=await i.json();if(!(a!=null&&a.ok)||!((s=a.workspace)!=null&&s.id))throw new Error("Registrieren: unvollständige Antwort.");return await Vy(a.workspace.id,n),a.workspace.id}function Pp(t){var r,o,l;const e=t==null?void 0:t.run;if(!e)return"Kein Indexlauf bekannt.";if(t.stale)return t.ownerAlive&&!t.recoverable?"Indexlauf ohne neuen Fortschritt; der Owner-Prozess läuft noch. Die Sperre bleibt geschützt.":"Indexlauf ohne neuen Fortschritt; der frühere Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.";const n=Math.max(0,Math.round((Date.now()-Date.parse(e.startedAt))/1e3)),i={starting:"startet",scan:"sammelt Dateien",classify:"vergleicht",write:"schreibt",resolve:"verknüpft",publish:"veröffentlicht",done:"fertig",failed:"fehlgeschlagen"}[e.phase]??e.phase;if(e.finishedAt)return e.ok?`Fertig: ${((r=e.result)==null?void 0:r.files)??e.scanned} Dateien, ${((o=e.result)==null?void 0:o.symbols)??0} Symbole, ${((l=e.result)==null?void 0:l.edges)??0} Kanten in ${n} s.`:`Indexlauf fehlgeschlagen: ${e.error??"unbekannter Grund"}`;const a=e.total>0?`/${e.total}`:"",s=e.total>0?` (${Math.round(e.processed/e.total*100)} %)`:"";return`Indexiert: ${i} ${e.processed}${a}${s} — ${n} s`}function h3(t,e){return t!=null&&t.running||t!=null&&t.stale?Pp(t):e.startsWith("Indexiert:")||e.startsWith("Indexlauf ohne neuen Fortschritt;")?"":e}async function p3(t){const e=await fetch(`/api/index/progress?workspace=${encodeURIComponent(t)}`);return e.ok?e.json():null}const m3=t=>new Promise(e=>setTimeout(e,t));async function g3(t,e){for(;;){await m3(900);const n=await p3(t);if(n===null)throw new Error("Der Fortschritt ist nicht abrufbar.");if(e==null||e(n),n.running)continue;if(n.stale)throw n.ownerAlive&&!n.recoverable?new Error("Der Indexlauf meldet keinen neuen Fortschritt, aber der Owner-Prozess läuft noch. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):new Error("Der Indexlauf ist verstummt und sein Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.");const i=n.run;if(!i)throw new Error("Kein Indexlauf bekannt.");if(i.ok)return i.result;throw new Error(i.error??"Indexlauf fehlgeschlagen.")}}async function Vy(t,e){const n=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:t})}),i=await n.json().catch(()=>null);if(n.status===409&&(i!=null&&i.busy))throw i.ownerAlive&&!i.recoverable?new Error("Ein stiller Indexlauf gehört noch einem lebenden Owner-Prozess. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):i.recoverable?new Error("Der vorherige Index-Owner ist nicht mehr aktiv. Der Lauf kann erneut gestartet werden."):new Error(i.error??"Ein Indexlauf ist bereits unterwegs.");if(!n.ok)throw new Error(`Indizieren: HTTP ${n.status}`);if(!(i!=null&&i.ok))throw new Error("Indizieren: unvollständige Antwort.");return i.result!==void 0&&i.result!==null?i.result:g3(t,e)}const ky="plugbrain.auth_token",zp="plugbrain.agent_id";function v3(){var t,e;try{return((e=(t=window.__PLUGBRAIN__)==null?void 0:t.token)==null?void 0:e.trim())??""}catch{return""}}function Xy(){var n,i;let t="";try{t=((n=new URLSearchParams(window.location.search).get("token"))==null?void 0:n.trim())??""}catch{}if(t)return Wy(t),t;const e=v3();if(e)return e;try{return((i=localStorage.getItem(ky))==null?void 0:i.trim())??""}catch{return""}}function Wy(t){try{localStorage.setItem(ky,t)}catch{}}function Ro(){try{const t=new URLSearchParams(window.location.search).get("agent");return t?(localStorage.setItem(zp,t),t):localStorage.getItem(zp)||"agy"}catch{return"agy"}}function _3(t){try{localStorage.setItem(zp,t)}catch{}}function or(){const t=Xy(),e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["x-plug-auth-token"]=t),e}async function x3(t){const e=await fetch(`/api/planet?workspace=${encodeURIComponent(t)}`);if(!e.ok){const i=await e.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Planet inventory HTTP ${e.status}`)}const n=await e.json();if(!(n!=null&&n.ok)||!n.planet||!Array.isArray(n.planet.checkouts))throw new Error("Planet-Inventar unvollständig");return n.planet}async function S3(t,e){const n=await fetch("/api/planet/selection",{method:"POST",headers:or(),body:JSON.stringify({workspace:t,checkoutIds:e})}),i=await n.json().catch(()=>null);if(!n.ok||!(i!=null&&i.ok)||!i.planet)throw new Error((i==null?void 0:i.error)??`Code-Auswahl HTTP ${n.status}`);return i.planet}async function y3(t){const e=await fetch(`/api/git?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Git-Status HTTP ${e.status}`);return e.json()}async function M3(t){const e=await fetch(`/api/mesh?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Mesh HTTP ${e.status}`);const n=await e.json(),i=n==null?void 0:n.mesh;if(!(n!=null&&n.ok)||!i||i.workspaceId!==t||!Array.isArray(i.nodes)||!Array.isArray(i.edges))throw new Error("Mesh-Projektion unvollständig oder für einen anderen Workspace");return i}async function b3(t,e={}){const n=new URLSearchParams({workspace:t});e.agentId&&n.set("agentId",e.agentId),e.taskId&&n.set("taskId",e.taskId),e.workerId&&n.set("workerId",e.workerId),e.limit!==void 0&&n.set("limit",String(e.limit));const i=await fetch(`/api/mesh/timeline?${n}`);if(!i.ok)throw new Error(`Mesh-Zeitleiste HTTP ${i.status}`);const a=await i.json();if(!(a!=null&&a.ok)||!Array.isArray(a.timeline))throw new Error("Mesh-Zeitleiste unvollständig");return a.timeline}async function E3(t,e){const n=await fetch(`/api/provenance?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Provenance HTTP ${n.status}`);return n.json()}async function T3(t,e=Ro(),n="AGY"){const i=await fetch("/api/agent/attach",{method:"POST",headers:or(),body:JSON.stringify({workspace:t,agentId:e,name:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Agent Attach HTTP ${i.status}`)}return i.json()}const mu=new Map;function jy(t,e=Ro()){const n=`${t}\0${e}`,i=mu.get(n);if(i)return i;const a=T3(t,e).then(()=>{}).catch(()=>{mu.delete(n)});return mu.set(n,a),a}function A3(){mu.clear()}async function w3(t,e,n=Ro()){await jy(t,n);const i=await fetch("/api/agent/search",{method:"POST",headers:or(),body:JSON.stringify({workspace:t,agentId:n,query:e})});if(!i.ok){const s=await i.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Search HTTP ${i.status}`)}const a=await i.json();return Array.isArray(a==null?void 0:a.hits)?a.hits:[]}async function C3(t,e,n=Ro()){await jy(t,n);const i=await fetch("/api/agent/read",{method:"POST",headers:or(),body:JSON.stringify({workspace:t,agentId:n,path:e})});if(!i.ok){const s=await i.json().catch(()=>null),r=(s==null?void 0:s.error)??`HTTP ${i.status}`;return{ok:!1,path:e,content:"",bytes:0,lang:null,error:r}}const a=await i.json();return{ok:!0,path:a.path??e,content:a.content??"",bytes:a.bytes??0,lang:a.lang??null}}async function jv(t,e,n=Ro()){const i=await fetch("/api/context/pack",{method:"POST",headers:or(),body:JSON.stringify({workspaceId:t,goal:e,agentId:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Context Pack HTTP ${i.status}`)}return i.json()}async function R3(t){const e=await fetch(`/api/context/pack/${encodeURIComponent(t)}/staleness`);if(!e.ok){const n=await e.json().catch(()=>null);throw new Error((n==null?void 0:n.error)??`Staleness HTTP ${e.status}`)}return e.json()}async function N3(t,e){const n=await fetch(`/api/notes/query?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}`,{headers:or()});if(!n.ok){const i=await n.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Notes Query HTTP ${n.status}`)}return n.json()}async function D3(t,e,n=30){const i=await fetch(`/api/notes/search?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}&limit=${n}&lines=1`,{headers:or()});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Notizsuche HTTP ${i.status}`)}return i.json()}async function U3(t,e){const n=await fetch(`/api/notes/backlinks?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.backlinks)?i.backlinks:[]}const jt=[],ss=[],_a=[],Pl=[],_l={},gn=[],gu=[],ji=7.2,Wr=6,zl=["--k1","--k2","--k3","--k4","--k5","--k6"],eg=t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),L3=t=>t.agentColor||eg(zl[(t.ki??0)%zl.length]),qv=t=>eg(zl[t.ki%zl.length]),qy=new Map;let Yy="loc";function O3(t){Yy=t}const P3=t=>{const e=Math.max(1,...jt.map(i=>i.loc)),n=Math.max(1,...jt.map(i=>i.usedBy.length));return t.dying?0:Yy==="loc"?1.5+t.loc/e*26:1.5+t.usedBy.length/n*26},Ip=new Set,z3=t=>(Ip.add(t),()=>Ip.delete(t)),vo=()=>Ip.forEach(t=>t());function Bp(t,e,n="ok"){gu.unshift({t:new Date,ws:t,msg:e,kind:n,id:Math.random().toString(36).slice(2)}),gu.length>60&&gu.pop()}function Tf(){var o;let e=0,n=0,i=0;const a=Pl.filter(l=>gn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=jt.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=gn.find(g=>g.id===l))!=null&&o.dying))continue;const f=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),h=f*ji+Wr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/f))*ji+Wr;n+h>74&&n>0&&(e+=i,n=0,i=0);let p=_a.find(g=>g.dir===l);p||(p={dir:l,x:n+h/2,z:e+u/2,w:.01,h:.01},_a.push(p)),Object.assign(p,{tx:n,tz:e,tw:h,th:u,cols:f}),s.add(l),n+=h,i=Math.max(i,u)}const r=_a.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(f=>f.tx+f.tw))/2,c=Math.max(...r.map(f=>f.tz+f.th))/2;for(const f of r)f.tx-=l,f.tz-=c;for(const f of r)jt.filter(u=>u.dir===f.dir).forEach((u,p)=>{u.tx=f.tx+Wr/2+p%f.cols*ji+ji/2,u.tz=f.tz+Wr/2+Math.floor(p/f.cols)*ji+ji/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=_a.length-1;l>=0;l--)!s.has(_a[l].dir)&&!jt.some(c=>c.dir===_a[l].dir)&&_a.splice(l,1);for(const l of a)qy.set(l,.5)}function I3(t,e,n=!1){let i=gn.find(a=>a.id===t);return i||(i={id:t,name:e||t,ki:gn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},gn.push(i),Pl.includes(t)||Pl.push(t),Bp(e||t,"workspace registered","reg"),Tf(),vo(),i)}function B3(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=e.split("/").pop(),c=e.includes("/")&&e.startsWith(t.id+"/")?e:`${t.id}/${e}`;let f=_l[c];if(f)return f.loc+=Math.max(2,Math.round(n*.25)),f.pulse=1,s&&(f.agentColor=s,f.agentName=r,f.access=o),f;f={path:c,name:l,dir:t.id,top:t.id,ki:t.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let h of i){h.includes("/")||(h=`${t.id}/${h}`);const u=_l[h];u&&(f.deps.push(h),ss.push({from:f,to:u}),u.usedBy.push(c))}return jt.push(f),_l[c]=f,Tf(),vo(),f}function F3(){let t=!1;for(let e=jt.length-1;e>=0;e--){const n=jt[e];if(n.dying&&n.h<.25){jt.splice(e,1),delete _l[n.path],t=!0;for(let i=ss.length-1;i>=0;i--)(ss[i].from===n||ss[i].to===n)&&ss.splice(i,1);for(const i of jt){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let e=gn.length-1;e>=0;e--){const n=gn[e];if(n.dying&&!jt.some(i=>i.dir===n.id)){gn.splice(e,1);const i=Pl.indexOf(n.id);i>=0&&Pl.splice(i,1),t=!0}}t&&(Tf(),vo())}setInterval(()=>{let t=!1;for(const e of gn)e.load>.01&&(e.load*=.82,t=!0);t&&vo()},600);const il={register({id:t,name:e}={}){return t?I3(String(t),e&&String(e),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=gn.find(c=>c.id===t);return!l||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,B3(l,{path:e,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(t,e){const n=gn.find(a=>a.id===t);if(!n)return;const i=jt.filter(a=>a.dir===t&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Bp(n.name,String(e||"event")),vo()},unregister(t){const e=gn.find(n=>n.id===t);e&&(e.dying=!0,jt.filter(n=>n.dir===t).forEach(n=>{n.dying=!0}),Bp(e.name,"workspace unregistered","sys"),Tf(),vo())},list:()=>gn.map(t=>({id:t.id,name:t.name,buildings:jt.filter(e=>e.dir===t.id).length})),simulated:()=>!1};window.PlugBrainCity=il;const H3=1024,G3=2048,Yv=96,Zv=new Map;function V3(t){if(!t.agentColor)return null;const e=t.agentColor+(t.access||"");let n=Zv.get(e);if(!n){n=new rt;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(t.agentColor);if(i){const a=t.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(t.agentColor)}catch{n.setHSL(0,0,.5)}Zv.set(e,n)}return n}function k3(t,e,n,{onSelect:i,onZoom:a}){let s;try{s=new Hy({antialias:!0,alpha:!0,canvas:t})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new yy,o=new $m(-1,1,1,-1,-400,600),l=`
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
  }`,f=new Js(1,1,1),h=new bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=H3,p=new cv(f,h,u);p.frustumCulled=!1;let g=new Xr(new Float32Array(u*3),3),b=new Xr(new Float32Array(u*2),2);f.setAttribute("aColor",g),f.setAttribute("aHi",b),r.add(p);const v=new tA(f),d=new wy({color:3814695,transparent:!0,opacity:.3});let x=[];for(let ye=0;ye<u;ye++){const H=new hu(v,d);H.visible=!1,x.push(H),r.add(H)}const M=(ye,H)=>{let nt=Math.max(1,ye);for(;nt<H;)nt*=2;return nt};function _(ye){if(ye<=u)return;const H=M(u,ye),nt=p,Ve=x,N=new cv(f,h,H);N.frustumCulled=!1,N.count=0;const S=new Xr(new Float32Array(H*3),3),W=new Xr(new Float32Array(H*2),2);f.setAttribute("aColor",S),f.setAttribute("aHi",W);const Y=[];for(let $=0;$<H;$++){const de=new hu(v,d);de.visible=!1,Y.push(de),r.add(de)}r.remove(nt);for(const $ of Ve)r.remove($);p=N,g=S,b=W,x=Y,u=H}const A=()=>new bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),R=[],T=new Js(1,1,1);for(let ye=0;ye<Yv;ye++){const H=new Ri(T,A());H.visible=!1,R.push(H),r.add(H)}const y=3;let C=G3,w=new Float32Array(C*y*3),D=new Float32Array(C*y);const P=new Cn;P.setAttribute("position",new Mt(w,3)),P.setAttribute("aA",new Mt(D,1));const G=new Up(P,new bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));G.frustumCulled=!1,r.add(G);let O=new Float32Array(C*6),z=new Float32Array(C*2);const B=new Cn;B.setAttribute("position",new Mt(O,3)),B.setAttribute("aA",new Mt(z,1));const I=new hu(B,new bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));I.frustumCulled=!1,r.add(I);function U(ye){ye<=C||(C=M(C,ye),w=new Float32Array(C*y*3),D=new Float32Array(C*y),O=new Float32Array(C*6),z=new Float32Array(C*2),P.setAttribute("position",new Mt(w,3)),P.setAttribute("aA",new Mt(D,1)),B.setAttribute("position",new Mt(O,3)),B.setAttribute("aA",new Mt(z,1)))}const X={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},oe=Math.atan(1/Math.SQRT2);let ce=!1,xe=0,ke=0,Ke=!0;const Be={x:-1,y:-1,live:!1};t.addEventListener("pointerdown",ye=>{ce=!0,ke=0,xe=ye.clientX,t.setPointerCapture(ye.pointerId),t.classList.add("drag")}),t.addEventListener("pointerup",ye=>{ce=!1,t.classList.remove("drag"),t.releasePointerCapture(ye.pointerId)}),t.addEventListener("pointermove",ye=>{const H=t.getBoundingClientRect();Be.x=ye.clientX-H.left,Be.y=ye.clientY-H.top,Be.live=!0,ce&&(ke+=Math.abs(ye.clientX-xe),X.tYaw-=(ye.clientX-xe)*.006,xe=ye.clientX,Ke=!1,lt(!1))}),t.addEventListener("pointerleave",()=>{Be.live=!1});const se=X.tZoom,_e=()=>a(Math.round(se/X.tZoom*100)),me=ye=>{X.tZoom=Math.max(4,Math.min(60,X.tZoom*ye)),_e()};t.addEventListener("wheel",ye=>{ye.preventDefault(),me(1+Math.sign(ye.deltaY)*.11)},{passive:!1}),_e();let Le=null,ze=null,Ie=null,xt="",We=null,lt=()=>{};t.addEventListener("click",()=>{ke>5||i(Le&&ze!==Le?Le:null)});const Ge=zl.map(ye=>new rt(eg(ye)||"#8a4b2a")),qe=new q,Ct=new Bt,mt=new rt;let zt=!0,Ot=performance.now();function Rt(ye){requestAnimationFrame(Rt);const H=Math.min(.05,(ye-Ot)/1e3);Ot=ye;const nt=e.clientWidth,Ve=e.clientHeight;if(!nt||!Ve)return;t.width!==Math.round(nt*s.getPixelRatio())&&s.setSize(nt,Ve,!1);const N=1-Math.pow(.002,H);F3(),_(jt.length),U(ss.length),Ke&&(X.tYaw+=H*.12),X.yaw+=(X.tYaw-X.yaw)*N,X.zoom+=(X.tZoom-X.zoom)*N;const S=X.zoom*4,W=S*(nt/Ve);o.left=-W,o.right=W,o.top=S,o.bottom=-S,o.updateProjectionMatrix();const Y=180;o.position.set(Math.cos(X.yaw)*Math.cos(oe)*Y,Math.sin(oe)*Y,Math.sin(X.yaw)*Math.cos(oe)*Y),o.lookAt(0,6,0);for(let j=0;j<Yv;j++){const ne=R[j],ue=_a[j];if(!ue||j>=_a.length){ne.visible=!1;continue}ue.x=ue.x===void 0?ue.tx+ue.tw/2:ue.x,ue.z=ue.z===void 0?ue.tz+ue.th/2:ue.z;const L=ue.tx+ue.tw/2,V=ue.tz+ue.th/2;ue.x+=(L-ue.x)*N,ue.z+=(V-ue.z)*N,ue.w+=(ue.tw-ue.w)*N,ue.h+=(ue.th-ue.h)*N,ne.visible=!0,ne.position.set(ue.x,-.25,ue.z),ne.scale.set(Math.max(.01,ue.w-Wr*.45),.5,Math.max(.01,ue.h-Wr*.45))}const $=ze?new Set([ze.path,...ze.deps,...ze.usedBy]):null,de=ze||Le||Ie,ge=jt.length;p.count=ge;for(let j=0;j<ge;j++){const ne=jt[j];ne.x!==ne.tx&&(ne.x+=(ne.tx-ne.x)*N*.7),ne.z!==ne.tz&&(ne.z+=(ne.tz-ne.z)*N*.7);const ue=P3(ne);ne.h=ne.h===void 0?ue:ne.h+(ue-ne.h)*(ne.dying?N*1.4:N*.6),ne.pulse=Math.max(0,(ne.pulse||0)-H*1.6),Ct.makeScale(ji*.68,Math.max(.01,ne.h),ji*.68),Ct.setPosition(ne.x,ne.h/2,ne.z),p.setMatrixAt(j,Ct);const L=x[j];L.visible=!0,L.scale.set(ji*.68,Math.max(.01,ne.h),ji*.68),L.position.set(ne.x,ne.h/2,ne.z);const V=V3(ne);V?mt.copy(V):mt.copy(Ge[(ne.ki??0)%Ge.length]).offsetHSL(0,0,(qy.get(ne.dir)-.5)*.17),g.array[j*3]=mt.r,g.array[j*3+1]=mt.g,g.array[j*3+2]=mt.b;const he=ne===de?1:Math.min(.85,ne.pulse||0);let fe=$?$.has(ne.path)?0:1:xt&&!ne.path.toLowerCase().includes(xt)?1:0;!$&&!xt&&We&&(fe=ne.top===We?0:1),b.array[j*2]+=(he-b.array[j*2])*N,b.array[j*2+1]+=(fe-b.array[j*2+1])*N}for(let j=ge;j<u;j++)x[j].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=b.needsUpdate=!0;const ee=ss.length;B.setDrawRange(0,ee*2),P.setDrawRange(0,ee*y);for(let j=0;j<ee;j++){const ne=ss[j],ue=ne.from,L=ne.to,V=j*6;O[V]=ue.x,O[V+1]=ue.h,O[V+2]=ue.z,O[V+3]=L.x,O[V+4]=L.h,O[V+5]=L.z;const he=!$||$.has(ue.path)&&$.has(L.path),fe=ze&&(ue===ze||L===ze),Ce=fe?.55:he?.1:.02;z[j*2]+=(Ce-z[j*2])*N,z[j*2+1]=z[j*2];for(let F=0;F<y;F++){const pe=j*y+F,te=(ye/2600+(j*.37+F/y))%1,Q=Math.sin(te*Math.PI)*Math.hypot(L.x-ue.x,L.z-ue.z)*.22;w[pe*3]=ue.x+(L.x-ue.x)*te,w[pe*3+1]=ue.h+(L.h-ue.h)*te+Q+1.2,w[pe*3+2]=ue.z+(L.z-ue.z)*te,D[pe]=(zt?1:0)*(fe?1:he?.45:.06)*Math.sin(te*Math.PI)}}if(B.getAttribute("position").needsUpdate=!0,B.getAttribute("aA").needsUpdate=!0,P.getAttribute("position").needsUpdate=!0,P.getAttribute("aA").needsUpdate=!0,G.material.uniforms.uPx.value=3.4*s.getPixelRatio(),Be.live&&!ce){let j=null,ne=26*26;for(let ue=0;ue<ge;ue++){const L=jt[ue];if(L.dying||L.h<1)continue;qe.set(L.x,L.h*.6,L.z).project(o);const V=(qe.x*.5+.5)*nt,he=(-qe.y*.5+.5)*Ve,fe=(V-Be.x)**2+(he-Be.y)**2;fe<ne&&(ne=fe,j=L,L.sx=V,L.sy=he)}Le=j,t.style.cursor=ce?"grabbing":j?"pointer":"grab"}else Be.live||(Le=null);Le?(n.style.display="block",n.style.left=Le.sx+"px",n.style.top=Le.sy+"px",n.innerHTML=`<b>${Le.name}</b> · ${Le.loc} lines<br>${Le.dir} · referenced by ${Le.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(Rt),{setFlow:ye=>{zt=ye},setHatch:ye=>{h.uniforms.uHatch.value=ye?1:0},setSpin:ye=>{Ke=ye},spinning:()=>Ke,onSpinChange:ye=>{lt=ye},dolly:me,reset:()=>{X.tYaw=Math.PI*.25,X.tZoom=se,_e()},setSel:ye=>{ze=ye},setRailHover:ye=>{Ie=ye},setQuery:ye=>{xt=ye},setFocusTop:ye=>{We=ye}}}const Ar=new Map;function Kv(t){var n,i;const e=((n=t==null?void 0:t.properties)==null?void 0:n.path)||((i=t==null?void 0:t.properties)==null?void 0:i.filePath)||(t==null?void 0:t.uri);return typeof e=="string"&&e.length>0?e:null}function X3(t){var i,a,s;const e=((i=t==null?void 0:t.properties)==null?void 0:i.loc)??((a=t==null?void 0:t.properties)==null?void 0:a.lines)??((s=t==null?void 0:t.properties)==null?void 0:s.size),n=Number(e);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function W3(t){const n=String(t).replace(/\\/g,"/").split("/");return n[0]==="Code"&&n[1]?n[1].split("--")[0]:["Master","Roadmap","Auftrag","Planung","Codebasis","PLUG-Ordner","Aufräumen"].includes(n[0])?n[0]:"plugpt-vault"}function j3(t){var c;const e=t==null?void 0:t.workspace,n=(c=t==null?void 0:t.graph)==null?void 0:c.nodes;if(!(e!=null&&e.id)||!Array.isArray(n))return{workspaces:Ar.size,buildings:0,added:0};for(const f of gn.slice())f.sim&&il.unregister(f.id);const i=Array.isArray(t.graph.edges)?t.graph.edges:[],a=new Map(n.filter(f=>f&&typeof f.id=="string").map(f=>[f.id,f])),s=new Map;for(const f of i){const h=a.get(f==null?void 0:f.sourceId),u=a.get(f==null?void 0:f.targetId);if(!h||!u)continue;const p=Kv(u);p&&(s.has(h.id)||s.set(h.id,[]),s.get(h.id).push(p))}const r=[];for(const f of n){const h=Kv(f);h&&r.push({node:f,path:h})}r.sort((f,h)=>f.path.localeCompare(h.path));let o=0,l=0;for(const{node:f,path:h}of r){const u=W3(h);Ar.has(u)||(il.register({id:u,name:u}),Ar.set(u,new Set));const p=Ar.get(u);if(p.has(h))continue;p.add(h),l+=p.size;const g=f.properties||{};il.grow(u,{path:h,loc:X3(f),deps:s.get(f.id)||[],note:f.type||"",agentColor:g.agentColor||g.readerColor||null,agentName:g.agentName||g.readerName||null,access:g.agentColor?"write":g.readerColor?"read":null}),o+=1}return o>0&&il.event(String(e.id),`${o} indexed object${o===1?"":"s"} added across ${Ar.size} districts`),{workspaces:Ar.size,buildings:l,added:o,total:r.length,truncated:!1}}function q3({snapshot:t,onSelectFile:e}){ae.useEffect(()=>{t&&j3(t)},[t]);const[n,i]=ae.useState(!0),[a,s]=ae.useState("loc"),[r,o]=ae.useState(!0),[l,c]=ae.useState(!0),[f,h]=ae.useState(!0),[u,p]=ae.useState(100),[g,b]=ae.useState(null),[v,d]=ae.useState(""),[x,M]=ae.useState(null),[_,A]=ae.useState(!0),[,R]=ae.useReducer(O=>O+1,0),T=ae.useRef(null),y=ae.useRef(null),C=ae.useRef(null),w=ae.useRef(null);ae.useEffect(()=>{const O=k3(T.current,y.current,C.current,{onSelect:z=>b(z),onZoom:z=>p(z)});if(!O){i(!1);return}w.current=O,O.onSpinChange(z=>h(z))},[]),ae.useEffect(()=>{const O=z3(()=>R());return()=>{O()}},[]),ae.useEffect(()=>{!g&&jt.length>0&&b(jt[0])},[jt.length,g]),ae.useEffect(()=>{var O;(O=w.current)==null||O.setSel(g)},[g]),ae.useEffect(()=>{var O;(O=w.current)==null||O.setQuery(v)},[v]),ae.useEffect(()=>{var O;(O=w.current)==null||O.setFocusTop(x)},[x]),ae.useEffect(()=>{const O=z=>{var I,U;const B=z.target;if(/^(INPUT|TEXTAREA)$/.test(B.tagName)){z.key==="Escape"&&B.blur();return}z.key==="Escape"?(b(null),M(null)):z.key==="="||z.key==="+"?(I=w.current)==null||I.dolly(.8474576271186441):z.key==="-"||z.key==="_"?(U=w.current)==null||U.dolly(1.18):(z.key==="e"||z.key==="E")&&A(X=>!X)};return addEventListener("keydown",O),()=>removeEventListener("keydown",O)},[]);const D=jt.reduce((O,z)=>O+z.loc,0),P=gn.reduce((O,z)=>O+z.events,0),G=(O,z)=>z.length?m.jsxs(m.Fragment,{children:[m.jsxs("h3",{children:[O+" ",m.jsx("span",{style:{color:"var(--faint)"},children:z.length})]}),z.map(B=>{const I=_l[B];return I&&m.jsxs("div",{className:"dep","data-p":B,onClick:()=>b(I),children:[m.jsx("span",{className:"sw",style:{background:L3(I)}}),m.jsx("span",{children:B})]},B)})]}):null;return m.jsxs("div",{id:"app",className:g?void 0:"closed",children:[m.jsxs("aside",{children:[m.jsxs("div",{className:"hd",children:[m.jsx("h1",{children:"PlugBrain City"}),m.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),m.jsxs("div",{className:"kpis",children:[m.jsxs("div",{children:[m.jsx("b",{id:"k-ws",children:gn.length}),m.jsx("i",{children:"workspaces"})]}),m.jsxs("div",{children:[m.jsx("b",{id:"k-bld",children:jt.length}),m.jsx("i",{children:"buildings"})]}),m.jsxs("div",{children:[m.jsx("b",{id:"k-ev",children:P}),m.jsx("i",{children:"events"})]})]})]}),m.jsx("div",{className:"q",children:m.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:O=>d(O.target.value.trim().toLowerCase())})}),m.jsx("div",{className:"tree",id:"tree",children:gn.length?gn.map(O=>{const z=jt.filter(I=>I.dir===O.id),B=z.reduce((I,U)=>I+U.loc,0);return m.jsxs("div",{className:"ws"+(x===O.id?" on":"")+(O.dying?" dying":""),onClick:()=>M(I=>I===O.id?null:O.id),children:[m.jsxs("div",{className:"wsrow",children:[m.jsx("span",{className:"sw",style:{background:qv(O)}}),m.jsx("span",{className:"nm",children:O.name}),O.sim?m.jsx("span",{className:"tag",children:"sim"}):null,m.jsxs("span",{className:"lc",children:[z.length," bld · ",B]})]}),m.jsx("div",{className:"loadbar",children:m.jsx("i",{style:{width:Math.round(O.load*100)+"%",background:qv(O)}})})]},O.id)}):m.jsxs("div",{className:"empty",children:["No workspaces registered.",m.jsx("br",{}),m.jsx("br",{}),m.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),m.jsxs("div",{id:"stage",ref:y,children:[m.jsx("canvas",{id:"cv",ref:T}),m.jsx("div",{id:"tip",ref:C}),m.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",m.jsx("b",{id:"crumb-t",children:g?g.path.toUpperCase():x?x.toUpperCase():"CITY OVERVIEW"})]}),_&&m.jsx("div",{id:"feed",children:gu.slice(0,9).map(O=>m.jsxs("div",{className:"fe",children:[m.jsx("span",{className:"ft",children:O.t.toLocaleTimeString("en-GB",{hour12:!1})}),m.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:O.ws}),m.jsx("span",{className:"fm",children:O.msg})]},O.id))}),m.jsx("div",{id:"legend",children:m.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${a==="loc"?"size":"references"} · flashes = activity`})}),m.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([O,z])=>m.jsx("button",{className:"tb"+(a===O?" on":""),"data-h":O,type:"button",onClick:()=>{O3(O),s(O)},children:z},O)),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb"+(r?" on":""),id:"t-flow",type:"button",onClick:()=>{o(O=>{var z;return(z=w.current)==null||z.setFlow(!O),!O})},children:"Flow"}),m.jsx("button",{className:"tb"+(l?" on":""),id:"t-hatch",type:"button",onClick:()=>{c(O=>{var z;return(z=w.current)==null||z.setHatch(!O),!O})},children:"Hatching"}),m.jsx("button",{className:"tb"+(f?" on":""),id:"t-spin",type:"button",onClick:()=>{h(O=>{var z;return(z=w.current)==null||z.setSpin(!O),!O})},children:"Orbit"}),m.jsx("button",{className:"tb"+(_?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>A(O=>!O),children:"Feed"}),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var O;return(O=w.current)==null?void 0:O.dolly(1.18)},children:"−"}),m.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var O;return(O=w.current)==null?void 0:O.reset()},children:u+"%"}),m.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var O;return(O=w.current)==null?void 0:O.dolly(1/1.18)},children:"＋"}),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var O;(O=w.current)==null||O.reset(),b(null),M(null)},children:"Reset"})]}),m.jsxs("div",{id:"gate",style:n?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",m.jsx("br",{}),"The workspace registry remains available."]})]}),m.jsx("div",{id:"side",children:m.jsx("div",{id:"dt",children:g&&m.jsxs("div",{className:"dt",children:[m.jsx("div",{className:"kind",children:g.dir+"/"}),m.jsx("h2",{children:g.name}),g.note?m.jsx("div",{className:"note",children:g.note}):null,e&&m.jsx("button",{type:"button",className:"btn primary",style:{marginTop:"10px",marginBottom:"14px",width:"100%",padding:"8px 12px"},onClick:()=>e(g.path),children:"📄 Datei in Quellansicht öffnen"}),m.jsxs("dl",{children:[m.jsx("dt",{children:"Size"}),m.jsx("dd",{children:g.loc}),m.jsx("dt",{children:"References"}),m.jsx("dd",{children:g.deps.length}),m.jsx("dt",{children:"Referenced by"}),m.jsx("dd",{children:g.usedBy.length}),m.jsx("dt",{children:"Share of total"}),m.jsx("dd",{children:D?(g.loc/D*100).toFixed(1)+"%":"—"})]}),G("References",g.deps),G("Referenced by",g.usedBy)]})})})]})}const Qv={agent:"Agent",task:"Aufgabe",worker:"Worker",worktree:"Worktree",file:"Datei",artifact:"Artefakt",route:"Route"},Jv={live:"Live-Ereignis",recovered:"wiederhergestelltes Ereignis","historical-import":"historischer Import"};function Xd(t){const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function Wd(t){if(t.kind!=="worker")return null;switch(t.proof){case"process-started":return"Start im Trace beobachtet — keine Aussage über den aktuellen Prozesszustand.";case"finished":return"Abschluss im Trace beobachtet.";case"proof-unavailable":return"Kein beobachteter Prozessstart; dieser Worker wird nicht als laufend dargestellt.";default:return"Kein Prozessbeweis vorhanden."}}function Y3(t){const e=t.id.slice(t.id.indexOf(":")+1);return t.kind==="agent"?{agentId:e}:t.kind==="task"?{taskId:e}:t.kind==="worker"?{workerId:e}:null}function $v(t,e){var n;return((n=t.find(i=>i.id===e))==null?void 0:n.label)??e}function Z3({mesh:t,workspaceId:e,onSelectFile:n}){const[i,a]=ae.useState(null),[s,r]=ae.useState([]),[o,l]=ae.useState(!1),[c,f]=ae.useState(""),h=ae.useMemo(()=>(t==null?void 0:t.nodes.find(p=>p.id===i))??null,[t,i]);return ae.useEffect(()=>{i!==null&&h===null&&a(null)},[h,i]),ae.useEffect(()=>{const p=h?Y3(h):null;if(!e||p===null){r([]),f(""),l(!1);return}let g=!0;return l(!0),f(""),b3(e,{...p,limit:12}).then(b=>{g&&r(b)}).catch(()=>{g&&(r([]),f("Die Trace-Zeitleiste ist derzeit nicht verfügbar."))}).finally(()=>{g&&l(!1)}),()=>{g=!1}},[h,e]),e?t===null||t.workspaceId!==e?m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Die Core-Trace-Projektion ist für diesen Workspace noch nicht verfügbar."}),m.jsx("p",{className:"mesh-trace__muted",children:"Es werden weder Registry-Einträge noch historische Aktivitätszähler als Ersatz angezeigt."})]}):t.nodes.length===0&&t.edges.length===0?m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Für diesen Workspace wurde noch keine trace-gestützte Arbeit beobachtet."}),m.jsx("p",{className:"mesh-trace__muted",children:"Keine simulierten Agenten, keine Roster-Fallbacks und kein daraus abgeleiteter Prozessstatus."})]}):m.jsxs("section",{className:"mesh-trace","aria-label":"Trace-backed Agent Mesh",children:[m.jsxs("header",{className:"mesh-trace__header",children:[m.jsxs("div",{children:[m.jsxs("h2",{children:["Agent Mesh ",m.jsx("span",{children:"Trace-backed"})]}),m.jsx("p",{children:"Jeder Knoten und jede Kante stammt aus einem autoritätsbestätigten Trace-Ereignis."})]}),m.jsxs("dl",{className:"mesh-trace__totals",children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Knoten"}),m.jsx("dd",{children:t.totals.nodes??t.nodes.length})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Kanten"}),m.jsx("dd",{children:t.totals.edges??t.edges.length})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"ohne Startbeweis"}),m.jsx("dd",{children:t.unprovenWorkers.length})]})]})]}),t.unprovenWorkers.length>0&&m.jsxs("aside",{className:"mesh-trace__notice","aria-label":"Unproven workers",children:[m.jsx("strong",{children:"Unbelegte Worker werden nicht als laufend angezeigt."}),m.jsx("ul",{children:t.unprovenWorkers.map(p=>m.jsxs("li",{children:[m.jsx("code",{children:p.workerId}),p.taskId?m.jsxs(m.Fragment,{children:[" · Aufgabe ",m.jsx("code",{children:p.taskId})]}):""," — ",p.reason]},p.workerId))})]}),m.jsxs("div",{className:"mesh-trace__grid",children:[m.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace nodes",children:[m.jsxs("h3",{children:["Knoten ",m.jsx("span",{children:t.nodes.length})]}),m.jsx("ol",{className:"mesh-trace__nodes",children:t.nodes.map(p=>{const g=Wd(p),b=p.id===i;return m.jsx("li",{children:m.jsxs("button",{type:"button",className:b?"mesh-trace__node is-selected":"mesh-trace__node",onClick:()=>a(p.id),"aria-pressed":b,children:[m.jsx("span",{className:"mesh-trace__kind",children:Qv[p.kind]}),m.jsx("span",{className:"mesh-trace__label",title:p.label,children:p.label}),m.jsxs("span",{className:"mesh-trace__events",children:[p.eventCount," Ereignis",p.eventCount===1?"":"se"]}),m.jsx("span",{className:"mesh-trace__provenance",title:"Ereignis-Provenienz, nicht aktueller Prozessstatus",children:Jv[p.provenance]}),g&&m.jsx("span",{className:"mesh-trace__proof",children:g})]})},p.id)})})]}),m.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace edges",children:[m.jsxs("h3",{children:["Kanten ",m.jsx("span",{children:t.edges.length})]}),m.jsx("ol",{className:"mesh-trace__edges",children:t.edges.map(p=>m.jsxs("li",{children:[m.jsx("span",{className:"mesh-trace__edge-kind",children:p.kind}),m.jsx("span",{title:p.from,children:$v(t.nodes,p.from)}),m.jsx("span",{"aria-hidden":"true",children:"→"}),m.jsx("span",{title:p.to,children:$v(t.nodes,p.to)}),m.jsxs("small",{children:[p.count," Ereignis",p.count===1?"":"se"," · Belege: ",p.evidence.join(", ")]})]},p.id))})]})]}),h&&m.jsxs("aside",{className:"mesh-trace__detail","aria-label":"Details for "+h.label,children:[m.jsxs("div",{className:"mesh-trace__detail-head",children:[m.jsxs("div",{children:[m.jsx("span",{className:"mesh-trace__kind",children:Qv[h.kind]}),m.jsx("h3",{children:h.label})]}),m.jsx("button",{type:"button",onClick:()=>a(null),"aria-label":"Detailansicht schließen",children:"×"})]}),m.jsxs("dl",{children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Erstmals"}),m.jsx("dd",{children:Xd(h.firstSeen)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Zuletzt"}),m.jsx("dd",{children:Xd(h.lastSeen)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Provenienz"}),m.jsx("dd",{children:Jv[h.provenance]})]}),Wd(h)&&m.jsxs("div",{children:[m.jsx("dt",{children:"Worker-Beweis"}),m.jsx("dd",{children:Wd(h)})]}),Object.entries(h.detail).map(([p,g])=>m.jsxs("div",{children:[m.jsx("dt",{children:p}),m.jsx("dd",{children:g??"—"})]},p))]}),h.kind==="file"&&n&&m.jsx("button",{type:"button",className:"mesh-trace__source",onClick:()=>n(h.label),children:"Datei im Source-View öffnen"}),m.jsxs("section",{className:"mesh-trace__timeline","aria-label":"Trace timeline",children:[m.jsx("h4",{children:"Beobachtete Ereignisse"}),o&&m.jsx("p",{children:"Lade Trace-Ereignisse …"}),c&&m.jsx("p",{role:"status",children:c}),!o&&!c&&s.length===0&&m.jsx("p",{children:"Für diesen Knotentyp gibt es keine gefilterte Zeitleiste."}),m.jsx("ol",{children:s.map(p=>m.jsxs("li",{children:[m.jsx("code",{children:p.type})," ",m.jsx("time",{dateTime:p.occurredAt,children:Xd(p.occurredAt)}),m.jsx("span",{children:p.summary})]},p.eventId))})]})]})]}):m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Wähle einen registrierten Workspace. Ohne Workspace kann keine Trace-Projektion behauptet werden."})]})}function K3({tasks:t,depth:e}){if(t.length===0)return m.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});t.filter(s=>s.state==="pending");const n=t.filter(s=>s.state==="claimed"),i=t.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return m.jsxs("div",{className:"queue",children:[m.jsxs("div",{className:"queue__figures",children:[m.jsx(Wc,{value:e,label:"WARTEND",tone:e>8?"hot":void 0}),m.jsx(Wc,{value:n.length,label:"IN ARBEIT"}),m.jsx(Wc,{value:i.length,label:"GELIEFERT"}),m.jsx(Wc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),m.jsx("ol",{className:"queue__list",children:t.map(s=>m.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[m.jsx("span",{className:"queue__state",children:Q3[s.state]??s.state}),m.jsx("span",{className:"queue__title",title:s.title,children:s.title}),m.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&m.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&m.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const Q3={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function Wc({value:t,label:e,tone:n}){return m.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[m.jsx("strong",{children:t}),m.jsx("span",{children:e})]})}const J3=8e3;function $3(t,e=J3){return new Promise((n,i)=>{const a=globalThis.setTimeout(()=>{i(new Error(`Brain-Dateiabruf hat nach ${e/1e3} Sekunden nicht geantwortet. Bitte nach dem Indexlauf erneut versuchen.`))},e);t.then(s=>{globalThis.clearTimeout(a),n(s)},s=>{globalThis.clearTimeout(a),i(s)})})}function wr({workspaceId:t,path:e,highlightLine:n,onClose:i,onNavigateFile:a}){const[s,r]=ae.useState(!0),[o,l]=ae.useState(null),[c,f]=ae.useState(null),[h,u]=ae.useState(null),[p,g]=ae.useState([]),b=ae.useRef(null);if(ae.useEffect(()=>{let M=!0;return r(!0),l(null),f(null),u(null),g([]),$3(C3(t,e)).then(_=>{M&&(l(_),r(!1))}).catch(_=>{M&&(l({ok:!1,path:e,content:"",bytes:0,lang:null,error:String((_==null?void 0:_.message)??_)}),r(!1))}),y3(t).then(_=>{M&&f(_)}).catch(()=>{}),E3(t,e).then(_=>{M&&u(_)}).catch(()=>{}),U3(t,e).then(_=>{M&&g(_)}).catch(()=>{}),()=>{M=!1}},[t,e]),ae.useEffect(()=>{!s&&b.current&&b.current.scrollIntoView({behavior:"smooth",block:"center"})},[s,n]),s)return m.jsxs("div",{className:"source-container source-container--loading",children:[m.jsx("div",{className:"source-spinner"}),m.jsxs("p",{children:["Lade Dateiinhalt aus dem Brain (",e,") …"]})]});if(!o||!o.ok)return m.jsxs("div",{className:"source-container source-container--error",role:"alert",children:[m.jsxs("div",{className:"source-header",children:[m.jsx("span",{className:"source-header__path mono",children:e}),i&&m.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Schließen",children:"✕"})]}),m.jsxs("div",{className:"source-error-box",children:[m.jsx("div",{className:"source-error-icon",children:"⚠️"}),m.jsx("h3",{children:"Fehler beim Laden der Datei"}),m.jsx("p",{className:"source-error-msg",children:(o==null?void 0:o.error)||"Die Datei existiert nicht im Workspace oder der Pfad ist ungültig."}),m.jsxs("div",{className:"source-error-details mono",children:["Workspace: ",t,m.jsx("br",{}),"Pfad: ",e]})]})]});const v=o.content.split(/\r?\n/),d=v.length,x=c!=null&&c.head?c.head.slice(0,8):null;return m.jsxs("div",{className:"source-container",children:[m.jsxs("div",{className:"source-header",children:[m.jsxs("div",{className:"source-header__meta",children:[m.jsx("span",{className:"source-header__icon",children:"📄"}),m.jsx("span",{className:"source-header__path mono",title:o.path,children:o.path}),o.lang&&m.jsx("span",{className:"source-badge source-badge--lang",children:o.lang}),m.jsxs("span",{className:"source-badge source-badge--info",children:[d," Zeilen · ",o.bytes," B"]}),x&&m.jsxs("span",{className:"source-badge source-badge--git",title:`Git Revision: ${c==null?void 0:c.head}`,children:["git: ",x," (",(c==null?void 0:c.branch)??"detached",")"]}),(h==null?void 0:h.owner)&&m.jsxs("span",{className:"source-badge source-badge--agent",style:{borderColor:h.owner.color},title:`Zuletzt geändert durch ${h.owner.name} (${h.owner.at})`,children:[m.jsx("i",{style:{background:h.owner.color}}),h.owner.name]})]}),m.jsxs("div",{className:"source-header__actions",children:[n&&m.jsxs("span",{className:"source-badge source-badge--highlight",children:["Fokus: Zeile ",n]}),i&&m.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Quellansicht schließen",children:"✕"})]})]}),m.jsxs("div",{className:"source-body",children:[m.jsx("div",{className:"source-code-view",children:m.jsx("table",{className:"source-table",children:m.jsx("tbody",{children:v.map((M,_)=>{const A=_+1,R=n===A;return m.jsxs("tr",{ref:R?b:void 0,className:`source-line-row ${R?"source-line-row--highlight":""}`,children:[m.jsx("td",{className:"source-line-num mono","data-line":A,children:A}),m.jsx("td",{className:"source-line-code mono",children:m.jsx("pre",{children:M||" "})})]},A)})})})}),p.length>0&&m.jsxs("div",{className:"source-backlinks",style:{padding:"12px 16px",borderTop:"1px solid var(--line)",background:"rgba(255,255,255,0.02)"},children:[m.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["← Rückverweise / Backlinks (",p.length,")"]}),m.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:p.map((M,_)=>m.jsxs("div",{className:"search-hit-card",style:{padding:"6px 10px",fontSize:"11px",cursor:"pointer"},onClick:()=>a==null?void 0:a(M.path,M.line),title:`Zeile ${M.line} in ${M.path}`,children:[m.jsx("span",{className:"mono",style:{color:"var(--accent)"},children:M.path}),m.jsxs("span",{style:{color:"var(--faint)",marginLeft:"6px"},children:[":",M.line]}),M.alias&&m.jsxs("span",{style:{marginLeft:"4px",fontStyle:"italic"},children:["(",M.alias,")"]})]},_))})]})]})]})}function e2(t){const e={name:"",path:"",isDir:!0,children:new Map};for(const n of t){const i=n.path.split(/[\\/]/).filter(Boolean);let a=e;for(let s=0;s<i.length;s++){const r=i[s];if(s===i.length-1)a.children.set(r,{name:r,path:n.path,isDir:!1,children:new Map,file:n});else{let l=a.children.get(r);l||(l={name:r,path:i.slice(0,s+1).join("/"),isDir:!0,children:new Map},a.children.set(r,l)),a=l}}}return e}function t2({workspaceName:t,files:e,activePath:n,onSelectFile:i}){const[a,s]=ae.useState(""),[r,o]=ae.useState(new Set),l=ae.useMemo(()=>e2(e),[e]),c=h=>{o(u=>{const p=new Set(u);return p.has(h)?p.delete(h):p.add(h),p})},f=(h,u=0)=>{var g,b,v;if(h.isDir){const d=r.has(h.path),x=Array.from(h.children.values()).sort((_,A)=>_.isDir!==A.isDir?_.isDir?-1:1:_.name.localeCompare(A.name)),M=a?x.filter(_=>_.path.toLowerCase().includes(a.toLowerCase())):x;return a&&M.length===0&&!h.name.toLowerCase().includes(a.toLowerCase())?null:m.jsxs("div",{className:"tree-dir-group",children:[h.name&&m.jsxs("div",{className:`tree-item tree-item--dir ${u===0?"tree-item--root":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>c(h.path),children:[m.jsx("span",{className:"tree-icon",children:d?"📁":"📂"}),m.jsx("span",{className:"tree-label",children:h.name}),m.jsx("span",{className:"tree-badge tree-badge--count",children:h.children.size})]}),(!d||a)&&m.jsx("div",{className:"tree-dir-children",children:M.map(_=>f(_,h.name?u+1:u))})]},h.path||"root")}const p=n===h.path;return a&&!h.path.toLowerCase().includes(a.toLowerCase())?null:m.jsxs("div",{className:`tree-item tree-item--file ${p?"tree-item--active":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>i(h.path),title:h.path,children:[m.jsx("span",{className:"tree-icon",children:"📄"}),m.jsx("span",{className:"tree-label mono",children:h.name}),((g=h.file)==null?void 0:g.lang)&&m.jsx("span",{className:"tree-badge tree-badge--lang",children:h.file.lang}),((b=h.file)==null?void 0:b.loc)!==void 0&&m.jsxs("span",{className:"tree-badge tree-badge--loc",children:[h.file.loc," L"]}),((v=h.file)==null?void 0:v.agent)&&m.jsx("span",{className:"tree-agent-dot",style:{background:h.file.agent.color},title:`Owner: ${h.file.agent.name}`})]},h.path)};return m.jsxs("div",{className:"explorer-view",children:[m.jsxs("div",{className:"explorer-header",children:[m.jsxs("div",{className:"explorer-title",children:[m.jsx("span",{className:"explorer-title__icon",children:"🗂️"}),m.jsxs("strong",{children:[t||"Workspace"," Explorer"]})]}),m.jsx("div",{className:"explorer-stats",children:m.jsxs("span",{children:[e.length," Dateien aus Brain"]})})]}),m.jsxs("div",{className:"explorer-search",children:[m.jsx("input",{type:"text",placeholder:"Dateibaum filtern …",value:a,onChange:h=>s(h.target.value),className:"explorer-search__input"}),a&&m.jsx("button",{type:"button",className:"explorer-search__clear",onClick:()=>s(""),children:"✕"})]}),m.jsx("div",{className:"explorer-tree",children:e.length===0?m.jsx("div",{className:"explorer-empty",children:"Keine Dateien im Snapshot vorhanden."}):f(l)})]})}function n2({workspaceId:t,onSelectHit:e}){const[n,i]=ae.useState(()=>{const T=new URLSearchParams(window.location.search).get("mode");return T==="notes"||T==="prose"?T:"code"}),[a,s]=ae.useState(()=>new URLSearchParams(window.location.search).get("q")||""),[r,o]=ae.useState([]),[l,c]=ae.useState([]),[f,h]=ae.useState([]),[u,p]=ae.useState(0),[g,b]=ae.useState(null),[v,d]=ae.useState(!1),[x,M]=ae.useState(""),[_,A]=ae.useState(""),R=async(T,y,C)=>{T&&T.preventDefault();const w=C??n,D=(y??a).trim();if(!D)return;d(!0),M(""),b(null);const P=performance.now();try{if(w==="code"){const G=await w3(t,D);o(G),c([]),h([])}else if(w==="prose"){const G=await D3(t,D);h(G.hits||[]),p(G.total??0),o([]),c([])}else{const G=await N3(t,D);c(G.notes||[]),o([]),h([])}b(Math.round(performance.now()-P)),A(D)}catch(G){M((G==null?void 0:G.message)||`Fehler bei der Suche (${w})`),o([]),c([]),h([])}finally{d(!1)}};return ae.useEffect(()=>{const T=new URLSearchParams(window.location.search).get("q");T&&t&&R(void 0,T,n)},[t]),m.jsxs("div",{className:"search-view",children:[m.jsxs("div",{className:"search-view__header",children:[m.jsxs("div",{className:"search-view__title",children:[m.jsx("span",{className:"search-view__icon",children:"🔍"}),m.jsx("strong",{children:n==="code"?"Agent Code- & Symbolsuche":n==="prose"?"Notiz-Volltextsuche":"Notizen- & Property-Abfrage"}),m.jsx("span",{className:"search-view__endpoint mono",children:n==="code"?"/api/agent/search":n==="prose"?"/api/notes/search":"/api/notes/query"})]}),m.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[m.jsx("button",{type:"button",className:`tb ${n==="code"?"on":""}`,onClick:()=>{i("code"),a.trim()&&R(void 0,a,"code")},children:"Code & Symbole"}),m.jsx("button",{type:"button",className:`tb ${n==="notes"?"on":""}`,onClick:()=>{i("notes"),a.trim()||s("typ=gate UND stand=offen"),R(void 0,a.trim()||"typ=gate UND stand=offen","notes")},children:"Notizen & Properties (Bases)"}),m.jsx("button",{type:"button",className:`tb ${n==="prose"?"on":""}`,onClick:()=>{i("prose"),a.trim()||s("Gateway Owner"),R(void 0,a.trim()||"Gateway Owner","prose")},children:"Notiz-Volltext"})]})]}),m.jsx("form",{className:"search-form",onSubmit:R,style:{marginTop:"10px"},children:m.jsxs("div",{className:"search-input-group",children:[m.jsx("input",{type:"search",className:"search-input",placeholder:n==="code"?"Symbol, Variable, Klasse, Datei (z. B. authKey) …":n==="prose"?"Satz oder Stichwörter aus dem Notiztext (z. B. Gateway Owner) …":"Bases-Filter: typ=gate UND stand=offen oder typ=mission …",value:a,onChange:T=>s(T.target.value),autoFocus:!0}),m.jsx("button",{type:"submit",className:"search-submit-btn",disabled:v||!a.trim(),children:v?"Suche …":"Suchen"})]})}),x&&m.jsxs("div",{className:"search-error-alert",role:"alert",children:["⚠️ ",x]}),m.jsxs("div",{className:"search-results",children:[_&&m.jsxs("div",{className:"search-results-summary",children:[n==="code"?r.length===0?`Keine Code-Treffer für "${_}" im Brain-Index`:`${r.length} Treffer für "${_}":`:n==="prose"?f.length===0?`Kein Notiztext enthält "${_}"`:`${u} Notiz(en) im Text, ${f.length} angezeigt`:l.length===0?`Keine Notizen entsprechen dem Filter "${_}"`:`${l.length} Notiz(en) gefunden für "${_}":`,g!==null&&m.jsxs("span",{className:"search-results-time mono",style:{marginLeft:"8px",opacity:.7},children:[g," ms"]})]}),n==="code"?m.jsx("div",{className:"search-hits-list",children:r.map((T,y)=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name mono",children:T.name}),m.jsx("span",{className:`search-hit-kind search-hit-kind--${T.kind}`,children:T.kind}),T.line!==null&&m.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,children:["📄 ",T.path]})]},`${T.path}-${T.name}-${T.line??y}`))}):n==="prose"?m.jsx("div",{className:"search-hits-list",children:f.map(T=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name",children:T.title}),T.line!==null&&m.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),T.snippet&&m.jsx("div",{className:"search-hit-snippet",children:T.snippet}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]})]},`${T.path}-${T.line??0}`))}):m.jsx("div",{className:"search-hits-list",children:l.map(T=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name",children:T.title}),T.typ&&m.jsx("span",{className:"search-hit-kind search-hit-kind--class",children:T.typ}),T.stand&&m.jsx("span",{className:"source-badge",style:{fontSize:"11px",marginLeft:"6px"},children:T.stand})]}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]}),(T.inLinks!==void 0||T.outLinks!==void 0)&&m.jsxs("div",{style:{fontSize:"11px",color:"var(--faint)",marginTop:"4px"},children:["Verlinkungen: → ",T.outLinks??0," ausgehend · ← ",T.inLinks??0," Rückverweise"]})]},T.path))})]})]})}function i2(t){const e=[],n=t.split(`
`);for(const i of n){const a=i.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/);a&&e.push({path:a[1],reasons:a[2]})}return e}function a2({workspaceId:t,onSelectSource:e}){const[n,i]=ae.useState(()=>new URLSearchParams(window.location.search).get("goal")||"authKey security tests"),[a,s]=ae.useState(!1),[r,o]=ae.useState(""),[l,c]=ae.useState(null),[f,h]=ae.useState(null),[u,p]=ae.useState(!1),[g,b]=ae.useState(!1);ae.useEffect(()=>{const M=new URLSearchParams(window.location.search).get("goal");M&&t&&(s(!0),jv(t,M).then(_=>{c(_),_.id&&d(_.id)}).catch(_=>o((_==null?void 0:_.message)||"Fehler beim Erzeugen")).finally(()=>s(!1)))},[t]);const v=async M=>{M&&M.preventDefault();const _=n.trim();if(_){s(!0),o(""),c(null),h(null);try{const A=await jv(t,_);c(A),A.id&&d(A.id)}catch(A){o((A==null?void 0:A.message)||"Fehler beim Erzeugen des Context Packs")}finally{s(!1)}}},d=async M=>{p(!0);try{const _=await R3(M);h(_)}catch(_){console.error("Staleness check error:",_)}finally{p(!1)}},x=l!=null&&l.body?i2(l.body):[];return m.jsxs("div",{className:"pack-view",children:[m.jsx("div",{className:"pack-view__header",children:m.jsxs("div",{className:"pack-view__title",children:[m.jsx("span",{className:"pack-view__icon",children:"📦"}),m.jsx("strong",{children:"Context-Pack-Inspector"}),m.jsx("span",{className:"pack-view__endpoint mono",children:"/api/context/pack"})]})}),m.jsx("form",{className:"pack-form",onSubmit:v,children:m.jsxs("div",{className:"pack-form__field",children:[m.jsx("label",{htmlFor:"pack-goal-input",children:"Aufgabe / Ziel für den Agenten:"}),m.jsxs("div",{className:"pack-input-row",children:[m.jsx("input",{id:"pack-goal-input",type:"text",className:"pack-input",value:n,onChange:M=>i(M.target.value),placeholder:"z. B. authKey security tests"}),m.jsx("button",{type:"submit",className:"pack-create-btn",disabled:a||!n.trim(),children:a?"Erzeuge …":"Pack erzeugen"})]})]})}),r&&m.jsxs("div",{className:"pack-error-alert",role:"alert",children:["⚠️ ",r]}),l&&m.jsx("div",{className:"pack-details",children:m.jsxs("div",{className:"pack-card",children:[m.jsxs("div",{className:"pack-card__header",children:[m.jsxs("div",{className:"pack-card__meta",children:[m.jsx("span",{className:"pack-id mono",children:l.id}),m.jsxs("span",{className:"pack-badge pack-badge--version",children:["v",l.version]}),m.jsxs("span",{className:"pack-badge pack-badge--sources",children:[l.sources," Quellen"]})]}),m.jsxs("div",{className:"pack-card__staleness",children:[u?m.jsx("span",{className:"pack-staleness-badge pack-staleness-badge--loading",children:"Prüfe …"}):f?m.jsx("span",{className:`pack-staleness-badge ${f.stale?"pack-staleness-badge--stale":"pack-staleness-badge--fresh"}`,children:f.stale?"🔴 Veraltet":"🟢 Frisch"}):null,m.jsx("button",{type:"button",className:"pack-staleness-btn",onClick:()=>d(l.id),disabled:u,title:"Staleness gegen aktuellen Brain-Index prüfen",children:"Neu prüfen"})]})]}),f&&f.stale&&m.jsxs("div",{className:"pack-stale-warning",children:[m.jsx("strong",{children:"Quellen haben sich geändert:"}),f.changed.length>0&&m.jsxs("div",{children:["Geändert: ",f.changed.join(", ")]}),f.missing.length>0&&m.jsxs("div",{children:["Fehlt: ",f.missing.join(", ")]})]}),m.jsxs("div",{className:"pack-sources-section",children:[m.jsx("h4",{children:"Extrahierte Quellen aus dem Index:"}),x.length===0?m.jsx("div",{className:"pack-sources-empty",children:"Keine spezifischen Quelltreffer für dieses Ziel gefunden."}):m.jsx("div",{className:"pack-sources-list",children:x.map(M=>m.jsxs("div",{className:"pack-source-item",onClick:()=>e(M.path),title:`Klicken, um ${M.path} in Quellansicht zu öffnen`,children:[m.jsxs("div",{className:"pack-source-path mono",children:["📄 ",M.path]}),m.jsx("div",{className:"pack-source-why",children:M.reasons})]},M.path))})]}),m.jsx("div",{className:"pack-body-toggle",children:m.jsx("button",{type:"button",className:"pack-toggle-raw-btn",onClick:()=>b(M=>!M),children:g?"Markdown-Text verbergen":"Vollständigen Pack-Markdown anzeigen"})}),g&&m.jsx("div",{className:"pack-raw-markdown mono",children:m.jsx("pre",{children:l.body})})]})})]})}const Zy=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"explorer",label:"Explorer",hint:"Echter Quellbaum aus dem Brain"},{id:"search",label:"Suche",hint:"Code- & Symbolsuche über /api/agent/search"},{id:"packs",label:"Packs",hint:"Context-Pack-Inspector"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Nachweisbare Arbeit und Übergaben aus dem Core-Trace"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],jd=l3,s2=2e3;function r2(){const t=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=t||e;return Zy.some(i=>i.id===n)?n:"atlas"}function o2(){const t=new URLSearchParams(location.search);return t.has("workspace")?t.get("workspace")??"":t.has("workspaceRoot")?"":c3()}function l2(){var j,ne,ue;const[t,e]=ae.useState(null),[n,i]=ae.useState(null),[a,s]=ae.useState({depth:0,tasks:[]}),[r,o]=ae.useState(""),[l,c]=ae.useState(0),[f,h]=ae.useState(r2),[u,p]=ae.useState(o2),g=ae.useMemo(()=>{const L=new URLSearchParams(location.search);return L.has("workspace")?null:L.get("workspaceRoot")},[]),[b,v]=ae.useState([]),[d,x]=ae.useState(!1),[M,_]=ae.useState(""),[A,R]=ae.useState(!1),[T,y]=ae.useState(""),[C,w]=ae.useState(""),[D,P]=ae.useState(""),[G,O]=ae.useState(null),[z,B]=ae.useState(null),[I,U]=ae.useState(!1),[X,oe]=ae.useState([]),[ce,xe]=ae.useState(()=>{const L=new URLSearchParams(location.search).get("file"),V=Number(new URLSearchParams(location.search).get("line"));return L?{path:L,line:Number.isFinite(V)?V:null}:null}),[ke,Ke]=ae.useState(!1),[Be,se]=ae.useState(Xy()),[_e,me]=ae.useState(Ro()),[Le,ze]=ae.useState(!1),[Ie,xt]=ae.useState(null),[We,lt]=ae.useState([]),[Ge,qe]=ae.useState(!1),[Ct,mt]=ae.useState("");ae.useEffect(()=>{try{localStorage.setItem("plugbrain.view",f)}catch{}},[f]),ae.useEffect(()=>{f==="mesh"&&(U(!1),B(null))},[f]);const zt=ae.useRef(null);ae.useEffect(()=>{zt.current=z},[z]);const Ot=L=>{p(L),u3(L);const V=new URL(location.href);L?V.searchParams.set("workspace",L):V.searchParams.delete("workspace"),L&&V.searchParams.delete("workspaceRoot"),history.replaceState(null,"",V.toString())};ae.useEffect(()=>{if(!u)return;let L=!0;return fetch(`/api/graph?workspace=${encodeURIComponent(u)}&limit=5000`).then(V=>V.json()).then(V=>{if(!L||!(V!=null&&V.nodes))return;const he=V.nodes.filter(fe=>{var Ce;return fe.type==="file"&&(fe.path||((Ce=fe.properties)==null?void 0:Ce.path))}).map(fe=>{var Ce,F,pe,te;return{id:fe.id,path:fe.path||((Ce=fe.properties)==null?void 0:Ce.path),label:fe.label||fe.path,lang:fe.lang||((F=fe.properties)==null?void 0:F.lang),loc:fe.loc??((pe=fe.properties)==null?void 0:pe.lines)??0,agent:fe.agent||((te=fe.properties)!=null&&te.agentId?{id:fe.properties.agentId,name:fe.properties.agentName,color:fe.properties.agentColor}:null)}});oe(he)}).catch(()=>{}),()=>{L=!1}},[u,l]),ae.useEffect(()=>{let L=!0;return Xv().then(V=>{if(L){if(v(V),!u&&g!==null){const he=f3(V,g);he&&Ot(he);return}if(!u&&V.length>0){const he=[...V].sort((fe,Ce)=>(Ce.indexedAt??"").localeCompare(fe.indexedAt??""))[0];he&&Ot(he.id)}}}).catch(()=>{L&&y("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{L=!1}},[]);const Rt=async L=>{L.preventDefault();const V=M.trim();if(V!==""){R(!0),y(""),w(""),P("Vault registriert — Indexlauf wird vorbereitet …");try{const he=await d3(V,void 0,fe=>P(Pp(fe)));Xv().then(fe=>{fe.length>0&&v(fe)}).catch(()=>{}),w("Vault registriert und indiziert."),_(""),x(!1),Ot(he),c(fe=>fe+1)}catch(he){y(he instanceof Error?he.message:String(he))}finally{R(!1),P("")}}},ye=async()=>{if(!(!u||A)){R(!0),y(""),w(""),P("Indexlauf wird vorbereitet …");try{const L=await Vy(u,V=>P(Pp(V)));w(`Neu indiziert: ${(L==null?void 0:L.files)??0} Dateien, ${(L==null?void 0:L.symbols)??0} Symbole, ${(L==null?void 0:L.edges)??0} Kanten.`),c(V=>V+1)}catch(L){y(L instanceof Error?L.message:String(L))}finally{R(!1),P("")}}};ae.useEffect(()=>{if(!u)return;let L=!0,V;const he=async()=>{try{const fe=await fetch(`/api/index/progress?workspace=${encodeURIComponent(u)}`);if(fe.ok){const Ce=await fe.json();if(!L)return;P(F=>h3(Ce,F))}}catch{}L&&(V=setTimeout(()=>void he(),1500))};return he(),()=>{L=!1,clearTimeout(V)}},[u]);const H=L=>{L.preventDefault(),Wy(Be.trim()),_3(_e.trim()),A3(),c(V=>V+1),Ke(!1)},nt=async()=>{if(!(!u||Ge)){qe(!0),mt("");try{const L=await x3(u);xt(L),lt([...L.indexSelection.checkoutIds]),ze(!0)}catch(L){mt(L instanceof Error?L.message:String(L)),ze(!0)}finally{qe(!1)}}},Ve=L=>{lt(V=>V.includes(L)?V.filter(he=>he!==L):[...V,L])},N=async L=>{if(L.preventDefault(),!(!u||Ge)){qe(!0),mt("");try{const V=await S3(u,We);xt(V),lt([...V.indexSelection.checkoutIds]),w(V.indexSelection.checkoutIds.length===0?"Code-Auswahl gespeichert: bewusst keine Code-Checkouts aktiv.":`Code-Auswahl gespeichert: ${V.indexSelection.checkoutIds.length} Checkout(s) aktiv.`),ze(!1),c(he=>he+1)}catch(V){mt(V instanceof Error?V.message:String(V))}finally{qe(!1)}}},S=m.jsxs("form",{className:"brain-vault",onSubmit:Rt,children:[m.jsxs("div",{className:"brain-vault__row",children:[m.jsx("input",{className:"brain-vault__path",value:M,onChange:L=>_(L.target.value),placeholder:"Pfad eines Ordners, z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),m.jsx("button",{type:"submit",className:"brain-vault__open",disabled:A||M.trim()==="",children:A?"Indiziere …":"Als Vault öffnen"})]}),u&&m.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:m.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:A,onClick:()=>void ye(),children:A?"läuft …":"Neu indizieren"})}),D&&m.jsx("p",{className:"brain-vault__progress",role:"status","aria-live":"polite",children:D}),T&&m.jsx("p",{className:"brain-vault__error",role:"alert",children:T}),C&&m.jsx("p",{className:"brain-vault__done",role:"status",children:C})]});ae.useEffect(()=>{const L=u||void 0;fetch("/api/timeline"+(L?"?workspace="+encodeURIComponent(L):"")).then(V=>V.json()).then(V=>{var he;(he=V==null?void 0:V.bounds)!=null&&he.first&&O(V.bounds)}).catch(()=>{})},[u]),ae.useEffect(()=>{if(!I||!G)return;const L=new Date(G.first).getTime(),V=new Date(G.last).getTime(),he=Math.max(1,V-L);let fe=z?Math.round((new Date(z).getTime()-L)/he*60):0;const Ce=setInterval(()=>{if(fe+=1,fe>=60){B(null),U(!1);return}B(new Date(L+he*fe/60).toISOString())},220);return()=>clearInterval(Ce)},[I,G]),ae.useEffect(()=>{const L=new AbortController;let V,he="";const fe=u||void 0;async function Ce(){var F,pe,te;try{const Q=new URLSearchParams;fe&&Q.set("workspace",fe),Q.set("limit",String(s2)),zt.current&&Q.set("until",zt.current);const ve=await fetch("/api/atlas/snapshot"+(Q.toString()?`?${Q}`:""),{signal:L.signal});if(!ve.ok)throw new Error(`Brain-Verbindung: HTTP ${ve.status}`);const re=await ve.json();if(!((F=re.workspace)!=null&&F.canonicalPath)||!Array.isArray((pe=re.graph)==null?void 0:pe.nodes)||!Array.isArray((te=re.graph)==null?void 0:te.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const Re=`${re.workspace.id}:${re.updatedAt??""}:${re.graph.nodes.length}:${re.graph.edges.length}`;Re!==he&&(e(re),he=Re),o("")}catch(Q){L.signal.aborted||o(Q instanceof Error?Q.message:String(Q))}if(fe)try{const Q=await M3(fe);L.signal.aborted||i(Q)}catch{L.signal.aborted||i(null)}else L.signal.aborted||i(null);try{const Q=await fetch("/api/queue"+(fe?"?workspace="+encodeURIComponent(fe):""),{signal:L.signal});if(Q.ok){const ve=await Q.json();(ve==null?void 0:ve.ok)===!0&&Array.isArray(ve.tasks)&&s({depth:Number(ve.depth??0),tasks:ve.tasks})}}catch{}L.signal.aborted||(V=setTimeout(Ce,3e3))}return Ce(),()=>{L.abort(),clearTimeout(V)}},[l,z,u]);const W=(t==null?void 0:t.graph.nodes.length)??X.length,Y=(t==null?void 0:t.graph.edges.length)??0,$=t!=null&&t.coverage?!t.coverage.indexComplete:!1,de=r?"getrennt (offline)":t||X.length>0?$?`${((j=t==null?void 0:t.coverage)==null?void 0:j.staleFiles)??0} Datei(en) warten auf den Index`:"live":"lädt …",ge=ae.useMemo(()=>{var L;return X.length>0?X:(L=t==null?void 0:t.graph)!=null&&L.nodes?t.graph.nodes.filter(V=>{var he;return V.type==="file"&&(((he=V.properties)==null?void 0:he.path)||V.path)}).map(V=>{var fe,Ce,F,pe;const he=((fe=V.properties)==null?void 0:fe.path)||V.path||"";return{id:V.id,path:he,label:V.label||V.name||he,lang:((Ce=V.properties)==null?void 0:Ce.lang)??V.lang??null,loc:((F=V.properties)==null?void 0:F.lines)??V.loc??0,agent:(pe=V.properties)!=null&&pe.agentId?{id:V.properties.agentId,name:V.properties.agentName||V.properties.agentId,color:V.properties.agentColor||"#60a5fa"}:null}}):[]},[X,t]),ee=(L,V)=>{L&&xe({path:L,line:V})};return m.jsxs(m.Fragment,{children:[r&&m.jsx("div",{className:"brain-offline-banner",role:"alert",children:m.jsxs("div",{className:"brain-offline-banner__inner",children:[m.jsx("span",{className:"brain-offline-badge",children:"OFFLINE"}),m.jsxs("span",{className:"brain-offline-text",children:[m.jsx("strong",{children:"Server nicht erreichbar:"})," ",r," — läuft ",m.jsx("code",{children:"plugbrain serve"}),"?"]}),m.jsx("button",{type:"button",className:"brain-offline-btn",onClick:()=>c(L=>L+1),children:"Erneut verbinden"})]})}),m.jsxs("div",{className:"live-status",role:"status",children:[m.jsx("strong",{className:"live-status__name",title:(t==null?void 0:t.workspace.canonicalPath)??"",children:t?jd(t.workspace.name):((ne=b.find(L=>L.id===u))==null?void 0:ne.name)||"PlugBrain"}),u&&b.length>0&&m.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:m.jsx("select",{value:u,onChange:L=>{const V=L.target.value;V&&Ot(V)},children:b.map(L=>m.jsx("option",{value:L.id,children:jd(L.name)},L.id))})}),u&&m.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{x(L=>!L),y(""),w("")},title:"Einen Ordner als neuen Vault öffnen",children:d?"Schließen":"Vault öffnen"}),u&&m.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>void nt(),disabled:Ge,title:"Aktive Code-Checkouts aus dem Planet-Inventar auswählen",children:Ge?"Lade Code …":"Code-Auswahl"}),m.jsxs("span",{className:"live-status__figures",children:[m.jsx("b",{children:W})," Objekte ",m.jsx("b",{children:Y})," Kanten",(t==null?void 0:t.coverage)&&t.coverage.totalFiles>t.coverage.shownFiles&&m.jsxs("span",{className:"live-status__sample",title:`Ausschnitt: ${t.coverage.shownFiles} von ${t.coverage.totalFiles} Dateien des Index`,children:[" ","· Ausschnitt aus ",t.coverage.totalFiles," Dateien"]})]}),m.jsx("span",{className:r?"live-status__state is-bad":"live-status__state",children:de}),m.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:Zy.map(L=>m.jsx("button",{type:"button",title:L.hint,className:L.id===f?"on":void 0,"aria-pressed":L.id===f,onClick:()=>{h(L.id)},children:L.label},L.id))}),m.jsx("button",{type:"button",className:"brain-auth-btn",onClick:()=>Ke(!0),title:"Auth-Token konfigurieren",children:"🔑 Auth"}),r&&m.jsx("button",{type:"button",onClick:()=>c(L=>L+1),children:"Erneut verbinden"})]}),ke&&m.jsx("div",{className:"brain-modal-backdrop",onClick:()=>Ke(!1),children:m.jsxs("div",{className:"brain-modal",onClick:L=>L.stopPropagation(),children:[m.jsxs("div",{className:"brain-modal__header",children:[m.jsx("h3",{children:"PlugBrain Authentifizierung"}),m.jsx("button",{type:"button",className:"brain-modal__close",onClick:()=>Ke(!1),children:"✕"})]}),m.jsxs("form",{onSubmit:H,children:[m.jsxs("div",{className:"brain-modal__field",children:[m.jsxs("label",{children:["Bearer Token (aus ",m.jsx("code",{children:"auth.token"}),"):"]}),m.jsx("input",{type:"text",className:"brain-modal__input mono",value:Be,onChange:L=>se(L.target.value),placeholder:"plug-..."})]}),m.jsxs("div",{className:"brain-modal__field",children:[m.jsx("label",{children:"Agent ID:"}),m.jsx("input",{type:"text",className:"brain-modal__input mono",value:_e,onChange:L=>me(L.target.value),placeholder:"agy"})]}),m.jsxs("div",{className:"brain-modal__actions",children:[m.jsx("button",{type:"button",onClick:()=>Ke(!1),children:"Abbrechen"}),m.jsx("button",{type:"submit",className:"primary",children:"Speichern"})]})]})]})}),Le&&m.jsx("div",{className:"brain-modal-backdrop",onClick:()=>!Ge&&ze(!1),children:m.jsxs("div",{className:"brain-modal brain-selection-modal",onClick:L=>L.stopPropagation(),children:[m.jsxs("div",{className:"brain-modal__header",children:[m.jsx("h3",{children:"Aktive Code-Checkouts"}),m.jsx("button",{type:"button",className:"brain-modal__close",disabled:Ge,onClick:()=>ze(!1),children:"✕"})]}),m.jsx("p",{className:"brain-selection-modal__hint",children:"Das Inventar bleibt vollständig sichtbar. Nur die hier bewusst markierten Checkout-IDs werden beim nächsten Scan als aktiver Code indexiert."}),m.jsxs("form",{onSubmit:N,children:[Ct&&m.jsx("p",{className:"brain-vault__error",role:"alert",children:Ct}),Ie===null?m.jsx("p",{className:"brain-selection-modal__hint",children:"Planet-Inventar wird geladen …"}):Ie.checkouts.length===0?m.jsx("p",{className:"brain-selection-modal__hint",children:"Dieser Workspace hat keine discoverbaren Code-Checkouts."}):m.jsxs("fieldset",{className:"brain-selection-list",disabled:Ge,children:[m.jsx("legend",{children:"Checkout-Inventar"}),Ie.checkouts.map(L=>m.jsxs("label",{className:L.retiredAt?"is-retired":void 0,children:[m.jsx("input",{type:"checkbox",checked:We.includes(L.id),disabled:L.retiredAt!==null,onChange:()=>Ve(L.id)}),m.jsxs("span",{children:[m.jsx("strong",{children:L.relPrefix}),m.jsxs("small",{children:[L.id," · ",L.branch??"detached",L.retiredAt?" · retired":""]})]})]},L.id))]}),m.jsx("p",{className:"brain-selection-modal__hint",children:"Keine Auswahl ist ausdrücklich „notes only“; sie startet keinen leeren Code-Scan."}),m.jsxs("div",{className:"brain-modal__actions",children:[m.jsx("button",{type:"button",disabled:Ge,onClick:()=>ze(!1),children:"Abbrechen"}),m.jsx("button",{type:"submit",className:"primary",disabled:Ge||Ie===null,children:Ge?"Speichert …":"Auswahl speichern"})]})]})]})}),G&&(f==="atlas"||f==="city")&&m.jsxs("div",{className:"brain-timelapse",children:[m.jsx("button",{type:"button",onClick:()=>U(L=>!L),title:"Wachstum abspielen",children:I?"❚❚":"▶"}),m.jsx("input",{type:"range",min:0,max:60,step:1,value:z&&G?Math.round((new Date(z).getTime()-new Date(G.first).getTime())/Math.max(1,new Date(G.last).getTime()-new Date(G.first).getTime())*60):60,onChange:L=>{U(!1);const V=Number(L.target.value);if(V>=60){B(null);return}const he=new Date(G.first).getTime(),fe=new Date(G.last).getTime();B(new Date(he+(fe-he)*V/60).toISOString())}}),m.jsx("span",{children:z?new Date(z).toLocaleTimeString():"jetzt"})]}),d&&u&&S,u?m.jsxs("div",{className:"brain-workspace-layout",children:[f==="atlas"&&(t&&W>0?m.jsxs("div",{className:"atlas-wrapper",children:[m.jsx(u2,{graph:t.graph,onOpenSource:ee}),ce&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(wr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>xe(null)})})]}):m.jsx("div",{className:"brain-empty",children:r?m.jsxs("div",{className:"brain-empty--offline-box",children:[m.jsx("div",{className:"offline-icon",children:"🔌"}),m.jsx("h3",{children:"Server getrennt (Offline-Zustand)"}),m.jsx("p",{children:"Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt."}),m.jsx("button",{type:"button",className:"btn primary",onClick:()=>c(L=>L+1),children:"Erneut verbinden"})]}):t?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …"})),f==="explorer"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(t2,{workspaceName:(t==null?void 0:t.workspace.name)??(((ue=b.find(L=>L.id===u))==null?void 0:ue.name)||"Workspace"),files:ge,activePath:ce==null?void 0:ce.path,onSelectFile:L=>ee(L)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:ce?m.jsx(wr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>xe(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"📂"}),m.jsx("h3",{children:"Datei im Explorer auswählen"}),m.jsx("p",{children:"Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen."})]})})]}),f==="search"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(n2,{workspaceId:u,onSelectHit:(L,V)=>ee(L,V)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:ce?m.jsx(wr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>xe(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"🔍"}),m.jsxs("h3",{children:["Code- und Symbolsuche über ",m.jsx("code",{children:"/api/agent/search"})]}),m.jsxs("p",{children:["Gib einen Suchbegriff ein (z. B. ",m.jsx("code",{children:"authKey"}),"). Ein Klick auf einen Treffer öffnet direkt die Quelle."]})]})})]}),f==="packs"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(a2,{workspaceId:u,onSelectSource:L=>ee(L)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:ce?m.jsx(wr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>xe(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"📦"}),m.jsx("h3",{children:"Context-Pack-Inspector"}),m.jsx("p",{children:"Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen."})]})})]}),f==="city"&&m.jsxs("div",{className:"brain-view brain-view-city",children:[m.jsx(q3,{snapshot:t,onSelectFile:ee}),ce&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(wr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>xe(null),onNavigateFile:(L,V)=>ee(L,V)})})]}),f==="queue"&&m.jsx("div",{className:"brain-view brain-view-queue",children:m.jsx(K3,{tasks:a.tasks,depth:a.depth})}),f==="mesh"&&m.jsxs("div",{className:"brain-view brain-view-mesh",children:[m.jsx(Z3,{mesh:n,workspaceId:u,onSelectFile:ee}),ce&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(wr,{workspaceId:u,path:ce.path,highlightLine:ce.line,onClose:()=>xe(null),onNavigateFile:(L,V)=>ee(L,V)})})]})]}):m.jsxs("div",{className:"brain-landing",role:"main",children:[m.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),m.jsx("p",{className:"brain-landing__lead",children:"Ein Ordner als Vault öffnen — der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."}),S,b.length>0&&m.jsxs("div",{className:"brain-vault__known",children:[m.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),b.map(L=>m.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>Ot(L.id),children:[jd(L.name)," ",m.jsx("em",{title:L.root,children:L.indexedAt?"indiziert":"nicht indiziert"})]},L.id))]})]})]})}function c2(t,e){if(!e)return t;const n=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return t.split(n).map((i,a)=>a%2?m.jsx("mark",{children:i},a):i)}function u2({graph:t,onOpenSource:e}){const{CLUSTERS:n,nodes:i,edges:a,createAtlas:s}=ae.useMemo(()=>o3(t),[t]),r=Object.fromEntries(n.map(U=>[U.id,i.filter(X=>X.cid===U.id).length])),o=ae.useRef(null),l=ae.useRef(null),c=ae.useRef(null),f=ae.useRef(null),h=ae.useRef(null),u=ae.useRef(null),p=ae.useRef(null),g=ae.useRef(null),b=ae.useRef(null),v=ae.useRef(null),d=ae.useRef(null),x=ae.useRef(null),M=ae.useRef(null),[_,A]=ae.useState(!1),[R,T]=ae.useState({q:"",rows:[]}),[y,C]=ae.useState({flow:!0,label:!0,spin:!1}),[w,D]=ae.useState("atlas"),[P,G]=ae.useState("dark"),[O,z]=ae.useState([]),B=U=>{U!=null&&U.path&&e(U.path,U.line??null)};ae.useEffect(()=>{const U=s({els:{stage:o.current,labels:l.current,hudMode:c.current,hudSel:f.current,pathbar:h.current,chain:u.current,zlvl:p.current,sNode:g.current,sEdge:b.current,sDeg:v.current,sFps:d.current,q:x.current},emit:{gate:A,list:T,drawer:B,tools:C,theme:G}});return M.current=U,()=>{U.dispose(),M.current=null}},[s]);const I=U=>{var X;z(oe=>oe.includes(U)?oe.filter(ce=>ce!==U):[...oe,U]),(X=M.current)==null||X.toggleCluster(U)};return m.jsxs("div",{id:"app",children:[m.jsxs("aside",{children:[m.jsxs("div",{className:"brand",children:[m.jsxs("h1",{children:[m.jsx("span",{className:"dot"}),"PlugBrain"]}),m.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",m.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),m.jsxs("div",{className:"searchbox",children:[m.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[m.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),m.jsx("path",{d:"M10.5 10.5 14 14"})]}),m.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol im Graph suchen…",autoComplete:"off",spellCheck:!1,ref:x,onChange:U=>{var X;return(X=M.current)==null?void 0:X.setQuery(U.target.value)}})]}),m.jsx("div",{className:"legend",id:"legend",children:n.map(U=>m.jsxs("button",{className:"cl"+(O.includes(U.id)?" off":""),type:"button",onClick:()=>I(U.id),children:[m.jsx("i",{style:{background:U.color}}),U.name,m.jsx("b",{children:r[U.id]})]},U.id))}),m.jsx("div",{className:"listwrap",id:"list",children:R.rows.length?R.rows.map(U=>m.jsxs("div",{className:"lrow"+(U.on?" on":""),"data-i":U.i,onClick:()=>{var oe,ce;(oe=M.current)==null||oe.selectAt(U.i);const X=i[U.i];(ce=X==null?void 0:X.meta)!=null&&ce.path&&e(X.meta.path,X.meta.line)},onMouseOver:()=>{var X;return(X=M.current)==null?void 0:X.hoverAt(U.i)},onMouseLeave:()=>{var X;return(X=M.current)==null?void 0:X.hoverAt(null)},children:[m.jsx("i",{style:{background:U.color}}),m.jsx("span",{children:c2(U.name,R.q)}),m.jsx("b",{children:U.deg})]},U.i)):m.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),m.jsxs("div",{className:"foot",children:[m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-node",ref:g,children:"—"}),m.jsx("div",{className:"l",children:"Objekte"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-edge",ref:b,children:"—"}),m.jsx("div",{className:"l",children:"Kanten"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-deg",ref:v,children:"—"}),m.jsx("div",{className:"l",children:"Ø-Grad"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-fps",ref:d,children:"—"}),m.jsx("div",{className:"l",children:"FPS"})]})]})]}),m.jsxs("div",{id:"stage",ref:o,children:[m.jsx("div",{id:"labels",ref:l}),m.jsxs("div",{id:"hud",children:[m.jsx("div",{children:m.jsx("b",{id:"hud-mode",ref:c,children:"GALAXIE · FREIER ORBIT"})}),m.jsx("div",{id:"hud-sel",ref:f,children:"Knoten anklicken, um Quelle direkt zu öffnen"}),m.jsxs("div",{id:"hud-sys",children:[i.length," VON ",t.nodes.length," OBJEKTEN · ",a.length," VON ",t.edges.length," KANTEN"]})]}),m.jsxs("div",{id:"pathbar",ref:h,children:[m.jsx("span",{className:"chain",id:"chain",ref:u}),m.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.clearPath()},children:"✕"})]}),m.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([U,X])=>m.jsx("button",{className:"tb"+(w===U?" on":""),"data-view":U,type:"button",onClick:()=>{var oe;D(U),(oe=M.current)==null||oe.setView(U)},children:X},U)),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb"+(y.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleFlow()},children:"Signalfluss"}),m.jsx("button",{className:"tb"+(y.label?" on":""),id:"t-label",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleLabel()},children:"Labels"}),m.jsx("button",{className:"tb"+(y.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleSpin()},children:"Auto-Orbit"}),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var U;return(U=M.current)==null?void 0:U.dolly(1.18)},children:"−"}),m.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:p,onClick:()=>{var U;return(U=M.current)==null?void 0:U.zoomReset()},children:"100%"}),m.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var U;return(U=M.current)==null?void 0:U.dolly(1/1.18)},children:"＋"}),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleTheme()},children:P==="light"?"Nacht":"Tag"}),m.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.reset()},children:"Reset"})]}),m.jsx("div",{id:"hint",children:"Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt"}),m.jsxs("div",{id:"gate",style:_?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",m.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]})]})}jE.createRoot(document.getElementById("root")).render(m.jsx(ae.StrictMode,{children:m.jsx(l2,{})}));

(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var a_={exports:{}},nf={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tM=Symbol.for("react.transitional.element"),nM=Symbol.for("react.fragment");function s_(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:tM,type:t,key:i,ref:e!==void 0?e:null,props:n}}nf.Fragment=nM;nf.jsx=s_;nf.jsxs=s_;a_.exports=nf;var m=a_.exports,r_={exports:{}},Ze={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Gp=Symbol.for("react.transitional.element"),iM=Symbol.for("react.portal"),aM=Symbol.for("react.fragment"),sM=Symbol.for("react.strict_mode"),rM=Symbol.for("react.profiler"),oM=Symbol.for("react.consumer"),lM=Symbol.for("react.context"),cM=Symbol.for("react.forward_ref"),uM=Symbol.for("react.suspense"),fM=Symbol.for("react.memo"),o_=Symbol.for("react.lazy"),dM=Symbol.for("react.activity"),dg=Symbol.iterator;function hM(t){return t===null||typeof t!="object"?null:(t=dg&&t[dg]||t["@@iterator"],typeof t=="function"?t:null)}var l_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},c_=Object.assign,u_={};function xo(t,e,n){this.props=t,this.context=e,this.refs=u_,this.updater=n||l_}xo.prototype.isReactComponent={};xo.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};xo.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function f_(){}f_.prototype=xo.prototype;function Vp(t,e,n){this.props=t,this.context=e,this.refs=u_,this.updater=n||l_}var kp=Vp.prototype=new f_;kp.constructor=Vp;c_(kp,xo.prototype);kp.isPureReactComponent=!0;var hg=Array.isArray;function Zd(){}var kt={H:null,A:null,T:null,S:null},d_=Object.prototype.hasOwnProperty;function Xp(t,e,n){var i=n.ref;return{$$typeof:Gp,type:t,key:e,ref:i!==void 0?i:null,props:n}}function pM(t,e){return Xp(t.type,e,t.props)}function jp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Gp}function mM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var pg=/\/+/g;function Cf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?mM(""+t.key):e.toString(36)}function gM(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then(Zd,Zd):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Rr(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Gp:case iM:r=!0;break;case o_:return r=t._init,Rr(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+Cf(t,0):i,hg(a)?(n="",r!=null&&(n=r.replace(pg,"$&/")+"/"),Rr(a,e,n,"",function(c){return c})):a!=null&&(jp(a)&&(a=pM(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(pg,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(hg(t))for(var l=0;l<t.length;l++)i=t[l],s=o+Cf(i,l),r+=Rr(i,e,n,s,a);else if(l=hM(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+Cf(i,l++),r+=Rr(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return Rr(gM(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function Jl(t,e,n){if(t==null)return t;var i=[],a=0;return Rr(t,i,"","",function(s){return e.call(n,s,a++)}),i}function vM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var mg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},_M={map:Jl,forEach:function(t,e,n){Jl(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return Jl(t,function(){e++}),e},toArray:function(t){return Jl(t,function(e){return e})||[]},only:function(t){if(!jp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};Ze.Activity=dM;Ze.Children=_M;Ze.Component=xo;Ze.Fragment=aM;Ze.Profiler=rM;Ze.PureComponent=Vp;Ze.StrictMode=sM;Ze.Suspense=uM;Ze.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=kt;Ze.__COMPILER_RUNTIME={__proto__:null,c:function(t){return kt.H.useMemoCache(t)}};Ze.cache=function(t){return function(){return t.apply(null,arguments)}};Ze.cacheSignal=function(){return null};Ze.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=c_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!d_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Xp(t.type,a,i)};Ze.createContext=function(t){return t={$$typeof:lM,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:oM,_context:t},t};Ze.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)d_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Xp(t,s,a)};Ze.createRef=function(){return{current:null}};Ze.forwardRef=function(t){return{$$typeof:cM,render:t}};Ze.isValidElement=jp;Ze.lazy=function(t){return{$$typeof:o_,_payload:{_status:-1,_result:t},_init:vM}};Ze.memo=function(t,e){return{$$typeof:fM,type:t,compare:e===void 0?null:e}};Ze.startTransition=function(t){var e=kt.T,n={};kt.T=n;try{var i=t(),a=kt.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(Zd,mg)}catch(s){mg(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),kt.T=e}};Ze.unstable_useCacheRefresh=function(){return kt.H.useCacheRefresh()};Ze.use=function(t){return kt.H.use(t)};Ze.useActionState=function(t,e,n){return kt.H.useActionState(t,e,n)};Ze.useCallback=function(t,e){return kt.H.useCallback(t,e)};Ze.useContext=function(t){return kt.H.useContext(t)};Ze.useDebugValue=function(){};Ze.useDeferredValue=function(t,e){return kt.H.useDeferredValue(t,e)};Ze.useEffect=function(t,e){return kt.H.useEffect(t,e)};Ze.useEffectEvent=function(t){return kt.H.useEffectEvent(t)};Ze.useId=function(){return kt.H.useId()};Ze.useImperativeHandle=function(t,e,n){return kt.H.useImperativeHandle(t,e,n)};Ze.useInsertionEffect=function(t,e){return kt.H.useInsertionEffect(t,e)};Ze.useLayoutEffect=function(t,e){return kt.H.useLayoutEffect(t,e)};Ze.useMemo=function(t,e){return kt.H.useMemo(t,e)};Ze.useOptimistic=function(t,e){return kt.H.useOptimistic(t,e)};Ze.useReducer=function(t,e,n){return kt.H.useReducer(t,e,n)};Ze.useRef=function(t){return kt.H.useRef(t)};Ze.useState=function(t){return kt.H.useState(t)};Ze.useSyncExternalStore=function(t,e,n){return kt.H.useSyncExternalStore(t,e,n)};Ze.useTransition=function(){return kt.H.useTransition()};Ze.version="19.2.8";r_.exports=Ze;var ne=r_.exports,h_={exports:{}},af={},p_={exports:{}},m_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(B,A){var U=B.length;B.push(A);e:for(;0<U;){var V=U-1>>>1,se=B[V];if(0<a(se,A))B[V]=A,B[U]=se,U=V;else break e}}function n(B){return B.length===0?null:B[0]}function i(B){if(B.length===0)return null;var A=B[0],U=B.pop();if(U!==A){B[0]=U;e:for(var V=0,se=B.length,le=se>>>1;V<le;){var xe=2*(V+1)-1,ke=B[xe],Ke=xe+1,Be=B[Ke];if(0>a(ke,U))Ke<se&&0>a(Be,ke)?(B[V]=Be,B[Ke]=U,V=Ke):(B[V]=ke,B[xe]=U,V=xe);else if(Ke<se&&0>a(Be,U))B[V]=Be,B[Ke]=U,V=Ke;else break e}}return A}function a(B,A){var U=B.sortIndex-A.sortIndex;return U!==0?U:B.id-A.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],h=1,f=null,u=3,p=!1,g=!1,b=!1,v=!1,d=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;function _(B){for(var A=n(c);A!==null;){if(A.callback===null)i(c);else if(A.startTime<=B)i(c),A.sortIndex=A.expirationTime,e(l,A);else break;A=n(c)}}function w(B){if(b=!1,_(B),!g)if(n(l)!==null)g=!0,N||(N=!0,z());else{var A=n(c);A!==null&&I(w,A.startTime-B)}}var N=!1,T=-1,y=5,R=-1;function C(){return v?!0:!(t.unstable_now()-R<y)}function L(){if(v=!1,N){var B=t.unstable_now();R=B;var A=!0;try{e:{g=!1,b&&(b=!1,x(T),T=-1),p=!0;var U=u;try{t:{for(_(B),f=n(l);f!==null&&!(f.expirationTime>B&&C());){var V=f.callback;if(typeof V=="function"){f.callback=null,u=f.priorityLevel;var se=V(f.expirationTime<=B);if(B=t.unstable_now(),typeof se=="function"){f.callback=se,_(B),A=!0;break t}f===n(l)&&i(l),_(B)}else i(l);f=n(l)}if(f!==null)A=!0;else{var le=n(c);le!==null&&I(w,le.startTime-B),A=!1}}break e}finally{f=null,u=U,p=!1}A=void 0}}finally{A?z():N=!1}}}var z;if(typeof M=="function")z=function(){M(L)};else if(typeof MessageChannel<"u"){var G=new MessageChannel,P=G.port2;G.port1.onmessage=L,z=function(){P.postMessage(null)}}else z=function(){d(L,0)};function I(B,A){T=d(function(){B(t.unstable_now())},A)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(B){B.callback=null},t.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):y=0<B?Math.floor(1e3/B):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(B){switch(u){case 1:case 2:case 3:var A=3;break;default:A=u}var U=u;u=A;try{return B()}finally{u=U}},t.unstable_requestPaint=function(){v=!0},t.unstable_runWithPriority=function(B,A){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var U=u;u=B;try{return A()}finally{u=U}},t.unstable_scheduleCallback=function(B,A,U){var V=t.unstable_now();switch(typeof U=="object"&&U!==null?(U=U.delay,U=typeof U=="number"&&0<U?V+U:V):U=V,B){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=U+se,B={id:h++,callback:A,priorityLevel:B,startTime:U,expirationTime:se,sortIndex:-1},U>V?(B.sortIndex=U,e(c,B),n(l)===null&&B===n(c)&&(b?(x(T),T=-1):b=!0,I(w,U-V))):(B.sortIndex=se,e(l,B),g||p||(g=!0,N||(N=!0,z()))),B},t.unstable_shouldYield=C,t.unstable_wrapCallback=function(B){var A=u;return function(){var U=u;u=A;try{return B.apply(this,arguments)}finally{u=U}}}})(m_);p_.exports=m_;var xM=p_.exports,g_={exports:{}},Fn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var SM=ne;function v_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ga(){}var zn={d:{f:Ga,r:function(){throw Error(v_(522))},D:Ga,C:Ga,L:Ga,m:Ga,X:Ga,S:Ga,M:Ga},p:0,findDOMNode:null},yM=Symbol.for("react.portal");function MM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:yM,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var al=SM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function sf(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Fn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=zn;Fn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(v_(299));return MM(t,e,null,n)};Fn.flushSync=function(t){var e=al.T,n=zn.p;try{if(al.T=null,zn.p=2,t)return t()}finally{al.T=e,zn.p=n,zn.d.f()}};Fn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,zn.d.C(t,e))};Fn.prefetchDNS=function(t){typeof t=="string"&&zn.d.D(t)};Fn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=sf(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?zn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&zn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Fn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=sf(e.as,e.crossOrigin);zn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&zn.d.M(t)};Fn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=sf(n,e.crossOrigin);zn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Fn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=sf(e.as,e.crossOrigin);zn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else zn.d.m(t)};Fn.requestFormReset=function(t){zn.d.r(t)};Fn.unstable_batchedUpdates=function(t,e){return t(e)};Fn.useFormState=function(t,e,n){return al.H.useFormState(t,e,n)};Fn.useFormStatus=function(){return al.H.useHostTransitionStatus()};Fn.version="19.2.8";function __(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(__)}catch(t){console.error(t)}}__(),g_.exports=Fn;var bM=g_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ln=xM,x_=ne,EM=bM;function ce(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function S_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Il(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function y_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function M_(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function gg(t){if(Il(t)!==t)throw Error(ce(188))}function TM(t){var e=t.alternate;if(!e){if(e=Il(t),e===null)throw Error(ce(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return gg(a),t;if(s===i)return gg(a),e;s=s.sibling}throw Error(ce(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(ce(189))}}if(n.alternate!==i)throw Error(ce(190))}if(n.tag!==3)throw Error(ce(188));return n.stateNode.current===n?t:e}function b_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=b_(t),e!==null)return e;t=t.sibling}return null}var Xt=Object.assign,AM=Symbol.for("react.element"),ec=Symbol.for("react.transitional.element"),Ko=Symbol.for("react.portal"),Ur=Symbol.for("react.fragment"),E_=Symbol.for("react.strict_mode"),Kd=Symbol.for("react.profiler"),T_=Symbol.for("react.consumer"),ba=Symbol.for("react.context"),Wp=Symbol.for("react.forward_ref"),Qd=Symbol.for("react.suspense"),$d=Symbol.for("react.suspense_list"),qp=Symbol.for("react.memo"),Ya=Symbol.for("react.lazy"),Jd=Symbol.for("react.activity"),wM=Symbol.for("react.memo_cache_sentinel"),vg=Symbol.iterator;function Lo(t){return t===null||typeof t!="object"?null:(t=vg&&t[vg]||t["@@iterator"],typeof t=="function"?t:null)}var CM=Symbol.for("react.client.reference");function eh(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===CM?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Ur:return"Fragment";case Kd:return"Profiler";case E_:return"StrictMode";case Qd:return"Suspense";case $d:return"SuspenseList";case Jd:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case Ko:return"Portal";case ba:return t.displayName||"Context";case T_:return(t._context.displayName||"Context")+".Consumer";case Wp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case qp:return e=t.displayName||null,e!==null?e:eh(t.type)||"Memo";case Ya:e=t._payload,t=t._init;try{return eh(t(e))}catch{}}return null}var Qo=Array.isArray,He=x_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,vt=EM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Hs={pending:!1,data:null,method:null,action:null},th=[],Lr=-1;function na(t){return{current:t}}function vn(t){0>Lr||(t.current=th[Lr],th[Lr]=null,Lr--)}function It(t,e){Lr++,th[Lr]=t.current,t.current=e}var $i=na(null),xl=na(null),ls=na(null),_u=na(null);function xu(t,e){switch(It(ls,e),It(xl,t),It($i,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?b0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=b0(e),t=jS(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}vn($i),It($i,t)}function no(){vn($i),vn(xl),vn(ls)}function nh(t){t.memoizedState!==null&&It(_u,t);var e=$i.current,n=jS(e,t.type);e!==n&&(It(xl,t),It($i,n))}function Su(t){xl.current===t&&(vn($i),vn(xl)),_u.current===t&&(vn(_u),Nl._currentValue=Hs)}var Rf,_g;function Ds(t){if(Rf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Rf=e&&e[1]||"",_g=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Rf+t+_g}var Nf=!1;function Df(t,e){if(!t||Nf)return"";Nf=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var f=function(){throw Error()};if(Object.defineProperty(f.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(f,[])}catch(p){var u=p}Reflect.construct(t,[],f)}else{try{f.call()}catch(p){u=p}t.call(f.prototype)}}else{try{throw Error()}catch(p){u=p}(f=t())&&typeof f.catch=="function"&&f.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var h=`
`+l[i].replace(" at new "," at ");return t.displayName&&h.includes("<anonymous>")&&(h=h.replace("<anonymous>",t.displayName)),h}while(1<=i&&0<=a);break}}}finally{Nf=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Ds(n):""}function RM(t,e){switch(t.tag){case 26:case 27:case 5:return Ds(t.type);case 16:return Ds("Lazy");case 13:return t.child!==e&&e!==null?Ds("Suspense Fallback"):Ds("Suspense");case 19:return Ds("SuspenseList");case 0:case 15:return Df(t.type,!1);case 11:return Df(t.type.render,!1);case 1:return Df(t.type,!0);case 31:return Ds("Activity");default:return""}}function xg(t){try{var e="",n=null;do e+=RM(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var ih=Object.prototype.hasOwnProperty,Yp=ln.unstable_scheduleCallback,Uf=ln.unstable_cancelCallback,NM=ln.unstable_shouldYield,DM=ln.unstable_requestPaint,ii=ln.unstable_now,UM=ln.unstable_getCurrentPriorityLevel,A_=ln.unstable_ImmediatePriority,w_=ln.unstable_UserBlockingPriority,yu=ln.unstable_NormalPriority,LM=ln.unstable_LowPriority,C_=ln.unstable_IdlePriority,OM=ln.log,PM=ln.unstable_setDisableYieldValue,Bl=null,ai=null;function ts(t){if(typeof OM=="function"&&PM(t),ai&&typeof ai.setStrictMode=="function")try{ai.setStrictMode(Bl,t)}catch{}}var si=Math.clz32?Math.clz32:BM,zM=Math.log,IM=Math.LN2;function BM(t){return t>>>=0,t===0?32:31-(zM(t)/IM|0)|0}var tc=256,nc=262144,ic=4194304;function Us(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function rf(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Us(i):(r&=o,r!==0?a=Us(r):n||(n=o&~t,n!==0&&(a=Us(n))))):(o=i&~s,o!==0?a=Us(o):r!==0?a=Us(r):n||(n=i&~t,n!==0&&(a=Us(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function Fl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function FM(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function R_(){var t=ic;return ic<<=1,!(ic&62914560)&&(ic=4194304),t}function Lf(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Hl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function HM(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var h=31-si(n),f=1<<h;o[h]=0,l[h]=-1;var u=c[h];if(u!==null)for(c[h]=null,h=0;h<u.length;h++){var p=u[h];p!==null&&(p.lane&=-536870913)}n&=~f}i!==0&&N_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function N_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-si(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function D_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-si(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function U_(t,e){var n=e&-e;return n=n&42?1:Zp(n),n&(t.suspendedLanes|e)?0:n}function Zp(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Kp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function L_(){var t=vt.p;return t!==0?t:(t=window.event,t===void 0?32:ny(t.type))}function Sg(t,e){var n=vt.p;try{return vt.p=t,e()}finally{vt.p=n}}var Ms=Math.random().toString(36).slice(2),xn="__reactFiber$"+Ms,Zn="__reactProps$"+Ms,So="__reactContainer$"+Ms,ah="__reactEvents$"+Ms,GM="__reactListeners$"+Ms,VM="__reactHandles$"+Ms,yg="__reactResources$"+Ms,Gl="__reactMarker$"+Ms;function Qp(t){delete t[xn],delete t[Zn],delete t[ah],delete t[GM],delete t[VM]}function Or(t){var e=t[xn];if(e)return e;for(var n=t.parentNode;n;){if(e=n[So]||n[xn]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=C0(t);t!==null;){if(n=t[xn])return n;t=C0(t)}return e}t=n,n=t.parentNode}return null}function yo(t){if(t=t[xn]||t[So]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function $o(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(ce(33))}function qr(t){var e=t[yg];return e||(e=t[yg]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function mn(t){t[Gl]=!0}var O_=new Set,P_={};function tr(t,e){io(t,e),io(t+"Capture",e)}function io(t,e){for(P_[t]=e,t=0;t<e.length;t++)O_.add(e[t])}var kM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Mg={},bg={};function XM(t){return ih.call(bg,t)?!0:ih.call(Mg,t)?!1:kM.test(t)?bg[t]=!0:(Mg[t]=!0,!1)}function qc(t,e,n){if(XM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function ac(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function ca(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function gi(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function z_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function jM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function sh(t){if(!t._valueTracker){var e=z_(t)?"checked":"value";t._valueTracker=jM(t,e,""+t[e])}}function I_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=z_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Mu(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var WM=/[\n"\\]/g;function Si(t){return t.replace(WM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function rh(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+gi(e)):t.value!==""+gi(e)&&(t.value=""+gi(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?oh(t,r,gi(e)):n!=null?oh(t,r,gi(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+gi(o):t.removeAttribute("name")}function B_(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){sh(t);return}n=n!=null?""+gi(n):"",e=e!=null?""+gi(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),sh(t)}function oh(t,e,n){e==="number"&&Mu(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function Yr(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+gi(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function F_(t,e,n){if(e!=null&&(e=""+gi(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+gi(n):""}function H_(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(ce(92));if(Qo(i)){if(1<i.length)throw Error(ce(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=gi(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),sh(t)}function ao(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var qM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function Eg(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||qM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function G_(t,e,n){if(e!=null&&typeof e!="object")throw Error(ce(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&Eg(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&Eg(t,s,e[s])}function $p(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var YM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),ZM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Yc(t){return ZM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Ea(){}var lh=null;function Jp(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Pr=null,Zr=null;function Tg(t){var e=yo(t);if(e&&(t=e.stateNode)){var n=t[Zn]||null;e:switch(t=e.stateNode,e.type){case"input":if(rh(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Si(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[Zn]||null;if(!a)throw Error(ce(90));rh(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&I_(i)}break e;case"textarea":F_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&Yr(t,!!n.multiple,e,!1)}}}var Of=!1;function V_(t,e,n){if(Of)return t(e,n);Of=!0;try{var i=t(e);return i}finally{if(Of=!1,(Pr!==null||Zr!==null)&&(_f(),Pr&&(e=Pr,t=Zr,Zr=Pr=null,Tg(e),t)))for(e=0;e<t.length;e++)Tg(t[e])}}function Sl(t,e){var n=t.stateNode;if(n===null)return null;var i=n[Zn]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ce(231,e,typeof n));return n}var Ua=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ch=!1;if(Ua)try{var Oo={};Object.defineProperty(Oo,"passive",{get:function(){ch=!0}}),window.addEventListener("test",Oo,Oo),window.removeEventListener("test",Oo,Oo)}catch{ch=!1}var ns=null,em=null,Zc=null;function k_(){if(Zc)return Zc;var t,e=em,n=e.length,i,a="value"in ns?ns.value:ns.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Zc=a.slice(t,1<i?1-i:void 0)}function Kc(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function sc(){return!0}function Ag(){return!1}function Kn(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?sc:Ag,this.isPropagationStopped=Ag,this}return Xt(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=sc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=sc)},persist:function(){},isPersistent:sc}),e}var nr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},of=Kn(nr),Vl=Xt({},nr,{view:0,detail:0}),KM=Kn(Vl),Pf,zf,Po,lf=Xt({},Vl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:tm,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Po&&(Po&&t.type==="mousemove"?(Pf=t.screenX-Po.screenX,zf=t.screenY-Po.screenY):zf=Pf=0,Po=t),Pf)},movementY:function(t){return"movementY"in t?t.movementY:zf}}),wg=Kn(lf),QM=Xt({},lf,{dataTransfer:0}),$M=Kn(QM),JM=Xt({},Vl,{relatedTarget:0}),If=Kn(JM),eb=Xt({},nr,{animationName:0,elapsedTime:0,pseudoElement:0}),tb=Kn(eb),nb=Xt({},nr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),ib=Kn(nb),ab=Xt({},nr,{data:0}),Cg=Kn(ab),sb={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},rb={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},ob={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function lb(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=ob[t])?!!e[t]:!1}function tm(){return lb}var cb=Xt({},Vl,{key:function(t){if(t.key){var e=sb[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Kc(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?rb[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:tm,charCode:function(t){return t.type==="keypress"?Kc(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Kc(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),ub=Kn(cb),fb=Xt({},lf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Rg=Kn(fb),db=Xt({},Vl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:tm}),hb=Kn(db),pb=Xt({},nr,{propertyName:0,elapsedTime:0,pseudoElement:0}),mb=Kn(pb),gb=Xt({},lf,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),vb=Kn(gb),_b=Xt({},nr,{newState:0,oldState:0}),xb=Kn(_b),Sb=[9,13,27,32],nm=Ua&&"CompositionEvent"in window,sl=null;Ua&&"documentMode"in document&&(sl=document.documentMode);var yb=Ua&&"TextEvent"in window&&!sl,X_=Ua&&(!nm||sl&&8<sl&&11>=sl),Ng=" ",Dg=!1;function j_(t,e){switch(t){case"keyup":return Sb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function W_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var zr=!1;function Mb(t,e){switch(t){case"compositionend":return W_(e);case"keypress":return e.which!==32?null:(Dg=!0,Ng);case"textInput":return t=e.data,t===Ng&&Dg?null:t;default:return null}}function bb(t,e){if(zr)return t==="compositionend"||!nm&&j_(t,e)?(t=k_(),Zc=em=ns=null,zr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return X_&&e.locale!=="ko"?null:e.data;default:return null}}var Eb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ug(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Eb[t.type]:e==="textarea"}function q_(t,e,n,i){Pr?Zr?Zr.push(i):Zr=[i]:Pr=i,e=Hu(e,"onChange"),0<e.length&&(n=new of("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var rl=null,yl=null;function Tb(t){VS(t,0)}function cf(t){var e=$o(t);if(I_(e))return t}function Lg(t,e){if(t==="change")return e}var Y_=!1;if(Ua){var Bf;if(Ua){var Ff="oninput"in document;if(!Ff){var Og=document.createElement("div");Og.setAttribute("oninput","return;"),Ff=typeof Og.oninput=="function"}Bf=Ff}else Bf=!1;Y_=Bf&&(!document.documentMode||9<document.documentMode)}function Pg(){rl&&(rl.detachEvent("onpropertychange",Z_),yl=rl=null)}function Z_(t){if(t.propertyName==="value"&&cf(yl)){var e=[];q_(e,yl,t,Jp(t)),V_(Tb,e)}}function Ab(t,e,n){t==="focusin"?(Pg(),rl=e,yl=n,rl.attachEvent("onpropertychange",Z_)):t==="focusout"&&Pg()}function wb(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return cf(yl)}function Cb(t,e){if(t==="click")return cf(e)}function Rb(t,e){if(t==="input"||t==="change")return cf(e)}function Nb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var oi=typeof Object.is=="function"?Object.is:Nb;function Ml(t,e){if(oi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!ih.call(e,a)||!oi(t[a],e[a]))return!1}return!0}function zg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Ig(t,e){var n=zg(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=zg(n)}}function K_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?K_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Q_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Mu(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Mu(t.document)}return e}function im(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Db=Ua&&"documentMode"in document&&11>=document.documentMode,Ir=null,uh=null,ol=null,fh=!1;function Bg(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;fh||Ir==null||Ir!==Mu(i)||(i=Ir,"selectionStart"in i&&im(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),ol&&Ml(ol,i)||(ol=i,i=Hu(uh,"onSelect"),0<i.length&&(e=new of("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Ir)))}function As(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Br={animationend:As("Animation","AnimationEnd"),animationiteration:As("Animation","AnimationIteration"),animationstart:As("Animation","AnimationStart"),transitionrun:As("Transition","TransitionRun"),transitionstart:As("Transition","TransitionStart"),transitioncancel:As("Transition","TransitionCancel"),transitionend:As("Transition","TransitionEnd")},Hf={},$_={};Ua&&($_=document.createElement("div").style,"AnimationEvent"in window||(delete Br.animationend.animation,delete Br.animationiteration.animation,delete Br.animationstart.animation),"TransitionEvent"in window||delete Br.transitionend.transition);function ir(t){if(Hf[t])return Hf[t];if(!Br[t])return t;var e=Br[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in $_)return Hf[t]=e[n];return t}var J_=ir("animationend"),ex=ir("animationiteration"),tx=ir("animationstart"),Ub=ir("transitionrun"),Lb=ir("transitionstart"),Ob=ir("transitioncancel"),nx=ir("transitionend"),ix=new Map,dh="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");dh.push("scrollEnd");function Bi(t,e){ix.set(t,e),tr(e,[t])}var bu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},pi=[],Fr=0,am=0;function uf(){for(var t=Fr,e=am=Fr=0;e<t;){var n=pi[e];pi[e++]=null;var i=pi[e];pi[e++]=null;var a=pi[e];pi[e++]=null;var s=pi[e];if(pi[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&ax(n,a,s)}}function ff(t,e,n,i){pi[Fr++]=t,pi[Fr++]=e,pi[Fr++]=n,pi[Fr++]=i,am|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function sm(t,e,n,i){return ff(t,e,n,i),Eu(t)}function ar(t,e){return ff(t,null,null,e),Eu(t)}function ax(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-si(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function Eu(t){if(50<gl)throw gl=0,Lh=null,Error(ce(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var Hr={};function Pb(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ti(t,e,n,i){return new Pb(t,e,n,i)}function rm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function wa(t,e){var n=t.alternate;return n===null?(n=ti(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function sx(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function Qc(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")rm(t)&&(r=1);else if(typeof t=="string")r=HE(t,n,$i.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case Jd:return t=ti(31,n,e,a),t.elementType=Jd,t.lanes=s,t;case Ur:return Gs(n.children,a,s,e);case E_:r=8,a|=24;break;case Kd:return t=ti(12,n,e,a|2),t.elementType=Kd,t.lanes=s,t;case Qd:return t=ti(13,n,e,a),t.elementType=Qd,t.lanes=s,t;case $d:return t=ti(19,n,e,a),t.elementType=$d,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case ba:r=10;break e;case T_:r=9;break e;case Wp:r=11;break e;case qp:r=14;break e;case Ya:r=16,i=null;break e}r=29,n=Error(ce(130,t===null?"null":typeof t,"")),i=null}return e=ti(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function Gs(t,e,n,i){return t=ti(7,t,i,e),t.lanes=n,t}function Gf(t,e,n){return t=ti(6,t,null,e),t.lanes=n,t}function rx(t){var e=ti(18,null,null,0);return e.stateNode=t,e}function Vf(t,e,n){return e=ti(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Fg=new WeakMap;function yi(t,e){if(typeof t=="object"&&t!==null){var n=Fg.get(t);return n!==void 0?n:(e={value:t,source:e,stack:xg(e)},Fg.set(t,e),e)}return{value:t,source:e,stack:xg(e)}}var Gr=[],Vr=0,Tu=null,bl=0,vi=[],_i=0,vs=null,Yi=1,Zi="";function Sa(t,e){Gr[Vr++]=bl,Gr[Vr++]=Tu,Tu=t,bl=e}function ox(t,e,n){vi[_i++]=Yi,vi[_i++]=Zi,vi[_i++]=vs,vs=t;var i=Yi;t=Zi;var a=32-si(i)-1;i&=~(1<<a),n+=1;var s=32-si(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,Yi=1<<32-si(e)+a|n<<a|i,Zi=s+t}else Yi=1<<s|n<<a|i,Zi=t}function om(t){t.return!==null&&(Sa(t,1),ox(t,1,0))}function lm(t){for(;t===Tu;)Tu=Gr[--Vr],Gr[Vr]=null,bl=Gr[--Vr],Gr[Vr]=null;for(;t===vs;)vs=vi[--_i],vi[_i]=null,Zi=vi[--_i],vi[_i]=null,Yi=vi[--_i],vi[_i]=null}function lx(t,e){vi[_i++]=Yi,vi[_i++]=Zi,vi[_i++]=vs,Yi=e.id,Zi=e.overflow,vs=t}var Sn=null,Vt=null,ft=!1,cs=null,Mi=!1,hh=Error(ce(519));function _s(t){var e=Error(ce(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw El(yi(e,t)),hh}function Hg(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[xn]=t,e[Zn]=i,n){case"dialog":at("cancel",e),at("close",e);break;case"iframe":case"object":case"embed":at("load",e);break;case"video":case"audio":for(n=0;n<Cl.length;n++)at(Cl[n],e);break;case"source":at("error",e);break;case"img":case"image":case"link":at("error",e),at("load",e);break;case"details":at("toggle",e);break;case"input":at("invalid",e),B_(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":at("invalid",e);break;case"textarea":at("invalid",e),H_(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||XS(e.textContent,n)?(i.popover!=null&&(at("beforetoggle",e),at("toggle",e)),i.onScroll!=null&&at("scroll",e),i.onScrollEnd!=null&&at("scrollend",e),i.onClick!=null&&(e.onclick=Ea),e=!0):e=!1,e||_s(t,!0)}function Gg(t){for(Sn=t.return;Sn;)switch(Sn.tag){case 5:case 31:case 13:Mi=!1;return;case 27:case 3:Mi=!0;return;default:Sn=Sn.return}}function ur(t){if(t!==Sn)return!1;if(!ft)return Gg(t),ft=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Bh(t.type,t.memoizedProps)),n=!n),n&&Vt&&_s(t),Gg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(317));Vt=w0(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(317));Vt=w0(t)}else e===27?(e=Vt,bs(t.type)?(t=Vh,Vh=null,Vt=t):Vt=e):Vt=Sn?Ai(t.stateNode.nextSibling):null;return!0}function Ws(){Vt=Sn=null,ft=!1}function kf(){var t=cs;return t!==null&&(Wn===null?Wn=t:Wn.push.apply(Wn,t),cs=null),t}function El(t){cs===null?cs=[t]:cs.push(t)}var ph=na(null),sr=null,Ta=null;function Ka(t,e,n){It(ph,e._currentValue),e._currentValue=n}function Ca(t){t._currentValue=ph.current,vn(ph)}function mh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function gh(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),mh(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(ce(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),mh(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Mo(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(ce(387));if(r=r.memoizedProps,r!==null){var o=a.type;oi(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===_u.current){if(r=a.alternate,r===null)throw Error(ce(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Nl):t=[Nl])}a=a.return}t!==null&&gh(e,t,n,i),e.flags|=262144}function Au(t){for(t=t.firstContext;t!==null;){if(!oi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function qs(t){sr=t,Ta=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function yn(t){return cx(sr,t)}function rc(t,e){return sr===null&&qs(t),cx(t,e)}function cx(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Ta===null){if(t===null)throw Error(ce(308));Ta=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Ta=Ta.next=e;return n}var zb=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Ib=ln.unstable_scheduleCallback,Bb=ln.unstable_NormalPriority,sn={$$typeof:ba,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function cm(){return{controller:new zb,data:new Map,refCount:0}}function kl(t){t.refCount--,t.refCount===0&&Ib(Bb,function(){t.controller.abort()})}var ll=null,vh=0,so=0,Kr=null;function Fb(t,e){if(ll===null){var n=ll=[];vh=0,so=Om(),Kr={status:"pending",value:void 0,then:function(i){n.push(i)}}}return vh++,e.then(Vg,Vg),e}function Vg(){if(--vh===0&&ll!==null){Kr!==null&&(Kr.status="fulfilled");var t=ll;ll=null,so=0,Kr=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Hb(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var kg=He.S;He.S=function(t,e){bS=ii(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Fb(t,e),kg!==null&&kg(t,e)};var Vs=na(null);function um(){var t=Vs.current;return t!==null?t:Pt.pooledCache}function $c(t,e){e===null?It(Vs,Vs.current):It(Vs,e.pool)}function ux(){var t=um();return t===null?null:{parent:sn._currentValue,pool:t}}var bo=Error(ce(460)),fm=Error(ce(474)),df=Error(ce(542)),wu={then:function(){}};function Xg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function fx(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Ea,Ea),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Wg(t),t;default:if(typeof e.status=="string")e.then(Ea,Ea);else{if(t=Pt,t!==null&&100<t.shellSuspendCounter)throw Error(ce(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Wg(t),t}throw ks=e,bo}}function Ls(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(ks=n,bo):n}}var ks=null;function jg(){if(ks===null)throw Error(ce(459));var t=ks;return ks=null,t}function Wg(t){if(t===bo||t===df)throw Error(ce(483))}var Qr=null,Tl=0;function oc(t){var e=Tl;return Tl+=1,Qr===null&&(Qr=[]),fx(Qr,t,e)}function zo(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function lc(t,e){throw e.$$typeof===AM?Error(ce(525)):(t=Object.prototype.toString.call(e),Error(ce(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function dx(t){function e(d,x){if(t){var M=d.deletions;M===null?(d.deletions=[x],d.flags|=16):M.push(x)}}function n(d,x){if(!t)return null;for(;x!==null;)e(d,x),x=x.sibling;return null}function i(d){for(var x=new Map;d!==null;)d.key!==null?x.set(d.key,d):x.set(d.index,d),d=d.sibling;return x}function a(d,x){return d=wa(d,x),d.index=0,d.sibling=null,d}function s(d,x,M){return d.index=M,t?(M=d.alternate,M!==null?(M=M.index,M<x?(d.flags|=67108866,x):M):(d.flags|=67108866,x)):(d.flags|=1048576,x)}function r(d){return t&&d.alternate===null&&(d.flags|=67108866),d}function o(d,x,M,_){return x===null||x.tag!==6?(x=Gf(M,d.mode,_),x.return=d,x):(x=a(x,M),x.return=d,x)}function l(d,x,M,_){var w=M.type;return w===Ur?h(d,x,M.props.children,_,M.key):x!==null&&(x.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Ya&&Ls(w)===x.type)?(x=a(x,M.props),zo(x,M),x.return=d,x):(x=Qc(M.type,M.key,M.props,null,d.mode,_),zo(x,M),x.return=d,x)}function c(d,x,M,_){return x===null||x.tag!==4||x.stateNode.containerInfo!==M.containerInfo||x.stateNode.implementation!==M.implementation?(x=Vf(M,d.mode,_),x.return=d,x):(x=a(x,M.children||[]),x.return=d,x)}function h(d,x,M,_,w){return x===null||x.tag!==7?(x=Gs(M,d.mode,_,w),x.return=d,x):(x=a(x,M),x.return=d,x)}function f(d,x,M){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return x=Gf(""+x,d.mode,M),x.return=d,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ec:return M=Qc(x.type,x.key,x.props,null,d.mode,M),zo(M,x),M.return=d,M;case Ko:return x=Vf(x,d.mode,M),x.return=d,x;case Ya:return x=Ls(x),f(d,x,M)}if(Qo(x)||Lo(x))return x=Gs(x,d.mode,M,null),x.return=d,x;if(typeof x.then=="function")return f(d,oc(x),M);if(x.$$typeof===ba)return f(d,rc(d,x),M);lc(d,x)}return null}function u(d,x,M,_){var w=x!==null?x.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return w!==null?null:o(d,x,""+M,_);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case ec:return M.key===w?l(d,x,M,_):null;case Ko:return M.key===w?c(d,x,M,_):null;case Ya:return M=Ls(M),u(d,x,M,_)}if(Qo(M)||Lo(M))return w!==null?null:h(d,x,M,_,null);if(typeof M.then=="function")return u(d,x,oc(M),_);if(M.$$typeof===ba)return u(d,x,rc(d,M),_);lc(d,M)}return null}function p(d,x,M,_,w){if(typeof _=="string"&&_!==""||typeof _=="number"||typeof _=="bigint")return d=d.get(M)||null,o(x,d,""+_,w);if(typeof _=="object"&&_!==null){switch(_.$$typeof){case ec:return d=d.get(_.key===null?M:_.key)||null,l(x,d,_,w);case Ko:return d=d.get(_.key===null?M:_.key)||null,c(x,d,_,w);case Ya:return _=Ls(_),p(d,x,M,_,w)}if(Qo(_)||Lo(_))return d=d.get(M)||null,h(x,d,_,w,null);if(typeof _.then=="function")return p(d,x,M,oc(_),w);if(_.$$typeof===ba)return p(d,x,M,rc(x,_),w);lc(x,_)}return null}function g(d,x,M,_){for(var w=null,N=null,T=x,y=x=0,R=null;T!==null&&y<M.length;y++){T.index>y?(R=T,T=null):R=T.sibling;var C=u(d,T,M[y],_);if(C===null){T===null&&(T=R);break}t&&T&&C.alternate===null&&e(d,T),x=s(C,x,y),N===null?w=C:N.sibling=C,N=C,T=R}if(y===M.length)return n(d,T),ft&&Sa(d,y),w;if(T===null){for(;y<M.length;y++)T=f(d,M[y],_),T!==null&&(x=s(T,x,y),N===null?w=T:N.sibling=T,N=T);return ft&&Sa(d,y),w}for(T=i(T);y<M.length;y++)R=p(T,d,y,M[y],_),R!==null&&(t&&R.alternate!==null&&T.delete(R.key===null?y:R.key),x=s(R,x,y),N===null?w=R:N.sibling=R,N=R);return t&&T.forEach(function(L){return e(d,L)}),ft&&Sa(d,y),w}function b(d,x,M,_){if(M==null)throw Error(ce(151));for(var w=null,N=null,T=x,y=x=0,R=null,C=M.next();T!==null&&!C.done;y++,C=M.next()){T.index>y?(R=T,T=null):R=T.sibling;var L=u(d,T,C.value,_);if(L===null){T===null&&(T=R);break}t&&T&&L.alternate===null&&e(d,T),x=s(L,x,y),N===null?w=L:N.sibling=L,N=L,T=R}if(C.done)return n(d,T),ft&&Sa(d,y),w;if(T===null){for(;!C.done;y++,C=M.next())C=f(d,C.value,_),C!==null&&(x=s(C,x,y),N===null?w=C:N.sibling=C,N=C);return ft&&Sa(d,y),w}for(T=i(T);!C.done;y++,C=M.next())C=p(T,d,y,C.value,_),C!==null&&(t&&C.alternate!==null&&T.delete(C.key===null?y:C.key),x=s(C,x,y),N===null?w=C:N.sibling=C,N=C);return t&&T.forEach(function(z){return e(d,z)}),ft&&Sa(d,y),w}function v(d,x,M,_){if(typeof M=="object"&&M!==null&&M.type===Ur&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case ec:e:{for(var w=M.key;x!==null;){if(x.key===w){if(w=M.type,w===Ur){if(x.tag===7){n(d,x.sibling),_=a(x,M.props.children),_.return=d,d=_;break e}}else if(x.elementType===w||typeof w=="object"&&w!==null&&w.$$typeof===Ya&&Ls(w)===x.type){n(d,x.sibling),_=a(x,M.props),zo(_,M),_.return=d,d=_;break e}n(d,x);break}else e(d,x);x=x.sibling}M.type===Ur?(_=Gs(M.props.children,d.mode,_,M.key),_.return=d,d=_):(_=Qc(M.type,M.key,M.props,null,d.mode,_),zo(_,M),_.return=d,d=_)}return r(d);case Ko:e:{for(w=M.key;x!==null;){if(x.key===w)if(x.tag===4&&x.stateNode.containerInfo===M.containerInfo&&x.stateNode.implementation===M.implementation){n(d,x.sibling),_=a(x,M.children||[]),_.return=d,d=_;break e}else{n(d,x);break}else e(d,x);x=x.sibling}_=Vf(M,d.mode,_),_.return=d,d=_}return r(d);case Ya:return M=Ls(M),v(d,x,M,_)}if(Qo(M))return g(d,x,M,_);if(Lo(M)){if(w=Lo(M),typeof w!="function")throw Error(ce(150));return M=w.call(M),b(d,x,M,_)}if(typeof M.then=="function")return v(d,x,oc(M),_);if(M.$$typeof===ba)return v(d,x,rc(d,M),_);lc(d,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,x!==null&&x.tag===6?(n(d,x.sibling),_=a(x,M),_.return=d,d=_):(n(d,x),_=Gf(M,d.mode,_),_.return=d,d=_),r(d)):n(d,x)}return function(d,x,M,_){try{Tl=0;var w=v(d,x,M,_);return Qr=null,w}catch(T){if(T===bo||T===df)throw T;var N=ti(29,T,null,d.mode);return N.lanes=_,N.return=d,N}finally{}}}var Ys=dx(!0),hx=dx(!1),Za=!1;function dm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function _h(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function us(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function fs(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,gt&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=Eu(t),ax(t,null,n),e}return ff(t,i,e,n),Eu(t)}function cl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,D_(t,n)}}function Xf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var xh=!1;function ul(){if(xh){var t=Kr;if(t!==null)throw t}}function fl(t,e,n,i){xh=!1;var a=t.updateQueue;Za=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var h=t.alternate;h!==null&&(h=h.updateQueue,o=h.lastBaseUpdate,o!==r&&(o===null?h.firstBaseUpdate=c:o.next=c,h.lastBaseUpdate=l))}if(s!==null){var f=a.baseState;r=0,h=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(ot&u)===u:(i&u)===u){u!==0&&u===so&&(xh=!0),h!==null&&(h=h.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,b=o;u=e;var v=n;switch(b.tag){case 1:if(g=b.payload,typeof g=="function"){f=g.call(v,f,u);break e}f=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=b.payload,u=typeof g=="function"?g.call(v,f,u):g,u==null)break e;f=Xt({},f,u);break e;case 2:Za=!0}}u=o.callback,u!==null&&(t.flags|=64,p&&(t.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},h===null?(c=h=p,l=f):h=h.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);h===null&&(l=f),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=h,s===null&&(a.shared.lanes=0),Ss|=r,t.lanes=r,t.memoizedState=f}}function px(t,e){if(typeof t!="function")throw Error(ce(191,t));t.call(e)}function mx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)px(n[t],e)}var ro=na(null),Cu=na(0);function qg(t,e){t=za,It(Cu,t),It(ro,e),za=t|e.baseLanes}function Sh(){It(Cu,za),It(ro,ro.current)}function hm(){za=Cu.current,vn(ro),vn(Cu)}var li=na(null),Ti=null;function Qa(t){var e=t.alternate;It(Jt,Jt.current&1),It(li,t),Ti===null&&(e===null||ro.current!==null||e.memoizedState!==null)&&(Ti=t)}function yh(t){It(Jt,Jt.current),It(li,t),Ti===null&&(Ti=t)}function gx(t){t.tag===22?(It(Jt,Jt.current),It(li,t),Ti===null&&(Ti=t)):$a()}function $a(){It(Jt,Jt.current),It(li,li.current)}function ei(t){vn(li),Ti===t&&(Ti=null),vn(Jt)}var Jt=na(0);function Ru(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Hh(n)||Gh(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var La=0,$e=null,Lt=null,nn=null,Nu=!1,$r=!1,Zs=!1,Du=0,Al=0,Jr=null,Gb=0;function qt(){throw Error(ce(321))}function pm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!oi(t[n],e[n]))return!1;return!0}function mm(t,e,n,i,a,s){return La=s,$e=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,He.H=t===null||t.memoizedState===null?qx:Am,Zs=!1,s=n(i,a),Zs=!1,$r&&(s=_x(e,n,i,a)),vx(t),s}function vx(t){He.H=wl;var e=Lt!==null&&Lt.next!==null;if(La=0,nn=Lt=$e=null,Nu=!1,Al=0,Jr=null,e)throw Error(ce(300));t===null||rn||(t=t.dependencies,t!==null&&Au(t)&&(rn=!0))}function _x(t,e,n,i){$e=t;var a=0;do{if($r&&(Jr=null),Al=0,$r=!1,25<=a)throw Error(ce(301));if(a+=1,nn=Lt=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}He.H=Yx,s=e(n,i)}while($r);return s}function Vb(){var t=He.H,e=t.useState()[0];return e=typeof e.then=="function"?Xl(e):e,t=t.useState()[0],(Lt!==null?Lt.memoizedState:null)!==t&&($e.flags|=1024),e}function gm(){var t=Du!==0;return Du=0,t}function vm(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function _m(t){if(Nu){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Nu=!1}La=0,nn=Lt=$e=null,$r=!1,Al=Du=0,Jr=null}function Pn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return nn===null?$e.memoizedState=nn=t:nn=nn.next=t,nn}function en(){if(Lt===null){var t=$e.alternate;t=t!==null?t.memoizedState:null}else t=Lt.next;var e=nn===null?$e.memoizedState:nn.next;if(e!==null)nn=e,Lt=t;else{if(t===null)throw $e.alternate===null?Error(ce(467)):Error(ce(310));Lt=t,t={memoizedState:Lt.memoizedState,baseState:Lt.baseState,baseQueue:Lt.baseQueue,queue:Lt.queue,next:null},nn===null?$e.memoizedState=nn=t:nn=nn.next=t}return nn}function hf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Xl(t){var e=Al;return Al+=1,Jr===null&&(Jr=[]),t=fx(Jr,t,e),e=$e,(nn===null?e.memoizedState:nn.next)===null&&(e=e.alternate,He.H=e===null||e.memoizedState===null?qx:Am),t}function pf(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Xl(t);if(t.$$typeof===ba)return yn(t)}throw Error(ce(438,String(t)))}function xm(t){var e=null,n=$e.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=$e.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=hf(),$e.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=wM;return e.index++,n}function Oa(t,e){return typeof e=="function"?e(t):e}function Jc(t){var e=en();return Sm(e,Lt,t)}function Sm(t,e,n){var i=t.queue;if(i===null)throw Error(ce(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,h=!1;do{var f=c.lane&-536870913;if(f!==c.lane?(ot&f)===f:(La&f)===f){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),f===so&&(h=!0);else if((La&u)===u){c=c.next,u===so&&(h=!0);continue}else f={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=f,r=s):l=l.next=f,$e.lanes|=u,Ss|=u;f=c.action,Zs&&n(s,f),s=c.hasEagerState?c.eagerState:n(s,f)}else u={lane:f,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,$e.lanes|=f,Ss|=f;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!oi(s,t.memoizedState)&&(rn=!0,h&&(n=Kr,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function jf(t){var e=en(),n=e.queue;if(n===null)throw Error(ce(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);oi(s,e.memoizedState)||(rn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function xx(t,e,n){var i=$e,a=en(),s=ft;if(s){if(n===void 0)throw Error(ce(407));n=n()}else n=e();var r=!oi((Lt||a).memoizedState,n);if(r&&(a.memoizedState=n,rn=!0),a=a.queue,ym(Mx.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||nn!==null&&nn.memoizedState.tag&1){if(i.flags|=2048,oo(9,{destroy:void 0},yx.bind(null,i,a,n,e),null),Pt===null)throw Error(ce(349));s||La&127||Sx(i,e,n)}return n}function Sx(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=$e.updateQueue,e===null?(e=hf(),$e.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function yx(t,e,n,i){e.value=n,e.getSnapshot=i,bx(e)&&Ex(t)}function Mx(t,e,n){return n(function(){bx(e)&&Ex(t)})}function bx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!oi(t,n)}catch{return!0}}function Ex(t){var e=ar(t,2);e!==null&&qn(e,t,2)}function Mh(t){var e=Pn();if(typeof t=="function"){var n=t;if(t=n(),Zs){ts(!0);try{n()}finally{ts(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Oa,lastRenderedState:t},e}function Tx(t,e,n,i){return t.baseState=n,Sm(t,Lt,typeof i=="function"?i:Oa)}function kb(t,e,n,i,a){if(gf(t))throw Error(ce(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};He.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,Ax(e,s)):(s.next=n.next,e.pending=n.next=s)}}function Ax(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=He.T,r={};He.T=r;try{var o=n(a,i),l=He.S;l!==null&&l(r,o),Yg(t,e,o)}catch(c){bh(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),He.T=s}}else try{s=n(a,i),Yg(t,e,s)}catch(c){bh(t,e,c)}}function Yg(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Zg(t,e,i)},function(i){return bh(t,e,i)}):Zg(t,e,n)}function Zg(t,e,n){e.status="fulfilled",e.value=n,wx(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,Ax(t,n)))}function bh(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,wx(e),e=e.next;while(e!==i)}t.action=null}function wx(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Cx(t,e){return e}function Kg(t,e){if(ft){var n=Pt.formState;if(n!==null){e:{var i=$e;if(ft){if(Vt){t:{for(var a=Vt,s=Mi;a.nodeType!==8;){if(!s){a=null;break t}if(a=Ai(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){Vt=Ai(a.nextSibling),i=a.data==="F!";break e}}_s(i)}i=!1}i&&(e=n[0])}}return n=Pn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Cx,lastRenderedState:e},n.queue=i,n=Xx.bind(null,$e,i),i.dispatch=n,i=Mh(!1),s=Tm.bind(null,$e,!1,i.queue),i=Pn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=kb.bind(null,$e,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Qg(t){var e=en();return Rx(e,Lt,t)}function Rx(t,e,n){if(e=Sm(t,e,Cx)[0],t=Jc(Oa)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Xl(e)}catch(r){throw r===bo?df:r}else i=e;e=en();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&($e.flags|=2048,oo(9,{destroy:void 0},Xb.bind(null,a,n),null)),[i,s,t]}function Xb(t,e){t.action=e}function $g(t){var e=en(),n=Lt;if(n!==null)return Rx(e,n,t);en(),e=e.memoizedState,n=en();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function oo(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=$e.updateQueue,e===null&&(e=hf(),$e.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function Nx(){return en().memoizedState}function eu(t,e,n,i){var a=Pn();$e.flags|=t,a.memoizedState=oo(1|e,{destroy:void 0},n,i===void 0?null:i)}function mf(t,e,n,i){var a=en();i=i===void 0?null:i;var s=a.memoizedState.inst;Lt!==null&&i!==null&&pm(i,Lt.memoizedState.deps)?a.memoizedState=oo(e,s,n,i):($e.flags|=t,a.memoizedState=oo(1|e,s,n,i))}function Jg(t,e){eu(8390656,8,t,e)}function ym(t,e){mf(2048,8,t,e)}function jb(t){$e.flags|=4;var e=$e.updateQueue;if(e===null)e=hf(),$e.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Dx(t){var e=en().memoizedState;return jb({ref:e,nextImpl:t}),function(){if(gt&2)throw Error(ce(440));return e.impl.apply(void 0,arguments)}}function Ux(t,e){return mf(4,2,t,e)}function Lx(t,e){return mf(4,4,t,e)}function Ox(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Px(t,e,n){n=n!=null?n.concat([t]):null,mf(4,4,Ox.bind(null,e,t),n)}function Mm(){}function zx(t,e){var n=en();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&pm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Ix(t,e){var n=en();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&pm(e,i[1]))return i[0];if(i=t(),Zs){ts(!0);try{t()}finally{ts(!1)}}return n.memoizedState=[i,e],i}function bm(t,e,n){return n===void 0||La&1073741824&&!(ot&261930)?t.memoizedState=e:(t.memoizedState=n,t=TS(),$e.lanes|=t,Ss|=t,n)}function Bx(t,e,n,i){return oi(n,e)?n:ro.current!==null?(t=bm(t,n,i),oi(t,e)||(rn=!0),t):!(La&42)||La&1073741824&&!(ot&261930)?(rn=!0,t.memoizedState=n):(t=TS(),$e.lanes|=t,Ss|=t,e)}function Fx(t,e,n,i,a){var s=vt.p;vt.p=s!==0&&8>s?s:8;var r=He.T,o={};He.T=o,Tm(t,!1,e,n);try{var l=a(),c=He.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var h=Hb(l,i);dl(t,e,h,ri(t))}else dl(t,e,i,ri(t))}catch(f){dl(t,e,{then:function(){},status:"rejected",reason:f},ri())}finally{vt.p=s,r!==null&&o.types!==null&&(r.types=o.types),He.T=r}}function Wb(){}function Eh(t,e,n,i){if(t.tag!==5)throw Error(ce(476));var a=Hx(t).queue;Fx(t,a,e,Hs,n===null?Wb:function(){return Gx(t),n(i)})}function Hx(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:Hs,baseState:Hs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Oa,lastRenderedState:Hs},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Oa,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Gx(t){var e=Hx(t);e.next===null&&(e=t.alternate.memoizedState),dl(t,e.next.queue,{},ri())}function Em(){return yn(Nl)}function Vx(){return en().memoizedState}function kx(){return en().memoizedState}function qb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=ri();t=us(n);var i=fs(e,t,n);i!==null&&(qn(i,e,n),cl(i,e,n)),e={cache:cm()},t.payload=e;return}e=e.return}}function Yb(t,e,n){var i=ri();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},gf(t)?jx(e,n):(n=sm(t,e,n,i),n!==null&&(qn(n,t,i),Wx(n,e,i)))}function Xx(t,e,n){var i=ri();dl(t,e,n,i)}function dl(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(gf(t))jx(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,oi(o,r))return ff(t,e,a,0),Pt===null&&uf(),!1}catch{}finally{}if(n=sm(t,e,a,i),n!==null)return qn(n,t,i),Wx(n,e,i),!0}return!1}function Tm(t,e,n,i){if(i={lane:2,revertLane:Om(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},gf(t)){if(e)throw Error(ce(479))}else e=sm(t,n,i,2),e!==null&&qn(e,t,2)}function gf(t){var e=t.alternate;return t===$e||e!==null&&e===$e}function jx(t,e){$r=Nu=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Wx(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,D_(t,n)}}var wl={readContext:yn,use:pf,useCallback:qt,useContext:qt,useEffect:qt,useImperativeHandle:qt,useLayoutEffect:qt,useInsertionEffect:qt,useMemo:qt,useReducer:qt,useRef:qt,useState:qt,useDebugValue:qt,useDeferredValue:qt,useTransition:qt,useSyncExternalStore:qt,useId:qt,useHostTransitionStatus:qt,useFormState:qt,useActionState:qt,useOptimistic:qt,useMemoCache:qt,useCacheRefresh:qt};wl.useEffectEvent=qt;var qx={readContext:yn,use:pf,useCallback:function(t,e){return Pn().memoizedState=[t,e===void 0?null:e],t},useContext:yn,useEffect:Jg,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,eu(4194308,4,Ox.bind(null,e,t),n)},useLayoutEffect:function(t,e){return eu(4194308,4,t,e)},useInsertionEffect:function(t,e){eu(4,2,t,e)},useMemo:function(t,e){var n=Pn();e=e===void 0?null:e;var i=t();if(Zs){ts(!0);try{t()}finally{ts(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=Pn();if(n!==void 0){var a=n(e);if(Zs){ts(!0);try{n(e)}finally{ts(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=Yb.bind(null,$e,t),[i.memoizedState,t]},useRef:function(t){var e=Pn();return t={current:t},e.memoizedState=t},useState:function(t){t=Mh(t);var e=t.queue,n=Xx.bind(null,$e,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Mm,useDeferredValue:function(t,e){var n=Pn();return bm(n,t,e)},useTransition:function(){var t=Mh(!1);return t=Fx.bind(null,$e,t.queue,!0,!1),Pn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=$e,a=Pn();if(ft){if(n===void 0)throw Error(ce(407));n=n()}else{if(n=e(),Pt===null)throw Error(ce(349));ot&127||Sx(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Jg(Mx.bind(null,i,s,t),[t]),i.flags|=2048,oo(9,{destroy:void 0},yx.bind(null,i,s,n,e),null),n},useId:function(){var t=Pn(),e=Pt.identifierPrefix;if(ft){var n=Zi,i=Yi;n=(i&~(1<<32-si(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Du++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Gb++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Em,useFormState:Kg,useActionState:Kg,useOptimistic:function(t){var e=Pn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=Tm.bind(null,$e,!0,n),n.dispatch=e,[t,e]},useMemoCache:xm,useCacheRefresh:function(){return Pn().memoizedState=qb.bind(null,$e)},useEffectEvent:function(t){var e=Pn(),n={impl:t};return e.memoizedState=n,function(){if(gt&2)throw Error(ce(440));return n.impl.apply(void 0,arguments)}}},Am={readContext:yn,use:pf,useCallback:zx,useContext:yn,useEffect:ym,useImperativeHandle:Px,useInsertionEffect:Ux,useLayoutEffect:Lx,useMemo:Ix,useReducer:Jc,useRef:Nx,useState:function(){return Jc(Oa)},useDebugValue:Mm,useDeferredValue:function(t,e){var n=en();return Bx(n,Lt.memoizedState,t,e)},useTransition:function(){var t=Jc(Oa)[0],e=en().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:xx,useId:Vx,useHostTransitionStatus:Em,useFormState:Qg,useActionState:Qg,useOptimistic:function(t,e){var n=en();return Tx(n,Lt,t,e)},useMemoCache:xm,useCacheRefresh:kx};Am.useEffectEvent=Dx;var Yx={readContext:yn,use:pf,useCallback:zx,useContext:yn,useEffect:ym,useImperativeHandle:Px,useInsertionEffect:Ux,useLayoutEffect:Lx,useMemo:Ix,useReducer:jf,useRef:Nx,useState:function(){return jf(Oa)},useDebugValue:Mm,useDeferredValue:function(t,e){var n=en();return Lt===null?bm(n,t,e):Bx(n,Lt.memoizedState,t,e)},useTransition:function(){var t=jf(Oa)[0],e=en().memoizedState;return[typeof t=="boolean"?t:Xl(t),e]},useSyncExternalStore:xx,useId:Vx,useHostTransitionStatus:Em,useFormState:$g,useActionState:$g,useOptimistic:function(t,e){var n=en();return Lt!==null?Tx(n,Lt,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:xm,useCacheRefresh:kx};Yx.useEffectEvent=Dx;function Wf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:Xt({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var Th={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=ri(),a=us(i);a.payload=e,n!=null&&(a.callback=n),e=fs(t,a,i),e!==null&&(qn(e,t,i),cl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=ri(),a=us(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=fs(t,a,i),e!==null&&(qn(e,t,i),cl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=ri(),i=us(n);i.tag=2,e!=null&&(i.callback=e),e=fs(t,i,n),e!==null&&(qn(e,t,n),cl(e,t,n))}};function e0(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!Ml(n,i)||!Ml(a,s):!0}function t0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&Th.enqueueReplaceState(e,e.state,null)}function Ks(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=Xt({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function Zx(t){bu(t)}function Kx(t){console.error(t)}function Qx(t){bu(t)}function Uu(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function n0(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Ah(t,e,n){return n=us(n),n.tag=3,n.payload={element:null},n.callback=function(){Uu(t,e)},n}function $x(t){return t=us(t),t.tag=3,t}function Jx(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){n0(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){n0(e,n,i),typeof a!="function"&&(ds===null?ds=new Set([this]):ds.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Zb(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&Mo(e,n,a,!0),n=li.current,n!==null){switch(n.tag){case 31:case 13:return Ti===null?Iu():n.alternate===null&&Yt===0&&(Yt=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===wu?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),id(t,i,a)),!1;case 22:return n.flags|=65536,i===wu?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),id(t,i,a)),!1}throw Error(ce(435,n.tag))}return id(t,i,a),Iu(),!1}if(ft)return e=li.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==hh&&(t=Error(ce(422),{cause:i}),El(yi(t,n)))):(i!==hh&&(e=Error(ce(423),{cause:i}),El(yi(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=yi(i,n),a=Ah(t.stateNode,i,a),Xf(t,a),Yt!==4&&(Yt=2)),!1;var s=Error(ce(520),{cause:i});if(s=yi(s,n),ml===null?ml=[s]:ml.push(s),Yt!==4&&(Yt=2),e===null)return!0;i=yi(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Ah(n.stateNode,i,t),Xf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(ds===null||!ds.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=$x(a),Jx(a,t,n,i),Xf(n,a),!1}n=n.return}while(n!==null);return!1}var wm=Error(ce(461)),rn=!1;function _n(t,e,n,i){e.child=t===null?hx(e,null,n,i):Ys(e,t.child,n,i)}function i0(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return qs(e),i=mm(t,e,n,r,s,a),o=gm(),t!==null&&!rn?(vm(t,e,a),Pa(t,e,a)):(ft&&o&&om(e),e.flags|=1,_n(t,e,i,a),e.child)}function a0(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!rm(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,eS(t,e,s,i,a)):(t=Qc(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Cm(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:Ml,n(r,i)&&t.ref===e.ref)return Pa(t,e,a)}return e.flags|=1,t=wa(s,i),t.ref=e.ref,t.return=e,e.child=t}function eS(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(Ml(s,i)&&t.ref===e.ref)if(rn=!1,e.pendingProps=i=s,Cm(t,a))t.flags&131072&&(rn=!0);else return e.lanes=t.lanes,Pa(t,e,a)}return wh(t,e,n,i,a)}function tS(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return s0(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&$c(e,s!==null?s.cachePool:null),s!==null?qg(e,s):Sh(),gx(e);else return i=e.lanes=536870912,s0(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?($c(e,s.cachePool),qg(e,s),$a(),e.memoizedState=null):(t!==null&&$c(e,null),Sh(),$a());return _n(t,e,a,n),e.child}function Jo(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function s0(t,e,n,i,a){var s=um();return s=s===null?null:{parent:sn._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&$c(e,null),Sh(),gx(e),t!==null&&Mo(t,e,i,!0),e.childLanes=a,null}function tu(t,e){return e=Lu({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function r0(t,e,n){return Ys(e,t.child,null,n),t=tu(e,e.pendingProps),t.flags|=2,ei(e),e.memoizedState=null,t}function Kb(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(ft){if(i.mode==="hidden")return t=tu(e,i),e.lanes=536870912,Jo(null,t);if(yh(e),(t=Vt)?(t=qS(t,Mi),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:vs!==null?{id:Yi,overflow:Zi}:null,retryLane:536870912,hydrationErrors:null},n=rx(t),n.return=e,e.child=n,Sn=e,Vt=null)):t=null,t===null)throw _s(e);return e.lanes=536870912,null}return tu(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(yh(e),a)if(e.flags&256)e.flags&=-257,e=r0(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(ce(558));else if(rn||Mo(t,e,n,!1),a=(n&t.childLanes)!==0,rn||a){if(i=Pt,i!==null&&(r=U_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,ar(t,r),qn(i,t,r),wm;Iu(),e=r0(t,e,n)}else t=s.treeContext,Vt=Ai(r.nextSibling),Sn=e,ft=!0,cs=null,Mi=!1,t!==null&&lx(e,t),e=tu(e,i),e.flags|=4096;return e}return t=wa(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function nu(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(ce(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function wh(t,e,n,i,a){return qs(e),n=mm(t,e,n,i,void 0,a),i=gm(),t!==null&&!rn?(vm(t,e,a),Pa(t,e,a)):(ft&&i&&om(e),e.flags|=1,_n(t,e,n,a),e.child)}function o0(t,e,n,i,a,s){return qs(e),e.updateQueue=null,n=_x(e,i,n,a),vx(t),i=gm(),t!==null&&!rn?(vm(t,e,s),Pa(t,e,s)):(ft&&i&&om(e),e.flags|=1,_n(t,e,n,s),e.child)}function l0(t,e,n,i,a){if(qs(e),e.stateNode===null){var s=Hr,r=n.contextType;typeof r=="object"&&r!==null&&(s=yn(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Th,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},dm(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?yn(r):Hr,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Wf(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&Th.enqueueReplaceState(s,s.state,null),fl(e,i,s,a),ul(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=Ks(n,o);s.props=l;var c=s.context,h=n.contextType;r=Hr,typeof h=="object"&&h!==null&&(r=yn(h));var f=n.getDerivedStateFromProps;h=typeof f=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,h||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&t0(e,s,i,r),Za=!1;var u=e.memoizedState;s.state=u,fl(e,i,s,a),ul(),c=e.memoizedState,o||u!==c||Za?(typeof f=="function"&&(Wf(e,n,f,i),c=e.memoizedState),(l=Za||e0(e,n,l,i,u,c,r))?(h||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,_h(t,e),r=e.memoizedProps,h=Ks(n,r),s.props=h,f=e.pendingProps,u=s.context,c=n.contextType,l=Hr,typeof c=="object"&&c!==null&&(l=yn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==f||u!==l)&&t0(e,s,i,l),Za=!1,u=e.memoizedState,s.state=u,fl(e,i,s,a),ul();var p=e.memoizedState;r!==f||u!==p||Za||t!==null&&t.dependencies!==null&&Au(t.dependencies)?(typeof o=="function"&&(Wf(e,n,o,i),p=e.memoizedState),(h=Za||e0(e,n,h,i,u,p,l)||t!==null&&t.dependencies!==null&&Au(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=p),s.props=i,s.state=p,s.context=l,i=h):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,nu(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=Ys(e,t.child,null,a),e.child=Ys(e,null,n,a)):_n(t,e,n,a),e.memoizedState=s.state,t=e.child):t=Pa(t,e,a),t}function c0(t,e,n,i){return Ws(),e.flags|=256,_n(t,e,n,i),e.child}var qf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Yf(t){return{baseLanes:t,cachePool:ux()}}function Zf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=ni),t}function nS(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:(Jt.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(ft){if(a?Qa(e):$a(),(t=Vt)?(t=qS(t,Mi),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:vs!==null?{id:Yi,overflow:Zi}:null,retryLane:536870912,hydrationErrors:null},n=rx(t),n.return=e,e.child=n,Sn=e,Vt=null)):t=null,t===null)throw _s(e);return Gh(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?($a(),a=e.mode,o=Lu({mode:"hidden",children:o},a),i=Gs(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=Yf(n),i.childLanes=Zf(t,r,n),e.memoizedState=qf,Jo(null,i)):(Qa(e),Ch(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?(Qa(e),e.flags&=-257,e=Kf(t,e,n)):e.memoizedState!==null?($a(),e.child=t.child,e.flags|=128,e=null):($a(),o=i.fallback,a=e.mode,i=Lu({mode:"visible",children:i.children},a),o=Gs(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,Ys(e,t.child,null,n),i=e.child,i.memoizedState=Yf(n),i.childLanes=Zf(t,r,n),e.memoizedState=qf,e=Jo(null,i));else if(Qa(e),Gh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(ce(419)),i.stack="",i.digest=r,El({value:i,source:null,stack:null}),e=Kf(t,e,n)}else if(rn||Mo(t,e,n,!1),r=(n&t.childLanes)!==0,rn||r){if(r=Pt,r!==null&&(i=U_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,ar(t,i),qn(r,t,i),wm;Hh(o)||Iu(),e=Kf(t,e,n)}else Hh(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,Vt=Ai(o.nextSibling),Sn=e,ft=!0,cs=null,Mi=!1,t!==null&&lx(e,t),e=Ch(e,i.children),e.flags|=4096);return e}return a?($a(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=wa(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=wa(c,o):(o=Gs(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,Jo(null,i),i=e.child,o=t.child.memoizedState,o===null?o=Yf(n):(a=o.cachePool,a!==null?(l=sn._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=ux(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Zf(t,r,n),e.memoizedState=qf,Jo(t.child,i)):(Qa(e),n=t.child,t=n.sibling,n=wa(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function Ch(t,e){return e=Lu({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Lu(t,e){return t=ti(22,t,null,e),t.lanes=0,t}function Kf(t,e,n){return Ys(e,t.child,null,n),t=Ch(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function u0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),mh(t.return,e,n)}function Qf(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function iS(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=Jt.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,It(Jt,r),_n(t,e,i,n),i=ft?bl:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&u0(t,n,e);else if(t.tag===19)u0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Ru(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),Qf(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Ru(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}Qf(e,!0,n,null,s,i);break;case"together":Qf(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Pa(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Ss|=e.lanes,!(n&e.childLanes))if(t!==null){if(Mo(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(ce(153));if(e.child!==null){for(t=e.child,n=wa(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=wa(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Cm(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Au(t)))}function Qb(t,e,n){switch(e.tag){case 3:xu(e,e.stateNode.containerInfo),Ka(e,sn,t.memoizedState.cache),Ws();break;case 27:case 5:nh(e);break;case 4:xu(e,e.stateNode.containerInfo);break;case 10:Ka(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,yh(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(Qa(e),e.flags|=128,null):n&e.child.childLanes?nS(t,e,n):(Qa(e),t=Pa(t,e,n),t!==null?t.sibling:null);Qa(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(Mo(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return iS(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),It(Jt,Jt.current),i)break;return null;case 22:return e.lanes=0,tS(t,e,n,e.pendingProps);case 24:Ka(e,sn,t.memoizedState.cache)}return Pa(t,e,n)}function aS(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)rn=!0;else{if(!Cm(t,n)&&!(e.flags&128))return rn=!1,Qb(t,e,n);rn=!!(t.flags&131072)}else rn=!1,ft&&e.flags&1048576&&ox(e,bl,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Ls(e.elementType),e.type=t,typeof t=="function")rm(t)?(i=Ks(t,i),e.tag=1,e=l0(null,e,t,i,n)):(e.tag=0,e=wh(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Wp){e.tag=11,e=i0(null,e,t,i,n);break e}else if(a===qp){e.tag=14,e=a0(null,e,t,i,n);break e}}throw e=eh(t)||t,Error(ce(306,e,""))}}return e;case 0:return wh(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=Ks(i,e.pendingProps),l0(t,e,i,a,n);case 3:e:{if(xu(e,e.stateNode.containerInfo),t===null)throw Error(ce(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,_h(t,e),fl(e,i,null,n);var r=e.memoizedState;if(i=r.cache,Ka(e,sn,i),i!==s.cache&&gh(e,[sn],n,!0),ul(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=c0(t,e,i,n);break e}else if(i!==a){a=yi(Error(ce(424)),e),El(a),e=c0(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(Vt=Ai(t.firstChild),Sn=e,ft=!0,cs=null,Mi=!0,n=hx(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Ws(),i===a){e=Pa(t,e,n);break e}_n(t,e,i,n)}e=e.child}return e;case 26:return nu(t,e),t===null?(n=N0(e.type,null,e.pendingProps,null))?e.memoizedState=n:ft||(n=e.type,t=e.pendingProps,i=Gu(ls.current).createElement(n),i[xn]=e,i[Zn]=t,En(i,n,t),mn(i),e.stateNode=i):e.memoizedState=N0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return nh(e),t===null&&ft&&(i=e.stateNode=YS(e.type,e.pendingProps,ls.current),Sn=e,Mi=!0,a=Vt,bs(e.type)?(Vh=a,Vt=Ai(i.firstChild)):Vt=a),_n(t,e,e.pendingProps.children,n),nu(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&ft&&((a=i=Vt)&&(i=wE(i,e.type,e.pendingProps,Mi),i!==null?(e.stateNode=i,Sn=e,Vt=Ai(i.firstChild),Mi=!1,a=!0):a=!1),a||_s(e)),nh(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,Bh(a,s)?i=null:r!==null&&Bh(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=mm(t,e,Vb,null,null,n),Nl._currentValue=a),nu(t,e),_n(t,e,i,n),e.child;case 6:return t===null&&ft&&((t=n=Vt)&&(n=CE(n,e.pendingProps,Mi),n!==null?(e.stateNode=n,Sn=e,Vt=null,t=!0):t=!1),t||_s(e)),null;case 13:return nS(t,e,n);case 4:return xu(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=Ys(e,null,i,n):_n(t,e,i,n),e.child;case 11:return i0(t,e,e.type,e.pendingProps,n);case 7:return _n(t,e,e.pendingProps,n),e.child;case 8:return _n(t,e,e.pendingProps.children,n),e.child;case 12:return _n(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,Ka(e,e.type,i.value),_n(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,qs(e),a=yn(a),i=i(a),e.flags|=1,_n(t,e,i,n),e.child;case 14:return a0(t,e,e.type,e.pendingProps,n);case 15:return eS(t,e,e.type,e.pendingProps,n);case 19:return iS(t,e,n);case 31:return Kb(t,e,n);case 22:return tS(t,e,n,e.pendingProps);case 24:return qs(e),i=yn(sn),t===null?(a=um(),a===null&&(a=Pt,s=cm(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},dm(e),Ka(e,sn,a)):(t.lanes&n&&(_h(t,e),fl(e,null,null,n),ul()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),Ka(e,sn,i)):(i=s.cache,Ka(e,sn,i),i!==a.cache&&gh(e,[sn],n,!0))),_n(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(ce(156,e.tag))}function ua(t){t.flags|=4}function $f(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(CS())t.flags|=8192;else throw ks=wu,fm}else t.flags&=-16777217}function f0(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!QS(e))if(CS())t.flags|=8192;else throw ks=wu,fm}function cc(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?R_():536870912,t.lanes|=e,lo|=e)}function Io(t,e){if(!ft)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function Gt(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function $b(t,e,n){var i=e.pendingProps;switch(lm(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Gt(e),null;case 1:return Gt(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Ca(sn),no(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(ur(e)?ua(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,kf())),Gt(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(ua(e),s!==null?(Gt(e),f0(e,s)):(Gt(e),$f(e,a,null,i,n))):s?s!==t.memoizedState?(ua(e),Gt(e),f0(e,s)):(Gt(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&ua(e),Gt(e),$f(e,a,t,i,n)),null;case 27:if(Su(e),n=ls.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ua(e);else{if(!i){if(e.stateNode===null)throw Error(ce(166));return Gt(e),null}t=$i.current,ur(e)?Hg(e):(t=YS(a,i,n),e.stateNode=t,ua(e))}return Gt(e),null;case 5:if(Su(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ua(e);else{if(!i){if(e.stateNode===null)throw Error(ce(166));return Gt(e),null}if(s=$i.current,ur(e))Hg(e);else{var r=Gu(ls.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[xn]=e,s[Zn]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(En(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&ua(e)}}return Gt(e),$f(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&ua(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ce(166));if(t=ls.current,ur(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=Sn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[xn]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||XS(t.nodeValue,n)),t||_s(e,!0)}else t=Gu(t).createTextNode(i),t[xn]=e,e.stateNode=t}return Gt(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=ur(e),n!==null){if(t===null){if(!i)throw Error(ce(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ce(557));t[xn]=e}else Ws(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),t=!1}else n=kf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(ei(e),e):(ei(e),null);if(e.flags&128)throw Error(ce(558))}return Gt(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=ur(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(ce(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(ce(317));a[xn]=e}else Ws(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Gt(e),a=!1}else a=kf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(ei(e),e):(ei(e),null)}return ei(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),cc(e,e.updateQueue),Gt(e),null);case 4:return no(),t===null&&Pm(e.stateNode.containerInfo),Gt(e),null;case 10:return Ca(e.type),Gt(e),null;case 19:if(vn(Jt),i=e.memoizedState,i===null)return Gt(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)Io(i,!1);else{if(Yt!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Ru(t),s!==null){for(e.flags|=128,Io(i,!1),t=s.updateQueue,e.updateQueue=t,cc(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)sx(n,t),n=n.sibling;return It(Jt,Jt.current&1|2),ft&&Sa(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&ii()>Pu&&(e.flags|=128,a=!0,Io(i,!1),e.lanes=4194304)}else{if(!a)if(t=Ru(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,cc(e,t),Io(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!ft)return Gt(e),null}else 2*ii()-i.renderingStartTime>Pu&&n!==536870912&&(e.flags|=128,a=!0,Io(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=ii(),t.sibling=null,n=Jt.current,It(Jt,a?n&1|2:n&1),ft&&Sa(e,i.treeForkCount),t):(Gt(e),null);case 22:case 23:return ei(e),hm(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(Gt(e),e.subtreeFlags&6&&(e.flags|=8192)):Gt(e),n=e.updateQueue,n!==null&&cc(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&vn(Vs),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Ca(sn),Gt(e),null;case 25:return null;case 30:return null}throw Error(ce(156,e.tag))}function Jb(t,e){switch(lm(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Ca(sn),no(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Su(e),null;case 31:if(e.memoizedState!==null){if(ei(e),e.alternate===null)throw Error(ce(340));Ws()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(ei(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ce(340));Ws()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return vn(Jt),null;case 4:return no(),null;case 10:return Ca(e.type),null;case 22:case 23:return ei(e),hm(),t!==null&&vn(Vs),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Ca(sn),null;case 25:return null;default:return null}}function sS(t,e){switch(lm(e),e.tag){case 3:Ca(sn),no();break;case 26:case 27:case 5:Su(e);break;case 4:no();break;case 31:e.memoizedState!==null&&ei(e);break;case 13:ei(e);break;case 19:vn(Jt);break;case 10:Ca(e.type);break;case 22:case 23:ei(e),hm(),t!==null&&vn(Vs);break;case 24:Ca(sn)}}function jl(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){wt(e,e.return,o)}}function xs(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(h){wt(a,l,h)}}}i=i.next}while(i!==s)}}catch(h){wt(e,e.return,h)}}function rS(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{mx(e,n)}catch(i){wt(t,t.return,i)}}}function oS(t,e,n){n.props=Ks(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){wt(t,e,i)}}function hl(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){wt(t,e,a)}}function Ki(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){wt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){wt(t,e,a)}else n.current=null}function lS(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){wt(t,t.return,a)}}function Jf(t,e,n){try{var i=t.stateNode;yE(i,t.type,n,e),i[Zn]=e}catch(a){wt(t,t.return,a)}}function cS(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&bs(t.type)||t.tag===4}function ed(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||cS(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&bs(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Rh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Ea));else if(i!==4&&(i===27&&bs(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Rh(t,e,n),t=t.sibling;t!==null;)Rh(t,e,n),t=t.sibling}function Ou(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&bs(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Ou(t,e,n),t=t.sibling;t!==null;)Ou(t,e,n),t=t.sibling}function uS(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);En(e,i,n),e[xn]=t,e[Zn]=n}catch(s){wt(t,t.return,s)}}var ya=!1,an=!1,td=!1,d0=typeof WeakSet=="function"?WeakSet:Set,pn=null;function eE(t,e){if(t=t.containerInfo,zh=ju,t=Q_(t),im(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,h=0,f=t,u=null;t:for(;;){for(var p;f!==n||a!==0&&f.nodeType!==3||(o=r+a),f!==s||i!==0&&f.nodeType!==3||(l=r+i),f.nodeType===3&&(r+=f.nodeValue.length),(p=f.firstChild)!==null;)u=f,f=p;for(;;){if(f===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++h===i&&(l=r),(p=f.nextSibling)!==null)break;f=u,u=f.parentNode}f=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ih={focusedElem:t,selectionRange:n},ju=!1,pn=e;pn!==null;)if(e=pn,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,pn=t;else for(;pn!==null;){switch(e=pn,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=Ks(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(b){wt(n,n.return,b)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Fh(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Fh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(ce(163))}if(t=e.sibling,t!==null){t.return=e.return,pn=t;break}pn=e.return}}function fS(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:da(t,n),i&4&&jl(5,n);break;case 1:if(da(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){wt(n,n.return,r)}else{var a=Ks(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){wt(n,n.return,r)}}i&64&&rS(n),i&512&&hl(n,n.return);break;case 3:if(da(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{mx(t,e)}catch(r){wt(n,n.return,r)}}break;case 27:e===null&&i&4&&uS(n);case 26:case 5:da(t,n),e===null&&i&4&&lS(n),i&512&&hl(n,n.return);break;case 12:da(t,n);break;case 31:da(t,n),i&4&&pS(t,n);break;case 13:da(t,n),i&4&&mS(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=cE.bind(null,n),RE(t,n))));break;case 22:if(i=n.memoizedState!==null||ya,!i){e=e!==null&&e.memoizedState!==null||an,a=ya;var s=an;ya=i,(an=e)&&!s?_a(t,n,(n.subtreeFlags&8772)!==0):da(t,n),ya=a,an=s}break;case 30:break;default:da(t,n)}}function dS(t){var e=t.alternate;e!==null&&(t.alternate=null,dS(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Qp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var jt=null,jn=!1;function fa(t,e,n){for(n=n.child;n!==null;)hS(t,e,n),n=n.sibling}function hS(t,e,n){if(ai&&typeof ai.onCommitFiberUnmount=="function")try{ai.onCommitFiberUnmount(Bl,n)}catch{}switch(n.tag){case 26:an||Ki(n,e),fa(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:an||Ki(n,e);var i=jt,a=jn;bs(n.type)&&(jt=n.stateNode,jn=!1),fa(t,e,n),vl(n.stateNode),jt=i,jn=a;break;case 5:an||Ki(n,e);case 6:if(i=jt,a=jn,jt=null,fa(t,e,n),jt=i,jn=a,jt!==null)if(jn)try{(jt.nodeType===9?jt.body:jt.nodeName==="HTML"?jt.ownerDocument.body:jt).removeChild(n.stateNode)}catch(s){wt(n,e,s)}else try{jt.removeChild(n.stateNode)}catch(s){wt(n,e,s)}break;case 18:jt!==null&&(jn?(t=jt,T0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),ho(t)):T0(jt,n.stateNode));break;case 4:i=jt,a=jn,jt=n.stateNode.containerInfo,jn=!0,fa(t,e,n),jt=i,jn=a;break;case 0:case 11:case 14:case 15:xs(2,n,e),an||xs(4,n,e),fa(t,e,n);break;case 1:an||(Ki(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&oS(n,e,i)),fa(t,e,n);break;case 21:fa(t,e,n);break;case 22:an=(i=an)||n.memoizedState!==null,fa(t,e,n),an=i;break;default:fa(t,e,n)}}function pS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{ho(t)}catch(n){wt(e,e.return,n)}}}function mS(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{ho(t)}catch(n){wt(e,e.return,n)}}function tE(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new d0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new d0),e;default:throw Error(ce(435,t.tag))}}function uc(t,e){var n=tE(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=uE.bind(null,t,i);i.then(a,a)}})}function Vn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(bs(o.type)){jt=o.stateNode,jn=!1;break e}break;case 5:jt=o.stateNode,jn=!1;break e;case 3:case 4:jt=o.stateNode.containerInfo,jn=!0;break e}o=o.return}if(jt===null)throw Error(ce(160));hS(s,r,a),jt=null,jn=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)gS(e,t),e=e.sibling}var Pi=null;function gS(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Vn(e,t),kn(t),i&4&&(xs(3,t,t.return),jl(3,t),xs(5,t,t.return));break;case 1:Vn(e,t),kn(t),i&512&&(an||n===null||Ki(n,n.return)),i&64&&ya&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Pi;if(Vn(e,t),kn(t),i&512&&(an||n===null||Ki(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[Gl]||s[xn]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),En(s,i,n),s[xn]=t,mn(s),i=s;break e;case"link":var r=U0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),En(s,i,n),a.head.appendChild(s);break;case"meta":if(r=U0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),En(s,i,n),a.head.appendChild(s);break;default:throw Error(ce(468,i))}s[xn]=t,mn(s),i=s}t.stateNode=i}else L0(a,t.type,t.stateNode);else t.stateNode=D0(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?L0(a,t.type,t.stateNode):D0(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&Jf(t,t.memoizedProps,n.memoizedProps)}break;case 27:Vn(e,t),kn(t),i&512&&(an||n===null||Ki(n,n.return)),n!==null&&i&4&&Jf(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Vn(e,t),kn(t),i&512&&(an||n===null||Ki(n,n.return)),t.flags&32){a=t.stateNode;try{ao(a,"")}catch(g){wt(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,Jf(t,a,n!==null?n.memoizedProps:a)),i&1024&&(td=!0);break;case 6:if(Vn(e,t),kn(t),i&4){if(t.stateNode===null)throw Error(ce(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){wt(t,t.return,g)}}break;case 3:if(su=null,a=Pi,Pi=Vu(e.containerInfo),Vn(e,t),Pi=a,kn(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{ho(e.containerInfo)}catch(g){wt(t,t.return,g)}td&&(td=!1,vS(t));break;case 4:i=Pi,Pi=Vu(t.stateNode.containerInfo),Vn(e,t),kn(t),Pi=i;break;case 12:Vn(e,t),kn(t);break;case 31:Vn(e,t),kn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,uc(t,i)));break;case 13:Vn(e,t),kn(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(vf=ii()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,uc(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=ya,h=an;if(ya=c||a,an=h||l,Vn(e,t),an=h,ya=c,kn(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||ya||an||Os(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var f=l.memoizedProps.style,u=f!=null&&f.hasOwnProperty("display")?f.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){wt(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){wt(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var p=l.stateNode;a?A0(p,!0):A0(l.stateNode,!1)}catch(g){wt(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,uc(t,n))));break;case 19:Vn(e,t),kn(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,uc(t,i)));break;case 30:break;case 21:break;default:Vn(e,t),kn(t)}}function kn(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(cS(i)){n=i;break}i=i.return}if(n==null)throw Error(ce(160));switch(n.tag){case 27:var a=n.stateNode,s=ed(t);Ou(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(ao(r,""),n.flags&=-33);var o=ed(t);Ou(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=ed(t);Rh(t,c,l);break;default:throw Error(ce(161))}}catch(h){wt(t,t.return,h)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function vS(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;vS(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function da(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)fS(t,e.alternate,e),e=e.sibling}function Os(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:xs(4,e,e.return),Os(e);break;case 1:Ki(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&oS(e,e.return,n),Os(e);break;case 27:vl(e.stateNode);case 26:case 5:Ki(e,e.return),Os(e);break;case 22:e.memoizedState===null&&Os(e);break;case 30:Os(e);break;default:Os(e)}t=t.sibling}}function _a(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:_a(a,s,n),jl(4,s);break;case 1:if(_a(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){wt(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)px(l[a],o)}catch(c){wt(i,i.return,c)}}n&&r&64&&rS(s),hl(s,s.return);break;case 27:uS(s);case 26:case 5:_a(a,s,n),n&&i===null&&r&4&&lS(s),hl(s,s.return);break;case 12:_a(a,s,n);break;case 31:_a(a,s,n),n&&r&4&&pS(a,s);break;case 13:_a(a,s,n),n&&r&4&&mS(a,s);break;case 22:s.memoizedState===null&&_a(a,s,n),hl(s,s.return);break;case 30:break;default:_a(a,s,n)}e=e.sibling}}function Rm(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&kl(n))}function Nm(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&kl(t))}function Di(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)_S(t,e,n,i),e=e.sibling}function _S(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Di(t,e,n,i),a&2048&&jl(9,e);break;case 1:Di(t,e,n,i);break;case 3:Di(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&kl(t)));break;case 12:if(a&2048){Di(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){wt(e,e.return,l)}}else Di(t,e,n,i);break;case 31:Di(t,e,n,i);break;case 13:Di(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?Di(t,e,n,i):pl(t,e):s._visibility&2?Di(t,e,n,i):(s._visibility|=2,Nr(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&Rm(r,e);break;case 24:Di(t,e,n,i),a&2048&&Nm(e.alternate,e);break;default:Di(t,e,n,i)}}function Nr(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Nr(s,r,o,l,a),jl(8,r);break;case 23:break;case 22:var h=r.stateNode;r.memoizedState!==null?h._visibility&2?Nr(s,r,o,l,a):pl(s,r):(h._visibility|=2,Nr(s,r,o,l,a)),a&&c&2048&&Rm(r.alternate,r);break;case 24:Nr(s,r,o,l,a),a&&c&2048&&Nm(r.alternate,r);break;default:Nr(s,r,o,l,a)}e=e.sibling}}function pl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:pl(n,i),a&2048&&Rm(i.alternate,i);break;case 24:pl(n,i),a&2048&&Nm(i.alternate,i);break;default:pl(n,i)}e=e.sibling}}var el=8192;function fr(t,e,n){if(t.subtreeFlags&el)for(t=t.child;t!==null;)xS(t,e,n),t=t.sibling}function xS(t,e,n){switch(t.tag){case 26:fr(t,e,n),t.flags&el&&t.memoizedState!==null&&GE(n,Pi,t.memoizedState,t.memoizedProps);break;case 5:fr(t,e,n);break;case 3:case 4:var i=Pi;Pi=Vu(t.stateNode.containerInfo),fr(t,e,n),Pi=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=el,el=16777216,fr(t,e,n),el=i):fr(t,e,n));break;default:fr(t,e,n)}}function SS(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Bo(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pn=i,MS(i,t)}SS(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)yS(t),t=t.sibling}function yS(t){switch(t.tag){case 0:case 11:case 15:Bo(t),t.flags&2048&&xs(9,t,t.return);break;case 3:Bo(t);break;case 12:Bo(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,iu(t)):Bo(t);break;default:Bo(t)}}function iu(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];pn=i,MS(i,t)}SS(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:xs(8,e,e.return),iu(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,iu(e));break;default:iu(e)}t=t.sibling}}function MS(t,e){for(;pn!==null;){var n=pn;switch(n.tag){case 0:case 11:case 15:xs(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:kl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,pn=i;else e:for(n=t;pn!==null;){i=pn;var a=i.sibling,s=i.return;if(dS(i),i===n){pn=null;break e}if(a!==null){a.return=s,pn=a;break e}pn=s}}}var nE={getCacheForType:function(t){var e=yn(sn),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return yn(sn).controller.signal}},iE=typeof WeakMap=="function"?WeakMap:Map,gt=0,Pt=null,st=null,ot=0,At=0,Jn=null,is=!1,Eo=!1,Dm=!1,za=0,Yt=0,Ss=0,Xs=0,Um=0,ni=0,lo=0,ml=null,Wn=null,Nh=!1,vf=0,bS=0,Pu=1/0,zu=null,ds=null,on=0,hs=null,co=null,Ra=0,Dh=0,Uh=null,ES=null,gl=0,Lh=null;function ri(){return gt&2&&ot!==0?ot&-ot:He.T!==null?Om():L_()}function TS(){if(ni===0)if(!(ot&536870912)||ft){var t=nc;nc<<=1,!(nc&3932160)&&(nc=262144),ni=t}else ni=536870912;return t=li.current,t!==null&&(t.flags|=32),ni}function qn(t,e,n){(t===Pt&&(At===2||At===9)||t.cancelPendingCommit!==null)&&(uo(t,0),as(t,ot,ni,!1)),Hl(t,n),(!(gt&2)||t!==Pt)&&(t===Pt&&(!(gt&2)&&(Xs|=n),Yt===4&&as(t,ot,ni,!1)),ia(t))}function AS(t,e,n){if(gt&6)throw Error(ce(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Fl(t,e),a=i?rE(t,e):nd(t,e,!0),s=i;do{if(a===0){Eo&&!i&&as(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!aE(n)){a=nd(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=ml;var l=o.current.memoizedState.isDehydrated;if(l&&(uo(o,r).flags|=256),r=nd(o,r,!1),r!==2){if(Dm&&!l){o.errorRecoveryDisabledLanes|=s,Xs|=s,a=4;break e}s=Wn,Wn=a,s!==null&&(Wn===null?Wn=s:Wn.push.apply(Wn,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){uo(t,0),as(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(ce(345));case 4:if((e&4194048)!==e)break;case 6:as(i,e,ni,!is);break e;case 2:Wn=null;break;case 3:case 5:break;default:throw Error(ce(329))}if((e&62914560)===e&&(a=vf+300-ii(),10<a)){if(as(i,e,ni,!is),rf(i,0,!0)!==0)break e;Ra=e,i.timeoutHandle=WS(h0.bind(null,i,n,Wn,zu,Nh,e,ni,Xs,lo,is,s,"Throttled",-0,0),a);break e}h0(i,n,Wn,zu,Nh,e,ni,Xs,lo,is,s,null,-0,0)}}break}while(!0);ia(t)}function h0(t,e,n,i,a,s,r,o,l,c,h,f,u,p){if(t.timeoutHandle=-1,f=e.subtreeFlags,f&8192||(f&16785408)===16785408){f={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Ea},xS(e,s,f);var g=(s&62914560)===s?vf-ii():(s&4194048)===s?bS-ii():0;if(g=VE(f,g),g!==null){Ra=s,t.cancelPendingCommit=g(m0.bind(null,t,e,s,n,i,a,r,o,l,h,f,null,u,p)),as(t,s,r,!c);return}}m0(t,e,s,n,i,a,r,o,l)}function aE(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!oi(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function as(t,e,n,i){e&=~Um,e&=~Xs,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-si(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&N_(t,n,e)}function _f(){return gt&6?!0:(Wl(0),!1)}function Lm(){if(st!==null){if(At===0)var t=st.return;else t=st,Ta=sr=null,_m(t),Qr=null,Tl=0,t=st;for(;t!==null;)sS(t.alternate,t),t=t.return;st=null}}function uo(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,EE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Ra=0,Lm(),Pt=t,st=n=wa(t.current,null),ot=e,At=0,Jn=null,is=!1,Eo=Fl(t,e),Dm=!1,lo=ni=Um=Xs=Ss=Yt=0,Wn=ml=null,Nh=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-si(i),s=1<<a;e|=t[a],i&=~s}return za=e,uf(),n}function wS(t,e){$e=null,He.H=wl,e===bo||e===df?(e=jg(),At=3):e===fm?(e=jg(),At=4):At=e===wm?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,Jn=e,st===null&&(Yt=1,Uu(t,yi(e,t.current)))}function CS(){var t=li.current;return t===null?!0:(ot&4194048)===ot?Ti===null:(ot&62914560)===ot||ot&536870912?t===Ti:!1}function RS(){var t=He.H;return He.H=wl,t===null?wl:t}function NS(){var t=He.A;return He.A=nE,t}function Iu(){Yt=4,is||(ot&4194048)!==ot&&li.current!==null||(Eo=!0),!(Ss&134217727)&&!(Xs&134217727)||Pt===null||as(Pt,ot,ni,!1)}function nd(t,e,n){var i=gt;gt|=2;var a=RS(),s=NS();(Pt!==t||ot!==e)&&(zu=null,uo(t,e)),e=!1;var r=Yt;e:do try{if(At!==0&&st!==null){var o=st,l=Jn;switch(At){case 8:Lm(),r=6;break e;case 3:case 2:case 9:case 6:li.current===null&&(e=!0);var c=At;if(At=0,Jn=null,kr(t,o,l,c),n&&Eo){r=0;break e}break;default:c=At,At=0,Jn=null,kr(t,o,l,c)}}sE(),r=Yt;break}catch(h){wS(t,h)}while(!0);return e&&t.shellSuspendCounter++,Ta=sr=null,gt=i,He.H=a,He.A=s,st===null&&(Pt=null,ot=0,uf()),r}function sE(){for(;st!==null;)DS(st)}function rE(t,e){var n=gt;gt|=2;var i=RS(),a=NS();Pt!==t||ot!==e?(zu=null,Pu=ii()+500,uo(t,e)):Eo=Fl(t,e);e:do try{if(At!==0&&st!==null){e=st;var s=Jn;t:switch(At){case 1:At=0,Jn=null,kr(t,e,s,1);break;case 2:case 9:if(Xg(s)){At=0,Jn=null,p0(e);break}e=function(){At!==2&&At!==9||Pt!==t||(At=7),ia(t)},s.then(e,e);break e;case 3:At=7;break e;case 4:At=5;break e;case 7:Xg(s)?(At=0,Jn=null,p0(e)):(At=0,Jn=null,kr(t,e,s,7));break;case 5:var r=null;switch(st.tag){case 26:r=st.memoizedState;case 5:case 27:var o=st;if(r?QS(r):o.stateNode.complete){At=0,Jn=null;var l=o.sibling;if(l!==null)st=l;else{var c=o.return;c!==null?(st=c,xf(c)):st=null}break t}}At=0,Jn=null,kr(t,e,s,5);break;case 6:At=0,Jn=null,kr(t,e,s,6);break;case 8:Lm(),Yt=6;break e;default:throw Error(ce(462))}}oE();break}catch(h){wS(t,h)}while(!0);return Ta=sr=null,He.H=i,He.A=a,gt=n,st!==null?0:(Pt=null,ot=0,uf(),Yt)}function oE(){for(;st!==null&&!NM();)DS(st)}function DS(t){var e=aS(t.alternate,t,za);t.memoizedProps=t.pendingProps,e===null?xf(t):st=e}function p0(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=o0(n,e,e.pendingProps,e.type,void 0,ot);break;case 11:e=o0(n,e,e.pendingProps,e.type.render,e.ref,ot);break;case 5:_m(e);default:sS(n,e),e=st=sx(e,za),e=aS(n,e,za)}t.memoizedProps=t.pendingProps,e===null?xf(t):st=e}function kr(t,e,n,i){Ta=sr=null,_m(e),Qr=null,Tl=0;var a=e.return;try{if(Zb(t,a,e,n,ot)){Yt=1,Uu(t,yi(n,t.current)),st=null;return}}catch(s){if(a!==null)throw st=a,s;Yt=1,Uu(t,yi(n,t.current)),st=null;return}e.flags&32768?(ft||i===1?t=!0:Eo||ot&536870912?t=!1:(is=t=!0,(i===2||i===9||i===3||i===6)&&(i=li.current,i!==null&&i.tag===13&&(i.flags|=16384))),US(e,t)):xf(e)}function xf(t){var e=t;do{if(e.flags&32768){US(e,is);return}t=e.return;var n=$b(e.alternate,e,za);if(n!==null){st=n;return}if(e=e.sibling,e!==null){st=e;return}st=e=t}while(e!==null);Yt===0&&(Yt=5)}function US(t,e){do{var n=Jb(t.alternate,t);if(n!==null){n.flags&=32767,st=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){st=t;return}st=t=n}while(t!==null);Yt=6,st=null}function m0(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do Sf();while(on!==0);if(gt&6)throw Error(ce(327));if(e!==null){if(e===t.current)throw Error(ce(177));if(s=e.lanes|e.childLanes,s|=am,HM(t,n,s,r,o,l),t===Pt&&(st=Pt=null,ot=0),co=e,hs=t,Ra=n,Dh=s,Uh=a,ES=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,fE(yu,function(){return IS(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=He.T,He.T=null,a=vt.p,vt.p=2,r=gt,gt|=4;try{eE(t,e,n)}finally{gt=r,vt.p=a,He.T=i}}on=1,LS(),OS(),PS()}}function LS(){if(on===1){on=0;var t=hs,e=co,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=He.T,He.T=null;var i=vt.p;vt.p=2;var a=gt;gt|=4;try{gS(e,t);var s=Ih,r=Q_(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&K_(o.ownerDocument.documentElement,o)){if(l!==null&&im(o)){var c=l.start,h=l.end;if(h===void 0&&(h=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(h,o.value.length);else{var f=o.ownerDocument||document,u=f&&f.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,b=Math.min(l.start,g),v=l.end===void 0?b:Math.min(l.end,g);!p.extend&&b>v&&(r=v,v=b,b=r);var d=Ig(o,b),x=Ig(o,v);if(d&&x&&(p.rangeCount!==1||p.anchorNode!==d.node||p.anchorOffset!==d.offset||p.focusNode!==x.node||p.focusOffset!==x.offset)){var M=f.createRange();M.setStart(d.node,d.offset),p.removeAllRanges(),b>v?(p.addRange(M),p.extend(x.node,x.offset)):(M.setEnd(x.node,x.offset),p.addRange(M))}}}}for(f=[],p=o;p=p.parentNode;)p.nodeType===1&&f.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<f.length;o++){var _=f[o];_.element.scrollLeft=_.left,_.element.scrollTop=_.top}}ju=!!zh,Ih=zh=null}finally{gt=a,vt.p=i,He.T=n}}t.current=e,on=2}}function OS(){if(on===2){on=0;var t=hs,e=co,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=He.T,He.T=null;var i=vt.p;vt.p=2;var a=gt;gt|=4;try{fS(t,e.alternate,e)}finally{gt=a,vt.p=i,He.T=n}}on=3}}function PS(){if(on===4||on===3){on=0,DM();var t=hs,e=co,n=Ra,i=ES;e.subtreeFlags&10256||e.flags&10256?on=5:(on=0,co=hs=null,zS(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(ds=null),Kp(n),e=e.stateNode,ai&&typeof ai.onCommitFiberRoot=="function")try{ai.onCommitFiberRoot(Bl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=He.T,a=vt.p,vt.p=2,He.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{He.T=e,vt.p=a}}Ra&3&&Sf(),ia(t),a=t.pendingLanes,n&261930&&a&42?t===Lh?gl++:(gl=0,Lh=t):gl=0,Wl(0)}}function zS(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,kl(e)))}function Sf(){return LS(),OS(),PS(),IS()}function IS(){if(on!==5)return!1;var t=hs,e=Dh;Dh=0;var n=Kp(Ra),i=He.T,a=vt.p;try{vt.p=32>n?32:n,He.T=null,n=Uh,Uh=null;var s=hs,r=Ra;if(on=0,co=hs=null,Ra=0,gt&6)throw Error(ce(331));var o=gt;if(gt|=4,yS(s.current),_S(s,s.current,r,n),gt=o,Wl(0,!1),ai&&typeof ai.onPostCommitFiberRoot=="function")try{ai.onPostCommitFiberRoot(Bl,s)}catch{}return!0}finally{vt.p=a,He.T=i,zS(t,e)}}function g0(t,e,n){e=yi(n,e),e=Ah(t.stateNode,e,2),t=fs(t,e,2),t!==null&&(Hl(t,2),ia(t))}function wt(t,e,n){if(t.tag===3)g0(t,t,n);else for(;e!==null;){if(e.tag===3){g0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(ds===null||!ds.has(i))){t=yi(n,t),n=$x(2),i=fs(e,n,2),i!==null&&(Jx(n,i,e,t),Hl(i,2),ia(i));break}}e=e.return}}function id(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new iE;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(Dm=!0,a.add(n),t=lE.bind(null,t,e,n),e.then(t,t))}function lE(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Pt===t&&(ot&n)===n&&(Yt===4||Yt===3&&(ot&62914560)===ot&&300>ii()-vf?!(gt&2)&&uo(t,0):Um|=n,lo===ot&&(lo=0)),ia(t)}function BS(t,e){e===0&&(e=R_()),t=ar(t,e),t!==null&&(Hl(t,e),ia(t))}function cE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),BS(t,n)}function uE(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(ce(314))}i!==null&&i.delete(e),BS(t,n)}function fE(t,e){return Yp(t,e)}var Bu=null,Dr=null,Oh=!1,Fu=!1,ad=!1,ss=0;function ia(t){t!==Dr&&t.next===null&&(Dr===null?Bu=Dr=t:Dr=Dr.next=t),Fu=!0,Oh||(Oh=!0,hE())}function Wl(t,e){if(!ad&&Fu){ad=!0;do for(var n=!1,i=Bu;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-si(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,v0(i,s))}else s=ot,s=rf(i,i===Pt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Fl(i,s)||(n=!0,v0(i,s));i=i.next}while(n);ad=!1}}function dE(){FS()}function FS(){Fu=Oh=!1;var t=0;ss!==0&&bE()&&(t=ss);for(var e=ii(),n=null,i=Bu;i!==null;){var a=i.next,s=HS(i,e);s===0?(i.next=null,n===null?Bu=a:n.next=a,a===null&&(Dr=n)):(n=i,(t!==0||s&3)&&(Fu=!0)),i=a}on!==0&&on!==5||Wl(t),ss!==0&&(ss=0)}function HS(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-si(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=FM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=Pt,n=ot,n=rf(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(At===2||At===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&Uf(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Fl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&Uf(i),Kp(n)){case 2:case 8:n=w_;break;case 32:n=yu;break;case 268435456:n=C_;break;default:n=yu}return i=GS.bind(null,t),n=Yp(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&Uf(i),t.callbackPriority=2,t.callbackNode=null,2}function GS(t,e){if(on!==0&&on!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Sf()&&t.callbackNode!==n)return null;var i=ot;return i=rf(t,t===Pt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(AS(t,i,e),HS(t,ii()),t.callbackNode!=null&&t.callbackNode===n?GS.bind(null,t):null)}function v0(t,e){if(Sf())return null;AS(t,e,!0)}function hE(){TE(function(){gt&6?Yp(A_,dE):FS()})}function Om(){if(ss===0){var t=so;t===0&&(t=tc,tc<<=1,!(tc&261888)&&(tc=256)),ss=t}return ss}function _0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Yc(""+t)}function x0(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function pE(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=_0((a[Zn]||null).action),r=i.submitter;r&&(e=(e=r[Zn]||null)?_0(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new of("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(ss!==0){var l=r?x0(a,r):new FormData(a);Eh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?x0(a,r):new FormData(a),Eh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var sd=0;sd<dh.length;sd++){var rd=dh[sd],mE=rd.toLowerCase(),gE=rd[0].toUpperCase()+rd.slice(1);Bi(mE,"on"+gE)}Bi(J_,"onAnimationEnd");Bi(ex,"onAnimationIteration");Bi(tx,"onAnimationStart");Bi("dblclick","onDoubleClick");Bi("focusin","onFocus");Bi("focusout","onBlur");Bi(Ub,"onTransitionRun");Bi(Lb,"onTransitionStart");Bi(Ob,"onTransitionCancel");Bi(nx,"onTransitionEnd");io("onMouseEnter",["mouseout","mouseover"]);io("onMouseLeave",["mouseout","mouseover"]);io("onPointerEnter",["pointerout","pointerover"]);io("onPointerLeave",["pointerout","pointerover"]);tr("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));tr("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));tr("onBeforeInput",["compositionend","keypress","textInput","paste"]);tr("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));tr("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));tr("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Cl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),vE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Cl));function VS(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(h){bu(h)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(h){bu(h)}a.currentTarget=null,s=l}}}}function at(t,e){var n=e[ah];n===void 0&&(n=e[ah]=new Set);var i=t+"__bubble";n.has(i)||(kS(e,t,2,!1),n.add(i))}function od(t,e,n){var i=0;e&&(i|=4),kS(n,t,i,e)}var fc="_reactListening"+Math.random().toString(36).slice(2);function Pm(t){if(!t[fc]){t[fc]=!0,O_.forEach(function(n){n!=="selectionchange"&&(vE.has(n)||od(n,!1,t),od(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[fc]||(e[fc]=!0,od("selectionchange",!1,e))}}function kS(t,e,n,i){switch(ny(e)){case 2:var a=jE;break;case 8:a=WE;break;default:a=Fm}n=a.bind(null,e,n,t),a=void 0,!ch||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function ld(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Or(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}V_(function(){var c=s,h=Jp(n),f=[];e:{var u=ix.get(t);if(u!==void 0){var p=of,g=t;switch(t){case"keypress":if(Kc(n)===0)break e;case"keydown":case"keyup":p=ub;break;case"focusin":g="focus",p=If;break;case"focusout":g="blur",p=If;break;case"beforeblur":case"afterblur":p=If;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=wg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=$M;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=hb;break;case J_:case ex:case tx:p=tb;break;case nx:p=mb;break;case"scroll":case"scrollend":p=KM;break;case"wheel":p=vb;break;case"copy":case"cut":case"paste":p=ib;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Rg;break;case"toggle":case"beforetoggle":p=xb}var b=(e&4)!==0,v=!b&&(t==="scroll"||t==="scrollend"),d=b?u!==null?u+"Capture":null:u;b=[];for(var x=c,M;x!==null;){var _=x;if(M=_.stateNode,_=_.tag,_!==5&&_!==26&&_!==27||M===null||d===null||(_=Sl(x,d),_!=null&&b.push(Rl(x,_,M))),v)break;x=x.return}0<b.length&&(u=new p(u,g,null,n,h),f.push({event:u,listeners:b}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==lh&&(g=n.relatedTarget||n.fromElement)&&(Or(g)||g[So]))break e;if((p||u)&&(u=h.window===h?h:(u=h.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Or(g):null,g!==null&&(v=Il(g),b=g.tag,g!==v||b!==5&&b!==27&&b!==6)&&(g=null)):(p=null,g=c),p!==g)){if(b=wg,_="onMouseLeave",d="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(b=Rg,_="onPointerLeave",d="onPointerEnter",x="pointer"),v=p==null?u:$o(p),M=g==null?u:$o(g),u=new b(_,x+"leave",p,n,h),u.target=v,u.relatedTarget=M,_=null,Or(h)===c&&(b=new b(d,x+"enter",g,n,h),b.target=M,b.relatedTarget=v,_=b),v=_,p&&g)t:{for(b=_E,d=p,x=g,M=0,_=d;_;_=b(_))M++;_=0;for(var w=x;w;w=b(w))_++;for(;0<M-_;)d=b(d),M--;for(;0<_-M;)x=b(x),_--;for(;M--;){if(d===x||x!==null&&d===x.alternate){b=d;break t}d=b(d),x=b(x)}b=null}else b=null;p!==null&&S0(f,u,p,b,!1),g!==null&&v!==null&&S0(f,v,g,b,!0)}}e:{if(u=c?$o(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var N=Lg;else if(Ug(u))if(Y_)N=Rb;else{N=wb;var T=Ab}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&$p(c.elementType)&&(N=Lg):N=Cb;if(N&&(N=N(t,c))){q_(f,N,n,h);break e}T&&T(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&oh(u,"number",u.value)}switch(T=c?$o(c):window,t){case"focusin":(Ug(T)||T.contentEditable==="true")&&(Ir=T,uh=c,ol=null);break;case"focusout":ol=uh=Ir=null;break;case"mousedown":fh=!0;break;case"contextmenu":case"mouseup":case"dragend":fh=!1,Bg(f,n,h);break;case"selectionchange":if(Db)break;case"keydown":case"keyup":Bg(f,n,h)}var y;if(nm)e:{switch(t){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else zr?j_(t,n)&&(R="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(R="onCompositionStart");R&&(X_&&n.locale!=="ko"&&(zr||R!=="onCompositionStart"?R==="onCompositionEnd"&&zr&&(y=k_()):(ns=h,em="value"in ns?ns.value:ns.textContent,zr=!0)),T=Hu(c,R),0<T.length&&(R=new Cg(R,t,null,n,h),f.push({event:R,listeners:T}),y?R.data=y:(y=W_(n),y!==null&&(R.data=y)))),(y=yb?Mb(t,n):bb(t,n))&&(R=Hu(c,"onBeforeInput"),0<R.length&&(T=new Cg("onBeforeInput","beforeinput",null,n,h),f.push({event:T,listeners:R}),T.data=y)),pE(f,t,c,n,h)}VS(f,e)})}function Rl(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Hu(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Sl(t,n),a!=null&&i.unshift(Rl(t,a,s)),a=Sl(t,e),a!=null&&i.push(Rl(t,a,s))),t.tag===3)return i;t=t.return}return[]}function _E(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function S0(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Sl(n,s),c!=null&&r.unshift(Rl(n,c,l))):a||(c=Sl(n,s),c!=null&&r.push(Rl(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var xE=/\r\n?/g,SE=/\u0000|\uFFFD/g;function y0(t){return(typeof t=="string"?t:""+t).replace(xE,`
`).replace(SE,"")}function XS(t,e){return e=y0(e),y0(t)===e}function Ut(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||ao(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&ao(t,""+i);break;case"className":ac(t,"class",i);break;case"tabIndex":ac(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":ac(t,n,i);break;case"style":G_(t,i,s);break;case"data":if(e!=="object"){ac(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Yc(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Ut(t,e,"name",a.name,a,null),Ut(t,e,"formEncType",a.formEncType,a,null),Ut(t,e,"formMethod",a.formMethod,a,null),Ut(t,e,"formTarget",a.formTarget,a,null)):(Ut(t,e,"encType",a.encType,a,null),Ut(t,e,"method",a.method,a,null),Ut(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Yc(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=Ea);break;case"onScroll":i!=null&&at("scroll",t);break;case"onScrollEnd":i!=null&&at("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(ce(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(ce(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=Yc(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":at("beforetoggle",t),at("toggle",t),qc(t,"popover",i);break;case"xlinkActuate":ca(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ca(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ca(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ca(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ca(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ca(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ca(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ca(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ca(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":qc(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=YM.get(n)||n,qc(t,n,i))}}function Ph(t,e,n,i,a,s){switch(n){case"style":G_(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(ce(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(ce(60));t.innerHTML=n}}break;case"children":typeof i=="string"?ao(t,i):(typeof i=="number"||typeof i=="bigint")&&ao(t,""+i);break;case"onScroll":i!=null&&at("scroll",t);break;case"onScrollEnd":i!=null&&at("scrollend",t);break;case"onClick":i!=null&&(t.onclick=Ea);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!P_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[Zn]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):qc(t,n,i)}}}function En(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":at("error",t),at("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(ce(137,e));default:Ut(t,e,s,r,n,null)}}a&&Ut(t,e,"srcSet",n.srcSet,n,null),i&&Ut(t,e,"src",n.src,n,null);return;case"input":at("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var h=n[i];if(h!=null)switch(i){case"name":a=h;break;case"type":r=h;break;case"checked":l=h;break;case"defaultChecked":c=h;break;case"value":s=h;break;case"defaultValue":o=h;break;case"children":case"dangerouslySetInnerHTML":if(h!=null)throw Error(ce(137,e));break;default:Ut(t,e,i,h,n,null)}}B_(t,s,o,l,c,r,a,!1);return;case"select":at("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Ut(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?Yr(t,!!i,e,!1):n!=null&&Yr(t,!!i,n,!0);return;case"textarea":at("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(ce(91));break;default:Ut(t,e,r,o,n,null)}H_(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Ut(t,e,l,i,n,null)}return;case"dialog":at("beforetoggle",t),at("toggle",t),at("cancel",t),at("close",t);break;case"iframe":case"object":at("load",t);break;case"video":case"audio":for(i=0;i<Cl.length;i++)at(Cl[i],t);break;case"image":at("error",t),at("load",t);break;case"details":at("toggle",t);break;case"embed":case"source":case"link":at("error",t),at("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(ce(137,e));default:Ut(t,e,c,i,n,null)}return;default:if($p(e)){for(h in n)n.hasOwnProperty(h)&&(i=n[h],i!==void 0&&Ph(t,e,h,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Ut(t,e,o,i,n,null))}function yE(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,h=null;for(p in n){var f=n[p];if(n.hasOwnProperty(p)&&f!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=f;default:i.hasOwnProperty(p)||Ut(t,e,p,null,i,f)}}for(var u in i){var p=i[u];if(f=n[u],i.hasOwnProperty(u)&&(p!=null||f!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":h=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(ce(137,e));break;default:p!==f&&Ut(t,e,u,p,i,f)}}rh(t,r,o,l,c,h,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||Ut(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Ut(t,e,a,s,i,l)}e=o,n=r,i=p,u!=null?Yr(t,!!n,u,!1):!!i!=!!n&&(e!=null?Yr(t,!!n,e,!0):Yr(t,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Ut(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(ce(91));break;default:a!==s&&Ut(t,e,r,a,i,s)}F_(t,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:Ut(t,e,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Ut(t,e,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var b in n)u=n[b],n.hasOwnProperty(b)&&u!=null&&!i.hasOwnProperty(b)&&Ut(t,e,b,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(ce(137,e));break;default:Ut(t,e,c,u,i,p)}return;default:if($p(e)){for(var v in n)u=n[v],n.hasOwnProperty(v)&&u!==void 0&&!i.hasOwnProperty(v)&&Ph(t,e,v,void 0,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u===void 0&&p===void 0||Ph(t,e,h,u,i,p);return}}for(var d in n)u=n[d],n.hasOwnProperty(d)&&u!=null&&!i.hasOwnProperty(d)&&Ut(t,e,d,null,i,u);for(f in i)u=i[f],p=n[f],!i.hasOwnProperty(f)||u===p||u==null&&p==null||Ut(t,e,f,u,i,p)}function M0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function ME(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&M0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var h=l.transferSize,f=l.initiatorType;h&&M0(f)&&(l=l.responseEnd,r+=h*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var zh=null,Ih=null;function Gu(t){return t.nodeType===9?t:t.ownerDocument}function b0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function jS(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Bh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var cd=null;function bE(){var t=window.event;return t&&t.type==="popstate"?t===cd?!1:(cd=t,!0):(cd=null,!1)}var WS=typeof setTimeout=="function"?setTimeout:void 0,EE=typeof clearTimeout=="function"?clearTimeout:void 0,E0=typeof Promise=="function"?Promise:void 0,TE=typeof queueMicrotask=="function"?queueMicrotask:typeof E0<"u"?function(t){return E0.resolve(null).then(t).catch(AE)}:WS;function AE(t){setTimeout(function(){throw t})}function bs(t){return t==="head"}function T0(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),ho(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")vl(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,vl(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[Gl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&vl(t.ownerDocument.body);n=a}while(n);ho(e)}function A0(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Fh(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Fh(n),Qp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function wE(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[Gl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ai(t.nextSibling),t===null)break}return null}function CE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ai(t.nextSibling),t===null))return null;return t}function qS(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ai(t.nextSibling),t===null))return null;return t}function Hh(t){return t.data==="$?"||t.data==="$~"}function Gh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function RE(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Ai(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Vh=null;function w0(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ai(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function C0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function YS(t,e,n){switch(e=Gu(n),t){case"html":if(t=e.documentElement,!t)throw Error(ce(452));return t;case"head":if(t=e.head,!t)throw Error(ce(453));return t;case"body":if(t=e.body,!t)throw Error(ce(454));return t;default:throw Error(ce(451))}}function vl(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Qp(t)}var Ci=new Map,R0=new Set;function Vu(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Fa=vt.d;vt.d={f:NE,r:DE,D:UE,C:LE,L:OE,m:PE,X:IE,S:zE,M:BE};function NE(){var t=Fa.f(),e=_f();return t||e}function DE(t){var e=yo(t);e!==null&&e.tag===5&&e.type==="form"?Gx(e):Fa.r(t)}var To=typeof document>"u"?null:document;function ZS(t,e,n){var i=To;if(i&&typeof e=="string"&&e){var a=Si(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),R0.has(a)||(R0.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),En(e,"link",t),mn(e),i.head.appendChild(e)))}}function UE(t){Fa.D(t),ZS("dns-prefetch",t,null)}function LE(t,e){Fa.C(t,e),ZS("preconnect",t,e)}function OE(t,e,n){Fa.L(t,e,n);var i=To;if(i&&t&&e){var a='link[rel="preload"][as="'+Si(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Si(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Si(n.imageSizes)+'"]')):a+='[href="'+Si(t)+'"]';var s=a;switch(e){case"style":s=fo(t);break;case"script":s=Ao(t)}Ci.has(s)||(t=Xt({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Ci.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(ql(s))||e==="script"&&i.querySelector(Yl(s))||(e=i.createElement("link"),En(e,"link",t),mn(e),i.head.appendChild(e)))}}function PE(t,e){Fa.m(t,e);var n=To;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Si(i)+'"][href="'+Si(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Ao(t)}if(!Ci.has(s)&&(t=Xt({rel:"modulepreload",href:t},e),Ci.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Yl(s)))return}i=n.createElement("link"),En(i,"link",t),mn(i),n.head.appendChild(i)}}}function zE(t,e,n){Fa.S(t,e,n);var i=To;if(i&&t){var a=qr(i).hoistableStyles,s=fo(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(ql(s)))o.loading=5;else{t=Xt({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Ci.get(s))&&zm(t,n);var l=r=i.createElement("link");mn(l),En(l,"link",t),l._p=new Promise(function(c,h){l.onload=c,l.onerror=h}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,au(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function IE(t,e){Fa.X(t,e);var n=To;if(n&&t){var i=qr(n).hoistableScripts,a=Ao(t),s=i.get(a);s||(s=n.querySelector(Yl(a)),s||(t=Xt({src:t,async:!0},e),(e=Ci.get(a))&&Im(t,e),s=n.createElement("script"),mn(s),En(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function BE(t,e){Fa.M(t,e);var n=To;if(n&&t){var i=qr(n).hoistableScripts,a=Ao(t),s=i.get(a);s||(s=n.querySelector(Yl(a)),s||(t=Xt({src:t,async:!0,type:"module"},e),(e=Ci.get(a))&&Im(t,e),s=n.createElement("script"),mn(s),En(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function N0(t,e,n,i){var a=(a=ls.current)?Vu(a):null;if(!a)throw Error(ce(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=fo(n.href),n=qr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=fo(n.href);var s=qr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(ql(t)))&&!s._p&&(r.instance=s,r.state.loading=5),Ci.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Ci.set(t,n),s||FE(a,t,n,r.state))),e&&i===null)throw Error(ce(528,""));return r}if(e&&i!==null)throw Error(ce(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Ao(n),n=qr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(ce(444,t))}}function fo(t){return'href="'+Si(t)+'"'}function ql(t){return'link[rel="stylesheet"]['+t+"]"}function KS(t){return Xt({},t,{"data-precedence":t.precedence,precedence:null})}function FE(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),En(e,"link",n),mn(e),t.head.appendChild(e))}function Ao(t){return'[src="'+Si(t)+'"]'}function Yl(t){return"script[async]"+t}function D0(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Si(n.href)+'"]');if(i)return e.instance=i,mn(i),i;var a=Xt({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),mn(i),En(i,"style",a),au(i,n.precedence,t),e.instance=i;case"stylesheet":a=fo(n.href);var s=t.querySelector(ql(a));if(s)return e.state.loading|=4,e.instance=s,mn(s),s;i=KS(n),(a=Ci.get(a))&&zm(i,a),s=(t.ownerDocument||t).createElement("link"),mn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),En(s,"link",i),e.state.loading|=4,au(s,n.precedence,t),e.instance=s;case"script":return s=Ao(n.src),(a=t.querySelector(Yl(s)))?(e.instance=a,mn(a),a):(i=n,(a=Ci.get(s))&&(i=Xt({},n),Im(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),mn(a),En(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(ce(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,au(i,n.precedence,t));return e.instance}function au(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function zm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Im(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var su=null;function U0(t,e,n){if(su===null){var i=new Map,a=su=new Map;a.set(n,i)}else a=su,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[Gl]||s[xn]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function L0(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function HE(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function QS(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function GE(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=fo(i.href),s=e.querySelector(ql(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=ku.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,mn(s);return}s=e.ownerDocument||e,i=KS(i),(a=Ci.get(a))&&zm(i,a),s=s.createElement("link"),mn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),En(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=ku.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var ud=0;function VE(t,e){return t.stylesheets&&t.count===0&&ru(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&ru(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&ud===0&&(ud=62500*ME());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&ru(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>ud?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function ku(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ru(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Xu=null;function ru(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Xu=new Map,e.forEach(kE,t),Xu=null,ku.call(t))}function kE(t,e){if(!(e.state.loading&4)){var n=Xu.get(t);if(n)var i=n.get(null);else{n=new Map,Xu.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=ku.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Nl={$$typeof:ba,Provider:null,Consumer:null,_currentValue:Hs,_currentValue2:Hs,_threadCount:0};function XE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Lf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Lf(0),this.hiddenUpdates=Lf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function $S(t,e,n,i,a,s,r,o,l,c,h,f){return t=new XE(t,e,n,r,l,c,h,f,o),e=1,s===!0&&(e|=24),s=ti(3,null,null,e),t.current=s,s.stateNode=t,e=cm(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},dm(s),t}function JS(t){return t?(t=Hr,t):Hr}function ey(t,e,n,i,a,s){a=JS(a),i.context===null?i.context=a:i.pendingContext=a,i=us(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=fs(t,i,e),n!==null&&(qn(n,t,e),cl(n,t,e))}function O0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Bm(t,e){O0(t,e),(t=t.alternate)&&O0(t,e)}function ty(t){if(t.tag===13||t.tag===31){var e=ar(t,67108864);e!==null&&qn(e,t,67108864),Bm(t,67108864)}}function P0(t){if(t.tag===13||t.tag===31){var e=ri();e=Zp(e);var n=ar(t,e);n!==null&&qn(n,t,e),Bm(t,e)}}var ju=!0;function jE(t,e,n,i){var a=He.T;He.T=null;var s=vt.p;try{vt.p=2,Fm(t,e,n,i)}finally{vt.p=s,He.T=a}}function WE(t,e,n,i){var a=He.T;He.T=null;var s=vt.p;try{vt.p=8,Fm(t,e,n,i)}finally{vt.p=s,He.T=a}}function Fm(t,e,n,i){if(ju){var a=kh(i);if(a===null)ld(t,e,i,Wu,n),z0(t,i);else if(YE(a,t,e,n,i))i.stopPropagation();else if(z0(t,i),e&4&&-1<qE.indexOf(t)){for(;a!==null;){var s=yo(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Us(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-si(r);o.entanglements[1]|=l,r&=~l}ia(s),!(gt&6)&&(Pu=ii()+500,Wl(0))}}break;case 31:case 13:o=ar(s,2),o!==null&&qn(o,s,2),_f(),Bm(s,2)}if(s=kh(i),s===null&&ld(t,e,i,Wu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else ld(t,e,i,null,n)}}function kh(t){return t=Jp(t),Hm(t)}var Wu=null;function Hm(t){if(Wu=null,t=Or(t),t!==null){var e=Il(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=y_(e),t!==null)return t;t=null}else if(n===31){if(t=M_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Wu=t,null}function ny(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(UM()){case A_:return 2;case w_:return 8;case yu:case LM:return 32;case C_:return 268435456;default:return 32}default:return 32}}var Xh=!1,ps=null,ms=null,gs=null,Dl=new Map,Ul=new Map,Ja=[],qE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function z0(t,e){switch(t){case"focusin":case"focusout":ps=null;break;case"dragenter":case"dragleave":ms=null;break;case"mouseover":case"mouseout":gs=null;break;case"pointerover":case"pointerout":Dl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ul.delete(e.pointerId)}}function Fo(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=yo(e),e!==null&&ty(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function YE(t,e,n,i,a){switch(e){case"focusin":return ps=Fo(ps,t,e,n,i,a),!0;case"dragenter":return ms=Fo(ms,t,e,n,i,a),!0;case"mouseover":return gs=Fo(gs,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return Dl.set(s,Fo(Dl.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ul.set(s,Fo(Ul.get(s)||null,t,e,n,i,a)),!0}return!1}function iy(t){var e=Or(t.target);if(e!==null){var n=Il(e);if(n!==null){if(e=n.tag,e===13){if(e=y_(n),e!==null){t.blockedOn=e,Sg(t.priority,function(){P0(n)});return}}else if(e===31){if(e=M_(n),e!==null){t.blockedOn=e,Sg(t.priority,function(){P0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function ou(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=kh(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);lh=i,n.target.dispatchEvent(i),lh=null}else return e=yo(n),e!==null&&ty(e),t.blockedOn=n,!1;e.shift()}return!0}function I0(t,e,n){ou(t)&&n.delete(e)}function ZE(){Xh=!1,ps!==null&&ou(ps)&&(ps=null),ms!==null&&ou(ms)&&(ms=null),gs!==null&&ou(gs)&&(gs=null),Dl.forEach(I0),Ul.forEach(I0)}function dc(t,e){t.blockedOn===e&&(t.blockedOn=null,Xh||(Xh=!0,ln.unstable_scheduleCallback(ln.unstable_NormalPriority,ZE)))}var hc=null;function B0(t){hc!==t&&(hc=t,ln.unstable_scheduleCallback(ln.unstable_NormalPriority,function(){hc===t&&(hc=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(Hm(i||n)===null)continue;break}var s=yo(n);s!==null&&(t.splice(e,3),e-=3,Eh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function ho(t){function e(l){return dc(l,t)}ps!==null&&dc(ps,t),ms!==null&&dc(ms,t),gs!==null&&dc(gs,t),Dl.forEach(e),Ul.forEach(e);for(var n=0;n<Ja.length;n++){var i=Ja[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<Ja.length&&(n=Ja[0],n.blockedOn===null);)iy(n),n.blockedOn===null&&Ja.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[Zn]||null;if(typeof s=="function")r||B0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[Zn]||null)o=r.formAction;else if(Hm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),B0(n)}}}function ay(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Gm(t){this._internalRoot=t}yf.prototype.render=Gm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ce(409));var n=e.current,i=ri();ey(n,i,t,e,null,null)};yf.prototype.unmount=Gm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;ey(t.current,2,null,t,null,null),_f(),e[So]=null}};function yf(t){this._internalRoot=t}yf.prototype.unstable_scheduleHydration=function(t){if(t){var e=L_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ja.length&&e!==0&&e<Ja[n].priority;n++);Ja.splice(n,0,t),n===0&&iy(t)}};var F0=x_.version;if(F0!=="19.2.8")throw Error(ce(527,F0,"19.2.8"));vt.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ce(188)):(t=Object.keys(t).join(","),Error(ce(268,t)));return t=TM(e),t=t!==null?b_(t):null,t=t===null?null:t.stateNode,t};var KE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:He,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var pc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!pc.isDisabled&&pc.supportsFiber)try{Bl=pc.inject(KE),ai=pc}catch{}}af.createRoot=function(t,e){if(!S_(t))throw Error(ce(299));var n=!1,i="",a=Zx,s=Kx,r=Qx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=$S(t,1,!1,null,null,n,i,null,a,s,r,ay),t[So]=e.current,Pm(t),new Gm(e)};af.hydrateRoot=function(t,e,n){if(!S_(t))throw Error(ce(299));var i=!1,a="",s=Zx,r=Kx,o=Qx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=$S(t,1,!0,e,n??null,i,a,l,s,r,o,ay),e.context=JS(null),n=e.current,i=ri(),i=Zp(i),a=us(i),a.callback=null,fs(n,a,i),n=i,e.current.lanes=n,Hl(e,n),ia(e),t[So]=e.current,Pm(t),new yf(e)};af.version="19.2.8";function sy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sy)}catch(t){console.error(t)}}sy(),h_.exports=af;var QE=h_.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Vm="185",$E=0,H0=1,JE=2,lu=1,eT=2,tl=3,ys=0,Yn=1,Ma=2,Na=0,js=1,Xr=2,G0=3,V0=4,tT=5,zs=100,nT=101,iT=102,aT=103,sT=104,rT=200,oT=201,lT=202,cT=203,jh=204,Wh=205,uT=206,fT=207,dT=208,hT=209,pT=210,mT=211,gT=212,vT=213,_T=214,qh=0,Yh=1,Zh=2,po=3,Kh=4,Qh=5,$h=6,Jh=7,ry=0,xT=1,ST=2,Ji=0,oy=1,ly=2,cy=3,uy=4,fy=5,dy=6,hy=7,py=300,Qs=301,mo=302,fd=303,dd=304,Mf=306,ep=1e3,Aa=1001,tp=1002,Mn=1003,yT=1004,mc=1005,wn=1006,hd=1007,Bs=1008,bi=1009,my=1010,gy=1011,Ll=1012,km=1013,ta=1014,zi=1015,Ia=1016,Xm=1017,jm=1018,Ol=1020,vy=35902,_y=35899,xy=1021,Sy=1022,Ii=1023,Ba=1026,Fs=1027,Wm=1028,qm=1029,$s=1030,Ym=1031,Zm=1033,cu=33776,uu=33777,fu=33778,du=33779,np=35840,ip=35841,ap=35842,sp=35843,rp=36196,op=37492,lp=37496,cp=37488,up=37489,qu=37490,fp=37491,dp=37808,hp=37809,pp=37810,mp=37811,gp=37812,vp=37813,_p=37814,xp=37815,Sp=37816,yp=37817,Mp=37818,bp=37819,Ep=37820,Tp=37821,Ap=36492,wp=36494,Cp=36495,Rp=36283,Np=36284,Yu=36285,Dp=36286,MT=3200,k0=0,bT=1,es="",mi="srgb",Zu="srgb-linear",Ku="linear",Tt="srgb",dr=7680,X0=519,ET=512,TT=513,AT=514,Km=515,wT=516,CT=517,Qm=518,RT=519,j0=35044,W0="300 es",Qi=2e3,Qu=2001;function NT(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function $u(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function DT(){const t=$u("canvas");return t.style.display="block",t}const q0={};function Y0(...t){const e="THREE."+t.shift();console.log(e,...t)}function yy(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Fe(...t){t=yy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function ht(...t){t=yy(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function eo(...t){const e=t.join(" ");e in q0||(q0[e]=!0,Fe(...t))}function UT(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const LT={[qh]:Yh,[Zh]:$h,[Kh]:Jh,[po]:Qh,[Yh]:qh,[$h]:Zh,[Jh]:Kh,[Qh]:po};class rr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hu=Math.PI/180,Up=180/Math.PI;function Zl(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Tn[t&255]+Tn[t>>8&255]+Tn[t>>16&255]+Tn[t>>24&255]+"-"+Tn[e&255]+Tn[e>>8&255]+"-"+Tn[e>>16&15|64]+Tn[e>>24&255]+"-"+Tn[n&63|128]+Tn[n>>8&255]+"-"+Tn[n>>16&255]+Tn[n>>24&255]+Tn[i&255]+Tn[i>>8&255]+Tn[i>>16&255]+Tn[i>>24&255]).toLowerCase()}function ut(t,e,n){return Math.max(e,Math.min(n,t))}function OT(t,e){return(t%e+e)%e}function pd(t,e,n){return(1-n)*t+n*e}function Ho(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Xn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const ig=class ig{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=ut(this.x,e.x,n.x),this.y=ut(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=ut(this.x,e,n),this.y=ut(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};ig.prototype.isVector2=!0;let _t=ig;class wo{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],h=i[a+2],f=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],b=s[r+3];if(f!==b||l!==u||c!==p||h!==g){let v=l*u+c*p+h*g+f*b;v<0&&(u=-u,p=-p,g=-g,b=-b,v=-v);let d=1-o;if(v<.9995){const x=Math.acos(v),M=Math.sin(x);d=Math.sin(d*x)/M,o=Math.sin(o*x)/M,l=l*d+u*o,c=c*d+p*o,h=h*d+g*o,f=f*d+b*o}else{l=l*d+u*o,c=c*d+p*o,h=h*d+g*o,f=f*d+b*o;const x=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=x,c*=x,h*=x,f*=x}}e[n]=l,e[n+1]=c,e[n+2]=h,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],h=i[a+3],f=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return e[n]=o*g+h*f+l*p-c*u,e[n+1]=l*g+h*u+c*f-o*p,e[n+2]=c*g+h*p+o*u-l*f,e[n+3]=h*g-o*f-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(a/2),f=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"YZX":this._x=u*h*f+c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f-u*p*g;break;case"XZY":this._x=u*h*f-c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f+u*p*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],h=n[6],f=n[10],u=i+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>f){const p=2*Math.sqrt(1+i-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-i-f);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+f-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ut(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,h=n._w;return this._x=i*h+r*o+a*c-s*l,this._y=a*h+r*l+s*o-i*c,this._z=s*h+r*c+i*l-a*o,this._w=r*h-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,n=Math.sin(n*c)/h,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const ag=class ag{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Z0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Z0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),h=2*(o*n-s*a),f=2*(s*i-r*n);return this.x=n+l*c+r*f-o*h,this.y=i+l*h+o*c-s*f,this.z=a+l*f+s*h-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=ut(this.x,e.x,n.x),this.y=ut(this.y,e.y,n.y),this.z=ut(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=ut(this.x,e,n),this.y=ut(this.y,e,n),this.z=ut(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return md.copy(this).projectOnVector(e),this.sub(md)}reflect(e){return this.sub(md.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};ag.prototype.isVector3=!0;let q=ag;const md=new q,Z0=new wo,sg=class sg{constructor(e,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const h=this.elements;return h[0]=e,h[1]=a,h[2]=o,h[3]=n,h[4]=s,h[5]=l,h[6]=i,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],h=i[4],f=i[7],u=i[2],p=i[5],g=i[8],b=a[0],v=a[3],d=a[6],x=a[1],M=a[4],_=a[7],w=a[2],N=a[5],T=a[8];return s[0]=r*b+o*x+l*w,s[3]=r*v+o*M+l*N,s[6]=r*d+o*_+l*T,s[1]=c*b+h*x+f*w,s[4]=c*v+h*M+f*N,s[7]=c*d+h*_+f*T,s[2]=u*b+p*x+g*w,s[5]=u*v+p*M+g*N,s[8]=u*d+p*_+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return n*r*h-n*o*c-i*s*h+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*r-o*c,u=o*l-h*s,p=c*s-r*l,g=n*f+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const b=1/g;return e[0]=f*b,e[1]=(a*c-h*i)*b,e[2]=(o*i-a*r)*b,e[3]=u*b,e[4]=(h*n-a*l)*b,e[5]=(a*s-o*n)*b,e[6]=p*b,e[7]=(i*l-c*n)*b,e[8]=(r*n-i*s)*b,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return eo("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gd.makeScale(e,n)),this}rotate(e){return eo("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gd.makeRotation(-e)),this}translate(e,n){return eo("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};sg.prototype.isMatrix3=!0;let We=sg;const gd=new We,K0=new We().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Q0=new We().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function PT(){const t={enabled:!0,workingColorSpace:Zu,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Tt&&(a.r=Da(a.r),a.g=Da(a.g),a.b=Da(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Tt&&(a.r=to(a.r),a.g=to(a.g),a.b=to(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===es?Ku:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return eo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return eo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Zu]:{primaries:e,whitePoint:i,transfer:Ku,toXYZ:K0,fromXYZ:Q0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:mi},outputColorSpaceConfig:{drawingBufferColorSpace:mi}},[mi]:{primaries:e,whitePoint:i,transfer:Tt,toXYZ:K0,fromXYZ:Q0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:mi}}}),t}const ct=PT();function Da(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function to(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let hr;class zT{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{hr===void 0&&(hr=$u("canvas")),hr.width=e.width,hr.height=e.height;const a=hr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=hr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=$u("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Da(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Da(n[i]/255)*255):n[i]=Da(n[i]);return{data:n,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let IT=0;class $m{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:IT++}),this.uuid=Zl(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(vd(a[r].image)):s.push(vd(a[r]))}else s=vd(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function vd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?zT.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let BT=0;const _d=new q;class In extends rr{constructor(e=In.DEFAULT_IMAGE,n=In.DEFAULT_MAPPING,i=Aa,a=Aa,s=wn,r=Bs,o=Ii,l=bi,c=In.DEFAULT_ANISOTROPY,h=es){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:BT++}),this.uuid=Zl(),this.name="",this.source=new $m(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new _t(0,0),this.repeat=new _t(1,1),this.center=new _t(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_d).x}get height(){return this.source.getSize(_d).y}get depth(){return this.source.getSize(_d).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Fe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Fe(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==py)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ep:e.x=e.x-Math.floor(e.x);break;case Aa:e.x=e.x<0?0:1;break;case tp:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ep:e.y=e.y-Math.floor(e.y);break;case Aa:e.y=e.y<0?0:1;break;case tp:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}In.DEFAULT_IMAGE=null;In.DEFAULT_MAPPING=py;In.DEFAULT_ANISOTROPY=1;const rg=class rg{constructor(e=0,n=0,i=0,a=1){this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],h=l[4],f=l[8],u=l[1],p=l[5],g=l[9],b=l[2],v=l[6],d=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-b)<.01&&Math.abs(g-v)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+b)<.1&&Math.abs(g+v)<.1&&Math.abs(c+p+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,_=(p+1)/2,w=(d+1)/2,N=(h+u)/4,T=(f+b)/4,y=(g+v)/4;return M>_&&M>w?M<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(M),a=N/i,s=T/i):_>w?_<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(_),i=N/a,s=y/a):w<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(w),i=T/s,a=y/s),this.set(i,a,s,n),this}let x=Math.sqrt((v-g)*(v-g)+(f-b)*(f-b)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(v-g)/x,this.y=(f-b)/x,this.z=(u-h)/x,this.w=Math.acos((c+p+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=ut(this.x,e.x,n.x),this.y=ut(this.y,e.y,n.y),this.z=ut(this.z,e.z,n.z),this.w=ut(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=ut(this.x,e,n),this.y=ut(this.y,e,n),this.z=ut(this.z,e,n),this.w=ut(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rg.prototype.isVector4=!0;let Zt=rg;class FT extends rr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:wn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Zt(0,0,e,n),this.scissorTest=!1,this.viewport=new Zt(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new In(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:wn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new $m(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ea extends FT{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class My extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class HT extends In{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=Mn,this.minFilter=Mn,this.wrapR=Aa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const tf=class tf{constructor(e,n,i,a,s,r,o,l,c,h,f,u,p,g,b,v){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,h,f,u,p,g,b,v)}set(e,n,i,a,s,r,o,l,c,h,f,u,p,g,b,v){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=a,d[1]=s,d[5]=r,d[9]=o,d[13]=l,d[2]=c,d[6]=h,d[10]=f,d[14]=u,d[3]=p,d[7]=g,d[11]=b,d[15]=v,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new tf().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,a=1/pr.setFromMatrixColumn(e,0).length(),s=1/pr.setFromMatrixColumn(e,1).length(),r=1/pr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=r*h,p=r*f,g=o*h,b=o*f;n[0]=l*h,n[4]=-l*f,n[8]=c,n[1]=p+g*c,n[5]=u-b*c,n[9]=-o*l,n[2]=b-u*c,n[6]=g+p*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*h,p=l*f,g=c*h,b=c*f;n[0]=u+b*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*f,n[5]=r*h,n[9]=-o,n[2]=p*o-g,n[6]=b+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*h,p=l*f,g=c*h,b=c*f;n[0]=u-b*o,n[4]=-r*f,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*h,n[9]=b-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*h,p=r*f,g=o*h,b=o*f;n[0]=l*h,n[4]=g*c-p,n[8]=u*c+b,n[1]=l*f,n[5]=b*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*h,n[4]=b-u*f,n[8]=g*f+p,n[1]=f,n[5]=r*h,n[9]=-o*h,n[2]=-c*h,n[6]=p*f+g,n[10]=u-b*f}else if(e.order==="XZY"){const u=r*l,p=r*c,g=o*l,b=o*c;n[0]=l*h,n[4]=-f,n[8]=c*h,n[1]=u*f+b,n[5]=r*h,n[9]=p*f-g,n[2]=g*f-p,n[6]=o*h,n[10]=b*f+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(GT,e,VT)}lookAt(e,n,i){const a=this.elements;return Qn.subVectors(e,n),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Va.crossVectors(i,Qn),Va.lengthSq()===0&&(Math.abs(i.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Va.crossVectors(i,Qn)),Va.normalize(),gc.crossVectors(Qn,Va),a[0]=Va.x,a[4]=gc.x,a[8]=Qn.x,a[1]=Va.y,a[5]=gc.y,a[9]=Qn.y,a[2]=Va.z,a[6]=gc.z,a[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],h=i[1],f=i[5],u=i[9],p=i[13],g=i[2],b=i[6],v=i[10],d=i[14],x=i[3],M=i[7],_=i[11],w=i[15],N=a[0],T=a[4],y=a[8],R=a[12],C=a[1],L=a[5],z=a[9],G=a[13],P=a[2],I=a[6],B=a[10],A=a[14],U=a[3],V=a[7],se=a[11],le=a[15];return s[0]=r*N+o*C+l*P+c*U,s[4]=r*T+o*L+l*I+c*V,s[8]=r*y+o*z+l*B+c*se,s[12]=r*R+o*G+l*A+c*le,s[1]=h*N+f*C+u*P+p*U,s[5]=h*T+f*L+u*I+p*V,s[9]=h*y+f*z+u*B+p*se,s[13]=h*R+f*G+u*A+p*le,s[2]=g*N+b*C+v*P+d*U,s[6]=g*T+b*L+v*I+d*V,s[10]=g*y+b*z+v*B+d*se,s[14]=g*R+b*G+v*A+d*le,s[3]=x*N+M*C+_*P+w*U,s[7]=x*T+M*L+_*I+w*V,s[11]=x*y+M*z+_*B+w*se,s[15]=x*R+M*G+_*A+w*le,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],h=e[2],f=e[6],u=e[10],p=e[14],g=e[3],b=e[7],v=e[11],d=e[15],x=l*p-c*u,M=o*p-c*f,_=o*u-l*f,w=r*p-c*h,N=r*u-l*h,T=r*f-o*h;return n*(b*x-v*M+d*_)-i*(g*x-v*w+d*N)+a*(g*M-b*w+d*T)-s*(g*_-b*N+v*T)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],h=e[10];return n*(r*h-o*c)-i*(s*h-o*l)+a*(s*c-r*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],u=e[10],p=e[11],g=e[12],b=e[13],v=e[14],d=e[15],x=n*o-i*r,M=n*l-a*r,_=n*c-s*r,w=i*l-a*o,N=i*c-s*o,T=a*c-s*l,y=h*b-f*g,R=h*v-u*g,C=h*d-p*g,L=f*v-u*b,z=f*d-p*b,G=u*d-p*v,P=x*G-M*z+_*L+w*C-N*R+T*y;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/P;return e[0]=(o*G-l*z+c*L)*I,e[1]=(a*z-i*G-s*L)*I,e[2]=(b*T-v*N+d*w)*I,e[3]=(u*N-f*T-p*w)*I,e[4]=(l*C-r*G-c*R)*I,e[5]=(n*G-a*C+s*R)*I,e[6]=(v*_-g*T-d*M)*I,e[7]=(h*T-u*_+p*M)*I,e[8]=(r*z-o*C+c*y)*I,e[9]=(i*C-n*z-s*y)*I,e[10]=(g*N-b*_+d*x)*I,e[11]=(f*_-h*N-p*x)*I,e[12]=(o*R-r*L-l*y)*I,e[13]=(n*L-i*R+a*y)*I,e[14]=(b*M-g*w-v*x)*I,e[15]=(h*w-f*M+u*x)*I,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,h=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,h*o+i,h*l-a*r,0,c*l-a*o,h*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,h=r+r,f=o+o,u=s*c,p=s*h,g=s*f,b=r*h,v=r*f,d=o*f,x=l*c,M=l*h,_=l*f,w=i.x,N=i.y,T=i.z;return a[0]=(1-(b+d))*w,a[1]=(p+_)*w,a[2]=(g-M)*w,a[3]=0,a[4]=(p-_)*N,a[5]=(1-(u+d))*N,a[6]=(v+x)*N,a[7]=0,a[8]=(g+M)*T,a[9]=(v-x)*T,a[10]=(1-(u+b))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=pr.set(a[0],a[1],a[2]).length();const o=pr.set(a[4],a[5],a[6]).length(),l=pr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Ui.copy(this);const c=1/r,h=1/o,f=1/l;return Ui.elements[0]*=c,Ui.elements[1]*=c,Ui.elements[2]*=c,Ui.elements[4]*=h,Ui.elements[5]*=h,Ui.elements[6]*=h,Ui.elements[8]*=f,Ui.elements[9]*=f,Ui.elements[10]*=f,n.setFromRotationMatrix(Ui),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=Qi,l=!1){const c=this.elements,h=2*s/(n-e),f=2*s/(i-a),u=(n+e)/(n-e),p=(i+a)/(i-a);let g,b;if(l)g=s/(r-s),b=r*s/(r-s);else if(o===Qi)g=-(r+s)/(r-s),b=-2*r*s/(r-s);else if(o===Qu)g=-r/(r-s),b=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=Qi,l=!1){const c=this.elements,h=2/(n-e),f=2/(i-a),u=-(n+e)/(n-e),p=-(i+a)/(i-a);let g,b;if(l)g=1/(r-s),b=r/(r-s);else if(o===Qi)g=-2/(r-s),b=-(r+s)/(r-s);else if(o===Qu)g=-1/(r-s),b=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=b,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};tf.prototype.isMatrix4=!0;let Bt=tf;const pr=new q,Ui=new Bt,GT=new q(0,0,0),VT=new q(1,1,1),Va=new q,gc=new q,Qn=new q,$0=new Bt,J0=new wo;class Js{constructor(e=0,n=0,i=0,a=Js.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],h=a[9],f=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-ut(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-ut(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return $0.makeRotationFromQuaternion(e),this.setFromRotationMatrix($0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return J0.setFromEuler(this),this.setFromQuaternion(J0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Js.DEFAULT_ORDER="XYZ";class by{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let kT=0;const ev=new q,mr=new wo,ha=new Bt,vc=new q,Go=new q,XT=new q,jT=new wo,tv=new q(1,0,0),nv=new q(0,1,0),iv=new q(0,0,1),av={type:"added"},WT={type:"removed"},gr={type:"childadded",child:null},xd={type:"childremoved",child:null};class Bn extends rr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kT++}),this.uuid=Zl(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Bn.DEFAULT_UP.clone();const e=new q,n=new Js,i=new wo,a=new q(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new Bt},normalMatrix:{value:new We}}),this.matrix=new Bt,this.matrixWorld=new Bt,this.matrixAutoUpdate=Bn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new by,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return mr.setFromAxisAngle(e,n),this.quaternion.multiply(mr),this}rotateOnWorldAxis(e,n){return mr.setFromAxisAngle(e,n),this.quaternion.premultiply(mr),this}rotateX(e){return this.rotateOnAxis(tv,e)}rotateY(e){return this.rotateOnAxis(nv,e)}rotateZ(e){return this.rotateOnAxis(iv,e)}translateOnAxis(e,n){return ev.copy(e).applyQuaternion(this.quaternion),this.position.add(ev.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(tv,e)}translateY(e){return this.translateOnAxis(nv,e)}translateZ(e){return this.translateOnAxis(iv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ha.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?vc.copy(e):vc.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ha.lookAt(Go,vc,this.up):ha.lookAt(vc,Go,this.up),this.quaternion.setFromRotationMatrix(ha),a&&(ha.extractRotation(a.matrixWorld),mr.setFromRotationMatrix(ha),this.quaternion.premultiply(mr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(ht("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(av),gr.child=e,this.dispatchEvent(gr),gr.child=null):ht("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(WT),xd.child=e,this.dispatchEvent(xd),xd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ha.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ha.multiply(e.parent.matrixWorld)),e.applyMatrix4(ha),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(av),gr.child=e,this.dispatchEvent(gr),gr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,e,XT),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Go,jT,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];s(e.shapes,f)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),h=r(e.images),f=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Bn.DEFAULT_UP=new q(0,1,0);Bn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Bn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class _c extends Bn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const qT={type:"move"};class Sd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new _c,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new _c,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new _c,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const b of e.hand.values()){const v=n.getJointPose(b,i),d=this._getHandJoint(c,b);v!==null&&(d.matrix.fromArray(v.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=v.radius),d.visible=v!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qT)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new _c;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Ey={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ka={h:0,s:0,l:0},xc={h:0,s:0,l:0};function yd(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class rt{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=mi){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=ct.workingColorSpace){return this.r=e,this.g=n,this.b=i,ct.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=ct.workingColorSpace){if(e=OT(e,1),n=ut(n,0,1),i=ut(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=yd(r,s,e+1/3),this.g=yd(r,s,e),this.b=yd(r,s,e-1/3)}return ct.colorSpaceToWorking(this,a),this}setStyle(e,n=mi){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Fe("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=mi){const i=Ey[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Da(e.r),this.g=Da(e.g),this.b=Da(e.b),this}copyLinearToSRGB(e){return this.r=to(e.r),this.g=to(e.g),this.b=to(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=mi){return ct.workingToColorSpace(An.copy(this),e),Math.round(ut(An.r*255,0,255))*65536+Math.round(ut(An.g*255,0,255))*256+Math.round(ut(An.b*255,0,255))}getHexString(e=mi){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=ct.workingColorSpace){ct.workingToColorSpace(An.copy(this),n);const i=An.r,a=An.g,s=An.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const f=r-o;switch(c=h<=.5?f/(r+o):f/(2-r-o),r){case i:l=(a-s)/f+(a<s?6:0);break;case a:l=(s-i)/f+2;break;case s:l=(i-a)/f+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,n=ct.workingColorSpace){return ct.workingToColorSpace(An.copy(this),n),e.r=An.r,e.g=An.g,e.b=An.b,e}getStyle(e=mi){ct.workingToColorSpace(An.copy(this),e);const n=An.r,i=An.g,a=An.b;return e!==mi?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(ka),this.setHSL(ka.h+e,ka.s+n,ka.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ka),e.getHSL(xc);const i=pd(ka.h,xc.h,n),a=pd(ka.s,xc.s,n),s=pd(ka.l,xc.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const An=new rt;rt.NAMES=Ey;class Jm{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new rt(e),this.density=n}clone(){return new Jm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ty extends Bn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Js,this.environmentIntensity=1,this.environmentRotation=new Js,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Li=new q,pa=new q,Md=new q,ma=new q,vr=new q,_r=new q,sv=new q,bd=new q,Ed=new q,Td=new q,Ad=new Zt,wd=new Zt,Cd=new Zt;class Ei{constructor(e=new q,n=new q,i=new q){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Li.subVectors(e,n),a.cross(Li);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Li.subVectors(a,n),pa.subVectors(i,n),Md.subVectors(e,n);const r=Li.dot(Li),o=Li.dot(pa),l=Li.dot(Md),c=pa.dot(pa),h=pa.dot(Md),f=r*c-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,p=(c*l-o*h)*u,g=(r*h-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,ma)===null?!1:ma.x>=0&&ma.y>=0&&ma.x+ma.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,ma)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ma.x),l.addScaledVector(r,ma.y),l.addScaledVector(o,ma.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return Ad.setScalar(0),wd.setScalar(0),Cd.setScalar(0),Ad.fromBufferAttribute(e,n),wd.fromBufferAttribute(e,i),Cd.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Ad,s.x),r.addScaledVector(wd,s.y),r.addScaledVector(Cd,s.z),r}static isFrontFacing(e,n,i,a){return Li.subVectors(i,n),pa.subVectors(e,n),Li.cross(pa).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Li.subVectors(this.c,this.b),pa.subVectors(this.a,this.b),Li.cross(pa).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Ei.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Ei.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;vr.subVectors(a,i),_r.subVectors(s,i),bd.subVectors(e,i);const l=vr.dot(bd),c=_r.dot(bd);if(l<=0&&c<=0)return n.copy(i);Ed.subVectors(e,a);const h=vr.dot(Ed),f=_r.dot(Ed);if(h>=0&&f<=h)return n.copy(a);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),n.copy(i).addScaledVector(vr,r);Td.subVectors(e,s);const p=vr.dot(Td),g=_r.dot(Td);if(g>=0&&p<=g)return n.copy(s);const b=p*c-l*g;if(b<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(_r,o);const v=h*g-p*f;if(v<=0&&f-h>=0&&p-g>=0)return sv.subVectors(s,a),o=(f-h)/(f-h+(p-g)),n.copy(a).addScaledVector(sv,o);const d=1/(v+b+u);return r=b*d,o=u*d,n.copy(i).addScaledVector(vr,r).addScaledVector(_r,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class or{constructor(e=new q(1/0,1/0,1/0),n=new q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Oi.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Oi.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Oi.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Oi):Oi.fromBufferAttribute(s,r),Oi.applyMatrix4(e.matrixWorld),this.expandByPoint(Oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Sc.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sc.copy(i.boundingBox)),Sc.applyMatrix4(e.matrixWorld),this.union(Sc)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Oi),Oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Vo),yc.subVectors(this.max,Vo),xr.subVectors(e.a,Vo),Sr.subVectors(e.b,Vo),yr.subVectors(e.c,Vo),Xa.subVectors(Sr,xr),ja.subVectors(yr,Sr),ws.subVectors(xr,yr);let n=[0,-Xa.z,Xa.y,0,-ja.z,ja.y,0,-ws.z,ws.y,Xa.z,0,-Xa.x,ja.z,0,-ja.x,ws.z,0,-ws.x,-Xa.y,Xa.x,0,-ja.y,ja.x,0,-ws.y,ws.x,0];return!Rd(n,xr,Sr,yr,yc)||(n=[1,0,0,0,1,0,0,0,1],!Rd(n,xr,Sr,yr,yc))?!1:(Mc.crossVectors(Xa,ja),n=[Mc.x,Mc.y,Mc.z],Rd(n,xr,Sr,yr,yc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ga[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ga[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ga[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ga[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ga[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ga[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ga[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ga[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ga),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ga=[new q,new q,new q,new q,new q,new q,new q,new q],Oi=new q,Sc=new or,xr=new q,Sr=new q,yr=new q,Xa=new q,ja=new q,ws=new q,Vo=new q,yc=new q,Mc=new q,Cs=new q;function Rd(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){Cs.fromArray(t,s);const o=a.x*Math.abs(Cs.x)+a.y*Math.abs(Cs.y)+a.z*Math.abs(Cs.z),l=e.dot(Cs),c=n.dot(Cs),h=i.dot(Cs);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const tn=new q,bc=new _t;let YT=0;class Mt extends rr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:YT++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=j0,this.updateRanges=[],this.gpuType=zi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)bc.fromBufferAttribute(this,n),bc.applyMatrix3(e),this.setXY(n,bc.x,bc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix3(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyMatrix4(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.applyNormalMatrix(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)tn.fromBufferAttribute(this,n),tn.transformDirection(e),this.setXYZ(n,tn.x,tn.y,tn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Ho(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=Xn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Ho(n,this.array)),n}setX(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Ho(n,this.array)),n}setY(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Ho(n,this.array)),n}setZ(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Ho(n,this.array)),n}setW(e,n){return this.normalized&&(n=Xn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array),a=Xn(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=Xn(n,this.array),i=Xn(i,this.array),a=Xn(a,this.array),s=Xn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==j0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ay extends Mt{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class wy extends Mt{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class wi extends Mt{constructor(e,n,i){super(new Float32Array(e),n,i)}}const ZT=new or,ko=new q,Nd=new q;class lr{constructor(e=new q,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):ZT.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ko.subVectors(e,this.center);const n=ko.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(ko,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ko.copy(e.center).add(Nd)),this.expandByPoint(ko.copy(e.center).sub(Nd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let KT=0;const hi=new Bt,Dd=new Bn,Mr=new q,$n=new or,Xo=new or,hn=new q;class Cn extends rr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:KT++}),this.uuid=Zl(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(NT(e)?wy:Ay)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new We().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return hi.makeRotationFromQuaternion(e),this.applyMatrix4(hi),this}rotateX(e){return hi.makeRotationX(e),this.applyMatrix4(hi),this}rotateY(e){return hi.makeRotationY(e),this.applyMatrix4(hi),this}rotateZ(e){return hi.makeRotationZ(e),this.applyMatrix4(hi),this}translate(e,n,i){return hi.makeTranslation(e,n,i),this.applyMatrix4(hi),this}scale(e,n,i){return hi.makeScale(e,n,i),this.applyMatrix4(hi),this}lookAt(e){return Dd.lookAt(e),Dd.updateMatrix(),this.applyMatrix4(Dd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Mr).negate(),this.translate(Mr.x,Mr.y,Mr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new wi(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new or);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new q(-1/0,-1/0,-1/0),new q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];$n.setFromBufferAttribute(s),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ht('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new lr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ht("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new q,1/0);return}if(e){const i=this.boundingSphere.center;if($n.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Xo.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors($n.min,Xo.min),$n.expandByPoint(hn),hn.addVectors($n.max,Xo.max),$n.expandByPoint(hn)):($n.expandByPoint(Xo.min),$n.expandByPoint(Xo.max))}$n.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)hn.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(hn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)hn.fromBufferAttribute(o,c),l&&(Mr.fromBufferAttribute(e,c),hn.add(Mr)),a=Math.max(a,i.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&ht('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){ht("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Mt(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new q,l[y]=new q;const c=new q,h=new q,f=new q,u=new _t,p=new _t,g=new _t,b=new q,v=new q;function d(y,R,C){c.fromBufferAttribute(i,y),h.fromBufferAttribute(i,R),f.fromBufferAttribute(i,C),u.fromBufferAttribute(s,y),p.fromBufferAttribute(s,R),g.fromBufferAttribute(s,C),h.sub(c),f.sub(c),p.sub(u),g.sub(u);const L=1/(p.x*g.y-g.x*p.y);isFinite(L)&&(b.copy(h).multiplyScalar(g.y).addScaledVector(f,-p.y).multiplyScalar(L),v.copy(f).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(L),o[y].add(b),o[R].add(b),o[C].add(b),l[y].add(v),l[R].add(v),l[C].add(v))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let y=0,R=x.length;y<R;++y){const C=x[y],L=C.start,z=C.count;for(let G=L,P=L+z;G<P;G+=3)d(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new q,_=new q,w=new q,N=new q;function T(y){w.fromBufferAttribute(a,y),N.copy(w);const R=o[y];M.copy(R),M.sub(w.multiplyScalar(w.dot(R))).normalize(),_.crossVectors(N,R);const L=_.dot(l[y])<0?-1:1;r.setXYZW(y,M.x,M.y,M.z,L)}for(let y=0,R=x.length;y<R;++y){const C=x[y],L=C.start,z=C.count;for(let G=L,P=L+z;G<P;G+=3)T(e.getX(G+0)),T(e.getX(G+1)),T(e.getX(G+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Mt(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new q,s=new q,r=new q,o=new q,l=new q,c=new q,h=new q,f=new q;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),b=e.getX(u+1),v=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,b),r.fromBufferAttribute(n,v),h.subVectors(r,s),f.subVectors(a,s),h.cross(f),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,b),c.fromBufferAttribute(i,v),o.add(h),l.add(h),c.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(b,l.x,l.y,l.z),i.setXYZ(v,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),h.subVectors(r,s),f.subVectors(a,s),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)hn.fromBufferAttribute(e,n),hn.normalize(),e.setXYZ(n,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let b=0,v=l.length;b<v;b++){o.isInterleavedBufferAttribute?p=l[b]*o.data.stride+o.offset:p=l[b]*h;for(let d=0;d<h;d++)u[g++]=c[p++]}return new Mt(u,h,f)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Cn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],p=e(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];h.push(p.toJSON(e.data))}h.length>0&&(a[l]=h,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const h=a[c];this.setAttribute(c,h.clone(n))}const s=e.morphAttributes;for(const c in s){const h=[],f=s[c];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(n));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,h=r.length;c<h;c++){const f=r[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let QT=0;class Co extends rr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:QT++}),this.uuid=Zl(),this.name="",this.type="Material",this.blending=js,this.side=ys,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=jh,this.blendDst=Wh,this.blendEquation=zs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=po,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=X0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=dr,this.stencilZFail=dr,this.stencilZPass=dr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Fe(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){Fe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==js&&(i.blending=this.blending),this.side!==ys&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==jh&&(i.blendSrc=this.blendSrc),this.blendDst!==Wh&&(i.blendDst=this.blendDst),this.blendEquation!==zs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==po&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==X0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==dr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==dr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==dr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new rt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new _t().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new _t().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const va=new q,Ud=new q,Ec=new q,Wa=new q,Ld=new q,Tc=new q,Od=new q;class eg{constructor(e=new q,n=new q(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,va)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=va.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(va.copy(this.origin).addScaledVector(this.direction,n),va.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){Ud.copy(e).add(n).multiplyScalar(.5),Ec.copy(n).sub(e).normalize(),Wa.copy(this.origin).sub(Ud);const s=e.distanceTo(n)*.5,r=-this.direction.dot(Ec),o=Wa.dot(this.direction),l=-Wa.dot(Ec),c=Wa.lengthSq(),h=Math.abs(1-r*r);let f,u,p,g;if(h>0)if(f=r*l-o,u=r*o-l,g=s*h,f>=0)if(u>=-g)if(u<=g){const b=1/h;f*=b,u*=b,p=f*(f+r*u+2*o)+u*(r*f+u+2*l)+c}else u=s,f=Math.max(0,-(r*u+o)),p=-f*f+u*(u+2*l)+c;else u=-s,f=Math.max(0,-(r*u+o)),p=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-r*s+o)),u=f>0?-s:Math.min(Math.max(-s,-l),s),p=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(f=Math.max(0,-(r*s+o)),u=f>0?s:Math.min(Math.max(-s,-l),s),p=-f*f+u*(u+2*l)+c);else u=r>0?-s:s,f=Math.max(0,-(r*u+o)),p=-f*f+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,f),a&&a.copy(Ud).addScaledVector(Ec,u),p}intersectSphere(e,n){va.subVectors(e.center,this.origin);const i=va.dot(this.direction),a=va.dot(va)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),h>=0?(s=(e.min.y-u.y)*h,r=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,r=(e.min.y-u.y)*h),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),f>=0?(o=(e.min.z-u.z)*f,l=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,l=(e.min.z-u.z)*f),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,va)!==null}intersectTriangle(e,n,i,a,s){Ld.subVectors(n,e),Tc.subVectors(i,e),Od.crossVectors(Ld,Tc);let r=this.direction.dot(Od),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Wa.subVectors(this.origin,e);const l=o*this.direction.dot(Tc.crossVectors(Wa,Tc));if(l<0)return null;const c=o*this.direction.dot(Ld.cross(Wa));if(c<0||l+c>r)return null;const h=-o*Wa.dot(Od);return h<0?null:this.at(h/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Cy extends Co{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Js,this.combine=ry,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const rv=new Bt,Rs=new eg,Ac=new lr,ov=new q,wc=new q,Cc=new q,Rc=new q,Pd=new q,Nc=new q,lv=new q,Dc=new q;class Ri extends Bn{constructor(e=new Cn,n=new Cy){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Nc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],f=s[l];h!==0&&(Pd.fromBufferAttribute(f,e),r?Nc.addScaledVector(Pd,h):Nc.addScaledVector(Pd.sub(n),h))}n.add(Nc)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ac.copy(i.boundingSphere),Ac.applyMatrix4(s),Rs.copy(e.ray).recast(e.near),!(Ac.containsPoint(Rs.origin)===!1&&(Rs.intersectSphere(Ac,ov)===null||Rs.origin.distanceToSquared(ov)>(e.far-e.near)**2))&&(rv.copy(s).invert(),Rs.copy(e.ray).applyMatrix4(rv),!(i.boundingBox!==null&&Rs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Rs)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const v=u[g],d=r[v.materialIndex],x=Math.max(v.start,p.start),M=Math.min(o.count,Math.min(v.start+v.count,p.start+p.count));for(let _=x,w=M;_<w;_+=3){const N=o.getX(_),T=o.getX(_+1),y=o.getX(_+2);a=Uc(this,d,e,i,c,h,f,N,T,y),a&&(a.faceIndex=Math.floor(_/3),a.face.materialIndex=v.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(o.count,p.start+p.count);for(let v=g,d=b;v<d;v+=3){const x=o.getX(v),M=o.getX(v+1),_=o.getX(v+2);a=Uc(this,r,e,i,c,h,f,x,M,_),a&&(a.faceIndex=Math.floor(v/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,b=u.length;g<b;g++){const v=u[g],d=r[v.materialIndex],x=Math.max(v.start,p.start),M=Math.min(l.count,Math.min(v.start+v.count,p.start+p.count));for(let _=x,w=M;_<w;_+=3){const N=_,T=_+1,y=_+2;a=Uc(this,d,e,i,c,h,f,N,T,y),a&&(a.faceIndex=Math.floor(_/3),a.face.materialIndex=v.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),b=Math.min(l.count,p.start+p.count);for(let v=g,d=b;v<d;v+=3){const x=v,M=v+1,_=v+2;a=Uc(this,r,e,i,c,h,f,x,M,_),a&&(a.faceIndex=Math.floor(v/3),n.push(a))}}}}function $T(t,e,n,i,a,s,r,o){let l;if(e.side===Yn?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===ys,o),l===null)return null;Dc.copy(o),Dc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Dc);return c<n.near||c>n.far?null:{distance:c,point:Dc.clone(),object:t}}function Uc(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,wc),t.getVertexPosition(l,Cc),t.getVertexPosition(c,Rc);const h=$T(t,e,n,i,wc,Cc,Rc,lv);if(h){const f=new q;Ei.getBarycoord(lv,wc,Cc,Rc,f),a&&(h.uv=Ei.getInterpolatedAttribute(a,o,l,c,f,new _t)),s&&(h.uv1=Ei.getInterpolatedAttribute(s,o,l,c,f,new _t)),r&&(h.normal=Ei.getInterpolatedAttribute(r,o,l,c,f,new q),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new q,materialIndex:0};Ei.getNormal(wc,Cc,Rc,u.normal),h.face=u,h.barycoord=f}return h}class Ry extends In{constructor(e=null,n=1,i=1,a,s,r,o,l,c=Mn,h=Mn,f,u){super(null,r,o,l,c,h,a,s,f,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class jr extends Mt{constructor(e,n,i,a=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const br=new Bt,cv=new Bt,Lc=[],uv=new or,JT=new Bt,jo=new Ri,Wo=new lr;class fv extends Ri{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new jr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,JT)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new or),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,br),uv.copy(e.boundingBox).applyMatrix4(br),this.boundingBox.union(uv)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new lr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,br),Wo.copy(e.boundingSphere).applyMatrix4(br),this.boundingSphere.union(Wo)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(e,n){const i=this.matrixWorld,a=this.count;if(jo.geometry=this.geometry,jo.material=this.material,jo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Wo.copy(this.boundingSphere),Wo.applyMatrix4(i),e.ray.intersectsSphere(Wo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,br),cv.multiplyMatrices(i,br),jo.matrixWorld=cv,jo.raycast(e,Lc);for(let r=0,o=Lc.length;r<o;r++){const l=Lc[r];l.instanceId=s,l.object=this,n.push(l)}Lc.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new jr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new Ry(new Float32Array(a*this.count),a,this.count,Wm,zi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const zd=new q,eA=new q,tA=new We;class Ps{constructor(e=new q(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=zd.subVectors(i,n).cross(eA.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const a=e.delta(zd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||tA.getNormalMatrix(e),a=this.coplanarPoint(zd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ns=new lr,nA=new _t(.5,.5),Oc=new q;class Ny{constructor(e=new Ps,n=new Ps,i=new Ps,a=new Ps,s=new Ps,r=new Ps){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Qi,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],h=s[4],f=s[5],u=s[6],p=s[7],g=s[8],b=s[9],v=s[10],d=s[11],x=s[12],M=s[13],_=s[14],w=s[15];if(a[0].setComponents(c-r,p-h,d-g,w-x).normalize(),a[1].setComponents(c+r,p+h,d+g,w+x).normalize(),a[2].setComponents(c+o,p+f,d+b,w+M).normalize(),a[3].setComponents(c-o,p-f,d-b,w-M).normalize(),i)a[4].setComponents(l,u,v,_).normalize(),a[5].setComponents(c-l,p-u,d-v,w-_).normalize();else if(a[4].setComponents(c-l,p-u,d-v,w-_).normalize(),n===Qi)a[5].setComponents(c+l,p+u,d+v,w+_).normalize();else if(n===Qu)a[5].setComponents(l,u,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ns.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ns)}intersectsSprite(e){Ns.center.set(0,0,0);const n=nA.distanceTo(e.center);return Ns.radius=.7071067811865476+n,Ns.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ns)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Oc.x=a.normal.x>0?e.max.x:e.min.x,Oc.y=a.normal.y>0?e.max.y:e.min.y,Oc.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Oc)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Dy extends Co{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new rt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Ju=new q,ef=new q,dv=new Bt,qo=new eg,Pc=new lr,Id=new q,hv=new q;class iA extends Bn{constructor(e=new Cn,n=new Dy){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)Ju.fromBufferAttribute(n,a-1),ef.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=Ju.distanceTo(ef);e.setAttribute("lineDistance",new wi(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Pc.copy(i.boundingSphere),Pc.applyMatrix4(a),Pc.radius+=s,e.ray.intersectsSphere(Pc)===!1)return;dv.copy(a).invert(),qo.copy(e.ray).applyMatrix4(dv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const p=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let b=p,v=g-1;b<v;b+=c){const d=h.getX(b),x=h.getX(b+1),M=zc(this,e,qo,l,d,x,b);M&&n.push(M)}if(this.isLineLoop){const b=h.getX(g-1),v=h.getX(p),d=zc(this,e,qo,l,b,v,g-1);d&&n.push(d)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let b=p,v=g-1;b<v;b+=c){const d=zc(this,e,qo,l,b,b+1,b);d&&n.push(d)}if(this.isLineLoop){const b=zc(this,e,qo,l,g-1,p,g-1);b&&n.push(b)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function zc(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(Ju.fromBufferAttribute(o,a),ef.fromBufferAttribute(o,s),n.distanceSqToSegment(Ju,ef,Id,hv)>i)return;Id.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Id);if(!(c<e.near||c>e.far))return{distance:c,point:hv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const pv=new q,mv=new q;class pu extends iA{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)pv.fromBufferAttribute(n,a),mv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+pv.distanceTo(mv);e.setAttribute("lineDistance",new wi(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class aA extends Co{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const gv=new Bt,Lp=new eg,Ic=new lr,Bc=new q;class Op extends Bn{constructor(e=new Cn,n=new aA){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ic.copy(i.boundingSphere),Ic.applyMatrix4(a),Ic.radius+=s,e.ray.intersectsSphere(Ic)===!1)return;gv.copy(a).invert(),Lp.copy(e.ray).applyMatrix4(gv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,f=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,b=p;g<b;g++){const v=c.getX(g);Bc.fromBufferAttribute(f,v),vv(Bc,v,l,a,e,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(f.count,r.start+r.count);for(let g=u,b=p;g<b;g++)Bc.fromBufferAttribute(f,g),vv(Bc,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function vv(t,e,n,i,a,s,r){const o=Lp.distanceSqToPoint(t);if(o<n){const l=new q;Lp.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class Uy extends In{constructor(e=[],n=Qs,i,a,s,r,o,l,c,h){super(e,n,i,a,s,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class go extends In{constructor(e,n,i=ta,a,s,r,o=Mn,l=Mn,c,h=Ba,f=1){if(h!==Ba&&h!==Fs)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:f};super(u,a,s,r,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $m(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class sA extends go{constructor(e,n=ta,i=Qs,a,s,r=Mn,o=Mn,l,c=Ba){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,n,i,a,s,r,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ly extends In{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class er extends Cn{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],h=[],f=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new wi(c,3)),this.setAttribute("normal",new wi(h,3)),this.setAttribute("uv",new wi(f,2));function g(b,v,d,x,M,_,w,N,T,y,R){const C=_/T,L=w/y,z=_/2,G=w/2,P=N/2,I=T+1,B=y+1;let A=0,U=0;const V=new q;for(let se=0;se<B;se++){const le=se*L-G;for(let xe=0;xe<I;xe++){const ke=xe*C-z;V[b]=ke*x,V[v]=le*M,V[d]=P,c.push(V.x,V.y,V.z),V[b]=0,V[v]=0,V[d]=N>0?1:-1,h.push(V.x,V.y,V.z),f.push(xe/T),f.push(1-se/y),A+=1}}for(let se=0;se<y;se++)for(let le=0;le<T;le++){const xe=u+le+I*se,ke=u+le+I*(se+1),Ke=u+(le+1)+I*(se+1),Be=u+(le+1)+I*se;l.push(xe,ke,Be),l.push(ke,Ke,Be),U+=6}o.addGroup(p,U,R),p+=U,u+=A}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new er(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Fc=new q,Hc=new q,Bd=new q,Gc=new Ei;class rA extends Cn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const a=Math.pow(10,4),s=Math.cos(hu*n),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],h=["a","b","c"],f=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:b,b:v,c:d}=Gc;if(b.fromBufferAttribute(o,c[0]),v.fromBufferAttribute(o,c[1]),d.fromBufferAttribute(o,c[2]),Gc.getNormal(Bd),f[0]=`${Math.round(b.x*a)},${Math.round(b.y*a)},${Math.round(b.z*a)}`,f[1]=`${Math.round(v.x*a)},${Math.round(v.y*a)},${Math.round(v.z*a)}`,f[2]=`${Math.round(d.x*a)},${Math.round(d.y*a)},${Math.round(d.z*a)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let x=0;x<3;x++){const M=(x+1)%3,_=f[x],w=f[M],N=Gc[h[x]],T=Gc[h[M]],y=`${_}_${w}`,R=`${w}_${_}`;R in u&&u[R]?(Bd.dot(u[R].normal)<=s&&(p.push(N.x,N.y,N.z),p.push(T.x,T.y,T.z)),u[R]=null):y in u||(u[y]={index0:c[x],index1:c[M],normal:Bd.clone()})}}for(const g in u)if(u[g]){const{index0:b,index1:v}=u[g];Fc.fromBufferAttribute(o,b),Hc.fromBufferAttribute(o,v),p.push(Fc.x,Fc.y,Fc.z),p.push(Hc.x,Hc.y,Hc.z)}this.setAttribute("position",new wi(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class bf extends Cn{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,h=l+1,f=e/o,u=n/l,p=[],g=[],b=[],v=[];for(let d=0;d<h;d++){const x=d*u-r;for(let M=0;M<c;M++){const _=M*f-s;g.push(_,-x,0),b.push(0,0,1),v.push(M/o),v.push(1-d/l)}}for(let d=0;d<l;d++)for(let x=0;x<o;x++){const M=x+c*d,_=x+c*(d+1),w=x+1+c*(d+1),N=x+1+c*d;p.push(M,_,N),p.push(_,w,N)}this.setIndex(p),this.setAttribute("position",new wi(g,3)),this.setAttribute("normal",new wi(b,3)),this.setAttribute("uv",new wi(v,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bf(e.width,e.height,e.widthSegments,e.heightSegments)}}function vo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];if(_v(a))a.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone();else if(Array.isArray(a))if(_v(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();e[n][i]=s}else e[n][i]=a.slice();else e[n][i]=a}}return e}function On(t){const e={};for(let n=0;n<t.length;n++){const i=vo(t[n]);for(const a in i)e[a]=i[a]}return e}function _v(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function oA(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Oy(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}const lA={clone:vo,merge:On};var cA=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,uA=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Co{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=cA,this.fragmentShader=uA,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=vo(e.uniforms),this.uniformsGroups=oA(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const a=e.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new rt().setHex(a.value);break;case"v2":this.uniforms[i].value=new _t().fromArray(a.value);break;case"v3":this.uniforms[i].value=new q().fromArray(a.value);break;case"v4":this.uniforms[i].value=new Zt().fromArray(a.value);break;case"m3":this.uniforms[i].value=new We().fromArray(a.value);break;case"m4":this.uniforms[i].value=new Bt().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class fA extends bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class dA extends Co{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=MT,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hA extends Co{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Vc=new q,kc=new wo,Xi=new q;class Py extends Bn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Bt,this.projectionMatrix=new Bt,this.projectionMatrixInverse=new Bt,this.coordinateSystem=Qi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Vc,kc,Xi),Xi.x===1&&Xi.y===1&&Xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,kc,Xi.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(Vc,kc,Xi),Xi.x===1&&Xi.y===1&&Xi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vc,kc,Xi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const qa=new q,xv=new _t,Sv=new _t;class xi extends Py{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Up*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Up*2*Math.atan(Math.tan(hu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){qa.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qa.x,qa.y).multiplyScalar(-e/qa.z),qa.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(qa.x,qa.y).multiplyScalar(-e/qa.z)}getViewSize(e,n){return this.getViewBounds(e,xv,Sv),n.subVectors(Sv,xv)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(hu*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class tg extends Py{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Er=-90,Tr=1;class pA extends Bn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new xi(Er,Tr,e,n);a.layers=this.layers,this.add(a);const s=new xi(Er,Tr,e,n);s.layers=this.layers,this.add(s);const r=new xi(Er,Tr,e,n);r.layers=this.layers,this.add(r);const o=new xi(Er,Tr,e,n);o.layers=this.layers,this.add(o);const l=new xi(Er,Tr,e,n);l.layers=this.layers,this.add(l);const c=new xi(Er,Tr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===Qi)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Qu)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const b=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let v=!1;e.isWebGLRenderer===!0?v=e.state.buffers.depth.getReversed():v=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=b,e.setRenderTarget(i,5,a),v&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(f,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class mA extends xi{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const og=class og{constructor(e,n,i,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,a){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=a,this}};og.prototype.isMatrix2=!0;let yv=og;function Mv(t,e,n,i){const a=gA(i);switch(n){case xy:return t*e;case Wm:return t*e/a.components*a.byteLength;case qm:return t*e/a.components*a.byteLength;case $s:return t*e*2/a.components*a.byteLength;case Ym:return t*e*2/a.components*a.byteLength;case Sy:return t*e*3/a.components*a.byteLength;case Ii:return t*e*4/a.components*a.byteLength;case Zm:return t*e*4/a.components*a.byteLength;case cu:case uu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case fu:case du:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case ip:case sp:return Math.max(t,16)*Math.max(e,8)/4;case np:case ap:return Math.max(t,8)*Math.max(e,8)/2;case rp:case op:case cp:case up:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case lp:case qu:case fp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case dp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case hp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case pp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case mp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case gp:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case vp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case _p:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case xp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Sp:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case yp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Mp:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case bp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Ep:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Tp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Ap:case wp:case Cp:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Rp:case Np:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Yu:case Dp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function gA(t){switch(t){case bi:case my:return{byteLength:1,components:1};case Ll:case gy:case Ia:return{byteLength:2,components:1};case Xm:case jm:return{byteLength:2,components:4};case ta:case km:case zi:return{byteLength:4,components:1};case vy:case _y:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Vm}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Vm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function zy(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function vA(t){const e=new WeakMap;function n(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,l,c){const h=l.array,f=l.updateRanges;if(t.bindBuffer(c,o),f.length===0)t.bufferSubData(c,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){const g=f[u],b=f[p];b.start<=g.start+g.count+1?g.count=Math.max(g.count,b.start+b.count-g.start):(++u,f[u]=b)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){const b=f[p];t.bufferSubData(c,b.start*h.BYTES_PER_ELEMENT,h,b.start,b.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var _A=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xA=`#ifdef USE_ALPHAHASH
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
#endif`,SA=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yA=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,MA=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bA=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,EA=`#ifdef USE_AOMAP
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
#endif`,TA=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,AA=`#ifdef USE_BATCHING
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
#endif`,wA=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,CA=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,RA=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,NA=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,DA=`#ifdef USE_IRIDESCENCE
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
#endif`,UA=`#ifdef USE_BUMPMAP
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
#endif`,LA=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,OA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,PA=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,zA=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,IA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,BA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,FA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,HA=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,GA=`#define PI 3.141592653589793
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
#endif`,kA=`vec3 transformedNormal = objectNormal;
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
#endif`,jA=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,WA=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qA=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,YA="gl_FragColor = linearToOutputTexel( gl_FragColor );",ZA=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,KA=`#ifdef USE_ENVMAP
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
#endif`,QA=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,$A=`#ifdef USE_ENVMAP
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
#endif`,JA=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,e1=`#ifdef USE_ENVMAP
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
#endif`,t1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,n1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,i1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,a1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,s1=`#ifdef USE_GRADIENTMAP
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
}`,r1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,o1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,c1=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,u1=`#ifdef USE_ENVMAP
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
#endif`,f1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,d1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,h1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,p1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,m1=`PhysicalMaterial material;
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
#endif`,g1=`uniform sampler2D dfgLUT;
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
}`,v1=`
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
#endif`,_1=`#if defined( RE_IndirectDiffuse )
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
#endif`,x1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,S1=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,y1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,M1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,A1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,C1=`#if defined( USE_POINTS_UV )
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
#endif`,R1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,N1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,D1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,U1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,L1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O1=`#ifdef USE_MORPHTARGETS
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
#endif`,P1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,z1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,I1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,B1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,F1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,G1=`#ifdef USE_NORMALMAP
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
#endif`,k1=`#ifdef USE_CLEARCOAT_NORMALMAP
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
#endif`,j1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,W1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Y1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Z1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,K1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Q1=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,$1=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,J1=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ew=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tw=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nw=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,iw=`float getShadowMask() {
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
}`,aw=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sw=`#ifdef USE_SKINNING
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
#endif`,rw=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ow=`#ifdef USE_SKINNING
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
#endif`,lw=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,cw=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,uw=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,fw=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dw=`#ifdef USE_TRANSMISSION
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
#endif`,hw=`#ifdef USE_TRANSMISSION
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
#endif`,pw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gw=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,vw=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const _w=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xw=`uniform sampler2D t2D;
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
}`,Sw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yw=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Mw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bw=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ew=`#include <common>
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
}`,Tw=`#if DEPTH_PACKING == 3200
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
}`,Aw=`#define DISTANCE
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
}`,ww=`#define DISTANCE
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
}`,Cw=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rw=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nw=`uniform float scale;
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
}`,Dw=`uniform vec3 diffuse;
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
}`,Uw=`#include <common>
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
}`,Lw=`uniform vec3 diffuse;
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
}`,Ow=`#define LAMBERT
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
}`,Pw=`#define LAMBERT
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
}`,zw=`#define MATCAP
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
}`,Iw=`#define MATCAP
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
}`,Bw=`#define NORMAL
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
}`,Fw=`#define NORMAL
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
}`,Hw=`#define PHONG
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
}`,Gw=`#define PHONG
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
}`,kw=`#define STANDARD
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
}`,jw=`#define TOON
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
}`,Ww=`uniform float size;
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
}`,qw=`uniform vec3 diffuse;
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
}`,Yw=`#include <common>
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
}`,Zw=`uniform vec3 color;
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
}`,Kw=`uniform float rotation;
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
}`,Qw=`uniform vec3 diffuse;
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
}`,tt={alphahash_fragment:_A,alphahash_pars_fragment:xA,alphamap_fragment:SA,alphamap_pars_fragment:yA,alphatest_fragment:MA,alphatest_pars_fragment:bA,aomap_fragment:EA,aomap_pars_fragment:TA,batching_pars_vertex:AA,batching_vertex:wA,begin_vertex:CA,beginnormal_vertex:RA,bsdfs:NA,iridescence_fragment:DA,bumpmap_pars_fragment:UA,clipping_planes_fragment:LA,clipping_planes_pars_fragment:OA,clipping_planes_pars_vertex:PA,clipping_planes_vertex:zA,color_fragment:IA,color_pars_fragment:BA,color_pars_vertex:FA,color_vertex:HA,common:GA,cube_uv_reflection_fragment:VA,defaultnormal_vertex:kA,displacementmap_pars_vertex:XA,displacementmap_vertex:jA,emissivemap_fragment:WA,emissivemap_pars_fragment:qA,colorspace_fragment:YA,colorspace_pars_fragment:ZA,envmap_fragment:KA,envmap_common_pars_fragment:QA,envmap_pars_fragment:$A,envmap_pars_vertex:JA,envmap_physical_pars_fragment:u1,envmap_vertex:e1,fog_vertex:t1,fog_pars_vertex:n1,fog_fragment:i1,fog_pars_fragment:a1,gradientmap_pars_fragment:s1,lightmap_pars_fragment:r1,lights_lambert_fragment:o1,lights_lambert_pars_fragment:l1,lights_pars_begin:c1,lights_toon_fragment:f1,lights_toon_pars_fragment:d1,lights_phong_fragment:h1,lights_phong_pars_fragment:p1,lights_physical_fragment:m1,lights_physical_pars_fragment:g1,lights_fragment_begin:v1,lights_fragment_maps:_1,lights_fragment_end:x1,lightprobes_pars_fragment:S1,logdepthbuf_fragment:y1,logdepthbuf_pars_fragment:M1,logdepthbuf_pars_vertex:b1,logdepthbuf_vertex:E1,map_fragment:T1,map_pars_fragment:A1,map_particle_fragment:w1,map_particle_pars_fragment:C1,metalnessmap_fragment:R1,metalnessmap_pars_fragment:N1,morphinstance_vertex:D1,morphcolor_vertex:U1,morphnormal_vertex:L1,morphtarget_pars_vertex:O1,morphtarget_vertex:P1,normal_fragment_begin:z1,normal_fragment_maps:I1,normal_pars_fragment:B1,normal_pars_vertex:F1,normal_vertex:H1,normalmap_pars_fragment:G1,clearcoat_normal_fragment_begin:V1,clearcoat_normal_fragment_maps:k1,clearcoat_pars_fragment:X1,iridescence_pars_fragment:j1,opaque_fragment:W1,packing:q1,premultiplied_alpha_fragment:Y1,project_vertex:Z1,dithering_fragment:K1,dithering_pars_fragment:Q1,roughnessmap_fragment:$1,roughnessmap_pars_fragment:J1,shadowmap_pars_fragment:ew,shadowmap_pars_vertex:tw,shadowmap_vertex:nw,shadowmask_pars_fragment:iw,skinbase_vertex:aw,skinning_pars_vertex:sw,skinning_vertex:rw,skinnormal_vertex:ow,specularmap_fragment:lw,specularmap_pars_fragment:cw,tonemapping_fragment:uw,tonemapping_pars_fragment:fw,transmission_fragment:dw,transmission_pars_fragment:hw,uv_pars_fragment:pw,uv_pars_vertex:mw,uv_vertex:gw,worldpos_vertex:vw,background_vert:_w,background_frag:xw,backgroundCube_vert:Sw,backgroundCube_frag:yw,cube_vert:Mw,cube_frag:bw,depth_vert:Ew,depth_frag:Tw,distance_vert:Aw,distance_frag:ww,equirect_vert:Cw,equirect_frag:Rw,linedashed_vert:Nw,linedashed_frag:Dw,meshbasic_vert:Uw,meshbasic_frag:Lw,meshlambert_vert:Ow,meshlambert_frag:Pw,meshmatcap_vert:zw,meshmatcap_frag:Iw,meshnormal_vert:Bw,meshnormal_frag:Fw,meshphong_vert:Hw,meshphong_frag:Gw,meshphysical_vert:Vw,meshphysical_frag:kw,meshtoon_vert:Xw,meshtoon_frag:jw,points_vert:Ww,points_frag:qw,shadow_vert:Yw,shadow_frag:Zw,sprite_vert:Kw,sprite_frag:Qw},be={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new _t(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new q},probesMax:{value:new q},probesResolution:{value:new q}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new _t(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},Wi={basic:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.fog]),vertexShader:tt.meshbasic_vert,fragmentShader:tt.meshbasic_frag},lambert:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},envMapIntensity:{value:1}}]),vertexShader:tt.meshlambert_vert,fragmentShader:tt.meshlambert_frag},phong:{uniforms:On([be.common,be.specularmap,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.fog,be.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:tt.meshphong_vert,fragmentShader:tt.meshphong_frag},standard:{uniforms:On([be.common,be.envmap,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.roughnessmap,be.metalnessmap,be.fog,be.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag},toon:{uniforms:On([be.common,be.aomap,be.lightmap,be.emissivemap,be.bumpmap,be.normalmap,be.displacementmap,be.gradientmap,be.fog,be.lights,{emissive:{value:new rt(0)}}]),vertexShader:tt.meshtoon_vert,fragmentShader:tt.meshtoon_frag},matcap:{uniforms:On([be.common,be.bumpmap,be.normalmap,be.displacementmap,be.fog,{matcap:{value:null}}]),vertexShader:tt.meshmatcap_vert,fragmentShader:tt.meshmatcap_frag},points:{uniforms:On([be.points,be.fog]),vertexShader:tt.points_vert,fragmentShader:tt.points_frag},dashed:{uniforms:On([be.common,be.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:tt.linedashed_vert,fragmentShader:tt.linedashed_frag},depth:{uniforms:On([be.common,be.displacementmap]),vertexShader:tt.depth_vert,fragmentShader:tt.depth_frag},normal:{uniforms:On([be.common,be.bumpmap,be.normalmap,be.displacementmap,{opacity:{value:1}}]),vertexShader:tt.meshnormal_vert,fragmentShader:tt.meshnormal_frag},sprite:{uniforms:On([be.sprite,be.fog]),vertexShader:tt.sprite_vert,fragmentShader:tt.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:tt.background_vert,fragmentShader:tt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:tt.backgroundCube_vert,fragmentShader:tt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:tt.cube_vert,fragmentShader:tt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:tt.equirect_vert,fragmentShader:tt.equirect_frag},distance:{uniforms:On([be.common,be.displacementmap,{referencePosition:{value:new q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:tt.distance_vert,fragmentShader:tt.distance_frag},shadow:{uniforms:On([be.lights,be.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:tt.shadow_vert,fragmentShader:tt.shadow_frag}};Wi.physical={uniforms:On([Wi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new _t(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new _t},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new _t},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:tt.meshphysical_vert,fragmentShader:tt.meshphysical_frag};const Xc={r:0,b:0,g:0},$w=new Bt,Iy=new We;Iy.set(-1,0,0,0,1,0,0,0,1);function Jw(t,e,n,i,a,s){const r=new rt(0);let o=a===!0?0:1,l,c,h=null,f=0,u=null;function p(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const _=x.backgroundBlurriness>0;M=e.get(M,_)}return M}function g(x){let M=!1;const _=p(x);_===null?v(r,o):_&&_.isColor&&(v(_,1),M=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function b(x,M){const _=p(M);_&&(_.isCubeTexture||_.mapping===Mf)?(c===void 0&&(c=new Ri(new er(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:vo(Wi.backgroundCube.uniforms),vertexShader:Wi.backgroundCube.vertexShader,fragmentShader:Wi.backgroundCube.fragmentShader,side:Yn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,N,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4($w.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isCubeTexture&&_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Iy),c.material.toneMapped=ct.getTransfer(_.colorSpace)!==Tt,(h!==_||f!==_.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=_,f=_.version,u=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Ri(new bf(2,2),new bn({name:"BackgroundMaterial",uniforms:vo(Wi.background.uniforms),vertexShader:Wi.background.vertexShader,fragmentShader:Wi.background.fragmentShader,side:ys,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=ct.getTransfer(_.colorSpace)!==Tt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(h!==_||f!==_.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=_,f=_.version,u=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function v(x,M){x.getRGB(Xc,Oy(t)),n.buffers.color.setClear(Xc.r,Xc.g,Xc.b,M,s)}function d(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,M=1){r.set(x),o=M,v(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,v(r,o)},render:g,addToRenderList:b,dispose:d}}function eC(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(L,z,G,P,I){let B=!1;const A=f(L,P,G,z);s!==A&&(s=A,c(s.object)),B=p(L,P,G,I),B&&g(L,P,G,I),I!==null&&e.update(I,t.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,_(L,z,G,P),I!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return t.createVertexArray()}function c(L){return t.bindVertexArray(L)}function h(L){return t.deleteVertexArray(L)}function f(L,z,G,P){const I=P.wireframe===!0;let B=i[z.id];B===void 0&&(B={},i[z.id]=B);const A=L.isInstancedMesh===!0?L.id:0;let U=B[A];U===void 0&&(U={},B[A]=U);let V=U[G.id];V===void 0&&(V={},U[G.id]=V);let se=V[I];return se===void 0&&(se=u(l()),V[I]=se),se}function u(L){const z=[],G=[],P=[];for(let I=0;I<n;I++)z[I]=0,G[I]=0,P[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:P,object:L,attributes:{},index:null}}function p(L,z,G,P){const I=s.attributes,B=z.attributes;let A=0;const U=G.getAttributes();for(const V in U)if(U[V].location>=0){const le=I[V];let xe=B[V];if(xe===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&(xe=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&(xe=L.instanceColor)),le===void 0||le.attribute!==xe||xe&&le.data!==xe.data)return!0;A++}return s.attributesNum!==A||s.index!==P}function g(L,z,G,P){const I={},B=z.attributes;let A=0;const U=G.getAttributes();for(const V in U)if(U[V].location>=0){let le=B[V];le===void 0&&(V==="instanceMatrix"&&L.instanceMatrix&&(le=L.instanceMatrix),V==="instanceColor"&&L.instanceColor&&(le=L.instanceColor));const xe={};xe.attribute=le,le&&le.data&&(xe.data=le.data),I[V]=xe,A++}s.attributes=I,s.attributesNum=A,s.index=P}function b(){const L=s.newAttributes;for(let z=0,G=L.length;z<G;z++)L[z]=0}function v(L){d(L,0)}function d(L,z){const G=s.newAttributes,P=s.enabledAttributes,I=s.attributeDivisors;G[L]=1,P[L]===0&&(t.enableVertexAttribArray(L),P[L]=1),I[L]!==z&&(t.vertexAttribDivisor(L,z),I[L]=z)}function x(){const L=s.newAttributes,z=s.enabledAttributes;for(let G=0,P=z.length;G<P;G++)z[G]!==L[G]&&(t.disableVertexAttribArray(G),z[G]=0)}function M(L,z,G,P,I,B,A){A===!0?t.vertexAttribIPointer(L,z,G,I,B):t.vertexAttribPointer(L,z,G,P,I,B)}function _(L,z,G,P){b();const I=P.attributes,B=G.getAttributes(),A=z.defaultAttributeValues;for(const U in B){const V=B[U];if(V.location>=0){let se=I[U];if(se===void 0&&(U==="instanceMatrix"&&L.instanceMatrix&&(se=L.instanceMatrix),U==="instanceColor"&&L.instanceColor&&(se=L.instanceColor)),se!==void 0){const le=se.normalized,xe=se.itemSize,ke=e.get(se);if(ke===void 0)continue;const Ke=ke.buffer,Be=ke.type,re=ke.bytesPerElement,_e=Be===t.INT||Be===t.UNSIGNED_INT||se.gpuType===km;if(se.isInterleavedBufferAttribute){const me=se.data,Le=me.stride,ze=se.offset;if(me.isInstancedInterleavedBuffer){for(let Ie=0;Ie<V.locationSize;Ie++)d(V.location+Ie,me.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let Ie=0;Ie<V.locationSize;Ie++)v(V.location+Ie);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let Ie=0;Ie<V.locationSize;Ie++)M(V.location+Ie,xe/V.locationSize,Be,le,Le*re,(ze+xe/V.locationSize*Ie)*re,_e)}else{if(se.isInstancedBufferAttribute){for(let me=0;me<V.locationSize;me++)d(V.location+me,se.meshPerAttribute);L.isInstancedMesh!==!0&&P._maxInstanceCount===void 0&&(P._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let me=0;me<V.locationSize;me++)v(V.location+me);t.bindBuffer(t.ARRAY_BUFFER,Ke);for(let me=0;me<V.locationSize;me++)M(V.location+me,xe/V.locationSize,Be,le,xe*re,xe/V.locationSize*me*re,_e)}}else if(A!==void 0){const le=A[U];if(le!==void 0)switch(le.length){case 2:t.vertexAttrib2fv(V.location,le);break;case 3:t.vertexAttrib3fv(V.location,le);break;case 4:t.vertexAttrib4fv(V.location,le);break;default:t.vertexAttrib1fv(V.location,le)}}}}x()}function w(){R();for(const L in i){const z=i[L];for(const G in z){const P=z[G];for(const I in P){const B=P[I];for(const A in B)h(B[A].object),delete B[A];delete P[I]}}delete i[L]}}function N(L){if(i[L.id]===void 0)return;const z=i[L.id];for(const G in z){const P=z[G];for(const I in P){const B=P[I];for(const A in B)h(B[A].object),delete B[A];delete P[I]}}delete i[L.id]}function T(L){for(const z in i){const G=i[z];for(const P in G){const I=G[P];if(I[L.id]===void 0)continue;const B=I[L.id];for(const A in B)h(B[A].object),delete B[A];delete I[L.id]}}}function y(L){for(const z in i){const G=i[z],P=L.isInstancedMesh===!0?L.id:0,I=G[P];if(I!==void 0){for(const B in I){const A=I[B];for(const U in A)h(A[U].object),delete A[U];delete I[B]}delete G[P],Object.keys(G).length===0&&delete i[z]}}}function R(){C(),r=!0,s!==a&&(s=a,c(s.object))}function C(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:R,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:N,releaseStatesOfObject:y,releaseStatesOfProgram:T,initAttributes:b,enableAttribute:v,disableUnusedAttributes:x}}function tC(t,e,n){let i;function a(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,h){h!==0&&(t.drawArraysInstanced(i,l,c,h),n.update(c,i,h))}function o(l,c,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function nC(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Ii&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const y=T===Ia&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==bi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==zi&&!y)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const h=l(c);h!==c&&(Fe("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&Fe("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),b=t.getParameter(t.MAX_TEXTURE_SIZE),v=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),M=t.getParameter(t.MAX_VARYING_VECTORS),_=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),N=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:b,maxCubemapSize:v,maxAttributes:d,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,maxSamples:w,samples:N}}function iC(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new Ps,o=new We,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||i!==0||a;return a=u,i=f.length,p},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){n=h(f,u,0)},this.setState=function(f,u,p){const g=f.clippingPlanes,b=f.clipIntersection,v=f.clipShadows,d=t.get(f);if(!a||g===null||g.length===0||s&&!v)s?h(null):c();else{const x=s?0:i,M=x*4;let _=d.clippingState||null;l.value=_,_=h(g,u,M,p);for(let w=0;w!==M;++w)_[w]=n[w];d.clippingState=_,this.numIntersection=b?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,p,g){const b=f!==null?f.length:0;let v=null;if(b!==0){if(v=l.value,g!==!0||v===null){const d=p+b*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(v===null||v.length<d)&&(v=new Float32Array(d));for(let M=0,_=p;M!==b;++M,_+=4)r.copy(f[M]).applyMatrix4(x,o),r.normal.toArray(v,_),v[_+3]=r.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=b,e.numIntersection=0,v}}const rs=4,bv=[.125,.215,.35,.446,.526,.582],Is=20,aC=256,Yo=new tg,Ev=new rt;let Fd=null,Hd=0,Gd=0,Vd=!1;const sC=new q;class Tv{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=sC}=s;Fd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Gd=this._renderer.getActiveMipmapLevel(),Vd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Cv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=wv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fd,Hd,Gd),this._renderer.xr.enabled=Vd,e.scissorTest=!1,Ar(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===Qs||e.mapping===mo?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Gd=this._renderer.getActiveMipmapLevel(),Vd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:wn,minFilter:wn,generateMipmaps:!1,type:Ia,format:Ii,colorSpace:Zu,depthBuffer:!1},a=Av(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Av(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=rC(s)),this._blurMaterial=lC(s,e,n),this._ggxMaterial=oC(s,e,n)}return a}_compileMaterial(e){const n=new Ri(new Cn,e);this._renderer.compile(n,Yo)}_sceneToCubeUV(e,n,i,a,s){const l=new xi(90,1,n,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,p=f.toneMapping;f.getClearColor(Ev),f.toneMapping=Ji,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(a),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Ri(new er,new Cy({name:"PMREM.Background",side:Yn,depthWrite:!1,depthTest:!1})));const b=this._backgroundBox,v=b.material;let d=!1;const x=e.background;x?x.isColor&&(v.color.copy(x),e.background=null,d=!0):(v.color.copy(Ev),d=!0);for(let M=0;M<6;M++){const _=M%3;_===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[M],s.y,s.z)):_===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[M]));const w=this._cubeSize;Ar(a,_*w,M>2?w:0,w,w),f.setRenderTarget(a),d&&f.render(b,l),f.render(e,l)}f.toneMapping=p,f.autoClear=u,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===Qs||e.mapping===mo;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=Cv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=wv());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ar(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Yo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),f=Math.sqrt(c*c-h*h),u=0+c*1.25,p=f*u,{_lodMax:g}=this,b=this._sizeLods[i],v=3*b*(i>g-rs?i-g+rs:0),d=4*(this._cubeSize-b);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-n,Ar(s,v,d,3*b,2*b),a.setRenderTarget(s),a.render(o,Yo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ar(e,v,d,3*b,2*b),a.setRenderTarget(e),a.render(o,Yo)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&ht("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[a];f.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Is-1),b=s/g,v=isFinite(s)?1+Math.floor(h*b):Is;v>Is&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to ${Is}`);const d=[];let x=0;for(let T=0;T<Is;++T){const y=T/b,R=Math.exp(-y*y/2);d.push(R),T===0?x+=R:T<v&&(x+=2*R)}for(let T=0;T<d.length;T++)d[T]=d[T]/x;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=d,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const _=this._sizeLods[a],w=3*_*(a>M-rs?a-M+rs:0),N=4*(this._cubeSize-_);Ar(n,w,N,3*_,2*_),l.setRenderTarget(n),l.render(f,Yo)}}function rC(t){const e=[],n=[],i=[];let a=t;const s=t-rs+1+bv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-rs?l=bv[r-t+rs-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,f=1+c,u=[h,h,f,h,f,f,h,h,f,f,h,f],p=6,g=6,b=3,v=2,d=1,x=new Float32Array(b*g*p),M=new Float32Array(v*g*p),_=new Float32Array(d*g*p);for(let N=0;N<p;N++){const T=N%3*2/3-1,y=N>2?0:-1,R=[T,y,0,T+2/3,y,0,T+2/3,y+1,0,T,y,0,T+2/3,y+1,0,T,y+1,0];x.set(R,b*g*N),M.set(u,v*g*N);const C=[N,N,N,N,N,N];_.set(C,d*g*N)}const w=new Cn;w.setAttribute("position",new Mt(x,b)),w.setAttribute("uv",new Mt(M,v)),w.setAttribute("faceIndex",new Mt(_,d)),i.push(new Ri(w,null)),a>rs&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Av(t,e,n){const i=new ea(t,e,n);return i.texture.mapping=Mf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ar(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function oC(t,e,n){return new bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:aC,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ef(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function lC(t,e,n){const i=new Float32Array(Is),a=new q(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:Is,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Ef(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function wv(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ef(),fragmentShader:`

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
		`,blending:Na,depthTest:!1,depthWrite:!1})}function Cv(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Na,depthTest:!1,depthWrite:!1})}function Ef(){return`

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
	`}class By extends ea{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new Uy(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new er(5,5,5),s=new bn({name:"CubemapFromEquirect",uniforms:vo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Yn,blending:Na});s.uniforms.tEquirect.value=n;const r=new Ri(a,s),o=n.minFilter;return n.minFilter===Bs&&(n.minFilter=wn),new pA(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function cC(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===fd||p===dd)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const b=new By(g.height);return b.fromEquirectangularTexture(t,u),e.set(u,b),u.addEventListener("dispose",c),o(b.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===fd||p===dd,b=p===Qs||p===mo;if(g||b){let v=n.get(u);const d=v!==void 0?v.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new Tv(t)),v=g?i.fromEquirectangular(u,v):i.fromCubemap(u,v),v.texture.pmremVersion=u.pmremVersion,n.set(u,v),v.texture;if(v!==void 0)return v.texture;{const x=u.image;return g&&x&&x.height>0||b&&x&&l(x)?(i===null&&(i=new Tv(t)),v=g?i.fromEquirectangular(u):i.fromCubemap(u),v.texture.pmremVersion=u.pmremVersion,n.set(u,v),u.addEventListener("dispose",h),v.texture):null}}}return u}function o(u,p){return p===fd?u.mapping=Qs:p===dd&&(u.mapping=mo),u}function l(u){let p=0;const g=6;for(let b=0;b<g;b++)u[b]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:f}}function uC(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&eo("WebGLRenderer: "+i+" extension not supported."),a}}}function fC(t,e,n,i){const a={},s=new WeakMap;function r(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(f,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(f){const u=f.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(f){const u=[],p=f.index,g=f.attributes.position;let b=0;if(g===void 0)return;if(p!==null){const x=p.array;b=p.version;for(let M=0,_=x.length;M<_;M+=3){const w=x[M+0],N=x[M+1],T=x[M+2];u.push(w,N,N,T,T,w)}}else{const x=g.array;b=g.version;for(let M=0,_=x.length/3-1;M<_;M+=3){const w=M+0,N=M+1,T=M+2;u.push(w,N,N,T,T,w)}}const v=new(g.count>=65535?wy:Ay)(u,1);v.version=b;const d=s.get(f);d&&e.remove(d),s.set(f,v)}function h(f){const u=s.get(f);if(u){const p=f.index;p!==null&&u.version<p.version&&c(f)}else c(f);return s.get(f)}return{get:o,update:l,getWireframeAttribute:h}}function dC(t,e,n){let i;function a(f){i=f}let s,r;function o(f){s=f.type,r=f.bytesPerElement}function l(f,u){t.drawElements(i,u,s,f*r),n.update(u,i,1)}function c(f,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,f*r,p),n.update(u,i,p))}function h(f,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,f,0,p);let b=0;for(let v=0;v<p;v++)b+=u[v];n.update(b,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function hC(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:ht("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function pC(t,e,n){const i=new WeakMap,a=new Zt;function s(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let C=function(){y.dispose(),i.delete(o),o.removeEventListener("dispose",C)};var p=C;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,b=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),b===!0&&(_=2),v===!0&&(_=3);let w=o.attributes.position.count*_,N=1;w>e.maxTextureSize&&(N=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const T=new Float32Array(w*N*4*f),y=new My(T,w,N,f);y.type=zi,y.needsUpdate=!0;const R=_*4;for(let L=0;L<f;L++){const z=d[L],G=x[L],P=M[L],I=w*N*4*L;for(let B=0;B<z.count;B++){const A=B*R;g===!0&&(a.fromBufferAttribute(z,B),T[I+A+0]=a.x,T[I+A+1]=a.y,T[I+A+2]=a.z,T[I+A+3]=0),b===!0&&(a.fromBufferAttribute(G,B),T[I+A+4]=a.x,T[I+A+5]=a.y,T[I+A+6]=a.z,T[I+A+7]=0),v===!0&&(a.fromBufferAttribute(P,B),T[I+A+8]=a.x,T[I+A+9]=a.y,T[I+A+10]=a.z,T[I+A+11]=P.itemSize===4?a.w:1)}}u={count:f,texture:y,size:new _t(w,N)},i.set(o,u),o.addEventListener("dispose",C)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let v=0;v<c.length;v++)g+=c[v];const b=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",b),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function mC(t,e,n,i,a){let s=new WeakMap;function r(c){const h=a.render.frame,f=c.geometry,u=e.get(c,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==h&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==h&&(p.update(),s.set(p,h))}return u}function o(){s=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:r,dispose:o}}const gC={[oy]:"LINEAR_TONE_MAPPING",[ly]:"REINHARD_TONE_MAPPING",[cy]:"CINEON_TONE_MAPPING",[uy]:"ACES_FILMIC_TONE_MAPPING",[dy]:"AGX_TONE_MAPPING",[hy]:"NEUTRAL_TONE_MAPPING",[fy]:"CUSTOM_TONE_MAPPING"};function vC(t,e,n,i,a,s){const r=new ea(e,n,{type:t,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new go(e,n):void 0}),o=new ea(e,n,{type:Ia,depthBuffer:!1,stencilBuffer:!1}),l=new Cn;l.setAttribute("position",new wi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new wi([0,2,0,0,2,0],2));const c=new fA({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Ri(l,c),f=new tg(-1,1,1,-1,0,1);let u=null,p=null,g=!1,b,v=null,d=[],x=!1;this.setSize=function(M,_){r.setSize(M,_),o.setSize(M,_);for(let w=0;w<d.length;w++){const N=d[w];N.setSize&&N.setSize(M,_)}},this.setEffects=function(M){d=M,x=d.length>0&&d[0].isRenderPass===!0;const _=r.width,w=r.height;for(let N=0;N<d.length;N++){const T=d[N];T.setSize&&T.setSize(_,w)}},this.begin=function(M,_){if(g||M.toneMapping===Ji&&d.length===0)return!1;if(v=_,_!==null){const w=_.width,N=_.height;(r.width!==w||r.height!==N)&&this.setSize(w,N)}return x===!1&&M.setRenderTarget(r),b=M.toneMapping,M.toneMapping=Ji,!0},this.hasRenderPass=function(){return x},this.end=function(M,_){M.toneMapping=b,g=!0;let w=r,N=o;for(let T=0;T<d.length;T++){const y=d[T];if(y.enabled!==!1&&(y.render(M,N,w,_),y.needsSwap!==!1)){const R=w;w=N,N=R}}if(u!==M.outputColorSpace||p!==M.toneMapping){u=M.outputColorSpace,p=M.toneMapping,c.defines={},ct.getTransfer(u)===Tt&&(c.defines.SRGB_TRANSFER="");const T=gC[p];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=w.texture,M.setRenderTarget(v),M.render(h,f),v=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const Fy=new In,Pp=new go(1,1),Hy=new My,Gy=new HT,Vy=new Uy,Rv=[],Nv=[],Dv=new Float32Array(16),Uv=new Float32Array(9),Lv=new Float32Array(4);function Ro(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=Rv[a];if(s===void 0&&(s=new Float32Array(a),Rv[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function cn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function un(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Tf(t,e){let n=Nv[e];n===void 0&&(n=new Int32Array(e),Nv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function _C(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function xC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2fv(this.addr,e),un(n,e)}}function SC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(cn(n,e))return;t.uniform3fv(this.addr,e),un(n,e)}}function yC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4fv(this.addr,e),un(n,e)}}function MC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Lv.set(i),t.uniformMatrix2fv(this.addr,!1,Lv),un(n,i)}}function bC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Uv.set(i),t.uniformMatrix3fv(this.addr,!1,Uv),un(n,i)}}function EC(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(cn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),un(n,e)}else{if(cn(n,i))return;Dv.set(i),t.uniformMatrix4fv(this.addr,!1,Dv),un(n,i)}}function TC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function AC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2iv(this.addr,e),un(n,e)}}function wC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(cn(n,e))return;t.uniform3iv(this.addr,e),un(n,e)}}function CC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4iv(this.addr,e),un(n,e)}}function RC(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function NC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(cn(n,e))return;t.uniform2uiv(this.addr,e),un(n,e)}}function DC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(cn(n,e))return;t.uniform3uiv(this.addr,e),un(n,e)}}function UC(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(cn(n,e))return;t.uniform4uiv(this.addr,e),un(n,e)}}function LC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Pp.compareFunction=n.isReversedDepthBuffer()?Qm:Km,s=Pp):s=Fy,n.setTexture2D(e||s,a)}function OC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||Gy,a)}function PC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||Vy,a)}function zC(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||Hy,a)}function IC(t){switch(t){case 5126:return _C;case 35664:return xC;case 35665:return SC;case 35666:return yC;case 35674:return MC;case 35675:return bC;case 35676:return EC;case 5124:case 35670:return TC;case 35667:case 35671:return AC;case 35668:case 35672:return wC;case 35669:case 35673:return CC;case 5125:return RC;case 36294:return NC;case 36295:return DC;case 36296:return UC;case 35678:case 36198:case 36298:case 36306:case 35682:return LC;case 35679:case 36299:case 36307:return OC;case 35680:case 36300:case 36308:case 36293:return PC;case 36289:case 36303:case 36311:case 36292:return zC}}function BC(t,e){t.uniform1fv(this.addr,e)}function FC(t,e){const n=Ro(e,this.size,2);t.uniform2fv(this.addr,n)}function HC(t,e){const n=Ro(e,this.size,3);t.uniform3fv(this.addr,n)}function GC(t,e){const n=Ro(e,this.size,4);t.uniform4fv(this.addr,n)}function VC(t,e){const n=Ro(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function kC(t,e){const n=Ro(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function XC(t,e){const n=Ro(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function jC(t,e){t.uniform1iv(this.addr,e)}function WC(t,e){t.uniform2iv(this.addr,e)}function qC(t,e){t.uniform3iv(this.addr,e)}function YC(t,e){t.uniform4iv(this.addr,e)}function ZC(t,e){t.uniform1uiv(this.addr,e)}function KC(t,e){t.uniform2uiv(this.addr,e)}function QC(t,e){t.uniform3uiv(this.addr,e)}function $C(t,e){t.uniform4uiv(this.addr,e)}function JC(t,e,n){const i=this.cache,a=e.length,s=Tf(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Pp:r=Fy;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function eR(t,e,n){const i=this.cache,a=e.length,s=Tf(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||Gy,s[r])}function tR(t,e,n){const i=this.cache,a=e.length,s=Tf(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||Vy,s[r])}function nR(t,e,n){const i=this.cache,a=e.length,s=Tf(n,a);cn(i,s)||(t.uniform1iv(this.addr,s),un(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||Hy,s[r])}function iR(t){switch(t){case 5126:return BC;case 35664:return FC;case 35665:return HC;case 35666:return GC;case 35674:return VC;case 35675:return kC;case 35676:return XC;case 5124:case 35670:return jC;case 35667:case 35671:return WC;case 35668:case 35672:return qC;case 35669:case 35673:return YC;case 5125:return ZC;case 36294:return KC;case 36295:return QC;case 36296:return $C;case 35678:case 36198:case 36298:case 36306:case 35682:return JC;case 35679:case 36299:case 36307:return eR;case 35680:case 36300:case 36308:case 36293:return tR;case 36289:case 36303:case 36311:case 36292:return nR}}class aR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=IC(n.type)}}class sR{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=iR(n.type)}}class rR{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const kd=/(\w+)(\])?(\[|\.)?/g;function Ov(t,e){t.seq.push(e),t.map[e.id]=e}function oR(t,e,n){const i=t.name,a=i.length;for(kd.lastIndex=0;;){const s=kd.exec(i),r=kd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Ov(n,c===void 0?new aR(o,t,e):new sR(o,t,e));break}else{let f=n.map[o];f===void 0&&(f=new rR(o),Ov(n,f)),n=f}}}class mu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);oR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Pv(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const lR=37297;let cR=0;function uR(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const zv=new We;function fR(t){ct._getMatrix(zv,ct.workingColorSpace,t);const e=`mat3( ${zv.elements.map(n=>n.toFixed(4))} )`;switch(ct.getTransfer(t)){case Ku:return[e,"LinearTransferOETF"];case Tt:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Iv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+uR(t.getShaderSource(e),o)}else return s}function dR(t,e){const n=fR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const hR={[oy]:"Linear",[ly]:"Reinhard",[cy]:"Cineon",[uy]:"ACESFilmic",[dy]:"AgX",[hy]:"Neutral",[fy]:"Custom"};function pR(t,e){const n=hR[e];return n===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const jc=new q;function mR(){ct.getLuminanceCoefficients(jc);const t=jc.x.toFixed(4),e=jc.y.toFixed(4),n=jc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(nl).join(`
`)}function vR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function _R(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function nl(t){return t!==""}function Bv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Fv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xR=/^[ \t]*#include +<([\w\d./]+)>/gm;function zp(t){return t.replace(xR,yR)}const SR=new Map;function yR(t,e){let n=tt[e];if(n===void 0){const i=SR.get(e);if(i!==void 0)n=tt[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return zp(n)}const MR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hv(t){return t.replace(MR,bR)}function bR(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Gv(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const ER={[lu]:"SHADOWMAP_TYPE_PCF",[tl]:"SHADOWMAP_TYPE_VSM"};function TR(t){return ER[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const AR={[Qs]:"ENVMAP_TYPE_CUBE",[mo]:"ENVMAP_TYPE_CUBE",[Mf]:"ENVMAP_TYPE_CUBE_UV"};function wR(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":AR[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const CR={[mo]:"ENVMAP_MODE_REFRACTION"};function RR(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":CR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const NR={[ry]:"ENVMAP_BLENDING_MULTIPLY",[xT]:"ENVMAP_BLENDING_MIX",[ST]:"ENVMAP_BLENDING_ADD"};function DR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":NR[t.combine]||"ENVMAP_BLENDING_NONE"}function UR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function LR(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=TR(n),c=wR(n),h=RR(n),f=DR(n),u=UR(n),p=gR(n),g=vR(s),b=a.createProgram();let v,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(v=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(nl).join(`
`),v.length>0&&(v+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(nl).join(`
`),d.length>0&&(d+=`
`)):(v=[Gv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(nl).join(`
`),d=[Gv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+h:"",n.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ji?"#define TONE_MAPPING":"",n.toneMapping!==Ji?tt.tonemapping_pars_fragment:"",n.toneMapping!==Ji?pR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",tt.colorspace_pars_fragment,dR("linearToOutputTexel",n.outputColorSpace),mR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(nl).join(`
`)),r=zp(r),r=Bv(r,n),r=Fv(r,n),o=zp(o),o=Bv(o,n),o=Fv(o,n),r=Hv(r),o=Hv(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,v=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,d=["#define varying in",n.glslVersion===W0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===W0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const M=x+v+r,_=x+d+o,w=Pv(a,a.VERTEX_SHADER,M),N=Pv(a,a.FRAGMENT_SHADER,_);a.attachShader(b,w),a.attachShader(b,N),n.index0AttributeName!==void 0?a.bindAttribLocation(b,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(b,0,"position"),a.linkProgram(b);function T(L){if(t.debug.checkShaderErrors){const z=a.getProgramInfoLog(b)||"",G=a.getShaderInfoLog(w)||"",P=a.getShaderInfoLog(N)||"",I=z.trim(),B=G.trim(),A=P.trim();let U=!0,V=!0;if(a.getProgramParameter(b,a.LINK_STATUS)===!1)if(U=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,b,w,N);else{const se=Iv(a,w,"vertex"),le=Iv(a,N,"fragment");ht("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(b,a.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+I+`
`+se+`
`+le)}else I!==""?Fe("WebGLProgram: Program Info Log:",I):(B===""||A==="")&&(V=!1);V&&(L.diagnostics={runnable:U,programLog:I,vertexShader:{log:B,prefix:v},fragmentShader:{log:A,prefix:d}})}a.deleteShader(w),a.deleteShader(N),y=new mu(a,b),R=_R(a,b)}let y;this.getUniforms=function(){return y===void 0&&T(this),y};let R;this.getAttributes=function(){return R===void 0&&T(this),R};let C=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=a.getProgramParameter(b,lR)),C},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(b),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=cR++,this.cacheKey=e,this.usedTimes=1,this.program=b,this.vertexShader=w,this.fragmentShader=N,this}let OR=0;class PR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new zR(e),n.set(e,i)),i}}class zR{constructor(e){this.id=OR++,this.code=e,this.usedTimes=0}}function IR(t){return t===$s||t===qu||t===Yu}function BR(t,e,n,i,a,s){const r=new by,o=new PR,l=new Set,c=[],h=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(y){return l.add(y),y===0?"uv":`uv${y}`}function b(y,R,C,L,z,G){const P=L.fog,I=z.geometry,B=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?L.environment:null,A=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,U=e.get(y.envMap||B,A),V=U&&U.mapping===Mf?U.image.height:null,se=p[y.type];y.precision!==null&&(u=i.getMaxPrecision(y.precision),u!==y.precision&&Fe("WebGLProgram.getParameters:",y.precision,"not supported, using",u,"instead."));const le=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,xe=le!==void 0?le.length:0;let ke=0;I.morphAttributes.position!==void 0&&(ke=1),I.morphAttributes.normal!==void 0&&(ke=2),I.morphAttributes.color!==void 0&&(ke=3);let Ke,Be,re,_e;if(se){const Ne=Wi[se];Ke=Ne.vertexShader,Be=Ne.fragmentShader}else{Ke=y.vertexShader,Be=y.fragmentShader;const Ne=o.getVertexShaderStage(y),dt=o.getFragmentShaderStage(y);o.update(y,Ne,dt),re=Ne.id,_e=dt.id}const me=t.getRenderTarget(),Le=t.state.buffers.depth.getReversed(),ze=z.isInstancedMesh===!0,Ie=z.isBatchedMesh===!0,xt=!!y.map,je=!!y.matcap,lt=!!U,Ge=!!y.aoMap,qe=!!y.lightMap,Ct=!!y.bumpMap&&y.wireframe===!1,mt=!!y.normalMap,zt=!!y.displacementMap,Ot=!!y.emissiveMap,Rt=!!y.metalnessMap,ye=!!y.roughnessMap,H=y.anisotropy>0,nt=y.clearcoat>0,Ve=y.dispersion>0,D=y.iridescence>0,S=y.sheen>0,j=y.transmission>0,Y=H&&!!y.anisotropyMap,J=nt&&!!y.clearcoatMap,de=nt&&!!y.clearcoatNormalMap,ge=nt&&!!y.clearcoatRoughnessMap,ee=D&&!!y.iridescenceMap,W=D&&!!y.iridescenceThicknessMap,ie=S&&!!y.sheenColorMap,ue=S&&!!y.sheenRoughnessMap,O=!!y.specularMap,k=!!y.specularColorMap,he=!!y.specularIntensityMap,fe=j&&!!y.transmissionMap,Ce=j&&!!y.thicknessMap,F=!!y.gradientMap,pe=!!y.alphaMap,te=y.alphaTest>0,Q=!!y.alphaHash,ve=!!y.extensions;let oe=Ji;y.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(oe=t.toneMapping);const Re={shaderID:se,shaderType:y.type,shaderName:y.name,vertexShader:Ke,fragmentShader:Be,defines:y.defines,customVertexShaderID:re,customFragmentShaderID:_e,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:u,batching:Ie,batchingColor:Ie&&z._colorsTexture!==null,instancing:ze,instancingColor:ze&&z.instanceColor!==null,instancingMorph:ze&&z.morphTexture!==null,outputColorSpace:me===null?t.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:xt,matcap:je,envMap:lt,envMapMode:lt&&U.mapping,envMapCubeUVHeight:V,aoMap:Ge,lightMap:qe,bumpMap:Ct,normalMap:mt,displacementMap:zt,emissiveMap:Ot,normalMapObjectSpace:mt&&y.normalMapType===bT,normalMapTangentSpace:mt&&y.normalMapType===k0,packedNormalMap:mt&&y.normalMapType===k0&&IR(y.normalMap.format),metalnessMap:Rt,roughnessMap:ye,anisotropy:H,anisotropyMap:Y,clearcoat:nt,clearcoatMap:J,clearcoatNormalMap:de,clearcoatRoughnessMap:ge,dispersion:Ve,iridescence:D,iridescenceMap:ee,iridescenceThicknessMap:W,sheen:S,sheenColorMap:ie,sheenRoughnessMap:ue,specularMap:O,specularColorMap:k,specularIntensityMap:he,transmission:j,transmissionMap:fe,thicknessMap:Ce,gradientMap:F,opaque:y.transparent===!1&&y.blending===js&&y.alphaToCoverage===!1,alphaMap:pe,alphaTest:te,alphaHash:Q,combine:y.combine,mapUv:xt&&g(y.map.channel),aoMapUv:Ge&&g(y.aoMap.channel),lightMapUv:qe&&g(y.lightMap.channel),bumpMapUv:Ct&&g(y.bumpMap.channel),normalMapUv:mt&&g(y.normalMap.channel),displacementMapUv:zt&&g(y.displacementMap.channel),emissiveMapUv:Ot&&g(y.emissiveMap.channel),metalnessMapUv:Rt&&g(y.metalnessMap.channel),roughnessMapUv:ye&&g(y.roughnessMap.channel),anisotropyMapUv:Y&&g(y.anisotropyMap.channel),clearcoatMapUv:J&&g(y.clearcoatMap.channel),clearcoatNormalMapUv:de&&g(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&g(y.clearcoatRoughnessMap.channel),iridescenceMapUv:ee&&g(y.iridescenceMap.channel),iridescenceThicknessMapUv:W&&g(y.iridescenceThicknessMap.channel),sheenColorMapUv:ie&&g(y.sheenColorMap.channel),sheenRoughnessMapUv:ue&&g(y.sheenRoughnessMap.channel),specularMapUv:O&&g(y.specularMap.channel),specularColorMapUv:k&&g(y.specularColorMap.channel),specularIntensityMapUv:he&&g(y.specularIntensityMap.channel),transmissionMapUv:fe&&g(y.transmissionMap.channel),thicknessMapUv:Ce&&g(y.thicknessMap.channel),alphaMapUv:pe&&g(y.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(mt||H),vertexNormals:!!I.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!I.attributes.uv&&(xt||pe),fog:!!P,useFog:y.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||I.attributes.normal===void 0&&mt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:Le,skinning:z.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:xe,morphTextureStride:ke,numDirLights:R.directional.length,numPointLights:R.point.length,numSpotLights:R.spot.length,numSpotLightMaps:R.spotLightMap.length,numRectAreaLights:R.rectArea.length,numHemiLights:R.hemi.length,numDirLightShadows:R.directionalShadowMap.length,numPointLightShadows:R.pointShadowMap.length,numSpotLightShadows:R.spotShadowMap.length,numSpotLightShadowsWithMaps:R.numSpotLightShadowsWithMaps,numLightProbes:R.numLightProbes,numLightProbeGrids:G.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:y.dithering,shadowMapEnabled:t.shadowMap.enabled&&C.length>0,shadowMapType:t.shadowMap.type,toneMapping:oe,decodeVideoTexture:xt&&y.map.isVideoTexture===!0&&ct.getTransfer(y.map.colorSpace)===Tt,decodeVideoTextureEmissive:Ot&&y.emissiveMap.isVideoTexture===!0&&ct.getTransfer(y.emissiveMap.colorSpace)===Tt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Ma,flipSided:y.side===Yn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:ve&&y.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&y.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function v(y){const R=[];if(y.shaderID?R.push(y.shaderID):(R.push(y.customVertexShaderID),R.push(y.customFragmentShaderID)),y.defines!==void 0)for(const C in y.defines)R.push(C),R.push(y.defines[C]);return y.isRawShaderMaterial===!1&&(d(R,y),x(R,y),R.push(t.outputColorSpace)),R.push(y.customProgramCacheKey),R.join()}function d(y,R){y.push(R.precision),y.push(R.outputColorSpace),y.push(R.envMapMode),y.push(R.envMapCubeUVHeight),y.push(R.mapUv),y.push(R.alphaMapUv),y.push(R.lightMapUv),y.push(R.aoMapUv),y.push(R.bumpMapUv),y.push(R.normalMapUv),y.push(R.displacementMapUv),y.push(R.emissiveMapUv),y.push(R.metalnessMapUv),y.push(R.roughnessMapUv),y.push(R.anisotropyMapUv),y.push(R.clearcoatMapUv),y.push(R.clearcoatNormalMapUv),y.push(R.clearcoatRoughnessMapUv),y.push(R.iridescenceMapUv),y.push(R.iridescenceThicknessMapUv),y.push(R.sheenColorMapUv),y.push(R.sheenRoughnessMapUv),y.push(R.specularMapUv),y.push(R.specularColorMapUv),y.push(R.specularIntensityMapUv),y.push(R.transmissionMapUv),y.push(R.thicknessMapUv),y.push(R.combine),y.push(R.fogExp2),y.push(R.sizeAttenuation),y.push(R.morphTargetsCount),y.push(R.morphAttributeCount),y.push(R.numDirLights),y.push(R.numPointLights),y.push(R.numSpotLights),y.push(R.numSpotLightMaps),y.push(R.numHemiLights),y.push(R.numRectAreaLights),y.push(R.numDirLightShadows),y.push(R.numPointLightShadows),y.push(R.numSpotLightShadows),y.push(R.numSpotLightShadowsWithMaps),y.push(R.numLightProbes),y.push(R.shadowMapType),y.push(R.toneMapping),y.push(R.numClippingPlanes),y.push(R.numClipIntersection),y.push(R.depthPacking)}function x(y,R){r.disableAll(),R.instancing&&r.enable(0),R.instancingColor&&r.enable(1),R.instancingMorph&&r.enable(2),R.matcap&&r.enable(3),R.envMap&&r.enable(4),R.normalMapObjectSpace&&r.enable(5),R.normalMapTangentSpace&&r.enable(6),R.clearcoat&&r.enable(7),R.iridescence&&r.enable(8),R.alphaTest&&r.enable(9),R.vertexColors&&r.enable(10),R.vertexAlphas&&r.enable(11),R.vertexUv1s&&r.enable(12),R.vertexUv2s&&r.enable(13),R.vertexUv3s&&r.enable(14),R.vertexTangents&&r.enable(15),R.anisotropy&&r.enable(16),R.alphaHash&&r.enable(17),R.batching&&r.enable(18),R.dispersion&&r.enable(19),R.batchingColor&&r.enable(20),R.gradientMap&&r.enable(21),R.packedNormalMap&&r.enable(22),R.vertexNormals&&r.enable(23),y.push(r.mask),r.disableAll(),R.fog&&r.enable(0),R.useFog&&r.enable(1),R.flatShading&&r.enable(2),R.logarithmicDepthBuffer&&r.enable(3),R.reversedDepthBuffer&&r.enable(4),R.skinning&&r.enable(5),R.morphTargets&&r.enable(6),R.morphNormals&&r.enable(7),R.morphColors&&r.enable(8),R.premultipliedAlpha&&r.enable(9),R.shadowMapEnabled&&r.enable(10),R.doubleSided&&r.enable(11),R.flipSided&&r.enable(12),R.useDepthPacking&&r.enable(13),R.dithering&&r.enable(14),R.transmission&&r.enable(15),R.sheen&&r.enable(16),R.opaque&&r.enable(17),R.pointsUvs&&r.enable(18),R.decodeVideoTexture&&r.enable(19),R.decodeVideoTextureEmissive&&r.enable(20),R.alphaToCoverage&&r.enable(21),R.numLightProbeGrids>0&&r.enable(22),R.hasPositionAttribute&&r.enable(23),y.push(r.mask)}function M(y){const R=p[y.type];let C;if(R){const L=Wi[R];C=lA.clone(L.uniforms)}else C=y.uniforms;return C}function _(y,R){let C=h.get(R);return C!==void 0?++C.usedTimes:(C=new LR(t,R,y,a),c.push(C),h.set(R,C)),C}function w(y){if(--y.usedTimes===0){const R=c.indexOf(y);c[R]=c[c.length-1],c.pop(),h.delete(y.cacheKey),y.destroy()}}function N(y){o.remove(y)}function T(){o.dispose()}return{getParameters:b,getProgramCacheKey:v,getUniforms:M,acquireProgram:_,releaseProgram:w,releaseShaderCache:N,programs:c,dispose:T}}function FR(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function HR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Vv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function kv(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,b,v,d){let x=t[e];return x===void 0?(x={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:b,renderOrder:u.renderOrder,z:v,group:d},t[e]=x):(x.id=u.id,x.object=u,x.geometry=p,x.material=g,x.materialVariant=r(u),x.groupOrder=b,x.renderOrder=u.renderOrder,x.z=v,x.group=d),e++,x}function l(u,p,g,b,v,d){const x=o(u,p,g,b,v,d);g.transmission>0?i.push(x):g.transparent===!0?a.push(x):n.push(x)}function c(u,p,g,b,v,d){const x=o(u,p,g,b,v,d);g.transmission>0?i.unshift(x):g.transparent===!0?a.unshift(x):n.unshift(x)}function h(u,p,g){n.length>1&&n.sort(u||HR),i.length>1&&i.sort(p||Vv),a.length>1&&a.sort(p||Vv),g&&(n.reverse(),i.reverse(),a.reverse())}function f(){for(let u=e,p=t.length;u<p;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:f,sort:h}}function GR(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new kv,t.set(i,[r])):a>=s.length?(r=new kv,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function VR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new q,color:new rt};break;case"SpotLight":n={position:new q,direction:new q,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new q,color:new rt,distance:0,decay:0};break;case"HemisphereLight":n={direction:new q,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":n={color:new rt,position:new q,halfWidth:new q,halfHeight:new q};break}return t[e.id]=n,n}}}function kR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new _t,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let XR=0;function jR(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function WR(t){const e=new VR,n=kR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new q);const a=new q,s=new Bt,r=new Bt;function o(c){let h=0,f=0,u=0;for(let R=0;R<9;R++)i.probe[R].set(0,0,0);let p=0,g=0,b=0,v=0,d=0,x=0,M=0,_=0,w=0,N=0,T=0;c.sort(jR);for(let R=0,C=c.length;R<C;R++){const L=c[R],z=L.color,G=L.intensity,P=L.distance;let I=null;if(L.shadow&&L.shadow.map&&(L.shadow.map.texture.format===$s?I=L.shadow.map.texture:I=L.shadow.map.depthTexture||L.shadow.map.texture),L.isAmbientLight)h+=z.r*G,f+=z.g*G,u+=z.b*G;else if(L.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(L.sh.coefficients[B],G);T++}else if(L.isDirectionalLight){const B=e.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const A=L.shadow,U=n.get(L);U.shadowIntensity=A.intensity,U.shadowBias=A.bias,U.shadowNormalBias=A.normalBias,U.shadowRadius=A.radius,U.shadowMapSize=A.mapSize,i.directionalShadow[p]=U,i.directionalShadowMap[p]=I,i.directionalShadowMatrix[p]=L.shadow.matrix,x++}i.directional[p]=B,p++}else if(L.isSpotLight){const B=e.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(z).multiplyScalar(G),B.distance=P,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,i.spot[b]=B;const A=L.shadow;if(L.map&&(i.spotLightMap[w]=L.map,w++,A.updateMatrices(L),L.castShadow&&N++),i.spotLightMatrix[b]=A.matrix,L.castShadow){const U=n.get(L);U.shadowIntensity=A.intensity,U.shadowBias=A.bias,U.shadowNormalBias=A.normalBias,U.shadowRadius=A.radius,U.shadowMapSize=A.mapSize,i.spotShadow[b]=U,i.spotShadowMap[b]=I,_++}b++}else if(L.isRectAreaLight){const B=e.get(L);B.color.copy(z).multiplyScalar(G),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),i.rectArea[v]=B,v++}else if(L.isPointLight){const B=e.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity),B.distance=L.distance,B.decay=L.decay,L.castShadow){const A=L.shadow,U=n.get(L);U.shadowIntensity=A.intensity,U.shadowBias=A.bias,U.shadowNormalBias=A.normalBias,U.shadowRadius=A.radius,U.shadowMapSize=A.mapSize,U.shadowCameraNear=A.camera.near,U.shadowCameraFar=A.camera.far,i.pointShadow[g]=U,i.pointShadowMap[g]=I,i.pointShadowMatrix[g]=L.shadow.matrix,M++}i.point[g]=B,g++}else if(L.isHemisphereLight){const B=e.get(L);B.skyColor.copy(L.color).multiplyScalar(G),B.groundColor.copy(L.groundColor).multiplyScalar(G),i.hemi[d]=B,d++}}v>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=be.LTC_FLOAT_1,i.rectAreaLTC2=be.LTC_FLOAT_2):(i.rectAreaLTC1=be.LTC_HALF_1,i.rectAreaLTC2=be.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const y=i.hash;(y.directionalLength!==p||y.pointLength!==g||y.spotLength!==b||y.rectAreaLength!==v||y.hemiLength!==d||y.numDirectionalShadows!==x||y.numPointShadows!==M||y.numSpotShadows!==_||y.numSpotMaps!==w||y.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=b,i.rectArea.length=v,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=_+w-N,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=N,i.numLightProbes=T,y.directionalLength=p,y.pointLength=g,y.spotLength=b,y.rectAreaLength=v,y.hemiLength=d,y.numDirectionalShadows=x,y.numPointShadows=M,y.numSpotShadows=_,y.numSpotMaps=w,y.numLightProbes=T,i.version=XR++)}function l(c,h){let f=0,u=0,p=0,g=0,b=0;const v=h.matrixWorldInverse;for(let d=0,x=c.length;d<x;d++){const M=c[d];if(M.isDirectionalLight){const _=i.directional[f];_.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(v),f++}else if(M.isSpotLight){const _=i.spot[p];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(v),_.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),_.direction.sub(a),_.direction.transformDirection(v),p++}else if(M.isRectAreaLight){const _=i.rectArea[g];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(v),r.identity(),s.copy(M.matrixWorld),s.premultiply(v),r.extractRotation(s),_.halfWidth.set(M.width*.5,0,0),_.halfHeight.set(0,M.height*.5,0),_.halfWidth.applyMatrix4(r),_.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const _=i.point[u];_.position.setFromMatrixPosition(M.matrixWorld),_.position.applyMatrix4(v),u++}else if(M.isHemisphereLight){const _=i.hemi[b];_.direction.setFromMatrixPosition(M.matrixWorld),_.direction.transformDirection(v),b++}}}return{setup:o,setupView:l,state:i}}function Xv(t){const e=new WR(t),n=[],i=[],a=[];function s(u){f.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){e.setup(n)}function h(u){e.setupView(n,u)}const f={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:f,setupLights:c,setupLightsView:h,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function qR(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Xv(t),e.set(a,[o])):s>=r.length?(o=new Xv(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const YR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ZR=`uniform sampler2D shadow_pass;
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
}`,KR=[new q(1,0,0),new q(-1,0,0),new q(0,1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1)],QR=[new q(0,-1,0),new q(0,-1,0),new q(0,0,1),new q(0,0,-1),new q(0,-1,0),new q(0,-1,0)],jv=new Bt,Zo=new q,Xd=new q;function $R(t,e,n){let i=new Ny;const a=new _t,s=new _t,r=new Zt,o=new dA,l=new hA,c={},h=n.maxTextureSize,f={[ys]:Yn,[Yn]:ys,[Ma]:Ma},u=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new _t},radius:{value:4}},vertexShader:YR,fragmentShader:ZR}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Cn;g.setAttribute("position",new Mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const b=new Ri(g,u),v=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=lu;let d=this.type;this.render=function(N,T,y){if(v.enabled===!1||v.autoUpdate===!1&&v.needsUpdate===!1||N.length===0)return;this.type===eT&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=lu);const R=t.getRenderTarget(),C=t.getActiveCubeFace(),L=t.getActiveMipmapLevel(),z=t.state;z.setBlending(Na),z.buffers.depth.getReversed()===!0?z.buffers.color.setClear(0,0,0,0):z.buffers.color.setClear(1,1,1,1),z.buffers.depth.setTest(!0),z.setScissorTest(!1);const G=d!==this.type;G&&T.traverse(function(P){P.material&&(Array.isArray(P.material)?P.material.forEach(I=>I.needsUpdate=!0):P.material.needsUpdate=!0)});for(let P=0,I=N.length;P<I;P++){const B=N[P],A=B.shadow;if(A===void 0){Fe("WebGLShadowMap:",B,"has no shadow.");continue}if(A.autoUpdate===!1&&A.needsUpdate===!1)continue;a.copy(A.mapSize);const U=A.getFrameExtents();a.multiply(U),s.copy(A.mapSize),(a.x>h||a.y>h)&&(a.x>h&&(s.x=Math.floor(h/U.x),a.x=s.x*U.x,A.mapSize.x=s.x),a.y>h&&(s.y=Math.floor(h/U.y),a.y=s.y*U.y,A.mapSize.y=s.y));const V=t.state.buffers.depth.getReversed();if(A.camera._reversedDepth=V,A.map===null||G===!0){if(A.map!==null&&(A.map.depthTexture!==null&&(A.map.depthTexture.dispose(),A.map.depthTexture=null),A.map.dispose()),this.type===tl){if(B.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}A.map=new ea(a.x,a.y,{format:$s,type:Ia,minFilter:wn,magFilter:wn,generateMipmaps:!1}),A.map.texture.name=B.name+".shadowMap",A.map.depthTexture=new go(a.x,a.y,zi),A.map.depthTexture.name=B.name+".shadowMapDepth",A.map.depthTexture.format=Ba,A.map.depthTexture.compareFunction=null,A.map.depthTexture.minFilter=Mn,A.map.depthTexture.magFilter=Mn}else B.isPointLight?(A.map=new By(a.x),A.map.depthTexture=new sA(a.x,ta)):(A.map=new ea(a.x,a.y),A.map.depthTexture=new go(a.x,a.y,ta)),A.map.depthTexture.name=B.name+".shadowMap",A.map.depthTexture.format=Ba,this.type===lu?(A.map.depthTexture.compareFunction=V?Qm:Km,A.map.depthTexture.minFilter=wn,A.map.depthTexture.magFilter=wn):(A.map.depthTexture.compareFunction=null,A.map.depthTexture.minFilter=Mn,A.map.depthTexture.magFilter=Mn);A.camera.updateProjectionMatrix()}const se=A.map.isWebGLCubeRenderTarget?6:1;for(let le=0;le<se;le++){if(A.map.isWebGLCubeRenderTarget)t.setRenderTarget(A.map,le),t.clear();else{le===0&&(t.setRenderTarget(A.map),t.clear());const xe=A.getViewport(le);r.set(s.x*xe.x,s.y*xe.y,s.x*xe.z,s.y*xe.w),z.viewport(r)}if(B.isPointLight){const xe=A.camera,ke=A.matrix,Ke=B.distance||xe.far;Ke!==xe.far&&(xe.far=Ke,xe.updateProjectionMatrix()),Zo.setFromMatrixPosition(B.matrixWorld),xe.position.copy(Zo),Xd.copy(xe.position),Xd.add(KR[le]),xe.up.copy(QR[le]),xe.lookAt(Xd),xe.updateMatrixWorld(),ke.makeTranslation(-Zo.x,-Zo.y,-Zo.z),jv.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),A._frustum.setFromProjectionMatrix(jv,xe.coordinateSystem,xe.reversedDepth)}else A.updateMatrices(B);i=A.getFrustum(),_(T,y,A.camera,B,this.type)}A.isPointLightShadow!==!0&&this.type===tl&&x(A,y),A.needsUpdate=!1}d=this.type,v.needsUpdate=!1,t.setRenderTarget(R,C,L)};function x(N,T){const y=e.update(b);u.defines.VSM_SAMPLES!==N.blurSamples&&(u.defines.VSM_SAMPLES=N.blurSamples,p.defines.VSM_SAMPLES=N.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),N.mapPass===null&&(N.mapPass=new ea(a.x,a.y,{format:$s,type:Ia})),u.uniforms.shadow_pass.value=N.map.depthTexture,u.uniforms.resolution.value=N.mapSize,u.uniforms.radius.value=N.radius,t.setRenderTarget(N.mapPass),t.clear(),t.renderBufferDirect(T,null,y,u,b,null),p.uniforms.shadow_pass.value=N.mapPass.texture,p.uniforms.resolution.value=N.mapSize,p.uniforms.radius.value=N.radius,t.setRenderTarget(N.map),t.clear(),t.renderBufferDirect(T,null,y,p,b,null)}function M(N,T,y,R){let C=null;const L=y.isPointLight===!0?N.customDistanceMaterial:N.customDepthMaterial;if(L!==void 0)C=L;else if(C=y.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const z=C.uuid,G=T.uuid;let P=c[z];P===void 0&&(P={},c[z]=P);let I=P[G];I===void 0&&(I=C.clone(),P[G]=I,T.addEventListener("dispose",w)),C=I}if(C.visible=T.visible,C.wireframe=T.wireframe,R===tl?C.side=T.shadowSide!==null?T.shadowSide:T.side:C.side=T.shadowSide!==null?T.shadowSide:f[T.side],C.alphaMap=T.alphaMap,C.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,C.map=T.map,C.clipShadows=T.clipShadows,C.clippingPlanes=T.clippingPlanes,C.clipIntersection=T.clipIntersection,C.displacementMap=T.displacementMap,C.displacementScale=T.displacementScale,C.displacementBias=T.displacementBias,C.wireframeLinewidth=T.wireframeLinewidth,C.linewidth=T.linewidth,y.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const z=t.properties.get(C);z.light=y}return C}function _(N,T,y,R,C){if(N.visible===!1)return;if(N.layers.test(T.layers)&&(N.isMesh||N.isLine||N.isPoints)&&(N.castShadow||N.receiveShadow&&C===tl)&&(!N.frustumCulled||i.intersectsObject(N))){N.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,N.matrixWorld);const G=e.update(N),P=N.material;if(Array.isArray(P)){const I=G.groups;for(let B=0,A=I.length;B<A;B++){const U=I[B],V=P[U.materialIndex];if(V&&V.visible){const se=M(N,V,R,C);N.onBeforeShadow(t,N,T,y,G,se,U),t.renderBufferDirect(y,null,G,se,N,U),N.onAfterShadow(t,N,T,y,G,se,U)}}}else if(P.visible){const I=M(N,P,R,C);N.onBeforeShadow(t,N,T,y,G,I,null),t.renderBufferDirect(y,null,G,I,N,null),N.onAfterShadow(t,N,T,y,G,I,null)}}const z=N.children;for(let G=0,P=z.length;G<P;G++)_(z[G],T,y,R,C)}function w(N){N.target.removeEventListener("dispose",w);for(const y in c){const R=c[y],C=N.target.uuid;C in R&&(R[C].dispose(),delete R[C])}}}function JR(t,e){function n(){let F=!1;const pe=new Zt;let te=null;const Q=new Zt(0,0,0,0);return{setMask:function(ve){te!==ve&&!F&&(t.colorMask(ve,ve,ve,ve),te=ve)},setLocked:function(ve){F=ve},setClear:function(ve,oe,Re,Ne,dt){dt===!0&&(ve*=Ne,oe*=Ne,Re*=Ne),pe.set(ve,oe,Re,Ne),Q.equals(pe)===!1&&(t.clearColor(ve,oe,Re,Ne),Q.copy(pe))},reset:function(){F=!1,te=null,Q.set(-1,0,0,0)}}}function i(){let F=!1,pe=!1,te=null,Q=null,ve=null;return{setReversed:function(oe){if(pe!==oe){const Re=e.get("EXT_clip_control");oe?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),pe=oe;const Ne=ve;ve=null,this.setClear(Ne)}},getReversed:function(){return pe},setTest:function(oe){oe?me(t.DEPTH_TEST):Le(t.DEPTH_TEST)},setMask:function(oe){te!==oe&&!F&&(t.depthMask(oe),te=oe)},setFunc:function(oe){if(pe&&(oe=LT[oe]),Q!==oe){switch(oe){case qh:t.depthFunc(t.NEVER);break;case Yh:t.depthFunc(t.ALWAYS);break;case Zh:t.depthFunc(t.LESS);break;case po:t.depthFunc(t.LEQUAL);break;case Kh:t.depthFunc(t.EQUAL);break;case Qh:t.depthFunc(t.GEQUAL);break;case $h:t.depthFunc(t.GREATER);break;case Jh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}Q=oe}},setLocked:function(oe){F=oe},setClear:function(oe){ve!==oe&&(ve=oe,pe&&(oe=1-oe),t.clearDepth(oe))},reset:function(){F=!1,te=null,Q=null,ve=null,pe=!1}}}function a(){let F=!1,pe=null,te=null,Q=null,ve=null,oe=null,Re=null,Ne=null,dt=null;return{setTest:function(Nt){F||(Nt?me(t.STENCIL_TEST):Le(t.STENCIL_TEST))},setMask:function(Nt){pe!==Nt&&!F&&(t.stencilMask(Nt),pe=Nt)},setFunc:function(Nt,Rn,Nn){(te!==Nt||Q!==Rn||ve!==Nn)&&(t.stencilFunc(Nt,Rn,Nn),te=Nt,Q=Rn,ve=Nn)},setOp:function(Nt,Rn,Nn){(oe!==Nt||Re!==Rn||Ne!==Nn)&&(t.stencilOp(Nt,Rn,Nn),oe=Nt,Re=Rn,Ne=Nn)},setLocked:function(Nt){F=Nt},setClear:function(Nt){dt!==Nt&&(t.clearStencil(Nt),dt=Nt)},reset:function(){F=!1,pe=null,te=null,Q=null,ve=null,oe=null,Re=null,Ne=null,dt=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let h={},f={},u={},p=new WeakMap,g=[],b=null,v=!1,d=null,x=null,M=null,_=null,w=null,N=null,T=null,y=new rt(0,0,0),R=0,C=!1,L=null,z=null,G=null,P=null,I=null;const B=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let A=!1,U=0;const V=t.getParameter(t.VERSION);V.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(V)[1]),A=U>=1):V.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),A=U>=2);let se=null,le={};const xe=t.getParameter(t.SCISSOR_BOX),ke=t.getParameter(t.VIEWPORT),Ke=new Zt().fromArray(xe),Be=new Zt().fromArray(ke);function re(F,pe,te,Q){const ve=new Uint8Array(4),oe=t.createTexture();t.bindTexture(F,oe),t.texParameteri(F,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(F,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let Re=0;Re<te;Re++)F===t.TEXTURE_3D||F===t.TEXTURE_2D_ARRAY?t.texImage3D(pe,0,t.RGBA,1,1,Q,0,t.RGBA,t.UNSIGNED_BYTE,ve):t.texImage2D(pe+Re,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,ve);return oe}const _e={};_e[t.TEXTURE_2D]=re(t.TEXTURE_2D,t.TEXTURE_2D,1),_e[t.TEXTURE_CUBE_MAP]=re(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),_e[t.TEXTURE_2D_ARRAY]=re(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),_e[t.TEXTURE_3D]=re(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),me(t.DEPTH_TEST),r.setFunc(po),Ct(!1),mt(H0),me(t.CULL_FACE),Ge(Na);function me(F){h[F]!==!0&&(t.enable(F),h[F]=!0)}function Le(F){h[F]!==!1&&(t.disable(F),h[F]=!1)}function ze(F,pe){return u[F]!==pe?(t.bindFramebuffer(F,pe),u[F]=pe,F===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=pe),F===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=pe),!0):!1}function Ie(F,pe){let te=g,Q=!1;if(F){te=p.get(pe),te===void 0&&(te=[],p.set(pe,te));const ve=F.textures;if(te.length!==ve.length||te[0]!==t.COLOR_ATTACHMENT0){for(let oe=0,Re=ve.length;oe<Re;oe++)te[oe]=t.COLOR_ATTACHMENT0+oe;te.length=ve.length,Q=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,Q=!0);Q&&t.drawBuffers(te)}function xt(F){return b!==F?(t.useProgram(F),b=F,!0):!1}const je={[zs]:t.FUNC_ADD,[nT]:t.FUNC_SUBTRACT,[iT]:t.FUNC_REVERSE_SUBTRACT};je[aT]=t.MIN,je[sT]=t.MAX;const lt={[rT]:t.ZERO,[oT]:t.ONE,[lT]:t.SRC_COLOR,[jh]:t.SRC_ALPHA,[pT]:t.SRC_ALPHA_SATURATE,[dT]:t.DST_COLOR,[uT]:t.DST_ALPHA,[cT]:t.ONE_MINUS_SRC_COLOR,[Wh]:t.ONE_MINUS_SRC_ALPHA,[hT]:t.ONE_MINUS_DST_COLOR,[fT]:t.ONE_MINUS_DST_ALPHA,[mT]:t.CONSTANT_COLOR,[gT]:t.ONE_MINUS_CONSTANT_COLOR,[vT]:t.CONSTANT_ALPHA,[_T]:t.ONE_MINUS_CONSTANT_ALPHA};function Ge(F,pe,te,Q,ve,oe,Re,Ne,dt,Nt){if(F===Na){v===!0&&(Le(t.BLEND),v=!1);return}if(v===!1&&(me(t.BLEND),v=!0),F!==tT){if(F!==d||Nt!==C){if((x!==zs||w!==zs)&&(t.blendEquation(t.FUNC_ADD),x=zs,w=zs),Nt)switch(F){case js:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xr:t.blendFunc(t.ONE,t.ONE);break;case G0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case V0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:ht("WebGLState: Invalid blending: ",F);break}else switch(F){case js:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Xr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case G0:ht("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case V0:ht("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ht("WebGLState: Invalid blending: ",F);break}M=null,_=null,N=null,T=null,y.set(0,0,0),R=0,d=F,C=Nt}return}ve=ve||pe,oe=oe||te,Re=Re||Q,(pe!==x||ve!==w)&&(t.blendEquationSeparate(je[pe],je[ve]),x=pe,w=ve),(te!==M||Q!==_||oe!==N||Re!==T)&&(t.blendFuncSeparate(lt[te],lt[Q],lt[oe],lt[Re]),M=te,_=Q,N=oe,T=Re),(Ne.equals(y)===!1||dt!==R)&&(t.blendColor(Ne.r,Ne.g,Ne.b,dt),y.copy(Ne),R=dt),d=F,C=!1}function qe(F,pe){F.side===Ma?Le(t.CULL_FACE):me(t.CULL_FACE);let te=F.side===Yn;pe&&(te=!te),Ct(te),F.blending===js&&F.transparent===!1?Ge(Na):Ge(F.blending,F.blendEquation,F.blendSrc,F.blendDst,F.blendEquationAlpha,F.blendSrcAlpha,F.blendDstAlpha,F.blendColor,F.blendAlpha,F.premultipliedAlpha),r.setFunc(F.depthFunc),r.setTest(F.depthTest),r.setMask(F.depthWrite),s.setMask(F.colorWrite);const Q=F.stencilWrite;o.setTest(Q),Q&&(o.setMask(F.stencilWriteMask),o.setFunc(F.stencilFunc,F.stencilRef,F.stencilFuncMask),o.setOp(F.stencilFail,F.stencilZFail,F.stencilZPass)),Ot(F.polygonOffset,F.polygonOffsetFactor,F.polygonOffsetUnits),F.alphaToCoverage===!0?me(t.SAMPLE_ALPHA_TO_COVERAGE):Le(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ct(F){L!==F&&(F?t.frontFace(t.CW):t.frontFace(t.CCW),L=F)}function mt(F){F!==$E?(me(t.CULL_FACE),F!==z&&(F===H0?t.cullFace(t.BACK):F===JE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Le(t.CULL_FACE),z=F}function zt(F){F!==G&&(A&&t.lineWidth(F),G=F)}function Ot(F,pe,te){F?(me(t.POLYGON_OFFSET_FILL),(P!==pe||I!==te)&&(P=pe,I=te,r.getReversed()&&(pe=-pe),t.polygonOffset(pe,te))):Le(t.POLYGON_OFFSET_FILL)}function Rt(F){F?me(t.SCISSOR_TEST):Le(t.SCISSOR_TEST)}function ye(F){F===void 0&&(F=t.TEXTURE0+B-1),se!==F&&(t.activeTexture(F),se=F)}function H(F,pe,te){te===void 0&&(se===null?te=t.TEXTURE0+B-1:te=se);let Q=le[te];Q===void 0&&(Q={type:void 0,texture:void 0},le[te]=Q),(Q.type!==F||Q.texture!==pe)&&(se!==te&&(t.activeTexture(te),se=te),t.bindTexture(F,pe||_e[F]),Q.type=F,Q.texture=pe)}function nt(){const F=le[se];F!==void 0&&F.type!==void 0&&(t.bindTexture(F.type,null),F.type=void 0,F.texture=void 0)}function Ve(){try{t.compressedTexImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function D(){try{t.compressedTexImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function S(){try{t.texSubImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function j(){try{t.texSubImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function Y(){try{t.compressedTexSubImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function J(){try{t.compressedTexSubImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function de(){try{t.texStorage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function ge(){try{t.texStorage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function ee(){try{t.texImage2D(...arguments)}catch(F){ht("WebGLState:",F)}}function W(){try{t.texImage3D(...arguments)}catch(F){ht("WebGLState:",F)}}function ie(F){return f[F]!==void 0?f[F]:t.getParameter(F)}function ue(F,pe){f[F]!==pe&&(t.pixelStorei(F,pe),f[F]=pe)}function O(F){Ke.equals(F)===!1&&(t.scissor(F.x,F.y,F.z,F.w),Ke.copy(F))}function k(F){Be.equals(F)===!1&&(t.viewport(F.x,F.y,F.z,F.w),Be.copy(F))}function he(F,pe){let te=c.get(pe);te===void 0&&(te=new WeakMap,c.set(pe,te));let Q=te.get(F);Q===void 0&&(Q=t.getUniformBlockIndex(pe,F.name),te.set(F,Q))}function fe(F,pe){const Q=c.get(pe).get(F);l.get(pe)!==Q&&(t.uniformBlockBinding(pe,Q,F.__bindingPointIndex),l.set(pe,Q))}function Ce(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),h={},f={},se=null,le={},u={},p=new WeakMap,g=[],b=null,v=!1,d=null,x=null,M=null,_=null,w=null,N=null,T=null,y=new rt(0,0,0),R=0,C=!1,L=null,z=null,G=null,P=null,I=null,Ke.set(0,0,t.canvas.width,t.canvas.height),Be.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:me,disable:Le,bindFramebuffer:ze,drawBuffers:Ie,useProgram:xt,setBlending:Ge,setMaterial:qe,setFlipSided:Ct,setCullFace:mt,setLineWidth:zt,setPolygonOffset:Ot,setScissorTest:Rt,activeTexture:ye,bindTexture:H,unbindTexture:nt,compressedTexImage2D:Ve,compressedTexImage3D:D,texImage2D:ee,texImage3D:W,pixelStorei:ue,getParameter:ie,updateUBOMapping:he,uniformBlockBinding:fe,texStorage2D:de,texStorage3D:ge,texSubImage2D:S,texSubImage3D:j,compressedTexSubImage2D:Y,compressedTexSubImage3D:J,scissor:O,viewport:k,reset:Ce}}function e3(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new _t,h=new WeakMap,f=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(D,S){return g?new OffscreenCanvas(D,S):$u("canvas")}function v(D,S,j){let Y=1;const J=Ve(D);if((J.width>j||J.height>j)&&(Y=j/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&D instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&D instanceof ImageBitmap||typeof VideoFrame<"u"&&D instanceof VideoFrame){const de=Math.floor(Y*J.width),ge=Math.floor(Y*J.height);u===void 0&&(u=b(de,ge));const ee=S?b(de,ge):u;return ee.width=de,ee.height=ge,ee.getContext("2d").drawImage(D,0,0,de,ge),Fe("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+de+"x"+ge+")."),ee}else return"data"in D&&Fe("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),D;return D}function d(D){return D.generateMipmaps}function x(D){t.generateMipmap(D)}function M(D){return D.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:D.isWebGL3DRenderTarget?t.TEXTURE_3D:D.isWebGLArrayRenderTarget||D.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function _(D,S,j,Y,J,de=!1){if(D!==null){if(t[D]!==void 0)return t[D];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+D+"'")}let ge;Y&&(ge=e.get("EXT_texture_norm16"),ge||Fe("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ee=S;if(S===t.RED&&(j===t.FLOAT&&(ee=t.R32F),j===t.HALF_FLOAT&&(ee=t.R16F),j===t.UNSIGNED_BYTE&&(ee=t.R8),j===t.UNSIGNED_SHORT&&ge&&(ee=ge.R16_EXT),j===t.SHORT&&ge&&(ee=ge.R16_SNORM_EXT)),S===t.RED_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.R8UI),j===t.UNSIGNED_SHORT&&(ee=t.R16UI),j===t.UNSIGNED_INT&&(ee=t.R32UI),j===t.BYTE&&(ee=t.R8I),j===t.SHORT&&(ee=t.R16I),j===t.INT&&(ee=t.R32I)),S===t.RG&&(j===t.FLOAT&&(ee=t.RG32F),j===t.HALF_FLOAT&&(ee=t.RG16F),j===t.UNSIGNED_BYTE&&(ee=t.RG8),j===t.UNSIGNED_SHORT&&ge&&(ee=ge.RG16_EXT),j===t.SHORT&&ge&&(ee=ge.RG16_SNORM_EXT)),S===t.RG_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.RG8UI),j===t.UNSIGNED_SHORT&&(ee=t.RG16UI),j===t.UNSIGNED_INT&&(ee=t.RG32UI),j===t.BYTE&&(ee=t.RG8I),j===t.SHORT&&(ee=t.RG16I),j===t.INT&&(ee=t.RG32I)),S===t.RGB_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.RGB8UI),j===t.UNSIGNED_SHORT&&(ee=t.RGB16UI),j===t.UNSIGNED_INT&&(ee=t.RGB32UI),j===t.BYTE&&(ee=t.RGB8I),j===t.SHORT&&(ee=t.RGB16I),j===t.INT&&(ee=t.RGB32I)),S===t.RGBA_INTEGER&&(j===t.UNSIGNED_BYTE&&(ee=t.RGBA8UI),j===t.UNSIGNED_SHORT&&(ee=t.RGBA16UI),j===t.UNSIGNED_INT&&(ee=t.RGBA32UI),j===t.BYTE&&(ee=t.RGBA8I),j===t.SHORT&&(ee=t.RGBA16I),j===t.INT&&(ee=t.RGBA32I)),S===t.RGB&&(j===t.UNSIGNED_SHORT&&ge&&(ee=ge.RGB16_EXT),j===t.SHORT&&ge&&(ee=ge.RGB16_SNORM_EXT),j===t.UNSIGNED_INT_5_9_9_9_REV&&(ee=t.RGB9_E5),j===t.UNSIGNED_INT_10F_11F_11F_REV&&(ee=t.R11F_G11F_B10F)),S===t.RGBA){const W=de?Ku:ct.getTransfer(J);j===t.FLOAT&&(ee=t.RGBA32F),j===t.HALF_FLOAT&&(ee=t.RGBA16F),j===t.UNSIGNED_BYTE&&(ee=W===Tt?t.SRGB8_ALPHA8:t.RGBA8),j===t.UNSIGNED_SHORT&&ge&&(ee=ge.RGBA16_EXT),j===t.SHORT&&ge&&(ee=ge.RGBA16_SNORM_EXT),j===t.UNSIGNED_SHORT_4_4_4_4&&(ee=t.RGBA4),j===t.UNSIGNED_SHORT_5_5_5_1&&(ee=t.RGB5_A1)}return(ee===t.R16F||ee===t.R32F||ee===t.RG16F||ee===t.RG32F||ee===t.RGBA16F||ee===t.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function w(D,S){let j;return D?S===null||S===ta||S===Ol?j=t.DEPTH24_STENCIL8:S===zi?j=t.DEPTH32F_STENCIL8:S===Ll&&(j=t.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===ta||S===Ol?j=t.DEPTH_COMPONENT24:S===zi?j=t.DEPTH_COMPONENT32F:S===Ll&&(j=t.DEPTH_COMPONENT16),j}function N(D,S){return d(D)===!0||D.isFramebufferTexture&&D.minFilter!==Mn&&D.minFilter!==wn?Math.log2(Math.max(S.width,S.height))+1:D.mipmaps!==void 0&&D.mipmaps.length>0?D.mipmaps.length:D.isCompressedTexture&&Array.isArray(D.image)?S.mipmaps.length:1}function T(D){const S=D.target;S.removeEventListener("dispose",T),R(S),S.isVideoTexture&&h.delete(S),S.isHTMLTexture&&f.delete(S)}function y(D){const S=D.target;S.removeEventListener("dispose",y),L(S)}function R(D){const S=i.get(D);if(S.__webglInit===void 0)return;const j=D.source,Y=p.get(j);if(Y){const J=Y[S.__cacheKey];J.usedTimes--,J.usedTimes===0&&C(D),Object.keys(Y).length===0&&p.delete(j)}i.remove(D)}function C(D){const S=i.get(D);t.deleteTexture(S.__webglTexture);const j=D.source,Y=p.get(j);delete Y[S.__cacheKey],r.memory.textures--}function L(D){const S=i.get(D);if(D.depthTexture&&(D.depthTexture.dispose(),i.remove(D.depthTexture)),D.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(S.__webglFramebuffer[Y]))for(let J=0;J<S.__webglFramebuffer[Y].length;J++)t.deleteFramebuffer(S.__webglFramebuffer[Y][J]);else t.deleteFramebuffer(S.__webglFramebuffer[Y]);S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer[Y])}else{if(Array.isArray(S.__webglFramebuffer))for(let Y=0;Y<S.__webglFramebuffer.length;Y++)t.deleteFramebuffer(S.__webglFramebuffer[Y]);else t.deleteFramebuffer(S.__webglFramebuffer);if(S.__webglDepthbuffer&&t.deleteRenderbuffer(S.__webglDepthbuffer),S.__webglMultisampledFramebuffer&&t.deleteFramebuffer(S.__webglMultisampledFramebuffer),S.__webglColorRenderbuffer)for(let Y=0;Y<S.__webglColorRenderbuffer.length;Y++)S.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(S.__webglColorRenderbuffer[Y]);S.__webglDepthRenderbuffer&&t.deleteRenderbuffer(S.__webglDepthRenderbuffer)}const j=D.textures;for(let Y=0,J=j.length;Y<J;Y++){const de=i.get(j[Y]);de.__webglTexture&&(t.deleteTexture(de.__webglTexture),r.memory.textures--),i.remove(j[Y])}i.remove(D)}let z=0;function G(){z=0}function P(){return z}function I(D){z=D}function B(){const D=z;return D>=a.maxTextures&&Fe("WebGLTextures: Trying to use "+D+" texture units while this GPU supports only "+a.maxTextures),z+=1,D}function A(D){const S=[];return S.push(D.wrapS),S.push(D.wrapT),S.push(D.wrapR||0),S.push(D.magFilter),S.push(D.minFilter),S.push(D.anisotropy),S.push(D.internalFormat),S.push(D.format),S.push(D.type),S.push(D.generateMipmaps),S.push(D.premultiplyAlpha),S.push(D.flipY),S.push(D.unpackAlignment),S.push(D.colorSpace),S.join()}function U(D,S){const j=i.get(D);if(D.isVideoTexture&&H(D),D.isRenderTargetTexture===!1&&D.isExternalTexture!==!0&&D.version>0&&j.__version!==D.version){const Y=D.image;if(Y===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{Le(j,D,S);return}}else D.isExternalTexture&&(j.__webglTexture=D.sourceTexture?D.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,j.__webglTexture,t.TEXTURE0+S)}function V(D,S){const j=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&j.__version!==D.version){Le(j,D,S);return}else D.isExternalTexture&&(j.__webglTexture=D.sourceTexture?D.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,j.__webglTexture,t.TEXTURE0+S)}function se(D,S){const j=i.get(D);if(D.isRenderTargetTexture===!1&&D.version>0&&j.__version!==D.version){Le(j,D,S);return}n.bindTexture(t.TEXTURE_3D,j.__webglTexture,t.TEXTURE0+S)}function le(D,S){const j=i.get(D);if(D.isCubeDepthTexture!==!0&&D.version>0&&j.__version!==D.version){ze(j,D,S);return}n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture,t.TEXTURE0+S)}const xe={[ep]:t.REPEAT,[Aa]:t.CLAMP_TO_EDGE,[tp]:t.MIRRORED_REPEAT},ke={[Mn]:t.NEAREST,[yT]:t.NEAREST_MIPMAP_NEAREST,[mc]:t.NEAREST_MIPMAP_LINEAR,[wn]:t.LINEAR,[hd]:t.LINEAR_MIPMAP_NEAREST,[Bs]:t.LINEAR_MIPMAP_LINEAR},Ke={[ET]:t.NEVER,[RT]:t.ALWAYS,[TT]:t.LESS,[Km]:t.LEQUAL,[AT]:t.EQUAL,[Qm]:t.GEQUAL,[wT]:t.GREATER,[CT]:t.NOTEQUAL};function Be(D,S){if(S.type===zi&&e.has("OES_texture_float_linear")===!1&&(S.magFilter===wn||S.magFilter===hd||S.magFilter===mc||S.magFilter===Bs||S.minFilter===wn||S.minFilter===hd||S.minFilter===mc||S.minFilter===Bs)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(D,t.TEXTURE_WRAP_S,xe[S.wrapS]),t.texParameteri(D,t.TEXTURE_WRAP_T,xe[S.wrapT]),(D===t.TEXTURE_3D||D===t.TEXTURE_2D_ARRAY)&&t.texParameteri(D,t.TEXTURE_WRAP_R,xe[S.wrapR]),t.texParameteri(D,t.TEXTURE_MAG_FILTER,ke[S.magFilter]),t.texParameteri(D,t.TEXTURE_MIN_FILTER,ke[S.minFilter]),S.compareFunction&&(t.texParameteri(D,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(D,t.TEXTURE_COMPARE_FUNC,Ke[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Mn||S.minFilter!==mc&&S.minFilter!==Bs||S.type===zi&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||i.get(S).__currentAnisotropy){const j=e.get("EXT_texture_filter_anisotropic");t.texParameterf(D,j.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,a.getMaxAnisotropy())),i.get(S).__currentAnisotropy=S.anisotropy}}}function re(D,S){let j=!1;D.__webglInit===void 0&&(D.__webglInit=!0,S.addEventListener("dispose",T));const Y=S.source;let J=p.get(Y);J===void 0&&(J={},p.set(Y,J));const de=A(S);if(de!==D.__cacheKey){J[de]===void 0&&(J[de]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,j=!0),J[de].usedTimes++;const ge=J[D.__cacheKey];ge!==void 0&&(J[D.__cacheKey].usedTimes--,ge.usedTimes===0&&C(S)),D.__cacheKey=de,D.__webglTexture=J[de].texture}return j}function _e(D,S,j){return Math.floor(Math.floor(D/j)/S)}function me(D,S,j,Y){const de=D.updateRanges;if(de.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,S.width,S.height,j,Y,S.data);else{de.sort((ue,O)=>ue.start-O.start);let ge=0;for(let ue=1;ue<de.length;ue++){const O=de[ge],k=de[ue],he=O.start+O.count,fe=_e(k.start,S.width,4),Ce=_e(O.start,S.width,4);k.start<=he+1&&fe===Ce&&_e(k.start+k.count-1,S.width,4)===fe?O.count=Math.max(O.count,k.start+k.count-O.start):(++ge,de[ge]=k)}de.length=ge+1;const ee=n.getParameter(t.UNPACK_ROW_LENGTH),W=n.getParameter(t.UNPACK_SKIP_PIXELS),ie=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,S.width);for(let ue=0,O=de.length;ue<O;ue++){const k=de[ue],he=Math.floor(k.start/4),fe=Math.ceil(k.count/4),Ce=he%S.width,F=Math.floor(he/S.width),pe=fe,te=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),n.pixelStorei(t.UNPACK_SKIP_ROWS,F),n.texSubImage2D(t.TEXTURE_2D,0,Ce,F,pe,te,j,Y,S.data)}D.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,ee),n.pixelStorei(t.UNPACK_SKIP_PIXELS,W),n.pixelStorei(t.UNPACK_SKIP_ROWS,ie)}}function Le(D,S,j){let Y=t.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=t.TEXTURE_3D);const J=re(D,S),de=S.source;n.bindTexture(Y,D.__webglTexture,t.TEXTURE0+j);const ge=i.get(de);if(de.version!==ge.__version||J===!0){if(n.activeTexture(t.TEXTURE0+j),(typeof ImageBitmap<"u"&&S.image instanceof ImageBitmap)===!1){const te=ct.getPrimaries(ct.workingColorSpace),Q=S.colorSpace===es?null:ct.getPrimaries(S.colorSpace),ve=S.colorSpace===es||te===Q?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,ve)}n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment);let W=v(S.image,!1,a.maxTextureSize);W=nt(S,W);const ie=s.convert(S.format,S.colorSpace),ue=s.convert(S.type);let O=_(S.internalFormat,ie,ue,S.normalized,S.colorSpace,S.isVideoTexture);Be(Y,S);let k;const he=S.mipmaps,fe=S.isVideoTexture!==!0,Ce=ge.__version===void 0||J===!0,F=de.dataReady,pe=N(S,W);if(S.isDepthTexture)O=w(S.format===Fs,S.type),Ce&&(fe?n.texStorage2D(t.TEXTURE_2D,1,O,W.width,W.height):n.texImage2D(t.TEXTURE_2D,0,O,W.width,W.height,0,ie,ue,null));else if(S.isDataTexture)if(he.length>0){fe&&Ce&&n.texStorage2D(t.TEXTURE_2D,pe,O,he[0].width,he[0].height);for(let te=0,Q=he.length;te<Q;te++)k=he[te],fe?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,k.width,k.height,ie,ue,k.data):n.texImage2D(t.TEXTURE_2D,te,O,k.width,k.height,0,ie,ue,k.data);S.generateMipmaps=!1}else fe?(Ce&&n.texStorage2D(t.TEXTURE_2D,pe,O,W.width,W.height),F&&me(S,W,ie,ue)):n.texImage2D(t.TEXTURE_2D,0,O,W.width,W.height,0,ie,ue,W.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){fe&&Ce&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,O,he[0].width,he[0].height,W.depth);for(let te=0,Q=he.length;te<Q;te++)if(k=he[te],S.format!==Ii)if(ie!==null)if(fe){if(F)if(S.layerUpdates.size>0){const ve=Mv(k.width,k.height,S.format,S.type);for(const oe of S.layerUpdates){const Re=k.data.subarray(oe*ve/k.data.BYTES_PER_ELEMENT,(oe+1)*ve/k.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,oe,k.width,k.height,1,ie,Re)}S.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,k.width,k.height,W.depth,ie,k.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,te,O,k.width,k.height,W.depth,0,k.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?F&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,te,0,0,0,k.width,k.height,W.depth,ie,ue,k.data):n.texImage3D(t.TEXTURE_2D_ARRAY,te,O,k.width,k.height,W.depth,0,ie,ue,k.data)}else{fe&&Ce&&n.texStorage2D(t.TEXTURE_2D,pe,O,he[0].width,he[0].height);for(let te=0,Q=he.length;te<Q;te++)k=he[te],S.format!==Ii?ie!==null?fe?F&&n.compressedTexSubImage2D(t.TEXTURE_2D,te,0,0,k.width,k.height,ie,k.data):n.compressedTexImage2D(t.TEXTURE_2D,te,O,k.width,k.height,0,k.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,k.width,k.height,ie,ue,k.data):n.texImage2D(t.TEXTURE_2D,te,O,k.width,k.height,0,ie,ue,k.data)}else if(S.isDataArrayTexture)if(fe){if(Ce&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,O,W.width,W.height,W.depth),F)if(S.layerUpdates.size>0){const te=Mv(W.width,W.height,S.format,S.type);for(const Q of S.layerUpdates){const ve=W.data.subarray(Q*te/W.data.BYTES_PER_ELEMENT,(Q+1)*te/W.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,Q,W.width,W.height,1,ie,ue,ve)}S.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,W.width,W.height,W.depth,ie,ue,W.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,O,W.width,W.height,W.depth,0,ie,ue,W.data);else if(S.isData3DTexture)fe?(Ce&&n.texStorage3D(t.TEXTURE_3D,pe,O,W.width,W.height,W.depth),F&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,W.width,W.height,W.depth,ie,ue,W.data)):n.texImage3D(t.TEXTURE_3D,0,O,W.width,W.height,W.depth,0,ie,ue,W.data);else if(S.isFramebufferTexture){if(Ce)if(fe)n.texStorage2D(t.TEXTURE_2D,pe,O,W.width,W.height);else{let te=W.width,Q=W.height;for(let ve=0;ve<pe;ve++)n.texImage2D(t.TEXTURE_2D,ve,O,te,Q,0,ie,ue,null),te>>=1,Q>>=1}}else if(S.isHTMLTexture){if("texElementImage2D"in t){const te=t.canvas;if(te.hasAttribute("layoutsubtree")||te.setAttribute("layoutsubtree","true"),W.parentNode!==te){te.appendChild(W),f.add(S),te.onpaint=Q=>{const ve=Q.changedElements;for(const oe of f)ve.includes(oe.image)&&(oe.needsUpdate=!0)},te.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,W);else{const ve=t.RGBA,oe=t.RGBA,Re=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,ve,oe,Re,W)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(he.length>0){if(fe&&Ce){const te=Ve(he[0]);n.texStorage2D(t.TEXTURE_2D,pe,O,te.width,te.height)}for(let te=0,Q=he.length;te<Q;te++)k=he[te],fe?F&&n.texSubImage2D(t.TEXTURE_2D,te,0,0,ie,ue,k):n.texImage2D(t.TEXTURE_2D,te,O,ie,ue,k);S.generateMipmaps=!1}else if(fe){if(Ce){const te=Ve(W);n.texStorage2D(t.TEXTURE_2D,pe,O,te.width,te.height)}F&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ie,ue,W)}else n.texImage2D(t.TEXTURE_2D,0,O,ie,ue,W);d(S)&&x(Y),ge.__version=de.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function ze(D,S,j){if(S.image.length!==6)return;const Y=re(D,S),J=S.source;n.bindTexture(t.TEXTURE_CUBE_MAP,D.__webglTexture,t.TEXTURE0+j);const de=i.get(J);if(J.version!==de.__version||Y===!0){n.activeTexture(t.TEXTURE0+j);const ge=ct.getPrimaries(ct.workingColorSpace),ee=S.colorSpace===es?null:ct.getPrimaries(S.colorSpace),W=S.colorSpace===es||ge===ee?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,S.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,S.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,W);const ie=S.isCompressedTexture||S.image[0].isCompressedTexture,ue=S.image[0]&&S.image[0].isDataTexture,O=[];for(let oe=0;oe<6;oe++)!ie&&!ue?O[oe]=v(S.image[oe],!0,a.maxCubemapSize):O[oe]=ue?S.image[oe].image:S.image[oe],O[oe]=nt(S,O[oe]);const k=O[0],he=s.convert(S.format,S.colorSpace),fe=s.convert(S.type),Ce=_(S.internalFormat,he,fe,S.normalized,S.colorSpace),F=S.isVideoTexture!==!0,pe=de.__version===void 0||Y===!0,te=J.dataReady;let Q=N(S,k);Be(t.TEXTURE_CUBE_MAP,S);let ve;if(ie){F&&pe&&n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,Ce,k.width,k.height);for(let oe=0;oe<6;oe++){ve=O[oe].mipmaps;for(let Re=0;Re<ve.length;Re++){const Ne=ve[Re];S.format!==Ii?he!==null?F?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,0,0,Ne.width,Ne.height,he,Ne.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,Ce,Ne.width,Ne.height,0,Ne.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,0,0,Ne.width,Ne.height,he,fe,Ne.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re,Ce,Ne.width,Ne.height,0,he,fe,Ne.data)}}}else{if(ve=S.mipmaps,F&&pe){ve.length>0&&Q++;const oe=Ve(O[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,Q,Ce,oe.width,oe.height)}for(let oe=0;oe<6;oe++)if(ue){F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,O[oe].width,O[oe].height,he,fe,O[oe].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ce,O[oe].width,O[oe].height,0,he,fe,O[oe].data);for(let Re=0;Re<ve.length;Re++){const dt=ve[Re].image[oe].image;F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,0,0,dt.width,dt.height,he,fe,dt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,Ce,dt.width,dt.height,0,he,fe,dt.data)}}else{F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,0,0,he,fe,O[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,Ce,he,fe,O[oe]);for(let Re=0;Re<ve.length;Re++){const Ne=ve[Re];F?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,0,0,he,fe,Ne.image[oe]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,Re+1,Ce,he,fe,Ne.image[oe])}}}d(S)&&x(t.TEXTURE_CUBE_MAP),de.__version=J.version,S.onUpdate&&S.onUpdate(S)}D.__version=S.version}function Ie(D,S,j,Y,J,de){const ge=s.convert(j.format,j.colorSpace),ee=s.convert(j.type),W=_(j.internalFormat,ge,ee,j.normalized,j.colorSpace),ie=i.get(S),ue=i.get(j);if(ue.__renderTarget=S,!ie.__hasExternalTextures){const O=Math.max(1,S.width>>de),k=Math.max(1,S.height>>de);J===t.TEXTURE_3D||J===t.TEXTURE_2D_ARRAY?n.texImage3D(J,de,W,O,k,S.depth,0,ge,ee,null):n.texImage2D(J,de,W,O,k,0,ge,ee,null)}n.bindFramebuffer(t.FRAMEBUFFER,D),ye(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,J,ue.__webglTexture,0,Rt(S)):(J===t.TEXTURE_2D||J>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,J,ue.__webglTexture,de),n.bindFramebuffer(t.FRAMEBUFFER,null)}function xt(D,S,j){if(t.bindRenderbuffer(t.RENDERBUFFER,D),S.depthBuffer){const Y=S.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,de=w(S.stencilBuffer,J),ge=S.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;ye(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Rt(S),de,S.width,S.height):j?t.renderbufferStorageMultisample(t.RENDERBUFFER,Rt(S),de,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,de,S.width,S.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ge,t.RENDERBUFFER,D)}else{const Y=S.textures;for(let J=0;J<Y.length;J++){const de=Y[J],ge=s.convert(de.format,de.colorSpace),ee=s.convert(de.type),W=_(de.internalFormat,ge,ee,de.normalized,de.colorSpace);ye(S)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,Rt(S),W,S.width,S.height):j?t.renderbufferStorageMultisample(t.RENDERBUFFER,Rt(S),W,S.width,S.height):t.renderbufferStorage(t.RENDERBUFFER,W,S.width,S.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function je(D,S,j){const Y=S.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,D),!(S.depthTexture&&S.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(S.depthTexture);if(J.__renderTarget=S,(!J.__webglTexture||S.depthTexture.image.width!==S.width||S.depthTexture.image.height!==S.height)&&(S.depthTexture.image.width=S.width,S.depthTexture.image.height=S.height,S.depthTexture.needsUpdate=!0),Y){if(J.__webglInit===void 0&&(J.__webglInit=!0,S.depthTexture.addEventListener("dispose",T)),J.__webglTexture===void 0){J.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),Be(t.TEXTURE_CUBE_MAP,S.depthTexture);const ie=s.convert(S.depthTexture.format),ue=s.convert(S.depthTexture.type);let O;S.depthTexture.format===Ba?O=t.DEPTH_COMPONENT24:S.depthTexture.format===Fs&&(O=t.DEPTH24_STENCIL8);for(let k=0;k<6;k++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+k,0,O,S.width,S.height,0,ie,ue,null)}}else U(S.depthTexture,0);const de=J.__webglTexture,ge=Rt(S),ee=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+j:t.TEXTURE_2D,W=S.depthTexture.format===Fs?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(S.depthTexture.format===Ba)ye(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,W,ee,de,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,W,ee,de,0);else if(S.depthTexture.format===Fs)ye(S)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,W,ee,de,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,W,ee,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function lt(D){const S=i.get(D),j=D.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==D.depthTexture){const Y=D.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const J=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),S.__depthDisposeCallback=J}S.__boundDepthTexture=Y}if(D.depthTexture&&!S.__autoAllocateDepthBuffer)if(j)for(let Y=0;Y<6;Y++)je(S.__webglFramebuffer[Y],D,Y);else{const Y=D.texture.mipmaps;Y&&Y.length>0?je(S.__webglFramebuffer[0],D,0):je(S.__webglFramebuffer,D,0)}else if(j){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=t.createRenderbuffer(),xt(S.__webglDepthbuffer[Y],D,!1);else{const J=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,de),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,de)}}else{const Y=D.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=t.createRenderbuffer(),xt(S.__webglDepthbuffer,D,!1);else{const J=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,de=S.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,de),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,de)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ge(D,S,j){const Y=i.get(D);S!==void 0&&Ie(Y.__webglFramebuffer,D,D.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),j!==void 0&&lt(D)}function qe(D){const S=D.texture,j=i.get(D),Y=i.get(S);D.addEventListener("dispose",y);const J=D.textures,de=D.isWebGLCubeRenderTarget===!0,ge=J.length>1;if(ge||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=S.version,r.memory.textures++),de){j.__webglFramebuffer=[];for(let ee=0;ee<6;ee++)if(S.mipmaps&&S.mipmaps.length>0){j.__webglFramebuffer[ee]=[];for(let W=0;W<S.mipmaps.length;W++)j.__webglFramebuffer[ee][W]=t.createFramebuffer()}else j.__webglFramebuffer[ee]=t.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){j.__webglFramebuffer=[];for(let ee=0;ee<S.mipmaps.length;ee++)j.__webglFramebuffer[ee]=t.createFramebuffer()}else j.__webglFramebuffer=t.createFramebuffer();if(ge)for(let ee=0,W=J.length;ee<W;ee++){const ie=i.get(J[ee]);ie.__webglTexture===void 0&&(ie.__webglTexture=t.createTexture(),r.memory.textures++)}if(D.samples>0&&ye(D)===!1){j.__webglMultisampledFramebuffer=t.createFramebuffer(),j.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,j.__webglMultisampledFramebuffer);for(let ee=0;ee<J.length;ee++){const W=J[ee];j.__webglColorRenderbuffer[ee]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,j.__webglColorRenderbuffer[ee]);const ie=s.convert(W.format,W.colorSpace),ue=s.convert(W.type),O=_(W.internalFormat,ie,ue,W.normalized,W.colorSpace,D.isXRRenderTarget===!0),k=Rt(D);t.renderbufferStorageMultisample(t.RENDERBUFFER,k,O,D.width,D.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ee,t.RENDERBUFFER,j.__webglColorRenderbuffer[ee])}t.bindRenderbuffer(t.RENDERBUFFER,null),D.depthBuffer&&(j.__webglDepthRenderbuffer=t.createRenderbuffer(),xt(j.__webglDepthRenderbuffer,D,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(de){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),Be(t.TEXTURE_CUBE_MAP,S);for(let ee=0;ee<6;ee++)if(S.mipmaps&&S.mipmaps.length>0)for(let W=0;W<S.mipmaps.length;W++)Ie(j.__webglFramebuffer[ee][W],D,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,W);else Ie(j.__webglFramebuffer[ee],D,S,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ee,0);d(S)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ge){for(let ee=0,W=J.length;ee<W;ee++){const ie=J[ee],ue=i.get(ie);let O=t.TEXTURE_2D;(D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(O=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(O,ue.__webglTexture),Be(O,ie),Ie(j.__webglFramebuffer,D,ie,t.COLOR_ATTACHMENT0+ee,O,0),d(ie)&&x(O)}n.unbindTexture()}else{let ee=t.TEXTURE_2D;if((D.isWebGL3DRenderTarget||D.isWebGLArrayRenderTarget)&&(ee=D.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,Y.__webglTexture),Be(ee,S),S.mipmaps&&S.mipmaps.length>0)for(let W=0;W<S.mipmaps.length;W++)Ie(j.__webglFramebuffer[W],D,S,t.COLOR_ATTACHMENT0,ee,W);else Ie(j.__webglFramebuffer,D,S,t.COLOR_ATTACHMENT0,ee,0);d(S)&&x(ee),n.unbindTexture()}D.depthBuffer&&lt(D)}function Ct(D){const S=D.textures;for(let j=0,Y=S.length;j<Y;j++){const J=S[j];if(d(J)){const de=M(D),ge=i.get(J).__webglTexture;n.bindTexture(de,ge),x(de),n.unbindTexture()}}}const mt=[],zt=[];function Ot(D){if(D.samples>0){if(ye(D)===!1){const S=D.textures,j=D.width,Y=D.height;let J=t.COLOR_BUFFER_BIT;const de=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=i.get(D),ee=S.length>1;if(ee)for(let ie=0;ie<S.length;ie++)n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const W=D.texture.mipmaps;W&&W.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let ie=0;ie<S.length;ie++){if(D.resolveDepthBuffer&&(D.depthBuffer&&(J|=t.DEPTH_BUFFER_BIT),D.stencilBuffer&&D.resolveStencilBuffer&&(J|=t.STENCIL_BUFFER_BIT)),ee){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ge.__webglColorRenderbuffer[ie]);const ue=i.get(S[ie]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ue,0)}t.blitFramebuffer(0,0,j,Y,0,0,j,Y,J,t.NEAREST),l===!0&&(mt.length=0,zt.length=0,mt.push(t.COLOR_ATTACHMENT0+ie),D.depthBuffer&&D.resolveDepthBuffer===!1&&(mt.push(de),zt.push(de),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,zt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,mt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ee)for(let ie=0;ie<S.length;ie++){n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,ge.__webglColorRenderbuffer[ie]);const ue=i.get(S[ie]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.TEXTURE_2D,ue,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(D.depthBuffer&&D.resolveDepthBuffer===!1&&l){const S=D.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[S])}}}function Rt(D){return Math.min(a.maxSamples,D.samples)}function ye(D){const S=i.get(D);return D.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function H(D){const S=r.render.frame;h.get(D)!==S&&(h.set(D,S),D.update())}function nt(D,S){const j=D.colorSpace,Y=D.format,J=D.type;return D.isCompressedTexture===!0||D.isVideoTexture===!0||j!==Zu&&j!==es&&(ct.getTransfer(j)===Tt?(Y!==Ii||J!==bi)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ht("WebGLTextures: Unsupported texture color space:",j)),S}function Ve(D){return typeof HTMLImageElement<"u"&&D instanceof HTMLImageElement?(c.width=D.naturalWidth||D.width,c.height=D.naturalHeight||D.height):typeof VideoFrame<"u"&&D instanceof VideoFrame?(c.width=D.displayWidth,c.height=D.displayHeight):(c.width=D.width,c.height=D.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=G,this.getTextureUnits=P,this.setTextureUnits=I,this.setTexture2D=U,this.setTexture2DArray=V,this.setTexture3D=se,this.setTextureCube=le,this.rebindTextures=Ge,this.setupRenderTarget=qe,this.updateRenderTargetMipmap=Ct,this.updateMultisampleRenderTarget=Ot,this.setupDepthRenderbuffer=lt,this.setupFrameBufferTexture=Ie,this.useMultisampledRTT=ye,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function t3(t,e){function n(i,a=es){let s;const r=ct.getTransfer(a);if(i===bi)return t.UNSIGNED_BYTE;if(i===Xm)return t.UNSIGNED_SHORT_4_4_4_4;if(i===jm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===vy)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_y)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===my)return t.BYTE;if(i===gy)return t.SHORT;if(i===Ll)return t.UNSIGNED_SHORT;if(i===km)return t.INT;if(i===ta)return t.UNSIGNED_INT;if(i===zi)return t.FLOAT;if(i===Ia)return t.HALF_FLOAT;if(i===xy)return t.ALPHA;if(i===Sy)return t.RGB;if(i===Ii)return t.RGBA;if(i===Ba)return t.DEPTH_COMPONENT;if(i===Fs)return t.DEPTH_STENCIL;if(i===Wm)return t.RED;if(i===qm)return t.RED_INTEGER;if(i===$s)return t.RG;if(i===Ym)return t.RG_INTEGER;if(i===Zm)return t.RGBA_INTEGER;if(i===cu||i===uu||i===fu||i===du)if(r===Tt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===cu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===cu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===uu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===du)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===np||i===ip||i===ap||i===sp)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===np)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ip)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ap)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===sp)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===rp||i===op||i===lp||i===cp||i===up||i===qu||i===fp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===rp||i===op)return r===Tt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===lp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===cp)return s.COMPRESSED_R11_EAC;if(i===up)return s.COMPRESSED_SIGNED_R11_EAC;if(i===qu)return s.COMPRESSED_RG11_EAC;if(i===fp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===Sp||i===yp||i===Mp||i===bp||i===Ep||i===Tp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===dp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===hp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===pp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===mp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===gp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===vp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_p)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===xp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Sp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===yp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===bp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ep)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Tp)return r===Tt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ap||i===wp||i===Cp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Ap)return r===Tt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===wp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Cp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rp||i===Np||i===Yu||i===Dp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rp)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Np)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Dp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ol?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const n3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i3=`
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

}`;class a3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Ly(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new bn({vertexShader:n3,fragmentShader:i3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Ri(new bf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class s3 extends rr{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,p=null,g=null;const b=typeof XRWebGLBinding<"u",v=new a3,d={},x=n.getContextAttributes();let M=null,_=null;const w=[],N=[],T=new _t;let y=null;const R=new xi;R.viewport=new Zt;const C=new xi;C.viewport=new Zt;const L=[R,C],z=new mA;let G=null,P=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let _e=w[re];return _e===void 0&&(_e=new Sd,w[re]=_e),_e.getTargetRaySpace()},this.getControllerGrip=function(re){let _e=w[re];return _e===void 0&&(_e=new Sd,w[re]=_e),_e.getGripSpace()},this.getHand=function(re){let _e=w[re];return _e===void 0&&(_e=new Sd,w[re]=_e),_e.getHandSpace()};function I(re){const _e=N.indexOf(re.inputSource);if(_e===-1)return;const me=w[_e];me!==void 0&&(me.update(re.inputSource,re.frame,c||r),me.dispatchEvent({type:re.type,data:re.inputSource}))}function B(){a.removeEventListener("select",I),a.removeEventListener("selectstart",I),a.removeEventListener("selectend",I),a.removeEventListener("squeeze",I),a.removeEventListener("squeezestart",I),a.removeEventListener("squeezeend",I),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",A);for(let re=0;re<w.length;re++){const _e=N[re];_e!==null&&(N[re]=null,w[re].disconnect(_e))}G=null,P=null,v.reset();for(const re in d)delete d[re];e.setRenderTarget(M),p=null,u=null,f=null,a=null,_=null,Be.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(re){s=re,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){o=re,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&b&&(f=new XRWebGLBinding(a,n)),f},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(re){if(a=re,a!==null){if(M=e.getRenderTarget(),a.addEventListener("select",I),a.addEventListener("selectstart",I),a.addEventListener("selectend",I),a.addEventListener("squeeze",I),a.addEventListener("squeezestart",I),a.addEventListener("squeezeend",I),a.addEventListener("end",B),a.addEventListener("inputsourceschange",A),x.xrCompatible!==!0&&await n.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(T),b&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Le=null,ze=null;x.depth&&(ze=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,me=x.stencil?Fs:Ba,Le=x.stencil?Ol:ta);const Ie={colorFormat:n.RGBA8,depthFormat:ze,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Ie),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),_=new ea(u.textureWidth,u.textureHeight,{format:Ii,type:bi,depthTexture:new go(u.textureWidth,u.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const me={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,me),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new ea(p.framebufferWidth,p.framebufferHeight,{format:Ii,type:bi,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),Be.setContext(a),Be.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function A(re){for(let _e=0;_e<re.removed.length;_e++){const me=re.removed[_e],Le=N.indexOf(me);Le>=0&&(N[Le]=null,w[Le].disconnect(me))}for(let _e=0;_e<re.added.length;_e++){const me=re.added[_e];let Le=N.indexOf(me);if(Le===-1){for(let Ie=0;Ie<w.length;Ie++)if(Ie>=N.length){N.push(me),Le=Ie;break}else if(N[Ie]===null){N[Ie]=me,Le=Ie;break}if(Le===-1)break}const ze=w[Le];ze&&ze.connect(me)}}const U=new q,V=new q;function se(re,_e,me){U.setFromMatrixPosition(_e.matrixWorld),V.setFromMatrixPosition(me.matrixWorld);const Le=U.distanceTo(V),ze=_e.projectionMatrix.elements,Ie=me.projectionMatrix.elements,xt=ze[14]/(ze[10]-1),je=ze[14]/(ze[10]+1),lt=(ze[9]+1)/ze[5],Ge=(ze[9]-1)/ze[5],qe=(ze[8]-1)/ze[0],Ct=(Ie[8]+1)/Ie[0],mt=xt*qe,zt=xt*Ct,Ot=Le/(-qe+Ct),Rt=Ot*-qe;if(_e.matrixWorld.decompose(re.position,re.quaternion,re.scale),re.translateX(Rt),re.translateZ(Ot),re.matrixWorld.compose(re.position,re.quaternion,re.scale),re.matrixWorldInverse.copy(re.matrixWorld).invert(),ze[10]===-1)re.projectionMatrix.copy(_e.projectionMatrix),re.projectionMatrixInverse.copy(_e.projectionMatrixInverse);else{const ye=xt+Ot,H=je+Ot,nt=mt-Rt,Ve=zt+(Le-Rt),D=lt*je/H*ye,S=Ge*je/H*ye;re.projectionMatrix.makePerspective(nt,Ve,D,S,ye,H),re.projectionMatrixInverse.copy(re.projectionMatrix).invert()}}function le(re,_e){_e===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(_e.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(a===null)return;let _e=re.near,me=re.far;v.texture!==null&&(v.depthNear>0&&(_e=v.depthNear),v.depthFar>0&&(me=v.depthFar)),z.near=C.near=R.near=_e,z.far=C.far=R.far=me,(G!==z.near||P!==z.far)&&(a.updateRenderState({depthNear:z.near,depthFar:z.far}),G=z.near,P=z.far),z.layers.mask=re.layers.mask|6,R.layers.mask=z.layers.mask&-5,C.layers.mask=z.layers.mask&-3;const Le=re.parent,ze=z.cameras;le(z,Le);for(let Ie=0;Ie<ze.length;Ie++)le(ze[Ie],Le);ze.length===2?se(z,R,C):z.projectionMatrix.copy(R.projectionMatrix),xe(re,z,Le)};function xe(re,_e,me){me===null?re.matrix.copy(_e.matrixWorld):(re.matrix.copy(me.matrixWorld),re.matrix.invert(),re.matrix.multiply(_e.matrixWorld)),re.matrix.decompose(re.position,re.quaternion,re.scale),re.updateMatrixWorld(!0),re.projectionMatrix.copy(_e.projectionMatrix),re.projectionMatrixInverse.copy(_e.projectionMatrixInverse),re.isPerspectiveCamera&&(re.fov=Up*2*Math.atan(1/re.projectionMatrix.elements[5]),re.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(re){l=re,u!==null&&(u.fixedFoveation=re),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=re)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(z)},this.getCameraTexture=function(re){return d[re]};let ke=null;function Ke(re,_e){if(h=_e.getViewerPose(c||r),g=_e,h!==null){const me=h.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let Le=!1;me.length!==z.cameras.length&&(z.cameras.length=0,Le=!0);for(let je=0;je<me.length;je++){const lt=me[je];let Ge=null;if(p!==null)Ge=p.getViewport(lt);else{const Ct=f.getViewSubImage(u,lt);Ge=Ct.viewport,je===0&&(e.setRenderTargetTextures(_,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(_))}let qe=L[je];qe===void 0&&(qe=new xi,qe.layers.enable(je),qe.viewport=new Zt,L[je]=qe),qe.matrix.fromArray(lt.transform.matrix),qe.matrix.decompose(qe.position,qe.quaternion,qe.scale),qe.projectionMatrix.fromArray(lt.projectionMatrix),qe.projectionMatrixInverse.copy(qe.projectionMatrix).invert(),qe.viewport.set(Ge.x,Ge.y,Ge.width,Ge.height),je===0&&(z.matrix.copy(qe.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Le===!0&&z.cameras.push(qe)}const ze=a.enabledFeatures;if(ze&&ze.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&b){f=i.getBinding();const je=f.getDepthInformation(me[0]);je&&je.isValid&&je.texture&&v.init(je,a.renderState)}if(ze&&ze.includes("camera-access")&&b){e.state.unbindTexture(),f=i.getBinding();for(let je=0;je<me.length;je++){const lt=me[je].camera;if(lt){let Ge=d[lt];Ge||(Ge=new Ly,d[lt]=Ge);const qe=f.getCameraImage(lt);Ge.sourceTexture=qe}}}}for(let me=0;me<w.length;me++){const Le=N[me],ze=w[me];Le!==null&&ze!==void 0&&ze.update(Le,_e,c||r)}ke&&ke(re,_e),_e.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:_e}),g=null}const Be=new zy;Be.setAnimationLoop(Ke),this.setAnimationLoop=function(re){ke=re},this.dispose=function(){}}}const r3=new Bt,ky=new We;ky.set(-1,0,0,0,1,0,0,0,1);function o3(t,e){function n(v,d){v.matrixAutoUpdate===!0&&v.updateMatrix(),d.value.copy(v.matrix)}function i(v,d){d.color.getRGB(v.fogColor.value,Oy(t)),d.isFog?(v.fogNear.value=d.near,v.fogFar.value=d.far):d.isFogExp2&&(v.fogDensity.value=d.density)}function a(v,d,x,M,_){d.isNodeMaterial?d.uniformsNeedUpdate=!1:d.isMeshBasicMaterial?s(v,d):d.isMeshLambertMaterial?(s(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(v,d),f(v,d)):d.isMeshPhongMaterial?(s(v,d),h(v,d),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(v,d),u(v,d),d.isMeshPhysicalMaterial&&p(v,d,_)):d.isMeshMatcapMaterial?(s(v,d),g(v,d)):d.isMeshDepthMaterial?s(v,d):d.isMeshDistanceMaterial?(s(v,d),b(v,d)):d.isMeshNormalMaterial?s(v,d):d.isLineBasicMaterial?(r(v,d),d.isLineDashedMaterial&&o(v,d)):d.isPointsMaterial?l(v,d,x,M):d.isSpriteMaterial?c(v,d):d.isShadowMaterial?(v.color.value.copy(d.color),v.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(v,d){v.opacity.value=d.opacity,d.color&&v.diffuse.value.copy(d.color),d.emissive&&v.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.bumpMap&&(v.bumpMap.value=d.bumpMap,n(d.bumpMap,v.bumpMapTransform),v.bumpScale.value=d.bumpScale,d.side===Yn&&(v.bumpScale.value*=-1)),d.normalMap&&(v.normalMap.value=d.normalMap,n(d.normalMap,v.normalMapTransform),v.normalScale.value.copy(d.normalScale),d.side===Yn&&v.normalScale.value.negate()),d.displacementMap&&(v.displacementMap.value=d.displacementMap,n(d.displacementMap,v.displacementMapTransform),v.displacementScale.value=d.displacementScale,v.displacementBias.value=d.displacementBias),d.emissiveMap&&(v.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,v.emissiveMapTransform)),d.specularMap&&(v.specularMap.value=d.specularMap,n(d.specularMap,v.specularMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest);const x=e.get(d),M=x.envMap,_=x.envMapRotation;M&&(v.envMap.value=M,v.envMapRotation.value.setFromMatrix4(r3.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&v.envMapRotation.value.premultiply(ky),v.reflectivity.value=d.reflectivity,v.ior.value=d.ior,v.refractionRatio.value=d.refractionRatio),d.lightMap&&(v.lightMap.value=d.lightMap,v.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,v.lightMapTransform)),d.aoMap&&(v.aoMap.value=d.aoMap,v.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,v.aoMapTransform))}function r(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform))}function o(v,d){v.dashSize.value=d.dashSize,v.totalSize.value=d.dashSize+d.gapSize,v.scale.value=d.scale}function l(v,d,x,M){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.size.value=d.size*x,v.scale.value=M*.5,d.map&&(v.map.value=d.map,n(d.map,v.uvTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function c(v,d){v.diffuse.value.copy(d.color),v.opacity.value=d.opacity,v.rotation.value=d.rotation,d.map&&(v.map.value=d.map,n(d.map,v.mapTransform)),d.alphaMap&&(v.alphaMap.value=d.alphaMap,n(d.alphaMap,v.alphaMapTransform)),d.alphaTest>0&&(v.alphaTest.value=d.alphaTest)}function h(v,d){v.specular.value.copy(d.specular),v.shininess.value=Math.max(d.shininess,1e-4)}function f(v,d){d.gradientMap&&(v.gradientMap.value=d.gradientMap)}function u(v,d){v.metalness.value=d.metalness,d.metalnessMap&&(v.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,v.metalnessMapTransform)),v.roughness.value=d.roughness,d.roughnessMap&&(v.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,v.roughnessMapTransform)),d.envMap&&(v.envMapIntensity.value=d.envMapIntensity)}function p(v,d,x){v.ior.value=d.ior,d.sheen>0&&(v.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),v.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(v.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,v.sheenColorMapTransform)),d.sheenRoughnessMap&&(v.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,v.sheenRoughnessMapTransform))),d.clearcoat>0&&(v.clearcoat.value=d.clearcoat,v.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(v.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,v.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(v.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,v.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(v.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,v.clearcoatNormalMapTransform),v.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===Yn&&v.clearcoatNormalScale.value.negate())),d.dispersion>0&&(v.dispersion.value=d.dispersion),d.iridescence>0&&(v.iridescence.value=d.iridescence,v.iridescenceIOR.value=d.iridescenceIOR,v.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],v.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(v.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,v.iridescenceMapTransform)),d.iridescenceThicknessMap&&(v.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,v.iridescenceThicknessMapTransform))),d.transmission>0&&(v.transmission.value=d.transmission,v.transmissionSamplerMap.value=x.texture,v.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(v.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,v.transmissionMapTransform)),v.thickness.value=d.thickness,d.thicknessMap&&(v.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,v.thicknessMapTransform)),v.attenuationDistance.value=d.attenuationDistance,v.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(v.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(v.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,v.anisotropyMapTransform))),v.specularIntensity.value=d.specularIntensity,v.specularColor.value.copy(d.specularColor),d.specularColorMap&&(v.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,v.specularColorMapTransform)),d.specularIntensityMap&&(v.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,v.specularIntensityMapTransform))}function g(v,d){d.matcap&&(v.matcap.value=d.matcap)}function b(v,d){const x=e.get(d).light;v.referencePosition.value.setFromMatrixPosition(x.matrixWorld),v.nearDistance.value=x.shadow.camera.near,v.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function l3(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(_,w){const N=w.program;i.uniformBlockBinding(_,N)}function c(_,w){let N=a[_.id];N===void 0&&(v(_),N=h(_),a[_.id]=N,_.addEventListener("dispose",x));const T=w.program;i.updateUBOMapping(_,T);const y=e.render.frame;s[_.id]!==y&&(u(_),s[_.id]=y)}function h(_){const w=f();_.__bindingPointIndex=w;const N=t.createBuffer(),T=_.__size,y=_.usage;return t.bindBuffer(t.UNIFORM_BUFFER,N),t.bufferData(t.UNIFORM_BUFFER,T,y),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,w,N),N}function f(){for(let _=0;_<o;_++)if(r.indexOf(_)===-1)return r.push(_),_;return ht("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(_){const w=a[_.id],N=_.uniforms,T=_.__cache;t.bindBuffer(t.UNIFORM_BUFFER,w);for(let y=0,R=N.length;y<R;y++){const C=N[y];if(Array.isArray(C))for(let L=0,z=C.length;L<z;L++)p(C[L],y,L,T);else p(C,y,0,T)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(_,w,N,T){if(b(_,w,N,T)===!0){const y=_.__offset,R=_.value;if(Array.isArray(R)){let C=0;for(let L=0;L<R.length;L++){const z=R[L],G=d(z);g(z,_.__data,C),typeof z!="number"&&typeof z!="boolean"&&!z.isMatrix3&&!ArrayBuffer.isView(z)&&(C+=G.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(R,_.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,y,_.__data)}}function g(_,w,N){typeof _=="number"||typeof _=="boolean"?w[0]=_:_.isMatrix3?(w[0]=_.elements[0],w[1]=_.elements[1],w[2]=_.elements[2],w[3]=0,w[4]=_.elements[3],w[5]=_.elements[4],w[6]=_.elements[5],w[7]=0,w[8]=_.elements[6],w[9]=_.elements[7],w[10]=_.elements[8],w[11]=0):ArrayBuffer.isView(_)?w.set(new _.constructor(_.buffer,_.byteOffset,w.length)):_.toArray(w,N)}function b(_,w,N,T){const y=_.value,R=w+"_"+N;if(T[R]===void 0)return typeof y=="number"||typeof y=="boolean"?T[R]=y:ArrayBuffer.isView(y)?T[R]=y.slice():T[R]=y.clone(),!0;{const C=T[R];if(typeof y=="number"||typeof y=="boolean"){if(C!==y)return T[R]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(C.equals(y)===!1)return C.copy(y),!0}}return!1}function v(_){const w=_.uniforms;let N=0;const T=16;for(let R=0,C=w.length;R<C;R++){const L=Array.isArray(w[R])?w[R]:[w[R]];for(let z=0,G=L.length;z<G;z++){const P=L[z],I=Array.isArray(P.value)?P.value:[P.value];for(let B=0,A=I.length;B<A;B++){const U=I[B],V=d(U),se=N%T,le=se%V.boundary,xe=se+le;N+=le,xe!==0&&T-xe<V.storage&&(N+=T-xe),P.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=N,N+=V.storage}}}const y=N%T;return y>0&&(N+=T-y),_.__size=N,_.__cache={},this}function d(_){const w={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(w.boundary=4,w.storage=4):_.isVector2?(w.boundary=8,w.storage=8):_.isVector3||_.isColor?(w.boundary=16,w.storage=12):_.isVector4?(w.boundary=16,w.storage=16):_.isMatrix3?(w.boundary=48,w.storage=48):_.isMatrix4?(w.boundary=64,w.storage=64):_.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(_)?(w.boundary=16,w.storage=_.byteLength):Fe("WebGLRenderer: Unsupported uniform value type.",_),w}function x(_){const w=_.target;w.removeEventListener("dispose",x);const N=r.indexOf(w.__bindingPointIndex);r.splice(N,1),t.deleteBuffer(a[w.id]),delete a[w.id],delete s[w.id]}function M(){for(const _ in a)t.deleteBuffer(a[_]);r=[],a={},s={}}return{bind:l,update:c,dispose:M}}const c3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ji=null;function u3(){return ji===null&&(ji=new Ry(c3,16,16,$s,Ia),ji.name="DFG_LUT",ji.minFilter=wn,ji.magFilter=wn,ji.wrapS=Aa,ji.wrapT=Aa,ji.generateMipmaps=!1,ji.needsUpdate=!0),ji}class Xy{constructor(e={}){const{canvas:n=DT(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=bi}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const b=p,v=new Set([Zm,Ym,qm]),d=new Set([bi,ta,Ll,Ol,Xm,jm]),x=new Uint32Array(4),M=new Int32Array(4),_=new q;let w=null,N=null;const T=[],y=[];let R=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ji,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let L=!1,z=null,G=null,P=null,I=null;this._outputColorSpace=mi;let B=0,A=0,U=null,V=-1,se=null;const le=new Zt,xe=new Zt;let ke=null;const Ke=new rt(0);let Be=0,re=n.width,_e=n.height,me=1,Le=null,ze=null;const Ie=new Zt(0,0,re,_e),xt=new Zt(0,0,re,_e);let je=!1;const lt=new Ny;let Ge=!1,qe=!1;const Ct=new Bt,mt=new q,zt=new Zt,Ot={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Rt=!1;function ye(){return U===null?me:1}let H=i;function nt(E,X){return n.getContext(E,X)}try{const E={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Vm}`),n.addEventListener("webglcontextlost",dt,!1),n.addEventListener("webglcontextrestored",Nt,!1),n.addEventListener("webglcontextcreationerror",Rn,!1),H===null){const X="webgl2";if(H=nt(X,E),H===null)throw nt(X)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(E){throw ht("WebGLRenderer: "+E.message),E}let Ve,D,S,j,Y,J,de,ge,ee,W,ie,ue,O,k,he,fe,Ce,F,pe,te,Q,ve,oe;function Re(){Ve=new uC(H),Ve.init(),Q=new t3(H,Ve),D=new nC(H,Ve,e,Q),S=new JR(H,Ve),D.reversedDepthBuffer&&u&&S.buffers.depth.setReversed(!0),G=H.createFramebuffer(),P=H.createFramebuffer(),I=H.createFramebuffer(),j=new hC(H),Y=new FR,J=new e3(H,Ve,S,Y,D,Q,j),de=new cC(C),ge=new vA(H),ve=new eC(H,ge),ee=new fC(H,ge,j,ve),W=new mC(H,ee,ge,ve,j),F=new pC(H,D,J),he=new iC(Y),ie=new BR(C,de,Ve,D,ve,he),ue=new o3(C,Y),O=new GR,k=new qR(Ve),Ce=new Jw(C,de,S,W,g,l),fe=new $R(C,W,D),oe=new l3(H,j,D,S),pe=new tC(H,Ve,j),te=new dC(H,Ve,j),j.programs=ie.programs,C.capabilities=D,C.extensions=Ve,C.properties=Y,C.renderLists=O,C.shadowMap=fe,C.state=S,C.info=j}Re(),b!==bi&&(R=new vC(b,n.width,n.height,o,a,s));const Ne=new s3(C,H);this.xr=Ne,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const E=Ve.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=Ve.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(E){E!==void 0&&(me=E,this.setSize(re,_e,!1))},this.getSize=function(E){return E.set(re,_e)},this.setSize=function(E,X,$=!0){if(Ne.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}re=E,_e=X,n.width=Math.floor(E*me),n.height=Math.floor(X*me),$===!0&&(n.style.width=E+"px",n.style.height=X+"px"),R!==null&&R.setSize(n.width,n.height),this.setViewport(0,0,E,X)},this.getDrawingBufferSize=function(E){return E.set(re*me,_e*me).floor()},this.setDrawingBufferSize=function(E,X,$){re=E,_e=X,me=$,n.width=Math.floor(E*$),n.height=Math.floor(X*$),this.setViewport(0,0,E,X)},this.setEffects=function(E){if(b===bi){ht("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let X=0;X<E.length;X++)if(E[X].isOutputPass===!0){Fe("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}R.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(le)},this.getViewport=function(E){return E.copy(Ie)},this.setViewport=function(E,X,$,Z){E.isVector4?Ie.set(E.x,E.y,E.z,E.w):Ie.set(E,X,$,Z),S.viewport(le.copy(Ie).multiplyScalar(me).round())},this.getScissor=function(E){return E.copy(xt)},this.setScissor=function(E,X,$,Z){E.isVector4?xt.set(E.x,E.y,E.z,E.w):xt.set(E,X,$,Z),S.scissor(xe.copy(xt).multiplyScalar(me).round())},this.getScissorTest=function(){return je},this.setScissorTest=function(E){S.setScissorTest(je=E)},this.setOpaqueSort=function(E){Le=E},this.setTransparentSort=function(E){ze=E},this.getClearColor=function(E){return E.copy(Ce.getClearColor())},this.setClearColor=function(){Ce.setClearColor(...arguments)},this.getClearAlpha=function(){return Ce.getClearAlpha()},this.setClearAlpha=function(){Ce.setClearAlpha(...arguments)},this.clear=function(E=!0,X=!0,$=!0){let Z=0;if(E){let K=!1;if(U!==null){const Me=U.texture.format;K=v.has(Me)}if(K){const Me=U.texture.type,Ee=d.has(Me),Se=Ce.getClearColor(),De=Ce.getClearAlpha(),Oe=Se.r,Xe=Se.g,Qe=Se.b;Ee?(x[0]=Oe,x[1]=Xe,x[2]=Qe,x[3]=De,H.clearBufferuiv(H.COLOR,0,x)):(M[0]=Oe,M[1]=Xe,M[2]=Qe,M[3]=De,H.clearBufferiv(H.COLOR,0,M))}else Z|=H.COLOR_BUFFER_BIT}X&&(Z|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),$&&(Z|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&H.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),z=E},this.dispose=function(){n.removeEventListener("webglcontextlost",dt,!1),n.removeEventListener("webglcontextrestored",Nt,!1),n.removeEventListener("webglcontextcreationerror",Rn,!1),Ce.dispose(),O.dispose(),k.dispose(),Y.dispose(),de.dispose(),W.dispose(),ve.dispose(),oe.dispose(),ie.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",Hi),Ne.removeEventListener("sessionend",sa),ci.stop()};function dt(E){E.preventDefault(),Y0("WebGLRenderer: Context Lost."),L=!0}function Nt(){Y0("WebGLRenderer: Context Restored."),L=!1;const E=j.autoReset,X=fe.enabled,$=fe.autoUpdate,Z=fe.needsUpdate,K=fe.type;Re(),j.autoReset=E,fe.enabled=X,fe.autoUpdate=$,fe.needsUpdate=Z,fe.type=K}function Rn(E){ht("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function Nn(E){const X=E.target;X.removeEventListener("dispose",Nn),wf(X)}function wf(E){aa(E),Y.remove(E)}function aa(E){const X=Y.get(E).programs;X!==void 0&&(X.forEach(function($){ie.releaseProgram($)}),E.isShaderMaterial&&ie.releaseShaderCache(E))}this.renderBufferDirect=function(E,X,$,Z,K,Me){X===null&&(X=Ot);const Ee=K.isMesh&&K.matrixWorld.determinantAffine()<0,Se=Do(E,X,$,Z,K);S.setMaterial(Z,Ee);let De=$.index,Oe=1;if(Z.wireframe===!0){if(De=ee.getWireframeAttribute($),De===void 0)return;Oe=2}const Xe=$.drawRange,Qe=$.attributes.position;let Ue=Xe.start*Oe,pt=(Xe.start+Xe.count)*Oe;Me!==null&&(Ue=Math.max(Ue,Me.start*Oe),pt=Math.min(pt,(Me.start+Me.count)*Oe)),De!==null?(Ue=Math.max(Ue,0),pt=Math.min(pt,De.count)):Qe!=null&&(Ue=Math.max(Ue,0),pt=Math.min(pt,Qe.count));const Ht=pt-Ue;if(Ht<0||Ht===1/0)return;ve.setup(K,Z,Se,$,De);let bt,St=pe;if(De!==null&&(bt=ge.get(De),St=te,St.setIndex(bt)),K.isMesh)Z.wireframe===!0?(S.setLineWidth(Z.wireframeLinewidth*ye()),St.setMode(H.LINES)):St.setMode(H.TRIANGLES);else if(K.isLine){let fn=Z.linewidth;fn===void 0&&(fn=1),S.setLineWidth(fn*ye()),K.isLineSegments?St.setMode(H.LINES):K.isLineLoop?St.setMode(H.LINE_LOOP):St.setMode(H.LINE_STRIP)}else K.isPoints?St.setMode(H.POINTS):K.isSprite&&St.setMode(H.TRIANGLES);if(K.isBatchedMesh)if(Ve.get("WEBGL_multi_draw"))St.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{const fn=K._multiDrawStarts,Te=K._multiDrawCounts,Un=K._multiDrawCount,it=De?ge.get(De).bytesPerElement:1,Qt=Y.get(Z).currentProgram.getUniforms();for(let Hn=0;Hn<Un;Hn++)Qt.setValue(H,"_gl_DrawID",Hn),St.render(fn[Hn]/it,Te[Hn])}else if(K.isInstancedMesh)St.renderInstances(Ue,Ht,K.count);else if($.isInstancedBufferGeometry){const fn=$._maxInstanceCount!==void 0?$._maxInstanceCount:1/0,Te=Math.min($.instanceCount,fn);St.renderInstances(Ue,Ht,Te)}else St.render(Ue,Ht)};function Kt(E,X,$){E.transparent===!0&&E.side===Ma&&E.forceSinglePass===!1?(E.side=Yn,E.needsUpdate=!0,ui(E,X,$),E.side=ys,E.needsUpdate=!0,ui(E,X,$),E.side=Ma):ui(E,X,$)}this.compile=function(E,X,$=null){$===null&&($=E),N=k.get($),N.init(X),y.push(N),$.traverseVisible(function(K){K.isLight&&K.layers.test(X.layers)&&(N.pushLight(K),K.castShadow&&N.pushShadow(K))}),E!==$&&E.traverseVisible(function(K){K.isLight&&K.layers.test(X.layers)&&(N.pushLight(K),K.castShadow&&N.pushShadow(K))}),N.setupLights();const Z=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;const Me=K.material;if(Me)if(Array.isArray(Me))for(let Ee=0;Ee<Me.length;Ee++){const Se=Me[Ee];Kt(Se,$,K),Z.add(Se)}else Kt(Me,$,K),Z.add(Me)}),N=y.pop(),Z},this.compileAsync=function(E,X,$=null){const Z=this.compile(E,X,$);return new Promise(K=>{function Me(){if(Z.forEach(function(Ee){Y.get(Ee).currentProgram.isReady()&&Z.delete(Ee)}),Z.size===0){K(E);return}setTimeout(Me,10)}Ve.get("KHR_parallel_shader_compile")!==null?Me():setTimeout(Me,10)})};let Ft=null;function Dn(E){Ft&&Ft(E)}function Hi(){ci.stop()}function sa(){ci.start()}const ci=new zy;ci.setAnimationLoop(Dn),typeof self<"u"&&ci.setContext(self),this.setAnimationLoop=function(E){Ft=E,Ne.setAnimationLoop(E),E===null?ci.stop():ci.start()},Ne.addEventListener("sessionstart",Hi),Ne.addEventListener("sessionend",sa),this.render=function(E,X){if(X!==void 0&&X.isCamera!==!0){ht("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(L===!0)return;z!==null&&z.renderStart(E,X);const $=Ne.enabled===!0&&Ne.isPresenting===!0,Z=R!==null&&(U===null||$)&&R.begin(C,U);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(R===null||R.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(X),X=Ne.getCamera()),E.isScene===!0&&E.onBeforeRender(C,E,X,U),N=k.get(E,y.length),N.init(X),N.state.textureUnits=J.getTextureUnits(),y.push(N),Ct.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),lt.setFromProjectionMatrix(Ct,Qi,X.reversedDepth),qe=this.localClippingEnabled,Ge=he.init(this.clippingPlanes,qe),w=O.get(E,T.length),w.init(),T.push(w),Ne.enabled===!0&&Ne.isPresenting===!0){const Ee=C.xr.getDepthSensingMesh();Ee!==null&&ra(Ee,X,-1/0,C.sortObjects)}ra(E,X,0,C.sortObjects),w.finish(),C.sortObjects===!0&&w.sort(Le,ze,X.reversedDepth),Rt=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,Rt&&Ce.addToRenderList(w,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Ge===!0&&he.beginShadows();const K=N.state.shadowsArray;if(fe.render(K,E,X),Ge===!0&&he.endShadows(),(Z&&R.hasRenderPass())===!1){const Ee=w.opaque,Se=w.transmissive;if(N.setupLights(),X.isArrayCamera){const De=X.cameras;if(Se.length>0)for(let Oe=0,Xe=De.length;Oe<Xe;Oe++){const Qe=De[Oe];oa(Ee,Se,E,Qe)}Rt&&Ce.render(E);for(let Oe=0,Xe=De.length;Oe<Xe;Oe++){const Qe=De[Oe];Es(w,E,Qe,Qe.viewport)}}else Se.length>0&&oa(Ee,Se,E,X),Rt&&Ce.render(E),Es(w,E,X)}U!==null&&A===0&&(J.updateMultisampleRenderTarget(U),J.updateRenderTargetMipmap(U)),Z&&R.end(C),E.isScene===!0&&E.onAfterRender(C,E,X),ve.resetDefaultState(),V=-1,se=null,y.pop(),y.length>0?(N=y[y.length-1],J.setTextureUnits(N.state.textureUnits),Ge===!0&&he.setGlobalState(C.clippingPlanes,N.state.camera)):N=null,T.pop(),T.length>0?w=T[T.length-1]:w=null,z!==null&&z.renderEnd()};function ra(E,X,$,Z){if(E.visible===!1)return;if(E.layers.test(X.layers)){if(E.isGroup)$=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(X);else if(E.isLightProbeGrid)N.pushLightProbeGrid(E);else if(E.isLight)N.pushLight(E),E.castShadow&&N.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||lt.intersectsSprite(E)){Z&&zt.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ct);const Ee=W.update(E),Se=E.material;Se.visible&&w.push(E,Ee,Se,$,zt.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||lt.intersectsObject(E))){const Ee=W.update(E),Se=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),zt.copy(E.boundingSphere.center)):(Ee.boundingSphere===null&&Ee.computeBoundingSphere(),zt.copy(Ee.boundingSphere.center)),zt.applyMatrix4(E.matrixWorld).applyMatrix4(Ct)),Array.isArray(Se)){const De=Ee.groups;for(let Oe=0,Xe=De.length;Oe<Xe;Oe++){const Qe=De[Oe],Ue=Se[Qe.materialIndex];Ue&&Ue.visible&&w.push(E,Ee,Ue,$,zt.z,Qe)}}else Se.visible&&w.push(E,Ee,Se,$,zt.z,null)}}const Me=E.children;for(let Ee=0,Se=Me.length;Ee<Se;Ee++)ra(Me[Ee],X,$,Z)}function Es(E,X,$,Z){const{opaque:K,transmissive:Me,transparent:Ee}=E;N.setupLightsView($),Ge===!0&&he.setGlobalState(C.clippingPlanes,$),Z&&S.viewport(le.copy(Z)),K.length>0&&Ts(K,X,$),Me.length>0&&Ts(Me,X,$),Ee.length>0&&Ts(Ee,X,$),S.buffers.depth.setTest(!0),S.buffers.depth.setMask(!0),S.buffers.color.setMask(!0),S.setPolygonOffset(!1)}function oa(E,X,$,Z){if(($.isScene===!0?$.overrideMaterial:null)!==null)return;if(N.state.transmissionRenderTarget[Z.id]===void 0){const Ue=Ve.has("EXT_color_buffer_half_float")||Ve.has("EXT_color_buffer_float");N.state.transmissionRenderTarget[Z.id]=new ea(1,1,{generateMipmaps:!0,type:Ue?Ia:bi,minFilter:Bs,samples:Math.max(4,D.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ct.workingColorSpace})}const Me=N.state.transmissionRenderTarget[Z.id],Ee=Z.viewport||le;Me.setSize(Ee.z*C.transmissionResolutionScale,Ee.w*C.transmissionResolutionScale);const Se=C.getRenderTarget(),De=C.getActiveCubeFace(),Oe=C.getActiveMipmapLevel();C.setRenderTarget(Me),C.getClearColor(Ke),Be=C.getClearAlpha(),Be<1&&C.setClearColor(16777215,.5),C.clear(),Rt&&Ce.render($);const Xe=C.toneMapping;C.toneMapping=Ji;const Qe=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),N.setupLightsView(Z),Ge===!0&&he.setGlobalState(C.clippingPlanes,Z),Ts(E,$,Z),J.updateMultisampleRenderTarget(Me),J.updateRenderTargetMipmap(Me),Ve.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let pt=0,Ht=X.length;pt<Ht;pt++){const bt=X[pt],{object:St,geometry:fn,material:Te,group:Un}=bt;if(Te.side===Ma&&St.layers.test(Z.layers)){const it=Te.side;Te.side=Yn,Te.needsUpdate=!0,la(St,$,Z,fn,Te,Un),Te.side=it,Te.needsUpdate=!0,Ue=!0}}Ue===!0&&(J.updateMultisampleRenderTarget(Me),J.updateRenderTargetMipmap(Me))}C.setRenderTarget(Se,De,Oe),C.setClearColor(Ke,Be),Qe!==void 0&&(Z.viewport=Qe),C.toneMapping=Xe}function Ts(E,X,$){const Z=X.isScene===!0?X.overrideMaterial:null;for(let K=0,Me=E.length;K<Me;K++){const Ee=E[K],{object:Se,geometry:De,group:Oe}=Ee;let Xe=Ee.material;Xe.allowOverride===!0&&Z!==null&&(Xe=Z),Se.layers.test($.layers)&&la(Se,X,$,De,Xe,Oe)}}function la(E,X,$,Z,K,Me){E.onBeforeRender(C,X,$,Z,K,Me),E.modelViewMatrix.multiplyMatrices($.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(C,X,$,Z,E,Me),K.transparent===!0&&K.side===Ma&&K.forceSinglePass===!1?(K.side=Yn,K.needsUpdate=!0,C.renderBufferDirect($,X,Z,K,E,Me),K.side=ys,K.needsUpdate=!0,C.renderBufferDirect($,X,Z,K,E,Me),K.side=Ma):C.renderBufferDirect($,X,Z,K,E,Me),E.onAfterRender(C,X,$,Z,K,Me)}function ui(E,X,$){X.isScene!==!0&&(X=Ot);const Z=Y.get(E),K=N.state.lights,Me=N.state.shadowsArray,Ee=K.state.version,Se=ie.getParameters(E,K.state,Me,X,$,N.state.lightProbeGridArray),De=ie.getProgramCacheKey(Se);let Oe=Z.programs;Z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?X.environment:null,Z.fog=X.fog;const Xe=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Z.envMap=de.get(E.envMap||Z.environment,Xe),Z.envMapRotation=Z.environment!==null&&E.envMap===null?X.environmentRotation:E.envMapRotation,Oe===void 0&&(E.addEventListener("dispose",Nn),Oe=new Map,Z.programs=Oe);let Qe=Oe.get(De);if(Qe!==void 0){if(Z.currentProgram===Qe&&Z.lightsStateVersion===Ee)return No(E,Se),Qe}else Se.uniforms=ie.getUniforms(E),z!==null&&E.isNodeMaterial&&z.build(E,$,Se),E.onBeforeCompile(Se,C),Qe=ie.acquireProgram(Se,De),Oe.set(De,Qe),Z.uniforms=Se.uniforms;const Ue=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ue.clippingPlanes=he.uniform),No(E,Se),Z.needsLights=$l(E),Z.lightsStateVersion=Ee,Z.needsLights&&(Ue.ambientLightColor.value=K.state.ambient,Ue.lightProbe.value=K.state.probe,Ue.directionalLights.value=K.state.directional,Ue.directionalLightShadows.value=K.state.directionalShadow,Ue.spotLights.value=K.state.spot,Ue.spotLightShadows.value=K.state.spotShadow,Ue.rectAreaLights.value=K.state.rectArea,Ue.ltc_1.value=K.state.rectAreaLTC1,Ue.ltc_2.value=K.state.rectAreaLTC2,Ue.pointLights.value=K.state.point,Ue.pointLightShadows.value=K.state.pointShadow,Ue.hemisphereLights.value=K.state.hemi,Ue.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Ue.spotLightMatrix.value=K.state.spotLightMatrix,Ue.spotLightMap.value=K.state.spotLightMap,Ue.pointShadowMatrix.value=K.state.pointShadowMatrix),Z.lightProbeGrid=N.state.lightProbeGridArray.length>0,Z.currentProgram=Qe,Z.uniformsList=null,Qe}function Gi(E){if(E.uniformsList===null){const X=E.currentProgram.getUniforms();E.uniformsList=mu.seqWithValue(X.seq,E.uniforms)}return E.uniformsList}function No(E,X){const $=Y.get(E);$.outputColorSpace=X.outputColorSpace,$.batching=X.batching,$.batchingColor=X.batchingColor,$.instancing=X.instancing,$.instancingColor=X.instancingColor,$.instancingMorph=X.instancingMorph,$.skinning=X.skinning,$.morphTargets=X.morphTargets,$.morphNormals=X.morphNormals,$.morphColors=X.morphColors,$.morphTargetsCount=X.morphTargetsCount,$.numClippingPlanes=X.numClippingPlanes,$.numIntersection=X.numClipIntersection,$.vertexAlphas=X.vertexAlphas,$.vertexTangents=X.vertexTangents,$.toneMapping=X.toneMapping}function Ql(E,X){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;_.setFromMatrixPosition(X.matrixWorld);for(let $=0,Z=E.length;$<Z;$++){const K=E[$];if(K.texture!==null&&K.boundingBox.containsPoint(_))return K}return null}function Do(E,X,$,Z,K){X.isScene!==!0&&(X=Ot),J.resetTextureUnits();const Me=X.fog,Ee=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?X.environment:null,Se=U===null?C.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ct.workingColorSpace,De=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,Oe=de.get(Z.envMap||Ee,De),Xe=Z.vertexColors===!0&&!!$.attributes.color&&$.attributes.color.itemSize===4,Qe=!!$.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ue=!!$.morphAttributes.position,pt=!!$.morphAttributes.normal,Ht=!!$.morphAttributes.color;let bt=Ji;Z.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(bt=C.toneMapping);const St=$.morphAttributes.position||$.morphAttributes.normal||$.morphAttributes.color,fn=St!==void 0?St.length:0,Te=Y.get(Z),Un=N.state.lights;if(Ge===!0&&(qe===!0||E!==se)){const Dt=E===se&&Z.id===V;he.setState(Z,E,Dt)}let it=!1;Z.version===Te.__version?(Te.needsLights&&Te.lightsStateVersion!==Un.state.version||Te.outputColorSpace!==Se||K.isBatchedMesh&&Te.batching===!1||!K.isBatchedMesh&&Te.batching===!0||K.isBatchedMesh&&Te.batchingColor===!0&&K.colorTexture===null||K.isBatchedMesh&&Te.batchingColor===!1&&K.colorTexture!==null||K.isInstancedMesh&&Te.instancing===!1||!K.isInstancedMesh&&Te.instancing===!0||K.isSkinnedMesh&&Te.skinning===!1||!K.isSkinnedMesh&&Te.skinning===!0||K.isInstancedMesh&&Te.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Te.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Te.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Te.instancingMorph===!1&&K.morphTexture!==null||Te.envMap!==Oe||Z.fog===!0&&Te.fog!==Me||Te.numClippingPlanes!==void 0&&(Te.numClippingPlanes!==he.numPlanes||Te.numIntersection!==he.numIntersection)||Te.vertexAlphas!==Xe||Te.vertexTangents!==Qe||Te.morphTargets!==Ue||Te.morphNormals!==pt||Te.morphColors!==Ht||Te.toneMapping!==bt||Te.morphTargetsCount!==fn||!!Te.lightProbeGrid!=N.state.lightProbeGridArray.length>0)&&(it=!0):(it=!0,Te.__version=Z.version);let Qt=Te.currentProgram;it===!0&&(Qt=ui(Z,X,K),z&&Z.isNodeMaterial&&z.onUpdateProgram(Z,Qt,Te));let Hn=!1,Vi=!1,Gn=!1;const yt=Qt.getUniforms(),Et=Te.uniforms;if(S.useProgram(Qt.program)&&(Hn=!0,Vi=!0,Gn=!0),Z.id!==V&&(V=Z.id,Vi=!0),Te.needsLights){const Dt=Ql(N.state.lightProbeGridArray,K);Te.lightProbeGrid!==Dt&&(Te.lightProbeGrid=Dt,Vi=!0)}if(Hn||se!==E){S.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),yt.setValue(H,"projectionMatrix",E.projectionMatrix),yt.setValue(H,"viewMatrix",E.matrixWorldInverse);const Ni=yt.map.cameraPosition;Ni!==void 0&&Ni.setValue(H,mt.setFromMatrixPosition(E.matrixWorld)),D.logarithmicDepthBuffer&&yt.setValue(H,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&yt.setValue(H,"isOrthographic",E.isOrthographicCamera===!0),se!==E&&(se=E,Vi=!0,Gn=!0)}if(Te.needsLights&&(Un.state.directionalShadowMap.length>0&&yt.setValue(H,"directionalShadowMap",Un.state.directionalShadowMap,J),Un.state.spotShadowMap.length>0&&yt.setValue(H,"spotShadowMap",Un.state.spotShadowMap,J),Un.state.pointShadowMap.length>0&&yt.setValue(H,"pointShadowMap",Un.state.pointShadowMap,J)),K.isSkinnedMesh){yt.setOptional(H,K,"bindMatrix"),yt.setOptional(H,K,"bindMatrixInverse");const Dt=K.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),yt.setValue(H,"boneTexture",Dt.boneTexture,J))}K.isBatchedMesh&&(yt.setOptional(H,K,"batchingTexture"),yt.setValue(H,"batchingTexture",K._matricesTexture,J),yt.setOptional(H,K,"batchingIdTexture"),yt.setValue(H,"batchingIdTexture",K._indirectTexture,J),yt.setOptional(H,K,"batchingColorTexture"),K._colorsTexture!==null&&yt.setValue(H,"batchingColorTexture",K._colorsTexture,J));const ki=$.morphAttributes;if((ki.position!==void 0||ki.normal!==void 0||ki.color!==void 0)&&F.update(K,$,Qt),(Vi||Te.receiveShadow!==K.receiveShadow)&&(Te.receiveShadow=K.receiveShadow,yt.setValue(H,"receiveShadow",K.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&X.environment!==null&&(Et.envMapIntensity.value=X.environmentIntensity),Et.dfgLUT!==void 0&&(Et.dfgLUT.value=u3()),Vi){if(yt.setValue(H,"toneMappingExposure",C.toneMappingExposure),Te.needsLights&&cr(Et,Gn),Me&&Z.fog===!0&&ue.refreshFogUniforms(Et,Me),ue.refreshMaterialUniforms(Et,Z,me,_e,N.state.transmissionRenderTarget[E.id]),Te.needsLights&&Te.lightProbeGrid){const Dt=Te.lightProbeGrid;Et.probesSH.value=Dt.texture,Et.probesMin.value.copy(Dt.boundingBox.min),Et.probesMax.value.copy(Dt.boundingBox.max),Et.probesResolution.value.copy(Dt.resolution)}mu.upload(H,Gi(Te),Et,J)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(mu.upload(H,Gi(Te),Et,J),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&yt.setValue(H,"center",K.center),yt.setValue(H,"modelViewMatrix",K.modelViewMatrix),yt.setValue(H,"normalMatrix",K.normalMatrix),yt.setValue(H,"modelMatrix",K.matrixWorld),Z.uniformsGroups!==void 0){const Dt=Z.uniformsGroups;for(let Ni=0,fi=Dt.length;Ni<fi;Ni++){const Uo=Dt[Ni];oe.update(Uo,Qt),oe.bind(Uo,Qt)}}return Qt}function cr(E,X){E.ambientLightColor.needsUpdate=X,E.lightProbe.needsUpdate=X,E.directionalLights.needsUpdate=X,E.directionalLightShadows.needsUpdate=X,E.pointLights.needsUpdate=X,E.pointLightShadows.needsUpdate=X,E.spotLights.needsUpdate=X,E.spotLightShadows.needsUpdate=X,E.rectAreaLights.needsUpdate=X,E.hemisphereLights.needsUpdate=X}function $l(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(E,X,$){const Z=Y.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),Y.get(E.texture).__webglTexture=X,Y.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:$,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,X){const $=Y.get(E);$.__webglFramebuffer=X,$.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(E,X=0,$=0){U=E,B=X,A=$;let Z=null,K=!1,Me=!1;if(E){const Se=Y.get(E);if(Se.__useDefaultFramebuffer!==void 0){S.bindFramebuffer(H.FRAMEBUFFER,Se.__webglFramebuffer),le.copy(E.viewport),xe.copy(E.scissor),ke=E.scissorTest,S.viewport(le),S.scissor(xe),S.setScissorTest(ke),V=-1;return}else if(Se.__webglFramebuffer===void 0)J.setupRenderTarget(E);else if(Se.__hasExternalTextures)J.rebindTextures(E,Y.get(E.texture).__webglTexture,Y.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Xe=E.depthTexture;if(Se.__boundDepthTexture!==Xe){if(Xe!==null&&Y.has(Xe)&&(E.width!==Xe.image.width||E.height!==Xe.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(E)}}const De=E.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Me=!0);const Oe=Y.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Oe[X])?Z=Oe[X][$]:Z=Oe[X],K=!0):E.samples>0&&J.useMultisampledRTT(E)===!1?Z=Y.get(E).__webglMultisampledFramebuffer:Array.isArray(Oe)?Z=Oe[$]:Z=Oe,le.copy(E.viewport),xe.copy(E.scissor),ke=E.scissorTest}else le.copy(Ie).multiplyScalar(me).floor(),xe.copy(xt).multiplyScalar(me).floor(),ke=je;if($!==0&&(Z=G),S.bindFramebuffer(H.FRAMEBUFFER,Z)&&S.drawBuffers(E,Z),S.viewport(le),S.scissor(xe),S.setScissorTest(ke),K){const Se=Y.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+X,Se.__webglTexture,$)}else if(Me){const Se=X;for(let De=0;De<E.textures.length;De++){const Oe=Y.get(E.textures[De]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+De,Oe.__webglTexture,$,Se)}}else if(E!==null&&$!==0){const Se=Y.get(E.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Se.__webglTexture,$)}V=-1},this.readRenderTargetPixels=function(E,X,$,Z,K,Me,Ee,Se=0){if(!(E&&E.isWebGLRenderTarget)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De){S.bindFramebuffer(H.FRAMEBUFFER,De);try{const Oe=E.textures[Se],Xe=Oe.format,Qe=Oe.type;if(E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Se),!D.textureFormatReadable(Xe)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!D.textureTypeReadable(Qe)){ht("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=E.width-Z&&$>=0&&$<=E.height-K&&H.readPixels(X,$,Z,K,Q.convert(Xe),Q.convert(Qe),Me)}finally{const Oe=U!==null?Y.get(U).__webglFramebuffer:null;S.bindFramebuffer(H.FRAMEBUFFER,Oe)}}},this.readRenderTargetPixelsAsync=async function(E,X,$,Z,K,Me,Ee,Se=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Y.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Ee!==void 0&&(De=De[Ee]),De)if(X>=0&&X<=E.width-Z&&$>=0&&$<=E.height-K){S.bindFramebuffer(H.FRAMEBUFFER,De);const Oe=E.textures[Se],Xe=Oe.format,Qe=Oe.type;if(E.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+Se),!D.textureFormatReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!D.textureTypeReadable(Qe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ue=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,Ue),H.bufferData(H.PIXEL_PACK_BUFFER,Me.byteLength,H.STREAM_READ),H.readPixels(X,$,Z,K,Q.convert(Xe),Q.convert(Qe),0);const pt=U!==null?Y.get(U).__webglFramebuffer:null;S.bindFramebuffer(H.FRAMEBUFFER,pt);const Ht=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await UT(H,Ht,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,Ue),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,Me),H.deleteBuffer(Ue),H.deleteSync(Ht),Me}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,X=null,$=0){const Z=Math.pow(2,-$),K=Math.floor(E.image.width*Z),Me=Math.floor(E.image.height*Z),Ee=X!==null?X.x:0,Se=X!==null?X.y:0;J.setTexture2D(E,0),H.copyTexSubImage2D(H.TEXTURE_2D,$,0,0,Ee,Se,K,Me),S.unbindTexture()},this.copyTextureToTexture=function(E,X,$=null,Z=null,K=0,Me=0){let Ee,Se,De,Oe,Xe,Qe,Ue,pt,Ht;const bt=E.isCompressedTexture?E.mipmaps[Me]:E.image;if($!==null)Ee=$.max.x-$.min.x,Se=$.max.y-$.min.y,De=$.isBox3?$.max.z-$.min.z:1,Oe=$.min.x,Xe=$.min.y,Qe=$.isBox3?$.min.z:0;else{const Et=Math.pow(2,-K);Ee=Math.floor(bt.width*Et),Se=Math.floor(bt.height*Et),E.isDataArrayTexture?De=bt.depth:E.isData3DTexture?De=Math.floor(bt.depth*Et):De=1,Oe=0,Xe=0,Qe=0}Z!==null?(Ue=Z.x,pt=Z.y,Ht=Z.z):(Ue=0,pt=0,Ht=0);const St=Q.convert(X.format),fn=Q.convert(X.type);let Te;X.isData3DTexture?(J.setTexture3D(X,0),Te=H.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(J.setTexture2DArray(X,0),Te=H.TEXTURE_2D_ARRAY):(J.setTexture2D(X,0),Te=H.TEXTURE_2D),S.activeTexture(H.TEXTURE0),S.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,X.flipY),S.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),S.pixelStorei(H.UNPACK_ALIGNMENT,X.unpackAlignment);const Un=S.getParameter(H.UNPACK_ROW_LENGTH),it=S.getParameter(H.UNPACK_IMAGE_HEIGHT),Qt=S.getParameter(H.UNPACK_SKIP_PIXELS),Hn=S.getParameter(H.UNPACK_SKIP_ROWS),Vi=S.getParameter(H.UNPACK_SKIP_IMAGES);S.pixelStorei(H.UNPACK_ROW_LENGTH,bt.width),S.pixelStorei(H.UNPACK_IMAGE_HEIGHT,bt.height),S.pixelStorei(H.UNPACK_SKIP_PIXELS,Oe),S.pixelStorei(H.UNPACK_SKIP_ROWS,Xe),S.pixelStorei(H.UNPACK_SKIP_IMAGES,Qe);const Gn=E.isDataArrayTexture||E.isData3DTexture,yt=X.isDataArrayTexture||X.isData3DTexture;if(E.isDepthTexture){const Et=Y.get(E),ki=Y.get(X),Dt=Y.get(Et.__renderTarget),Ni=Y.get(ki.__renderTarget);S.bindFramebuffer(H.READ_FRAMEBUFFER,Dt.__webglFramebuffer),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,Ni.__webglFramebuffer);for(let fi=0;fi<De;fi++)Gn&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(E).__webglTexture,K,Qe+fi),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Y.get(X).__webglTexture,Me,Ht+fi)),H.blitFramebuffer(Oe,Xe,Ee,Se,Ue,pt,Ee,Se,H.DEPTH_BUFFER_BIT,H.NEAREST);S.bindFramebuffer(H.READ_FRAMEBUFFER,null),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||Y.has(E)){const Et=Y.get(E),ki=Y.get(X);S.bindFramebuffer(H.READ_FRAMEBUFFER,P),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,I);for(let Dt=0;Dt<De;Dt++)Gn?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Et.__webglTexture,K,Qe+Dt):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Et.__webglTexture,K),yt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ki.__webglTexture,Me,Ht+Dt):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ki.__webglTexture,Me),K!==0?H.blitFramebuffer(Oe,Xe,Ee,Se,Ue,pt,Ee,Se,H.COLOR_BUFFER_BIT,H.NEAREST):yt?H.copyTexSubImage3D(Te,Me,Ue,pt,Ht+Dt,Oe,Xe,Ee,Se):H.copyTexSubImage2D(Te,Me,Ue,pt,Oe,Xe,Ee,Se);S.bindFramebuffer(H.READ_FRAMEBUFFER,null),S.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else yt?E.isDataTexture||E.isData3DTexture?H.texSubImage3D(Te,Me,Ue,pt,Ht,Ee,Se,De,St,fn,bt.data):X.isCompressedArrayTexture?H.compressedTexSubImage3D(Te,Me,Ue,pt,Ht,Ee,Se,De,St,bt.data):H.texSubImage3D(Te,Me,Ue,pt,Ht,Ee,Se,De,St,fn,bt):E.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,Me,Ue,pt,Ee,Se,St,fn,bt.data):E.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,Me,Ue,pt,bt.width,bt.height,St,bt.data):H.texSubImage2D(H.TEXTURE_2D,Me,Ue,pt,Ee,Se,St,fn,bt);S.pixelStorei(H.UNPACK_ROW_LENGTH,Un),S.pixelStorei(H.UNPACK_IMAGE_HEIGHT,it),S.pixelStorei(H.UNPACK_SKIP_PIXELS,Qt),S.pixelStorei(H.UNPACK_SKIP_ROWS,Hn),S.pixelStorei(H.UNPACK_SKIP_IMAGES,Vi),Me===0&&X.generateMipmaps&&H.generateMipmap(Te),S.unbindTexture()},this.initRenderTarget=function(E){Y.get(E).__webglFramebuffer===void 0&&J.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?J.setTextureCube(E,0):E.isData3DTexture?J.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?J.setTexture2DArray(E,0):J.setTexture2D(E,0),S.unbindTexture()},this.resetState=function(){B=0,A=0,U=null,S.reset(),ve.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),n.unpackColorSpace=ct._getUnpackColorSpace()}}function f3(t,e=300){if(!t||!Array.isArray(t.nodes)||!Array.isArray(t.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=t.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,e),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,h,f,u;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((h=l.properties)==null?void 0:h.filePath)||(l.uri&&l.uri.startsWith("file://")?l.uri.replace(/^file:\/\//,""):l.uri&&l.uri.startsWith("symbol://")?l.uri.replace(/^symbol:\/\//,"").split("#")[0]:l.uri)||"",line:((f=l.properties)==null?void 0:f.line)||null,status:((u=l.properties)==null?void 0:u.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:t.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:t.edges.length}}function d3(t){const{CLUSTERS:e,NODES:n,EDGES:i,META:a}=f3(t);let s="dark";for(const C of e)C.color=C[s];const r=Object.fromEntries(e.map(C=>[C.id,C])),o=n.map(([C,L,z,G],P)=>({i:P,id:C,name:a[C].label,cid:L,w:z,desc:G,cluster:r[L],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(C=>[C.id,C]));for(const C of o)C.meta=a[C.id]||{};const c=[];for(const[C,L,z]of i){const G=l[C],P=l[L];if(!G||!P){console.warn("[atlas] Dropped invalid edge:",C,"→",L);continue}c.push({s:G,t:P,kind:z,i:c.length,alpha:1}),z==="pre"?(G.out.push(P),P.in.push(G)):(G.rel.push(P),P.rel.push(G))}const h=C=>C.out.length+C.in.length+C.rel.length,f=o.map(()=>[]);for(const C of c)f[C.s.i].push(C.t.i),f[C.t.i].push(C.s.i);const u=42;for(const C of e){const[L,z,G]=C.anchor,P=Math.hypot(L,z,G)||1;C.dir=[L/P,z/P,G/P]}const p=new Array(o.length).fill(-1);(function(){let L=!0,z=0;for(const G of o)G.in.length||(p[G.i]=0);for(;L&&z++<40;){L=!1;for(const G of o){let P=G.in.length?-1:0;for(const I of G.in)p[I.i]>=0&&(P=Math.max(P,p[I.i]+1));P>=0&&P!==p[G.i]&&(p[G.i]=P,L=!0)}}for(let G=0;G<p.length;G++)p[G]<0&&(p[G]=2)})();const g=Math.max(1,...p),b={atlas:[],shell:[],tier:[]};o.forEach((C,L)=>{const z=C.cluster.dir,G=1-Math.min(h(C),12)/26;b.atlas.push([z[0]*u*G,z[1]*u*G,z[2]*u*G]);const P=e.indexOf(C.cluster),I=o.filter(V=>V.cid===C.cid).indexOf(C),B=o.filter(V=>V.cid===C.cid).length,A=(P/e.length+I/B/e.length)*Math.PI*2,U=(I/B-.5)*1.5;b.shell.push([u*.95*Math.cos(U)*Math.cos(A),u*.95*Math.sin(U),u*.95*Math.cos(U)*Math.sin(A)]),b.tier.push([z[0]*u*.72,(p[L]/g-.5)*u*1.5,z[2]*u*.72])});let v="atlas";o.forEach((C,L)=>{const z=b.atlas[L];C.x=z[0]+(Math.random()-.5)*16,C.y=z[1]+(Math.random()-.5)*16,C.z=z[2]+(Math.random()-.5)*16});let d=1;const x=9,M=.04,_=130,w=.05;function N(){if(d<.004)return;const C=b[v];for(let L=0;L<o.length;L++){const z=o[L];for(let G=L+1;G<o.length;G++){const P=o[G];let I=z.x-P.x,B=z.y-P.y,A=z.z-P.z,U=I*I+B*B+A*A+.6;const V=_/U,se=Math.sqrt(U);I/=se,B/=se,A/=se,z.vx+=I*V,z.vy+=B*V,z.vz+=A*V,P.vx-=I*V,P.vy-=B*V,P.vz-=A*V}}for(const L of c){const z=L.s,G=L.t;let P=G.x-z.x,I=G.y-z.y,B=G.z-z.z;const A=Math.hypot(P,I,B)||1,U=(A-x)*M;P/=A,I/=A,B/=A,z.vx+=P*U,z.vy+=I*U,z.vz+=B*U,G.vx-=P*U,G.vy-=I*U,G.vz-=B*U}for(let L=0;L<o.length;L++){const z=o[L],G=C[L];z.vx+=(G[0]-z.x)*w,z.vy+=(G[1]-z.y)*w,z.vz+=(G[2]-z.z)*w;const P=.82;z.vx*=P,z.vy*=P,z.vz*=P,z.x+=z.vx*d,z.y+=z.vy*d,z.z+=z.vz*d}d*=.988}for(let C=0;C<220;C++)N();const T=46;function y(){let C=0;for(const L of o)C=Math.max(C,Math.hypot(L.x,L.y,L.z));return Math.max(10,C)/Math.sin(T*Math.PI/360)*.88}function R({els:C,emit:L}){const z=new AbortController,{signal:G}=z,P=(nt,Ve,D,S)=>nt.addEventListener(Ve,D,{...S,signal:G});let I=0;const{stage:B}=C;let A,U,V,se,le,xe,ke=!0;try{A=new Xy({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{ke=!1}if(A||(ke=!1),!ke)return L.gate(!0),{dispose(){}};{let Ts=function(ae,Pe){const Ae=W.uniforms.uPx.value;for(const we of o){oa.set(we.x,we.y,we.z);const Je=V.position.distanceTo(oa);oa.project(V),we.sx=(oa.x*.5+.5)*ae,we.sy=(-oa.y*.5+.5)*Pe,we.sz=oa.z,we.sr=we.size*we.scale*Ae/Math.max(Je,1)*.5}},Ql=function(){la.fill(1),ui.fill(1),Gi.fill(1);const ae=No,Pe=Ae=>!ae||Ae.name.toLowerCase().includes(ae)||Ae.desc.toLowerCase().includes(ae)||(Ae.meta.path||"").toLowerCase().includes(ae)||(Ae.meta.kind||"").toLowerCase().includes(ae);for(const Ae of o)Ae.vis=!ra.has(Ae.cid)&&Pe(Ae),Ae.vis||(la[Ae.i]=0,ui[Ae.i]=.6);for(const Ae of c)(!Ae.s.vis||!Ae.t.vis)&&(Gi[Ae.i]=0);if(Dn){for(const Ae of o)Ae.vis&&(la[Ae.i]=Dn.has(Ae.i)?1:Es,ui[Ae.i]=Dn.has(Ae.i)?1.25:.8);for(const Ae of c)Gi[Ae.i]&&(Gi[Ae.i]=Dn.has(Ae.s.i)&&Dn.has(Ae.t.i)?1.35:Es*.5)}else if(Ft){const Ae=new Set([Ft.i,...f[Ft.i]]);for(const we of o)we.vis&&(la[we.i]=Ae.has(we.i)?1:Es,ui[we.i]=we===Ft?1.75:Ae.has(we.i)?1.15:.75);for(const we of c)Gi[we.i]&&(Gi[we.i]=we.s===Ft||we.t===Ft?1.4:Es*.45)}return Kt&&Kt.vis&&(la[Kt.i]=1,ui[Kt.i]=Math.max(ui[Kt.i],1.6)),{nT:la,sT:ui,eT:Gi}},Do=function(ae){Ft=ae,Dn=null,C.pathbar.classList.remove("on"),Q.tx=ae.x,Q.ty=ae.y,Q.tz=ae.z,Q.tDist=Math.min(Q.tDist,te*.72),fi(ae),Et(),Gn()},cr=function(){Ft=null,Dn=null,Q.tx=Q.ty=Q.tz=0,C.pathbar.classList.remove("on"),fi(null),Et(),Gn()},$l=function(ae,Pe){const Ae=new Array(o.length).fill(-1),we=new Set([ae.i]),Je=[ae.i];for(;Je.length;){const di=Je.shift();if(di===Pe.i)break;for(const dn of f[di])!we.has(dn)&&o[dn].vis&&(we.add(dn),Ae[dn]=di,Je.push(dn))}if(!we.has(Pe.i)){C.chain.textContent="Keine Kausalkette zwischen diesen Objekten",C.pathbar.classList.add("on");return}const Ln=[];let et=Pe.i;for(;et!==-1&&(Ln.unshift(et),et!==ae.i);)et=Ae[et];Dn=new Set(Ln),C.chain.textContent=Ln.map(di=>o[di].name).join(" → "),C.pathbar.classList.add("on"),Gn()},E=function(){Dn=null,C.pathbar.classList.remove("on"),Gn()},Me=function(ae,Pe){let Ae=0;const we=new Set;sa&&K.forEach(et=>we.add(et)),Ft&&(we.add(Ft.i),f[Ft.i].forEach(et=>we.add(et))),Dn&&Dn.forEach(et=>we.add(et)),Kt&&we.add(Kt.i);const Je=[...we].map(et=>o[et]).filter(et=>et.vis&&et.sz<1&&et.sx>-60&&et.sx<ae+60&&et.sy>-20&&et.sy<Pe+20).sort((et,di)=>et.sz-di.sz),Ln=[];for(const et of Je){if(Ae>=Z.length)break;const di=et.name.length*11.5+8,dn=[et.sx-di/2,et.sy-18,di,16];if(Ln.some($t=>dn[0]<$t[0]+$t[2]&&dn[0]+dn[2]>$t[0]&&dn[1]<$t[1]+$t[3]&&dn[1]+dn[3]>$t[1]))continue;Ln.push(dn);const Ye=Z[Ae++];Ye.textContent=et.name,Ye.className="lab"+(et===Kt||et===Ft?"":" sm"),Ye.style.transform=`translate(-50%,-50%) translate(${et.sx.toFixed(1)}px,${(et.sy-17).toFixed(1)}px)`,Ye.style.opacity=Math.min(1,et.alpha*1.3),Ye.style.color=et===Kt||et===Ft?et.cluster.color:""}for(;Ae<Z.length;Ae++)Z[Ae].style.opacity=0},Ht=function(ae){I=requestAnimationFrame(Ht);const Pe=Math.min(.05,(ae-Ee)/1e3);Ee=ae;const Ae=B.clientWidth,we=B.clientHeight;if(!Ae||!we)return;A.domElement.width!==Math.round(Ae*A.getPixelRatio())&&(A.setSize(Ae,we,!1),V.aspect=Ae/we,V.updateProjectionMatrix(),ee.uniforms.uPx.value=W.uniforms.uPx.value=we/(2*Math.tan(V.fov*Math.PI/360))),N(),Hi&&(Q.tTheta+=Pe*.09);const Je=1-Math.pow(.0016,Pe);if(Q.theta+=(Q.tTheta-Q.theta)*Je,Q.phi+=(Q.tPhi-Q.phi)*Je,Q.dist+=(Q.tDist-Q.dist)*Je,Q.cx+=(Q.tx-Q.cx)*Je,Q.cy+=(Q.ty-Q.cy)*Je,Q.cz+=(Q.tz-Q.cz)*Je,V.position.set(Q.cx+Q.dist*Math.sin(Q.phi)*Math.cos(Q.theta),Q.cy+Q.dist*Math.cos(Q.phi),Q.cz+Q.dist*Math.sin(Q.phi)*Math.sin(Q.theta)),V.lookAt(Q.cx,Q.cy,Q.cz),Ts(Ae,we),aa.live&&!ve){let Ye=null;for(const $t of o){if(!$t.vis||$t.sz>1)continue;const cg=$t.sx-aa.x,ug=$t.sy-aa.y,fg=$t.sr+7;cg*cg+ug*ug>fg*fg||(!Ye||$t.sz<Ye.sz)&&(Ye=$t)}Ye!==Kt&&(Kt=Ye,dt.style.cursor=Ye?"pointer":"grab",Gn())}const{nT:Ln,sT:et,eT:di}=Ql(),dn=1-Math.pow(.002,Pe);for(const Ye of o)Ye.alpha+=(Ln[Ye.i]-Ye.alpha)*dn,Ye.scale+=(et[Ye.i]-Ye.scale)*dn,Oe.array[Ye.i*3]=Ye.x,Oe.array[Ye.i*3+1]=Ye.y,Oe.array[Ye.i*3+2]=Ye.z,Xe.array[Ye.i]=Ye.alpha,Qe.array[Ye.i]=Ye.scale;Oe.needsUpdate=Xe.needsUpdate=Qe.needsUpdate=!0;for(const Ye of c){Ye.alpha+=(di[Ye.i]-Ye.alpha)*dn;const $t=Ye.i*6;Ue.array[$t]=Ye.s.x,Ue.array[$t+1]=Ye.s.y,Ue.array[$t+2]=Ye.s.z,Ue.array[$t+3]=Ye.t.x,Ue.array[$t+4]=Ye.t.y,Ue.array[$t+5]=Ye.t.z,pt.array[Ye.i*2]=pt.array[Ye.i*2+1]=Ye.alpha}Ue.needsUpdate=pt.needsUpdate=!0,pe.uniforms.uTime.value=ae/1e3,pe.uniforms.uFlow.value+=((ci?1:0)-pe.uniforms.uFlow.value)*dn,Me(Ae,we),A.render(U,V),Se+=1/Math.max(Pe,1e-4),De++,De>=30&&(C.sFps.textContent=Math.round(Se/De),Se=De=0)},bt=function(ae=.55){d=Math.max(d,ae)},St=function(ae){v=ae,C.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[v],bt(1)},it=function(){Q.tTheta=.7,Q.tPhi=1.15,Q.tDist=y(),cr(),bt(.8),Rn()},Qt=function(){L.tools({flow:ci,label:sa,spin:Hi})},Hn=function(ae){s=ae,document.documentElement.dataset.theme=ae,L.theme(ae);const Pe=ae==="light";for(const Je of e)Je.color=Je[ae];o.forEach((Je,Ln)=>{const et=nt(Je.cluster.color);S[Ln*3]=et[0],S[Ln*3+1]=et[1],S[Ln*3+2]=et[2]}),de.getAttribute("aColor").needsUpdate=!0,c.forEach((Je,Ln)=>{O.set(nt(Je.s.cluster.color),Ln*6),O.set(nt(Je.t.cluster.color),Ln*6+3)}),F.getAttribute("aColor").needsUpdate=!0;const Ae=Pe?js:Xr;for(const Je of[ee,W,pe])Je.uniforms.uLight.value=Pe?1:0,Je.blending=Ae,Je.needsUpdate=!0;const we=Pe?16053489:328967;A.setClearColor(we,1),U.fog.color.setHex(we),U.fog.density=Pe?.0042:.0068,Et(),Ft&&fi(Ft)},Gn=function(){C.hudSel.textContent=Dn?`Kausalkette · ${Dn.size} Stationen`:Ft?Ft.name:Kt?Kt.name:"Nichts ausgewählt"},yt=function(ae){ra.has(ae)?ra.delete(ae):ra.add(ae),Et(),bt(.4)},Et=function(){const ae=C.q.value.trim().toLowerCase(),Pe=o.filter(we=>!ra.has(we.cid)&&(!ae||we.name.toLowerCase().includes(ae)||we.desc.toLowerCase().includes(ae))).sort((we,Je)=>h(Je)-h(we));L.list({q:ae,rows:Pe.map(we=>({i:we.i,name:we.name,color:we.cluster.color,deg:h(we),on:we===Ft}))}),C.sNode.textContent=Pe.length;const Ae=c.filter(we=>Pe.includes(we.s)&&Pe.includes(we.t)).length;C.sEdge.textContent=Ae,C.sDeg.textContent=Pe.length?(Ae*2/Pe.length).toFixed(1):"0"},Ni=function(ae){No=ae.trim().toLowerCase(),Et(),bt(.25)},fi=function(ae){L.drawer(ae&&{i:ae.i,name:ae.name,desc:ae.desc,cname:ae.cluster.name,color:ae.cluster.color,deg:h(ae),depth:p[ae.i],kind:ae.meta.kind||"",path:ae.meta.path||"",line:ae.meta.line||null,status:ae.meta.status||"",prov:ae.meta.prov||"",groups:[["Ursache · eingehend",ae.in,"IN"],["Wirkung · ausgehend",ae.out,"OUT"],["Assoziiert · Backlinks",ae.rel,"REL"]].filter(([,Pe])=>Pe.length).map(([Pe,Ae,we])=>({title:Pe,tag:we,items:Ae.map(Je=>({i:Je.i,name:Je.name,color:Je.cluster.color}))}))})},Uo=function(ae){const Pe=o[ae],Ae=b[v],we=Ae[Pe.i].slice();for(let Je=0;Je<Ae.length;Je++)Ae[Je][0]-=we[0],Ae[Je][1]-=we[1],Ae[Je][2]-=we[2];Q.tx=Q.ty=Q.tz=0,bt(1)},lg=function(ae){const Pe=o[ae];C.chain.textContent="Start bei "+Pe.name+" — Shift+Klick auf das Zielobjekt",C.pathbar.classList.add("on")};var Ke=Ts,Be=Ql,re=Do,_e=cr,me=$l,Le=E,ze=Me,Ie=Ht,xt=bt,je=St,lt=it,Ge=Qt,qe=Hn,Ct=Gn,mt=yt,zt=Et,Ot=Ni,Rt=fi,ye=Uo,H=lg;A.setPixelRatio(Math.min(devicePixelRatio,2)),B.appendChild(A.domElement),U=new Ty,U.fog=new Jm(328967,.0068),V=new xi(T,1,1,1400);const nt=ae=>{const Pe=new rt(ae);return[Pe.r,Pe.g,Pe.b]},Ve=o.length,D=new Float32Array(Ve*3),S=new Float32Array(Ve*3),j=new Float32Array(Ve),Y=new Float32Array(Ve),J=new Float32Array(Ve);o.forEach((ae,Pe)=>{const Ae=nt(ae.cluster.color);S[Pe*3]=Ae[0],S[Pe*3+1]=Ae[1],S[Pe*3+2]=Ae[2],j[Pe]=ae.size=.95+ae.w*.4,Y[Pe]=1,J[Pe]=1});const de=new Cn;de.setAttribute("position",new Mt(D,3)),de.setAttribute("aColor",new Mt(S,3)),de.setAttribute("aSize",new Mt(j,1)),de.setAttribute("aAlpha",new Mt(Y,1)),de.setAttribute("aScale",new Mt(J,1));const ge=`
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
      }`,transparent:!0,blending:Xr,depthWrite:!1}),W=new bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:ge,fragmentShader:`
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
      }`,transparent:!0,blending:Xr,depthWrite:!1});se=new Op(de,ee),le=new Op(de,W),se.frustumCulled=!1,le.frustumCulled=!1,U.add(se,le);const ie=c.length,ue=new Float32Array(ie*6),O=new Float32Array(ie*6),k=new Float32Array(ie*2),he=new Float32Array(ie*2),fe=new Float32Array(ie*2),Ce=new Float32Array(ie*2);c.forEach((ae,Pe)=>{const Ae=nt(ae.s.cluster.color),we=nt(ae.t.cluster.color);O.set(Ae,Pe*6),O.set(we,Pe*6+3),k[Pe*2]=0,k[Pe*2+1]=1;const Je=Pe*.6180339887%1;he[Pe*2]=Je,he[Pe*2+1]=Je,fe[Pe*2]=fe[Pe*2+1]=1,Ce[Pe*2]=Ce[Pe*2+1]=ae.kind==="pre"?1:0});const F=new Cn;F.setAttribute("position",new Mt(ue,3)),F.setAttribute("aColor",new Mt(O,3)),F.setAttribute("aT",new Mt(k,1)),F.setAttribute("aSeed",new Mt(he,1)),F.setAttribute("aAlpha",new Mt(fe,1)),F.setAttribute("aDir",new Mt(Ce,1));const pe=new bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:Xr,depthWrite:!1});xe=new pu(F,pe),xe.frustumCulled=!1,U.add(xe);const te=y(),Q={theta:.7,phi:1.15,dist:te,tTheta:.7,tPhi:1.15,tDist:te,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let ve=!1,oe=0,Re=0,Ne=0;const dt=A.domElement;P(dt,"pointerdown",ae=>{ve=!0,Ne=0,oe=ae.clientX,Re=ae.clientY,dt.setPointerCapture(ae.pointerId)}),P(dt,"pointerup",ae=>{ve=!1,dt.releasePointerCapture(ae.pointerId)}),P(dt,"pointermove",ae=>{const Pe=dt.getBoundingClientRect();if(aa.x=ae.clientX-Pe.left,aa.y=ae.clientY-Pe.top,aa.live=!0,!ve)return;const Ae=ae.clientX-oe,we=ae.clientY-Re;Ne+=Math.abs(Ae)+Math.abs(we),oe=ae.clientX,Re=ae.clientY,Q.tTheta-=Ae*.0052,Q.tPhi=Math.max(.12,Math.min(Math.PI-.12,Q.tPhi-we*.0052)),Hi=!1,Qt()}),P(dt,"pointerleave",()=>{aa.live=!1});const Nt=C.zlvl,Rn=()=>{Nt.textContent=Math.round(te/Q.tDist*100)+"%"},Nn=ae=>{Q.tDist=Math.max(te*.22,Math.min(te*2.6,Q.tDist*ae)),Rn()};P(dt,"wheel",ae=>{ae.preventDefault(),Nn(1+Math.sign(ae.deltaY)*.11)},{passive:!1});const wf=()=>{Q.tDist=te,Rn()};Rn();const aa={x:-1,y:-1,live:!1};let Kt=null,Ft=null,Dn=null,Hi=!0,sa=!0,ci=!0;const ra=new Set,Es=.12,oa=new q;P(dt,"click",ae=>{if(!(Ne>5)){if(!Kt){ae.shiftKey||cr();return}if(ae.shiftKey&&Ft&&Kt!==Ft){$l(Ft,Kt);return}Do(Kt)}});const la=new Float32Array(o.length),ui=new Float32Array(o.length),Gi=new Float32Array(c.length);let No="";const X=C.labels,$=14,Z=Array.from({length:44},()=>{const ae=document.createElement("div");return ae.className="lab",ae.style.opacity=0,X.appendChild(ae),ae}),K=[...o].sort((ae,Pe)=>h(Pe)-h(ae)).slice(0,$).map(ae=>ae.i);let Ee=performance.now(),Se=0,De=0;const Oe=de.getAttribute("position"),Xe=de.getAttribute("aAlpha"),Qe=de.getAttribute("aScale"),Ue=F.getAttribute("position"),pt=F.getAttribute("aAlpha");I=requestAnimationFrame(Ht);const fn=()=>{ci=!ci,Qt()},Te=()=>{sa=!sa,Qt()},Un=()=>{Hi=!Hi,Qt()},Vi=()=>Hn(s==="light"?"dark":"light");P(window,"keydown",ae=>{if(/^(INPUT|TEXTAREA)$/.test(ae.target.tagName)){ae.key==="Escape"&&ae.target.blur();return}ae.key==="Escape"?cr():ae.key==="l"||ae.key==="L"?(sa=!sa,Qt()):ae.key==="r"||ae.key==="R"?it():ae.key===" "?(ae.preventDefault(),Hi=!Hi,Qt()):ae.key==="/"?(ae.preventDefault(),C.q.focus()):ae.key==="="||ae.key==="+"?Nn(1/1.18):(ae.key==="-"||ae.key==="_")&&Nn(1.18)});const ki=ae=>Do(o[ae]),Dt=ae=>{Kt=ae===null?null:o[ae]};return Hn(s),Et(),fi(null),Qt(),Gn(),{setView:St,toggleFlow:fn,toggleLabel:Te,toggleSpin:Un,reset:it,toggleTheme:Vi,dolly:Nn,zoomReset:wf,toggleCluster:yt,selectAt:ki,hoverAt:Dt,setQuery:Ni,clearPath:E,centerOn:Uo,startPath:lg,dispose(){z.abort(),cancelAnimationFrame(I),de.dispose(),F.dispose(),ee.dispose(),W.dispose(),pe.dispose(),A.dispose(),dt.remove(),C.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:o,edges:c,deg:h,createAtlas:R}}function jy(t){if(typeof t!="string"||t==="")return t;const e=t.split(/[\\/]/).filter(Boolean);return e.length>0?e[e.length-1]:t}const Wy="plugbrain.workspace";function h3(){try{return localStorage.getItem(Wy)||""}catch{return""}}function p3(t){try{localStorage.setItem(Wy,t)}catch{}}async function Wv(){const t=await fetch("/api/galaxy");if(!t.ok)throw new Error(`Galaxie: HTTP ${t.status}`);const e=await t.json();if(!(e!=null&&e.ok)||!Array.isArray(e.planets))throw new Error("Die Galaxie antwortet unvollständig.");return e.planets}function qv(t){if(typeof t!="string")return"";const e=t.trim();if(e==="")return"";if(/^[a-zA-Z]:[\\/]/.test(e)||/^[\\/]{2}/.test(e)){const i=e.replace(/\\/g,"/"),a=i.startsWith("//")?`//${i.slice(2).replace(/\/{2,}/g,"/")}`:i.replace(/\/{2,}/g,"/");return(a==="//"||/^[a-zA-Z]:\/$/.test(a)?a:a.replace(/\/+$/,"")).toLowerCase()}return e==="/"?e:e.replace(/\/+$/,"")}function m3(t,e){var i;const n=qv(e);return!n||!Array.isArray(t)?"":((i=t.find(a=>typeof(a==null?void 0:a.id)=="string"&&qv(a.root)===n))==null?void 0:i.id)??""}async function g3(t,e,n){var s;const i=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:t,name:e})});if(!i.ok){const r=await i.json().catch(()=>null);throw new Error((r==null?void 0:r.error)??`Registrieren: HTTP ${i.status}`)}const a=await i.json();if(!(a!=null&&a.ok)||!((s=a.workspace)!=null&&s.id))throw new Error("Registrieren: unvollständige Antwort.");return await qy(a.workspace.id,n),a.workspace.id}function Ip(t){var r,o,l;const e=t==null?void 0:t.run;if(!e)return"Kein Indexlauf bekannt.";if(t.stale)return t.ownerAlive&&!t.recoverable?"Indexlauf ohne neuen Fortschritt; der Owner-Prozess läuft noch. Die Sperre bleibt geschützt.":"Indexlauf ohne neuen Fortschritt; der frühere Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.";const n=Math.max(0,Math.round((Date.now()-Date.parse(e.startedAt))/1e3)),i={starting:"startet",scan:"sammelt Dateien",classify:"vergleicht",write:"schreibt",resolve:"verknüpft",publish:"veröffentlicht",done:"fertig",failed:"fehlgeschlagen"}[e.phase]??e.phase;if(e.finishedAt)return e.ok?`Fertig: ${((r=e.result)==null?void 0:r.files)??e.scanned} Dateien, ${((o=e.result)==null?void 0:o.symbols)??0} Symbole, ${((l=e.result)==null?void 0:l.edges)??0} Kanten in ${n} s.`:`Indexlauf fehlgeschlagen: ${e.error??"unbekannter Grund"}`;const a=e.total>0?`/${e.total}`:"",s=e.total>0?` (${Math.round(e.processed/e.total*100)} %)`:"";return`Indexiert: ${i} ${e.processed}${a}${s} — ${n} s`}function v3(t,e){return t!=null&&t.running||t!=null&&t.stale?Ip(t):e.startsWith("Indexiert:")||e.startsWith("Indexlauf ohne neuen Fortschritt;")?"":e}async function _3(t){const e=await fetch(`/api/index/progress?workspace=${encodeURIComponent(t)}`);return e.ok?e.json():null}const x3=t=>new Promise(e=>setTimeout(e,t));async function S3(t,e){for(;;){await x3(900);const n=await _3(t);if(n===null)throw new Error("Der Fortschritt ist nicht abrufbar.");if(e==null||e(n),n.running)continue;if(n.stale)throw n.ownerAlive&&!n.recoverable?new Error("Der Indexlauf meldet keinen neuen Fortschritt, aber der Owner-Prozess läuft noch. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):new Error("Der Indexlauf ist verstummt und sein Owner ist nicht mehr aktiv. Er kann erneut gestartet werden.");const i=n.run;if(!i)throw new Error("Kein Indexlauf bekannt.");if(i.ok)return i.result;throw new Error(i.error??"Indexlauf fehlgeschlagen.")}}async function qy(t,e){const n=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:t})}),i=await n.json().catch(()=>null);if(n.status===409&&(i!=null&&i.busy))throw i.ownerAlive&&!i.recoverable?new Error("Ein stiller Indexlauf gehört noch einem lebenden Owner-Prozess. Die Sperre bleibt geschützt; nach Ende oder Neustart des Owners erneut indizieren."):i.recoverable?new Error("Der vorherige Index-Owner ist nicht mehr aktiv. Der Lauf kann erneut gestartet werden."):new Error(i.error??"Ein Indexlauf ist bereits unterwegs.");if(!n.ok)throw new Error(`Indizieren: HTTP ${n.status}`);if(!(i!=null&&i.ok))throw new Error("Indizieren: unvollständige Antwort.");return i.result!==void 0&&i.result!==null?i.result:S3(t,e)}const Yy="plugbrain.auth_token",Bp="plugbrain.agent_id";function y3(){var t,e;try{return((e=(t=window.__PLUGBRAIN__)==null?void 0:t.token)==null?void 0:e.trim())??""}catch{return""}}function Zy(){var n,i;let t="";try{t=((n=new URLSearchParams(window.location.search).get("token"))==null?void 0:n.trim())??""}catch{}if(t)return Ky(t),t;const e=y3();if(e)return e;try{return((i=localStorage.getItem(Yy))==null?void 0:i.trim())??""}catch{return""}}function Ky(t){try{localStorage.setItem(Yy,t)}catch{}}function Fi(){try{const t=new URLSearchParams(window.location.search).get("agent");return t?(localStorage.setItem(Bp,t),t):localStorage.getItem(Bp)||"agy"}catch{return"agy"}}function M3(t){try{localStorage.setItem(Bp,t)}catch{}}function Ha(){const t=Zy(),e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["x-plug-auth-token"]=t),e}async function b3(t){const e=await fetch(`/api/planet?workspace=${encodeURIComponent(t)}`);if(!e.ok){const i=await e.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Planet inventory HTTP ${e.status}`)}const n=await e.json();if(!(n!=null&&n.ok)||!n.planet||!Array.isArray(n.planet.checkouts))throw new Error("Planet-Inventar unvollständig");return n.planet}async function E3(t,e){const n=await fetch("/api/planet/selection",{method:"POST",headers:Ha(),body:JSON.stringify({workspace:t,checkoutIds:e})}),i=await n.json().catch(()=>null);if(!n.ok||!(i!=null&&i.ok)||!i.planet)throw new Error((i==null?void 0:i.error)??`Code-Auswahl HTTP ${n.status}`);return i.planet}async function T3(t){const e=await fetch(`/api/git?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Git-Status HTTP ${e.status}`);return e.json()}async function A3(t){const e=await fetch(`/api/mesh?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Mesh HTTP ${e.status}`);const n=await e.json(),i=n==null?void 0:n.mesh;if(!(n!=null&&n.ok)||!i||i.workspaceId!==t||!Array.isArray(i.nodes)||!Array.isArray(i.edges))throw new Error("Mesh-Projektion unvollständig oder für einen anderen Workspace");return i}async function w3(t,e={}){const n=new URLSearchParams({workspace:t});e.agentId&&n.set("agentId",e.agentId),e.taskId&&n.set("taskId",e.taskId),e.workerId&&n.set("workerId",e.workerId),e.limit!==void 0&&n.set("limit",String(e.limit));const i=await fetch(`/api/mesh/timeline?${n}`);if(!i.ok)throw new Error(`Mesh-Zeitleiste HTTP ${i.status}`);const a=await i.json();if(!(a!=null&&a.ok)||!Array.isArray(a.timeline))throw new Error("Mesh-Zeitleiste unvollständig");return a.timeline}async function C3(t,e){const n=await fetch(`/api/provenance?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Provenance HTTP ${n.status}`);return n.json()}async function R3(t,e=Fi(),n="AGY"){const i=await fetch("/api/agent/attach",{method:"POST",headers:Ha(),body:JSON.stringify({workspace:t,agentId:e,name:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Agent Attach HTTP ${i.status}`)}return i.json()}const gu=new Map;function Kl(t,e=Fi()){const n=`${t}\0${e}`,i=gu.get(n);if(i)return i;const a=R3(t,e).then(()=>{}).catch(()=>{gu.delete(n)});return gu.set(n,a),a}function N3(){gu.clear()}async function D3(t,e,n=Fi()){await Kl(t,n);const i=await fetch("/api/agent/search",{method:"POST",headers:Ha(),body:JSON.stringify({workspace:t,agentId:n,query:e})});if(!i.ok){const s=await i.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Search HTTP ${i.status}`)}const a=await i.json();return Array.isArray(a==null?void 0:a.hits)?a.hits:[]}async function U3(t,e,n=Fi()){await Kl(t,n);const i=await fetch("/api/agent/read",{method:"POST",headers:Ha(),body:JSON.stringify({workspace:t,agentId:n,path:e})});if(!i.ok){const s=await i.json().catch(()=>null),r=(s==null?void 0:s.error)??`HTTP ${i.status}`;return{ok:!1,path:e,content:"",bytes:0,lang:null,error:r}}const a=await i.json();return{ok:!0,path:a.path??e,content:a.content??"",bytes:a.bytes??0,lang:a.lang??null}}async function Yv(t,e,n=Fi()){const i=await fetch("/api/context/pack",{method:"POST",headers:Ha(),body:JSON.stringify({workspaceId:t,goal:e,agentId:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Context Pack HTTP ${i.status}`)}return i.json()}async function L3(t){const e=await fetch(`/api/context/pack/${encodeURIComponent(t)}/staleness`);if(!e.ok){const n=await e.json().catch(()=>null);throw new Error((n==null?void 0:n.error)??`Staleness HTTP ${e.status}`)}return e.json()}async function O3(t,e){const n=await fetch(`/api/notes/query?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}`,{headers:Ha()});if(!n.ok){const i=await n.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Notes Query HTTP ${n.status}`)}return n.json()}async function Qy(t,e,n=30){const i=await fetch(`/api/notes/search?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}&limit=${n}&lines=1`,{headers:Ha()});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Notizsuche HTTP ${i.status}`)}return i.json()}async function P3(t,e){const n=await fetch(`/api/notes/backlinks?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.backlinks)?i.backlinks:[]}async function z3(t){const e=await fetch(`/api/notes?workspace=${encodeURIComponent(t)}&limit=5000`),n=await e.json().catch(()=>null);if(!e.ok||!(n!=null&&n.ok))throw new Error((n==null?void 0:n.error)??`Notizen HTTP ${e.status}`);return Array.isArray(n.notes)?n.notes:[]}async function jd(t,e,n=Fi()){await Kl(t,n);const i=await fetch(`/api/notes/read?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}&agentId=${encodeURIComponent(n)}`),a=await i.json().catch(()=>null);if(!i.ok||!(a!=null&&a.ok)||!a.note)throw new Error((a==null?void 0:a.error)??`Notiz lesen HTTP ${i.status}`);return a.note}async function Zv(t,e,n,i,a=Fi()){await Kl(t,a);const s=await fetch("/api/notes/write",{method:"POST",headers:Ha(),body:JSON.stringify({workspace:t,agentId:a,path:e,content:n,...i?{expectedHash:i}:{}})}),r=await s.json().catch(()=>null);if(!s.ok||!(r!=null&&r.ok)){const o=new Error((r==null?void 0:r.error)??`Notiz speichern HTTP ${s.status}`);throw Object.assign(o,{conflict:r==null?void 0:r.conflict,status:s.status}),o}return r}async function I3(t,e){const n=await fetch(`/api/notes/attachments?workspace=${encodeURIComponent(t)}&note=${encodeURIComponent(e)}`),i=await n.json().catch(()=>null);if(!n.ok||!(i!=null&&i.ok))throw new Error((i==null?void 0:i.error)??`Anhänge HTTP ${n.status}`);return Array.isArray(i.attachments)?i.attachments:[]}async function B3(t,e,n,i=Fi()){await Kl(t,i);const a=new Uint8Array(await n.arrayBuffer());let s="";for(let c=0;c<a.length;c+=32768)s+=String.fromCharCode(...a.subarray(c,c+32768));const r=btoa(s),o=await fetch("/api/notes/attachment",{method:"POST",headers:Ha(),body:JSON.stringify({workspace:t,agentId:i,note:e,name:n.name,base64:r})}),l=await o.json().catch(()=>null);if(!o.ok||!(l!=null&&l.ok)||!l.attachment)throw new Error((l==null?void 0:l.error)??`Anhang speichern HTTP ${o.status}`);return l.attachment}function F3(t,e,n,i=Fi()){return`/api/notes/attachment?workspace=${encodeURIComponent(t)}&note=${encodeURIComponent(e)}&name=${encodeURIComponent(n)}&agentId=${encodeURIComponent(i)}`}function Kv(t,e,n=Fi()){const i=new URLSearchParams({workspace:t,agentId:n});return e&&i.set("note",e),`/api/notes/export?${i}`}const Wt=[],os=[],xa=[],Pl=[],_l={},gn=[],vu=[],qi=7.2,Wr=6,zl=["--k1","--k2","--k3","--k4","--k5","--k6"],ng=t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),H3=t=>t.agentColor||ng(zl[(t.ki??0)%zl.length]),Qv=t=>ng(zl[t.ki%zl.length]),$y=new Map;let Jy="loc";function G3(t){Jy=t}const V3=t=>{const e=Math.max(1,...Wt.map(i=>i.loc)),n=Math.max(1,...Wt.map(i=>i.usedBy.length));return t.dying?0:Jy==="loc"?1.5+t.loc/e*26:1.5+t.usedBy.length/n*26},Fp=new Set,k3=t=>(Fp.add(t),()=>Fp.delete(t)),_o=()=>Fp.forEach(t=>t());function Hp(t,e,n="ok"){vu.unshift({t:new Date,ws:t,msg:e,kind:n,id:Math.random().toString(36).slice(2)}),vu.length>60&&vu.pop()}function Af(){var o;let e=0,n=0,i=0;const a=Pl.filter(l=>gn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=Wt.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=gn.find(g=>g.id===l))!=null&&o.dying))continue;const h=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),f=h*qi+Wr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/h))*qi+Wr;n+f>74&&n>0&&(e+=i,n=0,i=0);let p=xa.find(g=>g.dir===l);p||(p={dir:l,x:n+f/2,z:e+u/2,w:.01,h:.01},xa.push(p)),Object.assign(p,{tx:n,tz:e,tw:f,th:u,cols:h}),s.add(l),n+=f,i=Math.max(i,u)}const r=xa.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(h=>h.tx+h.tw))/2,c=Math.max(...r.map(h=>h.tz+h.th))/2;for(const h of r)h.tx-=l,h.tz-=c;for(const h of r)Wt.filter(u=>u.dir===h.dir).forEach((u,p)=>{u.tx=h.tx+Wr/2+p%h.cols*qi+qi/2,u.tz=h.tz+Wr/2+Math.floor(p/h.cols)*qi+qi/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=xa.length-1;l>=0;l--)!s.has(xa[l].dir)&&!Wt.some(c=>c.dir===xa[l].dir)&&xa.splice(l,1);for(const l of a)$y.set(l,.5)}function X3(t,e,n=!1){let i=gn.find(a=>a.id===t);return i||(i={id:t,name:e||t,ki:gn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},gn.push(i),Pl.includes(t)||Pl.push(t),Hp(e||t,"workspace registered","reg"),Af(),_o(),i)}function j3(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=e.split("/").pop(),c=e.includes("/")&&e.startsWith(t.id+"/")?e:`${t.id}/${e}`;let h=_l[c];if(h)return h.loc+=Math.max(2,Math.round(n*.25)),h.pulse=1,s&&(h.agentColor=s,h.agentName=r,h.access=o),h;h={path:c,name:l,dir:t.id,top:t.id,ki:t.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let f of i){f.includes("/")||(f=`${t.id}/${f}`);const u=_l[f];u&&(h.deps.push(f),os.push({from:h,to:u}),u.usedBy.push(c))}return Wt.push(h),_l[c]=h,Af(),_o(),h}function W3(){let t=!1;for(let e=Wt.length-1;e>=0;e--){const n=Wt[e];if(n.dying&&n.h<.25){Wt.splice(e,1),delete _l[n.path],t=!0;for(let i=os.length-1;i>=0;i--)(os[i].from===n||os[i].to===n)&&os.splice(i,1);for(const i of Wt){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let e=gn.length-1;e>=0;e--){const n=gn[e];if(n.dying&&!Wt.some(i=>i.dir===n.id)){gn.splice(e,1);const i=Pl.indexOf(n.id);i>=0&&Pl.splice(i,1),t=!0}}t&&(Af(),_o())}setInterval(()=>{let t=!1;for(const e of gn)e.load>.01&&(e.load*=.82,t=!0);t&&_o()},600);const il={register({id:t,name:e}={}){return t?X3(String(t),e&&String(e),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=gn.find(c=>c.id===t);return!l||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,j3(l,{path:e,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(t,e){const n=gn.find(a=>a.id===t);if(!n)return;const i=Wt.filter(a=>a.dir===t&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Hp(n.name,String(e||"event")),_o()},unregister(t){const e=gn.find(n=>n.id===t);e&&(e.dying=!0,Wt.filter(n=>n.dir===t).forEach(n=>{n.dying=!0}),Hp(e.name,"workspace unregistered","sys"),Af(),_o())},list:()=>gn.map(t=>({id:t.id,name:t.name,buildings:Wt.filter(e=>e.dir===t.id).length})),simulated:()=>!1};window.PlugBrainCity=il;const q3=1024,Y3=2048,$v=96,Jv=new Map;function Z3(t){if(!t.agentColor)return null;const e=t.agentColor+(t.access||"");let n=Jv.get(e);if(!n){n=new rt;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(t.agentColor);if(i){const a=t.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(t.agentColor)}catch{n.setHSL(0,0,.5)}Jv.set(e,n)}return n}function K3(t,e,n,{onSelect:i,onZoom:a}){let s;try{s=new Xy({antialias:!0,alpha:!0,canvas:t})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new Ty,o=new tg(-1,1,1,-1,-400,600),l=`
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
  }`,h=new er(1,1,1),f=new bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=q3,p=new fv(h,f,u);p.frustumCulled=!1;let g=new jr(new Float32Array(u*3),3),b=new jr(new Float32Array(u*2),2);h.setAttribute("aColor",g),h.setAttribute("aHi",b),r.add(p);const v=new rA(h),d=new Dy({color:3814695,transparent:!0,opacity:.3});let x=[];for(let ye=0;ye<u;ye++){const H=new pu(v,d);H.visible=!1,x.push(H),r.add(H)}const M=(ye,H)=>{let nt=Math.max(1,ye);for(;nt<H;)nt*=2;return nt};function _(ye){if(ye<=u)return;const H=M(u,ye),nt=p,Ve=x,D=new fv(h,f,H);D.frustumCulled=!1,D.count=0;const S=new jr(new Float32Array(H*3),3),j=new jr(new Float32Array(H*2),2);h.setAttribute("aColor",S),h.setAttribute("aHi",j);const Y=[];for(let J=0;J<H;J++){const de=new pu(v,d);de.visible=!1,Y.push(de),r.add(de)}r.remove(nt);for(const J of Ve)r.remove(J);p=D,g=S,b=j,x=Y,u=H}const w=()=>new bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),N=[],T=new er(1,1,1);for(let ye=0;ye<$v;ye++){const H=new Ri(T,w());H.visible=!1,N.push(H),r.add(H)}const y=3;let R=Y3,C=new Float32Array(R*y*3),L=new Float32Array(R*y);const z=new Cn;z.setAttribute("position",new Mt(C,3)),z.setAttribute("aA",new Mt(L,1));const G=new Op(z,new bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));G.frustumCulled=!1,r.add(G);let P=new Float32Array(R*6),I=new Float32Array(R*2);const B=new Cn;B.setAttribute("position",new Mt(P,3)),B.setAttribute("aA",new Mt(I,1));const A=new pu(B,new bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));A.frustumCulled=!1,r.add(A);function U(ye){ye<=R||(R=M(R,ye),C=new Float32Array(R*y*3),L=new Float32Array(R*y),P=new Float32Array(R*6),I=new Float32Array(R*2),z.setAttribute("position",new Mt(C,3)),z.setAttribute("aA",new Mt(L,1)),B.setAttribute("position",new Mt(P,3)),B.setAttribute("aA",new Mt(I,1)))}const V={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},se=Math.atan(1/Math.SQRT2);let le=!1,xe=0,ke=0,Ke=!0;const Be={x:-1,y:-1,live:!1};t.addEventListener("pointerdown",ye=>{le=!0,ke=0,xe=ye.clientX,t.setPointerCapture(ye.pointerId),t.classList.add("drag")}),t.addEventListener("pointerup",ye=>{le=!1,t.classList.remove("drag"),t.releasePointerCapture(ye.pointerId)}),t.addEventListener("pointermove",ye=>{const H=t.getBoundingClientRect();Be.x=ye.clientX-H.left,Be.y=ye.clientY-H.top,Be.live=!0,le&&(ke+=Math.abs(ye.clientX-xe),V.tYaw-=(ye.clientX-xe)*.006,xe=ye.clientX,Ke=!1,lt(!1))}),t.addEventListener("pointerleave",()=>{Be.live=!1});const re=V.tZoom,_e=()=>a(Math.round(re/V.tZoom*100)),me=ye=>{V.tZoom=Math.max(4,Math.min(60,V.tZoom*ye)),_e()};t.addEventListener("wheel",ye=>{ye.preventDefault(),me(1+Math.sign(ye.deltaY)*.11)},{passive:!1}),_e();let Le=null,ze=null,Ie=null,xt="",je=null,lt=()=>{};t.addEventListener("click",()=>{ke>5||i(Le&&ze!==Le?Le:null)});const Ge=zl.map(ye=>new rt(ng(ye)||"#8a4b2a")),qe=new q,Ct=new Bt,mt=new rt;let zt=!0,Ot=performance.now();function Rt(ye){requestAnimationFrame(Rt);const H=Math.min(.05,(ye-Ot)/1e3);Ot=ye;const nt=e.clientWidth,Ve=e.clientHeight;if(!nt||!Ve)return;t.width!==Math.round(nt*s.getPixelRatio())&&s.setSize(nt,Ve,!1);const D=1-Math.pow(.002,H);W3(),_(Wt.length),U(os.length),Ke&&(V.tYaw+=H*.12),V.yaw+=(V.tYaw-V.yaw)*D,V.zoom+=(V.tZoom-V.zoom)*D;const S=V.zoom*4,j=S*(nt/Ve);o.left=-j,o.right=j,o.top=S,o.bottom=-S,o.updateProjectionMatrix();const Y=180;o.position.set(Math.cos(V.yaw)*Math.cos(se)*Y,Math.sin(se)*Y,Math.sin(V.yaw)*Math.cos(se)*Y),o.lookAt(0,6,0);for(let W=0;W<$v;W++){const ie=N[W],ue=xa[W];if(!ue||W>=xa.length){ie.visible=!1;continue}ue.x=ue.x===void 0?ue.tx+ue.tw/2:ue.x,ue.z=ue.z===void 0?ue.tz+ue.th/2:ue.z;const O=ue.tx+ue.tw/2,k=ue.tz+ue.th/2;ue.x+=(O-ue.x)*D,ue.z+=(k-ue.z)*D,ue.w+=(ue.tw-ue.w)*D,ue.h+=(ue.th-ue.h)*D,ie.visible=!0,ie.position.set(ue.x,-.25,ue.z),ie.scale.set(Math.max(.01,ue.w-Wr*.45),.5,Math.max(.01,ue.h-Wr*.45))}const J=ze?new Set([ze.path,...ze.deps,...ze.usedBy]):null,de=ze||Le||Ie,ge=Wt.length;p.count=ge;for(let W=0;W<ge;W++){const ie=Wt[W];ie.x!==ie.tx&&(ie.x+=(ie.tx-ie.x)*D*.7),ie.z!==ie.tz&&(ie.z+=(ie.tz-ie.z)*D*.7);const ue=V3(ie);ie.h=ie.h===void 0?ue:ie.h+(ue-ie.h)*(ie.dying?D*1.4:D*.6),ie.pulse=Math.max(0,(ie.pulse||0)-H*1.6),Ct.makeScale(qi*.68,Math.max(.01,ie.h),qi*.68),Ct.setPosition(ie.x,ie.h/2,ie.z),p.setMatrixAt(W,Ct);const O=x[W];O.visible=!0,O.scale.set(qi*.68,Math.max(.01,ie.h),qi*.68),O.position.set(ie.x,ie.h/2,ie.z);const k=Z3(ie);k?mt.copy(k):mt.copy(Ge[(ie.ki??0)%Ge.length]).offsetHSL(0,0,($y.get(ie.dir)-.5)*.17),g.array[W*3]=mt.r,g.array[W*3+1]=mt.g,g.array[W*3+2]=mt.b;const he=ie===de?1:Math.min(.85,ie.pulse||0);let fe=J?J.has(ie.path)?0:1:xt&&!ie.path.toLowerCase().includes(xt)?1:0;!J&&!xt&&je&&(fe=ie.top===je?0:1),b.array[W*2]+=(he-b.array[W*2])*D,b.array[W*2+1]+=(fe-b.array[W*2+1])*D}for(let W=ge;W<u;W++)x[W].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=b.needsUpdate=!0;const ee=os.length;B.setDrawRange(0,ee*2),z.setDrawRange(0,ee*y);for(let W=0;W<ee;W++){const ie=os[W],ue=ie.from,O=ie.to,k=W*6;P[k]=ue.x,P[k+1]=ue.h,P[k+2]=ue.z,P[k+3]=O.x,P[k+4]=O.h,P[k+5]=O.z;const he=!J||J.has(ue.path)&&J.has(O.path),fe=ze&&(ue===ze||O===ze),Ce=fe?.55:he?.1:.02;I[W*2]+=(Ce-I[W*2])*D,I[W*2+1]=I[W*2];for(let F=0;F<y;F++){const pe=W*y+F,te=(ye/2600+(W*.37+F/y))%1,Q=Math.sin(te*Math.PI)*Math.hypot(O.x-ue.x,O.z-ue.z)*.22;C[pe*3]=ue.x+(O.x-ue.x)*te,C[pe*3+1]=ue.h+(O.h-ue.h)*te+Q+1.2,C[pe*3+2]=ue.z+(O.z-ue.z)*te,L[pe]=(zt?1:0)*(fe?1:he?.45:.06)*Math.sin(te*Math.PI)}}if(B.getAttribute("position").needsUpdate=!0,B.getAttribute("aA").needsUpdate=!0,z.getAttribute("position").needsUpdate=!0,z.getAttribute("aA").needsUpdate=!0,G.material.uniforms.uPx.value=3.4*s.getPixelRatio(),Be.live&&!le){let W=null,ie=26*26;for(let ue=0;ue<ge;ue++){const O=Wt[ue];if(O.dying||O.h<1)continue;qe.set(O.x,O.h*.6,O.z).project(o);const k=(qe.x*.5+.5)*nt,he=(-qe.y*.5+.5)*Ve,fe=(k-Be.x)**2+(he-Be.y)**2;fe<ie&&(ie=fe,W=O,O.sx=k,O.sy=he)}Le=W,t.style.cursor=le?"grabbing":W?"pointer":"grab"}else Be.live||(Le=null);Le?(n.style.display="block",n.style.left=Le.sx+"px",n.style.top=Le.sy+"px",n.innerHTML=`<b>${Le.name}</b> · ${Le.loc} lines<br>${Le.dir} · referenced by ${Le.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(Rt),{setFlow:ye=>{zt=ye},setHatch:ye=>{f.uniforms.uHatch.value=ye?1:0},setSpin:ye=>{Ke=ye},spinning:()=>Ke,onSpinChange:ye=>{lt=ye},dolly:me,reset:()=>{V.tYaw=Math.PI*.25,V.tZoom=re,_e()},setSel:ye=>{ze=ye},setRailHover:ye=>{Ie=ye},setQuery:ye=>{xt=ye},setFocusTop:ye=>{je=ye}}}const wr=new Map;function e_(t){var n,i;const e=((n=t==null?void 0:t.properties)==null?void 0:n.path)||((i=t==null?void 0:t.properties)==null?void 0:i.filePath)||(t==null?void 0:t.uri);return typeof e=="string"&&e.length>0?e:null}function Q3(t){var i,a,s;const e=((i=t==null?void 0:t.properties)==null?void 0:i.loc)??((a=t==null?void 0:t.properties)==null?void 0:a.lines)??((s=t==null?void 0:t.properties)==null?void 0:s.size),n=Number(e);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function $3(t,e){const i=String(t).replace(/\\/g,"/").split("/");return i[0]==="Code"&&i[1]?i[1].split("--")[0]:["Master","Roadmap","Auftrag","Planung","Codebasis","PLUG-Ordner","Aufräumen"].includes(i[0])?i[0]:e}function J3(t){var h;const e=t==null?void 0:t.workspace,n=(h=t==null?void 0:t.graph)==null?void 0:h.nodes;if(!(e!=null&&e.id)||!Array.isArray(n))return{workspaces:wr.size,buildings:0,added:0};const i=jy(e.name||e.canonicalPath||e.id)||e.id;for(const f of gn.slice())f.sim&&il.unregister(f.id);const a=Array.isArray(t.graph.edges)?t.graph.edges:[],s=new Map(n.filter(f=>f&&typeof f.id=="string").map(f=>[f.id,f])),r=new Map;for(const f of a){const u=s.get(f==null?void 0:f.sourceId),p=s.get(f==null?void 0:f.targetId);if(!u||!p)continue;const g=e_(p);g&&(r.has(u.id)||r.set(u.id,[]),r.get(u.id).push(g))}const o=[];for(const f of n){const u=e_(f);u&&o.push({node:f,path:u})}o.sort((f,u)=>f.path.localeCompare(u.path));let l=0,c=0;for(const{node:f,path:u}of o){const p=$3(u,i);wr.has(p)||(il.register({id:p,name:p}),wr.set(p,new Set));const g=wr.get(p);if(g.has(u))continue;g.add(u),c+=g.size;const b=f.properties||{};il.grow(p,{path:u,loc:Q3(f),deps:r.get(f.id)||[],note:f.type||"",agentColor:b.agentColor||b.readerColor||null,agentName:b.agentName||b.readerName||null,access:b.agentColor?"write":b.readerColor?"read":null}),l+=1}return l>0&&il.event(String(e.id),`${l} indexed object${l===1?"":"s"} added across ${wr.size} districts`),{workspaces:wr.size,buildings:c,added:l,total:o.length,truncated:!1}}function e2({snapshot:t,onSelectFile:e}){ne.useEffect(()=>{t&&J3(t)},[t]);const[n,i]=ne.useState(!0),[a,s]=ne.useState("loc"),[r,o]=ne.useState(!0),[l,c]=ne.useState(!0),[h,f]=ne.useState(!0),[u,p]=ne.useState(100),[g,b]=ne.useState(null),[v,d]=ne.useState(""),[x,M]=ne.useState(null),[_,w]=ne.useState(!0),[,N]=ne.useReducer(P=>P+1,0),T=ne.useRef(null),y=ne.useRef(null),R=ne.useRef(null),C=ne.useRef(null);ne.useEffect(()=>{const P=K3(T.current,y.current,R.current,{onSelect:I=>b(I),onZoom:I=>p(I)});if(!P){i(!1);return}C.current=P,P.onSpinChange(I=>f(I))},[]),ne.useEffect(()=>{const P=k3(()=>N());return()=>{P()}},[]),ne.useEffect(()=>{!g&&Wt.length>0&&b(Wt[0])},[Wt.length,g]),ne.useEffect(()=>{var P;(P=C.current)==null||P.setSel(g)},[g]),ne.useEffect(()=>{var P;(P=C.current)==null||P.setQuery(v)},[v]),ne.useEffect(()=>{var P;(P=C.current)==null||P.setFocusTop(x)},[x]),ne.useEffect(()=>{const P=I=>{var A,U;const B=I.target;if(/^(INPUT|TEXTAREA)$/.test(B.tagName)){I.key==="Escape"&&B.blur();return}I.key==="Escape"?(b(null),M(null)):I.key==="="||I.key==="+"?(A=C.current)==null||A.dolly(.8474576271186441):I.key==="-"||I.key==="_"?(U=C.current)==null||U.dolly(1.18):(I.key==="e"||I.key==="E")&&w(V=>!V)};return addEventListener("keydown",P),()=>removeEventListener("keydown",P)},[]);const L=Wt.reduce((P,I)=>P+I.loc,0),z=gn.reduce((P,I)=>P+I.events,0),G=(P,I)=>I.length?m.jsxs(m.Fragment,{children:[m.jsxs("h3",{children:[P+" ",m.jsx("span",{style:{color:"var(--faint)"},children:I.length})]}),I.map(B=>{const A=_l[B];return A&&m.jsxs("div",{className:"dep","data-p":B,onClick:()=>b(A),children:[m.jsx("span",{className:"sw",style:{background:H3(A)}}),m.jsx("span",{children:B})]},B)})]}):null;return m.jsxs("div",{id:"app",className:g?void 0:"closed",children:[m.jsxs("aside",{children:[m.jsxs("div",{className:"hd",children:[m.jsx("h1",{children:"PlugBrain City"}),m.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),m.jsxs("div",{className:"kpis",children:[m.jsxs("div",{children:[m.jsx("b",{id:"k-ws",children:gn.length}),m.jsx("i",{children:"workspaces"})]}),m.jsxs("div",{children:[m.jsx("b",{id:"k-bld",children:Wt.length}),m.jsx("i",{children:"buildings"})]}),m.jsxs("div",{children:[m.jsx("b",{id:"k-ev",children:z}),m.jsx("i",{children:"events"})]})]})]}),m.jsx("div",{className:"q",children:m.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:P=>d(P.target.value.trim().toLowerCase())})}),m.jsx("div",{className:"tree",id:"tree",children:gn.length?gn.map(P=>{const I=Wt.filter(A=>A.dir===P.id),B=I.reduce((A,U)=>A+U.loc,0);return m.jsxs("div",{className:"ws"+(x===P.id?" on":"")+(P.dying?" dying":""),onClick:()=>M(A=>A===P.id?null:P.id),children:[m.jsxs("div",{className:"wsrow",children:[m.jsx("span",{className:"sw",style:{background:Qv(P)}}),m.jsx("span",{className:"nm",children:P.name}),P.sim?m.jsx("span",{className:"tag",children:"sim"}):null,m.jsxs("span",{className:"lc",children:[I.length," bld · ",B]})]}),m.jsx("div",{className:"loadbar",children:m.jsx("i",{style:{width:Math.round(P.load*100)+"%",background:Qv(P)}})})]},P.id)}):m.jsxs("div",{className:"empty",children:["No workspaces registered.",m.jsx("br",{}),m.jsx("br",{}),m.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),m.jsxs("div",{id:"stage",ref:y,children:[m.jsx("canvas",{id:"cv",ref:T}),m.jsx("div",{id:"tip",ref:R}),m.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",m.jsx("b",{id:"crumb-t",children:g?g.path.toUpperCase():x?x.toUpperCase():"CITY OVERVIEW"})]}),_&&m.jsx("div",{id:"feed",children:vu.slice(0,9).map(P=>m.jsxs("div",{className:"fe",children:[m.jsx("span",{className:"ft",children:P.t.toLocaleTimeString("en-GB",{hour12:!1})}),m.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:P.ws}),m.jsx("span",{className:"fm",children:P.msg})]},P.id))}),m.jsx("div",{id:"legend",children:m.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${a==="loc"?"size":"references"} · flashes = activity`})}),m.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([P,I])=>m.jsx("button",{className:"tb"+(a===P?" on":""),"data-h":P,type:"button",onClick:()=>{G3(P),s(P)},children:I},P)),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb"+(r?" on":""),id:"t-flow",type:"button",onClick:()=>{o(P=>{var I;return(I=C.current)==null||I.setFlow(!P),!P})},children:"Flow"}),m.jsx("button",{className:"tb"+(l?" on":""),id:"t-hatch",type:"button",onClick:()=>{c(P=>{var I;return(I=C.current)==null||I.setHatch(!P),!P})},children:"Hatching"}),m.jsx("button",{className:"tb"+(h?" on":""),id:"t-spin",type:"button",onClick:()=>{f(P=>{var I;return(I=C.current)==null||I.setSpin(!P),!P})},children:"Orbit"}),m.jsx("button",{className:"tb"+(_?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>w(P=>!P),children:"Feed"}),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var P;return(P=C.current)==null?void 0:P.dolly(1.18)},children:"−"}),m.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var P;return(P=C.current)==null?void 0:P.reset()},children:u+"%"}),m.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var P;return(P=C.current)==null?void 0:P.dolly(1/1.18)},children:"＋"}),m.jsx("div",{className:"vsep"}),m.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var P;(P=C.current)==null||P.reset(),b(null),M(null)},children:"Reset"})]}),m.jsxs("div",{id:"gate",style:n?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",m.jsx("br",{}),"The workspace registry remains available."]})]}),m.jsx("div",{id:"side",children:m.jsx("div",{id:"dt",children:g&&m.jsxs("div",{className:"dt",children:[m.jsx("div",{className:"kind",children:g.dir+"/"}),m.jsx("h2",{children:g.name}),g.note?m.jsx("div",{className:"note",children:g.note}):null,e&&m.jsx("button",{type:"button",className:"btn primary",style:{marginTop:"10px",marginBottom:"14px",width:"100%",padding:"8px 12px"},onClick:()=>e(g.path),children:"📄 Datei in Quellansicht öffnen"}),m.jsxs("dl",{children:[m.jsx("dt",{children:"Size"}),m.jsx("dd",{children:g.loc}),m.jsx("dt",{children:"References"}),m.jsx("dd",{children:g.deps.length}),m.jsx("dt",{children:"Referenced by"}),m.jsx("dd",{children:g.usedBy.length}),m.jsx("dt",{children:"Share of total"}),m.jsx("dd",{children:L?(g.loc/L*100).toFixed(1)+"%":"—"})]}),G("References",g.deps),G("Referenced by",g.usedBy)]})})})]})}const t_={agent:"Agent",task:"Aufgabe",worker:"Worker",worktree:"Worktree",file:"Datei",artifact:"Artefakt",route:"Route"},n_={live:"Live-Ereignis",recovered:"wiederhergestelltes Ereignis","historical-import":"historischer Import"};function Wd(t){const e=new Date(t);return Number.isNaN(e.getTime())?t:e.toLocaleString()}function qd(t){if(t.kind!=="worker")return null;switch(t.proof){case"process-started":return"Start im Trace beobachtet — keine Aussage über den aktuellen Prozesszustand.";case"finished":return"Abschluss im Trace beobachtet.";case"proof-unavailable":return"Kein beobachteter Prozessstart; dieser Worker wird nicht als laufend dargestellt.";default:return"Kein Prozessbeweis vorhanden."}}function t2(t){const e=t.id.slice(t.id.indexOf(":")+1);return t.kind==="agent"?{agentId:e}:t.kind==="task"?{taskId:e}:t.kind==="worker"?{workerId:e}:null}function i_(t,e){var n;return((n=t.find(i=>i.id===e))==null?void 0:n.label)??e}function n2({mesh:t,workspaceId:e,onSelectFile:n}){const[i,a]=ne.useState(null),[s,r]=ne.useState([]),[o,l]=ne.useState(!1),[c,h]=ne.useState(""),f=ne.useMemo(()=>(t==null?void 0:t.nodes.find(p=>p.id===i))??null,[t,i]);return ne.useEffect(()=>{i!==null&&f===null&&a(null)},[f,i]),ne.useEffect(()=>{const p=f?t2(f):null;if(!e||p===null){r([]),h(""),l(!1);return}let g=!0;return l(!0),h(""),w3(e,{...p,limit:12}).then(b=>{g&&r(b)}).catch(()=>{g&&(r([]),h("Die Trace-Zeitleiste ist derzeit nicht verfügbar."))}).finally(()=>{g&&l(!1)}),()=>{g=!1}},[f,e]),e?t===null||t.workspaceId!==e?m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Die Core-Trace-Projektion ist für diesen Workspace noch nicht verfügbar."}),m.jsx("p",{className:"mesh-trace__muted",children:"Es werden weder Registry-Einträge noch historische Aktivitätszähler als Ersatz angezeigt."})]}):t.nodes.length===0&&t.edges.length===0?m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Für diesen Workspace wurde noch keine trace-gestützte Arbeit beobachtet."}),m.jsx("p",{className:"mesh-trace__muted",children:"Keine simulierten Agenten, keine Roster-Fallbacks und kein daraus abgeleiteter Prozessstatus."})]}):m.jsxs("section",{className:"mesh-trace","aria-label":"Trace-backed Agent Mesh",children:[m.jsxs("header",{className:"mesh-trace__header",children:[m.jsxs("div",{children:[m.jsxs("h2",{children:["Agent Mesh ",m.jsx("span",{children:"Trace-backed"})]}),m.jsx("p",{children:"Jeder Knoten und jede Kante stammt aus einem autoritätsbestätigten Trace-Ereignis."})]}),m.jsxs("dl",{className:"mesh-trace__totals",children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Knoten"}),m.jsx("dd",{children:t.totals.nodes??t.nodes.length})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Kanten"}),m.jsx("dd",{children:t.totals.edges??t.edges.length})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"ohne Startbeweis"}),m.jsx("dd",{children:t.unprovenWorkers.length})]})]})]}),t.unprovenWorkers.length>0&&m.jsxs("aside",{className:"mesh-trace__notice","aria-label":"Unproven workers",children:[m.jsx("strong",{children:"Unbelegte Worker werden nicht als laufend angezeigt."}),m.jsx("ul",{children:t.unprovenWorkers.map(p=>m.jsxs("li",{children:[m.jsx("code",{children:p.workerId}),p.taskId?m.jsxs(m.Fragment,{children:[" · Aufgabe ",m.jsx("code",{children:p.taskId})]}):""," — ",p.reason]},p.workerId))})]}),m.jsxs("div",{className:"mesh-trace__grid",children:[m.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace nodes",children:[m.jsxs("h3",{children:["Knoten ",m.jsx("span",{children:t.nodes.length})]}),m.jsx("ol",{className:"mesh-trace__nodes",children:t.nodes.map(p=>{const g=qd(p),b=p.id===i;return m.jsx("li",{children:m.jsxs("button",{type:"button",className:b?"mesh-trace__node is-selected":"mesh-trace__node",onClick:()=>a(p.id),"aria-pressed":b,children:[m.jsx("span",{className:"mesh-trace__kind",children:t_[p.kind]}),m.jsx("span",{className:"mesh-trace__label",title:p.label,children:p.label}),m.jsxs("span",{className:"mesh-trace__events",children:[p.eventCount," Ereignis",p.eventCount===1?"":"se"]}),m.jsx("span",{className:"mesh-trace__provenance",title:"Ereignis-Provenienz, nicht aktueller Prozessstatus",children:n_[p.provenance]}),g&&m.jsx("span",{className:"mesh-trace__proof",children:g})]})},p.id)})})]}),m.jsxs("section",{className:"mesh-trace__panel","aria-label":"Trace edges",children:[m.jsxs("h3",{children:["Kanten ",m.jsx("span",{children:t.edges.length})]}),m.jsx("ol",{className:"mesh-trace__edges",children:t.edges.map(p=>m.jsxs("li",{children:[m.jsx("span",{className:"mesh-trace__edge-kind",children:p.kind}),m.jsx("span",{title:p.from,children:i_(t.nodes,p.from)}),m.jsx("span",{"aria-hidden":"true",children:"→"}),m.jsx("span",{title:p.to,children:i_(t.nodes,p.to)}),m.jsxs("small",{children:[p.count," Ereignis",p.count===1?"":"se"," · Belege: ",p.evidence.join(", ")]})]},p.id))})]})]}),f&&m.jsxs("aside",{className:"mesh-trace__detail","aria-label":"Details for "+f.label,children:[m.jsxs("div",{className:"mesh-trace__detail-head",children:[m.jsxs("div",{children:[m.jsx("span",{className:"mesh-trace__kind",children:t_[f.kind]}),m.jsx("h3",{children:f.label})]}),m.jsx("button",{type:"button",onClick:()=>a(null),"aria-label":"Detailansicht schließen",children:"×"})]}),m.jsxs("dl",{children:[m.jsxs("div",{children:[m.jsx("dt",{children:"Erstmals"}),m.jsx("dd",{children:Wd(f.firstSeen)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Zuletzt"}),m.jsx("dd",{children:Wd(f.lastSeen)})]}),m.jsxs("div",{children:[m.jsx("dt",{children:"Provenienz"}),m.jsx("dd",{children:n_[f.provenance]})]}),qd(f)&&m.jsxs("div",{children:[m.jsx("dt",{children:"Worker-Beweis"}),m.jsx("dd",{children:qd(f)})]}),Object.entries(f.detail).map(([p,g])=>m.jsxs("div",{children:[m.jsx("dt",{children:p}),m.jsx("dd",{children:g??"—"})]},p))]}),f.kind==="file"&&n&&m.jsx("button",{type:"button",className:"mesh-trace__source",onClick:()=>n(f.label),children:"Datei im Source-View öffnen"}),m.jsxs("section",{className:"mesh-trace__timeline","aria-label":"Trace timeline",children:[m.jsx("h4",{children:"Beobachtete Ereignisse"}),o&&m.jsx("p",{children:"Lade Trace-Ereignisse …"}),c&&m.jsx("p",{role:"status",children:c}),!o&&!c&&s.length===0&&m.jsx("p",{children:"Für diesen Knotentyp gibt es keine gefilterte Zeitleiste."}),m.jsx("ol",{children:s.map(p=>m.jsxs("li",{children:[m.jsx("code",{children:p.type})," ",m.jsx("time",{dateTime:p.occurredAt,children:Wd(p.occurredAt)}),m.jsx("span",{children:p.summary})]},p.eventId))})]})]})]}):m.jsxs("section",{className:"mesh-trace mesh-trace--empty","aria-live":"polite",children:[m.jsx("h2",{children:"Agent Mesh"}),m.jsx("p",{children:"Wähle einen registrierten Workspace. Ohne Workspace kann keine Trace-Projektion behauptet werden."})]})}function i2({tasks:t,depth:e}){if(t.length===0)return m.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});t.filter(s=>s.state==="pending");const n=t.filter(s=>s.state==="claimed"),i=t.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return m.jsxs("div",{className:"queue",children:[m.jsxs("div",{className:"queue__figures",children:[m.jsx(Wc,{value:e,label:"WARTEND",tone:e>8?"hot":void 0}),m.jsx(Wc,{value:n.length,label:"IN ARBEIT"}),m.jsx(Wc,{value:i.length,label:"GELIEFERT"}),m.jsx(Wc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),m.jsx("ol",{className:"queue__list",children:t.map(s=>m.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[m.jsx("span",{className:"queue__state",children:a2[s.state]??s.state}),m.jsx("span",{className:"queue__title",title:s.title,children:s.title}),m.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&m.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&m.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const a2={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function Wc({value:t,label:e,tone:n}){return m.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[m.jsx("strong",{children:t}),m.jsx("span",{children:e})]})}const s2=8e3;function r2(t,e=s2){return new Promise((n,i)=>{const a=globalThis.setTimeout(()=>{i(new Error(`Brain-Dateiabruf hat nach ${e/1e3} Sekunden nicht geantwortet. Bitte nach dem Indexlauf erneut versuchen.`))},e);t.then(s=>{globalThis.clearTimeout(a),n(s)},s=>{globalThis.clearTimeout(a),i(s)})})}function Cr({workspaceId:t,path:e,highlightLine:n,onClose:i,onNavigateFile:a}){const[s,r]=ne.useState(!0),[o,l]=ne.useState(null),[c,h]=ne.useState(null),[f,u]=ne.useState(null),[p,g]=ne.useState([]),b=ne.useRef(null);if(ne.useEffect(()=>{let M=!0;return r(!0),l(null),h(null),u(null),g([]),r2(U3(t,e)).then(_=>{M&&(l(_),r(!1))}).catch(_=>{M&&(l({ok:!1,path:e,content:"",bytes:0,lang:null,error:String((_==null?void 0:_.message)??_)}),r(!1))}),T3(t).then(_=>{M&&h(_)}).catch(()=>{}),C3(t,e).then(_=>{M&&u(_)}).catch(()=>{}),P3(t,e).then(_=>{M&&g(_)}).catch(()=>{}),()=>{M=!1}},[t,e]),ne.useEffect(()=>{!s&&b.current&&b.current.scrollIntoView({behavior:"smooth",block:"center"})},[s,n]),s)return m.jsxs("div",{className:"source-container source-container--loading",children:[m.jsx("div",{className:"source-spinner"}),m.jsxs("p",{children:["Lade Dateiinhalt aus dem Brain (",e,") …"]})]});if(!o||!o.ok)return m.jsxs("div",{className:"source-container source-container--error",role:"alert",children:[m.jsxs("div",{className:"source-header",children:[m.jsx("span",{className:"source-header__path mono",children:e}),i&&m.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Schließen",children:"✕"})]}),m.jsxs("div",{className:"source-error-box",children:[m.jsx("div",{className:"source-error-icon",children:"⚠️"}),m.jsx("h3",{children:"Fehler beim Laden der Datei"}),m.jsx("p",{className:"source-error-msg",children:(o==null?void 0:o.error)||"Die Datei existiert nicht im Workspace oder der Pfad ist ungültig."}),m.jsxs("div",{className:"source-error-details mono",children:["Workspace: ",t,m.jsx("br",{}),"Pfad: ",e]})]})]});const v=o.content.split(/\r?\n/),d=v.length,x=c!=null&&c.head?c.head.slice(0,8):null;return m.jsxs("div",{className:"source-container",children:[m.jsxs("div",{className:"source-header",children:[m.jsxs("div",{className:"source-header__meta",children:[m.jsx("span",{className:"source-header__icon",children:"📄"}),m.jsx("span",{className:"source-header__path mono",title:o.path,children:o.path}),o.lang&&m.jsx("span",{className:"source-badge source-badge--lang",children:o.lang}),m.jsxs("span",{className:"source-badge source-badge--info",children:[d," Zeilen · ",o.bytes," B"]}),x&&m.jsxs("span",{className:"source-badge source-badge--git",title:`Git Revision: ${c==null?void 0:c.head}`,children:["git: ",x," (",(c==null?void 0:c.branch)??"detached",")"]}),(f==null?void 0:f.owner)&&m.jsxs("span",{className:"source-badge source-badge--agent",style:{borderColor:f.owner.color},title:`Zuletzt geändert durch ${f.owner.name} (${f.owner.at})`,children:[m.jsx("i",{style:{background:f.owner.color}}),f.owner.name]})]}),m.jsxs("div",{className:"source-header__actions",children:[n&&m.jsxs("span",{className:"source-badge source-badge--highlight",children:["Fokus: Zeile ",n]}),i&&m.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Quellansicht schließen",children:"✕"})]})]}),m.jsxs("div",{className:"source-body",children:[m.jsx("div",{className:"source-code-view",children:m.jsx("table",{className:"source-table",children:m.jsx("tbody",{children:v.map((M,_)=>{const w=_+1,N=n===w;return m.jsxs("tr",{ref:N?b:void 0,className:`source-line-row ${N?"source-line-row--highlight":""}`,children:[m.jsx("td",{className:"source-line-num mono","data-line":w,children:w}),m.jsx("td",{className:"source-line-code mono",children:m.jsx("pre",{children:M||" "})})]},w)})})})}),p.length>0&&m.jsxs("div",{className:"source-backlinks",style:{padding:"12px 16px",borderTop:"1px solid var(--line)",background:"rgba(255,255,255,0.02)"},children:[m.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["← Rückverweise / Backlinks (",p.length,")"]}),m.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:p.map((M,_)=>m.jsxs("div",{className:"search-hit-card",style:{padding:"6px 10px",fontSize:"11px",cursor:"pointer"},onClick:()=>a==null?void 0:a(M.path,M.line),title:`Zeile ${M.line} in ${M.path}`,children:[m.jsx("span",{className:"mono",style:{color:"var(--accent)"},children:M.path}),m.jsxs("span",{style:{color:"var(--faint)",marginLeft:"6px"},children:[":",M.line]}),M.alias&&m.jsxs("span",{style:{marginLeft:"4px",fontStyle:"italic"},children:["(",M.alias,")"]})]},_))})]})]})]})}function o2(t){const e={name:"",path:"",isDir:!0,children:new Map};for(const n of t){const i=n.path.split(/[\\/]/).filter(Boolean);let a=e;for(let s=0;s<i.length;s++){const r=i[s];if(s===i.length-1)a.children.set(r,{name:r,path:n.path,isDir:!1,children:new Map,file:n});else{let l=a.children.get(r);l||(l={name:r,path:i.slice(0,s+1).join("/"),isDir:!0,children:new Map},a.children.set(r,l)),a=l}}}return e}function l2({workspaceName:t,files:e,activePath:n,onSelectFile:i}){const[a,s]=ne.useState(""),[r,o]=ne.useState(new Set),l=ne.useMemo(()=>o2(e),[e]),c=f=>{o(u=>{const p=new Set(u);return p.has(f)?p.delete(f):p.add(f),p})},h=(f,u=0)=>{var g,b,v;if(f.isDir){const d=r.has(f.path),x=Array.from(f.children.values()).sort((_,w)=>_.isDir!==w.isDir?_.isDir?-1:1:_.name.localeCompare(w.name)),M=a?x.filter(_=>_.path.toLowerCase().includes(a.toLowerCase())):x;return a&&M.length===0&&!f.name.toLowerCase().includes(a.toLowerCase())?null:m.jsxs("div",{className:"tree-dir-group",children:[f.name&&m.jsxs("div",{className:`tree-item tree-item--dir ${u===0?"tree-item--root":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>c(f.path),children:[m.jsx("span",{className:"tree-icon",children:d?"📁":"📂"}),m.jsx("span",{className:"tree-label",children:f.name}),m.jsx("span",{className:"tree-badge tree-badge--count",children:f.children.size})]}),(!d||a)&&m.jsx("div",{className:"tree-dir-children",children:M.map(_=>h(_,f.name?u+1:u))})]},f.path||"root")}const p=n===f.path;return a&&!f.path.toLowerCase().includes(a.toLowerCase())?null:m.jsxs("div",{className:`tree-item tree-item--file ${p?"tree-item--active":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>i(f.path),title:f.path,children:[m.jsx("span",{className:"tree-icon",children:"📄"}),m.jsx("span",{className:"tree-label mono",children:f.name}),((g=f.file)==null?void 0:g.lang)&&m.jsx("span",{className:"tree-badge tree-badge--lang",children:f.file.lang}),((b=f.file)==null?void 0:b.loc)!==void 0&&m.jsxs("span",{className:"tree-badge tree-badge--loc",children:[f.file.loc," L"]}),((v=f.file)==null?void 0:v.agent)&&m.jsx("span",{className:"tree-agent-dot",style:{background:f.file.agent.color},title:`Owner: ${f.file.agent.name}`})]},f.path)};return m.jsxs("div",{className:"explorer-view",children:[m.jsxs("div",{className:"explorer-header",children:[m.jsxs("div",{className:"explorer-title",children:[m.jsx("span",{className:"explorer-title__icon",children:"🗂️"}),m.jsxs("strong",{children:[t||"Workspace"," Explorer"]})]}),m.jsx("div",{className:"explorer-stats",children:m.jsxs("span",{children:[e.length," Dateien aus Brain"]})})]}),m.jsxs("div",{className:"explorer-search",children:[m.jsx("input",{type:"text",placeholder:"Dateibaum filtern …",value:a,onChange:f=>s(f.target.value),className:"explorer-search__input"}),a&&m.jsx("button",{type:"button",className:"explorer-search__clear",onClick:()=>s(""),children:"✕"})]}),m.jsx("div",{className:"explorer-tree",children:e.length===0?m.jsx("div",{className:"explorer-empty",children:"Keine Dateien im Snapshot vorhanden."}):h(l)})]})}function c2({workspaceId:t,onSelectHit:e}){const[n,i]=ne.useState(()=>{const T=new URLSearchParams(window.location.search).get("mode");return T==="notes"||T==="prose"?T:"code"}),[a,s]=ne.useState(()=>new URLSearchParams(window.location.search).get("q")||""),[r,o]=ne.useState([]),[l,c]=ne.useState([]),[h,f]=ne.useState([]),[u,p]=ne.useState(0),[g,b]=ne.useState(null),[v,d]=ne.useState(!1),[x,M]=ne.useState(""),[_,w]=ne.useState(""),N=async(T,y,R)=>{T&&T.preventDefault();const C=R??n,L=(y??a).trim();if(!L)return;d(!0),M(""),b(null);const z=performance.now();try{if(C==="code"){const G=await D3(t,L);o(G),c([]),f([])}else if(C==="prose"){const G=await Qy(t,L);f(G.hits||[]),p(G.total??0),o([]),c([])}else{const G=await O3(t,L);c(G.notes||[]),o([]),f([])}b(Math.round(performance.now()-z)),w(L)}catch(G){M((G==null?void 0:G.message)||`Fehler bei der Suche (${C})`),o([]),c([]),f([])}finally{d(!1)}};return ne.useEffect(()=>{const T=new URLSearchParams(window.location.search).get("q");T&&t&&N(void 0,T,n)},[t]),m.jsxs("div",{className:"search-view",children:[m.jsxs("div",{className:"search-view__header",children:[m.jsxs("div",{className:"search-view__title",children:[m.jsx("span",{className:"search-view__icon",children:"🔍"}),m.jsx("strong",{children:n==="code"?"Agent Code- & Symbolsuche":n==="prose"?"Notiz-Volltextsuche":"Notizen- & Property-Abfrage"}),m.jsx("span",{className:"search-view__endpoint mono",children:n==="code"?"/api/agent/search":n==="prose"?"/api/notes/search":"/api/notes/query"})]}),m.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[m.jsx("button",{type:"button",className:`tb ${n==="code"?"on":""}`,onClick:()=>{i("code"),a.trim()&&N(void 0,a,"code")},children:"Code & Symbole"}),m.jsx("button",{type:"button",className:`tb ${n==="notes"?"on":""}`,onClick:()=>{i("notes"),a.trim()||s("typ=gate UND stand=offen"),N(void 0,a.trim()||"typ=gate UND stand=offen","notes")},children:"Notizen & Properties (Bases)"}),m.jsx("button",{type:"button",className:`tb ${n==="prose"?"on":""}`,onClick:()=>{i("prose"),a.trim()||s("Gateway Owner"),N(void 0,a.trim()||"Gateway Owner","prose")},children:"Notiz-Volltext"})]})]}),m.jsx("form",{className:"search-form",onSubmit:N,style:{marginTop:"10px"},children:m.jsxs("div",{className:"search-input-group",children:[m.jsx("input",{type:"search",className:"search-input",placeholder:n==="code"?"Symbol, Variable, Klasse, Datei (z. B. authKey) …":n==="prose"?"Satz oder Stichwörter aus dem Notiztext (z. B. Gateway Owner) …":"Bases-Filter: typ=gate UND stand=offen oder typ=mission …",value:a,onChange:T=>s(T.target.value),autoFocus:!0}),m.jsx("button",{type:"submit",className:"search-submit-btn",disabled:v||!a.trim(),children:v?"Suche …":"Suchen"})]})}),x&&m.jsxs("div",{className:"search-error-alert",role:"alert",children:["⚠️ ",x]}),m.jsxs("div",{className:"search-results",children:[_&&m.jsxs("div",{className:"search-results-summary",children:[n==="code"?r.length===0?`Keine Code-Treffer für "${_}" im Brain-Index`:`${r.length} Treffer für "${_}":`:n==="prose"?h.length===0?`Kein Notiztext enthält "${_}"`:`${u} Notiz(en) im Text, ${h.length} angezeigt`:l.length===0?`Keine Notizen entsprechen dem Filter "${_}"`:`${l.length} Notiz(en) gefunden für "${_}":`,g!==null&&m.jsxs("span",{className:"search-results-time mono",style:{marginLeft:"8px",opacity:.7},children:[g," ms"]})]}),n==="code"?m.jsx("div",{className:"search-hits-list",children:r.map((T,y)=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name mono",children:T.name}),m.jsx("span",{className:`search-hit-kind search-hit-kind--${T.kind}`,children:T.kind}),T.line!==null&&m.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,children:["📄 ",T.path]})]},`${T.path}-${T.name}-${T.line??y}`))}):n==="prose"?m.jsx("div",{className:"search-hits-list",children:h.map(T=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name",children:T.title}),T.line!==null&&m.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),T.snippet&&m.jsx("div",{className:"search-hit-snippet",children:T.snippet}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]})]},`${T.path}-${T.line??0}`))}):m.jsx("div",{className:"search-hits-list",children:l.map(T=>m.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path),children:[m.jsxs("div",{className:"search-hit-card__head",children:[m.jsx("span",{className:"search-hit-name",children:T.title}),T.typ&&m.jsx("span",{className:"search-hit-kind search-hit-kind--class",children:T.typ}),T.stand&&m.jsx("span",{className:"source-badge",style:{fontSize:"11px",marginLeft:"6px"},children:T.stand})]}),m.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]}),(T.inLinks!==void 0||T.outLinks!==void 0)&&m.jsxs("div",{style:{fontSize:"11px",color:"var(--faint)",marginTop:"4px"},children:["Verlinkungen: → ",T.outLinks??0," ausgehend · ← ",T.inLinks??0," Rückverweise"]})]},T.path))})]})]})}function u2({workspaceId:t}){const[e,n]=ne.useState([]),[i,a]=ne.useState(null),[s,r]=ne.useState(""),[o,l]=ne.useState(""),[c,h]=ne.useState(""),[f,u]=ne.useState([]),[p,g]=ne.useState([]),[b,v]=ne.useState(!1),[d,x]=ne.useState(""),[M,_]=ne.useState(""),[w,N]=ne.useState(null),T=ne.useRef(null),y=async()=>{const A=await z3(t);return n(A),A},R=async A=>{v(!0),_(""),x("");try{const U=await jd(t,A);a(U),r(U.content),g(await I3(t,U.path))}catch(U){x(U instanceof Error?U.message:String(U))}finally{v(!1)}};ne.useEffect(()=>{y().then(A=>{if(A[0])return R(A[0].path)}).catch(A=>x(String(A)))},[t]);const C=ne.useMemo(()=>[...new Set(e.flatMap(A=>A.tags||[]))].sort(),[e]),L=ne.useMemo(()=>e.filter(A=>{var U;return!o||((U=A.tags)==null?void 0:U.includes(o))}),[e,o]),z=async()=>{if(!(!i||b)){v(!0),_(""),x("");try{const A=i.content,U=await Zv(t,i.path,s,i.hash);N({path:i.path,content:A,savedHash:U.hash});const V=await jd(t,i.path);a(V),r(V.content),await y(),x(U.created?"Notiz angelegt und im Brain indiziert.":"Gespeichert und im Brain indiziert.")}catch(A){_(A!=null&&A.conflict?`${A.message} Bitte neu laden und die Änderungen zusammenführen.`:""),x(A!=null&&A.conflict?"":A instanceof Error?A.message:String(A))}finally{v(!1)}}},G=async()=>{if(!(!w||!i||w.path!==i.path||b)){v(!0),_("");try{await Zv(t,w.path,w.content,w.savedHash);const A=await jd(t,w.path);a(A),r(A.content),N(null),await y(),x("Letzte Speicherung rückgängig gemacht.")}catch(A){_(A!=null&&A.conflict?`${A.message} Rückgängig wurde nicht erzwungen.`:""),x(A!=null&&A.conflict?"":String(A))}finally{v(!1)}}},P=()=>{const U={path:`Notizen/Notiz-${new Date().toISOString().slice(0,10)}.md`,title:"Neue Notiz",tags:[],inLinks:0,outLinks:0,content:`# Neue Notiz

`,hash:"",links:[],backlinks:[]};a(U),r(U.content),g([]),_(""),x("Neue Notiz: Namen oder Inhalt bearbeiten und speichern.")},I=async A=>{if(!(!A||!i)){v(!0),x("");try{const U=await B3(t,i.path,A);g(V=>[...V.filter(se=>se.name!==U.name),U].sort((se,le)=>se.name.localeCompare(le.name))),x(`Anhang ${U.name} gespeichert.`)}catch(U){x(U instanceof Error?U.message:String(U))}finally{v(!1),T.current&&(T.current.value="")}}},B=async A=>{if(A.preventDefault(),!!c.trim()){v(!0),x("");try{u((await Qy(t,c.trim())).hits)}catch(U){x(U instanceof Error?U.message:String(U))}finally{v(!1)}}};return m.jsxs("main",{className:"notes-workbench",children:[m.jsxs("aside",{className:"notes-sidebar",children:[m.jsxs("div",{className:"notes-sidebar__head",children:[m.jsx("strong",{children:"Wissen"}),m.jsx("button",{type:"button",onClick:P,children:"Neue Notiz"})]}),m.jsxs("form",{className:"notes-search",onSubmit:B,children:[m.jsx("input",{value:c,onChange:A=>h(A.target.value),placeholder:"Volltext suchen …"}),m.jsx("button",{disabled:b,children:"Suchen"})]}),m.jsxs("div",{className:"notes-tags",children:[m.jsx("button",{type:"button",className:o?"":"on",onClick:()=>l(""),children:"Alle"}),C.map(A=>m.jsxs("button",{type:"button",className:o===A?"on":"",onClick:()=>l(A),children:["#",A]},A))]}),f.length>0&&m.jsx("div",{className:"notes-results",children:f.map(A=>m.jsxs("button",{type:"button",onClick:()=>void R(A.path),children:[m.jsx("strong",{children:A.title}),m.jsxs("span",{children:[A.path,A.line?`:${A.line}`:""]}),A.snippet&&m.jsx("small",{children:A.snippet})]},`${A.path}:${A.line}`))}),m.jsx("div",{className:"notes-list",children:L.map(A=>m.jsxs("button",{type:"button",className:(i==null?void 0:i.path)===A.path?"on":"",onClick:()=>void R(A.path),children:[m.jsx("strong",{children:A.title}),m.jsx("span",{children:A.path}),m.jsxs("small",{children:[(A.tags||[]).map(U=>`#${U}`).join(" ")," ",A.inLinks?`←${A.inLinks}`:""]})]},A.path))})]}),m.jsx("section",{className:"notes-editor",children:i?m.jsxs(m.Fragment,{children:[m.jsxs("header",{className:"notes-editor__head",children:[m.jsxs("div",{children:[m.jsx("strong",{children:i.title}),m.jsx("span",{children:i.path})]}),m.jsxs("div",{children:[m.jsx("a",{href:Kv(t,i.path),children:"Notiz exportieren"}),m.jsx("a",{href:Kv(t),children:"Vault exportieren"}),m.jsx("button",{type:"button",disabled:b||!w||w.path!==i.path,onClick:()=>void G(),children:"Rückgängig"}),m.jsx("button",{type:"button",className:"primary",disabled:b,onClick:()=>void z(),children:"Speichern"})]})]}),M&&m.jsx("p",{className:"notes-conflict",role:"alert",children:M}),d&&m.jsx("p",{className:"notes-notice",role:"status",children:d}),m.jsx("textarea",{"aria-label":"Notizinhalt",value:s,onChange:A=>r(A.target.value),spellCheck:!1}),m.jsxs("footer",{className:"notes-editor__meta",children:[m.jsxs("section",{children:[m.jsx("h3",{children:"Links"}),i.links.length?i.links.map(A=>m.jsxs("button",{type:"button",disabled:!A.path,onClick:()=>A.path&&void R(A.path),children:[A.alias||A.target,A.path?"":" (nicht aufgelöst)"]},`${A.target}:${A.line}`)):m.jsx("span",{children:"Keine Wiki-Links."})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Backlinks"}),i.backlinks.length?i.backlinks.map(A=>m.jsxs("button",{type:"button",onClick:()=>void R(A.path),children:["← ",A.title," · Zeile ",A.line]},`${A.path}:${A.line}`)):m.jsx("span",{children:"Keine Rückverweise."})]}),m.jsxs("section",{children:[m.jsx("h3",{children:"Anhänge"}),m.jsx("input",{ref:T,type:"file",hidden:!0,onChange:A=>{var U;return void I((U=A.target.files)==null?void 0:U[0])}}),m.jsx("button",{type:"button",disabled:b,onClick:()=>{var A;return(A=T.current)==null?void 0:A.click()},children:"Datei anhängen"}),p.map(A=>m.jsxs("a",{href:F3(t,i.path,A.name),children:[A.name," · ",A.bytes," B"]},A.path))]})]})]}):m.jsx("p",{className:"notes-empty",children:"Keine Notiz im gewählten Vault."})})]})}function f2(t){const e=[],n=t.split(`
`);for(const i of n){const a=i.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/);a&&e.push({path:a[1],reasons:a[2]})}return e}function d2({workspaceId:t,onSelectSource:e}){const[n,i]=ne.useState(()=>new URLSearchParams(window.location.search).get("goal")||"authKey security tests"),[a,s]=ne.useState(!1),[r,o]=ne.useState(""),[l,c]=ne.useState(null),[h,f]=ne.useState(null),[u,p]=ne.useState(!1),[g,b]=ne.useState(!1);ne.useEffect(()=>{const M=new URLSearchParams(window.location.search).get("goal");M&&t&&(s(!0),Yv(t,M).then(_=>{c(_),_.id&&d(_.id)}).catch(_=>o((_==null?void 0:_.message)||"Fehler beim Erzeugen")).finally(()=>s(!1)))},[t]);const v=async M=>{M&&M.preventDefault();const _=n.trim();if(_){s(!0),o(""),c(null),f(null);try{const w=await Yv(t,_);c(w),w.id&&d(w.id)}catch(w){o((w==null?void 0:w.message)||"Fehler beim Erzeugen des Context Packs")}finally{s(!1)}}},d=async M=>{p(!0);try{const _=await L3(M);f(_)}catch(_){console.error("Staleness check error:",_)}finally{p(!1)}},x=l!=null&&l.body?f2(l.body):[];return m.jsxs("div",{className:"pack-view",children:[m.jsx("div",{className:"pack-view__header",children:m.jsxs("div",{className:"pack-view__title",children:[m.jsx("span",{className:"pack-view__icon",children:"📦"}),m.jsx("strong",{children:"Context-Pack-Inspector"}),m.jsx("span",{className:"pack-view__endpoint mono",children:"/api/context/pack"})]})}),m.jsx("form",{className:"pack-form",onSubmit:v,children:m.jsxs("div",{className:"pack-form__field",children:[m.jsx("label",{htmlFor:"pack-goal-input",children:"Aufgabe / Ziel für den Agenten:"}),m.jsxs("div",{className:"pack-input-row",children:[m.jsx("input",{id:"pack-goal-input",type:"text",className:"pack-input",value:n,onChange:M=>i(M.target.value),placeholder:"z. B. authKey security tests"}),m.jsx("button",{type:"submit",className:"pack-create-btn",disabled:a||!n.trim(),children:a?"Erzeuge …":"Pack erzeugen"})]})]})}),r&&m.jsxs("div",{className:"pack-error-alert",role:"alert",children:["⚠️ ",r]}),l&&m.jsx("div",{className:"pack-details",children:m.jsxs("div",{className:"pack-card",children:[m.jsxs("div",{className:"pack-card__header",children:[m.jsxs("div",{className:"pack-card__meta",children:[m.jsx("span",{className:"pack-id mono",children:l.id}),m.jsxs("span",{className:"pack-badge pack-badge--version",children:["v",l.version]}),m.jsxs("span",{className:"pack-badge pack-badge--sources",children:[l.sources," Quellen"]})]}),m.jsxs("div",{className:"pack-card__staleness",children:[u?m.jsx("span",{className:"pack-staleness-badge pack-staleness-badge--loading",children:"Prüfe …"}):h?m.jsx("span",{className:`pack-staleness-badge ${h.stale?"pack-staleness-badge--stale":"pack-staleness-badge--fresh"}`,children:h.stale?"🔴 Veraltet":"🟢 Frisch"}):null,m.jsx("button",{type:"button",className:"pack-staleness-btn",onClick:()=>d(l.id),disabled:u,title:"Staleness gegen aktuellen Brain-Index prüfen",children:"Neu prüfen"})]})]}),h&&h.stale&&m.jsxs("div",{className:"pack-stale-warning",children:[m.jsx("strong",{children:"Quellen haben sich geändert:"}),h.changed.length>0&&m.jsxs("div",{children:["Geändert: ",h.changed.join(", ")]}),h.missing.length>0&&m.jsxs("div",{children:["Fehlt: ",h.missing.join(", ")]})]}),m.jsxs("div",{className:"pack-sources-section",children:[m.jsx("h4",{children:"Extrahierte Quellen aus dem Index:"}),x.length===0?m.jsx("div",{className:"pack-sources-empty",children:"Keine spezifischen Quelltreffer für dieses Ziel gefunden."}):m.jsx("div",{className:"pack-sources-list",children:x.map(M=>m.jsxs("div",{className:"pack-source-item",onClick:()=>e(M.path),title:`Klicken, um ${M.path} in Quellansicht zu öffnen`,children:[m.jsxs("div",{className:"pack-source-path mono",children:["📄 ",M.path]}),m.jsx("div",{className:"pack-source-why",children:M.reasons})]},M.path))})]}),m.jsx("div",{className:"pack-body-toggle",children:m.jsx("button",{type:"button",className:"pack-toggle-raw-btn",onClick:()=>b(M=>!M),children:g?"Markdown-Text verbergen":"Vollständigen Pack-Markdown anzeigen"})}),g&&m.jsx("div",{className:"pack-raw-markdown mono",children:m.jsx("pre",{children:l.body})})]})})]})}const eM=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"notes",label:"Wissen",hint:"Notizen, Links, Backlinks, Tags und Anhänge"},{id:"explorer",label:"Explorer",hint:"Echter Quellbaum aus dem Brain"},{id:"search",label:"Suche",hint:"Code- & Symbolsuche über /api/agent/search"},{id:"packs",label:"Packs",hint:"Context-Pack-Inspector"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Nachweisbare Arbeit und Übergaben aus dem Core-Trace"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],Yd=jy,h2=2e3;function p2(){const t=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=t||e;return eM.some(i=>i.id===n)?n:"atlas"}function m2(){const t=new URLSearchParams(location.search);return t.has("workspace")?t.get("workspace")??"":t.has("workspaceRoot")?"":h3()}function g2(){var W,ie,ue;const[t,e]=ne.useState(null),[n,i]=ne.useState(null),[a,s]=ne.useState({depth:0,tasks:[]}),[r,o]=ne.useState(""),[l,c]=ne.useState(0),[h,f]=ne.useState(p2),[u,p]=ne.useState(m2),g=ne.useMemo(()=>{const O=new URLSearchParams(location.search);return O.has("workspace")?null:O.get("workspaceRoot")},[]),[b,v]=ne.useState([]),[d,x]=ne.useState(!1),[M,_]=ne.useState(""),[w,N]=ne.useState(!1),[T,y]=ne.useState(""),[R,C]=ne.useState(""),[L,z]=ne.useState(""),[G,P]=ne.useState(null),[I,B]=ne.useState(null),[A,U]=ne.useState(!1),[V,se]=ne.useState([]),[le,xe]=ne.useState(()=>{const O=new URLSearchParams(location.search).get("file"),k=Number(new URLSearchParams(location.search).get("line"));return O?{path:O,line:Number.isFinite(k)?k:null}:null}),[ke,Ke]=ne.useState(!1),[Be,re]=ne.useState(Zy()),[_e,me]=ne.useState(Fi()),[Le,ze]=ne.useState(!1),[Ie,xt]=ne.useState(null),[je,lt]=ne.useState([]),[Ge,qe]=ne.useState(!1),[Ct,mt]=ne.useState("");ne.useEffect(()=>{try{localStorage.setItem("plugbrain.view",h)}catch{}},[h]),ne.useEffect(()=>{h==="mesh"&&(U(!1),B(null))},[h]);const zt=ne.useRef(null);ne.useEffect(()=>{zt.current=I},[I]);const Ot=O=>{p(O),p3(O);const k=new URL(location.href);O?k.searchParams.set("workspace",O):k.searchParams.delete("workspace"),O&&k.searchParams.delete("workspaceRoot"),history.replaceState(null,"",k.toString())};ne.useEffect(()=>{if(!u)return;let O=!0;return fetch(`/api/graph?workspace=${encodeURIComponent(u)}&limit=5000`).then(k=>k.json()).then(k=>{if(!O||!(k!=null&&k.nodes))return;const he=k.nodes.filter(fe=>{var Ce;return fe.type==="file"&&(fe.path||((Ce=fe.properties)==null?void 0:Ce.path))}).map(fe=>{var Ce,F,pe,te;return{id:fe.id,path:fe.path||((Ce=fe.properties)==null?void 0:Ce.path),label:fe.label||fe.path,lang:fe.lang||((F=fe.properties)==null?void 0:F.lang),loc:fe.loc??((pe=fe.properties)==null?void 0:pe.lines)??0,agent:fe.agent||((te=fe.properties)!=null&&te.agentId?{id:fe.properties.agentId,name:fe.properties.agentName,color:fe.properties.agentColor}:null)}});se(he)}).catch(()=>{}),()=>{O=!1}},[u,l]),ne.useEffect(()=>{let O=!0;return Wv().then(k=>{if(O){if(v(k),!u&&g!==null){const he=m3(k,g);he&&Ot(he);return}if(!u&&k.length>0){const he=[...k].sort((fe,Ce)=>(Ce.indexedAt??"").localeCompare(fe.indexedAt??""))[0];he&&Ot(he.id)}}}).catch(()=>{O&&y("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{O=!1}},[]);const Rt=async O=>{O.preventDefault();const k=M.trim();if(k!==""){N(!0),y(""),C(""),z("Vault registriert — Indexlauf wird vorbereitet …");try{const he=await g3(k,void 0,fe=>z(Ip(fe)));Wv().then(fe=>{fe.length>0&&v(fe)}).catch(()=>{}),C("Vault registriert und indiziert."),_(""),x(!1),Ot(he),c(fe=>fe+1)}catch(he){y(he instanceof Error?he.message:String(he))}finally{N(!1),z("")}}},ye=async()=>{if(!(!u||w)){N(!0),y(""),C(""),z("Indexlauf wird vorbereitet …");try{const O=await qy(u,k=>z(Ip(k)));C(`Neu indiziert: ${(O==null?void 0:O.files)??0} Dateien, ${(O==null?void 0:O.symbols)??0} Symbole, ${(O==null?void 0:O.edges)??0} Kanten.`),c(k=>k+1)}catch(O){y(O instanceof Error?O.message:String(O))}finally{N(!1),z("")}}};ne.useEffect(()=>{if(!u)return;let O=!0,k;const he=async()=>{try{const fe=await fetch(`/api/index/progress?workspace=${encodeURIComponent(u)}`);if(fe.ok){const Ce=await fe.json();if(!O)return;z(F=>v3(Ce,F))}}catch{}O&&(k=setTimeout(()=>void he(),1500))};return he(),()=>{O=!1,clearTimeout(k)}},[u]);const H=O=>{O.preventDefault(),Ky(Be.trim()),M3(_e.trim()),N3(),c(k=>k+1),Ke(!1)},nt=async()=>{if(!(!u||Ge)){qe(!0),mt("");try{const O=await b3(u);xt(O),lt([...O.indexSelection.checkoutIds]),ze(!0)}catch(O){mt(O instanceof Error?O.message:String(O)),ze(!0)}finally{qe(!1)}}},Ve=O=>{lt(k=>k.includes(O)?k.filter(he=>he!==O):[...k,O])},D=async O=>{if(O.preventDefault(),!(!u||Ge)){qe(!0),mt("");try{const k=await E3(u,je);xt(k),lt([...k.indexSelection.checkoutIds]),C(k.indexSelection.checkoutIds.length===0?"Code-Auswahl gespeichert: bewusst keine Code-Checkouts aktiv.":`Code-Auswahl gespeichert: ${k.indexSelection.checkoutIds.length} Checkout(s) aktiv.`),ze(!1),c(he=>he+1)}catch(k){mt(k instanceof Error?k.message:String(k))}finally{qe(!1)}}},S=m.jsxs("form",{className:"brain-vault",onSubmit:Rt,children:[m.jsxs("div",{className:"brain-vault__row",children:[m.jsx("input",{className:"brain-vault__path",value:M,onChange:O=>_(O.target.value),placeholder:"Pfad eines Ordners, z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),m.jsx("button",{type:"submit",className:"brain-vault__open",disabled:w||M.trim()==="",children:w?"Indiziere …":"Als Vault öffnen"})]}),u&&m.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:m.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:w,onClick:()=>void ye(),children:w?"läuft …":"Neu indizieren"})}),L&&m.jsx("p",{className:"brain-vault__progress",role:"status","aria-live":"polite",children:L}),T&&m.jsx("p",{className:"brain-vault__error",role:"alert",children:T}),R&&m.jsx("p",{className:"brain-vault__done",role:"status",children:R})]});ne.useEffect(()=>{const O=u||void 0;fetch("/api/timeline"+(O?"?workspace="+encodeURIComponent(O):"")).then(k=>k.json()).then(k=>{var he;(he=k==null?void 0:k.bounds)!=null&&he.first&&P(k.bounds)}).catch(()=>{})},[u]),ne.useEffect(()=>{if(!A||!G)return;const O=new Date(G.first).getTime(),k=new Date(G.last).getTime(),he=Math.max(1,k-O);let fe=I?Math.round((new Date(I).getTime()-O)/he*60):0;const Ce=setInterval(()=>{if(fe+=1,fe>=60){B(null),U(!1);return}B(new Date(O+he*fe/60).toISOString())},220);return()=>clearInterval(Ce)},[A,G]),ne.useEffect(()=>{const O=new AbortController;let k,he="";const fe=u||void 0;async function Ce(){var F,pe,te;try{const Q=new URLSearchParams;fe&&Q.set("workspace",fe),Q.set("limit",String(h2)),zt.current&&Q.set("until",zt.current);const ve=await fetch("/api/atlas/snapshot"+(Q.toString()?`?${Q}`:""),{signal:O.signal});if(!ve.ok)throw new Error(`Brain-Verbindung: HTTP ${ve.status}`);const oe=await ve.json();if(!((F=oe.workspace)!=null&&F.canonicalPath)||!Array.isArray((pe=oe.graph)==null?void 0:pe.nodes)||!Array.isArray((te=oe.graph)==null?void 0:te.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const Re=`${oe.workspace.id}:${oe.updatedAt??""}:${oe.graph.nodes.length}:${oe.graph.edges.length}`;Re!==he&&(e(oe),he=Re),o("")}catch(Q){O.signal.aborted||o(Q instanceof Error?Q.message:String(Q))}if(fe)try{const Q=await A3(fe);O.signal.aborted||i(Q)}catch{O.signal.aborted||i(null)}else O.signal.aborted||i(null);try{const Q=await fetch("/api/queue"+(fe?"?workspace="+encodeURIComponent(fe):""),{signal:O.signal});if(Q.ok){const ve=await Q.json();(ve==null?void 0:ve.ok)===!0&&Array.isArray(ve.tasks)&&s({depth:Number(ve.depth??0),tasks:ve.tasks})}}catch{}O.signal.aborted||(k=setTimeout(Ce,3e3))}return Ce(),()=>{O.abort(),clearTimeout(k)}},[l,I,u]);const j=(t==null?void 0:t.graph.nodes.length)??V.length,Y=(t==null?void 0:t.graph.edges.length)??0,J=t!=null&&t.coverage?!t.coverage.indexComplete:!1,de=r?"getrennt (offline)":t||V.length>0?J?`${((W=t==null?void 0:t.coverage)==null?void 0:W.staleFiles)??0} Datei(en) warten auf den Index`:"live":"lädt …",ge=ne.useMemo(()=>{var O;return V.length>0?V:(O=t==null?void 0:t.graph)!=null&&O.nodes?t.graph.nodes.filter(k=>{var he;return k.type==="file"&&(((he=k.properties)==null?void 0:he.path)||k.path)}).map(k=>{var fe,Ce,F,pe;const he=((fe=k.properties)==null?void 0:fe.path)||k.path||"";return{id:k.id,path:he,label:k.label||k.name||he,lang:((Ce=k.properties)==null?void 0:Ce.lang)??k.lang??null,loc:((F=k.properties)==null?void 0:F.lines)??k.loc??0,agent:(pe=k.properties)!=null&&pe.agentId?{id:k.properties.agentId,name:k.properties.agentName||k.properties.agentId,color:k.properties.agentColor||"#60a5fa"}:null}}):[]},[V,t]),ee=(O,k)=>{O&&xe({path:O,line:k})};return m.jsxs(m.Fragment,{children:[r&&m.jsx("div",{className:"brain-offline-banner",role:"alert",children:m.jsxs("div",{className:"brain-offline-banner__inner",children:[m.jsx("span",{className:"brain-offline-badge",children:"OFFLINE"}),m.jsxs("span",{className:"brain-offline-text",children:[m.jsx("strong",{children:"Server nicht erreichbar:"})," ",r," — läuft ",m.jsx("code",{children:"plugbrain serve"}),"?"]}),m.jsx("button",{type:"button",className:"brain-offline-btn",onClick:()=>c(O=>O+1),children:"Erneut verbinden"})]})}),m.jsxs("div",{className:"live-status",role:"status",children:[m.jsx("strong",{className:"live-status__name",title:(t==null?void 0:t.workspace.canonicalPath)??"",children:t?Yd(t.workspace.name):((ie=b.find(O=>O.id===u))==null?void 0:ie.name)||"PlugBrain"}),u&&b.length>0&&m.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:m.jsx("select",{value:u,onChange:O=>{const k=O.target.value;k&&Ot(k)},children:b.map(O=>m.jsx("option",{value:O.id,children:Yd(O.name)},O.id))})}),u&&m.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{x(O=>!O),y(""),C("")},title:"Einen Ordner als neuen Vault öffnen",children:d?"Schließen":"Vault öffnen"}),u&&m.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>void nt(),disabled:Ge,title:"Aktive Code-Checkouts aus dem Planet-Inventar auswählen",children:Ge?"Lade Code …":"Code-Auswahl"}),m.jsxs("span",{className:"live-status__figures",children:[m.jsx("b",{children:j})," Objekte ",m.jsx("b",{children:Y})," Kanten",(t==null?void 0:t.coverage)&&t.coverage.totalFiles>t.coverage.shownFiles&&m.jsxs("span",{className:"live-status__sample",title:`Ausschnitt: ${t.coverage.shownFiles} von ${t.coverage.totalFiles} Dateien des Index`,children:[" ","· Ausschnitt aus ",t.coverage.totalFiles," Dateien"]})]}),m.jsx("span",{className:r?"live-status__state is-bad":"live-status__state",children:de}),m.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:eM.map(O=>m.jsx("button",{type:"button",title:O.hint,className:O.id===h?"on":void 0,"aria-pressed":O.id===h,onClick:()=>{f(O.id)},children:O.label},O.id))}),m.jsx("button",{type:"button",className:"brain-auth-btn",onClick:()=>Ke(!0),title:"Auth-Token konfigurieren",children:"🔑 Auth"}),r&&m.jsx("button",{type:"button",onClick:()=>c(O=>O+1),children:"Erneut verbinden"})]}),ke&&m.jsx("div",{className:"brain-modal-backdrop",onClick:()=>Ke(!1),children:m.jsxs("div",{className:"brain-modal",onClick:O=>O.stopPropagation(),children:[m.jsxs("div",{className:"brain-modal__header",children:[m.jsx("h3",{children:"PlugBrain Authentifizierung"}),m.jsx("button",{type:"button",className:"brain-modal__close",onClick:()=>Ke(!1),children:"✕"})]}),m.jsxs("form",{onSubmit:H,children:[m.jsxs("div",{className:"brain-modal__field",children:[m.jsxs("label",{children:["Bearer Token (aus ",m.jsx("code",{children:"auth.token"}),"):"]}),m.jsx("input",{type:"text",className:"brain-modal__input mono",value:Be,onChange:O=>re(O.target.value),placeholder:"plug-..."})]}),m.jsxs("div",{className:"brain-modal__field",children:[m.jsx("label",{children:"Agent ID:"}),m.jsx("input",{type:"text",className:"brain-modal__input mono",value:_e,onChange:O=>me(O.target.value),placeholder:"agy"})]}),m.jsxs("div",{className:"brain-modal__actions",children:[m.jsx("button",{type:"button",onClick:()=>Ke(!1),children:"Abbrechen"}),m.jsx("button",{type:"submit",className:"primary",children:"Speichern"})]})]})]})}),Le&&m.jsx("div",{className:"brain-modal-backdrop",onClick:()=>!Ge&&ze(!1),children:m.jsxs("div",{className:"brain-modal brain-selection-modal",onClick:O=>O.stopPropagation(),children:[m.jsxs("div",{className:"brain-modal__header",children:[m.jsx("h3",{children:"Aktive Code-Checkouts"}),m.jsx("button",{type:"button",className:"brain-modal__close",disabled:Ge,onClick:()=>ze(!1),children:"✕"})]}),m.jsx("p",{className:"brain-selection-modal__hint",children:"Das Inventar bleibt vollständig sichtbar. Nur die hier bewusst markierten Checkout-IDs werden beim nächsten Scan als aktiver Code indexiert."}),m.jsxs("form",{onSubmit:D,children:[Ct&&m.jsx("p",{className:"brain-vault__error",role:"alert",children:Ct}),Ie===null?m.jsx("p",{className:"brain-selection-modal__hint",children:"Planet-Inventar wird geladen …"}):Ie.checkouts.length===0?m.jsx("p",{className:"brain-selection-modal__hint",children:"Dieser Workspace hat keine discoverbaren Code-Checkouts."}):m.jsxs("fieldset",{className:"brain-selection-list",disabled:Ge,children:[m.jsx("legend",{children:"Checkout-Inventar"}),Ie.checkouts.map(O=>m.jsxs("label",{className:O.retiredAt?"is-retired":void 0,children:[m.jsx("input",{type:"checkbox",checked:je.includes(O.id),disabled:O.retiredAt!==null,onChange:()=>Ve(O.id)}),m.jsxs("span",{children:[m.jsx("strong",{children:O.relPrefix}),m.jsxs("small",{children:[O.id," · ",O.branch??"detached",O.retiredAt?" · retired":""]})]})]},O.id))]}),m.jsx("p",{className:"brain-selection-modal__hint",children:"Keine Auswahl ist ausdrücklich „notes only“; sie startet keinen leeren Code-Scan."}),m.jsxs("div",{className:"brain-modal__actions",children:[m.jsx("button",{type:"button",disabled:Ge,onClick:()=>ze(!1),children:"Abbrechen"}),m.jsx("button",{type:"submit",className:"primary",disabled:Ge||Ie===null,children:Ge?"Speichert …":"Auswahl speichern"})]})]})]})}),G&&(h==="atlas"||h==="city")&&m.jsxs("div",{className:"brain-timelapse",children:[m.jsx("button",{type:"button",onClick:()=>U(O=>!O),title:"Wachstum abspielen",children:A?"❚❚":"▶"}),m.jsx("input",{type:"range",min:0,max:60,step:1,value:I&&G?Math.round((new Date(I).getTime()-new Date(G.first).getTime())/Math.max(1,new Date(G.last).getTime()-new Date(G.first).getTime())*60):60,onChange:O=>{U(!1);const k=Number(O.target.value);if(k>=60){B(null);return}const he=new Date(G.first).getTime(),fe=new Date(G.last).getTime();B(new Date(he+(fe-he)*k/60).toISOString())}}),m.jsx("span",{children:I?new Date(I).toLocaleTimeString():"jetzt"})]}),d&&u&&S,u?m.jsxs("div",{className:"brain-workspace-layout",children:[h==="atlas"&&(t&&j>0?m.jsxs("div",{className:"atlas-wrapper",children:[m.jsx(_2,{graph:t.graph,onOpenSource:ee}),le&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(Cr,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>xe(null)})})]}):m.jsx("div",{className:"brain-empty",children:r?m.jsxs("div",{className:"brain-empty--offline-box",children:[m.jsx("div",{className:"offline-icon",children:"🔌"}),m.jsx("h3",{children:"Server getrennt (Offline-Zustand)"}),m.jsx("p",{children:"Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt."}),m.jsx("button",{type:"button",className:"btn primary",onClick:()=>c(O=>O+1),children:"Erneut verbinden"})]}):t?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …"})),h==="notes"&&m.jsx(u2,{workspaceId:u}),h==="explorer"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(l2,{workspaceName:(t==null?void 0:t.workspace.name)??(((ue=b.find(O=>O.id===u))==null?void 0:ue.name)||"Workspace"),files:ge,activePath:le==null?void 0:le.path,onSelectFile:O=>ee(O)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:le?m.jsx(Cr,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>xe(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"📂"}),m.jsx("h3",{children:"Datei im Explorer auswählen"}),m.jsx("p",{children:"Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen."})]})})]}),h==="search"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(c2,{workspaceId:u,onSelectHit:(O,k)=>ee(O,k)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:le?m.jsx(Cr,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>xe(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"🔍"}),m.jsxs("h3",{children:["Code- und Symbolsuche über ",m.jsx("code",{children:"/api/agent/search"})]}),m.jsxs("p",{children:["Gib einen Suchbegriff ein (z. B. ",m.jsx("code",{children:"authKey"}),"). Ein Klick auf einen Treffer öffnet direkt die Quelle."]})]})})]}),h==="packs"&&m.jsxs("div",{className:"workbench-split",children:[m.jsx("div",{className:"workbench-pane workbench-pane--side",children:m.jsx(d2,{workspaceId:u,onSelectSource:O=>ee(O)})}),m.jsx("div",{className:"workbench-pane workbench-pane--main",children:le?m.jsx(Cr,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>xe(null)}):m.jsxs("div",{className:"source-placeholder",children:[m.jsx("div",{className:"source-placeholder__icon",children:"📦"}),m.jsx("h3",{children:"Context-Pack-Inspector"}),m.jsx("p",{children:"Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen."})]})})]}),h==="city"&&m.jsxs("div",{className:"brain-view brain-view-city",children:[m.jsx(e2,{snapshot:t,onSelectFile:ee}),le&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(Cr,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>xe(null),onNavigateFile:(O,k)=>ee(O,k)})})]}),h==="queue"&&m.jsx("div",{className:"brain-view brain-view-queue",children:m.jsx(i2,{tasks:a.tasks,depth:a.depth})}),h==="mesh"&&m.jsxs("div",{className:"brain-view brain-view-mesh",children:[m.jsx(n2,{mesh:n,workspaceId:u,onSelectFile:ee}),le&&m.jsx("div",{className:"atlas-source-overlay",children:m.jsx(Cr,{workspaceId:u,path:le.path,highlightLine:le.line,onClose:()=>xe(null),onNavigateFile:(O,k)=>ee(O,k)})})]})]}):m.jsxs("div",{className:"brain-landing",role:"main",children:[m.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),m.jsx("p",{className:"brain-landing__lead",children:"Ein Ordner als Vault öffnen — der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."}),S,b.length>0&&m.jsxs("div",{className:"brain-vault__known",children:[m.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),b.map(O=>m.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>Ot(O.id),children:[Yd(O.name)," ",m.jsx("em",{title:O.root,children:O.indexedAt?"indiziert":"nicht indiziert"})]},O.id))]})]})]})}function v2(t,e){if(!e)return t;const n=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return t.split(n).map((i,a)=>a%2?m.jsx("mark",{children:i},a):i)}function _2({graph:t,onOpenSource:e}){const{CLUSTERS:n,nodes:i,edges:a,createAtlas:s}=ne.useMemo(()=>d3(t),[t]),r=Object.fromEntries(n.map(U=>[U.id,i.filter(V=>V.cid===U.id).length])),o=ne.useRef(null),l=ne.useRef(null),c=ne.useRef(null),h=ne.useRef(null),f=ne.useRef(null),u=ne.useRef(null),p=ne.useRef(null),g=ne.useRef(null),b=ne.useRef(null),v=ne.useRef(null),d=ne.useRef(null),x=ne.useRef(null),M=ne.useRef(null),[_,w]=ne.useState(!1),[N,T]=ne.useState({q:"",rows:[]}),[y,R]=ne.useState({flow:!0,label:!0,spin:!1}),[C,L]=ne.useState("atlas"),[z,G]=ne.useState("dark"),[P,I]=ne.useState([]),B=U=>{U!=null&&U.path&&e(U.path,U.line??null)};ne.useEffect(()=>{const U=s({els:{stage:o.current,labels:l.current,hudMode:c.current,hudSel:h.current,pathbar:f.current,chain:u.current,zlvl:p.current,sNode:g.current,sEdge:b.current,sDeg:v.current,sFps:d.current,q:x.current},emit:{gate:w,list:T,drawer:B,tools:R,theme:G}});return M.current=U,()=>{U.dispose(),M.current=null}},[s]);const A=U=>{var V;I(se=>se.includes(U)?se.filter(le=>le!==U):[...se,U]),(V=M.current)==null||V.toggleCluster(U)};return m.jsxs("div",{id:"app",className:"atlas-app",children:[m.jsxs("aside",{children:[m.jsxs("div",{className:"brand",children:[m.jsxs("h1",{children:[m.jsx("span",{className:"dot"}),"PlugBrain"]}),m.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",m.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),m.jsxs("div",{className:"searchbox",children:[m.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[m.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),m.jsx("path",{d:"M10.5 10.5 14 14"})]}),m.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol im Graph suchen…",autoComplete:"off",spellCheck:!1,ref:x,onChange:U=>{var V;return(V=M.current)==null?void 0:V.setQuery(U.target.value)}})]}),m.jsx("div",{className:"legend",id:"legend",children:n.map(U=>m.jsxs("button",{className:"cl"+(P.includes(U.id)?" off":""),type:"button",onClick:()=>A(U.id),children:[m.jsx("i",{style:{background:U.color}}),U.name,m.jsx("b",{children:r[U.id]})]},U.id))}),m.jsx("div",{className:"listwrap",id:"list",children:N.rows.length?N.rows.map(U=>m.jsxs("div",{className:"lrow"+(U.on?" on":""),"data-i":U.i,onClick:()=>{var se,le;(se=M.current)==null||se.selectAt(U.i);const V=i[U.i];(le=V==null?void 0:V.meta)!=null&&le.path&&e(V.meta.path,V.meta.line)},onMouseOver:()=>{var V;return(V=M.current)==null?void 0:V.hoverAt(U.i)},onMouseLeave:()=>{var V;return(V=M.current)==null?void 0:V.hoverAt(null)},children:[m.jsx("i",{style:{background:U.color}}),m.jsx("span",{children:v2(U.name,N.q)}),m.jsx("b",{children:U.deg})]},U.i)):m.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),m.jsxs("div",{className:"foot",children:[m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-node",ref:g,children:"—"}),m.jsx("div",{className:"l",children:"Objekte"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-edge",ref:b,children:"—"}),m.jsx("div",{className:"l",children:"Kanten"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-deg",ref:v,children:"—"}),m.jsx("div",{className:"l",children:"Ø-Grad"})]}),m.jsxs("div",{children:[m.jsx("div",{className:"k",id:"s-fps",ref:d,children:"—"}),m.jsx("div",{className:"l",children:"FPS"})]})]})]}),m.jsxs("div",{id:"stage",ref:o,children:[m.jsx("div",{id:"labels",ref:l}),m.jsxs("div",{id:"hud",children:[m.jsx("div",{children:m.jsx("b",{id:"hud-mode",ref:c,children:"GALAXIE · FREIER ORBIT"})}),m.jsx("div",{id:"hud-sel",ref:h,children:"Knoten anklicken, um Quelle direkt zu öffnen"}),m.jsxs("div",{id:"hud-sys",children:[i.length," VON ",t.nodes.length," OBJEKTEN · ",a.length," VON ",t.edges.length," KANTEN"]})]}),m.jsxs("div",{id:"pathbar",ref:f,children:[m.jsx("span",{className:"chain",id:"chain",ref:u}),m.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.clearPath()},children:"✕"})]}),m.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([U,V])=>m.jsx("button",{className:"tb"+(C===U?" on":""),"data-view":U,type:"button",onClick:()=>{var se;L(U),(se=M.current)==null||se.setView(U)},children:V},U)),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb"+(y.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleFlow()},children:"Signalfluss"}),m.jsx("button",{className:"tb"+(y.label?" on":""),id:"t-label",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleLabel()},children:"Labels"}),m.jsx("button",{className:"tb"+(y.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleSpin()},children:"Auto-Orbit"}),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var U;return(U=M.current)==null?void 0:U.dolly(1.18)},children:"−"}),m.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:p,onClick:()=>{var U;return(U=M.current)==null?void 0:U.zoomReset()},children:"100%"}),m.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var U;return(U=M.current)==null?void 0:U.dolly(1/1.18)},children:"＋"}),m.jsx("span",{className:"sep"}),m.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var U;return(U=M.current)==null?void 0:U.toggleTheme()},children:z==="light"?"Nacht":"Tag"}),m.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var U;return(U=M.current)==null?void 0:U.reset()},children:"Reset"})]}),m.jsx("div",{id:"hint",children:"Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt"}),m.jsxs("div",{id:"gate",style:_?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",m.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]})]})}QE.createRoot(document.getElementById("root")).render(m.jsx(ne.StrictMode,{children:m.jsx(g2,{})}));

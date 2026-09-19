(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var Qv={exports:{}},of={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jS=Symbol.for("react.transitional.element"),qS=Symbol.for("react.fragment");function Jv(t,e,n){var i=null;if(n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),"key"in e){n={};for(var a in e)a!=="key"&&(n[a]=e[a])}else n=e;return e=n.ref,{$$typeof:jS,type:t,key:i,ref:e!==void 0?e:null,props:n}}of.Fragment=qS;of.jsx=Jv;of.jsxs=Jv;Qv.exports=of;var v=Qv.exports,e_={exports:{}},pt={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Vp=Symbol.for("react.transitional.element"),YS=Symbol.for("react.portal"),ZS=Symbol.for("react.fragment"),KS=Symbol.for("react.strict_mode"),$S=Symbol.for("react.profiler"),QS=Symbol.for("react.consumer"),JS=Symbol.for("react.context"),eM=Symbol.for("react.forward_ref"),tM=Symbol.for("react.suspense"),nM=Symbol.for("react.memo"),t_=Symbol.for("react.lazy"),iM=Symbol.for("react.activity"),fg=Symbol.iterator;function aM(t){return t===null||typeof t!="object"?null:(t=fg&&t[fg]||t["@@iterator"],typeof t=="function"?t:null)}var n_={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},i_=Object.assign,a_={};function To(t,e,n){this.props=t,this.context=e,this.refs=a_,this.updater=n||n_}To.prototype.isReactComponent={};To.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};To.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function s_(){}s_.prototype=To.prototype;function Xp(t,e,n){this.props=t,this.context=e,this.refs=a_,this.updater=n||n_}var Wp=Xp.prototype=new s_;Wp.constructor=Xp;i_(Wp,To.prototype);Wp.isPureReactComponent=!0;var dg=Array.isArray;function $d(){}var rn={H:null,A:null,T:null,S:null},r_=Object.prototype.hasOwnProperty;function jp(t,e,n){var i=n.ref;return{$$typeof:Vp,type:t,key:e,ref:i!==void 0?i:null,props:n}}function sM(t,e){return jp(t.type,e,t.props)}function qp(t){return typeof t=="object"&&t!==null&&t.$$typeof===Vp}function rM(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var hg=/\/+/g;function Uf(t,e){return typeof t=="object"&&t!==null&&t.key!=null?rM(""+t.key):e.toString(36)}function oM(t){switch(t.status){case"fulfilled":return t.value;case"rejected":throw t.reason;default:switch(typeof t.status=="string"?t.then($d,$d):(t.status="pending",t.then(function(e){t.status==="pending"&&(t.status="fulfilled",t.value=e)},function(e){t.status==="pending"&&(t.status="rejected",t.reason=e)})),t.status){case"fulfilled":return t.value;case"rejected":throw t.reason}}throw t}function Pr(t,e,n,i,a){var s=typeof t;(s==="undefined"||s==="boolean")&&(t=null);var r=!1;if(t===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(t.$$typeof){case Vp:case YS:r=!0;break;case t_:return r=t._init,Pr(r(t._payload),e,n,i,a)}}if(r)return a=a(t),r=i===""?"."+Uf(t,0):i,dg(a)?(n="",r!=null&&(n=r.replace(hg,"$&/")+"/"),Pr(a,e,n,"",function(c){return c})):a!=null&&(qp(a)&&(a=sM(a,n+(a.key==null||t&&t.key===a.key?"":(""+a.key).replace(hg,"$&/")+"/")+r)),e.push(a)),1;r=0;var o=i===""?".":i+":";if(dg(t))for(var l=0;l<t.length;l++)i=t[l],s=o+Uf(i,l),r+=Pr(i,e,n,s,a);else if(l=aM(t),typeof l=="function")for(t=l.call(t),l=0;!(i=t.next()).done;)i=i.value,s=o+Uf(i,l++),r+=Pr(i,e,n,s,a);else if(s==="object"){if(typeof t.then=="function")return Pr(oM(t),e,n,i,a);throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.")}return r}function ic(t,e,n){if(t==null)return t;var i=[],a=0;return Pr(t,i,"","",function(s){return e.call(n,s,a++)}),i}function lM(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var pg=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},cM={map:ic,forEach:function(t,e,n){ic(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ic(t,function(){e++}),e},toArray:function(t){return ic(t,function(e){return e})||[]},only:function(t){if(!qp(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};pt.Activity=iM;pt.Children=cM;pt.Component=To;pt.Fragment=ZS;pt.Profiler=$S;pt.PureComponent=Xp;pt.StrictMode=KS;pt.Suspense=tM;pt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=rn;pt.__COMPILER_RUNTIME={__proto__:null,c:function(t){return rn.H.useMemoCache(t)}};pt.cache=function(t){return function(){return t.apply(null,arguments)}};pt.cacheSignal=function(){return null};pt.cloneElement=function(t,e,n){if(t==null)throw Error("The argument must be a React element, but you passed "+t+".");var i=i_({},t.props),a=t.key;if(e!=null)for(s in e.key!==void 0&&(a=""+e.key),e)!r_.call(e,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&e.ref===void 0||(i[s]=e[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return jp(t.type,a,i)};pt.createContext=function(t){return t={$$typeof:JS,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null},t.Provider=t,t.Consumer={$$typeof:QS,_context:t},t};pt.createElement=function(t,e,n){var i,a={},s=null;if(e!=null)for(i in e.key!==void 0&&(s=""+e.key),e)r_.call(e,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=e[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(t&&t.defaultProps)for(i in r=t.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return jp(t,s,a)};pt.createRef=function(){return{current:null}};pt.forwardRef=function(t){return{$$typeof:eM,render:t}};pt.isValidElement=qp;pt.lazy=function(t){return{$$typeof:t_,_payload:{_status:-1,_result:t},_init:lM}};pt.memo=function(t,e){return{$$typeof:nM,type:t,compare:e===void 0?null:e}};pt.startTransition=function(t){var e=rn.T,n={};rn.T=n;try{var i=t(),a=rn.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then($d,pg)}catch(s){pg(s)}finally{e!==null&&n.types!==null&&(e.types=n.types),rn.T=e}};pt.unstable_useCacheRefresh=function(){return rn.H.useCacheRefresh()};pt.use=function(t){return rn.H.use(t)};pt.useActionState=function(t,e,n){return rn.H.useActionState(t,e,n)};pt.useCallback=function(t,e){return rn.H.useCallback(t,e)};pt.useContext=function(t){return rn.H.useContext(t)};pt.useDebugValue=function(){};pt.useDeferredValue=function(t,e){return rn.H.useDeferredValue(t,e)};pt.useEffect=function(t,e){return rn.H.useEffect(t,e)};pt.useEffectEvent=function(t){return rn.H.useEffectEvent(t)};pt.useId=function(){return rn.H.useId()};pt.useImperativeHandle=function(t,e,n){return rn.H.useImperativeHandle(t,e,n)};pt.useInsertionEffect=function(t,e){return rn.H.useInsertionEffect(t,e)};pt.useLayoutEffect=function(t,e){return rn.H.useLayoutEffect(t,e)};pt.useMemo=function(t,e){return rn.H.useMemo(t,e)};pt.useOptimistic=function(t,e){return rn.H.useOptimistic(t,e)};pt.useReducer=function(t,e,n){return rn.H.useReducer(t,e,n)};pt.useRef=function(t){return rn.H.useRef(t)};pt.useState=function(t){return rn.H.useState(t)};pt.useSyncExternalStore=function(t,e,n){return rn.H.useSyncExternalStore(t,e,n)};pt.useTransition=function(){return rn.H.useTransition()};pt.version="19.2.8";e_.exports=pt;var de=e_.exports,o_={exports:{}},lf={},l_={exports:{}},c_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(P,F){var I=P.length;P.push(F);e:for(;0<I;){var j=I-1>>>1,me=P[j];if(0<a(me,F))P[j]=F,P[I]=me,I=j;else break e}}function n(P){return P.length===0?null:P[0]}function i(P){if(P.length===0)return null;var F=P[0],I=P.pop();if(I!==F){P[0]=I;e:for(var j=0,me=P.length,Ae=me>>>1;j<Ae;){var Ee=2*(j+1)-1,Qe=P[Ee],Je=Ee+1,et=P[Je];if(0>a(Qe,I))Je<me&&0>a(et,Qe)?(P[j]=et,P[Je]=I,j=Je):(P[j]=Qe,P[Ee]=I,j=Ee);else if(Je<me&&0>a(et,I))P[j]=et,P[Je]=I,j=Je;else break e}}return F}function a(P,F){var I=P.sortIndex-F.sortIndex;return I!==0?I:P.id-F.id}if(t.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;t.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();t.unstable_now=function(){return r.now()-o}}var l=[],c=[],d=1,h=null,u=3,p=!1,g=!1,E=!1,m=!1,f=typeof setTimeout=="function"?setTimeout:null,x=typeof clearTimeout=="function"?clearTimeout:null,S=typeof setImmediate<"u"?setImmediate:null;function y(P){for(var F=n(c);F!==null;){if(F.callback===null)i(c);else if(F.startTime<=P)i(c),F.sortIndex=F.expirationTime,e(l,F);else break;F=n(c)}}function U(P){if(E=!1,y(P),!g)if(n(l)!==null)g=!0,A||(A=!0,H());else{var F=n(c);F!==null&&B(U,F.startTime-P)}}var A=!1,T=-1,M=5,D=-1;function L(){return m?!0:!(t.unstable_now()-D<M)}function z(){if(m=!1,A){var P=t.unstable_now();D=P;var F=!0;try{e:{g=!1,E&&(E=!1,x(T),T=-1),p=!0;var I=u;try{t:{for(y(P),h=n(l);h!==null&&!(h.expirationTime>P&&L());){var j=h.callback;if(typeof j=="function"){h.callback=null,u=h.priorityLevel;var me=j(h.expirationTime<=P);if(P=t.unstable_now(),typeof me=="function"){h.callback=me,y(P),F=!0;break t}h===n(l)&&i(l),y(P)}else i(l);h=n(l)}if(h!==null)F=!0;else{var Ae=n(c);Ae!==null&&B(U,Ae.startTime-P),F=!1}}break e}finally{h=null,u=I,p=!1}F=void 0}}finally{F?H():A=!1}}}var H;if(typeof S=="function")H=function(){S(z)};else if(typeof MessageChannel<"u"){var X=new MessageChannel,N=X.port2;X.port1.onmessage=z,H=function(){N.postMessage(null)}}else H=function(){f(z,0)};function B(P,F){T=f(function(){P(t.unstable_now())},F)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(P){P.callback=null},t.unstable_forceFrameRate=function(P){0>P||125<P?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):M=0<P?Math.floor(1e3/P):5},t.unstable_getCurrentPriorityLevel=function(){return u},t.unstable_next=function(P){switch(u){case 1:case 2:case 3:var F=3;break;default:F=u}var I=u;u=F;try{return P()}finally{u=I}},t.unstable_requestPaint=function(){m=!0},t.unstable_runWithPriority=function(P,F){switch(P){case 1:case 2:case 3:case 4:case 5:break;default:P=3}var I=u;u=P;try{return F()}finally{u=I}},t.unstable_scheduleCallback=function(P,F,I){var j=t.unstable_now();switch(typeof I=="object"&&I!==null?(I=I.delay,I=typeof I=="number"&&0<I?j+I:j):I=j,P){case 1:var me=-1;break;case 2:me=250;break;case 5:me=1073741823;break;case 4:me=1e4;break;default:me=5e3}return me=I+me,P={id:d++,callback:F,priorityLevel:P,startTime:I,expirationTime:me,sortIndex:-1},I>j?(P.sortIndex=I,e(c,P),n(l)===null&&P===n(c)&&(E?(x(T),T=-1):E=!0,B(U,I-j))):(P.sortIndex=me,e(l,P),g||p||(g=!0,A||(A=!0,H()))),P},t.unstable_shouldYield=L,t.unstable_wrapCallback=function(P){var F=u;return function(){var I=u;u=F;try{return P.apply(this,arguments)}finally{u=I}}}})(c_);l_.exports=c_;var uM=l_.exports,u_={exports:{}},Kn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var fM=de;function f_(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function qa(){}var qn={d:{f:qa,r:function(){throw Error(f_(522))},D:qa,C:qa,L:qa,m:qa,X:qa,S:qa,M:qa},p:0,findDOMNode:null},dM=Symbol.for("react.portal");function hM(t,e,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:dM,key:i==null?null:""+i,children:t,containerInfo:e,implementation:n}}var cl=fM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function cf(t,e){if(t==="font")return"";if(typeof e=="string")return e==="use-credentials"?e:""}Kn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=qn;Kn.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)throw Error(f_(299));return hM(t,e,null,n)};Kn.flushSync=function(t){var e=cl.T,n=qn.p;try{if(cl.T=null,qn.p=2,t)return t()}finally{cl.T=e,qn.p=n,qn.d.f()}};Kn.preconnect=function(t,e){typeof t=="string"&&(e?(e=e.crossOrigin,e=typeof e=="string"?e==="use-credentials"?e:"":void 0):e=null,qn.d.C(t,e))};Kn.prefetchDNS=function(t){typeof t=="string"&&qn.d.D(t)};Kn.preinit=function(t,e){if(typeof t=="string"&&e&&typeof e.as=="string"){var n=e.as,i=cf(n,e.crossOrigin),a=typeof e.integrity=="string"?e.integrity:void 0,s=typeof e.fetchPriority=="string"?e.fetchPriority:void 0;n==="style"?qn.d.S(t,typeof e.precedence=="string"?e.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&qn.d.X(t,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof e.nonce=="string"?e.nonce:void 0})}};Kn.preinitModule=function(t,e){if(typeof t=="string")if(typeof e=="object"&&e!==null){if(e.as==null||e.as==="script"){var n=cf(e.as,e.crossOrigin);qn.d.M(t,{crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0})}}else e==null&&qn.d.M(t)};Kn.preload=function(t,e){if(typeof t=="string"&&typeof e=="object"&&e!==null&&typeof e.as=="string"){var n=e.as,i=cf(n,e.crossOrigin);qn.d.L(t,n,{crossOrigin:i,integrity:typeof e.integrity=="string"?e.integrity:void 0,nonce:typeof e.nonce=="string"?e.nonce:void 0,type:typeof e.type=="string"?e.type:void 0,fetchPriority:typeof e.fetchPriority=="string"?e.fetchPriority:void 0,referrerPolicy:typeof e.referrerPolicy=="string"?e.referrerPolicy:void 0,imageSrcSet:typeof e.imageSrcSet=="string"?e.imageSrcSet:void 0,imageSizes:typeof e.imageSizes=="string"?e.imageSizes:void 0,media:typeof e.media=="string"?e.media:void 0})}};Kn.preloadModule=function(t,e){if(typeof t=="string")if(e){var n=cf(e.as,e.crossOrigin);qn.d.m(t,{as:typeof e.as=="string"&&e.as!=="script"?e.as:void 0,crossOrigin:n,integrity:typeof e.integrity=="string"?e.integrity:void 0})}else qn.d.m(t)};Kn.requestFormReset=function(t){qn.d.r(t)};Kn.unstable_batchedUpdates=function(t,e){return t(e)};Kn.useFormState=function(t,e,n){return cl.H.useFormState(t,e,n)};Kn.useFormStatus=function(){return cl.H.useHostTransitionStatus()};Kn.version="19.2.8";function d_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(d_)}catch(t){console.error(t)}}d_(),u_.exports=Kn;var pM=u_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sn=uM,h_=de,mM=pM;function ye(t){var e="https://react.dev/errors/"+t;if(1<arguments.length){e+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function p_(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function kl(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function m_(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function g_(t){if(t.tag===31){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function mg(t){if(kl(t)!==t)throw Error(ye(188))}function gM(t){var e=t.alternate;if(!e){if(e=kl(t),e===null)throw Error(ye(188));return e!==t?null:t}for(var n=t,i=e;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return mg(a),t;if(s===i)return mg(a),e;s=s.sibling}throw Error(ye(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(ye(189))}}if(n.alternate!==i)throw Error(ye(190))}if(n.tag!==3)throw Error(ye(188));return n.stateNode.current===n?t:e}function v_(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t;for(t=t.child;t!==null;){if(e=v_(t),e!==null)return e;t=t.sibling}return null}var on=Object.assign,vM=Symbol.for("react.element"),ac=Symbol.for("react.transitional.element"),tl=Symbol.for("react.portal"),Br=Symbol.for("react.fragment"),__=Symbol.for("react.strict_mode"),Qd=Symbol.for("react.profiler"),x_=Symbol.for("react.consumer"),Ca=Symbol.for("react.context"),Yp=Symbol.for("react.forward_ref"),Jd=Symbol.for("react.suspense"),eh=Symbol.for("react.suspense_list"),Zp=Symbol.for("react.memo"),es=Symbol.for("react.lazy"),th=Symbol.for("react.activity"),_M=Symbol.for("react.memo_cache_sentinel"),gg=Symbol.iterator;function Bo(t){return t===null||typeof t!="object"?null:(t=gg&&t[gg]||t["@@iterator"],typeof t=="function"?t:null)}var xM=Symbol.for("react.client.reference");function nh(t){if(t==null)return null;if(typeof t=="function")return t.$$typeof===xM?null:t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case Br:return"Fragment";case Qd:return"Profiler";case __:return"StrictMode";case Jd:return"Suspense";case eh:return"SuspenseList";case th:return"Activity"}if(typeof t=="object")switch(t.$$typeof){case tl:return"Portal";case Ca:return t.displayName||"Context";case x_:return(t._context.displayName||"Context")+".Consumer";case Yp:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Zp:return e=t.displayName||null,e!==null?e:nh(t.type)||"Memo";case es:e=t._payload,t=t._init;try{return nh(t(e))}catch{}}return null}var nl=Array.isArray,ot=h_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ht=mM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,js={pending:!1,data:null,method:null,action:null},ih=[],Fr=-1;function fa(t){return{current:t}}function Cn(t){0>Fr||(t.current=ih[Fr],ih[Fr]=null,Fr--)}function tn(t,e){Fr++,ih[Fr]=t.current,t.current=e}var oa=fa(null),El=fa(null),ps=fa(null),Mu=fa(null);function bu(t,e){switch(tn(ps,e),tn(El,t),tn(oa,null),e.nodeType){case 9:case 11:t=(t=e.documentElement)&&(t=t.namespaceURI)?M0(t):0;break;default:if(t=e.tagName,e=e.namespaceURI)e=M0(e),t=Fy(e,t);else switch(t){case"svg":t=1;break;case"math":t=2;break;default:t=0}}Cn(oa),tn(oa,t)}function lo(){Cn(oa),Cn(El),Cn(ps)}function ah(t){t.memoizedState!==null&&tn(Mu,t);var e=oa.current,n=Fy(e,t.type);e!==n&&(tn(El,t),tn(oa,n))}function Eu(t){El.current===t&&(Cn(oa),Cn(El)),Mu.current===t&&(Cn(Mu),Pl._currentValue=js)}var Lf,vg;function Is(t){if(Lf===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Lf=e&&e[1]||"",vg=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+Lf+t+vg}var Of=!1;function Pf(t,e){if(!t||Of)return"";Of=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(e){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var u=p}Reflect.construct(t,[],h)}else{try{h.call()}catch(p){u=p}t.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}(h=t())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return t.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",t.displayName)),d}while(1<=i&&0<=a);break}}}finally{Of=!1,Error.prepareStackTrace=n}return(n=t?t.displayName||t.name:"")?Is(n):""}function yM(t,e){switch(t.tag){case 26:case 27:case 5:return Is(t.type);case 16:return Is("Lazy");case 13:return t.child!==e&&e!==null?Is("Suspense Fallback"):Is("Suspense");case 19:return Is("SuspenseList");case 0:case 15:return Pf(t.type,!1);case 11:return Pf(t.type.render,!1);case 1:return Pf(t.type,!0);case 31:return Is("Activity");default:return""}}function _g(t){try{var e="",n=null;do e+=yM(t,n),n=t,t=t.return;while(t);return e}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var sh=Object.prototype.hasOwnProperty,Kp=Sn.unstable_scheduleCallback,zf=Sn.unstable_cancelCallback,SM=Sn.unstable_shouldYield,MM=Sn.unstable_requestPaint,mi=Sn.unstable_now,bM=Sn.unstable_getCurrentPriorityLevel,y_=Sn.unstable_ImmediatePriority,S_=Sn.unstable_UserBlockingPriority,Tu=Sn.unstable_NormalPriority,EM=Sn.unstable_LowPriority,M_=Sn.unstable_IdlePriority,TM=Sn.log,AM=Sn.unstable_setDisableYieldValue,Vl=null,gi=null;function os(t){if(typeof TM=="function"&&AM(t),gi&&typeof gi.setStrictMode=="function")try{gi.setStrictMode(Vl,t)}catch{}}var vi=Math.clz32?Math.clz32:CM,wM=Math.log,RM=Math.LN2;function CM(t){return t>>>=0,t===0?32:31-(wM(t)/RM|0)|0}var sc=256,rc=262144,oc=4194304;function Bs(t){var e=t&42;if(e!==0)return e;switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return t&261888;case 262144:case 524288:case 1048576:case 2097152:return t&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return t&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return t}}function uf(t,e,n){var i=t.pendingLanes;if(i===0)return 0;var a=0,s=t.suspendedLanes,r=t.pingedLanes;t=t.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Bs(i):(r&=o,r!==0?a=Bs(r):n||(n=o&~t,n!==0&&(a=Bs(n))))):(o=i&~s,o!==0?a=Bs(o):r!==0?a=Bs(r):n||(n=i&~t,n!==0&&(a=Bs(n)))),a===0?0:e!==0&&e!==a&&!(e&s)&&(s=a&-a,n=e&-e,s>=n||s===32&&(n&4194048)!==0)?e:a}function Xl(t,e){return(t.pendingLanes&~(t.suspendedLanes&~t.pingedLanes)&e)===0}function DM(t,e){switch(t){case 1:case 2:case 4:case 8:case 64:return e+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function b_(){var t=oc;return oc<<=1,!(oc&62914560)&&(oc=4194304),t}function If(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function Wl(t,e){t.pendingLanes|=e,e!==268435456&&(t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0)}function NM(t,e,n,i,a,s){var r=t.pendingLanes;t.pendingLanes=n,t.suspendedLanes=0,t.pingedLanes=0,t.warmLanes=0,t.expiredLanes&=n,t.entangledLanes&=n,t.errorRecoveryDisabledLanes&=n,t.shellSuspendCounter=0;var o=t.entanglements,l=t.expirationTimes,c=t.hiddenUpdates;for(n=r&~n;0<n;){var d=31-vi(n),h=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var p=u[d];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&E_(t,i,0),s!==0&&a===0&&t.tag!==0&&(t.suspendedLanes|=s&~(r&~e))}function E_(t,e,n){t.pendingLanes|=e,t.suspendedLanes&=~e;var i=31-vi(e);t.entangledLanes|=e,t.entanglements[i]=t.entanglements[i]|1073741824|n&261930}function T_(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var i=31-vi(n),a=1<<i;a&e|t[i]&e&&(t[i]|=e),n&=~a}}function A_(t,e){var n=e&-e;return n=n&42?1:$p(n),n&(t.suspendedLanes|e)?0:n}function $p(t){switch(t){case 2:t=1;break;case 8:t=4;break;case 32:t=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:t=128;break;case 268435456:t=134217728;break;default:t=0}return t}function Qp(t){return t&=-t,2<t?8<t?t&134217727?32:268435456:8:2}function w_(){var t=Ht.p;return t!==0?t:(t=window.event,t===void 0?32:Ky(t.type))}function xg(t,e){var n=Ht.p;try{return Ht.p=t,e()}finally{Ht.p=n}}var Rs=Math.random().toString(36).slice(2),On="__reactFiber$"+Rs,ri="__reactProps$"+Rs,Ao="__reactContainer$"+Rs,rh="__reactEvents$"+Rs,UM="__reactListeners$"+Rs,LM="__reactHandles$"+Rs,yg="__reactResources$"+Rs,jl="__reactMarker$"+Rs;function Jp(t){delete t[On],delete t[ri],delete t[rh],delete t[UM],delete t[LM]}function Hr(t){var e=t[On];if(e)return e;for(var n=t.parentNode;n;){if(e=n[Ao]||n[On]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=w0(t);t!==null;){if(n=t[On])return n;t=w0(t)}return e}t=n,n=t.parentNode}return null}function wo(t){if(t=t[On]||t[Ao]){var e=t.tag;if(e===5||e===6||e===13||e===31||e===26||e===27||e===3)return t}return null}function il(t){var e=t.tag;if(e===5||e===26||e===27||e===6)return t.stateNode;throw Error(ye(33))}function Jr(t){var e=t[yg];return e||(e=t[yg]={hoistableStyles:new Map,hoistableScripts:new Map}),e}function wn(t){t[jl]=!0}var R_=new Set,C_={};function or(t,e){co(t,e),co(t+"Capture",e)}function co(t,e){for(C_[t]=e,t=0;t<e.length;t++)R_.add(e[t])}var OM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),Sg={},Mg={};function PM(t){return sh.call(Mg,t)?!0:sh.call(Sg,t)?!1:OM.test(t)?Mg[t]=!0:(Sg[t]=!0,!1)}function $c(t,e,n){if(PM(e))if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":t.removeAttribute(e);return;case"boolean":var i=e.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){t.removeAttribute(e);return}}t.setAttribute(e,""+n)}}function lc(t,e,n){if(n===null)t.removeAttribute(e);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(e);return}t.setAttribute(e,""+n)}}function ma(t,e,n,i){if(i===null)t.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":t.removeAttribute(n);return}t.setAttributeNS(e,n,""+i)}}function wi(t){switch(typeof t){case"bigint":case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function D_(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function zM(t,e,n){var i=Object.getOwnPropertyDescriptor(t.constructor.prototype,e);if(!t.hasOwnProperty(e)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(t,e,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function oh(t){if(!t._valueTracker){var e=D_(t)?"checked":"value";t._valueTracker=zM(t,e,""+t[e])}}function N_(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),i="";return t&&(i=D_(t)?t.checked?"true":"false":t.value),t=i,t!==n?(e.setValue(t),!0):!1}function Au(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}var IM=/[\n"\\]/g;function Ni(t){return t.replace(IM,function(e){return"\\"+e.charCodeAt(0).toString(16)+" "})}function lh(t,e,n,i,a,s,r,o){t.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?t.type=r:t.removeAttribute("type"),e!=null?r==="number"?(e===0&&t.value===""||t.value!=e)&&(t.value=""+wi(e)):t.value!==""+wi(e)&&(t.value=""+wi(e)):r!=="submit"&&r!=="reset"||t.removeAttribute("value"),e!=null?ch(t,r,wi(e)):n!=null?ch(t,r,wi(n)):i!=null&&t.removeAttribute("value"),a==null&&s!=null&&(t.defaultChecked=!!s),a!=null&&(t.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?t.name=""+wi(o):t.removeAttribute("name")}function U_(t,e,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(t.type=s),e!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||e!=null)){oh(t);return}n=n!=null?""+wi(n):"",e=e!=null?""+wi(e):n,o||e===t.value||(t.value=e),t.defaultValue=e}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,t.checked=o?t.checked:!!i,t.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(t.name=r),oh(t)}function ch(t,e,n){e==="number"&&Au(t.ownerDocument)===t||t.defaultValue===""+n||(t.defaultValue=""+n)}function eo(t,e,n,i){if(t=t.options,e){e={};for(var a=0;a<n.length;a++)e["$"+n[a]]=!0;for(n=0;n<t.length;n++)a=e.hasOwnProperty("$"+t[n].value),t[n].selected!==a&&(t[n].selected=a),a&&i&&(t[n].defaultSelected=!0)}else{for(n=""+wi(n),e=null,a=0;a<t.length;a++){if(t[a].value===n){t[a].selected=!0,i&&(t[a].defaultSelected=!0);return}e!==null||t[a].disabled||(e=t[a])}e!==null&&(e.selected=!0)}}function L_(t,e,n){if(e!=null&&(e=""+wi(e),e!==t.value&&(t.value=e),n==null)){t.defaultValue!==e&&(t.defaultValue=e);return}t.defaultValue=n!=null?""+wi(n):""}function O_(t,e,n,i){if(e==null){if(i!=null){if(n!=null)throw Error(ye(92));if(nl(i)){if(1<i.length)throw Error(ye(93));i=i[0]}n=i}n==null&&(n=""),e=n}n=wi(e),t.defaultValue=n,i=t.textContent,i===n&&i!==""&&i!==null&&(t.value=i),oh(t)}function uo(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var BM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function bg(t,e,n){var i=e.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?t.setProperty(e,""):e==="float"?t.cssFloat="":t[e]="":i?t.setProperty(e,n):typeof n!="number"||n===0||BM.has(e)?e==="float"?t.cssFloat=n:t[e]=(""+n).trim():t[e]=n+"px"}function P_(t,e,n){if(e!=null&&typeof e!="object")throw Error(ye(62));if(t=t.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||e!=null&&e.hasOwnProperty(i)||(i.indexOf("--")===0?t.setProperty(i,""):i==="float"?t.cssFloat="":t[i]="");for(var a in e)i=e[a],e.hasOwnProperty(a)&&n[a]!==i&&bg(t,a,i)}else for(var s in e)e.hasOwnProperty(s)&&bg(t,s,e[s])}function em(t){if(t.indexOf("-")===-1)return!1;switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var FM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),HM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Qc(t){return HM.test(""+t)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":t}function Da(){}var uh=null;function tm(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Gr=null,to=null;function Eg(t){var e=wo(t);if(e&&(t=e.stateNode)){var n=t[ri]||null;e:switch(t=e.stateNode,e.type){case"input":if(lh(t,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ni(""+e)+'"][type="radio"]'),e=0;e<n.length;e++){var i=n[e];if(i!==t&&i.form===t.form){var a=i[ri]||null;if(!a)throw Error(ye(90));lh(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(e=0;e<n.length;e++)i=n[e],i.form===t.form&&N_(i)}break e;case"textarea":L_(t,n.value,n.defaultValue);break e;case"select":e=n.value,e!=null&&eo(t,!!n.multiple,e,!1)}}}var Bf=!1;function z_(t,e,n){if(Bf)return t(e,n);Bf=!0;try{var i=t(e);return i}finally{if(Bf=!1,(Gr!==null||to!==null)&&(Mf(),Gr&&(e=Gr,t=to,to=Gr=null,Eg(e),t)))for(e=0;e<t.length;e++)Eg(t[e])}}function Tl(t,e){var n=t.stateNode;if(n===null)return null;var i=n[ri]||null;if(i===null)return null;n=i[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(t=t.type,i=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!i;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(ye(231,e,typeof n));return n}var Ba=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),fh=!1;if(Ba)try{var Fo={};Object.defineProperty(Fo,"passive",{get:function(){fh=!0}}),window.addEventListener("test",Fo,Fo),window.removeEventListener("test",Fo,Fo)}catch{fh=!1}var ls=null,nm=null,Jc=null;function I_(){if(Jc)return Jc;var t,e=nm,n=e.length,i,a="value"in ls?ls.value:ls.textContent,s=a.length;for(t=0;t<n&&e[t]===a[t];t++);var r=n-t;for(i=1;i<=r&&e[n-i]===a[s-i];i++);return Jc=a.slice(t,1<i?1-i:void 0)}function eu(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function cc(){return!0}function Tg(){return!1}function oi(t){function e(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in t)t.hasOwnProperty(o)&&(n=t[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?cc:Tg,this.isPropagationStopped=Tg,this}return on(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=cc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=cc)},persist:function(){},isPersistent:cc}),e}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ff=oi(lr),ql=on({},lr,{view:0,detail:0}),GM=oi(ql),Ff,Hf,Ho,df=on({},ql,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:im,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Ho&&(Ho&&t.type==="mousemove"?(Ff=t.screenX-Ho.screenX,Hf=t.screenY-Ho.screenY):Hf=Ff=0,Ho=t),Ff)},movementY:function(t){return"movementY"in t?t.movementY:Hf}}),Ag=oi(df),kM=on({},df,{dataTransfer:0}),VM=oi(kM),XM=on({},ql,{relatedTarget:0}),Gf=oi(XM),WM=on({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),jM=oi(WM),qM=on({},lr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),YM=oi(qM),ZM=on({},lr,{data:0}),wg=oi(ZM),KM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},$M={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},QM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function JM(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=QM[t])?!!e[t]:!1}function im(){return JM}var eb=on({},ql,{key:function(t){if(t.key){var e=KM[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=eu(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?$M[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:im,charCode:function(t){return t.type==="keypress"?eu(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?eu(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),tb=oi(eb),nb=on({},df,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Rg=oi(nb),ib=on({},ql,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:im}),ab=oi(ib),sb=on({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),rb=oi(sb),ob=on({},df,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),lb=oi(ob),cb=on({},lr,{newState:0,oldState:0}),ub=oi(cb),fb=[9,13,27,32],am=Ba&&"CompositionEvent"in window,ul=null;Ba&&"documentMode"in document&&(ul=document.documentMode);var db=Ba&&"TextEvent"in window&&!ul,B_=Ba&&(!am||ul&&8<ul&&11>=ul),Cg=" ",Dg=!1;function F_(t,e){switch(t){case"keyup":return fb.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function H_(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var kr=!1;function hb(t,e){switch(t){case"compositionend":return H_(e);case"keypress":return e.which!==32?null:(Dg=!0,Cg);case"textInput":return t=e.data,t===Cg&&Dg?null:t;default:return null}}function pb(t,e){if(kr)return t==="compositionend"||!am&&F_(t,e)?(t=I_(),Jc=nm=ls=null,kr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return B_&&e.locale!=="ko"?null:e.data;default:return null}}var mb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Ng(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!mb[t.type]:e==="textarea"}function G_(t,e,n,i){Gr?to?to.push(i):to=[i]:Gr=i,e=Xu(e,"onChange"),0<e.length&&(n=new ff("onChange","change",null,n,i),t.push({event:n,listeners:e}))}var fl=null,Al=null;function gb(t){zy(t,0)}function hf(t){var e=il(t);if(N_(e))return t}function Ug(t,e){if(t==="change")return e}var k_=!1;if(Ba){var kf;if(Ba){var Vf="oninput"in document;if(!Vf){var Lg=document.createElement("div");Lg.setAttribute("oninput","return;"),Vf=typeof Lg.oninput=="function"}kf=Vf}else kf=!1;k_=kf&&(!document.documentMode||9<document.documentMode)}function Og(){fl&&(fl.detachEvent("onpropertychange",V_),Al=fl=null)}function V_(t){if(t.propertyName==="value"&&hf(Al)){var e=[];G_(e,Al,t,tm(t)),z_(gb,e)}}function vb(t,e,n){t==="focusin"?(Og(),fl=e,Al=n,fl.attachEvent("onpropertychange",V_)):t==="focusout"&&Og()}function _b(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return hf(Al)}function xb(t,e){if(t==="click")return hf(e)}function yb(t,e){if(t==="input"||t==="change")return hf(e)}function Sb(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var xi=typeof Object.is=="function"?Object.is:Sb;function wl(t,e){if(xi(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),i=Object.keys(e);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!sh.call(e,a)||!xi(t[a],e[a]))return!1}return!0}function Pg(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function zg(t,e){var n=Pg(t);t=0;for(var i;n;){if(n.nodeType===3){if(i=t+n.textContent.length,t<=e&&i>=e)return{node:n,offset:e-t};t=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Pg(n)}}function X_(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?X_(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function W_(t){t=t!=null&&t.ownerDocument!=null&&t.ownerDocument.defaultView!=null?t.ownerDocument.defaultView:window;for(var e=Au(t.document);e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=Au(t.document)}return e}function sm(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}var Mb=Ba&&"documentMode"in document&&11>=document.documentMode,Vr=null,dh=null,dl=null,hh=!1;function Ig(t,e,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;hh||Vr==null||Vr!==Au(i)||(i=Vr,"selectionStart"in i&&sm(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),dl&&wl(dl,i)||(dl=i,i=Xu(dh,"onSelect"),0<i.length&&(e=new ff("onSelect","select",null,e,n),t.push({event:e,listeners:i}),e.target=Vr)))}function Us(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var Xr={animationend:Us("Animation","AnimationEnd"),animationiteration:Us("Animation","AnimationIteration"),animationstart:Us("Animation","AnimationStart"),transitionrun:Us("Transition","TransitionRun"),transitionstart:Us("Transition","TransitionStart"),transitioncancel:Us("Transition","TransitionCancel"),transitionend:Us("Transition","TransitionEnd")},Xf={},j_={};Ba&&(j_=document.createElement("div").style,"AnimationEvent"in window||(delete Xr.animationend.animation,delete Xr.animationiteration.animation,delete Xr.animationstart.animation),"TransitionEvent"in window||delete Xr.transitionend.transition);function cr(t){if(Xf[t])return Xf[t];if(!Xr[t])return t;var e=Xr[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in j_)return Xf[t]=e[n];return t}var q_=cr("animationend"),Y_=cr("animationiteration"),Z_=cr("animationstart"),bb=cr("transitionrun"),Eb=cr("transitionstart"),Tb=cr("transitioncancel"),K_=cr("transitionend"),$_=new Map,ph="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ph.push("scrollEnd");function Ki(t,e){$_.set(t,e),or(e,[t])}var wu=typeof reportError=="function"?reportError:function(t){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var e=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof t=="object"&&t!==null&&typeof t.message=="string"?String(t.message):String(t),error:t});if(!window.dispatchEvent(e))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",t);return}console.error(t)},Ti=[],Wr=0,rm=0;function pf(){for(var t=Wr,e=rm=Wr=0;e<t;){var n=Ti[e];Ti[e++]=null;var i=Ti[e];Ti[e++]=null;var a=Ti[e];Ti[e++]=null;var s=Ti[e];if(Ti[e++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&Q_(n,a,s)}}function mf(t,e,n,i){Ti[Wr++]=t,Ti[Wr++]=e,Ti[Wr++]=n,Ti[Wr++]=i,rm|=i,t.lanes|=i,t=t.alternate,t!==null&&(t.lanes|=i)}function om(t,e,n,i){return mf(t,e,n,i),Ru(t)}function ur(t,e){return mf(t,null,null,e),Ru(t)}function Q_(t,e,n){t.lanes|=n;var i=t.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=t.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(t=s.stateNode,t===null||t._visibility&1||(a=!0)),t=s,s=s.return;return t.tag===3?(s=t.stateNode,a&&e!==null&&(a=31-vi(n),t=s.hiddenUpdates,i=t[a],i===null?t[a]=[e]:i.push(e),e.lane=n|536870912),s):null}function Ru(t){if(50<Sl)throw Sl=0,Ph=null,Error(ye(185));for(var e=t.return;e!==null;)t=e,e=t.return;return t.tag===3?t.stateNode:null}var jr={};function Ab(t,e,n,i){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(t,e,n,i){return new Ab(t,e,n,i)}function lm(t){return t=t.prototype,!(!t||!t.isReactComponent)}function La(t,e){var n=t.alternate;return n===null?(n=hi(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&65011712,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n.refCleanup=t.refCleanup,n}function J_(t,e){t.flags&=65011714;var n=t.alternate;return n===null?(t.childLanes=0,t.lanes=e,t.child=null,t.subtreeFlags=0,t.memoizedProps=null,t.memoizedState=null,t.updateQueue=null,t.dependencies=null,t.stateNode=null):(t.childLanes=n.childLanes,t.lanes=n.lanes,t.child=n.child,t.subtreeFlags=0,t.deletions=null,t.memoizedProps=n.memoizedProps,t.memoizedState=n.memoizedState,t.updateQueue=n.updateQueue,t.type=n.type,e=n.dependencies,t.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t}function tu(t,e,n,i,a,s){var r=0;if(i=t,typeof t=="function")lm(t)&&(r=1);else if(typeof t=="string")r=NE(t,n,oa.current)?26:t==="html"||t==="head"||t==="body"?27:5;else e:switch(t){case th:return t=hi(31,n,e,a),t.elementType=th,t.lanes=s,t;case Br:return qs(n.children,a,s,e);case __:r=8,a|=24;break;case Qd:return t=hi(12,n,e,a|2),t.elementType=Qd,t.lanes=s,t;case Jd:return t=hi(13,n,e,a),t.elementType=Jd,t.lanes=s,t;case eh:return t=hi(19,n,e,a),t.elementType=eh,t.lanes=s,t;default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ca:r=10;break e;case x_:r=9;break e;case Yp:r=11;break e;case Zp:r=14;break e;case es:r=16,i=null;break e}r=29,n=Error(ye(130,t===null?"null":typeof t,"")),i=null}return e=hi(r,n,e,a),e.elementType=t,e.type=i,e.lanes=s,e}function qs(t,e,n,i){return t=hi(7,t,i,e),t.lanes=n,t}function Wf(t,e,n){return t=hi(6,t,null,e),t.lanes=n,t}function ex(t){var e=hi(18,null,null,0);return e.stateNode=t,e}function jf(t,e,n){return e=hi(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}var Bg=new WeakMap;function Ui(t,e){if(typeof t=="object"&&t!==null){var n=Bg.get(t);return n!==void 0?n:(e={value:t,source:e,stack:_g(e)},Bg.set(t,e),e)}return{value:t,source:e,stack:_g(e)}}var qr=[],Yr=0,Cu=null,Rl=0,Ri=[],Ci=0,bs=null,ia=1,aa="";function Aa(t,e){qr[Yr++]=Rl,qr[Yr++]=Cu,Cu=t,Rl=e}function tx(t,e,n){Ri[Ci++]=ia,Ri[Ci++]=aa,Ri[Ci++]=bs,bs=t;var i=ia;t=aa;var a=32-vi(i)-1;i&=~(1<<a),n+=1;var s=32-vi(e)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,ia=1<<32-vi(e)+a|n<<a|i,aa=s+t}else ia=1<<s|n<<a|i,aa=t}function cm(t){t.return!==null&&(Aa(t,1),tx(t,1,0))}function um(t){for(;t===Cu;)Cu=qr[--Yr],qr[Yr]=null,Rl=qr[--Yr],qr[Yr]=null;for(;t===bs;)bs=Ri[--Ci],Ri[Ci]=null,aa=Ri[--Ci],Ri[Ci]=null,ia=Ri[--Ci],Ri[Ci]=null}function nx(t,e){Ri[Ci++]=ia,Ri[Ci++]=aa,Ri[Ci++]=bs,ia=e.id,aa=e.overflow,bs=t}var Pn=null,sn=null,Lt=!1,ms=null,Li=!1,mh=Error(ye(519));function Es(t){var e=Error(ye(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Cl(Ui(e,t)),mh}function Fg(t){var e=t.stateNode,n=t.type,i=t.memoizedProps;switch(e[On]=t,e[ri]=i,n){case"dialog":Et("cancel",e),Et("close",e);break;case"iframe":case"object":case"embed":Et("load",e);break;case"video":case"audio":for(n=0;n<Ll.length;n++)Et(Ll[n],e);break;case"source":Et("error",e);break;case"img":case"image":case"link":Et("error",e),Et("load",e);break;case"details":Et("toggle",e);break;case"input":Et("invalid",e),U_(e,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Et("invalid",e);break;case"textarea":Et("invalid",e),O_(e,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||e.textContent===""+n||i.suppressHydrationWarning===!0||By(e.textContent,n)?(i.popover!=null&&(Et("beforetoggle",e),Et("toggle",e)),i.onScroll!=null&&Et("scroll",e),i.onScrollEnd!=null&&Et("scrollend",e),i.onClick!=null&&(e.onclick=Da),e=!0):e=!1,e||Es(t,!0)}function Hg(t){for(Pn=t.return;Pn;)switch(Pn.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Pn=Pn.return}}function gr(t){if(t!==Pn)return!1;if(!Lt)return Hg(t),Lt=!0,!1;var e=t.tag,n;if((n=e!==3&&e!==27)&&((n=e===5)&&(n=t.type,n=!(n!=="form"&&n!=="button")||Hh(t.type,t.memoizedProps)),n=!n),n&&sn&&Es(t),Hg(t),e===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ye(317));sn=A0(t)}else if(e===31){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ye(317));sn=A0(t)}else e===27?(e=sn,Cs(t.type)?(t=Xh,Xh=null,sn=t):sn=e):sn=Pn?Ii(t.stateNode.nextSibling):null;return!0}function Qs(){sn=Pn=null,Lt=!1}function qf(){var t=ms;return t!==null&&(ii===null?ii=t:ii.push.apply(ii,t),ms=null),t}function Cl(t){ms===null?ms=[t]:ms.push(t)}var gh=fa(null),fr=null,Na=null;function ns(t,e,n){tn(gh,e._currentValue),e._currentValue=n}function Oa(t){t._currentValue=gh.current,Cn(gh)}function vh(t,e,n){for(;t!==null;){var i=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,i!==null&&(i.childLanes|=e)):i!==null&&(i.childLanes&e)!==e&&(i.childLanes|=e),t===n)break;t=t.return}}function _h(t,e,n,i){var a=t.child;for(a!==null&&(a.return=t);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;e:for(;s!==null;){var o=s;s=a;for(var l=0;l<e.length;l++)if(o.context===e[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),vh(s.return,n,t),i||(r=null);break e}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(ye(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),vh(r,n,t),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===t){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ro(t,e,n,i){t=null;for(var a=e,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(ye(387));if(r=r.memoizedProps,r!==null){var o=a.type;xi(a.pendingProps.value,r.value)||(t!==null?t.push(o):t=[o])}}else if(a===Mu.current){if(r=a.alternate,r===null)throw Error(ye(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(t!==null?t.push(Pl):t=[Pl])}a=a.return}t!==null&&_h(e,t,n,i),e.flags|=262144}function Du(t){for(t=t.firstContext;t!==null;){if(!xi(t.context._currentValue,t.memoizedValue))return!0;t=t.next}return!1}function Js(t){fr=t,Na=null,t=t.dependencies,t!==null&&(t.firstContext=null)}function zn(t){return ix(fr,t)}function uc(t,e){return fr===null&&Js(t),ix(t,e)}function ix(t,e){var n=e._currentValue;if(e={context:e,memoizedValue:n,next:null},Na===null){if(t===null)throw Error(ye(308));Na=e,t.dependencies={lanes:0,firstContext:e},t.flags|=524288}else Na=Na.next=e;return n}var wb=typeof AbortController<"u"?AbortController:function(){var t=[],e=this.signal={aborted:!1,addEventListener:function(n,i){t.push(i)}};this.abort=function(){e.aborted=!0,t.forEach(function(n){return n()})}},Rb=Sn.unstable_scheduleCallback,Cb=Sn.unstable_NormalPriority,_n={$$typeof:Ca,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function fm(){return{controller:new wb,data:new Map,refCount:0}}function Yl(t){t.refCount--,t.refCount===0&&Rb(Cb,function(){t.controller.abort()})}var hl=null,xh=0,fo=0,no=null;function Db(t,e){if(hl===null){var n=hl=[];xh=0,fo=zm(),no={status:"pending",value:void 0,then:function(i){n.push(i)}}}return xh++,e.then(Gg,Gg),e}function Gg(){if(--xh===0&&hl!==null){no!==null&&(no.status="fulfilled");var t=hl;hl=null,fo=0,no=null;for(var e=0;e<t.length;e++)(0,t[e])()}}function Nb(t,e){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return t.then(function(){i.status="fulfilled",i.value=e;for(var a=0;a<n.length;a++)(0,n[a])(e)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var kg=ot.S;ot.S=function(t,e){vy=mi(),typeof e=="object"&&e!==null&&typeof e.then=="function"&&Db(t,e),kg!==null&&kg(t,e)};var Ys=fa(null);function dm(){var t=Ys.current;return t!==null?t:Jt.pooledCache}function nu(t,e){e===null?tn(Ys,Ys.current):tn(Ys,e.pool)}function ax(){var t=dm();return t===null?null:{parent:_n._currentValue,pool:t}}var Co=Error(ye(460)),hm=Error(ye(474)),gf=Error(ye(542)),Nu={then:function(){}};function Vg(t){return t=t.status,t==="fulfilled"||t==="rejected"}function sx(t,e,n){switch(n=t[n],n===void 0?t.push(e):n!==e&&(e.then(Da,Da),e=n),e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Wg(t),t;default:if(typeof e.status=="string")e.then(Da,Da);else{if(t=Jt,t!==null&&100<t.shellSuspendCounter)throw Error(ye(482));t=e,t.status="pending",t.then(function(i){if(e.status==="pending"){var a=e;a.status="fulfilled",a.value=i}},function(i){if(e.status==="pending"){var a=e;a.status="rejected",a.reason=i}})}switch(e.status){case"fulfilled":return e.value;case"rejected":throw t=e.reason,Wg(t),t}throw Zs=e,Co}}function Fs(t){try{var e=t._init;return e(t._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Zs=n,Co):n}}var Zs=null;function Xg(){if(Zs===null)throw Error(ye(459));var t=Zs;return Zs=null,t}function Wg(t){if(t===Co||t===gf)throw Error(ye(483))}var io=null,Dl=0;function fc(t){var e=Dl;return Dl+=1,io===null&&(io=[]),sx(io,t,e)}function Go(t,e){e=e.props.ref,t.ref=e!==void 0?e:null}function dc(t,e){throw e.$$typeof===vM?Error(ye(525)):(t=Object.prototype.toString.call(e),Error(ye(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)))}function rx(t){function e(f,x){if(t){var S=f.deletions;S===null?(f.deletions=[x],f.flags|=16):S.push(x)}}function n(f,x){if(!t)return null;for(;x!==null;)e(f,x),x=x.sibling;return null}function i(f){for(var x=new Map;f!==null;)f.key!==null?x.set(f.key,f):x.set(f.index,f),f=f.sibling;return x}function a(f,x){return f=La(f,x),f.index=0,f.sibling=null,f}function s(f,x,S){return f.index=S,t?(S=f.alternate,S!==null?(S=S.index,S<x?(f.flags|=67108866,x):S):(f.flags|=67108866,x)):(f.flags|=1048576,x)}function r(f){return t&&f.alternate===null&&(f.flags|=67108866),f}function o(f,x,S,y){return x===null||x.tag!==6?(x=Wf(S,f.mode,y),x.return=f,x):(x=a(x,S),x.return=f,x)}function l(f,x,S,y){var U=S.type;return U===Br?d(f,x,S.props.children,y,S.key):x!==null&&(x.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===es&&Fs(U)===x.type)?(x=a(x,S.props),Go(x,S),x.return=f,x):(x=tu(S.type,S.key,S.props,null,f.mode,y),Go(x,S),x.return=f,x)}function c(f,x,S,y){return x===null||x.tag!==4||x.stateNode.containerInfo!==S.containerInfo||x.stateNode.implementation!==S.implementation?(x=jf(S,f.mode,y),x.return=f,x):(x=a(x,S.children||[]),x.return=f,x)}function d(f,x,S,y,U){return x===null||x.tag!==7?(x=qs(S,f.mode,y,U),x.return=f,x):(x=a(x,S),x.return=f,x)}function h(f,x,S){if(typeof x=="string"&&x!==""||typeof x=="number"||typeof x=="bigint")return x=Wf(""+x,f.mode,S),x.return=f,x;if(typeof x=="object"&&x!==null){switch(x.$$typeof){case ac:return S=tu(x.type,x.key,x.props,null,f.mode,S),Go(S,x),S.return=f,S;case tl:return x=jf(x,f.mode,S),x.return=f,x;case es:return x=Fs(x),h(f,x,S)}if(nl(x)||Bo(x))return x=qs(x,f.mode,S,null),x.return=f,x;if(typeof x.then=="function")return h(f,fc(x),S);if(x.$$typeof===Ca)return h(f,uc(f,x),S);dc(f,x)}return null}function u(f,x,S,y){var U=x!==null?x.key:null;if(typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint")return U!==null?null:o(f,x,""+S,y);if(typeof S=="object"&&S!==null){switch(S.$$typeof){case ac:return S.key===U?l(f,x,S,y):null;case tl:return S.key===U?c(f,x,S,y):null;case es:return S=Fs(S),u(f,x,S,y)}if(nl(S)||Bo(S))return U!==null?null:d(f,x,S,y,null);if(typeof S.then=="function")return u(f,x,fc(S),y);if(S.$$typeof===Ca)return u(f,x,uc(f,S),y);dc(f,S)}return null}function p(f,x,S,y,U){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return f=f.get(S)||null,o(x,f,""+y,U);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ac:return f=f.get(y.key===null?S:y.key)||null,l(x,f,y,U);case tl:return f=f.get(y.key===null?S:y.key)||null,c(x,f,y,U);case es:return y=Fs(y),p(f,x,S,y,U)}if(nl(y)||Bo(y))return f=f.get(S)||null,d(x,f,y,U,null);if(typeof y.then=="function")return p(f,x,S,fc(y),U);if(y.$$typeof===Ca)return p(f,x,S,uc(x,y),U);dc(x,y)}return null}function g(f,x,S,y){for(var U=null,A=null,T=x,M=x=0,D=null;T!==null&&M<S.length;M++){T.index>M?(D=T,T=null):D=T.sibling;var L=u(f,T,S[M],y);if(L===null){T===null&&(T=D);break}t&&T&&L.alternate===null&&e(f,T),x=s(L,x,M),A===null?U=L:A.sibling=L,A=L,T=D}if(M===S.length)return n(f,T),Lt&&Aa(f,M),U;if(T===null){for(;M<S.length;M++)T=h(f,S[M],y),T!==null&&(x=s(T,x,M),A===null?U=T:A.sibling=T,A=T);return Lt&&Aa(f,M),U}for(T=i(T);M<S.length;M++)D=p(T,f,M,S[M],y),D!==null&&(t&&D.alternate!==null&&T.delete(D.key===null?M:D.key),x=s(D,x,M),A===null?U=D:A.sibling=D,A=D);return t&&T.forEach(function(z){return e(f,z)}),Lt&&Aa(f,M),U}function E(f,x,S,y){if(S==null)throw Error(ye(151));for(var U=null,A=null,T=x,M=x=0,D=null,L=S.next();T!==null&&!L.done;M++,L=S.next()){T.index>M?(D=T,T=null):D=T.sibling;var z=u(f,T,L.value,y);if(z===null){T===null&&(T=D);break}t&&T&&z.alternate===null&&e(f,T),x=s(z,x,M),A===null?U=z:A.sibling=z,A=z,T=D}if(L.done)return n(f,T),Lt&&Aa(f,M),U;if(T===null){for(;!L.done;M++,L=S.next())L=h(f,L.value,y),L!==null&&(x=s(L,x,M),A===null?U=L:A.sibling=L,A=L);return Lt&&Aa(f,M),U}for(T=i(T);!L.done;M++,L=S.next())L=p(T,f,M,L.value,y),L!==null&&(t&&L.alternate!==null&&T.delete(L.key===null?M:L.key),x=s(L,x,M),A===null?U=L:A.sibling=L,A=L);return t&&T.forEach(function(H){return e(f,H)}),Lt&&Aa(f,M),U}function m(f,x,S,y){if(typeof S=="object"&&S!==null&&S.type===Br&&S.key===null&&(S=S.props.children),typeof S=="object"&&S!==null){switch(S.$$typeof){case ac:e:{for(var U=S.key;x!==null;){if(x.key===U){if(U=S.type,U===Br){if(x.tag===7){n(f,x.sibling),y=a(x,S.props.children),y.return=f,f=y;break e}}else if(x.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===es&&Fs(U)===x.type){n(f,x.sibling),y=a(x,S.props),Go(y,S),y.return=f,f=y;break e}n(f,x);break}else e(f,x);x=x.sibling}S.type===Br?(y=qs(S.props.children,f.mode,y,S.key),y.return=f,f=y):(y=tu(S.type,S.key,S.props,null,f.mode,y),Go(y,S),y.return=f,f=y)}return r(f);case tl:e:{for(U=S.key;x!==null;){if(x.key===U)if(x.tag===4&&x.stateNode.containerInfo===S.containerInfo&&x.stateNode.implementation===S.implementation){n(f,x.sibling),y=a(x,S.children||[]),y.return=f,f=y;break e}else{n(f,x);break}else e(f,x);x=x.sibling}y=jf(S,f.mode,y),y.return=f,f=y}return r(f);case es:return S=Fs(S),m(f,x,S,y)}if(nl(S))return g(f,x,S,y);if(Bo(S)){if(U=Bo(S),typeof U!="function")throw Error(ye(150));return S=U.call(S),E(f,x,S,y)}if(typeof S.then=="function")return m(f,x,fc(S),y);if(S.$$typeof===Ca)return m(f,x,uc(f,S),y);dc(f,S)}return typeof S=="string"&&S!==""||typeof S=="number"||typeof S=="bigint"?(S=""+S,x!==null&&x.tag===6?(n(f,x.sibling),y=a(x,S),y.return=f,f=y):(n(f,x),y=Wf(S,f.mode,y),y.return=f,f=y),r(f)):n(f,x)}return function(f,x,S,y){try{Dl=0;var U=m(f,x,S,y);return io=null,U}catch(T){if(T===Co||T===gf)throw T;var A=hi(29,T,null,f.mode);return A.lanes=y,A.return=f,A}finally{}}}var er=rx(!0),ox=rx(!1),ts=!1;function pm(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function yh(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,callbacks:null})}function gs(t){return{lane:t,tag:0,payload:null,callback:null,next:null}}function vs(t,e,n){var i=t.updateQueue;if(i===null)return null;if(i=i.shared,Ft&2){var a=i.pending;return a===null?e.next=e:(e.next=a.next,a.next=e),i.pending=e,e=Ru(t),Q_(t,null,n),e}return mf(t,i,e,n),Ru(t)}function pl(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194048)!==0)){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,T_(t,n)}}function Yf(t,e){var n=t.updateQueue,i=t.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=e:s=s.next=e}else a=s=e;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}var Sh=!1;function ml(){if(Sh){var t=no;if(t!==null)throw t}}function gl(t,e,n,i){Sh=!1;var a=t.updateQueue;ts=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var d=t.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=a.baseState;r=0,d=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(Ct&u)===u:(i&u)===u){u!==0&&u===fo&&(Sh=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});e:{var g=t,E=o;u=e;var m=n;switch(E.tag){case 1:if(g=E.payload,typeof g=="function"){h=g.call(m,h,u);break e}h=g;break e;case 3:g.flags=g.flags&-65537|128;case 0:if(g=E.payload,u=typeof g=="function"?g.call(m,h,u):g,u==null)break e;h=on({},h,u);break e;case 2:ts=!0}}u=o.callback,u!==null&&(t.flags|=64,p&&(t.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);d===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,s===null&&(a.shared.lanes=0),As|=r,t.lanes=r,t.memoizedState=h}}function lx(t,e){if(typeof t!="function")throw Error(ye(191,t));t.call(e)}function cx(t,e){var n=t.callbacks;if(n!==null)for(t.callbacks=null,t=0;t<n.length;t++)lx(n[t],e)}var ho=fa(null),Uu=fa(0);function jg(t,e){t=ka,tn(Uu,t),tn(ho,e),ka=t|e.baseLanes}function Mh(){tn(Uu,ka),tn(ho,ho.current)}function mm(){ka=Uu.current,Cn(ho),Cn(Uu)}var yi=fa(null),zi=null;function is(t){var e=t.alternate;tn(hn,hn.current&1),tn(yi,t),zi===null&&(e===null||ho.current!==null||e.memoizedState!==null)&&(zi=t)}function bh(t){tn(hn,hn.current),tn(yi,t),zi===null&&(zi=t)}function ux(t){t.tag===22?(tn(hn,hn.current),tn(yi,t),zi===null&&(zi=t)):as()}function as(){tn(hn,hn.current),tn(yi,yi.current)}function di(t){Cn(yi),zi===t&&(zi=null),Cn(hn)}var hn=fa(0);function Lu(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||kh(n)||Vh(n)))return e}else if(e.tag===19&&(e.memoizedProps.revealOrder==="forwards"||e.memoizedProps.revealOrder==="backwards"||e.memoizedProps.revealOrder==="unstable_legacy-backwards"||e.memoizedProps.revealOrder==="together")){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Fa=0,mt=null,$t=null,gn=null,Ou=!1,ao=!1,tr=!1,Pu=0,Nl=0,so=null,Ub=0;function un(){throw Error(ye(321))}function gm(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!xi(t[n],e[n]))return!1;return!0}function vm(t,e,n,i,a,s){return Fa=s,mt=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,ot.H=t===null||t.memoizedState===null?Gx:Rm,tr=!1,s=n(i,a),tr=!1,ao&&(s=dx(e,n,i,a)),fx(t),s}function fx(t){ot.H=Ul;var e=$t!==null&&$t.next!==null;if(Fa=0,gn=$t=mt=null,Ou=!1,Nl=0,so=null,e)throw Error(ye(300));t===null||xn||(t=t.dependencies,t!==null&&Du(t)&&(xn=!0))}function dx(t,e,n,i){mt=t;var a=0;do{if(ao&&(so=null),Nl=0,ao=!1,25<=a)throw Error(ye(301));if(a+=1,gn=$t=null,t.updateQueue!=null){var s=t.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}ot.H=kx,s=e(n,i)}while(ao);return s}function Lb(){var t=ot.H,e=t.useState()[0];return e=typeof e.then=="function"?Zl(e):e,t=t.useState()[0],($t!==null?$t.memoizedState:null)!==t&&(mt.flags|=1024),e}function _m(){var t=Pu!==0;return Pu=0,t}function xm(t,e,n){e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~n}function ym(t){if(Ou){for(t=t.memoizedState;t!==null;){var e=t.queue;e!==null&&(e.pending=null),t=t.next}Ou=!1}Fa=0,gn=$t=mt=null,ao=!1,Nl=Pu=0,so=null}function jn(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?mt.memoizedState=gn=t:gn=gn.next=t,gn}function pn(){if($t===null){var t=mt.alternate;t=t!==null?t.memoizedState:null}else t=$t.next;var e=gn===null?mt.memoizedState:gn.next;if(e!==null)gn=e,$t=t;else{if(t===null)throw mt.alternate===null?Error(ye(467)):Error(ye(310));$t=t,t={memoizedState:$t.memoizedState,baseState:$t.baseState,baseQueue:$t.baseQueue,queue:$t.queue,next:null},gn===null?mt.memoizedState=gn=t:gn=gn.next=t}return gn}function vf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function Zl(t){var e=Nl;return Nl+=1,so===null&&(so=[]),t=sx(so,t,e),e=mt,(gn===null?e.memoizedState:gn.next)===null&&(e=e.alternate,ot.H=e===null||e.memoizedState===null?Gx:Rm),t}function _f(t){if(t!==null&&typeof t=="object"){if(typeof t.then=="function")return Zl(t);if(t.$$typeof===Ca)return zn(t)}throw Error(ye(438,String(t)))}function Sm(t){var e=null,n=mt.updateQueue;if(n!==null&&(e=n.memoCache),e==null){var i=mt.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(e={data:i.data.map(function(a){return a.slice()}),index:0})))}if(e==null&&(e={data:[],index:0}),n===null&&(n=vf(),mt.updateQueue=n),n.memoCache=e,n=e.data[e.index],n===void 0)for(n=e.data[e.index]=Array(t),i=0;i<t;i++)n[i]=_M;return e.index++,n}function Ha(t,e){return typeof e=="function"?e(t):e}function iu(t){var e=pn();return Mm(e,$t,t)}function Mm(t,e,n){var i=t.queue;if(i===null)throw Error(ye(311));i.lastRenderedReducer=n;var a=t.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}e.baseQueue=a=s,i.pending=null}if(s=t.baseState,a===null)t.memoizedState=s;else{e=a.next;var o=r=null,l=null,c=e,d=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(Ct&h)===h:(Fa&h)===h){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===fo&&(d=!0);else if((Fa&u)===u){c=c.next,u===fo&&(d=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=s):l=l.next=h,mt.lanes|=u,As|=u;h=c.action,tr&&n(s,h),s=c.hasEagerState?c.eagerState:n(s,h)}else u={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,mt.lanes|=h,As|=h;c=c.next}while(c!==null&&c!==e);if(l===null?r=s:l.next=o,!xi(s,t.memoizedState)&&(xn=!0,d&&(n=no,n!==null)))throw n;t.memoizedState=s,t.baseState=r,t.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[t.memoizedState,i.dispatch]}function Zf(t){var e=pn(),n=e.queue;if(n===null)throw Error(ye(311));n.lastRenderedReducer=t;var i=n.dispatch,a=n.pending,s=e.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=t(s,r.action),r=r.next;while(r!==a);xi(s,e.memoizedState)||(xn=!0),e.memoizedState=s,e.baseQueue===null&&(e.baseState=s),n.lastRenderedState=s}return[s,i]}function hx(t,e,n){var i=mt,a=pn(),s=Lt;if(s){if(n===void 0)throw Error(ye(407));n=n()}else n=e();var r=!xi(($t||a).memoizedState,n);if(r&&(a.memoizedState=n,xn=!0),a=a.queue,bm(gx.bind(null,i,a,t),[t]),a.getSnapshot!==e||r||gn!==null&&gn.memoizedState.tag&1){if(i.flags|=2048,po(9,{destroy:void 0},mx.bind(null,i,a,n,e),null),Jt===null)throw Error(ye(349));s||Fa&127||px(i,e,n)}return n}function px(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=mt.updateQueue,e===null?(e=vf(),mt.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function mx(t,e,n,i){e.value=n,e.getSnapshot=i,vx(e)&&_x(t)}function gx(t,e,n){return n(function(){vx(e)&&_x(t)})}function vx(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!xi(t,n)}catch{return!0}}function _x(t){var e=ur(t,2);e!==null&&ai(e,t,2)}function Eh(t){var e=jn();if(typeof t=="function"){var n=t;if(t=n(),tr){os(!0);try{n()}finally{os(!1)}}}return e.memoizedState=e.baseState=t,e.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:t},e}function xx(t,e,n,i){return t.baseState=n,Mm(t,$t,typeof i=="function"?i:Ha)}function Ob(t,e,n,i,a){if(yf(t))throw Error(ye(485));if(t=e.action,t!==null){var s={payload:a,action:t,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};ot.T!==null?n(!0):s.isTransition=!1,i(s),n=e.pending,n===null?(s.next=e.pending=s,yx(e,s)):(s.next=n.next,e.pending=n.next=s)}}function yx(t,e){var n=e.action,i=e.payload,a=t.state;if(e.isTransition){var s=ot.T,r={};ot.T=r;try{var o=n(a,i),l=ot.S;l!==null&&l(r,o),qg(t,e,o)}catch(c){Th(t,e,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),ot.T=s}}else try{s=n(a,i),qg(t,e,s)}catch(c){Th(t,e,c)}}function qg(t,e,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Yg(t,e,i)},function(i){return Th(t,e,i)}):Yg(t,e,n)}function Yg(t,e,n){e.status="fulfilled",e.value=n,Sx(e),t.state=n,e=t.pending,e!==null&&(n=e.next,n===e?t.pending=null:(n=n.next,e.next=n,yx(t,n)))}function Th(t,e,n){var i=t.pending;if(t.pending=null,i!==null){i=i.next;do e.status="rejected",e.reason=n,Sx(e),e=e.next;while(e!==i)}t.action=null}function Sx(t){t=t.listeners;for(var e=0;e<t.length;e++)(0,t[e])()}function Mx(t,e){return e}function Zg(t,e){if(Lt){var n=Jt.formState;if(n!==null){e:{var i=mt;if(Lt){if(sn){t:{for(var a=sn,s=Li;a.nodeType!==8;){if(!s){a=null;break t}if(a=Ii(a.nextSibling),a===null){a=null;break t}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){sn=Ii(a.nextSibling),i=a.data==="F!";break e}}Es(i)}i=!1}i&&(e=n[0])}}return n=jn(),n.memoizedState=n.baseState=e,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Mx,lastRenderedState:e},n.queue=i,n=Bx.bind(null,mt,i),i.dispatch=n,i=Eh(!1),s=wm.bind(null,mt,!1,i.queue),i=jn(),a={state:e,dispatch:null,action:t,pending:null},i.queue=a,n=Ob.bind(null,mt,a,s,n),a.dispatch=n,i.memoizedState=t,[e,n,!1]}function Kg(t){var e=pn();return bx(e,$t,t)}function bx(t,e,n){if(e=Mm(t,e,Mx)[0],t=iu(Ha)[0],typeof e=="object"&&e!==null&&typeof e.then=="function")try{var i=Zl(e)}catch(r){throw r===Co?gf:r}else i=e;e=pn();var a=e.queue,s=a.dispatch;return n!==e.memoizedState&&(mt.flags|=2048,po(9,{destroy:void 0},Pb.bind(null,a,n),null)),[i,s,t]}function Pb(t,e){t.action=e}function $g(t){var e=pn(),n=$t;if(n!==null)return bx(e,n,t);pn(),e=e.memoizedState,n=pn();var i=n.queue.dispatch;return n.memoizedState=t,[e,i,!1]}function po(t,e,n,i){return t={tag:t,create:n,deps:i,inst:e,next:null},e=mt.updateQueue,e===null&&(e=vf(),mt.updateQueue=e),n=e.lastEffect,n===null?e.lastEffect=t.next=t:(i=n.next,n.next=t,t.next=i,e.lastEffect=t),t}function Ex(){return pn().memoizedState}function au(t,e,n,i){var a=jn();mt.flags|=t,a.memoizedState=po(1|e,{destroy:void 0},n,i===void 0?null:i)}function xf(t,e,n,i){var a=pn();i=i===void 0?null:i;var s=a.memoizedState.inst;$t!==null&&i!==null&&gm(i,$t.memoizedState.deps)?a.memoizedState=po(e,s,n,i):(mt.flags|=t,a.memoizedState=po(1|e,s,n,i))}function Qg(t,e){au(8390656,8,t,e)}function bm(t,e){xf(2048,8,t,e)}function zb(t){mt.flags|=4;var e=mt.updateQueue;if(e===null)e=vf(),mt.updateQueue=e,e.events=[t];else{var n=e.events;n===null?e.events=[t]:n.push(t)}}function Tx(t){var e=pn().memoizedState;return zb({ref:e,nextImpl:t}),function(){if(Ft&2)throw Error(ye(440));return e.impl.apply(void 0,arguments)}}function Ax(t,e){return xf(4,2,t,e)}function wx(t,e){return xf(4,4,t,e)}function Rx(t,e){if(typeof e=="function"){t=t();var n=e(t);return function(){typeof n=="function"?n():e(null)}}if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Cx(t,e,n){n=n!=null?n.concat([t]):null,xf(4,4,Rx.bind(null,e,t),n)}function Em(){}function Dx(t,e){var n=pn();e=e===void 0?null:e;var i=n.memoizedState;return e!==null&&gm(e,i[1])?i[0]:(n.memoizedState=[t,e],t)}function Nx(t,e){var n=pn();e=e===void 0?null:e;var i=n.memoizedState;if(e!==null&&gm(e,i[1]))return i[0];if(i=t(),tr){os(!0);try{t()}finally{os(!1)}}return n.memoizedState=[i,e],i}function Tm(t,e,n){return n===void 0||Fa&1073741824&&!(Ct&261930)?t.memoizedState=e:(t.memoizedState=n,t=xy(),mt.lanes|=t,As|=t,n)}function Ux(t,e,n,i){return xi(n,e)?n:ho.current!==null?(t=Tm(t,n,i),xi(t,e)||(xn=!0),t):!(Fa&42)||Fa&1073741824&&!(Ct&261930)?(xn=!0,t.memoizedState=n):(t=xy(),mt.lanes|=t,As|=t,e)}function Lx(t,e,n,i,a){var s=Ht.p;Ht.p=s!==0&&8>s?s:8;var r=ot.T,o={};ot.T=o,wm(t,!1,e,n);try{var l=a(),c=ot.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=Nb(l,i);vl(t,e,d,_i(t))}else vl(t,e,i,_i(t))}catch(h){vl(t,e,{then:function(){},status:"rejected",reason:h},_i())}finally{Ht.p=s,r!==null&&o.types!==null&&(r.types=o.types),ot.T=r}}function Ib(){}function Ah(t,e,n,i){if(t.tag!==5)throw Error(ye(476));var a=Ox(t).queue;Lx(t,a,e,js,n===null?Ib:function(){return Px(t),n(i)})}function Ox(t){var e=t.memoizedState;if(e!==null)return e;e={memoizedState:js,baseState:js,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:js},next:null};var n={};return e.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:n},next:null},t.memoizedState=e,t=t.alternate,t!==null&&(t.memoizedState=e),e}function Px(t){var e=Ox(t);e.next===null&&(e=t.alternate.memoizedState),vl(t,e.next.queue,{},_i())}function Am(){return zn(Pl)}function zx(){return pn().memoizedState}function Ix(){return pn().memoizedState}function Bb(t){for(var e=t.return;e!==null;){switch(e.tag){case 24:case 3:var n=_i();t=gs(n);var i=vs(e,t,n);i!==null&&(ai(i,e,n),pl(i,e,n)),e={cache:fm()},t.payload=e;return}e=e.return}}function Fb(t,e,n){var i=_i();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},yf(t)?Fx(e,n):(n=om(t,e,n,i),n!==null&&(ai(n,t,i),Hx(n,e,i)))}function Bx(t,e,n){var i=_i();vl(t,e,n,i)}function vl(t,e,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(yf(t))Fx(e,a);else{var s=t.alternate;if(t.lanes===0&&(s===null||s.lanes===0)&&(s=e.lastRenderedReducer,s!==null))try{var r=e.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,xi(o,r))return mf(t,e,a,0),Jt===null&&pf(),!1}catch{}finally{}if(n=om(t,e,a,i),n!==null)return ai(n,t,i),Hx(n,e,i),!0}return!1}function wm(t,e,n,i){if(i={lane:2,revertLane:zm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},yf(t)){if(e)throw Error(ye(479))}else e=om(t,n,i,2),e!==null&&ai(e,t,2)}function yf(t){var e=t.alternate;return t===mt||e!==null&&e===mt}function Fx(t,e){ao=Ou=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Hx(t,e,n){if(n&4194048){var i=e.lanes;i&=t.pendingLanes,n|=i,e.lanes=n,T_(t,n)}}var Ul={readContext:zn,use:_f,useCallback:un,useContext:un,useEffect:un,useImperativeHandle:un,useLayoutEffect:un,useInsertionEffect:un,useMemo:un,useReducer:un,useRef:un,useState:un,useDebugValue:un,useDeferredValue:un,useTransition:un,useSyncExternalStore:un,useId:un,useHostTransitionStatus:un,useFormState:un,useActionState:un,useOptimistic:un,useMemoCache:un,useCacheRefresh:un};Ul.useEffectEvent=un;var Gx={readContext:zn,use:_f,useCallback:function(t,e){return jn().memoizedState=[t,e===void 0?null:e],t},useContext:zn,useEffect:Qg,useImperativeHandle:function(t,e,n){n=n!=null?n.concat([t]):null,au(4194308,4,Rx.bind(null,e,t),n)},useLayoutEffect:function(t,e){return au(4194308,4,t,e)},useInsertionEffect:function(t,e){au(4,2,t,e)},useMemo:function(t,e){var n=jn();e=e===void 0?null:e;var i=t();if(tr){os(!0);try{t()}finally{os(!1)}}return n.memoizedState=[i,e],i},useReducer:function(t,e,n){var i=jn();if(n!==void 0){var a=n(e);if(tr){os(!0);try{n(e)}finally{os(!1)}}}else a=e;return i.memoizedState=i.baseState=a,t={pending:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:a},i.queue=t,t=t.dispatch=Fb.bind(null,mt,t),[i.memoizedState,t]},useRef:function(t){var e=jn();return t={current:t},e.memoizedState=t},useState:function(t){t=Eh(t);var e=t.queue,n=Bx.bind(null,mt,e);return e.dispatch=n,[t.memoizedState,n]},useDebugValue:Em,useDeferredValue:function(t,e){var n=jn();return Tm(n,t,e)},useTransition:function(){var t=Eh(!1);return t=Lx.bind(null,mt,t.queue,!0,!1),jn().memoizedState=t,[!1,t]},useSyncExternalStore:function(t,e,n){var i=mt,a=jn();if(Lt){if(n===void 0)throw Error(ye(407));n=n()}else{if(n=e(),Jt===null)throw Error(ye(349));Ct&127||px(i,e,n)}a.memoizedState=n;var s={value:n,getSnapshot:e};return a.queue=s,Qg(gx.bind(null,i,s,t),[t]),i.flags|=2048,po(9,{destroy:void 0},mx.bind(null,i,s,n,e),null),n},useId:function(){var t=jn(),e=Jt.identifierPrefix;if(Lt){var n=aa,i=ia;n=(i&~(1<<32-vi(i)-1)).toString(32)+n,e="_"+e+"R_"+n,n=Pu++,0<n&&(e+="H"+n.toString(32)),e+="_"}else n=Ub++,e="_"+e+"r_"+n.toString(32)+"_";return t.memoizedState=e},useHostTransitionStatus:Am,useFormState:Zg,useActionState:Zg,useOptimistic:function(t){var e=jn();e.memoizedState=e.baseState=t;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return e.queue=n,e=wm.bind(null,mt,!0,n),n.dispatch=e,[t,e]},useMemoCache:Sm,useCacheRefresh:function(){return jn().memoizedState=Bb.bind(null,mt)},useEffectEvent:function(t){var e=jn(),n={impl:t};return e.memoizedState=n,function(){if(Ft&2)throw Error(ye(440));return n.impl.apply(void 0,arguments)}}},Rm={readContext:zn,use:_f,useCallback:Dx,useContext:zn,useEffect:bm,useImperativeHandle:Cx,useInsertionEffect:Ax,useLayoutEffect:wx,useMemo:Nx,useReducer:iu,useRef:Ex,useState:function(){return iu(Ha)},useDebugValue:Em,useDeferredValue:function(t,e){var n=pn();return Ux(n,$t.memoizedState,t,e)},useTransition:function(){var t=iu(Ha)[0],e=pn().memoizedState;return[typeof t=="boolean"?t:Zl(t),e]},useSyncExternalStore:hx,useId:zx,useHostTransitionStatus:Am,useFormState:Kg,useActionState:Kg,useOptimistic:function(t,e){var n=pn();return xx(n,$t,t,e)},useMemoCache:Sm,useCacheRefresh:Ix};Rm.useEffectEvent=Tx;var kx={readContext:zn,use:_f,useCallback:Dx,useContext:zn,useEffect:bm,useImperativeHandle:Cx,useInsertionEffect:Ax,useLayoutEffect:wx,useMemo:Nx,useReducer:Zf,useRef:Ex,useState:function(){return Zf(Ha)},useDebugValue:Em,useDeferredValue:function(t,e){var n=pn();return $t===null?Tm(n,t,e):Ux(n,$t.memoizedState,t,e)},useTransition:function(){var t=Zf(Ha)[0],e=pn().memoizedState;return[typeof t=="boolean"?t:Zl(t),e]},useSyncExternalStore:hx,useId:zx,useHostTransitionStatus:Am,useFormState:$g,useActionState:$g,useOptimistic:function(t,e){var n=pn();return $t!==null?xx(n,$t,t,e):(n.baseState=t,[t,n.queue.dispatch])},useMemoCache:Sm,useCacheRefresh:Ix};kx.useEffectEvent=Tx;function Kf(t,e,n,i){e=t.memoizedState,n=n(i,e),n=n==null?e:on({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var wh={enqueueSetState:function(t,e,n){t=t._reactInternals;var i=_i(),a=gs(i);a.payload=e,n!=null&&(a.callback=n),e=vs(t,a,i),e!==null&&(ai(e,t,i),pl(e,t,i))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var i=_i(),a=gs(i);a.tag=1,a.payload=e,n!=null&&(a.callback=n),e=vs(t,a,i),e!==null&&(ai(e,t,i),pl(e,t,i))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=_i(),i=gs(n);i.tag=2,e!=null&&(i.callback=e),e=vs(t,i,n),e!==null&&(ai(e,t,n),pl(e,t,n))}};function Jg(t,e,n,i,a,s,r){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(i,s,r):e.prototype&&e.prototype.isPureReactComponent?!wl(n,i)||!wl(a,s):!0}function e0(t,e,n,i){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,i),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,i),e.state!==t&&wh.enqueueReplaceState(e,e.state,null)}function nr(t,e){var n=e;if("ref"in e){n={};for(var i in e)i!=="ref"&&(n[i]=e[i])}if(t=t.defaultProps){n===e&&(n=on({},n));for(var a in t)n[a]===void 0&&(n[a]=t[a])}return n}function Vx(t){wu(t)}function Xx(t){console.error(t)}function Wx(t){wu(t)}function zu(t,e){try{var n=t.onUncaughtError;n(e.value,{componentStack:e.stack})}catch(i){setTimeout(function(){throw i})}}function t0(t,e,n){try{var i=t.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:e.tag===1?e.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function Rh(t,e,n){return n=gs(n),n.tag=3,n.payload={element:null},n.callback=function(){zu(t,e)},n}function jx(t){return t=gs(t),t.tag=3,t}function qx(t,e,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;t.payload=function(){return a(s)},t.callback=function(){t0(e,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(t.callback=function(){t0(e,n,i),typeof a!="function"&&(_s===null?_s=new Set([this]):_s.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Hb(t,e,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(e=n.alternate,e!==null&&Ro(e,n,a,!0),n=yi.current,n!==null){switch(n.tag){case 31:case 13:return zi===null?Gu():n.alternate===null&&fn===0&&(fn=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Nu?n.flags|=16384:(e=n.updateQueue,e===null?n.updateQueue=new Set([i]):e.add(i),od(t,i,a)),!1;case 22:return n.flags|=65536,i===Nu?n.flags|=16384:(e=n.updateQueue,e===null?(e={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=e):(n=e.retryQueue,n===null?e.retryQueue=new Set([i]):n.add(i)),od(t,i,a)),!1}throw Error(ye(435,n.tag))}return od(t,i,a),Gu(),!1}if(Lt)return e=yi.current,e!==null?(!(e.flags&65536)&&(e.flags|=256),e.flags|=65536,e.lanes=a,i!==mh&&(t=Error(ye(422),{cause:i}),Cl(Ui(t,n)))):(i!==mh&&(e=Error(ye(423),{cause:i}),Cl(Ui(e,n))),t=t.current.alternate,t.flags|=65536,a&=-a,t.lanes|=a,i=Ui(i,n),a=Rh(t.stateNode,i,a),Yf(t,a),fn!==4&&(fn=2)),!1;var s=Error(ye(520),{cause:i});if(s=Ui(s,n),yl===null?yl=[s]:yl.push(s),fn!==4&&(fn=2),e===null)return!0;i=Ui(i,n),n=e;do{switch(n.tag){case 3:return n.flags|=65536,t=a&-a,n.lanes|=t,t=Rh(n.stateNode,i,t),Yf(n,t),!1;case 1:if(e=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof e.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(_s===null||!_s.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=jx(a),qx(a,t,n,i),Yf(n,a),!1}n=n.return}while(n!==null);return!1}var Cm=Error(ye(461)),xn=!1;function Ln(t,e,n,i){e.child=t===null?ox(e,null,n,i):er(e,t.child,n,i)}function n0(t,e,n,i,a){n=n.render;var s=e.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return Js(e),i=vm(t,e,n,r,s,a),o=_m(),t!==null&&!xn?(xm(t,e,a),Ga(t,e,a)):(Lt&&o&&cm(e),e.flags|=1,Ln(t,e,i,a),e.child)}function i0(t,e,n,i,a){if(t===null){var s=n.type;return typeof s=="function"&&!lm(s)&&s.defaultProps===void 0&&n.compare===null?(e.tag=15,e.type=s,Yx(t,e,s,i,a)):(t=tu(n.type,null,i,e,e.mode,a),t.ref=e.ref,t.return=e,e.child=t)}if(s=t.child,!Dm(t,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:wl,n(r,i)&&t.ref===e.ref)return Ga(t,e,a)}return e.flags|=1,t=La(s,i),t.ref=e.ref,t.return=e,e.child=t}function Yx(t,e,n,i,a){if(t!==null){var s=t.memoizedProps;if(wl(s,i)&&t.ref===e.ref)if(xn=!1,e.pendingProps=i=s,Dm(t,a))t.flags&131072&&(xn=!0);else return e.lanes=t.lanes,Ga(t,e,a)}return Ch(t,e,n,i,a)}function Zx(t,e,n,i){var a=i.children,s=t!==null?t.memoizedState:null;if(t===null&&e.stateNode===null&&(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(e.flags&128){if(s=s!==null?s.baseLanes|n:n,t!==null){for(i=e.child=t.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,e.child=null;return a0(t,e,s,n,i)}if(n&536870912)e.memoizedState={baseLanes:0,cachePool:null},t!==null&&nu(e,s!==null?s.cachePool:null),s!==null?jg(e,s):Mh(),ux(e);else return i=e.lanes=536870912,a0(t,e,s!==null?s.baseLanes|n:n,n,i)}else s!==null?(nu(e,s.cachePool),jg(e,s),as(),e.memoizedState=null):(t!==null&&nu(e,null),Mh(),as());return Ln(t,e,a,n),e.child}function al(t,e){return t!==null&&t.tag===22||e.stateNode!==null||(e.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),e.sibling}function a0(t,e,n,i,a){var s=dm();return s=s===null?null:{parent:_n._currentValue,pool:s},e.memoizedState={baseLanes:n,cachePool:s},t!==null&&nu(e,null),Mh(),ux(e),t!==null&&Ro(t,e,i,!0),e.childLanes=a,null}function su(t,e){return e=Iu({mode:e.mode,children:e.children},t.mode),e.ref=t.ref,t.child=e,e.return=t,e}function s0(t,e,n){return er(e,t.child,null,n),t=su(e,e.pendingProps),t.flags|=2,di(e),e.memoizedState=null,t}function Gb(t,e,n){var i=e.pendingProps,a=(e.flags&128)!==0;if(e.flags&=-129,t===null){if(Lt){if(i.mode==="hidden")return t=su(e,i),e.lanes=536870912,al(null,t);if(bh(e),(t=sn)?(t=Gy(t,Li),t=t!==null&&t.data==="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=ex(t),n.return=e,e.child=n,Pn=e,sn=null)):t=null,t===null)throw Es(e);return e.lanes=536870912,null}return su(e,i)}var s=t.memoizedState;if(s!==null){var r=s.dehydrated;if(bh(e),a)if(e.flags&256)e.flags&=-257,e=s0(t,e,n);else if(e.memoizedState!==null)e.child=t.child,e.flags|=128,e=null;else throw Error(ye(558));else if(xn||Ro(t,e,n,!1),a=(n&t.childLanes)!==0,xn||a){if(i=Jt,i!==null&&(r=A_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,ur(t,r),ai(i,t,r),Cm;Gu(),e=s0(t,e,n)}else t=s.treeContext,sn=Ii(r.nextSibling),Pn=e,Lt=!0,ms=null,Li=!1,t!==null&&nx(e,t),e=su(e,i),e.flags|=4096;return e}return t=La(t.child,{mode:i.mode,children:i.children}),t.ref=e.ref,e.child=t,t.return=e,t}function ru(t,e){var n=e.ref;if(n===null)t!==null&&t.ref!==null&&(e.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(ye(284));(t===null||t.ref!==n)&&(e.flags|=4194816)}}function Ch(t,e,n,i,a){return Js(e),n=vm(t,e,n,i,void 0,a),i=_m(),t!==null&&!xn?(xm(t,e,a),Ga(t,e,a)):(Lt&&i&&cm(e),e.flags|=1,Ln(t,e,n,a),e.child)}function r0(t,e,n,i,a,s){return Js(e),e.updateQueue=null,n=dx(e,i,n,a),fx(t),i=_m(),t!==null&&!xn?(xm(t,e,s),Ga(t,e,s)):(Lt&&i&&cm(e),e.flags|=1,Ln(t,e,n,s),e.child)}function o0(t,e,n,i,a){if(Js(e),e.stateNode===null){var s=jr,r=n.contextType;typeof r=="object"&&r!==null&&(s=zn(r)),s=new n(i,s),e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=wh,e.stateNode=s,s._reactInternals=e,s=e.stateNode,s.props=i,s.state=e.memoizedState,s.refs={},pm(e),r=n.contextType,s.context=typeof r=="object"&&r!==null?zn(r):jr,s.state=e.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(Kf(e,n,r,i),s.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&wh.enqueueReplaceState(s,s.state,null),gl(e,i,s,a),ml(),s.state=e.memoizedState),typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!0}else if(t===null){s=e.stateNode;var o=e.memoizedProps,l=nr(n,o);s.props=l;var c=s.context,d=n.contextType;r=jr,typeof d=="object"&&d!==null&&(r=zn(d));var h=n.getDerivedStateFromProps;d=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=e.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&e0(e,s,i,r),ts=!1;var u=e.memoizedState;s.state=u,gl(e,i,s,a),ml(),c=e.memoizedState,o||u!==c||ts?(typeof h=="function"&&(Kf(e,n,h,i),c=e.memoizedState),(l=ts||Jg(e,n,l,i,u,c,r))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(e.flags|=4194308)):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=i,e.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(e.flags|=4194308),i=!1)}else{s=e.stateNode,yh(t,e),r=e.memoizedProps,d=nr(n,r),s.props=d,h=e.pendingProps,u=s.context,c=n.contextType,l=jr,typeof c=="object"&&c!==null&&(l=zn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==h||u!==l)&&e0(e,s,i,l),ts=!1,u=e.memoizedState,s.state=u,gl(e,i,s,a),ml();var p=e.memoizedState;r!==h||u!==p||ts||t!==null&&t.dependencies!==null&&Du(t.dependencies)?(typeof o=="function"&&(Kf(e,n,o,i),p=e.memoizedState),(d=ts||Jg(e,n,d,i,u,p,l)||t!==null&&t.dependencies!==null&&Du(t.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(e.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),e.memoizedProps=i,e.memoizedState=p),s.props=i,s.state=p,s.context=l,i=d):(typeof s.componentDidUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===t.memoizedProps&&u===t.memoizedState||(e.flags|=1024),i=!1)}return s=i,ru(t,e),i=(e.flags&128)!==0,s||i?(s=e.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),e.flags|=1,t!==null&&i?(e.child=er(e,t.child,null,a),e.child=er(e,null,n,a)):Ln(t,e,n,a),e.memoizedState=s.state,t=e.child):t=Ga(t,e,a),t}function l0(t,e,n,i){return Qs(),e.flags|=256,Ln(t,e,n,i),e.child}var $f={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Qf(t){return{baseLanes:t,cachePool:ax()}}function Jf(t,e,n){return t=t!==null?t.childLanes&~n:0,e&&(t|=pi),t}function Kx(t,e,n){var i=e.pendingProps,a=!1,s=(e.flags&128)!==0,r;if((r=s)||(r=t!==null&&t.memoizedState===null?!1:(hn.current&2)!==0),r&&(a=!0,e.flags&=-129),r=(e.flags&32)!==0,e.flags&=-33,t===null){if(Lt){if(a?is(e):as(),(t=sn)?(t=Gy(t,Li),t=t!==null&&t.data!=="&"?t:null,t!==null&&(e.memoizedState={dehydrated:t,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=ex(t),n.return=e,e.child=n,Pn=e,sn=null)):t=null,t===null)throw Es(e);return Vh(t)?e.lanes=32:e.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(as(),a=e.mode,o=Iu({mode:"hidden",children:o},a),i=qs(i,a,n,null),o.return=e,i.return=e,o.sibling=i,e.child=o,i=e.child,i.memoizedState=Qf(n),i.childLanes=Jf(t,r,n),e.memoizedState=$f,al(null,i)):(is(e),Dh(e,o))}var l=t.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)e.flags&256?(is(e),e.flags&=-257,e=ed(t,e,n)):e.memoizedState!==null?(as(),e.child=t.child,e.flags|=128,e=null):(as(),o=i.fallback,a=e.mode,i=Iu({mode:"visible",children:i.children},a),o=qs(o,a,n,null),o.flags|=2,i.return=e,o.return=e,i.sibling=o,e.child=i,er(e,t.child,null,n),i=e.child,i.memoizedState=Qf(n),i.childLanes=Jf(t,r,n),e.memoizedState=$f,e=al(null,i));else if(is(e),Vh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(ye(419)),i.stack="",i.digest=r,Cl({value:i,source:null,stack:null}),e=ed(t,e,n)}else if(xn||Ro(t,e,n,!1),r=(n&t.childLanes)!==0,xn||r){if(r=Jt,r!==null&&(i=A_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,ur(t,i),ai(r,t,i),Cm;kh(o)||Gu(),e=ed(t,e,n)}else kh(o)?(e.flags|=192,e.child=t.child,e=null):(t=l.treeContext,sn=Ii(o.nextSibling),Pn=e,Lt=!0,ms=null,Li=!1,t!==null&&nx(e,t),e=Dh(e,i.children),e.flags|=4096);return e}return a?(as(),o=i.fallback,a=e.mode,l=t.child,c=l.sibling,i=La(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=La(c,o):(o=qs(o,a,n,null),o.flags|=2),o.return=e,i.return=e,i.sibling=o,e.child=i,al(null,i),i=e.child,o=t.child.memoizedState,o===null?o=Qf(n):(a=o.cachePool,a!==null?(l=_n._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=ax(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Jf(t,r,n),e.memoizedState=$f,al(t.child,i)):(is(e),n=t.child,t=n.sibling,n=La(n,{mode:"visible",children:i.children}),n.return=e,n.sibling=null,t!==null&&(r=e.deletions,r===null?(e.deletions=[t],e.flags|=16):r.push(t)),e.child=n,e.memoizedState=null,n)}function Dh(t,e){return e=Iu({mode:"visible",children:e},t.mode),e.return=t,t.child=e}function Iu(t,e){return t=hi(22,t,null,e),t.lanes=0,t}function ed(t,e,n){return er(e,t.child,null,n),t=Dh(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function c0(t,e,n){t.lanes|=e;var i=t.alternate;i!==null&&(i.lanes|=e),vh(t.return,e,n)}function td(t,e,n,i,a,s){var r=t.memoizedState;r===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=e,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function $x(t,e,n){var i=e.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=hn.current,o=(r&2)!==0;if(o?(r=r&1|2,e.flags|=128):r&=1,tn(hn,r),Ln(t,e,i,n),i=Lt?Rl:0,!o&&t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&c0(t,n,e);else if(t.tag===19)c0(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}switch(a){case"forwards":for(n=e.child,a=null;n!==null;)t=n.alternate,t!==null&&Lu(t)===null&&(a=n),n=n.sibling;n=a,n===null?(a=e.child,e.child=null):(a=n.sibling,n.sibling=null),td(e,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=e.child,e.child=null;a!==null;){if(t=a.alternate,t!==null&&Lu(t)===null){e.child=a;break}t=a.sibling,a.sibling=n,n=a,a=t}td(e,!0,n,null,s,i);break;case"together":td(e,!1,null,null,void 0,i);break;default:e.memoizedState=null}return e.child}function Ga(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),As|=e.lanes,!(n&e.childLanes))if(t!==null){if(Ro(t,e,n,!1),(n&e.childLanes)===0)return null}else return null;if(t!==null&&e.child!==t.child)throw Error(ye(153));if(e.child!==null){for(t=e.child,n=La(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=La(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Dm(t,e){return t.lanes&e?!0:(t=t.dependencies,!!(t!==null&&Du(t)))}function kb(t,e,n){switch(e.tag){case 3:bu(e,e.stateNode.containerInfo),ns(e,_n,t.memoizedState.cache),Qs();break;case 27:case 5:ah(e);break;case 4:bu(e,e.stateNode.containerInfo);break;case 10:ns(e,e.type,e.memoizedProps.value);break;case 31:if(e.memoizedState!==null)return e.flags|=128,bh(e),null;break;case 13:var i=e.memoizedState;if(i!==null)return i.dehydrated!==null?(is(e),e.flags|=128,null):n&e.child.childLanes?Kx(t,e,n):(is(e),t=Ga(t,e,n),t!==null?t.sibling:null);is(e);break;case 19:var a=(t.flags&128)!==0;if(i=(n&e.childLanes)!==0,i||(Ro(t,e,n,!1),i=(n&e.childLanes)!==0),a){if(i)return $x(t,e,n);e.flags|=128}if(a=e.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),tn(hn,hn.current),i)break;return null;case 22:return e.lanes=0,Zx(t,e,n,e.pendingProps);case 24:ns(e,_n,t.memoizedState.cache)}return Ga(t,e,n)}function Qx(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps)xn=!0;else{if(!Dm(t,n)&&!(e.flags&128))return xn=!1,kb(t,e,n);xn=!!(t.flags&131072)}else xn=!1,Lt&&e.flags&1048576&&tx(e,Rl,e.index);switch(e.lanes=0,e.tag){case 16:e:{var i=e.pendingProps;if(t=Fs(e.elementType),e.type=t,typeof t=="function")lm(t)?(i=nr(t,i),e.tag=1,e=o0(null,e,t,i,n)):(e.tag=0,e=Ch(null,e,t,i,n));else{if(t!=null){var a=t.$$typeof;if(a===Yp){e.tag=11,e=n0(null,e,t,i,n);break e}else if(a===Zp){e.tag=14,e=i0(null,e,t,i,n);break e}}throw e=nh(t)||t,Error(ye(306,e,""))}}return e;case 0:return Ch(t,e,e.type,e.pendingProps,n);case 1:return i=e.type,a=nr(i,e.pendingProps),o0(t,e,i,a,n);case 3:e:{if(bu(e,e.stateNode.containerInfo),t===null)throw Error(ye(387));i=e.pendingProps;var s=e.memoizedState;a=s.element,yh(t,e),gl(e,i,null,n);var r=e.memoizedState;if(i=r.cache,ns(e,_n,i),i!==s.cache&&_h(e,[_n],n,!0),ml(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},e.updateQueue.baseState=s,e.memoizedState=s,e.flags&256){e=l0(t,e,i,n);break e}else if(i!==a){a=Ui(Error(ye(424)),e),Cl(a),e=l0(t,e,i,n);break e}else{switch(t=e.stateNode.containerInfo,t.nodeType){case 9:t=t.body;break;default:t=t.nodeName==="HTML"?t.ownerDocument.body:t}for(sn=Ii(t.firstChild),Pn=e,Lt=!0,ms=null,Li=!0,n=ox(e,null,i,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Qs(),i===a){e=Ga(t,e,n);break e}Ln(t,e,i,n)}e=e.child}return e;case 26:return ru(t,e),t===null?(n=C0(e.type,null,e.pendingProps,null))?e.memoizedState=n:Lt||(n=e.type,t=e.pendingProps,i=Wu(ps.current).createElement(n),i[On]=e,i[ri]=t,Fn(i,n,t),wn(i),e.stateNode=i):e.memoizedState=C0(e.type,t.memoizedProps,e.pendingProps,t.memoizedState),null;case 27:return ah(e),t===null&&Lt&&(i=e.stateNode=ky(e.type,e.pendingProps,ps.current),Pn=e,Li=!0,a=sn,Cs(e.type)?(Xh=a,sn=Ii(i.firstChild)):sn=a),Ln(t,e,e.pendingProps.children,n),ru(t,e),t===null&&(e.flags|=4194304),e.child;case 5:return t===null&&Lt&&((a=i=sn)&&(i=_E(i,e.type,e.pendingProps,Li),i!==null?(e.stateNode=i,Pn=e,sn=Ii(i.firstChild),Li=!1,a=!0):a=!1),a||Es(e)),ah(e),a=e.type,s=e.pendingProps,r=t!==null?t.memoizedProps:null,i=s.children,Hh(a,s)?i=null:r!==null&&Hh(a,r)&&(e.flags|=32),e.memoizedState!==null&&(a=vm(t,e,Lb,null,null,n),Pl._currentValue=a),ru(t,e),Ln(t,e,i,n),e.child;case 6:return t===null&&Lt&&((t=n=sn)&&(n=xE(n,e.pendingProps,Li),n!==null?(e.stateNode=n,Pn=e,sn=null,t=!0):t=!1),t||Es(e)),null;case 13:return Kx(t,e,n);case 4:return bu(e,e.stateNode.containerInfo),i=e.pendingProps,t===null?e.child=er(e,null,i,n):Ln(t,e,i,n),e.child;case 11:return n0(t,e,e.type,e.pendingProps,n);case 7:return Ln(t,e,e.pendingProps,n),e.child;case 8:return Ln(t,e,e.pendingProps.children,n),e.child;case 12:return Ln(t,e,e.pendingProps.children,n),e.child;case 10:return i=e.pendingProps,ns(e,e.type,i.value),Ln(t,e,i.children,n),e.child;case 9:return a=e.type._context,i=e.pendingProps.children,Js(e),a=zn(a),i=i(a),e.flags|=1,Ln(t,e,i,n),e.child;case 14:return i0(t,e,e.type,e.pendingProps,n);case 15:return Yx(t,e,e.type,e.pendingProps,n);case 19:return $x(t,e,n);case 31:return Gb(t,e,n);case 22:return Zx(t,e,n,e.pendingProps);case 24:return Js(e),i=zn(_n),t===null?(a=dm(),a===null&&(a=Jt,s=fm(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),e.memoizedState={parent:i,cache:a},pm(e),ns(e,_n,a)):(t.lanes&n&&(yh(t,e),gl(e,null,null,n),ml()),a=t.memoizedState,s=e.memoizedState,a.parent!==i?(a={parent:i,cache:i},e.memoizedState=a,e.lanes===0&&(e.memoizedState=e.updateQueue.baseState=a),ns(e,_n,i)):(i=s.cache,ns(e,_n,i),i!==a.cache&&_h(e,[_n],n,!0))),Ln(t,e,e.pendingProps.children,n),e.child;case 29:throw e.pendingProps}throw Error(ye(156,e.tag))}function ga(t){t.flags|=4}function nd(t,e,n,i,a){if((e=(t.mode&32)!==0)&&(e=!1),e){if(t.flags|=16777216,(a&335544128)===a)if(t.stateNode.complete)t.flags|=8192;else if(My())t.flags|=8192;else throw Zs=Nu,hm}else t.flags&=-16777217}function u0(t,e){if(e.type!=="stylesheet"||e.state.loading&4)t.flags&=-16777217;else if(t.flags|=16777216,!Wy(e))if(My())t.flags|=8192;else throw Zs=Nu,hm}function hc(t,e){e!==null&&(t.flags|=4),t.flags&16384&&(e=t.tag!==22?b_():536870912,t.lanes|=e,mo|=e)}function ko(t,e){if(!Lt)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:i.sibling=null}}function an(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,i=0;if(e)for(var a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=t,a=a.sibling;else for(a=t.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=t,a=a.sibling;return t.subtreeFlags|=i,t.childLanes=n,e}function Vb(t,e,n){var i=e.pendingProps;switch(um(e),e.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(e),null;case 1:return an(e),null;case 3:return n=e.stateNode,i=null,t!==null&&(i=t.memoizedState.cache),e.memoizedState.cache!==i&&(e.flags|=2048),Oa(_n),lo(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(t===null||t.child===null)&&(gr(e)?ga(e):t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,qf())),an(e),null;case 26:var a=e.type,s=e.memoizedState;return t===null?(ga(e),s!==null?(an(e),u0(e,s)):(an(e),nd(e,a,null,i,n))):s?s!==t.memoizedState?(ga(e),an(e),u0(e,s)):(an(e),e.flags&=-16777217):(t=t.memoizedProps,t!==i&&ga(e),an(e),nd(e,a,t,i,n)),null;case 27:if(Eu(e),n=ps.current,a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ga(e);else{if(!i){if(e.stateNode===null)throw Error(ye(166));return an(e),null}t=oa.current,gr(e)?Fg(e):(t=ky(a,i,n),e.stateNode=t,ga(e))}return an(e),null;case 5:if(Eu(e),a=e.type,t!==null&&e.stateNode!=null)t.memoizedProps!==i&&ga(e);else{if(!i){if(e.stateNode===null)throw Error(ye(166));return an(e),null}if(s=oa.current,gr(e))Fg(e);else{var r=Wu(ps.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[On]=e,s[ri]=i;e:for(r=e.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===e)break e;for(;r.sibling===null;){if(r.return===null||r.return===e)break e;r=r.return}r.sibling.return=r.return,r=r.sibling}e.stateNode=s;e:switch(Fn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}i&&ga(e)}}return an(e),nd(e,e.type,t===null?null:t.memoizedProps,e.pendingProps,n),null;case 6:if(t&&e.stateNode!=null)t.memoizedProps!==i&&ga(e);else{if(typeof i!="string"&&e.stateNode===null)throw Error(ye(166));if(t=ps.current,gr(e)){if(t=e.stateNode,n=e.memoizedProps,i=null,a=Pn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}t[On]=e,t=!!(t.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||By(t.nodeValue,n)),t||Es(e,!0)}else t=Wu(t).createTextNode(i),t[On]=e,e.stateNode=t}return an(e),null;case 31:if(n=e.memoizedState,t===null||t.memoizedState!==null){if(i=gr(e),n!==null){if(t===null){if(!i)throw Error(ye(318));if(t=e.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(ye(557));t[On]=e}else Qs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;an(e),t=!1}else n=qf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=n),t=!0;if(!t)return e.flags&256?(di(e),e):(di(e),null);if(e.flags&128)throw Error(ye(558))}return an(e),null;case 13:if(i=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(a=gr(e),i!==null&&i.dehydrated!==null){if(t===null){if(!a)throw Error(ye(318));if(a=e.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(ye(317));a[On]=e}else Qs(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;an(e),a=!1}else a=qf(),t!==null&&t.memoizedState!==null&&(t.memoizedState.hydrationErrors=a),a=!0;if(!a)return e.flags&256?(di(e),e):(di(e),null)}return di(e),e.flags&128?(e.lanes=n,e):(n=i!==null,t=t!==null&&t.memoizedState!==null,n&&(i=e.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==t&&n&&(e.child.flags|=8192),hc(e,e.updateQueue),an(e),null);case 4:return lo(),t===null&&Im(e.stateNode.containerInfo),an(e),null;case 10:return Oa(e.type),an(e),null;case 19:if(Cn(hn),i=e.memoizedState,i===null)return an(e),null;if(a=(e.flags&128)!==0,s=i.rendering,s===null)if(a)ko(i,!1);else{if(fn!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(s=Lu(t),s!==null){for(e.flags|=128,ko(i,!1),t=s.updateQueue,e.updateQueue=t,hc(e,t),e.subtreeFlags=0,t=n,n=e.child;n!==null;)J_(n,t),n=n.sibling;return tn(hn,hn.current&1|2),Lt&&Aa(e,i.treeForkCount),e.child}t=t.sibling}i.tail!==null&&mi()>Fu&&(e.flags|=128,a=!0,ko(i,!1),e.lanes=4194304)}else{if(!a)if(t=Lu(s),t!==null){if(e.flags|=128,a=!0,t=t.updateQueue,e.updateQueue=t,hc(e,t),ko(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Lt)return an(e),null}else 2*mi()-i.renderingStartTime>Fu&&n!==536870912&&(e.flags|=128,a=!0,ko(i,!1),e.lanes=4194304);i.isBackwards?(s.sibling=e.child,e.child=s):(t=i.last,t!==null?t.sibling=s:e.child=s,i.last=s)}return i.tail!==null?(t=i.tail,i.rendering=t,i.tail=t.sibling,i.renderingStartTime=mi(),t.sibling=null,n=hn.current,tn(hn,a?n&1|2:n&1),Lt&&Aa(e,i.treeForkCount),t):(an(e),null);case 22:case 23:return di(e),mm(),i=e.memoizedState!==null,t!==null?t.memoizedState!==null!==i&&(e.flags|=8192):i&&(e.flags|=8192),i?n&536870912&&!(e.flags&128)&&(an(e),e.subtreeFlags&6&&(e.flags|=8192)):an(e),n=e.updateQueue,n!==null&&hc(e,n.retryQueue),n=null,t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),i=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(i=e.memoizedState.cachePool.pool),i!==n&&(e.flags|=2048),t!==null&&Cn(Ys),null;case 24:return n=null,t!==null&&(n=t.memoizedState.cache),e.memoizedState.cache!==n&&(e.flags|=2048),Oa(_n),an(e),null;case 25:return null;case 30:return null}throw Error(ye(156,e.tag))}function Xb(t,e){switch(um(e),e.tag){case 1:return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Oa(_n),lo(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 26:case 27:case 5:return Eu(e),null;case 31:if(e.memoizedState!==null){if(di(e),e.alternate===null)throw Error(ye(340));Qs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 13:if(di(e),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(ye(340));Qs()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Cn(hn),null;case 4:return lo(),null;case 10:return Oa(e.type),null;case 22:case 23:return di(e),mm(),t!==null&&Cn(Ys),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 24:return Oa(_n),null;case 25:return null;default:return null}}function Jx(t,e){switch(um(e),e.tag){case 3:Oa(_n),lo();break;case 26:case 27:case 5:Eu(e);break;case 4:lo();break;case 31:e.memoizedState!==null&&di(e);break;case 13:di(e);break;case 19:Cn(hn);break;case 10:Oa(e.type);break;case 22:case 23:di(e),mm(),t!==null&&Cn(Ys);break;case 24:Oa(_n)}}function Kl(t,e){try{var n=e.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&t)===t){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){qt(e,e.return,o)}}function Ts(t,e,n){try{var i=e.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&t)===t){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=e;var l=n,c=o;try{c()}catch(d){qt(a,l,d)}}}i=i.next}while(i!==s)}}catch(d){qt(e,e.return,d)}}function ey(t){var e=t.updateQueue;if(e!==null){var n=t.stateNode;try{cx(e,n)}catch(i){qt(t,t.return,i)}}}function ty(t,e,n){n.props=nr(t.type,t.memoizedProps),n.state=t.memoizedState;try{n.componentWillUnmount()}catch(i){qt(t,e,i)}}function _l(t,e){try{var n=t.ref;if(n!==null){switch(t.tag){case 26:case 27:case 5:var i=t.stateNode;break;case 30:i=t.stateNode;break;default:i=t.stateNode}typeof n=="function"?t.refCleanup=n(i):n.current=i}}catch(a){qt(t,e,a)}}function sa(t,e){var n=t.ref,i=t.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){qt(t,e,a)}finally{t.refCleanup=null,t=t.alternate,t!=null&&(t.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){qt(t,e,a)}else n.current=null}function ny(t){var e=t.type,n=t.memoizedProps,i=t.stateNode;try{e:switch(e){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break e;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){qt(t,t.return,a)}}function id(t,e,n){try{var i=t.stateNode;dE(i,t.type,n,e),i[ri]=e}catch(a){qt(t,t.return,a)}}function iy(t){return t.tag===5||t.tag===3||t.tag===26||t.tag===27&&Cs(t.type)||t.tag===4}function ad(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||iy(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.tag===27&&Cs(t.type)||t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Nh(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(t,e):(e=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,e.appendChild(t),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=Da));else if(i!==4&&(i===27&&Cs(t.type)&&(n=t.stateNode,e=null),t=t.child,t!==null))for(Nh(t,e,n),t=t.sibling;t!==null;)Nh(t,e,n),t=t.sibling}function Bu(t,e,n){var i=t.tag;if(i===5||i===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(i!==4&&(i===27&&Cs(t.type)&&(n=t.stateNode),t=t.child,t!==null))for(Bu(t,e,n),t=t.sibling;t!==null;)Bu(t,e,n),t=t.sibling}function ay(t){var e=t.stateNode,n=t.memoizedProps;try{for(var i=t.type,a=e.attributes;a.length;)e.removeAttributeNode(a[0]);Fn(e,i,n),e[On]=t,e[ri]=n}catch(s){qt(t,t.return,s)}}var wa=!1,vn=!1,sd=!1,f0=typeof WeakSet=="function"?WeakSet:Set,An=null;function Wb(t,e){if(t=t.containerInfo,Bh=Zu,t=W_(t),sm(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var r=0,o=-1,l=-1,c=0,d=0,h=t,u=null;t:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=r+a),h!==s||i!==0&&h.nodeType!==3||(l=r+i),h.nodeType===3&&(r+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===t)break t;if(u===n&&++c===a&&(o=r),u===s&&++d===i&&(l=r),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Fh={focusedElem:t,selectionRange:n},Zu=!1,An=e;An!==null;)if(e=An,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,An=t;else for(;An!==null;){switch(e=An,s=e.alternate,t=e.flags,e.tag){case 0:if(t&4&&(t=e.updateQueue,t=t!==null?t.events:null,t!==null))for(n=0;n<t.length;n++)a=t[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(t&1024&&s!==null){t=void 0,n=e,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=nr(n.type,a);t=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=t}catch(E){qt(n,n.return,E)}}break;case 3:if(t&1024){if(t=e.stateNode.containerInfo,n=t.nodeType,n===9)Gh(t);else if(n===1)switch(t.nodeName){case"HEAD":case"HTML":case"BODY":Gh(t);break;default:t.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(t&1024)throw Error(ye(163))}if(t=e.sibling,t!==null){t.return=e.return,An=t;break}An=e.return}}function sy(t,e,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:_a(t,n),i&4&&Kl(5,n);break;case 1:if(_a(t,n),i&4)if(t=n.stateNode,e===null)try{t.componentDidMount()}catch(r){qt(n,n.return,r)}else{var a=nr(n.type,e.memoizedProps);e=e.memoizedState;try{t.componentDidUpdate(a,e,t.__reactInternalSnapshotBeforeUpdate)}catch(r){qt(n,n.return,r)}}i&64&&ey(n),i&512&&_l(n,n.return);break;case 3:if(_a(t,n),i&64&&(t=n.updateQueue,t!==null)){if(e=null,n.child!==null)switch(n.child.tag){case 27:case 5:e=n.child.stateNode;break;case 1:e=n.child.stateNode}try{cx(t,e)}catch(r){qt(n,n.return,r)}}break;case 27:e===null&&i&4&&ay(n);case 26:case 5:_a(t,n),e===null&&i&4&&ny(n),i&512&&_l(n,n.return);break;case 12:_a(t,n);break;case 31:_a(t,n),i&4&&ly(t,n);break;case 13:_a(t,n),i&4&&cy(t,n),i&64&&(t=n.memoizedState,t!==null&&(t=t.dehydrated,t!==null&&(n=eE.bind(null,n),yE(t,n))));break;case 22:if(i=n.memoizedState!==null||wa,!i){e=e!==null&&e.memoizedState!==null||vn,a=wa;var s=vn;wa=i,(vn=e)&&!s?Ea(t,n,(n.subtreeFlags&8772)!==0):_a(t,n),wa=a,vn=s}break;case 30:break;default:_a(t,n)}}function ry(t){var e=t.alternate;e!==null&&(t.alternate=null,ry(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&Jp(e)),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}var ln=null,ni=!1;function va(t,e,n){for(n=n.child;n!==null;)oy(t,e,n),n=n.sibling}function oy(t,e,n){if(gi&&typeof gi.onCommitFiberUnmount=="function")try{gi.onCommitFiberUnmount(Vl,n)}catch{}switch(n.tag){case 26:vn||sa(n,e),va(t,e,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:vn||sa(n,e);var i=ln,a=ni;Cs(n.type)&&(ln=n.stateNode,ni=!1),va(t,e,n),Ml(n.stateNode),ln=i,ni=a;break;case 5:vn||sa(n,e);case 6:if(i=ln,a=ni,ln=null,va(t,e,n),ln=i,ni=a,ln!==null)if(ni)try{(ln.nodeType===9?ln.body:ln.nodeName==="HTML"?ln.ownerDocument.body:ln).removeChild(n.stateNode)}catch(s){qt(n,e,s)}else try{ln.removeChild(n.stateNode)}catch(s){qt(n,e,s)}break;case 18:ln!==null&&(ni?(t=ln,E0(t.nodeType===9?t.body:t.nodeName==="HTML"?t.ownerDocument.body:t,n.stateNode),xo(t)):E0(ln,n.stateNode));break;case 4:i=ln,a=ni,ln=n.stateNode.containerInfo,ni=!0,va(t,e,n),ln=i,ni=a;break;case 0:case 11:case 14:case 15:Ts(2,n,e),vn||Ts(4,n,e),va(t,e,n);break;case 1:vn||(sa(n,e),i=n.stateNode,typeof i.componentWillUnmount=="function"&&ty(n,e,i)),va(t,e,n);break;case 21:va(t,e,n);break;case 22:vn=(i=vn)||n.memoizedState!==null,va(t,e,n),vn=i;break;default:va(t,e,n)}}function ly(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null))){t=t.dehydrated;try{xo(t)}catch(n){qt(e,e.return,n)}}}function cy(t,e){if(e.memoizedState===null&&(t=e.alternate,t!==null&&(t=t.memoizedState,t!==null&&(t=t.dehydrated,t!==null))))try{xo(t)}catch(n){qt(e,e.return,n)}}function jb(t){switch(t.tag){case 31:case 13:case 19:var e=t.stateNode;return e===null&&(e=t.stateNode=new f0),e;case 22:return t=t.stateNode,e=t._retryCache,e===null&&(e=t._retryCache=new f0),e;default:throw Error(ye(435,t.tag))}}function pc(t,e){var n=jb(t);e.forEach(function(i){if(!n.has(i)){n.add(i);var a=tE.bind(null,t,i);i.then(a,a)}})}function Jn(t,e){var n=e.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=t,r=e,o=r;e:for(;o!==null;){switch(o.tag){case 27:if(Cs(o.type)){ln=o.stateNode,ni=!1;break e}break;case 5:ln=o.stateNode,ni=!1;break e;case 3:case 4:ln=o.stateNode.containerInfo,ni=!0;break e}o=o.return}if(ln===null)throw Error(ye(160));oy(s,r,a),ln=null,ni=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(e.subtreeFlags&13886)for(e=e.child;e!==null;)uy(e,t),e=e.sibling}var qi=null;function uy(t,e){var n=t.alternate,i=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:Jn(e,t),ei(t),i&4&&(Ts(3,t,t.return),Kl(3,t),Ts(5,t,t.return));break;case 1:Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),i&64&&wa&&(t=t.updateQueue,t!==null&&(i=t.callbacks,i!==null&&(n=t.shared.hiddenCallbacks,t.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=qi;if(Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=t.memoizedState,n===null)if(i===null)if(t.stateNode===null){e:{i=t.type,n=t.memoizedProps,a=a.ownerDocument||a;t:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[jl]||s[On]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),Fn(s,i,n),s[On]=t,wn(s),i=s;break e;case"link":var r=N0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break t}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;case"meta":if(r=N0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break t}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;default:throw Error(ye(468,i))}s[On]=t,wn(s),i=s}t.stateNode=i}else U0(a,t.type,t.stateNode);else t.stateNode=D0(a,i,t.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?U0(a,t.type,t.stateNode):D0(a,i,t.memoizedProps)):i===null&&t.stateNode!==null&&id(t,t.memoizedProps,n.memoizedProps)}break;case 27:Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),n!==null&&i&4&&id(t,t.memoizedProps,n.memoizedProps);break;case 5:if(Jn(e,t),ei(t),i&512&&(vn||n===null||sa(n,n.return)),t.flags&32){a=t.stateNode;try{uo(a,"")}catch(g){qt(t,t.return,g)}}i&4&&t.stateNode!=null&&(a=t.memoizedProps,id(t,a,n!==null?n.memoizedProps:a)),i&1024&&(sd=!0);break;case 6:if(Jn(e,t),ei(t),i&4){if(t.stateNode===null)throw Error(ye(162));i=t.memoizedProps,n=t.stateNode;try{n.nodeValue=i}catch(g){qt(t,t.return,g)}}break;case 3:if(cu=null,a=qi,qi=ju(e.containerInfo),Jn(e,t),qi=a,ei(t),i&4&&n!==null&&n.memoizedState.isDehydrated)try{xo(e.containerInfo)}catch(g){qt(t,t.return,g)}sd&&(sd=!1,fy(t));break;case 4:i=qi,qi=ju(t.stateNode.containerInfo),Jn(e,t),ei(t),qi=i;break;case 12:Jn(e,t),ei(t);break;case 31:Jn(e,t),ei(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,pc(t,i)));break;case 13:Jn(e,t),ei(t),t.child.flags&8192&&t.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(Sf=mi()),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,pc(t,i)));break;case 22:a=t.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=wa,d=vn;if(wa=c||a,vn=d||l,Jn(e,t),vn=d,wa=c,ei(t),i&8192)e:for(e=t.stateNode,e._visibility=a?e._visibility&-2:e._visibility|1,a&&(n===null||l||wa||vn||Hs(t)),n=null,e=t;;){if(e.tag===5||e.tag===26){if(n===null){l=n=e;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,u=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){qt(l,l.return,g)}}}else if(e.tag===6){if(n===null){l=e;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){qt(l,l.return,g)}}}else if(e.tag===18){if(n===null){l=e;try{var p=l.stateNode;a?T0(p,!0):T0(l.stateNode,!1)}catch(g){qt(l,l.return,g)}}}else if((e.tag!==22&&e.tag!==23||e.memoizedState===null||e===t)&&e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;n===e&&(n=null),e=e.return}n===e&&(n=null),e.sibling.return=e.return,e=e.sibling}i&4&&(i=t.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,pc(t,n))));break;case 19:Jn(e,t),ei(t),i&4&&(i=t.updateQueue,i!==null&&(t.updateQueue=null,pc(t,i)));break;case 30:break;case 21:break;default:Jn(e,t),ei(t)}}function ei(t){var e=t.flags;if(e&2){try{for(var n,i=t.return;i!==null;){if(iy(i)){n=i;break}i=i.return}if(n==null)throw Error(ye(160));switch(n.tag){case 27:var a=n.stateNode,s=ad(t);Bu(t,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(uo(r,""),n.flags&=-33);var o=ad(t);Bu(t,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=ad(t);Nh(t,c,l);break;default:throw Error(ye(161))}}catch(d){qt(t,t.return,d)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function fy(t){if(t.subtreeFlags&1024)for(t=t.child;t!==null;){var e=t;fy(e),e.tag===5&&e.flags&1024&&e.stateNode.reset(),t=t.sibling}}function _a(t,e){if(e.subtreeFlags&8772)for(e=e.child;e!==null;)sy(t,e.alternate,e),e=e.sibling}function Hs(t){for(t=t.child;t!==null;){var e=t;switch(e.tag){case 0:case 11:case 14:case 15:Ts(4,e,e.return),Hs(e);break;case 1:sa(e,e.return);var n=e.stateNode;typeof n.componentWillUnmount=="function"&&ty(e,e.return,n),Hs(e);break;case 27:Ml(e.stateNode);case 26:case 5:sa(e,e.return),Hs(e);break;case 22:e.memoizedState===null&&Hs(e);break;case 30:Hs(e);break;default:Hs(e)}t=t.sibling}}function Ea(t,e,n){for(n=n&&(e.subtreeFlags&8772)!==0,e=e.child;e!==null;){var i=e.alternate,a=t,s=e,r=s.flags;switch(s.tag){case 0:case 11:case 15:Ea(a,s,n),Kl(4,s);break;case 1:if(Ea(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){qt(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)lx(l[a],o)}catch(c){qt(i,i.return,c)}}n&&r&64&&ey(s),_l(s,s.return);break;case 27:ay(s);case 26:case 5:Ea(a,s,n),n&&i===null&&r&4&&ny(s),_l(s,s.return);break;case 12:Ea(a,s,n);break;case 31:Ea(a,s,n),n&&r&4&&ly(a,s);break;case 13:Ea(a,s,n),n&&r&4&&cy(a,s);break;case 22:s.memoizedState===null&&Ea(a,s,n),_l(s,s.return);break;case 30:break;default:Ea(a,s,n)}e=e.sibling}}function Nm(t,e){var n=null;t!==null&&t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(n=t.memoizedState.cachePool.pool),t=null,e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(t=e.memoizedState.cachePool.pool),t!==n&&(t!=null&&t.refCount++,n!=null&&Yl(n))}function Um(t,e){t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Yl(t))}function Vi(t,e,n,i){if(e.subtreeFlags&10256)for(e=e.child;e!==null;)dy(t,e,n,i),e=e.sibling}function dy(t,e,n,i){var a=e.flags;switch(e.tag){case 0:case 11:case 15:Vi(t,e,n,i),a&2048&&Kl(9,e);break;case 1:Vi(t,e,n,i);break;case 3:Vi(t,e,n,i),a&2048&&(t=null,e.alternate!==null&&(t=e.alternate.memoizedState.cache),e=e.memoizedState.cache,e!==t&&(e.refCount++,t!=null&&Yl(t)));break;case 12:if(a&2048){Vi(t,e,n,i),t=e.stateNode;try{var s=e.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,e.alternate===null?"mount":"update",t.passiveEffectDuration,-0)}catch(l){qt(e,e.return,l)}}else Vi(t,e,n,i);break;case 31:Vi(t,e,n,i);break;case 13:Vi(t,e,n,i);break;case 23:break;case 22:s=e.stateNode,r=e.alternate,e.memoizedState!==null?s._visibility&2?Vi(t,e,n,i):xl(t,e):s._visibility&2?Vi(t,e,n,i):(s._visibility|=2,zr(t,e,n,i,(e.subtreeFlags&10256)!==0||!1)),a&2048&&Nm(r,e);break;case 24:Vi(t,e,n,i),a&2048&&Um(e.alternate,e);break;default:Vi(t,e,n,i)}}function zr(t,e,n,i,a){for(a=a&&((e.subtreeFlags&10256)!==0||!1),e=e.child;e!==null;){var s=t,r=e,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:zr(s,r,o,l,a),Kl(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?zr(s,r,o,l,a):xl(s,r):(d._visibility|=2,zr(s,r,o,l,a)),a&&c&2048&&Nm(r.alternate,r);break;case 24:zr(s,r,o,l,a),a&&c&2048&&Um(r.alternate,r);break;default:zr(s,r,o,l,a)}e=e.sibling}}function xl(t,e){if(e.subtreeFlags&10256)for(e=e.child;e!==null;){var n=t,i=e,a=i.flags;switch(i.tag){case 22:xl(n,i),a&2048&&Nm(i.alternate,i);break;case 24:xl(n,i),a&2048&&Um(i.alternate,i);break;default:xl(n,i)}e=e.sibling}}var sl=8192;function vr(t,e,n){if(t.subtreeFlags&sl)for(t=t.child;t!==null;)hy(t,e,n),t=t.sibling}function hy(t,e,n){switch(t.tag){case 26:vr(t,e,n),t.flags&sl&&t.memoizedState!==null&&UE(n,qi,t.memoizedState,t.memoizedProps);break;case 5:vr(t,e,n);break;case 3:case 4:var i=qi;qi=ju(t.stateNode.containerInfo),vr(t,e,n),qi=i;break;case 22:t.memoizedState===null&&(i=t.alternate,i!==null&&i.memoizedState!==null?(i=sl,sl=16777216,vr(t,e,n),sl=i):vr(t,e,n));break;default:vr(t,e,n)}}function py(t){var e=t.alternate;if(e!==null&&(t=e.child,t!==null)){e.child=null;do e=t.sibling,t.sibling=null,t=e;while(t!==null)}}function Vo(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];An=i,gy(i,t)}py(t)}if(t.subtreeFlags&10256)for(t=t.child;t!==null;)my(t),t=t.sibling}function my(t){switch(t.tag){case 0:case 11:case 15:Vo(t),t.flags&2048&&Ts(9,t,t.return);break;case 3:Vo(t);break;case 12:Vo(t);break;case 22:var e=t.stateNode;t.memoizedState!==null&&e._visibility&2&&(t.return===null||t.return.tag!==13)?(e._visibility&=-3,ou(t)):Vo(t);break;default:Vo(t)}}function ou(t){var e=t.deletions;if(t.flags&16){if(e!==null)for(var n=0;n<e.length;n++){var i=e[n];An=i,gy(i,t)}py(t)}for(t=t.child;t!==null;){switch(e=t,e.tag){case 0:case 11:case 15:Ts(8,e,e.return),ou(e);break;case 22:n=e.stateNode,n._visibility&2&&(n._visibility&=-3,ou(e));break;default:ou(e)}t=t.sibling}}function gy(t,e){for(;An!==null;){var n=An;switch(n.tag){case 0:case 11:case 15:Ts(8,n,e);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Yl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,An=i;else e:for(n=t;An!==null;){i=An;var a=i.sibling,s=i.return;if(ry(i),i===n){An=null;break e}if(a!==null){a.return=s,An=a;break e}An=s}}}var qb={getCacheForType:function(t){var e=zn(_n),n=e.data.get(t);return n===void 0&&(n=t(),e.data.set(t,n)),n},cacheSignal:function(){return zn(_n).controller.signal}},Yb=typeof WeakMap=="function"?WeakMap:Map,Ft=0,Jt=null,Tt=null,Ct=0,jt=0,fi=null,cs=!1,Do=!1,Lm=!1,ka=0,fn=0,As=0,Ks=0,Om=0,pi=0,mo=0,yl=null,ii=null,Uh=!1,Sf=0,vy=0,Fu=1/0,Hu=null,_s=null,yn=0,xs=null,go=null,Pa=0,Lh=0,Oh=null,_y=null,Sl=0,Ph=null;function _i(){return Ft&2&&Ct!==0?Ct&-Ct:ot.T!==null?zm():w_()}function xy(){if(pi===0)if(!(Ct&536870912)||Lt){var t=rc;rc<<=1,!(rc&3932160)&&(rc=262144),pi=t}else pi=536870912;return t=yi.current,t!==null&&(t.flags|=32),pi}function ai(t,e,n){(t===Jt&&(jt===2||jt===9)||t.cancelPendingCommit!==null)&&(vo(t,0),us(t,Ct,pi,!1)),Wl(t,n),(!(Ft&2)||t!==Jt)&&(t===Jt&&(!(Ft&2)&&(Ks|=n),fn===4&&us(t,Ct,pi,!1)),da(t))}function yy(t,e,n){if(Ft&6)throw Error(ye(327));var i=!n&&(e&127)===0&&(e&t.expiredLanes)===0||Xl(t,e),a=i?$b(t,e):rd(t,e,!0),s=i;do{if(a===0){Do&&!i&&us(t,e,0,!1);break}else{if(n=t.current.alternate,s&&!Zb(n)){a=rd(t,e,!1),s=!1;continue}if(a===2){if(s=e,t.errorRecoveryDisabledLanes&s)var r=0;else r=t.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){e=r;e:{var o=t;a=yl;var l=o.current.memoizedState.isDehydrated;if(l&&(vo(o,r).flags|=256),r=rd(o,r,!1),r!==2){if(Lm&&!l){o.errorRecoveryDisabledLanes|=s,Ks|=s,a=4;break e}s=ii,ii=a,s!==null&&(ii===null?ii=s:ii.push.apply(ii,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){vo(t,0),us(t,e,0,!0);break}e:{switch(i=t,s=a,s){case 0:case 1:throw Error(ye(345));case 4:if((e&4194048)!==e)break;case 6:us(i,e,pi,!cs);break e;case 2:ii=null;break;case 3:case 5:break;default:throw Error(ye(329))}if((e&62914560)===e&&(a=Sf+300-mi(),10<a)){if(us(i,e,pi,!cs),uf(i,0,!0)!==0)break e;Pa=e,i.timeoutHandle=Hy(d0.bind(null,i,n,ii,Hu,Uh,e,pi,Ks,mo,cs,s,"Throttled",-0,0),a);break e}d0(i,n,ii,Hu,Uh,e,pi,Ks,mo,cs,s,null,-0,0)}}break}while(!0);da(t)}function d0(t,e,n,i,a,s,r,o,l,c,d,h,u,p){if(t.timeoutHandle=-1,h=e.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Da},hy(e,s,h);var g=(s&62914560)===s?Sf-mi():(s&4194048)===s?vy-mi():0;if(g=LE(h,g),g!==null){Pa=s,t.cancelPendingCommit=g(p0.bind(null,t,e,s,n,i,a,r,o,l,d,h,null,u,p)),us(t,s,r,!c);return}}p0(t,e,s,n,i,a,r,o,l)}function Zb(t){for(var e=t;;){var n=e.tag;if((n===0||n===11||n===15)&&e.flags&16384&&(n=e.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!xi(s(),a))return!1}catch{return!1}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function us(t,e,n,i){e&=~Om,e&=~Ks,t.suspendedLanes|=e,t.pingedLanes&=~e,i&&(t.warmLanes|=e),i=t.expirationTimes;for(var a=e;0<a;){var s=31-vi(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&E_(t,n,e)}function Mf(){return Ft&6?!0:($l(0),!1)}function Pm(){if(Tt!==null){if(jt===0)var t=Tt.return;else t=Tt,Na=fr=null,ym(t),io=null,Dl=0,t=Tt;for(;t!==null;)Jx(t.alternate,t),t=t.return;Tt=null}}function vo(t,e){var n=t.timeoutHandle;n!==-1&&(t.timeoutHandle=-1,mE(n)),n=t.cancelPendingCommit,n!==null&&(t.cancelPendingCommit=null,n()),Pa=0,Pm(),Jt=t,Tt=n=La(t.current,null),Ct=e,jt=0,fi=null,cs=!1,Do=Xl(t,e),Lm=!1,mo=pi=Om=Ks=As=fn=0,ii=yl=null,Uh=!1,e&8&&(e|=e&32);var i=t.entangledLanes;if(i!==0)for(t=t.entanglements,i&=e;0<i;){var a=31-vi(i),s=1<<a;e|=t[a],i&=~s}return ka=e,pf(),n}function Sy(t,e){mt=null,ot.H=Ul,e===Co||e===gf?(e=Xg(),jt=3):e===hm?(e=Xg(),jt=4):jt=e===Cm?8:e!==null&&typeof e=="object"&&typeof e.then=="function"?6:1,fi=e,Tt===null&&(fn=1,zu(t,Ui(e,t.current)))}function My(){var t=yi.current;return t===null?!0:(Ct&4194048)===Ct?zi===null:(Ct&62914560)===Ct||Ct&536870912?t===zi:!1}function by(){var t=ot.H;return ot.H=Ul,t===null?Ul:t}function Ey(){var t=ot.A;return ot.A=qb,t}function Gu(){fn=4,cs||(Ct&4194048)!==Ct&&yi.current!==null||(Do=!0),!(As&134217727)&&!(Ks&134217727)||Jt===null||us(Jt,Ct,pi,!1)}function rd(t,e,n){var i=Ft;Ft|=2;var a=by(),s=Ey();(Jt!==t||Ct!==e)&&(Hu=null,vo(t,e)),e=!1;var r=fn;e:do try{if(jt!==0&&Tt!==null){var o=Tt,l=fi;switch(jt){case 8:Pm(),r=6;break e;case 3:case 2:case 9:case 6:yi.current===null&&(e=!0);var c=jt;if(jt=0,fi=null,Zr(t,o,l,c),n&&Do){r=0;break e}break;default:c=jt,jt=0,fi=null,Zr(t,o,l,c)}}Kb(),r=fn;break}catch(d){Sy(t,d)}while(!0);return e&&t.shellSuspendCounter++,Na=fr=null,Ft=i,ot.H=a,ot.A=s,Tt===null&&(Jt=null,Ct=0,pf()),r}function Kb(){for(;Tt!==null;)Ty(Tt)}function $b(t,e){var n=Ft;Ft|=2;var i=by(),a=Ey();Jt!==t||Ct!==e?(Hu=null,Fu=mi()+500,vo(t,e)):Do=Xl(t,e);e:do try{if(jt!==0&&Tt!==null){e=Tt;var s=fi;t:switch(jt){case 1:jt=0,fi=null,Zr(t,e,s,1);break;case 2:case 9:if(Vg(s)){jt=0,fi=null,h0(e);break}e=function(){jt!==2&&jt!==9||Jt!==t||(jt=7),da(t)},s.then(e,e);break e;case 3:jt=7;break e;case 4:jt=5;break e;case 7:Vg(s)?(jt=0,fi=null,h0(e)):(jt=0,fi=null,Zr(t,e,s,7));break;case 5:var r=null;switch(Tt.tag){case 26:r=Tt.memoizedState;case 5:case 27:var o=Tt;if(r?Wy(r):o.stateNode.complete){jt=0,fi=null;var l=o.sibling;if(l!==null)Tt=l;else{var c=o.return;c!==null?(Tt=c,bf(c)):Tt=null}break t}}jt=0,fi=null,Zr(t,e,s,5);break;case 6:jt=0,fi=null,Zr(t,e,s,6);break;case 8:Pm(),fn=6;break e;default:throw Error(ye(462))}}Qb();break}catch(d){Sy(t,d)}while(!0);return Na=fr=null,ot.H=i,ot.A=a,Ft=n,Tt!==null?0:(Jt=null,Ct=0,pf(),fn)}function Qb(){for(;Tt!==null&&!SM();)Ty(Tt)}function Ty(t){var e=Qx(t.alternate,t,ka);t.memoizedProps=t.pendingProps,e===null?bf(t):Tt=e}function h0(t){var e=t,n=e.alternate;switch(e.tag){case 15:case 0:e=r0(n,e,e.pendingProps,e.type,void 0,Ct);break;case 11:e=r0(n,e,e.pendingProps,e.type.render,e.ref,Ct);break;case 5:ym(e);default:Jx(n,e),e=Tt=J_(e,ka),e=Qx(n,e,ka)}t.memoizedProps=t.pendingProps,e===null?bf(t):Tt=e}function Zr(t,e,n,i){Na=fr=null,ym(e),io=null,Dl=0;var a=e.return;try{if(Hb(t,a,e,n,Ct)){fn=1,zu(t,Ui(n,t.current)),Tt=null;return}}catch(s){if(a!==null)throw Tt=a,s;fn=1,zu(t,Ui(n,t.current)),Tt=null;return}e.flags&32768?(Lt||i===1?t=!0:Do||Ct&536870912?t=!1:(cs=t=!0,(i===2||i===9||i===3||i===6)&&(i=yi.current,i!==null&&i.tag===13&&(i.flags|=16384))),Ay(e,t)):bf(e)}function bf(t){var e=t;do{if(e.flags&32768){Ay(e,cs);return}t=e.return;var n=Vb(e.alternate,e,ka);if(n!==null){Tt=n;return}if(e=e.sibling,e!==null){Tt=e;return}Tt=e=t}while(e!==null);fn===0&&(fn=5)}function Ay(t,e){do{var n=Xb(t.alternate,t);if(n!==null){n.flags&=32767,Tt=n;return}if(n=t.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!e&&(t=t.sibling,t!==null)){Tt=t;return}Tt=t=n}while(t!==null);fn=6,Tt=null}function p0(t,e,n,i,a,s,r,o,l){t.cancelPendingCommit=null;do Ef();while(yn!==0);if(Ft&6)throw Error(ye(327));if(e!==null){if(e===t.current)throw Error(ye(177));if(s=e.lanes|e.childLanes,s|=rm,NM(t,n,s,r,o,l),t===Jt&&(Tt=Jt=null,Ct=0),go=e,xs=t,Pa=n,Lh=s,Oh=a,_y=i,e.subtreeFlags&10256||e.flags&10256?(t.callbackNode=null,t.callbackPriority=0,nE(Tu,function(){return Ny(),null})):(t.callbackNode=null,t.callbackPriority=0),i=(e.flags&13878)!==0,e.subtreeFlags&13878||i){i=ot.T,ot.T=null,a=Ht.p,Ht.p=2,r=Ft,Ft|=4;try{Wb(t,e,n)}finally{Ft=r,Ht.p=a,ot.T=i}}yn=1,wy(),Ry(),Cy()}}function wy(){if(yn===1){yn=0;var t=xs,e=go,n=(e.flags&13878)!==0;if(e.subtreeFlags&13878||n){n=ot.T,ot.T=null;var i=Ht.p;Ht.p=2;var a=Ft;Ft|=4;try{uy(e,t);var s=Fh,r=W_(t.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&X_(o.ownerDocument.documentElement,o)){if(l!==null&&sm(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var h=o.ownerDocument||document,u=h&&h.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,E=Math.min(l.start,g),m=l.end===void 0?E:Math.min(l.end,g);!p.extend&&E>m&&(r=m,m=E,E=r);var f=zg(o,E),x=zg(o,m);if(f&&x&&(p.rangeCount!==1||p.anchorNode!==f.node||p.anchorOffset!==f.offset||p.focusNode!==x.node||p.focusOffset!==x.offset)){var S=h.createRange();S.setStart(f.node,f.offset),p.removeAllRanges(),E>m?(p.addRange(S),p.extend(x.node,x.offset)):(S.setEnd(x.node,x.offset),p.addRange(S))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var y=h[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}Zu=!!Bh,Fh=Bh=null}finally{Ft=a,Ht.p=i,ot.T=n}}t.current=e,yn=2}}function Ry(){if(yn===2){yn=0;var t=xs,e=go,n=(e.flags&8772)!==0;if(e.subtreeFlags&8772||n){n=ot.T,ot.T=null;var i=Ht.p;Ht.p=2;var a=Ft;Ft|=4;try{sy(t,e.alternate,e)}finally{Ft=a,Ht.p=i,ot.T=n}}yn=3}}function Cy(){if(yn===4||yn===3){yn=0,MM();var t=xs,e=go,n=Pa,i=_y;e.subtreeFlags&10256||e.flags&10256?yn=5:(yn=0,go=xs=null,Dy(t,t.pendingLanes));var a=t.pendingLanes;if(a===0&&(_s=null),Qp(n),e=e.stateNode,gi&&typeof gi.onCommitFiberRoot=="function")try{gi.onCommitFiberRoot(Vl,e,void 0,(e.current.flags&128)===128)}catch{}if(i!==null){e=ot.T,a=Ht.p,Ht.p=2,ot.T=null;try{for(var s=t.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{ot.T=e,Ht.p=a}}Pa&3&&Ef(),da(t),a=t.pendingLanes,n&261930&&a&42?t===Ph?Sl++:(Sl=0,Ph=t):Sl=0,$l(0)}}function Dy(t,e){(t.pooledCacheLanes&=e)===0&&(e=t.pooledCache,e!=null&&(t.pooledCache=null,Yl(e)))}function Ef(){return wy(),Ry(),Cy(),Ny()}function Ny(){if(yn!==5)return!1;var t=xs,e=Lh;Lh=0;var n=Qp(Pa),i=ot.T,a=Ht.p;try{Ht.p=32>n?32:n,ot.T=null,n=Oh,Oh=null;var s=xs,r=Pa;if(yn=0,go=xs=null,Pa=0,Ft&6)throw Error(ye(331));var o=Ft;if(Ft|=4,my(s.current),dy(s,s.current,r,n),Ft=o,$l(0,!1),gi&&typeof gi.onPostCommitFiberRoot=="function")try{gi.onPostCommitFiberRoot(Vl,s)}catch{}return!0}finally{Ht.p=a,ot.T=i,Dy(t,e)}}function m0(t,e,n){e=Ui(n,e),e=Rh(t.stateNode,e,2),t=vs(t,e,2),t!==null&&(Wl(t,2),da(t))}function qt(t,e,n){if(t.tag===3)m0(t,t,n);else for(;e!==null;){if(e.tag===3){m0(e,t,n);break}else if(e.tag===1){var i=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_s===null||!_s.has(i))){t=Ui(n,t),n=jx(2),i=vs(e,n,2),i!==null&&(qx(n,i,e,t),Wl(i,2),da(i));break}}e=e.return}}function od(t,e,n){var i=t.pingCache;if(i===null){i=t.pingCache=new Yb;var a=new Set;i.set(e,a)}else a=i.get(e),a===void 0&&(a=new Set,i.set(e,a));a.has(n)||(Lm=!0,a.add(n),t=Jb.bind(null,t,e,n),e.then(t,t))}function Jb(t,e,n){var i=t.pingCache;i!==null&&i.delete(e),t.pingedLanes|=t.suspendedLanes&n,t.warmLanes&=~n,Jt===t&&(Ct&n)===n&&(fn===4||fn===3&&(Ct&62914560)===Ct&&300>mi()-Sf?!(Ft&2)&&vo(t,0):Om|=n,mo===Ct&&(mo=0)),da(t)}function Uy(t,e){e===0&&(e=b_()),t=ur(t,e),t!==null&&(Wl(t,e),da(t))}function eE(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),Uy(t,n)}function tE(t,e){var n=0;switch(t.tag){case 31:case 13:var i=t.stateNode,a=t.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=t.stateNode;break;case 22:i=t.stateNode._retryCache;break;default:throw Error(ye(314))}i!==null&&i.delete(e),Uy(t,n)}function nE(t,e){return Kp(t,e)}var ku=null,Ir=null,zh=!1,Vu=!1,ld=!1,fs=0;function da(t){t!==Ir&&t.next===null&&(Ir===null?ku=Ir=t:Ir=Ir.next=t),Vu=!0,zh||(zh=!0,aE())}function $l(t,e){if(!ld&&Vu){ld=!0;do for(var n=!1,i=ku;i!==null;){if(t!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-vi(42|t)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,g0(i,s))}else s=Ct,s=uf(i,i===Jt?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Xl(i,s)||(n=!0,g0(i,s));i=i.next}while(n);ld=!1}}function iE(){Ly()}function Ly(){Vu=zh=!1;var t=0;fs!==0&&pE()&&(t=fs);for(var e=mi(),n=null,i=ku;i!==null;){var a=i.next,s=Oy(i,e);s===0?(i.next=null,n===null?ku=a:n.next=a,a===null&&(Ir=n)):(n=i,(t!==0||s&3)&&(Vu=!0)),i=a}yn!==0&&yn!==5||$l(t),fs!==0&&(fs=0)}function Oy(t,e){for(var n=t.suspendedLanes,i=t.pingedLanes,a=t.expirationTimes,s=t.pendingLanes&-62914561;0<s;){var r=31-vi(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=DM(o,e)):l<=e&&(t.expiredLanes|=o),s&=~o}if(e=Jt,n=Ct,n=uf(t,t===e?n:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i=t.callbackNode,n===0||t===e&&(jt===2||jt===9)||t.cancelPendingCommit!==null)return i!==null&&i!==null&&zf(i),t.callbackNode=null,t.callbackPriority=0;if(!(n&3)||Xl(t,n)){if(e=n&-n,e===t.callbackPriority)return e;switch(i!==null&&zf(i),Qp(n)){case 2:case 8:n=S_;break;case 32:n=Tu;break;case 268435456:n=M_;break;default:n=Tu}return i=Py.bind(null,t),n=Kp(n,i),t.callbackPriority=e,t.callbackNode=n,e}return i!==null&&i!==null&&zf(i),t.callbackPriority=2,t.callbackNode=null,2}function Py(t,e){if(yn!==0&&yn!==5)return t.callbackNode=null,t.callbackPriority=0,null;var n=t.callbackNode;if(Ef()&&t.callbackNode!==n)return null;var i=Ct;return i=uf(t,t===Jt?i:0,t.cancelPendingCommit!==null||t.timeoutHandle!==-1),i===0?null:(yy(t,i,e),Oy(t,mi()),t.callbackNode!=null&&t.callbackNode===n?Py.bind(null,t):null)}function g0(t,e){if(Ef())return null;yy(t,e,!0)}function aE(){gE(function(){Ft&6?Kp(y_,iE):Ly()})}function zm(){if(fs===0){var t=fo;t===0&&(t=sc,sc<<=1,!(sc&261888)&&(sc=256)),fs=t}return fs}function v0(t){return t==null||typeof t=="symbol"||typeof t=="boolean"?null:typeof t=="function"?t:Qc(""+t)}function _0(t,e){var n=e.ownerDocument.createElement("input");return n.name=e.name,n.value=e.value,t.id&&n.setAttribute("form",t.id),e.parentNode.insertBefore(n,e),t=new FormData(t),n.parentNode.removeChild(n),t}function sE(t,e,n,i,a){if(e==="submit"&&n&&n.stateNode===a){var s=v0((a[ri]||null).action),r=i.submitter;r&&(e=(e=r[ri]||null)?v0(e.formAction):r.getAttribute("formAction"),e!==null&&(s=e,r=null));var o=new ff("action","action",null,i,a);t.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(fs!==0){var l=r?_0(a,r):new FormData(a);Ah(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?_0(a,r):new FormData(a),Ah(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var cd=0;cd<ph.length;cd++){var ud=ph[cd],rE=ud.toLowerCase(),oE=ud[0].toUpperCase()+ud.slice(1);Ki(rE,"on"+oE)}Ki(q_,"onAnimationEnd");Ki(Y_,"onAnimationIteration");Ki(Z_,"onAnimationStart");Ki("dblclick","onDoubleClick");Ki("focusin","onFocus");Ki("focusout","onBlur");Ki(bb,"onTransitionRun");Ki(Eb,"onTransitionStart");Ki(Tb,"onTransitionCancel");Ki(K_,"onTransitionEnd");co("onMouseEnter",["mouseout","mouseover"]);co("onMouseLeave",["mouseout","mouseover"]);co("onPointerEnter",["pointerout","pointerover"]);co("onPointerLeave",["pointerout","pointerover"]);or("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));or("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));or("onBeforeInput",["compositionend","keypress","textInput","paste"]);or("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));or("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));or("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ll="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),lE=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ll));function zy(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var i=t[n],a=i.event;i=i.listeners;e:{var s=void 0;if(e)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){wu(d)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break e;s=o,a.currentTarget=c;try{s(a)}catch(d){wu(d)}a.currentTarget=null,s=l}}}}function Et(t,e){var n=e[rh];n===void 0&&(n=e[rh]=new Set);var i=t+"__bubble";n.has(i)||(Iy(e,t,2,!1),n.add(i))}function fd(t,e,n){var i=0;e&&(i|=4),Iy(n,t,i,e)}var mc="_reactListening"+Math.random().toString(36).slice(2);function Im(t){if(!t[mc]){t[mc]=!0,R_.forEach(function(n){n!=="selectionchange"&&(lE.has(n)||fd(n,!1,t),fd(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[mc]||(e[mc]=!0,fd("selectionchange",!1,e))}}function Iy(t,e,n,i){switch(Ky(e)){case 2:var a=zE;break;case 8:a=IE;break;default:a=Gm}n=a.bind(null,e,n,t),a=void 0,!fh||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(a=!0),i?a!==void 0?t.addEventListener(e,n,{capture:!0,passive:a}):t.addEventListener(e,n,!0):a!==void 0?t.addEventListener(e,n,{passive:a}):t.addEventListener(e,n,!1)}function dd(t,e,n,i,a){var s=i;if(!(e&1)&&!(e&2)&&i!==null)e:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Hr(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue e}o=o.parentNode}}i=i.return}z_(function(){var c=s,d=tm(n),h=[];e:{var u=$_.get(t);if(u!==void 0){var p=ff,g=t;switch(t){case"keypress":if(eu(n)===0)break e;case"keydown":case"keyup":p=tb;break;case"focusin":g="focus",p=Gf;break;case"focusout":g="blur",p=Gf;break;case"beforeblur":case"afterblur":p=Gf;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=Ag;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=VM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=ab;break;case q_:case Y_:case Z_:p=jM;break;case K_:p=rb;break;case"scroll":case"scrollend":p=GM;break;case"wheel":p=lb;break;case"copy":case"cut":case"paste":p=YM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Rg;break;case"toggle":case"beforetoggle":p=ub}var E=(e&4)!==0,m=!E&&(t==="scroll"||t==="scrollend"),f=E?u!==null?u+"Capture":null:u;E=[];for(var x=c,S;x!==null;){var y=x;if(S=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||S===null||f===null||(y=Tl(x,f),y!=null&&E.push(Ol(x,y,S))),m)break;x=x.return}0<E.length&&(u=new p(u,g,null,n,d),h.push({event:u,listeners:E}))}}if(!(e&7)){e:{if(u=t==="mouseover"||t==="pointerover",p=t==="mouseout"||t==="pointerout",u&&n!==uh&&(g=n.relatedTarget||n.fromElement)&&(Hr(g)||g[Ao]))break e;if((p||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Hr(g):null,g!==null&&(m=kl(g),E=g.tag,g!==m||E!==5&&E!==27&&E!==6)&&(g=null)):(p=null,g=c),p!==g)){if(E=Ag,y="onMouseLeave",f="onMouseEnter",x="mouse",(t==="pointerout"||t==="pointerover")&&(E=Rg,y="onPointerLeave",f="onPointerEnter",x="pointer"),m=p==null?u:il(p),S=g==null?u:il(g),u=new E(y,x+"leave",p,n,d),u.target=m,u.relatedTarget=S,y=null,Hr(d)===c&&(E=new E(f,x+"enter",g,n,d),E.target=S,E.relatedTarget=m,y=E),m=y,p&&g)t:{for(E=cE,f=p,x=g,S=0,y=f;y;y=E(y))S++;y=0;for(var U=x;U;U=E(U))y++;for(;0<S-y;)f=E(f),S--;for(;0<y-S;)x=E(x),y--;for(;S--;){if(f===x||x!==null&&f===x.alternate){E=f;break t}f=E(f),x=E(x)}E=null}else E=null;p!==null&&x0(h,u,p,E,!1),g!==null&&m!==null&&x0(h,m,g,E,!0)}}e:{if(u=c?il(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var A=Ug;else if(Ng(u))if(k_)A=yb;else{A=_b;var T=vb}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&em(c.elementType)&&(A=Ug):A=xb;if(A&&(A=A(t,c))){G_(h,A,n,d);break e}T&&T(t,u,c),t==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&ch(u,"number",u.value)}switch(T=c?il(c):window,t){case"focusin":(Ng(T)||T.contentEditable==="true")&&(Vr=T,dh=c,dl=null);break;case"focusout":dl=dh=Vr=null;break;case"mousedown":hh=!0;break;case"contextmenu":case"mouseup":case"dragend":hh=!1,Ig(h,n,d);break;case"selectionchange":if(Mb)break;case"keydown":case"keyup":Ig(h,n,d)}var M;if(am)e:{switch(t){case"compositionstart":var D="onCompositionStart";break e;case"compositionend":D="onCompositionEnd";break e;case"compositionupdate":D="onCompositionUpdate";break e}D=void 0}else kr?F_(t,n)&&(D="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(D="onCompositionStart");D&&(B_&&n.locale!=="ko"&&(kr||D!=="onCompositionStart"?D==="onCompositionEnd"&&kr&&(M=I_()):(ls=d,nm="value"in ls?ls.value:ls.textContent,kr=!0)),T=Xu(c,D),0<T.length&&(D=new wg(D,t,null,n,d),h.push({event:D,listeners:T}),M?D.data=M:(M=H_(n),M!==null&&(D.data=M)))),(M=db?hb(t,n):pb(t,n))&&(D=Xu(c,"onBeforeInput"),0<D.length&&(T=new wg("onBeforeInput","beforeinput",null,n,d),h.push({event:T,listeners:D}),T.data=M)),sE(h,t,c,n,d)}zy(h,e)})}function Ol(t,e,n){return{instance:t,listener:e,currentTarget:n}}function Xu(t,e){for(var n=e+"Capture",i=[];t!==null;){var a=t,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Tl(t,n),a!=null&&i.unshift(Ol(t,a,s)),a=Tl(t,e),a!=null&&i.push(Ol(t,a,s))),t.tag===3)return i;t=t.return}return[]}function cE(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5&&t.tag!==27);return t||null}function x0(t,e,n,i,a){for(var s=e._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Tl(n,s),c!=null&&r.unshift(Ol(n,c,l))):a||(c=Tl(n,s),c!=null&&r.push(Ol(n,c,l)))),n=n.return}r.length!==0&&t.push({event:e,listeners:r})}var uE=/\r\n?/g,fE=/\u0000|\uFFFD/g;function y0(t){return(typeof t=="string"?t:""+t).replace(uE,`
`).replace(fE,"")}function By(t,e){return e=y0(e),y0(t)===e}function Kt(t,e,n,i,a,s){switch(n){case"children":typeof i=="string"?e==="body"||e==="textarea"&&i===""||uo(t,i):(typeof i=="number"||typeof i=="bigint")&&e!=="body"&&uo(t,""+i);break;case"className":lc(t,"class",i);break;case"tabIndex":lc(t,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":lc(t,n,i);break;case"style":P_(t,i,s);break;case"data":if(e!=="object"){lc(t,"data",i);break}case"src":case"href":if(i===""&&(e!=="a"||n!=="href")){t.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Qc(""+i),t.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){t.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(e!=="input"&&Kt(t,e,"name",a.name,a,null),Kt(t,e,"formEncType",a.formEncType,a,null),Kt(t,e,"formMethod",a.formMethod,a,null),Kt(t,e,"formTarget",a.formTarget,a,null)):(Kt(t,e,"encType",a.encType,a,null),Kt(t,e,"method",a.method,a,null),Kt(t,e,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){t.removeAttribute(n);break}i=Qc(""+i),t.setAttribute(n,i);break;case"onClick":i!=null&&(t.onclick=Da);break;case"onScroll":i!=null&&Et("scroll",t);break;case"onScrollEnd":i!=null&&Et("scrollend",t);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(ye(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(ye(60));t.innerHTML=n}}break;case"multiple":t.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":t.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){t.removeAttribute("xlink:href");break}n=Qc(""+i),t.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""+i):t.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,""):t.removeAttribute(n);break;case"capture":case"download":i===!0?t.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?t.setAttribute(n,i):t.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?t.setAttribute(n,i):t.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?t.removeAttribute(n):t.setAttribute(n,i);break;case"popover":Et("beforetoggle",t),Et("toggle",t),$c(t,"popover",i);break;case"xlinkActuate":ma(t,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ma(t,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ma(t,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ma(t,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ma(t,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ma(t,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ma(t,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ma(t,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ma(t,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":$c(t,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=FM.get(n)||n,$c(t,n,i))}}function Ih(t,e,n,i,a,s){switch(n){case"style":P_(t,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(ye(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(ye(60));t.innerHTML=n}}break;case"children":typeof i=="string"?uo(t,i):(typeof i=="number"||typeof i=="bigint")&&uo(t,""+i);break;case"onScroll":i!=null&&Et("scroll",t);break;case"onScrollEnd":i!=null&&Et("scrollend",t);break;case"onClick":i!=null&&(t.onclick=Da);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!C_.hasOwnProperty(n))e:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),e=n.slice(2,a?n.length-7:void 0),s=t[ri]||null,s=s!=null?s[n]:null,typeof s=="function"&&t.removeEventListener(e,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in t?t[n]=null:t.hasAttribute(n)&&t.removeAttribute(n)),t.addEventListener(e,i,a);break e}n in t?t[n]=i:i===!0?t.setAttribute(n,""):$c(t,n,i)}}}function Fn(t,e,n){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Et("error",t),Et("load",t);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(ye(137,e));default:Kt(t,e,s,r,n,null)}}a&&Kt(t,e,"srcSet",n.srcSet,n,null),i&&Kt(t,e,"src",n.src,n,null);return;case"input":Et("invalid",t);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(ye(137,e));break;default:Kt(t,e,i,d,n,null)}}U_(t,s,o,l,c,r,a,!1);return;case"select":Et("invalid",t),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Kt(t,e,a,o,n,null)}e=s,n=r,t.multiple=!!i,e!=null?eo(t,!!i,e,!1):n!=null&&eo(t,!!i,n,!0);return;case"textarea":Et("invalid",t),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(ye(91));break;default:Kt(t,e,r,o,n,null)}O_(t,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":t.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Kt(t,e,l,i,n,null)}return;case"dialog":Et("beforetoggle",t),Et("toggle",t),Et("cancel",t),Et("close",t);break;case"iframe":case"object":Et("load",t);break;case"video":case"audio":for(i=0;i<Ll.length;i++)Et(Ll[i],t);break;case"image":Et("error",t),Et("load",t);break;case"details":Et("toggle",t);break;case"embed":case"source":case"link":Et("error",t),Et("load",t);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(ye(137,e));default:Kt(t,e,c,i,n,null)}return;default:if(em(e)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Ih(t,e,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Kt(t,e,o,i,n,null))}function dE(t,e,n,i){switch(e){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,d=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||Kt(t,e,p,null,i,h)}}for(var u in i){var p=i[u];if(h=n[u],i.hasOwnProperty(u)&&(p!=null||h!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(ye(137,e));break;default:p!==h&&Kt(t,e,u,p,i,h)}}lh(t,r,o,l,c,d,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||Kt(t,e,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Kt(t,e,a,s,i,l)}e=o,n=r,i=p,u!=null?eo(t,!!n,u,!1):!!i!=!!n&&(e!=null?eo(t,!!n,e,!0):eo(t,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Kt(t,e,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(ye(91));break;default:a!==s&&Kt(t,e,r,a,i,s)}L_(t,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":t.selected=!1;break;default:Kt(t,e,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":t.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Kt(t,e,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var E in n)u=n[E],n.hasOwnProperty(E)&&u!=null&&!i.hasOwnProperty(E)&&Kt(t,e,E,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(ye(137,e));break;default:Kt(t,e,c,u,i,p)}return;default:if(em(e)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Ih(t,e,m,void 0,i,u);for(d in i)u=i[d],p=n[d],!i.hasOwnProperty(d)||u===p||u===void 0&&p===void 0||Ih(t,e,d,u,i,p);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&Kt(t,e,f,null,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u==null&&p==null||Kt(t,e,h,u,i,p)}function S0(t){switch(t){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function hE(){if(typeof performance.getEntriesByType=="function"){for(var t=0,e=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&S0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,h=l.initiatorType;d&&S0(h)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,e+=8*(s+r)/(a.duration/1e3),t++,10<t)break}}if(0<t)return e/t/1e6}return navigator.connection&&(t=navigator.connection.downlink,typeof t=="number")?t:5}var Bh=null,Fh=null;function Wu(t){return t.nodeType===9?t:t.ownerDocument}function M0(t){switch(t){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Fy(t,e){if(t===0)switch(e){case"svg":return 1;case"math":return 2;default:return 0}return t===1&&e==="foreignObject"?0:t}function Hh(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.children=="bigint"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var hd=null;function pE(){var t=window.event;return t&&t.type==="popstate"?t===hd?!1:(hd=t,!0):(hd=null,!1)}var Hy=typeof setTimeout=="function"?setTimeout:void 0,mE=typeof clearTimeout=="function"?clearTimeout:void 0,b0=typeof Promise=="function"?Promise:void 0,gE=typeof queueMicrotask=="function"?queueMicrotask:typeof b0<"u"?function(t){return b0.resolve(null).then(t).catch(vE)}:Hy;function vE(t){setTimeout(function(){throw t})}function Cs(t){return t==="head"}function E0(t,e){var n=e,i=0;do{var a=n.nextSibling;if(t.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){t.removeChild(a),xo(e);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")Ml(t.ownerDocument.documentElement);else if(n==="head"){n=t.ownerDocument.head,Ml(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[jl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&Ml(t.ownerDocument.body);n=a}while(n);xo(e)}function T0(t,e){var n=t;t=0;do{var i=n.nextSibling;if(n.nodeType===1?e?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(e?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(t===0)break;t--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||t++;n=i}while(n)}function Gh(t){var e=t.firstChild;for(e&&e.nodeType===10&&(e=e.nextSibling);e;){var n=e;switch(e=e.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":Gh(n),Jp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}t.removeChild(n)}}function _E(t,e,n,i){for(;t.nodeType===1;){var a=n;if(t.nodeName.toLowerCase()!==e.toLowerCase()){if(!i&&(t.nodeName!=="INPUT"||t.type!=="hidden"))break}else if(i){if(!t[jl])switch(e){case"meta":if(!t.hasAttribute("itemprop"))break;return t;case"link":if(s=t.getAttribute("rel"),s==="stylesheet"&&t.hasAttribute("data-precedence"))break;if(s!==a.rel||t.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||t.getAttribute("title")!==(a.title==null?null:a.title))break;return t;case"style":if(t.hasAttribute("data-precedence"))break;return t;case"script":if(s=t.getAttribute("src"),(s!==(a.src==null?null:a.src)||t.getAttribute("type")!==(a.type==null?null:a.type)||t.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&t.hasAttribute("async")&&!t.hasAttribute("itemprop"))break;return t;default:return t}}else if(e==="input"&&t.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&t.getAttribute("name")===s)return t}else return t;if(t=Ii(t.nextSibling),t===null)break}return null}function xE(t,e,n){if(e==="")return null;for(;t.nodeType!==3;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!n||(t=Ii(t.nextSibling),t===null))return null;return t}function Gy(t,e){for(;t.nodeType!==8;)if((t.nodeType!==1||t.nodeName!=="INPUT"||t.type!=="hidden")&&!e||(t=Ii(t.nextSibling),t===null))return null;return t}function kh(t){return t.data==="$?"||t.data==="$~"}function Vh(t){return t.data==="$!"||t.data==="$?"&&t.ownerDocument.readyState!=="loading"}function yE(t,e){var n=t.ownerDocument;if(t.data==="$~")t._reactRetry=e;else if(t.data!=="$?"||n.readyState!=="loading")e();else{var i=function(){e(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),t._reactRetry=i}}function Ii(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?"||e==="$~"||e==="&"||e==="F!"||e==="F")break;if(e==="/$"||e==="/&")return null}}return t}var Xh=null;function A0(t){t=t.nextSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"||n==="/&"){if(e===0)return Ii(t.nextSibling);e--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||e++}t=t.nextSibling}return null}function w0(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(e===0)return t;e--}else n!=="/$"&&n!=="/&"||e++}t=t.previousSibling}return null}function ky(t,e,n){switch(e=Wu(n),t){case"html":if(t=e.documentElement,!t)throw Error(ye(452));return t;case"head":if(t=e.head,!t)throw Error(ye(453));return t;case"body":if(t=e.body,!t)throw Error(ye(454));return t;default:throw Error(ye(451))}}function Ml(t){for(var e=t.attributes;e.length;)t.removeAttributeNode(e[0]);Jp(t)}var Fi=new Map,R0=new Set;function ju(t){return typeof t.getRootNode=="function"?t.getRootNode():t.nodeType===9?t:t.ownerDocument}var Wa=Ht.d;Ht.d={f:SE,r:ME,D:bE,C:EE,L:TE,m:AE,X:RE,S:wE,M:CE};function SE(){var t=Wa.f(),e=Mf();return t||e}function ME(t){var e=wo(t);e!==null&&e.tag===5&&e.type==="form"?Px(e):Wa.r(t)}var No=typeof document>"u"?null:document;function Vy(t,e,n){var i=No;if(i&&typeof e=="string"&&e){var a=Ni(e);a='link[rel="'+t+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),R0.has(a)||(R0.add(a),t={rel:t,crossOrigin:n,href:e},i.querySelector(a)===null&&(e=i.createElement("link"),Fn(e,"link",t),wn(e),i.head.appendChild(e)))}}function bE(t){Wa.D(t),Vy("dns-prefetch",t,null)}function EE(t,e){Wa.C(t,e),Vy("preconnect",t,e)}function TE(t,e,n){Wa.L(t,e,n);var i=No;if(i&&t&&e){var a='link[rel="preload"][as="'+Ni(e)+'"]';e==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Ni(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Ni(n.imageSizes)+'"]')):a+='[href="'+Ni(t)+'"]';var s=a;switch(e){case"style":s=_o(t);break;case"script":s=Uo(t)}Fi.has(s)||(t=on({rel:"preload",href:e==="image"&&n&&n.imageSrcSet?void 0:t,as:e},n),Fi.set(s,t),i.querySelector(a)!==null||e==="style"&&i.querySelector(Ql(s))||e==="script"&&i.querySelector(Jl(s))||(e=i.createElement("link"),Fn(e,"link",t),wn(e),i.head.appendChild(e)))}}function AE(t,e){Wa.m(t,e);var n=No;if(n&&t){var i=e&&typeof e.as=="string"?e.as:"script",a='link[rel="modulepreload"][as="'+Ni(i)+'"][href="'+Ni(t)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Uo(t)}if(!Fi.has(s)&&(t=on({rel:"modulepreload",href:t},e),Fi.set(s,t),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Jl(s)))return}i=n.createElement("link"),Fn(i,"link",t),wn(i),n.head.appendChild(i)}}}function wE(t,e,n){Wa.S(t,e,n);var i=No;if(i&&t){var a=Jr(i).hoistableStyles,s=_o(t);e=e||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Ql(s)))o.loading=5;else{t=on({rel:"stylesheet",href:t,"data-precedence":e},n),(n=Fi.get(s))&&Bm(t,n);var l=r=i.createElement("link");wn(l),Fn(l,"link",t),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,lu(r,e,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function RE(t,e){Wa.X(t,e);var n=No;if(n&&t){var i=Jr(n).hoistableScripts,a=Uo(t),s=i.get(a);s||(s=n.querySelector(Jl(a)),s||(t=on({src:t,async:!0},e),(e=Fi.get(a))&&Fm(t,e),s=n.createElement("script"),wn(s),Fn(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function CE(t,e){Wa.M(t,e);var n=No;if(n&&t){var i=Jr(n).hoistableScripts,a=Uo(t),s=i.get(a);s||(s=n.querySelector(Jl(a)),s||(t=on({src:t,async:!0,type:"module"},e),(e=Fi.get(a))&&Fm(t,e),s=n.createElement("script"),wn(s),Fn(s,"link",t),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function C0(t,e,n,i){var a=(a=ps.current)?ju(a):null;if(!a)throw Error(ye(446));switch(t){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(e=_o(n.href),n=Jr(a).hoistableStyles,i=n.get(e),i||(i={type:"style",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){t=_o(n.href);var s=Jr(a).hoistableStyles,r=s.get(t);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(t,r),(s=a.querySelector(Ql(t)))&&!s._p&&(r.instance=s,r.state.loading=5),Fi.has(t)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Fi.set(t,n),s||DE(a,t,n,r.state))),e&&i===null)throw Error(ye(528,""));return r}if(e&&i!==null)throw Error(ye(529,""));return null;case"script":return e=n.async,n=n.src,typeof n=="string"&&e&&typeof e!="function"&&typeof e!="symbol"?(e=Uo(n),n=Jr(a).hoistableScripts,i=n.get(e),i||(i={type:"script",instance:null,count:0,state:null},n.set(e,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(ye(444,t))}}function _o(t){return'href="'+Ni(t)+'"'}function Ql(t){return'link[rel="stylesheet"]['+t+"]"}function Xy(t){return on({},t,{"data-precedence":t.precedence,precedence:null})}function DE(t,e,n,i){t.querySelector('link[rel="preload"][as="style"]['+e+"]")?i.loading=1:(e=t.createElement("link"),i.preload=e,e.addEventListener("load",function(){return i.loading|=1}),e.addEventListener("error",function(){return i.loading|=2}),Fn(e,"link",n),wn(e),t.head.appendChild(e))}function Uo(t){return'[src="'+Ni(t)+'"]'}function Jl(t){return"script[async]"+t}function D0(t,e,n){if(e.count++,e.instance===null)switch(e.type){case"style":var i=t.querySelector('style[data-href~="'+Ni(n.href)+'"]');if(i)return e.instance=i,wn(i),i;var a=on({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(t.ownerDocument||t).createElement("style"),wn(i),Fn(i,"style",a),lu(i,n.precedence,t),e.instance=i;case"stylesheet":a=_o(n.href);var s=t.querySelector(Ql(a));if(s)return e.state.loading|=4,e.instance=s,wn(s),s;i=Xy(n),(a=Fi.get(a))&&Bm(i,a),s=(t.ownerDocument||t).createElement("link"),wn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),e.state.loading|=4,lu(s,n.precedence,t),e.instance=s;case"script":return s=Uo(n.src),(a=t.querySelector(Jl(s)))?(e.instance=a,wn(a),a):(i=n,(a=Fi.get(s))&&(i=on({},n),Fm(i,a)),t=t.ownerDocument||t,a=t.createElement("script"),wn(a),Fn(a,"link",i),t.head.appendChild(a),e.instance=a);case"void":return null;default:throw Error(ye(443,e.type))}else e.type==="stylesheet"&&!(e.state.loading&4)&&(i=e.instance,e.state.loading|=4,lu(i,n.precedence,t));return e.instance}function lu(t,e,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===e)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(t,s.nextSibling):(e=n.nodeType===9?n.head:n,e.insertBefore(t,e.firstChild))}function Bm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.title==null&&(t.title=e.title)}function Fm(t,e){t.crossOrigin==null&&(t.crossOrigin=e.crossOrigin),t.referrerPolicy==null&&(t.referrerPolicy=e.referrerPolicy),t.integrity==null&&(t.integrity=e.integrity)}var cu=null;function N0(t,e,n){if(cu===null){var i=new Map,a=cu=new Map;a.set(n,i)}else a=cu,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(t))return i;for(i.set(t,null),n=n.getElementsByTagName(t),a=0;a<n.length;a++){var s=n[a];if(!(s[jl]||s[On]||t==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(e)||"";r=t+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function U0(t,e,n){t=t.ownerDocument||t,t.head.insertBefore(n,e==="title"?t.querySelector("head > title"):null)}function NE(t,e,n){if(n===1||e.itemProp!=null)return!1;switch(t){case"meta":case"title":return!0;case"style":if(typeof e.precedence!="string"||typeof e.href!="string"||e.href==="")break;return!0;case"link":if(typeof e.rel!="string"||typeof e.href!="string"||e.href===""||e.onLoad||e.onError)break;switch(e.rel){case"stylesheet":return t=e.disabled,typeof e.precedence=="string"&&t==null;default:return!0}case"script":if(e.async&&typeof e.async!="function"&&typeof e.async!="symbol"&&!e.onLoad&&!e.onError&&e.src&&typeof e.src=="string")return!0}return!1}function Wy(t){return!(t.type==="stylesheet"&&!(t.state.loading&3))}function UE(t,e,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=_o(i.href),s=e.querySelector(Ql(a));if(s){e=s._p,e!==null&&typeof e=="object"&&typeof e.then=="function"&&(t.count++,t=qu.bind(t),e.then(t,t)),n.state.loading|=4,n.instance=s,wn(s);return}s=e.ownerDocument||e,i=Xy(i),(a=Fi.get(a))&&Bm(i,a),s=s.createElement("link"),wn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),n.instance=s}t.stylesheets===null&&(t.stylesheets=new Map),t.stylesheets.set(n,e),(e=n.state.preload)&&!(n.state.loading&3)&&(t.count++,n=qu.bind(t),e.addEventListener("load",n),e.addEventListener("error",n))}}var pd=0;function LE(t,e){return t.stylesheets&&t.count===0&&uu(t,t.stylesheets),0<t.count||0<t.imgCount?function(n){var i=setTimeout(function(){if(t.stylesheets&&uu(t,t.stylesheets),t.unsuspend){var s=t.unsuspend;t.unsuspend=null,s()}},6e4+e);0<t.imgBytes&&pd===0&&(pd=62500*hE());var a=setTimeout(function(){if(t.waitingForImages=!1,t.count===0&&(t.stylesheets&&uu(t,t.stylesheets),t.unsuspend)){var s=t.unsuspend;t.unsuspend=null,s()}},(t.imgBytes>pd?50:800)+e);return t.unsuspend=n,function(){t.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function qu(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)uu(this,this.stylesheets);else if(this.unsuspend){var t=this.unsuspend;this.unsuspend=null,t()}}}var Yu=null;function uu(t,e){t.stylesheets=null,t.unsuspend!==null&&(t.count++,Yu=new Map,e.forEach(OE,t),Yu=null,qu.call(t))}function OE(t,e){if(!(e.state.loading&4)){var n=Yu.get(t);if(n)var i=n.get(null);else{n=new Map,Yu.set(t,n);for(var a=t.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=e.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=qu.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(t=t.nodeType===9?t.head:t,t.insertBefore(a,t.firstChild)),e.state.loading|=4}}var Pl={$$typeof:Ca,Provider:null,Consumer:null,_currentValue:js,_currentValue2:js,_threadCount:0};function PE(t,e,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=t,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=If(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=If(0),this.hiddenUpdates=If(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function jy(t,e,n,i,a,s,r,o,l,c,d,h){return t=new PE(t,e,n,r,l,c,d,h,o),e=1,s===!0&&(e|=24),s=hi(3,null,null,e),t.current=s,s.stateNode=t,e=fm(),e.refCount++,t.pooledCache=e,e.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:e},pm(s),t}function qy(t){return t?(t=jr,t):jr}function Yy(t,e,n,i,a,s){a=qy(a),i.context===null?i.context=a:i.pendingContext=a,i=gs(e),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=vs(t,i,e),n!==null&&(ai(n,t,e),pl(n,t,e))}function L0(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Hm(t,e){L0(t,e),(t=t.alternate)&&L0(t,e)}function Zy(t){if(t.tag===13||t.tag===31){var e=ur(t,67108864);e!==null&&ai(e,t,67108864),Hm(t,67108864)}}function O0(t){if(t.tag===13||t.tag===31){var e=_i();e=$p(e);var n=ur(t,e);n!==null&&ai(n,t,e),Hm(t,e)}}var Zu=!0;function zE(t,e,n,i){var a=ot.T;ot.T=null;var s=Ht.p;try{Ht.p=2,Gm(t,e,n,i)}finally{Ht.p=s,ot.T=a}}function IE(t,e,n,i){var a=ot.T;ot.T=null;var s=Ht.p;try{Ht.p=8,Gm(t,e,n,i)}finally{Ht.p=s,ot.T=a}}function Gm(t,e,n,i){if(Zu){var a=Wh(i);if(a===null)dd(t,e,i,Ku,n),P0(t,i);else if(FE(a,t,e,n,i))i.stopPropagation();else if(P0(t,i),e&4&&-1<BE.indexOf(t)){for(;a!==null;){var s=wo(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Bs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-vi(r);o.entanglements[1]|=l,r&=~l}da(s),!(Ft&6)&&(Fu=mi()+500,$l(0))}}break;case 31:case 13:o=ur(s,2),o!==null&&ai(o,s,2),Mf(),Hm(s,2)}if(s=Wh(i),s===null&&dd(t,e,i,Ku,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else dd(t,e,i,null,n)}}function Wh(t){return t=tm(t),km(t)}var Ku=null;function km(t){if(Ku=null,t=Hr(t),t!==null){var e=kl(t);if(e===null)t=null;else{var n=e.tag;if(n===13){if(t=m_(e),t!==null)return t;t=null}else if(n===31){if(t=g_(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null)}}return Ku=t,null}function Ky(t){switch(t){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(bM()){case y_:return 2;case S_:return 8;case Tu:case EM:return 32;case M_:return 268435456;default:return 32}default:return 32}}var jh=!1,ys=null,Ss=null,Ms=null,zl=new Map,Il=new Map,ss=[],BE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function P0(t,e){switch(t){case"focusin":case"focusout":ys=null;break;case"dragenter":case"dragleave":Ss=null;break;case"mouseover":case"mouseout":Ms=null;break;case"pointerover":case"pointerout":zl.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Il.delete(e.pointerId)}}function Xo(t,e,n,i,a,s){return t===null||t.nativeEvent!==s?(t={blockedOn:e,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},e!==null&&(e=wo(e),e!==null&&Zy(e)),t):(t.eventSystemFlags|=i,e=t.targetContainers,a!==null&&e.indexOf(a)===-1&&e.push(a),t)}function FE(t,e,n,i,a){switch(e){case"focusin":return ys=Xo(ys,t,e,n,i,a),!0;case"dragenter":return Ss=Xo(Ss,t,e,n,i,a),!0;case"mouseover":return Ms=Xo(Ms,t,e,n,i,a),!0;case"pointerover":var s=a.pointerId;return zl.set(s,Xo(zl.get(s)||null,t,e,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Il.set(s,Xo(Il.get(s)||null,t,e,n,i,a)),!0}return!1}function $y(t){var e=Hr(t.target);if(e!==null){var n=kl(e);if(n!==null){if(e=n.tag,e===13){if(e=m_(n),e!==null){t.blockedOn=e,xg(t.priority,function(){O0(n)});return}}else if(e===31){if(e=g_(n),e!==null){t.blockedOn=e,xg(t.priority,function(){O0(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function fu(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Wh(t.nativeEvent);if(n===null){n=t.nativeEvent;var i=new n.constructor(n.type,n);uh=i,n.target.dispatchEvent(i),uh=null}else return e=wo(n),e!==null&&Zy(e),t.blockedOn=n,!1;e.shift()}return!0}function z0(t,e,n){fu(t)&&n.delete(e)}function HE(){jh=!1,ys!==null&&fu(ys)&&(ys=null),Ss!==null&&fu(Ss)&&(Ss=null),Ms!==null&&fu(Ms)&&(Ms=null),zl.forEach(z0),Il.forEach(z0)}function gc(t,e){t.blockedOn===e&&(t.blockedOn=null,jh||(jh=!0,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,HE)))}var vc=null;function I0(t){vc!==t&&(vc=t,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,function(){vc===t&&(vc=null);for(var e=0;e<t.length;e+=3){var n=t[e],i=t[e+1],a=t[e+2];if(typeof i!="function"){if(km(i||n)===null)continue;break}var s=wo(n);s!==null&&(t.splice(e,3),e-=3,Ah(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function xo(t){function e(l){return gc(l,t)}ys!==null&&gc(ys,t),Ss!==null&&gc(Ss,t),Ms!==null&&gc(Ms,t),zl.forEach(e),Il.forEach(e);for(var n=0;n<ss.length;n++){var i=ss[n];i.blockedOn===t&&(i.blockedOn=null)}for(;0<ss.length&&(n=ss[0],n.blockedOn===null);)$y(n),n.blockedOn===null&&ss.shift();if(n=(t.ownerDocument||t).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[ri]||null;if(typeof s=="function")r||I0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[ri]||null)o=r.formAction;else if(km(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),I0(n)}}}function Qy(){function t(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function e(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",t),navigation.addEventListener("navigatesuccess",e),navigation.addEventListener("navigateerror",e),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",t),navigation.removeEventListener("navigatesuccess",e),navigation.removeEventListener("navigateerror",e),a!==null&&(a(),a=null)}}}function Vm(t){this._internalRoot=t}Tf.prototype.render=Vm.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(ye(409));var n=e.current,i=_i();Yy(n,i,t,e,null,null)};Tf.prototype.unmount=Vm.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Yy(t.current,2,null,t,null,null),Mf(),e[Ao]=null}};function Tf(t){this._internalRoot=t}Tf.prototype.unstable_scheduleHydration=function(t){if(t){var e=w_();t={blockedOn:null,target:t,priority:e};for(var n=0;n<ss.length&&e!==0&&e<ss[n].priority;n++);ss.splice(n,0,t),n===0&&$y(t)}};var B0=h_.version;if(B0!=="19.2.8")throw Error(ye(527,B0,"19.2.8"));Ht.findDOMNode=function(t){var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(ye(188)):(t=Object.keys(t).join(","),Error(ye(268,t)));return t=gM(e),t=t!==null?v_(t):null,t=t===null?null:t.stateNode,t};var GE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:ot,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var _c=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!_c.isDisabled&&_c.supportsFiber)try{Vl=_c.inject(GE),gi=_c}catch{}}lf.createRoot=function(t,e){if(!p_(t))throw Error(ye(299));var n=!1,i="",a=Vx,s=Xx,r=Wx;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(i=e.identifierPrefix),e.onUncaughtError!==void 0&&(a=e.onUncaughtError),e.onCaughtError!==void 0&&(s=e.onCaughtError),e.onRecoverableError!==void 0&&(r=e.onRecoverableError)),e=jy(t,1,!1,null,null,n,i,null,a,s,r,Qy),t[Ao]=e.current,Im(t),new Vm(e)};lf.hydrateRoot=function(t,e,n){if(!p_(t))throw Error(ye(299));var i=!1,a="",s=Vx,r=Xx,o=Wx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),e=jy(t,1,!0,e,n??null,i,a,l,s,r,o,Qy),e.context=qy(null),n=e.current,i=_i(),i=$p(i),a=gs(i),a.callback=null,vs(n,a,i),n=i,e.current.lanes=n,Wl(e,n),da(e),t[Ao]=e.current,Im(t),new Tf(e)};lf.version="19.2.8";function Jy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jy)}catch(t){console.error(t)}}Jy(),o_.exports=lf;var kE=o_.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Xm="185",VE=0,F0=1,XE=2,du=1,WE=2,rl=3,ws=0,si=1,Ra=2,za=0,$s=1,Kr=2,H0=3,G0=4,jE=5,ks=100,qE=101,YE=102,ZE=103,KE=104,$E=200,QE=201,JE=202,e1=203,qh=204,Yh=205,t1=206,n1=207,i1=208,a1=209,s1=210,r1=211,o1=212,l1=213,c1=214,Zh=0,Kh=1,$h=2,yo=3,Qh=4,Jh=5,ep=6,tp=7,eS=0,u1=1,f1=2,la=0,tS=1,nS=2,iS=3,aS=4,sS=5,rS=6,oS=7,lS=300,ir=301,So=302,md=303,gd=304,Af=306,np=1e3,Ua=1001,ip=1002,In=1003,d1=1004,xc=1005,Vn=1006,vd=1007,Xs=1008,Oi=1009,cS=1010,uS=1011,Bl=1012,Wm=1013,ua=1014,Yi=1015,Va=1016,jm=1017,qm=1018,Fl=1020,fS=35902,dS=35899,hS=1021,pS=1022,Zi=1023,Xa=1026,Ws=1027,Ym=1028,Zm=1029,ar=1030,Km=1031,$m=1033,hu=33776,pu=33777,mu=33778,gu=33779,ap=35840,sp=35841,rp=35842,op=35843,lp=36196,cp=37492,up=37496,fp=37488,dp=37489,$u=37490,hp=37491,pp=37808,mp=37809,gp=37810,vp=37811,_p=37812,xp=37813,yp=37814,Sp=37815,Mp=37816,bp=37817,Ep=37818,Tp=37819,Ap=37820,wp=37821,Rp=36492,Cp=36494,Dp=36495,Np=36283,Up=36284,Qu=36285,Lp=36286,h1=3200,k0=0,p1=1,rs="",Ai="srgb",Ju="srgb-linear",ef="linear",Wt="srgb",_r=7680,V0=519,m1=512,g1=513,v1=514,Qm=515,_1=516,x1=517,Jm=518,y1=519,X0=35044,W0="300 es",ra=2e3,tf=2001;function S1(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function nf(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function M1(){const t=nf("canvas");return t.style.display="block",t}const j0={};function q0(...t){const e="THREE."+t.shift();console.log(e,...t)}function mS(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function rt(...t){t=mS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function zt(...t){t=mS(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function ro(...t){const e=t.join(" ");e in j0||(j0[e]=!0,rt(...t))}function b1(t,e,n){return new Promise(function(i,a){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:a();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const E1={[Zh]:Kh,[$h]:ep,[Qh]:tp,[yo]:Jh,[Kh]:Zh,[ep]:$h,[tp]:Qh,[Jh]:yo};class dr{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const a=i[e];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,e);e.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],vu=Math.PI/180,Op=180/Math.PI;function ec(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gn[t&255]+Gn[t>>8&255]+Gn[t>>16&255]+Gn[t>>24&255]+"-"+Gn[e&255]+Gn[e>>8&255]+"-"+Gn[e>>16&15|64]+Gn[e>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[i&255]+Gn[i>>8&255]+Gn[i>>16&255]+Gn[i>>24&255]).toLowerCase()}function Ut(t,e,n){return Math.max(e,Math.min(n,t))}function T1(t,e){return(t%e+e)%e}function _d(t,e,n){return(1-n)*t+n*e}function Wo(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ti(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const sg=class sg{constructor(e=0,n=0){this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,a=e.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ut(this.x,e.x,n.x),this.y=Ut(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ut(this.x,e,n),this.y=Ut(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-e.x,r=this.y-e.y;return this.x=s*i-r*a+e.x,this.y=s*a+r*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};sg.prototype.isVector2=!0;let Gt=sg;class Lo{constructor(e=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=a}static slerpFlat(e,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],h=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],E=s[r+3];if(h!==E||l!==u||c!==p||d!==g){let m=l*u+c*p+d*g+h*E;m<0&&(u=-u,p=-p,g=-g,E=-E,m=-m);let f=1-o;if(m<.9995){const x=Math.acos(m),S=Math.sin(x);f=Math.sin(f*x)/S,o=Math.sin(o*x)/S,l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+E*o}else{l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+E*o;const x=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=x,c*=x,d*=x,h*=x}}e[n]=l,e[n+1]=c,e[n+2]=d,e[n+3]=h}static multiplyQuaternionsFlat(e,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],h=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return e[n]=o*g+d*h+l*p-c*u,e[n+1]=l*g+d*u+c*h-o*p,e[n+2]=c*g+d*p+o*u-l*h,e[n+3]=d*g-o*h-l*u-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,a){return this._x=e,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,a=e._y,s=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),h=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:rt("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,a=Math.sin(i);return this._x=e.x*a,this._y=e.y*a,this._z=e.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(e,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,a=e._y,s=e._z,r=e._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(e,n){let i=e._x,a=e._y,s=e._z,r=e._w,o=this.dot(e);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(e),a*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const rg=class rg{constructor(e=0,n=0,i=0){this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Y0.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Y0.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=e.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(e){const n=this.x,i=this.y,a=this.z,s=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*a-o*i),d=2*(o*n-s*a),h=2*(s*i-r*n);return this.x=n+l*c+r*h-o*d,this.y=i+l*d+o*c-s*h,this.z=a+l*h+s*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,a=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ut(this.x,e.x,n.x),this.y=Ut(this.y,e.y,n.y),this.z=Ut(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ut(this.x,e,n),this.y=Ut(this.y,e,n),this.z=Ut(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,a=e.y,s=e.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xd.copy(this).projectOnVector(e),this.sub(xd)}reflect(e){return this.sub(xd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ut(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,a=this.z-e.z;return n*n+i*i+a*a}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const a=Math.sin(n)*e;return this.x=a*Math.sin(i),this.y=Math.cos(n)*e,this.z=a*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),a=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};rg.prototype.isVector3=!0;let Q=rg;const xd=new Q,Y0=new Lo,og=class og{constructor(e,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c)}set(e,n,i,a,s,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=a,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],E=a[0],m=a[3],f=a[6],x=a[1],S=a[4],y=a[7],U=a[2],A=a[5],T=a[8];return s[0]=r*E+o*x+l*U,s[3]=r*m+o*S+l*A,s[6]=r*f+o*y+l*T,s[1]=c*E+d*x+h*U,s[4]=c*m+d*S+h*A,s[7]=c*f+d*y+h*T,s[2]=u*E+p*x+g*U,s[5]=u*m+p*S+g*A,s[8]=u*f+p*y+g*T,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return n*r*d-n*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*r-o*c,u=o*l-d*s,p=c*s-r*l,g=n*h+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const E=1/g;return e[0]=h*E,e[1]=(a*c-d*i)*E,e[2]=(o*i-a*r)*E,e[3]=u*E,e[4]=(d*n-a*l)*E,e[5]=(a*s-o*n)*E,e[6]=p*E,e[7]=(i*l-c*n)*E,e[8]=(r*n-i*s)*E,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+e,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(e,n){return ro("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(yd.makeScale(e,n)),this}rotate(e){return ro("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(yd.makeRotation(-e)),this}translate(e,n){return ro("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(yd.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}};og.prototype.isMatrix3=!0;let ht=og;const yd=new ht,Z0=new ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),K0=new ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function A1(){const t={enabled:!0,workingColorSpace:Ju,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===Wt&&(a.r=Ia(a.r),a.g=Ia(a.g),a.b=Ia(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===Wt&&(a.r=oo(a.r),a.g=oo(a.g),a.b=oo(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===rs?ef:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return ro("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return ro("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(a,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ju]:{primaries:e,whitePoint:i,transfer:ef,toXYZ:Z0,fromXYZ:K0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:e,whitePoint:i,transfer:Wt,toXYZ:Z0,fromXYZ:K0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),t}const Nt=A1();function Ia(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function oo(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let xr;class w1{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{xr===void 0&&(xr=nf("canvas")),xr.width=e.width,xr.height=e.height;const a=xr.getContext("2d");e instanceof ImageData?a.putImageData(e,0,0):a.drawImage(e,0,0,e.width,e.height),i=xr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=nf("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const a=i.getImageData(0,0,e.width,e.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Ia(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ia(n[i]/255)*255):n[i]=Ia(n[i]);return{data:n,width:e.width,height:e.height}}else return rt("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let R1=0;class eg{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:R1++}),this.uuid=ec(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayWidth,n.displayHeight,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(Sd(a[r].image)):s.push(Sd(a[r]))}else s=Sd(a);i.url=s}return n||(e.images[this.uuid]=i),i}}function Sd(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?w1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(rt("Texture: Unable to serialize Texture."),{})}let C1=0;const Md=new Q;class Yn extends dr{constructor(e=Yn.DEFAULT_IMAGE,n=Yn.DEFAULT_MAPPING,i=Ua,a=Ua,s=Vn,r=Xs,o=Zi,l=Oi,c=Yn.DEFAULT_ANISOTROPY,d=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:C1++}),this.uuid=ec(),this.name="",this.source=new eg(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Gt(0,0),this.repeat=new Gt(1,1),this.center=new Gt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Md).x}get height(){return this.source.getSize(Md).y}get depth(){return this.source.getSize(Md).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){rt(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){rt(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==lS)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case np:e.x=e.x-Math.floor(e.x);break;case Ua:e.x=e.x<0?0:1;break;case ip:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case np:e.y=e.y-Math.floor(e.y);break;case Ua:e.y=e.y<0?0:1;break;case ip:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Yn.DEFAULT_IMAGE=null;Yn.DEFAULT_MAPPING=lS;Yn.DEFAULT_ANISOTROPY=1;const lg=class lg{constructor(e=0,n=0,i=0,a=1){this.x=e,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,a){return this.x=e,this.y=n,this.z=i,this.w=a,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,a=this.z,s=this.w,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,a,s;const l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],E=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-E)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+E)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const S=(c+1)/2,y=(p+1)/2,U=(f+1)/2,A=(d+u)/4,T=(h+E)/4,M=(g+m)/4;return S>y&&S>U?S<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(S),a=A/i,s=T/i):y>U?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=A/a,s=M/a):U<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(U),i=T/s,a=M/s),this.set(i,a,s,n),this}let x=Math.sqrt((m-g)*(m-g)+(h-E)*(h-E)+(u-d)*(u-d));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-E)/x,this.z=(u-d)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ut(this.x,e.x,n.x),this.y=Ut(this.y,e.y,n.y),this.z=Ut(this.z,e.z,n.z),this.w=Ut(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ut(this.x,e,n),this.y=Ut(this.y,e,n),this.z=Ut(this.z,e,n),this.w=Ut(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ut(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};lg.prototype.isVector4=!0;let dn=lg;class D1 extends dr{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new dn(0,0,e,n),this.scissorTest=!1,this.viewport=new dn(0,0,e,n),this.textures=[];const a={width:e,height:n,depth:i.depth},s=new Yn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){const n={minFilter:Vn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=e,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},e.textures[n].image);this.textures[n].source=new eg(a)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ca extends D1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class gS extends Yn{constructor(e=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class N1 extends Yn{constructor(e=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const rf=class rf{constructor(e,n,i,a,s,r,o,l,c,d,h,u,p,g,E,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,a,s,r,o,l,c,d,h,u,p,g,E,m)}set(e,n,i,a,s,r,o,l,c,d,h,u,p,g,E,m){const f=this.elements;return f[0]=e,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=E,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new rf().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinantAffine()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const n=this.elements,i=e.elements,a=1/yr.setFromMatrixColumn(e,0).length(),s=1/yr.setFromMatrixColumn(e,1).length(),r=1/yr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,a=e.y,s=e.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),h=Math.sin(s);if(e.order==="XYZ"){const u=r*d,p=r*h,g=o*d,E=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=u-E*c,n[9]=-o*l,n[2]=E-u*c,n[6]=g+p*c,n[10]=r*l}else if(e.order==="YXZ"){const u=l*d,p=l*h,g=c*d,E=c*h;n[0]=u+E*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*h,n[5]=r*d,n[9]=-o,n[2]=p*o-g,n[6]=E+u*o,n[10]=r*l}else if(e.order==="ZXY"){const u=l*d,p=l*h,g=c*d,E=c*h;n[0]=u-E*o,n[4]=-r*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*d,n[9]=E-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(e.order==="ZYX"){const u=r*d,p=r*h,g=o*d,E=o*h;n[0]=l*d,n[4]=g*c-p,n[8]=u*c+E,n[1]=l*h,n[5]=E*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(e.order==="YZX"){const u=r*l,p=r*c,g=o*l,E=o*c;n[0]=l*d,n[4]=E-u*h,n[8]=g*h+p,n[1]=h,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*h+g,n[10]=u-E*h}else if(e.order==="XZY"){const u=r*l,p=r*c,g=o*l,E=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=u*h+E,n[5]=r*d,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*d,n[10]=E*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(U1,e,L1)}lookAt(e,n,i){const a=this.elements;return ci.subVectors(e,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),Ya.crossVectors(i,ci),Ya.lengthSq()===0&&(Math.abs(i.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),Ya.crossVectors(i,ci)),Ya.normalize(),yc.crossVectors(ci,Ya),a[0]=Ya.x,a[4]=yc.x,a[8]=ci.x,a[1]=Ya.y,a[5]=yc.y,a[9]=ci.y,a[2]=Ya.z,a[6]=yc.z,a[10]=ci.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],E=i[6],m=i[10],f=i[14],x=i[3],S=i[7],y=i[11],U=i[15],A=a[0],T=a[4],M=a[8],D=a[12],L=a[1],z=a[5],H=a[9],X=a[13],N=a[2],B=a[6],P=a[10],F=a[14],I=a[3],j=a[7],me=a[11],Ae=a[15];return s[0]=r*A+o*L+l*N+c*I,s[4]=r*T+o*z+l*B+c*j,s[8]=r*M+o*H+l*P+c*me,s[12]=r*D+o*X+l*F+c*Ae,s[1]=d*A+h*L+u*N+p*I,s[5]=d*T+h*z+u*B+p*j,s[9]=d*M+h*H+u*P+p*me,s[13]=d*D+h*X+u*F+p*Ae,s[2]=g*A+E*L+m*N+f*I,s[6]=g*T+E*z+m*B+f*j,s[10]=g*M+E*H+m*P+f*me,s[14]=g*D+E*X+m*F+f*Ae,s[3]=x*A+S*L+y*N+U*I,s[7]=x*T+S*z+y*B+U*j,s[11]=x*M+S*H+y*P+U*me,s[15]=x*D+S*X+y*F+U*Ae,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],p=e[14],g=e[3],E=e[7],m=e[11],f=e[15],x=l*p-c*u,S=o*p-c*h,y=o*u-l*h,U=r*p-c*d,A=r*u-l*d,T=r*h-o*d;return n*(E*x-m*S+f*y)-i*(g*x-m*U+f*A)+a*(g*S-E*U+f*T)-s*(g*y-E*A+m*T)}determinantAffine(){const e=this.elements,n=e[0],i=e[4],a=e[8],s=e[1],r=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return n*(r*d-o*c)-i*(s*d-o*l)+a*(s*c-r*l)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const a=this.elements;return e.isVector3?(a[12]=e.x,a[13]=e.y,a[14]=e.z):(a[12]=e,a[13]=n,a[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],a=e[2],s=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],p=e[11],g=e[12],E=e[13],m=e[14],f=e[15],x=n*o-i*r,S=n*l-a*r,y=n*c-s*r,U=i*l-a*o,A=i*c-s*o,T=a*c-s*l,M=d*E-h*g,D=d*m-u*g,L=d*f-p*g,z=h*m-u*E,H=h*f-p*E,X=u*f-p*m,N=x*X-S*H+y*z+U*L-A*D+T*M;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/N;return e[0]=(o*X-l*H+c*z)*B,e[1]=(a*H-i*X-s*z)*B,e[2]=(E*T-m*A+f*U)*B,e[3]=(u*A-h*T-p*U)*B,e[4]=(l*L-r*X-c*D)*B,e[5]=(n*X-a*L+s*D)*B,e[6]=(m*y-g*T-f*S)*B,e[7]=(d*T-u*y+p*S)*B,e[8]=(r*H-o*L+c*M)*B,e[9]=(i*L-n*H-s*M)*B,e[10]=(g*A-E*y+f*x)*B,e[11]=(h*y-d*A-p*x)*B,e[12]=(o*D-r*z-l*M)*B,e[13]=(n*z-i*D+a*M)*B,e[14]=(E*S-g*U-m*x)*B,e[15]=(d*U-h*S+u*x)*B,this}scale(e){const n=this.elements,i=e.x,a=e.y,s=e.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],a=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=e.x,o=e.y,l=e.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,a,s,r){return this.set(1,i,s,0,e,1,r,0,n,a,1,0,0,0,0,1),this}compose(e,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,d=r+r,h=o+o,u=s*c,p=s*d,g=s*h,E=r*d,m=r*h,f=o*h,x=l*c,S=l*d,y=l*h,U=i.x,A=i.y,T=i.z;return a[0]=(1-(E+f))*U,a[1]=(p+y)*U,a[2]=(g-S)*U,a[3]=0,a[4]=(p-y)*A,a[5]=(1-(u+f))*A,a[6]=(m+x)*A,a[7]=0,a[8]=(g+S)*T,a[9]=(m-x)*T,a[10]=(1-(u+E))*T,a[11]=0,a[12]=e.x,a[13]=e.y,a[14]=e.z,a[15]=1,this}decompose(e,n,i){const a=this.elements;e.x=a[12],e.y=a[13],e.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=yr.set(a[0],a[1],a[2]).length();const o=yr.set(a[4],a[5],a[6]).length(),l=yr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Xi.copy(this);const c=1/r,d=1/o,h=1/l;return Xi.elements[0]*=c,Xi.elements[1]*=c,Xi.elements[2]*=c,Xi.elements[4]*=d,Xi.elements[5]*=d,Xi.elements[6]*=d,Xi.elements[8]*=h,Xi.elements[9]*=h,Xi.elements[10]*=h,n.setFromRotationMatrix(Xi),i.x=r,i.y=o,i.z=l,this}makePerspective(e,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2*s/(n-e),h=2*s/(i-a),u=(n+e)/(n-e),p=(i+a)/(i-a);let g,E;if(l)g=s/(r-s),E=r*s/(r-s);else if(o===ra)g=-(r+s)/(r-s),E=-2*r*s/(r-s);else if(o===tf)g=-r/(r-s),E=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=E,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2/(n-e),h=2/(i-a),u=-(n+e)/(n-e),p=-(i+a)/(i-a);let g,E;if(l)g=1/(r-s),E=r/(r-s);else if(o===ra)g=-2/(r-s),E=-(r+s)/(r-s);else if(o===tf)g=-1/(r-s),E=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=E,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}};rf.prototype.isMatrix4=!0;let nn=rf;const yr=new Q,Xi=new nn,U1=new Q(0,0,0),L1=new Q(1,1,1),Ya=new Q,yc=new Q,ci=new Q,$0=new nn,Q0=new Lo;class sr{constructor(e=0,n=0,i=0,a=sr.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,a=this._order){return this._x=e,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const a=e.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],h=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Ut(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:rt("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return $0.makeRotationFromQuaternion(e),this.setFromRotationMatrix($0,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Q0.setFromEuler(this),this.setFromQuaternion(Q0,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sr.DEFAULT_ORDER="XYZ";class vS{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let O1=0;const J0=new Q,Sr=new Lo,xa=new nn,Sc=new Q,jo=new Q,P1=new Q,z1=new Lo,ev=new Q(1,0,0),tv=new Q(0,1,0),nv=new Q(0,0,1),iv={type:"added"},I1={type:"removed"},Mr={type:"childadded",child:null},bd={type:"childremoved",child:null};class Zn extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:O1++}),this.uuid=ec(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zn.DEFAULT_UP.clone();const e=new Q,n=new sr,i=new Lo,a=new Q(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new nn},normalMatrix:{value:new ht}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=Zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Sr.setFromAxisAngle(e,n),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(e,n){return Sr.setFromAxisAngle(e,n),this.quaternion.premultiply(Sr),this}rotateX(e){return this.rotateOnAxis(ev,e)}rotateY(e){return this.rotateOnAxis(tv,e)}rotateZ(e){return this.rotateOnAxis(nv,e)}translateOnAxis(e,n){return J0.copy(e).applyQuaternion(this.quaternion),this.position.add(J0.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(ev,e)}translateY(e){return this.translateOnAxis(tv,e)}translateZ(e){return this.translateOnAxis(nv,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Sc.copy(e):Sc.set(e,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),jo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(jo,Sc,this.up):xa.lookAt(Sc,jo,this.up),this.quaternion.setFromRotationMatrix(xa),a&&(xa.extractRotation(a.matrixWorld),Sr.setFromRotationMatrix(xa),this.quaternion.premultiply(Sr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(zt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(iv),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null):zt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(I1),bd.child=e,this.dispatchEvent(bd),bd.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),xa.multiply(e.parent.matrixWorld)),e.applyMatrix4(xa),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(iv),Mr.child=e,this.dispatchEvent(Mr),Mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(e,n);if(r!==void 0)return r}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jo,e,P1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(jo,z1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,a=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n,i=!1){const a=this.parent;if(e===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(e),a.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(e.shapes,h)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));a.material=o}else a.material=s(e.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(e.animations,l))}}if(n){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),h=r(e.shapes),u=r(e.skeletons),p=r(e.animations),g=r(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const a=e.children[i];this.add(a.clone())}return this}}Zn.DEFAULT_UP=new Q(0,1,0);Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Mc extends Zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const B1={type:"move"};class Ed{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Mc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Mc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Q,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Q),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Mc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Q,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Q,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const E of e.hand.values()){const m=n.getJointPose(E,i),f=this._getHandJoint(c,E);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(a=n.getPose(e.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(B1)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Mc;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const _S={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Za={h:0,s:0,l:0},bc={h:0,s:0,l:0};function Td(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class At{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const a=e;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Ai){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Nt.colorSpaceToWorking(this,n),this}setRGB(e,n,i,a=Nt.workingColorSpace){return this.r=e,this.g=n,this.b=i,Nt.colorSpaceToWorking(this,a),this}setHSL(e,n,i,a=Nt.workingColorSpace){if(e=T1(e,1),n=Ut(n,0,1),i=Ut(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Td(r,s,e+1/3),this.g=Td(r,s,e),this.b=Td(r,s,e-1/3)}return Nt.colorSpaceToWorking(this,a),this}setStyle(e,n=Ai){function i(s){s!==void 0&&parseFloat(s)<1&&rt("Color: Alpha component of "+e+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:rt("Color: Unknown color model "+e)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);rt("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Ai){const i=_S[e.toLowerCase()];return i!==void 0?this.setHex(i,n):rt("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ia(e.r),this.g=Ia(e.g),this.b=Ia(e.b),this}copyLinearToSRGB(e){return this.r=oo(e.r),this.g=oo(e.g),this.b=oo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ai){return Nt.workingToColorSpace(kn.copy(this),e),Math.round(Ut(kn.r*255,0,255))*65536+Math.round(Ut(kn.g*255,0,255))*256+Math.round(Ut(kn.b*255,0,255))}getHexString(e=Ai){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Nt.workingColorSpace){Nt.workingToColorSpace(kn.copy(this),n);const i=kn.r,a=kn.g,s=kn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=d<=.5?h/(r+o):h/(2-r-o),r){case i:l=(a-s)/h+(a<s?6:0);break;case a:l=(s-i)/h+2;break;case s:l=(i-a)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,n=Nt.workingColorSpace){return Nt.workingToColorSpace(kn.copy(this),n),e.r=kn.r,e.g=kn.g,e.b=kn.b,e}getStyle(e=Ai){Nt.workingToColorSpace(kn.copy(this),e);const n=kn.r,i=kn.g,a=kn.b;return e!==Ai?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(e,n,i){return this.getHSL(Za),this.setHSL(Za.h+e,Za.s+n,Za.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Za),e.getHSL(bc);const i=_d(Za.h,bc.h,n),a=_d(Za.s,bc.s,n),s=_d(Za.l,bc.l,n);return this.setHSL(i,a,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,a=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const kn=new At;At.NAMES=_S;class tg{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new At(e),this.density=n}clone(){return new tg(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xS extends Zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sr,this.environmentIntensity=1,this.environmentRotation=new sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Wi=new Q,ya=new Q,Ad=new Q,Sa=new Q,br=new Q,Er=new Q,av=new Q,wd=new Q,Rd=new Q,Cd=new Q,Dd=new dn,Nd=new dn,Ud=new dn;class Pi{constructor(e=new Q,n=new Q,i=new Q){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,a){a.subVectors(i,n),Wi.subVectors(e,n),a.cross(Wi);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(e,n,i,a,s){Wi.subVectors(a,n),ya.subVectors(i,n),Ad.subVectors(e,n);const r=Wi.dot(Wi),o=Wi.dot(ya),l=Wi.dot(Ad),c=ya.dot(ya),d=ya.dot(Ad),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*d)*u,g=(r*d-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(e,n,i,a){return this.getBarycoord(e,n,i,a,Sa)===null?!1:Sa.x>=0&&Sa.y>=0&&Sa.x+Sa.y<=1}static getInterpolation(e,n,i,a,s,r,o,l){return this.getBarycoord(e,n,i,a,Sa)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sa.x),l.addScaledVector(r,Sa.y),l.addScaledVector(o,Sa.z),l)}static getInterpolatedAttribute(e,n,i,a,s,r){return Dd.setScalar(0),Nd.setScalar(0),Ud.setScalar(0),Dd.fromBufferAttribute(e,n),Nd.fromBufferAttribute(e,i),Ud.fromBufferAttribute(e,a),r.setScalar(0),r.addScaledVector(Dd,s.x),r.addScaledVector(Nd,s.y),r.addScaledVector(Ud,s.z),r}static isFrontFacing(e,n,i,a){return Wi.subVectors(i,n),ya.subVectors(e,n),Wi.cross(ya).dot(a)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,a){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[a]),this}setFromAttributeAndIndices(e,n,i,a){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,a),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wi.subVectors(this.c,this.b),ya.subVectors(this.a,this.b),Wi.cross(ya).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Pi.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Pi.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,a,s){return Pi.getInterpolation(e,this.a,this.b,this.c,n,i,a,s)}containsPoint(e){return Pi.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Pi.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,a=this.b,s=this.c;let r,o;br.subVectors(a,i),Er.subVectors(s,i),wd.subVectors(e,i);const l=br.dot(wd),c=Er.dot(wd);if(l<=0&&c<=0)return n.copy(i);Rd.subVectors(e,a);const d=br.dot(Rd),h=Er.dot(Rd);if(d>=0&&h<=d)return n.copy(a);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(br,r);Cd.subVectors(e,s);const p=br.dot(Cd),g=Er.dot(Cd);if(g>=0&&p<=g)return n.copy(s);const E=p*c-l*g;if(E<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Er,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return av.subVectors(s,a),o=(h-d)/(h-d+(p-g)),n.copy(a).addScaledVector(av,o);const f=1/(m+E+u);return r=E*f,o=u*f,n.copy(i).addScaledVector(br,r).addScaledVector(Er,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class hr{constructor(e=new Q(1/0,1/0,1/0),n=new Q(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(ji.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(ji.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=ji.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,ji):ji.fromBufferAttribute(s,r),ji.applyMatrix4(e.matrixWorld),this.expandByPoint(ji);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ec.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ec.copy(i.boundingBox)),Ec.applyMatrix4(e.matrixWorld),this.union(Ec)}const a=e.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,ji),ji.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qo),Tc.subVectors(this.max,qo),Tr.subVectors(e.a,qo),Ar.subVectors(e.b,qo),wr.subVectors(e.c,qo),Ka.subVectors(Ar,Tr),$a.subVectors(wr,Ar),Ls.subVectors(Tr,wr);let n=[0,-Ka.z,Ka.y,0,-$a.z,$a.y,0,-Ls.z,Ls.y,Ka.z,0,-Ka.x,$a.z,0,-$a.x,Ls.z,0,-Ls.x,-Ka.y,Ka.x,0,-$a.y,$a.x,0,-Ls.y,Ls.x,0];return!Ld(n,Tr,Ar,wr,Tc)||(n=[1,0,0,0,1,0,0,0,1],!Ld(n,Tr,Ar,wr,Tc))?!1:(Ac.crossVectors(Ka,$a),n=[Ac.x,Ac.y,Ac.z],Ld(n,Tr,Ar,wr,Tc))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,ji).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(ji).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ma),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const Ma=[new Q,new Q,new Q,new Q,new Q,new Q,new Q,new Q],ji=new Q,Ec=new hr,Tr=new Q,Ar=new Q,wr=new Q,Ka=new Q,$a=new Q,Ls=new Q,qo=new Q,Tc=new Q,Ac=new Q,Os=new Q;function Ld(t,e,n,i,a){for(let s=0,r=t.length-3;s<=r;s+=3){Os.fromArray(t,s);const o=a.x*Math.abs(Os.x)+a.y*Math.abs(Os.y)+a.z*Math.abs(Os.z),l=e.dot(Os),c=n.dot(Os),d=i.dot(Os);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const mn=new Q,wc=new Gt;let F1=0;class Xt extends dr{constructor(e,n,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:F1++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=X0,this.updateRanges=[],this.gpuType=Yi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[e+a]=n.array[i+a];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)wc.fromBufferAttribute(this,n),wc.applyMatrix3(e),this.setXY(n,wc.x,wc.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(e),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Wo(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=ti(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Wo(n,this.array)),n}setX(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Wo(n,this.array)),n}setY(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Wo(n,this.array)),n}setZ(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Wo(n,this.array)),n}setW(e,n){return this.normalized&&(n=ti(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=ti(n,this.array),i=ti(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,a){return e*=this.itemSize,this.normalized&&(n=ti(n,this.array),i=ti(i,this.array),a=ti(a,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this}setXYZW(e,n,i,a,s){return e*=this.itemSize,this.normalized&&(n=ti(n,this.array),i=ti(i,this.array),a=ti(a,this.array),s=ti(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=a,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==X0&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:"dispose"})}}class yS extends Xt{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class SS extends Xt{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Bi extends Xt{constructor(e,n,i){super(new Float32Array(e),n,i)}}const H1=new hr,Yo=new Q,Od=new Q;class pr{constructor(e=new Q,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):H1.setFromPoints(e).getCenter(i);let a=0;for(let s=0,r=e.length;s<r;s++)a=Math.max(a,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(a),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Yo.subVectors(e,this.center);const n=Yo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Yo,a/i),this.radius+=a}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Od.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Yo.copy(e.center).add(Od)),this.expandByPoint(Yo.copy(e.center).sub(Od))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let G1=0;const Ei=new nn,Pd=new Zn,Rr=new Q,ui=new hr,Zo=new hr,Tn=new Q;class Xn extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:G1++}),this.uuid=ec(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(S1(e)?SS:yS)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ht().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(e),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ei.makeRotationFromQuaternion(e),this.applyMatrix4(Ei),this}rotateX(e){return Ei.makeRotationX(e),this.applyMatrix4(Ei),this}rotateY(e){return Ei.makeRotationY(e),this.applyMatrix4(Ei),this}rotateZ(e){return Ei.makeRotationZ(e),this.applyMatrix4(Ei),this}translate(e,n,i){return Ei.makeTranslation(e,n,i),this.applyMatrix4(Ei),this}scale(e,n,i){return Ei.makeScale(e,n,i),this.applyMatrix4(Ei),this}lookAt(e){return Pd.lookAt(e),Pd.updateMatrix(),this.applyMatrix4(Pd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Rr).negate(),this.translate(Rr.x,Rr.y,Rr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=e.length;a<s;a++){const r=e[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Bi(i,3))}else{const i=Math.min(e.length,n.count);for(let a=0;a<i;a++){const s=e[a];n.setXYZ(a,s.x,s.y,s.z||0)}e.length>n.count&&rt("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){zt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Q(-1/0,-1/0,-1/0),new Q(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];ui.setFromBufferAttribute(s),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&zt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pr);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){zt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Q,1/0);return}if(e){const i=this.boundingSphere.center;if(ui.setFromBufferAttribute(e),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Zo.setFromBufferAttribute(o),this.morphTargetsRelative?(Tn.addVectors(ui.min,Zo.min),ui.expandByPoint(Tn),Tn.addVectors(ui.max,Zo.max),ui.expandByPoint(Tn)):(ui.expandByPoint(Zo.min),ui.expandByPoint(Zo.max))}ui.getCenter(i);let a=0;for(let s=0,r=e.count;s<r;s++)Tn.fromBufferAttribute(e,s),a=Math.max(a,i.distanceToSquared(Tn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Tn.fromBufferAttribute(o,c),l&&(Rr.fromBufferAttribute(e,c),Tn.add(Rr)),a=Math.max(a,i.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&zt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){zt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new Xt(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let M=0;M<i.count;M++)o[M]=new Q,l[M]=new Q;const c=new Q,d=new Q,h=new Q,u=new Gt,p=new Gt,g=new Gt,E=new Q,m=new Q;function f(M,D,L){c.fromBufferAttribute(i,M),d.fromBufferAttribute(i,D),h.fromBufferAttribute(i,L),u.fromBufferAttribute(s,M),p.fromBufferAttribute(s,D),g.fromBufferAttribute(s,L),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const z=1/(p.x*g.y-g.x*p.y);isFinite(z)&&(E.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(z),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(z),o[M].add(E),o[D].add(E),o[L].add(E),l[M].add(m),l[D].add(m),l[L].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let M=0,D=x.length;M<D;++M){const L=x[M],z=L.start,H=L.count;for(let X=z,N=z+H;X<N;X+=3)f(e.getX(X+0),e.getX(X+1),e.getX(X+2))}const S=new Q,y=new Q,U=new Q,A=new Q;function T(M){U.fromBufferAttribute(a,M),A.copy(U);const D=o[M];S.copy(D),S.sub(U.multiplyScalar(U.dot(D))).normalize(),y.crossVectors(A,D);const z=y.dot(l[M])<0?-1:1;r.setXYZW(M,S.x,S.y,S.z,z)}for(let M=0,D=x.length;M<D;++M){const L=x[M],z=L.start,H=L.count;for(let X=z,N=z+H;X<N;X+=3)T(e.getX(X+0)),T(e.getX(X+1)),T(e.getX(X+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new Xt(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new Q,s=new Q,r=new Q,o=new Q,l=new Q,c=new Q,d=new Q,h=new Q;if(e)for(let u=0,p=e.count;u<p;u+=3){const g=e.getX(u+0),E=e.getX(u+1),m=e.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,E),r.fromBufferAttribute(n,m),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,E),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(E,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Tn.fromBufferAttribute(e,n),Tn.normalize(),e.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let E=0,m=l.length;E<m;E++){o.isInterleavedBufferAttribute?p=l[E]*o.data.stride+o.offset:p=l[E]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new Xt(u,d,h)}if(this.index===null)return rt("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Xn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=e(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=e(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];e.data.attributes[l]=c.toJSON(e.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(e.data))}d.length>0&&(a[l]=d,s=!0)}s&&(e.data.morphAttributes=a,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const a=e.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const s=e.morphAttributes;for(const c in s){const d=[],h=s[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let k1=0;class Oo extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:k1++}),this.uuid=ec(),this.name="",this.type="Material",this.blending=$s,this.side=ws,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=qh,this.blendDst=Yh,this.blendEquation=ks,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new At(0,0,0),this.blendAlpha=0,this.depthFunc=yo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=V0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){rt(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){rt(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==$s&&(i.blending=this.blending),this.side!==ws&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==qh&&(i.blendSrc=this.blendSrc),this.blendDst!==Yh&&(i.blendDst=this.blendDst),this.blendEquation!==ks&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==yo&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==V0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_r&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_r&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_r&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(e.textures),r=a(e.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(e,n){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new At().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=n[e.map]||null),e.matcap!==void 0&&(this.matcap=n[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=n[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=n[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=n[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Gt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=n[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=n[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=n[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=n[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=n[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=n[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=n[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=n[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=n[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=n[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=n[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Gt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=n[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=n[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=n[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=n[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=n[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const ba=new Q,zd=new Q,Rc=new Q,Qa=new Q,Id=new Q,Cc=new Q,Bd=new Q;class ng{constructor(e=new Q,n=new Q(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ba)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=ba.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(ba.copy(this.origin).addScaledVector(this.direction,n),ba.distanceToSquared(e))}distanceSqToSegment(e,n,i,a){zd.copy(e).add(n).multiplyScalar(.5),Rc.copy(n).sub(e).normalize(),Qa.copy(this.origin).sub(zd);const s=e.distanceTo(n)*.5,r=-this.direction.dot(Rc),o=Qa.dot(this.direction),l=-Qa.dot(Rc),c=Qa.lengthSq(),d=Math.abs(1-r*r);let h,u,p,g;if(d>0)if(h=r*l-o,u=r*o-l,g=s*d,h>=0)if(u>=-g)if(u<=g){const E=1/d;h*=E,u*=E,p=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(zd).addScaledVector(Rc,u),p}intersectSphere(e,n){ba.subVectors(e.center,this.origin);const i=ba.dot(this.direction),a=ba.dot(ba)-i*i,s=e.radius*e.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,a=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,a=(e.min.x-u.x)*c),d>=0?(s=(e.min.y-u.y)*d,r=(e.max.y-u.y)*d):(s=(e.max.y-u.y)*d,r=(e.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(e){return this.intersectBox(e,ba)!==null}intersectTriangle(e,n,i,a,s){Id.subVectors(n,e),Cc.subVectors(i,e),Bd.crossVectors(Id,Cc);let r=this.direction.dot(Bd),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Qa.subVectors(this.origin,e);const l=o*this.direction.dot(Cc.crossVectors(Qa,Cc));if(l<0)return null;const c=o*this.direction.dot(Id.cross(Qa));if(c<0||l+c>r)return null;const d=-o*Qa.dot(Bd);return d<0?null:this.at(d/r,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class MS extends Oo{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new At(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.combine=eS,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const sv=new nn,Ps=new ng,Dc=new pr,rv=new Q,Nc=new Q,Uc=new Q,Lc=new Q,Fd=new Q,Oc=new Q,ov=new Q,Pc=new Q;class Hi extends Zn{constructor(e=new Xn,n=new MS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,e);const o=this.morphTargetInfluences;if(s&&o){Oc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Fd.fromBufferAttribute(h,e),r?Oc.addScaledVector(Fd,d):Oc.addScaledVector(Fd.sub(n),d))}n.add(Oc)}return n}raycast(e,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Dc.copy(i.boundingSphere),Dc.applyMatrix4(s),Ps.copy(e.ray).recast(e.near),!(Dc.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(Dc,rv)===null||Ps.origin.distanceToSquared(rv)>(e.far-e.near)**2))&&(sv.copy(s).invert(),Ps.copy(e.ray).applyMatrix4(sv),!(i.boundingBox!==null&&Ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ps)))}_computeIntersections(e,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,E=u.length;g<E;g++){const m=u[g],f=r[m.materialIndex],x=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,U=S;y<U;y+=3){const A=o.getX(y),T=o.getX(y+1),M=o.getX(y+2);a=zc(this,f,e,i,c,d,h,A,T,M),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),E=Math.min(o.count,p.start+p.count);for(let m=g,f=E;m<f;m+=3){const x=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);a=zc(this,r,e,i,c,d,h,x,S,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,E=u.length;g<E;g++){const m=u[g],f=r[m.materialIndex],x=Math.max(m.start,p.start),S=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,U=S;y<U;y+=3){const A=y,T=y+1,M=y+2;a=zc(this,f,e,i,c,d,h,A,T,M),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),E=Math.min(l.count,p.start+p.count);for(let m=g,f=E;m<f;m+=3){const x=m,S=m+1,y=m+2;a=zc(this,r,e,i,c,d,h,x,S,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function V1(t,e,n,i,a,s,r,o){let l;if(e.side===si?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,e.side===ws,o),l===null)return null;Pc.copy(o),Pc.applyMatrix4(t.matrixWorld);const c=n.ray.origin.distanceTo(Pc);return c<n.near||c>n.far?null:{distance:c,point:Pc.clone(),object:t}}function zc(t,e,n,i,a,s,r,o,l,c){t.getVertexPosition(o,Nc),t.getVertexPosition(l,Uc),t.getVertexPosition(c,Lc);const d=V1(t,e,n,i,Nc,Uc,Lc,ov);if(d){const h=new Q;Pi.getBarycoord(ov,Nc,Uc,Lc,h),a&&(d.uv=Pi.getInterpolatedAttribute(a,o,l,c,h,new Gt)),s&&(d.uv1=Pi.getInterpolatedAttribute(s,o,l,c,h,new Gt)),r&&(d.normal=Pi.getInterpolatedAttribute(r,o,l,c,h,new Q),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new Q,materialIndex:0};Pi.getNormal(Nc,Uc,Lc,u.normal),d.face=u,d.barycoord=h}return d}class bS extends Yn{constructor(e=null,n=1,i=1,a,s,r,o,l,c=In,d=In,h,u){super(null,r,o,l,c,d,a,s,h,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class $r extends Xt{constructor(e,n,i,a=1){super(e,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Cr=new nn,lv=new nn,Ic=[],cv=new hr,X1=new nn,Ko=new Hi,$o=new pr;class uv extends Hi{constructor(e,n,i){super(e,n),this.isInstancedMesh=!0,this.instanceMatrix=new $r(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,X1)}computeBoundingBox(){const e=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new hr),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Cr),cv.copy(e.boundingBox).applyMatrix4(Cr),this.boundingBox.union(cv)}computeBoundingSphere(){const e=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new pr),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,Cr),$o.copy(e.boundingSphere).applyMatrix4(Cr),this.boundingSphere.union($o)}copy(e,n){return super.copy(e,n),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,n){return n.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=e*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(e,n){const i=this.matrixWorld,a=this.count;if(Ko.geometry=this.geometry,Ko.material=this.material,Ko.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),$o.copy(this.boundingSphere),$o.applyMatrix4(i),e.ray.intersectsSphere($o)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,Cr),lv.multiplyMatrices(i,Cr),Ko.matrixWorld=lv,Ko.raycast(e,Ic);for(let r=0,o=Ic.length;r<o;r++){const l=Ic[r];l.instanceId=s,l.object=this,n.push(l)}Ic.length=0}}setColorAt(e,n){return this.instanceColor===null&&(this.instanceColor=new $r(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,n){return n.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new bS(new Float32Array(a*this.count),a,this.count,Ym,Yi));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*e;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Hd=new Q,W1=new Q,j1=new ht;class Gs{constructor(e=new Q(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,a){return this.normal.set(e,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const a=Hd.subVectors(i,n).cross(W1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n,i=!0){const a=e.delta(Hd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(e.start).addScaledVector(a,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||j1.getNormalMatrix(e),a=this.coplanarPoint(Hd).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zs=new pr,q1=new Gt(.5,.5),Bc=new Q;class ES{constructor(e=new Gs,n=new Gs,i=new Gs,a=new Gs,s=new Gs,r=new Gs){this.planes=[e,n,i,a,s,r]}set(e,n,i,a,s,r){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ra,i=!1){const a=this.planes,s=e.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],h=s[5],u=s[6],p=s[7],g=s[8],E=s[9],m=s[10],f=s[11],x=s[12],S=s[13],y=s[14],U=s[15];if(a[0].setComponents(c-r,p-d,f-g,U-x).normalize(),a[1].setComponents(c+r,p+d,f+g,U+x).normalize(),a[2].setComponents(c+o,p+h,f+E,U+S).normalize(),a[3].setComponents(c-o,p-h,f-E,U-S).normalize(),i)a[4].setComponents(l,u,m,y).normalize(),a[5].setComponents(c-l,p-u,f-m,U-y).normalize();else if(a[4].setComponents(c-l,p-u,f-m,U-y).normalize(),n===ra)a[5].setComponents(c+l,p+u,f+m,U+y).normalize();else if(n===tf)a[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),zs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(e){zs.center.set(0,0,0);const n=q1.distanceTo(e.center);return zs.radius=.7071067811865476+n,zs.applyMatrix4(e.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(e){const n=this.planes,i=e.center,a=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Bc.x=a.normal.x>0?e.max.x:e.min.x,Bc.y=a.normal.y>0?e.max.y:e.min.y,Bc.z=a.normal.z>0?e.max.z:e.min.z,a.distanceToPoint(Bc)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class TS extends Oo{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new At(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const af=new Q,sf=new Q,fv=new nn,Qo=new ng,Fc=new pr,Gd=new Q,dv=new Q;class Y1 extends Zn{constructor(e=new Xn,n=new TS){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)af.fromBufferAttribute(n,a-1),sf.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=af.distanceTo(sf);e.setAttribute("lineDistance",new Bi(i,1))}else rt("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Fc.copy(i.boundingSphere),Fc.applyMatrix4(a),Fc.radius+=s,e.ray.intersectsSphere(Fc)===!1)return;fv.copy(a).invert(),Qo.copy(e.ray).applyMatrix4(fv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let E=p,m=g-1;E<m;E+=c){const f=d.getX(E),x=d.getX(E+1),S=Hc(this,e,Qo,l,f,x,E);S&&n.push(S)}if(this.isLineLoop){const E=d.getX(g-1),m=d.getX(p),f=Hc(this,e,Qo,l,E,m,g-1);f&&n.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let E=p,m=g-1;E<m;E+=c){const f=Hc(this,e,Qo,l,E,E+1,E);f&&n.push(f)}if(this.isLineLoop){const E=Hc(this,e,Qo,l,g-1,p,g-1);E&&n.push(E)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Hc(t,e,n,i,a,s,r){const o=t.geometry.attributes.position;if(af.fromBufferAttribute(o,a),sf.fromBufferAttribute(o,s),n.distanceSqToSegment(af,sf,Gd,dv)>i)return;Gd.applyMatrix4(t.matrixWorld);const c=e.ray.origin.distanceTo(Gd);if(!(c<e.near||c>e.far))return{distance:c,point:dv.clone().applyMatrix4(t.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:t}}const hv=new Q,pv=new Q;class _u extends Y1{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)hv.fromBufferAttribute(n,a),pv.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+hv.distanceTo(pv);e.setAttribute("lineDistance",new Bi(i,1))}else rt("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Z1 extends Oo{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new At(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const mv=new nn,Pp=new ng,Gc=new pr,kc=new Q;class zp extends Zn{constructor(e=new Xn,n=new Z1){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,a=this.matrixWorld,s=e.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Gc.copy(i.boundingSphere),Gc.applyMatrix4(a),Gc.radius+=s,e.ray.intersectsSphere(Gc)===!1)return;mv.copy(a).invert(),Pp.copy(e.ray).applyMatrix4(mv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,E=p;g<E;g++){const m=c.getX(g);kc.fromBufferAttribute(h,m),gv(kc,m,l,a,e,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let g=u,E=p;g<E;g++)kc.fromBufferAttribute(h,g),gv(kc,g,l,a,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function gv(t,e,n,i,a,s,r){const o=Pp.distanceSqToPoint(t);if(o<n){const l=new Q;Pp.closestPointToPoint(t,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class AS extends Yn{constructor(e=[],n=ir,i,a,s,r,o,l,c,d){super(e,n,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Mo extends Yn{constructor(e,n,i=ua,a,s,r,o=In,l=In,c,d=Xa,h=1){if(d!==Xa&&d!==Ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:h};super(u,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new eg(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class K1 extends Mo{constructor(e,n=ua,i=ir,a,s,r=In,o=In,l,c=Xa){const d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,n,i,a,s,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class wS extends Yn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class rr extends Xn{constructor(e=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,e,r,s,0),g("z","y","x",1,-1,i,n,-e,r,s,1),g("x","z","y",1,1,e,i,n,a,r,2),g("x","z","y",1,-1,e,i,-n,a,r,3),g("x","y","z",1,-1,e,n,i,a,s,4),g("x","y","z",-1,-1,e,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new Bi(c,3)),this.setAttribute("normal",new Bi(d,3)),this.setAttribute("uv",new Bi(h,2));function g(E,m,f,x,S,y,U,A,T,M,D){const L=y/T,z=U/M,H=y/2,X=U/2,N=A/2,B=T+1,P=M+1;let F=0,I=0;const j=new Q;for(let me=0;me<P;me++){const Ae=me*z-X;for(let Ee=0;Ee<B;Ee++){const Qe=Ee*L-H;j[E]=Qe*x,j[m]=Ae*S,j[f]=N,c.push(j.x,j.y,j.z),j[E]=0,j[m]=0,j[f]=A>0?1:-1,d.push(j.x,j.y,j.z),h.push(Ee/T),h.push(1-me/M),F+=1}}for(let me=0;me<M;me++)for(let Ae=0;Ae<T;Ae++){const Ee=u+Ae+B*me,Qe=u+Ae+B*(me+1),Je=u+(Ae+1)+B*(me+1),et=u+(Ae+1)+B*me;l.push(Ee,Qe,et),l.push(Qe,Je,et),I+=6}o.addGroup(p,I,D),p+=I,u+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new rr(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}const Vc=new Q,Xc=new Q,kd=new Q,Wc=new Pi;class $1 extends Xn{constructor(e=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:n},e!==null){const a=Math.pow(10,4),s=Math.cos(vu*n),r=e.getIndex(),o=e.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:E,b:m,c:f}=Wc;if(E.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Wc.getNormal(kd),h[0]=`${Math.round(E.x*a)},${Math.round(E.y*a)},${Math.round(E.z*a)}`,h[1]=`${Math.round(m.x*a)},${Math.round(m.y*a)},${Math.round(m.z*a)}`,h[2]=`${Math.round(f.x*a)},${Math.round(f.y*a)},${Math.round(f.z*a)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let x=0;x<3;x++){const S=(x+1)%3,y=h[x],U=h[S],A=Wc[d[x]],T=Wc[d[S]],M=`${y}_${U}`,D=`${U}_${y}`;D in u&&u[D]?(kd.dot(u[D].normal)<=s&&(p.push(A.x,A.y,A.z),p.push(T.x,T.y,T.z)),u[D]=null):M in u||(u[M]={index0:c[x],index1:c[S],normal:kd.clone()})}}for(const g in u)if(u[g]){const{index0:E,index1:m}=u[g];Vc.fromBufferAttribute(o,E),Xc.fromBufferAttribute(o,m),p.push(Vc.x,Vc.y,Vc.z),p.push(Xc.x,Xc.y,Xc.z)}this.setAttribute("position",new Bi(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}}class wf extends Xn{constructor(e=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:a};const s=e/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,h=e/o,u=n/l,p=[],g=[],E=[],m=[];for(let f=0;f<d;f++){const x=f*u-r;for(let S=0;S<c;S++){const y=S*h-s;g.push(y,-x,0),E.push(0,0,1),m.push(S/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<o;x++){const S=x+c*f,y=x+c*(f+1),U=x+1+c*(f+1),A=x+1+c*f;p.push(S,y,A),p.push(y,U,A)}this.setIndex(p),this.setAttribute("position",new Bi(g,3)),this.setAttribute("normal",new Bi(E,3)),this.setAttribute("uv",new Bi(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wf(e.width,e.height,e.widthSegments,e.heightSegments)}}function bo(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const a=t[n][i];if(vv(a))a.isRenderTargetTexture?(rt("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=a.clone();else if(Array.isArray(a))if(vv(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();e[n][i]=s}else e[n][i]=a.slice();else e[n][i]=a}}return e}function Wn(t){const e={};for(let n=0;n<t.length;n++){const i=bo(t[n]);for(const a in i)e[a]=i[a]}return e}function vv(t){return t&&(t.isColor||t.isMatrix3||t.isMatrix4||t.isVector2||t.isVector3||t.isVector4||t.isTexture||t.isQuaternion)}function Q1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function RS(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Nt.workingColorSpace}const J1={clone:bo,merge:Wn};var eT=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tT=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Oo{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=eT,this.fragmentShader=tT,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bo(e.uniforms),this.uniformsGroups=Q1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(e,n){if(super.fromJSON(e,n),e.uniforms!==void 0)for(const i in e.uniforms){const a=e.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new At().setHex(a.value);break;case"v2":this.uniforms[i].value=new Gt().fromArray(a.value);break;case"v3":this.uniforms[i].value=new Q().fromArray(a.value);break;case"v4":this.uniforms[i].value=new dn().fromArray(a.value);break;case"m3":this.uniforms[i].value=new ht().fromArray(a.value);break;case"m4":this.uniforms[i].value=new nn().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class nT extends Bn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class iT extends Oo{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=h1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class aT extends Oo{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const jc=new Q,qc=new Lo,Ji=new Q;class CS extends Zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=ra,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(jc,qc,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jc,qc,Ji.set(1,1,1)).invert()}updateWorldMatrix(e,n,i=!1){super.updateWorldMatrix(e,n,i),this.matrixWorld.decompose(jc,qc,Ji),Ji.x===1&&Ji.y===1&&Ji.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(jc,qc,Ji.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ja=new Q,_v=new Gt,xv=new Gt;class Di extends CS{constructor(e=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Op*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vu*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Op*2*Math.atan(Math.tan(vu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Ja.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ja.x,Ja.y).multiplyScalar(-e/Ja.z),Ja.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ja.x,Ja.y).multiplyScalar(-e/Ja.z)}getViewSize(e,n){return this.getViewBounds(e,_v,xv),n.subVectors(xv,_v)}setViewOffset(e,n,i,a,s,r){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(vu*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class ig extends CS{constructor(e=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-e,r=i+e,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Dr=-90,Nr=1;class sT extends Zn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Di(Dr,Nr,e,n);a.layers=this.layers,this.add(a);const s=new Di(Dr,Nr,e,n);s.layers=this.layers,this.add(s);const r=new Di(Dr,Nr,e,n);r.layers=this.layers,this.add(r);const o=new Di(Dr,Nr,e,n);o.layers=this.layers,this.add(o);const l=new Di(Dr,Nr,e,n);l.layers=this.layers,this.add(l);const c=new Di(Dr,Nr,e,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(e===ra)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===tf)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of n)this.add(c),c.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const E=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,2,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),e.setRenderTarget(i,4,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),i.texture.generateMipmaps=E,e.setRenderTarget(i,5,a),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,d),e.setRenderTarget(h,u,p),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class rT extends Di{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}const cg=class cg{constructor(e,n,i,a){this.elements=[1,0,0,1],e!==void 0&&this.set(e,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(e,n=0){for(let i=0;i<4;i++)this.elements[i]=e[i+n];return this}set(e,n,i,a){const s=this.elements;return s[0]=e,s[2]=n,s[1]=i,s[3]=a,this}};cg.prototype.isMatrix2=!0;let yv=cg;function Sv(t,e,n,i){const a=oT(i);switch(n){case hS:return t*e;case Ym:return t*e/a.components*a.byteLength;case Zm:return t*e/a.components*a.byteLength;case ar:return t*e*2/a.components*a.byteLength;case Km:return t*e*2/a.components*a.byteLength;case pS:return t*e*3/a.components*a.byteLength;case Zi:return t*e*4/a.components*a.byteLength;case $m:return t*e*4/a.components*a.byteLength;case hu:case pu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case mu:case gu:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case sp:case op:return Math.max(t,16)*Math.max(e,8)/4;case ap:case rp:return Math.max(t,8)*Math.max(e,8)/2;case lp:case cp:case fp:case dp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case up:case $u:case hp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case pp:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case mp:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case gp:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case vp:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case _p:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case xp:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case yp:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Sp:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Mp:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case bp:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Ep:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Tp:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Ap:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case wp:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Rp:case Cp:case Dp:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Np:case Up:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Qu:case Lp:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function oT(t){switch(t){case Oi:case cS:return{byteLength:1,components:1};case Bl:case uS:case Va:return{byteLength:2,components:1};case jm:case qm:return{byteLength:2,components:4};case ua:case Wm:case Yi:return{byteLength:4,components:1};case fS:case dS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Xm}}));typeof window<"u"&&(window.__THREE__?rt("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Xm);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function DS(){let t=null,e=!1,n=null,i=null;function a(s,r){n(s,r),i=t.requestAnimationFrame(a)}return{start:function(){e!==!0&&n!==null&&t!==null&&(i=t.requestAnimationFrame(a),e=!0)},stop:function(){t!==null&&t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function lT(t){const e=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=t.createBuffer();t.bindBuffer(l,u),t.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=t.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=t.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=t.HALF_FLOAT:p=t.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=t.SHORT;else if(c instanceof Uint32Array)p=t.UNSIGNED_INT;else if(c instanceof Int32Array)p=t.INT;else if(c instanceof Int8Array)p=t.BYTE;else if(c instanceof Uint8Array)p=t.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(t.bindBuffer(c,o),h.length===0)t.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],E=h[p];E.start<=g.start+g.count+1?g.count=Math.max(g.count,E.start+E.count-g.start):(++u,h[u]=E)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const E=h[p];t.bufferSubData(c,E.start*d.BYTES_PER_ELEMENT,d,E.start,E.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(t.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var cT=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,uT=`#ifdef USE_ALPHAHASH
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
#endif`,fT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,dT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,pT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,mT=`#ifdef USE_AOMAP
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
#endif`,gT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vT=`#ifdef USE_BATCHING
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
#endif`,_T=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,xT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,yT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,ST=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,MT=`#ifdef USE_IRIDESCENCE
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
#endif`,bT=`#ifdef USE_BUMPMAP
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
#endif`,ET=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,TT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,AT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,wT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,RT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,CT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,DT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,NT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,UT=`#define PI 3.141592653589793
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
} // validated`,LT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,OT=`vec3 transformedNormal = objectNormal;
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
#endif`,PT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,zT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,IT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,BT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,FT="gl_FragColor = linearToOutputTexel( gl_FragColor );",HT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,GT=`#ifdef USE_ENVMAP
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
#endif`,kT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,VT=`#ifdef USE_ENVMAP
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
#endif`,XT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,WT=`#ifdef USE_ENVMAP
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
#endif`,jT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,qT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,YT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ZT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,KT=`#ifdef USE_GRADIENTMAP
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
}`,$T=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,QT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,JT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,eA=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,tA=`#ifdef USE_ENVMAP
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
#endif`,nA=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,iA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,aA=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,sA=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,rA=`PhysicalMaterial material;
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
#endif`,oA=`uniform sampler2D dfgLUT;
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
}`,lA=`
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
#endif`,cA=`#if defined( RE_IndirectDiffuse )
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
#endif`,uA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fA=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,dA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,pA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,gA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,vA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_A=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,xA=`#if defined( USE_POINTS_UV )
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
#endif`,yA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,SA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,MA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,EA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,TA=`#ifdef USE_MORPHTARGETS
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
#endif`,AA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,wA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,RA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,CA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,DA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,NA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,UA=`#ifdef USE_NORMALMAP
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
#endif`,LA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,OA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,PA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,zA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,IA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,BA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,FA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,HA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,GA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,VA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,XA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,WA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,jA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,qA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,YA=`float getShadowMask() {
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
}`,ZA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,KA=`#ifdef USE_SKINNING
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
#endif`,$A=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,QA=`#ifdef USE_SKINNING
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
#endif`,JA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,e2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,t2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,n2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,i2=`#ifdef USE_TRANSMISSION
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
#endif`,a2=`#ifdef USE_TRANSMISSION
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
#endif`,s2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,r2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,o2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,l2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const c2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,u2=`uniform sampler2D t2D;
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
}`,f2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,d2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,h2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,p2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,m2=`#include <common>
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
}`,g2=`#if DEPTH_PACKING == 3200
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
}`,v2=`#define DISTANCE
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
}`,_2=`#define DISTANCE
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
}`,x2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,y2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S2=`uniform float scale;
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
}`,M2=`uniform vec3 diffuse;
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
}`,b2=`#include <common>
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
}`,E2=`uniform vec3 diffuse;
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
}`,T2=`#define LAMBERT
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
}`,A2=`#define LAMBERT
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
}`,w2=`#define MATCAP
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
}`,R2=`#define MATCAP
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
}`,C2=`#define NORMAL
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
}`,D2=`#define NORMAL
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
}`,N2=`#define PHONG
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
}`,U2=`#define PHONG
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
}`,L2=`#define STANDARD
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
}`,O2=`#define STANDARD
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
}`,P2=`#define TOON
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
}`,z2=`#define TOON
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
}`,I2=`uniform float size;
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
}`,B2=`uniform vec3 diffuse;
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
}`,F2=`#include <common>
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
}`,H2=`uniform vec3 color;
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
}`,G2=`uniform float rotation;
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
}`,k2=`uniform vec3 diffuse;
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
}`,_t={alphahash_fragment:cT,alphahash_pars_fragment:uT,alphamap_fragment:fT,alphamap_pars_fragment:dT,alphatest_fragment:hT,alphatest_pars_fragment:pT,aomap_fragment:mT,aomap_pars_fragment:gT,batching_pars_vertex:vT,batching_vertex:_T,begin_vertex:xT,beginnormal_vertex:yT,bsdfs:ST,iridescence_fragment:MT,bumpmap_pars_fragment:bT,clipping_planes_fragment:ET,clipping_planes_pars_fragment:TT,clipping_planes_pars_vertex:AT,clipping_planes_vertex:wT,color_fragment:RT,color_pars_fragment:CT,color_pars_vertex:DT,color_vertex:NT,common:UT,cube_uv_reflection_fragment:LT,defaultnormal_vertex:OT,displacementmap_pars_vertex:PT,displacementmap_vertex:zT,emissivemap_fragment:IT,emissivemap_pars_fragment:BT,colorspace_fragment:FT,colorspace_pars_fragment:HT,envmap_fragment:GT,envmap_common_pars_fragment:kT,envmap_pars_fragment:VT,envmap_pars_vertex:XT,envmap_physical_pars_fragment:tA,envmap_vertex:WT,fog_vertex:jT,fog_pars_vertex:qT,fog_fragment:YT,fog_pars_fragment:ZT,gradientmap_pars_fragment:KT,lightmap_pars_fragment:$T,lights_lambert_fragment:QT,lights_lambert_pars_fragment:JT,lights_pars_begin:eA,lights_toon_fragment:nA,lights_toon_pars_fragment:iA,lights_phong_fragment:aA,lights_phong_pars_fragment:sA,lights_physical_fragment:rA,lights_physical_pars_fragment:oA,lights_fragment_begin:lA,lights_fragment_maps:cA,lights_fragment_end:uA,lightprobes_pars_fragment:fA,logdepthbuf_fragment:dA,logdepthbuf_pars_fragment:hA,logdepthbuf_pars_vertex:pA,logdepthbuf_vertex:mA,map_fragment:gA,map_pars_fragment:vA,map_particle_fragment:_A,map_particle_pars_fragment:xA,metalnessmap_fragment:yA,metalnessmap_pars_fragment:SA,morphinstance_vertex:MA,morphcolor_vertex:bA,morphnormal_vertex:EA,morphtarget_pars_vertex:TA,morphtarget_vertex:AA,normal_fragment_begin:wA,normal_fragment_maps:RA,normal_pars_fragment:CA,normal_pars_vertex:DA,normal_vertex:NA,normalmap_pars_fragment:UA,clearcoat_normal_fragment_begin:LA,clearcoat_normal_fragment_maps:OA,clearcoat_pars_fragment:PA,iridescence_pars_fragment:zA,opaque_fragment:IA,packing:BA,premultiplied_alpha_fragment:FA,project_vertex:HA,dithering_fragment:GA,dithering_pars_fragment:kA,roughnessmap_fragment:VA,roughnessmap_pars_fragment:XA,shadowmap_pars_fragment:WA,shadowmap_pars_vertex:jA,shadowmap_vertex:qA,shadowmask_pars_fragment:YA,skinbase_vertex:ZA,skinning_pars_vertex:KA,skinning_vertex:$A,skinnormal_vertex:QA,specularmap_fragment:JA,specularmap_pars_fragment:e2,tonemapping_fragment:t2,tonemapping_pars_fragment:n2,transmission_fragment:i2,transmission_pars_fragment:a2,uv_pars_fragment:s2,uv_pars_vertex:r2,uv_vertex:o2,worldpos_vertex:l2,background_vert:c2,background_frag:u2,backgroundCube_vert:f2,backgroundCube_frag:d2,cube_vert:h2,cube_frag:p2,depth_vert:m2,depth_frag:g2,distance_vert:v2,distance_frag:_2,equirect_vert:x2,equirect_frag:y2,linedashed_vert:S2,linedashed_frag:M2,meshbasic_vert:b2,meshbasic_frag:E2,meshlambert_vert:T2,meshlambert_frag:A2,meshmatcap_vert:w2,meshmatcap_frag:R2,meshnormal_vert:C2,meshnormal_frag:D2,meshphong_vert:N2,meshphong_frag:U2,meshphysical_vert:L2,meshphysical_frag:O2,meshtoon_vert:P2,meshtoon_frag:z2,points_vert:I2,points_frag:B2,shadow_vert:F2,shadow_frag:H2,sprite_vert:G2,sprite_frag:k2},He={common:{diffuse:{value:new At(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ht}},envmap:{envMap:{value:null},envMapRotation:{value:new ht},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ht},normalScale:{value:new Gt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new At(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Q},probesMax:{value:new Q},probesResolution:{value:new Q}},points:{diffuse:{value:new At(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0},uvTransform:{value:new ht}},sprite:{diffuse:{value:new At(16777215)},opacity:{value:1},center:{value:new Gt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ht},alphaMap:{value:null},alphaMapTransform:{value:new ht},alphaTest:{value:0}}},ta={basic:{uniforms:Wn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:Wn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new At(0)},envMapIntensity:{value:1}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:Wn([He.common,He.specularmap,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.fog,He.lights,{emissive:{value:new At(0)},specular:{value:new At(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:Wn([He.common,He.envmap,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.roughnessmap,He.metalnessmap,He.fog,He.lights,{emissive:{value:new At(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:Wn([He.common,He.aomap,He.lightmap,He.emissivemap,He.bumpmap,He.normalmap,He.displacementmap,He.gradientmap,He.fog,He.lights,{emissive:{value:new At(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:Wn([He.common,He.bumpmap,He.normalmap,He.displacementmap,He.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:Wn([He.points,He.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:Wn([He.common,He.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:Wn([He.common,He.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:Wn([He.common,He.bumpmap,He.normalmap,He.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:Wn([He.sprite,He.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ht}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distance:{uniforms:Wn([He.common,He.displacementmap,{referencePosition:{value:new Q},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distance_vert,fragmentShader:_t.distance_frag},shadow:{uniforms:Wn([He.lights,He.fog,{color:{value:new At(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};ta.physical={uniforms:Wn([ta.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ht},clearcoatNormalScale:{value:new Gt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ht},sheen:{value:0},sheenColor:{value:new At(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ht},transmissionSamplerSize:{value:new Gt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ht},attenuationDistance:{value:0},attenuationColor:{value:new At(0)},specularColor:{value:new At(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ht},anisotropyVector:{value:new Gt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ht}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};const Yc={r:0,b:0,g:0},V2=new nn,NS=new ht;NS.set(-1,0,0,0,1,0,0,0,1);function X2(t,e,n,i,a,s){const r=new At(0);let o=a===!0?0:1,l,c,d=null,h=0,u=null;function p(x){let S=x.isScene===!0?x.background:null;if(S&&S.isTexture){const y=x.backgroundBlurriness>0;S=e.get(S,y)}return S}function g(x){let S=!1;const y=p(x);y===null?m(r,o):y&&y.isColor&&(m(y,1),S=!0);const U=t.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,s):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||S)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function E(x,S){const y=p(S);y&&(y.isCubeTexture||y.mapping===Af)?(c===void 0&&(c=new Hi(new rr(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:bo(ta.backgroundCube.uniforms),vertexShader:ta.backgroundCube.vertexShader,fragmentShader:ta.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(U,A,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=S.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(V2.makeRotationFromEuler(S.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(NS),c.material.toneMapped=Nt.getTransfer(y.colorSpace)!==Wt,(d!==y||h!==y.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Hi(new wf(2,2),new Bn({name:"BackgroundMaterial",uniforms:bo(ta.background.uniforms),vertexShader:ta.background.vertexShader,fragmentShader:ta.background.fragmentShader,side:ws,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=S.backgroundIntensity,l.material.toneMapped=Nt.getTransfer(y.colorSpace)!==Wt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,S){x.getRGB(Yc,RS(t)),n.buffers.color.setClear(Yc.r,Yc.g,Yc.b,S,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,S=1){r.set(x),o=S,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(r,o)},render:g,addToRenderList:E,dispose:f}}function W2(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(z,H,X,N,B){let P=!1;const F=h(z,N,X,H);s!==F&&(s=F,c(s.object)),P=p(z,N,X,B),P&&g(z,N,X,B),B!==null&&e.update(B,t.ELEMENT_ARRAY_BUFFER),(P||r)&&(r=!1,y(z,H,X,N),B!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return t.createVertexArray()}function c(z){return t.bindVertexArray(z)}function d(z){return t.deleteVertexArray(z)}function h(z,H,X,N){const B=N.wireframe===!0;let P=i[H.id];P===void 0&&(P={},i[H.id]=P);const F=z.isInstancedMesh===!0?z.id:0;let I=P[F];I===void 0&&(I={},P[F]=I);let j=I[X.id];j===void 0&&(j={},I[X.id]=j);let me=j[B];return me===void 0&&(me=u(l()),j[B]=me),me}function u(z){const H=[],X=[],N=[];for(let B=0;B<n;B++)H[B]=0,X[B]=0,N[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:H,enabledAttributes:X,attributeDivisors:N,object:z,attributes:{},index:null}}function p(z,H,X,N){const B=s.attributes,P=H.attributes;let F=0;const I=X.getAttributes();for(const j in I)if(I[j].location>=0){const Ae=B[j];let Ee=P[j];if(Ee===void 0&&(j==="instanceMatrix"&&z.instanceMatrix&&(Ee=z.instanceMatrix),j==="instanceColor"&&z.instanceColor&&(Ee=z.instanceColor)),Ae===void 0||Ae.attribute!==Ee||Ee&&Ae.data!==Ee.data)return!0;F++}return s.attributesNum!==F||s.index!==N}function g(z,H,X,N){const B={},P=H.attributes;let F=0;const I=X.getAttributes();for(const j in I)if(I[j].location>=0){let Ae=P[j];Ae===void 0&&(j==="instanceMatrix"&&z.instanceMatrix&&(Ae=z.instanceMatrix),j==="instanceColor"&&z.instanceColor&&(Ae=z.instanceColor));const Ee={};Ee.attribute=Ae,Ae&&Ae.data&&(Ee.data=Ae.data),B[j]=Ee,F++}s.attributes=B,s.attributesNum=F,s.index=N}function E(){const z=s.newAttributes;for(let H=0,X=z.length;H<X;H++)z[H]=0}function m(z){f(z,0)}function f(z,H){const X=s.newAttributes,N=s.enabledAttributes,B=s.attributeDivisors;X[z]=1,N[z]===0&&(t.enableVertexAttribArray(z),N[z]=1),B[z]!==H&&(t.vertexAttribDivisor(z,H),B[z]=H)}function x(){const z=s.newAttributes,H=s.enabledAttributes;for(let X=0,N=H.length;X<N;X++)H[X]!==z[X]&&(t.disableVertexAttribArray(X),H[X]=0)}function S(z,H,X,N,B,P,F){F===!0?t.vertexAttribIPointer(z,H,X,B,P):t.vertexAttribPointer(z,H,X,N,B,P)}function y(z,H,X,N){E();const B=N.attributes,P=X.getAttributes(),F=H.defaultAttributeValues;for(const I in P){const j=P[I];if(j.location>=0){let me=B[I];if(me===void 0&&(I==="instanceMatrix"&&z.instanceMatrix&&(me=z.instanceMatrix),I==="instanceColor"&&z.instanceColor&&(me=z.instanceColor)),me!==void 0){const Ae=me.normalized,Ee=me.itemSize,Qe=e.get(me);if(Qe===void 0)continue;const Je=Qe.buffer,et=Qe.type,pe=Qe.bytesPerElement,Re=et===t.INT||et===t.UNSIGNED_INT||me.gpuType===Wm;if(me.isInterleavedBufferAttribute){const ue=me.data,Be=ue.stride,Ge=me.offset;if(ue.isInstancedInterleavedBuffer){for(let Xe=0;Xe<j.locationSize;Xe++)f(j.location+Xe,ue.meshPerAttribute);z.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let Xe=0;Xe<j.locationSize;Xe++)m(j.location+Xe);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let Xe=0;Xe<j.locationSize;Xe++)S(j.location+Xe,Ee/j.locationSize,et,Ae,Be*pe,(Ge+Ee/j.locationSize*Xe)*pe,Re)}else{if(me.isInstancedBufferAttribute){for(let ue=0;ue<j.locationSize;ue++)f(j.location+ue,me.meshPerAttribute);z.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let ue=0;ue<j.locationSize;ue++)m(j.location+ue);t.bindBuffer(t.ARRAY_BUFFER,Je);for(let ue=0;ue<j.locationSize;ue++)S(j.location+ue,Ee/j.locationSize,et,Ae,Ee*pe,Ee/j.locationSize*ue*pe,Re)}}else if(F!==void 0){const Ae=F[I];if(Ae!==void 0)switch(Ae.length){case 2:t.vertexAttrib2fv(j.location,Ae);break;case 3:t.vertexAttrib3fv(j.location,Ae);break;case 4:t.vertexAttrib4fv(j.location,Ae);break;default:t.vertexAttrib1fv(j.location,Ae)}}}}x()}function U(){D();for(const z in i){const H=i[z];for(const X in H){const N=H[X];for(const B in N){const P=N[B];for(const F in P)d(P[F].object),delete P[F];delete N[B]}}delete i[z]}}function A(z){if(i[z.id]===void 0)return;const H=i[z.id];for(const X in H){const N=H[X];for(const B in N){const P=N[B];for(const F in P)d(P[F].object),delete P[F];delete N[B]}}delete i[z.id]}function T(z){for(const H in i){const X=i[H];for(const N in X){const B=X[N];if(B[z.id]===void 0)continue;const P=B[z.id];for(const F in P)d(P[F].object),delete P[F];delete B[z.id]}}}function M(z){for(const H in i){const X=i[H],N=z.isInstancedMesh===!0?z.id:0,B=X[N];if(B!==void 0){for(const P in B){const F=B[P];for(const I in F)d(F[I].object),delete F[I];delete B[P]}delete X[N],Object.keys(X).length===0&&delete i[H]}}}function D(){L(),r=!0,s!==a&&(s=a,c(s.object))}function L(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:D,resetDefaultState:L,dispose:U,releaseStatesOfGeometry:A,releaseStatesOfObject:M,releaseStatesOfProgram:T,initAttributes:E,enableAttribute:m,disableUnusedAttributes:x}}function j2(t,e,n){let i;function a(l){i=l}function s(l,c){t.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,d){d!==0&&(t.drawArraysInstanced(i,l,c,d),n.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function q2(t,e,n,i){let a;function s(){if(a!==void 0)return a;if(e.has("EXT_texture_filter_anisotropic")===!0){const T=e.get("EXT_texture_filter_anisotropic");a=t.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Zi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const M=T===Va&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(T!==Oi&&i.convert(T)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==Yi&&!M)}function l(T){if(T==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(rt("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&rt("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),E=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),f=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),S=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),U=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:E,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:x,maxVaryings:S,maxFragmentUniforms:y,maxSamples:U,samples:A}}function Y2(t){const e=this;let n=null,i=0,a=!1,s=!1;const r=new Gs,o=new ht,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||a;return a=u,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,E=h.clipIntersection,m=h.clipShadows,f=t.get(h);if(!a||g===null||g.length===0||s&&!m)s?d(null):c();else{const x=s?0:i,S=x*4;let y=f.clippingState||null;l.value=y,y=d(g,u,S,p);for(let U=0;U!==S;++U)y[U]=n[U];f.clippingState=y,this.numIntersection=E?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,p,g){const E=h!==null?h.length:0;let m=null;if(E!==0){if(m=l.value,g!==!0||m===null){const f=p+E*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let S=0,y=p;S!==E;++S,y+=4)r.copy(h[S]).applyMatrix4(x,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=E,e.numIntersection=0,m}}const ds=4,Mv=[.125,.215,.35,.446,.526,.582],Vs=20,Z2=256,Jo=new ig,bv=new At;let Vd=null,Xd=0,Wd=0,jd=!1;const K2=new Q;class Ev{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=K2}=s;Vd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),Wd=this._renderer.getActiveMipmapLevel(),jd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=wv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Av(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Vd,Xd,Wd),this._renderer.xr.enabled=jd,e.scissorTest=!1,Ur(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===ir||e.mapping===So?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Vd=this._renderer.getRenderTarget(),Xd=this._renderer.getActiveCubeFace(),Wd=this._renderer.getActiveMipmapLevel(),jd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Vn,minFilter:Vn,generateMipmaps:!1,type:Va,format:Zi,colorSpace:Ju,depthBuffer:!1},a=Tv(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tv(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=$2(s)),this._blurMaterial=J2(s,e,n),this._ggxMaterial=Q2(s,e,n)}return a}_compileMaterial(e){const n=new Hi(new Xn,e);this._renderer.compile(n,Jo)}_sceneToCubeUV(e,n,i,a,s){const l=new Di(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(bv),h.toneMapping=la,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hi(new rr,new MS({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1})));const E=this._backgroundBox,m=E.material;let f=!1;const x=e.background;x?x.isColor&&(m.color.copy(x),e.background=null,f=!0):(m.color.copy(bv),f=!0);for(let S=0;S<6;S++){const y=S%3;y===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[S],s.y,s.z)):y===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[S]));const U=this._cubeSize;Ur(a,y*U,S>2?U:0,U,U),h.setRenderTarget(a),f&&h.render(E,l),h.render(e,l)}h.toneMapping=p,h.autoClear=u,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,a=e.mapping===ir||e.mapping===So;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=wv()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Av());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=e;const l=this._cubeSize;Ur(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Jo)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=0+c*1.25,p=h*u,{_lodMax:g}=this,E=this._sizeLods[i],m=3*E*(i>g-ds?i-g+ds:0),f=4*(this._cubeSize-E);l.envMap.value=e.texture,l.roughness.value=p,l.mipInt.value=g-n,Ur(s,m,f,3*E,2*E),a.setRenderTarget(s),a.render(o,Jo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ur(e,m,f,3*E,2*E),a.setRenderTarget(e),a.render(o,Jo)}_blur(e,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(e,r,n,i,a,"latitudinal",s),this._halfBlur(r,e,i,i,a,"longitudinal",s)}_halfBlur(e,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&zt("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[a];h.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*Vs-1),E=s/g,m=isFinite(s)?1+Math.floor(d*E):Vs;m>Vs&&rt(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Vs}`);const f=[];let x=0;for(let T=0;T<Vs;++T){const M=T/E,D=Math.exp(-M*M/2);f.push(D),T===0?x+=D:T<m&&(x+=2*D)}for(let T=0;T<f.length;T++)f[T]=f[T]/x;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:S}=this;u.dTheta.value=g,u.mipInt.value=S-i;const y=this._sizeLods[a],U=3*y*(a>S-ds?a-S+ds:0),A=4*(this._cubeSize-y);Ur(n,U,A,3*y,2*y),l.setRenderTarget(n),l.render(h,Jo)}}function $2(t){const e=[],n=[],i=[];let a=t;const s=t-ds+1+Mv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);e.push(o);let l=1/o;r>t-ds?l=Mv[r-t+ds-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,E=3,m=2,f=1,x=new Float32Array(E*g*p),S=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let A=0;A<p;A++){const T=A%3*2/3-1,M=A>2?0:-1,D=[T,M,0,T+2/3,M,0,T+2/3,M+1,0,T,M,0,T+2/3,M+1,0,T,M+1,0];x.set(D,E*g*A),S.set(u,m*g*A);const L=[A,A,A,A,A,A];y.set(L,f*g*A)}const U=new Xn;U.setAttribute("position",new Xt(x,E)),U.setAttribute("uv",new Xt(S,m)),U.setAttribute("faceIndex",new Xt(y,f)),i.push(new Hi(U,null)),a>ds&&a--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Tv(t,e,n){const i=new ca(t,e,n);return i.texture.mapping=Af,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(t,e,n,i,a){t.viewport.set(e,n,i,a),t.scissor.set(e,n,i,a)}function Q2(t,e,n){return new Bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Z2,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Rf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function J2(t,e,n){const i=new Float32Array(Vs),a=new Q(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:Vs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Rf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function Av(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Rf(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function wv(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Rf(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function Rf(){return`

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
	`}class US extends ca{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},a=[i,i,i,i,i,i];this.texture=new AS(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new rr(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:bo(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:si,blending:za});s.uniforms.tEquirect.value=n;const r=new Hi(a,s),o=n.minFilter;return n.minFilter===Xs&&(n.minFilter=Vn),new sT(1,10,this).update(e,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,n=!0,i=!0,a=!0){const s=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(n,i,a);e.setRenderTarget(s)}}function ew(t){let e=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===md||p===gd)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const E=new US(g.height);return E.fromEquirectangularTexture(t,u),e.set(u,E),u.addEventListener("dispose",c),o(E.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===md||p===gd,E=p===ir||p===So;if(g||E){let m=n.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new Ev(t)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const x=u.image;return g&&x&&x.height>0||E&&x&&l(x)?(i===null&&(i=new Ev(t)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===md?u.mapping=ir:p===gd&&(u.mapping=So),u}function l(u){let p=0;const g=6;for(let E=0;E<g;E++)u[E]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function h(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function tw(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const a=t.getExtension(i);return e[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&ro("WebGLRenderer: "+i+" extension not supported."),a}}}function nw(t,e,n,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(e.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)e.update(u[p],t.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let E=0;if(g===void 0)return;if(p!==null){const x=p.array;E=p.version;for(let S=0,y=x.length;S<y;S+=3){const U=x[S+0],A=x[S+1],T=x[S+2];u.push(U,A,A,T,T,U)}}else{const x=g.array;E=g.version;for(let S=0,y=x.length/3-1;S<y;S+=3){const U=S+0,A=S+1,T=S+2;u.push(U,A,A,T,T,U)}}const m=new(g.count>=65535?SS:yS)(u,1);m.version=E;const f=s.get(h);f&&e.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function iw(t,e,n){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,u){t.drawElements(i,u,s,h*r),n.update(u,i,1)}function c(h,u,p){p!==0&&(t.drawElementsInstanced(i,u,s,h*r,p),n.update(u,i,p))}function d(h,u,p){if(p===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let E=0;for(let m=0;m<p;m++)E+=u[m];n.update(E,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function aw(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:zt("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:a,update:i}}function sw(t,e,n){const i=new WeakMap,a=new dn;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let L=function(){M.dispose(),i.delete(o),o.removeEventListener("dispose",L)};var p=L;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,E=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],S=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),E===!0&&(y=2),m===!0&&(y=3);let U=o.attributes.position.count*y,A=1;U>e.maxTextureSize&&(A=Math.ceil(U/e.maxTextureSize),U=e.maxTextureSize);const T=new Float32Array(U*A*4*h),M=new gS(T,U,A,h);M.type=Yi,M.needsUpdate=!0;const D=y*4;for(let z=0;z<h;z++){const H=f[z],X=x[z],N=S[z],B=U*A*4*z;for(let P=0;P<H.count;P++){const F=P*D;g===!0&&(a.fromBufferAttribute(H,P),T[B+F+0]=a.x,T[B+F+1]=a.y,T[B+F+2]=a.z,T[B+F+3]=0),E===!0&&(a.fromBufferAttribute(X,P),T[B+F+4]=a.x,T[B+F+5]=a.y,T[B+F+6]=a.z,T[B+F+7]=0),m===!0&&(a.fromBufferAttribute(N,P),T[B+F+8]=a.x,T[B+F+9]=a.y,T[B+F+10]=a.z,T[B+F+11]=N.itemSize===4?a.w:1)}}u={count:h,texture:M,size:new Gt(U,A)},i.set(o,u),o.addEventListener("dispose",L)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(t,"morphTexture",r.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const E=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(t,"morphTargetBaseInfluence",E),l.getUniforms().setValue(t,"morphTargetInfluences",c)}l.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function rw(t,e,n,i,a){let s=new WeakMap;function r(c){const d=a.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==d&&(e.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,t.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,t.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const ow={[tS]:"LINEAR_TONE_MAPPING",[nS]:"REINHARD_TONE_MAPPING",[iS]:"CINEON_TONE_MAPPING",[aS]:"ACES_FILMIC_TONE_MAPPING",[rS]:"AGX_TONE_MAPPING",[oS]:"NEUTRAL_TONE_MAPPING",[sS]:"CUSTOM_TONE_MAPPING"};function lw(t,e,n,i,a,s){const r=new ca(e,n,{type:t,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new Mo(e,n):void 0}),o=new ca(e,n,{type:Va,depthBuffer:!1,stencilBuffer:!1}),l=new Xn;l.setAttribute("position",new Bi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bi([0,2,0,0,2,0],2));const c=new nT({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Hi(l,c),h=new ig(-1,1,1,-1,0,1);let u=null,p=null,g=!1,E,m=null,f=[],x=!1;this.setSize=function(S,y){r.setSize(S,y),o.setSize(S,y);for(let U=0;U<f.length;U++){const A=f[U];A.setSize&&A.setSize(S,y)}},this.setEffects=function(S){f=S,x=f.length>0&&f[0].isRenderPass===!0;const y=r.width,U=r.height;for(let A=0;A<f.length;A++){const T=f[A];T.setSize&&T.setSize(y,U)}},this.begin=function(S,y){if(g||S.toneMapping===la&&f.length===0)return!1;if(m=y,y!==null){const U=y.width,A=y.height;(r.width!==U||r.height!==A)&&this.setSize(U,A)}return x===!1&&S.setRenderTarget(r),E=S.toneMapping,S.toneMapping=la,!0},this.hasRenderPass=function(){return x},this.end=function(S,y){S.toneMapping=E,g=!0;let U=r,A=o;for(let T=0;T<f.length;T++){const M=f[T];if(M.enabled!==!1&&(M.render(S,A,U,y),M.needsSwap!==!1)){const D=U;U=A,A=D}}if(u!==S.outputColorSpace||p!==S.toneMapping){u=S.outputColorSpace,p=S.toneMapping,c.defines={},Nt.getTransfer(u)===Wt&&(c.defines.SRGB_TRANSFER="");const T=ow[p];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=U.texture,S.setRenderTarget(m),S.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const LS=new Yn,Ip=new Mo(1,1),OS=new gS,PS=new N1,zS=new AS,Rv=[],Cv=[],Dv=new Float32Array(16),Nv=new Float32Array(9),Uv=new Float32Array(4);function Po(t,e,n){const i=t[0];if(i<=0||i>0)return t;const a=e*n;let s=Rv[a];if(s===void 0&&(s=new Float32Array(a),Rv[a]=s),e!==0){i.toArray(s,0);for(let r=1,o=0;r!==e;++r)o+=n,t[r].toArray(s,o)}return s}function Mn(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function bn(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Cf(t,e){let n=Cv[e];n===void 0&&(n=new Int32Array(e),Cv[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function cw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function uw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Mn(n,e))return;t.uniform2fv(this.addr,e),bn(n,e)}}function fw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Mn(n,e))return;t.uniform3fv(this.addr,e),bn(n,e)}}function dw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Mn(n,e))return;t.uniform4fv(this.addr,e),bn(n,e)}}function hw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Mn(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),bn(n,e)}else{if(Mn(n,i))return;Uv.set(i),t.uniformMatrix2fv(this.addr,!1,Uv),bn(n,i)}}function pw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Mn(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),bn(n,e)}else{if(Mn(n,i))return;Nv.set(i),t.uniformMatrix3fv(this.addr,!1,Nv),bn(n,i)}}function mw(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Mn(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),bn(n,e)}else{if(Mn(n,i))return;Dv.set(i),t.uniformMatrix4fv(this.addr,!1,Dv),bn(n,i)}}function gw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function vw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Mn(n,e))return;t.uniform2iv(this.addr,e),bn(n,e)}}function _w(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Mn(n,e))return;t.uniform3iv(this.addr,e),bn(n,e)}}function xw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Mn(n,e))return;t.uniform4iv(this.addr,e),bn(n,e)}}function yw(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Sw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Mn(n,e))return;t.uniform2uiv(this.addr,e),bn(n,e)}}function Mw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Mn(n,e))return;t.uniform3uiv(this.addr,e),bn(n,e)}}function bw(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Mn(n,e))return;t.uniform4uiv(this.addr,e),bn(n,e)}}function Ew(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a);let s;this.type===t.SAMPLER_2D_SHADOW?(Ip.compareFunction=n.isReversedDepthBuffer()?Jm:Qm,s=Ip):s=LS,n.setTexture2D(e||s,a)}function Tw(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(e||PS,a)}function Aw(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(e||zS,a)}function ww(t,e,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(t.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(e||OS,a)}function Rw(t){switch(t){case 5126:return cw;case 35664:return uw;case 35665:return fw;case 35666:return dw;case 35674:return hw;case 35675:return pw;case 35676:return mw;case 5124:case 35670:return gw;case 35667:case 35671:return vw;case 35668:case 35672:return _w;case 35669:case 35673:return xw;case 5125:return yw;case 36294:return Sw;case 36295:return Mw;case 36296:return bw;case 35678:case 36198:case 36298:case 36306:case 35682:return Ew;case 35679:case 36299:case 36307:return Tw;case 35680:case 36300:case 36308:case 36293:return Aw;case 36289:case 36303:case 36311:case 36292:return ww}}function Cw(t,e){t.uniform1fv(this.addr,e)}function Dw(t,e){const n=Po(e,this.size,2);t.uniform2fv(this.addr,n)}function Nw(t,e){const n=Po(e,this.size,3);t.uniform3fv(this.addr,n)}function Uw(t,e){const n=Po(e,this.size,4);t.uniform4fv(this.addr,n)}function Lw(t,e){const n=Po(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Ow(t,e){const n=Po(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Pw(t,e){const n=Po(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function zw(t,e){t.uniform1iv(this.addr,e)}function Iw(t,e){t.uniform2iv(this.addr,e)}function Bw(t,e){t.uniform3iv(this.addr,e)}function Fw(t,e){t.uniform4iv(this.addr,e)}function Hw(t,e){t.uniform1uiv(this.addr,e)}function Gw(t,e){t.uniform2uiv(this.addr,e)}function kw(t,e){t.uniform3uiv(this.addr,e)}function Vw(t,e){t.uniform4uiv(this.addr,e)}function Xw(t,e,n){const i=this.cache,a=e.length,s=Cf(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));let r;this.type===t.SAMPLER_2D_SHADOW?r=Ip:r=LS;for(let o=0;o!==a;++o)n.setTexture2D(e[o]||r,s[o])}function Ww(t,e,n){const i=this.cache,a=e.length,s=Cf(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture3D(e[r]||PS,s[r])}function jw(t,e,n){const i=this.cache,a=e.length,s=Cf(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTextureCube(e[r]||zS,s[r])}function qw(t,e,n){const i=this.cache,a=e.length,s=Cf(n,a);Mn(i,s)||(t.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(e[r]||OS,s[r])}function Yw(t){switch(t){case 5126:return Cw;case 35664:return Dw;case 35665:return Nw;case 35666:return Uw;case 35674:return Lw;case 35675:return Ow;case 35676:return Pw;case 5124:case 35670:return zw;case 35667:case 35671:return Iw;case 35668:case 35672:return Bw;case 35669:case 35673:return Fw;case 5125:return Hw;case 36294:return Gw;case 36295:return kw;case 36296:return Vw;case 35678:case 36198:case 36298:case 36306:case 35682:return Xw;case 35679:case 36299:case 36307:return Ww;case 35680:case 36300:case 36308:case 36293:return jw;case 36289:case 36303:case 36311:case 36292:return qw}}class Zw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Rw(n.type)}}class Kw{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=Yw(n.type)}}class $w{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(e,n[o.id],i)}}}const qd=/(\w+)(\])?(\[|\.)?/g;function Lv(t,e){t.seq.push(e),t.map[e.id]=e}function Qw(t,e,n){const i=t.name,a=i.length;for(qd.lastIndex=0;;){const s=qd.exec(i),r=qd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Lv(n,c===void 0?new Zw(o,t,e):new Kw(o,t,e));break}else{let h=n.map[o];h===void 0&&(h=new $w(o),Lv(n,h)),n=h}}}class xu{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=e.getActiveUniform(n,r),l=e.getUniformLocation(n,o.name);Qw(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(e,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(e,i,a)}setOptional(e,n,i){const a=n[i];a!==void 0&&this.setValue(e,i,a)}static upload(e,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,a)}}static seqWithValue(e,n){const i=[];for(let a=0,s=e.length;a!==s;++a){const r=e[a];r.id in n&&i.push(r)}return i}}function Ov(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const Jw=37297;let eR=0;function tR(t,e){const n=t.split(`
`),i=[],a=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===e?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Pv=new ht;function nR(t){Nt._getMatrix(Pv,Nt.workingColorSpace,t);const e=`mat3( ${Pv.elements.map(n=>n.toFixed(4))} )`;switch(Nt.getTransfer(t)){case ef:return[e,"LinearTransferOETF"];case Wt:return[e,"sRGBTransferOETF"];default:return rt("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function zv(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+tR(t.getShaderSource(e),o)}else return s}function iR(t,e){const n=nR(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const aR={[tS]:"Linear",[nS]:"Reinhard",[iS]:"Cineon",[aS]:"ACESFilmic",[rS]:"AgX",[oS]:"Neutral",[sS]:"Custom"};function sR(t,e){const n=aR[e];return n===void 0?(rt("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Zc=new Q;function rR(){Nt.getLuminanceCoefficients(Zc);const t=Zc.x.toFixed(4),e=Zc.y.toFixed(4),n=Zc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function oR(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ol).join(`
`)}function lR(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function cR(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=t.getActiveAttrib(e,a),r=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:t.getAttribLocation(e,r),locationSize:o}}return n}function ol(t){return t!==""}function Iv(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Bv(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uR=/^[ \t]*#include +<([\w\d./]+)>/gm;function Bp(t){return t.replace(uR,dR)}const fR=new Map;function dR(t,e){let n=_t[e];if(n===void 0){const i=fR.get(e);if(i!==void 0)n=_t[i],rt('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Bp(n)}const hR=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fv(t){return t.replace(hR,pR)}function pR(t,e,n,i){let a="";for(let s=parseInt(e);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Hv(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const mR={[du]:"SHADOWMAP_TYPE_PCF",[rl]:"SHADOWMAP_TYPE_VSM"};function gR(t){return mR[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const vR={[ir]:"ENVMAP_TYPE_CUBE",[So]:"ENVMAP_TYPE_CUBE",[Af]:"ENVMAP_TYPE_CUBE_UV"};function _R(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":vR[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const xR={[So]:"ENVMAP_MODE_REFRACTION"};function yR(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":xR[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const SR={[eS]:"ENVMAP_BLENDING_MULTIPLY",[u1]:"ENVMAP_BLENDING_MIX",[f1]:"ENVMAP_BLENDING_ADD"};function MR(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":SR[t.combine]||"ENVMAP_BLENDING_NONE"}function bR(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function ER(t,e,n,i){const a=t.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=gR(n),c=_R(n),d=yR(n),h=MR(n),u=bR(n),p=oR(n),g=lR(s),E=a.createProgram();let m,f,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ol).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ol).join(`
`),f.length>0&&(f+=`
`)):(m=[Hv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ol).join(`
`),f=[Hv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==la?"#define TONE_MAPPING":"",n.toneMapping!==la?_t.tonemapping_pars_fragment:"",n.toneMapping!==la?sR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,iR("linearToOutputTexel",n.outputColorSpace),rR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ol).join(`
`)),r=Bp(r),r=Iv(r,n),r=Bv(r,n),o=Bp(o),o=Iv(o,n),o=Bv(o,n),r=Fv(r),o=Fv(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===W0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===W0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const S=x+m+r,y=x+f+o,U=Ov(a,a.VERTEX_SHADER,S),A=Ov(a,a.FRAGMENT_SHADER,y);a.attachShader(E,U),a.attachShader(E,A),n.index0AttributeName!==void 0?a.bindAttribLocation(E,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(E,0,"position"),a.linkProgram(E);function T(z){if(t.debug.checkShaderErrors){const H=a.getProgramInfoLog(E)||"",X=a.getShaderInfoLog(U)||"",N=a.getShaderInfoLog(A)||"",B=H.trim(),P=X.trim(),F=N.trim();let I=!0,j=!0;if(a.getProgramParameter(E,a.LINK_STATUS)===!1)if(I=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(a,E,U,A);else{const me=zv(a,U,"vertex"),Ae=zv(a,A,"fragment");zt("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(E,a.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+B+`
`+me+`
`+Ae)}else B!==""?rt("WebGLProgram: Program Info Log:",B):(P===""||F==="")&&(j=!1);j&&(z.diagnostics={runnable:I,programLog:B,vertexShader:{log:P,prefix:m},fragmentShader:{log:F,prefix:f}})}a.deleteShader(U),a.deleteShader(A),M=new xu(a,E),D=cR(a,E)}let M;this.getUniforms=function(){return M===void 0&&T(this),M};let D;this.getAttributes=function(){return D===void 0&&T(this),D};let L=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=a.getProgramParameter(E,Jw)),L},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(E),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=eR++,this.cacheKey=e,this.usedTimes=1,this.program=E,this.vertexShader=U,this.fragmentShader=A,this}let TR=0;class AR{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,n,i){const a=this._getShaderCacheForMaterial(e);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new wR(e),n.set(e,i)),i}}class wR{constructor(e){this.id=TR++,this.code=e,this.usedTimes=0}}function RR(t){return t===ar||t===$u||t===Qu}function CR(t,e,n,i,a,s){const r=new vS,o=new AR,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(M){return l.add(M),M===0?"uv":`uv${M}`}function E(M,D,L,z,H,X){const N=z.fog,B=H.geometry,P=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?z.environment:null,F=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap,I=e.get(M.envMap||P,F),j=I&&I.mapping===Af?I.image.height:null,me=p[M.type];M.precision!==null&&(u=i.getMaxPrecision(M.precision),u!==M.precision&&rt("WebGLProgram.getParameters:",M.precision,"not supported, using",u,"instead."));const Ae=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,Ee=Ae!==void 0?Ae.length:0;let Qe=0;B.morphAttributes.position!==void 0&&(Qe=1),B.morphAttributes.normal!==void 0&&(Qe=2),B.morphAttributes.color!==void 0&&(Qe=3);let Je,et,pe,Re;if(me){const ke=ta[me];Je=ke.vertexShader,et=ke.fragmentShader}else{Je=M.vertexShader,et=M.fragmentShader;const ke=o.getVertexShaderStage(M),Mt=o.getFragmentShaderStage(M);o.update(M,ke,Mt),pe=ke.id,Re=Mt.id}const ue=t.getRenderTarget(),Be=t.state.buffers.depth.getReversed(),Ge=H.isInstancedMesh===!0,Xe=H.isBatchedMesh===!0,wt=!!M.map,it=!!M.matcap,Rt=!!I,gt=!!M.aoMap,dt=!!M.lightMap,Ot=!!M.bumpMap&&M.wireframe===!1,ut=!!M.normalMap,Yt=!!M.displacementMap,Qt=!!M.emissiveMap,tt=!!M.metalnessMap,Oe=!!M.roughnessMap,k=M.anisotropy>0,lt=M.clearcoat>0,ee=M.dispersion>0,b=M.iridescence>0,_=M.sheen>0,G=M.transmission>0,Y=k&&!!M.anisotropyMap,J=lt&&!!M.clearcoatMap,_e=lt&&!!M.clearcoatNormalMap,we=lt&&!!M.clearcoatRoughnessMap,oe=b&&!!M.iridescenceMap,K=b&&!!M.iridescenceThicknessMap,re=_&&!!M.sheenColorMap,ge=_&&!!M.sheenRoughnessMap,xe=!!M.specularMap,be=!!M.specularColorMap,Fe=!!M.specularIntensityMap,je=G&&!!M.transmissionMap,at=G&&!!M.thicknessMap,V=!!M.gradientMap,Ce=!!M.alphaMap,fe=M.alphaTest>0,le=!!M.alphaHash,Pe=!!M.extensions;let Se=la;M.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(Se=t.toneMapping);const qe={shaderID:me,shaderType:M.type,shaderName:M.name,vertexShader:Je,fragmentShader:et,defines:M.defines,customVertexShaderID:pe,customFragmentShaderID:Re,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:u,batching:Xe,batchingColor:Xe&&H._colorsTexture!==null,instancing:Ge,instancingColor:Ge&&H.instanceColor!==null,instancingMorph:Ge&&H.morphTexture!==null,outputColorSpace:ue===null?t.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Nt.workingColorSpace,alphaToCoverage:!!M.alphaToCoverage,map:wt,matcap:it,envMap:Rt,envMapMode:Rt&&I.mapping,envMapCubeUVHeight:j,aoMap:gt,lightMap:dt,bumpMap:Ot,normalMap:ut,displacementMap:Yt,emissiveMap:Qt,normalMapObjectSpace:ut&&M.normalMapType===p1,normalMapTangentSpace:ut&&M.normalMapType===k0,packedNormalMap:ut&&M.normalMapType===k0&&RR(M.normalMap.format),metalnessMap:tt,roughnessMap:Oe,anisotropy:k,anisotropyMap:Y,clearcoat:lt,clearcoatMap:J,clearcoatNormalMap:_e,clearcoatRoughnessMap:we,dispersion:ee,iridescence:b,iridescenceMap:oe,iridescenceThicknessMap:K,sheen:_,sheenColorMap:re,sheenRoughnessMap:ge,specularMap:xe,specularColorMap:be,specularIntensityMap:Fe,transmission:G,transmissionMap:je,thicknessMap:at,gradientMap:V,opaque:M.transparent===!1&&M.blending===$s&&M.alphaToCoverage===!1,alphaMap:Ce,alphaTest:fe,alphaHash:le,combine:M.combine,mapUv:wt&&g(M.map.channel),aoMapUv:gt&&g(M.aoMap.channel),lightMapUv:dt&&g(M.lightMap.channel),bumpMapUv:Ot&&g(M.bumpMap.channel),normalMapUv:ut&&g(M.normalMap.channel),displacementMapUv:Yt&&g(M.displacementMap.channel),emissiveMapUv:Qt&&g(M.emissiveMap.channel),metalnessMapUv:tt&&g(M.metalnessMap.channel),roughnessMapUv:Oe&&g(M.roughnessMap.channel),anisotropyMapUv:Y&&g(M.anisotropyMap.channel),clearcoatMapUv:J&&g(M.clearcoatMap.channel),clearcoatNormalMapUv:_e&&g(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:we&&g(M.clearcoatRoughnessMap.channel),iridescenceMapUv:oe&&g(M.iridescenceMap.channel),iridescenceThicknessMapUv:K&&g(M.iridescenceThicknessMap.channel),sheenColorMapUv:re&&g(M.sheenColorMap.channel),sheenRoughnessMapUv:ge&&g(M.sheenRoughnessMap.channel),specularMapUv:xe&&g(M.specularMap.channel),specularColorMapUv:be&&g(M.specularColorMap.channel),specularIntensityMapUv:Fe&&g(M.specularIntensityMap.channel),transmissionMapUv:je&&g(M.transmissionMap.channel),thicknessMapUv:at&&g(M.thicknessMap.channel),alphaMapUv:Ce&&g(M.alphaMap.channel),vertexTangents:!!B.attributes.tangent&&(ut||k),vertexNormals:!!B.attributes.normal,vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,pointsUvs:H.isPoints===!0&&!!B.attributes.uv&&(wt||Ce),fog:!!N,useFog:M.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:M.wireframe===!1&&(M.flatShading===!0||B.attributes.normal===void 0&&ut===!1&&(M.isMeshLambertMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isMeshPhysicalMaterial)),sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Be,skinning:H.isSkinnedMesh===!0,hasPositionAttribute:B.attributes.position!==void 0,morphTargets:B.morphAttributes.position!==void 0,morphNormals:B.morphAttributes.normal!==void 0,morphColors:B.morphAttributes.color!==void 0,morphTargetsCount:Ee,morphTextureStride:Qe,numDirLights:D.directional.length,numPointLights:D.point.length,numSpotLights:D.spot.length,numSpotLightMaps:D.spotLightMap.length,numRectAreaLights:D.rectArea.length,numHemiLights:D.hemi.length,numDirLightShadows:D.directionalShadowMap.length,numPointLightShadows:D.pointShadowMap.length,numSpotLightShadows:D.spotShadowMap.length,numSpotLightShadowsWithMaps:D.numSpotLightShadowsWithMaps,numLightProbes:D.numLightProbes,numLightProbeGrids:X.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:M.dithering,shadowMapEnabled:t.shadowMap.enabled&&L.length>0,shadowMapType:t.shadowMap.type,toneMapping:Se,decodeVideoTexture:wt&&M.map.isVideoTexture===!0&&Nt.getTransfer(M.map.colorSpace)===Wt,decodeVideoTextureEmissive:Qt&&M.emissiveMap.isVideoTexture===!0&&Nt.getTransfer(M.emissiveMap.colorSpace)===Wt,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Ra,flipSided:M.side===si,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Pe&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Pe&&M.extensions.multiDraw===!0||Xe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return qe.vertexUv1s=l.has(1),qe.vertexUv2s=l.has(2),qe.vertexUv3s=l.has(3),l.clear(),qe}function m(M){const D=[];if(M.shaderID?D.push(M.shaderID):(D.push(M.customVertexShaderID),D.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)D.push(L),D.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(f(D,M),x(D,M),D.push(t.outputColorSpace)),D.push(M.customProgramCacheKey),D.join()}function f(M,D){M.push(D.precision),M.push(D.outputColorSpace),M.push(D.envMapMode),M.push(D.envMapCubeUVHeight),M.push(D.mapUv),M.push(D.alphaMapUv),M.push(D.lightMapUv),M.push(D.aoMapUv),M.push(D.bumpMapUv),M.push(D.normalMapUv),M.push(D.displacementMapUv),M.push(D.emissiveMapUv),M.push(D.metalnessMapUv),M.push(D.roughnessMapUv),M.push(D.anisotropyMapUv),M.push(D.clearcoatMapUv),M.push(D.clearcoatNormalMapUv),M.push(D.clearcoatRoughnessMapUv),M.push(D.iridescenceMapUv),M.push(D.iridescenceThicknessMapUv),M.push(D.sheenColorMapUv),M.push(D.sheenRoughnessMapUv),M.push(D.specularMapUv),M.push(D.specularColorMapUv),M.push(D.specularIntensityMapUv),M.push(D.transmissionMapUv),M.push(D.thicknessMapUv),M.push(D.combine),M.push(D.fogExp2),M.push(D.sizeAttenuation),M.push(D.morphTargetsCount),M.push(D.morphAttributeCount),M.push(D.numDirLights),M.push(D.numPointLights),M.push(D.numSpotLights),M.push(D.numSpotLightMaps),M.push(D.numHemiLights),M.push(D.numRectAreaLights),M.push(D.numDirLightShadows),M.push(D.numPointLightShadows),M.push(D.numSpotLightShadows),M.push(D.numSpotLightShadowsWithMaps),M.push(D.numLightProbes),M.push(D.shadowMapType),M.push(D.toneMapping),M.push(D.numClippingPlanes),M.push(D.numClipIntersection),M.push(D.depthPacking)}function x(M,D){r.disableAll(),D.instancing&&r.enable(0),D.instancingColor&&r.enable(1),D.instancingMorph&&r.enable(2),D.matcap&&r.enable(3),D.envMap&&r.enable(4),D.normalMapObjectSpace&&r.enable(5),D.normalMapTangentSpace&&r.enable(6),D.clearcoat&&r.enable(7),D.iridescence&&r.enable(8),D.alphaTest&&r.enable(9),D.vertexColors&&r.enable(10),D.vertexAlphas&&r.enable(11),D.vertexUv1s&&r.enable(12),D.vertexUv2s&&r.enable(13),D.vertexUv3s&&r.enable(14),D.vertexTangents&&r.enable(15),D.anisotropy&&r.enable(16),D.alphaHash&&r.enable(17),D.batching&&r.enable(18),D.dispersion&&r.enable(19),D.batchingColor&&r.enable(20),D.gradientMap&&r.enable(21),D.packedNormalMap&&r.enable(22),D.vertexNormals&&r.enable(23),M.push(r.mask),r.disableAll(),D.fog&&r.enable(0),D.useFog&&r.enable(1),D.flatShading&&r.enable(2),D.logarithmicDepthBuffer&&r.enable(3),D.reversedDepthBuffer&&r.enable(4),D.skinning&&r.enable(5),D.morphTargets&&r.enable(6),D.morphNormals&&r.enable(7),D.morphColors&&r.enable(8),D.premultipliedAlpha&&r.enable(9),D.shadowMapEnabled&&r.enable(10),D.doubleSided&&r.enable(11),D.flipSided&&r.enable(12),D.useDepthPacking&&r.enable(13),D.dithering&&r.enable(14),D.transmission&&r.enable(15),D.sheen&&r.enable(16),D.opaque&&r.enable(17),D.pointsUvs&&r.enable(18),D.decodeVideoTexture&&r.enable(19),D.decodeVideoTextureEmissive&&r.enable(20),D.alphaToCoverage&&r.enable(21),D.numLightProbeGrids>0&&r.enable(22),D.hasPositionAttribute&&r.enable(23),M.push(r.mask)}function S(M){const D=p[M.type];let L;if(D){const z=ta[D];L=J1.clone(z.uniforms)}else L=M.uniforms;return L}function y(M,D){let L=d.get(D);return L!==void 0?++L.usedTimes:(L=new ER(t,D,M,a),c.push(L),d.set(D,L)),L}function U(M){if(--M.usedTimes===0){const D=c.indexOf(M);c[D]=c[c.length-1],c.pop(),d.delete(M.cacheKey),M.destroy()}}function A(M){o.remove(M)}function T(){o.dispose()}return{getParameters:E,getProgramCacheKey:m,getUniforms:S,acquireProgram:y,releaseProgram:U,releaseShaderCache:A,programs:c,dispose:T}}function DR(){let t=new WeakMap;function e(r){return t.has(r)}function n(r){let o=t.get(r);return o===void 0&&(o={},t.set(r,o)),o}function i(r){t.delete(r)}function a(r,o,l){t.get(r)[o]=l}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:a,dispose:s}}function NR(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Gv(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function kv(){const t=[];let e=0;const n=[],i=[],a=[];function s(){e=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,E,m,f){let x=t[e];return x===void 0?(x={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:E,renderOrder:u.renderOrder,z:m,group:f},t[e]=x):(x.id=u.id,x.object=u,x.geometry=p,x.material=g,x.materialVariant=r(u),x.groupOrder=E,x.renderOrder=u.renderOrder,x.z=m,x.group=f),e++,x}function l(u,p,g,E,m,f){const x=o(u,p,g,E,m,f);g.transmission>0?i.push(x):g.transparent===!0?a.push(x):n.push(x)}function c(u,p,g,E,m,f){const x=o(u,p,g,E,m,f);g.transmission>0?i.unshift(x):g.transparent===!0?a.unshift(x):n.unshift(x)}function d(u,p,g){n.length>1&&n.sort(u||NR),i.length>1&&i.sort(p||Gv),a.length>1&&a.sort(p||Gv),g&&(n.reverse(),i.reverse(),a.reverse())}function h(){for(let u=e,p=t.length;u<p;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:h,sort:d}}function UR(){let t=new WeakMap;function e(i,a){const s=t.get(i);let r;return s===void 0?(r=new kv,t.set(i,[r])):a>=s.length?(r=new kv,s.push(r)):r=s[a],r}function n(){t=new WeakMap}return{get:e,dispose:n}}function LR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new Q,color:new At};break;case"SpotLight":n={position:new Q,direction:new Q,color:new At,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new Q,color:new At,distance:0,decay:0};break;case"HemisphereLight":n={direction:new Q,skyColor:new At,groundColor:new At};break;case"RectAreaLight":n={color:new At,position:new Q,halfWidth:new Q,halfHeight:new Q};break}return t[e.id]=n,n}}}function OR(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Gt,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let PR=0;function zR(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function IR(t){const e=new LR,n=OR(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Q);const a=new Q,s=new nn,r=new nn;function o(c){let d=0,h=0,u=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let p=0,g=0,E=0,m=0,f=0,x=0,S=0,y=0,U=0,A=0,T=0;c.sort(zR);for(let D=0,L=c.length;D<L;D++){const z=c[D],H=z.color,X=z.intensity,N=z.distance;let B=null;if(z.shadow&&z.shadow.map&&(z.shadow.map.texture.format===ar?B=z.shadow.map.texture:B=z.shadow.map.depthTexture||z.shadow.map.texture),z.isAmbientLight)d+=H.r*X,h+=H.g*X,u+=H.b*X;else if(z.isLightProbe){for(let P=0;P<9;P++)i.probe[P].addScaledVector(z.sh.coefficients[P],X);T++}else if(z.isDirectionalLight){const P=e.get(z);if(P.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){const F=z.shadow,I=n.get(z);I.shadowIntensity=F.intensity,I.shadowBias=F.bias,I.shadowNormalBias=F.normalBias,I.shadowRadius=F.radius,I.shadowMapSize=F.mapSize,i.directionalShadow[p]=I,i.directionalShadowMap[p]=B,i.directionalShadowMatrix[p]=z.shadow.matrix,x++}i.directional[p]=P,p++}else if(z.isSpotLight){const P=e.get(z);P.position.setFromMatrixPosition(z.matrixWorld),P.color.copy(H).multiplyScalar(X),P.distance=N,P.coneCos=Math.cos(z.angle),P.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),P.decay=z.decay,i.spot[E]=P;const F=z.shadow;if(z.map&&(i.spotLightMap[U]=z.map,U++,F.updateMatrices(z),z.castShadow&&A++),i.spotLightMatrix[E]=F.matrix,z.castShadow){const I=n.get(z);I.shadowIntensity=F.intensity,I.shadowBias=F.bias,I.shadowNormalBias=F.normalBias,I.shadowRadius=F.radius,I.shadowMapSize=F.mapSize,i.spotShadow[E]=I,i.spotShadowMap[E]=B,y++}E++}else if(z.isRectAreaLight){const P=e.get(z);P.color.copy(H).multiplyScalar(X),P.halfWidth.set(z.width*.5,0,0),P.halfHeight.set(0,z.height*.5,0),i.rectArea[m]=P,m++}else if(z.isPointLight){const P=e.get(z);if(P.color.copy(z.color).multiplyScalar(z.intensity),P.distance=z.distance,P.decay=z.decay,z.castShadow){const F=z.shadow,I=n.get(z);I.shadowIntensity=F.intensity,I.shadowBias=F.bias,I.shadowNormalBias=F.normalBias,I.shadowRadius=F.radius,I.shadowMapSize=F.mapSize,I.shadowCameraNear=F.camera.near,I.shadowCameraFar=F.camera.far,i.pointShadow[g]=I,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=z.shadow.matrix,S++}i.point[g]=P,g++}else if(z.isHemisphereLight){const P=e.get(z);P.skyColor.copy(z.color).multiplyScalar(X),P.groundColor.copy(z.groundColor).multiplyScalar(X),i.hemi[f]=P,f++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=He.LTC_FLOAT_1,i.rectAreaLTC2=He.LTC_FLOAT_2):(i.rectAreaLTC1=He.LTC_HALF_1,i.rectAreaLTC2=He.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const M=i.hash;(M.directionalLength!==p||M.pointLength!==g||M.spotLength!==E||M.rectAreaLength!==m||M.hemiLength!==f||M.numDirectionalShadows!==x||M.numPointShadows!==S||M.numSpotShadows!==y||M.numSpotMaps!==U||M.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=E,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=y+U-A,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=T,M.directionalLength=p,M.pointLength=g,M.spotLength=E,M.rectAreaLength=m,M.hemiLength=f,M.numDirectionalShadows=x,M.numPointShadows=S,M.numSpotShadows=y,M.numSpotMaps=U,M.numLightProbes=T,i.version=PR++)}function l(c,d){let h=0,u=0,p=0,g=0,E=0;const m=d.matrixWorldInverse;for(let f=0,x=c.length;f<x;f++){const S=c[f];if(S.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),h++}else if(S.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(S.matrixWorld),a.setFromMatrixPosition(S.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(S.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(S.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(S.width*.5,0,0),y.halfHeight.set(0,S.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(S.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(S.matrixWorld),y.position.applyMatrix4(m),u++}else if(S.isHemisphereLight){const y=i.hemi[E];y.direction.setFromMatrixPosition(S.matrixWorld),y.direction.transformDirection(m),E++}}}return{setup:o,setupView:l,state:i}}function Vv(t){const e=new IR(t),n=[],i=[],a=[];function s(u){h.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){e.setup(n)}function d(u){e.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:d,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function BR(t){let e=new WeakMap;function n(a,s=0){const r=e.get(a);let o;return r===void 0?(o=new Vv(t),e.set(a,[o])):s>=r.length?(o=new Vv(t),r.push(o)):o=r[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const FR=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,HR=`uniform sampler2D shadow_pass;
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
}`,GR=[new Q(1,0,0),new Q(-1,0,0),new Q(0,1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1)],kR=[new Q(0,-1,0),new Q(0,-1,0),new Q(0,0,1),new Q(0,0,-1),new Q(0,-1,0),new Q(0,-1,0)],Xv=new nn,el=new Q,Yd=new Q;function VR(t,e,n){let i=new ES;const a=new Gt,s=new Gt,r=new dn,o=new iT,l=new aT,c={},d=n.maxTextureSize,h={[ws]:si,[si]:ws,[Ra]:Ra},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Gt},radius:{value:4}},vertexShader:FR,fragmentShader:HR}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Xn;g.setAttribute("position",new Xt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const E=new Hi(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=du;let f=this.type;this.render=function(A,T,M){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===WE&&(rt("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=du);const D=t.getRenderTarget(),L=t.getActiveCubeFace(),z=t.getActiveMipmapLevel(),H=t.state;H.setBlending(za),H.buffers.depth.getReversed()===!0?H.buffers.color.setClear(0,0,0,0):H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);const X=f!==this.type;X&&T.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(B=>B.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,B=A.length;N<B;N++){const P=A[N],F=P.shadow;if(F===void 0){rt("WebGLShadowMap:",P,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;a.copy(F.mapSize);const I=F.getFrameExtents();a.multiply(I),s.copy(F.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/I.x),a.x=s.x*I.x,F.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/I.y),a.y=s.y*I.y,F.mapSize.y=s.y));const j=t.state.buffers.depth.getReversed();if(F.camera._reversedDepth=j,F.map===null||X===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===rl){if(P.isPointLight){rt("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ca(a.x,a.y,{format:ar,type:Va,minFilter:Vn,magFilter:Vn,generateMipmaps:!1}),F.map.texture.name=P.name+".shadowMap",F.map.depthTexture=new Mo(a.x,a.y,Yi),F.map.depthTexture.name=P.name+".shadowMapDepth",F.map.depthTexture.format=Xa,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=In,F.map.depthTexture.magFilter=In}else P.isPointLight?(F.map=new US(a.x),F.map.depthTexture=new K1(a.x,ua)):(F.map=new ca(a.x,a.y),F.map.depthTexture=new Mo(a.x,a.y,ua)),F.map.depthTexture.name=P.name+".shadowMap",F.map.depthTexture.format=Xa,this.type===du?(F.map.depthTexture.compareFunction=j?Jm:Qm,F.map.depthTexture.minFilter=Vn,F.map.depthTexture.magFilter=Vn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=In,F.map.depthTexture.magFilter=In);F.camera.updateProjectionMatrix()}const me=F.map.isWebGLCubeRenderTarget?6:1;for(let Ae=0;Ae<me;Ae++){if(F.map.isWebGLCubeRenderTarget)t.setRenderTarget(F.map,Ae),t.clear();else{Ae===0&&(t.setRenderTarget(F.map),t.clear());const Ee=F.getViewport(Ae);r.set(s.x*Ee.x,s.y*Ee.y,s.x*Ee.z,s.y*Ee.w),H.viewport(r)}if(P.isPointLight){const Ee=F.camera,Qe=F.matrix,Je=P.distance||Ee.far;Je!==Ee.far&&(Ee.far=Je,Ee.updateProjectionMatrix()),el.setFromMatrixPosition(P.matrixWorld),Ee.position.copy(el),Yd.copy(Ee.position),Yd.add(GR[Ae]),Ee.up.copy(kR[Ae]),Ee.lookAt(Yd),Ee.updateMatrixWorld(),Qe.makeTranslation(-el.x,-el.y,-el.z),Xv.multiplyMatrices(Ee.projectionMatrix,Ee.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Xv,Ee.coordinateSystem,Ee.reversedDepth)}else F.updateMatrices(P);i=F.getFrustum(),y(T,M,F.camera,P,this.type)}F.isPointLightShadow!==!0&&this.type===rl&&x(F,M),F.needsUpdate=!1}f=this.type,m.needsUpdate=!1,t.setRenderTarget(D,L,z)};function x(A,T){const M=e.update(E);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ca(a.x,a.y,{format:ar,type:Va})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(T,null,M,u,E,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(T,null,M,p,E,null)}function S(A,T,M,D){let L=null;const z=M.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(z!==void 0)L=z;else if(L=M.isPointLight===!0?l:o,t.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const H=L.uuid,X=T.uuid;let N=c[H];N===void 0&&(N={},c[H]=N);let B=N[X];B===void 0&&(B=L.clone(),N[X]=B,T.addEventListener("dispose",U)),L=B}if(L.visible=T.visible,L.wireframe=T.wireframe,D===rl?L.side=T.shadowSide!==null?T.shadowSide:T.side:L.side=T.shadowSide!==null?T.shadowSide:h[T.side],L.alphaMap=T.alphaMap,L.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,L.map=T.map,L.clipShadows=T.clipShadows,L.clippingPlanes=T.clippingPlanes,L.clipIntersection=T.clipIntersection,L.displacementMap=T.displacementMap,L.displacementScale=T.displacementScale,L.displacementBias=T.displacementBias,L.wireframeLinewidth=T.wireframeLinewidth,L.linewidth=T.linewidth,M.isPointLight===!0&&L.isMeshDistanceMaterial===!0){const H=t.properties.get(L);H.light=M}return L}function y(A,T,M,D,L){if(A.visible===!1)return;if(A.layers.test(T.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&L===rl)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(M.matrixWorldInverse,A.matrixWorld);const X=e.update(A),N=A.material;if(Array.isArray(N)){const B=X.groups;for(let P=0,F=B.length;P<F;P++){const I=B[P],j=N[I.materialIndex];if(j&&j.visible){const me=S(A,j,D,L);A.onBeforeShadow(t,A,T,M,X,me,I),t.renderBufferDirect(M,null,X,me,A,I),A.onAfterShadow(t,A,T,M,X,me,I)}}}else if(N.visible){const B=S(A,N,D,L);A.onBeforeShadow(t,A,T,M,X,B,null),t.renderBufferDirect(M,null,X,B,A,null),A.onAfterShadow(t,A,T,M,X,B,null)}}const H=A.children;for(let X=0,N=H.length;X<N;X++)y(H[X],T,M,D,L)}function U(A){A.target.removeEventListener("dispose",U);for(const M in c){const D=c[M],L=A.target.uuid;L in D&&(D[L].dispose(),delete D[L])}}}function XR(t,e){function n(){let V=!1;const Ce=new dn;let fe=null;const le=new dn(0,0,0,0);return{setMask:function(Pe){fe!==Pe&&!V&&(t.colorMask(Pe,Pe,Pe,Pe),fe=Pe)},setLocked:function(Pe){V=Pe},setClear:function(Pe,Se,qe,ke,Mt){Mt===!0&&(Pe*=ke,Se*=ke,qe*=ke),Ce.set(Pe,Se,qe,ke),le.equals(Ce)===!1&&(t.clearColor(Pe,Se,qe,ke),le.copy(Ce))},reset:function(){V=!1,fe=null,le.set(-1,0,0,0)}}}function i(){let V=!1,Ce=!1,fe=null,le=null,Pe=null;return{setReversed:function(Se){if(Ce!==Se){const qe=e.get("EXT_clip_control");Se?qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.ZERO_TO_ONE_EXT):qe.clipControlEXT(qe.LOWER_LEFT_EXT,qe.NEGATIVE_ONE_TO_ONE_EXT),Ce=Se;const ke=Pe;Pe=null,this.setClear(ke)}},getReversed:function(){return Ce},setTest:function(Se){Se?ue(t.DEPTH_TEST):Be(t.DEPTH_TEST)},setMask:function(Se){fe!==Se&&!V&&(t.depthMask(Se),fe=Se)},setFunc:function(Se){if(Ce&&(Se=E1[Se]),le!==Se){switch(Se){case Zh:t.depthFunc(t.NEVER);break;case Kh:t.depthFunc(t.ALWAYS);break;case $h:t.depthFunc(t.LESS);break;case yo:t.depthFunc(t.LEQUAL);break;case Qh:t.depthFunc(t.EQUAL);break;case Jh:t.depthFunc(t.GEQUAL);break;case ep:t.depthFunc(t.GREATER);break;case tp:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}le=Se}},setLocked:function(Se){V=Se},setClear:function(Se){Pe!==Se&&(Pe=Se,Ce&&(Se=1-Se),t.clearDepth(Se))},reset:function(){V=!1,fe=null,le=null,Pe=null,Ce=!1}}}function a(){let V=!1,Ce=null,fe=null,le=null,Pe=null,Se=null,qe=null,ke=null,Mt=null;return{setTest:function(It){V||(It?ue(t.STENCIL_TEST):Be(t.STENCIL_TEST))},setMask:function(It){Ce!==It&&!V&&(t.stencilMask(It),Ce=It)},setFunc:function(It,Dn,Nn){(fe!==It||le!==Dn||Pe!==Nn)&&(t.stencilFunc(It,Dn,Nn),fe=It,le=Dn,Pe=Nn)},setOp:function(It,Dn,Nn){(Se!==It||qe!==Dn||ke!==Nn)&&(t.stencilOp(It,Dn,Nn),Se=It,qe=Dn,ke=Nn)},setLocked:function(It){V=It},setClear:function(It){Mt!==It&&(t.clearStencil(It),Mt=It)},reset:function(){V=!1,Ce=null,fe=null,le=null,Pe=null,Se=null,qe=null,ke=null,Mt=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},h={},u={},p=new WeakMap,g=[],E=null,m=!1,f=null,x=null,S=null,y=null,U=null,A=null,T=null,M=new At(0,0,0),D=0,L=!1,z=null,H=null,X=null,N=null,B=null;const P=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,I=0;const j=t.getParameter(t.VERSION);j.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(j)[1]),F=I>=1):j.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),F=I>=2);let me=null,Ae={};const Ee=t.getParameter(t.SCISSOR_BOX),Qe=t.getParameter(t.VIEWPORT),Je=new dn().fromArray(Ee),et=new dn().fromArray(Qe);function pe(V,Ce,fe,le){const Pe=new Uint8Array(4),Se=t.createTexture();t.bindTexture(V,Se),t.texParameteri(V,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(V,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let qe=0;qe<fe;qe++)V===t.TEXTURE_3D||V===t.TEXTURE_2D_ARRAY?t.texImage3D(Ce,0,t.RGBA,1,1,le,0,t.RGBA,t.UNSIGNED_BYTE,Pe):t.texImage2D(Ce+qe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,Pe);return Se}const Re={};Re[t.TEXTURE_2D]=pe(t.TEXTURE_2D,t.TEXTURE_2D,1),Re[t.TEXTURE_CUBE_MAP]=pe(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),Re[t.TEXTURE_2D_ARRAY]=pe(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),Re[t.TEXTURE_3D]=pe(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ue(t.DEPTH_TEST),r.setFunc(yo),Ot(!1),ut(F0),ue(t.CULL_FACE),gt(za);function ue(V){d[V]!==!0&&(t.enable(V),d[V]=!0)}function Be(V){d[V]!==!1&&(t.disable(V),d[V]=!1)}function Ge(V,Ce){return u[V]!==Ce?(t.bindFramebuffer(V,Ce),u[V]=Ce,V===t.DRAW_FRAMEBUFFER&&(u[t.FRAMEBUFFER]=Ce),V===t.FRAMEBUFFER&&(u[t.DRAW_FRAMEBUFFER]=Ce),!0):!1}function Xe(V,Ce){let fe=g,le=!1;if(V){fe=p.get(Ce),fe===void 0&&(fe=[],p.set(Ce,fe));const Pe=V.textures;if(fe.length!==Pe.length||fe[0]!==t.COLOR_ATTACHMENT0){for(let Se=0,qe=Pe.length;Se<qe;Se++)fe[Se]=t.COLOR_ATTACHMENT0+Se;fe.length=Pe.length,le=!0}}else fe[0]!==t.BACK&&(fe[0]=t.BACK,le=!0);le&&t.drawBuffers(fe)}function wt(V){return E!==V?(t.useProgram(V),E=V,!0):!1}const it={[ks]:t.FUNC_ADD,[qE]:t.FUNC_SUBTRACT,[YE]:t.FUNC_REVERSE_SUBTRACT};it[ZE]=t.MIN,it[KE]=t.MAX;const Rt={[$E]:t.ZERO,[QE]:t.ONE,[JE]:t.SRC_COLOR,[qh]:t.SRC_ALPHA,[s1]:t.SRC_ALPHA_SATURATE,[i1]:t.DST_COLOR,[t1]:t.DST_ALPHA,[e1]:t.ONE_MINUS_SRC_COLOR,[Yh]:t.ONE_MINUS_SRC_ALPHA,[a1]:t.ONE_MINUS_DST_COLOR,[n1]:t.ONE_MINUS_DST_ALPHA,[r1]:t.CONSTANT_COLOR,[o1]:t.ONE_MINUS_CONSTANT_COLOR,[l1]:t.CONSTANT_ALPHA,[c1]:t.ONE_MINUS_CONSTANT_ALPHA};function gt(V,Ce,fe,le,Pe,Se,qe,ke,Mt,It){if(V===za){m===!0&&(Be(t.BLEND),m=!1);return}if(m===!1&&(ue(t.BLEND),m=!0),V!==jE){if(V!==f||It!==L){if((x!==ks||U!==ks)&&(t.blendEquation(t.FUNC_ADD),x=ks,U=ks),It)switch(V){case $s:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Kr:t.blendFunc(t.ONE,t.ONE);break;case H0:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case G0:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:zt("WebGLState: Invalid blending: ",V);break}else switch(V){case $s:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Kr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case H0:zt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case G0:zt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:zt("WebGLState: Invalid blending: ",V);break}S=null,y=null,A=null,T=null,M.set(0,0,0),D=0,f=V,L=It}return}Pe=Pe||Ce,Se=Se||fe,qe=qe||le,(Ce!==x||Pe!==U)&&(t.blendEquationSeparate(it[Ce],it[Pe]),x=Ce,U=Pe),(fe!==S||le!==y||Se!==A||qe!==T)&&(t.blendFuncSeparate(Rt[fe],Rt[le],Rt[Se],Rt[qe]),S=fe,y=le,A=Se,T=qe),(ke.equals(M)===!1||Mt!==D)&&(t.blendColor(ke.r,ke.g,ke.b,Mt),M.copy(ke),D=Mt),f=V,L=!1}function dt(V,Ce){V.side===Ra?Be(t.CULL_FACE):ue(t.CULL_FACE);let fe=V.side===si;Ce&&(fe=!fe),Ot(fe),V.blending===$s&&V.transparent===!1?gt(za):gt(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),r.setFunc(V.depthFunc),r.setTest(V.depthTest),r.setMask(V.depthWrite),s.setMask(V.colorWrite);const le=V.stencilWrite;o.setTest(le),le&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Qt(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?ue(t.SAMPLE_ALPHA_TO_COVERAGE):Be(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ot(V){z!==V&&(V?t.frontFace(t.CW):t.frontFace(t.CCW),z=V)}function ut(V){V!==VE?(ue(t.CULL_FACE),V!==H&&(V===F0?t.cullFace(t.BACK):V===XE?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):Be(t.CULL_FACE),H=V}function Yt(V){V!==X&&(F&&t.lineWidth(V),X=V)}function Qt(V,Ce,fe){V?(ue(t.POLYGON_OFFSET_FILL),(N!==Ce||B!==fe)&&(N=Ce,B=fe,r.getReversed()&&(Ce=-Ce),t.polygonOffset(Ce,fe))):Be(t.POLYGON_OFFSET_FILL)}function tt(V){V?ue(t.SCISSOR_TEST):Be(t.SCISSOR_TEST)}function Oe(V){V===void 0&&(V=t.TEXTURE0+P-1),me!==V&&(t.activeTexture(V),me=V)}function k(V,Ce,fe){fe===void 0&&(me===null?fe=t.TEXTURE0+P-1:fe=me);let le=Ae[fe];le===void 0&&(le={type:void 0,texture:void 0},Ae[fe]=le),(le.type!==V||le.texture!==Ce)&&(me!==fe&&(t.activeTexture(fe),me=fe),t.bindTexture(V,Ce||Re[V]),le.type=V,le.texture=Ce)}function lt(){const V=Ae[me];V!==void 0&&V.type!==void 0&&(t.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function ee(){try{t.compressedTexImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function b(){try{t.compressedTexImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function _(){try{t.texSubImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function G(){try{t.texSubImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function Y(){try{t.compressedTexSubImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function J(){try{t.compressedTexSubImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function _e(){try{t.texStorage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function we(){try{t.texStorage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function oe(){try{t.texImage2D(...arguments)}catch(V){zt("WebGLState:",V)}}function K(){try{t.texImage3D(...arguments)}catch(V){zt("WebGLState:",V)}}function re(V){return h[V]!==void 0?h[V]:t.getParameter(V)}function ge(V,Ce){h[V]!==Ce&&(t.pixelStorei(V,Ce),h[V]=Ce)}function xe(V){Je.equals(V)===!1&&(t.scissor(V.x,V.y,V.z,V.w),Je.copy(V))}function be(V){et.equals(V)===!1&&(t.viewport(V.x,V.y,V.z,V.w),et.copy(V))}function Fe(V,Ce){let fe=c.get(Ce);fe===void 0&&(fe=new WeakMap,c.set(Ce,fe));let le=fe.get(V);le===void 0&&(le=t.getUniformBlockIndex(Ce,V.name),fe.set(V,le))}function je(V,Ce){const le=c.get(Ce).get(V);l.get(Ce)!==le&&(t.uniformBlockBinding(Ce,le,V.__bindingPointIndex),l.set(Ce,le))}function at(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),r.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),t.pixelStorei(t.PACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_ALIGNMENT,4),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,!1),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,t.BROWSER_DEFAULT_WEBGL),t.pixelStorei(t.PACK_ROW_LENGTH,0),t.pixelStorei(t.PACK_SKIP_PIXELS,0),t.pixelStorei(t.PACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_ROW_LENGTH,0),t.pixelStorei(t.UNPACK_IMAGE_HEIGHT,0),t.pixelStorei(t.UNPACK_SKIP_PIXELS,0),t.pixelStorei(t.UNPACK_SKIP_ROWS,0),t.pixelStorei(t.UNPACK_SKIP_IMAGES,0),d={},h={},me=null,Ae={},u={},p=new WeakMap,g=[],E=null,m=!1,f=null,x=null,S=null,y=null,U=null,A=null,T=null,M=new At(0,0,0),D=0,L=!1,z=null,H=null,X=null,N=null,B=null,Je.set(0,0,t.canvas.width,t.canvas.height),et.set(0,0,t.canvas.width,t.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:ue,disable:Be,bindFramebuffer:Ge,drawBuffers:Xe,useProgram:wt,setBlending:gt,setMaterial:dt,setFlipSided:Ot,setCullFace:ut,setLineWidth:Yt,setPolygonOffset:Qt,setScissorTest:tt,activeTexture:Oe,bindTexture:k,unbindTexture:lt,compressedTexImage2D:ee,compressedTexImage3D:b,texImage2D:oe,texImage3D:K,pixelStorei:ge,getParameter:re,updateUBOMapping:Fe,uniformBlockBinding:je,texStorage2D:_e,texStorage3D:we,texSubImage2D:_,texSubImage3D:G,compressedTexSubImage2D:Y,compressedTexSubImage3D:J,scissor:xe,viewport:be,reset:at}}function WR(t,e,n,i,a,s,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Gt,d=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function E(b,_){return g?new OffscreenCanvas(b,_):nf("canvas")}function m(b,_,G){let Y=1;const J=ee(b);if((J.width>G||J.height>G)&&(Y=G/Math.max(J.width,J.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const _e=Math.floor(Y*J.width),we=Math.floor(Y*J.height);u===void 0&&(u=E(_e,we));const oe=_?E(_e,we):u;return oe.width=_e,oe.height=we,oe.getContext("2d").drawImage(b,0,0,_e,we),rt("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+_e+"x"+we+")."),oe}else return"data"in b&&rt("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),b;return b}function f(b){return b.generateMipmaps}function x(b){t.generateMipmap(b)}function S(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function y(b,_,G,Y,J,_e=!1){if(b!==null){if(t[b]!==void 0)return t[b];rt("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let we;Y&&(we=e.get("EXT_texture_norm16"),we||rt("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let oe=_;if(_===t.RED&&(G===t.FLOAT&&(oe=t.R32F),G===t.HALF_FLOAT&&(oe=t.R16F),G===t.UNSIGNED_BYTE&&(oe=t.R8),G===t.UNSIGNED_SHORT&&we&&(oe=we.R16_EXT),G===t.SHORT&&we&&(oe=we.R16_SNORM_EXT)),_===t.RED_INTEGER&&(G===t.UNSIGNED_BYTE&&(oe=t.R8UI),G===t.UNSIGNED_SHORT&&(oe=t.R16UI),G===t.UNSIGNED_INT&&(oe=t.R32UI),G===t.BYTE&&(oe=t.R8I),G===t.SHORT&&(oe=t.R16I),G===t.INT&&(oe=t.R32I)),_===t.RG&&(G===t.FLOAT&&(oe=t.RG32F),G===t.HALF_FLOAT&&(oe=t.RG16F),G===t.UNSIGNED_BYTE&&(oe=t.RG8),G===t.UNSIGNED_SHORT&&we&&(oe=we.RG16_EXT),G===t.SHORT&&we&&(oe=we.RG16_SNORM_EXT)),_===t.RG_INTEGER&&(G===t.UNSIGNED_BYTE&&(oe=t.RG8UI),G===t.UNSIGNED_SHORT&&(oe=t.RG16UI),G===t.UNSIGNED_INT&&(oe=t.RG32UI),G===t.BYTE&&(oe=t.RG8I),G===t.SHORT&&(oe=t.RG16I),G===t.INT&&(oe=t.RG32I)),_===t.RGB_INTEGER&&(G===t.UNSIGNED_BYTE&&(oe=t.RGB8UI),G===t.UNSIGNED_SHORT&&(oe=t.RGB16UI),G===t.UNSIGNED_INT&&(oe=t.RGB32UI),G===t.BYTE&&(oe=t.RGB8I),G===t.SHORT&&(oe=t.RGB16I),G===t.INT&&(oe=t.RGB32I)),_===t.RGBA_INTEGER&&(G===t.UNSIGNED_BYTE&&(oe=t.RGBA8UI),G===t.UNSIGNED_SHORT&&(oe=t.RGBA16UI),G===t.UNSIGNED_INT&&(oe=t.RGBA32UI),G===t.BYTE&&(oe=t.RGBA8I),G===t.SHORT&&(oe=t.RGBA16I),G===t.INT&&(oe=t.RGBA32I)),_===t.RGB&&(G===t.UNSIGNED_SHORT&&we&&(oe=we.RGB16_EXT),G===t.SHORT&&we&&(oe=we.RGB16_SNORM_EXT),G===t.UNSIGNED_INT_5_9_9_9_REV&&(oe=t.RGB9_E5),G===t.UNSIGNED_INT_10F_11F_11F_REV&&(oe=t.R11F_G11F_B10F)),_===t.RGBA){const K=_e?ef:Nt.getTransfer(J);G===t.FLOAT&&(oe=t.RGBA32F),G===t.HALF_FLOAT&&(oe=t.RGBA16F),G===t.UNSIGNED_BYTE&&(oe=K===Wt?t.SRGB8_ALPHA8:t.RGBA8),G===t.UNSIGNED_SHORT&&we&&(oe=we.RGBA16_EXT),G===t.SHORT&&we&&(oe=we.RGBA16_SNORM_EXT),G===t.UNSIGNED_SHORT_4_4_4_4&&(oe=t.RGBA4),G===t.UNSIGNED_SHORT_5_5_5_1&&(oe=t.RGB5_A1)}return(oe===t.R16F||oe===t.R32F||oe===t.RG16F||oe===t.RG32F||oe===t.RGBA16F||oe===t.RGBA32F)&&e.get("EXT_color_buffer_float"),oe}function U(b,_){let G;return b?_===null||_===ua||_===Fl?G=t.DEPTH24_STENCIL8:_===Yi?G=t.DEPTH32F_STENCIL8:_===Bl&&(G=t.DEPTH24_STENCIL8,rt("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ua||_===Fl?G=t.DEPTH_COMPONENT24:_===Yi?G=t.DEPTH_COMPONENT32F:_===Bl&&(G=t.DEPTH_COMPONENT16),G}function A(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==In&&b.minFilter!==Vn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function T(b){const _=b.target;_.removeEventListener("dispose",T),D(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function M(b){const _=b.target;_.removeEventListener("dispose",M),z(_)}function D(b){const _=i.get(b);if(_.__webglInit===void 0)return;const G=b.source,Y=p.get(G);if(Y){const J=Y[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&L(b),Object.keys(Y).length===0&&p.delete(G)}i.remove(b)}function L(b){const _=i.get(b);t.deleteTexture(_.__webglTexture);const G=b.source,Y=p.get(G);delete Y[_.__cacheKey],r.memory.textures--}function z(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let J=0;J<_.__webglFramebuffer[Y].length;J++)t.deleteFramebuffer(_.__webglFramebuffer[Y][J]);else t.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)t.deleteFramebuffer(_.__webglFramebuffer[Y]);else t.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&t.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&t.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const G=b.textures;for(let Y=0,J=G.length;Y<J;Y++){const _e=i.get(G[Y]);_e.__webglTexture&&(t.deleteTexture(_e.__webglTexture),r.memory.textures--),i.remove(G[Y])}i.remove(b)}let H=0;function X(){H=0}function N(){return H}function B(b){H=b}function P(){const b=H;return b>=a.maxTextures&&rt("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),H+=1,b}function F(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function I(b,_){const G=i.get(b);if(b.isVideoTexture&&k(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&G.__version!==b.version){const Y=b.image;if(Y===null)rt("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)rt("WebGLRenderer: Texture marked for update but image is incomplete");else{Be(G,b,_);return}}else b.isExternalTexture&&(G.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,G.__webglTexture,t.TEXTURE0+_)}function j(b,_){const G=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&G.__version!==b.version){Be(G,b,_);return}else b.isExternalTexture&&(G.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,G.__webglTexture,t.TEXTURE0+_)}function me(b,_){const G=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&G.__version!==b.version){Be(G,b,_);return}n.bindTexture(t.TEXTURE_3D,G.__webglTexture,t.TEXTURE0+_)}function Ae(b,_){const G=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&G.__version!==b.version){Ge(G,b,_);return}n.bindTexture(t.TEXTURE_CUBE_MAP,G.__webglTexture,t.TEXTURE0+_)}const Ee={[np]:t.REPEAT,[Ua]:t.CLAMP_TO_EDGE,[ip]:t.MIRRORED_REPEAT},Qe={[In]:t.NEAREST,[d1]:t.NEAREST_MIPMAP_NEAREST,[xc]:t.NEAREST_MIPMAP_LINEAR,[Vn]:t.LINEAR,[vd]:t.LINEAR_MIPMAP_NEAREST,[Xs]:t.LINEAR_MIPMAP_LINEAR},Je={[m1]:t.NEVER,[y1]:t.ALWAYS,[g1]:t.LESS,[Qm]:t.LEQUAL,[v1]:t.EQUAL,[Jm]:t.GEQUAL,[_1]:t.GREATER,[x1]:t.NOTEQUAL};function et(b,_){if(_.type===Yi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Vn||_.magFilter===vd||_.magFilter===xc||_.magFilter===Xs||_.minFilter===Vn||_.minFilter===vd||_.minFilter===xc||_.minFilter===Xs)&&rt("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,Ee[_.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,Ee[_.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,Ee[_.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,Qe[_.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,Qe[_.minFilter]),_.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,Je[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===In||_.minFilter!==xc&&_.minFilter!==Xs||_.type===Yi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const G=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,G.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function pe(b,_){let G=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",T));const Y=_.source;let J=p.get(Y);J===void 0&&(J={},p.set(Y,J));const _e=F(_);if(_e!==b.__cacheKey){J[_e]===void 0&&(J[_e]={texture:t.createTexture(),usedTimes:0},r.memory.textures++,G=!0),J[_e].usedTimes++;const we=J[b.__cacheKey];we!==void 0&&(J[b.__cacheKey].usedTimes--,we.usedTimes===0&&L(_)),b.__cacheKey=_e,b.__webglTexture=J[_e].texture}return G}function Re(b,_,G){return Math.floor(Math.floor(b/G)/_)}function ue(b,_,G,Y){const _e=b.updateRanges;if(_e.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,_.width,_.height,G,Y,_.data);else{_e.sort((ge,xe)=>ge.start-xe.start);let we=0;for(let ge=1;ge<_e.length;ge++){const xe=_e[we],be=_e[ge],Fe=xe.start+xe.count,je=Re(be.start,_.width,4),at=Re(xe.start,_.width,4);be.start<=Fe+1&&je===at&&Re(be.start+be.count-1,_.width,4)===je?xe.count=Math.max(xe.count,be.start+be.count-xe.start):(++we,_e[we]=be)}_e.length=we+1;const oe=n.getParameter(t.UNPACK_ROW_LENGTH),K=n.getParameter(t.UNPACK_SKIP_PIXELS),re=n.getParameter(t.UNPACK_SKIP_ROWS);n.pixelStorei(t.UNPACK_ROW_LENGTH,_.width);for(let ge=0,xe=_e.length;ge<xe;ge++){const be=_e[ge],Fe=Math.floor(be.start/4),je=Math.ceil(be.count/4),at=Fe%_.width,V=Math.floor(Fe/_.width),Ce=je,fe=1;n.pixelStorei(t.UNPACK_SKIP_PIXELS,at),n.pixelStorei(t.UNPACK_SKIP_ROWS,V),n.texSubImage2D(t.TEXTURE_2D,0,at,V,Ce,fe,G,Y,_.data)}b.clearUpdateRanges(),n.pixelStorei(t.UNPACK_ROW_LENGTH,oe),n.pixelStorei(t.UNPACK_SKIP_PIXELS,K),n.pixelStorei(t.UNPACK_SKIP_ROWS,re)}}function Be(b,_,G){let Y=t.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=t.TEXTURE_3D);const J=pe(b,_),_e=_.source;n.bindTexture(Y,b.__webglTexture,t.TEXTURE0+G);const we=i.get(_e);if(_e.version!==we.__version||J===!0){if(n.activeTexture(t.TEXTURE0+G),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const fe=Nt.getPrimaries(Nt.workingColorSpace),le=_.colorSpace===rs?null:Nt.getPrimaries(_.colorSpace),Pe=_.colorSpace===rs||fe===le?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}n.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment);let K=m(_.image,!1,a.maxTextureSize);K=lt(_,K);const re=s.convert(_.format,_.colorSpace),ge=s.convert(_.type);let xe=y(_.internalFormat,re,ge,_.normalized,_.colorSpace,_.isVideoTexture);et(Y,_);let be;const Fe=_.mipmaps,je=_.isVideoTexture!==!0,at=we.__version===void 0||J===!0,V=_e.dataReady,Ce=A(_,K);if(_.isDepthTexture)xe=U(_.format===Ws,_.type),at&&(je?n.texStorage2D(t.TEXTURE_2D,1,xe,K.width,K.height):n.texImage2D(t.TEXTURE_2D,0,xe,K.width,K.height,0,re,ge,null));else if(_.isDataTexture)if(Fe.length>0){je&&at&&n.texStorage2D(t.TEXTURE_2D,Ce,xe,Fe[0].width,Fe[0].height);for(let fe=0,le=Fe.length;fe<le;fe++)be=Fe[fe],je?V&&n.texSubImage2D(t.TEXTURE_2D,fe,0,0,be.width,be.height,re,ge,be.data):n.texImage2D(t.TEXTURE_2D,fe,xe,be.width,be.height,0,re,ge,be.data);_.generateMipmaps=!1}else je?(at&&n.texStorage2D(t.TEXTURE_2D,Ce,xe,K.width,K.height),V&&ue(_,K,re,ge)):n.texImage2D(t.TEXTURE_2D,0,xe,K.width,K.height,0,re,ge,K.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){je&&at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ce,xe,Fe[0].width,Fe[0].height,K.depth);for(let fe=0,le=Fe.length;fe<le;fe++)if(be=Fe[fe],_.format!==Zi)if(re!==null)if(je){if(V)if(_.layerUpdates.size>0){const Pe=Sv(be.width,be.height,_.format,_.type);for(const Se of _.layerUpdates){const qe=be.data.subarray(Se*Pe/be.data.BYTES_PER_ELEMENT,(Se+1)*Pe/be.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,Se,be.width,be.height,1,re,qe)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,0,be.width,be.height,K.depth,re,be.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,fe,xe,be.width,be.height,K.depth,0,be.data,0,0);else rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else je?V&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,fe,0,0,0,be.width,be.height,K.depth,re,ge,be.data):n.texImage3D(t.TEXTURE_2D_ARRAY,fe,xe,be.width,be.height,K.depth,0,re,ge,be.data)}else{je&&at&&n.texStorage2D(t.TEXTURE_2D,Ce,xe,Fe[0].width,Fe[0].height);for(let fe=0,le=Fe.length;fe<le;fe++)be=Fe[fe],_.format!==Zi?re!==null?je?V&&n.compressedTexSubImage2D(t.TEXTURE_2D,fe,0,0,be.width,be.height,re,be.data):n.compressedTexImage2D(t.TEXTURE_2D,fe,xe,be.width,be.height,0,be.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):je?V&&n.texSubImage2D(t.TEXTURE_2D,fe,0,0,be.width,be.height,re,ge,be.data):n.texImage2D(t.TEXTURE_2D,fe,xe,be.width,be.height,0,re,ge,be.data)}else if(_.isDataArrayTexture)if(je){if(at&&n.texStorage3D(t.TEXTURE_2D_ARRAY,Ce,xe,K.width,K.height,K.depth),V)if(_.layerUpdates.size>0){const fe=Sv(K.width,K.height,_.format,_.type);for(const le of _.layerUpdates){const Pe=K.data.subarray(le*fe/K.data.BYTES_PER_ELEMENT,(le+1)*fe/K.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,le,K.width,K.height,1,re,ge,Pe)}_.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,K.width,K.height,K.depth,re,ge,K.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,xe,K.width,K.height,K.depth,0,re,ge,K.data);else if(_.isData3DTexture)je?(at&&n.texStorage3D(t.TEXTURE_3D,Ce,xe,K.width,K.height,K.depth),V&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,K.width,K.height,K.depth,re,ge,K.data)):n.texImage3D(t.TEXTURE_3D,0,xe,K.width,K.height,K.depth,0,re,ge,K.data);else if(_.isFramebufferTexture){if(at)if(je)n.texStorage2D(t.TEXTURE_2D,Ce,xe,K.width,K.height);else{let fe=K.width,le=K.height;for(let Pe=0;Pe<Ce;Pe++)n.texImage2D(t.TEXTURE_2D,Pe,xe,fe,le,0,re,ge,null),fe>>=1,le>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in t){const fe=t.canvas;if(fe.hasAttribute("layoutsubtree")||fe.setAttribute("layoutsubtree","true"),K.parentNode!==fe){fe.appendChild(K),h.add(_),fe.onpaint=le=>{const Pe=le.changedElements;for(const Se of h)Pe.includes(Se.image)&&(Se.needsUpdate=!0)},fe.requestPaint();return}if(t.texElementImage2D.length===3)t.texElementImage2D(t.TEXTURE_2D,t.RGBA8,K);else{const Pe=t.RGBA,Se=t.RGBA,qe=t.UNSIGNED_BYTE;t.texElementImage2D(t.TEXTURE_2D,0,Pe,Se,qe,K)}t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE)}}else if(Fe.length>0){if(je&&at){const fe=ee(Fe[0]);n.texStorage2D(t.TEXTURE_2D,Ce,xe,fe.width,fe.height)}for(let fe=0,le=Fe.length;fe<le;fe++)be=Fe[fe],je?V&&n.texSubImage2D(t.TEXTURE_2D,fe,0,0,re,ge,be):n.texImage2D(t.TEXTURE_2D,fe,xe,re,ge,be);_.generateMipmaps=!1}else if(je){if(at){const fe=ee(K);n.texStorage2D(t.TEXTURE_2D,Ce,xe,fe.width,fe.height)}V&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,re,ge,K)}else n.texImage2D(t.TEXTURE_2D,0,xe,re,ge,K);f(_)&&x(Y),we.__version=_e.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ge(b,_,G){if(_.image.length!==6)return;const Y=pe(b,_),J=_.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+G);const _e=i.get(J);if(J.version!==_e.__version||Y===!0){n.activeTexture(t.TEXTURE0+G);const we=Nt.getPrimaries(Nt.workingColorSpace),oe=_.colorSpace===rs?null:Nt.getPrimaries(_.colorSpace),K=_.colorSpace===rs||we===oe?t.NONE:t.BROWSER_DEFAULT_WEBGL;n.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,K);const re=_.isCompressedTexture||_.image[0].isCompressedTexture,ge=_.image[0]&&_.image[0].isDataTexture,xe=[];for(let Se=0;Se<6;Se++)!re&&!ge?xe[Se]=m(_.image[Se],!0,a.maxCubemapSize):xe[Se]=ge?_.image[Se].image:_.image[Se],xe[Se]=lt(_,xe[Se]);const be=xe[0],Fe=s.convert(_.format,_.colorSpace),je=s.convert(_.type),at=y(_.internalFormat,Fe,je,_.normalized,_.colorSpace),V=_.isVideoTexture!==!0,Ce=_e.__version===void 0||Y===!0,fe=J.dataReady;let le=A(_,be);et(t.TEXTURE_CUBE_MAP,_);let Pe;if(re){V&&Ce&&n.texStorage2D(t.TEXTURE_CUBE_MAP,le,at,be.width,be.height);for(let Se=0;Se<6;Se++){Pe=xe[Se].mipmaps;for(let qe=0;qe<Pe.length;qe++){const ke=Pe[qe];_.format!==Zi?Fe!==null?V?fe&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,0,0,ke.width,ke.height,Fe,ke.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,at,ke.width,ke.height,0,ke.data):rt("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,0,0,ke.width,ke.height,Fe,je,ke.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe,at,ke.width,ke.height,0,Fe,je,ke.data)}}}else{if(Pe=_.mipmaps,V&&Ce){Pe.length>0&&le++;const Se=ee(xe[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,le,at,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(ge){V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,xe[Se].width,xe[Se].height,Fe,je,xe[Se].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,at,xe[Se].width,xe[Se].height,0,Fe,je,xe[Se].data);for(let qe=0;qe<Pe.length;qe++){const Mt=Pe[qe].image[Se].image;V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,0,0,Mt.width,Mt.height,Fe,je,Mt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,at,Mt.width,Mt.height,0,Fe,je,Mt.data)}}else{V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Fe,je,xe[Se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,at,Fe,je,xe[Se]);for(let qe=0;qe<Pe.length;qe++){const ke=Pe[qe];V?fe&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,0,0,Fe,je,ke.image[Se]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+Se,qe+1,at,Fe,je,ke.image[Se])}}}f(_)&&x(t.TEXTURE_CUBE_MAP),_e.__version=J.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Xe(b,_,G,Y,J,_e){const we=s.convert(G.format,G.colorSpace),oe=s.convert(G.type),K=y(G.internalFormat,we,oe,G.normalized,G.colorSpace),re=i.get(_),ge=i.get(G);if(ge.__renderTarget=_,!re.__hasExternalTextures){const xe=Math.max(1,_.width>>_e),be=Math.max(1,_.height>>_e);J===t.TEXTURE_3D||J===t.TEXTURE_2D_ARRAY?n.texImage3D(J,_e,K,xe,be,_.depth,0,we,oe,null):n.texImage2D(J,_e,K,xe,be,0,we,oe,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),Oe(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,J,ge.__webglTexture,0,tt(_)):(J===t.TEXTURE_2D||J>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,J,ge.__webglTexture,_e),n.bindFramebuffer(t.FRAMEBUFFER,null)}function wt(b,_,G){if(t.bindRenderbuffer(t.RENDERBUFFER,b),_.depthBuffer){const Y=_.depthTexture,J=Y&&Y.isDepthTexture?Y.type:null,_e=U(_.stencilBuffer,J),we=_.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Oe(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,tt(_),_e,_.width,_.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,tt(_),_e,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,_e,_.width,_.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,we,t.RENDERBUFFER,b)}else{const Y=_.textures;for(let J=0;J<Y.length;J++){const _e=Y[J],we=s.convert(_e.format,_e.colorSpace),oe=s.convert(_e.type),K=y(_e.internalFormat,we,oe,_e.normalized,_e.colorSpace);Oe(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,tt(_),K,_.width,_.height):G?t.renderbufferStorageMultisample(t.RENDERBUFFER,tt(_),K,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,K,_.width,_.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function it(b,_,G){const Y=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),J.__webglTexture===void 0){J.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,J.__webglTexture),et(t.TEXTURE_CUBE_MAP,_.depthTexture);const re=s.convert(_.depthTexture.format),ge=s.convert(_.depthTexture.type);let xe;_.depthTexture.format===Xa?xe=t.DEPTH_COMPONENT24:_.depthTexture.format===Ws&&(xe=t.DEPTH24_STENCIL8);for(let be=0;be<6;be++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+be,0,xe,_.width,_.height,0,re,ge,null)}}else I(_.depthTexture,0);const _e=J.__webglTexture,we=tt(_),oe=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+G:t.TEXTURE_2D,K=_.depthTexture.format===Ws?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(_.depthTexture.format===Xa)Oe(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,oe,_e,0,we):t.framebufferTexture2D(t.FRAMEBUFFER,K,oe,_e,0);else if(_.depthTexture.format===Ws)Oe(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,K,oe,_e,0,we):t.framebufferTexture2D(t.FRAMEBUFFER,K,oe,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Rt(b){const _=i.get(b),G=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",J)};Y.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=Y}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(G)for(let Y=0;Y<6;Y++)it(_.__webglFramebuffer[Y],b,Y);else{const Y=b.texture.mipmaps;Y&&Y.length>0?it(_.__webglFramebuffer[0],b,0):it(_.__webglFramebuffer,b,0)}else if(G){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=t.createRenderbuffer(),wt(_.__webglDepthbuffer[Y],b,!1);else{const J=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,_e),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,_e)}}else{const Y=b.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=t.createRenderbuffer(),wt(_.__webglDepthbuffer,b,!1);else{const J=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,_e),t.framebufferRenderbuffer(t.FRAMEBUFFER,J,t.RENDERBUFFER,_e)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function gt(b,_,G){const Y=i.get(b);_!==void 0&&Xe(Y.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),G!==void 0&&Rt(b)}function dt(b){const _=b.texture,G=i.get(b),Y=i.get(_);b.addEventListener("dispose",M);const J=b.textures,_e=b.isWebGLCubeRenderTarget===!0,we=J.length>1;if(we||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=_.version,r.memory.textures++),_e){G.__webglFramebuffer=[];for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer[oe]=[];for(let K=0;K<_.mipmaps.length;K++)G.__webglFramebuffer[oe][K]=t.createFramebuffer()}else G.__webglFramebuffer[oe]=t.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){G.__webglFramebuffer=[];for(let oe=0;oe<_.mipmaps.length;oe++)G.__webglFramebuffer[oe]=t.createFramebuffer()}else G.__webglFramebuffer=t.createFramebuffer();if(we)for(let oe=0,K=J.length;oe<K;oe++){const re=i.get(J[oe]);re.__webglTexture===void 0&&(re.__webglTexture=t.createTexture(),r.memory.textures++)}if(b.samples>0&&Oe(b)===!1){G.__webglMultisampledFramebuffer=t.createFramebuffer(),G.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,G.__webglMultisampledFramebuffer);for(let oe=0;oe<J.length;oe++){const K=J[oe];G.__webglColorRenderbuffer[oe]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,G.__webglColorRenderbuffer[oe]);const re=s.convert(K.format,K.colorSpace),ge=s.convert(K.type),xe=y(K.internalFormat,re,ge,K.normalized,K.colorSpace,b.isXRRenderTarget===!0),be=tt(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,be,xe,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+oe,t.RENDERBUFFER,G.__webglColorRenderbuffer[oe])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(G.__webglDepthRenderbuffer=t.createRenderbuffer(),wt(G.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(_e){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),et(t.TEXTURE_CUBE_MAP,_);for(let oe=0;oe<6;oe++)if(_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Xe(G.__webglFramebuffer[oe][K],b,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,K);else Xe(G.__webglFramebuffer[oe],b,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0);f(_)&&x(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(we){for(let oe=0,K=J.length;oe<K;oe++){const re=J[oe],ge=i.get(re);let xe=t.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(xe=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(xe,ge.__webglTexture),et(xe,re),Xe(G.__webglFramebuffer,b,re,t.COLOR_ATTACHMENT0+oe,xe,0),f(re)&&x(xe)}n.unbindTexture()}else{let oe=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(oe=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(oe,Y.__webglTexture),et(oe,_),_.mipmaps&&_.mipmaps.length>0)for(let K=0;K<_.mipmaps.length;K++)Xe(G.__webglFramebuffer[K],b,_,t.COLOR_ATTACHMENT0,oe,K);else Xe(G.__webglFramebuffer,b,_,t.COLOR_ATTACHMENT0,oe,0);f(_)&&x(oe),n.unbindTexture()}b.depthBuffer&&Rt(b)}function Ot(b){const _=b.textures;for(let G=0,Y=_.length;G<Y;G++){const J=_[G];if(f(J)){const _e=S(b),we=i.get(J).__webglTexture;n.bindTexture(_e,we),x(_e),n.unbindTexture()}}}const ut=[],Yt=[];function Qt(b){if(b.samples>0){if(Oe(b)===!1){const _=b.textures,G=b.width,Y=b.height;let J=t.COLOR_BUFFER_BIT;const _e=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,we=i.get(b),oe=_.length>1;if(oe)for(let re=0;re<_.length;re++)n.bindFramebuffer(t.FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,we.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,we.__webglMultisampledFramebuffer);const K=b.texture.mipmaps;K&&K.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglFramebuffer);for(let re=0;re<_.length;re++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(J|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(J|=t.STENCIL_BUFFER_BIT)),oe){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,we.__webglColorRenderbuffer[re]);const ge=i.get(_[re]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,ge,0)}t.blitFramebuffer(0,0,G,Y,0,0,G,Y,J,t.NEAREST),l===!0&&(ut.length=0,Yt.length=0,ut.push(t.COLOR_ATTACHMENT0+re),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ut.push(_e),Yt.push(_e),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Yt)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ut))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),oe)for(let re=0;re<_.length;re++){n.bindFramebuffer(t.FRAMEBUFFER,we.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.RENDERBUFFER,we.__webglColorRenderbuffer[re]);const ge=i.get(_[re]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,we.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+re,t.TEXTURE_2D,ge,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,we.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[_])}}}function tt(b){return Math.min(a.maxSamples,b.samples)}function Oe(b){const _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(b){const _=r.render.frame;d.get(b)!==_&&(d.set(b,_),b.update())}function lt(b,_){const G=b.colorSpace,Y=b.format,J=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||G!==Ju&&G!==rs&&(Nt.getTransfer(G)===Wt?(Y!==Zi||J!==Oi)&&rt("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):zt("WebGLTextures: Unsupported texture color space:",G)),_}function ee(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=P,this.resetTextureUnits=X,this.getTextureUnits=N,this.setTextureUnits=B,this.setTexture2D=I,this.setTexture2DArray=j,this.setTexture3D=me,this.setTextureCube=Ae,this.rebindTextures=gt,this.setupRenderTarget=dt,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=Qt,this.setupDepthRenderbuffer=Rt,this.setupFrameBufferTexture=Xe,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function jR(t,e){function n(i,a=rs){let s;const r=Nt.getTransfer(a);if(i===Oi)return t.UNSIGNED_BYTE;if(i===jm)return t.UNSIGNED_SHORT_4_4_4_4;if(i===qm)return t.UNSIGNED_SHORT_5_5_5_1;if(i===fS)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===dS)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===cS)return t.BYTE;if(i===uS)return t.SHORT;if(i===Bl)return t.UNSIGNED_SHORT;if(i===Wm)return t.INT;if(i===ua)return t.UNSIGNED_INT;if(i===Yi)return t.FLOAT;if(i===Va)return t.HALF_FLOAT;if(i===hS)return t.ALPHA;if(i===pS)return t.RGB;if(i===Zi)return t.RGBA;if(i===Xa)return t.DEPTH_COMPONENT;if(i===Ws)return t.DEPTH_STENCIL;if(i===Ym)return t.RED;if(i===Zm)return t.RED_INTEGER;if(i===ar)return t.RG;if(i===Km)return t.RG_INTEGER;if(i===$m)return t.RGBA_INTEGER;if(i===hu||i===pu||i===mu||i===gu)if(r===Wt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===hu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===pu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===mu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===gu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===hu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===pu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===mu)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===gu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ap||i===sp||i===rp||i===op)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ap)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===sp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===rp)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===op)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===lp||i===cp||i===up||i===fp||i===dp||i===$u||i===hp)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===lp||i===cp)return r===Wt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===up)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===fp)return s.COMPRESSED_R11_EAC;if(i===dp)return s.COMPRESSED_SIGNED_R11_EAC;if(i===$u)return s.COMPRESSED_RG11_EAC;if(i===hp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===yp||i===Sp||i===Mp||i===bp||i===Ep||i===Tp||i===Ap||i===wp)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===pp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===mp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===gp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===vp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===_p)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===xp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===yp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Sp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Mp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===bp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Ep)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Tp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ap)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===wp)return r===Wt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Rp||i===Cp||i===Dp)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Rp)return r===Wt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Cp)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Dp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Np||i===Up||i===Qu||i===Lp)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Np)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Up)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Qu)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Fl?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const qR=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,YR=`
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

}`;class ZR{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new wS(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new Bn({vertexShader:qR,fragmentShader:YR,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Hi(new wf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class KR extends dr{constructor(e,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const E=typeof XRWebGLBinding<"u",m=new ZR,f={},x=n.getContextAttributes();let S=null,y=null;const U=[],A=[],T=new Gt;let M=null;const D=new Di;D.viewport=new dn;const L=new Di;L.viewport=new dn;const z=[D,L],H=new rT;let X=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(pe){let Re=U[pe];return Re===void 0&&(Re=new Ed,U[pe]=Re),Re.getTargetRaySpace()},this.getControllerGrip=function(pe){let Re=U[pe];return Re===void 0&&(Re=new Ed,U[pe]=Re),Re.getGripSpace()},this.getHand=function(pe){let Re=U[pe];return Re===void 0&&(Re=new Ed,U[pe]=Re),Re.getHandSpace()};function B(pe){const Re=A.indexOf(pe.inputSource);if(Re===-1)return;const ue=U[Re];ue!==void 0&&(ue.update(pe.inputSource,pe.frame,c||r),ue.dispatchEvent({type:pe.type,data:pe.inputSource}))}function P(){a.removeEventListener("select",B),a.removeEventListener("selectstart",B),a.removeEventListener("selectend",B),a.removeEventListener("squeeze",B),a.removeEventListener("squeezestart",B),a.removeEventListener("squeezeend",B),a.removeEventListener("end",P),a.removeEventListener("inputsourceschange",F);for(let pe=0;pe<U.length;pe++){const Re=A[pe];Re!==null&&(A[pe]=null,U[pe].disconnect(Re))}X=null,N=null,m.reset();for(const pe in f)delete f[pe];e.setRenderTarget(S),p=null,u=null,h=null,a=null,y=null,et.stop(),i.isPresenting=!1,e.setPixelRatio(M),e.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(pe){s=pe,i.isPresenting===!0&&rt("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(pe){o=pe,i.isPresenting===!0&&rt("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(pe){c=pe},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&E&&(h=new XRWebGLBinding(a,n)),h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(pe){if(a=pe,a!==null){if(S=e.getRenderTarget(),a.addEventListener("select",B),a.addEventListener("selectstart",B),a.addEventListener("selectend",B),a.addEventListener("squeeze",B),a.addEventListener("squeezestart",B),a.addEventListener("squeezeend",B),a.addEventListener("end",P),a.addEventListener("inputsourceschange",F),x.xrCompatible!==!0&&await n.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(T),E&&"createProjectionLayer"in XRWebGLBinding.prototype){let ue=null,Be=null,Ge=null;x.depth&&(Ge=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,ue=x.stencil?Ws:Xa,Be=x.stencil?Fl:ua);const Xe={colorFormat:n.RGBA8,depthFormat:Ge,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Xe),a.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new ca(u.textureWidth,u.textureHeight,{format:Zi,type:Oi,depthTexture:new Mo(u.textureWidth,u.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,ue),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const ue={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,ue),a.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new ca(p.framebufferWidth,p.framebufferHeight,{format:Zi,type:Oi,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),et.setContext(a),et.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(pe){for(let Re=0;Re<pe.removed.length;Re++){const ue=pe.removed[Re],Be=A.indexOf(ue);Be>=0&&(A[Be]=null,U[Be].disconnect(ue))}for(let Re=0;Re<pe.added.length;Re++){const ue=pe.added[Re];let Be=A.indexOf(ue);if(Be===-1){for(let Xe=0;Xe<U.length;Xe++)if(Xe>=A.length){A.push(ue),Be=Xe;break}else if(A[Xe]===null){A[Xe]=ue,Be=Xe;break}if(Be===-1)break}const Ge=U[Be];Ge&&Ge.connect(ue)}}const I=new Q,j=new Q;function me(pe,Re,ue){I.setFromMatrixPosition(Re.matrixWorld),j.setFromMatrixPosition(ue.matrixWorld);const Be=I.distanceTo(j),Ge=Re.projectionMatrix.elements,Xe=ue.projectionMatrix.elements,wt=Ge[14]/(Ge[10]-1),it=Ge[14]/(Ge[10]+1),Rt=(Ge[9]+1)/Ge[5],gt=(Ge[9]-1)/Ge[5],dt=(Ge[8]-1)/Ge[0],Ot=(Xe[8]+1)/Xe[0],ut=wt*dt,Yt=wt*Ot,Qt=Be/(-dt+Ot),tt=Qt*-dt;if(Re.matrixWorld.decompose(pe.position,pe.quaternion,pe.scale),pe.translateX(tt),pe.translateZ(Qt),pe.matrixWorld.compose(pe.position,pe.quaternion,pe.scale),pe.matrixWorldInverse.copy(pe.matrixWorld).invert(),Ge[10]===-1)pe.projectionMatrix.copy(Re.projectionMatrix),pe.projectionMatrixInverse.copy(Re.projectionMatrixInverse);else{const Oe=wt+Qt,k=it+Qt,lt=ut-tt,ee=Yt+(Be-tt),b=Rt*it/k*Oe,_=gt*it/k*Oe;pe.projectionMatrix.makePerspective(lt,ee,b,_,Oe,k),pe.projectionMatrixInverse.copy(pe.projectionMatrix).invert()}}function Ae(pe,Re){Re===null?pe.matrixWorld.copy(pe.matrix):pe.matrixWorld.multiplyMatrices(Re.matrixWorld,pe.matrix),pe.matrixWorldInverse.copy(pe.matrixWorld).invert()}this.updateCamera=function(pe){if(a===null)return;let Re=pe.near,ue=pe.far;m.texture!==null&&(m.depthNear>0&&(Re=m.depthNear),m.depthFar>0&&(ue=m.depthFar)),H.near=L.near=D.near=Re,H.far=L.far=D.far=ue,(X!==H.near||N!==H.far)&&(a.updateRenderState({depthNear:H.near,depthFar:H.far}),X=H.near,N=H.far),H.layers.mask=pe.layers.mask|6,D.layers.mask=H.layers.mask&-5,L.layers.mask=H.layers.mask&-3;const Be=pe.parent,Ge=H.cameras;Ae(H,Be);for(let Xe=0;Xe<Ge.length;Xe++)Ae(Ge[Xe],Be);Ge.length===2?me(H,D,L):H.projectionMatrix.copy(D.projectionMatrix),Ee(pe,H,Be)};function Ee(pe,Re,ue){ue===null?pe.matrix.copy(Re.matrixWorld):(pe.matrix.copy(ue.matrixWorld),pe.matrix.invert(),pe.matrix.multiply(Re.matrixWorld)),pe.matrix.decompose(pe.position,pe.quaternion,pe.scale),pe.updateMatrixWorld(!0),pe.projectionMatrix.copy(Re.projectionMatrix),pe.projectionMatrixInverse.copy(Re.projectionMatrixInverse),pe.isPerspectiveCamera&&(pe.fov=Op*2*Math.atan(1/pe.projectionMatrix.elements[5]),pe.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(pe){l=pe,u!==null&&(u.fixedFoveation=pe),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=pe)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function(pe){return f[pe]};let Qe=null;function Je(pe,Re){if(d=Re.getViewerPose(c||r),g=Re,d!==null){const ue=d.views;p!==null&&(e.setRenderTargetFramebuffer(y,p.framebuffer),e.setRenderTarget(y));let Be=!1;ue.length!==H.cameras.length&&(H.cameras.length=0,Be=!0);for(let it=0;it<ue.length;it++){const Rt=ue[it];let gt=null;if(p!==null)gt=p.getViewport(Rt);else{const Ot=h.getViewSubImage(u,Rt);gt=Ot.viewport,it===0&&(e.setRenderTargetTextures(y,Ot.colorTexture,Ot.depthStencilTexture),e.setRenderTarget(y))}let dt=z[it];dt===void 0&&(dt=new Di,dt.layers.enable(it),dt.viewport=new dn,z[it]=dt),dt.matrix.fromArray(Rt.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(Rt.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(gt.x,gt.y,gt.width,gt.height),it===0&&(H.matrix.copy(dt.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Be===!0&&H.cameras.push(dt)}const Ge=a.enabledFeatures;if(Ge&&Ge.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&E){h=i.getBinding();const it=h.getDepthInformation(ue[0]);it&&it.isValid&&it.texture&&m.init(it,a.renderState)}if(Ge&&Ge.includes("camera-access")&&E){e.state.unbindTexture(),h=i.getBinding();for(let it=0;it<ue.length;it++){const Rt=ue[it].camera;if(Rt){let gt=f[Rt];gt||(gt=new wS,f[Rt]=gt);const dt=h.getCameraImage(Rt);gt.sourceTexture=dt}}}}for(let ue=0;ue<U.length;ue++){const Be=A[ue],Ge=U[ue];Be!==null&&Ge!==void 0&&Ge.update(Be,Re,c||r)}Qe&&Qe(pe,Re),Re.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Re}),g=null}const et=new DS;et.setAnimationLoop(Je),this.setAnimationLoop=function(pe){Qe=pe},this.dispose=function(){}}}const $R=new nn,IS=new ht;IS.set(-1,0,0,0,1,0,0,0,1);function QR(t,e){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,RS(t)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,x,S,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),E(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,x,S):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===si&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===si&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const x=e.get(f),S=x.envMap,y=x.envMapRotation;S&&(m.envMap.value=S,m.envMapRotation.value.setFromMatrix4($R.makeRotationFromEuler(y)).transpose(),S.isCubeTexture&&S.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(IS),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,x,S){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=S*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===si&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function E(m,f){const x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function JR(t,e,n,i){let a={},s={},r=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,U){const A=U.program;i.uniformBlockBinding(y,A)}function c(y,U){let A=a[y.id];A===void 0&&(m(y),A=d(y),a[y.id]=A,y.addEventListener("dispose",x));const T=U.program;i.updateUBOMapping(y,T);const M=e.render.frame;s[y.id]!==M&&(u(y),s[y.id]=M)}function d(y){const U=h();y.__bindingPointIndex=U;const A=t.createBuffer(),T=y.__size,M=y.usage;return t.bindBuffer(t.UNIFORM_BUFFER,A),t.bufferData(t.UNIFORM_BUFFER,T,M),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,U,A),A}function h(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return zt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const U=a[y.id],A=y.uniforms,T=y.__cache;t.bindBuffer(t.UNIFORM_BUFFER,U);for(let M=0,D=A.length;M<D;M++){const L=A[M];if(Array.isArray(L))for(let z=0,H=L.length;z<H;z++)p(L[z],M,z,T);else p(L,M,0,T)}t.bindBuffer(t.UNIFORM_BUFFER,null)}function p(y,U,A,T){if(E(y,U,A,T)===!0){const M=y.__offset,D=y.value;if(Array.isArray(D)){let L=0;for(let z=0;z<D.length;z++){const H=D[z],X=f(H);g(H,y.__data,L),typeof H!="number"&&typeof H!="boolean"&&!H.isMatrix3&&!ArrayBuffer.isView(H)&&(L+=X.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(D,y.__data,0);t.bufferSubData(t.UNIFORM_BUFFER,M,y.__data)}}function g(y,U,A){typeof y=="number"||typeof y=="boolean"?U[0]=y:y.isMatrix3?(U[0]=y.elements[0],U[1]=y.elements[1],U[2]=y.elements[2],U[3]=0,U[4]=y.elements[3],U[5]=y.elements[4],U[6]=y.elements[5],U[7]=0,U[8]=y.elements[6],U[9]=y.elements[7],U[10]=y.elements[8],U[11]=0):ArrayBuffer.isView(y)?U.set(new y.constructor(y.buffer,y.byteOffset,U.length)):y.toArray(U,A)}function E(y,U,A,T){const M=y.value,D=U+"_"+A;if(T[D]===void 0)return typeof M=="number"||typeof M=="boolean"?T[D]=M:ArrayBuffer.isView(M)?T[D]=M.slice():T[D]=M.clone(),!0;{const L=T[D];if(typeof M=="number"||typeof M=="boolean"){if(L!==M)return T[D]=M,!0}else{if(ArrayBuffer.isView(M))return!0;if(L.equals(M)===!1)return L.copy(M),!0}}return!1}function m(y){const U=y.uniforms;let A=0;const T=16;for(let D=0,L=U.length;D<L;D++){const z=Array.isArray(U[D])?U[D]:[U[D]];for(let H=0,X=z.length;H<X;H++){const N=z[H],B=Array.isArray(N.value)?N.value:[N.value];for(let P=0,F=B.length;P<F;P++){const I=B[P],j=f(I),me=A%T,Ae=me%j.boundary,Ee=me+Ae;A+=Ae,Ee!==0&&T-Ee<j.storage&&(A+=T-Ee),N.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=A,A+=j.storage}}}const M=A%T;return M>0&&(A+=T-M),y.__size=A,y.__cache={},this}function f(y){const U={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(U.boundary=4,U.storage=4):y.isVector2?(U.boundary=8,U.storage=8):y.isVector3||y.isColor?(U.boundary=16,U.storage=12):y.isVector4?(U.boundary=16,U.storage=16):y.isMatrix3?(U.boundary=48,U.storage=48):y.isMatrix4?(U.boundary=64,U.storage=64):y.isTexture?rt("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(U.boundary=16,U.storage=y.byteLength):rt("WebGLRenderer: Unsupported uniform value type.",y),U}function x(y){const U=y.target;U.removeEventListener("dispose",x);const A=r.indexOf(U.__bindingPointIndex);r.splice(A,1),t.deleteBuffer(a[U.id]),delete a[U.id],delete s[U.id]}function S(){for(const y in a)t.deleteBuffer(a[y]);r=[],a={},s={}}return{bind:l,update:c,dispose:S}}const eC=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ea=null;function tC(){return ea===null&&(ea=new bS(eC,16,16,ar,Va),ea.name="DFG_LUT",ea.minFilter=Vn,ea.magFilter=Vn,ea.wrapS=Ua,ea.wrapT=Ua,ea.generateMipmaps=!1,ea.needsUpdate=!0),ea}class BS{constructor(e={}){const{canvas:n=M1(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Oi}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const E=p,m=new Set([$m,Km,Zm]),f=new Set([Oi,ua,Bl,Fl,jm,qm]),x=new Uint32Array(4),S=new Int32Array(4),y=new Q;let U=null,A=null;const T=[],M=[];let D=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const L=this;let z=!1,H=null,X=null,N=null,B=null;this._outputColorSpace=Ai;let P=0,F=0,I=null,j=-1,me=null;const Ae=new dn,Ee=new dn;let Qe=null;const Je=new At(0);let et=0,pe=n.width,Re=n.height,ue=1,Be=null,Ge=null;const Xe=new dn(0,0,pe,Re),wt=new dn(0,0,pe,Re);let it=!1;const Rt=new ES;let gt=!1,dt=!1;const Ot=new nn,ut=new Q,Yt=new dn,Qt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let tt=!1;function Oe(){return I===null?ue:1}let k=i;function lt(R,Z){return n.getContext(R,Z)}try{const R={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Xm}`),n.addEventListener("webglcontextlost",Mt,!1),n.addEventListener("webglcontextrestored",It,!1),n.addEventListener("webglcontextcreationerror",Dn,!1),k===null){const Z="webgl2";if(k=lt(Z,R),k===null)throw lt(Z)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(R){throw zt("WebGLRenderer: "+R.message),R}let ee,b,_,G,Y,J,_e,we,oe,K,re,ge,xe,be,Fe,je,at,V,Ce,fe,le,Pe,Se;function qe(){ee=new tw(k),ee.init(),le=new jR(k,ee),b=new q2(k,ee,e,le),_=new XR(k,ee),b.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),X=k.createFramebuffer(),N=k.createFramebuffer(),B=k.createFramebuffer(),G=new aw(k),Y=new DR,J=new WR(k,ee,_,Y,b,le,G),_e=new ew(L),we=new lT(k),Pe=new W2(k,we),oe=new nw(k,we,G,Pe),K=new rw(k,oe,we,Pe,G),V=new sw(k,b,J),Fe=new Y2(Y),re=new CR(L,_e,ee,b,Pe,Fe),ge=new QR(L,Y),xe=new UR,be=new BR(ee),at=new X2(L,_e,_,K,g,l),je=new VR(L,K,b),Se=new JR(k,G,b,_),Ce=new j2(k,ee,G),fe=new iw(k,ee,G),G.programs=re.programs,L.capabilities=b,L.extensions=ee,L.properties=Y,L.renderLists=xe,L.shadowMap=je,L.state=_,L.info=G}qe(),E!==Oi&&(D=new lw(E,n.width,n.height,o,a,s));const ke=new KR(L,k);this.xr=ke,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){const R=ee.get("WEBGL_lose_context");R&&R.loseContext()},this.forceContextRestore=function(){const R=ee.get("WEBGL_lose_context");R&&R.restoreContext()},this.getPixelRatio=function(){return ue},this.setPixelRatio=function(R){R!==void 0&&(ue=R,this.setSize(pe,Re,!1))},this.getSize=function(R){return R.set(pe,Re)},this.setSize=function(R,Z,ae=!0){if(ke.isPresenting){rt("WebGLRenderer: Can't change size while VR device is presenting.");return}pe=R,Re=Z,n.width=Math.floor(R*ue),n.height=Math.floor(Z*ue),ae===!0&&(n.style.width=R+"px",n.style.height=Z+"px"),D!==null&&D.setSize(n.width,n.height),this.setViewport(0,0,R,Z)},this.getDrawingBufferSize=function(R){return R.set(pe*ue,Re*ue).floor()},this.setDrawingBufferSize=function(R,Z,ae){pe=R,Re=Z,ue=ae,n.width=Math.floor(R*ae),n.height=Math.floor(Z*ae),this.setViewport(0,0,R,Z)},this.setEffects=function(R){if(E===Oi){zt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(R){for(let Z=0;Z<R.length;Z++)if(R[Z].isOutputPass===!0){rt("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}D.setEffects(R||[])},this.getCurrentViewport=function(R){return R.copy(Ae)},this.getViewport=function(R){return R.copy(Xe)},this.setViewport=function(R,Z,ae,$){R.isVector4?Xe.set(R.x,R.y,R.z,R.w):Xe.set(R,Z,ae,$),_.viewport(Ae.copy(Xe).multiplyScalar(ue).round())},this.getScissor=function(R){return R.copy(wt)},this.setScissor=function(R,Z,ae,$){R.isVector4?wt.set(R.x,R.y,R.z,R.w):wt.set(R,Z,ae,$),_.scissor(Ee.copy(wt).multiplyScalar(ue).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(R){_.setScissorTest(it=R)},this.setOpaqueSort=function(R){Be=R},this.setTransparentSort=function(R){Ge=R},this.getClearColor=function(R){return R.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(R=!0,Z=!0,ae=!0){let $=0;if(R){let te=!1;if(I!==null){const ze=I.texture.format;te=m.has(ze)}if(te){const ze=I.texture.type,w=f.has(ze),C=at.getClearColor(),O=at.getClearAlpha(),W=C.r,q=C.g,ne=C.b;w?(x[0]=W,x[1]=q,x[2]=ne,x[3]=O,k.clearBufferuiv(k.COLOR,0,x)):(S[0]=W,S[1]=q,S[2]=ne,S[3]=O,k.clearBufferiv(k.COLOR,0,S))}else $|=k.COLOR_BUFFER_BIT}Z&&($|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ae&&($|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),$!==0&&k.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(R){R.setRenderer(this),H=R},this.dispose=function(){n.removeEventListener("webglcontextlost",Mt,!1),n.removeEventListener("webglcontextrestored",It,!1),n.removeEventListener("webglcontextcreationerror",Dn,!1),at.dispose(),xe.dispose(),be.dispose(),Y.dispose(),_e.dispose(),K.dispose(),Pe.dispose(),Se.dispose(),re.dispose(),ke.dispose(),ke.removeEventListener("sessionstart",li),ke.removeEventListener("sessionend",Hn),$n.stop()};function Mt(R){R.preventDefault(),q0("WebGLRenderer: Context Lost."),z=!0}function It(){q0("WebGLRenderer: Context Restored."),z=!1;const R=G.autoReset,Z=je.enabled,ae=je.autoUpdate,$=je.needsUpdate,te=je.type;qe(),G.autoReset=R,je.enabled=Z,je.autoUpdate=ae,je.needsUpdate=$,je.type=te}function Dn(R){zt("WebGLRenderer: A WebGL context could not be created. Reason: ",R.statusMessage)}function Nn(R){const Z=R.target;Z.removeEventListener("dispose",Nn),Dt(Z)}function Dt(R){Si(R),Y.remove(R)}function Si(R){const Z=Y.get(R).programs;Z!==void 0&&(Z.forEach(function(ae){re.releaseProgram(ae)}),R.isShaderMaterial&&re.releaseShaderCache(R))}this.renderBufferDirect=function(R,Z,ae,$,te,ze){Z===null&&(Z=Qt);const w=te.isMesh&&te.matrixWorld.determinantAffine()<0,C=pa(R,Z,ae,$,te);_.setMaterial($,w);let O=ae.index,W=1;if($.wireframe===!0){if(O=oe.getWireframeAttribute(ae),O===void 0)return;W=2}const q=ae.drawRange,ne=ae.attributes.position;let ie=q.start*W,he=(q.start+q.count)*W;ze!==null&&(ie=Math.max(ie,ze.start*W),he=Math.min(he,(ze.start+ze.count)*W)),O!==null?(ie=Math.max(ie,0),he=Math.min(he,O.count)):ne!=null&&(ie=Math.max(ie,0),he=Math.min(he,ne.count));const ve=he-ie;if(ve<0||ve===1/0)return;Pe.setup(te,$,C,ae,O);let Te,De=Ce;if(O!==null&&(Te=we.get(O),De=fe,De.setIndex(Te)),te.isMesh)$.wireframe===!0?(_.setLineWidth($.wireframeLinewidth*Oe()),De.setMode(k.LINES)):De.setMode(k.TRIANGLES);else if(te.isLine){let Me=$.linewidth;Me===void 0&&(Me=1),_.setLineWidth(Me*Oe()),te.isLineSegments?De.setMode(k.LINES):te.isLineLoop?De.setMode(k.LINE_LOOP):De.setMode(k.LINE_STRIP)}else te.isPoints?De.setMode(k.POINTS):te.isSprite&&De.setMode(k.TRIANGLES);if(te.isBatchedMesh)if(ee.get("WEBGL_multi_draw"))De.renderMultiDraw(te._multiDrawStarts,te._multiDrawCounts,te._multiDrawCount);else{const Me=te._multiDrawStarts,ce=te._multiDrawCounts,Ye=te._multiDrawCount,Ne=O?we.get(O).bytesPerElement:1,Ve=Y.get($).currentProgram.getUniforms();for(let Ze=0;Ze<Ye;Ze++)Ve.setValue(k,"_gl_DrawID",Ze),De.render(Me[Ze]/Ne,ce[Ze])}else if(te.isInstancedMesh)De.renderInstances(ie,ve,te.count);else if(ae.isInstancedBufferGeometry){const Me=ae._maxInstanceCount!==void 0?ae._maxInstanceCount:1/0,ce=Math.min(ae.instanceCount,Me);De.renderInstances(ie,ve,ce)}else De.render(ie,ve)};function en(R,Z,ae){R.transparent===!0&&R.side===Ra&&R.forceSinglePass===!1?(R.side=si,R.needsUpdate=!0,Qn(R,Z,ae),R.side=ws,R.needsUpdate=!0,Qn(R,Z,ae),R.side=Ra):Qn(R,Z,ae)}this.compile=function(R,Z,ae=null){ae===null&&(ae=R),A=be.get(ae),A.init(Z),M.push(A),ae.traverseVisible(function(te){te.isLight&&te.layers.test(Z.layers)&&(A.pushLight(te),te.castShadow&&A.pushShadow(te))}),R!==ae&&R.traverseVisible(function(te){te.isLight&&te.layers.test(Z.layers)&&(A.pushLight(te),te.castShadow&&A.pushShadow(te))}),A.setupLights();const $=new Set;return R.traverse(function(te){if(!(te.isMesh||te.isPoints||te.isLine||te.isSprite))return;const ze=te.material;if(ze)if(Array.isArray(ze))for(let w=0;w<ze.length;w++){const C=ze[w];en(C,ae,te),$.add(C)}else en(ze,ae,te),$.add(ze)}),A=M.pop(),$},this.compileAsync=function(R,Z,ae=null){const $=this.compile(R,Z,ae);return new Promise(te=>{function ze(){if($.forEach(function(w){Y.get(w).currentProgram.isReady()&&$.delete(w)}),$.size===0){te(R);return}setTimeout(ze,10)}ee.get("KHR_parallel_shader_compile")!==null?ze():setTimeout(ze,10)})};let bt=null;function Un(R){bt&&bt(R)}function li(){$n.stop()}function Hn(){$n.start()}const $n=new DS;$n.setAnimationLoop(Un),typeof self<"u"&&$n.setContext(self),this.setAnimationLoop=function(R){bt=R,ke.setAnimationLoop(R),R===null?$n.stop():$n.start()},ke.addEventListener("sessionstart",li),ke.addEventListener("sessionend",Hn),this.render=function(R,Z){if(Z!==void 0&&Z.isCamera!==!0){zt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(z===!0)return;H!==null&&H.renderStart(R,Z);const ae=ke.enabled===!0&&ke.isPresenting===!0,$=D!==null&&(I===null||ae)&&D.begin(L,I);if(R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),Z.parent===null&&Z.matrixWorldAutoUpdate===!0&&Z.updateMatrixWorld(),ke.enabled===!0&&ke.isPresenting===!0&&(D===null||D.isCompositing()===!1)&&(ke.cameraAutoUpdate===!0&&ke.updateCamera(Z),Z=ke.getCamera()),R.isScene===!0&&R.onBeforeRender(L,R,Z,I),A=be.get(R,M.length),A.init(Z),A.state.textureUnits=J.getTextureUnits(),M.push(A),Ot.multiplyMatrices(Z.projectionMatrix,Z.matrixWorldInverse),Rt.setFromProjectionMatrix(Ot,ra,Z.reversedDepth),dt=this.localClippingEnabled,gt=Fe.init(this.clippingPlanes,dt),U=xe.get(R,T.length),U.init(),T.push(U),ke.enabled===!0&&ke.isPresenting===!0){const w=L.xr.getDepthSensingMesh();w!==null&&Gi(w,Z,-1/0,L.sortObjects)}Gi(R,Z,0,L.sortObjects),U.finish(),L.sortObjects===!0&&U.sort(Be,Ge,Z.reversedDepth),tt=ke.enabled===!1||ke.isPresenting===!1||ke.hasDepthSensing()===!1,tt&&at.addToRenderList(U,R),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),gt===!0&&Fe.beginShadows();const te=A.state.shadowsArray;if(je.render(te,R,Z),gt===!0&&Fe.endShadows(),($&&D.hasRenderPass())===!1){const w=U.opaque,C=U.transmissive;if(A.setupLights(),Z.isArrayCamera){const O=Z.cameras;if(C.length>0)for(let W=0,q=O.length;W<q;W++){const ne=O[W];Mi(w,C,R,ne)}tt&&at.render(R);for(let W=0,q=O.length;W<q;W++){const ne=O[W];ha(U,R,ne,ne.viewport)}}else C.length>0&&Mi(w,C,R,Z),tt&&at.render(R),ha(U,R,Z)}I!==null&&F===0&&(J.updateMultisampleRenderTarget(I),J.updateRenderTargetMipmap(I)),$&&D.end(L),R.isScene===!0&&R.onAfterRender(L,R,Z),Pe.resetDefaultState(),j=-1,me=null,M.pop(),M.length>0?(A=M[M.length-1],J.setTextureUnits(A.state.textureUnits),gt===!0&&Fe.setGlobalState(L.clippingPlanes,A.state.camera)):A=null,T.pop(),T.length>0?U=T[T.length-1]:U=null,H!==null&&H.renderEnd()};function Gi(R,Z,ae,$){if(R.visible===!1)return;if(R.layers.test(Z.layers)){if(R.isGroup)ae=R.renderOrder;else if(R.isLOD)R.autoUpdate===!0&&R.update(Z);else if(R.isLightProbeGrid)A.pushLightProbeGrid(R);else if(R.isLight)A.pushLight(R),R.castShadow&&A.pushShadow(R);else if(R.isSprite){if(!R.frustumCulled||Rt.intersectsSprite(R)){$&&Yt.setFromMatrixPosition(R.matrixWorld).applyMatrix4(Ot);const w=K.update(R),C=R.material;C.visible&&U.push(R,w,C,ae,Yt.z,null)}}else if((R.isMesh||R.isLine||R.isPoints)&&(!R.frustumCulled||Rt.intersectsObject(R))){const w=K.update(R),C=R.material;if($&&(R.boundingSphere!==void 0?(R.boundingSphere===null&&R.computeBoundingSphere(),Yt.copy(R.boundingSphere.center)):(w.boundingSphere===null&&w.computeBoundingSphere(),Yt.copy(w.boundingSphere.center)),Yt.applyMatrix4(R.matrixWorld).applyMatrix4(Ot)),Array.isArray(C)){const O=w.groups;for(let W=0,q=O.length;W<q;W++){const ne=O[W],ie=C[ne.materialIndex];ie&&ie.visible&&U.push(R,w,ie,ae,Yt.z,ne)}}else C.visible&&U.push(R,w,C,ae,Yt.z,null)}}const ze=R.children;for(let w=0,C=ze.length;w<C;w++)Gi(ze[w],Z,ae,$)}function ha(R,Z,ae,$){const{opaque:te,transmissive:ze,transparent:w}=R;A.setupLightsView(ae),gt===!0&&Fe.setGlobalState(L.clippingPlanes,ae),$&&_.viewport(Ae.copy($)),te.length>0&&$i(te,Z,ae),ze.length>0&&$i(ze,Z,ae),w.length>0&&$i(w,Z,ae),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Mi(R,Z,ae,$){if((ae.isScene===!0?ae.overrideMaterial:null)!==null)return;if(A.state.transmissionRenderTarget[$.id]===void 0){const ie=ee.has("EXT_color_buffer_half_float")||ee.has("EXT_color_buffer_float");A.state.transmissionRenderTarget[$.id]=new ca(1,1,{generateMipmaps:!0,type:ie?Va:Oi,minFilter:Xs,samples:Math.max(4,b.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Nt.workingColorSpace})}const ze=A.state.transmissionRenderTarget[$.id],w=$.viewport||Ae;ze.setSize(w.z*L.transmissionResolutionScale,w.w*L.transmissionResolutionScale);const C=L.getRenderTarget(),O=L.getActiveCubeFace(),W=L.getActiveMipmapLevel();L.setRenderTarget(ze),L.getClearColor(Je),et=L.getClearAlpha(),et<1&&L.setClearColor(16777215,.5),L.clear(),tt&&at.render(ae);const q=L.toneMapping;L.toneMapping=la;const ne=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),A.setupLightsView($),gt===!0&&Fe.setGlobalState(L.clippingPlanes,$),$i(R,ae,$),J.updateMultisampleRenderTarget(ze),J.updateRenderTargetMipmap(ze),ee.has("WEBGL_multisampled_render_to_texture")===!1){let ie=!1;for(let he=0,ve=Z.length;he<ve;he++){const Te=Z[he],{object:De,geometry:Me,material:ce,group:Ye}=Te;if(ce.side===Ra&&De.layers.test($.layers)){const Ne=ce.side;ce.side=si,ce.needsUpdate=!0,ki(De,ae,$,Me,ce,Ye),ce.side=Ne,ce.needsUpdate=!0,ie=!0}}ie===!0&&(J.updateMultisampleRenderTarget(ze),J.updateRenderTargetMipmap(ze))}L.setRenderTarget(C,O,W),L.setClearColor(Je,et),ne!==void 0&&($.viewport=ne),L.toneMapping=q}function $i(R,Z,ae){const $=Z.isScene===!0?Z.overrideMaterial:null;for(let te=0,ze=R.length;te<ze;te++){const w=R[te],{object:C,geometry:O,group:W}=w;let q=w.material;q.allowOverride===!0&&$!==null&&(q=$),C.layers.test(ae.layers)&&ki(C,Z,ae,O,q,W)}}function ki(R,Z,ae,$,te,ze){R.onBeforeRender(L,Z,ae,$,te,ze),R.modelViewMatrix.multiplyMatrices(ae.matrixWorldInverse,R.matrixWorld),R.normalMatrix.getNormalMatrix(R.modelViewMatrix),te.onBeforeRender(L,Z,ae,$,R,ze),te.transparent===!0&&te.side===Ra&&te.forceSinglePass===!1?(te.side=si,te.needsUpdate=!0,L.renderBufferDirect(ae,Z,$,te,R,ze),te.side=ws,te.needsUpdate=!0,L.renderBufferDirect(ae,Z,$,te,R,ze),te.side=Ra):L.renderBufferDirect(ae,Z,$,te,R,ze),R.onAfterRender(L,Z,ae,$,te,ze)}function Qn(R,Z,ae){Z.isScene!==!0&&(Z=Qt);const $=Y.get(R),te=A.state.lights,ze=A.state.shadowsArray,w=te.state.version,C=re.getParameters(R,te.state,ze,Z,ae,A.state.lightProbeGridArray),O=re.getProgramCacheKey(C);let W=$.programs;$.environment=R.isMeshStandardMaterial||R.isMeshLambertMaterial||R.isMeshPhongMaterial?Z.environment:null,$.fog=Z.fog;const q=R.isMeshStandardMaterial||R.isMeshLambertMaterial&&!R.envMap||R.isMeshPhongMaterial&&!R.envMap;$.envMap=_e.get(R.envMap||$.environment,q),$.envMapRotation=$.environment!==null&&R.envMap===null?Z.environmentRotation:R.envMapRotation,W===void 0&&(R.addEventListener("dispose",Nn),W=new Map,$.programs=W);let ne=W.get(O);if(ne!==void 0){if($.currentProgram===ne&&$.lightsStateVersion===w)return ja(R,C),ne}else C.uniforms=re.getUniforms(R),H!==null&&R.isNodeMaterial&&H.build(R,ae,C),R.onBeforeCompile(C,L),ne=re.acquireProgram(C,O),W.set(O,ne),$.uniforms=C.uniforms;const ie=$.uniforms;return(!R.isShaderMaterial&&!R.isRawShaderMaterial||R.clipping===!0)&&(ie.clippingPlanes=Fe.uniform),ja(R,C),$.needsLights=Ns(R),$.lightsStateVersion=w,$.needsLights&&(ie.ambientLightColor.value=te.state.ambient,ie.lightProbe.value=te.state.probe,ie.directionalLights.value=te.state.directional,ie.directionalLightShadows.value=te.state.directionalShadow,ie.spotLights.value=te.state.spot,ie.spotLightShadows.value=te.state.spotShadow,ie.rectAreaLights.value=te.state.rectArea,ie.ltc_1.value=te.state.rectAreaLTC1,ie.ltc_2.value=te.state.rectAreaLTC2,ie.pointLights.value=te.state.point,ie.pointLightShadows.value=te.state.pointShadow,ie.hemisphereLights.value=te.state.hemi,ie.directionalShadowMatrix.value=te.state.directionalShadowMatrix,ie.spotLightMatrix.value=te.state.spotLightMatrix,ie.spotLightMap.value=te.state.spotLightMap,ie.pointShadowMatrix.value=te.state.pointShadowMatrix),$.lightProbeGrid=A.state.lightProbeGridArray.length>0,$.currentProgram=ne,$.uniformsList=null,ne}function bi(R){if(R.uniformsList===null){const Z=R.currentProgram.getUniforms();R.uniformsList=xu.seqWithValue(Z.seq,R.uniforms)}return R.uniformsList}function ja(R,Z){const ae=Y.get(R);ae.outputColorSpace=Z.outputColorSpace,ae.batching=Z.batching,ae.batchingColor=Z.batchingColor,ae.instancing=Z.instancing,ae.instancingColor=Z.instancingColor,ae.instancingMorph=Z.instancingMorph,ae.skinning=Z.skinning,ae.morphTargets=Z.morphTargets,ae.morphNormals=Z.morphNormals,ae.morphColors=Z.morphColors,ae.morphTargetsCount=Z.morphTargetsCount,ae.numClippingPlanes=Z.numClippingPlanes,ae.numIntersection=Z.numClipIntersection,ae.vertexAlphas=Z.vertexAlphas,ae.vertexTangents=Z.vertexTangents,ae.toneMapping=Z.toneMapping}function Ds(R,Z){if(R.length===0)return null;if(R.length===1)return R[0].texture!==null?R[0]:null;y.setFromMatrixPosition(Z.matrixWorld);for(let ae=0,$=R.length;ae<$;ae++){const te=R[ae];if(te.texture!==null&&te.boundingBox.containsPoint(y))return te}return null}function pa(R,Z,ae,$,te){Z.isScene!==!0&&(Z=Qt),J.resetTextureUnits();const ze=Z.fog,w=$.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial?Z.environment:null,C=I===null?L.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Nt.workingColorSpace,O=$.isMeshStandardMaterial||$.isMeshLambertMaterial&&!$.envMap||$.isMeshPhongMaterial&&!$.envMap,W=_e.get($.envMap||w,O),q=$.vertexColors===!0&&!!ae.attributes.color&&ae.attributes.color.itemSize===4,ne=!!ae.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),ie=!!ae.morphAttributes.position,he=!!ae.morphAttributes.normal,ve=!!ae.morphAttributes.color;let Te=la;$.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(Te=L.toneMapping);const De=ae.morphAttributes.position||ae.morphAttributes.normal||ae.morphAttributes.color,Me=De!==void 0?De.length:0,ce=Y.get($),Ye=A.state.lights;if(gt===!0&&(dt===!0||R!==me)){const ft=R===me&&$.id===j;Fe.setState($,R,ft)}let Ne=!1;$.version===ce.__version?(ce.needsLights&&ce.lightsStateVersion!==Ye.state.version||ce.outputColorSpace!==C||te.isBatchedMesh&&ce.batching===!1||!te.isBatchedMesh&&ce.batching===!0||te.isBatchedMesh&&ce.batchingColor===!0&&te.colorTexture===null||te.isBatchedMesh&&ce.batchingColor===!1&&te.colorTexture!==null||te.isInstancedMesh&&ce.instancing===!1||!te.isInstancedMesh&&ce.instancing===!0||te.isSkinnedMesh&&ce.skinning===!1||!te.isSkinnedMesh&&ce.skinning===!0||te.isInstancedMesh&&ce.instancingColor===!0&&te.instanceColor===null||te.isInstancedMesh&&ce.instancingColor===!1&&te.instanceColor!==null||te.isInstancedMesh&&ce.instancingMorph===!0&&te.morphTexture===null||te.isInstancedMesh&&ce.instancingMorph===!1&&te.morphTexture!==null||ce.envMap!==W||$.fog===!0&&ce.fog!==ze||ce.numClippingPlanes!==void 0&&(ce.numClippingPlanes!==Fe.numPlanes||ce.numIntersection!==Fe.numIntersection)||ce.vertexAlphas!==q||ce.vertexTangents!==ne||ce.morphTargets!==ie||ce.morphNormals!==he||ce.morphColors!==ve||ce.toneMapping!==Te||ce.morphTargetsCount!==Me||!!ce.lightProbeGrid!=A.state.lightProbeGridArray.length>0)&&(Ne=!0):(Ne=!0,ce.__version=$.version);let Ve=ce.currentProgram;Ne===!0&&(Ve=Qn($,Z,te),H&&$.isNodeMaterial&&H.onUpdateProgram($,Ve,ce));let Ze=!1,yt=!1,ct=!1;const We=Ve.getUniforms(),Ke=ce.uniforms;if(_.useProgram(Ve.program)&&(Ze=!0,yt=!0,ct=!0),$.id!==j&&(j=$.id,yt=!0),ce.needsLights){const ft=Ds(A.state.lightProbeGridArray,te);ce.lightProbeGrid!==ft&&(ce.lightProbeGrid=ft,yt=!0)}if(Ze||me!==R){_.buffers.depth.getReversed()&&R.reversedDepth!==!0&&(R._reversedDepth=!0,R.updateProjectionMatrix()),We.setValue(k,"projectionMatrix",R.projectionMatrix),We.setValue(k,"viewMatrix",R.matrixWorldInverse);const vt=We.map.cameraPosition;vt!==void 0&&vt.setValue(k,ut.setFromMatrixPosition(R.matrixWorld)),b.logarithmicDepthBuffer&&We.setValue(k,"logDepthBufFC",2/(Math.log(R.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&We.setValue(k,"isOrthographic",R.isOrthographicCamera===!0),me!==R&&(me=R,yt=!0,ct=!0)}if(ce.needsLights&&(Ye.state.directionalShadowMap.length>0&&We.setValue(k,"directionalShadowMap",Ye.state.directionalShadowMap,J),Ye.state.spotShadowMap.length>0&&We.setValue(k,"spotShadowMap",Ye.state.spotShadowMap,J),Ye.state.pointShadowMap.length>0&&We.setValue(k,"pointShadowMap",Ye.state.pointShadowMap,J)),te.isSkinnedMesh){We.setOptional(k,te,"bindMatrix"),We.setOptional(k,te,"bindMatrixInverse");const ft=te.skeleton;ft&&(ft.boneTexture===null&&ft.computeBoneTexture(),We.setValue(k,"boneTexture",ft.boneTexture,J))}te.isBatchedMesh&&(We.setOptional(k,te,"batchingTexture"),We.setValue(k,"batchingTexture",te._matricesTexture,J),We.setOptional(k,te,"batchingIdTexture"),We.setValue(k,"batchingIdTexture",te._indirectTexture,J),We.setOptional(k,te,"batchingColorTexture"),te._colorsTexture!==null&&We.setValue(k,"batchingColorTexture",te._colorsTexture,J));const kt=ae.morphAttributes;if((kt.position!==void 0||kt.normal!==void 0||kt.color!==void 0)&&V.update(te,ae,Ve),(yt||ce.receiveShadow!==te.receiveShadow)&&(ce.receiveShadow=te.receiveShadow,We.setValue(k,"receiveShadow",te.receiveShadow)),($.isMeshStandardMaterial||$.isMeshLambertMaterial||$.isMeshPhongMaterial)&&$.envMap===null&&Z.environment!==null&&(Ke.envMapIntensity.value=Z.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=tC()),yt){if(We.setValue(k,"toneMappingExposure",L.toneMappingExposure),ce.needsLights&&Qi(Ke,ct),ze&&$.fog===!0&&ge.refreshFogUniforms(Ke,ze),ge.refreshMaterialUniforms(Ke,$,ue,Re,A.state.transmissionRenderTarget[R.id]),ce.needsLights&&ce.lightProbeGrid){const ft=ce.lightProbeGrid;Ke.probesSH.value=ft.texture,Ke.probesMin.value.copy(ft.boundingBox.min),Ke.probesMax.value.copy(ft.boundingBox.max),Ke.probesResolution.value.copy(ft.resolution)}xu.upload(k,bi(ce),Ke,J)}if($.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(xu.upload(k,bi(ce),Ke,J),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&We.setValue(k,"center",te.center),We.setValue(k,"modelViewMatrix",te.modelViewMatrix),We.setValue(k,"normalMatrix",te.normalMatrix),We.setValue(k,"modelMatrix",te.matrixWorld),$.uniformsGroups!==void 0){const ft=$.uniformsGroups;for(let vt=0,St=ft.length;vt<St;vt++){const xt=ft[vt];Se.update(xt,Ve),Se.bind(xt,Ve)}}return Ve}function Qi(R,Z){R.ambientLightColor.needsUpdate=Z,R.lightProbe.needsUpdate=Z,R.directionalLights.needsUpdate=Z,R.directionalLightShadows.needsUpdate=Z,R.pointLights.needsUpdate=Z,R.pointLightShadows.needsUpdate=Z,R.spotLights.needsUpdate=Z,R.spotLightShadows.needsUpdate=Z,R.rectAreaLights.needsUpdate=Z,R.hemisphereLights.needsUpdate=Z}function Ns(R){return R.isMeshLambertMaterial||R.isMeshToonMaterial||R.isMeshPhongMaterial||R.isMeshStandardMaterial||R.isShadowMaterial||R.isShaderMaterial&&R.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(R,Z,ae){const $=Y.get(R);$.__autoAllocateDepthBuffer=R.resolveDepthBuffer===!1,$.__autoAllocateDepthBuffer===!1&&($.__useRenderToTexture=!1),Y.get(R.texture).__webglTexture=Z,Y.get(R.depthTexture).__webglTexture=$.__autoAllocateDepthBuffer?void 0:ae,$.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(R,Z){const ae=Y.get(R);ae.__webglFramebuffer=Z,ae.__useDefaultFramebuffer=Z===void 0},this.setRenderTarget=function(R,Z=0,ae=0){I=R,P=Z,F=ae;let $=null,te=!1,ze=!1;if(R){const C=Y.get(R);if(C.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(k.FRAMEBUFFER,C.__webglFramebuffer),Ae.copy(R.viewport),Ee.copy(R.scissor),Qe=R.scissorTest,_.viewport(Ae),_.scissor(Ee),_.setScissorTest(Qe),j=-1;return}else if(C.__webglFramebuffer===void 0)J.setupRenderTarget(R);else if(C.__hasExternalTextures)J.rebindTextures(R,Y.get(R.texture).__webglTexture,Y.get(R.depthTexture).__webglTexture);else if(R.depthBuffer){const q=R.depthTexture;if(C.__boundDepthTexture!==q){if(q!==null&&Y.has(q)&&(R.width!==q.image.width||R.height!==q.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(R)}}const O=R.texture;(O.isData3DTexture||O.isDataArrayTexture||O.isCompressedArrayTexture)&&(ze=!0);const W=Y.get(R).__webglFramebuffer;R.isWebGLCubeRenderTarget?(Array.isArray(W[Z])?$=W[Z][ae]:$=W[Z],te=!0):R.samples>0&&J.useMultisampledRTT(R)===!1?$=Y.get(R).__webglMultisampledFramebuffer:Array.isArray(W)?$=W[ae]:$=W,Ae.copy(R.viewport),Ee.copy(R.scissor),Qe=R.scissorTest}else Ae.copy(Xe).multiplyScalar(ue).floor(),Ee.copy(wt).multiplyScalar(ue).floor(),Qe=it;if(ae!==0&&($=X),_.bindFramebuffer(k.FRAMEBUFFER,$)&&_.drawBuffers(R,$),_.viewport(Ae),_.scissor(Ee),_.setScissorTest(Qe),te){const C=Y.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+Z,C.__webglTexture,ae)}else if(ze){const C=Z;for(let O=0;O<R.textures.length;O++){const W=Y.get(R.textures[O]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+O,W.__webglTexture,ae,C)}}else if(R!==null&&ae!==0){const C=Y.get(R.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,C.__webglTexture,ae)}j=-1},this.readRenderTargetPixels=function(R,Z,ae,$,te,ze,w,C=0){if(!(R&&R.isWebGLRenderTarget)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let O=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&w!==void 0&&(O=O[w]),O){_.bindFramebuffer(k.FRAMEBUFFER,O);try{const W=R.textures[C],q=W.format,ne=W.type;if(R.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+C),!b.textureFormatReadable(q)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(ne)){zt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}Z>=0&&Z<=R.width-$&&ae>=0&&ae<=R.height-te&&k.readPixels(Z,ae,$,te,le.convert(q),le.convert(ne),ze)}finally{const W=I!==null?Y.get(I).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,W)}}},this.readRenderTargetPixelsAsync=async function(R,Z,ae,$,te,ze,w,C=0){if(!(R&&R.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let O=Y.get(R).__webglFramebuffer;if(R.isWebGLCubeRenderTarget&&w!==void 0&&(O=O[w]),O)if(Z>=0&&Z<=R.width-$&&ae>=0&&ae<=R.height-te){_.bindFramebuffer(k.FRAMEBUFFER,O);const W=R.textures[C],q=W.format,ne=W.type;if(R.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+C),!b.textureFormatReadable(q))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const ie=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,ie),k.bufferData(k.PIXEL_PACK_BUFFER,ze.byteLength,k.STREAM_READ),k.readPixels(Z,ae,$,te,le.convert(q),le.convert(ne),0);const he=I!==null?Y.get(I).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,he);const ve=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await b1(k,ve,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,ie),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,ze),k.deleteBuffer(ie),k.deleteSync(ve),ze}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(R,Z=null,ae=0){const $=Math.pow(2,-ae),te=Math.floor(R.image.width*$),ze=Math.floor(R.image.height*$),w=Z!==null?Z.x:0,C=Z!==null?Z.y:0;J.setTexture2D(R,0),k.copyTexSubImage2D(k.TEXTURE_2D,ae,0,0,w,C,te,ze),_.unbindTexture()},this.copyTextureToTexture=function(R,Z,ae=null,$=null,te=0,ze=0){let w,C,O,W,q,ne,ie,he,ve;const Te=R.isCompressedTexture?R.mipmaps[ze]:R.image;if(ae!==null)w=ae.max.x-ae.min.x,C=ae.max.y-ae.min.y,O=ae.isBox3?ae.max.z-ae.min.z:1,W=ae.min.x,q=ae.min.y,ne=ae.isBox3?ae.min.z:0;else{const Ke=Math.pow(2,-te);w=Math.floor(Te.width*Ke),C=Math.floor(Te.height*Ke),R.isDataArrayTexture?O=Te.depth:R.isData3DTexture?O=Math.floor(Te.depth*Ke):O=1,W=0,q=0,ne=0}$!==null?(ie=$.x,he=$.y,ve=$.z):(ie=0,he=0,ve=0);const De=le.convert(Z.format),Me=le.convert(Z.type);let ce;Z.isData3DTexture?(J.setTexture3D(Z,0),ce=k.TEXTURE_3D):Z.isDataArrayTexture||Z.isCompressedArrayTexture?(J.setTexture2DArray(Z,0),ce=k.TEXTURE_2D_ARRAY):(J.setTexture2D(Z,0),ce=k.TEXTURE_2D),_.activeTexture(k.TEXTURE0),_.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,Z.flipY),_.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),_.pixelStorei(k.UNPACK_ALIGNMENT,Z.unpackAlignment);const Ye=_.getParameter(k.UNPACK_ROW_LENGTH),Ne=_.getParameter(k.UNPACK_IMAGE_HEIGHT),Ve=_.getParameter(k.UNPACK_SKIP_PIXELS),Ze=_.getParameter(k.UNPACK_SKIP_ROWS),yt=_.getParameter(k.UNPACK_SKIP_IMAGES);_.pixelStorei(k.UNPACK_ROW_LENGTH,Te.width),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Te.height),_.pixelStorei(k.UNPACK_SKIP_PIXELS,W),_.pixelStorei(k.UNPACK_SKIP_ROWS,q),_.pixelStorei(k.UNPACK_SKIP_IMAGES,ne);const ct=R.isDataArrayTexture||R.isData3DTexture,We=Z.isDataArrayTexture||Z.isData3DTexture;if(R.isDepthTexture){const Ke=Y.get(R),kt=Y.get(Z),ft=Y.get(Ke.__renderTarget),vt=Y.get(kt.__renderTarget);_.bindFramebuffer(k.READ_FRAMEBUFFER,ft.__webglFramebuffer),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,vt.__webglFramebuffer);for(let St=0;St<O;St++)ct&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Y.get(R).__webglTexture,te,ne+St),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Y.get(Z).__webglTexture,ze,ve+St)),k.blitFramebuffer(W,q,w,C,ie,he,w,C,k.DEPTH_BUFFER_BIT,k.NEAREST);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(te!==0||R.isRenderTargetTexture||Y.has(R)){const Ke=Y.get(R),kt=Y.get(Z);_.bindFramebuffer(k.READ_FRAMEBUFFER,N),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,B);for(let ft=0;ft<O;ft++)ct?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ke.__webglTexture,te,ne+ft):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ke.__webglTexture,te),We?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,kt.__webglTexture,ze,ve+ft):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,kt.__webglTexture,ze),te!==0?k.blitFramebuffer(W,q,w,C,ie,he,w,C,k.COLOR_BUFFER_BIT,k.NEAREST):We?k.copyTexSubImage3D(ce,ze,ie,he,ve+ft,W,q,w,C):k.copyTexSubImage2D(ce,ze,ie,he,W,q,w,C);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else We?R.isDataTexture||R.isData3DTexture?k.texSubImage3D(ce,ze,ie,he,ve,w,C,O,De,Me,Te.data):Z.isCompressedArrayTexture?k.compressedTexSubImage3D(ce,ze,ie,he,ve,w,C,O,De,Te.data):k.texSubImage3D(ce,ze,ie,he,ve,w,C,O,De,Me,Te):R.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,ze,ie,he,w,C,De,Me,Te.data):R.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,ze,ie,he,Te.width,Te.height,De,Te.data):k.texSubImage2D(k.TEXTURE_2D,ze,ie,he,w,C,De,Me,Te);_.pixelStorei(k.UNPACK_ROW_LENGTH,Ye),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Ne),_.pixelStorei(k.UNPACK_SKIP_PIXELS,Ve),_.pixelStorei(k.UNPACK_SKIP_ROWS,Ze),_.pixelStorei(k.UNPACK_SKIP_IMAGES,yt),ze===0&&Z.generateMipmaps&&k.generateMipmap(ce),_.unbindTexture()},this.initRenderTarget=function(R){Y.get(R).__webglFramebuffer===void 0&&J.setupRenderTarget(R)},this.initTexture=function(R){R.isCubeTexture?J.setTextureCube(R,0):R.isData3DTexture?J.setTexture3D(R,0):R.isDataArrayTexture||R.isCompressedArrayTexture?J.setTexture2DArray(R,0):J.setTexture2D(R,0),_.unbindTexture()},this.resetState=function(){P=0,F=0,I=null,_.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Nt._getDrawingBufferColorSpace(e),n.unpackColorSpace=Nt._getUnpackColorSpace()}}function nC(t,e=300){if(!t||!Array.isArray(t.nodes)||!Array.isArray(t.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=t.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,e),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,d,h,u;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((d=l.properties)==null?void 0:d.filePath)||(l.uri&&l.uri.startsWith("file://")?l.uri.replace(/^file:\/\//,""):l.uri&&l.uri.startsWith("symbol://")?l.uri.replace(/^symbol:\/\//,"").split("#")[0]:l.uri)||"",line:((h=l.properties)==null?void 0:h.line)||null,status:((u=l.properties)==null?void 0:u.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:t.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:t.edges.length}}function iC(t){const{CLUSTERS:e,NODES:n,EDGES:i,META:a}=nC(t);let s="dark";for(const L of e)L.color=L[s];const r=Object.fromEntries(e.map(L=>[L.id,L])),o=n.map(([L,z,H,X],N)=>({i:N,id:L,name:a[L].label,cid:z,w:H,desc:X,cluster:r[z],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(L=>[L.id,L]));for(const L of o)L.meta=a[L.id]||{};const c=[];for(const[L,z,H]of i){const X=l[L],N=l[z];if(!X||!N){console.warn("[atlas] Dropped invalid edge:",L,"→",z);continue}c.push({s:X,t:N,kind:H,i:c.length,alpha:1}),H==="pre"?(X.out.push(N),N.in.push(X)):(X.rel.push(N),N.rel.push(X))}const d=L=>L.out.length+L.in.length+L.rel.length,h=o.map(()=>[]);for(const L of c)h[L.s.i].push(L.t.i),h[L.t.i].push(L.s.i);const u=42;for(const L of e){const[z,H,X]=L.anchor,N=Math.hypot(z,H,X)||1;L.dir=[z/N,H/N,X/N]}const p=new Array(o.length).fill(-1);(function(){let z=!0,H=0;for(const X of o)X.in.length||(p[X.i]=0);for(;z&&H++<40;){z=!1;for(const X of o){let N=X.in.length?-1:0;for(const B of X.in)p[B.i]>=0&&(N=Math.max(N,p[B.i]+1));N>=0&&N!==p[X.i]&&(p[X.i]=N,z=!0)}}for(let X=0;X<p.length;X++)p[X]<0&&(p[X]=2)})();const g=Math.max(1,...p),E={atlas:[],shell:[],tier:[]};o.forEach((L,z)=>{const H=L.cluster.dir,X=1-Math.min(d(L),12)/26;E.atlas.push([H[0]*u*X,H[1]*u*X,H[2]*u*X]);const N=e.indexOf(L.cluster),B=o.filter(j=>j.cid===L.cid).indexOf(L),P=o.filter(j=>j.cid===L.cid).length,F=(N/e.length+B/P/e.length)*Math.PI*2,I=(B/P-.5)*1.5;E.shell.push([u*.95*Math.cos(I)*Math.cos(F),u*.95*Math.sin(I),u*.95*Math.cos(I)*Math.sin(F)]),E.tier.push([H[0]*u*.72,(p[z]/g-.5)*u*1.5,H[2]*u*.72])});let m="atlas";o.forEach((L,z)=>{const H=E.atlas[z];L.x=H[0]+(Math.random()-.5)*16,L.y=H[1]+(Math.random()-.5)*16,L.z=H[2]+(Math.random()-.5)*16});let f=1;const x=9,S=.04,y=130,U=.05;function A(){if(f<.004)return;const L=E[m];for(let z=0;z<o.length;z++){const H=o[z];for(let X=z+1;X<o.length;X++){const N=o[X];let B=H.x-N.x,P=H.y-N.y,F=H.z-N.z,I=B*B+P*P+F*F+.6;const j=y/I,me=Math.sqrt(I);B/=me,P/=me,F/=me,H.vx+=B*j,H.vy+=P*j,H.vz+=F*j,N.vx-=B*j,N.vy-=P*j,N.vz-=F*j}}for(const z of c){const H=z.s,X=z.t;let N=X.x-H.x,B=X.y-H.y,P=X.z-H.z;const F=Math.hypot(N,B,P)||1,I=(F-x)*S;N/=F,B/=F,P/=F,H.vx+=N*I,H.vy+=B*I,H.vz+=P*I,X.vx-=N*I,X.vy-=B*I,X.vz-=P*I}for(let z=0;z<o.length;z++){const H=o[z],X=L[z];H.vx+=(X[0]-H.x)*U,H.vy+=(X[1]-H.y)*U,H.vz+=(X[2]-H.z)*U;const N=.82;H.vx*=N,H.vy*=N,H.vz*=N,H.x+=H.vx*f,H.y+=H.vy*f,H.z+=H.vz*f}f*=.988}for(let L=0;L<220;L++)A();const T=46;function M(){let L=0;for(const z of o)L=Math.max(L,Math.hypot(z.x,z.y,z.z));return Math.max(10,L)/Math.sin(T*Math.PI/360)*.88}function D({els:L,emit:z}){const H=new AbortController,{signal:X}=H,N=(lt,ee,b,_)=>lt.addEventListener(ee,b,{..._,signal:X});let B=0;const{stage:P}=L;let F,I,j,me,Ae,Ee,Qe=!0;try{F=new BS({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{Qe=!1}if(F||(Qe=!1),!Qe)return z.gate(!0),{dispose(){}};{let $i=function(se,Le){const Ue=K.uniforms.uPx.value;for(const Ie of o){Mi.set(Ie.x,Ie.y,Ie.z);const $e=j.position.distanceTo(Mi);Mi.project(j),Ie.sx=(Mi.x*.5+.5)*se,Ie.sy=(-Mi.y*.5+.5)*Le,Ie.sz=Mi.z,Ie.sr=Ie.size*Ie.scale*Ue/Math.max($e,1)*.5}},Ds=function(){ki.fill(1),Qn.fill(1),bi.fill(1);const se=ja,Le=Ue=>!se||Ue.name.toLowerCase().includes(se)||Ue.desc.toLowerCase().includes(se)||(Ue.meta.path||"").toLowerCase().includes(se)||(Ue.meta.kind||"").toLowerCase().includes(se);for(const Ue of o)Ue.vis=!Gi.has(Ue.cid)&&Le(Ue),Ue.vis||(ki[Ue.i]=0,Qn[Ue.i]=.6);for(const Ue of c)(!Ue.s.vis||!Ue.t.vis)&&(bi[Ue.i]=0);if(Un){for(const Ue of o)Ue.vis&&(ki[Ue.i]=Un.has(Ue.i)?1:ha,Qn[Ue.i]=Un.has(Ue.i)?1.25:.8);for(const Ue of c)bi[Ue.i]&&(bi[Ue.i]=Un.has(Ue.s.i)&&Un.has(Ue.t.i)?1.35:ha*.5)}else if(bt){const Ue=new Set([bt.i,...h[bt.i]]);for(const Ie of o)Ie.vis&&(ki[Ie.i]=Ue.has(Ie.i)?1:ha,Qn[Ie.i]=Ie===bt?1.75:Ue.has(Ie.i)?1.15:.75);for(const Ie of c)bi[Ie.i]&&(bi[Ie.i]=Ie.s===bt||Ie.t===bt?1.4:ha*.45)}return en&&en.vis&&(ki[en.i]=1,Qn[en.i]=Math.max(Qn[en.i],1.6)),{nT:ki,sT:Qn,eT:bi}},pa=function(se){bt=se,Un=null,L.pathbar.classList.remove("on"),le.tx=se.x,le.ty=se.y,le.tz=se.z,le.tDist=Math.min(le.tDist,fe*.72),St(se),Ke(),ct()},Qi=function(){bt=null,Un=null,le.tx=le.ty=le.tz=0,L.pathbar.classList.remove("on"),St(null),Ke(),ct()},Ns=function(se,Le){const Ue=new Array(o.length).fill(-1),Ie=new Set([se.i]),$e=[se.i];for(;$e.length;){const En=$e.shift();if(En===Le.i)break;for(const Zt of h[En])!Ie.has(Zt)&&o[Zt].vis&&(Ie.add(Zt),Ue[Zt]=En,$e.push(Zt))}if(!Ie.has(Le.i)){L.chain.textContent="Keine Kausalkette zwischen diesen Objekten",L.pathbar.classList.add("on");return}const Pt=[];let st=Le.i;for(;st!==-1&&(Pt.unshift(st),st!==se.i);)st=Ue[st];Un=new Set(Pt),L.chain.textContent=Pt.map(En=>o[En].name).join(" → "),L.pathbar.classList.add("on"),ct()},R=function(){Un=null,L.pathbar.classList.remove("on"),ct()},ze=function(se,Le){let Ue=0;const Ie=new Set;Hn&&te.forEach(st=>Ie.add(st)),bt&&(Ie.add(bt.i),h[bt.i].forEach(st=>Ie.add(st))),Un&&Un.forEach(st=>Ie.add(st)),en&&Ie.add(en.i);const $e=[...Ie].map(st=>o[st]).filter(st=>st.vis&&st.sz<1&&st.sx>-60&&st.sx<se+60&&st.sy>-20&&st.sy<Le+20).sort((st,En)=>st.sz-En.sz),Pt=[];for(const st of $e){if(Ue>=$.length)break;const En=st.name.length*11.5+8,Zt=[st.sx-En/2,st.sy-18,En,16];if(Pt.some(Bt=>Zt[0]<Bt[0]+Bt[2]&&Zt[0]+Zt[2]>Bt[0]&&Zt[1]<Bt[1]+Bt[3]&&Zt[1]+Zt[3]>Bt[1]))continue;Pt.push(Zt);const nt=$[Ue++];nt.textContent=st.name,nt.className="lab"+(st===en||st===bt?"":" sm"),nt.style.transform=`translate(-50%,-50%) translate(${st.sx.toFixed(1)}px,${(st.sy-17).toFixed(1)}px)`,nt.style.opacity=Math.min(1,st.alpha*1.3),nt.style.color=st===en||st===bt?st.cluster.color:""}for(;Ue<$.length;Ue++)$[Ue].style.opacity=0},ve=function(se){B=requestAnimationFrame(ve);const Le=Math.min(.05,(se-w)/1e3);w=se;const Ue=P.clientWidth,Ie=P.clientHeight;if(!Ue||!Ie)return;F.domElement.width!==Math.round(Ue*F.getPixelRatio())&&(F.setSize(Ue,Ie,!1),j.aspect=Ue/Ie,j.updateProjectionMatrix(),oe.uniforms.uPx.value=K.uniforms.uPx.value=Ie/(2*Math.tan(j.fov*Math.PI/360))),A(),li&&(le.tTheta+=Le*.09);const $e=1-Math.pow(.0016,Le);if(le.theta+=(le.tTheta-le.theta)*$e,le.phi+=(le.tPhi-le.phi)*$e,le.dist+=(le.tDist-le.dist)*$e,le.cx+=(le.tx-le.cx)*$e,le.cy+=(le.ty-le.cy)*$e,le.cz+=(le.tz-le.cz)*$e,j.position.set(le.cx+le.dist*Math.sin(le.phi)*Math.cos(le.theta),le.cy+le.dist*Math.cos(le.phi),le.cz+le.dist*Math.sin(le.phi)*Math.sin(le.theta)),j.lookAt(le.cx,le.cy,le.cz),$i(Ue,Ie),Si.live&&!Pe){let nt=null;for(const Bt of o){if(!Bt.vis||Bt.sz>1)continue;const mr=Bt.sx-Si.x,tc=Bt.sy-Si.y,nc=Bt.sr+7;mr*mr+tc*tc>nc*nc||(!nt||Bt.sz<nt.sz)&&(nt=Bt)}nt!==en&&(en=nt,Mt.style.cursor=nt?"pointer":"grab",ct())}const{nT:Pt,sT:st,eT:En}=Ds(),Zt=1-Math.pow(.002,Le);for(const nt of o)nt.alpha+=(Pt[nt.i]-nt.alpha)*Zt,nt.scale+=(st[nt.i]-nt.scale)*Zt,W.array[nt.i*3]=nt.x,W.array[nt.i*3+1]=nt.y,W.array[nt.i*3+2]=nt.z,q.array[nt.i]=nt.alpha,ne.array[nt.i]=nt.scale;W.needsUpdate=q.needsUpdate=ne.needsUpdate=!0;for(const nt of c){nt.alpha+=(En[nt.i]-nt.alpha)*Zt;const Bt=nt.i*6;ie.array[Bt]=nt.s.x,ie.array[Bt+1]=nt.s.y,ie.array[Bt+2]=nt.s.z,ie.array[Bt+3]=nt.t.x,ie.array[Bt+4]=nt.t.y,ie.array[Bt+5]=nt.t.z,he.array[nt.i*2]=he.array[nt.i*2+1]=nt.alpha}ie.needsUpdate=he.needsUpdate=!0,Ce.uniforms.uTime.value=se/1e3,Ce.uniforms.uFlow.value+=(($n?1:0)-Ce.uniforms.uFlow.value)*Zt,ze(Ue,Ie),F.render(I,j),C+=1/Math.max(Le,1e-4),O++,O>=30&&(L.sFps.textContent=Math.round(C/O),C=O=0)},Te=function(se=.55){f=Math.max(f,se)},De=function(se){m=se,L.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[m],Te(1)},Ne=function(){le.tTheta=.7,le.tPhi=1.15,le.tDist=M(),Qi(),Te(.8),Dn()},Ve=function(){z.tools({flow:$n,label:Hn,spin:li})},Ze=function(se){s=se,document.documentElement.dataset.theme=se,z.theme(se);const Le=se==="light";for(const $e of e)$e.color=$e[se];o.forEach(($e,Pt)=>{const st=lt($e.cluster.color);_[Pt*3]=st[0],_[Pt*3+1]=st[1],_[Pt*3+2]=st[2]}),_e.getAttribute("aColor").needsUpdate=!0,c.forEach(($e,Pt)=>{xe.set(lt($e.s.cluster.color),Pt*6),xe.set(lt($e.t.cluster.color),Pt*6+3)}),V.getAttribute("aColor").needsUpdate=!0;const Ue=Le?$s:Kr;for(const $e of[oe,K,Ce])$e.uniforms.uLight.value=Le?1:0,$e.blending=Ue,$e.needsUpdate=!0;const Ie=Le?16053489:328967;F.setClearColor(Ie,1),I.fog.color.setHex(Ie),I.fog.density=Le?.0042:.0068,Ke(),bt&&St(bt)},ct=function(){L.hudSel.textContent=Un?`Kausalkette · ${Un.size} Stationen`:bt?bt.name:en?en.name:"Nichts ausgewählt"},We=function(se){Gi.has(se)?Gi.delete(se):Gi.add(se),Ke(),Te(.4)},Ke=function(){const se=L.q.value.trim().toLowerCase(),Le=o.filter(Ie=>!Gi.has(Ie.cid)&&(!se||Ie.name.toLowerCase().includes(se)||Ie.desc.toLowerCase().includes(se))).sort((Ie,$e)=>d($e)-d(Ie));z.list({q:se,rows:Le.map(Ie=>({i:Ie.i,name:Ie.name,color:Ie.cluster.color,deg:d(Ie),on:Ie===bt}))}),L.sNode.textContent=Le.length;const Ue=c.filter(Ie=>Le.includes(Ie.s)&&Le.includes(Ie.t)).length;L.sEdge.textContent=Ue,L.sDeg.textContent=Le.length?(Ue*2/Le.length).toFixed(1):"0"},vt=function(se){ja=se.trim().toLowerCase(),Ke(),Te(.25)},St=function(se){z.drawer(se&&{i:se.i,name:se.name,desc:se.desc,cname:se.cluster.name,color:se.cluster.color,deg:d(se),depth:p[se.i],kind:se.meta.kind||"",path:se.meta.path||"",line:se.meta.line||null,status:se.meta.status||"",prov:se.meta.prov||"",groups:[["Ursache · eingehend",se.in,"IN"],["Wirkung · ausgehend",se.out,"OUT"],["Assoziiert · Backlinks",se.rel,"REL"]].filter(([,Le])=>Le.length).map(([Le,Ue,Ie])=>({title:Le,tag:Ie,items:Ue.map($e=>({i:$e.i,name:$e.name,color:$e.cluster.color}))}))})},xt=function(se){const Le=o[se],Ue=E[m],Ie=Ue[Le.i].slice();for(let $e=0;$e<Ue.length;$e++)Ue[$e][0]-=Ie[0],Ue[$e][1]-=Ie[1],Ue[$e][2]-=Ie[2];le.tx=le.ty=le.tz=0,Te(1)},Vt=function(se){const Le=o[se];L.chain.textContent="Start bei "+Le.name+" — Shift+Klick auf das Zielobjekt",L.pathbar.classList.add("on")};var Je=$i,et=Ds,pe=pa,Re=Qi,ue=Ns,Be=R,Ge=ze,Xe=ve,wt=Te,it=De,Rt=Ne,gt=Ve,dt=Ze,Ot=ct,ut=We,Yt=Ke,Qt=vt,tt=St,Oe=xt,k=Vt;F.setPixelRatio(Math.min(devicePixelRatio,2)),P.appendChild(F.domElement),I=new xS,I.fog=new tg(328967,.0068),j=new Di(T,1,1,1400);const lt=se=>{const Le=new At(se);return[Le.r,Le.g,Le.b]},ee=o.length,b=new Float32Array(ee*3),_=new Float32Array(ee*3),G=new Float32Array(ee),Y=new Float32Array(ee),J=new Float32Array(ee);o.forEach((se,Le)=>{const Ue=lt(se.cluster.color);_[Le*3]=Ue[0],_[Le*3+1]=Ue[1],_[Le*3+2]=Ue[2],G[Le]=se.size=.95+se.w*.4,Y[Le]=1,J[Le]=1});const _e=new Xn;_e.setAttribute("position",new Xt(b,3)),_e.setAttribute("aColor",new Xt(_,3)),_e.setAttribute("aSize",new Xt(G,1)),_e.setAttribute("aAlpha",new Xt(Y,1)),_e.setAttribute("aScale",new Xt(J,1));const we=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,oe=new Bn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:we,fragmentShader:`
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
      }`,transparent:!0,blending:Kr,depthWrite:!1}),K=new Bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:we,fragmentShader:`
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
      }`,transparent:!0,blending:Kr,depthWrite:!1});me=new zp(_e,oe),Ae=new zp(_e,K),me.frustumCulled=!1,Ae.frustumCulled=!1,I.add(me,Ae);const re=c.length,ge=new Float32Array(re*6),xe=new Float32Array(re*6),be=new Float32Array(re*2),Fe=new Float32Array(re*2),je=new Float32Array(re*2),at=new Float32Array(re*2);c.forEach((se,Le)=>{const Ue=lt(se.s.cluster.color),Ie=lt(se.t.cluster.color);xe.set(Ue,Le*6),xe.set(Ie,Le*6+3),be[Le*2]=0,be[Le*2+1]=1;const $e=Le*.6180339887%1;Fe[Le*2]=$e,Fe[Le*2+1]=$e,je[Le*2]=je[Le*2+1]=1,at[Le*2]=at[Le*2+1]=se.kind==="pre"?1:0});const V=new Xn;V.setAttribute("position",new Xt(ge,3)),V.setAttribute("aColor",new Xt(xe,3)),V.setAttribute("aT",new Xt(be,1)),V.setAttribute("aSeed",new Xt(Fe,1)),V.setAttribute("aAlpha",new Xt(je,1)),V.setAttribute("aDir",new Xt(at,1));const Ce=new Bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:Kr,depthWrite:!1});Ee=new _u(V,Ce),Ee.frustumCulled=!1,I.add(Ee);const fe=M(),le={theta:.7,phi:1.15,dist:fe,tTheta:.7,tPhi:1.15,tDist:fe,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let Pe=!1,Se=0,qe=0,ke=0;const Mt=F.domElement;N(Mt,"pointerdown",se=>{Pe=!0,ke=0,Se=se.clientX,qe=se.clientY,Mt.setPointerCapture(se.pointerId)}),N(Mt,"pointerup",se=>{Pe=!1,Mt.releasePointerCapture(se.pointerId)}),N(Mt,"pointermove",se=>{const Le=Mt.getBoundingClientRect();if(Si.x=se.clientX-Le.left,Si.y=se.clientY-Le.top,Si.live=!0,!Pe)return;const Ue=se.clientX-Se,Ie=se.clientY-qe;ke+=Math.abs(Ue)+Math.abs(Ie),Se=se.clientX,qe=se.clientY,le.tTheta-=Ue*.0052,le.tPhi=Math.max(.12,Math.min(Math.PI-.12,le.tPhi-Ie*.0052)),li=!1,Ve()}),N(Mt,"pointerleave",()=>{Si.live=!1});const It=L.zlvl,Dn=()=>{It.textContent=Math.round(fe/le.tDist*100)+"%"},Nn=se=>{le.tDist=Math.max(fe*.22,Math.min(fe*2.6,le.tDist*se)),Dn()};N(Mt,"wheel",se=>{se.preventDefault(),Nn(1+Math.sign(se.deltaY)*.11)},{passive:!1});const Dt=()=>{le.tDist=fe,Dn()};Dn();const Si={x:-1,y:-1,live:!1};let en=null,bt=null,Un=null,li=!0,Hn=!0,$n=!0;const Gi=new Set,ha=.12,Mi=new Q;N(Mt,"click",se=>{if(!(ke>5)){if(!en){se.shiftKey||Qi();return}if(se.shiftKey&&bt&&en!==bt){Ns(bt,en);return}pa(en)}});const ki=new Float32Array(o.length),Qn=new Float32Array(o.length),bi=new Float32Array(c.length);let ja="";const Z=L.labels,ae=14,$=Array.from({length:44},()=>{const se=document.createElement("div");return se.className="lab",se.style.opacity=0,Z.appendChild(se),se}),te=[...o].sort((se,Le)=>d(Le)-d(se)).slice(0,ae).map(se=>se.i);let w=performance.now(),C=0,O=0;const W=_e.getAttribute("position"),q=_e.getAttribute("aAlpha"),ne=_e.getAttribute("aScale"),ie=V.getAttribute("position"),he=V.getAttribute("aAlpha");B=requestAnimationFrame(ve);const Me=()=>{$n=!$n,Ve()},ce=()=>{Hn=!Hn,Ve()},Ye=()=>{li=!li,Ve()},yt=()=>Ze(s==="light"?"dark":"light");N(window,"keydown",se=>{if(/^(INPUT|TEXTAREA)$/.test(se.target.tagName)){se.key==="Escape"&&se.target.blur();return}se.key==="Escape"?Qi():se.key==="l"||se.key==="L"?(Hn=!Hn,Ve()):se.key==="r"||se.key==="R"?Ne():se.key===" "?(se.preventDefault(),li=!li,Ve()):se.key==="/"?(se.preventDefault(),L.q.focus()):se.key==="="||se.key==="+"?Nn(1/1.18):(se.key==="-"||se.key==="_")&&Nn(1.18)});const kt=se=>pa(o[se]),ft=se=>{en=se===null?null:o[se]};return Ze(s),Ke(),St(null),Ve(),ct(),{setView:De,toggleFlow:Me,toggleLabel:ce,toggleSpin:Ye,reset:Ne,toggleTheme:yt,dolly:Nn,zoomReset:Dt,toggleCluster:We,selectAt:kt,hoverAt:ft,setQuery:vt,clearPath:R,centerOn:xt,startPath:Vt,dispose(){H.abort(),cancelAnimationFrame(B),_e.dispose(),V.dispose(),oe.dispose(),K.dispose(),Ce.dispose(),F.dispose(),Mt.remove(),L.labels.replaceChildren()}}}}return{CLUSTERS:e,nodes:o,edges:c,deg:d,createAtlas:D}}function aC(t){if(typeof t!="string"||t==="")return t;const e=t.split(/[\\/]/).filter(Boolean);return e.length>0?e[e.length-1]:t}const FS="plugbrain.workspace";function sC(){try{return localStorage.getItem(FS)||""}catch{return""}}function rC(t){try{localStorage.setItem(FS,t)}catch{}}async function Wv(){const t=await fetch("/api/galaxy");if(!t.ok)throw new Error(`Galaxie: HTTP ${t.status}`);const e=await t.json();if(!(e!=null&&e.ok)||!Array.isArray(e.planets))throw new Error("Die Galaxie antwortet unvollständig.");return e.planets}async function oC(t,e,n){var s;const i=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:t,name:e})});if(!i.ok){const r=await i.json().catch(()=>null);throw new Error((r==null?void 0:r.error)??`Registrieren: HTTP ${i.status}`)}const a=await i.json();if(!(a!=null&&a.ok)||!((s=a.workspace)!=null&&s.id))throw new Error("Registrieren: unvollständige Antwort.");return await HS(a.workspace.id,n),a.workspace.id}function Zd(t){var r,o,l;const e=t==null?void 0:t.run;if(!e)return"Kein Indexlauf bekannt.";const n=Math.max(0,Math.round((Date.now()-Date.parse(e.startedAt))/1e3)),i={starting:"startet",scan:"sammelt Dateien",classify:"vergleicht",write:"schreibt",resolve:"verknüpft",publish:"veröffentlicht",done:"fertig",failed:"fehlgeschlagen"}[e.phase]??e.phase;if(e.finishedAt)return e.ok?`Fertig: ${((r=e.result)==null?void 0:r.files)??e.scanned} Dateien, ${((o=e.result)==null?void 0:o.symbols)??0} Symbole, ${((l=e.result)==null?void 0:l.edges)??0} Kanten in ${n} s.`:`Indexlauf fehlgeschlagen: ${e.error??"unbekannter Grund"}`;const a=e.total>0?`/${e.total}`:"",s=e.total>0?` (${Math.round(e.processed/e.total*100)} %)`:"";return`Indexiert: ${i} ${e.processed}${a}${s} — ${n} s`}async function lC(t){const e=await fetch(`/api/index/progress?workspace=${encodeURIComponent(t)}`);return e.ok?e.json():null}const cC=t=>new Promise(e=>setTimeout(e,t));async function uC(t,e){for(;;){await cC(900);const n=await lC(t);if(n===null)throw new Error("Der Fortschritt ist nicht abrufbar.");if(e==null||e(n),n.running)continue;if(n.stale)throw new Error("Der Indexlauf ist verstummt — kein Lebenszeichen mehr.");const i=n.run;if(!i)throw new Error("Kein Indexlauf bekannt.");if(i.ok)return i.result;throw new Error(i.error??"Indexlauf fehlgeschlagen.")}}async function HS(t,e){const n=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:t})}),i=await n.json().catch(()=>null);if(n.status===409&&(i!=null&&i.busy))throw new Error(i.error??"Ein Indexlauf ist bereits unterwegs.");if(!n.ok)throw new Error(`Indizieren: HTTP ${n.status}`);if(!(i!=null&&i.ok))throw new Error("Indizieren: unvollständige Antwort.");return i.result!==void 0&&i.result!==null?i.result:uC(t,e)}const Fp="plugbrain.auth_token",Hp="plugbrain.agent_id";function jv(){var t,e;try{return((e=(t=window.__PLUGBRAIN__)==null?void 0:t.token)==null?void 0:e.trim())??""}catch{return""}}function GS(){try{const t=new URLSearchParams(window.location.search).get("token");if(t)return localStorage.setItem(Fp,t),t;const e=localStorage.getItem(Fp);if(e)return e;const n=jv();return n||"plug-atlas-test-token-20260917"}catch{return jv()||"plug-atlas-test-token-20260917"}}function fC(t){try{localStorage.setItem(Fp,t)}catch{}}function zo(){try{const t=new URLSearchParams(window.location.search).get("agent");return t?(localStorage.setItem(Hp,t),t):localStorage.getItem(Hp)||"agy"}catch{return"agy"}}function dC(t){try{localStorage.setItem(Hp,t)}catch{}}function Io(){const t=GS(),e={"Content-Type":"application/json"};return t&&(e.Authorization=`Bearer ${t}`,e["x-plug-auth-token"]=t),e}async function hC(t){const e=await fetch(`/api/git?workspace=${encodeURIComponent(t)}`);if(!e.ok)throw new Error(`Git-Status HTTP ${e.status}`);return e.json()}async function pC(t,e){const n=await fetch(`/api/provenance?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)throw new Error(`Provenance HTTP ${n.status}`);return n.json()}async function mC(t,e=zo(),n="AGY"){const i=await fetch("/api/agent/attach",{method:"POST",headers:Io(),body:JSON.stringify({workspace:t,agentId:e,name:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Agent Attach HTTP ${i.status}`)}return i.json()}const yu=new Map;function kS(t,e=zo()){const n=`${t}\0${e}`,i=yu.get(n);if(i)return i;const a=mC(t,e).then(()=>{}).catch(()=>{yu.delete(n)});return yu.set(n,a),a}function gC(){yu.clear()}async function vC(t,e,n=zo()){await kS(t,n);const i=await fetch("/api/agent/search",{method:"POST",headers:Io(),body:JSON.stringify({workspace:t,agentId:n,query:e})});if(!i.ok){const s=await i.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Search HTTP ${i.status}`)}const a=await i.json();return Array.isArray(a==null?void 0:a.hits)?a.hits:[]}async function _C(t,e,n=zo()){await kS(t,n);const i=await fetch("/api/agent/read",{method:"POST",headers:Io(),body:JSON.stringify({workspace:t,agentId:n,path:e})});if(!i.ok){const s=await i.json().catch(()=>null),r=(s==null?void 0:s.error)??`HTTP ${i.status}`;return{ok:!1,path:e,content:"",bytes:0,lang:null,error:r}}const a=await i.json();return{ok:!0,path:a.path??e,content:a.content??"",bytes:a.bytes??0,lang:a.lang??null}}async function qv(t,e,n=zo()){const i=await fetch("/api/context/pack",{method:"POST",headers:Io(),body:JSON.stringify({workspaceId:t,goal:e,agentId:n})});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Context Pack HTTP ${i.status}`)}return i.json()}async function xC(t){const e=await fetch(`/api/context/pack/${encodeURIComponent(t)}/staleness`);if(!e.ok){const n=await e.json().catch(()=>null);throw new Error((n==null?void 0:n.error)??`Staleness HTTP ${e.status}`)}return e.json()}async function yC(t,e){const n=await fetch(`/api/notes/query?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}`,{headers:Io()});if(!n.ok){const i=await n.json().catch(()=>null);throw new Error((i==null?void 0:i.error)??`Notes Query HTTP ${n.status}`)}return n.json()}async function SC(t,e,n=30){const i=await fetch(`/api/notes/search?workspace=${encodeURIComponent(t)}&q=${encodeURIComponent(e)}&limit=${n}&lines=1`,{headers:Io()});if(!i.ok){const a=await i.json().catch(()=>null);throw new Error((a==null?void 0:a.error)??`Notizsuche HTTP ${i.status}`)}return i.json()}async function MC(t,e){const n=await fetch(`/api/notes/backlinks?workspace=${encodeURIComponent(t)}&path=${encodeURIComponent(e)}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.backlinks)?i.backlinks:[]}async function bC(t){const e=t?`?workspace=${encodeURIComponent(t)}`:"",n=await fetch(`/api/agent/presence${e}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.agents)?i.agents:[]}async function EC(t){const e=t?`?workspace=${encodeURIComponent(t)}`:"",n=await fetch(`/api/agent/leases${e}`);if(!n.ok)return[];const i=await n.json();return Array.isArray(i==null?void 0:i.leases)?i.leases:[]}async function TC(t,e){const n=`?agentId=${encodeURIComponent(t)}${e?`&workspace=${encodeURIComponent(e)}`:""}`,i=await fetch(`/api/agent/inspect${n}`);return i.ok?i.json():null}const cn=[],hs=[],Ta=[],Hl=[],bl={},Rn=[],Su=[],na=7.2,Qr=6,Gl=["--k1","--k2","--k3","--k4","--k5","--k6"],ag=t=>getComputedStyle(document.documentElement).getPropertyValue(t).trim(),AC=t=>t.agentColor||ag(Gl[(t.ki??0)%Gl.length]),Yv=t=>ag(Gl[t.ki%Gl.length]),VS=new Map;let XS="loc";function wC(t){XS=t}const RC=t=>{const e=Math.max(1,...cn.map(i=>i.loc)),n=Math.max(1,...cn.map(i=>i.usedBy.length));return t.dying?0:XS==="loc"?1.5+t.loc/e*26:1.5+t.usedBy.length/n*26},Gp=new Set,CC=t=>(Gp.add(t),()=>Gp.delete(t)),Eo=()=>Gp.forEach(t=>t());function kp(t,e,n="ok"){Su.unshift({t:new Date,ws:t,msg:e,kind:n,id:Math.random().toString(36).slice(2)}),Su.length>60&&Su.pop()}function Df(){var o;let e=0,n=0,i=0;const a=Hl.filter(l=>Rn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=cn.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=Rn.find(g=>g.id===l))!=null&&o.dying))continue;const d=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),h=d*na+Qr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/d))*na+Qr;n+h>74&&n>0&&(e+=i,n=0,i=0);let p=Ta.find(g=>g.dir===l);p||(p={dir:l,x:n+h/2,z:e+u/2,w:.01,h:.01},Ta.push(p)),Object.assign(p,{tx:n,tz:e,tw:h,th:u,cols:d}),s.add(l),n+=h,i=Math.max(i,u)}const r=Ta.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(d=>d.tx+d.tw))/2,c=Math.max(...r.map(d=>d.tz+d.th))/2;for(const d of r)d.tx-=l,d.tz-=c;for(const d of r)cn.filter(u=>u.dir===d.dir).forEach((u,p)=>{u.tx=d.tx+Qr/2+p%d.cols*na+na/2,u.tz=d.tz+Qr/2+Math.floor(p/d.cols)*na+na/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=Ta.length-1;l>=0;l--)!s.has(Ta[l].dir)&&!cn.some(c=>c.dir===Ta[l].dir)&&Ta.splice(l,1);for(const l of a)VS.set(l,.5)}function DC(t,e,n=!1){let i=Rn.find(a=>a.id===t);return i||(i={id:t,name:e||t,ki:Rn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},Rn.push(i),Hl.includes(t)||Hl.push(t),kp(e||t,"workspace registered","reg"),Df(),Eo(),i)}function NC(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=e.split("/").pop(),c=e.includes("/")&&e.startsWith(t.id+"/")?e:`${t.id}/${e}`;let d=bl[c];if(d)return d.loc+=Math.max(2,Math.round(n*.25)),d.pulse=1,s&&(d.agentColor=s,d.agentName=r,d.access=o),d;d={path:c,name:l,dir:t.id,top:t.id,ki:t.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let h of i){h.includes("/")||(h=`${t.id}/${h}`);const u=bl[h];u&&(d.deps.push(h),hs.push({from:d,to:u}),u.usedBy.push(c))}return cn.push(d),bl[c]=d,Df(),Eo(),d}function UC(){let t=!1;for(let e=cn.length-1;e>=0;e--){const n=cn[e];if(n.dying&&n.h<.25){cn.splice(e,1),delete bl[n.path],t=!0;for(let i=hs.length-1;i>=0;i--)(hs[i].from===n||hs[i].to===n)&&hs.splice(i,1);for(const i of cn){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let e=Rn.length-1;e>=0;e--){const n=Rn[e];if(n.dying&&!cn.some(i=>i.dir===n.id)){Rn.splice(e,1);const i=Hl.indexOf(n.id);i>=0&&Hl.splice(i,1),t=!0}}t&&(Df(),Eo())}setInterval(()=>{let t=!1;for(const e of Rn)e.load>.01&&(e.load*=.82,t=!0);t&&Eo()},600);const ll={register({id:t,name:e}={}){return t?DC(String(t),e&&String(e),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(t,{path:e,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=Rn.find(c=>c.id===t);return!l||!e?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,NC(l,{path:e,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(t,e){const n=Rn.find(a=>a.id===t);if(!n)return;const i=cn.filter(a=>a.dir===t&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,kp(n.name,String(e||"event")),Eo()},unregister(t){const e=Rn.find(n=>n.id===t);e&&(e.dying=!0,cn.filter(n=>n.dir===t).forEach(n=>{n.dying=!0}),kp(e.name,"workspace unregistered","sys"),Df(),Eo())},list:()=>Rn.map(t=>({id:t.id,name:t.name,buildings:cn.filter(e=>e.dir===t.id).length})),simulated:()=>!1};window.PlugBrainCity=ll;const LC=1024,OC=2048,Zv=96,Kv=new Map;function PC(t){if(!t.agentColor)return null;const e=t.agentColor+(t.access||"");let n=Kv.get(e);if(!n){n=new At;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(t.agentColor);if(i){const a=t.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(t.agentColor)}catch{n.setHSL(0,0,.5)}Kv.set(e,n)}return n}function zC(t,e,n,{onSelect:i,onZoom:a}){let s;try{s=new BS({antialias:!0,alpha:!0,canvas:t})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new xS,o=new ig(-1,1,1,-1,-400,600),l=`
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
  }`,d=new rr(1,1,1),h=new Bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=LC,p=new uv(d,h,u);p.frustumCulled=!1;let g=new $r(new Float32Array(u*3),3),E=new $r(new Float32Array(u*2),2);d.setAttribute("aColor",g),d.setAttribute("aHi",E),r.add(p);const m=new $1(d),f=new TS({color:3814695,transparent:!0,opacity:.3});let x=[];for(let Oe=0;Oe<u;Oe++){const k=new _u(m,f);k.visible=!1,x.push(k),r.add(k)}const S=(Oe,k)=>{let lt=Math.max(1,Oe);for(;lt<k;)lt*=2;return lt};function y(Oe){if(Oe<=u)return;const k=S(u,Oe),lt=p,ee=x,b=new uv(d,h,k);b.frustumCulled=!1,b.count=0;const _=new $r(new Float32Array(k*3),3),G=new $r(new Float32Array(k*2),2);d.setAttribute("aColor",_),d.setAttribute("aHi",G);const Y=[];for(let J=0;J<k;J++){const _e=new _u(m,f);_e.visible=!1,Y.push(_e),r.add(_e)}r.remove(lt);for(const J of ee)r.remove(J);p=b,g=_,E=G,x=Y,u=k}const U=()=>new Bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),A=[],T=new rr(1,1,1);for(let Oe=0;Oe<Zv;Oe++){const k=new Hi(T,U());k.visible=!1,A.push(k),r.add(k)}const M=3;let D=OC,L=new Float32Array(D*M*3),z=new Float32Array(D*M);const H=new Xn;H.setAttribute("position",new Xt(L,3)),H.setAttribute("aA",new Xt(z,1));const X=new zp(H,new Bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));X.frustumCulled=!1,r.add(X);let N=new Float32Array(D*6),B=new Float32Array(D*2);const P=new Xn;P.setAttribute("position",new Xt(N,3)),P.setAttribute("aA",new Xt(B,1));const F=new _u(P,new Bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));F.frustumCulled=!1,r.add(F);function I(Oe){Oe<=D||(D=S(D,Oe),L=new Float32Array(D*M*3),z=new Float32Array(D*M),N=new Float32Array(D*6),B=new Float32Array(D*2),H.setAttribute("position",new Xt(L,3)),H.setAttribute("aA",new Xt(z,1)),P.setAttribute("position",new Xt(N,3)),P.setAttribute("aA",new Xt(B,1)))}const j={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},me=Math.atan(1/Math.SQRT2);let Ae=!1,Ee=0,Qe=0,Je=!0;const et={x:-1,y:-1,live:!1};t.addEventListener("pointerdown",Oe=>{Ae=!0,Qe=0,Ee=Oe.clientX,t.setPointerCapture(Oe.pointerId),t.classList.add("drag")}),t.addEventListener("pointerup",Oe=>{Ae=!1,t.classList.remove("drag"),t.releasePointerCapture(Oe.pointerId)}),t.addEventListener("pointermove",Oe=>{const k=t.getBoundingClientRect();et.x=Oe.clientX-k.left,et.y=Oe.clientY-k.top,et.live=!0,Ae&&(Qe+=Math.abs(Oe.clientX-Ee),j.tYaw-=(Oe.clientX-Ee)*.006,Ee=Oe.clientX,Je=!1,Rt(!1))}),t.addEventListener("pointerleave",()=>{et.live=!1});const pe=j.tZoom,Re=()=>a(Math.round(pe/j.tZoom*100)),ue=Oe=>{j.tZoom=Math.max(4,Math.min(60,j.tZoom*Oe)),Re()};t.addEventListener("wheel",Oe=>{Oe.preventDefault(),ue(1+Math.sign(Oe.deltaY)*.11)},{passive:!1}),Re();let Be=null,Ge=null,Xe=null,wt="",it=null,Rt=()=>{};t.addEventListener("click",()=>{Qe>5||i(Be&&Ge!==Be?Be:null)});const gt=Gl.map(Oe=>new At(ag(Oe)||"#8a4b2a")),dt=new Q,Ot=new nn,ut=new At;let Yt=!0,Qt=performance.now();function tt(Oe){requestAnimationFrame(tt);const k=Math.min(.05,(Oe-Qt)/1e3);Qt=Oe;const lt=e.clientWidth,ee=e.clientHeight;if(!lt||!ee)return;t.width!==Math.round(lt*s.getPixelRatio())&&s.setSize(lt,ee,!1);const b=1-Math.pow(.002,k);UC(),y(cn.length),I(hs.length),Je&&(j.tYaw+=k*.12),j.yaw+=(j.tYaw-j.yaw)*b,j.zoom+=(j.tZoom-j.zoom)*b;const _=j.zoom*4,G=_*(lt/ee);o.left=-G,o.right=G,o.top=_,o.bottom=-_,o.updateProjectionMatrix();const Y=180;o.position.set(Math.cos(j.yaw)*Math.cos(me)*Y,Math.sin(me)*Y,Math.sin(j.yaw)*Math.cos(me)*Y),o.lookAt(0,6,0);for(let K=0;K<Zv;K++){const re=A[K],ge=Ta[K];if(!ge||K>=Ta.length){re.visible=!1;continue}ge.x=ge.x===void 0?ge.tx+ge.tw/2:ge.x,ge.z=ge.z===void 0?ge.tz+ge.th/2:ge.z;const xe=ge.tx+ge.tw/2,be=ge.tz+ge.th/2;ge.x+=(xe-ge.x)*b,ge.z+=(be-ge.z)*b,ge.w+=(ge.tw-ge.w)*b,ge.h+=(ge.th-ge.h)*b,re.visible=!0,re.position.set(ge.x,-.25,ge.z),re.scale.set(Math.max(.01,ge.w-Qr*.45),.5,Math.max(.01,ge.h-Qr*.45))}const J=Ge?new Set([Ge.path,...Ge.deps,...Ge.usedBy]):null,_e=Ge||Be||Xe,we=cn.length;p.count=we;for(let K=0;K<we;K++){const re=cn[K];re.x!==re.tx&&(re.x+=(re.tx-re.x)*b*.7),re.z!==re.tz&&(re.z+=(re.tz-re.z)*b*.7);const ge=RC(re);re.h=re.h===void 0?ge:re.h+(ge-re.h)*(re.dying?b*1.4:b*.6),re.pulse=Math.max(0,(re.pulse||0)-k*1.6),Ot.makeScale(na*.68,Math.max(.01,re.h),na*.68),Ot.setPosition(re.x,re.h/2,re.z),p.setMatrixAt(K,Ot);const xe=x[K];xe.visible=!0,xe.scale.set(na*.68,Math.max(.01,re.h),na*.68),xe.position.set(re.x,re.h/2,re.z);const be=PC(re);be?ut.copy(be):ut.copy(gt[(re.ki??0)%gt.length]).offsetHSL(0,0,(VS.get(re.dir)-.5)*.17),g.array[K*3]=ut.r,g.array[K*3+1]=ut.g,g.array[K*3+2]=ut.b;const Fe=re===_e?1:Math.min(.85,re.pulse||0);let je=J?J.has(re.path)?0:1:wt&&!re.path.toLowerCase().includes(wt)?1:0;!J&&!wt&&it&&(je=re.top===it?0:1),E.array[K*2]+=(Fe-E.array[K*2])*b,E.array[K*2+1]+=(je-E.array[K*2+1])*b}for(let K=we;K<u;K++)x[K].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=E.needsUpdate=!0;const oe=hs.length;P.setDrawRange(0,oe*2),H.setDrawRange(0,oe*M);for(let K=0;K<oe;K++){const re=hs[K],ge=re.from,xe=re.to,be=K*6;N[be]=ge.x,N[be+1]=ge.h,N[be+2]=ge.z,N[be+3]=xe.x,N[be+4]=xe.h,N[be+5]=xe.z;const Fe=!J||J.has(ge.path)&&J.has(xe.path),je=Ge&&(ge===Ge||xe===Ge),at=je?.55:Fe?.1:.02;B[K*2]+=(at-B[K*2])*b,B[K*2+1]=B[K*2];for(let V=0;V<M;V++){const Ce=K*M+V,fe=(Oe/2600+(K*.37+V/M))%1,le=Math.sin(fe*Math.PI)*Math.hypot(xe.x-ge.x,xe.z-ge.z)*.22;L[Ce*3]=ge.x+(xe.x-ge.x)*fe,L[Ce*3+1]=ge.h+(xe.h-ge.h)*fe+le+1.2,L[Ce*3+2]=ge.z+(xe.z-ge.z)*fe,z[Ce]=(Yt?1:0)*(je?1:Fe?.45:.06)*Math.sin(fe*Math.PI)}}if(P.getAttribute("position").needsUpdate=!0,P.getAttribute("aA").needsUpdate=!0,H.getAttribute("position").needsUpdate=!0,H.getAttribute("aA").needsUpdate=!0,X.material.uniforms.uPx.value=3.4*s.getPixelRatio(),et.live&&!Ae){let K=null,re=26*26;for(let ge=0;ge<we;ge++){const xe=cn[ge];if(xe.dying||xe.h<1)continue;dt.set(xe.x,xe.h*.6,xe.z).project(o);const be=(dt.x*.5+.5)*lt,Fe=(-dt.y*.5+.5)*ee,je=(be-et.x)**2+(Fe-et.y)**2;je<re&&(re=je,K=xe,xe.sx=be,xe.sy=Fe)}Be=K,t.style.cursor=Ae?"grabbing":K?"pointer":"grab"}else et.live||(Be=null);Be?(n.style.display="block",n.style.left=Be.sx+"px",n.style.top=Be.sy+"px",n.innerHTML=`<b>${Be.name}</b> · ${Be.loc} lines<br>${Be.dir} · referenced by ${Be.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(tt),{setFlow:Oe=>{Yt=Oe},setHatch:Oe=>{h.uniforms.uHatch.value=Oe?1:0},setSpin:Oe=>{Je=Oe},spinning:()=>Je,onSpinChange:Oe=>{Rt=Oe},dolly:ue,reset:()=>{j.tYaw=Math.PI*.25,j.tZoom=pe,Re()},setSel:Oe=>{Ge=Oe},setRailHover:Oe=>{Xe=Oe},setQuery:Oe=>{wt=Oe},setFocusTop:Oe=>{it=Oe}}}const Lr=new Map;function $v(t){var n,i;const e=((n=t==null?void 0:t.properties)==null?void 0:n.path)||((i=t==null?void 0:t.properties)==null?void 0:i.filePath)||(t==null?void 0:t.uri);return typeof e=="string"&&e.length>0?e:null}function IC(t){var i,a,s;const e=((i=t==null?void 0:t.properties)==null?void 0:i.loc)??((a=t==null?void 0:t.properties)==null?void 0:a.lines)??((s=t==null?void 0:t.properties)==null?void 0:s.size),n=Number(e);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function BC(t){const n=String(t).replace(/\\/g,"/").split("/");return n[0]==="Code"&&n[1]?n[1].split("--")[0]:["Master","Roadmap","Auftrag","Planung","Codebasis","PLUG-Ordner","Aufräumen"].includes(n[0])?n[0]:"plugpt-vault"}function FC(t){var c;const e=t==null?void 0:t.workspace,n=(c=t==null?void 0:t.graph)==null?void 0:c.nodes;if(!(e!=null&&e.id)||!Array.isArray(n))return{workspaces:Lr.size,buildings:0,added:0};for(const d of Rn.slice())d.sim&&ll.unregister(d.id);const i=Array.isArray(t.graph.edges)?t.graph.edges:[],a=new Map(n.filter(d=>d&&typeof d.id=="string").map(d=>[d.id,d])),s=new Map;for(const d of i){const h=a.get(d==null?void 0:d.sourceId),u=a.get(d==null?void 0:d.targetId);if(!h||!u)continue;const p=$v(u);p&&(s.has(h.id)||s.set(h.id,[]),s.get(h.id).push(p))}const r=[];for(const d of n){const h=$v(d);h&&r.push({node:d,path:h})}r.sort((d,h)=>d.path.localeCompare(h.path));let o=0,l=0;for(const{node:d,path:h}of r){const u=BC(h);Lr.has(u)||(ll.register({id:u,name:u}),Lr.set(u,new Set));const p=Lr.get(u);if(p.has(h))continue;p.add(h),l+=p.size;const g=d.properties||{};ll.grow(u,{path:h,loc:IC(d),deps:s.get(d.id)||[],note:d.type||"",agentColor:g.agentColor||g.readerColor||null,agentName:g.agentName||g.readerName||null,access:g.agentColor?"write":g.readerColor?"read":null}),o+=1}return o>0&&ll.event(String(e.id),`${o} indexed object${o===1?"":"s"} added across ${Lr.size} districts`),{workspaces:Lr.size,buildings:l,added:o,total:r.length,truncated:!1}}function HC({snapshot:t,onSelectFile:e}){de.useEffect(()=>{t&&FC(t)},[t]);const[n,i]=de.useState(!0),[a,s]=de.useState("loc"),[r,o]=de.useState(!0),[l,c]=de.useState(!0),[d,h]=de.useState(!0),[u,p]=de.useState(100),[g,E]=de.useState(null),[m,f]=de.useState(""),[x,S]=de.useState(null),[y,U]=de.useState(!0),[,A]=de.useReducer(N=>N+1,0),T=de.useRef(null),M=de.useRef(null),D=de.useRef(null),L=de.useRef(null);de.useEffect(()=>{const N=zC(T.current,M.current,D.current,{onSelect:B=>E(B),onZoom:B=>p(B)});if(!N){i(!1);return}L.current=N,N.onSpinChange(B=>h(B))},[]),de.useEffect(()=>{const N=CC(()=>A());return()=>{N()}},[]),de.useEffect(()=>{!g&&cn.length>0&&E(cn[0])},[cn.length,g]),de.useEffect(()=>{var N;(N=L.current)==null||N.setSel(g)},[g]),de.useEffect(()=>{var N;(N=L.current)==null||N.setQuery(m)},[m]),de.useEffect(()=>{var N;(N=L.current)==null||N.setFocusTop(x)},[x]),de.useEffect(()=>{const N=B=>{var F,I;const P=B.target;if(/^(INPUT|TEXTAREA)$/.test(P.tagName)){B.key==="Escape"&&P.blur();return}B.key==="Escape"?(E(null),S(null)):B.key==="="||B.key==="+"?(F=L.current)==null||F.dolly(.8474576271186441):B.key==="-"||B.key==="_"?(I=L.current)==null||I.dolly(1.18):(B.key==="e"||B.key==="E")&&U(j=>!j)};return addEventListener("keydown",N),()=>removeEventListener("keydown",N)},[]);const z=cn.reduce((N,B)=>N+B.loc,0),H=Rn.reduce((N,B)=>N+B.events,0),X=(N,B)=>B.length?v.jsxs(v.Fragment,{children:[v.jsxs("h3",{children:[N+" ",v.jsx("span",{style:{color:"var(--faint)"},children:B.length})]}),B.map(P=>{const F=bl[P];return F&&v.jsxs("div",{className:"dep","data-p":P,onClick:()=>E(F),children:[v.jsx("span",{className:"sw",style:{background:AC(F)}}),v.jsx("span",{children:P})]},P)})]}):null;return v.jsxs("div",{id:"app",className:g?void 0:"closed",children:[v.jsxs("aside",{children:[v.jsxs("div",{className:"hd",children:[v.jsx("h1",{children:"PlugBrain City"}),v.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),v.jsxs("div",{className:"kpis",children:[v.jsxs("div",{children:[v.jsx("b",{id:"k-ws",children:Rn.length}),v.jsx("i",{children:"workspaces"})]}),v.jsxs("div",{children:[v.jsx("b",{id:"k-bld",children:cn.length}),v.jsx("i",{children:"buildings"})]}),v.jsxs("div",{children:[v.jsx("b",{id:"k-ev",children:H}),v.jsx("i",{children:"events"})]})]})]}),v.jsx("div",{className:"q",children:v.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:N=>f(N.target.value.trim().toLowerCase())})}),v.jsx("div",{className:"tree",id:"tree",children:Rn.length?Rn.map(N=>{const B=cn.filter(F=>F.dir===N.id),P=B.reduce((F,I)=>F+I.loc,0);return v.jsxs("div",{className:"ws"+(x===N.id?" on":"")+(N.dying?" dying":""),onClick:()=>S(F=>F===N.id?null:N.id),children:[v.jsxs("div",{className:"wsrow",children:[v.jsx("span",{className:"sw",style:{background:Yv(N)}}),v.jsx("span",{className:"nm",children:N.name}),N.sim?v.jsx("span",{className:"tag",children:"sim"}):null,v.jsxs("span",{className:"lc",children:[B.length," bld · ",P]})]}),v.jsx("div",{className:"loadbar",children:v.jsx("i",{style:{width:Math.round(N.load*100)+"%",background:Yv(N)}})})]},N.id)}):v.jsxs("div",{className:"empty",children:["No workspaces registered.",v.jsx("br",{}),v.jsx("br",{}),v.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),v.jsxs("div",{id:"stage",ref:M,children:[v.jsx("canvas",{id:"cv",ref:T}),v.jsx("div",{id:"tip",ref:D}),v.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",v.jsx("b",{id:"crumb-t",children:g?g.path.toUpperCase():x?x.toUpperCase():"CITY OVERVIEW"})]}),y&&v.jsx("div",{id:"feed",children:Su.slice(0,9).map(N=>v.jsxs("div",{className:"fe",children:[v.jsx("span",{className:"ft",children:N.t.toLocaleTimeString("en-GB",{hour12:!1})}),v.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:N.ws}),v.jsx("span",{className:"fm",children:N.msg})]},N.id))}),v.jsx("div",{id:"legend",children:v.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${a==="loc"?"size":"references"} · flashes = activity`})}),v.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([N,B])=>v.jsx("button",{className:"tb"+(a===N?" on":""),"data-h":N,type:"button",onClick:()=>{wC(N),s(N)},children:B},N)),v.jsx("div",{className:"vsep"}),v.jsx("button",{className:"tb"+(r?" on":""),id:"t-flow",type:"button",onClick:()=>{o(N=>{var B;return(B=L.current)==null||B.setFlow(!N),!N})},children:"Flow"}),v.jsx("button",{className:"tb"+(l?" on":""),id:"t-hatch",type:"button",onClick:()=>{c(N=>{var B;return(B=L.current)==null||B.setHatch(!N),!N})},children:"Hatching"}),v.jsx("button",{className:"tb"+(d?" on":""),id:"t-spin",type:"button",onClick:()=>{h(N=>{var B;return(B=L.current)==null||B.setSpin(!N),!N})},children:"Orbit"}),v.jsx("button",{className:"tb"+(y?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>U(N=>!N),children:"Feed"}),v.jsx("div",{className:"vsep"}),v.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var N;return(N=L.current)==null?void 0:N.dolly(1.18)},children:"−"}),v.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var N;return(N=L.current)==null?void 0:N.reset()},children:u+"%"}),v.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var N;return(N=L.current)==null?void 0:N.dolly(1/1.18)},children:"＋"}),v.jsx("div",{className:"vsep"}),v.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var N;(N=L.current)==null||N.reset(),E(null),S(null)},children:"Reset"})]}),v.jsxs("div",{id:"gate",style:n?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",v.jsx("br",{}),"The workspace registry remains available."]})]}),v.jsx("div",{id:"side",children:v.jsx("div",{id:"dt",children:g&&v.jsxs("div",{className:"dt",children:[v.jsx("div",{className:"kind",children:g.dir+"/"}),v.jsx("h2",{children:g.name}),g.note?v.jsx("div",{className:"note",children:g.note}):null,e&&v.jsx("button",{type:"button",className:"btn primary",style:{marginTop:"10px",marginBottom:"14px",width:"100%",padding:"8px 12px"},onClick:()=>e(g.path),children:"📄 Datei in Quellansicht öffnen"}),v.jsxs("dl",{children:[v.jsx("dt",{children:"Size"}),v.jsx("dd",{children:g.loc}),v.jsx("dt",{children:"References"}),v.jsx("dd",{children:g.deps.length}),v.jsx("dt",{children:"Referenced by"}),v.jsx("dd",{children:g.usedBy.length}),v.jsx("dt",{children:"Share of total"}),v.jsx("dd",{children:z?(g.loc/z*100).toFixed(1)+"%":"—"})]}),X("References",g.deps),X("Referenced by",g.usedBy)]})})})]})}function GC({getAgents:t,ROLES:e,STATES:n,LINK_R:i}){const a=["#8ab2d1","#aaf7b3","#ffc09a","#c6a1ce","#efedbd","#8ac1a0","#d6dee8","#e0a355","#9ec4b8","#b4aac8","#9db6cc","#c8ab9e","#7f9db8","#a8c8a0","#d1a3a3","#a3a3c8"],s=new Map;let r=0;function o(E){if(s.has(E))return s.get(E);const m=a[(E.n-1)%a.length],f={hue:m,rgb:m.match(/[0-9a-f]{2}/gi).map(x=>parseInt(x,16)).join(","),trail:[],last:null};return s.set(E,f),f}function l(E){s.delete(E)}const c=.45,d=42,h=26;function u(E){r+=E;for(const m of t()){const f=o(m);if(m.off)continue;const x=f.last,S=!x||Math.hypot(m.x-x.x,m.y-x.y)>h,y=!x||r-x.t>c;S&&y&&(f.trail.push({x:m.x,y:m.y,t:r,busy:m.task?1:0}),f.trail.length>d&&f.trail.shift(),f.last={x:m.x,y:m.y,t:r})}for(const m of[...s.keys()])t().includes(m)||l(m)}function p(E){E.save(),E.lineCap="round",E.lineJoin="round";for(const m of t()){const f=s.get(m);if(!f||f.trail.length<2)continue;const x=f.trail;for(let S=x.length-1;S>0;S--){const y=x[S],U=x[S-1],A=(r-y.t)/(d*c),T=Math.max(0,(1-A)*.34)*(y.busy?1:.55);T<.015||(E.strokeStyle=`rgba(${f.rgb},${T.toFixed(3)})`,E.lineWidth=y.busy?1.6:1,E.beginPath(),E.moveTo(U.x,U.y),E.lineTo(y.x,y.y),E.stroke())}}E.restore()}function g(){const E=[];for(const m of t()){const f=s.get(m)||o(m),x=e[m.ri],S=n[m.state];let y=0;for(const U of t())U!==m&&Math.hypot(m.x-U.x,m.y-U.y)<i&&y++;E.push({n:m.n,hue:f.hue,role:x.cn,tag:x.tag,roleColor:x.color,state:m.off?"OFFLINE":m.state,stateCn:m.off?"Offline":S.cn,task:m.task?"#"+m.task.id:null,queue:m.queue.length,util:m.span>0?m.busy/m.span:0,trail:f.trail.length,links:y,pos:[Math.round(m.x),Math.round(m.y)]})}return E.sort((m,f)=>m.n-f.n),E}return{step:u,draw:p,snapshot:g,register:o,forget:l,hueOf:E=>(s.get(E)||o(E)).hue}}function kC({els:t,emit:e}){const n=new AbortController,{signal:i}=n,a=(w,C,O,W)=>w.addEventListener(C,O,{...W,signal:i}),s=Math.PI*2,r=(w,C,O)=>w+(C-w)*O,o=w=>w-Math.floor(w),l=(w,C)=>{const O=Math.sin(w*12.9898+C*78.233)*43758.5453;return O-Math.floor(O)};function c(w,C){const O=Math.floor(w),W=Math.floor(C);let q=w-O,ne=C-W;q=q*q*(3-2*q),ne=ne*ne*(3-2*ne);const ie=l(O,W),he=l(O+1,W),ve=l(O,W+1),Te=l(O+1,W+1);return ie+(he-ie)*q+(ve-ie)*ne+(ie-he-ve+Te)*q*ne}function d(w,C){const O=Math.PI*(3-Math.sqrt(5)),W=1-2*(w+.5)/C,q=Math.sqrt(1-W*W),ne=w*O;return[q*Math.cos(ne),W,q*Math.sin(ne)]}const h=(w,C)=>Math.atan2(Math.sin(w-C),Math.cos(w-C));function u(w,C,O,W,q){const ne=Math.sin(C),ie=Math.cos(C),he=Math.sin(w),ve=Math.cos(w);return(Te,De,Me)=>{const ce=Te*ve+Me*he,Ye=-Te*he+Me*ve;return[O+ce*q,W-(De*ie-Ye*ne)*q,De*ne+Ye*ie]}}const p=(w,C)=>(w/300)**C;function g(w,C,O){const W=[];for(const q of w)(q.a??1)<.02||(q.r=Math.max(O,q.r),W.push(q));return W.sort((q,ne)=>q.z-ne.z),{dots:W,lines:C.filter(q=>(q.a??1)>=.02)}}function E(w,C,O){const W=w/2,q=W*.82,ne=u(C*.12,.3,W,W,1),ie=p(w,O.rsPow),he=[];for(let ve=0;ve<O.orbitN;ve++){const Te=l(ve,1.7),De=l(ve,5.2),Me=l(ve,8.9),ce=q*(.45+.52*Te),Ye=Te*s,Ne=Math.acos(2*De-1),Ve=Math.sin(Ne)*Math.cos(Ye),Ze=Math.cos(Ne),yt=Math.sin(Ne)*Math.sin(Ye);let ct=-Ze,We=Ve;const Ke=0,kt=Math.max(1e-6,Math.hypot(ct,We));ct/=kt,We/=kt;const ft=Ze*Ke-yt*We,vt=yt*ct-Ve*Ke,St=Ve*We-Ze*ct,xt=(.25+.55*Me)*(Me>.5?1:-1);for(let Vt=0;Vt<O.ghostN;Vt++){const se=Vt/O.ghostN*s,Le=Math.cos(se),Ue=Math.sin(se),[Ie,$e,Pt]=ne((ct*Le+ft*Ue)*ce,(We*Le+vt*Ue)*ce,(Ke*Le+St*Ue)*ce);he.push({x:Ie,y:$e,z:Pt,r:O.ghostR*ie,white:.72,a:O.ghostA*(.4+.6*((Pt/ce+1)/2))})}for(let Vt=0;Vt<O.particles;Vt++){const se=C*xt+Vt/O.particles*s+De*6,Le=Math.cos(se),Ue=Math.sin(se),[Ie,$e,Pt]=ne((ct*Le+ft*Ue)*ce,(We*Le+vt*Ue)*ce,(Ke*Le+St*Ue)*ce),st=(Pt/ce+1)/2;he.push({x:Ie,y:$e,z:Pt,r:(O.partR+O.partRDepth*st)*ie,white:.3-.22*st})}}return g(he,[],O.rMin)}function m(w,C,O){const q=w/2,ne=q*.82,ie=u(C*.5,.4+.06*Math.sin(C*.35),q,q,ne),he=C*(.5+(1.7-.5)*O.scanMul),ve=p(w,O.rsPow),Te=[];for(let De=0;De<=O.latRings;De++){const Me=-Math.PI/2+De/O.latRings*Math.PI,ce=Math.cos(Me),Ye=Math.sin(Me),Ne=Math.max(1,Math.round(Math.abs(ce)*O.lonDensity));for(let Ve=0;Ve<Ne;Ve++){const Ze=Ve/Ne*s,[yt,ct,We]=ie(ce*Math.cos(Ze),Ye,ce*Math.sin(Ze)),Ke=(We+1)/2,kt=h(Ze+C*.5,he),ft=Math.exp(-(kt*kt)/.18)*Math.max(0,We);Te.push({x:yt,y:ct,z:We,r:(O.rBase+O.rDepth*Ke+O.rBoost*ft)*ve,white:O.inkFar-O.inkSpan*Ke,a:O.dimBase+(1-O.dimBase)*Math.min(1,ft)})}}return g(Te,[],O.rMin)}function f(w,C,O){const W=w/2,q=W*.82,ne=u(C*.55,.35+.1*Math.sin(C*.9),W,W,q),ie=p(w,O.rsPow),he=O.moveCount,ve=[];for(let Ze=0;Ze<he;Ze++){const yt=Math.min(2,Math.floor(l(Ze,2.3)*3)),ct=-1+.5*Math.min(3,Math.floor(l(Ze,5.9)*4));ve.push({axis:yt,lo:ct,hi:ct+.5,ang:(l(Ze,7.7)<.5?1:-1)*Math.PI/2})}const Te=.42,De=1.2,Me=2*he*Te+De,ce=C%Me,Ye=new Array(he).fill(0);let Ne=-1;if(ce<2*he*Te){const Ze=Math.floor(ce/Te),yt=(ce-Ze*Te)/Te,ct=1-(1-Math.min(1,yt/.7))**3;if(Ze<he){for(let We=0;We<Ze;We++)Ye[We]=1;Ye[Ze]=ct,Ne=Ze}else{const We=2*he-1-Ze;for(let Ke=0;Ke<We;Ke++)Ye[Ke]=1;Ye[We]=1-ct,Ne=We}}const Ve=[];for(let Ze=0;Ze<=O.latRings;Ze++){const yt=-Math.PI/2+Ze/O.latRings*Math.PI,ct=Math.cos(yt),We=Math.sin(yt),Ke=Math.max(1,Math.round(Math.abs(ct)*O.lonDensity));for(let kt=0;kt<Ke;kt++){const ft=kt/Ke*s;let vt=ct*Math.cos(ft),St=We,xt=ct*Math.sin(ft),Vt=!1;for(let $e=0;$e<he;$e++){if(Ye[$e]<=0)continue;const Pt=ve[$e],st=Pt.axis===0?vt:Pt.axis===1?St:xt;if(st<Pt.lo||st>=Pt.hi)continue;$e===Ne&&(Vt=!0);const En=Pt.ang*Ye[$e],Zt=Math.cos(En),nt=Math.sin(En);if(Pt.axis===0){const Bt=St*Zt-xt*nt;xt=St*nt+xt*Zt,St=Bt}else if(Pt.axis===1){const Bt=vt*Zt+xt*nt;xt=-vt*nt+xt*Zt,vt=Bt}else{const Bt=vt*Zt-St*nt;St=vt*nt+St*Zt,vt=Bt}}const[se,Le,Ue]=ne(vt,St,xt),Ie=(Ue+1)/2;Ve.push({x:se,y:Le,z:Ue,r:(O.rBase+O.rDepth*Ie+(Vt?O.rActive:0))*ie,white:O.inkFar-O.inkSpan*Ie-(Vt?.14:0)})}}return g(Ve,[],O.rMin)}function x(w,C,O){const W=w/2,q=W*.874,ne=u(C*.18,.38,W,W,1),ie=p(w,O.rsPow),he=[];for(let ve=0;ve<=O.rings;ve++){const Te=-Math.PI/2+ve/O.rings*Math.PI,De=Math.cos(Te),Me=Math.sin(Te),ce=.62*Math.sin(C*2.1-ve*.52)+.38*Math.sin(C*1.27+ve*.83),Ye=q*(.88+.105*ce),Ne=Math.max(1,Math.round(Math.abs(De)*O.lonDensity));for(let Ve=0;Ve<Ne;Ve++){const Ze=Ve/Ne*s,[yt,ct,We]=ne(De*Math.cos(Ze)*Ye,Me*Ye,De*Math.sin(Ze)*Ye),Ke=(We/q+1)/2,kt=Math.max(0,ce);he.push({x:yt,y:ct,z:We,r:(O.rBase+O.rDepth*Ke)*(1+.4*kt)*ie,white:.66-.56*Ke-.1*kt})}}return g(he,[],O.rMin)}function S(w,C,O){const W=w/2,q=W*.8,ne=u(C*.12,.32,W,W,q),ie=p(w,O.rsPow),he=O.nodeN,ve=[];for(let Me=0;Me<he;Me++){const ce=d(Me,he),Ye=ce[0]+.6*(c(Me*.31+9,C*.24)-.5),Ne=ce[1]+.6*(c(Me*.53+27,C*.21)-.5),Ve=ce[2]+.6*(c(Me*.77+55,C*.27)-.5),Ze=Math.hypot(Ye,Ne,Ve);ve.push([Ye/Ze,Ne/Ze,Ve/Ze])}const Te=[],De=[];for(let Me=0;Me<he;Me++)for(let ce=Me+1;ce<he;ce++){const Ye=Math.hypot(ve[Me][0]-ve[ce][0],ve[Me][1]-ve[ce][1],ve[Me][2]-ve[ce][2]);if(Ye>=O.thr)continue;const[Ne,Ve,Ze]=ne(ve[Me][0],ve[Me][1],ve[Me][2]),[yt,ct,We]=ne(ve[ce][0],ve[ce][1],ve[ce][2]);Te.push({x1:Ne,y1:Ve,x2:yt,y2:ct,white:.42,a:(1-Ye/O.thr)*(.3+.55*(((Ze+We)/2+1)/2)),w:Math.max(.6,O.lineW*ie)})}for(let Me=0;Me<he;Me++){const[ce,Ye,Ne]=ne(ve[Me][0],ve[Me][1],ve[Me][2]),Ve=(Ne+1)/2;De.push({x:ce,y:Ye,z:Ne,r:(O.nodeR+O.nodeRDepth*Ve)*(1+.25*Math.sin(C*1.4+Me*2.7))*ie,white:.55-.45*Ve})}for(let Me=0;Me<O.signals;Me++){const ce=Math.floor(C*.55+Me*7.31),Ye=Math.floor(l(ce,Me*3.1+1.7)*he),Ne=Math.floor(l(ce,Me*5.7+4.2)*he);if(Ye===Ne)continue;const Ve=o(C*.55+Me*7.31),Ze=r(ve[Ye][0],ve[Ne][0],Ve),yt=r(ve[Ye][1],ve[Ne][1],Ve),ct=r(ve[Ye][2],ve[Ne][2],Ve),We=Math.max(1e-6,Math.hypot(Ze,yt,ct)),[Ke,kt,ft]=ne(Ze/We,yt/We,ct/We),vt=(ft+1)/2;De.push({x:Ke,y:kt,z:ft,r:(O.nodeR*1.5+O.nodeRDepth*vt)*ie,white:.05,a:.5+.5*vt})}return g(De,Te,O.rMin)}function y(w,C,O){const W=w/2,q=W*.76,ne=u(C*.4,.3,W,W,1),ie=p(w,O.rsPow),he=[];for(let ve=0;ve<O.ghostN;ve++){const Te=d(ve,O.ghostN),[De,Me,ce]=ne(Te[0]*q,Te[1]*q,Te[2]*q);he.push({x:De,y:Me,z:ce,r:.8*ie,white:.78,a:.1+.22*((ce/q+1)/2)})}for(let ve=0;ve<3;ve++){const Te=ve/3*s;for(let De=0;De<O.strandN;De++){const Me=(o(De/O.strandN+C*.045)*2-1)*.96,ce=Math.sqrt(Math.max(0,1-Me*Me)),Ye=Math.min(1,(1-Math.abs(Me))/.1),Ne=Me*Math.PI*O.turns+Te,Ve=1+.075*Math.sin(Me*Math.PI*O.turns*2+Te*2+C*.8),Ze=ce*q*Ve,[yt,ct,We]=ne(Math.cos(Ne)*Ze,Me*q*Ve,Math.sin(Ne)*Ze),Ke=(We/q+1)/2;he.push({x:yt,y:ct,z:We,r:(O.rBase+O.rDepth*Ke)*ie,white:.55-.45*Ke,a:Ye*(.45+.55*Ke)})}}return g(he,[],O.rMin)}function U(w,C,O){const W=w/2,q=W*.78,ne=O.spin,ie=.3,he=u(C*.1*ne,ie,W,W,1),ve=p(w,O.rsPow),Te=[];for(let St=0;St<O.ghostN;St++){const xt=d(St,O.ghostN),[Vt,se,Le]=he(xt[0]*q,xt[1]*q,xt[2]*q);Te.push({x:Vt,y:se,z:Le,r:.8*ve,white:.78,a:.1+.22*((Le/q+1)/2)})}const De=C*.24*ne,Me=O.faceOn?-ie:.55+.3*Math.sin(C*.18)*ne,ce=Math.cos(De),Ye=0,Ne=Math.sin(De),Ve=-Ne*Math.sin(Me),Ze=Math.cos(Me),yt=ce*Math.sin(Me),ct=Ye*yt-Ne*Ze,We=Ne*Ve-ce*yt,Ke=ce*Ze-Ye*Ve,kt=.23*O.wobMul,ft=O.faceOn?q/(1+.85*kt):q,vt=Math.max(1,Math.round(O.lanes*O.bandMul));for(let St=0;St<vt;St++){const xt=(St-(vt-1)/2)*.075,Vt=Math.abs(St-(vt-1)/2)/Math.max(1,(vt-1)/2);for(let se=0;se<O.segs;se++){const Le=se/O.segs*s,Ue=(.16*Math.sin(Le*3-C*1.7+St*.22)+.07*Math.sin(Le*5+C*1.1))*O.wobMul,Ie=O.faceOn?1+Ue:1,$e=O.faceOn?xt:xt+Ue,Pt=Math.cos(Le),st=Math.sin(Le),En=ce*Pt+Ve*st+ct*$e,Zt=Ye*Pt+Ze*st+We*$e,nt=Ne*Pt+yt*st+Ke*$e,Bt=Math.hypot(En,Zt,nt),mr=ft*Ie,[tc,nc,ug]=he(En/Bt*mr,Zt/Bt*mr,nt/Bt*mr),Nf=(ug/q+1)/2;Te.push({x:tc,y:nc,z:ug,r:(O.rBase+O.rDepth*Nf)*(1-.25*Vt)*ve,white:.52-.44*Nf+.18*Vt,a:.4+.6*Nf})}}return g(Te,[],O.rMin)}const A=w=>{const C=w.length,O=[];let W=0;for(let q=0;q<C;q++){const ne=Math.hypot(w[(q+1)%C][0]-w[q][0],w[(q+1)%C][1]-w[q][1]);O.push(ne),W+=ne}return q=>{let ne=q*W,ie=0;for(;ne>O[ie]&&ie<C-1;)ne-=O[ie],ie++;const he=w[ie],ve=w[(ie+1)%C],Te=O[ie]?Math.min(1,ne/O[ie]):0;return[he[0]+(ve[0]-he[0])*Te,he[1]+(ve[1]-he[1])*Te]}},T=[w=>{const C=-Math.PI/2+w*s;return[Math.cos(C)*.24,Math.sin(C)*.24]},A([[0,-.26],[.24,.16],[-.24,.16]]),A([[0,-.2],[.2,-.2],[.2,.2],[-.2,.2],[-.2,-.2]])];function M(w,C,O){const ie=T.length,he=C%(2.3*ie),ve=Math.floor(he/2.3),Te=he-ve*2.3,De=Te>1.4?(Te-1.4)/.9:0,Me=De*De*(3-2*De),ce=T[ve],Ye=T[(ve+1)%ie],Ne=160,Ve=[],Ze=[];for(let xt=0;xt<Ne;xt++){const Vt=ce(xt/Ne),se=Ye(xt/Ne);Ve.push([(Vt[0]+(se[0]-Vt[0])*Me)*O.spread,(Vt[1]+(se[1]-Vt[1])*Me)*O.spread])}let yt=0;for(let xt=0;xt<Ne;xt++){const Vt=Math.hypot(Ve[(xt+1)%Ne][0]-Ve[xt][0],Ve[(xt+1)%Ne][1]-Ve[xt][1]);Ze.push(Vt),yt+=Vt}const ct=Math.max(6,Math.round(34*O.iconD)),We=O.rDot*1.35*O.spread,Ke=1+.02*Math.sin(Te*3.1),kt=w/2,ft=[];let vt=0,St=0;for(let xt=0;xt<ct;xt++){const Vt=xt/ct*yt;for(;St+Ze[vt]<Vt&&vt<Ne-1;)St+=Ze[vt],vt++;const se=Ve[vt],Le=Ve[(vt+1)%Ne],Ue=Ze[vt]?Math.min(1,(Vt-St)/Ze[vt]):0;ft.push({x:kt+(se[0]+(Le[0]-se[0])*Ue)*Ke*w,y:kt+(se[1]+(Le[1]-se[1])*Ue)*Ke*w,z:0,r:Math.max(.35,We*w),white:.1})}return g(ft,[],O.rMin)}const D={globe:{latRings:17,lonDensity:44,rBase:.6,rDepth:1.7,rBoost:1,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},orbits:{orbitN:12,ghostN:40,ghostR:.9,ghostA:.5,particles:3,partR:1.2,partRDepth:1.6,rsPow:.6,rMin:.3},rubik:{latRings:15,lonDensity:40,moveCount:14,rBase:.6,rDepth:1.7,rActive:.3,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},wave:{rings:15,lonDensity:40,rBase:.6,rDepth:1.7,rsPow:.6,rMin:.3},web:{nodeN:30,thr:.72,signals:5,nodeR:1.4,nodeRDepth:1.8,lineW:.8,rsPow:.6,rMin:.3},braid:{strandN:52,turns:3,ghostN:150,rBase:1.2,rDepth:1.8,rsPow:.6,rMin:.3},ribbon:{lanes:5,segs:88,ghostN:150,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},ring:{lanes:5,segs:88,ghostN:0,faceOn:1,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},morph:{rDot:.021,iconD:1,rMin:.25}},L={orbits:{64:{speed:1.885,count:1,size:1},20:{speed:3.9,count:.238,size:2.4}},globe:{64:{speed:2.015,count:.42,size:1.15,x:{scanMul:4.08,dimBase:.45}},20:{speed:2.665,count:.105,size:1.75,x:{scanMul:4.335,dimBase:.45}}},rubik:{64:{speed:1.82,count:.35,size:1.05},20:{speed:1.95,count:.088,size:1.9}},wave:{64:{speed:4.388,count:.341,size:1},20:{speed:3.998,count:.105,size:1.6}},web:{64:{speed:3.315,count:1.35,size:.95},20:{speed:6.63,count:.25,size:1.52}},braid:{64:{speed:1.625,count:.5,size:1},20:{speed:2.75,count:.1125,size:1.36}},ribbon:{64:{speed:2.34,count:.25,size:.85,x:{spin:0,bandMul:3.9,wobMul:1}},20:{speed:3.12,count:.051,size:1.073,x:{spin:0,bandMul:4.94,wobMul:1}}},ring:{64:{speed:3.24,count:.25,size:.956,x:{spin:0,bandMul:3.627,wobMul:.368}},20:{speed:3.78,count:.028,size:1.622,x:{spin:0,bandMul:3.968,wobMul:.565}}},morph:{64:{speed:2.405,count:.702,size:.395,x:{spread:1.45}},20:{speed:2.08,count:.53,size:1.011,x:{spread:1.45}}}},z=[["latRings","lonDensity"],["rings","lonDensity"],["lanes","segs"]],H=["orbitN","ghostN","nodeN","strandN","signals"],X=["rBase","rDepth","rActive","rDot","ghostR","partR","partRDepth","nodeR","nodeRDepth"],N={orbits:E,globe:m,rubik:f,wave:x,web:S,braid:y,ribbon:U,ring:U,morph:M},B=new Map;function P(w,C){const O=w+C,W=B.get(O);if(W)return W;const q=L[w][C],ne={...D[w]},ie=Math.sqrt(q.count),he=new Set;for(const[Te,De]of z)ne[Te]!=null&&ne[De]!=null&&!he.has(Te)&&!he.has(De)&&(ne[Te]=Math.max(2,Math.round(ne[Te]*ie)),ne[De]=Math.max(2,Math.round(ne[De]*ie)),he.add(Te),he.add(De));for(const Te of H)ne[Te]!=null&&ne[Te]!==0&&!he.has(Te)&&(ne[Te]=Math.max(1,Math.round(ne[Te]*q.count)));ne.iconD!=null&&(ne.iconD=Math.max(.02,ne.iconD*q.count));for(const Te of X)ne[Te]!=null&&(ne[Te]=ne[Te]*q.size);const ve={fn:N[w],speed:q.speed,opts:Object.assign({spin:1,faceOn:0,bandMul:1,wobMul:1,spread:1,scanMul:1,dimBase:1},ne,q.x||{})};return B.set(O,ve),ve}function F(w,C,O,W,q,ne){const ie=P(C,O),he=ie.fn(O,W*ie.speed,ie.opts),[ve,Te,De]=q;for(const Me of he.lines){const ce=1-Math.min(1,Math.max(0,Me.white));w.strokeStyle=`rgba(${ce*ve|0},${ce*Te|0},${ce*De|0},${(Me.a??1)*ne})`,w.lineWidth=Me.w,w.beginPath(),w.moveTo(Me.x1,Me.y1),w.lineTo(Me.x2,Me.y2),w.stroke()}for(const Me of he.dots){const ce=1-Math.min(1,Math.max(0,Me.white));w.fillStyle=`rgba(${ce*ve|0},${ce*Te|0},${ce*De|0},${(Me.a??1)*ne})`,w.beginPath(),w.arc(Me.x,Me.y,Me.r,0,s),w.fill()}}const I={IDLE:{mode:"ring",cn:"Idle"},RECV:{mode:"wave",cn:"Receive"},PLAN:{mode:"morph",cn:"Plan"},SCAN:{mode:"globe",cn:"Retrieve"},EXEC:{mode:"orbits",cn:"Execute"},DBUG:{mode:"rubik",cn:"Debug"},SYNC:{mode:"web",cn:"Coordinate"},MERG:{mode:"braid",cn:"Merge"},WRIT:{mode:"ribbon",cn:"Compose"}},j=[{id:"plan",cn:"Planning",tag:"PLAN",color:"#d6dee8",prog:[["PLAN",.8],["SYNC",.5]],rework:0},{id:"find",cn:"Research",tag:"FIND",color:"#9db6cc",prog:[["SCAN",1.6],["WRIT",.8]],rework:0},{id:"code",cn:"Coding",tag:"CODE",color:"#9ec4b8",prog:[["EXEC",2.9],["DBUG",1.4]],rework:.1},{id:"crit",cn:"Review",tag:"CRIT",color:"#b4aac8",prog:[["SCAN",.8],["MERG",1.2]],rework:.18},{id:"ship",cn:"Delivery",tag:"SHIP",color:"#c8ab9e",prog:[["MERG",.7],["WRIT",.7]],rework:0}],me={plan:1,find:2,code:3,crit:1,ship:1},Ae=16,Ee=210,Qe=128,Je=64,et=620,pe=178,Re=16;let ue=[],Be=[],Ge=[],Xe=[],wt=[],it=0,Rt=0,gt=0,dt=20,Ot=1,ut=null,Yt=0,Qt=0;const tt={x:-9999,y:-9999,in:!1};let Oe=20260418;const k=()=>(Oe=Oe*1664525+1013904223>>>0)/4294967296,{field:lt,glow:ee}=t,b=lt.getContext("2d");let _=innerWidth,G=innerHeight,Y=46;function J(w){const C=_>1080?268:240,O=_-Y,W=j.length;return{x:C+(w+.5)/W*(O-C),y:G*.5-16,rx:Math.max(40,(O-C)/W*.33),ry:Math.max(60,G*.28)}}const _e=w=>{const C=J(w.ri);return{x:C.x+(k()-.5)*C.rx*2,y:C.y+(k()-.5)*C.ry*2}};function we(w){const C=J(w),O={n:++gt,ri:w,x:C.x+(k()-.5)*C.rx*2,y:C.y+(k()-.5)*C.ry*2,head:k()*s,wp:null,phase:k()*40,state:"IDLE",task:null,step:0,left:0,queue:[],off:!1,busy:0,span:0,pulse:0,hist:new Array(28).fill(0),histT:0};return O.wp=_e(O),O}let oe=!1;const K=new Map,re={PLANNED:"IDLE",RUNNING:"EXEC",BLOCKED:"DBUG",REVIEW:"SCAN",REPAIR:"DBUG",VERIFIED:"MERG",MERGED:"MERG",DONE:"WRIT"},ge={PLANNED:"plan",RUNNING:"code",BLOCKED:"code",REVIEW:"crit",REPAIR:"code",VERIFIED:"crit",MERGED:"ship",DONE:"ship"};function xe(){ue=[],Be=[],Ge=[],Xe=[],wt=[],it=0,Rt=0,gt=0,Qt=0,j.forEach((w,C)=>{for(let O=0;O<me[w.id];O++)ue.push(we(C))});for(let w=0;w<90*30;w++)qe(1/30)}function be(w){const C=ue.filter(W=>W.ri===w&&!W.off);if(!C.length)return null;const O=C.filter(W=>W.state==="IDLE"&&!W.task&&!W.queue.length);return O.length?O[Math.floor(k()*O.length)]:C.reduce((W,q)=>q.queue.length<W.queue.length?q:W)}function Fe(w,C){const O=be(C);return O?(O.queue.push(w),O.pulse=1,!0):(Be.push({t:w,ri:C}),!1)}function je(w,C,O){const W=be(O);if(!W){Be.push({t:C,ri:O});return}Ge.push({from:w,to:W,task:C,f:0,back:O<w.ri})}function at(w){const[C,O]=j[w.ri].prog[w.step];w.state=C,w.left=O*(.75+k()*.5)}const V=30;function Ce(w,C){if(w.off){w.state="IDLE";return}const O=Math.exp(-C/V);if(w.span=w.span*O+C,w.task?w.busy=w.busy*O+C:w.busy*=O,!w.task){if(!w.queue.length){w.state="IDLE";return}w.task=w.queue.shift(),w.state="RECV",w.left=.34,w.step=-1}if(w.left-=C,w.left>0)return;if(w.step<0){w.step=0,at(w);return}if(w.step++,w.step<j[w.ri].prog.length){at(w);return}const W=j[w.ri],q=w.task;if(w.task=null,w.step=0,w.state="IDLE",q.hops++,w.ri>0&&k()<W.rework){q.rework++,je(w,q,w.ri-1);return}if(w.ri===j.length-1){q.doneAt=it,Qt++,wt.push(q),wt.length>80&&wt.shift();return}je(w,q,w.ri+1)}const fe=.055,le=Je*1.42;function Pe(w,C){const O=!!w.task;(!w.wp||Math.hypot(w.wp.x-w.x,w.wp.y-w.y)<16)&&(w.wp=_e(w));let W=w.wp.x,q=w.wp.y;if(tt.in){const he=Math.hypot(tt.x-w.x,tt.y-w.y);if(he<Qe){const ve=1-he/Qe;W=r(W,tt.x,ve*.85),q=r(q,tt.y,ve*.85)}}w.head+=Math.max(-fe,Math.min(fe,h(Math.atan2(q-w.y,W-w.x),w.head)));const ne=(O?7:30)*C;w.x+=Math.cos(w.head)*ne,w.y+=Math.sin(w.head)*ne;for(const he of ue){if(he===w)continue;const ve=w.x-he.x,Te=w.y-he.y,De=ve*ve+Te*Te;if(De>le*le)continue;const Me=Math.max(.001,Math.sqrt(De)),ce=(1-Me/le)*34*C,Ye=Math.abs(Te)<1?w.n<he.n?-le:le:Te,Ne=Math.max(.001,Math.hypot(ve,Ye));w.x+=ve/Ne*ce*.5,w.y+=Ye/Ne*ce*1.5}const ie=J(w.ri);w.x=r(w.x,Math.max(ie.x-ie.rx*1.5,Math.min(ie.x+ie.rx*1.5,w.x)),.08),w.y=r(w.y,Math.max(ie.y-ie.ry*1.2,Math.min(ie.y+ie.ry*1.2,w.y)),.08),w.pulse>0&&(w.pulse-=C*1.6),w.histT+=C,w.histT>1&&(w.histT=0,w.hist.push(O?1:0),w.hist.shift())}function Se(){return Be.length+Ge.length+ue.reduce((w,C)=>w+C.queue.length+(C.task?1:0),0)}function qe(w){it+=w,oe||(Yt-=w,Yt<=0&&(Yt=-Math.log(1-k())*(60/dt),Se()<Ae&&Fe({id:++Rt,at:it,hops:0,rework:0},0)));for(let C=Be.length-1;C>=0;C--){const O=be(Be[C].ri);O&&(O.queue.push(Be[C].t),O.pulse=1,Be.splice(C,1))}for(const C of ue)oe||Ce(C,w),Pe(C,w);for(let C=Ge.length-1;C>=0;C--){const O=Ge[C],W=Math.max(1,Math.hypot(O.to.x-O.from.x,O.to.y-O.from.y));O.f+=Ee*w/W,O.f>=1&&(ue.includes(O.to)&&!O.to.off?(O.to.queue.push(O.task),O.to.pulse=1):Be.push({t:O.task,ri:O.to.ri}),Ge.splice(C,1))}for(let C=Xe.length-1;C>=0;C--)Xe[C].t+=w*1.6,Xe[C].t>1&&Xe.splice(C,1)}const ke=[223,227,232],Mt=[207,217,228],It="ui-monospace, 'Geist Mono Variable', SFMono-Regular, Menlo, monospace",Dn=w=>[1,3,5].map(C=>parseInt(w.slice(C,C+2),16)).join(",");for(const w of j)w.rgb=Dn(w.color);function Nn(w){b.clearRect(0,0,_,G),b.textAlign="center";for(let C=0;C<j.length;C++){const O=j[C],W=J(C),q=ue.filter(ie=>ie.ri===C&&!ie.off).length,ne=ue.filter(ie=>ie.ri===C).reduce((ie,he)=>ie+he.queue.length,0);b.strokeStyle=`rgba(${O.rgb},0.055)`,b.lineWidth=1,b.beginPath(),b.moveTo(W.x,74),b.lineTo(W.x,G-66),b.stroke(),b.strokeStyle=`rgba(${O.rgb},0.16)`,b.beginPath(),b.moveTo(W.x-W.rx*.8,62),b.lineTo(W.x+W.rx*.8,62),b.stroke(),b.font=`10px ${It}`,b.fillStyle=`rgba(${O.rgb},${q?.78:.34})`,b.fillText(`${C+1}. ${O.cn} ${O.tag}`,W.x,40),b.font=`9px ${It}`,b.fillStyle="rgba(150,160,172,0.5)",b.fillText(q?`${q} agents · queue ${ne}`:"No agents",W.x,53)}b.textAlign="left",b.lineWidth=.7,b.setLineDash([3,5]);for(let C=0;C<ue.length;C++)for(let O=C+1;O<ue.length;O++){const W=ue[C],q=ue[O],ne=Math.hypot(W.x-q.x,W.y-q.y);ne>pe||(b.strokeStyle=`rgba(190,200,212,${(.42*(1-ne/pe)).toFixed(3)})`,b.beginPath(),b.moveTo(W.x,W.y),b.lineTo(q.x,q.y),b.stroke())}b.setLineDash([]);for(const C of Ge){const O=r(C.from.x,C.to.x,C.f),W=r(C.from.y,C.to.y,C.f),q=C.back?"224,104,95":"186,203,220";b.strokeStyle=`rgba(${q},0.18)`,b.lineWidth=.9,b.beginPath(),b.moveTo(C.from.x,C.from.y),b.lineTo(C.to.x,C.to.y),b.stroke();const ne=Math.max(0,C.f-.14),ie=r(C.from.x,C.to.x,ne),he=r(C.from.y,C.to.y,ne),ve=b.createLinearGradient(ie,he,O,W);ve.addColorStop(0,`rgba(${q},0)`),ve.addColorStop(1,`rgba(${q},0.85)`),b.strokeStyle=ve,b.lineWidth=1.6,b.beginPath(),b.moveTo(ie,he),b.lineTo(O,W),b.stroke(),b.fillStyle=`rgba(${q},0.95)`,b.beginPath(),b.arc(O,W,2.3,0,s),b.fill()}b.font=`9.5px ${It}`,b.textBaseline="middle";for(const C of ue){const O=j[C.ri],W=ut===C,q=tt.in&&Math.hypot(tt.x-C.x,tt.y-C.y)<Je*.62;if(C.off||(b.strokeStyle="rgba(150,160,172,0.42)",b.lineWidth=.8,b.beginPath(),b.moveTo(C.x-Math.cos(C.head)*Je*.4,C.y-Math.sin(C.head)*Je*.4),b.lineTo(C.x-Math.cos(C.head)*Je*.74,C.y-Math.sin(C.head)*Je*.74),b.stroke(),C.wp&&!C.task&&(b.fillStyle="rgba(150,160,172,0.45)",b.beginPath(),b.arc(C.wp.x,C.wp.y,1.6,0,s),b.fill())),b.save(),b.translate(C.x-Je/2,C.y-Je/2),F(b,I[C.state].mode,Je,w+C.phase,W?Mt:ke,C.off?.16:1),b.restore(),C.pulse>0){const ce=C.pulse;b.strokeStyle=`rgba(200,214,228,${(ce*.7).toFixed(3)})`,b.lineWidth=1,b.beginPath(),b.arc(C.x,C.y,Je*.42+(1-ce)*22,0,s),b.stroke()}(W||q)&&(b.strokeStyle=W?"rgba(207,217,228,0.75)":"rgba(190,200,212,0.30)",b.lineWidth=1,b.setLineDash([2,4]),b.beginPath(),b.arc(C.x,C.y,Je*.6,0,s),b.stroke(),b.setLineDash([]));const ne=`A${C.n} ${O.tag}`,ie=C.off?" OFFLINE":" "+C.state,he=b.measureText(ne).width,ve=b.measureText(ie).width,De=C.x+Je*.42+he+ve>_-12?C.x-Je*.42-he-ve:C.x+Je*.42,Me=C.y-Je*.3;b.fillStyle=C.off?"rgba(120,128,138,.55)":O.color,b.fillText(ne,De,Me),b.fillStyle=C.off?"rgba(100,108,118,.5)":"rgba(190,200,212,0.62)",b.fillText(ie,De+he,Me),C.queue.length&&(b.fillStyle="rgba(207,217,228,0.92)",b.fillText(`+${C.queue.length}`,De,Me+12))}tt.in&&(b.strokeStyle="rgba(190,200,212,0.13)",b.lineWidth=.5,b.setLineDash([6,8]),b.beginPath(),b.arc(tt.x,tt.y,Qe,0,s),b.stroke(),b.setLineDash([]));for(const C of Xe)b.strokeStyle=`rgba(224,104,95,${((1-C.t)*.75).toFixed(3)})`,b.lineWidth=2*(1-C.t),b.beginPath(),b.arc(C.x,C.y,12+C.t*150,0,s),b.stroke()}const Dt=ee.getContext("webgl",{alpha:!1,antialias:!1});let Si=()=>{};if(Dt){const w=`precision mediump float;
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
    }`,C=(Me,ce)=>{const Ye=Dt.createShader(Me);return Dt.shaderSource(Ye,ce),Dt.compileShader(Ye),Ye},O=Dt.createProgram();Dt.attachShader(O,C(Dt.VERTEX_SHADER,"attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}")),Dt.attachShader(O,C(Dt.FRAGMENT_SHADER,w)),Dt.linkProgram(O),Dt.useProgram(O);const W=Dt.createBuffer();Dt.bindBuffer(Dt.ARRAY_BUFFER,W),Dt.bufferData(Dt.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),Dt.STATIC_DRAW);const q=Dt.getAttribLocation(O,"p");Dt.enableVertexAttribArray(q),Dt.vertexAttribPointer(q,2,Dt.FLOAT,!1,0,0);const ne=Me=>Dt.getUniformLocation(O,Me),ie=ne("uRes"),he=ne("uTime"),ve=ne("uN"),Te=ne("uA[0]"),De=new Float32Array(Re*3);Si=(Me,ce)=>{const Ye=Math.min(Re,ue.length);for(let Ne=0;Ne<Ye;Ne++){const Ve=ue[Ne];De[Ne*3]=Ve.x*ce,De[Ne*3+1]=(G-Ve.y)*ce,De[Ne*3+2]=Ve.off?.05:Ve.task?1:.22}Dt.uniform2f(ie,ee.width,ee.height),Dt.uniform1f(he,Me),Dt.uniform1f(ve,Ye),Dt.uniform3fv(Te,De),Dt.drawArrays(Dt.TRIANGLES,0,3)}}const en=t.roster;function bt(){const w=Math.min(devicePixelRatio,2);en.innerHTML=j.map((C,O)=>{const W=ue.filter(q=>q.ri===O);return`<div class="grp"><h2><i style="background:${C.color}"></i>${C.cn} ${C.tag}<span class="sp"></span>
      <button data-sub="${O}" type="button"${W.length?"":" disabled"}>−</button>
      <button data-add="${O}" type="button"${ue.length>=Re?" disabled":""}>+</button></h2>
      ${W.map(q=>`<div class="ag" data-n="${q.n}"><canvas></canvas>
        <span class="nm">${q.label||"A"+q.n}</span><span class="st"></span>
        <span class="q"></span><span class="bar"><i></i></span></div>`).join("")}
    </div>`}).join("");for(const C of en.querySelectorAll("canvas"))C.width=20*w,C.height=20*w,C.getContext("2d").setTransform(w,0,0,w,0,0)}a(en,"click",w=>{const C=w.target.closest("[data-add]"),O=w.target.closest("[data-sub]");if(C){ue.length<Re&&(ue.push(we(+C.dataset.add)),bt());return}if(O){const q=+O.dataset.sub,ne=ue.filter(he=>he.ri===q);if(!ne.length)return;const ie=ne[ne.length-1];ue=ue.filter(he=>he!==ie),ut===ie&&(ut=null,Hn());for(const he of[...ie.task?[ie.task]:[],...ie.queue])Fe(he,q);bt();return}const W=w.target.closest("[data-n]");W&&(ut=ue.find(q=>q.n===+W.dataset.n)||null,Hn(),bt())});function Un(w){for(const C of en.querySelectorAll(".ag")){const O=ue.find(ie=>ie.n===+C.dataset.n);if(!O)continue;const W=C.querySelector("canvas").getContext("2d");W.clearRect(0,0,20,20),F(W,I[O.state].mode,20,w+O.phase,ut===O?Mt:ke,O.off?.2:1),C.querySelector(".st").textContent=O.off?"OFFLINE":`${O.state} ${I[O.state].cn}`,C.querySelector(".q").textContent=O.queue.length?`+${O.queue.length}`:"";const q=O.span>0?O.busy/O.span:0,ne=C.querySelector(".bar i");ne.style.width=(q*100).toFixed(0)+"%",ne.style.background=q>.86?"var(--bad)":q>.75?"var(--warn)":"var(--muted)",C.classList.toggle("on",ut===O),C.classList.toggle("down",O.off)}}function li(){const w=ut,C=j[w.ri],O=w.span>0?w.busy/w.span:0,W=I[w.state];return{n:w.n,color:C.color,cn:C.cn,prog:C.prog.map(q=>q[0]).join(" → "),off:w.off,st:`${w.state} ${W.cn}`,md:W.mode,tk:w.task?"#"+w.task.id:"—",q:w.queue.length,u:(O*100).toFixed(0)+"%",hist:w.hist.map(q=>!!q)}}function Hn(){if(!ut||!ue.includes(ut)){ut=null,e.card(null);return}e.card(li())}function $n(){!ut||!ue.includes(ut)||e.card(li())}function Gi(w){const C=ut;C&&(w==="off"?(C.off=!C.off,C.off&&Mi(C)):$i(C),Hn(),bt())}function ha(){ut=null,Hn(),bt()}function Mi(w){const C=[...w.task?[w.task]:[],...w.queue];w.task=null,w.queue=[],w.state="IDLE",w.step=0;for(const O of C){const W=be(w.ri);W&&W!==w?(W.queue.push(O),W.pulse=1):Be.push({t:O,ri:w.ri})}}function $i(w){!w.task&&!w.queue.length||(Xe.push({x:w.x,y:w.y,t:0}),Mi(w))}function ki(){const w=Math.min(60,it),C=wt.filter(ne=>ne.doneAt>it-60),O=wt.slice(-20).map(ne=>ne.doneAt-ne.at).sort((ne,ie)=>ne-ie),W=j.map((ne,ie)=>{const he=ue.filter(De=>De.ri===ie&&!De.off),ve=he.reduce((De,Me)=>De+Me.span,0),Te=he.reduce((De,Me)=>De+Me.busy,0);return{r:ne,n:he.length,u:ve>0?Te/ve:0,q:he.reduce((De,Me)=>De+Me.queue.length,0)}});let q=0;for(let ne=0;ne<ue.length;ne++)for(let ie=ne+1;ie<ue.length;ie++)Math.hypot(ue[ne].x-ue[ie].x,ue[ne].y-ue[ie].y)<pe&&q++;return{thr:w>3?C.length/w*60:0,lead:O.length?O[Math.floor(O.length/2)]:0,wip:Se(),fin:Qt,util:W,links:q}}function Qn(){const w=ki();$n(),t.tally.innerHTML=`<b>${ue.filter(q=>!q.off).length}</b> active · <b>${ue.filter(q=>q.task).length}</b> working<br>
     <b>${w.links}</b> links · <b>${Ge.length}</b> messages in transit · <b>${w.fin}</b> delivered`,t.stats.innerHTML=`
    <div class="m"><u>Throughput</u><b>${w.thr.toFixed(1)}<s>tasks/min</s></b></div>
    <div class="m"><u>Lead time</u><b>${w.lead.toFixed(1)}<s>sec</s></b></div>
    <div class="m"><u>Work in progress</u><b>${w.wip}<s>/${Ae}</s></b></div>
    ${w.util.map(q=>`<div class="m"><u>${q.r.cn}</u><b style="color:${q.u>.86?"var(--bad)":q.u>.75?"var(--warn)":"var(--ink)"}">${(q.u*100).toFixed(0)}<s>%</s></b></div>`).join("")}`;const C=w.util.find(q=>q.n===0),O=w.util.reduce((q,ne)=>ne.u>q.u?ne:q),W=w.util.reduce((q,ne)=>ne.q>q.q?ne:q);t.verdict.innerHTML=C?`<b>${C.r.cn}</b> has no agents; work is blocked upstream.`:it<15?"Warming up: throughput becomes reliable after a full minute of completions.":O.u>.86?`Bottleneck: <b>${O.r.cn}</b> at ${(O.u*100).toFixed(0)}% utilization. Add capacity here first.`:W.q>=3?`<b>${W.r.cn}</b> has ${W.q} queued tasks; this is arrival variability, not yet a sustained capacity gap.`:`No clear bottleneck. <b>${O.r.cn}</b> is busiest at ${(O.u*100).toFixed(0)}%. Raise arrival rate to stress the system.`}const bi=w=>{dt=+w},ja=w=>{Ot=+w,e.speed(Ot)},Ds=(w,C)=>ue.find(O=>Math.hypot(O.x-w,O.y-C)<Je*.62)||null;let pa=null,Qi=!1;a(lt,"pointermove",w=>{tt.x=w.clientX,tt.y=w.clientY,tt.in=!0}),a(lt,"pointerleave",()=>{tt.in=!1,tt.x=tt.y=-9999}),a(lt,"pointerdown",w=>{const C=Ds(w.clientX,w.clientY);Qi=!1,C&&(pa=setTimeout(()=>{Qi=!0,$i(C),bt()},et))}),a(window,"pointerup",w=>{clearTimeout(pa),!(Qi||w.target!==lt)&&(ut=Ds(w.clientX,w.clientY),Hn(),bt())}),a(window,"keydown",w=>{w.key==="Escape"&&(ut=null,Hn(),bt()),w.key===" "&&!w.target.closest("button,input")&&(w.preventDefault(),ja(Ot?0:1))});function Ns(){const w=Math.min(devicePixelRatio,2);_=innerWidth,G=innerHeight;for(const C of[lt,ee])(C.width!==Math.round(_*w)||C.height!==Math.round(G*w))&&(C.width=Math.round(_*w),C.height=Math.round(G*w),C===lt?b.setTransform(w,0,0,w,0,0):Dt&&Dt.viewport(0,0,C.width,C.height));return w}const R=matchMedia("(prefers-reduced-motion: reduce)"),Z=GC({getAgents:()=>ue,ROLES:j,STATES:I,LINK_R:pe});let ae=0,$=1;Ns(),xe(),bt();let te=0;(function w(C){te=requestAnimationFrame(w);const O=Ns(),W=Math.min(.05,(C-ae)/1e3);ae=C,Y=r(Y,ut&&_>1080?300:46,1-Math.exp(-W*5)),Ot&&qe(W*Ot);const q=R.matches?0:it;Dt&&Si(C/1e3,O),Z.step(W*Ot||0),Nn(q),Z.draw(b),Un(q),$+=W,$>.25&&($=0,Qn())})(0);function ze(w){if(!Array.isArray(w)||w.length===0)return oe&&(oe=!1,K.clear(),xe(),bt()),{live:!1,agents:0};oe=!0;const C=new Set,O=[];for(const W of w.slice(0,Re)){const q=String(W.id);if(C.has(q))continue;C.add(q);const ne=ge[W.status]||"code",ie=Math.max(0,j.findIndex(ve=>ve.id===ne));let he=K.get(q);he||(he=we(ie),K.set(q,he)),he.ri=ie,he.label=W.label||q,he.state=re[W.status]||"IDLE",he.task=null,he.queue=[],he.off=!1,O.push(he)}for(const W of[...K.keys()])C.has(W)||K.delete(W);return ue=O,Be=[],Ge=[],bt(),{live:!0,agents:ue.length}}return{setLam:bi,setSpeed:ja,cardAct:Gi,closeCard:ha,mesh:Z,setFleet:ze,dispose(){n.abort(),cancelAnimationFrame(te),clearTimeout(pa)}}}const VC=["info","ok","warn","bad"];function XC({mesh:t}){const e=new Map,n=new Map,i=[];let a=new Map,s=new Map;const r=(A,T)=>(e.get(A)||[]).forEach(M=>M(T));function o(A,T,M){i.unshift({ts:new Date,level:VC.includes(A)?A:"info",text:T,id:M}),i.length>60&&i.pop(),S(),r("note",i[0])}function l({id:A,name:T,n:M}={}){if(!A)throw new Error("PlugBrainMesh.register: {id} is required");const D=t.snapshot();let L=M;if(L==null){const X=D.find(N=>![...a.values()].includes(N.n));L=X?X.n:null}if(L==null)return o("warn",`register ${A}: no free field agent left`),null;a.set(A,L);const z=(D.find(X=>X.n===L)||{}).hue||"#8ab2d1",H={id:A,name:T||A,n:L,hue:z,ts:Date.now()};return n.set(A,H),o("ok",`registered ${H.name} → field agent A${L}`,A),r("register",H),f(D),H}function c(A){if(!n.delete(A))return!1;const T=a.get(A);return a.delete(A),o("info",`unregistered ${A} (A${T} returns to the pool)`,A),r("unregister",{id:A,n:T}),f(),!0}function d(A,T,M="info"){o(M,T,A)}const h=document.createElement("div");h.id="mesh-root",h.innerHTML=`
    <button id="mesh-toggle" type="button" title="Agent registry (m)">◈ mesh</button>
    <div id="mesh-panel" aria-hidden="true">
      <div class="mp-head">
        <h3>Agent Registry</h3><span class="mp-count"></span>
        <button class="mp-x" type="button" title="close">✕</button>
      </div>
      <div class="mp-list"></div>
      <div class="mp-foot">PlugBrainMesh · register() · note() · unregister()</div>
    </div>
    <div id="mesh-feed"></div>`,document.body.appendChild(h);const u=h.querySelector("#mesh-panel"),p=h.querySelector(".mp-list"),g=h.querySelector("#mesh-feed"),E=h.querySelector("#mesh-toggle"),m=A=>{u.setAttribute("aria-hidden",String(!A)),E.classList.toggle("on",A),A&&f()};E.addEventListener("click",()=>m(u.getAttribute("aria-hidden")==="true")),h.querySelector(".mp-x").addEventListener("click",()=>m(!1)),window.addEventListener("keydown",A=>{A.key.toLowerCase()==="m"&&!A.target.closest("input,button")&&m(u.getAttribute("aria-hidden")==="true")});function f(A=t.snapshot()){h.querySelector(".mp-count").textContent=`${A.length} on field · ${n.size} registered`,p.innerHTML=A.map(T=>{const M=[...n.values()].find(z=>z.n===T.n),D=M?M.name:`A${T.n}`,L=Math.round(T.util*100);return`<div class="mp-row" data-n="${T.n}">
        <i class="mp-hue" style="background:${T.hue}"></i>
        <span class="mp-name">${D}${M?` <s>A${T.n}</s>`:""}</span>
        <span class="mp-state ${T.state==="OFFLINE"?"off":""}">${T.stateCn}</span>
        <span class="mp-task">${T.task||""}</span>
        <span class="mp-bar"><i style="width:${L}%;background:${L>86?"var(--bad)":L>75?"var(--warn)":T.hue}"></i></span>
      </div>`}).join("")}const x=A=>A.toTimeString().slice(0,8);function S(){g.innerHTML=i.slice(0,9).map((A,T)=>`<div class="mf-line" style="opacity:${1-T*.1}">
        <s>${x(A.ts)}</s><i class="mf-${A.level}"></i><span>${A.text}</span>
      </div>`).join("")}let y=setInterval(()=>{const A=t.snapshot();for(const T of A){const M=s.get(T.n);if(M&&M!==T.state){const D=[...n.values()].find(H=>H.n===T.n),L=D?D.name:`A${T.n}`,z=T.state==="DBUG"?"warn":T.state==="EXEC"?"ok":"info";o(z,`${L} · ${M} → ${T.state}${T.task?" · "+T.task:""}`,D==null?void 0:D.id)}s.set(T.n,T.state)}u.getAttribute("aria-hidden")==="false"&&f(A)},800);const U={register:l,unregister:c,note:d,list:()=>[...n.values()],feed:()=>[...i],on:(A,T)=>(e.has(A)||e.set(A,new Set),e.get(A).add(T),()=>e.get(A).delete(T)),dispose:()=>{clearInterval(y),h.remove()}};return window.PlugBrainMesh=U,o("ok","agent mesh module online — simulated fleet auto-registered"),U}const WC=[[0,"⏸"],[1,"1×"],[2,"2×"],[4,"4×"]];function jC({tally:t,stats:e,verdict:n}){return v.jsxs("div",{"aria-hidden":"true","data-engine-panels":"hidden-simulated-metrics",style:{display:"none"},children:[v.jsx("div",{id:"tally",ref:t}),v.jsx("div",{id:"stats",ref:e}),v.jsx("div",{id:"verdict",ref:n})]})}function qC({tasks:t,workspaceId:e,onSelectFile:n}){const i=de.useRef(null),a=de.useRef(null),s=de.useRef(null),r=de.useRef(null),o=de.useRef(null),l=de.useRef(null),c=de.useRef(null),[d,h]=de.useState(1),[u,p]=de.useState([]),[g,E]=de.useState([]),[m,f]=de.useState(null),x=de.useRef(null);x.current=m;const[S,y]=de.useState(null),[U,A]=de.useState(!1),[T,M]=de.useState([]),D=async()=>{try{const[N,B]=await Promise.all([bC(e),EC(e)]);p(N),E(B),!x.current&&N.length>0&&L(N[0].id)}catch{}};de.useEffect(()=>{D();const N=setInterval(D,3e3);return()=>clearInterval(N)},[e]),de.useEffect(()=>{let N=null;try{N=new EventSource("/api/live/events"),N.addEventListener("agent.registered",B=>{try{const P=JSON.parse(B.data);M(F=>[{id:`reg-${Date.now()}-${Math.random()}`,time:new Date().toLocaleTimeString(),text:`Agent registriert: ${P.name||P.agentId}`,color:"var(--accent)"},...F.slice(0,8)]),D()}catch{}}),N.addEventListener("agent.heartbeat",()=>{D()}),N.addEventListener("lease.acquired",B=>{try{const P=JSON.parse(B.data);M(F=>[{id:`claim-${Date.now()}-${Math.random()}`,time:new Date().toLocaleTimeString(),text:`Claim: ${P.agentId} sperrt ${Array.isArray(P.paths)?P.paths.join(", "):"Ressource"}`,color:"#e0a355"},...F.slice(0,8)]),D()}catch{}}),N.addEventListener("lease.released",B=>{try{const P=JSON.parse(B.data);M(F=>[{id:`rel-${Date.now()}-${Math.random()}`,time:new Date().toLocaleTimeString(),text:`Claim freigegeben: ${P.agentId}`,color:"#8ac1a0"},...F.slice(0,8)]),D()}catch{}}),N.addEventListener("message.sent",B=>{try{const P=JSON.parse(B.data);M(F=>[{id:`msg-${Date.now()}-${Math.random()}`,time:new Date().toLocaleTimeString(),text:`Nachricht: ${P.fromAgent} → ${P.toAgent||"Kanal"} (${P.subject||"Info"})`,color:"#8ab2d1"},...F.slice(0,8)]),D()}catch{}})}catch{}return()=>{N&&N.close()}},[]),de.useEffect(()=>{const N=kC({els:{glow:i.current,field:a.current,roster:s.current,tally:r.current,stats:o.current,verdict:l.current},emit:{card:P=>{if(P!=null&&P.tk){const F=u.find(I=>I.taskId===P.tk||I.name===P.cn||I.id===P.cn);F&&L(F.id)}},speed:h}});c.current=N;const B=XC({mesh:N.mesh});return()=>{B.dispose(),N.dispose(),c.current=null}},[u]),de.useEffect(()=>{var N,B;u.length>0?(N=c.current)==null||N.setFleet(u.map(P=>({id:P.id,label:`${P.name} (${P.presence.toUpperCase()})`,status:P.presence==="active"?"RUNNING":P.presence==="idle"?"REVIEW":"PLANNED"}))):(B=c.current)==null||B.setFleet(t.map(P=>({id:P.id,label:P.assignedAgentId||P.title||P.id,status:P.status})))},[u,t]);const L=async N=>{f(N),A(!0);try{const B=await TC(N,e);y(B)}catch{y(null)}finally{A(!1)}},z=u.filter(N=>N.presence==="active").length,H=u.filter(N=>N.presence==="idle").length,X=u.filter(N=>N.presence==="dead").length;return v.jsxs(v.Fragment,{children:[v.jsx("canvas",{id:"glow",ref:i,"aria-hidden":"true"}),v.jsx("canvas",{id:"field",ref:a,"aria-hidden":"true"}),v.jsx(jC,{tally:r,stats:o,verdict:l}),v.jsxs("div",{className:"ov",id:"hud",children:[v.jsxs("h1",{children:[v.jsx("i",{}),"Agent Mesh",v.jsx("em",{children:"Swarm Coordination"})]}),v.jsx("div",{className:"tally",id:"swarm-tally",children:u.length>0?v.jsxs("span",{style:{fontSize:"13px",color:"var(--text)"},children:[v.jsxs("b",{style:{color:"var(--accent)"},children:[u.length," Agenten"]})," (",z," aktiv · ",H," idle · ",X," tot) ·"," ",v.jsxs("b",{style:{color:"#e0a355"},children:[g.length," Claims"]})," ·"," ",v.jsxs("b",{children:[t.length," Tasks in der Queue"]})]}):"Keine aktiven Swarm-Agenten registriert"})]}),v.jsxs("div",{className:"ov",style:{position:"absolute",top:"70px",left:"20px",width:"260px",maxHeight:"calc(100vh - 160px)",overflowY:"auto",background:"rgba(18, 20, 24, 0.88)",backdropFilter:"blur(10px)",border:"1px solid var(--line)",borderRadius:"8px",padding:"12px",zIndex:10},children:[v.jsxs("div",{style:{fontSize:"12px",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.05em",color:"var(--faint)",marginBottom:"8px"},children:["Swarm Agenten (",u.length,")"]}),u.length===0?v.jsxs("div",{style:{fontSize:"12px",color:"var(--faint)",padding:"8px 0"},children:["Warte auf Agent-Registrierung über ",v.jsx("code",{children:"/api/agent/register"})," oder MCP …"]}):u.map(N=>{const B=m===N.id,P=N.presence==="active"?"#8ac1a0":N.presence==="idle"?"#e0a355":"#d1a3a3";return v.jsxs("div",{onClick:()=>L(N.id),style:{padding:"8px 10px",borderRadius:"6px",marginBottom:"6px",cursor:"pointer",background:B?"rgba(138, 178, 209, 0.16)":"rgba(255,255,255,0.02)",border:B?"1px solid var(--accent)":"1px solid transparent",display:"flex",alignItems:"center",justifyContent:"space-between",transition:"background 0.15s ease"},children:[v.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[v.jsx("span",{style:{width:"10px",height:"10px",borderRadius:"50%",background:N.color||"var(--accent)",display:"inline-block"}}),v.jsxs("div",{children:[v.jsx("div",{style:{fontSize:"13px",fontWeight:500,color:"var(--text)"},children:N.name||N.id}),v.jsx("div",{className:"mono",style:{fontSize:"10px",color:"var(--faint)"},children:N.taskId||"kein aktiver Task"})]})]}),v.jsx("span",{style:{fontSize:"10px",fontWeight:600,textTransform:"uppercase",padding:"2px 6px",borderRadius:"4px",color:P,background:`${P}22`},children:N.presence})]},N.id)}),T.length>0&&v.jsxs("div",{style:{marginTop:"16px",borderTop:"1px solid var(--line)",paddingTop:"10px"},children:[v.jsx("div",{style:{fontSize:"11px",fontWeight:600,color:"var(--faint)",marginBottom:"6px"},children:"Live-Ereignisse (SSE)"}),T.slice(0,5).map(N=>v.jsxs("div",{style:{fontSize:"11px",marginBottom:"4px",color:N.color||"var(--text)"},children:[v.jsx("span",{className:"mono",style:{color:"var(--faint)",marginRight:"6px"},children:N.time}),N.text]},N.id))]})]}),v.jsx("div",{id:"roster",ref:s,style:{display:"none"}}),v.jsxs("div",{className:"ov"+(m?" on":""),id:"inspect",style:{width:"380px",maxHeight:"calc(100vh - 100px)",overflowY:"auto",background:"rgba(18, 20, 24, 0.95)",backdropFilter:"blur(12px)",border:"1px solid var(--line)",borderRadius:"8px",padding:"16px",zIndex:20},children:[U&&v.jsx("div",{style:{padding:"20px",textAlign:"center",color:"var(--faint)"},children:"Lade Agent-Details …"}),(S==null?void 0:S.agent)&&v.jsxs(v.Fragment,{children:[v.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"12px"},children:[v.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[v.jsx("i",{style:{width:"12px",height:"12px",borderRadius:"50%",background:S.agent.color||"var(--accent)",display:"inline-block"}}),v.jsxs("h3",{style:{margin:0,fontSize:"15px"},children:[S.agent.name," ",v.jsxs("span",{className:"mono",style:{fontSize:"12px",color:"var(--faint)"},children:["(",S.agent.id,")"]})]})]}),v.jsx("button",{className:"x",type:"button",onClick:()=>{f(null),y(null)},title:"Schließen",children:"✕"})]}),v.jsxs("div",{className:"kv",style:{display:"grid",gridTemplateColumns:"120px 1fr",gap:"6px 12px",fontSize:"12px",marginBottom:"16px"},children:[v.jsx("span",{style:{color:"var(--faint)"},children:"Status"}),v.jsx("b",{style:{color:S.agent.state==="active"?"#8ac1a0":S.agent.state==="idle"?"#e0a355":"#d1a3a3"},children:S.agent.state.toUpperCase()}),v.jsx("span",{style:{color:"var(--faint)"},children:"Modell"}),v.jsx("b",{className:"mono",children:S.agent.model||"—"}),v.jsx("span",{style:{color:"var(--faint)"},children:"Host"}),v.jsx("b",{className:"mono",children:S.agent.host||"local"}),v.jsx("span",{style:{color:"var(--faint)"},children:"Aktiver Task"}),v.jsx("b",{className:"mono",children:S.agent.taskId||"kein Task aktiv"}),v.jsx("span",{style:{color:"var(--faint)"},children:"Mission"}),v.jsx("b",{children:S.agent.missionId||"—"}),v.jsx("span",{style:{color:"var(--faint)"},children:"Checkout"}),v.jsx("b",{className:"mono",children:S.agent.checkoutId||"—"}),v.jsx("span",{style:{color:"var(--faint)"},children:"Heartbeat"}),v.jsx("b",{className:"mono",children:S.agent.lastHeartbeat?new Date(S.agent.lastHeartbeat).toLocaleTimeString():"—"})]}),v.jsxs("div",{style:{marginBottom:"14px",borderTop:"1px solid var(--line)",paddingTop:"10px"},children:[v.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["Aktive Claims / Leases (",S.claims.length,")"]}),S.claims.length===0?v.jsx("div",{style:{fontSize:"11px",color:"var(--faint)"},children:"Keine aktiven Claims gehalten"}):S.claims.map((N,B)=>v.jsxs("div",{style:{background:"rgba(255,255,255,0.03)",border:"1px solid var(--line)",borderRadius:"4px",padding:"6px 8px",marginBottom:"6px",fontSize:"11px"},children:[v.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"2px"},children:[v.jsxs("span",{style:{fontWeight:600,color:N.mode==="write"?"#e0a355":"var(--accent)"},children:[N.mode.toUpperCase()," LEASE"]}),v.jsxs("span",{className:"mono",style:{color:"var(--faint)"},children:["Epoch ",N.epoch]})]}),N.paths.map(P=>v.jsxs("div",{className:"mono",style:{color:"var(--text)",cursor:n?"pointer":"default",textDecoration:n?"underline":"none"},onClick:()=>n==null?void 0:n(P),title:n?"In Quellansicht öffnen":P,children:["📄 ",P]},P))]},N.id||B))]}),v.jsxs("div",{style:{marginBottom:"14px",borderTop:"1px solid var(--line)",paddingTop:"10px"},children:[v.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["Letzte Dateiereignisse (",S.dateiereignisse.length,")"]}),S.dateiereignisse.length===0?v.jsx("div",{style:{fontSize:"11px",color:"var(--faint)"},children:"Keine Dateizugriffe protokolliert"}):S.dateiereignisse.slice(0,6).map(N=>v.jsxs("div",{style:{fontSize:"11px",padding:"4px 0",borderBottom:"1px solid rgba(255,255,255,0.03)",display:"flex",alignItems:"center",justifyContent:"space-between"},children:[v.jsxs("div",{className:"mono",style:{cursor:n?"pointer":"default",color:"var(--text)"},onClick:()=>n==null?void 0:n(N.path),title:n?"In Quellansicht öffnen":N.path,children:[v.jsx("b",{style:{color:N.action==="write"?"#e0a355":"#8ac1a0",marginRight:"6px"},children:N.action.toUpperCase()}),N.path]}),v.jsx("span",{className:"mono",style:{color:"var(--faint)",fontSize:"10px"},children:new Date(N.at).toLocaleTimeString()})]},N.id))]}),v.jsxs("div",{style:{marginBottom:"14px",borderTop:"1px solid var(--line)",paddingTop:"10px"},children:[v.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["Letzte Tool- & Trace-Ereignisse (",S.toolereignisse.length,")"]}),S.toolereignisse.length===0?v.jsx("div",{style:{fontSize:"11px",color:"var(--faint)"},children:"Keine Trace-Ereignisse"}):S.toolereignisse.slice(0,5).map(N=>v.jsxs("div",{style:{fontSize:"11px",padding:"3px 0"},children:[v.jsx("span",{className:"mono",style:{color:"#8ab2d1",marginRight:"6px"},children:N.type}),v.jsx("span",{className:"mono",style:{color:"var(--faint)",fontSize:"10px"},children:new Date(N.occurred_at).toLocaleTimeString()})]},N.id))]}),v.jsxs("div",{style:{borderTop:"1px solid var(--line)",paddingTop:"10px"},children:[v.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["Nachrichten & Handoffs (",S.messages.length,")"]}),S.messages.length===0?v.jsx("div",{style:{fontSize:"11px",color:"var(--faint)"},children:"Keine Nachrichten im Posteingang"}):S.messages.slice(0,4).map(N=>v.jsxs("div",{style:{background:"rgba(255,255,255,0.02)",border:"1px solid var(--line)",borderRadius:"4px",padding:"6px 8px",marginBottom:"6px",fontSize:"11px"},children:[v.jsxs("div",{style:{display:"flex",justifyContent:"space-between",marginBottom:"2px"},children:[v.jsx("b",{style:{color:"var(--text)"},children:N.subject||"Nachricht"}),v.jsx("span",{className:"mono",style:{color:N.deliveredAt?"#8ac1a0":"#e0a355"},children:N.deliveredAt?"delivered":"pending"})]}),v.jsxs("div",{style:{color:"var(--faint)",marginBottom:"2px"},children:["Von: ",N.fromAgent," ",N.toAgent?`→ An: ${N.toAgent}`:""]}),v.jsx("div",{style:{color:"var(--text)"},children:N.body})]},N.id))]})]})]}),v.jsxs("div",{className:"ov",id:"ctl",children:[v.jsx("div",{className:"seg",id:"spd",children:WC.map(([N,B])=>v.jsx("button",{className:d===N?"on":"","data-s":N,type:"button",onClick:()=>{var P;return(P=c.current)==null?void 0:P.setSpeed(N)},children:B},N))}),v.jsx("span",{className:"sp"}),v.jsxs("div",{id:"swarm-stats",style:{fontSize:"11px",color:"var(--faint)",lineHeight:1.5},children:["Durchsatz, Lead Time und Auslastung: ",v.jsx("b",{children:"nicht vorhanden"})," — das Ledger misst sie nicht. Was gemessen ist: Agenten, Claims, Tasks und die Dateiereignisse unten."]}),v.jsx("div",{id:"swarm-verdict",style:{fontSize:"11px",color:"var(--faint)"},children:g.length===0?"Keine offenen Claims":`${g.length} offene Claims`})]}),v.jsx("div",{id:"tip",children:"Klicke auf einen Agenten in der Liste oder im Mesh, um Tasks, Claims und Chronik anzuzeigen"})]})}function YC({tasks:t,depth:e}){if(t.length===0)return v.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});t.filter(s=>s.state==="pending");const n=t.filter(s=>s.state==="claimed"),i=t.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return v.jsxs("div",{className:"queue",children:[v.jsxs("div",{className:"queue__figures",children:[v.jsx(Kc,{value:e,label:"WARTEND",tone:e>8?"hot":void 0}),v.jsx(Kc,{value:n.length,label:"IN ARBEIT"}),v.jsx(Kc,{value:i.length,label:"GELIEFERT"}),v.jsx(Kc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),v.jsx("ol",{className:"queue__list",children:t.map(s=>v.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[v.jsx("span",{className:"queue__state",children:ZC[s.state]??s.state}),v.jsx("span",{className:"queue__title",title:s.title,children:s.title}),v.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&v.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&v.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const ZC={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function Kc({value:t,label:e,tone:n}){return v.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[v.jsx("strong",{children:t}),v.jsx("span",{children:e})]})}function Or({workspaceId:t,path:e,highlightLine:n,onClose:i,onNavigateFile:a}){const[s,r]=de.useState(!0),[o,l]=de.useState(null),[c,d]=de.useState(null),[h,u]=de.useState(null),[p,g]=de.useState([]),E=de.useRef(null);if(de.useEffect(()=>{let S=!0;return r(!0),l(null),g([]),Promise.allSettled([_C(t,e),hC(t),pC(t,e),MC(t,e)]).then(([y,U,A,T])=>{var M;S&&(y.status==="fulfilled"?l(y.value):l({ok:!1,path:e,content:"",bytes:0,lang:null,error:String(((M=y.reason)==null?void 0:M.message)??y.reason)}),U.status==="fulfilled"&&d(U.value),A.status==="fulfilled"&&u(A.value),T.status==="fulfilled"&&g(T.value),r(!1))}),()=>{S=!1}},[t,e]),de.useEffect(()=>{!s&&E.current&&E.current.scrollIntoView({behavior:"smooth",block:"center"})},[s,n]),s)return v.jsxs("div",{className:"source-container source-container--loading",children:[v.jsx("div",{className:"source-spinner"}),v.jsxs("p",{children:["Lade Dateiinhalt aus dem Brain (",e,") …"]})]});if(!o||!o.ok)return v.jsxs("div",{className:"source-container source-container--error",role:"alert",children:[v.jsxs("div",{className:"source-header",children:[v.jsx("span",{className:"source-header__path mono",children:e}),i&&v.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Schließen",children:"✕"})]}),v.jsxs("div",{className:"source-error-box",children:[v.jsx("div",{className:"source-error-icon",children:"⚠️"}),v.jsx("h3",{children:"Fehler beim Laden der Datei"}),v.jsx("p",{className:"source-error-msg",children:(o==null?void 0:o.error)||"Die Datei existiert nicht im Workspace oder der Pfad ist ungültig."}),v.jsxs("div",{className:"source-error-details mono",children:["Workspace: ",t,v.jsx("br",{}),"Pfad: ",e]})]})]});const m=o.content.split(/\r?\n/),f=m.length,x=c!=null&&c.head?c.head.slice(0,8):null;return v.jsxs("div",{className:"source-container",children:[v.jsxs("div",{className:"source-header",children:[v.jsxs("div",{className:"source-header__meta",children:[v.jsx("span",{className:"source-header__icon",children:"📄"}),v.jsx("span",{className:"source-header__path mono",title:o.path,children:o.path}),o.lang&&v.jsx("span",{className:"source-badge source-badge--lang",children:o.lang}),v.jsxs("span",{className:"source-badge source-badge--info",children:[f," Zeilen · ",o.bytes," B"]}),x&&v.jsxs("span",{className:"source-badge source-badge--git",title:`Git Revision: ${c==null?void 0:c.head}`,children:["git: ",x," (",(c==null?void 0:c.branch)??"detached",")"]}),(h==null?void 0:h.owner)&&v.jsxs("span",{className:"source-badge source-badge--agent",style:{borderColor:h.owner.color},title:`Zuletzt geändert durch ${h.owner.name} (${h.owner.at})`,children:[v.jsx("i",{style:{background:h.owner.color}}),h.owner.name]})]}),v.jsxs("div",{className:"source-header__actions",children:[n&&v.jsxs("span",{className:"source-badge source-badge--highlight",children:["Fokus: Zeile ",n]}),i&&v.jsx("button",{type:"button",className:"source-close-btn",onClick:i,title:"Quellansicht schließen",children:"✕"})]})]}),v.jsxs("div",{className:"source-body",children:[v.jsx("div",{className:"source-code-view",children:v.jsx("table",{className:"source-table",children:v.jsx("tbody",{children:m.map((S,y)=>{const U=y+1,A=n===U;return v.jsxs("tr",{ref:A?E:void 0,className:`source-line-row ${A?"source-line-row--highlight":""}`,children:[v.jsx("td",{className:"source-line-num mono","data-line":U,children:U}),v.jsx("td",{className:"source-line-code mono",children:v.jsx("pre",{children:S||" "})})]},U)})})})}),p.length>0&&v.jsxs("div",{className:"source-backlinks",style:{padding:"12px 16px",borderTop:"1px solid var(--line)",background:"rgba(255,255,255,0.02)"},children:[v.jsxs("div",{style:{fontSize:"12px",fontWeight:600,color:"var(--accent)",marginBottom:"6px"},children:["← Rückverweise / Backlinks (",p.length,")"]}),v.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:p.map((S,y)=>v.jsxs("div",{className:"search-hit-card",style:{padding:"6px 10px",fontSize:"11px",cursor:"pointer"},onClick:()=>a==null?void 0:a(S.path,S.line),title:`Zeile ${S.line} in ${S.path}`,children:[v.jsx("span",{className:"mono",style:{color:"var(--accent)"},children:S.path}),v.jsxs("span",{style:{color:"var(--faint)",marginLeft:"6px"},children:[":",S.line]}),S.alias&&v.jsxs("span",{style:{marginLeft:"4px",fontStyle:"italic"},children:["(",S.alias,")"]})]},y))})]})]})]})}function KC(t){const e={name:"",path:"",isDir:!0,children:new Map};for(const n of t){const i=n.path.split(/[\\/]/).filter(Boolean);let a=e;for(let s=0;s<i.length;s++){const r=i[s];if(s===i.length-1)a.children.set(r,{name:r,path:n.path,isDir:!1,children:new Map,file:n});else{let l=a.children.get(r);l||(l={name:r,path:i.slice(0,s+1).join("/"),isDir:!0,children:new Map},a.children.set(r,l)),a=l}}}return e}function $C({workspaceName:t,files:e,activePath:n,onSelectFile:i}){const[a,s]=de.useState(""),[r,o]=de.useState(new Set),l=de.useMemo(()=>KC(e),[e]),c=h=>{o(u=>{const p=new Set(u);return p.has(h)?p.delete(h):p.add(h),p})},d=(h,u=0)=>{var g,E,m;if(h.isDir){const f=r.has(h.path),x=Array.from(h.children.values()).sort((y,U)=>y.isDir!==U.isDir?y.isDir?-1:1:y.name.localeCompare(U.name)),S=a?x.filter(y=>y.path.toLowerCase().includes(a.toLowerCase())):x;return a&&S.length===0&&!h.name.toLowerCase().includes(a.toLowerCase())?null:v.jsxs("div",{className:"tree-dir-group",children:[h.name&&v.jsxs("div",{className:`tree-item tree-item--dir ${u===0?"tree-item--root":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>c(h.path),children:[v.jsx("span",{className:"tree-icon",children:f?"📁":"📂"}),v.jsx("span",{className:"tree-label",children:h.name}),v.jsx("span",{className:"tree-badge tree-badge--count",children:h.children.size})]}),(!f||a)&&v.jsx("div",{className:"tree-dir-children",children:S.map(y=>d(y,h.name?u+1:u))})]},h.path||"root")}const p=n===h.path;return a&&!h.path.toLowerCase().includes(a.toLowerCase())?null:v.jsxs("div",{className:`tree-item tree-item--file ${p?"tree-item--active":""}`,style:{paddingLeft:`${u*14+10}px`},onClick:()=>i(h.path),title:h.path,children:[v.jsx("span",{className:"tree-icon",children:"📄"}),v.jsx("span",{className:"tree-label mono",children:h.name}),((g=h.file)==null?void 0:g.lang)&&v.jsx("span",{className:"tree-badge tree-badge--lang",children:h.file.lang}),((E=h.file)==null?void 0:E.loc)!==void 0&&v.jsxs("span",{className:"tree-badge tree-badge--loc",children:[h.file.loc," L"]}),((m=h.file)==null?void 0:m.agent)&&v.jsx("span",{className:"tree-agent-dot",style:{background:h.file.agent.color},title:`Owner: ${h.file.agent.name}`})]},h.path)};return v.jsxs("div",{className:"explorer-view",children:[v.jsxs("div",{className:"explorer-header",children:[v.jsxs("div",{className:"explorer-title",children:[v.jsx("span",{className:"explorer-title__icon",children:"🗂️"}),v.jsxs("strong",{children:[t||"Workspace"," Explorer"]})]}),v.jsx("div",{className:"explorer-stats",children:v.jsxs("span",{children:[e.length," Dateien aus Brain"]})})]}),v.jsxs("div",{className:"explorer-search",children:[v.jsx("input",{type:"text",placeholder:"Dateibaum filtern …",value:a,onChange:h=>s(h.target.value),className:"explorer-search__input"}),a&&v.jsx("button",{type:"button",className:"explorer-search__clear",onClick:()=>s(""),children:"✕"})]}),v.jsx("div",{className:"explorer-tree",children:e.length===0?v.jsx("div",{className:"explorer-empty",children:"Keine Dateien im Snapshot vorhanden."}):d(l)})]})}function QC({workspaceId:t,onSelectHit:e}){const[n,i]=de.useState(()=>{const T=new URLSearchParams(window.location.search).get("mode");return T==="notes"||T==="prose"?T:"code"}),[a,s]=de.useState(()=>new URLSearchParams(window.location.search).get("q")||""),[r,o]=de.useState([]),[l,c]=de.useState([]),[d,h]=de.useState([]),[u,p]=de.useState(0),[g,E]=de.useState(null),[m,f]=de.useState(!1),[x,S]=de.useState(""),[y,U]=de.useState(""),A=async(T,M,D)=>{T&&T.preventDefault();const L=D??n,z=(M??a).trim();if(!z)return;f(!0),S(""),E(null);const H=performance.now();try{if(L==="code"){const X=await vC(t,z);o(X),c([]),h([])}else if(L==="prose"){const X=await SC(t,z);h(X.hits||[]),p(X.total??0),o([]),c([])}else{const X=await yC(t,z);c(X.notes||[]),o([]),h([])}E(Math.round(performance.now()-H)),U(z)}catch(X){S((X==null?void 0:X.message)||`Fehler bei der Suche (${L})`),o([]),c([]),h([])}finally{f(!1)}};return de.useEffect(()=>{const T=new URLSearchParams(window.location.search).get("q");T&&t&&A(void 0,T,n)},[t]),v.jsxs("div",{className:"search-view",children:[v.jsxs("div",{className:"search-view__header",children:[v.jsxs("div",{className:"search-view__title",children:[v.jsx("span",{className:"search-view__icon",children:"🔍"}),v.jsx("strong",{children:n==="code"?"Agent Code- & Symbolsuche":n==="prose"?"Notiz-Volltextsuche":"Notizen- & Property-Abfrage"}),v.jsx("span",{className:"search-view__endpoint mono",children:n==="code"?"/api/agent/search":n==="prose"?"/api/notes/search":"/api/notes/query"})]}),v.jsxs("div",{style:{display:"flex",gap:"6px",marginTop:"8px"},children:[v.jsx("button",{type:"button",className:`tb ${n==="code"?"on":""}`,onClick:()=>{i("code"),a.trim()&&A(void 0,a,"code")},children:"Code & Symbole"}),v.jsx("button",{type:"button",className:`tb ${n==="notes"?"on":""}`,onClick:()=>{i("notes"),a.trim()||s("typ=gate UND stand=offen"),A(void 0,a.trim()||"typ=gate UND stand=offen","notes")},children:"Notizen & Properties (Bases)"}),v.jsx("button",{type:"button",className:`tb ${n==="prose"?"on":""}`,onClick:()=>{i("prose"),a.trim()||s("Gateway Owner"),A(void 0,a.trim()||"Gateway Owner","prose")},children:"Notiz-Volltext"})]})]}),v.jsx("form",{className:"search-form",onSubmit:A,style:{marginTop:"10px"},children:v.jsxs("div",{className:"search-input-group",children:[v.jsx("input",{type:"search",className:"search-input",placeholder:n==="code"?"Symbol, Variable, Klasse, Datei (z. B. authKey) …":n==="prose"?"Satz oder Stichwörter aus dem Notiztext (z. B. Gateway Owner) …":"Bases-Filter: typ=gate UND stand=offen oder typ=mission …",value:a,onChange:T=>s(T.target.value),autoFocus:!0}),v.jsx("button",{type:"submit",className:"search-submit-btn",disabled:m||!a.trim(),children:m?"Suche …":"Suchen"})]})}),x&&v.jsxs("div",{className:"search-error-alert",role:"alert",children:["⚠️ ",x]}),v.jsxs("div",{className:"search-results",children:[y&&v.jsxs("div",{className:"search-results-summary",children:[n==="code"?r.length===0?`Keine Code-Treffer für "${y}" im Brain-Index`:`${r.length} Treffer für "${y}":`:n==="prose"?d.length===0?`Kein Notiztext enthält "${y}"`:`${u} Notiz(en) im Text, ${d.length} angezeigt`:l.length===0?`Keine Notizen entsprechen dem Filter "${y}"`:`${l.length} Notiz(en) gefunden für "${y}":`,g!==null&&v.jsxs("span",{className:"search-results-time mono",style:{marginLeft:"8px",opacity:.7},children:[g," ms"]})]}),n==="code"?v.jsx("div",{className:"search-hits-list",children:r.map((T,M)=>v.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[v.jsxs("div",{className:"search-hit-card__head",children:[v.jsx("span",{className:"search-hit-name mono",children:T.name}),v.jsx("span",{className:`search-hit-kind search-hit-kind--${T.kind}`,children:T.kind}),T.line!==null&&v.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),v.jsxs("div",{className:"search-hit-path mono",title:T.path,children:["📄 ",T.path]})]},`${T.path}-${T.name}-${T.line??M}`))}):n==="prose"?v.jsx("div",{className:"search-hits-list",children:d.map(T=>v.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path,T.line),children:[v.jsxs("div",{className:"search-hit-card__head",children:[v.jsx("span",{className:"search-hit-name",children:T.title}),T.line!==null&&v.jsxs("span",{className:"search-hit-line mono",children:["Zeile ",T.line]})]}),T.snippet&&v.jsx("div",{className:"search-hit-snippet",children:T.snippet}),v.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]})]},`${T.path}-${T.line??0}`))}):v.jsx("div",{className:"search-hits-list",children:l.map(T=>v.jsxs("div",{className:"search-hit-card",onClick:()=>e(T.path),children:[v.jsxs("div",{className:"search-hit-card__head",children:[v.jsx("span",{className:"search-hit-name",children:T.title}),T.typ&&v.jsx("span",{className:"search-hit-kind search-hit-kind--class",children:T.typ}),T.stand&&v.jsx("span",{className:"source-badge",style:{fontSize:"11px",marginLeft:"6px"},children:T.stand})]}),v.jsxs("div",{className:"search-hit-path mono",title:T.path,style:{marginTop:"4px"},children:["📝 ",T.path]}),(T.inLinks!==void 0||T.outLinks!==void 0)&&v.jsxs("div",{style:{fontSize:"11px",color:"var(--faint)",marginTop:"4px"},children:["Verlinkungen: → ",T.outLinks??0," ausgehend · ← ",T.inLinks??0," Rückverweise"]})]},T.path))})]})]})}function JC(t){const e=[],n=t.split(`
`);for(const i of n){const a=i.match(/^-\s*`([^`]+)`\s*—\s*(.*)$/);a&&e.push({path:a[1],reasons:a[2]})}return e}function e3({workspaceId:t,onSelectSource:e}){const[n,i]=de.useState(()=>new URLSearchParams(window.location.search).get("goal")||"authKey security tests"),[a,s]=de.useState(!1),[r,o]=de.useState(""),[l,c]=de.useState(null),[d,h]=de.useState(null),[u,p]=de.useState(!1),[g,E]=de.useState(!1);de.useEffect(()=>{const S=new URLSearchParams(window.location.search).get("goal");S&&t&&(s(!0),qv(t,S).then(y=>{c(y),y.id&&f(y.id)}).catch(y=>o((y==null?void 0:y.message)||"Fehler beim Erzeugen")).finally(()=>s(!1)))},[t]);const m=async S=>{S&&S.preventDefault();const y=n.trim();if(y){s(!0),o(""),c(null),h(null);try{const U=await qv(t,y);c(U),U.id&&f(U.id)}catch(U){o((U==null?void 0:U.message)||"Fehler beim Erzeugen des Context Packs")}finally{s(!1)}}},f=async S=>{p(!0);try{const y=await xC(S);h(y)}catch(y){console.error("Staleness check error:",y)}finally{p(!1)}},x=l!=null&&l.body?JC(l.body):[];return v.jsxs("div",{className:"pack-view",children:[v.jsx("div",{className:"pack-view__header",children:v.jsxs("div",{className:"pack-view__title",children:[v.jsx("span",{className:"pack-view__icon",children:"📦"}),v.jsx("strong",{children:"Context-Pack-Inspector"}),v.jsx("span",{className:"pack-view__endpoint mono",children:"/api/context/pack"})]})}),v.jsx("form",{className:"pack-form",onSubmit:m,children:v.jsxs("div",{className:"pack-form__field",children:[v.jsx("label",{htmlFor:"pack-goal-input",children:"Aufgabe / Ziel für den Agenten:"}),v.jsxs("div",{className:"pack-input-row",children:[v.jsx("input",{id:"pack-goal-input",type:"text",className:"pack-input",value:n,onChange:S=>i(S.target.value),placeholder:"z. B. authKey security tests"}),v.jsx("button",{type:"submit",className:"pack-create-btn",disabled:a||!n.trim(),children:a?"Erzeuge …":"Pack erzeugen"})]})]})}),r&&v.jsxs("div",{className:"pack-error-alert",role:"alert",children:["⚠️ ",r]}),l&&v.jsx("div",{className:"pack-details",children:v.jsxs("div",{className:"pack-card",children:[v.jsxs("div",{className:"pack-card__header",children:[v.jsxs("div",{className:"pack-card__meta",children:[v.jsx("span",{className:"pack-id mono",children:l.id}),v.jsxs("span",{className:"pack-badge pack-badge--version",children:["v",l.version]}),v.jsxs("span",{className:"pack-badge pack-badge--sources",children:[l.sources," Quellen"]})]}),v.jsxs("div",{className:"pack-card__staleness",children:[u?v.jsx("span",{className:"pack-staleness-badge pack-staleness-badge--loading",children:"Prüfe …"}):d?v.jsx("span",{className:`pack-staleness-badge ${d.stale?"pack-staleness-badge--stale":"pack-staleness-badge--fresh"}`,children:d.stale?"🔴 Veraltet":"🟢 Frisch"}):null,v.jsx("button",{type:"button",className:"pack-staleness-btn",onClick:()=>f(l.id),disabled:u,title:"Staleness gegen aktuellen Brain-Index prüfen",children:"Neu prüfen"})]})]}),d&&d.stale&&v.jsxs("div",{className:"pack-stale-warning",children:[v.jsx("strong",{children:"Quellen haben sich geändert:"}),d.changed.length>0&&v.jsxs("div",{children:["Geändert: ",d.changed.join(", ")]}),d.missing.length>0&&v.jsxs("div",{children:["Fehlt: ",d.missing.join(", ")]})]}),v.jsxs("div",{className:"pack-sources-section",children:[v.jsx("h4",{children:"Extrahierte Quellen aus dem Index:"}),x.length===0?v.jsx("div",{className:"pack-sources-empty",children:"Keine spezifischen Quelltreffer für dieses Ziel gefunden."}):v.jsx("div",{className:"pack-sources-list",children:x.map(S=>v.jsxs("div",{className:"pack-source-item",onClick:()=>e(S.path),title:`Klicken, um ${S.path} in Quellansicht zu öffnen`,children:[v.jsxs("div",{className:"pack-source-path mono",children:["📄 ",S.path]}),v.jsx("div",{className:"pack-source-why",children:S.reasons})]},S.path))})]}),v.jsx("div",{className:"pack-body-toggle",children:v.jsx("button",{type:"button",className:"pack-toggle-raw-btn",onClick:()=>E(S=>!S),children:g?"Markdown-Text verbergen":"Vollständigen Pack-Markdown anzeigen"})}),g&&v.jsx("div",{className:"pack-raw-markdown mono",children:v.jsx("pre",{children:l.body})})]})})]})}const WS=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"explorer",label:"Explorer",hint:"Echter Quellbaum aus dem Brain"},{id:"search",label:"Suche",hint:"Code- & Symbolsuche über /api/agent/search"},{id:"packs",label:"Packs",hint:"Context-Pack-Inspector"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Agenten und Zustände aus dem PlugBoard-Ledger"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],Kd=aC,t3=2e3;function n3(){const t=new URLSearchParams(location.search).get("view"),e=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=t||e;return WS.some(i=>i.id===n)?n:"atlas"}function i3(){const t=new URLSearchParams(location.search).get("workspace");return t||sC()}function a3(){var Oe,k,lt;const[t,e]=de.useState(null),[n,i]=de.useState([]),[a,s]=de.useState({depth:0,tasks:[]}),[r,o]=de.useState(!0),[l,c]=de.useState(""),[d,h]=de.useState(0),[u,p]=de.useState(n3),[g,E]=de.useState(i3),[m,f]=de.useState([]),[x,S]=de.useState(!1),[y,U]=de.useState(""),[A,T]=de.useState(!1),[M,D]=de.useState(""),[L,z]=de.useState(""),[H,X]=de.useState(""),[N,B]=de.useState(null),[P,F]=de.useState(null),[I,j]=de.useState(!1),[me,Ae]=de.useState([]),[Ee,Qe]=de.useState(()=>{const ee=new URLSearchParams(location.search).get("file"),b=Number(new URLSearchParams(location.search).get("line"));return ee?{path:ee,line:Number.isFinite(b)?b:null}:null}),[Je,et]=de.useState(!1),[pe,Re]=de.useState(GS()),[ue,Be]=de.useState(zo());de.useEffect(()=>{try{localStorage.setItem("plugbrain.view",u)}catch{}},[u]);const Ge=de.useRef(null);de.useEffect(()=>{Ge.current=P},[P]);const Xe=ee=>{E(ee),rC(ee);const b=new URL(location.href);ee?b.searchParams.set("workspace",ee):b.searchParams.delete("workspace"),history.replaceState(null,"",b.toString())};de.useEffect(()=>{if(!g)return;let ee=!0;return fetch(`/api/graph?workspace=${encodeURIComponent(g)}&limit=5000`).then(b=>b.json()).then(b=>{if(!ee||!(b!=null&&b.nodes))return;const _=b.nodes.filter(G=>{var Y;return G.type==="file"&&(G.path||((Y=G.properties)==null?void 0:Y.path))}).map(G=>{var Y,J,_e,we;return{id:G.id,path:G.path||((Y=G.properties)==null?void 0:Y.path),label:G.label||G.path,lang:G.lang||((J=G.properties)==null?void 0:J.lang),loc:G.loc??((_e=G.properties)==null?void 0:_e.lines)??0,agent:G.agent||((we=G.properties)!=null&&we.agentId?{id:G.properties.agentId,name:G.properties.agentName,color:G.properties.agentColor}:null)}});Ae(_)}).catch(()=>{}),()=>{ee=!1}},[g,d]),de.useEffect(()=>{let ee=!0;return Wv().then(b=>{if(ee&&(f(b),!g&&b.length>0)){const _=[...b].sort((G,Y)=>(Y.indexedAt??"").localeCompare(G.indexedAt??""))[0];_&&Xe(_.id)}}).catch(()=>{ee&&D("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{ee=!1}},[]);const wt=async ee=>{ee.preventDefault();const b=y.trim();if(b!==""){T(!0),D(""),z(""),X("Vault registriert — Indexlauf wird vorbereitet …");try{const _=await oC(b,void 0,G=>X(Zd(G)));Wv().then(G=>{G.length>0&&f(G)}).catch(()=>{}),z("Vault registriert und indiziert."),U(""),S(!1),Xe(_),h(G=>G+1)}catch(_){D(_ instanceof Error?_.message:String(_))}finally{T(!1),X("")}}},it=async()=>{if(!(!g||A)){T(!0),D(""),z(""),X("Indexlauf wird vorbereitet …");try{const ee=await HS(g,b=>X(Zd(b)));z(`Neu indiziert: ${(ee==null?void 0:ee.files)??0} Dateien, ${(ee==null?void 0:ee.symbols)??0} Symbole, ${(ee==null?void 0:ee.edges)??0} Kanten.`),h(b=>b+1)}catch(ee){D(ee instanceof Error?ee.message:String(ee))}finally{T(!1),X("")}}};de.useEffect(()=>{if(!g)return;let ee=!0,b;const _=async()=>{try{const G=await fetch(`/api/index/progress?workspace=${encodeURIComponent(g)}`);if(G.ok){const Y=await G.json();if(!ee)return;Y!=null&&Y.running?X(Zd(Y)):X(J=>J.startsWith("Indexiert:")?"":J)}}catch{}ee&&(b=setTimeout(()=>void _(),1500))};return _(),()=>{ee=!1,clearTimeout(b)}},[g]);const Rt=ee=>{ee.preventDefault(),fC(pe.trim()),dC(ue.trim()),gC(),h(b=>b+1),et(!1)},gt=v.jsxs("form",{className:"brain-vault",onSubmit:wt,children:[v.jsxs("div",{className:"brain-vault__row",children:[v.jsx("input",{className:"brain-vault__path",value:y,onChange:ee=>U(ee.target.value),placeholder:"Pfad eines Ordners, z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),v.jsx("button",{type:"submit",className:"brain-vault__open",disabled:A||y.trim()==="",children:A?"Indiziere …":"Als Vault öffnen"})]}),g&&v.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:v.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:A,onClick:()=>void it(),children:A?"läuft …":"Neu indizieren"})}),H&&v.jsx("p",{className:"brain-vault__progress",role:"status","aria-live":"polite",children:H}),M&&v.jsx("p",{className:"brain-vault__error",role:"alert",children:M}),L&&v.jsx("p",{className:"brain-vault__done",role:"status",children:L})]});de.useEffect(()=>{const ee=g||void 0;fetch("/api/timeline"+(ee?"?workspace="+encodeURIComponent(ee):"")).then(b=>b.json()).then(b=>{var _;(_=b==null?void 0:b.bounds)!=null&&_.first&&B(b.bounds)}).catch(()=>{})},[g]),de.useEffect(()=>{if(!I||!N)return;const ee=new Date(N.first).getTime(),b=new Date(N.last).getTime(),_=Math.max(1,b-ee);let G=P?Math.round((new Date(P).getTime()-ee)/_*60):0;const Y=setInterval(()=>{if(G+=1,G>=60){F(null),j(!1);return}F(new Date(ee+_*G/60).toISOString())},220);return()=>clearInterval(Y)},[I,N]),de.useEffect(()=>{const ee=new AbortController;let b,_="",G="";const Y=g||void 0;async function J(){var _e,we,oe;try{const K=new URLSearchParams;Y&&K.set("workspace",Y),K.set("limit",String(t3)),Ge.current&&K.set("until",Ge.current);const re=await fetch("/api/atlas/snapshot"+(K.toString()?`?${K}`:""),{signal:ee.signal});if(!re.ok)throw new Error(`Brain-Verbindung: HTTP ${re.status}`);const ge=await re.json();if(!((_e=ge.workspace)!=null&&_e.canonicalPath)||!Array.isArray((we=ge.graph)==null?void 0:we.nodes)||!Array.isArray((oe=ge.graph)==null?void 0:oe.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const xe=`${ge.workspace.id}:${ge.updatedAt??""}:${ge.graph.nodes.length}:${ge.graph.edges.length}`;xe!==_&&(e(ge),_=xe),c("")}catch(K){ee.signal.aborted||c(K instanceof Error?K.message:String(K))}try{const K=await fetch("/api/agents"+(Y?"?workspace="+encodeURIComponent(Y):""),{signal:ee.signal});if(!K.ok)throw new Error(String(K.status));const re=await K.json(),xe=(Array.isArray(re==null?void 0:re.agents)?re.agents:[]).map(Fe=>({id:Fe.id,title:Fe.name,assignedAgentId:Fe.name,status:Fe.filesTouched>0?"RUNNING":Fe.actions>0?"REVIEW":"PLANNED"})),be=JSON.stringify(xe);be!==G&&(i(xe),G=be),o(!0)}catch{ee.signal.aborted||o(!1)}try{const K=await fetch("/api/queue"+(Y?"?workspace="+encodeURIComponent(Y):""),{signal:ee.signal});if(K.ok){const re=await K.json();(re==null?void 0:re.ok)===!0&&Array.isArray(re.tasks)&&s({depth:Number(re.depth??0),tasks:re.tasks})}}catch{}ee.signal.aborted||(b=setTimeout(J,3e3))}return J(),()=>{ee.abort(),clearTimeout(b)}},[d,P,g]);const dt=(t==null?void 0:t.graph.nodes.length)??me.length,Ot=(t==null?void 0:t.graph.edges.length)??0,ut=t!=null&&t.coverage?!t.coverage.indexComplete:!1,Yt=l?"getrennt (offline)":t||me.length>0?ut?`${((Oe=t==null?void 0:t.coverage)==null?void 0:Oe.staleFiles)??0} Datei(en) warten auf den Index`:"live":"lädt …",Qt=de.useMemo(()=>{var ee;return me.length>0?me:(ee=t==null?void 0:t.graph)!=null&&ee.nodes?t.graph.nodes.filter(b=>{var _;return b.type==="file"&&(((_=b.properties)==null?void 0:_.path)||b.path)}).map(b=>{var G,Y,J,_e;const _=((G=b.properties)==null?void 0:G.path)||b.path||"";return{id:b.id,path:_,label:b.label||b.name||_,lang:((Y=b.properties)==null?void 0:Y.lang)??b.lang??null,loc:((J=b.properties)==null?void 0:J.lines)??b.loc??0,agent:(_e=b.properties)!=null&&_e.agentId?{id:b.properties.agentId,name:b.properties.agentName||b.properties.agentId,color:b.properties.agentColor||"#60a5fa"}:null}}):[]},[me,t]),tt=(ee,b)=>{ee&&Qe({path:ee,line:b})};return v.jsxs(v.Fragment,{children:[l&&v.jsx("div",{className:"brain-offline-banner",role:"alert",children:v.jsxs("div",{className:"brain-offline-banner__inner",children:[v.jsx("span",{className:"brain-offline-badge",children:"OFFLINE"}),v.jsxs("span",{className:"brain-offline-text",children:[v.jsx("strong",{children:"Server nicht erreichbar:"})," ",l," — läuft ",v.jsx("code",{children:"plugbrain serve"}),"?"]}),v.jsx("button",{type:"button",className:"brain-offline-btn",onClick:()=>h(ee=>ee+1),children:"Erneut verbinden"})]})}),v.jsxs("div",{className:"live-status",role:"status",children:[v.jsx("strong",{className:"live-status__name",title:(t==null?void 0:t.workspace.canonicalPath)??"",children:t?Kd(t.workspace.name):((k=m.find(ee=>ee.id===g))==null?void 0:k.name)||"PlugBrain"}),g&&m.length>0&&v.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:v.jsx("select",{value:g,onChange:ee=>{const b=ee.target.value;b&&Xe(b)},children:m.map(ee=>v.jsx("option",{value:ee.id,children:Kd(ee.name)},ee.id))})}),g&&v.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{S(ee=>!ee),D(""),z("")},title:"Einen Ordner als neuen Vault öffnen",children:x?"Schließen":"Vault öffnen"}),v.jsxs("span",{className:"live-status__figures",children:[v.jsx("b",{children:dt})," Objekte ",v.jsx("b",{children:Ot})," Kanten",(t==null?void 0:t.coverage)&&t.coverage.totalFiles>t.coverage.shownFiles&&v.jsxs("span",{className:"live-status__sample",title:`Ausschnitt: ${t.coverage.shownFiles} von ${t.coverage.totalFiles} Dateien des Index`,children:[" ","· Ausschnitt aus ",t.coverage.totalFiles," Dateien"]})]}),v.jsx("span",{className:l?"live-status__state is-bad":"live-status__state",children:Yt}),v.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:WS.map(ee=>v.jsx("button",{type:"button",title:ee.hint,className:ee.id===u?"on":void 0,"aria-pressed":ee.id===u,onClick:()=>{p(ee.id)},children:ee.label},ee.id))}),v.jsx("button",{type:"button",className:"brain-auth-btn",onClick:()=>et(!0),title:"Auth-Token konfigurieren",children:"🔑 Auth"}),l&&v.jsx("button",{type:"button",onClick:()=>h(ee=>ee+1),children:"Erneut verbinden"})]}),Je&&v.jsx("div",{className:"brain-modal-backdrop",onClick:()=>et(!1),children:v.jsxs("div",{className:"brain-modal",onClick:ee=>ee.stopPropagation(),children:[v.jsxs("div",{className:"brain-modal__header",children:[v.jsx("h3",{children:"PlugBrain Authentifizierung"}),v.jsx("button",{type:"button",className:"brain-modal__close",onClick:()=>et(!1),children:"✕"})]}),v.jsxs("form",{onSubmit:Rt,children:[v.jsxs("div",{className:"brain-modal__field",children:[v.jsxs("label",{children:["Bearer Token (aus ",v.jsx("code",{children:"auth.token"}),"):"]}),v.jsx("input",{type:"text",className:"brain-modal__input mono",value:pe,onChange:ee=>Re(ee.target.value),placeholder:"plug-..."})]}),v.jsxs("div",{className:"brain-modal__field",children:[v.jsx("label",{children:"Agent ID:"}),v.jsx("input",{type:"text",className:"brain-modal__input mono",value:ue,onChange:ee=>Be(ee.target.value),placeholder:"agy"})]}),v.jsxs("div",{className:"brain-modal__actions",children:[v.jsx("button",{type:"button",onClick:()=>et(!1),children:"Abbrechen"}),v.jsx("button",{type:"submit",className:"primary",children:"Speichern"})]})]})]})}),N&&(u==="atlas"||u==="city"||u==="mesh")&&v.jsxs("div",{className:"brain-timelapse",children:[v.jsx("button",{type:"button",onClick:()=>j(ee=>!ee),title:"Wachstum abspielen",children:I?"❚❚":"▶"}),v.jsx("input",{type:"range",min:0,max:60,step:1,value:P&&N?Math.round((new Date(P).getTime()-new Date(N.first).getTime())/Math.max(1,new Date(N.last).getTime()-new Date(N.first).getTime())*60):60,onChange:ee=>{j(!1);const b=Number(ee.target.value);if(b>=60){F(null);return}const _=new Date(N.first).getTime(),G=new Date(N.last).getTime();F(new Date(_+(G-_)*b/60).toISOString())}}),v.jsx("span",{children:P?new Date(P).toLocaleTimeString():"jetzt"})]}),x&&g&&gt,g?v.jsxs("div",{className:"brain-workspace-layout",children:[u==="atlas"&&(t&&dt>0?v.jsxs("div",{className:"atlas-wrapper",children:[v.jsx(r3,{graph:t.graph,onOpenSource:tt}),Ee&&v.jsx("div",{className:"atlas-source-overlay",children:v.jsx(Or,{workspaceId:g,path:Ee.path,highlightLine:Ee.line,onClose:()=>Qe(null)})})]}):v.jsx("div",{className:"brain-empty",children:l?v.jsxs("div",{className:"brain-empty--offline-box",children:[v.jsx("div",{className:"offline-icon",children:"🔌"}),v.jsx("h3",{children:"Server getrennt (Offline-Zustand)"}),v.jsx("p",{children:"Die Verbindung zu PlugBrain wurde unterbrochen oder der Server ist gestoppt."}),v.jsx("button",{type:"button",className:"btn primary",onClick:()=>h(ee=>ee+1),children:"Erneut verbinden"})]}):t?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …"})),u==="explorer"&&v.jsxs("div",{className:"workbench-split",children:[v.jsx("div",{className:"workbench-pane workbench-pane--side",children:v.jsx($C,{workspaceName:(t==null?void 0:t.workspace.name)??(((lt=m.find(ee=>ee.id===g))==null?void 0:lt.name)||"Workspace"),files:Qt,activePath:Ee==null?void 0:Ee.path,onSelectFile:ee=>tt(ee)})}),v.jsx("div",{className:"workbench-pane workbench-pane--main",children:Ee?v.jsx(Or,{workspaceId:g,path:Ee.path,highlightLine:Ee.line,onClose:()=>Qe(null)}):v.jsxs("div",{className:"source-placeholder",children:[v.jsx("div",{className:"source-placeholder__icon",children:"📂"}),v.jsx("h3",{children:"Datei im Explorer auswählen"}),v.jsx("p",{children:"Wähle eine Datei im linken Baum, um den echten Inhalt mit Zeilennummern und Revision anzuzeigen."})]})})]}),u==="search"&&v.jsxs("div",{className:"workbench-split",children:[v.jsx("div",{className:"workbench-pane workbench-pane--side",children:v.jsx(QC,{workspaceId:g,onSelectHit:(ee,b)=>tt(ee,b)})}),v.jsx("div",{className:"workbench-pane workbench-pane--main",children:Ee?v.jsx(Or,{workspaceId:g,path:Ee.path,highlightLine:Ee.line,onClose:()=>Qe(null)}):v.jsxs("div",{className:"source-placeholder",children:[v.jsx("div",{className:"source-placeholder__icon",children:"🔍"}),v.jsxs("h3",{children:["Code- und Symbolsuche über ",v.jsx("code",{children:"/api/agent/search"})]}),v.jsxs("p",{children:["Gib einen Suchbegriff ein (z. B. ",v.jsx("code",{children:"authKey"}),"). Ein Klick auf einen Treffer öffnet direkt die Quelle."]})]})})]}),u==="packs"&&v.jsxs("div",{className:"workbench-split",children:[v.jsx("div",{className:"workbench-pane workbench-pane--side",children:v.jsx(e3,{workspaceId:g,onSelectSource:ee=>tt(ee)})}),v.jsx("div",{className:"workbench-pane workbench-pane--main",children:Ee?v.jsx(Or,{workspaceId:g,path:Ee.path,highlightLine:Ee.line,onClose:()=>Qe(null)}):v.jsxs("div",{className:"source-placeholder",children:[v.jsx("div",{className:"source-placeholder__icon",children:"📦"}),v.jsx("h3",{children:"Context-Pack-Inspector"}),v.jsx("p",{children:"Erzeuge einen Context Pack für eine Aufgabe. Klicke auf eine extrahierte Quelle, um ihren Inhalt zu prüfen."})]})})]}),u==="city"&&v.jsxs("div",{className:"brain-view brain-view-city",children:[v.jsx(HC,{snapshot:t,onSelectFile:tt}),Ee&&v.jsx("div",{className:"atlas-source-overlay",children:v.jsx(Or,{workspaceId:g,path:Ee.path,highlightLine:Ee.line,onClose:()=>Qe(null),onNavigateFile:(ee,b)=>tt(ee,b)})})]}),u==="queue"&&v.jsx("div",{className:"brain-view brain-view-queue",children:v.jsx(YC,{tasks:a.tasks,depth:a.depth})}),u==="mesh"&&v.jsxs("div",{className:"brain-view brain-view-mesh",children:[v.jsx(qC,{tasks:n,workspaceId:g,onSelectFile:tt}),Ee&&v.jsx("div",{className:"atlas-source-overlay",children:v.jsx(Or,{workspaceId:g,path:Ee.path,highlightLine:Ee.line,onClose:()=>Qe(null),onNavigateFile:(ee,b)=>tt(ee,b)})})]})]}):v.jsxs("div",{className:"brain-landing",role:"main",children:[v.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),v.jsx("p",{className:"brain-landing__lead",children:"Ein Ordner als Vault öffnen — der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."}),gt,m.length>0&&v.jsxs("div",{className:"brain-vault__known",children:[v.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),m.map(ee=>v.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>Xe(ee.id),children:[Kd(ee.name)," ",v.jsx("em",{title:ee.root,children:ee.indexedAt?"indiziert":"nicht indiziert"})]},ee.id))]})]})]})}function s3(t,e){if(!e)return t;const n=new RegExp(`(${e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return t.split(n).map((i,a)=>a%2?v.jsx("mark",{children:i},a):i)}function r3({graph:t,onOpenSource:e}){const{CLUSTERS:n,nodes:i,edges:a,createAtlas:s}=de.useMemo(()=>iC(t),[t]),r=Object.fromEntries(n.map(I=>[I.id,i.filter(j=>j.cid===I.id).length])),o=de.useRef(null),l=de.useRef(null),c=de.useRef(null),d=de.useRef(null),h=de.useRef(null),u=de.useRef(null),p=de.useRef(null),g=de.useRef(null),E=de.useRef(null),m=de.useRef(null),f=de.useRef(null),x=de.useRef(null),S=de.useRef(null),[y,U]=de.useState(!1),[A,T]=de.useState({q:"",rows:[]}),[M,D]=de.useState({flow:!0,label:!0,spin:!1}),[L,z]=de.useState("atlas"),[H,X]=de.useState("dark"),[N,B]=de.useState([]),P=I=>{I!=null&&I.path&&e(I.path,I.line??null)};de.useEffect(()=>{const I=s({els:{stage:o.current,labels:l.current,hudMode:c.current,hudSel:d.current,pathbar:h.current,chain:u.current,zlvl:p.current,sNode:g.current,sEdge:E.current,sDeg:m.current,sFps:f.current,q:x.current},emit:{gate:U,list:T,drawer:P,tools:D,theme:X}});return S.current=I,()=>{I.dispose(),S.current=null}},[s]);const F=I=>{var j;B(me=>me.includes(I)?me.filter(Ae=>Ae!==I):[...me,I]),(j=S.current)==null||j.toggleCluster(I)};return v.jsxs("div",{id:"app",children:[v.jsxs("aside",{children:[v.jsxs("div",{className:"brand",children:[v.jsxs("h1",{children:[v.jsx("span",{className:"dot"}),"PlugBrain"]}),v.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",v.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),v.jsxs("div",{className:"searchbox",children:[v.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[v.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),v.jsx("path",{d:"M10.5 10.5 14 14"})]}),v.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol im Graph suchen…",autoComplete:"off",spellCheck:!1,ref:x,onChange:I=>{var j;return(j=S.current)==null?void 0:j.setQuery(I.target.value)}})]}),v.jsx("div",{className:"legend",id:"legend",children:n.map(I=>v.jsxs("button",{className:"cl"+(N.includes(I.id)?" off":""),type:"button",onClick:()=>F(I.id),children:[v.jsx("i",{style:{background:I.color}}),I.name,v.jsx("b",{children:r[I.id]})]},I.id))}),v.jsx("div",{className:"listwrap",id:"list",children:A.rows.length?A.rows.map(I=>v.jsxs("div",{className:"lrow"+(I.on?" on":""),"data-i":I.i,onClick:()=>{var me,Ae;(me=S.current)==null||me.selectAt(I.i);const j=i[I.i];(Ae=j==null?void 0:j.meta)!=null&&Ae.path&&e(j.meta.path,j.meta.line)},onMouseOver:()=>{var j;return(j=S.current)==null?void 0:j.hoverAt(I.i)},onMouseLeave:()=>{var j;return(j=S.current)==null?void 0:j.hoverAt(null)},children:[v.jsx("i",{style:{background:I.color}}),v.jsx("span",{children:s3(I.name,A.q)}),v.jsx("b",{children:I.deg})]},I.i)):v.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),v.jsxs("div",{className:"foot",children:[v.jsxs("div",{children:[v.jsx("div",{className:"k",id:"s-node",ref:g,children:"—"}),v.jsx("div",{className:"l",children:"Objekte"})]}),v.jsxs("div",{children:[v.jsx("div",{className:"k",id:"s-edge",ref:E,children:"—"}),v.jsx("div",{className:"l",children:"Kanten"})]}),v.jsxs("div",{children:[v.jsx("div",{className:"k",id:"s-deg",ref:m,children:"—"}),v.jsx("div",{className:"l",children:"Ø-Grad"})]}),v.jsxs("div",{children:[v.jsx("div",{className:"k",id:"s-fps",ref:f,children:"—"}),v.jsx("div",{className:"l",children:"FPS"})]})]})]}),v.jsxs("div",{id:"stage",ref:o,children:[v.jsx("div",{id:"labels",ref:l}),v.jsxs("div",{id:"hud",children:[v.jsx("div",{children:v.jsx("b",{id:"hud-mode",ref:c,children:"GALAXIE · FREIER ORBIT"})}),v.jsx("div",{id:"hud-sel",ref:d,children:"Knoten anklicken, um Quelle direkt zu öffnen"}),v.jsxs("div",{id:"hud-sys",children:[i.length," VON ",t.nodes.length," OBJEKTEN · ",a.length," VON ",t.edges.length," KANTEN"]})]}),v.jsxs("div",{id:"pathbar",ref:h,children:[v.jsx("span",{className:"chain",id:"chain",ref:u}),v.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.clearPath()},children:"✕"})]}),v.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([I,j])=>v.jsx("button",{className:"tb"+(L===I?" on":""),"data-view":I,type:"button",onClick:()=>{var me;z(I),(me=S.current)==null||me.setView(I)},children:j},I)),v.jsx("span",{className:"sep"}),v.jsx("button",{className:"tb"+(M.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleFlow()},children:"Signalfluss"}),v.jsx("button",{className:"tb"+(M.label?" on":""),id:"t-label",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleLabel()},children:"Labels"}),v.jsx("button",{className:"tb"+(M.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleSpin()},children:"Auto-Orbit"}),v.jsx("span",{className:"sep"}),v.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var I;return(I=S.current)==null?void 0:I.dolly(1.18)},children:"−"}),v.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:p,onClick:()=>{var I;return(I=S.current)==null?void 0:I.zoomReset()},children:"100%"}),v.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var I;return(I=S.current)==null?void 0:I.dolly(1/1.18)},children:"＋"}),v.jsx("span",{className:"sep"}),v.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var I;return(I=S.current)==null?void 0:I.toggleTheme()},children:H==="light"?"Nacht":"Tag"}),v.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var I;return(I=S.current)==null?void 0:I.reset()},children:"Reset"})]}),v.jsx("div",{id:"hint",children:"Klick auf einen Graphknoten öffnet sofort die Quellansicht · Ziehen rotiert · Scrollen zoomt"}),v.jsxs("div",{id:"gate",style:y?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",v.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]})]})}kE.createRoot(document.getElementById("root")).render(v.jsx(de.StrictMode,{children:v.jsx(a3,{})}));

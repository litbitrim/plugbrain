(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))i(a);new MutationObserver(a=>{for(const s of a)if(s.type==="childList")for(const r of s.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&i(r)}).observe(document,{childList:!0,subtree:!0});function n(a){const s={};return a.integrity&&(s.integrity=a.integrity),a.referrerPolicy&&(s.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?s.credentials="include":a.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(a){if(a.ep)return;a.ep=!0;const s=n(a);fetch(a.href,s)}})();var kv={exports:{}},nf={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zS=Symbol.for("react.transitional.element"),IS=Symbol.for("react.fragment");function Xv(e,t,n){var i=null;if(n!==void 0&&(i=""+n),t.key!==void 0&&(i=""+t.key),"key"in t){n={};for(var a in t)a!=="key"&&(n[a]=t[a])}else n=t;return t=n.ref,{$$typeof:zS,type:e,key:i,ref:t!==void 0?t:null,props:n}}nf.Fragment=IS;nf.jsx=Xv;nf.jsxs=Xv;kv.exports=nf;var L=kv.exports,Wv={exports:{}},me={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var zp=Symbol.for("react.transitional.element"),BS=Symbol.for("react.portal"),FS=Symbol.for("react.fragment"),HS=Symbol.for("react.strict_mode"),GS=Symbol.for("react.profiler"),VS=Symbol.for("react.consumer"),kS=Symbol.for("react.context"),XS=Symbol.for("react.forward_ref"),WS=Symbol.for("react.suspense"),qS=Symbol.for("react.memo"),qv=Symbol.for("react.lazy"),YS=Symbol.for("react.activity"),ag=Symbol.iterator;function jS(e){return e===null||typeof e!="object"?null:(e=ag&&e[ag]||e["@@iterator"],typeof e=="function"?e:null)}var Yv={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},jv=Object.assign,Zv={};function bo(e,t,n){this.props=e,this.context=t,this.refs=Zv,this.updater=n||Yv}bo.prototype.isReactComponent={};bo.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};bo.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Kv(){}Kv.prototype=bo.prototype;function Ip(e,t,n){this.props=e,this.context=t,this.refs=Zv,this.updater=n||Yv}var Bp=Ip.prototype=new Kv;Bp.constructor=Ip;jv(Bp,bo.prototype);Bp.isPureReactComponent=!0;var sg=Array.isArray;function qd(){}var rn={H:null,A:null,T:null,S:null},Qv=Object.prototype.hasOwnProperty;function Fp(e,t,n){var i=n.ref;return{$$typeof:zp,type:e,key:t,ref:i!==void 0?i:null,props:n}}function ZS(e,t){return Fp(e.type,t,e.props)}function Hp(e){return typeof e=="object"&&e!==null&&e.$$typeof===zp}function KS(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var rg=/\/+/g;function Cf(e,t){return typeof e=="object"&&e!==null&&e.key!=null?KS(""+e.key):t.toString(36)}function QS(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(qd,qd):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function Lr(e,t,n,i,a){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var r=!1;if(e===null)r=!0;else switch(s){case"bigint":case"string":case"number":r=!0;break;case"object":switch(e.$$typeof){case zp:case BS:r=!0;break;case qv:return r=e._init,Lr(r(e._payload),t,n,i,a)}}if(r)return a=a(e),r=i===""?"."+Cf(e,0):i,sg(a)?(n="",r!=null&&(n=r.replace(rg,"$&/")+"/"),Lr(a,t,n,"",function(c){return c})):a!=null&&(Hp(a)&&(a=ZS(a,n+(a.key==null||e&&e.key===a.key?"":(""+a.key).replace(rg,"$&/")+"/")+r)),t.push(a)),1;r=0;var o=i===""?".":i+":";if(sg(e))for(var l=0;l<e.length;l++)i=e[l],s=o+Cf(i,l),r+=Lr(i,t,n,s,a);else if(l=jS(e),typeof l=="function")for(e=l.call(e),l=0;!(i=e.next()).done;)i=i.value,s=o+Cf(i,l++),r+=Lr(i,t,n,s,a);else if(s==="object"){if(typeof e.then=="function")return Lr(QS(e),t,n,i,a);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return r}function tc(e,t,n){if(e==null)return e;var i=[],a=0;return Lr(e,i,"","",function(s){return t.call(n,s,a++)}),i}function JS(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var og=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},$S={map:tc,forEach:function(e,t,n){tc(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return tc(e,function(){t++}),t},toArray:function(e){return tc(e,function(t){return t})||[]},only:function(e){if(!Hp(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};me.Activity=YS;me.Children=$S;me.Component=bo;me.Fragment=FS;me.Profiler=GS;me.PureComponent=Ip;me.StrictMode=HS;me.Suspense=WS;me.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=rn;me.__COMPILER_RUNTIME={__proto__:null,c:function(e){return rn.H.useMemoCache(e)}};me.cache=function(e){return function(){return e.apply(null,arguments)}};me.cacheSignal=function(){return null};me.cloneElement=function(e,t,n){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=jv({},e.props),a=e.key;if(t!=null)for(s in t.key!==void 0&&(a=""+t.key),t)!Qv.call(t,s)||s==="key"||s==="__self"||s==="__source"||s==="ref"&&t.ref===void 0||(i[s]=t[s]);var s=arguments.length-2;if(s===1)i.children=n;else if(1<s){for(var r=Array(s),o=0;o<s;o++)r[o]=arguments[o+2];i.children=r}return Fp(e.type,a,i)};me.createContext=function(e){return e={$$typeof:kS,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:VS,_context:e},e};me.createElement=function(e,t,n){var i,a={},s=null;if(t!=null)for(i in t.key!==void 0&&(s=""+t.key),t)Qv.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(a[i]=t[i]);var r=arguments.length-2;if(r===1)a.children=n;else if(1<r){for(var o=Array(r),l=0;l<r;l++)o[l]=arguments[l+2];a.children=o}if(e&&e.defaultProps)for(i in r=e.defaultProps,r)a[i]===void 0&&(a[i]=r[i]);return Fp(e,s,a)};me.createRef=function(){return{current:null}};me.forwardRef=function(e){return{$$typeof:XS,render:e}};me.isValidElement=Hp;me.lazy=function(e){return{$$typeof:qv,_payload:{_status:-1,_result:e},_init:JS}};me.memo=function(e,t){return{$$typeof:qS,type:e,compare:t===void 0?null:t}};me.startTransition=function(e){var t=rn.T,n={};rn.T=n;try{var i=e(),a=rn.S;a!==null&&a(n,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(qd,og)}catch(s){og(s)}finally{t!==null&&n.types!==null&&(t.types=n.types),rn.T=t}};me.unstable_useCacheRefresh=function(){return rn.H.useCacheRefresh()};me.use=function(e){return rn.H.use(e)};me.useActionState=function(e,t,n){return rn.H.useActionState(e,t,n)};me.useCallback=function(e,t){return rn.H.useCallback(e,t)};me.useContext=function(e){return rn.H.useContext(e)};me.useDebugValue=function(){};me.useDeferredValue=function(e,t){return rn.H.useDeferredValue(e,t)};me.useEffect=function(e,t){return rn.H.useEffect(e,t)};me.useEffectEvent=function(e){return rn.H.useEffectEvent(e)};me.useId=function(){return rn.H.useId()};me.useImperativeHandle=function(e,t,n){return rn.H.useImperativeHandle(e,t,n)};me.useInsertionEffect=function(e,t){return rn.H.useInsertionEffect(e,t)};me.useLayoutEffect=function(e,t){return rn.H.useLayoutEffect(e,t)};me.useMemo=function(e,t){return rn.H.useMemo(e,t)};me.useOptimistic=function(e,t){return rn.H.useOptimistic(e,t)};me.useReducer=function(e,t,n){return rn.H.useReducer(e,t,n)};me.useRef=function(e){return rn.H.useRef(e)};me.useState=function(e){return rn.H.useState(e)};me.useSyncExternalStore=function(e,t,n){return rn.H.useSyncExternalStore(e,t,n)};me.useTransition=function(){return rn.H.useTransition()};me.version="19.2.8";Wv.exports=me;var Ut=Wv.exports,Jv={exports:{}},af={},$v={exports:{}},t_={};/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(B,F){var P=B.length;B.push(F);t:for(;0<P;){var X=P-1>>>1,pt=B[X];if(0<a(pt,F))B[X]=F,B[P]=pt,P=X;else break t}}function n(B){return B.length===0?null:B[0]}function i(B){if(B.length===0)return null;var F=B[0],P=B.pop();if(P!==F){B[0]=P;t:for(var X=0,pt=B.length,Tt=pt>>>1;X<Tt;){var Lt=2*(X+1)-1,ae=B[Lt],Jt=Lt+1,se=B[Jt];if(0>a(ae,P))Jt<pt&&0>a(se,ae)?(B[X]=se,B[Jt]=P,X=Jt):(B[X]=ae,B[Lt]=P,X=Lt);else if(Jt<pt&&0>a(se,P))B[X]=se,B[Jt]=P,X=Jt;else break t}}return F}function a(B,F){var P=B.sortIndex-F.sortIndex;return P!==0?P:B.id-F.id}if(e.unstable_now=void 0,typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var r=Date,o=r.now();e.unstable_now=function(){return r.now()-o}}var l=[],c=[],d=1,h=null,u=3,p=!1,g=!1,S=!1,m=!1,f=typeof setTimeout=="function"?setTimeout:null,v=typeof clearTimeout=="function"?clearTimeout:null,M=typeof setImmediate<"u"?setImmediate:null;function y(B){for(var F=n(c);F!==null;){if(F.callback===null)i(c);else if(F.startTime<=B)i(c),F.sortIndex=F.expirationTime,t(l,F);else break;F=n(c)}}function U(B){if(S=!1,y(B),!g)if(n(l)!==null)g=!0,C||(C=!0,I());else{var F=n(c);F!==null&&k(U,F.startTime-B)}}var C=!1,T=-1,x=5,w=-1;function D(){return m?!0:!(e.unstable_now()-w<x)}function O(){if(m=!1,C){var B=e.unstable_now();w=B;var F=!0;try{t:{g=!1,S&&(S=!1,v(T),T=-1),p=!0;var P=u;try{e:{for(y(B),h=n(l);h!==null&&!(h.expirationTime>B&&D());){var X=h.callback;if(typeof X=="function"){h.callback=null,u=h.priorityLevel;var pt=X(h.expirationTime<=B);if(B=e.unstable_now(),typeof pt=="function"){h.callback=pt,y(B),F=!0;break e}h===n(l)&&i(l),y(B)}else i(l);h=n(l)}if(h!==null)F=!0;else{var Tt=n(c);Tt!==null&&k(U,Tt.startTime-B),F=!1}}break t}finally{h=null,u=P,p=!1}F=void 0}}finally{F?I():C=!1}}}var I;if(typeof M=="function")I=function(){M(O)};else if(typeof MessageChannel<"u"){var z=new MessageChannel,G=z.port2;z.port1.onmessage=O,I=function(){G.postMessage(null)}}else I=function(){f(O,0)};function k(B,F){T=f(function(){B(e.unstable_now())},F)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(B){B.callback=null},e.unstable_forceFrameRate=function(B){0>B||125<B?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):x=0<B?Math.floor(1e3/B):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_next=function(B){switch(u){case 1:case 2:case 3:var F=3;break;default:F=u}var P=u;u=F;try{return B()}finally{u=P}},e.unstable_requestPaint=function(){m=!0},e.unstable_runWithPriority=function(B,F){switch(B){case 1:case 2:case 3:case 4:case 5:break;default:B=3}var P=u;u=B;try{return F()}finally{u=P}},e.unstable_scheduleCallback=function(B,F,P){var X=e.unstable_now();switch(typeof P=="object"&&P!==null?(P=P.delay,P=typeof P=="number"&&0<P?X+P:X):P=X,B){case 1:var pt=-1;break;case 2:pt=250;break;case 5:pt=1073741823;break;case 4:pt=1e4;break;default:pt=5e3}return pt=P+pt,B={id:d++,callback:F,priorityLevel:B,startTime:P,expirationTime:pt,sortIndex:-1},P>X?(B.sortIndex=P,t(c,B),n(l)===null&&B===n(c)&&(S?(v(T),T=-1):S=!0,k(U,P-X))):(B.sortIndex=pt,t(l,B),g||p||(g=!0,C||(C=!0,I()))),B},e.unstable_shouldYield=D,e.unstable_wrapCallback=function(B){var F=u;return function(){var P=u;u=F;try{return B.apply(this,arguments)}finally{u=P}}}})(t_);$v.exports=t_;var tM=$v.exports,e_={exports:{}},Kn={};/**
 * @license React
 * react-dom.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var eM=Ut;function n_(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function Ya(){}var Yn={d:{f:Ya,r:function(){throw Error(n_(522))},D:Ya,C:Ya,L:Ya,m:Ya,X:Ya,S:Ya,M:Ya},p:0,findDOMNode:null},nM=Symbol.for("react.portal");function iM(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:nM,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}var rl=eM.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function sf(e,t){if(e==="font")return"";if(typeof t=="string")return t==="use-credentials"?t:""}Kn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=Yn;Kn.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n_(299));return iM(e,t,null,n)};Kn.flushSync=function(e){var t=rl.T,n=Yn.p;try{if(rl.T=null,Yn.p=2,e)return e()}finally{rl.T=t,Yn.p=n,Yn.d.f()}};Kn.preconnect=function(e,t){typeof e=="string"&&(t?(t=t.crossOrigin,t=typeof t=="string"?t==="use-credentials"?t:"":void 0):t=null,Yn.d.C(e,t))};Kn.prefetchDNS=function(e){typeof e=="string"&&Yn.d.D(e)};Kn.preinit=function(e,t){if(typeof e=="string"&&t&&typeof t.as=="string"){var n=t.as,i=sf(n,t.crossOrigin),a=typeof t.integrity=="string"?t.integrity:void 0,s=typeof t.fetchPriority=="string"?t.fetchPriority:void 0;n==="style"?Yn.d.S(e,typeof t.precedence=="string"?t.precedence:void 0,{crossOrigin:i,integrity:a,fetchPriority:s}):n==="script"&&Yn.d.X(e,{crossOrigin:i,integrity:a,fetchPriority:s,nonce:typeof t.nonce=="string"?t.nonce:void 0})}};Kn.preinitModule=function(e,t){if(typeof e=="string")if(typeof t=="object"&&t!==null){if(t.as==null||t.as==="script"){var n=sf(t.as,t.crossOrigin);Yn.d.M(e,{crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0})}}else t==null&&Yn.d.M(e)};Kn.preload=function(e,t){if(typeof e=="string"&&typeof t=="object"&&t!==null&&typeof t.as=="string"){var n=t.as,i=sf(n,t.crossOrigin);Yn.d.L(e,n,{crossOrigin:i,integrity:typeof t.integrity=="string"?t.integrity:void 0,nonce:typeof t.nonce=="string"?t.nonce:void 0,type:typeof t.type=="string"?t.type:void 0,fetchPriority:typeof t.fetchPriority=="string"?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy=="string"?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet=="string"?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes=="string"?t.imageSizes:void 0,media:typeof t.media=="string"?t.media:void 0})}};Kn.preloadModule=function(e,t){if(typeof e=="string")if(t){var n=sf(t.as,t.crossOrigin);Yn.d.m(e,{as:typeof t.as=="string"&&t.as!=="script"?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity=="string"?t.integrity:void 0})}else Yn.d.m(e)};Kn.requestFormReset=function(e){Yn.d.r(e)};Kn.unstable_batchedUpdates=function(e,t){return e(t)};Kn.useFormState=function(e,t,n){return rl.H.useFormState(e,t,n)};Kn.useFormStatus=function(){return rl.H.useHostTransitionStatus()};Kn.version="19.2.8";function i_(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(i_)}catch(e){console.error(e)}}i_(),e_.exports=Kn;var aM=e_.exports;/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Sn=tM,a_=Ut,sM=aM;function gt(e){var t="https://react.dev/errors/"+e;if(1<arguments.length){t+="?args[]="+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n])}return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}function s_(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Fl(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function r_(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function o_(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function lg(e){if(Fl(e)!==e)throw Error(gt(188))}function rM(e){var t=e.alternate;if(!t){if(t=Fl(e),t===null)throw Error(gt(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return lg(a),e;if(s===i)return lg(a),t;s=s.sibling}throw Error(gt(188))}if(n.return!==i.return)n=a,i=s;else{for(var r=!1,o=a.child;o;){if(o===n){r=!0,n=a,i=s;break}if(o===i){r=!0,i=a,n=s;break}o=o.sibling}if(!r){for(o=s.child;o;){if(o===n){r=!0,n=s,i=a;break}if(o===i){r=!0,i=s,n=a;break}o=o.sibling}if(!r)throw Error(gt(189))}}if(n.alternate!==i)throw Error(gt(190))}if(n.tag!==3)throw Error(gt(188));return n.stateNode.current===n?e:t}function l_(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=l_(e),t!==null)return t;e=e.sibling}return null}var on=Object.assign,oM=Symbol.for("react.element"),ec=Symbol.for("react.transitional.element"),Jo=Symbol.for("react.portal"),zr=Symbol.for("react.fragment"),c_=Symbol.for("react.strict_mode"),Yd=Symbol.for("react.profiler"),u_=Symbol.for("react.consumer"),wa=Symbol.for("react.context"),Gp=Symbol.for("react.forward_ref"),jd=Symbol.for("react.suspense"),Zd=Symbol.for("react.suspense_list"),Vp=Symbol.for("react.memo"),ts=Symbol.for("react.lazy"),Kd=Symbol.for("react.activity"),lM=Symbol.for("react.memo_cache_sentinel"),cg=Symbol.iterator;function Oo(e){return e===null||typeof e!="object"?null:(e=cg&&e[cg]||e["@@iterator"],typeof e=="function"?e:null)}var cM=Symbol.for("react.client.reference");function Qd(e){if(e==null)return null;if(typeof e=="function")return e.$$typeof===cM?null:e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case zr:return"Fragment";case Yd:return"Profiler";case c_:return"StrictMode";case jd:return"Suspense";case Zd:return"SuspenseList";case Kd:return"Activity"}if(typeof e=="object")switch(e.$$typeof){case Jo:return"Portal";case wa:return e.displayName||"Context";case u_:return(e._context.displayName||"Context")+".Consumer";case Gp:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Vp:return t=e.displayName||null,t!==null?t:Qd(e.type)||"Memo";case ts:t=e._payload,e=e._init;try{return Qd(e(t))}catch{}}return null}var $o=Array.isArray,ue=a_.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ge=sM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,qs={pending:!1,data:null,method:null,action:null},Jd=[],Ir=-1;function fa(e){return{current:e}}function wn(e){0>Ir||(e.current=Jd[Ir],Jd[Ir]=null,Ir--)}function en(e,t){Ir++,Jd[Ir]=e.current,e.current=t}var oa=fa(null),Sl=fa(null),ps=fa(null),_u=fa(null);function xu(e,t){switch(en(ps,t),en(Sl,e),en(oa,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?m0(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=m0(t),e=Dy(t,e);else switch(e){case"svg":e=1;break;case"math":e=2;break;default:e=0}}wn(oa),en(oa,e)}function ro(){wn(oa),wn(Sl),wn(ps)}function $d(e){e.memoizedState!==null&&en(_u,e);var t=oa.current,n=Dy(t,e.type);t!==n&&(en(Sl,e),en(oa,n))}function yu(e){Sl.current===e&&(wn(oa),wn(Sl)),_u.current===e&&(wn(_u),Ul._currentValue=qs)}var wf,ug;function Is(e){if(wf===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);wf=t&&t[1]||"",ug=-1<n.stack.indexOf(`
    at`)?" (<anonymous>)":-1<n.stack.indexOf("@")?"@unknown:0:0":""}return`
`+wf+e+ug}var Df=!1;function Nf(e,t){if(!e||Df)return"";Df=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var i={DetermineComponentFrameRoot:function(){try{if(t){var h=function(){throw Error()};if(Object.defineProperty(h.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(h,[])}catch(p){var u=p}Reflect.construct(e,[],h)}else{try{h.call()}catch(p){u=p}e.call(h.prototype)}}else{try{throw Error()}catch(p){u=p}(h=e())&&typeof h.catch=="function"&&h.catch(function(){})}}catch(p){if(p&&u&&typeof p.stack=="string")return[p.stack,u.stack]}return[null,null]}};i.DetermineComponentFrameRoot.displayName="DetermineComponentFrameRoot";var a=Object.getOwnPropertyDescriptor(i.DetermineComponentFrameRoot,"name");a&&a.configurable&&Object.defineProperty(i.DetermineComponentFrameRoot,"name",{value:"DetermineComponentFrameRoot"});var s=i.DetermineComponentFrameRoot(),r=s[0],o=s[1];if(r&&o){var l=r.split(`
`),c=o.split(`
`);for(a=i=0;i<l.length&&!l[i].includes("DetermineComponentFrameRoot");)i++;for(;a<c.length&&!c[a].includes("DetermineComponentFrameRoot");)a++;if(i===l.length||a===c.length)for(i=l.length-1,a=c.length-1;1<=i&&0<=a&&l[i]!==c[a];)a--;for(;1<=i&&0<=a;i--,a--)if(l[i]!==c[a]){if(i!==1||a!==1)do if(i--,a--,0>a||l[i]!==c[a]){var d=`
`+l[i].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=i&&0<=a);break}}}finally{Df=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:"")?Is(n):""}function uM(e,t){switch(e.tag){case 26:case 27:case 5:return Is(e.type);case 16:return Is("Lazy");case 13:return e.child!==t&&t!==null?Is("Suspense Fallback"):Is("Suspense");case 19:return Is("SuspenseList");case 0:case 15:return Nf(e.type,!1);case 11:return Nf(e.type.render,!1);case 1:return Nf(e.type,!0);case 31:return Is("Activity");default:return""}}function fg(e){try{var t="",n=null;do t+=uM(e,n),n=e,e=e.return;while(e);return t}catch(i){return`
Error generating stack: `+i.message+`
`+i.stack}}var th=Object.prototype.hasOwnProperty,kp=Sn.unstable_scheduleCallback,Uf=Sn.unstable_cancelCallback,fM=Sn.unstable_shouldYield,dM=Sn.unstable_requestPaint,mi=Sn.unstable_now,hM=Sn.unstable_getCurrentPriorityLevel,f_=Sn.unstable_ImmediatePriority,d_=Sn.unstable_UserBlockingPriority,Su=Sn.unstable_NormalPriority,pM=Sn.unstable_LowPriority,h_=Sn.unstable_IdlePriority,mM=Sn.log,gM=Sn.unstable_setDisableYieldValue,Hl=null,gi=null;function os(e){if(typeof mM=="function"&&gM(e),gi&&typeof gi.setStrictMode=="function")try{gi.setStrictMode(Hl,e)}catch{}}var vi=Math.clz32?Math.clz32:xM,vM=Math.log,_M=Math.LN2;function xM(e){return e>>>=0,e===0?32:31-(vM(e)/_M|0)|0}var nc=256,ic=262144,ac=4194304;function Bs(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&261888;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function rf(e,t,n){var i=e.pendingLanes;if(i===0)return 0;var a=0,s=e.suspendedLanes,r=e.pingedLanes;e=e.warmLanes;var o=i&134217727;return o!==0?(i=o&~s,i!==0?a=Bs(i):(r&=o,r!==0?a=Bs(r):n||(n=o&~e,n!==0&&(a=Bs(n))))):(o=i&~s,o!==0?a=Bs(o):r!==0?a=Bs(r):n||(n=i&~e,n!==0&&(a=Bs(n)))),a===0?0:t!==0&&t!==a&&!(t&s)&&(s=a&-a,n=t&-t,s>=n||s===32&&(n&4194048)!==0)?t:a}function Gl(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function yM(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function p_(){var e=ac;return ac<<=1,!(ac&62914560)&&(ac=4194304),e}function Lf(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Vl(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function SM(e,t,n,i,a,s){var r=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var o=e.entanglements,l=e.expirationTimes,c=e.hiddenUpdates;for(n=r&~n;0<n;){var d=31-vi(n),h=1<<d;o[d]=0,l[d]=-1;var u=c[d];if(u!==null)for(c[d]=null,d=0;d<u.length;d++){var p=u[d];p!==null&&(p.lane&=-536870913)}n&=~h}i!==0&&m_(e,i,0),s!==0&&a===0&&e.tag!==0&&(e.suspendedLanes|=s&~(r&~t))}function m_(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var i=31-vi(t);e.entangledLanes|=t,e.entanglements[i]=e.entanglements[i]|1073741824|n&261930}function g_(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-vi(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}function v_(e,t){var n=t&-t;return n=n&42?1:Xp(n),n&(e.suspendedLanes|t)?0:n}function Xp(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function Wp(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function __(){var e=Ge.p;return e!==0?e:(e=window.event,e===void 0?32:Gy(e.type))}function dg(e,t){var n=Ge.p;try{return Ge.p=e,t()}finally{Ge.p=n}}var Cs=Math.random().toString(36).slice(2),On="__reactFiber$"+Cs,ri="__reactProps$"+Cs,Eo="__reactContainer$"+Cs,eh="__reactEvents$"+Cs,MM="__reactListeners$"+Cs,bM="__reactHandles$"+Cs,hg="__reactResources$"+Cs,kl="__reactMarker$"+Cs;function qp(e){delete e[On],delete e[ri],delete e[eh],delete e[MM],delete e[bM]}function Br(e){var t=e[On];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Eo]||n[On]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=y0(e);e!==null;){if(n=e[On])return n;e=y0(e)}return t}e=n,n=e.parentNode}return null}function To(e){if(e=e[On]||e[Eo]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function tl(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(gt(33))}function Qr(e){var t=e[hg];return t||(t=e[hg]={hoistableStyles:new Map,hoistableScripts:new Map}),t}function Rn(e){e[kl]=!0}var x_=new Set,y_={};function or(e,t){oo(e,t),oo(e+"Capture",t)}function oo(e,t){for(y_[e]=t,e=0;e<t.length;e++)x_.add(t[e])}var EM=RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"),pg={},mg={};function TM(e){return th.call(mg,e)?!0:th.call(pg,e)?!1:EM.test(e)?mg[e]=!0:(pg[e]=!0,!1)}function jc(e,t,n){if(TM(t))if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":e.removeAttribute(t);return;case"boolean":var i=t.toLowerCase().slice(0,5);if(i!=="data-"&&i!=="aria-"){e.removeAttribute(t);return}}e.setAttribute(t,""+n)}}function sc(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(t);return}e.setAttribute(t,""+n)}}function ma(e,t,n,i){if(i===null)e.removeAttribute(n);else{switch(typeof i){case"undefined":case"function":case"symbol":case"boolean":e.removeAttribute(n);return}e.setAttributeNS(t,n,""+i)}}function Ri(e){switch(typeof e){case"bigint":case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function S_(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function AM(e,t,n){var i=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&typeof i<"u"&&typeof i.get=="function"&&typeof i.set=="function"){var a=i.get,s=i.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(r){n=""+r,s.call(this,r)}}),Object.defineProperty(e,t,{enumerable:i.enumerable}),{getValue:function(){return n},setValue:function(r){n=""+r},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function nh(e){if(!e._valueTracker){var t=S_(e)?"checked":"value";e._valueTracker=AM(e,t,""+e[t])}}function M_(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=S_(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Mu(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}var RM=/[\n"\\]/g;function Ni(e){return e.replace(RM,function(t){return"\\"+t.charCodeAt(0).toString(16)+" "})}function ih(e,t,n,i,a,s,r,o){e.name="",r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"?e.type=r:e.removeAttribute("type"),t!=null?r==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+Ri(t)):e.value!==""+Ri(t)&&(e.value=""+Ri(t)):r!=="submit"&&r!=="reset"||e.removeAttribute("value"),t!=null?ah(e,r,Ri(t)):n!=null?ah(e,r,Ri(n)):i!=null&&e.removeAttribute("value"),a==null&&s!=null&&(e.defaultChecked=!!s),a!=null&&(e.checked=a&&typeof a!="function"&&typeof a!="symbol"),o!=null&&typeof o!="function"&&typeof o!="symbol"&&typeof o!="boolean"?e.name=""+Ri(o):e.removeAttribute("name")}function b_(e,t,n,i,a,s,r,o){if(s!=null&&typeof s!="function"&&typeof s!="symbol"&&typeof s!="boolean"&&(e.type=s),t!=null||n!=null){if(!(s!=="submit"&&s!=="reset"||t!=null)){nh(e);return}n=n!=null?""+Ri(n):"",t=t!=null?""+Ri(t):n,o||t===e.value||(e.value=t),e.defaultValue=t}i=i??a,i=typeof i!="function"&&typeof i!="symbol"&&!!i,e.checked=o?e.checked:!!i,e.defaultChecked=!!i,r!=null&&typeof r!="function"&&typeof r!="symbol"&&typeof r!="boolean"&&(e.name=r),nh(e)}function ah(e,t,n){t==="number"&&Mu(e.ownerDocument)===e||e.defaultValue===""+n||(e.defaultValue=""+n)}function Jr(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+Ri(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function E_(e,t,n){if(t!=null&&(t=""+Ri(t),t!==e.value&&(e.value=t),n==null)){e.defaultValue!==t&&(e.defaultValue=t);return}e.defaultValue=n!=null?""+Ri(n):""}function T_(e,t,n,i){if(t==null){if(i!=null){if(n!=null)throw Error(gt(92));if($o(i)){if(1<i.length)throw Error(gt(93));i=i[0]}n=i}n==null&&(n=""),t=n}n=Ri(t),e.defaultValue=n,i=e.textContent,i===n&&i!==""&&i!==null&&(e.value=i),nh(e)}function lo(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var CM=new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));function gg(e,t,n){var i=t.indexOf("--")===0;n==null||typeof n=="boolean"||n===""?i?e.setProperty(t,""):t==="float"?e.cssFloat="":e[t]="":i?e.setProperty(t,n):typeof n!="number"||n===0||CM.has(t)?t==="float"?e.cssFloat=n:e[t]=(""+n).trim():e[t]=n+"px"}function A_(e,t,n){if(t!=null&&typeof t!="object")throw Error(gt(62));if(e=e.style,n!=null){for(var i in n)!n.hasOwnProperty(i)||t!=null&&t.hasOwnProperty(i)||(i.indexOf("--")===0?e.setProperty(i,""):i==="float"?e.cssFloat="":e[i]="");for(var a in t)i=t[a],t.hasOwnProperty(a)&&n[a]!==i&&gg(e,a,i)}else for(var s in t)t.hasOwnProperty(s)&&gg(e,s,t[s])}function Yp(e){if(e.indexOf("-")===-1)return!1;switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var wM=new Map([["acceptCharset","accept-charset"],["htmlFor","for"],["httpEquiv","http-equiv"],["crossOrigin","crossorigin"],["accentHeight","accent-height"],["alignmentBaseline","alignment-baseline"],["arabicForm","arabic-form"],["baselineShift","baseline-shift"],["capHeight","cap-height"],["clipPath","clip-path"],["clipRule","clip-rule"],["colorInterpolation","color-interpolation"],["colorInterpolationFilters","color-interpolation-filters"],["colorProfile","color-profile"],["colorRendering","color-rendering"],["dominantBaseline","dominant-baseline"],["enableBackground","enable-background"],["fillOpacity","fill-opacity"],["fillRule","fill-rule"],["floodColor","flood-color"],["floodOpacity","flood-opacity"],["fontFamily","font-family"],["fontSize","font-size"],["fontSizeAdjust","font-size-adjust"],["fontStretch","font-stretch"],["fontStyle","font-style"],["fontVariant","font-variant"],["fontWeight","font-weight"],["glyphName","glyph-name"],["glyphOrientationHorizontal","glyph-orientation-horizontal"],["glyphOrientationVertical","glyph-orientation-vertical"],["horizAdvX","horiz-adv-x"],["horizOriginX","horiz-origin-x"],["imageRendering","image-rendering"],["letterSpacing","letter-spacing"],["lightingColor","lighting-color"],["markerEnd","marker-end"],["markerMid","marker-mid"],["markerStart","marker-start"],["overlinePosition","overline-position"],["overlineThickness","overline-thickness"],["paintOrder","paint-order"],["panose-1","panose-1"],["pointerEvents","pointer-events"],["renderingIntent","rendering-intent"],["shapeRendering","shape-rendering"],["stopColor","stop-color"],["stopOpacity","stop-opacity"],["strikethroughPosition","strikethrough-position"],["strikethroughThickness","strikethrough-thickness"],["strokeDasharray","stroke-dasharray"],["strokeDashoffset","stroke-dashoffset"],["strokeLinecap","stroke-linecap"],["strokeLinejoin","stroke-linejoin"],["strokeMiterlimit","stroke-miterlimit"],["strokeOpacity","stroke-opacity"],["strokeWidth","stroke-width"],["textAnchor","text-anchor"],["textDecoration","text-decoration"],["textRendering","text-rendering"],["transformOrigin","transform-origin"],["underlinePosition","underline-position"],["underlineThickness","underline-thickness"],["unicodeBidi","unicode-bidi"],["unicodeRange","unicode-range"],["unitsPerEm","units-per-em"],["vAlphabetic","v-alphabetic"],["vHanging","v-hanging"],["vIdeographic","v-ideographic"],["vMathematical","v-mathematical"],["vectorEffect","vector-effect"],["vertAdvY","vert-adv-y"],["vertOriginX","vert-origin-x"],["vertOriginY","vert-origin-y"],["wordSpacing","word-spacing"],["writingMode","writing-mode"],["xmlnsXlink","xmlns:xlink"],["xHeight","x-height"]]),DM=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function Zc(e){return DM.test(""+e)?"javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')":e}function Da(){}var sh=null;function jp(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Fr=null,$r=null;function vg(e){var t=To(e);if(t&&(e=t.stateNode)){var n=e[ri]||null;t:switch(e=t.stateNode,t.type){case"input":if(ih(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll('input[name="'+Ni(""+t)+'"][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=i[ri]||null;if(!a)throw Error(gt(90));ih(i,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)i=n[t],i.form===e.form&&M_(i)}break t;case"textarea":E_(e,n.value,n.defaultValue);break t;case"select":t=n.value,t!=null&&Jr(e,!!n.multiple,t,!1)}}}var Of=!1;function R_(e,t,n){if(Of)return e(t,n);Of=!0;try{var i=e(t);return i}finally{if(Of=!1,(Fr!==null||$r!==null)&&(_f(),Fr&&(t=Fr,e=$r,$r=Fr=null,vg(t),e)))for(t=0;t<e.length;t++)vg(e[t])}}function Ml(e,t){var n=e.stateNode;if(n===null)return null;var i=n[ri]||null;if(i===null)return null;n=i[t];t:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break t;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(gt(231,t,typeof n));return n}var Ba=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),rh=!1;if(Ba)try{var Po={};Object.defineProperty(Po,"passive",{get:function(){rh=!0}}),window.addEventListener("test",Po,Po),window.removeEventListener("test",Po,Po)}catch{rh=!1}var ls=null,Zp=null,Kc=null;function C_(){if(Kc)return Kc;var e,t=Zp,n=t.length,i,a="value"in ls?ls.value:ls.textContent,s=a.length;for(e=0;e<n&&t[e]===a[e];e++);var r=n-e;for(i=1;i<=r&&t[n-i]===a[s-i];i++);return Kc=a.slice(e,1<i?1-i:void 0)}function Qc(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function rc(){return!0}function _g(){return!1}function oi(e){function t(n,i,a,s,r){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=s,this.target=r,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(n=e[o],this[o]=n?n(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?rc:_g,this.isPropagationStopped=_g,this}return on(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=rc)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=rc)},persist:function(){},isPersistent:rc}),t}var lr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},of=oi(lr),Xl=on({},lr,{view:0,detail:0}),NM=oi(Xl),Pf,zf,zo,lf=on({},Xl,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Kp,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==zo&&(zo&&e.type==="mousemove"?(Pf=e.screenX-zo.screenX,zf=e.screenY-zo.screenY):zf=Pf=0,zo=e),Pf)},movementY:function(e){return"movementY"in e?e.movementY:zf}}),xg=oi(lf),UM=on({},lf,{dataTransfer:0}),LM=oi(UM),OM=on({},Xl,{relatedTarget:0}),If=oi(OM),PM=on({},lr,{animationName:0,elapsedTime:0,pseudoElement:0}),zM=oi(PM),IM=on({},lr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),BM=oi(IM),FM=on({},lr,{data:0}),yg=oi(FM),HM={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},GM={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},VM={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function kM(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=VM[e])?!!t[e]:!1}function Kp(){return kM}var XM=on({},Xl,{key:function(e){if(e.key){var t=HM[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qc(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?GM[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Kp,charCode:function(e){return e.type==="keypress"?Qc(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qc(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),WM=oi(XM),qM=on({},lf,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Sg=oi(qM),YM=on({},Xl,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Kp}),jM=oi(YM),ZM=on({},lr,{propertyName:0,elapsedTime:0,pseudoElement:0}),KM=oi(ZM),QM=on({},lf,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),JM=oi(QM),$M=on({},lr,{newState:0,oldState:0}),tb=oi($M),eb=[9,13,27,32],Qp=Ba&&"CompositionEvent"in window,ol=null;Ba&&"documentMode"in document&&(ol=document.documentMode);var nb=Ba&&"TextEvent"in window&&!ol,w_=Ba&&(!Qp||ol&&8<ol&&11>=ol),Mg=" ",bg=!1;function D_(e,t){switch(e){case"keyup":return eb.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function N_(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Hr=!1;function ib(e,t){switch(e){case"compositionend":return N_(t);case"keypress":return t.which!==32?null:(bg=!0,Mg);case"textInput":return e=t.data,e===Mg&&bg?null:e;default:return null}}function ab(e,t){if(Hr)return e==="compositionend"||!Qp&&D_(e,t)?(e=C_(),Kc=Zp=ls=null,Hr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return w_&&t.locale!=="ko"?null:t.data;default:return null}}var sb={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Eg(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!sb[e.type]:t==="textarea"}function U_(e,t,n,i){Fr?$r?$r.push(i):$r=[i]:Fr=i,t=Hu(t,"onChange"),0<t.length&&(n=new of("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var ll=null,bl=null;function rb(e){Ry(e,0)}function cf(e){var t=tl(e);if(M_(t))return e}function Tg(e,t){if(e==="change")return t}var L_=!1;if(Ba){var Bf;if(Ba){var Ff="oninput"in document;if(!Ff){var Ag=document.createElement("div");Ag.setAttribute("oninput","return;"),Ff=typeof Ag.oninput=="function"}Bf=Ff}else Bf=!1;L_=Bf&&(!document.documentMode||9<document.documentMode)}function Rg(){ll&&(ll.detachEvent("onpropertychange",O_),bl=ll=null)}function O_(e){if(e.propertyName==="value"&&cf(bl)){var t=[];U_(t,bl,e,jp(e)),R_(rb,t)}}function ob(e,t,n){e==="focusin"?(Rg(),ll=t,bl=n,ll.attachEvent("onpropertychange",O_)):e==="focusout"&&Rg()}function lb(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return cf(bl)}function cb(e,t){if(e==="click")return cf(t)}function ub(e,t){if(e==="input"||e==="change")return cf(t)}function fb(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var xi=typeof Object.is=="function"?Object.is:fb;function El(e,t){if(xi(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!th.call(t,a)||!xi(e[a],t[a]))return!1}return!0}function Cg(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function wg(e,t){var n=Cg(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}t:{for(;n;){if(n.nextSibling){n=n.nextSibling;break t}n=n.parentNode}n=void 0}n=Cg(n)}}function P_(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?P_(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function z_(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Mu(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Mu(e.document)}return t}function Jp(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}var db=Ba&&"documentMode"in document&&11>=document.documentMode,Gr=null,oh=null,cl=null,lh=!1;function Dg(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;lh||Gr==null||Gr!==Mu(i)||(i=Gr,"selectionStart"in i&&Jp(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),cl&&El(cl,i)||(cl=i,i=Hu(oh,"onSelect"),0<i.length&&(t=new of("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Gr)))}function Us(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Vr={animationend:Us("Animation","AnimationEnd"),animationiteration:Us("Animation","AnimationIteration"),animationstart:Us("Animation","AnimationStart"),transitionrun:Us("Transition","TransitionRun"),transitionstart:Us("Transition","TransitionStart"),transitioncancel:Us("Transition","TransitionCancel"),transitionend:Us("Transition","TransitionEnd")},Hf={},I_={};Ba&&(I_=document.createElement("div").style,"AnimationEvent"in window||(delete Vr.animationend.animation,delete Vr.animationiteration.animation,delete Vr.animationstart.animation),"TransitionEvent"in window||delete Vr.transitionend.transition);function cr(e){if(Hf[e])return Hf[e];if(!Vr[e])return e;var t=Vr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in I_)return Hf[e]=t[n];return e}var B_=cr("animationend"),F_=cr("animationiteration"),H_=cr("animationstart"),hb=cr("transitionrun"),pb=cr("transitionstart"),mb=cr("transitioncancel"),G_=cr("transitionend"),V_=new Map,ch="abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");ch.push("scrollEnd");function Ki(e,t){V_.set(e,t),or(t,[e])}var bu=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)},Ti=[],kr=0,$p=0;function uf(){for(var e=kr,t=$p=kr=0;t<e;){var n=Ti[t];Ti[t++]=null;var i=Ti[t];Ti[t++]=null;var a=Ti[t];Ti[t++]=null;var s=Ti[t];if(Ti[t++]=null,i!==null&&a!==null){var r=i.pending;r===null?a.next=a:(a.next=r.next,r.next=a),i.pending=a}s!==0&&k_(n,a,s)}}function ff(e,t,n,i){Ti[kr++]=e,Ti[kr++]=t,Ti[kr++]=n,Ti[kr++]=i,$p|=i,e.lanes|=i,e=e.alternate,e!==null&&(e.lanes|=i)}function tm(e,t,n,i){return ff(e,t,n,i),Eu(e)}function ur(e,t){return ff(e,null,null,t),Eu(e)}function k_(e,t,n){e.lanes|=n;var i=e.alternate;i!==null&&(i.lanes|=n);for(var a=!1,s=e.return;s!==null;)s.childLanes|=n,i=s.alternate,i!==null&&(i.childLanes|=n),s.tag===22&&(e=s.stateNode,e===null||e._visibility&1||(a=!0)),e=s,s=s.return;return e.tag===3?(s=e.stateNode,a&&t!==null&&(a=31-vi(n),e=s.hiddenUpdates,i=e[a],i===null?e[a]=[t]:i.push(t),t.lane=n|536870912),s):null}function Eu(e){if(50<_l)throw _l=0,Dh=null,Error(gt(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Xr={};function gb(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function hi(e,t,n,i){return new gb(e,t,n,i)}function em(e){return e=e.prototype,!(!e||!e.isReactComponent)}function La(e,t){var n=e.alternate;return n===null?(n=hi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&65011712,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function X_(e,t){e.flags&=65011714;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Jc(e,t,n,i,a,s){var r=0;if(i=e,typeof e=="function")em(e)&&(r=1);else if(typeof e=="string")r=SE(e,n,oa.current)?26:e==="html"||e==="head"||e==="body"?27:5;else t:switch(e){case Kd:return e=hi(31,n,t,a),e.elementType=Kd,e.lanes=s,e;case zr:return Ys(n.children,a,s,t);case c_:r=8,a|=24;break;case Yd:return e=hi(12,n,t,a|2),e.elementType=Yd,e.lanes=s,e;case jd:return e=hi(13,n,t,a),e.elementType=jd,e.lanes=s,e;case Zd:return e=hi(19,n,t,a),e.elementType=Zd,e.lanes=s,e;default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case wa:r=10;break t;case u_:r=9;break t;case Gp:r=11;break t;case Vp:r=14;break t;case ts:r=16,i=null;break t}r=29,n=Error(gt(130,e===null?"null":typeof e,"")),i=null}return t=hi(r,n,t,a),t.elementType=e,t.type=i,t.lanes=s,t}function Ys(e,t,n,i){return e=hi(7,e,i,t),e.lanes=n,e}function Gf(e,t,n){return e=hi(6,e,null,t),e.lanes=n,e}function W_(e){var t=hi(18,null,null,0);return t.stateNode=e,t}function Vf(e,t,n){return t=hi(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ng=new WeakMap;function Ui(e,t){if(typeof e=="object"&&e!==null){var n=Ng.get(e);return n!==void 0?n:(t={value:e,source:t,stack:fg(t)},Ng.set(e,t),t)}return{value:e,source:t,stack:fg(t)}}var Wr=[],qr=0,Tu=null,Tl=0,Ci=[],wi=0,bs=null,ia=1,aa="";function Aa(e,t){Wr[qr++]=Tl,Wr[qr++]=Tu,Tu=e,Tl=t}function q_(e,t,n){Ci[wi++]=ia,Ci[wi++]=aa,Ci[wi++]=bs,bs=e;var i=ia;e=aa;var a=32-vi(i)-1;i&=~(1<<a),n+=1;var s=32-vi(t)+a;if(30<s){var r=a-a%5;s=(i&(1<<r)-1).toString(32),i>>=r,a-=r,ia=1<<32-vi(t)+a|n<<a|i,aa=s+e}else ia=1<<s|n<<a|i,aa=e}function nm(e){e.return!==null&&(Aa(e,1),q_(e,1,0))}function im(e){for(;e===Tu;)Tu=Wr[--qr],Wr[qr]=null,Tl=Wr[--qr],Wr[qr]=null;for(;e===bs;)bs=Ci[--wi],Ci[wi]=null,aa=Ci[--wi],Ci[wi]=null,ia=Ci[--wi],Ci[wi]=null}function Y_(e,t){Ci[wi++]=ia,Ci[wi++]=aa,Ci[wi++]=bs,ia=t.id,aa=t.overflow,bs=e}var Pn=null,sn=null,Oe=!1,ms=null,Li=!1,uh=Error(gt(519));function Es(e){var t=Error(gt(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?"text":"HTML",""));throw Al(Ui(t,e)),uh}function Ug(e){var t=e.stateNode,n=e.type,i=e.memoizedProps;switch(t[On]=e,t[ri]=i,n){case"dialog":Re("cancel",t),Re("close",t);break;case"iframe":case"object":case"embed":Re("load",t);break;case"video":case"audio":for(n=0;n<Dl.length;n++)Re(Dl[n],t);break;case"source":Re("error",t);break;case"img":case"image":case"link":Re("error",t),Re("load",t);break;case"details":Re("toggle",t);break;case"input":Re("invalid",t),b_(t,i.value,i.defaultValue,i.checked,i.defaultChecked,i.type,i.name,!0);break;case"select":Re("invalid",t);break;case"textarea":Re("invalid",t),T_(t,i.value,i.defaultValue,i.children)}n=i.children,typeof n!="string"&&typeof n!="number"&&typeof n!="bigint"||t.textContent===""+n||i.suppressHydrationWarning===!0||wy(t.textContent,n)?(i.popover!=null&&(Re("beforetoggle",t),Re("toggle",t)),i.onScroll!=null&&Re("scroll",t),i.onScrollEnd!=null&&Re("scrollend",t),i.onClick!=null&&(t.onclick=Da),t=!0):t=!1,t||Es(e,!0)}function Lg(e){for(Pn=e.return;Pn;)switch(Pn.tag){case 5:case 31:case 13:Li=!1;return;case 27:case 3:Li=!0;return;default:Pn=Pn.return}}function gr(e){if(e!==Pn)return!1;if(!Oe)return Lg(e),Oe=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=!(n!=="form"&&n!=="button")||Ph(e.type,e.memoizedProps)),n=!n),n&&sn&&Es(e),Lg(e),t===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(gt(317));sn=x0(e)}else if(t===31){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(gt(317));sn=x0(e)}else t===27?(t=sn,ws(e.type)?(e=Fh,Fh=null,sn=e):sn=t):sn=Pn?Ii(e.stateNode.nextSibling):null;return!0}function Js(){sn=Pn=null,Oe=!1}function kf(){var e=ms;return e!==null&&(ii===null?ii=e:ii.push.apply(ii,e),ms=null),e}function Al(e){ms===null?ms=[e]:ms.push(e)}var fh=fa(null),fr=null,Na=null;function ns(e,t,n){en(fh,t._currentValue),t._currentValue=n}function Oa(e){e._currentValue=fh.current,wn(fh)}function dh(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function hh(e,t,n,i){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var s=a.dependencies;if(s!==null){var r=a.child;s=s.firstContext;t:for(;s!==null;){var o=s;s=a;for(var l=0;l<t.length;l++)if(o.context===t[l]){s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),dh(s.return,n,e),i||(r=null);break t}s=o.next}}else if(a.tag===18){if(r=a.return,r===null)throw Error(gt(341));r.lanes|=n,s=r.alternate,s!==null&&(s.lanes|=n),dh(r,n,e),r=null}else r=a.child;if(r!==null)r.return=a;else for(r=a;r!==null;){if(r===e){r=null;break}if(a=r.sibling,a!==null){a.return=r.return,r=a;break}r=r.return}a=r}}function Ao(e,t,n,i){e=null;for(var a=t,s=!1;a!==null;){if(!s){if(a.flags&524288)s=!0;else if(a.flags&262144)break}if(a.tag===10){var r=a.alternate;if(r===null)throw Error(gt(387));if(r=r.memoizedProps,r!==null){var o=a.type;xi(a.pendingProps.value,r.value)||(e!==null?e.push(o):e=[o])}}else if(a===_u.current){if(r=a.alternate,r===null)throw Error(gt(387));r.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e!==null?e.push(Ul):e=[Ul])}a=a.return}e!==null&&hh(t,e,n,i),t.flags|=262144}function Au(e){for(e=e.firstContext;e!==null;){if(!xi(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function $s(e){fr=e,Na=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function zn(e){return j_(fr,e)}function oc(e,t){return fr===null&&$s(e),j_(e,t)}function j_(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},Na===null){if(e===null)throw Error(gt(308));Na=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else Na=Na.next=t;return n}var vb=typeof AbortController<"u"?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(n,i){e.push(i)}};this.abort=function(){t.aborted=!0,e.forEach(function(n){return n()})}},_b=Sn.unstable_scheduleCallback,xb=Sn.unstable_NormalPriority,_n={$$typeof:wa,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function am(){return{controller:new vb,data:new Map,refCount:0}}function Wl(e){e.refCount--,e.refCount===0&&_b(xb,function(){e.controller.abort()})}var ul=null,ph=0,co=0,to=null;function yb(e,t){if(ul===null){var n=ul=[];ph=0,co=wm(),to={status:"pending",value:void 0,then:function(i){n.push(i)}}}return ph++,t.then(Og,Og),t}function Og(){if(--ph===0&&ul!==null){to!==null&&(to.status="fulfilled");var e=ul;ul=null,co=0,to=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Sb(e,t){var n=[],i={status:"pending",value:null,reason:null,then:function(a){n.push(a)}};return e.then(function(){i.status="fulfilled",i.value=t;for(var a=0;a<n.length;a++)(0,n[a])(t)},function(a){for(i.status="rejected",i.reason=a,a=0;a<n.length;a++)(0,n[a])(void 0)}),i}var Pg=ue.S;ue.S=function(e,t){ly=mi(),typeof t=="object"&&t!==null&&typeof t.then=="function"&&yb(e,t),Pg!==null&&Pg(e,t)};var js=fa(null);function sm(){var e=js.current;return e!==null?e:$e.pooledCache}function $c(e,t){t===null?en(js,js.current):en(js,t.pool)}function Z_(){var e=sm();return e===null?null:{parent:_n._currentValue,pool:e}}var Ro=Error(gt(460)),rm=Error(gt(474)),df=Error(gt(542)),Ru={then:function(){}};function zg(e){return e=e.status,e==="fulfilled"||e==="rejected"}function K_(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(Da,Da),t=n),t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Bg(e),e;default:if(typeof t.status=="string")t.then(Da,Da);else{if(e=$e,e!==null&&100<e.shellSuspendCounter)throw Error(gt(482));e=t,e.status="pending",e.then(function(i){if(t.status==="pending"){var a=t;a.status="fulfilled",a.value=i}},function(i){if(t.status==="pending"){var a=t;a.status="rejected",a.reason=i}})}switch(t.status){case"fulfilled":return t.value;case"rejected":throw e=t.reason,Bg(e),e}throw Zs=t,Ro}}function Fs(e){try{var t=e._init;return t(e._payload)}catch(n){throw n!==null&&typeof n=="object"&&typeof n.then=="function"?(Zs=n,Ro):n}}var Zs=null;function Ig(){if(Zs===null)throw Error(gt(459));var e=Zs;return Zs=null,e}function Bg(e){if(e===Ro||e===df)throw Error(gt(483))}var eo=null,Rl=0;function lc(e){var t=Rl;return Rl+=1,eo===null&&(eo=[]),K_(eo,e,t)}function Io(e,t){t=t.props.ref,e.ref=t!==void 0?t:null}function cc(e,t){throw t.$$typeof===oM?Error(gt(525)):(e=Object.prototype.toString.call(t),Error(gt(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)))}function Q_(e){function t(f,v){if(e){var M=f.deletions;M===null?(f.deletions=[v],f.flags|=16):M.push(v)}}function n(f,v){if(!e)return null;for(;v!==null;)t(f,v),v=v.sibling;return null}function i(f){for(var v=new Map;f!==null;)f.key!==null?v.set(f.key,f):v.set(f.index,f),f=f.sibling;return v}function a(f,v){return f=La(f,v),f.index=0,f.sibling=null,f}function s(f,v,M){return f.index=M,e?(M=f.alternate,M!==null?(M=M.index,M<v?(f.flags|=67108866,v):M):(f.flags|=67108866,v)):(f.flags|=1048576,v)}function r(f){return e&&f.alternate===null&&(f.flags|=67108866),f}function o(f,v,M,y){return v===null||v.tag!==6?(v=Gf(M,f.mode,y),v.return=f,v):(v=a(v,M),v.return=f,v)}function l(f,v,M,y){var U=M.type;return U===zr?d(f,v,M.props.children,y,M.key):v!==null&&(v.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===ts&&Fs(U)===v.type)?(v=a(v,M.props),Io(v,M),v.return=f,v):(v=Jc(M.type,M.key,M.props,null,f.mode,y),Io(v,M),v.return=f,v)}function c(f,v,M,y){return v===null||v.tag!==4||v.stateNode.containerInfo!==M.containerInfo||v.stateNode.implementation!==M.implementation?(v=Vf(M,f.mode,y),v.return=f,v):(v=a(v,M.children||[]),v.return=f,v)}function d(f,v,M,y,U){return v===null||v.tag!==7?(v=Ys(M,f.mode,y,U),v.return=f,v):(v=a(v,M),v.return=f,v)}function h(f,v,M){if(typeof v=="string"&&v!==""||typeof v=="number"||typeof v=="bigint")return v=Gf(""+v,f.mode,M),v.return=f,v;if(typeof v=="object"&&v!==null){switch(v.$$typeof){case ec:return M=Jc(v.type,v.key,v.props,null,f.mode,M),Io(M,v),M.return=f,M;case Jo:return v=Vf(v,f.mode,M),v.return=f,v;case ts:return v=Fs(v),h(f,v,M)}if($o(v)||Oo(v))return v=Ys(v,f.mode,M,null),v.return=f,v;if(typeof v.then=="function")return h(f,lc(v),M);if(v.$$typeof===wa)return h(f,oc(f,v),M);cc(f,v)}return null}function u(f,v,M,y){var U=v!==null?v.key:null;if(typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint")return U!==null?null:o(f,v,""+M,y);if(typeof M=="object"&&M!==null){switch(M.$$typeof){case ec:return M.key===U?l(f,v,M,y):null;case Jo:return M.key===U?c(f,v,M,y):null;case ts:return M=Fs(M),u(f,v,M,y)}if($o(M)||Oo(M))return U!==null?null:d(f,v,M,y,null);if(typeof M.then=="function")return u(f,v,lc(M),y);if(M.$$typeof===wa)return u(f,v,oc(f,M),y);cc(f,M)}return null}function p(f,v,M,y,U){if(typeof y=="string"&&y!==""||typeof y=="number"||typeof y=="bigint")return f=f.get(M)||null,o(v,f,""+y,U);if(typeof y=="object"&&y!==null){switch(y.$$typeof){case ec:return f=f.get(y.key===null?M:y.key)||null,l(v,f,y,U);case Jo:return f=f.get(y.key===null?M:y.key)||null,c(v,f,y,U);case ts:return y=Fs(y),p(f,v,M,y,U)}if($o(y)||Oo(y))return f=f.get(M)||null,d(v,f,y,U,null);if(typeof y.then=="function")return p(f,v,M,lc(y),U);if(y.$$typeof===wa)return p(f,v,M,oc(v,y),U);cc(v,y)}return null}function g(f,v,M,y){for(var U=null,C=null,T=v,x=v=0,w=null;T!==null&&x<M.length;x++){T.index>x?(w=T,T=null):w=T.sibling;var D=u(f,T,M[x],y);if(D===null){T===null&&(T=w);break}e&&T&&D.alternate===null&&t(f,T),v=s(D,v,x),C===null?U=D:C.sibling=D,C=D,T=w}if(x===M.length)return n(f,T),Oe&&Aa(f,x),U;if(T===null){for(;x<M.length;x++)T=h(f,M[x],y),T!==null&&(v=s(T,v,x),C===null?U=T:C.sibling=T,C=T);return Oe&&Aa(f,x),U}for(T=i(T);x<M.length;x++)w=p(T,f,x,M[x],y),w!==null&&(e&&w.alternate!==null&&T.delete(w.key===null?x:w.key),v=s(w,v,x),C===null?U=w:C.sibling=w,C=w);return e&&T.forEach(function(O){return t(f,O)}),Oe&&Aa(f,x),U}function S(f,v,M,y){if(M==null)throw Error(gt(151));for(var U=null,C=null,T=v,x=v=0,w=null,D=M.next();T!==null&&!D.done;x++,D=M.next()){T.index>x?(w=T,T=null):w=T.sibling;var O=u(f,T,D.value,y);if(O===null){T===null&&(T=w);break}e&&T&&O.alternate===null&&t(f,T),v=s(O,v,x),C===null?U=O:C.sibling=O,C=O,T=w}if(D.done)return n(f,T),Oe&&Aa(f,x),U;if(T===null){for(;!D.done;x++,D=M.next())D=h(f,D.value,y),D!==null&&(v=s(D,v,x),C===null?U=D:C.sibling=D,C=D);return Oe&&Aa(f,x),U}for(T=i(T);!D.done;x++,D=M.next())D=p(T,f,x,D.value,y),D!==null&&(e&&D.alternate!==null&&T.delete(D.key===null?x:D.key),v=s(D,v,x),C===null?U=D:C.sibling=D,C=D);return e&&T.forEach(function(I){return t(f,I)}),Oe&&Aa(f,x),U}function m(f,v,M,y){if(typeof M=="object"&&M!==null&&M.type===zr&&M.key===null&&(M=M.props.children),typeof M=="object"&&M!==null){switch(M.$$typeof){case ec:t:{for(var U=M.key;v!==null;){if(v.key===U){if(U=M.type,U===zr){if(v.tag===7){n(f,v.sibling),y=a(v,M.props.children),y.return=f,f=y;break t}}else if(v.elementType===U||typeof U=="object"&&U!==null&&U.$$typeof===ts&&Fs(U)===v.type){n(f,v.sibling),y=a(v,M.props),Io(y,M),y.return=f,f=y;break t}n(f,v);break}else t(f,v);v=v.sibling}M.type===zr?(y=Ys(M.props.children,f.mode,y,M.key),y.return=f,f=y):(y=Jc(M.type,M.key,M.props,null,f.mode,y),Io(y,M),y.return=f,f=y)}return r(f);case Jo:t:{for(U=M.key;v!==null;){if(v.key===U)if(v.tag===4&&v.stateNode.containerInfo===M.containerInfo&&v.stateNode.implementation===M.implementation){n(f,v.sibling),y=a(v,M.children||[]),y.return=f,f=y;break t}else{n(f,v);break}else t(f,v);v=v.sibling}y=Vf(M,f.mode,y),y.return=f,f=y}return r(f);case ts:return M=Fs(M),m(f,v,M,y)}if($o(M))return g(f,v,M,y);if(Oo(M)){if(U=Oo(M),typeof U!="function")throw Error(gt(150));return M=U.call(M),S(f,v,M,y)}if(typeof M.then=="function")return m(f,v,lc(M),y);if(M.$$typeof===wa)return m(f,v,oc(f,M),y);cc(f,M)}return typeof M=="string"&&M!==""||typeof M=="number"||typeof M=="bigint"?(M=""+M,v!==null&&v.tag===6?(n(f,v.sibling),y=a(v,M),y.return=f,f=y):(n(f,v),y=Gf(M,f.mode,y),y.return=f,f=y),r(f)):n(f,v)}return function(f,v,M,y){try{Rl=0;var U=m(f,v,M,y);return eo=null,U}catch(T){if(T===Ro||T===df)throw T;var C=hi(29,T,null,f.mode);return C.lanes=y,C.return=f,C}finally{}}}var tr=Q_(!0),J_=Q_(!1),es=!1;function om(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mh(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function gs(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function vs(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,He&2){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,t=Eu(e),k_(e,null,n),t}return ff(e,i,t,n),Eu(e)}function fl(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194048)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,g_(e,n)}}function Xf(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var r={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};s===null?a=s=r:s=s.next=r,n=n.next}while(n!==null);s===null?a=s=t:s=s.next=t}else a=s=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:s,shared:i.shared,callbacks:i.callbacks},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var gh=!1;function dl(){if(gh){var e=to;if(e!==null)throw e}}function hl(e,t,n,i){gh=!1;var a=e.updateQueue;es=!1;var s=a.firstBaseUpdate,r=a.lastBaseUpdate,o=a.shared.pending;if(o!==null){a.shared.pending=null;var l=o,c=l.next;l.next=null,r===null?s=c:r.next=c,r=l;var d=e.alternate;d!==null&&(d=d.updateQueue,o=d.lastBaseUpdate,o!==r&&(o===null?d.firstBaseUpdate=c:o.next=c,d.lastBaseUpdate=l))}if(s!==null){var h=a.baseState;r=0,d=c=l=null,o=s;do{var u=o.lane&-536870913,p=u!==o.lane;if(p?(De&u)===u:(i&u)===u){u!==0&&u===co&&(gh=!0),d!==null&&(d=d.next={lane:0,tag:o.tag,payload:o.payload,callback:null,next:null});t:{var g=e,S=o;u=t;var m=n;switch(S.tag){case 1:if(g=S.payload,typeof g=="function"){h=g.call(m,h,u);break t}h=g;break t;case 3:g.flags=g.flags&-65537|128;case 0:if(g=S.payload,u=typeof g=="function"?g.call(m,h,u):g,u==null)break t;h=on({},h,u);break t;case 2:es=!0}}u=o.callback,u!==null&&(e.flags|=64,p&&(e.flags|=8192),p=a.callbacks,p===null?a.callbacks=[u]:p.push(u))}else p={lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},d===null?(c=d=p,l=h):d=d.next=p,r|=u;if(o=o.next,o===null){if(o=a.shared.pending,o===null)break;p=o,o=p.next,p.next=null,a.lastBaseUpdate=p,a.shared.pending=null}}while(!0);d===null&&(l=h),a.baseState=l,a.firstBaseUpdate=c,a.lastBaseUpdate=d,s===null&&(a.shared.lanes=0),As|=r,e.lanes=r,e.memoizedState=h}}function $_(e,t){if(typeof e!="function")throw Error(gt(191,e));e.call(t)}function tx(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)$_(n[e],t)}var uo=fa(null),Cu=fa(0);function Fg(e,t){e=Va,en(Cu,e),en(uo,t),Va=e|t.baseLanes}function vh(){en(Cu,Va),en(uo,uo.current)}function lm(){Va=Cu.current,wn(uo),wn(Cu)}var yi=fa(null),zi=null;function is(e){var t=e.alternate;en(dn,dn.current&1),en(yi,e),zi===null&&(t===null||uo.current!==null||t.memoizedState!==null)&&(zi=e)}function _h(e){en(dn,dn.current),en(yi,e),zi===null&&(zi=e)}function ex(e){e.tag===22?(en(dn,dn.current),en(yi,e),zi===null&&(zi=e)):as()}function as(){en(dn,dn.current),en(yi,yi.current)}function di(e){wn(yi),zi===e&&(zi=null),wn(dn)}var dn=fa(0);function wu(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||Ih(n)||Bh(n)))return t}else if(t.tag===19&&(t.memoizedProps.revealOrder==="forwards"||t.memoizedProps.revealOrder==="backwards"||t.memoizedProps.revealOrder==="unstable_legacy-backwards"||t.memoizedProps.revealOrder==="together")){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Fa=0,ge=null,Je=null,gn=null,Du=!1,no=!1,er=!1,Nu=0,Cl=0,io=null,Mb=0;function cn(){throw Error(gt(321))}function cm(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!xi(e[n],t[n]))return!1;return!0}function um(e,t,n,i,a,s){return Fa=s,ge=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,ue.H=e===null||e.memoizedState===null?Ux:Sm,er=!1,s=n(i,a),er=!1,no&&(s=ix(t,n,i,a)),nx(e),s}function nx(e){ue.H=wl;var t=Je!==null&&Je.next!==null;if(Fa=0,gn=Je=ge=null,Du=!1,Cl=0,io=null,t)throw Error(gt(300));e===null||xn||(e=e.dependencies,e!==null&&Au(e)&&(xn=!0))}function ix(e,t,n,i){ge=e;var a=0;do{if(no&&(io=null),Cl=0,no=!1,25<=a)throw Error(gt(301));if(a+=1,gn=Je=null,e.updateQueue!=null){var s=e.updateQueue;s.lastEffect=null,s.events=null,s.stores=null,s.memoCache!=null&&(s.memoCache.index=0)}ue.H=Lx,s=t(n,i)}while(no);return s}function bb(){var e=ue.H,t=e.useState()[0];return t=typeof t.then=="function"?ql(t):t,e=e.useState()[0],(Je!==null?Je.memoizedState:null)!==e&&(ge.flags|=1024),t}function fm(){var e=Nu!==0;return Nu=0,e}function dm(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function hm(e){if(Du){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Du=!1}Fa=0,gn=Je=ge=null,no=!1,Cl=Nu=0,io=null}function qn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return gn===null?ge.memoizedState=gn=e:gn=gn.next=e,gn}function pn(){if(Je===null){var e=ge.alternate;e=e!==null?e.memoizedState:null}else e=Je.next;var t=gn===null?ge.memoizedState:gn.next;if(t!==null)gn=t,Je=e;else{if(e===null)throw ge.alternate===null?Error(gt(467)):Error(gt(310));Je=e,e={memoizedState:Je.memoizedState,baseState:Je.baseState,baseQueue:Je.baseQueue,queue:Je.queue,next:null},gn===null?ge.memoizedState=gn=e:gn=gn.next=e}return gn}function hf(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ql(e){var t=Cl;return Cl+=1,io===null&&(io=[]),e=K_(io,e,t),t=ge,(gn===null?t.memoizedState:gn.next)===null&&(t=t.alternate,ue.H=t===null||t.memoizedState===null?Ux:Sm),e}function pf(e){if(e!==null&&typeof e=="object"){if(typeof e.then=="function")return ql(e);if(e.$$typeof===wa)return zn(e)}throw Error(gt(438,String(e)))}function pm(e){var t=null,n=ge.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var i=ge.alternate;i!==null&&(i=i.updateQueue,i!==null&&(i=i.memoCache,i!=null&&(t={data:i.data.map(function(a){return a.slice()}),index:0})))}if(t==null&&(t={data:[],index:0}),n===null&&(n=hf(),ge.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),i=0;i<e;i++)n[i]=lM;return t.index++,n}function Ha(e,t){return typeof t=="function"?t(e):t}function tu(e){var t=pn();return mm(t,Je,e)}function mm(e,t,n){var i=e.queue;if(i===null)throw Error(gt(311));i.lastRenderedReducer=n;var a=e.baseQueue,s=i.pending;if(s!==null){if(a!==null){var r=a.next;a.next=s.next,s.next=r}t.baseQueue=a=s,i.pending=null}if(s=e.baseState,a===null)e.memoizedState=s;else{t=a.next;var o=r=null,l=null,c=t,d=!1;do{var h=c.lane&-536870913;if(h!==c.lane?(De&h)===h:(Fa&h)===h){var u=c.revertLane;if(u===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),h===co&&(d=!0);else if((Fa&u)===u){c=c.next,u===co&&(d=!0);continue}else h={lane:0,revertLane:c.revertLane,gesture:null,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=h,r=s):l=l.next=h,ge.lanes|=u,As|=u;h=c.action,er&&n(s,h),s=c.hasEagerState?c.eagerState:n(s,h)}else u={lane:h,revertLane:c.revertLane,gesture:c.gesture,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null},l===null?(o=l=u,r=s):l=l.next=u,ge.lanes|=h,As|=h;c=c.next}while(c!==null&&c!==t);if(l===null?r=s:l.next=o,!xi(s,e.memoizedState)&&(xn=!0,d&&(n=to,n!==null)))throw n;e.memoizedState=s,e.baseState=r,e.baseQueue=l,i.lastRenderedState=s}return a===null&&(i.lanes=0),[e.memoizedState,i.dispatch]}function Wf(e){var t=pn(),n=t.queue;if(n===null)throw Error(gt(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,s=t.memoizedState;if(a!==null){n.pending=null;var r=a=a.next;do s=e(s,r.action),r=r.next;while(r!==a);xi(s,t.memoizedState)||(xn=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,i]}function ax(e,t,n){var i=ge,a=pn(),s=Oe;if(s){if(n===void 0)throw Error(gt(407));n=n()}else n=t();var r=!xi((Je||a).memoizedState,n);if(r&&(a.memoizedState=n,xn=!0),a=a.queue,gm(ox.bind(null,i,a,e),[e]),a.getSnapshot!==t||r||gn!==null&&gn.memoizedState.tag&1){if(i.flags|=2048,fo(9,{destroy:void 0},rx.bind(null,i,a,n,t),null),$e===null)throw Error(gt(349));s||Fa&127||sx(i,t,n)}return n}function sx(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=ge.updateQueue,t===null?(t=hf(),ge.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function rx(e,t,n,i){t.value=n,t.getSnapshot=i,lx(t)&&cx(e)}function ox(e,t,n){return n(function(){lx(t)&&cx(e)})}function lx(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!xi(e,n)}catch{return!0}}function cx(e){var t=ur(e,2);t!==null&&ai(t,e,2)}function xh(e){var t=qn();if(typeof e=="function"){var n=e;if(e=n(),er){os(!0);try{n()}finally{os(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:e},t}function ux(e,t,n,i){return e.baseState=n,mm(e,Je,typeof i=="function"?i:Ha)}function Eb(e,t,n,i,a){if(gf(e))throw Error(gt(485));if(e=t.action,e!==null){var s={payload:a,action:e,next:null,isTransition:!0,status:"pending",value:null,reason:null,listeners:[],then:function(r){s.listeners.push(r)}};ue.T!==null?n(!0):s.isTransition=!1,i(s),n=t.pending,n===null?(s.next=t.pending=s,fx(t,s)):(s.next=n.next,t.pending=n.next=s)}}function fx(e,t){var n=t.action,i=t.payload,a=e.state;if(t.isTransition){var s=ue.T,r={};ue.T=r;try{var o=n(a,i),l=ue.S;l!==null&&l(r,o),Hg(e,t,o)}catch(c){yh(e,t,c)}finally{s!==null&&r.types!==null&&(s.types=r.types),ue.T=s}}else try{s=n(a,i),Hg(e,t,s)}catch(c){yh(e,t,c)}}function Hg(e,t,n){n!==null&&typeof n=="object"&&typeof n.then=="function"?n.then(function(i){Gg(e,t,i)},function(i){return yh(e,t,i)}):Gg(e,t,n)}function Gg(e,t,n){t.status="fulfilled",t.value=n,dx(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,fx(e,n)))}function yh(e,t,n){var i=e.pending;if(e.pending=null,i!==null){i=i.next;do t.status="rejected",t.reason=n,dx(t),t=t.next;while(t!==i)}e.action=null}function dx(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function hx(e,t){return t}function Vg(e,t){if(Oe){var n=$e.formState;if(n!==null){t:{var i=ge;if(Oe){if(sn){e:{for(var a=sn,s=Li;a.nodeType!==8;){if(!s){a=null;break e}if(a=Ii(a.nextSibling),a===null){a=null;break e}}s=a.data,a=s==="F!"||s==="F"?a:null}if(a){sn=Ii(a.nextSibling),i=a.data==="F!";break t}}Es(i)}i=!1}i&&(t=n[0])}}return n=qn(),n.memoizedState=n.baseState=t,i={pending:null,lanes:0,dispatch:null,lastRenderedReducer:hx,lastRenderedState:t},n.queue=i,n=wx.bind(null,ge,i),i.dispatch=n,i=xh(!1),s=ym.bind(null,ge,!1,i.queue),i=qn(),a={state:t,dispatch:null,action:e,pending:null},i.queue=a,n=Eb.bind(null,ge,a,s,n),a.dispatch=n,i.memoizedState=e,[t,n,!1]}function kg(e){var t=pn();return px(t,Je,e)}function px(e,t,n){if(t=mm(e,t,hx)[0],e=tu(Ha)[0],typeof t=="object"&&t!==null&&typeof t.then=="function")try{var i=ql(t)}catch(r){throw r===Ro?df:r}else i=t;t=pn();var a=t.queue,s=a.dispatch;return n!==t.memoizedState&&(ge.flags|=2048,fo(9,{destroy:void 0},Tb.bind(null,a,n),null)),[i,s,e]}function Tb(e,t){e.action=t}function Xg(e){var t=pn(),n=Je;if(n!==null)return px(t,n,e);pn(),t=t.memoizedState,n=pn();var i=n.queue.dispatch;return n.memoizedState=e,[t,i,!1]}function fo(e,t,n,i){return e={tag:e,create:n,deps:i,inst:t,next:null},t=ge.updateQueue,t===null&&(t=hf(),ge.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e),e}function mx(){return pn().memoizedState}function eu(e,t,n,i){var a=qn();ge.flags|=e,a.memoizedState=fo(1|t,{destroy:void 0},n,i===void 0?null:i)}function mf(e,t,n,i){var a=pn();i=i===void 0?null:i;var s=a.memoizedState.inst;Je!==null&&i!==null&&cm(i,Je.memoizedState.deps)?a.memoizedState=fo(t,s,n,i):(ge.flags|=e,a.memoizedState=fo(1|t,s,n,i))}function Wg(e,t){eu(8390656,8,e,t)}function gm(e,t){mf(2048,8,e,t)}function Ab(e){ge.flags|=4;var t=ge.updateQueue;if(t===null)t=hf(),ge.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function gx(e){var t=pn().memoizedState;return Ab({ref:t,nextImpl:e}),function(){if(He&2)throw Error(gt(440));return t.impl.apply(void 0,arguments)}}function vx(e,t){return mf(4,2,e,t)}function _x(e,t){return mf(4,4,e,t)}function xx(e,t){if(typeof t=="function"){e=e();var n=t(e);return function(){typeof n=="function"?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function yx(e,t,n){n=n!=null?n.concat([e]):null,mf(4,4,xx.bind(null,t,e),n)}function vm(){}function Sx(e,t){var n=pn();t=t===void 0?null:t;var i=n.memoizedState;return t!==null&&cm(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function Mx(e,t){var n=pn();t=t===void 0?null:t;var i=n.memoizedState;if(t!==null&&cm(t,i[1]))return i[0];if(i=e(),er){os(!0);try{e()}finally{os(!1)}}return n.memoizedState=[i,t],i}function _m(e,t,n){return n===void 0||Fa&1073741824&&!(De&261930)?e.memoizedState=t:(e.memoizedState=n,e=uy(),ge.lanes|=e,As|=e,n)}function bx(e,t,n,i){return xi(n,t)?n:uo.current!==null?(e=_m(e,n,i),xi(e,t)||(xn=!0),e):!(Fa&42)||Fa&1073741824&&!(De&261930)?(xn=!0,e.memoizedState=n):(e=uy(),ge.lanes|=e,As|=e,t)}function Ex(e,t,n,i,a){var s=Ge.p;Ge.p=s!==0&&8>s?s:8;var r=ue.T,o={};ue.T=o,ym(e,!1,t,n);try{var l=a(),c=ue.S;if(c!==null&&c(o,l),l!==null&&typeof l=="object"&&typeof l.then=="function"){var d=Sb(l,i);pl(e,t,d,_i(e))}else pl(e,t,i,_i(e))}catch(h){pl(e,t,{then:function(){},status:"rejected",reason:h},_i())}finally{Ge.p=s,r!==null&&o.types!==null&&(r.types=o.types),ue.T=r}}function Rb(){}function Sh(e,t,n,i){if(e.tag!==5)throw Error(gt(476));var a=Tx(e).queue;Ex(e,a,t,qs,n===null?Rb:function(){return Ax(e),n(i)})}function Tx(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:qs,baseState:qs,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:qs},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ha,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function Ax(e){var t=Tx(e);t.next===null&&(t=e.alternate.memoizedState),pl(e,t.next.queue,{},_i())}function xm(){return zn(Ul)}function Rx(){return pn().memoizedState}function Cx(){return pn().memoizedState}function Cb(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=_i();e=gs(n);var i=vs(t,e,n);i!==null&&(ai(i,t,n),fl(i,t,n)),t={cache:am()},e.payload=t;return}t=t.return}}function wb(e,t,n){var i=_i();n={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},gf(e)?Dx(t,n):(n=tm(e,t,n,i),n!==null&&(ai(n,e,i),Nx(n,t,i)))}function wx(e,t,n){var i=_i();pl(e,t,n,i)}function pl(e,t,n,i){var a={lane:i,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(gf(e))Dx(t,a);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var r=t.lastRenderedState,o=s(r,n);if(a.hasEagerState=!0,a.eagerState=o,xi(o,r))return ff(e,t,a,0),$e===null&&uf(),!1}catch{}finally{}if(n=tm(e,t,a,i),n!==null)return ai(n,e,i),Nx(n,t,i),!0}return!1}function ym(e,t,n,i){if(i={lane:2,revertLane:wm(),gesture:null,action:i,hasEagerState:!1,eagerState:null,next:null},gf(e)){if(t)throw Error(gt(479))}else t=tm(e,n,i,2),t!==null&&ai(t,e,2)}function gf(e){var t=e.alternate;return e===ge||t!==null&&t===ge}function Dx(e,t){no=Du=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function Nx(e,t,n){if(n&4194048){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,g_(e,n)}}var wl={readContext:zn,use:pf,useCallback:cn,useContext:cn,useEffect:cn,useImperativeHandle:cn,useLayoutEffect:cn,useInsertionEffect:cn,useMemo:cn,useReducer:cn,useRef:cn,useState:cn,useDebugValue:cn,useDeferredValue:cn,useTransition:cn,useSyncExternalStore:cn,useId:cn,useHostTransitionStatus:cn,useFormState:cn,useActionState:cn,useOptimistic:cn,useMemoCache:cn,useCacheRefresh:cn};wl.useEffectEvent=cn;var Ux={readContext:zn,use:pf,useCallback:function(e,t){return qn().memoizedState=[e,t===void 0?null:t],e},useContext:zn,useEffect:Wg,useImperativeHandle:function(e,t,n){n=n!=null?n.concat([e]):null,eu(4194308,4,xx.bind(null,t,e),n)},useLayoutEffect:function(e,t){return eu(4194308,4,e,t)},useInsertionEffect:function(e,t){eu(4,2,e,t)},useMemo:function(e,t){var n=qn();t=t===void 0?null:t;var i=e();if(er){os(!0);try{e()}finally{os(!1)}}return n.memoizedState=[i,t],i},useReducer:function(e,t,n){var i=qn();if(n!==void 0){var a=n(t);if(er){os(!0);try{n(t)}finally{os(!1)}}}else a=t;return i.memoizedState=i.baseState=a,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:a},i.queue=e,e=e.dispatch=wb.bind(null,ge,e),[i.memoizedState,e]},useRef:function(e){var t=qn();return e={current:e},t.memoizedState=e},useState:function(e){e=xh(e);var t=e.queue,n=wx.bind(null,ge,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:vm,useDeferredValue:function(e,t){var n=qn();return _m(n,e,t)},useTransition:function(){var e=xh(!1);return e=Ex.bind(null,ge,e.queue,!0,!1),qn().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var i=ge,a=qn();if(Oe){if(n===void 0)throw Error(gt(407));n=n()}else{if(n=t(),$e===null)throw Error(gt(349));De&127||sx(i,t,n)}a.memoizedState=n;var s={value:n,getSnapshot:t};return a.queue=s,Wg(ox.bind(null,i,s,e),[e]),i.flags|=2048,fo(9,{destroy:void 0},rx.bind(null,i,s,n,t),null),n},useId:function(){var e=qn(),t=$e.identifierPrefix;if(Oe){var n=aa,i=ia;n=(i&~(1<<32-vi(i)-1)).toString(32)+n,t="_"+t+"R_"+n,n=Nu++,0<n&&(t+="H"+n.toString(32)),t+="_"}else n=Mb++,t="_"+t+"r_"+n.toString(32)+"_";return e.memoizedState=t},useHostTransitionStatus:xm,useFormState:Vg,useActionState:Vg,useOptimistic:function(e){var t=qn();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=ym.bind(null,ge,!0,n),n.dispatch=t,[e,t]},useMemoCache:pm,useCacheRefresh:function(){return qn().memoizedState=Cb.bind(null,ge)},useEffectEvent:function(e){var t=qn(),n={impl:e};return t.memoizedState=n,function(){if(He&2)throw Error(gt(440));return n.impl.apply(void 0,arguments)}}},Sm={readContext:zn,use:pf,useCallback:Sx,useContext:zn,useEffect:gm,useImperativeHandle:yx,useInsertionEffect:vx,useLayoutEffect:_x,useMemo:Mx,useReducer:tu,useRef:mx,useState:function(){return tu(Ha)},useDebugValue:vm,useDeferredValue:function(e,t){var n=pn();return bx(n,Je.memoizedState,e,t)},useTransition:function(){var e=tu(Ha)[0],t=pn().memoizedState;return[typeof e=="boolean"?e:ql(e),t]},useSyncExternalStore:ax,useId:Rx,useHostTransitionStatus:xm,useFormState:kg,useActionState:kg,useOptimistic:function(e,t){var n=pn();return ux(n,Je,e,t)},useMemoCache:pm,useCacheRefresh:Cx};Sm.useEffectEvent=gx;var Lx={readContext:zn,use:pf,useCallback:Sx,useContext:zn,useEffect:gm,useImperativeHandle:yx,useInsertionEffect:vx,useLayoutEffect:_x,useMemo:Mx,useReducer:Wf,useRef:mx,useState:function(){return Wf(Ha)},useDebugValue:vm,useDeferredValue:function(e,t){var n=pn();return Je===null?_m(n,e,t):bx(n,Je.memoizedState,e,t)},useTransition:function(){var e=Wf(Ha)[0],t=pn().memoizedState;return[typeof e=="boolean"?e:ql(e),t]},useSyncExternalStore:ax,useId:Rx,useHostTransitionStatus:xm,useFormState:Xg,useActionState:Xg,useOptimistic:function(e,t){var n=pn();return Je!==null?ux(n,Je,e,t):(n.baseState=e,[e,n.queue.dispatch])},useMemoCache:pm,useCacheRefresh:Cx};Lx.useEffectEvent=gx;function qf(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:on({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var Mh={enqueueSetState:function(e,t,n){e=e._reactInternals;var i=_i(),a=gs(i);a.payload=t,n!=null&&(a.callback=n),t=vs(e,a,i),t!==null&&(ai(t,e,i),fl(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=_i(),a=gs(i);a.tag=1,a.payload=t,n!=null&&(a.callback=n),t=vs(e,a,i),t!==null&&(ai(t,e,i),fl(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=_i(),i=gs(n);i.tag=2,t!=null&&(i.callback=t),t=vs(e,i,n),t!==null&&(ai(t,e,n),fl(t,e,n))}};function qg(e,t,n,i,a,s,r){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,s,r):t.prototype&&t.prototype.isPureReactComponent?!El(n,i)||!El(a,s):!0}function Yg(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&Mh.enqueueReplaceState(t,t.state,null)}function nr(e,t){var n=t;if("ref"in t){n={};for(var i in t)i!=="ref"&&(n[i]=t[i])}if(e=e.defaultProps){n===t&&(n=on({},n));for(var a in e)n[a]===void 0&&(n[a]=e[a])}return n}function Ox(e){bu(e)}function Px(e){console.error(e)}function zx(e){bu(e)}function Uu(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(i){setTimeout(function(){throw i})}}function jg(e,t,n){try{var i=e.onCaughtError;i(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(a){setTimeout(function(){throw a})}}function bh(e,t,n){return n=gs(n),n.tag=3,n.payload={element:null},n.callback=function(){Uu(e,t)},n}function Ix(e){return e=gs(e),e.tag=3,e}function Bx(e,t,n,i){var a=n.type.getDerivedStateFromError;if(typeof a=="function"){var s=i.value;e.payload=function(){return a(s)},e.callback=function(){jg(t,n,i)}}var r=n.stateNode;r!==null&&typeof r.componentDidCatch=="function"&&(e.callback=function(){jg(t,n,i),typeof a!="function"&&(_s===null?_s=new Set([this]):_s.add(this));var o=i.stack;this.componentDidCatch(i.value,{componentStack:o!==null?o:""})})}function Db(e,t,n,i,a){if(n.flags|=32768,i!==null&&typeof i=="object"&&typeof i.then=="function"){if(t=n.alternate,t!==null&&Ao(t,n,a,!0),n=yi.current,n!==null){switch(n.tag){case 31:case 13:return zi===null?Iu():n.alternate===null&&un===0&&(un=3),n.flags&=-257,n.flags|=65536,n.lanes=a,i===Ru?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([i]):t.add(i),id(e,i,a)),!1;case 22:return n.flags|=65536,i===Ru?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([i])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([i]):n.add(i)),id(e,i,a)),!1}throw Error(gt(435,n.tag))}return id(e,i,a),Iu(),!1}if(Oe)return t=yi.current,t!==null?(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,i!==uh&&(e=Error(gt(422),{cause:i}),Al(Ui(e,n)))):(i!==uh&&(t=Error(gt(423),{cause:i}),Al(Ui(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,i=Ui(i,n),a=bh(e.stateNode,i,a),Xf(e,a),un!==4&&(un=2)),!1;var s=Error(gt(520),{cause:i});if(s=Ui(s,n),vl===null?vl=[s]:vl.push(s),un!==4&&(un=2),t===null)return!0;i=Ui(i,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=bh(n.stateNode,i,e),Xf(n,e),!1;case 1:if(t=n.type,s=n.stateNode,(n.flags&128)===0&&(typeof t.getDerivedStateFromError=="function"||s!==null&&typeof s.componentDidCatch=="function"&&(_s===null||!_s.has(s))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ix(a),Bx(a,e,n,i),Xf(n,a),!1}n=n.return}while(n!==null);return!1}var Mm=Error(gt(461)),xn=!1;function Ln(e,t,n,i){t.child=e===null?J_(t,null,n,i):tr(t,e.child,n,i)}function Zg(e,t,n,i,a){n=n.render;var s=t.ref;if("ref"in i){var r={};for(var o in i)o!=="ref"&&(r[o]=i[o])}else r=i;return $s(t),i=um(e,t,n,r,s,a),o=fm(),e!==null&&!xn?(dm(e,t,a),Ga(e,t,a)):(Oe&&o&&nm(t),t.flags|=1,Ln(e,t,i,a),t.child)}function Kg(e,t,n,i,a){if(e===null){var s=n.type;return typeof s=="function"&&!em(s)&&s.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=s,Fx(e,t,s,i,a)):(e=Jc(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!bm(e,a)){var r=s.memoizedProps;if(n=n.compare,n=n!==null?n:El,n(r,i)&&e.ref===t.ref)return Ga(e,t,a)}return t.flags|=1,e=La(s,i),e.ref=t.ref,e.return=t,t.child=e}function Fx(e,t,n,i,a){if(e!==null){var s=e.memoizedProps;if(El(s,i)&&e.ref===t.ref)if(xn=!1,t.pendingProps=i=s,bm(e,a))e.flags&131072&&(xn=!0);else return t.lanes=e.lanes,Ga(e,t,a)}return Eh(e,t,n,i,a)}function Hx(e,t,n,i){var a=i.children,s=e!==null?e.memoizedState:null;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),i.mode==="hidden"){if(t.flags&128){if(s=s!==null?s.baseLanes|n:n,e!==null){for(i=t.child=e.child,a=0;i!==null;)a=a|i.lanes|i.childLanes,i=i.sibling;i=a&~s}else i=0,t.child=null;return Qg(e,t,s,n,i)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&$c(t,s!==null?s.cachePool:null),s!==null?Fg(t,s):vh(),ex(t);else return i=t.lanes=536870912,Qg(e,t,s!==null?s.baseLanes|n:n,n,i)}else s!==null?($c(t,s.cachePool),Fg(t,s),as(),t.memoizedState=null):(e!==null&&$c(t,null),vh(),as());return Ln(e,t,a,n),t.child}function el(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Qg(e,t,n,i,a){var s=sm();return s=s===null?null:{parent:_n._currentValue,pool:s},t.memoizedState={baseLanes:n,cachePool:s},e!==null&&$c(t,null),vh(),ex(t),e!==null&&Ao(e,t,i,!0),t.childLanes=a,null}function nu(e,t){return t=Lu({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Jg(e,t,n){return tr(t,e.child,null,n),e=nu(t,t.pendingProps),e.flags|=2,di(t),t.memoizedState=null,e}function Nb(e,t,n){var i=t.pendingProps,a=(t.flags&128)!==0;if(t.flags&=-129,e===null){if(Oe){if(i.mode==="hidden")return e=nu(t,i),t.lanes=536870912,el(null,e);if(_h(t),(e=sn)?(e=Uy(e,Li),e=e!==null&&e.data==="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=W_(e),n.return=t,t.child=n,Pn=t,sn=null)):e=null,e===null)throw Es(t);return t.lanes=536870912,null}return nu(t,i)}var s=e.memoizedState;if(s!==null){var r=s.dehydrated;if(_h(t),a)if(t.flags&256)t.flags&=-257,t=Jg(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(gt(558));else if(xn||Ao(e,t,n,!1),a=(n&e.childLanes)!==0,xn||a){if(i=$e,i!==null&&(r=v_(i,n),r!==0&&r!==s.retryLane))throw s.retryLane=r,ur(e,r),ai(i,e,r),Mm;Iu(),t=Jg(e,t,n)}else e=s.treeContext,sn=Ii(r.nextSibling),Pn=t,Oe=!0,ms=null,Li=!1,e!==null&&Y_(t,e),t=nu(t,i),t.flags|=4096;return t}return e=La(e.child,{mode:i.mode,children:i.children}),e.ref=t.ref,t.child=e,e.return=t,e}function iu(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!="function"&&typeof n!="object")throw Error(gt(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Eh(e,t,n,i,a){return $s(t),n=um(e,t,n,i,void 0,a),i=fm(),e!==null&&!xn?(dm(e,t,a),Ga(e,t,a)):(Oe&&i&&nm(t),t.flags|=1,Ln(e,t,n,a),t.child)}function $g(e,t,n,i,a,s){return $s(t),t.updateQueue=null,n=ix(t,i,n,a),nx(e),i=fm(),e!==null&&!xn?(dm(e,t,s),Ga(e,t,s)):(Oe&&i&&nm(t),t.flags|=1,Ln(e,t,n,s),t.child)}function t0(e,t,n,i,a){if($s(t),t.stateNode===null){var s=Xr,r=n.contextType;typeof r=="object"&&r!==null&&(s=zn(r)),s=new n(i,s),t.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,s.updater=Mh,t.stateNode=s,s._reactInternals=t,s=t.stateNode,s.props=i,s.state=t.memoizedState,s.refs={},om(t),r=n.contextType,s.context=typeof r=="object"&&r!==null?zn(r):Xr,s.state=t.memoizedState,r=n.getDerivedStateFromProps,typeof r=="function"&&(qf(t,n,r,i),s.state=t.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(r=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),r!==s.state&&Mh.enqueueReplaceState(s,s.state,null),hl(t,i,s,a),dl(),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!0}else if(e===null){s=t.stateNode;var o=t.memoizedProps,l=nr(n,o);s.props=l;var c=s.context,d=n.contextType;r=Xr,typeof d=="object"&&d!==null&&(r=zn(d));var h=n.getDerivedStateFromProps;d=typeof h=="function"||typeof s.getSnapshotBeforeUpdate=="function",o=t.pendingProps!==o,d||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(o||c!==r)&&Yg(t,s,i,r),es=!1;var u=t.memoizedState;s.state=u,hl(t,i,s,a),dl(),c=t.memoizedState,o||u!==c||es?(typeof h=="function"&&(qf(t,n,h,i),c=t.memoizedState),(l=es||qg(t,n,l,i,u,c,r))?(d||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount()),typeof s.componentDidMount=="function"&&(t.flags|=4194308)):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=c),s.props=i,s.state=c,s.context=r,i=l):(typeof s.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{s=t.stateNode,mh(e,t),r=t.memoizedProps,d=nr(n,r),s.props=d,h=t.pendingProps,u=s.context,c=n.contextType,l=Xr,typeof c=="object"&&c!==null&&(l=zn(c)),o=n.getDerivedStateFromProps,(c=typeof o=="function"||typeof s.getSnapshotBeforeUpdate=="function")||typeof s.UNSAFE_componentWillReceiveProps!="function"&&typeof s.componentWillReceiveProps!="function"||(r!==h||u!==l)&&Yg(t,s,i,l),es=!1,u=t.memoizedState,s.state=u,hl(t,i,s,a),dl();var p=t.memoizedState;r!==h||u!==p||es||e!==null&&e.dependencies!==null&&Au(e.dependencies)?(typeof o=="function"&&(qf(t,n,o,i),p=t.memoizedState),(d=es||qg(t,n,d,i,u,p,l)||e!==null&&e.dependencies!==null&&Au(e.dependencies))?(c||typeof s.UNSAFE_componentWillUpdate!="function"&&typeof s.componentWillUpdate!="function"||(typeof s.componentWillUpdate=="function"&&s.componentWillUpdate(i,p,l),typeof s.UNSAFE_componentWillUpdate=="function"&&s.UNSAFE_componentWillUpdate(i,p,l)),typeof s.componentDidUpdate=="function"&&(t.flags|=4),typeof s.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=p),s.props=i,s.state=p,s.context=l,i=d):(typeof s.componentDidUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=4),typeof s.getSnapshotBeforeUpdate!="function"||r===e.memoizedProps&&u===e.memoizedState||(t.flags|=1024),i=!1)}return s=i,iu(e,t),i=(t.flags&128)!==0,s||i?(s=t.stateNode,n=i&&typeof n.getDerivedStateFromError!="function"?null:s.render(),t.flags|=1,e!==null&&i?(t.child=tr(t,e.child,null,a),t.child=tr(t,null,n,a)):Ln(e,t,n,a),t.memoizedState=s.state,e=t.child):e=Ga(e,t,a),e}function e0(e,t,n,i){return Js(),t.flags|=256,Ln(e,t,n,i),t.child}var Yf={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function jf(e){return{baseLanes:e,cachePool:Z_()}}function Zf(e,t,n){return e=e!==null?e.childLanes&~n:0,t&&(e|=pi),e}function Gx(e,t,n){var i=t.pendingProps,a=!1,s=(t.flags&128)!==0,r;if((r=s)||(r=e!==null&&e.memoizedState===null?!1:(dn.current&2)!==0),r&&(a=!0,t.flags&=-129),r=(t.flags&32)!==0,t.flags&=-33,e===null){if(Oe){if(a?is(t):as(),(e=sn)?(e=Uy(e,Li),e=e!==null&&e.data!=="&"?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:bs!==null?{id:ia,overflow:aa}:null,retryLane:536870912,hydrationErrors:null},n=W_(e),n.return=t,t.child=n,Pn=t,sn=null)):e=null,e===null)throw Es(t);return Bh(e)?t.lanes=32:t.lanes=536870912,null}var o=i.children;return i=i.fallback,a?(as(),a=t.mode,o=Lu({mode:"hidden",children:o},a),i=Ys(i,a,n,null),o.return=t,i.return=t,o.sibling=i,t.child=o,i=t.child,i.memoizedState=jf(n),i.childLanes=Zf(e,r,n),t.memoizedState=Yf,el(null,i)):(is(t),Th(t,o))}var l=e.memoizedState;if(l!==null&&(o=l.dehydrated,o!==null)){if(s)t.flags&256?(is(t),t.flags&=-257,t=Kf(e,t,n)):t.memoizedState!==null?(as(),t.child=e.child,t.flags|=128,t=null):(as(),o=i.fallback,a=t.mode,i=Lu({mode:"visible",children:i.children},a),o=Ys(o,a,n,null),o.flags|=2,i.return=t,o.return=t,i.sibling=o,t.child=i,tr(t,e.child,null,n),i=t.child,i.memoizedState=jf(n),i.childLanes=Zf(e,r,n),t.memoizedState=Yf,t=el(null,i));else if(is(t),Bh(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var c=r.dgst;r=c,i=Error(gt(419)),i.stack="",i.digest=r,Al({value:i,source:null,stack:null}),t=Kf(e,t,n)}else if(xn||Ao(e,t,n,!1),r=(n&e.childLanes)!==0,xn||r){if(r=$e,r!==null&&(i=v_(r,n),i!==0&&i!==l.retryLane))throw l.retryLane=i,ur(e,i),ai(r,e,i),Mm;Ih(o)||Iu(),t=Kf(e,t,n)}else Ih(o)?(t.flags|=192,t.child=e.child,t=null):(e=l.treeContext,sn=Ii(o.nextSibling),Pn=t,Oe=!0,ms=null,Li=!1,e!==null&&Y_(t,e),t=Th(t,i.children),t.flags|=4096);return t}return a?(as(),o=i.fallback,a=t.mode,l=e.child,c=l.sibling,i=La(l,{mode:"hidden",children:i.children}),i.subtreeFlags=l.subtreeFlags&65011712,c!==null?o=La(c,o):(o=Ys(o,a,n,null),o.flags|=2),o.return=t,i.return=t,i.sibling=o,t.child=i,el(null,i),i=t.child,o=e.child.memoizedState,o===null?o=jf(n):(a=o.cachePool,a!==null?(l=_n._currentValue,a=a.parent!==l?{parent:l,pool:l}:a):a=Z_(),o={baseLanes:o.baseLanes|n,cachePool:a}),i.memoizedState=o,i.childLanes=Zf(e,r,n),t.memoizedState=Yf,el(e.child,i)):(is(t),n=e.child,e=n.sibling,n=La(n,{mode:"visible",children:i.children}),n.return=t,n.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=n,t.memoizedState=null,n)}function Th(e,t){return t=Lu({mode:"visible",children:t},e.mode),t.return=e,e.child=t}function Lu(e,t){return e=hi(22,e,null,t),e.lanes=0,e}function Kf(e,t,n){return tr(t,e.child,null,n),e=Th(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function n0(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),dh(e.return,t,n)}function Qf(e,t,n,i,a,s){var r=e.memoizedState;r===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a,treeForkCount:s}:(r.isBackwards=t,r.rendering=null,r.renderingStartTime=0,r.last=i,r.tail=n,r.tailMode=a,r.treeForkCount=s)}function Vx(e,t,n){var i=t.pendingProps,a=i.revealOrder,s=i.tail;i=i.children;var r=dn.current,o=(r&2)!==0;if(o?(r=r&1|2,t.flags|=128):r&=1,en(dn,r),Ln(e,t,i,n),i=Oe?Tl:0,!o&&e!==null&&e.flags&128)t:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&n0(e,n,t);else if(e.tag===19)n0(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break t;for(;e.sibling===null;){if(e.return===null||e.return===t)break t;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&wu(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),Qf(t,!1,a,n,s,i);break;case"backwards":case"unstable_legacy-backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&wu(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}Qf(t,!0,n,null,s,i);break;case"together":Qf(t,!1,null,null,void 0,i);break;default:t.memoizedState=null}return t.child}function Ga(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),As|=t.lanes,!(n&t.childLanes))if(e!==null){if(Ao(e,t,n,!1),(n&t.childLanes)===0)return null}else return null;if(e!==null&&t.child!==e.child)throw Error(gt(153));if(t.child!==null){for(e=t.child,n=La(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=La(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function bm(e,t){return e.lanes&t?!0:(e=e.dependencies,!!(e!==null&&Au(e)))}function Ub(e,t,n){switch(t.tag){case 3:xu(t,t.stateNode.containerInfo),ns(t,_n,e.memoizedState.cache),Js();break;case 27:case 5:$d(t);break;case 4:xu(t,t.stateNode.containerInfo);break;case 10:ns(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,_h(t),null;break;case 13:var i=t.memoizedState;if(i!==null)return i.dehydrated!==null?(is(t),t.flags|=128,null):n&t.child.childLanes?Gx(e,t,n):(is(t),e=Ga(e,t,n),e!==null?e.sibling:null);is(t);break;case 19:var a=(e.flags&128)!==0;if(i=(n&t.childLanes)!==0,i||(Ao(e,t,n,!1),i=(n&t.childLanes)!==0),a){if(i)return Vx(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),en(dn,dn.current),i)break;return null;case 22:return t.lanes=0,Hx(e,t,n,t.pendingProps);case 24:ns(t,_n,e.memoizedState.cache)}return Ga(e,t,n)}function kx(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps)xn=!0;else{if(!bm(e,n)&&!(t.flags&128))return xn=!1,Ub(e,t,n);xn=!!(e.flags&131072)}else xn=!1,Oe&&t.flags&1048576&&q_(t,Tl,t.index);switch(t.lanes=0,t.tag){case 16:t:{var i=t.pendingProps;if(e=Fs(t.elementType),t.type=e,typeof e=="function")em(e)?(i=nr(e,i),t.tag=1,t=t0(null,t,e,i,n)):(t.tag=0,t=Eh(null,t,e,i,n));else{if(e!=null){var a=e.$$typeof;if(a===Gp){t.tag=11,t=Zg(null,t,e,i,n);break t}else if(a===Vp){t.tag=14,t=Kg(null,t,e,i,n);break t}}throw t=Qd(e)||e,Error(gt(306,t,""))}}return t;case 0:return Eh(e,t,t.type,t.pendingProps,n);case 1:return i=t.type,a=nr(i,t.pendingProps),t0(e,t,i,a,n);case 3:t:{if(xu(t,t.stateNode.containerInfo),e===null)throw Error(gt(387));i=t.pendingProps;var s=t.memoizedState;a=s.element,mh(e,t),hl(t,i,null,n);var r=t.memoizedState;if(i=r.cache,ns(t,_n,i),i!==s.cache&&hh(t,[_n],n,!0),dl(),i=r.element,s.isDehydrated)if(s={element:i,isDehydrated:!1,cache:r.cache},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){t=e0(e,t,i,n);break t}else if(i!==a){a=Ui(Error(gt(424)),t),Al(a),t=e0(e,t,i,n);break t}else{switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName==="HTML"?e.ownerDocument.body:e}for(sn=Ii(e.firstChild),Pn=t,Oe=!0,ms=null,Li=!0,n=J_(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling}else{if(Js(),i===a){t=Ga(e,t,n);break t}Ln(e,t,i,n)}t=t.child}return t;case 26:return iu(e,t),e===null?(n=M0(t.type,null,t.pendingProps,null))?t.memoizedState=n:Oe||(n=t.type,e=t.pendingProps,i=Gu(ps.current).createElement(n),i[On]=t,i[ri]=e,Fn(i,n,e),Rn(i),t.stateNode=i):t.memoizedState=M0(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return $d(t),e===null&&Oe&&(i=t.stateNode=Ly(t.type,t.pendingProps,ps.current),Pn=t,Li=!0,a=sn,ws(t.type)?(Fh=a,sn=Ii(i.firstChild)):sn=a),Ln(e,t,t.pendingProps.children,n),iu(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&Oe&&((a=i=sn)&&(i=lE(i,t.type,t.pendingProps,Li),i!==null?(t.stateNode=i,Pn=t,sn=Ii(i.firstChild),Li=!1,a=!0):a=!1),a||Es(t)),$d(t),a=t.type,s=t.pendingProps,r=e!==null?e.memoizedProps:null,i=s.children,Ph(a,s)?i=null:r!==null&&Ph(a,r)&&(t.flags|=32),t.memoizedState!==null&&(a=um(e,t,bb,null,null,n),Ul._currentValue=a),iu(e,t),Ln(e,t,i,n),t.child;case 6:return e===null&&Oe&&((e=n=sn)&&(n=cE(n,t.pendingProps,Li),n!==null?(t.stateNode=n,Pn=t,sn=null,e=!0):e=!1),e||Es(t)),null;case 13:return Gx(e,t,n);case 4:return xu(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=tr(t,null,i,n):Ln(e,t,i,n),t.child;case 11:return Zg(e,t,t.type,t.pendingProps,n);case 7:return Ln(e,t,t.pendingProps,n),t.child;case 8:return Ln(e,t,t.pendingProps.children,n),t.child;case 12:return Ln(e,t,t.pendingProps.children,n),t.child;case 10:return i=t.pendingProps,ns(t,t.type,i.value),Ln(e,t,i.children,n),t.child;case 9:return a=t.type._context,i=t.pendingProps.children,$s(t),a=zn(a),i=i(a),t.flags|=1,Ln(e,t,i,n),t.child;case 14:return Kg(e,t,t.type,t.pendingProps,n);case 15:return Fx(e,t,t.type,t.pendingProps,n);case 19:return Vx(e,t,n);case 31:return Nb(e,t,n);case 22:return Hx(e,t,n,t.pendingProps);case 24:return $s(t),i=zn(_n),e===null?(a=sm(),a===null&&(a=$e,s=am(),a.pooledCache=s,s.refCount++,s!==null&&(a.pooledCacheLanes|=n),a=s),t.memoizedState={parent:i,cache:a},om(t),ns(t,_n,a)):(e.lanes&n&&(mh(e,t),hl(t,null,null,n),dl()),a=e.memoizedState,s=t.memoizedState,a.parent!==i?(a={parent:i,cache:i},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ns(t,_n,i)):(i=s.cache,ns(t,_n,i),i!==a.cache&&hh(t,[_n],n,!0))),Ln(e,t,t.pendingProps.children,n),t.child;case 29:throw t.pendingProps}throw Error(gt(156,t.tag))}function ga(e){e.flags|=4}function Jf(e,t,n,i,a){if((t=(e.mode&32)!==0)&&(t=!1),t){if(e.flags|=16777216,(a&335544128)===a)if(e.stateNode.complete)e.flags|=8192;else if(hy())e.flags|=8192;else throw Zs=Ru,rm}else e.flags&=-16777217}function i0(e,t){if(t.type!=="stylesheet"||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!zy(t))if(hy())e.flags|=8192;else throw Zs=Ru,rm}function uc(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag!==22?p_():536870912,e.lanes|=t,ho|=t)}function Bo(e,t){if(!Oe)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function an(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&65011712,i|=a.flags&65011712,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function Lb(e,t,n){var i=t.pendingProps;switch(im(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return an(t),null;case 1:return an(t),null;case 3:return n=t.stateNode,i=null,e!==null&&(i=e.memoizedState.cache),t.memoizedState.cache!==i&&(t.flags|=2048),Oa(_n),ro(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(gr(t)?ga(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,kf())),an(t),null;case 26:var a=t.type,s=t.memoizedState;return e===null?(ga(t),s!==null?(an(t),i0(t,s)):(an(t),Jf(t,a,null,i,n))):s?s!==e.memoizedState?(ga(t),an(t),i0(t,s)):(an(t),t.flags&=-16777217):(e=e.memoizedProps,e!==i&&ga(t),an(t),Jf(t,a,e,i,n)),null;case 27:if(yu(t),n=ps.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ga(t);else{if(!i){if(t.stateNode===null)throw Error(gt(166));return an(t),null}e=oa.current,gr(t)?Ug(t):(e=Ly(a,i,n),t.stateNode=e,ga(t))}return an(t),null;case 5:if(yu(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==i&&ga(t);else{if(!i){if(t.stateNode===null)throw Error(gt(166));return an(t),null}if(s=oa.current,gr(t))Ug(t);else{var r=Gu(ps.current);switch(s){case 1:s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case 2:s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;default:switch(a){case"svg":s=r.createElementNS("http://www.w3.org/2000/svg",a);break;case"math":s=r.createElementNS("http://www.w3.org/1998/Math/MathML",a);break;case"script":s=r.createElement("div"),s.innerHTML="<script><\/script>",s=s.removeChild(s.firstChild);break;case"select":s=typeof i.is=="string"?r.createElement("select",{is:i.is}):r.createElement("select"),i.multiple?s.multiple=!0:i.size&&(s.size=i.size);break;default:s=typeof i.is=="string"?r.createElement(a,{is:i.is}):r.createElement(a)}}s[On]=t,s[ri]=i;t:for(r=t.child;r!==null;){if(r.tag===5||r.tag===6)s.appendChild(r.stateNode);else if(r.tag!==4&&r.tag!==27&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break t;for(;r.sibling===null;){if(r.return===null||r.return===t)break t;r=r.return}r.sibling.return=r.return,r=r.sibling}t.stateNode=s;t:switch(Fn(s,a,i),a){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break t;case"img":i=!0;break t;default:i=!1}i&&ga(t)}}return an(t),Jf(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==i&&ga(t);else{if(typeof i!="string"&&t.stateNode===null)throw Error(gt(166));if(e=ps.current,gr(t)){if(e=t.stateNode,n=t.memoizedProps,i=null,a=Pn,a!==null)switch(a.tag){case 27:case 5:i=a.memoizedProps}e[On]=t,e=!!(e.nodeValue===n||i!==null&&i.suppressHydrationWarning===!0||wy(e.nodeValue,n)),e||Es(t,!0)}else e=Gu(e).createTextNode(i),e[On]=t,t.stateNode=e}return an(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(i=gr(t),n!==null){if(e===null){if(!i)throw Error(gt(318));if(e=t.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(gt(557));e[On]=t}else Js(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;an(t),e=!1}else n=kf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(di(t),t):(di(t),null);if(t.flags&128)throw Error(gt(558))}return an(t),null;case 13:if(i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=gr(t),i!==null&&i.dehydrated!==null){if(e===null){if(!a)throw Error(gt(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(gt(317));a[On]=t}else Js(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;an(t),a=!1}else a=kf(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(di(t),t):(di(t),null)}return di(t),t.flags&128?(t.lanes=n,t):(n=i!==null,e=e!==null&&e.memoizedState!==null,n&&(i=t.child,a=null,i.alternate!==null&&i.alternate.memoizedState!==null&&i.alternate.memoizedState.cachePool!==null&&(a=i.alternate.memoizedState.cachePool.pool),s=null,i.memoizedState!==null&&i.memoizedState.cachePool!==null&&(s=i.memoizedState.cachePool.pool),s!==a&&(i.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),uc(t,t.updateQueue),an(t),null);case 4:return ro(),e===null&&Dm(t.stateNode.containerInfo),an(t),null;case 10:return Oa(t.type),an(t),null;case 19:if(wn(dn),i=t.memoizedState,i===null)return an(t),null;if(a=(t.flags&128)!==0,s=i.rendering,s===null)if(a)Bo(i,!1);else{if(un!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(s=wu(e),s!==null){for(t.flags|=128,Bo(i,!1),e=s.updateQueue,t.updateQueue=e,uc(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)X_(n,e),n=n.sibling;return en(dn,dn.current&1|2),Oe&&Aa(t,i.treeForkCount),t.child}e=e.sibling}i.tail!==null&&mi()>Pu&&(t.flags|=128,a=!0,Bo(i,!1),t.lanes=4194304)}else{if(!a)if(e=wu(s),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,uc(t,e),Bo(i,!0),i.tail===null&&i.tailMode==="hidden"&&!s.alternate&&!Oe)return an(t),null}else 2*mi()-i.renderingStartTime>Pu&&n!==536870912&&(t.flags|=128,a=!0,Bo(i,!1),t.lanes=4194304);i.isBackwards?(s.sibling=t.child,t.child=s):(e=i.last,e!==null?e.sibling=s:t.child=s,i.last=s)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=mi(),e.sibling=null,n=dn.current,en(dn,a?n&1|2:n&1),Oe&&Aa(t,i.treeForkCount),e):(an(t),null);case 22:case 23:return di(t),lm(),i=t.memoizedState!==null,e!==null?e.memoizedState!==null!==i&&(t.flags|=8192):i&&(t.flags|=8192),i?n&536870912&&!(t.flags&128)&&(an(t),t.subtreeFlags&6&&(t.flags|=8192)):an(t),n=t.updateQueue,n!==null&&uc(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),i=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(i=t.memoizedState.cachePool.pool),i!==n&&(t.flags|=2048),e!==null&&wn(js),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),Oa(_n),an(t),null;case 25:return null;case 30:return null}throw Error(gt(156,t.tag))}function Ob(e,t){switch(im(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return Oa(_n),ro(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return yu(t),null;case 31:if(t.memoizedState!==null){if(di(t),t.alternate===null)throw Error(gt(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(di(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(gt(340));Js()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return wn(dn),null;case 4:return ro(),null;case 10:return Oa(t.type),null;case 22:case 23:return di(t),lm(),e!==null&&wn(js),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return Oa(_n),null;case 25:return null;default:return null}}function Xx(e,t){switch(im(t),t.tag){case 3:Oa(_n),ro();break;case 26:case 27:case 5:yu(t);break;case 4:ro();break;case 31:t.memoizedState!==null&&di(t);break;case 13:di(t);break;case 19:wn(dn);break;case 10:Oa(t.type);break;case 22:case 23:di(t),lm(),e!==null&&wn(js);break;case 24:Oa(_n)}}function Yl(e,t){try{var n=t.updateQueue,i=n!==null?n.lastEffect:null;if(i!==null){var a=i.next;n=a;do{if((n.tag&e)===e){i=void 0;var s=n.create,r=n.inst;i=s(),r.destroy=i}n=n.next}while(n!==a)}}catch(o){je(t,t.return,o)}}function Ts(e,t,n){try{var i=t.updateQueue,a=i!==null?i.lastEffect:null;if(a!==null){var s=a.next;i=s;do{if((i.tag&e)===e){var r=i.inst,o=r.destroy;if(o!==void 0){r.destroy=void 0,a=t;var l=n,c=o;try{c()}catch(d){je(a,l,d)}}}i=i.next}while(i!==s)}}catch(d){je(t,t.return,d)}}function Wx(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{tx(t,n)}catch(i){je(e,e.return,i)}}}function qx(e,t,n){n.props=nr(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(i){je(e,t,i)}}function ml(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var i=e.stateNode;break;case 30:i=e.stateNode;break;default:i=e.stateNode}typeof n=="function"?e.refCleanup=n(i):n.current=i}}catch(a){je(e,t,a)}}function sa(e,t){var n=e.ref,i=e.refCleanup;if(n!==null)if(typeof i=="function")try{i()}catch(a){je(e,t,a)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n=="function")try{n(null)}catch(a){je(e,t,a)}else n.current=null}function Yx(e){var t=e.type,n=e.memoizedProps,i=e.stateNode;try{t:switch(t){case"button":case"input":case"select":case"textarea":n.autoFocus&&i.focus();break t;case"img":n.src?i.src=n.src:n.srcSet&&(i.srcset=n.srcSet)}}catch(a){je(e,e.return,a)}}function $f(e,t,n){try{var i=e.stateNode;nE(i,e.type,n,t),i[ri]=t}catch(a){je(e,e.return,a)}}function jx(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&ws(e.type)||e.tag===4}function td(e){t:for(;;){for(;e.sibling===null;){if(e.return===null||jx(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&ws(e.type)||e.flags&2||e.child===null||e.tag===4)continue t;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ah(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n).insertBefore(e,t):(t=n.nodeType===9?n.body:n.nodeName==="HTML"?n.ownerDocument.body:n,t.appendChild(e),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Da));else if(i!==4&&(i===27&&ws(e.type)&&(n=e.stateNode,t=null),e=e.child,e!==null))for(Ah(e,t,n),e=e.sibling;e!==null;)Ah(e,t,n),e=e.sibling}function Ou(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(i===27&&ws(e.type)&&(n=e.stateNode),e=e.child,e!==null))for(Ou(e,t,n),e=e.sibling;e!==null;)Ou(e,t,n),e=e.sibling}function Zx(e){var t=e.stateNode,n=e.memoizedProps;try{for(var i=e.type,a=t.attributes;a.length;)t.removeAttributeNode(a[0]);Fn(t,i,n),t[On]=e,t[ri]=n}catch(s){je(e,e.return,s)}}var Ra=!1,vn=!1,ed=!1,a0=typeof WeakSet=="function"?WeakSet:Set,An=null;function Pb(e,t){if(e=e.containerInfo,Lh=Wu,e=z_(e),Jp(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else t:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,s=i.focusNode;i=i.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break t}var r=0,o=-1,l=-1,c=0,d=0,h=e,u=null;e:for(;;){for(var p;h!==n||a!==0&&h.nodeType!==3||(o=r+a),h!==s||i!==0&&h.nodeType!==3||(l=r+i),h.nodeType===3&&(r+=h.nodeValue.length),(p=h.firstChild)!==null;)u=h,h=p;for(;;){if(h===e)break e;if(u===n&&++c===a&&(o=r),u===s&&++d===i&&(l=r),(p=h.nextSibling)!==null)break;h=u,u=h.parentNode}h=p}n=o===-1||l===-1?null:{start:o,end:l}}else n=null}n=n||{start:0,end:0}}else n=null;for(Oh={focusedElem:e,selectionRange:n},Wu=!1,An=t;An!==null;)if(t=An,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,An=e;else for(;An!==null;){switch(t=An,s=t.alternate,e=t.flags,t.tag){case 0:if(e&4&&(e=t.updateQueue,e=e!==null?e.events:null,e!==null))for(n=0;n<e.length;n++)a=e[n],a.ref.impl=a.nextImpl;break;case 11:case 15:break;case 1:if(e&1024&&s!==null){e=void 0,n=t,a=s.memoizedProps,s=s.memoizedState,i=n.stateNode;try{var g=nr(n.type,a);e=i.getSnapshotBeforeUpdate(g,s),i.__reactInternalSnapshotBeforeUpdate=e}catch(S){je(n,n.return,S)}}break;case 3:if(e&1024){if(e=t.stateNode.containerInfo,n=e.nodeType,n===9)zh(e);else if(n===1)switch(e.nodeName){case"HEAD":case"HTML":case"BODY":zh(e);break;default:e.textContent=""}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;default:if(e&1024)throw Error(gt(163))}if(e=t.sibling,e!==null){e.return=t.return,An=e;break}An=t.return}}function Kx(e,t,n){var i=n.flags;switch(n.tag){case 0:case 11:case 15:_a(e,n),i&4&&Yl(5,n);break;case 1:if(_a(e,n),i&4)if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(r){je(n,n.return,r)}else{var a=nr(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(a,t,e.__reactInternalSnapshotBeforeUpdate)}catch(r){je(n,n.return,r)}}i&64&&Wx(n),i&512&&ml(n,n.return);break;case 3:if(_a(e,n),i&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{tx(e,t)}catch(r){je(n,n.return,r)}}break;case 27:t===null&&i&4&&Zx(n);case 26:case 5:_a(e,n),t===null&&i&4&&Yx(n),i&512&&ml(n,n.return);break;case 12:_a(e,n);break;case 31:_a(e,n),i&4&&$x(e,n);break;case 13:_a(e,n),i&4&&ty(e,n),i&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=Xb.bind(null,n),uE(e,n))));break;case 22:if(i=n.memoizedState!==null||Ra,!i){t=t!==null&&t.memoizedState!==null||vn,a=Ra;var s=vn;Ra=i,(vn=t)&&!s?Ea(e,n,(n.subtreeFlags&8772)!==0):_a(e,n),Ra=a,vn=s}break;case 30:break;default:_a(e,n)}}function Qx(e){var t=e.alternate;t!==null&&(e.alternate=null,Qx(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&qp(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var ln=null,ni=!1;function va(e,t,n){for(n=n.child;n!==null;)Jx(e,t,n),n=n.sibling}function Jx(e,t,n){if(gi&&typeof gi.onCommitFiberUnmount=="function")try{gi.onCommitFiberUnmount(Hl,n)}catch{}switch(n.tag){case 26:vn||sa(n,t),va(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:vn||sa(n,t);var i=ln,a=ni;ws(n.type)&&(ln=n.stateNode,ni=!1),va(e,t,n),xl(n.stateNode),ln=i,ni=a;break;case 5:vn||sa(n,t);case 6:if(i=ln,a=ni,ln=null,va(e,t,n),ln=i,ni=a,ln!==null)if(ni)try{(ln.nodeType===9?ln.body:ln.nodeName==="HTML"?ln.ownerDocument.body:ln).removeChild(n.stateNode)}catch(s){je(n,t,s)}else try{ln.removeChild(n.stateNode)}catch(s){je(n,t,s)}break;case 18:ln!==null&&(ni?(e=ln,v0(e.nodeType===9?e.body:e.nodeName==="HTML"?e.ownerDocument.body:e,n.stateNode),vo(e)):v0(ln,n.stateNode));break;case 4:i=ln,a=ni,ln=n.stateNode.containerInfo,ni=!0,va(e,t,n),ln=i,ni=a;break;case 0:case 11:case 14:case 15:Ts(2,n,t),vn||Ts(4,n,t),va(e,t,n);break;case 1:vn||(sa(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"&&qx(n,t,i)),va(e,t,n);break;case 21:va(e,t,n);break;case 22:vn=(i=vn)||n.memoizedState!==null,va(e,t,n),vn=i;break;default:va(e,t,n)}}function $x(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{vo(e)}catch(n){je(t,t.return,n)}}}function ty(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{vo(e)}catch(n){je(t,t.return,n)}}function zb(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new a0),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new a0),t;default:throw Error(gt(435,e.tag))}}function fc(e,t){var n=zb(e);t.forEach(function(i){if(!n.has(i)){n.add(i);var a=Wb.bind(null,e,i);i.then(a,a)}})}function $n(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i],s=e,r=t,o=r;t:for(;o!==null;){switch(o.tag){case 27:if(ws(o.type)){ln=o.stateNode,ni=!1;break t}break;case 5:ln=o.stateNode,ni=!1;break t;case 3:case 4:ln=o.stateNode.containerInfo,ni=!0;break t}o=o.return}if(ln===null)throw Error(gt(160));Jx(s,r,a),ln=null,ni=!1,s=a.alternate,s!==null&&(s.return=null),a.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)ey(t,e),t=t.sibling}var Yi=null;function ey(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:$n(t,e),ti(e),i&4&&(Ts(3,e,e.return),Yl(3,e),Ts(5,e,e.return));break;case 1:$n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),i&64&&Ra&&(e=e.updateQueue,e!==null&&(i=e.callbacks,i!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?i:n.concat(i))));break;case 26:var a=Yi;if($n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),i&4){var s=n!==null?n.memoizedState:null;if(i=e.memoizedState,n===null)if(i===null)if(e.stateNode===null){t:{i=e.type,n=e.memoizedProps,a=a.ownerDocument||a;e:switch(i){case"title":s=a.getElementsByTagName("title")[0],(!s||s[kl]||s[On]||s.namespaceURI==="http://www.w3.org/2000/svg"||s.hasAttribute("itemprop"))&&(s=a.createElement(i),a.head.insertBefore(s,a.querySelector("head > title"))),Fn(s,i,n),s[On]=e,Rn(s),i=s;break t;case"link":var r=E0("link","href",a).get(i+(n.href||""));if(r){for(var o=0;o<r.length;o++)if(s=r[o],s.getAttribute("href")===(n.href==null||n.href===""?null:n.href)&&s.getAttribute("rel")===(n.rel==null?null:n.rel)&&s.getAttribute("title")===(n.title==null?null:n.title)&&s.getAttribute("crossorigin")===(n.crossOrigin==null?null:n.crossOrigin)){r.splice(o,1);break e}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;case"meta":if(r=E0("meta","content",a).get(i+(n.content||""))){for(o=0;o<r.length;o++)if(s=r[o],s.getAttribute("content")===(n.content==null?null:""+n.content)&&s.getAttribute("name")===(n.name==null?null:n.name)&&s.getAttribute("property")===(n.property==null?null:n.property)&&s.getAttribute("http-equiv")===(n.httpEquiv==null?null:n.httpEquiv)&&s.getAttribute("charset")===(n.charSet==null?null:n.charSet)){r.splice(o,1);break e}}s=a.createElement(i),Fn(s,i,n),a.head.appendChild(s);break;default:throw Error(gt(468,i))}s[On]=e,Rn(s),i=s}e.stateNode=i}else T0(a,e.type,e.stateNode);else e.stateNode=b0(a,i,e.memoizedProps);else s!==i?(s===null?n.stateNode!==null&&(n=n.stateNode,n.parentNode.removeChild(n)):s.count--,i===null?T0(a,e.type,e.stateNode):b0(a,i,e.memoizedProps)):i===null&&e.stateNode!==null&&$f(e,e.memoizedProps,n.memoizedProps)}break;case 27:$n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),n!==null&&i&4&&$f(e,e.memoizedProps,n.memoizedProps);break;case 5:if($n(t,e),ti(e),i&512&&(vn||n===null||sa(n,n.return)),e.flags&32){a=e.stateNode;try{lo(a,"")}catch(g){je(e,e.return,g)}}i&4&&e.stateNode!=null&&(a=e.memoizedProps,$f(e,a,n!==null?n.memoizedProps:a)),i&1024&&(ed=!0);break;case 6:if($n(t,e),ti(e),i&4){if(e.stateNode===null)throw Error(gt(162));i=e.memoizedProps,n=e.stateNode;try{n.nodeValue=i}catch(g){je(e,e.return,g)}}break;case 3:if(ru=null,a=Yi,Yi=Vu(t.containerInfo),$n(t,e),Yi=a,ti(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{vo(t.containerInfo)}catch(g){je(e,e.return,g)}ed&&(ed=!1,ny(e));break;case 4:i=Yi,Yi=Vu(e.stateNode.containerInfo),$n(t,e),ti(e),Yi=i;break;case 12:$n(t,e),ti(e);break;case 31:$n(t,e),ti(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,fc(e,i)));break;case 13:$n(t,e),ti(e),e.child.flags&8192&&e.memoizedState!==null!=(n!==null&&n.memoizedState!==null)&&(vf=mi()),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,fc(e,i)));break;case 22:a=e.memoizedState!==null;var l=n!==null&&n.memoizedState!==null,c=Ra,d=vn;if(Ra=c||a,vn=d||l,$n(t,e),vn=d,Ra=c,ti(e),i&8192)t:for(t=e.stateNode,t._visibility=a?t._visibility&-2:t._visibility|1,a&&(n===null||l||Ra||vn||Hs(e)),n=null,t=e;;){if(t.tag===5||t.tag===26){if(n===null){l=n=t;try{if(s=l.stateNode,a)r=s.style,typeof r.setProperty=="function"?r.setProperty("display","none","important"):r.display="none";else{o=l.stateNode;var h=l.memoizedProps.style,u=h!=null&&h.hasOwnProperty("display")?h.display:null;o.style.display=u==null||typeof u=="boolean"?"":(""+u).trim()}}catch(g){je(l,l.return,g)}}}else if(t.tag===6){if(n===null){l=t;try{l.stateNode.nodeValue=a?"":l.memoizedProps}catch(g){je(l,l.return,g)}}}else if(t.tag===18){if(n===null){l=t;try{var p=l.stateNode;a?_0(p,!0):_0(l.stateNode,!1)}catch(g){je(l,l.return,g)}}}else if((t.tag!==22&&t.tag!==23||t.memoizedState===null||t===e)&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break t;for(;t.sibling===null;){if(t.return===null||t.return===e)break t;n===t&&(n=null),t=t.return}n===t&&(n=null),t.sibling.return=t.return,t=t.sibling}i&4&&(i=e.updateQueue,i!==null&&(n=i.retryQueue,n!==null&&(i.retryQueue=null,fc(e,n))));break;case 19:$n(t,e),ti(e),i&4&&(i=e.updateQueue,i!==null&&(e.updateQueue=null,fc(e,i)));break;case 30:break;case 21:break;default:$n(t,e),ti(e)}}function ti(e){var t=e.flags;if(t&2){try{for(var n,i=e.return;i!==null;){if(jx(i)){n=i;break}i=i.return}if(n==null)throw Error(gt(160));switch(n.tag){case 27:var a=n.stateNode,s=td(e);Ou(e,s,a);break;case 5:var r=n.stateNode;n.flags&32&&(lo(r,""),n.flags&=-33);var o=td(e);Ou(e,o,r);break;case 3:case 4:var l=n.stateNode.containerInfo,c=td(e);Ah(e,c,l);break;default:throw Error(gt(161))}}catch(d){je(e,e.return,d)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function ny(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;ny(t),t.tag===5&&t.flags&1024&&t.stateNode.reset(),e=e.sibling}}function _a(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)Kx(e,t.alternate,t),t=t.sibling}function Hs(e){for(e=e.child;e!==null;){var t=e;switch(t.tag){case 0:case 11:case 14:case 15:Ts(4,t,t.return),Hs(t);break;case 1:sa(t,t.return);var n=t.stateNode;typeof n.componentWillUnmount=="function"&&qx(t,t.return,n),Hs(t);break;case 27:xl(t.stateNode);case 26:case 5:sa(t,t.return),Hs(t);break;case 22:t.memoizedState===null&&Hs(t);break;case 30:Hs(t);break;default:Hs(t)}e=e.sibling}}function Ea(e,t,n){for(n=n&&(t.subtreeFlags&8772)!==0,t=t.child;t!==null;){var i=t.alternate,a=e,s=t,r=s.flags;switch(s.tag){case 0:case 11:case 15:Ea(a,s,n),Yl(4,s);break;case 1:if(Ea(a,s,n),i=s,a=i.stateNode,typeof a.componentDidMount=="function")try{a.componentDidMount()}catch(c){je(i,i.return,c)}if(i=s,a=i.updateQueue,a!==null){var o=i.stateNode;try{var l=a.shared.hiddenCallbacks;if(l!==null)for(a.shared.hiddenCallbacks=null,a=0;a<l.length;a++)$_(l[a],o)}catch(c){je(i,i.return,c)}}n&&r&64&&Wx(s),ml(s,s.return);break;case 27:Zx(s);case 26:case 5:Ea(a,s,n),n&&i===null&&r&4&&Yx(s),ml(s,s.return);break;case 12:Ea(a,s,n);break;case 31:Ea(a,s,n),n&&r&4&&$x(a,s);break;case 13:Ea(a,s,n),n&&r&4&&ty(a,s);break;case 22:s.memoizedState===null&&Ea(a,s,n),ml(s,s.return);break;case 30:break;default:Ea(a,s,n)}t=t.sibling}}function Em(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Wl(n))}function Tm(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Wl(e))}function ki(e,t,n,i){if(t.subtreeFlags&10256)for(t=t.child;t!==null;)iy(e,t,n,i),t=t.sibling}function iy(e,t,n,i){var a=t.flags;switch(t.tag){case 0:case 11:case 15:ki(e,t,n,i),a&2048&&Yl(9,t);break;case 1:ki(e,t,n,i);break;case 3:ki(e,t,n,i),a&2048&&(e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Wl(e)));break;case 12:if(a&2048){ki(e,t,n,i),e=t.stateNode;try{var s=t.memoizedProps,r=s.id,o=s.onPostCommit;typeof o=="function"&&o(r,t.alternate===null?"mount":"update",e.passiveEffectDuration,-0)}catch(l){je(t,t.return,l)}}else ki(e,t,n,i);break;case 31:ki(e,t,n,i);break;case 13:ki(e,t,n,i);break;case 23:break;case 22:s=t.stateNode,r=t.alternate,t.memoizedState!==null?s._visibility&2?ki(e,t,n,i):gl(e,t):s._visibility&2?ki(e,t,n,i):(s._visibility|=2,Or(e,t,n,i,(t.subtreeFlags&10256)!==0||!1)),a&2048&&Em(r,t);break;case 24:ki(e,t,n,i),a&2048&&Tm(t.alternate,t);break;default:ki(e,t,n,i)}}function Or(e,t,n,i,a){for(a=a&&((t.subtreeFlags&10256)!==0||!1),t=t.child;t!==null;){var s=e,r=t,o=n,l=i,c=r.flags;switch(r.tag){case 0:case 11:case 15:Or(s,r,o,l,a),Yl(8,r);break;case 23:break;case 22:var d=r.stateNode;r.memoizedState!==null?d._visibility&2?Or(s,r,o,l,a):gl(s,r):(d._visibility|=2,Or(s,r,o,l,a)),a&&c&2048&&Em(r.alternate,r);break;case 24:Or(s,r,o,l,a),a&&c&2048&&Tm(r.alternate,r);break;default:Or(s,r,o,l,a)}t=t.sibling}}function gl(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,i=t,a=i.flags;switch(i.tag){case 22:gl(n,i),a&2048&&Em(i.alternate,i);break;case 24:gl(n,i),a&2048&&Tm(i.alternate,i);break;default:gl(n,i)}t=t.sibling}}var nl=8192;function vr(e,t,n){if(e.subtreeFlags&nl)for(e=e.child;e!==null;)ay(e,t,n),e=e.sibling}function ay(e,t,n){switch(e.tag){case 26:vr(e,t,n),e.flags&nl&&e.memoizedState!==null&&ME(n,Yi,e.memoizedState,e.memoizedProps);break;case 5:vr(e,t,n);break;case 3:case 4:var i=Yi;Yi=Vu(e.stateNode.containerInfo),vr(e,t,n),Yi=i;break;case 22:e.memoizedState===null&&(i=e.alternate,i!==null&&i.memoizedState!==null?(i=nl,nl=16777216,vr(e,t,n),nl=i):vr(e,t,n));break;default:vr(e,t,n)}}function sy(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Fo(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];An=i,oy(i,e)}sy(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)ry(e),e=e.sibling}function ry(e){switch(e.tag){case 0:case 11:case 15:Fo(e),e.flags&2048&&Ts(9,e,e.return);break;case 3:Fo(e);break;case 12:Fo(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,au(e)):Fo(e);break;default:Fo(e)}}function au(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var i=t[n];An=i,oy(i,e)}sy(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Ts(8,t,t.return),au(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,au(t));break;default:au(t)}e=e.sibling}}function oy(e,t){for(;An!==null;){var n=An;switch(n.tag){case 0:case 11:case 15:Ts(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var i=n.memoizedState.cachePool.pool;i!=null&&i.refCount++}break;case 24:Wl(n.memoizedState.cache)}if(i=n.child,i!==null)i.return=n,An=i;else t:for(n=e;An!==null;){i=An;var a=i.sibling,s=i.return;if(Qx(i),i===n){An=null;break t}if(a!==null){a.return=s,An=a;break t}An=s}}}var Ib={getCacheForType:function(e){var t=zn(_n),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return zn(_n).controller.signal}},Bb=typeof WeakMap=="function"?WeakMap:Map,He=0,$e=null,Ce=null,De=0,Ye=0,fi=null,cs=!1,Co=!1,Am=!1,Va=0,un=0,As=0,Ks=0,Rm=0,pi=0,ho=0,vl=null,ii=null,Rh=!1,vf=0,ly=0,Pu=1/0,zu=null,_s=null,yn=0,xs=null,po=null,Pa=0,Ch=0,wh=null,cy=null,_l=0,Dh=null;function _i(){return He&2&&De!==0?De&-De:ue.T!==null?wm():__()}function uy(){if(pi===0)if(!(De&536870912)||Oe){var e=ic;ic<<=1,!(ic&3932160)&&(ic=262144),pi=e}else pi=536870912;return e=yi.current,e!==null&&(e.flags|=32),pi}function ai(e,t,n){(e===$e&&(Ye===2||Ye===9)||e.cancelPendingCommit!==null)&&(mo(e,0),us(e,De,pi,!1)),Vl(e,n),(!(He&2)||e!==$e)&&(e===$e&&(!(He&2)&&(Ks|=n),un===4&&us(e,De,pi,!1)),da(e))}function fy(e,t,n){if(He&6)throw Error(gt(327));var i=!n&&(t&127)===0&&(t&e.expiredLanes)===0||Gl(e,t),a=i?Gb(e,t):nd(e,t,!0),s=i;do{if(a===0){Co&&!i&&us(e,t,0,!1);break}else{if(n=e.current.alternate,s&&!Fb(n)){a=nd(e,t,!1),s=!1;continue}if(a===2){if(s=t,e.errorRecoveryDisabledLanes&s)var r=0;else r=e.pendingLanes&-536870913,r=r!==0?r:r&536870912?536870912:0;if(r!==0){t=r;t:{var o=e;a=vl;var l=o.current.memoizedState.isDehydrated;if(l&&(mo(o,r).flags|=256),r=nd(o,r,!1),r!==2){if(Am&&!l){o.errorRecoveryDisabledLanes|=s,Ks|=s,a=4;break t}s=ii,ii=a,s!==null&&(ii===null?ii=s:ii.push.apply(ii,s))}a=r}if(s=!1,a!==2)continue}}if(a===1){mo(e,0),us(e,t,0,!0);break}t:{switch(i=e,s=a,s){case 0:case 1:throw Error(gt(345));case 4:if((t&4194048)!==t)break;case 6:us(i,t,pi,!cs);break t;case 2:ii=null;break;case 3:case 5:break;default:throw Error(gt(329))}if((t&62914560)===t&&(a=vf+300-mi(),10<a)){if(us(i,t,pi,!cs),rf(i,0,!0)!==0)break t;Pa=t,i.timeoutHandle=Ny(s0.bind(null,i,n,ii,zu,Rh,t,pi,Ks,ho,cs,s,"Throttled",-0,0),a);break t}s0(i,n,ii,zu,Rh,t,pi,Ks,ho,cs,s,null,-0,0)}}break}while(!0);da(e)}function s0(e,t,n,i,a,s,r,o,l,c,d,h,u,p){if(e.timeoutHandle=-1,h=t.subtreeFlags,h&8192||(h&16785408)===16785408){h={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:Da},ay(t,s,h);var g=(s&62914560)===s?vf-mi():(s&4194048)===s?ly-mi():0;if(g=bE(h,g),g!==null){Pa=s,e.cancelPendingCommit=g(o0.bind(null,e,t,s,n,i,a,r,o,l,d,h,null,u,p)),us(e,s,r,!c);return}}o0(e,t,s,n,i,a,r,o,l)}function Fb(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var i=0;i<n.length;i++){var a=n[i],s=a.getSnapshot;a=a.value;try{if(!xi(s(),a))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function us(e,t,n,i){t&=~Rm,t&=~Ks,e.suspendedLanes|=t,e.pingedLanes&=~t,i&&(e.warmLanes|=t),i=e.expirationTimes;for(var a=t;0<a;){var s=31-vi(a),r=1<<s;i[s]=-1,a&=~r}n!==0&&m_(e,n,t)}function _f(){return He&6?!0:(jl(0),!1)}function Cm(){if(Ce!==null){if(Ye===0)var e=Ce.return;else e=Ce,Na=fr=null,hm(e),eo=null,Rl=0,e=Ce;for(;e!==null;)Xx(e.alternate,e),e=e.return;Ce=null}}function mo(e,t){var n=e.timeoutHandle;n!==-1&&(e.timeoutHandle=-1,sE(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Pa=0,Cm(),$e=e,Ce=n=La(e.current,null),De=t,Ye=0,fi=null,cs=!1,Co=Gl(e,t),Am=!1,ho=pi=Rm=Ks=As=un=0,ii=vl=null,Rh=!1,t&8&&(t|=t&32);var i=e.entangledLanes;if(i!==0)for(e=e.entanglements,i&=t;0<i;){var a=31-vi(i),s=1<<a;t|=e[a],i&=~s}return Va=t,uf(),n}function dy(e,t){ge=null,ue.H=wl,t===Ro||t===df?(t=Ig(),Ye=3):t===rm?(t=Ig(),Ye=4):Ye=t===Mm?8:t!==null&&typeof t=="object"&&typeof t.then=="function"?6:1,fi=t,Ce===null&&(un=1,Uu(e,Ui(t,e.current)))}function hy(){var e=yi.current;return e===null?!0:(De&4194048)===De?zi===null:(De&62914560)===De||De&536870912?e===zi:!1}function py(){var e=ue.H;return ue.H=wl,e===null?wl:e}function my(){var e=ue.A;return ue.A=Ib,e}function Iu(){un=4,cs||(De&4194048)!==De&&yi.current!==null||(Co=!0),!(As&134217727)&&!(Ks&134217727)||$e===null||us($e,De,pi,!1)}function nd(e,t,n){var i=He;He|=2;var a=py(),s=my();($e!==e||De!==t)&&(zu=null,mo(e,t)),t=!1;var r=un;t:do try{if(Ye!==0&&Ce!==null){var o=Ce,l=fi;switch(Ye){case 8:Cm(),r=6;break t;case 3:case 2:case 9:case 6:yi.current===null&&(t=!0);var c=Ye;if(Ye=0,fi=null,Yr(e,o,l,c),n&&Co){r=0;break t}break;default:c=Ye,Ye=0,fi=null,Yr(e,o,l,c)}}Hb(),r=un;break}catch(d){dy(e,d)}while(!0);return t&&e.shellSuspendCounter++,Na=fr=null,He=i,ue.H=a,ue.A=s,Ce===null&&($e=null,De=0,uf()),r}function Hb(){for(;Ce!==null;)gy(Ce)}function Gb(e,t){var n=He;He|=2;var i=py(),a=my();$e!==e||De!==t?(zu=null,Pu=mi()+500,mo(e,t)):Co=Gl(e,t);t:do try{if(Ye!==0&&Ce!==null){t=Ce;var s=fi;e:switch(Ye){case 1:Ye=0,fi=null,Yr(e,t,s,1);break;case 2:case 9:if(zg(s)){Ye=0,fi=null,r0(t);break}t=function(){Ye!==2&&Ye!==9||$e!==e||(Ye=7),da(e)},s.then(t,t);break t;case 3:Ye=7;break t;case 4:Ye=5;break t;case 7:zg(s)?(Ye=0,fi=null,r0(t)):(Ye=0,fi=null,Yr(e,t,s,7));break;case 5:var r=null;switch(Ce.tag){case 26:r=Ce.memoizedState;case 5:case 27:var o=Ce;if(r?zy(r):o.stateNode.complete){Ye=0,fi=null;var l=o.sibling;if(l!==null)Ce=l;else{var c=o.return;c!==null?(Ce=c,xf(c)):Ce=null}break e}}Ye=0,fi=null,Yr(e,t,s,5);break;case 6:Ye=0,fi=null,Yr(e,t,s,6);break;case 8:Cm(),un=6;break t;default:throw Error(gt(462))}}Vb();break}catch(d){dy(e,d)}while(!0);return Na=fr=null,ue.H=i,ue.A=a,He=n,Ce!==null?0:($e=null,De=0,uf(),un)}function Vb(){for(;Ce!==null&&!fM();)gy(Ce)}function gy(e){var t=kx(e.alternate,e,Va);e.memoizedProps=e.pendingProps,t===null?xf(e):Ce=t}function r0(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=$g(n,t,t.pendingProps,t.type,void 0,De);break;case 11:t=$g(n,t,t.pendingProps,t.type.render,t.ref,De);break;case 5:hm(t);default:Xx(n,t),t=Ce=X_(t,Va),t=kx(n,t,Va)}e.memoizedProps=e.pendingProps,t===null?xf(e):Ce=t}function Yr(e,t,n,i){Na=fr=null,hm(t),eo=null,Rl=0;var a=t.return;try{if(Db(e,a,t,n,De)){un=1,Uu(e,Ui(n,e.current)),Ce=null;return}}catch(s){if(a!==null)throw Ce=a,s;un=1,Uu(e,Ui(n,e.current)),Ce=null;return}t.flags&32768?(Oe||i===1?e=!0:Co||De&536870912?e=!1:(cs=e=!0,(i===2||i===9||i===3||i===6)&&(i=yi.current,i!==null&&i.tag===13&&(i.flags|=16384))),vy(t,e)):xf(t)}function xf(e){var t=e;do{if(t.flags&32768){vy(t,cs);return}e=t.return;var n=Lb(t.alternate,t,Va);if(n!==null){Ce=n;return}if(t=t.sibling,t!==null){Ce=t;return}Ce=t=e}while(t!==null);un===0&&(un=5)}function vy(e,t){do{var n=Ob(e.alternate,e);if(n!==null){n.flags&=32767,Ce=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Ce=e;return}Ce=e=n}while(e!==null);un=6,Ce=null}function o0(e,t,n,i,a,s,r,o,l){e.cancelPendingCommit=null;do yf();while(yn!==0);if(He&6)throw Error(gt(327));if(t!==null){if(t===e.current)throw Error(gt(177));if(s=t.lanes|t.childLanes,s|=$p,SM(e,n,s,r,o,l),e===$e&&(Ce=$e=null,De=0),po=t,xs=e,Pa=n,Ch=s,wh=a,cy=i,t.subtreeFlags&10256||t.flags&10256?(e.callbackNode=null,e.callbackPriority=0,qb(Su,function(){return My(),null})):(e.callbackNode=null,e.callbackPriority=0),i=(t.flags&13878)!==0,t.subtreeFlags&13878||i){i=ue.T,ue.T=null,a=Ge.p,Ge.p=2,r=He,He|=4;try{Pb(e,t,n)}finally{He=r,Ge.p=a,ue.T=i}}yn=1,_y(),xy(),yy()}}function _y(){if(yn===1){yn=0;var e=xs,t=po,n=(t.flags&13878)!==0;if(t.subtreeFlags&13878||n){n=ue.T,ue.T=null;var i=Ge.p;Ge.p=2;var a=He;He|=4;try{ey(t,e);var s=Oh,r=z_(e.containerInfo),o=s.focusedElem,l=s.selectionRange;if(r!==o&&o&&o.ownerDocument&&P_(o.ownerDocument.documentElement,o)){if(l!==null&&Jp(o)){var c=l.start,d=l.end;if(d===void 0&&(d=c),"selectionStart"in o)o.selectionStart=c,o.selectionEnd=Math.min(d,o.value.length);else{var h=o.ownerDocument||document,u=h&&h.defaultView||window;if(u.getSelection){var p=u.getSelection(),g=o.textContent.length,S=Math.min(l.start,g),m=l.end===void 0?S:Math.min(l.end,g);!p.extend&&S>m&&(r=m,m=S,S=r);var f=wg(o,S),v=wg(o,m);if(f&&v&&(p.rangeCount!==1||p.anchorNode!==f.node||p.anchorOffset!==f.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var M=h.createRange();M.setStart(f.node,f.offset),p.removeAllRanges(),S>m?(p.addRange(M),p.extend(v.node,v.offset)):(M.setEnd(v.node,v.offset),p.addRange(M))}}}}for(h=[],p=o;p=p.parentNode;)p.nodeType===1&&h.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<h.length;o++){var y=h[o];y.element.scrollLeft=y.left,y.element.scrollTop=y.top}}Wu=!!Lh,Oh=Lh=null}finally{He=a,Ge.p=i,ue.T=n}}e.current=t,yn=2}}function xy(){if(yn===2){yn=0;var e=xs,t=po,n=(t.flags&8772)!==0;if(t.subtreeFlags&8772||n){n=ue.T,ue.T=null;var i=Ge.p;Ge.p=2;var a=He;He|=4;try{Kx(e,t.alternate,t)}finally{He=a,Ge.p=i,ue.T=n}}yn=3}}function yy(){if(yn===4||yn===3){yn=0,dM();var e=xs,t=po,n=Pa,i=cy;t.subtreeFlags&10256||t.flags&10256?yn=5:(yn=0,po=xs=null,Sy(e,e.pendingLanes));var a=e.pendingLanes;if(a===0&&(_s=null),Wp(n),t=t.stateNode,gi&&typeof gi.onCommitFiberRoot=="function")try{gi.onCommitFiberRoot(Hl,t,void 0,(t.current.flags&128)===128)}catch{}if(i!==null){t=ue.T,a=Ge.p,Ge.p=2,ue.T=null;try{for(var s=e.onRecoverableError,r=0;r<i.length;r++){var o=i[r];s(o.value,{componentStack:o.stack})}}finally{ue.T=t,Ge.p=a}}Pa&3&&yf(),da(e),a=e.pendingLanes,n&261930&&a&42?e===Dh?_l++:(_l=0,Dh=e):_l=0,jl(0)}}function Sy(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Wl(t)))}function yf(){return _y(),xy(),yy(),My()}function My(){if(yn!==5)return!1;var e=xs,t=Ch;Ch=0;var n=Wp(Pa),i=ue.T,a=Ge.p;try{Ge.p=32>n?32:n,ue.T=null,n=wh,wh=null;var s=xs,r=Pa;if(yn=0,po=xs=null,Pa=0,He&6)throw Error(gt(331));var o=He;if(He|=4,ry(s.current),iy(s,s.current,r,n),He=o,jl(0,!1),gi&&typeof gi.onPostCommitFiberRoot=="function")try{gi.onPostCommitFiberRoot(Hl,s)}catch{}return!0}finally{Ge.p=a,ue.T=i,Sy(e,t)}}function l0(e,t,n){t=Ui(n,t),t=bh(e.stateNode,t,2),e=vs(e,t,2),e!==null&&(Vl(e,2),da(e))}function je(e,t,n){if(e.tag===3)l0(e,e,n);else for(;t!==null;){if(t.tag===3){l0(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(_s===null||!_s.has(i))){e=Ui(n,e),n=Ix(2),i=vs(t,n,2),i!==null&&(Bx(n,i,t,e),Vl(i,2),da(i));break}}t=t.return}}function id(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new Bb;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(Am=!0,a.add(n),e=kb.bind(null,e,t,n),t.then(e,e))}function kb(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,$e===e&&(De&n)===n&&(un===4||un===3&&(De&62914560)===De&&300>mi()-vf?!(He&2)&&mo(e,0):Rm|=n,ho===De&&(ho=0)),da(e)}function by(e,t){t===0&&(t=p_()),e=ur(e,t),e!==null&&(Vl(e,t),da(e))}function Xb(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),by(e,n)}function Wb(e,t){var n=0;switch(e.tag){case 31:case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;case 22:i=e.stateNode._retryCache;break;default:throw Error(gt(314))}i!==null&&i.delete(t),by(e,n)}function qb(e,t){return kp(e,t)}var Bu=null,Pr=null,Nh=!1,Fu=!1,ad=!1,fs=0;function da(e){e!==Pr&&e.next===null&&(Pr===null?Bu=Pr=e:Pr=Pr.next=e),Fu=!0,Nh||(Nh=!0,jb())}function jl(e,t){if(!ad&&Fu){ad=!0;do for(var n=!1,i=Bu;i!==null;){if(e!==0){var a=i.pendingLanes;if(a===0)var s=0;else{var r=i.suspendedLanes,o=i.pingedLanes;s=(1<<31-vi(42|e)+1)-1,s&=a&~(r&~o),s=s&201326741?s&201326741|1:s?s|2:0}s!==0&&(n=!0,c0(i,s))}else s=De,s=rf(i,i===$e?s:0,i.cancelPendingCommit!==null||i.timeoutHandle!==-1),!(s&3)||Gl(i,s)||(n=!0,c0(i,s));i=i.next}while(n);ad=!1}}function Yb(){Ey()}function Ey(){Fu=Nh=!1;var e=0;fs!==0&&aE()&&(e=fs);for(var t=mi(),n=null,i=Bu;i!==null;){var a=i.next,s=Ty(i,t);s===0?(i.next=null,n===null?Bu=a:n.next=a,a===null&&(Pr=n)):(n=i,(e!==0||s&3)&&(Fu=!0)),i=a}yn!==0&&yn!==5||jl(e),fs!==0&&(fs=0)}function Ty(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,s=e.pendingLanes&-62914561;0<s;){var r=31-vi(s),o=1<<r,l=a[r];l===-1?(!(o&n)||o&i)&&(a[r]=yM(o,t)):l<=t&&(e.expiredLanes|=o),s&=~o}if(t=$e,n=De,n=rf(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i=e.callbackNode,n===0||e===t&&(Ye===2||Ye===9)||e.cancelPendingCommit!==null)return i!==null&&i!==null&&Uf(i),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||Gl(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(i!==null&&Uf(i),Wp(n)){case 2:case 8:n=d_;break;case 32:n=Su;break;case 268435456:n=h_;break;default:n=Su}return i=Ay.bind(null,e),n=kp(n,i),e.callbackPriority=t,e.callbackNode=n,t}return i!==null&&i!==null&&Uf(i),e.callbackPriority=2,e.callbackNode=null,2}function Ay(e,t){if(yn!==0&&yn!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(yf()&&e.callbackNode!==n)return null;var i=De;return i=rf(e,e===$e?i:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),i===0?null:(fy(e,i,t),Ty(e,mi()),e.callbackNode!=null&&e.callbackNode===n?Ay.bind(null,e):null)}function c0(e,t){if(yf())return null;fy(e,t,!0)}function jb(){rE(function(){He&6?kp(f_,Yb):Ey()})}function wm(){if(fs===0){var e=co;e===0&&(e=nc,nc<<=1,!(nc&261888)&&(nc=256)),fs=e}return fs}function u0(e){return e==null||typeof e=="symbol"||typeof e=="boolean"?null:typeof e=="function"?e:Zc(""+e)}function f0(e,t){var n=t.ownerDocument.createElement("input");return n.name=t.name,n.value=t.value,e.id&&n.setAttribute("form",e.id),t.parentNode.insertBefore(n,t),e=new FormData(e),n.parentNode.removeChild(n),e}function Zb(e,t,n,i,a){if(t==="submit"&&n&&n.stateNode===a){var s=u0((a[ri]||null).action),r=i.submitter;r&&(t=(t=r[ri]||null)?u0(t.formAction):r.getAttribute("formAction"),t!==null&&(s=t,r=null));var o=new of("action","action",null,i,a);e.push({event:o,listeners:[{instance:null,listener:function(){if(i.defaultPrevented){if(fs!==0){var l=r?f0(a,r):new FormData(a);Sh(n,{pending:!0,data:l,method:a.method,action:s},null,l)}}else typeof s=="function"&&(o.preventDefault(),l=r?f0(a,r):new FormData(a),Sh(n,{pending:!0,data:l,method:a.method,action:s},s,l))},currentTarget:a}]})}}for(var sd=0;sd<ch.length;sd++){var rd=ch[sd],Kb=rd.toLowerCase(),Qb=rd[0].toUpperCase()+rd.slice(1);Ki(Kb,"on"+Qb)}Ki(B_,"onAnimationEnd");Ki(F_,"onAnimationIteration");Ki(H_,"onAnimationStart");Ki("dblclick","onDoubleClick");Ki("focusin","onFocus");Ki("focusout","onBlur");Ki(hb,"onTransitionRun");Ki(pb,"onTransitionStart");Ki(mb,"onTransitionCancel");Ki(G_,"onTransitionEnd");oo("onMouseEnter",["mouseout","mouseover"]);oo("onMouseLeave",["mouseout","mouseover"]);oo("onPointerEnter",["pointerout","pointerover"]);oo("onPointerLeave",["pointerout","pointerover"]);or("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));or("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));or("onBeforeInput",["compositionend","keypress","textInput","paste"]);or("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));or("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));or("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Dl="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Jb=new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Dl));function Ry(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;t:{var s=void 0;if(t)for(var r=i.length-1;0<=r;r--){var o=i[r],l=o.instance,c=o.currentTarget;if(o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(d){bu(d)}a.currentTarget=null,s=l}else for(r=0;r<i.length;r++){if(o=i[r],l=o.instance,c=o.currentTarget,o=o.listener,l!==s&&a.isPropagationStopped())break t;s=o,a.currentTarget=c;try{s(a)}catch(d){bu(d)}a.currentTarget=null,s=l}}}}function Re(e,t){var n=t[eh];n===void 0&&(n=t[eh]=new Set);var i=e+"__bubble";n.has(i)||(Cy(t,e,2,!1),n.add(i))}function od(e,t,n){var i=0;t&&(i|=4),Cy(n,e,i,t)}var dc="_reactListening"+Math.random().toString(36).slice(2);function Dm(e){if(!e[dc]){e[dc]=!0,x_.forEach(function(n){n!=="selectionchange"&&(Jb.has(n)||od(n,!1,e),od(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[dc]||(t[dc]=!0,od("selectionchange",!1,t))}}function Cy(e,t,n,i){switch(Gy(t)){case 2:var a=AE;break;case 8:a=RE;break;default:a=Om}n=a.bind(null,t,n,e),a=void 0,!rh||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function ld(e,t,n,i,a){var s=i;if(!(t&1)&&!(t&2)&&i!==null)t:for(;;){if(i===null)return;var r=i.tag;if(r===3||r===4){var o=i.stateNode.containerInfo;if(o===a)break;if(r===4)for(r=i.return;r!==null;){var l=r.tag;if((l===3||l===4)&&r.stateNode.containerInfo===a)return;r=r.return}for(;o!==null;){if(r=Br(o),r===null)return;if(l=r.tag,l===5||l===6||l===26||l===27){i=s=r;continue t}o=o.parentNode}}i=i.return}R_(function(){var c=s,d=jp(n),h=[];t:{var u=V_.get(e);if(u!==void 0){var p=of,g=e;switch(e){case"keypress":if(Qc(n)===0)break t;case"keydown":case"keyup":p=WM;break;case"focusin":g="focus",p=If;break;case"focusout":g="blur",p=If;break;case"beforeblur":case"afterblur":p=If;break;case"click":if(n.button===2)break t;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":p=xg;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":p=LM;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":p=jM;break;case B_:case F_:case H_:p=zM;break;case G_:p=KM;break;case"scroll":case"scrollend":p=NM;break;case"wheel":p=JM;break;case"copy":case"cut":case"paste":p=BM;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":p=Sg;break;case"toggle":case"beforetoggle":p=tb}var S=(t&4)!==0,m=!S&&(e==="scroll"||e==="scrollend"),f=S?u!==null?u+"Capture":null:u;S=[];for(var v=c,M;v!==null;){var y=v;if(M=y.stateNode,y=y.tag,y!==5&&y!==26&&y!==27||M===null||f===null||(y=Ml(v,f),y!=null&&S.push(Nl(v,y,M))),m)break;v=v.return}0<S.length&&(u=new p(u,g,null,n,d),h.push({event:u,listeners:S}))}}if(!(t&7)){t:{if(u=e==="mouseover"||e==="pointerover",p=e==="mouseout"||e==="pointerout",u&&n!==sh&&(g=n.relatedTarget||n.fromElement)&&(Br(g)||g[Eo]))break t;if((p||u)&&(u=d.window===d?d:(u=d.ownerDocument)?u.defaultView||u.parentWindow:window,p?(g=n.relatedTarget||n.toElement,p=c,g=g?Br(g):null,g!==null&&(m=Fl(g),S=g.tag,g!==m||S!==5&&S!==27&&S!==6)&&(g=null)):(p=null,g=c),p!==g)){if(S=xg,y="onMouseLeave",f="onMouseEnter",v="mouse",(e==="pointerout"||e==="pointerover")&&(S=Sg,y="onPointerLeave",f="onPointerEnter",v="pointer"),m=p==null?u:tl(p),M=g==null?u:tl(g),u=new S(y,v+"leave",p,n,d),u.target=m,u.relatedTarget=M,y=null,Br(d)===c&&(S=new S(f,v+"enter",g,n,d),S.target=M,S.relatedTarget=m,y=S),m=y,p&&g)e:{for(S=$b,f=p,v=g,M=0,y=f;y;y=S(y))M++;y=0;for(var U=v;U;U=S(U))y++;for(;0<M-y;)f=S(f),M--;for(;0<y-M;)v=S(v),y--;for(;M--;){if(f===v||v!==null&&f===v.alternate){S=f;break e}f=S(f),v=S(v)}S=null}else S=null;p!==null&&d0(h,u,p,S,!1),g!==null&&m!==null&&d0(h,m,g,S,!0)}}t:{if(u=c?tl(c):window,p=u.nodeName&&u.nodeName.toLowerCase(),p==="select"||p==="input"&&u.type==="file")var C=Tg;else if(Eg(u))if(L_)C=ub;else{C=lb;var T=ob}else p=u.nodeName,!p||p.toLowerCase()!=="input"||u.type!=="checkbox"&&u.type!=="radio"?c&&Yp(c.elementType)&&(C=Tg):C=cb;if(C&&(C=C(e,c))){U_(h,C,n,d);break t}T&&T(e,u,c),e==="focusout"&&c&&u.type==="number"&&c.memoizedProps.value!=null&&ah(u,"number",u.value)}switch(T=c?tl(c):window,e){case"focusin":(Eg(T)||T.contentEditable==="true")&&(Gr=T,oh=c,cl=null);break;case"focusout":cl=oh=Gr=null;break;case"mousedown":lh=!0;break;case"contextmenu":case"mouseup":case"dragend":lh=!1,Dg(h,n,d);break;case"selectionchange":if(db)break;case"keydown":case"keyup":Dg(h,n,d)}var x;if(Qp)t:{switch(e){case"compositionstart":var w="onCompositionStart";break t;case"compositionend":w="onCompositionEnd";break t;case"compositionupdate":w="onCompositionUpdate";break t}w=void 0}else Hr?D_(e,n)&&(w="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(w="onCompositionStart");w&&(w_&&n.locale!=="ko"&&(Hr||w!=="onCompositionStart"?w==="onCompositionEnd"&&Hr&&(x=C_()):(ls=d,Zp="value"in ls?ls.value:ls.textContent,Hr=!0)),T=Hu(c,w),0<T.length&&(w=new yg(w,e,null,n,d),h.push({event:w,listeners:T}),x?w.data=x:(x=N_(n),x!==null&&(w.data=x)))),(x=nb?ib(e,n):ab(e,n))&&(w=Hu(c,"onBeforeInput"),0<w.length&&(T=new yg("onBeforeInput","beforeinput",null,n,d),h.push({event:T,listeners:w}),T.data=x)),Zb(h,e,c,n,d)}Ry(h,t)})}function Nl(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Hu(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,s=a.stateNode;if(a=a.tag,a!==5&&a!==26&&a!==27||s===null||(a=Ml(e,n),a!=null&&i.unshift(Nl(e,a,s)),a=Ml(e,t),a!=null&&i.push(Nl(e,a,s))),e.tag===3)return i;e=e.return}return[]}function $b(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function d0(e,t,n,i,a){for(var s=t._reactName,r=[];n!==null&&n!==i;){var o=n,l=o.alternate,c=o.stateNode;if(o=o.tag,l!==null&&l===i)break;o!==5&&o!==26&&o!==27||c===null||(l=c,a?(c=Ml(n,s),c!=null&&r.unshift(Nl(n,c,l))):a||(c=Ml(n,s),c!=null&&r.push(Nl(n,c,l)))),n=n.return}r.length!==0&&e.push({event:t,listeners:r})}var tE=/\r\n?/g,eE=/\u0000|\uFFFD/g;function h0(e){return(typeof e=="string"?e:""+e).replace(tE,`
`).replace(eE,"")}function wy(e,t){return t=h0(t),h0(e)===t}function Qe(e,t,n,i,a,s){switch(n){case"children":typeof i=="string"?t==="body"||t==="textarea"&&i===""||lo(e,i):(typeof i=="number"||typeof i=="bigint")&&t!=="body"&&lo(e,""+i);break;case"className":sc(e,"class",i);break;case"tabIndex":sc(e,"tabindex",i);break;case"dir":case"role":case"viewBox":case"width":case"height":sc(e,n,i);break;case"style":A_(e,i,s);break;case"data":if(t!=="object"){sc(e,"data",i);break}case"src":case"href":if(i===""&&(t!=="a"||n!=="href")){e.removeAttribute(n);break}if(i==null||typeof i=="function"||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Zc(""+i),e.setAttribute(n,i);break;case"action":case"formAction":if(typeof i=="function"){e.setAttribute(n,"javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");break}else typeof s=="function"&&(n==="formAction"?(t!=="input"&&Qe(e,t,"name",a.name,a,null),Qe(e,t,"formEncType",a.formEncType,a,null),Qe(e,t,"formMethod",a.formMethod,a,null),Qe(e,t,"formTarget",a.formTarget,a,null)):(Qe(e,t,"encType",a.encType,a,null),Qe(e,t,"method",a.method,a,null),Qe(e,t,"target",a.target,a,null)));if(i==null||typeof i=="symbol"||typeof i=="boolean"){e.removeAttribute(n);break}i=Zc(""+i),e.setAttribute(n,i);break;case"onClick":i!=null&&(e.onclick=Da);break;case"onScroll":i!=null&&Re("scroll",e);break;case"onScrollEnd":i!=null&&Re("scrollend",e);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(gt(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(gt(60));e.innerHTML=n}}break;case"multiple":e.multiple=i&&typeof i!="function"&&typeof i!="symbol";break;case"muted":e.muted=i&&typeof i!="function"&&typeof i!="symbol";break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"defaultValue":case"defaultChecked":case"innerHTML":case"ref":break;case"autoFocus":break;case"xlinkHref":if(i==null||typeof i=="function"||typeof i=="boolean"||typeof i=="symbol"){e.removeAttribute("xlink:href");break}n=Zc(""+i),e.setAttributeNS("http://www.w3.org/1999/xlink","xlink:href",n);break;case"contentEditable":case"spellCheck":case"draggable":case"value":case"autoReverse":case"externalResourcesRequired":case"focusable":case"preserveAlpha":i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""+i):e.removeAttribute(n);break;case"inert":case"allowFullScreen":case"async":case"autoPlay":case"controls":case"default":case"defer":case"disabled":case"disablePictureInPicture":case"disableRemotePlayback":case"formNoValidate":case"hidden":case"loop":case"noModule":case"noValidate":case"open":case"playsInline":case"readOnly":case"required":case"reversed":case"scoped":case"seamless":case"itemScope":i&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,""):e.removeAttribute(n);break;case"capture":case"download":i===!0?e.setAttribute(n,""):i!==!1&&i!=null&&typeof i!="function"&&typeof i!="symbol"?e.setAttribute(n,i):e.removeAttribute(n);break;case"cols":case"rows":case"size":case"span":i!=null&&typeof i!="function"&&typeof i!="symbol"&&!isNaN(i)&&1<=i?e.setAttribute(n,i):e.removeAttribute(n);break;case"rowSpan":case"start":i==null||typeof i=="function"||typeof i=="symbol"||isNaN(i)?e.removeAttribute(n):e.setAttribute(n,i);break;case"popover":Re("beforetoggle",e),Re("toggle",e),jc(e,"popover",i);break;case"xlinkActuate":ma(e,"http://www.w3.org/1999/xlink","xlink:actuate",i);break;case"xlinkArcrole":ma(e,"http://www.w3.org/1999/xlink","xlink:arcrole",i);break;case"xlinkRole":ma(e,"http://www.w3.org/1999/xlink","xlink:role",i);break;case"xlinkShow":ma(e,"http://www.w3.org/1999/xlink","xlink:show",i);break;case"xlinkTitle":ma(e,"http://www.w3.org/1999/xlink","xlink:title",i);break;case"xlinkType":ma(e,"http://www.w3.org/1999/xlink","xlink:type",i);break;case"xmlBase":ma(e,"http://www.w3.org/XML/1998/namespace","xml:base",i);break;case"xmlLang":ma(e,"http://www.w3.org/XML/1998/namespace","xml:lang",i);break;case"xmlSpace":ma(e,"http://www.w3.org/XML/1998/namespace","xml:space",i);break;case"is":jc(e,"is",i);break;case"innerText":case"textContent":break;default:(!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(n=wM.get(n)||n,jc(e,n,i))}}function Uh(e,t,n,i,a,s){switch(n){case"style":A_(e,i,s);break;case"dangerouslySetInnerHTML":if(i!=null){if(typeof i!="object"||!("__html"in i))throw Error(gt(61));if(n=i.__html,n!=null){if(a.children!=null)throw Error(gt(60));e.innerHTML=n}}break;case"children":typeof i=="string"?lo(e,i):(typeof i=="number"||typeof i=="bigint")&&lo(e,""+i);break;case"onScroll":i!=null&&Re("scroll",e);break;case"onScrollEnd":i!=null&&Re("scrollend",e);break;case"onClick":i!=null&&(e.onclick=Da);break;case"suppressContentEditableWarning":case"suppressHydrationWarning":case"innerHTML":case"ref":break;case"innerText":case"textContent":break;default:if(!y_.hasOwnProperty(n))t:{if(n[0]==="o"&&n[1]==="n"&&(a=n.endsWith("Capture"),t=n.slice(2,a?n.length-7:void 0),s=e[ri]||null,s=s!=null?s[n]:null,typeof s=="function"&&e.removeEventListener(t,s,a),typeof i=="function")){typeof s!="function"&&s!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(t,i,a);break t}n in e?e[n]=i:i===!0?e.setAttribute(n,""):jc(e,n,i)}}}function Fn(e,t,n){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"img":Re("error",e),Re("load",e);var i=!1,a=!1,s;for(s in n)if(n.hasOwnProperty(s)){var r=n[s];if(r!=null)switch(s){case"src":i=!0;break;case"srcSet":a=!0;break;case"children":case"dangerouslySetInnerHTML":throw Error(gt(137,t));default:Qe(e,t,s,r,n,null)}}a&&Qe(e,t,"srcSet",n.srcSet,n,null),i&&Qe(e,t,"src",n.src,n,null);return;case"input":Re("invalid",e);var o=s=r=a=null,l=null,c=null;for(i in n)if(n.hasOwnProperty(i)){var d=n[i];if(d!=null)switch(i){case"name":a=d;break;case"type":r=d;break;case"checked":l=d;break;case"defaultChecked":c=d;break;case"value":s=d;break;case"defaultValue":o=d;break;case"children":case"dangerouslySetInnerHTML":if(d!=null)throw Error(gt(137,t));break;default:Qe(e,t,i,d,n,null)}}b_(e,s,o,l,c,r,a,!1);return;case"select":Re("invalid",e),i=r=s=null;for(a in n)if(n.hasOwnProperty(a)&&(o=n[a],o!=null))switch(a){case"value":s=o;break;case"defaultValue":r=o;break;case"multiple":i=o;default:Qe(e,t,a,o,n,null)}t=s,n=r,e.multiple=!!i,t!=null?Jr(e,!!i,t,!1):n!=null&&Jr(e,!!i,n,!0);return;case"textarea":Re("invalid",e),s=a=i=null;for(r in n)if(n.hasOwnProperty(r)&&(o=n[r],o!=null))switch(r){case"value":i=o;break;case"defaultValue":a=o;break;case"children":s=o;break;case"dangerouslySetInnerHTML":if(o!=null)throw Error(gt(91));break;default:Qe(e,t,r,o,n,null)}T_(e,i,a,s);return;case"option":for(l in n)if(n.hasOwnProperty(l)&&(i=n[l],i!=null))switch(l){case"selected":e.selected=i&&typeof i!="function"&&typeof i!="symbol";break;default:Qe(e,t,l,i,n,null)}return;case"dialog":Re("beforetoggle",e),Re("toggle",e),Re("cancel",e),Re("close",e);break;case"iframe":case"object":Re("load",e);break;case"video":case"audio":for(i=0;i<Dl.length;i++)Re(Dl[i],e);break;case"image":Re("error",e),Re("load",e);break;case"details":Re("toggle",e);break;case"embed":case"source":case"link":Re("error",e),Re("load",e);case"area":case"base":case"br":case"col":case"hr":case"keygen":case"meta":case"param":case"track":case"wbr":case"menuitem":for(c in n)if(n.hasOwnProperty(c)&&(i=n[c],i!=null))switch(c){case"children":case"dangerouslySetInnerHTML":throw Error(gt(137,t));default:Qe(e,t,c,i,n,null)}return;default:if(Yp(t)){for(d in n)n.hasOwnProperty(d)&&(i=n[d],i!==void 0&&Uh(e,t,d,i,n,void 0));return}}for(o in n)n.hasOwnProperty(o)&&(i=n[o],i!=null&&Qe(e,t,o,i,n,null))}function nE(e,t,n,i){switch(t){case"div":case"span":case"svg":case"path":case"a":case"g":case"p":case"li":break;case"input":var a=null,s=null,r=null,o=null,l=null,c=null,d=null;for(p in n){var h=n[p];if(n.hasOwnProperty(p)&&h!=null)switch(p){case"checked":break;case"value":break;case"defaultValue":l=h;default:i.hasOwnProperty(p)||Qe(e,t,p,null,i,h)}}for(var u in i){var p=i[u];if(h=n[u],i.hasOwnProperty(u)&&(p!=null||h!=null))switch(u){case"type":s=p;break;case"name":a=p;break;case"checked":c=p;break;case"defaultChecked":d=p;break;case"value":r=p;break;case"defaultValue":o=p;break;case"children":case"dangerouslySetInnerHTML":if(p!=null)throw Error(gt(137,t));break;default:p!==h&&Qe(e,t,u,p,i,h)}}ih(e,r,o,l,c,d,s,a);return;case"select":p=r=o=u=null;for(s in n)if(l=n[s],n.hasOwnProperty(s)&&l!=null)switch(s){case"value":break;case"multiple":p=l;default:i.hasOwnProperty(s)||Qe(e,t,s,null,i,l)}for(a in i)if(s=i[a],l=n[a],i.hasOwnProperty(a)&&(s!=null||l!=null))switch(a){case"value":u=s;break;case"defaultValue":o=s;break;case"multiple":r=s;default:s!==l&&Qe(e,t,a,s,i,l)}t=o,n=r,i=p,u!=null?Jr(e,!!n,u,!1):!!i!=!!n&&(t!=null?Jr(e,!!n,t,!0):Jr(e,!!n,n?[]:"",!1));return;case"textarea":p=u=null;for(o in n)if(a=n[o],n.hasOwnProperty(o)&&a!=null&&!i.hasOwnProperty(o))switch(o){case"value":break;case"children":break;default:Qe(e,t,o,null,i,a)}for(r in i)if(a=i[r],s=n[r],i.hasOwnProperty(r)&&(a!=null||s!=null))switch(r){case"value":u=a;break;case"defaultValue":p=a;break;case"children":break;case"dangerouslySetInnerHTML":if(a!=null)throw Error(gt(91));break;default:a!==s&&Qe(e,t,r,a,i,s)}E_(e,u,p);return;case"option":for(var g in n)if(u=n[g],n.hasOwnProperty(g)&&u!=null&&!i.hasOwnProperty(g))switch(g){case"selected":e.selected=!1;break;default:Qe(e,t,g,null,i,u)}for(l in i)if(u=i[l],p=n[l],i.hasOwnProperty(l)&&u!==p&&(u!=null||p!=null))switch(l){case"selected":e.selected=u&&typeof u!="function"&&typeof u!="symbol";break;default:Qe(e,t,l,u,i,p)}return;case"img":case"link":case"area":case"base":case"br":case"col":case"embed":case"hr":case"keygen":case"meta":case"param":case"source":case"track":case"wbr":case"menuitem":for(var S in n)u=n[S],n.hasOwnProperty(S)&&u!=null&&!i.hasOwnProperty(S)&&Qe(e,t,S,null,i,u);for(c in i)if(u=i[c],p=n[c],i.hasOwnProperty(c)&&u!==p&&(u!=null||p!=null))switch(c){case"children":case"dangerouslySetInnerHTML":if(u!=null)throw Error(gt(137,t));break;default:Qe(e,t,c,u,i,p)}return;default:if(Yp(t)){for(var m in n)u=n[m],n.hasOwnProperty(m)&&u!==void 0&&!i.hasOwnProperty(m)&&Uh(e,t,m,void 0,i,u);for(d in i)u=i[d],p=n[d],!i.hasOwnProperty(d)||u===p||u===void 0&&p===void 0||Uh(e,t,d,u,i,p);return}}for(var f in n)u=n[f],n.hasOwnProperty(f)&&u!=null&&!i.hasOwnProperty(f)&&Qe(e,t,f,null,i,u);for(h in i)u=i[h],p=n[h],!i.hasOwnProperty(h)||u===p||u==null&&p==null||Qe(e,t,h,u,i,p)}function p0(e){switch(e){case"css":case"script":case"font":case"img":case"image":case"input":case"link":return!0;default:return!1}}function iE(){if(typeof performance.getEntriesByType=="function"){for(var e=0,t=0,n=performance.getEntriesByType("resource"),i=0;i<n.length;i++){var a=n[i],s=a.transferSize,r=a.initiatorType,o=a.duration;if(s&&o&&p0(r)){for(r=0,o=a.responseEnd,i+=1;i<n.length;i++){var l=n[i],c=l.startTime;if(c>o)break;var d=l.transferSize,h=l.initiatorType;d&&p0(h)&&(l=l.responseEnd,r+=d*(l<o?1:(o-c)/(l-c)))}if(--i,t+=8*(s+r)/(a.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e=="number")?e:5}var Lh=null,Oh=null;function Gu(e){return e.nodeType===9?e:e.ownerDocument}function m0(e){switch(e){case"http://www.w3.org/2000/svg":return 1;case"http://www.w3.org/1998/Math/MathML":return 2;default:return 0}}function Dy(e,t){if(e===0)switch(t){case"svg":return 1;case"math":return 2;default:return 0}return e===1&&t==="foreignObject"?0:e}function Ph(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.children=="bigint"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var cd=null;function aE(){var e=window.event;return e&&e.type==="popstate"?e===cd?!1:(cd=e,!0):(cd=null,!1)}var Ny=typeof setTimeout=="function"?setTimeout:void 0,sE=typeof clearTimeout=="function"?clearTimeout:void 0,g0=typeof Promise=="function"?Promise:void 0,rE=typeof queueMicrotask=="function"?queueMicrotask:typeof g0<"u"?function(e){return g0.resolve(null).then(e).catch(oE)}:Ny;function oE(e){setTimeout(function(){throw e})}function ws(e){return e==="head"}function v0(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"||n==="/&"){if(i===0){e.removeChild(a),vo(t);return}i--}else if(n==="$"||n==="$?"||n==="$~"||n==="$!"||n==="&")i++;else if(n==="html")xl(e.ownerDocument.documentElement);else if(n==="head"){n=e.ownerDocument.head,xl(n);for(var s=n.firstChild;s;){var r=s.nextSibling,o=s.nodeName;s[kl]||o==="SCRIPT"||o==="STYLE"||o==="LINK"&&s.rel.toLowerCase()==="stylesheet"||n.removeChild(s),s=r}}else n==="body"&&xl(e.ownerDocument.body);n=a}while(n);vo(t)}function _0(e,t){var n=e;e=0;do{var i=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display="none"):(n.style.display=n._stashedDisplay||"",n.getAttribute("style")===""&&n.removeAttribute("style")):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=""):n.nodeValue=n._stashedText||""),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(e===0)break;e--}else n!=="$"&&n!=="$?"&&n!=="$~"&&n!=="$!"||e++;n=i}while(n)}function zh(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case"HTML":case"HEAD":case"BODY":zh(n),qp(n);continue;case"SCRIPT":case"STYLE":continue;case"LINK":if(n.rel.toLowerCase()==="stylesheet")continue}e.removeChild(n)}}function lE(e,t,n,i){for(;e.nodeType===1;){var a=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!i&&(e.nodeName!=="INPUT"||e.type!=="hidden"))break}else if(i){if(!e[kl])switch(t){case"meta":if(!e.hasAttribute("itemprop"))break;return e;case"link":if(s=e.getAttribute("rel"),s==="stylesheet"&&e.hasAttribute("data-precedence"))break;if(s!==a.rel||e.getAttribute("href")!==(a.href==null||a.href===""?null:a.href)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin)||e.getAttribute("title")!==(a.title==null?null:a.title))break;return e;case"style":if(e.hasAttribute("data-precedence"))break;return e;case"script":if(s=e.getAttribute("src"),(s!==(a.src==null?null:a.src)||e.getAttribute("type")!==(a.type==null?null:a.type)||e.getAttribute("crossorigin")!==(a.crossOrigin==null?null:a.crossOrigin))&&s&&e.hasAttribute("async")&&!e.hasAttribute("itemprop"))break;return e;default:return e}}else if(t==="input"&&e.type==="hidden"){var s=a.name==null?null:""+a.name;if(a.type==="hidden"&&e.getAttribute("name")===s)return e}else return e;if(e=Ii(e.nextSibling),e===null)break}return null}function cE(e,t,n){if(t==="")return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!n||(e=Ii(e.nextSibling),e===null))return null;return e}function Uy(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!=="INPUT"||e.type!=="hidden")&&!t||(e=Ii(e.nextSibling),e===null))return null;return e}function Ih(e){return e.data==="$?"||e.data==="$~"}function Bh(e){return e.data==="$!"||e.data==="$?"&&e.ownerDocument.readyState!=="loading"}function uE(e,t){var n=e.ownerDocument;if(e.data==="$~")e._reactRetry=t;else if(e.data!=="$?"||n.readyState!=="loading")t();else{var i=function(){t(),n.removeEventListener("DOMContentLoaded",i)};n.addEventListener("DOMContentLoaded",i),e._reactRetry=i}}function Ii(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?"||t==="$~"||t==="&"||t==="F!"||t==="F")break;if(t==="/$"||t==="/&")return null}}return e}var Fh=null;function x0(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"||n==="/&"){if(t===0)return Ii(e.nextSibling);t--}else n!=="$"&&n!=="$!"&&n!=="$?"&&n!=="$~"&&n!=="&"||t++}e=e.nextSibling}return null}function y0(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"||n==="$~"||n==="&"){if(t===0)return e;t--}else n!=="/$"&&n!=="/&"||t++}e=e.previousSibling}return null}function Ly(e,t,n){switch(t=Gu(n),e){case"html":if(e=t.documentElement,!e)throw Error(gt(452));return e;case"head":if(e=t.head,!e)throw Error(gt(453));return e;case"body":if(e=t.body,!e)throw Error(gt(454));return e;default:throw Error(gt(451))}}function xl(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);qp(e)}var Fi=new Map,S0=new Set;function Vu(e){return typeof e.getRootNode=="function"?e.getRootNode():e.nodeType===9?e:e.ownerDocument}var Wa=Ge.d;Ge.d={f:fE,r:dE,D:hE,C:pE,L:mE,m:gE,X:_E,S:vE,M:xE};function fE(){var e=Wa.f(),t=_f();return e||t}function dE(e){var t=To(e);t!==null&&t.tag===5&&t.type==="form"?Ax(t):Wa.r(e)}var wo=typeof document>"u"?null:document;function Oy(e,t,n){var i=wo;if(i&&typeof t=="string"&&t){var a=Ni(t);a='link[rel="'+e+'"][href="'+a+'"]',typeof n=="string"&&(a+='[crossorigin="'+n+'"]'),S0.has(a)||(S0.add(a),e={rel:e,crossOrigin:n,href:t},i.querySelector(a)===null&&(t=i.createElement("link"),Fn(t,"link",e),Rn(t),i.head.appendChild(t)))}}function hE(e){Wa.D(e),Oy("dns-prefetch",e,null)}function pE(e,t){Wa.C(e,t),Oy("preconnect",e,t)}function mE(e,t,n){Wa.L(e,t,n);var i=wo;if(i&&e&&t){var a='link[rel="preload"][as="'+Ni(t)+'"]';t==="image"&&n&&n.imageSrcSet?(a+='[imagesrcset="'+Ni(n.imageSrcSet)+'"]',typeof n.imageSizes=="string"&&(a+='[imagesizes="'+Ni(n.imageSizes)+'"]')):a+='[href="'+Ni(e)+'"]';var s=a;switch(t){case"style":s=go(e);break;case"script":s=Do(e)}Fi.has(s)||(e=on({rel:"preload",href:t==="image"&&n&&n.imageSrcSet?void 0:e,as:t},n),Fi.set(s,e),i.querySelector(a)!==null||t==="style"&&i.querySelector(Zl(s))||t==="script"&&i.querySelector(Kl(s))||(t=i.createElement("link"),Fn(t,"link",e),Rn(t),i.head.appendChild(t)))}}function gE(e,t){Wa.m(e,t);var n=wo;if(n&&e){var i=t&&typeof t.as=="string"?t.as:"script",a='link[rel="modulepreload"][as="'+Ni(i)+'"][href="'+Ni(e)+'"]',s=a;switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":s=Do(e)}if(!Fi.has(s)&&(e=on({rel:"modulepreload",href:e},t),Fi.set(s,e),n.querySelector(a)===null)){switch(i){case"audioworklet":case"paintworklet":case"serviceworker":case"sharedworker":case"worker":case"script":if(n.querySelector(Kl(s)))return}i=n.createElement("link"),Fn(i,"link",e),Rn(i),n.head.appendChild(i)}}}function vE(e,t,n){Wa.S(e,t,n);var i=wo;if(i&&e){var a=Qr(i).hoistableStyles,s=go(e);t=t||"default";var r=a.get(s);if(!r){var o={loading:0,preload:null};if(r=i.querySelector(Zl(s)))o.loading=5;else{e=on({rel:"stylesheet",href:e,"data-precedence":t},n),(n=Fi.get(s))&&Nm(e,n);var l=r=i.createElement("link");Rn(l),Fn(l,"link",e),l._p=new Promise(function(c,d){l.onload=c,l.onerror=d}),l.addEventListener("load",function(){o.loading|=1}),l.addEventListener("error",function(){o.loading|=2}),o.loading|=4,su(r,t,i)}r={type:"stylesheet",instance:r,count:1,state:o},a.set(s,r)}}}function _E(e,t){Wa.X(e,t);var n=wo;if(n&&e){var i=Qr(n).hoistableScripts,a=Do(e),s=i.get(a);s||(s=n.querySelector(Kl(a)),s||(e=on({src:e,async:!0},t),(t=Fi.get(a))&&Um(e,t),s=n.createElement("script"),Rn(s),Fn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function xE(e,t){Wa.M(e,t);var n=wo;if(n&&e){var i=Qr(n).hoistableScripts,a=Do(e),s=i.get(a);s||(s=n.querySelector(Kl(a)),s||(e=on({src:e,async:!0,type:"module"},t),(t=Fi.get(a))&&Um(e,t),s=n.createElement("script"),Rn(s),Fn(s,"link",e),n.head.appendChild(s)),s={type:"script",instance:s,count:1,state:null},i.set(a,s))}}function M0(e,t,n,i){var a=(a=ps.current)?Vu(a):null;if(!a)throw Error(gt(446));switch(e){case"meta":case"title":return null;case"style":return typeof n.precedence=="string"&&typeof n.href=="string"?(t=go(n.href),n=Qr(a).hoistableStyles,i=n.get(t),i||(i={type:"style",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};case"link":if(n.rel==="stylesheet"&&typeof n.href=="string"&&typeof n.precedence=="string"){e=go(n.href);var s=Qr(a).hoistableStyles,r=s.get(e);if(r||(a=a.ownerDocument||a,r={type:"stylesheet",instance:null,count:0,state:{loading:0,preload:null}},s.set(e,r),(s=a.querySelector(Zl(e)))&&!s._p&&(r.instance=s,r.state.loading=5),Fi.has(e)||(n={rel:"preload",as:"style",href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},Fi.set(e,n),s||yE(a,e,n,r.state))),t&&i===null)throw Error(gt(528,""));return r}if(t&&i!==null)throw Error(gt(529,""));return null;case"script":return t=n.async,n=n.src,typeof n=="string"&&t&&typeof t!="function"&&typeof t!="symbol"?(t=Do(n),n=Qr(a).hoistableScripts,i=n.get(t),i||(i={type:"script",instance:null,count:0,state:null},n.set(t,i)),i):{type:"void",instance:null,count:0,state:null};default:throw Error(gt(444,e))}}function go(e){return'href="'+Ni(e)+'"'}function Zl(e){return'link[rel="stylesheet"]['+e+"]"}function Py(e){return on({},e,{"data-precedence":e.precedence,precedence:null})}function yE(e,t,n,i){e.querySelector('link[rel="preload"][as="style"]['+t+"]")?i.loading=1:(t=e.createElement("link"),i.preload=t,t.addEventListener("load",function(){return i.loading|=1}),t.addEventListener("error",function(){return i.loading|=2}),Fn(t,"link",n),Rn(t),e.head.appendChild(t))}function Do(e){return'[src="'+Ni(e)+'"]'}function Kl(e){return"script[async]"+e}function b0(e,t,n){if(t.count++,t.instance===null)switch(t.type){case"style":var i=e.querySelector('style[data-href~="'+Ni(n.href)+'"]');if(i)return t.instance=i,Rn(i),i;var a=on({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return i=(e.ownerDocument||e).createElement("style"),Rn(i),Fn(i,"style",a),su(i,n.precedence,e),t.instance=i;case"stylesheet":a=go(n.href);var s=e.querySelector(Zl(a));if(s)return t.state.loading|=4,t.instance=s,Rn(s),s;i=Py(n),(a=Fi.get(a))&&Nm(i,a),s=(e.ownerDocument||e).createElement("link"),Rn(s);var r=s;return r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),t.state.loading|=4,su(s,n.precedence,e),t.instance=s;case"script":return s=Do(n.src),(a=e.querySelector(Kl(s)))?(t.instance=a,Rn(a),a):(i=n,(a=Fi.get(s))&&(i=on({},n),Um(i,a)),e=e.ownerDocument||e,a=e.createElement("script"),Rn(a),Fn(a,"link",i),e.head.appendChild(a),t.instance=a);case"void":return null;default:throw Error(gt(443,t.type))}else t.type==="stylesheet"&&!(t.state.loading&4)&&(i=t.instance,t.state.loading|=4,su(i,n.precedence,e));return t.instance}function su(e,t,n){for(var i=n.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'),a=i.length?i[i.length-1]:null,s=a,r=0;r<i.length;r++){var o=i[r];if(o.dataset.precedence===t)s=o;else if(s!==a)break}s?s.parentNode.insertBefore(e,s.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Nm(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.title==null&&(e.title=t.title)}function Um(e,t){e.crossOrigin==null&&(e.crossOrigin=t.crossOrigin),e.referrerPolicy==null&&(e.referrerPolicy=t.referrerPolicy),e.integrity==null&&(e.integrity=t.integrity)}var ru=null;function E0(e,t,n){if(ru===null){var i=new Map,a=ru=new Map;a.set(n,i)}else a=ru,i=a.get(n),i||(i=new Map,a.set(n,i));if(i.has(e))return i;for(i.set(e,null),n=n.getElementsByTagName(e),a=0;a<n.length;a++){var s=n[a];if(!(s[kl]||s[On]||e==="link"&&s.getAttribute("rel")==="stylesheet")&&s.namespaceURI!=="http://www.w3.org/2000/svg"){var r=s.getAttribute(t)||"";r=e+r;var o=i.get(r);o?o.push(s):i.set(r,[s])}}return i}function T0(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t==="title"?e.querySelector("head > title"):null)}function SE(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case"meta":case"title":return!0;case"style":if(typeof t.precedence!="string"||typeof t.href!="string"||t.href==="")break;return!0;case"link":if(typeof t.rel!="string"||typeof t.href!="string"||t.href===""||t.onLoad||t.onError)break;switch(t.rel){case"stylesheet":return e=t.disabled,typeof t.precedence=="string"&&e==null;default:return!0}case"script":if(t.async&&typeof t.async!="function"&&typeof t.async!="symbol"&&!t.onLoad&&!t.onError&&t.src&&typeof t.src=="string")return!0}return!1}function zy(e){return!(e.type==="stylesheet"&&!(e.state.loading&3))}function ME(e,t,n,i){if(n.type==="stylesheet"&&(typeof i.media!="string"||matchMedia(i.media).matches!==!1)&&!(n.state.loading&4)){if(n.instance===null){var a=go(i.href),s=t.querySelector(Zl(a));if(s){t=s._p,t!==null&&typeof t=="object"&&typeof t.then=="function"&&(e.count++,e=ku.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=s,Rn(s);return}s=t.ownerDocument||t,i=Py(i),(a=Fi.get(a))&&Nm(i,a),s=s.createElement("link"),Rn(s);var r=s;r._p=new Promise(function(o,l){r.onload=o,r.onerror=l}),Fn(s,"link",i),n.instance=s}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=ku.bind(e),t.addEventListener("load",n),t.addEventListener("error",n))}}var ud=0;function bE(e,t){return e.stylesheets&&e.count===0&&ou(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var i=setTimeout(function(){if(e.stylesheets&&ou(e,e.stylesheets),e.unsuspend){var s=e.unsuspend;e.unsuspend=null,s()}},6e4+t);0<e.imgBytes&&ud===0&&(ud=62500*iE());var a=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ou(e,e.stylesheets),e.unsuspend)){var s=e.unsuspend;e.unsuspend=null,s()}},(e.imgBytes>ud?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(i),clearTimeout(a)}}:null}function ku(){if(this.count--,this.count===0&&(this.imgCount===0||!this.waitingForImages)){if(this.stylesheets)ou(this,this.stylesheets);else if(this.unsuspend){var e=this.unsuspend;this.unsuspend=null,e()}}}var Xu=null;function ou(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,Xu=new Map,t.forEach(EE,e),Xu=null,ku.call(e))}function EE(e,t){if(!(t.state.loading&4)){var n=Xu.get(e);if(n)var i=n.get(null);else{n=new Map,Xu.set(e,n);for(var a=e.querySelectorAll("link[data-precedence],style[data-precedence]"),s=0;s<a.length;s++){var r=a[s];(r.nodeName==="LINK"||r.getAttribute("media")!=="not all")&&(n.set(r.dataset.precedence,r),i=r)}i&&n.set(null,i)}a=t.instance,r=a.getAttribute("data-precedence"),s=n.get(r)||i,s===i&&n.set(null,a),n.set(r,a),this.count++,i=ku.bind(this),a.addEventListener("load",i),a.addEventListener("error",i),s?s.parentNode.insertBefore(a,s.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(a,e.firstChild)),t.state.loading|=4}}var Ul={$$typeof:wa,Provider:null,Consumer:null,_currentValue:qs,_currentValue2:qs,_threadCount:0};function TE(e,t,n,i,a,s,r,o,l){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=Lf(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Lf(0),this.hiddenUpdates=Lf(null),this.identifierPrefix=i,this.onUncaughtError=a,this.onCaughtError=s,this.onRecoverableError=r,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=l,this.incompleteTransitions=new Map}function Iy(e,t,n,i,a,s,r,o,l,c,d,h){return e=new TE(e,t,n,r,l,c,d,h,o),t=1,s===!0&&(t|=24),s=hi(3,null,null,t),e.current=s,s.stateNode=e,t=am(),t.refCount++,e.pooledCache=t,t.refCount++,s.memoizedState={element:i,isDehydrated:n,cache:t},om(s),e}function By(e){return e?(e=Xr,e):Xr}function Fy(e,t,n,i,a,s){a=By(a),i.context===null?i.context=a:i.pendingContext=a,i=gs(t),i.payload={element:n},s=s===void 0?null:s,s!==null&&(i.callback=s),n=vs(e,i,t),n!==null&&(ai(n,e,t),fl(n,e,t))}function A0(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Lm(e,t){A0(e,t),(e=e.alternate)&&A0(e,t)}function Hy(e){if(e.tag===13||e.tag===31){var t=ur(e,67108864);t!==null&&ai(t,e,67108864),Lm(e,67108864)}}function R0(e){if(e.tag===13||e.tag===31){var t=_i();t=Xp(t);var n=ur(e,t);n!==null&&ai(n,e,t),Lm(e,t)}}var Wu=!0;function AE(e,t,n,i){var a=ue.T;ue.T=null;var s=Ge.p;try{Ge.p=2,Om(e,t,n,i)}finally{Ge.p=s,ue.T=a}}function RE(e,t,n,i){var a=ue.T;ue.T=null;var s=Ge.p;try{Ge.p=8,Om(e,t,n,i)}finally{Ge.p=s,ue.T=a}}function Om(e,t,n,i){if(Wu){var a=Hh(i);if(a===null)ld(e,t,i,qu,n),C0(e,i);else if(wE(a,e,t,n,i))i.stopPropagation();else if(C0(e,i),t&4&&-1<CE.indexOf(e)){for(;a!==null;){var s=To(a);if(s!==null)switch(s.tag){case 3:if(s=s.stateNode,s.current.memoizedState.isDehydrated){var r=Bs(s.pendingLanes);if(r!==0){var o=s;for(o.pendingLanes|=2,o.entangledLanes|=2;r;){var l=1<<31-vi(r);o.entanglements[1]|=l,r&=~l}da(s),!(He&6)&&(Pu=mi()+500,jl(0))}}break;case 31:case 13:o=ur(s,2),o!==null&&ai(o,s,2),_f(),Lm(s,2)}if(s=Hh(i),s===null&&ld(e,t,i,qu,n),s===a)break;a=s}a!==null&&i.stopPropagation()}else ld(e,t,i,null,n)}}function Hh(e){return e=jp(e),Pm(e)}var qu=null;function Pm(e){if(qu=null,e=Br(e),e!==null){var t=Fl(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=r_(t),e!==null)return e;e=null}else if(n===31){if(e=o_(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return qu=e,null}function Gy(e){switch(e){case"beforetoggle":case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"toggle":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 2;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 8;case"message":switch(hM()){case f_:return 2;case d_:return 8;case Su:case pM:return 32;case h_:return 268435456;default:return 32}default:return 32}}var Gh=!1,ys=null,Ss=null,Ms=null,Ll=new Map,Ol=new Map,ss=[],CE="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");function C0(e,t){switch(e){case"focusin":case"focusout":ys=null;break;case"dragenter":case"dragleave":Ss=null;break;case"mouseover":case"mouseout":Ms=null;break;case"pointerover":case"pointerout":Ll.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ol.delete(t.pointerId)}}function Ho(e,t,n,i,a,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:s,targetContainers:[a]},t!==null&&(t=To(t),t!==null&&Hy(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function wE(e,t,n,i,a){switch(t){case"focusin":return ys=Ho(ys,e,t,n,i,a),!0;case"dragenter":return Ss=Ho(Ss,e,t,n,i,a),!0;case"mouseover":return Ms=Ho(Ms,e,t,n,i,a),!0;case"pointerover":var s=a.pointerId;return Ll.set(s,Ho(Ll.get(s)||null,e,t,n,i,a)),!0;case"gotpointercapture":return s=a.pointerId,Ol.set(s,Ho(Ol.get(s)||null,e,t,n,i,a)),!0}return!1}function Vy(e){var t=Br(e.target);if(t!==null){var n=Fl(t);if(n!==null){if(t=n.tag,t===13){if(t=r_(n),t!==null){e.blockedOn=t,dg(e.priority,function(){R0(n)});return}}else if(t===31){if(t=o_(n),t!==null){e.blockedOn=t,dg(e.priority,function(){R0(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function lu(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=Hh(e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);sh=i,n.target.dispatchEvent(i),sh=null}else return t=To(n),t!==null&&Hy(t),e.blockedOn=n,!1;t.shift()}return!0}function w0(e,t,n){lu(e)&&n.delete(t)}function DE(){Gh=!1,ys!==null&&lu(ys)&&(ys=null),Ss!==null&&lu(Ss)&&(Ss=null),Ms!==null&&lu(Ms)&&(Ms=null),Ll.forEach(w0),Ol.forEach(w0)}function hc(e,t){e.blockedOn===t&&(e.blockedOn=null,Gh||(Gh=!0,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,DE)))}var pc=null;function D0(e){pc!==e&&(pc=e,Sn.unstable_scheduleCallback(Sn.unstable_NormalPriority,function(){pc===e&&(pc=null);for(var t=0;t<e.length;t+=3){var n=e[t],i=e[t+1],a=e[t+2];if(typeof i!="function"){if(Pm(i||n)===null)continue;break}var s=To(n);s!==null&&(e.splice(t,3),t-=3,Sh(s,{pending:!0,data:a,method:n.method,action:i},i,a))}}))}function vo(e){function t(l){return hc(l,e)}ys!==null&&hc(ys,e),Ss!==null&&hc(Ss,e),Ms!==null&&hc(Ms,e),Ll.forEach(t),Ol.forEach(t);for(var n=0;n<ss.length;n++){var i=ss[n];i.blockedOn===e&&(i.blockedOn=null)}for(;0<ss.length&&(n=ss[0],n.blockedOn===null);)Vy(n),n.blockedOn===null&&ss.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(i=0;i<n.length;i+=3){var a=n[i],s=n[i+1],r=a[ri]||null;if(typeof s=="function")r||D0(n);else if(r){var o=null;if(s&&s.hasAttribute("formAction")){if(a=s,r=s[ri]||null)o=r.formAction;else if(Pm(a)!==null)continue}else o=r.action;typeof o=="function"?n[i+1]=o:(n.splice(i,3),i-=3),D0(n)}}}function ky(){function e(s){s.canIntercept&&s.info==="react-transition"&&s.intercept({handler:function(){return new Promise(function(r){return a=r})},focusReset:"manual",scroll:"manual"})}function t(){a!==null&&(a(),a=null),i||setTimeout(n,20)}function n(){if(!i&&!navigation.transition){var s=navigation.currentEntry;s&&s.url!=null&&navigation.navigate(s.url,{state:s.getState(),info:"react-transition",history:"replace"})}}if(typeof navigation=="object"){var i=!1,a=null;return navigation.addEventListener("navigate",e),navigation.addEventListener("navigatesuccess",t),navigation.addEventListener("navigateerror",t),setTimeout(n,100),function(){i=!0,navigation.removeEventListener("navigate",e),navigation.removeEventListener("navigatesuccess",t),navigation.removeEventListener("navigateerror",t),a!==null&&(a(),a=null)}}}function zm(e){this._internalRoot=e}Sf.prototype.render=zm.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(gt(409));var n=t.current,i=_i();Fy(n,i,e,t,null,null)};Sf.prototype.unmount=zm.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Fy(e.current,2,null,e,null,null),_f(),t[Eo]=null}};function Sf(e){this._internalRoot=e}Sf.prototype.unstable_scheduleHydration=function(e){if(e){var t=__();e={blockedOn:null,target:e,priority:t};for(var n=0;n<ss.length&&t!==0&&t<ss[n].priority;n++);ss.splice(n,0,e),n===0&&Vy(e)}};var N0=a_.version;if(N0!=="19.2.8")throw Error(gt(527,N0,"19.2.8"));Ge.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(gt(188)):(e=Object.keys(e).join(","),Error(gt(268,e)));return e=rM(t),e=e!==null?l_(e):null,e=e===null?null:e.stateNode,e};var NE={bundleType:0,version:"19.2.8",rendererPackageName:"react-dom",currentDispatcherRef:ue,reconcilerVersion:"19.2.8"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var mc=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!mc.isDisabled&&mc.supportsFiber)try{Hl=mc.inject(NE),gi=mc}catch{}}af.createRoot=function(e,t){if(!s_(e))throw Error(gt(299));var n=!1,i="",a=Ox,s=Px,r=zx;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onUncaughtError!==void 0&&(a=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(r=t.onRecoverableError)),t=Iy(e,1,!1,null,null,n,i,null,a,s,r,ky),e[Eo]=t.current,Dm(e),new zm(t)};af.hydrateRoot=function(e,t,n){if(!s_(e))throw Error(gt(299));var i=!1,a="",s=Ox,r=Px,o=zx,l=null;return n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onUncaughtError!==void 0&&(s=n.onUncaughtError),n.onCaughtError!==void 0&&(r=n.onCaughtError),n.onRecoverableError!==void 0&&(o=n.onRecoverableError),n.formState!==void 0&&(l=n.formState)),t=Iy(e,1,!0,t,n??null,i,a,l,s,r,o,ky),t.context=By(null),n=t.current,i=_i(),i=Xp(i),a=gs(i),a.callback=null,vs(n,a,i),n=i,t.current.lanes=n,Vl(t,n),da(t),e[Eo]=t.current,Dm(e),new Sf(t)};af.version="19.2.8";function Xy(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Xy)}catch(e){console.error(e)}}Xy(),Jv.exports=af;var UE=Jv.exports;/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Im="185",LE=0,U0=1,OE=2,cu=1,PE=2,il=3,Rs=0,si=1,Ca=2,za=0,Qs=1,jr=2,L0=3,O0=4,zE=5,Vs=100,IE=101,BE=102,FE=103,HE=104,GE=200,VE=201,kE=202,XE=203,Vh=204,kh=205,WE=206,qE=207,YE=208,jE=209,ZE=210,KE=211,QE=212,JE=213,$E=214,Xh=0,Wh=1,qh=2,_o=3,Yh=4,jh=5,Zh=6,Kh=7,Wy=0,t1=1,e1=2,la=0,qy=1,Yy=2,jy=3,Zy=4,Ky=5,Qy=6,Jy=7,$y=300,ir=301,xo=302,fd=303,dd=304,Mf=306,Qh=1e3,Ua=1001,Jh=1002,In=1003,n1=1004,gc=1005,kn=1006,hd=1007,Xs=1008,Oi=1009,tS=1010,eS=1011,Pl=1012,Bm=1013,ua=1014,ji=1015,ka=1016,Fm=1017,Hm=1018,zl=1020,nS=35902,iS=35899,aS=1021,sS=1022,Zi=1023,Xa=1026,Ws=1027,Gm=1028,Vm=1029,ar=1030,km=1031,Xm=1033,uu=33776,fu=33777,du=33778,hu=33779,$h=35840,tp=35841,ep=35842,np=35843,ip=36196,ap=37492,sp=37496,rp=37488,op=37489,Yu=37490,lp=37491,cp=37808,up=37809,fp=37810,dp=37811,hp=37812,pp=37813,mp=37814,gp=37815,vp=37816,_p=37817,xp=37818,yp=37819,Sp=37820,Mp=37821,bp=36492,Ep=36494,Tp=36495,Ap=36283,Rp=36284,ju=36285,Cp=36286,i1=3200,P0=0,a1=1,rs="",Ai="srgb",Zu="srgb-linear",Ku="linear",qe="srgb",_r=7680,z0=519,s1=512,r1=513,o1=514,Wm=515,l1=516,c1=517,qm=518,u1=519,I0=35044,B0="300 es",ra=2e3,Qu=2001;function f1(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ju(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function d1(){const e=Ju("canvas");return e.style.display="block",e}const F0={};function H0(...e){const t="THREE."+e.shift();console.log(t,...e)}function rS(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function le(...e){e=rS(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function ze(...e){e=rS(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function ao(...e){const t=e.join(" ");t in F0||(F0[t]=!0,le(...e))}function h1(e,t,n){return new Promise(function(i,a){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:a();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const p1={[Xh]:Wh,[qh]:Zh,[Yh]:Kh,[_o]:jh,[Wh]:Xh,[Zh]:qh,[Kh]:Yh,[jh]:_o};class dr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const a=i[t];if(a!==void 0){const s=a.indexOf(n);s!==-1&&a.splice(s,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const a=i.slice(0);for(let s=0,r=a.length;s<r;s++)a[s].call(this,t);t.target=null}}}const Gn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],pu=Math.PI/180,wp=180/Math.PI;function Ql(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Gn[e&255]+Gn[e>>8&255]+Gn[e>>16&255]+Gn[e>>24&255]+"-"+Gn[t&255]+Gn[t>>8&255]+"-"+Gn[t>>16&15|64]+Gn[t>>24&255]+"-"+Gn[n&63|128]+Gn[n>>8&255]+"-"+Gn[n>>16&255]+Gn[n>>24&255]+Gn[i&255]+Gn[i>>8&255]+Gn[i>>16&255]+Gn[i>>24&255]).toLowerCase()}function Le(e,t,n){return Math.max(t,Math.min(n,e))}function m1(e,t){return(e%t+t)%t}function pd(e,t,n){return(1-n)*e+n*t}function Go(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function ei(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const Jm=class Jm{constructor(t=0,n=0){this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,a=t.elements;return this.x=a[0]*n+a[3]*i+a[6],this.y=a[1]*n+a[4]*i+a[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=Le(this.x,t.x,n.x),this.y=Le(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=Le(this.x,t,n),this.y=Le(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Le(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Le(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),a=Math.sin(n),s=this.x-t.x,r=this.y-t.y;return this.x=s*i-r*a+t.x,this.y=s*a+r*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Jm.prototype.isVector2=!0;let Ve=Jm;class No{constructor(t=0,n=0,i=0,a=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=a}static slerpFlat(t,n,i,a,s,r,o){let l=i[a+0],c=i[a+1],d=i[a+2],h=i[a+3],u=s[r+0],p=s[r+1],g=s[r+2],S=s[r+3];if(h!==S||l!==u||c!==p||d!==g){let m=l*u+c*p+d*g+h*S;m<0&&(u=-u,p=-p,g=-g,S=-S,m=-m);let f=1-o;if(m<.9995){const v=Math.acos(m),M=Math.sin(v);f=Math.sin(f*v)/M,o=Math.sin(o*v)/M,l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+S*o}else{l=l*f+u*o,c=c*f+p*o,d=d*f+g*o,h=h*f+S*o;const v=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=v,c*=v,d*=v,h*=v}}t[n]=l,t[n+1]=c,t[n+2]=d,t[n+3]=h}static multiplyQuaternionsFlat(t,n,i,a,s,r){const o=i[a],l=i[a+1],c=i[a+2],d=i[a+3],h=s[r],u=s[r+1],p=s[r+2],g=s[r+3];return t[n]=o*g+d*h+l*p-c*u,t[n+1]=l*g+d*u+c*h-o*p,t[n+2]=c*g+d*p+o*u-l*h,t[n+3]=d*g-o*h-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,a){return this._x=t,this._y=n,this._z=i,this._w=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,a=t._y,s=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(a/2),h=o(s/2),u=l(i/2),p=l(a/2),g=l(s/2);switch(r){case"XYZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"YXZ":this._x=u*d*h+c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"ZXY":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h-u*p*g;break;case"ZYX":this._x=u*d*h-c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h+u*p*g;break;case"YZX":this._x=u*d*h+c*p*g,this._y=c*p*h+u*d*g,this._z=c*d*g-u*p*h,this._w=c*d*h-u*p*g;break;case"XZY":this._x=u*d*h-c*p*g,this._y=c*p*h-u*d*g,this._z=c*d*g+u*p*h,this._w=c*d*h+u*p*g;break;default:le("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,a=Math.sin(i);return this._x=t.x*a,this._y=t.y*a,this._z=t.z*a,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],a=n[4],s=n[8],r=n[1],o=n[5],l=n[9],c=n[2],d=n[6],h=n[10],u=i+o+h;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(d-l)*p,this._y=(s-c)*p,this._z=(r-a)*p}else if(i>o&&i>h){const p=2*Math.sqrt(1+i-o-h);this._w=(d-l)/p,this._x=.25*p,this._y=(a+r)/p,this._z=(s+c)/p}else if(o>h){const p=2*Math.sqrt(1+o-i-h);this._w=(s-c)/p,this._x=(a+r)/p,this._y=.25*p,this._z=(l+d)/p}else{const p=2*Math.sqrt(1+h-i-o);this._w=(r-a)/p,this._x=(s+c)/p,this._y=(l+d)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const a=Math.min(1,n/i);return this.slerp(t,a),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,a=t._y,s=t._z,r=t._w,o=n._x,l=n._y,c=n._z,d=n._w;return this._x=i*d+r*o+a*c-s*l,this._y=a*d+r*l+s*o-i*c,this._z=s*d+r*c+i*l-a*o,this._w=r*d-i*o-a*l-s*c,this._onChangeCallback(),this}slerp(t,n){let i=t._x,a=t._y,s=t._z,r=t._w,o=this.dot(t);o<0&&(i=-i,a=-a,s=-s,r=-r,o=-o);let l=1-n;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,n=Math.sin(n*c)/d,this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this._onChangeCallback()}else this._x=this._x*l+i*n,this._y=this._y*l+a*n,this._z=this._z*l+s*n,this._w=this._w*l+r*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),a=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(a*Math.sin(t),a*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const $m=class $m{constructor(t=0,n=0,i=0){this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(G0.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(G0.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*a,this.y=s[1]*n+s[4]*i+s[7]*a,this.z=s[2]*n+s[5]*i+s[8]*a,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,s=t.elements,r=1/(s[3]*n+s[7]*i+s[11]*a+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*a+s[12])*r,this.y=(s[1]*n+s[5]*i+s[9]*a+s[13])*r,this.z=(s[2]*n+s[6]*i+s[10]*a+s[14])*r,this}applyQuaternion(t){const n=this.x,i=this.y,a=this.z,s=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*a-o*i),d=2*(o*n-s*a),h=2*(s*i-r*n);return this.x=n+l*c+r*h-o*d,this.y=i+l*d+o*c-s*h,this.z=a+l*h+s*d-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,a=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*a,this.y=s[1]*n+s[5]*i+s[9]*a,this.z=s[2]*n+s[6]*i+s[10]*a,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=Le(this.x,t.x,n.x),this.y=Le(this.y,t.y,n.y),this.z=Le(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=Le(this.x,t,n),this.y=Le(this.y,t,n),this.z=Le(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Le(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,a=t.y,s=t.z,r=n.x,o=n.y,l=n.z;return this.x=a*l-s*o,this.y=s*r-i*l,this.z=i*o-a*r,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return md.copy(this).projectOnVector(t),this.sub(md)}reflect(t){return this.sub(md.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(Le(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,a=this.z-t.z;return n*n+i*i+a*a}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const a=Math.sin(n)*t;return this.x=a*Math.sin(i),this.y=Math.cos(n)*t,this.z=a*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),a=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=a,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};$m.prototype.isVector3=!0;let $=$m;const md=new $,G0=new No,tg=class tg{constructor(t,n,i,a,s,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c)}set(t,n,i,a,s,r,o,l,c){const d=this.elements;return d[0]=t,d[1]=a,d[2]=o,d[3]=n,d[4]=s,d[5]=l,d[6]=i,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],p=i[5],g=i[8],S=a[0],m=a[3],f=a[6],v=a[1],M=a[4],y=a[7],U=a[2],C=a[5],T=a[8];return s[0]=r*S+o*v+l*U,s[3]=r*m+o*M+l*C,s[6]=r*f+o*y+l*T,s[1]=c*S+d*v+h*U,s[4]=c*m+d*M+h*C,s[7]=c*f+d*y+h*T,s[2]=u*S+p*v+g*U,s[5]=u*m+p*M+g*C,s[8]=u*f+p*y+g*T,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8];return n*r*d-n*o*c-i*s*d+i*o*l+a*s*c-a*r*l}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],h=d*r-o*c,u=o*l-d*s,p=c*s-r*l,g=n*h+i*u+a*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/g;return t[0]=h*S,t[1]=(a*c-d*i)*S,t[2]=(o*i-a*r)*S,t[3]=u*S,t[4]=(d*n-a*l)*S,t[5]=(a*s-o*n)*S,t[6]=p*S,t[7]=(i*l-c*n)*S,t[8]=(r*n-i*s)*S,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,a,s,r,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*r+c*o)+r+t,-a*c,a*l,-a*(-c*r+l*o)+o+n,0,0,1),this}scale(t,n){return ao("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(gd.makeScale(t,n)),this}rotate(t){return ao("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(gd.makeRotation(-t)),this}translate(t,n){return ao("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(gd.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<9;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}};tg.prototype.isMatrix3=!0;let pe=tg;const gd=new pe,V0=new pe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),k0=new pe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function g1(){const e={enabled:!0,workingColorSpace:Zu,spaces:{},convert:function(a,s,r){return this.enabled===!1||s===r||!s||!r||(this.spaces[s].transfer===qe&&(a.r=Ia(a.r),a.g=Ia(a.g),a.b=Ia(a.b)),this.spaces[s].primaries!==this.spaces[r].primaries&&(a.applyMatrix3(this.spaces[s].toXYZ),a.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===qe&&(a.r=so(a.r),a.g=so(a.g),a.b=so(a.b))),a},workingToColorSpace:function(a,s){return this.convert(a,this.workingColorSpace,s)},colorSpaceToWorking:function(a,s){return this.convert(a,s,this.workingColorSpace)},getPrimaries:function(a){return this.spaces[a].primaries},getTransfer:function(a){return a===rs?Ku:this.spaces[a].transfer},getToneMappingMode:function(a){return this.spaces[a].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(a,s=this.workingColorSpace){return a.fromArray(this.spaces[s].luminanceCoefficients)},define:function(a){Object.assign(this.spaces,a)},_getMatrix:function(a,s,r){return a.copy(this.spaces[s].toXYZ).multiply(this.spaces[r].fromXYZ)},_getDrawingBufferColorSpace:function(a){return this.spaces[a].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(a=this.workingColorSpace){return this.spaces[a].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(a,s){return ao("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(a,s)},toWorkingColorSpace:function(a,s){return ao("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(a,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Zu]:{primaries:t,whitePoint:i,transfer:Ku,toXYZ:V0,fromXYZ:k0,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ai},outputColorSpaceConfig:{drawingBufferColorSpace:Ai}},[Ai]:{primaries:t,whitePoint:i,transfer:qe,toXYZ:V0,fromXYZ:k0,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ai}}}),e}const Ue=g1();function Ia(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function so(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let xr;class v1{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{xr===void 0&&(xr=Ju("canvas")),xr.width=t.width,xr.height=t.height;const a=xr.getContext("2d");t instanceof ImageData?a.putImageData(t,0,0):a.drawImage(t,0,0,t.width,t.height),i=xr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Ju("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const a=i.getImageData(0,0,t.width,t.height),s=a.data;for(let r=0;r<s.length;r++)s[r]=Ia(s[r]/255)*255;return i.putImageData(a,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ia(n[i]/255)*255):n[i]=Ia(n[i]);return{data:n,width:t.width,height:t.height}}else return le("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let _1=0;class Ym{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:_1++}),this.uuid=Ql(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayWidth,n.displayHeight,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},a=this.data;if(a!==null){let s;if(Array.isArray(a)){s=[];for(let r=0,o=a.length;r<o;r++)a[r].isDataTexture?s.push(vd(a[r].image)):s.push(vd(a[r]))}else s=vd(a);i.url=s}return n||(t.images[this.uuid]=i),i}}function vd(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?v1.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(le("Texture: Unable to serialize Texture."),{})}let x1=0;const _d=new $;class jn extends dr{constructor(t=jn.DEFAULT_IMAGE,n=jn.DEFAULT_MAPPING,i=Ua,a=Ua,s=kn,r=Xs,o=Zi,l=Oi,c=jn.DEFAULT_ANISOTROPY,d=rs){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:x1++}),this.uuid=Ql(),this.name="",this.source=new Ym(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=a,this.magFilter=s,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Ve(0,0),this.repeat=new Ve(1,1),this.center=new Ve(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new pe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(_d).x}get height(){return this.source.getSize(_d).y}get depth(){return this.source.getSize(_d).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){le(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){le(`Texture.setValues(): property '${n}' does not exist.`);continue}a&&i&&a.isVector2&&i.isVector2||a&&i&&a.isVector3&&i.isVector3||a&&i&&a.isMatrix3&&i.isMatrix3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==$y)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Qh:t.x=t.x-Math.floor(t.x);break;case Ua:t.x=t.x<0?0:1;break;case Jh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Qh:t.y=t.y-Math.floor(t.y);break;case Ua:t.y=t.y<0?0:1;break;case Jh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}jn.DEFAULT_IMAGE=null;jn.DEFAULT_MAPPING=$y;jn.DEFAULT_ANISOTROPY=1;const eg=class eg{constructor(t=0,n=0,i=0,a=1){this.x=t,this.y=n,this.z=i,this.w=a}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,a){return this.x=t,this.y=n,this.z=i,this.w=a,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,a=this.z,s=this.w,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*a+r[12]*s,this.y=r[1]*n+r[5]*i+r[9]*a+r[13]*s,this.z=r[2]*n+r[6]*i+r[10]*a+r[14]*s,this.w=r[3]*n+r[7]*i+r[11]*a+r[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,a,s;const l=t.elements,c=l[0],d=l[4],h=l[8],u=l[1],p=l[5],g=l[9],S=l[2],m=l[6],f=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-S)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+S)<.1&&Math.abs(g+m)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const M=(c+1)/2,y=(p+1)/2,U=(f+1)/2,C=(d+u)/4,T=(h+S)/4,x=(g+m)/4;return M>y&&M>U?M<.01?(i=0,a=.707106781,s=.707106781):(i=Math.sqrt(M),a=C/i,s=T/i):y>U?y<.01?(i=.707106781,a=0,s=.707106781):(a=Math.sqrt(y),i=C/a,s=x/a):U<.01?(i=.707106781,a=.707106781,s=0):(s=Math.sqrt(U),i=T/s,a=x/s),this.set(i,a,s,n),this}let v=Math.sqrt((m-g)*(m-g)+(h-S)*(h-S)+(u-d)*(u-d));return Math.abs(v)<.001&&(v=1),this.x=(m-g)/v,this.y=(h-S)/v,this.z=(u-d)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=Le(this.x,t.x,n.x),this.y=Le(this.y,t.y,n.y),this.z=Le(this.z,t.z,n.z),this.w=Le(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=Le(this.x,t,n),this.y=Le(this.y,t,n),this.z=Le(this.z,t,n),this.w=Le(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Le(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};eg.prototype.isVector4=!0;let fn=eg;class y1 extends dr{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:kn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new fn(0,0,t,n),this.scissorTest=!1,this.viewport=new fn(0,0,t,n),this.textures=[];const a={width:t,height:n,depth:i.depth},s=new jn(a),r=i.count;for(let o=0;o<r;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(t={}){const n={minFilter:kn,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let a=0,s=this.textures.length;a<s;a++)this.textures[a].image.width=t,this.textures[a].image.height=n,this.textures[a].image.depth=i,this.textures[a].isData3DTexture!==!0&&(this.textures[a].isArrayTexture=this.textures[a].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const a=Object.assign({},t.textures[n].image);this.textures[n].source=new Ym(a)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ca extends y1{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class oS extends jn{constructor(t=null,n=1,i=1,a=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class S1 extends jn{constructor(t=null,n=1,i=1,a=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:a},this.magFilter=In,this.minFilter=In,this.wrapR=Ua,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const ef=class ef{constructor(t,n,i,a,s,r,o,l,c,d,h,u,p,g,S,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,a,s,r,o,l,c,d,h,u,p,g,S,m)}set(t,n,i,a,s,r,o,l,c,d,h,u,p,g,S,m){const f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=a,f[1]=s,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=d,f[10]=h,f[14]=u,f[3]=p,f[7]=g,f[11]=S,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ef().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinantAffine()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const n=this.elements,i=t.elements,a=1/yr.setFromMatrixColumn(t,0).length(),s=1/yr.setFromMatrixColumn(t,1).length(),r=1/yr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*a,n[1]=i[1]*a,n[2]=i[2]*a,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*r,n[9]=i[9]*r,n[10]=i[10]*r,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,a=t.y,s=t.z,r=Math.cos(i),o=Math.sin(i),l=Math.cos(a),c=Math.sin(a),d=Math.cos(s),h=Math.sin(s);if(t.order==="XYZ"){const u=r*d,p=r*h,g=o*d,S=o*h;n[0]=l*d,n[4]=-l*h,n[8]=c,n[1]=p+g*c,n[5]=u-S*c,n[9]=-o*l,n[2]=S-u*c,n[6]=g+p*c,n[10]=r*l}else if(t.order==="YXZ"){const u=l*d,p=l*h,g=c*d,S=c*h;n[0]=u+S*o,n[4]=g*o-p,n[8]=r*c,n[1]=r*h,n[5]=r*d,n[9]=-o,n[2]=p*o-g,n[6]=S+u*o,n[10]=r*l}else if(t.order==="ZXY"){const u=l*d,p=l*h,g=c*d,S=c*h;n[0]=u-S*o,n[4]=-r*h,n[8]=g+p*o,n[1]=p+g*o,n[5]=r*d,n[9]=S-u*o,n[2]=-r*c,n[6]=o,n[10]=r*l}else if(t.order==="ZYX"){const u=r*d,p=r*h,g=o*d,S=o*h;n[0]=l*d,n[4]=g*c-p,n[8]=u*c+S,n[1]=l*h,n[5]=S*c+u,n[9]=p*c-g,n[2]=-c,n[6]=o*l,n[10]=r*l}else if(t.order==="YZX"){const u=r*l,p=r*c,g=o*l,S=o*c;n[0]=l*d,n[4]=S-u*h,n[8]=g*h+p,n[1]=h,n[5]=r*d,n[9]=-o*d,n[2]=-c*d,n[6]=p*h+g,n[10]=u-S*h}else if(t.order==="XZY"){const u=r*l,p=r*c,g=o*l,S=o*c;n[0]=l*d,n[4]=-h,n[8]=c*d,n[1]=u*h+S,n[5]=r*d,n[9]=p*h-g,n[2]=g*h-p,n[6]=o*d,n[10]=S*h+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(M1,t,b1)}lookAt(t,n,i){const a=this.elements;return ci.subVectors(t,n),ci.lengthSq()===0&&(ci.z=1),ci.normalize(),ja.crossVectors(i,ci),ja.lengthSq()===0&&(Math.abs(i.z)===1?ci.x+=1e-4:ci.z+=1e-4,ci.normalize(),ja.crossVectors(i,ci)),ja.normalize(),vc.crossVectors(ci,ja),a[0]=ja.x,a[4]=vc.x,a[8]=ci.x,a[1]=ja.y,a[5]=vc.y,a[9]=ci.y,a[2]=ja.z,a[6]=vc.z,a[10]=ci.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,a=n.elements,s=this.elements,r=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],p=i[13],g=i[2],S=i[6],m=i[10],f=i[14],v=i[3],M=i[7],y=i[11],U=i[15],C=a[0],T=a[4],x=a[8],w=a[12],D=a[1],O=a[5],I=a[9],z=a[13],G=a[2],k=a[6],B=a[10],F=a[14],P=a[3],X=a[7],pt=a[11],Tt=a[15];return s[0]=r*C+o*D+l*G+c*P,s[4]=r*T+o*O+l*k+c*X,s[8]=r*x+o*I+l*B+c*pt,s[12]=r*w+o*z+l*F+c*Tt,s[1]=d*C+h*D+u*G+p*P,s[5]=d*T+h*O+u*k+p*X,s[9]=d*x+h*I+u*B+p*pt,s[13]=d*w+h*z+u*F+p*Tt,s[2]=g*C+S*D+m*G+f*P,s[6]=g*T+S*O+m*k+f*X,s[10]=g*x+S*I+m*B+f*pt,s[14]=g*w+S*z+m*F+f*Tt,s[3]=v*C+M*D+y*G+U*P,s[7]=v*T+M*O+y*k+U*X,s[11]=v*x+M*I+y*B+U*pt,s[15]=v*w+M*z+y*F+U*Tt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],a=t[8],s=t[12],r=t[1],o=t[5],l=t[9],c=t[13],d=t[2],h=t[6],u=t[10],p=t[14],g=t[3],S=t[7],m=t[11],f=t[15],v=l*p-c*u,M=o*p-c*h,y=o*u-l*h,U=r*p-c*d,C=r*u-l*d,T=r*h-o*d;return n*(S*v-m*M+f*y)-i*(g*v-m*U+f*C)+a*(g*M-S*U+f*T)-s*(g*y-S*C+m*T)}determinantAffine(){const t=this.elements,n=t[0],i=t[4],a=t[8],s=t[1],r=t[5],o=t[9],l=t[2],c=t[6],d=t[10];return n*(r*d-o*c)-i*(s*d-o*l)+a*(s*c-r*l)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const a=this.elements;return t.isVector3?(a[12]=t.x,a[13]=t.y,a[14]=t.z):(a[12]=t,a[13]=n,a[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],a=t[2],s=t[3],r=t[4],o=t[5],l=t[6],c=t[7],d=t[8],h=t[9],u=t[10],p=t[11],g=t[12],S=t[13],m=t[14],f=t[15],v=n*o-i*r,M=n*l-a*r,y=n*c-s*r,U=i*l-a*o,C=i*c-s*o,T=a*c-s*l,x=d*S-h*g,w=d*m-u*g,D=d*f-p*g,O=h*m-u*S,I=h*f-p*S,z=u*f-p*m,G=v*z-M*I+y*O+U*D-C*w+T*x;if(G===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/G;return t[0]=(o*z-l*I+c*O)*k,t[1]=(a*I-i*z-s*O)*k,t[2]=(S*T-m*C+f*U)*k,t[3]=(u*C-h*T-p*U)*k,t[4]=(l*D-r*z-c*w)*k,t[5]=(n*z-a*D+s*w)*k,t[6]=(m*y-g*T-f*M)*k,t[7]=(d*T-u*y+p*M)*k,t[8]=(r*I-o*D+c*x)*k,t[9]=(i*D-n*I-s*x)*k,t[10]=(g*C-S*y+f*v)*k,t[11]=(h*y-d*C-p*v)*k,t[12]=(o*w-r*O-l*x)*k,t[13]=(n*O-i*w+a*x)*k,t[14]=(S*M-g*U-m*v)*k,t[15]=(d*U-h*M+u*v)*k,this}scale(t){const n=this.elements,i=t.x,a=t.y,s=t.z;return n[0]*=i,n[4]*=a,n[8]*=s,n[1]*=i,n[5]*=a,n[9]*=s,n[2]*=i,n[6]*=a,n[10]*=s,n[3]*=i,n[7]*=a,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],a=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,a))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),a=Math.sin(n),s=1-i,r=t.x,o=t.y,l=t.z,c=s*r,d=s*o;return this.set(c*r+i,c*o-a*l,c*l+a*o,0,c*o+a*l,d*o+i,d*l-a*r,0,c*l-a*o,d*l+a*r,s*l*l+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,a,s,r){return this.set(1,i,s,0,t,1,r,0,n,a,1,0,0,0,0,1),this}compose(t,n,i){const a=this.elements,s=n._x,r=n._y,o=n._z,l=n._w,c=s+s,d=r+r,h=o+o,u=s*c,p=s*d,g=s*h,S=r*d,m=r*h,f=o*h,v=l*c,M=l*d,y=l*h,U=i.x,C=i.y,T=i.z;return a[0]=(1-(S+f))*U,a[1]=(p+y)*U,a[2]=(g-M)*U,a[3]=0,a[4]=(p-y)*C,a[5]=(1-(u+f))*C,a[6]=(m+v)*C,a[7]=0,a[8]=(g+M)*T,a[9]=(m-v)*T,a[10]=(1-(u+S))*T,a[11]=0,a[12]=t.x,a[13]=t.y,a[14]=t.z,a[15]=1,this}decompose(t,n,i){const a=this.elements;t.x=a[12],t.y=a[13],t.z=a[14];const s=this.determinantAffine();if(s===0)return i.set(1,1,1),n.identity(),this;let r=yr.set(a[0],a[1],a[2]).length();const o=yr.set(a[4],a[5],a[6]).length(),l=yr.set(a[8],a[9],a[10]).length();s<0&&(r=-r),Xi.copy(this);const c=1/r,d=1/o,h=1/l;return Xi.elements[0]*=c,Xi.elements[1]*=c,Xi.elements[2]*=c,Xi.elements[4]*=d,Xi.elements[5]*=d,Xi.elements[6]*=d,Xi.elements[8]*=h,Xi.elements[9]*=h,Xi.elements[10]*=h,n.setFromRotationMatrix(Xi),i.x=r,i.y=o,i.z=l,this}makePerspective(t,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2*s/(n-t),h=2*s/(i-a),u=(n+t)/(n-t),p=(i+a)/(i-a);let g,S;if(l)g=s/(r-s),S=r*s/(r-s);else if(o===ra)g=-(r+s)/(r-s),S=-2*r*s/(r-s);else if(o===Qu)g=-r/(r-s),S=-r*s/(r-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,n,i,a,s,r,o=ra,l=!1){const c=this.elements,d=2/(n-t),h=2/(i-a),u=-(n+t)/(n-t),p=-(i+a)/(i-a);let g,S;if(l)g=1/(r-s),S=r/(r-s);else if(o===ra)g=-2/(r-s),S=-(r+s)/(r-s);else if(o===Qu)g=-1/(r-s),S=-s/(r-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=S,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let a=0;a<16;a++)if(n[a]!==i[a])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}};ef.prototype.isMatrix4=!0;let nn=ef;const yr=new $,Xi=new nn,M1=new $(0,0,0),b1=new $(1,1,1),ja=new $,vc=new $,ci=new $,X0=new nn,W0=new No;class sr{constructor(t=0,n=0,i=0,a=sr.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=a}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,a=this._order){return this._x=t,this._y=n,this._z=i,this._order=a,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const a=t.elements,s=a[0],r=a[4],o=a[8],l=a[1],c=a[5],d=a[9],h=a[2],u=a[6],p=a[10];switch(n){case"XYZ":this._y=Math.asin(Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,p),this._z=Math.atan2(-r,s)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,s),this._z=0);break;case"ZXY":this._x=Math.asin(Le(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Le(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Le(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-d,p),this._y=0);break;default:le("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return X0.makeRotationFromQuaternion(t),this.setFromRotationMatrix(X0,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return W0.setFromEuler(this),this.setFromQuaternion(W0,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}sr.DEFAULT_ORDER="XYZ";class lS{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let E1=0;const q0=new $,Sr=new No,xa=new nn,_c=new $,Vo=new $,T1=new $,A1=new No,Y0=new $(1,0,0),j0=new $(0,1,0),Z0=new $(0,0,1),K0={type:"added"},R1={type:"removed"},Mr={type:"childadded",child:null},xd={type:"childremoved",child:null};class Zn extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:E1++}),this.uuid=Ql(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Zn.DEFAULT_UP.clone();const t=new $,n=new sr,i=new No,a=new $(1,1,1);function s(){i.setFromEuler(n,!1)}function r(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:a},modelViewMatrix:{value:new nn},normalMatrix:{value:new pe}}),this.matrix=new nn,this.matrixWorld=new nn,this.matrixAutoUpdate=Zn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new lS,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return Sr.setFromAxisAngle(t,n),this.quaternion.multiply(Sr),this}rotateOnWorldAxis(t,n){return Sr.setFromAxisAngle(t,n),this.quaternion.premultiply(Sr),this}rotateX(t){return this.rotateOnAxis(Y0,t)}rotateY(t){return this.rotateOnAxis(j0,t)}rotateZ(t){return this.rotateOnAxis(Z0,t)}translateOnAxis(t,n){return q0.copy(t).applyQuaternion(this.quaternion),this.position.add(q0.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Y0,t)}translateY(t){return this.translateOnAxis(j0,t)}translateZ(t){return this.translateOnAxis(Z0,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(xa.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?_c.copy(t):_c.set(t,n,i);const a=this.parent;this.updateWorldMatrix(!0,!1),Vo.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?xa.lookAt(Vo,_c,this.up):xa.lookAt(_c,Vo,this.up),this.quaternion.setFromRotationMatrix(xa),a&&(xa.extractRotation(a.matrixWorld),Sr.setFromRotationMatrix(xa),this.quaternion.premultiply(Sr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(ze("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(K0),Mr.child=t,this.dispatchEvent(Mr),Mr.child=null):ze("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(R1),xd.child=t,this.dispatchEvent(xd),xd.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),xa.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),xa.multiply(t.parent.matrixWorld)),t.applyMatrix4(xa),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(K0),Mr.child=t,this.dispatchEvent(Mr),Mr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,a=this.children.length;i<a;i++){const r=this.children[i].getObjectByProperty(t,n);if(r!==void 0)return r}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const a=this.children;for(let s=0,r=a.length;s<r;s++)a[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,t,T1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vo,A1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,a=t.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*a,s[13]+=i-s[1]*n-s[5]*i-s[9]*a,s[14]+=a-s[2]*n-s[6]*i-s[10]*a}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,a=n.length;i<a;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n,i=!1){const a=this.parent;if(t===!0&&a!==null&&a.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),n===!0){const s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].updateWorldMatrix(!1,!0,i)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const a={};a.uuid=this.uuid,a.type=this.type,this.name!==""&&(a.name=this.name),this.castShadow===!0&&(a.castShadow=!0),this.receiveShadow===!0&&(a.receiveShadow=!0),this.visible===!1&&(a.visible=!1),this.frustumCulled===!1&&(a.frustumCulled=!1),this.renderOrder!==0&&(a.renderOrder=this.renderOrder),this.static!==!1&&(a.static=this.static),Object.keys(this.userData).length>0&&(a.userData=this.userData),a.layers=this.layers.mask,a.matrix=this.matrix.toArray(),a.up=this.up.toArray(),this.pivot!==null&&(a.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(a.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(a.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(a.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(a.type="InstancedMesh",a.count=this.count,a.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(a.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(a.type="BatchedMesh",a.perObjectFrustumCulled=this.perObjectFrustumCulled,a.sortObjects=this.sortObjects,a.drawRanges=this._drawRanges,a.reservedRanges=this._reservedRanges,a.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),a.instanceInfo=this._instanceInfo.map(o=>({...o})),a.availableInstanceIds=this._availableInstanceIds.slice(),a.availableGeometryIds=this._availableGeometryIds.slice(),a.nextIndexStart=this._nextIndexStart,a.nextVertexStart=this._nextVertexStart,a.geometryCount=this._geometryCount,a.maxInstanceCount=this._maxInstanceCount,a.maxVertexCount=this._maxVertexCount,a.maxIndexCount=this._maxIndexCount,a.geometryInitialized=this._geometryInitialized,a.matricesTexture=this._matricesTexture.toJSON(t),a.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(a.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(a.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(a.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?a.background=this.background.toJSON():this.background.isTexture&&(a.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(a.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){a.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const h=l[c];s(t.shapes,h)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(a.bindMode=this.bindMode,a.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),a.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));a.material=o}else a.material=s(t.materials,this.material);if(this.children.length>0){a.children=[];for(let o=0;o<this.children.length;o++)a.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){a.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];a.animations.push(s(t.animations,l))}}if(n){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),d=r(t.images),h=r(t.shapes),u=r(t.skeletons),p=r(t.animations),g=r(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),p.length>0&&(i.animations=p),g.length>0&&(i.nodes=g)}return i.object=a,i;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const a=t.children[i];this.add(a.clone())}return this}}Zn.DEFAULT_UP=new $(0,1,0);Zn.DEFAULT_MATRIX_AUTO_UPDATE=!0;Zn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class xc extends Zn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const C1={type:"move"};class yd{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new xc,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new xc,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new $,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new $),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new xc,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new $,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new $,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let a=null,s=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const S of t.hand.values()){const m=n.getJointPose(S,i),f=this._getHandJoint(c,S);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}const d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(a=n.getPose(t.targetRaySpace,i),a===null&&s!==null&&(a=s),a!==null&&(o.matrix.fromArray(a.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,a.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(a.linearVelocity)):o.hasLinearVelocity=!1,a.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(a.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(C1)))}return o!==null&&(o.visible=a!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new xc;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const cS={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Za={h:0,s:0,l:0},yc={h:0,s:0,l:0};function Sd(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class we{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const a=t;a&&a.isColor?this.copy(a):typeof a=="number"?this.setHex(a):typeof a=="string"&&this.setStyle(a)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ai){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Ue.colorSpaceToWorking(this,n),this}setRGB(t,n,i,a=Ue.workingColorSpace){return this.r=t,this.g=n,this.b=i,Ue.colorSpaceToWorking(this,a),this}setHSL(t,n,i,a=Ue.workingColorSpace){if(t=m1(t,1),n=Le(n,0,1),i=Le(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,r=2*i-s;this.r=Sd(r,s,t+1/3),this.g=Sd(r,s,t),this.b=Sd(r,s,t-1/3)}return Ue.colorSpaceToWorking(this,a),this}setStyle(t,n=Ai){function i(s){s!==void 0&&parseFloat(s)<1&&le("Color: Alpha component of "+t+" will be ignored.")}let a;if(a=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const r=a[1],o=a[2];switch(r){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:le("Color: Unknown color model "+t)}}else if(a=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=a[1],r=s.length;if(r===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(r===6)return this.setHex(parseInt(s,16),n);le("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ai){const i=cS[t.toLowerCase()];return i!==void 0?this.setHex(i,n):le("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ia(t.r),this.g=Ia(t.g),this.b=Ia(t.b),this}copyLinearToSRGB(t){return this.r=so(t.r),this.g=so(t.g),this.b=so(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ai){return Ue.workingToColorSpace(Vn.copy(this),t),Math.round(Le(Vn.r*255,0,255))*65536+Math.round(Le(Vn.g*255,0,255))*256+Math.round(Le(Vn.b*255,0,255))}getHexString(t=Ai){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Ue.workingColorSpace){Ue.workingToColorSpace(Vn.copy(this),n);const i=Vn.r,a=Vn.g,s=Vn.b,r=Math.max(i,a,s),o=Math.min(i,a,s);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const h=r-o;switch(c=d<=.5?h/(r+o):h/(2-r-o),r){case i:l=(a-s)/h+(a<s?6:0);break;case a:l=(s-i)/h+2;break;case s:l=(i-a)/h+4;break}l/=6}return t.h=l,t.s=c,t.l=d,t}getRGB(t,n=Ue.workingColorSpace){return Ue.workingToColorSpace(Vn.copy(this),n),t.r=Vn.r,t.g=Vn.g,t.b=Vn.b,t}getStyle(t=Ai){Ue.workingToColorSpace(Vn.copy(this),t);const n=Vn.r,i=Vn.g,a=Vn.b;return t!==Ai?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${a.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(a*255)})`}offsetHSL(t,n,i){return this.getHSL(Za),this.setHSL(Za.h+t,Za.s+n,Za.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Za),t.getHSL(yc);const i=pd(Za.h,yc.h,n),a=pd(Za.s,yc.s,n),s=pd(Za.l,yc.l,n);return this.setHSL(i,a,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,a=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*a,this.g=s[1]*n+s[4]*i+s[7]*a,this.b=s[2]*n+s[5]*i+s[8]*a,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Vn=new we;we.NAMES=cS;class jm{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new we(t),this.density=n}clone(){return new jm(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class uS extends Zn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new sr,this.environmentIntensity=1,this.environmentRotation=new sr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Wi=new $,ya=new $,Md=new $,Sa=new $,br=new $,Er=new $,Q0=new $,bd=new $,Ed=new $,Td=new $,Ad=new fn,Rd=new fn,Cd=new fn;class Pi{constructor(t=new $,n=new $,i=new $){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,a){a.subVectors(i,n),Wi.subVectors(t,n),a.cross(Wi);const s=a.lengthSq();return s>0?a.multiplyScalar(1/Math.sqrt(s)):a.set(0,0,0)}static getBarycoord(t,n,i,a,s){Wi.subVectors(a,n),ya.subVectors(i,n),Md.subVectors(t,n);const r=Wi.dot(Wi),o=Wi.dot(ya),l=Wi.dot(Md),c=ya.dot(ya),d=ya.dot(Md),h=r*c-o*o;if(h===0)return s.set(0,0,0),null;const u=1/h,p=(c*l-o*d)*u,g=(r*d-o*l)*u;return s.set(1-p-g,g,p)}static containsPoint(t,n,i,a){return this.getBarycoord(t,n,i,a,Sa)===null?!1:Sa.x>=0&&Sa.y>=0&&Sa.x+Sa.y<=1}static getInterpolation(t,n,i,a,s,r,o,l){return this.getBarycoord(t,n,i,a,Sa)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Sa.x),l.addScaledVector(r,Sa.y),l.addScaledVector(o,Sa.z),l)}static getInterpolatedAttribute(t,n,i,a,s,r){return Ad.setScalar(0),Rd.setScalar(0),Cd.setScalar(0),Ad.fromBufferAttribute(t,n),Rd.fromBufferAttribute(t,i),Cd.fromBufferAttribute(t,a),r.setScalar(0),r.addScaledVector(Ad,s.x),r.addScaledVector(Rd,s.y),r.addScaledVector(Cd,s.z),r}static isFrontFacing(t,n,i,a){return Wi.subVectors(i,n),ya.subVectors(t,n),Wi.cross(ya).dot(a)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,a){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[a]),this}setFromAttributeAndIndices(t,n,i,a){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,a),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Wi.subVectors(this.c,this.b),ya.subVectors(this.a,this.b),Wi.cross(ya).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Pi.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return Pi.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,a,s){return Pi.getInterpolation(t,this.a,this.b,this.c,n,i,a,s)}containsPoint(t){return Pi.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Pi.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,a=this.b,s=this.c;let r,o;br.subVectors(a,i),Er.subVectors(s,i),bd.subVectors(t,i);const l=br.dot(bd),c=Er.dot(bd);if(l<=0&&c<=0)return n.copy(i);Ed.subVectors(t,a);const d=br.dot(Ed),h=Er.dot(Ed);if(d>=0&&h<=d)return n.copy(a);const u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return r=l/(l-d),n.copy(i).addScaledVector(br,r);Td.subVectors(t,s);const p=br.dot(Td),g=Er.dot(Td);if(g>=0&&p<=g)return n.copy(s);const S=p*c-l*g;if(S<=0&&c>=0&&g<=0)return o=c/(c-g),n.copy(i).addScaledVector(Er,o);const m=d*g-p*h;if(m<=0&&h-d>=0&&p-g>=0)return Q0.subVectors(s,a),o=(h-d)/(h-d+(p-g)),n.copy(a).addScaledVector(Q0,o);const f=1/(m+S+u);return r=S*f,o=u*f,n.copy(i).addScaledVector(br,r).addScaledVector(Er,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class hr{constructor(t=new $(1/0,1/0,1/0),n=new $(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(qi.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(qi.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=qi.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=s.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,qi):qi.fromBufferAttribute(s,r),qi.applyMatrix4(t.matrixWorld),this.expandByPoint(qi);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Sc.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Sc.copy(i.boundingBox)),Sc.applyMatrix4(t.matrixWorld),this.union(Sc)}const a=t.children;for(let s=0,r=a.length;s<r;s++)this.expandByObject(a[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qi),qi.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ko),Mc.subVectors(this.max,ko),Tr.subVectors(t.a,ko),Ar.subVectors(t.b,ko),Rr.subVectors(t.c,ko),Ka.subVectors(Ar,Tr),Qa.subVectors(Rr,Ar),Ls.subVectors(Tr,Rr);let n=[0,-Ka.z,Ka.y,0,-Qa.z,Qa.y,0,-Ls.z,Ls.y,Ka.z,0,-Ka.x,Qa.z,0,-Qa.x,Ls.z,0,-Ls.x,-Ka.y,Ka.x,0,-Qa.y,Qa.x,0,-Ls.y,Ls.x,0];return!wd(n,Tr,Ar,Rr,Mc)||(n=[1,0,0,0,1,0,0,0,1],!wd(n,Tr,Ar,Rr,Mc))?!1:(bc.crossVectors(Ka,Qa),n=[bc.x,bc.y,bc.z],wd(n,Tr,Ar,Rr,Mc))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qi).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qi).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ma[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ma[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ma[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ma[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ma[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ma[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ma[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ma[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ma),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ma=[new $,new $,new $,new $,new $,new $,new $,new $],qi=new $,Sc=new hr,Tr=new $,Ar=new $,Rr=new $,Ka=new $,Qa=new $,Ls=new $,ko=new $,Mc=new $,bc=new $,Os=new $;function wd(e,t,n,i,a){for(let s=0,r=e.length-3;s<=r;s+=3){Os.fromArray(e,s);const o=a.x*Math.abs(Os.x)+a.y*Math.abs(Os.y)+a.z*Math.abs(Os.z),l=t.dot(Os),c=n.dot(Os),d=i.dot(Os);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const mn=new $,Ec=new Ve;let w1=0;class We extends dr{constructor(t,n,i=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:w1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=I0,this.updateRanges=[],this.gpuType=ji,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let a=0,s=this.itemSize;a<s;a++)this.array[t+a]=n.array[i+a];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ec.fromBufferAttribute(this,n),Ec.applyMatrix3(t),this.setXY(n,Ec.x,Ec.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix3(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyMatrix4(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.applyNormalMatrix(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)mn.fromBufferAttribute(this,n),mn.transformDirection(t),this.setXYZ(n,mn.x,mn.y,mn.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Go(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=ei(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Go(n,this.array)),n}setX(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Go(n,this.array)),n}setY(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Go(n,this.array)),n}setZ(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Go(n,this.array)),n}setW(t,n){return this.normalized&&(n=ei(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),i=ei(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,a){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),i=ei(i,this.array),a=ei(a,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this}setXYZW(t,n,i,a,s){return t*=this.itemSize,this.normalized&&(n=ei(n,this.array),i=ei(i,this.array),a=ei(a,this.array),s=ei(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=a,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==I0&&(t.usage=this.usage),t}dispose(){this.dispatchEvent({type:"dispose"})}}class fS extends We{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class dS extends We{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Bi extends We{constructor(t,n,i){super(new Float32Array(t),n,i)}}const D1=new hr,Xo=new $,Dd=new $;class pr{constructor(t=new $,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):D1.setFromPoints(t).getCenter(i);let a=0;for(let s=0,r=t.length;s<r;s++)a=Math.max(a,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(a),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Xo.subVectors(t,this.center);const n=Xo.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),a=(i-this.radius)*.5;this.center.addScaledVector(Xo,a/i),this.radius+=a}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Dd.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Xo.copy(t.center).add(Dd)),this.expandByPoint(Xo.copy(t.center).sub(Dd))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let N1=0;const Ei=new nn,Nd=new Zn,Cr=new $,ui=new hr,Wo=new hr,Tn=new $;class Xn extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:N1++}),this.uuid=Ql(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(f1(t)?dS:fS)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new pe().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const a=this.attributes.tangent;return a!==void 0&&(a.transformDirection(t),a.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return Ei.makeRotationFromQuaternion(t),this.applyMatrix4(Ei),this}rotateX(t){return Ei.makeRotationX(t),this.applyMatrix4(Ei),this}rotateY(t){return Ei.makeRotationY(t),this.applyMatrix4(Ei),this}rotateZ(t){return Ei.makeRotationZ(t),this.applyMatrix4(Ei),this}translate(t,n,i){return Ei.makeTranslation(t,n,i),this.applyMatrix4(Ei),this}scale(t,n,i){return Ei.makeScale(t,n,i),this.applyMatrix4(Ei),this}lookAt(t){return Nd.lookAt(t),Nd.updateMatrix(),this.applyMatrix4(Nd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Cr).negate(),this.translate(Cr.x,Cr.y,Cr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let a=0,s=t.length;a<s;a++){const r=t[a];i.push(r.x,r.y,r.z||0)}this.setAttribute("position",new Bi(i,3))}else{const i=Math.min(t.length,n.count);for(let a=0;a<i;a++){const s=t[a];n.setXYZ(a,s.x,s.y,s.z||0)}t.length>n.count&&le("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ze("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new $(-1/0,-1/0,-1/0),new $(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,a=n.length;i<a;i++){const s=n[i];ui.setFromBufferAttribute(s),this.morphTargetsRelative?(Tn.addVectors(this.boundingBox.min,ui.min),this.boundingBox.expandByPoint(Tn),Tn.addVectors(this.boundingBox.max,ui.max),this.boundingBox.expandByPoint(Tn)):(this.boundingBox.expandByPoint(ui.min),this.boundingBox.expandByPoint(ui.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ze('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pr);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){ze("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new $,1/0);return}if(t){const i=this.boundingSphere.center;if(ui.setFromBufferAttribute(t),n)for(let s=0,r=n.length;s<r;s++){const o=n[s];Wo.setFromBufferAttribute(o),this.morphTargetsRelative?(Tn.addVectors(ui.min,Wo.min),ui.expandByPoint(Tn),Tn.addVectors(ui.max,Wo.max),ui.expandByPoint(Tn)):(ui.expandByPoint(Wo.min),ui.expandByPoint(Wo.max))}ui.getCenter(i);let a=0;for(let s=0,r=t.count;s<r;s++)Tn.fromBufferAttribute(t,s),a=Math.max(a,i.distanceToSquared(Tn));if(n)for(let s=0,r=n.length;s<r;s++){const o=n[s],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Tn.fromBufferAttribute(o,c),l&&(Cr.fromBufferAttribute(t,c),Tn.add(Cr)),a=Math.max(a,i.distanceToSquared(Tn))}this.boundingSphere.radius=Math.sqrt(a),isNaN(this.boundingSphere.radius)&&ze('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){ze("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,a=n.normal,s=n.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==i.count)&&(r=new We(new Float32Array(4*i.count),4),this.setAttribute("tangent",r));const o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new $,l[x]=new $;const c=new $,d=new $,h=new $,u=new Ve,p=new Ve,g=new Ve,S=new $,m=new $;function f(x,w,D){c.fromBufferAttribute(i,x),d.fromBufferAttribute(i,w),h.fromBufferAttribute(i,D),u.fromBufferAttribute(s,x),p.fromBufferAttribute(s,w),g.fromBufferAttribute(s,D),d.sub(c),h.sub(c),p.sub(u),g.sub(u);const O=1/(p.x*g.y-g.x*p.y);isFinite(O)&&(S.copy(d).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(O),m.copy(h).multiplyScalar(p.x).addScaledVector(d,-g.x).multiplyScalar(O),o[x].add(S),o[w].add(S),o[D].add(S),l[x].add(m),l[w].add(m),l[D].add(m))}let v=this.groups;v.length===0&&(v=[{start:0,count:t.count}]);for(let x=0,w=v.length;x<w;++x){const D=v[x],O=D.start,I=D.count;for(let z=O,G=O+I;z<G;z+=3)f(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const M=new $,y=new $,U=new $,C=new $;function T(x){U.fromBufferAttribute(a,x),C.copy(U);const w=o[x];M.copy(w),M.sub(U.multiplyScalar(U.dot(w))).normalize(),y.crossVectors(C,w);const O=y.dot(l[x])<0?-1:1;r.setXYZW(x,M.x,M.y,M.z,O)}for(let x=0,w=v.length;x<w;++x){const D=v[x],O=D.start,I=D.count;for(let z=O,G=O+I;z<G;z+=3)T(t.getX(z+0)),T(t.getX(z+1)),T(t.getX(z+2))}this._transformed=!0}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==n.count)i=new We(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,p=i.count;u<p;u++)i.setXYZ(u,0,0,0);const a=new $,s=new $,r=new $,o=new $,l=new $,c=new $,d=new $,h=new $;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),S=t.getX(u+1),m=t.getX(u+2);a.fromBufferAttribute(n,g),s.fromBufferAttribute(n,S),r.fromBufferAttribute(n,m),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),o.fromBufferAttribute(i,g),l.fromBufferAttribute(i,S),c.fromBufferAttribute(i,m),o.add(d),l.add(d),c.add(d),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(S,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let u=0,p=n.count;u<p;u+=3)a.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),r.fromBufferAttribute(n,u+2),d.subVectors(r,s),h.subVectors(a,s),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Tn.fromBufferAttribute(t,n),Tn.normalize(),t.setXYZ(n,Tn.x,Tn.y,Tn.z)}toNonIndexed(){function t(o,l){const c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d);let p=0,g=0;for(let S=0,m=l.length;S<m;S++){o.isInterleavedBufferAttribute?p=l[S]*o.data.stride+o.offset:p=l[S]*d;for(let f=0;f<d;f++)u[g++]=c[p++]}return new We(u,d,h)}if(this.index===null)return le("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Xn,i=this.index.array,a=this.attributes;for(const o in a){const l=a[o],c=t(l,i);n.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let d=0,h=c.length;d<h;d++){const u=c[d],p=t(u,i);l.push(p)}n.morphAttributes[o]=l}n.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];n.addGroup(c.start,c.count,c.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const a={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){const p=c[h];d.push(p.toJSON(t.data))}d.length>0&&(a[l]=d,s=!0)}s&&(t.data.morphAttributes=a,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const a=t.attributes;for(const c in a){const d=a[c];this.setAttribute(c,d.clone(n))}const s=t.morphAttributes;for(const c in s){const d=[],h=s[c];for(let u=0,p=h.length;u<p;u++)d.push(h[u].clone(n));this.morphAttributes[c]=d}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,d=r.length;c<d;c++){const h=r[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}let U1=0;class Uo extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:U1++}),this.uuid=Ql(),this.name="",this.type="Material",this.blending=Qs,this.side=Rs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vh,this.blendDst=kh,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new we(0,0,0),this.blendAlpha=0,this.depthFunc=_o,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=z0,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=_r,this.stencilZFail=_r,this.stencilZPass=_r,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){le(`Material: parameter '${n}' has value of undefined.`);continue}const a=this[n];if(a===void 0){le(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}a&&a.isColor?a.set(i):a&&a.isVector2&&i&&i.isVector2||a&&a.isEuler&&i&&i.isEuler||a&&a.isVector3&&i&&i.isVector3?a.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(i.blending=this.blending),this.side!==Rs&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Vh&&(i.blendSrc=this.blendSrc),this.blendDst!==kh&&(i.blendDst=this.blendDst),this.blendEquation!==Vs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==_o&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==z0&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==_r&&(i.stencilFail=this.stencilFail),this.stencilZFail!==_r&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==_r&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function a(s){const r=[];for(const o in s){const l=s[o];delete l.metadata,r.push(l)}return r}if(n){const s=a(t.textures),r=a(t.images);s.length>0&&(i.textures=s),r.length>0&&(i.images=r)}return i}fromJSON(t,n){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new we().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=t.iridescenceThicknessRange),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=n[t.map]||null),t.matcap!==void 0&&(this.matcap=n[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=n[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=n[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=n[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let i=t.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new Ve().fromArray(i)}return t.displacementMap!==void 0&&(this.displacementMap=n[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=n[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=n[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=n[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=n[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=n[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=n[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=n[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=n[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=n[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=n[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=n[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=n[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=n[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ve().fromArray(t.clearcoatNormalScale)),t.iridescenceMap!==void 0&&(this.iridescenceMap=n[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=n[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=n[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=n[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=n[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=n[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=n[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const a=n.length;i=new Array(a);for(let s=0;s!==a;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const ba=new $,Ud=new $,Tc=new $,Ja=new $,Ld=new $,Ac=new $,Od=new $;class Zm{constructor(t=new $,n=new $(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,ba)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=ba.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(ba.copy(this.origin).addScaledVector(this.direction,n),ba.distanceToSquared(t))}distanceSqToSegment(t,n,i,a){Ud.copy(t).add(n).multiplyScalar(.5),Tc.copy(n).sub(t).normalize(),Ja.copy(this.origin).sub(Ud);const s=t.distanceTo(n)*.5,r=-this.direction.dot(Tc),o=Ja.dot(this.direction),l=-Ja.dot(Tc),c=Ja.lengthSq(),d=Math.abs(1-r*r);let h,u,p,g;if(d>0)if(h=r*l-o,u=r*o-l,g=s*d,h>=0)if(u>=-g)if(u<=g){const S=1/d;h*=S,u*=S,p=h*(h+r*u+2*o)+u*(r*h+u+2*l)+c}else u=s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u=-s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;else u<=-g?(h=Math.max(0,-(-r*s+o)),u=h>0?-s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c):u<=g?(h=0,u=Math.min(Math.max(-s,-l),s),p=u*(u+2*l)+c):(h=Math.max(0,-(r*s+o)),u=h>0?s:Math.min(Math.max(-s,-l),s),p=-h*h+u*(u+2*l)+c);else u=r>0?-s:s,h=Math.max(0,-(r*u+o)),p=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),a&&a.copy(Ud).addScaledVector(Tc,u),p}intersectSphere(t,n){ba.subVectors(t.center,this.origin);const i=ba.dot(this.direction),a=ba.dot(ba)-i*i,s=t.radius*t.radius;if(a>s)return null;const r=Math.sqrt(s-a),o=i-r,l=i+r;return l<0?null:o<0?this.at(l,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,a,s,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(t.min.x-u.x)*c,a=(t.max.x-u.x)*c):(i=(t.max.x-u.x)*c,a=(t.min.x-u.x)*c),d>=0?(s=(t.min.y-u.y)*d,r=(t.max.y-u.y)*d):(s=(t.max.y-u.y)*d,r=(t.min.y-u.y)*d),i>r||s>a||((s>i||isNaN(i))&&(i=s),(r<a||isNaN(a))&&(a=r),h>=0?(o=(t.min.z-u.z)*h,l=(t.max.z-u.z)*h):(o=(t.max.z-u.z)*h,l=(t.min.z-u.z)*h),i>l||o>a)||((o>i||i!==i)&&(i=o),(l<a||a!==a)&&(a=l),a<0)?null:this.at(i>=0?i:a,n)}intersectsBox(t){return this.intersectBox(t,ba)!==null}intersectTriangle(t,n,i,a,s){Ld.subVectors(n,t),Ac.subVectors(i,t),Od.crossVectors(Ld,Ac);let r=this.direction.dot(Od),o;if(r>0){if(a)return null;o=1}else if(r<0)o=-1,r=-r;else return null;Ja.subVectors(this.origin,t);const l=o*this.direction.dot(Ac.crossVectors(Ja,Ac));if(l<0)return null;const c=o*this.direction.dot(Ld.cross(Ja));if(c<0||l+c>r)return null;const d=-o*Ja.dot(Od);return d<0?null:this.at(d/r,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class hS extends Uo{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new we(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new sr,this.combine=Wy,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const J0=new nn,Ps=new Zm,Rc=new pr,$0=new $,Cc=new $,wc=new $,Dc=new $,Pd=new $,Nc=new $,tv=new $,Uc=new $;class Hi extends Zn{constructor(t=new Xn,n=new hS){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){const i=this.geometry,a=i.attributes.position,s=i.morphAttributes.position,r=i.morphTargetsRelative;n.fromBufferAttribute(a,t);const o=this.morphTargetInfluences;if(s&&o){Nc.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const d=o[l],h=s[l];d!==0&&(Pd.fromBufferAttribute(h,t),r?Nc.addScaledVector(Pd,d):Nc.addScaledVector(Pd.sub(n),d))}n.add(Nc)}return n}raycast(t,n){const i=this.geometry,a=this.material,s=this.matrixWorld;a!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Rc.copy(i.boundingSphere),Rc.applyMatrix4(s),Ps.copy(t.ray).recast(t.near),!(Rc.containsPoint(Ps.origin)===!1&&(Ps.intersectSphere(Rc,$0)===null||Ps.origin.distanceToSquared($0)>(t.far-t.near)**2))&&(J0.copy(s).invert(),Ps.copy(t.ray).applyMatrix4(J0),!(i.boundingBox!==null&&Ps.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Ps)))}_computeIntersections(t,n,i){let a;const s=this.geometry,r=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,d=s.attributes.uv1,h=s.attributes.normal,u=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,S=u.length;g<S;g++){const m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,U=M;y<U;y+=3){const C=o.getX(y),T=o.getX(y+1),x=o.getX(y+2);a=Lc(this,f,t,i,c,d,h,C,T,x),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),S=Math.min(o.count,p.start+p.count);for(let m=g,f=S;m<f;m+=3){const v=o.getX(m),M=o.getX(m+1),y=o.getX(m+2);a=Lc(this,r,t,i,c,d,h,v,M,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,S=u.length;g<S;g++){const m=u[g],f=r[m.materialIndex],v=Math.max(m.start,p.start),M=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=v,U=M;y<U;y+=3){const C=y,T=y+1,x=y+2;a=Lc(this,f,t,i,c,d,h,C,T,x),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,n.push(a))}}else{const g=Math.max(0,p.start),S=Math.min(l.count,p.start+p.count);for(let m=g,f=S;m<f;m+=3){const v=m,M=m+1,y=m+2;a=Lc(this,r,t,i,c,d,h,v,M,y),a&&(a.faceIndex=Math.floor(m/3),n.push(a))}}}}function L1(e,t,n,i,a,s,r,o){let l;if(t.side===si?l=i.intersectTriangle(r,s,a,!0,o):l=i.intersectTriangle(a,s,r,t.side===Rs,o),l===null)return null;Uc.copy(o),Uc.applyMatrix4(e.matrixWorld);const c=n.ray.origin.distanceTo(Uc);return c<n.near||c>n.far?null:{distance:c,point:Uc.clone(),object:e}}function Lc(e,t,n,i,a,s,r,o,l,c){e.getVertexPosition(o,Cc),e.getVertexPosition(l,wc),e.getVertexPosition(c,Dc);const d=L1(e,t,n,i,Cc,wc,Dc,tv);if(d){const h=new $;Pi.getBarycoord(tv,Cc,wc,Dc,h),a&&(d.uv=Pi.getInterpolatedAttribute(a,o,l,c,h,new Ve)),s&&(d.uv1=Pi.getInterpolatedAttribute(s,o,l,c,h,new Ve)),r&&(d.normal=Pi.getInterpolatedAttribute(r,o,l,c,h,new $),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new $,materialIndex:0};Pi.getNormal(Cc,wc,Dc,u.normal),d.face=u,d.barycoord=h}return d}class pS extends jn{constructor(t=null,n=1,i=1,a,s,r,o,l,c=In,d=In,h,u){super(null,r,o,l,c,d,a,s,h,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Zr extends We{constructor(t,n,i,a=1){super(t,n,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=a}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const wr=new nn,ev=new nn,Oc=[],nv=new hr,O1=new nn,qo=new Hi,Yo=new pr;class iv extends Hi{constructor(t,n,i){super(t,n),this.isInstancedMesh=!0,this.instanceMatrix=new Zr(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let a=0;a<i;a++)this.setMatrixAt(a,O1)}computeBoundingBox(){const t=this.geometry,n=this.count;this.boundingBox===null&&(this.boundingBox=new hr),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,wr),nv.copy(t.boundingBox).applyMatrix4(wr),this.boundingBox.union(nv)}computeBoundingSphere(){const t=this.geometry,n=this.count;this.boundingSphere===null&&(this.boundingSphere=new pr),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<n;i++)this.getMatrixAt(i,wr),Yo.copy(t.boundingSphere).applyMatrix4(wr),this.boundingSphere.union(Yo)}copy(t,n){return super.copy(t,n),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,n){return this.instanceColor===null?n.setRGB(1,1,1):n.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,n){return n.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,n){const i=n.morphTargetInfluences,a=this.morphTexture.source.data.data,s=i.length+1,r=t*s+1;for(let o=0;o<i.length;o++)i[o]=a[r+o]}raycast(t,n){const i=this.matrixWorld,a=this.count;if(qo.geometry=this.geometry,qo.material=this.material,qo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Yo.copy(this.boundingSphere),Yo.applyMatrix4(i),t.ray.intersectsSphere(Yo)!==!1))for(let s=0;s<a;s++){this.getMatrixAt(s,wr),ev.multiplyMatrices(i,wr),qo.matrixWorld=ev,qo.raycast(t,Oc);for(let r=0,o=Oc.length;r<o;r++){const l=Oc[r];l.instanceId=s,l.object=this,n.push(l)}Oc.length=0}}setColorAt(t,n){return this.instanceColor===null&&(this.instanceColor=new Zr(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),n.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,n){return n.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,n){const i=n.morphTargetInfluences,a=i.length+1;this.morphTexture===null&&(this.morphTexture=new pS(new Float32Array(a*this.count),a,this.count,Gm,ji));const s=this.morphTexture.source.data.data;let r=0;for(let c=0;c<i.length;c++)r+=i[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=a*t;return s[l]=o,s.set(i,l+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const zd=new $,P1=new $,z1=new pe;class Gs{constructor(t=new $(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,a){return this.normal.set(t,n,i),this.constant=a,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const a=zd.subVectors(i,n).cross(P1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(a,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n,i=!0){const a=t.delta(zd),s=this.normal.dot(a);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return i===!0&&(r<0||r>1)?null:n.copy(t.start).addScaledVector(a,r)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||z1.getNormalMatrix(t),a=this.coplanarPoint(zd).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-a.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const zs=new pr,I1=new Ve(.5,.5),Pc=new $;class mS{constructor(t=new Gs,n=new Gs,i=new Gs,a=new Gs,s=new Gs,r=new Gs){this.planes=[t,n,i,a,s,r]}set(t,n,i,a,s,r){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(a),o[4].copy(s),o[5].copy(r),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=ra,i=!1){const a=this.planes,s=t.elements,r=s[0],o=s[1],l=s[2],c=s[3],d=s[4],h=s[5],u=s[6],p=s[7],g=s[8],S=s[9],m=s[10],f=s[11],v=s[12],M=s[13],y=s[14],U=s[15];if(a[0].setComponents(c-r,p-d,f-g,U-v).normalize(),a[1].setComponents(c+r,p+d,f+g,U+v).normalize(),a[2].setComponents(c+o,p+h,f+S,U+M).normalize(),a[3].setComponents(c-o,p-h,f-S,U-M).normalize(),i)a[4].setComponents(l,u,m,y).normalize(),a[5].setComponents(c-l,p-u,f-m,U-y).normalize();else if(a[4].setComponents(c-l,p-u,f-m,U-y).normalize(),n===ra)a[5].setComponents(c+l,p+u,f+m,U+y).normalize();else if(n===Qu)a[5].setComponents(l,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),zs.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),zs.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(zs)}intersectsSprite(t){zs.center.set(0,0,0);const n=I1.distanceTo(t.center);return zs.radius=.7071067811865476+n,zs.applyMatrix4(t.matrixWorld),this.intersectsSphere(zs)}intersectsSphere(t){const n=this.planes,i=t.center,a=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<a)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const a=n[i];if(Pc.x=a.normal.x>0?t.max.x:t.min.x,Pc.y=a.normal.y>0?t.max.y:t.min.y,Pc.z=a.normal.z>0?t.max.z:t.min.z,a.distanceToPoint(Pc)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class gS extends Uo{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new we(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const $u=new $,tf=new $,av=new nn,jo=new Zm,zc=new pr,Id=new $,sv=new $;class B1 extends Zn{constructor(t=new Xn,n=new gS){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let a=1,s=n.count;a<s;a++)$u.fromBufferAttribute(n,a-1),tf.fromBufferAttribute(n,a),i[a]=i[a-1],i[a]+=$u.distanceTo(tf);t.setAttribute("lineDistance",new Bi(i,1))}else le("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,a=this.matrixWorld,s=t.params.Line.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),zc.copy(i.boundingSphere),zc.applyMatrix4(a),zc.radius+=s,t.ray.intersectsSphere(zc)===!1)return;av.copy(a).invert(),jo.copy(t.ray).applyMatrix4(av);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=i.index,u=i.attributes.position;if(d!==null){const p=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let S=p,m=g-1;S<m;S+=c){const f=d.getX(S),v=d.getX(S+1),M=Ic(this,t,jo,l,f,v,S);M&&n.push(M)}if(this.isLineLoop){const S=d.getX(g-1),m=d.getX(p),f=Ic(this,t,jo,l,S,m,g-1);f&&n.push(f)}}else{const p=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let S=p,m=g-1;S<m;S+=c){const f=Ic(this,t,jo,l,S,S+1,S);f&&n.push(f)}if(this.isLineLoop){const S=Ic(this,t,jo,l,g-1,p,g-1);S&&n.push(S)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ic(e,t,n,i,a,s,r){const o=e.geometry.attributes.position;if($u.fromBufferAttribute(o,a),tf.fromBufferAttribute(o,s),n.distanceSqToSegment($u,tf,Id,sv)>i)return;Id.applyMatrix4(e.matrixWorld);const c=t.ray.origin.distanceTo(Id);if(!(c<t.near||c>t.far))return{distance:c,point:sv.clone().applyMatrix4(e.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:e}}const rv=new $,ov=new $;class mu extends B1{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let a=0,s=n.count;a<s;a+=2)rv.fromBufferAttribute(n,a),ov.fromBufferAttribute(n,a+1),i[a]=a===0?0:i[a-1],i[a+1]=i[a]+rv.distanceTo(ov);t.setAttribute("lineDistance",new Bi(i,1))}else le("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class F1 extends Uo{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new we(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const lv=new nn,Dp=new Zm,Bc=new pr,Fc=new $;class Np extends Zn{constructor(t=new Xn,n=new F1){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,a=this.matrixWorld,s=t.params.Points.threshold,r=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Bc.copy(i.boundingSphere),Bc.applyMatrix4(a),Bc.radius+=s,t.ray.intersectsSphere(Bc)===!1)return;lv.copy(a).invert(),Dp.copy(t.ray).applyMatrix4(lv);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){const u=Math.max(0,r.start),p=Math.min(c.count,r.start+r.count);for(let g=u,S=p;g<S;g++){const m=c.getX(g);Fc.fromBufferAttribute(h,m),cv(Fc,m,l,a,t,n,this)}}else{const u=Math.max(0,r.start),p=Math.min(h.count,r.start+r.count);for(let g=u,S=p;g<S;g++)Fc.fromBufferAttribute(h,g),cv(Fc,g,l,a,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const a=n[i[0]];if(a!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,r=a.length;s<r;s++){const o=a[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function cv(e,t,n,i,a,s,r){const o=Dp.distanceSqToPoint(e);if(o<n){const l=new $;Dp.closestPointToPoint(e,l),l.applyMatrix4(i);const c=a.ray.origin.distanceTo(l);if(c<a.near||c>a.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class vS extends jn{constructor(t=[],n=ir,i,a,s,r,o,l,c,d){super(t,n,i,a,s,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class yo extends jn{constructor(t,n,i=ua,a,s,r,o=In,l=In,c,d=Xa,h=1){if(d!==Xa&&d!==Ws)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:n,depth:h};super(u,a,s,r,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Ym(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class H1 extends yo{constructor(t,n=ua,i=ir,a,s,r=In,o=In,l,c=Xa){const d={width:t,height:t,depth:1},h=[d,d,d,d,d,d];super(t,t,n,i,a,s,r,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class _S extends jn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class rr extends Xn{constructor(t=1,n=1,i=1,a=1,s=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:a,heightSegments:s,depthSegments:r};const o=this;a=Math.floor(a),s=Math.floor(s),r=Math.floor(r);const l=[],c=[],d=[],h=[];let u=0,p=0;g("z","y","x",-1,-1,i,n,t,r,s,0),g("z","y","x",1,-1,i,n,-t,r,s,1),g("x","z","y",1,1,t,i,n,a,r,2),g("x","z","y",1,-1,t,i,-n,a,r,3),g("x","y","z",1,-1,t,n,i,a,s,4),g("x","y","z",-1,-1,t,n,-i,a,s,5),this.setIndex(l),this.setAttribute("position",new Bi(c,3)),this.setAttribute("normal",new Bi(d,3)),this.setAttribute("uv",new Bi(h,2));function g(S,m,f,v,M,y,U,C,T,x,w){const D=y/T,O=U/x,I=y/2,z=U/2,G=C/2,k=T+1,B=x+1;let F=0,P=0;const X=new $;for(let pt=0;pt<B;pt++){const Tt=pt*O-z;for(let Lt=0;Lt<k;Lt++){const ae=Lt*D-I;X[S]=ae*v,X[m]=Tt*M,X[f]=G,c.push(X.x,X.y,X.z),X[S]=0,X[m]=0,X[f]=C>0?1:-1,d.push(X.x,X.y,X.z),h.push(Lt/T),h.push(1-pt/x),F+=1}}for(let pt=0;pt<x;pt++)for(let Tt=0;Tt<T;Tt++){const Lt=u+Tt+k*pt,ae=u+Tt+k*(pt+1),Jt=u+(Tt+1)+k*(pt+1),se=u+(Tt+1)+k*pt;l.push(Lt,ae,se),l.push(ae,Jt,se),P+=6}o.addGroup(p,P,w),p+=P,u+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}const Hc=new $,Gc=new $,Bd=new $,Vc=new Pi;class G1 extends Xn{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){const a=Math.pow(10,4),s=Math.cos(pu*n),r=t.getIndex(),o=t.getAttribute("position"),l=r?r.count:o.count,c=[0,0,0],d=["a","b","c"],h=new Array(3),u={},p=[];for(let g=0;g<l;g+=3){r?(c[0]=r.getX(g),c[1]=r.getX(g+1),c[2]=r.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);const{a:S,b:m,c:f}=Vc;if(S.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),f.fromBufferAttribute(o,c[2]),Vc.getNormal(Bd),h[0]=`${Math.round(S.x*a)},${Math.round(S.y*a)},${Math.round(S.z*a)}`,h[1]=`${Math.round(m.x*a)},${Math.round(m.y*a)},${Math.round(m.z*a)}`,h[2]=`${Math.round(f.x*a)},${Math.round(f.y*a)},${Math.round(f.z*a)}`,!(h[0]===h[1]||h[1]===h[2]||h[2]===h[0]))for(let v=0;v<3;v++){const M=(v+1)%3,y=h[v],U=h[M],C=Vc[d[v]],T=Vc[d[M]],x=`${y}_${U}`,w=`${U}_${y}`;w in u&&u[w]?(Bd.dot(u[w].normal)<=s&&(p.push(C.x,C.y,C.z),p.push(T.x,T.y,T.z)),u[w]=null):x in u||(u[x]={index0:c[v],index1:c[M],normal:Bd.clone()})}}for(const g in u)if(u[g]){const{index0:S,index1:m}=u[g];Hc.fromBufferAttribute(o,S),Gc.fromBufferAttribute(o,m),p.push(Hc.x,Hc.y,Hc.z),p.push(Gc.x,Gc.y,Gc.z)}this.setAttribute("position",new Bi(p,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class bf extends Xn{constructor(t=1,n=1,i=1,a=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:a};const s=t/2,r=n/2,o=Math.floor(i),l=Math.floor(a),c=o+1,d=l+1,h=t/o,u=n/l,p=[],g=[],S=[],m=[];for(let f=0;f<d;f++){const v=f*u-r;for(let M=0;M<c;M++){const y=M*h-s;g.push(y,-v,0),S.push(0,0,1),m.push(M/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let v=0;v<o;v++){const M=v+c*f,y=v+c*(f+1),U=v+1+c*(f+1),C=v+1+c*f;p.push(M,y,C),p.push(y,U,C)}this.setIndex(p),this.setAttribute("position",new Bi(g,3)),this.setAttribute("normal",new Bi(S,3)),this.setAttribute("uv",new Bi(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new bf(t.width,t.height,t.widthSegments,t.heightSegments)}}function So(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const a=e[n][i];if(uv(a))a.isRenderTargetTexture?(le("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=a.clone();else if(Array.isArray(a))if(uv(a[0])){const s=[];for(let r=0,o=a.length;r<o;r++)s[r]=a[r].clone();t[n][i]=s}else t[n][i]=a.slice();else t[n][i]=a}}return t}function Wn(e){const t={};for(let n=0;n<e.length;n++){const i=So(e[n]);for(const a in i)t[a]=i[a]}return t}function uv(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function V1(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function xS(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Ue.workingColorSpace}const k1={clone:So,merge:Wn};var X1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,W1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Bn extends Uo{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=X1,this.fragmentShader=W1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=So(t.uniforms),this.uniformsGroups=V1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const a in this.uniforms){const r=this.uniforms[a].value;r&&r.isTexture?n.uniforms[a]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?n.uniforms[a]={type:"c",value:r.getHex()}:r&&r.isVector2?n.uniforms[a]={type:"v2",value:r.toArray()}:r&&r.isVector3?n.uniforms[a]={type:"v3",value:r.toArray()}:r&&r.isVector4?n.uniforms[a]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?n.uniforms[a]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?n.uniforms[a]={type:"m4",value:r.toArray()}:n.uniforms[a]={value:r}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const a in this.extensions)this.extensions[a]===!0&&(i[a]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}fromJSON(t,n){if(super.fromJSON(t,n),t.uniforms!==void 0)for(const i in t.uniforms){const a=t.uniforms[i];switch(this.uniforms[i]={},a.type){case"t":this.uniforms[i].value=n[a.value]||null;break;case"c":this.uniforms[i].value=new we().setHex(a.value);break;case"v2":this.uniforms[i].value=new Ve().fromArray(a.value);break;case"v3":this.uniforms[i].value=new $().fromArray(a.value);break;case"v4":this.uniforms[i].value=new fn().fromArray(a.value);break;case"m3":this.uniforms[i].value=new pe().fromArray(a.value);break;case"m4":this.uniforms[i].value=new nn().fromArray(a.value);break;default:this.uniforms[i].value=a.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const i in t.extensions)this.extensions[i]=t.extensions[i];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class q1 extends Bn{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Y1 extends Uo{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=i1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class j1 extends Uo{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const kc=new $,Xc=new No,$i=new $;class yS extends Zn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new nn,this.projectionMatrix=new nn,this.projectionMatrixInverse=new nn,this.coordinateSystem=ra,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(kc,Xc,$i),$i.x===1&&$i.y===1&&$i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Xc,$i.set(1,1,1)).invert()}updateWorldMatrix(t,n,i=!1){super.updateWorldMatrix(t,n,i),this.matrixWorld.decompose(kc,Xc,$i),$i.x===1&&$i.y===1&&$i.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(kc,Xc,$i.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const $a=new $,fv=new Ve,dv=new Ve;class Di extends yS{constructor(t=50,n=1,i=.1,a=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=a,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=wp*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(pu*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return wp*2*Math.atan(Math.tan(pu*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){$a.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set($a.x,$a.y).multiplyScalar(-t/$a.z),$a.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set($a.x,$a.y).multiplyScalar(-t/$a.z)}getViewSize(t,n){return this.getViewBounds(t,fv,dv),n.subVectors(dv,fv)}setViewOffset(t,n,i,a,s,r){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(pu*.5*this.fov)/this.zoom,i=2*n,a=this.aspect*i,s=-.5*a;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;s+=r.offsetX*a/l,n-=r.offsetY*i/c,a*=r.width/l,i*=r.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+a,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Km extends yS{constructor(t=-1,n=1,i=1,a=-1,s=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=a,this.near=s,this.far=r,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,a,s,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=a,this.view.width=s,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,a=(this.top+this.bottom)/2;let s=i-t,r=i+t,o=a+n,l=a-n;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,r=s+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(s,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const Dr=-90,Nr=1;class Z1 extends Zn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const a=new Di(Dr,Nr,t,n);a.layers=this.layers,this.add(a);const s=new Di(Dr,Nr,t,n);s.layers=this.layers,this.add(s);const r=new Di(Dr,Nr,t,n);r.layers=this.layers,this.add(r);const o=new Di(Dr,Nr,t,n);o.layers=this.layers,this.add(o);const l=new Di(Dr,Nr,t,n);l.layers=this.layers,this.add(l);const c=new Di(Dr,Nr,t,n);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,a,s,r,o,l]=n;for(const c of n)this.remove(c);if(t===ra)i.up.set(0,1,0),i.lookAt(1,0,0),a.up.set(0,1,0),a.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===Qu)i.up.set(0,-1,0),i.lookAt(-1,0,0),a.up.set(0,-1,0),a.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of n)this.add(c),c.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:a}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,r,o,l,c,d]=this.children,h=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,1,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,2,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),t.setRenderTarget(i,4,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),i.texture.generateMipmaps=S,t.setRenderTarget(i,5,a),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,d),t.setRenderTarget(h,u,p),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class K1 extends Di{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}const ng=class ng{constructor(t,n,i,a){this.elements=[1,0,0,1],t!==void 0&&this.set(t,n,i,a)}identity(){return this.set(1,0,0,1),this}fromArray(t,n=0){for(let i=0;i<4;i++)this.elements[i]=t[i+n];return this}set(t,n,i,a){const s=this.elements;return s[0]=t,s[2]=n,s[1]=i,s[3]=a,this}};ng.prototype.isMatrix2=!0;let hv=ng;function pv(e,t,n,i){const a=Q1(i);switch(n){case aS:return e*t;case Gm:return e*t/a.components*a.byteLength;case Vm:return e*t/a.components*a.byteLength;case ar:return e*t*2/a.components*a.byteLength;case km:return e*t*2/a.components*a.byteLength;case sS:return e*t*3/a.components*a.byteLength;case Zi:return e*t*4/a.components*a.byteLength;case Xm:return e*t*4/a.components*a.byteLength;case uu:case fu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case du:case hu:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case tp:case np:return Math.max(e,16)*Math.max(t,8)/4;case $h:case ep:return Math.max(e,8)*Math.max(t,8)/2;case ip:case ap:case rp:case op:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case sp:case Yu:case lp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case cp:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case up:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case fp:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case dp:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case hp:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case pp:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case mp:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case gp:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case vp:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case _p:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case xp:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case yp:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Sp:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Mp:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case bp:case Ep:case Tp:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ap:case Rp:return Math.ceil(e/4)*Math.ceil(t/4)*8;case ju:case Cp:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function Q1(e){switch(e){case Oi:case tS:return{byteLength:1,components:1};case Pl:case eS:case ka:return{byteLength:2,components:1};case Fm:case Hm:return{byteLength:2,components:4};case ua:case Bm:case ji:return{byteLength:4,components:1};case nS:case iS:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Im}}));typeof window<"u"&&(window.__THREE__?le("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Im);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function SS(){let e=null,t=!1,n=null,i=null;function a(s,r){n(s,r),i=e.requestAnimationFrame(a)}return{start:function(){t!==!0&&n!==null&&e!==null&&(i=e.requestAnimationFrame(a),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function J1(e){const t=new WeakMap;function n(o,l){const c=o.array,d=o.usage,h=c.byteLength,u=e.createBuffer();e.bindBuffer(l,u),e.bufferData(l,c,d),o.onUploadCallback();let p;if(c instanceof Float32Array)p=e.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=e.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=e.HALF_FLOAT:p=e.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=e.SHORT;else if(c instanceof Uint32Array)p=e.UNSIGNED_INT;else if(c instanceof Int32Array)p=e.INT;else if(c instanceof Int8Array)p=e.BYTE;else if(c instanceof Uint8Array)p=e.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){const d=l.array,h=l.updateRanges;if(e.bindBuffer(c,o),h.length===0)e.bufferSubData(c,0,d);else{h.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<h.length;p++){const g=h[u],S=h[p];S.start<=g.start+g.count+1?g.count=Math.max(g.count,S.start+S.count-g.start):(++u,h[u]=S)}h.length=u+1;for(let p=0,g=h.length;p<g;p++){const S=h[p];e.bufferSubData(c,S.start*d.BYTES_PER_ELEMENT,d,S.start,S.count)}l.clearUpdateRanges()}l.onUploadCallback()}function a(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(e.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=t.get(o);(!d||d.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,n(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:a,remove:s,update:r}}var $1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,tT=`#ifdef USE_ALPHAHASH
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
#endif`,eT=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,nT=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,iT=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,aT=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,sT=`#ifdef USE_AOMAP
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
#endif`,rT=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,oT=`#ifdef USE_BATCHING
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
#endif`,lT=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,cT=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,uT=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fT=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,dT=`#ifdef USE_IRIDESCENCE
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
#endif`,hT=`#ifdef USE_BUMPMAP
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
#endif`,pT=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,mT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,gT=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,vT=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_T=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,xT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,yT=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,ST=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,MT=`#define PI 3.141592653589793
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
} // validated`,bT=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ET=`vec3 transformedNormal = objectNormal;
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
#endif`,TT=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,AT=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,RT=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,CT=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,wT="gl_FragColor = linearToOutputTexel( gl_FragColor );",DT=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,NT=`#ifdef USE_ENVMAP
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
#endif`,UT=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,LT=`#ifdef USE_ENVMAP
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
#endif`,OT=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,PT=`#ifdef USE_ENVMAP
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
#endif`,zT=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,IT=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,BT=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,FT=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,HT=`#ifdef USE_GRADIENTMAP
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
}`,GT=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,VT=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,kT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,XT=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,WT=`#ifdef USE_ENVMAP
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
#endif`,qT=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,YT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,jT=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ZT=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,KT=`PhysicalMaterial material;
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
#endif`,QT=`uniform sampler2D dfgLUT;
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
}`,JT=`
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
#endif`,$T=`#if defined( RE_IndirectDiffuse )
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
#endif`,tA=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,eA=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,nA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,iA=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,aA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,sA=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,rA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,oA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,lA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,cA=`#if defined( USE_POINTS_UV )
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
#endif`,uA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,dA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,hA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,pA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,mA=`#ifdef USE_MORPHTARGETS
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
#endif`,gA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,_A=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,xA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,yA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,SA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,MA=`#ifdef USE_NORMALMAP
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
#endif`,bA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,EA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,TA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,AA=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,RA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,CA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,DA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,NA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,UA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,LA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,OA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,PA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,zA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,IA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,BA=`float getShadowMask() {
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
}`,FA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,HA=`#ifdef USE_SKINNING
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
#endif`,GA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,VA=`#ifdef USE_SKINNING
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
#endif`,kA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,XA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,WA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,qA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,YA=`#ifdef USE_TRANSMISSION
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
#endif`,jA=`#ifdef USE_TRANSMISSION
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
#endif`,ZA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,KA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,JA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const $A=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,t2=`uniform sampler2D t2D;
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
}`,e2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,n2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,i2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,a2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s2=`#include <common>
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
}`,r2=`#if DEPTH_PACKING == 3200
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
}`,o2=`#define DISTANCE
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
}`,l2=`#define DISTANCE
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
}`,c2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,f2=`uniform float scale;
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
}`,d2=`uniform vec3 diffuse;
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
}`,h2=`#include <common>
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
}`,p2=`uniform vec3 diffuse;
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
}`,m2=`#define LAMBERT
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
}`,g2=`#define LAMBERT
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
}`,v2=`#define MATCAP
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
}`,_2=`#define MATCAP
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
}`,x2=`#define NORMAL
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
}`,y2=`#define NORMAL
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
}`,S2=`#define PHONG
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
}`,M2=`#define PHONG
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
}`,b2=`#define STANDARD
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
}`,E2=`#define STANDARD
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
}`,T2=`#define TOON
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
}`,A2=`#define TOON
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
}`,R2=`uniform float size;
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
}`,C2=`uniform vec3 diffuse;
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
}`,w2=`#include <common>
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
}`,D2=`uniform vec3 color;
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
}`,N2=`uniform float rotation;
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
}`,U2=`uniform vec3 diffuse;
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
}`,xe={alphahash_fragment:$1,alphahash_pars_fragment:tT,alphamap_fragment:eT,alphamap_pars_fragment:nT,alphatest_fragment:iT,alphatest_pars_fragment:aT,aomap_fragment:sT,aomap_pars_fragment:rT,batching_pars_vertex:oT,batching_vertex:lT,begin_vertex:cT,beginnormal_vertex:uT,bsdfs:fT,iridescence_fragment:dT,bumpmap_pars_fragment:hT,clipping_planes_fragment:pT,clipping_planes_pars_fragment:mT,clipping_planes_pars_vertex:gT,clipping_planes_vertex:vT,color_fragment:_T,color_pars_fragment:xT,color_pars_vertex:yT,color_vertex:ST,common:MT,cube_uv_reflection_fragment:bT,defaultnormal_vertex:ET,displacementmap_pars_vertex:TT,displacementmap_vertex:AT,emissivemap_fragment:RT,emissivemap_pars_fragment:CT,colorspace_fragment:wT,colorspace_pars_fragment:DT,envmap_fragment:NT,envmap_common_pars_fragment:UT,envmap_pars_fragment:LT,envmap_pars_vertex:OT,envmap_physical_pars_fragment:WT,envmap_vertex:PT,fog_vertex:zT,fog_pars_vertex:IT,fog_fragment:BT,fog_pars_fragment:FT,gradientmap_pars_fragment:HT,lightmap_pars_fragment:GT,lights_lambert_fragment:VT,lights_lambert_pars_fragment:kT,lights_pars_begin:XT,lights_toon_fragment:qT,lights_toon_pars_fragment:YT,lights_phong_fragment:jT,lights_phong_pars_fragment:ZT,lights_physical_fragment:KT,lights_physical_pars_fragment:QT,lights_fragment_begin:JT,lights_fragment_maps:$T,lights_fragment_end:tA,lightprobes_pars_fragment:eA,logdepthbuf_fragment:nA,logdepthbuf_pars_fragment:iA,logdepthbuf_pars_vertex:aA,logdepthbuf_vertex:sA,map_fragment:rA,map_pars_fragment:oA,map_particle_fragment:lA,map_particle_pars_fragment:cA,metalnessmap_fragment:uA,metalnessmap_pars_fragment:fA,morphinstance_vertex:dA,morphcolor_vertex:hA,morphnormal_vertex:pA,morphtarget_pars_vertex:mA,morphtarget_vertex:gA,normal_fragment_begin:vA,normal_fragment_maps:_A,normal_pars_fragment:xA,normal_pars_vertex:yA,normal_vertex:SA,normalmap_pars_fragment:MA,clearcoat_normal_fragment_begin:bA,clearcoat_normal_fragment_maps:EA,clearcoat_pars_fragment:TA,iridescence_pars_fragment:AA,opaque_fragment:RA,packing:CA,premultiplied_alpha_fragment:wA,project_vertex:DA,dithering_fragment:NA,dithering_pars_fragment:UA,roughnessmap_fragment:LA,roughnessmap_pars_fragment:OA,shadowmap_pars_fragment:PA,shadowmap_pars_vertex:zA,shadowmap_vertex:IA,shadowmask_pars_fragment:BA,skinbase_vertex:FA,skinning_pars_vertex:HA,skinning_vertex:GA,skinnormal_vertex:VA,specularmap_fragment:kA,specularmap_pars_fragment:XA,tonemapping_fragment:WA,tonemapping_pars_fragment:qA,transmission_fragment:YA,transmission_pars_fragment:jA,uv_pars_fragment:ZA,uv_pars_vertex:KA,uv_vertex:QA,worldpos_vertex:JA,background_vert:$A,background_frag:t2,backgroundCube_vert:e2,backgroundCube_frag:n2,cube_vert:i2,cube_frag:a2,depth_vert:s2,depth_frag:r2,distance_vert:o2,distance_frag:l2,equirect_vert:c2,equirect_frag:u2,linedashed_vert:f2,linedashed_frag:d2,meshbasic_vert:h2,meshbasic_frag:p2,meshlambert_vert:m2,meshlambert_frag:g2,meshmatcap_vert:v2,meshmatcap_frag:_2,meshnormal_vert:x2,meshnormal_frag:y2,meshphong_vert:S2,meshphong_frag:M2,meshphysical_vert:b2,meshphysical_frag:E2,meshtoon_vert:T2,meshtoon_frag:A2,points_vert:R2,points_frag:C2,shadow_vert:w2,shadow_frag:D2,sprite_vert:N2,sprite_frag:U2},Ft={common:{diffuse:{value:new we(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new pe}},envmap:{envMap:{value:null},envMapRotation:{value:new pe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new pe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new pe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new pe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new pe},normalScale:{value:new Ve(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new pe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new pe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new pe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new pe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new we(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new $},probesMax:{value:new $},probesResolution:{value:new $}},points:{diffuse:{value:new we(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0},uvTransform:{value:new pe}},sprite:{diffuse:{value:new we(16777215)},opacity:{value:1},center:{value:new Ve(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new pe},alphaMap:{value:null},alphaMapTransform:{value:new pe},alphaTest:{value:0}}},ea={basic:{uniforms:Wn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.fog]),vertexShader:xe.meshbasic_vert,fragmentShader:xe.meshbasic_frag},lambert:{uniforms:Wn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new we(0)},envMapIntensity:{value:1}}]),vertexShader:xe.meshlambert_vert,fragmentShader:xe.meshlambert_frag},phong:{uniforms:Wn([Ft.common,Ft.specularmap,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,Ft.lights,{emissive:{value:new we(0)},specular:{value:new we(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:xe.meshphong_vert,fragmentShader:xe.meshphong_frag},standard:{uniforms:Wn([Ft.common,Ft.envmap,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.roughnessmap,Ft.metalnessmap,Ft.fog,Ft.lights,{emissive:{value:new we(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag},toon:{uniforms:Wn([Ft.common,Ft.aomap,Ft.lightmap,Ft.emissivemap,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.gradientmap,Ft.fog,Ft.lights,{emissive:{value:new we(0)}}]),vertexShader:xe.meshtoon_vert,fragmentShader:xe.meshtoon_frag},matcap:{uniforms:Wn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,Ft.fog,{matcap:{value:null}}]),vertexShader:xe.meshmatcap_vert,fragmentShader:xe.meshmatcap_frag},points:{uniforms:Wn([Ft.points,Ft.fog]),vertexShader:xe.points_vert,fragmentShader:xe.points_frag},dashed:{uniforms:Wn([Ft.common,Ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:xe.linedashed_vert,fragmentShader:xe.linedashed_frag},depth:{uniforms:Wn([Ft.common,Ft.displacementmap]),vertexShader:xe.depth_vert,fragmentShader:xe.depth_frag},normal:{uniforms:Wn([Ft.common,Ft.bumpmap,Ft.normalmap,Ft.displacementmap,{opacity:{value:1}}]),vertexShader:xe.meshnormal_vert,fragmentShader:xe.meshnormal_frag},sprite:{uniforms:Wn([Ft.sprite,Ft.fog]),vertexShader:xe.sprite_vert,fragmentShader:xe.sprite_frag},background:{uniforms:{uvTransform:{value:new pe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:xe.background_vert,fragmentShader:xe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new pe}},vertexShader:xe.backgroundCube_vert,fragmentShader:xe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:xe.cube_vert,fragmentShader:xe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:xe.equirect_vert,fragmentShader:xe.equirect_frag},distance:{uniforms:Wn([Ft.common,Ft.displacementmap,{referencePosition:{value:new $},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:xe.distance_vert,fragmentShader:xe.distance_frag},shadow:{uniforms:Wn([Ft.lights,Ft.fog,{color:{value:new we(0)},opacity:{value:1}}]),vertexShader:xe.shadow_vert,fragmentShader:xe.shadow_frag}};ea.physical={uniforms:Wn([ea.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new pe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new pe},clearcoatNormalScale:{value:new Ve(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new pe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new pe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new pe},sheen:{value:0},sheenColor:{value:new we(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new pe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new pe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new pe},transmissionSamplerSize:{value:new Ve},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new pe},attenuationDistance:{value:0},attenuationColor:{value:new we(0)},specularColor:{value:new we(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new pe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new pe},anisotropyVector:{value:new Ve},anisotropyMap:{value:null},anisotropyMapTransform:{value:new pe}}]),vertexShader:xe.meshphysical_vert,fragmentShader:xe.meshphysical_frag};const Wc={r:0,b:0,g:0},L2=new nn,MS=new pe;MS.set(-1,0,0,0,1,0,0,0,1);function O2(e,t,n,i,a,s){const r=new we(0);let o=a===!0?0:1,l,c,d=null,h=0,u=null;function p(v){let M=v.isScene===!0?v.background:null;if(M&&M.isTexture){const y=v.backgroundBlurriness>0;M=t.get(M,y)}return M}function g(v){let M=!1;const y=p(v);y===null?m(r,o):y&&y.isColor&&(m(y,1),M=!0);const U=e.xr.getEnvironmentBlendMode();U==="additive"?n.buffers.color.setClear(0,0,0,1,s):U==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||M)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function S(v,M){const y=p(M);y&&(y.isCubeTexture||y.mapping===Mf)?(c===void 0&&(c=new Hi(new rr(1,1,1),new Bn({name:"BackgroundCubeMaterial",uniforms:So(ea.backgroundCube.uniforms),vertexShader:ea.backgroundCube.vertexShader,fragmentShader:ea.backgroundCube.fragmentShader,side:si,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(U,C,T){this.matrixWorld.copyPosition(T.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(L2.makeRotationFromEuler(M.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(MS),c.material.toneMapped=Ue.getTransfer(y.colorSpace)!==qe,(d!==y||h!==y.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=e.toneMapping),c.layers.enableAll(),v.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Hi(new bf(2,2),new Bn({name:"BackgroundMaterial",uniforms:So(ea.background.uniforms),vertexShader:ea.background.vertexShader,fragmentShader:ea.background.fragmentShader,side:Rs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=Ue.getTransfer(y.colorSpace)!==qe,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=e.toneMapping),l.layers.enableAll(),v.unshift(l,l.geometry,l.material,0,0,null))}function m(v,M){v.getRGB(Wc,xS(e)),n.buffers.color.setClear(Wc.r,Wc.g,Wc.b,M,s)}function f(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(v,M=1){r.set(v),o=M,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(v){o=v,m(r,o)},render:g,addToRenderList:S,dispose:f}}function P2(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},a=u(null);let s=a,r=!1;function o(O,I,z,G,k){let B=!1;const F=h(O,G,z,I);s!==F&&(s=F,c(s.object)),B=p(O,G,z,k),B&&g(O,G,z,k),k!==null&&t.update(k,e.ELEMENT_ARRAY_BUFFER),(B||r)&&(r=!1,y(O,I,z,G),k!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(k).buffer))}function l(){return e.createVertexArray()}function c(O){return e.bindVertexArray(O)}function d(O){return e.deleteVertexArray(O)}function h(O,I,z,G){const k=G.wireframe===!0;let B=i[I.id];B===void 0&&(B={},i[I.id]=B);const F=O.isInstancedMesh===!0?O.id:0;let P=B[F];P===void 0&&(P={},B[F]=P);let X=P[z.id];X===void 0&&(X={},P[z.id]=X);let pt=X[k];return pt===void 0&&(pt=u(l()),X[k]=pt),pt}function u(O){const I=[],z=[],G=[];for(let k=0;k<n;k++)I[k]=0,z[k]=0,G[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:z,attributeDivisors:G,object:O,attributes:{},index:null}}function p(O,I,z,G){const k=s.attributes,B=I.attributes;let F=0;const P=z.getAttributes();for(const X in P)if(P[X].location>=0){const Tt=k[X];let Lt=B[X];if(Lt===void 0&&(X==="instanceMatrix"&&O.instanceMatrix&&(Lt=O.instanceMatrix),X==="instanceColor"&&O.instanceColor&&(Lt=O.instanceColor)),Tt===void 0||Tt.attribute!==Lt||Lt&&Tt.data!==Lt.data)return!0;F++}return s.attributesNum!==F||s.index!==G}function g(O,I,z,G){const k={},B=I.attributes;let F=0;const P=z.getAttributes();for(const X in P)if(P[X].location>=0){let Tt=B[X];Tt===void 0&&(X==="instanceMatrix"&&O.instanceMatrix&&(Tt=O.instanceMatrix),X==="instanceColor"&&O.instanceColor&&(Tt=O.instanceColor));const Lt={};Lt.attribute=Tt,Tt&&Tt.data&&(Lt.data=Tt.data),k[X]=Lt,F++}s.attributes=k,s.attributesNum=F,s.index=G}function S(){const O=s.newAttributes;for(let I=0,z=O.length;I<z;I++)O[I]=0}function m(O){f(O,0)}function f(O,I){const z=s.newAttributes,G=s.enabledAttributes,k=s.attributeDivisors;z[O]=1,G[O]===0&&(e.enableVertexAttribArray(O),G[O]=1),k[O]!==I&&(e.vertexAttribDivisor(O,I),k[O]=I)}function v(){const O=s.newAttributes,I=s.enabledAttributes;for(let z=0,G=I.length;z<G;z++)I[z]!==O[z]&&(e.disableVertexAttribArray(z),I[z]=0)}function M(O,I,z,G,k,B,F){F===!0?e.vertexAttribIPointer(O,I,z,k,B):e.vertexAttribPointer(O,I,z,G,k,B)}function y(O,I,z,G){S();const k=G.attributes,B=z.getAttributes(),F=I.defaultAttributeValues;for(const P in B){const X=B[P];if(X.location>=0){let pt=k[P];if(pt===void 0&&(P==="instanceMatrix"&&O.instanceMatrix&&(pt=O.instanceMatrix),P==="instanceColor"&&O.instanceColor&&(pt=O.instanceColor)),pt!==void 0){const Tt=pt.normalized,Lt=pt.itemSize,ae=t.get(pt);if(ae===void 0)continue;const Jt=ae.buffer,se=ae.type,ht=ae.bytesPerElement,tt=se===e.INT||se===e.UNSIGNED_INT||pt.gpuType===Bm;if(pt.isInterleavedBufferAttribute){const K=pt.data,Et=K.stride,Pt=pt.offset;if(K.isInstancedInterleavedBuffer){for(let Ht=0;Ht<X.locationSize;Ht++)f(X.location+Ht,K.meshPerAttribute);O.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=K.meshPerAttribute*K.count)}else for(let Ht=0;Ht<X.locationSize;Ht++)m(X.location+Ht);e.bindBuffer(e.ARRAY_BUFFER,Jt);for(let Ht=0;Ht<X.locationSize;Ht++)M(X.location+Ht,Lt/X.locationSize,se,Tt,Et*ht,(Pt+Lt/X.locationSize*Ht)*ht,tt)}else{if(pt.isInstancedBufferAttribute){for(let K=0;K<X.locationSize;K++)f(X.location+K,pt.meshPerAttribute);O.isInstancedMesh!==!0&&G._maxInstanceCount===void 0&&(G._maxInstanceCount=pt.meshPerAttribute*pt.count)}else for(let K=0;K<X.locationSize;K++)m(X.location+K);e.bindBuffer(e.ARRAY_BUFFER,Jt);for(let K=0;K<X.locationSize;K++)M(X.location+K,Lt/X.locationSize,se,Tt,Lt*ht,Lt/X.locationSize*K*ht,tt)}}else if(F!==void 0){const Tt=F[P];if(Tt!==void 0)switch(Tt.length){case 2:e.vertexAttrib2fv(X.location,Tt);break;case 3:e.vertexAttrib3fv(X.location,Tt);break;case 4:e.vertexAttrib4fv(X.location,Tt);break;default:e.vertexAttrib1fv(X.location,Tt)}}}}v()}function U(){w();for(const O in i){const I=i[O];for(const z in I){const G=I[z];for(const k in G){const B=G[k];for(const F in B)d(B[F].object),delete B[F];delete G[k]}}delete i[O]}}function C(O){if(i[O.id]===void 0)return;const I=i[O.id];for(const z in I){const G=I[z];for(const k in G){const B=G[k];for(const F in B)d(B[F].object),delete B[F];delete G[k]}}delete i[O.id]}function T(O){for(const I in i){const z=i[I];for(const G in z){const k=z[G];if(k[O.id]===void 0)continue;const B=k[O.id];for(const F in B)d(B[F].object),delete B[F];delete k[O.id]}}}function x(O){for(const I in i){const z=i[I],G=O.isInstancedMesh===!0?O.id:0,k=z[G];if(k!==void 0){for(const B in k){const F=k[B];for(const P in F)d(F[P].object),delete F[P];delete k[B]}delete z[G],Object.keys(z).length===0&&delete i[I]}}}function w(){D(),r=!0,s!==a&&(s=a,c(s.object))}function D(){a.geometry=null,a.program=null,a.wireframe=!1}return{setup:o,reset:w,resetDefaultState:D,dispose:U,releaseStatesOfGeometry:C,releaseStatesOfObject:x,releaseStatesOfProgram:T,initAttributes:S,enableAttribute:m,disableUnusedAttributes:v}}function z2(e,t,n){let i;function a(l){i=l}function s(l,c){e.drawArrays(i,l,c),n.update(c,i,1)}function r(l,c,d){d!==0&&(e.drawArraysInstanced(i,l,c,d),n.update(c,i,d))}function o(l,c,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let p=0;p<d;p++)u+=c[p];n.update(u,i,1)}this.setMode=a,this.render=s,this.renderInstances=r,this.renderMultiDraw=o}function I2(e,t,n,i){let a;function s(){if(a!==void 0)return a;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");a=e.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else a=0;return a}function r(T){return!(T!==Zi&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(T){const x=T===ka&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==Oi&&i.convert(T)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ji&&!x)}function l(T){if(T==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=n.precision!==void 0?n.precision:"highp";const d=l(c);d!==c&&(le("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const h=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control");n.reversedDepthBuffer===!0&&u===!1&&le("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),M=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),U=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:p,maxVertexTextures:g,maxTextureSize:S,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:v,maxVaryings:M,maxFragmentUniforms:y,maxSamples:U,samples:C}}function B2(e){const t=this;let n=null,i=0,a=!1,s=!1;const r=new Gs,o=new pe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){const p=h.length!==0||u||i!==0||a;return a=u,i=h.length,p},this.beginShadows=function(){s=!0,d(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){n=d(h,u,0)},this.setState=function(h,u,p){const g=h.clippingPlanes,S=h.clipIntersection,m=h.clipShadows,f=e.get(h);if(!a||g===null||g.length===0||s&&!m)s?d(null):c();else{const v=s?0:i,M=v*4;let y=f.clippingState||null;l.value=y,y=d(g,u,M,p);for(let U=0;U!==M;++U)y[U]=n[U];f.clippingState=y,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=v}};function c(){l.value!==n&&(l.value=n,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function d(h,u,p,g){const S=h!==null?h.length:0;let m=null;if(S!==0){if(m=l.value,g!==!0||m===null){const f=p+S*4,v=u.matrixWorldInverse;o.getNormalMatrix(v),(m===null||m.length<f)&&(m=new Float32Array(f));for(let M=0,y=p;M!==S;++M,y+=4)r.copy(h[M]).applyMatrix4(v,o),r.normal.toArray(m,y),m[y+3]=r.constant}l.value=m,l.needsUpdate=!0}return t.numPlanes=S,t.numIntersection=0,m}}const ds=4,mv=[.125,.215,.35,.446,.526,.582],ks=20,F2=256,Zo=new Km,gv=new we;let Fd=null,Hd=0,Gd=0,Vd=!1;const H2=new $;class vv{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,a=100,s={}){const{size:r=256,position:o=H2}=s;Fd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Gd=this._renderer.getActiveMipmapLevel(),Vd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(r);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,a,l,o),n>0&&this._blur(l,0,0,n),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yv(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=xv(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Fd,Hd,Gd),this._renderer.xr.enabled=Vd,t.scissorTest=!1,Ur(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===ir||t.mapping===xo?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Fd=this._renderer.getRenderTarget(),Hd=this._renderer.getActiveCubeFace(),Gd=this._renderer.getActiveMipmapLevel(),Vd=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:kn,minFilter:kn,generateMipmaps:!1,type:ka,format:Zi,colorSpace:Zu,depthBuffer:!1},a=_v(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_v(t,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=G2(s)),this._blurMaterial=k2(s,t,n),this._ggxMaterial=V2(s,t,n)}return a}_compileMaterial(t){const n=new Hi(new Xn,t);this._renderer.compile(n,Zo)}_sceneToCubeUV(t,n,i,a,s){const l=new Di(90,1,n,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,p=h.toneMapping;h.getClearColor(gv),h.toneMapping=la,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(a),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Hi(new rr,new hS({name:"PMREM.Background",side:si,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,m=S.material;let f=!1;const v=t.background;v?v.isColor&&(m.color.copy(v),t.background=null,f=!0):(m.color.copy(gv),f=!0);for(let M=0;M<6;M++){const y=M%3;y===0?(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+d[M],s.y,s.z)):y===1?(l.up.set(0,0,c[M]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+d[M],s.z)):(l.up.set(0,c[M],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+d[M]));const U=this._cubeSize;Ur(a,y*U,M>2?U:0,U,U),h.setRenderTarget(a),f&&h.render(S,l),h.render(t,l)}h.toneMapping=p,h.autoClear=u,t.background=v}_textureToCubeUV(t,n){const i=this._renderer,a=t.mapping===ir||t.mapping===xo;a?(this._cubemapMaterial===null&&(this._cubemapMaterial=yv()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=xv());const s=a?this._cubemapMaterial:this._equirectMaterial,r=this._lodMeshes[0];r.material=s;const o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Ur(n,0,0,3*l,2*l),i.setRenderTarget(n),i.render(r,Zo)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const a=this._lodMeshes.length;for(let s=1;s<a;s++)this._applyGGXFilter(t,s-1,s);n.autoClear=i}_applyGGXFilter(t,n,i){const a=this._renderer,s=this._pingPongRenderTarget,r=this._ggxMaterial,o=this._lodMeshes[i];o.material=r;const l=r.uniforms,c=i/(this._lodMeshes.length-1),d=n/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=0+c*1.25,p=h*u,{_lodMax:g}=this,S=this._sizeLods[i],m=3*S*(i>g-ds?i-g+ds:0),f=4*(this._cubeSize-S);l.envMap.value=t.texture,l.roughness.value=p,l.mipInt.value=g-n,Ur(s,m,f,3*S,2*S),a.setRenderTarget(s),a.render(o,Zo),l.envMap.value=s.texture,l.roughness.value=0,l.mipInt.value=g-i,Ur(t,m,f,3*S,2*S),a.setRenderTarget(t),a.render(o,Zo)}_blur(t,n,i,a,s){const r=this._pingPongRenderTarget;this._halfBlur(t,r,n,i,a,"latitudinal",s),this._halfBlur(r,t,i,i,a,"longitudinal",s)}_halfBlur(t,n,i,a,s,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&ze("blur direction must be either latitudinal or longitudinal!");const d=3,h=this._lodMeshes[a];h.material=c;const u=c.uniforms,p=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*p):2*Math.PI/(2*ks-1),S=s/g,m=isFinite(s)?1+Math.floor(d*S):ks;m>ks&&le(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ks}`);const f=[];let v=0;for(let T=0;T<ks;++T){const x=T/S,w=Math.exp(-x*x/2);f.push(w),T===0?v+=w:T<m&&(v+=2*w)}for(let T=0;T<f.length;T++)f[T]=f[T]/v;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:M}=this;u.dTheta.value=g,u.mipInt.value=M-i;const y=this._sizeLods[a],U=3*y*(a>M-ds?a-M+ds:0),C=4*(this._cubeSize-y);Ur(n,U,C,3*y,2*y),l.setRenderTarget(n),l.render(h,Zo)}}function G2(e){const t=[],n=[],i=[];let a=e;const s=e-ds+1+mv.length;for(let r=0;r<s;r++){const o=Math.pow(2,a);t.push(o);let l=1/o;r>e-ds?l=mv[r-e+ds-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),d=-c,h=1+c,u=[d,d,h,d,h,h,d,d,h,h,d,h],p=6,g=6,S=3,m=2,f=1,v=new Float32Array(S*g*p),M=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let C=0;C<p;C++){const T=C%3*2/3-1,x=C>2?0:-1,w=[T,x,0,T+2/3,x,0,T+2/3,x+1,0,T,x,0,T+2/3,x+1,0,T,x+1,0];v.set(w,S*g*C),M.set(u,m*g*C);const D=[C,C,C,C,C,C];y.set(D,f*g*C)}const U=new Xn;U.setAttribute("position",new We(v,S)),U.setAttribute("uv",new We(M,m)),U.setAttribute("faceIndex",new We(y,f)),i.push(new Hi(U,null)),a>ds&&a--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function _v(e,t,n){const i=new ca(e,t,n);return i.texture.mapping=Mf,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ur(e,t,n,i,a){e.viewport.set(t,n,i,a),e.scissor.set(t,n,i,a)}function V2(e,t,n){return new Bn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:F2,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Ef(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function k2(e,t,n){const i=new Float32Array(ks),a=new $(0,1,0);return new Bn({name:"SphericalGaussianBlur",defines:{n:ks,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:a}},vertexShader:Ef(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function xv(){return new Bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ef(),fragmentShader:`

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
		`,blending:za,depthTest:!1,depthWrite:!1})}function yv(){return new Bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ef(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:za,depthTest:!1,depthWrite:!1})}function Ef(){return`

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
	`}class bS extends ca{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},a=[i,i,i,i,i,i];this.texture=new vS(a),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},a=new rr(5,5,5),s=new Bn({name:"CubemapFromEquirect",uniforms:So(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:si,blending:za});s.uniforms.tEquirect.value=n;const r=new Hi(a,s),o=n.minFilter;return n.minFilter===Xs&&(n.minFilter=kn),new Z1(1,10,this).update(t,r),n.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,n=!0,i=!0,a=!0){const s=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(n,i,a);t.setRenderTarget(s)}}function X2(e){let t=new WeakMap,n=new WeakMap,i=null;function a(u,p=!1){return u==null?null:p?r(u):s(u)}function s(u){if(u&&u.isTexture){const p=u.mapping;if(p===fd||p===dd)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const S=new bS(g.height);return S.fromEquirectangularTexture(e,u),t.set(u,S),u.addEventListener("dispose",c),o(S.texture,u.mapping)}else return null}}return u}function r(u){if(u&&u.isTexture){const p=u.mapping,g=p===fd||p===dd,S=p===ir||p===xo;if(g||S){let m=n.get(u);const f=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==f)return i===null&&(i=new vv(e)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const v=u.image;return g&&v&&v.height>0||S&&v&&l(v)?(i===null&&(i=new vv(e)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",d),m.texture):null}}}return u}function o(u,p){return p===fd?u.mapping=ir:p===dd&&(u.mapping=xo),u}function l(u){let p=0;const g=6;for(let S=0;S<g;S++)u[S]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function d(u){const p=u.target;p.removeEventListener("dispose",d);const g=n.get(p);g!==void 0&&(n.delete(p),g.dispose())}function h(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:a,dispose:h}}function W2(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const a=e.getExtension(i);return t[i]=a,a}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const a=n(i);return a===null&&ao("WebGLRenderer: "+i+" extension not supported."),a}}}function q2(e,t,n,i){const a={},s=new WeakMap;function r(h){const u=h.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",r),delete a[u.id];const p=s.get(u);p&&(t.remove(p),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(h,u){return a[u.id]===!0||(u.addEventListener("dispose",r),a[u.id]=!0,n.memory.geometries++),u}function l(h){const u=h.attributes;for(const p in u)t.update(u[p],e.ARRAY_BUFFER)}function c(h){const u=[],p=h.index,g=h.attributes.position;let S=0;if(g===void 0)return;if(p!==null){const v=p.array;S=p.version;for(let M=0,y=v.length;M<y;M+=3){const U=v[M+0],C=v[M+1],T=v[M+2];u.push(U,C,C,T,T,U)}}else{const v=g.array;S=g.version;for(let M=0,y=v.length/3-1;M<y;M+=3){const U=M+0,C=M+1,T=M+2;u.push(U,C,C,T,T,U)}}const m=new(g.count>=65535?dS:fS)(u,1);m.version=S;const f=s.get(h);f&&t.remove(f),s.set(h,m)}function d(h){const u=s.get(h);if(u){const p=h.index;p!==null&&u.version<p.version&&c(h)}else c(h);return s.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function Y2(e,t,n){let i;function a(h){i=h}let s,r;function o(h){s=h.type,r=h.bytesPerElement}function l(h,u){e.drawElements(i,u,s,h*r),n.update(u,i,1)}function c(h,u,p){p!==0&&(e.drawElementsInstanced(i,u,s,h*r,p),n.update(u,i,p))}function d(h,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,s,h,0,p);let S=0;for(let m=0;m<p;m++)S+=u[m];n.update(S,i,1)}this.setMode=a,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function j2(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,r,o){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:ze("WebGLInfo: Unknown draw mode:",r);break}}function a(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:a,update:i}}function Z2(e,t,n){const i=new WeakMap,a=new fn;function s(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0;let u=i.get(o);if(u===void 0||u.count!==h){let D=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",D)};var p=D;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],v=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),S===!0&&(y=2),m===!0&&(y=3);let U=o.attributes.position.count*y,C=1;U>t.maxTextureSize&&(C=Math.ceil(U/t.maxTextureSize),U=t.maxTextureSize);const T=new Float32Array(U*C*4*h),x=new oS(T,U,C,h);x.type=ji,x.needsUpdate=!0;const w=y*4;for(let O=0;O<h;O++){const I=f[O],z=v[O],G=M[O],k=U*C*4*O;for(let B=0;B<I.count;B++){const F=B*w;g===!0&&(a.fromBufferAttribute(I,B),T[k+F+0]=a.x,T[k+F+1]=a.y,T[k+F+2]=a.z,T[k+F+3]=0),S===!0&&(a.fromBufferAttribute(z,B),T[k+F+4]=a.x,T[k+F+5]=a.y,T[k+F+6]=a.z,T[k+F+7]=0),m===!0&&(a.fromBufferAttribute(G,B),T[k+F+8]=a.x,T[k+F+9]=a.y,T[k+F+10]=a.z,T[k+F+11]=G.itemSize===4?a.w:1)}}u={count:h,texture:x,size:new Ve(U,C)},i.set(o,u),o.addEventListener("dispose",D)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(e,"morphTexture",r.morphTexture,n);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const S=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(e,"morphTargetBaseInfluence",S),l.getUniforms().setValue(e,"morphTargetInfluences",c)}l.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),l.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:s}}function K2(e,t,n,i,a){let s=new WeakMap;function r(c){const d=a.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==d&&(t.update(u),s.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),s.get(c)!==d&&(n.update(c.instanceMatrix,e.ARRAY_BUFFER),c.instanceColor!==null&&n.update(c.instanceColor,e.ARRAY_BUFFER),s.set(c,d))),c.isSkinnedMesh){const p=c.skeleton;s.get(p)!==d&&(p.update(),s.set(p,d))}return u}function o(){s=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),n.remove(d.instanceMatrix),d.instanceColor!==null&&n.remove(d.instanceColor)}return{update:r,dispose:o}}const Q2={[qy]:"LINEAR_TONE_MAPPING",[Yy]:"REINHARD_TONE_MAPPING",[jy]:"CINEON_TONE_MAPPING",[Zy]:"ACES_FILMIC_TONE_MAPPING",[Qy]:"AGX_TONE_MAPPING",[Jy]:"NEUTRAL_TONE_MAPPING",[Ky]:"CUSTOM_TONE_MAPPING"};function J2(e,t,n,i,a,s){const r=new ca(t,n,{type:e,depthBuffer:a,stencilBuffer:s,samples:i?4:0,depthTexture:a?new yo(t,n):void 0}),o=new ca(t,n,{type:ka,depthBuffer:!1,stencilBuffer:!1}),l=new Xn;l.setAttribute("position",new Bi([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new Bi([0,2,0,0,2,0],2));const c=new q1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Hi(l,c),h=new Km(-1,1,1,-1,0,1);let u=null,p=null,g=!1,S,m=null,f=[],v=!1;this.setSize=function(M,y){r.setSize(M,y),o.setSize(M,y);for(let U=0;U<f.length;U++){const C=f[U];C.setSize&&C.setSize(M,y)}},this.setEffects=function(M){f=M,v=f.length>0&&f[0].isRenderPass===!0;const y=r.width,U=r.height;for(let C=0;C<f.length;C++){const T=f[C];T.setSize&&T.setSize(y,U)}},this.begin=function(M,y){if(g||M.toneMapping===la&&f.length===0)return!1;if(m=y,y!==null){const U=y.width,C=y.height;(r.width!==U||r.height!==C)&&this.setSize(U,C)}return v===!1&&M.setRenderTarget(r),S=M.toneMapping,M.toneMapping=la,!0},this.hasRenderPass=function(){return v},this.end=function(M,y){M.toneMapping=S,g=!0;let U=r,C=o;for(let T=0;T<f.length;T++){const x=f[T];if(x.enabled!==!1&&(x.render(M,C,U,y),x.needsSwap!==!1)){const w=U;U=C,C=w}}if(u!==M.outputColorSpace||p!==M.toneMapping){u=M.outputColorSpace,p=M.toneMapping,c.defines={},Ue.getTransfer(u)===qe&&(c.defines.SRGB_TRANSFER="");const T=Q2[p];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=U.texture,M.setRenderTarget(m),M.render(d,h),m=null,g=!1},this.isCompositing=function(){return g},this.dispose=function(){r.depthTexture&&r.depthTexture.dispose(),r.dispose(),o.dispose(),l.dispose(),c.dispose()}}const ES=new jn,Up=new yo(1,1),TS=new oS,AS=new S1,RS=new vS,Sv=[],Mv=[],bv=new Float32Array(16),Ev=new Float32Array(9),Tv=new Float32Array(4);function Lo(e,t,n){const i=e[0];if(i<=0||i>0)return e;const a=t*n;let s=Sv[a];if(s===void 0&&(s=new Float32Array(a),Sv[a]=s),t!==0){i.toArray(s,0);for(let r=1,o=0;r!==t;++r)o+=n,e[r].toArray(s,o)}return s}function Mn(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function bn(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Tf(e,t){let n=Mv[t];n===void 0&&(n=new Int32Array(t),Mv[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function $2(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function tR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;e.uniform2fv(this.addr,t),bn(n,t)}}function eR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Mn(n,t))return;e.uniform3fv(this.addr,t),bn(n,t)}}function nR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;e.uniform4fv(this.addr,t),bn(n,t)}}function iR(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Mn(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),bn(n,t)}else{if(Mn(n,i))return;Tv.set(i),e.uniformMatrix2fv(this.addr,!1,Tv),bn(n,i)}}function aR(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Mn(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),bn(n,t)}else{if(Mn(n,i))return;Ev.set(i),e.uniformMatrix3fv(this.addr,!1,Ev),bn(n,i)}}function sR(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Mn(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),bn(n,t)}else{if(Mn(n,i))return;bv.set(i),e.uniformMatrix4fv(this.addr,!1,bv),bn(n,i)}}function rR(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function oR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;e.uniform2iv(this.addr,t),bn(n,t)}}function lR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mn(n,t))return;e.uniform3iv(this.addr,t),bn(n,t)}}function cR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;e.uniform4iv(this.addr,t),bn(n,t)}}function uR(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function fR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Mn(n,t))return;e.uniform2uiv(this.addr,t),bn(n,t)}}function dR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Mn(n,t))return;e.uniform3uiv(this.addr,t),bn(n,t)}}function hR(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Mn(n,t))return;e.uniform4uiv(this.addr,t),bn(n,t)}}function pR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a);let s;this.type===e.SAMPLER_2D_SHADOW?(Up.compareFunction=n.isReversedDepthBuffer()?qm:Wm,s=Up):s=ES,n.setTexture2D(t||s,a)}function mR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture3D(t||AS,a)}function gR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTextureCube(t||RS,a)}function vR(e,t,n){const i=this.cache,a=n.allocateTextureUnit();i[0]!==a&&(e.uniform1i(this.addr,a),i[0]=a),n.setTexture2DArray(t||TS,a)}function _R(e){switch(e){case 5126:return $2;case 35664:return tR;case 35665:return eR;case 35666:return nR;case 35674:return iR;case 35675:return aR;case 35676:return sR;case 5124:case 35670:return rR;case 35667:case 35671:return oR;case 35668:case 35672:return lR;case 35669:case 35673:return cR;case 5125:return uR;case 36294:return fR;case 36295:return dR;case 36296:return hR;case 35678:case 36198:case 36298:case 36306:case 35682:return pR;case 35679:case 36299:case 36307:return mR;case 35680:case 36300:case 36308:case 36293:return gR;case 36289:case 36303:case 36311:case 36292:return vR}}function xR(e,t){e.uniform1fv(this.addr,t)}function yR(e,t){const n=Lo(t,this.size,2);e.uniform2fv(this.addr,n)}function SR(e,t){const n=Lo(t,this.size,3);e.uniform3fv(this.addr,n)}function MR(e,t){const n=Lo(t,this.size,4);e.uniform4fv(this.addr,n)}function bR(e,t){const n=Lo(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ER(e,t){const n=Lo(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function TR(e,t){const n=Lo(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function AR(e,t){e.uniform1iv(this.addr,t)}function RR(e,t){e.uniform2iv(this.addr,t)}function CR(e,t){e.uniform3iv(this.addr,t)}function wR(e,t){e.uniform4iv(this.addr,t)}function DR(e,t){e.uniform1uiv(this.addr,t)}function NR(e,t){e.uniform2uiv(this.addr,t)}function UR(e,t){e.uniform3uiv(this.addr,t)}function LR(e,t){e.uniform4uiv(this.addr,t)}function OR(e,t,n){const i=this.cache,a=t.length,s=Tf(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));let r;this.type===e.SAMPLER_2D_SHADOW?r=Up:r=ES;for(let o=0;o!==a;++o)n.setTexture2D(t[o]||r,s[o])}function PR(e,t,n){const i=this.cache,a=t.length,s=Tf(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture3D(t[r]||AS,s[r])}function zR(e,t,n){const i=this.cache,a=t.length,s=Tf(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTextureCube(t[r]||RS,s[r])}function IR(e,t,n){const i=this.cache,a=t.length,s=Tf(n,a);Mn(i,s)||(e.uniform1iv(this.addr,s),bn(i,s));for(let r=0;r!==a;++r)n.setTexture2DArray(t[r]||TS,s[r])}function BR(e){switch(e){case 5126:return xR;case 35664:return yR;case 35665:return SR;case 35666:return MR;case 35674:return bR;case 35675:return ER;case 35676:return TR;case 5124:case 35670:return AR;case 35667:case 35671:return RR;case 35668:case 35672:return CR;case 35669:case 35673:return wR;case 5125:return DR;case 36294:return NR;case 36295:return UR;case 36296:return LR;case 35678:case 36198:case 36298:case 36306:case 35682:return OR;case 35679:case 36299:case 36307:return PR;case 35680:case 36300:case 36308:case 36293:return zR;case 36289:case 36303:case 36311:case 36292:return IR}}class FR{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=_R(n.type)}}class HR{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=BR(n.type)}}class GR{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const a=this.seq;for(let s=0,r=a.length;s!==r;++s){const o=a[s];o.setValue(t,n[o.id],i)}}}const kd=/(\w+)(\])?(\[|\.)?/g;function Av(e,t){e.seq.push(t),e.map[t.id]=t}function VR(e,t,n){const i=e.name,a=i.length;for(kd.lastIndex=0;;){const s=kd.exec(i),r=kd.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===a){Av(n,c===void 0?new FR(o,e,t):new HR(o,e,t));break}else{let h=n.map[o];h===void 0&&(h=new GR(o),Av(n,h)),n=h}}}class gu{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){const o=t.getActiveUniform(n,r),l=t.getUniformLocation(n,o.name);VR(o,l,this)}const a=[],s=[];for(const r of this.seq)r.type===t.SAMPLER_2D_SHADOW||r.type===t.SAMPLER_CUBE_SHADOW||r.type===t.SAMPLER_2D_ARRAY_SHADOW?a.push(r):s.push(r);a.length>0&&(this.seq=a.concat(s))}setValue(t,n,i,a){const s=this.map[n];s!==void 0&&s.setValue(t,i,a)}setOptional(t,n,i){const a=n[i];a!==void 0&&this.setValue(t,i,a)}static upload(t,n,i,a){for(let s=0,r=n.length;s!==r;++s){const o=n[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,a)}}static seqWithValue(t,n){const i=[];for(let a=0,s=t.length;a!==s;++a){const r=t[a];r.id in n&&i.push(r)}return i}}function Rv(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const kR=37297;let XR=0;function WR(e,t){const n=e.split(`
`),i=[],a=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let r=a;r<s;r++){const o=r+1;i.push(`${o===t?">":" "} ${o}: ${n[r]}`)}return i.join(`
`)}const Cv=new pe;function qR(e){Ue._getMatrix(Cv,Ue.workingColorSpace,e);const t=`mat3( ${Cv.elements.map(n=>n.toFixed(4))} )`;switch(Ue.getTransfer(e)){case Ku:return[t,"LinearTransferOETF"];case qe:return[t,"sRGBTransferOETF"];default:return le("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function wv(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const o=parseInt(r[1]);return n.toUpperCase()+`

`+s+`

`+WR(e.getShaderSource(t),o)}else return s}function YR(e,t){const n=qR(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const jR={[qy]:"Linear",[Yy]:"Reinhard",[jy]:"Cineon",[Zy]:"ACESFilmic",[Qy]:"AgX",[Jy]:"Neutral",[Ky]:"Custom"};function ZR(e,t){const n=jR[t];return n===void 0?(le("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const qc=new $;function KR(){Ue.getLuminanceCoefficients(qc);const e=qc.x.toFixed(4),t=qc.y.toFixed(4),n=qc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function QR(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(al).join(`
`)}function JR(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function $R(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let a=0;a<i;a++){const s=e.getActiveAttrib(t,a),r=s.name;let o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[r]={type:s.type,location:e.getAttribLocation(t,r),locationSize:o}}return n}function al(e){return e!==""}function Dv(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nv(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const t3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lp(e){return e.replace(t3,n3)}const e3=new Map;function n3(e,t){let n=xe[t];if(n===void 0){const i=e3.get(t);if(i!==void 0)n=xe[i],le('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">")}return Lp(n)}const i3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uv(e){return e.replace(i3,a3)}function a3(e,t,n,i){let a="";for(let s=parseInt(t);s<parseInt(n);s++)a+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return a}function Lv(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}const s3={[cu]:"SHADOWMAP_TYPE_PCF",[il]:"SHADOWMAP_TYPE_VSM"};function r3(e){return s3[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const o3={[ir]:"ENVMAP_TYPE_CUBE",[xo]:"ENVMAP_TYPE_CUBE",[Mf]:"ENVMAP_TYPE_CUBE_UV"};function l3(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":o3[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const c3={[xo]:"ENVMAP_MODE_REFRACTION"};function u3(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":c3[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const f3={[Wy]:"ENVMAP_BLENDING_MULTIPLY",[t1]:"ENVMAP_BLENDING_MIX",[e1]:"ENVMAP_BLENDING_ADD"};function d3(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":f3[e.combine]||"ENVMAP_BLENDING_NONE"}function h3(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function p3(e,t,n,i){const a=e.getContext(),s=n.defines;let r=n.vertexShader,o=n.fragmentShader;const l=r3(n),c=l3(n),d=u3(n),h=d3(n),u=h3(n),p=QR(n),g=JR(s),S=a.createProgram();let m,f,v=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(al).join(`
`),f.length>0&&(f+=`
`)):(m=[Lv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+d:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexNormals?"#define HAS_NORMAL":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(al).join(`
`),f=[Lv(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+c:"",n.envMap?"#define "+d:"",n.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+l:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==la?"#define TONE_MAPPING":"",n.toneMapping!==la?xe.tonemapping_pars_fragment:"",n.toneMapping!==la?ZR("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",xe.colorspace_pars_fragment,YR("linearToOutputTexel",n.outputColorSpace),KR(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(al).join(`
`)),r=Lp(r),r=Dv(r,n),r=Nv(r,n),o=Lp(o),o=Dv(o,n),o=Nv(o,n),r=Uv(r),o=Uv(o),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",n.glslVersion===B0?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===B0?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=v+m+r,y=v+f+o,U=Rv(a,a.VERTEX_SHADER,M),C=Rv(a,a.FRAGMENT_SHADER,y);a.attachShader(S,U),a.attachShader(S,C),n.index0AttributeName!==void 0?a.bindAttribLocation(S,0,n.index0AttributeName):n.hasPositionAttribute===!0&&a.bindAttribLocation(S,0,"position"),a.linkProgram(S);function T(O){if(e.debug.checkShaderErrors){const I=a.getProgramInfoLog(S)||"",z=a.getShaderInfoLog(U)||"",G=a.getShaderInfoLog(C)||"",k=I.trim(),B=z.trim(),F=G.trim();let P=!0,X=!0;if(a.getProgramParameter(S,a.LINK_STATUS)===!1)if(P=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(a,S,U,C);else{const pt=wv(a,U,"vertex"),Tt=wv(a,C,"fragment");ze("WebGLProgram: Shader Error "+a.getError()+" - VALIDATE_STATUS "+a.getProgramParameter(S,a.VALIDATE_STATUS)+`

Material Name: `+O.name+`
Material Type: `+O.type+`

Program Info Log: `+k+`
`+pt+`
`+Tt)}else k!==""?le("WebGLProgram: Program Info Log:",k):(B===""||F==="")&&(X=!1);X&&(O.diagnostics={runnable:P,programLog:k,vertexShader:{log:B,prefix:m},fragmentShader:{log:F,prefix:f}})}a.deleteShader(U),a.deleteShader(C),x=new gu(a,S),w=$R(a,S)}let x;this.getUniforms=function(){return x===void 0&&T(this),x};let w;this.getAttributes=function(){return w===void 0&&T(this),w};let D=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return D===!1&&(D=a.getProgramParameter(S,kR)),D},this.destroy=function(){i.releaseStatesOfProgram(this),a.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=XR++,this.cacheKey=t,this.usedTimes=1,this.program=S,this.vertexShader=U,this.fragmentShader=C,this}let m3=0;class g3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,n,i){const a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(i)===!1&&(a.add(i),i.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new v3(t),n.set(t,i)),i}}class v3{constructor(t){this.id=m3++,this.code=t,this.usedTimes=0}}function _3(e){return e===ar||e===Yu||e===ju}function x3(e,t,n,i,a,s){const r=new lS,o=new g3,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer;let u=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return l.add(x),x===0?"uv":`uv${x}`}function S(x,w,D,O,I,z){const G=O.fog,k=I.geometry,B=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?O.environment:null,F=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,P=t.get(x.envMap||B,F),X=P&&P.mapping===Mf?P.image.height:null,pt=p[x.type];x.precision!==null&&(u=i.getMaxPrecision(x.precision),u!==x.precision&&le("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const Tt=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,Lt=Tt!==void 0?Tt.length:0;let ae=0;k.morphAttributes.position!==void 0&&(ae=1),k.morphAttributes.normal!==void 0&&(ae=2),k.morphAttributes.color!==void 0&&(ae=3);let Jt,se,ht,tt;if(pt){const Vt=ea[pt];Jt=Vt.vertexShader,se=Vt.fragmentShader}else{Jt=x.vertexShader,se=x.fragmentShader;const Vt=o.getVertexShaderStage(x),Te=o.getFragmentShaderStage(x);o.update(x,Vt,Te),ht=Vt.id,tt=Te.id}const K=e.getRenderTarget(),Et=e.state.buffers.depth.getReversed(),Pt=I.isInstancedMesh===!0,Ht=I.isBatchedMesh===!0,be=!!x.map,$t=!!x.matcap,Ee=!!P,ve=!!x.aoMap,Zt=!!x.lightMap,ce=!!x.bumpMap&&x.wireframe===!1,te=!!x.normalMap,Ie=!!x.displacementMap,Ze=!!x.emissiveMap,re=!!x.metalnessMap,It=!!x.roughnessMap,H=x.anisotropy>0,he=x.clearcoat>0,oe=x.dispersion>0,b=x.iridescence>0,_=x.sheen>0,Y=x.transmission>0,Q=H&&!!x.anisotropyMap,st=he&&!!x.clearcoatMap,St=he&&!!x.clearcoatNormalMap,wt=he&&!!x.clearcoatRoughnessMap,ot=b&&!!x.iridescenceMap,Z=b&&!!x.iridescenceThicknessMap,ft=_&&!!x.sheenColorMap,vt=_&&!!x.sheenRoughnessMap,xt=!!x.specularMap,Mt=!!x.specularColorMap,Gt=!!x.specularIntensityMap,Wt=Y&&!!x.transmissionMap,ne=Y&&!!x.thicknessMap,V=!!x.gradientMap,At=!!x.alphaMap,ut=x.alphaTest>0,lt=!!x.alphaHash,Ot=!!x.extensions;let _t=la;x.toneMapped&&(K===null||K.isXRRenderTarget===!0)&&(_t=e.toneMapping);const qt={shaderID:pt,shaderType:x.type,shaderName:x.name,vertexShader:Jt,fragmentShader:se,defines:x.defines,customVertexShaderID:ht,customFragmentShaderID:tt,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:Ht,batchingColor:Ht&&I._colorsTexture!==null,instancing:Pt,instancingColor:Pt&&I.instanceColor!==null,instancingMorph:Pt&&I.morphTexture!==null,outputColorSpace:K===null?e.outputColorSpace:K.isXRRenderTarget===!0?K.texture.colorSpace:Ue.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:be,matcap:$t,envMap:Ee,envMapMode:Ee&&P.mapping,envMapCubeUVHeight:X,aoMap:ve,lightMap:Zt,bumpMap:ce,normalMap:te,displacementMap:Ie,emissiveMap:Ze,normalMapObjectSpace:te&&x.normalMapType===a1,normalMapTangentSpace:te&&x.normalMapType===P0,packedNormalMap:te&&x.normalMapType===P0&&_3(x.normalMap.format),metalnessMap:re,roughnessMap:It,anisotropy:H,anisotropyMap:Q,clearcoat:he,clearcoatMap:st,clearcoatNormalMap:St,clearcoatRoughnessMap:wt,dispersion:oe,iridescence:b,iridescenceMap:ot,iridescenceThicknessMap:Z,sheen:_,sheenColorMap:ft,sheenRoughnessMap:vt,specularMap:xt,specularColorMap:Mt,specularIntensityMap:Gt,transmission:Y,transmissionMap:Wt,thicknessMap:ne,gradientMap:V,opaque:x.transparent===!1&&x.blending===Qs&&x.alphaToCoverage===!1,alphaMap:At,alphaTest:ut,alphaHash:lt,combine:x.combine,mapUv:be&&g(x.map.channel),aoMapUv:ve&&g(x.aoMap.channel),lightMapUv:Zt&&g(x.lightMap.channel),bumpMapUv:ce&&g(x.bumpMap.channel),normalMapUv:te&&g(x.normalMap.channel),displacementMapUv:Ie&&g(x.displacementMap.channel),emissiveMapUv:Ze&&g(x.emissiveMap.channel),metalnessMapUv:re&&g(x.metalnessMap.channel),roughnessMapUv:It&&g(x.roughnessMap.channel),anisotropyMapUv:Q&&g(x.anisotropyMap.channel),clearcoatMapUv:st&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:St&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:wt&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ot&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:ft&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(x.sheenRoughnessMap.channel),specularMapUv:xt&&g(x.specularMap.channel),specularColorMapUv:Mt&&g(x.specularColorMap.channel),specularIntensityMapUv:Gt&&g(x.specularIntensityMap.channel),transmissionMapUv:Wt&&g(x.transmissionMap.channel),thicknessMapUv:ne&&g(x.thicknessMap.channel),alphaMapUv:At&&g(x.alphaMap.channel),vertexTangents:!!k.attributes.tangent&&(te||H),vertexNormals:!!k.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,pointsUvs:I.isPoints===!0&&!!k.attributes.uv&&(be||At),fog:!!G,useFog:x.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||k.attributes.normal===void 0&&te===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Et,skinning:I.isSkinnedMesh===!0,hasPositionAttribute:k.attributes.position!==void 0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:Lt,morphTextureStride:ae,numDirLights:w.directional.length,numPointLights:w.point.length,numSpotLights:w.spot.length,numSpotLightMaps:w.spotLightMap.length,numRectAreaLights:w.rectArea.length,numHemiLights:w.hemi.length,numDirLightShadows:w.directionalShadowMap.length,numPointLightShadows:w.pointShadowMap.length,numSpotLightShadows:w.spotShadowMap.length,numSpotLightShadowsWithMaps:w.numSpotLightShadowsWithMaps,numLightProbes:w.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&D.length>0,shadowMapType:e.shadowMap.type,toneMapping:_t,decodeVideoTexture:be&&x.map.isVideoTexture===!0&&Ue.getTransfer(x.map.colorSpace)===qe,decodeVideoTextureEmissive:Ze&&x.emissiveMap.isVideoTexture===!0&&Ue.getTransfer(x.emissiveMap.colorSpace)===qe,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Ca,flipSided:x.side===si,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:Ot&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ot&&x.extensions.multiDraw===!0||Ht)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return qt.vertexUv1s=l.has(1),qt.vertexUv2s=l.has(2),qt.vertexUv3s=l.has(3),l.clear(),qt}function m(x){const w=[];if(x.shaderID?w.push(x.shaderID):(w.push(x.customVertexShaderID),w.push(x.customFragmentShaderID)),x.defines!==void 0)for(const D in x.defines)w.push(D),w.push(x.defines[D]);return x.isRawShaderMaterial===!1&&(f(w,x),v(w,x),w.push(e.outputColorSpace)),w.push(x.customProgramCacheKey),w.join()}function f(x,w){x.push(w.precision),x.push(w.outputColorSpace),x.push(w.envMapMode),x.push(w.envMapCubeUVHeight),x.push(w.mapUv),x.push(w.alphaMapUv),x.push(w.lightMapUv),x.push(w.aoMapUv),x.push(w.bumpMapUv),x.push(w.normalMapUv),x.push(w.displacementMapUv),x.push(w.emissiveMapUv),x.push(w.metalnessMapUv),x.push(w.roughnessMapUv),x.push(w.anisotropyMapUv),x.push(w.clearcoatMapUv),x.push(w.clearcoatNormalMapUv),x.push(w.clearcoatRoughnessMapUv),x.push(w.iridescenceMapUv),x.push(w.iridescenceThicknessMapUv),x.push(w.sheenColorMapUv),x.push(w.sheenRoughnessMapUv),x.push(w.specularMapUv),x.push(w.specularColorMapUv),x.push(w.specularIntensityMapUv),x.push(w.transmissionMapUv),x.push(w.thicknessMapUv),x.push(w.combine),x.push(w.fogExp2),x.push(w.sizeAttenuation),x.push(w.morphTargetsCount),x.push(w.morphAttributeCount),x.push(w.numDirLights),x.push(w.numPointLights),x.push(w.numSpotLights),x.push(w.numSpotLightMaps),x.push(w.numHemiLights),x.push(w.numRectAreaLights),x.push(w.numDirLightShadows),x.push(w.numPointLightShadows),x.push(w.numSpotLightShadows),x.push(w.numSpotLightShadowsWithMaps),x.push(w.numLightProbes),x.push(w.shadowMapType),x.push(w.toneMapping),x.push(w.numClippingPlanes),x.push(w.numClipIntersection),x.push(w.depthPacking)}function v(x,w){r.disableAll(),w.instancing&&r.enable(0),w.instancingColor&&r.enable(1),w.instancingMorph&&r.enable(2),w.matcap&&r.enable(3),w.envMap&&r.enable(4),w.normalMapObjectSpace&&r.enable(5),w.normalMapTangentSpace&&r.enable(6),w.clearcoat&&r.enable(7),w.iridescence&&r.enable(8),w.alphaTest&&r.enable(9),w.vertexColors&&r.enable(10),w.vertexAlphas&&r.enable(11),w.vertexUv1s&&r.enable(12),w.vertexUv2s&&r.enable(13),w.vertexUv3s&&r.enable(14),w.vertexTangents&&r.enable(15),w.anisotropy&&r.enable(16),w.alphaHash&&r.enable(17),w.batching&&r.enable(18),w.dispersion&&r.enable(19),w.batchingColor&&r.enable(20),w.gradientMap&&r.enable(21),w.packedNormalMap&&r.enable(22),w.vertexNormals&&r.enable(23),x.push(r.mask),r.disableAll(),w.fog&&r.enable(0),w.useFog&&r.enable(1),w.flatShading&&r.enable(2),w.logarithmicDepthBuffer&&r.enable(3),w.reversedDepthBuffer&&r.enable(4),w.skinning&&r.enable(5),w.morphTargets&&r.enable(6),w.morphNormals&&r.enable(7),w.morphColors&&r.enable(8),w.premultipliedAlpha&&r.enable(9),w.shadowMapEnabled&&r.enable(10),w.doubleSided&&r.enable(11),w.flipSided&&r.enable(12),w.useDepthPacking&&r.enable(13),w.dithering&&r.enable(14),w.transmission&&r.enable(15),w.sheen&&r.enable(16),w.opaque&&r.enable(17),w.pointsUvs&&r.enable(18),w.decodeVideoTexture&&r.enable(19),w.decodeVideoTextureEmissive&&r.enable(20),w.alphaToCoverage&&r.enable(21),w.numLightProbeGrids>0&&r.enable(22),w.hasPositionAttribute&&r.enable(23),x.push(r.mask)}function M(x){const w=p[x.type];let D;if(w){const O=ea[w];D=k1.clone(O.uniforms)}else D=x.uniforms;return D}function y(x,w){let D=d.get(w);return D!==void 0?++D.usedTimes:(D=new p3(e,w,x,a),c.push(D),d.set(w,D)),D}function U(x){if(--x.usedTimes===0){const w=c.indexOf(x);c[w]=c[c.length-1],c.pop(),d.delete(x.cacheKey),x.destroy()}}function C(x){o.remove(x)}function T(){o.dispose()}return{getParameters:S,getProgramCacheKey:m,getUniforms:M,acquireProgram:y,releaseProgram:U,releaseShaderCache:C,programs:c,dispose:T}}function y3(){let e=new WeakMap;function t(r){return e.has(r)}function n(r){let o=e.get(r);return o===void 0&&(o={},e.set(r,o)),o}function i(r){e.delete(r)}function a(r,o,l){e.get(r)[o]=l}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:a,dispose:s}}function S3(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function Ov(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Pv(){const e=[];let t=0;const n=[],i=[],a=[];function s(){t=0,n.length=0,i.length=0,a.length=0}function r(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,S,m,f){let v=e[t];return v===void 0?(v={id:u.id,object:u,geometry:p,material:g,materialVariant:r(u),groupOrder:S,renderOrder:u.renderOrder,z:m,group:f},e[t]=v):(v.id=u.id,v.object=u,v.geometry=p,v.material=g,v.materialVariant=r(u),v.groupOrder=S,v.renderOrder=u.renderOrder,v.z=m,v.group=f),t++,v}function l(u,p,g,S,m,f){const v=o(u,p,g,S,m,f);g.transmission>0?i.push(v):g.transparent===!0?a.push(v):n.push(v)}function c(u,p,g,S,m,f){const v=o(u,p,g,S,m,f);g.transmission>0?i.unshift(v):g.transparent===!0?a.unshift(v):n.unshift(v)}function d(u,p,g){n.length>1&&n.sort(u||S3),i.length>1&&i.sort(p||Ov),a.length>1&&a.sort(p||Ov),g&&(n.reverse(),i.reverse(),a.reverse())}function h(){for(let u=t,p=e.length;u<p;u++){const g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:a,init:s,push:l,unshift:c,finish:h,sort:d}}function M3(){let e=new WeakMap;function t(i,a){const s=e.get(i);let r;return s===void 0?(r=new Pv,e.set(i,[r])):a>=s.length?(r=new Pv,s.push(r)):r=s[a],r}function n(){e=new WeakMap}return{get:t,dispose:n}}function b3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new $,color:new we};break;case"SpotLight":n={position:new $,direction:new $,color:new we,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new $,color:new we,distance:0,decay:0};break;case"HemisphereLight":n={direction:new $,skyColor:new we,groundColor:new we};break;case"RectAreaLight":n={color:new we,position:new $,halfWidth:new $,halfHeight:new $};break}return e[t.id]=n,n}}}function E3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ve,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let T3=0;function A3(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function R3(e){const t=new b3,n=E3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new $);const a=new $,s=new nn,r=new nn;function o(c){let d=0,h=0,u=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let p=0,g=0,S=0,m=0,f=0,v=0,M=0,y=0,U=0,C=0,T=0;c.sort(A3);for(let w=0,D=c.length;w<D;w++){const O=c[w],I=O.color,z=O.intensity,G=O.distance;let k=null;if(O.shadow&&O.shadow.map&&(O.shadow.map.texture.format===ar?k=O.shadow.map.texture:k=O.shadow.map.depthTexture||O.shadow.map.texture),O.isAmbientLight)d+=I.r*z,h+=I.g*z,u+=I.b*z;else if(O.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(O.sh.coefficients[B],z);T++}else if(O.isDirectionalLight){const B=t.get(O);if(B.color.copy(O.color).multiplyScalar(O.intensity),O.castShadow){const F=O.shadow,P=n.get(O);P.shadowIntensity=F.intensity,P.shadowBias=F.bias,P.shadowNormalBias=F.normalBias,P.shadowRadius=F.radius,P.shadowMapSize=F.mapSize,i.directionalShadow[p]=P,i.directionalShadowMap[p]=k,i.directionalShadowMatrix[p]=O.shadow.matrix,v++}i.directional[p]=B,p++}else if(O.isSpotLight){const B=t.get(O);B.position.setFromMatrixPosition(O.matrixWorld),B.color.copy(I).multiplyScalar(z),B.distance=G,B.coneCos=Math.cos(O.angle),B.penumbraCos=Math.cos(O.angle*(1-O.penumbra)),B.decay=O.decay,i.spot[S]=B;const F=O.shadow;if(O.map&&(i.spotLightMap[U]=O.map,U++,F.updateMatrices(O),O.castShadow&&C++),i.spotLightMatrix[S]=F.matrix,O.castShadow){const P=n.get(O);P.shadowIntensity=F.intensity,P.shadowBias=F.bias,P.shadowNormalBias=F.normalBias,P.shadowRadius=F.radius,P.shadowMapSize=F.mapSize,i.spotShadow[S]=P,i.spotShadowMap[S]=k,y++}S++}else if(O.isRectAreaLight){const B=t.get(O);B.color.copy(I).multiplyScalar(z),B.halfWidth.set(O.width*.5,0,0),B.halfHeight.set(0,O.height*.5,0),i.rectArea[m]=B,m++}else if(O.isPointLight){const B=t.get(O);if(B.color.copy(O.color).multiplyScalar(O.intensity),B.distance=O.distance,B.decay=O.decay,O.castShadow){const F=O.shadow,P=n.get(O);P.shadowIntensity=F.intensity,P.shadowBias=F.bias,P.shadowNormalBias=F.normalBias,P.shadowRadius=F.radius,P.shadowMapSize=F.mapSize,P.shadowCameraNear=F.camera.near,P.shadowCameraFar=F.camera.far,i.pointShadow[g]=P,i.pointShadowMap[g]=k,i.pointShadowMatrix[g]=O.shadow.matrix,M++}i.point[g]=B,g++}else if(O.isHemisphereLight){const B=t.get(O);B.skyColor.copy(O.color).multiplyScalar(z),B.groundColor.copy(O.groundColor).multiplyScalar(z),i.hemi[f]=B,f++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ft.LTC_FLOAT_1,i.rectAreaLTC2=Ft.LTC_FLOAT_2):(i.rectAreaLTC1=Ft.LTC_HALF_1,i.rectAreaLTC2=Ft.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;const x=i.hash;(x.directionalLength!==p||x.pointLength!==g||x.spotLength!==S||x.rectAreaLength!==m||x.hemiLength!==f||x.numDirectionalShadows!==v||x.numPointShadows!==M||x.numSpotShadows!==y||x.numSpotMaps!==U||x.numLightProbes!==T)&&(i.directional.length=p,i.spot.length=S,i.rectArea.length=m,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=v,i.directionalShadowMap.length=v,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=v,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=y+U-C,i.spotLightMap.length=U,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=T,x.directionalLength=p,x.pointLength=g,x.spotLength=S,x.rectAreaLength=m,x.hemiLength=f,x.numDirectionalShadows=v,x.numPointShadows=M,x.numSpotShadows=y,x.numSpotMaps=U,x.numLightProbes=T,i.version=T3++)}function l(c,d){let h=0,u=0,p=0,g=0,S=0;const m=d.matrixWorldInverse;for(let f=0,v=c.length;f<v;f++){const M=c[f];if(M.isDirectionalLight){const y=i.directional[h];y.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),h++}else if(M.isSpotLight){const y=i.spot[p];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(M.matrixWorld),a.setFromMatrixPosition(M.target.matrixWorld),y.direction.sub(a),y.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),r.identity(),s.copy(M.matrixWorld),s.premultiply(m),r.extractRotation(s),y.halfWidth.set(M.width*.5,0,0),y.halfHeight.set(0,M.height*.5,0),y.halfWidth.applyMatrix4(r),y.halfHeight.applyMatrix4(r),g++}else if(M.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(M.matrixWorld),y.position.applyMatrix4(m),u++}else if(M.isHemisphereLight){const y=i.hemi[S];y.direction.setFromMatrixPosition(M.matrixWorld),y.direction.transformDirection(m),S++}}}return{setup:o,setupView:l,state:i}}function zv(e){const t=new R3(e),n=[],i=[],a=[];function s(u){h.camera=u,n.length=0,i.length=0,a.length=0}function r(u){n.push(u)}function o(u){i.push(u)}function l(u){a.push(u)}function c(){t.setup(n)}function d(u){t.setupView(n,u)}const h={lightsArray:n,shadowsArray:i,lightProbeGridArray:a,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:h,setupLights:c,setupLightsView:d,pushLight:r,pushShadow:o,pushLightProbeGrid:l}}function C3(e){let t=new WeakMap;function n(a,s=0){const r=t.get(a);let o;return r===void 0?(o=new zv(e),t.set(a,[o])):s>=r.length?(o=new zv(e),r.push(o)):o=r[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const w3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,D3=`uniform sampler2D shadow_pass;
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
}`,N3=[new $(1,0,0),new $(-1,0,0),new $(0,1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1)],U3=[new $(0,-1,0),new $(0,-1,0),new $(0,0,1),new $(0,0,-1),new $(0,-1,0),new $(0,-1,0)],Iv=new nn,Ko=new $,Xd=new $;function L3(e,t,n){let i=new mS;const a=new Ve,s=new Ve,r=new fn,o=new Y1,l=new j1,c={},d=n.maxTextureSize,h={[Rs]:si,[si]:Rs,[Ca]:Ca},u=new Bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ve},radius:{value:4}},vertexShader:w3,fragmentShader:D3}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new Xn;g.setAttribute("position",new We(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new Hi(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=cu;let f=this.type;this.render=function(C,T,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||C.length===0)return;this.type===PE&&(le("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=cu);const w=e.getRenderTarget(),D=e.getActiveCubeFace(),O=e.getActiveMipmapLevel(),I=e.state;I.setBlending(za),I.buffers.depth.getReversed()===!0?I.buffers.color.setClear(0,0,0,0):I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const z=f!==this.type;z&&T.traverse(function(G){G.material&&(Array.isArray(G.material)?G.material.forEach(k=>k.needsUpdate=!0):G.material.needsUpdate=!0)});for(let G=0,k=C.length;G<k;G++){const B=C[G],F=B.shadow;if(F===void 0){le("WebGLShadowMap:",B,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;a.copy(F.mapSize);const P=F.getFrameExtents();a.multiply(P),s.copy(F.mapSize),(a.x>d||a.y>d)&&(a.x>d&&(s.x=Math.floor(d/P.x),a.x=s.x*P.x,F.mapSize.x=s.x),a.y>d&&(s.y=Math.floor(d/P.y),a.y=s.y*P.y,F.mapSize.y=s.y));const X=e.state.buffers.depth.getReversed();if(F.camera._reversedDepth=X,F.map===null||z===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===il){if(B.isPointLight){le("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new ca(a.x,a.y,{format:ar,type:ka,minFilter:kn,magFilter:kn,generateMipmaps:!1}),F.map.texture.name=B.name+".shadowMap",F.map.depthTexture=new yo(a.x,a.y,ji),F.map.depthTexture.name=B.name+".shadowMapDepth",F.map.depthTexture.format=Xa,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=In,F.map.depthTexture.magFilter=In}else B.isPointLight?(F.map=new bS(a.x),F.map.depthTexture=new H1(a.x,ua)):(F.map=new ca(a.x,a.y),F.map.depthTexture=new yo(a.x,a.y,ua)),F.map.depthTexture.name=B.name+".shadowMap",F.map.depthTexture.format=Xa,this.type===cu?(F.map.depthTexture.compareFunction=X?qm:Wm,F.map.depthTexture.minFilter=kn,F.map.depthTexture.magFilter=kn):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=In,F.map.depthTexture.magFilter=In);F.camera.updateProjectionMatrix()}const pt=F.map.isWebGLCubeRenderTarget?6:1;for(let Tt=0;Tt<pt;Tt++){if(F.map.isWebGLCubeRenderTarget)e.setRenderTarget(F.map,Tt),e.clear();else{Tt===0&&(e.setRenderTarget(F.map),e.clear());const Lt=F.getViewport(Tt);r.set(s.x*Lt.x,s.y*Lt.y,s.x*Lt.z,s.y*Lt.w),I.viewport(r)}if(B.isPointLight){const Lt=F.camera,ae=F.matrix,Jt=B.distance||Lt.far;Jt!==Lt.far&&(Lt.far=Jt,Lt.updateProjectionMatrix()),Ko.setFromMatrixPosition(B.matrixWorld),Lt.position.copy(Ko),Xd.copy(Lt.position),Xd.add(N3[Tt]),Lt.up.copy(U3[Tt]),Lt.lookAt(Xd),Lt.updateMatrixWorld(),ae.makeTranslation(-Ko.x,-Ko.y,-Ko.z),Iv.multiplyMatrices(Lt.projectionMatrix,Lt.matrixWorldInverse),F._frustum.setFromProjectionMatrix(Iv,Lt.coordinateSystem,Lt.reversedDepth)}else F.updateMatrices(B);i=F.getFrustum(),y(T,x,F.camera,B,this.type)}F.isPointLightShadow!==!0&&this.type===il&&v(F,x),F.needsUpdate=!1}f=this.type,m.needsUpdate=!1,e.setRenderTarget(w,D,O)};function v(C,T){const x=t.update(S);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,p.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new ca(a.x,a.y,{format:ar,type:ka})),u.uniforms.shadow_pass.value=C.map.depthTexture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(T,null,x,u,S,null),p.uniforms.shadow_pass.value=C.mapPass.texture,p.uniforms.resolution.value=C.mapSize,p.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(T,null,x,p,S,null)}function M(C,T,x,w){let D=null;const O=x.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(O!==void 0)D=O;else if(D=x.isPointLight===!0?l:o,e.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0||T.alphaToCoverage===!0){const I=D.uuid,z=T.uuid;let G=c[I];G===void 0&&(G={},c[I]=G);let k=G[z];k===void 0&&(k=D.clone(),G[z]=k,T.addEventListener("dispose",U)),D=k}if(D.visible=T.visible,D.wireframe=T.wireframe,w===il?D.side=T.shadowSide!==null?T.shadowSide:T.side:D.side=T.shadowSide!==null?T.shadowSide:h[T.side],D.alphaMap=T.alphaMap,D.alphaTest=T.alphaToCoverage===!0?.5:T.alphaTest,D.map=T.map,D.clipShadows=T.clipShadows,D.clippingPlanes=T.clippingPlanes,D.clipIntersection=T.clipIntersection,D.displacementMap=T.displacementMap,D.displacementScale=T.displacementScale,D.displacementBias=T.displacementBias,D.wireframeLinewidth=T.wireframeLinewidth,D.linewidth=T.linewidth,x.isPointLight===!0&&D.isMeshDistanceMaterial===!0){const I=e.properties.get(D);I.light=x}return D}function y(C,T,x,w,D){if(C.visible===!1)return;if(C.layers.test(T.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&D===il)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,C.matrixWorld);const z=t.update(C),G=C.material;if(Array.isArray(G)){const k=z.groups;for(let B=0,F=k.length;B<F;B++){const P=k[B],X=G[P.materialIndex];if(X&&X.visible){const pt=M(C,X,w,D);C.onBeforeShadow(e,C,T,x,z,pt,P),e.renderBufferDirect(x,null,z,pt,C,P),C.onAfterShadow(e,C,T,x,z,pt,P)}}}else if(G.visible){const k=M(C,G,w,D);C.onBeforeShadow(e,C,T,x,z,k,null),e.renderBufferDirect(x,null,z,k,C,null),C.onAfterShadow(e,C,T,x,z,k,null)}}const I=C.children;for(let z=0,G=I.length;z<G;z++)y(I[z],T,x,w,D)}function U(C){C.target.removeEventListener("dispose",U);for(const x in c){const w=c[x],D=C.target.uuid;D in w&&(w[D].dispose(),delete w[D])}}}function O3(e,t){function n(){let V=!1;const At=new fn;let ut=null;const lt=new fn(0,0,0,0);return{setMask:function(Ot){ut!==Ot&&!V&&(e.colorMask(Ot,Ot,Ot,Ot),ut=Ot)},setLocked:function(Ot){V=Ot},setClear:function(Ot,_t,qt,Vt,Te){Te===!0&&(Ot*=Vt,_t*=Vt,qt*=Vt),At.set(Ot,_t,qt,Vt),lt.equals(At)===!1&&(e.clearColor(Ot,_t,qt,Vt),lt.copy(At))},reset:function(){V=!1,ut=null,lt.set(-1,0,0,0)}}}function i(){let V=!1,At=!1,ut=null,lt=null,Ot=null;return{setReversed:function(_t){if(At!==_t){const qt=t.get("EXT_clip_control");_t?qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.ZERO_TO_ONE_EXT):qt.clipControlEXT(qt.LOWER_LEFT_EXT,qt.NEGATIVE_ONE_TO_ONE_EXT),At=_t;const Vt=Ot;Ot=null,this.setClear(Vt)}},getReversed:function(){return At},setTest:function(_t){_t?K(e.DEPTH_TEST):Et(e.DEPTH_TEST)},setMask:function(_t){ut!==_t&&!V&&(e.depthMask(_t),ut=_t)},setFunc:function(_t){if(At&&(_t=p1[_t]),lt!==_t){switch(_t){case Xh:e.depthFunc(e.NEVER);break;case Wh:e.depthFunc(e.ALWAYS);break;case qh:e.depthFunc(e.LESS);break;case _o:e.depthFunc(e.LEQUAL);break;case Yh:e.depthFunc(e.EQUAL);break;case jh:e.depthFunc(e.GEQUAL);break;case Zh:e.depthFunc(e.GREATER);break;case Kh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}lt=_t}},setLocked:function(_t){V=_t},setClear:function(_t){Ot!==_t&&(Ot=_t,At&&(_t=1-_t),e.clearDepth(_t))},reset:function(){V=!1,ut=null,lt=null,Ot=null,At=!1}}}function a(){let V=!1,At=null,ut=null,lt=null,Ot=null,_t=null,qt=null,Vt=null,Te=null;return{setTest:function(Be){V||(Be?K(e.STENCIL_TEST):Et(e.STENCIL_TEST))},setMask:function(Be){At!==Be&&!V&&(e.stencilMask(Be),At=Be)},setFunc:function(Be,Dn,Nn){(ut!==Be||lt!==Dn||Ot!==Nn)&&(e.stencilFunc(Be,Dn,Nn),ut=Be,lt=Dn,Ot=Nn)},setOp:function(Be,Dn,Nn){(_t!==Be||qt!==Dn||Vt!==Nn)&&(e.stencilOp(Be,Dn,Nn),_t=Be,qt=Dn,Vt=Nn)},setLocked:function(Be){V=Be},setClear:function(Be){Te!==Be&&(e.clearStencil(Be),Te=Be)},reset:function(){V=!1,At=null,ut=null,lt=null,Ot=null,_t=null,qt=null,Vt=null,Te=null}}}const s=new n,r=new i,o=new a,l=new WeakMap,c=new WeakMap;let d={},h={},u={},p=new WeakMap,g=[],S=null,m=!1,f=null,v=null,M=null,y=null,U=null,C=null,T=null,x=new we(0,0,0),w=0,D=!1,O=null,I=null,z=null,G=null,k=null;const B=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,P=0;const X=e.getParameter(e.VERSION);X.indexOf("WebGL")!==-1?(P=parseFloat(/^WebGL (\d)/.exec(X)[1]),F=P>=1):X.indexOf("OpenGL ES")!==-1&&(P=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),F=P>=2);let pt=null,Tt={};const Lt=e.getParameter(e.SCISSOR_BOX),ae=e.getParameter(e.VIEWPORT),Jt=new fn().fromArray(Lt),se=new fn().fromArray(ae);function ht(V,At,ut,lt){const Ot=new Uint8Array(4),_t=e.createTexture();e.bindTexture(V,_t),e.texParameteri(V,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(V,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let qt=0;qt<ut;qt++)V===e.TEXTURE_3D||V===e.TEXTURE_2D_ARRAY?e.texImage3D(At,0,e.RGBA,1,1,lt,0,e.RGBA,e.UNSIGNED_BYTE,Ot):e.texImage2D(At+qt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,Ot);return _t}const tt={};tt[e.TEXTURE_2D]=ht(e.TEXTURE_2D,e.TEXTURE_2D,1),tt[e.TEXTURE_CUBE_MAP]=ht(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),tt[e.TEXTURE_2D_ARRAY]=ht(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),tt[e.TEXTURE_3D]=ht(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),o.setClear(0),K(e.DEPTH_TEST),r.setFunc(_o),ce(!1),te(U0),K(e.CULL_FACE),ve(za);function K(V){d[V]!==!0&&(e.enable(V),d[V]=!0)}function Et(V){d[V]!==!1&&(e.disable(V),d[V]=!1)}function Pt(V,At){return u[V]!==At?(e.bindFramebuffer(V,At),u[V]=At,V===e.DRAW_FRAMEBUFFER&&(u[e.FRAMEBUFFER]=At),V===e.FRAMEBUFFER&&(u[e.DRAW_FRAMEBUFFER]=At),!0):!1}function Ht(V,At){let ut=g,lt=!1;if(V){ut=p.get(At),ut===void 0&&(ut=[],p.set(At,ut));const Ot=V.textures;if(ut.length!==Ot.length||ut[0]!==e.COLOR_ATTACHMENT0){for(let _t=0,qt=Ot.length;_t<qt;_t++)ut[_t]=e.COLOR_ATTACHMENT0+_t;ut.length=Ot.length,lt=!0}}else ut[0]!==e.BACK&&(ut[0]=e.BACK,lt=!0);lt&&e.drawBuffers(ut)}function be(V){return S!==V?(e.useProgram(V),S=V,!0):!1}const $t={[Vs]:e.FUNC_ADD,[IE]:e.FUNC_SUBTRACT,[BE]:e.FUNC_REVERSE_SUBTRACT};$t[FE]=e.MIN,$t[HE]=e.MAX;const Ee={[GE]:e.ZERO,[VE]:e.ONE,[kE]:e.SRC_COLOR,[Vh]:e.SRC_ALPHA,[ZE]:e.SRC_ALPHA_SATURATE,[YE]:e.DST_COLOR,[WE]:e.DST_ALPHA,[XE]:e.ONE_MINUS_SRC_COLOR,[kh]:e.ONE_MINUS_SRC_ALPHA,[jE]:e.ONE_MINUS_DST_COLOR,[qE]:e.ONE_MINUS_DST_ALPHA,[KE]:e.CONSTANT_COLOR,[QE]:e.ONE_MINUS_CONSTANT_COLOR,[JE]:e.CONSTANT_ALPHA,[$E]:e.ONE_MINUS_CONSTANT_ALPHA};function ve(V,At,ut,lt,Ot,_t,qt,Vt,Te,Be){if(V===za){m===!0&&(Et(e.BLEND),m=!1);return}if(m===!1&&(K(e.BLEND),m=!0),V!==zE){if(V!==f||Be!==D){if((v!==Vs||U!==Vs)&&(e.blendEquation(e.FUNC_ADD),v=Vs,U=Vs),Be)switch(V){case Qs:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case jr:e.blendFunc(e.ONE,e.ONE);break;case L0:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case O0:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:ze("WebGLState: Invalid blending: ",V);break}else switch(V){case Qs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case jr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case L0:ze("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case O0:ze("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ze("WebGLState: Invalid blending: ",V);break}M=null,y=null,C=null,T=null,x.set(0,0,0),w=0,f=V,D=Be}return}Ot=Ot||At,_t=_t||ut,qt=qt||lt,(At!==v||Ot!==U)&&(e.blendEquationSeparate($t[At],$t[Ot]),v=At,U=Ot),(ut!==M||lt!==y||_t!==C||qt!==T)&&(e.blendFuncSeparate(Ee[ut],Ee[lt],Ee[_t],Ee[qt]),M=ut,y=lt,C=_t,T=qt),(Vt.equals(x)===!1||Te!==w)&&(e.blendColor(Vt.r,Vt.g,Vt.b,Te),x.copy(Vt),w=Te),f=V,D=!1}function Zt(V,At){V.side===Ca?Et(e.CULL_FACE):K(e.CULL_FACE);let ut=V.side===si;At&&(ut=!ut),ce(ut),V.blending===Qs&&V.transparent===!1?ve(za):ve(V.blending,V.blendEquation,V.blendSrc,V.blendDst,V.blendEquationAlpha,V.blendSrcAlpha,V.blendDstAlpha,V.blendColor,V.blendAlpha,V.premultipliedAlpha),r.setFunc(V.depthFunc),r.setTest(V.depthTest),r.setMask(V.depthWrite),s.setMask(V.colorWrite);const lt=V.stencilWrite;o.setTest(lt),lt&&(o.setMask(V.stencilWriteMask),o.setFunc(V.stencilFunc,V.stencilRef,V.stencilFuncMask),o.setOp(V.stencilFail,V.stencilZFail,V.stencilZPass)),Ze(V.polygonOffset,V.polygonOffsetFactor,V.polygonOffsetUnits),V.alphaToCoverage===!0?K(e.SAMPLE_ALPHA_TO_COVERAGE):Et(e.SAMPLE_ALPHA_TO_COVERAGE)}function ce(V){O!==V&&(V?e.frontFace(e.CW):e.frontFace(e.CCW),O=V)}function te(V){V!==LE?(K(e.CULL_FACE),V!==I&&(V===U0?e.cullFace(e.BACK):V===OE?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):Et(e.CULL_FACE),I=V}function Ie(V){V!==z&&(F&&e.lineWidth(V),z=V)}function Ze(V,At,ut){V?(K(e.POLYGON_OFFSET_FILL),(G!==At||k!==ut)&&(G=At,k=ut,r.getReversed()&&(At=-At),e.polygonOffset(At,ut))):Et(e.POLYGON_OFFSET_FILL)}function re(V){V?K(e.SCISSOR_TEST):Et(e.SCISSOR_TEST)}function It(V){V===void 0&&(V=e.TEXTURE0+B-1),pt!==V&&(e.activeTexture(V),pt=V)}function H(V,At,ut){ut===void 0&&(pt===null?ut=e.TEXTURE0+B-1:ut=pt);let lt=Tt[ut];lt===void 0&&(lt={type:void 0,texture:void 0},Tt[ut]=lt),(lt.type!==V||lt.texture!==At)&&(pt!==ut&&(e.activeTexture(ut),pt=ut),e.bindTexture(V,At||tt[V]),lt.type=V,lt.texture=At)}function he(){const V=Tt[pt];V!==void 0&&V.type!==void 0&&(e.bindTexture(V.type,null),V.type=void 0,V.texture=void 0)}function oe(){try{e.compressedTexImage2D(...arguments)}catch(V){ze("WebGLState:",V)}}function b(){try{e.compressedTexImage3D(...arguments)}catch(V){ze("WebGLState:",V)}}function _(){try{e.texSubImage2D(...arguments)}catch(V){ze("WebGLState:",V)}}function Y(){try{e.texSubImage3D(...arguments)}catch(V){ze("WebGLState:",V)}}function Q(){try{e.compressedTexSubImage2D(...arguments)}catch(V){ze("WebGLState:",V)}}function st(){try{e.compressedTexSubImage3D(...arguments)}catch(V){ze("WebGLState:",V)}}function St(){try{e.texStorage2D(...arguments)}catch(V){ze("WebGLState:",V)}}function wt(){try{e.texStorage3D(...arguments)}catch(V){ze("WebGLState:",V)}}function ot(){try{e.texImage2D(...arguments)}catch(V){ze("WebGLState:",V)}}function Z(){try{e.texImage3D(...arguments)}catch(V){ze("WebGLState:",V)}}function ft(V){return h[V]!==void 0?h[V]:e.getParameter(V)}function vt(V,At){h[V]!==At&&(e.pixelStorei(V,At),h[V]=At)}function xt(V){Jt.equals(V)===!1&&(e.scissor(V.x,V.y,V.z,V.w),Jt.copy(V))}function Mt(V){se.equals(V)===!1&&(e.viewport(V.x,V.y,V.z,V.w),se.copy(V))}function Gt(V,At){let ut=c.get(At);ut===void 0&&(ut=new WeakMap,c.set(At,ut));let lt=ut.get(V);lt===void 0&&(lt=e.getUniformBlockIndex(At,V.name),ut.set(V,lt))}function Wt(V,At){const lt=c.get(At).get(V);l.get(At)!==lt&&(e.uniformBlockBinding(At,lt,V.__bindingPointIndex),l.set(At,lt))}function ne(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),r.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),d={},h={},pt=null,Tt={},u={},p=new WeakMap,g=[],S=null,m=!1,f=null,v=null,M=null,y=null,U=null,C=null,T=null,x=new we(0,0,0),w=0,D=!1,O=null,I=null,z=null,G=null,k=null,Jt.set(0,0,e.canvas.width,e.canvas.height),se.set(0,0,e.canvas.width,e.canvas.height),s.reset(),r.reset(),o.reset()}return{buffers:{color:s,depth:r,stencil:o},enable:K,disable:Et,bindFramebuffer:Pt,drawBuffers:Ht,useProgram:be,setBlending:ve,setMaterial:Zt,setFlipSided:ce,setCullFace:te,setLineWidth:Ie,setPolygonOffset:Ze,setScissorTest:re,activeTexture:It,bindTexture:H,unbindTexture:he,compressedTexImage2D:oe,compressedTexImage3D:b,texImage2D:ot,texImage3D:Z,pixelStorei:vt,getParameter:ft,updateUBOMapping:Gt,uniformBlockBinding:Wt,texStorage2D:St,texStorage3D:wt,texSubImage2D:_,texSubImage3D:Y,compressedTexSubImage2D:Q,compressedTexSubImage3D:st,scissor:xt,viewport:Mt,reset:ne}}function P3(e,t,n,i,a,s,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Ve,d=new WeakMap,h=new Set;let u;const p=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function S(b,_){return g?new OffscreenCanvas(b,_):Ju("canvas")}function m(b,_,Y){let Q=1;const st=oe(b);if((st.width>Y||st.height>Y)&&(Q=Y/Math.max(st.width,st.height)),Q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const St=Math.floor(Q*st.width),wt=Math.floor(Q*st.height);u===void 0&&(u=S(St,wt));const ot=_?S(St,wt):u;return ot.width=St,ot.height=wt,ot.getContext("2d").drawImage(b,0,0,St,wt),le("WebGLRenderer: Texture has been resized from ("+st.width+"x"+st.height+") to ("+St+"x"+wt+")."),ot}else return"data"in b&&le("WebGLRenderer: Image in DataTexture is too big ("+st.width+"x"+st.height+")."),b;return b}function f(b){return b.generateMipmaps}function v(b){e.generateMipmap(b)}function M(b){return b.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?e.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function y(b,_,Y,Q,st,St=!1){if(b!==null){if(e[b]!==void 0)return e[b];le("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let wt;Q&&(wt=t.get("EXT_texture_norm16"),wt||le("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ot=_;if(_===e.RED&&(Y===e.FLOAT&&(ot=e.R32F),Y===e.HALF_FLOAT&&(ot=e.R16F),Y===e.UNSIGNED_BYTE&&(ot=e.R8),Y===e.UNSIGNED_SHORT&&wt&&(ot=wt.R16_EXT),Y===e.SHORT&&wt&&(ot=wt.R16_SNORM_EXT)),_===e.RED_INTEGER&&(Y===e.UNSIGNED_BYTE&&(ot=e.R8UI),Y===e.UNSIGNED_SHORT&&(ot=e.R16UI),Y===e.UNSIGNED_INT&&(ot=e.R32UI),Y===e.BYTE&&(ot=e.R8I),Y===e.SHORT&&(ot=e.R16I),Y===e.INT&&(ot=e.R32I)),_===e.RG&&(Y===e.FLOAT&&(ot=e.RG32F),Y===e.HALF_FLOAT&&(ot=e.RG16F),Y===e.UNSIGNED_BYTE&&(ot=e.RG8),Y===e.UNSIGNED_SHORT&&wt&&(ot=wt.RG16_EXT),Y===e.SHORT&&wt&&(ot=wt.RG16_SNORM_EXT)),_===e.RG_INTEGER&&(Y===e.UNSIGNED_BYTE&&(ot=e.RG8UI),Y===e.UNSIGNED_SHORT&&(ot=e.RG16UI),Y===e.UNSIGNED_INT&&(ot=e.RG32UI),Y===e.BYTE&&(ot=e.RG8I),Y===e.SHORT&&(ot=e.RG16I),Y===e.INT&&(ot=e.RG32I)),_===e.RGB_INTEGER&&(Y===e.UNSIGNED_BYTE&&(ot=e.RGB8UI),Y===e.UNSIGNED_SHORT&&(ot=e.RGB16UI),Y===e.UNSIGNED_INT&&(ot=e.RGB32UI),Y===e.BYTE&&(ot=e.RGB8I),Y===e.SHORT&&(ot=e.RGB16I),Y===e.INT&&(ot=e.RGB32I)),_===e.RGBA_INTEGER&&(Y===e.UNSIGNED_BYTE&&(ot=e.RGBA8UI),Y===e.UNSIGNED_SHORT&&(ot=e.RGBA16UI),Y===e.UNSIGNED_INT&&(ot=e.RGBA32UI),Y===e.BYTE&&(ot=e.RGBA8I),Y===e.SHORT&&(ot=e.RGBA16I),Y===e.INT&&(ot=e.RGBA32I)),_===e.RGB&&(Y===e.UNSIGNED_SHORT&&wt&&(ot=wt.RGB16_EXT),Y===e.SHORT&&wt&&(ot=wt.RGB16_SNORM_EXT),Y===e.UNSIGNED_INT_5_9_9_9_REV&&(ot=e.RGB9_E5),Y===e.UNSIGNED_INT_10F_11F_11F_REV&&(ot=e.R11F_G11F_B10F)),_===e.RGBA){const Z=St?Ku:Ue.getTransfer(st);Y===e.FLOAT&&(ot=e.RGBA32F),Y===e.HALF_FLOAT&&(ot=e.RGBA16F),Y===e.UNSIGNED_BYTE&&(ot=Z===qe?e.SRGB8_ALPHA8:e.RGBA8),Y===e.UNSIGNED_SHORT&&wt&&(ot=wt.RGBA16_EXT),Y===e.SHORT&&wt&&(ot=wt.RGBA16_SNORM_EXT),Y===e.UNSIGNED_SHORT_4_4_4_4&&(ot=e.RGBA4),Y===e.UNSIGNED_SHORT_5_5_5_1&&(ot=e.RGB5_A1)}return(ot===e.R16F||ot===e.R32F||ot===e.RG16F||ot===e.RG32F||ot===e.RGBA16F||ot===e.RGBA32F)&&t.get("EXT_color_buffer_float"),ot}function U(b,_){let Y;return b?_===null||_===ua||_===zl?Y=e.DEPTH24_STENCIL8:_===ji?Y=e.DEPTH32F_STENCIL8:_===Pl&&(Y=e.DEPTH24_STENCIL8,le("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===ua||_===zl?Y=e.DEPTH_COMPONENT24:_===ji?Y=e.DEPTH_COMPONENT32F:_===Pl&&(Y=e.DEPTH_COMPONENT16),Y}function C(b,_){return f(b)===!0||b.isFramebufferTexture&&b.minFilter!==In&&b.minFilter!==kn?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function T(b){const _=b.target;_.removeEventListener("dispose",T),w(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function x(b){const _=b.target;_.removeEventListener("dispose",x),O(_)}function w(b){const _=i.get(b);if(_.__webglInit===void 0)return;const Y=b.source,Q=p.get(Y);if(Q){const st=Q[_.__cacheKey];st.usedTimes--,st.usedTimes===0&&D(b),Object.keys(Q).length===0&&p.delete(Y)}i.remove(b)}function D(b){const _=i.get(b);e.deleteTexture(_.__webglTexture);const Y=b.source,Q=p.get(Y);delete Q[_.__cacheKey],r.memory.textures--}function O(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Q=0;Q<6;Q++){if(Array.isArray(_.__webglFramebuffer[Q]))for(let st=0;st<_.__webglFramebuffer[Q].length;st++)e.deleteFramebuffer(_.__webglFramebuffer[Q][st]);else e.deleteFramebuffer(_.__webglFramebuffer[Q]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[Q])}else{if(Array.isArray(_.__webglFramebuffer))for(let Q=0;Q<_.__webglFramebuffer.length;Q++)e.deleteFramebuffer(_.__webglFramebuffer[Q]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Q=0;Q<_.__webglColorRenderbuffer.length;Q++)_.__webglColorRenderbuffer[Q]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[Q]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const Y=b.textures;for(let Q=0,st=Y.length;Q<st;Q++){const St=i.get(Y[Q]);St.__webglTexture&&(e.deleteTexture(St.__webglTexture),r.memory.textures--),i.remove(Y[Q])}i.remove(b)}let I=0;function z(){I=0}function G(){return I}function k(b){I=b}function B(){const b=I;return b>=a.maxTextures&&le("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+a.maxTextures),I+=1,b}function F(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function P(b,_){const Y=i.get(b);if(b.isVideoTexture&&H(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&Y.__version!==b.version){const Q=b.image;if(Q===null)le("WebGLRenderer: Texture marked for update but no image data found.");else if(Q.complete===!1)le("WebGLRenderer: Texture marked for update but image is incomplete");else{Et(Y,b,_);return}}else b.isExternalTexture&&(Y.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,Y.__webglTexture,e.TEXTURE0+_)}function X(b,_){const Y=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&Y.__version!==b.version){Et(Y,b,_);return}else b.isExternalTexture&&(Y.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,Y.__webglTexture,e.TEXTURE0+_)}function pt(b,_){const Y=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&Y.__version!==b.version){Et(Y,b,_);return}n.bindTexture(e.TEXTURE_3D,Y.__webglTexture,e.TEXTURE0+_)}function Tt(b,_){const Y=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&Y.__version!==b.version){Pt(Y,b,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,Y.__webglTexture,e.TEXTURE0+_)}const Lt={[Qh]:e.REPEAT,[Ua]:e.CLAMP_TO_EDGE,[Jh]:e.MIRRORED_REPEAT},ae={[In]:e.NEAREST,[n1]:e.NEAREST_MIPMAP_NEAREST,[gc]:e.NEAREST_MIPMAP_LINEAR,[kn]:e.LINEAR,[hd]:e.LINEAR_MIPMAP_NEAREST,[Xs]:e.LINEAR_MIPMAP_LINEAR},Jt={[s1]:e.NEVER,[u1]:e.ALWAYS,[r1]:e.LESS,[Wm]:e.LEQUAL,[o1]:e.EQUAL,[qm]:e.GEQUAL,[l1]:e.GREATER,[c1]:e.NOTEQUAL};function se(b,_){if(_.type===ji&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===kn||_.magFilter===hd||_.magFilter===gc||_.magFilter===Xs||_.minFilter===kn||_.minFilter===hd||_.minFilter===gc||_.minFilter===Xs)&&le("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(b,e.TEXTURE_WRAP_S,Lt[_.wrapS]),e.texParameteri(b,e.TEXTURE_WRAP_T,Lt[_.wrapT]),(b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY)&&e.texParameteri(b,e.TEXTURE_WRAP_R,Lt[_.wrapR]),e.texParameteri(b,e.TEXTURE_MAG_FILTER,ae[_.magFilter]),e.texParameteri(b,e.TEXTURE_MIN_FILTER,ae[_.minFilter]),_.compareFunction&&(e.texParameteri(b,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(b,e.TEXTURE_COMPARE_FUNC,Jt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===In||_.minFilter!==gc&&_.minFilter!==Xs||_.type===ji&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const Y=t.get("EXT_texture_filter_anisotropic");e.texParameterf(b,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,a.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function ht(b,_){let Y=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",T));const Q=_.source;let st=p.get(Q);st===void 0&&(st={},p.set(Q,st));const St=F(_);if(St!==b.__cacheKey){st[St]===void 0&&(st[St]={texture:e.createTexture(),usedTimes:0},r.memory.textures++,Y=!0),st[St].usedTimes++;const wt=st[b.__cacheKey];wt!==void 0&&(st[b.__cacheKey].usedTimes--,wt.usedTimes===0&&D(_)),b.__cacheKey=St,b.__webglTexture=st[St].texture}return Y}function tt(b,_,Y){return Math.floor(Math.floor(b/Y)/_)}function K(b,_,Y,Q){const St=b.updateRanges;if(St.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,Y,Q,_.data);else{St.sort((vt,xt)=>vt.start-xt.start);let wt=0;for(let vt=1;vt<St.length;vt++){const xt=St[wt],Mt=St[vt],Gt=xt.start+xt.count,Wt=tt(Mt.start,_.width,4),ne=tt(xt.start,_.width,4);Mt.start<=Gt+1&&Wt===ne&&tt(Mt.start+Mt.count-1,_.width,4)===Wt?xt.count=Math.max(xt.count,Mt.start+Mt.count-xt.start):(++wt,St[wt]=Mt)}St.length=wt+1;const ot=n.getParameter(e.UNPACK_ROW_LENGTH),Z=n.getParameter(e.UNPACK_SKIP_PIXELS),ft=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let vt=0,xt=St.length;vt<xt;vt++){const Mt=St[vt],Gt=Math.floor(Mt.start/4),Wt=Math.ceil(Mt.count/4),ne=Gt%_.width,V=Math.floor(Gt/_.width),At=Wt,ut=1;n.pixelStorei(e.UNPACK_SKIP_PIXELS,ne),n.pixelStorei(e.UNPACK_SKIP_ROWS,V),n.texSubImage2D(e.TEXTURE_2D,0,ne,V,At,ut,Y,Q,_.data)}b.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,ot),n.pixelStorei(e.UNPACK_SKIP_PIXELS,Z),n.pixelStorei(e.UNPACK_SKIP_ROWS,ft)}}function Et(b,_,Y){let Q=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Q=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Q=e.TEXTURE_3D);const st=ht(b,_),St=_.source;n.bindTexture(Q,b.__webglTexture,e.TEXTURE0+Y);const wt=i.get(St);if(St.version!==wt.__version||st===!0){if(n.activeTexture(e.TEXTURE0+Y),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const ut=Ue.getPrimaries(Ue.workingColorSpace),lt=_.colorSpace===rs?null:Ue.getPrimaries(_.colorSpace),Ot=_.colorSpace===rs||ut===lt?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot)}n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment);let Z=m(_.image,!1,a.maxTextureSize);Z=he(_,Z);const ft=s.convert(_.format,_.colorSpace),vt=s.convert(_.type);let xt=y(_.internalFormat,ft,vt,_.normalized,_.colorSpace,_.isVideoTexture);se(Q,_);let Mt;const Gt=_.mipmaps,Wt=_.isVideoTexture!==!0,ne=wt.__version===void 0||st===!0,V=St.dataReady,At=C(_,Z);if(_.isDepthTexture)xt=U(_.format===Ws,_.type),ne&&(Wt?n.texStorage2D(e.TEXTURE_2D,1,xt,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,xt,Z.width,Z.height,0,ft,vt,null));else if(_.isDataTexture)if(Gt.length>0){Wt&&ne&&n.texStorage2D(e.TEXTURE_2D,At,xt,Gt[0].width,Gt[0].height);for(let ut=0,lt=Gt.length;ut<lt;ut++)Mt=Gt[ut],Wt?V&&n.texSubImage2D(e.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,ft,vt,Mt.data):n.texImage2D(e.TEXTURE_2D,ut,xt,Mt.width,Mt.height,0,ft,vt,Mt.data);_.generateMipmaps=!1}else Wt?(ne&&n.texStorage2D(e.TEXTURE_2D,At,xt,Z.width,Z.height),V&&K(_,Z,ft,vt)):n.texImage2D(e.TEXTURE_2D,0,xt,Z.width,Z.height,0,ft,vt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Wt&&ne&&n.texStorage3D(e.TEXTURE_2D_ARRAY,At,xt,Gt[0].width,Gt[0].height,Z.depth);for(let ut=0,lt=Gt.length;ut<lt;ut++)if(Mt=Gt[ut],_.format!==Zi)if(ft!==null)if(Wt){if(V)if(_.layerUpdates.size>0){const Ot=pv(Mt.width,Mt.height,_.format,_.type);for(const _t of _.layerUpdates){const qt=Mt.data.subarray(_t*Ot/Mt.data.BYTES_PER_ELEMENT,(_t+1)*Ot/Mt.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ut,0,0,_t,Mt.width,Mt.height,1,ft,qt)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,ut,0,0,0,Mt.width,Mt.height,Z.depth,ft,Mt.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,ut,xt,Mt.width,Mt.height,Z.depth,0,Mt.data,0,0);else le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Wt?V&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,ut,0,0,0,Mt.width,Mt.height,Z.depth,ft,vt,Mt.data):n.texImage3D(e.TEXTURE_2D_ARRAY,ut,xt,Mt.width,Mt.height,Z.depth,0,ft,vt,Mt.data)}else{Wt&&ne&&n.texStorage2D(e.TEXTURE_2D,At,xt,Gt[0].width,Gt[0].height);for(let ut=0,lt=Gt.length;ut<lt;ut++)Mt=Gt[ut],_.format!==Zi?ft!==null?Wt?V&&n.compressedTexSubImage2D(e.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,ft,Mt.data):n.compressedTexImage2D(e.TEXTURE_2D,ut,xt,Mt.width,Mt.height,0,Mt.data):le("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Wt?V&&n.texSubImage2D(e.TEXTURE_2D,ut,0,0,Mt.width,Mt.height,ft,vt,Mt.data):n.texImage2D(e.TEXTURE_2D,ut,xt,Mt.width,Mt.height,0,ft,vt,Mt.data)}else if(_.isDataArrayTexture)if(Wt){if(ne&&n.texStorage3D(e.TEXTURE_2D_ARRAY,At,xt,Z.width,Z.height,Z.depth),V)if(_.layerUpdates.size>0){const ut=pv(Z.width,Z.height,_.format,_.type);for(const lt of _.layerUpdates){const Ot=Z.data.subarray(lt*ut/Z.data.BYTES_PER_ELEMENT,(lt+1)*ut/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,lt,Z.width,Z.height,1,ft,vt,Ot)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ft,vt,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,xt,Z.width,Z.height,Z.depth,0,ft,vt,Z.data);else if(_.isData3DTexture)Wt?(ne&&n.texStorage3D(e.TEXTURE_3D,At,xt,Z.width,Z.height,Z.depth),V&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ft,vt,Z.data)):n.texImage3D(e.TEXTURE_3D,0,xt,Z.width,Z.height,Z.depth,0,ft,vt,Z.data);else if(_.isFramebufferTexture){if(ne)if(Wt)n.texStorage2D(e.TEXTURE_2D,At,xt,Z.width,Z.height);else{let ut=Z.width,lt=Z.height;for(let Ot=0;Ot<At;Ot++)n.texImage2D(e.TEXTURE_2D,Ot,xt,ut,lt,0,ft,vt,null),ut>>=1,lt>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in e){const ut=e.canvas;if(ut.hasAttribute("layoutsubtree")||ut.setAttribute("layoutsubtree","true"),Z.parentNode!==ut){ut.appendChild(Z),h.add(_),ut.onpaint=lt=>{const Ot=lt.changedElements;for(const _t of h)Ot.includes(_t.image)&&(_t.needsUpdate=!0)},ut.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,Z);else{const Ot=e.RGBA,_t=e.RGBA,qt=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,Ot,_t,qt,Z)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(Gt.length>0){if(Wt&&ne){const ut=oe(Gt[0]);n.texStorage2D(e.TEXTURE_2D,At,xt,ut.width,ut.height)}for(let ut=0,lt=Gt.length;ut<lt;ut++)Mt=Gt[ut],Wt?V&&n.texSubImage2D(e.TEXTURE_2D,ut,0,0,ft,vt,Mt):n.texImage2D(e.TEXTURE_2D,ut,xt,ft,vt,Mt);_.generateMipmaps=!1}else if(Wt){if(ne){const ut=oe(Z);n.texStorage2D(e.TEXTURE_2D,At,xt,ut.width,ut.height)}V&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,ft,vt,Z)}else n.texImage2D(e.TEXTURE_2D,0,xt,ft,vt,Z);f(_)&&v(Q),wt.__version=St.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Pt(b,_,Y){if(_.image.length!==6)return;const Q=ht(b,_),st=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,b.__webglTexture,e.TEXTURE0+Y);const St=i.get(st);if(st.version!==St.__version||Q===!0){n.activeTexture(e.TEXTURE0+Y);const wt=Ue.getPrimaries(Ue.workingColorSpace),ot=_.colorSpace===rs?null:Ue.getPrimaries(_.colorSpace),Z=_.colorSpace===rs||wt===ot?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Z);const ft=_.isCompressedTexture||_.image[0].isCompressedTexture,vt=_.image[0]&&_.image[0].isDataTexture,xt=[];for(let _t=0;_t<6;_t++)!ft&&!vt?xt[_t]=m(_.image[_t],!0,a.maxCubemapSize):xt[_t]=vt?_.image[_t].image:_.image[_t],xt[_t]=he(_,xt[_t]);const Mt=xt[0],Gt=s.convert(_.format,_.colorSpace),Wt=s.convert(_.type),ne=y(_.internalFormat,Gt,Wt,_.normalized,_.colorSpace),V=_.isVideoTexture!==!0,At=St.__version===void 0||Q===!0,ut=st.dataReady;let lt=C(_,Mt);se(e.TEXTURE_CUBE_MAP,_);let Ot;if(ft){V&&At&&n.texStorage2D(e.TEXTURE_CUBE_MAP,lt,ne,Mt.width,Mt.height);for(let _t=0;_t<6;_t++){Ot=xt[_t].mipmaps;for(let qt=0;qt<Ot.length;qt++){const Vt=Ot[qt];_.format!==Zi?Gt!==null?V?ut&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,0,0,Vt.width,Vt.height,Gt,Vt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,ne,Vt.width,Vt.height,0,Vt.data):le("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):V?ut&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,0,0,Vt.width,Vt.height,Gt,Wt,Vt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt,ne,Vt.width,Vt.height,0,Gt,Wt,Vt.data)}}}else{if(Ot=_.mipmaps,V&&At){Ot.length>0&&lt++;const _t=oe(xt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,lt,ne,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(vt){V?ut&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,xt[_t].width,xt[_t].height,Gt,Wt,xt[_t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,ne,xt[_t].width,xt[_t].height,0,Gt,Wt,xt[_t].data);for(let qt=0;qt<Ot.length;qt++){const Te=Ot[qt].image[_t].image;V?ut&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,0,0,Te.width,Te.height,Gt,Wt,Te.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,ne,Te.width,Te.height,0,Gt,Wt,Te.data)}}else{V?ut&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Gt,Wt,xt[_t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,ne,Gt,Wt,xt[_t]);for(let qt=0;qt<Ot.length;qt++){const Vt=Ot[qt];V?ut&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,0,0,Gt,Wt,Vt.image[_t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+_t,qt+1,ne,Gt,Wt,Vt.image[_t])}}}f(_)&&v(e.TEXTURE_CUBE_MAP),St.__version=st.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Ht(b,_,Y,Q,st,St){const wt=s.convert(Y.format,Y.colorSpace),ot=s.convert(Y.type),Z=y(Y.internalFormat,wt,ot,Y.normalized,Y.colorSpace),ft=i.get(_),vt=i.get(Y);if(vt.__renderTarget=_,!ft.__hasExternalTextures){const xt=Math.max(1,_.width>>St),Mt=Math.max(1,_.height>>St);st===e.TEXTURE_3D||st===e.TEXTURE_2D_ARRAY?n.texImage3D(st,St,Z,xt,Mt,_.depth,0,wt,ot,null):n.texImage2D(st,St,Z,xt,Mt,0,wt,ot,null)}n.bindFramebuffer(e.FRAMEBUFFER,b),It(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Q,st,vt.__webglTexture,0,re(_)):(st===e.TEXTURE_2D||st>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,Q,st,vt.__webglTexture,St),n.bindFramebuffer(e.FRAMEBUFFER,null)}function be(b,_,Y){if(e.bindRenderbuffer(e.RENDERBUFFER,b),_.depthBuffer){const Q=_.depthTexture,st=Q&&Q.isDepthTexture?Q.type:null,St=U(_.stencilBuffer,st),wt=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;It(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,re(_),St,_.width,_.height):Y?e.renderbufferStorageMultisample(e.RENDERBUFFER,re(_),St,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,St,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,wt,e.RENDERBUFFER,b)}else{const Q=_.textures;for(let st=0;st<Q.length;st++){const St=Q[st],wt=s.convert(St.format,St.colorSpace),ot=s.convert(St.type),Z=y(St.internalFormat,wt,ot,St.normalized,St.colorSpace);It(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,re(_),Z,_.width,_.height):Y?e.renderbufferStorageMultisample(e.RENDERBUFFER,re(_),Z,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Z,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function $t(b,_,Y){const Q=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const st=i.get(_.depthTexture);if(st.__renderTarget=_,(!st.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Q){if(st.__webglInit===void 0&&(st.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),st.__webglTexture===void 0){st.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,st.__webglTexture),se(e.TEXTURE_CUBE_MAP,_.depthTexture);const ft=s.convert(_.depthTexture.format),vt=s.convert(_.depthTexture.type);let xt;_.depthTexture.format===Xa?xt=e.DEPTH_COMPONENT24:_.depthTexture.format===Ws&&(xt=e.DEPTH24_STENCIL8);for(let Mt=0;Mt<6;Mt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+Mt,0,xt,_.width,_.height,0,ft,vt,null)}}else P(_.depthTexture,0);const St=st.__webglTexture,wt=re(_),ot=Q?e.TEXTURE_CUBE_MAP_POSITIVE_X+Y:e.TEXTURE_2D,Z=_.depthTexture.format===Ws?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===Xa)It(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,ot,St,0,wt):e.framebufferTexture2D(e.FRAMEBUFFER,Z,ot,St,0);else if(_.depthTexture.format===Ws)It(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Z,ot,St,0,wt):e.framebufferTexture2D(e.FRAMEBUFFER,Z,ot,St,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ee(b){const _=i.get(b),Y=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const Q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Q){const st=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Q.removeEventListener("dispose",st)};Q.addEventListener("dispose",st),_.__depthDisposeCallback=st}_.__boundDepthTexture=Q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(Y)for(let Q=0;Q<6;Q++)$t(_.__webglFramebuffer[Q],b,Q);else{const Q=b.texture.mipmaps;Q&&Q.length>0?$t(_.__webglFramebuffer[0],b,0):$t(_.__webglFramebuffer,b,0)}else if(Y){_.__webglDepthbuffer=[];for(let Q=0;Q<6;Q++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[Q]),_.__webglDepthbuffer[Q]===void 0)_.__webglDepthbuffer[Q]=e.createRenderbuffer(),be(_.__webglDepthbuffer[Q],b,!1);else{const st=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=_.__webglDepthbuffer[Q];e.bindRenderbuffer(e.RENDERBUFFER,St),e.framebufferRenderbuffer(e.FRAMEBUFFER,st,e.RENDERBUFFER,St)}}else{const Q=b.texture.mipmaps;if(Q&&Q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),be(_.__webglDepthbuffer,b,!1);else{const st=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,St=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,St),e.framebufferRenderbuffer(e.FRAMEBUFFER,st,e.RENDERBUFFER,St)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function ve(b,_,Y){const Q=i.get(b);_!==void 0&&Ht(Q.__webglFramebuffer,b,b.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),Y!==void 0&&Ee(b)}function Zt(b){const _=b.texture,Y=i.get(b),Q=i.get(_);b.addEventListener("dispose",x);const st=b.textures,St=b.isWebGLCubeRenderTarget===!0,wt=st.length>1;if(wt||(Q.__webglTexture===void 0&&(Q.__webglTexture=e.createTexture()),Q.__version=_.version,r.memory.textures++),St){Y.__webglFramebuffer=[];for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0){Y.__webglFramebuffer[ot]=[];for(let Z=0;Z<_.mipmaps.length;Z++)Y.__webglFramebuffer[ot][Z]=e.createFramebuffer()}else Y.__webglFramebuffer[ot]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){Y.__webglFramebuffer=[];for(let ot=0;ot<_.mipmaps.length;ot++)Y.__webglFramebuffer[ot]=e.createFramebuffer()}else Y.__webglFramebuffer=e.createFramebuffer();if(wt)for(let ot=0,Z=st.length;ot<Z;ot++){const ft=i.get(st[ot]);ft.__webglTexture===void 0&&(ft.__webglTexture=e.createTexture(),r.memory.textures++)}if(b.samples>0&&It(b)===!1){Y.__webglMultisampledFramebuffer=e.createFramebuffer(),Y.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let ot=0;ot<st.length;ot++){const Z=st[ot];Y.__webglColorRenderbuffer[ot]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,Y.__webglColorRenderbuffer[ot]);const ft=s.convert(Z.format,Z.colorSpace),vt=s.convert(Z.type),xt=y(Z.internalFormat,ft,vt,Z.normalized,Z.colorSpace,b.isXRRenderTarget===!0),Mt=re(b);e.renderbufferStorageMultisample(e.RENDERBUFFER,Mt,xt,b.width,b.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ot,e.RENDERBUFFER,Y.__webglColorRenderbuffer[ot])}e.bindRenderbuffer(e.RENDERBUFFER,null),b.depthBuffer&&(Y.__webglDepthRenderbuffer=e.createRenderbuffer(),be(Y.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(St){n.bindTexture(e.TEXTURE_CUBE_MAP,Q.__webglTexture),se(e.TEXTURE_CUBE_MAP,_);for(let ot=0;ot<6;ot++)if(_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Ht(Y.__webglFramebuffer[ot][Z],b,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,Z);else Ht(Y.__webglFramebuffer[ot],b,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+ot,0);f(_)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(wt){for(let ot=0,Z=st.length;ot<Z;ot++){const ft=st[ot],vt=i.get(ft);let xt=e.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(xt=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(xt,vt.__webglTexture),se(xt,ft),Ht(Y.__webglFramebuffer,b,ft,e.COLOR_ATTACHMENT0+ot,xt,0),f(ft)&&v(xt)}n.unbindTexture()}else{let ot=e.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ot=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(ot,Q.__webglTexture),se(ot,_),_.mipmaps&&_.mipmaps.length>0)for(let Z=0;Z<_.mipmaps.length;Z++)Ht(Y.__webglFramebuffer[Z],b,_,e.COLOR_ATTACHMENT0,ot,Z);else Ht(Y.__webglFramebuffer,b,_,e.COLOR_ATTACHMENT0,ot,0);f(_)&&v(ot),n.unbindTexture()}b.depthBuffer&&Ee(b)}function ce(b){const _=b.textures;for(let Y=0,Q=_.length;Y<Q;Y++){const st=_[Y];if(f(st)){const St=M(b),wt=i.get(st).__webglTexture;n.bindTexture(St,wt),v(St),n.unbindTexture()}}}const te=[],Ie=[];function Ze(b){if(b.samples>0){if(It(b)===!1){const _=b.textures,Y=b.width,Q=b.height;let st=e.COLOR_BUFFER_BIT;const St=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,wt=i.get(b),ot=_.length>1;if(ot)for(let ft=0;ft<_.length;ft++)n.bindFramebuffer(e.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,wt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,wt.__webglMultisampledFramebuffer);const Z=b.texture.mipmaps;Z&&Z.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,wt.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,wt.__webglFramebuffer);for(let ft=0;ft<_.length;ft++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(st|=e.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(st|=e.STENCIL_BUFFER_BIT)),ot){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,wt.__webglColorRenderbuffer[ft]);const vt=i.get(_[ft]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,vt,0)}e.blitFramebuffer(0,0,Y,Q,0,0,Y,Q,st,e.NEAREST),l===!0&&(te.length=0,Ie.length=0,te.push(e.COLOR_ATTACHMENT0+ft),b.depthBuffer&&b.resolveDepthBuffer===!1&&(te.push(St),Ie.push(St),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ie)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,te))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),ot)for(let ft=0;ft<_.length;ft++){n.bindFramebuffer(e.FRAMEBUFFER,wt.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.RENDERBUFFER,wt.__webglColorRenderbuffer[ft]);const vt=i.get(_[ft]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,wt.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+ft,e.TEXTURE_2D,vt,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,wt.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&l){const _=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function re(b){return Math.min(a.maxSamples,b.samples)}function It(b){const _=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function H(b){const _=r.render.frame;d.get(b)!==_&&(d.set(b,_),b.update())}function he(b,_){const Y=b.colorSpace,Q=b.format,st=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||Y!==Zu&&Y!==rs&&(Ue.getTransfer(Y)===qe?(Q!==Zi||st!==Oi)&&le("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ze("WebGLTextures: Unsupported texture color space:",Y)),_}function oe(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=z,this.getTextureUnits=G,this.setTextureUnits=k,this.setTexture2D=P,this.setTexture2DArray=X,this.setTexture3D=pt,this.setTextureCube=Tt,this.rebindTextures=ve,this.setupRenderTarget=Zt,this.updateRenderTargetMipmap=ce,this.updateMultisampleRenderTarget=Ze,this.setupDepthRenderbuffer=Ee,this.setupFrameBufferTexture=Ht,this.useMultisampledRTT=It,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function z3(e,t){function n(i,a=rs){let s;const r=Ue.getTransfer(a);if(i===Oi)return e.UNSIGNED_BYTE;if(i===Fm)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Hm)return e.UNSIGNED_SHORT_5_5_5_1;if(i===nS)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===iS)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===tS)return e.BYTE;if(i===eS)return e.SHORT;if(i===Pl)return e.UNSIGNED_SHORT;if(i===Bm)return e.INT;if(i===ua)return e.UNSIGNED_INT;if(i===ji)return e.FLOAT;if(i===ka)return e.HALF_FLOAT;if(i===aS)return e.ALPHA;if(i===sS)return e.RGB;if(i===Zi)return e.RGBA;if(i===Xa)return e.DEPTH_COMPONENT;if(i===Ws)return e.DEPTH_STENCIL;if(i===Gm)return e.RED;if(i===Vm)return e.RED_INTEGER;if(i===ar)return e.RG;if(i===km)return e.RG_INTEGER;if(i===Xm)return e.RGBA_INTEGER;if(i===uu||i===fu||i===du||i===hu)if(r===qe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===uu)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===du)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===hu)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===uu)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===fu)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===du)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===hu)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===$h||i===tp||i===ep||i===np)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===$h)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===tp)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===ep)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===np)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ip||i===ap||i===sp||i===rp||i===op||i===Yu||i===lp)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ip||i===ap)return r===qe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===sp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===rp)return s.COMPRESSED_R11_EAC;if(i===op)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Yu)return s.COMPRESSED_RG11_EAC;if(i===lp)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===cp||i===up||i===fp||i===dp||i===hp||i===pp||i===mp||i===gp||i===vp||i===_p||i===xp||i===yp||i===Sp||i===Mp)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===cp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===up)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===fp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===dp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===hp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===pp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===mp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===gp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_p)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===xp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Sp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Mp)return r===qe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bp||i===Ep||i===Tp)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===bp)return r===qe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ep)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Tp)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ap||i===Rp||i===ju||i===Cp)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Ap)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Rp)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===ju)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Cp)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===zl?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const I3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,B3=`
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

}`;class F3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new _S(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new Bn({vertexShader:I3,fragmentShader:B3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Hi(new bf(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class H3 extends dr{constructor(t,n){super();const i=this;let a=null,s=1,r=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,p=null,g=null;const S=typeof XRWebGLBinding<"u",m=new F3,f={},v=n.getContextAttributes();let M=null,y=null;const U=[],C=[],T=new Ve;let x=null;const w=new Di;w.viewport=new fn;const D=new Di;D.viewport=new fn;const O=[w,D],I=new K1;let z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ht){let tt=U[ht];return tt===void 0&&(tt=new yd,U[ht]=tt),tt.getTargetRaySpace()},this.getControllerGrip=function(ht){let tt=U[ht];return tt===void 0&&(tt=new yd,U[ht]=tt),tt.getGripSpace()},this.getHand=function(ht){let tt=U[ht];return tt===void 0&&(tt=new yd,U[ht]=tt),tt.getHandSpace()};function k(ht){const tt=C.indexOf(ht.inputSource);if(tt===-1)return;const K=U[tt];K!==void 0&&(K.update(ht.inputSource,ht.frame,c||r),K.dispatchEvent({type:ht.type,data:ht.inputSource}))}function B(){a.removeEventListener("select",k),a.removeEventListener("selectstart",k),a.removeEventListener("selectend",k),a.removeEventListener("squeeze",k),a.removeEventListener("squeezestart",k),a.removeEventListener("squeezeend",k),a.removeEventListener("end",B),a.removeEventListener("inputsourceschange",F);for(let ht=0;ht<U.length;ht++){const tt=C[ht];tt!==null&&(C[ht]=null,U[ht].disconnect(tt))}z=null,G=null,m.reset();for(const ht in f)delete f[ht];t.setRenderTarget(M),p=null,u=null,h=null,a=null,y=null,se.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(T.width,T.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ht){s=ht,i.isPresenting===!0&&le("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ht){o=ht,i.isPresenting===!0&&le("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(ht){c=ht},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return h===null&&S&&(h=new XRWebGLBinding(a,n)),h},this.getFrame=function(){return g},this.getSession=function(){return a},this.setSession=async function(ht){if(a=ht,a!==null){if(M=t.getRenderTarget(),a.addEventListener("select",k),a.addEventListener("selectstart",k),a.addEventListener("selectend",k),a.addEventListener("squeeze",k),a.addEventListener("squeezestart",k),a.addEventListener("squeezeend",k),a.addEventListener("end",B),a.addEventListener("inputsourceschange",F),v.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(T),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let K=null,Et=null,Pt=null;v.depth&&(Pt=v.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,K=v.stencil?Ws:Xa,Et=v.stencil?zl:ua);const Ht={colorFormat:n.RGBA8,depthFormat:Pt,scaleFactor:s};h=this.getBinding(),u=h.createProjectionLayer(Ht),a.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),y=new ca(u.textureWidth,u.textureHeight,{format:Zi,type:Oi,depthTexture:new yo(u.textureWidth,u.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const K={antialias:v.antialias,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(a,n,K),a.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),y=new ca(p.framebufferWidth,p.framebufferHeight,{format:Zi,type:Oi,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await a.requestReferenceSpace(o),se.setContext(a),se.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(a!==null)return a.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F(ht){for(let tt=0;tt<ht.removed.length;tt++){const K=ht.removed[tt],Et=C.indexOf(K);Et>=0&&(C[Et]=null,U[Et].disconnect(K))}for(let tt=0;tt<ht.added.length;tt++){const K=ht.added[tt];let Et=C.indexOf(K);if(Et===-1){for(let Ht=0;Ht<U.length;Ht++)if(Ht>=C.length){C.push(K),Et=Ht;break}else if(C[Ht]===null){C[Ht]=K,Et=Ht;break}if(Et===-1)break}const Pt=U[Et];Pt&&Pt.connect(K)}}const P=new $,X=new $;function pt(ht,tt,K){P.setFromMatrixPosition(tt.matrixWorld),X.setFromMatrixPosition(K.matrixWorld);const Et=P.distanceTo(X),Pt=tt.projectionMatrix.elements,Ht=K.projectionMatrix.elements,be=Pt[14]/(Pt[10]-1),$t=Pt[14]/(Pt[10]+1),Ee=(Pt[9]+1)/Pt[5],ve=(Pt[9]-1)/Pt[5],Zt=(Pt[8]-1)/Pt[0],ce=(Ht[8]+1)/Ht[0],te=be*Zt,Ie=be*ce,Ze=Et/(-Zt+ce),re=Ze*-Zt;if(tt.matrixWorld.decompose(ht.position,ht.quaternion,ht.scale),ht.translateX(re),ht.translateZ(Ze),ht.matrixWorld.compose(ht.position,ht.quaternion,ht.scale),ht.matrixWorldInverse.copy(ht.matrixWorld).invert(),Pt[10]===-1)ht.projectionMatrix.copy(tt.projectionMatrix),ht.projectionMatrixInverse.copy(tt.projectionMatrixInverse);else{const It=be+Ze,H=$t+Ze,he=te-re,oe=Ie+(Et-re),b=Ee*$t/H*It,_=ve*$t/H*It;ht.projectionMatrix.makePerspective(he,oe,b,_,It,H),ht.projectionMatrixInverse.copy(ht.projectionMatrix).invert()}}function Tt(ht,tt){tt===null?ht.matrixWorld.copy(ht.matrix):ht.matrixWorld.multiplyMatrices(tt.matrixWorld,ht.matrix),ht.matrixWorldInverse.copy(ht.matrixWorld).invert()}this.updateCamera=function(ht){if(a===null)return;let tt=ht.near,K=ht.far;m.texture!==null&&(m.depthNear>0&&(tt=m.depthNear),m.depthFar>0&&(K=m.depthFar)),I.near=D.near=w.near=tt,I.far=D.far=w.far=K,(z!==I.near||G!==I.far)&&(a.updateRenderState({depthNear:I.near,depthFar:I.far}),z=I.near,G=I.far),I.layers.mask=ht.layers.mask|6,w.layers.mask=I.layers.mask&-5,D.layers.mask=I.layers.mask&-3;const Et=ht.parent,Pt=I.cameras;Tt(I,Et);for(let Ht=0;Ht<Pt.length;Ht++)Tt(Pt[Ht],Et);Pt.length===2?pt(I,w,D):I.projectionMatrix.copy(w.projectionMatrix),Lt(ht,I,Et)};function Lt(ht,tt,K){K===null?ht.matrix.copy(tt.matrixWorld):(ht.matrix.copy(K.matrixWorld),ht.matrix.invert(),ht.matrix.multiply(tt.matrixWorld)),ht.matrix.decompose(ht.position,ht.quaternion,ht.scale),ht.updateMatrixWorld(!0),ht.projectionMatrix.copy(tt.projectionMatrix),ht.projectionMatrixInverse.copy(tt.projectionMatrixInverse),ht.isPerspectiveCamera&&(ht.fov=wp*2*Math.atan(1/ht.projectionMatrix.elements[5]),ht.zoom=1)}this.getCamera=function(){return I},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(ht){l=ht,u!==null&&(u.fixedFoveation=ht),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ht)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(I)},this.getCameraTexture=function(ht){return f[ht]};let ae=null;function Jt(ht,tt){if(d=tt.getViewerPose(c||r),g=tt,d!==null){const K=d.views;p!==null&&(t.setRenderTargetFramebuffer(y,p.framebuffer),t.setRenderTarget(y));let Et=!1;K.length!==I.cameras.length&&(I.cameras.length=0,Et=!0);for(let $t=0;$t<K.length;$t++){const Ee=K[$t];let ve=null;if(p!==null)ve=p.getViewport(Ee);else{const ce=h.getViewSubImage(u,Ee);ve=ce.viewport,$t===0&&(t.setRenderTargetTextures(y,ce.colorTexture,ce.depthStencilTexture),t.setRenderTarget(y))}let Zt=O[$t];Zt===void 0&&(Zt=new Di,Zt.layers.enable($t),Zt.viewport=new fn,O[$t]=Zt),Zt.matrix.fromArray(Ee.transform.matrix),Zt.matrix.decompose(Zt.position,Zt.quaternion,Zt.scale),Zt.projectionMatrix.fromArray(Ee.projectionMatrix),Zt.projectionMatrixInverse.copy(Zt.projectionMatrix).invert(),Zt.viewport.set(ve.x,ve.y,ve.width,ve.height),$t===0&&(I.matrix.copy(Zt.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale)),Et===!0&&I.cameras.push(Zt)}const Pt=a.enabledFeatures;if(Pt&&Pt.includes("depth-sensing")&&a.depthUsage=="gpu-optimized"&&S){h=i.getBinding();const $t=h.getDepthInformation(K[0]);$t&&$t.isValid&&$t.texture&&m.init($t,a.renderState)}if(Pt&&Pt.includes("camera-access")&&S){t.state.unbindTexture(),h=i.getBinding();for(let $t=0;$t<K.length;$t++){const Ee=K[$t].camera;if(Ee){let ve=f[Ee];ve||(ve=new _S,f[Ee]=ve);const Zt=h.getCameraImage(Ee);ve.sourceTexture=Zt}}}}for(let K=0;K<U.length;K++){const Et=C[K],Pt=U[K];Et!==null&&Pt!==void 0&&Pt.update(Et,tt,c||r)}ae&&ae(ht,tt),tt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:tt}),g=null}const se=new SS;se.setAnimationLoop(Jt),this.setAnimationLoop=function(ht){ae=ht},this.dispose=function(){}}}const G3=new nn,CS=new pe;CS.set(-1,0,0,0,1,0,0,0,1);function V3(e,t){function n(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,xS(e)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function a(m,f,v,M,y){f.isNodeMaterial?f.uniformsNeedUpdate=!1:f.isMeshBasicMaterial?s(m,f):f.isMeshLambertMaterial?(s(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(s(m,f),h(m,f)):f.isMeshPhongMaterial?(s(m,f),d(m,f),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(s(m,f),u(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(s(m,f),g(m,f)):f.isMeshDepthMaterial?s(m,f):f.isMeshDistanceMaterial?(s(m,f),S(m,f)):f.isMeshNormalMaterial?s(m,f):f.isLineBasicMaterial?(r(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,v,M):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function s(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,n(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===si&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,n(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===si&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,n(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,n(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);const v=t.get(f),M=v.envMap,y=v.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(G3.makeRotationFromEuler(y)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(CS),m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,m.aoMapTransform))}function r(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,v,M){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*v,m.scale.value=M*.5,f.map&&(m.map.value=f.map,n(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,n(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,n(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function d(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function u(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,v){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===si&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=v.texture,m.transmissionSamplerSize.value.set(v.width,v.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function S(m,f){const v=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(v.matrixWorld),m.nearDistance.value=v.shadow.camera.near,m.farDistance.value=v.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:a}}function k3(e,t,n,i){let a={},s={},r=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,U){const C=U.program;i.uniformBlockBinding(y,C)}function c(y,U){let C=a[y.id];C===void 0&&(m(y),C=d(y),a[y.id]=C,y.addEventListener("dispose",v));const T=U.program;i.updateUBOMapping(y,T);const x=t.render.frame;s[y.id]!==x&&(u(y),s[y.id]=x)}function d(y){const U=h();y.__bindingPointIndex=U;const C=e.createBuffer(),T=y.__size,x=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,C),e.bufferData(e.UNIFORM_BUFFER,T,x),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,U,C),C}function h(){for(let y=0;y<o;y++)if(r.indexOf(y)===-1)return r.push(y),y;return ze("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const U=a[y.id],C=y.uniforms,T=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,U);for(let x=0,w=C.length;x<w;x++){const D=C[x];if(Array.isArray(D))for(let O=0,I=D.length;O<I;O++)p(D[O],x,O,T);else p(D,x,0,T)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(y,U,C,T){if(S(y,U,C,T)===!0){const x=y.__offset,w=y.value;if(Array.isArray(w)){let D=0;for(let O=0;O<w.length;O++){const I=w[O],z=f(I);g(I,y.__data,D),typeof I!="number"&&typeof I!="boolean"&&!I.isMatrix3&&!ArrayBuffer.isView(I)&&(D+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(w,y.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,x,y.__data)}}function g(y,U,C){typeof y=="number"||typeof y=="boolean"?U[0]=y:y.isMatrix3?(U[0]=y.elements[0],U[1]=y.elements[1],U[2]=y.elements[2],U[3]=0,U[4]=y.elements[3],U[5]=y.elements[4],U[6]=y.elements[5],U[7]=0,U[8]=y.elements[6],U[9]=y.elements[7],U[10]=y.elements[8],U[11]=0):ArrayBuffer.isView(y)?U.set(new y.constructor(y.buffer,y.byteOffset,U.length)):y.toArray(U,C)}function S(y,U,C,T){const x=y.value,w=U+"_"+C;if(T[w]===void 0)return typeof x=="number"||typeof x=="boolean"?T[w]=x:ArrayBuffer.isView(x)?T[w]=x.slice():T[w]=x.clone(),!0;{const D=T[w];if(typeof x=="number"||typeof x=="boolean"){if(D!==x)return T[w]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(D.equals(x)===!1)return D.copy(x),!0}}return!1}function m(y){const U=y.uniforms;let C=0;const T=16;for(let w=0,D=U.length;w<D;w++){const O=Array.isArray(U[w])?U[w]:[U[w]];for(let I=0,z=O.length;I<z;I++){const G=O[I],k=Array.isArray(G.value)?G.value:[G.value];for(let B=0,F=k.length;B<F;B++){const P=k[B],X=f(P),pt=C%T,Tt=pt%X.boundary,Lt=pt+Tt;C+=Tt,Lt!==0&&T-Lt<X.storage&&(C+=T-Lt),G.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=C,C+=X.storage}}}const x=C%T;return x>0&&(C+=T-x),y.__size=C,y.__cache={},this}function f(y){const U={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(U.boundary=4,U.storage=4):y.isVector2?(U.boundary=8,U.storage=8):y.isVector3||y.isColor?(U.boundary=16,U.storage=12):y.isVector4?(U.boundary=16,U.storage=16):y.isMatrix3?(U.boundary=48,U.storage=48):y.isMatrix4?(U.boundary=64,U.storage=64):y.isTexture?le("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(U.boundary=16,U.storage=y.byteLength):le("WebGLRenderer: Unsupported uniform value type.",y),U}function v(y){const U=y.target;U.removeEventListener("dispose",v);const C=r.indexOf(U.__bindingPointIndex);r.splice(C,1),e.deleteBuffer(a[U.id]),delete a[U.id],delete s[U.id]}function M(){for(const y in a)e.deleteBuffer(a[y]);r=[],a={},s={}}return{bind:l,update:c,dispose:M}}const X3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ta=null;function W3(){return ta===null&&(ta=new pS(X3,16,16,ar,ka),ta.name="DFG_LUT",ta.minFilter=kn,ta.magFilter=kn,ta.wrapS=Ua,ta.wrapT=Ua,ta.generateMipmaps=!1,ta.needsUpdate=!0),ta}class wS{constructor(t={}){const{canvas:n=d1(),context:i=null,depth:a=!0,stencil:s=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:p=Oi}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=r;const S=p,m=new Set([Xm,km,Vm]),f=new Set([Oi,ua,Pl,zl,Fm,Hm]),v=new Uint32Array(4),M=new Int32Array(4),y=new $;let U=null,C=null;const T=[],x=[];let w=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=la,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const D=this;let O=!1,I=null,z=null,G=null,k=null;this._outputColorSpace=Ai;let B=0,F=0,P=null,X=-1,pt=null;const Tt=new fn,Lt=new fn;let ae=null;const Jt=new we(0);let se=0,ht=n.width,tt=n.height,K=1,Et=null,Pt=null;const Ht=new fn(0,0,ht,tt),be=new fn(0,0,ht,tt);let $t=!1;const Ee=new mS;let ve=!1,Zt=!1;const ce=new nn,te=new $,Ie=new fn,Ze={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let re=!1;function It(){return P===null?K:1}let H=i;function he(A,j){return n.getContext(A,j)}try{const A={alpha:!0,depth:a,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Im}`),n.addEventListener("webglcontextlost",Te,!1),n.addEventListener("webglcontextrestored",Be,!1),n.addEventListener("webglcontextcreationerror",Dn,!1),H===null){const j="webgl2";if(H=he(j,A),H===null)throw he(j)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}}catch(A){throw ze("WebGLRenderer: "+A.message),A}let oe,b,_,Y,Q,st,St,wt,ot,Z,ft,vt,xt,Mt,Gt,Wt,ne,V,At,ut,lt,Ot,_t;function qt(){oe=new W2(H),oe.init(),lt=new z3(H,oe),b=new I2(H,oe,t,lt),_=new O3(H,oe),b.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),z=H.createFramebuffer(),G=H.createFramebuffer(),k=H.createFramebuffer(),Y=new j2(H),Q=new y3,st=new P3(H,oe,_,Q,b,lt,Y),St=new X2(D),wt=new J1(H),Ot=new P2(H,wt),ot=new q2(H,wt,Y,Ot),Z=new K2(H,ot,wt,Ot,Y),V=new Z2(H,b,st),Gt=new B2(Q),ft=new x3(D,St,oe,b,Ot,Gt),vt=new V3(D,Q),xt=new M3,Mt=new C3(oe),ne=new O2(D,St,_,Z,g,l),Wt=new L3(D,Z,b),_t=new k3(H,Y,b,_),At=new z2(H,oe,Y),ut=new Y2(H,oe,Y),Y.programs=ft.programs,D.capabilities=b,D.extensions=oe,D.properties=Q,D.renderLists=xt,D.shadowMap=Wt,D.state=_,D.info=Y}qt(),S!==Oi&&(w=new J2(S,n.width,n.height,o,a,s));const Vt=new H3(D,H);this.xr=Vt,this.getContext=function(){return H},this.getContextAttributes=function(){return H.getContextAttributes()},this.forceContextLoss=function(){const A=oe.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){const A=oe.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return K},this.setPixelRatio=function(A){A!==void 0&&(K=A,this.setSize(ht,tt,!1))},this.getSize=function(A){return A.set(ht,tt)},this.setSize=function(A,j,at=!0){if(Vt.isPresenting){le("WebGLRenderer: Can't change size while VR device is presenting.");return}ht=A,tt=j,n.width=Math.floor(A*K),n.height=Math.floor(j*K),at===!0&&(n.style.width=A+"px",n.style.height=j+"px"),w!==null&&w.setSize(n.width,n.height),this.setViewport(0,0,A,j)},this.getDrawingBufferSize=function(A){return A.set(ht*K,tt*K).floor()},this.setDrawingBufferSize=function(A,j,at){ht=A,tt=j,K=at,n.width=Math.floor(A*at),n.height=Math.floor(j*at),this.setViewport(0,0,A,j)},this.setEffects=function(A){if(S===Oi){ze("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(A){for(let j=0;j<A.length;j++)if(A[j].isOutputPass===!0){le("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}w.setEffects(A||[])},this.getCurrentViewport=function(A){return A.copy(Tt)},this.getViewport=function(A){return A.copy(Ht)},this.setViewport=function(A,j,at,J){A.isVector4?Ht.set(A.x,A.y,A.z,A.w):Ht.set(A,j,at,J),_.viewport(Tt.copy(Ht).multiplyScalar(K).round())},this.getScissor=function(A){return A.copy(be)},this.setScissor=function(A,j,at,J){A.isVector4?be.set(A.x,A.y,A.z,A.w):be.set(A,j,at,J),_.scissor(Lt.copy(be).multiplyScalar(K).round())},this.getScissorTest=function(){return $t},this.setScissorTest=function(A){_.setScissorTest($t=A)},this.setOpaqueSort=function(A){Et=A},this.setTransparentSort=function(A){Pt=A},this.getClearColor=function(A){return A.copy(ne.getClearColor())},this.setClearColor=function(){ne.setClearColor(...arguments)},this.getClearAlpha=function(){return ne.getClearAlpha()},this.setClearAlpha=function(){ne.setClearAlpha(...arguments)},this.clear=function(A=!0,j=!0,at=!0){let J=0;if(A){let et=!1;if(P!==null){const zt=P.texture.format;et=m.has(zt)}if(et){const zt=P.texture.type,E=f.has(zt),R=ne.getClearColor(),N=ne.getClearAlpha(),W=R.r,q=R.g,nt=R.b;E?(v[0]=W,v[1]=q,v[2]=nt,v[3]=N,H.clearBufferuiv(H.COLOR,0,v)):(M[0]=W,M[1]=q,M[2]=nt,M[3]=N,H.clearBufferiv(H.COLOR,0,M))}else J|=H.COLOR_BUFFER_BIT}j&&(J|=H.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),at&&(J|=H.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),J!==0&&H.clear(J)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(A){A.setRenderer(this),I=A},this.dispose=function(){n.removeEventListener("webglcontextlost",Te,!1),n.removeEventListener("webglcontextrestored",Be,!1),n.removeEventListener("webglcontextcreationerror",Dn,!1),ne.dispose(),xt.dispose(),Mt.dispose(),Q.dispose(),St.dispose(),Z.dispose(),Ot.dispose(),_t.dispose(),ft.dispose(),Vt.dispose(),Vt.removeEventListener("sessionstart",li),Vt.removeEventListener("sessionend",Hn),Qn.stop()};function Te(A){A.preventDefault(),H0("WebGLRenderer: Context Lost."),O=!0}function Be(){H0("WebGLRenderer: Context Restored."),O=!1;const A=Y.autoReset,j=Wt.enabled,at=Wt.autoUpdate,J=Wt.needsUpdate,et=Wt.type;qt(),Y.autoReset=A,Wt.enabled=j,Wt.autoUpdate=at,Wt.needsUpdate=J,Wt.type=et}function Dn(A){ze("WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Nn(A){const j=A.target;j.removeEventListener("dispose",Nn),Ne(j)}function Ne(A){Si(A),Q.remove(A)}function Si(A){const j=Q.get(A).programs;j!==void 0&&(j.forEach(function(at){ft.releaseProgram(at)}),A.isShaderMaterial&&ft.releaseShaderCache(A))}this.renderBufferDirect=function(A,j,at,J,et,zt){j===null&&(j=Ze);const E=et.isMesh&&et.matrixWorld.determinantAffine()<0,R=pa(A,j,at,J,et);_.setMaterial(J,E);let N=at.index,W=1;if(J.wireframe===!0){if(N=ot.getWireframeAttribute(at),N===void 0)return;W=2}const q=at.drawRange,nt=at.attributes.position;let it=q.start*W,dt=(q.start+q.count)*W;zt!==null&&(it=Math.max(it,zt.start*W),dt=Math.min(dt,(zt.start+zt.count)*W)),N!==null?(it=Math.max(it,0),dt=Math.min(dt,N.count)):nt!=null&&(it=Math.max(it,0),dt=Math.min(dt,nt.count));const mt=dt-it;if(mt<0||mt===1/0)return;Ot.setup(et,J,R,at,N);let bt,Rt=At;if(N!==null&&(bt=wt.get(N),Rt=ut,Rt.setIndex(bt)),et.isMesh)J.wireframe===!0?(_.setLineWidth(J.wireframeLinewidth*It()),Rt.setMode(H.LINES)):Rt.setMode(H.TRIANGLES);else if(et.isLine){let yt=J.linewidth;yt===void 0&&(yt=1),_.setLineWidth(yt*It()),et.isLineSegments?Rt.setMode(H.LINES):et.isLineLoop?Rt.setMode(H.LINE_LOOP):Rt.setMode(H.LINE_STRIP)}else et.isPoints?Rt.setMode(H.POINTS):et.isSprite&&Rt.setMode(H.TRIANGLES);if(et.isBatchedMesh)if(oe.get("WEBGL_multi_draw"))Rt.renderMultiDraw(et._multiDrawStarts,et._multiDrawCounts,et._multiDrawCount);else{const yt=et._multiDrawStarts,ct=et._multiDrawCounts,Yt=et._multiDrawCount,Ct=N?wt.get(N).bytesPerElement:1,kt=Q.get(J).currentProgram.getUniforms();for(let jt=0;jt<Yt;jt++)kt.setValue(H,"_gl_DrawID",jt),Rt.render(yt[jt]/Ct,ct[jt])}else if(et.isInstancedMesh)Rt.renderInstances(it,mt,et.count);else if(at.isInstancedBufferGeometry){const yt=at._maxInstanceCount!==void 0?at._maxInstanceCount:1/0,ct=Math.min(at.instanceCount,yt);Rt.renderInstances(it,mt,ct)}else Rt.render(it,mt)};function tn(A,j,at){A.transparent===!0&&A.side===Ca&&A.forceSinglePass===!1?(A.side=si,A.needsUpdate=!0,Jn(A,j,at),A.side=Rs,A.needsUpdate=!0,Jn(A,j,at),A.side=Ca):Jn(A,j,at)}this.compile=function(A,j,at=null){at===null&&(at=A),C=Mt.get(at),C.init(j),x.push(C),at.traverseVisible(function(et){et.isLight&&et.layers.test(j.layers)&&(C.pushLight(et),et.castShadow&&C.pushShadow(et))}),A!==at&&A.traverseVisible(function(et){et.isLight&&et.layers.test(j.layers)&&(C.pushLight(et),et.castShadow&&C.pushShadow(et))}),C.setupLights();const J=new Set;return A.traverse(function(et){if(!(et.isMesh||et.isPoints||et.isLine||et.isSprite))return;const zt=et.material;if(zt)if(Array.isArray(zt))for(let E=0;E<zt.length;E++){const R=zt[E];tn(R,at,et),J.add(R)}else tn(zt,at,et),J.add(zt)}),C=x.pop(),J},this.compileAsync=function(A,j,at=null){const J=this.compile(A,j,at);return new Promise(et=>{function zt(){if(J.forEach(function(E){Q.get(E).currentProgram.isReady()&&J.delete(E)}),J.size===0){et(A);return}setTimeout(zt,10)}oe.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let Ae=null;function Un(A){Ae&&Ae(A)}function li(){Qn.stop()}function Hn(){Qn.start()}const Qn=new SS;Qn.setAnimationLoop(Un),typeof self<"u"&&Qn.setContext(self),this.setAnimationLoop=function(A){Ae=A,Vt.setAnimationLoop(A),A===null?Qn.stop():Qn.start()},Vt.addEventListener("sessionstart",li),Vt.addEventListener("sessionend",Hn),this.render=function(A,j){if(j!==void 0&&j.isCamera!==!0){ze("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;I!==null&&I.renderStart(A,j);const at=Vt.enabled===!0&&Vt.isPresenting===!0,J=w!==null&&(P===null||at)&&w.begin(D,P);if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Vt.enabled===!0&&Vt.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Vt.cameraAutoUpdate===!0&&Vt.updateCamera(j),j=Vt.getCamera()),A.isScene===!0&&A.onBeforeRender(D,A,j,P),C=Mt.get(A,x.length),C.init(j),C.state.textureUnits=st.getTextureUnits(),x.push(C),ce.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),Ee.setFromProjectionMatrix(ce,ra,j.reversedDepth),Zt=this.localClippingEnabled,ve=Gt.init(this.clippingPlanes,Zt),U=xt.get(A,T.length),U.init(),T.push(U),Vt.enabled===!0&&Vt.isPresenting===!0){const E=D.xr.getDepthSensingMesh();E!==null&&Gi(E,j,-1/0,D.sortObjects)}Gi(A,j,0,D.sortObjects),U.finish(),D.sortObjects===!0&&U.sort(Et,Pt,j.reversedDepth),re=Vt.enabled===!1||Vt.isPresenting===!1||Vt.hasDepthSensing()===!1,re&&ne.addToRenderList(U,A),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),ve===!0&&Gt.beginShadows();const et=C.state.shadowsArray;if(Wt.render(et,A,j),ve===!0&&Gt.endShadows(),(J&&w.hasRenderPass())===!1){const E=U.opaque,R=U.transmissive;if(C.setupLights(),j.isArrayCamera){const N=j.cameras;if(R.length>0)for(let W=0,q=N.length;W<q;W++){const nt=N[W];Mi(E,R,A,nt)}re&&ne.render(A);for(let W=0,q=N.length;W<q;W++){const nt=N[W];ha(U,A,nt,nt.viewport)}}else R.length>0&&Mi(E,R,A,j),re&&ne.render(A),ha(U,A,j)}P!==null&&F===0&&(st.updateMultisampleRenderTarget(P),st.updateRenderTargetMipmap(P)),J&&w.end(D),A.isScene===!0&&A.onAfterRender(D,A,j),Ot.resetDefaultState(),X=-1,pt=null,x.pop(),x.length>0?(C=x[x.length-1],st.setTextureUnits(C.state.textureUnits),ve===!0&&Gt.setGlobalState(D.clippingPlanes,C.state.camera)):C=null,T.pop(),T.length>0?U=T[T.length-1]:U=null,I!==null&&I.renderEnd()};function Gi(A,j,at,J){if(A.visible===!1)return;if(A.layers.test(j.layers)){if(A.isGroup)at=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(j);else if(A.isLightProbeGrid)C.pushLightProbeGrid(A);else if(A.isLight)C.pushLight(A),A.castShadow&&C.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||Ee.intersectsSprite(A)){J&&Ie.setFromMatrixPosition(A.matrixWorld).applyMatrix4(ce);const E=Z.update(A),R=A.material;R.visible&&U.push(A,E,R,at,Ie.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||Ee.intersectsObject(A))){const E=Z.update(A),R=A.material;if(J&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),Ie.copy(A.boundingSphere.center)):(E.boundingSphere===null&&E.computeBoundingSphere(),Ie.copy(E.boundingSphere.center)),Ie.applyMatrix4(A.matrixWorld).applyMatrix4(ce)),Array.isArray(R)){const N=E.groups;for(let W=0,q=N.length;W<q;W++){const nt=N[W],it=R[nt.materialIndex];it&&it.visible&&U.push(A,E,it,at,Ie.z,nt)}}else R.visible&&U.push(A,E,R,at,Ie.z,null)}}const zt=A.children;for(let E=0,R=zt.length;E<R;E++)Gi(zt[E],j,at,J)}function ha(A,j,at,J){const{opaque:et,transmissive:zt,transparent:E}=A;C.setupLightsView(at),ve===!0&&Gt.setGlobalState(D.clippingPlanes,at),J&&_.viewport(Tt.copy(J)),et.length>0&&Qi(et,j,at),zt.length>0&&Qi(zt,j,at),E.length>0&&Qi(E,j,at),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Mi(A,j,at,J){if((at.isScene===!0?at.overrideMaterial:null)!==null)return;if(C.state.transmissionRenderTarget[J.id]===void 0){const it=oe.has("EXT_color_buffer_half_float")||oe.has("EXT_color_buffer_float");C.state.transmissionRenderTarget[J.id]=new ca(1,1,{generateMipmaps:!0,type:it?ka:Oi,minFilter:Xs,samples:Math.max(4,b.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ue.workingColorSpace})}const zt=C.state.transmissionRenderTarget[J.id],E=J.viewport||Tt;zt.setSize(E.z*D.transmissionResolutionScale,E.w*D.transmissionResolutionScale);const R=D.getRenderTarget(),N=D.getActiveCubeFace(),W=D.getActiveMipmapLevel();D.setRenderTarget(zt),D.getClearColor(Jt),se=D.getClearAlpha(),se<1&&D.setClearColor(16777215,.5),D.clear(),re&&ne.render(at);const q=D.toneMapping;D.toneMapping=la;const nt=J.viewport;if(J.viewport!==void 0&&(J.viewport=void 0),C.setupLightsView(J),ve===!0&&Gt.setGlobalState(D.clippingPlanes,J),Qi(A,at,J),st.updateMultisampleRenderTarget(zt),st.updateRenderTargetMipmap(zt),oe.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let dt=0,mt=j.length;dt<mt;dt++){const bt=j[dt],{object:Rt,geometry:yt,material:ct,group:Yt}=bt;if(ct.side===Ca&&Rt.layers.test(J.layers)){const Ct=ct.side;ct.side=si,ct.needsUpdate=!0,Vi(Rt,at,J,yt,ct,Yt),ct.side=Ct,ct.needsUpdate=!0,it=!0}}it===!0&&(st.updateMultisampleRenderTarget(zt),st.updateRenderTargetMipmap(zt))}D.setRenderTarget(R,N,W),D.setClearColor(Jt,se),nt!==void 0&&(J.viewport=nt),D.toneMapping=q}function Qi(A,j,at){const J=j.isScene===!0?j.overrideMaterial:null;for(let et=0,zt=A.length;et<zt;et++){const E=A[et],{object:R,geometry:N,group:W}=E;let q=E.material;q.allowOverride===!0&&J!==null&&(q=J),R.layers.test(at.layers)&&Vi(R,j,at,N,q,W)}}function Vi(A,j,at,J,et,zt){A.onBeforeRender(D,j,at,J,et,zt),A.modelViewMatrix.multiplyMatrices(at.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),et.onBeforeRender(D,j,at,J,A,zt),et.transparent===!0&&et.side===Ca&&et.forceSinglePass===!1?(et.side=si,et.needsUpdate=!0,D.renderBufferDirect(at,j,J,et,A,zt),et.side=Rs,et.needsUpdate=!0,D.renderBufferDirect(at,j,J,et,A,zt),et.side=Ca):D.renderBufferDirect(at,j,J,et,A,zt),A.onAfterRender(D,j,at,J,et,zt)}function Jn(A,j,at){j.isScene!==!0&&(j=Ze);const J=Q.get(A),et=C.state.lights,zt=C.state.shadowsArray,E=et.state.version,R=ft.getParameters(A,et.state,zt,j,at,C.state.lightProbeGridArray),N=ft.getProgramCacheKey(R);let W=J.programs;J.environment=A.isMeshStandardMaterial||A.isMeshLambertMaterial||A.isMeshPhongMaterial?j.environment:null,J.fog=j.fog;const q=A.isMeshStandardMaterial||A.isMeshLambertMaterial&&!A.envMap||A.isMeshPhongMaterial&&!A.envMap;J.envMap=St.get(A.envMap||J.environment,q),J.envMapRotation=J.environment!==null&&A.envMap===null?j.environmentRotation:A.envMapRotation,W===void 0&&(A.addEventListener("dispose",Nn),W=new Map,J.programs=W);let nt=W.get(N);if(nt!==void 0){if(J.currentProgram===nt&&J.lightsStateVersion===E)return qa(A,R),nt}else R.uniforms=ft.getUniforms(A),I!==null&&A.isNodeMaterial&&I.build(A,at,R),A.onBeforeCompile(R,D),nt=ft.acquireProgram(R,N),W.set(N,nt),J.uniforms=R.uniforms;const it=J.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(it.clippingPlanes=Gt.uniform),qa(A,R),J.needsLights=Ns(A),J.lightsStateVersion=E,J.needsLights&&(it.ambientLightColor.value=et.state.ambient,it.lightProbe.value=et.state.probe,it.directionalLights.value=et.state.directional,it.directionalLightShadows.value=et.state.directionalShadow,it.spotLights.value=et.state.spot,it.spotLightShadows.value=et.state.spotShadow,it.rectAreaLights.value=et.state.rectArea,it.ltc_1.value=et.state.rectAreaLTC1,it.ltc_2.value=et.state.rectAreaLTC2,it.pointLights.value=et.state.point,it.pointLightShadows.value=et.state.pointShadow,it.hemisphereLights.value=et.state.hemi,it.directionalShadowMatrix.value=et.state.directionalShadowMatrix,it.spotLightMatrix.value=et.state.spotLightMatrix,it.spotLightMap.value=et.state.spotLightMap,it.pointShadowMatrix.value=et.state.pointShadowMatrix),J.lightProbeGrid=C.state.lightProbeGridArray.length>0,J.currentProgram=nt,J.uniformsList=null,nt}function bi(A){if(A.uniformsList===null){const j=A.currentProgram.getUniforms();A.uniformsList=gu.seqWithValue(j.seq,A.uniforms)}return A.uniformsList}function qa(A,j){const at=Q.get(A);at.outputColorSpace=j.outputColorSpace,at.batching=j.batching,at.batchingColor=j.batchingColor,at.instancing=j.instancing,at.instancingColor=j.instancingColor,at.instancingMorph=j.instancingMorph,at.skinning=j.skinning,at.morphTargets=j.morphTargets,at.morphNormals=j.morphNormals,at.morphColors=j.morphColors,at.morphTargetsCount=j.morphTargetsCount,at.numClippingPlanes=j.numClippingPlanes,at.numIntersection=j.numClipIntersection,at.vertexAlphas=j.vertexAlphas,at.vertexTangents=j.vertexTangents,at.toneMapping=j.toneMapping}function Ds(A,j){if(A.length===0)return null;if(A.length===1)return A[0].texture!==null?A[0]:null;y.setFromMatrixPosition(j.matrixWorld);for(let at=0,J=A.length;at<J;at++){const et=A[at];if(et.texture!==null&&et.boundingBox.containsPoint(y))return et}return null}function pa(A,j,at,J,et){j.isScene!==!0&&(j=Ze),st.resetTextureUnits();const zt=j.fog,E=J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial?j.environment:null,R=P===null?D.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:Ue.workingColorSpace,N=J.isMeshStandardMaterial||J.isMeshLambertMaterial&&!J.envMap||J.isMeshPhongMaterial&&!J.envMap,W=St.get(J.envMap||E,N),q=J.vertexColors===!0&&!!at.attributes.color&&at.attributes.color.itemSize===4,nt=!!at.attributes.tangent&&(!!J.normalMap||J.anisotropy>0),it=!!at.morphAttributes.position,dt=!!at.morphAttributes.normal,mt=!!at.morphAttributes.color;let bt=la;J.toneMapped&&(P===null||P.isXRRenderTarget===!0)&&(bt=D.toneMapping);const Rt=at.morphAttributes.position||at.morphAttributes.normal||at.morphAttributes.color,yt=Rt!==void 0?Rt.length:0,ct=Q.get(J),Yt=C.state.lights;if(ve===!0&&(Zt===!0||A!==pt)){const de=A===pt&&J.id===X;Gt.setState(J,A,de)}let Ct=!1;J.version===ct.__version?(ct.needsLights&&ct.lightsStateVersion!==Yt.state.version||ct.outputColorSpace!==R||et.isBatchedMesh&&ct.batching===!1||!et.isBatchedMesh&&ct.batching===!0||et.isBatchedMesh&&ct.batchingColor===!0&&et.colorTexture===null||et.isBatchedMesh&&ct.batchingColor===!1&&et.colorTexture!==null||et.isInstancedMesh&&ct.instancing===!1||!et.isInstancedMesh&&ct.instancing===!0||et.isSkinnedMesh&&ct.skinning===!1||!et.isSkinnedMesh&&ct.skinning===!0||et.isInstancedMesh&&ct.instancingColor===!0&&et.instanceColor===null||et.isInstancedMesh&&ct.instancingColor===!1&&et.instanceColor!==null||et.isInstancedMesh&&ct.instancingMorph===!0&&et.morphTexture===null||et.isInstancedMesh&&ct.instancingMorph===!1&&et.morphTexture!==null||ct.envMap!==W||J.fog===!0&&ct.fog!==zt||ct.numClippingPlanes!==void 0&&(ct.numClippingPlanes!==Gt.numPlanes||ct.numIntersection!==Gt.numIntersection)||ct.vertexAlphas!==q||ct.vertexTangents!==nt||ct.morphTargets!==it||ct.morphNormals!==dt||ct.morphColors!==mt||ct.toneMapping!==bt||ct.morphTargetsCount!==yt||!!ct.lightProbeGrid!=C.state.lightProbeGridArray.length>0)&&(Ct=!0):(Ct=!0,ct.__version=J.version);let kt=ct.currentProgram;Ct===!0&&(kt=Jn(J,j,et),I&&J.isNodeMaterial&&I.onUpdateProgram(J,kt,ct));let jt=!1,Se=!1,fe=!1;const Xt=kt.getUniforms(),Kt=ct.uniforms;if(_.useProgram(kt.program)&&(jt=!0,Se=!0,fe=!0),J.id!==X&&(X=J.id,Se=!0),ct.needsLights){const de=Ds(C.state.lightProbeGridArray,et);ct.lightProbeGrid!==de&&(ct.lightProbeGrid=de,Se=!0)}if(jt||pt!==A){_.buffers.depth.getReversed()&&A.reversedDepth!==!0&&(A._reversedDepth=!0,A.updateProjectionMatrix()),Xt.setValue(H,"projectionMatrix",A.projectionMatrix),Xt.setValue(H,"viewMatrix",A.matrixWorldInverse);const _e=Xt.map.cameraPosition;_e!==void 0&&_e.setValue(H,te.setFromMatrixPosition(A.matrixWorld)),b.logarithmicDepthBuffer&&Xt.setValue(H,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(J.isMeshPhongMaterial||J.isMeshToonMaterial||J.isMeshLambertMaterial||J.isMeshBasicMaterial||J.isMeshStandardMaterial||J.isShaderMaterial)&&Xt.setValue(H,"isOrthographic",A.isOrthographicCamera===!0),pt!==A&&(pt=A,Se=!0,fe=!0)}if(ct.needsLights&&(Yt.state.directionalShadowMap.length>0&&Xt.setValue(H,"directionalShadowMap",Yt.state.directionalShadowMap,st),Yt.state.spotShadowMap.length>0&&Xt.setValue(H,"spotShadowMap",Yt.state.spotShadowMap,st),Yt.state.pointShadowMap.length>0&&Xt.setValue(H,"pointShadowMap",Yt.state.pointShadowMap,st)),et.isSkinnedMesh){Xt.setOptional(H,et,"bindMatrix"),Xt.setOptional(H,et,"bindMatrixInverse");const de=et.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),Xt.setValue(H,"boneTexture",de.boneTexture,st))}et.isBatchedMesh&&(Xt.setOptional(H,et,"batchingTexture"),Xt.setValue(H,"batchingTexture",et._matricesTexture,st),Xt.setOptional(H,et,"batchingIdTexture"),Xt.setValue(H,"batchingIdTexture",et._indirectTexture,st),Xt.setOptional(H,et,"batchingColorTexture"),et._colorsTexture!==null&&Xt.setValue(H,"batchingColorTexture",et._colorsTexture,st));const ke=at.morphAttributes;if((ke.position!==void 0||ke.normal!==void 0||ke.color!==void 0)&&V.update(et,at,kt),(Se||ct.receiveShadow!==et.receiveShadow)&&(ct.receiveShadow=et.receiveShadow,Xt.setValue(H,"receiveShadow",et.receiveShadow)),(J.isMeshStandardMaterial||J.isMeshLambertMaterial||J.isMeshPhongMaterial)&&J.envMap===null&&j.environment!==null&&(Kt.envMapIntensity.value=j.environmentIntensity),Kt.dfgLUT!==void 0&&(Kt.dfgLUT.value=W3()),Se){if(Xt.setValue(H,"toneMappingExposure",D.toneMappingExposure),ct.needsLights&&Ji(Kt,fe),zt&&J.fog===!0&&vt.refreshFogUniforms(Kt,zt),vt.refreshMaterialUniforms(Kt,J,K,tt,C.state.transmissionRenderTarget[A.id]),ct.needsLights&&ct.lightProbeGrid){const de=ct.lightProbeGrid;Kt.probesSH.value=de.texture,Kt.probesMin.value.copy(de.boundingBox.min),Kt.probesMax.value.copy(de.boundingBox.max),Kt.probesResolution.value.copy(de.resolution)}gu.upload(H,bi(ct),Kt,st)}if(J.isShaderMaterial&&J.uniformsNeedUpdate===!0&&(gu.upload(H,bi(ct),Kt,st),J.uniformsNeedUpdate=!1),J.isSpriteMaterial&&Xt.setValue(H,"center",et.center),Xt.setValue(H,"modelViewMatrix",et.modelViewMatrix),Xt.setValue(H,"normalMatrix",et.normalMatrix),Xt.setValue(H,"modelMatrix",et.matrixWorld),J.uniformsGroups!==void 0){const de=J.uniformsGroups;for(let _e=0,Me=de.length;_e<Me;_e++){const ye=de[_e];_t.update(ye,kt),_t.bind(ye,kt)}}return kt}function Ji(A,j){A.ambientLightColor.needsUpdate=j,A.lightProbe.needsUpdate=j,A.directionalLights.needsUpdate=j,A.directionalLightShadows.needsUpdate=j,A.pointLights.needsUpdate=j,A.pointLightShadows.needsUpdate=j,A.spotLights.needsUpdate=j,A.spotLightShadows.needsUpdate=j,A.rectAreaLights.needsUpdate=j,A.hemisphereLights.needsUpdate=j}function Ns(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return B},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(A,j,at){const J=Q.get(A);J.__autoAllocateDepthBuffer=A.resolveDepthBuffer===!1,J.__autoAllocateDepthBuffer===!1&&(J.__useRenderToTexture=!1),Q.get(A.texture).__webglTexture=j,Q.get(A.depthTexture).__webglTexture=J.__autoAllocateDepthBuffer?void 0:at,J.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(A,j){const at=Q.get(A);at.__webglFramebuffer=j,at.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(A,j=0,at=0){P=A,B=j,F=at;let J=null,et=!1,zt=!1;if(A){const R=Q.get(A);if(R.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(H.FRAMEBUFFER,R.__webglFramebuffer),Tt.copy(A.viewport),Lt.copy(A.scissor),ae=A.scissorTest,_.viewport(Tt),_.scissor(Lt),_.setScissorTest(ae),X=-1;return}else if(R.__webglFramebuffer===void 0)st.setupRenderTarget(A);else if(R.__hasExternalTextures)st.rebindTextures(A,Q.get(A.texture).__webglTexture,Q.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){const q=A.depthTexture;if(R.__boundDepthTexture!==q){if(q!==null&&Q.has(q)&&(A.width!==q.image.width||A.height!==q.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");st.setupDepthRenderbuffer(A)}}const N=A.texture;(N.isData3DTexture||N.isDataArrayTexture||N.isCompressedArrayTexture)&&(zt=!0);const W=Q.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(W[j])?J=W[j][at]:J=W[j],et=!0):A.samples>0&&st.useMultisampledRTT(A)===!1?J=Q.get(A).__webglMultisampledFramebuffer:Array.isArray(W)?J=W[at]:J=W,Tt.copy(A.viewport),Lt.copy(A.scissor),ae=A.scissorTest}else Tt.copy(Ht).multiplyScalar(K).floor(),Lt.copy(be).multiplyScalar(K).floor(),ae=$t;if(at!==0&&(J=z),_.bindFramebuffer(H.FRAMEBUFFER,J)&&_.drawBuffers(A,J),_.viewport(Tt),_.scissor(Lt),_.setScissorTest(ae),et){const R=Q.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_CUBE_MAP_POSITIVE_X+j,R.__webglTexture,at)}else if(zt){const R=j;for(let N=0;N<A.textures.length;N++){const W=Q.get(A.textures[N]);H.framebufferTextureLayer(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0+N,W.__webglTexture,at,R)}}else if(A!==null&&at!==0){const R=Q.get(A.texture);H.framebufferTexture2D(H.FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,R.__webglTexture,at)}X=-1},this.readRenderTargetPixels=function(A,j,at,J,et,zt,E,R=0){if(!(A&&A.isWebGLRenderTarget)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let N=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&E!==void 0&&(N=N[E]),N){_.bindFramebuffer(H.FRAMEBUFFER,N);try{const W=A.textures[R],q=W.format,nt=W.type;if(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+R),!b.textureFormatReadable(q)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!b.textureTypeReadable(nt)){ze("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=A.width-J&&at>=0&&at<=A.height-et&&H.readPixels(j,at,J,et,lt.convert(q),lt.convert(nt),zt)}finally{const W=P!==null?Q.get(P).__webglFramebuffer:null;_.bindFramebuffer(H.FRAMEBUFFER,W)}}},this.readRenderTargetPixelsAsync=async function(A,j,at,J,et,zt,E,R=0){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let N=Q.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&E!==void 0&&(N=N[E]),N)if(j>=0&&j<=A.width-J&&at>=0&&at<=A.height-et){_.bindFramebuffer(H.FRAMEBUFFER,N);const W=A.textures[R],q=W.format,nt=W.type;if(A.textures.length>1&&H.readBuffer(H.COLOR_ATTACHMENT0+R),!b.textureFormatReadable(q))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!b.textureTypeReadable(nt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const it=H.createBuffer();H.bindBuffer(H.PIXEL_PACK_BUFFER,it),H.bufferData(H.PIXEL_PACK_BUFFER,zt.byteLength,H.STREAM_READ),H.readPixels(j,at,J,et,lt.convert(q),lt.convert(nt),0);const dt=P!==null?Q.get(P).__webglFramebuffer:null;_.bindFramebuffer(H.FRAMEBUFFER,dt);const mt=H.fenceSync(H.SYNC_GPU_COMMANDS_COMPLETE,0);return H.flush(),await h1(H,mt,4),H.bindBuffer(H.PIXEL_PACK_BUFFER,it),H.getBufferSubData(H.PIXEL_PACK_BUFFER,0,zt),H.deleteBuffer(it),H.deleteSync(mt),zt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(A,j=null,at=0){const J=Math.pow(2,-at),et=Math.floor(A.image.width*J),zt=Math.floor(A.image.height*J),E=j!==null?j.x:0,R=j!==null?j.y:0;st.setTexture2D(A,0),H.copyTexSubImage2D(H.TEXTURE_2D,at,0,0,E,R,et,zt),_.unbindTexture()},this.copyTextureToTexture=function(A,j,at=null,J=null,et=0,zt=0){let E,R,N,W,q,nt,it,dt,mt;const bt=A.isCompressedTexture?A.mipmaps[zt]:A.image;if(at!==null)E=at.max.x-at.min.x,R=at.max.y-at.min.y,N=at.isBox3?at.max.z-at.min.z:1,W=at.min.x,q=at.min.y,nt=at.isBox3?at.min.z:0;else{const Kt=Math.pow(2,-et);E=Math.floor(bt.width*Kt),R=Math.floor(bt.height*Kt),A.isDataArrayTexture?N=bt.depth:A.isData3DTexture?N=Math.floor(bt.depth*Kt):N=1,W=0,q=0,nt=0}J!==null?(it=J.x,dt=J.y,mt=J.z):(it=0,dt=0,mt=0);const Rt=lt.convert(j.format),yt=lt.convert(j.type);let ct;j.isData3DTexture?(st.setTexture3D(j,0),ct=H.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(st.setTexture2DArray(j,0),ct=H.TEXTURE_2D_ARRAY):(st.setTexture2D(j,0),ct=H.TEXTURE_2D),_.activeTexture(H.TEXTURE0),_.pixelStorei(H.UNPACK_FLIP_Y_WEBGL,j.flipY),_.pixelStorei(H.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),_.pixelStorei(H.UNPACK_ALIGNMENT,j.unpackAlignment);const Yt=_.getParameter(H.UNPACK_ROW_LENGTH),Ct=_.getParameter(H.UNPACK_IMAGE_HEIGHT),kt=_.getParameter(H.UNPACK_SKIP_PIXELS),jt=_.getParameter(H.UNPACK_SKIP_ROWS),Se=_.getParameter(H.UNPACK_SKIP_IMAGES);_.pixelStorei(H.UNPACK_ROW_LENGTH,bt.width),_.pixelStorei(H.UNPACK_IMAGE_HEIGHT,bt.height),_.pixelStorei(H.UNPACK_SKIP_PIXELS,W),_.pixelStorei(H.UNPACK_SKIP_ROWS,q),_.pixelStorei(H.UNPACK_SKIP_IMAGES,nt);const fe=A.isDataArrayTexture||A.isData3DTexture,Xt=j.isDataArrayTexture||j.isData3DTexture;if(A.isDepthTexture){const Kt=Q.get(A),ke=Q.get(j),de=Q.get(Kt.__renderTarget),_e=Q.get(ke.__renderTarget);_.bindFramebuffer(H.READ_FRAMEBUFFER,de.__webglFramebuffer),_.bindFramebuffer(H.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Me=0;Me<N;Me++)fe&&(H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Q.get(A).__webglTexture,et,nt+Me),H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Q.get(j).__webglTexture,zt,mt+Me)),H.blitFramebuffer(W,q,E,R,it,dt,E,R,H.DEPTH_BUFFER_BIT,H.NEAREST);_.bindFramebuffer(H.READ_FRAMEBUFFER,null),_.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else if(et!==0||A.isRenderTargetTexture||Q.has(A)){const Kt=Q.get(A),ke=Q.get(j);_.bindFramebuffer(H.READ_FRAMEBUFFER,G),_.bindFramebuffer(H.DRAW_FRAMEBUFFER,k);for(let de=0;de<N;de++)fe?H.framebufferTextureLayer(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,Kt.__webglTexture,et,nt+de):H.framebufferTexture2D(H.READ_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,Kt.__webglTexture,et),Xt?H.framebufferTextureLayer(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,ke.__webglTexture,zt,mt+de):H.framebufferTexture2D(H.DRAW_FRAMEBUFFER,H.COLOR_ATTACHMENT0,H.TEXTURE_2D,ke.__webglTexture,zt),et!==0?H.blitFramebuffer(W,q,E,R,it,dt,E,R,H.COLOR_BUFFER_BIT,H.NEAREST):Xt?H.copyTexSubImage3D(ct,zt,it,dt,mt+de,W,q,E,R):H.copyTexSubImage2D(ct,zt,it,dt,W,q,E,R);_.bindFramebuffer(H.READ_FRAMEBUFFER,null),_.bindFramebuffer(H.DRAW_FRAMEBUFFER,null)}else Xt?A.isDataTexture||A.isData3DTexture?H.texSubImage3D(ct,zt,it,dt,mt,E,R,N,Rt,yt,bt.data):j.isCompressedArrayTexture?H.compressedTexSubImage3D(ct,zt,it,dt,mt,E,R,N,Rt,bt.data):H.texSubImage3D(ct,zt,it,dt,mt,E,R,N,Rt,yt,bt):A.isDataTexture?H.texSubImage2D(H.TEXTURE_2D,zt,it,dt,E,R,Rt,yt,bt.data):A.isCompressedTexture?H.compressedTexSubImage2D(H.TEXTURE_2D,zt,it,dt,bt.width,bt.height,Rt,bt.data):H.texSubImage2D(H.TEXTURE_2D,zt,it,dt,E,R,Rt,yt,bt);_.pixelStorei(H.UNPACK_ROW_LENGTH,Yt),_.pixelStorei(H.UNPACK_IMAGE_HEIGHT,Ct),_.pixelStorei(H.UNPACK_SKIP_PIXELS,kt),_.pixelStorei(H.UNPACK_SKIP_ROWS,jt),_.pixelStorei(H.UNPACK_SKIP_IMAGES,Se),zt===0&&j.generateMipmaps&&H.generateMipmap(ct),_.unbindTexture()},this.initRenderTarget=function(A){Q.get(A).__webglFramebuffer===void 0&&st.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?st.setTextureCube(A,0):A.isData3DTexture?st.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?st.setTexture2DArray(A,0):st.setTexture2D(A,0),_.unbindTexture()},this.resetState=function(){B=0,F=0,P=null,_.reset(),Ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ra}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Ue._getDrawingBufferColorSpace(t),n.unpackColorSpace=Ue._getUnpackColorSpace()}}function q3(e,t=300){if(!e||!Array.isArray(e.nodes)||!Array.isArray(e.edges))throw new Error("PlugBrain returned an invalid graph snapshot.");const n=e.nodes.filter(l=>l&&typeof l.id=="string"),i=n.slice().sort((l,c)=>l.id.localeCompare(c.id)).slice(0,t),a=new Set(i.map(l=>l.id)),r=[...new Set(i.map(l=>l.type||"unknown"))].sort().map((l,c)=>({id:l,name:l.replaceAll("_"," "),dark:`hsl(${c*137.508%360}, 48%, 77%)`,light:`hsl(${c*137.508%360}, 45%, 34%)`,anchor:[Math.cos(c*2.4),Math.sin(c*1.7),Math.sin(c*2.4)]})),o=Object.fromEntries(i.map(l=>{var c,d,h;return[l.id,{label:l.label||l.name||l.id,kind:l.type||"unknown",path:((c=l.properties)==null?void 0:c.path)||((d=l.properties)==null?void 0:d.filePath)||l.uri||"",status:((h=l.properties)==null?void 0:h.status)||"Im aktuellen Graph-Snapshot",prov:[l.id,l.updatedAt].filter(Boolean).join(" · ")}]}));return{CLUSTERS:r,META:o,NODES:i.map(l=>[l.id,l.type||"unknown",l.type==="file"?3:2,l.label||l.name||l.id]),EDGES:e.edges.filter(l=>a.has(l.sourceId)&&a.has(l.targetId)).map(l=>[l.sourceId,l.targetId,["links_to","references"].includes(l.type)?"rel":"pre"]),totalNodes:n.length,totalEdges:e.edges.length}}function Y3(e){const{CLUSTERS:t,NODES:n,EDGES:i,META:a}=q3(e);let s="dark";for(const D of t)D.color=D[s];const r=Object.fromEntries(t.map(D=>[D.id,D])),o=n.map(([D,O,I,z],G)=>({i:G,id:D,name:a[D].label,cid:O,w:I,desc:z,cluster:r[O],out:[],in:[],rel:[],x:0,y:0,z:0,vx:0,vy:0,vz:0,sx:0,sy:0,sz:0,vis:!0,alpha:1,scale:1})),l=Object.fromEntries(o.map(D=>[D.id,D]));for(const D of o)D.meta=a[D.id]||{};const c=[];for(const[D,O,I]of i){const z=l[D],G=l[O];if(!z||!G){console.warn("[atlas] Dropped invalid edge:",D,"→",O);continue}c.push({s:z,t:G,kind:I,i:c.length,alpha:1}),I==="pre"?(z.out.push(G),G.in.push(z)):(z.rel.push(G),G.rel.push(z))}const d=D=>D.out.length+D.in.length+D.rel.length,h=o.map(()=>[]);for(const D of c)h[D.s.i].push(D.t.i),h[D.t.i].push(D.s.i);const u=42;for(const D of t){const[O,I,z]=D.anchor,G=Math.hypot(O,I,z)||1;D.dir=[O/G,I/G,z/G]}const p=new Array(o.length).fill(-1);(function(){let O=!0,I=0;for(const z of o)z.in.length||(p[z.i]=0);for(;O&&I++<40;){O=!1;for(const z of o){let G=z.in.length?-1:0;for(const k of z.in)p[k.i]>=0&&(G=Math.max(G,p[k.i]+1));G>=0&&G!==p[z.i]&&(p[z.i]=G,O=!0)}}for(let z=0;z<p.length;z++)p[z]<0&&(p[z]=2)})();const g=Math.max(1,...p),S={atlas:[],shell:[],tier:[]};o.forEach((D,O)=>{const I=D.cluster.dir,z=1-Math.min(d(D),12)/26;S.atlas.push([I[0]*u*z,I[1]*u*z,I[2]*u*z]);const G=t.indexOf(D.cluster),k=o.filter(X=>X.cid===D.cid).indexOf(D),B=o.filter(X=>X.cid===D.cid).length,F=(G/t.length+k/B/t.length)*Math.PI*2,P=(k/B-.5)*1.5;S.shell.push([u*.95*Math.cos(P)*Math.cos(F),u*.95*Math.sin(P),u*.95*Math.cos(P)*Math.sin(F)]),S.tier.push([I[0]*u*.72,(p[O]/g-.5)*u*1.5,I[2]*u*.72])});let m="atlas";o.forEach((D,O)=>{const I=S.atlas[O];D.x=I[0]+(Math.random()-.5)*16,D.y=I[1]+(Math.random()-.5)*16,D.z=I[2]+(Math.random()-.5)*16});let f=1;const v=9,M=.04,y=130,U=.05;function C(){if(f<.004)return;const D=S[m];for(let O=0;O<o.length;O++){const I=o[O];for(let z=O+1;z<o.length;z++){const G=o[z];let k=I.x-G.x,B=I.y-G.y,F=I.z-G.z,P=k*k+B*B+F*F+.6;const X=y/P,pt=Math.sqrt(P);k/=pt,B/=pt,F/=pt,I.vx+=k*X,I.vy+=B*X,I.vz+=F*X,G.vx-=k*X,G.vy-=B*X,G.vz-=F*X}}for(const O of c){const I=O.s,z=O.t;let G=z.x-I.x,k=z.y-I.y,B=z.z-I.z;const F=Math.hypot(G,k,B)||1,P=(F-v)*M;G/=F,k/=F,B/=F,I.vx+=G*P,I.vy+=k*P,I.vz+=B*P,z.vx-=G*P,z.vy-=k*P,z.vz-=B*P}for(let O=0;O<o.length;O++){const I=o[O],z=D[O];I.vx+=(z[0]-I.x)*U,I.vy+=(z[1]-I.y)*U,I.vz+=(z[2]-I.z)*U;const G=.82;I.vx*=G,I.vy*=G,I.vz*=G,I.x+=I.vx*f,I.y+=I.vy*f,I.z+=I.vz*f}f*=.988}for(let D=0;D<220;D++)C();const T=46;function x(){let D=0;for(const O of o)D=Math.max(D,Math.hypot(O.x,O.y,O.z));return Math.max(10,D)/Math.sin(T*Math.PI/360)*.88}function w({els:D,emit:O}){const I=new AbortController,{signal:z}=I,G=(he,oe,b,_)=>he.addEventListener(oe,b,{..._,signal:z});let k=0;const{stage:B}=D;let F,P,X,pt,Tt,Lt,ae=!0;try{F=new wS({antialias:!0,alpha:!1,powerPreference:"high-performance"})}catch{ae=!1}if(F||(ae=!1),!ae)return O.gate(!0),{dispose(){}};{let Qi=function(rt,Nt){const Dt=Z.uniforms.uPx.value;for(const Bt of o){Mi.set(Bt.x,Bt.y,Bt.z);const Qt=X.position.distanceTo(Mi);Mi.project(X),Bt.sx=(Mi.x*.5+.5)*rt,Bt.sy=(-Mi.y*.5+.5)*Nt,Bt.sz=Mi.z,Bt.sr=Bt.size*Bt.scale*Dt/Math.max(Qt,1)*.5}},Ds=function(){Vi.fill(1),Jn.fill(1),bi.fill(1);const rt=qa,Nt=Dt=>!rt||Dt.name.toLowerCase().includes(rt)||Dt.desc.toLowerCase().includes(rt)||(Dt.meta.path||"").toLowerCase().includes(rt)||(Dt.meta.kind||"").toLowerCase().includes(rt);for(const Dt of o)Dt.vis=!Gi.has(Dt.cid)&&Nt(Dt),Dt.vis||(Vi[Dt.i]=0,Jn[Dt.i]=.6);for(const Dt of c)(!Dt.s.vis||!Dt.t.vis)&&(bi[Dt.i]=0);if(Un){for(const Dt of o)Dt.vis&&(Vi[Dt.i]=Un.has(Dt.i)?1:ha,Jn[Dt.i]=Un.has(Dt.i)?1.25:.8);for(const Dt of c)bi[Dt.i]&&(bi[Dt.i]=Un.has(Dt.s.i)&&Un.has(Dt.t.i)?1.35:ha*.5)}else if(Ae){const Dt=new Set([Ae.i,...h[Ae.i]]);for(const Bt of o)Bt.vis&&(Vi[Bt.i]=Dt.has(Bt.i)?1:ha,Jn[Bt.i]=Bt===Ae?1.75:Dt.has(Bt.i)?1.15:.75);for(const Bt of c)bi[Bt.i]&&(bi[Bt.i]=Bt.s===Ae||Bt.t===Ae?1.4:ha*.45)}return tn&&tn.vis&&(Vi[tn.i]=1,Jn[tn.i]=Math.max(Jn[tn.i],1.6)),{nT:Vi,sT:Jn,eT:bi}},pa=function(rt){Ae=rt,Un=null,D.pathbar.classList.remove("on"),lt.tx=rt.x,lt.ty=rt.y,lt.tz=rt.z,lt.tDist=Math.min(lt.tDist,ut*.72),Me(rt),Kt(),fe()},Ji=function(){Ae=null,Un=null,lt.tx=lt.ty=lt.tz=0,D.pathbar.classList.remove("on"),Me(null),Kt(),fe()},Ns=function(rt,Nt){const Dt=new Array(o.length).fill(-1),Bt=new Set([rt.i]),Qt=[rt.i];for(;Qt.length;){const En=Qt.shift();if(En===Nt.i)break;for(const Ke of h[En])!Bt.has(Ke)&&o[Ke].vis&&(Bt.add(Ke),Dt[Ke]=En,Qt.push(Ke))}if(!Bt.has(Nt.i)){D.chain.textContent="Keine Kausalkette zwischen diesen Objekten",D.pathbar.classList.add("on");return}const Pe=[];let ie=Nt.i;for(;ie!==-1&&(Pe.unshift(ie),ie!==rt.i);)ie=Dt[ie];Un=new Set(Pe),D.chain.textContent=Pe.map(En=>o[En].name).join(" → "),D.pathbar.classList.add("on"),fe()},A=function(){Un=null,D.pathbar.classList.remove("on"),fe()},zt=function(rt,Nt){let Dt=0;const Bt=new Set;Hn&&et.forEach(ie=>Bt.add(ie)),Ae&&(Bt.add(Ae.i),h[Ae.i].forEach(ie=>Bt.add(ie))),Un&&Un.forEach(ie=>Bt.add(ie)),tn&&Bt.add(tn.i);const Qt=[...Bt].map(ie=>o[ie]).filter(ie=>ie.vis&&ie.sz<1&&ie.sx>-60&&ie.sx<rt+60&&ie.sy>-20&&ie.sy<Nt+20).sort((ie,En)=>ie.sz-En.sz),Pe=[];for(const ie of Qt){if(Dt>=J.length)break;const En=ie.name.length*11.5+8,Ke=[ie.sx-En/2,ie.sy-18,En,16];if(Pe.some(Fe=>Ke[0]<Fe[0]+Fe[2]&&Ke[0]+Ke[2]>Fe[0]&&Ke[1]<Fe[1]+Fe[3]&&Ke[1]+Ke[3]>Fe[1]))continue;Pe.push(Ke);const ee=J[Dt++];ee.textContent=ie.name,ee.className="lab"+(ie===tn||ie===Ae?"":" sm"),ee.style.transform=`translate(-50%,-50%) translate(${ie.sx.toFixed(1)}px,${(ie.sy-17).toFixed(1)}px)`,ee.style.opacity=Math.min(1,ie.alpha*1.3),ee.style.color=ie===tn||ie===Ae?ie.cluster.color:""}for(;Dt<J.length;Dt++)J[Dt].style.opacity=0},mt=function(rt){k=requestAnimationFrame(mt);const Nt=Math.min(.05,(rt-E)/1e3);E=rt;const Dt=B.clientWidth,Bt=B.clientHeight;if(!Dt||!Bt)return;F.domElement.width!==Math.round(Dt*F.getPixelRatio())&&(F.setSize(Dt,Bt,!1),X.aspect=Dt/Bt,X.updateProjectionMatrix(),ot.uniforms.uPx.value=Z.uniforms.uPx.value=Bt/(2*Math.tan(X.fov*Math.PI/360))),C(),li&&(lt.tTheta+=Nt*.09);const Qt=1-Math.pow(.0016,Nt);if(lt.theta+=(lt.tTheta-lt.theta)*Qt,lt.phi+=(lt.tPhi-lt.phi)*Qt,lt.dist+=(lt.tDist-lt.dist)*Qt,lt.cx+=(lt.tx-lt.cx)*Qt,lt.cy+=(lt.ty-lt.cy)*Qt,lt.cz+=(lt.tz-lt.cz)*Qt,X.position.set(lt.cx+lt.dist*Math.sin(lt.phi)*Math.cos(lt.theta),lt.cy+lt.dist*Math.cos(lt.phi),lt.cz+lt.dist*Math.sin(lt.phi)*Math.sin(lt.theta)),X.lookAt(lt.cx,lt.cy,lt.cz),Qi(Dt,Bt),Si.live&&!Ot){let ee=null;for(const Fe of o){if(!Fe.vis||Fe.sz>1)continue;const mr=Fe.sx-Si.x,Jl=Fe.sy-Si.y,$l=Fe.sr+7;mr*mr+Jl*Jl>$l*$l||(!ee||Fe.sz<ee.sz)&&(ee=Fe)}ee!==tn&&(tn=ee,Te.style.cursor=ee?"pointer":"grab",fe())}const{nT:Pe,sT:ie,eT:En}=Ds(),Ke=1-Math.pow(.002,Nt);for(const ee of o)ee.alpha+=(Pe[ee.i]-ee.alpha)*Ke,ee.scale+=(ie[ee.i]-ee.scale)*Ke,W.array[ee.i*3]=ee.x,W.array[ee.i*3+1]=ee.y,W.array[ee.i*3+2]=ee.z,q.array[ee.i]=ee.alpha,nt.array[ee.i]=ee.scale;W.needsUpdate=q.needsUpdate=nt.needsUpdate=!0;for(const ee of c){ee.alpha+=(En[ee.i]-ee.alpha)*Ke;const Fe=ee.i*6;it.array[Fe]=ee.s.x,it.array[Fe+1]=ee.s.y,it.array[Fe+2]=ee.s.z,it.array[Fe+3]=ee.t.x,it.array[Fe+4]=ee.t.y,it.array[Fe+5]=ee.t.z,dt.array[ee.i*2]=dt.array[ee.i*2+1]=ee.alpha}it.needsUpdate=dt.needsUpdate=!0,At.uniforms.uTime.value=rt/1e3,At.uniforms.uFlow.value+=((Qn?1:0)-At.uniforms.uFlow.value)*Ke,zt(Dt,Bt),F.render(P,X),R+=1/Math.max(Nt,1e-4),N++,N>=30&&(D.sFps.textContent=Math.round(R/N),R=N=0)},bt=function(rt=.55){f=Math.max(f,rt)},Rt=function(rt){m=rt,D.hudMode.textContent={atlas:"GALAXIE · FREIER ORBIT",shell:"PLANET · OBERFLÄCHE",tier:"PIPELINE · KAUSALKETTE"}[m],bt(1)},Ct=function(){lt.tTheta=.7,lt.tPhi=1.15,lt.tDist=x(),Ji(),bt(.8),Dn()},kt=function(){O.tools({flow:Qn,label:Hn,spin:li})},jt=function(rt){s=rt,document.documentElement.dataset.theme=rt,O.theme(rt);const Nt=rt==="light";for(const Qt of t)Qt.color=Qt[rt];o.forEach((Qt,Pe)=>{const ie=he(Qt.cluster.color);_[Pe*3]=ie[0],_[Pe*3+1]=ie[1],_[Pe*3+2]=ie[2]}),St.getAttribute("aColor").needsUpdate=!0,c.forEach((Qt,Pe)=>{xt.set(he(Qt.s.cluster.color),Pe*6),xt.set(he(Qt.t.cluster.color),Pe*6+3)}),V.getAttribute("aColor").needsUpdate=!0;const Dt=Nt?Qs:jr;for(const Qt of[ot,Z,At])Qt.uniforms.uLight.value=Nt?1:0,Qt.blending=Dt,Qt.needsUpdate=!0;const Bt=Nt?16053489:328967;F.setClearColor(Bt,1),P.fog.color.setHex(Bt),P.fog.density=Nt?.0042:.0068,Kt(),Ae&&Me(Ae)},fe=function(){D.hudSel.textContent=Un?`Kausalkette · ${Un.size} Stationen`:Ae?Ae.name:tn?tn.name:"Nichts ausgewählt"},Xt=function(rt){Gi.has(rt)?Gi.delete(rt):Gi.add(rt),Kt(),bt(.4)},Kt=function(){const rt=D.q.value.trim().toLowerCase(),Nt=o.filter(Bt=>!Gi.has(Bt.cid)&&(!rt||Bt.name.toLowerCase().includes(rt)||Bt.desc.toLowerCase().includes(rt))).sort((Bt,Qt)=>d(Qt)-d(Bt));O.list({q:rt,rows:Nt.map(Bt=>({i:Bt.i,name:Bt.name,color:Bt.cluster.color,deg:d(Bt),on:Bt===Ae}))}),D.sNode.textContent=Nt.length;const Dt=c.filter(Bt=>Nt.includes(Bt.s)&&Nt.includes(Bt.t)).length;D.sEdge.textContent=Dt,D.sDeg.textContent=Nt.length?(Dt*2/Nt.length).toFixed(1):"0"},_e=function(rt){qa=rt.trim().toLowerCase(),Kt(),bt(.25)},Me=function(rt){O.drawer(rt&&{i:rt.i,name:rt.name,desc:rt.desc,cname:rt.cluster.name,color:rt.cluster.color,deg:d(rt),depth:p[rt.i],kind:rt.meta.kind||"",path:rt.meta.path||"",status:rt.meta.status||"",prov:rt.meta.prov||"",groups:[["Ursache · eingehend",rt.in,"IN"],["Wirkung · ausgehend",rt.out,"OUT"],["Assoziiert · Backlinks",rt.rel,"REL"]].filter(([,Nt])=>Nt.length).map(([Nt,Dt,Bt])=>({title:Nt,tag:Bt,items:Dt.map(Qt=>({i:Qt.i,name:Qt.name,color:Qt.cluster.color}))}))})},ye=function(rt){const Nt=o[rt],Dt=S[m],Bt=Dt[Nt.i].slice();for(let Qt=0;Qt<Dt.length;Qt++)Dt[Qt][0]-=Bt[0],Dt[Qt][1]-=Bt[1],Dt[Qt][2]-=Bt[2];lt.tx=lt.ty=lt.tz=0,bt(1)},Xe=function(rt){const Nt=o[rt];D.chain.textContent="Start bei "+Nt.name+" — Shift+Klick auf das Zielobjekt",D.pathbar.classList.add("on")};var Jt=Qi,se=Ds,ht=pa,tt=Ji,K=Ns,Et=A,Pt=zt,Ht=mt,be=bt,$t=Rt,Ee=Ct,ve=kt,Zt=jt,ce=fe,te=Xt,Ie=Kt,Ze=_e,re=Me,It=ye,H=Xe;F.setPixelRatio(Math.min(devicePixelRatio,2)),B.appendChild(F.domElement),P=new uS,P.fog=new jm(328967,.0068),X=new Di(T,1,1,1400);const he=rt=>{const Nt=new we(rt);return[Nt.r,Nt.g,Nt.b]},oe=o.length,b=new Float32Array(oe*3),_=new Float32Array(oe*3),Y=new Float32Array(oe),Q=new Float32Array(oe),st=new Float32Array(oe);o.forEach((rt,Nt)=>{const Dt=he(rt.cluster.color);_[Nt*3]=Dt[0],_[Nt*3+1]=Dt[1],_[Nt*3+2]=Dt[2],Y[Nt]=rt.size=.95+rt.w*.4,Q[Nt]=1,st[Nt]=1});const St=new Xn;St.setAttribute("position",new We(b,3)),St.setAttribute("aColor",new We(_,3)),St.setAttribute("aSize",new We(Y,1)),St.setAttribute("aAlpha",new We(Q,1)),St.setAttribute("aScale",new We(st,1));const wt=`
    attribute vec3 aColor; attribute float aSize; attribute float aAlpha; attribute float aScale;
    varying vec3 vColor; varying float vAlpha;
    uniform float uPx, uMul;
    void main(){
      vColor = aColor; vAlpha = aAlpha;
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = aSize * aScale * uMul * uPx / max(-mv.z, 1.0);
      gl_Position = projectionMatrix * mv;
    }`,ot=new Bn({uniforms:{uPx:{value:300},uMul:{value:2.7},uLight:{value:0}},vertexShader:wt,fragmentShader:`
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
      }`,transparent:!0,blending:jr,depthWrite:!1}),Z=new Bn({uniforms:{uPx:{value:300},uMul:{value:1},uLight:{value:0}},vertexShader:wt,fragmentShader:`
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
      }`,transparent:!0,blending:jr,depthWrite:!1});pt=new Np(St,ot),Tt=new Np(St,Z),pt.frustumCulled=!1,Tt.frustumCulled=!1,P.add(pt,Tt);const ft=c.length,vt=new Float32Array(ft*6),xt=new Float32Array(ft*6),Mt=new Float32Array(ft*2),Gt=new Float32Array(ft*2),Wt=new Float32Array(ft*2),ne=new Float32Array(ft*2);c.forEach((rt,Nt)=>{const Dt=he(rt.s.cluster.color),Bt=he(rt.t.cluster.color);xt.set(Dt,Nt*6),xt.set(Bt,Nt*6+3),Mt[Nt*2]=0,Mt[Nt*2+1]=1;const Qt=Nt*.6180339887%1;Gt[Nt*2]=Qt,Gt[Nt*2+1]=Qt,Wt[Nt*2]=Wt[Nt*2+1]=1,ne[Nt*2]=ne[Nt*2+1]=rt.kind==="pre"?1:0});const V=new Xn;V.setAttribute("position",new We(vt,3)),V.setAttribute("aColor",new We(xt,3)),V.setAttribute("aT",new We(Mt,1)),V.setAttribute("aSeed",new We(Gt,1)),V.setAttribute("aAlpha",new We(Wt,1)),V.setAttribute("aDir",new We(ne,1));const At=new Bn({uniforms:{uTime:{value:0},uFlow:{value:1},uLight:{value:0}},vertexShader:`
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
      }`,transparent:!0,blending:jr,depthWrite:!1});Lt=new mu(V,At),Lt.frustumCulled=!1,P.add(Lt);const ut=x(),lt={theta:.7,phi:1.15,dist:ut,tTheta:.7,tPhi:1.15,tDist:ut,tx:0,ty:0,tz:0,cx:0,cy:0,cz:0};let Ot=!1,_t=0,qt=0,Vt=0;const Te=F.domElement;G(Te,"pointerdown",rt=>{Ot=!0,Vt=0,_t=rt.clientX,qt=rt.clientY,Te.setPointerCapture(rt.pointerId)}),G(Te,"pointerup",rt=>{Ot=!1,Te.releasePointerCapture(rt.pointerId)}),G(Te,"pointermove",rt=>{const Nt=Te.getBoundingClientRect();if(Si.x=rt.clientX-Nt.left,Si.y=rt.clientY-Nt.top,Si.live=!0,!Ot)return;const Dt=rt.clientX-_t,Bt=rt.clientY-qt;Vt+=Math.abs(Dt)+Math.abs(Bt),_t=rt.clientX,qt=rt.clientY,lt.tTheta-=Dt*.0052,lt.tPhi=Math.max(.12,Math.min(Math.PI-.12,lt.tPhi-Bt*.0052)),li=!1,kt()}),G(Te,"pointerleave",()=>{Si.live=!1});const Be=D.zlvl,Dn=()=>{Be.textContent=Math.round(ut/lt.tDist*100)+"%"},Nn=rt=>{lt.tDist=Math.max(ut*.22,Math.min(ut*2.6,lt.tDist*rt)),Dn()};G(Te,"wheel",rt=>{rt.preventDefault(),Nn(1+Math.sign(rt.deltaY)*.11)},{passive:!1});const Ne=()=>{lt.tDist=ut,Dn()};Dn();const Si={x:-1,y:-1,live:!1};let tn=null,Ae=null,Un=null,li=!0,Hn=!0,Qn=!0;const Gi=new Set,ha=.12,Mi=new $;G(Te,"click",rt=>{if(!(Vt>5)){if(!tn){rt.shiftKey||Ji();return}if(rt.shiftKey&&Ae&&tn!==Ae){Ns(Ae,tn);return}pa(tn)}});const Vi=new Float32Array(o.length),Jn=new Float32Array(o.length),bi=new Float32Array(c.length);let qa="";const j=D.labels,at=14,J=Array.from({length:44},()=>{const rt=document.createElement("div");return rt.className="lab",rt.style.opacity=0,j.appendChild(rt),rt}),et=[...o].sort((rt,Nt)=>d(Nt)-d(rt)).slice(0,at).map(rt=>rt.i);let E=performance.now(),R=0,N=0;const W=St.getAttribute("position"),q=St.getAttribute("aAlpha"),nt=St.getAttribute("aScale"),it=V.getAttribute("position"),dt=V.getAttribute("aAlpha");k=requestAnimationFrame(mt);const yt=()=>{Qn=!Qn,kt()},ct=()=>{Hn=!Hn,kt()},Yt=()=>{li=!li,kt()},Se=()=>jt(s==="light"?"dark":"light");G(window,"keydown",rt=>{if(/^(INPUT|TEXTAREA)$/.test(rt.target.tagName)){rt.key==="Escape"&&rt.target.blur();return}rt.key==="Escape"?Ji():rt.key==="l"||rt.key==="L"?(Hn=!Hn,kt()):rt.key==="r"||rt.key==="R"?Ct():rt.key===" "?(rt.preventDefault(),li=!li,kt()):rt.key==="/"?(rt.preventDefault(),D.q.focus()):rt.key==="="||rt.key==="+"?Nn(1/1.18):(rt.key==="-"||rt.key==="_")&&Nn(1.18)});const ke=rt=>pa(o[rt]),de=rt=>{tn=rt===null?null:o[rt]};return jt(s),Kt(),Me(null),kt(),fe(),{setView:Rt,toggleFlow:yt,toggleLabel:ct,toggleSpin:Yt,reset:Ct,toggleTheme:Se,dolly:Nn,zoomReset:Ne,toggleCluster:Xt,selectAt:ke,hoverAt:de,setQuery:_e,clearPath:A,centerOn:ye,startPath:Xe,dispose(){I.abort(),cancelAnimationFrame(k),St.dispose(),V.dispose(),ot.dispose(),Z.dispose(),At.dispose(),F.dispose(),Te.remove(),D.labels.replaceChildren()}}}}return{CLUSTERS:t,nodes:o,edges:c,deg:d,createAtlas:w}}function DS(e){if(typeof e!="string"||e==="")return e;const t=e.split(/[\\/]/).filter(Boolean);return t.length>0?t[t.length-1]:e}const NS="plugbrain.workspace";function j3(){try{return localStorage.getItem(NS)||""}catch{return""}}function Z3(e){try{localStorage.setItem(NS,e)}catch{}}async function Bv(){const e=await fetch("/api/galaxy");if(!e.ok)throw new Error(`Galaxie: HTTP ${e.status}`);const t=await e.json();if(!(t!=null&&t.ok)||!Array.isArray(t.planets))throw new Error("Die Galaxie antwortet unvollständig.");return t.planets}async function K3(e,t){var a;const n=await fetch("/api/workspaces",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({root:e,name:t})});if(!n.ok){const s=await n.json().catch(()=>null);throw new Error((s==null?void 0:s.error)??`Registrieren: HTTP ${n.status}`)}const i=await n.json();if(!(i!=null&&i.ok)||!((a=i.workspace)!=null&&a.id))throw new Error("Registrieren: unvollständige Antwort.");return await US(i.workspace.id),i.workspace.id}async function US(e){const t=await fetch("/api/reindex",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({workspace:e})});if(!t.ok)throw new Error(`Indizieren: HTTP ${t.status}`);const n=await t.json();if(!(n!=null&&n.ok))throw new Error("Indizieren: unvollständige Antwort.");return n.result}const hn=[],hs=[],Ta=[],Il=[],yl={},Cn=[],vu=[],na=7.2,Kr=6,Bl=["--k1","--k2","--k3","--k4","--k5","--k6"],Qm=e=>getComputedStyle(document.documentElement).getPropertyValue(e).trim(),Q3=e=>e.agentColor||Qm(Bl[(e.ki??0)%Bl.length]),Fv=e=>Qm(Bl[e.ki%Bl.length]),LS=new Map;let OS="loc";function J3(e){OS=e}const $3=e=>{const t=Math.max(1,...hn.map(i=>i.loc)),n=Math.max(1,...hn.map(i=>i.usedBy.length));return e.dying?0:OS==="loc"?1.5+e.loc/t*26:1.5+e.usedBy.length/n*26},Op=new Set,tC=e=>(Op.add(e),()=>Op.delete(e)),Mo=()=>Op.forEach(e=>e());function Pp(e,t,n="ok"){vu.unshift({t:new Date,ws:e,msg:t,kind:n,id:Math.random().toString(36).slice(2)}),vu.length>60&&vu.pop()}function Af(){var o;let t=0,n=0,i=0;const a=Il.filter(l=>Cn.find(c=>c.id===l)),s=new Set;for(const l of a){const c=hn.filter(g=>g.dir===l&&!g.dying);if(!c.length&&((o=Cn.find(g=>g.id===l))!=null&&o.dying))continue;const d=Math.max(1,Math.ceil(Math.sqrt(Math.max(1,c.length)))),h=d*na+Kr,u=Math.max(1,Math.ceil(Math.max(1,c.length)/d))*na+Kr;n+h>74&&n>0&&(t+=i,n=0,i=0);let p=Ta.find(g=>g.dir===l);p||(p={dir:l,x:n+h/2,z:t+u/2,w:.01,h:.01},Ta.push(p)),Object.assign(p,{tx:n,tz:t,tw:h,th:u,cols:d}),s.add(l),n+=h,i=Math.max(i,u)}const r=Ta.filter(l=>s.has(l.dir));if(r.length){const l=Math.max(...r.map(d=>d.tx+d.tw))/2,c=Math.max(...r.map(d=>d.tz+d.th))/2;for(const d of r)d.tx-=l,d.tz-=c;for(const d of r)hn.filter(u=>u.dir===d.dir).forEach((u,p)=>{u.tx=d.tx+Kr/2+p%d.cols*na+na/2,u.tz=d.tz+Kr/2+Math.floor(p/d.cols)*na+na/2,u.x===void 0&&(u.x=u.tx,u.z=u.tz)})}for(let l=Ta.length-1;l>=0;l--)!s.has(Ta[l].dir)&&!hn.some(c=>c.dir===Ta[l].dir)&&Ta.splice(l,1);for(const l of a)LS.set(l,.5)}function eC(e,t,n=!1){let i=Cn.find(a=>a.id===e);return i||(i={id:e,name:t||e,ki:Cn.length,load:0,events:0,createdAt:new Date,dying:!1,sim:n},Cn.push(i),Il.includes(e)||Il.push(e),Pp(t||e,"workspace registered","reg"),Af(),Mo(),i)}function nC(e,{path:t,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}){const l=t.split("/").pop(),c=t.includes("/")&&t.startsWith(e.id+"/")?t:`${e.id}/${t}`;let d=yl[c];if(d)return d.loc+=Math.max(2,Math.round(n*.25)),d.pulse=1,s&&(d.agentColor=s,d.agentName=r,d.access=o),d;d={path:c,name:l,dir:e.id,top:e.id,ki:e.ki,loc:n,deps:[],usedBy:[],note:a,agentColor:s,agentName:r,access:o,x:void 0,z:void 0,h:0,pulse:1,dying:!1};for(let h of i){h.includes("/")||(h=`${e.id}/${h}`);const u=yl[h];u&&(d.deps.push(h),hs.push({from:d,to:u}),u.usedBy.push(c))}return hn.push(d),yl[c]=d,Af(),Mo(),d}function iC(){let e=!1;for(let t=hn.length-1;t>=0;t--){const n=hn[t];if(n.dying&&n.h<.25){hn.splice(t,1),delete yl[n.path],e=!0;for(let i=hs.length-1;i>=0;i--)(hs[i].from===n||hs[i].to===n)&&hs.splice(i,1);for(const i of hn){const a=i.deps.indexOf(n.path);a>=0&&i.deps.splice(a,1);const s=i.usedBy.indexOf(n.path);s>=0&&i.usedBy.splice(s,1)}}}for(let t=Cn.length-1;t>=0;t--){const n=Cn[t];if(n.dying&&!hn.some(i=>i.dir===n.id)){Cn.splice(t,1);const i=Il.indexOf(n.id);i>=0&&Il.splice(i,1),e=!0}}e&&(Af(),Mo())}setInterval(()=>{let e=!1;for(const t of Cn)t.load>.01&&(t.load*=.82,e=!0);e&&Mo()},600);const sl={register({id:e,name:t}={}){return e?eC(String(e),t&&String(t),!1):console.warn("[PlugBrainCity] register() needs an id")},grow(e,{path:t,loc:n=40,deps:i=[],note:a="",agentColor:s=null,agentName:r=null,access:o=null}={}){const l=Cn.find(c=>c.id===e);return!l||!t?console.warn("[PlugBrainCity] grow() needs a registered workspace id and a path"):(l.load=Math.min(1,l.load+.3),l.events++,nC(l,{path:t,loc:n,deps:i,note:a,agentColor:s,agentName:r,access:o}))},event(e,t){const n=Cn.find(a=>a.id===e);if(!n)return;const i=hn.filter(a=>a.dir===e&&!a.dying);i.length&&(i[Math.floor(Math.random()*i.length)].pulse=1),n.load=Math.min(1,n.load+.25),n.events++,Pp(n.name,String(t||"event")),Mo()},unregister(e){const t=Cn.find(n=>n.id===e);t&&(t.dying=!0,hn.filter(n=>n.dir===e).forEach(n=>{n.dying=!0}),Pp(t.name,"workspace unregistered","sys"),Af(),Mo())},list:()=>Cn.map(e=>({id:e.id,name:e.name,buildings:hn.filter(t=>t.dir===e.id).length})),simulated:()=>!1};window.PlugBrainCity=sl;const aC=1024,sC=2048,Hv=96,Gv=new Map;function rC(e){if(!e.agentColor)return null;const t=e.agentColor+(e.access||"");let n=Gv.get(t);if(!n){n=new we;const i=/hsl\(\s*([\d.]+)[\s,]+([\d.]+)%[\s,]+([\d.]+)%/.exec(e.agentColor);if(i){const a=e.access==="read"?Math.max(.18,+i[3]/100*.55):+i[3]/100;n.setHSL(+i[1]/360,+i[2]/100,a)}else try{n.set(e.agentColor)}catch{n.setHSL(0,0,.5)}Gv.set(t,n)}return n}function oC(e,t,n,{onSelect:i,onZoom:a}){let s;try{s=new wS({antialias:!0,alpha:!0,canvas:e})}catch{}if(!s)return null;s.setPixelRatio(Math.min(devicePixelRatio,2)),s.setClearColor(0,0);const r=new uS,o=new Km(-1,1,1,-1,-400,600),l=`
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
  }`,d=new rr(1,1,1),h=new Bn({uniforms:{uHatch:{value:1},uTime:{value:0}},vertexShader:l,fragmentShader:c});let u=aC,p=new iv(d,h,u);p.frustumCulled=!1;let g=new Zr(new Float32Array(u*3),3),S=new Zr(new Float32Array(u*2),2);d.setAttribute("aColor",g),d.setAttribute("aHi",S),r.add(p);const m=new G1(d),f=new gS({color:3814695,transparent:!0,opacity:.3});let v=[];for(let It=0;It<u;It++){const H=new mu(m,f);H.visible=!1,v.push(H),r.add(H)}const M=(It,H)=>{let he=Math.max(1,It);for(;he<H;)he*=2;return he};function y(It){if(It<=u)return;const H=M(u,It),he=p,oe=v,b=new iv(d,h,H);b.frustumCulled=!1,b.count=0;const _=new Zr(new Float32Array(H*3),3),Y=new Zr(new Float32Array(H*2),2);d.setAttribute("aColor",_),d.setAttribute("aHi",Y);const Q=[];for(let st=0;st<H;st++){const St=new mu(m,f);St.visible=!1,Q.push(St),r.add(St)}r.remove(he);for(const st of oe)r.remove(st);p=b,g=_,S=Y,v=Q,u=H}const U=()=>new Bn({uniforms:{},vertexShader:`varying vec3 vN; varying vec3 vW;
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
    }`}),C=[],T=new rr(1,1,1);for(let It=0;It<Hv;It++){const H=new Hi(T,U());H.visible=!1,C.push(H),r.add(H)}const x=3;let w=sC,D=new Float32Array(w*x*3),O=new Float32Array(w*x);const I=new Xn;I.setAttribute("position",new We(D,3)),I.setAttribute("aA",new We(O,1));const z=new Np(I,new Bn({uniforms:{uPx:{value:4}},vertexShader:`attribute float aA; varying float vA; uniform float uPx;
    void main(){ vA = aA;
      gl_PointSize = uPx;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){
      float d = length(gl_PointCoord - 0.5) * 2.0;
      if (d > 1.0 || vA <= 0.0) discard;
      gl_FragColor = vec4(0.35, 0.22, 0.12, (1.0 - d) * vA);
    }`,transparent:!0,depthWrite:!1}));z.frustumCulled=!1,r.add(z);let G=new Float32Array(w*6),k=new Float32Array(w*2);const B=new Xn;B.setAttribute("position",new We(G,3)),B.setAttribute("aA",new We(k,1));const F=new mu(B,new Bn({vertexShader:`attribute float aA; varying float vA;
    void main(){ vA = aA; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,fragmentShader:`precision mediump float; varying float vA;
    void main(){ gl_FragColor = vec4(0.30, 0.19, 0.10, vA); }`,transparent:!0,depthWrite:!1}));F.frustumCulled=!1,r.add(F);function P(It){It<=w||(w=M(w,It),D=new Float32Array(w*x*3),O=new Float32Array(w*x),G=new Float32Array(w*6),k=new Float32Array(w*2),I.setAttribute("position",new We(D,3)),I.setAttribute("aA",new We(O,1)),B.setAttribute("position",new We(G,3)),B.setAttribute("aA",new We(k,1)))}const X={yaw:Math.PI*.25,tYaw:Math.PI*.25,zoom:16,tZoom:16},pt=Math.atan(1/Math.SQRT2);let Tt=!1,Lt=0,ae=0,Jt=!0;const se={x:-1,y:-1,live:!1};e.addEventListener("pointerdown",It=>{Tt=!0,ae=0,Lt=It.clientX,e.setPointerCapture(It.pointerId),e.classList.add("drag")}),e.addEventListener("pointerup",It=>{Tt=!1,e.classList.remove("drag"),e.releasePointerCapture(It.pointerId)}),e.addEventListener("pointermove",It=>{const H=e.getBoundingClientRect();se.x=It.clientX-H.left,se.y=It.clientY-H.top,se.live=!0,Tt&&(ae+=Math.abs(It.clientX-Lt),X.tYaw-=(It.clientX-Lt)*.006,Lt=It.clientX,Jt=!1,Ee(!1))}),e.addEventListener("pointerleave",()=>{se.live=!1});const ht=X.tZoom,tt=()=>a(Math.round(ht/X.tZoom*100)),K=It=>{X.tZoom=Math.max(4,Math.min(60,X.tZoom*It)),tt()};e.addEventListener("wheel",It=>{It.preventDefault(),K(1+Math.sign(It.deltaY)*.11)},{passive:!1}),tt();let Et=null,Pt=null,Ht=null,be="",$t=null,Ee=()=>{};e.addEventListener("click",()=>{ae>5||i(Et&&Pt!==Et?Et:null)});const ve=Bl.map(It=>new we(Qm(It)||"#8a4b2a")),Zt=new $,ce=new nn,te=new we;let Ie=!0,Ze=performance.now();function re(It){requestAnimationFrame(re);const H=Math.min(.05,(It-Ze)/1e3);Ze=It;const he=t.clientWidth,oe=t.clientHeight;if(!he||!oe)return;e.width!==Math.round(he*s.getPixelRatio())&&s.setSize(he,oe,!1);const b=1-Math.pow(.002,H);iC(),y(hn.length),P(hs.length),Jt&&(X.tYaw+=H*.12),X.yaw+=(X.tYaw-X.yaw)*b,X.zoom+=(X.tZoom-X.zoom)*b;const _=X.zoom*4,Y=_*(he/oe);o.left=-Y,o.right=Y,o.top=_,o.bottom=-_,o.updateProjectionMatrix();const Q=180;o.position.set(Math.cos(X.yaw)*Math.cos(pt)*Q,Math.sin(pt)*Q,Math.sin(X.yaw)*Math.cos(pt)*Q),o.lookAt(0,6,0);for(let Z=0;Z<Hv;Z++){const ft=C[Z],vt=Ta[Z];if(!vt||Z>=Ta.length){ft.visible=!1;continue}vt.x=vt.x===void 0?vt.tx+vt.tw/2:vt.x,vt.z=vt.z===void 0?vt.tz+vt.th/2:vt.z;const xt=vt.tx+vt.tw/2,Mt=vt.tz+vt.th/2;vt.x+=(xt-vt.x)*b,vt.z+=(Mt-vt.z)*b,vt.w+=(vt.tw-vt.w)*b,vt.h+=(vt.th-vt.h)*b,ft.visible=!0,ft.position.set(vt.x,-.25,vt.z),ft.scale.set(Math.max(.01,vt.w-Kr*.45),.5,Math.max(.01,vt.h-Kr*.45))}const st=Pt?new Set([Pt.path,...Pt.deps,...Pt.usedBy]):null,St=Pt||Et||Ht,wt=hn.length;p.count=wt;for(let Z=0;Z<wt;Z++){const ft=hn[Z];ft.x!==ft.tx&&(ft.x+=(ft.tx-ft.x)*b*.7),ft.z!==ft.tz&&(ft.z+=(ft.tz-ft.z)*b*.7);const vt=$3(ft);ft.h=ft.h===void 0?vt:ft.h+(vt-ft.h)*(ft.dying?b*1.4:b*.6),ft.pulse=Math.max(0,(ft.pulse||0)-H*1.6),ce.makeScale(na*.68,Math.max(.01,ft.h),na*.68),ce.setPosition(ft.x,ft.h/2,ft.z),p.setMatrixAt(Z,ce);const xt=v[Z];xt.visible=!0,xt.scale.set(na*.68,Math.max(.01,ft.h),na*.68),xt.position.set(ft.x,ft.h/2,ft.z);const Mt=rC(ft);Mt?te.copy(Mt):te.copy(ve[(ft.ki??0)%ve.length]).offsetHSL(0,0,(LS.get(ft.dir)-.5)*.17),g.array[Z*3]=te.r,g.array[Z*3+1]=te.g,g.array[Z*3+2]=te.b;const Gt=ft===St?1:Math.min(.85,ft.pulse||0);let Wt=st?st.has(ft.path)?0:1:be&&!ft.path.toLowerCase().includes(be)?1:0;!st&&!be&&$t&&(Wt=ft.top===$t?0:1),S.array[Z*2]+=(Gt-S.array[Z*2])*b,S.array[Z*2+1]+=(Wt-S.array[Z*2+1])*b}for(let Z=wt;Z<u;Z++)v[Z].visible=!1;p.instanceMatrix.needsUpdate=!0,g.needsUpdate=S.needsUpdate=!0;const ot=hs.length;B.setDrawRange(0,ot*2),I.setDrawRange(0,ot*x);for(let Z=0;Z<ot;Z++){const ft=hs[Z],vt=ft.from,xt=ft.to,Mt=Z*6;G[Mt]=vt.x,G[Mt+1]=vt.h,G[Mt+2]=vt.z,G[Mt+3]=xt.x,G[Mt+4]=xt.h,G[Mt+5]=xt.z;const Gt=!st||st.has(vt.path)&&st.has(xt.path),Wt=Pt&&(vt===Pt||xt===Pt),ne=Wt?.55:Gt?.1:.02;k[Z*2]+=(ne-k[Z*2])*b,k[Z*2+1]=k[Z*2];for(let V=0;V<x;V++){const At=Z*x+V,ut=(It/2600+(Z*.37+V/x))%1,lt=Math.sin(ut*Math.PI)*Math.hypot(xt.x-vt.x,xt.z-vt.z)*.22;D[At*3]=vt.x+(xt.x-vt.x)*ut,D[At*3+1]=vt.h+(xt.h-vt.h)*ut+lt+1.2,D[At*3+2]=vt.z+(xt.z-vt.z)*ut,O[At]=(Ie?1:0)*(Wt?1:Gt?.45:.06)*Math.sin(ut*Math.PI)}}if(B.getAttribute("position").needsUpdate=!0,B.getAttribute("aA").needsUpdate=!0,I.getAttribute("position").needsUpdate=!0,I.getAttribute("aA").needsUpdate=!0,z.material.uniforms.uPx.value=3.4*s.getPixelRatio(),se.live&&!Tt){let Z=null,ft=26*26;for(let vt=0;vt<wt;vt++){const xt=hn[vt];if(xt.dying||xt.h<1)continue;Zt.set(xt.x,xt.h*.6,xt.z).project(o);const Mt=(Zt.x*.5+.5)*he,Gt=(-Zt.y*.5+.5)*oe,Wt=(Mt-se.x)**2+(Gt-se.y)**2;Wt<ft&&(ft=Wt,Z=xt,xt.sx=Mt,xt.sy=Gt)}Et=Z,e.style.cursor=Tt?"grabbing":Z?"pointer":"grab"}else se.live||(Et=null);Et?(n.style.display="block",n.style.left=Et.sx+"px",n.style.top=Et.sy+"px",n.innerHTML=`<b>${Et.name}</b> · ${Et.loc} lines<br>${Et.dir} · referenced by ${Et.usedBy.length}`):n.style.display="none",s.render(r,o)}return requestAnimationFrame(re),{setFlow:It=>{Ie=It},setHatch:It=>{h.uniforms.uHatch.value=It?1:0},setSpin:It=>{Jt=It},spinning:()=>Jt,onSpinChange:It=>{Ee=It},dolly:K,reset:()=>{X.tYaw=Math.PI*.25,X.tZoom=ht,tt()},setSel:It=>{Pt=It},setRailHover:It=>{Ht=It},setQuery:It=>{be=It},setFocusTop:It=>{$t=It}}}const Qo=new Map;function Vv(e){var n,i;const t=((n=e==null?void 0:e.properties)==null?void 0:n.path)||((i=e==null?void 0:e.properties)==null?void 0:i.filePath)||(e==null?void 0:e.uri);return typeof t=="string"&&t.length>0?t:null}function lC(e){var i,a,s;const t=((i=e==null?void 0:e.properties)==null?void 0:i.loc)??((a=e==null?void 0:e.properties)==null?void 0:a.lines)??((s=e==null?void 0:e.properties)==null?void 0:s.size),n=Number(t);return Number.isFinite(n)&&n>0?Math.min(4e3,Math.round(n)):40}function cC(e){var d;const t=e==null?void 0:e.workspace,n=(d=e==null?void 0:e.graph)==null?void 0:d.nodes;if(!(t!=null&&t.id)||!Array.isArray(n))return{workspaces:Qo.size,buildings:0,added:0};const i=String(t.id);if(!Qo.has(i)){sl.register({id:i,name:DS(t.name||i)}),Qo.set(i,new Set);for(const h of Cn.slice())h.sim&&h.id!==i&&sl.unregister(h.id)}const a=Qo.get(i),s=Array.isArray(e.graph.edges)?e.graph.edges:[],r=new Map(n.filter(h=>h&&typeof h.id=="string").map(h=>[h.id,h])),o=new Map;for(const h of s){const u=r.get(h==null?void 0:h.sourceId),p=r.get(h==null?void 0:h.targetId);if(!u||!p)continue;const g=Vv(p);g&&(o.has(u.id)||o.set(u.id,[]),o.get(u.id).push(g))}const l=[];for(const h of n){const u=Vv(h);u&&l.push({node:h,path:u})}l.sort((h,u)=>h.path.localeCompare(u.path));let c=0;for(const{node:h,path:u}of l){if(a.has(u))continue;a.add(u);const p=h.properties||{};sl.grow(i,{path:u,loc:lC(h),deps:o.get(h.id)||[],note:h.type||"",agentColor:p.agentColor||p.readerColor||null,agentName:p.agentName||p.readerName||null,access:p.agentColor?"write":p.readerColor?"read":null}),c+=1}return c>0&&sl.event(i,`${c} indexed object${c===1?"":"s"} added`),{workspaces:Qo.size,buildings:a.size,added:c,total:l.length,truncated:!1}}function uC({snapshot:e}){Ut.useEffect(()=>{e&&cC(e)},[e]);const[t,n]=Ut.useState(!0),[i,a]=Ut.useState("loc"),[s,r]=Ut.useState(!0),[o,l]=Ut.useState(!0),[c,d]=Ut.useState(!0),[h,u]=Ut.useState(100),[p,g]=Ut.useState(null),[S,m]=Ut.useState(""),[f,v]=Ut.useState(null),[M,y]=Ut.useState(!0),[,U]=Ut.useReducer(z=>z+1,0),C=Ut.useRef(null),T=Ut.useRef(null),x=Ut.useRef(null),w=Ut.useRef(null);Ut.useEffect(()=>{const z=oC(C.current,T.current,x.current,{onSelect:G=>g(G),onZoom:G=>u(G)});if(!z){n(!1);return}w.current=z,z.onSpinChange(G=>d(G))},[]),Ut.useEffect(()=>{const z=tC(()=>U());return()=>{z()}},[]),Ut.useEffect(()=>{var z;(z=w.current)==null||z.setSel(p)},[p]),Ut.useEffect(()=>{var z;(z=w.current)==null||z.setQuery(S)},[S]),Ut.useEffect(()=>{var z;(z=w.current)==null||z.setFocusTop(f)},[f]),Ut.useEffect(()=>{const z=G=>{var B,F;const k=G.target;if(/^(INPUT|TEXTAREA)$/.test(k.tagName)){G.key==="Escape"&&k.blur();return}G.key==="Escape"?(g(null),v(null)):G.key==="="||G.key==="+"?(B=w.current)==null||B.dolly(.8474576271186441):G.key==="-"||G.key==="_"?(F=w.current)==null||F.dolly(1.18):(G.key==="e"||G.key==="E")&&y(P=>!P)};return addEventListener("keydown",z),()=>removeEventListener("keydown",z)},[]);const D=hn.reduce((z,G)=>z+G.loc,0),O=Cn.reduce((z,G)=>z+G.events,0),I=(z,G)=>G.length?L.jsxs(L.Fragment,{children:[L.jsxs("h3",{children:[z+" ",L.jsx("span",{style:{color:"var(--faint)"},children:G.length})]}),G.map(k=>{const B=yl[k];return B&&L.jsxs("div",{className:"dep","data-p":k,onClick:()=>g(B),children:[L.jsx("span",{className:"sw",style:{background:Q3(B)}}),L.jsx("span",{children:k})]},k)})]}):null;return L.jsxs("div",{id:"app",className:p?void 0:"closed",children:[L.jsxs("aside",{children:[L.jsxs("div",{className:"hd",children:[L.jsx("h1",{children:"PlugBrain City"}),L.jsx("div",{className:"repo",id:"repo",children:"runtime addon · workspaces grow here"}),L.jsxs("div",{className:"kpis",children:[L.jsxs("div",{children:[L.jsx("b",{id:"k-ws",children:Cn.length}),L.jsx("i",{children:"workspaces"})]}),L.jsxs("div",{children:[L.jsx("b",{id:"k-bld",children:hn.length}),L.jsx("i",{children:"buildings"})]}),L.jsxs("div",{children:[L.jsx("b",{id:"k-ev",children:O}),L.jsx("i",{children:"events"})]})]})]}),L.jsx("div",{className:"q",children:L.jsx("input",{id:"q",type:"search",placeholder:"Search module…",spellCheck:!1,onChange:z=>m(z.target.value.trim().toLowerCase())})}),L.jsx("div",{className:"tree",id:"tree",children:Cn.length?Cn.map(z=>{const G=hn.filter(B=>B.dir===z.id),k=G.reduce((B,F)=>B+F.loc,0);return L.jsxs("div",{className:"ws"+(f===z.id?" on":"")+(z.dying?" dying":""),onClick:()=>v(B=>B===z.id?null:z.id),children:[L.jsxs("div",{className:"wsrow",children:[L.jsx("span",{className:"sw",style:{background:Fv(z)}}),L.jsx("span",{className:"nm",children:z.name}),z.sim?L.jsx("span",{className:"tag",children:"sim"}):null,L.jsxs("span",{className:"lc",children:[G.length," bld · ",k]})]}),L.jsx("div",{className:"loadbar",children:L.jsx("i",{style:{width:Math.round(z.load*100)+"%",background:Fv(z)}})})]},z.id)}):L.jsxs("div",{className:"empty",children:["No workspaces registered.",L.jsx("br",{}),L.jsx("br",{}),L.jsxs("code",{children:["PlugBrainCity.register(","{"," id, name ","}",")"]})]})})]}),L.jsxs("div",{id:"stage",ref:T,children:[L.jsx("canvas",{id:"cv",ref:C}),L.jsx("div",{id:"tip",ref:x}),L.jsxs("div",{id:"crumb",children:["PLUGBRAIN / ",L.jsx("b",{id:"crumb-t",children:p?p.path.toUpperCase():f?f.toUpperCase():"CITY OVERVIEW"})]}),M&&L.jsx("div",{id:"feed",children:vu.slice(0,9).map(z=>L.jsxs("div",{className:"fe",children:[L.jsx("span",{className:"ft",children:z.t.toLocaleTimeString("en-GB",{hour12:!1})}),L.jsx("span",{className:"fw",style:{color:"var(--accent)"},children:z.ws}),L.jsx("span",{className:"fm",children:z.msg})]},z.id))}),L.jsx("div",{id:"legend",children:L.jsx("div",{style:{color:"var(--faint)"},children:`district = workspace · building = module · height = ${i==="loc"?"size":"references"} · flashes = activity`})}),L.jsxs("div",{id:"bar",children:[[["loc","Height = size"],["dep","Height = references"]].map(([z,G])=>L.jsx("button",{className:"tb"+(i===z?" on":""),"data-h":z,type:"button",onClick:()=>{J3(z),a(z)},children:G},z)),L.jsx("div",{className:"vsep"}),L.jsx("button",{className:"tb"+(s?" on":""),id:"t-flow",type:"button",onClick:()=>{r(z=>{var G;return(G=w.current)==null||G.setFlow(!z),!z})},children:"Flow"}),L.jsx("button",{className:"tb"+(o?" on":""),id:"t-hatch",type:"button",onClick:()=>{l(z=>{var G;return(G=w.current)==null||G.setHatch(!z),!z})},children:"Hatching"}),L.jsx("button",{className:"tb"+(c?" on":""),id:"t-spin",type:"button",onClick:()=>{d(z=>{var G;return(G=w.current)==null||G.setSpin(!z),!z})},children:"Orbit"}),L.jsx("button",{className:"tb"+(M?" on":""),id:"t-feed",type:"button",title:"Toggle feed (E)",onClick:()=>y(z=>!z),children:"Feed"}),L.jsx("div",{className:"vsep"}),L.jsx("button",{className:"tb",id:"zout",type:"button",title:"Zoom out",onClick:()=>{var z;return(z=w.current)==null?void 0:z.dolly(1.18)},children:"−"}),L.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Reset zoom",onClick:()=>{var z;return(z=w.current)==null?void 0:z.reset()},children:h+"%"}),L.jsx("button",{className:"tb",id:"zin",type:"button",title:"Zoom in",onClick:()=>{var z;return(z=w.current)==null?void 0:z.dolly(1/1.18)},children:"＋"}),L.jsx("div",{className:"vsep"}),L.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var z;(z=w.current)==null||z.reset(),g(null),v(null)},children:"Reset"})]}),L.jsxs("div",{id:"gate",style:t?void 0:{display:"grid"},children:["WebGL is unavailable on this device.",L.jsx("br",{}),"The workspace registry remains available."]})]}),L.jsx("div",{id:"side",children:L.jsx("div",{id:"dt",children:p&&L.jsxs("div",{className:"dt",children:[L.jsx("div",{className:"kind",children:p.dir+"/"}),L.jsx("h2",{children:p.name}),p.note?L.jsx("div",{className:"note",children:p.note}):null,L.jsxs("dl",{children:[L.jsx("dt",{children:"Size"}),L.jsx("dd",{children:p.loc}),L.jsx("dt",{children:"References"}),L.jsx("dd",{children:p.deps.length}),L.jsx("dt",{children:"Referenced by"}),L.jsx("dd",{children:p.usedBy.length}),L.jsx("dt",{children:"Share of total"}),L.jsx("dd",{children:D?(p.loc/D*100).toFixed(1)+"%":"—"})]}),I("References",p.deps),I("Referenced by",p.usedBy)]})})})]})}function fC({getAgents:e,ROLES:t,STATES:n,LINK_R:i}){const a=["#8ab2d1","#aaf7b3","#ffc09a","#c6a1ce","#efedbd","#8ac1a0","#d6dee8","#e0a355","#9ec4b8","#b4aac8","#9db6cc","#c8ab9e","#7f9db8","#a8c8a0","#d1a3a3","#a3a3c8"],s=new Map;let r=0;function o(S){if(s.has(S))return s.get(S);const m=a[(S.n-1)%a.length],f={hue:m,rgb:m.match(/[0-9a-f]{2}/gi).map(v=>parseInt(v,16)).join(","),trail:[],last:null};return s.set(S,f),f}function l(S){s.delete(S)}const c=.45,d=42,h=26;function u(S){r+=S;for(const m of e()){const f=o(m);if(m.off)continue;const v=f.last,M=!v||Math.hypot(m.x-v.x,m.y-v.y)>h,y=!v||r-v.t>c;M&&y&&(f.trail.push({x:m.x,y:m.y,t:r,busy:m.task?1:0}),f.trail.length>d&&f.trail.shift(),f.last={x:m.x,y:m.y,t:r})}for(const m of[...s.keys()])e().includes(m)||l(m)}function p(S){S.save(),S.lineCap="round",S.lineJoin="round";for(const m of e()){const f=s.get(m);if(!f||f.trail.length<2)continue;const v=f.trail;for(let M=v.length-1;M>0;M--){const y=v[M],U=v[M-1],C=(r-y.t)/(d*c),T=Math.max(0,(1-C)*.34)*(y.busy?1:.55);T<.015||(S.strokeStyle=`rgba(${f.rgb},${T.toFixed(3)})`,S.lineWidth=y.busy?1.6:1,S.beginPath(),S.moveTo(U.x,U.y),S.lineTo(y.x,y.y),S.stroke())}}S.restore()}function g(){const S=[];for(const m of e()){const f=s.get(m)||o(m),v=t[m.ri],M=n[m.state];let y=0;for(const U of e())U!==m&&Math.hypot(m.x-U.x,m.y-U.y)<i&&y++;S.push({n:m.n,hue:f.hue,role:v.cn,tag:v.tag,roleColor:v.color,state:m.off?"OFFLINE":m.state,stateCn:m.off?"Offline":M.cn,task:m.task?"#"+m.task.id:null,queue:m.queue.length,util:m.span>0?m.busy/m.span:0,trail:f.trail.length,links:y,pos:[Math.round(m.x),Math.round(m.y)]})}return S.sort((m,f)=>m.n-f.n),S}return{step:u,draw:p,snapshot:g,register:o,forget:l,hueOf:S=>(s.get(S)||o(S)).hue}}function dC({els:e,emit:t}){const n=new AbortController,{signal:i}=n,a=(E,R,N,W)=>E.addEventListener(R,N,{...W,signal:i}),s=Math.PI*2,r=(E,R,N)=>E+(R-E)*N,o=E=>E-Math.floor(E),l=(E,R)=>{const N=Math.sin(E*12.9898+R*78.233)*43758.5453;return N-Math.floor(N)};function c(E,R){const N=Math.floor(E),W=Math.floor(R);let q=E-N,nt=R-W;q=q*q*(3-2*q),nt=nt*nt*(3-2*nt);const it=l(N,W),dt=l(N+1,W),mt=l(N,W+1),bt=l(N+1,W+1);return it+(dt-it)*q+(mt-it)*nt+(it-dt-mt+bt)*q*nt}function d(E,R){const N=Math.PI*(3-Math.sqrt(5)),W=1-2*(E+.5)/R,q=Math.sqrt(1-W*W),nt=E*N;return[q*Math.cos(nt),W,q*Math.sin(nt)]}const h=(E,R)=>Math.atan2(Math.sin(E-R),Math.cos(E-R));function u(E,R,N,W,q){const nt=Math.sin(R),it=Math.cos(R),dt=Math.sin(E),mt=Math.cos(E);return(bt,Rt,yt)=>{const ct=bt*mt+yt*dt,Yt=-bt*dt+yt*mt;return[N+ct*q,W-(Rt*it-Yt*nt)*q,Rt*nt+Yt*it]}}const p=(E,R)=>(E/300)**R;function g(E,R,N){const W=[];for(const q of E)(q.a??1)<.02||(q.r=Math.max(N,q.r),W.push(q));return W.sort((q,nt)=>q.z-nt.z),{dots:W,lines:R.filter(q=>(q.a??1)>=.02)}}function S(E,R,N){const W=E/2,q=W*.82,nt=u(R*.12,.3,W,W,1),it=p(E,N.rsPow),dt=[];for(let mt=0;mt<N.orbitN;mt++){const bt=l(mt,1.7),Rt=l(mt,5.2),yt=l(mt,8.9),ct=q*(.45+.52*bt),Yt=bt*s,Ct=Math.acos(2*Rt-1),kt=Math.sin(Ct)*Math.cos(Yt),jt=Math.cos(Ct),Se=Math.sin(Ct)*Math.sin(Yt);let fe=-jt,Xt=kt;const Kt=0,ke=Math.max(1e-6,Math.hypot(fe,Xt));fe/=ke,Xt/=ke;const de=jt*Kt-Se*Xt,_e=Se*fe-kt*Kt,Me=kt*Xt-jt*fe,ye=(.25+.55*yt)*(yt>.5?1:-1);for(let Xe=0;Xe<N.ghostN;Xe++){const rt=Xe/N.ghostN*s,Nt=Math.cos(rt),Dt=Math.sin(rt),[Bt,Qt,Pe]=nt((fe*Nt+de*Dt)*ct,(Xt*Nt+_e*Dt)*ct,(Kt*Nt+Me*Dt)*ct);dt.push({x:Bt,y:Qt,z:Pe,r:N.ghostR*it,white:.72,a:N.ghostA*(.4+.6*((Pe/ct+1)/2))})}for(let Xe=0;Xe<N.particles;Xe++){const rt=R*ye+Xe/N.particles*s+Rt*6,Nt=Math.cos(rt),Dt=Math.sin(rt),[Bt,Qt,Pe]=nt((fe*Nt+de*Dt)*ct,(Xt*Nt+_e*Dt)*ct,(Kt*Nt+Me*Dt)*ct),ie=(Pe/ct+1)/2;dt.push({x:Bt,y:Qt,z:Pe,r:(N.partR+N.partRDepth*ie)*it,white:.3-.22*ie})}}return g(dt,[],N.rMin)}function m(E,R,N){const q=E/2,nt=q*.82,it=u(R*.5,.4+.06*Math.sin(R*.35),q,q,nt),dt=R*(.5+(1.7-.5)*N.scanMul),mt=p(E,N.rsPow),bt=[];for(let Rt=0;Rt<=N.latRings;Rt++){const yt=-Math.PI/2+Rt/N.latRings*Math.PI,ct=Math.cos(yt),Yt=Math.sin(yt),Ct=Math.max(1,Math.round(Math.abs(ct)*N.lonDensity));for(let kt=0;kt<Ct;kt++){const jt=kt/Ct*s,[Se,fe,Xt]=it(ct*Math.cos(jt),Yt,ct*Math.sin(jt)),Kt=(Xt+1)/2,ke=h(jt+R*.5,dt),de=Math.exp(-(ke*ke)/.18)*Math.max(0,Xt);bt.push({x:Se,y:fe,z:Xt,r:(N.rBase+N.rDepth*Kt+N.rBoost*de)*mt,white:N.inkFar-N.inkSpan*Kt,a:N.dimBase+(1-N.dimBase)*Math.min(1,de)})}}return g(bt,[],N.rMin)}function f(E,R,N){const W=E/2,q=W*.82,nt=u(R*.55,.35+.1*Math.sin(R*.9),W,W,q),it=p(E,N.rsPow),dt=N.moveCount,mt=[];for(let jt=0;jt<dt;jt++){const Se=Math.min(2,Math.floor(l(jt,2.3)*3)),fe=-1+.5*Math.min(3,Math.floor(l(jt,5.9)*4));mt.push({axis:Se,lo:fe,hi:fe+.5,ang:(l(jt,7.7)<.5?1:-1)*Math.PI/2})}const bt=.42,Rt=1.2,yt=2*dt*bt+Rt,ct=R%yt,Yt=new Array(dt).fill(0);let Ct=-1;if(ct<2*dt*bt){const jt=Math.floor(ct/bt),Se=(ct-jt*bt)/bt,fe=1-(1-Math.min(1,Se/.7))**3;if(jt<dt){for(let Xt=0;Xt<jt;Xt++)Yt[Xt]=1;Yt[jt]=fe,Ct=jt}else{const Xt=2*dt-1-jt;for(let Kt=0;Kt<Xt;Kt++)Yt[Kt]=1;Yt[Xt]=1-fe,Ct=Xt}}const kt=[];for(let jt=0;jt<=N.latRings;jt++){const Se=-Math.PI/2+jt/N.latRings*Math.PI,fe=Math.cos(Se),Xt=Math.sin(Se),Kt=Math.max(1,Math.round(Math.abs(fe)*N.lonDensity));for(let ke=0;ke<Kt;ke++){const de=ke/Kt*s;let _e=fe*Math.cos(de),Me=Xt,ye=fe*Math.sin(de),Xe=!1;for(let Qt=0;Qt<dt;Qt++){if(Yt[Qt]<=0)continue;const Pe=mt[Qt],ie=Pe.axis===0?_e:Pe.axis===1?Me:ye;if(ie<Pe.lo||ie>=Pe.hi)continue;Qt===Ct&&(Xe=!0);const En=Pe.ang*Yt[Qt],Ke=Math.cos(En),ee=Math.sin(En);if(Pe.axis===0){const Fe=Me*Ke-ye*ee;ye=Me*ee+ye*Ke,Me=Fe}else if(Pe.axis===1){const Fe=_e*Ke+ye*ee;ye=-_e*ee+ye*Ke,_e=Fe}else{const Fe=_e*Ke-Me*ee;Me=_e*ee+Me*Ke,_e=Fe}}const[rt,Nt,Dt]=nt(_e,Me,ye),Bt=(Dt+1)/2;kt.push({x:rt,y:Nt,z:Dt,r:(N.rBase+N.rDepth*Bt+(Xe?N.rActive:0))*it,white:N.inkFar-N.inkSpan*Bt-(Xe?.14:0)})}}return g(kt,[],N.rMin)}function v(E,R,N){const W=E/2,q=W*.874,nt=u(R*.18,.38,W,W,1),it=p(E,N.rsPow),dt=[];for(let mt=0;mt<=N.rings;mt++){const bt=-Math.PI/2+mt/N.rings*Math.PI,Rt=Math.cos(bt),yt=Math.sin(bt),ct=.62*Math.sin(R*2.1-mt*.52)+.38*Math.sin(R*1.27+mt*.83),Yt=q*(.88+.105*ct),Ct=Math.max(1,Math.round(Math.abs(Rt)*N.lonDensity));for(let kt=0;kt<Ct;kt++){const jt=kt/Ct*s,[Se,fe,Xt]=nt(Rt*Math.cos(jt)*Yt,yt*Yt,Rt*Math.sin(jt)*Yt),Kt=(Xt/q+1)/2,ke=Math.max(0,ct);dt.push({x:Se,y:fe,z:Xt,r:(N.rBase+N.rDepth*Kt)*(1+.4*ke)*it,white:.66-.56*Kt-.1*ke})}}return g(dt,[],N.rMin)}function M(E,R,N){const W=E/2,q=W*.8,nt=u(R*.12,.32,W,W,q),it=p(E,N.rsPow),dt=N.nodeN,mt=[];for(let yt=0;yt<dt;yt++){const ct=d(yt,dt),Yt=ct[0]+.6*(c(yt*.31+9,R*.24)-.5),Ct=ct[1]+.6*(c(yt*.53+27,R*.21)-.5),kt=ct[2]+.6*(c(yt*.77+55,R*.27)-.5),jt=Math.hypot(Yt,Ct,kt);mt.push([Yt/jt,Ct/jt,kt/jt])}const bt=[],Rt=[];for(let yt=0;yt<dt;yt++)for(let ct=yt+1;ct<dt;ct++){const Yt=Math.hypot(mt[yt][0]-mt[ct][0],mt[yt][1]-mt[ct][1],mt[yt][2]-mt[ct][2]);if(Yt>=N.thr)continue;const[Ct,kt,jt]=nt(mt[yt][0],mt[yt][1],mt[yt][2]),[Se,fe,Xt]=nt(mt[ct][0],mt[ct][1],mt[ct][2]);bt.push({x1:Ct,y1:kt,x2:Se,y2:fe,white:.42,a:(1-Yt/N.thr)*(.3+.55*(((jt+Xt)/2+1)/2)),w:Math.max(.6,N.lineW*it)})}for(let yt=0;yt<dt;yt++){const[ct,Yt,Ct]=nt(mt[yt][0],mt[yt][1],mt[yt][2]),kt=(Ct+1)/2;Rt.push({x:ct,y:Yt,z:Ct,r:(N.nodeR+N.nodeRDepth*kt)*(1+.25*Math.sin(R*1.4+yt*2.7))*it,white:.55-.45*kt})}for(let yt=0;yt<N.signals;yt++){const ct=Math.floor(R*.55+yt*7.31),Yt=Math.floor(l(ct,yt*3.1+1.7)*dt),Ct=Math.floor(l(ct,yt*5.7+4.2)*dt);if(Yt===Ct)continue;const kt=o(R*.55+yt*7.31),jt=r(mt[Yt][0],mt[Ct][0],kt),Se=r(mt[Yt][1],mt[Ct][1],kt),fe=r(mt[Yt][2],mt[Ct][2],kt),Xt=Math.max(1e-6,Math.hypot(jt,Se,fe)),[Kt,ke,de]=nt(jt/Xt,Se/Xt,fe/Xt),_e=(de+1)/2;Rt.push({x:Kt,y:ke,z:de,r:(N.nodeR*1.5+N.nodeRDepth*_e)*it,white:.05,a:.5+.5*_e})}return g(Rt,bt,N.rMin)}function y(E,R,N){const W=E/2,q=W*.76,nt=u(R*.4,.3,W,W,1),it=p(E,N.rsPow),dt=[];for(let mt=0;mt<N.ghostN;mt++){const bt=d(mt,N.ghostN),[Rt,yt,ct]=nt(bt[0]*q,bt[1]*q,bt[2]*q);dt.push({x:Rt,y:yt,z:ct,r:.8*it,white:.78,a:.1+.22*((ct/q+1)/2)})}for(let mt=0;mt<3;mt++){const bt=mt/3*s;for(let Rt=0;Rt<N.strandN;Rt++){const yt=(o(Rt/N.strandN+R*.045)*2-1)*.96,ct=Math.sqrt(Math.max(0,1-yt*yt)),Yt=Math.min(1,(1-Math.abs(yt))/.1),Ct=yt*Math.PI*N.turns+bt,kt=1+.075*Math.sin(yt*Math.PI*N.turns*2+bt*2+R*.8),jt=ct*q*kt,[Se,fe,Xt]=nt(Math.cos(Ct)*jt,yt*q*kt,Math.sin(Ct)*jt),Kt=(Xt/q+1)/2;dt.push({x:Se,y:fe,z:Xt,r:(N.rBase+N.rDepth*Kt)*it,white:.55-.45*Kt,a:Yt*(.45+.55*Kt)})}}return g(dt,[],N.rMin)}function U(E,R,N){const W=E/2,q=W*.78,nt=N.spin,it=.3,dt=u(R*.1*nt,it,W,W,1),mt=p(E,N.rsPow),bt=[];for(let Me=0;Me<N.ghostN;Me++){const ye=d(Me,N.ghostN),[Xe,rt,Nt]=dt(ye[0]*q,ye[1]*q,ye[2]*q);bt.push({x:Xe,y:rt,z:Nt,r:.8*mt,white:.78,a:.1+.22*((Nt/q+1)/2)})}const Rt=R*.24*nt,yt=N.faceOn?-it:.55+.3*Math.sin(R*.18)*nt,ct=Math.cos(Rt),Yt=0,Ct=Math.sin(Rt),kt=-Ct*Math.sin(yt),jt=Math.cos(yt),Se=ct*Math.sin(yt),fe=Yt*Se-Ct*jt,Xt=Ct*kt-ct*Se,Kt=ct*jt-Yt*kt,ke=.23*N.wobMul,de=N.faceOn?q/(1+.85*ke):q,_e=Math.max(1,Math.round(N.lanes*N.bandMul));for(let Me=0;Me<_e;Me++){const ye=(Me-(_e-1)/2)*.075,Xe=Math.abs(Me-(_e-1)/2)/Math.max(1,(_e-1)/2);for(let rt=0;rt<N.segs;rt++){const Nt=rt/N.segs*s,Dt=(.16*Math.sin(Nt*3-R*1.7+Me*.22)+.07*Math.sin(Nt*5+R*1.1))*N.wobMul,Bt=N.faceOn?1+Dt:1,Qt=N.faceOn?ye:ye+Dt,Pe=Math.cos(Nt),ie=Math.sin(Nt),En=ct*Pe+kt*ie+fe*Qt,Ke=Yt*Pe+jt*ie+Xt*Qt,ee=Ct*Pe+Se*ie+Kt*Qt,Fe=Math.hypot(En,Ke,ee),mr=de*Bt,[Jl,$l,ig]=dt(En/Fe*mr,Ke/Fe*mr,ee/Fe*mr),Rf=(ig/q+1)/2;bt.push({x:Jl,y:$l,z:ig,r:(N.rBase+N.rDepth*Rf)*(1-.25*Xe)*mt,white:.52-.44*Rf+.18*Xe,a:.4+.6*Rf})}}return g(bt,[],N.rMin)}const C=E=>{const R=E.length,N=[];let W=0;for(let q=0;q<R;q++){const nt=Math.hypot(E[(q+1)%R][0]-E[q][0],E[(q+1)%R][1]-E[q][1]);N.push(nt),W+=nt}return q=>{let nt=q*W,it=0;for(;nt>N[it]&&it<R-1;)nt-=N[it],it++;const dt=E[it],mt=E[(it+1)%R],bt=N[it]?Math.min(1,nt/N[it]):0;return[dt[0]+(mt[0]-dt[0])*bt,dt[1]+(mt[1]-dt[1])*bt]}},T=[E=>{const R=-Math.PI/2+E*s;return[Math.cos(R)*.24,Math.sin(R)*.24]},C([[0,-.26],[.24,.16],[-.24,.16]]),C([[0,-.2],[.2,-.2],[.2,.2],[-.2,.2],[-.2,-.2]])];function x(E,R,N){const it=T.length,dt=R%(2.3*it),mt=Math.floor(dt/2.3),bt=dt-mt*2.3,Rt=bt>1.4?(bt-1.4)/.9:0,yt=Rt*Rt*(3-2*Rt),ct=T[mt],Yt=T[(mt+1)%it],Ct=160,kt=[],jt=[];for(let ye=0;ye<Ct;ye++){const Xe=ct(ye/Ct),rt=Yt(ye/Ct);kt.push([(Xe[0]+(rt[0]-Xe[0])*yt)*N.spread,(Xe[1]+(rt[1]-Xe[1])*yt)*N.spread])}let Se=0;for(let ye=0;ye<Ct;ye++){const Xe=Math.hypot(kt[(ye+1)%Ct][0]-kt[ye][0],kt[(ye+1)%Ct][1]-kt[ye][1]);jt.push(Xe),Se+=Xe}const fe=Math.max(6,Math.round(34*N.iconD)),Xt=N.rDot*1.35*N.spread,Kt=1+.02*Math.sin(bt*3.1),ke=E/2,de=[];let _e=0,Me=0;for(let ye=0;ye<fe;ye++){const Xe=ye/fe*Se;for(;Me+jt[_e]<Xe&&_e<Ct-1;)Me+=jt[_e],_e++;const rt=kt[_e],Nt=kt[(_e+1)%Ct],Dt=jt[_e]?Math.min(1,(Xe-Me)/jt[_e]):0;de.push({x:ke+(rt[0]+(Nt[0]-rt[0])*Dt)*Kt*E,y:ke+(rt[1]+(Nt[1]-rt[1])*Dt)*Kt*E,z:0,r:Math.max(.35,Xt*E),white:.1})}return g(de,[],N.rMin)}const w={globe:{latRings:17,lonDensity:44,rBase:.6,rDepth:1.7,rBoost:1,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},orbits:{orbitN:12,ghostN:40,ghostR:.9,ghostA:.5,particles:3,partR:1.2,partRDepth:1.6,rsPow:.6,rMin:.3},rubik:{latRings:15,lonDensity:40,moveCount:14,rBase:.6,rDepth:1.7,rActive:.3,inkFar:.62,inkSpan:.54,rsPow:.6,rMin:.3},wave:{rings:15,lonDensity:40,rBase:.6,rDepth:1.7,rsPow:.6,rMin:.3},web:{nodeN:30,thr:.72,signals:5,nodeR:1.4,nodeRDepth:1.8,lineW:.8,rsPow:.6,rMin:.3},braid:{strandN:52,turns:3,ghostN:150,rBase:1.2,rDepth:1.8,rsPow:.6,rMin:.3},ribbon:{lanes:5,segs:88,ghostN:150,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},ring:{lanes:5,segs:88,ghostN:0,faceOn:1,rBase:1.1,rDepth:1.7,rsPow:.6,rMin:.3},morph:{rDot:.021,iconD:1,rMin:.25}},D={orbits:{64:{speed:1.885,count:1,size:1},20:{speed:3.9,count:.238,size:2.4}},globe:{64:{speed:2.015,count:.42,size:1.15,x:{scanMul:4.08,dimBase:.45}},20:{speed:2.665,count:.105,size:1.75,x:{scanMul:4.335,dimBase:.45}}},rubik:{64:{speed:1.82,count:.35,size:1.05},20:{speed:1.95,count:.088,size:1.9}},wave:{64:{speed:4.388,count:.341,size:1},20:{speed:3.998,count:.105,size:1.6}},web:{64:{speed:3.315,count:1.35,size:.95},20:{speed:6.63,count:.25,size:1.52}},braid:{64:{speed:1.625,count:.5,size:1},20:{speed:2.75,count:.1125,size:1.36}},ribbon:{64:{speed:2.34,count:.25,size:.85,x:{spin:0,bandMul:3.9,wobMul:1}},20:{speed:3.12,count:.051,size:1.073,x:{spin:0,bandMul:4.94,wobMul:1}}},ring:{64:{speed:3.24,count:.25,size:.956,x:{spin:0,bandMul:3.627,wobMul:.368}},20:{speed:3.78,count:.028,size:1.622,x:{spin:0,bandMul:3.968,wobMul:.565}}},morph:{64:{speed:2.405,count:.702,size:.395,x:{spread:1.45}},20:{speed:2.08,count:.53,size:1.011,x:{spread:1.45}}}},O=[["latRings","lonDensity"],["rings","lonDensity"],["lanes","segs"]],I=["orbitN","ghostN","nodeN","strandN","signals"],z=["rBase","rDepth","rActive","rDot","ghostR","partR","partRDepth","nodeR","nodeRDepth"],G={orbits:S,globe:m,rubik:f,wave:v,web:M,braid:y,ribbon:U,ring:U,morph:x},k=new Map;function B(E,R){const N=E+R,W=k.get(N);if(W)return W;const q=D[E][R],nt={...w[E]},it=Math.sqrt(q.count),dt=new Set;for(const[bt,Rt]of O)nt[bt]!=null&&nt[Rt]!=null&&!dt.has(bt)&&!dt.has(Rt)&&(nt[bt]=Math.max(2,Math.round(nt[bt]*it)),nt[Rt]=Math.max(2,Math.round(nt[Rt]*it)),dt.add(bt),dt.add(Rt));for(const bt of I)nt[bt]!=null&&nt[bt]!==0&&!dt.has(bt)&&(nt[bt]=Math.max(1,Math.round(nt[bt]*q.count)));nt.iconD!=null&&(nt.iconD=Math.max(.02,nt.iconD*q.count));for(const bt of z)nt[bt]!=null&&(nt[bt]=nt[bt]*q.size);const mt={fn:G[E],speed:q.speed,opts:Object.assign({spin:1,faceOn:0,bandMul:1,wobMul:1,spread:1,scanMul:1,dimBase:1},nt,q.x||{})};return k.set(N,mt),mt}function F(E,R,N,W,q,nt){const it=B(R,N),dt=it.fn(N,W*it.speed,it.opts),[mt,bt,Rt]=q;for(const yt of dt.lines){const ct=1-Math.min(1,Math.max(0,yt.white));E.strokeStyle=`rgba(${ct*mt|0},${ct*bt|0},${ct*Rt|0},${(yt.a??1)*nt})`,E.lineWidth=yt.w,E.beginPath(),E.moveTo(yt.x1,yt.y1),E.lineTo(yt.x2,yt.y2),E.stroke()}for(const yt of dt.dots){const ct=1-Math.min(1,Math.max(0,yt.white));E.fillStyle=`rgba(${ct*mt|0},${ct*bt|0},${ct*Rt|0},${(yt.a??1)*nt})`,E.beginPath(),E.arc(yt.x,yt.y,yt.r,0,s),E.fill()}}const P={IDLE:{mode:"ring",cn:"Idle"},RECV:{mode:"wave",cn:"Receive"},PLAN:{mode:"morph",cn:"Plan"},SCAN:{mode:"globe",cn:"Retrieve"},EXEC:{mode:"orbits",cn:"Execute"},DBUG:{mode:"rubik",cn:"Debug"},SYNC:{mode:"web",cn:"Coordinate"},MERG:{mode:"braid",cn:"Merge"},WRIT:{mode:"ribbon",cn:"Compose"}},X=[{id:"plan",cn:"Planning",tag:"PLAN",color:"#d6dee8",prog:[["PLAN",.8],["SYNC",.5]],rework:0},{id:"find",cn:"Research",tag:"FIND",color:"#9db6cc",prog:[["SCAN",1.6],["WRIT",.8]],rework:0},{id:"code",cn:"Coding",tag:"CODE",color:"#9ec4b8",prog:[["EXEC",2.9],["DBUG",1.4]],rework:.1},{id:"crit",cn:"Review",tag:"CRIT",color:"#b4aac8",prog:[["SCAN",.8],["MERG",1.2]],rework:.18},{id:"ship",cn:"Delivery",tag:"SHIP",color:"#c8ab9e",prog:[["MERG",.7],["WRIT",.7]],rework:0}],pt={plan:1,find:2,code:3,crit:1,ship:1},Tt=16,Lt=210,ae=128,Jt=64,se=620,ht=178,tt=16;let K=[],Et=[],Pt=[],Ht=[],be=[],$t=0,Ee=0,ve=0,Zt=20,ce=1,te=null,Ie=0,Ze=0;const re={x:-9999,y:-9999,in:!1};let It=20260418;const H=()=>(It=It*1664525+1013904223>>>0)/4294967296,{field:he,glow:oe}=e,b=he.getContext("2d");let _=innerWidth,Y=innerHeight,Q=46;function st(E){const R=_>1080?268:240,N=_-Q,W=X.length;return{x:R+(E+.5)/W*(N-R),y:Y*.5-16,rx:Math.max(40,(N-R)/W*.33),ry:Math.max(60,Y*.28)}}const St=E=>{const R=st(E.ri);return{x:R.x+(H()-.5)*R.rx*2,y:R.y+(H()-.5)*R.ry*2}};function wt(E){const R=st(E),N={n:++ve,ri:E,x:R.x+(H()-.5)*R.rx*2,y:R.y+(H()-.5)*R.ry*2,head:H()*s,wp:null,phase:H()*40,state:"IDLE",task:null,step:0,left:0,queue:[],off:!1,busy:0,span:0,pulse:0,hist:new Array(28).fill(0),histT:0};return N.wp=St(N),N}let ot=!1;const Z=new Map,ft={PLANNED:"IDLE",RUNNING:"EXEC",BLOCKED:"DBUG",REVIEW:"SCAN",REPAIR:"DBUG",VERIFIED:"MERG",MERGED:"MERG",DONE:"WRIT"},vt={PLANNED:"plan",RUNNING:"code",BLOCKED:"code",REVIEW:"crit",REPAIR:"code",VERIFIED:"crit",MERGED:"ship",DONE:"ship"};function xt(){K=[],Et=[],Pt=[],Ht=[],be=[],$t=0,Ee=0,ve=0,Ze=0,X.forEach((E,R)=>{for(let N=0;N<pt[E.id];N++)K.push(wt(R))});for(let E=0;E<90*30;E++)qt(1/30)}function Mt(E){const R=K.filter(W=>W.ri===E&&!W.off);if(!R.length)return null;const N=R.filter(W=>W.state==="IDLE"&&!W.task&&!W.queue.length);return N.length?N[Math.floor(H()*N.length)]:R.reduce((W,q)=>q.queue.length<W.queue.length?q:W)}function Gt(E,R){const N=Mt(R);return N?(N.queue.push(E),N.pulse=1,!0):(Et.push({t:E,ri:R}),!1)}function Wt(E,R,N){const W=Mt(N);if(!W){Et.push({t:R,ri:N});return}Pt.push({from:E,to:W,task:R,f:0,back:N<E.ri})}function ne(E){const[R,N]=X[E.ri].prog[E.step];E.state=R,E.left=N*(.75+H()*.5)}const V=30;function At(E,R){if(E.off){E.state="IDLE";return}const N=Math.exp(-R/V);if(E.span=E.span*N+R,E.task?E.busy=E.busy*N+R:E.busy*=N,!E.task){if(!E.queue.length){E.state="IDLE";return}E.task=E.queue.shift(),E.state="RECV",E.left=.34,E.step=-1}if(E.left-=R,E.left>0)return;if(E.step<0){E.step=0,ne(E);return}if(E.step++,E.step<X[E.ri].prog.length){ne(E);return}const W=X[E.ri],q=E.task;if(E.task=null,E.step=0,E.state="IDLE",q.hops++,E.ri>0&&H()<W.rework){q.rework++,Wt(E,q,E.ri-1);return}if(E.ri===X.length-1){q.doneAt=$t,Ze++,be.push(q),be.length>80&&be.shift();return}Wt(E,q,E.ri+1)}const ut=.055,lt=Jt*1.42;function Ot(E,R){const N=!!E.task;(!E.wp||Math.hypot(E.wp.x-E.x,E.wp.y-E.y)<16)&&(E.wp=St(E));let W=E.wp.x,q=E.wp.y;if(re.in){const dt=Math.hypot(re.x-E.x,re.y-E.y);if(dt<ae){const mt=1-dt/ae;W=r(W,re.x,mt*.85),q=r(q,re.y,mt*.85)}}E.head+=Math.max(-ut,Math.min(ut,h(Math.atan2(q-E.y,W-E.x),E.head)));const nt=(N?7:30)*R;E.x+=Math.cos(E.head)*nt,E.y+=Math.sin(E.head)*nt;for(const dt of K){if(dt===E)continue;const mt=E.x-dt.x,bt=E.y-dt.y,Rt=mt*mt+bt*bt;if(Rt>lt*lt)continue;const yt=Math.max(.001,Math.sqrt(Rt)),ct=(1-yt/lt)*34*R,Yt=Math.abs(bt)<1?E.n<dt.n?-lt:lt:bt,Ct=Math.max(.001,Math.hypot(mt,Yt));E.x+=mt/Ct*ct*.5,E.y+=Yt/Ct*ct*1.5}const it=st(E.ri);E.x=r(E.x,Math.max(it.x-it.rx*1.5,Math.min(it.x+it.rx*1.5,E.x)),.08),E.y=r(E.y,Math.max(it.y-it.ry*1.2,Math.min(it.y+it.ry*1.2,E.y)),.08),E.pulse>0&&(E.pulse-=R*1.6),E.histT+=R,E.histT>1&&(E.histT=0,E.hist.push(N?1:0),E.hist.shift())}function _t(){return Et.length+Pt.length+K.reduce((E,R)=>E+R.queue.length+(R.task?1:0),0)}function qt(E){$t+=E,ot||(Ie-=E,Ie<=0&&(Ie=-Math.log(1-H())*(60/Zt),_t()<Tt&&Gt({id:++Ee,at:$t,hops:0,rework:0},0)));for(let R=Et.length-1;R>=0;R--){const N=Mt(Et[R].ri);N&&(N.queue.push(Et[R].t),N.pulse=1,Et.splice(R,1))}for(const R of K)ot||At(R,E),Ot(R,E);for(let R=Pt.length-1;R>=0;R--){const N=Pt[R],W=Math.max(1,Math.hypot(N.to.x-N.from.x,N.to.y-N.from.y));N.f+=Lt*E/W,N.f>=1&&(K.includes(N.to)&&!N.to.off?(N.to.queue.push(N.task),N.to.pulse=1):Et.push({t:N.task,ri:N.to.ri}),Pt.splice(R,1))}for(let R=Ht.length-1;R>=0;R--)Ht[R].t+=E*1.6,Ht[R].t>1&&Ht.splice(R,1)}const Vt=[223,227,232],Te=[207,217,228],Be="ui-monospace, 'Geist Mono Variable', SFMono-Regular, Menlo, monospace",Dn=E=>[1,3,5].map(R=>parseInt(E.slice(R,R+2),16)).join(",");for(const E of X)E.rgb=Dn(E.color);function Nn(E){b.clearRect(0,0,_,Y),b.textAlign="center";for(let R=0;R<X.length;R++){const N=X[R],W=st(R),q=K.filter(it=>it.ri===R&&!it.off).length,nt=K.filter(it=>it.ri===R).reduce((it,dt)=>it+dt.queue.length,0);b.strokeStyle=`rgba(${N.rgb},0.055)`,b.lineWidth=1,b.beginPath(),b.moveTo(W.x,74),b.lineTo(W.x,Y-66),b.stroke(),b.strokeStyle=`rgba(${N.rgb},0.16)`,b.beginPath(),b.moveTo(W.x-W.rx*.8,62),b.lineTo(W.x+W.rx*.8,62),b.stroke(),b.font=`10px ${Be}`,b.fillStyle=`rgba(${N.rgb},${q?.78:.34})`,b.fillText(`${R+1}. ${N.cn} ${N.tag}`,W.x,40),b.font=`9px ${Be}`,b.fillStyle="rgba(150,160,172,0.5)",b.fillText(q?`${q} agents · queue ${nt}`:"No agents",W.x,53)}b.textAlign="left",b.lineWidth=.7,b.setLineDash([3,5]);for(let R=0;R<K.length;R++)for(let N=R+1;N<K.length;N++){const W=K[R],q=K[N],nt=Math.hypot(W.x-q.x,W.y-q.y);nt>ht||(b.strokeStyle=`rgba(190,200,212,${(.42*(1-nt/ht)).toFixed(3)})`,b.beginPath(),b.moveTo(W.x,W.y),b.lineTo(q.x,q.y),b.stroke())}b.setLineDash([]);for(const R of Pt){const N=r(R.from.x,R.to.x,R.f),W=r(R.from.y,R.to.y,R.f),q=R.back?"224,104,95":"186,203,220";b.strokeStyle=`rgba(${q},0.18)`,b.lineWidth=.9,b.beginPath(),b.moveTo(R.from.x,R.from.y),b.lineTo(R.to.x,R.to.y),b.stroke();const nt=Math.max(0,R.f-.14),it=r(R.from.x,R.to.x,nt),dt=r(R.from.y,R.to.y,nt),mt=b.createLinearGradient(it,dt,N,W);mt.addColorStop(0,`rgba(${q},0)`),mt.addColorStop(1,`rgba(${q},0.85)`),b.strokeStyle=mt,b.lineWidth=1.6,b.beginPath(),b.moveTo(it,dt),b.lineTo(N,W),b.stroke(),b.fillStyle=`rgba(${q},0.95)`,b.beginPath(),b.arc(N,W,2.3,0,s),b.fill()}b.font=`9.5px ${Be}`,b.textBaseline="middle";for(const R of K){const N=X[R.ri],W=te===R,q=re.in&&Math.hypot(re.x-R.x,re.y-R.y)<Jt*.62;if(R.off||(b.strokeStyle="rgba(150,160,172,0.42)",b.lineWidth=.8,b.beginPath(),b.moveTo(R.x-Math.cos(R.head)*Jt*.4,R.y-Math.sin(R.head)*Jt*.4),b.lineTo(R.x-Math.cos(R.head)*Jt*.74,R.y-Math.sin(R.head)*Jt*.74),b.stroke(),R.wp&&!R.task&&(b.fillStyle="rgba(150,160,172,0.45)",b.beginPath(),b.arc(R.wp.x,R.wp.y,1.6,0,s),b.fill())),b.save(),b.translate(R.x-Jt/2,R.y-Jt/2),F(b,P[R.state].mode,Jt,E+R.phase,W?Te:Vt,R.off?.16:1),b.restore(),R.pulse>0){const ct=R.pulse;b.strokeStyle=`rgba(200,214,228,${(ct*.7).toFixed(3)})`,b.lineWidth=1,b.beginPath(),b.arc(R.x,R.y,Jt*.42+(1-ct)*22,0,s),b.stroke()}(W||q)&&(b.strokeStyle=W?"rgba(207,217,228,0.75)":"rgba(190,200,212,0.30)",b.lineWidth=1,b.setLineDash([2,4]),b.beginPath(),b.arc(R.x,R.y,Jt*.6,0,s),b.stroke(),b.setLineDash([]));const nt=`A${R.n} ${N.tag}`,it=R.off?" OFFLINE":" "+R.state,dt=b.measureText(nt).width,mt=b.measureText(it).width,Rt=R.x+Jt*.42+dt+mt>_-12?R.x-Jt*.42-dt-mt:R.x+Jt*.42,yt=R.y-Jt*.3;b.fillStyle=R.off?"rgba(120,128,138,.55)":N.color,b.fillText(nt,Rt,yt),b.fillStyle=R.off?"rgba(100,108,118,.5)":"rgba(190,200,212,0.62)",b.fillText(it,Rt+dt,yt),R.queue.length&&(b.fillStyle="rgba(207,217,228,0.92)",b.fillText(`+${R.queue.length}`,Rt,yt+12))}re.in&&(b.strokeStyle="rgba(190,200,212,0.13)",b.lineWidth=.5,b.setLineDash([6,8]),b.beginPath(),b.arc(re.x,re.y,ae,0,s),b.stroke(),b.setLineDash([]));for(const R of Ht)b.strokeStyle=`rgba(224,104,95,${((1-R.t)*.75).toFixed(3)})`,b.lineWidth=2*(1-R.t),b.beginPath(),b.arc(R.x,R.y,12+R.t*150,0,s),b.stroke()}const Ne=oe.getContext("webgl",{alpha:!1,antialias:!1});let Si=()=>{};if(Ne){const E=`precision mediump float;
    uniform vec2 uRes; uniform float uTime, uN; uniform vec3 uA[${tt}];
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
      for (int i = 0; i < ${tt}; i++) {
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
    }`,R=(yt,ct)=>{const Yt=Ne.createShader(yt);return Ne.shaderSource(Yt,ct),Ne.compileShader(Yt),Yt},N=Ne.createProgram();Ne.attachShader(N,R(Ne.VERTEX_SHADER,"attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}")),Ne.attachShader(N,R(Ne.FRAGMENT_SHADER,E)),Ne.linkProgram(N),Ne.useProgram(N);const W=Ne.createBuffer();Ne.bindBuffer(Ne.ARRAY_BUFFER,W),Ne.bufferData(Ne.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),Ne.STATIC_DRAW);const q=Ne.getAttribLocation(N,"p");Ne.enableVertexAttribArray(q),Ne.vertexAttribPointer(q,2,Ne.FLOAT,!1,0,0);const nt=yt=>Ne.getUniformLocation(N,yt),it=nt("uRes"),dt=nt("uTime"),mt=nt("uN"),bt=nt("uA[0]"),Rt=new Float32Array(tt*3);Si=(yt,ct)=>{const Yt=Math.min(tt,K.length);for(let Ct=0;Ct<Yt;Ct++){const kt=K[Ct];Rt[Ct*3]=kt.x*ct,Rt[Ct*3+1]=(Y-kt.y)*ct,Rt[Ct*3+2]=kt.off?.05:kt.task?1:.22}Ne.uniform2f(it,oe.width,oe.height),Ne.uniform1f(dt,yt),Ne.uniform1f(mt,Yt),Ne.uniform3fv(bt,Rt),Ne.drawArrays(Ne.TRIANGLES,0,3)}}const tn=e.roster;function Ae(){const E=Math.min(devicePixelRatio,2);tn.innerHTML=X.map((R,N)=>{const W=K.filter(q=>q.ri===N);return`<div class="grp"><h2><i style="background:${R.color}"></i>${R.cn} ${R.tag}<span class="sp"></span>
      <button data-sub="${N}" type="button"${W.length?"":" disabled"}>−</button>
      <button data-add="${N}" type="button"${K.length>=tt?" disabled":""}>+</button></h2>
      ${W.map(q=>`<div class="ag" data-n="${q.n}"><canvas></canvas>
        <span class="nm">${q.label||"A"+q.n}</span><span class="st"></span>
        <span class="q"></span><span class="bar"><i></i></span></div>`).join("")}
    </div>`}).join("");for(const R of tn.querySelectorAll("canvas"))R.width=20*E,R.height=20*E,R.getContext("2d").setTransform(E,0,0,E,0,0)}a(tn,"click",E=>{const R=E.target.closest("[data-add]"),N=E.target.closest("[data-sub]");if(R){K.length<tt&&(K.push(wt(+R.dataset.add)),Ae());return}if(N){const q=+N.dataset.sub,nt=K.filter(dt=>dt.ri===q);if(!nt.length)return;const it=nt[nt.length-1];K=K.filter(dt=>dt!==it),te===it&&(te=null,Hn());for(const dt of[...it.task?[it.task]:[],...it.queue])Gt(dt,q);Ae();return}const W=E.target.closest("[data-n]");W&&(te=K.find(q=>q.n===+W.dataset.n)||null,Hn(),Ae())});function Un(E){for(const R of tn.querySelectorAll(".ag")){const N=K.find(it=>it.n===+R.dataset.n);if(!N)continue;const W=R.querySelector("canvas").getContext("2d");W.clearRect(0,0,20,20),F(W,P[N.state].mode,20,E+N.phase,te===N?Te:Vt,N.off?.2:1),R.querySelector(".st").textContent=N.off?"OFFLINE":`${N.state} ${P[N.state].cn}`,R.querySelector(".q").textContent=N.queue.length?`+${N.queue.length}`:"";const q=N.span>0?N.busy/N.span:0,nt=R.querySelector(".bar i");nt.style.width=(q*100).toFixed(0)+"%",nt.style.background=q>.86?"var(--bad)":q>.75?"var(--warn)":"var(--muted)",R.classList.toggle("on",te===N),R.classList.toggle("down",N.off)}}function li(){const E=te,R=X[E.ri],N=E.span>0?E.busy/E.span:0,W=P[E.state];return{n:E.n,color:R.color,cn:R.cn,prog:R.prog.map(q=>q[0]).join(" → "),off:E.off,st:`${E.state} ${W.cn}`,md:W.mode,tk:E.task?"#"+E.task.id:"—",q:E.queue.length,u:(N*100).toFixed(0)+"%",hist:E.hist.map(q=>!!q)}}function Hn(){if(!te||!K.includes(te)){te=null,t.card(null);return}t.card(li())}function Qn(){!te||!K.includes(te)||t.card(li())}function Gi(E){const R=te;R&&(E==="off"?(R.off=!R.off,R.off&&Mi(R)):Qi(R),Hn(),Ae())}function ha(){te=null,Hn(),Ae()}function Mi(E){const R=[...E.task?[E.task]:[],...E.queue];E.task=null,E.queue=[],E.state="IDLE",E.step=0;for(const N of R){const W=Mt(E.ri);W&&W!==E?(W.queue.push(N),W.pulse=1):Et.push({t:N,ri:E.ri})}}function Qi(E){!E.task&&!E.queue.length||(Ht.push({x:E.x,y:E.y,t:0}),Mi(E))}function Vi(){const E=Math.min(60,$t),R=be.filter(nt=>nt.doneAt>$t-60),N=be.slice(-20).map(nt=>nt.doneAt-nt.at).sort((nt,it)=>nt-it),W=X.map((nt,it)=>{const dt=K.filter(Rt=>Rt.ri===it&&!Rt.off),mt=dt.reduce((Rt,yt)=>Rt+yt.span,0),bt=dt.reduce((Rt,yt)=>Rt+yt.busy,0);return{r:nt,n:dt.length,u:mt>0?bt/mt:0,q:dt.reduce((Rt,yt)=>Rt+yt.queue.length,0)}});let q=0;for(let nt=0;nt<K.length;nt++)for(let it=nt+1;it<K.length;it++)Math.hypot(K[nt].x-K[it].x,K[nt].y-K[it].y)<ht&&q++;return{thr:E>3?R.length/E*60:0,lead:N.length?N[Math.floor(N.length/2)]:0,wip:_t(),fin:Ze,util:W,links:q}}function Jn(){const E=Vi();Qn(),e.tally.innerHTML=`<b>${K.filter(q=>!q.off).length}</b> active · <b>${K.filter(q=>q.task).length}</b> working<br>
     <b>${E.links}</b> links · <b>${Pt.length}</b> messages in transit · <b>${E.fin}</b> delivered`,e.stats.innerHTML=`
    <div class="m"><u>Throughput</u><b>${E.thr.toFixed(1)}<s>tasks/min</s></b></div>
    <div class="m"><u>Lead time</u><b>${E.lead.toFixed(1)}<s>sec</s></b></div>
    <div class="m"><u>Work in progress</u><b>${E.wip}<s>/${Tt}</s></b></div>
    ${E.util.map(q=>`<div class="m"><u>${q.r.cn}</u><b style="color:${q.u>.86?"var(--bad)":q.u>.75?"var(--warn)":"var(--ink)"}">${(q.u*100).toFixed(0)}<s>%</s></b></div>`).join("")}`;const R=E.util.find(q=>q.n===0),N=E.util.reduce((q,nt)=>nt.u>q.u?nt:q),W=E.util.reduce((q,nt)=>nt.q>q.q?nt:q);e.verdict.innerHTML=R?`<b>${R.r.cn}</b> has no agents; work is blocked upstream.`:$t<15?"Warming up: throughput becomes reliable after a full minute of completions.":N.u>.86?`Bottleneck: <b>${N.r.cn}</b> at ${(N.u*100).toFixed(0)}% utilization. Add capacity here first.`:W.q>=3?`<b>${W.r.cn}</b> has ${W.q} queued tasks; this is arrival variability, not yet a sustained capacity gap.`:`No clear bottleneck. <b>${N.r.cn}</b> is busiest at ${(N.u*100).toFixed(0)}%. Raise arrival rate to stress the system.`}const bi=E=>{Zt=+E},qa=E=>{ce=+E,t.speed(ce)},Ds=(E,R)=>K.find(N=>Math.hypot(N.x-E,N.y-R)<Jt*.62)||null;let pa=null,Ji=!1;a(he,"pointermove",E=>{re.x=E.clientX,re.y=E.clientY,re.in=!0}),a(he,"pointerleave",()=>{re.in=!1,re.x=re.y=-9999}),a(he,"pointerdown",E=>{const R=Ds(E.clientX,E.clientY);Ji=!1,R&&(pa=setTimeout(()=>{Ji=!0,Qi(R),Ae()},se))}),a(window,"pointerup",E=>{clearTimeout(pa),!(Ji||E.target!==he)&&(te=Ds(E.clientX,E.clientY),Hn(),Ae())}),a(window,"keydown",E=>{E.key==="Escape"&&(te=null,Hn(),Ae()),E.key===" "&&!E.target.closest("button,input")&&(E.preventDefault(),qa(ce?0:1))});function Ns(){const E=Math.min(devicePixelRatio,2);_=innerWidth,Y=innerHeight;for(const R of[he,oe])(R.width!==Math.round(_*E)||R.height!==Math.round(Y*E))&&(R.width=Math.round(_*E),R.height=Math.round(Y*E),R===he?b.setTransform(E,0,0,E,0,0):Ne&&Ne.viewport(0,0,R.width,R.height));return E}const A=matchMedia("(prefers-reduced-motion: reduce)"),j=fC({getAgents:()=>K,ROLES:X,STATES:P,LINK_R:ht});let at=0,J=1;Ns(),xt(),Ae();let et=0;(function E(R){et=requestAnimationFrame(E);const N=Ns(),W=Math.min(.05,(R-at)/1e3);at=R,Q=r(Q,te&&_>1080?300:46,1-Math.exp(-W*5)),ce&&qt(W*ce);const q=A.matches?0:$t;Ne&&Si(R/1e3,N),j.step(W*ce||0),Nn(q),j.draw(b),Un(q),J+=W,J>.25&&(J=0,Jn())})(0);function zt(E){if(!Array.isArray(E)||E.length===0)return ot&&(ot=!1,Z.clear(),xt(),Ae()),{live:!1,agents:0};ot=!0;const R=new Set,N=[];for(const W of E.slice(0,tt)){const q=String(W.id);if(R.has(q))continue;R.add(q);const nt=vt[W.status]||"code",it=Math.max(0,X.findIndex(mt=>mt.id===nt));let dt=Z.get(q);dt||(dt=wt(it),Z.set(q,dt)),dt.ri=it,dt.label=W.label||q,dt.state=ft[W.status]||"IDLE",dt.task=null,dt.queue=[],dt.off=!1,N.push(dt)}for(const W of[...Z.keys()])R.has(W)||Z.delete(W);return K=N,Et=[],Pt=[],Ae(),{live:!0,agents:K.length}}return{setLam:bi,setSpeed:qa,cardAct:Gi,closeCard:ha,mesh:j,setFleet:zt,dispose(){n.abort(),cancelAnimationFrame(et),clearTimeout(pa)}}}const hC=["info","ok","warn","bad"];function pC({mesh:e}){const t=new Map,n=new Map,i=[];let a=new Map,s=new Map;const r=(C,T)=>(t.get(C)||[]).forEach(x=>x(T));function o(C,T,x){i.unshift({ts:new Date,level:hC.includes(C)?C:"info",text:T,id:x}),i.length>60&&i.pop(),M(),r("note",i[0])}function l({id:C,name:T,n:x}={}){if(!C)throw new Error("PlugBrainMesh.register: {id} is required");const w=e.snapshot();let D=x;if(D==null){const z=w.find(G=>![...a.values()].includes(G.n));D=z?z.n:null}if(D==null)return o("warn",`register ${C}: no free field agent left`),null;a.set(C,D);const O=(w.find(z=>z.n===D)||{}).hue||"#8ab2d1",I={id:C,name:T||C,n:D,hue:O,ts:Date.now()};return n.set(C,I),o("ok",`registered ${I.name} → field agent A${D}`,C),r("register",I),f(w),I}function c(C){if(!n.delete(C))return!1;const T=a.get(C);return a.delete(C),o("info",`unregistered ${C} (A${T} returns to the pool)`,C),r("unregister",{id:C,n:T}),f(),!0}function d(C,T,x="info"){o(x,T,C)}const h=document.createElement("div");h.id="mesh-root",h.innerHTML=`
    <button id="mesh-toggle" type="button" title="Agent registry (m)">◈ mesh</button>
    <div id="mesh-panel" aria-hidden="true">
      <div class="mp-head">
        <h3>Agent Registry</h3><span class="mp-count"></span>
        <button class="mp-x" type="button" title="close">✕</button>
      </div>
      <div class="mp-list"></div>
      <div class="mp-foot">PlugBrainMesh · register() · note() · unregister()</div>
    </div>
    <div id="mesh-feed"></div>`,document.body.appendChild(h);const u=h.querySelector("#mesh-panel"),p=h.querySelector(".mp-list"),g=h.querySelector("#mesh-feed"),S=h.querySelector("#mesh-toggle"),m=C=>{u.setAttribute("aria-hidden",String(!C)),S.classList.toggle("on",C),C&&f()};S.addEventListener("click",()=>m(u.getAttribute("aria-hidden")==="true")),h.querySelector(".mp-x").addEventListener("click",()=>m(!1)),window.addEventListener("keydown",C=>{C.key.toLowerCase()==="m"&&!C.target.closest("input,button")&&m(u.getAttribute("aria-hidden")==="true")});function f(C=e.snapshot()){h.querySelector(".mp-count").textContent=`${C.length} on field · ${n.size} registered`,p.innerHTML=C.map(T=>{const x=[...n.values()].find(O=>O.n===T.n),w=x?x.name:`A${T.n}`,D=Math.round(T.util*100);return`<div class="mp-row" data-n="${T.n}">
        <i class="mp-hue" style="background:${T.hue}"></i>
        <span class="mp-name">${w}${x?` <s>A${T.n}</s>`:""}</span>
        <span class="mp-state ${T.state==="OFFLINE"?"off":""}">${T.stateCn}</span>
        <span class="mp-task">${T.task||""}</span>
        <span class="mp-bar"><i style="width:${D}%;background:${D>86?"var(--bad)":D>75?"var(--warn)":T.hue}"></i></span>
      </div>`}).join("")}const v=C=>C.toTimeString().slice(0,8);function M(){g.innerHTML=i.slice(0,9).map((C,T)=>`<div class="mf-line" style="opacity:${1-T*.1}">
        <s>${v(C.ts)}</s><i class="mf-${C.level}"></i><span>${C.text}</span>
      </div>`).join("")}let y=setInterval(()=>{const C=e.snapshot();for(const T of C){const x=s.get(T.n);if(x&&x!==T.state){const w=[...n.values()].find(I=>I.n===T.n),D=w?w.name:`A${T.n}`,O=T.state==="DBUG"?"warn":T.state==="EXEC"?"ok":"info";o(O,`${D} · ${x} → ${T.state}${T.task?" · "+T.task:""}`,w==null?void 0:w.id)}s.set(T.n,T.state)}u.getAttribute("aria-hidden")==="false"&&f(C)},800);const U={register:l,unregister:c,note:d,list:()=>[...n.values()],feed:()=>[...i],on:(C,T)=>(t.has(C)||t.set(C,new Set),t.get(C).add(T),()=>t.get(C).delete(T)),dispose:()=>{clearInterval(y),h.remove()}};return window.PlugBrainMesh=U,o("ok","agent mesh module online — simulated fleet auto-registered"),U}const mC=[[0,"⏸"],[1,"1×"],[2,"2×"],[4,"4×"]];function gC({tasks:e}){const t=Ut.useRef(null),n=Ut.useRef(null),i=Ut.useRef(null),a=Ut.useRef(null),s=Ut.useRef(null),r=Ut.useRef(null),o=Ut.useRef(null),[l,c]=Ut.useState(null),[d,h]=Ut.useState(20),[u,p]=Ut.useState(1);return Ut.useEffect(()=>{const g=dC({els:{glow:t.current,field:n.current,roster:i.current,tally:a.current,stats:s.current,verdict:r.current},emit:{card:c,speed:p}});o.current=g;const S=pC({mesh:g.mesh});return()=>{S.dispose(),g.dispose(),o.current=null}},[]),Ut.useEffect(()=>{var g;(g=o.current)==null||g.setFleet(e.map(S=>({id:S.id,label:S.assignedAgentId||S.title||S.id,status:S.status})))},[e]),L.jsxs(L.Fragment,{children:[L.jsx("canvas",{id:"glow",ref:t}),L.jsx("canvas",{id:"field",ref:n}),L.jsxs("div",{className:"ov",id:"hud",children:[L.jsxs("h1",{children:[L.jsx("i",{}),"Agent Mesh",L.jsx("em",{children:"Workflow"})]}),L.jsx("div",{className:"tally",id:"tally",ref:a,children:"—"})]}),L.jsx("div",{className:"ov",id:"roster",ref:i}),L.jsx("div",{className:"ov"+(l?" on":""),id:"inspect",children:l&&L.jsxs(L.Fragment,{children:[L.jsxs("h3",{children:[L.jsx("i",{style:{background:l.color}}),"A",l.n," · ",l.cn,L.jsx("button",{className:"x",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.closeCard()},children:"✕"})]}),L.jsxs("div",{className:"kv",children:[L.jsx("span",{children:"Current state"}),L.jsx("b",{id:"i-st",children:l.st}),L.jsx("span",{children:"State visualization"}),L.jsx("b",{id:"i-md",children:l.md}),L.jsx("span",{children:"Task"}),L.jsx("b",{id:"i-tk",children:l.tk}),L.jsx("span",{children:"Queue"}),L.jsx("b",{id:"i-q",children:l.q}),L.jsx("span",{children:"Utilization"}),L.jsx("b",{id:"i-u",children:l.u}),L.jsx("span",{children:"State program"}),L.jsx("b",{children:l.prog})]}),L.jsx("div",{className:"hist",children:l.hist.map((g,S)=>L.jsx("i",{style:{height:g?"100%":"16%",background:g?l.color:"var(--line)"}},S))}),L.jsx("div",{className:"note",children:"The strip shows busy and idle time over the last 28 seconds. Long gaps mean spare capacity; a full strip marks a constraint."}),L.jsxs("div",{className:"act",children:[L.jsx("button",{className:"btn"+(l.off?" on":""),"data-act":"off",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.cardAct("off")},children:l.off?"Bring online":"Take offline"}),L.jsx("button",{className:"btn","data-act":"kick",type:"button",onClick:()=>{var g;return(g=o.current)==null?void 0:g.cardAct("kick")},children:"Interrupt and reassign"})]})]})}),L.jsxs("div",{className:"ov",id:"ctl",children:[L.jsxs("div",{className:"fld",children:["Arrival rate ",L.jsxs("b",{id:"lamv",children:[d," /min"]}),L.jsx("input",{type:"range",id:"lam",min:"4",max:"46",step:"1",value:d,onChange:g=>{var S;h(+g.target.value),(S=o.current)==null||S.setLam(+g.target.value)}})]}),L.jsx("div",{className:"seg",id:"spd",children:mC.map(([g,S])=>L.jsx("button",{className:u===g?"on":"","data-s":g,type:"button",onClick:()=>{var m;return(m=o.current)==null?void 0:m.setSpeed(g)},children:S},g))}),L.jsx("span",{className:"sp"}),L.jsx("div",{id:"stats",ref:s}),L.jsx("div",{id:"verdict",ref:r,children:"—"})]}),L.jsx("div",{id:"tip",children:"Move cursor near agents to call them · click to inspect · hold to interrupt and reassign · Space to pause"})]})}function vC({tasks:e,depth:t}){if(e.length===0)return L.jsx("div",{className:"brain-empty",children:"Die Queue ist leer. Nichts wartet, und nichts wird erfunden."});e.filter(s=>s.state==="pending");const n=e.filter(s=>s.state==="claimed"),i=e.filter(s=>s.state==="delivered"),a=n.filter(s=>s.stale);return L.jsxs("div",{className:"queue",children:[L.jsxs("div",{className:"queue__figures",children:[L.jsx(Yc,{value:t,label:"WARTEND",tone:t>8?"hot":void 0}),L.jsx(Yc,{value:n.length,label:"IN ARBEIT"}),L.jsx(Yc,{value:i.length,label:"GELIEFERT"}),L.jsx(Yc,{value:a.length,label:"STILL",tone:a.length>0?"hot":void 0})]}),L.jsx("ol",{className:"queue__list",children:e.map(s=>L.jsxs("li",{className:`queue__row queue__row--${s.state}`,children:[L.jsx("span",{className:"queue__state",children:_C[s.state]??s.state}),L.jsx("span",{className:"queue__title",title:s.title,children:s.title}),L.jsx("span",{className:"queue__holder",children:s.claimed_by?s.claimed_by:s.addressed_to?`nur ${s.addressed_to}`:"für alle offen"}),s.stale&&L.jsx("span",{className:"queue__stale",title:"Keine Regung seit dem Claim. PlugBrain meldet das nur — es beendet keinen Claim.",children:"still"}),s.delivered_path&&L.jsx("span",{className:"queue__path",title:s.delivered_path,children:s.delivered_path})]},s.id))})]})}const _C={pending:"WARTET",claimed:"IN ARBEIT",delivered:"GELIEFERT",cancelled:"ABGEBROCHEN"};function Yc({value:e,label:t,tone:n}){return L.jsxs("div",{className:`queue__figure${n==="hot"?" queue__figure--hot":""}`,children:[L.jsx("strong",{children:e}),L.jsx("span",{children:t})]})}const PS=[{id:"atlas",label:"Atlas",hint:"Wissensgraph der indexierten Objekte"},{id:"city",label:"City",hint:"Workspaces als Distrikte, Objekte als Gebäude"},{id:"mesh",label:"Mesh",hint:"Agenten und Zustände aus dem PlugBoard-Ledger"},{id:"queue",label:"Queue",hint:"Wartende Arbeit; der erste freie Agent nimmt sie"}],Wd=DS,xC=2e4;function yC(){const e=new URLSearchParams(location.search).get("view"),t=(()=>{try{return localStorage.getItem("plugbrain.view")}catch{return null}})(),n=e||t;return PS.some(i=>i.id===n)?n:"atlas"}function SC(){const e=new URLSearchParams(location.search).get("workspace");return e||j3()}function MC(){var ht;const[e,t]=Ut.useState(null),[n,i]=Ut.useState([]),[a,s]=Ut.useState({depth:0,tasks:[]}),[r,o]=Ut.useState(!0),[l,c]=Ut.useState(""),[d,h]=Ut.useState(0),[u,p]=Ut.useState(yC),[g,S]=Ut.useState(SC),[m,f]=Ut.useState([]),[v,M]=Ut.useState(!1),[y,U]=Ut.useState(""),[C,T]=Ut.useState(!1),[x,w]=Ut.useState(""),[D,O]=Ut.useState(""),[I,z]=Ut.useState(null),[G,k]=Ut.useState(null),[B,F]=Ut.useState(!1);Ut.useEffect(()=>{try{localStorage.setItem("plugbrain.view",u)}catch{}},[u]);const P=Ut.useRef(null);Ut.useEffect(()=>{P.current=G},[G]);const X=tt=>{S(tt),Z3(tt);const K=new URL(location.href);tt?K.searchParams.set("workspace",tt):K.searchParams.delete("workspace"),history.replaceState(null,"",K.toString())};Ut.useEffect(()=>{let tt=!0;return Bv().then(K=>{if(tt&&(f(K),!g&&K.length>0)){const Et=[...K].sort((Pt,Ht)=>(Ht.indexedAt??"").localeCompare(Pt.indexedAt??""))[0];Et&&X(Et.id)}}).catch(()=>{tt&&w("Die Galaxie ist nicht erreichbar — läuft plugbrain serve?")}),()=>{tt=!1}},[]);const pt=async tt=>{tt.preventDefault();const K=y.trim();if(K!==""){T(!0),w(""),O("");try{const Et=await K3(K);Bv().then(Pt=>{Pt.length>0&&f(Pt)}).catch(()=>{}),O("Vault registriert und indiziert."),U(""),M(!1),X(Et)}catch(Et){w(Et instanceof Error?Et.message:String(Et))}finally{T(!1)}}},Tt=async()=>{if(!(!g||C)){T(!0),w(""),O("");try{const tt=await US(g);O(`Neu indiziert: ${(tt==null?void 0:tt.files)??0} Dateien, ${(tt==null?void 0:tt.symbols)??0} Symbole, ${(tt==null?void 0:tt.edges)??0} Kanten.`)}catch(tt){w(tt instanceof Error?tt.message:String(tt))}finally{T(!1)}}},Lt=L.jsxs("form",{className:"brain-vault",onSubmit:pt,children:[L.jsxs("div",{className:"brain-vault__row",children:[L.jsx("input",{className:"brain-vault__path",value:y,onChange:tt=>U(tt.target.value),placeholder:"Pfad eines Ordners, z. B. C:\\Notizen\\vault",spellCheck:!1,"aria-label":"Vault-Pfad"}),L.jsx("button",{type:"submit",className:"brain-vault__open",disabled:C||y.trim()==="",children:C?"Indiziere …":"Als Vault öffnen"})]}),g&&L.jsx("div",{className:"brain-vault__row brain-vault__row--tools",children:L.jsx("button",{type:"button",className:"brain-vault__reindex",disabled:C,onClick:()=>void Tt(),children:C?"…":"Neu indizieren"})}),x&&L.jsx("p",{className:"brain-vault__error",role:"alert",children:x}),D&&L.jsx("p",{className:"brain-vault__done",role:"status",children:D})]});Ut.useEffect(()=>{const tt=g||void 0;fetch("/api/timeline"+(tt?"?workspace="+encodeURIComponent(tt):"")).then(K=>K.json()).then(K=>{var Et;(Et=K==null?void 0:K.bounds)!=null&&Et.first&&z(K.bounds)}).catch(()=>{})},[g]),Ut.useEffect(()=>{if(!B||!I)return;const tt=new Date(I.first).getTime(),K=new Date(I.last).getTime(),Et=Math.max(1,K-tt);let Pt=G?Math.round((new Date(G).getTime()-tt)/Et*60):0;const Ht=setInterval(()=>{if(Pt+=1,Pt>=60){k(null),F(!1);return}k(new Date(tt+Et*Pt/60).toISOString())},220);return()=>clearInterval(Ht)},[B,I]),Ut.useEffect(()=>{const tt=new AbortController;let K,Et="",Pt="";const Ht=g||void 0;async function be(){var $t,Ee,ve;try{const Zt=new URLSearchParams;Ht&&Zt.set("workspace",Ht),Zt.set("limit",String(xC)),P.current&&Zt.set("until",P.current);const ce=await fetch("/api/atlas/snapshot"+(Zt.toString()?`?${Zt}`:""),{signal:tt.signal});if(!ce.ok)throw new Error(`Brain-Verbindung: HTTP ${ce.status}`);const te=await ce.json();if(!(($t=te.workspace)!=null&&$t.canonicalPath)||!Array.isArray((Ee=te.graph)==null?void 0:Ee.nodes)||!Array.isArray((ve=te.graph)==null?void 0:ve.edges))throw new Error("Der Brain-Snapshot ist unvollständig.");const Ie=JSON.stringify([te.workspace,te.graph,te.coverage]);Ie!==Et&&(t(te),Et=Ie),c("")}catch(Zt){tt.signal.aborted||c(Zt instanceof Error?Zt.message:String(Zt))}try{const Zt=await fetch("/api/agents"+(Ht?"?workspace="+encodeURIComponent(Ht):""),{signal:tt.signal});if(!Zt.ok)throw new Error(String(Zt.status));const ce=await Zt.json(),Ie=(Array.isArray(ce==null?void 0:ce.agents)?ce.agents:[]).map(re=>({id:re.id,title:re.name,assignedAgentId:re.name,status:re.filesTouched>0?"RUNNING":re.actions>0?"REVIEW":"PLANNED"})),Ze=JSON.stringify(Ie);Ze!==Pt&&(i(Ie),Pt=Ze),o(!0)}catch{tt.signal.aborted||o(!1)}try{const Zt=await fetch("/api/queue"+(Ht?"?workspace="+encodeURIComponent(Ht):""),{signal:tt.signal});if(Zt.ok){const ce=await Zt.json();(ce==null?void 0:ce.ok)===!0&&Array.isArray(ce.tasks)&&s({depth:Number(ce.depth??0),tasks:ce.tasks})}}catch{}tt.signal.aborted||(K=setTimeout(be,3e3))}return be(),()=>{tt.abort(),clearTimeout(K)}},[d,G,g]);const ae=(e==null?void 0:e.graph.nodes.length)??0,Jt=(e==null?void 0:e.graph.edges.length)??0,se=l?"getrennt":e?(ht=e.coverage)!=null&&ht.complete?"live":"Index unvollständig":"lädt …";return L.jsxs(L.Fragment,{children:[L.jsxs("div",{className:"live-status",role:"status",children:[L.jsx("strong",{className:"live-status__name",title:(e==null?void 0:e.workspace.canonicalPath)??"",children:e?Wd(e.workspace.name):"PlugBrain"}),g&&m.length>0&&L.jsx("label",{className:"brain-switcher",title:"Zu einem anderen Vault wechseln",children:L.jsx("select",{value:g,onChange:tt=>{const K=tt.target.value;K&&X(K)},children:m.map(tt=>L.jsx("option",{value:tt.id,children:Wd(tt.name)},tt.id))})}),g&&L.jsx("button",{type:"button",className:"brain-vault-toggle",onClick:()=>{M(tt=>!tt),w(""),O("")},title:"Einen Ordner als neuen Vault öffnen",children:v?"Schließen":"Vault öffnen"}),L.jsxs("span",{className:"live-status__figures",children:[L.jsx("b",{children:ae})," Objekte ",L.jsx("b",{children:Jt})," Kanten"]}),L.jsx("span",{className:l?"live-status__state is-bad":"live-status__state",children:se}),L.jsx("nav",{className:"brain-views","aria-label":"Ansicht",children:PS.map(tt=>L.jsx("button",{type:"button",title:tt.hint,className:tt.id===u?"on":void 0,"aria-pressed":tt.id===u,onClick:()=>p(tt.id),children:tt.label},tt.id))}),l&&L.jsx("button",{type:"button",onClick:()=>h(tt=>tt+1),children:"Erneut verbinden"})]}),I&&L.jsxs("div",{className:"brain-timelapse",children:[L.jsx("button",{type:"button",onClick:()=>F(tt=>!tt),title:"Wachstum abspielen",children:B?"❚❚":"▶"}),L.jsx("input",{type:"range",min:0,max:60,step:1,value:G&&I?Math.round((new Date(G).getTime()-new Date(I.first).getTime())/Math.max(1,new Date(I.last).getTime()-new Date(I.first).getTime())*60):60,onChange:tt=>{F(!1);const K=Number(tt.target.value);if(K>=60){k(null);return}const Et=new Date(I.first).getTime(),Pt=new Date(I.last).getTime();k(new Date(Et+(Pt-Et)*K/60).toISOString())}}),L.jsx("span",{children:G?new Date(G).toLocaleTimeString():"jetzt"})]}),v&&g&&Lt,g?L.jsxs(L.Fragment,{children:[u==="atlas"&&(e&&ae>0?L.jsx(TC,{graph:e.graph}):L.jsx("div",{className:"brain-empty",children:l||(e?"Dieser Workspace enthält noch keine indexierten Objekte.":"Echten Workspace-Graphen laden …")})),u==="city"&&L.jsx("div",{className:"brain-view brain-view-city",children:L.jsx(uC,{snapshot:e})}),u==="queue"&&L.jsx("div",{className:"brain-view brain-view-queue",children:L.jsx(vC,{tasks:a.tasks,depth:a.depth})}),u==="mesh"&&L.jsxs("div",{className:"brain-view brain-view-mesh",children:[!r&&L.jsx("div",{className:"brain-note",children:"Agenten-Register nicht erreichbar — es werden keine echten Agenten angezeigt."}),r&&n.length===0&&L.jsx("div",{className:"brain-note",children:"Noch kein Agent hat diesen Workspace angefasst. Die Engine läuft in Eigensimulation — das sind keine echten Agenten."}),L.jsx(gC,{tasks:n})]})]}):L.jsxs("div",{className:"brain-landing",role:"main",children:[L.jsx("h1",{className:"brain-landing__title",children:"PlugBrain"}),L.jsx("p",{className:"brain-landing__lead",children:"Ein Ordner als Vault öffnen — der Brain indiziert ihn einmal und hält ihn über den Daemon automatisch aktuell. Wiki-Links, Überschriften, Tags und Code-Symbole werden zu einem durchsuchbaren Graphen."}),Lt,m.length>0&&L.jsxs("div",{className:"brain-vault__known",children:[L.jsx("span",{children:"Oder einen bekannten Vault öffnen:"}),m.map(tt=>L.jsxs("button",{type:"button",className:"brain-vault__known-item",onClick:()=>X(tt.id),children:[Wd(tt.name)," ",L.jsx("em",{title:tt.root,children:tt.indexedAt?"indiziert":"nicht indiziert"})]},tt.id))]})]})]})}const bC=e=>/✗|STALE|REPAIR|Quarantäne|secret|offen/i.test(e);function EC(e,t){if(!t)return e;const n=new RegExp(`(${t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")})`,"ig");return e.split(n).map((i,a)=>a%2?L.jsx("mark",{children:i},a):i)}function TC({graph:e}){const{CLUSTERS:t,nodes:n,edges:i,createAtlas:a}=Ut.useMemo(()=>Y3(e),[e]),s=Object.fromEntries(t.map(P=>[P.id,n.filter(X=>X.cid===P.id).length])),r=Ut.useRef(null),o=Ut.useRef(null),l=Ut.useRef(null),c=Ut.useRef(null),d=Ut.useRef(null),h=Ut.useRef(null),u=Ut.useRef(null),p=Ut.useRef(null),g=Ut.useRef(null),S=Ut.useRef(null),m=Ut.useRef(null),f=Ut.useRef(null),v=Ut.useRef(null),[M,y]=Ut.useState(!1),[U,C]=Ut.useState({q:"",rows:[]}),[T,x]=Ut.useState(null),[w,D]=Ut.useState({flow:!0,label:!0,spin:!1}),[O,I]=Ut.useState("atlas"),[z,G]=Ut.useState("dark"),[k,B]=Ut.useState([]);Ut.useEffect(()=>{const P=a({els:{stage:r.current,labels:o.current,hudMode:l.current,hudSel:c.current,pathbar:d.current,chain:h.current,zlvl:u.current,sNode:p.current,sEdge:g.current,sDeg:S.current,sFps:m.current,q:f.current},emit:{gate:y,list:C,drawer:x,tools:D,theme:G}});return v.current=P,()=>{P.dispose(),v.current=null}},[a]);const F=P=>{var X;B(pt=>pt.includes(P)?pt.filter(Tt=>Tt!==P):[...pt,P]),(X=v.current)==null||X.toggleCluster(P)};return L.jsxs("div",{id:"app",className:T?"open":"",children:[L.jsxs("aside",{children:[L.jsxs("div",{className:"brand",children:[L.jsxs("h1",{children:[L.jsx("span",{className:"dot"}),"PlugBrain"]}),L.jsxs("p",{children:["Dein Workspace. Seine Dateien und Zusammenhänge.",L.jsx("br",{}),"Aktueller Graph aus PlugBrain."]})]}),L.jsxs("div",{className:"searchbox",children:[L.jsxs("svg",{viewBox:"0 0 16 16",fill:"none",stroke:"currentColor",strokeWidth:"1.6",children:[L.jsx("circle",{cx:"7",cy:"7",r:"4.5"}),L.jsx("path",{d:"M10.5 10.5 14 14"})]}),L.jsx("input",{id:"q",type:"search",placeholder:"Datei, Symbol, Mission, Pack suchen…",autoComplete:"off",spellCheck:!1,ref:f,onChange:P=>{var X;return(X=v.current)==null?void 0:X.setQuery(P.target.value)}})]}),L.jsx("div",{className:"legend",id:"legend",children:t.map(P=>L.jsxs("button",{className:"cl"+(k.includes(P.id)?" off":""),type:"button",onClick:()=>F(P.id),children:[L.jsx("i",{style:{background:P.color}}),P.name,L.jsx("b",{children:s[P.id]})]},P.id))}),L.jsx("div",{className:"listwrap",id:"list",children:U.rows.length?U.rows.map(P=>L.jsxs("div",{className:"lrow"+(P.on?" on":""),"data-i":P.i,onClick:()=>{var X;return(X=v.current)==null?void 0:X.selectAt(P.i)},onMouseOver:()=>{var X;return(X=v.current)==null?void 0:X.hoverAt(P.i)},onMouseLeave:()=>{var X;return(X=v.current)==null?void 0:X.hoverAt(null)},children:[L.jsx("i",{style:{background:P.color}}),L.jsx("span",{children:EC(P.name,U.q)}),L.jsx("b",{children:P.deg})]},P.i)):L.jsx("div",{style:{padding:"14px 16px",color:"var(--faint)",fontSize:"12px"},children:"Keine passenden Objekte im System-of-Record"})}),L.jsxs("div",{className:"foot",children:[L.jsxs("div",{children:[L.jsx("div",{className:"k",id:"s-node",ref:p,children:"—"}),L.jsx("div",{className:"l",children:"Objekte"})]}),L.jsxs("div",{children:[L.jsx("div",{className:"k",id:"s-edge",ref:g,children:"—"}),L.jsx("div",{className:"l",children:"Kanten"})]}),L.jsxs("div",{children:[L.jsx("div",{className:"k",id:"s-deg",ref:S,children:"—"}),L.jsx("div",{className:"l",children:"Ø-Grad"})]}),L.jsxs("div",{children:[L.jsx("div",{className:"k",id:"s-fps",ref:m,children:"—"}),L.jsx("div",{className:"l",children:"FPS"})]})]})]}),L.jsxs("div",{id:"stage",ref:r,children:[L.jsx("div",{id:"labels",ref:o}),L.jsxs("div",{id:"hud",children:[L.jsx("div",{children:L.jsx("b",{id:"hud-mode",ref:l,children:"GALAXIE · FREIER ORBIT"})}),L.jsx("div",{id:"hud-sel",ref:c,children:"Nichts ausgewählt"}),L.jsxs("div",{id:"hud-sys",children:[n.length," VON ",e.nodes.length," OBJEKTEN · ",i.length," VON ",e.edges.length," KANTEN"]})]}),L.jsxs("div",{id:"pathbar",ref:d,children:[L.jsx("span",{className:"chain",id:"chain",ref:h}),L.jsx("button",{className:"x",id:"path-x",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.clearPath()},children:"✕"})]}),L.jsxs("div",{id:"tools",children:[[["atlas","Galaxie"],["shell","Planet"],["tier","Pipeline"]].map(([P,X])=>L.jsx("button",{className:"tb"+(O===P?" on":""),"data-view":P,type:"button",onClick:()=>{var pt;I(P),(pt=v.current)==null||pt.setView(P)},children:X},P)),L.jsx("span",{className:"sep"}),L.jsx("button",{className:"tb"+(w.flow?" on":""),id:"t-flow",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.toggleFlow()},children:"Signalfluss"}),L.jsx("button",{className:"tb"+(w.label?" on":""),id:"t-label",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.toggleLabel()},children:"Labels"}),L.jsx("button",{className:"tb"+(w.spin?" on":""),id:"t-spin",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.toggleSpin()},children:"Auto-Orbit"}),L.jsx("span",{className:"sep"}),L.jsx("button",{className:"tb",id:"zout",type:"button",title:"Rauszoomen",onClick:()=>{var P;return(P=v.current)==null?void 0:P.dolly(1.18)},children:"−"}),L.jsx("button",{className:"tb",id:"zlvl",type:"button",title:"Zoom zurücksetzen",ref:u,onClick:()=>{var P;return(P=v.current)==null?void 0:P.zoomReset()},children:"100%"}),L.jsx("button",{className:"tb",id:"zin",type:"button",title:"Reinzoomen",onClick:()=>{var P;return(P=v.current)==null?void 0:P.dolly(1/1.18)},children:"＋"}),L.jsx("span",{className:"sep"}),L.jsx("button",{className:"tb",id:"t-theme",type:"button",title:"Theme wechseln",onClick:()=>{var P;return(P=v.current)==null?void 0:P.toggleTheme()},children:z==="light"?"Nacht":"Tag"}),L.jsx("button",{className:"tb",id:"t-reset",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.reset()},children:"Reset"})]}),L.jsxs("div",{id:"hint",children:["Ziehen rotiert · Scrollen oder ",L.jsx("kbd",{children:"+"}),"/",L.jsx("kbd",{children:"−"})," zoomt · Klick fokussiert ein Objekt",L.jsx("br",{})," ",L.jsx("kbd",{children:"Shift"}),"+Klick auf ein zweites Objekt zeigt die kürzeste Kausalkette · ",L.jsx("kbd",{children:"Esc"})," löst die Auswahl"]}),L.jsxs("div",{id:"gate",style:M?{display:"grid"}:void 0,children:["WebGL ist auf diesem Gerät nicht verfügbar.",L.jsx("br",{}),"Suche und Objekt-Inspector bleiben nutzbar."]})]}),L.jsx("div",{id:"drawer",children:L.jsx("div",{className:"dr",id:"dr",children:T&&L.jsxs(L.Fragment,{children:[L.jsxs("div",{className:"dr-head",children:[L.jsxs("div",{className:"kind",children:[L.jsx("i",{style:{background:T.color}}),T.cname," · Grad ",T.deg," · Ebene ",T.depth]}),L.jsx("h2",{children:T.name}),L.jsx("p",{children:T.desc}),L.jsxs("dl",{className:"prov",children:[T.kind&&L.jsxs(L.Fragment,{children:[L.jsx("dt",{children:"Typ"}),L.jsx("dd",{children:T.kind})]}),T.path&&L.jsxs(L.Fragment,{children:[L.jsx("dt",{children:"Pfad"}),L.jsx("dd",{className:"mono",children:T.path})]}),T.status&&L.jsxs(L.Fragment,{children:[L.jsx("dt",{children:"Status"}),L.jsx("dd",{className:bC(T.status)?"bad":"",children:T.status})]}),T.prov&&L.jsxs(L.Fragment,{children:[L.jsx("dt",{children:"Provenienz"}),L.jsx("dd",{children:T.prov})]})]})]}),L.jsx("div",{className:"dr-body",children:T.groups.map(P=>L.jsxs("div",{className:"dr-sec",children:[L.jsxs("h3",{children:[P.title," ",L.jsx("b",{style:{color:"var(--faint)",opacity:.6},children:P.items.length})]}),P.items.map(X=>L.jsxs("div",{className:"nb","data-i":X.i,onClick:()=>{var pt;return(pt=v.current)==null?void 0:pt.selectAt(X.i)},children:[L.jsx("i",{style:{background:X.color}}),L.jsx("span",{children:X.name}),L.jsx("u",{children:P.tag})]},X.i))]},P.tag))}),L.jsxs("div",{className:"dr-act",children:[L.jsx("button",{className:"btn",id:"a-center",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.centerOn(T.i)},children:"Hier zentrieren"}),L.jsx("button",{className:"btn primary",id:"a-path",type:"button",onClick:()=>{var P;return(P=v.current)==null?void 0:P.startPath(T.i)},children:"Kausalkette ab hier"})]})]})})})]})}UE.createRoot(document.getElementById("root")).render(L.jsx(Ut.StrictMode,{children:L.jsx(MC,{})}));

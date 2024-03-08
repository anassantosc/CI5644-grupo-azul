(()=>{var e={};e.id=820,e.ids=[820,888,660],e.modules={1323:(e,t)=>{"use strict";Object.defineProperty(t,"l",{enumerable:!0,get:function(){return function e(t,r){return r in t?t[r]:"then"in t&&"function"==typeof t.then?t.then(t=>e(t,r)):"function"==typeof t&&"default"===r?t:void 0}}})},5263:(e,t,r)=>{"use strict";r.r(t),r.d(t,{config:()=>h,default:()=>d,getServerSideProps:()=>f,getStaticPaths:()=>p,getStaticProps:()=>c,reportWebVitals:()=>g,routeModule:()=>v,unstable_getServerProps:()=>b,unstable_getServerSideProps:()=>P,unstable_getStaticParams:()=>x,unstable_getStaticPaths:()=>y,unstable_getStaticProps:()=>m});var n=r(7093),s=r(5244),i=r(1323),o=r(1777),u=r.n(o),l=r(7094),a=r(8539);let d=(0,i.l)(a,"default"),c=(0,i.l)(a,"getStaticProps"),p=(0,i.l)(a,"getStaticPaths"),f=(0,i.l)(a,"getServerSideProps"),h=(0,i.l)(a,"config"),g=(0,i.l)(a,"reportWebVitals"),m=(0,i.l)(a,"unstable_getStaticProps"),y=(0,i.l)(a,"unstable_getStaticPaths"),x=(0,i.l)(a,"unstable_getStaticParams"),b=(0,i.l)(a,"unstable_getServerProps"),P=(0,i.l)(a,"unstable_getServerSideProps"),v=new n.PagesRouteModule({definition:{kind:s.x.PAGES,page:"/_error",pathname:"/_error",bundlePath:"",filename:""},components:{App:l.default,Document:u()},userland:a})},8539:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return d}});let n=r(167),s=r(997),i=n._(r(6689)),o=n._(r(6665)),u={400:"Bad Request",404:"This page could not be found",405:"Method Not Allowed",500:"Internal Server Error"};function l(e){let{res:t,err:r}=e;return{statusCode:t&&t.statusCode?t.statusCode:r?r.statusCode:404}}let a={error:{fontFamily:'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',height:"100vh",textAlign:"center",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},desc:{lineHeight:"48px"},h1:{display:"inline-block",margin:"0 20px 0 0",paddingRight:23,fontSize:24,fontWeight:500,verticalAlign:"top"},h2:{fontSize:14,fontWeight:400,lineHeight:"28px"},wrap:{display:"inline-block"}};class d extends i.default.Component{render(){let{statusCode:e,withDarkMode:t=!0}=this.props,r=this.props.title||u[e]||"An unexpected error has occurred";return(0,s.jsxs)("div",{style:a.error,children:[(0,s.jsx)(o.default,{children:(0,s.jsx)("title",{children:e?e+": "+r:"Application error: a client-side exception has occurred"})}),(0,s.jsxs)("div",{style:a.desc,children:[(0,s.jsx)("style",{dangerouslySetInnerHTML:{__html:"body{color:#000;background:#fff;margin:0}.next-error-h1{border-right:1px solid rgba(0,0,0,.3)}"+(t?"@media (prefers-color-scheme:dark){body{color:#fff;background:#000}.next-error-h1{border-right:1px solid rgba(255,255,255,.3)}}":"")}}),e?(0,s.jsx)("h1",{className:"next-error-h1",style:a.h1,children:e}):null,(0,s.jsx)("div",{style:a.wrap,children:(0,s.jsxs)("h2",{style:a.h2,children:[this.props.title||e?r:(0,s.jsx)(s.Fragment,{children:"Application error: a client-side exception has occurred (see the browser console for more information)"}),"."]})})]})]})}}d.displayName="ErrorPage",d.getInitialProps=l,d.origGetInitialProps=l,("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},2771:(e,t)=>{"use strict";function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},6665:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{defaultHead:function(){return c},default:function(){return g}});let n=r(167),s=r(8760),i=r(997),o=s._(r(6689)),u=n._(r(8747)),l=r(8039),a=r(1988),d=r(2771);function c(e){void 0===e&&(e=!1);let t=[(0,i.jsx)("meta",{charSet:"utf-8"})];return e||t.push((0,i.jsx)("meta",{name:"viewport",content:"width=device-width"})),t}function p(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===o.default.Fragment?e.concat(o.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(1558);let f=["name","httpEquiv","charSet","itemProp"];function h(e,t){let{inAmpMode:r}=t;return e.reduce(p,[]).reverse().concat(c(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return s=>{let i=!0,o=!1;if(s.key&&"number"!=typeof s.key&&s.key.indexOf("$")>0){o=!0;let t=s.key.slice(s.key.indexOf("$")+1);e.has(t)?i=!1:e.add(t)}switch(s.type){case"title":case"base":t.has(s.type)?i=!1:t.add(s.type);break;case"meta":for(let e=0,t=f.length;e<t;e++){let t=f[e];if(s.props.hasOwnProperty(t)){if("charSet"===t)r.has(t)?i=!1:r.add(t);else{let e=s.props[t],r=n[t]||new Set;("name"!==t||!o)&&r.has(e)?i=!1:(r.add(e),n[t]=r)}}}}return i}}()).reverse().map((e,t)=>{let n=e.key||t;if(!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,o.default.cloneElement(e,t)}return o.default.cloneElement(e,{key:n})})}let g=function(e){let{children:t}=e,r=(0,o.useContext)(l.AmpStateContext),n=(0,o.useContext)(a.HeadManagerContext);return(0,i.jsx)(u.default,{reduceComponentsToState:h,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},8747:(e,t,r)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return o}});let n=r(6689),s=()=>{},i=()=>{};function o(e){var t;let{headManager:r,reduceComponentsToState:o}=e;function u(){if(r&&r.mountedInstances){let t=n.Children.toArray(Array.from(r.mountedInstances).filter(Boolean));r.updateHead(o(t,e))}}return null==r||null==(t=r.mountedInstances)||t.add(e.children),u(),s(()=>{var t;return null==r||null==(t=r.mountedInstances)||t.add(e.children),()=>{var t;null==r||null==(t=r.mountedInstances)||t.delete(e.children)}}),s(()=>(r&&(r._pendingUpdate=u),()=>{r&&(r._pendingUpdate=u)})),i(()=>(r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null),()=>{r&&r._pendingUpdate&&(r._pendingUpdate(),r._pendingUpdate=null)})),null}},1558:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"warnOnce",{enumerable:!0,get:function(){return r}});let r=e=>{}},309:(e,t,r)=>{"use strict";r.d(t,{V:()=>c,u:()=>p});var n=r(997),s=r(6689),i=r(7242),o=r(9580),u=r.n(o),l=r(580),a=r.n(l);let d=(0,s.createContext)(),c=()=>{try{let e=(0,s.useContext)(d);if(!e)throw Error("useAlert must be used within an AlertProvider");return e}catch(e){console.error(e)}},p=({children:e})=>{let[t,r]=(0,s.useState)(!1),[o,l]=(0,s.useState)(""),[a,c]=(0,s.useState)("info"),p=(0,s.useCallback)((e,t="info")=>{l(e),c(t),r(!0),setTimeout(()=>{r(!1)},3e3)},[l,c,r]);return(0,n.jsxs)(d.Provider,{value:p,children:[e,n.jsx(i.default,{in:t,timeout:1e3,children:n.jsx(u(),{severity:a,onClose:()=>{r(!1)},sx:{position:"fixed",bottom:5,left:5,zIndex:10},children:o})})]})};p.propTypes={children:a().object}},7094:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>u});var n=r(997),s=r(309);r(9605);var i=r(580),o=r.n(i);function u({Component:e,pageProps:t}){return n.jsx(s.u,{children:n.jsx(e,{...t})})}u.propTypes={Component:o().elementType.isRequired,pageProps:o().object.isRequired}},9605:()=>{},5244:(e,t)=>{"use strict";var r;Object.defineProperty(t,"x",{enumerable:!0,get:function(){return r}}),function(e){e.PAGES="PAGES",e.PAGES_API="PAGES_API",e.APP_PAGE="APP_PAGE",e.APP_ROUTE="APP_ROUTE"}(r||(r={}))},8039:(e,t,r)=>{"use strict";e.exports=r(7093).vendored.contexts.AmpContext},1988:(e,t,r)=>{"use strict";e.exports=r(7093).vendored.contexts.HeadManagerContext},9295:e=>{"use strict";e.exports=require("@mui/base/composeClasses")},7986:e=>{"use strict";e.exports=require("@mui/system")},657:e=>{"use strict";e.exports=require("@mui/utils")},1416:e=>{"use strict";e.exports=require("@mui/utils/formatMuiErrorMessage")},1392:e=>{"use strict";e.exports=require("@mui/utils/generateUtilityClass")},2558:e=>{"use strict";e.exports=require("@mui/utils/generateUtilityClasses")},8103:e=>{"use strict";e.exports=require("clsx")},2785:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/pages.runtime.prod.js")},580:e=>{"use strict";e.exports=require("prop-types")},6689:e=>{"use strict";e.exports=require("react")},4466:e=>{"use strict";e.exports=require("react-transition-group")},997:e=>{"use strict";e.exports=require("react/jsx-runtime")},1017:e=>{"use strict";e.exports=require("path")},8760:(e,t)=>{"use strict";function r(e){if("function"!=typeof WeakMap)return null;var t=new WeakMap,n=new WeakMap;return(r=function(e){return e?n:t})(e)}t._=t._interop_require_wildcard=function(e,t){if(!t&&e&&e.__esModule)return e;if(null===e||"object"!=typeof e&&"function"!=typeof e)return{default:e};var n=r(t);if(n&&n.has(e))return n.get(e);var s={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var o in e)if("default"!==o&&Object.prototype.hasOwnProperty.call(e,o)){var u=i?Object.getOwnPropertyDescriptor(e,o):null;u&&(u.get||u.set)?Object.defineProperty(s,o,u):s[o]=e[o]}return s.default=e,n&&n.set(e,s),s}}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),n=t.X(0,[82,777],()=>r(5263));module.exports=n})();
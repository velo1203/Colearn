"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[60],{4942:function(e,n,t){t.d(n,{Z:function(){return o}});var r=t(9142);function o(e,n,t){return(n=(0,r.Z)(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}},1413:function(e,n,t){t.d(n,{Z:function(){return i}});var r=t(4942);function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){(0,r.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}},1060:function(e,n,t){t.d(n,{ZP:function(){return ae}});var r=t(9439),o=t(1413);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function u(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?u(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):u(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function a(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}function l(e,n){(null==n||n>e.length)&&(n=e.length);for(var t=0,r=new Array(n);t<n;t++)r[t]=e[t];return r}function f(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function d(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?d(Object(t),!0).forEach((function(n){f(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function v(e){return function n(){for(var t=this,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.length>=e.length?e.apply(this,o):function(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return n.apply(t,[].concat(o,r))}}}function g(e){return{}.toString.call(e).includes("Object")}function p(e){return"function"===typeof e}var h=v((function(e,n){throw new Error(e[n]||e.default)}))({initialIsRequired:"initial state is required",initialType:"initial state should be an object",initialContent:"initial state shouldn't be an empty object",handlerType:"handler should be an object or a function",handlersType:"all handlers should be a functions",selectorType:"selector should be a function",changeType:"provided value of changes should be an object",changeField:'it seams you want to change a field in the state which is not specified in the "initial" state',default:"an unknown error accured in `state-local` package"}),y={changes:function(e,n){return g(n)||h("changeType"),Object.keys(n).some((function(n){return t=e,r=n,!Object.prototype.hasOwnProperty.call(t,r);var t,r}))&&h("changeField"),n},selector:function(e){p(e)||h("selectorType")},handler:function(e){p(e)||g(e)||h("handlerType"),g(e)&&Object.values(e).some((function(e){return!p(e)}))&&h("handlersType")},initial:function(e){var n;e||h("initialIsRequired"),g(e)||h("initialType"),n=e,Object.keys(n).length||h("initialContent")}};function b(e,n){return p(n)?n(e.current):n}function m(e,n){return e.current=s(s({},e.current),n),n}function O(e,n,t){return p(n)?n(e.current):Object.keys(t).forEach((function(t){var r;return null===(r=n[t])||void 0===r?void 0:r.call(n,e.current[t])})),t}var w={create:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};y.initial(e),y.handler(n);var t={current:e},r=v(O)(t,n),o=v(m)(t),i=v(y.changes)(e),u=v(b)(t);return[function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(e){return e};return y.selector(e),e(t.current)},function(e){!function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){return n.reduceRight((function(e,n){return n(e)}),e)}}(r,o,i,u)(e)}]}},j=w,M={paths:{vs:"https://cdn.jsdelivr.net/npm/monaco-editor@0.36.1/min/vs"}};var P=function(e){return function n(){for(var t=this,r=arguments.length,o=new Array(r),i=0;i<r;i++)o[i]=arguments[i];return o.length>=e.length?e.apply(this,o):function(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];return n.apply(t,[].concat(o,r))}}};var E=function(e){return{}.toString.call(e).includes("Object")};var k={configIsRequired:"the configuration object is required",configType:"the configuration object should be an object",default:"an unknown error accured in `@monaco-editor/loader` package",deprecation:"Deprecation warning!\n    You are using deprecated way of configuration.\n\n    Instead of using\n      monaco.config({ urls: { monacoBase: '...' } })\n    use\n      monaco.config({ paths: { vs: '...' } })\n\n    For more please check the link https://github.com/suren-atoyan/monaco-loader#config\n  "},R=P((function(e,n){throw new Error(e[n]||e.default)}))(k),S={config:function(e){return e||R("configIsRequired"),E(e)||R("configType"),e.urls?(console.warn(k.deprecation),{paths:{vs:e.urls.monacoBase}}):e}},C=S,T=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){return n.reduceRight((function(e,n){return n(e)}),e)}};var x=function e(n,t){return Object.keys(t).forEach((function(r){t[r]instanceof Object&&n[r]&&Object.assign(t[r],e(n[r],t[r]))})),c(c({},n),t)},D={type:"cancelation",msg:"operation is manually canceled"};var I,Z,A=function(e){var n=!1,t=new Promise((function(t,r){e.then((function(e){return n?r(D):t(e)})),e.catch(r)}));return t.cancel=function(){return n=!0},t},V=j.create({config:M,isInitialized:!1,resolve:null,reject:null,monaco:null}),L=(Z=2,function(e){if(Array.isArray(e))return e}(I=V)||function(e,n){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e)){var t=[],r=!0,o=!1,i=void 0;try{for(var u,c=e[Symbol.iterator]();!(r=(u=c.next()).done)&&(t.push(u.value),!n||t.length!==n);r=!0);}catch(a){o=!0,i=a}finally{try{r||null==c.return||c.return()}finally{if(o)throw i}}return t}}(I,Z)||function(e,n){if(e){if("string"===typeof e)return l(e,n);var t=Object.prototype.toString.call(e).slice(8,-1);return"Object"===t&&e.constructor&&(t=e.constructor.name),"Map"===t||"Set"===t?Array.from(e):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?l(e,n):void 0}}(I,Z)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),q=L[0],z=L[1];function N(e){return document.body.appendChild(e)}function F(e){var n=q((function(e){return{config:e.config,reject:e.reject}})),t=function(e){var n=document.createElement("script");return e&&(n.src=e),n}("".concat(n.config.paths.vs,"/loader.js"));return t.onload=function(){return e()},t.onerror=n.reject,t}function _(){var e=q((function(e){return{config:e.config,resolve:e.resolve,reject:e.reject}})),n=window.require;n.config(e.config),n(["vs/editor/editor.main"],(function(n){U(n),e.resolve(n)}),(function(n){e.reject(n)}))}function U(e){q().monaco||z({monaco:e})}var B=new Promise((function(e,n){return z({resolve:e,reject:n})})),W={config:function(e){var n=C.config(e),t=n.monaco,r=a(n,["monaco"]);z((function(e){return{config:x(e.config,r),monaco:t}}))},init:function(){var e=q((function(e){return{monaco:e.monaco,isInitialized:e.isInitialized,resolve:e.resolve}}));if(!e.isInitialized){if(z({isInitialized:!0}),e.monaco)return e.resolve(e.monaco),A(B);if(window.monaco&&window.monaco.editor)return U(window.monaco),e.resolve(window.monaco),A(B);T(N,F)(_)}return A(B)},__getMonacoInstance:function(){return q((function(e){return e.monaco}))}},Y=W,$=t(2791),G={wrapper:{display:"flex",position:"relative",textAlign:"initial"},fullWidth:{width:"100%"},hide:{display:"none"}},H={container:{display:"flex",height:"100%",width:"100%",justifyContent:"center",alignItems:"center"}};var J=function(e){var n=e.children;return $.createElement("div",{style:H.container},n)};var K=function(e){var n=e.width,t=e.height,r=e.isEditorReady,i=e.loading,u=e._ref,c=e.className,a=e.wrapperProps;return $.createElement("section",(0,o.Z)({style:(0,o.Z)((0,o.Z)({},G.wrapper),{},{width:n,height:t})},a),!r&&$.createElement(J,null,i),$.createElement("div",{ref:u,style:(0,o.Z)((0,o.Z)({},G.fullWidth),!r&&G.hide),className:c}))},Q=(0,$.memo)(K);var X=function(e){(0,$.useEffect)(e,[])};var ee=function(e,n){var t=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=(0,$.useRef)(!0);(0,$.useEffect)(r.current||!t?function(){r.current=!1}:e,n)};function ne(){}function te(e,n,t,r){return function(e,n){return e.editor.getModel(re(e,n))}(e,r)||function(e,n,t,r){return e.editor.createModel(n,t,r?re(e,r):void 0)}(e,n,t,r)}function re(e,n){return e.Uri.parse(n)}var oe=function(e){var n=e.original,t=e.modified,i=e.language,u=e.originalLanguage,c=e.modifiedLanguage,a=e.originalModelPath,l=e.modifiedModelPath,f=e.keepCurrentOriginalModel,d=void 0!==f&&f,s=e.keepCurrentModifiedModel,v=void 0!==s&&s,g=e.theme,p=void 0===g?"light":g,h=e.loading,y=void 0===h?"Loading...":h,b=e.options,m=void 0===b?{}:b,O=e.height,w=void 0===O?"100%":O,j=e.width,M=void 0===j?"100%":j,P=e.className,E=e.wrapperProps,k=void 0===E?{}:E,R=e.beforeMount,S=void 0===R?ne:R,C=e.onMount,T=void 0===C?ne:C,x=(0,$.useState)(!1),D=(0,r.Z)(x,2),I=D[0],Z=D[1],A=(0,$.useState)(!0),V=(0,r.Z)(A,2),L=V[0],q=V[1],z=(0,$.useRef)(null),N=(0,$.useRef)(null),F=(0,$.useRef)(null),_=(0,$.useRef)(T),U=(0,$.useRef)(S),B=(0,$.useRef)(!1);X((function(){var e=Y.init();return e.then((function(e){return(N.current=e)&&q(!1)})).catch((function(e){return"cancelation"!==(null===e||void 0===e?void 0:e.type)&&console.error("Monaco initialization: error:",e)})),function(){return z.current?function(){var e,n,t,r,o=null===(e=z.current)||void 0===e?void 0:e.getModel();d||null!==o&&void 0!==o&&null!==(n=o.original)&&void 0!==n&&n.dispose(),v||null!==o&&void 0!==o&&null!==(t=o.modified)&&void 0!==t&&t.dispose(),null===(r=z.current)||void 0===r||r.dispose()}():e.cancel()}})),ee((function(){var e=z.current.getModifiedEditor();e.getOption(N.current.editor.EditorOption.readOnly)?e.setValue(t||""):t!==e.getValue()&&(e.executeEdits("",[{range:e.getModel().getFullModelRange(),text:t||"",forceMoveMarkers:!0}]),e.pushUndoStop())}),[t],I),ee((function(){var e,t;null===(e=z.current)||void 0===e||null===(t=e.getModel())||void 0===t||t.original.setValue(n||"")}),[n],I),ee((function(){var e=z.current.getModel(),n=e.original,t=e.modified;N.current.editor.setModelLanguage(n,u||i||"text"),N.current.editor.setModelLanguage(t,c||i||"text")}),[i,u,c],I),ee((function(){var e;null===(e=N.current)||void 0===e||e.editor.setTheme(p)}),[p],I),ee((function(){var e;null===(e=z.current)||void 0===e||e.updateOptions(m)}),[m],I);var W=(0,$.useCallback)((function(){var e;if(N.current){U.current(N.current);var r=te(N.current,n||"",u||i||"text",a||""),o=te(N.current,t||"",c||i||"text",l||"");null===(e=z.current)||void 0===e||e.setModel({original:r,modified:o})}}),[i,t,c,n,u,a,l]),G=(0,$.useCallback)((function(){var e;!B.current&&F.current&&(z.current=N.current.editor.createDiffEditor(F.current,(0,o.Z)({automaticLayout:!0},m)),W(),null!==(e=N.current)&&void 0!==e&&e.editor.setTheme(p),Z(!0),B.current=!0)}),[m,p,W]);return(0,$.useEffect)((function(){I&&_.current(z.current,N.current)}),[I]),(0,$.useEffect)((function(){!L&&!I&&G()}),[L,I,G]),ee((function(){if(z.current&&N.current){var e=z.current.getOriginalEditor(),t=te(N.current,n||"",u||i||"text",a||"");t!==e.getModel()&&e.setModel(t)}}),[a],I),ee((function(){if(z.current&&N.current){var e=z.current.getModifiedEditor(),n=te(N.current,t||"",c||i||"text",l||"");n!==e.getModel()&&e.setModel(n)}}),[l],I),$.createElement(Q,{width:M,height:w,isEditorReady:I,loading:y,_ref:F,className:P,wrapperProps:k})};(0,$.memo)(oe);var ie=function(e){var n=(0,$.useRef)();return(0,$.useEffect)((function(){n.current=e}),[e]),n.current},ue=new Map;var ce=function(e){var n=e.defaultValue,t=e.defaultLanguage,i=e.defaultPath,u=e.value,c=e.language,a=e.path,l=e.theme,f=void 0===l?"light":l,d=e.line,s=e.loading,v=void 0===s?"Loading...":s,g=e.options,p=void 0===g?{}:g,h=e.overrideServices,y=void 0===h?{}:h,b=e.saveViewState,m=void 0===b||b,O=e.keepCurrentModel,w=void 0!==O&&O,j=e.width,M=void 0===j?"100%":j,P=e.height,E=void 0===P?"100%":P,k=e.className,R=e.wrapperProps,S=void 0===R?{}:R,C=e.beforeMount,T=void 0===C?ne:C,x=e.onMount,D=void 0===x?ne:x,I=e.onChange,Z=e.onValidate,A=void 0===Z?ne:Z,V=(0,$.useState)(!1),L=(0,r.Z)(V,2),q=L[0],z=L[1],N=(0,$.useState)(!0),F=(0,r.Z)(N,2),_=F[0],U=F[1],B=(0,$.useRef)(null),W=(0,$.useRef)(null),G=(0,$.useRef)(null),H=(0,$.useRef)(D),J=(0,$.useRef)(T),K=(0,$.useRef)(),re=(0,$.useRef)(u),oe=ie(a),ce=(0,$.useRef)(!1),ae=(0,$.useRef)(!1);X((function(){var e=Y.init();return e.then((function(e){return(B.current=e)&&U(!1)})).catch((function(e){return"cancelation"!==(null===e||void 0===e?void 0:e.type)&&console.error("Monaco initialization: error:",e)})),function(){return W.current?function(){var e,n;null!==(e=K.current)&&void 0!==e&&e.dispose(),w?m&&ue.set(a,W.current.saveViewState()):null===(n=W.current.getModel())||void 0===n||n.dispose(),W.current.dispose()}():e.cancel()}})),ee((function(){var e,r,o,l,f=te(B.current,n||u||"",t||c||"",a||i||"");f!==(null===(e=W.current)||void 0===e?void 0:e.getModel())&&(m&&ue.set(oe,null===(r=W.current)||void 0===r?void 0:r.saveViewState()),null!==(o=W.current)&&void 0!==o&&o.setModel(f),m&&(null===(l=W.current)||void 0===l||l.restoreViewState(ue.get(a))))}),[a],q),ee((function(){var e;null===(e=W.current)||void 0===e||e.updateOptions(p)}),[p],q),ee((function(){!W.current||void 0===u||(W.current.getOption(B.current.editor.EditorOption.readOnly)?W.current.setValue(u):u!==W.current.getValue()&&(ae.current=!0,W.current.executeEdits("",[{range:W.current.getModel().getFullModelRange(),text:u,forceMoveMarkers:!0}]),W.current.pushUndoStop(),ae.current=!1))}),[u],q),ee((function(){var e,n,t=null===(e=W.current)||void 0===e?void 0:e.getModel();t&&c&&(null===(n=B.current)||void 0===n||n.editor.setModelLanguage(t,c))}),[c],q),ee((function(){var e;void 0!==d&&(null===(e=W.current)||void 0===e||e.revealLine(d))}),[d],q),ee((function(){var e;null===(e=B.current)||void 0===e||e.editor.setTheme(f)}),[f],q);var le=(0,$.useCallback)((function(){if(G.current&&B.current&&!ce.current){var e;J.current(B.current);var r=a||i,l=te(B.current,u||n||"",t||c||"",r||"");W.current=null===(e=B.current)||void 0===e?void 0:e.editor.create(G.current,(0,o.Z)({model:l,automaticLayout:!0},p),y),m&&W.current.restoreViewState(ue.get(r)),B.current.editor.setTheme(f),z(!0),ce.current=!0}}),[n,t,i,u,c,a,p,y,m,f]);return(0,$.useEffect)((function(){q&&H.current(W.current,B.current)}),[q]),(0,$.useEffect)((function(){!_&&!q&&le()}),[_,q,le]),re.current=u,(0,$.useEffect)((function(){var e,n;q&&I&&(null!==(e=K.current)&&void 0!==e&&e.dispose(),K.current=null===(n=W.current)||void 0===n?void 0:n.onDidChangeModelContent((function(e){ae.current||I(W.current.getValue(),e)})))}),[q,I]),(0,$.useEffect)((function(){if(q){var e=B.current.editor.onDidChangeMarkers((function(e){var n,t=null===(n=W.current.getModel())||void 0===n?void 0:n.uri;if(t&&e.find((function(e){return e.path===t.path}))){var r=B.current.editor.getModelMarkers({resource:t});null===A||void 0===A||A(r)}}));return function(){null===e||void 0===e||e.dispose()}}return function(){}}),[q,A]),$.createElement(Q,{width:M,height:E,isEditorReady:q,loading:v,_ref:G,className:k,wrapperProps:S})},ae=(0,$.memo)(ce)}}]);
//# sourceMappingURL=60.7275abae.chunk.js.map
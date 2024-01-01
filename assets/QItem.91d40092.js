import{c as H,h as j,v as N,g as O,i as W,j as F,u as G,k as J,a as Z}from"./QBtn.ec6d0790.js";import{c as d,h as _,a as D,V as A,w as I,o as ee,g as P,d as R,k as b,l as m,x as K,W as te,X as le,Y as oe,r as X,T as ie}from"./index.eb9ccb69.js";var pe=H({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:t}){const l=d(()=>parseInt(e.lines,10)),o=d(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(l.value===1?" ellipsis":"")),n=d(()=>e.lines!==void 0&&l.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":l.value}:null);return()=>_("div",{style:n.value,class:o.value},j(t.default))}});const ne={dark:{type:Boolean,default:null}};function re(e,t){return d(()=>e.dark===null?t.dark.isActive:e.dark)}function be(e,t,l){let o;function n(){o!==void 0&&(A.remove(o),o=void 0)}return D(()=>{e.value===!0&&n()}),{removeFromHistory:n,addToHistory(){o={condition:()=>l.value===!0,handler:t},A.add(o)}}}const he={modelValue:{type:Boolean,default:null},"onUpdate:modelValue":[Function,Array]},ye=["beforeShow","show","beforeHide","hide"];function ge({showing:e,canShow:t,hideOnRouteChange:l,handleShow:o,handleHide:n,processOnMount:f}){const s=P(),{props:a,emit:c,proxy:k}=s;let u;function p(i){e.value===!0?y(i):h(i)}function h(i){if(a.disable===!0||i!==void 0&&i.qAnchorHandled===!0||t!==void 0&&t(i)!==!0)return;const r=a["onUpdate:modelValue"]!==void 0;r===!0&&(c("update:modelValue",!0),u=i,R(()=>{u===i&&(u=void 0)})),(a.modelValue===null||r===!1)&&v(i)}function v(i){e.value!==!0&&(e.value=!0,c("beforeShow",i),o!==void 0?o(i):c("show",i))}function y(i){if(a.disable===!0)return;const r=a["onUpdate:modelValue"]!==void 0;r===!0&&(c("update:modelValue",!1),u=i,R(()=>{u===i&&(u=void 0)})),(a.modelValue===null||r===!1)&&L(i)}function L(i){e.value!==!1&&(e.value=!1,c("beforeHide",i),n!==void 0?n(i):c("hide",i))}function T(i){a.disable===!0&&i===!0?a["onUpdate:modelValue"]!==void 0&&c("update:modelValue",!1):i===!0!==e.value&&(i===!0?v:L)(u)}I(()=>a.modelValue,T),l!==void 0&&N(s)===!0&&I(()=>k.$route.fullPath,()=>{l.value===!0&&e.value===!0&&y()}),f===!0&&ee(()=>{T(a.modelValue)});const E={show:h,hide:y,toggle:p};return Object.assign(k,E),E}const se=[null,document,document.body,document.scrollingElement,document.documentElement];function qe(e,t){let l=O(t);if(l===void 0){if(e==null)return window;l=e.closest(".scroll,.scroll-y,.overflow-auto")}return se.includes(l)?window:l}function ae(e){return e===window?window.pageYOffset||window.scrollY||document.body.scrollTop||0:e.scrollTop}function ue(e){return e===window?window.pageXOffset||window.scrollX||document.body.scrollLeft||0:e.scrollLeft}let S;function ke(){if(S!==void 0)return S;const e=document.createElement("p"),t=document.createElement("div");W(e,{width:"100%",height:"200px"}),W(t,{position:"absolute",top:"0px",left:"0px",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t);const l=e.offsetWidth;t.style.overflow="scroll";let o=e.offsetWidth;return l===o&&(o=t.clientWidth),t.remove(),S=l-o,S}function ce(e,t=!0){return!e||e.nodeType!==Node.ELEMENT_NODE?!1:t?e.scrollHeight>e.clientHeight&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-y"])):e.scrollWidth>e.clientWidth&&(e.classList.contains("scroll")||e.classList.contains("overflow-auto")||["auto","scroll"].includes(window.getComputedStyle(e)["overflow-x"]))}let g=0,C,V,q,B=!1,Y,$,z,w=null;function de(e){fe(e)&&K(e)}function fe(e){if(e.target===document.body||e.target.classList.contains("q-layout__backdrop"))return!0;const t=te(e),l=e.shiftKey&&!e.deltaX,o=!l&&Math.abs(e.deltaX)<=Math.abs(e.deltaY),n=l||o?e.deltaY:e.deltaX;for(let f=0;f<t.length;f++){const s=t[f];if(ce(s,o))return o?n<0&&s.scrollTop===0?!0:n>0&&s.scrollTop+s.clientHeight===s.scrollHeight:n<0&&s.scrollLeft===0?!0:n>0&&s.scrollLeft+s.clientWidth===s.scrollWidth}return!0}function Q(e){e.target===document&&(document.scrollingElement.scrollTop=document.scrollingElement.scrollTop)}function x(e){B!==!0&&(B=!0,requestAnimationFrame(()=>{B=!1;const{height:t}=e.target,{clientHeight:l,scrollTop:o}=document.scrollingElement;(q===void 0||t!==window.innerHeight)&&(q=l-t,document.scrollingElement.scrollTop=o),o>q&&(document.scrollingElement.scrollTop-=Math.ceil((o-q)/8))}))}function U(e){const t=document.body,l=window.visualViewport!==void 0;if(e==="add"){const{overflowY:o,overflowX:n}=window.getComputedStyle(t);C=ue(window),V=ae(window),Y=t.style.left,$=t.style.top,z=window.location.href,t.style.left=`-${C}px`,t.style.top=`-${V}px`,n!=="hidden"&&(n==="scroll"||t.scrollWidth>window.innerWidth)&&t.classList.add("q-body--force-scrollbar-x"),o!=="hidden"&&(o==="scroll"||t.scrollHeight>window.innerHeight)&&t.classList.add("q-body--force-scrollbar-y"),t.classList.add("q-body--prevent-scroll"),document.qScrollPrevented=!0,b.is.ios===!0&&(l===!0?(window.scrollTo(0,0),window.visualViewport.addEventListener("resize",x,m.passiveCapture),window.visualViewport.addEventListener("scroll",x,m.passiveCapture),window.scrollTo(0,0)):window.addEventListener("scroll",Q,m.passiveCapture))}b.is.desktop===!0&&b.is.mac===!0&&window[`${e}EventListener`]("wheel",de,m.notPassive),e==="remove"&&(b.is.ios===!0&&(l===!0?(window.visualViewport.removeEventListener("resize",x,m.passiveCapture),window.visualViewport.removeEventListener("scroll",x,m.passiveCapture)):window.removeEventListener("scroll",Q,m.passiveCapture)),t.classList.remove("q-body--prevent-scroll"),t.classList.remove("q-body--force-scrollbar-x"),t.classList.remove("q-body--force-scrollbar-y"),document.qScrollPrevented=!1,t.style.left=Y,t.style.top=$,window.location.href===z&&window.scrollTo(C,V),q=void 0)}function ve(e){let t="add";if(e===!0){if(g++,w!==null){clearTimeout(w),w=null;return}if(g>1)return}else{if(g===0||(g--,g>0))return;if(t="remove",b.is.ios===!0&&b.is.nativeMobile===!0){w!==null&&clearTimeout(w),w=setTimeout(()=>{U(t),w=null},100);return}}U(t)}function Le(){let e;return{preventBodyScroll(t){t!==e&&(e!==void 0||t===!0)&&(e=t,ve(t))}}}function Te(){let e=null;const t=P();function l(){e!==null&&(clearTimeout(e),e=null)}return le(l),D(l),{removeTimeout:l,registerTimeout(o,n){l(),F(t)===!1&&(e=setTimeout(o,n))}}}function Ee(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),oe.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Se(e,t,l){return l<=t?t:Math.min(l,Math.max(t,e))}function xe(e,t,l){if(l<=t)return t;const o=l-t+1;let n=t+(e-t)%o;return n<t&&(n=o+n),n===0?0:n}var _e=H({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:t}){const l=d(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>_("div",{class:l.value},j(t.default))}}),Ce=H({name:"QItem",props:{...ne,...G,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:t,emit:l}){const{proxy:{$q:o}}=P(),n=re(e,o),{hasLink:f,linkAttrs:s,linkClass:a,linkTag:c,navigateOnClick:k}=J(),u=X(null),p=X(null),h=d(()=>e.clickable===!0||f.value===!0||e.tag==="label"),v=d(()=>e.disable!==!0&&h.value===!0),y=d(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(n.value===!0?" q-item--dark":"")+(f.value===!0&&e.active===null?a.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(v.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),L=d(()=>{if(e.insetLevel===void 0)return null;const r=o.lang.rtl===!0?"Right":"Left";return{["padding"+r]:16+e.insetLevel*56+"px"}});function T(r){v.value===!0&&(p.value!==null&&(r.qKeyEvent!==!0&&document.activeElement===u.value?p.value.focus():document.activeElement===p.value&&u.value.focus()),k(r))}function E(r){if(v.value===!0&&ie(r,[13,32])===!0){K(r),r.qKeyEvent=!0;const M=new MouseEvent("click",r);M.qKeyEvent=!0,u.value.dispatchEvent(M)}l("keyup",r)}function i(){const r=Z(t.default,[]);return v.value===!0&&r.unshift(_("div",{class:"q-focus-helper",tabindex:-1,ref:p})),r}return()=>{const r={ref:u,class:y.value,style:L.value,role:"listitem",onClick:T,onKeyup:E};return v.value===!0?(r.tabindex=e.tabindex||"0",Object.assign(r,s.value)):h.value===!0&&(r["aria-disabled"]="true"),_(c.value,r,i())}}});export{_e as Q,re as a,he as b,Ee as c,ye as d,Te as e,ge as f,be as g,Se as h,Le as i,qe as j,ae as k,ue as l,ke as m,pe as n,Ce as o,xe as p,ne as u};
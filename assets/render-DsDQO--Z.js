var C=Object.defineProperty;var M=(e,t,r)=>t in e?C(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var N=(e,t,r)=>M(e,typeof t!="symbol"?t+"":t,r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(o){if(o.ep)return;o.ep=!0;const a=r(o);fetch(o.href,a)}})();const F=()=>{const e=new Set;return{subscribe:n=>e.add(n),notify:()=>e.forEach(n=>n())}},q=(e,t)=>{const{subscribe:r,notify:n}=F();let o={...e};const a=c=>{o={...o,...c},n()},l=()=>({...o}),d=Object.fromEntries(Object.entries(t).map(([c,x])=>[c,(...f)=>a(x(l(),...f))]));return{getState:l,setState:a,subscribe:r,actions:d}},B=(e,t=window.localStorage)=>({get:()=>JSON.parse(t.getItem(e)),set:a=>t.setItem(e,JSON.stringify(a)),reset:()=>t.removeItem(e)}),H="/front_5th_chapter1-2";function s(e,t,...r){return{type:e,props:t,children:r.flat(1/0).filter(n=>n===0||!!n)}}const u=new Map;function W(e){e&&Object.keys(u).forEach(t=>{e.addEventListener(t,G)})}function G(e){const{type:t,target:r}=e;if(u[t]){for(const[n,o]of u[t].entries())if(n===r||n.contains(r)){o(e);break}}}function P(e,t,r){u[t]||(u[t]=new Map),u[t].set(e,r)}function V(e,t){u[t]&&u[t].delete(e)}function m(e){if(e===null||typeof e>"u"||typeof e=="boolean")return document.createTextNode("");if(typeof e=="string"||typeof e=="number")return document.createTextNode(e);if(Array.isArray(e)){const a=document.createDocumentFragment();return e.forEach(l=>{const d=m(l);a.appendChild(d)}),a}const{type:t,props:r,children:n}=e,o=document.createElement(t);return J(o,r),n.forEach(a=>{const l=m(a);o.appendChild(l)}),o}function J(e,t){Object.entries(t||{}).forEach(([r,n])=>{if(r.startsWith("on")&&typeof n=="function")return P(e,r.replace("on","").toLowerCase(),n);if(r.startsWith("class")&&typeof n=="string")return e.setAttribute("class",n);e.setAttribute(r,n)})}function E(e){var t;if(e==null||typeof e=="boolean")return"";if(typeof e=="string"||typeof e=="number")return`${e}`;if(e.type&&typeof e.type=="function"){const{type:r,props:n,children:o}=e,a=r({...n,children:o});return E(a)}return{...e,children:(t=e.children)==null?void 0:t.map(E).filter(r=>!!r)}}function T(e,t,r){for(const[n,o]of Object.entries(t))if(r[n]!==o){if(n.startsWith("on")){P(e,n.replace("on","").toLowerCase(),o);continue}if(n.startsWith("class")&&typeof o=="string"){e.setAttribute("class",o);continue}e.setAttribute(n,o)}for(const n of Object.keys(r))if(t[n]===void 0){if(n.startsWith("on")){V(e,n.replace("on","").toLowerCase(),r[n]);continue}e.removeAttribute(n)}}function k(e,t,r,n=0){if(!e)return;if(!t&&r)return e.removeChild(e.childNodes[n]);if(t&&!r){const a=m(t);return e.appendChild(a)}if(typeof t=="string"&&typeof r=="string")return t===r?void 0:e.replaceChild(m(t),e.childNodes[n]);if(t.type!==r.type)return e.replaceChild(m(t),e.childNodes[n]);T(e.childNodes[n],t.props||{},r.props||{});const o=Math.max(t.children.length,r.children.length);for(let a=0;a<o;a++)k(e.childNodes[n],t.children[a],r.children[a],a)}function z(e,t){const r=E(e);if(t.oldNode!==void 0)k(t,r,t.oldNode);else{const n=m(r);t.appendChild(n)}W(t),t.oldNode=r}const b=B("user"),K=1e3,p=K*60,Y=p*60,i=q({currentUser:b.get(),loggedIn:!!b.get(),posts:[{id:1,author:"홍길동",time:Date.now()-5*p,content:"오늘 날씨가 정말 좋네요. 다들 좋은 하루 보내세요!",likeUsers:[]},{id:2,author:"김철수",time:Date.now()-15*p,content:"새로운 프로젝트를 시작했어요. 열심히 코딩 중입니다!",likeUsers:[]},{id:3,author:"이영희",time:Date.now()-30*p,content:"오늘 점심 메뉴 추천 받습니다. 뭐가 좋을까요?",likeUsers:[]},{id:4,author:"박민수",time:Date.now()-30*p,content:"주말에 등산 가실 분 계신가요? 함께 가요!",likeUsers:[]},{id:5,author:"정수연",time:Date.now()-2*Y,content:"새로 나온 영화 재미있대요. 같이 보러 갈 사람?",likeUsers:[]}],error:null},{logout(e){return b.reset(),{...e,currentUser:null,loggedIn:!1}}}),Q=1e3,U=Q*60,A=U*60,R=A*24,X=e=>{const t=Date.now()-e;return t<U?"방금 전":t<A?`${Math.floor(t/U)}분 전`:t<R?`${Math.floor(t/A)}시간 전`:new Date(e).toLocaleString()},Z=({id:e,author:t,time:r,content:n,likeUsers:o,activationLike:a=!1})=>{const{currentUser:l,loggedIn:d,posts:c}=i.getState(),x=()=>{if(!d)return alert("로그인 후 이용해주세요");const f=c.filter(j=>j.id===e)[0],w=f.likeUsers.indexOf(l.username);w===-1&&f.likeUsers.push(l.username),w!==-1&&f.likeUsers.splice(w,1),c[e-1]=f,i.setState({posts:c})};return s("div",{className:"bg-white rounded-lg shadow p-4 mb-4"},s("div",{className:"flex items-center mb-2"},s("div",null,s("div",{className:"font-bold"},t),s("div",{className:"text-gray-500 text-sm"},X(r)))),s("p",null,n),s("div",{className:"mt-2 flex justify-between text-gray-500"},s("span",{onClick:x,className:`like-button cursor-pointer${a?" text-blue-500":""}`},"좋아요 ",o.length),s("span",null,"댓글"),s("span",null,"공유")))},_=()=>{const{currentUser:e,posts:t}=i.getState();return s("div",{className:"mb-4 bg-white rounded-lg shadow p-4"},s("textarea",{id:"post-content",placeholder:"무슨 생각을 하고 계신가요?",className:"w-full p-2 border rounded"}),s("button",{id:"post-submit",onClick:()=>{const n=document.querySelector("#post-content").value,o={id:t.length+1,author:e.username,time:Date.now(),content:n,likeUsers:[]};i.setState({posts:[...t,o]})},className:"mt-2 bg-blue-600 text-white px-4 py-2 rounded"},"게시"))},D=()=>s("header",{className:"bg-blue-600 text-white p-4 sticky top-0"},s("h1",{className:"text-2xl font-bold"},"항해플러스")),I=()=>s("footer",{className:"bg-gray-200 p-4 text-center"},s("p",null,"© $",new Date().getFullYear()," 항해플러스. All rights reserved.")),h={value:null,get(){return this.value},set(e){this.value=e}},S=e=>(window.location.hash?window.location.hash.replace("#",""):window.location.pathname.replace(H,""))===e?"text-blue-600 font-bold":"text-gray-600";function v({onClick:e,children:t,...r}){return s("a",{onClick:o=>{o.preventDefault(),e==null||e(),h.get().push(o.target.href.replace(window.location.origin,""))},...r},t)}const $=()=>{const{loggedIn:e}=i.getState(),{logout:t}=i.actions;return s("nav",{className:"bg-white shadow-md p-2 sticky top-14"},s("ul",{className:"flex justify-around"},s("li",null,s(v,{href:"/",className:S("/")},"홈")),!e&&s("li",null,s(v,{href:"/login",className:S("/login")},"로그인")),e&&s("li",null,s(v,{href:"/profile",className:S("/profile")},"프로필")),e&&s("li",null,s("a",{href:"#",id:"logout",className:"text-gray-600",onClick:r=>{r.preventDefault(),t()}},"로그아웃"))))},ne=()=>{const{posts:e,loggedIn:t}=i.getState();return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(D,null),s($,null),s("main",{className:"p-4"},t&&s(_,null),s("div",{id:"posts-container",className:"space-y-4"},[...e].sort((r,n)=>n.time-r.time).map(r=>s(Z,{...r,activationLike:likeUsers.includes(username)})))),s(I,null)))};function ee(e){const t={username:e,email:"",bio:""};i.setState({currentUser:t,loggedIn:!0}),b.set(t)}const oe=()=>s("div",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full max-w-md"},s("h1",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"항해플러스"),s("form",{id:"login-form",onSubmit:t=>{t.preventDefault();const r=document.getElementById("username").value;ee(r)}},s("input",{type:"text",id:"username",placeholder:"사용자 이름",className:"w-full p-2 mb-4 border rounded",required:!0}),s("input",{type:"password",placeholder:"비밀번호",className:"w-full p-2 mb-6 border rounded",required:!0}),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded"},"로그인")),s("div",{className:"mt-4 text-center"},s("a",{href:"#",className:"text-blue-600 text-sm"},"비밀번호를 잊으셨나요?")),s("hr",{className:"my-6"}),s("div",{className:"text-center"},s("button",{className:"bg-green-500 text-white px-4 py-2 rounded"},"새 계정 만들기")))),te=()=>s("main",{className:"bg-gray-100 flex items-center justify-center min-h-screen"},s("div",{className:"bg-white p-8 rounded-lg shadow-md w-full text-center",style:"max-width: 480px"},s("h1",{className:"text-2xl font-bold text-blue-600 mb-4"},"항해플러스"),s("p",{className:"text-4xl font-bold text-gray-800 mb-4"},"404"),s("p",{className:"text-xl text-gray-600 mb-8"},"페이지를 찾을 수 없습니다"),s("p",{className:"text-gray-600 mb-8"},"요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다."),s("a",{href:"/","data-link":"",className:"bg-blue-600 text-white px-4 py-2 rounded font-bold"},"홈으로 돌아가기")));function se(e){const t={...i.getState().currentUser,...e};i.setState({currentUser:t}),b.set(t),alert("프로필이 업데이트되었습니다.")}const ae=()=>{const{loggedIn:e,currentUser:t}=i.getState(),{username:r="",email:n="",bio:o=""}=t??{};return s("div",{className:"bg-gray-100 min-h-screen flex justify-center"},s("div",{className:"max-w-md w-full"},s(D,null),s($,{loggedIn:e}),s("main",{className:"p-4"},s("div",{className:"bg-white p-8 rounded-lg shadow-md"},s("h2",{className:"text-2xl font-bold text-center text-blue-600 mb-8"},"내 프로필"),s("form",{id:"profile-form",onSubmit:l=>{l.preventDefault();const d=new FormData(l.target),c=Object.fromEntries(d);se(c)}},s("div",{className:"mb-4"},s("label",{for:"username",className:"block text-gray-700 text-sm font-bold mb-2"},"사용자 이름"),s("input",{type:"text",id:"username",name:"username",className:"w-full p-2 border rounded",value:r,required:!0})),s("div",{className:"mb-4"},s("label",{for:"email",className:"block text-gray-700 text-sm font-bold mb-2"},"이메일"),s("input",{type:"email",id:"email",name:"email",className:"w-full p-2 border rounded",value:n,required:!0})),s("div",{className:"mb-6"},s("label",{for:"bio",className:"block text-gray-700 text-sm font-bold mb-2"},"자기소개"),s("textarea",{id:"bio",name:"bio",rows:"4",className:"w-full p-2 border rounded"},o)),s("button",{type:"submit",className:"w-full bg-blue-600 text-white p-2 rounded font-bold"},"프로필 업데이트")))),s(I,null)))},g=class g extends Error{constructor(){super(g.MESSAGE)}};N(g,"MESSAGE","ForbiddenError");let L=g;const y=class y extends Error{constructor(){super(y.MESSAGE)}};N(y,"MESSAGE","UnauthorizedError");let O=y;function le(){const e=h.get().getTarget()??te,t=document.querySelector("#root");try{z(s(e,null),t)}catch(r){if(r instanceof L){h.get().push("/");return}if(r instanceof O){h.get().push("/login");return}console.error(r)}}export{H as B,L as F,ne as H,oe as L,ae as P,O as U,le as a,s as b,F as c,i as g,h as r};

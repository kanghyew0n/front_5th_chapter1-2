import{c as l,r as s,a as t,g as r,H as d,U as b,b as a,P as w,F as h,L as p}from"./render-VGg_PLvO.js";const f=e=>{const{subscribe:i,notify:o}=l(),n=()=>window.location.pathname,g=()=>e[n()],u=c=>{window.history.pushState(null,null,c),o()};return window.addEventListener("popstate",()=>o()),{get path(){return n()},push:u,subscribe:i,getTarget:g}};s.set(f({"/":d,"/login":()=>{const{loggedIn:e}=r.getState();if(e)throw new h;return a(p,null)},"/profile":()=>{const{loggedIn:e}=r.getState();if(!e)throw new b;return a(w,null)}}));function P(){s.get().subscribe(t),r.subscribe(t),t()}P();

import{S as w,i as F,s as k,e as m,t as y,k as C,c as g,a as v,h as S,m as D,d as h,b as d,K as f,g as x,J as u,L as E,j as N,n as _,M as T,N as j}from"../chunks/index-d08c86a5.js";function p(l,e,a){const t=l.slice();return t[4]=e[a],t}function b(l){let e,a=l[4]+"",t,s,i,n,o;return{c(){e=m("button"),t=y(a),s=C(),this.h()},l(c){e=g(c,"BUTTON",{id:!0,class:!0});var r=v(e);t=S(r,a),s=D(r),r.forEach(h),this.h()},h(){d(e,"id",i=l[4]),d(e,"class","svelte-dtbnpc"),f(e,"active",l[0]===l[4])},m(c,r){x(c,e,r),u(e,t),u(e,s),n||(o=E(e,"click",function(){j(l[2](l[4]))&&l[2](l[4]).apply(this,arguments)}),n=!0)},p(c,r){l=c,r&2&&a!==(a=l[4]+"")&&N(t,a),r&2&&i!==(i=l[4])&&d(e,"id",i),r&3&&f(e,"active",l[0]===l[4])},d(c){c&&h(e),n=!1,o()}}}function q(l){let e,a=l[1],t=[];for(let s=0;s<a.length;s+=1)t[s]=b(p(l,a,s));return{c(){e=m("div");for(let s=0;s<t.length;s+=1)t[s].c();this.h()},l(s){e=g(s,"DIV",{class:!0});var i=v(e);for(let n=0;n<t.length;n+=1)t[n].l(i);i.forEach(h),this.h()},h(){d(e,"class","svelte-dtbnpc")},m(s,i){x(s,e,i);for(let n=0;n<t.length;n+=1)t[n].m(e,null)},p(s,[i]){if(i&7){a=s[1];let n;for(n=0;n<a.length;n+=1){const o=p(s,a,n);t[n]?t[n].p(o,i):(t[n]=b(o),t[n].c(),t[n].m(e,null))}for(;n<t.length;n+=1)t[n].d(1);t.length=a.length}},i:_,o:_,d(s){s&&h(e),T(t,s)}}}function z(l,e,a){let{elements:t}=e,{selected:s}=e,{refresh:i}=e;const n=o=>{o!==s&&(a(0,s=o),i())};return l.$$set=o=>{"elements"in o&&a(1,t=o.elements),"selected"in o&&a(0,s=o.selected),"refresh"in o&&a(3,i=o.refresh)},[s,t,n,i]}class I extends w{constructor(e){super(),F(this,e,z,q,k,{elements:1,selected:0,refresh:3})}}export{I as default};
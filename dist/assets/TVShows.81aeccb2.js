import{_ as V}from"./BaseImage.5cbded4f.js";import{d as B,J as N,b as D,v as u,o as d,c as v,i as o,w as s,K as _,t as n,D as e,L as g,F,q as H,m as i,O as M,Q as q,M as z,R as A,N as E}from"./index.5cbdb7fd.js";import{L as G,_ as I}from"./LayoutGridCards.4572f1f7.js";import{_ as J,t as K,s as h,a as O}from"./BaseCaption.9c08d2cd.js";import{_ as Q}from"./BaseBadge.91fe9d5a.js";const R={class:"tv-shows-page"},sa=B({__name:"TVShows",setup(j){const b=N(),r=D(0),c=12,l=u(()=>b.getTVShowsList),w=u(()=>Math.ceil(l.value.length/c)),y=u(()=>l.value.filter((f,t)=>t>=r.value*c&&t<r.value*c+c));return(f,t)=>{const C=J,p=Q,T=z,k=A,L=E,S=O,x=I,$=M,m=V;return d(),v("article",R,[o(m,{class:"tv-shows-page__section"},{default:s(()=>[o($,null,{default:s(()=>[o(C,{class:"tv-shows-page__caption"},{baseCaptionHeadingH1:s(()=>{var a;return[_(n(e(g).popularTvShows)+" ("+n((a=e(l))==null?void 0:a.length)+") ",1)]}),_:1}),o(G,null,{default:s(()=>[(d(!0),v(F,null,H(e(y),(a,P)=>(d(),q(S,i({key:P},{alt:a==null?void 0:a.title,src:a==null?void 0:a.backdrop_md}),{baseCardTop:s(()=>[o(p,{color:"danger"},{default:s(()=>[_(n(e(K)(a==null?void 0:a.original_language)),1)]),_:2},1024),o(p,{color:"success"},{default:s(()=>[_(n(a==null?void 0:a.vote_average),1)]),_:2},1024)]),baseCardActions:s(()=>[o(L,{color:"primary",onClick:U=>f.$router.push({name:"tv-show",params:{id:a==null?void 0:a.id}})},{default:s(()=>[_(n(e(g).details),1)]),_:2},1032,["onClick"])]),default:s(()=>[o(T,{type:"h3"},{default:s(()=>[_(n(e(h)(a==null?void 0:a.title,20,!1)),1)]),_:2},1024),o(p,{color:"secondary"},{default:s(()=>[_(n(e(g).release)+": "+n(a==null?void 0:a.release_date),1)]),_:2},1024),o(k,{size:"sm"},{default:s(()=>[_(n(e(h)(a==null?void 0:a.overview,150,!0)),1)]),_:2},1024)]),_:2},1040))),128))]),_:1}),o(x,i({currentPage:r.value,totalPages:e(w)},{class:"tv-shows-page__pagination",onChange:t[0]||(t[0]=a=>r.value=a)}),null,16)]),_:1})]),_:1})])}}});export{sa as default};

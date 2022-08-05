import{_ as B}from"./BaseImage.5cbded4f.js";import{d as N,J as D,b as F,v as u,o as d,c as f,i as o,w as s,K as _,t as e,D as n,L as g,F as H,q as S,m as v,O as V,Q as q,M as z,R as A,N as E}from"./index.5cbdb7fd.js";import{L as G,_ as I}from"./LayoutGridCards.4572f1f7.js";import{_ as J,t as K,s as b,a as O}from"./BaseCaption.9c08d2cd.js";import{_ as Q}from"./BaseBadge.91fe9d5a.js";const R={class:"movies-page"},sa=N({__name:"Movies",setup(j){const m=D(),r=F(0),c=12,l=u(()=>m.getMoviesList),h=u(()=>Math.ceil(l.value.length/c)),y=u(()=>l.value.filter((i,t)=>t>=r.value*c&&t<r.value*c+c));return(i,t)=>{const C=J,p=Q,k=z,L=A,x=E,M=O,$=I,P=V,w=B;return d(),f("article",R,[o(w,{class:"movies-page__section"},{default:s(()=>[o(P,null,{default:s(()=>[o(C,{class:"movies-page__caption"},{baseCaptionHeadingH1:s(()=>{var a;return[_(e(n(g).popularMovies)+" ("+e((a=n(l))==null?void 0:a.length)+") ",1)]}),_:1}),o(G,null,{default:s(()=>[(d(!0),f(H,null,S(n(y),(a,T)=>(d(),q(M,v({key:T},{alt:a==null?void 0:a.title,src:a==null?void 0:a.backdrop_md}),{baseCardTop:s(()=>[o(p,{color:"danger"},{default:s(()=>[_(e(n(K)(a==null?void 0:a.original_language)),1)]),_:2},1024),o(p,{color:"success"},{default:s(()=>[_(e(a==null?void 0:a.vote_average),1)]),_:2},1024)]),baseCardActions:s(()=>[o(x,{color:"primary",onClick:U=>i.$router.push({name:"movie",params:{id:a==null?void 0:a.id}})},{default:s(()=>[_(e(n(g).details),1)]),_:2},1032,["onClick"])]),default:s(()=>[o(k,{type:"h3"},{default:s(()=>[_(e(n(b)(a==null?void 0:a.title,20,!1)),1)]),_:2},1024),o(p,{color:"secondary"},{default:s(()=>[_(e(n(g).release)+": "+e(a==null?void 0:a.release_date),1)]),_:2},1024),o(L,{size:"sm"},{default:s(()=>[_(e(n(b)(a==null?void 0:a.overview,150,!0)),1)]),_:2},1024)]),_:2},1040))),128))]),_:1}),o($,v({currentPage:r.value,totalPages:n(h)},{class:"movies-page__pagination",onChange:t[0]||(t[0]=a=>r.value=a)}),null,16)]),_:1})]),_:1})])}}});export{sa as default};
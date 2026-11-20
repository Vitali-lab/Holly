import{A as P,a as A,d as j,u as ie,b as T,c as w,e as I,j as e,n as R,f as _,m as de,g as pe,L as V,h as E,I as y,r as g,i as G,k as ke,s as se,l as D,o as Ce,B as C,p as re,q as ae,t as X,v as K,M as ze,T as F,w as Se,x as Pe}from"./index-OlVwAZl4.js";const Ee=i=>i.products,$e=i=>i.orders.order,xe=i=>i.orders.userOrders,Ie=i=>({type:P.ADD_CARD,payload:i}),me=(i,t,s,a,r,n)=>async c=>{try{const o=await fetch(`${A}/users/${i}/cart`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({productId:t,customId:s,size:a,count:r,sale:n})});if(!o.ok)throw new Error(`Ошибка запроса: ${o.status}`);const d=await o.json();if(!d)throw new Error("Товар не найден");c(Ie(d))}catch(o){console.error(o)}},Oe=({className:i,sizesKeys:t,product:s,activeButton:a,setActiveButton:r,setOpenSizesId:n})=>{const c=ie(),o=T(),d=w(h=>h.user.currentUser),u=w(h=>h.user.currentUser?.cart),l=I(),p=h=>{if(r(h),c.pathname==="/catalog"&&d){if(!d){R("Войдите в аккаунт чтобы добавить в корзину");return}const x=h,f=`${s.id}-${x}`;u.find(k=>k.customId===f&&k.size===x)?(R(`${s.name} размера ${x} уже есть в корзине`,()=>{l("/cart")}),n(null)):(o(me(d.id,s.id,f,x,1,s.sale)),_(`${s.name} размера ${x} добавлен в корзину`,()=>{l("/cart")}),n(null),r(null))}};return c.pathname==="/catalog"&&d?e.jsx("div",{className:i,children:t.length<0?e.jsx("p",{children:"Нет в наличии"}):t.map((h,x)=>{if(s.sizes[h]!==0)return e.jsx("button",{className:a===h?"active":"not-active",onClick:()=>{p(h)},children:h},x)})}):e.jsx("div",{className:i,children:t.length<0?e.jsx("p",{children:"Нет в наличии"}):t.map((h,x)=>{if(s.sizes[h]!==0)return e.jsx("button",{className:a===h?"active-in-product":"not-active-in-product",onClick:()=>{p(h)},children:h},x)})})},he=j(Oe)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  & button {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0;
    border: 1px solid var(--line-strong);
    background-color: transparent;
    color: var(--ink);
    font-family: var(--font-body);
    font-size: 12px;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease,
      color 0.2s ease;

    &:hover {
      border-color: var(--ink);
    }
  }

  & .active-in-product {
    width: 52px;
    height: 48px;
    border-color: var(--ink);
    background-color: var(--ink);
    color: var(--paper);
  }

  & .not-active-in-product {
    width: 52px;
    height: 48px;
  }

  & .active {
    width: 34px;
    height: 34px;
    border-color: var(--ink);
    background-color: var(--ink);
    color: var(--paper);
  }

  & .not-active {
    width: 34px;
    height: 34px;
  }
`,Te=i=>({type:P.REMOVE_USER_LIKES,payload:i}),Ae=(i,t)=>async s=>{await fetch(`http://localhost:3005/users/${i}/favorites/${t}`,{method:"DELETE"}),s(Te(t))},Re=i=>({type:P.ADD_USER_LIKES,payload:i}),Ue=(i,t)=>async s=>{try{const a=await fetch(`${A}/users/${i}/favorites`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:t})});if(!a.ok)throw new Error(`Ошибка запроса: ${a.status}`);const r=await a.json();if(!r)throw new Error("Товар не найден");s(Re(r))}catch(a){console.error(a)}},ge=()=>{const i=T(),t=w(c=>c.user.currentUser),s=I(),a=t?.id;return{toggleFavorites:c=>{t?t.favorites.find(o=>o.id===c.id)?(i(Ae(a,c.id)),_(`${c.name} удален из избранного`,()=>s("/favorites"))):(i(Ue(a,c.id)),_(`${c.name} добавлен в избранное`,()=>s("/favorites"))):R("Войдите в аккаунт чтобы добавить в избранное")},isUserLike:c=>{if(!t)return!1;if(t.favorites.find(o=>o.id===c.id))return!0}}},ue=i=>{const t=i.sale,s=i.price;return Math.floor(s*(1-t/100))},De=({className:i,post:t})=>e.jsx("div",{className:i,children:t.sale===null?e.jsxs("span",{children:[t.price," руб."]}):e.jsxs(e.Fragment,{children:[e.jsxs("span",{className:"saleOn",children:[t.price," руб."]}),e.jsxs("span",{className:"sale",children:[ue(t)," руб."]})]})}),fe=j(De)`
  display: flex;
  font-size: ${({size:i="14"})=>i}px;
  font-weight: 500;
  margin: 6px 0 0;
  width: 100%;
  justify-content: flex-start;
  align-items: baseline;
  gap: 8px;

  & span {
    color: var(--ink);
  }

  & .saleOn {
    text-decoration: line-through;
    color: var(--grey-color);
  }

  & .sale {
    color: var(--red-color);
  }
`,Me=de`
  from {
    transform: translateY(-8px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`,_e=({className:i,post:t,openSizesId:s,setOpenSizesId:a,activeButton:r,setActiveButton:n})=>{const c=I(),{getCategoryName:o}=pe(),d=w(f=>f.user.currentUser),{toggleFavorites:u,isUserLike:l}=ge(),p=ie(),h=f=>{const v=JSON.parse(sessionStorage.getItem("products"))||[];t&&!v.find(k=>k.id===f)&&v.push(t),sessionStorage.setItem("products",JSON.stringify(v)),c(`/catalog/${f}`)};if(!t)return e.jsx(V,{});const x=t.sale!==null&&t.sale!==void 0&&t.sale>0;return e.jsx("div",{className:i,children:e.jsxs(E.article,{className:"post",initial:{opacity:0,y:16},animate:{opacity:1,y:0},exit:{opacity:0},transition:{duration:.4,ease:"easeOut"},children:[e.jsxs("div",{className:"image-container",children:[e.jsx("button",{type:"button",className:"image-button",onClick:()=>h(t.id),"aria-label":`Открыть ${t.name}`,children:e.jsx("img",{src:t.images[0],alt:t.name,loading:"lazy"})}),x&&e.jsxs("span",{className:"sale",children:["−",t.sale,"%"]}),e.jsx("button",{type:"button",className:"favorite","aria-label":l(t)?"Убрать из избранного":"Добавить в избранное",onClick:()=>u(t),children:e.jsx(y,{id:l(t)?"heart":"heart-o",color:l(t)?"var(--red-color)":"var(--ink)",size:"15"})}),d&&p.pathname==="/catalog"&&e.jsxs("button",{type:"button",className:"add-button",onClick:()=>a(s===t.id?null:t.id),children:[e.jsx(y,{id:"shopping-bag",size:"13",color:"var(--ink)"}),e.jsx("span",{children:"В корзину"})]}),s===t.id&&e.jsx("div",{className:"sizes-popover",id:"sizes-div",children:e.jsx(he,{activeButton:r,setActiveButton:n,product:t,sizesKeys:Object.keys(t.sizes),setOpenSizesId:a})})]}),e.jsxs("div",{className:"info",onClick:()=>h(t.id),children:[e.jsx("p",{className:"category",children:o(t.categoryId)}),e.jsx("h2",{children:t.name}),e.jsx(fe,{post:t,size:"14"})]})]},t.id)},t.id)},Z=j(_e)`
  width: 100%;

  & .post {
    display: flex;
    flex-direction: column;
    gap: 14px;
    cursor: pointer;
  }

  & .image-container {
    position: relative;
    width: 100%;
    aspect-ratio: 3 / 4;
    overflow: hidden;
    background-color: var(--paper-deep);
  }

  & .image-button {
    display: block;
    width: 100%;
    height: 100%;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
    }
  }

  &:hover .image-button img {
    transform: scale(1.045);
  }

  & .sale {
    position: absolute;
    top: 14px;
    left: 14px;
    padding: 6px 10px;
    background-color: var(--ink);
    color: var(--paper);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
  }

  & .favorite {
    position: absolute;
    top: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background-color: rgba(246, 243, 236, 0.9);
    backdrop-filter: blur(6px);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--paper);
    }
  }

  & .add-button {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border: none;
    background-color: rgba(246, 243, 236, 0.94);
    backdrop-filter: blur(6px);
    color: var(--ink);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;
    opacity: 0;
    transform: translateY(8px);
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      background-color 0.2s ease;

    &:hover {
      background-color: var(--surface);
    }
  }

  &:hover .add-button {
    opacity: 1;
    transform: translateY(0);
  }

  & .sizes-popover {
    position: absolute;
    left: 50%;
    bottom: 56px;
    z-index: 20;
    width: min(300px, 92%);
    padding: 14px;
    transform: translateX(-50%);
    background-color: var(--surface);
    border: 1px solid var(--line);
    box-shadow: var(--box-shadow);
    animation: ${Me} 0.25s ease;
  }

  & .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .category {
    margin: 0;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  & h2 {
    margin: 0;
    font-family: var(--font-body);
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    letter-spacing: 0;
  }

  @media (hover: none) {
    & .add-button {
      opacity: 1;
      transform: none;
    }
  }

  @media (max-width: 576px) {
    & h2 {
      font-size: 14px;
    }

    & .sale {
      top: 10px;
      left: 10px;
    }

    & .favorite {
      top: 8px;
      right: 8px;
    }
  }
`,Le=({className:i,products:t})=>t?e.jsx("div",{className:i,children:e.jsx("div",{className:"products",children:t.map(s=>e.jsx(Z,{post:s},s.id))})}):e.jsx(V,{}),ve=j(Le)`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;

  & .products {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 44px) clamp(16px, 2.2vw, 32px);
  }

  @media (max-width: 992px) {
    & .products {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 768px) {
    & .products {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 28px 14px;
    }
  }
`,Y=(i,t)=>{const s=Math.abs(Number(i))%100,a=s%10;return s>10&&s<20?t[2]:a>1&&a<5?t[1]:a===1?t[0]:t[2]},Fe=({className:i})=>{let t=[];return sessionStorage.getItem("products")&&(t=JSON.parse(sessionStorage.getItem("products"))),e.jsxs("section",{className:i,children:[e.jsxs("header",{className:"section-header",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"История"}),e.jsx("h2",{className:"section-title",children:"Недавно просмотренные"})]}),t.length>0&&e.jsxs("span",{className:"count",children:[t.length," ",Y(t.length,["вещь","вещи","вещей"])]})]}),t.length===0?e.jsx("div",{className:"nothing",children:e.jsx("p",{children:"Здесь появятся вещи, которые вы открывали."})}):e.jsx(ve,{products:t.slice(0,8)},t.id)]})},je=j(Fe)`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 10px;
    }
  }

  & .count {
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  & .nothing {
    display: flex;
    align-items: center;
    padding: 32px 0 8px;

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 14px;
    }
  }

  @media (max-width: 576px) {
    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }
  }
`,W=[{eyebrow:"Новая коллекция · Осень–Зима 2026",title:`Тихая роскошь
каждого дня`,text:"Пальто, костюмы и трикотаж из натуральных тканей. Вещи, которые остаются с вами дольше одного сезона.",image:"https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1900&q=85"},{eyebrow:"Капсула · 12 предметов",title:`Соберите
свой гардероб`,text:"Базовые вещи, которые сочетаются между собой без усилий. От образа на работу до вечера в городе.",image:"https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1900&q=85"},{eyebrow:"Holly Garment · Минск",title:`Спокойная
элегантность`,text:"Мы выбираем ткани, крои и оттенки, которые не спорят с вами, а подчёркивают.",image:"https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1900&q=85"}],qe=({className:i,slide:t,onNext:s})=>{const a=I();return e.jsxs("section",{className:i,children:[e.jsx("img",{src:t.image,alt:"",className:"hero-image"}),e.jsx("div",{className:"hero-overlay"}),e.jsxs("div",{className:"hero-content",children:[e.jsx("p",{className:"eyebrow hero-eyebrow",children:t.eyebrow}),e.jsx("h2",{children:t.title.split(`
`).map((r,n)=>e.jsx("span",{children:r},n))}),e.jsx("p",{className:"hero-text",children:t.text}),e.jsxs("div",{className:"hero-actions",children:[e.jsx("button",{type:"button",onClick:()=>a("/catalog"),children:"Смотреть коллекцию"}),e.jsx("button",{type:"button",className:"ghost",onClick:()=>a("/about-us"),children:"О бренде"})]})]}),e.jsxs("div",{className:"hero-controls",children:[e.jsxs("button",{type:"button",className:"hero-next",onClick:s,children:["Следующий образ",e.jsx("span",{"aria-hidden":"true",children:"→"})]}),e.jsx("span",{className:"hero-scroll",children:"Листайте вниз"})]})]})},Ve=j(qe)`
  position: relative;
  width: 100%;
  min-height: clamp(480px, 72vh, 720px);
  overflow: hidden;
  background-color: var(--ink);

  & .hero-image {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 30%;
    animation: heroZoom 12s ease-out both;
  }

  @keyframes heroZoom {
    from {
      transform: scale(1.06);
    }
    to {
      transform: scale(1);
    }
  }

  & .hero-overlay {
    position: absolute;
    inset: 0;
    background:
      linear-gradient(
        90deg,
        rgba(18, 16, 12, 0.72) 0%,
        rgba(18, 16, 12, 0.34) 48%,
        rgba(18, 16, 12, 0.08) 100%
      ),
      linear-gradient(0deg, rgba(18, 16, 12, 0.32), transparent 40%);
  }

  & .hero-content {
    position: relative;
    z-index: 2;
    width: var(--page-width);
    margin: 0 auto;
    min-height: inherit;
    padding: clamp(56px, 8vw, 96px) 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    gap: 20px;
  }

  & .hero-eyebrow {
    color: rgba(246, 243, 236, 0.72);
  }

  & h2 {
    margin: 0;
    max-width: 760px;
    color: var(--paper);
    font-size: clamp(42px, 6.4vw, 96px);
    line-height: 1.02;
    letter-spacing: -0.02em;

    & span {
      display: block;
    }
  }

  & .hero-text {
    margin: 0;
    max-width: 460px;
    color: rgba(246, 243, 236, 0.78);
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.7;
  }

  & .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 14px;

    & button {
      min-height: 50px;
      padding: 14px 32px;
      border: 1px solid var(--paper);
      background-color: var(--paper);
      color: var(--ink);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      cursor: pointer;
      transition:
        background-color 0.25s ease,
        color 0.25s ease;

      &:hover {
        background-color: transparent;
        color: var(--paper);
      }

      &.ghost {
        background-color: transparent;
        color: var(--paper);

        &:hover {
          background-color: var(--paper);
          color: var(--ink);
        }
      }
    }
  }

  & .hero-controls {
    position: absolute;
    right: clamp(16px, 4vw, 64px);
    bottom: 36px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;
  }

  & .hero-next {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0;
    border: none;
    background: none;
    color: var(--paper);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    cursor: pointer;

    & span {
      transition: transform 0.2s ease;
    }

    &:hover span {
      transform: translateX(4px);
    }
  }

  & .hero-scroll {
    color: rgba(246, 243, 236, 0.5);
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  @media (max-width: 992px) {
    min-height: 560px;

    & .hero-controls {
      right: 16px;
      bottom: 20px;
    }

    & .hero-scroll {
      display: none;
    }
  }

  @media (max-width: 576px) {
    min-height: 82vh;

    & .hero-content {
      padding: 48px 0 72px;
    }

    & .hero-actions button {
      flex: 1;
      padding: 14px 18px;
    }

    & .hero-controls {
      left: 0;
      right: 0;
      align-items: center;
    }
  }
`,Je=({className:i})=>{const[t,s]=g.useState(0);g.useEffect(()=>{const r=setInterval(()=>{s(n=>(n+1)%W.length)},9e3);return()=>clearInterval(r)},[]);const a=()=>s(r=>(r+1)%W.length);return e.jsxs("div",{className:i,children:[e.jsx("div",{className:"hero-stage",children:W.map((r,n)=>e.jsx("div",{className:`hero-slide${n===t?" active":""}`,"aria-hidden":n!==t,inert:n!==t,children:e.jsx(Ve,{slide:r,onNext:a})},r.eyebrow))}),e.jsx("div",{className:"hero-dots",children:W.map((r,n)=>e.jsx("button",{type:"button",className:n===t?"active":"","aria-label":`Слайд ${n+1}`,onClick:()=>s(n)},r.eyebrow))})]})},Ge=j(Je)`
  position: relative;
  width: 100%;

  & .hero-stage {
    position: relative;
  }

  & .hero-slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.8s ease;
  }

  & .hero-slide.active {
    position: relative;
    opacity: 1;
    pointer-events: auto;
  }

  & .hero-dots {
    position: absolute;
    left: 50%;
    bottom: 22px;
    z-index: 3;
    display: flex;
    gap: 8px;
    transform: translateX(-50%);

    & button {
      width: 32px;
      height: 2px;
      padding: 0;
      border: none;
      background-color: rgba(246, 243, 236, 0.34);
      cursor: pointer;
      transition: background-color 0.25s ease;

      &.active {
        background-color: var(--paper);
      }
    }
  }

  @media (max-width: 576px) {
    & .hero-dots {
      bottom: 16px;
    }
  }
`,Ye=({className:i})=>{const t=w(a=>a.products.products),s=I();return!t||t.length===0?null:e.jsxs("section",{className:i,children:[e.jsxs("header",{className:"section-header",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Выбор редакции"}),e.jsx("h2",{className:"section-title",children:"Избранное сезона"})]}),e.jsxs("button",{type:"button",onClick:()=>s("/catalog"),children:["Весь каталог",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]}),e.jsx("div",{className:"grid",children:t.slice(0,4).map(a=>e.jsx(Z,{post:a},a.id))})]})},We=j(Ye)`
  width: 100%;

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);
    margin-bottom: 32px;

    & .eyebrow {
      margin-bottom: 10px;
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 0 4px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      white-space: nowrap;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 14px;
      }
    }
  }

  & .grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2.2vw, 32px);
  }

  @media (max-width: 992px) {
    & .grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 24px 16px;
    }
  }

  @media (max-width: 576px) {
    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }
  }
`,Be=[{id:"2",title:"Верхняя одежда",image:"https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=900&q=80"},{id:"3",title:"Платья",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=900&q=80"},{id:"a029",title:"Джинсы",image:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=80"},{id:"7",title:"Сумки",image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80"}],He=[{title:"Доставка за 1–2 дня",text:"Курьером по Минску и Европочтой по всей Беларуси."},{title:"Возврат 14 дней",text:"Если вещь не подошла — вернём деньги без лишних вопросов."},{title:"Натуральные ткани",text:"Шерсть, хлопок, лён и кожа от проверенных поставщиков."}],Xe=({className:i})=>{const t=w(G),s=I(),a=(r,n)=>t?.find(c=>c.id===r)?.name||n;return e.jsxs("div",{className:i,children:[e.jsx(Ge,{}),e.jsxs("div",{className:"sections",children:[e.jsx("section",{className:"benefits",children:He.map((r,n)=>e.jsxs("div",{className:"benefit",children:[e.jsxs("span",{className:"benefit-index",children:["0",n+1]}),e.jsx("h3",{children:r.title}),e.jsx("p",{children:r.text})]},r.title))}),e.jsxs("section",{className:"categories",children:[e.jsxs("header",{className:"section-header",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Каталог"}),e.jsx("h2",{className:"section-title",children:"Выберите своё"})]}),e.jsx("p",{className:"section-note",children:"Четыре направления, из которых собирается весь гардероб."})]}),e.jsx("div",{className:"category-grid",children:Be.map((r,n)=>e.jsxs("button",{type:"button",className:"category-card",onClick:()=>s("/catalog"),children:[e.jsx("img",{src:r.image,alt:a(r.id,r.title),loading:"lazy"}),e.jsx("span",{className:"category-overlay"}),e.jsxs("span",{className:"category-label",children:[e.jsxs("span",{className:"category-index",children:["0",n+1]}),e.jsx("span",{className:"category-title",children:a(r.id,r.title)}),e.jsx("span",{className:"category-arrow","aria-hidden":"true",children:"→"})]})]},r.id))})]}),e.jsx(We,{}),e.jsxs("section",{className:"collection",children:[e.jsx("div",{className:"collection-media",children:e.jsx("img",{src:"https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1400&q=85",alt:"Коллекция Autumn Winter",loading:"lazy"})}),e.jsxs("div",{className:"collection-copy",children:[e.jsx("p",{className:"eyebrow",children:"Коллекция · AW 2026"}),e.jsxs("h2",{children:["Вещи, которые",e.jsx("br",{}),"переживут сезон"]}),e.jsx("p",{children:"Мы не гонимся за трендами. В новой коллекции — плотная шерсть, спокойные оттенки и силуэты, которые остаются уместными и через год, и через пять."}),e.jsxs("button",{type:"button",onClick:()=>s("/catalog"),children:["Смотреть коллекцию",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]}),e.jsx(je,{})]})]})},bi=j(Xe)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0;

  & .sections {
    width: var(--page-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: clamp(64px, 9vw, 120px);
    padding-top: clamp(48px, 6vw, 88px);
  }

  & .benefits {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(20px, 3vw, 48px);
    padding-bottom: clamp(32px, 4vw, 56px);
    border-bottom: 1px solid var(--line-strong);
  }

  & .benefit {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-right: 20px;
    border-right: 1px solid var(--line);

    &:last-child {
      border-right: none;
    }

    & h3 {
      margin: 0;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.01em;
    }

    & p {
      margin: 0;
      max-width: 280px;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.7;
    }
  }

  & .benefit-index {
    color: var(--grey-color);
    font-family: var(--font-display);
    font-size: 13px;
  }

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 10px;
    }
  }

  & .section-note {
    margin: 0;
    max-width: 300px;
    color: var(--grey-color);
    font-size: 13px;
    line-height: 1.7;
    text-align: right;
  }

  & .category-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(12px, 1.6vw, 22px);
  }

  & .category-card {
    position: relative;
    display: block;
    aspect-ratio: 3 / 4;
    padding: 0;
    border: none;
    overflow: hidden;
    background-color: var(--paper-deep);
    cursor: pointer;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
    }

    &:hover img {
      transform: scale(1.05);
    }
  }

  & .category-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      0deg,
      rgba(18, 16, 12, 0.62) 0%,
      rgba(18, 16, 12, 0.06) 55%
    );
  }

  & .category-label {
    position: absolute;
    left: 18px;
    right: 18px;
    bottom: 18px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
    color: var(--paper);
    text-align: left;
  }

  & .category-index {
    font-size: 10px;
    letter-spacing: 0.2em;
    opacity: 0.6;
  }

  & .category-title {
    font-family: var(--font-display);
    font-size: clamp(18px, 1.8vw, 24px);
    line-height: 1.2;
  }

  & .category-arrow {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 18px;
    transition: transform 0.25s ease;
  }

  & .category-card:hover .category-arrow {
    transform: translateX(4px);
  }

  & .collection {
    display: grid;
    grid-template-columns: 1.15fr 1fr;
    min-height: 460px;
    background-color: var(--paper-deep);
  }

  & .collection-media {
    overflow: hidden;

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .collection-copy {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 18px;
    padding: clamp(32px, 5vw, 72px);

    & h2 {
      margin: 0;
      font-size: clamp(30px, 3.6vw, 52px);
      line-height: 1.08;
    }

    & p:not(.eyebrow) {
      margin: 0;
      max-width: 420px;
      font-size: 14px;
      line-height: 1.75;
      color: var(--ink-soft);
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-top: 14px;
      padding: 0 0 5px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 16px;
      }
    }
  }

  @media (max-width: 992px) {
    & .category-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & .collection {
      grid-template-columns: 1fr;
    }

    & .collection-media {
      min-height: 340px;
    }
  }

  @media (max-width: 768px) {
    & .benefits {
      grid-template-columns: 1fr;
      gap: 24px;
    }

    & .benefit {
      padding: 0 0 20px;
      border-right: none;
      border-bottom: 1px solid var(--line);

      &:last-child {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    & .section-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    & .section-note {
      text-align: left;
    }
  }

  @media (max-width: 576px) {
    & .category-grid {
      grid-template-columns: 1fr;
    }

    & .collection-copy {
      padding: 32px 20px 36px;
    }
  }
`,Ke=({className:i,products:t})=>{const[s,a]=g.useState(null),[r,n]=g.useState("");return t?e.jsx("div",{className:i,children:Array.isArray(t)&&e.jsx(ke,{children:t.map(c=>e.jsx(Z,{post:c,openSizesId:s,setOpenSizesId:a,activeButton:r,setActiveButton:n},c.id))})}):e.jsx(V,{})},Ze=j(Ke)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: start;
  gap: clamp(24px, 3vw, 44px) clamp(16px, 2.2vw, 32px);

  & i {
    cursor: pointer;
  }

  @media (max-width: 1280px) {
    & i:active {
      transform: scale(0.7);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 28px 14px;
  }
`,M=i=>({type:P.SET_FILTERS,payload:i}),ne={seasons:[],categories:[],minPrice:"",maxPrice:""},Qe=({className:i,filters:t=ne,allProducts:s=[],productsFiltered:a=[]})=>{const r=w(G),n=w(se),c=ie(),o=T();g.useEffect(()=>{const b=new URLSearchParams(c.search).get("season");if(b){const S=n.find(U=>U.name===b);S&&o(M({seasons:[String(S.id)]}))}},[c,n,o]);const d=()=>{o(M(ne))},u=(m,b)=>{o(M({seasons:b?[...t.seasons||[],String(m)]:(t.seasons||[]).filter(S=>S!==String(m))}))},l=(m,b)=>{o(M({categories:b?[...t.categories||[],String(m)]:(t.categories||[]).filter(S=>S!==String(m))}))},p=m=>{o(M({seasons:(t.seasons||[]).filter(b=>b!==m)}))},h=m=>{o(M({categories:(t.categories||[]).filter(b=>b!==m)}))},x=m=>s.filter(b=>String(b.seasonId)===String(m)).length,f=m=>s.filter(b=>String(b.categoryId)===String(m)).length,v=t.seasons||[],k=t.categories||[],$=v.length>0||k.length>0||!!t.minPrice||!!t.maxPrice,N=m=>n.find(b=>String(b.id)===m)?.name,z=m=>r.find(b=>String(b.id)===m)?.name;return e.jsx("aside",{className:i,children:e.jsxs("div",{className:"filter-card",children:[e.jsxs("header",{className:"filter-header",children:[e.jsxs("div",{className:"filter-title",children:[e.jsx(y,{id:"filter",size:"16",color:"currentColor"}),e.jsx("p",{children:"Фильтр"})]}),e.jsxs("span",{className:"filter-counter",children:[a.length," из ",s.length]})]}),$&&e.jsxs("div",{className:"filter-active",children:[v.map(m=>e.jsxs("button",{type:"button",className:"chip",onClick:()=>p(m),children:[N(m),e.jsx(y,{id:"close",size:"10",color:"currentColor"})]},`season-${m}`)),k.map(m=>e.jsxs("button",{type:"button",className:"chip",onClick:()=>h(m),children:[z(m),e.jsx(y,{id:"close",size:"10",color:"currentColor"})]},`category-${m}`)),(t.minPrice||t.maxPrice)&&e.jsxs("button",{type:"button",className:"chip",onClick:()=>o(M({minPrice:"",maxPrice:""})),children:[t.minPrice||"0"," — ",t.maxPrice||"∞"," BYN",e.jsx(y,{id:"close",size:"10",color:"currentColor"})]}),e.jsx("button",{type:"button",className:"reset",onClick:d,children:"Сбросить всё"})]}),e.jsxs("section",{className:"filter-section",children:[e.jsx("h3",{children:"Сезон"}),e.jsx("div",{className:"filter-options",children:n.map(m=>{const b=v.includes(String(m.id));return e.jsxs("label",{className:b?"checked":"",children:[e.jsx("input",{type:"checkbox",name:m.id,checked:b,onChange:({target:S})=>u(m.id,S.checked)}),e.jsx("span",{className:"check",children:b&&e.jsx(y,{id:"check",size:"10",color:"currentColor"})}),e.jsx("span",{className:"option-name",children:m.name}),e.jsx("span",{className:"option-count",children:x(m.id)})]},m.id)})})]}),e.jsxs("section",{className:"filter-section",children:[e.jsx("h3",{children:"Категории"}),e.jsx("div",{className:"filter-options",children:r.map(m=>{const b=k.includes(String(m.id));return e.jsxs("label",{className:b?"checked":"",children:[e.jsx("input",{type:"checkbox",name:m.id,checked:b,onChange:({target:S})=>l(m.id,S.checked)}),e.jsx("span",{className:"check",children:b&&e.jsx(y,{id:"check",size:"10",color:"currentColor"})}),e.jsx("span",{className:"option-name",children:m.name}),e.jsx("span",{className:"option-count",children:f(m.id)})]},m.id)})})]}),e.jsxs("section",{className:"filter-section",children:[e.jsx("h3",{children:"Цена, BYN"}),e.jsxs("div",{className:"price-inputs",children:[e.jsx(D,{text:"От",type:"number",width:"100%",value:t.minPrice,onChange:({target:m})=>o(M({minPrice:m.value}))}),e.jsx("span",{className:"price-divider","aria-hidden":"true",children:"—"}),e.jsx(D,{text:"До",type:"number",width:"100%",value:t.maxPrice,onChange:({target:m})=>o(M({maxPrice:m.value}))})]})]})]})})},et=j(Qe)`
  width: clamp(230px, 19vw, 270px);
  flex-shrink: 0;

  & .filter-card {
    position: sticky;
    top: calc(var(--header-offset) + 24px);
    display: flex;
    flex-direction: column;
    gap: 26px;
    padding-right: 28px;
    border-right: 1px solid var(--line);
  }

  & .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    padding-bottom: 16px;
    border-bottom: 1px solid var(--line);
  }

  & .filter-title {
    display: flex;
    align-items: center;
    gap: 9px;

    & p {
      margin: 0;
      color: var(--ink);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
  }

  & .filter-counter {
    color: var(--grey-color);
    font-size: 11px;
    white-space: nowrap;
  }

  & .filter-active {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: -8px;
  }

  & .chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border: 1px solid var(--line-strong);
    background: transparent;
    color: var(--ink);
    font-size: 10px;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--ink);
      background-color: var(--paper-deep);
    }
  }

  & .reset {
    padding: 4px 0;
    border: none;
    border-bottom: 1px solid var(--ink);
    background: none;
    color: var(--ink);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
  }

  & .filter-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & h3 {
      margin: 0;
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--grey-color);
    }
  }

  & .filter-options {
    display: flex;
    flex-direction: column;
    gap: 2px;

    & label {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 0;
      color: var(--ink-soft);
      font-size: 13px;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover,
      &.checked {
        color: var(--ink);
      }
    }

    & input {
      position: absolute;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }

    & .check {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      border: 1px solid var(--line-strong);
      color: var(--paper);
      transition:
        background-color 0.2s ease,
        border-color 0.2s ease;
    }

    & input:checked + .check {
      border-color: var(--ink);
      background-color: var(--ink);
    }

    & input:focus-visible + .check {
      outline: 2px solid var(--ink);
      outline-offset: 2px;
    }

    & .option-name {
      flex: 1;
    }

    & .option-count {
      color: var(--grey-color);
      font-size: 11px;
      font-variant-numeric: tabular-nums;
    }
  }

  & .price-inputs {
    display: flex;
    align-items: flex-end;
    gap: 8px;

    & label {
      width: 100%;
    }

    & input {
      height: 36px;
      font-size: 13px;
    }
  }

  & .price-divider {
    padding-bottom: 12px;
    color: var(--grey-color);
    font-size: 12px;
  }

  @media (max-width: 992px) {
    width: 100%;

    & .filter-card {
      position: static;
      padding: 0 0 22px;
      border-right: none;
      border-bottom: 1px solid var(--line-strong);
    }

    & .filter-options {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 24px;
    }

    & .price-inputs {
      max-width: 360px;
    }
  }
`,q=()=>window.scrollTo({top:0,behavior:"smooth"}),ee=i=>({type:P.SET_CURRENT_PAGE,payload:i}),te=()=>9,tt=({className:i})=>{const t=T(),{products:s,currentPage:a,filters:r}=w(Ee),{seasons:n,categories:c,minPrice:o,maxPrice:d}=r,[u,l]=g.useState(!0);g.useEffect(()=>{let N=!0;return(async()=>{l(!0);try{await t(Ce())}finally{N&&l(!1)}})(),()=>{N=!1}},[t]),g.useEffect(()=>{t(ee(1)),q()},[n,c,o,d,t]);const p=g.useMemo(()=>{const N=r.seasons||[],z=r.categories||[],m=r.minPrice?Number(r.minPrice):null,b=r.maxPrice?Number(r.maxPrice):null;return s.filter(S=>{const U=N.length===0||N.includes(String(S.seasonId)),J=z.length===0||z.includes(String(S.categoryId)),O=m===null||S.price>=m,Q=b===null||S.price<=b;return U&&J&&O&&Q})},[s,r]),h=Math.max(1,Math.ceil(p.length/te()));g.useEffect(()=>{a>h&&t(ee(h))},[a,h,t]);const x=(a-1)*te(),f=p.slice(x,x+te()),v=N=>{q(),t(ee(N))},k=a>1,$=a<h;return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"catalog-header",children:[e.jsxs("div",{className:"catalog-heading",children:[e.jsx("p",{className:"eyebrow",children:"Каталог · Holly Garment"}),e.jsx("h1",{children:"Все вещи"})]}),e.jsx("p",{className:"catalog-note",children:"Спокойная база и вещи с характером. Фильтруйте по сезону, категории и цене — мы покажем только то, что есть в наличии."})]}),e.jsxs("div",{className:"products-container",children:[e.jsx(et,{filters:r,allProducts:s,productsFiltered:p}),e.jsxs("div",{className:"products-main",children:[e.jsxs("div",{className:"products-meta",children:[e.jsxs("span",{children:[p.length," ",Y(p.length,["вещь","вещи","вещей"])]}),e.jsxs("span",{children:["Страница ",a," из ",h]})]}),u&&s.length===0?e.jsx("div",{className:"skeleton-list",children:Array.from({length:6}).map((N,z)=>e.jsx("div",{className:"skeleton-card"},z))}):f.length>0?e.jsx(Ze,{products:f}):e.jsxs("div",{className:"error",children:[e.jsx("h3",{children:"Ничего не нашлось"}),e.jsx("p",{children:"Попробуйте изменить фильтры или сбросить их."})]}),h>1&&e.jsxs("div",{className:"pagination",children:[e.jsx("button",{type:"button",className:"pagination-arrow",disabled:!k,"aria-label":"Предыдущая страница",onClick:()=>k&&v(a-1),children:e.jsx(y,{id:"angle-left",size:"16",color:"var(--ink)"})}),Array.from({length:h},(N,z)=>z+1).map(N=>e.jsx("button",{type:"button",className:a===N?"active":"",disabled:a===N,onClick:()=>v(N),children:N},N)),e.jsx("button",{type:"button",className:"pagination-arrow",disabled:!$,"aria-label":"Следующая страница",onClick:()=>$&&v(a+1),children:e.jsx(y,{id:"angle-right",size:"16",color:"var(--ink)"})})]})]})]})]})},yi=j(tt)`
  width: var(--page-width);
  margin: 0 auto;

  & .catalog-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 40px;
    padding-bottom: clamp(24px, 3vw, 40px);
    border-bottom: 1px solid var(--line-strong);
  }

  & .catalog-heading {
    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(40px, 5vw, 68px);
      line-height: 1;
    }
  }

  & .catalog-note {
    margin: 0;
    max-width: 340px;
    color: var(--grey-color);
    font-size: 13px;
    line-height: 1.75;
    text-align: right;
  }

  & .products-container {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: clamp(28px, 4vw, 64px);
    width: 100%;
    min-height: 60vh;
    padding-top: clamp(28px, 4vw, 48px);
  }

  & .products-main {
    flex: 1;
    min-width: 0;
  }

  & .products-meta {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }

  & .skeleton-list {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(16px, 2.2vw, 32px);
  }

  & .skeleton-card {
    aspect-ratio: 3 / 4;
    background: linear-gradient(
      100deg,
      var(--paper-deep) 30%,
      var(--line) 50%,
      var(--paper-deep) 70%
    );
    background-size: 200% 100%;
    animation: shimmer 1.4s infinite linear;
  }

  @keyframes shimmer {
    from {
      background-position: 200% 0;
    }
    to {
      background-position: -200% 0;
    }
  }

  & .error {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    width: 100%;
    min-height: 280px;
    padding: 32px 0;

    & h3 {
      margin: 0;
      font-size: 28px;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
    }
  }

  & .pagination {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: clamp(40px, 6vw, 72px) 0 0;
    gap: 8px;

    & button {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 40px;
      height: 40px;
      padding: 0 10px;
      border: 1px solid transparent;
      border-radius: 0;
      background: transparent;
      color: var(--ink);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease,
        opacity 0.2s ease;

      &:hover:not(:disabled) {
        border-color: var(--line-strong);
      }

      &.active {
        border-color: var(--ink);
        font-weight: 700;
      }

      &:disabled {
        cursor: default;
      }
    }
  }

  & .pagination .pagination-arrow {
    border: 1px solid var(--line-strong);

    &:disabled {
      opacity: 0.3;
    }
  }

  @media (max-width: 992px) {
    & .catalog-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 18px;
    }

    & .catalog-note {
      text-align: left;
    }

    & .products-container {
      flex-direction: column;
    }

    & .skeleton-list {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 576px) {
    & .skeleton-list {
      grid-template-columns: 1fr;
    }

    & .products-meta {
      flex-direction: column;
      gap: 6px;
    }
  }
`,it=i=>({type:P.SET_PRODUCT,payload:i}),be=i=>async t=>{const s=await fetch(`http://localhost:3005/products/${i}`);if(!s.ok)throw new Error(s.statusText);const a=await s.json();console.log(a),t(it(a.data))},st=({className:i,product:t})=>{const s=w(r=>r.products.products);if(!s)return e.jsx(V,{});const a=s.filter(r=>r.categoryId===t.categoryId&&r.id!==t.id);return a.length===0?null:e.jsxs("section",{className:i,children:[e.jsx("header",{className:"section-header",children:e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Ещё из категории"}),e.jsx("h2",{className:"section-title",children:"Похожие вещи"})]})}),e.jsx(ve,{products:a},t.id)]})},rt=j(st)`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;

  & .section-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 10px;
    }
  }
`,at=async()=>{try{const i=await fetch(`${A}/users`);if(!i.ok)throw new Error(`Ошибка запроса: ${i.status}`);const t=await i.json();if(!t)throw new Error("Пользователи не найдены");return t}catch(i){console.error(i)}},nt=({className:i,setHover:t,userRating:s,setUserRating:a,hover:r,isRating:n})=>e.jsx("div",{className:i,children:Array(5).fill(0).map((c,o)=>e.jsx(y,{id:"star",size:"18",color:o+1<=(r||s)?"#b48a4a":"#d8d2c6",onMouseEnter:()=>n()?t(null):t(o+1),onMouseLeave:()=>(n(),t(null)),onClick:()=>n()?"":a(o+1)},o))}),ye=j(nt)`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
    margin: 0 0 0 0;
    transition: all ease 0.5s;

    & svg {
        cursor: pointer;
        transition: all ease 0.5s;
        &:hover{
            transition: all ease 0.5s;
            color: #b48a4a;
        }
    }
`,we=i=>i?.slice(0,10).split("-").reverse().join("."),ot=({className:i,product:t})=>{const[s,a]=g.useState([]),[r,n]=g.useState(!0);if(g.useEffect(()=>{at().then(d=>a(d.data)).finally(()=>n(!1))},[]),r)return e.jsx(V,{});const c=d=>s.find(u=>u.id===d)?.name||"Аноним",o=t?.rating?.users||[];return e.jsxs("div",{className:i,children:[e.jsx("p",{className:"eyebrow",children:"Отзывы"}),e.jsxs("h2",{children:["Что говорят",e.jsxs("span",{children:[" (",o.length,")"]})]}),o.length>0?e.jsx("div",{className:"comments-list",children:o.map(d=>e.jsxs("article",{className:"comment",children:[e.jsxs("div",{className:"icon-and-name",children:[e.jsx("span",{className:"avatar",children:c(d.userId).slice(0,1)}),e.jsxs("div",{children:[e.jsx("p",{className:"name",children:c(d.userId)}),e.jsx("p",{className:"date",children:we(d.date)})]})]}),e.jsxs("div",{className:"comment-and-stars",children:[e.jsx("div",{className:"stars",children:e.jsx(ye,{userRating:d.userRating})}),e.jsx("p",{className:"text",children:d.userComment})]})]},d.userId+d.date))}):e.jsx("div",{className:"nothing",children:"Пока нет отзывов. Будьте первым, кто оценит эту вещь."})]})},ct=j(ot)`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & .eyebrow {
    margin: 0;
  }

  & h2 {
    margin: 0 0 8px;
    font-size: clamp(24px, 2.4vw, 32px);

    & span {
      color: var(--grey-color);
      font-family: var(--font-body);
      font-size: 14px;
    }
  }

  & .comments-list {
    display: flex;
    flex-direction: column;
  }

  & .comment {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 22px 0;
    border-top: 1px solid var(--line);
  }

  & .icon-and-name {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  & .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: 16px;
  }

  & .name {
    margin: 0;
    color: var(--ink);
    font-size: 13px;
    font-weight: 600;
  }

  & .date {
    margin: 2px 0 0;
    color: var(--grey-color);
    font-size: 11px;
  }

  & .comment-and-stars {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-left: 50px;

    & .text {
      margin: 0;
      color: var(--ink-soft);
      font-size: 14px;
      line-height: 1.7;
    }
  }

  & .nothing {
    padding: 24px 0;
    border-top: 1px solid var(--line);
    color: var(--grey-color);
    font-size: 13px;
  }

  @media (max-width: 576px) {
    & .comment-and-stars {
      padding-left: 0;
    }
  }
`,lt=i=>({type:P.ADD_RATING,payload:i}),dt=async i=>{try{const t=await fetch(`${A}/products/${i}/rating`);if(!t.ok)throw new Error(`Ошибка запроса: ${t.status}`);const s=await t.json();if(!s)throw new Error("Рейтинг не найден");return s.data}catch(t){console.error(t)}},pt=i=>async t=>{try{const{userId:s,userRating:a,postId:r,userComment:n,date:c}=i,o=await dt(r)||{overallRating:0,users:[]},d=o.users.reduce((h,x)=>h+x.userRating,0);if(o.users.find(h=>h.userId===s))throw new Error("Вы уже оставили оценку");const u=(d+a)/(o.users.length+1),l=await fetch(`${A}/products/${r}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({rating:{overallRating:Number(u),users:[...o.users,{userId:s,userRating:a,postId:r,userComment:n,date:c}]}})});if(!l.ok)throw new Error(l.statusText);const p=await l.json();t(lt(p.data.rating))}catch(s){throw new Error(s.message)}},xt=({className:i,setHover:t,userRating:s,setUserRating:a,hover:r,product:n,currentUser:c,comment:o,setComment:d})=>{const u=T(),l=()=>{if(c&&n?.rating?.users.find(x=>x.userId===c.id))return!0},p=()=>({userId:c.id,userRating:s,postId:n.id,userComment:o,date:new Date().toISOString()}),h=()=>{try{const x=u(pt(p()));if(console.log(x,"res"),x)_("Cпасибо за оценку"),d("");else throw new Error(x)}catch(x){R(x.message)}};return e.jsxs("div",{className:i,children:[e.jsx("p",{className:"rating-title",children:l()?"Ваша оценка":"Оцените вещь"}),!l()&&e.jsx(ye,{setHover:t,userRating:s,hover:r,setUserRating:a,isRating:l}),l()?e.jsxs("div",{children:[e.jsx("p",{children:"Благодарим за оценку!"}),e.jsx("p",{children:`Вы оценили ${n.name} на ${n.rating.overallRating}`})]}):e.jsx(e.Fragment,{children:s>0&&e.jsxs("div",{className:"ratingAndComment",children:[e.jsx(D,{text:"Оставьте отзыв",onChange:x=>d(x.target.value)}),e.jsx(C,{onClick:h,children:"Отправить"})]})})]})},mt=j(xt)`
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--line);

  & .rating-title {
    margin: 0 0 10px;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  & .ratingAndComment {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    margin-top: 12px;
  }
`,ht=({className:i,product:t})=>t?.description?e.jsxs("div",{className:i,children:[e.jsx("p",{className:"eyebrow",children:"Описание"}),e.jsx("h2",{children:"Детали"}),e.jsx("div",{className:"description",children:t.description})]}):e.jsxs("div",{className:i,children:[e.jsx("p",{className:"eyebrow",children:"Описание"}),e.jsx("h2",{children:"Детали"}),e.jsx("div",{className:"description empty",children:"Описание отсутствует"})]}),gt=j(ht)`
  display: flex;
  flex-direction: column;
  gap: 14px;

  & .eyebrow {
    margin: 0;
  }

  & h2 {
    margin: 0;
    font-size: clamp(24px, 2.4vw, 32px);
  }

  & .description {
    max-width: 620px;
    margin-top: 6px;
    color: var(--ink-soft);
    font-size: 14px;
    line-height: 1.8;
    white-space: pre-line;
    word-break: break-word;

    &.empty {
      color: var(--grey-color);
    }
  }

  @media (max-width: 768px) {
    & .description {
      font-size: 13px;
    }
  }
`,ut=({className:i,product:t})=>{const[s,a]=g.useState(0);return e.jsxs("div",{className:i,children:[e.jsx("div",{className:"image",children:e.jsx("img",{src:t.images[s],alt:t.name})}),t.images.length>1&&e.jsx("div",{className:"small-images",children:t.images.map((r,n)=>e.jsx("img",{src:r,alt:"",className:n===s?"active":"",onClick:()=>a(n)},n))})]})},ft=j(ut)`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  & .image {
    width: 100%;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background-color: var(--paper-deep);

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  & .small-images {
    display: flex;
    flex-direction: row;
    gap: 10px;
    overflow-x: auto;

    & img {
      width: 72px;
      height: 90px;
      object-fit: cover;
      border: 1px solid transparent;
      cursor: pointer;
      opacity: 0.7;
      transition:
        opacity 0.2s ease,
        border-color 0.2s ease;

      &:hover,
      &.active {
        opacity: 1;
        border-color: var(--ink);
      }
    }
  }
`,vt=de`
from {
  opacity: 0;
  transform: translateY(16px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`,jt=({className:i})=>{const t=re(),s=T(),a=I(),r=w(m=>m.user.currentUser),n=w(m=>m.product?.product),c=w(m=>m.user.currentUser?.cart),[o,d]=g.useState(""),[u,l]=g.useState(""),[p,h]=g.useState(0),[x,f]=g.useState(null),{toggleFavorites:v,isUserLike:k}=ge(),{getCategoryName:$}=pe();if(g.useLayoutEffect(()=>{s(be(t.id)),q()},[s,t.id]),g.useEffect(()=>{if(n?.rating?.users&&r?.id){const m=n.rating.users.find(b=>b.userId===r.id);m&&h(m.userRating)}},[n,r]),!n||Object.keys(n).length===0)return e.jsx(V,{});const N=Object.keys(n?.sizes||{}),z=()=>{if(!o){R("Выберите размер");return}if(!r){R("Войдите в аккаунт чтобы добавить в корзину");return}c?.find(b=>b.customId===`${n.id}-${o}`&&b.size===o)?R(`${n.name} размера ${o} уже есть в корзине`):(s(me(r.id,n.id,`${n.id}-${o}`,o,1,n.sale)),d(""),_(`${n.name} размера ${o} добавлен в корзину`,()=>a("/cart")))};return e.jsxs("div",{className:i,children:[e.jsxs("nav",{className:"breadcrumbs","aria-label":"Хлебные крошки",children:[e.jsx(ae,{to:"/",children:"Главная"}),e.jsx("span",{children:"/"}),e.jsx(ae,{to:"/catalog",children:"Каталог"}),e.jsx("span",{children:"/"}),e.jsx("span",{className:"current",children:n.name})]}),e.jsxs("div",{className:"product-main",children:[e.jsx("div",{className:"images",children:e.jsx(ft,{product:n})}),e.jsxs("div",{className:"information",children:[e.jsx("p",{className:"category",children:$(n.categoryId)}),e.jsx("h1",{children:n.name}),e.jsx(fe,{post:n,size:"24"}),e.jsx("div",{className:"divider"}),e.jsxs("div",{className:"sizes-block",children:[e.jsxs("div",{className:"sizes-head",children:[e.jsx("span",{children:"Размер"}),e.jsx("span",{className:"sizes-hint",children:o?`Выбран ${o}`:"Выберите размер"})]}),e.jsx(he,{sizesKeys:N,product:n,activeButton:o,setActiveButton:d})]}),e.jsxs("div",{className:"actions",children:[e.jsx(C,{disabled:!o,onClick:z,children:o?"Добавить в корзину":"Выберите размер"}),e.jsx(C,{variant:"ghost",onClick:()=>v(n),children:k(n)?"Убрать из избранного":"Добавить в избранное"})]}),e.jsxs("ul",{className:"perks",children:[e.jsx("li",{children:"Доставка по Минску за 1–2 дня"}),e.jsx("li",{children:"Возврат и обмен в течение 14 дней"}),e.jsx("li",{children:"Оплата картой или при получении"})]}),r&&e.jsx(mt,{userRating:p,setUserRating:h,hover:x,setHover:f,product:n,currentUser:r,comment:u,setComment:l})]})]}),e.jsxs("div",{className:"product-extra",children:[e.jsx(gt,{product:n}),e.jsx(ct,{product:n})]}),e.jsx(rt,{product:n}),e.jsx(je,{})]})},wi=j(jt)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  animation: ${vt} ease 0.6s;

  & > * + * {
    margin-top: clamp(48px, 6vw, 88px);
  }

  & > .breadcrumbs + .product-main {
    margin-top: clamp(20px, 2.5vw, 32px);
  }

  & .breadcrumbs {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    margin-bottom: clamp(24px, 3vw, 40px);
    color: var(--grey-color);
    font-size: 11px;
    letter-spacing: 0.04em;

    & a {
      color: var(--grey-color);
      text-decoration: none;

      &:hover {
        color: var(--ink);
      }
    }

    & .current {
      color: var(--ink);
    }
  }

  & .product-main {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(32px, 5vw, 80px);
    align-items: start;
  }

  & .information {
    position: sticky;
    top: calc(var(--header-offset) + 24px);
    display: flex;
    flex-direction: column;
    gap: 18px;
    padding-top: 8px;
  }

  & .category {
    margin: 0;
    color: var(--grey-color);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }

  & h1 {
    margin: 0;
    font-size: clamp(30px, 3.4vw, 48px);
    line-height: 1.08;
  }

  & .divider {
    height: 1px;
    background-color: var(--line);
    margin: 4px 0;
  }

  & .sizes-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;

    & .sizes-hint {
      color: var(--grey-color);
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: none;
    }
  }

  & .actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 6px;
  }

  & .perks {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 6px 0 0;
    padding: 18px 0 0;
    border-top: 1px solid var(--line);
    list-style: none;

    & li {
      position: relative;
      padding-left: 18px;
      color: var(--ink-soft);
      font-size: 12px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 8px;
        width: 5px;
        height: 5px;
        background-color: var(--ink);
        border-radius: 50%;
      }
    }
  }

  & .product-extra {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(32px, 5vw, 80px);
    padding-top: clamp(32px, 4vw, 48px);
    border-top: 1px solid var(--line-strong);
  }

  @media (max-width: 992px) {
    & .product-main,
    & .product-extra {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    & .information {
      position: static;
    }
  }
`,L={hidden:{opacity:0,y:24},visible:i=>({opacity:1,y:0,transition:{delay:i*.1,duration:.7,ease:"easeOut"}})},bt=({className:i})=>{const t=I(),s=[{icon:"heart",title:"Качество",description:"Тщательный отбор каждой модели. Мы работаем только с проверенными производителями и материалами премиум-класса."},{icon:"star",title:"Стиль",description:"Актуальные тренды и вневременная классика. Коллекции, которые подчёркивают вашу индивидуальность."},{icon:"users",title:"Забота",description:"Мы ценим каждого клиента. Персональный подход, быстрая доставка и внимательная служба поддержки."},{icon:"diamond",title:"Доступность",description:"Качественная мода по честным ценам. Прямые поставки от производителей без наценок посредников."}],a=[{number:"1K+",label:"Довольных клиентов"},{number:"500+",label:"Моделей одежды"},{number:"50+",label:"Городов доставки"},{number:"24/7",label:"Поддержка клиентов"}];return g.useEffect(()=>{q()},[]),e.jsxs("div",{className:i,children:[e.jsxs("section",{className:"main-section",children:[e.jsxs(E.div,{className:"hero-content",initial:"hidden",animate:"visible",children:[e.jsx(E.p,{className:"eyebrow",custom:0,variants:L,children:"О бренде · Holly Garment"}),e.jsxs(E.h1,{custom:1,variants:L,children:["Одежда, которая",e.jsx("br",{}),"не спорит с вами"]}),e.jsx(E.p,{className:"main-subtitle",custom:2,variants:L,children:"Добро пожаловать в Holly — онлайн-пространство, где женская мода встречается с комфортом, вниманием к деталям и любовью к стилю. Мы создаём одежду, которая подчёркивает индивидуальность, вдохновляет на перемены и помогает чувствовать себя уверенно каждый день."}),e.jsx(E.div,{custom:3,variants:L,children:e.jsx(C,{width:"240px",onClick:()=>t("/catalog"),children:"Смотреть каталог"})})]}),e.jsxs(E.div,{className:"about-image",initial:{opacity:0,scale:.97},animate:{opacity:1,scale:1},transition:{duration:.9,ease:"easeOut"},children:[e.jsx("img",{src:"https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85",alt:"Holly Garment"}),e.jsx("span",{children:"Минск · с 2019 года"})]})]}),e.jsxs("section",{className:"values-section",children:[e.jsxs(E.div,{className:"section-head",custom:0,variants:L,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},children:[e.jsx("p",{className:"eyebrow",children:"Принципы"}),e.jsx("h2",{children:"Наши ценности"})]}),e.jsx("div",{className:"values-grid",children:s.map((r,n)=>e.jsxs(E.div,{className:"value-card",custom:n+1,variants:L,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},children:[e.jsxs("div",{className:"value-top",children:[e.jsxs("span",{className:"value-index",children:["0",n+1]}),e.jsx("span",{className:"value-icon",children:e.jsx(y,{id:r.icon,size:"18",color:"currentColor"})})]}),e.jsx("h3",{children:r.title}),e.jsx("p",{children:r.description})]},r.title))})]}),e.jsx("section",{className:"stats-section",children:e.jsx("div",{className:"stats-grid",children:a.map((r,n)=>e.jsxs(E.div,{className:"stat-card",custom:n,variants:L,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},children:[e.jsx("div",{className:"stat-number",children:r.number}),e.jsx("div",{className:"stat-label",children:r.label})]},r.label))})}),e.jsx("section",{className:"mission-section",children:e.jsxs(E.div,{className:"mission-content",custom:0,variants:L,initial:"hidden",whileInView:"visible",viewport:{once:!0,amount:.4},children:[e.jsx("p",{className:"eyebrow",children:"Миссия"}),e.jsxs("h2",{children:["Holly — это не просто одежда.",e.jsx("br",{}),"Это настроение. Это ты."]}),e.jsx("p",{children:"Мы верим, что каждая женщина заслуживает чувствовать себя красивой, уверенной и стильной. Наша цель — сделать качественную моду доступной для всех, сохраняя высокие стандарты качества и внимания к деталям. Мы работаем напрямую с производителями и вручную отбираем каждую модель, чтобы вещь приносила радость — не только в день покупки."})]})}),e.jsx("section",{className:"social-section",children:e.jsxs("div",{className:"social-content",children:[e.jsx("h2",{children:"Присоединяйтесь"}),e.jsx("p",{children:"Новинки, образы и закрытые распродажи — в наших социальных сетях."}),e.jsxs("div",{className:"social-icons",children:[e.jsx("a",{href:"#",className:"social-link","aria-label":"Instagram",children:e.jsx(y,{id:"instagram",size:"16",color:"var(--ink)"})}),e.jsx("a",{href:"#",className:"social-link","aria-label":"VK",children:e.jsx(y,{id:"vk",size:"16",color:"var(--ink)"})}),e.jsx("a",{href:"#",className:"social-link","aria-label":"Telegram",children:e.jsx(y,{id:"telegram",size:"16",color:"var(--ink)"})})]})]})})]})},Ni=j(bt)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(56px, 8vw, 110px);

  & .main-section {
    display: grid;
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: clamp(32px, 5vw, 80px);
    align-items: center;
  }

  & .hero-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;

    & .eyebrow {
      margin: 0;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 5vw, 72px);
      line-height: 1.02;
    }
  }

  & .main-subtitle {
    max-width: 560px;
    margin: 0;
    color: var(--ink-soft);
    font-size: clamp(14px, 1.2vw, 16px);
    line-height: 1.8;
  }

  & .about-image {
    position: relative;
    aspect-ratio: 4 / 5;
    overflow: hidden;
    background-color: var(--paper-deep);

    & img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & span {
      position: absolute;
      left: 18px;
      bottom: 18px;
      padding: 6px 12px;
      background-color: var(--paper);
      color: var(--ink);
      font-size: 9px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }
  }

  & .section-head {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 24px;
    margin-bottom: 32px;
    border-bottom: 1px solid var(--line-strong);

    & h2 {
      margin: 0;
      font-size: clamp(28px, 3.4vw, 46px);
    }
  }

  & .values-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: clamp(14px, 1.6vw, 20px);
  }

  & .value-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    min-height: clamp(220px, 22vw, 280px);
    padding: clamp(24px, 3vw, 40px);
    border: 1px solid var(--line);
    color: var(--ink);
    background-color: transparent;
    transition:
      background-color 0.35s ease,
      border-color 0.35s ease,
      color 0.35s ease;

    &:hover {
      border-color: var(--ink);
      background-color: var(--ink);
      color: var(--paper);

      & p {
        color: rgba(246, 243, 236, 0.62);
      }

      & .value-icon {
        border-color: rgba(246, 243, 236, 0.4);
      }
    }

    & .value-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
    }

    & .value-index {
      font-family: var(--font-display);
      font-size: clamp(34px, 4vw, 52px);
      line-height: 0.9;
      opacity: 0.4;
    }

    & .value-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      border: 1px solid var(--line-strong);
      border-radius: 50%;
      transition: border-color 0.35s ease;
    }

    & h3 {
      margin: auto 0 0;
      padding-top: 24px;
      font-size: clamp(22px, 2.4vw, 30px);
    }

    & p {
      margin: 0;
      max-width: 420px;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.75;
      transition: color 0.35s ease;
    }
  }

  & .stats-section {
    padding: clamp(24px, 3vw, 40px) 0;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  & .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
  }

  & .stat-card {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  & .stat-number {
    font-family: var(--font-display);
    font-size: clamp(34px, 4vw, 54px);
    line-height: 1;
  }

  & .stat-label {
    color: var(--grey-color);
    font-size: 11px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  & .mission-section {
    padding: clamp(36px, 5vw, 72px);
    background-color: var(--ink);
    color: var(--paper);
  }

  & .mission-content {
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 860px;

    & .eyebrow {
      color: rgba(246, 243, 236, 0.5);
    }

    & h2 {
      margin: 0;
      color: var(--paper);
      font-size: clamp(28px, 3.6vw, 52px);
      line-height: 1.15;
    }

    & p:not(.eyebrow) {
      max-width: 620px;
      margin: 0;
      color: rgba(246, 243, 236, 0.68);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  & .social-section {
    display: flex;
    justify-content: center;
    padding-bottom: clamp(16px, 3vw, 32px);
  }

  & .social-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    text-align: center;

    & h2 {
      margin: 0;
      font-size: clamp(28px, 3vw, 40px);
    }

    & p {
      margin: 0 0 10px;
      color: var(--grey-color);
      font-size: 13px;
    }
  }

  & .social-icons {
    display: flex;
    gap: 12px;
  }

  & .social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    text-decoration: none;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    &:hover {
      border-color: var(--ink);
      background-color: var(--paper-deep);
    }
  }

  @media (max-width: 992px) {
    & .main-section {
      grid-template-columns: 1fr;
    }

    & .about-image {
      aspect-ratio: 16 / 10;
    }

    & .values-grid,
    & .stats-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 576px) {
    & .values-grid,
    & .stats-grid {
      grid-template-columns: 1fr;
    }
  }
`,B={hidden:{opacity:0,y:20},visible:i=>({opacity:1,y:0,transition:{delay:i*.08,duration:.6,ease:"easeOut"}})},yt=({className:i})=>{g.useEffect(()=>{q()},[]);const t=[{title:"Курьерская доставка",description:"Доставка курьером по Минску в течение 1-2 рабочих дней",price:"Бесплатно при заказе от 200 руб.",icon:"truck"},{title:"Европочта",description:"Доставка через Европочту в любой регион страны",price:"Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)",icon:"envelope"},{title:"Белпочта",description:"Доставка через Белпочту по всей Беларуси",price:"Бесплатно при заказе от 200 руб. (срок доставки 2-5 дней)",icon:"truck"},{title:"Самовывоз",description:"Заберите заказ самостоятельно из нашего пункта выдачи",price:"Бесплатно",icon:"home"}],s=[{title:"Онлайн оплата",description:"Банковской картой Visa, MasterCard, МИР через защищенный платежный шлюз",icon:"credit-card"},{title:"Наличными курьеру",description:"Оплата наличными при получении заказа (только для курьерской доставки)",icon:"money"},{title:"При получении",description:"Оплата наложенным платежом при получении в отделении почты",icon:"shopping-bag"}],a=[{question:"Как отследить заказ?",answer:"После оформления заказа вы получите номер отслеживания на email. Также вы можете отследить статус заказа в личном кабинете."},{question:"Можно ли изменить адрес доставки?",answer:"Да, вы можете изменить адрес доставки до момента отправки заказа. Свяжитесь с нами по телефону или email."},{question:"Что делать, если товар не подошел?",answer:"Вы можете вернуть товар в течение 14 дней с момента получения. Товар должен быть в оригинальной упаковке и с бирками."},{question:"Есть ли доставка в другие страны?",answer:"Сейчас мы доставляем по всей Беларуси. О доставке в другие страны уточняйте у наших менеджеров."}];return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"delivery-header",children:[e.jsx("p",{className:"eyebrow",children:"Сервис"}),e.jsx("h1",{children:"Доставка и оплата"}),e.jsx("p",{children:"Отправляем заказы каждый день. По Минску — курьером за 1–2 дня, по Беларуси — Европочтой и Белпочтой."})]}),e.jsxs(E.section,{className:"delivery-section",initial:"hidden",animate:"visible",children:[e.jsx("h2",{className:"block-title",children:"Способы доставки"}),e.jsx("div",{className:"methods-grid",children:t.map((r,n)=>e.jsxs(E.div,{className:"method-card",custom:n,variants:B,children:[e.jsx("span",{className:"method-icon",children:e.jsx(y,{id:r.icon,size:"18",color:"var(--ink)"})}),e.jsx("h3",{children:r.title}),e.jsx("p",{children:r.description}),e.jsx("span",{className:"price",children:r.price})]},r.title))})]}),e.jsxs(E.section,{className:"payment-methods",initial:"hidden",animate:"visible",children:[e.jsx("h2",{className:"block-title",children:"Способы оплаты"}),e.jsx("div",{className:"methods-grid payment-grid",children:s.map((r,n)=>e.jsxs(E.div,{className:"method-card",custom:n+4,variants:B,children:[e.jsx("span",{className:"method-icon",children:e.jsx(y,{id:r.icon,size:"18",color:"var(--ink)"})}),e.jsx("h3",{children:r.title}),e.jsx("p",{children:r.description})]},r.title))})]}),e.jsxs(E.section,{className:"faq-section",initial:"hidden",animate:"visible",children:[e.jsx("h2",{className:"block-title",children:"Частые вопросы"}),e.jsx("div",{className:"faq-list",children:a.map((r,n)=>e.jsxs(E.div,{className:"faq-item",custom:n+7,variants:B,children:[e.jsx("h3",{children:r.question}),e.jsx("p",{children:r.answer})]},r.question))})]}),e.jsxs(E.div,{className:"contact-info",initial:"hidden",animate:"visible",custom:11,variants:B,children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Поддержка"}),e.jsx("h2",{children:"Нужна помощь?"}),e.jsx("p",{children:"Ежедневно с 9:00 до 21:00 — по телефону, почте или в мессенджерах."})]}),e.jsxs("div",{className:"contact-details",children:[e.jsx("a",{href:"tel:+375291234567",children:"+375 29 123-45-67"}),e.jsx("a",{href:"mailto:info@holly.by",children:"info@holly.by"})]})]})]})},ki=j(yt)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(48px, 6vw, 88px);

  & .delivery-header {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin: 0;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 5vw, 66px);
      line-height: 1;
    }

    & p {
      max-width: 520px;
      margin: 0;
      color: var(--grey-color);
      font-size: 14px;
      line-height: 1.8;
    }
  }

  & .block-title {
    padding-bottom: 20px;
    margin: 0 0 28px;
    border-bottom: 1px solid var(--line);
    font-size: clamp(22px, 2.4vw, 30px);
  }

  & .methods-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(16px, 2vw, 28px);
  }

  & .payment-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  & .method-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 26px 22px;
    border: 1px solid var(--line);
    background-color: transparent;
    transition:
      border-color 0.25s ease,
      background-color 0.25s ease;

    &:hover {
      border-color: var(--line-strong);
      background-color: var(--surface);
    }

    & h3 {
      margin: 6px 0 0;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 12px;
      line-height: 1.7;
    }

    & .price {
      margin-top: auto;
      padding-top: 12px;
      border-top: 1px solid var(--line);
      width: 100%;
      color: var(--ink);
      font-size: 12px;
      font-weight: 500;
    }
  }

  & .method-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 38px;
    height: 38px;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
  }

  & .faq-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0 clamp(32px, 5vw, 80px);
  }

  & .faq-item {
    padding: 22px 0;
    border-top: 1px solid var(--line);

    & h3 {
      margin: 0 0 8px;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 600;
    }

    & p {
      margin: 0;
      color: var(--grey-color);
      font-size: 13px;
      line-height: 1.75;
    }
  }

  & .contact-info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 32px;
    padding: clamp(28px, 4vw, 52px);
    background-color: var(--paper-deep);

    & .eyebrow {
      margin-bottom: 12px;
    }

    & h2 {
      margin: 0 0 10px;
      font-size: clamp(26px, 3vw, 40px);
    }

    & p:not(.eyebrow) {
      max-width: 400px;
      margin: 0;
      color: var(--ink-soft);
      font-size: 13px;
      line-height: 1.7;
    }
  }

  & .contact-details {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 8px;

    & a {
      color: var(--ink);
      font-family: var(--font-display);
      font-size: clamp(18px, 2vw, 24px);
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  @media (max-width: 992px) {
    & .methods-grid,
    & .payment-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    & .faq-list {
      grid-template-columns: 1fr;
    }

    & .contact-info {
      flex-direction: column;
      align-items: flex-start;
    }

    & .contact-details {
      align-items: flex-start;
    }
  }

  @media (max-width: 576px) {
    & .methods-grid,
    & .payment-grid {
      grid-template-columns: 1fr;
    }
  }
`,wt=(i,t,s)=>({type:P.CREATE_ORDER,payload:{orderNum:i,user:t,products:s}}),Nt=(i,t)=>({type:P.UPDATE_CART_ITEM_COUNT,payload:{id:i,count:t}}),H=(i,t,s)=>async a=>{console.log(i,t,s),await fetch(`${A}/users/${i}/cart/${t}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({count:s})}).then(r=>r.json()),a(Nt(t,s))},kt=i=>({type:P.REMOVE_CARD,payload:i}),Ct=(i,t)=>async s=>{try{const a=await fetch(`${A}/users/${i}/cart/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`Ошибка запроса: ${a.status}`);s(kt(t))}catch(a){console.error(a)}},zt=({className:i,item:t,currentUser:s})=>{const a=T(),r=(u,l)=>{a(Ct(u,l)),_(`Товар ${t.name} удален из корзины`)},n=(u,l)=>{const p=l.size;l.count<l.sizes[p]?a(H(u,l.id,l.count+1)):a(H(u,l.id,l.count=l.sizes[p]))},c=(u,l)=>{l.count>1?a(H(u,l.id,l.count-1)):a(H(u,l.id,l.count=1))},o=t.sale!==null&&t.sale>0,d=o?ue(t):t.price;return e.jsxs("div",{className:i,children:[e.jsx("div",{className:"product-media",children:e.jsx("img",{src:t.images[0],alt:t.name,loading:"lazy"})}),e.jsxs("div",{className:"product-content",children:[e.jsxs("div",{className:"product-header",children:[e.jsx("h2",{children:t.name}),e.jsxs("button",{type:"button",className:"remove","aria-label":`Удалить ${t.name}`,onClick:()=>{r(s.id,t.id)},children:[e.jsx(y,{id:"trash",size:"15",color:"currentColor"}),e.jsx("span",{children:"Удалить"})]})]}),e.jsxs("div",{className:"product-meta",children:[e.jsxs("span",{children:["Размер: ",t.size]}),e.jsxs("span",{children:["Цена: ",t.price," руб."]}),o&&e.jsxs("span",{children:["Скидка: ",t.sale,"%"]})]}),e.jsxs("div",{className:"product-controls",children:[e.jsxs("div",{className:"count",children:[e.jsx("button",{disabled:t.count===1,onClick:()=>{c(s.id,t)},children:"-"}),e.jsx("p",{children:t.count}),e.jsx("button",{disabled:t.count===t.sizes[t.size],onClick:()=>{n(s.id,t)},children:"+"})]}),e.jsx("div",{className:"count-info",children:e.jsxs("p",{children:["В наличии: ",t.sizes[t.size]]})})]})]}),e.jsxs("div",{className:"price-block",children:[o&&e.jsxs("span",{className:"price-old",children:[t.price," руб."]}),e.jsxs("span",{className:"price-current",children:[d," руб."]}),e.jsxs("span",{className:"price-note",children:["за ",t.count," шт."]})]})]})},St=j(zt)`
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) 140px;
  gap: clamp(16px, 2vw, 28px);
  width: 100%;
  padding: 24px 0;
  border-bottom: 1px solid var(--line);

  & .product-media img {
    width: 110px;
    height: 140px;
    object-fit: cover;
  }

  & .product-content {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  & .product-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;

    h2 {
      margin: 0;
      font-size: clamp(18px, 2vw, 23px);
      line-height: 1.2;
    }

    & .remove {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 0;
      border: none;
      background: none;
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--red-color);
      }
    }
  }

  & .product-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    color: var(--grey-color);
    font-size: 12px;

    span {
      padding: 0;
      background: none;
    }
  }

  & .product-controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    margin-top: auto;
  }

  & .count {
    display: inline-flex;
    align-items: center;
    border: 1px solid var(--line-strong);

    & p {
      margin: 0;
      min-width: 38px;
      text-align: center;
      font-size: 14px;
    }

    & button {
      width: 34px;
      height: 34px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--ink);
      font-size: 18px;
      cursor: pointer;
      transition: background-color 0.2s ease;

      &:hover:not(:disabled) {
        background-color: var(--paper-deep);
      }

      &:disabled {
        opacity: 0.3;
        cursor: default;
      }
    }
  }

  & .count-info {
    font-size: 11px;
    letter-spacing: 0.04em;
    color: var(--grey-color);
  }

  & .price-block {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
    gap: 4px;
    text-align: right;

    .price-old {
      text-decoration: line-through;
      color: var(--grey-color);
      font-size: 13px;
    }

    .price-current {
      font-size: 20px;
      font-weight: 600;
      color: var(--ink);
    }

    .price-note {
      font-size: 11px;
      color: var(--grey-color);
    }
  }

  @media (max-width: 768px) {
    grid-template-columns: 88px minmax(0, 1fr);
    align-items: start;

    & .product-media img {
      width: 88px;
      height: 112px;
    }

    & .price-block {
      grid-column: 2;
      align-items: flex-start;
      margin-top: 0;
      text-align: left;
    }

    & .product-controls {
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      margin-top: 8px;
    }
  }
`,Pt=({className:i})=>{const t=w(X),s=T(),a=I(),r=w(K);g.useEffect(()=>{q()},[]);const n=g.useMemo(()=>!t||!r||r.length===0?[]:(t.cart||[]).map(l=>{const p=r.find(h=>h.id===l.productId);return{id:l.customId,name:p?.name,images:p?.images,rating:p?.rating,description:p?.description,size:l.size,price:p?.price,count:l.count,sizes:p?.sizes,sale:p?.sale}}),[t,r]);if(!t)return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"cart-header",children:[e.jsx("p",{className:"eyebrow",children:"Заказ"}),e.jsx("h1",{children:"Корзина"})]}),e.jsxs("div",{className:"cart-null",children:[e.jsx("p",{children:"Войдите в аккаунт, чтобы увидеть корзину."}),e.jsx(C,{onClick:()=>{a("/catalog")},width:"300px",children:"Перейти в каталог"})]})]});if(!r||r.length===0)return e.jsx(V,{});const c=l=>{const p=new Date().getTime(),h=l.reduce((x,f)=>(x.push({id:f.id,name:f.name,size:f.size,price:f.price,count:f.count,sale:f.sale,finishPrice:Math.floor(o())}),x),[]);s(wt(p,t,h)),a(`/cart/order/${p}`)},o=()=>n.reduce((l,p)=>{const h=Number(p.count)||0,x=Number(p.price)||0,f=Number(p.sale)||0,v=x*(1-f/100);return l+h*v},0),d=n.reduce((l,p)=>l+(Number(p.count)||0),0),u=n.reduce((l,p)=>{if(!p.sale)return l;const h=Number(p.count)||0,x=Number(p.price)||0,f=Number(p.sale)||0,v=x*(f/100);return l+h*v},0);return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"cart-header",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Заказ"}),e.jsx("h1",{children:"Корзина"})]}),e.jsxs("div",{className:"cart-header-meta",children:[e.jsxs("span",{children:[d," ",Y(d,["товар","товара","товаров"])]}),e.jsxs("button",{type:"button",onClick:()=>a("/catalog"),children:["Продолжить покупки",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]}),t?e.jsxs("div",{className:"cart",children:[e.jsx("div",{className:"cart-list",children:n.length===0?e.jsxs("div",{className:"cart-null",children:[e.jsx("p",{children:"Корзина пуста"}),e.jsx(C,{onClick:()=>{a("/catalog")},width:"300",children:"Вперед за покупками!"})]}):n.map(l=>e.jsx(St,{currentUser:t,item:l,cart:n},l.id))}),n.length>0&&e.jsx("aside",{className:"cart-summary",children:e.jsxs("div",{className:"summary-card",children:[e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Товары"}),e.jsx("b",{children:d})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Экономия"}),e.jsxs("b",{children:[Math.floor(u)," руб."]})]}),e.jsxs("div",{className:"summary-row",children:[e.jsx("span",{children:"Доставка"}),e.jsx("b",{children:o()>=200?"Бесплатно":"по тарифу"})]}),e.jsxs("div",{className:"summary-total",children:[e.jsx("span",{children:"К оплате"}),e.jsxs("span",{className:"summary-amount",children:[Math.floor(o())," руб."]})]}),e.jsx(C,{onClick:()=>{c(n)},width:"100%",children:"Оформить заказ"}),e.jsx("p",{className:"summary-hint",children:"Нажимая кнопку, вы перейдёте к оформлению заказа."})]})})]}):e.jsxs("div",{className:"cart-null",children:[e.jsx("p",{children:"Войдите в аккаунт, чтобы увидеть корзину."}),e.jsx(C,{onClick:()=>{a("/catalog")},width:"300px",children:"Перейти в каталог"})]})]})},Ci=j(Pt)`
  width: var(--page-width);
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 40px);

  & .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 4.6vw, 62px);
      line-height: 1;
    }
  }

  & .cart-header-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    & span {
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 0 4px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 14px;
      }
    }
  }

  & .cart {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) 340px;
    justify-content: space-between;
    align-items: start;
    gap: clamp(32px, 4vw, 64px);
  }

  & .cart-list {
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--line);
  }

  & .cart-summary {
    position: sticky;
    top: calc(var(--header-offset) + 24px);
    align-self: flex-start;
  }

  & .summary-card {
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 28px;
    background-color: var(--paper-deep);
  }

  & .summary-row {
    display: flex;
    justify-content: space-between;
    color: var(--ink-soft);
    font-size: 13px;
  }

  & .summary-total {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 16px 0 4px;
    border-top: 1px solid var(--line-strong);
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }

  & .summary-amount {
    font-family: var(--font-display);
    font-size: 28px;
    font-weight: 400;
    color: var(--ink);
  }

  & .summary-hint {
    font-size: 11px;
    color: var(--grey-color);
    margin: 0;
    line-height: 1.6;
  }

  & .cart-null {
    grid-column: 1 / -1;
    width: 100%;
    min-height: 320px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 18px;
    padding: clamp(32px, 5vw, 64px);
    background-color: var(--paper-deep);
    text-align: left;

    & p {
      max-width: 420px;
      margin: 0;
      font-family: var(--font-display);
      font-size: clamp(20px, 2.6vw, 30px);
      line-height: 1.25;
      color: var(--ink);
    }
  }

  @media (max-width: 992px) {
    & .cart {
      grid-template-columns: 1fr;
    }

    & .cart-summary {
      position: static;
      width: 100%;
    }
  }

  @media (max-width: 576px) {
    & .cart-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 14px;
    }

    & .cart-header-meta {
      align-items: flex-start;
    }

    & .summary-card {
      padding: 20px;
    }
  }
`,Et=async i=>{await fetch("http://localhost:5678/webhook-test/f8bfe877-2ef3-4582-843a-ce3df7069f7f",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({complitedOrder:i})})},$t=({className:i,children:t,setOpenModal:s})=>e.jsx("div",{className:i,children:e.jsxs("div",{className:"modal",children:[e.jsx(y,{id:"times",onClick:()=>s(!1)}),t]})}),It=j($t)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2;
    & .modal{
    width: 500px;
    height: 400px;
    background-color: #ffffff;
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    }
    & i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    padding: 5px;
    }
`,Ot=()=>({type:P.CLEAR_CART}),Tt=i=>fetch("http://localhost:3005/orders",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({orderNum:i.orderNum,userId:i.userId,userEmail:i.userEmail,userPhone:i.userPhone,userName:i.userName,userPatronymic:i.userPatronymic,userSurname:i.userSurname,deliveryMethod:i.deliveryMethod,deliveryAddress:i.deliveryAddress,products:i.products,status:i.status})}).then(t=>t.json()).then(t=>console.log(t,"order")),At=async i=>{const t=[];for(const s of i){const{id:a,size:r,count:n}={id:s.id.split("-")[0],size:s.size,count:s.count},c=await be(a),o=Number(c.sizes[r])-Number(n),d={...c.sizes,[r]:String(o)},l=await(await fetch(`http://localhost:4000/products/${a}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({sizes:d})})).json();t.push(l)}return t},Rt=i=>async t=>{try{const s=await fetch(`${A}/users/${i}/cart`,{method:"DELETE"});if(!s.ok)throw new Error(`Ошибка запроса: ${s.status}`);t(Ot())}catch(s){console.error(s)}},Ut=({className:i})=>{const{orderId:t}=re(),s=w($e),[a,r]=g.useState(""),[n,c]=g.useState(""),[o,d]=g.useState(""),[u,l]=g.useState(""),[p,h]=g.useState(""),[x,f]=g.useState(""),[v,k]=g.useState(""),[$,N]=g.useState(!1),[z,m]=g.useState(""),b=I(),S=T();console.log(s);const U=w(X);w(K);const J=()=>{const O={orderNum:s.orderNum,userId:U.id,userEmail:a,userPhone:n,userName:o,userPatronymic:u,userSurname:p,status:"created",deliveryMethod:x,deliveryAddress:v,products:s.products};Tt(O),Et(O).then(()=>{N(!0),m(""),At(s.products),setTimeout(()=>{b("/"),S(Rt(U.id))},5e3)}).catch(Q=>{N(!0),m(Q.message)})};return e.jsxs("div",{className:i,children:[$&&e.jsx(It,{text:z,onClose:()=>{N(!1)},children:z?e.jsx("p",{children:z}):e.jsx("p",{children:"Заказ успешно отправлен"})}),e.jsxs("div",{className:"complite-order",children:[e.jsxs("h2",{children:[" Заказ номер ",t]}),e.jsxs("div",{children:[e.jsx("p",{children:"Проверьте данные"}),e.jsx(D,{value:a,text:"email",onChange:O=>{r(O.target.value)}}),e.jsx(D,{value:n,text:"Телефон",onChange:O=>{c(O.target.value)}}),e.jsx(D,{value:p,text:"Фамилия",onChange:O=>{h(O.target.value)}}),e.jsx(D,{value:o,text:"Имя",onChange:O=>{d(O.target.value)}}),e.jsx(D,{value:u,text:"Отчество",onChange:O=>{l(O.target.value)}})]}),e.jsx("h2",{children:"Доставка"}),e.jsxs("div",{className:"delivery",children:[e.jsx("div",{className:x==="Доставка по минску"?"delivery-item-active":"delivery-item",onClick:()=>{f("Доставка по минску")},children:e.jsx("p",{children:"Доставка по Минску"})}),e.jsx("div",{className:x==="Европочта"?"delivery-item-active":"delivery-item",onClick:()=>{f("Европочта")},children:e.jsx("p",{children:"Европочта"})}),e.jsx("div",{className:x==="Белпочта"?"delivery-item-active":"delivery-item",onClick:()=>{f("Белпочта")},children:e.jsx("p",{children:"Белпочта"})})]}),e.jsxs("div",{children:[x==="Доставка по минску"&&e.jsx("p",{children:"Доставка по Минску"}),x==="Европочта"&&e.jsx("p",{children:"Доставка по Европочте"}),x==="Белпочта"&&e.jsx("p",{children:"Доставка по Белпочте"})]}),e.jsx("div",{children:e.jsx(D,{onChange:O=>{k(O.target.value)},text:x==="Доставка по минску"?"Адрес доставки":"Адрес пункта выдачи"})}),e.jsx(C,{onClick:J,width:"200px",children:"Заказать"})]})]})},zi=j(Ut)`
  width: var(--page-width);
  margin: 0 auto;
  padding: 0;

  & .complite-order {
    display: flex;
    width: min(820px, 100%);
    margin: 0 auto;
    flex-direction: column;
    align-items: stretch;
    gap: 24px;
    padding: clamp(24px, 4vw, 48px);
    border: 1px solid var(--line);
    background-color: var(--surface);

    & > div {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px 24px;

      & p {
        grid-column: 1 / -1;
        margin: 0;
        color: var(--grey-color);
        font-size: 13px;
      }
    }

    & h2 {
      margin: 0;
      font-size: clamp(22px, 2.4vw, 30px);
    }
  }

  & .delivery {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }

  & .delivery-item,
  & .delivery-item-active {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 10px;
    border: 1px solid var(--line-strong);
    font-size: 12px;
    text-align: center;
    cursor: pointer;
    transition:
      border-color 0.2s ease,
      background-color 0.2s ease;

    & p {
      margin: 0;
      color: var(--ink);
      font-size: 12px;
    }

    &:hover {
      border-color: var(--ink);
    }
  }

  & .delivery-item-active {
    border-color: var(--ink);
    background-color: var(--ink);

    & p {
      color: var(--paper);
    }
  }

  @media (max-width: 768px) {
    & .complite-order > div {
      grid-template-columns: 1fr;
    }

    & .delivery {
      grid-template-columns: 1fr;
    }
  }
`,Dt=({className:i})=>{const t=w(X),s=w(K),a=I();if(g.useEffect(()=>{q()},[]),!t)return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"favorites-header",children:[e.jsx("p",{className:"eyebrow",children:"Личное"}),e.jsx("h1",{children:"Избранное"})]}),e.jsxs("div",{className:"empty",children:[e.jsx("span",{className:"empty-icon",children:e.jsx(y,{id:"heart-o",size:"28",color:"currentColor"})}),e.jsx("p",{children:"Войдите в аккаунт, чтобы сохранять понравившиеся вещи."}),e.jsx(C,{width:"280px",onClick:()=>a("/catalog"),children:"Перейти в каталог"})]})]});const r=s.filter(n=>t.favorites.find(c=>c.id===n.id));return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"favorites-header",children:[e.jsxs("div",{children:[e.jsx("p",{className:"eyebrow",children:"Личное"}),e.jsx("h1",{children:"Избранное"})]}),e.jsxs("div",{className:"header-meta",children:[e.jsxs("span",{className:"count",children:[r.length," ",Y(r.length,["вещь","вещи","вещей"])]}),e.jsxs("button",{type:"button",onClick:()=>a("/catalog"),children:["Продолжить покупки",e.jsx("span",{"aria-hidden":"true",children:"→"})]})]})]}),r.length>0?e.jsx("div",{className:"favorites",children:r.map(n=>e.jsx(Z,{post:n},n.id))}):e.jsxs("div",{className:"empty",children:[e.jsx("span",{className:"empty-icon",children:e.jsx(y,{id:"heart-o",size:"28",color:"currentColor"})}),e.jsx("p",{children:"Пока здесь пусто. Отмечайте вещи сердечком — они появятся тут."}),e.jsx(C,{width:"280px",onClick:()=>a("/catalog"),children:"Смотреть каталог"})]})]})},Si=j(Dt)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(24px, 3vw, 40px);

  & .favorites-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(38px, 4.6vw, 62px);
      line-height: 1;
    }
  }

  & .header-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 10px;

    & .count {
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    & button {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 0 0 4px;
      border: none;
      border-bottom: 1px solid var(--ink);
      background: none;
      color: var(--ink);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      cursor: pointer;
      transition: gap 0.2s ease;

      &:hover {
        gap: 14px;
      }
    }
  }

  & .favorites {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 44px) clamp(16px, 2.2vw, 32px);
  }

  & .empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 18px;
    padding: clamp(32px, 5vw, 64px);
    background-color: var(--paper-deep);
  }

  & .empty-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 1px solid var(--line-strong);
    border-radius: 50%;
    color: var(--ink);
  }

  & .empty p {
    max-width: 420px;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(20px, 2.6vw, 30px);
    line-height: 1.25;
    color: var(--ink);
  }

  @media (max-width: 992px) {
    & .favorites {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 576px) {
    & .favorites-header {
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;
    }

    & .header-meta {
      align-items: flex-start;
    }

    & .favorites {
      gap: 28px 14px;
    }
  }
`,Mt=i=>({type:P.SET_USER_ORDERS,payload:i}),_t=i=>async t=>{const r=(await(await fetch("http://localhost:3005/orders")).json()).orders.filter(n=>n.userId===i);t(Mt(r))},Lt=({className:i})=>{const t=w(X),s=w(xe),a=T(),r=I(),n={created:"Создан",confirmed:"Подтверждён",delivery:"Доставка",completed:"Выполнен"};if(g.useEffect(()=>{t?.id&&a(_t(t.id))},[a,t?.id]),!t)return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"cabinet-header",children:[e.jsx("p",{className:"eyebrow",children:"Личный кабинет"}),e.jsx("h1",{children:"Сначала войдите"})]}),e.jsxs("div",{className:"empty",children:[e.jsx("p",{children:"После входа здесь появятся ваши заказы и избранные вещи."}),e.jsx(C,{width:"260px",onClick:()=>r("/catalog"),children:"Перейти в каталог"})]})]});const c=(t.cart||[]).length,o=(t.favorites||[]).length;return e.jsxs("div",{className:i,children:[e.jsxs("header",{className:"cabinet-header",children:[e.jsx("p",{className:"eyebrow",children:"Личный кабинет"}),e.jsxs("h1",{children:["Здравствуйте, ",t.name]})]}),e.jsxs("div",{className:"profile",children:[e.jsxs("div",{className:"profile-main",children:[e.jsx("span",{className:"profile-avatar",children:t.name.slice(0,1)}),e.jsxs("div",{children:[e.jsx("p",{className:"profile-name",children:t.name}),e.jsx("p",{className:"profile-email",children:t.email})]})]}),e.jsxs("div",{className:"profile-links",children:[e.jsxs("button",{type:"button",onClick:()=>r("/favorites"),children:[e.jsx(y,{id:"heart-o",size:"16",color:"currentColor"}),e.jsx("span",{children:"Избранное"}),e.jsx("b",{children:o})]}),e.jsxs("button",{type:"button",onClick:()=>r("/cart"),children:[e.jsx(y,{id:"shopping-bag",size:"16",color:"currentColor"}),e.jsx("span",{children:"Корзина"}),e.jsx("b",{children:c})]}),e.jsxs("button",{type:"button",onClick:()=>r("/catalog"),children:[e.jsx(y,{id:"search",size:"16",color:"currentColor"}),e.jsx("span",{children:"Каталог"}),e.jsx("b",{children:"→"})]})]})]}),e.jsxs("section",{className:"orders",children:[e.jsxs("div",{className:"orders-header",children:[e.jsx("h2",{children:"Ваши заказы"}),e.jsxs("span",{children:[s.length," ",Y(s.length,["заказ","заказа","заказов"])]})]}),s.length>0?e.jsx("div",{className:"orders-list",children:s.map(d=>e.jsxs("article",{className:"order",children:[e.jsxs("div",{className:"order-number",children:[e.jsx("p",{children:"Заказ"}),e.jsxs("b",{children:["№ ",d.orderNum]})]}),e.jsxs("div",{className:"order-info",children:[e.jsx("p",{children:"Дата"}),e.jsx("b",{children:we(d.createdAt)})]}),e.jsxs("div",{className:"order-info",children:[e.jsx("p",{children:"Статус"}),e.jsx("span",{className:`status status-${d.status}`,children:n[d.status]||d.status})]}),e.jsxs("div",{className:"order-total",children:[e.jsx("p",{children:"Сумма"}),e.jsx("b",{children:d.sum?`${d.sum} руб.`:"—"})]})]},d.orderNum))}):e.jsxs("div",{className:"empty",children:[e.jsx("p",{children:"У вас пока нет заказов. Самое время это исправить."}),e.jsx(C,{width:"260px",onClick:()=>r("/catalog"),children:"Смотреть каталог"})]})]})]})},Pi=j(Lt)`
  width: var(--page-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: clamp(28px, 4vw, 48px);

  & .cabinet-header {
    padding-bottom: 24px;
    border-bottom: 1px solid var(--line-strong);

    & .eyebrow {
      margin-bottom: 14px;
    }

    & h1 {
      margin: 0;
      font-size: clamp(32px, 4vw, 52px);
      line-height: 1.1;
    }
  }

  & .profile {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr);
    gap: clamp(24px, 4vw, 56px);
    align-items: center;
    padding: clamp(24px, 3vw, 36px);
    background-color: var(--paper-deep);
  }

  & .profile-main {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  & .profile-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border: 1px solid var(--ink);
    border-radius: 50%;
    font-family: var(--font-display);
    font-size: 26px;
  }

  & .profile-name {
    margin: 0;
    color: var(--ink);
    font-family: var(--font-display);
    font-size: clamp(20px, 2.2vw, 26px);
  }

  & .profile-email {
    margin: 4px 0 0;
    color: var(--grey-color);
    font-size: 12px;
  }

  & .profile-links {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;

    & button {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      padding: 16px;
      border: 1px solid var(--line-strong);
      background-color: transparent;
      color: var(--ink);
      text-align: left;
      cursor: pointer;
      transition:
        border-color 0.2s ease,
        background-color 0.2s ease;

      &:hover {
        border-color: var(--ink);
        background-color: var(--surface);
      }

      & span {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      & b {
        color: var(--grey-color);
        font-size: 12px;
        font-weight: 500;
      }
    }
  }

  & .orders {
    display: flex;
    flex-direction: column;
  }

  & .orders-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 16px;
    padding-bottom: 18px;
    border-bottom: 1px solid var(--line-strong);

    & h2 {
      margin: 0;
      font-size: clamp(24px, 2.6vw, 32px);
    }

    & span {
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
  }

  & .orders-list {
    display: flex;
    flex-direction: column;
  }

  & .order {
    display: grid;
    grid-template-columns: 1.2fr 1fr 0.9fr 0.8fr;
    gap: 20px;
    align-items: center;
    padding: 22px 0;
    border-bottom: 1px solid var(--line);

    & p {
      margin: 0 0 4px;
      color: var(--grey-color);
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
    }

    & b {
      color: var(--ink);
      font-size: 14px;
      font-weight: 500;
    }
  }

  & .order-number b {
    font-family: var(--font-display);
    font-size: 19px;
    font-weight: 400;
  }

  & .order-total {
    text-align: right;
  }

  & .status {
    display: inline-flex;
    padding: 5px 10px;
    border: 1px solid var(--line-strong);
    color: var(--ink-soft);
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  & .status-completed {
    border-color: var(--ink);
    color: var(--ink);
  }

  & .status-created {
    border-color: var(--red-color);
    color: var(--red-color);
  }

  & .empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 24px;
    padding: clamp(28px, 4vw, 52px);
    background-color: var(--paper-deep);
  }

  & .empty p {
    max-width: 460px;
    margin: 0;
    font-family: var(--font-display);
    font-size: clamp(20px, 2.4vw, 28px);
    line-height: 1.3;
    color: var(--ink);
  }

  @media (max-width: 992px) {
    & .profile {
      grid-template-columns: 1fr;
      align-items: stretch;
    }

    & .order {
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    & .order-total {
      text-align: left;
    }
  }

  @media (max-width: 576px) {
    & .profile-links {
      grid-template-columns: 1fr;
    }

    & .order {
      grid-template-columns: 1fr;
      gap: 12px;
    }
  }
`,Ft=({className:i,products:t,currentCategory:s,setOpenModal:a,setProductId:r})=>{const n=I();return e.jsx("div",{className:i,children:e.jsx("div",{className:"table-wrapper",children:e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Фото"}),e.jsx("th",{children:"Название"}),e.jsx("th",{children:"Цена"}),e.jsx("th",{children:"Категория"}),e.jsx("th",{children:"Размеры"}),e.jsx("th",{children:"Рейтинг"}),e.jsx("th",{children:"Действия"})]})}),e.jsxs("tbody",{children:[t.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:"7",className:"empty",children:"Товары не найдены"})}),t.map(c=>e.jsxs("tr",{children:[e.jsx("td",{"data-label":"Фото",children:e.jsx("img",{src:c.images[0],alt:c.name,loading:"lazy"})}),e.jsx("td",{"data-label":"Название",children:e.jsxs("div",{className:"name",children:[e.jsx("span",{children:c.name}),e.jsxs("small",{children:["ID: ",c.id]})]})}),e.jsxs("td",{"data-label":"Цена",children:[c.price," руб."]}),e.jsx("td",{"data-label":"Категория",children:s(c)}),e.jsx("td",{"data-label":"Размеры",children:e.jsx("div",{className:"sizes",children:Object.entries(c.sizes).map(([o,d])=>e.jsxs("span",{children:[o,": ",d]},`${c.id}-${o}`))})}),e.jsx("td",{"data-label":"Рейтинг",children:Math.floor(c.rating?.overallRating)||"Нет рейтинга"}),e.jsx("td",{"data-label":"Действия",children:e.jsxs("div",{className:"actions",children:[e.jsxs("button",{type:"button",onClick:()=>n(`/admin-panel/edit-product/${c.id}`),children:[e.jsx(y,{id:"edit"}),"Редактировать"]}),e.jsxs("button",{type:"button",className:"danger",onClick:()=>{r(c.id),a(!0)},children:[e.jsx(y,{id:"trash"}),"Удалить"]})]})})]},c.id))]})]})})})},qt=j(Ft)`
  width: 100%;

  .table-wrapper {
    width: 100%;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;
    min-width: 900px;
  }

  thead {
    background: #f3f4f6;
    text-transform: uppercase;
    font-size: 12px;
    letter-spacing: 0.05em;
    color: #6b7280;
  }

  th,
  td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  }

  tbody tr:hover {
    background: rgba(126, 94, 240, 0.04);
  }

  img {
    width: 72px;
    height: 96px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 6px 15px rgba(15, 23, 42, 0.2);
  }

  .name span {
    display: block;
    font-weight: 600;
  }

  .name small {
    color: #94a3b8;
  }

  .sizes {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .sizes span {
    background: #eef2ff;
    color: #4338ca;
    border-radius: 999px;
    padding: 4px 10px;
    font-size: 12px;
  }

  .actions {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .actions button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-radius: 999px;
    border: 1px solid rgba(15, 23, 42, 0.15);
    padding: 8px 18px;
    color: #0f172a;
    background: transparent;
    cursor: pointer;
    transition: all 0.2s ease;
    font-weight: 600;
  }

  .actions button:hover {
    border-color: var(--purple-color);
    color: var(--purple-color);
  }

  .actions .danger {
    border-color: rgba(248, 113, 113, 0.6);
    color: #b91c1c;
  }

  .empty {
    text-align: center;
    padding: 40px;
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead {
      display: none;
    }

    tbody tr {
      margin-bottom: 16px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 16px;
      padding: 12px;
    }

    td {
      padding: 8px 0;
      border: none;
    }

    td::before {
      content: attr(data-label);
      display: block;
      font-size: 12px;
      color: #9ca3af;
      text-transform: uppercase;
      margin-bottom: 4px;
    }

    .actions {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`,Vt=({className:i})=>{const[t,s]=g.useState(!0),a=I(),r=w(K),n=w(G),[c,o]=g.useState(!1),[d,u]=g.useState(""),[l,p]=g.useState(""),h=v=>{const k=n.find($=>$.id===v.categoryId);return k?k.name:""},x=g.useMemo(()=>l?r.filter(v=>v.name.toLowerCase().includes(l.toLowerCase())):r,[r,l]),f=[{label:"Товаров",value:r.length},{label:"Категорий",value:n.length},{label:"Отфильтровано",value:x.length}];return e.jsx("div",{className:i,children:e.jsxs(e.Fragment,{children:[c&&e.jsx(ze,{productId:d,setOpenModal:o,children:"Вы действительно хотите удалить товар ?"}),e.jsxs("header",{className:"admin-header",children:[e.jsxs("div",{children:[e.jsx("p",{children:"Holly Admin Panel"}),e.jsx("h1",{children:"Панель администратора"})]}),e.jsx("div",{className:"stats",children:f.map(v=>e.jsxs("div",{children:[e.jsx("span",{children:v.label}),e.jsx("strong",{children:v.value})]},v.label))})]}),e.jsxs("div",{className:"toolbar",children:[e.jsxs("div",{className:"search",children:[e.jsx("input",{type:"text",placeholder:"Искать по названию...",value:l,onChange:v=>p(v.target.value)}),e.jsx(y,{id:"search"})]}),e.jsxs("div",{className:"buttons-add",children:[e.jsx(C,{onClick:()=>a("/admin-panel/add-product"),children:"Добавить товар"}),e.jsx(C,{onClick:()=>a("/admin-panel/edit-params"),children:"Добавить параметры"}),e.jsx(C,{onClick:()=>a("/admin-panel/users-orders"),children:"Заказы пользователей"})]})]}),e.jsxs("div",{className:"products",children:[e.jsxs("div",{className:"header-section",onClick:()=>s(!t),children:[e.jsxs("h2",{children:["Список товаров"," ",e.jsxs("span",{children:["(",x.length,"/",r.length,")"]})]}),e.jsx(y,{id:t?"angle-up":"angle-down"})]}),t&&e.jsx(qt,{productsOpen:t,products:x,currentCategory:h,setOpenModal:o,setProductId:u})]}),e.jsx("div",{})]})})},Ei=j(Vt)`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .admin-header {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 16px;

    h1 {
      margin: 4px 0 0;
    }

    p {
      margin: 0;
      color: #9ca3af;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-size: 12px;
    }

    .stats {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;

      div {
        background: #fff;
        border-radius: 12px;
        padding: 12px 16px;
        min-width: 140px;
        box-shadow: var(--box-shadow);
        border: 1px solid rgba(15, 23, 42, 0.05);

        span {
          font-size: 12px;
          color: #6b7280;
        }

        strong {
          display: block;
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }

  .toolbar {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    align-items: center;
    justify-content: space-between;
  }

  .search {
    flex: 1 1 280px;
    position: relative;
    display: flex;
    align-items: center;

    input {
      width: 100%;
      border-radius: 999px;
      border: 1px solid rgba(148, 163, 184, 0.6);
      padding: 12px 48px 12px 20px;
      font-size: 15px;
      outline: none;

      &:focus {
        border-color: var(--purple-color);
        box-shadow: 0 0 0 3px rgba(126, 94, 240, 0.1);
      }
    }

    i {
      position: absolute;
      right: 18px;
      color: #94a3b8;
    }
  }

  .buttons-add {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;

    button {
      min-width: 180px;
    }
  }

  .products {
    width: 100%;
    background: #fff;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 25px 45px rgba(15, 23, 42, 0.08);
    border: 1px solid rgba(15, 23, 42, 0.05);
  }

  & .header-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    cursor: pointer;

    h2 {
      margin: 0;
      font-size: 20px;

      span {
        font-size: 16px;
        color: #9ca3af;
      }
    }
  }

  @media (max-width: 768px) {
    .admin-header {
      flex-direction: column;
    }

    .toolbar {
      flex-direction: column;
      align-items: stretch;
    }

    .products {
      padding: 16px;
    }
  }
`,Jt=(i,t)=>({type:P.UPDATE_PRODUCT,payload:{id:i,updatedProduct:t}}),Gt=(i,t)=>async s=>{try{const{name:a,description:r,price:n,image:c,sizes:o,categoty:d,season:u,sale:l}=t,p=await fetch(`${A}/products/${i}`).then(f=>f.json());if(!p)throw new Error("Товар не найден");const h=await fetch(`${A}/products/${i}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({...p,name:a||p.name,description:r||p.description,price:n||p.price,images:c||p.images,sizes:o||p.sizes,category_id:d||p.category_id,season_id:u||p.season_id,sale:l===""?null:l||p.sale})});if(!h.ok)throw new Error(`Ошибка запроса: ${h.status}`);const x=await h.json();if(!x)throw new Error("Товар не найден");s(Jt(i,x.data))}catch(a){throw new Error(a.message)}},Yt=({className:i,name:t,setName:s,description:a,setDescription:r,price:n,setPrice:c,image:o,setImage:d,imageUrl:u,setImageUtl:l,sale:p,setSale:h})=>{const x=()=>{u?(d([...o,u]),l(""),_("Изображение добавлено")):R("Введите ссылку на изображение")};return e.jsx("div",{className:i,children:e.jsxs("div",{className:"info",children:[e.jsx("h3",{children:"Введите информацию о товаре"}),e.jsx(F,{value:t,onChange:f=>s(f.target.value),children:"Название"}),e.jsx(F,{value:a,onChange:f=>r(f.target.value),children:" Описание"}),e.jsx(F,{value:n,onChange:f=>c(f.target.value),children:" Цена"}),e.jsx(F,{value:p,onChange:f=>h(f.target.value),children:" Скидка в процентах"}),e.jsx(F,{value:u,onChange:f=>l(f.target.value),children:"Ссылка на изображение"}),e.jsx(C,{width:"300px",onClick:x,children:"Добавить изоображение"}),e.jsx("div",{className:"images",children:o&&o.map(f=>e.jsxs("div",{className:"image",children:[e.jsx(y,{id:"trash",color:"#0c0c0cff",size:"25",onClick:()=>{d(o.filter(v=>v!==f))}}),e.jsx("img",{src:f,alt:""})]},f))})]})})},Wt=j(Yt)`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap:30px;   

& .images {
    display: flex;
    position: relative;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: start;
    align-items: start;
    max-width: 650px;
    gap: 10px;
    

    & .image{
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;
        & img{
        width: 210px;
        height: 300px;
        border-radius: 10px;
    }
    & i {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    }
    }
}

.info{
        display: flex;
        flex-direction: column;
        align-items: start;
        gap: 40px;
        border: 1px solid #ccccccff;
        border-radius: 10px;
        padding: 30px;
        width: 100%;

        & h3{
            margin: 10px;
            color: #868585ff;
            font-size: 20px;
        }
    }
`,Bt=({className:i,setSizes:t,sizes:s})=>{const[a,r]=g.useState(""),[n,c]=g.useState(""),o=()=>{if(!a||!n){R("Заполните все поля");return}t({...s,[a]:n}),r(""),c(""),_("Размер добавлен")},d=u=>{const l={...s};delete l[u],t(l),r(""),c(""),_("Размер удален")};return e.jsx("div",{className:i,children:e.jsxs("div",{className:"container-sizes",children:[e.jsx("h3",{children:"Укажите размеры"}),e.jsxs("div",{className:"sizes",children:[e.jsx(F,{value:a,onChange:u=>r(u.target.value),children:"Размер"}),e.jsx(F,{value:n,onChange:u=>c(u.target.value),children:"Количество"})]}),e.jsx(C,{onClick:o,children:"Добавить"}),Object.entries(s).map(([u,l])=>e.jsxs("div",{className:"sizes-info",children:[e.jsxs("p",{children:["Размер: ",u]}),e.jsxs("p",{children:["Количество: ",l]}),e.jsx(y,{id:"trash",onClick:()=>d(u)})]},u))]})})},Ht=j(Bt)`
display: flex;
flex-direction: column;
justify-content: start;
align-items: start;
gap:30px;  
margin-bottom: 30px;
width: 100%;

& .sizes{
    display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 10px;
}
& .sizes-info{
display: flex;
flex-direction: row;
justify-content: start;
align-items: start;
gap: 30px;
border-bottom: 1px solid #ccccccff;

& p{
    margin: 0;
    width: 155px;
}
}
.container-sizes{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        justify-content: start;
        align-items: start;
        gap: 40px;
        border: 1px solid #ccccccff;
        border-radius: 10px;
        padding: 30px;
        width: 100%;

        & h3{
            margin: 10px;
            color: #868585ff;
            font-size: 20px;
        }
    }
`,Xt=({className:i,children:t,selectItems:s,selectValue:a,selectFunc:r})=>e.jsxs("div",{className:i,children:[`${t} :`,e.jsxs("select",{name:"",id:"",value:a,onChange:n=>r(n.target.value),children:[e.jsx("option",{value:"",children:t==="Категория"?"Выберите категорию":"Выберите сезон"}),s.map(n=>e.jsx("option",{value:n.id,children:n.name}))]})]}),oe=j(Xt)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 10px;
  width: 100%;
  margin: 0 auto;

  & select {
    width: 100%;
    max-width: 300px;
    height: 35px;
    border-radius: 10px;
    border: 1px solid #ccccccff;
    padding: 0px 10px;
    font-size: 15px;
  }
`,Kt=({className:i,categories:t,category:s,setCategory:a,seasons:r,season:n,setSeason:c})=>{const o=T();return g.useEffect(()=>{o(Se()),o(Pe())},[o]),e.jsx("div",{className:i,children:e.jsxs("div",{className:"lables",children:[e.jsx(oe,{selectItems:t,selectValue:s,selectFunc:a,children:"Категория"}),e.jsx(oe,{selectItems:r,selectValue:n,selectFunc:c,children:"Сезон"})]})})},Zt=j(Kt)`
display: flex;
flex-direction: row;
justify-content: start;
align-items: start;
gap:30px;  
margin-bottom: 30px;
& .lables {
display: flex;
flex-direction: row;
justify-content: center;
align-items: start;
border: 1px solid #ccccccff;
gap: 10px;
padding: 30px;
border-radius: 10px;
font-size: 20px;
color: #868585ff;
font-weight: 700;
 & select {
    width: 190px;
    height: 35px;
    border-radius: 10px;
    border: 1px solid #ccccccff;
    padding: 0px 10px;
    font-size: 15px;
}
}
`,Qt=({className:i,children:t,name:s,setName:a,description:r,setDescription:n,price:c,setPrice:o,image:d,setImage:u,sizes:l,setSizes:p,category:h,setCategory:x,season:f,setSeason:v,sale:k,setSale:$})=>{const N=w(G),z=w(se),[m,b]=g.useState("");return e.jsxs("div",{className:i,children:[e.jsx("h1",{children:t}),e.jsxs("div",{className:"container",children:[e.jsx("div",{className:"inputs",children:e.jsx(Wt,{name:s,setName:a,description:r,setDescription:n,price:c,setPrice:o,image:d,setImage:u,imageUrl:m,setImageUtl:b,sale:k,setSale:$})}),e.jsxs("div",{children:[e.jsx("div",{className:"product-sizes",children:e.jsx(Ht,{setSizes:p,sizes:l})}),e.jsx("div",{className:"selects",children:e.jsx(Zt,{categories:N,category:h,setCategory:x,seasons:z,season:f,setSeason:v})})]})]})]})},Ne=j(Qt)`
  & .container {
    width: 1300px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    gap: 50px;
  }

  & .selects {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    gap: 20px;
  }
  & .product-prewiew {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: end;
    width: 270px;
    height: 541px;

    & img {
      width: 270px;
      height: 400px;
      object-fit: cover;
      border-radius: 10px;
      transition: all ease-in 0.5s;
      &:hover {
        transform: scale(0.9);
        transition: all ease 0.5s;
      }
    }
    & h2 {
      margin: 10px 0;
      font-size: 16px;
      font-weight: 500;
    }
    & p {
      margin: 5px 0;
    }
  }
`,ei=({className:i})=>{const t=re(),s=w(U=>U.products.products.find(J=>J.id===t.id)),a=T(),r=I(),[n,c]=g.useState(s.name),[o,d]=g.useState(s.description),[u,l]=g.useState(s.categoryId),[p,h]=g.useState(s.seasonId),[x,f]=g.useState(s.price),[v,k]=g.useState(s.sizes),[$,N]=g.useState(s.images),[z,m]=g.useState(s.sale);if(!s)return e.jsx("h1",{children:"Товар не найден"});const b={id:s.id,name:n,description:o,price:x,category:u,season:p,sizes:v,image:$,sale:z},S=()=>{try{a(Gt(s.id,b))}catch(U){R(U.message)}r("/admin-panel")};return e.jsxs("div",{className:i,children:[e.jsx(Ne,{name:n,product:s,setName:c,description:o,setDescription:d,price:x,setPrice:f,category:u,setCategory:l,season:p,setSeason:h,sizes:v,setSizes:k,image:$,setImage:N,sale:z,setSale:m,children:`Изменения товара ${s.name}`}),e.jsx("div",{className:"button-save",children:e.jsx(C,{width:"300px",onClick:S,children:"Сохранить изменения"})})]})},$i=j(ei)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  gap: 20px;
  margin: 50px 0 0 0;

  & .button-save {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: end;
    width: 100%;
    padding: 10px;
    margin: 0 0 50px 0;
  }
`,ti=i=>({type:P.ADD_PRODUCT,payload:i}),ii=(i,t,s,a,r,n,c)=>async o=>{console.log(n,"season",r,"category");const u=await(await fetch("http://localhost:3005/products",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({category_id:r,images:a,name:i,description:t,price:s,sizes:c,rating:{overallRating:0,users:[]},season_id:n,sale:null})})).json();o(ti(u.data))},si=({className:i})=>{const t=T(),s=I(),[a,r]=g.useState({}),[n,c]=g.useState(""),[o,d]=g.useState(""),[u,l]=g.useState(""),[p,h]=g.useState(""),[x,f]=g.useState(""),[v,k]=g.useState([]),$=()=>{if(!`${n}`||!o||!`${u}`||!`${p}`||!`${x}`||!`${v}`){R("Заполните все поля");return}t(ii(u,p,x,v,n,o,a)),s("/admin-panel")};return e.jsxs("div",{className:i,children:[e.jsx(Ne,{name:u,setName:l,description:p,setDescription:h,price:x,setPrice:f,image:v,setImage:k,sizes:a,setSizes:r,category:n,setCategory:c,season:o,setSeason:d,children:"Добавление товара"}),e.jsx("div",{children:e.jsx(C,{width:"300px",onClick:$,children:"Добавить товар"})})]})},Ii=j(si)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  gap: 20px;
  width: 100%;
  margin: 50px 0 0 0;
`,ri=i=>({type:P.ADD_CATEGORY,payload:i}),ai=i=>async t=>{try{const s=await fetch(`${A}/categories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i})});if(!s.ok)throw new Error(`Ошибка запроса: ${s.status}`);const a=await s.json();if(!a)throw new Error("Категория не найдена");t(ri(a))}catch(s){console.error(s)}},ni=i=>({type:P.REMOVE_CATEGORY,payload:i}),oi=i=>async t=>{await fetch(`http://localhost:3005/categories/${i}`,{method:"DELETE",headers:{"Content-Type":"application/json"}}),t(ni(i))},ci=i=>({type:P.REMOVE_SEASON,payload:i}),li=i=>async t=>{try{const s=await fetch(`${A}/seasons/${i}`,{method:"DELETE"});if(!s.ok)throw new Error(`Ошибка запроса: ${s.status}`);t(ci(i))}catch(s){console.error(s)}},di=i=>({type:P.ADD_SEASON,payload:i}),pi=i=>async t=>{try{const s=await fetch(`${A}/seasons`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i})});if(!s.ok)throw new Error(`Ошибка запроса: ${s.status}`);const a=await s.json();if(!a)throw new Error("Сезон не найден");t(di(a))}catch(s){console.error(s)}},xi=({className:i,params:t,deleteFunc:s,type:a})=>{const r=T();return e.jsxs("div",{className:i,children:[e.jsx("h2",{children:a==="category"?"Категории":"Сезоны"}),t.map(n=>e.jsxs("div",{className:"category",children:[e.jsx("p",{children:n.name}),e.jsx(y,{id:"trash",onClick:()=>r(s(n.id))})]},n.id))]})},ce=j(xi)`
        width: 100%;
        height: auto;
        min-height: 500px;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 10px;
        border: 1px solid #ccccccff;
        border-radius: 10px;
        padding: 20px 10px;
        & i {
        cursor: pointer;}
  & .category{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    gap: 20px;
    margin: 10px 0 0 0;
    border-bottom: 1px solid #ccccccff;
    
    & p{
        width: 200px;
    }
}   
& .edit-params-name{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0 0 0;
}       
`,mi=({className:i,inputValue:t,setInputValue:s,postFunc:a,text:r})=>{const n=T();return e.jsxs("div",{className:i,children:[e.jsx(D,{value:t,onChange:c=>{s(c.target.value)},text:`Название ${r}`}),e.jsx(C,{onClick:()=>{if(t)s(""),n(a(t));else{alert("Введите название ");return}},width:"200px",children:"Добавить категорию"})]})},le=j(mi)`
display: flex;
    width: 400px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    border: 1px solid #ccccccff;
    border-radius: 10px;
    padding: 10px;      
`,hi=({className:i})=>{const t=w(se),s=w(G),[a,r]=g.useState(""),[n,c]=g.useState("");return e.jsxs("div",{className:i,children:[e.jsx("h1",{children:"Редактирование параметров"}),e.jsxs("div",{className:"container",children:[e.jsx(ce,{params:s,type:"category",deleteFunc:oi}),e.jsx(ce,{params:t,type:"season",deleteFunc:li}),e.jsxs("div",{className:"add-params-block",children:[e.jsx(le,{postFunc:ai,inputValue:a,setInputValue:r,text:"новой категории"}),e.jsx(le,{postFunc:pi,inputValue:n,setInputValue:c,text:"нового сезона"})]})]})]})},Oi=j(hi)`
  width: 1600px;
  padding: 40px;

  & .add-params-block {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  & .container {
    margin-top: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: start;
    gap: 20px;
  }
`,gi=i=>({type:P.SET_USER_ORDERS,payload:i}),ui=()=>async i=>{try{const t=await fetch(`${A}/orders`);if(!t.ok)throw new Error(`Ошибка запроса: ${t.status}`);const s=await t.json();if(!s)throw new Error("Заказы не найдены");i(gi(s.orders))}catch(t){console.error(t)}},fi=({className:i})=>{const t=T();g.useEffect(()=>{t(ui())},[]);const s=w(xe);return console.log(s,"orders"),e.jsxs("div",{className:i,children:[e.jsx("div",{className:"title",children:e.jsx("h2",{children:"Заказы пользователей"})}),e.jsxs("table",{className:"orders-table",children:[e.jsxs("tr",{children:[e.jsx("th",{children:"Номер заказа"}),e.jsx("th",{children:"Статус"}),e.jsx("th",{children:"Имя"}),e.jsx("th",{children:"Почта"}),e.jsx("th",{children:"Телефон"}),e.jsx("th",{children:"Способ доставки"}),e.jsx("th",{children:"Адрес доставки"}),e.jsx("th",{children:"Дата создания"})]}),s.map(a=>e.jsxs("tr",{children:[e.jsx("td",{children:a.orderNum}),e.jsxs("td",{children:[a.status==="created"?"Создан":"Выполнен",e.jsx(y,{id:a.status==="created"?"clock-o":"check",color:a.status==="created"?"#c0c0c0":"green"})]}),e.jsx("td",{children:a.userName}),e.jsx("td",{children:a.userEmail}),e.jsx("td",{children:a.userPhone}),e.jsx("td",{children:a.deliveryMethod}),e.jsx("td",{children:a.deliveryAddress}),e.jsx("td",{children:a.createdAt.split("T")[0].split("-").reverse().join(".")})]}))]})]})},Ti=j(fi)`
  width: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  gap: 10px;
  border-radius: 10px;

  & .orders-table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #ccccccff;
    margin-top: 30px;
    & th {
      padding: 40px;
      border: 1px solid #ccccccff;
    }
    & td {
      padding: 10px;
      border: 1px solid #ccccccff;
      text-align: center;
    }
  }
`,vi=({className:i})=>{const t=I();return e.jsxs("div",{className:i,children:[e.jsx("p",{className:"eyebrow",children:"Ошибка 404"}),e.jsxs("h1",{children:["Страница",e.jsx("br",{}),"не найдена"]}),e.jsx("p",{className:"text",children:"Возможно, вещь уже разобрали или ссылка устарела. Вернитесь в каталог — там всё на месте."}),e.jsxs("div",{className:"actions",children:[e.jsx(C,{width:"240px",onClick:()=>t("/catalog"),children:"В каталог"}),e.jsx(C,{width:"200px",variant:"ghost",onClick:()=>t("/"),children:"На главную"})]})]})},Ai=j(vi)`
  width: var(--page-width);
  margin: 0 auto;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;

  & .eyebrow {
    margin: 0;
  }

  & h1 {
    margin: 0;
    font-size: clamp(48px, 8vw, 108px);
    line-height: 1;
  }

  & .text {
    max-width: 420px;
    margin: 0;
    font-size: 14px;
    line-height: 1.7;
    color: var(--grey-color);
  }

  & .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 12px;
  }
`;export{Ni as AboutUs,le as AddParams,Ii as AddProduct,Ei as AdminPanel,Ci as Cart,yi as Catalog,ki as Delivery,Oi as EditParams,$i as EditProduct,Si as Favorites,bi as Main,Ai as NotFound,zi as Order,ce as Params,wi as Product,Pi as UserCabinet,Ti as UsersOrders};

(() => {
  'use strict';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const dimensions=new Map();
  async function load(config){await Promise.all([...new Set([...config.photos,...config.germanyPhotos].filter(Boolean))].map(async src=>{if(dimensions.has(src))return;const image=new Image();image.src=src;await image.decode();dimensions.set(src,image.naturalWidth/image.naturalHeight);}));}
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  function markup(photos){
    return `<section class="photo-deck" aria-label="Photograph viewer"><h2 class="visually-hidden">Our photographs.</h2>${photos.map((p,i)=>`<article class="photo-card" ${i?'hidden':''} data-photo-index="${i}" data-side="front"><div class="photo-turn"><div class="photo-front"><button class="reader-photo photo-image-button polaroid-frame" data-photo-action="flip" aria-label="Read the back of photograph${p.date?' from '+esc(p.date):''}"><span class="polaroid-image"><img src="${esc(p.src)}" alt="Our photograph${p.date?' · '+esc(p.date):''}" decoding="sync"></span>${p.date?`<span class="reader-photo-date polaroid-caption">${esc(p.date)}</span>`:''}</button></div><div class="photo-back" hidden inert><p class="photo-back-date">${esc(p.date||'A moment with you')}</p><div class="photo-writing" tabindex="0" role="region" aria-label="The story behind this photograph">${String(p.caption||'').split(/\n\s*\n/).map(t=>`<p>${esc(t).replace(/\n/g,'<br>')}</p>`).join('')}</div></div></div></article>`).join('')}<div class="photo-tools"><button data-photo-action="flip">Read the back</button></div>${photos.length>1?`<nav class="photo-navigation" aria-label="Choose a photograph"><button data-photo-action="previous" aria-label="Previous photograph">←</button><span class="photo-count" aria-live="polite">1 / ${photos.length}</span><button data-photo-action="next" aria-label="Next photograph">→</button></nav>`:''}<p class="photo-status visually-hidden" role="status" aria-live="polite"></p></section>`;
  }
  function mount(dialog,source){
    const deck=dialog.querySelector('.photo-deck');if(!deck)return()=>{};
    const controller=new AbortController(),signal=controller.signal,cards=[...deck.querySelectorAll('.photo-card')],flip=deck.querySelector('.photo-tools [data-photo-action="flip"]');
    let index=0,busy=false,disposed=false,animations=[];
    const card=()=>cards[index];
    function stop(){animations.forEach(a=>a.cancel());animations=[];busy=false;deck.removeAttribute('aria-busy');}
    function front(c){c.dataset.side='front';c.querySelector('.photo-front').hidden=false;c.querySelector('.photo-front').inert=false;c.querySelector('.photo-back').hidden=true;c.querySelector('.photo-back').inert=true;c.querySelector('.photo-turn').style.transform='';}
    function sync(){flip.textContent=card().dataset.side==='front'?'Read the back':'Back to photo';const count=deck.querySelector('.photo-count');if(count)count.textContent=`${index+1} / ${cards.length}`;}
    async function turn(){
      if(busy||dialog.dataset.readerState!=='reading')return;
      busy=true;deck.setAttribute('aria-busy','true');const c=card(),back=c.dataset.side==='front',out=c.querySelector(back?'.photo-front':'.photo-back'),into=c.querySelector(back?'.photo-back':'.photo-front'),surface=c.querySelector('.photo-turn');
      const animate=async(frames,ms)=>{const a=surface.animate(frames,{duration:ms,easing:'cubic-bezier(.32,0,.2,1)',fill:'forwards'});animations.push(a);await a.finished;};
      try{
        if(!reduced())await animate([{transform:'perspective(1100px) rotateY(0deg)'},{transform:`perspective(1100px) rotateY(${back?-90:90}deg)`}],275);
        if(disposed)return;out.hidden=true;out.inert=true;into.hidden=false;into.inert=false;c.dataset.side=back?'back':'front';sync();
        if(!reduced())await animate([{transform:`perspective(1100px) rotateY(${back?90:-90}deg)`},{transform:'perspective(1100px) rotateY(0deg)'}],275);
        surface.style.transform='';animations.forEach(a=>a.cancel());animations=[];deck.querySelector('.photo-status').textContent=back?'Back of photograph.':'Front of photograph.';
      }catch{}finally{busy=false;deck.removeAttribute('aria-busy');}
    }
    deck.addEventListener('click',e=>{
      const action=e.target.closest('[data-photo-action]')?.dataset.photoAction;if(!action||busy)return;
      if(action==='flip')void turn();else if(dialog.dataset.readerState==='reading'){
        front(card());card().hidden=true;index=(index+(action==='next'?1:-1)+cards.length)%cards.length;front(card());card().hidden=false;sync();deck.querySelector('.photo-status').textContent=`Photograph ${index+1} of ${cards.length}.`;
      }
    },{signal});
    const sourceFrame=source?.closest(".polaroid-frame"),label=sourceFrame?.querySelector(".polaroid-caption");if(label)cards[0].querySelector(".polaroid-caption").textContent=[...label.children].length?[...label.children].map(n=>n.textContent.trim()).join(" · "):label.textContent.replace(/\s+/g," ").trim();
    prepare(deck);
    function fit(){for(const c of cards){const frame=c.querySelector('.polaroid-frame'),image=frame.querySelector('img'),r=ratio(image),height=Math.max(180,Math.min(innerHeight*.65,innerHeight*.85-(cards.length>1?178:132))),width=Math.min(innerWidth-72,390,height*r);Object.assign(c.querySelector('.photo-turn').style,{width:width+'px',height:width/r+'px'});}}
    fit();window.addEventListener('resize',fit,{signal});
    sync();return()=>{disposed=true;controller.abort();stop();cards.forEach(front);};
  }
  function ratio(image){return 1/(.9/(image.naturalWidth/image.naturalHeight||dimensions.get(image.dataset.preparedSrc||image.getAttribute('src'))||.5625)+.33);}
  function prepare(root){root.querySelectorAll('.polaroid-frame').forEach(frame=>{const image=frame.querySelector('img');if(!image)return;const set=()=>{const r=ratio(image);frame.style.setProperty('--polaroid-ratio',r);frame.style.setProperty('--polaroid-top',(.05*r*100)+'%');frame.style.setProperty('--polaroid-bottom',(.28*r*100)+'%');};set();if(!image.complete)image.addEventListener('load',set,{once:true});});}
  window.ScrapbookPhotoCards={markup,mount,prepare,load};
})();

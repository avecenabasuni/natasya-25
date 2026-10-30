(() => {
  'use strict';
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  function markup(photos){
    return `<section class="photo-deck" aria-label="Photograph viewer"><h2 class="visually-hidden">Our photographs.</h2>${photos.map((p,i)=>`<article class="photo-card" ${i?'hidden':''} data-photo-index="${i}" data-side="front"><div class="photo-turn"><div class="photo-front"><button class="reader-photo photo-image-button" data-photo-action="zoom" aria-label="Enlarge photograph${p.date?' from '+esc(p.date):''}"><img src="${esc(p.src)}" alt="Our photograph${p.date?' · '+esc(p.date):''}" decoding="sync">${p.date?`<span class="reader-photo-date">${esc(p.date)}</span>`:''}</button></div><div class="photo-back" hidden inert><p class="photo-back-date">${esc(p.date||'A moment with you')}</p><div class="photo-writing" tabindex="0" role="region" aria-label="The story behind this photograph">${String(p.caption||'').split(/\n\s*\n/).map(t=>`<p>${esc(t).replace(/\n/g,'<br>')}</p>`).join('')}</div></div></div></article>`).join('')}<div class="photo-tools"><button data-photo-action="flip">Read the back</button><button data-photo-action="zoom">Enlarge photo</button></div>${photos.length>1?`<nav class="photo-navigation" aria-label="Choose a photograph"><button data-photo-action="previous" aria-label="Previous photograph">←</button><span class="photo-count" aria-live="polite">1 / ${photos.length}</span><button data-photo-action="next" aria-label="Next photograph">→</button></nav>`:''}<p class="photo-status visually-hidden" role="status" aria-live="polite"></p></section>`;
  }
  function mount(dialog){
    const deck=dialog.querySelector('.photo-deck');if(!deck)return()=>{};
    const controller=new AbortController(),signal=controller.signal,cards=[...deck.querySelectorAll('.photo-card')],flip=deck.querySelector('[data-photo-action="flip"]');
    let index=0,busy=false,disposed=false,animations=[],zoom=null;
    const card=()=>cards[index];
    function stop(){animations.forEach(a=>a.cancel());animations=[];busy=false;deck.removeAttribute('aria-busy');}
    function front(c){c.dataset.side='front';c.querySelector('.photo-front').hidden=false;c.querySelector('.photo-front').inert=false;c.querySelector('.photo-back').hidden=true;c.querySelector('.photo-back').inert=true;c.querySelector('.photo-turn').style.transform='';}
    function sync(){flip.textContent=card().dataset.side==='front'?'Read the back':'Back to photo';deck.querySelector('.photo-tools [data-photo-action="zoom"]').hidden=card().dataset.side!=='front';const count=deck.querySelector('.photo-count');if(count)count.textContent=`${index+1} / ${cards.length}`;}
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
    function closeZoom(){if(!zoom)return;const z=zoom;zoom=null;window.ScrapbookModalLock.close(z);z.remove();if(!disposed)card().querySelector('[data-photo-action="zoom"]').focus({preventScroll:true});}
    function enlarge(){
      if(zoom||busy||card().dataset.side!=='front'||dialog.dataset.readerState!=='reading')return;
      const img=card().querySelector('img'),z=document.createElement('dialog');z.className='photo-zoom';z.setAttribute('aria-label','Full photograph');
      z.innerHTML='<div class="photo-zoom-toolbar"><button data-zoom="close">Back to photo</button><button data-zoom="in">Zoom in</button><button data-zoom="reset">Reset zoom</button></div><div class="photo-zoom-stage" role="img" aria-label="Pinch to zoom and drag to explore the photograph"><img draggable="false" alt=""></div><p class="photo-zoom-hint">Pinch or double-tap to zoom</p>';
      z.querySelector('img').src=img.currentSrc||img.src;document.body.append(z);zoom=z;z.showModal();window.ScrapbookModalLock.acquire();z.querySelector('[data-zoom="close"]').focus();
      const stage=z.querySelector('.photo-zoom-stage'),image=z.querySelector('img'),points=new Map();let scale=1,x=0,y=0,previous=null,lastTap=0,moved=false;
      const clamp=(v,n)=>Math.max(-n,Math.min(n,v));
      function paint(){const ratio=Math.min(stage.clientWidth/img.naturalWidth,stage.clientHeight/img.naturalHeight),w=img.naturalWidth*ratio,h=img.naturalHeight*ratio;x=clamp(x,Math.max(0,(w*scale-stage.clientWidth)/2));y=clamp(y,Math.max(0,(h*scale-stage.clientHeight)/2));image.style.transform=`translate(${x}px,${y}px) scale(${scale})`;}
      function reset(){scale=1;x=y=0;paint();}
      function pose(){const p=[...points.values()];return p.length>1?{x:(p[0].x+p[1].x)/2,y:(p[0].y+p[1].y)/2,d:Math.hypot(p[0].x-p[1].x,p[0].y-p[1].y)}:p[0];}
      stage.addEventListener('pointerdown',e=>{stage.setPointerCapture(e.pointerId);points.set(e.pointerId,{x:e.clientX,y:e.clientY});previous=pose();moved=false;});
      stage.addEventListener('pointermove',e=>{if(!points.has(e.pointerId))return;points.set(e.pointerId,{x:e.clientX,y:e.clientY});const next=pose();if(previous){const dx=next.x-previous.x,dy=next.y-previous.y;if(Math.abs(dx)+Math.abs(dy)>2)moved=true;if(next.d&&previous.d){scale=Math.max(1,Math.min(3,scale*next.d/previous.d));moved=true;}x+=dx;y+=dy;paint();}previous=next;});
      function end(e){const wasMulti=points.size>1;points.delete(e.pointerId);previous=pose();if(e.type==='pointerup'&&!points.size&&!wasMulti&&!moved){const now=performance.now();if(now-lastTap<300){scale=scale>1?1:2;x=y=0;paint();lastTap=0;}else lastTap=now;}if(wasMulti)lastTap=0;}
      stage.addEventListener('pointerup',end);stage.addEventListener('pointercancel',end);stage.addEventListener('dblclick',e=>e.preventDefault());
      z.querySelector('[data-zoom="close"]').onclick=closeZoom;z.querySelector('[data-zoom="in"]').onclick=()=>{scale=Math.min(3,scale+1);paint();};z.querySelector('[data-zoom="reset"]').onclick=reset;z.addEventListener('cancel',e=>{e.preventDefault();closeZoom();});
      const ro=new ResizeObserver(reset);ro.observe(stage);z.addEventListener('close',()=>ro.disconnect(),{once:true});
    }
    deck.addEventListener('click',e=>{
      const action=e.target.closest('[data-photo-action]')?.dataset.photoAction;if(!action||busy)return;
      if(action==='flip')void turn();else if(action==='zoom')enlarge();else if(dialog.dataset.readerState==='reading'){
        front(card());card().hidden=true;index=(index+(action==='next'?1:-1)+cards.length)%cards.length;front(card());card().hidden=false;sync();deck.querySelector('.photo-status').textContent=`Photograph ${index+1} of ${cards.length}.`;
      }
    },{signal});
    sync();return()=>{disposed=true;controller.abort();stop();closeZoom();cards.forEach(front);};
  }
  window.ScrapbookPhotoCards={markup,mount};
})();

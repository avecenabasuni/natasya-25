/* One paper corner introduces the existing touch affordance, once per leaf. */
(() => {
  'use strict';
  window.ScrapbookDiscovery={create({app,getPosition,onLift}){
    const seen=new Set(),listeners=[],media=matchMedia('(prefers-reduced-motion: reduce)');
    const choices={dedication:'map','your-world':'day-0',october:'photograph',letter:'note'};
    let pending=null,active=null,timer=0,frame=0,quietUntil=0,destroyed=false,blurred=false,count=0;
    const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
    function status(value,key=''){app.dataset.discoveryState=value;app.dataset.discoveryObject=key;}
    function candidate(){
      if(destroyed||blurred||media.matches||document.hidden||document.querySelector('dialog[open]'))return null;
      const position=getPosition(),film=app.querySelector('.book-film');
      if(!position||position.kind!=='read'||position.navigation||position.touchHeld||position.settle||film?.dataset.assetsReady==='false')return null;
      const key=choices[position.chapter];if(!key)return null;
      const source=app.querySelector(`[data-book-object="${key}"]`);if(!source||source.closest('[inert],[aria-hidden="true"]'))return null;
      const r=source.getBoundingClientRect();if(r.width<10||r.height<10||r.bottom<50||r.top>innerHeight-44)return null;
      return {key,id:position.chapter+':'+key,source};
    }
    function stop(){
      clearTimeout(timer);timer=0;pending=null;cancelAnimationFrame(frame);frame=0;
      if(active){onLift?.({key:null,amount:0});active.target?.classList.remove('object-discovery');active.target?.style.removeProperty('--discovery-lift');active.corner?.remove();active.blank?.remove();}
      active=null;status('idle');app.removeAttribute('data-discovery-renderer');
    }
    function nativeCorner(item){
      const target=item.source.closest('.real-memory,.trier-map')||item.source.querySelector('.fragment-image')||item.source;
      const copy=target.cloneNode(true),corner=document.createElement('span'),blank=document.createElement('span');
      [copy,...copy.querySelectorAll('*')].forEach(node=>{node.removeAttribute('id');node.removeAttribute('data-book-object');node.removeAttribute('aria-labelledby');node.removeAttribute('aria-describedby');if(node.matches('button,input,select,textarea'))node.disabled=true;node.tabIndex=-1;});
      Object.assign(copy.style,{position:'absolute',inset:'0',margin:'0',width:target.offsetWidth+'px',height:target.offsetHeight+'px',transform:'none',translate:'none',scale:'none',rotate:'none',pointerEvents:'none'});
      corner.className='discovery-corner';blank.className='discovery-corner-blank';corner.inert=blank.inert=true;corner.setAttribute('aria-hidden','true');blank.setAttribute('aria-hidden','true');corner.append(copy);
      target.classList.add('object-discovery');target.append(blank,corner);return {target,corner,blank};
    }
    function tick(now){
      if(!active)return;const next=candidate();
      if(!next||next.id!==active.id){stop();return;}
      const progress=Math.min(1,(now-active.started)/1100),amount=Math.sin(Math.PI*progress)**2;
      if(active.scene){if(!onLift?.({key:active.key,amount})){stop();return;}}
      else active.target.style.setProperty('--discovery-lift',amount.toFixed(4));
      if(progress>=1){stop();return;}frame=requestAnimationFrame(tick);
    }
    function start(){
      timer=0;const next=candidate();if(!pending||!next||next.id!==pending.id){stop();return;}
      if(performance.now()<quietUntil){timer=setTimeout(start,quietUntil-performance.now());return;}
      pending=null;seen.add(next.id);active={...next,started:performance.now()};
      active.scene=!!onLift?.({key:next.key,amount:0});if(!active.scene)Object.assign(active,nativeCorner(next));
      status('playing',next.key);app.dataset.discoveryRenderer=active.scene?'scene':'native';app.dataset.discoveryCount=String(++count);frame=requestAnimationFrame(tick);
    }
    function refresh(){
      const next=candidate();
      if(active){if(!next||next.id!==active.id)stop();return;}
      if(!next||seen.has(next.id)){if(pending)stop();return;}
      if(pending?.id===next.id)return;
      stop();pending=next;status('waiting');timer=setTimeout(start,Math.max(650,quietUntil-performance.now()));
    }
    function interrupt(event){
      const next=candidate();if(next&&event.target instanceof Element&&event.target.closest('[data-book-object]'))seen.add(next.id);
      stop();quietUntil=performance.now()+650;
      if(!document.hidden&&!media.matches)timer=setTimeout(refresh,660);
    }
    const observer=new MutationObserver(refresh);observer.observe(app,{subtree:true,childList:true,attributes:true,attributeFilter:['data-phase','data-navigation','data-assets-ready']});
    const modals=new MutationObserver(refresh);modals.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
    ['pointerdown','touchstart','keydown','wheel','scroll','resize'].forEach(type=>listen(window,type,interrupt,{passive:true,capture:true}));
    listen(window,'blur',()=>{blurred=true;stop();});
    listen(window,'focus',()=>{blurred=false;quietUntil=performance.now()+650;refresh();});
    listen(window,'pointermove',event=>{if(active)interrupt(event);},{passive:true,capture:true});
    listen(app,'book-graphics-fallback',interrupt,true);listen(app,'book-graphics-ready',refresh,true);
    listen(document,'visibilitychange',interrupt);listen(media,'change',interrupt);
    if(window.visualViewport)listen(visualViewport,'resize',interrupt,{passive:true});
    status('idle');app.dataset.discoveryCount='0';
    return {refresh,reset:stop,destroy(){destroyed=true;stop();observer.disconnect();modals.disconnect();listeners.forEach(remove=>remove());}};
  }};
})();

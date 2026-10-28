/* Touch hints repeat while a page is being read; quiet gaps use no frames. */
(() => {
  'use strict';
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
  window.ScrapbookDiscovery={create({app,getPosition,onLift}){
    const seen=new Set(),listeners=[],media=matchMedia('(prefers-reduced-motion: reduce)');
    const css=getComputedStyle(document.documentElement),rgb=(name,fallback)=>{const hex=css.getPropertyValue(name).trim();return /^#[\da-f]{6}$/i.test(hex)?hex.slice(1).match(/../g).map(v=>parseInt(v,16)):fallback;};
    const tint=rgb('--object-glint',[156,85,119]),shift=rgb('--object-glint-shift',[134,112,159]);
    let pending=null,active=null,timer=0,frame=0,quietUntil=0,destroyed=false,blurred=false,count=0,readingPage=null;
    const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
    const status=(value,key='')=>{app.dataset.discoveryState=value;app.dataset.discoveryObject=key;};
    function available(){
      if(destroyed||blurred||media.matches||document.hidden||document.querySelector('dialog[open]'))return [];
      const position=getPosition(),film=app.querySelector('.book-film');
      if(!position||position.kind!=='read'||position.navigation||position.touchHeld||position.settle||film?.dataset.assetsReady==='false')return [];
      const unique=new Set();
      return [...app.querySelectorAll('[data-book-object]')].flatMap(source=>{
        const key=source.dataset.bookObject,control=source.closest('button,a'),chapter=source.closest('.album-chapter');
        if(!key||!control||control.disabled||source.closest('[inert],[aria-hidden="true"]')||chapter?.id!==position.chapter||key==='cats'&&source.querySelector('[data-book-object^="cat-"]'))return [];
        const r=source.getBoundingClientRect();
        if(r.width<8||r.height<8||r.bottom<50||r.top>innerHeight-48||r.right<0||r.left>innerWidth)return [];
        const id=position.chapter+':'+key;if(unique.has(id))return [];unique.add(id);return [{key,id,source}];
      });
    }
    function stop(){
      clearTimeout(timer);timer=0;pending=null;cancelAnimationFrame(frame);frame=0;
      if(active){onLift?.({key:null,amount:0,progress:0});active.native?.remove();}
      active=null;status('idle');app.removeAttribute('data-discovery-renderer');app.removeAttribute('data-discovery-progress');
    }
    function nativeGlint(item){
      const key=item.key,source=item.source;
      const target=key.startsWith('cat-')?source.querySelector('.pet-portrait'):key==='cake'?source.querySelector('.cake-art'):source.closest('.real-memory,.trier-map')||source.querySelector('.fragment-image')||source;
      if(!target)return null;
      const w=target.offsetWidth,h=target.offsetHeight;if(w<4||h<4)return null;
      const image=target.matches('img')?target:target.querySelector('img'),silhouette=key.startsWith('cat-')||key==='cake';
      const host=silhouette?(target.parentElement||target):target,pad=key==='gift'?20:6,ratio=Math.min(devicePixelRatio||1,1.5),canvas=document.createElement('canvas');
      canvas.className='native-object-glint';canvas.inert=true;canvas.setAttribute('aria-hidden','true');canvas.width=Math.ceil((w+pad*2)*ratio);canvas.height=Math.ceil((h+pad*2)*ratio);
      const hadHost=host.classList.contains('object-glint-host'),position=host.style.getPropertyValue('position'),positionPriority=host.style.getPropertyPriority('position'),positioned=getComputedStyle(host).position==='static';
      if(positioned)host.style.setProperty('position','relative');host.classList.add('object-glint-host');
      Object.assign(canvas.style,{left:(silhouette?target.offsetLeft:0)-pad+'px',top:(silhouette?target.offsetTop:0)-pad+'px',width:w+pad*2+'px',height:h+pad*2+'px'});host.append(canvas);
      const mask=document.createElement('canvas');mask.width=canvas.width;mask.height=canvas.height;const m=mask.getContext('2d',{willReadFrequently:true}),ctx=canvas.getContext('2d');m.scale(ratio,ratio);
      const remove=()=>{canvas.remove();if(!hadHost)host.classList.remove('object-glint-host');if(positioned){if(position)host.style.setProperty('position',position,positionPriority);else host.style.removeProperty('position');}};
      try{
        if(silhouette){
          if(!image?.complete||!image.naturalWidth)throw new Error('Image unavailable');
          const f=target.querySelector('.pet-frame');
          if(f){
            const frame=f.dataset.catFrame.split(',').map(Number),fw=f.offsetWidth,fh=f.offsetHeight,dx=pad+(w-fw)/2,dy=pad+(h-fh)/2;
            m.save();m.beginPath();(f.dataset.catPolygon||'0,0 100,0 100,100 0,100').split(' ').forEach((point,i)=>{const [x,y]=point.split(',').map(Number);if(i)m.lineTo(dx+x/100*fw,dy+y/100*fh);else m.moveTo(dx+x/100*fw,dy+y/100*fh);});m.closePath();m.clip();m.drawImage(image,...frame,dx,dy,fw,fh);m.restore();
          }else{
            const scale=Math.min(w/image.naturalWidth,h/image.naturalHeight),dw=image.naturalWidth*scale,dh=image.naturalHeight*scale;m.drawImage(image,pad+(w-dw)/2,pad+(h-dh)/2,dw,dh);
          }
        }else if(key==='gift'){
          const c=source.querySelector('.coupon-card'),p=source.querySelector('.gift-pocket-front');
          m.fillStyle='#fff';if(c){const shift=new DOMMatrix(getComputedStyle(c).transform);m.fillRect(pad+c.offsetLeft+shift.m41,pad+c.offsetTop+shift.m42,c.offsetWidth,c.offsetHeight);}
          if(p){const x=pad+p.offsetLeft,y=pad+p.offsetTop,pw=p.offsetWidth,ph=p.offsetHeight;m.beginPath();m.moveTo(x,y);m.lineTo(x+pw/2,y+ph*.14);m.lineTo(x+pw,y);m.lineTo(x+pw,y+ph);m.lineTo(x,y+ph);m.closePath();m.fill();}else m.fillRect(pad,pad,w,h);
        }else{m.fillStyle='#fff';m.fillRect(pad,pad,w,h);}
        const width=mask.width,height=mask.height,data=m.getImageData(0,0,width,height).data,points=[],near=Math.max(1,Math.round(1.1*ratio)),far=Math.max(2,Math.round(2.8*ratio)),alpha=(x,y)=>x<0||y<0||x>=width||y>=height?0:data[(y*width+x)*4+3]/255;
        for(let y=0;y<height;y++)for(let x=0;x<width;x++){
          const a=alpha(x,y);let low=a,high=a,outer=a;
          for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1],[1,1],[-1,1],[1,-1],[-1,-1]]){const n=alpha(x+dx*near,y+dy*near);low=Math.min(low,n);high=Math.max(high,n);outer=Math.max(outer,alpha(x+dx*far,y+dy*far));}
          const rim=high-low,halo=Math.max(0,outer-a);if(rim<.025&&halo<.025)continue;
          const px=(x/ratio-pad)/w-.5,py=(y/ratio-pad)/h-.5,phase=Math.atan2(-py,px)/(Math.PI*2)+.5,mix=.65*(.5+.5*Math.cos(phase*Math.PI*2));points.push({offset:(y*width+x)*4,rim,halo,phase,color:tint.map((v,i)=>Math.round(v+(shift[i]-v)*mix))});
        }
        const output=ctx.createImageData(width,height);
        return {paint(progress,amount){const head=.75-progress;for(const p of points){let d=Math.abs(p.phase-head);d=Math.min(d,Math.abs(d-1),Math.abs(d-2));const beam=1-smooth(d/.13),v=amount*beam,index=p.offset;output.data[index]=p.color[0];output.data[index+1]=p.color[1];output.data[index+2]=p.color[2];output.data[index+3]=Math.round(255*v*Math.max(p.rim*.94,p.halo*.24));}ctx.putImageData(output,0,0);},remove};
      }catch{
        remove();const previous=target.style.getPropertyValue('filter'),priority=target.style.getPropertyPriority('filter');
        target.classList.add('object-glint-pulse');return {paint(progress,amount){target.style.setProperty('filter',`drop-shadow(0 0 ${1+amount*1.2}px rgba(${tint.join(',')},${amount*.78}))`);},remove(){if(previous)target.style.setProperty('filter',previous,priority);else target.style.removeProperty('filter');target.classList.remove('object-glint-pulse');}};
      }
    }
    function queue(delay){clearTimeout(timer);timer=setTimeout(refresh,delay);}
    function tick(now){
      if(!active)return;
      if(!available().some(item=>item.id===active.id)){stop();return;}
      const progress=clamp((now-active.started)/1250),amount=smooth(progress/.12)*smooth((1-progress)/.12);
      app.dataset.discoveryProgress=progress.toFixed(3);
      if(active.scene){if(!onLift?.({key:active.key,amount,progress})){stop();return;}}
      else active.native?.paint(progress,amount);
      if(progress>=1){stop();quietUntil=performance.now()+1000;queue(1000);return;}
      frame=requestAnimationFrame(tick);
    }
    function start(){
      timer=0;const next=available().find(item=>!seen.has(item.id));
      if(!pending||!next||next.id!==pending.id){stop();refresh();return;}
      if(performance.now()<quietUntil){timer=setTimeout(start,quietUntil-performance.now());return;}
      pending=null;seen.add(next.id);active={...next,started:performance.now()};active.scene=!!onLift?.({key:next.key,amount:0,progress:0});
      if(!active.scene)active.native=nativeGlint(next);
      status('playing',next.key);app.dataset.discoveryRenderer=active.scene?'scene':'native';app.dataset.discoveryCount=String(++count);frame=requestAnimationFrame(tick);
    }
    function refresh(){
      if(destroyed)return;const items=available();
      const position=getPosition(),page=items.length?position.chapter+':'+(position.part||1):null;
      if(page!==readingPage){stop();seen.clear();readingPage=page;}
      if(active){if(!items.some(item=>item.id===active.id))stop();return;}
      let next=items.find(item=>!seen.has(item.id));
      if(!next&&items.length){seen.clear();quietUntil=Math.max(quietUntil,performance.now()+4500);next=items[0];}
      if(!next){if(pending)stop();return;}
      if(pending?.id===next.id)return;
      stop();pending=next;status('waiting');timer=setTimeout(start,Math.max(650,quietUntil-performance.now()));
    }
    function interrupt(event){
      const position=getPosition(),source=event.target instanceof Element?event.target.closest('[data-book-object]'):null;
      if(source&&app.contains(source)&&position?.chapter){seen.add(position.chapter+':'+source.dataset.bookObject);if(source.dataset.bookObject==='cats')source.querySelectorAll('[data-book-object]').forEach(node=>seen.add(position.chapter+':'+node.dataset.bookObject));}
      stop();quietUntil=performance.now()+650;if(!document.hidden&&!media.matches&&!blurred)queue(660);
    }
    const observer=new MutationObserver(refresh);observer.observe(app,{subtree:true,childList:true,attributes:true,attributeFilter:['data-phase','data-navigation','data-assets-ready']});
    const modals=new MutationObserver(refresh);modals.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
    ['pointerdown','touchstart','keydown','wheel','scroll','resize'].forEach(type=>listen(window,type,interrupt,{passive:true,capture:true}));
    listen(window,'pointermove',event=>{if(active)interrupt(event);},{passive:true,capture:true});
    listen(window,'blur',()=>{blurred=true;stop();});
    listen(window,'focus',()=>{blurred=false;quietUntil=performance.now()+650;refresh();});
    listen(app,'book-graphics-fallback',interrupt,true);listen(app,'book-graphics-ready',refresh,true);
    listen(document,'visibilitychange',interrupt);listen(media,'change',interrupt);
    if(window.visualViewport)listen(visualViewport,'resize',interrupt,{passive:true});
    status('idle');app.dataset.discoveryCount='0';
    return {refresh,reset:stop,destroy(){destroyed=true;stop();observer.disconnect();modals.disconnect();listeners.forEach(remove=>remove());}};
  }};
})();

/* A shared clock keeps touch contours moving continuously while reading. */
(() => {
  'use strict';
  const clamp=n=>Math.max(0,Math.min(1,n));
  const smooth=n=>{n=clamp(n);return n*n*(3-2*n);};
  window.ScrapbookDiscovery={create({app,getPosition,onLift}){
    const listeners=[],media=matchMedia('(prefers-reduced-motion: reduce)');
    const css=getComputedStyle(document.documentElement),rgb=(name,fallback)=>{const hex=css.getPropertyValue(name).trim();return /^#[\da-f]{6}$/i.test(hex)?hex.slice(1).match(/../g).map(v=>parseInt(v,16)):fallback;};
    const tint=rgb('--object-glint',[156,85,119]),shift=rgb('--object-glint-shift',[134,112,159]);
    let pending=null,active=null,timer=0,frame=0,destroyed=false,blurred=false,count=0;
    const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
    const status=(value,key='')=>{app.dataset.discoveryState=value;app.dataset.discoveryObject=key;};
    function readingPosition(){
      if(destroyed||blurred||media.matches||document.hidden||document.querySelector('dialog[open]'))return null;
      const position=getPosition(),film=app.querySelector('.book-film');
      return position&&position.kind==='read'&&!position.navigation&&!position.touchHeld&&!position.settle&&film?.dataset.assetsReady!=='false'?position:null;
    }
    const pageKey=position=>position.chapter+':'+(position.part||1);
    function available(){
      const position=readingPosition();if(!position)return [];
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
      if(active){onLift?.({key:null,amount:0,progress:0});active.items.forEach(item=>item.native?.remove());}
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
        const contour=document.createElement('canvas');contour.width=width;contour.height=height;
        const contourContext=contour.getContext('2d'),output=contourContext.createImageData(width,height);
        for(const p of points){const i=p.offset;output.data[i]=p.color[0];output.data[i+1]=p.color[1];output.data[i+2]=p.color[2];output.data[i+3]=Math.round(255*Math.max(p.rim*.94,p.halo*.24));}
        contourContext.putImageData(output,0,0);
        const beam=document.createElement('canvas');beam.width=beam.height=256;const b=beam.getContext('2d');
        const gradient=b.createConicGradient(-Math.PI/2,128,128);
        for(let i=0;i<=64;i++){const phase=i/64,d=Math.min(phase,1-phase),alpha=1-smooth(Math.max(0,d-.015)/.115);gradient.addColorStop(phase,`rgba(255,255,255,${alpha})`);}
        b.fillStyle=gradient;b.fillRect(0,0,256,256);
        return {paint(progress,amount){
          ctx.clearRect(0,0,width,height);ctx.globalAlpha=amount;ctx.drawImage(contour,0,0);ctx.globalAlpha=1;ctx.globalCompositeOperation='destination-in';
          ctx.save();ctx.translate((pad+w/2)*ratio,(pad+h/2)*ratio);ctx.scale(w*ratio,h*ratio);ctx.rotate(progress*Math.PI*2);ctx.drawImage(beam,-1,-1,2,2);ctx.restore();ctx.globalCompositeOperation='source-over';
        },remove};
      }catch{
        remove();const previous=target.style.getPropertyValue('filter'),priority=target.style.getPropertyPriority('filter');
        target.classList.add('object-glint-pulse');return {paint(progress,amount){target.style.setProperty('filter',`drop-shadow(0 0 ${1+amount*1.2}px rgba(${tint.join(',')},${amount*.78}))`);},remove(){if(previous)target.style.setProperty('filter',previous,priority);else target.style.removeProperty('filter');target.classList.remove('object-glint-pulse');}};
      }
    }
    function queue(delay){clearTimeout(timer);timer=setTimeout(refresh,delay);}
    function tick(now){
      if(!active)return;
      const position=readingPosition();if(!position||pageKey(position)!==active.page){stop();return;}
      const elapsed=Math.max(0,now-active.started),phase=elapsed/3600,amount=.55+.45*smooth(elapsed/140);
      const items=active.items.map((item,i)=>({key:item.key,amount,progress:(phase+i*.173)%1}));
      app.dataset.discoveryProgress=items[0].progress.toFixed(4);app.dataset.discoveryLap=String(Math.floor(phase));
      if(active.scene){if(!onLift?.({items})){stop();return;}}
      else active.items.forEach((item,i)=>item.native?.paint(items[i].progress,amount));
      frame=requestAnimationFrame(tick);
    }
    function start(){
      timer=frame=0;const items=available();
      if(!pending||!items.length||items.map(item=>item.id).join(',')!==pending){stop();refresh();return;}
      pending=null;active={items,page:pageKey(readingPosition()),started:performance.now()};active.scene=!!onLift?.({items:items.map((item,i)=>({key:item.key,amount:.55,progress:i*.173%1}))});
      if(!active.scene)items.forEach((item,i)=>{item.native=nativeGlint(item);item.native?.paint(i*.173%1,.55);});
      active.started=performance.now();
      status('playing',items.map(item=>item.key).join(','));app.dataset.discoveryRenderer=active.scene?'scene':'native';app.dataset.discoveryCount=String(++count);app.dataset.discoveryLap='0';frame=requestAnimationFrame(tick);
    }
    function refresh(){
      if(destroyed)return;const items=available();
      const signature=items.map(item=>item.id).join(',');
      if(active){if(signature===active.items.map(item=>item.id).join(','))return;stop();}
      if(!items.length){
        if(pending)stop();const position=getPosition();
        if(!blurred&&!media.matches&&!document.hidden&&!document.querySelector('dialog[open]')&&position?.kind==='read'&&!position.navigation&&!position.touchHeld&&position.settle)queue(40);
        return;
      }
      if(pending===signature)return;
      stop();pending=signature;status('waiting');frame=requestAnimationFrame(start);
    }
    function interrupt(event){
      stop();if(document.hidden||media.matches||blurred)return;
      const position=getPosition();if(event.type==='scroll'&&position?.navigation)return;
      queue(event.type==='scroll'&&!app.querySelector('.book-film')?60:0);
    }
    const observer=new MutationObserver(refresh);observer.observe(app,{subtree:true,childList:true,attributes:true,attributeFilter:['data-phase','data-navigation','data-assets-ready']});
    const modals=new MutationObserver(refresh);modals.observe(document.body,{subtree:true,attributes:true,attributeFilter:['open']});
    ['pointerdown','touchstart','pointerup','touchend','touchcancel','keydown','wheel','scroll','resize'].forEach(type=>listen(window,type,interrupt,{passive:true,capture:true}));
    listen(window,'pointermove',event=>{if(active)interrupt(event);},{passive:true,capture:true});
    listen(window,'blur',()=>{blurred=true;stop();});
    listen(window,'focus',()=>{blurred=false;refresh();});
    listen(app,'book-graphics-fallback',interrupt,true);listen(app,'book-graphics-ready',refresh,true);
    listen(document,'visibilitychange',interrupt);listen(media,'change',interrupt);
    if(window.visualViewport)listen(visualViewport,'resize',interrupt,{passive:true});
    status('idle');app.dataset.discoveryCount='0';
    return {refresh,reset:stop,destroy(){destroyed=true;stop();observer.disconnect();modals.disconnect();listeners.forEach(remove=>remove());}};
  }};
})();

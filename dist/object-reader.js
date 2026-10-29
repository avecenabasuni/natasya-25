(() => {
  'use strict';
  const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rectOf=node=>{const r=node.getBoundingClientRect();return {left:r.left,top:r.top,width:r.width,height:r.height};};
  const usable=r=>r&&Number.isFinite(r.left)&&r.width>3&&r.height>3&&r.left+r.width>0&&r.top+r.height>0&&r.left<innerWidth&&r.top<innerHeight;
  window.ScrapbookObjectReader={create({dialog,closeIcon,onError=()=>{}}){
    let current=null,ignoreClickUntil=0,multiTouch=false,multiPointer=false,openingGeneration=0;
    const activePointers=new Set();
    function phase(state,value){dialog.dataset.readerState=value;if(state)state.phase=value;}
    function stop(state,freeze=false){
      state.motionId=(state.motionId||0)+1;
      cancelAnimationFrame(state.startFrame);state.startFrame=0;
      if(freeze){const now=document.timeline.currentTime;state.animations.forEach(a=>{const time=now!==null&&a.startTime!==null?(now-a.startTime)*a.playbackRate:a.currentTime;a.pause();a.currentTime=time;});}
      if(freeze)for(const node of[state.paper,state.upper,state.flight,state.body,...state.paper?.querySelectorAll('.reader-fold-face,.reader-fold-ink')||[]])if(node){const s=getComputedStyle(node);node.style.transform=s.transform;node.style.opacity=s.opacity;}
      if(freeze&&state.flight)state.flight.style.clipPath=getComputedStyle(state.flight).clipPath;
      if(freeze&&state.paper)state.paper.style.clipPath=getComputedStyle(state.paper).clipPath;
      state.animations.forEach(a=>a.cancel());state.animations=[];
    }
    const ease='cubic-bezier(.32,0,.2,1)';
    function animate(state,node,frames,duration,easing=ease){
      const a=node.animate(frames,{duration,fill:'both',easing});a.pause();a.currentTime=0;state.animations.push(a);return a.finished.catch(()=>{});
    }
    function play(state){
      const generation=state.motionId;
      // Let the source patch and new layers paint before starting time.
      state.startFrame=requestAnimationFrame(()=>{
        state.startFrame=requestAnimationFrame(()=>{
          state.startFrame=0;if(current!==state||state.motionId!==generation)return;
          dialog.classList.add('reader-running');
          const start=document.timeline.currentTime;state.animations.forEach(a=>{a.play();a.startTime=start;});
        });
      });
    }
    function run(state,jobs,complete){
      const generation=state.motionId;
      Promise.all(jobs).then(()=>{if(current===state&&state.motionId===generation)complete(state);});play(state);
    }
    function selectedText(){return !!window.getSelection()?.toString().trim();}
    const controls='a,button,input,textarea,select,summary,[contenteditable="true"],[role="button"],audio,video';
    function gestureEligible(target){
      const state=current,r=dialog.getBoundingClientRect();
      return state&&state.phase==='reading'&&!state.gesture&&!state.dragPrepared&&!multiTouch&&!multiPointer&&dialog.scrollTop<=1&&!selectedText()&&target instanceof Element&&!target.closest(controls)&&r.height>0;
    }
    function gestureState(value){dialog.dataset.readerGesture=value;}
    function globalPose(matrix,d,origin){
      return new DOMMatrix().translate(d.left-origin.left,d.top-origin.top).multiply(matrix).translate(origin.left-d.left,origin.top-d.top);
    }
    function restoreGestureDOM(state,g){
      cancelAnimationFrame(g.returnFrame);
      g.animations.forEach(a=>a.cancel());g.animations=[];
      if(g.placeholder?.isConnected)g.placeholder.replaceWith(state.body);
      if(g.bodyStyle!==undefined)state.body.style.cssText=g.bodyStyle;
      if(g.bodyInert!==undefined)state.body.inert=g.bodyInert;
      if(g.paperOpacity!==undefined&&state.paper)state.paper.style.opacity=g.paperOpacity;
      if(g.button)g.button.style.transform=g.buttonTransform||'';
      g.surface?.remove();dialog.classList.remove('reader-dragging');dialog.style.removeProperty('--reader-drag-dim');if(state.phase==='reading')dialog.setAttribute('aria-busy','false');
      g.releasing=true;if(g.pointerId!==undefined)try{dialog.releasePointerCapture(g.pointerId);}catch{}
    }
    function discardGesture(state){
      const g=state?.gesture;if(!g)return;g.generation++;restoreGestureDOM(state,g);state.gesture=null;gestureState('idle');
    }
    function claimGesture(state,g){
      if(current!==state||state.phase!=='reading'||dialog.scrollTop>1||selectedText()){discardGesture(state);return false;}
      const d=rectOf(dialog),b=rectOf(state.body),css=getComputedStyle(dialog),layer=document.createElement('div'),placeholder=document.createElement('div');
      layer.className='reader-drag-surface';layer.setAttribute('aria-hidden','true');layer.inert=true;
      Object.assign(layer.style,{left:d.left+'px',top:d.top+'px',width:d.width+'px',height:d.height+'px'});
      const padding=parseFloat(css.paddingTop)+parseFloat(css.paddingBottom),border=parseFloat(css.borderTopWidth)+parseFloat(css.borderBottomWidth);
      const flowHeight=dialog.scrollHeight>dialog.clientHeight+1?dialog.scrollHeight-padding:d.height-padding-border;
      placeholder.className='reader-drag-placeholder';placeholder.setAttribute('aria-hidden','true');placeholder.style.height=Math.max(0,flowHeight)+'px';
      Object.assign(g,{d,bodyRect:b,surface:layer,placeholder,bodyStyle:state.body.style.cssText,bodyInert:state.body.inert,paperOpacity:state.paper?.style.opacity,button:dialog.querySelector('#close-note-dialog'),pose:new DOMMatrix()});
      g.buttonTransform=g.button.style.transform;
      state.body.replaceWith(placeholder);layer.append(state.body);dialog.append(layer);
      Object.assign(state.body.style,{position:'absolute',left:(b.left-d.left)+'px',top:(b.top-d.top)+'px',width:b.width+'px',margin:'0',opacity:'1',transform:'none'});state.body.inert=true;
      if(state.paper)state.paper.style.opacity='0';dialog.classList.add('reader-dragging');dialog.setAttribute('aria-busy','true');gestureState('dragging');g.claimed=true;
      if(g.pointerId!==undefined)try{dialog.setPointerCapture(g.pointerId);}catch{}
      return true;
    }
    function drawGesture(state,g,x,y,time){
      const dy=Math.max(0,y-g.y),progress=Math.min(.65,dy/innerHeight),scale=1-progress*.1,dx=(x-g.x)*.18+(g.d.width-g.d.width*scale)/2;
      g.distance=dy;g.speed=(dy-(g.lastDistance||0))/Math.max(1,time-g.lastTime);g.lastTime=time;g.lastDistance=dy;
      g.pose=new DOMMatrix().translate(dx,Math.min(dy*.88,innerHeight*.65)).scale(scale);
      g.surface.style.transform=g.pose.toString();
      // The button's origin stays at its untransformed fixed position.
      const buttonOrigin={left:g.d.left+g.d.width-52,top:g.d.top+8};g.button.style.transform=globalPose(g.pose,g.d,buttonOrigin).toString();
      dialog.style.setProperty('--reader-drag-dim',String(1-progress*.5));
    }
    function startGesture(target,x,y,time,type,pointerId){
      if(!gestureEligible(target))return;
      current.gesture={type,pointerId,x,y,lastTime:time,lastDistance:0,distance:0,speed:0,claimed:false,animations:[],generation:0};gestureState('pending');
    }
    function moveGesture(x,y,time,event){
      const state=current,g=state?.gesture;if(!g||g.returning)return;
      if(!g.claimed){
        const dx=x-g.x,dy=y-g.y;
        if(selectedText()||dialog.scrollTop>1||dy < -6||Math.abs(dx)>9&&Math.abs(dx)>=Math.abs(dy)){discardGesture(state);return;}
        if(dy<=10||dy<Math.abs(dx)*1.25)return;
        if(!claimGesture(state,g))return;
      }
      if(event.cancelable)event.preventDefault();drawGesture(state,g,x,y,time);
    }
    function returnGesture(state){
      const g=state?.gesture;if(!g)return;if(!g.claimed){discardGesture(state);return;}
      if(g.returning)return;g.returning=true;gestureState('returning');
      if(reduced()){discardGesture(state);return;}
      const generation=++g.generation,duration=240;
      for(const node of[g.surface,g.button])g.animations.push(node.animate([{transform:getComputedStyle(node).transform},{transform:'none'}],{duration,easing:'cubic-bezier(.2,.7,.25,1)',fill:'both'}));
      const dim=+getComputedStyle(dialog,'::backdrop').opacity,start=performance.now();
      const dimTick=now=>{if(current!==state||state.gesture!==g||g.generation!==generation)return;const p=Math.min(1,(now-start)/duration);dialog.style.setProperty('--reader-drag-dim',String(dim+(1-dim)*(1-(1-p)**3)));if(p<1)g.returnFrame=requestAnimationFrame(dimTick);};g.returnFrame=requestAnimationFrame(dimTick);
      Promise.all(g.animations.map(a=>a.finished.catch(()=>{}))).then(()=>{if(current===state&&state.gesture===g&&g.generation===generation)discardGesture(state);});
    }
    function prepareGestureClose(state){
      const g=state.gesture;if(!g)return;if(!g.claimed){discardGesture(state);return;}
      const pose=new DOMMatrix(getComputedStyle(g.surface).transform),dim=+getComputedStyle(dialog,'::backdrop').opacity;g.generation++;restoreGestureDOM(state,g);state.gesture=null;
      // Build printed inner faces from their canonical layout, then carry the
      // held global pose into the existing material-specific return.
      const paper=state.paper,body=state.body;
      if(state.animated){
        if(surface(state))refreshInk(state);
        const front=state.kind==='letter'||state.kind==='disclosure'?'none':frontTarget(state),origin=state.snapshot.rect;
        if(!['letter','disclosure'].includes(state.kind))state.dragFront=globalPose(pose,g.d,origin).multiply(new DOMMatrix(front)).toString();
        state.dragPaper=pose.toString();state.dragDim=dim;state.dragPrepared=true;paper.style.transform=state.dragPaper;
        body.style.transform=globalPose(pose,g.d,rectOf(body)).toString();
      }
      gestureState('committed');
    }
    function endGesture(cancelled=false){
      const state=current,g=state?.gesture;if(!g||g.returning)return;
      if(!g.claimed){discardGesture(state);return;}
      ignoreClickUntil=performance.now()+350;
      const threshold=Math.min(120,Math.max(80,g.d.height*.2)),quick=g.distance>42&&g.speed>.65&&performance.now()-g.lastTime<100;
      if(!cancelled&&(g.distance>=threshold||quick)){prepareGestureClose(state);close();}else returnGesture(state);
    }
    function release(state){if(!state)return;discardGesture(state);stop(state);state.snapshot?.restore?.();state.flight?.remove();state.paper?.remove();}
    function clean(){++openingGeneration;const state=current;current=null;release(state);dialog.classList.remove('object-reader','reader-animated','reader-running','reader-settled','reader-closing','reader-pointer-open','reader-rebasing','reader-dragging');dialog.removeAttribute('aria-busy');['readerKind','readerMaterial','readerObject','readerGesture'].forEach(key=>delete dialog.dataset[key]);dialog.style.removeProperty('--reader-dim-start');dialog.style.removeProperty('--reader-dim-open-start');dialog.style.removeProperty('--reader-duration');dialog.style.removeProperty('--reader-drag-dim');phase(null,'closed');}
    function settle(state){
      if(current!==state||state.phase==='closing')return;
      stop(state);state.paper.style.transform=state.body.style.transform='none';state.upper.style.transform=state.kind==='letter'?'rotateX(0deg)':'none';state.paper.style.clipPath='none';state.paper.style.opacity=state.body.style.opacity='1';state.paper.classList.add('reader-ink-hidden');
      if(state.kind==='letter'){state.paper.querySelector('.reader-fold-front').style.opacity='1';state.paper.querySelector('.reader-fold-back').style.opacity='0';}
      if(state.kind!=='letter'){state.flight.style.transform=state.kind==='disclosure'?'none':frontTarget(state);state.flight.style.opacity='0';}
      state.flight.style.clipPath=state.snapshot.clip?.open||'none';state.body.inert=false;dialog.classList.add('reader-settled');dialog.setAttribute('aria-busy','false');phase(state,'reading');
    }
    function placeClose(){
      if(!current)return;const r=dialog.getBoundingClientRect(),button=dialog.querySelector('#close-note-dialog');button.style.left=(r.right-52)+'px';button.style.top=(r.top+8)+'px';button.style.right='auto';
    }
    function fallback(source){
      const portrait=source.dataset.bookObject?.startsWith('cat-')?source.querySelector('.pet-portrait'):null;
      const target=portrait||source.querySelector('.coupon-card,.fragment-image')||source.closest('.real-memory,.trier-map')||source;
      const rect=rectOf(target),copy=target.cloneNode(true),nodes=[copy,...copy.querySelectorAll('*')],originals=[target,...target.querySelectorAll('*')];
      nodes.forEach((node,i)=>{
        const css=getComputedStyle(originals[i]);for(const property of css)node.style.setProperty(property,css.getPropertyValue(property));
        node.removeAttribute('id');node.removeAttribute('href');node.removeAttribute('aria-labelledby');node.tabIndex=-1;
        for(const a of[...node.attributes])if(a.name.startsWith('data-'))node.removeAttribute(a.name);
        if(node.matches('button,input,select,textarea'))node.disabled=true;
        if(css.color==='rgba(0, 0, 0, 0)')node.style.color='var(--ink)';
        node.style.visibility='visible';node.style.opacity='1';node.style.transition='none';node.style.animation='none';
        node.style.setProperty('-webkit-text-fill-color','currentColor');
      });
      const box=document.createElement('div');box.className='reader-fallback-front';box.inert=true;box.append(copy);
      Object.assign(copy.style,{position:'relative',inset:'auto',margin:'0',width:target.offsetWidth+'px',height:target.offsetHeight+'px',transform:`scale(${rect.width/Math.max(1,target.offsetWidth)},${rect.height/Math.max(1,target.offsetHeight)})`,translate:'none',rotate:'none',scale:'none'});
      const opacity=target.style.getPropertyValue('opacity'),priority=target.style.getPropertyPriority('opacity');let hidden=false;
      return {rect,front:box,getRect:()=>rectOf(target),conceal(){if(hidden)return;hidden=true;target.style.setProperty('opacity','0','important');},restore(){if(!hidden)return;hidden=false;if(opacity)target.style.setProperty('opacity',opacity,priority);else target.style.removeProperty('opacity');}};
    }
    function paperStart(state,r){
      if(state.kind==='disclosure')return 'translateY(18px) scale(.985)';
      if(!surface(state))return 'translateY(8px) scale(.985)';
      const d=state.destination,sx=r.width/d.width,sy=r.height/d.height*(state.kind==='letter'?2:1),dy=r.top-d.top-(state.kind==='letter'?r.height:0);
      if(state.kind==='card')return `translate(${r.left-d.left}px,${dy}px) scale(${sx})`;
      return `translate(${r.left-d.left}px,${dy}px) scale(${sx},${sy})`;
    }
    function frontPose(state){
      if(state.kind==='card'){const b=rectOf(state.body),r=state.snapshot.rect;return{x:b.left-r.left,y:b.top-r.top,scale:b.width/r.width,angle:0};}
      const d=state.destination,hero=state.targetSelector?state.body.querySelector(state.targetSelector):null,candidate=hero?rectOf(hero):null;
      const fallback={left:d.left+24,top:d.top+50,width:d.width-48,height:d.height-90};
      const left=candidate?Math.max(candidate.left,fallback.left):0,top=candidate?Math.max(candidate.top,fallback.top):0;
      const visible=candidate?{left,top,width:Math.min(candidate.left+candidate.width,d.left+d.width-24)-left,height:Math.min(candidate.top+candidate.height,d.top+d.height-24)-top}:null;
      const target=usable(visible)&&visible.height>24?visible:fallback;
      const r=state.snapshot.rect,scale=Math.min(target.width/r.width,target.height/r.height);
      return {x:target.left+(target.width-r.width*scale)/2-r.left,y:target.top+(target.height-r.height*scale)/2-r.top,scale,angle:0};
    }
    const frontTransform=p=>`translate(${p.x}px,${p.y}px) scale(${p.scale}) rotate(${p.angle||0}deg)`;
    const frontTarget=state=>frontTransform(frontPose(state));
    const surface=state=>['letter','card','disclosure'].includes(state.kind);
    function hinge(state,from,to,duration){
      const angle=value=>value.startsWith('rotateX')?parseFloat(value.slice(8)):-Math.acos(Math.max(-1,Math.min(1,new DOMMatrix(value).m22)))*180/Math.PI;
      const a=angle(from),b=angle(to),cross=(-90-a)/(b-a),jobs=[animate(state,state.upper,[{transform:from},{transform:to}],duration)];
      // WebKit may composite canvas descendants through a culled backface.
      // Cull the actual printed surfaces at the same edge-on hinge pose.
      for(const [selector,outside]of[['.reader-fold-front',false],['.reader-fold-back',true]]){
        const visible=value=>(value < -90)===outside?1:0,start=visible(a),end=visible(b),frames=[{opacity:start,offset:0}];
        if(cross>0&&cross<1)frames.push({opacity:start,offset:cross},{opacity:end,offset:cross});
        frames.push({opacity:end,offset:1});jobs.push(animate(state,state.paper.querySelector(selector),frames,duration));
      }
      return jobs;
    }
    function refreshInk(state){
      if(!surface(state))return;state.paper.querySelectorAll('.reader-fold-ink').forEach(n=>n.remove());
      const d=state.destination,b=rectOf(state.body),faces=state.kind==='letter'?[[state.paper.querySelector('.reader-fold-front'),0],[state.paper.querySelector('.reader-fold-lower'),d.height/2]]:[[state.paper.querySelector('.reader-flat-panel'),0]];
      faces.forEach(([face,offset])=>{
        const ink=document.createElement('div'),copy=state.body.cloneNode(true);ink.className='reader-fold-ink';ink.inert=true;ink.setAttribute('aria-hidden','true');
        [copy,...copy.querySelectorAll('[id]')].forEach(n=>n.removeAttribute('id'));
        Object.assign(copy.style,{position:'absolute',left:(b.left-d.left)+'px',top:(b.top-d.top-offset)+'px',width:b.width+'px',opacity:'1',transform:'none',margin:'0'});ink.append(copy);face.append(ink);
      });
    }
    function currentFront(state){
      if(['letter','disclosure'].includes(state.kind))return {x:0,y:0,scale:1,angle:0};
      const m=new DOMMatrix(getComputedStyle(state.flight).transform);
      return {x:m.e,y:m.f,scale:Math.hypot(m.a,m.b),angle:Math.atan2(m.b,m.a)*180/Math.PI};
    }
    function openingFront(state,from,opacity){
      const to=frontPose(state),frames=[{offset:0,transform:frontTransform(from),opacity,clipPath:getComputedStyle(state.flight).clipPath},{offset:.78,opacity},{offset:.96,opacity:0},{offset:1,transform:frontTransform(to),opacity:0,clipPath:state.snapshot.clip?.open||'none'}];
      if(state.kind==='coupon'&&!state.resized){
        const extraction=state.snapshot.extraction||{x:0,y:-state.snapshot.rect.height};
        frames[0].easing=ease;frames.splice(1,0,{offset:.35,transform:frontTransform({x:from.x+extraction.x,y:from.y+extraction.y,scale:from.scale,angle:from.angle}),opacity,clipPath:state.snapshot.clip?.open||'none',easing:ease});
      }
      return frames;
    }
    function openMotion(state,duration,fromPaper,fromUpper,fromFront){
      state.motionDuration=duration;
      const nativeOpacity=+getComputedStyle(state.body).opacity,frontOpacity=+getComputedStyle(state.flight).opacity;
      const dim=getComputedStyle(dialog,'::backdrop').opacity;
      dialog.classList.remove('reader-running');dialog.style.setProperty('--reader-dim-open-start',dim);dialog.style.setProperty('--reader-duration',duration+'ms');dialog.classList.toggle('reader-rebasing');
      state.paper.classList.remove('reader-ink-hidden');const jobs=[];
      if(surface(state)){
        refreshInk(state);state.body.style.opacity='0';
        jobs.push(animate(state,state.paper,[{transform:fromPaper,opacity:getComputedStyle(state.paper).opacity,clipPath:getComputedStyle(state.paper).clipPath},{transform:'none',opacity:1,clipPath:state.kind==='card'?'inset(0 0 0 0)':'none'}],duration));
        if(state.kind==='letter'){state.flight.style.opacity='1';jobs.push(...hinge(state,fromUpper,'rotateX(0deg)',duration));}
        if(state.kind==='card'){
          state.paper.querySelectorAll('.reader-fold-ink').forEach(n=>jobs.push(animate(state,n,[{opacity:0},{opacity:1,offset:.7},{opacity:1}],duration)));
          jobs.push(animate(state,state.flight,[{transform:frontTransform(fromFront),opacity:frontOpacity},{opacity:0,offset:.7},{transform:frontTarget(state),opacity:0}],duration));
        }
      }else{
        const timing=state.kind==='coupon'?'linear':ease;
        const paperOpacity=getComputedStyle(state.paper).opacity;
        jobs.push(animate(state,state.paper,[{transform:fromPaper,opacity:paperOpacity,offset:0},{opacity:paperOpacity,offset:.72},{transform:'none',opacity:1,offset:.96},{opacity:1,offset:1}],duration,timing),animate(state,state.flight,openingFront(state,fromFront,frontOpacity),duration,timing),animate(state,state.body,[{opacity:nativeOpacity,offset:0},{opacity:nativeOpacity,offset:.78},{opacity:1,offset:.96},{opacity:1,offset:1}],duration,timing));
      }
      run(state,jobs,settle);
    }
    function finishClose(state){
      if(current!==state)return;const focus=state.source?.closest('button,a,[tabindex]')||state.source;
      clean();if(dialog.open)window.ScrapbookModalLock.close(dialog);if(focus?.isConnected)focus.focus({preventScroll:true});
    }
    function close(){
      const state=current;if(!dialog.open)return;if(!state){window.ScrapbookModalLock.close(dialog);return;}if(state.phase==='closing')return;
      if(state.gesture)prepareGestureClose(state);
      const progress=state.phase==='reading'?1:Math.max(state.openingProgress||0,state.paper?.getAnimations()[0]?.effect.getComputedTiming().progress||0);
      const duration=Math.max(100,(state.kind==='letter'?560:440)*Math.sqrt(progress));
      const wasReading=state.phase==='reading';stop(state,true);phase(state,'closing');state.body.inert=true;dialog.setAttribute('aria-busy','true');dialog.style.setProperty('--reader-dim-start',state.dragPrepared?state.dragDim:getComputedStyle(dialog,'::backdrop').opacity);dialog.style.setProperty('--reader-duration',duration+'ms');dialog.classList.remove('reader-running');dialog.classList.add('reader-closing');
      const button=dialog.querySelector('#close-note-dialog');button.disabled=true;button.inert=true;button.setAttribute('aria-hidden','true');
      if(!wasReading&&progress<.015){finishClose(state);return;}
      if(reduced()||!state.animated){finishClose(state);return;}
      if(surface(state)){
        if(wasReading&&!state.dragPrepared)refreshInk(state);state.paper.classList.remove('reader-ink-hidden');if(wasReading)state.body.style.opacity='0';
        if(state.kind==='disclosure'){
          run(state,[animate(state,state.paper,[{transform:getComputedStyle(state.paper).transform,opacity:getComputedStyle(state.paper).opacity},{transform:'translateY(18px) scale(.985)',opacity:0}],220)],finishClose);return;
        }
      }
      if(state.resized||!usable(state.snapshot.getRect?.())){
        dialog.style.setProperty('--reader-duration','140ms');
        const jobs=[animate(state,state.body,[{opacity:getComputedStyle(state.body).opacity},{opacity:0}],140)];
        if(state.paper)jobs.push(animate(state,state.paper,[{opacity:getComputedStyle(state.paper).opacity},{opacity:0}],140));
        if(state.flight)jobs.push(animate(state,state.flight,[{opacity:getComputedStyle(state.flight).opacity},{opacity:0}],140));
        run(state,jobs,finishClose);return;
      }
      const r=state.snapshot.getRect(),old=state.snapshot.rect;
      state.paper.hidden=state.flight.hidden=false;dialog.classList.remove('reader-settled');
      if(wasReading){state.paper.style.transform=state.dragPrepared?state.dragPaper:'none';state.paper.style.opacity='1';state.upper.style.transform=state.kind==='letter'?'rotateX(0deg)':'none';state.flight.style.transform=state.kind==='letter'?'none':state.dragPrepared?state.dragFront||'none':frontTarget(state);state.flight.style.opacity=state.kind==='letter'?'1':'0';state.flight.style.clipPath=state.snapshot.clip?.open||'none';}
      const finish=`translate(${r.left-old.left}px,${r.top-old.top}px) scale(${r.width/old.width},${r.height/old.height})`;
      const start=paperStart(state,r);
      const frontOpacity=getComputedStyle(state.flight).opacity;
      if(surface(state)){
        const clip=state.kind==='card'?`inset(0 0 ${Math.max(0,100-r.height/(state.destination.height*r.width/state.destination.width)*100)}% 0)`:'none';
        const jobs=[animate(state,state.paper,[{transform:getComputedStyle(state.paper).transform,opacity:getComputedStyle(state.paper).opacity,clipPath:getComputedStyle(state.paper).clipPath},{transform:start,opacity:1,clipPath:clip}],duration)];
        if(state.kind==='letter')jobs.push(...hinge(state,getComputedStyle(state.upper).transform,'rotateX(-180deg)',duration));
        else{
          jobs.push(animate(state,state.flight,[{transform:getComputedStyle(state.flight).transform,opacity:frontOpacity},{opacity:1,offset:.55},{transform:finish,opacity:1}],duration));
          state.paper.querySelectorAll('.reader-fold-ink').forEach(n=>jobs.push(animate(state,n,[{opacity:getComputedStyle(n).opacity},{opacity:0,offset:.55},{opacity:0}],duration)));
        }
        run(state,jobs,finishClose);return;
      }
      if(state.kind==='coupon'){
        const e=state.snapshot.extraction||{x:0,y:-old.height},extracted=frontTransform({x:r.left-old.left+e.x,y:r.top-old.top+e.y,scale:r.width/old.width,angle:0});
        run(state,[animate(state,state.body,[{opacity:getComputedStyle(state.body).opacity},{opacity:0,offset:.2},{opacity:0}],duration,'linear'),animate(state,state.paper,[{opacity:getComputedStyle(state.paper).opacity},{opacity:0,offset:.2},{opacity:0}],duration,'linear'),animate(state,state.flight,[{transform:getComputedStyle(state.flight).transform,opacity:frontOpacity,clipPath:getComputedStyle(state.flight).clipPath,easing:ease},{offset:.2,opacity:1},{offset:.65,transform:extracted,opacity:1,clipPath:state.snapshot.clip?.open||'none',easing:ease},{transform:finish,opacity:1,clipPath:state.snapshot.clip?.closed||'none'}],duration,'linear')],finishClose);return;
      }
      const jobs=[animate(state,state.body,[{opacity:getComputedStyle(state.body).opacity,offset:0},{opacity:0,offset:.16},{opacity:0,offset:1}],duration),animate(state,state.paper,[{opacity:getComputedStyle(state.paper).opacity,offset:0},{opacity:0,offset:.16},{opacity:0,offset:1}],duration),animate(state,state.flight,[{transform:getComputedStyle(state.flight).transform,opacity:frontOpacity,clipPath:getComputedStyle(state.flight).clipPath,offset:0},{opacity:1,offset:.16},{transform:finish,opacity:1,clipPath:state.snapshot.clip?.closed||'none',offset:1}],duration)];
      run(state,jobs,finishClose);
    }
    async function open(html,{source=null,objectKey='',kind='map',targetSelector=null,pointer=false,capture}={}){
      clean();dialog.scrollTop=0;const generation=openingGeneration;
      const anchored=!!source?.isConnected;
      const content=document.createElement('template');
      content.innerHTML=`<button class="dialog-close icon-button" id="close-note-dialog" aria-label="Close dialog">${closeIcon()}</button>${anchored?'<div class="object-reader-body">'+html+'</div>':html}`;
      content.content.querySelectorAll('img').forEach(image=>{const src=image.getAttribute('src');image.src=window.ScrapbookIntro?.imageURL(src)||src;image.loading='eager';image.decoding='sync';});
      dialog.replaceChildren(content.content);
      const title=dialog.querySelector('h2');if(title){title.id='object-reader-title';dialog.setAttribute('aria-labelledby',title.id);}
      dialog.querySelector('#close-note-dialog').onclick=close;
      const prepared=window.ScrapbookIntro?.decodeImages?await window.ScrapbookIntro.decodeImages(dialog):true;
      if(generation!==openingGeneration)return;
      if(!prepared){window.ScrapbookModalLock.close(dialog);onError();return;}
      let snapshot=null;if(anchored&&!reduced())try{snapshot=kind==='disclosure'?{rect:rectOf(source),getRect:()=>rectOf(source)}:capture?.()||fallback(source);}catch{}
      const animated=!!snapshot&&usable(snapshot.rect)&&typeof dialog.animate==='function'&&!reduced();
      if(!anchored){if(!dialog.open)dialog.showModal();dialog.querySelector('#close-note-dialog').focus({preventScroll:true});phase(null,'reading');return;}
      dialog.classList.add('object-reader');dialog.dataset.readerKind=kind;dialog.dataset.readerMaterial=kind;dialog.dataset.readerObject=objectKey;
      gestureState('idle');
      dialog.classList.toggle('reader-animated',animated);
      dialog.classList.toggle('reader-pointer-open',pointer);
      const state={source,kind,objectKey,targetSelector,snapshot,animated,animations:[],motionId:0,body:dialog.querySelector('.object-reader-body'),resized:false};current=state;
      if(animated)snapshot.conceal?.();
      if(!dialog.open)dialog.showModal();placeClose();dialog.querySelector('#close-note-dialog').focus({preventScroll:true});
      if(objectKey)document.dispatchEvent(new CustomEvent('scrapbook-object-open',{detail:{kind,objectKey}}));
      if(!animated){dialog.classList.add('reader-settled');phase(state,'reading');return;}
      if(kind==='sticker'&&targetSelector){
        const portrait=source.querySelector('.pet-portrait')||source.closest('.pet-portrait'),target=state.body.querySelector(targetSelector);
        if(target&&portrait?.offsetWidth){const ratio=portrait.offsetWidth/portrait.offsetHeight;target.style.setProperty('--portrait-ratio',ratio);if(objectKey?.startsWith('cat-'))target.style.height=(target.offsetWidth/ratio)+'px';}
      }
      if(kind==='photo'&&targetSelector){
        const target=state.body.querySelector(targetSelector),blank=target?.querySelector('.reader-photo-placeholder');
        if(blank){Object.assign(target.style,{height:(target.offsetWidth*snapshot.rect.height/snapshot.rect.width)+'px',display:'flex',flexDirection:'column'});Object.assign(blank.style,{minHeight:'0',flex:'1'});}
      }
      state.destination=rectOf(dialog);const paper=document.createElement('div'),flight=document.createElement('div');paper.className='reader-paper'+(surface(state)?' reader-native-surface':' reader-backdrop-paper');flight.className=kind==='disclosure'?'reader-no-flight':'reader-flight';paper.setAttribute('aria-hidden','true');flight.setAttribute('aria-hidden','true');paper.inert=flight.inert=true;
      paper.innerHTML=kind==='letter'?'<div class="reader-fold-upper"><div class="reader-fold-face reader-fold-front"></div><div class="reader-fold-face reader-fold-back"></div></div><div class="reader-fold-face reader-fold-lower"></div>':'<div class="reader-paper-panel reader-flat-panel"></div>';state.paper=paper;state.upper=paper.querySelector('.reader-fold-upper')||document.createElement('div');state.flight=flight;
      const d=state.destination,r=snapshot.rect;Object.assign(paper.style,{left:d.left+'px',top:d.top+'px',width:d.width+'px',height:d.height+'px'});
      if(snapshot.front)flight.append(snapshot.front);dialog.append(paper);
      if(kind==='letter')paper.querySelector('.reader-fold-back').append(flight);
      else if(kind!=='disclosure'){Object.assign(flight.style,{left:r.left+'px',top:r.top+'px',width:r.width+'px',height:r.height+'px'});dialog.append(flight);}
      state.body.style.opacity='0';state.body.inert=true;dialog.setAttribute('aria-busy','true');phase(state,'opening');
      paper.style.opacity=surface(state)&&kind!=='disclosure'?'1':'0';flight.style.opacity='1';flight.style.clipPath=snapshot.clip?.closed||'none';
      if(kind==='card')paper.style.clipPath=`inset(0 0 ${Math.max(0,100-r.height/(d.height*r.width/d.width)*100)}% 0)`;
      openMotion(state,kind==='letter'?900:kind==='coupon'?880:kind==='disclosure'?320:620,paperStart(state,r),'rotateX(-180deg)',{x:0,y:0,scale:1,angle:0});
    }
    function resize(){
      const state=current;if(!state)return;const next=rectOf(dialog),d=state.destination;
      if(d&&!['left','top','width','height'].some(key=>Math.abs(next[key]-d[key])>.5))return;
      discardGesture(state);
      if(!state.resized){state.resized=true;state.snapshot?.invalidate?.();}
      if(state.phase==='opening'){
        const animation=state.paper.getAnimations()[0];state.openingProgress=Math.max(state.openingProgress||0,animation?.effect.getComputedTiming().progress||0);
        const remaining=Math.max(180,state.motionDuration-(animation?.currentTime||0)),paper=rectOf(state.paper),upper=getComputedStyle(state.upper).transform,front=currentFront(state);
        stop(state,true);state.destination=next;
        Object.assign(state.paper.style,{left:next.left+'px',top:next.top+'px',width:next.width+'px',height:next.height+'px'});
        const start=`translate(${paper.left-next.left}px,${paper.top-next.top}px) scale(${paper.width/next.width},${paper.height/next.height})`;
        placeClose();openMotion(state,remaining,start,upper,front);return;
      }else if(state.phase==='closing'){finishClose(state);return;}
      if(state.paper){const d=state.destination=rectOf(dialog);Object.assign(state.paper.style,{left:d.left+'px',top:d.top+'px',width:d.width+'px',height:d.height+'px'});}
      placeClose();
    }
    function preventBackground(event){if(!dialog.open)return;const p=event.touches?.[0]||event,r=dialog.getBoundingClientRect();if(current&&current.phase!=='reading'||p.clientX<r.left||p.clientX>r.right||p.clientY<r.top||p.clientY>r.bottom)event.preventDefault();}
    // Keep native vertical scrolling until a deliberate downward pull at the
    // top claims the gesture. Touch events can cancel that pull in Safari
    // without assigning touch-action:none to the scrollable reading body.
    dialog.addEventListener('touchstart',event=>{
      ignoreClickUntil=0;
      if(event.touches.length!==1){multiTouch=true;endGesture(true);return;}
      const touch=event.touches[0];startGesture(event.target,touch.clientX,touch.clientY,performance.now(),'touch');
    },{passive:true});
    window.addEventListener('touchmove',event=>{
      if(current?.gesture?.type!=='touch')return;
      if(event.touches.length!==1){endGesture(true);return;}
      const touch=event.touches[0];moveGesture(touch.clientX,touch.clientY,performance.now(),event);
    },{passive:false});
    window.addEventListener('touchstart',event=>{if(event.touches.length>1){multiTouch=true;endGesture(true);}else if(current?.gesture?.type==='pointer')endGesture(true);},{passive:true});
    window.addEventListener('touchend',event=>{if(current?.gesture?.type==='touch')endGesture(event.touches.length>0);if(!event.touches.length)multiTouch=false;},{passive:true});
    window.addEventListener('touchcancel',event=>{if(current?.gesture?.type==='touch')endGesture(true);if(!event.touches.length)multiTouch=false;},{passive:true});
    window.addEventListener('pointerdown',event=>{if(!dialog.open)return;activePointers.add(event.pointerId);if(activePointers.size>1){multiPointer=true;endGesture(true);}},true);
    const releasePointer=event=>{activePointers.delete(event.pointerId);if(!activePointers.size)multiPointer=false;};
    window.addEventListener('pointerup',releasePointer,true);window.addEventListener('pointercancel',releasePointer,true);
    dialog.addEventListener('pointerdown',event=>{
      ignoreClickUntil=0;if(event.pointerType==='touch'||event.button!==0||event.isPrimary===false)return;
      startGesture(event.target,event.clientX,event.clientY,performance.now(),'pointer',event.pointerId);
    });
    window.addEventListener('pointermove',event=>{if(current?.gesture?.type==='pointer'&&current.gesture.pointerId===event.pointerId)moveGesture(event.clientX,event.clientY,performance.now(),event);},{passive:false});
    window.addEventListener('pointerup',event=>{if(current?.gesture?.type==='pointer'&&current.gesture.pointerId===event.pointerId)endGesture();},{passive:true});
    window.addEventListener('pointercancel',event=>{if(current?.gesture?.type==='pointer'&&current.gesture.pointerId===event.pointerId)endGesture(true);},{passive:true});
    dialog.addEventListener('lostpointercapture',event=>{const g=current?.gesture;if(g?.type==='pointer'&&g.pointerId===event.pointerId&&!g.releasing)endGesture(true);});
    dialog.addEventListener('dragstart',event=>{if(current?.gesture)event.preventDefault();});
    dialog.addEventListener('click',event=>{if(performance.now()<ignoreClickUntil){ignoreClickUntil=0;event.preventDefault();event.stopImmediatePropagation();}},true);
    document.addEventListener('selectionchange',()=>{if(current?.gesture&&selectedText())endGesture(true);});
    window.addEventListener('blur',()=>{activePointers.clear();multiPointer=multiTouch=false;if(current)discardGesture(current);});
    dialog.addEventListener('cancel',event=>{if(current){event.preventDefault();close();}});dialog.addEventListener('close',()=>{if(!dialog.open)clean();});
    dialog.addEventListener('keydown',event=>{
      dialog.classList.remove('reader-pointer-open');
      if(current?.gesture&&event.key!=='Escape')discardGesture(current);
      if(!dialog.open||!['ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(event.key)||event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
      event.preventDefault();if(current&&current.phase!=='reading')return;
      const max=Math.max(0,dialog.scrollHeight-dialog.clientHeight),page=dialog.clientHeight*.85;
      const top=event.key==='Home'||event.metaKey&&event.key==='ArrowUp'?0:event.key==='End'||event.metaKey&&event.key==='ArrowDown'?max:dialog.scrollTop+({ArrowUp:-44,ArrowDown:44,PageUp:-page,PageDown:page}[event.key]||0);
      dialog.scrollTop=Math.max(0,Math.min(max,top));
    },true);
    dialog.addEventListener('wheel',preventBackground,{passive:false});dialog.addEventListener('touchmove',preventBackground,{passive:false});
    window.addEventListener('resize',resize);window.visualViewport?.addEventListener('resize',resize);
    if(window.ResizeObserver)new ResizeObserver(()=>{
      const d=current?.destination;if(!d||!dialog.open)return;const next=rectOf(dialog);
      if(['left','top','width','height'].some(key=>Math.abs(next[key]-d[key])>.5))resize();
    }).observe(dialog);
    matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change',()=>{if(current)discardGesture(current);if(current?.phase==='opening')settle(current);else if(current?.phase==='closing')finishClose(current);});
    document.addEventListener('visibilitychange',()=>{if(document.hidden){activePointers.clear();multiPointer=multiTouch=false;if(current){discardGesture(current);if(current.phase==='closing')finishClose(current);else if(current.phase==='opening')settle(current);}}});
    return {open,close};
  }};
})();

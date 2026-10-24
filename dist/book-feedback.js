/* Tactile feedback belongs to the existing controls, never to a second hit layer. */
(() => {
  'use strict';
  window.ScrapbookObjectFeedback={create({app,onChange}){
    let hovered=null,focused=null,pressed=null,shown=null,mode='none',pointer=null,releaseTimer=0,pressedAt=0;
    const listeners=[];
    const listen=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
    const object=target=>{
      const item=target instanceof Element?target.closest('[data-book-object]'):null;
      const control=item?.closest('button,a');
      return item&&app.contains(item)&&control&&!control.disabled&&!control.closest('[inert],[aria-hidden="true"]')?item:null;
    };
    function paint(immediate=false){
      const next=pressed||focused||hovered,nextMode=pressed?'press':focused?'focus':hovered?'hover':'none';
      if(next===shown&&nextMode===mode&&!immediate)return;
      shown?.classList.remove('object-hovered','object-pressed','object-focused');
      shown=next;mode=nextMode;
      shown?.classList.add(mode==='press'?'object-pressed':mode==='focus'?'object-focused':'object-hovered');
      onChange?.({key:shown?.dataset.bookObject||null,mode,immediate});
    }
    function reset(){
      clearTimeout(releaseTimer);hovered=focused=pressed=pointer=null;paint(true);
    }
    listen(app,'pointerover',event=>{
      if(event.pointerType==='touch'||pressed)return;
      hovered=object(event.target);paint();
    });
    listen(app,'pointerout',event=>{
      if(event.pointerType==='touch'||pressed)return;
      hovered=object(event.relatedTarget);paint();
    });
    listen(app,'pointerdown',event=>{
      if(event.button!==0||event.isPrimary===false)return;
      const item=object(event.target);if(!item)return;
      clearTimeout(releaseTimer);hovered=focused=null;pressed=item;pressedAt=performance.now();
      pointer={id:event.pointerId,x:event.clientX,y:event.clientY,type:event.pointerType};paint();
    });
    listen(window,'pointermove',event=>{
      if(!pointer||event.pointerId!==pointer.id)return;
      if(Math.hypot(event.clientX-pointer.x,event.clientY-pointer.y)>9)reset();
    },{passive:true});
    listen(window,'pointerup',event=>{
      if(!pointer||event.pointerId!==pointer.id)return;
      const mouse=pointer.type==='mouse',item=object(event.target);pointer=null;
      releaseTimer=setTimeout(()=>{pressed=null;hovered=mouse?item:null;paint();},Math.max(0,140-(performance.now()-pressedAt)));
    },{passive:true});
    listen(window,'pointercancel',reset,{passive:true});
    listen(document,'focusin',event=>{
      const item=object(event.target);focused=item&&event.target.matches(':focus-visible')?item:null;
      if(!app.contains(event.target))reset();else paint();
    });
    listen(app,'focusout',()=>{focused=null;paint();});
    listen(app,'keydown',event=>{
      if((event.key==='Enter'||event.key===' ')&&!event.repeat){const item=object(event.target);if(item){pressed=item;paint();}}
    });
    listen(window,'keyup',event=>{if(event.key==='Enter'||event.key===' '){pressed=null;paint();}});
    listen(window,'scroll',reset,{passive:true,capture:true});
    listen(window,'wheel',reset,{passive:true});
    listen(window,'resize',reset,{passive:true});
    if(window.visualViewport)listen(window.visualViewport,'resize',reset,{passive:true});
    listen(window,'blur',reset);
    listen(document,'visibilitychange',()=>{if(document.hidden)reset();});
    listen(app,'book-graphics-fallback',reset,true);
    return {reset,destroy(){reset();listeners.forEach(remove=>remove());}};
  }};
})();

(() => {
  'use strict';
  const root=document.documentElement,body=document.body;
  const dialogs=()=>[...document.querySelectorAll('dialog[open]')];
  const topDialog=()=>{const open=dialogs();return open.find(dialog=>dialog.contains(document.activeElement))||open.at(-1);};
  let held=null,touch=null;
  const save=(node,properties)=>properties.map(name=>[node,name,node.style.getPropertyValue(name),node.style.getPropertyPriority(name)]);
  function acquire(){
    if(held)return;
    // Stop the book at its displayed pose before measuring a lifted object.
    window.dispatchEvent(new CustomEvent('book-modal-lock',{detail:{locked:true}}));
    const styles=[...save(root,['overflow','overscroll-behavior','scroll-behavior','scrollbar-gutter']),...save(body,['overflow','overscroll-behavior','padding-right','position','top','left','width'])];
    held={x:scrollX,y:scrollY,styles,fixed:!document.querySelector('.book-film')};
    const gutter=innerWidth-root.clientWidth;
    if(CSS.supports('scrollbar-gutter','stable'))root.style.setProperty('scrollbar-gutter','stable');
    else if(gutter)body.style.setProperty('padding-right',(parseFloat(getComputedStyle(body).paddingRight)+gutter)+'px');
    root.style.setProperty('overflow','hidden');body.style.setProperty('overflow','hidden');
    root.style.setProperty('overscroll-behavior','none');body.style.setProperty('overscroll-behavior','none');
    root.style.setProperty('scroll-behavior','auto');root.dataset.bookModalLocked='true';
    // Native mobile pages need a fixed reading surface: WebKit can defer
    // document scroll events. Pinned books keep their existing geometry.
    if(held.fixed){
      body.style.setProperty('position','fixed');body.style.setProperty('top',-held.y+'px');
      body.style.setProperty('left',-held.x+'px');body.style.setProperty('width','100%');
    }
    // Cancel an already-running native smooth scroll as well as new input.
    window.scrollTo({left:held.fixed?0:held.x,top:held.fixed?0:held.y,behavior:'instant'});
  }
  function release(){
    if(!held||dialogs().length)return;
    const previous=held;held=null;touch=null;
    previous.styles.forEach(([node,name,value,priority])=>{if(value)node.style.setProperty(name,value,priority);else node.style.removeProperty(name);});
    delete root.dataset.bookModalLocked;
    window.scrollTo({left:previous.x,top:previous.y,behavior:'instant'});
    window.dispatchEvent(new CustomEvent('book-modal-lock',{detail:{locked:false}}));
  }
  function sync(){if(dialogs().length)acquire();else release();}
  function close(dialog){dialog.close();sync();}
  function keepPosition(){
    if(!held)return;
    const x=held.fixed?0:held.x,y=held.fixed?0:held.y;
    if(Math.abs(scrollY-y)>.5||Math.abs(scrollX-x)>.5)window.scrollTo({left:x,top:y,behavior:'instant'});
  }
  function scrollable(target,dialog,dx,dy){
    const vertical=Math.abs(dy)>=Math.abs(dx),delta=vertical?dy:dx;
    if(!delta)return true;
    for(let node=target instanceof Element?target:target?.parentElement;node;node=node.parentElement){
      const css=getComputedStyle(node),overflow=vertical?css.overflowY:css.overflowX;
      const max=vertical?node.scrollHeight-node.clientHeight:node.scrollWidth-node.clientWidth;
      const position=vertical?node.scrollTop:node.scrollLeft;
      if(/^(auto|scroll)$/.test(overflow)&&max>1&&(delta<0?position>0:position<max-1))return true;
      if(node===dialog)break;
    }
    return false;
  }
  function contain(event){
    if(!held||event.type==='wheel'&&event.ctrlKey)return;
    const dialog=topDialog();if(!dialog)return;
    let point=event,dx=event.deltaX||0,dy=event.deltaY||0;
    if(event.type==='touchmove'){
      if(event.touches.length!==1){touch=null;return;}
      point=event.touches[0];if(!touch){touch={x:point.clientX,y:point.clientY};return;}
      dx=touch.x-point.clientX;dy=touch.y-point.clientY;touch={x:point.clientX,y:point.clientY};
    }
    const r=dialog.getBoundingClientRect(),inside=event.composedPath().includes(dialog)&&point.clientX>=r.left&&point.clientX<=r.right&&point.clientY>=r.top&&point.clientY<=r.bottom;
    const moving=['opening','closing'].includes(dialog.dataset.readerState);
    if(moving||!inside||!scrollable(event.target,dialog,dx,dy))if(event.cancelable)event.preventDefault();
  }
  document.addEventListener('touchstart',event=>{touch=held&&event.touches.length===1?{x:event.touches[0].clientX,y:event.touches[0].clientY}:null;},{capture:true,passive:true});
  document.addEventListener('touchend',()=>{touch=null;},{capture:true,passive:true});
  document.addEventListener('touchcancel',()=>{touch=null;},{capture:true,passive:true});
  document.addEventListener('wheel',contain,{capture:true,passive:false});
  document.addEventListener('touchmove',contain,{capture:true,passive:false});
  document.addEventListener('keydown',event=>{
    if(!held||event.key!==' '||event.altKey||event.ctrlKey||event.metaKey)return;
    const dialog=topDialog();if(!dialog||event.target.closest('input,textarea,select,button,summary,a[href],[contenteditable="true"],audio,video,.photo-writing'))return;
    event.preventDefault();
    if(!['opening','closing'].includes(dialog.dataset.readerState))dialog.scrollTop+=dialog.clientHeight*.85*(event.shiftKey?-1:1);
  },true);
  window.addEventListener('scroll',keepPosition,{capture:true,passive:true});
  document.addEventListener('close',sync,true);
  const observer=new MutationObserver(sync);
  document.querySelectorAll('dialog').forEach(dialog=>observer.observe(dialog,{attributes:true,attributeFilter:['open']}));
  window.ScrapbookModalLock={acquire,release,sync,close,get isLocked(){return !!held;}};
})();

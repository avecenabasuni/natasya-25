(() => {
  'use strict';
  const html=document.documentElement,started=performance.now();
  const extraImages=['assets/materials/atlas.webp','assets/materials/paper.webp','assets/materials/linen.webp','assets/illustrations/luxembourg-keepsake-map.webp','assets/illustrations/trier-keepsake-map.webp','assets/icons/x.svg'];
  const navigationKeys=['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '];
  let stage=null,status=null,actions=null,progress=null,retry=null,next=null,initialized=false,revealed=false,leaving=false,run=0,continueReading=null,names=null;
  let warm=false;try{warm=sessionStorage.getItem('little-world:intro-ready')==='1';}catch{}
  html.dataset.introWarm=String(warm);
  const timeoutError=()=>Object.assign(new Error('Preparation timed out'),{name:'TimeoutError'});
  function bounded(promise,ms=10000){
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>reject(timeoutError()),ms);
      Promise.resolve(promise).then(value=>{clearTimeout(timer);resolve(value);},error=>{clearTimeout(timer);reject(error);});
    });
  }
  function setState(value){html.dataset.introState=value;if(stage)stage.dataset.introState=value;}
  function setNames(config){
    names=config;if(!stage)return;
    const title=document.getElementById('intro-title'),from=document.getElementById('intro-from');
    if(title)title.textContent='For '+(config?.name||'Tasya')+'.';
    if(from)from.textContent='From '+(config?.sender||'Ave')+', with love.';
  }
  function blockInput(event){
    if(revealed)return;
    if(event.target?.closest?.('#intro-actions'))return;
    if(event.type!=='keydown'||navigationKeys.includes(event.key)){event.preventDefault();event.stopPropagation();}
  }
  async function reveal(focus=false){
    if(revealed||leaving)return;leaving=true;clearTimeout(watchdog);
    if(next)next.disabled=true;if(retry)retry.disabled=true;
    setState('ready');if(status)status.textContent='Your book is ready.';
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const wait=warm||reduced?0:Math.max(0,450-(performance.now()-started));
    if(wait)await new Promise(resolve=>setTimeout(resolve,wait));
    setState('leaving');
    await new Promise(resolve=>setTimeout(resolve,warm||reduced?80:500));
    revealed=true;setState('done');stage?.remove();html.classList.remove('book-is-preparing');
    document.querySelectorAll('.site-header,#app,.site-footer,.skip-link').forEach(node=>node.removeAttribute('inert'));
    window.removeEventListener('wheel',blockInput,true);window.removeEventListener('touchmove',blockInput,true);window.removeEventListener('keydown',blockInput,true);
    try{sessionStorage.setItem('little-world:intro-ready','1');}catch{}
    if(focus)document.querySelector('.open-book')?.focus({preventScroll:true});
  }
  function initialize(){
    if(initialized)return true;stage=document.getElementById('book-intro');if(!stage)return false;
    initialized=true;status=document.getElementById('intro-status');actions=document.getElementById('intro-actions');progress=document.getElementById('intro-progress');retry=document.getElementById('intro-retry');next=document.getElementById('intro-continue');
    retry?.addEventListener('click',()=>location.reload());
    next?.addEventListener('click',async()=>{
      if(!continueReading||leaving||revealed)return;
      next.disabled=true;if(retry)retry.disabled=true;if(status)status.textContent='Opening your pages…';
      try{await bounded(continueReading(),3000);await reveal(true);}catch(error){showBlocked(error);}
    });
    setState('preparing');if(names)setNames(names);return true;
  }
  function showBlocked(error,count=1){
    if(revealed||leaving)return;initialize();clearTimeout(watchdog);
    setState('blocked');if(stage){stage.dataset.introErrors=String(count);stage.setAttribute('aria-busy','false');}
    if(status)status.textContent=error?.name==='TimeoutError'?'This is taking a little longer.':'A few pieces couldn’t load.';
    if(progress)progress.hidden=true;if(actions)actions.hidden=false;if(retry)retry.disabled=false;
    if(next){next.hidden=!continueReading;next.disabled=!continueReading;}
  }
  function fail(error){++run;showBlocked(error);}
  function imageReady(src){
    return new Promise(resolve=>{
      const image=new Image();let settled=false;
      const finish=ok=>{if(settled)return;settled=true;image.onload=image.onerror=null;resolve(ok);};
      image.onload=()=>{if(image.decode)image.decode().then(()=>finish(true),()=>finish(false));else finish(true);};
      image.onerror=()=>finish(false);image.src=src;
      if(image.complete&&image.naturalWidth){if(image.decode)image.decode().then(()=>finish(true),()=>finish(false));else finish(true);}
    });
  }
  async function prepare({config,ready,audioReady,continueReading:continueCallback}){
    if(revealed||leaving)return;initialize();clearTimeout(watchdog);const token=++run;continueReading=continueCallback;setNames(config);
    setState('preparing');if(stage){stage.dataset.introErrors='0';stage.setAttribute('aria-busy','true');}
    if(status)status.textContent='Preparing your pages…';if(progress)progress.hidden=false;if(actions)actions.hidden=true;
    const sources=[...document.querySelectorAll('img[src]')].map(image=>image.currentSrc||image.src).concat(extraImages,config?.photos||[],config?.germanyPhotos||[]).filter(Boolean);
    const urls=[...new Set(sources.map(src=>{try{return new URL(src,location.href).href;}catch{return src;}}))];
    const tasks=urls.map(imageReady);
    tasks.push(Promise.resolve(document.fonts?.ready).then(()=>!document.fonts||['500 32px Fraunces','400 16px "Source Sans 3"'].every(font=>document.fonts.check(font,(config?.name||'Tasya')+' '+(config?.sender||'Ave')))));
    tasks.push(Promise.resolve().then(async()=>{
      for(;;){
        const current=document.querySelector('.book-film');
        await (typeof ready==='function'?ready():ready);
        const latest=document.querySelector('.book-film');
        if(current!==latest&&typeof ready==='function')continue;
        return !latest||!['false','partial'].includes(latest.dataset.assetsReady);
      }
    }).catch(()=>false));
    tasks.push([...document.querySelectorAll('link[rel="stylesheet"]')].every(link=>!!link.sheet));
    tasks.push(Promise.resolve(audioReady).then(value=>value!==false,()=>false));
    let settled=0;if(stage){stage.dataset.introAssetsTotal=String(tasks.length);stage.dataset.introAssetsSettled='0';}
    const all=Promise.all(tasks.map(task=>Promise.resolve(task).catch(()=>false).then(ok=>{settled++;if(stage)stage.dataset.introAssetsSettled=String(settled);return ok;})));
    try{
      const results=await bounded(all,12000);if(token!==run||revealed)return;
      const errors=results.filter(ok=>!ok).length;
      if(errors){showBlocked(new Error('Some pieces are unavailable'),errors);return;}
      await reveal();
    }catch(error){if(token===run&&!revealed)showBlocked(error,Math.max(1,tasks.length-settled));}
  }
  const watchdog=setTimeout(()=>fail(timeoutError()),15000);
  window.ScrapbookIntro={setNames,bounded,fail,prepare,get state(){return html.dataset.introState;}};
  window.addEventListener('wheel',blockInput,{capture:true,passive:false});window.addEventListener('touchmove',blockInput,{capture:true,passive:false});window.addEventListener('keydown',blockInput,{capture:true});
  if(!initialize())document.addEventListener('DOMContentLoaded',initialize,{once:true});
})();

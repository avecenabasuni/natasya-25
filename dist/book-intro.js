(() => {
  'use strict';
  const html=document.documentElement,started=performance.now();
  const iconNames=['airplane-tilt','arrow-counter-clockwise','arrow-left','arrow-right','book-open','cat','check','copy','download-simple','gift','lightbulb','lock','map-trifold','music-notes','pencil-simple','speaker-high','speaker-slash','ticket','vinyl-record','x'];
  const extraImages=[
    'assets/cat.svg','assets/materials/atlas.webp','assets/materials/paper.webp','assets/materials/linen.webp',
    'assets/illustrations/birthday-collage-cover.webp','assets/illustrations/cover-tasya-bouquet.jpg','assets/illustrations/chapter-dividers.png',
    'assets/illustrations/trier-luxembourg-route.webp','assets/illustrations/luxembourg-keepsake-map.webp','assets/illustrations/trier-keepsake-map.webp',
    'assets/cutouts/five-cats.webp','assets/cutouts/bonnie.webp','assets/cutouts/connie.webp','assets/cutouts/wonnie.webp','assets/cutouts/birthday-cake.webp',
    'assets/cutouts/favorites-stickers.png','assets/cutouts/scrapbook-ephemera.png','assets/cutouts/alex-albon-portrait.webp','assets/cutouts/lewis-hamilton-portrait.webp',
    'assets/cutouts/george-russell-portrait.webp','assets/cutouts/lando-norris-portrait.webp','assets/cutouts/oscar-piastri-portrait.webp',
    'assets/cutouts/taylor-swift-photo.png','assets/cutouts/olivia-rodrigo-photo.png','assets/cutouts/olivia-dean-photo.jpg','assets/cutouts/sienna-spiro-photo.jpg',
    'assets/cutouts/lionel-messi-portrait.png','assets/cutouts/lamine-yamal-portrait.png','assets/cutouts/fc-barcelona-crest.png',
    'assets/cutouts/birthday-25-ephemera.webp','assets/cutouts/romance-keepsakes.webp',...iconNames.map(name=>'assets/icons/'+name+'.svg')
  ];
  const navigationKeys=['ArrowUp','ArrowDown','PageUp','PageDown','Home','End',' '],decodedImages=new Map(),originalSources=new Map();
  let stage,status,actions,progress,retry,initialized=false,revealed=false,leaving=false,run=0,names,graphicsReady,introMarkup;
  let warm=false;try{warm=sessionStorage.getItem('little-world:intro-ready')==='1';}catch{}
  html.dataset.introWarm=String(warm);
  const timeoutError=()=>Object.assign(new Error('Preparation timed out'),{name:'TimeoutError'});
  const delay=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  const frame=()=>new Promise(resolve=>requestAnimationFrame(resolve));
  const absolute=src=>new URL(src,location.href).href;
  const sourceKey=src=>originalSources.get(absolute(src))||absolute(src);
  const imageURL=src=>decodedImages.get(sourceKey(src))?.src||src;
  function bounded(promise,ms=10000){
    return new Promise((resolve,reject)=>{
      const timer=setTimeout(()=>reject(timeoutError()),ms);
      Promise.resolve(promise).then(value=>{clearTimeout(timer);resolve(value);},error=>{clearTimeout(timer);reject(error);});
    });
  }
  function setState(value){html.dataset.introState=value;if(stage)stage.dataset.introState=value;}
  function setNames(config){
    names=config;if(!stage)return;
    document.getElementById('intro-title').textContent='For '+(config?.name||'Tasya')+'.';
    document.getElementById('intro-from').textContent='From '+(config?.sender||'Ave')+', with love.';
  }
  function blockInput(event){
    if(revealed||event.target?.closest?.('#intro-actions'))return;
    if(event.type!=='keydown'||navigationKeys.includes(event.key)){event.preventDefault();event.stopPropagation();}
  }
  function initialize(){
    if(initialized)return true;stage=document.getElementById('book-intro');if(!stage)return false;
    if(!introMarkup)introMarkup=stage.outerHTML;
    initialized=true;status=document.getElementById('intro-status');actions=document.getElementById('intro-actions');progress=document.getElementById('intro-progress');retry=document.getElementById('intro-retry');
    retry?.addEventListener('click',()=>location.reload());setState('preparing');if(names)setNames(names);return true;
  }
  function showBlocked(error,count=1){
    if(revealed)return;leaving=false;initialize();clearTimeout(watchdog);setState('blocked');
    if(stage){stage.dataset.introErrors=String(count);stage.setAttribute('aria-busy','false');}
    if(status)status.textContent=error?.name==='TimeoutError'?'Your pages are still loading. Please try again.':'Some pieces couldn’t load. Please try again.';
    if(progress)progress.hidden=true;if(actions)actions.hidden=false;if(retry)retry.disabled=false;
  }
  function fail(error){++run;showBlocked(error);}
  function reopen(){
    if(!revealed)throw new Error('The current book is still preparing');
    const template=document.createElement('template');template.innerHTML=introMarkup;document.body.prepend(template.content);
    revealed=false;leaving=false;initialized=false;warm=true;html.dataset.introWarm='true';html.classList.add('book-is-preparing');
    document.querySelectorAll('.site-header,#app,.site-footer,.skip-link').forEach(node=>node.setAttribute('inert',''));
    window.addEventListener('wheel',blockInput,{capture:true,passive:false});window.addEventListener('touchmove',blockInput,{capture:true,passive:false});window.addEventListener('keydown',blockInput,{capture:true});
    initialize();watchdog=setTimeout(()=>fail(timeoutError()),15000);
  }
  function imageReady(src){
    const key=sourceKey(src);if(decodedImages.has(key))return Promise.resolve(true);
    return fetch(key).then(response=>{if(!response.ok)throw new Error('Image unavailable');return response.blob();}).then(async blob=>{
      const image=new Image(),url=URL.createObjectURL(blob);image.decoding='sync';image.src=url;
      try{await image.decode();if(!image.complete||!image.naturalWidth)throw new Error('Image decode failed');}
      catch(error){URL.revokeObjectURL(url);throw error;}
      decodedImages.set(key,image);originalSources.set(url,key);return true;
    }).catch(()=>false);
  }
  async function decodeImages(root=document){
    const images=[...root.querySelectorAll('img[src]')];
    const results=await Promise.all(images.map(async image=>{
      image.loading='eager';image.decoding='sync';
      const key=sourceKey(image.dataset.preparedSrc||image.currentSrc||image.src);
      if(!await imageReady(key))return false;
      image.dataset.preparedSrc=key;if(image.src!==imageURL(key))image.src=imageURL(key);
      try{if(image.decode)await image.decode();return image.complete&&image.naturalWidth>0;}catch{return false;}
    }));
    return results.every(Boolean);
  }
  async function fontsReady(){
    if(!document.fonts)return false;
    const faces=[...document.fonts];await Promise.all(faces.map(face=>face.load()));await document.fonts.ready;
    return faces.length>=4&&faces.every(face=>face.status==='loaded');
  }
  function currentSceneReady(){
    const film=document.querySelector('.book-film');return !film||!['false','partial'].includes(film.dataset.assetsReady);
  }
  async function verifyCurrent(){
    for(;;){
      const film=document.querySelector('.book-film');await (typeof graphicsReady==='function'?graphicsReady():graphicsReady);
      if(film!==document.querySelector('.book-film'))continue;
      if(!currentSceneReady()||!await decodeImages()||![...document.fonts].every(face=>face.status==='loaded'))throw new Error('Pages are not ready');
      await frame();await frame();if(film!==document.querySelector('.book-film'))continue;
      const images=[...document.querySelectorAll('img[src]')];if(!currentSceneReady())throw new Error('The book is not ready');
      if(images.some(image=>!image.complete||!image.naturalWidth||!decodedImages.has(sourceKey(image.dataset.preparedSrc||image.currentSrc||image.src))))continue;
      return film;
    }
  }
  async function reveal(token){
    if(revealed||leaving)return;leaving=true;clearTimeout(watchdog);if(retry)retry.disabled=true;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!warm&&!reduced)await delay(Math.max(0,450-(performance.now()-started)));
    for(;;){
      const film=await bounded(verifyCurrent(),12000);if(token!==run||revealed)return;
      setState('ready');status.textContent='Your book is ready.';setState('leaving');await delay(warm||reduced?80:500);
      if(film!==document.querySelector('.book-film')||!currentSceneReady()){setState('preparing');status.textContent='Preparing your pages…';continue;}
      const confirmed=await bounded(verifyCurrent(),12000);if(token!==run||revealed)return;
      if(film!==confirmed){setState('preparing');continue;}
      html.dataset.introDecodedImages=String(decodedImages.size);html.dataset.introDecodedFonts=String([...document.fonts].filter(face=>face.status==='loaded').length);
      // Release only in the same task as the last current-scene/image check.
      revealed=true;setState('done');stage?.remove();html.classList.remove('book-is-preparing');
      document.querySelectorAll('.site-header,#app,.site-footer,.skip-link').forEach(node=>node.removeAttribute('inert'));
      window.removeEventListener('wheel',blockInput,true);window.removeEventListener('touchmove',blockInput,true);window.removeEventListener('keydown',blockInput,true);
      try{sessionStorage.setItem('little-world:intro-ready','1');}catch{}return;
    }
  }
  async function prepare({config,ready,audioReady}){
    if(revealed||leaving)return;initialize();clearTimeout(watchdog);const token=++run;graphicsReady=ready;setNames(config);setState('preparing');
    stage.dataset.introErrors='0';stage.setAttribute('aria-busy','true');status.textContent='Preparing your pages…';progress.hidden=false;actions.hidden=true;
    const sources=[...document.querySelectorAll('img[src]')].map(image=>image.currentSrc||image.src).concat(extraImages,config?.photos||[],config?.germanyPhotos||[]).filter(Boolean);
    const urls=[...new Set(sources.map(absolute))],tasks=urls.map(imageReady);
    tasks.push(fontsReady(),Promise.resolve(audioReady).then(value=>value===true,()=>false));
    tasks.push(Promise.resolve().then(async()=>{await (typeof ready==='function'?ready():ready);return true;}).catch(()=>false));
    tasks.push([...document.querySelectorAll('link[rel="stylesheet"]')].every(link=>!!link.sheet));
    tasks.push(['ScrapbookObjectReader','ScrapbookAudio','ScrapbookStickers','ScrapbookDividers','ScrapbookPhotoFinish','ScrapbookPaperFinish','ScrapbookDiscovery','ScrapbookObjectFeedback','ScrapbookModalLock','ScrapbookPersonalization','BookExperience','createThreeBookVisual','gsap','ScrollTrigger'].every(name=>!!window[name]));
    let settled=0;stage.dataset.introAssetsTotal=String(tasks.length);stage.dataset.introAssetsSettled='0';
    const all=Promise.all(tasks.map(task=>Promise.resolve(task).catch(()=>false).then(ok=>{settled++;stage.dataset.introAssetsSettled=String(settled);return ok;})));
    try{
      const results=await bounded(all,12000);if(token!==run||revealed)return;
      const errors=results.filter(ok=>!ok).length;if(errors){showBlocked(new Error('Some pieces are unavailable'),errors);return;}
      for(const kind of['atlas','paper','linen'])html.style.setProperty('--prepared-'+kind,`url("${imageURL('assets/materials/'+kind+'.webp')}")`);
      html.dataset.assetsPrepared='true';
      await reveal(token);
    }catch(error){if(token===run&&!revealed)showBlocked(error,Math.max(1,tasks.length-settled));}
  }
  let watchdog=setTimeout(()=>fail(timeoutError()),15000);
  window.ScrapbookIntro={setNames,bounded,fail,prepare,reopen,decodeImages,imageURL,get state(){return html.dataset.introState;}};
  window.addEventListener('wheel',blockInput,{capture:true,passive:false});window.addEventListener('touchmove',blockInput,{capture:true,passive:false});window.addEventListener('keydown',blockInput,{capture:true});
  if(!initialize())document.addEventListener('DOMContentLoaded',initialize,{once:true});
})();

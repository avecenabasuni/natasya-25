(() => {
  'use strict';
  const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaults=structuredClone(window.BIRTHDAY_CONFIG);
  const trip=window.SCRAPBOOK_TRIP;
  const ownerView=new URLSearchParams(location.search).get('edit')==='1';
  document.documentElement.classList.toggle('owner-view',ownerView);
  const artists=['Olivia Rodrigo','Taylor Swift','Olivia Dean','Sienna Spiro'];
  // Migrate exact old example copy only. The owner's own writing stays intact.
  const oldExamples={
    intro:'Tentang hal yang kamu suka, tentang kita, dan tentang momen yang ingin aku simpan.',
    dedication:'Ada hadiah yang bisa dibungkus. Ada juga yang lebih enak disimpan dalam halaman.\n\nAku ingin kamu punya buku yang bisa dibuka kapan pun. Sedikit tentang kamu, sedikit tentang kita, dan ruang untuk cerita yang masih akan kita tulis.',
    distanceNote:'Dari tempatku ke tempatmu, ada jarak yang belum bisa dilipat. Jadi untuk sekarang, aku kirim beberapa halaman.\n\nSemoga ketika kamu membukanya, rasanya seperti aku sedang duduk di sebelahmu.',
    letter:'Selamat ulang tahun, sayang.\n\nAku pengen kamu punya sesuatu yang bisa kamu buka kapan pun kamu kangen. Sesuatu yang menyimpan hal-hal kecil tentang kamu, tentang kita, dan tentang semua momen yang masih ingin kita punya.\n\nSemoga tahun ini membawa banyak hal baik buat kamu. Semoga kamu selalu punya alasan untuk tertawa, ruang untuk tumbuh, dan keberanian untuk mengejar yang kamu inginkan.\n\nAku senang bisa jadi bagian dari ceritamu. Terima kasih sudah jadi kamu.'
  };
  const oldArtistExamples={
    'Olivia Rodrigo':'Buat semua perasaan yang kadang paling gampang diceritakan lewat musik.',
    'Taylor Swift':'Kalau cerita kita punya soundtrack, pasti ada tempat buat lagu favoritmu.',
    'Olivia Dean':'Untuk hari yang pelan, minuman hangat, dan waktu yang kita habiskan bareng.',
    'Sienna Spiro':'Untuk suara yang kamu suka, dan momen tenang yang ingin aku bagi sama kamu.'
  };
  const recentExamples={intro:'Sedikit tentang kamu, sedikit tentang kita. Kubuat supaya bisa kamu buka kapan pun kamu kangen.',distanceNote:'Jarak memang ada. Tapi aku tetap ingin dekat, lewat hal kecil seperti buku ini.',letter:'Selamat ulang tahun, sayang.\n\nSemoga kamu selalu merasa disayang dan berani mengejar hal yang kamu mau.\n\nAku senang bisa ada di ceritamu.'};
  let config=structuredClone(defaults), db=null, story=null, toastTimer, objectReader=null, personalizer=null, music=null;
  const icon=name=>story?.icon(name)||'';
  const modalLock=window.ScrapbookModalLock;
  const safeImage=v=>typeof v==='string'&&(/^assets\/[a-zA-Z0-9._/-]+$/.test(v)||/^https:\/\//.test(v)||/^data:image\/(jpeg|png|webp);base64,[a-zA-Z0-9+/=]+$/.test(v))?v:'';
  const safeSongLink=v=>{try{const url=new URL(v);return url.protocol==='https:'?url.href:'';}catch{return '';}};
  async function preparePrintFonts(value){
    const sample=[value.name,value.sender,'Trier Luxembourg October November Heated blanket'].join(' ');
    await Promise.allSettled(['500 32px Fraunces','400 16px "Source Sans 3"','400 22px "Kalam"'].map(font=>document.fonts.load(font,sample)));
    if([...document.fonts].some(face=>face.family.includes('Kalam')&&face.status==='error')){
      const retryFont=new URL('assets/fonts/kalam-regular.woff',location.href);retryFont.searchParams.set('retry',String(Date.now()));
      for(const sheet of document.styleSheets){
        if(!sheet.href?.includes('handwritten-notes.css'))continue;
        for(const rule of sheet.cssRules)if(rule.type===CSSRule.FONT_FACE_RULE&&rule.style.getPropertyValue('font-family').includes('Kalam'))rule.style.setProperty('src',`url("${retryFont.href}") format("woff")`);
      }
      await Promise.allSettled([document.fonts.load('400 22px "Kalam"',sample)]);
    }
    await document.fonts.ready;
  }
  function normalize(c){
    const out=structuredClone(defaults);
    for(const k of ['name','sender','intro','dedication','distanceNote','letter','giftNote'])if(typeof c?.[k]==='string')out[k]=c[k].slice(0,k==='letter'?15000:['intro','dedication','distanceNote','giftNote'].includes(k)?4000:60);
    out.schemaVersion=2;
    if(typeof c?.coverPhoto==='string')out.coverPhoto=safeImage(c.coverPhoto)||defaults.coverPhoto;
    for(const [key,size]of [['catNotes',2000],['mealNotes',4000]])if(Array.isArray(c?.[key]))out[key]=defaults[key].map((text,i)=>typeof c[key][i]==='string'?c[key][i].slice(0,size):text);
    if(typeof c?.featuredPhoto==='string'&&/^(auto|trip:[0-3]|memory:[0-5])$/.test(c.featuredPhoto))out.featuredPhoto=c.featuredPhoto;
    for(const k of ['photos','germanyPhotos'])if(Array.isArray(c?.[k]))out[k]=defaults[k].map((_,i)=>safeImage(c[k][i]));
    for(const k of ['captions','germanyCaptions','littleThings','wishes'])if(Array.isArray(c?.[k]))out[k]=defaults[k].map((_,i)=>typeof c[k][i]==='string'?c[k][i].slice(0,['captions','germanyCaptions'].includes(k)?4000:1200):defaults[k][i]);
    for(const a of artists)if(typeof c?.artistNotes?.[a]==='string')out.artistNotes[a]=c.artistNotes[a].slice(0,2000);
    for(const k of ['songTitles','songLinks'])for(const a of artists)if(typeof c?.[k]?.[a]==='string')out[k][a]=k==='songLinks'?safeSongLink(c[k][a].slice(0,1000)):c[k][a].slice(0,180);
    for(const key of ['title','artist','url'])if(typeof c?.memorableSong?.[key]==='string')out.memorableSong[key]=key==='url'?safeSongLink(c.memorableSong[key].slice(0,1000)):c.memorableSong[key].slice(0,180).trim();
    if(out.intro==='Aku menyimpan hal-hal yang kamu suka dalam buku ini. Temukan empat benda kecil untuk membuka kejutanmu.')out.intro=defaults.intro;
    for(const k of Object.keys(oldExamples))if(out[k]===oldExamples[k])out[k]=defaults[k];
    for(const k of Object.keys(recentExamples))if(out[k]===recentExamples[k])out[k]=defaults[k];
    for(const a of artists)if(out.artistNotes[a]===oldArtistExamples[a])out.artistNotes[a]=defaults.artistNotes[a];
    if(['[Panggilan dia]','[Her nickname]'].includes(out.name.trim()))out.name=defaults.name;if(['[Namamu]','[Your name]'].includes(out.sender.trim()))out.sender=defaults.sender;
    out.name=out.name.trim()||defaults.name;out.sender=out.sender.trim()||defaults.sender;
    if(!out.intro.trim())out.intro=defaults.intro;if(!out.giftNote.trim())out.giftNote=defaults.giftNote;
    const selected=out.featuredPhoto.match(/^(trip|memory):(\d)$/);if(selected&&!(selected[1]==='trip'?out.germanyPhotos:out.photos)[+selected[2]])out.featuredPhoto='auto';
    return out;
  }
  function database(){return new Promise(resolve=>{let r;try{r=indexedDB.open('little-world-birthday',1)}catch{return resolve(null)}r.onupgradeneeded=()=>r.result.createObjectStore('settings');r.onsuccess=()=>resolve(r.result);r.onerror=r.onblocked=()=>resolve(null)});}
  function read(key='config'){return new Promise(resolve=>{if(!db)return resolve(null);try{const r=db.transaction('settings').objectStore('settings').get(key);r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>resolve(null)}catch{resolve(null)}});}
  function persist(value,key='config'){return new Promise(resolve=>{if(!db)return resolve(false);try{const t=db.transaction('settings','readwrite');t.objectStore('settings').put(value,key);t.oncomplete=()=>resolve(true);t.onerror=t.onabort=()=>resolve(false)}catch{resolve(false)}});}
  function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
  function openDialog(html,options={}){
    modalLock.acquire();
    const d=$('#map-dialog');
    if(window.ScrapbookObjectReader){objectReader??=window.ScrapbookObjectReader.create({dialog:d,closeIcon:()=>icon('close'),onError:()=>toast('This piece could not open. Please try again.')});objectReader.open(html,options);return;}
    d.innerHTML=`<button class="dialog-close icon-button" id="close-note-dialog" aria-label="Close dialog">${icon('close')}</button>${html}`;if(!d.open)d.showModal();$('#close-note-dialog').onclick=()=>modalLock.close(d);
  }
  async function applyPersonalisation(value){
    const next=normalize(value),preload=document.createElement('div');
    for(const src of [...new Set([next.coverPhoto,...next.photos,...next.germanyPhotos].filter(Boolean))]){
      const image=new Image();image.src=src;preload.append(image);
    }
    const intro=window.ScrapbookIntro;
    const imagesReady=await intro.bounded(intro.decodeImages(preload),20000);
    if(!imagesReady)throw new Error('One of your photos could not be prepared. Please choose that photo again.');
    await intro.bounded(preparePrintFonts(next),10000);
    const saved=await persist(next);config=next;
    intro.reopen();modalLock.close($('#personalize-dialog'));
    story.refresh();story.go('cover',true,true);
    await intro.prepare({config,ready:()=>story.ready(),audioReady:music.ready()});
    if(intro.state!=='done')throw new Error('The preview could not finish loading. Use Try again to reload your saved changes.');
    return saved;
  }
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)){if(d.id==='map-dialog'&&objectReader)objectReader.close();else if(d.id==='personalize-dialog'&&personalizer)personalizer.close();else modalLock.close(d);}}));
  (async()=>{
    const intro=window.ScrapbookIntro,bounded=(promise,ms)=>intro?intro.bounded(promise,ms):promise;
    try{
    db=await bounded(database(),4000);const local=await bounded(read(),4000);if(local)config=normalize(local);
    intro?.setNames(config);
    story=window.ScrapbookStory({getConfig:()=>config,toast,openDialog,onSceneChange:state=>music?.setScene(state)});
    music=window.ScrapbookAudio?.create({button:$('#sound-button'),icon,toast});
    if(!music){$('#sound-button').innerHTML=icon('mute');$('#sound-button').onclick=()=>toast('Music is unavailable in this browser. You can still read the story.');}
    $('.brand').onclick=e=>{e.preventDefault();story.replay();};
    $('.skip-link').onclick=e=>{e.preventDefault();story.go('letter',true);};
    $('#personalize-button').innerHTML=icon('settings');$('#personalize-button').hidden=!ownerView;
    personalizer=window.ScrapbookPersonalization.create({dialog:$('#personalize-dialog'),icon,getConfig:()=>config,normalize,loadDraft:()=>bounded(read('personalization-draft-v2'),4000).catch(()=>null),saveDraft:value=>persist(value,'personalization-draft-v2'),apply:applyPersonalisation,onClose:()=>modalLock.close($('#personalize-dialog')),toast});
    $('#personalize-button').onclick=()=>{if(personalizer.busy)return;modalLock.acquire();void personalizer.open();};
    await bounded(preparePrintFonts(config),10000);
    await bounded(window.bookRendererReady,10000);
    story.render();
    await intro?.prepare({config,ready:()=>story.ready(),audioReady:music?.ready?.()||Promise.resolve(false)});
    }catch(error){
      if(intro)intro.fail(error);
      else $('#app').innerHTML='<p class="loading-message">Your book could not load. Please refresh to try again.</p>';
    }
  })();
})();

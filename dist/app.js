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
  let config=structuredClone(defaults), db=null, draft=null, story=null, uploads=0, toastTimer, objectReader=null;
  const icon=name=>story?.icon(name)||'';
  const modalLock=window.ScrapbookModalLock;
  $('#personalize-dialog').addEventListener('keydown',event=>{
    if(!['ArrowUp','ArrowDown','PageUp','PageDown','Home','End'].includes(event.key)||event.target.closest('input,textarea,select,[contenteditable="true"]'))return;
    const dialog=event.currentTarget,page=dialog.clientHeight*.85,max=Math.max(0,dialog.scrollHeight-dialog.clientHeight);
    event.preventDefault();
    dialog.scrollTop=event.key==='Home'?0:event.key==='End'?max:Math.max(0,Math.min(max,dialog.scrollTop+({ArrowUp:-44,ArrowDown:44,PageUp:-page,PageDown:page}[event.key]||0)));
  },true);
  const safeImage=v=>typeof v==='string'&&(/^assets\/[a-zA-Z0-9._/-]+$/.test(v)||/^https:\/\//.test(v)||/^data:image\/(jpeg|png|webp);base64,[a-zA-Z0-9+/=]+$/.test(v))?v:'';
  const safeSongLink=v=>{try{const url=new URL(v);return url.protocol==='https:'?url.href:'';}catch{return '';}};
  async function preparePrintFonts(value){
    const sample=[value.name,value.sender,'Trier Luxembourg October November Heated blanket'].join(' ');
    await Promise.allSettled(['500 32px Fraunces','400 16px "Source Sans 3"'].map(font=>document.fonts.load(font,sample)));
    await document.fonts.ready;
  }
  function normalize(c){
    const out=structuredClone(defaults);
    for(const k of ['name','sender','intro','dedication','distanceNote','letter'])if(typeof c?.[k]==='string')out[k]=c[k].slice(0,k==='letter'?15000:['intro','dedication','distanceNote'].includes(k)?4000:120);
    for(const k of ['photos','germanyPhotos'])if(Array.isArray(c?.[k]))out[k]=defaults[k].map((_,i)=>safeImage(c[k][i]));
    for(const k of ['captions','germanyCaptions','littleThings','wishes'])if(Array.isArray(c?.[k]))out[k]=defaults[k].map((_,i)=>typeof c[k][i]==='string'?c[k][i].slice(0,1200):defaults[k][i]);
    for(const a of artists)if(typeof c?.artistNotes?.[a]==='string')out.artistNotes[a]=c.artistNotes[a].slice(0,2000);
    for(const k of ['songTitles','songLinks'])for(const a of artists)if(typeof c?.[k]?.[a]==='string')out[k][a]=k==='songLinks'?safeSongLink(c[k][a].slice(0,1000)):c[k][a].slice(0,180);
    for(const key of ['title','artist','url'])if(typeof c?.memorableSong?.[key]==='string')out.memorableSong[key]=key==='url'?safeSongLink(c.memorableSong[key].slice(0,1000)):c.memorableSong[key].slice(0,180).trim();
    if(out.intro==='Aku menyimpan hal-hal yang kamu suka dalam buku ini. Temukan empat benda kecil untuk membuka kejutanmu.')out.intro=defaults.intro;
    for(const k of Object.keys(oldExamples))if(out[k]===oldExamples[k])out[k]=defaults[k];
    for(const k of Object.keys(recentExamples))if(out[k]===recentExamples[k])out[k]=defaults[k];
    for(const a of artists)if(out.artistNotes[a]===oldArtistExamples[a])out.artistNotes[a]=defaults.artistNotes[a];
    if(['[Panggilan dia]','[Her nickname]'].includes(out.name.trim()))out.name=defaults.name;if(['[Namamu]','[Your name]'].includes(out.sender.trim()))out.sender=defaults.sender;
    out.name=out.name.trim()||defaults.name;out.sender=out.sender.trim()||defaults.sender;return out;
  }
  function database(){return new Promise(resolve=>{let r;try{r=indexedDB.open('little-world-birthday',1)}catch{return resolve(null)}r.onupgradeneeded=()=>r.result.createObjectStore('settings');r.onsuccess=()=>resolve(r.result);r.onerror=r.onblocked=()=>resolve(null)});}
  function read(){return new Promise(resolve=>{if(!db)return resolve(null);try{const r=db.transaction('settings').objectStore('settings').get('config');r.onsuccess=()=>resolve(r.result||null);r.onerror=()=>resolve(null)}catch{resolve(null)}});}
  function persist(value){return new Promise(resolve=>{if(!db)return resolve(false);try{const t=db.transaction('settings','readwrite');t.objectStore('settings').put(value,'config');t.oncomplete=()=>resolve(true);t.onerror=t.onabort=()=>resolve(false)}catch{resolve(false)}});}
  function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3500);}
  function openDialog(html,options={}){
    modalLock.acquire();
    const d=$('#map-dialog');
    if(window.ScrapbookObjectReader){objectReader??=window.ScrapbookObjectReader.create({dialog:d,closeIcon:()=>icon('close'),onError:()=>toast('This piece could not open. Please try again.')});objectReader.open(html,options);return;}
    d.innerHTML=`<button class="dialog-close icon-button" id="close-note-dialog" aria-label="Close dialog">${icon('close')}</button>${html}`;if(!d.open)d.showModal();$('#close-note-dialog').onclick=()=>modalLock.close(d);
  }
  function snapshot(){const f=$('#settings-form');if(!f)return;const data=new FormData(f);for(const k of ['name','sender','intro','dedication','distanceNote','letter'])draft[k]=String(data.get(k)||'');draft.memorableSong={title:String(data.get('memorable-song-title')||''),artist:String(data.get('memorable-song-artist')||''),url:String(data.get('memorable-song-url')||'')};for(let i=0;i<6;i++){draft.captions[i]=String(data.get('caption-'+i)||'');draft.littleThings[i]=String(data.get('detail-'+i)||'');}for(let i=0;i<4;i++)draft.germanyCaptions[i]=String(data.get('germanyCaption-'+i)||'');for(let i=0;i<3;i++)draft.wishes[i]=String(data.get('wish-'+i)||'');}
  function photoForm(kind,i){const isTrip=kind==='germanyPhotos',cap=isTrip?'germanyCaptions':'captions',field=isTrip?'germanyCaption-':'caption-';return `<div class="photo-form"><img id="${kind}-preview-${i}" src="${esc(draft[kind][i]||'assets/illustrations/postcard.webp')}" alt="${draft[kind][i]?'Preview of '+(isTrip?'October photo':'memory photo')+' '+(i+1):'No photo added; postcard illustration'}"><div><label>${isTrip?trip.days[i].date+' · '+trip.days[i].place:'Memory photo '+(i+1)}<input type="file" accept="image/jpeg,image/png,image/webp" data-photo-kind="${kind}" data-photo-index="${i}"></label><label><span class="visually-hidden">Story for ${isTrip?'October photo':'memory photo'} ${i+1}</span><textarea name="${field+i}" maxlength="1200" placeholder="The story behind this photo">${esc(draft[cap][i])}</textarea></label><button class="plain-button remove-photo" type="button" data-remove="${kind}" data-index="${i}">Remove photo</button></div></div>`;}
  function renderSettings(){
    const d=$('#personalize-dialog');
    d.innerHTML=`<div class="dialog-header"><h2 id="settings-title">Personalise the book.</h2><button class="icon-button" data-close aria-label="Close personalisation">${icon('close')}</button></div>
    <div class="settings-body"><a class="owner-preview" href="./" target="_blank" rel="noopener">Open reader preview</a><p class="settings-intro">Add your photos and personal writing. Missing details stay as placeholders. Your shared food memories are kept with the maps.</p><p class="settings-hint">Changes are saved in this browser. To include them in the shared website, download your personalisation and send the file in this chat for publication.</p>
    <form id="settings-form"><div class="form-grid"><label>Her name or nickname<input name="name" value="${esc(draft.name)}" maxlength="60" required></label><label>Your name or nickname<input name="sender" value="${esc(draft.sender)}" maxlength="60" required></label></div>
    <label class="settings-field">Opening note<textarea name="intro" maxlength="4000" placeholder="One small detail from Luxembourg.">${esc(draft.intro)}</textarea></label><label class="settings-field">Trip notes<textarea name="dedication" maxlength="4000" placeholder="Places and little details from Trier and Luxembourg you want to keep.">${esc(draft.dedication)}</textarea></label>
    <h3>Little notes</h3><p class="settings-hint">Completed notes are available from the four-day recap.</p>${['A detail worth keeping','Things she says','The way she laughs','What makes her happy','Things she does','What you want to remember'].map((label,i)=>`<label class="settings-field">${label}<textarea name="detail-${i}" maxlength="1200" placeholder="A real action or moment you remember.">${esc(draft.littleThings[i])}</textarea></label>`).join('')}
    <h3>Your memories</h3><p class="settings-hint">The photo page uses 23 October first, then 24 October, then the other trip days. Otherwise, it uses your first memory photo. All added photos remain available.</p>${[0,1,2,3,4,5].map(i=>photoForm('photos',i)).join('')}
    <h3>Between the photographs</h3><label class="settings-field">The story behind the main photo<textarea name="distanceNote" maxlength="4000" placeholder="Where you were, what happened and why this photo matters.">${esc(draft.distanceNote)}</textarea></label>
    <h3>${trip.shortDates} · ${trip.places}</h3><p class="settings-hint">The recap shows dates and places. Add a photograph and its story here; food memories appear only with the maps. Photos are optional.</p>${[0,1,2,3].map(i=>photoForm('germanyPhotos',i)).join('')}
    <h3>Our song</h3><label class="settings-field">Song title<input name="memorable-song-title" value="${esc(draft.memorableSong.title)}" maxlength="180"></label><label class="settings-field">Artist<input name="memorable-song-artist" value="${esc(draft.memorableSong.artist)}" maxlength="180"></label><label class="settings-field">Listening link<input type="url" pattern="https://.*" name="memorable-song-url" value="${esc(draft.memorableSong.url)}" maxlength="1000" placeholder="https://..."></label>
    <h3>What you want to keep</h3><label class="settings-field">A note after four days<textarea name="letter" rows="8" maxlength="15000" placeholder="One thing from your time together you want to keep, and why.">${esc(draft.letter)}</textarea></label>
    <h3>The 2 November ending</h3><p class="settings-hint">Your birthday wish appears on the final page. The other two notes are also saved.</p>${['Places you want to visit','Things you want to try','Your wish for her on 2 November'].map((label,i)=>`<label class="settings-field">${label}<textarea name="wish-${i}" maxlength="1200" placeholder="Connect it to something she really wants.">${esc(draft.wishes[i])}</textarea></label>`).join('')}
    <div class="settings-actions"><button class="primary-button" type="submit">Save on this device</button><button class="secondary-button" type="button" id="cancel-settings">Cancel</button></div></form>
    <div class="settings-export"><button class="secondary-button" id="export-config">${icon('download')}Download personalisation</button><label class="import-label">Import personalisation<input type="file" accept="application/json,.json" id="import-config"></label></div><p class="settings-hint">The file includes your photos and personal messages.</p><button class="plain-button" id="restore-defaults">Restore shared defaults</button></div>`;
    $('[data-close]',d).onclick=()=>modalLock.close(d);$('#cancel-settings').onclick=()=>modalLock.close(d);
    const importer=$('.import-label',d);importer.tabIndex=0;importer.setAttribute('role','button');importer.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();$('#import-config').click();}};
    $('#settings-form').onsubmit=async e=>{e.preventDefault();if(uploads){toast('Wait for the photo to finish processing.');return;}snapshot();config=normalize(draft);const saved=await persist(config);await preparePrintFonts(config);modalLock.close(d);story.refresh();toast(saved?'Personalisation saved on this device.':'Personalisation is active for this session. Download a backup to keep it.');};
    $$('[data-photo-kind]').forEach(input=>input.onchange=async()=>{
      const file=input.files[0];if(!file)return;uploads++;input.disabled=true;$('#settings-form button[type="submit"]').disabled=true;$('#export-config').disabled=true;toast('Preparing photo…');
      try{const data=await resizePhoto(file);draft[input.dataset.photoKind][+input.dataset.photoIndex]=data;$(`#${input.dataset.photoKind}-preview-${input.dataset.photoIndex}`).src=data;toast('Photo ready. Save when you have finished.');}catch(error){toast(error.message);}finally{uploads--;input.disabled=false;const save=$('#settings-form button[type="submit"]'),exporter=$('#export-config');if(save)save.disabled=uploads>0;if(exporter)exporter.disabled=uploads>0;}
    });
    $$('[data-remove]').forEach(b=>b.onclick=()=>{snapshot();draft[b.dataset.remove][+b.dataset.index]='';const top=d.scrollTop;renderSettings();d.scrollTop=top;});
    $('#export-config').onclick=()=>{if(uploads)return;snapshot();const blob=new Blob([JSON.stringify(normalize(draft),null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='birthday-personalization.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Personalisation downloaded. You can send it in this chat.');};
    $('#import-config').onchange=async e=>{const f=e.target.files[0];if(!f)return;try{if(f.size>15000000)throw new Error();const parsed=JSON.parse(await f.text());if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||typeof parsed.name!=='string')throw new Error();draft=normalize(parsed);renderSettings();toast('Personalisation loaded. Save to apply it.');}catch{toast('This personalisation file could not be read. Choose a JSON file downloaded from this website.');}};
    $('#restore-defaults').onclick=()=>{draft=structuredClone(defaults);renderSettings();toast('Shared defaults restored. Save to apply them.');};
  }
  async function resizePhoto(file){
    if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw new Error('Choose a JPG, PNG or WebP photo.');if(file.size>20000000)throw new Error('Choose a photo smaller than 20 MB.');
    let bitmap;try{bitmap=await createImageBitmap(file);}catch{throw new Error('This photo could not be opened. Try another one.');}
    const ratio=Math.min(1,1100/Math.max(bitmap.width,bitmap.height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(bitmap.width*ratio));canvas.height=Math.max(1,Math.round(bitmap.height*ratio));const ctx=canvas.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(bitmap,0,0,canvas.width,canvas.height);bitmap.close();return canvas.toDataURL('image/jpeg',.82);
  }
  $$('dialog').forEach(d=>d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)){if(d.id==='map-dialog'&&objectReader)objectReader.close();else modalLock.close(d);}}));
  (async()=>{
    const intro=window.ScrapbookIntro,bounded=(promise,ms)=>intro?intro.bounded(promise,ms):promise;
    try{
    db=await bounded(database(),4000);const local=await bounded(read(),4000);if(local)config=normalize(local);
    intro?.setNames(config);
    let music=null;
    story=window.ScrapbookStory({getConfig:()=>config,toast,openDialog,onSceneChange:state=>music?.setScene(state)});
    music=window.ScrapbookAudio?.create({button:$('#sound-button'),icon,toast});
    if(!music){$('#sound-button').innerHTML=icon('mute');$('#sound-button').onclick=()=>toast('Music is unavailable in this browser. You can still read the story.');}
    $('.brand').onclick=e=>{e.preventDefault();story.replay();};
    $('.skip-link').onclick=e=>{e.preventDefault();story.go('letter',true);};
    $('#personalize-button').innerHTML=icon('settings');$('#personalize-button').hidden=!ownerView;
    $('#personalize-button').onclick=()=>{draft=structuredClone(config);renderSettings();modalLock.acquire();$('#personalize-dialog').showModal();};
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

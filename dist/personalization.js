(() => {
  'use strict';
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const copy=value=>structuredClone(value),MAX_FILE=32*1024*1024;
  const scalarLimits={name:60,sender:60,intro:4000,dedication:4000,distanceNote:4000,letter:15000,giftNote:4000,catGreeting:60};
  const arrayRules={photos:[6,0],germanyPhotos:[4,0],captions:[6,4000],germanyCaptions:[4,4000],littleThings:[6,1200],wishes:[3,1200],catNotes:[5,2000],mealNotes:[3,4000]};
  const days=[['T22','22 October','Trier'],['T23','23 October','Trier → Luxembourg'],['T24','24 October','Luxembourg → Trier'],['T25','25 October','Trier']];
  const detailLabels=['A small habit you love','Something she says','A moment that made her laugh','What makes her happy','A gesture you appreciate','Something you want to remember'];
  const isObject=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  function boundedPhoto(promise){
    const bounded=window.ScrapbookIntro?.bounded;
    const wait=bounded?bounded(promise,20000):new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Object.assign(new Error('Photo processing timed out'),{name:'TimeoutError'})),20000);Promise.resolve(promise).then(value=>{clearTimeout(timer);resolve(value);},error=>{clearTimeout(timer);reject(error);});});
    return wait.catch(error=>{if(error?.name==='TimeoutError')throw new Error('Photo processing took too long. Try a smaller JPG, PNG or WebP.');throw error;});
  }
  function validImage(value){
    if(value==='')return true;if(typeof value!=='string')return false;
    if(/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(value))return true;
    if(/^assets\/[A-Za-z0-9._/-]+$/.test(value))return value.split('/').every(part=>part&&part!=='.'&&part!=='..');
    try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password&&value===value.trim();}catch{return false;}
  }
  function validLink(value){if(value==='')return true;try{const url=new URL(value);return url.protocol==='https:'&&!url.username&&!url.password;}catch{return false;}}
  function validateImport(value){
    if(!isObject(value)||typeof value.name!=='string')throw new Error('Choose a birthday-personalization.json file exported from this editor.');
    if(value.schemaVersion!==undefined&&![1,2].includes(value.schemaVersion))throw new Error('This file uses a newer personalisation format. Ask for an editor update before importing it.');
    for(const [key,max]of Object.entries(scalarLimits))if(value[key]!==undefined&&(typeof value[key]!=='string'||value[key].length>max))throw new Error(key+' must be text with no more than '+max+' characters.');
    if(value.catGreeting!==undefined)window.ScrapbookCatGreeting.assert(value.catGreeting);
    if(!value.name.trim()||value.sender!==undefined&&!value.sender.trim())throw new Error('Both names must contain text.');
    if(value.birthday!==undefined&&value.birthday!=='2026-11-02')throw new Error('This scrapbook is for 2 November 2026. Its birthday artwork uses that date.');
    for(const [key,[length,max]]of Object.entries(arrayRules))if(value[key]!==undefined){
      if(!Array.isArray(value[key])||value[key].length>length||value[key].some(item=>typeof item!=='string'||max&&item.length>max))throw new Error(key+' must contain up to '+length+' text entries'+(max?', each up to '+max+' characters.':'.'));
      if(!max&&value[key].some(item=>!validImage(item)))throw new Error('A photo in '+key+' is not a supported JPG, PNG, WebP or HTTPS image.');
    }
    if(value.coverPhoto!==undefined&&!validImage(value.coverPhoto))throw new Error('The cover photo must be a supported image or HTTPS image address.');
    if(value.featuredPhoto!==undefined&&(typeof value.featuredPhoto!=='string'||!/^(auto|trip:[0-3]|memory:[0-5])$/.test(value.featuredPhoto)))throw new Error('The main photograph selection is not recognised.');
    if(value.memorableSong!==undefined){
      if(!isObject(value.memorableSong))throw new Error('Our song must contain a title, artist and listening link.');
      for(const key of['title','artist','url'])if(value.memorableSong[key]!==undefined&&(typeof value.memorableSong[key]!=='string'||value.memorableSong[key].length>(key==='url'?1000:180)))throw new Error('The song '+key+' is not valid.');
      if(value.memorableSong.url!==undefined&&!validLink(value.memorableSong.url))throw new Error('The listening link must start with https://, or be empty.');
    }
    for(const key of['artistNotes','songTitles','songLinks'])if(value[key]!==undefined){
      const max=key==='artistNotes'?2000:key==='songTitles'?180:1000;
      if(!isObject(value[key])||Object.values(value[key]).some(item=>typeof item!=='string'||item.length>max))throw new Error('The older '+key+' entries must contain text up to '+max+' characters.');
      if(key==='songLinks'&&Object.values(value[key]).some(item=>!validLink(item)))throw new Error('Older song links must start with https://, or be empty.');
    }
    return value;
  }
  async function resizePhoto(file){
    const type=file.type.toLowerCase();if(type&&!['image/jpeg','image/png','image/webp'].includes(type)||!type&&!/\.(jpe?g|png|webp)$/i.test(file.name))throw new Error('Choose a JPG, PNG or WebP photo.');
    if(file.size>20*1024*1024)throw new Error('Choose a photo smaller than 20 MB.');
    let image,url;
    try{
      try{image=await createImageBitmap(file);}catch{
        url=URL.createObjectURL(file);image=await new Promise((resolve,reject)=>{const node=new Image();node.onload=()=>resolve(node);node.onerror=()=>reject(new Error('This photo could not be opened. Try another image.'));node.src=url;});
      }
      const width=image.width||image.naturalWidth,height=image.height||image.naturalHeight;if(!width||!height)throw new Error('This photo has no usable image data.');
      const ratio=Math.min(1,1100/Math.max(width,height)),canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(width*ratio));canvas.height=Math.max(1,Math.round(height*ratio));
      const ctx=canvas.getContext('2d');if(!ctx)throw new Error('Photo processing is unavailable. Try another browser.');
      ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.drawImage(image,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',.82);
    }finally{image?.close?.();if(url)URL.revokeObjectURL(url);}
  }
  window.ScrapbookPersonalization={create({dialog,icon,getConfig,normalize,loadDraft,saveDraft,apply,onClose,toast}){
    const shared=copy(window.BIRTHDAY_CONFIG);let draft=null,busy=false,saveTimer=null,saveQueue=Promise.resolve(),saveSequence=0,undoReset=null;
    const $=selector=>dialog.querySelector(selector),$$=selector=>[...dialog.querySelectorAll(selector)];
    function status(message){const node=$('#editor-status');if(node)node.textContent=message;}
    function error(message){const node=$('#editor-error');if(node){node.textContent=message;node.hidden=!message;if(message)$('.editor-body')?.scrollTo({top:0,behavior:'instant'});}}
    function fixFeatured(){
      const value=draft.featuredPhoto||'auto',match=/^(trip|memory):([0-5])$/.exec(value);
      if(match&&!draft[match[1]==='trip'?'germanyPhotos':'photos']?.[+match[2]])draft.featuredPhoto='auto';
    }
    function snapshot(){
      const form=$('#settings-form');if(!form||busy)return draft;
      const data=new FormData(form);for(const key of Object.keys(scalarLimits))draft[key]=String(data.get(key)??'');
      for(let i=0;i<6;i++){draft.captions[i]=String(data.get('caption-'+i)??'');draft.littleThings[i]=String(data.get('detail-'+i)??'');}
      for(let i=0;i<4;i++)draft.germanyCaptions[i]=String(data.get('trip-caption-'+i)??'');
      for(let i=0;i<3;i++){draft.wishes[i]=String(data.get('wish-'+i)??'');draft.mealNotes[i]=String(data.get('meal-'+i)??'');}
      for(let i=0;i<5;i++)if(data.has('cat-'+i))draft.catNotes[i]=String(data.get('cat-'+i));
      draft.memorableSong={title:String(data.get('song-title')??''),artist:String(data.get('song-artist')??''),url:String(data.get('song-url')??'')};
      draft.featuredPhoto=String(data.get('featuredPhoto')||'auto');fixFeatured();return draft;
    }
    function persistDraft(immediate=false){
      clearTimeout(saveTimer);
      const commit=()=>{if(!draft)return;const value=copy(draft),sequence=++saveSequence;status('Saving your draft…');saveQueue=saveQueue.catch(()=>{}).then(()=>saveDraft(value)).then(saved=>{if(sequence===saveSequence)status(saved?'Draft saved on this device.':'Draft kept in this tab. Download JSON to keep a backup.');}).catch(()=>{if(sequence===saveSequence)status('Draft kept in this tab. Download JSON to keep a backup.');});};
      if(immediate)commit();else saveTimer=setTimeout(commit,450);
    }
    function updateBusy(){
      const fields=$('.editor-fields');if(fields)fields.disabled=busy;dialog.setAttribute('aria-busy',String(busy));
      $$('button,input[type="file"]').forEach(node=>{node.disabled=busy||node.dataset.empty==='true';});
    }
    async function operation(fn,{save=true}={}){
      if(busy){toast('Please wait for the current action to finish.');return;}
      snapshot();busy=true;error('');updateBusy();
      try{await fn();if(save)persistDraft(true);}catch(problem){error(problem?.message||'This action could not finish. Please try again.');}
      finally{busy=false;updateBusy();}
    }
    function field(label,name,value,max,hint='',required=false,rows=4){
      return `<label class="editor-field">${label}<textarea name="${name}" rows="${rows}" maxlength="${max}"${required?' required':''} placeholder="${esc(hint)}">${esc(value)}</textarea></label>`;
    }
    function section(id,title,hint,content,open=false){return `<details class="editor-section" data-section="${id}"${open?' open':''}><summary><span>${title}</span><small>${hint}</small></summary><div class="editor-section-body">${content}</div></details>`;}
    function photo(kind,index){
      const cover=kind==='coverPhoto',trip=kind==='germanyPhotos',src=cover?draft.coverPhoto:draft[kind][index],id=cover?'COVER':trip?days[index][0]:'M'+String(index+1).padStart(2,'0');
      const label=cover?'Cover photograph':trip?days[index][1]+' 2026 · '+days[index][2]:'Extra memory photograph '+(index+1);
      return `<div class="editor-photo" data-photo-slot="${id}"><div class="editor-photo-preview">${src?`<img src="${esc(src)}" alt="Preview of ${esc(label)}" decoding="async">`:'<span class="editor-photo-empty">No photo yet</span>'}</div><div class="editor-photo-fields"><p class="editor-photo-title"><strong>${id}</strong> · ${label}</p><label class="editor-upload-label">${src?'Replace photo':'Choose photo'}<input type="file" accept="image/jpeg,image/png,image/webp" data-photo-kind="${kind}" data-photo-index="${index}"></label>${cover?'<p class="editor-hint">Shown inside the tilted cover frame. Your whole photo stays visible.</p>':field('The story behind this photo',(trip?'trip-caption-':'caption-')+index,draft[trip?'germanyCaptions':'captions'][index],4000,'What happened, and why do you want to keep this moment?',false,3)}<button type="button" class="plain-button" data-remove-photo="${kind}" data-photo-index="${index}"${!cover&&!src?' disabled data-empty="true"':''}>${cover?'Reset cover photo':'Remove photo'}</button></div></div>`;
    }
    function featuredOptions(){
      return `<option value="auto">Automatic: 23 Oct, 24 Oct, 22 Oct, 25 Oct, then first memory</option>`+days.map((day,i)=>`<option value="trip:${i}"${!draft.germanyPhotos[i]?' disabled':''}${draft.featuredPhoto==='trip:'+i?' selected':''}>${day[0]} · ${day[1]}</option>`).join('')+draft.photos.map((src,i)=>`<option value="memory:${i}"${!src?' disabled':''}${draft.featuredPhoto==='memory:'+i?' selected':''}>M${String(i+1).padStart(2,'0')} · Extra memory ${i+1}</option>`).join('');
    }
    function render(){
      const openSections=new Set($$('details[open]').map(node=>node.dataset.section)),first=!$('#settings-form'),top=$('.editor-body')?.scrollTop||0;fixFeatured();dialog.classList.add('personalization-editor');
      const names=`<p class="editor-fixed-facts">25th birthday · 2 November 2026.<br>Trip: 22–25 October 2026.</p><div class="editor-grid"><label class="editor-field">Her name or nickname<input name="name" value="${esc(draft.name)}" maxlength="60" required autocomplete="off"></label><label class="editor-field">Your name or nickname<input name="sender" value="${esc(draft.sender)}" maxlength="60" required autocomplete="off"></label></div>${photo('coverPhoto',0)}`;
      const trip=field('The short note beside the map','intro',draft.intro,4000,'A detail from Trier or Luxembourg you want to keep.',true)+field('More of your trip story','dedication',draft.dedication,4000,'Conversations, places and small details. This opens with the map.')+'<p class="editor-hint">Four day pockets: a photo and story for each date. Meal memories stay with the map.</p>'+days.map((_,i)=>photo('germanyPhotos',i)).join('')+'<h3>What we ate</h3>'+['22 October · Trier','23 October · Trier → Luxembourg','24 October · Luxembourg → Trier'].map((label,i)=>field(label,'meal-'+i,draft.mealNotes[i],4000,'Your shared food memory. Leave empty to omit this entry.')).join('');
      const photographs=`<label class="editor-field">Main photograph<select name="featuredPhoto">${featuredOptions()}</select></label><p class="editor-hint">Only filled photo slots can be selected. Every uploaded photo remains in the gallery.</p>${field('The note below the main photograph','distanceNote',draft.distanceNote,4000,'What was happening just outside the photograph? Why does it matter?')}<h3>Extra memory photographs</h3><p class="editor-hint">Optional. Empty slots stay out of the gallery.</p>${draft.photos.map((_,i)=>photo('photos',i)).join('')}`;
      const notes=field('Your folded personal letter','letter',draft.letter,15000,'Write the letter itself. The book adds the greeting and sign-off using the names above.',false,9)+'<p class="editor-hint">This stays folded until she opens it on the Notes page.</p><h3>A birthday greeting from all five cats</h3>'+field('Their shared birthday greeting','catGreeting',draft.catGreeting,60,'Happy 25th, Tasya!\nWe love you!',false,2)+'<p class="editor-hint">Always visible above Winnie, Bonnie, Connie, Wonnie and Minnie. Keep it to two short lines, up to 60 characters. Leave it empty to use the shared greeting.</p>';
      const birthday=field('The message inside her birthday card','wish-2',draft.wishes[2],1200,'Your birthday wish, in your own words.',false,6)+'<p class="editor-hint">Shown only when she opens the card beside the cake on the 2 November page. This is separate from the final envelope.</p>';
      const extras=detailLabels.map((label,i)=>field(label,'detail-'+i,draft.littleThings[i],1200,'A real action or moment you remember.')).join('')+field('Places you want to visit together','wish-0',draft.wishes[0],1200,'A place you have talked about.')+field('Things you want to try together','wish-1',draft.wishes[1],1200,'Something you are looking forward to.');
      const closing=field('The note inside the final envelope','giftNote',draft.giftNote,4000,'Your personal note to go with the heated blanket.',true,7)+'<p class="editor-hint">This is the last page, after the candle. Its message stays hidden until she opens the envelope.</p>';
      const song=`<label class="editor-field">Song title<input name="song-title" value="${esc(draft.memorableSong.title)}" maxlength="180"></label><label class="editor-field">Artist<input name="song-artist" value="${esc(draft.memorableSong.artist)}" maxlength="180"></label><label class="editor-field">Listening link<input type="url" pattern="https://.*" name="song-url" value="${esc(draft.memorableSong.url)}" maxlength="1000" placeholder="https://..."></label><p class="editor-hint">The One I Choose is your shared song. Other artists remain decorative stickers.</p>`;
      dialog.innerHTML=`<header class="editor-header"><div><h2 id="settings-title">Personalise your scrapbook</h2><p id="editor-status" class="editor-status" role="status" aria-live="polite">Your draft stays on this device.</p></div><button class="icon-button editor-close" type="button" id="close-editor" aria-label="Close and keep draft">${icon('close')}</button></header><div class="editor-body"><p class="editor-intro">Edit the photos and words in book order. Preview applies your changes on this device. Download JSON when you are ready to send the complete file in this chat.</p><p id="editor-error" class="editor-error" role="alert" hidden></p><form id="settings-form" class="editor-form"><fieldset class="editor-fields"><div class="editor-sections">${section('names','Names & cover','The introduction and front cover',names,first)}${section('trip','Trier & Luxembourg','Map notes and 22–25 October',trip)}${section('photos','Photographs','Main photo, its note and extra memories',photographs)}${section('notes','Notes','A folded letter and one shared cat greeting',notes)}${section('birthday','Birthday card','The card beside the cake',birthday)}${section('extras','Little notes','Optional memories in the four-day recap',extras)}${section('closing','One last note','The final envelope',closing)}${section('song','Our song','Your shared soundtrack',song)}</div></fieldset></form></div><footer class="editor-footer"><div class="editor-main-actions"><button type="submit" form="settings-form" class="primary-button" id="preview-config">Preview book</button><button type="button" class="secondary-button" id="export-config">${icon('download')}Download JSON</button></div><div class="editor-backup-actions"><label class="import-label">Import JSON<input type="file" accept="application/json,.json" id="import-config"></label><button type="button" class="plain-button" id="restore-defaults">Reset to shared version</button>${undoReset?'<button type="button" class="plain-button editor-reset-undo" id="undo-reset">Undo reset</button>':''}</div><p class="editor-hint">JSON includes uploaded photos and writing. Changes are not published until you send it back.</p></footer>`;
      if(!first)$$('details').forEach(node=>{node.open=openSections.has(node.dataset.section);});$('.editor-body').scrollTop=top;
      bind();updateBusy();
    }
    function validForm(){
      const form=$('#settings-form'),invalid=form.querySelector(':invalid');if(invalid){for(let node=invalid.parentElement;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;invalid.reportValidity();invalid.focus();return false;}return true;
    }
    function bind(){
      $('#close-editor').onclick=close;
      $('#settings-form').addEventListener('invalid',event=>{for(let node=event.target.parentElement;node;node=node.parentElement)if(node.tagName==='DETAILS')node.open=true;},true);
      $('#settings-form').oninput=()=>{if(busy)return;error('');snapshot();undoReset=null;$('#undo-reset')?.remove();persistDraft();};
      $('#settings-form').onsubmit=event=>{event.preventDefault();if(!validForm())return;void operation(async()=>{const value=normalize(copy(draft));value.catGreeting=window.ScrapbookCatGreeting.assert(value.catGreeting);status('Preparing your preview…');const saved=await apply(value);draft=copy(value);persistDraft(true);onClose();toast(saved?'Preview updated and saved on this device.':'Preview updated. Download JSON to keep your backup.');},{save:false});};
      $$('[data-photo-kind]').forEach(input=>input.onchange=()=>{const file=input.files?.[0];if(!file)return;input.value='';void operation(async()=>{status('Preparing photo…');const data=await boundedPhoto(resizePhoto(file)),kind=input.dataset.photoKind,index=+input.dataset.photoIndex;if(kind==='coverPhoto')draft.coverPhoto=data;else draft[kind][index]=data;undoReset=null;render();status('Photo ready. Your text has been kept.');});});
      $$('[data-remove-photo]').forEach(button=>button.onclick=()=>{if(busy)return;snapshot();const kind=button.dataset.removePhoto,index=+button.dataset.photoIndex;if(kind==='coverPhoto')draft.coverPhoto=shared.coverPhoto;else draft[kind][index]='';fixFeatured();undoReset=null;render();persistDraft(true);});
      $('#export-config').onclick=()=>{if(busy||!validForm())return;snapshot();try{const value={...normalize(copy(draft)),schemaVersion:2};validateImport(value);const blob=new Blob([JSON.stringify(value,null,2)],{type:'application/json;charset=utf-8'});if(blob.size>MAX_FILE)throw new Error('This JSON is larger than 32 MB. Remove a few extra photos before downloading.');const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='birthday-personalization.json';link.hidden=true;document.body.append(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);persistDraft(true);toast('JSON downloaded. Send birthday-personalization.json in this chat.');}catch(problem){error(problem.message);}};
      $('#import-config').onchange=event=>{const file=event.target.files?.[0];if(!file)return;event.target.value='';void operation(async()=>{status('Reading your personalisation…');if(file.size>MAX_FILE)throw new Error('Choose a JSON file smaller than 32 MB.');let parsed;try{parsed=JSON.parse(await file.text());}catch{throw new Error('This file is not valid JSON. Choose birthday-personalization.json downloaded from this editor.');}validateImport(parsed);draft=normalize(parsed);undoReset=null;render();status('JSON imported. Preview the book when you are ready.');});};
      $('#restore-defaults').onclick=()=>{if(busy)return;snapshot();undoReset=copy(draft);draft=normalize(copy(shared));render();persistDraft(true);status('Shared version restored in this draft. Undo is available until you edit.');};
      $('#undo-reset')?.addEventListener('click',()=>{if(busy||!undoReset)return;draft=undoReset;undoReset=null;render();persistDraft(true);});
      const importer=$('.import-label');importer.tabIndex=0;importer.setAttribute('role','button');importer.onkeydown=event=>{if(event.key==='Enter'||event.key===' '){event.preventDefault();if(!busy)$('#import-config').click();}};
    }
    async function open(){
      if(busy)return;busy=true;
      try{
        if(!draft){let stored=null;try{stored=await loadDraft();}catch{}draft=normalize(stored||getConfig());}
        render();if(!dialog.open)dialog.showModal();
      }catch(problem){toast(problem?.message||'The editor could not open. Please try again.');onClose();}
      finally{busy=false;updateBusy();$('#close-editor')?.focus({preventScroll:true});}
    }
    function close(){if(busy){toast('Please wait for the current action to finish.');return false;}snapshot();persistDraft(true);onClose();return true;}
    dialog.addEventListener('cancel',event=>{event.preventDefault();close();});
    return {open,close,get busy(){return busy;}};
  }};
})();

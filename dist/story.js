(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const glyphs={close:'x',settings:'pencil-simple',mute:'speaker-slash',sound:'speaker-high',download:'download-simple',gift:'gift',arrow:'arrow-right',back:'arrow-left',copy:'copy',music:'music-notes',book:'book-open'};
  const trip=window.SCRAPBOOK_TRIP;
  const chapters=[['cover','Cover'],['dedication','Trier & Luxembourg'],['your-world',trip.shortDates],['october','Photographs'],['letter','Notes'],['birthday','2 November'],['gift','Your gift']];
  const aliases={'little-things':'your-world','soundtrack-a':'your-world','soundtrack-b':'your-world',moments:'october',closer:'october','next-chapter':'letter'};
  const artists=['Olivia Rodrigo','Taylor Swift','Olivia Dean','Sienna Spiro'];
  const cats=[{name:'Winnie',coat:'Orange.'},{name:'Bonnie',coat:'Grey and white, mostly white.'},{name:'Connie',coat:'Grey, white and orange.'},{name:'Wonnie',coat:'Grey and white, mostly grey.'},{name:'Minnie',coat:'Black, brown and orange tortoiseshell, based on your photo.'}];
  // The family illustration has uneven, touching outlines; these shared seams
  // follow its white sticker borders instead of cutting five equal columns.
  const catSeams=[[[419,0],[419,432],[416,437],[416,451],[411,457],[416,472],[414,483],[418,487],[416,489],[418,500],[413,505],[414,518],[416,520],[415,539],[419,545],[420,557],[425,562],[424,571],[426,577],[425,599],[421,603],[422,819]],[[784,0],[784,469],[788,473],[788,479],[786,482],[787,496],[783,501],[784,510],[780,514],[782,518],[780,522],[782,528],[782,544],[780,546],[782,564],[777,574],[783,585],[783,591],[793,606],[790,612],[791,624],[789,630],[804,648],[800,658],[800,819]],[[1151,0],[1151,318],[1153,320],[1153,387],[1160,395],[1160,443],[1164,459],[1162,468],[1162,501],[1153,510],[1152,515],[1160,523],[1165,547],[1163,554],[1164,565],[1161,568],[1164,579],[1159,590],[1159,594],[1165,603],[1163,608],[1165,624],[1163,632],[1163,819]],[[1528,0],[1528,395],[1532,400],[1533,415],[1536,422],[1536,501],[1538,503],[1538,532],[1532,539],[1536,552],[1535,578],[1540,584],[1537,613],[1538,623],[1541,634],[1547,644],[1548,653],[1552,657],[1552,661],[1548,665],[1552,677],[1552,819]]];
  const catBounds=[[11,47,427,772],[411,66,805,769],[777,63,1166,768],[1152,69,1553,768],[1532,132,1909,769]];
  function catPortrait(index,classes='',attrs=''){
    const cat=cats[index],[x0,,x1]=catBounds[index],x=Math.max(0,x0-12),y=31,w=Math.min(1919,x1+12)-x,h=759;
    const left=index?catSeams[index-1]:[[0,0],[0,820]],right=index<4?catSeams[index]:[[1919,0],[1919,820]];
    const points=[...left,...[...right].reverse()].map(([px,py])=>[+(100*(px-x)/w).toFixed(5),+(100*(py-y)/h).toFixed(5)]);
    const polygon=points.map(p=>p.join(',')).join(' '),clip=points.map(([px,py])=>px+'% '+py+'%').join(',');
    return `<span class="pet-portrait ${classes}" style="--pet:${index}" ${attrs}><span class="pet-frame" data-cat-frame="${x},${y},${w},${h}" data-cat-polygon="${polygon}" style="--cat-ratio:${w/h};--cat-width:${1919/w*100}%;--cat-height:${820/h*100}%;--cat-left:${-x/w*100}%;--cat-top:${-y/h*100}%;clip-path:polygon(${clip})"><img src="assets/cutouts/five-cats.webp" alt="${cat.name}, ${esc(cat.coat.toLowerCase())}" width="1919" height="820"></span></span>`;
  }
  const detailPrompts=['Your little habits','Things you say','The way you laugh','What makes you happy','Things you do','What I want to remember'];
  const wishPrompts=['Places we want to visit','Things we want to try','My wishes for you'];
  const prompts={intro:'[One small detail from Luxembourg.]',dedication:'[The places, conversations and little finds from Trier and Luxembourg.]',detail:'[A little detail you want to keep.]',scene:'[What was happening just outside this photograph?]',letter:'[Something she did or said that you want to remember.]',wish:'[Your birthday wish, in your own words.]'};
  const dayPrompts=trip.days.map(day=>day.prompt);
  const paragraphs=text=>String(text||'').split(/\n\s*\n/).map(p=>`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('');
  function excerpt(text,max){
    const full=String(text||'').replace(/\s+/g,' ').trim();
    if(full.length<=max)return {text:full,truncated:false};
    let cut=full.lastIndexOf(' ',max);if(cut<max*.6)cut=max;
    return {text:full.slice(0,cut).replace(/[ ,;:]$/,'')+'…',truncated:true};
  }
  function wishExcerpt(text,width){
    const full=String(text||'').replace(/\s+/g,' ').trim(),ctx=document.createElement('canvas').getContext('2d');ctx.font='400 17px "Source Sans 3"';
    if(ctx.measureText(full).width<=width)return {text:full,truncated:false};
    const characters=Array.from(full);let lo=0,hi=characters.length;
    while(lo<hi){const mid=Math.ceil((lo+hi)/2);if(ctx.measureText(characters.slice(0,mid).join('')+'…').width<=width)lo=mid;else hi=mid-1;}
    let short=characters.slice(0,lo).join(''),space=short.lastIndexOf(' ');if(space>short.length*.6)short=short.slice(0,space);
    return {text:short.replace(/[ ,;:]$/,'')+'…',truncated:true};
  }
  window.ScrapbookStory=({getConfig,toast,openDialog:presentDialog,onSceneChange=()=>{}})=>{
    const app=document.getElementById('app');
    let motion=null,film=null,observer=null,active=0,activePosition=null,mediaChapter=null,refreshToken=0,candleLit=true,candleBlown=false,candleSmokeTimer=0;
    let objectSource=null,objectPointer=false;
    const withObject=(source,fn,pointer=false)=>{const previous=objectSource,previousPointer=objectPointer;objectSource=source;objectPointer=pointer;try{return fn();}finally{objectSource=previous;objectPointer=previousPointer;}};
    const openDialog=html=>{
      const key=objectSource?.dataset.bookObject,source=objectSource?.isConnected?objectSource:key?app.querySelector(`[data-book-object="${CSS.escape(key)}"]`):null;
      const material=key==='map'?{kind:'map',targetSelector:'.reader-map'}:key==='photograph'||key?.startsWith('day-')?{kind:'photo',targetSelector:'.reader-photo'}:key?.startsWith('cat-')?{kind:'sticker',targetSelector:'.reader-cat-portrait'}:key==='cats'?{kind:'sticker',targetSelector:'.reader-cat-family'}:key==='song'?{kind:'soundtrack',targetSelector:'.reader-soundtrack'}:key==='note'?{kind:'letter'}:key==='wish'?{kind:'card'}:key==='gift'?{kind:'coupon',targetSelector:'.reader-coupon'}:key==='personal'||key==='distance'?{kind:'disclosure'}:{kind:'paper'};
      return presentDialog(html,source&&source.id!=='book-contents'?{source,objectKey:key,...material,pointer:objectPointer,capture:key&&material.kind!=='disclosure'?()=>film?.captureObject?.(key):undefined}:{});
    };
    const feedback=window.ScrapbookObjectFeedback?.create({app,onChange:detail=>film?.highlightObject?.(detail)});
    const discovery=window.ScrapbookDiscovery?.create({app,getPosition:()=>film?.getPosition?.()||{kind:'read',chapter:chapters[active][0]},onLift:detail=>film?.discoverObject?.(detail)});
    const icon=name=>`<img class="ui-icon" src="assets/icons/${glyphs[name]||'arrow-right'}.svg" alt="" width="20" height="20">`;
    const stickers=page=>window.ScrapbookStickers?.layer(page)||'';
    const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
    const safeLink=link=>{try{const u=new URL(link);return u.protocol==='https:'?u.href:'';}catch{return '';}};
    const sheet=(id,title,content,cls='')=>{
      const c=getConfig(),byline=[c.sender,c.name].filter(name=>name&&!/^\[.*\]$/.test(name.trim())).join(' & ');
      return `<section class="album-chapter ${cls}" id="${id}" aria-labelledby="${id}-title"><div class="page-seat"><article class="sheet"><span class="binding" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><div class="page-content"><h2 id="${id}-title" tabindex="-1">${title}</h2>${content}</div>${stickers(id)}<div class="page-foot"><span>${esc(byline)}</span><span>${chapters.findIndex(c=>c[0]===id)+1} / ${chapters.length}</span></div></article></div></section>`;
    };
    const art=(kind,alt,extra='')=>`<figure class="story-art ${kind}-art"><img src="assets/illustrations/${kind}.webp" alt="${alt}" width="1536" height="1024" decoding="async">${extra}</figure>`;
    const action=(id,label,glyph='book',key='')=>`<button class="story-button" id="${id}"${key?` data-book-object="${key}" aria-haspopup="dialog"`:''}>${label}${icon(glyph)}</button>`;
    const copy=(text,prompt,cls='')=>`<p class="story-copy ${cls}${text?'':' placeholder-copy'}"${text?'':' data-placeholder="true"'}>${esc(text||prompt)}</p>`;
    function gallery(c){
      return c.photos.map((src,i)=>({src,caption:c.captions[i]||'[The story behind this photo]'})).concat(c.germanyPhotos.map((src,i)=>({src,caption:c.germanyCaptions[i]||'[The story behind this October photo]'}))).filter(p=>p.src);
    }
    function showLong(label,title,text){
      const key=objectSource?.dataset.bookObject,c=getConfig();
      if(key==='note'){
        openDialog(`<h2 class="visually-hidden">${title}</h2><article class="reader-letter"><p class="reader-salutation">Dear ${esc(c.name)},</p><div class="note-dialog-copy full-owner-copy">${paragraphs(text)}</div><p class="reader-signoff">Love, ${esc(c.sender)}</p></article>`);return;
      }
      if(key==='wish'){
        openDialog(`<h2 class="visually-hidden">${title}</h2><article class="reader-birthday-card"><p class="reader-salutation">For ${esc(c.name)},</p><div class="note-dialog-copy full-owner-copy">${paragraphs(text)}</div><p class="reader-signoff">Love, ${esc(c.sender)}</p></article>`);return;
      }
      openDialog(`<p class="dialog-label">${label}</p><h2>${title}</h2><div class="note-dialog-copy full-owner-copy">${paragraphs(text)}</div><p class="settings-hint">From ${esc(getConfig().sender)}.</p>`);
    }
    function showPhotos(c){
      const photos=gallery(c);
      const selected=objectSource?.querySelector('img')?.getAttribute('src'),index=photos.findIndex(photo=>photo.src===selected);
      if(index>0)photos.unshift(...photos.splice(index,1));
      const sourceCaption=objectSource?.closest('figure')?.querySelector('figcaption')?.textContent;
      const placeholder=`<figure class="reader-photo" data-reader-placeholder="true"><span class="reader-photo-placeholder" data-placeholder="true">[Our photograph in Luxembourg]</span>${sourceCaption?`<figcaption>${esc(sourceCaption)}</figcaption>`:''}</figure>`;
      openDialog(`<p class="dialog-label">Moments to keep</p><h2>Our photographs.</h2>${photos.length?'':placeholder+'<p class="placeholder-copy" data-placeholder="true">[Our photographs from Trier and Luxembourg will go here.]</p>'}<div class="dialog-gallery">${photos.map((p,i)=>`<figure class="dialog-gallery-entry"><div class="reader-photo" data-reader-src="${esc(p.src)}"><img src="${esc(p.src)}" alt="${esc(p.caption)}" width="600" height="700" loading="${i?'lazy':'eager'}" decoding="async">${i===0&&sourceCaption?`<span class="reader-photo-date">${esc(sourceCaption)}</span>`:''}</div>${i===0&&sourceCaption===p.caption?'':`<figcaption>${esc(p.caption)}</figcaption>`}</figure>`).join('')}</div>`);
      document.querySelectorAll('.dialog-gallery img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.insertAdjacentHTML('afterend','<p class="image-error">This photo could not be loaded.</p>');},{once:true}));
    }
    function soundtrackContent(c){
      const selectedSong=artists.find(a=>c.songTitles[a]);
      return `<span><span class="soundtrack-label">The soundtrack</span><span class="soundtrack-song"${selectedSong?'':' data-placeholder="true"'}>${esc(selectedSong?c.songTitles[selectedSong]:'[A song from these days]')}</span></span>${icon('music')}`;
    }
    function showMusic(c){
      const prepared=artists.some(a=>c.songTitles[a]||c.songLinks[a]||c.artistNotes[a]);
      openDialog(`<h2 class="visually-hidden">The soundtrack.</h2><div class="reader-soundtrack soundtrack-slip">${soundtrackContent(c)}</div><p class="dialog-label">Music you love</p>${prepared?'':'<p class="placeholder-copy" data-placeholder="true">[Choose a song that means something to you both. Add the story behind it.]</p>'}<div class="playlist-dialog">${artists.map(a=>{
        const url=safeLink(c.songLinks[a]),has=Boolean(c.songTitles[a]||url||c.artistNotes[a]);
        const body=`${c.songTitles[a]?`<p class="dialog-song">${esc(c.songTitles[a])}</p>`:''}${c.artistNotes[a]?`<div class="prose">${paragraphs(c.artistNotes[a])}</div>`:''}${url?`<a class="song-link" href="${esc(url)}" target="_blank" rel="noopener noreferrer">Listen to the song ${icon('arrow')}</a>`:''}`;
        return has?`<details class="playlist-entry"><summary>${a}${icon('music')}</summary>${body}</details>`:`<p class="playlist-name">${a}${icon('music')}</p>`;
      }).join('')}</div><div class="hamilton-caption" aria-label="Lewis Hamilton, number 44"><strong>44</strong><span>Lewis Hamilton</span></div>`);
    }
    function showCats(){
      const key=objectSource?.dataset.bookObject,index=/^cat-[0-4]$/.test(key||'')?Number(key.slice(4)):-1,selected=cats[index];
      const portrait=selected?catPortrait(index,'reader-cat-portrait',`data-reader-cat="${index}"`):'';
      const family=`<figure class="reader-cat-family" aria-label="Winnie, Bonnie, Connie, Wonnie and Minnie">${cats.map((cat,i)=>`<span class="pet-sticker" style="--pet:${i}">${catPortrait(i)}<span class="pet-name">${cat.name}</span></span>`).join('')}</figure>`;
      openDialog(`${portrait}<h2>${selected?selected.name:'Your five cats.'}</h2>${selected?`<p>${selected.coat}</p><p class="dialog-label">Your five cats.</p>`:'<p class="dialog-label">Winnie, Bonnie, Connie, Wonnie, Minnie</p>'}${family}<p class="settings-hint">Illustrated from their descriptions. Minnie is based on your photo.</p><dl class="cat-coats">${cats.map(cat=>`<div><dt>${cat.name}</dt><dd>${cat.coat}</dd></div>`).join('')}</dl>`);
    }
    function showDay(c,index){
      const src=c.germanyPhotos[index],caption=c.germanyCaptions[index],day=trip.days[index];
      openDialog(`<p class="dialog-label">${day.location} · 2026</p><h2>${day.date}.</h2><figure class="dialog-day-photo"><div class="reader-photo reader-photo-visual"${src?` data-reader-src="${esc(src)}"`:' data-reader-placeholder="true"'}>${src?`<img src="${esc(src)}" alt="${esc(caption||'Photo from '+day.date)}" width="600" height="700">`:`<span class="reader-photo-placeholder" data-placeholder="true">[Photo ${index+1}]</span>`}</div></figure>${src?'':'<p class="placeholder-copy" data-placeholder="true">[A photo from this day]</p>'}${caption?`<div class="prose full-owner-copy">${paragraphs(caption)}</div>`:`<p class="placeholder-copy" data-placeholder="true">${day.prompt}</p>`}`);
      document.querySelector('.dialog-day-photo img')?.addEventListener('error',event=>{event.target.hidden=true;event.target.insertAdjacentHTML('afterend','<p class="image-error">This photo could not be loaded.</p>');},{once:true});
    }
    function showTrip(c){
      const notes=[c.intro,c.dedication].filter(text=>text.trim()).join('\n\n');
      openDialog(`<p class="dialog-label">${trip.dates}</p><h2>Trier & Luxembourg.</h2><figure class="dialog-map"><div class="reader-map"><img src="${trip.map}" alt="${trip.mapAlt}" width="1000" height="650"></div><figcaption>Luxembourg is shown as a country. Trier marks the beginning and end of these four days; the map does not trace a travel route. Border: <a href="https://www.naturalearthdata.com/about/terms-of-use/" target="_blank" rel="noopener noreferrer">Natural Earth, public domain</a>. Trier point: <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">© OpenStreetMap contributors</a>, ODbL.</figcaption></figure><ol class="trip-days">${trip.days.map(day=>`<li><strong>${day.date}</strong><span>${day.place}</span></li>`).join('')}</ol>${notes?`<div class="prose full-owner-copy">${paragraphs(notes)}</div>`:`<p class="placeholder-copy" data-placeholder="true">${prompts.dedication}</p>`}<p class="placeholder-copy" data-placeholder="true">[A ticket, receipt or tiny find from these four days.]</p>`);
    }
    function showPersonal(c){
      const notes=c.littleThings.map((text,i)=>({text,label:detailPrompts[i]})).concat(c.wishes.map((text,i)=>({text,label:wishPrompts[i]}))).filter(n=>n.text.trim());
      openDialog(`<p class="dialog-label">Things I want to keep</p><h2>About you.</h2><div class="personal-note-list">${notes.map(n=>`<article><h3>${n.label}</h3><div class="prose">${paragraphs(n.text)}</div></article>`).join('')}</div>`);
    }
    function showGift(c){
      if(!candleBlown){go('birthday',true);toast('Blow out the candle to open your gift.');return;}
      openDialog(`<div class="reader-coupon"><span class="coupon-heading">Amazon.de</span><strong class="coupon-amount">€25</strong></div><p class="dialog-label">${c.voucherCode?'Your birthday gift':'Gift coupon draft'}</p><h2>Something you love.</h2>${c.voucherCode?`<p>Copy this code to use it on Amazon.de.</p><code class="voucher-code">${esc(c.voucherCode)}</code><button class="primary-button" id="copy-voucher">Copy code ${icon('copy')}</button><a class="secondary-button amazon-link" href="https://www.amazon.de/gc/redeem" target="_blank" rel="noopener noreferrer">Redeem on Amazon.de ${icon('arrow')}</a>`:'<p class="placeholder-copy" data-placeholder="true">[Amazon.de voucher code]</p><p class="settings-hint">No code has been added yet. Add your purchased voucher code in the personalisation menu.</p>'}`);
      const copyButton=document.getElementById('copy-voucher');if(copyButton)copyButton.onclick=async()=>{try{await navigator.clipboard.writeText(c.voucherCode);toast('Gift code copied.');}catch{toast('Select the displayed code and copy it manually.');}};
    }
    const candleCaption=()=>!candleLit?'Make a wish.':candleBlown?'Tap the candle':'Tap to blow out the candle.';
    function syncGiftGate(){
      app.dataset.giftUnlocked=String(candleBlown);
      const gift=document.getElementById('gift');if(gift){gift.hidden=!film&&!candleBlown;if(!film)gift.inert=!candleBlown;}
    }
    function cake(){
      return `<div class="birthday-celebration"><button class="birthday-cake" id="birthday-candle" data-book-object="cake" data-candle-lit="${candleLit}" aria-label="${candleLit?'Blow out the birthday candle':'Light the birthday candle again'}"><span class="cake-popup" aria-hidden="true"><span class="cake-support cake-support-left"></span><span class="cake-support cake-support-right"></span><img class="cake-art" src="assets/cutouts/birthday-cake.webp" alt="" width="1536" height="1024" decoding="async"><span class="cake-art-error" hidden>Cake illustration unavailable.</span><span class="cake-candle"><span class="cake-wick"></span><span class="cake-flame"></span><span class="cake-smoke"></span></span></span><span class="cake-caption" id="birthday-candle-hint" role="status" aria-live="polite">${candleCaption()}</span></button></div>`;
    }
    function toggleCandle(){
      candleLit=!candleLit;if(!candleLit&&!candleBlown){candleBlown=true;toast('You can turn the page now.');}clearTimeout(candleSmokeTimer);
      onSceneChange({chapter:chapters[active][0],candleBlown});
      app.querySelectorAll('.birthday-cake').forEach(button=>{
        button.dataset.candleLit=String(candleLit);button.setAttribute('aria-label',candleLit?'Blow out the birthday candle':'Light the birthday candle again');
        button.querySelector('.cake-caption').textContent=candleCaption();
        button.classList.remove('candle-smoking');if(!candleLit&&!reduced()){void button.offsetWidth;button.classList.add('candle-smoking');}
      });
      candleSmokeTimer=setTimeout(()=>app.querySelectorAll('.candle-smoking').forEach(button=>button.classList.remove('candle-smoking')),1200);
      film?.setBirthdayCandle?.(candleLit);
      syncGiftGate();setActive(active,activePosition);
    }
    function render(){
      discovery?.reset();feedback?.reset();clearTimeout(candleSmokeTimer);refreshToken++;observer?.disconnect();motion?.revert();motion=null;observer=null;
      const c=getConfig(),tight=document.documentElement.clientWidth<400,photos=gallery(c),personal=c.littleThings.concat(c.wishes).some(t=>t.trim());
      const detail=c.littleThings.find(t=>t.trim())||'',tripPhotos=trip.featuredDayOrder.map(i=>({src:c.germanyPhotos[i],caption:c.germanyCaptions[i]||'[The story behind this October photo]',day:trip.days[i]})).filter(p=>p.src),photo=tripPhotos[0]||photos[0];
      const opening=excerpt(c.intro,tight?60:80),context=excerpt(c.dedication,tight?60:80),observation=excerpt(detail,tight?65:85),distance=excerpt(c.distanceNote,tight?70:90),wish=wishExcerpt(c.wishes[2],Math.max(140,Math.min(document.documentElement.clientWidth-40,430)-94)),letter=excerpt(c.letter,tight?70:100);
      const map=`<figure class="story-art trier-map"><button id="open-trier" data-book-object="map" aria-label="Open the Trier and Luxembourg map and notes"><img src="${trip.map}" alt="${trip.mapAlt}" width="1000" height="650"></button></figure>`;
      const hero=`<figure class="story-art real-memory${photo?'':' photo-placeholder'}"><button id="open-photo-hero" data-book-object="photograph" aria-label="Open our photographs">${photo?`<img src="${esc(photo.src)}" alt="${esc(photo.caption)}" width="600" height="700">`:'<span class="photo-blank" data-placeholder="true">[Our photograph in Luxembourg]</span>'}</button><figcaption>${esc(photo?.day?photo.day.place+' · '+photo.day.date+' 2026':photo?'October 2026':'Luxembourg · October 2026')}</figcaption><span class="photo-tape" aria-hidden="true"></span></figure>`;
      const catFamily=`<figure class="recap-pets"><button class="cat-family-open" id="open-cats" data-book-object="cats" aria-label="Meet Winnie, Bonnie, Connie, Wonnie and Minnie">${cats.map((cat,i)=>`<span class="pet-sticker" data-book-object="cat-${i}" style="--pet:${i}">${catPortrait(i)}<span class="pet-name">${cat.name}</span></span>`).join('')}</button></figure>`;
      const days=`<div class="recap-days photo-fragments">${trip.days.map((day,i)=>{const summary=excerpt(c.germanyCaptions[i],tight?28:40).text;return `<button class="recap-day photo-fragment" id="open-day-${i}" data-book-object="day-${i}" aria-label="Open ${day.date}: ${day.place}"><span class="fragment-image">${c.germanyPhotos[i]?`<img src="${esc(c.germanyPhotos[i])}" alt="Photo from ${day.date}" width="240" height="160">`:`<span class="fragment-placeholder" data-placeholder="true">[Photo ${i+1}]</span>`}</span><span class="fragment-caption"><strong>${day.shortDate}</strong><span class="recap-day-copy">${esc(summary||day.place)}</span></span></button>`;}).join('')}</div>`;
      const soundtrack=`<button class="soundtrack-slip" id="open-playlist" data-book-object="song">${soundtrackContent(c)}</button>`;
      app.className='album-story edited-story';
      app.innerHTML=`
        <section class="cover-chapter birthday-cover" id="cover" aria-labelledby="cover-title"><div class="cover-seat"><div class="cover-model"><div class="cover-paper" aria-hidden="true"></div><div class="book-front"><div class="cover-spine" aria-hidden="true"><span class="cover-spine-caption">${trip.spine}</span></div><p class="cover-kicker">A little world, kept on paper.</p><h1 id="cover-title" tabindex="-1"><span class="cover-nameplate cover-dedication" data-name-size="${c.name.length>60?'extended':c.name.length>36?'long':c.name.length>22?'medium':'short'}"><span class="cover-dedication-stitch" aria-hidden="true"></span><span class="cover-for">For</span><strong>${esc(c.name)}</strong><span class="cover-label-caption">A birthday scrapbook</span></span></h1><p class="cover-month">2 November 2026</p><p class="cover-edition">${trip.shortDates}<br>${trip.places}</p>${stickers('cover')}</div><span class="cover-ribbon" aria-hidden="true"></span></div><a class="open-book" href="#dedication">Open the book</a></div></section>
        ${sheet('dedication','Luxembourg',`<p class="recap-location">${trip.dates} · from Trier</p>${map}${copy(opening.text,prompts.intro,'recap-intro')}<div class="keepsake-slip" data-placeholder="true"><span class="keepsake-label">A little find</span><span>[A ticket or receipt from Luxembourg]</span></div>`,'opening-chapter city-chapter')}
        ${sheet('your-world','Four days',`<p class="contact-caption">Trier · Luxembourg · ${trip.shortDates}</p>${days}${personal?`<div class="story-actions">${action('open-personal','Little notes','book','personal')}</div>`:''}`,'world-chapter recap-days-chapter')}
        ${sheet('october','One photograph',`${hero}${copy(distance.text,prompts.scene,'distance-excerpt')}${distance.truncated?`<div class="story-actions">${action('open-distance','Read the note','book','distance')}</div>`:''}`,'together-chapter')}
        ${sheet('letter','A note, folded in',`<button class="letter-excerpt folded-letter" id="open-letter" data-book-object="note" aria-label="Read the full note" aria-haspopup="dialog"><span class="letter-salutation">Dear ${esc(c.name)},</span><span class="story-copy${letter.text?'':' placeholder-copy'}"${letter.text?'':' data-placeholder="true"'}>${esc(letter.text||prompts.letter)}</span><span class="letter-signoff-short">Love, ${esc(c.sender)}</span><span class="letter-crease" aria-hidden="true"></span></button>${catFamily}${soundtrack}`,'short-letter-chapter')}
        ${sheet('birthday','Happy birthday.',`<p class="birthday-addressee">For ${esc(c.name)},</p>${cake()}<button class="birthday-wish-note" id="open-birthday-note" data-book-object="wish" aria-label="Read your full birthday note" aria-haspopup="dialog"><span class="birthday-wish${wish.text?'':' placeholder-copy'}"${wish.text?'':' data-placeholder="true"'}>${esc(wish.text||prompts.wish)}</span><span class="birthday-signoff"><span>Love, ${esc(c.sender)}</span><span class="birthday-read-note">Read note</span></span></button>`,'birthday-cake-chapter')}
        ${sheet('gift','A little something.',`<div class="gift-ending"><button class="birthday-keepsake voucher-coupon pocket-gift" id="open-gift" data-book-object="gift" aria-label="Open your 25 euro Amazon.de gift coupon" aria-haspopup="dialog" aria-controls="map-dialog"><span class="coupon-ink coupon-card"><span class="coupon-heading">Amazon.de</span><strong class="coupon-amount">€25</strong></span><span class="gift-pocket-front"><span class="pocket-label">For you</span><span class="pocket-open">Open your gift ${icon('arrow')}</span></span></button><a class="replay-link" href="#cover">Read from the cover ${icon('back')}</a></div>`,'ending-chapter gift-chapter')}
        <nav class="book-navigation" aria-label="Book navigation"><button id="previous-page" class="icon-button" aria-label="Previous page">${icon('back')}</button><button id="book-contents"><span id="current-chapter" aria-live="polite" aria-atomic="true">Cover</span><span id="page-position">1 / ${chapters.length}</span></button><button id="next-page" class="icon-button" aria-label="Next page">${icon('arrow')}</button></nav>`;
      const bind=(id,fn)=>{const b=document.getElementById(id);if(b)b.onclick=event=>withObject(event.target.closest('[data-book-object]')||event.currentTarget,()=>fn(event),event.detail>0);};
      bind('open-dedication',()=>showLong('A note from me','For you.',c.intro+(c.dedication.trim()?'\n\n'+c.dedication:'')));
      bind('open-playlist',()=>showMusic(c));bind('open-personal',()=>showPersonal(c));bind('open-gallery',()=>showPhotos(c));bind('open-photo-hero',()=>showPhotos(c));
      bind('open-cats',showCats);
      bind('open-trier',()=>showTrip(c));dayPrompts.forEach((_,i)=>bind('open-day-'+i,()=>showDay(c,i)));
      bind('birthday-candle',toggleCandle);
      bind('open-distance',()=>showLong('From here, for you','From afar.',c.distanceNote));bind('open-letter',()=>showLong('Your birthday letter','For '+esc(c.name)+'.',c.letter||prompts.letter));bind('open-birthday-note',()=>showLong('2 November','Happy birthday.',c.wishes[2]||prompts.wish));bind('open-gift',()=>{if(!candleBlown){go('gift',true);return;}showGift(c);});
      app.querySelectorAll('.real-memory img,.fragment-image img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;if(!img.parentElement.querySelector('.image-error'))img.parentElement.insertAdjacentHTML('beforeend','<span class="image-error">This photo could not be loaded.</span>');},{once:true}));
      app.querySelectorAll('.cake-art').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.parentElement.querySelector('.cake-art-error').hidden=false;},{once:true}));
      app.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();if(film&&a.classList.contains('open-book'))film.open(e.detail===0);else if(film&&a.classList.contains('replay-link'))film.replay(e.detail===0);else go(a.hash.slice(1),e.detail===0);});
      bind('previous-page',e=>film?film.previous(e.detail===0):go(chapters[Math.max(0,active-1)][0],e.detail===0));
      bind('next-page',e=>film?film.next(e.detail===0):go(chapters[Math.min(chapters.length-1,active+1)][0],e.detail===0));
      bind('book-contents',()=>{
        openDialog(`<h2>The pages.</h2><nav class="contents-list" aria-label="Contents">${chapters.map(([id,label],i)=>`<a href="#${id}"${i===active?' aria-current="page"':''}><span>${label}</span><span>${id==='gift'&&!candleBlown?'Blow out the candle first':i+1}</span></a>`).join('')}</nav>`);
        document.querySelectorAll('.contents-list a').forEach(a=>a.onclick=e=>{e.preventDefault();document.getElementById('map-dialog').close();go(a.hash.slice(1),true);});
      });
      observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting);if(visible.length)setActive(chapters.findIndex(c=>c[0]===visible.at(-1).target.id));},{rootMargin:'-35% 0px -45% 0px',threshold:0});
      chapters.forEach(([id])=>observer.observe(document.getElementById(id)));setActive(0);animate();syncGiftGate();
    }
    function setActive(index,position){
      if(index<0)return;active=index;activePosition=position||null;
      const cover=index===0,navigation=document.querySelector('.book-navigation'),home=document.querySelector('.site-header .brand');
      document.body.dataset.bookChapter=chapters[index][0];
      navigation.inert=cover;navigation.setAttribute('aria-hidden',String(cover));
      home.inert=cover;home.setAttribute('aria-hidden',String(cover));
      document.getElementById('current-chapter').textContent=chapters[index][1]+(position?.parts>1?` · ${position.part}/${position.parts}`:'');
      document.getElementById('page-position').textContent=position?`${position.page} / ${position.total}`:`${index+1} / ${chapters.length}`;
      document.getElementById('book-contents').setAttribute('aria-label',`Open contents, ${chapters[index][1]}, page ${position?.page||index+1} of ${position?.total||chapters.length}`);
      const locked=!candleBlown&&(position?position.giftLocked:chapters[index][0]==='birthday'),next=document.getElementById('next-page');
      document.getElementById('previous-page').disabled=index===0;next.disabled=(position?position.last:index===chapters.length-1)||locked;
      if(locked)next.setAttribute('aria-describedby','birthday-candle-hint');else next.removeAttribute('aria-describedby');
      onSceneChange({chapter:chapters[index][0],candleBlown});
      discovery?.refresh();
    }
    function animate(){
      if(!window.gsap||!window.ScrollTrigger||!window.BookExperience)return;
      gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});motion=gsap.matchMedia();
      motion.add('(prefers-reduced-motion: no-preference) and (min-height: 500px)',()=>{
        const returnTo=mediaChapter||chapters[active]?.[0]||'cover',token=refreshToken;mediaChapter=null;observer?.disconnect();const gift=document.getElementById('gift');gift.hidden=false;gift.inert=false;
        film=BookExperience.create({app,chapters,setActive,isGiftUnlocked:()=>candleBlown});
        if(!film)chapters.forEach(([id])=>observer?.observe(document.getElementById(id)));else if(returnTo!=='cover')film.go(returnTo,true);
        return()=>{const returnTo=mediaChapter||chapters[active]?.[0]||'cover';mediaChapter=null;film?.destroy();film=null;syncGiftGate();chapters.forEach(([id])=>observer?.observe(document.getElementById(id)));requestAnimationFrame(()=>{if(token===refreshToken&&!film)go(returnTo,true);});};
      });
    }
    function go(id,focus=false){
      id=aliases[id]||id;if(id==='gift'&&!candleBlown){id='birthday';toast('Blow out the candle to open your gift.');}
      const target=document.getElementById(id);if(!target)return;if(film){film.go(id,focus);return;}
      window.scrollTo({top:id==='cover'?0:target.getBoundingClientRect().top+scrollY-82,behavior:focus||reduced()?'instant':'smooth'});setActive(chapters.findIndex(c=>c[0]===id));
      if(focus)target.querySelector('h1,h2')?.focus({preventScroll:true});
    }
    let reflowFrame=null,clearReflowWait=()=>{};
    function refresh(event){
      const position=event?.type==='book-reflow'?film?.getPosition():null,id=chapters[active]?.[0]||'cover';
      const frame=position?film?.freeze():null;clearReflowWait();
      if(frame||!position){reflowFrame?.remove();reflowFrame=frame;}
      if(frame)document.body.append(frame);
      render();if(position&&film?.resume)film.resume(position);else go(id,true);
      if(!reflowFrame)return;
      const host=app.querySelector('.book-film'),inputs=['wheel','touchstart','pointerdown','keydown'];
      const release=()=>{clearReflowWait();reflowFrame?.remove();reflowFrame=null;};
      if(!host?.classList.contains('three-available')||host.dataset.assetsReady!=='false'){release();return;}
      const timer=setTimeout(release,5000);
      host.addEventListener('book-graphics-ready',release);host.addEventListener('book-graphics-fallback',release);
      inputs.forEach(type=>window.addEventListener(type,release,{passive:true,once:true}));
      clearReflowWait=()=>{clearTimeout(timer);host.removeEventListener('book-graphics-ready',release);host.removeEventListener('book-graphics-fallback',release);inputs.forEach(type=>window.removeEventListener(type,release));clearReflowWait=()=>{};};
    }
    let restoreTimer;
    function restoreVisibleBook(){
      clearTimeout(restoreTimer);
      if(film||document.querySelector('dialog[open]')||reduced()||!window.gsap||!window.ScrollTrigger)return;
      restoreTimer=setTimeout(()=>{
        if(!film&&!document.querySelector('dialog[open]')&&window.BookExperience?.viewportSize().height>=500&&matchMedia('(min-height:500px)').matches)refresh();
      },220);
    }
    window.visualViewport?.addEventListener('resize',restoreVisibleBook,{passive:true});
    document.addEventListener('close',restoreVisibleBook,true);
    // GSAP reverts its timeline before context cleanup and can report Cover.
    // Remember the actual leaf first when the motion preference changes.
    window.gsap?.addEventListener('matchMediaInit',()=>{mediaChapter=chapters[active]?.[0]||'cover';});
    app.addEventListener('book-reflow',refresh);return {render,refresh,go,icon,replay:()=>film?.replay?film.replay(false):go('cover')};
  };
})();

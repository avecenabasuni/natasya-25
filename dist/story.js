(() => {
  'use strict';
  const esc = value => String(value ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const glyphs={close:'x',settings:'pencil-simple',mute:'speaker-slash',sound:'speaker-high',download:'download-simple',gift:'gift',arrow:'arrow-right',back:'arrow-left',copy:'copy',music:'music-notes',book:'book-open'};
  const trip=window.SCRAPBOOK_TRIP;
  const chapters=[['cover','Cover'],['dedication','Trier & Luxembourg'],['your-world','22–23 October'],['your-world-return','24–25 October'],['october','Photographs'],['letter','Notes'],['birthday','2 November'],['gift','One last note']];
  const aliases={'little-things':'your-world','soundtrack-a':'your-world','soundtrack-b':'your-world',moments:'october',closer:'october','next-chapter':'letter'};
  const cats=[
    {name:'Winnie',coat:'Orange.',birthdayNote:"Your chubby, lazy, food-loving second favourite. I’m here for your 25th, preferably lying down and close to something to eat."},
    {name:'Bonnie',coat:'Mostly white, with brown-grey tabby markings on the head and forelegs, a striped tail and a pink nose.',birthdayNote:"I love having other cats to play with. Today, though, you’re the one we’re all celebrating."},
    {name:'Connie',coat:'Orange and dark calico-tabby patches, a white face, chest and legs, and a little grey collar with a bell.',birthdayNote:"I’m the shy one, so I’ll keep this small: a little birthday love, just for you."},
    {name:'Wonnie',coat:'Grey-brown tabby with dark stripes, a white chest and white paws.',birthdayNote:"Here, there, everywhere, then ready for more pampering. Your favourite little wanderer couldn’t be left out of your 25th."},
    {name:'Minnie',coat:'Black, brown and orange tortoiseshell, based on your photo.',birthdayNote:"I may be little, but playing with you is a big deal to me. Your tiny playmate had to be here, too."}
  ];
  // The family illustration has uneven, touching outlines; these shared seams
  // follow its white sticker borders instead of cutting five equal columns.
  const catSeams=[[[419,0],[419,432],[416,437],[416,451],[411,457],[416,472],[414,483],[418,487],[416,489],[418,500],[413,505],[414,518],[416,520],[415,539],[419,545],[420,557],[425,562],[424,571],[426,577],[425,599],[421,603],[422,819]],[[784,0],[784,469],[788,473],[788,479],[786,482],[787,496],[783,501],[784,510],[780,514],[782,518],[780,522],[782,528],[782,544],[780,546],[782,564],[777,574],[783,585],[783,591],[793,606],[790,612],[791,624],[789,630],[804,648],[800,658],[800,819]],[[1151,0],[1151,318],[1153,320],[1153,387],[1160,395],[1160,443],[1164,459],[1162,468],[1162,501],[1153,510],[1152,515],[1160,523],[1165,547],[1163,554],[1164,565],[1161,568],[1164,579],[1159,590],[1159,594],[1165,603],[1163,608],[1165,624],[1163,632],[1163,819]],[[1528,0],[1528,395],[1532,400],[1533,415],[1536,422],[1536,501],[1538,503],[1538,532],[1532,539],[1536,552],[1535,578],[1540,584],[1537,613],[1538,623],[1541,634],[1547,644],[1548,653],[1552,657],[1552,661],[1548,665],[1552,677],[1552,819]]];
  const catBounds=[[11,47,427,772],[411,66,805,769],[777,63,1166,768],[1152,69,1553,768],[1532,132,1909,769]];
  function catPortrait(index,classes='',attrs=''){
    if(index===1)return `<span class="pet-portrait ${classes}" style="--pet:${index}" ${attrs}><span class="pet-frame" data-cat-frame="0,0,1024,1536" data-cat-polygon="0,0 100,0 100,100 0,100" style="--cat-ratio:${1024/1536};--cat-width:100%;--cat-height:100%;--cat-left:0%;--cat-top:0%;clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%)"><img src="assets/cutouts/bonnie.webp" alt="Bonnie, mostly white with brown-grey tabby markings on the head and forelegs, a striped tail and a pink nose" width="1024" height="1536"></span></span>`;
    if(index===2)return `<span class="pet-portrait ${classes}" style="--pet:${index}" ${attrs}><span class="pet-frame" data-cat-frame="0,0,1024,1536" data-cat-polygon="0,0 100,0 100,100 0,100" style="--cat-ratio:${1024/1536};--cat-width:100%;--cat-height:100%;--cat-left:0%;--cat-top:0%;clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%)"><img src="assets/cutouts/connie.webp" alt="Connie, an orange, dark and white calico tabby with a grey collar and bell" width="1024" height="1536"></span></span>`;
    if(index===3)return `<span class="pet-portrait ${classes}" style="--pet:${index}" ${attrs}><span class="pet-frame" data-cat-frame="0,0,1024,1536" data-cat-polygon="0,0 100,0 100,100 0,100" style="--cat-ratio:${1024/1536};--cat-width:100%;--cat-height:100%;--cat-left:0%;--cat-top:0%;clip-path:polygon(0% 0%,100% 0%,100% 100%,0% 100%)"><img src="assets/cutouts/wonnie.webp" alt="Wonnie, a grey-brown tabby with dark stripes, a white chest and white paws" width="1024" height="1536"></span></span>`;
    const cat=cats[index],[x0,,x1]=catBounds[index],x=Math.max(0,x0-12),y=31,w=Math.min(1919,x1+12)-x,h=759;
    const left=index?catSeams[index-1]:[[0,0],[0,820]],right=index<4?catSeams[index]:[[1919,0],[1919,820]];
    const points=[...left,...[...right].reverse()].map(([px,py])=>[+(100*(px-x)/w).toFixed(5),+(100*(py-y)/h).toFixed(5)]);
    const polygon=points.map(p=>p.join(',')).join(' '),clip=points.map(([px,py])=>px+'% '+py+'%').join(',');
    return `<span class="pet-portrait ${classes}" style="--pet:${index}" ${attrs}><span class="pet-frame" data-cat-frame="${x},${y},${w},${h}" data-cat-polygon="${polygon}" style="--cat-ratio:${w/h};--cat-width:${1919/w*100}%;--cat-height:${820/h*100}%;--cat-left:${-x/w*100}%;--cat-top:${-y/h*100}%;clip-path:polygon(${clip})"><img src="assets/cutouts/five-cats.webp" alt="${cat.name}, ${esc(cat.coat.toLowerCase())}" width="1919" height="820"></span></span>`;
  }
  const catPrints=cats.map((cat,i)=>{
    const template=document.createElement('template');template.innerHTML=catPortrait(i);
    const frame=template.content.querySelector('.pet-frame'),image=frame.querySelector('img');
    return {name:cat.name,src:image.getAttribute('src'),frame:frame.dataset.catFrame.split(',').map(Number),polygon:frame.dataset.catPolygon.split(' ').map(p=>p.split(',').map(Number))};
  });
  window.ScrapbookCatPortraits={markup:catPortrait,prints:catPrints};
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
  window.ScrapbookStory=({getConfig,toast,openDialog:presentDialog,onSceneChange=()=>{}})=>{
    const app=document.getElementById('app');
    let motion=null,film=null,observer=null,active=0,activePosition=null,refreshToken=0,candleLit=true,candleBlown=false,candleSmokeTimer=0;
    let objectSource=null,objectPointer=false,nativePaperIndex=null;
    const withObject=(source,fn,pointer=false)=>{const previous=objectSource,previousPointer=objectPointer;objectSource=source;objectPointer=pointer;try{return fn();}finally{objectSource=previous;objectPointer=previousPointer;}};
    const openDialog=html=>{
      const key=objectSource?.dataset.bookObject,source=objectSource?.isConnected?objectSource:key?app.querySelector(`[data-book-object="${CSS.escape(key)}"]`):null;
      const material=key==='map'?{kind:'map',targetSelector:'.reader-map'}:key==='photograph'||key?.startsWith('day-')?{kind:'photo',targetSelector:'.reader-photo'}:key?.startsWith('cat-')?{kind:'sticker',targetSelector:'.reader-cat-portrait'}:key==='cats'?{kind:'sticker',targetSelector:'.reader-cat-family'}:key==='song'?{kind:'soundtrack',targetSelector:'.reader-soundtrack'}:key==='note'||key==='wish'?{kind:'letter'}:key==='gift'?{kind:'coupon',targetSelector:'.reader-coupon'}:key==='personal'||key==='distance'?{kind:'disclosure'}:{kind:'paper'};
      return presentDialog(html,source&&source.id!=='book-contents'?{source,objectKey:key,...material,pointer:objectPointer,capture:key&&material.kind!=='disclosure'?()=>film?.captureObject?.(key):undefined}:{});
    };
    const feedback=window.ScrapbookObjectFeedback?.create({app,onChange:detail=>film?.highlightObject?.(detail)});
    const discovery=window.ScrapbookDiscovery?.create({app,getPosition:()=>film?.getPosition?.()||{kind:activePosition?.side==='left'?'divider':'read',chapter:chapters[active][0]},onLift:detail=>film?.discoverObject?.(detail)});
    const icon=name=>{const src=`assets/icons/${glyphs[name]||'arrow-right'}.svg`;return `<img class="ui-icon" src="${window.ScrapbookIntro?.imageURL(src)||src}" alt="" width="20" height="20">`;};
    const stickers=(page,scope)=>window.ScrapbookStickers?.layer(page,scope)||'';
    const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
    const safeLink=link=>{try{const u=new URL(link);return u.protocol==='https:'?u.href:'';}catch{return '';}};
    const sheet=(id,title,content,cls='')=>{
      return `<section class="album-chapter ${cls}" id="${id}" aria-labelledby="${id}-title"><div class="page-seat"><article class="sheet"><span class="binding" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><div class="page-content"><h2 id="${id}-title"${id==='october'?' class="visually-hidden" data-scene-skip="true"':''} tabindex="-1">${title}</h2>${content}</div>${stickers(id)}</article></div></section>`;
    };
    const art=(kind,alt,extra='')=>`<figure class="story-art ${kind}-art"><img src="assets/illustrations/${kind}.webp" alt="${alt}" width="1536" height="1024" decoding="async">${extra}</figure>`;
    const action=(id,label,glyph='book',key='')=>`<button class="story-button" id="${id}"${key?` data-book-object="${key}" aria-haspopup="dialog"`:''}>${label}${icon(glyph)}</button>`;
    const copy=(text,prompt,cls='')=>`<p class="story-copy ${cls}${text?'':' placeholder-copy'}"${text?'':' data-placeholder="true"'}>${esc(text||prompt)}</p>`;
    function gallery(c){
      return c.photos.map((src,i)=>({src,caption:c.captions[i]||'[The story behind this photo]',date:trip.photoLabels?.[src]||'October 2026'})).concat(c.germanyPhotos.map((src,i)=>({src,caption:c.germanyCaptions[i]||'[The story behind this October photo]',date:trip.days[i].date+' 2026 · '+trip.days[i].place}))).filter(p=>p.src);
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
    function showMainPhoto(photo){
      if(!photo){openDialog('<h2>Our photograph.</h2><p>No photograph has been added yet.</p>');return;}
      const date=photo.day?photo.day.place+' · '+photo.day.date+' 2026':photo.date||trip.photoLabels?.[photo.src]||'October 2026';
      openDialog(window.ScrapbookPhotoCards.markup([{...photo,date}],{main:true}));
    }
    function showPhotos(c){
      const photos=gallery(c);
      const sourceImage=objectSource?.querySelector('img'),selected=sourceImage?.dataset.preparedSrc||sourceImage?.getAttribute('src');
      const index=selected?photos.findIndex(photo=>new URL(photo.src,location.href).href===new URL(selected,location.href).href):-1;
      if(index>0)photos.unshift(...photos.splice(index,1));
      if(photos.length){openDialog(window.ScrapbookPhotoCards.markup(photos));return;}
      openDialog('<h2>Our photographs.</h2><p>No photographs have been added yet.</p>');
    }

    function soundtrackContent(c){
      const memory=c.memorableSong;
      return `<span><span class="soundtrack-label">Our song${memory?.artist?`<span class="soundtrack-artist"> · ${esc(memory.artist)}</span>`:''}</span><span class="soundtrack-song"${memory?.title?'':' data-placeholder="true"'}>${esc(memory?.title||'[Our song]')}</span></span>${icon('music')}`;
    }
    function showMusic(c){
      const memorableLink=c.memorableSong?.title?safeLink(c.memorableSong.url):'';
      openDialog(`<h2 class="visually-hidden">Our song.</h2><div class="reader-soundtrack soundtrack-slip">${soundtrackContent(c)}</div>${memorableLink?`<a class="song-link memorable-song-link" href="${esc(memorableLink)}" target="_blank" rel="noopener noreferrer">Listen to our song ${icon('arrow')}</a>`:''}`);
    }
    function showDay(c,index){
      const src=c.germanyPhotos[index],day=trip.days[index],caption=c.germanyCaptions[index].trim();
      if(src){openDialog(window.ScrapbookPhotoCards.markup([{src,caption:caption||day.prompt,date:day.date+' 2026 · '+day.place}]));return;}
      openDialog(`<h2>${day.date}.</h2><p class="placeholder-copy">${esc(day.prompt)}</p>`);
    }

    function showTrip(c){
      const notes=[c.intro.trim()||trip.personalIntro,c.dedication.trim()].filter(Boolean).join('\n\n');
      const meals=trip.mealMemories.map((meal,i)=>({...meal,text:c.mealNotes?.[i]??meal.text})).filter(meal=>meal.text.trim()).map(meal=>`<article><h3>${meal.date} · ${meal.place}</h3>${paragraphs(meal.text)}</article>`).join('');
openDialog(`<p class="dialog-label">${trip.dates}</p><h2>Trier & Luxembourg.</h2><div class="prose full-owner-copy trip-personal-note">${paragraphs(notes)}</div>${meals?`<details class="trip-food"><summary>What we ate ${icon('arrow')}</summary><div class="trip-meals">${meals}</div></details>`: ''}<figure class="dialog-map"><div class="reader-map"><img src="${trip.map}" alt="${trip.mapAlt}" width="1000" height="650"></div><div class="reader-city-map" data-city-map="luxembourg"><img src="assets/illustrations/luxembourg-keepsake-map.webp" alt="Our Luxembourg places: Plateau Bourbon, Pont Adolphe, Place de la Constitution, Ville Haute, Hämmelsmarsch fountain by Wil Lofy, Place Guillaume II, Notre-Dame Cathedral, Palais Grand-Ducal, Chemin de la Corniche, Place de Clairefontaine and Pont du Grund, each marked on the city map." width="1260" height="2760" loading="lazy" decoding="async"></div><div class="reader-city-map" data-city-map="trier"><img src="assets/illustrations/trier-keepsake-map.webp" alt="Trier: Hauptmarkt and the streets around it, where we walked." width="1260" height="1980" loading="lazy" decoding="async"></div></figure>`);
    }
    function showPersonal(c){
      const notes=c.littleThings.map((text,i)=>({text,label:detailPrompts[i]})).concat(c.wishes.slice(0,2).map((text,i)=>({text,label:wishPrompts[i]}))).filter(n=>n.text.trim());
      openDialog(`<p class="dialog-label">Things I want to keep</p><h2>About you.</h2><div class="personal-note-list">${notes.map(n=>`<article><h3>${n.label}</h3><div class="prose">${paragraphs(n.text)}</div></article>`).join('')}</div>`);
    }
    function showGift(){
      if(!candleBlown){go('birthday',true);toast('Blow out the candle to open the last note.');return;}
      openDialog(`<div class="reader-coupon"><span class="coupon-heading">2 November 2026</span><h2>One last note.</h2></div><div class="note-dialog-copy">${paragraphs(getConfig().giftNote)}</div>`);
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
      syncGiftGate();fitNativeOrnaments();setActive(active,activePosition);
    }
    function render(){
      discovery?.reset();feedback?.reset();clearTimeout(candleSmokeTimer);refreshToken++;observer?.disconnect();motion?.revert();motion=null;observer=null;nativePaperIndex=null;
      const c=getConfig(),tight=document.documentElement.clientWidth<400,photos=gallery(c),personal=c.littleThings.concat(c.wishes.slice(0,2)).some(t=>t.trim());
      const detail=c.littleThings.find(t=>t.trim())||'',tripPhotos=trip.featuredDayOrder.map(i=>({src:c.germanyPhotos[i],caption:c.germanyCaptions[i]||'[The story behind this October photo]',day:trip.days[i]})).filter(p=>p.src);
      const featured=c.featuredPhoto.match(/^(trip|memory):(\d)$/),featuredIndex=featured?+featured[2]:-1;
      const photo=featured&&featured[1]==='trip'&&c.germanyPhotos[featuredIndex]?{src:c.germanyPhotos[featuredIndex],caption:c.germanyCaptions[featuredIndex]||'[The story behind this October photo]',day:trip.days[featuredIndex]}:featured&&featured[1]==='memory'&&c.photos[featuredIndex]?{src:c.photos[featuredIndex],caption:c.captions[featuredIndex]||'[The story behind this photo]'}:tripPhotos[0]||photos[0];
      const opening=excerpt(c.intro.trim()||trip.personalIntro,tight?110:150),context=excerpt(c.dedication,tight?60:80),observation=excerpt(detail,tight?65:85),distance=excerpt(c.distanceNote,tight?90:110);
      const map=`<figure class="story-art trier-map"><button id="open-trier" data-book-object="map" aria-label="Open the Trier and Luxembourg map and notes"><img src="${trip.map}" alt="${trip.mapAlt}" width="1000" height="650"></button></figure>`;
      const hero=`<figure class="story-art real-memory polaroid-frame main-polaroid${photo?'':' photo-placeholder'}"><button id="open-photo-hero" data-book-object="photograph" aria-label="Open our main photograph">${photo?`<span class="polaroid-image"><img src="${esc(photo.src)}" alt="${esc(photo.caption)}" width="600" height="700"></span>`:'<span class="photo-blank" data-placeholder="true">[Our photograph in Luxembourg]</span>'}</button><figcaption class="polaroid-caption">${esc(photo?.day?photo.day.place+' · '+photo.day.date+' 2026':photo?trip.photoLabels?.[photo.src]||'October 2026':'Luxembourg · October 2026')}</figcaption><span class="photo-tape" aria-hidden="true"></span></figure>`;
      const catFamily=`<figure class="recap-pets cat-birthday-illustration" id="birthday-cats"><img src="assets/illustrations/five-cats-birthday-v98.webp" alt="Winnie, Bonnie, Connie, Wonnie and little Minnie together, saying: Happy 25th, Tasya! We love you!" width="1536" height="1024" decoding="sync"></figure>`;
      const dayCards=trip.days.map((day,i)=>`<button class="recap-day photo-fragment polaroid-frame" id="open-day-${i}" data-book-object="day-${i}" aria-label="Open ${day.date}: ${day.place}"><span class="fragment-image polaroid-image">${c.germanyPhotos[i]?`<img src="${esc(c.germanyPhotos[i])}" alt="Photo from ${day.date}" width="240" height="160">`:`<span class="fragment-placeholder" data-placeholder="true">[Photo ${i+1}]</span>`}</span><span class="fragment-caption polaroid-caption"><strong>${day.shortDate}</strong><span class="recap-day-copy">${esc(day.recapPlace||day.place)}</span></span></button>`);
      const days=start=>`<div class="recap-days photo-fragments day-pair">${dayCards.slice(start,start+2).join('')}</div>`;
      const soundtrack=`<button class="soundtrack-slip" id="open-playlist" data-book-object="song" aria-haspopup="dialog" aria-controls="map-dialog">${soundtrackContent(c)}</button>`;
      app.className='album-story edited-story';
      app.innerHTML=`
<section class="cover-chapter birthday-cover picture-cover" id="cover" aria-labelledby="cover-title"><div class="cover-seat"><div class="cover-model"><div class="cover-paper" aria-hidden="true"></div><div class="book-front"><h1 class="visually-hidden" id="cover-title" data-scene-skip="true" tabindex="-1">Happy 25th birthday, ${esc(c.name)}.</h1><p class="cover-art-fallback" hidden data-scene-skip="true" aria-hidden="true">Happy<br>25th birthday.</p><img class="cover-collage-art" src="assets/illustrations/birthday-collage-cover.webp" alt="" width="1060" height="1484" fetchpriority="high" decoding="async"><div class="cover-personalisation" data-scene-skip="true" aria-hidden="true" data-name-size="${c.name.length>48?'extended':c.name.length>36?'long':c.name.length>22?'medium':'short'}"><img class="cover-portrait" src="${esc(c.coverPhoto)}" alt="" width="960" height="1280" fetchpriority="high" decoding="async"><span class="cover-name-ink"><span class="cover-for">For</span><strong>${esc(c.name)}</strong></span></div><p class="cover-collage-date" data-scene-skip="true">2 November 2026</p>${stickers('cover','birthday')}</div></div><a class="open-book" href="#dedication">Open the book</a></div></section>
        ${sheet('dedication','Luxembourg',`<p class="recap-location">${trip.dates} · from Trier</p>${copy(opening.text,'','recap-intro')}${map}`,'opening-chapter city-chapter')}
        ${sheet('your-world','Four days',`<p class="contact-caption">22–23 October · Trier → Luxembourg</p>${days(0)}${personal?`<div class="story-actions">${action('open-personal','Little notes','book','personal')}</div>`:''}`,'world-chapter recap-days-chapter')}
        ${sheet('your-world-return','Four days',`<p class="contact-caption">24–25 October · Back to Trier</p>${days(2)}`,'world-chapter recap-days-chapter')}
        ${sheet('october','One photograph',`${hero}${copy(distance.text,prompts.scene,'distance-excerpt')}${distance.truncated?`<div class="story-actions">${action('open-distance','Read the note','book','distance')}</div>`:''}`,'together-chapter')}
        ${sheet('letter','A note, folded in',`<button class="letter-excerpt folded-letter closed-note" id="open-letter" data-book-object="note" data-note-closed="true" aria-label="Unfold your personal note" aria-haspopup="dialog" aria-controls="map-dialog"><span class="note-fold-edge" aria-hidden="true"></span><span class="closed-note-title">For you.</span><span class="closed-note-action">Unfold the note ${icon('book')}</span></button>${catFamily}${soundtrack}`,'short-letter-chapter')}
        ${sheet('birthday','Happy 25th.',`<p class="birthday-addressee">For ${esc(c.name)},</p>${cake()}<button class="birthday-wish-note closed-note" id="open-birthday-note" data-book-object="wish" data-note-closed="true" aria-label="Unfold your birthday card" aria-haspopup="dialog" aria-controls="map-dialog"><span class="note-fold-edge" aria-hidden="true"></span><span class="closed-note-title">A birthday wish.</span><span class="closed-note-action">Open the card ${icon('book')}</span></button>`,'birthday-cake-chapter')}
        ${sheet('gift','A little warmth, from me.',`<div class="gift-ending"><button class="birthday-keepsake voucher-coupon pocket-gift" id="open-gift" data-book-object="gift" aria-label="Open one last note" aria-haspopup="dialog" aria-controls="map-dialog"><span class="coupon-ink coupon-card"><span class="coupon-heading">For your Trier evenings</span><strong class="coupon-amount">With love.</strong></span><span class="gift-pocket-front"><span class="pocket-label">One last note</span><span class="pocket-open">Open the note ${icon('arrow')}</span></span></button><a class="replay-link" href="#cover">Read from the cover ${icon('back')}</a></div>`,'ending-chapter gift-chapter')}
        <nav class="book-navigation" aria-label="Book navigation"><button id="previous-page" class="icon-button" aria-label="Previous page">${icon('back')}</button><button id="book-contents"><span id="current-chapter" aria-live="polite" aria-atomic="true">Cover</span><span id="page-position">1 / ${chapters.length}</span></button><button id="next-page" class="icon-button" aria-label="Next page">${icon('arrow')}</button></nav>`;
      const bind=(id,fn)=>{const b=document.getElementById(id);if(b)b.onclick=event=>withObject(event.target.closest('[data-book-object]')||event.currentTarget,()=>fn(event),event.detail>0);};
      app.querySelector('.cover-collage-art')?.addEventListener('error',event=>{event.target.hidden=true;const front=event.target.closest('.book-front');front.classList.add('cover-art-unavailable');front.querySelector('.cover-art-fallback').hidden=false;},{once:true});
      bind('open-dedication',()=>showLong('A note from me','For you.',c.intro+(c.dedication.trim()?'\n\n'+c.dedication:'')));
      bind('open-playlist',()=>showMusic(c));bind('open-personal',()=>showPersonal(c));bind('open-gallery',()=>showPhotos(c));bind('open-photo-hero',()=>showMainPhoto(photo));
      bind('open-trier',()=>showTrip(c));dayPrompts.forEach((_,i)=>bind('open-day-'+i,()=>showDay(c,i)));
      bind('birthday-candle',toggleCandle);
      bind('open-distance',()=>showLong('From here, for you','From afar.',c.distanceNote));bind('open-letter',()=>showLong('Your birthday letter','For '+esc(c.name)+'.',c.letter||prompts.letter));bind('open-birthday-note',()=>showLong('2 November','Happy birthday.',c.wishes[2]||prompts.wish));bind('open-gift',()=>{if(!candleBlown){go('gift',true);return;}showGift();});
      window.ScrapbookPhotoCards.prepare(app);
      const replayAction=app.querySelector('.replay-link');
      app.querySelector('.open-book').classList.add('book-endpoint-action');
      replayAction.classList.add('book-endpoint-action');replayAction.querySelector('.ui-icon')?.remove();
      replayAction.closest('.page-seat').append(replayAction);
      chapters.slice(1).forEach(([id])=>{const seat=document.querySelector(`#${id}>.page-seat`);seat.prepend(window.ScrapbookDividers.create(id));});
      app.querySelectorAll('.real-memory img,.fragment-image img').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;if(!img.parentElement.querySelector('.image-error'))img.parentElement.insertAdjacentHTML('beforeend','<span class="image-error">This photo could not be loaded.</span>');},{once:true}));
      app.querySelectorAll('.cake-art').forEach(img=>img.addEventListener('error',()=>{img.hidden=true;img.parentElement.querySelector('.cake-art-error').hidden=false;},{once:true}));
      app.querySelectorAll('a[href^="#"]').forEach(a=>a.onclick=e=>{e.preventDefault();if(film&&a.classList.contains('open-book'))film.open(e.detail===0);else if(film&&a.classList.contains('replay-link'))film.replay(e.detail===0);else go(a.hash.slice(1),e.detail===0);});
      bind('previous-page',e=>film?film.previous(e.detail===0):activePosition?.side==='right'?go(chapters[active][0],e.detail===0):active>1?nativeRight(active-1,e.detail===0):go('cover',e.detail===0));
      bind('next-page',e=>film?film.next(e.detail===0):active>0&&activePosition?.side==='left'?nativeRight(active,e.detail===0):go(chapters[Math.min(chapters.length-1,active+1)][0],e.detail===0));
      bind('book-contents',()=>{
        openDialog(`<h2>The pages.</h2><nav class="contents-list" aria-label="Contents">${chapters.map(([id,label],i)=>`<a href="#${id}"${i===active?' aria-current="page"':''}><span>${label}</span><span>${id==='gift'&&!candleBlown?'Blow out the candle first':i+1}</span></a>`).join('')}</nav>`);
        document.querySelectorAll('.contents-list a').forEach(a=>a.onclick=e=>{e.preventDefault();window.ScrapbookModalLock.close(document.getElementById('map-dialog'));go(a.hash.slice(1),true);});
      });
      observer=new IntersectionObserver(entries=>{
        const visible=entries.filter(e=>e.isIntersecting);if(!visible.length)return;
        const target=visible.at(-1).target,section=target.closest('.album-chapter,.cover-chapter'),index=chapters.findIndex(c=>c[0]===section?.id);
        if(index<0)return;
        let side=target.matches('.chapter-divider')?'left':'right';
        if(innerWidth>=960&&index>0)side=index===active?(activePosition?.side||'left'):'left';
        setActive(index,index?nativePosition(index,side):null);
      },{rootMargin:'-35% 0px -45% 0px',threshold:0});
      observeNative();setActive(0);animate();syncGiftGate();fitNativeOrnaments();
    }
    function nativePosition(index,side){return {page:index+1,total:chapters.length,part:1,parts:1,side,last:side==='right'&&index===chapters.length-1,giftLocked:side==='right'&&chapters[index][0]==='birthday'&&!candleBlown};}
    function observeNative(){app.querySelectorAll('.cover-chapter,.album-chapter>.page-seat>.chapter-divider,.album-chapter>.page-seat>.sheet').forEach(node=>observer?.observe(node));}
    function nativeRight(index,focus){
      const sheet=document.getElementById(chapters[index][0])?.querySelector('.sheet');if(!sheet)return;
      window.scrollTo({top:sheet.getBoundingClientRect().top+scrollY-82,behavior:focus||reduced()?'instant':'smooth'});setActive(index,nativePosition(index,'right'));
      if(focus)sheet.querySelector('h2')?.focus({preventScroll:true});
    }
    function setActive(index,position,silent=false){
      if(index<0)return;
      if(!film){
        if(!silent&&nativePaperIndex!==null&&index!==nativePaperIndex)document.dispatchEvent(new CustomEvent('scrapbook-paper',{detail:{kind:index===0||nativePaperIndex===0?'cover':'page'}}));
        nativePaperIndex=index;
      }
      active=index;activePosition=position||null;
      const cover=index===0,navigation=document.querySelector('.book-navigation'),home=document.querySelector('.site-header .brand');
      document.body.dataset.bookChapter=chapters[index][0];
      navigation.inert=cover;navigation.setAttribute('aria-hidden',String(cover));
      home.inert=cover;home.setAttribute('aria-hidden',String(cover));
      document.getElementById('current-chapter').textContent=chapters[index][1]+(position?.parts>1?` · ${position.part}/${position.parts}`:'');
      document.getElementById('page-position').textContent=position?`${position.side==='left'?'Left · ':position.side==='right'?'Right · ':''}${position.page} / ${position.total}`:`${index+1} / ${chapters.length}`;
      document.getElementById('book-contents').setAttribute('aria-label',`Open contents, ${chapters[index][1]}, page ${position?.page||index+1} of ${position?.total||chapters.length}`);
      const locked=!candleBlown&&(position?position.giftLocked:chapters[index][0]==='birthday'),next=document.getElementById('next-page');
      document.getElementById('previous-page').disabled=index===0;next.disabled=(position?position.last:index===chapters.length-1)||locked;
      document.getElementById('previous-page').setAttribute('aria-label',position?.side==='right'?'Back to the left divider':'Previous spread');
      next.setAttribute('aria-label',position?.side==='left'?'Read the right page':'Turn to the next spread');
      if(locked)next.setAttribute('aria-describedby','birthday-candle-hint');else next.removeAttribute('aria-describedby');
      onSceneChange({chapter:chapters[index][0],candleBlown});
      discovery?.refresh();
    }
    function animate(){
      if(!window.gsap||!window.ScrollTrigger||!window.BookExperience)return;
      gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
      const query=matchMedia('(prefers-reduced-motion: no-preference) and (min-height: 500px)'),token=refreshToken;
      let enabled=false,pending=false;
      function apply(){
        if(token!==refreshToken)return;
        // A keyboard/viewport or motion preference change must not rebuild
        // the physical source beneath an open object. Apply it after release.
        if(window.ScrapbookModalLock.isLocked){pending=true;return;}
        pending=false;if(query.matches===enabled)return;
        const returnTo=chapters[active]?.[0]||'cover';enabled=query.matches;
        if(enabled){
          observer?.disconnect();const gift=document.getElementById('gift');gift.hidden=false;gift.inert=false;
          film=BookExperience.create({app,chapters,setActive,isGiftUnlocked:()=>candleBlown});
          if(!film)observeNative();else if(returnTo!=='cover')film.go(returnTo,true);
        }else{
          film?.destroy();film=null;syncGiftGate();observeNative();
          requestAnimationFrame(()=>{if(token===refreshToken&&!film&&!window.ScrapbookModalLock.isLocked){fitNativeOrnaments();go(returnTo,true,true);}});
        }
      }
      function released(event){if(!event.detail.locked&&pending)apply();}
      query.addEventListener('change',apply);window.addEventListener('book-modal-lock',released);
      motion={revert(){query.removeEventListener('change',apply);window.removeEventListener('book-modal-lock',released);film?.destroy();film=null;}};
      apply();
    }
    function go(id,focus=false,silent=false){
      id=aliases[id]||id;if(id==='gift'&&!candleBlown){id='birthday';toast('Blow out the candle to open the last note.');}
      const target=document.getElementById(id);if(!target)return;if(film){film.go(id,focus);return;}
      window.scrollTo({top:id==='cover'?0:target.getBoundingClientRect().top+scrollY-82,behavior:focus||reduced()?'instant':'smooth'});const index=chapters.findIndex(c=>c[0]===id);setActive(index,index?nativePosition(index,'left'):null,silent);
      if(focus)target.querySelector('h1,.divider-title,h2')?.focus({preventScroll:true});
    }
    let reflowFrame=null,clearReflowWait=()=>{};
    function refresh(event){
      const position=event?.type==='book-reflow'?film?.getPosition():null,id=chapters[active]?.[0]||'cover';
      const frame=position?film?.freeze():null;clearReflowWait();
      if(frame||!position){reflowFrame?.remove();reflowFrame=frame;}
      if(frame)document.body.append(frame);
      render();if(position&&film?.resume)film.resume(position);else go(id,true,true);
      if(!reflowFrame)return;
      const host=app.querySelector('.book-film'),inputs=['wheel','touchstart','pointerdown','keydown'];
      const release=()=>{clearReflowWait();reflowFrame?.remove();reflowFrame=null;};
      if(!host?.classList.contains('three-available')||host.dataset.assetsReady!=='false'){release();return;}
      const timer=setTimeout(release,5000);
      host.addEventListener('book-graphics-ready',release);host.addEventListener('book-graphics-fallback',release);
      inputs.forEach(type=>window.addEventListener(type,release,{passive:true,once:true}));
      clearReflowWait=()=>{clearTimeout(timer);host.removeEventListener('book-graphics-ready',release);host.removeEventListener('book-graphics-fallback',release);inputs.forEach(type=>window.removeEventListener(type,release));clearReflowWait=()=>{};};
    }
    function fitNativeOrnaments(){
      if(film)return;
      app.querySelectorAll('.album-chapter .sheet').forEach(page=>window.ScrapbookStickers?.fit(page));
    }
    let ornamentResizeFrame=0;
    window.addEventListener('resize',()=>{
      cancelAnimationFrame(ornamentResizeFrame);
      ornamentResizeFrame=requestAnimationFrame(fitNativeOrnaments);
    },{passive:true});
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
    app.addEventListener('book-reflow',refresh);return {render,refresh,go,icon,ready:()=>film?.ready||Promise.resolve(),replay:()=>film?.replay?film.replay(false):go('cover')};
  };
})();

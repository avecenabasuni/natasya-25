(() => {
  'use strict';
  const width=1774,height=887,source='assets/cutouts/favorites-stickers.png';
  const favorites=[
    {key:'ferrari',name:'Ferrari',frame:[0,50,480,340],angle:-7,page:'cover'},
    {key:'hamilton',name:'Lewis Hamilton',frame:[475,55,435,360],angle:7,page:'dedication'},
    {key:'russell',name:'George Russell',frame:[919,55,407,365],angle:-8,page:'your-world'}
  ];
  const ephemera={source:'assets/cutouts/scrapbook-ephemera.png',width:1536,height:1024};
  const frames={
    bow:[41,19,364,269],daisies:[451,15,272,276],leaves:[802,4,271,287],cherries:[1170,14,278,272],
    luxembourg:[58,291,321,228],trier:[435,291,310,229],ticket:[791,304,329,196],
    pinkTape:[1154,337,330,145],sageTape:[49,559,388,137],seal:[492,533,213,199],
    key:[812,511,274,235],moon:[1206,501,277,235],flag:[20,701,375,306],
    butterfly:[425,734,350,250],record:[817,736,302,266],hearts:[1174,752,335,240]
  };
  const polygons={
    key:'0,0 100,0 100,95.319149 22.992701,95.319149 22.992701,100 0,100',
    record:'19.205298,0 100,0 100,100 0,100 0,3.007519 19.205298,3.007519'
  };
  const ornament=(key,motif,page,angle,w,h,position,rail=false)=>({key,motif,page,angle,frame:frames[motif],atlas:ephemera,ornament:true,w,h,position,rail});
  const ornaments=[
    ornament('cover-bow','bow','cover',-9,64,46,{left:'19%',top:'var(--cover-bow-top,1%)'}),
    ornament('cover-pressed-leaf','leaves','cover',-14,27,48,{left:'13%',top:'46%'}),
    ornament('cover-seal','seal','cover',10,34,32,{right:'6%',top:'65%'}),
    ornament('cover-luxembourg','luxembourg','cover',-8,70,50,{right:'5%',bottom:'7%'}),
    ornament('cover-botanical','leaves','cover',16,29,44,{right:'4%',bottom:'3%'}),
    ornament('cover-hearts','hearts','cover',-8,32,23,{left:'20%',bottom:'3%'}),

    ornament('trip-trier-stamp','trier','dedication',-8,43,32,{left:'36px',bottom:'38px'}),
    ornament('trip-luxembourg-stamp','luxembourg','dedication',8,43,31,{left:'83px',bottom:'36px'}),
    ornament('trip-ticket','ticket','dedication',-6,58,35,{right:'64px',bottom:'36px'}),
    ornament('trip-botanical','leaves','dedication',-9,17,31,{left:'5px',top:'39%'},true),
    ornament('trip-tape','pinkTape','dedication',67,22,10,{right:'5px',top:'66%'},true),

    ornament('days-ticket','ticket','your-world',-7,64,35,{left:'44px',bottom:'32px'}),
    ornament('days-seal','seal','your-world',8,22,21,{left:'119px',bottom:'34px'}),
    ornament('days-flag','flag','your-world',-7,20,28,{right:'5px',top:'40%'},true),
    ornament('days-daisies','daisies','your-world',8,17,35,{left:'5px',top:'52%'},true),

    ornament('photo-daisies','daisies','october',-11,40,46,{left:'185px',bottom:'33px'}),
    ornament('photo-butterfly','butterfly','october',13,41,30,{left:'236px',bottom:'44px'}),
    ornament('photo-bow','bow','october',-8,30,22,{left:'178px',top:'9px'}),
    ornament('photo-tape','pinkTape','october',69,21,9,{left:'7px',top:'30%'},true),
    ornament('photo-botanical','leaves','october',7,17,32,{right:'5px',top:'55%'},true),

    ornament('notes-record','record','letter',-12,27,24,{right:'69px',top:'4px'}),
    ornament('notes-bow','bow','letter',9,36,26,{right:'20px',top:'var(--notes-bow-top,5px)'}),
    ornament('notes-tape','sageTape','letter',-5,38,13,{left:'157px',top:'var(--notes-tape-top,55px)'}),
    ornament('notes-daisies','daisies','letter',-8,17,36,{left:'5px',top:'46%'},true),
    ornament('notes-hearts','hearts','letter',9,18,16,{right:'4px',top:'74%'},true),

    ornament('birthday-bow','bow','birthday',8,28,19,{left:'215px',top:'4px'}),
    ornament('birthday-moon','moon','birthday',-11,40,34,{left:'104px',bottom:'36px'}),
    ornament('birthday-hearts','hearts','birthday',7,38,27,{left:'45px',bottom:'39px'}),
    ornament('birthday-butterfly','butterfly','birthday',-9,18,18,{left:'6px',top:'45%'},true),
    ornament('birthday-daisies','daisies','birthday',9,17,32,{right:'5px',top:'63%'},true),

    ornament('gift-bow','bow','gift',-8,43,32,{right:'26px',top:'67px'}),
    ornament('gift-key','key','gift',-14,45,40,{left:'205px',bottom:'60px'}),
    ornament('gift-hearts','hearts','gift',9,30,23,{left:'242px',bottom:'73px'}),
    ornament('gift-cherries','cherries','gift',-9,31,31,{right:'35px',bottom:'38px'}),
    ornament('gift-tape','pinkTape','gift',68,21,9,{left:'6px',top:'47%'},true),
    ornament('gift-botanical','leaves','gift',9,17,32,{right:'5px',top:'57%'},true)
  ];
  const driverPhotos={
    albon:{name:'Alex Albon',source:'assets/cutouts/alex-albon-portrait.webp',width:720,height:2069,frame:[212,8,328,352]},
    hamilton:{name:'Lewis Hamilton',source:'assets/cutouts/lewis-hamilton-portrait.webp',width:720,height:2069,frame:[204,4,360,356]},
    russell:{name:'George Russell',source:'assets/cutouts/george-russell-portrait.webp',width:720,height:2069,frame:[220,10,256,310]},
    norris:{name:'Lando Norris',source:'assets/cutouts/lando-norris-portrait.webp',width:720,height:2069,frame:[233,4,270,356]},
    piastri:{name:'Oscar Piastri',source:'assets/cutouts/oscar-piastri-portrait.webp',width:720,height:2069,frame:[242,10,258,310]}
  };
  const portrait=(key,driver,page,angle,w,h,position)=>({key,driver,page,angle,w,h,position,name:driverPhotos[driver].name,frame:driverPhotos[driver].frame,atlas:driverPhotos[driver],ornament:true,portrait:true});
  const portraits=[
    portrait('cover-albon-portrait','albon','cover',-4,44,44,{left:'var(--cover-driver-left,49%)',top:'var(--cover-driver-top,0.5%)'}),
    portrait('trip-hamilton-portrait','hamilton','dedication',4,44,46,{left:'var(--trip-driver-left,255px)',top:'50px'}),
    portrait('photo-hamilton-portrait','hamilton','october',-4,42,45,{left:'134px',bottom:'31px'}),
    portrait('gift-albon-portrait','albon','gift',6,46,50,{right:'33px',top:'var(--gift-driver-top,279px)'}),
    portrait('days-russell-portrait','russell','your-world',5,43,48,{left:'150px',bottom:'32px'}),
    portrait('gift-norris-portrait','norris','gift',-5,43,44,{left:'35px',top:'var(--gift-norris-top,67px)'}),
    portrait('trip-piastri-portrait','piastri','dedication',-5,41,46,{left:'148px',bottom:'24px'})
  ];
  const subjectPhotos={
    taylor:{name:'Taylor Swift',source:'assets/cutouts/taylor-swift-photo.png',width:1000,height:1200,frame:[0,0,1000,1200],photo:true},
    rodrigo:{name:'Olivia Rodrigo',source:'assets/cutouts/olivia-rodrigo-photo.png',width:853,height:1280,frame:[80,0,680,830],photo:true},
    dean:{name:'Olivia Dean',source:'assets/cutouts/olivia-dean-photo.jpg',width:900,height:900,frame:[195,125,440,465],photo:true},
    spiro:{name:'Sienna Spiro',source:'assets/cutouts/sienna-spiro-photo.jpg',width:768,height:1024,frame:[175,250,470,700],photo:true},
    messi:{name:'Lionel Messi',source:'assets/cutouts/lionel-messi-portrait.png',width:600,height:436,frame:[184,16,232,326]},
    yamal:{name:'Lamine Yamal',source:'assets/cutouts/lamine-yamal-portrait.png',width:600,height:708,frame:[188,18,188,264],photo:true},
    barcelona:{name:'FC Barcelona',source:'assets/cutouts/fc-barcelona-crest.png',width:700,height:136,frame:[5,8,124,124],emblem:true}
  };
  const keepsake=(subject,page,angle,w,h,position)=>({key:subject+'-photo',subject,page,angle,w,h,position,name:subjectPhotos[subject].name,frame:subjectPhotos[subject].frame,atlas:subjectPhotos[subject],ornament:true,portrait:!subjectPhotos[subject].emblem,emblem:!!subjectPhotos[subject].emblem,photo:!!subjectPhotos[subject].photo});
  const subjects=[
    keepsake('taylor','october',-6,44,54,{left:'218px',top:'3px'}),
    keepsake('rodrigo','october',5,44,54,{left:'270px',top:'9px'}),
    keepsake('dean','gift',-6,52,60,{left:'57px',bottom:'72px'}),
    keepsake('spiro','gift',5,52,64,{left:'115px',bottom:'64px'}),
    keepsake('messi','letter',-7,40,44,{left:'98px',bottom:'24px'}),
    keepsake('yamal','letter',4,40,46,{left:'146px',bottom:'20px'}),
    keepsake('barcelona','letter',9,38,38,{left:'197px',bottom:'29px'})
  ];
  const collageGroups={taylor:'music-pop',rodrigo:'music-pop',dean:'music-soul',spiro:'music-soul',messi:'football',yamal:'football',barcelona:'football'};
  const collection=[...favorites,...ornaments,...portraits,...subjects];
  function layer(page){
    const items=collection.filter(item=>item.page===page);if(!items.length)return '';
    return `<div class="fandom-layer" data-sticker-page="${page}">${items.map(item=>{
      const [x,y,w,h]=item.frame,atlas=item.atlas||{source,width,height};
      const placement=item.ornament?`;--fan-w:${item.w}px;--fan-h:${item.h}px;${Object.entries(item.position).map(([key,value])=>`${key}:${value}`).join(';')}`:'';
      const semantics=item.portrait||item.emblem?`role="img" aria-label="${item.name} ${item.emblem?'crest':'portrait'} sticker"`:item.ornament?'aria-hidden="true"':`role="img" aria-label="${item.name} illustrated fan sticker"`;
      const polygon=polygons[item.motif],mask=polygon?`;clip-path:polygon(${polygon.split(' ').map(point=>point.split(',').join('% ')+'%').join(',')})`:'';
      return `<figure class="fandom-sticker${item.ornament?' paper-ornament':''}${item.portrait?' portrait-sticker':''}${item.driver?' driver-portrait':''}${item.photo?' photo-portrait':''}" data-fandom-sticker="${item.key}" data-sticker-angle="${item.angle}"${item.rail?' data-sticker-rail="true"':''}${item.driver?` data-driver-portrait="${item.driver}"`:''}${item.subject?` data-fandom-subject="${item.subject}" data-collage-group="${collageGroups[item.subject]}"`:''} style="--fan-angle:${item.angle}deg${placement}" ${semantics}><span class="fandom-portrait" aria-hidden="true"><span class="fandom-frame" data-sticker-frame="${item.frame.join(',')}"${polygon?` data-sticker-polygon="${polygon}"`:''} style="--fan-ratio:${w/h};--fan-image-w:${atlas.width/w*100}%;--fan-image-h:${atlas.height/h*100}%;--fan-image-x:${-x/w*100}%;--fan-image-y:${-y/h*100}%${mask}"><img src="${atlas.source}" alt="" width="${atlas.width}" height="${atlas.height}" decoding="async"></span></span></figure>`;
    }).join('')}</div>`;
  }
  function fit(root){
    const ornaments=[...root.querySelectorAll('.paper-ornament')];
    if(!ornaments.length||!root.getBoundingClientRect().width)return;
    ornaments.forEach(node=>{node.hidden=false;node.removeAttribute('data-sticker-omitted');});
    const protectedAreas=[],walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    let text;
    while((text=walker.nextNode())){
      if(!text.textContent.trim()||text.parentElement.closest('.fandom-layer,.binding,script,style'))continue;
      const range=document.createRange();range.selectNodeContents(text);
      for(const r of range.getClientRects())if(r.width>1&&r.height>1)protectedAreas.push(r);
    }
    root.querySelectorAll('.fragment-image,.photo-blank,.pet-portrait,.cake-candle').forEach(node=>{
      const r=node.getBoundingClientRect();if(r.width&&r.height)protectedAreas.push(r);
    });
    ornaments.forEach(node=>{
      const r=node.getBoundingClientRect();
      if(protectedAreas.some(a=>Math.max(0,Math.min(r.right,a.right)-Math.max(r.left,a.left))*Math.max(0,Math.min(r.bottom,a.bottom)-Math.max(r.top,a.top))>1)){
        node.hidden=true;node.dataset.stickerOmitted='writing-clearance';
      }
    });
  }
  window.ScrapbookStickers={layer,fit,collection,source,width,height,ephemera,frames,polygons,driverPhotos,portraits,subjectPhotos,subjects};
})();

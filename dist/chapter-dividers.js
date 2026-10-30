(() => {
  'use strict';
  const src='assets/illustrations/chapter-dividers.png',atlas=[1333,1180];
  const journeySrc='assets/illustrations/four-days-dividers.webp',journeyAtlas=[1536,1024];
  const entries={
    dedication:{frame:[0,0,444,590],title:['Trier &','Luxembourg.'],alt:'A paper souvenir of Luxembourg, with a stone bridge, a little rail ticket and pressed autumn leaves.'},
    'your-world':{src:journeySrc,atlas:journeyAtlas,frame:[0,0,768,840],date:'22–23 October',title:['The way','there.'],alt:'An illustrated paper collage of a warm stone church, a regional train and rail tickets, with pink and sage papers and pressed autumn leaves.'},
    'your-world-return':{src:journeySrc,atlas:journeyAtlas,frame:[768,0,768,840],date:'24–25 October',title:['The way','back.'],alt:'An illustrated paper collage of burgundy bus seats behind a rain-speckled window, a folded umbrella, pink ribbon, tickets and a little paper heart.'},
    october:{frame:[888,0,445,590],title:['Moments','to keep.'],alt:'Two photographs of us in Polaroid frames, with a pink ribbon and a pressed daisy.'},
    letter:{frame:[0,590,444,590],title:['For you,','folded in.'],alt:'A folded envelope and five decorative cat cutouts, surrounded by flowers and paper hearts.'},
    birthday:{frame:[444,590,444,590],title:['Twenty-five.'],alt:'A pink birthday cake with a candle and silver balloons spelling 25.'},
    gift:{frame:[888,590,445,590],title:['One last','note.'],alt:'A sealed pink envelope with a ribbon, a heart stamp and a little brass key.'}
  };
  const sourceFor=id=>entries[id]?.src||src;
  const sources=[...new Set([src,...Object.values(entries).map(entry=>entry.src||src)])];
  let photoSources=[];
  // Coordinates follow the two apertures in the printed 445 × 590 collage.
  // The rear mask stops at the front mount, preserving its cream paper edge.
  const photoSlots=[
    {origin:[55,123],u:[167,-26],v:[26,172],clip:[[55,123],[222,97],[231,157],[196,153],[183,280],[81,295]]},
    {origin:[208,169],u:[159,17],v:[-19,168],clip:[[208,169],[367,186],[348,354],[189,337]]}
  ];
  function setPhotos(main,others=[]){
    const available=[...new Set([main,...others].filter(Boolean))];
    photoSources=available.length?[available[0],available[1]||available[0]]:[];
  }
  function photoLayer(){
    const layer=document.createElement('div');layer.className='divider-photos';
    photoSources.forEach((src,i)=>{
      const slot=photoSlots[i],mask=document.createElement('div'),image=new Image(),tw=Math.hypot(...slot.u),th=Math.hypot(...slot.v);
      mask.className='divider-photo-slot';mask.style.clipPath='polygon('+slot.clip.map(([x,y])=>`${x/445*100}% ${y/590*100}%`).join(',')+')';
      image.src=src;image.alt=i?'Another moment together.':'A photograph of us.';image.decoding='sync';
      Object.assign(image.style,{left:slot.origin[0]/445*100+'%',top:slot.origin[1]/590*100+'%',width:tw/445*100+'%',height:th/590*100+'%',transform:`matrix(${slot.u[0]/tw},${slot.u[1]/tw},${slot.v[0]/th},${slot.v[1]/th},0,0)`});
      mask.append(image);layer.append(mask);
    });return layer;
  }
  function paintPhotos(ctx,photos){
    photos.forEach((image,i)=>{
      if(!image)return;const slot=photoSlots[i];if(!slot)return;
      const tw=Math.hypot(...slot.u),th=Math.hypot(...slot.v),iw=image.naturalWidth||image.width,ih=image.naturalHeight||image.height;
      const scale=Math.max(tw/iw,th/ih),sw=tw/scale,sh=th/scale;
      ctx.save();ctx.beginPath();slot.clip.forEach(([x,y],j)=>j?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();ctx.clip();
      ctx.transform(slot.u[0]/tw,slot.u[1]/tw,slot.v[0]/th,slot.v[1]/th,...slot.origin);
      ctx.drawImage(image,(iw-sw)/2,(ih-sh)/2,sw,sh,0,0,tw,th);ctx.restore();
    });
  }
  function create(id){
    const entry=entries[id]||entries.dedication,[x,y,w,h]=entry.frame,[aw,ah]=entry.atlas||atlas;
    const figure=document.createElement('figure');figure.className='chapter-divider';figure.dataset.divider=id;
    if(entry.date)figure.classList.add('journey-divider');
    figure.style.setProperty('--divider-ratio',w/h);
    const art=document.createElement('div');art.className='divider-art';
    const frame=document.createElement('div');frame.className='divider-window';
    const image=new Image();image.src=entry.src||src;image.alt=entry.alt;image.width=aw;image.height=ah;image.decoding='async';
    Object.assign(image.style,{width:aw/w*100+'%',height:ah/h*100+'%',left:-x/w*100+'%',top:-y/h*100+'%'});
    image.addEventListener('error',()=>{figure.classList.add('divider-art-missing');image.hidden=true;},{once:true});
    frame.append(image);if(id==='october')frame.append(photoLayer());art.append(frame);
    const caption=document.createElement('figcaption');caption.className='divider-caption';
    if(entry.date){const date=document.createElement('p');date.className='divider-date';date.textContent=entry.date;caption.append(date);}
    const title=document.createElement('h3');title.className='divider-title';title.tabIndex=-1;
    entry.title.forEach((line,i)=>{if(i)title.append(document.createElement('br'));title.append(document.createTextNode(line));});
    caption.append(title);figure.append(art,caption);return figure;
  }
  function paint(ctx,image,id,w,h,photos=[]){
    const entry=entries[id]||entries.dedication,[sx,sy,sw,sh]=entry.frame,inset=w*8/335;
    ctx.fillStyle='#fff4e6';ctx.fillRect(0,0,w,h);
    if(image){const ah=entry.date?h*.70-inset:h-inset*2,scale=Math.min((w-inset*2)/sw,ah/sh),dw=sw*scale,dh=sh*scale,dx=(w-dw)/2,dy=entry.date?inset+(ah-dh)/2:(h-dh)/2;ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);if(id==='october'){ctx.save();ctx.translate(dx,dy);ctx.scale(scale,scale);paintPhotos(ctx,photos);ctx.restore();}}
    const size=w*.1,lineHeight=size*1.06;
    ctx.fillStyle='#342c2e';ctx.font=`500 ${size}px "Fraunces"`;ctx.textAlign='left';ctx.textBaseline='top';
    entry.title.forEach((line,i)=>ctx.fillText(line,w*.09,h*.925-entry.title.length*lineHeight+i*lineHeight,w*.84));
    if(entry.date){ctx.fillStyle='#6e5e65';ctx.font=`400 ${w*.038}px "Source Sans 3"`;ctx.fillText(entry.date,w*.09,h*.925-entry.title.length*lineHeight-w*.065,w*.84);}
  }
  window.ScrapbookDividers={src,sources,sourceFor,entries,create,paint,setPhotos,get photoSources(){return [...photoSources];}};
})();

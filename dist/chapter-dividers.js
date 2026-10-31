(() => {
  'use strict';
  const src='assets/illustrations/chapter-dividers.png',atlas=[1333,1180];
  const journeySrc='assets/illustrations/four-days-dividers.webp',journeyAtlas=[1536,1024];
  const momentsSrc='assets/illustrations/moments-divider.webp';
  const letterSrc='assets/illustrations/letter-divider-v96.webp';
  const entries={
    dedication:{frame:[0,0,444,590],title:['Trier &','Luxembourg.'],alt:'A paper souvenir of Luxembourg, with a stone bridge, a little rail ticket and pressed autumn leaves.'},
    'your-world':{src:journeySrc,atlas:journeyAtlas,frame:[0,0,768,840],date:'22–23 October',title:['The way','there.'],alt:'An illustrated paper collage of a warm stone church, a regional train and rail tickets, with pink and sage papers and pressed autumn leaves.'},
    'your-world-return':{src:journeySrc,atlas:journeyAtlas,frame:[768,0,768,840],date:'24–25 October',title:['The way','back.'],alt:'An illustrated paper collage of burgundy bus seats behind a rain-speckled window, a folded umbrella, pink ribbon, tickets and a little paper heart.'},
    october:{src:momentsSrc,atlas:[1086,1448],frame:[0,0,1086,1448],title:['Moments','to keep.'],alt:'A pink ribbon, pressed daisies, lace and layered blush and sage paper.'},
    letter:{src:letterSrc,atlas:[1086,1448],frame:[0,0,1086,1448],title:['For you,','folded in.'],alt:'A folded cream envelope, pink paper hearts and pressed flowers.'},
    birthday:{frame:[444,590,444,590],title:['Twenty-five.'],alt:'A pink birthday cake with a candle and silver balloons spelling 25.'},
    gift:{frame:[888,590,445,590],title:['One last','note.'],alt:'A sealed pink envelope with a ribbon, a heart stamp and a little brass key.'}
  };
  const sourceFor=id=>entries[id]?.src||src;
  const sources=[...new Set([src,...Object.values(entries).map(entry=>entry.src||src)])];
  const catPrints=()=>window.ScrapbookCatPortraits.prints;
  const catPlacement=[
    {x:.15,foot:.62,w:.23,h:.34,angle:-3,z:1},
    {x:.34,foot:.68,w:.17,h:.26,angle:2,z:4},
    {x:.72,foot:.62,w:.22,h:.33,angle:3,z:2},
    {x:.52,foot:.65,w:.24,h:.36,angle:-1,z:3},
    {x:.88,foot:.70,w:.15,h:.215,angle:-3,z:5}
  ];
  const catInk=new WeakMap();
  function cutout(image,cat){
    let cached=catInk.get(image);if(!cached){cached=new Map();catInk.set(image,cached);}if(cached.has(cat.name))return cached.get(cat.name);
    const [x,y,w,h]=cat.frame,scale=Math.min(1,512/Math.max(w,h)),canvas=document.createElement('canvas');canvas.width=Math.ceil(w*scale);canvas.height=Math.ceil(h*scale);canvas.dataset.catName=cat.name;canvas.dataset.catSource=cat.src;
    const ink=canvas.getContext('2d');ink.beginPath();cat.polygon.forEach(([px,py],i)=>i?ink.lineTo(px/100*canvas.width,py/100*canvas.height):ink.moveTo(px/100*canvas.width,py/100*canvas.height));ink.closePath();ink.clip();ink.drawImage(image,x,y,w,h,0,0,canvas.width,canvas.height);cached.set(cat.name,canvas);return canvas;
  }
  function createCats(){
    const row=document.createElement('div');row.className='divider-cats';row.setAttribute('aria-label','Winnie, Bonnie, Connie, Wonnie and Minnie');
    row.innerHTML=catPrints().map((cat,i)=>window.ScrapbookCatPortraits.markup(i,'divider-cat',`data-divider-cat="${cat.name}"`)).join('');
    [...row.children].forEach((node,i)=>{const p=catPlacement[i];Object.entries({x:p.x*100+'%',foot:p.foot*100+'%',w:p.w*100+'%',h:p.h*100+'%',angle:p.angle+'deg',z:p.z}).forEach(([k,v])=>node.style.setProperty('--divider-cat-'+k,v));});return row;
  }
  function paintCats(ctx,images,w,h){
    [...catPrints().keys()].sort((a,b)=>catPlacement[a].z-catPlacement[b].z).forEach(i=>{
      const cat=catPrints()[i];
      const image=images[i];if(!image)return;
      const p=catPlacement[i],[,,sw,sh]=cat.frame,scale=Math.min(w*p.w/sw,h*p.h/sh),dw=sw*scale,dh=sh*scale;
      ctx.save();ctx.translate(w*p.x,h*p.foot);ctx.rotate(p.angle*Math.PI/180);ctx.shadowColor='rgba(65,41,34,.18)';ctx.shadowBlur=2.2;ctx.shadowOffsetY=1.8;
      ctx.drawImage(cutout(image,cat),-dw/2,-dh,dw,dh);ctx.restore();
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
    frame.append(image);if(id==='letter')frame.append(createCats());art.append(frame);
    const caption=document.createElement('figcaption');caption.className='divider-caption';
    if(entry.date){const date=document.createElement('p');date.className='divider-date';date.textContent=entry.date;caption.append(date);}
    const title=document.createElement('h3');title.className='divider-title';title.tabIndex=-1;
    entry.title.forEach((line,i)=>{if(i)title.append(document.createElement('br'));title.append(document.createTextNode(line));});
    caption.append(title);figure.append(art,caption);return figure;
  }
  function paint(ctx,image,id,w,h,catImages=[]){
    const entry=entries[id]||entries.dedication,[sx,sy,sw,sh]=entry.frame,inset=w*8/335;
    ctx.fillStyle='#fff4e6';ctx.fillRect(0,0,w,h);
    if(image){const ah=entry.date?h*.70-inset:h-inset*2,scale=Math.min((w-inset*2)/sw,ah/sh),dw=sw*scale,dh=sh*scale,dx=(w-dw)/2,dy=entry.date?inset+(ah-dh)/2:(h-dh)/2;ctx.drawImage(image,sx,sy,sw,sh,dx,dy,dw,dh);if(id==='letter'){ctx.save();ctx.translate(dx,dy);ctx.scale(scale,scale);paintCats(ctx,catImages,sw,sh);ctx.restore();}}
    const size=w*.1,lineHeight=size*1.06;
    ctx.fillStyle='#342c2e';ctx.font=`500 ${size}px "Fraunces"`;ctx.textAlign='left';ctx.textBaseline='top';
    entry.title.forEach((line,i)=>ctx.fillText(line,w*.09,h*.925-entry.title.length*lineHeight+i*lineHeight,w*.84));
    if(entry.date){ctx.fillStyle='#6e5e65';ctx.font=`400 ${w*.038}px "Source Sans 3"`;ctx.fillText(entry.date,w*.09,h*.925-entry.title.length*lineHeight-w*.065,w*.84);}
  }
  window.ScrapbookDividers={src,sources,sourceFor,entries,create,paint,get catPrints(){return catPrints();}};
})();

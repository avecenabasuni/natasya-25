(() => {
  'use strict';
  const src='assets/illustrations/chapter-dividers.png',atlas=[1333,1180];
  const journeySrc='assets/illustrations/four-days-dividers.webp',journeyAtlas=[1536,1024];
  const momentsSrc='assets/illustrations/moments-divider.webp';
  const entries={
    dedication:{frame:[0,0,444,590],title:['Trier &','Luxembourg.'],alt:'A paper souvenir of Luxembourg, with a stone bridge, a little rail ticket and pressed autumn leaves.'},
    'your-world':{src:journeySrc,atlas:journeyAtlas,frame:[0,0,768,840],date:'22–23 October',title:['The way','there.'],alt:'An illustrated paper collage of a warm stone church, a regional train and rail tickets, with pink and sage papers and pressed autumn leaves.'},
    'your-world-return':{src:journeySrc,atlas:journeyAtlas,frame:[768,0,768,840],date:'24–25 October',title:['The way','back.'],alt:'An illustrated paper collage of burgundy bus seats behind a rain-speckled window, a folded umbrella, pink ribbon, tickets and a little paper heart.'},
    october:{src:momentsSrc,atlas:[1086,1448],frame:[0,0,1086,1448],title:['Moments','to keep.'],alt:'A pink ribbon, pressed daisies, lace and layered blush and sage paper.'},
    letter:{frame:[0,590,444,590],title:['For you,','folded in.'],alt:'A folded envelope and five decorative cat cutouts, surrounded by flowers and paper hearts.'},
    birthday:{frame:[444,590,444,590],title:['Twenty-five.'],alt:'A pink birthday cake with a candle and silver balloons spelling 25.'},
    gift:{frame:[888,590,445,590],title:['One last','note.'],alt:'A sealed pink envelope with a ribbon, a heart stamp and a little brass key.'}
  };
  const sourceFor=id=>entries[id]?.src||src;
  const sources=[...new Set([src,...Object.values(entries).map(entry=>entry.src||src)])];
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
    frame.append(image);art.append(frame);
    const caption=document.createElement('figcaption');caption.className='divider-caption';
    if(entry.date){const date=document.createElement('p');date.className='divider-date';date.textContent=entry.date;caption.append(date);}
    const title=document.createElement('h3');title.className='divider-title';title.tabIndex=-1;
    entry.title.forEach((line,i)=>{if(i)title.append(document.createElement('br'));title.append(document.createTextNode(line));});
    caption.append(title);figure.append(art,caption);return figure;
  }
  function paint(ctx,image,id,w,h){
    const entry=entries[id]||entries.dedication,[sx,sy,sw,sh]=entry.frame,inset=w*8/335;
    ctx.fillStyle='#fff4e6';ctx.fillRect(0,0,w,h);
    if(image){const ah=entry.date?h*.70-inset:h-inset*2,scale=Math.min((w-inset*2)/sw,ah/sh),dw=sw*scale,dh=sh*scale;ctx.drawImage(image,sx,sy,sw,sh,(w-dw)/2,entry.date?inset+(ah-dh)/2:(h-dh)/2,dw,dh);}
    const size=w*.1,lineHeight=size*1.06;
    ctx.fillStyle='#342c2e';ctx.font=`500 ${size}px "Fraunces"`;ctx.textAlign='left';ctx.textBaseline='top';
    entry.title.forEach((line,i)=>ctx.fillText(line,w*.09,h*.925-entry.title.length*lineHeight+i*lineHeight,w*.84));
    if(entry.date){ctx.fillStyle='#6e5e65';ctx.font=`400 ${w*.038}px "Source Sans 3"`;ctx.fillText(entry.date,w*.09,h*.925-entry.title.length*lineHeight-w*.065,w*.84);}
  }
  window.ScrapbookDividers={src,sources,sourceFor,entries,create,paint};
})();

(() => {
  'use strict';
  const src='assets/illustrations/chapter-dividers.png',atlas=[1333,1180];
  const entries={
    dedication:{frame:[0,0,444,590],title:['Trier &','Luxembourg.'],alt:'A paper souvenir of Luxembourg, with a stone bridge, a little rail ticket and pressed autumn leaves.'},
    'your-world':{frame:[444,0,444,590],title:['Four days','with you.'],alt:'An analogue camera, little paper tickets and pressed October leaves on pink and sage paper.'},
    october:{frame:[888,0,445,590],title:['Moments','to keep.'],alt:'Two empty Polaroid mounts, a pink ribbon and a pressed daisy.'},
    letter:{frame:[0,590,444,590],title:['For you,','folded in.'],alt:'A folded envelope and five decorative cat cutouts, surrounded by flowers and paper hearts.'},
    birthday:{frame:[444,590,444,590],title:['Twenty-five.'],alt:'A pink birthday cake with a candle and silver balloons spelling 25.'},
    gift:{frame:[888,590,445,590],title:['A little','something.'],alt:'A sealed pink envelope with a ribbon, a heart stamp and a little brass key.'}
  };
  function create(id){
    const entry=entries[id]||entries.dedication,[x,y,w,h]=entry.frame;
    const figure=document.createElement('figure');figure.className='chapter-divider';figure.dataset.divider=id;
    figure.style.setProperty('--divider-ratio',w/h);
    const art=document.createElement('div');art.className='divider-art';
    const frame=document.createElement('div');frame.className='divider-window';
    const image=new Image();image.src=src;image.alt=entry.alt;image.width=atlas[0];image.height=atlas[1];image.decoding='async';
    Object.assign(image.style,{width:atlas[0]/w*100+'%',height:atlas[1]/h*100+'%',left:-x/w*100+'%',top:-y/h*100+'%'});
    image.addEventListener('error',()=>{figure.classList.add('divider-art-missing');image.hidden=true;},{once:true});
    frame.append(image);art.append(frame);
    const caption=document.createElement('figcaption');caption.className='divider-caption';
    const title=document.createElement('h3');title.className='divider-title';title.tabIndex=-1;
    entry.title.forEach((line,i)=>{if(i)title.append(document.createElement('br'));title.append(document.createTextNode(line));});
    caption.append(title);figure.append(art,caption);return figure;
  }
  function paint(ctx,image,id,w,h){
    const entry=entries[id]||entries.dedication,[sx,sy,sw,sh]=entry.frame,inset=w*8/335;
    ctx.fillStyle='#fff4e6';ctx.fillRect(0,0,w,h);
    if(image){const scale=Math.min((w-inset*2)/sw,(h-inset*2)/sh),dw=sw*scale,dh=sh*scale;ctx.drawImage(image,sx,sy,sw,sh,(w-dw)/2,(h-dh)/2,dw,dh);}
    const size=w*.1,lineHeight=size*1.06;
    ctx.fillStyle='#342c2e';ctx.font=`500 ${size}px "Fraunces"`;ctx.textAlign='left';ctx.textBaseline='top';
    entry.title.forEach((line,i)=>ctx.fillText(line,w*.09,h*.925-entry.title.length*lineHeight+i*lineHeight,w*.84));
  }
  window.ScrapbookDividers={src,entries,create,paint};
})();

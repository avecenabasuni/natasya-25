(() => {
  'use strict';
  const parameters=Object.freeze({saturation:.90,sepia:.09,contrast:.98});
  const cssFilter='saturate(0.9) sepia(0.09) contrast(0.98)';
  const selector='.portrait-sticker img,.real-memory img,.fragment-image img,.reader-photo img';
  const cache=new WeakMap(),counters={prints:0,pixels:0,hits:0};
  const clamp=value=>Math.max(0,Math.min(255,value));
  function tint(r,g,b){
    const l=.213*r+.715*g+.072*b,s=parameters.saturation,p=parameters.sepia,c=parameters.contrast;
    const red=l+(r-l)*s,green=l+(g-l)*s,blue=l+(b-l)*s;
    const rr=Math.round(clamp(clamp(red*(1-p)+(.393*red+.769*green+.189*blue)*p)*c+(1-c)*127.5));
    const gg=Math.round(clamp(clamp(green*(1-p)+(.349*red+.686*green+.168*blue)*p)*c+(1-c)*127.5));
    const bb=Math.round(clamp(clamp(blue*(1-p)+(.272*red+.534*green+.131*blue)*p)*c+(1-c)*127.5));
    return rr|(gg<<8)|(bb<<16);
  }
  function sample(r,g,b,a=255){const color=tint(r,g,b);return[color&255,(color>>8)&255,(color>>16)&255,a];}
  function getPrint(image,frame=null){
    const iw=image.naturalWidth||image.width,ih=image.naturalHeight||image.height;
    const crop=frame||[0,0,iw,ih];
    if(!iw||!ih||crop.length!==4||crop.some(v=>!Number.isFinite(v))||crop[2]<=0||crop[3]<=0)return null;
    let entries=cache.get(image);if(!entries){entries=new Map();cache.set(image,entries);}
    const key=crop.join(',');if(entries.has(key)){counters.hits++;return entries.get(key);}
    const [x,y,w,h]=crop,ratio=Math.min(1,1600/Math.max(w,h)),canvas=document.createElement('canvas');
    canvas.width=Math.max(1,Math.round(w*ratio));canvas.height=Math.max(1,Math.round(h*ratio));
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    try{
      ctx.drawImage(image,x,y,w,h,0,0,canvas.width,canvas.height);
      const pixels=ctx.getImageData(0,0,canvas.width,canvas.height),data=pixels.data;
      for(let i=0;i<data.length;i+=4){
        if(!data[i+3])continue;
        const color=tint(data[i],data[i+1],data[i+2]);
        data[i]=color&255;data[i+1]=(color>>8)&255;data[i+2]=(color>>16)&255;
      }
      ctx.putImageData(pixels,0,0);
      const print=Object.freeze({image:canvas,frame:crop.slice(),sourceWidth:iw,sourceHeight:ih});
      entries.set(key,print);counters.prints++;counters.pixels+=canvas.width*canvas.height;return print;
    }catch{return null;}
  }
  window.ScrapbookPhotoFinish=Object.freeze({parameters,cssFilter,selector,sample,getPrint,stats:()=>({...counters}),revision:43});
})();

(() => {
  'use strict';
  const mountSelector='.photo-portrait .fandom-portrait,.main-polaroid';
  const selectors=mountSelector+',.cover-dedication,.book-front';
  const empty=()=>({photos:0,labels:0,covers:0});
  const elements=(root,selector)=>[...(root.matches?.(selector)?[root]:[]),...root.querySelectorAll(selector)];
  const relative=(element,origin)=>{
    const r=element.getBoundingClientRect();
    return {x:r.left-origin.left,y:r.top-origin.top,w:r.width,h:r.height};
  };
  function photoEdge(ctx,{x,y,w,h}){
    ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
    ctx.lineWidth=.55;ctx.strokeStyle='#9b7b8538';
    ctx.strokeRect(x+.3,y+.3,w-.6,h-.6);
    // The irregularity is in the paper's bottom margin, never its image window.
    const marks=[[0,.7],[.08,.95],[.15,.62],[.24,1.04],[.35,.66],[.46,.94],[.58,.6],[.7,1.0],[.81,.68],[.92,.9],[1,.67]];
    ctx.beginPath();marks.forEach(([at,lift],i)=>{const px=x+.4+(w-.8)*at,py=y+h-lift;if(i)ctx.lineTo(px,py);else ctx.moveTo(px,py);});ctx.stroke();
    const edge=Math.min(11,w*.28),right=x+w-.7,bottom=y+h-1.05;
    ctx.strokeStyle='#63425342';ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(right-edge,bottom+.45);ctx.quadraticCurveTo(right-edge*.45,bottom+.7,right,bottom-.3);ctx.stroke();
    ctx.strokeStyle='#fffdf8e0';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(right-edge,bottom-.2);ctx.quadraticCurveTo(right-edge*.45,bottom+.05,right,bottom-.7);ctx.stroke();
    ctx.restore();
  }
  function sewnLabel(ctx,{x,y,w,h}){
    if(w<18||h<18)return;
    ctx.save();ctx.lineWidth=.55;ctx.strokeStyle='#fffdf879';ctx.setLineDash([3,3]);
    ctx.strokeRect(x+6.45,y+6.65,w-12,h-12);ctx.restore();
  }
  function coverEdge(ctx,{x,y,w,h}){
    ctx.save();ctx.beginPath();ctx.rect(x,y,w,h);ctx.clip();
    ctx.lineWidth=.65;ctx.strokeStyle='#fff4e645';ctx.beginPath();ctx.moveTo(x+w-4,y+5);ctx.lineTo(x+w-4,y+h-4);ctx.lineTo(x+w*.12+3,y+h-4);ctx.stroke();
    ctx.strokeStyle='#63425318';ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(x+w-4.6,y+5);ctx.lineTo(x+w-4.6,y+h-4.6);ctx.lineTo(x+w*.12+3,y+h-4.6);ctx.stroke();
    ctx.strokeStyle='#fff4e64d';ctx.lineWidth=.8;ctx.setLineDash([1.5,2.5]);ctx.beginPath();ctx.moveTo(x+w*.12-1,y+7);ctx.lineTo(x+w*.12-1,y+h-7);ctx.stroke();ctx.restore();
  }
  function paint(ctx,node,origin,{skipFandom=false,phase='after'}={}){
    const result=empty();
    if(!ctx||!node?.querySelectorAll||!origin||phase!=='after')return result;
    for(const element of elements(node,selectors)){
      if(element.closest('[hidden]')||skipFandom&&element.closest('.fandom-layer'))continue;
      if(element.matches('.book-front')&&element.closest('.picture-cover'))continue;
      const r=relative(element,origin);if(![r.x,r.y,r.w,r.h].every(Number.isFinite)||r.w<2||r.h<2)continue;
      if(element.matches(mountSelector)){photoEdge(ctx,r);result.photos++;}
      else if(element.matches('.cover-dedication')){sewnLabel(ctx,r);result.labels++;}
      else {coverEdge(ctx,r);result.covers++;}
    }
    return result;
  }
  window.ScrapbookPaperFinish=Object.freeze({paint,selectors,revision:43});
})();

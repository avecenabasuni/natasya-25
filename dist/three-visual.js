import * as THREE from './assets/vendor/three.min.js';
import { createBirthdayCakeVisual } from './birthday-cake-visual.js?v=27';

const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));
const mix=(a,b,t)=>a+(b-a)*t;
const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
const rad=THREE.MathUtils.degToRad;
const imagePromises=new Map();
function loadImage(src){
  const url=new URL(src,location.href).href,shared=url.startsWith(new URL('assets/',location.href).href);
  if(shared&&imagePromises.has(url))return imagePromises.get(url);
  const promise=new Promise(resolve=>{
    const img=new Image();img.crossOrigin='anonymous';img.onload=()=>resolve(img);img.onerror=()=>resolve(null);img.src=src;
  }).then(image=>{
    if(!image&&shared&&imagePromises.get(url)===promise)imagePromises.delete(url);
    return image;
  });
  if(shared)imagePromises.set(url,promise);return promise;
}

// Every pose is an absolute function of the same scroll state as the native book.
window.createThreeBookVisual=({film,viewport,width:W,height:H,screen,stageHeight,bottomReserve,pages,chapters,originals})=>{
  const css=getComputedStyle(document.documentElement),color=role=>css.getPropertyValue('--'+role).trim();
  const palette=Object.fromEntries(['paper','stage','linen','lining','binding','blush','rose','sage','paper-edge','scene-ink','scene-ground','scene-key','object-edge','object-halo'].map(role=>[role,color(role)]));
  let renderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,stencil:false,powerPreference:'low-power'});}catch{return null;}
  const canvas=renderer.domElement;canvas.className='three-canvas';canvas.setAttribute('aria-hidden','true');
  canvas.hidden=true;viewport.prepend(canvas);film.classList.add('three-available');film.dataset.assetsReady='false';film.dataset.renderer='css';
  const resolution=Math.min(devicePixelRatio||1,2,Math.sqrt(900000/(screen.width*stageHeight)));
  const activeResolution=resolution;
  renderer.setPixelRatio(1);renderer.setSize(Math.round(screen.width*resolution),Math.round(stageHeight*resolution),false);
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.NeutralToneMapping;renderer.toneMappingExposure=1;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFShadowMap;renderer.shadowMap.autoUpdate=false;
  // Tight scene bounds preserve depth precision for thin attached paper.
  const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(2*Math.atan(stageHeight/(2*1900))*180/Math.PI,screen.width/stageHeight,500,3500);
  camera.position.set(0,0,1900);camera.lookAt(0,0,0);
  const root=new THREE.Group();scene.add(root);root.position.y=bottomReserve/2;
  const ambient=new THREE.HemisphereLight('#ffffff',palette['scene-ground'],1.65);scene.add(ambient);
  const light=new THREE.DirectionalLight(palette['scene-key'],2);light.position.set(-320,520,1600);light.castShadow=true;
  light.shadow.mapSize.set(1024,1024);light.shadow.camera.left=-680;light.shadow.camera.right=680;light.shadow.camera.top=700;light.shadow.camera.bottom=-680;
  light.shadow.camera.near=50;light.shadow.camera.far=2500;light.shadow.bias=-.00025;light.shadow.normalBias=.2;light.shadow.radius=3;scene.add(light);
  const resources=new Set();let disposed=false,lost=false,latest=null,ready=false,active=false,renderFrames=0,lastPose='';
  let readerHolding=false;const readerMasks=new Set();
  function dropReaderMask(mask){mask.remove();readerMasks.delete(mask);}
  function clearReaderMasks(){readerHolding=false;readerMasks.forEach(mask=>mask.remove());readerMasks.clear();film.dataset.readerObject='';}
  const track=x=>{resources.add(x);return x;};
  const material=(color,extra={})=>track(new THREE.MeshStandardMaterial({color,roughness:.95,metalness:0,...extra}));
  const paper=material('#ffffff',{roughness:1}),pink=material(palette.linen),edge=material(palette.binding);
  const foreEdge=material('#ffffff'),capEdge=material('#ffffff');
  const mesh=(geo,mat,parent=root)=>{const m=new THREE.Mesh(track(geo),mat);m.castShadow=true;m.receiveShadow=true;parent.add(m);return m;};
  const box=(w,h,d,mat,parent=root)=>mesh(new THREE.BoxGeometry(w,h,d),mat,parent);
  const plane=(w,h,mat,parent=root)=>mesh(new THREE.PlaneGeometry(w,h),mat,parent);
  const roundedBox=(w,h,d,r,mat,parent=root)=>{
    const s=new THREE.Shape(),x=-w/2,y=-h/2;
    s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);
    const geometry=new THREE.ExtrudeGeometry(s,{depth:d-2,steps:1,bevelEnabled:true,bevelThickness:1,bevelSize:1,bevelSegments:2,curveSegments:5});geometry.translate(0,0,-(d-2)/2);
    return mesh(geometry,mat,parent);
  };
  const table=plane(3000,2400,track(new THREE.ShadowMaterial({color:'#6a3c51',opacity:.2,depthWrite:false})),root);table.position.z=-25;table.castShadow=false;
  const baseR=box(W+12,H+16,13,edge);baseR.position.set(W/2,0,-17);
  const sheetTop=4,insertClearance=6,stackBottom=-10,stackDepth=13.5;
  const deck=box(W,H,stackDepth,[foreEdge,foreEdge,capEdge,capEdge,paper,paper]);deck.position.set(W/2,0,-3.25);
  const deckLeaves=[];
  for(let i=0;i<8;i++){
    const geometry=new THREE.BoxGeometry(W+1,H+.5,.45);geometry.translate(W/2,0,0);
    const line=mesh(geometry,paper);line.castShadow=false;line.receiveShadow=false;line.position.set(.7+i*.28,0,-12+i*1.6);deckLeaves.push(line);
  }
  const spine=roundedBox(13,H+15,22,3,edge);spine.position.set(-2,0,-15);
  const imageCover=originals[0].classList.contains('picture-cover');
  const cover=new THREE.Group();root.add(cover);cover.position.z=18;
  const coverMaterials=[edge,edge,edge,edge,pink,material('#ffffff')];
  const coverBoard=roundedBox(W+7,H+10,8,3,pink,cover);coverBoard.position.x=W/2;
  const coverFace=plane(W+3,H+6,coverMaterials[4],cover);coverFace.position.set(W/2,0,4.5);coverFace.castShadow=false;
  const coverInside=plane(W+3,H+6,coverMaterials[5],cover);coverInside.position.set(W/2,0,-4.5);coverInside.rotation.y=Math.PI;coverInside.castShadow=false;
  const ribbon=new THREE.Group();cover.add(ribbon);ribbon.position.set(W*.09,-H/2+4,4.8);
  ribbon.visible=!imageCover;
  const ribbonMat=material(palette.sage,{roughness:.85,side:THREE.DoubleSide,transparent:true,depthWrite:false});
  const ribbonLength=52,ribbonGeo=new THREE.PlaneGeometry(12,ribbonLength,1,20),ribbonPositions=ribbonGeo.attributes.position;
  for(let i=0;i<ribbonPositions.count;i++){const t=(ribbonLength/2-ribbonPositions.getY(i))/ribbonLength;ribbonPositions.setXYZ(i,ribbonPositions.getX(i)+13*Math.sin(t*Math.PI*.85),-t*ribbonLength,-4*Math.sin(t*Math.PI/2));}
  ribbonGeo.computeVertexNormals();const ribbonMesh=mesh(ribbonGeo,ribbonMat,ribbon);
  ribbonMesh.castShadow=false;
  const leftSheet=plane(W,H,paper);leftSheet.position.set(-W/2,0,4);leftSheet.visible=false;
  const readingMaterial=material('#ffffff');const reading=plane(W,H,readingMaterial);reading.position.set(W/2,0,4);
  const curlGeometry=track(new THREE.BoxGeometry(W,H,1,64,10,1));curlGeometry.translate(W/2,0,0);
  const curlOriginal=Float32Array.from(curlGeometry.attributes.position.array);
  const curlNormalOriginal=Float32Array.from(curlGeometry.attributes.normal.array),curlLookup=new Uint16Array(curlGeometry.attributes.position.count),bendPaths=new Float32Array(11*65*4);
  for(let i=0;i<curlLookup.length;i++){const col=clamp(Math.round(curlOriginal[i*3]/W*64),0,64),row=clamp(Math.round((H/2-curlOriginal[i*3+1])/H*10),0,10);curlLookup[i]=row*65+col;}
  const curlFront=material('#ffffff'),curlBack=material('#ffffff'),paperEdge=material(palette['paper-edge']);
  const curl=mesh(curlGeometry,[paperEdge,paperEdge,paperEdge,paperEdge,curlFront,curlBack]);const reverse={visible:false};
  curl.frustumCulled=false;
  curl.visible=reverse.visible=false;
  const props=pages.map(()=>new THREE.Group());props.forEach(g=>{root.add(g);g.visible=false;g.position.z=5;});
  const turningProps=pages.map(()=>new THREE.Group()),boundProps=pages.map(()=>[]);
  turningProps.forEach(g=>{root.add(g);g.visible=false;});
  const sets=new Map(),snapshots=[],underlays=[],backs=[],reverseMaps=[],propAnchors=new Map(),fandomEntries=[];let coverMap=null,paperMap=null,linenMap=null,pageBaseMap=null,currentTurn=-1;
  const birthdayCakes=new Map();let cakeImage=null,cakeFrame=0,cakeRendering=false,candleLit=pages.find(page=>page.print.querySelector('.birthday-cake'))?.print.querySelector('.birthday-cake')?.dataset.candleLit!=='false';
  const texture=canvas=>{const t=track(new THREE.CanvasTexture(canvas));t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());return t;};
  const sourceTexture=img=>{const t=track(new THREE.Texture(img));t.needsUpdate=true;t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=4;return t;};
  const canvas2d=(w=W,h=H)=>{const c=document.createElement('canvas');c.width=Math.ceil(w*2);c.height=Math.ceil(h*2);const ctx=c.getContext('2d');ctx.scale(2,2);return {c,ctx};};
  const paintPaper=(ctx,w=W,h=H)=>{ctx.fillStyle=palette.paper;ctx.fillRect(0,0,w,h);if(paperMap){ctx.save();ctx.globalAlpha=.1;const p=ctx.createPattern(paperMap,'repeat');p.setTransform(new DOMMatrix().scale(440/paperMap.width));ctx.fillStyle=p;ctx.fillRect(0,0,w,h);ctx.restore();}const shade=ctx.createLinearGradient(0,0,16,0);shade.addColorStop(0,'#63425316');shade.addColorStop(1,'#63425300');ctx.fillStyle=shade;ctx.fillRect(0,0,18,h);};
  const paintCover=ctx=>{
    if(imageCover){ctx.fillStyle=palette.paper;ctx.fillRect(0,0,W,H);return;}
    ctx.fillStyle=palette.linen;ctx.fillRect(0,0,W,H);ctx.fillStyle=palette.rose;ctx.fillRect(0,0,W*.12,H);
    if(linenMap){ctx.save();ctx.globalAlpha=.1;const weave=ctx.createPattern(linenMap,'repeat');weave.setTransform(new DOMMatrix().scale(350/linenMap.width));ctx.fillStyle=weave;ctx.fillRect(0,0,W,H);ctx.restore();}
    const seam=ctx.createLinearGradient(W*.12-5,0,W*.12+3,0);seam.addColorStop(0,'#301e2a00');seam.addColorStop(.55,'#301e2a30');seam.addColorStop(.7,'#fffdf840');seam.addColorStop(1,'#301e2a00');ctx.fillStyle=seam;ctx.fillRect(W*.12-5,0,8,H);
  };

  async function drawDOM(node,ctx,origin,relief=null,skipFandom=false){
    const boxSelector='button,a.open-book,.cover-stitch,.cover-dedication,.cover-dedication-stitch,.page-foot,.placeholder-copy,.postcard-date,.fragment-image,.photo-blank,.coupon-card,.gift-pocket-front,.letter-crease,.note-fold-edge,.trier-map,.photo-fragments,.keepsake-slip,.pet-sticker,.folded-letter,.soundtrack-slip,.photo-portrait .fandom-portrait';
    const boxes=[...(node.matches(boxSelector)?[node]:[]),...node.querySelectorAll(boxSelector)];
    boxes.forEach(e=>{
      if(skipFandom&&e.closest('.fandom-layer'))return;
      const r=e.getBoundingClientRect(),s=getComputedStyle(e),x=r.left-origin.left,y=r.top-origin.top;ctx.save();ctx.globalAlpha=Number(s.opacity);
      if(e.matches('.voucher-coupon:not(.pocket-gift)')||s.backgroundColor!=='rgba(0, 0, 0, 0)'){ctx.fillStyle=e.matches('.voucher-coupon:not(.pocket-gift)')?palette.blush:s.backgroundColor;ctx.fillRect(x,y,r.width,r.height);}
      if(e.matches('.cover-dedication')&&linenMap){ctx.save();ctx.globalAlpha=.12;const weave=ctx.createPattern(linenMap,'repeat');weave.setTransform(new DOMMatrix().scale(220/linenMap.width));ctx.fillStyle=weave;ctx.fillRect(x,y,r.width,r.height);ctx.restore();}
      for(const [side,points] of [['Top',[x,y,x+r.width,y]],['Right',[x+r.width,y,x+r.width,y+r.height]],['Bottom',[x+r.width,y+r.height,x,y+r.height]],['Left',[x,y+r.height,x,y]]]){
        const size=parseFloat(s['border'+side+'Width']),style=s['border'+side+'Style'];if(!size||style==='none')continue;
        ctx.strokeStyle=s['border'+side+'Color'];ctx.lineWidth=size;ctx.setLineDash(style==='dashed'?[3,3]:[]);ctx.beginPath();ctx.moveTo(points[0],points[1]);ctx.lineTo(points[2],points[3]);ctx.stroke();
      }
      ctx.restore();
    });
    await Promise.all([...node.querySelectorAll('img')].map(async e=>{
      if(skipFandom&&e.closest('.fandom-layer'))return;
      const img=await loadImage(e.src);if(!img){
        if(e.closest('.real-memory,.fragment-image')){e.hidden=true;if(!e.parentElement.querySelector('.image-error')){const error=document.createElement('span');error.className='image-error';error.textContent='This photo could not be loaded.';e.parentElement.append(error);}}
        return;
      }
      const r=e.getBoundingClientRect();if(!r.width||!r.height)return;
      const fit=getComputedStyle(e).objectFit,scale=fit==='cover'?Math.max(r.width/img.width,r.height/img.height):Math.min(r.width/img.width,r.height/img.height);
      const iw=fit==='fill'?r.width:img.width*scale,ih=fit==='fill'?r.height:img.height*scale;ctx.save();
      for(let ancestor=e;ancestor&&ancestor!==node.parentElement;ancestor=ancestor.parentElement){
        const polygon=ancestor.dataset.catPolygon||ancestor.dataset.stickerPolygon;
        if(polygon){
          const frame=ancestor.getBoundingClientRect();ctx.beginPath();
          polygon.split(' ').forEach((point,i)=>{const [px,py]=point.split(',').map(Number),x=frame.left-origin.left+px/100*frame.width,y=frame.top-origin.top+py/100*frame.height;if(i)ctx.lineTo(x,y);else ctx.moveTo(x,y);});ctx.closePath();ctx.clip();
        }
        const style=getComputedStyle(ancestor);if(!['hidden','clip'].includes(style.overflowX)&&!['hidden','clip'].includes(style.overflowY))continue;
        const clip=ancestor.getBoundingClientRect();ctx.beginPath();ctx.rect(clip.left-origin.left,clip.top-origin.top,clip.width,clip.height);ctx.clip();
      }
      ctx.beginPath();ctx.rect(r.left-origin.left,r.top-origin.top,r.width,r.height);ctx.clip();
      const dx=r.left-origin.left+(r.width-iw)/2,dy=r.top-origin.top+(r.height-ih)/2;
      const finish=window.ScrapbookPhotoFinish,frame=e.closest('.fandom-frame')?.dataset.stickerFrame?.split(',').map(Number);
      const print=finish&&e.matches(finish.selector)?finish.getPrint(img,frame):null;
      if(print){const [x,y,w,h]=print.frame;ctx.drawImage(print.image,dx+x/img.width*iw,dy+y/img.height*ih,w/img.width*iw,h/img.height*ih);}
      else ctx.drawImage(img,dx,dy,iw,ih);
      ctx.restore();
    }));
    const walker=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);let n;
    while(n=walker.nextNode()){
      if(!n.textContent.trim())continue;
      const e=n.parentElement,s=getComputedStyle(e);if(s.display==='none'||e.closest('[data-scene-skip],.cover-spine-caption')||skipFandom&&e.closest('.fandom-layer'))continue;ctx.save();
      for(let ancestor=e;ancestor&&ancestor!==node.parentElement;ancestor=ancestor.parentElement){
        const style=getComputedStyle(ancestor);if(!['hidden','clip'].includes(style.overflowX)&&!['hidden','clip'].includes(style.overflowY))continue;
        const r=ancestor.getBoundingClientRect();ctx.beginPath();ctx.rect(r.left-origin.left,r.top-origin.top,r.width,r.height);ctx.clip();
      }
      ctx.font=s.fontStyle+' '+s.fontWeight+' '+s.fontSize+' '+s.fontFamily;ctx.letterSpacing=s.letterSpacing==='normal'?'0px':s.letterSpacing;ctx.fillStyle=e.closest('.photo-fragment')&&!e.closest('.fragment-image')?palette.paper:palette['scene-ink'];ctx.textBaseline='alphabetic';
      const metrics=ctx.measureText('Mg'),ascent=metrics.actualBoundingBoxAscent,descent=metrics.actualBoundingBoxDescent,range=document.createRange();let line=null;
      const drawLine=()=>{if(!line)return;const x=line.left-origin.left,y=line.top-origin.top+(line.height-ascent-descent)/2+ascent;ctx.fillText(line.text,x,y);if(relief&&e.closest('.cover-month,.cover-kicker')){relief.save();relief.font=ctx.font;relief.letterSpacing=ctx.letterSpacing;relief.fillStyle='#747474';relief.fillText(line.text,x,y);relief.restore();}};
      for(let i=0;i<n.length;){
        const character=String.fromCodePoint(n.textContent.codePointAt(i)),end=i+character.length;range.setStart(n,i);range.setEnd(n,end);i=end;
        const r=range.getBoundingClientRect();if(!r.width||!r.height)continue;
        if(!line||Math.abs(line.top-r.top)>.75){drawLine();line={text:character,left:r.left,top:r.top,height:r.height};}else line.text+=character;
      }
      drawLine();ctx.restore();
    }
    window.ScrapbookPaperFinish?.paint(ctx,node,origin,{skipFandom,phase:'after'});
  }
  async function raster(original,isCover=false){
    const host=document.createElement('div');host.className='scene-raster three-book';host.inert=true;host.setAttribute('aria-hidden','true');film.append(host);
    if(!isCover){const chapter=original.closest('.album-chapter');if(chapter)host.classList.add(...[...chapter.classList].filter(name=>!['album-chapter','film-chapter'].includes(name)));}
    const node=original.cloneNode(true);node.removeAttribute('id');node.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
    [node,...node.querySelectorAll('.object-hovered,.object-pressed,.object-focused')].forEach(n=>n.classList.remove('object-hovered','object-pressed','object-focused'));
    node.style.position='absolute';node.style.inset='0';node.style.width=W+'px';node.style.height=H+'px';node.style.transform='none';node.style.display='block';host.append(node);
    const {c,ctx}=canvas2d(),relief=isCover&&!imageCover?canvas2d():null;paintPaper(ctx);
    if(isCover){paintCover(ctx);if(relief){relief.ctx.fillStyle='#b0b0b0';relief.ctx.fillRect(0,0,W,H);}}
    const origin=node.getBoundingClientRect();await drawDOM(node,ctx,origin,relief?.ctx,true);
    if(isCover&&imageCover)for(const overlay of node.querySelectorAll('.cover-personalisation,.cover-collage-date')){
      // Print live type in the same rotated paper coordinates as the DOM.
      const pose=getComputedStyle(overlay).transform,matrix=pose==='none'?null:new DOMMatrix(pose),angle=matrix?Math.atan2(matrix.b,matrix.a):0;
      const transform=overlay.style.transform,skip=overlay.getAttribute('data-scene-skip');
      overlay.style.transform='none';overlay.removeAttribute('data-scene-skip');
      try{
        const r=overlay.getBoundingClientRect(),part=canvas2d(r.width,r.height);await drawDOM(overlay,part.ctx,r);
        ctx.save();ctx.translate(r.left-origin.left+r.width/2,r.top-origin.top+r.height/2);ctx.rotate(angle);ctx.drawImage(part.c,-r.width/2,-r.height/2,r.width,r.height);ctx.restore();
      }finally{if(transform)overlay.style.transform=transform;else overlay.style.removeProperty('transform');if(skip!==null)overlay.setAttribute('data-scene-skip',skip);}
    }
    const bounds=e=>{const r=e.getBoundingClientRect();return {x:r.left-origin.left,y:r.top-origin.top,w:r.width,h:r.height};},anchors={},parts={};
    for(const selector of ['.story-art','.trier-image','.trier-map','.keepsake-slip','.cat-family-open','.postcard-date','.birthday-keepsake','.letter-excerpt','.photo-fragments','.coupon-card','.gift-pocket-front','.soundtrack-slip','.birthday-cake','.cake-popup','.cake-art','.cake-candle','.cake-caption','.birthday-wish-note']){
      const e=node.querySelector(selector);if(e)anchors[selector]=bounds(e);
    }
    anchors.fragments=[...node.querySelectorAll('.photo-fragment')].map(bounds);
    anchors.stickers=[...node.querySelectorAll('.pet-sticker')].map(bounds);
    anchors.petPortraits=[...node.querySelectorAll('.pet-portrait')].map(bounds);
    parts.catMasks=await Promise.all([...node.querySelectorAll('.pet-portrait')].map(async e=>{const r=e.getBoundingClientRect(),part=canvas2d(r.width,r.height);await drawDOM(e,part.ctx,r);return texture(part.c);}));
    anchors.photoImages=[...node.querySelectorAll('.fragment-image')].map(bounds);
    anchors.actions=[...node.querySelectorAll('.story-button[data-book-object]')].map(e=>({key:e.dataset.bookObject,...bounds(e)}));
    const fandom=[...node.querySelectorAll('.fandom-sticker')].filter(node=>!node.hidden);
    anchors.fandom=fandom.map(e=>({key:e.dataset.fandomSticker,angle:parseFloat(e.dataset.stickerAngle)||0,onAttachment:e.dataset.stickerOnAttachment==='true',...bounds(e)}));
    parts.fandom=await Promise.all(fandom.map(async e=>{const r=e.getBoundingClientRect(),part=canvas2d(r.width,r.height);await drawDOM(e,part.ctx,r);return texture(part.c);}));
    if(isCover){
      const patch=node.querySelector('.cover-dedication');
      if(patch){const b=bounds(patch),part=canvas2d(b.w,b.h);part.ctx.drawImage(c,b.x*2,b.y*2,b.w*2,b.h*2,0,0,b.w,b.h);parts.dedication=texture(part.c);anchors['.cover-dedication']=b;ctx.save();ctx.beginPath();ctx.rect(b.x-1,b.y-1,b.w+2,b.h+2);ctx.clip();paintCover(ctx);ctx.restore();ctx.save();ctx.fillStyle='#301e2a18';ctx.shadowColor='#301e2a40';ctx.shadowBlur=2;ctx.shadowOffsetX=.6;ctx.shadowOffsetY=1.2;ctx.fillRect(b.x+.5,b.y+.5,b.w-1,b.h-1);ctx.restore();}
      const caption=node.querySelector('.cover-spine-caption');if(caption){ctx.save();ctx.translate(W*.042,H*.83);ctx.rotate(-Math.PI/2);ctx.font='500 10px "Source Sans 3"';ctx.fillStyle=palette.paper;ctx.fillText(caption.textContent,0,0);ctx.restore();}
      if(linenMap&&relief){relief.ctx.save();relief.ctx.globalAlpha=.1;relief.ctx.globalCompositeOperation='multiply';const weave=relief.ctx.createPattern(linenMap,'repeat');weave.setTransform(new DOMMatrix().scale(350/linenMap.width));relief.ctx.fillStyle=weave;relief.ctx.fillRect(0,0,W,H);relief.ctx.restore();}
    }
    for(const [name,selector,bg] of [['card','.coupon-card',palette.paper],['pocket','.gift-pocket-front',palette.lining]]){
      const e=node.querySelector(selector);if(!e)continue;const r=e.getBoundingClientRect(),part=canvas2d(r.width,r.height);
      part.ctx.fillStyle=bg;part.ctx.fillRect(0,0,r.width,r.height);await drawDOM(e,part.ctx,r);
      if(name==='pocket'){
        part.ctx.globalCompositeOperation='destination-in';part.ctx.beginPath();part.ctx.moveTo(0,0);part.ctx.lineTo(r.width/2,r.height*.14);part.ctx.lineTo(r.width,0);part.ctx.lineTo(r.width,r.height);part.ctx.lineTo(0,r.height);part.ctx.closePath();part.ctx.fill();
      }
      parts[name]=texture(part.c);
    }
    host.remove();return {map:texture(c),anchors,parts,relief:relief?.c};
  }
  function label(text,w,h,size=22,bg=palette.paper){
    const {c,ctx}=canvas2d(w,h);ctx.fillStyle=bg;ctx.fillRect(0,0,w,h);ctx.fillStyle=palette['scene-ink'];ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=`500 ${size}px "Fraunces"`;
    String(text).split('\n').forEach((t,i,a)=>ctx.fillText(t,w/2,h/2+(i-(a.length-1)/2)*(size*1.2),w-14));return texture(c);
  }
  function clearUnderlay(index,box){
    const ctx=underlays[index].image.getContext('2d');ctx.save();ctx.setTransform(2,0,0,2,0,0);
    ctx.beginPath();ctx.rect(box.x,box.y,box.w,box.h);ctx.clip();paintPaper(ctx);ctx.restore();underlays[index].needsUpdate=true;
  }
  function cropPrint(index,b){
    const {c,ctx}=canvas2d(b.w,b.h);ctx.drawImage(snapshots[index].image,b.x*2,b.y*2,b.w*2,b.h*2,0,0,b.w,b.h);return texture(c);
  }
  function printedPaper(index,b,parent,z=1.2,angle=0,map=null,kind='paper'){
    const g=new THREE.Group();parent.add(g);g.position.set(b.x+b.w/2,H/2-b.y-b.h/2,z);g.rotation.z=-rad(angle);
    const depth=kind==='photo'?.55:kind==='sticker'?.3:.7;
    const printMap=map||cropPrint(index,b);g.userData.readerPrint={image:printMap.image,w:b.w,h:b.h};
    boxMesh(b.w,b.h,depth,paper,g);
    const print=plane(b.w,b.h,material('#ffffff',{map:printMap,roughness:kind==='photo'?.58:.95,bumpMap:kind==='photo'?null:paper.bumpMap,bumpScale:.1}),g);print.position.z=depth/2+.06;print.castShadow=false;g.userData.readerFace=print;
    return g;
  }
  function fandomSticker(b,map,parent,index,role,z){
    if(!map||b.w<1||b.h<1)return;
    const sticker=plane(b.w,b.h,material('#ffffff',{map,transparent:true,alphaTest:.05,roughness:.95,side:THREE.DoubleSide}),parent);
    sticker.position.set(b.x+b.w/2,H/2-b.y-b.h/2,z);sticker.rotation.z=-rad(b.angle);sticker.userData.fandomSticker=b.key;
    sticker.userData.readerPrint={image:map.image,w:b.w,h:b.h};
    fandomEntries.push({key:b.key,index,role,angle:b.angle,width:b.w,height:b.h,mesh:sticker});
  }
  function fandomPose(){
    const viewport=canvas.getBoundingClientRect();
    return fandomEntries.filter(entry=>{for(let node=entry.mesh;node;node=node.parent)if(!node.visible)return false;return true;}).map(entry=>{
      const {mesh,key,index,role}=entry,p=mesh.geometry.attributes.position,box=new THREE.Box3().setFromBufferAttribute(p),points=[];
      for(const x of[box.min.x,box.max.x])for(const y of[box.min.y,box.max.y])for(const z of[box.min.z,box.max.z]){const v=mesh.localToWorld(new THREE.Vector3(x,y,z)).project(camera);points.push({x:viewport.left+(v.x+1)*viewport.width/2,y:viewport.top+(1-v.y)*viewport.height/2});}
      const left=Math.min(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y));
      return {key,index,role,vertices:p.count,vertex:[p.getX(0),p.getY(0),p.getZ(0)],rect:{left,top,width:Math.max(...points.map(p=>p.x))-left,height:Math.max(...points.map(p=>p.y))-top}};
    });
  }
  const feedbackEntries=[],feedbackKeys=new Map();
  let feedbackFrame=0,feedbackTime=0,feedbackRendering=false,discovery=null;
  function clearDiscovery(){
    if(!discovery)return false;
    discovery=null;feedbackEntries.forEach(e=>{e.mat.uniforms.glint.value=0;});film.dataset.discoveryContour='';lastPose='';return true;
  }
  function setDiscovery({key,amount=0,progress=0}){
    const repaint=()=>{if(disposed||lost||!latest)return;lastPose='';feedbackRendering=true;update(latest);feedbackRendering=false;};
    if(!key){if(clearDiscovery())repaint();return false;}
    if(disposed||lost||!active||!ready||!affordancesVisible()){if(clearDiscovery())repaint();return false;}
    const entries=(feedbackKeys.get(key)||[]).filter(e=>e.index===latest.phase.index);if(!entries.length)return false;
    discovery={key,index:latest.phase.index,entries,amount:clamp(amount),progress:clamp(progress)};
    film.dataset.discoveryContour=key+':'+progress.toFixed(3);repaint();return true;
  }
  const contourVertex=`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
  const contourFragment=`
    uniform vec2 size;uniform float strength,affordance,shape,sweep,glint,orbit;uniform sampler2D mask;
    uniform vec3 edgeColor,haloColor;varying vec2 vUv;
    float silhouette(vec2 uv){
      if(uv.x<0.0||uv.x>1.0||uv.y<0.0||uv.y>1.0)return 0.0;
      return texture2D(mask,uv).a;
    }
    void main(){
      vec2 p=(vUv-.5)*(size+12.0);float rim=0.0,halo=0.0;
      if((shape>0.5&&shape<1.5)||shape>2.5){
        vec2 uv=p/size+.5;float original=silhouette(uv),nearby=original,outer=original;
        for(int i=0;i<8;i++){
          float angle=float(i)*.78539816;vec2 direction=vec2(cos(angle),sin(angle))/size;
          nearby=max(nearby,silhouette(uv+direction*1.6));outer=max(outer,silhouette(uv+direction*4.0));
        }
        rim=max(0.0,nearby-original);halo=max(0.0,outer-original);
      }else{
        vec2 q=abs(p)-(size*.5-1.0);
        float d=length(max(q,0.0))+min(max(q.x,q.y),0.0)-1.0;
        if(shape>1.5){
          float top=size.y*.5-size.y*.14*(1.0-abs(p.x)/(size.x*.5));
          d=max(d,p.y-top);
        }
        rim=1.0-smoothstep(.35,1.25,abs(d));halo=1.0-smoothstep(.9,3.7,abs(d));
      }
      if(max(rim,halo)<.005)discard;
      float perimeter=fract(atan(p.y/size.y,p.x/size.x)/6.2831853+.5);
      float head=fract(.75-orbit),gap=abs(fract(perimeter-head+.5)-.5);
      float gleam=glint*(1.0-smoothstep(.015,.12,gap));
      float pressPhase=fract(.75-sweep),pressGap=abs(fract(perimeter-pressPhase+.5)-.5);
      float touchShine=1.0-smoothstep(.02,.16,pressGap);
      float quiet=affordance*max(rim*.11,halo*.025);
      float alpha=max(quiet,max(gleam*max(rim*.82,halo*.13),strength*max(rim*(.55+.4*touchShine),halo*.14)));
      if(alpha<.005)discard;
      float edge=smoothstep(.08,.65,rim);
      vec3 quietColor=mix(haloColor,edgeColor,.8);
      vec3 pearl=mix(edgeColor,vec3(1.0),.72);
      vec3 sheen=mix(pearl,vec3(.84,.85,1.0),.12*(.5+.5*cos(perimeter*6.2831853)));
      vec3 lit=mix(haloColor,sheen,edge);
      gl_FragColor=vec4(mix(quietColor,lit,max(gleam,strength)),alpha);
      #include <colorspace_fragment>
    }`;
  function registerFeedback(key,index,object,w,h,{x=0,y=0,z=1.1,shape=0,aliases=[],mask=null}={}){
    // Keep the resting/turning anchor untouched; only its inner contents lift.
    const content=new THREE.Group();[...object.children].forEach(child=>content.add(child));object.add(content);object.userData.readerContent=content;
    const mat=track(new THREE.ShaderMaterial({vertexShader:contourVertex,fragmentShader:contourFragment,transparent:true,depthWrite:false,toneMapped:false,
      uniforms:{size:{value:new THREE.Vector2(w,h)},strength:{value:0},affordance:{value:0},glint:{value:0},orbit:{value:0},shape:{value:shape},mask:{value:mask},sweep:{value:2},edgeColor:{value:new THREE.Color(palette['object-edge'])},haloColor:{value:new THREE.Color(palette['object-halo'])}}}));
    const ring=plane(w+12,h+12,mat,content);ring.position.set(x,y,z);ring.castShadow=ring.receiveShadow=false;ring.visible=false;ring.userData.objectContour=true;
    const entry={key,index,object,w,h,content,ring,mat,value:0,target:0,started:0};feedbackEntries.push(entry);
    [key,...aliases].forEach(name=>{if(!feedbackKeys.has(name))feedbackKeys.set(name,[]);feedbackKeys.get(name).push(entry);});
  }
  function clearFeedback(){
    cancelAnimationFrame(feedbackFrame);feedbackFrame=0;feedbackTime=0;
    feedbackEntries.forEach(e=>{e.value=e.target=0;e.content.position.z=0;e.content.rotation.x=0;e.content.scale.setScalar(1);e.ring.visible=false;e.mat.uniforms.strength.value=e.mat.uniforms.affordance.value=e.mat.uniforms.glint.value=0;});
    film.dataset.objectFeedback='';film.dataset.objectAffordances='';
  }
  const affordancesVisible=()=>latest?.phase.kind==='read'&&!readerHolding&&!document.hidden&&!document.querySelector('dialog[open]')&&!['moving','preparing'].includes(film.dataset.navigation);
  function applyFeedback(){
    const visible=affordancesVisible();
    feedbackEntries.forEach(e=>{
      e.content.position.z=e.value*2.6;e.content.scale.setScalar(1+e.value*.012);e.content.rotation.x=-rad(.45)*e.value;
      const resting=visible&&e.index===latest.phase.index;
      e.ring.visible=resting||e.value>.005;e.mat.uniforms.strength.value=e.value;e.mat.uniforms.affordance.value=resting?1:0;
      e.mat.uniforms.glint.value=resting&&discovery?.entries.includes(e)?discovery.amount:0;
      e.mat.uniforms.orbit.value=discovery?.progress||0;
      e.mat.uniforms.sweep.value=(performance.now()-e.started)/560;
    });
    film.dataset.objectFeedback=feedbackEntries.filter(e=>e.value>.005).map(e=>e.key+':'+e.value.toFixed(2)).join(',');
    film.dataset.objectAffordances=feedbackEntries.filter(e=>e.mat.uniforms.affordance.value>0).map(e=>e.key).join(',');
  }
  function feedbackTick(now){
    feedbackFrame=0;const dt=feedbackTime?Math.min((now-feedbackTime)/1000,.05):1/60;feedbackTime=now;
    feedbackEntries.forEach(e=>{e.value+=(e.target-e.value)*(1-Math.exp(-dt*24));if(Math.abs(e.value-e.target)<.003)e.value=e.target;});
    lastPose='';feedbackRendering=true;if(latest)update(latest);feedbackRendering=false;
    if(!disposed&&!lost&&feedbackEntries.some(e=>e.value!==e.target||(e.target>0&&now-e.started<390)))feedbackFrame=requestAnimationFrame(feedbackTick);
    else feedbackTime=0;
  }
  function setObjectFeedback({key,mode,immediate=false}){
    if(disposed||lost)return;
    if(readerHolding){clearFeedback();return;}
    const entries=feedbackKeys.get(key)||[],strength=mode==='press'?1:mode==='focus'?.7:mode==='hover'?.46:0,now=performance.now();
    if(immediate){if(!feedbackEntries.some(e=>e.value||e.target))return;clearFeedback();lastPose='';if(latest)update(latest);return;}
    if(document.querySelector('dialog[open]')){clearFeedback();return;}
    feedbackEntries.forEach(e=>{const target=latest?.phase.kind==='read'&&e.index===latest.phase.index&&entries.includes(e)?strength:0;if(target>0&&e.target!==target){e.started=now;if(mode==='press')e.value=Math.max(e.value,target*.5);}e.target=target;});
    if(!feedbackFrame&&feedbackEntries.some(e=>e.value||e.target))feedbackFrame=requestAnimationFrame(feedbackTick);
  }
  function setProps(index,a,parts={}){
    const type=pages[index].section.id,g=props[index];
    a.fandom.forEach((b,i)=>fandomSticker(b,parts.fandom[i],g,index,'page',b.onAttachment?5.8:.95+i*.015));
    if(a['.birthday-cake']&&cakeImage){
      const cake=createBirthdayCakeVisual({THREE,parent:g,anchors:a,pageHeight:H,material,mesh,plane,track,texture,canvas2d,palette,image:cakeImage,lit:candleLit,captionText:pages[index].print.querySelector('.cake-caption').textContent});
      birthdayCakes.set(index,cake);sets.set(index,{type:'cake'});registerFeedback('cake',index,cake.face,cake.imageWidth,cake.imageHeight,{y:cake.imageY,z:1.1,shape:3,mask:cake.mask});clearUnderlay(index,a['.birthday-cake']);
    }
    if(a['.birthday-wish-note']){
      const b=a['.birthday-wish-note'],note=printedPaper(index,b,g,.7);registerFeedback('wish',index,note,b.w,b.h,{z:.8});clearUnderlay(index,b);
    }
    a.stickers.forEach((b,i)=>{
      const sticker=printedPaper(index,b,g,1.2+i*.06,[-3,2,-1,3,-2][i],null,'sticker'),p=a.petPortraits[i];
      registerFeedback('cat-'+i,index,sticker,p.w,p.h,{x:p.x+p.w/2-b.x-b.w/2,y:b.y+b.h/2-p.y-p.h/2,z:.7,shape:1,mask:parts.catMasks[i],aliases:['cats']});clearUnderlay(index,b);
    });
    if(a['.keepsake-slip']){const b=a['.keepsake-slip'];printedPaper(index,b,g,.85,.7);clearUnderlay(index,b);}
    if(a['.soundtrack-slip']){const b=a['.soundtrack-slip'],song=printedPaper(index,b,g,.85);registerFeedback('song',index,song,b.w,b.h);clearUnderlay(index,b);}
    a.actions.forEach(({key,...b})=>{const action=printedPaper(index,b,g,.7);registerFeedback(key,index,action,b.w,b.h,{z:.8});clearUnderlay(index,b);});
    if(a.actions.length&&!sets.has(index))sets.set(index,{type:'actions'});
    const rememberProps=()=>propAnchors.set(index,g.children.map(child=>({child,position:child.position.clone(),rotation:child.rotation.clone()})));
    const b=type==='letter'?a['.letter-excerpt']:a['.birthday-keepsake']||a['.trier-map']||a['.photo-fragments']||a['.trier-image']||a['.story-art'];if(!b){rememberProps();return;}
    const cx=b.x+b.w/2,cy=H/2-b.y-b.h/2;
    if(a['.trier-map']){
      const map=printedPaper(index,b,g,1.2,-1.3);registerFeedback('map',index,map,b.w,b.h);clearUnderlay(index,b);sets.set(index,{type:'map',map});
    }else if(a.fragments.length){
      const map=cropPrint(index,b),ctx=map.image.getContext('2d');ctx.save();ctx.setTransform(2,0,0,2,0,0);ctx.fillStyle=color('contact');
      a.photoImages.forEach(p=>ctx.fillRect(p.x-b.x,p.y-b.y,p.w,p.h));ctx.restore();map.needsUpdate=true;
      const contact=printedPaper(index,b,g,1.2,-.6,map,'photo');
      a.photoImages.forEach((p,i)=>{
        const photo=printedPaper(index,p,contact,1.05,0,null,'photo');photo.position.x-=cx;photo.position.y-=cy;
        registerFeedback('day-'+i,index,photo,p.w,p.h);
      });clearUnderlay(index,b);
      sets.set(index,{type:'contact',contact,cards:a.fragments});
    }else if(pages[index].print.querySelector('.real-memory')){
      const photo=printedPaper(index,b,g,1.2,-1.8,null,'photo');
      const tape=plane(Math.min(74,b.w*.38),15,material(palette.sage,{transparent:true,opacity:.68,roughness:1,depthWrite:false}),photo);tape.position.set(0,b.h/2-1,1);tape.castShadow=false;
      registerFeedback('photograph',index,photo,b.w,b.h,{z:1.3});clearUnderlay(index,b);sets.set(index,{type:'photograph',photo});
    }else if(type==='letter'){
      const fold=new THREE.Group();g.add(fold);fold.position.set(cx,cy,1.2);fold.rotation.z=rad(1);
      const lower=boxMesh(b.w,b.h/2,.9,paper,fold);lower.position.y=-b.h/4;
      const upper=new THREE.Group();fold.add(upper);
      const upperPaper=boxMesh(b.w,b.h/2,.9,paper,upper);upperPaper.position.y=b.h/4;
      const full=cropPrint(index,b),top=track(full.clone()),bottom=track(full.clone());top.repeat.y=bottom.repeat.y=.5;top.offset.y=.5;
      fold.userData.readerPrint={image:full.image,w:b.w,h:b.h};
      const upperPrint=plane(b.w,b.h/2,material('#ffffff',{map:top}),upper);upperPrint.position.set(0,b.h/4,.6);
      const lowerPrint=plane(b.w,b.h/2,material('#ffffff',{map:bottom}),fold);lowerPrint.position.set(0,-b.h/4,.6);
      upperPrint.castShadow=lowerPrint.castShadow=false;
      fold.userData.readerFace=upperPrint;
      registerFeedback('note',index,fold,b.w,b.h,{z:1.3});clearUnderlay(index,b);sets.set(index,{type:'letter',fold,upper,upperPrint,lowerPrint});
    }else if(a['.birthday-keepsake']&&parts.card&&parts.pocket){
      const pocket=new THREE.Group();g.add(pocket);pocket.position.set(cx,cy,1);
      const c=a['.coupon-card'],p=a['.gift-pocket-front'],px=p.x+p.w/2-cx,py=H/2-p.y-p.h/2-cy;
      const backing=boxMesh(p.w,p.h+10,.7,material(palette.lining),pocket);backing.position.set(px,py+5,0);
      const lining=canvas2d(1,1);lining.ctx.fillStyle=palette.lining;lining.ctx.fillRect(0,0,1,1);backing.userData.readerPrint={image:lining.c,w:p.w,h:p.h+10};
      const card=printedPaper(index,c,pocket,1.4,0,parts.card);card.position.x-=cx;card.position.y-=cy;const restY=card.position.y;
      const frontMat=material('#ffffff',{map:parts.pocket,alphaTest:.4,roughness:1});
      const front=plane(p.w,p.h,frontMat,pocket);front.position.set(px,py,3.2);
      front.userData.readerPrint={image:parts.pocket.image,w:p.w,h:p.h};
      const reverse=plane(p.w,p.h,material(palette.lining,{map:parts.pocket,alphaTest:.4,side:THREE.BackSide}),pocket);reverse.position.set(px,py,2.4);reverse.castShadow=false;
      const rim=material(palette.lining);
      const leftRim=boxMesh(.7,p.h,.8,rim,pocket);leftRim.position.set(px-p.w/2,py,2.8);
      const rightRim=boxMesh(.7,p.h,.8,rim,pocket);rightRim.position.set(px+p.w/2,py,2.8);
      const bottomRim=boxMesh(p.w,.7,.8,rim,pocket);bottomRim.position.set(px,py-p.h/2,2.8);
      registerFeedback('gift',index,pocket,p.w,p.h,{x:px,y:py,z:3.6,shape:2});clearUnderlay(index,b);sets.set(index,{type:'pocket',pocket,card,front,restY,slide:12});
    }
    rememberProps();
  }
  function boxMesh(w,h,d,mat,parent){return box(w,h,d,mat,parent);}
  function bend(p){
    const positions=curlGeometry.attributes.position,normals=curlGeometry.attributes.normal,base=Math.PI*smooth(p),wave=Math.sin(Math.PI*p)**2,dx=W/64;
    for(let row=0;row<=10;row++){
      let x=0,z=3.5;const ys=H/2-row*H/10;
      for(let col=0;col<=64;col++){
        const angle=clamp(base+wave*(.74*(col/64-.23)+.15*(ys/H)),0,Math.PI),cos=Math.cos(angle),sin=Math.sin(angle),offset=(row*65+col)*4;
        bendPaths[offset]=x;bendPaths[offset+1]=z;bendPaths[offset+2]=cos;bendPaths[offset+3]=sin;x+=cos*dx;z+=sin*dx;
      }
    }
    for(let i=0;i<positions.count;i++){
      const v=i*3,o=curlLookup[i]*4,cos=bendPaths[o+2],sin=bendPaths[o+3],depth=curlOriginal[v+2],nx=curlNormalOriginal[v],nz=curlNormalOriginal[v+2];
      positions.array[v]=bendPaths[o]-sin*depth;positions.array[v+1]=curlOriginal[v+1];positions.array[v+2]=bendPaths[o+1]+cos*depth;
      normals.array[v]=nx*cos-nz*sin;normals.array[v+1]=curlNormalOriginal[v+1];normals.array[v+2]=nx*sin+nz*cos;
    }
    positions.needsUpdate=normals.needsUpdate=true;
  }
  function animateProps(index,p,turning=false){
    const set=sets.get(index);if(!set)return;
    propAnchors.get(index)?.forEach(a=>{a.child.position.copy(a.position);a.child.rotation.copy(a.rotation);});
    if(set.type==='fragments')set.cards.forEach(card=>{card.rotation.x=0;});
    else if(set.type==='photograph')set.photo.rotation.x=0;
    else if(set.type==='letter'){
      // This is the closed outer paper. Only the reader builds the writing
      // on its inner faces after the attachment is opened.
      set.upper.rotation.x=-rad(1.2);set.upper.position.z=0;
      set.upperPrint.visible=set.lowerPrint.visible=true;
    }else if(set.type==='pocket'){
      const reveal=smooth(clamp(((turning?1:p)-.5)/.35));
      set.card.position.y=set.restY+set.slide*reveal;set.card.rotation.z=rad(.6)*(1-reveal);
    }
    birthdayCakes.get(index)?.pose(turning?0:smooth(clamp((p-.03)/.29))*(1-smooth(clamp((p-.72)/.28))));
    props[index].rotation.y=0;props[index].position.z=5;
  }
  function prepareAttachedTurn(index){
    animateProps(index,1,true);root.updateMatrixWorld(true);
    const inverse=root.matrixWorld.clone().invert();
    props[index].traverse(original=>{
      if(!original.isMesh||!original.visible||original.userData.objectContour||original.userData.cakeTransient)return;
      const p=original.geometry.parameters||{};
      let geometry;
      if(original.geometry.type==='PlaneGeometry')geometry=new THREE.PlaneGeometry(p.width,p.height,Math.max(1,Math.ceil(p.width/(W/64))),Math.max(1,Math.ceil(p.height/(H/10))));
      else if(original.geometry.type==='BoxGeometry')geometry=new THREE.BoxGeometry(p.width,p.height,p.depth,Math.max(1,Math.ceil(p.width/(W/64))),Math.max(1,Math.ceil(p.height/(H/10))),1);
      else geometry=original.geometry.clone();
      geometry.applyMatrix4(inverse.clone().multiply(original.matrixWorld));track(geometry);
      const attached=new THREE.Mesh(geometry,original.material);attached.castShadow=original.castShadow;attached.receiveShadow=original.receiveShadow;
      attached.frustumCulled=false;turningProps[index].add(attached);
      if(original.userData.fandomSticker){attached.userData.fandomSticker=original.userData.fandomSticker;const source=fandomEntries.find(entry=>entry.mesh===original);fandomEntries.push({...source,role:'turn',mesh:attached});}
      boundProps[index].push({geometry,positions:Float32Array.from(geometry.attributes.position.array),normals:Float32Array.from(geometry.attributes.normal.array)});
    });
    animateProps(index,0);
  }
  const samplePath=(a,b,c,d,tx,ty,k)=>mix(mix(bendPaths[a+k],bendPaths[b+k],tx),mix(bendPaths[c+k],bendPaths[d+k],tx),ty);
  function bendAttachments(index,lift){
    for(const item of boundProps[index]){
      const position=item.geometry.attributes.position,normal=item.geometry.attributes.normal;
      for(let i=0;i<position.count;i++){
        const v=i*3,u=clamp(item.positions[v]/W)*64,r=clamp((H/2-item.positions[v+1])/H)*10;
        const col=Math.min(63,Math.floor(u)),row=Math.min(9,Math.floor(r)),tx=u-col,ty=r-row;
        const a=(row*65+col)*4,b=a+4,c=a+65*4,d=c+4;
        const angle=Math.atan2(samplePath(a,b,c,d,tx,ty,3),samplePath(a,b,c,d,tx,ty,2)),cos=Math.cos(angle),sin=Math.sin(angle),depth=item.positions[v+2]-3.5;
        position.array[v]=samplePath(a,b,c,d,tx,ty,0)-sin*depth;position.array[v+1]=item.positions[v+1];position.array[v+2]=samplePath(a,b,c,d,tx,ty,1)+cos*depth+lift;
        normal.array[v]=item.normals[v]*cos-item.normals[v+2]*sin;normal.array[v+1]=item.normals[v+1];normal.array[v+2]=item.normals[v]*sin+item.normals[v+2]*cos;
      }
      position.needsUpdate=normal.needsUpdate=true;
    }
  }
  function update(state){
    if(disposed||lost)return;latest=state;
    if(discovery&&(state.phase.kind!=='read'||state.phase.index!==discovery.index))clearDiscovery();
    if(readerHolding)return;
    if(readerMasks.size)clearReaderMasks();
    if(!ready)return;
    // Finish the current native fold before changing renderers on a cold load.
    if(!active&&!['cover','divider','read'].includes(state.phase.kind))return;
    if(state.phase.kind!=='read'||!birthdayCakes.has(state.phase.index))stopCakeAnimation();
    if(state.phase.kind!=='read'&&feedbackEntries.some(e=>e.value||e.target))clearFeedback();
    const activating=!active;
    if(activating){active=true;film.classList.add('three-book');}
    const moving=state.phase.kind==='turn'||state.phase.kind==='opening'||(state.phase.kind==='read'&&((sets.get(state.phase.index)?.type==='pocket'&&state.p<.95)||(birthdayCakes.has(state.phase.index)&&(state.p<.35||state.p>.7)))),pose=[ready,state.phase.kind,state.phase.index,state.current,state.camX,state.scale,state.rx,state.rz,moving?state.p:0,affordancesVisible()].join(':');
    if(pose===lastPose)return;lastPose=pose;
    root.position.x=state.camX;root.position.y=bottomReserve/2+(state.coverLift||0);root.scale.setScalar(state.scale);root.rotation.set(rad(-state.rx),0,rad(-state.rz));
    const opening=state.phase.kind==='cover'?0:state.phase.kind==='opening'?state.p:1;
    cover.rotation.y=-Math.PI*smooth(opening);cover.position.z=mix(18,-14,smooth(opening));
    ribbonMat.opacity=1-smooth(clamp((opening-.6)/.35));ribbon.visible=!imageCover&&ribbonMat.opacity>0;
    const coverSurface=coverMap;if(coverSurface&&coverMaterials[4].map!==coverSurface){coverMaterials[4].map=coverSurface;coverMaterials[4].needsUpdate=true;}
    props.forEach(g=>g.visible=false);turningProps.forEach(g=>g.visible=false);curl.visible=reverse.visible=false;reading.visible=true;leftSheet.visible=false;
    reading.position.z=sheetTop;leftSheet.position.z=sheetTop;
    if(state.phase.kind==='turn'){
      const i=state.phase.index,clearance=1.8*Math.sin(Math.PI*state.p)**2;curl.visible=reverse.visible=true;curl.position.z=clearance;bend(state.p);
      // Inserted cards are thicker than a sheet. Keep the complete incoming
      // surface below the outgoing paper, then lift it to the reading depth.
      const incomingOffset=-insertClearance*(1-smooth(state.p));reading.position.z+=incomingOffset;
      if(currentTurn!==i){currentTurn=i;curlFront.map=underlays[i]||null;curlBack.map=reverseMaps[i]||null;curlFront.needsUpdate=curlBack.needsUpdate=true;}
      turningProps[i].visible=true;bendAttachments(i,clearance);
      if(i>0){leftSheet.visible=true;leftSheet.position.z-=.8*smooth(state.p);leftSheet.material=materialCache(i);}
      const next=props[i+1];if(next){next.visible=true;animateProps(i+1,0);next.position.z+=incomingOffset;}
    }else if(['divider','pan','read'].includes(state.phase.kind)){
      const i=state.phase.index;props[i].visible=true;animateProps(i,state.phase.kind==='read'?state.p:0);
      if(i>0){leftSheet.visible=true;leftSheet.material=materialCache(i);}
    }else if(state.phase.kind==='opening'){
      props[0].visible=true;animateProps(0,0);
    }
    const surface=state.phase.kind==='turn'?underlays[state.phase.index+1]:['divider','pan','read'].includes(state.phase.kind)?underlays[state.phase.index]:state.phase.kind==='opening'?underlays[0]:pageBaseMap;
    if(readingMaterial.map!==surface){readingMaterial.map=surface||null;readingMaterial.needsUpdate=true;}
    const stackTop=reading.position.z-.5;
    deck.scale.z=(stackTop-stackBottom)/stackDepth;deck.position.z=(stackTop+stackBottom)/2;
    deckLeaves.forEach((leaf,i)=>{leaf.position.z=mix(stackBottom+.5,stackTop-.3,i/(deckLeaves.length-1));});
    if(gutter)gutter.position.z=reading.position.z+.08;
    applyFeedback();renderer.shadowMap.needsUpdate=!feedbackRendering&&!cakeRendering;renderer.render(scene,camera);
    film.dataset.renderer='webgl';film.dataset.phase=state.phase.kind;film.dataset.geometryVertices=String(curlGeometry.attributes.position.count);film.dataset.assetsReady=String(ready);
    film.dataset.drawCalls=String(renderer.info.render.calls);film.dataset.triangles=String(renderer.info.render.triangles);film.dataset.pixelScale=activeResolution.toFixed(2);
    film.dataset.renderFrame=String(++renderFrames);film.dataset.curlPose=[curlGeometry.attributes.position.getX(0),curlGeometry.attributes.position.getZ(0)].map(v=>v.toFixed(2)).join(',');
    const set=sets.get(state.phase.index);film.dataset.propPose=JSON.stringify(set?.type==='letter'?{fold:set.upper.rotation.x}:set?.type==='pocket'?{card:set.card.position.y,reveal:clamp((state.p-.5)/.35)}:set?.type==='fragments'?{cards:set.cards.length,tilt:set.cards[0]?.rotation.x}:{});
    film.dataset.birthdayCake=JSON.stringify(birthdayCakes.get(state.phase.index)?.state()||{});
    if(activating)canvas.hidden=false;
    film.dataset.fandomPose=JSON.stringify(fandomPose());
    if(activating)film.dispatchEvent(new Event('book-graphics-ready'));
  }
  function stopCakeAnimation(){cancelAnimationFrame(cakeFrame);cakeFrame=0;birthdayCakes.forEach(cake=>cake.finish());}
  function cakeTick(now){
    cakeFrame=0;if(disposed||lost||document.hidden||latest?.phase.kind!=='read'||!birthdayCakes.has(latest.phase.index)){stopCakeAnimation();return;}
    if(document.querySelector('dialog[open]')){stopCakeAnimation();lastPose='';update(latest);return;}
    lastPose='';cakeRendering=true;update(latest);cakeRendering=false;
    if(birthdayCakes.get(latest.phase.index)?.animating(now))cakeFrame=requestAnimationFrame(cakeTick);
  }
  function setBirthdayCandle(lit){
    candleLit=!!lit;birthdayCakes.forEach(cake=>cake.setLit(candleLit,!document.hidden));
    lastPose='';if(latest)update(latest);
    if(!cakeFrame&&!disposed&&!lost&&latest?.phase.kind==='read'&&birthdayCakes.has(latest.phase.index))cakeFrame=requestAnimationFrame(cakeTick);
  }
  function cakeVisibility(){if(document.hidden)stopCakeAnimation();else if(latest){lastPose='';update(latest);}}
  document.addEventListener('visibilitychange',cakeVisibility);
  let gutter=null;
  const memMaterials=new Map();function materialCache(i){if(!memMaterials.has(i))memMaterials.set(i,material('#ffffff',{map:backs[i]||null}));const mat=memMaterials.get(i);if(mat.map!==backs[i]){mat.map=backs[i]||null;mat.needsUpdate=true;}return mat;}
  const assetSrc={paper:'assets/materials/paper.webp',linen:'assets/materials/linen.webp',family:'assets/cutouts/five-cats.webp',map:window.SCRAPBOOK_TRIP.map,dividers:window.ScrapbookDividers.src,cake:pages.find(page=>page.print.querySelector('.cake-art'))?.print.querySelector('.cake-art')?.src,...(imageCover?{cover:originals[0].querySelector('.cover-collage-art').src}:{})};
  const assets=Promise.all(Object.entries(assetSrc).map(async([k,src])=>[k,await loadImage(src)])).then(async entries=>{
    if(disposed||lost)return;const images=Object.fromEntries(entries);if(!images.family||!images.map||!images.cake||!images.dividers||imageCover&&!images.cover)throw new Error('A scrapbook image is unavailable.');paperMap=images.paper;linenMap=images.linen;cakeImage=images.cake;
    const {c,ctx}=canvas2d();paintPaper(ctx);pageBaseMap=texture(c);paper.map=pageBaseMap;paper.needsUpdate=true;
    if(images.paper){const bump=sourceTexture(images.paper);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(W/440,H/440);paper.bumpMap=bump;paper.bumpScale=.18;paper.needsUpdate=true;readingMaterial.bumpMap=curlFront.bumpMap=curlBack.bumpMap=bump;readingMaterial.bumpScale=curlFront.bumpScale=curlBack.bumpScale=.18;readingMaterial.needsUpdate=curlFront.needsUpdate=curlBack.needsUpdate=true;}
    for(const [mat,vertical] of [[foreEdge,true],[capEdge,false]]){
      const strip=canvas2d(96,96);strip.ctx.fillStyle=palette.paper;strip.ctx.fillRect(0,0,96,96);
      for(let i=0;i<18;i++){const p=i*5.4;strip.ctx.globalAlpha=.35+(i%3)*.12;strip.ctx.fillStyle=palette['paper-edge'];if(vertical)strip.ctx.fillRect(p,0,.7,96);else strip.ctx.fillRect(0,p,96,.7);}
      mat.map=texture(strip.c);mat.roughness=1;mat.needsUpdate=true;
    }
    const shade=canvas2d(18,H),gradient=shade.ctx.createLinearGradient(0,0,18,0);gradient.addColorStop(0,'#301e2a26');gradient.addColorStop(1,'#301e2a00');shade.ctx.fillStyle=gradient;shade.ctx.fillRect(0,0,18,H);
    gutter=plane(18,H,material('#ffffff',{map:texture(shade.c),transparent:true,depthWrite:false}),root);gutter.position.set(9,0,4.08);gutter.castShadow=false;gutter.receiveShadow=false;
    const coverRaster=await raster(originals[0],true);if(disposed||lost)return;
    coverMap=coverRaster.map;
    coverRaster.anchors.fandom.forEach((b,i)=>fandomSticker(b,coverRaster.parts.fandom[i],cover,-1,'cover',4.8+i*.015));
    // The print sits above the board geometrically. A slope-dependent depth
    // bias would pull it over the raised label as the cover turns edge-on.
    coverMaterials[4]=material('#ffffff',{map:coverMap,roughness:.93});coverFace.material=coverMaterials[4];
    if(images.linen){const bump=sourceTexture(images.linen);bump.wrapS=bump.wrapT=THREE.RepeatWrapping;bump.repeat.set(W/350,H/350);if(!imageCover){coverMaterials[4].bumpMap=bump;coverMaterials[4].bumpScale=.5;coverMaterials[4].needsUpdate=true;}edge.bumpMap=bump;edge.bumpScale=.3;edge.needsUpdate=true;ribbonMat.bumpMap=bump;ribbonMat.bumpScale=.15;ribbonMat.needsUpdate=true;}
    if(coverRaster.relief){const bump=texture(coverRaster.relief);bump.colorSpace=THREE.NoColorSpace;coverMaterials[4].bumpMap=bump;coverMaterials[4].bumpScale=.8;coverMaterials[4].needsUpdate=true;}
    const patch=coverRaster.anchors['.cover-dedication'];
    if(patch){const sewn=new THREE.Group();cover.add(sewn);sewn.position.set(patch.x+patch.w/2,H/2-patch.y-patch.h/2,5.2);box(patch.w,patch.h,1.4,material(palette['paper-edge']),sewn);const print=plane(patch.w,patch.h,material('#ffffff',{map:coverRaster.parts.dedication,roughness:1,bumpMap:paper.bumpMap,bumpScale:.16}),sewn);print.position.z=.76;print.castShadow=false;print.receiveShadow=false;}
    pages.forEach((page,i)=>{const art=canvas2d();window.ScrapbookDividers.paint(art.ctx,images.dividers,chapters[page.chapter][0],W,H);backs[i]=texture(art.c);});
    coverMaterials[5].map=backs[0];coverMaterials[5].needsUpdate=true;
    for(let i=0;i<pages.length;i++){
      if(disposed||lost)return;
      const r=await raster(pages[i].print);if(disposed||lost)return;snapshots[i]=r.map;
      const copy=canvas2d();copy.ctx.drawImage(r.map.image,0,0,W,H);underlays[i]=texture(copy.c);
      const reverseMap=track((backs[i+1]||backs[i]).clone());reverseMaps[i]=reverseMap;
      setProps(i,r.anchors,r.parts);
      prepareAttachedTurn(i);
    }
    curlFront.map=underlays[0];curlBack.map=reverseMaps[0];readingMaterial.map=underlays[0];curlFront.needsUpdate=curlBack.needsUpdate=readingMaterial.needsUpdate=true;
    // Compilation alone leaves the shadow programs and unused page textures
    // cold. Upload and draw them behind the still-hidden canvas so the first
    // actual turn does not pay that work in its middle frames.
    resources.forEach(resource=>{if(resource.isTexture)renderer.initTexture(resource);});
    film.dataset.feedbackObjects=[...feedbackKeys.keys()].join(',');film.dataset.fandomStickers=JSON.stringify(fandomEntries.filter(entry=>entry.role!=='turn').map(({mesh,...entry})=>({...entry,vertices:mesh.geometry.attributes.position.count})));feedbackEntries.forEach(e=>e.ring.visible=true);
    props.forEach(g=>g.visible=true);turningProps.forEach(g=>g.visible=true);birthdayCakes.forEach(cake=>cake.warm(true));curl.visible=leftSheet.visible=true;leftSheet.material=materialCache(0);
    if(renderer.extensions.has('KHR_parallel_shader_compile'))await renderer.compileAsync(scene,camera);else renderer.compile(scene,camera);if(disposed||lost)return;
    renderer.shadowMap.needsUpdate=true;renderer.render(scene,camera);
    props.forEach(g=>g.visible=false);turningProps.forEach(g=>g.visible=false);birthdayCakes.forEach(cake=>cake.warm(false));curl.visible=leftSheet.visible=false;feedbackEntries.forEach(e=>e.ring.visible=false);
    ready=true;film.dataset.assetsReady='true';currentTurn=-1;lastPose='';if(latest)update(latest);
  }).catch(fallback);
  function fallback(){
    if(disposed||lost)return;
    clearReaderMasks();clearFeedback();stopCakeAnimation();lost=true;film.classList.remove('three-book');canvas.hidden=true;film.dataset.assetsReady='partial';film.dataset.renderer='css';
    pages.forEach(p=>p.print.querySelectorAll('.postcard-date,.letter-excerpt,.coupon-ink').forEach(d=>{d.style.opacity='';d.style.transform='';}));
    film.dispatchEvent(new Event('book-graphics-fallback'));
  }
  canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();fallback();});
  function captureFrame(){
    if(disposed||lost||!active||!ready)return null;
    clearDiscovery();
    try{
      // Copy synchronously after drawing: WebGL need not retain its buffer
      // between frames, and the old context is disposed during the rebuild.
      renderer.render(scene,camera);
      const frame=document.createElement('canvas'),rect=canvas.getBoundingClientRect();frame.width=canvas.width;frame.height=canvas.height;
      const context=frame.getContext('2d');context.fillStyle=palette.stage;context.fillRect(0,0,frame.width,frame.height);
      if(linenMap){context.save();context.scale(frame.width/screen.width,frame.height/stageHeight);const weave=context.createPattern(linenMap,'repeat');weave.setTransform(new DOMMatrix().scale(350/linenMap.width));context.fillStyle=weave;context.globalAlpha=.08;context.fillRect(0,0,screen.width,stageHeight);context.restore();}
      context.drawImage(canvas,0,0);frame.className='book-reflow-frame';frame.setAttribute('aria-hidden','true');
      Object.assign(frame.style,{left:rect.left+'px',top:rect.top+'px',width:rect.width+'px',height:rect.height+'px'});return frame;
    }catch{return null;}
  }
  function objectItems(key){
    const entries=(feedbackKeys.get(key)||[]).filter(e=>e.index===latest.phase.index);if(!entries.length)return [];
    const set=sets.get(latest.phase.index),card=key==='gift'&&set?.type==='pocket'?set.card:null;
    return card?[{object:card,w:card.userData.readerPrint.w,h:card.userData.readerPrint.h}]:entries.map(e=>({object:e.object,plane:e.ring,w:e.w,h:e.h}));
  }
  function projectQuad(node,w,h,z=.8){
    const r=canvas.getBoundingClientRect();
    return [[-w/2,h/2],[w/2,h/2],[w/2,-h/2],[-w/2,-h/2]].map(([x,y])=>{const p=node.localToWorld(new THREE.Vector3(x,y,z)).project(camera);return{x:r.left+(p.x+1)*r.width/2,y:r.top+(1-p.y)*r.height/2};});
  }
  function paintQuad(ctx,image,q){
    for(const [ids,axis]of[[[0,1,2],1],[[0,2,3],3]]){
      const a=q[0],b=q[1],c=q[2],d=q[3];ctx.save();ctx.beginPath();ids.forEach((i,j)=>j?ctx.lineTo(q[i].x,q[i].y):ctx.moveTo(q[i].x,q[i].y));ctx.closePath();ctx.clip();
      const u=axis===1?{x:b.x-a.x,y:b.y-a.y}:{x:c.x-d.x,y:c.y-d.y},v=axis===1?{x:c.x-b.x,y:c.y-b.y}:{x:d.x-a.x,y:d.y-a.y};
      ctx.transform(u.x/image.width,u.y/image.width,v.x/image.height,v.y/image.height,a.x,a.y);ctx.drawImage(image,0,0);ctx.restore();
    }
  }
  function objectBounds(items){
      scene.updateMatrixWorld(true);const r=canvas.getBoundingClientRect(),points=[];
      for(const item of items)for(const x of[-item.w/2,item.w/2])for(const y of[-item.h/2,item.h/2]){
        const point=(item.plane||item.object).localToWorld(new THREE.Vector3(x,y,.8)).project(camera);
        points.push({x:r.left+(point.x+1)*r.width/2,y:r.top+(1-point.y)*r.height/2});
      }
      const left=Math.min(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y));
      return {left,top,width:Math.max(...points.map(p=>p.x))-left,height:Math.max(...points.map(p=>p.y))-top};
  }
  function captureObject(key){
    if(disposed||lost||!active||!ready||latest?.phase.kind!=='read')return null;
    clearDiscovery();
    const items=objectItems(key);if(!items?.length)return null;
    let invalid=false;const getRect=()=>disposed||lost||invalid?null:objectBounds(items);
    try{
      const rect=getRect(),view=canvas.getBoundingClientRect();if(!Number.isFinite(rect.width)||rect.width<4||rect.height<4)return null;
      const front=document.createElement('canvas');front.width=Math.ceil(rect.width*resolution);front.height=Math.ceil(rect.height*resolution);
      const ctx=front.getContext('2d');ctx.scale(front.width/rect.width,front.height/rect.height);
      for(const item of items){
        const p=item.object.userData.readerPrint;if(!p?.image)return null;
        const crop=document.createElement('canvas');crop.width=Math.ceil(item.w*2);crop.height=Math.ceil(item.h*2);
        const x=p.w/2+(item.plane?.position.x||0)-item.w/2,y=p.h/2-(item.plane?.position.y||0)-item.h/2;
        crop.getContext('2d').drawImage(p.image,x*p.image.width/p.w,y*p.image.height/p.h,item.w*p.image.width/p.w,item.h*p.image.height/p.h,0,0,crop.width,crop.height);
        paintQuad(ctx,crop,projectQuad(item.plane||item.object,item.w,item.h).map(p=>({x:p.x-rect.left,y:p.y-rect.top})));
      }
      const footprints=items.map(item=>{const p=item.object.userData.readerPrint;return projectQuad(item.object.userData.readerContent||item.object,p.w+12,p.h+12);});
      const points=footprints.flat(),left=Math.min(...points.map(p=>p.x)),top=Math.min(...points.map(p=>p.y)),width=Math.max(...points.map(p=>p.x))-left,height=Math.max(...points.map(p=>p.y))-top;
      const mask=document.createElement('canvas');mask.width=Math.ceil(width*resolution);mask.height=Math.ceil(height*resolution);mask.setAttribute('aria-hidden','true');mask.inert=true;
      Object.assign(mask.style,{position:'fixed',left:left+'px',top:top+'px',width:width+'px',height:height+'px',pointerEvents:'none',zIndex:'20'});mask.className='reader-source-mask';
      const pageQuad=projectQuad(reading,W,H,.05),pageImage=underlays[latest.phase.index].image;
      const layers=[];props[latest.phase.index].traverse(node=>{if(node.userData.readerPrint){const position=new THREE.Vector3();node.getWorldPosition(position);layers.push({node,depth:position.z});}});layers.sort((a,b)=>a.depth-b.depth);
      function drawMask(restored=false){
        const c=mask.getContext('2d');c.setTransform(1,0,0,1,0,0);c.clearRect(0,0,mask.width,mask.height);c.scale(mask.width/width,mask.height/height);c.translate(-left,-top);c.save();c.beginPath();
        footprints.forEach(q=>{q.forEach((p,i)=>i?c.lineTo(p.x,p.y):c.moveTo(p.x,p.y));c.closePath();});c.clip();paintQuad(c,pageImage,pageQuad);
        scene.updateMatrixWorld(true);layers.forEach(({node})=>{if(!restored&&items.some(item=>item.object===node))return;const p=node.userData.readerPrint;paintQuad(c,p.image,projectQuad(node.userData.readerContent||node,p.w,p.h));});c.restore();
      }
      let clip=null,extraction=null;const pocket=key==='gift'?sets.get(latest.phase.index):null;
      if(pocket?.front){
        const p=pocket.front.userData.readerPrint,q=projectQuad(pocket.front,p.w,p.h),mid={x:(q[0].x+q[1].x)/2,y:(q[0].y+q[1].y)/2+(q[3].y-q[0].y)*.14};
        const heightAt=x=>{const a=x<mid.x?q[0]:mid,b=x<mid.x?mid:q[1];return a.y+(b.y-a.y)*(x-a.x)/(b.x-a.x);};
        const percent=y=>clamp((y-rect.top)/rect.height)*100,cx=clamp((mid.x-rect.left)/rect.width)*100;
        clip={closed:`polygon(0 0,100% 0,100% ${percent(heightAt(rect.left+rect.width))}%,${cx}% ${percent(mid.y)}%,0 ${percent(heightAt(rect.left))}%)`,open:`polygon(0 0,100% 0,100% 100%,${cx}% 100%,0 100%)`};
        extraction={x:0,y:Math.min(q[0].y,q[1].y)-rect.top-rect.height-8};
      }
      let hidden=false;
      return {rect,front,getRect,clip,extraction,invalidate(){invalid=true;clearReaderMasks();lastPose='';if(!disposed&&!lost&&latest)update(latest);},conceal(){if(hidden)return;hidden=true;readerHolding=true;clearFeedback();drawMask();readerMasks.add(mask);document.body.append(mask);film.dataset.readerObject=key;},restore(){if(!hidden)return;hidden=false;readerHolding=false;film.dataset.readerObject='';if(document.hidden||disposed||lost||invalid||!mask.isConnected){dropReaderMask(mask);return;}drawMask(true);requestAnimationFrame(()=>{lastPose='';if(!disposed&&!lost&&latest)update(latest);requestAnimationFrame(()=>dropReaderMask(mask));});}};
    }catch{return null;}
  }
  return {update,assets,captureFrame,captureObject,setObjectFeedback,setDiscovery,setBirthdayCandle,destroy(){clearDiscovery();clearReaderMasks();clearFeedback();stopCakeAnimation();document.removeEventListener('visibilitychange',cakeVisibility);disposed=true;canvas.remove();film.classList.remove('three-book');resources.forEach(r=>r.dispose?.());renderer.dispose();renderer.forceContextLoss();}};
};

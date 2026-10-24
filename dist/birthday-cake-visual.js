// A printed paper front, two folding supports and one short candle transient.
export function createBirthdayCakeVisual({THREE,parent,anchors,pageHeight,material,mesh,plane,track,texture,canvas2d,palette,image,lit,captionText}){
  const b=anchors['.birthday-cake'],popup=anchors['.cake-popup'],picture=anchors['.cake-art'],caption=anchors['.cake-caption'],candleBox=anchors['.cake-candle'];
  const hinge=new THREE.Group();parent.add(hinge);hinge.position.set(popup.x+popup.w/2,pageHeight/2-popup.y-popup.h,1.2);
  const face=new THREE.Group();hinge.add(face);
  const mask=track(new THREE.Texture(image));mask.colorSpace=THREE.SRGBColorSpace;mask.needsUpdate=true;mask.anisotropy=4;
  const imageY=pageHeight/2-picture.y-picture.h/2-hinge.position.y;
  const front=plane(picture.w,picture.h,material('#ffffff',{map:mask,transparent:true,alphaTest:.12,side:THREE.DoubleSide,roughness:1,bumpMap:null}),face);
  front.position.set(picture.x+picture.w/2-hinge.position.x,imageY,.65);front.receiveShadow=true;

  const candleY=pageHeight/2-candleBox.y-candleBox.h/2-hinge.position.y;
  const candleX=candleBox.x+candleBox.w/2-hinge.position.x;
  const stripe=canvas2d(18,66);stripe.ctx.fillStyle=palette.paper;stripe.ctx.fillRect(0,0,18,66);stripe.ctx.strokeStyle=palette.linen;stripe.ctx.lineWidth=5;
  for(let y=-20;y<100;y+=13){stripe.ctx.beginPath();stripe.ctx.moveTo(-4,y+12);stripe.ctx.lineTo(23,y);stripe.ctx.stroke();}
  stripe.ctx.strokeStyle=palette.rose;stripe.ctx.lineWidth=1;stripe.ctx.strokeRect(.5,.5,17,65);
  const candle=plane(candleBox.w,candleBox.h,material('#ffffff',{map:texture(stripe.c),roughness:1,side:THREE.DoubleSide}),face);candle.position.set(candleX,candleY,1);
  const wick=plane(1,4,material(palette['scene-ink'],{side:THREE.DoubleSide}),face);wick.position.set(candleX,candleY+candleBox.h/2+2,1.05);wick.castShadow=false;
  const flame=new THREE.Group();face.add(flame);flame.position.set(candleX,candleY+candleBox.h/2+3.5,1.15);
  const shape=new THREE.Shape();shape.moveTo(0,0);shape.bezierCurveTo(-6,2,-4,9,2,13);shape.bezierCurveTo(1,8,7,3,2,0);shape.closePath();
  const flameMaterial=track(new THREE.MeshBasicMaterial({color:'#e7a34e',side:THREE.DoubleSide,toneMapped:false}));
  const outer=mesh(new THREE.ShapeGeometry(shape,12),flameMaterial,flame);outer.castShadow=outer.receiveShadow=false;outer.userData.cakeTransient=true;
  const core=mesh(new THREE.ShapeGeometry(shape,10),track(new THREE.MeshBasicMaterial({color:'#fff4c9',side:THREE.DoubleSide,toneMapped:false})),flame);core.scale.set(.48,.56,1);core.position.set(.2,.6,.08);core.castShadow=core.receiveShadow=false;core.userData.cakeTransient=true;

  const supports=[];
  for(const x of [-82,82]){
    const geometry=new THREE.BufferGeometry();geometry.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(36),3));
    const stand=mesh(geometry,material(palette.lining,{side:THREE.DoubleSide}),hinge);stand.position.x=x;supports.push(stand);
    const foot=plane(22,12,material(palette.paper,{side:THREE.DoubleSide}),hinge);foot.position.set(x,5,.05);foot.castShadow=false;
  }
  const label=canvas2d(caption.w,caption.h),labelMap=texture(label.c);
  const captionPlane=plane(caption.w,caption.h,material('#ffffff',{map:labelMap,transparent:true,depthWrite:false,roughness:1}),parent);
  captionPlane.position.set(caption.x+caption.w/2,pageHeight/2-caption.y-caption.h/2,.65);captionPlane.castShadow=captionPlane.receiveShadow=false;
  const smoke=[];
  for(let i=0;i<2;i++){
    const geometry=track(new THREE.BufferGeometry());geometry.setAttribute('position',new THREE.Float32BufferAttribute(new Float32Array(39),3));
    const lineMaterial=track(new THREE.LineBasicMaterial({color:palette['scene-ink'],transparent:true,opacity:0,depthWrite:false}));
    const line=new THREE.Line(geometry,lineMaterial);line.visible=false;face.add(line);smoke.push(line);
  }
  let candleLit=lit,labelText=captionText||(lit?'Tap the candle':'Make a wish.'),changedAt=-Infinity,motion=false,openAmount=0;
  function printCaption(){
    label.ctx.clearRect(0,0,caption.w,caption.h);label.ctx.font='400 13px "Source Sans 3"';label.ctx.textAlign='center';label.ctx.textBaseline='middle';label.ctx.fillStyle=palette['scene-ink'];label.ctx.fillText(labelText,caption.w/2,caption.h/2);labelMap.needsUpdate=true;
  }
  function setLit(value,animate=true){
    if(candleLit===value)return;
    candleLit=value;labelText=candleLit?'Tap the candle':'Make a wish.';changedAt=performance.now();motion=animate;printCaption();
  }
  function pose(open,now=performance.now()){
    openAmount=open;const angle=THREE.MathUtils.degToRad(28)*open;face.rotation.x=angle;
    supports.forEach(stand=>{
      const a=[0,62*Math.cos(angle),62*Math.sin(angle)],c=[0,7,0],mid=[0,(a[1]+c[1])/2,(a[2]+c[2])/2+10*open],v=stand.geometry.attributes.position;
      const vertices=[];
      for(const [start,end]of[[a,mid],[mid,c]])for(const point of [[-9,start[1],start[2]],[9,start[1],start[2]],[-9,end[1],end[2]],[9,start[1],start[2]],[9,end[1],end[2]],[-9,end[1],end[2]]])vertices.push(...point);
      v.array.set(vertices);v.needsUpdate=true;stand.geometry.computeVertexNormals();stand.visible=open>.01;
    });
    const elapsed=motion?Math.max(0,now-changedAt):Infinity,t=Math.min(1,elapsed/160),smooth=t*t*(3-2*t),strength=candleLit?(motion?smooth:1):(motion?1-smooth:0);
    flame.visible=strength>.005;flame.scale.set(.7+.3*strength,strength,1);
    smoke.forEach((line,i)=>{
      const life=(elapsed-i*90)/1000;line.visible=motion&&!candleLit&&life>0&&life<1.05;
      if(!line.visible)return;
      line.material.opacity=.3*Math.sin(Math.PI*Math.min(1,life/1.05));const positions=line.geometry.attributes.position;
      for(let n=0;n<13;n++){const p=n/12;positions.setXYZ(n,candleX+Math.sin(p*Math.PI*1.7+i)*2.3+life*7,candleY+candleBox.h/2+3+life*11+p*16,1.4);}
      positions.needsUpdate=true;
    });
    if(elapsed>1200)motion=false;
  }
  function finish(){if(!motion)return;motion=false;pose(openAmount);}
  printCaption();pose(0);
  return {group:hinge,face,mask,imageY,imageWidth:picture.w,imageHeight:picture.h,setLit,pose,finish,warm(enabled){if(enabled){flame.visible=true;smoke.forEach(line=>{line.visible=true;line.material.opacity=.3;});supports.forEach(stand=>stand.visible=true);}else pose(openAmount);},animating:now=>motion&&now-changedAt<(candleLit?180:1200),state:()=>({open:openAmount,angle:face.rotation.x,lit:candleLit,flame:flame.visible,smoke:smoke.filter(line=>line.visible).length})};
}

(() => {
  'use strict';
  const width=1774,height=887,source='assets/cutouts/favorites-stickers.png';
  const collection=[
    {key:'ferrari',name:'Ferrari',frame:[0,50,480,340],angle:-7,page:'cover'},
    {key:'hamilton',name:'Lewis Hamilton',frame:[475,55,435,360],angle:7,page:'dedication'},
    {key:'russell',name:'George Russell',frame:[919,55,407,365],angle:-8,page:'your-world'},
    {key:'taylor',name:'Taylor Swift',frame:[1360,0,408,455],angle:8,page:'october'},
    {key:'rodrigo',name:'Olivia Rodrigo',frame:[45,455,365,410],angle:-10,page:'birthday'},
    {key:'dean',name:'Olivia Dean',frame:[505,450,360,415],angle:-7,page:'gift'},
    {key:'spiro',name:'Sienna Spiro',frame:[920,450,390,417],angle:8,page:'gift'}
  ];
  function layer(page){
    const items=collection.filter(item=>item.page===page);if(!items.length)return '';
    return `<div class="fandom-layer" data-sticker-page="${page}">${items.map(item=>{
      const [x,y,w,h]=item.frame;
      return `<figure class="fandom-sticker" data-fandom-sticker="${item.key}" data-sticker-angle="${item.angle}" style="--fan-angle:${item.angle}deg" role="img" aria-label="${item.name} illustrated fan sticker"><span class="fandom-portrait" aria-hidden="true"><span class="fandom-frame" data-sticker-frame="${item.frame.join(',')}" style="--fan-ratio:${w/h};--fan-image-w:${width/w*100}%;--fan-image-h:${height/h*100}%;--fan-image-x:${-x/w*100}%;--fan-image-y:${-y/h*100}%"><img src="${source}" alt="" width="${width}" height="${height}" decoding="async"></span></span></figure>`;
    }).join('')}</div>`;
  }
  window.ScrapbookStickers={layer,collection,source,width,height};
})();

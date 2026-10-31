(() => {
  'use strict';
  const DEFAULT='Happy 25th, Tasya!\nWe love you!';
  const resolve=value=>typeof value==='string'&&value.trim()?value.replace(/\r\n?/g,'\n').trim():DEFAULT;
  function assert(value){
    const text=resolve(value);if(text.length>60)throw new Error('Keep the cats’ greeting to 60 characters or fewer.');
    const measure=document.createElement('div');measure.style.cssText='position:fixed;left:-10000px;top:0;width:211px;margin:0;padding:0;border:0;box-sizing:content-box;font:400 16px/20px "Source Sans 3";white-space:pre-wrap;overflow-wrap:anywhere;visibility:hidden;pointer-events:none';measure.textContent=text;document.body.append(measure);
    const height=measure.getBoundingClientRect().height;measure.remove();if(height>40.5)throw new Error('Keep the cats’ greeting to two short lines so it fits on the page.');return text;
  }
  function path(width=235,height=52){
    const x=n=>n/235*width,y=n=>n/52*height;
    return `M${x(11)},${y(1)} H${x(224)} Q${x(234)},${y(1)} ${x(234)},${y(11)} V${y(33)} Q${x(234)},${y(43)} ${x(224)},${y(43)} H${x(132)} L${x(119)},${y(51)} L${x(121.5)},${y(43)} H${x(11)} Q${x(1)},${y(43)} ${x(1)},${y(33)} V${y(11)} Q${x(1)},${y(1)} ${x(11)},${y(1)} Z`;
  }
  window.ScrapbookCatGreeting={DEFAULT,resolve,assert,path};
})();

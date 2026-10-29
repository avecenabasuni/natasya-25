(() => {
  'use strict';
  const clamp = (n, a = 0, b = 1) => Math.min(b, Math.max(a, n));
  const mix = (a, b, p) => a + (b - a) * p;
  const smooth = p => p * p * (3 - 2 * p);
  const el = (name, cls) => {const node = document.createElement(name);node.className = cls;return node;};

  function viewportSize() {
    // Safari's visible area changes with its toolbars. Fit that area instead
    // of keeping a smaller svh-sized canvas after the toolbars collapse.
    const measure = document.createElement('div');
    measure.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100vh;visibility:hidden;pointer-events:none';
    if(CSS.supports('height','100dvh'))measure.style.height='100dvh';
    document.body.append(measure);
    const layoutHeight = Math.round(measure.getBoundingClientRect().height);measure.remove();
    const visual = window.visualViewport, unzoomed = !visual || Math.abs(visual.scale-1)<.02;
    const height = Math.round(unzoomed&&visual&&visual.height>0 ? visual.height : layoutHeight);
    const inset = unzoomed&&visual ? Math.max(0,document.documentElement.clientHeight-visual.height-visual.offsetTop) : 0;
    document.documentElement.style.setProperty('--visual-bottom-inset',Math.round(inset)+'px');
    return {width:document.documentElement.clientWidth,height,inset};
  }

  // Native pages retain reading semantics, focus and touch targets. The
  // prepared scene owns visible print; the CSS fallback uses the same HTML.
  function copy(node, decorative = false) {
    const clone = node.cloneNode(true), from = [node, ...node.querySelectorAll('*')], to = [clone, ...clone.querySelectorAll('*')];
    to.forEach((n, i) => {
      if (decorative) {
        n.classList.remove('object-hovered','object-pressed','object-focused');
        n.removeAttribute('id');n.removeAttribute('aria-labelledby');
        for (const a of [...n.attributes]) if(a.name.startsWith('data-'))n.removeAttribute(a.name);
        if(n.matches('button,input,textarea,select'))n.disabled = true;
        if(n.matches('a,button,input,textarea,select,[tabindex]'))n.tabIndex = -1;
      } else if (from[i].onclick) n.onclick = from[i].onclick;
      if(n.tagName === 'IMG') {
        n.loading = 'eager';
        if(n.decode)n.decode().catch(()=>{});
        if(!decorative)n.addEventListener('error', () => {
          if(n.matches('.cake-art')){n.hidden=true;n.parentElement.querySelector('.cake-art-error').hidden=false;return;}
          if(!n.closest('.photo-open,.real-memory,.fragment-image'))return;
          n.hidden = true;
          if(!n.parentElement.querySelector('.image-error'))n.parentElement.insertAdjacentHTML('beforeend','<span class="image-error">This photo could not be loaded.</span>');
        }, {once:true});
      }
    });
    clone.querySelectorAll('.native-object-glint').forEach(n=>n.remove());
    [clone,...clone.querySelectorAll('.object-glint-host,.object-glint-pulse')].forEach(n=>n.classList.remove('object-glint-host','object-glint-pulse'));
    if(decorative){clone.inert = true;clone.setAttribute('aria-hidden','true');}
    return clone;
  }

  window.BookExperience = {
    viewportSize,
    create({app, chapters, setActive, isGiftUnlocked=()=>true}) {
      let disposed = false, current = -2, currentSide = null, cachedTurn = -1, timeline, phaseCursor = 0,turningPage=-1,scrollTween=null,navigationLabel=null,modalTime=null;
      let paperPhase=null,paperTime=null,paperSilenced=false;
      let userSettle=false,touchHeld=false,releaseDelay=null,navigationIntent=null,resumeIntent=null;
      const screen = viewportSize(), mobile = screen.width < 960;
      if(screen.height<500)return null;
      const header = Math.round(document.querySelector('.site-header').getBoundingClientRect().height);
      const navigation = document.querySelector('.book-navigation');
      const bottomReserve = Math.ceil(navigation.getBoundingClientRect().height + Math.max(10,(parseFloat(getComputedStyle(navigation).bottom)||10)-screen.inset) + 18);
      const stageHeight = screen.height - header;
      const width = mobile ? Math.min(screen.width - 40, 430) : Math.min(452, (screen.width - 120) / 2,(stageHeight-bottomReserve-30)/1.4);
      // The paper keeps its proportions when Safari's toolbars change height.
      // Available space changes the camera scale, not the shape of the book.
      const height = Math.round(width*1.4);
      const readingScale=Math.min(mobile?1:.96,(stageHeight-bottomReserve-24)/height);
      const originals = chapters.map(([id]) => document.getElementById(id));
      const sources = originals.slice(1).map(s => ({section:s, article:s.querySelector('.sheet'), divider:s.querySelector('.page-seat > .chapter-divider')}));
      const film = el('div','book-film'), viewport = el('div','book-viewport'), camera = el('div','camera-rig'), book = el('div','album-object');
      app.classList.add('has-book-film');film.classList.toggle('compact-book',height<440);
      film.style.setProperty('--leaf-w',width+'px');film.style.setProperty('--leaf-h',height+'px');film.style.setProperty('--header-h',header+'px');
      film.style.setProperty('--stage-h',stageHeight+'px');film.style.setProperty('--bottom-reserve',bottomReserve+'px');
      viewport.append(camera);camera.append(book);film.append(viewport);app.prepend(film);
      const replayAction=originals.at(-1).querySelector('.replay-link'),replayActionHome=replayAction?.parentElement;
      if(replayAction){replayAction.classList.add('cover-replay-action');replayAction.hidden=true;viewport.append(replayAction);}
      const restoreReplay=()=>{app.classList.remove('at-book-end');if(replayAction){replayAction.classList.remove('cover-replay-action');replayAction.hidden=false;replayActionHome.append(replayAction);}};
      const ground = el('div','book-ground');viewport.prepend(ground);
      const leftBase = el('div','book-board left-board'), rightBase = el('div','book-board right-board');
      const edges = el('div','paper-edges'), left = el('div','left-leaf'), right = el('div','right-deck'), binding = el('div','book-binding');
      const turning = el('div','curl-leaf'), turnShadow = el('div','turn-shadow');
      [leftBase,rightBase,edges,left,right,binding,turnShadow,turning].forEach(n=>book.append(n));
      [ground,leftBase,rightBase,edges,left,binding,turnShadow,turning].forEach(n=>{n.setAttribute('aria-hidden','true');n.inert=true;});
      const board = el('div','front-board'), boardBack = el('div','cover-back');
      boardBack.innerHTML = '<div class="inside-lining"></div>';
      boardBack.setAttribute('aria-hidden','true');boardBack.inert = true;board.append(originals[0],boardBack);book.append(board);
      const cue = el('p','book-scroll-cue');cue.textContent = 'Scroll gently to open the book.';viewport.append(cue);

      const pages = [];
      function group(node, items) {
        const wrapper = node.cloneNode(false);wrapper.removeAttribute('id');wrapper.classList.add('print-group');items.forEach(n=>wrapper.append(n));return wrapper;
      }
      function blocks(container) {
        const result = [];
        [...container.children].forEach(node => {
          if(node.matches('.vellum-insert'))return;
          if(node.matches('.dedication-layout,.dedication-copy,.soundtrack-spread,.distance-layout'))result.push(...blocks(node));
          else if(node.matches('.prose'))[...node.children].forEach(p=>result.push(group(node,[p])));
          else if(node.matches('.detail-collage,.memory-collage,.more-memories,.accordion-book')) {
            const children = [...node.children];for(let i=0;i<children.length;i+=2)result.push(group(node,children.slice(i,i+2)));
          } else if(node.matches('.music-notes,.wish-folds'))[...node.children].forEach(n=>result.push(group(node,[n])));
          else if(node.matches('.photo-fragments'))result.push(node);
          else if(node.matches('.recap-days'))[...node.children].forEach(n=>result.push(group(node,[n])));
          else if(node.matches('.favourites-collage')) {
            const children=[...node.children];result.push(group(node,children.slice(0,2)));result.push(group(node,children.slice(2)));
          } else result.push(node);
        });
        return result;
      }
      try { sources.forEach(({section,article}, chapter) => {
        const seat = section.querySelector('.page-seat'), master = copy(article), queue = blocks(master.querySelector('.page-content'));
        article.remove();right.append(section);section.classList.add('film-chapter');
        let print, body,firstPrint=true;
        const startPage = () => {
          print = el('article','sheet book-print');body = el('div','page-content');
          print.append(body);
          const stickers=master.querySelector(':scope > .fandom-layer');
          if(stickers){
            const layer=copy(stickers);
            if(!firstPrint){
              layer.dataset.stickerVariant='continuation';
              layer.querySelectorAll('.fandom-sticker:not([data-sticker-rail])').forEach(node=>node.remove());
              layer.querySelectorAll('[data-fandom-sticker]').forEach(node=>{node.dataset.fandomSticker+='-continued-'+pages.length;});
            }
            if(layer.childElementCount)print.append(layer);
          }
          firstPrint=false;
          seat.append(print);
          pages.push({print,body,section,chapter:chapter+1});return print;
        };
        const fits = () => body.scrollHeight <= body.clientHeight + 1;
        startPage();
        while(queue.length) {
          const block = queue.shift();body.append(block);
          if(fits())continue;
          block.remove();
          if(body.childElementCount) {startPage();queue.unshift(block);continue;}
          if(block.classList.contains('print-group') && block.children.length > 1) {
            queue.unshift(...[...block.children].map(n=>group(block,[n])));continue;
          }
          body.append(block);
          const prose = block.querySelector('.prose');
          if(prose?.children.length > 1) {
            block.remove();
            const paragraphs = [...prose.children];
            queue.unshift(...paragraphs.map((paragraph,i)=>{
              const piece=copy(block);piece.querySelector('.prose').replaceChildren(copy(paragraph));
              if(i<paragraphs.length-1)piece.querySelector('.postcard-signature')?.remove();
              return piece;
            }));
            continue;
          }
          const candidates = block.matches('p,h2') ? [block] : [...block.querySelectorAll('p')];
          const target = candidates.sort((a,b)=>b.textContent.length-a.textContent.length)[0];
          if(target && target.textContent.length > 80) {
            const readText=n=>n.nodeType===Node.TEXT_NODE?n.nodeValue:n.nodeName==='BR'?'\n':[...n.childNodes].map(readText).join('');
            const text = readText(target), rest = copy(block), restTarget = target===block ? rest : [...rest.querySelectorAll('p')][[...block.querySelectorAll('p')].indexOf(target)];
            target.style.whiteSpace='pre-line';restTarget.style.whiteSpace='pre-line';
            let lo=1,hi=text.length;
            while(lo<hi){const mid=Math.ceil((lo+hi)/2);target.textContent=text.slice(0,mid);if(fits())lo=mid;else hi=mid-1;}
            let cut=lo;const space=text.lastIndexOf(' ',cut);if(space>cut*.7)cut=space+1;
            if(cut < 2)throw new Error('The printed block does not fit a leaf.');
            target.textContent=text.slice(0,cut);restTarget.textContent=text.slice(cut);
            rest.removeAttribute('id');rest.querySelectorAll('[id]').forEach(n=>n.removeAttribute('id'));
            queue.unshift(rest);startPage();
          } else {
            throw new Error(`Printed insert exceeds leaf: ${section.id}, ${block.className}, ${body.scrollHeight}/${body.clientHeight}.`);
          }
        }
        if(!body.childElementCount){print.remove();pages.pop();}
      }); } catch(error) {
        sources.forEach(({section,article,divider})=>{section.querySelector('.page-seat').replaceChildren(...(divider?[divider,article]:[article]));section.classList.remove('film-chapter');});
        originals.forEach(s=>app.append(s));restoreReplay();app.append(document.querySelector('.book-navigation'));film.remove();app.classList.remove('has-book-film');
        console.warn(error.message);return null;
      }
      if(pages[0]&&window.ScrapbookDividers)boardBack.replaceChildren(window.ScrapbookDividers.create(chapters[pages[0].chapter][0]));
      const total = pages.length+1;
      pages.forEach((page,i)=>{
        const siblings=pages.filter(p=>p.chapter===page.chapter);page.part=siblings.indexOf(page)+1;page.parts=siblings.length;
        window.ScrapbookStickers?.fit(page.print);
        page.print.inert=true;page.print.style.visibility='hidden';page.print.style.display='none';page.print.setAttribute('aria-hidden','true');
        page.section.inert=true;page.section.setAttribute('aria-hidden','true');
      });
      const coverAction=originals[0].querySelector('.open-book'),coverActionHome=coverAction?.parentElement;
      if(coverAction){coverAction.classList.add('cover-open-action');viewport.append(coverAction);cue.hidden=true;}
      let visual=null;
      try{visual=window.createThreeBookVisual?.({film,viewport,width,height,screen,stageHeight,bottomReserve,pages,chapters,originals})||null;}catch{visual=null;}
      const webgl=()=>film.classList.contains('three-book');
      const mementos = new Map();
      function memento(index) {
        const page=pages[Math.max(0,Math.min(pages.length-1,index))];
        if(mementos.has(index))return mementos.get(index);
        const chapter=chapters[page.chapter],panel=window.ScrapbookDividers?.create(chapter[0])||el('div','chapter-divider');
        if(!panel.childElementCount){const title=el('h3','');title.textContent=chapter[1];title.tabIndex=-1;panel.append(title);}
        mementos.set(index,panel);return panel;
      }
      let leftIndex = -2;
      function setLeft(index) {
        if(index<0){left.style.opacity='0';return;}
        left.style.opacity='1';if(leftIndex===index)return;
        leftIndex=index;left.replaceChildren(memento(index));
      }
      function show(index, turn = false, side = 'right', stable = true) {
        const changed=current!==index||currentSide!==side;
        if(current!==index){
          const previous=pages[current];
          if(previous){previous.print.inert=true;previous.print.style.visibility='hidden';previous.print.style.display='none';previous.print.setAttribute('aria-hidden','true');previous.section.inert=true;previous.section.setAttribute('aria-hidden','true');}
          current=index;
        }
        const page=pages[index],rightReadable=!!page&&!turn&&stable&&side==='right',leftReadable=!!page&&!turn&&stable&&side==='left';
        if(page){
          page.section.style.visibility='visible';page.print.style.visibility='visible';
          page.print.inert=!rightReadable;page.print.setAttribute('aria-hidden',String(!rightReadable));
          page.section.inert=!rightReadable;page.section.setAttribute('aria-hidden',String(!rightReadable));
          page.print.style.display=turn?'none':'block';
        }
        left.inert=!leftReadable;left.setAttribute('aria-hidden',String(!leftReadable));
        originals[0].inert=index!==-1;originals[0].setAttribute('aria-hidden',String(index!==-1));
        currentSide=side;
        if(changed)setActive(page?.chapter||0,{page:index+2,total,part:page?.part||1,parts:page?.parts||1,side,last:rightReadable&&index===pages.length-1,giftLocked:rightReadable&&!!page?.print.querySelector('.birthday-cake')&&!isGiftUnlocked()});
        right.classList.toggle('is-turning',turn);
      }
      const strips=[];
      function ensureCSS(){
        if(strips.length)return;
        const strip=el('div','page-strip'),front=el('div','strip-face strip-front'),back=el('div','strip-face strip-back'),shade=el('div','strip-shade');
        strip.style.width=width+'px';strip.append(front,back,shade);turning.append(strip);strips.push({strip,front,back,shade});
      }
      if(!webgl())ensureCSS();
      function prepareTurn(index) {
        ensureCSS();
        if(cachedTurn===index)return;cachedTurn=index;
        turning.className='curl-leaf '+[...pages[index].section.classList].filter(c=>!['album-chapter','film-chapter'].includes(c)).join(' ');
        const back=memento(index+1);
        strips.forEach(({front,back:reverse},i)=>{
          const frontPrint=copy(pages[index].print,true), backPrint=copy(back,true);
          frontPrint.style.visibility='visible';frontPrint.style.display='block';frontPrint.style.transform='none';
          backPrint.style.transform='none';
          front.replaceChildren(frontPrint);reverse.replaceChildren(backPrint);
        });
      }
      function curl(progress) {
        const wave=Math.sin(Math.PI*progress)**2,angle=Math.PI*smooth(progress);
        strips.forEach(({strip,front,back,shade},i)=>{
          // WebKit can paint transformed grandchildren through a hidden back
          // face. Explicit face opacity keeps the printed side unambiguous.
          front.style.opacity=angle<Math.PI/2?'1':'0';back.style.opacity=angle>=Math.PI/2?'1':'0';
          strip.style.transform=`translateZ(5px) rotateY(${-angle*180/Math.PI}deg)`;
          shade.style.opacity=String(angle<Math.PI/2?wave*.1:0);
        });
        turnShadow.style.opacity=String(wave*.28);turnShadow.style.transform=`scaleX(${.45+.55*wave})`;
      }
      const phases=[],labels={cover:0}, opening=1150;
      phases.push({kind:'cover',start:0,end:160},{kind:'opening',start:160,end:opening});
      let distance=opening;
      pages.forEach((page,index)=>{
        if(labels[chapters[page.chapter][0]]===undefined)labels[chapters[page.chapter][0]]=distance+16;
        labels['divider-'+index]=distance+16;
        phases.push({kind:'divider',index,start:distance,end:distance+220});distance+=220;
        phases.push({kind:'pan',index,start:distance,end:distance+380});distance+=380;
        labels['leaf-'+index]=distance+16;
        const read=clamp(page.body.textContent.length*.22,390,760);
        phases.push({kind:'read',index,start:distance,end:distance+read});distance+=read;
        if(index<pages.length-1){const span=clamp(height*1.18,560,800);phases.push({kind:'turn',index,start:distance,end:distance+span});distance+=span;}
      });
      phases[phases.length-1].end+=250;distance+=250;
      const giftPhase=phases.find(p=>p.kind==='read'&&pages[p.index].print.querySelector('.pocket-gift'));
      if(giftPhase)labels['gift-open']=giftPhase.start+(giftPhase.end-giftPhase.start)*.9;
      const candlePhase=phases.find(p=>p.kind==='read'&&pages[p.index].print.querySelector('.birthday-cake'));
      // Hold the upright cake before its outgoing fold until the wish is made.
      const candleStop=candlePhase?candlePhase.start+(candlePhase.end-candlePhase.start)*.65:distance;
      const readingLimit=()=>isGiftUnlocked()?distance:candleStop;
      let clampingCandle=false;
      const playhead={time:0};
      function render() {
        if(disposed)return;
        const time=modalTime??playhead.time;
        if(time>readingLimit()+.001){
          if(clampingCandle)return;
          clampingCandle=true;cancelNavigation();
          const trigger=timeline.scrollTrigger,limit=readingLimit();
          window.scrollTo({top:trigger.start+limit/distance*(trigger.end-trigger.start),behavior:'instant'});
          ScrollTrigger.update();trigger.getTween()?.progress(1);timeline.time(limit,false);
          clampingCandle=false;render();return;
        }
        film.dataset.giftLocked=String(!isGiftUnlocked());
        while(phaseCursor<phases.length-1 && time>=phases[phaseCursor].end)phaseCursor++;
        while(phaseCursor>0 && time<phases[phaseCursor].start)phaseCursor--;
        const phase=phases[phaseCursor],p=clamp((time-phase.start)/(phase.end-phase.start));
        if(paperPhase!==phase&&paperTime!==null&&Math.abs(time-paperTime)>.01&&!paperSilenced&&modalTime===null&&!ScrollTrigger.isRefreshing){
          const physical=['opening','turn'].includes(phase.kind)?phase:phases.find(item=>['opening','turn'].includes(item.kind)&&Math.min(time,paperTime)<=item.start&&Math.max(time,paperTime)>=item.end);
          if(physical)document.dispatchEvent(new CustomEvent('scrapbook-paper',{detail:{kind:physical.kind==='opening'?'cover':'page'}}));
        }
        paperPhase=phase;paperTime=time;
        const giftOpen=phase.kind==='read'&&pages[phase.index]?.print.querySelector('.pocket-gift')?smooth(clamp((p-.5)/.35)):0;
        film.style.setProperty('--gift-shift',-12*giftOpen+'px');
        const cakeOpen=phase.kind==='read'&&pages[phase.index]?.print.querySelector('.birthday-cake')?smooth(clamp((p-.03)/.29))*(1-smooth(clamp((p-.72)/.28))):0;
        film.style.setProperty('--cake-open',String(cakeOpen));
        turningPage=phase.kind==='turn'?phase.index:-1;film.dataset.phase=phase.kind;
        const scenePrint=webgl(),nativeCover=!scenePrint||phase.kind==='cover';
        // Remove the whole composited native cover, including its separate
        // action. The scene owns all moving print; native pages own reading.
        originals[0].style.display=nativeCover?'block':'none';
        film.dataset.nativeLayer=phase.kind==='cover'?'cover':phase.kind==='read'?'page':'scene';
        if(coverAction)coverAction.hidden=phase.kind!=='cover';
        const atEnd=phase.kind==='read'&&phase.index===pages.length-1&&isGiftUnlocked();
        app.classList.toggle('at-book-end',atEnd);
        if(replayAction)replayAction.hidden=!atEnd||!!navigationIntent?.replay;
        film.dataset.side=phase.kind==='divider'?'left':phase.kind==='pan'?'pan':phase.kind==='read'?'right':phase.kind;
        let scale=readingScale,camX=-(mobile?.5:.15)*width*scale,rx=visual?1.4:0,rz=0,coverLift=-6;
        // A visible print child can override its parent's visibility in WebKit.
        // Remove the entire decorative curl from painting while at rest.
        turning.hidden=true;turning.style.visibility='hidden';turnShadow.style.opacity='0';
        if(phase.kind==='cover'||phase.kind==='opening'){
          const openingP=phase.kind==='cover'?0:p,angle=-180*smooth(openingP);
          originals[0].style.opacity=Math.abs(angle)<90?'1':'0';boardBack.style.opacity=Math.abs(angle)>=90?'1':'0';
          board.style.transform=`translateZ(8px) rotateY(${angle}deg)`;board.style.pointerEvents=openingP>.25?'none':'auto';board.style.zIndex=openingP<.99?'4':'0';
          leftBase.style.opacity=String(smooth(clamp(openingP*4)));
          show(-1,false,'cover');
          pages[0].section.style.visibility='visible';
          pages[0].print.style.display=!scenePrint&&openingP>.46?'block':'none';pages[0].print.style.visibility=!scenePrint&&openingP>.46?'visible':'hidden';
          pages[0].print.inert=true;pages[0].section.inert=true;pages[0].print.setAttribute('aria-hidden','true');pages[0].section.setAttribute('aria-hidden','true');
          setLeft(-1);
          if(mobile){
            const coverScale=Math.min(.94,readingScale*.94);
            scale=mix(coverScale,readingScale,smooth(openingP))-readingScale*.43*Math.sin(Math.PI*openingP)**2;camX=mix(-width*scale/2,width*scale/2,smooth(openingP));
          }else{scale=mix(.84,readingScale,smooth(openingP));camX=mix(-width*scale*.42,width*scale*.15,smooth(openingP));}
          coverLift=mix(mobile?14:12,-6,smooth(clamp(openingP*2)));
          rx=mix(8,visual?1.4:0,smooth(clamp(openingP*3)));rz=3*(1-smooth(openingP));
          cue.style.opacity=String(1-clamp(openingP*2));
        }else{
          board.style.transform='translateZ(0px) rotateY(-180deg)';board.style.pointerEvents='none';board.style.zIndex='0';originals[0].style.opacity='0';boardBack.style.opacity='1';leftBase.style.opacity='1';cue.style.opacity='0';
          if(phase.kind==='turn'){
            show(phase.index,true,'right',false);setLeft(phase.index);
            if(!webgl()){const next=pages[phase.index+1];next.section.style.visibility='visible';next.print.style.visibility='visible';next.print.style.display='block';}
            if(!webgl()){prepareTurn(phase.index);turning.hidden=false;turning.style.visibility='visible';curl(p);}
            const wave=Math.sin(Math.PI*p)**2,turnScale=readingScale*(mobile?.54:.94);scale=mix(readingScale,turnScale,wave);camX=mix(-(mobile?.5:.15)*width*scale,(mobile?.5:.15)*width*scale,smooth(p));rx=(visual?1.4:0)+wave*.4;rz=-wave*.15;
            if(mobile)coverLift-=12*wave;
          }else{
            if(!webgl())pages.forEach((page,i)=>{if(i!==phase.index)page.print.style.display='none';});
            const side=phase.kind==='read'?'right':'left';
            show(phase.index,false,side,phase.kind!=='pan');setLeft(phase.index);
            if(phase.kind==='divider')camX=(mobile?.5:.15)*width*scale;
            else if(phase.kind==='pan')camX=mix((mobile?.5:.15)*width*scale,-(mobile?.5:.15)*width*scale,smooth(p));
            if(!webgl())prepareTurn(phase.index);
          }
        }
        camera.style.transform=`translate3d(calc(-50% + ${camX}px),calc(-50% - ${coverLift}px),0) scale(${scale}) rotateX(${rx}deg) rotateZ(${rz}deg)`;
        ground.style.transform=`translate(-50%,-50%) scaleX(${phase.kind==='cover'? .57:1})`;
        edges.style.setProperty('--remaining',String(1-((phase.kind==='turn'?phase.index+smooth(p):Math.max(0,current))/pages.length)*.72));
        visual?.update({phase,p,camX,scale,rx,rz,coverLift,current});
      }
      timeline=gsap.timeline({scrollTrigger:{id:'scrapbook-book',trigger:film,start:`top ${header}px`,end:()=>'+='+distance,pin:viewport,scrub:.48,anticipatePin:1,invalidateOnRefresh:true},onUpdate:render});
      timeline.to(playhead,{time:distance,duration:distance,ease:'none'});
      Object.entries(labels).forEach(([label,time])=>timeline.addLabel(label,time));
      render();ScrollTrigger.refresh();
      function graphicsFallback(){cachedTurn=-1;ensureCSS();prepareTurn(Math.max(0,current));render();}
      function graphicsReady(){strips.forEach(({strip})=>strip.remove());strips.length=0;cachedTurn=-1;pages.forEach(page=>{page.print.style.display='none';});render();}
      film.addEventListener('book-graphics-fallback',graphicsFallback);
      film.addEventListener('book-graphics-ready',graphicsReady);
      function advanceNavigation(_time,delta){
        const tween=scrollTween;if(!tween)return;
        tween.time(Math.min(tween.duration(),tween.time()+Math.min(delta,40)/1000),false);
      }
      function cancelNavigation(){gsap.ticker.remove(advanceNavigation);scrollTween?.kill();scrollTween=null;navigationLabel=null;navigationIntent=null;resumeIntent=null;userSettle=false;releaseDelay?.kill();releaseDelay=null;film.dataset.navigation='idle';}
      function modalLock(event){
        const trigger=timeline.scrollTrigger;
        if(event.detail.locked){
          if(modalTime!==null)return;
          modalTime=playhead.time;cancelNavigation();touchHeld=false;
          // Keep the pinned book and its displayed pose; don't finish a scrub.
          trigger.disable(false,false);trigger.getTween()?.pause();
          window.scrollTo({top:trigger.start+modalTime/distance*(trigger.end-trigger.start),behavior:'instant'});
          film.dataset.modalLocked='true';
          render();
        }else if(modalTime!==null){
          const time=modalTime;trigger.enable(false,false);ScrollTrigger.update();trigger.getTween()?.pause();
          modalTime=null;timeline.time(time,false);render();delete film.dataset.modalLocked;
        }
      }
      window.addEventListener('book-modal-lock',modalLock);
      // Global ScrollTrigger refresh reverts even disabled pins. Enroll this
      // pin for that synchronous refresh, then return it to the held pose.
      function prepareModalRefresh(){if(modalTime!==null)timeline.scrollTrigger.enable(false,false);}
      function finishModalRefresh(){
        if(modalTime===null)return;
        const trigger=timeline.scrollTrigger;trigger.disable(false,false);trigger.getTween()?.pause();
        timeline.time(modalTime,false);render();
        window.scrollTo({top:trigger.start+modalTime/distance*(trigger.end-trigger.start),behavior:'instant'});
      }
      ScrollTrigger.addEventListener('refreshInit',prepareModalRefresh);
      ScrollTrigger.addEventListener('refresh',finishModalRefresh);
      function interruptNavigation(e){
        if(document.querySelector('dialog[open]'))return;
        if(e.type==='keydown'&&!['ArrowUp','ArrowDown','PageUp','PageDown','Home','End','Escape'].includes(e.key))return;
        if((e.type==='pointerdown'||e.type==='touchstart')&&e.target instanceof Element&&e.target.closest('.open-book,.replay-link,#previous-page,#next-page,.site-header .brand'))return;
        cancelNavigation();
        userSettle=true;
        if(e.type==='touchstart')touchHeld=true;
        else if(e.type==='pointerdown'||e.type==='keydown'&&e.key==='Escape')releaseDelay=gsap.delayedCall(.25,settlePage);
      }
      function settlePage(){
        if(!userSettle||touchHeld||scrollTween||disposed||film.dataset.assetsReady==='false'||ScrollTrigger.isScrolling()||document.querySelector('dialog[open]'))return;
        userSettle=false;
        const time=clamp((scrollY-timeline.scrollTrigger.start)/(timeline.scrollTrigger.end-timeline.scrollTrigger.start))*distance;
        const phase=phases.find(p=>time>=p.start&&time<p.end);if(!phase||!['opening','turn','pan'].includes(phase.kind))return;
        const progress=(time-phase.start)/(phase.end-phase.start);
        const target=phase.kind==='opening'?(progress>.24?'divider-0':'cover'):phase.kind==='pan'?(progress>=.5?'leaf-':'divider-')+phase.index:progress>=.45?'divider-'+(phase.index+1):'leaf-'+phase.index;
        goLabel(target,false,true,false,null,.7);
      }
      function releaseTouch(){touchHeld=false;releaseDelay?.kill();releaseDelay=gsap.delayedCall(.25,settlePage);}
      ScrollTrigger.addEventListener('scrollEnd',settlePage);
      window.addEventListener('wheel',interruptNavigation,{passive:true});window.addEventListener('touchstart',interruptNavigation,{passive:true});
      window.addEventListener('touchend',releaseTouch,{passive:true});window.addEventListener('touchcancel',releaseTouch,{passive:true});
      window.addEventListener('pointerdown',interruptNavigation,{passive:true});window.addEventListener('keydown',interruptNavigation);
      function goLabel(label, focus=false, animate=false, replay=false,complete=null,durationOverride=null){
        if(modalTime!==null)return;
        if(!isGiftUnlocked()&&candlePhase&&labels[label]>candleStop){label='leaf-'+candlePhase.index;complete=null;}
        const labelTime=labels[label];if(labelTime===undefined)return;
        if(replay&&replayAction)replayAction.hidden=true;
        if(animate&&navigationLabel===label&&scrollTween)return;
        cancelNavigation();
        const targetPhase=label==='cover'?null:phases.find(p=>labelTime>=p.start&&labelTime<p.end);
        const readingPhase=targetPhase?.kind==='read'?targetPhase:null;
        const time=label==='gift-open'?labelTime:targetPhase?.kind==='divider'?targetPhase.start+(targetPhase.end-targetPhase.start)*.5:visual&&readingPhase?readingPhase.start+Math.max(175,(readingPhase.end-readingPhase.start)*.42):labelTime;
        const top=timeline.scrollTrigger.start+time/distance*(timeline.scrollTrigger.end-timeline.scrollTrigger.start);
        const focusPage=()=>{if(focus){
          const target=current<0?originals[0].querySelector('h1'):currentSide==='left'?left.querySelector('h2,h3,[tabindex]')||left:pages[current].print.querySelector('h2')||pages[current].print;
          if(target===left)target.tabIndex=-1;
          if(target?.tagName==='ARTICLE')target.tabIndex=-1;
          target?.focus({preventScroll:true});
        }};
        const seek=position=>{window.scrollTo({top:position,behavior:'instant'});ScrollTrigger.update();timeline.scrollTrigger.getTween()?.progress(1);};
        const displayedTop=timeline.scrollTrigger.start+playhead.time/distance*(timeline.scrollTrigger.end-timeline.scrollTrigger.start);
        if(!animate||Math.abs(top-displayedTop)<2){
          const quiet=paperSilenced;paperSilenced=true;
          try{seek(top);timeline.time(time,false);}finally{paperSilenced=quiet;}
          focusPage();complete?.();return;
        }
        const position={top:displayedTop};navigationLabel=label;film.dataset.navigation='moving';
        const coverJourney=label==='divider-0'&&playhead.time<opening||label==='dedication'&&playhead.time<opening;
        const travel=Math.abs(top-displayedTop),duration=durationOverride??(label==='gift-open'?clamp(travel/500,.65,1):replay?Math.max(1.8,travel/850):coverJourney?2.2:Math.min(2.3,Math.max(1.25,travel/750)));
        const destination=label!=='gift-open'&&targetPhase?pages[targetPhase.index]:null;
        navigationIntent={label,focus,replay,complete,chapter:destination?chapters[destination.chapter][0]:null,part:destination?.part,side:targetPhase?.kind==='divider'?'left':'right'};
        render();
        scrollTween=gsap.to(position,{top,paused:true,duration,ease:replay?'none':'power2.inOut',
          onUpdate:()=>seek(position.top),onComplete:()=>{gsap.ticker.remove(advanceNavigation);scrollTween=null;navigationLabel=null;navigationIntent=null;film.dataset.navigation='idle';timeline.time(time,false);render();focusPage();complete?.();}});
        gsap.ticker.add(advanceNavigation);
      }
      // A keyboard move keeps a focused link/button on its physical leaf.
      function revealFocused(e){
        if(e.target.closest('.strip-face,.left-leaf,.cover-back'))return;
        const index=pages.findIndex(p=>p.print.contains(e.target));
        if(index>=0&&index!==current)goLabel('leaf-'+index,true);
      }
      app.addEventListener('focusin',revealFocused);
      const snapshot=screen;let resizeTimer;
      function reflowWhenSettled(){
        resizeTimer=null;
        if(disposed||document.querySelector('dialog[open]')||window.visualViewport&&Math.abs(window.visualViewport.scale-1)>.02)return;
        const next=viewportSize();
        if(Math.abs(next.width-snapshot.width)<2&&Math.abs(next.height-snapshot.height)<2)return;
        // Safari toolbar movement must not tear down a page being prepared
        // or a fold still controlled by the user's gesture/navigation.
        if(film.dataset.assetsReady==='false'||scrollTween||touchHeld||['opening','turn','pan'].includes(phases[phaseCursor]?.kind)||ScrollTrigger.isScrolling()){
          resizeTimer=setTimeout(reflowWhenSettled,120);return;
        }
        app.dispatchEvent(new CustomEvent('book-reflow'));
      }
      function resized(){
        if(document.querySelector('dialog[open]')||window.visualViewport&&Math.abs(window.visualViewport.scale-1)>.02)return;
        const next=viewportSize();
        if(Math.abs(next.width-snapshot.width)<2&&Math.abs(next.height-snapshot.height)<2)return;
        clearTimeout(resizeTimer);resizeTimer=setTimeout(reflowWhenSettled,180);
      }
      function closedDialog(){
        resized();
        if(userSettle&&!touchHeld&&!scrollTween&&!document.querySelector('dialog[open]')){releaseDelay?.kill();releaseDelay=gsap.delayedCall(.25,settlePage);}
      }
      window.addEventListener('resize',resized);
      window.visualViewport?.addEventListener('resize',resized,{passive:true});
      document.addEventListener('close',closedDialog,true);
      return {
        ready:visual?.assets||Promise.resolve(),
        go:(id,focus)=>goLabel(id,focus),
        open:focus=>goLabel('divider-0',focus,true),
        replay:focus=>goLabel('cover',focus,true,true),
        revealGift:complete=>goLabel('gift-open',false,true,false,complete),
        highlightObject:detail=>visual?.setObjectFeedback?.(detail),
        discoverObject:detail=>visual?.setDiscovery?.(detail)||false,
        captureObject:key=>visual?.captureObject?.(key)||null,
        setBirthdayCandle:lit=>{visual?.setBirthdayCandle?.(lit);render();},
        freeze:()=>visual?.captureFrame?.()||null,
        getPosition(){
          const phase=phases[phaseCursor],page=pages[phase.index];
          const intent=navigationIntent?{...navigationIntent,durationLeft:Math.max(.35,(scrollTween?.duration()||0)-(scrollTween?.time()||0))}:resumeIntent;
          return {kind:phase.kind,progress:clamp((playhead.time-phase.start)/(phase.end-phase.start)),chapter:page?chapters[page.chapter][0]:'cover',part:page?.part||1,side:currentSide,navigation:intent,settle:userSettle,touchHeld};
        },
        resume(position){
          const index=pages.findIndex(page=>chapters[page.chapter][0]===position.chapter&&page.part===position.part);
          const fallback=pages.findIndex(page=>chapters[page.chapter][0]===position.chapter);
          const pageIndex=index>=0?index:Math.max(0,fallback);
          const phase=phases.find(p=>p.kind===position.kind&&(['cover','opening'].includes(p.kind)||p.index===pageIndex))||phases.find(p=>p.kind==='read'&&p.index===pageIndex);
          if(!phase)return;
          const time=phase.start+clamp(position.progress)*Math.max(0,phase.end-phase.start-.001);
          paperSilenced=true;
          try{window.scrollTo({top:timeline.scrollTrigger.start+time,behavior:'instant'});ScrollTrigger.update();timeline.scrollTrigger.getTween()?.progress(1);timeline.time(time,false);}finally{paperSilenced=false;}
          userSettle=!!position.settle;touchHeld=!!position.touchHeld;
          const intent=position.navigation;resumeIntent=intent||null;
          if(intent)film.dataset.navigation='preparing';
          const continueReading=()=>{
            if(disposed)return;
            if(intent&&resumeIntent===intent){
              let target=intent.label;
              if(intent.chapter){const index=pages.findIndex(p=>chapters[p.chapter][0]===intent.chapter&&p.part===intent.part);if(index>=0)target=(intent.side==='left'?'divider-':'leaf-')+index;}
              goLabel(target,intent.focus,true,intent.replay,intent.complete,intent.durationLeft);
            }else if(userSettle&&!touchHeld&&!scrollTween){releaseDelay?.kill();releaseDelay=gsap.delayedCall(.25,settlePage);}
          };
          if(visual?.assets)visual.assets.then(continueReading);else continueReading();
        },
        next:focus=>{const phase=phases[phaseCursor];goLabel(phase.kind==='cover'||phase.kind==='opening'?'divider-0':['divider','pan'].includes(phase.kind)?'leaf-'+phase.index:'divider-'+Math.min(pages.length-1,current+1),focus,true);},
        previous:focus=>{const phase=phases[phaseCursor];goLabel(turningPage>=0?'leaf-'+turningPage:phase.kind==='read'||phase.kind==='pan'?'divider-'+phase.index:current<=0?'cover':'leaf-'+(current-1),focus,true);},
        destroy(){
          disposed=true;cancelNavigation();window.removeEventListener('book-modal-lock',modalLock);ScrollTrigger.removeEventListener('refreshInit',prepareModalRefresh);ScrollTrigger.removeEventListener('refresh',finishModalRefresh);ScrollTrigger.removeEventListener('scrollEnd',settlePage);window.removeEventListener('touchend',releaseTouch);window.removeEventListener('touchcancel',releaseTouch);clearTimeout(resizeTimer);window.removeEventListener('wheel',interruptNavigation);window.removeEventListener('touchstart',interruptNavigation);window.removeEventListener('pointerdown',interruptNavigation);window.removeEventListener('keydown',interruptNavigation);window.removeEventListener('resize',resized);window.visualViewport?.removeEventListener('resize',resized);document.removeEventListener('close',closedDialog,true);app.removeEventListener('focusin',revealFocused);film.removeEventListener('book-graphics-fallback',graphicsFallback);film.removeEventListener('book-graphics-ready',graphicsReady);timeline.scrollTrigger?.kill(true);timeline.kill();visual?.destroy();
          sources.forEach(({section,article,divider})=>{section.querySelector('.page-seat').replaceChildren(...(divider?[divider,article]:[article]));section.classList.remove('film-chapter');});
          originals.forEach(s=>{s.inert=false;s.removeAttribute('aria-hidden');s.style.removeProperty('visibility');s.style.removeProperty('opacity');s.style.removeProperty('display');app.append(s);});
          if(coverAction){coverAction.classList.remove('cover-open-action');coverAction.hidden=false;coverActionHome.append(coverAction);}
          restoreReplay();
          app.append(document.querySelector('.book-navigation'));film.remove();app.classList.remove('has-book-film');
        }
      };
    }
  };
})();

(() => {
  'use strict';
  const ambient=[261.63,329.63,392,329.63,293.66,349.23,440,349.23,261.63,329.63,493.88,392,220,261.63,329.63,293.66];
  // The traditional melody, arranged as a quiet music box in C major.
  const birthday=[
    [67,.75],[67,.25],[69,1],[67,1],[72,1],[71,2],
    [67,.75],[67,.25],[69,1],[67,1],[74,1],[72,2],
    [67,.75],[67,.25],[79,1],[76,1],[72,1],[71,1],[69,1],
    [77,.75],[77,.25],[76,1],[72,1],[74,1],[72,2]
  ];
  window.ScrapbookAudio={create({button,icon,toast}){
    let context=null,master=null,playing=null,pending=null,generation=0,timer=null,blockedTimer=null,frame=null;
    let scene={chapter:'cover',candleBlown:false},lastChapter='cover',ambientEnabled=false,muted=false,disposed=false,warmed=false,noteIndex=0;
    const voices=new Set(),gestures=['pointerdown','touchend','keydown','click'];
    const wanted=()=>disposed||document.hidden||muted?null:scene.chapter==='birthday'&&!scene.candleBlown?'birthday':ambientEnabled?'ambient':null;
    function updateButton(){
      const on=!!playing&&context?.state==='running'&&!document.hidden;
      button.innerHTML=icon(on?'sound':'mute');button.setAttribute('aria-pressed',String(on));
      button.setAttribute('aria-label',pending==='birthday'?'Play Happy Birthday':on?'Turn music off':'Turn music on');
      button.title=scene.chapter==='birthday'&&!scene.candleBlown?'Happy Birthday':'Instrumental music';
    }
    function audioContext(){
      if(!context){
        const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Audio is unavailable');
        context=new Audio();master=context.createGain();master.gain.value=.55;master.connect(context.destination);
      }
      return context;
    }
    function stopVoices(){
      clearTimeout(timer);clearTimeout(blockedTimer);timer=blockedTimer=null;
      if(context)for(const voice of voices){
        const now=context.currentTime;
        try{voice.gain.gain.cancelScheduledValues(now);voice.gain.gain.setTargetAtTime(0,now,.003);voice.osc.stop(now+.015);}catch{}
      }
      voices.clear();playing=null;pending=null;
    }
    function tone(frequency,start,duration,volume,attack=.012){
      const osc=context.createOscillator(),gain=context.createGain(),voice={osc,gain};
      osc.type='sine';osc.frequency.value=frequency;
      gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+attack);
      gain.gain.exponentialRampToValueAtTime(.0001,start+duration);
      osc.connect(gain);gain.connect(master);voices.add(voice);
      osc.onended=()=>{voices.delete(voice);osc.disconnect();gain.disconnect();};
      osc.start(start);osc.stop(start+duration+.025);
    }
    function ambientCycle(token){
      if(token!==generation||playing!=='ambient')return;
      const start=context.currentTime+.025;
      tone(ambient[noteIndex%ambient.length],start,2.3,.08,.05);
      tone(ambient[(noteIndex+4)%ambient.length]/2,start,2.3,.025,.05);noteIndex++;
      timer=setTimeout(()=>ambientCycle(token),800);
    }
    function birthdayCycle(token){
      if(token!==generation||playing!=='birthday')return;
      const beat=.68,start=context.currentTime+.035;let offset=0;
      for(const [midi,beats]of birthday){
        const frequency=440*2**((midi-69)/12),duration=Math.max(.22,beats*beat*.96);
        for(const [partial,volume]of[[1,.13],[2,.025],[3,.008]])tone(frequency*partial,start+offset,duration,volume);
        offset+=beats*beat;
      }
      timer=setTimeout(()=>birthdayCycle(token),(offset+1.2)*1000);
    }
    function sync(){
      const target=wanted();
      if(!pending&&target===playing&&(!target||context?.state==='running')){updateButton();return;}
      if(target&&pending===target)return;
      const token=++generation;stopVoices();
      if(!target){updateButton();return;}
      pending=target;updateButton();
      try{
        const ctx=audioContext();
        blockedTimer=setTimeout(()=>{if(token===generation&&ctx.state!=='running')toast(target==='birthday'?'Tap the sound button to play Happy Birthday.':'Tap the sound button to play music.');},900);
        Promise.resolve(ctx.resume()).then(()=>{
          if(disposed||token!==generation||wanted()!==target)return;
          clearTimeout(blockedTimer);blockedTimer=null;pending=null;playing=target;
          if(target==='birthday')birthdayCycle(token);else ambientCycle(token);updateButton();
        }).catch(error=>failed(token,error));
      }catch(error){failed(token,error);}
    }
    function failed(token,error){
      if(disposed||token!==generation)return;
      stopVoices();updateButton();
      toast(error?.name==='NotAllowedError'?'Tap the sound button to play music.':'Music is unavailable in this browser. You can still read the story.');
    }
    function settleScene(){
      frame=null;
      if(scene.chapter==='birthday'&&lastChapter!=='birthday'){
        ambientEnabled=false;
        document.querySelectorAll('audio').forEach(audio=>audio.pause());
      }
      lastChapter=scene.chapter;sync();
    }
    function setScene(next){
      const firstBlow=next.candleBlown&&!scene.candleBlown;scene=next;
      if(firstBlow){ambientEnabled=false;sync();}
      else if(scene.chapter==='birthday'&&!scene.candleBlown){
        ambientEnabled=false;document.querySelectorAll('audio').forEach(audio=>audio.pause());sync();
      }
      cancelAnimationFrame(frame);
      // A rebuild briefly reports Cover before restoring the same leaf.
      frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(settleScene);});
    }
    async function unlock(event){
      if(disposed||document.hidden||event&&!event.isTrusted)return;
      try{
        const ctx=audioContext(),resumed=ctx.resume();
        if(!warmed){
          const silence=ctx.createBufferSource();silence.buffer=ctx.createBuffer(1,1,22050);
          silence.connect(ctx.destination);silence.onended=()=>silence.disconnect();silence.start();warmed=true;
        }
        await resumed;if(!disposed)sync();
      }catch{}
    }
    function toggle(){
      if(pending){void unlock();return;}
      if(playing&&context?.state==='running'){muted=true;ambientEnabled=false;sync();toast('Music is off.');return;}
      muted=false;ambientEnabled=scene.chapter!=='birthday'||scene.candleBlown;
      void unlock();sync();
    }
    function visibility(){
      if(document.hidden){++generation;stopVoices();updateButton();context?.suspend().catch(()=>{});}
      else settleScene();
    }
    gestures.forEach(type=>document.addEventListener(type,unlock,{capture:true,passive:true}));
    document.addEventListener('visibilitychange',visibility);button.onclick=toggle;updateButton();
    return {setScene,destroy(){disposed=true;++generation;cancelAnimationFrame(frame);stopVoices();gestures.forEach(type=>document.removeEventListener(type,unlock,true));document.removeEventListener('visibilitychange',visibility);context?.close().catch(()=>{});}};
  }};
})();

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
    let paperBuffer=null,paperVoice=null,paperGeneration=0;
    let scene={chapter:'cover',candleBlown:false},lastChapter='cover',ambientEnabled=false,muted=false,disposed=false,warmed=false,noteIndex=0;
    const voices=new Set(),gestures=['pointerdown','touchend','keydown','click'];
    const wanted=()=>disposed||document.hidden||muted?null:scene.chapter==='birthday'&&!scene.candleBlown?'birthday':ambientEnabled?'ambient':null;
    function updateButton(){
      const on=!muted;
      button.innerHTML=icon(on?'sound':'mute');button.setAttribute('aria-pressed',String(on));
      button.setAttribute('aria-label',pending==='birthday'?'Play Happy Birthday':on?'Turn sound off':'Turn sound on');
      button.title=scene.chapter==='birthday'&&!scene.candleBlown?'Happy Birthday and book sounds':'Book sounds and instrumental music';
    }
    function audioContext(){
      if(!context){
        const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)throw new Error('Audio is unavailable');
        context=new Audio();master=context.createGain();master.gain.value=.55;master.connect(context.destination);
      }
      return context;
    }
    function paperNoise(){
      if(paperBuffer)return paperBuffer;
      paperBuffer=context.createBuffer(1,Math.ceil(context.sampleRate*1.3),context.sampleRate);
      const samples=paperBuffer.getChannelData(0);let brown=0,grain=.5,target=.5;
      for(let i=0;i<samples.length;i++){
        const white=Math.random()*2-1;
        if(i%80===0)target=.25+Math.random()*.75;
        grain+=(target-grain)*.03;brown=(brown+white*.03)/1.03;
        samples[i]=(white*.62+brown*2.2)*grain;
      }
      return paperBuffer;
    }
    function stopPaper(immediate=false){
      ++paperGeneration;
      const voice=paperVoice;paperVoice=null;if(!voice||!context)return;
      const now=context.currentTime;
      try{
        voice.gain.gain.cancelScheduledValues(now);
        if(immediate){voice.gain.gain.setValueAtTime(0,now);voice.source.stop(now);voice.cleanup();}
        else{voice.gain.gain.setTargetAtTime(0,now,.004);voice.source.stop(now+.018);}
      }catch{voice.cleanup();}
    }
    function playPaper(kind){
      stopPaper();
      const token=paperGeneration,requested=performance.now(),ctx=audioContext();
      const start=()=>{
        if(disposed||document.hidden||muted||!warmed||token!==paperGeneration||ctx.state!=='running'||performance.now()-requested>250)return;
        const source=ctx.createBufferSource(),high=ctx.createBiquadFilter(),low=ctx.createBiquadFilter(),gain=ctx.createGain();
        const duration=kind==='cover'?.81:.51,now=ctx.currentTime+.024;
        source.buffer=paperNoise();source.playbackRate.value=.96+Math.random()*.08;
        high.type='highpass';high.frequency.value=kind==='cover'?280:420;high.Q.value=.35;
        low.type='lowpass';low.Q.value=.3;low.frequency.setValueAtTime(kind==='cover'?3100:4600,now);low.frequency.linearRampToValueAtTime(1800,now+duration);
        const envelope=kind==='cover'?[[0,0],[.025,.17],[.13,.29],[.22,.12],[.32,.38],[.45,.14],[.56,.26],[.66,.09],[.81,0]]:[[0,0],[.012,.18],[.055,.16],[.1,.34],[.19,.12],[.25,.29],[.34,.08],[.45,.17],[.51,0]];
        gain.gain.setValueAtTime(0,now);
        for(const [offset,amount]of envelope)gain.gain.linearRampToValueAtTime(amount,now+offset);
        source.connect(high);high.connect(low);low.connect(gain);gain.connect(master);
        let cleaned=false;const voice={source,gain,cleanup(){if(cleaned)return;cleaned=true;if(paperVoice===voice)paperVoice=null;source.disconnect();high.disconnect();low.disconnect();gain.disconnect();}};
        source.onended=voice.cleanup;paperVoice=voice;source.start(now,Math.random()*.15);source.stop(now+duration+.015);
      };
      if(ctx.state==='running')start();
      else Promise.resolve(ctx.resume()).then(start).catch(()=>{});
    }
    function paper(event){
      const kind=event.detail?.kind;
      if(disposed||document.hidden||muted||!warmed||!['cover','page'].includes(kind))return;
      try{playPaper(kind);}catch{}
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
      if(!muted){muted=true;ambientEnabled=false;stopPaper();sync();toast('Sound is off.');return;}
      muted=false;ambientEnabled=scene.chapter!=='birthday'||scene.candleBlown;
      void unlock();sync();
    }
    function visibility(){
      if(document.hidden){++generation;stopPaper(true);stopVoices();updateButton();context?.suspend().catch(()=>{});}
      else settleScene();
    }
    gestures.forEach(type=>document.addEventListener(type,unlock,{capture:true,passive:true}));
    document.addEventListener('visibilitychange',visibility);document.addEventListener('scrapbook-paper',paper);button.onclick=toggle;updateButton();
    return {setScene,destroy(){disposed=true;++generation;cancelAnimationFrame(frame);stopPaper(true);stopVoices();gestures.forEach(type=>document.removeEventListener(type,unlock,true));document.removeEventListener('visibilitychange',visibility);document.removeEventListener('scrapbook-paper',paper);if(button.onclick===toggle)button.onclick=null;paperBuffer=null;context?.close().catch(()=>{});}};
  }};
})();

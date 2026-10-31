// One dependency promise keeps the first render and every later reflow identical.
window.bookRendererReady = import('./three-visual.js?v=94').catch(() => null);

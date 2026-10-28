// One dependency promise keeps the first render and every later reflow identical.
window.bookRendererReady = import('./three-visual.js?v=63').catch(() => null);

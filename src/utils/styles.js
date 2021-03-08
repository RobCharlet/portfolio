/** Colors */
export const colors = {
  brand: '#da0013',
  brandDark: '#ce0013',
  bluePrimary: '#00DAC7',
  text: '#232129',
  background: '#FFF',
};

export const darkColors = {
  brand: '#da0013',
  bluePrimary: '#da0013',
  text: '#fff',
  background: '#232129',
};

export const radialGrandient = [
  'ellipse at center',
  'rgba(0, 0, 0, 0) 0%',
  'rgba(0, 0, 0, 0) 37%',
  'rgba(0, 0, 0, 0.65) 100%',
].join();

export const darkRadialGrandient = [
  'ellipse at center',
  'rgba(255, 255, 255, 255) 0%',
  'rgba(255, 255, 255, 255) 37%',
  'rgba(255, 255, 255, 0.2) 100%',
].join();

/** Fonts */
export const defaultFontStack = [
  '-apple-system',
  'BlinkMacSystemFont',
  'Segoe UI',
  'Roboto',
  'Oxygen',
  'Ubuntu',
  'Cantarell',
  'Open Sans',
  'Helvetica Neue',
  'sans-serif',
].join();

const monospaceFontStack = [
  `Space Mono`,
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`,
].join();

export const fonts = {
  body: defaultFontStack,
  heading: `Futura PT, ${defaultFontStack}`,
  monospace: monospaceFontStack,
};

/** Media queries */
const breakpoints = [576, 768, 992, 1200];
export const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

/** Colors */
export const colors = {
  brand: '#da0013',
  brandDark: '#ce0013',
  bluePrimary: '#00DAC7',
  text: '#232129',
  background: '#FFF',
  accent: '#ffb238',
  error: '#ec1818',
  extraLight: '#fff',
};

export const darkColors = {
  brand: '#da0013',
  bluePrimary: '#da0013',
  text: '#fff',
  background: '#232129',
  accent: '#ffb238',
  error: '#ec1818',
  extraLight: '#444',
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

export const spacing = {
  '3xs': 2,
  '2xs': 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
};

export const radius = {
  default: 2,
  large: 4,
};

/** Media queries */
export const breakpoints = {
  mobile: 400,
  phablet: 550,
  tablet: 750,
  desktop: 1000,
  hd: 1300,
};

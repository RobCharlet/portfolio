export const colors = {
  brand: "#da0013",
  text: "#232129"
}

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
  'sans-serif'
].join();

const monospaceFontStack = [
  `Space Mono`,
  `SFMono-Regular`,
  `Menlo`,
  `Monaco`,
  `Consolas`,
  `Liberation Mono`,
  `Courier New`,
  `monospace`
].join();

export const fonts = {
  body: defaultFontStack,
  heading: `Futura PT, ${defaultFontStack}`,
  monospace: monospaceFontStack
};
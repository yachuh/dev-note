// /** @type {import('tailwindcss').Config} */

// module.exports = {
//   darkMode: ["class", '[data-theme="dark"]'],
//   content: ["./src/**/*.{jsx,tsx,mdx,html}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
import type { Config } from 'tailwindcss';

const config: Config = {
  corePlugins: {
    preflight: false,
    container: false,
  },
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{jsx,tsx,mdx,html}"],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config;

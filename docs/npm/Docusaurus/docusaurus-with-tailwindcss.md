---
title: "[Docusaurus] TailwindCSS"
tags: [npm, docusaurus, tailwindcss, css]
---

> [TailwindCSS](https://tailwindcss.com/docs/installation)

## 安裝
安裝 TailwindCSS：
```bash
pnpm add -D tailwindcss postcss autoprefixer
```

輸入初始化指令，建立 `tailwind.config.js` 檔案：
```bash
npx tailwindcss init
```

可以在 `tailwind.config.js` 檔案中看到目前的預設值：
```javascript title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

我們要的是 typescript 版本，所以將檔案改成 `tailwind.config.ts`：
```typescript title="tailwind.config.ts"
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config;
```
## 設定

> [TailwindCSS Configuration](https://tailwindcss.com/docs/configuration)

根據需求調整 config 檔案，將 `src` 資料夾設定在 `content` 路徑中：
```typescript title="tailwind.config.ts"
import type { Config } from 'tailwindcss';

const config: Config = {
  // highlight-start
  corePlugins: {
    preflight: false,
    container: false,
  },
  content: ["./src/**/*.{jsx,tsx,mdx,html}"],
  darkMode: ["class", '[data-theme="dark"]'],
  // highlight-end
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config;
```

:::warning
如果要保留原本 docusaurus 的 css 設定，可以將 `preflight` 設定為 `false` (Ref: [Docusaurus and Tailwind CSS](https://arc.net/l/quote/nskvvmcv))
:::

### Docusaurus Config

接下來要將 TailwindCSS 作為 plugin 加入到 Docusaurus 的 config 檔裡。

前往 `docusaurus.config.ts` 檔案，可以看到有一個 plugins 的屬性，待會要將 Taiwin

```typescript title="docusaurus.config.ts"
const config: Config = {
	title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  .
  .
  .
	plugins: [],
}
```

### 建立 TailwindCSS plugin
在 root 目錄底下建立 `plugins` 資料夾，然後建立 `tailwind-config.cjs` 檔案

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/141e8cc4-e0f2-4647-abef-712e882bc875/3e06cd85-a36c-40ae-8011-a1bdf2812c13/Untitled.png)

將以下 script 放入 `tailwind-config.cjs`：
```jsx title="tailwind-config.cjs"
function tailwindPlugin(context, options) {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions) {
      postcssOptions.plugins = [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
      ];
      return postcssOptions;
    },
  };
}

module.exports = tailwindPlugin;
```

### 加入 TailwindCSS plugin
接著回到 `docusaurus.config.ts` 檔案，加入 tailwindPlugin：

```jsx title="docusaurus.config.ts"
// highlight-next-line
import tailwindPlugin from "./plugins/tailwind-config.cjs"; // add this
//...
const config: Config = {
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',
  //...
  // highlight-next-line
  plugins: [tailwindPlugin], // update this
}
```

## 開始使用 TailwindCSS

```bash
pnpm run start
```

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/141e8cc4-e0f2-4647-abef-712e882bc875/7eefe5da-f9ee-49fd-8d20-d33c9c2619ab/4160b97c-3cc2-412a-a4ce-3497ac03baf9.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/141e8cc4-e0f2-4647-abef-712e882bc875/0233e1fb-c0e1-46df-983d-6254aa2b09c3/Untitled.png)

![Untitled](https://prod-files-secure.s3.us-west-2.amazonaws.com/141e8cc4-e0f2-4647-abef-712e882bc875/cf49e7fd-efad-4eac-b437-19e6811a7011/Untitled.png)

## Ref
- [Docusaurus: A Guide to Seamless Integration with Tailwind CSS](https://arc.net/l/quote/bennashr)
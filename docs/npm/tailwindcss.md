---
tags: [css, tailwind]
---

# [Note] Tailwind CSS 筆記

> https://tailwindcss.com/
>
> A utility-first CSS framework packed with classes.

## Utility first

Tailwind CSS 是一個以 **Utility-first** 為核心的 CSS 框架。「**Utility first**」意味著使用**預先定義**的、**單一用途**的 CSS class （類別）來快速建構樣式（如：使用 `mx-auto` 來做水平置中）。開發者可以直接在 HTML 中使用這些 class，不用再另外撰寫自定義的 CSS 樣式。

- 受限的設計 (Build with constraints)
  - 預先定義好的 CSS 名稱與對應的樣式可以避免產生同名的 CSS
  - 透過預設值預先定義好的一套 design system ，使用有限制的樣式數值（例如使用 `text-sm` 來統一規範 font-size 為 14px）來確保一致的設計語言
  - 夠更輕易地與 design system 配合，只需要在設定檔統一修改就能套用到所有地方，提升可維護性
- 透過 Tailwind CSS 定義好的 prefix 來撰寫 media query 來達成[響應式設計](https://tailwindcss.com/docs/responsive-design)或是撰寫 [hover、focus、disable⋯⋯等不同狀態(variants)的樣式](https://tailwindcss.com/docs/hover-focus-and-other-states)
- 減少 CSS 文件增長 (CSS stop growing)
  - 透過 utility class 來組合出複雜的樣式， class 可再多處使用，減少重複 CSS
  - 有寫出來的 class 才會被偵測並產生對應的 CSS，樣式所佔用的空間相對較小
- 不需要發明 class 名稱 (No need to invent class names)

## Install & Setup

**安裝 Tailwind CSS 與相關套件**

```bash
npm install -D tailwindcss postcss autoprefixer # 安裝 Tailwind CSS 與 PostCSS 與 Autoprefixer 套件
```

- [Autoprefixer](https://github.com/postcss/autoprefixer)：一個 PostCSS 的 CSS Prefix 工具，自動為編譯完成的 CSS 加入前綴字，確保 CSS 屬性在不同瀏覽器的兼容性
- [PostCSS](https://postcss.org/): 使用 JavaScript 轉換 CSS 的工具

**透過 Tailwind CLI 產生 Tailwind config 檔**

```bash
npx tailwindcss init
npx tailwindcss init --esm  # Generate an ESM config file
npx tailwindcss init --ts  # Generate a TypeScript config file
```

**將 template files 路徑定義在 `tailwind.config.js` 設定檔的 `contents` 區塊中**

```javascript title="tailwind.config.ts"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  //...
};
```

**將 Tailwind CSS 引入到到 global.css 中（或任何的 CSS 主檔）**

```css title="global.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- `@tailwind` 的前後可以再加入其他 CSS 檔

## 運作原理

### Import

這邊以 Next.js 為例

1. 從 `src/app` 引入了 globals.css

   ```css
   /* src/app/globals.css */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

2. 讀取 `tailwind.config.js` 和 `postcss.config.js`，引入 Tailwind CSS 和其他 PostCSS 插件

   ```javascript
   // postcss.config.js
   module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   };
   ```

### Build

在 build time

- PostCSS 解析原始 CSS 文件 (globals.css) 並生成對應的 utility class：

  - 看到關鍵字 `@tailwind` ，把 `base` 、`components` 與 `utilities` 三個 CSS 引入

  - 看到關鍵字如： `@apply ` 、 `@screen`等，進行對應的操作

- 掃描指定的 template files，確保使用的 class
  - 透過 [正則表達式 regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) 來識別出檔案裡有使用到 Tailwind CSS 的 class，所以 class name 務必要完整不然會無法被比對出來
- 使用 PurgeCSS 來移除未使用的樣式
- 其他 PostCSS 插件處理，例如 Autoprefixer

- 生成對應的 CSS 樣式，壓縮和優化最終的 CSS，並將結果編譯到最終的靜態 CSS 文件。

### 動態生成 class 名稱

因為 TailwindCSS 是在編譯時生成樣式，若使用動態值（如 props）會在編譯過程中無法被偵測到。解決方案是寫出完整的 class 名稱，以便讓 Tailwind 能夠正確匹配並生成相應的 CSS。例如：

條件式：

```jsx
// 錯誤，regular expression 無法比對出符合的 class name
<div className={`text-${error ? "red" : "green"}-600`}>Lorem Ipsum</div>

// 正確， Tailwind 能夠比對 'text-red-600' 和 'text-green-600' 字串，並產生對應的 CSS 樣式
<div className={error ? "text-red-600" : "text-green-600"}>Lorem Ipsum</div>
```

透過 props：

```jsx
// 錯誤
function Button({ color, children }) {
  return (
    <button className={`bg-${color}-600 hover:bg-${color}-500 ...`}>
      {children}
    </button>
  );
}

// 正確
function Button({ color, children }) {
  const colorVariants = {
    blue: 'bg-blue-600 hover:bg-blue-500',
    red: 'bg-red-600 hover:bg-red-500',
  };

  return <button className={`${colorVariants[color]} ...`}>{children}</button>;
}
```

除此之外也可以透過其他插件工具像是使用 clsx 來處理條件判斷或是[使用 data-attributes 來動態生成樣式](https://vocus.cc/article/66003838fd8978000173824c)。

## 搭配使用的套件或工具

- [TailwindCSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)：Tailwind CSS 和 VS Code 合作的官方插件

- [TailwindCSS Prettier Plugin](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)：Prettier 針對 TailwindCSS 推出的 plugin，可以自動排序 class

- [tailwind-merge](https://www.npmjs.com/package/tailwind-merge)：解決 Tailwind CSS 的 class 合併時所產生的衝突。

  當我們在同一個元素上的同一個 CSS 屬性設定了不同的值（例如同時寫了 `px-2` 和 `p-3`）， Tailwind Merge 可以確保寫在後面的值會套用在該元素上（因為 Tailwind CSS 實際上是根據 source CSS 而非撰寫順序決定的）。

  ```jsx
  import { twMerge } from 'tailwind-merge'

  const defaultStyle ='text-lg h-[35px] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed flex justify-center items-center gap-[3px]';

  const
  twMerge('px-2 py-1 bg-red hover:bg-dark-red', 'p-3 bg-[#B91C1C]')
  // → 'hover:bg-dark-red p-3 bg-[#B91C1C]'
  ```

- [clsx](https://www.npmjs.com/package/clsx)：用於撰寫條件式 CSS class name 的工具，可以將物件、陣列、判斷式、條件式轉換成字串並組合成 class name。搭配 Tailwind CSS 使用可以優化開發體驗：

  ```jsx
  const defaultStyle = 'text-md py-2 px-4 cursor-pointer rounded-sm text-white';
  const buttonClass = clsx(defaultStyle, {
    'bg-blue-500': status === 'Primary',
    'bg-green-500': status === 'Success',
    'bg-red-500': status === 'Danger',
  });

  return <button className={buttonClass}>{status}</button>;
  ```

## 客製化

### `tailwind.config.js`

在 `tailwind.config.js` 針對既有樣式做擴充或覆蓋，自訂顏色、字型、間距等屬性。

```javascript title="tailwind.config.js"
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    // 使用 extend 可以在不覆蓋默認值的情況下添加新的屬性
    extend: {
      colors: {
        'custom-blue': '#1da1f2',
      },
    },
    // 直接覆蓋或新增自定義的顏色
    colors: {
      primary: '#1DA1F2',
      secondary: '#14171A',
      // 自定義顏色
    },
    // 自定義響應式斷點
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
  },
  // 為特定的 utility class 添加新的 variants
  variants: {
    extend: {
      backgroundColor: ['active'],
      textColor: ['hover', 'focus'],
    },
  },
  plugins: [],
};
```

#### 自定義完整的顏色

你可以自定義包含完整的色階顏色：

```javascript
colors: {
  'brand-blue': {
    light: '#3B82F6',
    DEFAULT: '#2563EB',
    dark: '#1D4ED8',
    100: '#DBEAFE',
    // ... 其他色階
  }
}
```

### 在 CSS 主檔中使用 `@layer` 來添加自定義 CSS

在 globals.css（或任何主 CSS 文件）中使用 `@layer` 指令來添加自定義 CSS：

```css title="src/app/globals.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

/*擴充專案的全站樣式*/
@layer base {
  h1 {
    @apply font-xl;
  }
}

/*自組元件*/
@layer components {
  .btn-primary {
    @apply rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75;
  }
}

/*自組樣式*/
@layer utilities {
  .filter-none {
    filter: none;
  }
}
```

- `base`：基於 normailize 的 CSS reset
- 如果要使用 Tailwind 自己的 utilities 樣式可以用 `@apply`

## 響應式設計 (RWD)

> [Responsive Design - Tailwind](https://tailwindcss.com/docs/responsive-design#mobile-first)

Tailwind CSS 採用 Mobile-First 的策略。意思就是先做手機版、再做電腦版，在撰寫 utility class 時未加前綴的代表小型設備，加上斷點前綴的 class 則針對更大的設備。

```javascript
<div class="text-sm md:text-lg lg:text-xl">
  這段文字在小螢幕上顯示為小字，在中等螢幕上顯示為大字，在大螢幕上顯示為更大的字。
</div>
```

#### min-width 的概念

- `@media(min-width: 768px){}`：最小 768 寬（也就是 768 以上才會套用）

- `min-width` 與 `max-width` 寫法差異

  ```css
  /* min-width: 數字由小寫到大*/
  @media (min-width: 768px){...}
  @media(min-width: 1024px){...}

  /* max-width: 數字由大寫到小*/
  @media(max-width: 1024px){...}
  @media(max-width: 768px){...}
  ```

Tailwind CSS 提供了五個預設的斷點：

![image-20240919151930002](/Users/yachu_hsieh/Library/Application Support/typora-user-images/image-20240919151930002.png)

## Ref

- [Tailwind CSS under the hood](https://arc.net/l/quote/qvtmmtnv)
- [Tailwind 入門介紹：環境設定、核心概念、運作方式](https://useme.medium.com/tailwind-%E5%85%A5%E9%96%80%E4%BB%8B%E7%B4%B9-%E6%A6%82%E5%BF%B5%E5%8F%8A%E9%81%8B%E4%BD%9C%E6%96%B9%E5%BC%8F-c2cb890f86ec)
- [Tailwind CSS 新手上路：概念、安裝與工具推薦](https://medium.com/@Kelly_CHI/tailwind-css-introduction-and-tools-68e770b2bf7f)
- [善用 data-attributes 為 Tailwind CSS 設定動態樣式](https://vocus.cc/article/66003838fd8978000173824c)

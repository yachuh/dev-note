---
tags: [CSS, Sass, Mixin, RWD]
slug: sass-mixin-rwd
---

# [CSS] Sass: Mixin & RWD

## Sass

Sass (Syntactically awesome style sheets)

- 2007 年發布，用於管理 CSS ([wiki](<https://en.wikipedia.org/wiki/Sass_(stylesheet_language)>)）
- 原理：Sass -> 編譯器編譯 -> CSS （瀏覽器還是只看得懂 CSS）

#### 使用 Sass 的好處

- 支援巢狀寫法
- 有變數的概念

### Sass 的兩種寫法

Sass 是程式語言，有兩種格式寫法

```css
/* SCSS */
.menu {
  ui {...}
  li {...}
  a {...}
}

/* SASS */
.menu
  ...
  ul
    ...
  li
    ...
  a
    ...
```

#### Scss（較常見）：

> 有 `{}`

- SCSS 內直接寫 CSS 也是可以的
- 縮排方式：用 `{}`

#### Sass (Sassy CSS)

> 沒有 `{}`（縮排語法，the indented syntax）

- 縮排方式：用兩個空白（一個 tab)縮排
- 結尾沒有 `;`，語法中間要加一個空白

### 編譯

通常透過三種方式編譯：

1. 軟體，例如：prepros
2. 前端任務/打包工具：gulp, webpack
3. 網頁編輯器（e.g. VS Code) 內建的插件，例如：Live Sass Compiler

### 連結符號 "&"

> `&` 代表等同於上一層

原本是這樣寫：

```css
.logo {
  background: #ffffff;
  a {
    color: #000;
  }
  a:hover {
    color: pink;
  }
}
```

使用 `&`：

```css
.logo {
  background: #ffffff;
  a {
    color: #000;
    &:hover {
      color: pink;
    }
  }
}
```

### 變數

```css
$varName: value;
```

- `$` 符號開頭
- `:` 指定 value

:::warning
編譯器順序是**由上至下**執行，需要在前面定義變數，後面才能使用
:::

#### 變數格式

- number 數字
- string 字串
- color 顏色
- boolean 布林值
- null 空值

#### 支援運算

```css
$font-m: 16px;
$font-l: $font-m * 1.2;
```

#### 字串管理

```css
$font-family-base: 'Helvetica, Arial, sans-serif';
$font-family-title: 'monospace';

body {
  font-family: $font-family-base;
}
```

### 使用 darken, lighten 功能調整顏色

Sass 內建的顏色功能

```css
background-color: darken( #fff, 10%)
background-color: lighten($color, 20%)
```

- 顏色可以使用變數 `$` 或是色碼 `#`
- `%`：變量程度

#### 實際應用範例

##### 主色系

```css
$primary: $blue !default;
$secondary: $gray-600 !default;
$success: $green !default;
$info: $cyan !default;
$warning: $yellow !default;
$danger: $red !default;
$light: $gray-100 !default;
$dark: $gray-800 !default;
```

##### link

```css
$link-color: theme-color("primary") !default;
$link-decoration none !default;
$link-hover-color: darken($link-color, 15%) !default;
$link-hover-decoration: underline !default;
```

### 檔案管理

#### Sass import

```css
@import 'FileName';
@import './filepath';
```

![](https://i.imgur.com/0aPN5R5.png)

- `all.scss` 為主要檔案：通常只會有 `@import` ，來 import 其他所有 scss 檔案
  - import 也需注意先後順序 (dependency)
- 其他檔案檔名需加上下底線`_` ：代表拿來合併用，不會編譯出 css

#### 優化網頁結構

- 按模組/功能分門別類建檔
- 共通、可延用的檔案可以用於下次的專案

```css
@import 'variable';
@import 'reset'; //reset.css
@import 'mix';
@import 'layout';

//module
@import './module/button';
@import './module/video';
@import './module/form';
@import './module/table';

//page
@import './page/index';
@import './page/member';
@import './page/product';
@import './page/qa';
```

- 常見的優化結構

  - base：通用的全站設定

    - html, a, img

  - layout：不管哪些頁面都會出現的樣板

    - header, banner, footer.

  - components (or module)：以功能為導向，不以語意為導向

    - card, pagination...

  - utilities（目前的趨勢）：將常用的樣式都設計成 class，用 class 組出想要的樣式
    - font, color, margin...
    - e.g. Tailwind

:::info SCSS 影音教學補充

- [prepos 軟體安裝教學](https://courses.hexschool.com/courses/670051/lectures/11953744)
- [SCSS 寫法](https://courses.hexschool.com/courses/670051/lectures/11953745)
- [import 檔案拆分](https://courses.hexschool.com/courses/1eebd3/lectures/11953747)
- [mixin 工具篇](https://courses.hexschool.com/courses/1eebd3/lectures/11953748)
- [載具篇 - @mixin+@content 設計響應式設計超方便](https://courses.hexschool.com/courses/1eebd3/lectures/11953749)
- [結構篇 - 如何循序漸進優化網頁架構](https://courses.hexschool.com/courses/1eebd3/lectures/11953750)
  :::

## Mixin

使用 `@mixin` 來設定 mixin：

```css
@mixin mixName {
  prop1: value1;
  prop2: value2;
}
```

使用 `@include` 引用設定：

```css
tagName {
  @include mixName;
}
```

範例：

```css
@mixin mixName {
  color: blue;
  font-size: 24px;
}

.header h1 {
  @include mixName;
  background: #fff;
}
```

### Mixin 的好處

幫你記住 CSS 技巧，不用因為回想原理而中斷。

我們可以將一些常見的 CSS 技巧寫成 mixin：

#### 圖片取代文字

```css
@mixin hide-text {
  text-indent: 110%;
  white-space: nowrap;
  overflow: hidden;
}

.header h1 {
  background: url('../logo.png');
  @include hide-text;
}
```

- 兼容各瀏覽器的 inline-block 寫法
- 各 CSS3 語法瀏覽器支援解決方案
- 清除浮動解決方案 (clearfix)
- 用 CSS 畫各方向的三角形

### Mixin 搭配參數

```scss
@mixin mixName($var1, $var2, $var3);
```

範例：

```css
@mixin circle($size, $bgcolor, $fontcolor) {
  border-radius: 50%;
  height: $size;
  width: $size;
  background: $bgcolor;
  font-size: $size / 3;
  color: $fontcolor;
}

.box1 {
  @include circle(30px, #fff, #000);
}
```

### 透過 Mixin 處理 RWD

常見的螢幕尺寸斷點規劃：

- PC：**1200px**(最大)
- iPad: **768px**
- iPad 以下：767px
- iPhone 6 Plus - 414px (視專案族群)
- iPhone 6 - 375px (視專案族群)
- iPhone 5、SE - **320px**（最小）

:::info

- 查詢自己的螢幕寬度：https://bestfirms.com/what-is-my-screen-resolution/
- Bootstrap break points: https://getbootstrap.com/docs/5.1/layout/breakpoints/
  :::

在 CSS 中原本需要這樣寫：

```css
/* 768 以下的時候裡面的樣式會被開啟 */
@media (max-width: 768px){
    ...
}


/* 320 以下的時候裡面的樣式會被開啟 */
@media (max-width: 375px){
    ...
}
```

使用 Mixin 來撰寫：

1. 設定 mixin: `_mixin.scss`

   ```css
   @mixin pad {
     @media (max-width: 768px) {
       @content;
     }
   }

   @mixin mobile {
     @media (max-width: 375px) {
       @content;
     }
   }
   ```

2. 使用 mixin：`all.scss`

   ```css
   .conatiner {
     width: 800px;

     @include mobile {
       width: 280px;
     }
   }
   ```

## Ref

- [六角學院 SCSS 教學](https://hackmd.io/uPxlkTx3SouDFyRWKpPx4Q)
- [Flex RWD 排版方式](https://hackmd.io/@hexschool/r1lnIUMVc)
- [火箭隊培訓營相關課程](https://courses.hexschool.com/courses/enrolled/1497558)

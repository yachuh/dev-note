# [CSS] Fonts

:::info

- [Browse Fonts - Google Fonts](https://fonts.google.com/)
- [System font](https://css-tricks.com/snippets/css/system-font-stack/)
  :::

The `font` property is a shorthand property for:

- `font-style`: normal, italic, oblique
- `font-variant`: small-caps
- [`font-weight`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-weight): 100~900
  - 100 / thin (hairline)
  - 200 / extra light (ultra light)
  - 300 / light
  - 400 / normal (regular)
  - 500 / medium
  - 600 / semi bold
  - 700 / bold
  - 800 / extra bold (ultra bold)
  - 900 / black (heavy)
- `font-size` / `line-height`
- `font-family`: Arial, sans-serif...

## font-family 字型

```CSS
body{
    font-family:第一種字體, 第二種字體, "第三種 字體", "通用字";
}
```

- 預設字體順序：英文字型 > Linux系統 > Mac系統 > Windows > 基礎字體
  - **用越少的放愈前面**，例：如果中文字型放前面就會讀不到後面的英文字體
- 字體間用逗號 `,` 隔開
- 字體名稱有空格需加上雙引號 `""`，像是 `"Noto Sans"`

### 通用字

- **sans-serif 無襯線體**：Arial、Arial Black、Arial Narrow、Charcoal、Geneva、Impact、Trebuchet MS、Tahoma、Verdana
- **serif 襯線體**: Georgia、Times New Roman、Times
- **monospace 等寬體**: Courier New
- **cursive 手寫體**: Comic Sans MS
- **fantasy 幻想體**: Copperplate、Papyrus

#### 系統預設字體

```CSS
body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", Roboto, "Helvetica Neue", Arial, sans-serif;
}
```

- `BlinkMacSystemFont` - mac, IOS 系統字體
- `"Segoe UI"` - Windows 英文系統字（過去是使用 Arial）
- `"Microsoft JhengHei"` - 微軟正黑體
- `Roboto` - Android 系統字
- `"Helvetica Neue"` - IOS 系統字
- `Arial`, `sans-serif` - 通用字體

:::info
Ref.

- [系統預設字體介紹](https://www.casper.tw/design/2018/10/25/fonts/)
- [CSS font-family 詳細介紹](https://www.oxxostudio.tw/articles/201811/css-font-family.html)
- [如何使用 Google Fonts](https://hackmd.io/@YmcMgo-NSKOqgTGAjl_5tg/HJpJk8ABU/https%3A%2F%2Fhackmd.io%2F2nenMilfR7WSJSDI4WzcWA%3Fview)
- [CSS 設定中英文不同的問題](https://wcc723.github.io/sass/2014/02/21/font-code-range/)
- [CSS 網頁字型 @font-face 使用教學與範例 - G. T. Wang](https://blog.gtwang.org/web-development/css-font-face/)
  :::

## line-height 行高

常見設定方法

- 用倍數
- 只會統一設定在以下地方

  ```css
  body {
    line-height: 1.5; /* 16*1.5=36px */
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.2;
  }
  ```

## font-size 字體大小

#### `px`, `em`, `rem`

- Absolute Units: `px`
- Relative Units:
  - `em`: Relative to the **parent** element
  - `rem` : Relative to the **root** element (HTML tag)
  - `%`: Relative to the parent element; reflects a percentage of the parent element’s size, regardless of the viewport’s size.
  - `VW`: Relative to the viewport’s width
  - `VH`: Relative to the viewport’s height

:::info
Ref. [What’s The Difference Between PX, EM, REM, %, VW, and VH?](https://elementor.com/help/whats-the-difference-between-px-em-rem-vw-and-vh/)
:::

```css
body {
  font-size: 16px; /* 意思是 1rem = 16px */
}

h1 {
  font-size: 3rem; /* 3*16=48px */
}
```

:::warning
**為什麼要用 rem？**
設計師通常會使用倍數去設定字級（字的大小），寫成 rem 會有倍數關係且容易更動
:::

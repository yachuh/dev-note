# [CSS] 水平與垂直置中的各種方法

> 使用 CSS 將 div 內的文字(inline element)或另一個 div (block element) 水平垂直置中的方法

在網頁排版的時候經常會遇到需要水平（左右）、垂直（上下）置中的排版設計，同時也是前端面試的時候經常被問到的基礎考題。

可以先判斷要置中的元素：

1. 是**行內元素(inline element)還是區塊元素(block element)**
2. 想要**水平置中**還是**垂直置中**（或兩者皆是）

來分別對應不同的 CSS 置中方法。

## 文字水平垂直置中

行內元素（例如：文字）的置中方式。

### flex（最推薦）

> 最推薦使用，與各瀏覽器相容度高。

使用 flexbox 排版 `display: flex` 搭配屬性 `justify-content`（主軸對齊方式）、 `align-items` （交錯軸對齊方式）來將 div 裡的文字置中。

-   在父層(container) `div` 下 `display: flex;`

#### 水平置中

-   -v加上 `justify-content: center;` 屬性來讓主軸（水平）置中對齊

#### 垂直置中

加上 `align-items: center;` 屬性來讓交錯軸（垂直）置中對齊

#### 水平垂直置中

綜合以上即可達到水平、垂直置中：

```css
div {
    display: flex;
    justify-content: center; /* 水平置中 */
    align-items: center; /* 垂直置中 */
}
```

### line-height & text-align（較不推薦）

> 較不推薦使用。不夠彈性，只能用在單行文字的垂直置中。

-   `text-align` 大家應該不陌生，設定文字對齊方式 `text-align: center;` 來將文字水平置中。
-   `line-height` 的作用顧名思義就是設定了文字的行高，文字會放置在這一行空間的垂直置中位置。

假設文字的尺寸 (font-size) 是 12px，行高 (line-height) 是 20px，那麼文字會被置於在高 20px 的行盒 (line box) 中，上下會各留有 4px 的距離。

#### 水平置中

-   設定 `text-align: center;` 將文字水平置中

#### 垂直置中

-   將 `line-height` 與 `div` 設定同高，就可以做到單行文字垂直置中的效果

#### 水平垂直置中

綜合以上即可達到水平、垂直置中：

```css
div {
    background: yellow;
    width: 500px;
    height: 100px;
    line-height: 100px; /* 文字垂直置中 */
    text-align: center; /* 文字水平置中 */
}
```

試著將文字反白可以看到行高是佔滿整個 div 的：
![img](https://cdn.hashnode.com/res/hashnode/image/upload/v1694503569596/9c13b542-df57-468d-8a62-ffb9a6cd078b.png?auto=compress,format&format=webp)

### table + vertical-align（少用）

> 較少使用。

將要置中的元素當成 table-cell 就可以使用 `vertical-align` 樣式來將內容垂直置中。由於是文字所以一樣可以透過 `text-align: center;` 將文字水平置中。

#### 水平置中

-   設定 `text-align: center;` 將文字水平置中

#### 垂直置中

-   在父層下 `display: table;` 將元素轉為 table
-   在子層下 `display: table-cell;`

#### 水平垂直置中

綜合以上即可達到水平、垂直置中：

```css
/* 父層 div */
.parent {
    display: table;
}
/* 子層 p */
.child {
    display: table-cell;
    vertical-align: middle; /* 表格文字垂直置中 */
    text-align: center; /* 表格文字垂直置中 */
}
```

## div 水平垂直置中

區塊元素的置中方式。

### flex（推薦）

使用 flexbox 排版 `display: flex` 搭配屬性 `justify-content`（主軸對齊方式）、 `align-item` （交錯軸對齊方式）來將父層 div 裡的子層 items 置中。

-   在父層(container) `div` 下 `display: flex;`

#### 水平置中

-   加上 `justify-content: center;` 來讓主軸（水平）置中對齊

#### 垂直置中

-   加上 `align-items: center;` 來讓交錯軸（垂直）置中對齊

#### 水平垂直置中

綜合以上即可達到水平、垂直置中：

```css
div {
    display: flex;
    justify-content: center; /* item 水平置中 */
    align-items: center; /* item 垂直置中 */
}
```

### grid（推薦）

-   在父層 `div` (container) 下 `display: grid;`
-   加上 `place-items: center;` 或是 `place-content: center;` 來將子層 `div` 水平、垂直置中排列

```css
.parent {
    display: grid;
    place-items: center; /* 或使用 place-content: center; */
}
```

#### place-items vs. place-content

雖然 `place-items: center;` 和 `place-content: center;` 都可以用於將 Grid 佈局內的子元素水平和垂直置中，但在意義中仍有不同之處：

##### place-items

`place-items` 屬性是 `align-items` 和 `justify-items` 的簡寫

-   `align-items` 控制 Grid 容器內所有**子元素**在**垂直**方向上的對齊方式
-   `justify-items` 控制 Grid 容器內所有**子元素**在**水平**方向上的對齊方式

`place-items: center;` 會將 Grid 容器內的所有**子元素**都**水平**和**垂直置中**對齊。

##### place-content

`place-content` 屬性是 `justify-content` 和 `align-content` 的簡寫

-   `align-content` 控制 Grid 容器內所有**行**的對齊方式
-   `justify-content` 控制Grid容器內所有**列**的對齊方式

`place-content: center;` 會將 Grid 容器的內容（即**子元素佔據的所有行和列**）**水平**和**垂直置中**對齊。

### Position: absolute + transform

利用 `position: absolute;` 絕對定位，搭配 `transform: translate(value, value);` 將元素位移來達到水平、垂直置中。

#### 先設定絕對定位

-   在父層 `div` 下 `position: relative;`
-   在子層 `div` 下 `position: absolute;`

接著再增加下列 CSS 屬性來達到水平或是垂直置中：

#### 水平置中

-   加上 `left: 50%;` 將子層 `div` 左邊界設定在父層 `div` 寬度一半的位置
-   加上 `transform: translateX(-50%)` 將超過的部分修正回來

#### 垂直置中

-   加上 `top: 50%;` 將子層 `div` 上邊界設定在父層 `div` 高度一半的位置
-   加上 `transform: translateY(-50%)` 將超過的部分修正回來

#### 水平垂直置中

-   綜合 `top: 50%;` 與 `left: 50%;` 將子層 `div` 置於父層 `div` 高度與寬度一半的位置，但此時可以看到，元素並非位於畫面的正中間
-   加上 `transform: translate(-50%, -50%)` 給予負值，將超過的 X 軸與 Y 軸部分修正回來

```css
/* 父層 div */
.parent {
    position: relative;
}
/* 子層 div */
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

:::note
[transform - CSS | MDN (](https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform)[mozilla.org](http://mozilla.org/)[)](https://developer.mozilla.org/zh-TW/docs/Web/CSS/transform)
:::

### margin auto

> `margin: auto` 會將剩餘的空間平均分配給四周

這邊的 `auto` 意思是瀏覽器會自動將剩餘的空間平均分配。由於 margin 的預設值四邊都是 0，所以左右剩餘空間會是一樣的，藉此來達到水平置中的效果。

:::important
由於 `auto` 會將剩餘空間分配，因此

-   `margin-left: auto` 會使元素**靠右**擺放
-   `margin-right: auto` 會使元素**靠左**擺放

:::

#### 水平置中：width + margin auto

將在想要置中的元素（子層 `div` ）：

-   設定寬度 `width`：一定要設置寬度，避免該元素從左到右撐滿容器（使用 `max-width` 是更理想的做法，可以避免當瀏覽器寬度小於元素寬度時出現 x 軸）
-   加上 `margin: 0 auto;` 將左右（水平）的外邊距設定為 `auto` ：這代表瀏覽器會自動將剩餘的空間平均分配給左、右外邊距，於是就達成了水平置中的效果

```css
.child {
    max-width: 100px;
    margin: 0 auto; /* 或使用 margin: auto; */
}
```

這邊將 `margin: 0 auto;` 寫成 `margin: auto;` 效果也是一樣的（水平置中），雖然後者比起前者多將垂直（上下）方向的外邊距也設定為 `auto` ，但並沒有達到垂直置中的效果。

換句話說，如果是想將元素垂直置中，即使按照上述的邏輯改為設定垂直方向的 `margin: auto 0;` 也無法達成垂直置中效果。

:::note 延伸閱讀
關於 `margin: auto` 與 `margin: 0 auto` 的差異可以參考這篇：[[CSS學習筆記\] 關於margin: auto和margin:0 auto水平置中 | 我在路易莎的日子 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天 (](https://ithelp.ithome.com.tw/articles/10286668)[ithome.com.tw](http://ithome.com.tw/)[)](https://ithelp.ithome.com.tw/articles/10286668)
:::

#### 為什麼 margin auto 無法達到垂直置中效果

這是由於 margin 在水平和垂直方向上的效果略有不同。

[CSS 文件中](https://www.w3.org/TR/CSS22/visudet.html#Computing_widths_and_margins) 關於 margin 在水平方向上的作用：

> ['margin-left'](https://www.w3.org/TR/CSS22/box.html#propdef-margin-left) + ['border-left-width'](https://www.w3.org/TR/CSS22/box.html#propdef-border-left-width) + ['padding-left'](https://www.w3.org/TR/CSS22/box.html#propdef-padding-left) + ['width'](https://www.w3.org/TR/CSS22/visudet.html#propdef-width) + ['padding-right'](https://www.w3.org/TR/CSS22/box.html#propdef-padding-right) + ['border-right-width'](https://www.w3.org/TR/CSS22/box.html#propdef-border-right-width) + ['margin-right'](https://www.w3.org/TR/CSS22/box.html#propdef-margin-right) = width of [containing block](https://www.w3.org/TR/CSS22/visudet.html#containing-block-details)
>
> If both ['margin-left'](https://www.w3.org/TR/CSS22/box.html#propdef-margin-left) and ['margin-right'](https://www.w3.org/TR/CSS22/box.html#propdef-margin-right) are 'auto', their used values are equal. This horizontally centers the element with respect to the edges of the containing block.
>
> — 10.3.3 Block-level, non-replaced elements in normal flow

「包含塊(containing block)」的寬度是由 width 本身，加上左右 padding、左右 border、左右 margin 所組成。因此當 `margin-left` 和 `margin-right` 都設置為 `auto` 時，它們會平均分配剩餘的空間，這樣就實現了水平置中。

[CSS 文件中](https://www.w3.org/TR/CSS22/visudet.html#normal-block) 關於 margin 在垂直方向上的作用：

> If ['margin-top'](https://www.w3.org/TR/CSS22/box.html#propdef-margin-top), or ['margin-bottom'](https://www.w3.org/TR/CSS22/box.html#propdef-margin-bottom) are 'auto', their used value is 0.
>
> — [10.6.3 Block-level non-replaced elements in normal flow when 'overflow' computes to 'visible'](https://www.w3.org/TR/CSS22/visudet.html#normal-block)

可以得到結論：

-   當 `margin-left` 和 `margin-right` 都是 auto，則它們的**值相等**，進而使元素在容器中水平居中對齊
-   當 `margin-top` 和 `margin-bottom` 都是 auto，則它們的**值都為 0**，因此也無法使元素在容器中垂直居中對齊

#### 水平垂直置中：margin auto + flex | grid

-   在父層 `div` 下 `display: flex | grid | inline-flex | inline-grid;`
-   在子層 `div` 下 `margin: auto;` 來達成水平、垂直置中的效果

那為什麼這邊的 `margin: auto;` 又對垂直置中有作用了呢？

因為 flex box 和 grid 的佈局系統讓元素的對齊和佈局更加靈活了，在這些佈局中 `margin: auto;` 可以用於實現元素的水平和垂直置中。

-   Flexbox：將 `margin: auto;` 用於 Flex 容器內的子元素，可以使子元素在**垂直和水平方向上**都居中對齊。
-   Grid：將 `margin: auto;` 用於 Grid 容器內的子元素，可以使子元素在**網格單元格**中水平和垂直置中。

# Ref

-   [[CSS\] 垂直置中的方法 | PJCHENder 未整理筆記](https://pjchender.dev/css/css-center-center/)
-   [Centering in CSS: A Complete Guide | CSS-Tricks](https://css-tricks.com/centering-css-complete-guide/)
-   [使用 Grid + margin 來達到垂直置中目的 - iT 邦幫忙::一起幫忙解決難題，拯救 IT 人的一天](https://ithelp.ithome.com.tw/articles/10206523)
-   [Why does margin-top:auto and margin-bottom: auto not work ? : r/webdev](https://www.reddit.com/r/webdev/comments/5ttih0/why_does_margintopauto_and_marginbottom_auto_not/)
-   [探秘 flex 上下文中神奇的自動 margin，乾貨！網友都感動哭了](https://kknews.cc/zh-tw/code/pl88x5p.html)

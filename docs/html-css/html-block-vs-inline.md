---
sidebar_label: '[HTML] 區塊元素 vs. 行內元素'
sidebar_position: 2
---

# [HTML] 區塊元素(block element) vs. 行內元素(inline element)

## 區塊元素 block element

```
display: block
```

-   另起一行呈現
-   盡可能佔滿整個版面（依照父元素的寬度）
-   可以設定寬、高
    -   應避免寫死高度，實際高度應由裡面元素的高度推擠而來

### 常見的區塊元素標籤

-   `<div>`：沒有語意，單純拿來排版的標籤
-   `<p>`：
    -   文字內容不是以文字大小來推出高度，而是以行距 `line-height` 來呈現高度
    -   不寫 `line-height` 時就是 1 倍
-   `<h1>`
-   `<ul>`、`<li>`

![](https://hackmd.io/_uploads/ByNNCNKlp.png)

## 行內元素 inline element

```
display: inline
```

-   比較常用在段落 `<p>` 裡面
-   沒辦法設定寬、高。如果要設定寬、高，就改成區塊元素： css 改成 `display: block`
-   不會換行

![](https://hackmd.io/_uploads/B1MS0EKe6.png)

### 常見的行內元素標籤

-   `<span>`：本身沒有任何語意，屬於排版用的 inline 標籤，用於點綴樣式，通常用來設定一段文字裡面某幾個字的特殊樣式。
-   `<b>`、`<strong>`：用於粗體字。
    -   `<b>` 取自 bold ，不帶語意，單純讓字體呈現粗體樣式。（通常不建議使用，若單純想要粗體字可以設定 CSS 樣式）
    -   `<strong>` 則帶有語意，用粗體字來強調一段內容特別重要。
-   `<i>`、`<em>`：用於斜體字。
    -   `<i>` 取自 italic 不帶語意，單純讓字體呈現斜體樣式。
    -   `<em>` 取自 emphasize，則帶有語意，用斜體字來強調一段內容特別重要。
-   `<input>` 、 `<textarea>` 、`<select>`
-   `<img>`
-   `<a>`

:::tip
實務上常將 `<a>` 設定成 `display:block` ，方便點擊
:::

## img

-   屬於**行內元素(inline element)**
-   屬於**空元素(empty element / void element)**：元素中沒有內容(HTML content)
-   屬於**自閉合標籤(self-closing tag)**：沒有結束標籤(closing tag)
-   利用屬性 `src` 來指定圖檔位址：`<img src="圖片位址">`
-   圖片下方都預設會有 3px 的距離

:::note
[css - HTML 5 strange img always adds 3px margin at bottom - Stack Overflow](https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom)
:::

### 如何清除 img 下方的多餘空白

1. 使用 `vertical-allign: middle`

    ```css
    img {
        vertical-allign: middle;
    }
    ```

2. 使用 `display: block`
    ```css
    img {
        display: block;
    }
    ```

## Ref

-   [\[HTML5\]b,i,s 跟 strong,em,del 這些看起來一樣，但意義不同的標籤們-HTML5 教學(nicetypo.com)](https://km.nicetypo.com/doc/ead903b94bb8bf01974d3ccdb91a117b)

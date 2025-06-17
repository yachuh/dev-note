# [HTML] Semantic HTML 語意化標籤

## HTML vs. HTML5

在 HTML5 以前的 HTML 著重在功能方面，例如 `<div>` 標籤是一個用來放其他內容的區塊、 `<p>` 標籤是一個用來放文字的段落。過去往往會再給予 `class` 或 `id` 來進一步說明或區別這類無語意(non-semantic)的標籤，像是： `<div class="nav">` 。

HTML5 新增了**語意化標籤**(Semantic Elements)，讓我們可以使用更合乎語意的標籤(tags)來開發，比方說在 HTML5 之前通通只能用 `<div>`，但現在可以使用 `<header>` 標籤來表示頁首、`<footer>` 標籤來表示頁尾，用 `<nav>` 標籤來標示網頁的導航區塊。

-   **非語意化標籤 non-semantic HTML**，像是 `<div>`、`<span>`、`<p>`...
-   **語意化標籤 semantic HTML**，像是 `<header>`、`<footer>`、`<section>`、`<nav>`、`<h1>~<h6>`...

## 使用語意化標籤的優點

### 提升網站可訪問性(accessibility)

提升各種設備（例如電子閱讀器、盲人閱讀器⋯）對於網站的理解程度，讓不同裝置都能解析網站內容，讓所有讀者都能公平地使用網頁、接收到正確的資訊，是身為一個開發者的責任。

> 關於「無障礙網頁」的介紹可以參考：[何謂無障礙網頁？ - 學習該如何開發 Web | MDN (](https://developer.mozilla.org/zh-TW/docs/Learn/Accessibility/What_is_accessibility)[mozilla.org](http://mozilla.org)[)](https://developer.mozilla.org/zh-TW/docs/Learn/Accessibility/What_is_accessibility)。

### 對 SEO 有幫助

使用符合語意的標籤能讓搜尋引擎的爬蟲 (search engine crawlers) 更瞭解網站的架構與內容，讓搜尋引擎更容易「看懂」你的網站，是影響 SEO 十分重要的因素之一。先前提到的「提升網站可訪問性」來確保每個人都能公平地獲取資訊，同樣也能增進 SEO。

### 提升程式碼的可讀性

使用語意化標籤來開發網站可以幫助開發者之間更容易理解網頁架構、減少理解成本與差異化。比如說統一使用 `<button>` 標籤來製作按鈕，只要看到這個標籤無須說明便會知道這是一個按鈕、具有可以點擊的特性及其他 `<button>` 標籤的原生功能。

## HTML 語意化標籤

HTML 語意化標籤根據**用途**可以分成兩個類別：

-   HTML 語意**結構**標籤 HTML Semantic Tags for **Structure**
-   HTML 語意**文字**標籤 HTML Semantic Tags for **Text**

## 語意結構標籤 semantic HTML tags for structure

用來讓網頁結構(layout)更為明確，將網頁分成像是標題、導覽、頁尾等區塊。

### `<header>` 頁首標籤

用於代表一個網頁的前言、說明或是相關連結，讓使用者知道網頁接下來的內容。

-   位於 `<body>` 內可以代表該網頁的頁首，通常用來放置網站的 logo 與標題；位於 `<article>` 或 `<section>` 內時，則代表文章或區塊內的首要區塊
-   `<header>` 標籤通常包含：
    -   至少一個標題標籤（heading tag，`<h1>-<h6>`）
    -   網站 logo 或是 icon
    -   作者資訊
-   一個網頁上可以有數個 `<header>` 標籤，但 `<header>` 不應被包含在 `<footer>`、`<address>` 或是其他 `<header>` 標籤中

```html
<article>
    <header>
        <h1>Things you need to know about semantic HTML</h1>
        <p>by Ya-Chu Hsieh</p>
    </header>
</article>
```

### `<nav>` 導覽列

用來擺放網頁選單的導覽區塊，幫助使用者探索網頁內容。

-   可以被放在 `<header>` 之中，代表網站的主選單
-   一個網站也可能有數個 `<nav>` 標籤，像是主選單、文章選單、頁尾選單等
-   並非所有連結都要使用 `<nav>` ，只要用於網頁中的主要導航區塊即可

```html
<nav>
    <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="contact.html">Contact</a></li>
    </ul>
</nav>
```

### `<main>` 主要區塊

代表該頁面的主要內容，用以展現該頁面的獨特性。

-   每個頁面**只能有一個** `<main>` 標籤
-   不應被放在 `<nav>`、`<article>`、`<aside>`、`<footer>`、`<header>` 內

```html
<main>
    <h1>我是文章標題</h1>
    <article>
        <p>床前明月光，疑似地上霜，舉頭望明月，低頭思故鄉。</p>
    </article>
</main>
```

### `<article>` 區塊

> Independent content：一個個體具有獨立性必須要是當周圍的元素移走之後，其內文不受影響，無需受制於上下文，依舊能將原意表達出來。

可以**獨立存在於該網站或應用程式之外**、**具有完整內容、可重複使用**的區塊。

像是部落格文章，任一篇獨立出來都能夠有其**獨立性**與**完整性**，不受限於網站載體、即使重複放到其他網站中也成立。但也不必受限於一定要是「一篇文章」，也有可能是一則留言、一個論壇中的回覆、氣象區塊中的一則當日天氣。

一個頁面可能有多個 `<article>` 標籤，例如文章列表頁面使用 `<article>` 包裝每則文章：

```html
<article>
    <h2>News 1</h2>
</article>

<article>
    <h2>News 2</h2>
</article>
```

### `<section>` 區塊

一個具有**主題性**的區塊，用來對內容進行分塊。比方說 tab 列表中不同的 tab 對話窗(tab dialog box)、對文章進行分段（章節），或是一個網站主頁可能會被拆分成代表說明、最新消息、聯繫資訊⋯等不同 section。

-   通常會搭配標題標籤來描述區塊的作用
-   如果只是單純進行排版建議使用 `<div>`，不要把 `<section>` 當作 `<div>` 來使用
-   `<section>` 的內容對外層的其他內容通常仍具有一定的**相依性**，`<article>` 則通常具有更高的**獨立性**、**完整性**

另外也需要注意，取決於內容的不同，可能是 `<article>` 中包含許多 `<section>`，也有可能是 `<section>` 中有很多 `<article>` 。

### `<aside>` 側欄

與當前主要內容無關的區塊，用來放置額外的附加資訊，像是側邊欄、廣告、其他連結、推薦文章。

### `<footer>` 頁尾

用來表示網頁的頁尾，通常位在網頁的最下方。用來放置作者、聯絡資訊、版權宣告、網站地圖(site map)等資訊。

## 語意文字標籤 semantic HTML tags for text

使文字的語意更為明確。

### `<h1>` 主標

最高層級的標題標籤，**一個頁面只會有一個 H1 標籤**。

### `<h2>~<h6>` 副標

依照重要性排序使用的副標題，數字愈小代表層級愈高。一個網頁可以有數個同級的副標籤。

### `<p>` (paragraph) 段落

用於標示一個獨立的段落。

### `<a>` (anchor) 連結

用來標示連結到其他網頁的超連結。關於 `<a>` 標籤的屬性以及用法可以參考：[HTML 超連結 - HTML 語法教學 Tutorial (](https://www.fooish.com/html/hyperlink-a-tag.html)[fooish.com](http://fooish.com/)[)](https://www.fooish.com/html/hyperlink-a-tag.html)。

### `<em>` 與 `<strong>` 強調

用來強調一段內容特別重要。

-   `<em>` (emphasis) 代表*斜體字，* `<strong>` (strongly emphasis) 代表**粗體字**
-   `<b>` (bold) 的粗體與 `<i>` (italic) 的斜體是不具語意的標籤。通常不建議使用，若單純想要粗體或斜體字可以設定 CSS 樣式。

### `<ol>` (ordered list) 有排序的項目列表

有排序的項目清單，預設是數字編號、由 1 開始。一個 `<li>` 代表清單中的一個項目。

### `<ul>` (unordered list) 無排序的項目列表

沒有順序的項目清單。一個 `<li>` 代表清單中的一個項目。

### `<q>` / `<blockquote>` 引用文字

用來表示引言、引用的文字。

-   `<blockquote>` 區塊元素(block element)，用來引用較多行的文字；使用後會以一個獨立的區塊呈現
-   `<q>` 行內元素(inline element)，用來引用較少的文字，作為現有段落的一部分；使用後會替引用文字的前後加上 `“”` 雙引號
-   `<cite>` 行內元素(inline element)，引用的作品的標題（圖片、書籍、歌曲、影片等作品名稱）；使用後會將文字改成斜體

### `<code>`

用來標示電腦程式語言的文字。

### `<time>`

用來標示特定的的日期與時間。搭配屬性 `datetime` 可以將時間轉換為機器可讀的格式，有更好的 SEO 效果。

```html
<p>發表日期：<time datetime="2018-10-01">2018年10月01日</time></p>
```

> 關於 `datetime` 撰寫格式可以參考：[HTML time datetime Attribute (](https://www.w3schools.com/tags/att_time_datetime.asp)[w3schools.com](http://w3schools.com/)[)](https://www.w3schools.com/tags/att_time_datetime.asp)

### `<mark>`

可以用來凸顯<mark>重要內容</mark>，預設底色為黃色，可以想像成用螢光筆畫重點的感覺。

### `<figure>`、`<figcaption>` 圖片與說明

-   `<figure>` 是一個容器(container)，用來放置自我獨立(self-contained)的內容，像是照片、圖表、程式碼片段等。
-   在 `<figure>` 中使用 `<figcaption>` 標籤來說明該區塊的標題。

```html
<figure>
    <img src="/images/semantic-html.png" alt="semantic-html" />
    <figcaption>HTML5 - Semantic HTML Layout</figcaption>
</figure>
```

# Ref

-   [Semantic HTML: What It Is and How to Use It Correctly (](https://www.semrush.com/blog/semantic-html5-guide/)[semrush.com](http://semrush.com/)[)](https://www.semrush.com/blog/semantic-html5-guide/)
-   [7 個你必須知道的semantic elements. HTML5帶給我們什麼新禮物? | by CHC1024 | 狗奴工程師 | Medium](https://medium.com/狗奴工程師/7-個你必須知道的semantic-elements-ccc8bbad5d)

---
sidebar_position: 1
---

# [HTML] HTML Fundamentals

## HTML

**HTML** (**H**ypertext **M**arkup **L**anguage) 全名為「超文字標記語言」，是一種用來組織網頁架構和內容的**標記語言(markup language)**，用來告訴瀏覽器該如何呈現網頁。

HTML 包含了一系列的**元素(element)**，透過使用不同的 **標籤(tag)** 來描述和組織網頁元素，如標題(`<h1>`~`<h6>`,heading)、段落(`<p>`, paragraph)、連結(`<a>`)、圖片(`<img>`)等。瀏覽器會讀取 HTML 文件並將其渲染成用戶可見的網頁。

```html
<!doctype html>
<html>
    <head>
        <title>Page Title</title>
    </head>
    <body>
        <h1>My First Heading</h1>
        <p>My first paragraph.</p>
    </body>
</html>
```

-   `<html>` element is the root element of an HTML page
-   `<head>` element contains **meta information** about the HTML page
-   `<title>` element specifies a title for the HTML page, which is shown in the browser's title bar or in the page's tab
-   `<body>` element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.
-   `<h1>` element defines a large heading
-   `<p>` element defines a paragraph

## DOCTYPE

**DOCTYPE** 是 **Document Type** 的縮寫，意思是**文件類型**。

這裡的文件指的是 HTML 文件，由於 HTML 在網頁技術發展過程中有許多不同的版本，DOCTYPE 的用途是要告訴瀏覽器該使用哪一種 HTML 版本，讓瀏覽器能正確解析和渲染網頁內容。

-   告訴瀏覽器網頁所適用的 HTML 版本（在文件第一行宣告）
-   HTML 版本不同，宣告方式也不同
-   最新版本是 2014 的 **HTML 5**

以前的宣告版本可能會看到這樣的寫法：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

現代 HTML5 的 DOCTYPE 寫法已經省去了較為冗長的宣告：

```html
<!doctype html>
```

## 標籤 Tag & 元素 Element

**HTML 元素** (HTML Element) 用來定義網頁的結構和內容。每個元素由標籤 (Tag) 和之間的內容組成，例如`<p>這是一個段落</p>`。

### 元素的組成

-   **標籤（Tags, 起始標籤、結束標籤）**：用來標示元素的開始與結束，組織與控制內容呈現的樣貌。
-   **內容 (Content)**：元素的內容，例如文本、圖片或其他內容。
-   **屬性 (Attribute)**：可以在標籤中添加屬性屬性來提供額外的資訊（例如色彩、說明、來源、對齊方式等）。屬性包含**名稱**與**值**，例如： `<img src="image.png" alt="圖片敘述">`的 `src` 跟 `alt` 都是屬性。

#### Self-Closing HTML tag

一般來說 HTML 元素都是由起始、結束標籤與其內容所組成，但有些標籤並不需要內容，也就不需要單獨的結束標籤，這種標籤稱作 self-closing tag（自關閉或自閉合標籤）。

常見的 self-closing tags：

-   `<br>`
-   `<hr>`
-   `<img>`

#### Anchor tag `<a>`

`<a>` 標籤被稱為超連結標籤或錨點標籤。用於創造超連結，將網頁內容連結到其他地方，可以指向其他網頁、文件甚至特定位置，讓使用者可以導航到不同的內容。

-   內部和外部導航：可以連結到不同的網站（外部 URL）或相同網站的不同位置（透過 `id`）
-   下載檔案：使用 `download` 屬性來觸發檔案下載

#### `<a>` 標籤的屬性

-   `href` (hypertext reference)：連結的目標 URL
-   `target`：決定如開啟連結（在原頁面跳轉或另開新分頁）
    -   "\_blank"：另開新分頁
    ```html
    <a href="" target="_blank">開新分頁</a>
    ```
-   `download`：用來觸發檔案下載

## HTML 註解

```html
<!-- 這裡面寫註解 -->
```

HTML 註解(comment)標籤(tag)是一種特殊語法，讓開發者在 HTML 中添加說明文字。註解會被瀏覽器忽略不顯示。

-   快捷鍵：`command + /`

## Form tags

```html
<form method="GET" action=""></form>
```

### form tag attributes

-   method="`POST` / `GET`"
-   action="action.php"：when submit, run the php file (not commonly used now)

### Input type

-   Text: `<input type="text">`
-   Email: `<input type="email" required>`
-   Password: `<input type="password" minLength="5">`
-   Date: `<input type="date">`
-   Radio:
    ```htmlembedded
    <input type="radio" name="gender" value="male">Male<br>
    <input type="radio" name="gender" value="female">Female<br>
    <input type="radio" name="gender" value="other">Other<br>
    ```
-   Checkbox
    ```htmlembedded
    <select>
        <option value="Volvo" name="volvo">Volvo</option>
        <option value="BMW" name="bmw">BMW</option>
        <option value="Audi" name="audi">Audi</option>
    </select>
    ```
-   Submit: `<input type="submit" value="Register!">`
-   Reset: `<input type="reset" value="Reset">`

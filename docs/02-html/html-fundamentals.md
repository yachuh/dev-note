---
sidebar_position: 1
---
# [HTML] HTML Fundamentals

## HTML

- HTML stands for **Hyper Text Markup Language**
- HTML is the standard markup language for creating Web pages
- HTML describes the structure of a Web page
- HTML consists of a series of **elements**
    ```htmlembedded
    <h1>This is a HIML element</h1>
    ```
- HTML elements **tell the browser how to display the content**
- HTML elements label pieces of content such as "this is a heading", "this is a paragraph", "this is a link", etc.

```htmlembedded
<!DOCTYPE html>
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
- `<!DOCTYPE html>` declaration defines that **this document is an **HTML5 document**
- `<html>` element is the root element of an HTML page
- `<head>` element contains **meta information** about the HTML page
- `<title>` element specifies a title for the HTML page, which is shown in the browser's title bar or in the page's tab
- `<body>` element defines the document's body, and is a container for all the visible contents, such as headings, paragraphs, images, hyperlinks, tables, lists, etc.
- `<h1>` element defines a large heading
- `<p>` element defines a paragraph


## HTML Tags

- Self-Closing HTML tags: `<br>`, `<hr>` , `<img>`
    - HTML attributes: such as `src`, `alt` ...
- Anchor tags
    - `<a></a>`
    - `href`: hypertext reference
    - `target`: "_blank"
        ```html
        <a href ="" target="_blank"></a>
        ```
    - relative path vs. absolute path
- Comment tag: `<!-- -->` (shortcut: `command + /` )
- `<div>` & `<span>`
    - `div`: block element, divide up the content into different section
    - `span`: inline element, could add just to a specific line

## Form tags
    
```htmlembedded
<form method="GET" action="">
</form>
```

### form tag attributes
- method="`POST` / `GET`"
- action="action.php"：when submit, run the php file (not commonly used now)

### Input type
- Text: `<input type="text">`
- Email: `<input type="email" required>`
- Password: `<input type="password" minLength="5">`
- Date: `<input type="date">`
- Radio: 
    ```htmlembedded
    <input type="radio" name="gender" value="male">Male<br>
    <input type="radio" name="gender" value="female">Female<br>
    <input type="radio" name="gender" value="other">Other<br>
    ```
- Checkbox
    ```htmlembedded
    <select>
        <option value="Volvo" name="volvo">Volvo</option>
        <option value="BMW" name="bmw">BMW</option>
        <option value="Audi" name="audi">Audi</option>
    </select>
    ```
- Submit: `<input type="submit" value="Register!">`
- Reset: `<input type="reset" value="Reset">`

### HTML vs. HTML 5

HTML5 offers new semantic elements to make websites more descriptive (search engines crawlers friendly).
- `<header>`
- `<article>`
- ...
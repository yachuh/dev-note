# [HTML] DOCTYPE

**DOCTYPE** 是 **Document Type** 的縮寫，意思是**文件類型**。

這裡的文件指的是 HTML 文件，由於 HTML 在網頁技術發展過程中有許多不同的版本，DOCTYPE 的用途是要告訴瀏覽器該使用哪一種 HTML 版本，讓瀏覽器能正確解析和渲染網頁內容。

- 告訴瀏覽器網頁所適用的 HTML 版本（在文件第一行宣告）
- HTML 版本不同，宣告方式也不同
- 最新版本是 2014 的 **HTML 5**

以前的宣告版本可能會看到這樣的寫法：

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
```

現代 HTML5 的 DOCTYPE 寫法已經省去了較為冗長的宣告：

```html
<!doctype html>
```

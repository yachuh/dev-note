# [CSS] 移除 img 下方的多餘空白

使用 img 標籤時會發現圖片下方會有多餘的空白。原來是因為 img 標籤預設會有 3px 的距離（Ref: [css - HTML 5 strange img always adds 3px margin at bottom - Stack Overflow](https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom)）
    
#### 清除圖片下方的多餘空白
可以使用 `vertical-allign` 或 `display:block;` 來清除圖片下方的多餘空白：
```css
img {
    vertical-allign: middle;
}

/* OR */

img {
    display: block;
}
```

# Ref
- [css - HTML 5 strange img always adds 3px margin at bottom - Stack Overflow](https://stackoverflow.com/questions/10844205/html-5-strange-img-always-adds-3px-margin-at-bottom)

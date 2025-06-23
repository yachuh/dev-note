# [CSS] Background

## background-color

Transparency

- `opacity`: 0.0 - 1.0. The lower value, the more transparent
- `rgba`: The *alpha* parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
  ```css
  div {
    background: rgba(0, 128, 0, 0.3); /* Green background with 30% opacity */
  }
  ```

## background-image

```css
body {
  background-color: #ffffff;
  background-image: url('img_tree.png');
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: fixed;
}
```

- `background-repeat`: By default, the `background-image` property repeats an image both horizontally and vertically.
  - `repeat-x` (repeated only horizontally)
  - `no-repeat`
- `background-attachment`:
  - `scroll`
  - `fixed`
- `background-position`

## `background` (shorthand property)

Specify all the background properties in one single property.

```css
body {
  background: #ffffff url('img_tree.png') no-repeat right top;
}
```

When using the shorthand property the order of the property values is:

1. `background-color`
2. `background-image`
3. `background-repeat`
4. `background-attachment`
5. `background-position`

### 圖片取代文字技巧：以 logo 為例

```css
.header h1 a {
  background-image: url(.../img/logo.png);
  display: block;
  text-indent: 101%;
  overflow: hidden;
  whitespace: nowrap;
}
```

- `text-indent: 101%;` 首行縮排
- `over-flow: hidden;` 超出 div 寬度的話隱藏
- `whitespace: nowrap;` 不斷行

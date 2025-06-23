# [CSS] Basics

CSS stands for "Cascading Style Sheets"

CSS format:

```css
Selector {
  property: value;
}
```

## Adding CSS

Three ways to add CSS:

1. External CSS (in the `<head>` section): use **`<link>`** tag
   ```html
   <head>
     <title>My first CSS website!</title>
     <link rel="stylesheet" type="text/css" href="style.css" />
   </head>
   ```
   - `rel` - relationship: `stylesheet`
   - `type` - media type: `text/css`
   - `href` - **H**ypertext **REF**erence: `style.css` (file path)
2. Internal CSS (in the `<head>` section): The internal style is defined inside the **`<style>`** element, inside the head section
   ```html
   <head>
     <title>My first CSS website!</title>
     <style>
       li {
         background-color: green;
       }
     </style>
   </head>
   ```
3. Inline CSS (inside an HTML element): add the **style** attribute to the relevant element: `style=""`
   ```html
   <h1 style="color:blue;text-align:center;">This is a heading</h1>
   ```

:::info
💡 The value from the last read style sheet will be used. So an **inline style has the highest priority**, and will override external and internal styles and browser defaults.
Ref. [How to add CSS (w3schools.com)](https://www.w3schools.com/css/css_howto.asp)
:::

## Cascading Order

### CSS Syntax

![CSS syntax](https://i.imgur.com/v4zLx1S.png)

- **Selector**: the selector points to the HTML element you want to style.
- **Declaration** block: the declaration block within `{}` contains one or more declarations separated by semicolons: `{Property1: Value1; Property2: Value2}`

## CSS Properties

:::info

- [CSS Tricks - CSS Almanac](https://css-tricks.com/almanac/): find all CSS properties
- [Paletton - The Color Scheme Designer](https://paletton.com/#uid=13D0u0kllllaFw0g0qFqFg0w0aF): an online color picker
  :::

## CSS Selectors

5 categories of CSS selectors

### 1. Simple selectors

Select elements based on name, id, class.

- `HTML tag`: such as `h1`, `div`...etc.
- `.class`: select a group of elements
  - `element.class`: select only specific HTML elements with the class
  - `<p class="center large">`: an element can have more than one class
- `#id` : unique (should prevent using id)
- `*`: all elemnets

### 2. [Combinator selectors](https://www.w3schools.com/css/css_combinators.asp)

Select elements based on a specific relationship between them.

- `element, element` - (,)
- `element element` - descendant selector (space)
- `element > element` - child selector (>)
- `element + element` - adjacent sibling selector (+)
- `element ~ element` - general sibling selector (~)

#### 3. [Pseudo-class selectors](https://www.w3schools.com/css/css_pseudo_classes.asp)

Select elements based on a certain state): to define a special state of an element.

- Anchor Pseudo-classes
  - `element:link`
  - `element:visited`
  - `element:hover`
  - `element:active`
- `:first-child` Pseudo-class
- `:last-child` Pseudo-class

### 4. [Pseudo-elements selectors](https://www.w3schools.com/css/css_pseudo_elements.asp) 

Select and style a part of an element.

### 5. [Attribute selectors](https://www.w3schools.com/css/css_attribute_selectors.asp)

Select elements based on an attribute or attribute value.

::: info

- [CSS Selectors Reference (w3schools.com)](https://www.w3schools.com/cssref/css_selectors.asp)
- [Cascade and inheritance - Learn web development | MDN (mozilla.org)](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Cascade_and_inheritance)
- [CSS Diner](https://css-diner.netlify.app/)
  :::

## CSS Comments

```css
/*** This is a single-line comment ***/
```

## CSS Backgrounds

:::info
[CSS - Background](/CumEsJrJR9aagb934oRFAg)
:::

### `background-color`

- Transparency
  - `opacity`: 0.0 - 1.0. The lower value, the more transparent
  - `rgba`: The *alpha* parameter is a number between 0.0 (fully transparent) and 1.0 (fully opaque).
    ```css
    div {
      background: rgba(0, 128, 0, 0.3); /* Green background with 30% opacity */
    }
    ```

### `background-image`

```css
body {
  background-color: #ffffff;
  background-image: url('img_tree.png');
  background-repeat: no-repeat;
  background-position: right top;
  background-attachment: fixed;
}
```

- `background-repeat`: repeat-x (repeated only horizontally), no-repeat
  (By default, the `background-image` property repeats an image both horizontally and vertically.)
- `background-attachment`: background image should scroll or be fixed. scroll or fixed
- `background-position`

### `background` (shorthand property)

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

## CSS borders

Border - Shorthand Property

The `border` property is a shorthand property for the following individual border properties:

- `border-width`
- `border-style` (required)
- `border-color`

## Fonts, Images, Box Model

### Fonts

[CSS - Fonts](/qkRM9O3NR6-am5KhQSWxdA)

### Image

```css
img {
  float: left;
}

footer {
  clear: both;
}
```

Remove extra space under image:

```css
img {
  display: block;
}

/* OR */

img {
  vertical-align: middle;
}
```

### Box model

```CSS
*, *::before, *::after {
    box-sizing: box-border;
}
```

## Icons

Icon libraries:

### Font Awesome

To use the Font Awesome icons, go to [fontawesome.com](https://fontawesome.com/), sign in, and get a code to add in the `<head>` section of your HTML page:

```html
<script
  src="https://kit.fontawesome.com/*yourcode*.js"
  crossorigin="anonymous"
></script>
```

Read more about how to get started with Font Awesome in our [Font Awesome 5 tutorial](https://www.w3schools.com/icons/fontawesome5_intro.asp).

### Google Icons

To use the Google icons, add the following line inside the `<head>` section of your HTML page:`<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`

```html
<!doctype html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
  </head>
  <body>
    <i class="material-icons">cloud</i>
    <i class="material-icons">favorite</i>
    <i class="material-icons">attachment</i>
    <i class="material-icons">computer</i>
    <i class="material-icons">traffic</i>
  </body>
</html>
```

## Links

#### Link States

- `a:link` - a normal, unvisited link
- `a:visited` - a link the user has visited
- `a:hover` - a link when the user mouses over it
- `a:active` - a link the moment it is clicked

When setting the style for several link states, there are some order rules:

- `a:hover` MUST come after `a:link` and `a:visited`
- `a:active` MUST come after a:hover

## Lists

## Block vs Inline Elemenets

### Block-level Elements

A block-level element always **starts on a new line** and **takes up the full width** available (stretches out to the left and right as far as it can).

Examples of **block-level elements**

- `<div>`
- `<h1>` - `<h6>`
- `<p>`
- `<form>`
- `<header>`
- `<footer>`
- `<section>`

#### Inline Elements

An inline element does not start on a new line and only takes up as much width as necessary.

Examples of **inline elements**

- `<span>`
- `<a>`
- `<img>`

### Display

#### `display: none;`

`display: none;` is commonly used with JavaScript to hide and show elements without deleting and recreating them. The element will be hidden, and the page will be displayed as if the element is not there.

- The `<script>` element uses `display: none;` as default.
- `visibility:hidden;` also hides an element. However, the element will still take up the same space as before. The element will be hidden, but still affect the layout:

#### `display: flex;`

## CSS Transitions & Transforms

Ref. https://thoughtbot.com/blog/transitions-and-transforms

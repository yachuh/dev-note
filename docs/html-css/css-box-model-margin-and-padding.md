# [CSS] - Box Model, Margin and Padding

## Box Model

Box Model 主要由四個部分主成：

- 外邊距 (Margin)
- 邊框 (Border)
- 內邊距 (Padding)
- 內容 (Content)

### box-sizing 寬度計算

- `content-box`(default)：只包含內容(content)本身的寬跟高
- `border-box`：width 和 height 屬性，包括內容(content)、內邊距(padding)和邊框(border)

### box-sizing: border-box

建議作法：

- 使用 `*` (universal selector) 全站套用
- 使用 `box-sizing: border-box` 來根據設定的總 width & height 往內推擠，確保 box model 不會超過預期

```css
*,
*:before,
*:after {
  box-sizing: border-box;
}
```

## margin

### margin auto 水平置中

> `margin: auto` 的 `auto` 意思是瀏覽器會自動將剩餘的空間平均分配

:::tip
[水平與垂直置中的各種方法 - margin auto](/html-css/css-vertical-and-horizontal-alignment#margin-auto)
:::

#### `margin: 0 auto` vs `margin: auto`

```css
margin: 0 auto;
/* 可以拆解成 */
margin-top: 0;
margin-right: auto;
margin-bottom: 0;
margin-left: auto;

margin: auto;
/* 可以拆解成 */
margin-top: auto;
margin-right: auto;
margin-bottom: auto;
margin-left: auto;
```

:::note 延伸閱讀
[為什麼 margin auto 無法達到垂直置中效果](/html-css/css-vertical-and-horizontal-alignment#%E7%82%BA%E4%BB%80%E9%BA%BC-margin-auto-%E7%84%A1%E6%B3%95%E9%81%94%E5%88%B0%E5%9E%82%E7%9B%B4%E7%BD%AE%E4%B8%AD%E6%95%88%E6%9E%9C)
:::

### 使用 margin left/right 將元素置右／置左

由於 `auto` 代表會將剩餘空間分配，因此：

- `margin-left: auto` 會使元素靠右擺放
- `margin-right:auto` 會使元素靠左擺放

### margin auto vs. text-align: center

- `margin auto`: 區塊元素本身的左右
- `text-align: center`：區塊元素內的文字內容要置中

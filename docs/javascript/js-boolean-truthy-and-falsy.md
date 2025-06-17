# [JS] Boolean

Javascript 的 Boolean 用來表示真或假，只會有兩種值：

-   `true` - 表示真
-   `false` - 表示假

在 JavaScript 中，**只有這些值會被當作是 false，除了這些值以外的值都會是 true**：

-   `undefined`
-   `null`
-   `false` 值
-   `0`、`-0` (數值)
-   `NaN`
-   `''`、`""` 空字串

### Truthy & Falsy

使用 `Boolean()` 可以用來將其他的資料型態轉型 (type conversion) 成布林值型態。轉換後會得到 `false` 的，就稱作 「falsy」值；會變成 `true` 的則稱作 「truthy」值：

```javascript
Boolean(0); // false
Boolean(100); // true

Boolean(''); // false
Boolean('hi'); // true

Boolean(null); // false
Boolean(undefined); // false
Boolean(NaN); // false

Boolean({}); // true
Boolean([]); // true
Boolean(function () {}); // true
```

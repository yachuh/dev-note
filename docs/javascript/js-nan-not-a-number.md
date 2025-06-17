# [JS] NaN (Not a Number)

NaN(Not a Number) 顧名思義就是非數字

-   `NaN` 的型別是 Number： `typeof NaN // Number`
-   `NaN` 不等於任何值，也**不等於自己 `NaN === NaN // false`**

```javascript
typeof NaN; // number
NaN === NaN; // false
```

## NaN 的場景

在這些情況下會出現 `NaN`：

-   運算元無法被轉為 Number
-   0 除以 0
-   負數的平方根
-   對 `Infinity` 做「除法」或「減法」運算：因為 `Infinity` 本身為大到無法表示的值，因此針對 `Infinity` 做加減乘除是沒有意義的
    -   `Infinity + Infinity` => 回傳 Infinity
    -   `Infinity - Infinity` => **回傳 NaN**
    -   `Infinity * Infinity` => 回傳 Infinity
    -   `Infinity / Infinity` => **回傳 NaN**
-   運算元為 `NaN`

```javascript
// 運算元無法被轉為 Number
Number('hello'); // NaN
Number(undefined); // NaN
5 + undefined; // NaN

// 0 除以 0
0 / 0; // NaN

// 負數的平方根
Math.sqrt(-3); // NaN

// 對 Infinity 做除法或減法運算
Infinity / Infinity; // NaN
Infinity - Infinity; // NaN

// 運算元為 NaN
NaN + 1; // NaN
NaN - 2; // NaN
NaN * 3; // NaN
NaN / 4; // NaN
```

## 如何偵測變數中的資料是 NaN

可以透過以下兩種方法來偵測資料是否為 NaN：

### `Number.isNaN()`

當 value 為 NaN、String 或 Object 時，會回傳 true。

```javascript
Number.isNaN(value);

Number.isNaN(NaN); // true
Number.isNaN('String'); // true
Number.isNaN({}); // true
```

#### `Number.isNaN` 與 global `isNaN` 的差異

> [29.1](https://github.com/airbnb/javascript#standard-library--isnan) **Use `Number.isNaN` instead of global `isNaN`**.

使用 `isNaN` 一開始會做 `Number()` 的數值轉換，假如遇到的是空字串或 Boolean 很可能會因為先做數值轉換的關係產生非預期的最終結果。因此建議使用 `Number.isNaN()` （不會進行 `Number()` 的數值轉換）的方式來進行判斷。

```javascript
// bad
isNaN('1.2'); // false，Number('1.2') 轉換成數字 1.2
isNaN('1.2.3'); // true，Number('1.2.2') 無法轉換，回傳 NaN

// good
Number.isNaN('1.2.3'); // false
Number.isNaN(Number('1.2.3')); // true
```

### 利用 NaN 不等於任何值（包括本身）的特性

一般正常的變數自己等於自己一定會是 true，只有 `NaN === NaN` 會是 false。也就是說：

> **當一個變數自己等於自己是 false 的話，就可以推斷這個變數一定是 NaN 。**

```javascript
if (x !== x) {
} // 只有在 x 為 NaN 時，結果才為 true
```

# Ref

-   [NaN & Infinity](https://ithelp.ithome.com.tw/articles/10203356)
-   [JavaScript 有趣的冷知識 ：神奇的 NaN](https://medium.com/andy-blog/javascript-%E6%9C%89%E8%B6%A3%E7%9A%84%E5%86%B7%E7%9F%A5%E8%AD%98-%E4%B8%80-%E7%A5%9E%E5%A5%87%E7%9A%84-nan-eefe0fc5510f)

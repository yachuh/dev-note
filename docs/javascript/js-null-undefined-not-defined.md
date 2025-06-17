# [JS] null, undefined, not defined

```javascript
// 變數未被宣告: not defined
p; // Uncaught ReferenceError: p is not defined

// typeof
typeof undefined; // undefined
typeof null; // object

// 皆為 falsy value
Boolean(undefined); // false
Boolean(null); // false

// 一般相等 vs. 嚴格相等
null == undefined; // true，使用一般相等 (==) 會先轉型成相同型別再做比較，由於 null 與 undefined 都是 falsy 值，因此兩值相等
null === undefined; // false，使用嚴格相等 (===) 因為兩者型別不相等因此為 false

// Number() 轉換為數值
Number(undefined); // NaN
Number(null); // 0

// 轉為數值
undefined + 5; // NaN， undefined 無法被轉型為數字
null + 5; // 5， null 被轉型為 number 0

// 轉為字串
undefined + '1'; // 'undefined1'， undefined 被轉型為字串
null + '1'; // 'null1'，null 被轉型為字串
```

### undefined 與 null 的差異

-   `undefined` 代表「未定義」的原始值（尚未被賦予值），轉為數值時為 `NaN`
-   `null` 代表「空值」（有被賦予為空的值），轉為數值時為 `0`

### undefined 與 not defined 差異

-   `undefined` 是變數被宣告了但沒有賦值，屬於原始型別之一
-   `not defined` 是變數沒有被宣告，不屬於原始型別，是執行程式時的錯誤訊息 (runtime error)，需要被修正

```javascript
console.log(a); // 會報錯：Uncaught ReferenceError: a is not defined

var a;
console.log(a); // undefined

const obj = {};
obj.a; // undefined
obj.a.r; // 會報錯：Cannot read properties of undefined (reading 'r')
```

## undefined

在 Javascript 中，當我們宣告了一個變數但沒有賦值時， Javascript 會給予它一個預設值 `undefined`，意思是「未定義」的值。

```javascript
// 當我們宣告
var a = 100;

// 實際上 Javascript 在執行時是：
var a; // 宣告了一個變數，並寫進記憶體，此時 a 的值為 undefined
a = 100; // 再將 100 賦值給 a
```

`undefined` 並不代表什麼都沒有，它在 Javascript 中是一個型別也是一個值，一樣會佔據記憶體空間。`undefined` 代表著變數最原始的狀態，並非人為操作的結果。

-   `undefined` 是型別 Undefined 的值
-   Undefined 這個型別就只有 `undefined` 這個值
-   使用 `typeof undefined` 會回傳 `undefined`
-   `undefined` 轉為數值時為 `NaN`：`Number(undefined)` 會回傳 `NaN`

```javascript
typeof undefined; // undefined
Number(undefined); // NaN
```

:::tip 注意
`typeof` 回傳的值是**字串**，所以 `'undefined'` 需以字串表示。
:::

### undefined 的場景

`undefined` 常見於以下幾種情況：

-   當變數沒有提供初始值，預設值為 `undefined`
-   取用一個不存在的物件的屬性或陣列的元素時會回傳 `undefined`
-   函式沒有返回值 (return) 時，返回值默認為 `undefined`
-   使用 void 運算符時，後面的表達式不論如何皆回傳 `undefined`
-   若原本一個函式需要傳入參數，但是調用函式時沒有傳入參數，則返回值為 undefined

```javascript
// 變數未被宣告: not defined
p; // Uncaught ReferenceError: p is not defined

// 宣告變數但沒有提供初始值
var a;
a; // undefined

// 取用不存在的物件屬性或陣列元素
var obj = new Object();
obj.p; // undefined

// 函數沒有 return 時，回傳值默認為 undefined
function f() {}
f(); // undefined

// 調用函數時沒有傳入參數，該參數為 undefined，函式回傳 undefined
function f(x) {
    return x;
}
f(); // undefined

// 使用 void 運算符，皆會回傳 undefined
console.log(void null); // undefined
console.log(void undefined); // undefined
console.log(void 123); // undefined
console.log(void 'hello'); // undefined
```

## null

null 意思是「存在但沒有值」的空值。是刻意讓開發者用來宣告「空值」的（例如：曾經有資料，使用 `null` 將其清空）。Javascript 從來不會將值設定為 null。

-   `null` 是型別 Null 的值
-   Null 這個型別就只有 null 這個值
-   `typeof null` 會回傳 `object`（這是 Javascript 最著名的 bug 之一，詳細情形可以看這篇：[The history of “typeof null”](https://2ality.com/2013/10/typeof-null.html)。）
-   轉為數值時為 0，`Number(null)` 會回傳 `0`
-   轉型成字串時會是字面上的英文： `console.log(null + ''); // 'null'`
-   在做 DOM 元素操作時，若要**獲取的 DOM 元素不存在**，則會回傳 `null`

```javascript
typeof null; // 'object'
Number(null); // 0

// 型別轉換
consol.log(null + ''); // 'null' --> string 型別，null 被轉型成字面上的英文
console.log(null + 5); // 5 --> number 型別，null 被轉型成數字 0
```

## null 與 undefined 的共同點

-   都沒有屬性和方法，也不能額外添加屬性方法
-   皆為 Falsy Value (`Boolean(undefined) // false`, `Boolean(null) // false`)
-   皆為原始型別 (Primitive Type)

# Ref

-   [[JavaScript基礎]（一）： Null 跟 Undefined 的差別？](https://medium.com/@hooviva77/javascript%E5%9F%BA%E7%A4%8E-%E4%B8%80-null-%E8%B7%9F-undefined-%E7%9A%84%E5%B7%AE%E5%88%A5-153d8e6adf55)
-   [Javascript中undefined和null的差異](https://snh90100.medium.com/javascript%E4%B8%ADundefined%E5%92%8Cnull%E7%9A%84%E5%B7%AE%E5%88%A5-1f48e9be5e02)
-   [[JS] undefined 和 null 的差異](https://genos.coderbridge.io/2021/11/17/undefinedAndNull/)

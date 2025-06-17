# [JS] ==、=== 和 Object.is()

> JavaScript 的相等比較：`==`、`===` 和 `Object.is()`

在 JavaScript 中想判斷變數或對象是否相等有以下三種方法：

-   一般相等(==)
-   嚴格相等(===)
-   Object.is() 方法

前兩個[比較運算子](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_operators#comparison_operators) `==` 和 `===` 都可以拿來判斷比較對象是否相等，不過兩者的差別究竟在哪裡？又為什麼要這樣設計？是我一開始學習 JavaScript 感到有點混淆的地方，也是滿常見的面試考題。

## == 與 === 的差別

> 「大部分情況下不建議使用 ==，應該使用 ===」

初學 JavaScript 時常常會直接看到這樣的結論。簡單來說 `==` **不會進行型別檢查只會比較值，`===` 則會同時檢查型別與值**。

```javascript
console.log('1' == 1); // true
console.log('1' === 1); // false
```

## == 等於(Equal) 與 != 不等於

-   `==` 等於(Equal)也稱作「鬆散／寬鬆相等(Loose Equal)」（相較於「嚴格相等」來說）
-   由於 JavaScript 是個[動態型別語言](/javascript/js-data-type#%E5%8B%95%E6%85%8B%E5%9E%8B%E5%88%A5%E8%AA%9E%E8%A8%80-dynamic-language-with-dynamic-types)，因此可以允許不同型別的值做比較
-   `==` 也具有「對稱性(symmetric)」， `A == B` 的意思與 `B == A` 是相同的
-   遇到不同型別的運算元時，會**先自動轉型(type conversion)再比較內容**

```javascript
console.log('1' == 1); //true
console.log(true == 1); // true
```

不必管型別就能使用乍看之下很方便，但可以看看這幾個 tricky 的例子：

```javascript
console.log(-0 == +0);
console.log(null == undefined);
console.log([1, 2] == '1,2');
console.log([] == false);
console.log([0] == false);
console.log('\n' == false);
console.log('0XA19' == 2585);
// 以上的結果都是 true
```

這是因為不同型別的值經過 **JavaScript 的隱式轉型(Implicit Type Coercion)** ，反而可能會有預期之外的結果。

這也是為什麼通常來說更建議使用 `===`。

以下來做個簡單的分類：

## 同型別之間的比較

如果 `Type(x)` 與 `Type(y)` 相同，執行的結果就跟使用嚴格相等 `x === y` 一樣。

-   String: 兩個 string 每一個字元跟順序都相同時才是 true
-   Number: 兩個 number 的值相同時才是 true
    -   **`+0` 與 `-0` 在 `==` 被視為相等、在 `===` 視為不相等**
    -   只要任一運算元是 `NaN` 就是 false；`NaN` 不等於任何值（包含自己）
-   Boolean: 運算元都是 true 或都是 false 時才是 true
-   BigInt：兩個 BigInt 都有相同的值時才是 true
-   Symbol: 兩個 symbol 都引用相同的 symbol 值時才是 true
-   Object: 兩個 object 都指向相同的位置時才是 true

:::warning
JavaScript 的比較也會因為是不是原始型別(primitive type) 而有所差異。
非原始型別（像是 object、array 或 class）比較的基準會是看他們**是否指向同一個參考(reference)，而不是比較他們的值(value)**。
:::

```javascript
let obj1 = { name: 'John' };
let obj2 = { name: 'John' };

let array1 = [1, 2, 3];
let array2 = [1, 2, 3];

console.log(obj1 == obj2); // false
console.log(array1 == array2); // false
```

這部分在下方 Reference vs Value 會有進一步的說明。

## string 或 boolean 會轉為 number

string 或 boolean 被拿來跟 number 比較時，會先透過 `Number()` 轉為 number，再跟另一個 number 比較。

### string 與 number 比較

```javascript
console.log('' == 0); // true
console.log('  ' == 0); // true
console.log('' == ' '); // false
```

-   `""` 被自動轉型成 0，因此 `"" == 0` 可以看作是 `0 == 0` ，兩值相等所以回傳 true
-   `" "` 即使包含了空白字元，但經過 `Number(" ")`自動轉型仍是 0 ，因此也會回傳 true
-   `""` 與 `" "` 兩者型別相同（都是 string） 因此不需要轉型、直接比較內容，內容並不相等所以回傳 false。

### boolean 與 number 比較

```javascript
console.log(true == 1); // true
console.log(false == 0); // true
```

-   true 被 `Number(true)` 轉成 1
-   false 被 `Number(false)` 轉成 0

### string 與 boolean 比較

string 與 boolean 都會先轉為 number 再作比較。

```javascript
console.log('0' == false); // true
```

1. `'0'` 字串透過 `Number('0')` 轉為數字 0
2. `false` 布林值透過 `Number(false)` 轉為數字 0
3. `'0' == false` 經過轉型後變成 `0 == 0` ，兩值相同回傳 true

```javascript
console.log('true' == true); // false
```

1. `'true'` 字串透過 `Number('true')` 因為無法轉型成數字因此結果是 `NaN`
2. `true` 布林值透過 `Number(true)` 轉為數字 1
3. `'true' == true` 經過轉型後變成 `NaN == 1` --> 只要出現 NaN 就回傳 false

## null、undefined 的比較

運算元是 `null` 或 `undefined` 時的規則如下：

**當其中一個運算元是 `null` 或 `undefined`，另一個運算元也必須是 `null` 或 `undefined`** 才會回傳 true，否則一律回傳 false。

```javascript
console.log(null == undefined); // true
console.log(null == 0); // false
console.log(undefined == 0); // false
```

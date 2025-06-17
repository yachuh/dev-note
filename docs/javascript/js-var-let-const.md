# [JS] 變數(Variables)的宣告與作用域(Scope)

###### tags: `Javascript`, `variable`

JavaScript 的變數可以分為**全域**與**區域**變數。簡單來說可以用**是否在函式內宣告**來區分：

-   函式以內宣告的為「區域」
-   函式以外宣告的為「全域」

## 變數 (variable) 與屬性 (property)

### 全域環境和全域物件 (window 物件)

執行 JavaScript 程式碼時，JaveScript Engine 會產生基礎的執行環境 (Base execution context) 或稱為 **「全域執行環境(Global Execution Context)」** 。

全域執行環境在一開始的創建階段 (Creation Phase) 就會替我們創造兩個東西：

1. 全域物件 (Global Object)
2. `this` 特殊變數

JavaScript 在不同的執行環境下會有不同的全域物件：

-   在**瀏覽器**中的全域物件就是 **window** 物件
-   在 **Node.js** 環境中的全域物件就是 **global** 物件

> 在瀏覽器執行環境中，全域等級的全域物件 window 就等同 `this`。

![全域環境和全域物件](https://miro.medium.com/v2/resize:fit:720/format:webp/1*b1hygPxsVKObqboH1BZIRw.png)
（[圖片來源](https://medium.com/icguanyu/%E5%85%A8%E5%9F%9F%E7%92%B0%E5%A2%83%E5%92%8C%E5%85%A8%E5%9F%9F%E7%89%A9%E4%BB%B6-675ececf0624)）

### 全域 (Global)

-   全域 (Global) 代表我們可以在執行環境內的所有地方取用它
-   當你的程式碼或變數不是在函數裡創造的，就會隸屬 (attached) 於全域物件

```javascript
var a = 10;
console.log(window.a); // 10 --> 全域物件 window 底下有 a
console.log(this.a); // 10 --> this 等同全域物件 window
```

### 沒有宣告

-   用 `var` 宣告：會是一個**變數**，同時也是 window 物件的一個**屬性**；
-   沒有宣告：只會是 window 物件的一個「全域屬性」（即使寫在函式內也是）：

```javascript
function printName() {
    name = 'Jay'; // 即使在函式內，沒有宣告的變數會變成「全域屬性」
    console.log(name);
}

printName(); // Jay
console.log(name); // Jay  --> 函式外也取用得到
```

```javascript
setTimeout(() => {
    data = []; // 沒有宣告變數
    updateData();
    console.log(data); // 最後印出 data 的值為 `[1]
}, 0);

function updateData() {
    data.push(1);
}
// [1]
```

```javascript
setTimeout(() => {
    var data = []; // 使用 var 宣告變數
    updateData();
    console.log(data); // 得到錯誤
}, 0);

function updateData() {
    data.push(1);
}
// Uncaught ReferenceError: data is not defined
```

#### 屬性可以被刪除，變數不行

```javascript
var a = 'Jay'; // --> 全域變數
d = 'Tom'; // --> 全域屬性

delete window.a; // false --> 變數不能被刪除
delete window.d; // true --> 屬性可以被刪除
console.log(a); // Jay
console.log(d); // Uncaught ReferenceError: d is not defined
```

-   使用 `var` 宣告，記憶體會先準備一個空間給它並賦予預設值 `undefined`，因此在賦值變數前取用它並不會出錯。
-   但如果是沒有宣告的變數就會跳錯誤：

    ```javascript
    console.log(a); // undefined
    var a = 'Jay';
    ```

    ```javascript
    console.log(a); // Uncaught ReferenceError: a is not defined
    a = 'Jay';
    ```

:::important
建議無論如何都一定要宣告變數。
:::

### 宣告變數 var, let, const 與 window 的關係

-   使用 `var` 宣告的變數會出現在 window 屬性下
-   使用 `let`、 `const` 的不會：
    ```javascript
    var a = 'Jay';
    let b = 'Tom';
    const c = 'Bob';
    console.log(window.a); // Jay
    console.log(window.b); // undefined
    console.log(window.c); // undefined
    ```

### 總結各個差異

```javascript
var a = 'Jay'; // 是變數，同時也是 window 物件的一個屬性
let b = 'Tom'; // 是變數，但不是 window 物件的一個屬性
const c = 'Bob'; // 是變數，但不是 window 物件的一個屬性
d = 'Amy'; // 不是變數，但是是 window 物件的一個屬性

// 在全域物件 window 查看
console.log(window.a); // Jay
console.log(window.b); // undefined
console.log(window.c); // undefined
console.log(window.d); // Amy

// 變數 vs 屬性
delete window.a; // false --> 變數不能被刪除
delete window.d; // true --> 屬性可以被刪除
console.log(window.a); // Jay
console.log(window.d); // undefined
console.log(d); // Uncaught ReferenceError: d is not defined
```

## 變數的作用域(Scope)

除了沒有宣告的變數會被視為是全域屬性之外，其他無論是使用 var、let、const 宣告的變數差異主要在於變數的「生存範圍」也就是變數的「作用域」。

### 全域變數與區域變數

#### 內層可以存取外層，外層不能存取內層

```javascript
var a = 'Tom'; // 全域變數

function fn1() {
    var b = 'Jack'; // 區域變數
    console.log(a, b);

    function fn2() {
        console.log(a, b); // 區域環境，可以存取外層作用域的變數
        debugger;
    }

    fn2();
}

fn1();
```

上述例子我們可以看到：

-   全域作用域中有 a 變數 `var a = 'Tom'`
-   fn1() 作用域有 b 變數 `var b = 'Jack'`，沒有 a 變數因此向上層 global 查找到 a 變數
-   fn2() 作用域中沒有 a 跟 b 變數，因此會往上一層 fn() 作用域查找到 b 變數、再往上一層 global 作用域查找到 a 變數

使用 `debugger` 與法可以在 console 查看到不同 scope 的變數：
![scope](https://hackmd.io/_uploads/Hy_Lkvrba.png)

#### 每個函示

```javascript
var a = 'Tom';

function fn1() {
    var b = 'Jack';
}

function fn2() {
    var c = 'Amy';
    console.log(b);
}

fn1();
fn2();
```

```javascript
var a = 'Tom';

function fn1() {
    b = 'Jack';
}

function fn2() {
    var c = 'Amy';
    console.log(b);
}

fn1();
fn2();
```

### var, let, const 作用域的差異

-   `var` 是屬於**函式作用域**
-   `let`、`const` 是屬於**區塊作用域** (script, block)
-   實際開發上不推薦使用全域變數，會有覆蓋問題（`var` 可以重複宣告）

#### 範例一：let 與 var 結果相同

```javascript
for (let index = 0; index < 10; index++) {
    console.log(index);
}

for (var index = 0; index < 10; index++) {
    console.log(index);
}
// Output: 依序印出 0~10
```

#### 範例二：let 與 var 結果不同

```javascript
for (let index = 0; index < 10; index++) {}
console.log(index); // Output: index is not defined; index 是區域變數

for (var index = 0; index < 10; index++) {}
console.log(index); // Output: 10; index 是全域變數
```

### 範例三：let 與 var 結果不同

```javascript
for (var index = 0; index < 10; index++) {
    setTimeout(() => {
        console.log(index);
    }, 10);
}
// Output: 10

for (let index = 0; index < 10; index++) {
    setTimeout(() => {
        console.log(index);
    }, 10);
}
// Output: 依序印出 0~10
```

### 語（詞）法作用域

#### 範例一

```javascript
var myName = '小明';

function fn1() {
    console.log(myName);
}

function fn2() {
    var myName = '杰倫'; // fn2() 的區域變數
    fn1();
}

fn2(); // Output: 小明
```

-   `fn2()` 內的區域變數 `var myName = '杰倫'` 不影響 `fn1()`

#### 範例二

```javascript
var myName = '小明';

function fn1() {
    console.log(myName);
}

function fn2() {
    myName = '杰倫'; // 修改了全域的變數
    fn1();
}

fn2(); // Output: 杰倫
```

-   全域變數 `var myName = '小明'` 在 `fn2()` 被重新賦值

## 宣告順序的差別

-   宣告一定要放前面
-   函式宣告可以放後面（但還是建議放前面）
-   提升 hoisting
-   let, const 的暫時性死區

:::info hoisting

1. 創造階段
   -> 函式優先
2. 執行階段
   :::

## undefined 與 not defined 的差異

```javascript
console.log(a); // a is not defined --> error

var a;
console.log(a);// undefined

const obj {};
console.log(obj.a); // undefined
console.log(obj.a.r); // not defined --> error
```

-   JS 是逐行執行的程式語言，一但前面有錯後面就不會再執行
-   `not defined` 是錯誤訊息，一定要修正
-   `undefined` 不會出錯

---

### 變數作用域

```javascript
for (let index = 0; index < 10; index++) {
    console.log(index); // 依序印出 0 ~ 9
}

for (var index = 0; index < 10; index++) {
    console.log(index); // 0, Uncaught TypeError: Assignment to constant variable.
}
```

```javascript
for (var index = 0; index < 10; index++) {
    setTimeout(() => {
        console.log(index);
    }, 0);
}
// 10

for (let index = 0; index < 10; index++) {
    setTimeout(() => {
        console.log(index);
    }, 0);
}
// 0~9
```

-   `setTimeout()` 是非同步事件
-   JavaScript 屬於同步語言，所有非同步事件一率最後才執行

```javascript
var a = '小明'; // 全域變數

function fn1() {
    console.log(a);
}

function fn2() {
    var a = '杰倫'; // 獨立區域變數
    // a = '依林' // 重新賦值
    fn1();
}

fn2(); // 小明
```

答案是小明。原因是「語法作用域」，變數在函式宣告的時候就決定了。

### 變數提升

> 實作中大部分都會**避免提升**。

-   宣告會放在前面

## var, let const 差異總結

| 關鍵點   | `var`                  | `let`            | `const`                        |
| -------- | ---------------------- | ---------------- | ------------------------------ |
| 作用域   | 函式作用域             | 區塊作用域       | 區塊作用域                     |
| 重複宣告 | 可以                   | 不可             | 不可                           |
| 賦值     | 可重新賦值             | 可重新賦值       | 不可重新賦值（但物件內容可改） |
| Hoisting | 是（值為 `undefined`） | 是（但不可使用） | 是（但不可使用）               |

## Ref

-   [全域環境和全域物件](https://medium.com/icguanyu/%E5%85%A8%E5%9F%9F%E7%92%B0%E5%A2%83%E5%92%8C%E5%85%A8%E5%9F%9F%E7%89%A9%E4%BB%B6-675ececf0624)

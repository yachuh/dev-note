# [JS] Data Types 資料型別

## 原始資料型別 Primitive Data Type

原始資料型別都有「原始值 (primitive value)」，且原始值是不可被更改的。

Javascript 的七種原始資料型別：

-   [Undefined](/javascript/js-null-undefined-not-defined#undefined)
-   [Null](/javascript/js-null-undefined-not-defined#null)
-   [Boolean](#boolean-布林值): true / false
-   [String](/javascript/js-string)
-   [Number](/javascript/js-number)
-   [NaN(Not a Number)](/javascript/js-nan-not-a-number)
-   [BigInt (ES2020)](/javascript/js-bigint)
-   [Symbol (ES6)](/javascript/js-symbol)

除此之外，還有第八種：

## 物件資料型別 Object Data Type

> Ref: https://developer.mozilla.org/en-US/docs/Glossary/Object

-   [Object](/javascript/js-object)

## 用 `typeof` 查看型別

> The typeof operator returns a string indicating the type of the operand's value.

```javascript
console.log(typeof 42); // number
console.log(typeof 'blubber'); // string
console.log(typeof true); // boolean
console.log(typeof undeclaredVariable); // undefined
console.log(typeof undefined); // undefined
console.log(typeof null); // object
```

:::tip `typeof` `null` 會返回 "object"
要確認一個值是否為 null 時，可使用 `=== null` 來檢驗該值是否為 null。

Ref: [Javascript - Null, undefined, not defined](/javascript/js-null-undefined-not-defined)
:::

## 動態型別語言 (dynamic language with dynamic types)

> JavaScript is a dynamic language with dynamic types.

-   宣告變數時不必特別宣告變數的型別
-   可以以不同的型別使用同一個變數

```javascript
let someValue = 42; // someValue is now a number
someValue = 'bar'; // someValue is now a string
someValue = true; // someValue is now a boolean
```

## 弱型別語言 (weakly typed language)

> JavaScript is also a weakly typed language

-   變數會自動轉換型別(implicit coercions)

### 自動轉型：字串與數字相加、相減

-   `+`：當數字與字串**相加**，數字被**轉型成字串**
-   `-`：當數字與字串**相減**，字串被**轉型成數字**

```javascript
// 數字與字串相加
'37' + 7; // "377"
30 + '7'; // "307"

// 數字與字串相減
'37' - 7; // 30
30 - '7'; // 23
```

# Ref

-   [來數數 JavaScript 的所有資料型別](https://blog.huli.tw/2022/02/25/javascript-how-many-types/)

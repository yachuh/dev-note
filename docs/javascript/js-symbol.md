# [JS] Symbol

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol

Symbol 是 ES6 新增的型別。

> The Symbol type is the set of all non-String values that may be used as the key of an Object property.

> Each possible Symbol value is unique and immutable.

> Each Symbol value immutably holds an associated value called [[Description]] that is either undefined or a String value. (p.73)

由此我們可以知道：

-   Symbol 是拿來當作物件的 key 使用的
-   Symbol 是除了 string 以外唯一可以被用來當作 object 的 key 的東西
-   每一個 Symbol 的值都是獨一無二的；你無法建立兩個一樣的 Symbol

## 建立 Symbol

> Every `Symbol()` call is guaranteed to return a unique Symbol.

使用 `Symbol()` 建立一個獨一無二的 Symbol：

```javascript
const sym1 = Symbol();
const sym2 = Symbol('foo');
const sym3 = Symbol('foo');

console.log(sym2 === sym3); // false，每個 Symbol 都是獨一無二的
console.log(sym2.description); // foo，用這樣來取得敘述

const obj = {};
obj[sym2] = 'hello'; // 可以當成 key 使用
console.log(obj[sym2]); // hello
```

Symbol 獨一無二的特性讓它在被當成物件的 key 使用時，不需要擔心會與其他的 key 衝突。

## 取得 Symbol

> Every `Symbol.for("key")` call will always return the same Symbol for a given value of "key"

使用 `Symbol.for("key")` 來獲取相同的或創建一個新的 Symbol：

```javascript
const sym1 = Symbol.for('a');
const sym2 = Symbol.for('a');
console.log(sym1 === sym2); // true
```

> When `Symbol.for("key")` is called, if a Symbol with the given key can be found in the global Symbol registry, that Symbol is returned. Otherwise, a new Symbol is created, added to the global Symbol registry under the given key, and returned.

這時候 `sym1 === sym2` 為什麼又是 true 了呢？

實際上，呼叫 `Symbol.for("key")` 函式時 Javascript 會先在全域的 Symbol registry 裡找該 key 的 Symbol。

如果有找到，則會回傳該 Symbol；如果沒有找到，就會建立一個新的 Symbol ，並且寫入 Symbol registry 中，然後回傳該 Symbol。

## 隱藏資訊

Symbol 的另一個特性是隱藏資訊，當你在用 `for...in` loop 的時候，如果 key 是 Symbol 型別，並不會被列出來：

```javascript
const obj = {
    a: 1,
    [Symbol.for('b')]: 2,
};

for (let key in obj) {
    console.log(key); // a
}
```

## Global Symbol registry

要建立全域（甚至跨文件、跨域）的 Symbol ，可以透過使用 `Symbol.for()` 和 `Symbol.keyFor()` 來註冊和取得 global registry 裡的 Symbol。

:::info
需注意，這裡說的 global symbol registry 只是一個抽象的概念，並真的存在於 Javascript 的資料結構中。
:::

> `Symbol.for(tokenString)` takes a string key and returns a symbol value from the registry.

> `Symbol.keyFor(symbolValue)` takes a symbol value and returns the string key corresponding to it.

> Each is the other's inverse

使用 `Symbol.for(tokenString)` ：

-   param: string key
-   return: symbol value

使用 `Symbol.keyFor(symbolValue)`：

-   param: symbol value
-   return: string key

```javascript
Symbol.keyFor(Symbol.for('tokenString')) === 'tokenString'; // true
```

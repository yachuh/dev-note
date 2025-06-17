# [JS] BigInt

> [BigInt](https://developer.mozilla.org/en-US/docs/Glossary/BigInt) 是 ES2020 新增的型別。

> BigInt values represent numeric values which are too large to be represented by the number primitive.

這邊的 "too large" 指的是超越了 Number 所說的安全範圍 `MAX_SAFE_INTEGER`，也就是大於 `2^53` 的整數。

透過在數值尾端加上一個 n 或呼叫 BigInt(value) 來生成一個 BigInt：

```javascript
const bigNum = 123456789n;
const verybigNum = BigInt(9007199254740991);
const bigStr = BigInt('9007199254740991');
```

上面當 Number 超越安全範圍時導致運算有誤差的例子，只要改為使用 BigInt 就不會有問題：

```javascript
const a = 9007199254740992n;
const b = a + 1n;
console.log(a === b); // false
console.log(a); // 9007199254740992n
console.log(b); // 9007199254740993n
```

使用 `typeof` 檢查型別時，BigInt 會回傳 `"bigint"`：

```javascript
typeof 1n === 'bigint'; // true
typeof BigInt('1') === 'bigint'; // true
```

:::tip
Number 和 BigInt 不能混合計算。如果要運算，必須先被轉換成同樣的型別。然而， BigInt 在被轉換成 Number 時可能會遺失部分精度的資訊。因此，建議**當數值會超過 2^53 時只使用 BigInt** ，而不要在兩者之間進行轉換。
:::

# [JS] Number

> Number values represent floating-point numbers like 37 or -9.25.

## Number(value) 型別轉換

-   使用 `Number(value)` 可以將參數轉換成數字
-   如果參數無法被轉換成數字則返回值為 `NaN`（無效解析、無效數值）

```javascript
Number(undefined); // NaN
Number(null); // 0

// Boolean
Number(true); // 1
Number(false); // 0

// String
Number('42'); // 42
Number('123') === 123; // true
Number(' 3.14 '); // 3.14
Number(''); // 0
Number('foo'); // NaN

// BigInt
Number(123n); // 	TypeError，防止精度錯誤

// Symbol
Number(Symbol()); // TypeError，無法轉換

// Object
Number({}); // NaN
Number({
    valueOf() {
        return 5;
    },
}); // 5
Number([]); // [].toString() === '' -> 0
Number([123]); // 123
Number(['a']); // NaN

// Date
Number(new Date('2024-01-01')); // 1704067200000（timestamp）
```

使用 Number() 返回的值，會根據資料的型別有所不同：

-   **Numbers** 會返回該數字
-   **Undefined** 會返回 `NaN`
-   **Null** 會返回 `0`
-   **Boolean**：
    -   `true` 返回 `1`
    -   `false` 返回 `0`
-   **String**：
    -   若可解析為數字就會返回數字
    -   自動去除前後空白
    -   空字串會返回 `0`
    -   無法解析則返回 `NaN`
-   **BigInt** 會報錯 `TypeError` 來避免隱式轉換可能造成的精度問題
-   **Symbol** 會報錯 `TypeError`，無法解析
-   **Object** 會先呼叫 `[@@toPrimitive()]`、 `valueOf()` 和 `toString()` 方法，並按其結果轉換為數字。

## 數字的範圍

> The Number type has exactly 18,437,736,874,454,810,627 (that is, 2^64 - 2^53 + 3) values, representing the double-precision 64-bit format IEEE 754-2019 values as specified in the IEEE Standard for Binary Floating-Point Arithmetic, except that the 9,007,199,254,740,990 (that is, 2^53 - 2) distinct “Not-a-Number” values of the IEEE Standard are represented in ECMAScript as a single special NaN value. (p.76)

-   Javascript 的 Number 是用 64 bit 來存，遵循的規格是 IEEE 754-2019。
-   64 bit 是個有限的空間，但數字卻是無限的。這代表 Number 是一個有限範圍的數字（有儲存上限）。

我們可以使用 `Number.MAX_SAFE_INTEGAR` 來拿到正整數的安全範圍，即：`2^53 - 1`，也就是 `9007199254740991`。

> 安全範圍內的數字可以被明確地表示＆比較，一但超出這個範圍就有可能會有誤差。

```javascript
const a = 9007199254740992;
const b = a + 1;
console.log(a === b); // true
console.log(b); // 9007199254740992

console.log(9007199254740992 === 9007199254740993); // true
console.log(Number('9007199254740993')); // 9007199254740992
```

## Infinity

`Infinity` 或 `-Infinity` 是 JavaScript 的一個 global 屬性，用來表示**無限大**或**無限小**。

```javascript
console.log(typeof Infinity); // number

console.log(100000000000 > Infinity); // false
console.log(-99999 > -Infinity); // true

var x = 2 / 0; // x = Infinity
var y = -2 / 0; // y = -Infinity
```

## NaN (Not a Number)

NaN 也包含在 Number 型別中。

```javascript
let age = 18;
let myName = 'Tom';

let total = myName * age; // NaN
console.log(typeof total); // number
```

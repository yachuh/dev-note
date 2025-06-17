# [JS] String

> The String type is the set of all ordered sequences of zero or more 16-bit unsigned integer values (“elements”) up to a maximum length of 2^53 - 1 elements. The String type is generally used to represent textual data in a running ECMAScript program, in which case each element in the String is treated as a UTF-16 code unit value (p.72)

來自[「來數數 JavaScript 的所有資料型別」](https://blog.huli.tw/2022/02/25/javascript-how-many-types/)的翻譯蒟蒻：

> 字串就是一連串的 16-bit 的數字，而這些數字就是 UTF-16 的 code unit，字串的長度最多則是 2^53 - 1。

## 字串處理

```javascript
str.length; // 取得字串長度

// 取得字串中的特定字元 (character)
str.charAt(index); // 取得特定索引的字元
str.at(index); // 支援負數索引取得字元
'str'[index]; // 將字串當作類陣列(array-like)物件，直接存取字串中對應的索引值

// 搜尋
str.indexOf(subStr); // 回傳首次出現索引
str.lastIndexOf(subStr); // 回傳最後出現索引

// 檢驗字串是否包含
str.includes(subStr); // 是否包含子字串
str.startsWith(prefix); // 是否以某字串開頭
str.endsWith(prefix); // 是否以某字串結尾

// 字串合併
str.concat(str); // 合併字串
str1 + str2; // 使用相加運算子 `+`
str.repeat(n); // 重複字串

// 濾掉空白
str.trim(); // 去掉前後空白
str.trimStart(); // 去掉起始空白
str.trimEnd(); // 去掉結尾空白

// 擷取與拆分
slice(start, end); // 擷取子字串
substring(start, end); // 擷取子字串（不接受負數）
split(delimiter); // 拆成陣列

// 取代與替換
str.replace(str, newStr); // 替換掉第一個匹配
str.replaceAll(sre, newStr); // 替換掉所有匹配
```

### `.length` 取得字串長度

> This property returns the number of **code units** in the string

-   String 的 `length` 屬性 (property) 會返回該字元串的長度（含空白與標點符號）
-   length 指的是 **[碼元的個數(code units)而不是字元數(characters)](#碼元code-unit-vs-字元character)**
-   空字串的 length 為 0
-   替字串的 length 屬性重新賦值並不會有任何作用（在 strict mode 下會報錯）

```javascript
const str = "What's up?";
console.log(str.length); // 10

// 空字串的 length 為 0
const empty = '';
console.log(empty.length); // 0

// 為字串的 length 屬性重新賦值
const myString = 'Hello';
myString.length = 2;
console.log(myString); // 'Hello'
console.log(myString.length); // 5

('use strict');
myString.length = 2;
// Uncaught TypeError: Cannot assign to read only property 'length' of string 'hello'
```

#### 碼元(code unit) vs 字元(character)

Javascript 是使用 UTF-16 編碼，每個 Unicode 字符可以編碼成一到兩個碼元(code unit)。也就是說，對於 Javascript 來說**所有的字串都是一系列的 UTF-16 碼元**。

> `length` 指的是碼元的個數(code units)而不是字元數(characters)，因此 `length` 返回的值可能與字串中 Unicode 實際的字符數量不一致。

如果想要取得正確的字元數，可以使用[迭代器(iterator)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/length)，將字串分隔成字元。或使用 `Array.from(str).length`。

```javascript
const emoji = '😄';
console.log(emoji.length); // 2

// 使用迭代器
function getCharacterLength(str) {
    return [...str].length;
}
console.log(getCharacterLength(emoji)); // 1

// 使用 Array.from(str).length
console.log(Array.from(emoji).length); // 1
```

:::info
靜態屬性 `String.length` 與字串長度無關，它是 String 函數的[參數數量](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Function/length)，也就是 1。
:::

### `.trim()` 去除多餘空白

-   `trim()`：去掉前後空白
-   `trimStart()`：去掉起始空白
-   `trimEnd()`：去掉結尾空白

```javascript
const userEmail1 = '          eddy@gmail.com';
const userEmail2 = 'johnny123@gmail        ';
const userEmail3 = '    alice@gmail.com.     ';

userEmail1.trimStart(); // 'eddy@gmail.com'
userEmail2.trimEnd(); // 'johnny123@gmail'
userEmail3.trim(); // 'alice@gmail.com'
```

### 組合多個字串

```javascript
// 使用 `.concat()` 方法
const str1 = 'Hello';
const str2 = 'World';
str1.concat(', ', str2, '!'); // 'Hello, World!''

const strArray = ['Hello', ' ', 'World', '!'];
''.concat(...strArray); // 'Hello World!'

// 使用相加運算子 `+`
'Hello ' + 'everyone'; // 'Hello everyone'
```

### 取得字串中的特定字元(character)

```javascript
str.charAt(index);
str.at(index); // 支援負數索引取得字元
str[index]; // 將字串當作類陣列(array-like)物件，直接存取字串中對應的索引值
```

### 替換

```javascript
str.replace(str, newStr); // 替換掉第一個匹配
str.replaceAll(sre, newStr); // 替換掉所有匹配
```

## ES6+ 常用技巧

### 樣板字串 Template Literal

```javascript
`Hello, ${name}`;
```

-   用 `` 包住
-   用 `${value}` 插入變數

### 解構＆展開

```javascript
[...'hello']; // ['h','e','l','l','o']
```

-   將字元拆成陣列

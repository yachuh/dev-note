# [JS] Object

> An Object is logically a collection of properties.

> Properties are identified using key values. A property key value is either an ECMAScript String value or a Symbol value. All String and Symbol values, including the empty String, are valid as property keys. A property name is a property key that is a String value.

> Property keys are used to access properties and their values(p.89)

-   物件是由許多 **屬性(properties)** 所組成
-   物件的屬性也就是所謂的 `key`，使用 `key` 來取得物件的屬性和對應的值
-   key 一定要是 `string` 或 `symbol`；即使是空字串也可以拿來當作 key

```javascript
var user = {
    name: 'John',
    age: 18,
    hobby: 'soccer',
    isMarried: false,
    spells: ['shazam', 'abrakadra', 'boo'],
    shout: function () {
        console.log('AHHHHH!');
    },
};

console.log(user.name); // John
console.log(user[age]); // 18
```

### 取得物件的屬性與值

使用 `obj.key` 或 `obj['key']` 來獲取物件的屬性與值。

### 刪除物件的屬性與值

使用 `delete` 運算子移除物件的屬性：`delete obj.key`，其返回值在[大多數情況下](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete#return_value)皆為 `true`。

```javascript
let obj = {
    name: 'John',
    age: 18,
};

delete obj.name; // true
delete obj.hobby; // true

console.log(obj); // {age: 18}
```

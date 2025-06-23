# [Note] Day.js

> [Day.js](https://day.js.org/en/)

```bash
npm install dayjs
```

- Moment.js 的輕量化（僅有 2 kB 大小）替代方案
- 沒有任何依賴
- 可以在 Node.js 與瀏覽器中使用
- 支援多國語系，可以根據不同的語系來顯示不同的時間格式

## 基本用法

```javascript
import dayjs from 'dayjs';

// 取得現在時間
const now = dayjs(); // 等同於 dayjs(new Date()) 或 dayjs(undefined)

const isoString = '2023-01-27T10:30:00+00:00';

// 解析 ISO 8601 字符串
const date = dayjs(isoString);

// 輸出格式化時間
console.log(date.format()); // 輸出 ISO 8601 格式：2023-01-27T10:30:00+00:00
console.log(date.format('YYYY-MM-DD HH:mm:ss')); // 輸出自定義格式：2023-01-27 10:30:00
console.log(date.format('YYYY年MM月DD日 HH时mm分ss秒')); // 輸出自定義格式：2023年01月27日 10时30分00秒
```

## 常用方法

### method chaining

dayjs 允許在單個語句中將方法鏈接在一起：

```javascript
dayjs('2019-01-25').add(1, 'day').subtract(1, 'year').year(2009).toString();
```

### dayjs() 取得時間

使用 `dayjs()` 解析字串，返回 Day.js 的對象實例

```javascript
// 取得現在時間
dayjs();
dayjs(new Date()); // 等同於 dayjs()
dayjs(undefined); // 參數預設值本身就是 undefined，dayjs(undefined) 就等同於 dayjs()
dayjs(null); // 會報錯，視為無效的輸入

// 取得特定時間
dayjs('2023/01/27');
dayjs('2023,01,27');
dayjs('2023 01 27');
dayjs('2023*01*27');
dayjs('2023-01-27T10:30:00+00:00');
dayjs(1318781876406);

// 取得特定時間的年/月/日/時等資訊
dayjs().year(); // 取得年
dayjs().month(); // 取得月，從 0 開始(0-11)
dayjs().date(); // 取得日
dayjs().day(); // 取得星期幾
dayjs().hour(); // 取得時
dayjs().minute(); // 取得分
dayjs().second(); // 取得秒
dayjs().millisecond(); // 取得毫秒

// 取得 Unix Timestamp 時間戳記
dayjs().valueOf(); // 1616681066000
```

- `dayjs()` 默認解析 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) 格式的字串
- `dayjs('2018 Enero 15', 'YYYY MMMM DD', 'es')` 可傳入指定解析的日期、格式、locale

### format() 格式化時間

> [Format](https://day.js.org/docs/en/display/format)

使用 `format()` 將時間輸出為指定的格式（`format()` 不傳入任何參數時，默認使用 ISO 8601 格式輸出）

```javascript
dayjs().format(); // 2023-01-27T21:30:08+00:00
dayjs().format('YYYY-MM-DD HH:mm:ss'); // 2023-01-27 21:30:08
dayjs().format('YYYY'); // 2023
dayjs().format('YY'); //23
dayjs().format('M'); // 1
dayjs().format('MM'); // 01
dayjs().format('MMM'); // Jan（月份縮寫）
dayjs().format('MMMM'); // January（完整月份）
dayjs().format('D'); // 27
dayjs().format('DD'); // 27
dayjs().format('h'); // 9 (12 小時制)
dayjs().format('hh'); // 09 (12 小時制，兩位數)
dayjs().format('H'); // 21 (24 小時制，兩位數)
dayjs().format('HH'); // 21 (24 小時制，兩位數)
dayjs().format('m'); // 11
dayjs().format('mm'); // 11
dayjs().format('s'); // 8
dayjs().format('ss'); // 08
```

:::tip
更多支援的格式：[List of all available formats](https://day.js.org/docs/en/display/format#list-of-all-available-formats)
:::

### Time from X ; Time to now

> 需搭配 [`RelativeTime`](https://day.js.org/docs/en/plugin/relative-time) 套件使用

```javascript
import dayjs from 'dayjs';

// 使用 relativeTime plugin
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
```

```javascript
// Time from now
dayjs('2000-01-01').fromNow(); // 25 years ago
dayjs('2000-01-01').fromNow(true); // 25 years

// Time from X
const aYearAgo = dayjs('2000-01-01');
dayjs('1999-01-01').from(aYearAgo); // a year ago

// Time to now
dayjs('2000-01-01').toNow(); // in 25 years

// Time to X
const inAYear = dayjs('2000-01-01');
dayjs('1999-01-01').toNow(inAYear); // in a year
```

- `from()`
- `fromNow`
- `to()`
- `toNow()`

### Difference 計算時間差

使用 `diff()`計算兩個時間點的時間差距

```javascript
const date1 = dayjs('2019-01-25');
const date2 = dayjs('2018-06-05');

date1.diff(date2); // 20214000000 default milliseconds
date1.diff(date2, 'month'); // 7
date1.diff(date2, 'month', true); // 7.645161290322581
```

- `diff()` 第一個參數放入要比較的時間
- `diff()` 第二個參數放入比較的[單位](https://day.js.org/docs/en/display/difference)，預設是毫秒（`day` , `week`, `month` , `year`, `hour`, `minute`...)
- `diff()` 第三個參數放入 boolean，決定是否要顯示小數位

### Duration

> 需搭配 [`Duration`](https://day.js.org/docs/en/plugin/duration) 套件使用

```javascript
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);
```

### Humanize

> 需搭配 [`Duration`](https://day.js.org/docs/en/plugin/duration) 套件與 [`RelativeTime`](https://day.js.org/docs/en/plugin/relative-time) 套件使用

- 想要得到類似 `from()` 的結果但又不想創建兩個 Day.js 物件時

```javascript
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(duration);
dayjs.extend(relativeTime);

dayjs.duration(1, 'minutes').humanize(); // a minute
dayjs.duration(2, 'minutes').humanize(); // 2 minutes
dayjs.duration(24, 'hours').humanize(); // a day
dayjs.duration(2, 'months').humanize(true); // in 2 months（有 prefix）
```

### 加減時間

```javascript
dayjs().add(1, 'day');
dayjs().subtract(1, 'day');
```

- `add()` 增加時間
- `subtract()` 減去時間

支援的單位：

| Unit          | Shorthand | Description                                                                                       |
| ------------- | --------- | ------------------------------------------------------------------------------------------------- |
| `day`         | `d`       | Day                                                                                               |
| `week`        | `w`       | Week                                                                                              |
| `month`       | `M`       | Month                                                                                             |
| `quarter`     | `Q`       | Quarter ( dependent [`QuarterOfYear` ](https://day.js.org/docs/en/plugin/quarter-of-year)plugin ) |
| `year`        | `y`       | Year                                                                                              |
| `hour`        | `h`       | Hour                                                                                              |
| `minute`      | `m`       | Minute                                                                                            |
| `second`      | `s`       | Second                                                                                            |
| `millisecond` | `ms`      | Millisecond                                                                                       |

## i18n

> [Loading locale in NodeJS](https://day.js.org/docs/en/i18n/loading-into-nodejs)

```javascript
import dayjs from 'dayjs';

// Checking the curreny Day.js locale
dayjs.locale(); // 'en'

// Change locale globally
import 'dayjs/locale/zh-tw';
dayjs.locale('zh-tw'); // use loaded locale globally
dayjs.locale('en'); // switch back to default English locale globally

// Change locale locally
dayjs('2018-09-25').locale('zh-tw').format('YYYY/MMM/DD 星期dd'); // 2018/09月/25 星期二
```

## Ref

- [一個好用的時間處理套件 - Dayjs](https://arc.net/l/quote/fxqmygnt)

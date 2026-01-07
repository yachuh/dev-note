# [Note] ESLint & Prettier

> [ESLint](https://eslint.org/)

> [ESLint Demo](http://eslint.org/demo/)

## 簡介

ESLint 是一個用來檢查 JavaScript （也支援 TypeScript、React 等）的靜態程式碼檢查工具 (Linter)，幫助開發者維持一致的程式碼風格和品質、協助檢查程式碼的錯誤和減少潛在問題。

### 主要功能

- 程式碼錯誤偵測（例如忘記加 `;`、變數未定義）
- 程式碼風格檢查（如單引號 `'` 與雙引號 `"` 的使用、tab 與 space）
- 自動修復常見問題（ `eslint --fix`）
- 支援自訂規則與插件擴充

### 核心概念

- **規則 Rules**：ESLint 的核心，定義了程式碼檢查的標準。每個規則都有一個唯一的名稱和對應的配置選項。
- **插件 Plugins**：擴展 ESLint 的工具，可以添加新的規則、解析器、報告器等。
- **共享配置 Shareable Configs**：包含一系列預定億的規則和配置，便於共享和重用。

### ESLint CLI

```bash
# 安裝 ESLint
$ npm init @eslint/config@latest
$ pnpm create @eslint/config@latest

# Run ESLint: npx eslint [options] [file|dir|glob]*
$ npx eslint # 檢查所有檔案，等同於 npx eslint .
$ npx eslint yourfile.js
$ npx eslint file1.js file2.js
$ npx eslint "lib/**"
$ pnpm dlx eslint yourfile.js

# Debug
$ npx eslint --debug file.js
$ npx eslint --print-config file.js # 使用時機：當你不確定為什麼 linting 沒有產生預期的結果
$ npx eslint --inspect-config       # 使用時機：當你不確定某個檔案是否有套用到特定的 configuration object

# Fix
$ npx eslint --fix
```

## Configuration 設定檔

> [Configure ESLint](https://eslint.org/docs/latest/use/configure/)

:::tip
ESLint v9 引入 **Flat Config（扁平設定）**成為預設格式，是目前最推薦的設定方式，取代傳統的 `.eslintrc` 系列設定檔。
:::

執行 `npm init @eslint/config` 後會自動生成 ESLint 的設定檔。有兩種主要格式：

1. **舊格式：Legacy Config（階層式設定）**

   - **檔案名稱**：`.eslintrc.js`、`.eslintrc.json`、`.eslintrc.yaml`、`.eslintrc.yml`...
   - **特色**：階層式（hierarchical）設定，設定分散在多個檔案，會從專案目錄往上尋找並合併多層設定
   - **問題**：設定覆蓋行為複雜，難以追蹤最終規則來源

2. **新格式：Flat Config（扁平式設定）- ESLint v9+**
   - **檔案名稱**：`eslint.config.js`、`eslint.config.mjs`、`eslint.config.cjs`...
   - **特色**：單一設定檔，扁平化陣列結構，順序決定優先級，更直覺可控
   - **優勢**：每個元素是一個設定物件，所有設定集中處理、使用 ES modules、支援可編程設定

### Flat Config

Flat Config 是一個由**設定物件 (configuration objects) 所組成的陣列**，放置於專案根目錄 (root)：

```javascript title="eslint.config.js"
export default [
  // 設定物件 1
  {
    files: ['**/*.js'],
    rules: {
      /* 規則 */
    },
  },

  // 設定物件 2
  {
    files: ['**/*.ts'],
    rules: {
      /* 規則 */
    },
  },

  // ... 更多設定物件
];
```

#### 匯出方式

Export 一定要是 ESM 格式 (export default)。Flat Config 支援兩種匯出方式：

1. 直接匯出陣列 (`export default [ ... ]` )

   ```javascript title="eslint.config.js"
   import js from '@eslint/js';

   export default [
     js.configs.recommended,
     {
       files: ['**/*.js'],
       rules: {
         'no-console': 'warn',
       },
     },
   ];
   ```

2. 使用 **`defineConfig()` helper**（官方建議的最佳實踐）

   ```javascript title="eslint.config.js"
   import { defineConfig } from 'eslint/config';
   import js from '@eslint/js';

   export default defineConfig([
     js.configs.recommended,
     {
       files: ['**/*.js'],
       rules: {
         'no-console': 'warn',
       },
     },
   ]);
   ```

### Configuration Objects 設定物件

> [Configuration Objects](https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects)

每個設定物件定義了一組規則和其適用範圍，包含以下欄位：

**核心欄位**

| 欄位          | 類型       | 說明                               | 範例                             |
| ------------- | ---------- | ---------------------------------- | -------------------------------- |
| **`name`**    | `string`   | 設定物件的名稱（用於 debug）       | `"TypeScript files"`             |
| **`files`**   | `string[]` | 適用的檔案匹配模式（glob pattern） | `['**/*.ts', '**/*.tsx']`        |
| **`ignores`** | `string[]` | 排除的檔案匹配模式（glob pattern） | `['node_modules/**', 'dist/**']` |

**語言設定相關**

| 欄位                                | 類型     | 說明         | 範例                                 |
| ----------------------------------- | -------- | ------------ | ------------------------------------ |
| **`languageOptions`**               | `object` | 語言解析設定 | `{ parser, parserOptions, globals }` |
| **`languageOptions.parser`**        | `object` | 程式碼解析器 | `@typescript-eslint/parser`          |
| **`languageOptions.parserOptions`** | `object` | 解析器選項   | `{ ecmaVersion: 'latest' }`          |
| **`languageOptions.globals`**       | object   | 全域變數定義 | `globals.browser`                    |

**規則相關**

| 欄位           | 類型     | 說明                                         | 範例                               |
| -------------- | -------- | -------------------------------------------- | ---------------------------------- |
| **`extends`**  | `object` | 允許套用現成的規則集，可以是官方或是第三方的 | `{ 'react-hooks': reactHooks }`    |
| **`plugins`**  | `object` | 引入外部規則插件（如 react, prettier）       | `{ 'react-hooks': reactHooks }`    |
| **`rules`**    | `object` | 啟用的規則，可以覆蓋 extends 或 plugins      | `{ 'no-console': 'warn' }`         |
| **`settings`** | `object` | 提供 plugin 共用的設定                       | `{ react: { version: 'detect' } }` |

**其他設定**

| 欄位            | 類型                 | 說明       | 範例                              |
| --------------- | -------------------- | ---------- | --------------------------------- |
| **`processor`** | `string` or `object` | 檔案處理器 | 用於處理非 JS 檔案（如 Markdown） |

#### 設定物件執行順序

> 在 Flat Config 中，**陣列順序決定設定的優先級**

1. 後面的設定會覆蓋前面的設定
2. 相同檔案匹配時，後面的規則優先
3. Prettier 設定通常放在最後，確保格式規則不被覆蓋

```javascript
export default [
  js.configs.recommended, // 1. 基本規則
  tsConfig, // 2. TypeScript 規則（可能覆蓋基本規則）
  reactConfig, // 3. React 規則（可能覆蓋前面規則）
  prettierConfig, // 4. Prettier 規則（最後執行，避免衝突）
];
```

#### Rules 規則

> 規則是 ESLint 的核心，每個規則控制一個特定的程式碼檢查

```javascript
"規則名稱"： "狀態"
```

- 每個規則有一個唯一的名稱，例如 `"no-alert"`、`"no-console"`
- 每個規則有三種狀態： `"off"`（0，關閉）、`"warn"`（1，警告）或 `"error"`（2，錯誤）
- 某些規則還支援額外參數，如 `"indent": ["error", 2]` 設定縮排為 2 個空格。

##### **規則狀態**

```javascript
{
  rules: {
    // 字串格式
    'no-console': 'off',    // 關閉規則
    'no-alert': 'warn',     // 警告等級
    'no-debugger': 'error', // 錯誤等級

    // 數字格式（等價）
    'no-console': 0,        // 關閉
    'no-alert': 1,          // 警告
    'no-debugger': 2,       // 錯誤

    // 陣列格式（含參數）
    'indent': ['error', 2],                    // 縮排 2 空格
    'quotes': ['error', 'single'],             // 使用單引號
    'max-len': ['warn', { code: 100 }],        // 最大行長度 100
  }
}
```

##### 常用規則範例

```javascript
{
  rules: {
    // 程式碼品質
    'no-unused-vars': 'error',
    'no-undef': 'error',
    'no-console': 'warn',

    // 程式碼風格
    'indent': ['error', 2],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],

    // TypeScript 特定規則
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/consistent-type-imports': 'error',

    // React 特定規則
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  }
}
```

### eslint.config.js 完整設定檔範例

```javascript title="eslint.config.js"
import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parserTs from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

// 一定要是 ESM 格式 (export default)
export default defineConfig([
  // 🟡 全域排除設定（不針對特定檔案）
  {
    name: 'Global ignores',
    ignores: [
      'node_modules',
      'dist',
      'build',
      'coverage',
      'public/mockServiceWorker.js',
    ],
  },

  // 🟢 JavaScript 基本規則（官方 js.configs.recommended）
  {
    ...js.configs.recommended,
    name: 'JavaScript base rules',
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      'no-console': 'warn',
      'no-debugger': 'error',
    },
  },

  // 🔵 TypeScript 支援 + ESLint plugin
  {
    name: 'TypeScript rules',
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: parserTs,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      ...ts.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
    },
  },

  // ✨ Prettier 整合（格式錯誤會報錯）
  {
    files: ['**/*.{js,ts,tsx,jsx,json,md}'],
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // 🔶 範例：特定檔案（如 test）使用 override 規則
  {
    name: 'Test files overrides',
    files: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // 在測試檔案允許 any
      'no-console': 'off',
    },
  },

  // 🔸 範例：Markdown 檔案避免不必要的 lint
  {
    files: ['**/*.md'],
    languageOptions: {
      parser: undefined,
    },
    rules: {},
  },
]);
```

## 忽略規則

### 忽略所有規則

忽略整個檔案：

```javascript
// 放在檔案的最上方
/* eslint-disable */
```

忽略單行：

```javascript
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert
alert('foo');
```

忽略多行：

```javascript
/* eslint-disable */
alert('foo');
/* eslint-enable */
```

### 忽略特定規則

忽整個檔案：

```javascript
// 放在檔案的最上方
/* eslint-disable [rule-name] */
/* eslint-disable no-alert, no-console
```

忽略單行：

```javascript
alert('foo'); // eslint-disable-line no-alert, quotes, semi

// eslint-disable-next-line no-alert
alert('foo');
```

忽略多行：

```javascript
/* eslint-disable no-alert, no-console */
alert('foo');
console.log('bar');
/* eslint-enable no-alert, no-console */
```

## ESLint + Prettier

> [Prettier](https://www.npmjs.com/package/prettier)

Prettier 是一個 code formatter 自動排版工具，常與 ESLint 互相搭配使用：

1. ESLint 負責邏輯與程式問題檢查
2. Prettier 負責格式排版（縮排、引號、括號）

### 套件安裝建議

```bash
# 基本 Prettier 安裝
$ npm install --save-dev --save-exact prettier

# ESLint + Prettier 整合套件
$ npm install --save-dev eslint-plugin-prettier eslint-config-prettier

# 推薦方式：使用 eslint-plugin-prettier/recommended (Flat Config)
$ npm install --save-dev eslint-plugin-prettier
```

套件說明：

- **[`prettier`](https://www.npmjs.com/package/prettier)**：Prettier 核心套件，負責程式碼格式化
- **[`eslint-plugin-prettier`](https://www.npmjs.com/package/eslint-plugin-prettier)**：將 Prettier 規則整合到 ESLint 中，讓 ESLint 可以檢查格式問題
- **[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)**：關閉會與 Prettier 衝突的 ESLint 規則
- **[`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier)**：關閉會可能會與 Prettier 衝突的 ESLint 規則

:::info

> [**Configuration (new: eslint.config.js)**](https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs)
> For [flat configuration](https://eslint.org/docs/latest/use/configure/configuration-files-new), this plugin ships with an `eslint-plugin-prettier/recommended` config that sets up both `eslint-plugin-prettier` and [`eslint-config-prettier`](https://github.com/prettier/eslint-config-prettier) in one go.

使用 **`eslint-plugin-prettier/recommended` + Flat Config** 就能讓 ESLint 處理格式錯誤並且避免衝突
:::

在 `eslint.config.ts` 加上：

```javascript
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended';
...

export default tseslint.config(
	{ ignores: ['dist'] },
	{
		extends: [js.configs.recommended, ...tseslint.configs.recommended],
		...
	}
).concat(eslintPluginPrettier);
```

### Prettier CLI

```bash
# 安裝 Prettier
$ npm install --save-dev --save-exact prettier

# 建立設定檔：.prettierrc
$ node --eval "fs.writeFileSync('.prettierrc','{}\n')"

# 建立忽略檔：.prettierignore
$ node --eval "fs.writeFileSync('.prettierignore','# Ignore artifacts:\nbuild\ncoverage\n')"

# 執行 prettier 排版
$ npx prettier . --check													# 只檢查，不覆寫
$ npx prettier --write . 													# 全部檔案，或
$ pnpm exec prettier --write .
$ npx prettier --write app/ 											# 針對特定目錄
$ npx prettier --write app/components/Button.js 	# 針對特定檔案
$ npx prettier --write "app/**/*.test.js"					# 針對匹配的全域路徑(glob)
```

### .prettierrc 設定檔範例

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

#### 常用設定值

| 設定項目                     | 類型    | 常用值 / 範例                        | 說明                                                                                  |
| ---------------------------- | ------- | ------------------------------------ | ------------------------------------------------------------------------------------- |
| `semi`                       | boolean | `true` / `false`                     | 是否在句尾加上分號 `;`（預設 `true`）                                                 |
| `singleQuote`                | boolean | `true` / `false`                     | 使用單引號 `'` 而不是雙引號 `"`                                                       |
| `printWidth`                 | number  | `80` / `100` / `120`                 | 每行最大寬度（預設 80）                                                               |
| `tabWidth`                   | number  | `2` / `4`                            | 縮排空格數（預設 2）                                                                  |
| `useTabs`                    | boolean | `true` / `false`                     | 使用 tab (`\t`) 而不是空格                                                            |
| `trailingComma`              | string  | `"none"` / `"es5"` / `"all"`         | 尾端逗號：`none`: 不加`es5`: 只加在 ES5 支援的地方`all`: 所有可能的地方（建議）       |
| `bracketSpacing`             | boolean | `true` / `false`                     | 物件 `{ foo: bar }` 是否有空格                                                        |
| `arrowParens`                | string  | `"avoid"` / `"always"`               | 箭頭函式參數是否總是加括號：<br />`avoid`: 只有一個參數時省略括號<br />`always`: 總是 |
| `endOfLine`                  | string  | `"lf"` / `"crlf"` / `"auto"`         | 換行字元格式，建議使用 `"lf"`（Unix/macOS）                                           |
| `plugins`                    | array   | 如 `["prettier-plugin-tailwindcss"]` | 使用外掛（如 TailwindCSS class 排序）                                                 |
| `embeddedLanguageFormatting` | string  | `"auto"` / `"off"`                   | 是否格式化嵌入的程式碼，如 markdown 裡的 code block                                   |

## ESLint 常用 Plugin/Config 整合建議

### React

- `eslint-plugin-react`：檢查 React 基本規則
- `eslint-plugin-react-hooks`：檢查 React Hooks 用法規則（如依賴清單）
- [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)：檢查 JSX 無障礙(a11y)問題

### TypeScript

- `@typescript-eslint/eslint-plugin`：TypeScript 專用 ESLint 規則
- `@typescript-eslint/parser`：TypeScript 解析器

### 程式碼品質與風格

- `eslint-plugin-import`：檢查 Import/Export 語句與排序
- `eslint-config-airbnb`：Airbnb JavaScript 程式碼風格
- `eslint-config-airbnb-typescript`：Airbnb TypeScript 程式碼風格
- `@next/eslint-config-next`：Next.js 官方規則

## VSCode 整合設定

> [Prettier - Code formatter](https://github.com/prettier/prettier-vscode)

> [Prettier ESLint Extension](https://marketplace.visualstudio.com/items?itemName=rvest.vs-code-prettier-eslint)

在 `.vscode/settings.json` 加入

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": [
    "javascript",
    "typescript",
    "javascriptreact",
    "typescriptreact"
  ]
}
```

## 搭配 package.json 腳本

新增 lint 指令：

```json title="package.json"
{
  // ...
  "scripts": {
    // ....
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint-fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "prettier": "npx prettier --write ."
  }
}
```

輸入指令，執行腳本：

```bash
$ npm run lint
$ npm run lint-fix
$ npm run prettier
```

## 整合 Git Hooks: Husky & lint-staged

即使有了程式碼規範與排版設定，要在每次 commit 前手動執行檢查與修正還是挺麻煩的。為了避免不符合規範的程式碼被 commit 上去，可以整合 Git hooks ，在 CI 階段 (pre-commit) 就自動執行 lint 檢查修正與 `prettier --write` ，確保推上 github 的程式碼都是符合規範並且已經被 format 過的。

這邊要使用到三個工具

1. `Husky` 設定 `pre-commit` hook
2. `pre-commit` 內呼叫 `lint-staged`
3. `lint-staged` 執行你設定的檢查與修復命令（如 ESLint、Prettier）

```bash
# 安裝 husky 以及 lint-staged
$ npm install --save-dev husky lint-staged

# 初始化 husky
$ npx husky init

# 透過 husky pre-commit hook 執行 lint-staged
$ node --eval "fs.writeFileSync('.husky/pre-commit','npx lint-staged\n')"
```

### Git Hooks

[Git Hooks](https://git-scm.com/book/zh-tw/v2/Customizing-Git-Git-Hooks) 是 Git 提供的機制，允許開發者在特定事件發生時（如：commit 前/中/後），執行指令（如：Shell 腳本或 Node 腳本）。
| Hook 名稱 | 時機點 | 常見用途 |
| ------------ | ------- | ------------------------ |
| `pre-commit` | 提交前 | 格式檢查、lint、測試 |
| `commit-msg` | 提交訊息產生時 | 驗證 commit message（如規範格式） |
| `pre-push` | 推送前 | 執行測試、build 檢查等 |

### Husky

[Husky](https://typicode.github.io/husky/) 是一個用來管理 Git Hooks 的工具，支援以 JavaScript 方式設定並加入版本控制。

```bash
$ npm install --save-dev husky # 或 pnpm add -D husky
$ npx husky init # 或 pnpm dlx husky install
```

執行 `husky init` 後會：

1. 在根目錄產生 `.husky/pre-commit` 檔案：

```
.husky/
  └─ pre-commit
```

2. 在 package.json 新增 `prepare` 腳本：

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

這樣一來在 local 端執行 `npm install` 之後就會執行 `husky install`

#### 加入 hook

用 `npx husky add` 來加 hook

```shell
$ npx husky add .husky/pre-commit "pnpm lint-staged --max-warnings=0 --concurrent --retry=2"
```

會產生一個 `.husky/pre-commit` 檔案內容如下：

```shell
pnpm lint-staged --max-warnings=0 --concurrent --retry=2
```

參數說明：

- `--max-warnings=0`：不允許任何 warning（否則視為失敗）
- `--concurrent`：同時執行多個 task（效能佳）
- `--retry=2`：失敗時自動重試兩次（例如格式修復完後再 lint）

:::note

- **舊版 Husky（v4 以前）** 的用法，是寫在 `package.json` 的 `"husky.hooks"`
- **新版Husky（v7+）** 的用法，是寫成獨立的 shell 腳本在 `.husky/` 資料夾中
  :::

#### 測試 hook

測試 hook 腳本：加上 `exit 1` 放棄 git 指令

```shell
# .husky/pre-commit

# Your WIP script
# ...

exit 1
```

```shell
git commit -m "testing pre-commit code"
# A commit will not be created
```

:::note
Husky v9 的重大更新提醒：`#!/usr/bin/env sh` 和 `. "$(dirname -- "$0")/_/husky.sh"`，這兩行在 **未來 Husky v10 將不再需要，也會失效**。
:::

### lint-staged

lint-staged 是搭配 Husky 使用的工具，它的功用在於只針對 staged 的檔案執行 lint 或 format 指令，不需要掃瞄整個專案，避免不必要的 git diff（提升效能）。

```shell
$ npm install --save-dev lint-staged
```

將 [lint-staged](https://www.npmjs.com/package/lint-staged) 加到 `package.json`：

```json
{
  "lint-staged": {
    "*.+(ts|tsx|jsx|js)": "eslint --cache --fix",
    "*.+(ts|tsx|jsx|js|json|css|md|mdx|html)": "prettier --write"
  }
}
```

在 `.husky/pre-commit` 檔案加上 `lint-staged`

```shell
echo "trigger pre-commit" # 確認是否有正確安裝的腳本

npx lint-staged
```

:::note
Husky 腳本裡寫的都是 bash 語法
:::

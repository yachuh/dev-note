---
tags: [npm]
---

# [Note] NPM

**NPM**，全名 **Node Package Manager** 套件管理工具，是 Node.js 預設的 node 套件管理工具，在本機端安裝 Node.js 時也會一併安裝。主要用於管理基於 Node.js 的 JavaScript 套件。

- 套件：我們不需要重新開發就能使用別人已經開發好的程式碼

- 套件管理工具：當使用到到的套件愈來愈多，並且版本與相容性的管理愈來愈複雜時，就需要一個類似目錄的東西，來讓我們統一管理套件（安裝、升級、刪除）

:::note
Node.js 是能夠執行 JavaScript 的一個「運行環境」。在 Node.js 出現以前 JavaScript 「只能」在瀏覽器上運行。
:::

## NPM 的主要功能

- 套件管理：安裝、更新、管理和分享 JavaScript 的依賴。
- 透過 NPM 命令執行各種操作，例如安裝套件 (`npm install`)、運行腳本 (`npm run`) 等。
- 執行專案腳本：可以在 package.json 中定義腳本，使用 `npm run` 來執行各種腳本命令，比如編譯、測試或部署項目。

## 常用指令

```bash
npm init                              #初始化一個新的NPM項目，會生成 package.json 文件。
npm -v                                # 查看 NPM 版本

# npm install
npm install                           # 安裝項目的依賴
npm install <package>                 # 安裝指定的套件
npm install <package> -g              # 全域安裝
npm install <package> --save          # 安裝套件並寫入 package.json 的 "dependencies"
npm install <package> --save-dev      # 安裝套件並寫入 package.json 的 "devDependencies"
npm install <package> --D             # 同 --save-dev
npm uninstall <package>               # 刪除專案裡的指定套件

npm list                              # 顯示安裝的 NPM 列表
npm update                            # 更新已安裝的 package
npm run <script>                      # 執行 package.json 中定義的腳本
```

## Install npm package/node module

> [npm install - npm](https://docs.npmjs.com/cli/v10/commands/npm-install#global)

初始化專案：

```bash
npm init        # 初始化專案
npm install     # 安裝套件
```

- **package.json**：會新增一個 `package.json` 檔案，來保存所有關於套件的相關配置檔資訊。
- **package-lock.json**：安裝第一個套件後會再多出一個 `package-lock.json` 檔案來保存安裝紀錄。
- **node_modules**：所有下載的函式庫都會放在這個資料夾。

#### package.json 和 package.lock.json 個別用途

- **package.json** 是執行 `npm init` 時所生成的，用來描述專案以及專案依賴 (dependency) 的相關套件訊息。
- **package.lock.json** 是執行 `npm install` 時生成的，用來記錄當前狀態下實際安裝的各個 npm 套件具體來源和版號（可以用來鎖定版本）。

使用 `npm install` 時會安裝 package.lock.json 中指定的大版本號的最新小版本號：

```json
{
  "react": "^18.2.0", // 匹配 18.x.x 的最新版本
  "react-dom": "~18.2.0", // 匹配 18.2.x 的最新版本
  "react-refresh": "0.11.0" // 匹配 0.11.0 版本，不會更新最新版本
}
```

### 安裝環境

依照各個不同的環境，套件有可能會被安裝在不同的環境：

- **dependencies** - 執行環境
- **devDependencies** - 開發或測試環境
- **optionalDependencies** - 不一定在每個環境都能安裝

## 基本使用

```shell
npm install
```

根據專案的 `package.json` 中的依賴配置，安裝相應的依賴到專案中的 `node_modules` 資料夾。如果 `node_modules` 資料夾被刪除，可以運行 `npm install` 來重新下載所有套件。

:::tip
因為套件的檔案很大，在上傳程式碼時通常不會將 `node_modules` 上傳（會使用 `.gitignore`）。如果要下載其他人的專案，或是不小心把 `node_modules` 檔案夾刪除，只要透過 `npm install` 就可以重新安裝 `package.json` 中提到的套件。
:::

## 安裝套件 package

```bash
npm install <package_name>
npm i <package_name>
```

- 安裝一個特定的套件（如：lodash）
- 如果不指定版本號，NPM 會安裝該套件的最新穩定版本。
- 安裝完的套件會被添加到 `node_modules` 資料夾，並且 `package.json` 中的 `dependencies` 會被更新。

## 安裝常用的 flag

- `-g, --global` ：全局安裝，package.json 中無資料，但仍然可以執行。全局安裝後就可以在系統的任何地方使用該工具。通常用來安裝命令行工具。（資料夾位置： `/usr/local/lib/node_modules`）
- `-S, --save` 或 `-P, --save-prod`：將套件寫入 `dependencies` 。

- `-D, --save-dev`：將套件寫入 `devDependencies` 。適合那些只在開發過程中使用的工具，如測試框架或編譯工具。
- `--save-peer`：將套件寫入 `peerDependencies `。
- `-O, --save-optional`：將套件寫入 `optionalDependencies` 。
- `--no-save`：避免將套件寫入 `dependencies` 。

:::tip
在 [npm v5.0.0](https://blog.npmjs.org/post/161081169345/v500) 之後 `--save` 已經是預設指令（可以不用再加上 `--save` 或 `--save-prod` ）。
:::

## 套件屬性

- **dependencies 相依套件**：是指程式打包並發布後仍會需要用到的套件。（如 `react`、`axios`）
- **devDependencies 開發階段套件**：是僅在開發時會用到，不會被 build 到最終的產物中的套件。（如建置工具 `webpack`、編譯工具 `babel`、測試框架 `jest` 、程式碼格式化工具 `ESLint` 和 `prettier` ⋯等）
- **peerDependencies 對等套件**：是用來指定對主項目依賴包的版本要求，但不會自動安裝。
- [bundledDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#bundleddependencies) 綑綁套件
- [optionalDependencies](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#optionaldependencies) 可選套件

:::note
執行 `npm install --production` 或是註明環境變數 `NODE_ENV=production` 時，只會下載 `dependencies` 中的套件。
:::

### peerDependencies

**peerDependencies** （對等套件／對等依賴）是在 NPM 中用來表示當前的 package 與 host package 之間的兼容性要求。peerDependencies 不會被自動安裝，而是期望使用該 package 的開發者自行安裝正確版本的依賴。

#### 使用場景

當一個 package 是某個框架或工具的插件、擴充時，往往會使用到 `peerDependencies` 。這是因為插件通常需要與主框架 (host package) 保持在某種版本的兼容上，但插件本身並不負責安裝或管理主框架的版本，而是由使用該插件的開發者來決定。

- 避免版本衝突：當你編寫一個插件或工具時，主框架可能已經安裝在專案中。如果你自己的包重新安裝了另一個版本的該框架，可能會導致衝突或非預期的行為。`peerDependencies` 讓主框架由最終使用者來管理，保持依賴一致性。
- 避免重複安裝依賴：當插件和框架（如 React 或 Vue）共享相同的依賴時，將這些依賴聲明為 `peerDependencies` 可以確保主框架和插件使用的是同一個框架版本。

#### 舉例

假設我們正在開發一個 React 插件，希望該插件與 React 16 及更高版本兼容，我們可能會這樣定義 `peerDependencies`：

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "peerDependencies": {
    "react": ">=16.0.0"
  }
}
```

在使用這個插件的時候，NPM 並不會自動安裝 `react` ，但是會提示或期待開發者安裝正確的 React 版本。在 NPM 7 以上的版本預設會安裝 `peerDependencies`，但如果版本不兼容則會報錯。

如果你並未安裝所需的依賴，NPM 會顯示錯誤提示：

```bash
npm WARN my-plugin@1.0.0 requires a peer of react@>=16.0.0 but none is installed.
```

如果我們使用了 `dependencies` 而非 `peerDependencies`，執行 npm install 安裝完成後的依賴結構如下：

```json
├── HelloHWCloud
│   └── node_modules
│       ├── packageA
│       ├── app_A
│       │   └── nodule_modules
│       │       └── packageA
│       └── app_B
│       │   └── nodule_modules
│       │       └── packageA
```

如上圖所示，packageA 被安裝了三次。

如果採用 `peerDependency` 來下載，執行 npm install 安裝完成後的依賴結構如下

- 項目 app_A 和 app_B 的 package.json 文件裡的 `peerDependencies` 寫入 packageA
- 根目錄的 package.json 文件裡 `dependencies` 寫入 packageA ：

```javascript
├── HelloHWCloud
│   └── node_modules
│       ├── packageA
│       ├── app_A
│       └── app_B
```

如上圖所示，packageA 只會被安裝一次。

```json
├── react@17.0.0
└─┬ my-plugin@1.0.0
  └── react@16.0.0 // incompatible with host app version
```

:::note

- [Peer Dependencies in depth](https://dev.to/icy0307/peer-dependencies-in-depth-1o3b)
- [【前端开发技巧】npm install xxxx --legacy-peer-deps到底做了些什么？](https://juejin.cn/post/6971268824288985118)
  :::

## --legacy-peer-deps

> https://blog.poychang.net/npm-install-with-legacy-peer-deps/

從 NPM v7 以上的版本開始， `npm install` 會[預設安裝](https://github.com/npm/rfcs/blob/main/implemented/0025-install-peer-deps.md) `peerDependencies`，將它們當成一般的依賴一樣處理並安裝在根目錄(`node_modules`)中：

1. 如果使用者的根目錄的 package.json 中的 `dependencies` 已經明確列出了某個核心依賴（例如 React）那麼 npm 會自動忽略各個子專案（子目錄）裡的 `peerDependencies` 中對這個核心庫的聲明，因為它已經在根目錄中被明確定義了。
2. 如果根目錄中沒有明確列出某個核心依賴， npm 將按照子專案的 `peerDependencies` 版本來安裝該依賴，並安裝到根目錄中。因為只會在根目錄安裝一次，因此可以避免重複安裝依賴。

原本的美意是為了避免重複安裝依賴，但可能會導致依賴衝突。

### 問題：依賴衝突（無法解析依賴樹）

第 2 個做法可能會導致一個問題：當你安裝的依賴版本不兼容（例如：子專案依賴的版本與根目錄或其他專案依賴的版本不一致時）， npm v7 會報錯而無法繼續安裝。

```bash
npm ERR! EERESOLVE unable to reslove dependency tree
```

使用 `--legacy-peer-deps` 可以跳過這個依賴衝突檢查，告訴 NPM 忽略 peerDependency 自動安裝所產生的衝突，以 NPM v3-v6 的方式繼續執行安裝（向後兼容，允許使用舊版本的 npm 策略來安裝）。

## npm 前世今生

> [淺談 JS 生態系的套件管理機制與發展](https://oldmo860617.medium.com/%E6%B7%BA%E8%AB%87-js-%E7%94%9F%E6%85%8B%E7%B3%BB%E7%9A%84%E5%A5%97%E4%BB%B6%E7%AE%A1%E7%90%86%E6%A9%9F%E5%88%B6%E8%88%87%E7%99%BC%E5%B1%95-5cb10b7e2f72)

npm 嚴格來說可以依照版本劃分成三個時代：

- ~ npm v3
- npm v3 ~ npm v5：node_modules 的結構改變
- npm v5 ~：package-lock.json 的出現

## node module 版本號

在 package.json 檔案中可以查看到套件的版本號。版本號的格式通常是 `x.x.x` （例如：`1.2.3`），三位數字分別對應到 `主版號.次版號.修訂號` (major.mior.patch)。NPM 要求套件開發者按照 [Semantic Versioning 的規範來定義版號](https://semver.org/lang/zh-TW/)，版號遞增規則如下：

- **主版號**：當你做了**不相容**的 API 修改
- **次版號**：當你做了向下相容的**功能性新增**
- **修訂號**：當你做了向下相容的**問題修正**

先行版號及版本編譯資訊：加到「主版號.次版號.修訂號」的後面，作為延伸：

```json
{
  "dependencies": {
    "nodemon": "^1.12.0"
  }
}
```

### 特殊符號

- `~`：安裝 1.12.x。代表可以更新套件的**修訂號(patch version)** 至最新，也就是**只安裝 bug 的修正**。
- `^`：安裝 1.x.x 。代表可以更新套件的**次版號(minor version)**至最新，也就是**只保留主要版本**。
- `latest` - 最新

```bash
1.1.1       # 安裝指定為 1.1.1 的版本
~1.3.7      # 安裝 1.3.x，也就是指定為 >= 1.3.7 且 < 1.4.0 的版本
^1.19.0     # 安裝 1.x.x，也就是指定為 >= 1.19.0 且 < 2.0.0 的版本
```

:::note
在多人協作的情況下，每個人執行 npm install 都有可能獲得不同的 dependencies 的情況。 這個問題在 npm v5 引入 `package-lock.json` lock file 的機制後獲得了解決。
:::

## Ref

- [淺談 JS 生態系的套件管理機制與發展](https://oldmo860617.medium.com/%E6%B7%BA%E8%AB%87-js-%E7%94%9F%E6%85%8B%E7%B3%BB%E7%9A%84%E5%A5%97%E4%BB%B6%E7%AE%A1%E7%90%86%E6%A9%9F%E5%88%B6%E8%88%87%E7%99%BC%E5%B1%95-5cb10b7e2f72)

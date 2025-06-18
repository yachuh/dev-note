# NVM - Node 版本管理器

> https://github.com/nvm-sh/nvm

## Intro

**NVM**，全名 **Node Version Manager** 是一個「Node 版本管理器」，用來管理裝置上的 Node.js 版本。不同專案可能會使用不同的 Node.js 版本，NVM 讓我們可以在同一個裝置上安裝和切換不同的 Node.js 版本。

如果使用了不正確的版本可能會收到以下的錯誤：

```bash
This project requires Node version X
```

## 常用的 nvm 指令

```bash
nvm install <version>           # 安裝指定版本的 Node.js
nvm uninstall <version>         # 解除安裝指定版本的 Node.js
nvm use <version>               # 切換到已安裝的 Node.js 版本
nvm ls                          # 列出所有本機已安裝的 Node.js 版本
nvm ls-remote                   # 查看所有可用的 Node.js 版本
nvm alias default <version>     # 設定預設啟用的 Node.js 版本
nvm current                     # 檢查當前使用的 Node.js 版本
nvm --version | nvm -v          # 查看 nvm 版本
nvm which 8.11.1                # 查看某一版本 nvm 的 PATH
```

查看當前使用的 Node.js 版本：

```bash
node -v
```

## 主要功能

- 安裝／卸載不同版本的 Node.js
- 切換不同版本的 Node.js
- 設定特定的 Node.js 版本作為預設啟用環境
- 列出已安裝的 Node.js 版本
- 安裝不同的套件至特定的 Node.js 版本上

## 安裝或更新 nvm

> https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating

### macOS/Linux

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

在 Windows 上，可以使用 [nvm-windows](https://github.com/coreybutler/nvm-windows) 來安裝 NVM。

安裝完成後建議重開終端機，再檢查是否安裝成功：

```bash
$command -v nvm        # 檢查 nvm 是否順利安裝成功
```

### 問題排除 (macOS)

> https://github.com/nvm-sh/nvm?tab=readme-ov-file#troubleshooting-on-macos

（在 macOS 上）如果輸入安裝指令後仍然出現 `nvm: command not found` 的話，有可能是因為：

- 如果你使用的 shell 是 `zsh`（macOS 10.15 後的預設） ：NVM 預設會尋找並更新 `.zshrc`。如果你的系統沒有這個檔案的話，需先透過 `touch ~/.zshrc` 在根目錄上建立一個，再跑一次安裝指令。

- 如果你使用的是 `bash` （macOS 10.15 前的預設）：你的系統可能還沒有 `.bash_profile` 或 `.bashrc` 這個檔案。需先透過 `touch ~/.bash_profile` 或 `touch ~/.bashrc` 在根目錄上建立一個，再跑一次安裝指令。

- 先前使用 `bash` 但安裝了 `zsh` ：需要手動將這些指令加到 `~/.zshrc` 檔案並執行 `. ~/.zshrc`：

  ```bash
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  ```

:::tip
`.zshrc` 或 `.bashrc` 檔案通常會位於使用者的根目錄底下，並且為隱藏檔案。在根目錄上沒有看到的話，可能是因為沒有開啟隱藏檔案的顯示，按下 `Command + Shift+ .` 來顯示隱藏的檔案。
:::

## Ref

- [nvm：安裝、切換不同 Node.js 版本的管理器](https://titangene.github.io/article/nvm.html)
- [安裝 nvm 環境，Node.js 開發者必學（Windows、Mac 均適用）](https://www.casper.tw/development/2022/01/10/install-nvm/)

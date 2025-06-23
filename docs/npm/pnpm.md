# [Note] pnpm

> Fast, disk space efficient package manager
>
> https://pnpm.io/

pnpm (Performant NPM) 是一個高效、節省磁碟空間的套件管理工具。主要透過更高的性能以及處理依賴的方式使得安裝過程更快、更節省磁碟資源。

## 主要特色

- **使用 hardlink（硬連結）與 global store（全域存儲）來處理套件**
  - 與 npm 不同，pnpm 不會直接將每個專案的依賴安裝在專案的 `node_modules` 目錄中。pnpm 會將所有安裝的套件集中存放在全域的存儲目錄(global store)中，然後通過硬連結的方式將套件連結到每個專案的 `node_modules`。
  - store 預設會放置在 `${os.homedir}/.pnpm-store` 底下，是 pnpm 建立用來儲存依賴套件的 hardlinks 的資料夾。如果想更換路徑，也可以透過 .npmrc 進行修改。
  - 這樣的做法可以避免重複下載和存儲相同的依賴，節省了磁碟空間並加快安裝速度。
- **安裝快速**：pnpm 的安裝速度非常快，尤其在處理大型專案和多個專案之間的共享依賴時，由於依賴不會被重複安裝，pnpm 能夠顯著縮短安裝時間。
- **嚴格的依賴管理機制**：pnpm 採用一個扁平但隔離的依賴樹結構，避免了傳統的 npm 和 Yarn 可能出現的「間接依賴／隱式依賴(Implicit Dependencies)」問題，確保專案中每個套件的依賴是完全隔離的。

  - 在傳統的 npm 或 Yarn 中，間接依賴（即隱式依賴）可能會被提升到專案的根目錄 `node_modules` 下，即使它們並沒有在 `package.json` 中顯式定義，這樣程式可以直接訪問這些套件，但這容易導致無法掌控依賴版本的問題。
  - pnpm 只會將明確聲明的依賴放在專案的 `node_modules` 中，而不會自動將隱式依賴提升(No Hoisting of Indirect Dependencies)，從而避免隱式依賴問題。
  - 每個專案的 `node_modules` 目錄中只會包含該專案明確依賴的套件。間接依賴（即某個包的依賴）只會出現在該包的 `node_modules` 中，而不會影響到你的專案根目錄。如果套件之間有相互依賴的問題，開發者會更早發現，因為 pnpm 不會自動將隱式的依賴添加到專案中。

- **工作空間(WorkSpace)與 Monorepo 支援**
  - pnpm 支援工作空間(Workspace)，可以在單一的 `pnpm-workspace.yaml` 文件中管理多個專案 (package.json)，並且專案間可以共享依賴。
  - pnpm 內建了對於多專案的管理工具，能夠有效處理不同子專案間的依賴。多個專案間可以共享依賴並且優化安裝過程的特色對於 Monorepo 結構的專案特別有優勢。
- **與 npm 兼容的 CLI 指令**：pnpm 的指令與 npm 幾乎完全一致，從 npm 或 Yarn 切換到 pnpm 非常簡單。
- **保證一致的依賴版本 (`pnpm-lock.yaml`)**
  - pnpm 的 `pnpm-lock.yaml` 不僅鎖定直接依賴，還鎖定所有間接依賴。每次安裝時，pnpm 都會嚴格按照 `pnpm-lock.yaml` 中的規則解析依賴，並生成相同的依賴樹，不會受到解析順序或環境差異的影響，確保每個依賴的確切版本在不同的機器上都是一致的。
  - pnpm 採用了 Virtual Store（虛擬存儲）策略，這使得它能夠通過硬連結來共享全域存儲的依賴，並在專案中只列出專案所需的依賴，減少安裝錯誤或依賴衝突的風險。

## 常用指令

```bash
$ pnpm init                         # 初始化一個新的 pnpm 專案，會生成 package.json 文件
$ pnpm -v                           # 查看 pnpm 版本

$ pnpm install                      # 安裝專案中的所有依賴，根據 pnpm-lock.yaml 檔案確保一致性
$ pnpm install <package>            # 安裝指定的套件
$ pnpm add <package>                # 安裝套件並寫入 package.json 的 "dependencies"
$ pnpm add -D <package>             # 安裝套件並寫入 package.json 的 "devDependencies"
$ pnpm add -P <package>             # 安裝套件並寫入 package.json 的 "peerDependencies"
$ pnpm add -O <package>	            # 安裝套件並寫入 package.json 的 "optionalDependencies"
$ pnpm remove <package>             # 移除專案中的指定套件並從 package.json 中刪除相應的項目（同：rm, uninstall, un）
$ pnpm update <package>             # 更新套件到最新版本，並更新 pnpm-lock.yaml 檔案（同：up, upgrade）
$ pnpm list                         # 顯示專案中已安裝的所有套件
$ pnpm outdated                     # 檢查專案中的套件是否有新版本
$ pnpm update                       # 更新專案中所有已安裝的套件
$ pnpm update --latest	            # 更新專案中所有已安裝的套件到最新版本
$ pnpm audit                        # 檢查專案中的套件是否存在安全漏洞

# run scripts
$ pnpm run <script>                 # 執行 package.json 中定義的 npm 腳本，如：pnpm run build
$ pnpm start                        # 執行 package.json 中定義的 start 腳本
$ pnpm test                         # 執行 package.json 中定義的 test 腳本

$ pnpm exec [binary]                # 使用專案已有安裝的套件。（如：pnpm exec jest）
$ pnpm dlx [binary]                 # 使用專案中沒有安裝的套件（'pnpm dlx' 與 'pnpx' 相同）

# monorepo
$ pnpm --filter <package_selector> <command>  # 限制只在特定的 package 執行指令
$ pnpm --filter @packages/marketing start
$ pnpm add express --filter @monorepo/http
$ pnpm -r test                      # run a script in all packages
```

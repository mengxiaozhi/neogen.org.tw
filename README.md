# 社團法人臺灣新文化青年協會網站

這是[社團法人臺灣新文化青年協會](https://www.neogen.org.tw)的官方網站原始碼。網站以「拒絕盲從，直視權力」為核心理念，介紹協會、團隊與青年公共參與計畫，並提供 2027 青年參議院活動資訊及議題實驗室。

本專案由劉訊志開發並公開原始碼，也開放其擁有著作權或有權授權的內容與視覺素材再利用。程式碼採 [MIT License](./LICENSE)，文案、設計與媒體採 [CC BY-SA 4.0](./LICENSE-CONTENT.md)。

本儲存庫以公開網站為範圍，收錄建置與維護網站所需的完整原始碼；**電子公文系統不在本儲存庫及本次開源授權範圍內**。本專案不為任何特定團隊保留排他使用權，任何人都可依授權條款檢視、複製、還原、修改、散布、部署或使用。劉訊志另就其有權授權的部分，授予社團法人臺灣新文化青年協會長期使用權，詳見 [`RIGHTS-GRANT.md`](./RIGHTS-GRANT.md)。

## 網站內容

- `/`：協會首頁與理念介紹
- `/team`：理監事與秘書處團隊
- `/2027`：2027 青年參議院活動網站
- `/2027/program`：活動流程
- `/2027/report`：青年議題實驗室完整報告
- `/privacy`：隱私權與 Cookie 說明
- `/sitemap.xml`、`/robots.txt`：搜尋引擎索引資訊

## 技術組成

- Next.js 16 App Router、React 19、TypeScript
- Tailwind CSS 4
- GSAP 動畫與頁面互動
- Three.js 輕量 3D 視覺
- Radix UI、Lucide Icons
- Google Analytics（依使用者 Cookie 選擇載入）

## 在本機執行

### 系統需求

- Node.js 20.9.0 或更新版本
- npm

### 快速開始

```bash
git clone https://github.com/mengxiaozhi/neogen.org.tw.git
cd neogen.org.tw
npm ci
cp .env.example .env.local
npm run dev
```

開啟 <http://localhost:3000> 即可預覽網站。

> `package.json` 的 `private: true` 只用來避免意外發布至 npm；不影響 GitHub 儲存庫與本專案的開源授權。

## 環境變數

| 名稱 | 必要性 | 用途 |
| --- | --- | --- |
| `EVENT_REGISTRATION_ENABLED` | 必要 | 只有值為 `true` 時才開放活動報名入口；變更後須重新建置。 |
| `POCKET_POLIS_ORIGIN` | 選用 | 僅供伺服器端使用，覆寫青年議題實驗室的上游服務網址，主要用於本機 QA。 |
| `POCKET_POLIS_CONVERSATION_ID` | 選用 | 僅供伺服器端使用，覆寫青年議題實驗室的討論 ID，主要用於本機 QA。 |
| `VERCEL_ENV` | 平台提供 | Vercel 自動提供；預覽與開發環境會設定為不供搜尋引擎索引。通常不需手動設定。 |

請勿提交 `.env.local`、管理連結、憑證或存取權杖。Pocket Polis 的公開整合與維護方式請見 [`docs/pocket-polis.md`](./docs/pocket-polis.md)，活動報名設定請見 [`docs/event-registration.md`](./docs/event-registration.md)。

## 常用指令

```bash
npm run dev      # 啟動開發環境
npm run lint     # 檢查程式碼規範
npm run build    # 建立正式版本
npm run start    # 啟動已建置的正式版本
```

完整測試會讀取建置產物，請先執行建置：

```bash
npm run build -- --webpack
node --test tests/*.test.mjs
```

上列 Webpack 模式是目前已驗證的完整測試流程；一般開發仍可直接使用 Next.js 預設的 `npm run dev` 與 `npm run build`。

## 專案結構

```text
app/          Next.js 路由、頁面與 API
components/   共用介面與互動元件
lib/          SEO、資料與功能設定
public/       品牌、活動與社群分享素材
docs/         維護及整合文件
tests/        Node.js 測試
```

## 部署

本網站包含 Next.js Route Handlers，正式環境需使用支援 Node.js 與動態路由的 Next.js 執行環境，不能只上傳靜態 HTML。一般 Node.js 平台可依序執行：

```bash
npm ci
npm run build
npm run start
```

正式發布前請確認：

1. 正式網域與 canonical、Open Graph、JSON-LD、sitemap、robots 均指向正確網址。
2. `/privacy` 已清楚說明 Google Analytics 與 Cookie 選擇。
3. 活動報名開關、議題實驗室公開端點與行動版導覽均已驗證。
4. 未將任何管理憑證、私人網址或個人資料納入建置產物。

## 參與貢獻

歡迎回報問題或提出改善：

1. 先建立 [Issue](https://github.com/mengxiaozhi/neogen.org.tw/issues) 說明問題、使用情境與預期結果。
2. Fork 本專案並建立聚焦單一目的的分支。
3. 修改後執行 `npm run lint`、`npm run build` 與相關測試。
4. 提交 Pull Request，附上變更摘要、測試結果；視覺調整請附桌面與手機畫面。

提交貢獻即表示你有權提供該內容，並同意依本專案對應的授權條款發布：程式碼使用 MIT，文案與視覺內容使用 CC BY-SA 4.0。請勿提交未獲授權的照片、字型、商標或第三方作品。

## 授權

- **程式碼**：依 [MIT License](./LICENSE) 授權，可使用、複製、修改、散布、再授權與商用，但須保留著作權與授權聲明。
- **劉訊志有權授權的內容與媒體**：依 [CC BY-SA 4.0](./LICENSE-CONTENT.md) 授權，使用時須適當署名、附上授權連結、標示修改，衍生作品須採相同授權。
- **協會使用權**：劉訊志保留著作人格權，並依[開源與協會使用授權聲明](./RIGHTS-GRANT.md)，將其有權授權的網站著作財產權非專屬、無償、全球授權予社團法人臺灣新文化青年協會使用，期間至各該權利存續期間屆滿。
- **第三方套件與素材**：仍適用各自的授權條款，不因收錄於本專案而改變。
- **商標與肖像**：開源授權不授予協會名稱、標誌的商標或背書權，也不取代照片中人物的隱私、肖像、公開形象或其他人格權同意。

建議署名格式：

> © 2026 劉訊志，來源：<https://github.com/mengxiaozhi/neogen.org.tw>，依 CC BY-SA 4.0 授權；已修改。

若你不確定某項素材是否可再利用，請先透過 `neogentaiwan2026@gmail.com` 聯絡協會。

## 協會資訊

- 社團法人臺灣新文化青年協會
- 立案字號：台內團字第1150024192號函
- 統一編號：61490573
- 網站：<https://www.neogen.org.tw>
- 電子信箱：<neogentaiwan2026@gmail.com>

網站開發與開源授權署名：劉訊志。

# 2027 青年議題實驗室

活動頁 `/2027#event-discussion` 整合 Pocket Polis 的逐則投票（同意／不同意／略過）、觀點投稿、參與進度、匿名彙整與完整報告入口。樣式延續米白、綠、橘、黃色與貼紙語彙。

## 已部署服務

- 上游：https://github.com/mashbean/pocket-polis
- 使用說明：https://github.com/mashbean/pocket-polis/blob/main/AGENT.md
- 原始碼版本：`f7ec343b6ec7ee39a7586f4eba49771f0009738c`，未修改上游程式。
- Worker：`polis-serverless`；沿用既有名稱、Durable Objects 與 Queue，不另開命名空間。
- 部署版本：`18669747-6d57-4b1c-ab99-e5218cd89478`。
- API：https://polis-serverless.mengxiaozhi.workers.dev
- 參與：https://polis-serverless.mengxiaozhi.workers.dev/c/3vi2zkgk7n
- 報告：https://polis-serverless.mengxiaozhi.workers.dev/r/3vi2zkgk7n
- 健康檢查：`GET /api/health` 應回傳 ok=true、storage=durable-object-sqlite、queue=enabled。
- 部署使用 `/private/tmp/neogen-pocket-polis` 的獨立 checkout；未覆寫其他本機 checkout。該暫存目錄可刪除，日後使用下方指令重建。

## 第一場活動討論

題目「2027 青年參議院｜青年意見，如何走進公共決策？」；8 則初始觀點作為討論引子，並非協會政策聲明。

`autoApprove=false`：新投稿待管理者審核；`allowSubmissions=true`：開放投稿；`openData=false`：不列入公開目錄、不開放公開逐筆匯出。持有參與／報告網址的人仍可讀取本場，這不是存取受限的私密聊天室。

一次性管理憑證保存在本機 `.local/pocket-polis-2027.secret.json`，權限 600、上層目錄 700，已由 `.gitignore` 排除。請由協會管理者將此檔備份到私人密碼管理器，勿上傳、分享或納入部署。檔案中的 `base` 加 `urls.admin` 可開啟管理頁；token 位於 URL fragment。管理頁可審核／拒絕投稿、開關討論與下載資料。不要把管理 URL 放進公開網頁。

## 網站連線

`lib/pocket-polis.ts` 只包含公開服務網址、討論 ID 與介紹；管理憑證不進入網站環境變數、前端 bundle 或 API。

Next Route Handler `/api/2027/discussion/[[...path]]` 僅代理固定場次的公開 info、next、results、statements-public、synthesis、votes、statements，驗證來源與輸入、設定逾時、回應 no-store/noindex。不代理建立討論、管理或匯出，亦不修改上游 CORS/CSP。

瀏覽器只在按下「開始回應」或送出觀點時建立隨機 UUID，以 `neogen:polis:v1:<conversationId>` 存於 localStorage；儲存不可用時退回本頁暫存並告知使用者。換瀏覽器或清除資料會被視為不同參與者，故統計不是一人一票的代表性民調。API 不蒐集姓名、信箱或電話；請勿在自由文字中填入個資。

共識進度提供簡圖（最多 1,000 點）；點選「完整意見地圖與 AI 綜整」會在同頁展開完整報告，按需載入程式。完整地圖使用 Canvas 繪製所有公開回應點，提供縮放、群組突出顯示與既有參與者位置；不建立新的參與識別碼。報告包含群組代表觀點、共同同意與不同意、橋接排序、全部觀點的搜尋與主題篩選，以及逐則回應次數。小群組與引用資料依上游隱私規則呈現，管理功能仍在獨立管理頁。

僅在使用者展開完整報告時查詢 `/synthesis`；該查詢可能依上游規則排入 AI 工作。pending 或 refreshPending 依服務建議間隔（5–30 秒）最多自動查詢 8 次，背景分頁暫停、收起報告會中止請求和計時器。可手動再次更新。資料不足／暫不可用／連線錯誤均明確標示；ready 的生成時間、統計依據、模型、舊版／更新中狀態與來源引用一併顯示。`generationMode=deterministic` 標示「統計摘要」，不稱為 AI 生成。AI 需達資料門檻與可用額度，不保證立即產生；不使用模擬票補足正式門檻。

## 維護與部署

在獨立可寫目錄 clone 上游並 checkout 上列 SHA，安裝依賴。需要更新時先比對上游改動；保留 `polis-serverless` Worker 與 `pocket-polis-sensemaking` Queue 名稱。不要部署上游 `production` 環境，該環境含作者的自訂網域。

```sh
git clone https://github.com/mashbean/pocket-polis.git
cd pocket-polis
git checkout f7ec343b6ec7ee39a7586f4eba49771f0009738c
npm ci
npx wrangler whoami
# 只有登入失效時執行，OAuth 由使用者完成：
npx wrangler login
npm run check
npm run deploy -- --env=""
```

Worker 更新不等同於部署本 Next.js 網站。此整合包含動態 API，網站正式發布須提供 Next.js server/Route Handler 執行環境，不能僅上傳靜態 HTML。正常環境使用 `lib/pocket-polis.ts` 的正式設定；`POCKET_POLIS_ORIGIN`、`POCKET_POLIS_CONVERSATION_ID` 是僅供伺服器的替代設定，可用於本機 QA，勿把模擬場設定部署到正式網站。

## 驗證記錄

上游 `npm run check`：TypeScript、159 測試與 Wrangler dry-run 通過。正式健康／參與／報告／管理授權驗證通過，建立後 8 則觀點、0 參與者、0 投票。寫入測試只在本機 Wrangler 模擬討論中執行。網站檢查涵蓋三種回應、重新整理保留進度、投稿待審核、全部回應完成、共識不足、離線恢復、來源與端點限制、桌面／手機與無 JavaScript 基本內容。

完整報告整合驗證：正式場讀取到 insufficient（0 位參與者、8 則觀點），頁內展開及收合焦點回復正常；以本機瀏覽器攔截的明確模擬資料測試 1,501 點完整地圖、縮放、群組與個人位置、代表觀點隱私遮蔽、引用原文／已撤下狀態、主題搜尋與分頁，以及 AI ready、pending、unavailable、錯誤重試、deterministic、stale 和停止輪詢。這些模擬回應不會送到正式服務。

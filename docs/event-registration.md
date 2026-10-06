# 2027 活動報名

最後更新：2026-10-05。所有網站報名入口改為直接另開 Google 表單，已移除原本的頁內報名區塊；黃色日期票券移至首頁活動資訊摘要。以下 9 月部署與區塊紀錄保留作歷史參考。

目前部署：`dpl_5SdTENmHR6cvDJiBVivkXLfN5P5V`（2026-10-05），已 promote 至正式網域。首頁與活動資訊頁 HTTP 200；報名按鈕直連指定 Google 表單，無原報名區塊或失效錨點。ESLint、4 項報名測試與本機／Vercel 正式建置通過；390px 手機選單按鈕可收合選單，頁面無橫向溢出。

先前紀錄：2026-09-21。依使用者「開放報名」指示，正式網站已啟用報名區塊、桌面導覽按鈕與手機全螢幕選單入口。元件維持一句說明、單一外連按鈕與 Google 登入提示，填答由使用者提供的 Google 表單處理。

- [正式報名表單](https://docs.google.com/forms/d/e/1FAIpQLSe-Rg7S0rSBlEUfXWQH12bRS86au6uT-kU2L6lhFkhfUKZ0ng/viewform)
- 正式部署：`dpl_5dfoLDDkgUbcVipBV39mFyDm9SPZ`，`https://neogen-org-jhmjlk9vv-mengxiaozhi.vercel.app`，已 promote 至正式網域。
- 本次使用獨立發布目錄，包含活動資訊、住宿／場地地圖與報名入口更新，未帶入工作區其他首頁／團隊頁的未完成修改。
- 原公告報名時程仍為 2026/09/23–2026/12/15（額滿提早截止）；依本次指示提前開放網站入口。

## Google 表單與歷史預覽

- [新版公開報名表](https://docs.google.com/forms/d/e/1FAIpQLSe-Rg7S0rSBlEUfXWQH12bRS86au6uT-kU2L6lhFkhfUKZ0ng/viewform)
- [新版表單管理入口](https://docs.google.com/forms/d/1uKxNEODkWz43vZk-I1D_Ezq2Slpy92UPhYRjtSe5O2Y/edit)
- [網站報名元件 Preview](https://neogen-org-2v8yec6qf-mengxiaozhi.vercel.app/2027#event-registration)
- Preview 部署：`dpl_DVhGoZgniJNaWPfTYYuxR1zU8K6D`，Vercel 專案 `mengxiaozhi/neogen-org-tw`，`preview / Ready`。

新版表單有八個區段：活動說明與住宿需求、隱私條款、基本資料、代表志願、立法委員調查、國會記者調查、會議期許，以及結尾建議。角色分流與必填欄位由 Google 表單維護。表單開啟了驗證電子郵件收集，作答者必須登入 Google；本次未變更表單內容、設定、所有權或既有回覆。

Google 的登入、同意程序、欄位檢查、分流和送出確認由原表單處理。網站不使用舊六欄 schema，也不自行顯示報名成功。費用、資格和報名時程等內容以表單及主辦單位公告為準，網站活動資訊頁同步提供最新資訊。

## 網站實作

- `lib/event-registration.ts`：公開表單網址。
- `app/2027/page.tsx` 與 `app/2027/event-actions.tsx`：首頁、桌面及手機導覽直接連到 `REGISTRATION_FORM_URL`，使用新分頁。
- `app/2027/event-ticket.tsx` 與對應 CSS：保留黃色日期票券，顯示於首頁活動資訊摘要。原報名區塊元件與樣式已移除。
- `lib/event-features.ts`：server-only `EVENT_REGISTRATION_ENABLED`，只有明確為 `true` 才顯示 Google 表單報名入口。
- `app/api/2027/registration/route.ts`：已退役的網站收件 API。功能關閉時回傳 404；功能開啟時回傳 410 與新版表單網址，不讀取送入資料、不聯絡 Google、不回傳報名成功。

Production 與本機設定已設為 `EVENT_REGISTRATION_ENABLED=true`，`.env.example` 同步更新；Preview 設定未更動。只有明確為 `true` 才開放，缺少設定時仍關閉。更改開關後需重新建置／部署，保持靜態頁面、導覽、FAQ、SEO 與 API 一致。

新版不再使用 `GOOGLE_REGISTRATION_WEBHOOK_URL`。既有本機或 Preview 環境變數即使保留，也不會被新版程式讀取。`.env*`、`.local`、`.vercel`、維護文件與測試均透過 `.vercelignore` 排除，不上傳至部署。

## 舊收件通道已停用

- [舊 Apps Script 專案](https://script.google.com/u/0/home/projects/1K3795vO32wDoiGGTmkN6NILwxJBSe6v-o6sWvEKotSz6AYgq2wbvSg7o/edit)
- `scripts/google-registration.gs` 為退役版本，2026-09-10 已更新現有部署至第 2 版，保留原 `/exec` 網址與原本存取設定。
- GET 回報 `configured:false`、`mode:google-forms` 和新版表單網址。
- POST 回報 `ok:false`、`code:CLOSED`、`reason:FORM_REPLACED`，完全不操作表單。`CLOSED` 可讓仍使用舊程式的不可變 Preview 顯示停止收件。
- `setupRegistration` 已停用，不要重新執行舊初始化程式。
- [舊六欄表單與既有回覆](https://docs.google.com/forms/d/1q_KBpR7canULN20iwU_BfTgLtPUeRb-FnuuUjB9d3t8/edit) 未刪除或變更；此表不再被新版網站引用。舊公開 Google 表單本身的發布設定未修改。

改版前的 Script、測試與維護文件存於被忽略的 `.local/registration-legacy/` 供追溯；這些屬歷史實作，不能直接恢復為新版收件流程。舊表保留 2026-09-08 的一筆網站驗證回覆，本次未讀取或刪除任何回覆。

## 2026-09-21 正式開放驗證

- 獨立發布版本的 31 項測試與本機正式建置通過，Vercel 遠端建置成功。
- 正式 `/2027` 與 `/2027/program` 均回應 200，顯示報名 CTA，無「網站入口尚未開放」訊息。
- 正式首頁包含報名區塊與指定 Google 表單網址；活動資訊頁連回首頁報名區塊，場地地圖仍存在。
- 正式退役 API 以空請求驗證回應 410，沒有新增報名資料。
- 本機手機全螢幕選單的「填寫報名資料」可關閉選單並前往報名區塊。
- 瀏覽器開啟 Google 表單，確認有可填寫的電子郵件、住宿欄位與繼續按鈕；未填答、未送出或新增測試回覆。

## 歷史驗證紀錄（2026-09-10，非目前部署狀態）

以下為早期簡化／串接版本的紀錄；正式環境的目前狀態以上方 2026-09-21 驗證為準。

```sh
node --test tests/event-registration.test.mjs
npm run lint
npx tsc --noEmit
```

- 四項測試通過：新版網址一致性、關閉時 API 404、開啟時退役 API 410、舊 Script 拒收且不接觸表單資料。
- ESLint、TypeScript 與 Vercel 建置通過。
- 受保護 Preview `/2027` 回應 200，HTML 有新版表單網址，沒有舊表單網址；退役 API 實際回應 410。
- 正式 `https://www.neogen.org.tw/2027` 回應 200；HTML 不含報名區塊或 Google 表單，報名 API 回應 404。本次沒有部署或 promote 至 Production。
- 瀏覽器實際點擊「開啟報名表單」後，另開使用者提供的新表單，核對標題、電子郵件驗證與住宿欄位。
- 內嵌表單在本機內建瀏覽器曾出現空白，但相同 Google 網址在獨立分頁正常顯示；因此另開分頁為主要入口，嵌入僅作可選方式，並保留清楚提示。未認定空白頁的確切成因。
- Preview 的響應式單欄畫面在實際約 695 × 692 視窗無橫向溢出，展開／收合與外連均可操作。工具設定的 390 × 844 未反映到實際 viewport，不能視為該尺寸的實測。
- 本次未送出新版報名、代勾隱私同意或新增測試回覆；收件最終確認以 Google 表單顯示為準。

嵌入方式依據 [Google 表單發布與嵌入說明](https://support.google.com/docs/answer/2839588?hl=en)。

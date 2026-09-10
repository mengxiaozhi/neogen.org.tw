# 2027 活動報名

最後更新：2026-09-10。網站報名元件已改接使用者提供的完整 Google 表單，並依最新回饋簡化為一句說明、單一外連按鈕與登入提示；三步指引和頁內嵌入選項已移除。保留米白、深綠、橘色與黃色票券設計，填答在 Google 表單完成。**正式網站的報名功能仍關閉；此次簡化尚未部署，下方 Preview 是先前的串接版本。**

## Google 表單與預覽

- [新版公開報名表](https://docs.google.com/forms/d/e/1FAIpQLSe-Rg7S0rSBlEUfXWQH12bRS86au6uT-kU2L6lhFkhfUKZ0ng/viewform)
- [新版表單管理入口](https://docs.google.com/forms/d/1uKxNEODkWz43vZk-I1D_Ezq2Slpy92UPhYRjtSe5O2Y/edit)
- [網站報名元件 Preview](https://neogen-org-2v8yec6qf-mengxiaozhi.vercel.app/2027#event-registration)
- Preview 部署：`dpl_DVhGoZgniJNaWPfTYYuxR1zU8K6D`，Vercel 專案 `mengxiaozhi/neogen-org-tw`，`preview / Ready`。

新版表單有八個區段：活動說明與住宿需求、隱私條款、基本資料、代表志願、立法委員調查、國會記者調查、會議期許，以及結尾建議。角色分流與必填欄位由 Google 表單維護。表單開啟了驗證電子郵件收集，作答者必須登入 Google；本次未變更表單內容、設定、所有權或既有回覆。

Google 的登入、同意程序、欄位檢查、分流和送出確認由原表單處理。網站不使用舊六欄 schema，也不自行顯示報名成功。費用、資格和報名時程等內容以表單及主辦單位公告為準，本次未將其新增至網站其他公告區。

## 網站實作

- `lib/event-registration.ts`：公開表單網址。
- `app/2027/registration-form.tsx`：品牌外框、單一報名入口與新分頁／Google 登入提示，使用伺服器元件，沒有 iframe 或前端狀態。
- `app/2027/registration.module.css`：響應式排版與既有活動視覺。
- `lib/event-features.ts`：server-only `EVENT_REGISTRATION_ENABLED`，只有明確為 `true` 才顯示報名區塊及入口。
- `app/api/2027/registration/route.ts`：已退役的網站收件 API。功能關閉時回傳 404；Preview 開啟時回傳 410 與新版表單網址，不讀取送入資料、不聯絡 Google、不回傳報名成功。

Production 與一般本機設定維持 `EVENT_REGISTRATION_ENABLED=false`，Preview 維持 `true`。更改開關後需重新建置／部署，保持靜態頁面、導覽、FAQ、SEO 與 API 一致。未取得開放正式報名指示前，不啟用 Production。

新版不再使用 `GOOGLE_REGISTRATION_WEBHOOK_URL`。既有本機或 Preview 環境變數即使保留，也不會被新版程式讀取。`.env*`、`.local`、`.vercel`、維護文件與測試均透過 `.vercelignore` 排除，不上傳至部署。

## 舊收件通道已停用

- [舊 Apps Script 專案](https://script.google.com/u/0/home/projects/1K3795vO32wDoiGGTmkN6NILwxJBSe6v-o6sWvEKotSz6AYgq2wbvSg7o/edit)
- `scripts/google-registration.gs` 為退役版本，2026-09-10 已更新現有部署至第 2 版，保留原 `/exec` 網址與原本存取設定。
- GET 回報 `configured:false`、`mode:google-forms` 和新版表單網址。
- POST 回報 `ok:false`、`code:CLOSED`、`reason:FORM_REPLACED`，完全不操作表單。`CLOSED` 可讓仍使用舊程式的不可變 Preview 顯示停止收件。
- `setupRegistration` 已停用，不要重新執行舊初始化程式。
- [舊六欄表單與既有回覆](https://docs.google.com/forms/d/1q_KBpR7canULN20iwU_BfTgLtPUeRb-FnuuUjB9d3t8/edit) 未刪除或變更；此表不再被新版網站引用。舊公開 Google 表單本身的發布設定未修改。

改版前的 Script、測試與維護文件存於被忽略的 `.local/registration-legacy/` 供追溯；這些屬歷史實作，不能直接恢復為新版收件流程。舊表保留 2026-09-08 的一筆網站驗證回覆，本次未讀取或刪除任何回覆。

## 驗證紀錄

此次簡化的 ESLint 與既有四項報名測試通過。以下遠端部署與瀏覽器紀錄屬於簡化前的串接版本，不代表簡化版已部署或完成視覺驗證。

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

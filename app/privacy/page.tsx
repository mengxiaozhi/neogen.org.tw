import type { Metadata } from "next";
import Link from "next/link";
import { ASSOCIATION_LEGAL_NAME, sharedRobots } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Cookie 與隱私說明",
  description: "了解臺灣新文化青年協會網站的 Google Analytics、Cookie 用途、保存期限與同意撤回方式。",
  alternates: { canonical: "/privacy" },
  robots: sharedRobots,
};

export default function PrivacyPage() {
  return <main className={styles.page}>
    <nav aria-label="返回網站"><Link href="/">協會首頁</Link><Link href="/2027">2027 青年參議院</Link></nav>
    <p className={styles.eyebrow}>YOUR PRIVACY, YOUR CHOICE</p>
    <h1>Cookie 與隱私說明</h1>
    <p className={styles.updated}>最後更新：<time dateTime="2026-09-21">2026 年 9 月 21 日</time></p>
    <p>本網站由{ASSOCIATION_LEGAL_NAME}營運。以下說明網站分析與瀏覽器儲存的用途；報名表與第三方服務另有其告知內容，請於使用時閱讀。</p>
    <section><h2>你的選擇</h2><p>在你明確接受前，本網站不會載入 Google Analytics。接受或拒絕分析 Cookie 都不影響瀏覽；繼續瀏覽或捲動頁面不代表同意。你可隨時使用頁面左下角的「Cookie 設定」更改選擇。</p><p>偏好保存於此瀏覽器 180 天，到期後會再次詢問。拒絕與同意保存相同時間；清除網站資料或更換瀏覽器後須重新選擇。</p></section>
    <section><h2>使用哪些儲存與資料？</h2>
      <h3>必要功能：記住 Cookie 偏好</h3><p>使用本機儲存（localStorage）項目 <code>neogen:cookie-consent:v1</code>，記錄選擇、時間與說明版本，保存 180 天。這項偏好不送往 Google，也不用於分析或廣告。</p>
      <h3>自願分析：Google Analytics</h3><p>同意後，Google Analytics 使用 <code>_ga</code>、<code>_ga_*</code> 等 Cookie 區分瀏覽器與工作階段，分析瀏覽頁面、來源、互動事件、瀏覽器與裝置、概略地區等資訊，協助本協會了解網站使用情形及改善內容。連線過程也會將 IP 位址等網路資訊傳送給 Google 處理。</p><p>本網站將分析 Cookie 的保存期限設為最長 180 天，並關閉 Google signals、廣告資料使用與廣告個人化。Google 伺服器端的資料保存另依其服務與本協會設定辦理；瀏覽器 Cookie 到期不等於伺服器資料同步刪除。</p>
      <h3>Google 地圖</h3><p>活動資訊頁嵌入 Google 地圖，顯示活動與住宿位置。載入活動資訊頁的地圖時，瀏覽器會連線至 Google，傳送 IP 位址等網路資訊；Google 可能依其服務設定使用 Cookie。地圖服務與本網站的 Google Analytics 分析選擇分開，相關資料處理依 Google 隱私權政策辦理。</p>
      <h3>議題實驗室與外部表單</h3><p>參與議題實驗室時，另使用瀏覽器中的隨機識別碼保存回應身分，與 GA 分析偏好分開管理；拒絕分析不會清除既有討論紀錄。這個識別碼沒有自動到期日，可透過瀏覽器清除網站資料，但將無法再以原識別碼接續參與。Google 報名表與外部連結由其服務提供者處理，請依該服務顯示的隱私告知決定是否使用。</p>
    </section>
    <section><h2>處理對象、方式與地區</h2><p>本協會使用統計報表了解網站使用情形；Google 提供分析服務，透過自動化方式處理分析資料，資料可能於臺灣以外的 Google 處理地區儲存或處理。</p><p>詳細資訊可參閱 <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google 隱私權政策</a>及 <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">Google 如何使用合作網站資料</a>。</p></section>
    <section><h2>撤回同意與資料權利</h2><p>在「Cookie 設定」選擇「僅使用必要 Cookie」，即可停止後續分析。若分析程式已載入，網站會移除目前網域可存取的 GA Cookie 並重新整理，以停止已載入的分析程式。撤回同意不會自動刪除先前已合法處理的資料。</p><p>你可向本協會提出查詢、閱覽、製給複製本、補充或更正，以及停止蒐集、處理、利用或刪除個人資料的請求。本協會將依適用法令及可識別的資料範圍處理。拒絕提供分析用途資料，不影響一般網站功能。</p></section>
    <section><h2>聯絡我們</h2><p>{ASSOCIATION_LEGAL_NAME}<br />通訊地址：(231) 新北市新店區安興路105號5樓之7<br />電子信箱：<a href="mailto:neogentaiwan2026@gmail.com">neogentaiwan2026@gmail.com</a></p></section>
  </main>;
}

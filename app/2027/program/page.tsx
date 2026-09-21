import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
import { eventMetadata, eventStructuredData } from "@/lib/event-seo";
import { isEventRegistrationEnabled } from "@/lib/event-features";
import { EventNavigation } from "../event-actions";
import { EventBrand } from "../event-brand";
import { EventProgram } from "../event-program";
import { LocationMap } from "../location-map";
import eventStyles from "../event.module.css";
import styles from "./page.module.css";

export const metadata: Metadata = eventMetadata("program");
export const viewport: Viewport = { themeColor: "#f7f5e9" };
const structuredData = eventStructuredData("program");

export default function EventProgramPage() {
  return (
    <div className={eventStyles.eventPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a href="#program-main" className={eventStyles.skipLink}>跳至活動資訊</a>
      <header className={eventStyles.header}>
        <div className={eventStyles.headerInner}>
          <EventBrand />
          <EventNavigation currentPage="program" registrationEnabled={isEventRegistrationEnabled()} />
        </div>
      </header>
      <main id="program-main" tabIndex={-1} className={styles.main}>
        <div className={styles.intro}>
          <nav className={styles.breadcrumbs} aria-label="麵包屑導覽"><Link href="/2027">活動理念</Link><span aria-hidden="true">/</span><span aria-current="page">活動資訊</span></nav>
          <p className={styles.eyebrow}>2027 · 青年參議院 — 立法院會議</p>
          <h1>活動資訊<span>。</span></h1>
          <p className={styles.description}>2027 青年參議院—立法院會議於 <time dateTime="2027-01-25">2027 年 1 月 25 日</time>至 <time dateTime="2027-01-27">27 日</time>舉辦，邀請高中職、大專校院學生參與三天模擬立法院。</p>
          <p className={styles.description}>主要場地為中華民國立法院（臺北市中正區中山南路1號），實際地點以錄取信件為準；未滿 18 歲者須繳交家長同意書。</p>
          <details className={styles.venueDetails}>
            <summary>次要活動場地</summary>
            <p>若立法院於會期中無法借用會議室，將使用次要場地：國立臺灣大學校友會館、臺大醫院國際會議中心、東吳大學城中校區或中華電信學院板橋院本部。實際安排以錄取信件為準。</p>
          </details>
          <LocationMap name="中華民國立法院" address="臺北市中正區中山南路1號" embedUrl="https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1z6Ie65YyX5biC5Lit5q2j5Y2A5Lit5bGx5Y2X6LevMeiZnw!6i16!3m1!1szh-TW!5m1!1szh-TW" />
          <dl className={styles.organizations} aria-label="活動單位">
            <div><dt>主辦單位</dt><dd>社團法人臺灣新文化青年協會</dd></div>
            <div><dt>合辦單位</dt><dd>AutBridge 自治橋</dd></div>
            <div><dt>指導單位</dt><dd>教育部青年發展署（邀請中）</dd></div>
          </dl>
          <nav className={styles.sections} aria-label="活動資訊章節">
            {[["event-practical", "報名與費用"], ["event-roles", "參與角色"], ["event-committees", "委員會議題"], ["event-schedule", "三天流程"]].map(([id, label]) => <a href={`#${id}`} key={id}>{label}<ArrowDownRight size={16} aria-hidden="true" /></a>)}
          </nav>
        </div>
        <EventProgram />
        <footer className={styles.footer}><Link href="/2027"><ArrowLeft size={17} aria-hidden="true" />返回活動理念</Link></footer>
      </main>
    </div>
  );
}

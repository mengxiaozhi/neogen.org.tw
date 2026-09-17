import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
import { eventMetadata, eventStructuredData } from "@/lib/event-seo";
import { isEventRegistrationEnabled } from "@/lib/event-features";
import { EventNavigation } from "../event-actions";
import { EventBrand } from "../event-brand";
import { EventProgram } from "../event-program";
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
          <p className={styles.description}>主要場地為中華民國立法院，實際地點以錄取信件為準；未滿 18 歲者須繳交家長同意書。</p>
          <nav className={styles.sections} aria-label="活動資訊章節">
            {[["event-practical", "報名與費用"], ["event-roles", "角色與議題"], ["event-schedule", "三天流程"]].map(([id, label]) => <a href={`#${id}`} key={id}>{label}<ArrowDownRight size={16} aria-hidden="true" /></a>)}
          </nav>
        </div>
        <EventProgram />
        <footer className={styles.footer}><Link href="/2027"><ArrowLeft size={17} aria-hidden="true" />返回活動理念</Link></footer>
      </main>
    </div>
  );
}

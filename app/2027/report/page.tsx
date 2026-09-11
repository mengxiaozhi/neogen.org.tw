import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { eventMetadata, eventStructuredData } from "@/lib/event-seo";
import DiscussionReport from "../discussion-report";
import { EventBrand } from "../event-brand";
import eventStyles from "../event.module.css";
import styles from "../report.module.css";

export const metadata: Metadata = eventMetadata("report");
export const viewport: Viewport = { themeColor: "#f7f5e9" };
const structuredData = eventStructuredData("report");

export default function EventReportPage() {
  return (
    <div className={eventStyles.eventPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a href="#report-main" className={eventStyles.skipLink}>跳至完整報告</a>
      <header className={eventStyles.header}>
        <div className={eventStyles.headerInner}>
          <EventBrand />
          <Link href="/2027" className={eventStyles.headerAction}>活動首頁 <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
      </header>
      <main id="report-main" tabIndex={-1} className={styles.pageContent}>
        <nav className={styles.breadcrumbs} aria-label="麵包屑導覽">
          <Link href="/2027">2027 青年參議院</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">對話觀測站</span>
        </nav>
        <DiscussionReport />
      </main>
    </div>
  );
}

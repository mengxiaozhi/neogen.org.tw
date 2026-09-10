import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_NAME, SITE_URL, sharedRobots } from "@/lib/seo";
import DiscussionReport from "../discussion-report";
import { EventBrand } from "../event-brand";
import eventStyles from "../event.module.css";
import styles from "../report.module.css";

const title = "意見地圖與 AI 綜整｜2027 青年參議院";
const description = "查看 2027 青年參議院議題實驗室的完整意見地圖、跨群共同點、AI 審議綜整與公開觀點，理解不同回應，也回到討論加入你的聲音。";
const image = { url: "/2027/opengraph-image", width: 1200, height: 630, alt: "2027 青年參議院 — 立法院會議" };

export const metadata: Metadata = {
  title,
  description,
  robots: sharedRobots,
  alternates: { canonical: "/2027/report" },
  openGraph: { type: "website", locale: "zh_TW", url: "/2027/report", siteName: SITE_NAME, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export const viewport: Viewport = { themeColor: "#f7f5e9" };

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "2027 青年參議院", item: `${SITE_URL}/2027` },
    { "@type": "ListItem", position: 2, name: "對話觀測站", item: `${SITE_URL}/2027/report` },
  ],
};

export default function EventReportPage() {
  return (
    <div className={eventStyles.eventPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
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

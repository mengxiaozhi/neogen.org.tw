import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowDownRight } from "lucide-react";
import { SITE_NAME, SITE_URL, sharedRobots } from "@/lib/seo";
import { isEventRegistrationEnabled } from "@/lib/event-features";
import { EventNavigation } from "../event-actions";
import { EventBrand } from "../event-brand";
import { EventProgram } from "../event-program";
import eventStyles from "../event.module.css";
import styles from "./page.module.css";

const title = "活動資訊｜2027 青年參議院—立法院會議";
const description = "2027 青年參議院活動資訊：查看報名時程、住宿與費用、立法委員及國會記者角色、模擬審議議題，以及 1 月 25 日至 27 日三天流程。";
const image = { url: "/2027/opengraph-image", width: 1200, height: 630, alt: "2027 青年參議院—立法院會議" };

export const metadata: Metadata = {
  title,
  description,
  robots: sharedRobots,
  alternates: { canonical: "/2027/program" },
  openGraph: { type: "website", locale: "zh_TW", url: "/2027/program", siteName: SITE_NAME, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

export const viewport: Viewport = { themeColor: "#f7f5e9" };

const breadcrumbs = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "活動理念", item: `${SITE_URL}/2027` },
    { "@type": "ListItem", position: 2, name: "活動資訊", item: `${SITE_URL}/2027/program` },
  ],
};

export default function EventProgramPage() {
  return (
    <div className={eventStyles.eventPage}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs).replace(/</g, "\\u003c") }} />
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
          <p className={styles.description}>從報名準備到會議安排，活動資訊都在這裡。</p>
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

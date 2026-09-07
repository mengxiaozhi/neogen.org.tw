import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  Lightbulb,
  MessagesSquare,
  Megaphone,
  Plus,
  Sparkles,
  Sun,
} from "lucide-react";

import { EventNavigation, ShareEvent } from "./event-actions";
import { InteractiveAssembly } from "./interactive-assembly";
import styles from "./event.module.css";

const eventTitle = "2027 青年參議院 — 立法院會議";
const searchTitle = "2027 青年參議院｜1/25–1/27 立法院會議";
const description =
  "2027 青年參議院「立法院會議」於 1 月 25 日至 27 日舉辦。查看活動理念、日期、報名公告與常見問題，一起關心公共事務、參與多元對話。場地、每日時間與報名資訊待公布。";

export const metadata: Metadata = {
  title: searchTitle,
  description,
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  alternates: { canonical: "/2027" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "/2027",
    siteName: "臺灣新文化青年協會",
    title: searchTitle,
    description,
    images: [
      {
        url: "/2027/event-poster.png",
        width: 1122,
        height: 1402,
        alt: eventTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: searchTitle,
    description,
    images: ["/2027/event-poster.png"],
  },
};

export const viewport: Viewport = { themeColor: "#f7f5e9" };

// Add Event rich-result markup once a confirmed venue and address are available.
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://neogen.org.tw/2027#webpage",
      url: "https://neogen.org.tw/2027",
      name: searchTitle,
      description,
      inLanguage: "zh-Hant-TW",
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: "https://neogen.org.tw/2027/event-poster.png",
        width: 1122,
        height: 1402,
        caption: eventTitle,
      },
      breadcrumb: { "@id": "https://neogen.org.tw/2027#breadcrumb" },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://neogen.org.tw/2027#breadcrumb",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "臺灣新文化青年協會", item: "https://neogen.org.tw/" },
        { "@type": "ListItem", position: 2, name: eventTitle, item: "https://neogen.org.tw/2027" },
      ],
    },
  ],
};

const beliefs = [
  {
    number: "01",
    icon: Lightbulb,
    title: "從提問開始",
    english: "THINK INDEPENDENTLY",
    description: "面對習以為常的答案，多問一句為什麼。讓關心有依據，讓思考有自己的方向。",
  },
  {
    number: "02",
    icon: MessagesSquare,
    title: "讓不同對話",
    english: "LISTEN & DISCUSS",
    description: "說出自己的觀點，也聽見不同的聲音。在多元立場之間，練習理解與交流。",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "把關心化為參與",
    english: "MAKE YOUR VOICE HEARD",
    description: "公共事務與每個人的生活相連。從身邊的議題出發，找到自己參與的起點。",
  },
] as const;

const eventDetails = [
  { label: "活動名稱", value: "2027 青年參議院", note: "立法院會議" },
  { label: "活動日期", value: "2027 年 1 月 25 日至 27 日", note: "每日活動時間待公布" },
  { label: "活動地點", value: "待公布", note: "場地與交通資訊將於確認後更新" },
  { label: "報名資訊", value: "待公布", note: "報名方式、資格、名額與費用尚未公布" },
] as const;

const questions = [
  {
    question: "活動什麼時候舉辦？在哪裡舉行？",
    answer: "2027 青年參議院「立法院會議」將於 2027 年 1 月 25 日至 27 日舉辦。每日活動時間與舉辦場地尚未公布，請留意本頁活動資訊。",
  },
  {
    question: "誰可以參加？需要相關經驗嗎？",
    answer: "參加資格、年齡限制與是否需要相關經驗，將以正式報名簡章為準。目前簡章尚未公布。",
  },
  {
    question: "如何報名？參加需要費用嗎？",
    answer: "報名尚未開放，報名連結、開放時間、參與名額及費用資訊均待公布。可以先收藏本頁或下載活動海報。",
  },
  {
    question: "哪裡可以看到議程與最新資訊？",
    answer: "活動議程與相關安排將於確認後更新至本頁。目前尚無已公布的議程，請以後續正式公告為準。",
  },
] as const;

export default function Event2027Page() {
  return (
    <div className={styles.eventPage} id="event-top">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a href="#event-main" className={styles.skipLink}>跳至主要內容</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#event-top" aria-label="青年參議院 2027，回到頁首">
            <Sun aria-hidden="true" className={styles.brandSun} strokeWidth={1.8} />
            <span>青年參議院 <b>2027</b></span>
          </a>
          <EventNavigation />
        </div>
      </header>

      <main id="event-main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="event-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>讓青春，走進公共現場</p>
            <h1 id="event-title" className={styles.heroTitle}>
              <span className={styles.year}>2027</span>
              <span className={styles.titleWords}>
                <span>青年<span className={styles.titleStar} aria-hidden="true">✦</span></span>
                <span>參議院</span>
              </span>
              <span className={styles.subtitle}>— 立法院會議 —</span>
            </h1>
            <p className={styles.heroDescription}><time dateTime="2027-01-25">2027 年 1 月 25 日</time>至<time dateTime="2027-01-27">27 日</time><br />讓每一個提問，都成為改變的起點。</p>
            <div className={styles.heroActions}>
              <a href="#event-about" className={styles.primaryButton}>
                探索活動 <ArrowUpRight aria-hidden="true" />
              </a>
              <a className={styles.textLink} href="/2027/event-poster.png" download="2027-青年參議院-活動海報.png">
                收藏活動海報 <Download size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className={styles.heroArtwork}>
            <InteractiveAssembly>
            <Image
              src="/2027/youth-assembly-illustration.png"
              width={1254}
              height={1254}
              alt="青年舉手發聲、手持筆記與擴音器，周圍有議事建築、百合與臺灣輪廓的版畫插畫"
              sizes="(max-width: 760px) 100vw, (max-width: 1440px) 62vw, 890px"
              loading="eager"
              fetchPriority="high"
            />
            <span className={styles.heroSticker}><span aria-hidden="true">✳</span> 青春發聲中</span>
            </InteractiveAssembly>
          </div>
          <a href="#event-about" className={styles.scrollNote} aria-label="往下閱讀活動理念">
            <span>SCROLL TO EXPLORE</span><ArrowDown size={14} aria-hidden="true" />
          </a>
        </section>

        <div className={styles.ribbon} aria-label="獨立思考、青年發聲、公共參與、多元對話">
          <div className={styles.ribbonInner} aria-hidden="true">
            { ["獨立思考", "青年發聲", "公共參與", "多元對話"].map((word) => (
              <span key={word}>{word}<span className={styles.ribbonStar}>✳</span></span>
            )) }
          </div>
        </div>

        <section id="event-about" tabIndex={-1} className={`${styles.section} ${styles.about}`} aria-labelledby="about-heading">
          <p className={styles.sectionLabel}><span>01 /</span> 活動理念 <span className={styles.englishLabel}>THE IDEA</span></p>
          <div className={styles.aboutIntro}>
            <h2 id="about-heading">關心的事，<br />一起帶進討論<span className={styles.orangeDot}>。</span></h2>
            <div className={styles.aboutCopy}>
              <p>每個世代，都有想改變的事。<br />從生活中的一個提問，到對公共事務的關心，青年觀點值得被聽見。</p>
              <p>2027 青年參議院，邀你一起思考：我們如何理解議題、傾聽彼此，並以自己的聲音參與公共討論？</p>
            </div>
          </div>
          <div className={styles.beliefs}>
            {beliefs.map(({ number, icon: Icon, title, english, description: copy }) => (
              <article key={number} className={styles.belief}>
                <div className={styles.beliefTop}>
                  <span>{number}</span>
                  <Icon size={35} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p className={styles.beliefEnglish}>{english}</p>
                <p className={styles.beliefDescription}>{copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="event-info" tabIndex={-1} className={styles.infoSection} aria-labelledby="info-heading">
          <div className={`${styles.section} ${styles.infoInner}`}>
            <div className={styles.infoCopy}>
              <p className={styles.sectionLabel}><span>02 /</span> 活動資訊 <span className={styles.englishLabel}>THE DETAILS</span></p>
              <h2 id="info-heading">下一個現場，<br />期待有你<span className={styles.orangeDot}>。</span></h2>
              <p className={styles.infoLead}>先把期待留給 2027。<br />更多活動細節，將在這裡與你分享。</p>
              <dl className={styles.eventDetails}>
                {eventDetails.map((detail) => (
                  <div key={detail.label} className={styles.detailRow}>
                    <dt>{detail.label}</dt>
                    <dd><strong>{detail.value}</strong><span>{detail.note}</span></dd>
                  </div>
                ))}
              </dl>
              <p className={styles.announcement}><span aria-hidden="true" /> 報名尚未開放，請留意後續公告。</p>
            </div>
            <figure className={styles.posterFigure}>
              <a href="/2027/event-poster.png" target="_blank" rel="noopener noreferrer" className={styles.posterLink} aria-label="在新分頁開啟 2027 青年參議院完整海報">
                <Image
                  src="/2027/event-poster.png"
                  alt="2027 青年參議院 — 立法院會議活動海報"
                  width={1122}
                  height={1402}
                  sizes="(max-width: 760px) 85vw, (max-width: 1100px) 42vw, 450px"
                />
                <span className={styles.posterZoom}><ArrowUpRight size={20} aria-hidden="true" /><span>查看完整海報</span></span>
              </a>
              <figcaption>
                <span>2027 青年參議院 · 活動主視覺</span>
                <a href="/2027/event-poster.png" download="2027-青年參議院-活動海報.png" aria-label="下載活動海報 PNG"><Download size={19} aria-hidden="true" /></a>
              </figcaption>
            </figure>
          </div>
        </section>

        <section id="event-faq" tabIndex={-1} className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <div>
            <p className={styles.sectionLabel}><span>03 /</span> 常見問題 <span className={styles.englishLabel}>Q & A</span></p>
            <h2 id="faq-heading">你可能<br />也想知道<span className={styles.orangeDot}>。</span></h2>
            <Sparkles className={styles.faqSparkle} size={80} strokeWidth={1} aria-hidden="true" />
          </div>
          <div className={styles.questions}>
            {questions.map((item, index) => (
              <details key={item.question} className={styles.question}>
                <summary>
                  <span className={styles.questionNumber}>0{index + 1}</span>
                  <span>{item.question}</span>
                  <Plus className={styles.questionPlus} size={21} aria-hidden="true" />
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.closing} aria-labelledby="closing-heading">
          <div className={styles.closingInner}>
            <p className={styles.closingEyebrow}>2027 · 青年參議院</p>
            <h2 id="closing-heading">未來的對話，<br />留一個位置給你<span>。</span></h2>
            <p>收藏這場期待，也把邀請分享給一起關心公共事務的朋友。</p>
            <div className={styles.closingActions}>
              <a className={styles.yellowButton} href="/2027/event-poster.png" download="2027-青年參議院-活動海報.png">
                下載活動海報 <Download size={19} aria-hidden="true" />
              </a>
              <ShareEvent />
            </div>
            <span className={styles.closingSun} aria-hidden="true">✳</span>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" className={styles.associationLink}>臺灣新文化青年協會 <ArrowUpRight size={20} aria-hidden="true" /></Link>
          <p>以青年之聲，寫臺灣新章。</p>
          <a href="#event-top" className={styles.backToTop}>回到頂端 <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <div className={styles.footerBottom}><span>TAIWAN NEW CULTURE YOUTH ASSOCIATION</span><span>2027 青年參議院 — 立法院會議</span></div>
      </footer>
    </div>
  );
}

import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Download,
  GitFork,
  Lightbulb,
  MessagesSquare,
  Megaphone,
  Plus,
  Sparkles,
} from "lucide-react";

import { eventMetadata, eventStructuredData } from "@/lib/event-seo";
import { AssociationLogo } from "@/components/association-logo";

import { EventBrand } from "./event-brand";
import { EventSymbol } from "./event-symbol";
import { EventNavigation, ShareEvent } from "./event-actions";
import { InteractiveAssembly } from "./interactive-assembly";
import { EventMotion } from "./event-motion";
import { YouthDiscussion } from "./youth-discussion";
import { EventTicket } from "./event-ticket";
import { REGISTRATION_FORM_URL } from "@/lib/event-registration";
import { isEventRegistrationEnabled } from "@/lib/event-features";
import { SOURCE_REPOSITORY_URL } from "@/lib/seo";
import styles from "./event.module.css";

const registrationEnabled = isEventRegistrationEnabled();
export const metadata: Metadata = eventMetadata("home");
export const viewport: Viewport = { themeColor: "#f7f5e9" };
const structuredData = eventStructuredData("home");

const beliefs = [
  {
    number: "01",
    icon: Lightbulb,
    title: "理解民主制度",
    english: "UNDERSTAND DEMOCRACY",
    description: "認識議事規則與法案撰寫，理解公共決策如何形成。",
  },
  {
    number: "02",
    icon: MessagesSquare,
    title: "練習協商與表達",
    english: "DISCUSS & NEGOTIATE",
    description: "在協商與討論中，練習分析、表達與合作。",
  },
  {
    number: "03",
    icon: Megaphone,
    title: "把關心化為參與",
    english: "MAKE YOUR VOICE HEARD",
    description: "把討論化為青年觀點與政策建議，延續公共參與。",
  },
] as const;

const eventDetails = [
  { label: "活動日期", value: "2027 年 1 月 25 日至 27 日", note: "首日 09:00 報到" },
  { label: "參加對象", value: "高中職、大專校院學生", note: "未滿 18 歲須附家長同意書" },
  { label: "主要場地", value: "中華民國立法院", note: "實際地點以錄取信件為準" },
  { label: "主辦單位", value: "社團法人臺灣新文化青年協會", note: "合辦單位：AutBridge 自治橋｜指導單位：教育部青年發展署（邀請中）" },
] as const;

const questions = [
  {
    question: "活動繳費及錄取確認",
    answer: (
      <>
        本次活動籌備團隊將在十月底、十一月底及十二月底分別錄取三批學員（如提前額滿則提前截止），並寄送「錄取通知」至您報名時填寫的常用信箱，並請於收到錄取通知後五天內繳費。
        <br /><br />
        <strong>‼️需「收到錄取通知並完成繳費」才算完成報名程序‼️</strong>
        <br /><br />
        繳費完後經本協會對帳，如無錯誤將寄送「繳款成功通知書」。
        <br />
        因此請各位有報名的學員隨時留意信箱！！！
      </>
    ),
  },
  {
    question: "政黨及委員會分配",
    answer: (
      <>
        我們將以立法院現行的黨團分佈為主，並依照您填寫報名表的內容作為審查依據分配政黨。
        <br /><br />
        委員會分配部分，則由活動第一天下午之黨團會議由各黨團內部進行分配協調。
      </>
    ),
  },
  {
    question: "本次會議是否提供住宿？",
    answer: "不統一集中住宿，提供代訂服務。住宿地點為鄰近立法院的「美亞商旅 臺北車站」，費用為每人 2,000 元（一天 1,000 元、不包含活動前一天住宿），房型原則以四人入住之豪華四人房。",
  },
  {
    question: "活動場地及如何前往？",
    answer: (
      <>
        本次會議主要場地設定中華民國立法院（臺北市中正區中山南路1號），可搭乘公車（232、265 等路線）、捷運（鄰近板南線善導寺、臺北車站）、或臺鐵高鐵至臺北車站。
        <br /><br />
        另設定次要場地，亦為鄰近立法院之臺大校友會館、臺大國際會議中心，以因應立法院可能於會期進行中難以借用會議室。
      </>
    ),
  },
  {
    question: "雙代配對機制？",
    answer: <>🈚️。<br />活動規劃以單代為主。</>,
  },
  {
    question: "服裝儀容是否有要求？",
    answer: "鑒於活動場地為立法院，為求仿真國會之議事氛圍，請著「正式服裝」，如西裝、襯衫等，西裝搭配素色上衣亦可。如為學生且無正裝，可著學校制服作為正式服裝。鞋款則端莊即可，無硬性規定必須為皮鞋👞。",
  },
  {
    question: "活動供餐是否？",
    answer: "有的，本次會議提供早餐及午餐，讓每位學員在疲累的議事攻防中都能獲得充足的養分。",
  },
  {
    question: "有其他疑問怎麼辦？",
    answer: "歡迎私訊臺灣新文化青年協會粉絲專頁解惑。",
  },
] as const;

export default function Event2027Page() {
  return (
    <div className={styles.eventPage} id="event-top">
      <EventMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <a href="#event-main" className={styles.skipLink}>跳至主要內容</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <EventBrand home />
          <EventNavigation registrationEnabled={registrationEnabled} />
        </div>
      </header>

      <main id="event-main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="event-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>青年問政，議動臺灣</p>
            <h1 id="event-title" className={styles.heroTitle}>
              <span className={styles.year}>2027</span>
              <span className={styles.titleWords}>
                <span>青年<span className={styles.titleStar} aria-hidden="true">✦</span></span>
                <span>參議院</span>
              </span>
              <span className={styles.subtitle}>— 立法院會議 —</span>
            </h1>
            <p className={styles.heroDescription}><time dateTime="2027-01-25">2027 年 1 月 25 日</time>至<time dateTime="2027-01-27">27 日</time><br />三天模擬立法院，讓青年觀點走進議場。</p>
            <div className={styles.heroActions}>
              <a href={registrationEnabled ? REGISTRATION_FORM_URL : "/2027/program"} className={styles.primaryButton} target={registrationEnabled ? "_blank" : undefined} rel={registrationEnabled ? "noopener noreferrer" : undefined}>
                {registrationEnabled ? "立即報名" : "查看活動資訊"} <ArrowUpRight aria-hidden="true" />
              </a>
              <a className={styles.textLink} href="#event-about">
                探索活動 <ArrowDown size={17} aria-hidden="true" />
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
            <h2 id="about-heading">從請願到提案，<br />把民主實踐帶進今天<span className={styles.orangeDot}>。</span></h2>
            <div className={styles.aboutCopy}>
              <p>1921 年，蔣渭水、林獻堂等人發起臺灣議會設置請願運動。百年來，青年持續參與臺灣民主發展。</p>
              <p>2027 青年參議院邀請學生扮演立法委員與國會記者，透過三天模擬理解議事、討論公共議題。</p>
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
              <p className={styles.infoLead}>三天模擬議事、協商與採訪報導。</p>
              <EventTicket />
              <dl className={styles.eventDetails}>
                {eventDetails.map((detail) => (
                  <div key={detail.label} className={styles.detailRow}>
                    <dt>{detail.label}</dt>
                    <dd><strong>{detail.value}</strong><span>{detail.note}</span></dd>
                  </div>
                ))}
              </dl>
              <Link href="/2027/program" className={`${styles.textLink} ${styles.programLink}`}>查看活動資訊 <ArrowUpRight size={18} aria-hidden="true" /></Link>
              {registrationEnabled ? (
                <a href={REGISTRATION_FORM_URL} className={styles.textLink} target="_blank" rel="noopener noreferrer">填寫報名資料 <ArrowUpRight size={18} aria-hidden="true" /></a>
              ) : (
                <p className={styles.announcement}><span aria-hidden="true" /> 報名期間為 2026/09/23–12/15，採先報名先書審，額滿提前截止；網站入口尚未開放。</p>
              )}
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

        <YouthDiscussion />

        <section id="event-faq" tabIndex={-1} className={`${styles.section} ${styles.faqSection}`} aria-labelledby="faq-heading">
          <div>
            <p className={styles.sectionLabel}><span>04 /</span> 常見問題 <span className={styles.englishLabel}>Q & A</span></p>
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
            <div className={styles.closingCopy}>
              <p className={styles.closingEyebrow}>2027 · 青年參議院</p>
              <h2 id="closing-heading">未來的對話，<br />留一個位置給你<span>。</span></h2>
              <p>收藏海報，也分享給朋友。</p>
              <div className={styles.closingActions}>
                <a className={styles.yellowButton} href="/2027/event-poster.png" download="2027-青年參議院-活動海報.png">
                  下載活動海報 <Download size={19} aria-hidden="true" />
                </a>
                <ShareEvent />
              </div>
            </div>
            <EventSymbol variant="invitation" className={styles.closingSymbol} />
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" className={styles.associationLink}>
            <span className={styles.footerBrandLogo} aria-hidden="true">
              <AssociationLogo variant="event" />
            </span>
            <span>社團法人臺灣新文化青年協會</span>
            <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <p>以青年之聲，寫臺灣新章。</p>
          <a href="#event-top" className={styles.backToTop}>回到頂端 <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <address className={styles.associationDetails} aria-label="協會基本資料">
          <dl>
            <div><dt>立案字號</dt><dd>台內團字第1150024192號函</dd></div>
            <div><dt>統一編號</dt><dd>61490573</dd></div>
            <div><dt>通訊地址</dt><dd>(231) 新北市新店區安興路105號5樓之7</dd></div>
            <div><dt>電子信箱</dt><dd><a href="mailto:neogentaiwan2026@gmail.com">neogentaiwan2026@gmail.com</a></dd></div>
          </dl>
        </address>
        <div className={styles.footerBottom}>
          <span>TAIWAN NEW CULTURE YOUTH ASSOCIATION</span>
          <a className={styles.sourceLink} href={SOURCE_REPOSITORY_URL} target="_blank" rel="noopener noreferrer" aria-label="在 GitHub 查看網站開放原始碼（另開新視窗）"><GitFork size={15} aria-hidden="true" />GitHub 開放原始碼 <ArrowUpRight size={14} aria-hidden="true" /></a>
          <span>2027 青年參議院 — 立法院會議</span>
        </div>
      </footer>
    </div>
  );
}

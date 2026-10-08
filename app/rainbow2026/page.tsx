import type { Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, Download, GitFork } from "lucide-react";
import { SOURCE_REPOSITORY_URL } from "@/lib/seo";
import { RAINBOW_NAME, RAINBOW_OFFICIAL_INFO, RAINBOW_OFFICIAL_SITE, RAINBOW_ORGANIZER, RAINBOW_POSTER, RAINBOW_SOURCE, rainbowMetadata, rainbowStructuredData } from "@/lib/rainbow-event";
import { RainbowNavigation, ShareRainbow } from "./rainbow-actions";
import { RainbowArtwork } from "./rainbow-artwork";
import { RainbowFlower } from "./rainbow-flower";
import { RainbowMotion } from "./rainbow-motion";
import styles from "./rainbow.module.css";

export const metadata = rainbowMetadata;
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function Rainbow2026Page() {
  return (
    <div className={styles.page} id="rainbow-top">
      <RainbowMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(rainbowStructuredData).replace(/</g, "\\u003c") }} />
      <a className={styles.skipLink} href="#rainbow-main">跳至主要內容</a>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link href="/" className={styles.brand} aria-label="臺灣新文化青年協會首頁">
            <span className={styles.brandWordmark}>
              <span>臺灣新文化青年協會</span>
              <span className={styles.brandStripe} aria-hidden="true" />
            </span>
          </Link>
          <RainbowNavigation />
        </div>
      </header>

      <main id="rainbow-main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="rainbow-title">
          <div className={styles.heroCopy}>
            <p className={styles.eventName} data-rainbow-intro>{RAINBOW_NAME}</p>
            <h1 className={styles.heroTitle} id="rainbow-title" data-rainbow-intro><span>一起參加</span><span>同志遊行</span></h1>
            <p className={styles.heroTagline} data-rainbow-intro>讓每一種愛，自由綻放。</p>
            <div className={styles.heroActions} data-rainbow-intro>
              <a href="#rainbow-about" className={styles.primaryButton}>聽見彼此，一起前行 <ArrowDown size={18} aria-hidden="true" /></a>
              <a href={RAINBOW_SOURCE} className={styles.textLink} target="_blank" rel="noopener noreferrer">閱讀原貼文 <ArrowUpRight size={17} aria-hidden="true" /></a>
            </div>
          </div>
          <div className={styles.heroArtwork}>
            <RainbowArtwork>
              <RainbowFlower className={styles.heroFlower} />
            </RainbowArtwork>
          </div>
          <div className={styles.heroBottom}>
            <div className={styles.heroDate}><time dateTime="2026-10-31">10.31</time><span>2026<br />一起走上街頭</span></div>
            <p>Our Voices,<br />Our Journey.</p>
            <a href="#rainbow-about" className={styles.scrollLink} aria-label="往下閱讀遊行主題"><span>SCROLL TO EXPLORE</span><ArrowDown size={16} aria-hidden="true" /></a>
          </div>
        </section>

        <div className={styles.rainbowRule} aria-hidden="true" />

        <section id="rainbow-about" tabIndex={-1} className={`${styles.section} ${styles.about}`} aria-labelledby="rainbow-theme">
          <p className={styles.sectionLabel} data-rainbow-reveal><span>01 / 遊行主題</span><span>OUR VOICES, OUR JOURNEY</span></p>
          <div className={styles.themeIntro}>
            <div data-rainbow-reveal>
              <h2 id="rainbow-theme">聲做伙聽，<br />路做伙行<span className={styles.spectrumDot}>。</span></h2>
              <p className={styles.taiwanese} lang="nan-Latn">Siann tsò-hué thiann,<br />lōo tsò-hué kiânn.</p>
              <p className={styles.themeEnglish} lang="en">Our Voices, Our Journey</p>
            </div>
            <div className={styles.bodyCopy} data-rainbow-reveal>
              <p>今年臺灣同志遊行的主題，期盼每一個不同的聲音，都能被聽見、每一段不同的人生道路，都能被理解與尊重。</p>
              <p>多元的社會不代表每個人都必須擁有相同的想法，即使我們有不同的生命經驗、價值選擇與身分認同，仍願意聽見彼此、理解彼此，也願意一起走在這條追求平等與尊重的路上。</p>
            </div>
          </div>
          <div className={styles.values} data-rainbow-reveal>
            {[["聽見", "每一個不同的聲音", "LISTEN"], ["理解", "每一段不同的人生道路", "UNDERSTAND"], ["同行", "一起追求平等與尊重", "WALK TOGETHER"]].map(([title, text, english], index) => <div key={title}><span className={styles.valueNumber}>0{index + 1}</span><h3>{title}</h3><p>{text}</p><span className={styles.valueEnglish}>{english}</span></div>)}
          </div>
        </section>

        <section id="rainbow-voices" tabIndex={-1} className={styles.voices} aria-labelledby="rainbow-voices-title">
          <div className={styles.section}>
            <p className={styles.sectionLabel} data-rainbow-reveal><span>02 / 我們的聲音</span><span>STAND FOR DIGNITY</span></p>
            <div className={styles.statement}>
              <div data-rainbow-reveal><h2 id="rainbow-voices-title">尊重差異，<br />守護尊嚴。</h2><p className={styles.statementByline}>臺灣新文化青年協會<br />聲明原文</p></div>
              <blockquote className={styles.statementCopy} cite={RAINBOW_SOURCE} data-rainbow-reveal>
                <p>前幾天在臺北市西門區發生的同志酒吧搜索事件，執法過程中出現對身心障礙者的不當言詞，以及種種暴力行為，絕對是警政機關執法過當，並是最壞的示範。</p>
                <p className={styles.statementEmphasis}>我們呼籲警察局、警政機關應全面咎責並檢討性別平等相關機制，不應歧視、踐踏人性尊嚴。</p>
                <p>今年是臺灣新文化青年協會成立第一年，也將不會缺席我們第一次的臺灣同志遊行。</p>
                <p>我們以「新文化」為名，所期待的正是一個願意讓多元社群都能自在生活，也讓彼此即使不同，仍願意一起向前走的臺灣。</p>
                <a className={styles.textLink} href={RAINBOW_SOURCE} target="_blank" rel="noopener noreferrer">Facebook 原貼文 <ArrowUpRight size={17} aria-hidden="true" /></a>
              </blockquote>
            </div>
          </div>
        </section>

        <section id="rainbow-info" tabIndex={-1} className={`${styles.section} ${styles.info}`} aria-labelledby="rainbow-info-title">
          <div className={styles.infoCopy} data-rainbow-reveal>
            <p className={styles.sectionLabel}><span>03 / 活動資訊</span><span>SEE YOU ON THE STREET</span></p>
            <h2 id="rainbow-info-title">一起走的路，<br />有你更精彩。</h2>
            <div className={styles.dateTicket}><span>2026</span><time dateTime="2026-10-31">10.31</time><span>臺灣同志遊行<br />TAIWAN LGBT+ PRIDE</span></div>
            <dl className={styles.details}>
              <div><dt>活動日期</dt><dd><time dateTime="2026-10-31">2026 年 10 月 31 日（六）</time></dd></div>
              <div><dt>活動名稱</dt><dd>{RAINBOW_NAME}</dd></div>
              <div><dt>年度主題</dt><dd>聲做伙聽，路做伙行<br /><span>Our Voices, Our Journey</span></dd></div>
              <div><dt>主辦單位</dt><dd>{RAINBOW_ORGANIZER}</dd></div>
              <div><dt>參與團體</dt><dd>臺灣新文化青年協會</dd></div>
            </dl>
            <div className={styles.infoLinks}>
              <a href={RAINBOW_OFFICIAL_SITE} className={styles.textLink} target="_blank" rel="noopener noreferrer">主辦單位官方網站 <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={RAINBOW_OFFICIAL_INFO} className={styles.textLink} target="_blank" rel="noopener noreferrer">2026 時程與路線 <ArrowUpRight size={18} aria-hidden="true" /></a>
              <a href={RAINBOW_SOURCE} className={styles.textLink} target="_blank" rel="noopener noreferrer">協會活動貼文 <ArrowUpRight size={18} aria-hidden="true" /></a>
            </div>
          </div>
          <figure className={styles.posterFigure} data-rainbow-reveal>
            <a href={RAINBOW_POSTER} target="_blank" rel="noopener noreferrer" className={styles.posterLink} aria-label="在新分頁查看同志遊行完整海報">
              <Image src={RAINBOW_POSTER} width={1122} height={1402} alt="一起參加同志遊行，讓每一種愛，自由綻放。白底黑字搭配彩虹花朵與斜向色帶，臺灣新文化青年協會活動海報。" sizes="(max-width: 900px) 90vw, 38vw" />
              <span className={styles.posterZoom}>查看完整海報 <ArrowUpRight size={17} aria-hidden="true" /></span>
            </a>
            <figcaption><span>RAINBOW 2026 / 活動主視覺</span><a href={RAINBOW_POSTER} download="2026-同志遊行-活動海報.png" aria-label="下載同志遊行活動海報"><Download size={19} aria-hidden="true" /></a></figcaption>
          </figure>
        </section>

        <section className={styles.closing} aria-labelledby="rainbow-closing-title">
          <div className={styles.closingBands} data-rainbow-bands aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
          <div className={styles.closingInner} data-rainbow-reveal>
            <p className={styles.closingDate}><time dateTime="2026-10-31">10 月 31 日</time></p>
            <h2 id="rainbow-closing-title">一起走上街頭吧！</h2>
            <p className={styles.closingCopy}>10月31日，支持多元平權的民主社會，一起走上街頭吧！<br />讓每一種愛，自由綻放。</p>
            <div className={styles.closingActions}><a className={styles.primaryButton} href={RAINBOW_POSTER} download="2026-同志遊行-活動海報.png">下載活動海報 <Download size={18} aria-hidden="true" /></a><ShareRainbow /></div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <Link href="/" className={styles.footerBrand} aria-label="社團法人臺灣新文化青年協會首頁">
            <span className={styles.brandWordmark}>
              <span>社團法人臺灣新文化青年協會</span>
              <span className={styles.brandStripe} aria-hidden="true" />
            </span>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <a href="#rainbow-top" className={styles.textLink}>回到頂端 <ArrowRight size={17} aria-hidden="true" /></a>
        </div>
        <div className={styles.footerBottom}><span>TAIWAN NEW CULTURE YOUTH ASSOCIATION</span><a href={SOURCE_REPOSITORY_URL} target="_blank" rel="noopener noreferrer"><GitFork size={15} aria-hidden="true" />GitHub 開放原始碼 <ArrowUpRight size={14} aria-hidden="true" /></a><Link href="/privacy">Cookie 與隱私說明</Link></div>
      </footer>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Globe2,
  Mail,
  RotateCcw,
  Settings2,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { Button } from "@/components/ui/button";
import {
  ASSOCIATION_LEGAL_NAME,
  PRIVACY_DESCRIPTION,
  PRIVACY_TITLE,
  PRIVACY_URL,
  SITE_NAME,
  SITE_URL,
  privacyStructuredData,
  sharedRobots,
} from "@/lib/seo";

const shareImage = {
  url: `${SITE_URL}/opengraph-image`,
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}｜以青年之聲，寫臺灣新章`,
  type: "image/png",
};

const sectionLinkClass =
  "font-bold text-[var(--ink)] underline decoration-[var(--orange)] decoration-2 underline-offset-4 transition-colors hover:text-[var(--orange)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--orange)]";

const privacySections = [
  ["choice", "你的選擇"],
  ["storage", "儲存與資料"],
  ["processing", "處理方式"],
  ["rights", "撤回與權利"],
  ["contact", "聯絡我們"],
] as const;

export const metadata: Metadata = {
  title: { absolute: PRIVACY_TITLE },
  description: PRIVACY_DESCRIPTION,
  alternates: { canonical: "/privacy" },
  robots: sharedRobots,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: PRIVACY_URL,
    siteName: SITE_NAME,
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    images: [shareImage],
  },
  twitter: {
    card: "summary_large_image",
    title: PRIVACY_TITLE,
    description: PRIVACY_DESCRIPTION,
    images: [shareImage],
  },
};

function SectionHeading({
  number,
  title,
  icon,
  inverse = false,
}: {
  number: string;
  title: string;
  icon: ReactNode;
  inverse?: boolean;
}) {
  return (
    <header className={`mb-8 flex items-end justify-between gap-5 border-b pb-5 ${inverse ? "border-white/30" : "border-[var(--ink)]"}`}>
      <div>
        <p className="mb-3 text-[10px] font-black tracking-[0.24em] text-[var(--orange)]">
          PRIVACY / {number}
        </p>
        <h2 className="display-font text-[clamp(2.3rem,4vw,4.5rem)] font-black leading-none tracking-[-0.055em]">
          {title}
        </h2>
      </div>
      <span className={`grid size-11 shrink-0 place-items-center border text-[var(--orange)] sm:size-14 ${inverse ? "border-white/40" : "border-[var(--ink)]"}`} aria-hidden="true">
        {icon}
      </span>
    </header>
  );
}

export default function PrivacyPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(privacyStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteMotion />
      <a className="skip-link" href="#privacy-content">跳至主要內容</a>

      <div id="smooth-wrapper" className="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <SiteHeader />

          <section
            id="privacy-content"
            tabIndex={-1}
            className="site-container relative grid gap-10 border-b border-[var(--ink)] pb-14 pt-10 sm:pb-20 sm:pt-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)] lg:items-end lg:gap-20 lg:pb-24"
          >
            <span className="absolute right-0 top-8 hidden size-16 border border-[var(--ink)] lg:block" aria-hidden="true">
              <span className="absolute left-1/2 top-0 h-full w-px bg-[var(--ink)]" />
              <span className="absolute left-0 top-1/2 h-px w-full bg-[var(--ink)]" />
            </span>

            <div>
              <p data-gsap-hero className="mb-7 flex items-center gap-3 text-[11px] font-black tracking-[0.22em] text-[var(--orange)]">
                <span className="size-2 bg-[var(--orange)]" aria-hidden="true" />
                PRIVACY · YOUR CHOICE
              </p>
              <h1 data-gsap-hero className="display-font text-[clamp(3.8rem,8.5vw,9.5rem)] font-black leading-[0.92] tracking-[-0.075em]">
                Cookie
                <br />與隱私說明
              </h1>
            </div>

            <div data-gsap-hero className="border-t border-[var(--ink)] pt-6 lg:mb-1">
              <p className="display-font text-2xl font-black leading-relaxed tracking-[-0.025em] sm:text-3xl">
                你的資料，
                <br />由你決定如何使用。
              </p>
              <p className="mt-5 text-[15px] leading-8 tracking-[0.025em] text-[var(--muted)]">
                本網站由{ASSOCIATION_LEGAL_NAME}營運。以下說明網站分析與瀏覽器儲存的用途；報名表與第三方服務另有其告知內容，請於使用時閱讀。
              </p>
              <p className="mt-6 text-xs font-bold tracking-[0.08em] text-[var(--muted)]">
                最後更新：<time dateTime="2026-09-21">2026 年 9 月 21 日</time>
              </p>
            </div>
          </section>

          <div className="site-container grid gap-12 py-12 sm:py-16 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-16 lg:py-24 xl:grid-cols-[18rem_minmax(0,1fr)] xl:gap-24">
            <aside className="h-fit lg:sticky lg:top-8" data-gsap-reveal>
              <p className="border-b border-[var(--ink)] pb-4 text-xs font-black tracking-[0.18em] text-[var(--orange)]">
                頁面導覽
              </p>
              <nav aria-label="隱私說明章節">
                <ol className="divide-y divide-[var(--line)] border-b border-[var(--ink)]">
                  {privacySections.map(([id, label], index) => (
                    <li key={id}>
                      <a className="group flex items-center gap-4 py-4 text-sm font-black tracking-[0.08em]" href={`#${id}`}>
                        <span className="text-[10px] text-[var(--orange)]">0{index + 1}</span>
                        <span>{label}</span>
                        <ArrowUpRight className="ml-auto size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <p className="mt-5 text-xs leading-6 text-[var(--muted)]">
                你可隨時使用畫面左下角的「Cookie 設定」重新選擇。
              </p>
            </aside>

            <div className="min-w-0 space-y-20 sm:space-y-24">
              <section id="choice" className="section-anchor bg-[var(--ink)] p-6 text-white sm:p-10 lg:p-12" data-gsap-reveal>
                <SectionHeading number="01" title="你的選擇" icon={<ShieldCheck className="size-6" strokeWidth={1.7} />} inverse />
                <div className="grid gap-7 text-[15px] leading-8 text-white/75 md:grid-cols-2 md:gap-10">
                  <p>
                    在你明確接受前，本網站不會載入 Google Analytics。接受或拒絕分析 Cookie 都不影響瀏覽；繼續瀏覽或捲動頁面不代表同意。你可隨時使用頁面左下角的「Cookie 設定」更改選擇。
                  </p>
                  <p>
                    偏好保存於此瀏覽器 180 天，到期後會再次詢問。拒絕與同意保存相同時間；清除網站資料或更換瀏覽器後須重新選擇。
                  </p>
                </div>
              </section>

              <section id="storage" className="section-anchor" data-gsap-reveal>
                <SectionHeading number="02" title="使用哪些儲存與資料？" icon={<Database className="size-6" strokeWidth={1.7} />} />
                <div className="grid border-t border-[var(--line)] md:grid-cols-2">
                  <article className="border-b border-[var(--line)] py-7 md:border-r md:pr-8">
                    <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-[var(--orange)]">ESSENTIAL</p>
                    <h3 className="display-font text-2xl font-black tracking-[-0.035em]">必要功能：記住 Cookie 偏好</h3>
                    <p className="mt-4 text-[15px] leading-8 text-[var(--muted)]">
                      使用本機儲存（localStorage）項目 <code className="break-all bg-[var(--paper-soft)] px-1.5 py-1 text-[0.82em] text-[var(--ink)]">neogen:cookie-consent:v1</code>，記錄選擇、時間與說明版本，保存 180 天。這項偏好不送往 Google，也不用於分析或廣告。
                    </p>
                  </article>

                  <article className="border-b border-[var(--line)] py-7 md:pl-8">
                    <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-[var(--orange)]">OPTIONAL ANALYTICS</p>
                    <h3 className="display-font text-2xl font-black tracking-[-0.035em]">自願分析：Google Analytics</h3>
                    <p className="mt-4 text-[15px] leading-8 text-[var(--muted)]">
                      同意後，Google Analytics 使用 <code className="bg-[var(--paper-soft)] px-1.5 py-1 text-[0.82em] text-[var(--ink)]">_ga</code>、<code className="bg-[var(--paper-soft)] px-1.5 py-1 text-[0.82em] text-[var(--ink)]">_ga_*</code> 等 Cookie 區分瀏覽器與工作階段，分析瀏覽頁面、來源、互動事件、瀏覽器與裝置、概略地區等資訊，協助本協會了解網站使用情形及改善內容。連線過程也會將 IP 位址等網路資訊傳送給 Google 處理。
                    </p>
                    <p className="mt-4 text-[15px] leading-8 text-[var(--muted)]">
                      本網站將分析 Cookie 的保存期限設為最長 180 天，並關閉 Google signals、廣告資料使用與廣告個人化。Google 伺服器端的資料保存另依其服務與本協會設定辦理；瀏覽器 Cookie 到期不等於伺服器資料同步刪除。
                    </p>
                  </article>

                  <article className="border-b border-[var(--line)] py-7 md:border-r md:pr-8">
                    <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-[var(--orange)]">THIRD-PARTY MAP</p>
                    <h3 className="display-font text-2xl font-black tracking-[-0.035em]">Google 地圖</h3>
                    <p className="mt-4 text-[15px] leading-8 text-[var(--muted)]">
                      活動資訊頁嵌入 Google 地圖，顯示活動與住宿位置。載入活動資訊頁的地圖時，瀏覽器會連線至 Google，傳送 IP 位址等網路資訊；Google 可能依其服務設定使用 Cookie。地圖服務與本網站的 Google Analytics 分析選擇分開，相關資料處理依 Google 隱私權政策辦理。
                    </p>
                  </article>

                  <article className="border-b border-[var(--line)] py-7 md:pl-8">
                    <p className="mb-4 text-[10px] font-black tracking-[0.2em] text-[var(--orange)]">PARTICIPATION</p>
                    <h3 className="display-font text-2xl font-black tracking-[-0.035em]">議題實驗室與外部表單</h3>
                    <p className="mt-4 text-[15px] leading-8 text-[var(--muted)]">
                      參與議題實驗室時，另使用瀏覽器中的隨機識別碼保存回應身分，與 GA 分析偏好分開管理；拒絕分析不會清除既有討論紀錄。這個識別碼沒有自動到期日，可透過瀏覽器清除網站資料，但將無法再以原識別碼接續參與。Google 報名表與外部連結由其服務提供者處理，請依該服務顯示的隱私告知決定是否使用。
                    </p>
                  </article>
                </div>
              </section>

              <section id="processing" className="section-anchor" data-gsap-reveal>
                <SectionHeading number="03" title="處理對象、方式與地區" icon={<Globe2 className="size-6" strokeWidth={1.7} />} />
                <div className="grid gap-7 text-[15px] leading-8 text-[var(--muted)] md:grid-cols-[1fr_0.8fr] md:gap-12">
                  <p>
                    本協會使用統計報表了解網站使用情形；Google 提供分析服務，透過自動化方式處理分析資料，資料可能於臺灣以外的 Google 處理地區儲存或處理。
                  </p>
                  <div className="border-l-4 border-[var(--orange)] bg-[var(--paper-soft)] p-5">
                    <p className="mb-3 text-xs font-black tracking-[0.14em] text-[var(--ink)]">延伸閱讀</p>
                    <p className="space-y-3">
                      <a className={`${sectionLinkClass} inline-flex items-center gap-1.5`} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
                        Google 隱私權政策 <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                      <br />
                      <a className={`${sectionLinkClass} inline-flex items-center gap-1.5`} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
                        Google 如何使用合作網站資料 <ArrowUpRight className="size-4" aria-hidden="true" />
                      </a>
                    </p>
                  </div>
                </div>
              </section>

              <section id="rights" className="section-anchor" data-gsap-reveal>
                <SectionHeading number="04" title="撤回同意與資料權利" icon={<RotateCcw className="size-6" strokeWidth={1.7} />} />
                <div className="grid gap-8 text-[15px] leading-8 text-[var(--muted)] md:grid-cols-2 md:gap-12">
                  <div>
                    <p className="mb-3 flex items-center gap-2 font-black text-[var(--ink)]">
                      <Settings2 className="size-5 text-[var(--orange)]" aria-hidden="true" />
                      如何撤回
                    </p>
                    <p>
                      在「Cookie 設定」選擇「僅使用必要 Cookie」，即可停止後續分析。若分析程式已載入，網站會移除目前網域可存取的 GA Cookie 並重新整理，以停止已載入的分析程式。撤回同意不會自動刪除先前已合法處理的資料。
                    </p>
                  </div>
                  <div>
                    <p className="mb-3 flex items-center gap-2 font-black text-[var(--ink)]">
                      <ShieldCheck className="size-5 text-[var(--orange)]" aria-hidden="true" />
                      你的資料權利
                    </p>
                    <p>
                      你可向本協會提出查詢、閱覽、製給複製本、補充或更正，以及停止蒐集、處理、利用或刪除個人資料的請求。本協會將依適用法令及可識別的資料範圍處理。拒絕提供分析用途資料，不影響一般網站功能。
                    </p>
                  </div>
                </div>
              </section>

              <section id="contact" className="section-anchor border-y border-[var(--ink)] bg-[var(--paper-soft)] p-6 sm:p-10 lg:p-12" data-gsap-reveal>
                <SectionHeading number="05" title="聯絡我們" icon={<Mail className="size-6" strokeWidth={1.7} />} />
                <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                  <address className="not-italic text-[15px] leading-8 text-[var(--muted)]">
                    <p className="font-black text-[var(--ink)]">{ASSOCIATION_LEGAL_NAME}</p>
                    <p className="mt-2">通訊地址：(231) 新北市新店區安興路105號5樓之7</p>
                    <p className="[overflow-wrap:anywhere]">
                      電子信箱：<a className={sectionLinkClass} href="mailto:neogentaiwan2026@gmail.com">neogentaiwan2026@gmail.com</a>
                    </p>
                  </address>
                  <Button asChild size="lg">
                    <a href="mailto:neogentaiwan2026@gmail.com?subject=Cookie 與隱私問題">
                      寫信給協會
                      <Mail className="size-5" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </section>
            </div>
          </div>

          <div className="site-container border-t border-[var(--ink)] py-8">
            <Button variant="outline" asChild>
              <Link href="/">
                <ArrowLeft className="size-4" aria-hidden="true" />
                回到主網站
              </Link>
            </Button>
          </div>

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

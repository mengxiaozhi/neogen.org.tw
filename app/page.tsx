import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Eye,
  Lightbulb,
  Mail,
  PenLine,
} from "lucide-react";

import { ActionExperience } from "@/components/action-experience";
import { BrandMark } from "@/components/brand-mark";
import { EditorialSymbol } from "@/components/editorial-symbol";
import { JoinDialog } from "@/components/join-dialog";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { Button } from "@/components/ui/button";
import { SITE_URL, SOCIAL_LINKS, siteStructuredData } from "@/lib/seo";

const beliefs = [
  {
    icon: Lightbulb,
    title: "拒絕盲從",
    description: "保有判斷，不讓聲量取代理由。",
  },
  {
    icon: Eye,
    title: "直視權力",
    description: "追問制度，讓權力回應公共利益。",
  },
  {
    icon: PenLine,
    title: "共創新章",
    description: "以多元對話，寫下當代臺灣的青年觀點。",
  },
] as const;

export default function Home() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteMotion />
      <a className="skip-link" href="#main-content">跳至主要內容</a>

      <div id="smooth-wrapper" className="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <SiteHeader />

      <section id="main-content" tabIndex={-1} className="hero-section site-container relative grid items-center gap-12 pb-16 pt-8 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:gap-14 lg:pb-20 lg:pt-12">
        <span className="registration-mark left-1 top-5" data-gsap-mark aria-hidden="true" />
        <span className="registration-target right-1 top-5" data-gsap-mark aria-hidden="true" />

        <div data-gsap-pointer-zone className="relative z-10 pt-16 lg:pt-4">
          <div
            className="hero-symbol-accent"
            data-gsap-hero-symbol
            data-gsap-pointer
          >
            <EditorialSymbol variant="voice" className="editorial-symbol" />
          </div>
          <p data-gsap-hero className="mb-6 flex items-center gap-3 text-[11px] font-black tracking-[0.2em] text-[var(--orange)] sm:text-xs">
            <span className="h-2 w-2 bg-[var(--orange)]" aria-hidden="true" />
            TAIWAN NEW CULTURE YOUTH · 2026
          </p>
          <h1 data-gsap-hero className="display-font text-[clamp(3.3rem,6vw,7.25rem)] font-black leading-[1.02] tracking-[-0.07em]">
            <span className="whitespace-nowrap">以青年之聲，</span>
            <br />
            <span className="whitespace-nowrap">寫臺灣新章。</span>
          </h1>
          <div data-gsap-hero-line className="mt-8 h-px w-40 bg-[var(--ink)] sm:w-72" />
          <p data-gsap-hero className="mt-7 max-w-xl text-lg font-medium leading-9 tracking-[0.04em] text-[var(--muted)] sm:text-xl">
            拒絕盲從，直視權力。
            <br />
            讓多元觀點進入公共討論，共同建構屬於當代臺灣青年的公共文化。
          </p>
          <div data-gsap-hero className="mt-9 flex flex-col gap-3 sm:flex-row">
            <JoinDialog size="lg" />
            <Button variant="outline" size="lg" asChild>
              <a href="#about">
                認識我們
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <figure data-gsap-hero-media className="hero-media editorial-frame relative mt-2" id="record">
          <span className="hero-media-plane" aria-hidden="true" />
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-soft)] lg:aspect-[1.52/1]">
            <Image
              src="/images/youth-forum.jpg"
              alt="青年參與公共論壇，在議事空間中共同合影"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-[50%_62%]"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-[var(--ink)] pb-3 text-xs font-bold tracking-[0.14em] text-[var(--muted)]">
            <span>青年公共參與現場</span>
            <span>TAIWAN · 2026</span>
          </figcaption>
          <span className="hero-folio" aria-hidden="true">01 / PUBLIC VOICE</span>
        </figure>

        <p className="vertical-label hidden xl:block" aria-hidden="true">
          TAIWAN NEW CULTURE YOUTH ASSOCIATION
        </p>
      </section>

      <section id="about" tabIndex={-1} className="beliefs-section section-anchor relative overflow-hidden border-y border-[var(--line)] bg-[var(--paper-soft)]">
        <span className="beliefs-halftone" aria-hidden="true" />
        <div className="site-container relative z-10 py-24 sm:py-32">
          <div data-gsap-reveal className="mb-12 flex items-center gap-5 text-sm font-black tracking-[0.16em] text-[var(--orange)]">
            <span>關於我們</span>
            <span aria-hidden="true">／</span>
            <span>核心信念</span>
            <span className="section-symbol-accent ml-auto" data-gsap-symbol>
              <EditorialSymbol variant="dialogue" className="editorial-symbol" />
            </span>
          </div>
          <div data-gsap-reveal className="grid gap-10 border-b border-[var(--ink)] pb-16 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
            <h2 className="display-font text-[clamp(3rem,4.9vw,5.8rem)] font-black leading-[1.13] tracking-[-0.06em]">
              我們相信，
              <br />
              <span className="lg:whitespace-nowrap">公共參與是改變的起點。</span>
            </h2>
            <p className="self-end border-l border-[var(--ink)] pl-7 text-lg font-medium leading-9 tracking-[0.03em] text-[var(--muted)]">
              我們承繼臺灣新文化運動關懷社會、啟迪思想與公共參與的精神。從校園到社會，讓青年不只是被討論的一代，更是定義議題、提出觀點、推動改變的行動者。
            </p>
          </div>

          <div data-gsap-stagger className="grid divide-y divide-[var(--line)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {beliefs.map((belief, index) => {
              const Icon = belief.icon;

              return (
              <article
                data-gsap-stagger-item
                className="belief-card group grid grid-cols-[4.25rem_1fr] gap-4 py-10 first:pl-0 md:block md:px-9 md:py-14 md:first:pl-0 md:last:pr-0"
                key={belief.title}
              >
                <span className="display-font text-6xl font-black leading-none text-[var(--orange)] md:text-8xl">
                  0{index + 1}
                </span>
                <span className="belief-icon" data-gsap-card-icon aria-hidden="true">
                  <Icon size={34} strokeWidth={1.5} />
                </span>
                <div className="md:mt-9">
                  <h3 className="display-font text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                    {belief.title}
                  </h3>
                  <div className="my-4 h-px w-24 bg-[var(--ink)]" />
                  <p className="max-w-sm text-[15px] leading-7 text-[var(--muted)]">
                    {belief.description}
                  </p>
                </div>
              </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="actions" tabIndex={-1} className="actions-section section-anchor site-container py-24 sm:py-32">
        <div data-gsap-reveal className="mb-12 flex items-center justify-between gap-6 border-b border-[var(--ink)] pb-5 text-sm font-black tracking-[0.16em]">
          <p><span className="text-[var(--orange)]">02 /</span> 我們的行動</p>
          <div className="ml-auto flex items-center gap-5">
            <p className="hidden text-xs text-[var(--muted)] sm:block">THINK · SPEAK · ACT</p>
            <span className="section-symbol-accent section-symbol-accent--action" data-gsap-symbol>
              <EditorialSymbol variant="action" className="editorial-symbol" />
            </span>
          </div>
        </div>
        <ActionExperience />
      </section>

      <section data-gsap-closing className="relative overflow-hidden bg-[var(--ink)] text-white">
        <span className="closing-orange-plane" aria-hidden="true" />
        <span className="closing-symbol-orbit" data-gsap-symbol-spin aria-hidden="true">
          <span className="closing-symbol-accent" data-gsap-symbol>
            <EditorialSymbol variant="invitation" className="editorial-symbol" />
          </span>
        </span>
        <div data-gsap-reveal className="site-container relative z-10 py-20 sm:py-28 lg:py-32">
          <p className="mb-7 text-xs font-black tracking-[0.2em] text-[var(--orange)]">03 / JOIN THE CONVERSATION</p>
          <h2 className="display-font max-w-5xl text-[clamp(3.35rem,6.4vw,7.7rem)] font-black leading-[1.04] tracking-[-0.065em] text-balance">
            讓你的觀點，
            <br />成為公共文化的一部分。
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/72">
            公共文化不是少數人的獨白，而是每個人願意提出問題、交換觀點、共同行動。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <a href="mailto:neogentaiwan2026@gmail.com?subject=我想參與青年行動">
                寫信給我們
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </Button>
            <Button variant="inverse" size="lg" asChild>
              <a href="/2027">
                認識 2027 青年參議院
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <span data-gsap-glyph className="closing-glyph display-font" aria-hidden="true">
          新
        </span>
      </section>

      <footer data-gsap-reveal className="footer-section site-container py-12 sm:py-16">
        <div className="grid gap-12 border-b border-[var(--ink)] pb-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
          <div>
            <BrandMark />
            <p className="mt-4 max-w-xl text-base leading-7 tracking-[0.06em] text-[var(--muted)]">
              以青年之聲，寫臺灣新章。讓獨立思考、青年發聲與公共參與，成為當代臺灣的日常。
            </p>
          </div>
          <nav aria-label="社群媒體" className="lg:border-l lg:border-[var(--line)] lg:pl-12">
            <p className="text-xs font-black tracking-[0.16em] text-[var(--orange)]">追蹤我們</p>
            <ul className="mt-5 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {SOCIAL_LINKS.map(({ name, handle, href }) => (
                <li key={name}>
                  <a
                    className="social-link group flex min-h-14 items-center justify-between gap-5 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--orange)]"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name}：${handle}（另開新視窗）`}
                  >
                    <span className="display-font text-xl font-black">{name}</span>
                    <span className="flex min-w-0 items-center gap-2 text-xs font-bold text-[var(--muted)]">
                      <span className="truncate">{handle}</span>
                      <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="grid gap-10 border-b border-[var(--ink)] py-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <nav aria-label="頁尾導覽">
            <p className="text-xs font-black tracking-[0.16em] text-[var(--orange)]">網站導覽</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-bold tracking-[0.08em]">
              <li><a className="nav-link" href="#about">關於我們</a></li>
              <li><a className="nav-link" href="#actions">行動議題</a></li>
              <li><a className="nav-link" href="/2027">2027 青年參議院</a></li>
              <li><a className="nav-link" href="mailto:neogentaiwan2026@gmail.com?subject=青年投稿">青年投稿</a></li>
            </ul>
          </nav>
          <address className="not-italic lg:border-l lg:border-[var(--line)] lg:pl-12">
            <p className="text-xs font-black tracking-[0.16em] text-[var(--orange)]">
              協會基本資料
            </p>
            <dl className="mt-5 space-y-3 text-sm leading-6">
              <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--muted)]">法人名稱</dt>
                <dd>社團法人臺灣新文化青年協會</dd>
              </div>
              <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--muted)]">立案字號</dt>
                <dd>台內團字第1150024192號函</dd>
              </div>
              <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--muted)]">統一編號</dt>
                <dd>61490573</dd>
              </div>
              <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--muted)]">通訊地址</dt>
                <dd>(231) 新北市新店區安興路105號5樓之7</dd>
              </div>
              <div className="grid grid-cols-[5.25rem_minmax(0,1fr)] gap-3">
                <dt className="font-bold text-[var(--muted)]">電子信箱</dt>
                <dd className="min-w-0">
                  <a
                    className="nav-link [overflow-wrap:anywhere]"
                    href="mailto:neogentaiwan2026@gmail.com"
                  >
                    neogentaiwan2026@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </address>
        </div>
        <div className="flex flex-col gap-2 pt-7 text-xs font-medium tracking-[0.08em] text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Taiwan New Culture Youth Association</p>
          <a className="nav-link w-fit font-bold text-[var(--ink)]" href={SITE_URL}>neogen.org.tw</a>
        </div>
      </footer>
        </div>
      </div>
    </main>
  );
}

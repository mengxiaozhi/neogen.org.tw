import Image from "next/image";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";

import { ActionList } from "@/components/action-list";
import { BrandMark } from "@/components/brand-mark";
import { JoinDialog } from "@/components/join-dialog";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const beliefs = [
  {
    title: "拒絕盲從",
    description: "保有判斷，不讓聲量取代理由。",
  },
  {
    title: "直視權力",
    description: "追問制度，讓權力回應公共利益。",
  },
  {
    title: "共創新章",
    description: "以多元對話，寫下當代臺灣的青年觀點。",
  },
] as const;

export default function Home() {
  return (
    <main id="top">
      <SiteHeader />

      <section className="hero-section site-container relative grid items-center gap-10 py-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10 lg:py-10">
        <span className="registration-mark left-1 top-5" aria-hidden="true" />
        <span className="registration-target right-1 top-5" aria-hidden="true" />

        <div className="relative z-10 pt-12 lg:pt-6">
          <h1 className="display-font text-[clamp(3.15rem,6.1vw,7rem)] font-black leading-[1.04] tracking-[-0.065em]">
            <span className="whitespace-nowrap">以青年之聲，</span>
            <br />
            <span className="whitespace-nowrap">寫臺灣新章。</span>
          </h1>
          <div className="mt-8 h-px w-40 bg-[var(--ink)] sm:w-72" />
          <p className="mt-7 max-w-xl text-lg font-medium leading-9 tracking-[0.04em] text-[var(--muted)] sm:text-xl">
            拒絕盲從，直視權力。
            <br />
            讓多元觀點進入公共討論，共同建構屬於當代臺灣青年的公共文化。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <JoinDialog size="lg" />
            <Button variant="outline" size="lg" asChild>
              <a href="#about">
                認識我們
                <ArrowDown className="size-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>

        <figure className="editorial-frame relative mt-2" id="record">
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-soft)] lg:aspect-[1.52/1]">
            <Image
              src="/images/youth-forum.jpg"
              alt="青年參與公共論壇，在議事空間中共同合影"
              fill
              loading="eager"
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-[50%_62%]"
            />
          </div>
          <figcaption className="mt-3 flex items-center justify-between gap-4 border-b border-[var(--ink)] pb-3 text-xs font-bold tracking-[0.14em] text-[var(--muted)]">
            <span>青年公共參與現場</span>
            <span>TAIWAN · 2026</span>
          </figcaption>
        </figure>

        <p className="vertical-label hidden xl:block" aria-hidden="true">
          TAIWAN NEW CULTURE YOUTH ASSOCIATION
        </p>
      </section>

      <section id="about" className="section-anchor site-container py-24 sm:py-32">
        <div className="mb-12 flex items-center gap-5 text-sm font-black tracking-[0.16em] text-[var(--orange)]">
          <span>關於我們</span>
          <span aria-hidden="true">／</span>
          <span>核心信念</span>
        </div>
        <div className="grid gap-10 border-b border-[var(--ink)] pb-16 lg:grid-cols-[1.4fr_0.8fr] lg:gap-20">
          <h2 className="display-font text-[clamp(3rem,4.9vw,5.8rem)] font-black leading-[1.16] tracking-[-0.055em]">
            我們相信，
            <br />
            <span className="lg:whitespace-nowrap">公共參與是改變的起點。</span>
          </h2>
          <p className="self-end border-l border-[var(--ink)] pl-7 text-lg font-medium leading-9 tracking-[0.03em] text-[var(--muted)]">
            我們承繼臺灣新文化運動關懷社會、啟迪思想與公共參與的精神。從校園到社會，讓青年不只是被討論的一代，更是定義議題、提出觀點、推動改變的行動者。
          </p>
        </div>

        <div className="grid divide-y divide-[var(--line)] md:grid-cols-3 md:divide-x md:divide-y-0">
          {beliefs.map((belief, index) => (
            <article
              className="grid grid-cols-[4rem_1fr] gap-4 py-10 first:pl-0 md:block md:px-8 md:py-12 md:first:pl-0 md:last:pr-0"
              key={belief.title}
            >
              <span className="display-font text-6xl leading-none text-[var(--orange)] md:text-7xl">
                0{index + 1}
              </span>
              <div className="md:mt-8">
                <h3 className="display-font text-3xl font-black tracking-[-0.03em]">
                  {belief.title}
                </h3>
                <div className="my-4 h-px w-24 bg-[var(--ink)]" />
                <p className="text-[15px] leading-7 text-[var(--muted)]">
                  {belief.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="actions" className="section-anchor site-container pb-24 sm:pb-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.9fr] lg:gap-20">
          <figure className="editorial-frame relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--paper-soft)]">
              <Image
                src="/images/youth-forum.jpg"
                alt="青年公共論壇參與者在會議現場交流"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-[43%_67%]"
              />
            </div>
          </figure>

          <div className="order-1 lg:order-2">
            <h2 className="display-font text-[clamp(3rem,4.7vw,5.5rem)] font-black leading-[1.12] tracking-[-0.055em] text-balance">
              讓思考成為行動，
              <br />
              讓行動進入公共。
            </h2>
            <div className="my-7 h-px w-56 bg-[var(--ink)]" />
            <p className="mb-9 max-w-2xl text-lg leading-8 text-[var(--muted)]">
              從議題討論、青年培力到公共倡議，我們把關心變成可以一起參與的現場。
            </p>
            <ActionList />
            <Button asChild size="lg" className="mt-8 w-full sm:w-auto">
              <a href="mailto:neogentaiwan2026@gmail.com?subject=我想探索行動議題">
                探索行動議題
                <ArrowRight className="size-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--ink)] text-white">
        <div className="site-container relative z-10 py-20 sm:py-28">
          <h2 className="display-font max-w-5xl text-[clamp(3.5rem,7vw,8.4rem)] font-black leading-[1.03] tracking-[-0.06em] text-balance">
            下一個公共提問，
            <br />
            從你開始。
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-white/72">
            無論你想參與討論、提出觀點，或與我們共同發起行動，都歡迎成為新文化的一部分。
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <JoinDialog label="加入青年行動" size="lg" />
            <Button variant="inverse" size="lg" asChild>
              <a href="mailto:neogentaiwan2026@gmail.com?subject=青年投稿">
                青年投稿
                <Mail className="size-5" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
        <span className="closing-glyph display-font" aria-hidden="true">
          新
        </span>
      </section>

      <footer className="site-container py-12 sm:py-16">
        <div className="grid gap-10 border-b border-[var(--ink)] pb-10 lg:grid-cols-[0.85fr_0.65fr_1.5fr] lg:items-start">
          <div>
            <BrandMark />
            <p className="mt-5 text-base tracking-[0.08em] text-[var(--muted)]">
              以青年之聲，寫臺灣新章。
            </p>
          </div>
          <nav aria-label="頁尾導覽" className="lg:border-x lg:border-[var(--line)] lg:px-10">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-bold tracking-[0.08em]">
              <li><a className="nav-link" href="#about">關於我們</a></li>
              <li><a className="nav-link" href="#actions">行動議題</a></li>
              <li><a className="nav-link" href="#record">活動紀錄</a></li>
              <li><a className="nav-link" href="/2027">2027 青年參議院</a></li>
              <li><a className="nav-link" href="mailto:neogentaiwan2026@gmail.com?subject=青年投稿">青年投稿</a></li>
            </ul>
          </nav>
          <address className="not-italic">
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
          <p>社團法人臺灣新文化青年協會</p>
        </div>
      </footer>
    </main>
  );
}

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { SITE_URL, SOCIAL_LINKS } from "@/lib/seo";

export function SiteFooter() {
  return (
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
            <li><Link className="nav-link" href="/#about">關於我們</Link></li>
            <li><Link className="nav-link" href="/team">協會團隊</Link></li>
            <li><Link className="nav-link" href="/#actions">行動議題</Link></li>
            <li><Link className="nav-link" href="/2027">2027 青年參議院</Link></li>
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
  );
}

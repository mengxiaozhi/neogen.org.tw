import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Landmark,
  Mail,
  Scale,
  UserRound,
  UsersRound,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { Button } from "@/components/ui/button";
import {
  SITE_NAME,
  TEAM_DESCRIPTION,
  TEAM_TITLE,
  TEAM_URL,
  teamStructuredData,
} from "@/lib/seo";
import { leadershipMembers, teamGroups } from "@/lib/team";

import chenTingchuPortrait from "./images/chen-tingchu.png";
import liuXunzhiPortrait from "./images/liu-xunzhi.jpeg";

export const metadata: Metadata = {
  title: { absolute: TEAM_TITLE },
  description: TEAM_DESCRIPTION,
  alternates: { canonical: "/team" },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: TEAM_URL,
    siteName: SITE_NAME,
    title: TEAM_TITLE,
    description: TEAM_DESCRIPTION,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: TEAM_TITLE,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TEAM_TITLE,
    description: TEAM_DESCRIPTION,
    images: ["/opengraph-image"],
  },
};

const groupIcons = {
  directors: Landmark,
  supervisors: Scale,
  secretariat: UsersRound,
} as const;

const memberPortraits: Partial<Record<
  string,
  { src: StaticImageData; imageClassName: string }
>> = {
  陳庭楚: {
    src: chenTingchuPortrait,
    imageClassName:
      "scale-[1.5] object-cover object-[45%_45%] transition-transform duration-700 group-hover:scale-[1.56]",
  },
  劉訊志: {
    src: liuXunzhiPortrait,
    imageClassName:
      "object-cover object-[50%_32%] transition-transform duration-700 group-hover:scale-[1.035]",
  },
};

export default function TeamPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(teamStructuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SiteMotion />
      <a className="skip-link" href="#team-main">跳至主要內容</a>

      <div id="smooth-wrapper" className="smooth-wrapper">
        <div id="smooth-content" className="smooth-content">
          <SiteHeader />

          <section
            id="team-main"
            tabIndex={-1}
            className="site-container relative border-b border-[var(--ink)] pb-16 pt-16 sm:pb-24 sm:pt-24"
          >
            <span className="registration-mark left-1 top-8" data-gsap-mark aria-hidden="true" />
            <span className="registration-target right-1 top-8" data-gsap-mark aria-hidden="true" />

            <div className="max-w-4xl">
              <div>
                <p data-gsap-hero className="mb-6 flex items-center gap-3 text-xs font-black tracking-[0.2em] text-[var(--orange)]">
                  <span className="h-2 w-2 bg-[var(--orange)]" aria-hidden="true" />
                  ASSOCIATION TEAM · 2026
                </p>
                <h1 data-gsap-hero className="display-font text-[clamp(3.7rem,7vw,8.5rem)] font-black leading-[1.02] tracking-[-0.07em]">
                  協會團隊
                </h1>
                <p data-gsap-hero className="mt-7 max-w-3xl text-xl font-medium leading-9 tracking-[0.03em] text-[var(--muted)] sm:text-2xl">
                  一群願意發問、持續行動的人，
                  <br className="hidden sm:block" />共同把青年觀點帶進公共現場。
                </p>
              </div>
            </div>

            <nav data-gsap-reveal aria-label="團隊名單分類" className="mt-12 flex flex-wrap gap-2 border-t border-[var(--line)] pt-6">
              <a className="border border-[var(--ink)] px-4 py-2 text-xs font-black tracking-[0.1em] transition-colors hover:bg-[var(--ink)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]" href="#leadership">
                理事長與副理事長
              </a>
              {teamGroups.map(({ id, title }) => (
                <a
                  className="border border-[var(--line)] px-4 py-2 text-xs font-black tracking-[0.1em] transition-colors hover:border-[var(--ink)] hover:bg-[var(--ink)] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--orange)]"
                  href={`#${id}`}
                  key={id}
                >
                  {title}
                </a>
              ))}
            </nav>
          </section>

          <section id="leadership" tabIndex={-1} aria-labelledby="leadership-heading" className="section-anchor border-b border-[var(--line)] bg-[var(--paper-soft)]">
            <div className="site-container py-20 sm:py-28">
              <div data-gsap-reveal className="mb-10 flex items-end justify-between gap-6 border-b border-[var(--ink)] pb-5">
                <div>
                  <p className="mb-3 text-xs font-black tracking-[0.18em] text-[var(--orange)]">01 / LEADERSHIP</p>
                  <h2 id="leadership-heading" className="display-font text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                    理事長與副理事長
                  </h2>
                </div>
                <UserRound className="hidden size-10 text-[var(--orange)] sm:block" strokeWidth={1.5} aria-hidden="true" />
              </div>

              <ul data-gsap-stagger className="grid gap-4 md:grid-cols-3">
                {leadershipMembers.map(({ role, name }, index) => {
                  const portrait = memberPortraits[name];

                  return (
                    <li
                      data-gsap-stagger-item
                      className={`group relative flex min-h-72 flex-col justify-between overflow-hidden border border-[var(--ink)] p-7 transition-transform duration-300 hover:-translate-y-1 sm:min-h-80 sm:p-9 ${portrait || index === 0 ? "bg-[var(--ink)] text-white" : "bg-white"}`}
                      key={`${role}-${name}`}
                    >
                      {portrait ? (
                        <>
                          <Image
                            src={portrait.src}
                            alt=""
                            fill
                            placeholder="blur"
                            sizes="(max-width: 767px) calc(100vw - 2rem), 33vw"
                            className={portrait.imageClassName}
                            data-member-portrait={name}
                          />
                          <span
                            className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/25 to-black/90"
                            aria-hidden="true"
                          />
                        </>
                      ) : null}
                      <span
                        className={`relative z-10 text-xs font-black tracking-[0.16em] ${portrait || index === 0 ? "text-[var(--orange)]" : "text-[var(--muted)]"}`}
                      >
                        {role}
                      </span>
                      <p className="display-font relative z-10 mt-10 text-5xl font-black tracking-[-0.06em] sm:text-6xl">
                        {name}
                      </p>
                      <span
                        className={`absolute bottom-6 right-7 z-10 text-7xl font-black leading-none transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3 ${portrait || index === 0 ? "text-white/15" : "text-[var(--orange)]/12"}`}
                        aria-hidden="true"
                      >
                        0{index + 1}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>

          <section aria-labelledby="organization-heading" className="site-container py-20 sm:py-28">
            <div data-gsap-reveal className="mb-10 grid gap-5 border-b border-[var(--ink)] pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <p className="mb-3 text-xs font-black tracking-[0.18em] text-[var(--orange)]">02 / ORGANIZATION</p>
                <h2 id="organization-heading" className="display-font text-4xl font-black tracking-[-0.05em] sm:text-6xl">
                  各職務成員
                </h2>
              </div>
              <p className="text-sm font-bold tracking-[0.08em] text-[var(--muted)]">依協會組織分工排列</p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {teamGroups.map(({ id, title, label, members }, groupIndex) => {
                const Icon = groupIcons[id];

                return (
                  <article
                    id={id}
                    tabIndex={-1}
                    aria-labelledby={`${id}-heading`}
                    className="section-anchor grid overflow-hidden border border-[var(--ink)] bg-white lg:grid-cols-[0.42fr_1.58fr]"
                    data-gsap-reveal
                    key={id}
                  >
                    <header className={`${groupIndex === 1 ? "bg-[var(--ink)] text-white" : "bg-[var(--paper-soft)]"} flex min-h-44 flex-col justify-between gap-8 border-b border-[var(--ink)] p-7 lg:min-h-full lg:border-b-0 lg:border-r lg:p-9`}>
                      <div className="flex items-start justify-between gap-4">
                        <span className={`text-[11px] font-black tracking-[0.18em] ${groupIndex === 1 ? "text-[var(--orange)]" : "text-[var(--muted)]"}`}>
                          {label}
                        </span>
                        <Icon className="size-7 text-[var(--orange)]" strokeWidth={1.5} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 id={`${id}-heading`} className="display-font text-[clamp(2.25rem,3.4vw,2.75rem)] font-black leading-tight tracking-[-0.05em]">
                          {title}
                        </h3>
                        <p className={`mt-3 text-sm font-bold tracking-[0.08em] ${groupIndex === 1 ? "text-white/60" : "text-[var(--muted)]"}`}>
                          {String(members.length).padStart(2, "0")} MEMBERS
                        </p>
                      </div>
                    </header>

                    <ul
                      data-gsap-stagger
                      className={`grid grid-cols-2 gap-px bg-[var(--line)] ${members.length === 4 ? "xl:grid-cols-2" : "xl:grid-cols-3"}`}
                    >
                      {members.map(({ role, name }, index) => {
                        const portrait = memberPortraits[name];
                        const isOddLastMember =
                          members.length % 2 === 1 &&
                          index === members.length - 1;

                        return (
                          <li
                            data-gsap-stagger-item
                            className={`group relative flex min-h-44 flex-col justify-between overflow-hidden bg-white p-5 transition-colors duration-300 sm:min-h-52 sm:p-6 ${portrait ? "bg-[var(--ink)] text-white" : "hover:bg-[var(--paper-soft)]"} ${isOddLastMember ? "col-span-2 xl:col-span-1" : ""}`}
                            key={`${role}-${name}`}
                          >
                            {portrait ? (
                              <>
                                <Image
                                  src={portrait.src}
                                  alt=""
                                  fill
                                  placeholder="blur"
                                  sizes="(max-width: 1023px) 50vw, 30vw"
                                  className={portrait.imageClassName}
                                  data-member-portrait={name}
                                />
                                <span
                                  className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/25 to-black/90"
                                  aria-hidden="true"
                                />
                              </>
                            ) : null}
                            <div className="relative z-10 flex items-start justify-between gap-3">
                              <span
                                className={`text-[11px] font-black tracking-[0.12em] ${portrait ? "text-[var(--orange)]" : "text-[var(--muted)]"}`}
                              >
                                {role}
                              </span>
                              <span
                                className={portrait ? "text-white/65" : "text-[var(--orange)]"}
                                aria-hidden="true"
                              >
                                <span className="text-[9px] font-black tracking-[0.12em]">
                                  {String(index + 1).padStart(2, "0")}
                                </span>
                              </span>
                            </div>
                            <p className="display-font relative z-10 mt-10 text-[clamp(1.75rem,2.7vw,2.6rem)] font-black tracking-[-0.05em] transition-colors group-hover:text-[var(--orange)]">
                              {name}
                            </p>
                          </li>
                        );
                      })}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="border-y border-[var(--ink)] bg-[var(--orange)] text-white">
            <div data-gsap-reveal className="site-container grid gap-8 py-16 sm:py-20 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-black tracking-[0.2em] text-white/70">WORK WITH US</p>
                <h2 className="display-font max-w-4xl text-[clamp(2.8rem,5vw,6rem)] font-black leading-[1.08] tracking-[-0.06em]">
                  下一個公共提問，
                  <br />也可以從你開始。
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
                <Button variant="inverse" size="lg" asChild>
                  <a href="mailto:neogentaiwan2026@gmail.com?subject=我想加入協會行動">
                    聯絡協會
                    <Mail className="size-5" aria-hidden="true" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-white bg-transparent text-white hover:border-white hover:bg-white hover:text-[var(--ink)]" asChild>
                  <Link href="/">
                    <ArrowLeft className="size-5" aria-hidden="true" />
                    回到主網站
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          <div className="site-container py-8">
            <a className="group inline-flex items-center gap-2 text-sm font-black tracking-[0.1em] text-[var(--muted)] hover:text-[var(--orange)]" href="#top">
              回到頁首
              <ArrowRight className="size-4 -rotate-90 transition-transform group-hover:-translate-y-1" aria-hidden="true" />
            </a>
          </div>

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

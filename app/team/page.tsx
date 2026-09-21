import type { Metadata } from "next";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SiteMotion } from "@/components/site-motion";
import { Button } from "@/components/ui/button";
import {
  SITE_NAME,
  TEAM_DESCRIPTION,
  TEAM_OG_IMAGE,
  TEAM_TITLE,
  TEAM_URL,
  createTeamStructuredData,
  sharedRobots,
} from "@/lib/seo";
import { allTeamMembers, leadershipMembers, teamGroups } from "@/lib/team";

import chenTingchuPortrait from "./images/chen-tingchu-cutout.png";
import liuXunzhiPortrait from "./images/liu-xunzhi-cutout.png";
import wuYizuPortrait from "./images/wu-yizu-cutout.png";

const structuredData = createTeamStructuredData(allTeamMembers);

export const metadata: Metadata = {
  title: { absolute: TEAM_TITLE },
  description: TEAM_DESCRIPTION,
  robots: sharedRobots,
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
        url: TEAM_OG_IMAGE,
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
    images: [
      {
        url: TEAM_OG_IMAGE,
        alt: TEAM_TITLE,
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
};

const memberPortraits: Partial<Record<
  string,
  { src: StaticImageData; imageClassName: string }
>> = {
  陳庭楚: {
    src: chenTingchuPortrait,
    imageClassName:
      "object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none",
  },
  吳憶祖: {
    src: wuYizuPortrait,
    imageClassName:
      "object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.035] motion-reduce:transition-none",
  },
  劉訊志: {
    src: liuXunzhiPortrait,
    imageClassName:
      "object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.025] motion-reduce:transition-none",
  },
};

export default function TeamPage() {
  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
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
            className="site-container relative border-b border-[var(--ink)] pb-10 pt-8 sm:pb-14 sm:pt-10 lg:pb-12"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.55fr)_minmax(15rem,0.45fr)] lg:items-end lg:gap-16">
              <div>
                <h1
                  data-gsap-hero
                  className="display-font flex items-end gap-[0.04em] text-[clamp(4.4rem,11vw,11.5rem)] font-black leading-[0.82] tracking-[-0.095em]"
                >
                  <span>協會團隊</span>
                  <span
                    className="mb-[0.06em] inline-block h-[0.74em] w-[0.28em] shrink-0 bg-[var(--orange)]"
                    style={{ transform: "skewX(-20deg)" }}
                    aria-hidden="true"
                  />
                </h1>
                <p
                  data-gsap-hero
                  className="mt-6 text-[11px] font-black tracking-[0.48em] text-[var(--ink)] sm:text-xs"
                >
                  THE PEOPLE / 2026
                </p>
              </div>

              <div data-gsap-hero className="border-t border-[var(--ink)] pt-5 lg:mb-1">
                <p className="display-font text-2xl font-black leading-[1.55] tracking-[-0.03em] sm:text-3xl">
                  一群願意發問、
                  <br />持續行動的人。
                </p>
                <p className="mt-4 max-w-sm text-sm font-bold leading-7 tracking-[0.06em] text-[var(--muted)]">
                  共同把青年觀點帶進公共現場。
                </p>
              </div>
            </div>
          </section>

          <section
            id="leadership"
            tabIndex={-1}
            aria-labelledby="leadership-heading"
            className="section-anchor site-container py-5 sm:py-7"
          >
            <h2 id="leadership-heading" className="sr-only">理事長與副理事長</h2>

            <ul
              data-gsap-stagger
              className="grid grid-cols-2 gap-3 lg:grid-cols-[1.45fr_0.55fr_0.55fr] lg:gap-5"
            >
              {leadershipMembers.map(({ role, name }, index) => {
                const portrait = memberPortraits[name];

                if (index === 0 && portrait) {
                  return (
                    <li
                      data-gsap-stagger-item
                      data-leadership-card="primary"
                      className="group relative col-span-2 min-h-[23rem] overflow-hidden bg-[var(--orange)] text-white lg:col-span-1 lg:min-h-[25rem]"
                      key={`${role}-${name}`}
                    >
                      <span className="absolute left-6 top-6 z-30 bg-white px-2.5 py-1.5 text-[10px] font-black tracking-[0.14em] text-[var(--orange)] sm:left-8 sm:top-8">
                        01
                      </span>
                      <span
                        data-member-backdrop="leadership"
                        className="absolute bottom-0 right-[11%] h-[86%] w-[45%] bg-[var(--paper-soft)]"
                        style={{ clipPath: "polygon(34% 0, 100% 0, 66% 100%, 0 100%)" }}
                        aria-hidden="true"
                      />
                      <div className="absolute inset-y-0 right-0 z-10 w-[72%] sm:w-[65%]">
                        <Image
                          src={portrait.src}
                          alt=""
                          fill
                          priority
                          placeholder="blur"
                          sizes="(max-width: 1023px) calc(100vw - 2rem), 48vw"
                          className={portrait.imageClassName}
                          data-member-portrait={name}
                        />
                      </div>
                      <div className="absolute inset-x-6 bottom-7 z-20 sm:inset-x-8 sm:bottom-9">
                        <p className="text-lg font-black tracking-[0.08em] sm:text-xl">{role}</p>
                        <p className="display-font mt-3 text-[clamp(3.6rem,7vw,6.5rem)] font-black leading-none tracking-[-0.08em]">
                          {name}
                        </p>
                        <p className="mt-5 text-[10px] font-black tracking-[0.42em] text-white/80">
                          CHAIRPERSON
                        </p>
                      </div>
                    </li>
                  );
                }

                return (
                  <li
                    data-gsap-stagger-item
                    data-leadership-card="vice"
                    className="group relative min-h-64 overflow-hidden border border-[var(--line)] bg-[var(--paper-soft)] p-5 sm:min-h-72 sm:p-7 lg:min-h-[25rem] lg:p-8"
                    key={`${role}-${name}`}
                  >
                    <span className="relative z-10 inline-flex bg-[var(--ink)] px-2.5 py-1.5 text-[10px] font-black tracking-[0.14em] text-white">
                      0{index + 1}
                    </span>
                    <div className="relative z-10 mt-8 sm:mt-12">
                      <p className="text-sm font-black tracking-[0.08em] sm:text-lg">{role}</p>
                      <span className="mt-4 block h-px w-7 bg-[var(--ink)]" aria-hidden="true" />
                      <p className={`display-font mt-5 w-fit text-[clamp(2.4rem,4.2vw,4.4rem)] font-black leading-none tracking-[-0.07em] ${portrait ? "bg-[var(--paper-soft)] pr-2" : ""}`}>
                        {name}
                      </p>
                    </div>
                    {portrait ? (
                      <div className="absolute inset-x-0 bottom-0 z-[5] h-[76%]">
                        <Image
                          src={portrait.src}
                          alt=""
                          fill
                          placeholder="blur"
                          sizes="(max-width: 1023px) 50vw, 22vw"
                          className={portrait.imageClassName}
                          data-member-portrait={name}
                        />
                      </div>
                    ) : null}
                    <p className="absolute bottom-6 left-5 z-10 text-[9px] font-black tracking-[0.3em] text-[var(--muted)] sm:bottom-8 sm:left-7">
                      VICE CHAIRPERSON
                    </p>
                    <span
                      data-member-backdrop="leadership"
                      className="absolute -bottom-8 -right-2 h-36 w-12 bg-[var(--orange)] transition-transform duration-500 group-hover:-translate-x-2 motion-reduce:transition-none"
                      style={{ transform: "skewX(-24deg)" }}
                      aria-hidden="true"
                    />
                  </li>
                );
              })}
            </ul>
          </section>

          <section
            aria-labelledby="organization-heading"
            className="site-container pb-20 pt-8 sm:pb-28 sm:pt-12"
          >
            <h2 id="organization-heading" className="sr-only">各職務成員</h2>

            <div className="grid border-t border-[var(--ink)] lg:grid-cols-3">
              {teamGroups.map(({ id, title, label, members }, groupIndex) => {
                const featuredMember = members.find(({ name }) => name === "劉訊志");
                const featuredPortrait = featuredMember
                  ? memberPortraits[featuredMember.name]
                  : undefined;
                const rosterMembers = featuredMember
                  ? members.filter(({ name }) => name !== featuredMember.name)
                  : members;

                return (
                  <article
                    id={id}
                    tabIndex={-1}
                    aria-labelledby={`${id}-heading`}
                    className="section-anchor border-b border-[var(--ink)] py-7 lg:border-r lg:px-8 lg:py-8 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
                    data-gsap-reveal
                    data-team-roster-group={id}
                    key={id}
                  >
                    <header className="flex items-center gap-4 border-b border-[var(--ink)] pb-5">
                      <span className="bg-[var(--orange)] px-2.5 py-1.5 text-[10px] font-black tracking-[0.1em] text-white">
                        {String(groupIndex + 4).padStart(2, "0")}
                      </span>
                      <h3
                        id={`${id}-heading`}
                        className="display-font text-[clamp(2rem,3vw,3rem)] font-black tracking-[-0.05em]"
                      >
                        {title}
                      </h3>
                      <span className="ml-auto text-[9px] font-black tracking-[0.2em] text-[var(--muted)]">
                        {String(members.length).padStart(2, "0")} {label}
                      </span>
                    </header>

                    {featuredMember && featuredPortrait ? (
                      <div className="group relative mt-5 min-h-52 overflow-hidden bg-[var(--paper-soft)]" data-featured-member={featuredMember.name}>
                        <span
                          data-member-backdrop="secretariat"
                          className="absolute bottom-0 left-4 h-20 w-[72%] bg-[var(--orange)]"
                          style={{ clipPath: "polygon(0 38%, 82% 0, 100% 100%, 0 100%)" }}
                          aria-hidden="true"
                        />
                        <div className="absolute inset-y-0 left-0 z-10 w-[58%]">
                          <Image
                            src={featuredPortrait.src}
                            alt=""
                            fill
                            placeholder="blur"
                            sizes="(max-width: 1023px) calc(100vw - 2rem), 22vw"
                            className={featuredPortrait.imageClassName}
                            data-member-portrait={featuredMember.name}
                          />
                        </div>
                        <div className="absolute bottom-6 right-5 z-20 max-w-[52%] text-right">
                          <p className="text-xs font-black tracking-[0.08em]">{featuredMember.role}</p>
                          <p className="display-font mt-2 text-4xl font-black leading-none tracking-[-0.06em] sm:text-5xl">
                            {featuredMember.name}
                          </p>
                          <p className="mt-3 text-[8px] font-black tracking-[0.28em] text-[var(--muted)]">
                            DEPUTY SECRETARY GENERAL
                          </p>
                        </div>
                      </div>
                    ) : null}

                    <ul data-gsap-stagger className={featuredMember ? "mt-3" : "mt-2"}>
                      {rosterMembers.map(({ role, name }, index) => (
                        <li
                          data-gsap-stagger-item
                          data-roster-member={name}
                          className="group flex items-center justify-between gap-5 border-b border-[var(--line)] py-4"
                          key={`${role}-${name}`}
                        >
                          <span className="display-font text-2xl font-black tracking-[-0.04em] transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[var(--orange)] motion-reduce:transition-none sm:text-3xl">
                            {name}
                          </span>
                          <span className="text-[10px] font-black tracking-[0.12em] text-[var(--muted)]">
                            {role}
                          </span>
                          <span className="sr-only">第 {index + 1} 位</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </section>

          <section className="border-y border-[var(--ink)] bg-[var(--ink)] text-white">
            <div data-gsap-reveal className="site-container grid gap-8 py-14 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="mb-5 text-xs font-black tracking-[0.2em] text-[var(--orange)]">WORK WITH US</p>
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
              <ArrowRight className="size-4 -rotate-90 transition-transform group-hover:-translate-y-1 motion-reduce:transition-none" aria-hidden="true" />
            </a>
          </div>

          <SiteFooter />
        </div>
      </div>
    </main>
  );
}

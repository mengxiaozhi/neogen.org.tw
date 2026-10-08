import type { Metadata } from "next";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID, sharedRobots } from "./seo";

export const RAINBOW_PATH = "/rainbow2026";
export const RAINBOW_NAME = "2026 第 24 屆臺灣同志遊行";
export const RAINBOW_THEME = "聲做伙聽，路做伙行";
export const RAINBOW_SOURCE = "https://www.facebook.com/share/p/1A1NaCkAq4/";
export const RAINBOW_ORGANIZER = "臺灣彩虹公民行動協會";
export const RAINBOW_OFFICIAL_SITE = "https://www.taiwanpride.lgbt/";
export const RAINBOW_OFFICIAL_INFO = "https://www.taiwanpride.lgbt/2026-info-1";
export const RAINBOW_POSTER = "/rainbow2026/event-poster.png";
export const RAINBOW_CONTENT_UPDATED = "2026-10-08";

const title = `${RAINBOW_NAME}｜${RAINBOW_THEME}`;
const description = "2026 年 10 月 31 日，一起參加臺灣同志遊行。聲做伙聽，路做伙行 Our Voices, Our Journey。臺灣新文化青年協會邀你支持多元平權，讓每一種愛，自由綻放。";
const image = { url: RAINBOW_POSTER, width: 1122, height: 1402, alt: "一起參加同志遊行，讓每一種愛，自由綻放。彩虹花朵與斜向色帶活動海報", type: "image/png" };

export const rainbowMetadata: Metadata = {
  title: { absolute: title },
  description,
  robots: sharedRobots,
  alternates: { canonical: RAINBOW_PATH },
  openGraph: { type: "website", locale: "zh_TW", url: RAINBOW_PATH, siteName: SITE_NAME, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

// This is the association's participation page. Do not imply that it organizes
// the parade or invent event locations, times, offers, or a registration flow.
export const rainbowStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}${RAINBOW_PATH}#webpage`,
  url: `${SITE_URL}${RAINBOW_PATH}`,
  name: title,
  description,
  inLanguage: "zh-Hant-TW",
  dateModified: RAINBOW_CONTENT_UPDATED,
  isPartOf: { "@id": WEBSITE_ID },
  publisher: { "@id": ORGANIZATION_ID },
  primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${RAINBOW_POSTER}`, width: 1122, height: 1402 },
  relatedLink: [RAINBOW_OFFICIAL_SITE, RAINBOW_OFFICIAL_INFO, RAINBOW_SOURCE],
};

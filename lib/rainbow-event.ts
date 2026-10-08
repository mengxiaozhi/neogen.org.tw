import type { Metadata } from "next";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID, organizationJsonLd, sharedRobots, websiteJsonLd } from "./seo";

export const RAINBOW_PATH = "/rainbow2026";
export const RAINBOW_URL = `${SITE_URL}${RAINBOW_PATH}`;
export const RAINBOW_NAME = "2026 第 24 屆臺灣同志遊行";
export const RAINBOW_THEME = "聲做伙聽，路做伙行";
export const RAINBOW_SOURCE = "https://www.facebook.com/share/p/1A1NaCkAq4/";
export const RAINBOW_ORGANIZER = "臺灣彩虹公民行動協會";
export const RAINBOW_OFFICIAL_SITE = "https://www.taiwanpride.lgbt/";
export const RAINBOW_OFFICIAL_INFO = "https://www.taiwanpride.lgbt/2026-info-1";
export const RAINBOW_POSTER = "/rainbow2026/event-poster.png";
export const RAINBOW_CONTENT_UPDATED = "2026-10-08";
export const RAINBOW_OG_IMAGE = `${RAINBOW_URL}/opengraph-image`;
export const RAINBOW_OG_ALT = "2026 第 24 屆臺灣同志遊行｜10.31 聲做伙聽，路做伙行 Our Voices, Our Journey｜臺灣新文化青年協會";

const title = `2026 臺灣同志遊行｜${RAINBOW_THEME}｜${SITE_NAME}`;
const description = "2026 第24屆臺灣同志遊行，10月31日（六）一起走上街頭。主題「聲做伙聽，路做伙行／Our Voices, Our Journey」。臺灣新文化青年協會邀你支持多元平權，查看活動理念、海報與主辦單位官方資訊。";
const image = { url: RAINBOW_OG_IMAGE, width: 1200, height: 630, alt: RAINBOW_OG_ALT, type: "image/png" };

export const rainbowMetadata: Metadata = {
  title: { absolute: title },
  description,
  robots: sharedRobots,
  alternates: { canonical: RAINBOW_URL },
  openGraph: { type: "website", locale: "zh_TW", url: RAINBOW_URL, siteName: SITE_NAME, title, description, images: [image] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

// Describe the association's participation page and its visible sections.
// The association publishes this page; the parade's official organizer is separate.
export const rainbowStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationJsonLd,
    websiteJsonLd,
    {
      "@type": "WebPage",
      "@id": `${RAINBOW_URL}#webpage`,
      url: RAINBOW_URL,
      name: title,
      description,
      inLanguage: "zh-Hant-TW",
      dateModified: RAINBOW_CONTENT_UPDATED,
      isPartOf: { "@id": WEBSITE_ID },
      publisher: { "@id": ORGANIZATION_ID },
      about: { "@type": "Thing", name: RAINBOW_NAME, sameAs: RAINBOW_OFFICIAL_INFO },
      breadcrumb: { "@id": `${RAINBOW_URL}#breadcrumb` },
      primaryImageOfPage: { "@id": `${RAINBOW_URL}#poster` },
      relatedLink: [RAINBOW_OFFICIAL_SITE, RAINBOW_OFFICIAL_INFO, RAINBOW_SOURCE],
      hasPart: [
        ["rainbow-about", "遊行主題"],
        ["rainbow-voices", "我們的聲音"],
        ["rainbow-info", "活動資訊"],
      ].map(([id, name]) => ({
        "@type": "WebPageElement",
        "@id": `${RAINBOW_URL}#${id}`,
        url: `${RAINBOW_URL}#${id}`,
        name,
        isPartOf: { "@id": `${RAINBOW_URL}#webpage` },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${RAINBOW_URL}#breadcrumb`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: RAINBOW_NAME, item: RAINBOW_URL },
      ],
    },
    {
      "@type": "ImageObject",
      "@id": `${RAINBOW_URL}#poster`,
      url: `${SITE_URL}${RAINBOW_POSTER}`,
      contentUrl: `${SITE_URL}${RAINBOW_POSTER}`,
      width: 1122,
      height: 1402,
      caption: "一起參加同志遊行，讓每一種愛，自由綻放。臺灣新文化青年協會活動海報。",
    },
  ],
};

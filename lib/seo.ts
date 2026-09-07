import type { Metadata } from "next";

export const SITE_URL = "https://neogen.org.tw";
export const SITE_NAME = "臺灣新文化青年協會";
export const ASSOCIATION_LEGAL_NAME = "社團法人臺灣新文化青年協會";
export const SITE_TITLE = `${SITE_NAME}｜以青年之聲，寫臺灣新章`;
export const SITE_DESCRIPTION =
  "社團法人臺灣新文化青年協會鼓勵青年獨立思考、勇於發聲、積極參與公共事務，讓多元觀點進入公共討論。";
export const SITE_OG_DESCRIPTION =
  "拒絕盲從，直視權力。共同建構屬於當代臺灣青年的公共文化。";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const SOCIAL_LINKS = [
  {
    name: "Instagram",
    handle: "@neo_gen.taiwan",
    href: "https://www.instagram.com/neo_gen.taiwan/",
  },
  {
    name: "Threads",
    handle: "@neo_gen.taiwan",
    href: "https://www.threads.com/@neo_gen.taiwan",
  },
  {
    name: "Facebook",
    handle: "臺灣新文化青年學社",
    href: "https://www.facebook.com/profile.php?id=61586169947513",
  },
] as const;

export const sharedRobots = {
  index: true,
  follow: true,
  nocache: false,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
} satisfies NonNullable<Metadata["robots"]>;

export const organizationJsonLd = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: SITE_NAME,
  legalName: ASSOCIATION_LEGAL_NAME,
  url: `${SITE_URL}/`,
  email: "neogentaiwan2026@gmail.com",
  address: {
    "@type": "PostalAddress",
    postalCode: "231",
    addressRegion: "新北市",
    addressLocality: "新店區",
    streetAddress: "安興路105號5樓之7",
    addressCountry: "TW",
  },
  identifier: [
    {
      "@type": "PropertyValue",
      name: "立案字號",
      value: "台內團字第1150024192號函",
    },
    {
      "@type": "PropertyValue",
      name: "統一編號",
      value: "61490573",
    },
  ],
  sameAs: SOCIAL_LINKS.map(({ href }) => href),
} as const;

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: "zh-Hant-TW",
  publisher: { "@id": ORGANIZATION_ID },
} as const;

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd],
} as const;

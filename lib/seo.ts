import type { Metadata } from "next";

export const SITE_URL = "https://www.neogen.org.tw";
export const SITE_NAME = "臺灣新文化青年協會";
export const ASSOCIATION_LEGAL_NAME = "社團法人臺灣新文化青年協會";
export const SITE_TITLE = `${SITE_NAME}｜以青年之聲，寫臺灣新章`;
export const SITE_DESCRIPTION =
  "社團法人臺灣新文化青年協會以學生及社會青年為主體，倡議獨立思考與公共參與。認識協會理念、青年行動與2027青年參議院，讓多元觀點進入公共討論。";
export const SITE_OG_DESCRIPTION =
  "臺灣新文化青年協會｜拒絕盲從，直視權力。以獨立思考、多元對話與青年行動，共同建構當代臺灣的公共文化。";

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

// Preview pages must remain crawlable so crawlers can read the noindex directive.
// Local builds retain production metadata unless Vercel identifies a preview.
export const isIndexableEnvironment = !["preview", "development"].includes(process.env.VERCEL_ENV ?? "");

export const sharedRobots = {
  index: isIndexableEnvironment,
  follow: true,
  nocache: false,
  googleBot: {
    index: isIndexableEnvironment,
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
  description: SITE_DESCRIPTION,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/brand/association-logo-main.png`,
    contentUrl: `${SITE_URL}/brand/association-logo-main.png`,
    width: 768,
    height: 768,
    caption: `${SITE_NAME}標誌`,
  },
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
  alternateName: ASSOCIATION_LEGAL_NAME,
  inLanguage: "zh-Hant-TW",
  publisher: { "@id": ORGANIZATION_ID },
} as const;

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationJsonLd,
    websiteJsonLd,
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: `${SITE_URL}/`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      inLanguage: "zh-Hant-TW",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/youth-forum.jpg`,
        width: 8173,
        height: 5451,
        caption: "青年參與公共論壇，在議事空間中共同合影",
      },
      hasPart: [
        { "@type": "WebPageElement", url: `${SITE_URL}/#about`, name: "認識協會" },
        { "@type": "WebPageElement", url: `${SITE_URL}/#actions`, name: "青年行動" },
        { "@type": "WebPage", "@id": `${SITE_URL}/2027#webpage`, url: `${SITE_URL}/2027`, name: "2027 青年參議院—立法院會議" },
      ],
    },
  ],
} as const;

import type { Metadata } from "next";

import type { TeamMember } from "@/lib/team";

export const SITE_URL = "https://www.neogen.org.tw";
export const SITE_NAME = "臺灣新文化青年協會";
export const ASSOCIATION_LEGAL_NAME = "社團法人臺灣新文化青年協會";
export const SITE_TITLE = `${SITE_NAME}｜以青年之聲，寫臺灣新章`;
export const SITE_DESCRIPTION =
  "社團法人臺灣新文化青年協會以學生及社會青年為主體，倡議獨立思考與公共參與。認識協會理念、青年行動與2027青年參議院，讓多元觀點進入公共討論。";
export const SITE_OG_DESCRIPTION =
  "臺灣新文化青年協會｜拒絕盲從，直視權力。以獨立思考、多元對話與青年行動，共同建構當代臺灣的公共文化。";
export const SITE_CONTENT_UPDATED = "2026-09-21";
export const TEAM_URL = `${SITE_URL}/team`;
export const TEAM_TITLE = `協會團隊｜${SITE_NAME}`;
export const TEAM_DESCRIPTION =
  "認識臺灣新文化青年協會理事長、副理事長、理事、監事與秘書處成員，了解推動青年公共參與的協會團隊與組織分工。";
export const TEAM_CONTENT_UPDATED = "2026-09-23";
export const TEAM_OG_IMAGE = `${TEAM_URL}/opengraph-image`;
export const PRIVACY_URL = `${SITE_URL}/privacy`;
export const PRIVACY_TITLE = `Cookie 與隱私說明｜${SITE_NAME}`;
export const PRIVACY_DESCRIPTION =
  "了解臺灣新文化青年協會網站的 Google Analytics、Cookie 用途、保存期限、隱私保障與同意撤回方式。";
export const PRIVACY_CONTENT_UPDATED = "2026-09-21";

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
      dateModified: SITE_CONTENT_UPDATED,
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
        { "@type": "WebPage", "@id": `${TEAM_URL}#webpage`, url: TEAM_URL, name: TEAM_TITLE },
        { "@type": "WebPageElement", url: `${SITE_URL}/#actions`, name: "青年行動" },
        { "@type": "WebPage", "@id": `${SITE_URL}/2027#webpage`, url: `${SITE_URL}/2027`, name: "2027 青年參議院—立法院會議" },
      ],
    },
  ],
} as const;

const PRIVACY_BREADCRUMB_ID = `${PRIVACY_URL}#breadcrumb`;

export const privacyStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organizationJsonLd,
    websiteJsonLd,
    {
      "@type": "WebPage",
      "@id": `${PRIVACY_URL}#webpage`,
      url: PRIVACY_URL,
      name: PRIVACY_TITLE,
      description: PRIVACY_DESCRIPTION,
      dateModified: PRIVACY_CONTENT_UPDATED,
      inLanguage: "zh-Hant-TW",
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": ORGANIZATION_ID },
      publisher: { "@id": ORGANIZATION_ID },
      breadcrumb: { "@id": PRIVACY_BREADCRUMB_ID },
    },
    {
      "@type": "BreadcrumbList",
      "@id": PRIVACY_BREADCRUMB_ID,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "首頁",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cookie 與隱私說明",
          item: PRIVACY_URL,
        },
      ],
    },
  ],
} as const;

const TEAM_BREADCRUMB_ID = `${TEAM_URL}#breadcrumb`;
const TEAM_LIST_ID = `${TEAM_URL}#roster`;

export function createTeamStructuredData(allTeamMembers: readonly TeamMember[]) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      websiteJsonLd,
      {
        "@type": "CollectionPage",
        "@id": `${TEAM_URL}#webpage`,
        url: TEAM_URL,
        name: TEAM_TITLE,
        description: TEAM_DESCRIPTION,
        dateModified: TEAM_CONTENT_UPDATED,
        inLanguage: "zh-Hant-TW",
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": ORGANIZATION_ID },
        publisher: { "@id": ORGANIZATION_ID },
        breadcrumb: { "@id": TEAM_BREADCRUMB_ID },
        mainEntity: { "@id": TEAM_LIST_ID },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: TEAM_OG_IMAGE,
          width: 1200,
          height: 630,
          caption: "臺灣新文化青年協會團隊",
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": TEAM_BREADCRUMB_ID,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "首頁",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "協會團隊",
            item: TEAM_URL,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": TEAM_LIST_ID,
        name: "臺灣新文化青年協會團隊名單",
        numberOfItems: allTeamMembers.length,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: allTeamMembers.map(({ role, name }, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            "@id": `${TEAM_URL}#member-${index + 1}`,
            name,
            jobTitle: role,
            memberOf: { "@id": ORGANIZATION_ID },
          },
        })),
      },
    ],
  } as const;
}

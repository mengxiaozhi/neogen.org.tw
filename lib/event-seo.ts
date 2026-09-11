import type { Metadata } from "next";
import { ORGANIZATION_ID, SITE_NAME, SITE_URL, WEBSITE_ID, organizationJsonLd, sharedRobots, websiteJsonLd } from "./seo";

export const EVENT_NAME = "2027 青年參議院—立法院會議";
// Update only when the public activity content changes, not on every build.
export const EVENT_CONTENT_UPDATED = "2026-09-11";

export const eventPages = {
  home: {
    path: "/2027", label: "活動理念",
    title: "2027 青年參議院—立法院會議｜活動理念",
    description: "青年問政，議動臺灣。2027 青年參議院於 1 月 25–27 日舉辦，由臺灣新文化青年協會邀請高中職、大專校院學生，透過模擬立法院、黨團協商與國會記者體驗，理解民主制度並參與公共討論。",
  },
  program: {
    path: "/2027/program", label: "活動資訊",
    title: "活動資訊：報名費用與三天流程｜2027 青年參議院",
    description: "2027 青年參議院—立法院會議活動資訊：1 月 25–27 日舉辦，開放高中職、大專校院學生；2026 年 10 月 15 日至 12 月 15 日報名，12 月 25 日公布錄取。費用 NT$2,000 起，查看住宿方案、角色、議題與三天流程。",
  },
  report: {
    path: "/2027/report", label: "對話觀測站",
    title: "意見地圖與 AI 綜整｜2027 青年參議院",
    description: "2027 青年參議院青年議題實驗室的對話觀測站：查看意見地圖、跨群共同點、AI 綜整與公開觀點，理解參與者的不同回應。統計反映本場討論，並非具代表性的民意調查。",
  },
} as const;

type EventPage = keyof typeof eventPages;
const image = { url: `${SITE_URL}/2027/opengraph-image`, width: 1200, height: 630, alt: `${EVENT_NAME}｜2027 年 1 月 25–27 日`, type: "image/png" };

export function eventMetadata(page: EventPage): Metadata {
  const { path, title, description } = eventPages[page];
  return {
    // The activity name already identifies these pages; avoid the long site-wide suffix.
    title: { absolute: title },
    description,
    robots: sharedRobots,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: "zh_TW", url: path, siteName: SITE_NAME, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

const sections = {
  home: [],
  program: [["event-practical", "報名時程與費用"], ["event-roles", "角色與議題"], ["event-schedule", "三天流程"]],
  report: [["report-map", "完整意見地圖"], ["report-consensus", "跨群共同點與橋接觀點"], ["report-ai", "AI 審議綜整"], ["report-statements", "全部觀點與回應"]],
} as const;

export function eventStructuredData(page: EventPage) {
  const { path, title, description, label } = eventPages[page];
  const url = `${SITE_URL}${path}`;
  const homeUrl = `${SITE_URL}/2027`;
  const crumbs = [
    { name: SITE_NAME, item: `${SITE_URL}/` },
    { name: `${EVENT_NAME}｜活動理念`, item: homeUrl },
    ...(page === "home" ? [] : [{ name: label, item: url }]),
  ];
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationJsonLd,
      websiteJsonLd,
      {
        "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description,
        inLanguage: "zh-Hant-TW", isPartOf: { "@id": page === "home" ? WEBSITE_ID : `${homeUrl}#webpage` },
        publisher: { "@id": ORGANIZATION_ID },
        // Do not imply a confirmed venue or ticket availability with Event/Offer markup.
        about: { "@type": "Thing", "@id": `${homeUrl}#subject`, name: EVENT_NAME },
        ...(page === "report" ? {} : { dateModified: EVENT_CONTENT_UPDATED }),
        primaryImageOfPage: { "@type": "ImageObject", url: image.url, width: image.width, height: image.height, caption: image.alt },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        hasPart: page === "home"
          ? [eventPages.program, eventPages.report].map(({ path, label }) => ({ "@type": "WebPage", "@id": `${SITE_URL}${path}#webpage`, url: `${SITE_URL}${path}`, name: label }))
          : sections[page].map(([id, name]) => ({ "@type": "WebPageElement", "@id": `${url}#${id}`, url: `${url}#${id}`, name, isPartOf: { "@id": `${url}#webpage` } })),
      },
      { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: crumbs.map((crumb, index) => ({ "@type": "ListItem", position: index + 1, ...crumb })) },
    ],
  };
}

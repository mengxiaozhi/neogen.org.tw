import type { MetadataRoute } from "next";

import { EVENT_CONTENT_UPDATED } from "@/lib/event-seo";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${SITE_URL}/privacy`, lastModified: "2026-09-18" },
    {
      url: `${SITE_URL}/`,
      images: [`${SITE_URL}/images/youth-forum.jpg`],
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: "2026-09-18",
    },
    {
      url: `${SITE_URL}/2027`,
      lastModified: EVENT_CONTENT_UPDATED,
      images: [
        `${SITE_URL}/2027/event-poster.png`,
        `${SITE_URL}/2027/youth-assembly-illustration.png`,
      ],
    },
    {
      url: `${SITE_URL}/2027/program`,
      lastModified: EVENT_CONTENT_UPDATED,
    },
    {
      url: `${SITE_URL}/2027/report`,
    },
  ];
}

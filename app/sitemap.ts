import type { MetadataRoute } from "next";

import { EVENT_CONTENT_UPDATED } from "@/lib/event-seo";
import { SITE_URL, TEAM_CONTENT_UPDATED, TEAM_OG_IMAGE } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: "2026-09-21",
      changeFrequency: "monthly",
      priority: 1,
      images: [`${SITE_URL}/images/youth-forum.jpg`],
    },
    {
      url: `${SITE_URL}/team`,
      lastModified: TEAM_CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [TEAM_OG_IMAGE],
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: "2026-09-18",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${SITE_URL}/2027`,
      lastModified: EVENT_CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
      images: [
        `${SITE_URL}/2027/event-poster.png`,
        `${SITE_URL}/2027/youth-assembly-illustration.png`,
      ],
    },
    {
      url: `${SITE_URL}/2027/program`,
      lastModified: EVENT_CONTENT_UPDATED,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/2027/report`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];
}

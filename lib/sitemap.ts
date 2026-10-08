import type { MetadataRoute } from "next";

import { EVENT_CONTENT_UPDATED, eventPages } from "@/lib/event-seo";
import { RAINBOW_CONTENT_UPDATED, RAINBOW_OG_IMAGE, RAINBOW_PATH, RAINBOW_POSTER } from "@/lib/rainbow-event";
import {
  PRIVACY_CONTENT_UPDATED,
  SITE_CONTENT_UPDATED,
  SITE_URL,
  TEAM_CONTENT_UPDATED,
  TEAM_OG_IMAGE,
} from "@/lib/seo";

function absoluteUrl(path: string) {
  return new URL(path, `${SITE_URL}/`).href;
}

const publicSitemapEntries: MetadataRoute.Sitemap = [
  {
    url: absoluteUrl("/"),
    lastModified: SITE_CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 1,
    images: [absoluteUrl("/images/youth-forum.jpg")],
  },
  {
    url: absoluteUrl("/team"),
    lastModified: TEAM_CONTENT_UPDATED,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [TEAM_OG_IMAGE],
  },
  {
    url: absoluteUrl("/privacy"),
    lastModified: PRIVACY_CONTENT_UPDATED,
    changeFrequency: "yearly",
    priority: 0.2,
  },
  {
    url: absoluteUrl(RAINBOW_PATH),
    lastModified: RAINBOW_CONTENT_UPDATED,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [absoluteUrl(RAINBOW_POSTER), RAINBOW_OG_IMAGE],
  },
  {
    url: absoluteUrl(eventPages.home.path),
    lastModified: EVENT_CONTENT_UPDATED,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [
      absoluteUrl("/2027/event-poster.png"),
      absoluteUrl("/2027/youth-assembly-illustration.png"),
    ],
  },
  {
    url: absoluteUrl(eventPages.program.path),
    lastModified: EVENT_CONTENT_UPDATED,
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    // Discussion data changes independently; omit lastModified until the
    // upstream report provides a trustworthy update timestamp.
    url: absoluteUrl(eventPages.report.path),
    changeFrequency: "weekly",
    priority: 0.6,
  },
];

export function createSitemap(): MetadataRoute.Sitemap {
  return publicSitemapEntries.map((entry) => ({
    ...entry,
    ...(entry.images ? { images: [...entry.images] } : {}),
  }));
}

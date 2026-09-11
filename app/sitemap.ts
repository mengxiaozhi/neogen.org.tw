import type { MetadataRoute } from "next";

import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      images: [`${SITE_URL}/images/youth-forum.jpg`],
    },
    {
      url: `${SITE_URL}/2027`,
      images: [
        `${SITE_URL}/2027/event-poster.png`,
        `${SITE_URL}/2027/youth-assembly-illustration.png`,
      ],
    },
    {
      url: `${SITE_URL}/2027/program`,
    },
    {
      url: `${SITE_URL}/2027/report`,
    },
  ];
}

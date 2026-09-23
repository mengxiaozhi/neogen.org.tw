import type { MetadataRoute } from "next";

import { createSitemap } from "@/lib/sitemap";

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap();
}

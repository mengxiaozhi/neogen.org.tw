import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://neogen.org.tw/" },
    {
      url: "https://neogen.org.tw/2027",
      images: ["https://neogen.org.tw/2027/event-poster.png"],
    },
  ];
}

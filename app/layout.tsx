import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://neogen.org.tw"),
  title: {
    default: "臺灣新文化青年協會｜以青年之聲，寫臺灣新章",
    template: "%s｜臺灣新文化青年協會",
  },
  description:
    "社團法人臺灣新文化青年協會鼓勵青年獨立思考、勇於發聲、積極參與公共事務，讓多元觀點進入公共討論。",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://neogen.org.tw",
    siteName: "臺灣新文化青年協會",
    title: "以青年之聲，寫臺灣新章。",
    description: "拒絕盲從，直視權力。共同建構屬於當代臺灣青年的公共文化。",
    images: [
      {
        url: "/images/youth-forum.jpg",
        width: 1600,
        height: 1067,
        alt: "臺灣新文化青年協會青年公共論壇合影",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="zh-Hant-TW">
      <body>{children}</body>
    </html>
  );
}

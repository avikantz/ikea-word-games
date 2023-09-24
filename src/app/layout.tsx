import "@fontsource-variable/open-sans";
import { ReactNode } from "react";
import type { Metadata } from "next";
import "@/app/global.css";
import "react-simple-keyboard/build/css/index.css";

import { getTFunction } from "./i18n";
import { getLanguagesMap } from "@/app/i18n/settings";
import { BASE_URL } from "@/utils/constants";

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTFunction("en");

  const title = t("common.title");
  const description = t("common.desc");

  return {
    metadataBase: new URL(BASE_URL),
    applicationName: "Ordspel",
    title: { default: title, template: `%s | ${title}` },
    description,
    keywords: "hej, ordspel, ikea, word, games, jumble, wordle, bildval, ordval, bild, ord, val, spel",
    openGraph: {
      type: "website",
      title,
      description,
      images: "/assets/cover.jpg",
    },
    alternates: {
      canonical: "/em",
      languages: getLanguagesMap(),
    },
    authors: { name: "avikantz", url: "https://avikantz.xyz" },
    themeColor: "#005399",
    manifest: "/assets/site.webmanifest",
    icons: [
      { sizes: "180x180", url: "/assets/apple-touch-icon.png", rel: "apple-touch-icon" },
      { sizes: "32x32", url: "/assets/favicon-32x32.png", rel: "icon" },
      { sizes: "16x16", url: "/assets/favicon-16x16.png", rel: "icon" },
      { url: "/assets/safari-pinned-tab.svg", rel: "mask-icon", color: "#005399" },
    ],
  };
}

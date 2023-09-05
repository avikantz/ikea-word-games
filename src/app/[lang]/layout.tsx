import "@fontsource-variable/open-sans";
import type { Metadata } from "next";
import { dir } from "i18next";
import "@/app/global.css";

import { getTFunction } from "../i18n";
import { Providers } from "../providers";
import { getLanguagesMap, LANGUAGES } from "@/app/i18n/settings";
import { BASE_URL } from "@/utils/constants";
import { PageProps } from "@/interfaces/page";

interface RootLayoutParams {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}

export default function RootLayout({ children, params: { lang } }: RootLayoutParams) {
  return (
    <html lang={lang} dir={dir(lang)}>
      <body>
        <Providers lang={lang}>{children}</Providers>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("title");
  const description = t("desc");

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
      canonical: "/",
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

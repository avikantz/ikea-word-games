import type { Metadata } from "next";
import "@fontsource-variable/open-sans";
import { dir } from "i18next";

import { getLanguagesMap, LANGUAGES } from "@/app/i18n/settings";
import { Providers } from "../providers";

export async function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  applicationName: "Ordspel",
  title: "IKEA Word Games",
  description: "Word games with IKEA product names",
  openGraph: {
    type: "website",
    title: "IKEA Word Games",
    description: "Word games with IKEA product names",
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

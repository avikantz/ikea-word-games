import "@fontsource-variable/open-sans";
import type { Metadata } from "next";
import { dir } from "i18next";
import "@/app/global.css";

import { Providers } from "../providers";
import { getLanguagesMap, LANGUAGES } from "@/app/i18n/settings";
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
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: getLanguagesMap(),
    },
  };
}

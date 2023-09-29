import "@fontsource-variable/open-sans";
import type { Metadata } from "next";
import { dir } from "i18next";
import "@/app/global.css";

import { Providers } from "../providers";
import { getLanguagesMap, LANGUAGES } from "@/app/i18n/settings";
import { PageProps } from "@/interfaces/page";
import { getTFunction } from "../i18n";

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

  const title = t("common.title");
  const description = t("common.desc");

  const langName = lang.split("-")[0];

  return {
    applicationName: title,
    title: { default: title, template: `%s | ${title}` },
    description,
    openGraph: {
      type: "website",
      title,
      description,
      images: `/assets/covers/cover_${langName}.jpg`,
    },
    alternates: {
      canonical: `/${lang}`,
      languages: getLanguagesMap(),
    },
  };
}

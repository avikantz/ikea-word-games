import type { Metadata } from "next";
import "@fontsource-variable/open-sans";
import { dir } from "i18next";

import { LANGUAGES } from "@/app/i18n/settings";
import { Providers } from "../providers";

export async function generateStaticParams() {
  return LANGUAGES.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "IKEA Word Games",
  description: "Word games with IKEA product names",
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

import { Metadata } from "next";

import { getTFunction } from "@/app/i18n";
import { PageProps } from "@/interfaces/page";
import BildvalClientLayout from "./client";

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("bildval.title");
  const description = t("bildval.how_to_play.desc.1");

  const langName = lang.split("-")[0];

  return {
    title: { default: title, template: `%s | ${t("common.title")}` },
    description,
    keywords: "hej, ordspel, ikea, word, games, bildval, photo, product, match",
    openGraph: {
      title,
      description,
      images: `/assets/covers/bildval_${langName}.jpg`,
    },
  };
}

export default function BildvalLayout({ children }: { children: React.ReactNode }) {
  return <BildvalClientLayout>{children}</BildvalClientLayout>;
}

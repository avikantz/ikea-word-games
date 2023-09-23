import { Metadata } from "next";

import { getTFunction } from "@/app/i18n";
import { PageProps } from "@/interfaces/page";
import { GAMES } from "@/interfaces";
import BildvalClientLayout from "./client";

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang, GAMES.BILDVAL);

  const title = t("title");
  const description = t("how_to_play.desc.1");

  return {
    title,
    description,
    keywords: "hej, ordspel, ikea, word, games, bildval, photo, product, match",
    openGraph: {
      title,
      description,
      images: "/assets/cover.jpg",
    },
  };
}

export default function BildvalLayout({ children }: { children: React.ReactNode }) {
  return <BildvalClientLayout>{children}</BildvalClientLayout>;
}

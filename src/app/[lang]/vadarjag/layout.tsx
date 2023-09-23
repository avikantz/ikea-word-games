import { Metadata } from "next";

import { getTFunction } from "@/app/i18n";
import { PageProps } from "@/interfaces/page";
import { GAMES } from "@/interfaces";
import VadarjagClientLayout from "./client";

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang, GAMES.VADARJAG);

  const title = t("title");
  const description = t("desc");

  return {
    title,
    description,
    keywords: "hej, ordspel, ikea, word, games, vadarjag, product, name, match",
    openGraph: {
      title,
      description,
      images: "/assets/cover.jpg",
    },
  };
}

export default function VadarjagLayout({ children }: { children: React.ReactNode }) {
  return <VadarjagClientLayout>{children}</VadarjagClientLayout>;
}

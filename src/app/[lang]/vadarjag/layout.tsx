import { Metadata } from "next";

import { getTFunction } from "@/app/i18n";
import { PageProps } from "@/interfaces/page";
import VadarjagClientLayout from "./client";

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("vadarjag.title");
  const description = t("vadarjag.desc");

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

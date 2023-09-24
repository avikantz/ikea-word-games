import { Metadata } from "next";

import { getTFunction } from "@/app/i18n";
import { PageProps } from "@/interfaces/page";
import OrdvalClientLayout from "./client";

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("ordval.title");
  const description = t("ordval.how_to_play.desc.1");

  return {
    title,
    description,
    keywords: "hej, ordspel, ikea, word, games, ordval, product, name, match",
    openGraph: {
      title,
      description,
      images: "/assets/cover.jpg",
    },
  };
}

export default function OrdvalLayout({ children }: { children: React.ReactNode }) {
  return <OrdvalClientLayout>{children}</OrdvalClientLayout>;
}

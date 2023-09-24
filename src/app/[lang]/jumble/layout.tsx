import { Metadata } from "next";

import { getTFunction } from "@/app/i18n";
import { PageProps } from "@/interfaces/page";
import JumbleClientLayout from "./client";

export async function generateMetadata({ params: { lang } }: PageProps): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("jumble.title");
  const description = t("jumble.how_to_play.desc.1");

  return {
    title,
    description,
    keywords: "hej, ordspel, ikea, word, games, jumble, scrabble, virrvarr, product, name, match",
    openGraph: {
      title,
      description,
      images: "/assets/cover.jpg",
    },
  };
}

export default function JumbleLayout({ children }: { children: React.ReactNode }) {
  return <JumbleClientLayout>{children}</JumbleClientLayout>;
}

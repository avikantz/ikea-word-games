import { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

import { ModePageProps } from "@/interfaces/page";
import { getTFunction } from "@/app/i18n";

export default function BildvalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata(
  { params: { lang } }: ModePageProps,
  parentMetadata: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("bildval.title_difficulty", { difficulty: "∞" });
  const description = t("bildval.desc");

  let openGraph = {
    ...(await parentMetadata).openGraph,
    title,
    description,
  } as OpenGraph;

  return {
    title,
    description,
    openGraph,
  };
}

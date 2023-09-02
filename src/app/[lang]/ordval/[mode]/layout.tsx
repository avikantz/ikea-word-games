import { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

import { ModePageProps } from "@/interfaces/page";
import { getTFunction } from "@/app/i18n";
import { GAMES } from "@/interfaces";

export default function OrdvalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata(
  { params: { lang, mode } }: ModePageProps,
  parentMetadata: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTFunction(lang);
  const o = await getTFunction(lang, GAMES.ORDVAL);

  const title = o("title_difficulty", { difficulty: t(mode) });
  const description = o("desc");

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

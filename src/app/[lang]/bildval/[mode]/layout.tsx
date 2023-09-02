import { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

import { ModePageProps } from "@/interfaces/page";
import { getTFunction } from "@/app/i18n";
import { GAMES } from "@/interfaces";

export default function BildvalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata(
  { params: { lang, mode } }: ModePageProps,
  parentMetadata: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTFunction(lang);
  const b = await getTFunction(lang, GAMES.BILDVAL);

  const title = b("title_difficulty", { difficulty: t(mode) });
  const description = b("desc");

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

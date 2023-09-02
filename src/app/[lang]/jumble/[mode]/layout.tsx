import { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

import { ModePageProps } from "@/interfaces/page";
import { getTFunction } from "@/app/i18n";
import { GAMES } from "@/interfaces";

export default function JumbleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateMetadata(
  { params: { lang, mode } }: ModePageProps,
  parentMetadata: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTFunction(lang);
  const j = await getTFunction(lang, GAMES.JUMBLE);

  const title = j("title_difficulty", { difficulty: t(mode) });
  const description = j("desc");

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

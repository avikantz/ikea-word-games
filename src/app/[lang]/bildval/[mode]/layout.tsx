import { Metadata, ResolvingMetadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

import { ModePageProps, PageProps } from "@/interfaces/page";
import { getTFunction } from "@/app/i18n";

export default function BildvalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export async function generateStaticParams({ params: { lang } }: PageProps) {
  return ["easy", "medium", "hard", "insane"].map((mode) => ({ lang, mode }));
}

export async function generateMetadata(
  { params: { lang, mode } }: ModePageProps,
  parentMetadata: ResolvingMetadata,
): Promise<Metadata> {
  const t = await getTFunction(lang);

  const title = t("bildval.title_difficulty", { difficulty: t(mode) });
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

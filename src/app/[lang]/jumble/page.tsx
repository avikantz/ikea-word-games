"use client";

import { SimpleGrid } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { ModeCard, PageTitle } from "@/components";
import { PageProps } from "@/interfaces/page";
import {
  getLocalizedPath,
  PATH_JUMBLE_CUSTOM,
  PATH_JUMBLE_EASY,
  PATH_JUMBLE_HARD,
  PATH_JUMBLE_INSANE,
  PATH_JUMBLE_MEDIUM,
} from "@/utils/paths";
import { GAMES } from "@/interfaces";

function JumbleGame({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: j } = useTranslation(lang, GAMES.JUMBLE);

  return (
    <>
      <PageTitle title={j("title")} desc={j("desc")} />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6, xl: 8 }}>
        <ModeCard
          title={t("easy")}
          desc={j("easy.desc")}
          href={getLocalizedPath(PATH_JUMBLE_EASY, lang)}
          bg="green.100"
        />
        <ModeCard
          title={t("medium")}
          desc={j("medium.desc")}
          href={getLocalizedPath(PATH_JUMBLE_MEDIUM, lang)}
          bg="yellow.200"
        />
        <ModeCard
          title={t("hard")}
          desc={j("hard.desc")}
          href={getLocalizedPath(PATH_JUMBLE_HARD, lang)}
          bg="orange.200"
        />
        <ModeCard
          title={t("insane")}
          desc={j("insane.desc")}
          href={getLocalizedPath(PATH_JUMBLE_INSANE, lang)}
          bg="red.200"
        />
        <ModeCard title={t("custom")} desc={j("custom.desc")} href={getLocalizedPath(PATH_JUMBLE_CUSTOM, lang)} />
      </SimpleGrid>
    </>
  );
}

export default JumbleGame;

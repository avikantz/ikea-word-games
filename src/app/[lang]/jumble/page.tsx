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
import { GRID_COLUMNS, PADDING } from "@/theme";

function JumbleGame({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);

  return (
    <>
      <PageTitle title={t("jumble.title")} desc={t("jumble.desc")} />

      <SimpleGrid columns={GRID_COLUMNS} spacing={PADDING.DEFAULT}>
        <ModeCard
          title={t("common.easy")}
          desc={t("jumble.easy.desc")}
          href={getLocalizedPath(PATH_JUMBLE_EASY, lang)}
          bg="green.100"
        />
        <ModeCard
          title={t("common.medium")}
          desc={t("jumble.medium.desc")}
          href={getLocalizedPath(PATH_JUMBLE_MEDIUM, lang)}
          bg="yellow.200"
        />
        <ModeCard
          title={t("common.hard")}
          desc={t("jumble.hard.desc")}
          href={getLocalizedPath(PATH_JUMBLE_HARD, lang)}
          bg="orange.200"
        />
        <ModeCard
          title={t("common.insane")}
          desc={t("jumble.insane.desc")}
          href={getLocalizedPath(PATH_JUMBLE_INSANE, lang)}
          bg="red.200"
        />
        <ModeCard
          title={t("common.custom")}
          desc={t("jumble.custom.desc")}
          href={getLocalizedPath(PATH_JUMBLE_CUSTOM, lang)}
        />
      </SimpleGrid>
    </>
  );
}

export default JumbleGame;

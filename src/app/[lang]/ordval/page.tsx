"use client";

import { SimpleGrid } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { ModeCard, PageTitle } from "@/components";
import { PageProps } from "@/interfaces/page";
import {
  getLocalizedPath,
  PATH_ORDVAL_EASY,
  PATH_ORDVAL_HARD,
  PATH_ORDVAL_INSANE,
  PATH_ORDVAL_MEDIUM,
  PATH_ORDVAL_UNLIMITED,
} from "@/utils/paths";
import { GRID_COLUMNS, PADDING } from "@/theme";

function OrdvalGame({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);

  return (
    <>
      <PageTitle title={t("ordval.title")} desc={t("ordval.desc")} />

      <SimpleGrid columns={GRID_COLUMNS} spacing={PADDING.DEFAULT}>
        <ModeCard
          title={t("common.easy")}
          desc={t("ordval.easy.desc")}
          href={getLocalizedPath(PATH_ORDVAL_EASY, lang)}
          bg="green.100"
        />
        <ModeCard
          title={t("common.medium")}
          desc={t("ordval.medium.desc")}
          href={getLocalizedPath(PATH_ORDVAL_MEDIUM, lang)}
          bg="yellow.200"
        />
        <ModeCard
          title={t("common.hard")}
          desc={t("ordval.hard.desc")}
          href={getLocalizedPath(PATH_ORDVAL_HARD, lang)}
          bg="orange.200"
        />
        <ModeCard
          title={t("common.insane")}
          desc={t("ordval.insane.desc")}
          href={getLocalizedPath(PATH_ORDVAL_INSANE, lang)}
          bg="red.200"
        />
        <ModeCard
          title={t("ordval.unlimited")}
          desc={t("ordval.unlimited.desc")}
          href={getLocalizedPath(PATH_ORDVAL_UNLIMITED, lang)}
        />
      </SimpleGrid>
    </>
  );
}

export default OrdvalGame;

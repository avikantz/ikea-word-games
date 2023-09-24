"use client";

import { Box, SimpleGrid } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { ModeCard, PageTitle } from "@/components";
import { PageProps } from "@/interfaces/page";
import {
  getLocalizedPath,
  PATH_BILDVAL_EASY,
  PATH_BILDVAL_HARD,
  PATH_BILDVAL_INSANE,
  PATH_BILDVAL_MEDIUM,
  PATH_BILDVAL_UNLIMITED,
} from "@/utils/paths";
import { PADDING } from "@/theme";

function BildvalGame({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);

  return (
    <Box>
      <PageTitle title={t("bildval.title")} desc={t("bildval.desc")} />

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={PADDING.DEFAULT}>
        <ModeCard
          title={t("common.easy")}
          desc={t("bildval.easy.desc")}
          href={getLocalizedPath(PATH_BILDVAL_EASY, lang)}
          bg="green.100"
        />
        <ModeCard
          title={t("common.medium")}
          desc={t("bildval.medium.desc")}
          href={getLocalizedPath(PATH_BILDVAL_MEDIUM, lang)}
          bg="yellow.200"
        />
        <ModeCard
          title={t("common.hard")}
          desc={t("bildval.hard.desc")}
          href={getLocalizedPath(PATH_BILDVAL_HARD, lang)}
          bg="orange.200"
        />
        <ModeCard
          title={t("common.insane")}
          desc={t("bildval.insane.desc")}
          href={getLocalizedPath(PATH_BILDVAL_INSANE, lang)}
          bg="red.200"
        />
        <ModeCard
          title={t("bildval.unlimited")}
          desc={t("bildval.unlimited.desc")}
          href={getLocalizedPath(PATH_BILDVAL_UNLIMITED, lang)}
        />
      </SimpleGrid>
    </Box>
  );
}

export default BildvalGame;

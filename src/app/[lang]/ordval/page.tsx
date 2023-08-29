"use client";

import { Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { ModeCard } from "@/components";
import { PageProps } from "@/interfaces/page";
import {
  getLocalizedPath,
  PATH_ORDVAL_EASY,
  PATH_ORDVAL_HARD,
  PATH_ORDVAL_INSANE,
  PATH_ORDVAL_MEDIUM,
  PATH_ORDVAL_UNLIMITED,
} from "@/utils/paths";
import { GAMES } from "@/interfaces";

function OrdvalGame({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: o } = useTranslation(lang, GAMES.ORDVAL);

  return (
    <>
      <Heading textAlign="center" mb={{ base: 4, md: 8 }}>
        {o("title")}
      </Heading>

      <Text textAlign="center">{o("desc")}</Text>

      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6, xl: 8 }} py={{ base: 4, md: 8 }}>
        <ModeCard
          title={t("easy")}
          desc={o("easy.desc")}
          href={getLocalizedPath(PATH_ORDVAL_EASY, lang)}
          bg="green.100"
        />
        <ModeCard
          title={t("medium")}
          desc={o("medium.desc")}
          href={getLocalizedPath(PATH_ORDVAL_MEDIUM, lang)}
          bg="yellow.200"
        />
        <ModeCard
          title={t("hard")}
          desc={o("hard.desc")}
          href={getLocalizedPath(PATH_ORDVAL_HARD, lang)}
          bg="orange.200"
        />
        <ModeCard
          title={t("insane")}
          desc={o("insane.desc")}
          href={getLocalizedPath(PATH_ORDVAL_INSANE, lang)}
          bg="red.200"
        />
        <ModeCard
          title={o("unlimited")}
          desc={o("unlimited.desc")}
          href={getLocalizedPath(PATH_ORDVAL_UNLIMITED, lang)}
        />
      </SimpleGrid>
    </>
  );
}

export default OrdvalGame;

"use client";

import { Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { ModeCard } from "@/components";
import { PageProps } from "@/interfaces/page";
import {
  getLocalizedPath,
  PATH_BILDVAL_EASY,
  PATH_BILDVAL_HARD,
  PATH_BILDVAL_INSANE,
  PATH_BILDVAL_MEDIUM,
  PATH_BILDVAL_UNLIMITED,
} from "@/utils/paths";

function BildvalGame({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: b } = useTranslation(lang, "bildval");

  return (
    <>
      <Heading textAlign="center" mb={{ base: 4, md: 8 }}>
        {b("title")}
      </Heading>

      <Text textAlign="center">{b("desc")}</Text>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }} py={{ base: 4, md: 8 }}>
        <ModeCard
          title={t("easy")}
          desc={b("easy.desc")}
          href={getLocalizedPath(PATH_BILDVAL_EASY, lang)}
          bg="green.100"
        />
        <ModeCard
          title={t("medium")}
          desc={b("medium.desc")}
          href={getLocalizedPath(PATH_BILDVAL_MEDIUM, lang)}
          bg="yellow.200"
        />
        <ModeCard
          title={t("hard")}
          desc={b("hard.desc")}
          href={getLocalizedPath(PATH_BILDVAL_HARD, lang)}
          bg="orange.200"
        />
        <ModeCard
          title={t("insane")}
          desc={b("insane.desc")}
          href={getLocalizedPath(PATH_BILDVAL_INSANE, lang)}
          bg="red.200"
        />
        <ModeCard
          title={b("unlimited")}
          desc={b("unlimited.desc")}
          href={getLocalizedPath(PATH_BILDVAL_UNLIMITED, lang)}
        />
      </SimpleGrid>
    </>
  );
}

export default BildvalGame;

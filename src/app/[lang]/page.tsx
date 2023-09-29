"use client";

import { Box, Center, Container, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { getLocalizedPath, PATH_BILDVAL, PATH_JUMBLE, PATH_ORDVAL, PATH_VADARJAG } from "@/utils/paths";
import { ModeCard, PageTitle } from "@/components";
import { PageProps } from "@/interfaces/page";
import { PADDING } from "@/theme";

export default function Home({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);

  return (
    <main>
      <Box minH="100vh">
        <Container py={PADDING.DEFAULT} h="full" maxW="container.xl">
          <PageTitle title={t("common.title")} desc={t("common.desc")} />

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={PADDING.DEFAULT}>
            <ModeCard title={t("bildval.title")} desc={t("bildval.desc")} href={getLocalizedPath(PATH_BILDVAL, lang)} />
            <ModeCard title={t("ordval.title")} desc={t("ordval.desc")} href={getLocalizedPath(PATH_ORDVAL, lang)} />
            <ModeCard title={t("jumble.title")} desc={t("jumble.desc")} href={getLocalizedPath(PATH_JUMBLE, lang)} />
            <ModeCard
              title={t("vadarjag.title")}
              desc={t("vadarjag.desc")}
              buttonTitle={t("vadarjag.cta")}
              href={getLocalizedPath(PATH_VADARJAG, lang)}
            />
            <ModeCard
              title="IKEADle"
              desc={t("common.ikeadle.desc", { link: "ikeadle.com" })}
              href="https://ikeadle.com/"
            />
          </SimpleGrid>
        </Container>
      </Box>
    </main>
  );
}

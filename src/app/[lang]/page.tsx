"use client";

import { Box, Container, Image, SimpleGrid } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { getLocalizedPath, PATH_BILDVAL, PATH_JUMBLE, PATH_ORDVAL, PATH_VADARJAG } from "@/utils/paths";
import { ModeCard, PageTitle } from "@/components";
import { PageProps } from "@/interfaces/page";
import { GAMES } from "@/interfaces";
import { PADDING } from "@/theme";

export default function Home({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: j } = useTranslation(lang, GAMES.JUMBLE);
  const { t: b } = useTranslation(lang, GAMES.BILDVAL);
  const { t: o } = useTranslation(lang, GAMES.ORDVAL);
  const { t: v } = useTranslation(lang, GAMES.VADARJAG);

  return (
    <main>
      <Box minH="100vh">
        <Container py={PADDING.DEFAULT} h="full" maxW="container.xl">
          <PageTitle title={t("title")} desc={t("desc")}>
            <Image src="/assets/logo.svg" alt="Ordspel logo" h="16" />
          </PageTitle>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={PADDING.DEFAULT}>
            <ModeCard title={b("title")} desc={b("desc")} href={getLocalizedPath(PATH_BILDVAL, lang)} />
            <ModeCard title={o("title")} desc={o("desc")} href={getLocalizedPath(PATH_ORDVAL, lang)} />
            <ModeCard title={j("title")} desc={j("desc")} href={getLocalizedPath(PATH_JUMBLE, lang)} />
            <ModeCard
              title={v("title")}
              desc={v("desc")}
              buttonTitle={v("cta")}
              href={getLocalizedPath(PATH_VADARJAG, lang)}
            />
            {/* <ModeCard title="Wordle" isDisabled desc="Coming soon!" /> */}
          </SimpleGrid>
        </Container>
      </Box>
    </main>
  );
}

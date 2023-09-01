"use client";

import { Box, Container, Heading, Image, SimpleGrid, Stack, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { getLocalizedPath, PATH_BILDVAL, PATH_JUMBLE, PATH_ORDVAL, PATH_VADARJAG } from "@/utils/paths";
import { ModeCard } from "@/components";
import { PageProps } from "@/interfaces/page";
import { GAMES } from "@/interfaces";

export default function Home({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: j } = useTranslation(lang, GAMES.JUMBLE);
  const { t: b } = useTranslation(lang, GAMES.BILDVAL);
  const { t: o } = useTranslation(lang, GAMES.ORDVAL);
  const { t: v } = useTranslation(lang, GAMES.VADARJAG);

  return (
    <main>
      <Box minH="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
          <Stack
            direction={{ base: "column", md: "row" }}
            justifyContent="center"
            alignItems="center"
            mb={{ base: 4, md: 8 }}
          >
            <Image src="/assets/logo_wide.svg" alt="Ordspel logo" h="16" />
            <Heading fontSize={{ base: "2xl", md: "4xl" }} textAlign="center">
              {t("title")}
            </Heading>
          </Stack>

          <Text textAlign="center">{t("desc")}</Text>

          <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={{ base: 4, md: 6, xl: 8 }} py={{ base: 4, md: 8 }}>
            <ModeCard title={j("title")} desc={j("desc")} href={getLocalizedPath(PATH_JUMBLE, lang)} />
            <ModeCard title={b("title")} desc={b("desc")} href={getLocalizedPath(PATH_BILDVAL, lang)} />
            <ModeCard title={o("title")} desc={o("desc")} href={getLocalizedPath(PATH_ORDVAL, lang)} />
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

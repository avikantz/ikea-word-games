"use client";

import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { getLocalizedPath, PATH_BILDVAL, PATH_JUMBLE } from "@/utils/paths";
import { ModeCard } from "@/components";
import { PageProps } from "@/interfaces/page";

export default function Home({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: j } = useTranslation(lang, "jumble");
  const { t: b } = useTranslation(lang, "bildval");

  return (
    <main>
      <Box h="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
          <Heading textAlign="center" mb={{ base: 4, md: 8 }}>
            {t("title")}
          </Heading>

          <Text textAlign="center">{t("desc")}</Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }} py={{ base: 4, md: 8 }}>
            <ModeCard title={j("title")} desc={j("desc")} href={getLocalizedPath(PATH_JUMBLE, lang)} />
            <ModeCard title={b("title")} desc={b("desc")} href={getLocalizedPath(PATH_BILDVAL, lang)} />
            <ModeCard title="Wordle" isDisabled desc="Coming soon!" />
          </SimpleGrid>
        </Container>
      </Box>
    </main>
  );
}

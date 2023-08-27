"use client";

import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PATH_BILDVAL, PATH_JUMBLE } from "@/utils/paths";
import { ModeCard } from "@/components";

export default function Home({ params: { lang } }: { params: { lang: string } }) {
  const { t } = useTranslation(lang);
  const { t: j } = useTranslation(lang, "jumble");

  return (
    <main>
      <Box h="100vh">
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.xl">
          <Heading textAlign="center" mb={{ base: 4, md: 8 }}>
            {t("title")}
          </Heading>

          <Text textAlign="center">{t("desc")}</Text>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }} py={{ base: 4, md: 8 }}>
            <ModeCard title={j("title")} desc={j("desc")} href={PATH_JUMBLE} />
            <ModeCard title="Bildval" desc="Guess what picture matches the given product name." href={PATH_BILDVAL} />
            <ModeCard title="Scrabble" isDisabled desc="Coming soon!" />
          </SimpleGrid>
        </Container>
      </Box>
    </main>
  );
}

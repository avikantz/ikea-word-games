"use client";

import { Box, Container, Divider, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { PageProps } from "@/interfaces/page";
import { Trans } from "react-i18next";
import { PATH_AVIKANTZ, PATH_IKEA_NAGASANDRA, PATH_RITVISHREE } from "@/utils/paths";
import { SocialShareButtons } from "@/components/socialShares";
import { BuyMeACoffeeButton } from "@/components/coffeeButton";
import { PADDING } from "@/theme/index";

export default function About({ params: { lang } }: PageProps) {
  const { t } = useTranslation(lang);
  const { t: a } = useTranslation(lang, "about");

  return (
    <main>
      <Box>
        <Container py={{ base: 4, md: 12 }} h="full" maxW="container.sm">
          <Heading textAlign="center" mb={{ base: 8, md: 16 }}>
            {t("about")}
          </Heading>

          <VStack
            w="full"
            alignItems="center"
            spacing={PADDING.DEFAULT}
            textAlign="center"
            color="gray.500"
            fontWeight="medium"
          >
            <Text>
              <Trans
                i18nKey="about:about.1"
                components={{
                  a: <Link href={PATH_AVIKANTZ} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about:about.2"
                components={{
                  a: <Link href={PATH_RITVISHREE} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>
            <Text>
              <Trans
                i18nKey="about:about.3"
                components={{
                  a: <Link href={PATH_IKEA_NAGASANDRA} target="_blank" rel="noopener" color="blue.500" />,
                }}
              />
            </Text>

            <Divider />

            <SocialShareButtons bgColor="#FFFEFB" iconColor="#111111" />

            <BuyMeACoffeeButton />

            <Divider />

            <Text>{a("about.credits")}</Text>

            <HStack
              flexWrap="wrap"
              spacing="0"
              gap="2"
              divider={<Text color="gray.500">•</Text>}
              justifyContent="center"
              color="blue.500"
            >
              <Link href="https://nextjs.org" target="_blank" rel="noopener">
                Next.js
              </Link>
              <Link href="https://vercel.com" target="_blank" rel="noopener">
                Vercel
              </Link>
              <Link href="https://chakra-ui.com" target="_blank" rel="noopener">
                Chakra UI
              </Link>
              <Link href="https://www.framer.com/motion/" target="_blank" rel="noopener">
                Framer Motion
              </Link>
              <Link href="https://tanstack.com/query/latest" target="_blank" rel="noopener">
                Tanstack Query
              </Link>
              <Link href="https://www.i18next.com" target="_blank" rel="noopener">
                i18next
              </Link>
              <Link href="https://mixkit.co/free-sound-effects/game/" target="_blank" rel="noopener">
                Mixkit
              </Link>
              <Link href="https://github.com/nygardk/react-share" target="_blank" rel="noopener">
                React Share
              </Link>
              <Link href="https://github.com/herrethan/react-confetti-explosion" target="_blank" rel="noopener">
                React Confetti Explosion
              </Link>
              <Link href="https://github.com/hodgef/react-simple-keyboard" target="_blank" rel="noopener">
                React Simple Keyboard
              </Link>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </main>
  );
}

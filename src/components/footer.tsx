"use client";

import React, { ChangeEvent } from "react";
import { Box, Center, Container, IconButton, Image, Link, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import NextLink from "next/link";

import { useTranslation } from "@/app/i18n/client";
import { LANGUAGE_LIST } from "@/app/i18n/settings";
import { getLocalizedPath, PATH_ABOUT, PATH_FAQ } from "@/utils/paths";
import { useAudio } from "@/hooks/useAudio";
import { PADDING } from "@/theme";
import { SocialShareButtons } from "./socialShares";
import { BuyMeACoffeeButton } from "./coffeeButton";
import { clearAllLocalesDataExcept } from "@/utils/storage";

interface FooterProps {
  lang: string;
}

export const Footer = ({ lang }: FooterProps) => {
  const { t } = useTranslation();

  const { isMuted, muteAudio, unmuteAudio } = useAudio();

  const pathname = usePathname();

  const onChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    clearAllLocalesDataExcept(locale);
    window.location.replace(pathname.replace(`/${lang}`, `/${locale}`));
  };

  return (
    <Box as="footer">
      <Box bg="blue.700" color="white" py={{ base: 6, md: 12 }}>
        <Container
          as={Stack}
          direction={{ base: "column", md: "row" }}
          maxW="container.xl"
          spacing="4"
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems="center"
        >
          {/* Footer links */}
          <Link as={NextLink} href={`/${lang}`}>
            <Stack direction={{ base: "column", md: "row" }} alignItems="center">
              <Image src="/assets/logo.svg" alt="Ordspel logo" h="16" w="auto" />
              <Text>{t("common.play")}</Text>
            </Stack>
          </Link>

          <Link as={NextLink} href={getLocalizedPath(PATH_FAQ, lang)}>
            {t("common.faq")}
          </Link>
          <Link as={NextLink} href={getLocalizedPath(PATH_ABOUT, lang)}>
            {t("common.about")}
          </Link>

          <Spacer />

          <IconButton
            size="sm"
            variant="outline"
            borderColor="gray.200"
            _hover={{ bg: "transparent", opacity: 0.5 }}
            aria-label={isMuted ? t("common.unmute") : t("common.mute")}
            onClick={isMuted ? unmuteAudio : muteAudio}
            icon={<Text>{isMuted ? "🔇" : "🔊"}</Text>}
          />

          {/* Language switcher */}
          <Select
            maxW="48"
            size="sm"
            aria-label={t("common.select_locale")}
            defaultValue={lang}
            onChange={onChangeLanguage}
          >
            {LANGUAGE_LIST.map(({ label, emoji, value }) => (
              <option key={value} value={value} label={`${emoji} ${label}`}>
                {emoji} {label}
              </option>
            ))}
          </Select>
        </Container>
      </Box>

      {!pathname.endsWith(PATH_ABOUT) && (
        <Center py={PADDING.DEFAULT} bg="yellow.300" color="black" flexDirection="column" gap={PADDING.SM}>
          <SocialShareButtons />

          <BuyMeACoffeeButton bg="blue.700" color="white" />
        </Center>
      )}
    </Box>
  );
};

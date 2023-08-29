"use client";

import React, { ChangeEvent } from "react";
import { Box, Center, Container, Link, Select, Spacer, Stack, Text } from "@chakra-ui/react";
import { useRouter, usePathname } from "next/navigation";
import NextLink from "next/link";

import { useTranslation } from "@/app/i18n/client";
import { LANGUAGE_LIST } from "@/app/i18n/settings";

interface FooterProps {
  lang: string;
}

export const Footer = ({ lang }: FooterProps) => {
  const { t } = useTranslation();

  const pathname = usePathname();
  const router = useRouter();

  const onChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    router.replace(pathname.replace(`/${lang}`, `/${locale}`));
  };

  return (
    <Box as="footer">
      <Box bg="blue.700" color="white" py={{ base: 6, md: 12 }}>
        {/* <Logo /> */}

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
            {t("home")}
          </Link>
          <Link>{t("faq")}</Link>
          <Link>{t("about")}</Link>
          <Link>{t("contact")}</Link>

          <Spacer />

          {/* Language switcher */}
          <Select maxW="32" size="sm" defaultValue={lang} onChange={onChangeLanguage}>
            {LANGUAGE_LIST.map(({ label, emoji, value }) => (
              <option key={value} value={value}>
                {emoji} {label}
              </option>
            ))}
          </Select>
        </Container>
      </Box>

      <Center py={{ base: 6, md: 12 }} bg="yellow.300" color="black">
        <Text fontSize="lg" textAlign="center" fontWeight="semibold">
          {t("title")}
        </Text>
      </Center>
    </Box>
  );
};
"use client";

import React, { ChangeEvent } from "react";
import { Box, Center, Container, Select } from "@chakra-ui/react";
import { languages } from "@/app/i18n/settings";
import { useRouter } from "next/navigation";

interface FooterProps {
  lang: string;
}

export const Footer = ({ lang }: FooterProps) => {
  const router = useRouter();

  const onChangeLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    const locale = event.target.value;
    router.replace(`/${locale}`);
  };

  return (
    <Box as="footer" bg="black" color="white" py={{ base: 4, md: 8 }}>
      <Container maxW="container.lg" alignItems="center">
        <Center>
          <Select maxW="32" size="sm" defaultValue={lang} onChange={onChangeLanguage}>
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </Select>
        </Center>
      </Container>
    </Box>
  );
};

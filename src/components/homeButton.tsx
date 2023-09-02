"use client";

import React from "react";
import { IconButton, IconButtonProps, Image } from "@chakra-ui/react";

import { useTranslation } from "@/app/i18n/client";
import { usePathname, useRouter } from "next/navigation";
import { PADDING } from "@/theme";

interface HomeButtonProps extends Omit<IconButtonProps, "aria-label"> {
  lang: string;
}

export const HomeButton = ({ lang, ...props }: HomeButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  // Don't render on homepage
  if (pathname.split("/").length <= 2) return null;

  return (
    <IconButton
      aria-label={t("home")}
      position={{ base: "absolute", xl: "fixed" }}
      top={PADDING.DEFAULT}
      left={PADDING.DEFAULT}
      size="lg"
      icon={<Image src="/assets/logo.svg" w="12" h="12" rounded="full" alt={t("title")} />}
      onClick={() => router.push(`/${lang}`)}
      variant="unstyled"
      _hover={{ opacity: 0.5 }}
      {...props}
    />
  );
};

"use client";

import { useTranslation } from "@/app/i18n/client";
import { Button, ButtonProps } from "@chakra-ui/react";

export const BuyMeACoffeeButton = (props: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <Button
      as="a"
      href="https://buymeacoffee.com/avikantz"
      target="_blank"
      bg="yellow.300"
      color="black"
      _hover={{ bg: "yellow.600", color: "black" }}
      {...props}
    >
      ☕️ {t("buy_me_a_coffee")}
    </Button>
  );
};

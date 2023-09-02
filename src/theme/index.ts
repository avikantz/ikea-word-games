// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

import { Badge } from "./badge";
import { Button } from "./button";
import { Card } from "./card";
import { Input } from "./input";
import { Modal } from "./modal";
import { Select } from "./select";
import { Skeleton } from "./skeleton";
import { Tag } from "./tag";

export const CONFETTI_COLORS = ["#FFDB00", "#008AFF", "#111111"];

export const PADDING = {
  DEFAULT: { base: 4, md: 6, xl: 8 },
  LG: { base: 6, md: 8 },
};

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  fonts: {
    heading:
      '"Open Sans Variable", --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif',
    body: '"Open Sans Variable", --apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, sans-serif',
  },
  colors: {
    black: "#111111",
    white: "#FFFEFB",
    yellow: {
      "50": "#FFFBE5",
      "100": "#FFF5B8",
      "200": "#FFEE8A",
      "300": "#FFE85C",
      "400": "#FFE12E",
      "500": "#FFDB00",
      "600": "#CCAF00",
      "700": "#998300",
      "800": "#665800",
      "900": "#332C00",
    },
    blue: {
      "50": "#E5F3FF",
      "100": "#B8DEFF",
      "200": "#8AC9FF",
      "300": "#5CB4FF",
      "400": "#2E9FFF",
      "500": "#008AFF",
      "600": "#006ECC",
      "700": "#005399",
      "800": "#003766",
      "900": "#001C33",
    },
    gray: {
      "50": "#F2F2F2",
      "100": "#DBDBDB",
      "200": "#C4C4C4",
      "300": "#ADADAD",
      "400": "#969696",
      "500": "#808080",
      "600": "#666666",
      "700": "#4D4D4D",
      "800": "#333333",
      "900": "#1A1A1A",
    },
  },
  shadows: {
    red: "0 0 0 1px #E53E3E",
    "red-md": "0 0 0 2px #E53E3E",
    "red-xl": "0 0 0 5px #E53E3E",
    green: "0 0 0 1px #38A169",
    "green-md": "0 0 0 2px #38A169",
    "green-xl": "0 0 0 5px #38A169",
    blue: "0 0 0 2px #008AFF",
    "blue-md": "0 0 0 3px #008AFF",
    "blue-xl": "0 0 0 6px #008AFF",
  },
  components: {
    Badge,
    Button,
    Card,
    Input,
    Modal,
    Select,
    Skeleton,
    Tag,
  },
});

export default theme;

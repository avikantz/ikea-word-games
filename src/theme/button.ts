import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: "wider",
    cursor: "pointer",
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: {
      colorScheme: "yellow",
      color: "blue.500",
      backgroundColor: "yellow.500",
      _hover: {
        color: "yellow.500",
        backgroundColor: "blue.500",
      },
    },
    outline: {
      px: 8,
      _hover: {
        color: "yellow.500",
        backgroundColor: "blue.500",
        borderColor: "blue.500",
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    colorScheme: "blue",
  },
};

import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: {
      colorScheme: "black",
      color: "white",
      backgroundColor: "black",
      textTransform: "uppercase",
      letterSpacing: "wide",
      borderRadius: 0,
      _hover: {
        opacity: 0.4,
        backgroundColor: "black",
      },
      _active: {
        opacity: 0.6,
        backgroundColor: "black",
      },
    },
    outline: {
      px: 8,
      colorScheme: "black",
      borderColor: "black",
      color: "black",
      backgroundColor: "transparent",
      textTransform: "uppercase",
      letterSpacing: "wider",
      _hover: {
        color: "white",
        backgroundColor: "black",
        borderColor: "black",
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    colorScheme: "black",
  },
};

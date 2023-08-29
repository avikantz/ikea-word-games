import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    fontWeight: "bold",
    cursor: "pointer",
    borderRadius: "full",
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    solid: {
      colorScheme: "black",
      color: "white",
      backgroundColor: "black",
      _hover: {
        opacity: 0.4,
        backgroundColor: "black",
      },
      _active: {
        opacity: 0.6,
        backgroundColor: "black",
        boxShadow: "blue",
      },
      _focus: {
        boxShadow: "blue",
      },
    },
    outline: {
      px: 6,
      colorScheme: "black",
      borderColor: "black",
      borderWidth: 1.5,
      color: "black",
      backgroundColor: "transparent",
      _hover: {
        color: "white",
        backgroundColor: "black",
        borderColor: "black",
      },
      _focus: {
        boxShadow: "blue",
      },
      _active: {
        boxShadow: "blue",
      },
      _disabled: {
        _hover: {
          color: "black",
        },
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {
    colorScheme: "black",
  },
};

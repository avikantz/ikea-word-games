import { ComponentStyleConfig } from "@chakra-ui/react";

export const Modal: ComponentStyleConfig = {
  // style object for base or default style
  baseStyle: {
    dialog: {
      borderRadius: 0,
      border: "8px solid",
      borderColor: "blue.700",
    },
    header: {
      py: { base: 4, md: 8 },
      marginBottom: { base: 4, md: 8 },
      backgroundColor: "blue.700",
      color: "white",
    },
    closeButton: {
      color: "white",
      borderRadius: 0,
      top: 0,
      right: 0,
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  // variants: {},
  // default values
  // defaultProps: {},
};

import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["field"]);

export const Select = helpers.defineMultiStyleConfig({
  // style object for base or default style
  baseStyle: {
    field: {
      borderRadius: "full",
      cursor: "pointer",
      _hover: {
        opacity: 0.6,
      }
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  // variants: {},
  // default values
  // defaultProps: {},
});

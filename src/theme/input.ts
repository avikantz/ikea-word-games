import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["addon", "field"]);

export const Input = helpers.defineMultiStyleConfig({
  // style object for base or default style
  baseStyle: {
    addon: {
      borderRadius: 0,
    },
    field: {
      borderRadius: 0,
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  // variants: {},
  // default values
  // defaultProps: {},
});

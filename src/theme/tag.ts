import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["container"]);

export const Tag = helpers.defineMultiStyleConfig({
  // style object for base or default style
  baseStyle: {
    container: {
      borderRadius: 0,
      px: { base: 3, md: 4 },
      py: { base: 2, md: 3 },
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  // sizes: {},
  // styles for different visual variants ("outline", "solid")
  // variants: {},
  // default values
  // defaultProps: {},
});

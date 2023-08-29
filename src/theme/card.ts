import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["container"]);

export const Card = helpers.defineMultiStyleConfig({
  // style object for base or default style
  baseStyle: {
    container: {
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

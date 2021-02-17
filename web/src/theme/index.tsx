// theme.js
import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
// Global style overrides
import styles from "./styles";
import textStyles from "./textStyle";
import layerStyles from './layerStyle';
// Foundational style overrides
//import borders from "./foundations/borders"
// Component style overrides
//import Button from "./components/button"
const overrides = {
  styles,
  colors,
  textStyles,
  layerStyles,
  // borders,
  // Other foundational style overrides go here
  // components: {
  //   Button,
  //   // Other components go here
  // },
};
export default extendTheme(overrides);

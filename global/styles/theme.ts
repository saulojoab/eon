import { responsive } from "../utils/responsive";
import { ThemeSizes } from "./styled";

function getResponsiveSizes(
  isFont: boolean,
  isIcon: boolean,
  theme: ThemeSizes
) {
  return {
    small: responsive(theme.small, isFont, isIcon),
    medium: responsive(theme.medium, isFont, isIcon),
    large: responsive(theme.large, isFont, isIcon),
    xlarge: responsive(theme.xlarge, isFont, isIcon),
    xxlarge: responsive(theme.xxlarge, isFont, isIcon),
  };
}

export default {
  colors: {
    primary: "#2B2D42",
    secondary: "#1D1F2A",
    background: "#0B0C10",
    accent: "#1FA1B8",
    black: "#000000",
    white: "#E5E5E5",
    gray: "#A9A9A9",
    error: "#FF4136",
    success: "#2ECC40",
  },
  shadows: {
    light: 1,
    medium: 10,
    heavy: 15,
    veryHeavy: 20,
    huge: 30,
  },
  fonts: {
    default: "Latinka Regular",
    italic: "Latinka Italic",
    black: "Latinka Black",
    blackItalic: "Latinka Black Italic",
    extraBold: "Latinka ExtraBold",
    extraBoldItalic: "Latinka ExtraBold Italic",
    bold: "Latinka Bold",
    boldItalic: "Latinka Bold Italic",
    semiBold: "Latinka SemiBold",
    semiBoldItalic: "Latinka SemiBold Italic",
    medium: "Latinka Medium",
    mediumItalic: "Latinka Medium Italic",
    light: "Latinka Light",
    lightItalic: "Latinka Light Italic",
    thin: "Latinka Thin",
    thinItalic: "Latinka Thin Italic",
  },
  layout: {
    font: getResponsiveSizes(true, false, {
      small: 10,
      medium: 12,
      large: 16,
      xlarge: 18,
      xxlarge: 20,
    }),
    header: getResponsiveSizes(true, false, {
      small: 24,
      medium: 28,
      large: 32,
      xlarge: 36,
      xxlarge: 40,
    }),
    icon: getResponsiveSizes(false, true, {
      small: 16,
      medium: 20,
      large: 24,
      xlarge: 28,
      xxlarge: 32,
    }),
    spacing: getResponsiveSizes(false, false, {
      small: 5,
      medium: 10,
      large: 15,
      xlarge: 20,
      xxlarge: 25,
    }),
  },
};

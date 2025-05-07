import "@emotion/react";
import theme from "./theme"; // Ensure this path is correct and points to the theme object

declare module "@emotion/react" {
  type ThemeType = typeof theme;
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface Theme extends ThemeType {}
  export declare function useTheme(): Theme; // Ensure the return type matches the augmented Theme interface
}

export interface ThemeSizes {
  small: number;
  medium: number;
  large: number;
  xlarge: number;
  xxlarge: number;
}

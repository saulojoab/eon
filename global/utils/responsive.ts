import { size, fontSize } from "react-native-responsive-sizes";

export function responsive(number: number, isFont: boolean, noPx?: boolean) {
  const makeResponsive = isFont ? fontSize : size;

  return makeResponsive(number) + (noPx ? "" : "px");
}

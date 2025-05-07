import { Body, Title } from "./Typography.style";
import { ITypography } from "./Typography.type";

export default function Typography({ variant, children }: ITypography) {
  if (variant === "title") {
    return <Title>{children}</Title>;
  }

  return <Body>{children}</Body>;
}

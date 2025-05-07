import styled from "@emotion/native";
import { SourceButtonProps, SourceTextProps } from "./Sources.type";
import { responsive } from "@/global/utils/responsive";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding-bottom: ${({ theme }) => theme.layout.spacing.large};
`;

export const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.layout.spacing.large};
  justify-content: space-between;
  z-index: 1;
  width: 100%;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsive(30, false)};
  height: ${responsive(30, false)};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const SourceButton = styled.TouchableOpacity<SourceButtonProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.layout.spacing.large};
  margin: ${({ theme }) => theme.layout.spacing.medium};
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.primary};
  border: ${(props) =>
    props.selected ? "none" : "1px solid " + props.theme.colors.primary};
`;

export const SourceText = styled.Text<SourceTextProps>`
  font-family: ${({ theme }) => theme.fonts.light};
  font-size: ${({ theme }) => theme.layout.font.small};
  color: ${(props) =>
    props.selected ? props.theme.colors.black : props.theme.colors.white};

  text-align: center;
`;

export const SourceList = styled.FlatList``;

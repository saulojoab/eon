import { isIos } from "@/global/utils/platformChecker";
import responsive from "@/global/utils/responsive";
import styled from "styled-components/native";
import { SourceButtonProps, SourceTextProps } from "./Sources.type";

export const Container = styled.View`
  flex: 1;
  background-color: ${(props) => props.theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`;

export const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(20)}px;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
  padding-top: ${isIos ? responsive(60) : responsive(20)}px;
`;

export const BackButton = styled.TouchableOpacity`
  width: ${responsive(30)}px;
  height: ${responsive(30)}px;
  border-radius: ${responsive(15)}px;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${(props) => props.theme.colors.white};
  font-weight: bold;
  width: 100%;
  margin-left: ${responsive(20)}px;
`;

export const SourceButton = styled.TouchableOpacity<SourceButtonProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${responsive(20)}px;
  margin: ${responsive(10)}px;
  border-radius: ${responsive(5)}px;
  background-color: ${(props) =>
    props.selected ? props.theme.colors.white : props.theme.colors.primary};
  border: ${(props) =>
    props.selected ? "none" : "1px solid " + props.theme.colors.primary};
`;

export const SourceText = styled.Text<SourceTextProps>`
  font-size: ${responsive(14)}px;
  color: ${(props) =>
    props.selected ? props.theme.colors.black : props.theme.colors.white};
  font-weight: bold;
  text-align: center;
`;

export const SourceList = styled.FlatList``;

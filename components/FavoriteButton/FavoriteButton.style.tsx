import responsive from "@/global/utils/responsive";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${responsive(10)}px;
`;

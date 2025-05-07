import styled from "@emotion/native";
import { SafeAreaView } from "react-native-safe-area-context";

export const SafeArea = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

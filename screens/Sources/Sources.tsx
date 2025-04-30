import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useSourceService } from "./Sources.service";

import {
  TitleAndBackButtonSection,
  BackButton,
  Title,
  SourceList,
  SourceButton,
  SourceText,
  Container,
} from "./Sources.styles";
import { providers } from "@/global/utils/providers";

export default function Sources() {
  const theme = useTheme();
  const { goBack, handleSelectSource, selectedProviders } = useSourceService();

  return (
    <Container>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={goBack}>
          <Icon size={30} color={theme.colors.white} name="arrow-left" />
        </BackButton>
        <Title>Choose the source</Title>
      </TitleAndBackButtonSection>

      <SourceList
        data={providers}
        renderItem={({ item }: any) => (
          <SourceButton
            selected={selectedProviders.some(
              (provider) => provider.name === item.name
            )}
            onPress={() => handleSelectSource(item.name)}
          >
            <SourceText
              selected={selectedProviders.some(
                (provider) => provider.name === item.name
              )}
            >
              {item.name}
            </SourceText>
          </SourceButton>
        )}
        keyExtractor={(item: any) => item.name}
        numColumns={3}
      />
    </Container>
  );
}

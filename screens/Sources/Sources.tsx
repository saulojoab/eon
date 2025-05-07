import React from "react";
import { StatusBar } from "react-native";
import { useTheme } from "@emotion/react";
import { FontAwesome5 as Icon } from "@expo/vector-icons";
import { useSourceService } from "./Sources.service";

import {
  TitleAndBackButtonSection,
  BackButton,
  SourceList,
  SourceButton,
  SourceText,
  Container,
} from "./Sources.styles";
import { providers } from "@/global/utils/providers";
import Typography from "@/components/Typography/Typography";

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
          <Icon
            size={+theme.layout.icon.xxlarge}
            color={theme.colors.white}
            name="arrow-left"
          />
        </BackButton>
        <Typography variant="title">Choose the source</Typography>
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

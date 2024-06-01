import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { sources } from '@/global/utils/sources';
import { useSourceService } from './Sources.service';

import {
  TitleAndBackButtonSection,
  BackButton,
  Title,
  SourceList,
  SourceButton,
  SourceText,
  Container,
} from './Sources.styles';

export default function Sources() {
  const theme = useTheme();
  const { goBack, handleSelectSource, selectedSource } = useSourceService();

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={goBack}>
          <Icon size={30} color={theme.colors.white} name="arrow-left" />
        </BackButton>
        <Title>Choose the source</Title>
      </TitleAndBackButtonSection>

      <SourceList
        data={sources}
        renderItem={({ item }: any) => (
          <SourceButton
            selected={selectedSource === item.value}
            onPress={() => handleSelectSource(item.value)}
          >
            <SourceText selected={selectedSource === item.value}>
              {item.name}
              {`\n(${item.language})`}
            </SourceText>
          </SourceButton>
        )}
        keyExtractor={(item: any) => item.value}
        numColumns={3}
      />
    </Container>
  );
}

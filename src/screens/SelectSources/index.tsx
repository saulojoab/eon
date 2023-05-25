import React from 'react';
import { StatusBar } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { useNavigation } from '@react-navigation/core';
import { type NativeStackNavigationProp } from '@react-navigation/native-stack';
import responsive from '@/global/utils/responsive';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { updateSource } from '@/redux/features/mangaSlice';

interface Source {
  name: string;
  value: string;
}

export default function SelectSources() {
  const theme = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const selectedSource = useAppSelector(state => state.manga.selectedSource);
  const dispatch = useAppDispatch();

  // sources: mangahere, magakakalot, mangadex, mangapark, mangapill, mangareader, mangasee123
  const sources: Source[] = [
    {
      name: 'MangaHere',
      value: 'mangahere',
    },
    {
      name: 'MangaKakalot',
      value: 'mangakakalot',
    },
    {
      name: 'MangaDex',
      value: 'mangadex',
    },
    {
      name: 'MangaPark',
      value: 'mangapark',
    },
    {
      name: 'MangaPill',
      value: 'mangapill',
    },
    {
      name: 'MangaReader',
      value: 'mangareader',
    },
    {
      name: 'MangaSee123',
      value: 'mangasee123',
    },
  ];

  function handleSelectSource(source: string) {
    dispatch(updateSource(source));
  }

  return (
    <Container>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={theme.colors.primary}
      />

      <TitleAndBackButtonSection>
        <BackButton onPress={() => navigation.goBack()}>
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
            </SourceText>
          </SourceButton>
        )}
        keyExtractor={(item: any) => item.value}
        numColumns={3}
      />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
  padding-bottom: ${responsive(20)}px;
`;

const TitleAndBackButtonSection = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${responsive(20)}px;
  justify-content: space-between;
  z-index: 1;
  width: 100%;
`;

const BackButton = styled.TouchableOpacity`
  width: ${responsive(30)}px;
  height: ${responsive(30)}px;
  border-radius: ${responsive(15)}px;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: ${responsive(20)}px;
  color: ${props => props.theme.colors.white};
  font-weight: bold;
  width: 100%;
  margin-left: ${responsive(20)}px;
`;

interface SourceButtonProps {
  selected?: boolean;
}

const SourceButton = styled.TouchableOpacity<SourceButtonProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${responsive(10)}px;
  margin: ${responsive(10)}px;
  border-radius: ${responsive(5)}px;
  background-color: ${props =>
    props.selected ? props.theme.colors.white : props.theme.colors.primary};
  border: ${props =>
    props.selected ? 'none' : '1px solid ' + props.theme.colors.primary};
`;

interface SourceTextProps {
  selected?: boolean;
}

const SourceText = styled.Text<SourceTextProps>`
  font-size: ${responsive(14)}px;
  color: ${props =>
    props.selected ? props.theme.colors.black : props.theme.colors.white};
  font-weight: bold;
`;

const SourceList = styled.FlatList``;

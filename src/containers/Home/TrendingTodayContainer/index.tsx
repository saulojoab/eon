import responsive from '@/global/utils/responsive';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function TrendingTodayContainer() {
  const theme = useTheme();

  return (
    <TrendingTodayContainerView>
      <TrendingTodayImage
        source={{
          uri: 'https://m.media-amazon.com/images/I/91D07epNE9L.jpg',
        }}
      />
      <TrendingTodayInfoBackground
        colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.2)', 'rgba(0,0,0,0.9)']}
      >
        <TrendingTodayTag>
          <Icon
            name="star"
            solid
            size={responsive(12)}
            color={theme.colors.accent}
          />
          <TrendingTodayTagText>TRENDING TODAY</TrendingTodayTagText>
        </TrendingTodayTag>
        <TrendingTodayMangaName>Berserk</TrendingTodayMangaName>
      </TrendingTodayInfoBackground>
    </TrendingTodayContainerView>
  );
}

const TrendingTodayContainerView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${responsive(200)}px;
`;

const TrendingTodayImage = styled.Image`
  width: 100%;
  height: 100%;
`;

const TrendingTodayInfoBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${responsive(10)}px;
  position: absolute;
`;

const TrendingTodayTag = styled.View`
  height: ${responsive(30)}px;
  max-width: ${responsive(144)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  top: ${responsive(5)}px;
  flex-direction: row;
  border-radius: ${responsive(10)}px;
`;

const TrendingTodayTagText = styled.Text`
  font-size: ${responsive(12)}px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(5)}px;
`;

const TrendingTodayMangaName = styled.Text`
  font-size: ${responsive(20)}px;
  font-weight: 200;
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(5)}px;
  bottom: ${responsive(10)}px;
  right: ${responsive(10)}px;
  position: absolute;
`;

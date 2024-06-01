import responsive from '@/global/utils/responsive';
import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export const TrendingTodayContainerView = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: ${responsive(250)}px;
`;

export const TrendingTodayImage = styled.Image`
  width: 100%;
  height: 100%;
`;

export const TrendingTodayInfoBackground = styled(LinearGradient)`
  width: 100%;
  height: 100%;
  padding: ${responsive(10)}px;
  position: absolute;
`;

export const TrendingTodayTag = styled.View`
  height: ${responsive(30)}px;
  max-width: ${responsive(144)}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.black};
  top: ${responsive(5)}px;
  flex-direction: row;
  border-radius: ${responsive(10)}px;
`;

export const TrendingTodayTagText = styled.Text`
  font-size: ${responsive(12)}px;
  font-family: ${({ theme }) => theme.fonts.black};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(5)}px;
`;

export const TrendingTodayMangaName = styled.Text`
  font-size: ${responsive(30)}px;
  font-family: ${({ theme }) => theme.fonts.lightItalic};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(5)}px;
  bottom: ${responsive(10)}px;
  right: ${responsive(10)}px;
  position: absolute;
`;

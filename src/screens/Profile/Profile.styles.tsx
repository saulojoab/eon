import { isIos } from '@/global/utils/platformChecker';
import responsive from '@/global/utils/responsive';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: ${responsive(30)}px;
  padding-top: ${isIos ? responsive(60) : responsive(30)}px;
`;

export const ProfileAndNameContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${responsive(20)}px;
`;

export const ProfileImage = styled.Image`
  width: ${responsive(100)}px;
  height: ${responsive(100)}px;
  border-radius: ${responsive(50)}px;
`;

export const ProfileName = styled.Text`
  font-size: ${responsive(30)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(20)}px;
`;

export const Separator = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${responsive(20)}px;
`;

export const MadeWithLoveContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: ${responsive(20)}px;
  position: absolute;
  bottom: ${responsive(20)}px;
  left: 0;
  right: 0;
`;

export const MadeWithLoveText = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const MadeWithLoveIcon = styled(Icon)`
  margin-left: ${responsive(5)}px;
  margin-right: ${responsive(5)}px;
`;

export const ProfileAndDateContainer = styled.View`
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

export const DateText = styled.Text`
  font-size: ${responsive(14)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(20)}px;
`;

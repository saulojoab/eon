import responsive from '@/global/utils/responsive';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const ProfileOptionContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${responsive(20)}px;
`;

export const ProfileOptionIconContainer = styled.View`
  width: ${responsive(50)}px;
  height: ${responsive(50)}px;
  border-radius: ${responsive(25)}px;
  background-color: ${({ theme }) => theme.colors.secondary};
  justify-content: center;
  align-items: center;
  margin-right: ${responsive(10)}px;
`;

export const ProfileOptionText = styled.Text`
  font-size: ${responsive(20)}px;
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
`;

export const ProfileOptionIndicatorIcon = styled(Icon)`
  margin-left: auto;
  margin-right: ${responsive(10)}px;
`;

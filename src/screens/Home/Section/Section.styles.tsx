import responsive from '@/global/utils/responsive';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${responsive(50)}px;
  padding-left: ${responsive(10)}px;
  margin-top: ${responsive(5)}px;
`;

export const SectionTitle = styled.Text`
  font-size: ${responsive(16)}px;
  font-family: ${({ theme }) => theme.fonts.extraBold};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(10)}px;
`;

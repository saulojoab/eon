import React from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import responsive from '@/global/utils/responsive';
import { useTheme } from 'styled-components';

interface SectionContainerProps {
  title: string;
  icon: string;
}

export default function SectionContainer({
  title,
  icon,
}: SectionContainerProps) {
  const theme = useTheme();

  return (
    <Container>
      <Icon name={icon} size={responsive(22)} color={theme.colors.accent} />
      <SectionTitle>{title}</SectionTitle>
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: ${responsive(50)}px;
  padding-left: ${responsive(10)}px;
  margin-top: ${responsive(5)}px;
`;

const SectionTitle = styled.Text`
  font-size: ${responsive(16)}px;
  font-family: ${({ theme }) => theme.fonts.extraBold};
  color: ${({ theme }) => theme.colors.white};
  margin-left: ${responsive(10)}px;
`;

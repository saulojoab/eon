import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import responsive from '@/global/utils/responsive';
import { useTheme } from 'styled-components';
import { SectionContainerProps } from './Section.type';

import { Container, SectionTitle } from './Section.styles';

export default function Section({ title, icon }: SectionContainerProps) {
  const theme = useTheme();

  return (
    <Container>
      <Icon name={icon} size={responsive(22)} color={theme.colors.accent} />
      <SectionTitle>{title}</SectionTitle>
    </Container>
  );
}

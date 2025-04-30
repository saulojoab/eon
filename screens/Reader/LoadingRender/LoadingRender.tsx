import React from 'react';
import { useTheme } from 'styled-components/native';
import { LoadingSpinner } from './LoadingRender.styles';

export default function LoadingRender() {
  const theme = useTheme();
  return <LoadingSpinner size="large" color={theme.colors.white} />;
}

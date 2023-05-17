import React from 'react'
import { useTheme } from 'styled-components/native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import responsive from '@/global/utils/responsive'

interface FavoriteButtonProps {
  isFavorite: boolean
  onPress: () => void
  style?: any
}

export default function FavoriteButton({
  isFavorite,
  onPress,
  style,
}: FavoriteButtonProps) {
  const theme = useTheme()

  return (
    <Container style={style} onPress={onPress}>
      <Icon
        light={!isFavorite}
        solid={isFavorite}
        name="heart"
        color={isFavorite ? theme.colors.accent : theme.colors.white}
        size={responsive(20)}
      />
    </Container>
  )
}

const Container = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: ${responsive(10)}px;
`

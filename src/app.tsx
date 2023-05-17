import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import MainAppNavigator from '@/navigation/main'
import theme from '@/global/styles/theme'
import { ThemeProvider } from 'styled-components'
import { StatusBar } from 'react-native'

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <StatusBar barStyle="light-content" />
        <MainAppNavigator />
      </ThemeProvider>
    </NavigationContainer>
  )
}

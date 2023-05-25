import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainAppNavigator from '@/navigation/main';
import theme from '@/global/styles/theme';
import { ThemeProvider } from 'styled-components';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/redux/store';

export default function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <ThemeProvider theme={theme}>
            <StatusBar barStyle="light-content" />
            <MainAppNavigator />
          </ThemeProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

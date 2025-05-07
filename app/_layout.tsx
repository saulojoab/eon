import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

import { ThemeProvider } from "@emotion/react";
import theme from "@/global/styles/theme";
import { SafeArea } from "@/components/SafeArea/SafeArea.style";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Latinka Regular": require("../assets/fonts/Latinka Regular.ttf"),
    "Latinka Italic": require("../assets/fonts/Latinka Italic.ttf"),
    "Latinka Black": require("../assets/fonts/Latinka Black.ttf"),
    "Latinka Black Italic": require("../assets/fonts/Latinka Black Italic.ttf"),
    "Latinka ExtraBold": require("../assets/fonts/Latinka ExtraBold.ttf"),
    "Latinka ExtraBold Italic": require("../assets/fonts/Latinka ExtraBold Italic.ttf"),
    "Latinka Bold": require("../assets/fonts/Latinka Bold.ttf"),
    "Latinka Bold Italic": require("../assets/fonts/Latinka Bold Italic.ttf"),
    "Latinka SemiBold": require("../assets/fonts/Latinka SemiBold.ttf"),
    "Latinka SemiBold Italic": require("../assets/fonts/Latinka SemiBold Italic.ttf"),
    "Latinka Medium": require("../assets/fonts/Latinka Medium.ttf"),
    "Latinka Medium Italic": require("../assets/fonts/Latinka Medium Italic.ttf"),
    "Latinka Light": require("../assets/fonts/Latinka Light.ttf"),
    "Latinka Light Italic": require("../assets/fonts/Latinka Light Italic.ttf"),
    "Latinka Thin": require("../assets/fonts/Latinka Thin.ttf"),
    "Latinka Thin Italic": require("../assets/fonts/Latinka Thin Italic.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeArea>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="signup" />
            <Stack.Screen name="manga" />
            <Stack.Screen name="reader" />
            <Stack.Screen name="sources" />
          </Stack>
        </SafeArea>
      </ThemeProvider>
      <StatusBar style="auto" />
    </>
  );
}

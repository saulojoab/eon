import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainAppNavigator from "./navigation/main";

export default function App() {
  return (
    <NavigationContainer>
      <MainAppNavigator />
    </NavigationContainer>
  );
}

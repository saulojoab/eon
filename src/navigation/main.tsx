import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Search, MangaDetails, MangaReader } from "../screens";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="MangaDetails" component={MangaDetails} />
      <Stack.Screen name="MangaReader" component={MangaReader} />
    </Stack.Navigator>
  );
}

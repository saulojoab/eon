/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  Search,
  MangaDetails,
  MangaReader,
  Home,
  SelectSources,
  Login,
  SignUp,
  Profile,
} from '@/screens';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import responsive from '@/global/utils/responsive';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

interface TabBarLabelProps {
  focused: boolean;
}
const TabBarLabel = styled.Text<TabBarLabelProps>`
  font-size: ${responsive(12)}px;
  color: ${({ theme, focused }) =>
    focused ? theme.colors.accent : theme.colors.white};
  font-family: ${({ theme, focused }) =>
    focused ? theme.fonts.black : theme.fonts.default};
`;

function TabNavigator() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel focused={focused}>{children}</TabBarLabel>
        ),
        tabBarIconStyle: {
          color: theme.colors.white,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={18}
              color={focused ? theme.colors.accent : color}
              name="home"
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={18}
              color={focused ? theme.colors.accent : color}
              name="search"
            />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={18}
              color={focused ? theme.colors.accent : color}
              name="user"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="MangaDetails" component={MangaDetails} />
      <Stack.Screen name="MangaReader" component={MangaReader} />
      <Stack.Screen name="SelectSources" component={SelectSources} />
    </Stack.Navigator>
  );
}

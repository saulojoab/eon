/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Search, MangaDetails, MangaReader } from '@/screens'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { useTheme } from 'styled-components'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

function TabNavigator() {
  const theme = useTheme()
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme?.colors.background,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          color: theme?.colors.white,
        },
        tabBarIconStyle: {
          color: theme?.colors.white,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={18}
              color={focused ? theme?.colors.accent : color}
              name="home"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={18}
              color={focused ? theme?.colors.accent : color}
              name="search"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Search}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <Icon
              size={18}
              color={focused ? theme?.colors.accent : color}
              name="user"
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default function App() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="MangaDetails" component={MangaDetails} />
      <Stack.Screen name="MangaReader" component={MangaReader} />
    </Stack.Navigator>
  )
}

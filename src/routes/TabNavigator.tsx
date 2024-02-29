import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import ChatActive from 'src/assets/icons/chatactive.svg'
import ChatHome from 'src/assets/icons/chathome.svg'
import ExploreActive from 'src/assets/icons/exploreactive.svg'
import Explore from 'src/assets/icons/exploreinactive.svg'
import HeartHomeinactive from 'src/assets/icons/hearthome.svg'
import Home from 'src/assets/icons/home.svg'
import HomeActive from 'src/assets/icons/homeactive.svg'
import LoveActive from 'src/assets/icons/loveactive.svg'
import ProfileInactive from 'src/assets/icons/profile.svg'
import ProfileActive from 'src/assets/icons/profileactive.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'
import HomeScreen from 'src/screens/home'
import ChatHomeScreen from 'src/screens/home/chats'
import ExploreScreen from 'src/screens/home/explore'
import MatchesScreen from 'src/screens/home/matches'
import ProfileScreen from 'src/screens/home/settings'

import { MainStackParamList, TabNavigatorParamList } from './navigation.type'

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'BaseApplication'>,
  NativeStackScreenProps<TabNavigatorParamList, 'Home'>
>

const TabNavigator: React.FC<ScreenProps> = () => {
  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
      backgroundColor: colors.snow,
      borderRadius: 10,
      paddingHorizontal: 20,
      marginVertical: 16,
    },
    tabBar: {
      height: 60,
    },
  })
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
      }}>
      <Tab.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              {focused ? <HomeActive /> : <Home />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Explore'}
        component={ExploreScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              {focused ? <ExploreActive /> : <Explore />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Match'}
        component={MatchesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              {focused ? <LoveActive /> : <HeartHomeinactive />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Chats'}
        component={ChatHomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              {focused ? <ChatActive /> : <ChatHome />}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => (
            <View style={styles.container}>
              {focused ? <ProfileActive /> : <ProfileInactive />}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator

import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'

import authRoute from 'src/api/routers/authRoute'
import useFirebaseMessagingToken from 'src/hooks/useFirebaseMessagingToken'
import ChatRoomsList from 'src/screens/home/chats'
import ChatRoom from 'src/screens/home/chats/ChatRoom'
import ExploreScreen from 'src/screens/home/explore'
import ExploreFilter from 'src/screens/home/explore/ExploreFilter'
import ExploreResult from 'src/screens/home/explore/ExploreResult'
import PaymentScreen from 'src/screens/home/payment/PaymentScreen'
import AboutScreen from 'src/screens/home/settings/AboutScreen'
import BlockedContacts from 'src/screens/home/settings/BlockedContacts'
import PreferenceScreen from 'src/screens/home/settings/PreferenceScreen'
import PriceQuotation from 'src/screens/home/settings/PriceQuotation'
import SafetyHelpCenter from 'src/screens/home/settings/SafetyHelpCenter'
import SecurityScreen from 'src/screens/home/settings/SecurityScreen'
import UserDescription from 'src/screens/home/UserDescription'

import { MainStackParamList } from './navigation.type'
import TabNavigator from './TabNavigator'
import ParallaxScreen from 'src/screens/home/ParallaxScreen'

const Stack = createStackNavigator<MainStackParamList>()

const MainNavigator = () => {
  const token = useFirebaseMessagingToken()

  useEffect(() => {
    const postDeviceToken = async () => {
      const request = {
        token,
      }

  
      await authRoute.notificationTokenPost(request)
    }
    if (token) {
      postDeviceToken()
    }
  }, [token])

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'BaseApplication'} component={TabNavigator} />
      <Stack.Screen name={'AboutMe'} component={AboutScreen} />
      <Stack.Screen name={'Preference'} component={PreferenceScreen} />
      <Stack.Screen name={'ChatRoom'} component={ChatRoom} />
      <Stack.Screen name={'ChatRoomList'} component={ChatRoomsList} />
      <Stack.Screen name={'SearchResult'} component={ExploreResult} />
      <Stack.Screen name={'ParallaxScreen'} component={ParallaxScreen} />
      <Stack.Screen name={'SearchFilterResult'} component={ExploreFilter} />
      <Stack.Screen name={'BlockedContacts'} component={BlockedContacts} />
      <Stack.Screen name={'SafetyAndHelpCenter'} component={SafetyHelpCenter} />
      <Stack.Screen name={'Security'} component={SecurityScreen} />
      <Stack.Screen name={'PaymentScreen'} component={PaymentScreen} />
      <Stack.Screen name={'UserDescription'} component={UserDescription} />
      <Stack.Screen name={'PaymentSelectionMode'} component={PriceQuotation} />
      <Stack.Screen name={'ExploreScreen'} component={ExploreScreen} />
      <Stack.Screen name={'ExploreFilter'} component={ExploreFilter} />
      <Stack.Screen name={'ExploreResult'} component={ExploreResult} />
    </Stack.Navigator>
  )
}

export default MainNavigator

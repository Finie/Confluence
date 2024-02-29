import { NavigationContainer } from '@react-navigation/native'
import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { Linking } from 'react-native'
import { ModalPortal } from 'react-native-modals'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import SplashScreen from 'react-native-splash-screen'

import BaseContextProvider from './context/BaseContextProvider'
import { ThemeProvider } from './context/ThemeContextProvider'
import EncryptionStore from './data/EncryptionStore'
import AuthNavigator from './routes/AuthNavigator'
import MainNavigator from './routes/MainNavigator'
import { SavedProfile } from './utils/shared-type'

import { isEmpty } from './helper'

const App = () => {
  const [userData, setuserData] = useState<SavedProfile | any>()
  const [isInKilometers, setIsInKilometers] = useState<boolean>(false)
  const [userToken, setUserToken] = useState(null)
  const [chatMate, setChatMate] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<number[]>([])
  const [selectedLookFor, setSelectedLookFor] = useState<number[]>([])

  React.useEffect(() => {
    const restoreUser = async () => {
      const result = await EncryptionStore.retrieveBantuUser()
      const restoreDistance = await EncryptionStore.retrieveStoredDistance()
      setIsInKilometers(restoreDistance)

      if (!isEmpty(result)) {
        setUserToken(result.token)
        setuserData(result)
      }
      SplashScreen.hide()
    }
    restoreUser()
  }, [])

  const { handleURLCallback } = useStripe()

  const handleDeepLink = React.useCallback(
    async (url: string | null) => {
      if (url) {
        const stripeHandled = await handleURLCallback(url)
        if (stripeHandled) {
          // This was a Stripe URL - you can return or add extra handling here as you see fit
        } else {
          // This was NOT a Stripe URL – handle as you normally would
        }
      }
    },
    [handleURLCallback],
  )

  React.useEffect(() => {
    const getUrlAsync = async () => {
      const initialUrl = await Linking.getInitialURL()
      handleDeepLink(initialUrl)
    }

    getUrlAsync()

    const deepLinkListener = Linking.addEventListener(
      'url',
      (event: { url: string }) => {
        handleDeepLink(event.url)
      },
    )

    return () => deepLinkListener.remove()
  }, [handleDeepLink])

  return (
    <ThemeProvider>
      <BaseContextProvider.Provider
        value={{
          userData,
          setuserData,
          isInKilometers,
          setIsInKilometers,
          userToken,
          setUserToken,
          chatMate,
          setChatMate,
          selectedLanguage,
          setSelectedLanguage,
          selectedLookFor,
          setSelectedLookFor,
        }}>
        <SafeAreaProvider>
          <NavigationContainer>
            {/* <PaymentScreen /> */}
            {isEmpty(userData) ? <AuthNavigator /> : <MainNavigator />}
            <ModalPortal />
          </NavigationContainer>
        </SafeAreaProvider>
      </BaseContextProvider.Provider>
    </ThemeProvider>
  )
}

export default App

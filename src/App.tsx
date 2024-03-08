/* eslint-disable import/order */

/* eslint-disable semi */

/* eslint-disable react/no-unstable-nested-components */
import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { Linking } from 'react-native'
import CodePush, { CodePushOptions } from 'react-native-code-push'
import { ModalPortal } from 'react-native-modals'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'

import BaseContextProvider from './context/BaseContextProvider'
import { ThemeProvider } from './context/ThemeContextProvider'
import EncryptionStore from './data/EncryptionStore'
import store from './data/redux'
import useCodePush from './hooks/useCodePush'
import { ErrorToast, SuccessToast, WarningToast } from './utils/customToast'
import { SavedProfile } from './utils/shared-type'
import UpdatingApp from './utils/UpdatingApp'

import Navigator from './routes'

const CodePushConfig: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  updateDialog: {
    appendReleaseDescription: true,
    title: 'New update available!',
  },
}

const App = () => {
  const [userData, setuserData] = useState<SavedProfile | any>()
  const [isInKilometers, setIsInKilometers] = useState<boolean>(false)
  const [userToken, setUserToken] = useState(null)
  const [chatMate, setChatMate] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<number[]>([])
  const [selectedLookFor, setSelectedLookFor] = useState<number[]>([])
  const [isLoadingApp, setIsLoadingApp] = useState<boolean>(true) // allows us to check for updates on application launch

  const { syncMessage, progress } = useCodePush(isLoadingApp)

  React.useEffect(() => {
    const restoreUser = async () => {
      const restoreDistance = await EncryptionStore.retrieveStoredDistance()
      setIsInKilometers(restoreDistance)
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

  const toastConfig = {
    //@ts-ignore
    SUCCESS: ({ text1 }) => <SuccessToast text1={text1} />,
    //@ts-ignore
    ERROR: ({ text1 }) => <ErrorToast text1={text1} />,
    //@ts-ignore
    WARNING: ({ text1 }) => <WarningToast text1={text1} />,
  }

  return (
    <Provider store={store}>
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
            isLoadingApp,
            setIsLoadingApp,
          }}>
          <SafeAreaProvider>
            {isLoadingApp ? (
              <UpdatingApp
                header="New update available"
                subHeader={syncMessage}
                progress={progress}
              />
            ) : (
              <Navigator />
            )}
            <ModalPortal />
            {/* @ts-ignore */}
            <Toast config={toastConfig} />
          </SafeAreaProvider>
        </BaseContextProvider.Provider>
      </ThemeProvider>
    </Provider>
  )
}

export default CodePush(CodePushConfig)(App) // wrap entire app with-code push

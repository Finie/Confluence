/* eslint-disable semi */

/* eslint-disable import/order */
import React, { useCallback, useContext, useEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { useDispatch, useSelector } from 'react-redux'
import utils from 'src/utils'

import Text from 'src/components/Text'
import BaseContextProvider from 'src/context/BaseContextProvider'
import EncryptionStore from 'src/data/EncryptionStore'
import { authorize, runLoginUser } from 'src/data/redux/slice/auth'
import { UserSession } from 'src/data/redux/slice/auth/types'
import { AuthState } from 'src/data/redux/state.types'

type CodePushLoadingProps = {
  header?: string
  subHeader?: string
  progress?: string
}

const UpdatingApp: React.FC<CodePushLoadingProps> = ({
  header = 'Downloading',
  subHeader = 'general_codePush_codePush_text',
  progress = '0%',
}) => {
  const { userSession, isAuthorized } = useSelector(
    (state: AuthState) => state.auth,
  )

  //@ts-ignore
  const { setuserData, setIsLoadingApp } = useContext(BaseContextProvider)
  const dispacth = useDispatch()

  const restoreUser = useCallback(async () => {
    const result: UserSession = await EncryptionStore.retrieveBantuUser()

    if (result?.token) {
      dispacth(runLoginUser(result))
      dispacth(authorize(true))
    } else {
      utils.showToastMessage('Welcome!', 'WARNING')
    }
  }, [dispacth])

  useEffect(() => {
    restoreUser()
  }, [restoreUser])

  useEffect(() => {
    console.log('====================================')
    console.log('userSession: ', JSON.stringify(userSession))
    console.log('isAuthorized: ', isAuthorized)
    console.log('====================================')

    if (isAuthorized) {
      setuserData(userSession)
      setIsLoadingApp(false)
      // SplashScreen.hide()
    }
  }, [isAuthorized, setIsLoadingApp, setuserData, userSession])

  useEffect(() => {
    console.log('====================================')
    console.log('header: ', header)
    console.log('subHeader: ', subHeader)
    console.log('progress: ', progress)
    console.log('====================================')
  }, [header, progress, subHeader])

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
  })

  return (
    <View style={styles.container}>
      <Text>UpdatingApp</Text>
      <Text>{`UpdatingApp: ${header}`}</Text>
      <Text>{`subHeader: ${subHeader}`}</Text>
      <Text>{`progress: ${progress}`}</Text>
    </View>
  )
}

export default UpdatingApp

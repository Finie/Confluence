/* eslint-disable import/order */

/* eslint-disable semi */
import { NavigationContainer } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import utils from 'src/utils'

import BaseContextProvider from 'src/context/BaseContextProvider'
import EncryptionStore from 'src/data/EncryptionStore'
import { authorize, runLoginUser } from 'src/data/redux/slice/auth'
import { UserSession } from 'src/data/redux/slice/auth/types'
import { AuthState } from 'src/data/redux/state.types'

import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'

const Navigator = () => {
  const { userSession, isAuthorized } = useSelector(
    (state: AuthState) => state.auth,
  )

  //@ts-ignore
  const { setuserData } = useContext(BaseContextProvider)
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
    }
  }, [isAuthorized, setuserData, userSession])

  return (
    <NavigationContainer>
      {isAuthorized ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default Navigator

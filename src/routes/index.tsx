/* eslint-disable semi */
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { useSelector } from 'react-redux'

import { AuthState } from 'src/data/redux/state.types'

import AuthNavigator from './AuthNavigator'
import MainNavigator from './MainNavigator'

const Navigator = () => {
  const { isAuthorized } = useSelector((state: AuthState) => state.auth)
  return (
    <NavigationContainer>
      {isAuthorized ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default Navigator

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Text, View } from 'react-native'

import BasicDisclaimer from 'src/screens/auth/BasicDisclaimer'
import BirthDayAge from 'src/screens/auth/BirthDayAge'
import BodyAndFrame from 'src/screens/auth/BodyAndFrame'
import EmailPassword from 'src/screens/auth/EmailPassword'
import EthnicityScreen from 'src/screens/auth/EthnicityScreen'
import FaceBookLogin from 'src/screens/auth/FaceBookLogin'
import FinishScreen from 'src/screens/auth/FinishScreen'
import ForgotPassword from 'src/screens/auth/ForgotPassword'
import GenderScreen from 'src/screens/auth/GenderScreen'
import HowToCallYou from 'src/screens/auth/HowToCallYou'
import InterestsScreen from 'src/screens/auth/InteretScreen'
import LocationTracking from 'src/screens/auth/LocationTracking'
import LoginScreen from 'src/screens/auth/LoginScreen'
import PersonalityDisclaimer from 'src/screens/auth/PersonalityDisclaimer'
import PersonalityScreen from 'src/screens/auth/PersonalityScreen'
import SecurityDisclaimer from 'src/screens/auth/SecurityDisclaimer'
import SingWelcome from 'src/screens/auth/SingWelcome'
import UpdatePassword from 'src/screens/auth/UpdatePassword'
import WelcomeScreen from 'src/screens/auth/WelcomeScreen'

import { AuthNavigatorParamList } from './navigation.type'

const Stack = createStackNavigator<AuthNavigatorParamList>()

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name={'Welcome'} component={WelcomeScreen} />
      <Stack.Screen name={'FacebookLogin'} component={FaceBookLogin} />
      <Stack.Screen name={'Login'} component={LoginScreen} />
      <Stack.Screen name={'ResetPassword'} component={ForgotPassword} />
      <Stack.Screen name={'UpdatePassword'} component={UpdatePassword} />
      <Stack.Screen name={'SignInWelcome'} component={SingWelcome} />
      <Stack.Screen name={'KeepAccountSafe'} component={SecurityDisclaimer} />
      <Stack.Screen name={'HowToCallYou'} component={HowToCallYou} />
      <Stack.Screen name={'EmailPassword'} component={EmailPassword} />
      <Stack.Screen name={'BasicDisclaimer'} component={BasicDisclaimer} />
      <Stack.Screen name={'BirthDayAge'} component={BirthDayAge} />
      <Stack.Screen name={'GenderScreen'} component={GenderScreen} />
      <Stack.Screen name={'BodyAndFrame'} component={BodyAndFrame} />
      <Stack.Screen name={'EthnicityScreen'} component={EthnicityScreen} />
      <Stack.Screen name={'LocationTracker'} component={LocationTracking} />
      <Stack.Screen
        name={'PersonalityDisclaimer'}
        component={PersonalityDisclaimer}
      />
      <Stack.Screen name={'PersonalityScreen'} component={PersonalityScreen} />
      <Stack.Screen name={'InteretScreen'} component={InterestsScreen} />
      <Stack.Screen name={'FinishScreen'} component={FinishScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigator

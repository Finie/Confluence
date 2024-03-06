/* eslint-disable semi */

/* eslint-disable import/order */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import utils from 'src/utils'
import * as Yup from 'yup'

import authRoute from 'src/api/routers/authRoute'
import ChechBox from 'src/assets/icons/checkboxcheck.svg'
import AppForm from 'src/components/forms/AppForm'
import AppFormInput from 'src/components/forms/AppFormInput'
import SubmitButton from 'src/components/forms/SubmitButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import BaseContextProvider from 'src/context/BaseContextProvider'
import EncryptionStore from 'src/data/EncryptionStore'
import { authorize, runLoginUser } from 'src/data/redux/slice/auth'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

const validationSchema = Yup.object().shape({
  username: Yup.string().required().trim().label('Username'),
  password: Yup.string().required().label('Password'),
})

type ScreenProps = NativeStackScreenProps<AuthNavigatorParamList, 'Login'>

const LoginScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()

  const dispatch = useDispatch()

  const [rememberMe, setrememberMe] = useState(true)

  const [isLoading, setIsloading] = useState(false)

  // const { setuserData, setUserToken } = useContext(BaseContextProvider)

  const handleRemember = () => setrememberMe(!rememberMe)

  const handleSubmission = async (data: any) => {
    const request = {
      username: data.username.trim(),
      password: data.password.trim(),
    }
    setIsloading(true)
    const response = await authRoute.loginUser(request)
    setIsloading(false)

    if (
      response.ok &&
      response.data && //@ts-ignore
      response.data.data && //@ts-ignore
      response.data.data.token
    ) {
      //@ts-ignore
      EncryptionStore.storeToken(response.data.data.token)
      //@ts-ignore
      EncryptionStore.storeBantuUser(response.data.data)

      //@ts-ignore
      dispatch(runLoginUser(response.data.data))
      // setUserToken(response.data.data.token)
      //@ts-ignore
      // setuserData(response.data.data)
    } else {
      return utils.showToastMessage(
        `Error: ${
          //@ts-ignore
          response.data?.message ||
          //@ts-ignore
          (response.data?.details[0] &&
            //@ts-ignore
            response.data?.details[0]?.errorMessage) ||
          //@ts-ignore
          response.data?.details[0] ||
          'Unknown Error occured'
        }`,
        'ERROR',
      )
    }
  }

  const styles = StyleSheet.create({
    textarea: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    testsize: {
      fontWeight: '600',
      lineHeight: 38.88,
      fontSize: 32,
    },
    main: {
      flex: 3,
      marginHorizontal: 30,
    },
    bottomlayout: {
      flex: 1,
    },
    checkboxtouchable: { paddingVertical: 30, flexDirection: 'row' },
    emptychecjbox: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: 20,
      height: 21,
      borderRadius: 4,
    },
    remember: {
      marginLeft: 16,
    },
    bottomlay: {
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    fogot: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 17.01,
      marginTop: 30,
    },
    donthav: {
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 17.01,
      marginBottom: 30,
    },
    sign: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
      marginBottom: 30,
      lineHeight: 17.01,
    },
  })

  return (
    <AuthScreen
      onBackPressed={() => {
        navigation.goBack()
      }}
      isLoading={isLoading}>
      <View style={styles.textarea}>
        <Text style={[styles.testsize]}>{'Let’s Sign You In'}</Text>
      </View>

      <View style={styles.main}>
        <AppForm
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={values => handleSubmission(values)}
          validationSchema={validationSchema}>
          <AppFormInput
            name={'username'}
            placeholder={'Username or email *'}
            keyboardType={'email-address'}
          />
          <AppFormInput
            name={'password'}
            placeholder={'Password *'}
            ispassword={true}
          />

          <View style={styles.bottomlayout}>
            <TouchableOpacity
              onPress={handleRemember}
              style={styles.checkboxtouchable}>
              {rememberMe ? (
                <ChechBox />
              ) : (
                <View style={styles.emptychecjbox} />
              )}
              <Text style={styles.remember}> Remember me</Text>
            </TouchableOpacity>
            <SubmitButton title="Sign in" type={'primary'} />

            <View style={styles.bottomlay}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={styles.fogot}>Forgot Password</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('FacebookLogin')}>
                <Text style={styles.donthav}>
                  Don't have an account?
                  <Text style={styles.sign}>{' Sign up →'}</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </AppForm>
      </View>
    </AuthScreen>
  )
}

export default LoginScreen

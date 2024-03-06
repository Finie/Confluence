/* eslint-disable import/order */

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import utils from 'src/utils'
import * as Yup from 'yup'

import authRoute from 'src/api/routers/authRoute'
import ChechBox from 'src/assets/icons/checkboxcheck.svg'
import AppForm from 'src/components/forms/AppForm'
import AppFormInput from 'src/components/forms/AppFormInput'
import FabSubmit from 'src/components/forms/FabSubmit'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import { runAddRegistrationData } from 'src/data/redux/slice/auth'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'EmailPassword'
>

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required('Password is required'),
  confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match',
  ),
})

const EmailPassword: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [ischecked, setisChecked] = useState(false)

  const dispatch = useDispatch()

  const [isLoading, setIsloading] = useState(false)

  // const { data } = route.params

  // const Usernames: UserProfile = data

  const handleSumbit = async (data: { email: string; password: string }) => {
    dispatch(
      runAddRegistrationData({
        dataType: 'EMAIL',
        payload: {
          email: data.email,
          password: data.password,
        },
      }),
    )

    setIsloading(true)
    const response = await authRoute.checkEmailAvailability(data.email)
    setIsloading(false)

    //@ts-ignore
    if (response.ok && response.data && response.data.data) {
      return navigation.navigate('BirthDayAge')
    }
    utils.showToastMessage('Email already taken', 'ERROR')
  }

  const handleSwitch = () => setisChecked(!ischecked)

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
    },

    howtwxt: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
      marginVertical: 30,
    },
    sharetext: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15,
    },
    bottomcontainer: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    emptychecjbox: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: 20,
      height: 21,
      borderRadius: 4,
    },
    disclaimer: {
      flexDirection: 'row',
      flex: 2,
      alignItems: 'center',
    },
    discalimertext: {
      marginLeft: 15,
      fontSize: 12,
      lineHeight: 14,
    },
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  })
  return (
    <AuthScreen
      isLoading={isLoading}
      onBackPressed={function (): void {
        navigation.goBack()
      }}>
      <AppForm
        initialValues={{
          email: '',
          password: '',
          confirm: '',
        }}
        validationSchema={validationSchema}
        // @ts-ignore
        onSubmit={handleSumbit}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>What’s your email?</Text>

          <AppFormInput
            name={'email'}
            placeholder={'Email'}
            // @ts-ignore
            keyboardType={'email-address'}
          />

          <AppFormInput name={'password'} placeholder={'Password'} ispassword />

          <AppFormInput
            name={'confirm'}
            placeholder={'Confirm password'}
            ispassword
          />
        </View>
        <View style={styles.bottomcontainer}>
          <TouchableOpacity style={styles.disclaimer} onPress={handleSwitch}>
            {ischecked ? <ChechBox /> : <View style={styles.emptychecjbox} />}
            <Text style={styles.discalimertext}>
              If you do not wish to get marketing communications about our
              products and services, check this box
            </Text>
          </TouchableOpacity>

          <View style={styles.fabcontainer}>
            <FabSubmit />
          </View>
        </View>
      </AppForm>
    </AuthScreen>
  )
}
export default EmailPassword

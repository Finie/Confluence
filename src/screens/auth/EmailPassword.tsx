import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

import authRoute from 'src/api/routers/authRoute'
import ChechBox from 'src/assets/icons/checkboxcheck.svg'
import AppForm from 'src/components/forms/AppForm'
import AppFormInput from 'src/components/forms/AppFormInput'
import FabSubmit from 'src/components/forms/FabSubmit'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import AuthContextProvider from 'src/context/AuthContextProvider'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { UserProfile } from 'src/utils/shared-type'

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

const EmailPassword: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const [ischecked, setisChecked] = useState(false)

  const [isLoading, setIsloading] = useState(false)

  const { data } = route.params

  const Usernames: UserProfile = data

  const handleSumbit = async (data: { email: string; password: string }) => {
    const request = {
      first_name: Usernames.first_name,
      email: data.email,
      password: data.password,
      last_name: Usernames.last_name,
      middle_name: Usernames.middle_name,
      phone: Usernames.phone,
      username: Usernames.username,
    }

    setIsloading(true)
    const response = await authRoute.checkEmailAvailability(data.email)
    setIsloading(false)

    if (response.ok) {
      // @ts-ignore
      if (response.data.data) {
        return navigation.navigate('BirthDayAge', { data: request })
      }
      return Alert.alert('Request failed', 'Sorry this email is already taken')
    }

    // @ts-ignore
    return Alert.alert('Request failed', response.data.message)
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
        onSubmit={handleSumbit}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>What’s your email?</Text>

          <AppFormInput
            name={'email'}
            placeholder={'Email'}
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

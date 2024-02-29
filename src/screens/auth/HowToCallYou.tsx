import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'
import * as Yup from 'yup'

import authRoute from 'src/api/routers/authRoute'
import AppForm from 'src/components/forms/AppForm'
import AppFormInput from 'src/components/forms/AppFormInput'
import FabSubmit from 'src/components/forms/FabSubmit'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'HowToCallYou'
>

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
  userName: Yup.string().required().label('Username'),
  phone: Yup.string().required().label('Phone'),
})

const HowToCallYou: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()

  const [isLoading, setIsLoading] = useState(false)

  const handleSumbit = async (data: {
    firstName: string
    lastName: string
    userName: string
    phone: string
  }) => {
    const request = {
      first_name: data.firstName,
      last_name: data.lastName,
      middle_name: data.lastName,
      phone: data.phone,
      username: data.userName,
    }

    setIsLoading(true)
    const nameResponse = await authRoute.checkNameAvailability(data.userName)
    const phoneResponse = await authRoute.checkNameAvailability(data.phone)
    setIsLoading(false)

    if (nameResponse.ok && phoneResponse.ok) {
      if (nameResponse.data.data && phoneResponse.data.data) {
        navigation.navigate('EmailPassword', { data: request })
        return
      }

      return Alert.alert(
        'Request failed',
        !nameResponse.data.data
          ? 'Username ' + 'is already in use'
          : !phoneResponse.data.data
          ? 'Phone number ' + 'is already in use'
          : '',
      )
    } else {
      return Alert.alert(
        'Request failed',
        nameResponse?.data?.message || phoneResponse?.data?.message,
      )
    }
  }

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
      justifyContent: 'flex-end',
      alignItems: 'flex-end',

      paddingVertical: 16,
      paddingHorizontal: 30,
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
          firstName: '',
          lastName: '',
          userName: '',
          phone: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => handleSumbit(values)}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>How should we call you?</Text>

          <AppFormInput name={'firstName'} placeholder={'First Name'} />
          <AppFormInput name={'lastName'} placeholder={'Last Name'} />
          <AppFormInput name={'userName'} placeholder={'Username'} />
          <AppFormInput
            name={'phone'}
            placeholder={'Phone number'}
            keyboardType={'decimal-pad'}
          />
          <Text style={styles.sharetext}>
            Your last name will only be shared with matches.
          </Text>
        </View>
        <View style={styles.bottomcontainer}>
          <FabSubmit />
        </View>
      </AppForm>
    </AuthScreen>
  )
}

export default HowToCallYou

/* eslint-disable import/order */

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import utils from 'src/utils'
import * as Yup from 'yup'

import profileupdates from 'src/api/routers/profileupdates'
import FloatingLabelInput from 'src/components/FloatingLabelInput'
import AppForm from 'src/components/forms/AppForm'
import AppFormInput from 'src/components/forms/AppFormInput'
import SubmitButton from 'src/components/forms/SubmitButton'
import Screen from 'src/components/screen/Screen'
import Text from 'src/components/Text'
import EncryptionStore from 'src/data/EncryptionStore'
import { runLogOut } from 'src/data/redux/slice/auth'
import { UserSession } from 'src/data/redux/slice/auth/types'
import { AuthState } from 'src/data/redux/state.types'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'

const validationSchema = Yup.object().shape({
  currentPassword: Yup.string().min(4).required().label('Old Password'),
  password: Yup.string().min(4).required().label('New Password'),
  confirmPassword: Yup.string()
    .min(4)
    .required()
    .label('Confirm Password')
    .test('passwords-match', 'Passwords must match', function (value) {
      return this.parent.password === value
    }),
})

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'Security'>

const SecurityScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const dispatch = useDispatch()
  const { userSession } = useSelector((state: AuthState) => state.auth)

  const userData = userSession

  //@ts-ignore
  const userProfile: UserSession = userData

  const handleSubmit = async (data: any) => {
    setIsLoading(true)
    const response = await profileupdates.updatePassword({
      current_password: data.currentPassword,
      password: data.password,
    })
    setIsLoading(false)

    if (response.ok) {
      utils.showToastMessage('Password updated successfylly', 'SUCCESS')
      dispatch(runLogOut())
      EncryptionStore.destroyUser()
    } else {
      utils.showToastMessage(
        //@ts-ignore
        `Request failed ${response.data.message}`,
        'ERROR',
      )
    }
  }

  const handleDeactivateUser = async () => {
    setIsLoading(true)
    const response = await profileupdates.deactivateAccount()
    setIsLoading(false)

    if (response.ok) {
      utils.showToastMessage('Account deactivated successfylly', 'SUCCESS')
      dispatch(runLogOut())
      EncryptionStore.destroyUser()
    } else {
      utils.showToastMessage(
        //@ts-ignore
        `Request failed ${response.data.message}`,
        'ERROR',
      )
    }
  }

  const handleDeleteUser = async () => {
    setIsLoading(true)
    const response = await profileupdates.deleteAccount()
    setIsLoading(false)

    if (response.ok) {
      utils.showToastMessage('Your Account has been deleted', 'SUCCESS')
      dispatch(runLogOut())
      EncryptionStore.destroyUser()
      return
    }

    return utils.showToastMessage(
      //@ts-ignore
      `Request failed ${response.data.message}`,
      'ERROR',
    )
  }

  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 30,
      flexGrow: 1,
    },
    verifycontainer: {
      alignItems: 'flex-end',
    },
    updatebutton: {
      marginVertical: 30,
    },
    verificationnumber: {
      color: colors.secondary,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
    },
    bottomlayout: {
      justifyContent: 'center',
      paddingBottom: 270,
    },
    diactivate: {
      height: 56,
      marginHorizontal: 30,
    },
    diactivatetext: {
      textAlign: 'center',
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
      color: colors.danger,
    },
    delete: {
      paddingVertical: 20,
      backgroundColor: colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      height: 56,
      borderRadius: 30,
      marginHorizontal: 30,
    },
    deletetext: {
      fontSize: 14,
      lineHeight: 17,
      color: colors.white,
      fontWeight: '700',
    },
    secutity: {
      fontSize: 24,
      lineHeight: 28,
      fontWeight: '700',
      paddingVertical: 20,
    },
  })
  return (
    <Screen
      isheaderVisible
      title={'Security'}
      isLoading={isLoading}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.container}>
        <Text style={styles.secutity}>Security</Text>
        <AppForm
          initialValues={{
            currentPassword: '',
            password: '',
            confirmPassword: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <Text>Your email address</Text>
          <FloatingLabelInput
            placeholder={userProfile.email}
            onChangeText={function (_text: string): void {}}
            onBlur={function (): void {}}
          />

          <Text>Your phone number</Text>
          <FloatingLabelInput
            placeholder={userProfile.phone}
            onChangeText={function (_text: string): void {}}
            onBlur={function (): void {}}
          />

          <TouchableOpacity style={styles.verifycontainer}>
            <Text style={styles.verificationnumber}>{''}</Text>
          </TouchableOpacity>

          <AppFormInput
            name={'currentPassword'}
            placeholder={'Your Current Password'}
            ispassword
          />

          <AppFormInput
            name={'password'}
            placeholder={'Your New Password'}
            ispassword
          />

          <AppFormInput
            name={'confirmPassword'}
            placeholder={'Confirm New Password'}
            ispassword
          />

          <View style={styles.updatebutton}>
            <SubmitButton title="Update" type={'primary'} />
          </View>
        </AppForm>
      </View>
      <View style={styles.bottomlayout}>
        <TouchableOpacity
          style={styles.diactivate}
          onPress={handleDeactivateUser}>
          <Text style={styles.diactivatetext}>
            Deactivate My Account Temporarily →
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.delete} onPress={handleDeleteUser}>
          <Text style={styles.deletetext}>Delete my account</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default SecurityScreen

/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AnimatedLottieView from 'lottie-react-native'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Modal, ModalContent } from 'react-native-modals'
import * as Yup from 'yup'

import authRoute from 'src/api/routers/authRoute'
import AppForm from 'src/components/forms/AppForm'
import AppFormInput from 'src/components/forms/AppFormInput'
import SubmitButton from 'src/components/forms/SubmitButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

const validationSchema = Yup.object().shape({
  username: Yup.string().required().label('Username'),
})

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'ResetPassword'
>

const ForgotPassword: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [responsemessage, setresponsemessage] = useState('')
  const [isError, setisError] = useState(false)
  const [username, setUsername] = useState('')
  const handleSubmit = async (data: { username: string }) => {
    setUsername(data.username)
    setisError(false)
    setIsLoading(true)
    const response = await authRoute.updatePassword(data)
    setIsLoading(false)

    if (response.ok) {
      setresponsemessage(response.data.data)

      setIsModalVisible(true)
      setisError(false)
      return
    }

    setresponsemessage(response.data.message)
    setIsModalVisible(true)
    setisError(true)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 30,
    },
    resettext: {
      textAlign: 'center',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
      marginVertical: 20,
      fontWeight: '600',
    },
    description: {
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 14.58,
      color: colors.black,
      fontWeight: '400',
      marginVertical: 20,
    },
    buttoncontainer: {
      marginVertical: 20,
    },

    forgotpas: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    forgottext: {
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
    },
    signup: {
      color: colors.primary,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
    },
  })

  return (
    <AuthScreen
      isLoading={isLoading}
      onBackPressed={function (): void {
        navigation.goBack()
      }}>
      <View style={styles.container}>
        <AppForm
          initialValues={{
            username: '',
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}>
          <Text style={styles.resettext}>Reset Password</Text>
          <Text style={styles.description}>
            We’ll email you a link to reset your account password. In case you
            don’t see it in your inbox within 10 minutes, please check your spam
            folder or request another link below.
          </Text>

          <AppFormInput name={'username'} placeholder={'Username or email *'} />
          <View style={styles.buttoncontainer}>
            <SubmitButton title="Send Reset Password Email" type={'primary'} />
          </View>
        </AppForm>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignInWelcome')
          }}
          style={styles.forgotpas}>
          <Text style={styles.forgottext}>
            Don’t have an account?
            <Text style={styles.signup}>{`  Sign up →`}</Text>
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        swipeThreshold={200} // default 100
        width={300}
        onTouchOutside={() => {
          setIsModalVisible(false)
        }}>
        <ModalContent
          style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <AnimatedLottieView
              autoPlay={true}
              loop={false}
              style={{ width: 100, height: 100 }}
              source={
                isError
                  ? require('src/assets/animations/67782-error.json')
                  : require('src/assets/animations/successful.json')
              }
            />

            <Text
              style={{
                fontSize: 20,
                lineHeight: 26,
                textAlign: 'center',
                marginTop: 16,
                color: colors.black,
              }}>
              {responsemessage}
            </Text>
          </View>

          <TouchableOpacity
            onPressOut={() => {
              setIsModalVisible(false)
              if (!isError) {
                navigation.navigate('UpdatePassword', {
                  username,
                })
              }
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 16,
              borderWidth: 1,
              padding: 8,
              width: '50%',
              borderRadius: 16,
              borderColor: colors.silver,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '700',
                lineHeight: 26,
                color: colors.silver,
              }}>
              close
            </Text>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    </AuthScreen>
  )
}

export default ForgotPassword

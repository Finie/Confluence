import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AnimatedLottieView from 'lottie-react-native'
import React, { useState } from 'react'
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
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
  token: Yup.string().required().label('Token'),
  password: Yup.string().required('Password is required'),
  confirm: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords do not match',
  ),
})

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'UpdatePassword'
>

const UpdatePassword: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [responsemessage, setresponsemessage] = useState('')
  const [isError, setisError] = useState(false)

  const handleVerification = async (data: {
    token: string
    password: string
    confirm: string
  }) => {
    const request = {
      username: route.params.username.trim(),
      password: data.token.trim(),
    }
    setIsLoading(true)
    const response = await authRoute.validateResetPasswordToken(request)

    if (response.ok) {
      const result = {
        password: data.password,
        reset_token: response.data.data.reset_token,
        user_id: response.data.data.user_id,
      }

      handleSubmit(result)
      return
    }
    setIsLoading(false)
    return Alert.alert(response.problem, response.data.message)
  }

  const handleSubmit = async (data: {
    password: string
    reset_token: string
    user_id: string
  }) => {
    const request = {
      user_id: data.user_id,
      reset_token: data.reset_token,
      password: data.password,
    }

    setisError(false)

    const response = await authRoute.createNewPassword(request)
    setIsLoading(false)

    if (response.ok) {
      setisError(false)
      return Alert.alert('Success!', response.data.message)
    }
    return Alert.alert('Request failed!', response.data.message)
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
    scrollview: {
      flexGrow: 1,
    },
    bottom: {
      marginBottom: 30,
    },
  })

  return (
    <AuthScreen
      isLoading={isLoading}
      onBackPressed={function (): void {
        navigation.goBack()
      }}>
      <ScrollView contentContainerStyle={styles.scrollview}>
        <View style={styles.container}>
          <AppForm
            initialValues={{
              token: '',
              password: '',
              confirm: '',
            }}
            onSubmit={values => handleVerification(values)}
            validationSchema={validationSchema}>
            <Text style={styles.resettext}>Update Your Password</Text>

            <AppFormInput
              name={'token'}
              placeholder={'Token *'}
              autoCapitalize="characters"
            />
            <AppFormInput
              name={'password'}
              placeholder={'New password *'}
              ispassword={true}
            />
            <AppFormInput
              name={'confirm'}
              placeholder={'Confirm password *'}
              ispassword={true}
            />
            <View style={styles.buttoncontainer}>
              <SubmitButton title="Update New Password" type={'primary'} />
            </View>
          </AppForm>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('FacebookLogin')
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
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
              onPress={() => {
                setIsModalVisible(false)
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
      </ScrollView>
    </AuthScreen>
  )
}

export default UpdatePassword

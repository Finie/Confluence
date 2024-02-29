import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, TextInputBase, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import ImageLogo from 'src/assets/images/signupwelcom.png'
import Button from 'src/components/Button'
import Link from 'src/components/Link'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'SignInWelcome'
>

const SingWelcome: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
    },
    image: {
      width: 262,
      height: 265,
    },
    lowerdesign: {
      flex: 1,
      marginHorizontal: 30,
    },

    signin: {
      justifyContent: 'flex-end',
      alignItems: 'center',
      flex: 1,
      marginBottom: 30,
    },
    welcomeText: {
      fontSize: 32,
      lineHeight: 38.88,
      fontWeight: '600',
      color: colors.black,
      textAlign: 'center',
      marginBottom: 30,
    },
    link: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
    },
    account: {
      fontWeight: '700',
      fontSize: 14,
    },
  })
  return (
    <AuthScreen
      onBackPressed={() => {
        navigation.goBack()
      }}
      isLoading={false}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={ImageLogo} />
      </View>
      <View style={styles.lowerdesign}>
        <Text style={styles.welcomeText}>Welcome to Bantuz Singles!</Text>

        <Button
          title=" Create Account"
          onPress={() => navigation.navigate('KeepAccountSafe')}
        />

        <View style={styles.signin}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.account}>
              Already have an account?
              <Text style={styles.link}>{' Sign in →'}</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </AuthScreen>
  )
}
export default SingWelcome

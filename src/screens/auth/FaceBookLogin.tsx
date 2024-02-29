import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useRef } from 'react'
import {
  Image,
  Linking,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import Facebook from 'src/assets/icons/facebook.svg'
import WelcomeImg from 'src/assets/images/welcomeimage.png'
import WelcomeLogo from 'src/assets/images/welcomelogo.png'
import Button from 'src/components/Button'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'FacebookLogin'
>

const FaceBookLogin: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()

  //   const getInfoFromToken = (token: string) => {
  //     const PROFILE_REQUEST_PARAMS = {
  //       fields: {
  //         string: 'id,name,first_name,last_name',
  //       },
  //     }
  //     const profileRequest = new GraphRequest(
  //       '/me',
  //       { token, parameters: PROFILE_REQUEST_PARAMS },
  //       (error, user) => {
  //         if (error) {
  //           console.log('login info has error: ' + error)
  //         } else {
  //           // this.setState({userInfo: user});
  //           console.log('result:', user)
  //         }
  //       },
  //     )
  //     new GraphRequestManager().addRequest(profileRequest).start()
  //   }

  //   const loginWithFacebook = () => {
  //     // Attempt a login using the Facebook login dialog asking for default permissions.
  //     LoginManager.logInWithPermissions(['public_profile']).then(
  //       login => {
  //         if (login.isCancelled) {
  //           console.log('Login cancelled')
  //         } else {
  //           AccessToken.getCurrentAccessToken().then(
  //             (data: { accessToken: string }) => {
  //               const accessToken = data.accessToken.toString()
  //               getInfoFromToken(accessToken)
  //             },
  //           )
  //         }
  //       },
  //       error => {
  //         console.log('Login fail with error: ' + error)
  //       },
  //     )
  //   }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: colors.white,
    },
    image: {
      width: 250,
      height: 48,
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    scrollView: {
      flexGrow: 1,
    },
    imagewel: {
      width: 330,
      height: 280,
    },
    imageContainerwel: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 50,
    },
    facebook: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      borderRadius: 28,
      height: 56,
      borderColor: colors.silver,
      marginVertical: 8,
      flexDirection: 'row',
    },
    prefilltext: {
      marginLeft: 20,
      fontWeight: '700',
    },
    ortext: { textAlign: 'center', marginVertical: 20 },
    alread: { fontWeight: '700', fontSize: 16, textAlign: 'center' },
    sign: {
      color: colors.primary,
      fontWeight: '700',
      fontSize: 14,
      lineHeight: 24,
      padding: 1,
      height: 56,
    },
    touchableOpacity: {
      padding: 3,
      height: 30,
    },
    privacy: {
      color: colors.primary,
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 15,
      textDecorationLine: 'underline',
      paddingTop: 16,
    },
    termsofuse: {
      color: colors.primary,
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 15,
      textDecorationLine: 'underline',
    },
    discalimer: {
      textAlign: 'center',
      fontWeight: '400',
      fontSize: 12,
      lineHeight: 15,
      marginHorizontal: 30,
    },
    botton: {
      marginVertical: 60,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={WelcomeLogo} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.imageContainerwel}>
          <Image style={styles.imagewel} source={WelcomeImg} />
        </View>

        <View>
          {/* eslint-disable-next-line react-native/no-inline-styles */}
          <View style={{ marginHorizontal: 30 }}>
            <Button
              title={'Create Account'}
              onPress={() => {
                navigation.navigate('SignInWelcome')
              }}
            />

            {/* <LoginButton
              onLoginFinished={(error, result) => {
                if (error) {
                  console.log('login has error: ' + result.error);
                } else if (result.isCancelled) {
                  console.log('login is cancelled.');
                } else {
                  AccessToken.getCurrentAccessToken().then(data => {
                    console.log(data.accessToken.toString());
                  });
                }
              }}
              onLogoutFinished={() => console.log('logout.')}
            /> */}

            {/* <TouchableOpacity style={styles.facebook}>
              <Facebook />
              <Text style={styles.prefilltext}>Pre-fill with Facebook</Text>
            </TouchableOpacity> */}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.ortext}>Or</Text>
            <Text style={styles.alread}>
              Already have an account?{' '}
              <Text
                style={{
                  color: colors.primary,
                  fontWeight: '700',
                  fontSize: 16,
                }}>
                {' '}
                Sign in →{' '}
              </Text>
            </Text>
          </TouchableOpacity>

          <View style={styles.botton}>
            <Text style={styles.discalimer}>
              By signing in or creating an account, you agree to our{' '}
              <Text style={styles.termsofuse}>Terms of Use. </Text>
              Learn how we process your data in our{' '}
              <Text style={styles.privacy}>Privacy Policy.</Text>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FaceBookLogin

/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable react-native/no-inline-styles */
// import { ReactNativeFirebase } from '@react-native-firebase/app'
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AnimatedLottieView from 'lottie-react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  Alert,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import PushNotification from 'react-native-push-notification'
import { isEmpty, updateBantuzUser } from 'src/helper'

// import CardStack, { Card } from 'react-native-card-stack-swiper'
// remove react-native-card-stack-swiper library
// import Swiper from 'react-native-deck-swiper'
// remove react-native-deck-swiper library
import homeRouter from 'src/api/routers/homeRouter'
// import bantusinlesIcon from 'src/assets/icons/batuz_singles_logo.png'
import Text from 'src/components/Text'
import BantuzCardSwiper from 'src/components/view/BantuzCardSwiper'
import BaseContextProvider from 'src/context/BaseContextProvider'
import useFirebaseMessaging from 'src/hooks/useFirebaseMessaging'
import useThemeStyles from 'src/hooks/useThemeStyles'
import {
  MainStackParamList,
  TabNavigatorParamList,
} from 'src/routes/navigation.type'
import {
  BantuProfile,
  BantuzUserResponse,
  SearchGlag,
} from 'src/utils/shared-type'

type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'BaseApplication'>,
  NativeStackScreenProps<TabNavigatorParamList, 'Match'>
>

const HomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [availableUsers, setAvailableUsers] = useState<BantuProfile[]>([])
  const [isAmatch, setIsAmatch] = useState<boolean>(false)
  // @ts-ignore
  const { userData, setuserData } = useContext(BaseContextProvider)

  const isFocused = useIsFocused()

  const getCurrentUser = async () => {
    setIsLoading(true)
    const response = await homeRouter.getCurrentAccounts()
    setIsLoading(false)

    if (response.ok) {
      // @ts-ignore
      const updatedData = updateBantuzUser(userData, response.data.data)
      setuserData(updatedData)
      return
    }
    return Alert.alert('Oops,', "Look's like system update is underway")
  }

  const getBantuzUserAccounts = useCallback(
    async (page: number, pageSize: number) => {
      const request: SearchGlag = {
        username: '',
        latitude: 0,
        longitude: 0,
        distance_from: null,
        distance_to: null,
        age_from: 18,
        age_to: 60,
        // @ts-ignore
        passions: [],
        // @ts-ignore
        educations: [],
        // @ts-ignore
        others: [],
        page,
        page_size: pageSize,
      }

      setIsLoading(true)
      const response = await homeRouter.exploreMatches(request)
      setIsLoading(false)

      if (response.ok) {
        // @ts-ignore
        const result: BantuzUserResponse = response.data

        if (result.success) {
          setAvailableUsers(result.data)
          return
        }

        return Alert.alert(
          'Request Failed',
          // @ts-ignore
          response.data?.message || response.data.toString(),
        )
      }

      return Alert.alert(
        'Request Failed',
        // @ts-ignore
        response.data?.message || response.data.toString(),
      )
    },
    [],
  )

  useEffect(() => {
    if (isFocused) {
      getBantuzUserAccounts(1, 50)
    }
  }, [getBantuzUserAccounts, isFocused])

  useEffect(() => {
    if (isFocused) {
      getCurrentUser()
    }
  }, [isFocused])

  const executeSwipeRight = async (username: string) => {
    const request = {
      username,
      status: 'LIKE',
    }
    const response = await homeRouter.postaMatchedUser(request)

    if (response.ok) {
      // @ts-ignore
      if (response.data.data.data.is_a_match) {
        setIsAmatch(true)
      }
      return
    }

    return Alert.alert(
      response.problem,
      // @ts-ignore
      'Error: ' + response.data?.message || response.data?.msg,
    )
  }

  const executeSwipeLeft = async (username: string) => {
    const request = {
      username,
      status: 'PASS',
    }

    const response = await homeRouter.postaMatchedUser(request)

    if (response.ok) {
    } else {
      return Alert.alert(
        response.problem,
        // @ts-ignore
        'Error: ' + response.data?.message || response.data?.msg,
      )
    }
  }

  const onSwipedRight = (userProfile: BantuProfile) => {
    if (!isEmpty(availableUsers)) {
      executeSwipeRight(userProfile.username)
    }
  }

  const onSwipedLeft = (userProfile: BantuProfile) => {
    if (!isEmpty(availableUsers)) {
      executeSwipeLeft(userProfile.username)
    }
  }

  useEffect(() => {
    if (messaging) {
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage) {
          if (remoteMessage !== undefined) {
            //@ts-ignore
            if (remoteMessage.data.type === 'match') {
              navigation.navigate('Match')
            } else {
              navigation.navigate('ChatRoomList')
            }
          }
        }
      })
    }
  }, [])

  const handleNotification = useCallback(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      // Handle the received notification
      if (remoteMessage) {
        if (remoteMessage !== undefined) {
          //@ts-ignore
          if (remoteMessage.data.type === 'match') {
            navigation.navigate('Match')
          } else {
            navigation.navigate('ChatRoomList')
          }
        }
      }

      PushNotification.localNotification({
        //   @ts-ignore
        message: remoteMessage.notification?.body,
        title: remoteMessage.notification?.title,
        bigPictureUrl: remoteMessage.notification?.android?.imageUrl,
        smallIcon: remoteMessage.notification?.android?.channelId,
        channelId: 'bantuz-singles-notification-id',
        vibrate: true,
      })
    },
    [],
  )

  const handleOpenMore = (currentUser: BantuProfile) => {
    navigation.navigate('ParallaxScreen', {
      userProfile: currentUser,
    })
  }

  useFirebaseMessaging(handleNotification)

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.background,
    },
    backgroundImage: {
      height: 130,
      resizeMode: 'cover',
      justifyContent: 'center',
      alignItems: 'center',
    },
    centeredContainer_text: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      top: 40,
      width: '100%',
      alignItems: 'center',
    },
    centeredContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      position: 'absolute',
      top: 50,
      width: '100%',
      alignItems: 'center',
    },
    welcomeText: {
      fontSize: 20,
      fontWeight: 'bold',
      marginRight: 10,
      textAlign: 'center',
      color: colors.white,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 20,
    },
    center_container: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 60,
    },
    dayspick: {
      fontSize: 24,
      lineHeight: 30,
      color: colors.black,
      fontWeight: '600',
      marginTop: 30,
      marginBottom: 15,
    },
    lastcontainer: {
      width: 300,
      height: '100%',
      borderRadius: 32,
      backgroundColor: 'red',
    },
    buttons: {
      height: 60,
      width: '70%',
      marginHorizontal: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
      position: 'absolute',
      top: 430,
      marginBottom: 60,
    },
    smileButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartsbutton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancel: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.black_to_primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rewind: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.silver,
      justifyContent: 'center',
      alignItems: 'center',
    },
    swipes_container: {
      borderRadius: 30,
      overflow: 'hidden',
      height: 380,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingStart: 60,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer_texts: {
      fontSize: 14,
      marginTop: 4,
      fontWeight: '700',
      color: colors.silver,
    },
    checkitout: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.secondary,
    },
    checkitouttouchable: { justifyContent: 'center', alignItems: 'center' },
    subscribetext: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.black,
    },
    subscribecontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    suboverall: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.accent,
      marginHorizontal: 30,
      borderRadius: 10,
      marginTop: 40,
      marginBottom: 30,
    },
    overlayWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginTop: 30,
      marginLeft: -30,
    },
  })

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
      style={styles.container}>
      {isAmatch && (
        <View
          style={{
            zIndex: 20,
            backgroundColor: colors.loaderBackground,
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AnimatedLottieView
            source={require('src/assets/animations/match_like.json')}
            loop={false}
            autoPlay={true}
            style={{
              width: 300,
              height: 300,
            }}
          />

          <Text
            style={{ color: colors.white, fontSize: 28, fontWeight: '700' }}>
            It's a match
          </Text>

          <TouchableOpacity
            onPress={() => setIsAmatch(false)}
            style={{
              padding: 8,
              marginVertical: 20,
            }}>
            <Text
              style={{ fontSize: 18, fontWeight: '500', color: colors.accent }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <ImageBackground
        style={styles.backgroundImage}
        source={require('src/assets/images/homeheader.png')}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />

        <Text style={styles.welcomeText}>Welcome to Bantuz Singles</Text>
      </ImageBackground>

      <View style={styles.center_container}>
        <Text style={styles.dayspick}>Today's Pick</Text>

        {isLoading ? (
          <AnimatedLottieView
            source={require('src/assets/animations/loadprofiles.json')}
            autoPlay={true}
            loop={true}
            style={{
              height: 435,
            }}
          />
        ) : (
          <BantuzCardSwiper
            bantuzUser={availableUsers}
            onSwipeRight={(currentUser: BantuProfile) =>
              onSwipedRight(currentUser)
            }
            onSwipeLeft={(currentUser: BantuProfile) =>
              onSwipedLeft(currentUser)
            }
            onOpenMoredetails={handleOpenMore}
            onUpdatebantuUser={(
              type: 'Add' | 'Remove',
              profile: BantuProfile | null,
            ) => {
              if (type === 'Remove') {
                setAvailableUsers(availableUsers => availableUsers.slice(1)) // remove item
              } else {
                if (profile) {
                  setAvailableUsers(availableUsers => [
                    profile, //add new profile
                    ...availableUsers,
                  ])
                }
              }
            }}
          />
        )}

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('PaymentSelectionMode')
          }}
          style={styles.suboverall}>
          <Image
            source={bantusinlesIcon}
            style={{
              width: 40,
              height: 40,
            }}
          />

          <View style={styles.subscribecontainer}>
            <Text style={styles.subscribetext}>
              Subscribe to get more top picks, rewinds, and more!
            </Text>
          </View>
          <TouchableOpacity style={styles.checkitouttouchable}>
            <Text style={styles.checkitout}>Check it out →</Text>
          </TouchableOpacity>
        </TouchableOpacity> */}
      </View>
    </ScrollView>
  )
}

export default HomeScreen

import { firebase } from '@react-native-firebase/messaging'
import { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'

const useFirebaseMessagingToken = (): string | null => {
  const [token, setToken] = useState<string | null>(null)
  const messaging = firebase.messaging()
  useEffect(() => {
    const createNotificationChannel = () => {
      PushNotification.createChannel(
        {
          channelId: 'bantuz-singles-notification-id',
          channelName: 'BantuzSinglesNotificationChanel',
          channelDescription: 'Bantuz Single in app notification',
          playSound: true,
          vibrate: true,
          soundName: 'default',
          importance: 4,
        },
        _created => {},
      )
    }

    const requestNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        ]
        const granted = await PermissionsAndroid.requestMultiple(permissions)
        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ||
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION]
        ) {
          createNotificationChannel()
        }
      } else if (Platform.OS === 'ios') {
        await messaging.requestPermission({
          sound: true,
          alert: true,
          badge: true,
        })
        const authorizationStatus = await messaging.hasPermission()

        if (
          authorizationStatus ===
          firebase.messaging.AuthorizationStatus.AUTHORIZED
        ) {
          createNotificationChannel()
        }
      }
    }

    const getToken = async () => {
      try {
        const messagingToken = await messaging.getToken()
        setToken(messagingToken)
      } catch (error) {
        //console.log(`Failed to get messaging token: ${error}`)
      }
    }

    requestNotificationPermission()
    getToken()

    const unsubscribe = messaging.onTokenRefresh(refreshedToken => {
      //console.log('Token refreshed:', refreshedToken)
      setToken(refreshedToken)
    })

    PushNotification.configure({
      onRegister: deviceToken => {
        //console.log('Device token:', deviceToken)
        setToken(deviceToken.token)
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    })

    return unsubscribe
  }, [messaging])

  return token
}

export default useFirebaseMessagingToken

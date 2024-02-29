import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging'
import { useEffect } from 'react'

const useFirebaseMessaging = (
  onNotificationReceived: (
    remoteMessage: FirebaseMessagingTypes.RemoteMessage,
  ) => void,
): void => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // Handle the incoming notification when the app is in the foreground
        if (onNotificationReceived) {
          onNotificationReceived(remoteMessage)
        }
      },
    )

    messaging().setBackgroundMessageHandler(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // Handle the incoming notification when the app is in the background
        if (onNotificationReceived) {
          onNotificationReceived(remoteMessage)
        }
      },
    )

    return () => {
      unsubscribe()
    }
  }, [onNotificationReceived])
}

export default useFirebaseMessaging

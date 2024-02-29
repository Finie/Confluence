/**
 * @format
 */
import { initializeApp } from '@react-native-firebase/app'
import messaging, { firebase } from '@react-native-firebase/messaging'
import { AppRegistry } from 'react-native'
import App from 'src/App'

import { name as appName } from './app.json'

const firebaseConfig = {
  apiKey: 'AIzaSyCGBBk3IMnFcXdtfQvhUhVLUtCGrHTYEm4',
  authDomain: 'bantuz-singles.firebaseapp.com',
  databaseURL: 'https://bantuz-singles-default-rtdb.firebaseio.com',
  projectId: 'bantuz-singles',
  storageBucket: 'bantuz-singles.appspot.com',
  messagingSenderId: '878499294419',
  appId: '1:878499294419:android:fb1d84a0e8c054c4317826',
}

if (firebase.apps.length === 0) {
  initializeApp(firebaseConfig)
} else {
  initializeApp()
}

messaging().setBackgroundMessageHandler(async _remoteMessage => {})

AppRegistry.registerComponent(appName, () => App)

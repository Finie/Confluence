import { Alert } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'

const userTokenKey = 'usertokenKey'

const userKeyStore = 'userKey'

const storePreferedDistanceKey = 'storePreferedDistanceKey'

const storePreferedDistanceUnit = async (state: any) => {
  try {
    await EncryptedStorage.setItem(
      storePreferedDistanceKey,
      JSON.stringify(state),
    )
  } catch (error) {
    Alert.alert('Error', `${error}`)
  }
}

const storeBantuUser = async (user: any) => {
  try {
    await EncryptedStorage.setItem(userKeyStore, JSON.stringify(user))
  } catch (error) {
    Alert.alert('Error', `${error}`)
  }
}

const storeToken = async (token: any) => {
  try {
    await EncryptedStorage.setItem(userTokenKey, JSON.stringify(token))
  } catch (error) {
    Alert.alert('Error', `${error}`)
  }
}

const retrieveBantuUser = async () => {
  try {
    const result = await EncryptedStorage.getItem(userKeyStore)

    if (result !== undefined) {
      // Congrats! You've just retrieved your first value!
      return JSON.parse(!result ? '{}' : result)
    }
  } catch (error) {
    // There was an error on the native side
    Alert.alert('Error', `${error}`)
  }
}

const getUserToken = async () => {
  try {
    const result = await EncryptedStorage.getItem(userTokenKey)

    if (result !== undefined) {
      // Congrats! You've just retrieved your first value!
      return JSON.parse(!result ? '{}' : result)
    }
  } catch (error) {
    // There was an error on the native side
    Alert.alert('Error', `${error}`)
  }
}

const retrieveStoredDistance = async () => {
  try {
    const result = await EncryptedStorage.getItem(storePreferedDistanceKey)

    return JSON.parse(result ? result : 'false')
  } catch (error) {
    // There was an error on the native side
    Alert.alert('Error', `${error}`)
  }
}

const destroyUser = async () => {
  try {
    await EncryptedStorage.clear()
  } catch (error) {
    Alert.alert('Error', `${error}`)
  }
}

export default {
  storeBantuUser,
  retrieveBantuUser,
  storeToken,
  getUserToken,
  destroyUser,
  storePreferedDistanceUnit,
  retrieveStoredDistance,
}

import Toast from 'react-native-toast-message'

import PlaceholderImage from 'src/assets/images/love_illustaration.png'

import { ToasTypes } from './config-types'

/**
 *
 * @param message string that will be used to display errors
 *
 * @param type type of toast to show switching between error | success | warning
 * @returns configured toast inatsnce that automatically hides after 3 sec
 */

const showToastMessage = (message: string, type: ToasTypes) => {
  return Toast.show({
    position: 'top',
    type,
    text1: message,
    visibilityTime: 4000, //Number of milliseconds after which Toast automatically hides
    autoHide: true, //Toast automatically hides after a certain number of milliseconds, specified by the visibilityTime prop
    topOffset: 60,
    onPress: () => {
      Toast.hide()
    },
  })
}

const placeholderImage = () => {
  return PlaceholderImage
}

export default {
  showToastMessage,
  placeholderImage,
}

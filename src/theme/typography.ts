/**
 * file describes the default styles of the
 * text components all across the application
 */
import { StyleSheet } from 'react-native'

import { ThemeColors } from './themes.types'

const textVariants = (colors: ThemeColors) => {
  return StyleSheet.create({
    heading: {
      //   fontFamily: 'SourceSansPro-Bold',
      color: colors.black,
      fontSize: 32,
      lineHeight: 38.88,
    },
    subheading: {
      //   fontFamily: 'SourceSansPro-SemiBold',
      color: colors.black,
      fontSize: 20,
      lineHeight: 24.3,
    },
    body: {
      //   fontFamily: 'SourceSansPro-Regular',
      color: colors.silver,
      fontSize: 16,
      lineHeight: 19.44,
    },
    caption: {
      //   fontFamily: 'SourceSansPro-Regular',
      color: colors.silver,
      fontSize: 12,
      lineHeight: 14.58,
    },
  })
}

export { textVariants }

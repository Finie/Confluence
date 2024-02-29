import React, { ReactNode } from 'react'
import {
  Text as ReactNativeText,
  StyleProp,
  StyleSheet,
  TextStyle,
} from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

type Props = {
  children: ReactNode
  style?: StyleProp<TextStyle>
  type?: 'heading' | 'normal' | 'subheading' | 'caption'
}

// This component overrides the default Text component from react-native.
// It renders a text component with the correct styles. It accepts a type prop
// to determine which styles to apply. You can also pass in your own styles.

const Text: React.FC<Props> = ({
  type = 'normal',
  style,
  children,
  ...rest
}) => {
  const { colors } = useThemeStyles()
  const textStyles = () => {
    switch (type) {
      case 'heading':
        return styles.heading
      case 'subheading':
        return styles.subheading
      case 'caption':
        return styles.caption
      default:
        return styles.body
    }
  }

  const styles = StyleSheet.create({
    heading: {
      color: colors.black,
      fontSize: 34,
      lineHeight: 44,
      marginLeft: -3,
    },
    subheading: {
      color: colors.silver,
      fontSize: 22,
      lineHeight: 30,
    },
    body: {
      color: colors.black,
      fontSize: 16,
      lineHeight: 24,
    },
    caption: {
      color: colors.snow,
      fontSize: 14,
      lineHeight: 22,
    },
  })
  return (
    <ReactNativeText {...rest} style={[textStyles(), style]}>
      {children}
    </ReactNativeText>
  )
}

export default Text

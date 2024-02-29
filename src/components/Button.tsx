import React from 'react'
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

interface ButtonProps {
  title: string
  onPress: () => void
  style?: StyleProp<ViewStyle>
}

const Button: React.FC<ButtonProps> = ({ title, onPress, style }) => {
  const [pressed, setPressed] = React.useState(false)

  const { colors } = useThemeStyles()

  const handlePressIn = () => {
    setPressed(true)
  }

  const handlePressOut = () => {
    setPressed(false)
  }

  const getRippleColor = () => {
    if (Platform.OS === 'android') {
      return colors.white
    } else {
      return colors.snow
    }
  }

  const ripple = {
    color: getRippleColor(),
    borderless: false,
    radius: 100,
  }

  const styles = StyleSheet.create({
    button: {
      borderRadius: 28,
      overflow: 'hidden',
      height: 56,
    },
    buttonPressed: {
      opacity: 0.5,
    },
    buttonBackground: {
      backgroundColor: colors.primary,
      paddingVertical: 10,
      height: 56,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
      fontWeight: '700',
      fontSize: 16,
    },
  })

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      android_ripple={ripple}
      style={[styles.button, style, pressed ? styles.buttonPressed : null]}>
      <View style={styles.buttonBackground}>
        <Text type={'subheading'} style={styles.buttonText}>
          {title}
        </Text>
      </View>
    </Pressable>
  )
}

export default Button

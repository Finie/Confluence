import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  onPress?: () => void
  title: string
  style?: StyleProp<TextStyle>
}

const Link: React.FC<Props> = props => {
  const { colors } = useThemeStyles()
  const { onPress, style } = props

  const styles = StyleSheet.create({
    text: {
      color: colors.primary,
      fontSize: 12,
    },
  })

  const handlePress = () => {
    if (onPress) {
      onPress()
    }
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text type="caption" style={[styles.text, style]}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default Link

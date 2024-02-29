import React from 'react'
import { StyleSheet } from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  isVisible: boolean
  error: string
}

const TextInputError: React.FC<Props> = ({ isVisible, error }) => {
  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    error: {
      color: colors.danger,
      fontSize: 14,
      lineHeight: 20,
      marginStart: 8,
      marginTop: -16,
      marginBottom: 16,
    },
  })

  if (!isVisible || !error) {
    return null
  }

  return <Text style={styles.error}>{error}</Text>
}

export default TextInputError

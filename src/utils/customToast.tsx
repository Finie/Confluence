import React from 'react'
import { StyleSheet, View } from 'react-native'

import Close from 'src/assets/icons/close.svg'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'

type CustomToastType = { text1: string }

export const SuccessToast: React.FC<CustomToastType> = props => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 9,
      backgroundColor: colors.green,
      borderRadius: 6,
    },
    text: {
      fontSize: 16,
      color: colors.black,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text1}</Text>
      <Close width={12} height={12} />
    </View>
  )
}

export const ErrorToast: React.FC<CustomToastType> = props => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 9,
      backgroundColor: colors.danger,
      borderRadius: 6,
    },
    text: {
      fontSize: 16,
      color: colors.black,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text1}</Text>
      <Close width={12} height={12} />
    </View>
  )
}

export const WarningToast: React.FC<CustomToastType> = props => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      padding: 9,
      backgroundColor: colors.warning,
      borderRadius: 6,
    },
    text: {
      fontSize: 16,
      color: colors.black,
    },
  })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.text1}</Text>
      <Close width={12} height={12} />
    </View>
  )
}

import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

import Button from '../Button'
import Text from '../Text'

type Props = {
  isShown: boolean
  onClose: () => void
}

const DialogItsMatch: React.FC<Props> = props => {
  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.loaderBackground,
      zIndex: 1,
    },
    lottie: {
      width: 300,
      height: 300,
    },
    itsamatch: {
      color: colors.accent,
      marginTop: -39,
    },
    close_btn: {
      marginTop: 40,
      height: 40,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      width: 100,
      borderRadius: 10,
    },
  })

  if (!props.isShown) {
    return null
  }

  return (
    <View style={styles.loading}>
      <AnimatedLottieView
        source={require('src/assets/animations/itsamatch.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />

      <Text type={'heading'} style={styles.itsamatch}>
        IT'S A MATCH
      </Text>

      <TouchableOpacity style={styles.close_btn} onPress={props.onClose}>
        <Text style={{ color: colors.white }}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DialogItsMatch

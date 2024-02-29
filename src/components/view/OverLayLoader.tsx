import AnimatedLottieView from 'lottie-react-native'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

type Props = {
  isLoading: boolean
}

const OverLayLoader: React.FC<Props> = props => {
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
      width: 120,
      height: 120,
    },
  })

  if (!props.isLoading) {
    return null
  }

  return (
    <View style={styles.loading}>
      <AnimatedLottieView
        source={require('src/assets/animations/loading.json')}
        autoPlay
        style={styles.lottie}
      />
    </View>
  )
}

export default OverLayLoader

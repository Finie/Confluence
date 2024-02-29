import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import Svg, { Circle, G } from 'react-native-svg'

import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  image: string
}

const ProfileOutline: React.FC<Props> = props => {
  const { colors } = useThemeStyles()

  const { image } = props

  const radius = 85
  const circleCircumference = 2 * Math.PI * radius

  const leftToSpendAmount = 20
  const targetAmount = 100

  const spentAmount = targetAmount - leftToSpendAmount
  const percentage = (spentAmount / targetAmount) * 100
  const strokeDashoffset =
    circleCircumference - (circleCircumference * percentage) / 100

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    graphWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      position: 'absolute',
      textAlign: 'center',
      fontWeight: '600',
      fontSize: 18,
      color: '#E5E5E5',
    },
    profile: {
      width: 160,
      height: 160,
      position: 'absolute',
      borderRadius: 80,
    },
  })
  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="190" width="190" viewBox="0 0 180 180">
          <G rotation={-270} originX="90" originY="90">
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={colors.background}
              fill="transparent"
              strokeWidth="8"
            />
            <Circle
              cx="50%"
              cy="50%"
              r={radius}
              stroke={colors.primary}
              fill="transparent"
              strokeWidth="8"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </G>
        </Svg>

        <Image source={{ uri: image }} style={styles.profile} />
      </View>
    </View>
  )
}

export default ProfileOutline

import React, { useRef } from 'react'
import { Animated, Image, Pressable, StyleSheet } from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'
import { CarouselItemParalax } from 'src/utils/shared-type'

type Props = {
  imageData: CarouselItemParalax
  onLongPress: () => void
}

const UserImageViewer: React.FC<Props> = ({
  imageData,
  onLongPress: onLongPressed,
}) => {
  console.log('============imageData========================')
  console.log(imageData)
  console.log('====================================')
  const { colors } = useThemeStyles()

  const scale_animation = useRef(new Animated.Value(1)).current

  const interpolated_scale_animation = scale_animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0.9, 1, 1.4],
  })

  const onPressIn = () => {
    Animated.timing(scale_animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }

  const onPressOut = () => {
    Animated.timing(scale_animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }

  const onLongPress = () => {
    onLongPressed()
    Animated.timing(scale_animation, {
      toValue: 2,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }

  const styles = StyleSheet.create({
    pressable: {
      height: 130,
      width: 100,
      overflow: 'hidden',
      borderRadius: 6,
      margin: 8,
    },
    container: {
      backgroundColor: colors.snow,
    },
    image: {
      height: 130,
      width: 100,
    },
  })

  return (
    <Pressable
      onPressOut={onPressOut}
      onPressIn={onPressIn}
      onLongPress={onLongPress}
      style={styles.pressable}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                scale: interpolated_scale_animation,
              },
            ],
          },
        ]}>
        <Image
          style={styles.image}
          source={{
            uri:
              imageData?.path ||
              'https://cdn-icons-png.flaticon.com/512/496/496415.png?w=1480&t=st=1686822728~exp=1686823328~hmac=537de452083ff2423e3979eaddf879d48a498a136dacb6addbb544efb396d13a',
          }}
        />
      </Animated.View>
    </Pressable>
  )
}

export default UserImageViewer

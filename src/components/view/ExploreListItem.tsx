import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Easing,
  ImageBackground,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import Text from '../Text'

type Props = {
  image: string
  size: number
  title: string
  onPress: () => void
}

const ExploreListItem: React.FC<Props> = ({ image, size, title, onPress }) => {
  const opacity = useRef(new Animated.Value(0)).current
  const scale = useRef(new Animated.Value(0)).current
  const scale_press = useRef(new Animated.Value(1)).current
  const shadow_opacity = useRef(new Animated.Value(0.1)).current
  const panMovements = useRef(new Animated.ValueXY()).current

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,

    onMoveShouldSetPanResponder: (evt, gestureState) => true,

    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: panMovements.x,
          dy: panMovements.y,
        },
      ],
      {
        useNativeDriver: false,
      },
    ),
    onPanResponderGrant: (evt, gestureState) => {
      // handleScaleAndOpacityUp()
    },
    onPanResponderRelease: (evt, gestureState) => {
      panMovements.extractOffset()
      // handleScaleandOpacityDown()
    },
    onPanResponderTerminate: (evt, gestureState) => true,
  })

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
        easing: Easing.ease,
      }),
    ]).start()
  }, [])

  const handleScaleAndOpacityUp = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: false,
      }),
      Animated.spring(shadow_opacity, {
        toValue: 0.8,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const handleScaleandOpacityDown = () => {
    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(shadow_opacity, {
        toValue: 0.2,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const animated_style = {
    opacity: opacity,
    transform: [
      {
        scale: scale,
      },
    ],
  }

  const container_style = {
    shadowOpacity: shadow_opacity,
    transform: [
      {
        scale: scale,
      },
      {
        translateY: panMovements.y,
      },
    ],
  }

  const styles = StyleSheet.create({
    container: {
      margin: 8,
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 16,
      overflow: 'hidden',
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    imagestyle: {
      width: 175,
      height: 175,
      alignItems: 'center',
      justifyContent: 'flex-end',
      paddingBottom: 20,
    },
  })

  const onPressIn = () => {
    handleScaleAndOpacityUp()
  }

  const onPressOut = () => {
    handleScaleandOpacityDown()
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}>
      <Animated.View
        style={[styles.container, animated_style, container_style]}>
        <ImageBackground style={styles.imagestyle} source={{ uri: image }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'white' }}>
            {title}
          </Text>
          <Text style={{ fontSize: 12, fontWeight: '600', color: 'white' }}>
            {+size === 1 ? '1 person' : `${size} people`}
          </Text>
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  )
}

export default ExploreListItem

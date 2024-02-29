import React, { useRef, useState } from 'react'
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  PanResponder,
  PanResponderGestureState,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { BantuProfile } from 'src/utils/shared-type'

type CardData = BantuProfile

type SwipeDirection = 'left' | 'right' | 'top'

const SCREEN_WIDTH = Dimensions.get('window').width
const SCREEN_HEIGHT = Dimensions.get('window').height
const CARD_WIDTH = SCREEN_WIDTH * 0.8
const CARD_HEIGHT = SCREEN_HEIGHT * 0.6
const SWIPE_THRESHOLD = 0.25 * SCREEN_WIDTH

const CustomSwipeCards = ({
  data,
  onSwipe,
}: {
  data: CardData
  onSwipe: (direction: SwipeDirection) => void
}) => {
  const [panResponderEnabled, setPanResponderEnabled] = useState(true)
  const [opacity, setOpacity] = useState(new Animated.Value(1))
  const [position, setPosition] = useState(new Animated.ValueXY({ x: 0, y: 0 }))

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => panResponderEnabled,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          forceSwipe('right')
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          forceSwipe('left')
        } else if (gesture.dy < -SWIPE_THRESHOLD) {
          forceSwipe('top')
        } else {
          resetPosition()
        }
      },
    }),
  ).current

  const forceSwipe = (direction: SwipeDirection) => {
    setPanResponderEnabled(false)
    Animated.timing(position, {
      toValue:
        direction === 'top'
          ? { x: 0, y: -SCREEN_HEIGHT }
          : { x: direction === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH, y: 0 },
      duration: 250,
      useNativeDriver: false,
    }).start(() => onSwipe(direction))
  }

  const resetPosition = () => {
    Animated.spring(position, {
      toValue: { x: 0, y: 0 },
      useNativeDriver: false,
    }).start()
  }

  const rotateCard = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  })

  const rotateLike = position.x.interpolate({
    inputRange: [0, SWIPE_THRESHOLD],
    outputRange: ['0deg', '-30deg'],
    extrapolate: 'clamp',
  })

  const rotateNope = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0],
    outputRange: ['30deg', '0deg'],
    extrapolate: 'clamp',
  })

  const swipeOpacity = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [0, 1, 0],
    extrapolate: 'clamp',
  })

  const swipeLabelX = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [-CARD_WIDTH / 2 - 30, 0, CARD_WIDTH / 2 + 30],
    extrapolate: 'clamp',
  })

  const swipeLabelY = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: [
      CARD_HEIGHT / 2 + 10,
      CARD_HEIGHT / 2 + 10,
      CARD_HEIGHT / 2 + 10,
    ],
    extrapolate: 'clamp',
  })

  const swipeLabelRotate = position.x.interpolate({
    inputRange: [-SWIPE_THRESHOLD, 0, SWIPE_THRESHOLD],
    outputRange: ['-30deg', '0deg', '30deg'],
    extrapolate: 'clamp',
  })

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    card: {
      width: CARD_WIDTH,
      height: CARD_HEIGHT,
      backgroundColor: 'white',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 5,
    },
    imageContainer: {
      flex: 1,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow: 'hidden',
    },
    image: {
      flex: 1,
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },
    cardTitle: {
      position: 'absolute',
      bottom: 10,
      left: 10,
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
    },
    cardDetails: {
      flex: 1,
      padding: 10,
    },
    cardText: {
      fontSize: 16,
      marginBottom: 10,
    },
    swipeOverlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#ebebeb',
    },
    swipeLabel: {
      position: 'absolute',
      bottom: 0,
      padding: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    },
    swipeLabelText: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#ffffff',
      backgroundColor: 'transparent',
      textAlign: 'center',
    },
    swipeLabelImage: {
      width: 100,
      height: 100,
      resizeMode: 'contain',
      tintColor: '#ffffff',
    },
    undoButton: {
      position: 'absolute',
      top: 20,
      right: 20,
      padding: 10,
      borderRadius: 5,
      backgroundColor: '#ffffff',
      borderWidth: 1,
      borderColor: '#999999',
    },
    undoButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333333',
    },
  })

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.card,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
              { rotate: rotateCard },
            ],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.imageContainer}>
          <Text style={styles.cardTitle}>
            {data.first_name} {data.last_name}, {data.age}
          </Text>
          <Animated.Image
            style={[styles.image, { opacity }]}
            source={{ uri: data.default_image }}
          />
        </View>
        <View style={styles.cardDetails}>
          <Text style={styles.cardText}>{data.bio}</Text>
          <Text style={styles.cardText}>{data.distance}</Text>
        </View>
      </Animated.View>
      <Animated.View
        style={[
          styles.swipeOverlay,
          {
            opacity: swipeOpacity,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.swipeLabel,
          {
            transform: [
              { translateX: swipeLabelX },
              { translateY: swipeLabelY },
              { rotate: swipeLabelRotate },
            ],
          },
        ]}>
        {position.x._value < 0 ? (
          <>
            <Animated.Text
              style={[
                styles.swipeLabelText,
                { transform: [{ rotate: rotateNope }] },
              ]}>
              Nope
            </Animated.Text>
            <Animated.Image
              style={[
                styles.swipeLabelImage,
                { transform: [{ rotate: rotateNope }] },
              ]}
              source={{
                uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqSr38EJQGzGSnEINuMbYtqnXLZ0EwRjufw&usqp=CAU',
              }}
            />
          </>
        ) : (
          <>
            <Animated.Image
              style={[
                styles.swipeLabelImage,
                { transform: [{ rotate: rotateLike }] },
              ]}
              source={{
                uri: 'https://images.stockx.com/images/Travis-Scott-Franchise-Promo-YUP-T-Shirt-White.jpg?fit=fill&bg=FFFFFF&w=700&h=500&fm=webp&auto=compress&q=90&dpr=2&trim=color&updated_at=1606346535',
              }}
            />
            <Animated.Text
              style={[
                styles.swipeLabelText,
                { transform: [{ rotate: rotateLike }] },
              ]}>
              Like
            </Animated.Text>
          </>
        )}
      </Animated.View>
      <TouchableOpacity
        style={styles.undoButton}
        onPress={() => {
          Animated.parallel([
            Animated.timing(position.x, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(position.y, {
              toValue: 0,
              duration: 250,
              useNativeDriver: false,
            }),
            Animated.timing(opacity, {
              toValue: 1,
              duration: 250,
              useNativeDriver: false,
            }),
          ]).start(() => setPanResponderEnabled(true))
        }}>
        <Text style={styles.undoButtonText}>Undo</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomSwipeCards

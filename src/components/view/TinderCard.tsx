import React, { useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

import { BantuProfile } from 'src/utils/shared-type'

interface TinderCardProps {
  item: BantuProfile
  onSwipeLeft: (item: any) => void
  onSwipeRight: (item: any) => void
  onSwipeTop: (item: any) => void
}

const CARD_WIDTH = 300
const CARD_HEIGHT = 400

const TinderCard = ({
  item,
  onSwipeLeft,
  onSwipeRight,
  onSwipeTop,
}: TinderCardProps) => {
  const [isUndo, setIsUndo] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cardIndex, setCardIndex] = useState(0)
  const swipeRef = useRef(null)

  const onSwipeComplete = (swipeDirection: string) => {
    if (swipeDirection === 'left') {
      onSwipeLeft(item)
    } else if (swipeDirection === 'right') {
      onSwipeRight(item)
    } else if (swipeDirection === 'top') {
      onSwipeTop(item)
    }
    setCardIndex(cardIndex + 1)
    setPosition({ x: 0, y: 0 })
    setIsUndo(false)
  }

  const onGestureEvent = (event: any) => {
    setPosition({
      x: event.nativeEvent.translationX,
      y: event.nativeEvent.translationY,
    })
  }

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      if (Math.abs(position.x) > CARD_WIDTH / 2) {
        const swipeDirection = position.x > 0 ? 'right' : 'left'
        onSwipeComplete(swipeDirection)
      } else if (Math.abs(position.y) > CARD_HEIGHT / 2) {
        onSwipeComplete('top')
      } else {
        setPosition({ x: 0, y: 0 })
      }
    }
  }

  const onUndo = () => {
    setIsUndo(true)
    setPosition({ x: 0, y: 0 })
  }

  return (
    <View style={styles.container}>
      {isUndo && (
        <TouchableOpacity style={styles.undoButton} onPress={onUndo}>
          <Text style={styles.undoText}>Undo</Text>
        </TouchableOpacity>
      )}
      <PanGestureHandler
        ref={swipeRef}
        onGestureEvent={onGestureEvent}
        onHandlerStateChange={onHandlerStateChange}>
        <View style={styles.cardContainer}>
          <Image
            source={{ uri: item.default_image }}
            style={styles.cardImage}
          />
          <Text style={styles.cardText}>
            {item.first_name} {item.last_name}, {item.age}
          </Text>
          <Text style={styles.cardDistance}>{item.distance}</Text>
        </View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  cardText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDistance: {
    marginTop: 5,
    fontSize: 16,
    textAlign: 'center',
  },
  undoButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: '#f8f8f8',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  undoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default TinderCard

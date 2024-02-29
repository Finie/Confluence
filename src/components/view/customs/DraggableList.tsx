import React, { useRef, useState } from 'react'
import {
  Animated,
  GestureResponderHandlers,
  LayoutAnimation,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface Item {
  id: number
  text: string
}

interface Props {
  items: Item[]
}

const DraggableList: React.FC<Props> = ({ items }) => {
  const [listItems, setListItems] = useState(items)
  const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null)

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt, gestureState) => {
        setCurrentItemIndex(getItemIndex(gestureState))
      },
      onPanResponderMove: (evt, gestureState) => {
        if (currentItemIndex !== null) {
          const nextItemIndex = getItemIndex(gestureState)
          if (nextItemIndex !== currentItemIndex) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            const newItems = swapArrayElements(
              listItems,
              currentItemIndex,
              nextItemIndex,
            )
            setListItems(newItems)
            setCurrentItemIndex(nextItemIndex)
          }
        }
      },
      onPanResponderRelease: () => {
        setCurrentItemIndex(null)
      },
    }),
  ).current

  const getItemIndex = (gestureState: any) => {
    const itemWidth = 120
    const itemHeight = 120
    const pageX = gestureState.moveX
    const pageY = gestureState.moveY
    const col = Math.floor(pageX / itemWidth)
    const row = Math.floor(pageY / itemHeight)
    const index = row * 3 + col
    return index < listItems.length ? index : listItems.length - 1
  }

  const animatedValues = listItems.map(() => ({
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
    translateX: new Animated.Value(0),
    translateY: new Animated.Value(0),
  }))

  const swapArrayElements = (arr: Item[], indexA: number, indexB: number) => {
    const newArr = [...arr]
    const temp = newArr[indexA]
    newArr[indexA] = newArr[indexB]
    newArr[indexB] = temp
    return newArr
  }

  return (
    <View style={styles.container}>
      {listItems.map((item, index) => {
        const row = Math.floor(index / 3)
        const col = index % 3
        const { opacity, scale, translateX, translateY } = animatedValues[index]

        const animatedStyle = {
          opacity,
          transform: [{ scale }, { translateX }, { translateY }],
        }

        const panHandlers: GestureResponderHandlers = panResponder.panHandlers

        return (
          <Animated.View
            key={item.id}
            style={[
              styles.item,
              animatedStyle,
              row !== 0 && { marginTop: 16 },
              col !== 0 && {
                marginLeft: col === 2 ? { marginRight: 16 } : null,
              },
            ]}
            {...panHandlers} // pass panHandlers as separate prop
          >
            <Text style={styles.itemText}>{item.text}</Text>
          </Animated.View>
        )
      })}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  item: {
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
})

export default DraggableList

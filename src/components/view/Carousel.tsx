import React, { useRef } from 'react'
import { Dimensions, Image, StyleSheet, View } from 'react-native'
import AnchorCarousel from 'react-native-anchor-carousel'

type Item = {
  id: string
  image: string
}

const width = Dimensions.get('screen').width

type CarouselProps = {
  data: Item[]
}

export type CarouselRef = {
  handleNext: () => void
  getCurrentIndex: () => number
}

const Carousel = React.forwardRef<CarouselRef, CarouselProps>((props, ref) => {
  const carouselRef = useRef<AnchorCarousel<Item>>(null)

  const handleNext = () => {
    carouselRef.current?.scrollToNext()
  }

  const getCurrentIndex = () => {
    return carouselRef.current?.currentIndex ?? 0
  }

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.item}>
      {/* Replace with your image component */}
      <Image style={[styles.image]} source={{ uri: item.image }} />
    </View>
  )

  return (
    <AnchorCarousel
      ref={carouselRef}
      data={props.data}
      renderItem={renderItem}
      containerWidth={width}
      itemWidth={250}
    />
  )
})

const styles = StyleSheet.create({
  item: {
    width: 250,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9c2ff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})

export default Carousel

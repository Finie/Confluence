declare module 'react-native-anchor-carousel' {
  import { Component } from 'react'
  import { ViewStyle, ImageStyle, TextStyle } from 'react-native'

  export interface CarouselProps<T> {
    data: T[]
    renderItem: (item: T, index: number) => JSX.Element
    itemWidth?: number
    itemHeight?: number
    separatorWidth?: number
    containerWidth: number
    initialIndex?: number
    style?: ViewStyle
    inActiveScale?: number
    inActiveOpacity?: number
    enableMomentum?: boolean
    decelerationRate?: 'fast' | 'normal'
    renderOverLay?: () => JSX.Element
    itemContainerStyle?: ViewStyle
    snapToAlignment?: 'start' | 'center' | 'end'
    onScrollEnd?: (event: { index: number }) => void
    onScrollBegin?: () => void
    vertical?: boolean
    showSpinner?: boolean
    spinnerColor?: string
    spinnerSize?: number
    spinnerType?: 'MaterialIndicator' | 'UIActivityIndicator'
    containerMarginHorizontal?: number
    minSwipeDistance?: number
    sneakPeak?: number
    snapToInterval?: number
    snapToOffsets?: number[]
    useScrollView?: boolean
    scrollToOverflowEnabled?: boolean
    slideInterpolatedStyle?: (
      index: number,
      animatedValue: any,
      carouselProps: CarouselProps<T>,
    ) => object
    onSnapToItem?: (slideIndex: number) => void
    animationConfig?: any
    contentContainerCustomStyle?: ViewStyle
    contentContainerStyle?: ViewStyle
    initialOffset?: {
      x: number
      y: number
    }
    contentOffset?: {
      x: number
      y: number
    }
  }

  export interface CarouselState {
    activeIndex: number
    previousIndex: number
  }

  export default class Carousel<T> extends Component<
    CarouselProps<T>,
    CarouselState
  > {
    scroll: any
    constructor(props: CarouselProps<T>)
    scrollToIndex(index: number, animated?: boolean): void
    handleScrollEnd: (event: {
      nativeEvent: { contentOffset: { x: number } }
    }) => void
  }
}

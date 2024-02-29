declare module 'react-native-swipeable' {
  import * as React from 'react'
  import { GestureResponderEvent, ViewStyle } from 'react-native'

  export interface SwipeableProperties {
    leftContent?: React.ReactNode
    rightContent?: React.ReactNode
    onSwipeLeft?: (event: GestureResponderEvent) => void
    onSwipeRight?: (event: GestureResponderEvent) => void
    onSwipeStart?: (event: GestureResponderEvent) => void
    onSwipeEnd?: (event: GestureResponderEvent) => void
    onRef?: (ref: any) => void
    style?: ViewStyle
    bounceLeft?: boolean
    bounceRight?: boolean
    leftThreshold?: number
    rightThreshold?: number
    overshootLeft?: boolean
    overshootRight?: boolean
    overshootFriction?: number
    useNativeAnimations?: boolean
  }

  export default class Swipeable extends React.Component<SwipeableProperties> {}
}

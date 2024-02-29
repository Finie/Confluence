declare module 'rn-wheel-picker' {
  import { Component } from 'react'

  interface WheelPickerProps {
    data: string[]
    onValueChange: (value: string, index: number) => void
    selectedItemTextColor?: string
    selectedItemTextSize?: number
    itemSpace?: number
    visibleItemCount?: number
    indicator?: boolean
    indicatorColor?: string
    indicatorSize?: number
    style?: any
  }

  class WheelPicker extends Component<WheelPickerProps> {}

  export default WheelPicker
}

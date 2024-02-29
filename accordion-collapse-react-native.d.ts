declare module 'accordion-collapse-react-native' {
  import { Component } from 'react'
  import { ViewStyle } from 'react-native'

  interface AccordionProps {
    style?: ViewStyle
    activeSection?: number | boolean
    sections: Array<{
      title: string
      content: React.ReactNode
    }>
    renderHeader?: (
      section: any,
      index: number,
      isActive: boolean,
    ) => React.ReactNode
    renderContent?: (
      section: any,
      index: number,
      isActive: boolean,
    ) => React.ReactNode
    onChange?: (index: number) => void
    duration?: number
    easing?: string
    initiallyActiveSection?: number | boolean
    underlayColor?: string
    touchableComponent?: Component<any>
    align?: string
    sectionContainerStyle?: ViewStyle
    expandMultiple?: boolean
    onAnimationEnd?: () => void
  }

  class Accordion extends Component<AccordionProps> {}

  export default Accordion
}

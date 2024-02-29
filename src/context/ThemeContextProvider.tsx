import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'
import { darkColor, lightColors } from 'src/theme'

import { ThemeColors } from 'src/theme/themes.types'

type ThemeData = {
  isDark: boolean
  colors: ThemeColors
  setScheme: (scheme: string) => void
}

export const ThemeContext = React.createContext<ThemeData>({
  isDark: true,
  colors: lightColors,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setScheme: (scheme: string) => {},
})

export const ThemeProvider = (props: {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
}) => {
  const colorScheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark')

  useEffect(() => {
    setIsDarkMode(colorScheme === 'dark')
  }, [colorScheme])

  const defaultTheme = {
    isDark: isDarkMode,
    colors: isDarkMode ? darkColor : lightColors,
    setScheme: (scheme: string) => setIsDarkMode(scheme === 'dark'),
  }

  return (
    <ThemeContext.Provider value={defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

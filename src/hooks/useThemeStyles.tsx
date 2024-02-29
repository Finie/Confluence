import React from 'react'
import { useContext } from 'react'
import { Text, View } from 'react-native'

import { ThemeContext } from 'src/context/ThemeContextProvider'

export const useThemeStyles = () => useContext(ThemeContext)

export default useThemeStyles

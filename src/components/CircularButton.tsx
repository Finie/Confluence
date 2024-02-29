import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import EditButton from 'src/assets/icons/editbutton.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

const CircularButton = ({ onClick }) => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      width: 90,
      height: 90,
      borderRadius: 45,
      backgroundColor: colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
    },
  })
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <EditButton />
    </TouchableOpacity>
  )
}

export default CircularButton

import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  title: string
  Icon: JSX.Element
  onClick: () => void
}
const ProfButton: React.FC<Props> = ({ title, Icon, onClick }) => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 30,
      paddingVertical: 22,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: colors.snow,
    },
    title: {
      color: colors.black,
    },
  })
  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {Icon}
    </TouchableOpacity>
  )
}

export default ProfButton

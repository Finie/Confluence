import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'

import ArrowRight from 'src/assets/icons/arrowright.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  title: string
  onPress: () => void
}

const SaftyHelpItemList: React.FC<Props> = ({ title, onPress }) => {
  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 20,
    },
    textstyle: {
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '400',
      color: colors.black,
    },
  })
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.textstyle}>{title}</Text>

      <ArrowRight />
    </TouchableOpacity>
  )
}

export default SaftyHelpItemList

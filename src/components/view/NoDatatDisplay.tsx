import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import HourGlass from 'src/assets/icons/hourglass.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from '../Text'

type Props = {
  mainHeader: string
  description: string
  actiontext: string
  onPress: () => void
}

const NoDatatDisplay: React.FC<Props> = ({
  mainHeader,
  description,
  actiontext,
  onPress,
}) => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      paddingHorizontal: 30,
      marginHorizontal: 30,
    },
    icon: {
      marginVertical: 56,
    },
    youdont: {
      fontSize: 24,
      lineHeight: 29,
      color: colors.black,
      textAlign: 'center',
      fontWeight: '600',
    },
    makefirst: {
      marginVertical: 20,
      textAlign: 'center',
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '400',
      color: colors.black,
    },
    seetodat: {
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
      color: colors.black,
    },
  })
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <HourGlass />
      </View>
      <Text style={styles.youdont}>{mainHeader}</Text>
      <Text style={styles.makefirst}>{description}</Text>

      <TouchableOpacity onPress={onPress}>
        <Text style={styles.seetodat}>{actiontext}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default NoDatatDisplay

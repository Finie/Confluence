import React from 'react'
import { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Checked from 'src/assets/icons/checkboxcheck.svg'
import Unchecked from 'src/assets/icons/checkboxunchek.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  index: number
  lastIndex: number
  item: { name: string; id: number }
  onItemAdded: () => void
  onItemUnselected: () => void
}

const MorePassionItem: React.FC<Props> = props => {
  const { index, lastIndex, onItemAdded, onItemUnselected, item } = props
  const [isSelected, setIsSelected] = useState(false)

  const onSwitchStates = () => {
    if (isSelected) {
      setIsSelected(!isSelected)
      onItemUnselected()
      return
    }

    setIsSelected(!isSelected)
    onItemAdded()
  }

  const isFirstElement = (index: number) => {
    if (index === 0) {
      return true
    }

    return false
  }

  const isLastElement = (index: number, length: number) => {
    if (index === length) {
      return true
    }

    return false
  }

  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    morecontainerisFirst: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    morecontainerisLast: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    morename: {
      marginLeft: 16,
      fontSize: 14,
      lineHeight: 17,
      color: colors.black,
    },
    morecontainer: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
    },
  })

  return (
    <TouchableOpacity
      onPress={onSwitchStates}
      style={
        isLastElement(index, lastIndex)
          ? styles.morecontainerisLast
          : isFirstElement(index)
          ? styles.morecontainerisFirst
          : styles.morecontainer
      }>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {isSelected ? <Checked /> : <Unchecked />}
        <Text style={styles.morename}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default MorePassionItem

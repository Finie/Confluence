import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import Add from 'src/assets/icons/add.svg'
import Check from 'src/assets/icons/checkpassion.svg'
import Info from 'src/assets/icons/infoicon.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from './Text'

type Props = {
  Icon?: JSX.Element
  label: string
  Inactive?: JSX.Element
  onItemAdded: () => void
  onItemRemoved: () => void
  isActive?: Boolean
}

const PassionItem: React.FC<Props> = props => {
  const { colors } = useThemeStyles()

  const {
    Icon,
    label,
    Inactive,
    onItemAdded,
    onItemRemoved,
    isActive = false,
  } = props

  const [isart, setisart] = useState(isActive)

  const onSwitchStates = () => {
    if (isart) {
      onItemRemoved()
      setisart(!isart)
      return
    }

    onItemAdded()
    setisart(!isart)
  }

  const styles = StyleSheet.create({
    selectioninactive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.text_bubble,
      padding: 10,
      borderRadius: 8,
      marginRight: 8,
      marginVertical: 5,
      height: 36,
    },
    selectionactive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 8,
      marginRight: 8,
      marginVertical: 5,
      height: 36,
    },
    selectiontexttypeinactive: {
      marginHorizontal: 16,
      fontSize: 12,
      lineHeight: 15,
      color: colors.black,
      fontWeight: '600',
    },
    selectiontexttypeactive: {
      marginHorizontal: 16,
      color: colors.white,
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '600',
    },
  })

  return (
    <TouchableOpacity
      onPress={onSwitchStates}
      style={isart ? styles.selectionactive : styles.selectioninactive}>
      {/* {Icon && (isart ? Inactive : Icon)} */}
      <Text
        style={
          isart
            ? styles.selectiontexttypeactive
            : styles.selectiontexttypeinactive
        }>
        {label}
      </Text>
      {isart ? <Check /> : <Add />}
    </TouchableOpacity>
  )
}

export default PassionItem

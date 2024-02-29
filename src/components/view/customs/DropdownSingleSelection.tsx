import React, { useContext, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { BottomSheet } from 'react-native-btr'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { isEmpty } from 'src/helper'

import DropdownIcon from 'src/assets/icons/dropdown.svg'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { SwipeData } from 'src/utils/shared-type'

interface DropdownProps {
  isLanguage?: boolean
  isLookFor?: boolean
  title?: string
  activeSelection: any[]
  options: any[]
  onSelected: (selectedItems: any) => void
}

const DropdownSingleSelection: React.FC<DropdownProps> = ({
  title = 'Select items...',
  options,
  activeSelection = [],
  onSelected,
}) => {
  const [selectedItems, setSelectedItems] = useState<any[]>(activeSelection)
  const [isVisible, setIsVisible] = useState(false)

  const { colors } = useThemeStyles()

  const handleSelect = (option: any) => {
    setSelectedItems([option])
    setIsVisible(false)
    onSelected(option)
  }

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: colors.silver,
      borderRadius: 4,
      padding: 8,
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
      marginVertical: 16,
    },
    sheet: {
      padding: 16,
      backgroundColor: colors.white,
      borderTopEndRadius: 16,
      borderTopStartRadius: 16,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 8,
    },
    optionText: {
      flex: 1,
    },
    selectedIcon: {
      fontSize: 20,
      color: 'green',
    },
    selected_item_text: {
      paddingVertical: 2,
      paddingHorizontal: 6,
      backgroundColor: colors.accent,
      borderRadius: 4,
      overflow: 'hidden',
      marginHorizontal: 2,
      fontSize: 14,
    },
    bottom_sheet_container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottom_sheet_holder: {
      height: 5,
      width: 50,
      backgroundColor: colors.silver,
      borderRadius: 5,
    },
    disclaimer: {
      backgroundColor: colors.white,
      color: colors.silver,
      fontSize: 10,
      paddingStart: 16,
    },
    title: {
      fontSize: 16,
    },
    title_holder: {
      flex: 1,
      flexDirection: 'row',
    },
  })

  const renderOption = (option: SwipeData, index: number) => (
    <TouchableOpacity
      key={index + option.id.toString()}
      style={styles.option}
      onPress={() => handleSelect(option)}>
      <Text style={styles.optionText}>{option.name}</Text>
      {selectedItems.includes(option) && (
        <Text style={styles.selectedIcon}>✔</Text>
      )}
    </TouchableOpacity>
  )

  return (
    <>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          setIsVisible(true)
        }}>
        <View style={styles.title_holder}>
          {isEmpty(selectedItems) ? (
            <Text type={'subheading'} style={styles.title}>
              {title}
            </Text>
          ) : (
            <Text style={styles.selected_item_text}>
              {selectedItems[0].name === 'MAN' ||
              selectedItems[0].name === 'WOMAN'
                ? `A ${selectedItems[0].name}`
                : selectedItems[0].name}
            </Text>
          )}
        </View>
        <View>
          <DropdownIcon />
        </View>
      </TouchableOpacity>
      <BottomSheet
        visible={isVisible}
        onBackButtonPress={() => {
          setIsVisible(false)
          if (!isEmpty(selectedItems)) {
            onSelected(selectedItems)
          }
        }}
        onBackdropPress={() => {
          setIsVisible(false)
          if (!isEmpty(selectedItems)) {
            onSelected(selectedItems)
          }
        }}>
        <View style={styles.sheet}>
          <View style={styles.bottom_sheet_container}>
            <View style={styles.bottom_sheet_holder} />
          </View>

          {options.map(renderOption)}
        </View>
        <Text style={styles.disclaimer} type={'caption'}>
          Tap to select or unselect
        </Text>
      </BottomSheet>
    </>
  )
}

export default DropdownSingleSelection

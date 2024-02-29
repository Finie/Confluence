import React, { useState } from 'react'
import {
  FlatList,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { BottomModal, ModalContent } from 'react-native-modals'
import { isEmpty } from 'src/helper'

import DropdownIcon from 'src/assets/icons/dropdown.svg'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'

interface DropdownHeightProps {
  isLanguage?: boolean
  isLookFor?: boolean
  title?: string
  activeSelection: string
  options: any[]
  onSelected: (selectedItems: any) => void
  onTriggerOnPress?: () => void
}

const DropdownHeight: React.FC<DropdownHeightProps> = ({
  title = 'Select items...',
  options,
  activeSelection,
  onSelected,
  onTriggerOnPress = null,
}) => {
  const [selectedItems, setSelectedItems] = useState<string>(activeSelection)
  const [isVisible, setIsVisible] = useState(false)

  const { colors } = useThemeStyles()

  const handleSelect = (option: any) => {
    setSelectedItems(option)
    setIsVisible(false)
    onSelected(option)
  }

  const getCurrentSelectedHeight = (selected: any): string => {
    let result = activeSelection
    options.filter((items: { id: string; label: string }) => {
      if (items.id === selected.id) {
        result = items.label
      }
    })
    return result
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

  return (
    <>
      <TouchableOpacity
        style={styles.input}
        onPress={() => {
          if (onTriggerOnPress) {
            onTriggerOnPress()
          }
          if (Platform.OS === 'android') {
            setIsVisible(true)
          }
        }}>
        <View style={styles.title_holder}>
          {isEmpty(selectedItems) ? (
            <Text type={'subheading'} style={styles.title}>
              {title}
            </Text>
          ) : (
            <Text style={styles.selected_item_text}>
              {getCurrentSelectedHeight(selectedItems)}
            </Text>
          )}
        </View>
        <View>
          <DropdownIcon />
        </View>
      </TouchableOpacity>
      <BottomModal
        visible={isVisible}
        onTouchOutside={() => setIsVisible(false)}
        height={0.9}
        width={1}
        onSwipeOut={() => setIsVisible(false)}>
        <ModalContent>
          <View style={styles.sheet}>
            <View style={styles.bottom_sheet_container}>
              <View style={styles.bottom_sheet_holder} />
            </View>
            <ScrollView>
              <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item)}>
                    <Text style={styles.optionText}>{item.label}</Text>
                    {selectedItems === item.id && (
                      <Text style={styles.selectedIcon}>✔</Text>
                    )}
                  </TouchableOpacity>
                )}
              />
            </ScrollView>
          </View>
          <Text style={styles.disclaimer} type={'caption'}>
            Tap to select or unselect
          </Text>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default DropdownHeight

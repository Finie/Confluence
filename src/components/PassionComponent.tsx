/* eslint-disable semi */
import React, { useContext, useState } from 'react'
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { BottomModal, ModalContent } from 'react-native-modals'
import {
  isEmpty,
  searchPassionByName,
  shiftItemToFirstPosition,
} from 'src/helper'

import BackButton from 'src/assets/icons/backbutton.svg'
import BaseContextProvider from 'src/context/BaseContextProvider'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { SearchPassionItem, UserProfile } from 'src/utils/shared-type'

import FloatingLabelInput from './FloatingLabelInput'
import PassionItem from './PassionItem'

type Props = {
  passion: any
  updatedPassions: any
  setupdatedPassions: any
  updatedPassionsRemote: any
  setUpdatedPassionsRemote: any
  onPassionReordered: (passion: any) => void
  onMoreClicked: () => void
  isButtonDisabled: boolean
  onUpdatePassion: (data: { id: string; name: string }) => void
  onDeletePassion: (data: { id: string; name: string }) => void
}

const PassionComponent: React.FC<Props> = ({
  passion,
  updatedPassions,
  setupdatedPassions,
  updatedPassionsRemote,
  setUpdatedPassionsRemote,
  onPassionReordered,
  onMoreClicked,
  isButtonDisabled,
  onUpdatePassion,
  onDeletePassion,
}) => {
  const { colors } = useThemeStyles()
  const [modalVisible, setModalVisible] = useState(false)
  //@ts-ignore
  const { userData } = useContext(BaseContextProvider)
  const [updatedSearch, setUpdatedSearch] = useState<SearchPassionItem[]>([])
  const userProfile: UserProfile = userData
  const [searchText, setSearchText] = useState<string>('')

  const isSelectedPassion = (currentId: string) => {
    let isPresent = false
    if (!isEmpty(userProfile)) {
      userProfile.profile.bio.passions.filter((passionItem: { id: string }) => {
        if (currentId === passionItem.id) {
          isPresent = true
        }
      })
    }

    if (!isEmpty(updatedPassions)) {
      updatedPassions.filter((passionItem: { id: string }) => {
        if (currentId === passionItem.id) {
          isPresent = true
        }
      })
    }
    return isPresent
  }

  const onRemoveItem = (data: { id: string; name: string }) => {
    return updatedPassions.filter((item: { id: string; name: string }) => {
      return item !== data
    })
  }

  const handleSearchPassion = (text: string) => {
    setSearchText(text)
    const searchArray = searchPassionByName(passion, text)

    if (text.length > 0) {
      setUpdatedSearch(searchArray)
    }
  }

  const noResultsFound = (): boolean => {
    return searchText.length > 0 && isEmpty(updatedSearch)
  }

  const styles = StyleSheet.create({
    biosection: {
      marginTop: 20,
    },

    passion: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    see_more_passions: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
      width: '50%',
      borderWidth: 1,
      borderColor: colors.primary,
      borderRadius: 100,
      marginVertical: 16,
    },
    see_more_passions_text: {
      color: colors.primary,
    },
    modal_content: { flex: 1 },
    floatview: {
      paddingVertical: 4,
    },
    pash: { marginTop: 20 },
    pash2: { marginTop: 20, flexDirection: 'row' },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.snow,
      padding: 5,
      borderRadius: 10,
    },
    mustpick: { marginLeft: 16, fontSize: 12, lineHeight: 14 },
    mustpick_error: {
      marginLeft: 16,
      fontSize: 12,
      lineHeight: 14,
      color: colors.danger,
    },
  })

  return (
    <>
      <View style={styles.biosection}>
        <View>
          {/* @ts-ignore  */}

          <FlatList
            data={passion.slice(0, 6)}
            keyExtractor={(item, index) => index + '' + item.id.toString()}
            renderItem={({ item }) => (
              <PassionItem
                label={item.name}
                onItemRemoved={() => {
                  if (!isButtonDisabled) {
                    onDeletePassion(item)
                  }
                  const result = onRemoveItem(item) // @ts-ignore
                  setupdatedPassions(result) // @ts-ignore
                }}
                onItemAdded={() => {
                  if (!isButtonDisabled) {
                    onUpdatePassion(item)
                  }
                  // updatedPassions.push(item) // @ts-ignore
                }}
                isActive={isSelectedPassion(item.id)}
              />
            )}
            numColumns={2}
          />

          <TouchableOpacity
            style={styles.see_more_passions}
            onPress={() => {
              if (Platform.OS === 'android') {
                setModalVisible(true)
              } else {
                onMoreClicked()
              }
            }}>
            <Text style={styles.see_more_passions_text}>See more passions</Text>
          </TouchableOpacity>
        </View>
      </View>

      <BottomModal
        visible={modalVisible}
        // onTouchOutside={() => setModalVisible(false)}
        height={0.8}
        width={1}
        onSwipeOut={() => {
          setModalVisible(false)
          setSearchText('')
          setUpdatedSearch([])
        }}>
        <ModalContent style={styles.modal_content}>
          <View>
            <TouchableOpacity
              //    eslint-disable-next-line react-native/no-inline-styles
              style={{ padding: 8 }}
              onPress={() => {
                setSearchText('')
                setUpdatedSearch([])
                setModalVisible(false)
              }}>
              <BackButton />
            </TouchableOpacity>
          </View>

          <Text
            //  eslint-disable-next-line react-native/no-inline-styles
            style={{ marginVertical: 8, fontSize: 26, color: colors.black }}>
            Passions
          </Text>

          <Text>Select or search for any passions</Text>

          <View style={styles.floatview}>
            <FloatingLabelInput
              placeholder={'Search'}
              onChangeText={handleSearchPassion}
              onBlur={() => {}}
            />
          </View>

          <View //  eslint-disable-next-line react-native/no-inline-styles
            style={{ flex: 1 }}>
            {noResultsFound() && (
              <View //  eslint-disable-next-line react-native/no-inline-styles
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  //  eslint-disable-next-line react-native/no-inline-styles
                  style={{
                    fontSize: 16,
                    fontWeight: '700',
                    color: colors.silver,
                  }}>{`No result found for ${searchText}`}</Text>
              </View>
            )}
            <>
              {!noResultsFound() && (
                <FlatList
                  data={isEmpty(updatedSearch) ? passion : updatedSearch}
                  keyExtractor={(item, index) =>
                    index + '' + item.id.toString()
                  }
                  renderItem={({ item }) => (
                    <PassionItem
                      label={item.name}
                      onItemRemoved={() => {
                        if (!isButtonDisabled) {
                          onDeletePassion(item)
                        }
                        const result = onRemoveItem(item) // @ts-ignore
                        setupdatedPassions(result) // @ts-ignore
                        setUpdatedPassionsRemote(result)
                      }}
                      onItemAdded={() => {
                        if (!isButtonDisabled) {
                          onUpdatePassion(item)
                        }
                        // updatedPassions.push(item) // @ts-ignore
                        updatedPassionsRemote.push(item)

                        const shift = shiftItemToFirstPosition(passion, item)
                        onPassionReordered(shift)
                      }}
                      isActive={isSelectedPassion(item.id)}
                    />
                  )}
                  numColumns={2}
                />
              )}
            </>
          </View>
          <TouchableOpacity
            //  eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 30,
              height: 48,
              borderRadius: 30,
            }}
            onPress={() => {
              setSearchText('')
              setUpdatedSearch([])
              setModalVisible(false)
            }}>
            <Text
              style={{
                color: colors.white,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default PassionComponent

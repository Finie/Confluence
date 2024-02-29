/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { isEmpty } from 'src/helper'

import BackButton from 'src/assets/icons/backbutton.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

type Props = {
  height: any
  setUpdatedHeight: any
  onEditHeightClosed: () => void
}

const EditHeightIos: React.FC<Props> = ({
  height,
  setUpdatedHeight,
  onEditHeightClosed,
}) => {
  const { colors } = useThemeStyles()
  //@ts-ignore
  const [updatedSearch, setUpdatedSearch] = useState<
    { id: string; label: string }[]
  >([])
  const [searchText, setSearchText] = useState<string>('')

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
    safe_area: {
      paddingHorizontal: 20,
    },
  })
  return (
    <SafeAreaView style={styles.safe_area}>
      <>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            //    eslint-disable-next-line react-native/no-inline-styles
            style={{ padding: 8 }}
            onPress={() => {
              setSearchText('')
              setUpdatedSearch([])
              onEditHeightClosed()
            }}>
            <BackButton />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 32,
              color: colors.black,
              fontWeight: '700',
            }}>
            Select your height
          </Text>
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
                style={{
                  fontSize: 16,
                  fontWeight: '700',
                  color: colors.silver,
                }}>{`No result found for ${searchText}`}</Text>
            </View>
          )}
          <View style={{ marginTop: 30 }}>
            {!noResultsFound() && (
              <FlatList
                data={isEmpty(updatedSearch) ? height : updatedSearch}
                keyExtractor={(item, index) => index + '' + item.id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={{
                      padding: 12,
                      backgroundColor: colors.snow,
                      marginVertical: 4,
                    }}
                    onPress={() => {
                      setUpdatedHeight(item)
                      onEditHeightClosed()
                    }}>
                    <Text style={{ fontSize: 16, fontWeight: '500' }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 30,
            height: 48,
            borderRadius: 30,
            marginVertical: 30,
          }}
          onPress={() => {
            setSearchText('')
            setUpdatedSearch([])
            onEditHeightClosed()
          }}>
          <Text
            //  eslint-disable-next-line react-native/no-inline-styles
            style={{
              color: colors.white,
            }}>
            Close
          </Text>
        </TouchableOpacity>
      </>
    </SafeAreaView>
  )
}

export default EditHeightIos

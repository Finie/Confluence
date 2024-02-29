/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { getAccroNames, isEmpty } from 'src/helper'

import MessageOutline from 'src/assets/icons/messageoutline.svg'
import StarOutline from 'src/assets/icons/startoutline.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { UserMatchType } from 'src/utils/shared-type'

import Text from '../Text'

type Props = {
  isNew?: boolean
  data: any
  onPress: () => void
}

const MatchItem: React.FC<Props> = props => {
  const { colors } = useThemeStyles()

  const { isNew, data, onPress } = props

  const user: UserMatchType = data

  const styles = StyleSheet.create({
    image: { width: 45, height: 45, borderRadius: 28, overflow: 'hidden' },
    container: {
      flexDirection: 'row',
      paddingVertical: 6,
    },
    centercontainer: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 16,
      flexDirection: 'row',
    },
    newcontainer: {
      height: 35,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 30,
      marginHorizontal: 16,
    },
    newtext: {
      color: colors.white,
      padding: 6,
    },
    endconatiner: {
      flexDirection: 'row',
    },
    touchable: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      padding: 12,
    },
    nameitem: {
      fontSize: 16,
      lineHeight: 20,
      color: colors.black,
      fontWeight: '600',
    },
  })
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        {isEmpty(user.user.default_image) ? (
          <View
            style={{
              backgroundColor: colors.snow,
              width: 45,
              height: 45,
              borderRadius: 28,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                color: colors.primary,
                lineHeight: 22,
              }}>
              {getAccroNames(data.user.first_name, data.user.last_name)}
            </Text>
          </View>
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: user.user.default_image,
            }}
          />
        )}
      </View>

      <View style={styles.centercontainer}>
        <Text
          style={
            styles.nameitem
          }>{`${user.user.first_name}  ${user.user.last_name}`}</Text>

        {isNew && (
          <View style={styles.newcontainer}>
            <Text style={styles.newtext}>New</Text>
          </View>
        )}
      </View>

      <View style={styles.endconatiner}>
        <TouchableOpacity style={styles.touchable}>
          <StarOutline />
        </TouchableOpacity>

        <TouchableOpacity onPress={onPress} style={styles.touchable}>
          <MessageOutline />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

export default MatchItem

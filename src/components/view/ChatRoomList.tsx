import moment from 'moment'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { getAccroNames, isEmpty } from 'src/helper'

import LeftSwipeIcon from 'src/assets/icons/leftswipeicon.svg'
import RightSwipable from 'src/assets/icons/rightswipable.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { ChatRoomListItem } from 'src/utils/shared-type'

import Text from '../Text'

type Props = {
  data: ChatRoomListItem

  index: number
  onClick: () => void
}

const ChatListItem: React.FC<Props> = ({ data, index, onClick }) => {
  const { colors } = useThemeStyles()

  let row: Array<any> = []
  let prevOpenedRow

  const onRenderLeftAction = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity style={styles.leftswipe}>
        <LeftSwipeIcon />
      </TouchableOpacity>
    )
  }

  const renderRightActions = (progress, dragX, onClick) => {
    return (
      <TouchableOpacity style={styles.rightswipable}>
        <RightSwipable />
      </TouchableOpacity>
    )
  }

  const closeRow = index => {}

  const styles = StyleSheet.create({
    rightswipable: {
      backgroundColor: colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
    },
    leftswipe: {
      backgroundColor: colors.warning,
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
    },
    touchableOpacity: {
      flexDirection: 'row',
      paddingHorizontal: 30,
      backgroundColor: colors.white,
      height: 90,
    },
    image: {
      width: 56,
      height: 56,
      borderRadius: 28,
    },

    imageContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    centercontainer: {
      flex: 4,
      paddingHorizontal: 16,
      justifyContent: 'center',
      marginBottom: 6,
    },
    endcontainer: {
      flex: 1,
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
    numberholder: {
      backgroundColor: colors.primary,
      width: 20,
      height: 20,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 6,
    },
    numberofunred: {
      color: colors.white,
      fontSize: 12,
      lineHeight: 14,
    },
    name: {
      fontSize: 20,
      lineHeight: 24,
      color: colors.black,
      fontWeight: '600',
      marginBottom: 6,
    },
    message: {
      fontSize: 12,
      lineHeight: 16,
    },
    time: {
      fontSize: 12,
      lineHeight: 14,
    },
    timewraper: {
      height: 40,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  })
  return (
    <Swipeable
      renderLeftActions={onRenderLeftAction}
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => closeRow(index)}
      ref={ref => (row[index] = ref)}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onClick}>
        <View style={styles.imageContainer}>
          {!isEmpty(data.user?.default_image) ? (
            <Image
              style={styles.image}
              source={{ uri: data.user?.default_image }}
            />
          ) : (
            <View
              style={{
                backgroundColor: colors.snow,
                width: 56,
                height: 56,
                borderRadius: 28,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 25,
                  fontWeight: '600',
                  color: colors.primary,
                  lineHeight: 30,
                }}>
                {getAccroNames(data.user.first_name, data.user.last_name)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.centercontainer}>
          <Text numberOfLines={1} style={styles.name}>
            {`${data.user.first_name} ${data.user.last_name}`}
          </Text>
          <Text numberOfLines={1} style={styles.message}>
            {data.user.username}
          </Text>
        </View>
        <View style={styles.endcontainer}>
          <View style={styles.timewraper}>
            {data.unread > 0 && (
              <View style={styles.numberholder}>
                <Text numberOfLines={1} style={styles.numberofunred}>
                  {data.user.bio}
                </Text>
              </View>
            )}

            <Text numberOfLines={1} style={styles.time}>
              {moment(data.user.last_modified_on).format('HH:mm')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default ChatListItem

/* eslint-disable import/order */

/* eslint-disable semi */

/* eslint-disable react-native/no-inline-styles */
import moment from 'moment'
import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { getAccroNames } from 'src/helper'

import LeftSwipeIcon from 'src/assets/icons/leftswipeicon.svg'
// import RightSwipable from 'src/assets/icons/rightswipable.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { ChatRoomListItem } from 'src/utils/shared-type'

import Text from '../Text'

type Props = {
  data: ChatRoomListItem
  index: number
  onClick: () => void
  closeRow: (item: ChatRoomListItem) => void
}

const SwipeableChatList: React.FC<Props> = ({
  data,
  index,
  onClick,
  closeRow,
}) => {
  const { colors } = useThemeStyles()

  const row: any[] = []
  let prevOpenedRow: { close: () => void }

  const onRenderLeftAction = (_progress: any, _dragX: any, _onClick: any) => {
    return (
      <TouchableOpacity style={styles.leftswipe}>
        <LeftSwipeIcon />
      </TouchableOpacity>
    )
  }

  const renderRightActions = (_progress: any, _dragX: any, _onClick: any) => {
    return (
      <TouchableOpacity style={styles.rightswipable}>
        {/* <RightSwipable /> */}
      </TouchableOpacity>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const closedRow = (index: number) => {
    if (prevOpenedRow && prevOpenedRow !== row[index]) {
      prevOpenedRow.close()
    }
    closeRow(data)
    prevOpenedRow = row[index]
  }

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
      height: 60,
    },
    image: {
      width: 45,
      height: 45,
      borderRadius: 30,
      overflow: 'hidden',
    },

    imageContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    centercontainer: {
      flex: 4,
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
      fontSize: 16,
      lineHeight: 24,
      color: colors.black,
      fontWeight: '600',
      marginBottom: 2,
    },
    message: {
      fontSize: 12,
      lineHeight: 16,
      color: colors.silver,
    },
    time: {
      fontSize: 12,
      lineHeight: 14,
      color: colors.silver,
    },
    timewraper: {
      height: 40,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  })
  return (
    <Swipeable
      //@ts-ignore
      renderLeftActions={onRenderLeftAction}
      renderRightActions={renderRightActions}
      onSwipeableOpen={() => closedRow(index)}
      ref={ref => (row[index] = ref)}>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onClick}>
        <View style={styles.imageContainer}>
          {data.user.default_image ? (
            <Image
              style={styles.image}
              source={{ uri: data.user.default_image }}
            />
          ) : (
            <View
              style={{
                backgroundColor: colors.snow,
                width: 45,
                height: 45,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '700',
                  color: colors.primary,
                  lineHeight: 22,
                }}>
                {getAccroNames(data.user.first_name, data.user.last_name)}
              </Text>
            </View>
          )}
        </View>
        <View style={styles.centercontainer}>
          <Text
            //@ts-ignore
            numberOfLines={1}
            style={styles.name}>
            {`${data.user.first_name}`}
          </Text>
          <Text //@ts-ignore
            numberOfLines={1}
            style={styles.message}>
            {`@${data.user.username}`}
          </Text>
        </View>
        <View style={styles.endcontainer}>
          <View style={styles.timewraper}>
            {data.unread_count > 0 && (
              <View style={styles.numberholder}>
                <Text
                  //@ts-ignore
                  numberOfLines={1}
                  style={styles.numberofunred}>
                  {data.unread_count}
                </Text>
              </View>
            )}

            <Text
              //@ts-ignore
              numberOfLines={1}
              style={styles.time}>
              {/* @ts-ignore */}
              {moment(data.user.last_modified_on).format('MMM hh:mm')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </Swipeable>
  )
}

export default SwipeableChatList

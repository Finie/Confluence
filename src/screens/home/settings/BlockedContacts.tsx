import { useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { isEmpty } from 'src/helper'

import homeRouter from 'src/api/routers/homeRouter'
import BackButton from 'src/assets/icons/backbutton.svg'
import FloatingLabelInput from 'src/components/FloatingLabelInput'
import OverLayLoader from 'src/components/view/OverLayLoader'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { BlockedItem } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'BlockedContacts'>

const BlockedContacts: React.FC<ScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { colors } = useThemeStyles()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [blockedUsers, setBlockedUsers] = useState<BlockedItem[]>()
  useEffect(() => {
    if (isFocused) {
      handleFetchUsers()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused])

  const handleFetchUsers = useCallback(async () => {
    const response = await homeRouter.getBlockedUsers()

    console.log('====================================')
    console.log(JSON.stringify(response.data.data.data))
    console.log('====================================')

    if (response.ok) {
      //@ts-ignore
      setBlockedUsers(response.data.data.data)
    } else {
      //@ts-ignore
      Alert.alert('Request Failed', response.data?.message)
    }
  }, [])

  const onSearcBlockedContact = useCallback(
    (text: string) => {
      const result = blockedUsers?.filter(user => {
        if (
          `${user.user_swiped.first_name}${user.user_swiped.last_name}`.includes(
            text,
          )
        ) {
          return user
        }
      })

      setBlockedUsers(result)
    },
    [blockedUsers],
  )

  const unBlockContact = useCallback(
    async (item: BlockedItem) => {
      setIsLoading(true)
      const response = await homeRouter.unblockUsers({
        username: item.user_swiped.username,
        status: 'LIKE',
      })
      setIsLoading(false)

      if (response.ok) {
        handleFetchUsers()

        //@ts-ignore
        Alert.alert('Request Successful', response.data.message)
      } else {
        handleFetchUsers()
        //@ts-ignore
        Alert.alert('Request failed', response.data.message)
      }
    },
    [handleFetchUsers],
  )

  const styles = StyleSheet.create({
    flatlist: {
      marginTop: StatusBar.currentHeight,
      marginHorizontal: 30,
      backgroundColor: colors.white,
    },
    search_container: {
      marginVertical: 8,
    },
    image_url: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.snow,
      justifyContent: 'center',
      alignItems: 'center',
    },
    item_container: {
      flexDirection: 'row',
    },
    container: {
      flex: 1,
      paddingStart: 8,
      justifyContent: 'center',
    },
    container_right: {
      padding: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    container_left: {
      padding: 8,
    },
    placeholder: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: colors.snow,
      justifyContent: 'center',
      alignItems: 'center',
    },
    unblock: {
      color: colors.primary,
      fontWeight: '700',
    },
    initials: {
      fontWeight: '700',
    },
    name_text: {
      fontWeight: '600',
    },
    overall: {
      backgroundColor: colors.white,
      flex: 1,
    },
    app_bar: {
      flexDirection: 'row',
      marginVertical: 16,
    },
    blocked_contact: {
      marginStart: 16,
      fontWeight: '700',
      fontSize: 16,
    },
  })

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item_container}>
        <View style={styles.container_left}>
          {!isEmpty(item.default_image) ? (
            <Image
              style={styles.image_url}
              source={{
                uri: item.default_image,
              }}
            />
          ) : (
            <View style={styles.placeholder}>
              <Text
                style={
                  styles.initials
                }>{`${item.user_swiped.first_name.substring(
                0,
                1,
              )}${item.user_swiped.last_name.substring(0, 1)}`}</Text>
            </View>
          )}
        </View>
        <View style={styles.container}>
          <Text
            style={
              styles.name_text
            }>{`${item.user_swiped.first_name} ${item.user_swiped.last_name}`}</Text>
        </View>
        <TouchableOpacity
          style={styles.container_right}
          onPress={() => unBlockContact(item)}>
          <Text style={styles.unblock}>Unblock →</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.overall}>
      <OverLayLoader isLoading={isLoading} />
      <FlatList
        style={styles.flatlist}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.search_container}>
            <View style={styles.app_bar}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackButton />
              </TouchableOpacity>

              <View>
                <Text style={styles.blocked_contact}>Blocked Contacts</Text>
              </View>
              <View></View>
            </View>
            <FloatingLabelInput
              placeholder={'Search ...'}
              onChangeText={onSearcBlockedContact}
              onBlur={function (): void {}}
            />
          </View>
        }
        data={blockedUsers}
        keyExtractor={index => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  )
}

export default BlockedContacts

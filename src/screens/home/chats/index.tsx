/* eslint-disable semi */

/* eslint-disable import/order */

/* eslint-disable react-native/no-inline-styles */
import { CompositeScreenProps, useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { isEmpty, searchChatRoomListItems } from 'src/helper'
import utils from 'src/utils'

import chatRouter from 'src/api/routers/chatRouter'
import HumberButton from 'src/assets/icons/humberbutton.svg'
import FloatingLabelInput from 'src/components/FloatingLabelInput'
import Text from 'src/components/Text'
import NoDatatDisplay from 'src/components/view/NoDatatDisplay'
import OverLayLoader from 'src/components/view/OverLayLoader'
import SwipeableChatList from 'src/components/view/SwipeAbleChatList'
import useThemeStyles from 'src/hooks/useThemeStyles'
import {
  MainStackParamList,
  TabNavigatorParamList,
} from 'src/routes/navigation.type'
import { ChatRoomListItem } from 'src/utils/shared-type'

type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<MainStackParamList, 'ChatRoomList'>,
  NativeStackScreenProps<TabNavigatorParamList, 'Match'>
>

const ChatRoomsList: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [chatroomList, setChatroomList] = useState<ChatRoomListItem[]>([])
  const [filteredChatroomList, setFilteredChatroomList] = useState<
    ChatRoomListItem[]
  >([])
  const [searchText, setSearchText] = useState<string>('')

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const isFocused = useIsFocused()

  useEffect(() => {
    const fetchChatrooms = async () => {
      setIsLoading(true)
      const response = await chatRouter.getMessageChatRooms()
      setIsLoading(false)

      if (response.ok) {
        //@ts-ignore
        setChatroomList(response.data.data)
        return
      }

      return utils.showToastMessage(
        //@ts-ignore
        `Could not load chats: ${response.data.message}`,
        'ERROR',
      )
    }
    if (isFocused) {
      fetchChatrooms()
    }
  }, [isFocused])

  const onSearchChatRoom = useCallback(
    (_searchText: string) => {
      setSearchText(_searchText)
      const result = searchChatRoomListItems(_searchText, chatroomList)
      setFilteredChatroomList(result)
    },
    [chatroomList],
  )

  const styles = StyleSheet.create({
    scroll_bars: {
      // paddingTop: StatusBar.currentHeight,
    },
    scrollview: {
      flexGrow: 1,
      backgroundColor: colors.white,
    },
    header_container: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingHorizontal: 30,
    },
    title: {
      fontSize: 18,
      fontWeight: '700',
    },
    floating_input_container: {
      marginVertical: 16,
      marginHorizontal: 30,
    },
    nochats_container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <SafeAreaView
      style={{
        flexGrow: 1,
        marginBottom: -160,
        backgroundColor: colors.white,
      }}>
      <ScrollView
        style={styles.scroll_bars}
        contentContainerStyle={styles.scrollview}>
        <OverLayLoader isLoading={isLoading} />
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <View style={styles.header_container}>
          <Text type={'heading'} style={styles.title}>
            Chats
          </Text>

          <TouchableOpacity>
            <HumberButton />
          </TouchableOpacity>
        </View>
        <View style={styles.floating_input_container}>
          <FloatingLabelInput
            placeholder={'Search ...'}
            onChangeText={onSearchChatRoom}
            onBlur={function (): void {}}
          />
        </View>

        {searchText.length > 0 ? (
          <>
            {!isEmpty(filteredChatroomList) ? (
              filteredChatroomList.map((chatroom, index) => (
                <SwipeableChatList
                  data={chatroom}
                  index={index}
                  onClick={function (): void {
                    navigation.navigate('ChatRoom', {
                      from: 'CHATS',
                      request: null,
                      chathead: chatroom,
                    })
                  }}
                />
              ))
            ) : (
              <View style={styles.nochats_container}>
                <Text
                  type={'heading'}
                  style={{
                    color: colors.silver,
                    fontSize: 20,
                    fontWeight: '700',
                  }}>
                  User not found
                </Text>
              </View>
            )}
          </>
        ) : (
          <>
            {!isEmpty(chatroomList) ? (
              chatroomList.map((chatroom, index) => (
                <SwipeableChatList
                  data={chatroom}
                  index={index}
                  onClick={function (): void {
                    navigation.navigate('ChatRoom', {
                      from: 'CHATS',
                      request: null,
                      chathead: chatroom,
                    })
                  }}
                />
              ))
            ) : (
              <View style={styles.nochats_container}>
                <NoDatatDisplay
                  mainHeader={'You don’t have any chats yet'}
                  description={
                    'Make the first move. Send a message to someone you’ve matched with and get the conversation going.'
                  }
                  actiontext={'See Your Matches →'}
                  onPress={function (): void {
                    navigation.navigate('Match')
                  }}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default ChatRoomsList

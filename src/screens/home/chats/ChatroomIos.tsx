import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  getAccroNames,
  getCurrentDate,
  isEmpty,
  sortItemsByIncreasingId,
} from 'src/helper'
import { TextEncoder } from 'text-encoding'

import chatRouter from 'src/api/routers/chatRouter'
import BackButton from 'src/assets/icons/backbutton.svg'
import SendIcon from 'src/assets/icons/sendicon.svg'
import Text from 'src/components/Text'
import OverLayLoader from 'src/components/view/OverLayLoader'
import BaseContextProvider from 'src/context/BaseContextProvider'
import useStompSocket from 'src/hooks/useStompSocket'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { SavedProfile } from 'src/utils/shared-type'

interface Message {
  content: string
  created_on: string
  id: number
  sender: string
  receiver: string
  type: string
}

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'ChatRoomIos'>

const ChatroomIos: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const { request, from, chathead } = route.params
  const encoder = new TextEncoder()
  const encodedData = encoder.encode('some text')
  const { userData } = useContext(BaseContextProvider)
  const userProfile: SavedProfile = userData

  const getUsername = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.user_swiped.username
    }
    return chathead?.user.username
  }

  const getFirstName = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.user_swiped.first_name
    }
    return chathead?.user.first_name
  }

  const getLastName = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.user_swiped.last_name
    }
    return chathead?.user.last_name
  }

  const getLastModified = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.user_swiped.last_modified_on
    }
    return chathead?.user.last_modified_on
  }

  const [isFocused, setIsFocused] = useState<boolean>(false)

  const [messageText, setMessageText] = useState<string>('')
  const flatListRef = useRef<FlatList>(null)

  const { connected, messages, error, sendMessage } = useStompSocket(
    getUsername(),
  )
  const [messageTread, setMessageTread] = useState<Message[]>(messages)

  const handleSendMessage = () => {
    if (messageText) {
      const message: Message = {
        content: messageText,
        created_on: getCurrentDate(),
        id: messageTread.length + 1,
        sender:
          from === 'MATCHES'
            ? request?.user_swiped.username
            : userProfile.username,
        receiver: getUsername(),
        type: 'CHAT',
      }
      sendMessage(message)
      setMessageTread(prevMessages => [...prevMessages, message])
      setMessageText('')
    }
  }

  const handleIsFocused = (status: boolean) => {
    setIsFocused(status)
  }

  useEffect(() => {
    const fetchChalog = async () => {
      const response = await chatRouter.getIndividualMessages(
        getUsername(),
        1,
        100,
      )

      if (response.ok) {
        setMessageTread(sortItemsByIncreasingId(response.data.data))

        return
      }

      console.log('============Error========================')
      console.log(response.data)
      console.log('====================================')
    }

    fetchChalog()
  }, [])

  const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight,
      backgroundColor: colors.white,
      flexGrow: 1,
    },
    messageContainer: {
      marginVertical: 6,
      marginHorizontal: 8,
      paddingVertical: 5,
      paddingHorizontal: 10,
      backgroundColor: colors.primary,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomStartRadius: 10,
      alignSelf: 'flex-end', // for your messages
      maxWidth: 300,
    },
    messageOtherContainer: {
      marginVertical: 6,
      marginHorizontal: 8,
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: colors.text_bubble,
      alignSelf: 'flex-start', // for other messages
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomEndRadius: 10,
      maxWidth: 300,
    },
    sender: {
      marginBottom: 5,
      alignSelf: 'flex-end',
      color: colors.white,
      marginTop: -4,
      fontSize: 10,
    },
    sender_other: {
      marginBottom: 5,
      fontSize: 10,
      alignSelf: 'flex-end',
      marginTop: -4,
    },
    message_me: {
      color: colors.white,
      fontSize: 14,
      fontWeight: '400',
      marginEnd: 16,
    },
    message_other: {
      color: colors.black,
      fontSize: 14,
      marginEnd: 16,
      fontWeight: '400',
    },
    inputContainer: {
      flexDirection: 'row',
      borderColor: colors.silver,
      borderWidth: 2,
      margin: 8,
      borderRadius: 16,
      padding: 8,
      backgroundColor: colors.white,
    },

    inputContainer_active: {
      flexDirection: 'row',
      borderColor: colors.primary,
      borderWidth: 2,
      margin: 8,
      borderRadius: 16,
      padding: 8,
      backgroundColor: colors.white,
    },

    input: {
      flex: 1,
      minHeight: 40,
      color: colors.black,
    },

    flatlist_container: {
      paddingHorizontal: 8,
      flex: 1,
    },
    header_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 8,
    },
    name_container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flex: 1,
    },
    image_container: {
      width: 40,
      height: 40,
      backgroundColor: colors.silver,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      marginHorizontal: 16,
    },
    accroname: {
      fontSize: 18,
      lineHeight: 22,
      fontWeight: 'bold',
      color: colors.white,
    },
    username: {
      fontSize: 18,
      lineHeight: 22,
    },
    last_seen: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.silver,
      paddingVertical: 0,
    },
    message_container: {},
    send_button: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.white }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 2 : 0}>
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={colors.white}
          barStyle="dark-content"
        />

        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}>
          <>
            <View style={styles.header_container}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackButton />
              </TouchableOpacity>
              <View style={styles.name_container}>
                <View style={styles.image_container}>
                  <Text type={'heading'} style={styles.accroname}>
                    {getAccroNames(getFirstName(), getLastName())}
                  </Text>
                </View>
                <View>
                  <Text type={'heading'} style={styles.username}>
                    {`${getFirstName()} ${getLastName()}`}
                  </Text>
                  <Text type={'caption'} style={styles.last_seen}>
                    {`last seen ${moment(
                      getLastModified(),
                      'YYYY-MM-DDTHH:mm:ss.SSSSSSZ',
                    ).fromNow()}`}
                    {/* last_modified_on */}
                  </Text>
                </View>
              </View>
              <TouchableOpacity>{/* <ChatOptions /> */}</TouchableOpacity>
            </View>
            <View style={styles.flatlist_container}>
              {!isEmpty(messageTread) && (
                <FlatList
                  data={messageTread}
                  style={{ backgroundColor: colors.white }}
                  keyExtractor={(item, index) => index + item.id.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={
                        item.sender !== getUsername()
                          ? styles.messageContainer
                          : styles.messageOtherContainer
                      }>
                      <Text
                        style={
                          item.sender !== getUsername()
                            ? styles.message_me
                            : styles.message_other
                        }>
                        {item.content}
                      </Text>
                      <Text
                        style={
                          item.sender !== getUsername()
                            ? styles.sender
                            : styles.sender_other
                        }>
                        {moment(
                          item.created_on,
                          'YYYY-MM-DDTHH:mm:ss.SSSSSSZ',
                        ).fromNow()}
                      </Text>
                    </View>
                  )}
                  contentOffset={{ y: 10, x: 0 }}
                  onContentSizeChange={() => {
                    flatListRef.current?.scrollToEnd({ animated: true })
                  }}
                  ref={flatListRef}
                  ListFooterComponent={<View style={{ marginBottom: 100 }} />}
                />
              )}
            </View>

            <View
              style={
                isFocused ? styles.inputContainer_active : styles.inputContainer
              }>
              <TextInput
                style={styles.input}
                editable={connected}
                value={messageText}
                multiline
                returnKeyType={'done'}
                onChangeText={setMessageText}
                placeholder="Type a message..."
                placeholderTextColor={colors.black}
                onFocus={() => handleIsFocused(true)}
                onBlur={() => handleIsFocused(false)}
              />

              <TouchableOpacity
                disabled={!connected}
                style={styles.send_button}
                onPress={handleSendMessage}>
                <SendIcon />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
        <OverLayLoader isLoading={!connected} />
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default ChatroomIos

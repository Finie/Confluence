/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
// import moment from 'moment'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  checkRelativeTime,
  formatDate,
  getAccroNames,
  getCurrentDate,
  getUserMessageBubbleItem,
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
import { Message, SavedProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'ChatRoom'>

const ChatRoom: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const [inputHeight, setInputHeight] = useState<number>(56)

  const { request, from, chathead } = route.params

  const encoder = new TextEncoder()

  const encodedData = encoder.encode('some text')
  // @ts-ignore
  const { userData } = useContext(BaseContextProvider)
  const userProfile: SavedProfile = userData

  const getUsername = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.username
    }
    return chathead?.user.username
  }

  const getFirstName = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.first_name
    }
    return chathead?.user.first_name
  }

  const getLastName = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.last_name
    }
    return chathead?.user.last_name
  }

  const getLastModified = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.last_modified_on
    }
    return chathead?.user.last_modified_on
  }

  const getUserImageUrl = (): string | undefined => {
    if (from === 'MATCHES') {
      return request?.default_image
    }
    return chathead?.user.default_image
  }

  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [messageText, setMessageText] = useState<string>('')
  const { connected, messages, error, sendMessage } = useStompSocket(
    getUsername(),
  )

  const [messageTread, setMessageTread] = useState<Message[]>(messages)

  const handleSendMessage = () => {
    if (messageText.trim() !== '') {
      const message: Message = {
        content: messageText.trim(),
        created_on: getCurrentDate(),
        id: messageTread.length + 1,
        // @ts-ignore
        sender: from === 'MATCHES' ? request?.username : userProfile.username,
        // @ts-ignore
        receiver: getUsername(),
        type: 'CHAT',
      }

      sendMessage(message) // sending message to api
      setMessageTread(prevMessages => [...prevMessages, message])
      setMessageText('')
      setInputHeight(56)
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    const fetchChalog = async () => {
      const response = await chatRouter.getIndividualMessages(
        // @ts-ignore
        getUsername(),
        1,
        100,
      )
      await chatRouter.markMessageAsRead(getUsername())

      if (response.ok) {
        // @ts-ignore
        setMessageTread(sortItemsByIncreasingId(response.data.data))
        return
      }

      return Alert.alert('Request failed', response.data.message)
    }

    fetchChalog()
  }, [getUsername])

  const scrollViewRef = useRef<ScrollView>(null)
  const inputRef = useRef<TextInput>(null)

  const handleContentSizeChange = (event: any) => {
    const { contentSize } = event.nativeEvent
    setInputHeight(contentSize.height)
  }

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      backgroundColor: colors.white_on_white,
    },
    messageContainer: {
      flexGrow: 1,
    },
    input: {
      flex: 1,
      height: 40,
      color: colors.black,
    },
    flatlist_container: {
      flex: 8,
      paddingHorizontal: 8,
    },
    header_container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      marginBottom: 8,
      flex: 0,
      backgroundColor: colors.white,
      paddingVertical: 4,
    },
    name_container: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      flex: 1,
    },
    image_container: {
      width: 40,
      height: 40,
      backgroundColor: colors.snow,
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
      color: colors.black,
    },
    username: {
      fontSize: 18,
      lineHeight: 22,
      color: colors.black,
    },
    last_seen: {
      fontSize: 12,
      fontWeight: '500',
      color: colors.loaderBackground,
      paddingVertical: 0,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      borderTopColor: colors.silver,
      borderTopWidth: 0.5,
      backgroundColor: colors.white,
    },
    inputText: {
      flex: 1,
      marginRight: 10,
      paddingHorizontal: 10,
      paddingTop: 8,
      fontSize: 16,
      fontWeight: '500',
    },
    send_button: {
      padding: 16,
    },
    selfMessage_top: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primary,
      padding: 8,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomLeftRadius: 10,
      marginTop: 8,
      marginBottom: 2,
      marginLeft: 40,
      marginRight: 20,
      minWidth: 100,
      flexDirection: 'row',
      maxWidth: 300,
      flexWrap: 'wrap',
    },
    selfMessage_middle: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primary,
      padding: 8,
      borderTopStartRadius: 10,
      borderBottomStartRadius: 10,
      marginTop: 1,
      marginBottom: 2,
      marginLeft: 40,
      marginRight: 20,
      minWidth: 100,
      flexDirection: 'row',
      maxWidth: 300,
      flexWrap: 'wrap',
    },
    selfMessage_bottom: {
      alignSelf: 'flex-end',
      backgroundColor: colors.primary,
      padding: 8,
      borderBottomEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomLeftRadius: 10,
      marginTop: 1,
      marginBottom: 2,
      marginLeft: 40,
      marginRight: 20,
      minWidth: 100,
      flexDirection: 'row',
      maxWidth: 300,
      flexWrap: 'wrap',
    },
    otherMessage_top: {
      alignSelf: 'flex-start',
      backgroundColor: colors.white,
      padding: 8,
      borderTopEndRadius: 10,
      borderTopStartRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 8,
      marginBottom: 2,
      marginLeft: 20,
      marginRight: 40,
      minWidth: 100,
      flexDirection: 'row',
      maxWidth: 300,
      flexWrap: 'wrap',
    },
    otherMessage_middle: {
      alignSelf: 'flex-start',
      backgroundColor: colors.white,
      padding: 8,
      borderTopEndRadius: 10,
      borderBottomRightRadius: 10,
      marginTop: 1,
      marginBottom: 2,
      marginLeft: 20,
      marginRight: 40,
      minWidth: 100,
      flexDirection: 'row',
      maxWidth: 300,
      flexWrap: 'wrap',
    },
    otherMessage_bottom: {
      alignSelf: 'flex-start',
      backgroundColor: colors.white,
      padding: 8,
      borderBottomStartRadius: 10,
      borderBottomEndRadius: 10,
      borderTopEndRadius: 10,
      marginTop: 1,
      marginBottom: 2,
      marginLeft: 20,
      marginRight: 40,
      minWidth: 100,
      flexDirection: 'row',
      maxWidth: 300,
      flexWrap: 'wrap',
    },
    sender: {
      alignSelf: 'flex-end',
      color: colors.white,
      marginTop: 4,
      marginStart: 8,
      fontSize: 10,
    },
    sender_other: {
      fontSize: 10,
      alignSelf: 'flex-end',
      marginTop: 8,
      marginStart: 8,
    },
    message_me: {
      color: colors.white,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    message_other: {
      color: colors.black,
      fontSize: 16,
      fontWeight: '400',
    },
    user_avater_message_left: {
      height: 25,
      width: 25,
      borderRadius: 15,
      backgroundColor: colors.primary,
      alignSelf: 'flex-start',
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 2,
    },

    user_avater_message_right: {
      height: 25,
      width: 25,
      borderRadius: 15,
      backgroundColor: colors.silver,
      alignSelf: 'flex-end',
      justifyContent: 'center',
      marginVertical: 2,
      alignItems: 'center',
    },
    avater_text: {
      fontSize: 10,
      color: colors.white,
    },
  })

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <OverLayLoader isLoading={!connected} />
      <View style={styles.header_container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
        <View style={styles.name_container}>
          <View style={styles.image_container}>
            {!getUserImageUrl() ? (
              <Text type={'heading'} style={styles.accroname}>
                {getAccroNames(getFirstName(), getLastName())}
              </Text>
            ) : (
              <Image
                style={{ width: 40, height: 40, borderRadius: 20 }}
                source={{
                  uri: getUserImageUrl(),
                }}
              />
            )}
          </View>
          <View>
            <Text type={'heading'} style={styles.username}>
              {`${getFirstName()} ${getLastName()}`}
            </Text>
            <Text type={'caption'} style={styles.last_seen}>
              {checkRelativeTime(getLastModified()) === 'Now'
                ? 'online'
                : `last seen ${formatDate(getLastModified())}`}
              {/* last_modified_on */}
            </Text>
          </View>
        </View>
        <TouchableOpacity>{/* <ChatOptions /> */}</TouchableOpacity>
      </View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: colors.snow }}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
        style={styles.messageContainer}>
        {messageTread.map((message, index) => {
          const result = getUserMessageBubbleItem(
            messageTread,
            userProfile.username,
            index,
          )
          return (
            <TouchableOpacity key={index} onPress={() => Keyboard.dismiss()}>
              <View
                style={[
                  result.isCurrent //check if sender is current user
                    ? result.position === 1
                      ? styles.selfMessage_top
                      : result.position === 2
                      ? styles.selfMessage_middle
                      : styles.selfMessage_bottom
                    : result.position === 1
                    ? styles.otherMessage_top
                    : result.position === 2
                    ? styles.otherMessage_middle
                    : styles.otherMessage_bottom,
                ]}>
                <View>
                  <Text
                    style={[
                      message.sender !== getUsername()
                        ? styles.message_me
                        : styles.message_other,
                    ]}>
                    {message.content.trim()}
                  </Text>
                </View>
                <Text
                  style={[
                    message.sender !== getUsername()
                      ? styles.sender
                      : styles.sender_other,
                  ]}>
                  {formatDate(message.created_on)}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'android' ? -200 : 0}>
        <View style={styles.inputContainer}>
          <TextInput
            multiline
            value={messageText}
            onChangeText={setMessageText}
            onContentSizeChange={handleContentSizeChange}
            style={[styles.inputText, { height: Math.max(56, inputHeight) }]}
            placeholder="Type your message..."
            placeholderTextColor="#888"
            autoFocus={false}
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="send"
            onSubmitEditing={handleSendMessage}
            blurOnSubmit={false}
            ref={inputRef}
          />
          <TouchableOpacity
            style={styles.send_button}
            onPress={handleSendMessage}>
            <SendIcon height={25} width={25} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatRoom

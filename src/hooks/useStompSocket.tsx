import { Stomp } from '@stomp/stompjs'
import { useContext, useEffect, useRef, useState } from 'react'
import { Alert } from 'react-native'
import SockJS from 'sockjs-client'

import BaseContextProvider from 'src/context/BaseContextProvider'
import Constants from 'src/utils/Constants'

const useStompSocket = (username: string | undefined) => {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)
  const { userToken } = useContext(BaseContextProvider)

  const socketRef = useRef(null)
  const stompClientRef = useRef(null)

  useEffect(() => {
    const connect = async () => {
      const socket = new SockJS(`${Constants.BASE_URL}chat-ws`)

      const stompClient = Stomp.over(() => socket)

      stompClient.configure({
        reconnectDelay: 5000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
      })

      stompClientRef.current = stompClient

      try {
        await new Promise<void>((resolve, reject) => {
          stompClient.connect(
            {
              Authorization: 'Bearer ' + userToken,
              'App-ID': Constants.APP_ID,
            },
            () => {
              setConnected(true)
              console.log('=============Connected=======================')
              console.log(stompClientRef.current)
              console.log('====================================')

              stompClient.subscribe(`/user/${username}/private`, message => {
                console.log(
                  `=====Recieve====/user/${username}/private=============`,
                )
                console.log(JSON.stringify(message))
                console.log('====================================')

                setMessages(prevMessages => [
                  ...prevMessages,
                  JSON.parse(message.body),
                ])
              })

              stompClient.subscribe('/queue/errors', error => {
                setError(error.body)

                Alert.alert('Unable to send message', error.body)
              })

              stompClient.send(
                '/api/message',
                {
                  Authorization: 'Bearer ' + userToken,
                  'App-ID': Constants.APP_ID,
                },
                JSON.stringify({ sender: username, type: 'JOIN' }),
              )

              resolve()
            },
            (error: any) => {
              console.log('====================================')
              console.log('Failed to Connect')
              console.log('====================================')
              console.log(`STOMP error: ${error}`)
              console.log('====================================')
              console.log('Failed to Connect')
              console.log('====================================')

              reject(error)
            },
          )
        })
      } catch (error) {
        console.error('Failed to connect', error)
      }
    }

    connect()

    return () => {
      if (connected) {
        stompClientRef.current.disconnect(() => {
          setConnected(false)
        })
      }
    }
  }, [username, userToken])

  const sendMessage = (message: any) => {
    stompClientRef.current.send(
      '/api/private-message',
      {
        Authorization: 'Bearer ' + userToken,
        'App-ID': Constants.APP_ID,
      },
      JSON.stringify(message),
    )
  }

  return { connected, messages, error, sendMessage }
}

export default useStompSocket

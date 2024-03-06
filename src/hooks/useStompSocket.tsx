/* eslint-disable import/order */

/* eslint-disable semi */
import { Stomp } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import utils from 'src/utils'

import Constants from 'src/utils/Constants'

const useStompSocket = (username: string | undefined, token: string) => {
  const [connected, setConnected] = useState(false)
  const [messages, setMessages] = useState([])
  const [error, setError] = useState(null)

  const stompClientRef = useRef(null)

  useEffect(() => {
    const connect = async () => {
      const socket = new SockJS(`${Constants.BASE_URL}chat-ws`)

      const stompClient = Stomp.over(() => socket)

      stompClient.configure({
        reconnectDelay: 1000,
        heartbeatIncoming: 0,
        heartbeatOutgoing: 20000,
      })

      //@ts-ignore
      stompClientRef.current = stompClient

      try {
        await new Promise<void>((resolve, reject) => {
          stompClient.connect(
            {
              Authorization: 'Bearer ' + token,
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

                //@ts-ignore
                setMessages(prevMessages => [
                  ...prevMessages,
                  JSON.parse(message.body),
                ])
              })

              stompClient.subscribe('/queue/errors', _error => {
                //@ts-ignore
                setError(_error.body)

                utils.showToastMessage(
                  `Unable to send message: ${_error.body}`,
                  'ERROR',
                )
              })

              stompClient.send(
                '/api/message',
                {
                  Authorization: 'Bearer ' + token,
                  'App-ID': Constants.APP_ID,
                },
                JSON.stringify({ sender: username, type: 'JOIN' }),
              )

              resolve()
            },
            // eslint-disable-next-line @typescript-eslint/no-shadow
            (error: any) => {
              reject(error)
            },
          )
        })
      } catch (_error) {
        utils.showToastMessage(`Failed to connect: ${_error}`, 'ERROR')
      }
    }

    connect()

    return () => {
      if (connected) {
        //@ts-ignore
        stompClientRef.current.disconnect(() => {
          setConnected(false)
        })
      }
    }
  }, [connected, token, username])

  const sendMessage = (message: any) => {
    //@ts-ignore
    stompClientRef.current.send(
      '/api/private-message',
      {
        Authorization: 'Bearer ' + token,
        'App-ID': Constants.APP_ID,
      },
      JSON.stringify(message),
    )
  }

  return { connected, messages, error, sendMessage }
}

export default useStompSocket

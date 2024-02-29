import apiClient from '../client/apiClient'

const getMessageChatRooms = () => {
  return apiClient.get('/api/conversation?page=1&pageSize=100')
}

const markMessageAsRead = (username: string | undefined) => {
  return apiClient.post(`/api/conversation/open/${username}`)
}

const getIndividualMessages = (
  username: string,
  page: number,
  pageSize: number,
) => {
  return apiClient.get(
    `/api/message?username=${username}&page=${page}&pageSize=${pageSize}`,
  )
}

export default {
  getMessageChatRooms,
  getIndividualMessages,
  markMessageAsRead,
}

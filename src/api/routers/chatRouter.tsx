import apiClient from '../client/apiClient'

const getMessageChatRooms = () => {
  return apiClient.fetchRequest('/api/conversation?page=1&pageSize=100')
}

const markMessageAsRead = (username: string | undefined) => {
  return apiClient.postRequest(`/api/conversation/open/${username}`)
}

const getIndividualMessages = (
  username: string,
  page: number,
  pageSize: number,
) => {
  return apiClient.fetchRequest(
    `/api/message?username=${username}&page=${page}&pageSize=${pageSize}`,
  )
}

export default {
  getMessageChatRooms,
  getIndividualMessages,
  markMessageAsRead,
}

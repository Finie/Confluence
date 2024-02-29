import apiClient from '../client/apiClient'
import { SearchGlag } from 'src/utils/shared-type'

const findMyMatches = (data: { page: number; pagesize: number }) => {
  return apiClient.get(`/api/match?page=${data.page}&pageSize=${data.pagesize}`)
}
const getCurrentAccounts = () => {
  return apiClient.get('/api/user/me')
}
const exploreMatches = (data: SearchGlag) => {
  return apiClient.post('/api/user/explore', data)
}
const postaMatchedUser = (data: { username: string; status: string }) => {
  return apiClient.post('/api/swipe', data)
}
const searchUsersByFlags = (data: {
  minAge: number
  maxAge: number
  minDistane: number
  maxDistance: number
  other: string
  passion: string
  longitude: number
  latitude: number
  page: number
  pageSize: number
}) => {
  return apiClient.get(
    `/api/user/explore?myLatitude=${data.latitude}&myLongitude=${data.longitude}&ageRange=${data.minAge}-${data.maxAge}&distanceRange=${data.minDistane}-${data.maxDistance}${data.passion}${data.other}&page=${data.page}&pageSize=${data.pageSize}`,
  )
}
const updateProfilePic = (
  data: {
    encoded_file: string
    name: string
    type: string
    is_default: boolean
  }[],
) => {
  return apiClient.post('/api/user/media', data)
}
const getExploreTypes = () => {
  return apiClient.get('/api/app/profile/passion-stats')
}
const searchForUsersByFlags = (data: SearchGlag) => {
  return apiClient.post('/api/user/explore', data)
}

const getBlockedUsers = () => {
  return apiClient.get('/api/swipe?page=1&pageSize=100&status=BLOCK')
}

const reportUser = (data: any) => {
  return apiClient.post('/api/report-user', data)
}

const unblockUsers = (data: { username: string; status: 'LIKE' | 'BLOCK' }) => {
  return apiClient.put('/api/match/status', data)
}

const getSelectedUserDetails = (userId: string) => {
  return apiClient.get(`/api/user/${userId}`)
}

export default {
  findMyMatches,
  getCurrentAccounts,
  exploreMatches,
  postaMatchedUser,
  searchUsersByFlags,
  updateProfilePic,
  getExploreTypes,
  searchForUsersByFlags,
  getBlockedUsers,
  reportUser,
  unblockUsers,
  getSelectedUserDetails,
}

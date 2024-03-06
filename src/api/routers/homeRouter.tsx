/* eslint-disable semi */

/* eslint-disable import/order */
import apiClient from '../client/apiClient'
import { SearchGlag } from 'src/utils/shared-type'

const findMyMatches = (data: { page: number; pagesize: number }) => {
  return apiClient.fetchRequest(
    `/api/match?page=${data.page}&pageSize=${data.pagesize}`,
  )
}
const getCurrentAccounts = () => {
  return apiClient.fetchRequest('/api/user/me')
}
const exploreMatches = (data: SearchGlag) => {
  return apiClient.postRequest('/api/user/explore', data)
}
const postaMatchedUser = (data: { username: string; status: string }) => {
  return apiClient.postRequest('/api/swipe', data)
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
  return apiClient.fetchRequest(
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
  return apiClient.postRequest('/api/user/media', data)
}
const getExploreTypes = () => {
  return apiClient.fetchRequest('/api/app/profile/passion-stats')
}
const searchForUsersByFlags = (data: SearchGlag) => {
  return apiClient.postRequest('/api/user/explore', data)
}

const getBlockedUsers = () => {
  return apiClient.fetchRequest('/api/swipe?page=1&pageSize=100&status=BLOCK')
}

const reportUser = (data: any) => {
  return apiClient.postRequest('/api/report-user', data)
}

const unblockUsers = (data: { username: string; status: 'LIKE' | 'BLOCK' }) => {
  return apiClient.updateRequest('/api/match/status', data)
}

const getSelectedUserDetails = (userId: string) => {
  return apiClient.fetchRequest(`/api/user/${userId}`)
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

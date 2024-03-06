/* eslint-disable semi */

/* eslint-disable import/order */
import apiClient from '../client/apiClient'
import { RegistrationData } from 'src/utils/global.types'

const getEthnicGroups = () => {
  return apiClient.fetchRequest('/api/app/profile/ethnic-group/')
}

const getListOfethnicGroups = (id: number) => {
  return apiClient.fetchRequest(`/api/app/profile/ethnicity/${id}`)
}

const fetchOtherPersions = () => {
  return apiClient.fetchRequest('/api/app/profile/other')
}

const fetchPassions = () => {
  return apiClient.fetchRequest('/api/app/profile/passion')
}

const fetchLanguages = () => {
  return apiClient.fetchRequest('/api/app/profile/language')
}

const createUser = (data: RegistrationData) => {
  return apiClient.postRequest('/auth/register', data)
}

const loginUser = (data: { username: string; password: string }) => {
  return apiClient.postRequest('/auth/login', data)
}

const updatePassword = (data: { username: string }) => {
  return apiClient.updateRequest('/auth/forgot-password', data)
}

const createNewPassword = (data: {
  user_id: string
  reset_token: string
  password: string
}) => {
  return apiClient.updateRequest('/auth/reset-password', data)
}

const updateUserdata = () => {
  // update user info
}

const checkEmailAvailability = (username: string) => {
  return apiClient.fetchRequest(`/auth/validate-email?email=${username}`)
}

const checkNameAvailability = (username: string) => {
  return apiClient.fetchRequest(`/auth/validate-username?username=${username}`)
}

const checkPhoneAvailability = (username: string) => {
  return apiClient.fetchRequest(`/auth/validate-phone?phone=${username}`)
}

const notificationTokenPost = (data: { token: string | null }) => {
  return apiClient.postRequest('/api/user/me/firebase-message-token', data)
}

const validateResetPasswordToken = (data: any) => {
  return apiClient.postRequest('auth/validate-token', data)
}

export default {
  getEthnicGroups,
  getListOfethnicGroups,
  fetchOtherPersions,
  fetchPassions,
  fetchLanguages,
  createUser,
  loginUser,
  updatePassword,
  createNewPassword,
  checkEmailAvailability,
  checkNameAvailability,
  checkPhoneAvailability,
  notificationTokenPost,
  updateUserdata,
  validateResetPasswordToken,
}

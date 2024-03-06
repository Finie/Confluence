import apiClient from '../client/apiClient'

const updateMedias = (request: any) => {
  return apiClient.postRequest('/api/user/media', request)
}

const updateUseInfo = (request: any) => {
  return apiClient.updateRequest('/api/user/me', request)
}

const updatePassion = (passionId: string) => {
  return apiClient.postRequest(`/api/user/me/passion/${passionId}`)
}

const deletePassion = (passionId: string) => {
  return apiClient.delete(`/api/user/me/passion/${passionId}`)
}

const updateDefaultImage = (imageId: number) => {
  return apiClient.updateRequest(`/api/user/media/make-default/${imageId}`)
}

const updateLanguages = (languadeId: number) => {
  return apiClient.postRequest(`/api/user/me/language/${languadeId}`)
}

const deleteLanguage = (languadeId: number) => {
  return apiClient.delete(`/api/user/me/language/${languadeId}`)
}

const updatePassword = (data: {
  current_password: string
  password: string
}) => {
  return apiClient.updateRequest('api/user/me/update-password', data)
}

const deactivateAccount = () => {
  return apiClient.updateRequest('api/user/me/pause')
}

const deleteAccount = () => {
  return apiClient.delete('api/user/me/delete')
}

export default {
  updateMedias,
  updateUseInfo,
  updatePassion,
  deletePassion,
  updateDefaultImage,
  updateLanguages,
  deleteLanguage,
  updatePassword,
  deactivateAccount,
  deleteAccount,
}

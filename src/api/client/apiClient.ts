import { create } from 'apisauce'
import { isEmpty } from 'src/helper'

import EncryptionStore from 'src/data/EncryptionStore'
import Constants from 'src/utils/Constants'

const apiClient = create({
  baseURL: Constants.BASE_URL,
  timeout: 30000,
  timeoutErrorMessage: 'Sorry server took too long to respond',
})

apiClient.addAsyncRequestTransform(async request => {
  const token = await EncryptionStore.getUserToken()

  request.headers.Accept = 'application/json'
  request.headers['App-ID'] = Constants.APP_ID

  if (isEmpty(token)) {
    return null
  }

  if (request.headers) {
    request.headers.Authorization = 'Bearer ' + token
  }
})

const get = apiClient.get

apiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig)

  if (response.ok) {
    //save incoming data to cache --future v2

    return response
  }

  // the resonse was not successful return cached data -- future v2

  return response
}

const post = apiClient.post

apiClient.post = async (url, data, axiosConfig) => {
  const response = await post(url, data, axiosConfig)

  if (response.ok) {
    //hande cache saving --future -v2
    //meanwhile return the data
    return response
  }

  // when an error occures handle the error and return ofline data

  return response
}

const patch = apiClient.patch

apiClient.patch = async (url, data, axiosConfig) => {
  const response = await patch(url, data, axiosConfig)

  if (response.ok) {
    //hande cache saving --future -v2
    //meanwhile return the data
    return response
  }

  // when an error occures handle the error and return ofline data

  return response
}

const put = apiClient.put

apiClient.put = async (url, data, axiosConfig) => {
  const response = await put(url, data, axiosConfig)

  if (response.ok) {
    //hande cache saving --future -v2
    //meanwhile return the data
    return response
  }

  // when an error occures handle the error and return ofline data

  return response
}

export default apiClient

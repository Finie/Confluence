/* eslint-disable semi */
import { create } from 'apisauce'
import { useSelector } from 'react-redux'

import EncryptionStore from 'src/data/EncryptionStore'
import { UserSession } from 'src/data/redux/slice/auth/types'
import Constants from 'src/utils/Constants'

import { handleMonitorApiRequests } from './apiNetworkHandler'

const apiClient = create({
  baseURL: Constants.BASE_URL,
  httpsAgent: true, //keep https connection to server alive to prevent latency
  httpAgent: false, //block for http connection to server
  timeout: 15000, //set connection timeout to 15 sec
  timeoutErrorMessage: 'Sorry server took too long to respond',
})

apiClient.addMonitor(handleMonitorApiRequests)

apiClient.addAsyncRequestTransform(async requestConfig => {
  /**
   * For requests, you are given a request object
   *
   * data - the object being passed up to the server
   * method - the HTTP verb
   * url - the url we're hitting
   * headers - the request headers
   * params - the request params for get, delete, head, link, unlink
   *
   * Mutate anything in here to change anything about the request.
   *
   *
   */

  if (requestConfig.headers) {
    const result: UserSession = await EncryptionStore.retrieveBantuUser()

    requestConfig.headers['App-ID'] = 1

    if (result?.token) {
      requestConfig.headers.Authorization = 'Bearer ' + result.token
    }
  }
})

const changeBaseUrl = (newUrl: string) => {
  return apiClient.setBaseURL(newUrl)
}

const restoreBaseUrl = () => {
  return apiClient.setBaseURL(Constants.BASE_URL)
}

const fetchRequest = async (
  url: string,
  data?: any,
  requestConfig?: any, //AxiosRequestConfig | undefined,
) => {
  const response = await apiClient.get(url, data, requestConfig)

  if (response.ok) {
    //save to database and return nre data
    return response
  } else {
    //return from database

    return response
  }
}

const updateRequest = async (
  url: string,
  data?: any,
  requestConfig?: any, //AxiosRequestConfig | undefined,
) => {
  const response = await apiClient.put(url, data, requestConfig)

  if (response.ok) {
    //save to database and return nre data
    return response
  } else {
    //return from database

    return response
  }
}

const postRequest = async (
  url: string,
  data?: any,
  requestConfig?: any, //AxiosRequestConfig | undefined,
) => {
  const response = await apiClient.post(url, data, requestConfig)

  if (response.ok) {
    //save to database and return nre data
    return response
  } else {
    //return from database

    return response
  }
}

const removeDelete = async (
  url: string,
  data?: any,
  requestConfig?: any, //AxiosRequestConfig | undefined,
) => {
  const response = await apiClient.delete(url, data, requestConfig)

  if (response.ok) {
    //save to database and return nre data
    return response
  } else {
    //return from database

    return response
  }
}

export default {
  changeBaseUrl,
  restoreBaseUrl,
  fetchRequest,
  updateRequest,
  postRequest,
  delete: removeDelete,
}

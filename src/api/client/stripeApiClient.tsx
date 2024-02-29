import { create } from 'apisauce'
import { isEmpty } from 'src/helper'

import EncryptionStore from 'src/data/EncryptionStore'

const stripeApiClient = create({
  baseURL: 'https://api.stripe.com/',
  timeout: 30000,
  timeoutErrorMessage: 'Sorry server took too long to respond',
})

stripeApiClient.addAsyncRequestTransform(async request => {
  const token = await EncryptionStore.getUserToken()

  request.headers['Accept'] = 'application/json'
  request.headers['App-ID'] = '1'

  if (isEmpty(token)) {
    return null
  }

  request.headers['Authorization'] =
    'Bearer ' +
    'sk_test_51KGVjiC6r0UrWGk6isiqs2va5HNiHDR8YpAzHP0oOEijwITnAsDsaOdv8qVg3WqVHVUwIQ36QybsrLGDM8oygndE00D1YmM9VN'
}) //adding headersgikuyu

const get = stripeApiClient.get

stripeApiClient.get = async (url, params, axiosConfig) => {
  const response = await get(url, params, axiosConfig)

  if (response.ok) {
    //save incoming data to cache --future v2

    return response
  }

  // the resonse was not successful return cached data -- future v2

  return response
}

const post = stripeApiClient.post

stripeApiClient.post = async (url, data, axiosConfig) => {
  const response = await post(url, data, axiosConfig)

  if (response.ok) {
    //hande cache saving --future -v2
    //meanwhile return the data
    return response
  }

  // when an error occures handle the error and return ofline data

  return response
}

const patch = stripeApiClient.patch

stripeApiClient.patch = async (url, data, axiosConfig) => {
  const response = await patch(url, data, axiosConfig)

  if (response.ok) {
    //hande cache saving --future -v2
    //meanwhile return the data
    return response
  }

  // when an error occures handle the error and return ofline data

  return response
}

export default stripeApiClient

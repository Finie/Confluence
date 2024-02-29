import apiClient from '../client/apiClient'
import stripeApiClient from '../client/stripeApiClient'

const getProductList = () => {
  return stripeApiClient.get(`/v1/products`)
}

const getPriceList = () => {
  return stripeApiClient.get(`/v1/prices`)
}

const getPaymentIntent = (data: any) => {
  return apiClient.post('/api/subscription/payment-intent', data)
}

export default {
  getProductList,
  getPriceList,
  getPaymentIntent,
}

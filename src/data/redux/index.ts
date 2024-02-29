import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './slice/root.reducer'

import { logger } from './enhancers'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
})

export default store

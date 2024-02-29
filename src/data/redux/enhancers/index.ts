import { MiddlewareAPI } from '@reduxjs/toolkit'

// Define the type for the enhancer function
type Enhancer = (
  api: MiddlewareAPI<any, any>,
) => (next: (action: any) => any) => (action: any) => any

export const logger: Enhancer =
  (store: MiddlewareAPI) => (next: (action: any) => any) => (action: any) => {
    if (typeof action === 'function') {
      // If the action is a function, execute it with the dispatch and getState functions
      return action(store.dispatch, store.getState)
    }

    return next(action)
  }

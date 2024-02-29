import { createSlice } from '@reduxjs/toolkit'

import { asyncProcessing } from '../../enhancers/asyncProcessMiddleware'
import { AuthStateData, RegistrationData } from '../../state.types'

import { UserSession } from './types'

// import { AuthStateData, RegistrationData } from '../../state.types'

// import { asyncProcessing , asyncProcessing } from '../../enhancers/asyncProcessMiddleware';

/**
 * @file authenticationSlice
 * this file contains the create slice file for authentication handling
 *
 *
 */

export const enum ASYNC_PROCESS_STATE {
  SUCCESS,
  PENDING,
  FAILED,
  IDLE,
}

const initialState: AuthStateData = {
  registrationData: {
    _phone_number: '',
    _one_time_pin: '',
    _sign_up_data: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      idNumber: '',
      //@ts-ignore
      idType: '',
    },
  },
  loginRequest: {
    _phone_number: null,
    _one_time_pin: null,
    _pin_number: null,
  },
  isLoading: false,
  error: null,
  status: ASYNC_PROCESS_STATE.IDLE,
  response: null,
  userSession: null,
  isAuthorized: false,
  isFirstTimeLogin: false,
}

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginRequest(state, action) {
      const { type, value } = action.payload

      const types: 'PHONE' | 'OTP' | 'PIN' = type

      switch (types) {
        case 'PHONE':
          state.loginRequest._phone_number = value
          return state

        case 'OTP':
          state.loginRequest._one_time_pin = value
          return state

        case 'PIN':
          state.loginRequest._pin_number = value
          return state

        default:
          return state
      }
    },
    runLogin(state) {
      return state
    },
    runRestoreUserSession(state, action) {
      state.userSession = action.payload
      return state
    },
    runSaveUserSession(state, action) {
      // The payload passed to this reducer should be equal to userSession otherwise programing is a scam 😂
      const user_session: UserSession = action.payload
      state.userSession = user_session
      return state
    },
    authorize(state, action) {
      state.isAuthorized = action.payload
      state.isFirstTimeLogin = action.payload
      return state
    },
    setFirstTimeLogin(state, action) {
      state.isFirstTimeLogin = action.payload
      return state
    },
    setIsLoading(state, action) {
      // Get isLoading from state and then set it tho the boolean value sent via action
      state.isLoading = action.payload
      return state
    },
    runAddRegistrationData(state, action) {
      const data: RegistrationData = action.payload
      state.registrationData = data
      return state
    },
    runLogOut(state) {
      state = initialState

      return state
    },
  },
  extraReducers: builder => {
    // This case is executed when the async process is processing
    builder.addCase(asyncProcessing.pending, state => {
      state.isLoading = true
      state.error = null
      state.status = ASYNC_PROCESS_STATE.PENDING
      state.response = null
    })
    // This case is executed when the async process has finished processing successfully
    builder.addCase(asyncProcessing.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.status = ASYNC_PROCESS_STATE.SUCCESS
      state.response = action.payload
    })
    // This case is executed when the async process has failed to finished processing
    builder.addCase(asyncProcessing.rejected, (state, action) => {
      state.isLoading = false
      //@ts-ignore
      state.error = `Error Code: [${action.error.code}] message:  ${action.error.message}`
      state.status = ASYNC_PROCESS_STATE.FAILED
      state.response = null
    })
  },
})

export const {
  authorize,
  setFirstTimeLogin,
  setLoginRequest,
  setIsLoading,
  runLogin,
  runLogOut,
  runAddRegistrationData,
  runSaveUserSession,
  runRestoreUserSession,
} = authenticationSlice.actions

export default authenticationSlice.reducer

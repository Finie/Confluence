/* eslint-disable semi */
import { createSlice } from '@reduxjs/toolkit'

import { asyncProcessing } from '../../enhancers/asyncProcessMiddleware'
import { AuthStateData } from '../../state.types'

/**
 * @file authenticationSlice
 * this file contains the create slice file for authentication handling

 */

export const enum ASYNC_PROCESS_STATE {
  SUCCESS,
  PENDING,
  FAILED,
  IDLE,
}

const initialState: AuthStateData = {
  registrationData: {
    first_name: null,
    last_name: null,
    email: null,
    password: null,
    middle_name: null,
    phone: null,
    username: null,
    profile: {
      birth_date: null,
      gender: null,
      height: null,
      physical_frame: null,
      ethnicity: null,
      location: {
        google_place_id: null,
        name: null,
        longitude: 0,
        latitude: 0,
      },
      media: [],
      bio: {
        bio: null,
        looking_for: null,
        language_ids: [],
        passion_ids: [],
        other_details_ids: [],
      },
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
}

const authenticationSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authorize(state, action) {
      state.isAuthorized = action.payload
      return state
    },

    setIsLoading(state, action) {
      // Get isLoading from state and then set it tho the boolean value sent via action
      state.isLoading = action.payload
      return state
    },
    runAddRegistrationData(state, action) {
      const { dataType, payload } = action.payload

      const key:
        | 'NAME'
        | 'EMAIL'
        | 'MORE_DETAILS'
        | 'LOCATION'
        | 'MEDIA'
        | 'DOB'
        | 'GENDER'
        | 'ETHNICITY'
        | 'FRAME' = dataType

      switch (key) {
        case 'NAME':
          //Update Redux with values enterd during Sign-up
          state.registrationData.first_name = payload.first_name
          state.registrationData.last_name = payload.last_name
          state.registrationData.username = payload.username
          state.registrationData.phone = payload.phone

          return state
        case 'EMAIL':
          // eslint-disable-next-line no-case-declarations
          const { email, password } = payload
          state.registrationData.email = email
          state.registrationData.password = password

          return state
        case 'LOCATION':
          // eslint-disable-next-line no-case-declarations
          const { google_place_id, name, longitude, latitude } = payload

          state.registrationData.profile.location.name = name
          state.registrationData.profile.location.longitude = longitude
          state.registrationData.profile.location.latitude = latitude
          state.registrationData.profile.location.google_place_id =
            google_place_id

          return state
        case 'MEDIA':
          // eslint-disable-next-line no-case-declarations
          const { medium } = payload
          state.registrationData.profile.media = medium

          return state
        case 'DOB':
          // eslint-disable-next-line no-case-declarations
          const { birth_date } = payload
          state.registrationData.profile.birth_date = birth_date

          return state
        case 'GENDER':
          // eslint-disable-next-line no-case-declarations
          const { gender } = payload
          state.registrationData.profile.gender = gender

          return state
        case 'ETHNICITY':
          // eslint-disable-next-line no-case-declarations
          const { ethnicity } = payload
          state.registrationData.profile.ethnicity = ethnicity

          return state
        case 'FRAME':
          // eslint-disable-next-line no-case-declarations
          const { frame } = payload
          state.registrationData.profile.physical_frame = frame

          return state
        default:
          // eslint-disable-next-line no-case-declarations
          const { height_frame } = payload
          state.registrationData.profile.height = height_frame

          return state
      }
    },

    runLoginUser(state, action) {
      state.userSession = action.payload
      state.isAuthorized = true
      return state
    },
    runLogOut(state) {
      state.userSession = initialState.userSession
      state.isAuthorized = false
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
  setIsLoading,
  runLogOut,
  runLoginUser,
  runAddRegistrationData,
} = authenticationSlice.actions

export default authenticationSlice.reducer

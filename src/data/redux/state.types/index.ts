/**
 * @file state.types index.ts will contain all the state types
 * that you will create ⚠️ ensure that you do not create a state
 * that you have not defined its state
 *
 * NOTE @auth - represents the state name as defined in the root deducer
 * content inside auth are the initial contents that are defined in individual
 * slice 😌
 *
 */
import { ASYNC_PROCESS_STATE } from '../slice/auth'
import { UserSession } from '../slice/auth/types'

export type SignUpData = {
  firstName: string | null
  lastName: string | null
  dateOfBirth: string | null
  userName?: string | null
  invitationCode?: string | null
  email: string | null
  idNumber: string | null
  idType: 'PASSPORT' | 'NATIONAL_ID' | 'ALIEN'
}

export type RegistrationData = {
  _phone_number: string | null
  _one_time_pin: string | null
  _sign_up_data: SignUpData
}

export type AuthStateData = {
  registrationData: RegistrationData
  isLoading: boolean
  error: string | null
  status:
    | ASYNC_PROCESS_STATE.FAILED
    | ASYNC_PROCESS_STATE.IDLE
    | ASYNC_PROCESS_STATE.PENDING
    | ASYNC_PROCESS_STATE.SUCCESS
  response: null | any
  loginRequest: {
    _phone_number: string | null
    _one_time_pin: string | null
    _pin_number: string | null
  }
  userSession: UserSession | null
  isAuthorized: boolean
  isFirstTimeLogin: boolean
}

export type AuthState = {
  auth: AuthStateData
}

/**
 * This type @file describes all the types
 * used in the application authentication process
 * i.e login and registration
 */

// user session returned when user logs in or when account is created
export interface UserSession {
  token: string
  id: string
  username: string
  is_premium: boolean
  email: string
  first_name: string
  last_name: string
  middle_name: string
  phone: string
  status: string
  created_on: string
  last_modified_on: string
  profile: Profile
}

export interface Profile {
  birth_date: string
  gender: string
  height: string
  physical_frame: string
  ethnicity: any
  location: Location
  media: Medum[]
  bio: Bio
}

export interface Location {
  id: number
  google_place_id: string
  name: string
  longitude: number
  latitude: number
}

export interface Medum {
  id: number
  name: string
  path: string
  thumbnail: string
  type: string
  is_default: boolean
}

export interface Bio {
  id: number
  bio: string
  looking_for: string
  languages: Common[]
  passions: Common[]
  other_details: Common[]
}

export interface Common {
  id: number
  name: string
}

//Account creation payload type

export interface RegPayload {
  username: string
  password: string
  first_name: string
  email: string
  last_name: string
  middle_name: string
  phone: string
  profile: RegProfile
}

export interface RegProfile {
  birth_date: string
  gender: string
  height: string
  physical_frame: string
  ethnicity: string
  location: Location
  media: RegMedum[]
  bio: RegBio
}

export interface RegMedum {
  encoded_file: string
  name: string
  type: string
  is_default: boolean
}

export interface RegBio {
  bio: string
  looking_for: string
  language_ids: number[]
  passion_ids: number[]
  other_details_ids: number[]
}

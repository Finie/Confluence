export interface RegistrationData {
  first_name: string | null
  last_name: string | null
  email: string | null
  password: string | null
  middle_name: string | null
  phone: string | null
  username: string | null
  profile: Profile
}

export interface Profile {
  birth_date: string | null
  gender: string | null
  height: string | null
  physical_frame: string | null
  ethnicity: string | null
  location: Location
  media: Medum[]
  bio: Bio
}

export interface Location {
  google_place_id: string | null
  name: string | null
  longitude: number
  latitude: number
}

export interface Medum {
  encoded_file: string | null
  name: string | null
  type: string | null
  is_default: boolean
}

export interface Bio {
  bio: string | null
  looking_for: string | null
  language_ids: number[]
  passion_ids: number[]
  other_details_ids: number[]
}

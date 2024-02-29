export type UserFrom = 'CHATS' | 'MATCHES'

export type SwipeData = {
  id: number
  name: string
  age: number
  image: string
}

export type CardProps = {
  user: BantuProfile
  onMoreClicked: () => void
}

export type CarouselItem = {
  image: any
}

export type UserProfile = {
  username: string
  password: string
  first_name: string
  email: string
  last_name: string
  middle_name: string
  phone: string
  profile: {
    birth_date: string //2022-06-09
    gender: string
    height: string
    physical_frame: string
    ethnicity: string
    location: {
      google_place_id: string
      name: string
      longitude: number
      latitude: number
    }
    media: [
      {
        encoded_file: string
        name: string
        type: string //image/png
        is_default: boolean
      },
    ]
    bio: {
      bio: string
      looking_for: string
      languages: [{ id: string; name: string }]
      passions: [{ id: string; name: string }]
      other_details: [{ id: number; name: string }]
    }
  }
  is_premium: boolean
}

export type EthnicGroupItem = {
  id: string
  name: string
}

export type BantuzUserResponse = {
  data: BantuProfile[]
  message: string
  page_details: object
  status: number
  success: boolean
}

export type BantuProfile = {
  age: string
  bio: string
  code: string
  default_image: string
  distance: string
  email: string
  first_name: string
  gender: string
  last_name: string
  middle_name: string
  passions: [any] | null
  phone: string
  status: string
  thumbnail: string
  username: string
}

export type ChatRoomListItem = {
  unread_count: number
  conversation_id: number
  user: BantuProfile
}

export type UserMatchType = {
  user: BantuProfile
}

export type MatchUserListItem = {
  created_on: string
  id: number
  status: string
  swipe_a: MatchMessage
  swipe_b: MatchMessage
}

export type MatchMessage = {
  created_on: string
  status: string
  user: BantuProfile
  user_swiped: SwipedMatch
}

export type SwipedMatch = {
  id: number
  email: string
  first_name: string
  last_name: string
  middle_name: string
  username: string
  phone: string
  status: string
  age: string
  bio: string
  default_image: string
  created_on: string
  last_modified_on: string
}

export type SavedProfile = {
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
  profile: {
    birth_date: string
    gender: string
    height: string
    physical_frame: string
    ethnicity: string
    location: {
      id: string
      google_place_id: string
      name: string
      longitude: string
      latitude: string
    }
    media: CarouselItemParalax[]
    bio: {
      bio: string
      looking_for: string
      languages: {
        id: number
        name: string
      }[]
      passions: {
        id: number
        name: string
      }[]
      other_details: {
        id: number
        name: string
      }[]
    }
  }
}

export type UpdatedSavedProfile = {
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
  profile: {
    birth_date: string
    gender: string
    height: string
    physical_frame: string
    ethnicity: string
    location: {
      id: string
      google_place_id: string
      name: string
      longitude: string
      latitude: string
    }
    media: [
      {
        id: string
        name: string
        path: string
        type: string
        is_default: boolean
      },
    ]
    bio: {
      bio: string
      looking_for: string
      languages: {
        id: number
        name: string
      }[]
      passions: {
        id: number
        name: string
      }[]
      other_details: {
        id: number
        name: string
      }[]
    }
  }
}

export type PriceItem = {
  id: string
  currency: string
  product: string //product_id
  unit_amount: number
  unit_amount_decimal: number
}

export type Location = {
  accuracy: number
  altitude: number
  heading: number
  latitude: number
  longitude: number
  speed: number
}

export type SearchGlag = {
  username: string
  latitude: number
  longitude: number
  distance_from: string | null
  distance_to: string | null
  age_from: number
  age_to: number
  passions: [number]
  educations: [number]
  others: [number]
  page: number
  page_size: number
}

export type ConversionType = 'kmToMi' | 'miToKm'

export type ImageItem = {
  encoded_file: string
  name: string
  type: 'PHOTO' | 'VIDEO'
  is_default: boolean
}

export type RemoteImageItem = {
  id: number
  name: string
  path: string
  type: string
  is_default: boolean
}

export type SwipeActions = 'LIKE' | 'PASS' | 'SUPERLIKE'

export type SearchPassionItem = {
  id: number
  name: string
}

export type CarouselItemParalax = {
  id: number
  name: string
  path: string
  type: string
  is_default: boolean
}

export type Message = {
  content: string
  created_on: string
  id: number
  sender: string
  receiver: string
  type: string
}

export type BlockedItem = {
  user: {
    id: number
    email: string
    first_name: string
    last_name: string
    middle_name: string
    username: string
    phone: string
    status: string
    age: string
    bio: string
    default_image: string
    created_on: string
    last_modified_on: string
  }
  user_swiped: {
    id: number
    email: string
    first_name: string
    last_name: string
    middle_name: string
    username: string
    phone: string
    status: string
    age: string
    bio: string
    default_image: string
    created_on: string
    last_modified_on: string
  }
  description: string
  category: {
    id: number
    app_id: number
    version: number
    created_by: string
    created_on: string
    last_modified_by: string
    last_modified_on: string
    code: string
    name: string
    status: string
  }
}

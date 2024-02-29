import {
  BantuProfile,
  ChatRoomListItem,
  MatchMessage,
  MatchUserListItem,
  SwipedMatch,
  UserFrom,
} from 'src/utils/shared-type'

export type RootParamList = {
  AuthNavigator: AuthNavigatorParamList
  MainNavigator: MainStackParamList
}

export type AuthNavigatorParamList = {
  Welcome: undefined
  FacebookLogin: undefined
  Login: undefined
  ResetPassword: undefined
  UpdatePassword: { username: string }
  SignInWelcome: undefined
  KeepAccountSafe: undefined
  HowToCallYou: undefined
  EmailPassword: {
    data: {
      first_name: string | undefined
      last_name: string | undefined
      middle_name: string | undefined
      phone: string | undefined
      username: string | undefined
    }
  }
  BirthDayAge: {
    data: {
      first_name: string
      email: string
      password: string
      last_name: string
      middle_name: string
      phone: string
      username: string
    }
  }
  BasicDisclaimer: {
    data: {
      first_name: string
      email: string
      password: string
      last_name: string
      middle_name: string
      phone: string
      username: string
    }
  }
  GenderScreen: {
    data: {
      first_name: string
      email: string
      password: string
      last_name: string
      middle_name: string
      phone: string
      username: string
    }
  }
  BodyAndFrame: {
    data: {
      first_name: string
      email: string
      last_name: string
      password: string
      middle_name: string
      phone: string
      username: string
      profile: { birth_date: string; gender: string }
    }
  }
  EthnicityScreen: {
    data: {
      first_name: string
      email: string
      last_name: string
      password: string
      middle_name: string
      phone: string
      username: string
      profile: { birth_date: string; gender: string }
    }
  }
  LocationTracker: {
    data: {
      first_name: string
      email: string
      last_name: string
      password: string
      middle_name: string
      phone: string
      username: string
      profile: {
        birth_date: string
        gender: string
        height: string
        physical_frame: string
        ethnicity: string
      }
    }
  }
  PersonalityDisclaimer: {
    data: {
      first_name: string
      email: string
      last_name: string
      password: string
      middle_name: string
      phone: string
      username: string
      profile: {
        birth_date: string
        gender: string
        height: string
        physical_frame: string
        ethnicity: string
        location: {
          google_place_id: string
          name: string
          longitude: string
          latitude: string
        }
      }
    }
  }
  PersonalityScreen: {
    data: {
      first_name: string
      email: string
      last_name: string
      password: string
      middle_name: string
      phone: string
      username: string
      profile: {
        birth_date: string
        gender: string
        height: string
        physical_frame: string
        ethnicity: string
        location: {
          google_place_id: string
          name: string
          longitude: string
          latitude: string
        }
      }
    }
  }
  InteretScreen: {
    data: {
      first_name: string
      email: string
      last_name: string
      password: string
      middle_name: string
      phone: string
      username: string
      profile: {
        birth_date: string
        gender: string
        height: string
        physical_frame: string
        ethnicity: string
        location: {
          google_place_id: string
          name: string
          longitude: string
          latitude: string
        }
        media: [string]
      }
    }
  }

  FinishScreen: undefined
}

export type TabNavigatorParamList = {
  Home: undefined
  Explore: undefined
  Match: undefined
  Chats: undefined
  Profile: undefined
}

export type MainStackParamList = {
  BaseApplication: TabNavigatorParamList
  SeachWithName: undefined
  SearchResult: undefined
  SearchFilterResult: undefined
  ChatRoom: {
    request: SwipedMatch | null
    from: UserFrom
    chathead: ChatRoomListItem | null
  }
  ChatRoomIos: {
    request: MatchMessage | null
    from: UserFrom
    chathead: ChatRoomListItem | null
  }
  AboutMe: undefined
  Preference: undefined
  ParallaxScreen: { userProfile: BantuProfile }
  Security: undefined
  SafetyAndHelpCenter: undefined
  BlockedContacts: undefined
  PaymentSelectionMode: undefined
  PaymentScreen: undefined
  UserDescription: undefined
  ChatRoomList: undefined
  ExploreScreen: undefined
  ExploreFilter: undefined
  ExploreResult: {
    isSearch: boolean
    name: any
    result: BantuProfile[] | []
  }
}

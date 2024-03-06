import {
  BantuProfile,
  ChatRoomListItem,
  MatchMessage,
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
  EmailPassword: undefined
  BirthDayAge: undefined
  BasicDisclaimer: undefined
  GenderScreen: undefined
  BodyAndFrame: undefined
  EthnicityScreen: undefined
  LocationTracker: undefined
  PersonalityDisclaimer: undefined
  PersonalityScreen: undefined
  InteretScreen: undefined
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

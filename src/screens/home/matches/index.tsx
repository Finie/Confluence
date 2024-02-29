import { CompositeScreenProps, useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import {
  Alert,
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { getOtherSwipe, getOtherUserOnMatch, isEmpty } from 'src/helper'

import homeRouter from 'src/api/routers/homeRouter'
import Outline from 'src/assets/icons/loveoutline.svg'
import FloatingLabelInput from 'src/components/FloatingLabelInput'
import Text from 'src/components/Text'
import MatchItem from 'src/components/view/MatchItem'
import NoDatatDisplay from 'src/components/view/NoDatatDisplay'
import OverLayLoader from 'src/components/view/OverLayLoader'
import BaseContextProvider from 'src/context/BaseContextProvider'
import useThemeStyles from 'src/hooks/useThemeStyles'
import {
  MainStackParamList,
  TabNavigatorParamList,
} from 'src/routes/navigation.type'
import { MatchUserListItem, UserProfile } from 'src/utils/shared-type'

type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, 'Match'>,
  NativeStackScreenProps<MainStackParamList, 'ChatRoom'>
>

const MatchesScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [isLoading, setIsloading] = useState(false)
  const [is404Error, setis404Error] = useState('')
  const [matchData, setMatchData] = useState([])

  const isFocused = useIsFocused()

  // @ts-ignore
  const { userData } = useContext(BaseContextProvider)

  const userProfile: UserProfile = userData

  const fetchMatches = async () => {
    const request = { page: 1, pagesize: 10 }
    setIsloading(true)
    const response = await homeRouter.findMyMatches(request)
    setIsloading(false)

    if (response.ok) {
      setMatchData(response.data.data.data)
      return
    }

    if (response.status === 404) {
      setis404Error(response.data.message)
      return
    }

    return Alert.alert('Failed', response.data.message)
  }

  useEffect(() => {
    if (isFocused) {
      fetchMatches()
    }
  }, [isFocused])

  const handleSearchMatch = (searchText: string) => {
    console.log('==============handleSearchMatch======================')
    console.log(searchText)
    console.log('====================================')
  }

  const onHandleMatchSelection = (match: MatchUserListItem) => {
    const result = getOtherUserOnMatch(match, userProfile.username)
    console.log('============onHandleMatchSelection========================')
    console.log(result)
    console.log('====================================')
    navigation.navigate('ChatRoom', {
      request: result ? result : match.swipe_a.user_swiped,
      from: 'MATCHES',
      chathead: null,
    })
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.white,
    },
    backgroundimage: {
      width: '100%',
      height: 200,
      alignItems: 'center',
      paddingTop: 40,
    },
    matches: {
      fontSize: 32,
      lineHeight: 39,
      color: colors.white,
      fontWeight: '700',
      marginVertical: 16,
    },
    matchesdescription: {
      fontSize: 12,
      lineHeight: 15,
      textAlign: 'center',
      marginHorizontal: 80,
      color: colors.white,
    },
    floatview: {
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    scrollflex: {
      flexGrow: 1,
    },
    loaderstyle: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  })
  return (
    <ScrollView
      contentContainerStyle={styles.scrollflex}
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={require('src/assets/images/homeheader.png')}
        style={styles.backgroundimage}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="light-content"
        />
        <Outline />

        <Text style={styles.matches}>Matches</Text>
        <Text style={styles.matchesdescription}>
          You matched profiles. You liked each other. Now take it to the next
          level.
        </Text>
      </ImageBackground>
      <View style={styles.floatview}>
        <FloatingLabelInput
          placeholder={'Search'}
          onChangeText={handleSearchMatch}
          onBlur={() => {}}
        />
      </View>

      <OverLayLoader isLoading={isLoading} />

      <View style={{ marginBottom: 60, paddingHorizontal: 30 }}>
        {!isEmpty(matchData) ? (
          matchData.map((match: MatchUserListItem, index) => (
            <MatchItem
              key={index}
              onPress={() => onHandleMatchSelection(match)}
              data={getOtherSwipe(match, userProfile.username)}
            />
          ))
        ) : (
          <NoDatatDisplay
            mainHeader={'You don’t have any matches yet'}
            description={
              ' Make the first move. Swipe on profiles of people who you might match with.'
            }
            actiontext={'See Today’s Picks →'}
            onPress={function (): void {
              navigation.navigate('Home')
            }}
          />
        )}
      </View>
    </ScrollView>
  )
}
export default MatchesScreen

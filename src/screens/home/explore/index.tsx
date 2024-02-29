import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import homeRouter from 'src/api/routers/homeRouter'
import Search from 'src/assets/icons/search.svg'
import ExploreListItem from 'src/components/view/ExploreListItem'
import OverLayLoader from 'src/components/view/OverLayLoader'
import useLocation from 'src/hooks/useLocation'
import useThemeStyles from 'src/hooks/useThemeStyles'
import {
  MainStackParamList,
  TabNavigatorParamList,
} from 'src/routes/navigation.type'
import { BantuProfile, Location, SearchGlag } from 'src/utils/shared-type'

type ScreenProps = CompositeScreenProps<
  NativeStackScreenProps<TabNavigatorParamList, 'Explore'>,
  NativeStackScreenProps<MainStackParamList, 'ExploreResult'>
>

const ExploreScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const location: Location | null | undefined = useLocation()

  const [isLoading, setIsloading] = useState(false)
  const [exploreData, setExploreData] = useState([] as any)

  const fetchExploreData = async () => {
    setIsloading(true)
    const response = await homeRouter.getExploreTypes()
    setIsloading(false)

    if (response.ok) {
      setExploreData(response.data.data)

      return
    }

    return Alert.alert(response.problem, 'Failed to fetch explore')
  }

  const fetchUsersWithPassionId = async (passionId: number, name: string) => {
    const request: SearchGlag = {
      username: '',
      latitude: location?.latitude || 0,
      longitude: location?.longitude || 0,
      // @ts-ignore
      distance_from: '',
      // @ts-ignore
      distance_to: '',
      age_from: 18,
      age_to: 60,
      passions: [passionId],
      // @ts-ignore
      educations: [],
      // @ts-ignore
      others: [],
      page: 1,
      page_size: 50,
    }
    setIsloading(true)
    const response = await homeRouter.searchForUsersByFlags(request)
    setIsloading(false)

    if (response.ok) {
      // @ts-ignore

      if (response.data.page_details.total_page > 0) {
        return navigation.navigate('ExploreResult', {
          isSearch: false,
          name: name,
          // @ts-ignore
          result: response.data.data as BantuProfile[],
        })
      }
      return Alert.alert(
        'Request Successful',
        // @ts-ignore
        `${response.data.page_details.total_page} users found`,
      )
    }

    return Alert.alert(
      'Request failed',
      // @ts-ignore
      response.data?.message || response.data.toString(),
    )
  }

  useEffect(() => {
    fetchExploreData()
  }, [])

  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: colors.white,
      flexGrow: 1,
    },
    explorecontainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      paddingTop: 30,
    },
    exploretext: {
      fontSize: 24,
      lineHeight: 29.16,
      fontWeight: '600',
    },
    potentialmatches: {
      fontSize: 12,
      lineHeight: 15,
      color: colors.silver,
      marginHorizontal: 30,
      marginVertical: 10,
    },
    flatlist: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 100,
    },
    footer: { marginBottom: 100 },
  })
  return (
    <>
      <OverLayLoader isLoading={isLoading} />
      <SafeAreaView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <View style={styles.explorecontainer}>
          <Text style={styles.exploretext}>Explore</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ExploreFilter')
            }}>
            <Search />
          </TouchableOpacity>
        </View>
        <Text style={styles.potentialmatches}>
          Find potential matches who match your interests
        </Text>

        <FlatList
          data={exploreData}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatlist}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ExploreListItem
              title={item.name}
              size={item.total_profiles}
              image={item.icon_url}
              onPress={() => {
                fetchUsersWithPassionId(item.id, item.name)
              }}
            />
          )}
          ListFooterComponent={<View style={styles.footer} />}
        />
      </SafeAreaView>
    </>
  )
}

export default ExploreScreen

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Alert,
  Animated,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import utils from 'src/utils'

import homeRouter from 'src/api/routers/homeRouter'
import ParalaxBack from 'src/assets/icons/backbutton.svg'
import Direction from 'src/assets/icons/directions.svg'
import Info from 'src/assets/icons/infoicon.svg'
import Button from 'src/components/Button'
import PassionItem from 'src/components/PassionItem'
import ImageSlider from 'src/components/view/ImageSlider'
import OverLayLoader from 'src/components/view/OverLayLoader'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { BantuProfile, UpdatedSavedProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'ParallaxScreen'>

const ParallaxScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const translation = useRef(new Animated.Value(-300)).current
  const [translateUpdate, setTranslateUpdate] = useState<number>(-300)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { colors } = useThemeStyles()
  const [userData, setuserData] = useState<UpdatedSavedProfile>()

  const { userProfile } = route.params

  const _userProfile: BantuProfile = userProfile

  useEffect(() => {
    Animated.timing(translation, {
      toValue: translateUpdate,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [translateUpdate, translation])

  useEffect(() => {
    const getSelectedUserDetails = async () => {
      setIsLoading(true)
      const response = await homeRouter.getSelectedUserDetails(
        _userProfile.code,
      )

      setIsLoading(false)

      if (response.ok) {
        setuserData(response.data.data as UpdatedSavedProfile)
      } else {
        return Alert.alert(
          'Request failed',
          response.data?.message || response.data?.msg || '',
        )
      }
    }

    getSelectedUserDetails()
  }, [_userProfile.code])

  const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      backgroundColor: colors.primary,
      height: 70,
      top: 0,
      left: 0,
      right: 0,
      zIndex: 5,
      justifyContent: 'center',
    },
    scroll_view: {
      flex: 1,
    },
    inner_container: {
      flex: 1,
      height: 1000,
      borderTopStartRadius: 30,
      borderTopEndRadius: 30,
      zIndex: 10,
      marginTop: -32,
      padding: 30,
      backgroundColor: colors.white,
    },
    image: {
      height: 300,
    },
    carouselImage: {
      width: '100%',

      resizeMode: 'cover',
    },
    carousel_container: {
      height: 350,
    },
    tracks: {
      backgroundColor: colors.white,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      flexGrow: 1,
    },
    scroll: {
      flexGrow: 1,
    },

    nametext: {
      fontSize: 32,
      fontWeight: '600',
      lineHeight: 39,
      color: colors.black,
    },

    directioncontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
    },
    directionstyles: { fontSize: 12, marginLeft: 16 },
    abountcontainer: {
      marginVertical: 15,
    },
    about: {
      fontSize: 20,
      lineHeight: 24,
      color: colors.black,
    },
    description: {
      color: colors.black,
      marginVertical: 16,
    },
    descriptio: {
      color: colors.black,
      marginVertical: 16,
      fontWeight: 'bold',
    },
    touch: {
      flexDirection: 'row',
      backgroundColor: colors.snow,
      padding: 12,
      marginRight: 16,
      marginTop: 16,
      borderRadius: 10,
    },
    touchtitle: {
      fontSize: 12,
      lineHeight: 14,
      marginLeft: 16,
      color: colors.black,
    },
    moreabout: { fontSize: 20, lineHeight: 24, color: colors.black },
    moreaboutdescription: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      marginTop: 10,
    },
    bottom: {
      marginBottom: 150,
      marginTop: 30,
    },
    passionholder: {
      marginTop: 16,
    },
    passioniteholder: {
      marginVertical: 5,
      flexDirection: 'row',
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 9,
    },
    passion: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    biosection: {},
    touct_back: {
      padding: 24,
      marginTop: 16,
    },
    mustpick: {
      marginLeft: 7,
    },
  })

  const handleBlockUser = useCallback(async () => {
    const request = {
      username: userProfile.username,
      category_id: 1,
      description: 'string',
      block_user: true,
    }

    setIsLoading(true)
    const response = await homeRouter.reportUser(request)
    setIsLoading(false)

    if (response.ok) {
      //@ts-ignore
      Alert.alert('Request successful', response.data.message)
    } else {
      //@ts-ignore
      Alert.alert('Request failed', response.data.message)
    }
  }, [userProfile.username])

  return (
    <>
      <Animated.View
        style={[styles.header, { transform: [{ translateY: translation }] }]}>
        <TouchableOpacity
          style={styles.touct_back}
          onPress={() => navigation.goBack()}>
          <ParalaxBack color={colors.white} />
        </TouchableOpacity>
      </Animated.View>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
      <OverLayLoader isLoading={isLoading} />
      <ScrollView
        onScroll={(event: { nativeEvent: { contentOffset: { y: any } } }) => {
          const scrolling = event.nativeEvent.contentOffset.y
          if (scrolling < 300) {
            const result = scrolling + 160 - 310
            const final_offset = result < 0 ? result : 0
            setTranslateUpdate(final_offset)
          }
        }}
        // onScroll will be fired every 16ms
        scrollEventThrottle={16}
        style={styles.scroll_view}>
        <Animated.View style={[styles.carousel_container]}>
          <ImageSlider
            images={
              userData?.profile?.media && userData.profile.media.length > 1
                ? userData?.profile?.media
                : [
                    {
                      id: 0,
                      name: 'string',
                      path: userData?.profile?.media
                        ? userData.profile.media[0].path
                        : utils.placeholderImage,
                      // userData?.profile && userData.profile.media.length > 0
                      //   ? userData?.profile.media[0]
                      //   : ''

                      type: 'string',
                      is_default: true,
                    },
                  ]
            }
            interval={6000}
            onBackPress={function (): void {
              navigation.goBack()
            }}
          />
        </Animated.View>
        <View style={styles.inner_container}>
          <View>
            <View style={styles.tracks}>
              <Text style={styles.nametext}>{userProfile.username}</Text>

              <View style={styles.directioncontainer}>
                <Direction />
                <Text
                  style={
                    styles.directionstyles
                  }>{`${userProfile?.distance} away`}</Text>
              </View>

              <View style={styles.abountcontainer}>
                <Text style={styles.about}>About</Text>
                <Text style={styles.description}>{userProfile.bio}</Text>
              </View>

              {/* <View style={styles.abountcontainer}>
              <Text style={styles.about}>email</Text>
              <Text style={styles.descriptio}>{userProfile.email}</Text>
            </View> */}

              <View style={styles.biosection}>
                <Text style={styles.passion}>Passions</Text>

                <View style={styles.info}>
                  <Info />
                  <Text style={styles.mustpick}>You must pick at least 3</Text>
                </View>
                <View style={styles.passionholder}>
                  <FlatList
                    data={
                      userData?.profile?.bio
                        ? userData?.profile.bio.passions
                        : []
                    }
                    keyExtractor={(item, index) =>
                      index + '' + item.id.toString()
                    }
                    renderItem={({ item }) => (
                      <PassionItem
                        label={item.name}
                        onItemRemoved={() => {}}
                        onItemAdded={() => {}}
                      />
                    )}
                    numColumns={2}
                  />
                </View>
              </View>

              <View style={styles.bottom}>
                <Text style={styles.moreabout}>More about me</Text>
                <Text style={styles.moreaboutdescription}>
                  {`Ethnicity: ${userData?.profile.ethnicity} `}
                </Text>

                {/* eslint-disable-next-line react-native/no-inline-styles */}
                <View style={{ width: '50%', marginTop: 24, marginBottom: 60 }}>
                  <Button title={'Block user'} onPress={handleBlockUser} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default ParallaxScreen

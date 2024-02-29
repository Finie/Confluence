/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, View } from 'react-native'
// import CardStack, { Card } from 'react-native-card-stack-swiper'
// import Swiper from 'react-native-deck-swiper'
import { isEmpty } from 'src/helper'

import homeRouter from 'src/api/routers/homeRouter'
// import bantusinlesIcon from 'src/assets/icons/batuz_singles_logo.png'
// import Hearts from 'src/assets/icons/buttonheart.svg'
import CloseIcon from 'src/assets/icons/closeicon.svg'
// import Direction from 'src/assets/icons/direction.svg'
// import Dots from 'src/assets/icons/dotsmenu.svg'
import Info from 'src/assets/icons/infoicon.svg'
import Musicnote from 'src/assets/icons/musicnote.svg'
// import Rewind from 'src/assets/icons/rewind.svg'
// import Smiles from 'src/assets/icons/smilebutton.svg'
// import image_background from 'src/assets/illustrations/swiper_backgroud.png'
// import FinalCard from 'src/assets/images/finalcard.png'
// import Slider1 from 'src/assets/images/sliderone.png'
// import Slider3 from 'src/assets/images/slidethree.png'
// import Slider2 from 'src/assets/images/slidetwo.png'
import Screen from 'src/components/screen/Screen'
import Text from 'src/components/Text'
import BantuzCardSwiper from 'src/components/view/BantuzCardSwiper'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { BantuProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'ExploreResult'>

const ExploreResult: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()

  const { isSearch, name = '', result } = route.params

  const [isAmatch, setIsAmatch] = useState<boolean>(false)
  const [data, setData] = useState<BantuProfile[]>(result)

  const executeSwipeRight = async (username: string) => {
    const request = {
      username: username,
      status: 'LIKE',
    }
    const response = await homeRouter.postaMatchedUser(request)

    if (response.ok) {
      if (response.data.data.data.is_a_match) {
        setIsAmatch(true)
      }
      return
    }

    return Alert.alert(
      response.problem,
      'Error: ' + response.data?.message || response.data?.msg,
    )
  }

  const executeSwipeLeft = async (username: string) => {
    const request = {
      username: username,
      status: 'PASS',
    }

    const response = await homeRouter.postaMatchedUser(request)

    if (response.ok) {
    } else {
      return Alert.alert(
        response.problem,
        'Error: ' + response.data?.message || response.data?.msg,
      )
    }
  }

  const onSwipedRight = (profile: BantuProfile) => {
    if (!isEmpty(data)) {
      executeSwipeRight(profile.username)
    }
  }

  const onSwipedLeft = (profile: BantuProfile) => {
    if (!isEmpty(data)) {
      executeSwipeLeft(profile.username)
    }
  }

  const styles = StyleSheet.create({
    peopletext: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      color: colors.black,
    },
    musicdescription: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.snow,
      marginHorizontal: 16,
      borderRadius: 100,
      paddingHorizontal: 16,
      paddingVertical: 10,
      height: 40,
    },
    arttext: {
      marginHorizontal: 8,
      marginTop: -3,
    },
    peoplecontainer: {
      flexDirection: 'row',
      alignItems: 'center',
      margin: 30,
    },
    numberpersons: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.snow,
      justifyContent: 'center',
      padding: 5,
      borderRadius: 30,
      marginHorizontal: 80,
      marginVertical: 30,
    },
    numberpersonstext: {
      marginLeft: 8,
      fontSize: 12,
      lineHeight: 14,
    },
    content: {
      alignItems: 'center',
      height: 400,
    },
    card: {
      backgroundColor: colors.silver,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 32,
    },

    cardviewcontainer: {
      height: 400,
      width: 330,
      justifyContent: 'space-between',
    },
    directionholder: {
      marginHorizontal: 16,
      marginVertical: 32,
      flexDirection: 'row',
      alignItems: 'center',
    },
    directiontext: {
      marginLeft: 16,
      fontWeight: '400',
      color: colors.white,
      lineHeight: 15,
    },
    nameagecontainer: {
      marginHorizontal: 16,
      marginVertical: 62,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
    },
    nametext: {
      fontWeight: '600',
      color: colors.white,
      lineHeight: 39,
      fontSize: 32,
    },
    agetext: {
      fontWeight: '400',
      color: colors.white,
      lineHeight: 29,
      fontSize: 24,
    },
    scrollContainer: {
      flexGrow: 1,
      alignItems: 'center',
      paddingBottom: 170,
    },
    text: {
      fontSize: 20,
      textAlign: 'center',
      marginVertical: 20,
    },
    dayspick: {
      textAlign: 'center',
      fontSize: 24,
      lineHeight: 30,
      color: colors.black,
      fontWeight: '600',
      marginVertical: 30,
    },
    lastcontainer: {
      width: 300,
      height: '100%',
      borderRadius: 32,
      backgroundColor: 'red',
    },
    buttons: {
      height: 60,
      width: '70%',
      marginHorizontal: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      zIndex: 10,
      position: 'absolute',
      top: 430,
      marginBottom: 60,
    },
    smileButton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    heartsbutton: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cancel: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.black,
      justifyContent: 'center',
      alignItems: 'center',
    },
    rewind: {
      width: 50,
      height: 50,
      borderRadius: 30,
      backgroundColor: colors.silver,
      justifyContent: 'center',
      alignItems: 'center',
    },
    swipes_container: {
      borderRadius: 30,
      overflow: 'hidden',
      height: 380,
      width: 300,
    },
    buttonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    buttonContainer_texts: {
      fontSize: 14,
      marginTop: 4,
      fontWeight: '700',
      color: colors.silver,
    },
    checkitout: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.secondary,
    },
    checkitouttouchable: { justifyContent: 'center', alignItems: 'center' },
    subscribetext: {
      fontSize: 12,
      lineHeight: 15,
      fontWeight: '700',
      color: colors.black,
    },
    subscribecontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
    },
    suboverall: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      backgroundColor: colors.accent,
      marginHorizontal: 30,
      borderRadius: 10,
      marginTop: 40,
      marginBottom: 30,
    },
    overlayWrapper: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      justifyContent: 'flex-start',
      marginTop: 30,
      marginLeft: -30,
    },
  })

  return (
    <Screen
      isMatched={isAmatch}
      isheaderVisible
      title={!isSearch ? '' : 'People who fit your search'}
      onBackPress={() => navigation.goBack()}>
      {true ? (
        <View style={styles.peoplecontainer}>
          <Text style={styles.peopletext}>People who love</Text>
          <View style={styles.musicdescription}>
            <Musicnote />
            <Text style={styles.arttext}>{name}</Text>
            <CloseIcon />
          </View>
        </View>
      ) : (
        <View style={styles.numberpersons}>
          <Info />
          <Text style={styles.numberpersonstext}>
            {`${data.length} people fit your search filters`}
          </Text>
        </View>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <BantuzCardSwiper
          bantuzUser={data}
          onSwipeRight={(currentUser: BantuProfile) => {
            onSwipedRight(currentUser)
          }}
          onSwipeLeft={(currentUser: BantuProfile) => {
            onSwipedLeft(currentUser)
          }}
          onOpenMoredetails={(currentUser: BantuProfile) => {
            navigation.navigate('ParallaxScreen', {
              userProfile: currentUser,
            })
          }}
          onUpdatebantuUser={(
            type: 'Add' | 'Remove',
            profile: BantuProfile | null,
          ) => {
            if (type === 'Remove') {
              setData(data => data.slice(1)) // remove item
            } else {
              if (profile) {
                setData(data => [
                  profile, //add new profile
                  ...data,
                ])
              }
            }
          }}
        />

        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('PaymentSelectionMode')
          }}
          style={styles.suboverall}>
          <Image
            source={bantusinlesIcon}
            style={{
              width: 40,
              height: 40,
            }}
          />

          <View style={styles.subscribecontainer}>
            <Text style={styles.subscribetext}>
              Subscribe to get more top picks, rewinds, and more!
            </Text>
          </View>
          <TouchableOpacity style={styles.checkitouttouchable}>
            <Text style={styles.checkitout}>Check it out →</Text>
          </TouchableOpacity>
        </TouchableOpacity> */}
      </ScrollView>
    </Screen>
  )
}

export default ExploreResult

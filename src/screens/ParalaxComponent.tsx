import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useRef, useState } from 'react'
import {
  Animated,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import ParalaxBack from 'src/assets/icons/backbutton.svg'
import Direction from 'src/assets/icons/directions.svg'
import ImageSlider from 'src/components/view/ImageSlider'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { CarouselItemParalax } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'ParallaxScreen'>

const ParalaxComponent: React.FC<ScreenProps> = ({ navigation, route }) => {
  const translation = useRef(new Animated.Value(-300)).current
  const [translateUpdate, setTranslateUpdate] = useState<number>(-300)
  const { colors } = useThemeStyles()

  const { userProfile } = route.params

  const userData: BantuProfile = userProfile

  const [carouselItems] = useState<CarouselItemParalax[]>([
    {
      id: 0,
      name: 'string',
      path: 'https://plus.unsplash.com/premium_photo-1685125885305-283d5dd0964f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      type: 'PHOTO',
      is_default: true,
    },
    {
      id: 1,
      name: 'string',
      path: 'https://images.unsplash.com/photo-1685856471902-5854dbb3530d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80',
      type: 'PHOTO',
      is_default: true,
    },
    {
      id: 2,
      name: 'string',
      path: 'https://plus.unsplash.com/premium_photo-1685125885305-283d5dd0964f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      type: 'PHOTO',
      is_default: true,
    },
  ])

  useEffect(() => {
    Animated.timing(translation, {
      toValue: translateUpdate,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }, [translateUpdate, translation])

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
  })

  return (
    <>
      <Animated.View
        style={[styles.header, { transform: [{ translateY: translation }] }]}>
        <TouchableOpacity style={styles.touct_back}>
          <ParalaxBack color={colors.white} />
        </TouchableOpacity>
      </Animated.View>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
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
            images={carouselItems}
            interval={6000}
            onBackPress={function (): void {
              //   navigation.goBack()
            }}
          />
        </Animated.View>
        <View style={styles.inner_container}>
          <View>
            <View style={styles.tracks}>
              <Text style={styles.nametext}>{'userProfile.username'}</Text>

              <View style={styles.directioncontainer}>
                <Direction />
                <Text
                  style={
                    styles.directionstyles
                  }>{`{userProfile?.distance} away`}</Text>
              </View>

              <View style={styles.abountcontainer}>
                <Text style={styles.about}>About</Text>
                <Text style={styles.description}>{'userProfile.bio'}</Text>
              </View>

              <View style={styles.abountcontainer}>
                <Text style={styles.about}>email</Text>
                <Text style={styles.descriptio}>{'userProfile.email'}</Text>
              </View>

              <View style={styles.biosection}>
                <Text style={styles.passion}>Passions</Text>

                {/* <View style={styles.info}>
          <Info />
          <Text style={styles.mustpick}>You must pick at least 3</Text>
        </View> */}
                <View style={styles.passionholder}>
                  {/* <VerticalMapList
              data={userProfile.profile.bio.passions}
              renderItem={({ item, index }) => (
                <PassionItem
                  label={item.name}
                  onItemRemoved={() => {}}
                  onItemAdded={() => {}}
                />
              )}
              numColumns={2}
            /> */}
                </View>
              </View>

              <View style={styles.bottom}>
                <Text style={styles.moreabout}>More about me</Text>
                <Text
                  style={
                    styles.moreaboutdescription
                  }>{`Ethnicity: {userProfile?.username}`}</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default ParalaxComponent

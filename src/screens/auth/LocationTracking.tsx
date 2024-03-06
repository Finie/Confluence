/* eslint-disable react/no-unstable-nested-components */

/* eslint-disable import/order */

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import Location from 'src/assets/icons/location.svg'
import FabButton from 'src/components/FabButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import { runAddRegistrationData } from 'src/data/redux/slice/auth'
import useLocation from 'src/hooks/useLocation'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'LocationTracker'
>

const LocationTracking: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const { location } = useLocation()

  const dispatch = useDispatch()

  const handleEnablePermissionClickEvent = () => {
    Linking.openSettings()
  }

  const handleSumbit = () => {
    dispatch(
      runAddRegistrationData({
        dataType: 'LOCATION',
        payload: {
          google_place_id: location?.coords.heading ?? '',
          name: '',
          longitude: `${location?.coords.longitude ?? ''}`,
          latitude: `${location?.coords.latitude ?? ''}`,
        },
      }),
    )
    navigation.navigate('PersonalityDisclaimer')
  }

  const styles = StyleSheet.create({
    main: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      padding: 30,
    },

    howtwxt: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
    },
    sharetext: {
      fontSize: 12,
      fontWeight: '400',
      lineHeight: 15,
    },
    bottomcontainer: {
      flexDirection: 'row',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    emptychecjbox: {
      borderWidth: 2,
      borderColor: colors.silver,
      width: 20,
      height: 21,
      borderRadius: 4,
    },
    location_name: {
      fontSize: 14,
      lineHeight: 18,
      fontWeight: '700',
    },

    discalimertext: {
      fontSize: 12,
      lineHeight: 14,
      marginVertical: 16,
    },
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    fabcontainer2: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    accordion: { flex: 1, marginTop: 40 },
    locationButton: {
      height: 60,
      borderWidth: 1,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: 24,
      borderRadius: 30,
      borderColor: colors.primary,
      flex: 3,
    },
    texts: {
      marginLeft: 24,
      fontSize: 14,
      lineHeight: 17,
      fontWeight: '700',
      color: colors.primary,
    },
    mainb: { flexDirection: 'row' },
    helperview: { flex: 1 },
  })

  const RenderEnableButton = () => (
    <View style={styles.accordion}>
      <View style={styles.mainb}>
        <TouchableOpacity
          onPress={handleEnablePermissionClickEvent}
          style={styles.locationButton}>
          <Location />
          <Text style={styles.texts}>Enable Location Tracking</Text>
        </TouchableOpacity>
        <View style={styles.helperview} />
      </View>

      <Text style={styles.discalimertext}>
        Your location will be used to show potential matches near you, and show
        subscription plans available in your region. This is optional
      </Text>
    </View>
  )

  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack()
      }}
      isLoading={false}>
      <View style={styles.main}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>Meet people nearby & far away</Text>
          {/* { */}

          {location && //@ts-ignore
          location.coords.latitude === 0 ? (
            <View style={styles.accordion}>
              <View style={styles.mainb}>
                <Text style={styles.discalimertext}>
                  Based on your location, you are currently in
                </Text>
              </View>
              {/* @ts-ignore */}
              <Text style={styles.location_name}>{location.placeName}</Text>
            </View>
          ) : (
            <RenderEnableButton />
          )}
        </View>

        <View style={styles.bottomcontainer}>
          <View style={styles.fabcontainer}>
            <View style={styles.fabcontainer2}>
              <FabButton onPress={handleSumbit} />
              <Text>Skip</Text>
            </View>
          </View>
        </View>
      </View>
    </AuthScreen>
  )
}

export default LocationTracking

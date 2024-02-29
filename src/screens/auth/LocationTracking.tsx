import { NavigationContainer } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import AnimatedLottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import {
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal, { ModalContent } from 'react-native-modals'
import { isEmpty } from 'src/helper'

import Location from 'src/assets/icons/location.svg'
import FabButton from 'src/components/FabButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useLocation from 'src/hooks/useLocation'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { UserProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'LocationTracker'
>

const LocationTracking: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const [locationIsGranted, setLocationIsGranted] = useState(false)
  const [currentLongitude, setCurrentLongitude] = useState(0)
  const [currentLatitude, setCurrentLatitude] = useState(0)
  const [locationStatus, setLocationStatus] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const location = useLocation()

  const UserInfo: UserProfile = route.params.data

  const handleEnablePermissionClickEvent = () => {
    Linking.openSettings()
  }

  const handleSumbit = () => {
    const request = {
      first_name: UserInfo.first_name,
      email: UserInfo.email,
      last_name: UserInfo.last_name,
      password: UserInfo.password,
      middle_name: UserInfo.middle_name,
      phone: UserInfo.phone,
      username: UserInfo.username,
      profile: {
        birth_date: UserInfo.profile.birth_date,
        gender: UserInfo.profile.gender,
        height: UserInfo.profile.height,
        physical_frame: UserInfo.profile.physical_frame,
        ethnicity: UserInfo.profile.ethnicity,
        location: {
          google_place_id: 'string',
          name: '',
          longitude: `${location?.longitude || 0}`,
          latitude: `${location?.latitude || 0}`,
        },
      },
    }

    navigation.navigate('PersonalityDisclaimer', { data: request })
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
        <View style={styles.helperview}></View>
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

          {!isEmpty(location) ? (
            location.permissionStatus === 'granted' &&
            location.latitude !== 0 ? (
              <View style={styles.accordion}>
                <View style={styles.mainb}>
                  <Text style={styles.discalimertext}>
                    Based on your location, you are currently in
                  </Text>
                </View>

                <Text style={styles.location_name}>{location.placeName}</Text>
              </View>
            ) : (
              <RenderEnableButton />
            )
          ) : (
            <RenderEnableButton />
          )}

          {/* //xa */}
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

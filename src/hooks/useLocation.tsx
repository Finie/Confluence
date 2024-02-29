import Geolocation from '@react-native-community/geolocation'
import { useEffect, useState } from 'react'
import { PermissionsAndroid, Platform } from 'react-native'

import { Location } from 'src/utils/shared-type'

const useLocation = () => {
  const [location, setLocation] = useState<Location | null | undefined>()

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getLocation()
          }
        } else {
          getLocation()
        }
      } catch (err) {
        console.warn(err)
      }
    }

    const getLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          setLocation(position.coords)
        },
        error => {
          console.warn(error.code, error.message)
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      )
    }

    requestLocationPermission()

    return () => Geolocation.stopObserving()
  }, [])

  return location
}

export default useLocation

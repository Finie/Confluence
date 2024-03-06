/* eslint-disable import/order */

/* eslint-disable semi */
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation'
import { useCallback, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import {
  checkMultiple,
  openSettings,
  PERMISSIONS,
  PermissionStatus,
  requestMultiple,
} from 'react-native-permissions'
import utils from 'src/utils'

const useLocation = () => {
  const [location, setLocation] = useState<GeolocationResponse>()

  const getLocation = useCallback(() => {
    Geolocation.getCurrentPosition(
      (position: GeolocationResponse) => {
        console.log('=======GeolocationResponse==========')
        console.log('position: ', position)
        console.log('====================================')
        setLocation(position)
      },
      error => {
        utils.showToastMessage(`Error reading location [${error}]`, 'WARNING')
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    )
  }, [])

  const requestAuthorization = useCallback(async () => {
    await Geolocation.requestAuthorization()
    getLocation()
  }, [getLocation])

  const requestLocationPermission = useCallback(() => {
    requestMultiple(
      Platform.OS === 'android'
        ? [
            PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          ]
        : [
            PERMISSIONS.IOS.LOCATION_ALWAYS,
            PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
          ],
    )
      .then(response => {
        const granted: PermissionStatus =
          Platform.OS === 'android'
            ? response['android.permission.ACCESS_COARSE_LOCATION'] ||
              response['android.permission.ACCESS_FINE_LOCATION']
            : response['ios.permission.LOCATION_ALWAYS'] ||
              response['ios.permission.LOCATION_WHEN_IN_USE']

        switch (granted) {
          case 'granted':
            requestAuthorization()
            break

          case 'denied':
            requestLocationPermission()
            break

          case 'unavailable':
            utils.showToastMessage(
              'This feature is not available on your deveice',
              'WARNING',
            )
            break

          default:
            // otherwise the permissions are blocked
            openSettings().catch(error =>
              utils.showToastMessage(`Permission Error ${error}`, 'WARNING'),
            )
            break
        }
      })
      .catch((error: any) => {
        utils.showToastMessage(`Permission Error: ${error}`, 'WARNING')
      })
  }, [requestAuthorization])

  useEffect(() => {
    const checkPermissionRequest = async () => {
      try {
        checkMultiple(
          Platform.OS === 'android'
            ? [
                PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
                PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
              ]
            : [
                PERMISSIONS.IOS.LOCATION_ALWAYS,
                PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
              ],
        )
          .then(response => {
            const granted: PermissionStatus =
              Platform.OS === 'android'
                ? response['android.permission.ACCESS_COARSE_LOCATION'] ||
                  response['android.permission.ACCESS_FINE_LOCATION']
                : response['ios.permission.LOCATION_ALWAYS'] ||
                  response['ios.permission.LOCATION_WHEN_IN_USE']

            switch (granted) {
              case 'granted':
                requestAuthorization()
                break

              case 'denied':
                requestLocationPermission()
                break

              case 'limited':
                requestLocationPermission()
                break

              case 'unavailable':
                utils.showToastMessage(
                  'This feature is not available on your deveice',
                  'WARNING',
                )
                break

              default:
                // otherwise the permissions are blocked
                openSettings().catch(error =>
                  utils.showToastMessage(
                    `Permission Error ${error}`,
                    'WARNING',
                  ),
                )
                break
            }
          })
          .catch((error: any) => {
            utils.showToastMessage(`Permission Error ${error}`, 'WARNING')
          })
      } catch (err) {
        console.warn(err)
      }
    }
    checkPermissionRequest()
  }, [requestAuthorization, requestLocationPermission])

  return { location }
}

export default useLocation

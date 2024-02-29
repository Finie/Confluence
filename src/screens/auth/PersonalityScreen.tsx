import { NativeStackScreenProps } from '@react-navigation/native-stack'
import mime from 'mime'
import React, { useState } from 'react'
import {
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { Image as Imagecompressor } from 'react-native-compressor'
import RNFS from 'react-native-fs'
import { launchImageLibrary } from 'react-native-image-picker'
import { checkAndUpdateImageArray, isEmpty } from 'src/helper'
import * as Yup from 'yup'

import CameraActive from 'src/assets/icons/cameraactive.svg'
import CloseSelected from 'src/assets/icons/closeimageselected.svg'
import CameraInActive from 'src/assets/icons/imageactive.svg'
import InactiveImage from 'src/assets/icons/inactiveImage.svg'
import InactiveRecord from 'src/assets/icons/inactiveRecord.svg'
import FabButton from 'src/components/FabButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useImagePicker from 'src/hooks/useImagePicker'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { UserProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'PersonalityScreen'
>

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
})

const PersonalityScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const [ischecked, setisChecked] = useState(false)
  const [image1uri, setImage1uri] = useState('' as string | undefined | null)
  const [image2uri, setImage2uri] = useState('' as string | undefined | null)
  const [image3uri, setImage3uri] = useState('' as string | undefined | null)
  const [imageArray, setImageArray] = useState([] as any)
  const [imageData, getPhoto] = useImagePicker()

  const UserInfo: UserProfile = route.params.data

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
          name: 'string',
          longitude: UserInfo.profile.location.longitude,
          latitude: UserInfo.profile.location.latitude,
        },
        media: imageArray,
      },
    }

    navigation.navigate('InteretScreen', { data: request })
  }

  const handleAddImageAtIndex = async (index: number) => {
    const response: { path: string; base64: string } = await getPhoto()

    const new_image_array = checkAndUpdateImageArray(
      imageArray,
      response?.base64,
    )

    if (!isEmpty(response)) {
      switch (index) {
        case 0:
          setImage1uri(response.path)
          setImageArray(new_image_array)
          break
        case 1:
          setImage2uri(response.path)
          setImageArray(new_image_array)
          break
        case 2:
          setImage3uri(response.path)
          setImageArray(new_image_array)
          break
        default:
          break
      }
    }
  }

  const styles = StyleSheet.create({
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
    disclaimer: {
      flexDirection: 'row',
      flex: 2,
      alignItems: 'center',
    },
    discalimertext: {
      marginLeft: 15,
      fontSize: 12,
      lineHeight: 14,
    },
    discalimertext2: {
      fontSize: 12,
      lineHeight: 14,
      marginTop: 20,
      color: colors.black,
    },
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    imageholders: {
      height: 142,
      flex: 1,
      backgroundColor: colors.snow,
      margin: 3,
      flexDirection: 'row',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    viewimageholders: {
      height: 142,
      flex: 1,
      backgroundColor: colors.snow,
      margin: 3,
      borderRadius: 10,
      overflow: 'hidden',
    },
    imageholdercontainer: {
      // height: 200,
      flexDirection: 'row',
      marginTop: 15,
    },
  })
  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack()
      }}
      isLoading={false}>
      <>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>
            Show your personality with photos & videos
          </Text>
          <Text style={styles.discalimertext2}>
            Give people a better sense of who you are with photos and videos.
          </Text>

          <View style={styles.imageholdercontainer}>
            <TouchableOpacity
              onPress={() => handleAddImageAtIndex(0)}
              style={styles.imageholders}>
              {isEmpty(image1uri) ? (
                <CameraActive />
              ) : (
                <ImageBackground
                  style={{ height: 142, width: '100%', alignItems: 'flex-end' }}
                  source={{ uri: image1uri }}>
                  <TouchableOpacity onPress={() => handleAddImageAtIndex(0)}>
                    <CloseSelected />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleAddImageAtIndex(1)}
              style={styles.imageholders}>
              {isEmpty(image2uri) ? (
                <CameraActive />
              ) : (
                <ImageBackground
                  style={{ height: 142, width: '100%', alignItems: 'flex-end' }}
                  source={{ uri: image2uri }}>
                  <TouchableOpacity onPress={() => handleAddImageAtIndex(1)}>
                    <CloseSelected />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleAddImageAtIndex(2)}
              style={styles.imageholders}>
              {isEmpty(image3uri) ? (
                <CameraActive />
              ) : (
                <ImageBackground
                  style={{ height: 142, width: '100%', alignItems: 'flex-end' }}
                  source={{ uri: image3uri }}>
                  <TouchableOpacity onPress={() => handleAddImageAtIndex(2)}>
                    <CloseSelected />
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.imageholdercontainer}>
            <TouchableOpacity
              disabled
              onPress={() => handleAddImageAtIndex(3)}
              style={styles.imageholders}>
              <InactiveImage />
            </TouchableOpacity>
            <TouchableOpacity
              disabled
              onPress={() => handleAddImageAtIndex(4)}
              style={styles.imageholders}>
              <InactiveRecord />
            </TouchableOpacity>
            <TouchableOpacity
              disabled
              onPress={() => handleAddImageAtIndex(5)}
              style={styles.imageholders}>
              <InactiveRecord />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.bottomcontainer}>
          <View style={styles.disclaimer}>
            <Text style={styles.discalimertext}>
              Get the premium plan to add videos or more than three photos to
              your profile
            </Text>
          </View>

          <View style={styles.fabcontainer}>
            <FabButton onPress={handleSumbit} />
          </View>
        </View>
      </>
    </AuthScreen>
  )
}

export default PersonalityScreen

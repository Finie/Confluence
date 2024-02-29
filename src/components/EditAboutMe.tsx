/* eslint-disable react-native/no-inline-styles */
// import mime from 'mime'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
// import CardStack, { Card } from 'react-native-card-stack-swiper';
// import DraggableGrid from 'react-native-draggable-grid'
// import { launchImageLibrary } from 'react-native-image-picker'
import Modal, { BottomModal, ModalContent } from 'react-native-modals'

import Dropdown from './view/customs/Dropdown'
import DropdownHeight from './view/customs/DropdownHeight'
import DropdownSingleSelection from './view/customs/DropdownSingleSelection'
import authRoute from 'src/api/routers/authRoute'
import homeRouter from 'src/api/routers/homeRouter'
import profileupdates from 'src/api/routers/profileupdates'
import CameraActive from 'src/assets/icons/cameraactive.svg'
import VideoIcon from 'src/assets/icons/imageactive.svg'
import BaseContextProvider from 'src/context/BaseContextProvider'
import EncryptionStore from 'src/data/EncryptionStore'
import useImagePicker from 'src/hooks/useImagePicker'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { CarouselItemParalax, UserProfile } from 'src/utils/shared-type'

import Button from './Button'
import EditHeightIos from './EditHeightIos'
import FloatingLabelInput from './FloatingLabelInput'
import FloatingTextArea from './FloatingTextArea'
import PassionComponent from './PassionComponent'
//
import Text from './Text'

type Props = {
  onIsloading: (isloading: boolean) => void
  onPassionEditing: () => void
  onEndPassionEditting: () => void
}

const EditAboutMe: React.FC<Props> = ({
  onIsloading,
  onPassionEditing,
  onEndPassionEditting,
}) => {
  const { colors } = useThemeStyles()
  const [imageData, getPhoto] = useImagePicker()
  const heights = [
    { id: "4'0", label: '4`0    (122cm)' },
    { id: "4'2", label: '4`2    (127cm)' },
    { id: "4'1", label: '4`1    (124cm)' },
    { id: "4'3", label: '4`3    (129cm)' },
    { id: "4'4", label: '4`4    (132cm)' },
    { id: "4'5", label: '4`5    (134cm)' },
    { id: '4`6', label: '4`6    (137cm)' },
    { id: "4'7", label: '4`7    (140cm)' },
    { id: "4'8", label: '4`8    (142cm)' },
    { id: "4'9", label: '4`9    (145cm)' },
    { id: "4'1", label: '4`10    (147cm)' },
    { id: "4'1", label: '4`11    (150cm)' },
    { id: "5'0", label: '5`0    (152cm)' },
    { id: "5'1", label: '5`1    (155cm)' },
    { id: "5'2", label: '5`2    (157cm)' },
    { id: "5'3", label: '5`3    (160cm)' },
    { id: "5'4", label: '5`4    (163cm)' },
    { id: "5'5", label: '5`5    (165cm)' },
    { id: "5'6", label: '5`6    (168cm)' },
    { id: "5'7", label: '5`7    (170cm)' },
    { id: "5'8", label: '5`8    (173cm)' },
    { id: "5'9", label: '5`9    (175cm)' },
    { id: "5'1", label: '5`10    (178cm)' },
    { id: "5'1", label: '5`11    (180cm)' },
    { id: "6'0", label: '6`0    (183cm)' },
    { id: "6'1", label: '6`1    (185cm)' },
    { id: "6'2", label: '6`2    (188cm)' },
    { id: "6'3", label: '6`3    (191cm)' },
    { id: "6'4", label: '6`4    (193cm)' },
    { id: "6'5", label: '6`5    (196cm)' },
    { id: "6'6", label: '6`6    (198cm)' },
    { id: "6'7", label: '6`7    (201cm)' },
    { id: "6'8", label: '6`8    (203cm)' },
    { id: "6'9", label: '6`9    (206cm)' },
    { id: "6'1", label: '6`10    (208cm)' },
    { id: "6'1", label: '6`11    (211cm)' },
  ]

  const Lookfor = [
    {
      id: 0,
      name: 'MAN',
    },
    {
      id: 1,
      name: 'WOMAN',
    },
  ]
  const [updatedMedias, setUpdatedMedias] = useState<CarouselItemParalax[]>()
  const [passionLoading, setPassionLoading] = useState(false)
  const [image1uri, setImage1uri] = useState('' as string | undefined | null)
  const [languages, setLanguage] = useState<any[]>([])
  const [updatedLocationName, setUpdatedLocationName] = useState<string>('')
  const [updatedLanguages, setUpdatedLanguages] = useState<
    {
      id: string
      name: string
    }[]
  >()
  const [updatedHeight, setUpdatedHeight] = useState<{
    id: string
    label: string
  }>()
  const [isEditingHeight, setisEditingHeight] = useState<boolean>(false)
  const [passion, setPassion] = useState([
    {
      id: '',
      name: '',
    },
  ])
  const [imagestateModal, setImagestateModal] = useState(false)
  const [displayImage, setDisplayImage] = useState(
    '' as string | null | undefined,
  )

  const [imageRequest, setImageRequest] = useState({})
  const [isIosPassionEditing, setIsIosPassionEditing] = useState<boolean>(false)
  const windowWidt = Dimensions.get('window').width
  const [isUpdatingPassion, setIsUpdatingPassion] = useState<boolean>(false)
  const windowWidh = windowWidt / 3
  const windowWidth = windowWidh - 18
  // const windowHeight = Dimensions.get('window').height;
  const [bottomModalAndTitle, setbottomModalAndTitle] = useState<boolean>(false)
  const [updatedDescription, setUpdatedDescription] = useState<string>('')
  //@ts-ignore
  const { userData, setuserData } = useContext(BaseContextProvider)

  const userProfile: UserProfile = userData

  const [userHeight, setUserHeight] = useState(userProfile.profile.height)
  const [lookForGender, setLookForGender] = useState(
    userProfile.profile.bio.looking_for,
  )

  const [updatedPassions, setupdatedPassions] = useState(
    userProfile.profile.bio.passions,
  )

  const [updatedPassionsRemote, setUpdatedPassionsRemote] = useState([])

  const fetchPassions = async () => {
    setPassionLoading(true)
    const response = await authRoute.fetchPassions()
    setPassionLoading(false)

    if (response.ok) {
      //@ts-ignore
      setPassion(response.data.data)
    }
  }

  const fetchLanguages = async () => {
    const response = await authRoute.fetchLanguages()

    if (response.ok) {
      //@ts-ignore
      setLanguage(response.data.data)
      return
    }

    //@ts-ignore
    return Alert.alert('Request failed', response.data.message)
  }

  useEffect(() => {
    fetchPassions()
    fetchLanguages()
  }, [])

  useEffect(() => {
    if (isIosPassionEditing) {
      onPassionEditing()
    } else {
      onEndPassionEditting()
    }
  }, [isIosPassionEditing, onEndPassionEditting, onPassionEditing])

  const handleGetImage = async (type: string) => {
    if (type === 'photo') {
      //@ts-ignore
      const response: { path: string; base64: string } = await getPhoto()
      const currentTimeMillis = new Date().getTime()

      setImage1uri(response.path)
      setDisplayImage(response.path)
      setImagestateModal(true)
      const imageReques = {
        encoded_file: response.base64,
        name: currentTimeMillis,
        type: 'PHOTO',
        is_default: false,
      }
      setImageRequest(imageReques)
    } else {
      //@ts-ignore
      const response: { path: string; base64: string } = await getPhoto()
      const currentTimeMillis = new Date().getTime()

      setImage1uri(response.path)
      setDisplayImage(response.path)
      setImagestateModal(true)
      const imageReques = {
        encoded_file: response.base64,
        name: currentTimeMillis,
        type: 'PHOTO',
        is_default: false,
      }
      setImageRequest(imageReques)
    }
  }

  const handleImageUplaod = async () => {
    onIsloading(true)
    const respose = await profileupdates.updateMedias([imageRequest])
    onIsloading(false)

    if (respose.ok) {
      return Alert.alert('Image was uploaded successfully')
    }

    return Alert.alert(
      respose.problem + ' : ' + respose.status,
      respose.status === 413
        ? 'Image too large' //@ts-ignore
        : respose.data?.message || 'Image was not uploaded successfully',
    )
  }

  const handleUpdatePassion = async (passionId: string) => {
    setIsUpdatingPassion(true)
    await profileupdates.updatePassion(passionId)
    setIsUpdatingPassion(false)
    getCurrentUser()
  }

  const handleDeletePassion = async (passionId: string) => {
    setIsUpdatingPassion(true)
    await profileupdates.deletePassion(passionId)
    setIsUpdatingPassion(false)
    getCurrentUser()
  }

  // handle update
  const handleBackgroundUserUpdateinfo = async () => {
    const request: UserProfile = {
      first_name: userProfile.first_name,
      email: userProfile.email,
      last_name: userProfile.last_name,
      password: userProfile.password,
      middle_name: userProfile.middle_name,
      phone: userProfile.phone,
      username: userProfile.username,
      profile: {
        birth_date: userProfile.profile.birth_date,
        gender: userProfile.profile.gender,
        height: updatedHeight ? updatedHeight.label : userHeight,
        physical_frame: userProfile.profile.physical_frame,
        ethnicity: userProfile.profile.ethnicity,
        location: {
          google_place_id: '',
          name: updatedLocationName
            ? updatedLocationName
            : userProfile.profile.location.name,
          longitude: userProfile.profile.location.longitude,
          latitude: userProfile.profile.location.latitude,
        },
        bio: {
          bio: updatedDescription
            ? updatedDescription
            : userProfile.profile.bio.bio, //@ts-ignore
          // passions: updatePassionIds(updatedPassions),
          looking_for: lookForGender,
        },
      },
    }

    const response = await profileupdates.updateUseInfo(request)

    if (response.ok) {
      getCurrentUser() //@ts-ignore
      return Alert.alert('Success!', response.data.message)
    }

    return Alert.alert(
      response.problem, //@ts-ignore
      response.data?.message || response.data?.details,
    )
  }

  // handle update
  const handleUserUpdateinfo = async () => {
    const request: UserProfile = {
      first_name: userProfile.first_name,
      email: userProfile.email,
      last_name: userProfile.last_name,
      password: userProfile.password,
      middle_name: userProfile.middle_name,
      phone: userProfile.phone,
      username: userProfile.username,
      profile: {
        birth_date: userProfile.profile.birth_date,
        gender: userProfile.profile.gender,
        height: updatedHeight ? updatedHeight.label : userHeight,
        physical_frame: userProfile.profile.physical_frame,
        ethnicity: userProfile.profile.ethnicity,
        location: {
          google_place_id: '',
          name: updatedLocationName
            ? updatedLocationName
            : userProfile.profile.location.name,
          longitude: userProfile.profile.location.longitude,
          latitude: userProfile.profile.location.latitude,
        },
        bio: {
          bio: updatedDescription
            ? updatedDescription
            : userProfile.profile.bio.bio, //@ts-ignore
          // passions: updatePassionIds(updatedPassions),
          looking_for: lookForGender,
        },
      },
    }

    onIsloading(true)
    const response = await profileupdates.updateUseInfo(request)

    onIsloading(false)

    if (response.ok) {
      getCurrentUser() //@ts-ignore
      return Alert.alert('Success!', response.data.message)
    }

    return Alert.alert(
      response.problem, //@ts-ignore
      response.data?.message || response.data?.details,
    )
  }

  const getCurrentUser = async () => {
    onIsloading(true)
    const response = await homeRouter.getCurrentAccounts()
    onIsloading(false)

    if (response.ok) {
      // @ts-ignore
      const updatedData = updateBantuzUser(userData, response.data.data)

      setuserData(updatedData)
      EncryptionStore.storeBantuUser(updatedData)
      return
    }
    return Alert.alert(
      'Oops...',
      response.data?.message || response.data?.msg || 'Something went wrong',
    )
  }

  const styles = StyleSheet.create({
    pressable: {
      height: 130,
      width: 100,
      overflow: 'hidden',
      borderRadius: 6,
      margin: 8,
    },
    container: {
      backgroundColor: colors.snow,
      borderRadius: 6,
    },
    image_path: {
      height: 130,
      width: 100,
      justifyContent: 'flex-end',
      borderRadius: 6,
    },
    photo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginHorizontal: 30,
      marginTop: 32,
    },
    imagePickerContainer: {
      marginHorizontal: 30,
    },
    imageholders: {
      height: 142,
      backgroundColor: colors.snow,
      margin: 3,
      // flexDirection: 'row',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      width: windowWidth,
    },
    content: {
      alignItems: 'center',
      height: 400,
    },
    image: {
      width: '100%',
      height: '100%',
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
      borderRadius: 10,
      overflow: 'hidden',
    },
    cardviewcontainere: {
      height: 400,
      width: 330,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 36,
      overflow: 'hidden',
    },
    imageholdercontainer: {
      // height: 200,
      flexDirection: 'row',
      marginTop: 15,
    },
    scroll: {
      flex: 1,
    },
    biosection: {
      marginHorizontal: 30,
    },
    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginVertical: 40,
      marginHorizontal: 30,
    },
    gender: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 20,
    },
    gender2: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 56,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderColor: colors.snow,
    },
    genderitem: {
      marginLeft: 16,
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 16,
      backgroundColor: colors.snow,
      padding: 5,
      borderRadius: 10,
    },
    mustpick: { marginLeft: 16, fontSize: 12, lineHeight: 14 },

    passioniteholder: {
      marginVertical: 5,
      flexDirection: 'row',
    },
    passionholder: {
      marginTop: 16,
    },
    passionname: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
      marginVertical: 20,
    },
    passion: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    lastbutton: {
      marginHorizontal: 30,
      marginBottom: 60,
    },
    placeholder_text: {
      color: colors.silver,
    },

    // remove from here

    button: {
      width: 150,
      height: 100,
      backgroundColor: 'blue',
    },
    wrapper: {
      paddingTop: 100,
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    },
    item: {
      width: 150,
      height: 100,
      borderRadius: 8,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 8,
    },
    item_text: {
      fontSize: 40,
      lineHeight: 56,
      color: '#FFFFFF',
    },
  })

  const scale_animation = useRef(new Animated.Value(1)).current
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const onPressIn = () => {
    Animated.timing(scale_animation, {
      toValue: 0,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }

  const interpolated_scale_animation = scale_animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0.9, 1, 1.4],
  })

  const onPressOut = () => {
    Animated.timing(scale_animation, {
      toValue: 1,
      duration: 150,
      useNativeDriver: false,
    }).start()
  }

  const onLongPress = (item: CarouselItemParalax) => {
    Animated.timing(scale_animation, {
      toValue: 2,
      duration: 150,
      useNativeDriver: false,
    }).start()

    handleUpdateDefaultImage(item)
  }

  const handleUpdateDefaultImage = async (item: CarouselItemParalax) => {
    const result = replaceDefaultImage(userData.profile.media, item)

    userData.profile.media = result
    setUpdatedMedias(result)
    const response = await profileupdates.updateDefaultImage(item.id)

    console.log('===============response=====================')
    console.log(JSON.stringify(response.data))
    console.log('====================================')

    if (response.ok) {
      // @ts-ignore
      getCurrentUser()
      return Alert.alert('Update Successfull', response.data.message)
    }
    // @ts-ignore
    return Alert.alert('Update Failed', response.data.message)
  }

  const getCurrentList = (): CarouselItemParalax[] => {
    return updatedMedias ? updatedMedias : userData.profile.media
  }

  const handleUpdateLanguage = async (languageId: number) => {
    // setIsUpdatingPassion(true)
    await profileupdates.updateLanguages(languageId)
    // setIsUpdatingPassion(false)
    getCurrentUser()
  }

  const handleDeleteLanguage = async (languageId: number) => {
    // setIsUpdatingPassion(true)
    await profileupdates.deleteLanguage(languageId)
    // setIsUpdatingPassion(false)
    getCurrentUser()
  }

  useEffect(() => {
    if (isEditingHeight) {
      onPassionEditing()
    } else {
      onEndPassionEditting()
    }
  }, [isEditingHeight, onEndPassionEditting, onPassionEditing])

  return (
    <>
      {Platform.OS === 'ios' ? (
        <>
          {isIosPassionEditing && (
            <EditPassionsIos
              passion={passion}
              updatedPassions={updatedPassions}
              setupdatedPassions={setupdatedPassions}
              updatedPassionsRemote={updatedPassionsRemote}
              setUpdatedPassionsRemote={setUpdatedPassionsRemote}
              onPassionReordered={function (passionItem: any): void {
                setPassion(passionItem)
              }}
              onEditPassionClosed={function (): void {
                setIsIosPassionEditing(false)
              }}
              isButtonDisabled={isUpdatingPassion}
              onItemRemoved={function (data: {
                id: string
                name: string
              }): void {
                handleDeletePassion(data.id)
              }}
              onItemAdded={function (data: { id: string; name: string }): void {
                handleUpdatePassion(data.id)
              }}
            />
          )}

          {isEditingHeight && (
            <EditHeightIos
              height={heights}
              setUpdatedHeight={setUpdatedHeight}
              onEditHeightClosed={function (): void {
                setisEditingHeight(false)
              }}
            />
          )}

          {!isIosPassionEditing && !isEditingHeight && (
            <View style={styles.scroll}>
              <View style={styles.photo}>
                <Text>Photo</Text>

                <TouchableOpacity onPress={() => setbottomModalAndTitle(true)}>
                  <Text style={{ color: colors.primary }}>+ Add Image</Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <View style={styles.passionholder}>
                  {/* @ts-ignore */}
                  <Text
                    style={{
                      fontSize: 10,
                      marginHorizontal: 30,
                      marginVertical: -10,
                      color: colors.silver,
                    }}>
                    Long press to select
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      paddingVertical: 16,
                    }}>
                    {getCurrentList().map(
                      (item: {
                        id: number
                        is_default: boolean
                        name: string
                        path: string
                        type: string
                      }) => {
                        return (
                          <Pressable
                            onTouchStart={() => {
                              setActiveIndex(item.id)
                            }}
                            key={item.id}
                            onPressOut={onPressOut}
                            onPressIn={() => {
                              onPressIn()
                            }}
                            onLongPress={() => onLongPress(item)}
                            style={styles.pressable}>
                            <Animated.View
                              style={[
                                styles.container,
                                {
                                  borderRadius: 6,
                                  transform: [
                                    {
                                      scale:
                                        activeIndex === item.id
                                          ? interpolated_scale_animation
                                          : 1,
                                    },
                                  ],
                                },
                              ]}>
                              <ImageBackground
                                style={styles.image_path}
                                source={{
                                  uri:
                                    item?.path ||
                                    'https://cdn-icons-png.flaticon.com/512/496/496415.png?w=1480&t=st=1686822728~exp=1686823328~hmac=537de452083ff2423e3979eaddf879d48a498a136dacb6addbb544efb396d13a',
                                }}>
                                {item.is_default && (
                                  <View
                                    style={{
                                      backgroundColor: 'rgba(0,0,0,0.5)',
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                    }}>
                                    <Text
                                      style={{
                                        color: colors.white,
                                        fontSize: 12,
                                      }}>
                                      Profile
                                    </Text>
                                  </View>
                                )}
                              </ImageBackground>
                            </Animated.View>
                          </Pressable>
                        )
                      },
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.biosection}>
                <Text>Bio</Text>
                <Text style={styles.placeholder_text}>First name</Text>
                <FloatingLabelInput
                  onBlur={() => console.log()}
                  onChangeText={() => console.log()}
                  value={userProfile.first_name}
                  placeholder={''}
                />

                <Text style={styles.placeholder_text}>Last name</Text>
                <FloatingLabelInput
                  onBlur={() => console.log()}
                  onChangeText={() => console.log()}
                  placeholder=""
                  value={userProfile.last_name}
                />

                <Text style={styles.placeholder_text}>Birthday</Text>

                <FloatingLabelInput
                  onBlur={() => console.log()}
                  onChangeText={() => console.log()}
                  placeholder=""
                  value={userProfile.profile.birth_date}
                />

                <Text style={styles.placeholder_text}>Gender</Text>

                <FloatingLabelInput
                  onBlur={() => console.log()}
                  onChangeText={() => console.log()}
                  placeholder=""
                  value={userProfile.profile.gender}
                />

                <Text style={styles.placeholder_text}>Self description</Text>
                <FloatingTextArea
                  onBlur={() => console.log()}
                  onChangeText={text => {
                    setUpdatedDescription(text)
                  }}
                  placeholder=""
                  value={
                    updatedDescription
                      ? updatedDescription
                      : userProfile.profile.bio.bio
                  }
                />

                <Text style={styles.placeholder_text}>I live in</Text>
                <FloatingLabelInput
                  onBlur={() => console.log()}
                  onChangeText={text => {
                    setUpdatedLocationName(text)
                  }}
                  placeholder=""
                  value={
                    userProfile.profile.location.name
                      ? userProfile.profile.location.name
                      : updatedLocationName
                      ? updatedLocationName
                      : 'Not set'
                  }
                />

                <Text style={styles.placeholder_text}>
                  Which languages do you speak?
                </Text>

                <Dropdown
                  options={languages}
                  onSelected={function (selectedItems: {
                    id: string
                    name: string
                  }): void {
                    const isPresent = itemIsPresent(
                      userProfile.profile.bio.languages,
                      selectedItems,
                    )

                    //@ts-ignore
                    const result: [{ id: string; name: string }] =
                      addOrRemoveItem(
                        userProfile.profile.bio.languages,
                        selectedItems,
                      )

                    setUpdatedLanguages(result)

                    if (isPresent) {
                      //remove item
                      userProfile.profile.bio.languages = result
                      handleDeleteLanguage(+selectedItems.id)
                    } else {
                      // add item
                      //@ts-ignore
                      userProfile.profile.bio.languages = result
                      handleUpdateLanguage(+selectedItems.id)
                    }
                  }}
                  activeSelection={
                    updatedLanguages
                      ? updatedLanguages
                      : userProfile.profile.bio.languages
                  }
                />

                <Text style={styles.placeholder_text}>
                  What are you looking for?
                </Text>
                <DropdownSingleSelection
                  title={'I am looking for...'}
                  options={Lookfor}
                  activeSelection={[
                    userProfile.profile.bio.looking_for === 'WOMAN'
                      ? { id: 1, name: 'WOMAN' }
                      : { id: 0, name: 'MAN' },
                  ]}
                  onSelected={(selectedItems: any) => {
                    setLookForGender(selectedItems.name)
                    handleBackgroundUserUpdateinfo()
                  }}
                />

                <Text style={styles.placeholder_text}>Height</Text>
                <DropdownHeight
                  activeSelection={
                    updatedHeight
                      ? updatedHeight.label
                      : userProfile.profile.height
                  }
                  options={heights}
                  isLookFor
                  onTriggerOnPress={() => setisEditingHeight(true)}
                  onSelected={function (selectedItems: any): void {
                    setUserHeight(selectedItems.label)
                  }}
                />
              </View>

              <View style={{ marginHorizontal: 30, marginTop: 8 }}>
                <Text style={styles.passion}>Passions</Text>
              </View>
              <View style={{ marginHorizontal: 30 }}>
                <PassionComponent
                  passion={passion}
                  updatedPassions={updatedPassions}
                  setupdatedPassions={setupdatedPassions}
                  updatedPassionsRemote={updatedPassionsRemote}
                  setUpdatedPassionsRemote={setUpdatedPassionsRemote}
                  onPassionReordered={function (passionItem: any): void {
                    setPassion(passionItem)
                  }}
                  onMoreClicked={function (): void {
                    setIsIosPassionEditing(true)
                  }}
                  isButtonDisabled={isUpdatingPassion}
                  onUpdatePassion={function (data: {
                    id: string
                    name: string
                  }): void {
                    handleUpdatePassion(data.id)
                  }}
                  onDeletePassion={function (data: {
                    id: string
                    name: string
                  }): void {
                    handleDeletePassion(data.id)
                  }}
                />
              </View>

              <View style={styles.lastbutton}>
                <Button title="Save" onPress={handleUserUpdateinfo} />
              </View>
              {}

              <Modal visible={imagestateModal} width={0.8}>
                <ModalContent>
                  <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Image // @ts-ignore
                      source={{ uri: displayImage }}
                      style={{ height: 200, width: '100%' }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: 12,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setImagestateModal(false)
                      }}>
                      <Text style={{ color: colors.black_to_primary }}>
                        Close
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setImagestateModal(false)
                        handleImageUplaod()
                      }}>
                      <Text style={{ color: colors.black_to_primary }}>
                        Upload
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ModalContent>
              </Modal>
            </View>
          )}
        </>
      ) : (
        <View style={styles.scroll}>
          <View style={styles.photo}>
            <Text>Photo</Text>

            <TouchableOpacity onPress={() => setbottomModalAndTitle(true)}>
              <Text style={{ color: colors.primary }}>+ Add Image</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              justifyContent: 'center',
            }}>
            <View style={styles.passionholder}>
              {/* @ts-ignore */}
              <Text
                style={{
                  fontSize: 10,
                  marginHorizontal: 30,
                  marginVertical: -10,
                  color: colors.silver,
                }}>
                Long press to select
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  paddingVertical: 16,
                }}>
                {getCurrentList().map(
                  (item: {
                    id: number
                    is_default: boolean
                    name: string
                    path: string
                    type: string
                  }) => {
                    return (
                      <Pressable
                        onTouchStart={() => {
                          setActiveIndex(item.id)
                        }}
                        key={item.id}
                        onPressOut={onPressOut}
                        onPressIn={() => {
                          onPressIn()
                        }}
                        onLongPress={() => onLongPress(item)}
                        style={styles.pressable}>
                        <Animated.View
                          style={[
                            styles.container,
                            {
                              borderRadius: 6,
                              transform: [
                                {
                                  scale:
                                    activeIndex === item.id
                                      ? interpolated_scale_animation
                                      : 1,
                                },
                              ],
                            },
                          ]}>
                          <ImageBackground
                            style={styles.image_path}
                            source={{
                              uri:
                                item?.path ||
                                'https://cdn-icons-png.flaticon.com/512/496/496415.png?w=1480&t=st=1686822728~exp=1686823328~hmac=537de452083ff2423e3979eaddf879d48a498a136dacb6addbb544efb396d13a',
                            }}>
                            {item.is_default && (
                              <View
                                style={{
                                  backgroundColor: 'rgba(0,0,0,0.5)',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{ color: colors.white, fontSize: 12 }}>
                                  Profile
                                </Text>
                              </View>
                            )}
                          </ImageBackground>
                        </Animated.View>
                      </Pressable>
                    )
                  },
                )}
              </View>
            </View>
          </View>
          <View style={styles.biosection}>
            <Text>Bio</Text>
            <Text style={styles.placeholder_text}>First name</Text>
            <FloatingLabelInput
              onBlur={() => console.log()}
              onChangeText={() => console.log()}
              value={userProfile.first_name}
              placeholder={''}
            />

            <Text style={styles.placeholder_text}>Last name</Text>
            <FloatingLabelInput
              onBlur={() => console.log()}
              onChangeText={() => console.log()}
              placeholder=""
              value={userProfile.last_name}
            />

            <Text style={styles.placeholder_text}>Birthday</Text>

            <FloatingLabelInput
              onBlur={() => console.log()}
              onChangeText={() => console.log()}
              placeholder=""
              value={userProfile.profile.birth_date}
            />

            <Text style={styles.placeholder_text}>Gender</Text>

            <FloatingLabelInput
              onBlur={() => console.log()}
              onChangeText={() => console.log()}
              placeholder=""
              value={userProfile.profile.gender}
            />

            <Text style={styles.placeholder_text}>Self description</Text>
            <FloatingTextArea
              onBlur={() => console.log()}
              onChangeText={text => {
                console.log()
                setUpdatedDescription(text)
              }}
              placeholder=""
              value={
                updatedDescription
                  ? updatedDescription
                  : userProfile.profile.bio.bio
              }
            />

            <Text style={styles.placeholder_text}>I live in</Text>
            <FloatingLabelInput
              onBlur={() => console.log()}
              onChangeText={text => {
                setUpdatedLocationName(text)
              }}
              placeholder=""
              value={
                userProfile.profile.location.name
                  ? userProfile.profile.location.name
                  : updatedLocationName
                  ? updatedLocationName
                  : 'Not set'
              }
            />

            <Text style={styles.placeholder_text}>
              Which languages do you speak?
            </Text>

            <Dropdown
              options={languages}
              onSelected={function (selectedItems: {
                id: string
                name: string
              }): void {
                //@ts-ignore

                const isPresent = itemIsPresent(
                  userProfile.profile.bio.languages,
                  selectedItems,
                )

                const result: { id: string; name: string }[] = addOrRemoveItem(
                  userProfile.profile.bio.languages,
                  selectedItems,
                )

                setUpdatedLanguages(result)
                if (isPresent) {
                  //remove item
                  //@ts-ignore
                  userProfile.profile.bio.languages = result
                  handleDeleteLanguage(+selectedItems.id)
                } else {
                  // add item
                  //@ts-ignore
                  userProfile.profile.bio.languages = result
                  handleUpdateLanguage(+selectedItems.id)
                }
              }}
              activeSelection={userProfile.profile.bio.languages}
            />

            <Text style={styles.placeholder_text}>
              {'What are you looking for?'}
            </Text>
            <DropdownSingleSelection
              title={'I am looking for...'}
              options={Lookfor}
              activeSelection={[
                userProfile.profile.bio.looking_for === 'WOMAN'
                  ? { id: 1, name: 'WOMAN' }
                  : { id: 0, name: 'MAN' },
              ]}
              onSelected={(selectedItems: any) => {
                setLookForGender(selectedItems.name)
              }}
            />

            <Text style={styles.placeholder_text}>Height</Text>
            <DropdownHeight
              activeSelection={userProfile.profile.height}
              options={heights}
              isLookFor
              onSelected={function (selectedItems: any): void {
                setUserHeight(selectedItems.label)
              }}
            />
          </View>

          <View style={{ marginHorizontal: 30, marginTop: 8 }}>
            <Text style={styles.passion}>Passions</Text>
          </View>
          <View style={{ marginHorizontal: 30 }}>
            <PassionComponent
              passion={passion}
              updatedPassions={updatedPassions}
              setupdatedPassions={setupdatedPassions}
              updatedPassionsRemote={updatedPassionsRemote}
              setUpdatedPassionsRemote={setUpdatedPassionsRemote}
              onPassionReordered={function (passionItem: any): void {
                setPassion(passionItem)
              }}
              onMoreClicked={function (): void {
                setIsIosPassionEditing(true)
              }}
              isButtonDisabled={isUpdatingPassion}
              onUpdatePassion={function (data: {
                id: string
                name: string
              }): void {
                handleUpdatePassion(data.id)
              }}
              onDeletePassion={function (data: {
                id: string
                name: string
              }): void {
                handleDeletePassion(data.id)
              }}
            />
          </View>

          <View style={styles.lastbutton}>
            <Button title="Save" onPress={handleUserUpdateinfo} />
          </View>
          {}

          <Modal visible={imagestateModal} width={0.8}>
            <ModalContent>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Image // @ts-ignore
                  source={{ uri: displayImage }}
                  style={{ height: 200, width: '100%' }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 12,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setImagestateModal(false)
                  }}>
                  <Text style={{ color: colors.black_to_primary }}>Close</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setImagestateModal(false)
                    handleImageUplaod()
                  }}>
                  <Text style={{ color: colors.black_to_primary }}>Upload</Text>
                </TouchableOpacity>
              </View>
            </ModalContent>
          </Modal>
        </View>
      )}

      <BottomModal
        visible={bottomModalAndTitle}
        onTouchOutside={() => setbottomModalAndTitle(false)}
        height={0.2}
        width={1}
        onSwipeOut={() => setbottomModalAndTitle(false)}>
        <ModalContent>
          <View style={{ margin: 16 }}>
            <Text
              style={{ fontSize: 20, lineHeight: 22, color: colors.silver }}>
              Select file
            </Text>

            <TouchableOpacity
              onPress={() => handleGetImage('photo')}
              style={{
                marginVertical: 8,
                alignItems: 'center',
                flexDirection: 'row',
                marginHorizontal: 4,
              }}>
              <VideoIcon />

              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  marginHorizontal: 8,
                  color: colors.black_to_primary,
                }}>
                Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginVertical: 8,
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onPress={() => handleGetImage('video')}>
              <CameraActive />

              <Text
                style={{
                  fontSize: 18,
                  lineHeight: 22,
                  marginHorizontal: 8,
                  color: colors.black,
                }}>
                Video
              </Text>
            </TouchableOpacity>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  )
}

export default EditAboutMe

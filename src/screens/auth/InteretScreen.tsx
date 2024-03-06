/* eslint-disable semi */

/* eslint-disable import/order */

/* eslint-disable react-native/no-inline-styles */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { addRemoveArray, isEmpty } from 'src/helper'
import utils from 'src/utils'

// import * as Yup from 'yup'
import authRoute from 'src/api/routers/authRoute'
import Info from 'src/assets/icons/infoicon.svg'
import Button from 'src/components/Button'
import FloatingTextArea from 'src/components/FloatingTextArea'
import PassionComponent from 'src/components/PassionComponent'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import Dropdown from 'src/components/view/customs/Dropdown'
import DropdownSingleSelection from 'src/components/view/customs/DropdownSingleSelection'
import EditPassionsIos from 'src/components/view/EditPassionsIos'
import BaseContextProvider from 'src/context/BaseContextProvider'
import { AuthState } from 'src/data/redux/state.types'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { RegistrationData } from 'src/utils/global.types'
import { SwipeData } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'InteretScreen'
>

interface BaseContext {
  selectedLanguage: any
  setSelectedLanguage: any
  selectedLookFor: any
  setSelectedLookFor: any
}

const InterestsScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const {
    selectedLanguage,
    setSelectedLanguage,
    selectedLookFor,
    setSelectedLookFor, //@ts-ignore
  } = useContext<BaseContext>(BaseContextProvider)

  const [passion, setPassion] = useState([])
  const [selectedPassion, setSelectedPassion] = useState([] as any)
  const [language, setLanguage] = useState([] as any)
  const [isPassionselected, setisPassionselected] = useState('')
  const [islangselected, setIslangselected] = useState('')
  const [editaboutme, seteditaboutme] = useState('')
  const [isAboutmeset, setIsAboutmeset] = useState('')

  const [isIosPassionActive, setIsiosPassionActive] = useState<boolean>(false)
  const [updatedPassionsRemote, setupdatedPassionsRemote] = useState([])

  const [isLoading, setIsloading] = useState(false)
  const [islookforset, setIslookforset] = useState('')

  const { registrationData } = useSelector((state: AuthState) => state.auth)

  const fetchPassions = async () => {
    const response = await authRoute.fetchPassions()

    if (response.ok) {
      //@ts-ignore
      setPassion(response.data.data)
    }
  }

  const fetchOtherData = async () => {
    const response = await authRoute.fetchOtherPersions()

    if (response.ok) {
    }
  }

  const fetchLanguages = async () => {
    const response = await authRoute.fetchLanguages()

    if (response.ok) {
      //@ts-ignore
      setLanguage(response.data.data)
    }
    // Alert.alert('Request failed', response.data.message)
  }

  const handleSumbit = async () => {
    if (isEmpty(editaboutme)) {
      setIsAboutmeset('Required field')
      return
    } else if (isEmpty(selectedLookFor)) {
      setIslookforset('Required field')
      return
    } else if (isEmpty(selectedLanguage)) {
      setIslangselected('Required field')
      return
    } else if (isEmpty(selectedPassion)) {
      setisPassionselected('Required field')
      return
    }

    if (registrationData) {
      const request: RegistrationData = {
        first_name: registrationData?.first_name ?? '',
        email: registrationData.email ?? '',
        last_name: registrationData.last_name ?? '',
        password: registrationData.password ?? '',
        middle_name: registrationData.middle_name ?? '',
        phone: registrationData.phone ?? '',
        username: registrationData.username ?? '',
        profile: {
          birth_date: registrationData.profile.birth_date ?? '',
          gender: registrationData.profile.gender ?? '',
          height: registrationData.profile.height ?? '',
          physical_frame: registrationData.profile.physical_frame ?? '',
          ethnicity: registrationData.profile.ethnicity ?? '',
          location: {
            google_place_id:
              registrationData.profile.location.google_place_id ?? '',
            name: '',
            longitude: registrationData.profile.location.longitude,
            latitude: registrationData.profile.location.latitude,
          },
          // media: UserInfo.profile.media,
          bio: {
            bio: editaboutme,
            looking_for: selectedLookFor === 0 ? 'MAN' : 'WOMAN',
            language_ids: selectedLanguage,
            passion_ids: getPassionIds(),
            other_details_ids: [],
          },
        },
      }

      console.log('====================================')
      console.log('account data: ', JSON.stringify(request))
      console.log('====================================')

      setIsloading(true)
      const response = await authRoute.createUser(request)
      setIsloading(false)

      console.log('====================================')
      console.log('response: ', JSON.stringify(response.data))
      console.log('====================================')

      if (response.ok) {
        navigation.navigate('FinishScreen')
        return
      }

      return utils.showToastMessage(
        //@ts-ignore
        `Request failed ${response.data.message ?? response.data.details}`,
        'ERROR',
      )
    } else {
      utils.showToastMessage('Reg data lost', 'WARNING')
    }
  }

  useEffect(() => {
    fetchLanguages()
    fetchOtherData()
    fetchPassions()
  }, [])

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
      padding: 8,
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

    imageholdercontainer: {
      marginTop: 15,
    },
    passion: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      fontWeight: '700',
    },
    info: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.snow,
      padding: 5,
      borderRadius: 10,
    },
    mustpick: { marginLeft: 16, fontSize: 12, lineHeight: 14 },
    mustpick_error: {
      marginLeft: 16,
      fontSize: 12,
      lineHeight: 14,
      color: colors.danger,
    },
    pash: { marginTop: 20 },
    pash2: { marginTop: 20, flexDirection: 'row' },
    selectioninactive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.snow,
      padding: 10,
      borderRadius: 8,
      marginRight: 8,
    },
    selectionactive: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.primary,
      padding: 10,
      borderRadius: 8,
      marginRight: 8,
    },
    selectiontexttypeinactive: { marginHorizontal: 16 },
    selectiontexttypeactive: { marginHorizontal: 16, color: colors.white },
    buttoncontainer: { marginHorizontal: 30, marginTop: 30, marginBottom: 50 },
    passionholder: {
      marginTop: 16,
    },
    passioniteholder: {
      marginVertical: 5,
      flexDirection: 'row',
    },
    passionname: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
      marginVertical: 20,
    },
    morecontainer: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
    },

    morecontainerisFirst: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
    morecontainerisLast: {
      borderWidth: 1,
      padding: 16,
      borderColor: colors.snow,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },
    morename: {
      marginLeft: 16,
      fontSize: 14,
      lineHeight: 17,
      color: colors.black,
    },
  })

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

  const handleUpdatePassion = async (passion_item: {
    id: string
    name: string
  }) => {
    selectedPassion.push(passion_item)
  }

  const handleDeletePassion = async (passion_item: {
    id: string
    name: string
  }) => {
    const index = selectedPassion.indexOf(passion_item)
    selectedPassion.splice(index, 1)
  }

  const getPassionIds = (): number[] => {
    const array: number[] = []
    selectedPassion.map((item: { id: any }) => {
      if (item.id) {
        array.push(item.id)
      }
    })
    return array
  }

  return (
    <>
      {isIosPassionActive ? (
        <>
          <EditPassionsIos
            passion={passion}
            updatedPassions={selectedPassion}
            setupdatedPassions={setSelectedPassion}
            updatedPassionsRemote={updatedPassionsRemote}
            setUpdatedPassionsRemote={setupdatedPassionsRemote}
            onPassionReordered={function (passionItem: any): void {
              setPassion(passionItem)
            }}
            onEditPassionClosed={function (): void {
              setIsiosPassionActive(false)
            }}
            onItemRemoved={function (data: { id: string; name: string }): void {
              handleDeletePassion(data)
            }}
            onItemAdded={function (data: { id: string; name: string }): void {
              handleUpdatePassion(data)
            }}
            isButtonDisabled={false}
          />
        </>
      ) : (
        <AuthScreen
          onBackPressed={function (): void {
            navigation.goBack()
          }}
          isLoading={isLoading}>
          <View>
            <View style={styles.container}>
              <Text style={styles.howtwxt}>
                Tell us something interesting about yourself.
              </Text>
              <Text style={styles.discalimertext2}>
                Your potential matches will get a better sense about who you
                are.
              </Text>

              <View style={styles.imageholdercontainer}>
                <FloatingTextArea
                  placeholder={'About me'}
                  onChangeText={function (text: string): void {
                    setIsAboutmeset('')
                    seteditaboutme(text)
                  }}
                  onBlur={function (): void {}}
                />
                {!isEmpty(isAboutmeset) && (
                  <Text
                    style={{
                      marginTop: -16,
                      marginBottom: 16,
                      fontSize: 12,
                      color: colors.danger,
                    }}>
                    Description is a required field
                  </Text>
                )}

                <Text style={{ marginBottom: -8 }}>I am looking for...</Text>
                <DropdownSingleSelection
                  title={'I am looking for...'}
                  options={Lookfor}
                  onSelected={(selectedItems: SwipeData) => {
                    setIslookforset('')
                    setSelectedLookFor([selectedItems.id])
                  }}
                />
                {!isEmpty(islookforset) && (
                  <Text
                    style={{
                      marginTop: -16,
                      marginBottom: 16,
                      fontSize: 12,
                      color: colors.danger,
                    }}>
                    Looking for is a required field
                  </Text>
                )}

                <Text style={{ marginBottom: -8 }}>
                  I speak these languages
                </Text>
                {/* @ts-ignore */}
                <Dropdown
                  title={'I speak these languages'}
                  options={language}
                  onSelected={(selectedItems: SwipeData) => {
                    setIslangselected('')
                    setSelectedLanguage(
                      addRemoveArray(selectedLanguage, selectedItems.id),
                    )
                  }}
                />
                {!isEmpty(islangselected) && (
                  <Text
                    style={{
                      marginTop: -16,
                      marginBottom: 16,
                      fontSize: 12,
                      color: colors.danger,
                    }}>
                    Language is a required field
                  </Text>
                )}
              </View>

              <View style={styles.pash}>
                <Text style={styles.passion}>Passions</Text>

                <View style={styles.info}>
                  <Info />
                  <Text
                    style={
                      !isEmpty(isPassionselected)
                        ? styles.mustpick_error
                        : styles.mustpick
                    }>
                    You must pick at least 3
                  </Text>
                </View>
              </View>

              <View style={styles.passionholder}>
                <PassionComponent
                  passion={passion}
                  updatedPassions={selectedPassion}
                  setupdatedPassions={setSelectedPassion}
                  updatedPassionsRemote={updatedPassionsRemote}
                  setUpdatedPassionsRemote={setupdatedPassionsRemote}
                  onPassionReordered={function (passionItem: any): void {
                    setPassion(passionItem)
                  }}
                  onMoreClicked={function (): void {
                    setIsiosPassionActive(true)
                  }}
                  isButtonDisabled={false}
                  onUpdatePassion={function (data: {
                    id: string
                    name: string
                  }): void {
                    handleUpdatePassion(data)
                  }}
                  onDeletePassion={function (data: {
                    id: string
                    name: string
                  }): void {
                    handleDeletePassion(data)
                  }}
                />
              </View>
            </View>

            <View style={styles.buttoncontainer}>
              <Button onPress={() => handleSumbit()} title={'Finish'} />
            </View>
          </View>
        </AuthScreen>
      )}
    </>
  )
}

export default InterestsScreen

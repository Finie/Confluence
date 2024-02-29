import { NativeStackScreenProps } from '@react-navigation/native-stack'
import LottieView from 'lottie-react-native'
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { isEmpty } from 'src/helper'
import * as Yup from 'yup'

import authRoute from 'src/api/routers/authRoute'
import FabButton from 'src/components/FabButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import MyAccordionList from 'src/components/view/customs/MyAccordionList'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { EthnicGroupItem, UserProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'EthnicityScreen'
>

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
})

const EthnicityScreen: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()
  const [ischecked, setisChecked] = useState(false)
  const [selectedIndex, setselectedIndex] = useState(3)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<EthnicGroupItem[]>([])
  const [tribe, setTribe] = useState('')
  const [isError, setIsError] = useState(false)

  const UserInfo: UserProfile = route.params.data

  const handleSumbit = () => {
    if (isEmpty(tribe)) {
      setIsError(true)
      return
    }

    setIsError(false)

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
        ethnicity: tribe,
      },
    }

    navigation.navigate('LocationTracker', { data: request })
  }

  const handleSwitch = () => setisChecked(!ischecked)

  const fetchEthnicGroups = async () => {
    setIsLoading(true)
    const response = await authRoute.getEthnicGroups()
    setIsLoading(false)

    if (response.ok) {
      if (!isEmpty(response.data.data)) {
        setData(response.data.data)
        return
      }

      return
    }

    return Alert.alert('Request failed', response.data.message)
  }

  useEffect(() => {
    fetchEthnicGroups()
  }, [])

  const handleOnTribeSelected = (tribeName: string) => {
    setIsError(false)
    setTribe(tribeName)
    console.log('==============handleOnTribeSelected======================')
    console.log(tribe)
    console.log('====================================')
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
      bottom: 10,
      right: 0,
      position: 'absolute',
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
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    cantchange: {
      fontSize: 12,
      lineHeight: 15,
    },
    accordion: { flex: 1, marginTop: 20, marginBottom: 40 },
    lottieholder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    lottie: {
      height: 60,
      width: '100%',
    },
    pleaseselect: {
      color: colors.danger,
      marginVertical: 16,
    },
  })

  return (
    <>
      <AuthScreen
        onBackPressed={function (): void {
          navigation.goBack()
        }}
        isLoading={isLoading}>
        <>
          <View style={styles.container}>
            <Text style={styles.howtwxt}>What’s your ethnic origin?</Text>

            <View style={styles.accordion}>
              {isError && (
                <Text style={styles.pleaseselect}>Please select a group</Text>
              )}
              <MyAccordionList
                data={data}
                onTribeSelection={handleOnTribeSelected}
              />
            </View>
          </View>
        </>
      </AuthScreen>
      <View style={styles.bottomcontainer}>
        <FabButton onPress={handleSumbit} />
      </View>
    </>
  )
}
export default EthnicityScreen

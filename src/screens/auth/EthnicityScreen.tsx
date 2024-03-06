/* eslint-disable import/order */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { isEmpty } from 'src/helper'
import utils from 'src/utils'

import authRoute from 'src/api/routers/authRoute'
import FabButton from 'src/components/FabButton'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import MyAccordionList from 'src/components/view/customs/MyAccordionList'
import { runAddRegistrationData } from 'src/data/redux/slice/auth'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { EthnicGroupItem } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'EthnicityScreen'
>

const EthnicityScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<EthnicGroupItem[]>([])
  const [tribe, setTribe] = useState('')
  const [isError, setIsError] = useState(false)

  const dispatch = useDispatch()

  const handleSumbit = () => {
    if (isEmpty(tribe)) {
      utils.showToastMessage('Please select a group', 'WARNING')
      setIsError(true)
      return
    }

    setIsError(false)

    dispatch(
      runAddRegistrationData({
        dataType: 'ETHNICITY',
        payload: {
          ethnicity: tribe,
        },
      }),
    )

    navigation.navigate('LocationTracker')
  }

  const fetchEthnicGroups = async () => {
    setIsLoading(true)
    const response = await authRoute.getEthnicGroups()
    setIsLoading(false)

    if (response.ok) {
      //@ts-ignore
      // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      if (response && response.data && response.data.data) {
        //@ts-ignore
        setData(response.data.data)
      }
    } else {
      utils.showToastMessage(
        `Failed: ${
          //@ts-ignore
          // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
          (response && response.data && response.data?.message) ||
          //@ts-ignore
          response.data?.details
        }`,
        'ERROR',
      )
    }
  }

  useEffect(() => {
    fetchEthnicGroups()
  }, [])

  const handleOnTribeSelected = (tribeName: string) => {
    setIsError(false)
    setTribe(tribeName)
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

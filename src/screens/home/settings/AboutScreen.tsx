/* eslint-disable semi */

/* eslint-disable import/order */
import { useIsFocused } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'

import homeRouter from 'src/api/routers/homeRouter'
import EditAboutMe from 'src/components/EditAboutMe'
import Screen from 'src/components/screen/Screen'
import Text from 'src/components/Text'
import BaseContextProvider from 'src/context/BaseContextProvider'
import { runLoginUser } from 'src/data/redux/slice/auth'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'

import SettingsParallaxScreen from './SettingsParallaxScreen'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'AboutMe'>

const AboutScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused()
  const { colors } = useThemeStyles()
  //@ts-ignore
  const [isEdit, setIsedit] = useState(true)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true)
  // @ts-ignore
  const { userData, setuserData } = React.useContext(BaseContextProvider)

  const dispatch = useDispatch()

  useEffect(() => {
    const getCurrentUser = async () => {
      setIsLoading(true)
      const response = await homeRouter.getCurrentAccounts()
      setIsLoading(false)

      if (response.ok) {
        // @ts-ignore
        const updatedData = updateBantuzUser(userData, response.data.data)

        console.log('====================================')
        console.log('updatedData: ', updatedData)
        console.log('====================================')
        dispatch(runLoginUser(updatedData))
      }
    }

    if (isFocused) {
      getCurrentUser()
    }
  }, [dispatch, isFocused, setuserData, userData])

  const styles = StyleSheet.create({
    switchcontainer: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      borderBottomColor: colors.snow,
    },
    toucha: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 8,
    },
    edit: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
      color: colors.primary,
    },
    preview: {
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '600',
    },
  })
  return (
    //@ts-ignore
    <Screen
      isheaderVisible={isHeaderVisible}
      title="About Me"
      onBackPress={() => navigation.goBack()}
      isLoading={isLoading}>
      {isHeaderVisible && (
        <View style={styles.switchcontainer}>
          <TouchableOpacity
            onPress={() => setIsedit(true)}
            style={styles.toucha}>
            <Text style={isEdit ? styles.edit : styles.preview}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setIsedit(false)}
            style={styles.toucha}>
            <Text style={!isEdit ? styles.edit : styles.preview}>Preview</Text>
          </TouchableOpacity>
        </View>
      )}
      {isEdit && (
        <EditAboutMe
          onIsloading={(isloading: boolean) => {
            setIsLoading(isloading)
          }}
          onPassionEditing={function (): void {
            setIsHeaderVisible(false)
          }}
          onEndPassionEditting={function (): void {
            setIsHeaderVisible(true)
          }}
        />
      )}

      {!isEdit && <SettingsParallaxScreen />}
    </Screen>
  )
}
export default AboutScreen

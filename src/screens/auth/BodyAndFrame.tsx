/* eslint-disable import/order */

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import DynamicallySelectedPicker from 'react-native-dynamically-selected-picker'
import { useDispatch } from 'react-redux'
import { heights } from 'src/data'
import { isEmpty } from 'src/helper'
import * as Yup from 'yup'

import ReadioChecked from 'src/assets/icons/radiochecked.svg'
import UncheckedRadio from 'src/assets/icons/radioempty.svg'
import FabButton from 'src/components/FabButton'
import AppForm from 'src/components/forms/AppForm'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import { runAddRegistrationData } from 'src/data/redux/slice/auth'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'BodyAndFrame'
>

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
})

const BodyAndFrame: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [selectedIndex, setselectedIndex] = useState(3)
  const [bodyframe, setBodyframe] = useState('SLENDER')
  const [bodyHeight, setBodyHeight] = useState('')
  const [isheightError, setIsheightError] = useState(false)

  const dispatch = useDispatch()

  const windowWidth = Dimensions.get('window').width

  const updateSelectedItem = ({ index }) => {
    setBodyHeight(heights[index].value)
    setIsheightError(false)
    setselectedIndex(index)
  }

  const handleSumbit = () => {
    if (isEmpty(bodyHeight)) {
      setIsheightError(true)
      return
    }

    setIsheightError(false)

    dispatch(
      runAddRegistrationData({
        dataType: 'MORE_DETAILS',
        payload: {
          height_frame: bodyHeight,
        },
      }),
    )

    dispatch(
      runAddRegistrationData({
        dataType: 'FRAME',
        payload: {
          frame: bodyframe,
        },
      }),
    )

    navigation.navigate('EthnicityScreen')
  }

  const handleRadioSwitch = (selection: string) => {
    setBodyframe(selection)
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    height: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 29,
      color: colors.black,
      paddingHorizontal: 30,
      marginTop: 40,
      zIndex: 10,
    },

    howtwxt: {
      fontWeight: '600',
      fontSize: 32,
      lineHeight: 39,
      color: colors.black,
      paddingHorizontal: 30,
      marginTop: 30,
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
      position: 'absolute',
      bottom: 16,
      right: 4,
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
    selector: {
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
      overflow: 'hidden',
      marginTop: -56,
    },
    frameheader: {
      fontWeight: '600',
      fontSize: 24,
      lineHeight: 29,
      color: colors.black,
      paddingHorizontal: 30,
    },
    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginBottom: 40,
      marginTop: 20,
      marginHorizontal: 20,
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
    heighterror: {
      color: colors.danger,
      marginHorizontal: 30,
      marginVertical: 16,
    },
  })
  return (
    <>
      <AuthScreen
        onBackPressed={function (): void {
          navigation.goBack()
        }}
        isLoading={false}>
        <AppForm
          initialValues={{
            email: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSumbit}>
          <View style={styles.container}>
            <Text style={styles.howtwxt}>What’s your body’s build like?</Text>

            <Text style={styles.height}>Height</Text>

            <View style={styles.selector}>
              <DynamicallySelectedPicker
                items={heights}
                onScroll={updateSelectedItem}
                height={300}
                width={windowWidth}
                fontFamily={'SourceSansPro-Regular'}
                initialSelectedIndex={9}
                fontSize={16}
                selectedItemBorderColor={colors.snow}
              />
            </View>

            <View style={{ marginTop: -40 }}>
              {isheightError && (
                <Text style={styles.heighterror}>
                  Please select yout height
                </Text>
              )}
              <Text style={styles.frameheader}>Physical frame</Text>

              <View style={styles.holder}>
                <TouchableOpacity
                  onPress={() => handleRadioSwitch('SLENDER')}
                  style={styles.gender}>
                  {bodyframe === 'SLENDER' ? (
                    <ReadioChecked />
                  ) : (
                    <UncheckedRadio />
                  )}
                  <Text style={styles.genderitem}>Slender</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRadioSwitch('AVERAGE')}
                  style={styles.gender2}>
                  {bodyframe === 'AVERAGE' ? (
                    <ReadioChecked />
                  ) : (
                    <UncheckedRadio />
                  )}

                  <Text style={styles.genderitem}>Average frame</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleRadioSwitch('HEAVY')}
                  style={styles.gender2}>
                  {bodyframe === 'HEAVY' ? (
                    <ReadioChecked />
                  ) : (
                    <UncheckedRadio />
                  )}

                  <Text style={styles.genderitem}>Heavyset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </AppForm>
      </AuthScreen>
      <View style={styles.bottomcontainer}>
        <View style={styles.fabcontainer}>
          <FabButton onPress={handleSumbit} />
        </View>
      </View>
    </>
  )
}

export default BodyAndFrame

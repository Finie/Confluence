/* eslint-disable import/order */

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
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
  'GenderScreen'
>

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label('First name'),
  lastName: Yup.string().required().label('Last name'),
})

const GenderScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [gender, setgender] = useState('Male')
  const dispatch = useDispatch()

  const handleSumbit = () => {
    dispatch(
      runAddRegistrationData({
        dataType: 'GENDER',
        payload: {
          gender: gender.toUpperCase(),
        },
      }),
    )
    navigation.navigate('BodyAndFrame')
  }

  const handleMale = () => setgender('Male')

  const handleFemale = () => setgender('Female')

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
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    holder: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderRadius: 6,
      marginVertical: 40,
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
  })
  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack()
      }}
      isLoading={false}>
      <AppForm
        initialValues={{}}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>What’s your gender?</Text>

          <View style={styles.holder}>
            <TouchableOpacity onPress={handleMale} style={styles.gender}>
              {gender === 'Male' ? <ReadioChecked /> : <UncheckedRadio />}
              <Text style={styles.genderitem}>Male</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleFemale} style={styles.gender2}>
              {gender === 'Female' ? <ReadioChecked /> : <UncheckedRadio />}

              <Text style={styles.genderitem}>Female</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <FabButton onPress={handleSumbit} />
        </View>
      </AppForm>
    </AuthScreen>
  )
}

export default GenderScreen

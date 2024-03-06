/* eslint-disable import/order */

/* eslint-disable semi */
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment, { MomentInput } from 'moment'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { getTheMinimumSelectableYear } from 'src/helper'
import utils from 'src/utils'
import * as Yup from 'yup'

import AppForm from 'src/components/forms/AppForm'
import AppFormDatePicker from 'src/components/forms/AppFormDatePicker'
import FabSubmit from 'src/components/forms/FabSubmit'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import { runAddRegistrationData } from 'src/data/redux/slice/auth'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<AuthNavigatorParamList, 'BirthDayAge'>

const validationSchema = Yup.object().shape({
  birth_date: Yup.string().label('Birthday'),
})

const BirthDayAge: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()

  const dispatch = useDispatch()

  const [selectedDate, setSelectedDate] = useState(
    `${moment(new Date(getTheMinimumSelectableYear())).format('yyyy-MM-DD')}`,
  )

  const [age, setAge] = useState(18)

  const handleSumbit = (values: { birth_date: any }) => {
    const date_of_birth = values.birth_date ? values.birth_date : selectedDate

    dispatch(
      runAddRegistrationData({
        dataType: 'DOB',
        payload: {
          birth_date: date_of_birth,
        },
      }),
    )

    if (date_of_birth) {
      return navigation.navigate('BasicDisclaimer')
    }

    utils.showToastMessage('Please select a birthdate', 'WARNING')
  }

  const handleDateSelection = React.useCallback((date: MomentInput) => {
    const end = moment(new Date())
    const start = moment(date)
    const duration = moment.duration(end.diff(start))
    const years = Math.floor(duration.asYears())

    setAge(years)

    setSelectedDate(moment(date).format('yyyy-MM-DD'))
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
      marginVertical: 30,
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
    fabcontainer: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    cantchange: {
      fontSize: 12,
      lineHeight: 15,
    },
    error: {
      color: colors.danger,
      marginVertical: 16,
    },
    age: {
      marginVertical: 30,
    },
  })
  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack()
      }}
      isLoading={false}>
      <AppForm
        initialValues={{
          birth_date: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSumbit}>
        <View style={styles.container}>
          <Text style={styles.howtwxt}>What’s your date of birth?</Text>

          <AppFormDatePicker
            name={'birth_date'}
            onDateChangeUpdate={(date: Date) => {
              handleDateSelection(date)
            }}
          />

          <View style={styles.age}>
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ flexDirection: 'row' }}>
              <Text>You are: </Text>
              <Text>{age}</Text>
            </View>
            <Text style={styles.cantchange}>This can’t be changed later.</Text>
          </View>
        </View>
        <View style={styles.bottomcontainer}>
          <View style={styles.fabcontainer}>
            <FabSubmit />
          </View>
        </View>
      </AppForm>
    </AuthScreen>
  )
}

export default BirthDayAge

import { NativeStackScreenProps } from '@react-navigation/native-stack'
import moment from 'moment'
import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { getTheMinimumSelectableYear } from 'src/helper'
import * as Yup from 'yup'

import AppForm from 'src/components/forms/AppForm'
import AppFormDatePicker from 'src/components/forms/AppFormDatePicker'
import FabSubmit from 'src/components/forms/FabSubmit'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'
import { UserProfile } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<AuthNavigatorParamList, 'BirthDayAge'>

const validationSchema = Yup.object().shape({
  birth_date: Yup.string().label('Birthday'),
})

const BirthDayAge: React.FC<ScreenProps> = ({ navigation, route }) => {
  const { colors } = useThemeStyles()

  const [ischecked, setisChecked] = useState(false)

  const [selectedDate, setSelectedDate] = useState(
    `${moment(getTheMinimumSelectableYear()).format('yyyy-MM-DD')}`,
  )

  const [age, setAge] = useState(18)

  const [errorMessage, setErrorMessage] = useState('You are too young')

  const [isError, setIsError] = useState(false)

  const { data } = route.params

  const UserInfo: UserProfile = data

  const handleSumbit = (values: { birth_date: any }) => {
    if (values) {
      const request = {
        first_name: UserInfo.first_name,
        email: UserInfo.email,
        last_name: UserInfo.last_name,
        password: UserInfo.password,
        middle_name: UserInfo.middle_name,
        phone: UserInfo.phone,
        username: UserInfo.username,
        profile: {
          birth_date: values.birth_date,
        },
      }

      navigation.navigate('BasicDisclaimer', { data: request })
    }

    console.log('================handleSumbit====================')
    console.log(values)
    console.log('====================================')
  }

  const handleDateSelection = React.useCallback((date: MomentInput) => {
    const end = moment(new Date())
    const start = moment(date)
    const duration = moment.duration(end.diff(start))
    const years = Math.floor(duration.asYears())

    setAge(years)

    if (years < 18) {
      if (years < 0) {
        setAge(0)
        setErrorMessage('Invalid age')
      }
      setIsError(true)
      setErrorMessage('You are too young')
      return
    }

    setIsError(false)
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

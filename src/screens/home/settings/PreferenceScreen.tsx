import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useContext, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Next from 'src/assets/icons/keyboardarrowright.svg'
import Screen from 'src/components/screen/Screen'
import SwitchSelection from 'src/components/SwitchSelection'
import Text from 'src/components/Text'
import BaseContextProvider from 'src/context/BaseContextProvider'
import EncryptionStore from 'src/data/EncryptionStore'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'Preference'>

const PreferenceScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { isInKilometers, setIsInKilometers, userData } =
    useContext(BaseContextProvider)

  const [one, setOne] = useState<boolean>(false)
  const [two, setTwo] = useState<boolean>(false)
  const [three, setThree] = useState<boolean>(false)
  const [four, setFour] = useState<boolean>(false)
  const [five, setFive] = useState<boolean>(false)
  const [six, setSix] = useState<boolean>(false)

  const toggleSwitch = (index: number) => {
    switch (index) {
      case 0:
        setOne(!one)
        break
      case 1:
        setTwo(!two)
        break
      case 2:
        setThree(!three)
        break
      case 3:
        setFour(!four)
        break
      case 4:
        setFive(!five)
        break
      default:
        setSix(!six)
        break
    }
  }

  const toggleSwitchKilometers = () => {
    EncryptionStore.storePreferedDistanceUnit(!isInKilometers)
    setIsInKilometers(!isInKilometers)
  }

  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.snow,
    },
    iconcontainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.accent,
      padding: 20,
      margin: 10,
      borderRadius: 10,
    },
    centertext: {
      flex: 1,
      marginHorizontal: 16,
    },
    sometextcolor: {
      color: colors.black,
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 14,
    },
    upgrade: {
      color: colors.secondary,
      fontWeight: '600',
      fontSize: 12,
      lineHeight: 14,
    },

    switchesview: {
      backgroundColor: colors.white,
      padding: 16,
      margin: 15,
      borderRadius: 10,
    },

    valuetop: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
    },

    value: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
    },

    valuebottom: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    valuesignly: {
      borderWidth: 1,
      padding: 6,
      borderColor: colors.snow,
      borderRadius: 10,
    },
    swicthbetween: {
      fontSize: 12,
      marginVertical: 10,
    },
    units: {
      color: colors.black,
    },
    switchesviewlast: {
      backgroundColor: colors.white,
      padding: 16,
      margin: 15,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 70,
    },
    sentensetext: {
      fontSize: 12,
      lineHeight: 14,
    },
    blockcontact: {
      fontSize: 16,
      lineHeight: 19,
      color: colors.black,
      marginBottom: 6,
    },
  })
  return (
    <Screen
      isheaderVisible
      onBackPress={() => navigation.goBack()}
      title={'Preferences'}>
      <View style={styles.container}>
        {/* <TouchableOpacity
          onPress={() => {
            // navigation.navigate('pricestack')
          }}
          style={styles.iconcontainer}>
          <View>
            <Dolla />
          </View>
          <View style={styles.centertext}>
            <Text style={styles.sometextcolor}>
              Some options are available with a premium subscription.
            </Text>
          </View>

          <View>
            <Text style={styles.upgrade}>Upgrade →</Text>
          </View>
        </TouchableOpacity> */}

        <View style={styles.switchesview}>
          <View style={styles.valuetop}>
            <SwitchSelection
              isEnabled={one}
              toggleSwitch={() => toggleSwitch(0)}
              title={'Show your last name on your public profile'}
              isMonyrequired={false}
            />
          </View>
          {/* {userData.is_premium && (
            <View style={styles.value}>
              <SwitchSelection
                isEnabled={two}
                toggleSwitch={() => toggleSwitch(1)}
                title={'Hide your last seen on your chats'}
                isMonyrequired
              />
            </View>
          )} */}
          {/* {userData.is_premium && (
            <View style={styles.valuebottom}>
              <SwitchSelection
                isEnabled={three}
                toggleSwitch={() => toggleSwitch(2)}
                title={'Hide read receipts on your chats'}
                isMonyrequired
              />
            </View>
          )} */}
        </View>

        <View style={styles.switchesview}>
          <View>
            <Text style={styles.units}>Units</Text>
            <Text style={styles.swicthbetween}>
              Switch between the imperial and metric measurement system
            </Text>
          </View>
          <View style={styles.valuesignly}>
            <SwitchSelection
              isEnabled={isInKilometers}
              toggleSwitch={toggleSwitchKilometers}
              title={'Use kilometres instead of miles'}
              isMonyrequired={false}
            />
          </View>
        </View>

        <View style={styles.switchesview}>
          <View>
            <Text style={styles.units}>Notifications</Text>
            <Text style={styles.swicthbetween}>
              We’ll send you important alerts about your account’s security, and
              new updates you can look forward to.
            </Text>
          </View>

          {/* <View style={styles.valuetop}>
            <SwitchSelection
              isEnabled={four}
              toggleSwitch={() => toggleSwitch(3)}
              title={'Email notifications'}
              isMonyrequired={false}
            />
          </View> */}

          <View style={styles.value}>
            <SwitchSelection
              isEnabled={five}
              toggleSwitch={() => toggleSwitch(4)}
              title={'Push notifications'}
              isMonyrequired={false}
            />
          </View>
          {/* <View style={styles.valuebottom}>
            <SwitchSelection
              isEnabled={six}
              toggleSwitch={() => toggleSwitch(5)}
              isMonyrequired={false}
              title={'Insider news to Team Bantu Singles'}
            />
          </View> */}
        </View>

        <TouchableOpacity
          style={styles.switchesviewlast}
          onPress={() => {
            navigation.navigate('BlockedContacts')
          }}>
          <View>
            <Text style={styles.blockcontact}>Blocked contacts</Text>
            <Text style={styles.sentensetext}>
              Select people fron your contact list you don’t want to see or be
              seen by on Bantuz Singles.
            </Text>
          </View>
          <View>
            <Next />
          </View>
        </TouchableOpacity>
      </View>
    </Screen>
  )
}

export default PreferenceScreen

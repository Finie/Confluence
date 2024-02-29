import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, StyleSheet, View } from 'react-native'
import RangeSlider from 'rn-range-slider'

import authRoute from 'src/api/routers/authRoute'
import homeRouter from 'src/api/routers/homeRouter'
import BirthDayCake from 'src/assets/icons/birthdaycake.svg'
import BirthDayCakeInactive from 'src/assets/icons/cakeinactive.svg'
import InactiveNote from 'src/assets/icons/inactivenote.svg'
import MapInactive from 'src/assets/icons/mapinactive.svg'
import Musicnote from 'src/assets/icons/musicnote.svg'
import PaintInactivr from 'src/assets/icons/paininactive.svg'
import Foodiconprimaty from 'src/assets/icons/paintprimary.svg'
import Button from 'src/components/Button'
import FloatingLabelInput from 'src/components/FloatingLabelInput'
import PassionItem from 'src/components/PassionItem'
import Screen from 'src/components/screen/Screen'
import Label from 'src/components/Slider/Label'
import Notch from 'src/components/Slider/Notch'
import Rail from 'src/components/Slider/Rail'
import RailSelected from 'src/components/Slider/RailSelected'
import Thumb from 'src/components/Slider/Thumb'
import Text from 'src/components/Text'
import useLocation from 'src/hooks/useLocation'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { BantuProfile, Location, SearchGlag } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<MainStackParamList, 'ExploreFilter'>
const ExploreFilter: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(100)
  const [minDistane, setminDistane] = useState(0)
  const [maxDistance, setMaxDistance] = useState(900)
  const [passion, setPassion] = useState([] as any)
  const [otherPassion, setOtherPassion] = useState([] as any)
  const [selectedpassions, setSelectedpassions] = useState([] as any)
  const [selectedOtherPassion, setSelectedOtherPassion] = useState([] as any)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUserName, setSelectedUserName] = useState<string>('')
  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderLabel = useCallback((value: any) => <Label text={value} />, [])
  const renderNotch = useCallback(() => <Notch />, [])
  const [isPassionLoading, setIsPassionLoading] = useState(false)
  const location: Location | null | undefined = useLocation()

  const handleValueChange = useCallback((low, high) => {
    setLow(low)
    setHigh(high)
  }, [])
  const distanceValueChange = useCallback((low, high) => {
    setminDistane(low)
    setMaxDistance(high)
  }, [])
  useEffect(() => {
    getPassions()
    getOtherPassions()
  }, [])
  const getPassions = async () => {
    setIsPassionLoading(true)
    const response = await authRoute.fetchPassions()
    if (response.ok) {
      setPassion(response.data.data)
      return
    }
  }
  const getOtherPassions = async () => {
    setIsPassionLoading(true)
    const response = await authRoute.fetchOtherPersions()
    if (response.ok) {
      setOtherPassion(response.data.data)
      return
    }
  }
  const fetchSearchInfo = async () => {
    const request: SearchGlag = {
      age_from: low,
      age_to: high,
      distance_from: '',
      distance_to: '',
      others: selectedOtherPassion,
      passions: selectedpassions,
      page: 1,
      page_size: 50,
      longitude: location?.longitude || 0,
      latitude: location?.latitude || 0,
      username: selectedUserName,
      educations: [0],
    }
    setIsLoading(true)
    const response = await homeRouter.searchForUsersByFlags(request)
    setIsLoading(false)

    if (response.ok) {
      if (response.data.page_details.total_page > 0) {
        return navigation.navigate('ExploreResult', {
          isSearch: true,
          name: 'search',
          result: response.data.data as BantuProfile[],
        })
      }
      return Alert.alert(
        'Request Successful',
        `${response.data.page_details.total_page} users found`,
      )
    }

    return Alert.alert(
      'Request failed',
      response.data?.message || response.data.toString(),
    )
  }
  const styles = StyleSheet.create({
    floatinputcontainer: {
      marginHorizontal: 30,
    },
    root: {
      alignItems: 'stretch',
      padding: 12,
      flex: 1,
      backgroundColor: '#555',
    },
    slider: {},
    button: {},
    header: {
      alignItems: 'center',
      backgroundColor: 'black',
      padding: 12,
    },
    horizontalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    text: {
      color: 'white',
      fontSize: 20,
    },
    valueText: {
      width: 50,
      color: 'white',
      fontSize: 20,
    },
    age: {
      color: colors.primary,
      fontSize: 14,
      lineHeight: 17.01,
      fontWeight: '600',
    },
    ageContainer: {
      marginHorizontal: 30,
      marginVertical: 20,
    },
    between: {
      marginVertical: 20,
      fontSize: 14,
      lineHeight: 17.01,
      fontWeight: '400',
    },
    agetext: {
      fontSize: 16,
      lineHeight: 20,
      fontWeight: '600',
      color: colors.black,
    },
    passionholder: {
      marginHorizontal: 30,
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
    buttons: {
      marginTop: 60,
      marginHorizontal: 30,
      marginBottom: 200,
    },
  })
  return (
    <Screen
      title="Search"
      isheaderVisible
      onBackPress={() => navigation.goBack()}
      isLoading={isLoading}>
      <View style={styles.floatinputcontainer}>
        <FloatingLabelInput
          placeholder="Search (optional)"
          onChangeText={text => setSelectedUserName(text)}
          onBlur={() => console.log()}
        />
      </View>
      <View style={styles.ageContainer}>
        <Text style={styles.agetext}>Age</Text>
        <Text style={styles.between}>
          Between <Text style={styles.age}>{low}</Text> and{' '}
          <Text style={styles.age}>{high}</Text> years
        </Text>
        <RangeSlider
          style={styles.slider}
          min={18}
          max={50}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        />
      </View>
      <View style={styles.ageContainer}>
        <Text style={styles.agetext}>Distance</Text>
        <Text style={styles.between}>
          Between <Text style={styles.age}>{minDistane}</Text> and{' '}
          <Text style={styles.age}>{maxDistance}</Text> kilometres away
        </Text>
        <RangeSlider
          style={styles.slider}
          min={0}
          max={900}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={distanceValueChange}
        />
      </View>
      <View style={styles.passionholder}>
        <Text style={styles.passionname}>Passions</Text>
        <View style={styles.passioniteholder}>
          <FlatList
            data={passion}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => (
              <PassionItem
                // Icon={<Musicnote />}
                label={item.name}
                Inactive={<InactiveNote />}
                onItemAdded={function (): void {
                  selectedpassions.push(item.id)
                }}
                onItemRemoved={function (): void {
                  setSelectedpassions(
                    selectedpassions.filter((element: { id: any }) => {
                      return element.id !== item.id
                    }),
                  )
                }}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.passionholder}>
        <Text style={styles.passionname}>More</Text>
        <View style={styles.passioniteholder}>
          <FlatList
            data={otherPassion}
            numColumns={2}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item, index }) => (
              <PassionItem
                // Icon={<Musicnote />}
                label={item.name}
                Inactive={<InactiveNote />}
                onItemAdded={function (): void {
                  selectedOtherPassion.push(item.id)
                }}
                onItemRemoved={function (): void {
                  setSelectedOtherPassion(
                    selectedOtherPassion.filter((element: { id: any }) => {
                      return element.id !== item.id
                    }),
                  )
                }}
              />
            )}
          />
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          onPress={() => {
            fetchSearchInfo()
          }}
          title={'Search'}
        />
      </View>
    </Screen>
  )
}
export default ExploreFilter

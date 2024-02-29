import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import {
  Alert,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native'
import { isEmpty } from 'src/helper'

import authRoute from 'src/api/routers/authRoute'
import Checked from 'src/assets/icons/checkboxcheck.svg'
import Unchecked from 'src/assets/icons/checkboxunchek.svg'
import FloatingLabelInput from 'src/components/FloatingLabelInput'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { EthnicGroupItem } from 'src/utils/shared-type'

type Props = {
  data: EthnicGroupItem[]
  onTribeSelection: (name: string) => void
}

const MyAccordionList: React.FC<Props> = ({ data, onTribeSelection }) => {
  const { colors } = useThemeStyles()
  const [selectedId, setselectedId] = useState<number>()
  const [selectedCountry, setSelectedCountry] = useState<number>()
  const [selectedCountryId, setSelectedCountryId] = useState<number>()

  const handleSelectedTribe = (item: EthnicGroupItem) => {
    if (!isEmpty(item)) {
      setselectedId(+item.id)
      setSelectedCountryId(selectedCountry)
      onTribeSelection(item.name)
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#f5f5f5',
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 4,
      marginBottom: 8,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.silver,
      marginStart: 8,
    },
    content: {
      backgroundColor: '#fafafa',
      padding: 8,
      borderRadius: 4,
      marginTop: -16,
      marginBottom: 16,
    },
    item: {
      fontSize: 14,
      marginBottom: 4,
      marginStart: 6,
    },
    bodycontainerinput: {
      marginBottom: 30,
    },
    bodycontainer: {
      padding: 8,
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.snow,
    },
    headercontainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    region_text: {
      fontSize: 16,
      color: colors.silver,
    },
    region_container: {
      justifyContent: 'center',
      padding: 8,
      alignItems: 'center',
    },
  })
  const Accordion = (datum: { data: EthnicGroupItem }) => {
    const data = datum.data
    const [expanded, setExpanded] = useState<Boolean>(false)
    const [tribeData, setTribeData] = useState<EthnicGroupItem[]>([])
    const [isLoading, setIsloading] = useState<Boolean>(false)

    const toggleAccordion = () => {
      if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental &&
          UIManager.setLayoutAnimationEnabledExperimental(true)
      }
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
      setExpanded(!expanded)
    }

    const fetchEthnicGroups = async (id: number) => {
      setTribeData([])
      setIsloading(true)
      const response = await authRoute.getListOfethnicGroups(id)
      setIsloading(false)

      if (response.ok) {
        setTribeData(response.data.data)
        return
      }

      return Alert.alert('Request Failed', response.data.message)
    }

    const handleItemSelection = () => {
      if (!isEmpty(data)) {
        toggleAccordion()
        setSelectedCountry(data.id)
        fetchEthnicGroups(data.id)
      }
    }

    return (
      <TouchableOpacity onPress={handleItemSelection} style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headercontainer}>
            {!expanded && selectedCountryId === +data.id ? (
              <Checked />
            ) : (
              <Unchecked />
            )}
            <Text style={styles.title}>{data.name}</Text>
          </View>
        </View>
        {expanded && (
          <View style={styles.content}>
            {isEmpty(tribeData) ? (
              isLoading ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LottieView
                    autoPlay={true}
                    loop={true}
                    source={require('src/assets/animations/ethnicityload.json')}
                    style={{ height: 10 }}
                  />
                  <Text style={{ marginTop: 16, color: colors.silver }}>
                    Loading groups ...
                  </Text>
                </View>
              ) : data.name.toLowerCase() === 'other' ? (
                <View style={styles.bodycontainerinput}>
                  <FloatingLabelInput
                    onBlur={() => console.log()}
                    placeholder="Country"
                    onChangeText={function (text: string): void {}}
                  />
                  <FloatingLabelInput
                    placeholder="City / Town"
                    onBlur={() => console.log()}
                    onChangeText={function (text: string): void {}}
                  />
                </View>
              ) : (
                <View style={styles.region_container}>
                  <Text style={styles.region_text} type={'caption'}>
                    Ethnic group not available
                  </Text>
                </View>
              )
            ) : (
              <>
                {tribeData.map((item: EthnicGroupItem, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => handleSelectedTribe(item)}
                      style={styles.bodycontainer}>
                      {+item.id === selectedId ? <Checked /> : <Unchecked />}
                      <Text key={index} style={styles.item}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      {data.map((accordion, index) => {
        return <Accordion key={index} data={accordion} />
      })}
    </View>
  )
}

export default MyAccordionList

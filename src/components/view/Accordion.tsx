import Collapse from 'accordion-collapse-react-native'
import CollapseBody from 'accordion-collapse-react-native'
import CollapseHeader from 'accordion-collapse-react-native'
import LottieView from 'lottie-react-native'
import React, { useState } from 'react'
import {
  Alert,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import authRoute from 'src/api/routers/authRoute'
import Checked from 'src/assets/icons/checkboxcheck.svg'
import Unchecked from 'src/assets/icons/checkboxunchek.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { EthnicGroupItem } from 'src/utils/shared-type'

import FloatingLabelInput from '../FloatingLabelInput'
import Text from '../Text'

type Props = {
  data: EthnicGroupItem[]
  onTribeSelection: (name: string) => void
}

type AccordionsProps = {
  header: string
  onPress: () => void
  isExpanded: boolean
}

const Accordion: React.FC<Props> = ({ data, onTribeSelection }) => {
  const { colors } = useThemeStyles()
  const [isExpanded, setisExpanded] = useState(false)
  const [ismiddleExpanded, setismiddleExpanded] = useState(false)
  const [isOthersExpanded, setisOthersExpanded] = useState(false)
  const [selectedId, setselectedId] = useState(100)
  const [isLoading, setIsloading] = useState(false)
  const [tribeData, setTribeData] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const choosePosition = (clicked: EthnicGroupItem) => {
    if (+clicked.id === selectedIndex) {
      setSelectedIndex(-1)
      return
    }

    setSelectedIndex(+clicked.id)
    fetchEthnicGroups(+clicked.id)
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

  const handleSelectedTribe = (item: { id: number; name: string }) => {
    setselectedId(item.id)
    onTribeSelection(item.name)
  }

  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: colors.snow,
    },
    kencontainer: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderTopRightRadius: 6,
      borderTopLeftRadius: 6,
    },
    otncontainer: {
      borderWidth: 1,
      borderColor: colors.snow,
      borderBottomRightRadius: 6,
      borderBottomLeftRadius: 6,
    },
    headercontainer: {
      padding: 8,
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
    },
    headertext: {
      marginLeft: 16,
      fontSize: 14,
      lineHeight: 17,
      color: colors.black,
    },
    bodycontainer: {
      padding: 8,
      flexDirection: 'row',
      height: 56,
      alignItems: 'center',
      marginLeft: 30,
      borderWidth: 1,
      borderColor: colors.snow,
    },
    bodycontainerinput: {
      padding: 8,
      marginLeft: 30,
      borderWidth: 1,
      borderColor: colors.snow,
    },
  })
  const Accordions: React.FC<AccordionsProps> = ({
    header,
    onPress,
    isExpanded,
  }) => {
    return (
      <Collapse isExpanded={isExpanded}>
        <CollapseHeader>
          <TouchableOpacity
            onPress={onPress}
            style={
              header === 'Kenya'
                ? styles.kencontainer
                : header === 'Other'
                ? styles.otncontainer
                : styles.container
            }>
            <View style={styles.headercontainer}>
              {!isExpanded ? <Unchecked /> : <Checked />}
              <Text style={styles.headertext}>{header}</Text>
            </View>
          </TouchableOpacity>
        </CollapseHeader>

        <CollapseBody>
          {header === 'Other' ? (
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
            <>
              {isLoading && (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 16,
                  }}>
                  <LottieView
                    autoPlay={true}
                    loop={true}
                    source={require('src/assets/animations/ethnicityload.json')}
                    style={{ height: 10 }}
                  />
                  <Text style={{ marginTop: 16 }}>fetching groups ...</Text>
                </View>
              )}
              {tribeData.map(
                (item: { id: number; name: string }, index: number) => {
                  return (
                    <View key={index}>
                      {item.name !== 'Other' ? (
                        <TouchableOpacity
                          onPress={() => {
                            handleSelectedTribe(item)
                          }}
                          style={styles.bodycontainer}>
                          {item.id === selectedId ? <Checked /> : <Unchecked />}
                          <Text style={styles.headertext}>{item.name}</Text>
                        </TouchableOpacity>
                      ) : (
                        <Collapse>
                          <CollapseHeader>
                            <TouchableOpacity
                              onPress={() => {
                                handleSelectedTribe(item)
                              }}
                              style={styles.bodycontainer}>
                              {item.id === selectedId ? (
                                <Checked />
                              ) : (
                                <Unchecked />
                              )}
                              <Text style={styles.headertext}>{item.name}</Text>
                            </TouchableOpacity>
                          </CollapseHeader>
                          <CollapseBody>
                            <Text>{''}</Text>
                          </CollapseBody>
                        </Collapse>
                      )}
                    </View>
                  )
                },
              )}
            </>
          )}
        </CollapseBody>
      </Collapse>
    )
  }

  return (
    <>
      {data.map((item: EthnicGroupItem, index: number) => {
        return (
          <Accordions
            key={index}
            onPress={() => {
              choosePosition(item)
            }}
            isExpanded={+item.id === selectedIndex}
            header={item.name}
          />
        )
      })}
    </>
  )
}

export default Accordion

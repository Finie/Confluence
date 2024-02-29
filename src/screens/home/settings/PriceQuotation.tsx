import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { StripeProvider, useStripe } from '@stripe/stripe-react-native'
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import stripePayment from 'src/api/routers/stripePayment'
import bantusinlesIcon from 'src/assets/icons/batuz_singles_logo.png'
import Inclusive from 'src/assets/icons/inclusive.svg'
import Rewind from 'src/assets/icons/modalrewind.svg'
import Schedule from 'src/assets/icons/schedule.svg'
import background from 'src/assets/images/moneyheader.png'
import BackButton from 'src/assets/images/whiteback.svg'
import Button from 'src/components/Button'
import CancelingItem from 'src/components/CancelingItem'
import PlanItem from 'src/components/PlanItem'
import Text from 'src/components/Text'
import OverLayLoader from 'src/components/view/OverLayLoader'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'
import { PriceItem } from 'src/utils/shared-type'

type ScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'PaymentSelectionMode'
>

const PriceQuotation: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [active, setActive] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentPlan, setPaymentPlan] = useState([])
  const [priceList, setPriceList] = useState([])
  const [selectedProduct, setselectedProduct] = useState('')

  useEffect(() => {
    const getProductList = async () => {
      setIsLoading(true)
      const response = await stripePayment.getProductList()
      const priceResponse = await stripePayment.getPriceList()
      setIsLoading(false)

      if (response.ok) {
        setPaymentPlan(response.data.data)

        if (priceResponse.ok) {
          setPriceList(priceResponse.data.data)
        }
        return
      }

      return Alert.alert(
        response.problem,
        'Error: ' + response.data.message || response.data.msg,
      )
    }

    getProductList()
  }, [])

  const getPriceinfo = (id: String) => {
    var price = `USD 0`

    priceList.map((item: PriceItem) => {
      if (item.product === id) {
        const amount = +item.unit_amount_decimal / 100
        price = `${item.currency.toUpperCase()} ${amount}`
      }
    })

    return price
  }

  useEffect(() => {}, [])

  const handleCreatePaymentRequest = () => {
    if (selectedProduct !== null) {
      //   navigation.navigate('paymentSelectionMode', {
      //     data: selectedProduct,
      //   })
    }
  }

  const styles = StyleSheet.create({
    imagebackground: {
      height: 270,
    },
    scroll: {
      flexGrow: 1,
      backgroundColor: colors.snow,
    },

    topview: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },

    fireblazeContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 190,
      marginHorizontal: 30,
    },
    textStyle: {
      color: colors.white,
      fontSize: 32,
      lineHeight: 38.88,
      fontWeight: '700',
      textAlign: 'center',
      marginVertical: 30,
    },
    afterbimage: {
      backgroundColor: colors.white,
    },

    meetingtext: {
      fontSize: 20,
      lineHeight: 24,
      color: colors.black,
      fontWeight: '400',
      textAlign: 'center',
      marginHorizontal: 30,
      marginVertical: 40,
    },
    listitems: {
      marginBottom: 40,
    },
    contents: {
      height: 40,
      flexDirection: 'row',
      paddingTop: StatusBar.currentHeight,
    },
    buttonback: {
      padding: 8,
      justifyContent: 'center',
      marginLeft: 15,
    },
    pickplsntext: {
      justifyContent: 'center',
      alignItems: 'center',
      fontWeight: '600',
      fontSize: 20,
      lineHeight: 24,
      marginVertical: 30,
    },
    plaintext: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    palinitem: {
      flex: 1,
      padding: 16,
    },
    pickcontainer: { justifyContent: 'center', alignItems: 'center' },
    plaintextlast: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 6,
    },
    bottombutton: {
      marginHorizontal: 30,
    },
    bottomButton: {},
  })

  return (
    <StripeProvider
      publishableKey={''} //stripe api key
      merchantIdentifier="merchant.com.{{gikuyusingles}}" // required for Apple Pay
    >
      <View style={styles.scroll}>
        <OverLayLoader isLoading={isLoading} />

        <FlatList
          data={paymentPlan}
          showsVerticalScrollIndicator={false}
          horizontal={false}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={
            <View>
              <ImageBackground
                style={styles.imagebackground}
                source={background}>
                <StatusBar
                  translucent={true}
                  backgroundColor={'transparent'}
                  barStyle="light-content"
                />
                <SafeAreaView>
                  <View style={styles.contents}>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={styles.buttonback}>
                      <BackButton />
                    </TouchableOpacity>
                    <View style={styles.contents} />
                  </View>
                  <View style={styles.fireblazeContainer}>
                    <Image
                      source={bantusinlesIcon}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                    />

                    <Text style={styles.textStyle}>
                      Upgrade to Bantuz Singles Plans
                    </Text>
                  </View>
                </SafeAreaView>
              </ImageBackground>

              <View style={styles.pickcontainer}>
                <Text style={styles.pickplsntext}>Pick a Plan</Text>
              </View>
            </View>
          }
          renderItem={({ item, index }) => {
            return (
              <Collapse key={index} isExpanded={active === index}>
                <CollapseHeader>
                  <View style={styles.plaintext} key={index}>
                    <View style={styles.palinitem}>
                      <PlanItem
                        index={index}
                        active={active}
                        priceperMonth={item.name}
                        total={getPriceinfo(item.id)}
                        months={'item.name'}
                        onPress={() => {
                          setActive(index)
                          if (getPriceinfo(item.id) !== 'USD 0') {
                            setselectedProduct(item.id)
                          } else {
                            setselectedProduct('')
                          }
                        }}
                      />
                    </View>
                  </View>
                </CollapseHeader>
                <CollapseBody>
                  <View>
                    <View style={styles.afterbimage}>
                      <Text style={styles.meetingtext}>
                        What you get on{' '}
                        {`${
                          active === 0
                            ? 'free'
                            : active === 1
                            ? 'basic'
                            : 'Premium'
                        }`}
                      </Text>

                      <View style={styles.listitems}>
                        <CancelingItem
                          title={`${
                            active === 0
                              ? '10 swipes a day'
                              : active === 1
                              ? '50 swipes a day'
                              : 'Unlimited swipes'
                          }`}
                          icon={<Rewind />}
                        />
                        <CancelingItem
                          title={`${
                            active === 0
                              ? 'Chat after you match with each other'
                              : active === 2
                              ? 'Chat after you match with each other'
                              : 'Chat before & after you match with each other'
                          }`}
                          icon={<Inclusive />}
                        />
                        <CancelingItem
                          title={`${
                            active === 1
                              ? '3 photos on your profile'
                              : active === 1
                              ? '4 photos & 1 video on your profile'
                              : '4 photos & 2 videos on your profile'
                          }`}
                          icon={<Schedule />}
                        />
                        <CancelingItem
                          title={`${
                            active === 0
                              ? 'See who likes you only after you match'
                              : active === 1
                              ? 'See who likes you only after you match'
                              : 'See who likes you before you match'
                          }`}
                          icon={<Inclusive />}
                        />
                      </View>

                      <View style={styles.bottombutton}>
                        {active !== 0 && (
                          <Button
                            title="Confirm Subscription"
                            onPress={handleCreatePaymentRequest}
                            style={styles.bottomButton}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </CollapseBody>
              </Collapse>
            )
          }}
        />
      </View>
    </StripeProvider>
  )
}

export default PriceQuotation

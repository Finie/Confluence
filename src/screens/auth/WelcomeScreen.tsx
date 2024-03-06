import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useRef, useState } from 'react'
import {
  Dimensions,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import Carousel from 'react-native-anchor-carousel'
import Image from 'react-native-fast-image'
import utils from 'src/utils'

import Logo from 'src/assets/icons/batuz_singles_logo.png'
import ImageWhite from 'src/assets/images/images.jpg'
import SliderFour from 'src/assets/images/slidefour.jpg'
import SliderFive from 'src/assets/images/sliderfive.jpg'
import Slider3 from 'src/assets/images/slidethree.png'
import Slider2 from 'src/assets/images/slidetwo.png'
import Button from 'src/components/Button'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<AuthNavigatorParamList, 'Welcome'>

const WelcomeScreen: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const [renderNext, setrenderNext] = useState(1)
  const [header, setHeader] = useState('Find your one person, your')
  const [description, setdescription] = useState(' perfect match')

  const { width: windowWidth } = Dimensions.get('window')
  const carousel = useRef(null)

  const data = [
    {
      id: 0,
      image: ImageWhite,
    },
    {
      id: 1,
      image: SliderFive,
    },
    {
      id: 2,
      image: SliderFour,
    },
    {
      id: 3,
      image: Slider2,
    },
    {
      id: 4,
      image: SliderFive,
    },
    {
      id: 5,
      image: ImageWhite,
    },
  ]

  const onScrollEvent = (value: number) => {
    switch (value) {
      case 1:
        setHeader('Find your one person, your')
        setdescription(' perfect match')
        setrenderNext(1)
        break
      case 3:
        setHeader('Get chatting about things')
        setdescription('you both love')
        setrenderNext(4)

        break

      case 1:
        setHeader('Find your one person, your')
        setdescription(' perfect match')
        setrenderNext(1)
        break

      case 2:
        setHeader('Don’t wait. Find your')
        setdescription(' soulmate now')
        setrenderNext(2)
        break

      default:
        navigation.navigate('FacebookLogin')
        break
    }
  }

  const onNextClick = () => {
    if (renderNext === 5) {
      setrenderNext(1)
      onScrollEvent(1)
      return
    }
    onScrollEvent(renderNext + 1)
    carousel.current.scrollToIndex(renderNext + 1)
  }

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.white,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    styles_container_content_style: {
      flexGrow: 1,
    },
    scrollView: { flexGrow: 1, flexDirection: 'column' },
    logo: {
      width: 56,
      height: 56,
    },
    logoContainder: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      fontWeight: '600',
      textAlign: 'center',
    },
    headerPrimary: {
      color: colors.primary,
    },
    headercontainer: {
      marginHorizontal: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    lowerdisign: {
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 30,
    },
    skipcont: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    nextContainer: {
      marginHorizontal: 64,
      marginBottom: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      width: 180,
    },

    carousel: {
      flexGrow: 0,
      height: 350,
      paddingVertical: 16,
    },
    item: { borderRadius: 32, overflow: 'hidden' },
    itemContainerStyle: {
      borderRadius: 30,
      overflow: 'hidden',
    },
    imageRender: {
      width: '100%',
      height: 350,
    },
    skip: {
      fontSize: 14,
      fontWeight: '700',
      color: colors.primary,
    },
    bottom: { flex: 1, justifyContent: 'flex-end' },
  })

  const renderItem = ({ item, index }) => {
    return (
      <View
        style={styles.item}
        onPress={() => {
          carousel.current.scrollToIndex(index)
        }}>
        <Image style={styles.imageRender} source={item.image} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.styles_container_content_style}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        <View style={styles.logoContainder}>
          <Image style={styles.logo} source={Logo} />
        </View>

        <View
          style={{
            backgroundColor: colors.white,
          }}>
          <View>
            <Carousel
              ref={carousel}
              initialIndex={1}
              data={data}
              renderItem={renderItem}
              style={styles.carousel}
              itemWidth={windowWidth * 0.6}
              containerWidth={windowWidth}
              separatorWidth={24}
              finCurrentIndex={onScrollEvent}
              inActiveScale={0.8}
              itemContainerStyle={styles.itemContainerStyle}
            />
          </View>
        </View>

        <View style={styles.headercontainer}>
          <Text type={'heading'} style={[styles.header]}>
            {`${header}`}
            <Text
              type={'heading'}
              style={[styles.headerPrimary]}>{` ${description}`}</Text>
          </Text>
        </View>

        <View style={styles.bottom}>
          <View style={styles.lowerdisign}>
            <TouchableOpacity
              onPress={() => navigation.navigate('FacebookLogin')}
              style={styles.skipcont}>
              <Text style={styles.skip}>Skip →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nextContainer}>
            <Button title="Next" onPress={onNextClick} style={styles.button} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
export default WelcomeScreen

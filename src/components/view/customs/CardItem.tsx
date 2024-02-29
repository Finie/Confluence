import React, { useContext } from 'react'
import {
  Animated,
  Image,
  ImageBackground,
  PanResponder,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { convertDistance, isEmpty } from 'src/helper'

import Direction from 'src/assets/icons/direction.svg'
import Dots from 'src/assets/icons/dotsmenu.svg'
import FinalCard from 'src/assets/images/finalcard.png'
import Text from 'src/components/Text'
import BaseContextProvider from 'src/context/BaseContextProvider'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { CardProps, ConversionType } from 'src/utils/shared-type'

const CardItem: React.FC<CardProps> = ({ user, onMoreClicked }) => {
  const { colors } = useThemeStyles()

  const RenderNoMoreCards = () => (
    <View
      style={{ height: 380, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={FinalCard} style={styles.lastcontainer} />
    </View>
  )

  const { isInKilometers } = useContext(BaseContextProvider)

  const styles = StyleSheet.create({
    container: {
      borderRadius: 30,
      overflow: 'hidden',
      elevation: 2,
      backgroundColor: colors.white,
      zIndex: 5,
    },
    image: {
      height: 380,
      width: 300,
      borderRadius: 30,
      overflow: 'hidden',
      elevation: 2,
      backgroundColor: colors.white,
      zIndex: 5,
    },
    card: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 5,
      backgroundColor: 'white',
      height: 300,
      width: '90%',
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    direction_container: {
      paddingVertical: 30,
      paddingHorizontal: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    distance: {
      fontSize: 20,
      marginStart: 16,
      marginTop: -8,
      color: colors.white_on_white,
    },
    age_dot_container: {
      alignSelf: 'baseline',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: 16,
    },
    name_container: {
      flex: 2,
      justifyContent: 'flex-end',
    },
    age_text: {
      color: colors.white_on_white,
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '700',
    },
    name_text: {
      color: colors.white_on_white,
      fontSize: 20,
      lineHeight: 24,
      fontWeight: '700',
      padding: 16,
    },
    lastcontainer: {
      width: 330,
      height: '100%',
      borderRadius: 32,
      backgroundColor: 'red',
    },
  })

  return user ? (
    <ImageBackground
      source={
        isEmpty(user?.default_image)
          ? require('src/assets/images/avater.png')
          : { uri: user.default_image }
      }
      style={[
        styles.image,
        isEmpty(user.default_image)
          ? { backgroundColor: `rgba(0, 0, 0, 1)` }
          : { backgroundColor: `rgba(0, 0, 0, 0.4)` },
      ]}>
      <View style={styles.direction_container}>
        <Direction />
        <Text type="heading" style={styles.distance}>{`${convertDistance(
          user.distance,
          isInKilometers ? 'miToKm' : 'kmToMi',
        )}  ${isInKilometers ? 'km' : 'miles'} away`}</Text>
      </View>

      <View style={styles.name_container}>
        <Text style={styles.name_text}>{user.username}</Text>
      </View>

      <View style={styles.age_dot_container}>
        <Text style={styles.age_text}>{user.age}</Text>

        <TouchableOpacity onPress={onMoreClicked}>
          <Dots />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  ) : (
    <RenderNoMoreCards />
  )
  null
}

export default CardItem

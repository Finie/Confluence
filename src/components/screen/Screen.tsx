/* eslint-disable react-native/no-inline-styles */
import AnimatedLottieView from 'lottie-react-native'
import React, { useState } from 'react'
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'

import OverLayLoader from '../view/OverLayLoader'
import BackButton from 'src/assets/icons/backbutton.svg'
import useThemeStyles from 'src/hooks/useThemeStyles'

import Text from '../Text'

type Props = {
  title?: string
  isheaderVisible?: boolean
  onBackPress?: () => void
  children: JSX.Element
  isLoading?: boolean
  isMatched?: boolean
}

const Screen: React.FC<Props> = props => {
  const {
    title,
    isheaderVisible,
    onBackPress,
    children,
    isLoading = false,
    isMatched = false,
  } = props
  const { colors } = useThemeStyles()

  const [isAmatch, setIsAmatch] = useState<boolean>(isMatched)
  const styles = StyleSheet.create({
    container: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      backgroundColor: colors.white,
      flexGrow: 1,
    },
    appbar: {
      flexDirection: 'row',
      marginHorizontal: 30,
    },
    bartitle: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    backpress: {
      paddingVertical: 8,
    },
    end: {},
    title: {
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '600',
      color: colors.black,
    },
    scroll: {
      flexGrow: 1,
    },
  })
  return (
    <SafeAreaView style={styles.container}>
      <OverLayLoader isLoading={isLoading} />
      {isAmatch && (
        <View
          style={{
            zIndex: 20,
            backgroundColor: colors.loaderBackground,
            flex: 1,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AnimatedLottieView
            source={require('src/assets/animations/match_like.json')}
            loop={false}
            autoPlay={true}
            style={{
              width: 300,
              height: 300,
            }}
          />

          <Text
            style={{ color: colors.white, fontSize: 28, fontWeight: '700' }}>
            It's a match
          </Text>

          <TouchableOpacity
            onPress={() => setIsAmatch(false)}
            style={{
              padding: 8,
              marginVertical: 20,
            }}>
            <Text
              style={{ fontSize: 18, fontWeight: '500', color: colors.accent }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {isheaderVisible && (
        <View style={styles.appbar}>
          <TouchableOpacity onPress={onBackPress} style={styles.backpress}>
            <BackButton />
          </TouchableOpacity>
          <View style={styles.bartitle}>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.end}>
            <Text> </Text>
          </View>
        </View>
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.scroll}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
}

export default Screen

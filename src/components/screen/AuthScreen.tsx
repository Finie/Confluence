import React, { ReactNode } from 'react'
import {
  Image,
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
import Logo from 'src/assets/images/bantuzlogo.png'
import useThemeStyles from 'src/hooks/useThemeStyles'

type Props = {
  onBackPressed: () => void
  children: ReactNode
  isLoading: boolean
}

const AuthScreen: React.FC<Props> = props => {
  const { onBackPressed, children, isLoading = false } = props

  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    continer: {
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      flexGrow: 1,
      backgroundColor: colors.white,
    },
    image: {
      width: 35,
      height: 35,

      // marginHorizontal: 8,
    },
    appbar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: 30,
    },
    apptouchable: {
      paddingRight: 8,
      paddingTop: 8,
      paddingBottom: 8,
    },
    scrol: {
      flexGrow: 1,
    },
  })
  return (
    <>
      <OverLayLoader isLoading={isLoading} />
      <SafeAreaView style={styles.continer}>
        <StatusBar
          translucent={true}
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />

        <View style={styles.appbar}>
          <TouchableOpacity onPress={onBackPressed} style={styles.apptouchable}>
            <BackButton />
          </TouchableOpacity>

          <Image style={styles.image} source={Logo} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrol}>
          {children}
        </ScrollView>
      </SafeAreaView>
    </>
  )
}

export default AuthScreen

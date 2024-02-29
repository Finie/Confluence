import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import ArrowIcon from 'src/assets/icons/arrow.svg'
import Security from 'src/assets/icons/security.svg'
import AuthScreen from 'src/components/screen/AuthScreen'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { AuthNavigatorParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  AuthNavigatorParamList,
  'KeepAccountSafe'
>

const SecurityDisclaimer: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()
  const styles = StyleSheet.create({
    centercontainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottombutton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 2,
      elevation: 2,
    },
    bottomview: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      paddingVertical: 16,
      paddingHorizontal: 30,
    },
    first: {
      fontSize: 24,
      lineHeight: 30,
      color: colors.black,
      padding: 60,
      textAlign: 'center',
      fontWeight: '600',
    },
    firs: {
      fontSize: 24,
      lineHeight: 30,
      color: colors.primary,
      fontWeight: '600',
    },
  })
  return (
    <AuthScreen
      onBackPressed={function (): void {
        navigation.goBack()
      }}
      isLoading={false}>
      <View style={styles.centercontainer}>
        <Security />
        <Text style={styles.first}>
          First, let’s keep your account <Text style={styles.firs}>safe.</Text>
        </Text>
      </View>

      <View style={styles.bottomview}>
        <TouchableOpacity
          onPress={() => navigation.navigate('HowToCallYou')}
          style={styles.bottombutton}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    </AuthScreen>
  )
}

export default SecurityDisclaimer

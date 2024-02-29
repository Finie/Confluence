import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React from 'react'
import { Linking, StyleSheet, View } from 'react-native'

import SaftyHelpItemList from 'src/components/SaftyHelpItemList'
import Screen from 'src/components/screen/Screen'
import Text from 'src/components/Text'
import useThemeStyles from 'src/hooks/useThemeStyles'
import { MainStackParamList } from 'src/routes/navigation.type'

type ScreenProps = NativeStackScreenProps<
  MainStackParamList,
  'SafetyAndHelpCenter'
>

const SafetyHelpCenter: React.FC<ScreenProps> = ({ navigation }) => {
  const { colors } = useThemeStyles()

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: colors.background,
      paddingTop: 2.5,
    },
    itemHolder: {
      marginHorizontal: 10,
      marginVertical: 7.5,
      backgroundColor: colors.white,
      borderRadius: 10,
      overflow: 'hidden',
    },
    headertext: {
      marginHorizontal: 20,
      marginTop: 20,
      fontSize: 16,
      lineHeight: 19,
      fontWeight: '600',
      color: colors.black,
    },
  })

  const handleClick = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url)
      } else {
        console.log("Don't know how to open URI: " + url)
      }
    })
  }
  return (
    <Screen
      isheaderVisible
      title={'Safety & Help Center'}
      onBackPress={() => navigation.goBack()}>
      <View style={styles.container}>
        {/* start of items */}
        <View style={styles.itemHolder}>
          <Text style={styles.headertext}>Contact Us</Text>
          <SaftyHelpItemList
            title={'Help & Support'}
            onPress={function (): void {
              Linking.openURL(
                'mailto:info@gikuyusingles.com?subject=Help&body=message',
              )
            }}
          />
        </View>

        {/* end item of items */}

        {/* start of items */}
        <View style={styles.itemHolder}>
          <Text style={styles.headertext}>Community</Text>
          <SaftyHelpItemList
            title={'Community Guidelines'}
            onPress={function (): void {
              handleClick('https://bantuzsingles.com/community-guidelines/')
            }}
          />
          <SaftyHelpItemList
            title={'Safety Tips'}
            onPress={function (): void {
              handleClick(
                'https://bantuzsingles.com/safety-tips-for-meeting-offline/',
              )
            }}
          />
        </View>

        {/* end item of items */}

        {/* start of items */}
        <View style={styles.itemHolder}>
          <Text style={styles.headertext}>Legal</Text>
          <SaftyHelpItemList
            title={'Privacy Policy'}
            onPress={function (): void {
              handleClick('https://bantuzsingles.com/privacy-policy/')
            }}
          />
          <SaftyHelpItemList
            title={'Terms of Service'}
            onPress={function (): void {
              handleClick('https://bantuzsingles.com/terms-and-conditions/')
            }}
          />
        </View>

        {/* end item of items */}
        {/* 
        <TouchableOpacity
          style={styles.logoutbutton}
          onPress={() => {
            setuserData({});
            EncryptionStore.destroyUser();
          }}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity> */}
      </View>
    </Screen>
  )
}

export default SafetyHelpCenter

import React from 'react'
import { StatusBar, StyleSheet, Text, View } from 'react-native'

import Button from './components/Button'
import FloatingLabelInput from './components/FloatingLabelInput'
import FloatingTextArea from './components/FloatingTextArea'
import Dropdown from './components/view/customs/Dropdown'
import SwipableCards from './components/view/customs/SwipableCards'
import { SwipeData } from './utils/shared-type'

const HomeScreen = () => {
  let users: SwipeData[] = [
    {
      id: 0,
      name: 'John Doe',
      age: 26,
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 1,
      name: 'Jane Doe',
      age: 24,
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 2,
      name: 'Bob Smith',
      age: 30,
      image: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ]
  return (
    <View style={styles.container}>
      <Dropdown
        options={users}
        onSelected={(selectedItems: any) => {
          console.log('====================================')
          console.warn(selectedItems)
          console.log('====================================')
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    padding: 16,
  },
})

export default HomeScreen

import React, { useState } from 'react'
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import DraggableFlatList, {
  RenderItemParams,
} from 'react-native-draggable-flatlist'

import { Positions } from 'src/components/view/lib/swipes-component/Configs'
import SortableList from 'src/components/view/lib/swipes-component/SortableList'
import Tile from 'src/components/view/lib/swipes-component/Tile'

const tiles = [
  {
    id: 'google',
    uri: 'https://google.com',
  },

  {
    id: 'expo',
    uri: 'https://expo.io',
  },
  {
    id: 'facebook',
    uri: 'https://facebook.com',
  },
  {
    id: 'reanimated',
    uri: 'https://docs.swmansion.com/react-native-reanimated/',
  },
  {
    id: 'github',
    uri: 'https://github.com',
  },
  {
    id: 'rnnavigation',
    uri: 'https://reactnavigation.org/',
  },
  {
    id: 'youtube',
    uri: 'https://youtube.com',
  },
  {
    id: 'twitter',
    uri: 'https://twitter.com',
  },
]

const TestScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <SortableList
        editing={true}
        onDragEnd={(diff: Positions) => {
          console.log('=================onDragEnd===================')
          console.log(diff)
          console.log('====================================')
        }}>
        {[...tiles, ...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + '-' + index}
            id={tile.id + '-' + index}
            uri={tile.uri}
          />
        ))}
      </SortableList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gridItem: {
    width: Dimensions.get('window').width / 3 - 20,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
    margin: 10,
    borderRadius: 10,
  },
  activeGridItem: {
    backgroundColor: 'blue',
  },
  gridItemText: {
    color: 'white',
    fontSize: 16,
  },
})

export default TestScreen

import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'

import Text from 'src/components/Text'

import { MARGIN, SIZE } from './Configs'

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'red',
    padding: 6,
  },
})
interface TileProps {
  id: string
  uri: string
  onLongPress: () => void
}

const Tile = ({ uri, onLongPress }: TileProps) => {
  return (
    <TouchableOpacity onLongPress={onLongPress} style={styles.container}>
      <Text>{uri}</Text>
    </TouchableOpacity>
  )
}

export default Tile

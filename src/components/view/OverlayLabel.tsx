import { string } from 'prop-types'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
  label: string
  color: string
}

const OverlayLabel: React.FC<Props> = ({ label, color }) => (
  <View style={[styles.overlayLabel, { borderColor: color }]}>
    <Text style={[styles.overlayLabelText, { color }]}>{label}</Text>
  </View>
)

OverlayLabel.propTypes = {
  label: string.isRequired,
  color: string.isRequired,
}

const styles = StyleSheet.create({
  overlayLabel: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 2,
    borderRadius: 10,
    zIndex: 100,
  },
  overlayLabelText: {
    fontSize: 25,
    fontFamily: 'Avenir',
    textAlign: 'center',
  },
})

export default OverlayLabel

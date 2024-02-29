import React, {memo} from 'react';
import {View, StyleSheet} from 'react-native';

const THUMB_RADIUS = 12;

const Thumb = () => {
  return <View style={styles.root} />;
};

const styles = StyleSheet.create({
  root: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    borderColor: '#A04D31',
    backgroundColor: '#A04D31',
  },
});

export default memo(Thumb);

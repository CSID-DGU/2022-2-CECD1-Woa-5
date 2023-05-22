import React from 'react';
import { View, StyleSheet } from 'react-native';

const HorizonLine= () => (
      <View //This is horizontal line between Menu and bodyScreen
      style={{
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      }}
    />
)

export default HorizonLine
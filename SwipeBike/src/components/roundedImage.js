import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {FONTS, SIZES, PIXEL, COLORS} from '../constants';

export default function RoundedImage(props) {
  return (
    <View
      style={{
        borderRadius: 200,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={props.image}
        style={{width: props.width, height: props.height}}></Image>
    </View>
  );
}

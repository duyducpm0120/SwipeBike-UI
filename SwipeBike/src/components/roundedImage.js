import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {FONTS, SIZES, RESPONSIVE, COLORS} from '../constants';

export default function RoundedImage(props) {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: props.width,
        height: props.height,
      }}>
      <Image
        source={props.image}
        style={{
          width: props.width,
          height: props.height,
          borderRadius: 200,
        }}></Image>
    </View>
  );
}

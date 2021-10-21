import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, PIXEL, COLORS} from '../constants';

export default function BackgroundButton(props) {
  return (
    <View
      style={{
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        width: PIXEL.pixelSizeHorizontal(315),
        height: PIXEL.pixelSizeVertical(60),
      }}>
      <Text style={FONTS.h2Bold}>{props.text}</Text>
    </View>
  );
}

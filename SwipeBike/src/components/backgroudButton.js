import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, RESPONSIVE, COLORS} from '../constants';

export default function BackgroundButton(props) {
  return (
    <View
      style={
        props.style
          ? props.style
          : {
              borderRadius: 10,
              backgroundColor: COLORS.primary,
              justifyContent: 'center',
              alignItems: 'center',
              width: RESPONSIVE.pixelSizeHorizontal(315),
              height: RESPONSIVE.pixelSizeVertical(60),
            }
      }>
      <Text style={FONTS.h2Bold}>{props.text}</Text>
    </View>
  );
}

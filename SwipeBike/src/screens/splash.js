import React from 'react';
import {View} from 'react-native';
import {Waiting} from '../components';
import {COLORS} from '../constants';
export default function Splash() {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.backGroundColor,
        width: '100%',
        height: '100%',
      }}>
      <Waiting></Waiting>
    </View>
  );
}

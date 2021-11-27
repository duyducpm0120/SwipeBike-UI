import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants';
import {useSelector} from 'react-redux';
export default function Loading() {
  const isLoading = useSelector(state => state.isLoading.value);
  if (isLoading)
    return (
      <View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: COLORS.backGroundColor,
          opacity: 0.6,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={50} color={COLORS.primary} />
      </View>
    );
  return <View></View>;
}

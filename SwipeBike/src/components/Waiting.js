import React from 'react';
import {View, SafeAreaView, Animated, Easing, Image} from 'react-native';
import {useEffect, useRef} from 'react';
import {IMAGES, PIXEL, COLORS} from '../constants';

export default function Waiting() {
  const list = [0, 1, 2, 3, 4];
  // initial animated var
  const autoX = useRef(new Animated.Value(0)).current;
  // render dots
  const dotsRender = list.map((value, index) => {
    //loop
    const animAutoX = Animated.loop(
      Animated.timing(autoX, {
        toValue: 6,
        duration: 1500,
        //easing: Easing.swing,
        useNativeDriver: false,
      }),
    );
    animAutoX.start();
    const width = autoX.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [10, 20, 10],
      extrapolate: 'clamp',
    });
    const color = autoX.interpolate({
      inputRange: [index - 1, index, index + 1],
      outputRange: [
        COLORS.backGroundColor,
        COLORS.primary,
        COLORS.backGroundColor,
      ],
      extrapolate: 'clamp',
    });
    return (
      <Animated.View
        key={index}
        style={{
          width: 15,
          height: 15,
          borderRadius: 50,
          backgroundColor: color,
          marginHorizontal: 5,
        }}></Animated.View>
    );
  });
  return (
    <SafeAreaView
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '50%',
        backgroundColor: COLORS.backGroundColor,
        padding: 20,
        borderRadius: 20,
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={IMAGES.swipeBike}
          style={{
            width: PIXEL.pixelSizeHorizontal(172),
            height: PIXEL.pixelSizeHorizontal(93),
          }}></Image>
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          marginTop: 20,
        }}>
        {dotsRender}
      </View>
    </SafeAreaView>
  );
}

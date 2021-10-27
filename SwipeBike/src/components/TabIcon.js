import React from 'react';
import {View, Image} from 'react-native';
import {COLORS} from '../constants';

const TabIcon = ({focused, normalIcon, focusedIcon}) => {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image
        source={focused ? focusedIcon : normalIcon}
        resizeMode="contain"
        style={{
          width: focused ? 30 : 25,
          height: focused ? 30 : 25,
          tintColor: focused ? COLORS.primary : COLORS.darkgray,
        }}
      />
    </View>
  );
};

export default TabIcon;

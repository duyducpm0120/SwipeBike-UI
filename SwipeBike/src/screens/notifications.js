import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {STYLES, FONTS, IMAGES, ICONS, COLORS} from '../constants';
import {Notification} from '../components';

export default function Notifications(props) {
  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={ICONS.leftArr1}
            style={{tintColor: COLORS.black, width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Text style={{...FONTS.title}}>Thông báo</Text>
        <TouchableOpacity>
          <Image
            source={ICONS.refresh}
            style={{tintColor: COLORS.black, width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }
  return <View style={{...STYLES.container}}>{renderHeader()}</View>;
}

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {FONTS, STYLES} from '../constants';
import {BackgroundButton, Trip} from '../components';

export default function TripInfo(props) {
  const [tripDetail, setTripDetail] = useState(props.route.params.trip);
  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text style={{...FONTS.title}}>Thông tin chuyến đi</Text>
      </View>
    );
  }
  function renderTripInfo() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Trip tripDetail={props.route.params.trip}></Trip>
      </View>
    );
  }
  function renderCompleteButton() {
    return (
      <TouchableOpacity
        style={{
          width: '100%',
          height: '20%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {}}>
        <BackgroundButton text="Xong"></BackgroundButton>
      </TouchableOpacity>
    );
  }
  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      {renderHeader()}
      {renderTripInfo()}
      {renderCompleteButton()}
    </View>
  );
}

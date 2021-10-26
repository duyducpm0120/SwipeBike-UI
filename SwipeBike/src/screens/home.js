import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {Trip} from '../components';

export default function Home() {
  const date = new Date();
  console.log('date', date);
  //dummy data
  const tripDetail = {
    driver: {
      name: 'Duong Thanh Vuong',
      image: IMAGES.cuteDriver,
    },
    passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
    time: '7:00 AM',
    date: date,
    from: 'Nhan van',
    to: 'CNTT',
  };

  return (
    <View style={{...STYLES.container}}>
      <Trip
        tripDetail={tripDetail}
        pressTrip={() => {
          console.log('press');
        }}></Trip>
    </View>
  );
}

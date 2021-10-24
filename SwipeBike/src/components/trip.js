import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {
  BackgroundButton,
  RoundedImage,
  getVietnameseDatetime,
} from '../components';
import DatePicker from 'react-native-date-picker';
import {
  TextInput,
  configureFonts,
  Provider,
  List,
  RadioButton,
} from 'react-native-paper';

export default function Trip(props) {
  var tripDetail = {
    driver: {name: '', image: null},
    passenger: {name: '', image: null},
    time: null,
    date: null,
    from: null,
    to: null,
  };
  tripDetail = props.tripDetail; //The details of trip
  var type = props.tripType; //candidates/request/pairing
  var status = props.tripStatus;
  var editMode = props.editMode;

  function renderImage() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: '35%',
          width: '100%',
        }}>
        <View
          style={{
            width: '45%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <RoundedImage
            image={tripDetail.driver.image}
            width={60}
            height={60}></RoundedImage>
          <Image
            source={ICONS.driver}
            style={{
              width: 20,
              height: 20,
              top: -20,
              right: -20,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3Bold,
              width: '90%',
              textAlign: 'center',
              marginTop: -15,
            }}>
            {tripDetail.driver.name}
          </Text>
        </View>

        {/* Divider */}
        <View
          style={{
            marginHorizontal: '3%',
            backgroundColor: COLORS.darkgray,
            height: 40,
            width: 1,
          }}></View>

        <View
          style={{
            width: '45%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <RoundedImage
            image={tripDetail.passenger.image}
            width={60}
            height={60}></RoundedImage>
          <Image
            source={ICONS.hitchHiker}
            style={{
              width: 20,
              height: 20,
              top: -20,
              right: -20,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3Bold,

              width: '90%',
              textAlign: 'center',
              marginTop: -15,
            }}>
            {tripDetail.passenger.name}
          </Text>
        </View>
      </View>
    );
  }

  function renderDetail() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            marginTop: PIXEL.pixelSizeVertical(20),
          }}>
          <Image source={ICONS.time}></Image>
          <Text style={{...FONTS.h3}}>
            {getVietnameseDatetime(tripDetail.date)}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: PIXEL.pixelSizeHorizontal(350),
        height: PIXEL.pixelSizeHorizontal(330),
        borderColor: COLORS.black,
        borderWidth: 0.5,
      }}>
      {renderImage()}
      {renderDetail()}
    </View>
  );
}

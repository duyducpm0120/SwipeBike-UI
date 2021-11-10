import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {
  BackgroundButton,
  RoundedImage,
  getVietnameseDate,
  getVietnameseTime,
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
  const [tripDetail, setTripDetail] = useState({
    driver: {name: '', image: null},
    passenger: {name: '', image: null},
    dateTime: null,
    from: {
      name: '',
      coordinate: [],
    },
    to: {name: '', coordinate: []},
  });
  useEffect(() => {
    setTripDetail(props.tripDetail); //The details of trip
  });

  function renderImage() {
    return (
      // driver field
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
        }}>
        <View
          style={{
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
        {tripDetail.passenger != null ? (
          <View
            style={{
              marginHorizontal: '3%',
              backgroundColor: COLORS.darkgray,
              height: 40,
              width: 1,
            }}></View>
        ) : (
          <View></View>
        )}

        {/* passenger field */}
        {tripDetail.passenger != null ? (
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
        ) : (
          <View></View>
        )}
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
            marginTop: PIXEL.pixelSizeVertical(10),
          }}>
          {/* Time */}
          <Image
            source={ICONS.time}
            style={{
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
              tintColor: COLORS.darkgray,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: 10,
            }}>
            {getVietnameseTime(tripDetail.dateTime)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            marginTop: PIXEL.pixelSizeVertical(10),
          }}>
          <Image
            source={ICONS.calendar}
            style={{
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
              tintColor: COLORS.darkgray,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: 10,
            }}>
            {getVietnameseDate(tripDetail.dateTime)}
          </Text>
        </View>

        {/* Location */}
        {/* From lOcation */}
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexDirection: 'row',
            width: '100%',
            marginTop: PIXEL.pixelSizeVertical(10),
          }}>
          <Image
            source={ICONS.dot}
            style={{
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
              tintColor: COLORS.darkgray,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: 10,
              width: '90%',
            }}>
            {tripDetail.from.name}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Image source={IMAGES.downArrow}></Image>
        </View>

        {/* To Location */}
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'row',
            width: '100%',
          }}>
          <Image
            source={ICONS.dot}
            style={{
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
              tintColor: COLORS.primary,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: 10,
              width: '90%',
            }}>
            {tripDetail.to.name}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: PIXEL.pixelSizeHorizontal(350),
        height: PIXEL.pixelSizeHorizontal(350),
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.backGroundColor,
        ...STYLES.shadow,
      }}
      onPress={() => (props.pressTrip ? props.pressTrip(tripDetail) : null)}>
      {renderImage()}
      {renderDetail()}
    </TouchableOpacity>
  );
}

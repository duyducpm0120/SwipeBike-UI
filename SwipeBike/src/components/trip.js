import React, {useState, useEffect} from 'react';
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
  const [tripDetail, setTripDetail] = useState({
    driver: {name: '', image: null},
    passenger: {name: '', image: null},
    time: null,
    date: null,
    from: null,
    to: null,
  });
  useEffect(() => {
    setTripDetail(props.tripDetail); //The details of trip
  });

  // var type = props.tripType; //candidates/request/pairing
  // var status = props.tripStatus;
  // var editMode = props.editMode;

  // function renderDots() {
  //   return (
  //     <TouchableOpacity
  //       style={{
  //         width: '100%',
  //         flexDirection: 'row',
  //         justifyContent: 'flex-end',
  //         alignItems: 'center',
  //         marginBottom: 10,
  //       }}
  //       onPress={() => props.pressTrip(tripDetail)}>
  //       <Image
  //         source={ICONS.threeDot}
  //         style={{marginHorizontal: 5, tintColor: COLORS.darkgray}}></Image>
  //     </TouchableOpacity>
  //   );
  // }

  function renderImage() {
    return (
      // driver field
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
            {tripDetail.time}
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
            {getVietnameseDatetime(tripDetail.date)}
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
            }}>
            {tripDetail.from}
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
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
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
            }}>
            {tripDetail.to}
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
        //borderColor: COLORS.black,
        //borderWidth: 0.5,
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.backGroundColor,
        ...STYLES.shadow,
      }}
      onPress={() => props.pressTrip(tripDetail)}>
      {renderImage()}
      {renderDetail()}
    </TouchableOpacity>
  );
}
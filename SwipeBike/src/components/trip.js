import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, IMAGES, STYLES} from '../constants';
import {
  RoundedImage,
  getVietnameseDate,
  getVietnameseTime,
} from '../components';

export default function Trip(props) {
  const [tripDetail, setTripDetail] = useState({
    CandidateTripDriver: {
      name: '',
      image: null,
    },
    CandidateTripPassenger: null,
    CandidateTripBike: true,
    CandidateTripDateTime: '',
    CandidateTripFromAddress: '',
    CandidateTripToAddress: '',
    CandidateTripFromLat: null,
    CandidateTripFromLong: null,
    CandidateTripToLat: null,
    CandidateTripToLong: null,
    CandidateTripMessage: null,
  });
  useEffect(() => {
    setTripDetail(props.tripDetail); //The details of trip
  });

  function renderImage() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
        }}>
        {/* // driver field */}
        <View
          style={{
            width: '45%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <RoundedImage
            image={tripDetail.CandidateTripDriver.image}
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
            {tripDetail.CandidateTripDriver.name}
          </Text>
        </View>
        {/* Divider */}
        {tripDetail.CandidateTripPassenger != null ? (
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
        {tripDetail.CandidateTripPassenger != null ? (
          <View
            style={{
              width: '45%',
              // height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <RoundedImage
              image={tripDetail.CandidateTripPassenger.image}
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
              {tripDetail.CandidateTripPassenger.name}
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
            marginTop: RESPONSIVE.pixelSizeVertical(10),
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
            {getVietnameseTime(tripDetail.CandidateTripDateTime)}
          </Text>
        </View>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
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
            {getVietnameseDate(tripDetail.CandidateTripDateTime)}
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
            marginTop: RESPONSIVE.pixelSizeVertical(10),
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
            {tripDetail.CandidateTripFromAddress}
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
            {tripDetail.CandidateTripToAddress}
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
        width: RESPONSIVE.pixelSizeHorizontal(350),
        height: RESPONSIVE.pixelSizeHorizontal(350),
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

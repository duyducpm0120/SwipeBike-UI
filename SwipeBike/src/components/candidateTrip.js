import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, IMAGES, STYLES} from '../constants';
import {
  RoundedImage,
  getVietnameseDate,
  getVietnameseTime,
} from '../components';

import {useSelector} from 'react-redux';

export default function CandidateTrip(props) {
  const token = useSelector(state => state.loginToken.token);
  const [tripDetail, setTripDetail] = useState({
    CandidateTripCreator: {
      UserFullName: null,
      UserProfilePic: null,
    },
    CreatorId: 7,
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
    CandidateTripId: null,
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
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <RoundedImage
            image={{uri: tripDetail.CandidateTripCreator.UserProfilePic}}
            width={80}
            height={80}></RoundedImage>
          <Text
            style={{
              ...FONTS.h2Bold,
              width: '90%',
              textAlign: 'center',
            }}>
            {tripDetail.CandidateTripCreator.UserFullName}
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
            {tripDetail.CandidateTripFromAddress.length < 28
              ? `${tripDetail.CandidateTripFromAddress}`
              : `${tripDetail.CandidateTripFromAddress.substring(0, 25)}...`}
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
            {tripDetail.CandidateTripToAddress.length < 28
              ? `${tripDetail.CandidateTripToAddress}`
              : `${tripDetail.CandidateTripToAddress.substring(0, 25)}...`}
          </Text>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginTop: RESPONSIVE.pixelSizeVertical(10),
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: RESPONSIVE.pixelSizeHorizontal(300),
            height: RESPONSIVE.pixelSizeVertical(40),
            backgroundColor: COLORS.primaryLighter1,
            borderRadius: 5,
            marginVertical: 5,
          }}
          onPress={() => {
            props.pressTrip();
          }}>
          <Text style={{...FONTS.h3Bold, color: COLORS.primaryDarker1}}>
            Xem gợi ý
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: RESPONSIVE.pixelSizeHorizontal(300),
            height: RESPONSIVE.pixelSizeVertical(40),
            backgroundColor: COLORS.lightGray0,
            borderRadius: 5,
            marginVertical: 5,
          }}>
          <Text style={{...FONTS.h3Bold, color: COLORS.black}}>
            Xóa chuyến đi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: RESPONSIVE.pixelSizeHorizontal(350),
        height: RESPONSIVE.pixelSizeHorizontal(450),
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.backGroundColor,
        ...STYLES.shadow,
      }}
      onPress={() => (props.pressTrip ? props.pressTrip(tripDetail) : null)}>
      {renderImage()}
      {renderDetail()}
      {renderButton()}
    </TouchableOpacity>
  );
}

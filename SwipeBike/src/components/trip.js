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
    CreatorBike: true,
    DriverFromAddress: 'KTX Khu B, ĐHQG',
    DriverFromLat: 10.8836012,
    DriverFromLong: 106.7815141,
    DriverToAddress:
      'Khoa Y - Đại Học Quốc Gia Thành Phố Hồ Chí Minh (cơ sở mới)',
    DriverToLat: 10.8883056,
    DriverToLong: 106.7982174,
    FromRequest: 50,
    PassengerFromAddress: 'KTX khu A Mở Rộng ĐHQG TP Hồ Chí Minh',
    PassengerFromLat: 10.8816537,
    PassengerFromLong: 106.8088752,
    PassengerToAddress: 'Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM',
    PassengerToLat: 10.8722574,
    PassengerToLong: 106.8020436,
    TripCreatedTime: '2021-12-16T14:29:04.526Z',
    TripDriver: {
      UserFullName: 'Nancy',
      UserProfilePic:
        'https://storage.googleapis.com/swipebike-38736.appspot.com/user_5_pic_2021-12-03T07:13:00.038Z',
    },
    TripDriverId: 5,
    TripId: 1,
    TripPassenger: {
      UserFullName: 'Jason Statham',
      UserProfilePic:
        'https://storage.googleapis.com/swipebike-38736.appspot.com/user_6_pic_2021-11-29T08:06:32.935Z',
    },
    TripPassengerId: 6,
    TripStartTime: null,
    TripType: 4,
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
        <TouchableOpacity
          style={{
            width: '45%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          onPress={() => {
            props.viewProfile(tripDetail.TripDriverId);
          }}>
          <RoundedImage
            image={{uri: tripDetail.TripDriver.UserProfilePic}}
            width={60}
            height={60}></RoundedImage>

          <Text
            style={{
              ...FONTS.h3Bold,
              width: '90%',
              textAlign: 'center',
            }}>
            {tripDetail.TripDriver.UserFullName}
          </Text>
        </TouchableOpacity>
        {/* Divider */}

        <View
          style={{
            marginHorizontal: '3%',
            backgroundColor: COLORS.darkgray,
            height: 40,
            width: 1,
          }}></View>

        {/* passenger field */}

        <TouchableOpacity
          style={{
            width: '45%',
            // height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
          onPress={() => {
            props.viewProfile(tripDetail.TripPassengerId);
          }}>
          <RoundedImage
            image={{uri: tripDetail.TripPassenger.UserProfilePic}}
            width={60}
            height={60}></RoundedImage>

          <Text
            style={{
              ...FONTS.h3Bold,

              width: '90%',
              textAlign: 'center',
            }}>
            {tripDetail.TripPassenger.UserFullName}
          </Text>
        </TouchableOpacity>
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
            {getVietnameseTime(tripDetail.TripCreatedTime)}
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
            {getVietnameseDate(tripDetail.TripCreatedTime)}
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
            {tripDetail.DriverFromAddress}
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
            {tripDetail.PassengerToAddress}
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
            backgroundColor: COLORS.lightGray0,
            borderRadius: 5,
            marginVertical: 5,
          }}
          onPress={()=>{
            props.cancelTrip();
          }}>
          <Text style={{...FONTS.h3Bold, color: COLORS.black}}>
            Hủy chuyến đi
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: RESPONSIVE.pixelSizeHorizontal(350),
        height: RESPONSIVE.pixelSizeVertical(450),
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

import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, IMAGES, STYLES} from '../constants';
import {
  RoundedImage,
  getVietnameseDate,
  getVietnameseTime,
} from '../components';

export default function TripRequest(props) {
  const [tripDetail, setTripDetail] = useState(props.tripDetail);

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
            image={{uri: tripDetail.RequestCreator.UserProfilePic}}
            width={60}
            height={60}></RoundedImage>

          <Text
            style={{
              ...FONTS.h3Bold,
              width: '90%',
              textAlign: 'center',
            }}>
            {tripDetail.RequestCreator.UserFullName}
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

        {/* passenger field */}

        <View
          style={{
            width: '45%',
            // height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
          <RoundedImage
            image={{uri: tripDetail.RequestTarget.UserProfilePic}}
            width={60}
            height={60}></RoundedImage>

          <Text
            style={{
              ...FONTS.h3Bold,

              width: '90%',
              textAlign: 'center',
            }}>
            {tripDetail.RequestTarget.UserFullName}
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
            {getVietnameseTime(tripDetail.RequestCreateTime)}
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
            {getVietnameseDate(tripDetail.RequestTarget)}
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
            {tripDetail.DriverToAddress}
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
            //props.loadRecommendation();
          }}>
          <Text style={{...FONTS.h3Bold, color: COLORS.primaryDarker1}}>
            Chấp nhận ghép đôi
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
          <Text style={{...FONTS.h3Bold, color: COLORS.black}}>Từ chối</Text>
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

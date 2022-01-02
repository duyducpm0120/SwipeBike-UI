import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, IMAGES, STYLES} from '../constants';
import {
  RoundedImage,
  getVietnameseDate,
  getVietnameseTime,
} from '../components';
import {Menu, Divider} from 'react-native-paper';
import {TRIPTYPE} from '../constants';
import {rateTrip} from '../api';
import {useSelector} from 'react-redux';

export default function Trip(props) {
  const [tripDetail, setTripDetail] = useState({
    CreatorBike: null,
    DriverFromAddress: null,
    DriverFromLat: null,
    DriverFromLong: null,
    DriverToAddress: null,
    DriverToLat: null,
    DriverToLong: null,
    FromRequest: null,
    PassengerFromAddress: null,
    PassengerFromLat: null,
    PassengerFromLong: null,
    PassengerToAddress: null,
    PassengerToLat: null,
    PassengerToLong: null,
    TripCreatedTime: null,
    TripDriver: {
      UserFullName: null,
      UserProfilePic: null,
    },
    TripDriverId: null,
    TripId: null,
    TripPassenger: {
      UserFullName: null,
      UserProfilePic: null,
    },
    TripPassengerId: null,
    TripStartTime: null,
    TripType: null,
  });

  const [visible, setVisible] = useState(false);
  const [rating, setRating] = useState();

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  //Local token
  const token = useSelector(state => state.loginToken.token);

  const ratingIcon = (content, image) => {
    //console.log("content",content);
    //console.log("image",image);
    return (
      <Image
        source={image}
        style={{
          tintColor: rating === content ? COLORS.primary : COLORS.darkgray,
          width: RESPONSIVE.fontPixel(40),
          height: RESPONSIVE.fontPixel(40),
        }}></Image>
    );
  };

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
            {getVietnameseTime(tripDetail.TripStartTime)}
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
            {getVietnameseDate(tripDetail.TripStartTime)}
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
    if (tripDetail.TripType == TRIPTYPE.PAIRING_TRIP_TYPE)
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
            onPress={() => {
              props.cancelTrip();
            }}>
            <Text style={{...FONTS.h3Bold, color: COLORS.black}}>
              Hủy chuyến đi
            </Text>
          </TouchableOpacity>
        </View>
      );
    else
      return (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Menu
            visible={visible}
            onDismiss={closeMenu}
            anchor={
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
                onPress={openMenu}>
                <Text style={{...FONTS.h3Bold, color: COLORS.primaryDarker1}}>
                  Đánh giá chuyến đi
                </Text>
              </TouchableOpacity>
            }>
            <Menu.Item
              onPress={() => {
                setRating('Like');
              }}
              title="Yêu thích"
              icon={() => ratingIcon('Like', ICONS.heartBold)}
              titleStyle={{
                ...FONTS.h2,
                color: rating === 'Like' ? COLORS.primaryDarker1 : COLORS.black,
              }}
            />
            <Menu.Item
              onPress={() => {
                setRating('Unlike');
              }}
              title="Không tốt"
              icon={() => ratingIcon('Unlike', ICONS.badBold)}
              titleStyle={{
                ...FONTS.h2,
                color:
                  rating === 'Unlike' ? COLORS.primaryDarker1 : COLORS.black,
              }}
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                if (rating != '')
                  rateTrip(
                    tripDetail.TripId,
                    token,
                    rating == 'Like' ? true : false,
                  )
                    .then(res => {
                      console.log('rating success');
                    })
                    .catch(err => console.log('rating err'));
                closeMenu();
              }}
              title="OK"
              titleStyle={{...FONTS.h2Bold}}
              style={{justifyContent: 'center', alignItems: 'center'}}
              contentStyle={{justifyContent: 'center', alignItems: 'center'}}
            />
          </Menu>
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

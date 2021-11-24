import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  RESPONSIVE,
  ICONS,
  IMAGES,
  STYLES,
} from '../constants';
import {Trip, BackgroundButton, waitingTripDetail} from '../components';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useSelector} from 'react-redux';

export default function Home(props) {
  //the user
  const [user, setUser] = useState({});

  const userProfile = useSelector(state => state.userProfile.userProfile);
  //dummy data
  //dummy waitingTripList
  const [waitingTripList, setWaitingTripList] = useState([
    {
      tripId: 0,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 1,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 2,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 3,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 4,
      tripDetail: waitingTripDetail,
    },
  ]);

  //dummy recommendedTripList
  const [recommendedTripList, setRecommendedTripList] = useState([
    {
      tripId: 0,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 1,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 2,
      tripDetail: waitingTripDetail,
    },
    {
      tripId: 3,
      tripDetail: waitingTripDetail,
    },
  ]);

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef(null);
  const fall = new Animated.Value(1);

  //Create components inner bottomsheet
  const renderInner = () => (
    <View
      style={{
        backgroundColor: COLORS.backGroundColor,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 10,
      }}>
      {/* //bar signal */}
      <View
        style={{
          width: '100%',
          height: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: 40,
            height: '100%',
            backgroundColor: COLORS.darkgray,
            borderRadius: 100,
          }}></View>
      </View>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          //openImagePicker();
        }}>
        <BackgroundButton text="Xem trên bản đồ"></BackgroundButton>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          //openCamera();
        }}>
        <BackgroundButton text="Chấp nhận ghép đôi"></BackgroundButton>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal(315),
          height: RESPONSIVE.pixelSizeVertical(60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo(1);
        }}>
        <Text style={FONTS.h2Bold}>Từ chối ghép đôi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal(315),
          height: RESPONSIVE.pixelSizeVertical(60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo(1);
        }}>
        <Text style={FONTS.h2Bold}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );

  //Open options for trip
  function openTripOptions(tripDetail) {
    bottomSheetRef.current.snapTo(0);
  }
  //Trip options bottomSheet
  const tripOptionsBottomSheet = () => {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', RESPONSIVE.pixelSizeVertical(-50)]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
    );
  };

  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text style={FONTS.h2}>Xin chào,</Text>
          <Text style={FONTS.h1Bold}>{user.name}</Text>
        </View>
        <TouchableOpacity>
          <Image source={ICONS.belt}></Image>
        </TouchableOpacity>
      </View>
    );
  }

  function renderCreateTrip() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginVertical: 20,
          width: SIZES.width - 40,

          //width: '100%', //width size bug but I don't know why
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            marginBottom: RESPONSIVE.pixelSizeVertical(20),
          }}>
          <Text style={{...FONTS.h2Bold}}>Tạo chuyến đi của bạn</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            //marginBottom: RESPONSIVE.pixelSizeVertical(20),
          }}>
          <Image
            source={IMAGES.cuteDriver}
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(150),
              height: RESPONSIVE.pixelSizeVertical(125),
            }}></Image>
          <TouchableOpacity
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(140),
              height: RESPONSIVE.pixelSizeVertical(50),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(10),
              backgroundColor: COLORS.primaryLighter1,
              borderRadius: 50,
              marginTop: 10,
              ...STYLES.shadow,
            }}
            onPress={() => props.navigation.navigate('CreateTrip')}>
            <Text style={FONTS.h3Bold}>Tạo ngay</Text>
            <Image
              source={ICONS.rightArr2}
              style={{tintColor: COLORS.black}}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderWaitingTripList() {
    return (
      <View style={{marginTop: 20, height: 400}}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: RESPONSIVE.pixelSizeVertical(20),
          }}>
          <Text style={{...FONTS.h2Bold}}>Đang chờ</Text>
          <TouchableOpacity
            onPress={() => {
              console.log(userProfile);
              //props.navigation.jumpTo('TripsScreen');
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                textDecorationLine: 'underline',
              }}>
              Xem thêm
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={1}>
          {waitingTripList.map(trip => {
            return (
              <View
                style={{
                  marginHorizontal:
                    (SIZES.width - RESPONSIVE.pixelSizeHorizontal(350) - 40) /
                    2,
                }}>
                <Trip
                  tripDetail={trip.tripDetail}
                  pressTrip={() => {
                    openTripOptions(trip.tripDetail);
                  }}></Trip>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      <Animated.ScrollView
        nestedScrollEnabled={true}
        style={{opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))}}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderCreateTrip()}
        {renderWaitingTripList()}
        {/* {renderRecommendedTrip()} */}
      </Animated.ScrollView>
      {tripOptionsBottomSheet()}
    </View>
  );
}

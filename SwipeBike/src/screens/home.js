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
  const [waitingTripList, setWaitingTripList] = useState([]);

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
              backgroundColor: COLORS.primary,
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
      <View
        style={{
          marginVertical: 20,
          //height: RESPONSIVE.pixelSizeVertical(900),
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            //marginBottom: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Text style={{...FONTS.h2Bold}}>Đang chờ</Text>
        </View>
        <View
          style={{
            height: RESPONSIVE.pixelSizeVertical(370),
          }}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={1}
            contentContainerStyle={{
              paddingVertical: RESPONSIVE.pixelSizeVertical(10),
            }}>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(200),
              height: RESPONSIVE.pixelSizeVertical(50),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(10),
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              marginTop: 10,
              ...STYLES.shadow,
            }}
            onPress={() => props.navigation.jumpTo('TripsScreen')}>
            <Text style={FONTS.h3Bold}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      <ScrollView
        nestedScrollEnabled={true}
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
      </ScrollView>
    </View>
  );
}

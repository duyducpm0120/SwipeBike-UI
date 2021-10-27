import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {Trip} from '../components';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

export default function Home() {
  //the user
  const [user, setUser] = useState({
    name: 'Vuong',
  });
  //dummy data
  const tripDetail = {
    driver: {
      name: 'Duong Thanh Vuong',
      image: IMAGES.cuteDriver,
    },
    passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
    time: '7:00 AM',
    date: new Date(),
    from: 'Nhan van',
    to: 'CNTT',
  };

  //dummy waitingTripList
  const [waitingTripList, setWaitingTripList] = useState([
    {
      tripId: 0,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 1,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 2,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 3,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 4,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: {name: 'Oanhhhhhhhhhhhhhhhhh', image: IMAGES.swipeBike},
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
  ]);

  //dummy recommendedTripList
  const [recommendedTripList, setRecommendedTripList] = useState([
    {
      tripId: 0,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: null,
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 1,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: null,
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 2,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: null,
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
    {
      tripId: 3,
      tripDetail: {
        driver: {
          name: 'Duong Thanh Vuong',
          image: IMAGES.cuteDriver,
        },
        passenger: null,
        time: '7:00 AM',
        date: new Date(),
        from: 'Nhan van',
        to: 'CNTT',
      },
    },
  ]);

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
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginVertical: 20,
        }}>
        <Image source={IMAGES.cuteDriver}></Image>
        <TouchableOpacity
          style={{
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.primaryLighter1,
            borderRadius: 10,
            marginTop: 10,
          }}>
          <Text style={FONTS.h3Bold}>Tạo chuyến đi mới</Text>
        </TouchableOpacity>
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
            marginBottom: 10,
          }}>
          <Text style={{...FONTS.h2Bold}}>Đang chờ</Text>
          <TouchableOpacity>
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
              <View style={{marginHorizontal: 10}}>
                <Trip tripDetail={trip.tripDetail} pressTrip={() => {}}></Trip>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  function renderRecommendedTrip() {
    return (
      <View style={{marginTop: 20, height: 400}}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            marginBottom: 10,
          }}>
          <Text style={{...FONTS.h2Bold}}>Gợi ý cho bạn</Text>
          <TouchableOpacity>
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
          {recommendedTripList.map(trip => {
            return (
              <View style={{marginHorizontal: 10}} key={trip.tripId}>
                <Trip tripDetail={trip.tripDetail} pressTrip={() => {}}></Trip>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      nestedScrollEnabled={true}
      contentContainerStyle={{
        ...STYLES.scrollContainer,
      }}
      showsVerticalScrollIndicator={false}>
      {renderHeader()}
      {renderCreateTrip()}
      {renderWaitingTripList()}
      {renderRecommendedTrip()}
    </ScrollView>
  );
}

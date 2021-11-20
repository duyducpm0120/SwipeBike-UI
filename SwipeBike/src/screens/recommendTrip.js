import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {FONTS, STYLES, SIZES, RESPONSIVE} from '../constants';
import {BackgroundButton, Trip} from '../components';
import {waitingTripDetail} from '../components';

export default function RecommendTrip(props) {
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

  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text style={{...FONTS.title}}>Gợi ý cho bạn</Text>
      </View>
    );
  }

  function renderRecommendedTrips() {
    const Item = trip => {
      return (
        <View
          style={{
            marginHorizontal:
              (SIZES.width - RESPONSIVE.pixelSizeHorizontal(350) - 40) / 2,
          }}
          key={trip.tripId}>
          <Trip
            tripDetail={trip.tripDetail}
            pressTrip={() => {
              // openTripOptions(trip.tripDetail);
            }}></Trip>
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginVertical: RESPONSIVE.pixelSizeVertical(20),
        }}>
        <FlatList
          data={recommendedTripList}
          renderItem={({item}) => Item(item)}
          keyExtractor={item => item.tripId.toString()}
          pagingEnabled={true}
          showsVerticalScrollIndicator={false}></FlatList>
      </View>
    );
  }

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      {renderHeader()}
      {renderRecommendedTrips()}
    </View>
  );
}

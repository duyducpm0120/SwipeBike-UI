import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  // Animated,
} from 'react-native';
import {FONTS, STYLES, RESPONSIVE, ICONS, COLORS} from '../constants';
import {CandidateTrip} from '../components';

export default function RecommendTrip(props) {
  //dummy recommendedTripList
  const [recommendedTripList, setRecommendedTripList] = useState([
    {
      CandidateTripBike: true,
      CandidateTripCreator: [Object],
      CandidateTripDateTime: 'Thu Nov 25 2021 10:47:13 GMT+0700 (+07)',
      CandidateTripFromAddress:
        'Đại học Khoa học Xã hội và Nhân văn - ĐHQG TP.HCM',
      CandidateTripFromLat: 10.8722574,
      CandidateTripFromLong: 106.8020436,
      CandidateTripGenderDesired: null,
      CandidateTripId: 39,
      CandidateTripMessage: null,
      CandidateTripToAddress:
        'Phòng thí nghiệm An toàn Thông tin - UIT InSecLab',
      CandidateTripToLat: 10.8697981,
      CandidateTripToLong: 106.8028301,
      CreatorId: 7,
      TripStatusId: 1,
      desDistance: [Array],
      originDistance: [Array],
    },
    {
      CandidateTripBike: true,
      CandidateTripCreator: [Object],
      CandidateTripDateTime: 'Fri Nov 26 2021 14:23:41 GMT+0700 (+07)',
      CandidateTripFromAddress: 'AEON Mall Hà Đông',
      CandidateTripFromLat: 20.9897037,
      CandidateTripFromLong: 105.7517169,
      CandidateTripGenderDesired: null,
      CandidateTripId: 40,
      CandidateTripMessage: null,
      CandidateTripToAddress: 'Bắc Ninh',
      CandidateTripToLat: 21.1781766,
      CandidateTripToLong: 106.0710255,
      CreatorId: 7,
      TripStatusId: 1,
      desDistance: [Array],
      originDistance: [Array],
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
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image
            source={ICONS.leftArr1}
            style={{tintColor: COLORS.black, width: 30, height: 30}}
          />
        </TouchableOpacity>
        <Text style={{...FONTS.title}}>Gợi ý cho bạn</Text>
        <TouchableOpacity>
          <Image
            source={ICONS.refresh}
            style={{tintColor: COLORS.black, width: 30, height: 30}}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderRecommendedTrips() {
    const Item = trip => {
      return (
        <View
          style={{
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
            marginHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
          }}
          key={trip.CandidateTripId}>
          <CandidateTrip
            tripDetail={trip}
            pressTrip={() => {
              //setChosenTrip(trip);
              //openTripOptions(trip);
            }}
          />
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
          renderItem={({item, index}) => Item(item)}
          keyExtractor={({item, index}) => {
            return index;
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

  useEffect(() => {
    console.log('list recommendation', props.route.params.recommendedTripList);
    setRecommendedTripList(props.route.params.recommendedTripList);
  }, []);

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

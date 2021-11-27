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
  const [recommendedTripList, setRecommendedTripList] = useState(
    props.route.params.recommendedTripList,
  );

  function viewOnMap(trip) {
    props.navigation.navigate('GoogleMapView', {tripData: trip});
  }
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
              viewOnMap(trip);
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
    //console.log('list recommendation', props.route.params.recommendedTripList);
    //setRecommendedTripList(props.route.params.recommendedTripList);
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

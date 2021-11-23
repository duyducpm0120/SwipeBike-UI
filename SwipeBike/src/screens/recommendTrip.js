import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  // Animated,
} from 'react-native';
import {FONTS, STYLES, SIZES, RESPONSIVE, ICONS, COLORS} from '../constants';
import {BackgroundButton, Trip} from '../components';
import {waitingTripDetail} from '../components';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {getCandidateTripRecommendations, getUserTrips} from '../api';
import {loadTokenFromLocalStorage} from '../storage';

export default function RecommendTrip (props) {
  const [token, setToken] = useState ();
  //dummy recommendedTripList
  const [recommendedTripList, setRecommendedTripList] = useState ([
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
  // trip to recommend
  const [currentTrip, setCurrentTrip] = useState ();

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef (null);
  const fall = new Animated.Value (1);
  //Chosen clicking trip
  const [chosenTrip, setChosenTrip] = useState ({});
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
      }}
    >
      {/* //bar signal */}
      <View
        style={{
          width: '100%',
          height: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
        <View
          style={{
            width: 40,
            height: '100%',
            backgroundColor: COLORS.darkgray,
            borderRadius: 100,
          }}
        />
      </View>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          props.navigation.navigate ('GoogleMapView', {trip: chosenTrip});
        }}
      >
        <BackgroundButton text="Xem trên bản đồ" />
      </TouchableOpacity>
      <TouchableOpacity style={{marginVertical: 10}} onPress={() => {}}>
        <BackgroundButton text="Chấp nhận ghép đôi" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal (315),
          height: RESPONSIVE.pixelSizeVertical (60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo (1);
        }}
      >
        <Text style={FONTS.h2Bold}>Từ chối ghép đôi</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal (315),
          height: RESPONSIVE.pixelSizeVertical (60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo (1);
        }}
      >
        <Text style={FONTS.h2Bold}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );

  //Open options for trip
  function openTripOptions (tripDetail) {
    bottomSheetRef.current.snapTo (0);
  }
  //Trip options bottomSheet
  const tripOptionsBottomSheet = () => {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', RESPONSIVE.pixelSizeVertical (-50)]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
    );
  };

  function renderHeader () {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack ()}>
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

  function renderRecommendedTrips () {
    const Item = trip => {
      return (
        <View
          style={{
            marginVertical: RESPONSIVE.pixelSizeVertical (10),
            marginHorizontal: RESPONSIVE.pixelSizeHorizontal (5),
          }}
          key={trip.tripId}
        >
          <Trip
            tripDetail={trip.tripDetail}
            pressTrip={() => {
              setChosenTrip (trip);
              openTripOptions (trip.tripDetail);
            }}
          />
        </View>
      );
    };
    return (
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginVertical: RESPONSIVE.pixelSizeVertical (20),
          opacity: Animated.add (0.3, Animated.multiply (fall, 1.0)),
        }}
      >
        <FlatList
          data={recommendedTripList}
          renderItem={({item}) => Item (item)}
          keyExtractor={item => item.tripId.toString ()}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    );
  }

  useEffect (() => {
    loadTokenFromLocalStorage ().then (res => setToken (res.data));
  }, []);
  useEffect (() => {
    setCurrentTrip (props.route.params.trip);
  }, []);

  // fetch trips here
  useEffect (
    () => {
      if (token) {
        getCandidateTripRecommendations (9, token)
          .then (res => console.log (res))
          .catch (err => console.log (err));
      }
    },
    [token]
  );

  return (
    <View
      style={{
        ...STYLES.container,
      }}
    >
      {renderHeader ()}
      {renderRecommendedTrips ()}
      {tripOptionsBottomSheet ()}
    </View>
  );
}

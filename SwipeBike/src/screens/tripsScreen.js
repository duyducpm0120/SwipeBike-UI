import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  RESPONSIVE,
  ICONS,
  IMAGES,
  STYLES,
} from '../constants';
import {
  Trip,
  BackgroundButton,
  waitingTripDetail,
  pairingTripDetail,
} from '../components';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

export default function TripsScreen(props) {
  //Chosen clicking trip
  const [chosenTrip, setChosenTrip] = useState({});

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

  //dummy paring trip list
  const [pairingTripList, setPairingTripList] = useState([
    {
      tripId: 0,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 1,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 2,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 3,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 4,
      tripDetail: pairingTripDetail,
    },
  ]);

  //dummy history trip list
  const [historyTripList, setHistoryTripList] = useState([
    {
      tripId: 0,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 1,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 2,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 3,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 4,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 5,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 6,
      tripDetail: pairingTripDetail,
    },

    {
      tripId: 7,
      tripDetail: pairingTripDetail,
    },
    {
      tripId: 8,
      tripDetail: pairingTripDetail,
    },
  ]);

  //trip types
  const tripTypes = ['Đang chờ', 'Đang ghép đôi', 'Lịch sử'];
  //var for controlling trip type displaying
  const [tripTypeControl, setTripTypeControl] = useState('Đang chờ');
  //var for controlling displaying trip List
  const [displayingTripList, setDisplayingTripList] = useState(waitingTripList);

  //Vars for altering bottomsheet
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
          props.navigation.navigate('GoogleMapView', {trip: chosenTrip});
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
        <Text style={FONTS.h2Bold}>Từ chối ghép đôi</Text>
      </TouchableOpacity>
    </View>
  );

  //Open options for trip
  function openTripOptions(tripDetail) {
    bottomSheetRef.current.snapTo(0);
  }

  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text style={{...FONTS.title}}>Chuyến đi</Text>
      </View>
    );
  }

  function renderTripTypes() {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        {tripTypes.map(tripType => {
          return (
            <TouchableOpacity
              style={{
                paddingHorizontal: 20,
                paddingVertical: 5,
                margin: 10,
                borderRadius: 50,
                backgroundColor:
                  tripType == tripTypeControl
                    ? COLORS.primaryLighter1
                    : 'transparent',
              }}
              onPress={() => {
                setTripTypeControl(tripType);
                if (tripType == 'Đang chờ')
                  setDisplayingTripList(waitingTripList);
                else if (tripType == 'Đang ghép đôi')
                  setDisplayingTripList(pairingTripList);
                else setDisplayingTripList(historyTripList);
              }}>
              <Text
                style={{
                  ...FONTS.h2,
                  color:
                    tripType == tripTypeControl
                      ? COLORS.primaryDarker1
                      : COLORS.black,
                }}>
                {tripType}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }

  function renderDisplayingTripList() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        {displayingTripList.map(trip => {
          return (
            <View style={{marginVertical: 10}} key={trip.tripId}>
              <Trip
                tripDetail={trip.tripDetail}
                pressTrip={() => {
                  setChosenTrip(trip);
                  openTripOptions(trip.tripDetail);
                }}></Trip>
            </View>
          );
        })}
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
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderTripTypes()}
        {renderDisplayingTripList()}
      </Animated.ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%', RESPONSIVE.pixelSizeVertical(-50)]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
    </View>
  );
}

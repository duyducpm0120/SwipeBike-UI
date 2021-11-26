import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
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
  CandidateTrip,
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
    // {
    //   tripId: 0,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 1,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 2,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 3,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 4,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 5,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 6,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 7,
    //   tripDetail: pairingTripDetail,
    // },
    // {
    //   tripId: 8,
    //   tripDetail: pairingTripDetail,
    // },
  ]);

  //trip types
  const tripTypes = [
    {name: 'Đang chờ', imgUrl: ICONS.waiting},
    {name: 'Đang ghép đôi', imgUrl: ICONS.friend},
    {name: 'Lịch sử', imgUrl: ICONS.history},
  ];
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
          }}
        />
      </View>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          props.navigation.navigate('GoogleMapView', {trip: chosenTrip});
        }}>
        <BackgroundButton text="Xem trên bản đồ" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          //openCamera();
        }}>
        <BackgroundButton text="Chấp nhận ghép đôi" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.primary,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal(315),
          height: RESPONSIVE.pixelSizeVertical(60),
        }}
        onPress={() => {
          props.navigation.navigate('RecommendTrip', {trip: chosenTrip});
        }}>
        <Text style={FONTS.h2Bold}>Xem gợi ý</Text>
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

  function renderTrip(trip) {
    if (trip.tripDetail.TripType == 1)
      return (
        <View style={{marginVertical: 10}} key={trip.tripId}>
          <CandidateTrip
            tripDetail={trip.tripDetail}
            pressTrip={() => {
              setChosenTrip(trip);
              openTripOptions(trip.tripDetail);
            }}
          />
        </View>
      );
    else if (trip.tripDetail.TripType == 3)
      return (
        <View style={{marginVertical: 10}} key={trip.tripId}>
          <Trip
            tripDetail={trip.tripDetail}
            pressTrip={() => {
              setChosenTrip(trip);
              openTripOptions(trip.tripDetail);
            }}
          />
        </View>
      );
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
      <View
        style={{
          height: RESPONSIVE.pixelSizeVertical(50),

          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
                  paddingHorizontal: RESPONSIVE.widthPixel(20),
                  paddingVertical: 5,
                  margin: 5,
                  borderRadius: 50,
                  backgroundColor:
                    tripType.name == tripTypeControl
                      ? COLORS.primaryLighter1
                      : 'transparent',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setTripTypeControl(tripType.name);
                  if (tripType.name == 'Đang chờ')
                    setDisplayingTripList(waitingTripList);
                  else if (tripType.name == 'Đang ghép đôi')
                    setDisplayingTripList(pairingTripList);
                  else setDisplayingTripList(historyTripList);
                }}>
                <Image
                  source={tripType.imgUrl}
                  style={{
                    width: RESPONSIVE.widthPixel(24),
                    height: RESPONSIVE.heightPixel(24),
                    marginRight: 10,
                    tintColor: COLORS.black,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h2Bold,
                    color:
                      tripType == tripTypeControl
                        ? COLORS.primaryDarker1
                        : COLORS.black,
                  }}>
                  {tripType.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={displayingTripList}
          renderItem={({item, index}) => renderTrip(item)}
          keyExtractor={({item, index}) => {
            return index;
          }}></FlatList>
      </View>
    );
  }

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      <Animated.View
        style={{
          flex: 1,
          justifyContent: 'flex-start',
          alignItems: 'center',
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}>
        {renderHeader()}
        {renderTripTypes()}
        {renderDisplayingTripList()}
      </Animated.View>
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

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
import {getUserTrips, getCandidateTripRecommendations} from '../api';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';

export default function TripsScreen(props) {
  const dispatch = useDispatch();
  //Local token
  const token = useSelector(state => state.loginToken.token);
  //Load user info from redux
  const userProfile = useSelector(state => state.userProfile.userProfile);
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

  function callRecommendTrips(trip) {
    dispatch(updateIsLoading(true));
    getCandidateTripRecommendations(trip.CandidateTripId, token).then(res => {
      console.log(res.data);
      props.navigation.navigate('RecommendTrip', {
        //console.log("list to be params",res.data.recommendation );
        recommendedTripList: res.data.recommendation,
      });
      dispatch(updateIsLoading(false));
    });
    //console.log('trip', trip);
  }

  function renderTrip(trip) {
    if (trip.TripType == 1)
      return (
        <View
          style={{
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
            paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
          }}
          key={trip.CandidateTripId}>
          <CandidateTrip
            tripDetail={trip}
            loadRecommendation={() => {
              callRecommendTrips(trip);
              //console.log(trip);
            }}
          />
        </View>
      );
    else if (trip.TripType == 3)
      return (
        <View
          style={{
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
            paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
          }}
          key={trip.CandidateTripId}>
          <Trip
            tripDetail={trip}
            pressTrip={trip => {
              callRecommendTrips(trip);
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
                  marginHorizontal: 5,
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
                    tintColor:
                      tripType.name == tripTypeControl
                        ? COLORS.primaryDarker1
                        : COLORS.darkgray,
                  }}
                />
                <Text
                  style={{
                    ...FONTS.h2Bold,
                    color:
                      tripType.name == tripTypeControl
                        ? COLORS.primaryDarker1
                        : COLORS.darkgray,
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
          marginVertical: RESPONSIVE.pixelSizeVertical(10),
        }}>
        <FlatList
          //style={{marginVertical: 20}}
          showsVerticalScrollIndicator={false}
          data={displayingTripList}
          renderItem={({item, index}) => renderTrip(item)}
          keyExtractor={({item, index}) => {
            return index;
          }}></FlatList>
      </View>
    );
  }

  useEffect(() => {
    dispatch(updateIsLoading(true));
    getUserTrips(userProfile.UserId, token)
      .then(res => {
        console.log('get user trips', res.data);
        var trips = res.data.trips.map(trip => {
          trip.TripType = 1;
          return trip;
        });
        setWaitingTripList(trips);
        dispatch(updateIsLoading(false));
        //setDisplayingTripList(res.data.trips);
      })
      .catch(err => console.log('err', err));
  }, []);

  return (
    <View
      style={{
        ...STYLES.container,
        paddingBottom: RESPONSIVE.pixelSizeVertical(80),
      }}>
      {renderHeader()}
      {renderTripTypes()}
      {renderDisplayingTripList()}
    </View>
  );
}

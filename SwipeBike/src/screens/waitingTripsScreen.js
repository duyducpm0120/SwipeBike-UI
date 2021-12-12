import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, STYLES} from '../constants';
import {CandidateTrip, TripRequest, pairingTripDetail} from '../components';

import {
  getUserTrips,
  getCandidateTripRecommendations,
  getUserPendingReceivedRequests,
  getUserPendingSentRequests,
  rejectTripRequest,
  cancelTripRequest,
  acceptTripRequest,
} from '../api';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {updateSelectedTrip} from '../redux/slices/selectedTripSlice';

const WAITING_TRIP_TYPE = 1;
const RECEIVED_REQUEST_TRIP_TYPE = 2;
const SENT_REQUEST_TRIP_TYPE = 2;

export default function WaitingTripsScreen(props) {
  const dispatch = useDispatch();
  //Local token
  const token = useSelector(state => state.loginToken.token);
  //Load user info from redux
  const userProfile = useSelector(state => state.userProfile.userProfile);
  //waitingTripList
  const [waitingTripList, setWaitingTripList] = useState([]);

  const [receivedTripList, setReceivedTripList] = useState([]);
  const [sentTripList, setSentTripList] = useState([]);

  //trip types
  const tripTypes = [
    {name: 'Chuyến đi của bạn', imgUrl: ICONS.send},
    {name: 'Yêu cầu đã nhận', imgUrl: ICONS.friend},
    {name: 'Yêu cầu đã gửi', imgUrl: ICONS.friend},
  ];
  //var for controlling trip type displaying
  const [tripTypeControl, setTripTypeControl] = useState('Chuyến đi của bạn');
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

  function acceptRequest(trip) {
    dispatch(updateIsLoading(true));
    acceptTripRequest(token, trip.RequestId)
      .then(res => {
        console.log('accept successfully');
        dispatch(updateIsLoading(false));
      })
      .catch(err => {
        console.log('error', JSON.stringify(err));
        console.log('my token to accept trip', token);

        dispatch(updateIsLoading(false));
      });
  }

  function cancelRequest(trip) {
    dispatch(updateIsLoading(true));
    cancelTripRequest(token, trip.RequestId)
      .then(res => {
        console.log('cancel successfully');
        dispatch(updateIsLoading(false));
      })
      .catch(err => {
        console.log('error', JSON.stringify(err));
        console.log('my token to accept trip', token);

        dispatch(updateIsLoading(false));
      });
  }
  function renderTrip(trip) {
    if (trip.TripType == WAITING_TRIP_TYPE)
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
              //update Candidate Selected trip
              dispatch(updateSelectedTrip(trip));
              //call recommendation
              callRecommendTrips(trip);
              //console.log(trip);
            }}
            pressTrip={() => {
              viewOnMap(trip);
            }}
            viewProfile={()=>{props.navigation.navigate("Profile",{CreatorId: trip.CreatorId})}}
          />
        </View>
      );
    else if (trip.TripType == RECEIVED_REQUEST_TRIP_TYPE)
      return (
        <View
          style={{
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
            paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
          }}
          key={trip.RequestId}>
          <TripRequest
            tripDetail={trip}
            acceptRequest={() => {
              acceptRequest(trip);
            }}
            cancelRequest={() => {
              cancelRequest(trip);
            }}
            viewProfile={(CreatorId)=>{props.navigation.navigate("Profile",{CreatorId: CreatorId})}}
          />
        </View>
      );
  }

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
        <Text style={{...FONTS.title}}>Đang chờ</Text>
        <TouchableOpacity>
          <Image
            source={ICONS.refresh}
            style={{tintColor: COLORS.black, width: 30, height: 30}}
          />
        </TouchableOpacity>
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
                  if (tripType.name == 'Chuyến đi của bạn')
                    setDisplayingTripList(waitingTripList);
                  else if (tripType.name == 'Yêu cầu đã nhận')
                    setDisplayingTripList(receivedTripList);
                  else setDisplayingTripList(sentTripList);
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
    Promise.all([
      getUserTrips(userProfile.UserId, token)
        .then(res => {
          console.log('get user trips', res.data);
          var trips = res.data.trips.map(trip => {
            trip.TripType = WAITING_TRIP_TYPE;
            return trip;
          });
          setWaitingTripList(trips);
          setDisplayingTripList(trips);
        })
        .catch(err => console.log('err', err)),
      getUserPendingReceivedRequests(token)
        .then(res2 => {
          var trips2 = res2.data.requests.map(trip => {
            trip.TripType = RECEIVED_REQUEST_TRIP_TYPE;
            return trip;
          });
          setReceivedTripList(trips2);
          console.log('Received Request:', res2.data.requests);
        })
        .catch(err => console.log('Received request err', err)),
      getUserPendingSentRequests(token)
        .then(res3 => {
          var trips3 = res3.data.requests.map(trip => {
            trip.TripType = SENT_REQUEST_TRIP_TYPE;
            return trip;
          });
          setSentTripList(trips3);
          // console.log('Sent Request:', res3.data.requests);
        })
        .catch(err => console.log('Sent request err', err)),
    ]).then(res3 => {
      dispatch(updateIsLoading(false));
    });
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

import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, STYLES, SIZES} from '../constants';
import {CandidateTrip, TripRequest, Trip} from '../components';

import {
  getUserCandidateTrips,
  getUserPendingReceivedRequests,
  getUserPendingSentRequests,
  rejectTripRequest,
  cancelTripRequest,
  acceptTripRequest,
  getTrips,
  cancelTrip
} from '../api';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {updateSelectedTrip} from '../redux/slices/selectedTripSlice';
import {TRIPTYPE} from '../constants';
import {Snackbar} from 'react-native-paper';

export default function PairingTripsScreen(props) {
  const dispatch = useDispatch();
  //Local token
  const token = useSelector(state => state.loginToken.token);
  //Load user info from redux
  const userProfile = useSelector(state => state.userProfile.userProfile);

  const [trips,setTrips] = useState([]);

  //trip types
  const tripTypes = [
    {name: 'Hiện tại', imgUrl: ICONS.send},
    {name: 'Lịch sử', imgUrl: ICONS.friend},
  ];
  //var for controlling trip type displaying
  const [tripTypeControl, setTripTypeControl] = useState();
  //var for controlling displaying trip List
  const [displayingTripList, setDisplayingTripList] = useState(trips);

  //Snackbar field
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const [snackbarTitle, setSnackBarTitle] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    loadData();
  }, []);

  function renderSnackBar() {
    return (
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
            onDismissSnackBar();
          },
        }}>
        {snackbarTitle}
      </Snackbar>
    );
  }

  function cancelPairingTrip(trip) {
    cancelTrip(trip.TripId, token)
      .then(res => {
        console.log('success cancel Trip');
      })
      .catch(err => console.log('cancel trip err',err));
  }

  function renderTrip(trip) {
    if (trip.TripType == TRIPTYPE.WAITING_TRIP_TYPE)
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
              //call recommendation
              callRecommendTrips(trip);
              //console.log(trip);
            }}
            pressTrip={() => {
              viewOnMap(trip);
            }}
            viewProfile={(id) => {
              props.navigation.navigate('Profile', {Id: id});
            }}
            deleteTrip={() => {}}
          />
        </View>
      );
      else if (trip.TripType == TRIPTYPE.PAIRING_TRIP_TYPE)
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
              viewOnMap(trip);
            }}
            viewProfile={id => {
              props.navigation.navigate('Profile', {Id: id});
            }}
            cancelTrip={()=>{
              cancelPairingTrip(trip);
            }}
          />
        </View>
      );
  }
  

  const loadData = () => {
    dispatch(updateIsLoading(true));
    setTripTypeControl('Hiện tại');
    Promise.all([
      getTrips(token)
        .then(res => {
          let trips = res.data.trips.map(trip => {
            trip.TripType = TRIPTYPE.PAIRING_TRIP_TYPE;
            return trip;
          });
          setTrips(trips);
          setDisplayingTripList(trips);
        })
        .catch(err => console.log('err', err)),
    ]).then(() => {
      dispatch(updateIsLoading(false));
    });
  };
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
        <Text style={{...FONTS.title}}>Ghép đôi</Text>
        <TouchableOpacity
          onPress={() => {
            loadData();
          }}>
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
                  if (tripType.name == 'Hiện tại')
                    setDisplayingTripList(trips);
                  else if (tripType.name == 'Lịch sử')
                    setDisplayingTripList(trips);
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
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }></FlatList>
      </View>
    );
  }

  useEffect(() => {
    loadData();
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
      {renderSnackBar()}
    </View>
  );
}

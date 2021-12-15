import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, PermissionsAndroid, Image} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {COLORS, RESPONSIVE, ICONS, TRIPTYPE} from '../constants';
import {CandidateTrip, TripRequest} from '../components';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useDispatch,useSelector} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {
  getCandidateTripRecommendations,
  cancelTripRequest,
  acceptTripRequest,
  getRoute
} from '../api';
import {updateSelectedTrip} from '../redux/slices/selectedTripSlice';

export default function GoogleMapView(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginToken.token);
  //Trip to display
  const [tripData, setTripData] = useState(props.route.params.tripData);

  const [address, setAddress] = useState(() => {
    let data = props.route.params.tripData;
    if (data.TripType == TRIPTYPE.WAITING_TRIP_TYPE)
      return {
        FromLat: data.CandidateTripFromLat,
        FromLong: data.CandidateTripFromLong,
        ToLat: data.CandidateTripToLat,
        ToLong: data.CandidateTripToLong,
      };
    else if (
      data.TripType == TRIPTYPE.RECEIVED_REQUEST_TRIP_TYPE ||
      TRIPTYPE.SENT_REQUEST_TRIP_TYPE
    )
      return {
        FromLat: data.DriverFromLat,
        FromLong: data.DriverFromLong,
        ToLat: data.PassengerToLat,
        ToLong: data.PassengerToLong,
      };
  });

  //Polyline coordinates
  const [coords, setCoords] = useState([
    // {latitude: testLocation1[0], longitude: testLocation1[1]},
    // {latitude: testLocation2[0], longitude: testLocation2[1]},
  ]);
  //Device permission for location
  const [locationPermission, setLocationPermission] = useState();
  //User current location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [0, 0],
  });

  //Vars for altering bottomsheet
  const bottomSheetRef = React.createRef(null);
  const fall = new Animated.Value(1);

  
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
  const renderTrip = () =>{
    if (tripData.TripType == TRIPTYPE.WAITING_TRIP_TYPE)
    return (
      <CandidateTrip
        tripDetail={tripData}
        loadRecommendation={() => {
          //update Candidate Selected trip
          dispatch(updateSelectedTrip(tripData));
          //call recommendation
          callRecommendTrips(tripData);
          //console.log(trip);
        }}
        pressTrip={() => {
          viewOnMap(tripData);
        }}
        viewProfile={() => {
          props.navigation.navigate('Profile', {
            CreatorId: trip.CreatorId,
          });
        }}
      />
    );
  else if (
    tripData.TripType == TRIPTYPE.RECEIVED_REQUEST_TRIP_TYPE ||
    TRIPTYPE.SENT_REQUEST_TRIP_TYPE
  )
    return (
      <TripRequest
        tripDetail={tripData}
        acceptRequest={() => {
          acceptRequest(tripData);
        }}
        cancelRequest={() => {
          cancelRequest(tripData);
        }}
        viewProfile={CreatorId => {
          props.navigation.navigate('Profile', {CreatorId: CreatorId});
        }}
        pressTrip={() => {
          viewOnMap(tripData);
        }}
      />
    );
  }
  //Render inside bottomsheet
  const renderInner = () => (
    <View
      style={{
        backgroundColor: COLORS.backGroundColor,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 10,
        paddingTop: 20,
        borderRadius: 30,
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

      {/* Trip Component */}
     {renderTrip()}
    </View>
  );

  function requestLocationPermission() {
    if (locationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      () => {
        console.log(locationPermission);
        return;
      };
    }
    try {
      const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'SwipeBike App',
          message: 'Permit SwipeBike access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log('You can use the location');
        //alert('You can use the location');
        setLocationPermission(granted);
      } else {
        //console.log('location permission denied');
        //alert('Location permission denied');
      }
    } catch (err) {
      //console.warn(err);
    }
  }

  function getCurrentLocation() {
    if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED)
      requestLocationPermission();
    Geolocation.getCurrentPosition(
      position => {
        if (
          position.coords.latitude === currentLocation.latitude &&
          position.coords.longitude === currentLocation.longitude
        )
          return;
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          coordinates: currentLocation.coordinates.concat({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        });
      },
      error => {
        Alert.alert(error.message.toString());
      },
      {
        showLocationDialog: true,
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 0,
      },
    );
    //console.log(currentLocation);
  }

  function getDataRoute() {
    // if (loaded != true) return;
    if (!tripData) return;
    const fromCoordinates = [address.FromLat, address.FromLong];
    const toCoordinates = [address.ToLat, address.ToLong];
    dispatch(updateIsLoading(true));
    getRoute(fromCoordinates, toCoordinates).then(route => {
      setCoords(route);
      dispatch(updateIsLoading(false));
    });
    //
  }

  useEffect(() => {
    getCurrentLocation();
  }, [currentLocation]);

  useEffect(() => {
    getDataRoute();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsTraffic={true}>
        {/* Marker at the start of PolyLine */}
        <Marker
          coordinate={{
            latitude: coords.length > 1 ? coords[0].latitude : 0,
            longitude: coords.length > 1 ? coords[0].longitude : 0,
          }}
          anchor={{x: 0.5, y: 0.5}}>
          <View>
            <Image
              source={ICONS.dot2}
              style={{
                //tintColor: COLORS.darkgray,
                width: 25,
                height: 25,
              }}></Image>
          </View>
        </Marker>
        {/* Marker at the end of PolyLine */}
        <Marker
          coordinate={{
            latitude:
              coords.length > 1 ? coords[coords.length - 1].latitude : 0,
            longitude:
              coords.length > 1 ? coords[coords.length - 1].longitude : 0,
          }}
          anchor={{x: 0.5, y: 0.5}}>
          <View>
            <Image
              source={ICONS.dot2}
              style={{
                //tintColor: COLORS.primary,
                width: 25,
                height: 25,
              }}></Image>
          </View>
        </Marker>
        {/* Route Marker */}
        <Marker
          coordinate={{
            latitude: address.FromLat,
            longitude: address.FromLong,
          }}></Marker>
        <Marker
          coordinate={{
            latitude: address.ToLat,
            longitude: address.ToLong,
          }}></Marker>

        <MapView.Polyline
          coordinates={[...coords]}
          strokeWidth={10}
          strokeColor={COLORS.primary}
        />
        <MapView.Polyline
          coordinates={[...coords]}
          strokeWidth={5}
          strokeColor={COLORS.lightGray0}
        />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['70%', RESPONSIVE.pixelSizeVertical(50)]}
        renderContent={renderInner}
        s
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  map: {
    // ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
});

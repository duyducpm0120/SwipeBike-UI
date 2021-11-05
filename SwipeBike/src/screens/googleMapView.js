import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  PermissionsAndroid,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {MAPS_API_KEY} from '../../key';
import {
  Trip,
  BackgroundButton,
  waitingTripDetail,
  pairingTripDetail,
} from '../components';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

export default function GoogleMapView(props) {
  //Trip to display
  const [tripData, setTripData] = useState({});
  //check trip is loaded ?
  const [loaded, setLoaded] = useState(false);

  const [coords, setCoords] = useState([
    // {latitude: testLocation1[0], longitude: testLocation1[1]},
    // {latitude: testLocation2[0], longitude: testLocation2[1]},
  ]);

  const [locationPermission, setLocationPermission] = useState();
  //User current location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 14.1693,
    longitude: 109.0495,
    coordinates: [14.1693, 109.0495],
  });

  //Vars for altering bottomsheet
  const bottomSheetRef = React.createRef(null);
  const fall = new Animated.Value(1);

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
      {loaded ? (
        <Trip tripDetail={tripData.tripDetail} pressTrip={() => {}}></Trip>
      ) : (
        <View></View>
      )}
    </View>
  );
  //Get trip param data
  function getTripData() {
    setTripData(props.route.params.trip);
    console.log('Success load trip', tripData);
  }

  function decode(t, e) {
    for (
      var n,
        o,
        u = 0,
        l = 0,
        r = 0,
        d = [],
        h = 0,
        i = 0,
        a = null,
        c = Math.pow(10, e || 5);
      u < t.length;

    ) {
      (a = null), (h = 0), (i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (n = 1 & i ? ~(i >> 1) : i >> 1), (h = i = 0);
      do (a = t.charCodeAt(u++) - 63), (i |= (31 & a) << h), (h += 5);
      while (a >= 32);
      (o = 1 & i ? ~(i >> 1) : i >> 1),
        (l += n),
        (r += o),
        d.push([l / c, r / c]);
    }
    return (d = d.map(function (t) {
      return {latitude: t[0], longitude: t[1]};
    }));
    // transforms something like this geocFltrhVvDsEtA}ApSsVrDaEvAcBSYOS_@... to an array of coordinates
  }

  async function getRoute() {
    if (!loaded) return;
    console.log('getroute');
    const mode = 'driving'; // 'walking';
    const origin = tripData.tripDetail.from.coordinate;
    const destination = tripData.tripDetail.to.coordinate;
    const APIKEY = MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

    await fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.routes.length) {
          setCoords(decode(responseJson.routes[0].overview_polyline.points));
          console.log('get route successfully');
        }
      })
      .catch(e => {
        console.log(e);
      });
    //console.log('End getroute');
  }

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

  async function getCurrentLocation() {
    if (!loaded) return;
    if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED)
      await requestLocationPermission();
    await Geolocation.watchPosition(
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
        //Alert.alert(error.message.toString());
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

  useEffect(() => {
    getTripData();
    setLoaded(true);
    getCurrentLocation();
    getRoute();
  }, [tripData, loaded]);
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
        {/* Trip Marker */}
        <Marker
          coordinate={{
            latitude: loaded ? tripData.tripDetail.from.coordinate[0] : 0,
            longitude: loaded ? tripData.tripDetail.from.coordinate[1] : 0,
          }}>
          <MapView.Callout tooltip={true}>
            <View
              style={{backgroundColor: COLORS.white, width: 100, height: 100}}>
              <Text style={{...FONTS.h1Bold}}>
                {/* {tripData.tripDetail ? tripData.tripDetail.from.name : ''} */}
                AAAAAA
              </Text>
            </View>
          </MapView.Callout>
        </Marker>
        <Marker
          coordinate={{
            latitude: loaded ? tripData.tripDetail.to.coordinate[0] : 0,
            longitude: loaded ? tripData.tripDetail.to.coordinate[1] : 0,
          }}></Marker>
        <MapView.Polyline
          coordinates={[
            {
              latitude: loaded ? tripData.tripDetail.from.coordinate[0] : 0,
              longitude: tripData.tripDetail
                ? tripData.tripDetail.from.coordinate[1]
                : 0,
            }, // optional
            ...coords,
            {
              latitude: loaded ? tripData.tripDetail.to.coordinate[0] : 0,
              longitude: tripData.tripDetail
                ? tripData.tripDetail.to.coordinate[1]
                : 0,
            }, // optional
          ]}
          strokeWidth={8}
          strokeColor={COLORS.primary}
        />
      </MapView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['55%', PIXEL.pixelSizeVertical(50)]}
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

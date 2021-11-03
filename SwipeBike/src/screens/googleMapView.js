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
import {RoundedImage} from '../components';
import {MAPS_API_KEY} from '../../key';

export default function GoogleMapView(props) {
  //Trip to display
  const [tripData, setTripData] = useState({});

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

  //Get trip param data
  function getTripData() {
    setTripData(props.route.params.trip);
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

  //draw route between origin and destination
  function drawRoute() {
    return (
      //Route between origin and destination
      <MapView.Polyline
        coordinates={[
          //{latitude: testLocation1[0], longitude: testLocation1[1]}, // optional
          ...coords,
          //{latitude: testLocation2[0], longitude: testLocation2[1]}, // optional
        ]}
        strokeWidth={8}
        strokeColor={COLORS.primary}
      />
    );
  }

  useEffect(() => {
    getCurrentLocation();
    getTripData();
  }, [tripData]);
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
        }}>
        <Marker
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}>
          <Image source={IMAGES.cuteDriver} style={{width: 40, height: 40}} />
        </Marker>
        <MapView.Polyline
          coordinates={[
            //{latitude: testLocation1[0], longitude: testLocation1[1]}, // optional
            ...coords,
            //{latitude: testLocation2[0], longitude: testLocation2[1]}, // optional
          ]}
          strokeWidth={8}
          strokeColor={COLORS.primary}
        />
      </MapView>
      <TouchableOpacity
        style={{
          position: 'absolute',
          width: 70,
          height: 40,
          backgroundColor: COLORS.primary,
          marginTop: 10,
        }}
        onPress={() => {
          getRoute();
          console.log(tripData);
        }}>
        <Text>AAAA</Text>
      </TouchableOpacity>
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
    ...StyleSheet.absoluteFillObject,
  },
});

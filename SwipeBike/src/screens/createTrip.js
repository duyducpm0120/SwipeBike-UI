import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  PermissionsAndroid,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  PIXEL,
  ICONS,
  IMAGES,
  STYLES,
  getRoute,
} from '../constants';
import {
  Trip,
  BackgroundButton,
  getVietnameseDate,
  getVietnameseTime,
} from '../components';
import DatePicker from 'react-native-date-picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {MAPS_API_KEY} from '../../key';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
//For places search
navigator.geolocation = require('react-native-geolocation-service');

export default function CreateTrip() {
  //Search Text
  const fromSearchTextRef = useRef();
  const toSearchTextRef = useRef();
  //Location
  const [fromLocation, setFromLocation] = useState();
  const [toLocation, setToLocation] = useState();

  const [isDriver, setIsDriver] = useState(true);
  const [gender, setGender] = useState('male');
  //dateTime
  const [dateTime, setDateTime] = useState(new Date());
  //From location
  const [from, setFrom] = useState({});
  //To location
  const [to, setTo] = useState({});

  //Device permission for location
  const [locationPermission, setLocationPermission] = useState();
  //Current Location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [0, 0],
  });

  //Polyline coordinates
  const [coords, setCoords] = useState([
    // {latitude: testLocation1[0], longitude: testLocation1[1]},
    // {latitude: testLocation2[0], longitude: testLocation2[1]},
  ]);

  //TimePicker Field
  const [openTimePicker, setOpenTimePicker] = useState(false);
  //DatePicker Field
  const [openDatePicker, setOpenDatePicker] = useState(false);

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
    console.log('get current location!');
    if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED)
      await requestLocationPermission();
    await Geolocation.getCurrentPosition(
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
        console.log('get current location!');
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

  function getDataRoute() {
    if (!fromLocation || !toLocation) return;
    const route = getRoute(fromLocation, toLocation).then(route =>
      setCoords(route),
    );
    //
  }
  const chooseDriver = (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: SIZES.width - 40,
      }}>
      <Text style={{...FONTS.h2Bold}}>Bạn có xe không ?</Text>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 30,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            backgroundColor: isDriver
              ? COLORS.primaryLighter1
              : COLORS.lightGray0,
            marginBottom: 20,
          }}
          onPress={() => setIsDriver(true)}>
          <Text
            style={{
              ...FONTS.h2,
              color: isDriver ? COLORS.primaryDarker1 : COLORS.black,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            Có xe
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            backgroundColor: !isDriver
              ? COLORS.primaryLighter1
              : COLORS.lightGray0,
          }}
          onPress={() => setIsDriver(false)}>
          <Text
            style={{
              ...FONTS.h2,
              color: !isDriver ? COLORS.primaryDarker1 : COLORS.black,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            Không có xe
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const chooseGender = (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: SIZES.width - 40,
      }}>
      <Text style={{...FONTS.h2Bold}}>Bạn muốn đi cùng ?</Text>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 30,
        }}>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            backgroundColor:
              gender === 'male' ? COLORS.primaryLighter1 : COLORS.lightGray0,
            marginBottom: 20,
          }}
          onPress={() => setGender('male')}>
          <Text
            style={{
              ...FONTS.h2,
              color: gender === 'male' ? COLORS.primaryDarker1 : COLORS.black,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            Nam
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            backgroundColor:
              gender === 'female' ? COLORS.primaryLighter1 : COLORS.lightGray0,
            marginBottom: 20,
          }}
          onPress={() => setGender('female')}>
          <Text
            style={{
              ...FONTS.h2,
              color: gender === 'female' ? COLORS.primaryDarker1 : COLORS.black,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            Nữ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            backgroundColor:
              gender === 'none' ? COLORS.primaryLighter1 : COLORS.lightGray0,
          }}
          onPress={() => setGender('none')}>
          <Text
            style={{
              ...FONTS.h2,
              color: gender === 'none' ? COLORS.primaryDarker1 : COLORS.black,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            Không quan trọng
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const chooseTime = (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: SIZES.width - 40,
      }}>
      <Text style={{...FONTS.h2Bold}}>Chọn thời gian</Text>
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          marginTop: 30,
          width: '100%',
        }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 50,
            marginBottom: 20,
            width: '100%',
          }}
          onPress={() => setOpenTimePicker(true)}>
          <Image
            source={ICONS.time}
            style={{width: 30, height: 30, tintColor: COLORS.black}}></Image>
          <Text
            style={{
              ...FONTS.h2,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            {getVietnameseTime(dateTime)}
          </Text>
          <DatePicker
            modal
            title="Thời gian"
            confirmText="Chọn"
            cancelText="Hủy"
            locale="vi"
            mode={'time'}
            open={openTimePicker}
            date={dateTime}
            onConfirm={date => {
              setOpenTimePicker(false);
              setDateTime(date);
              console.log(date.toString());
            }}
            onCancel={() => {
              setOpenTimePicker(false);
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 50,
            marginBottom: 20,
            width: '100%',
          }}
          onPress={() => setOpenDatePicker(true)}>
          <Image
            source={ICONS.calendar}
            style={{width: 30, height: 30, tintColor: COLORS.black}}></Image>
          <Text
            style={{
              ...FONTS.h2,
              marginHorizontal: 20,
              marginVertical: 5,
            }}>
            {getVietnameseDate(dateTime)}
          </Text>
          <DatePicker
            modal
            title="Ngày"
            confirmText="Chọn"
            cancelText="Hủy"
            locale="vi"
            mode={'date'}
            open={openDatePicker}
            date={dateTime}
            onConfirm={date => {
              setOpenDatePicker(false);
              setDateTime(date);
              console.log(date.toString());
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const chooseLocation = (
    <View
      style={{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: SIZES.width - 40,
      }}>
      <Text style={{...FONTS.h2Bold, marginBottom: 20}}>Chọn vị trí</Text>
      <GooglePlacesAutocomplete
        ref={fromSearchTextRef}
        fetchDetails={true}
        placeholder="Tìm điểm xuất phát"
        onPress={(data, details = null) => {
          fromSearchTextRef.current.setAddressText(data.description);
          let location = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            coordinates: [
              details.geometry.location.lat,
              details.geometry.location.lng,
            ],
          };
          setFromLocation(location);
          getDataRoute();
          //console.log(fromSearchTextRef.current.getAddressText());
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'vi',
          //components: 'country:vi',
          components: 'country:vn',
          type: 'establishment',
        }}
        //currentLocation={true}
        //currentLocationLabel="Vị trí hiện tại"
        textInputProps={{onBlur: () => {}}}
        styles={{
          textInputContainer: {
            width: '100%',
            zIndex: 4,
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
            zIndex: 4,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
          listView: {position: 'absolute'},
          container: {
            zIndex: 3,
          },
        }}
      />
      <GooglePlacesAutocomplete
        ref={toSearchTextRef}
        fetchDetails={true}
        placeholder="Tìm điểm đến"
        onPress={(data, details = null) => {
          toSearchTextRef.current.setAddressText(data.description);
          const location = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            coordinates: [
              details.geometry.location.lat,
              details.geometry.location.lng,
            ],
          };
          setToLocation(location);
          getDataRoute();
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'vi',
          //components: 'country:vi',
          components: 'country:vn',
          type: 'establishment',
        }}
        //currentLocation={true}
        //currentLocationLabel="Vị trí hiện tại"
        textInputProps={{onBlur: () => {}}}
        styles={{
          textInputContainer: {
            width: '100%',
            zIndex: 2,
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
            zIndex: 2,
          },
          predefinedPlacesDescription: {
            color: COLORS.darkgray,
          },
          listView: {position: 'absolute'},
          container: {
            zIndex: 1,
          },
        }}
      />

      {/* Render Map */}
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{width: '100%', height: '70%'}}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsTraffic={true}>
        {/* Route marker */}
        <Marker
          coordinate={{
            latitude: fromLocation ? fromLocation.latitude : 0,
            longitude: fromLocation ? fromLocation.longitude : 0,
          }}></Marker>
        <Marker
          coordinate={{
            latitude: toLocation ? toLocation.latitude : 0,
            longitude: toLocation ? toLocation.longitude : 0,
          }}></Marker>
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
    </View>
  );

  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text style={{...FONTS.title}}>Tạo chuyến đi mới</Text>
      </View>
    );
  }
  function renderCreateTrip() {
    return (
      <ScrollView
        contentContainerStyle={{
          // height: '40%',
          marginTop: 20,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={1}
        keyboardShouldPersistTaps="always">
        {chooseDriver}
        {chooseGender}
        {chooseTime}
        {chooseLocation}
      </ScrollView>
    );
  }
  function renderNextButton() {
    return (
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flexDirection: 'row',
          height: '10%',
          width: '100%',
          marginTop: 20,
        }}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            backgroundColor: COLORS.primary,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={ICONS.rightArr2}></Image>
        </TouchableOpacity>
      </View>
    );
  }
  useEffect(() => {
    fromSearchTextRef.current?.setAddressText('');
    getCurrentLocation();
  }, [currentLocation]);

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      {renderHeader()}
      {renderCreateTrip()}
      {renderNextButton()}
    </View>
  );
}

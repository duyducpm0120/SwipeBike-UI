import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  ScrollView,
  Animated,
  Alert,
} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  RESPONSIVE,
  ICONS,
  STYLES,
  getRoute,
} from '../constants';
import {getVietnameseDate, getVietnameseTime} from '../components';
import DatePicker from 'react-native-date-picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from 'react-native-geolocation-service';
import {MAPS_API_KEY} from '../../key';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import {createCandidateTrip} from '../api';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {Snackbar} from 'react-native-paper';
//For places search
navigator.geolocation = require('react-native-geolocation-service');

export default function CreateTrip(props) {
  const dispatch = useDispatch();
  //Local token from redux
  const token = useSelector(state => state.loginToken.token);
  //Load user info from redux
  const userProfile = useSelector(state => state.userProfile.userProfile);
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

  //Device permission for location
  const [locationPermission, setLocationPermission] = useState();
  //Current Location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [0, 0],
  });

  //Snackbar field
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);

  //Polyline coordinates
  const [coords, setCoords] = useState([
    // {latitude: testLocation1[0], longitude: testLocation1[1]},
    // {latitude: testLocation2[0], longitude: testLocation2[1]},
  ]);

  //Var for Scroll animation
  const scrollX = useRef(new Animated.Value(0)).current;
  const ScrollArr = [0, 1, 2, 3];

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

  function getCurrentLocation() {
    console.log('get current location!');
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
        //console.log('get current location!');
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
    getRoute(fromLocation.coordinate, toLocation.coordinate).then(route =>
      setCoords(route),
    );
    //
  }
  function checkInfo() {
    if (
      isDriver != null &&
      gender != null &&
      dateTime &&
      fromLocation &&
      toLocation
    )
      return true;
    return false;
  }
  function createNewTrip() {
    if (!checkInfo()) {
      Alert.alert('Chưa đủ thông tin', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }

    const trip = {
      CreatorId: userProfile.UserId,
      CandidateTripDateTime: dateTime.toString(),
      CandidateTripFromAddress: fromSearchTextRef.current.getAddressText(),
      CandidateTripToAddress: toSearchTextRef.current.getAddressText(),
      CandidateTripFromLat: fromLocation.coordinate[0],
      CandidateTripFromLong: fromLocation.coordinate[1],
      CandidateTripToLat: toLocation.coordinate[0],
      CandidateTripToLong: toLocation.coordinate[1],
      CandidateTripBike: isDriver,
      CandidateTripGenderDesired: gender,
      CandidateTripMessage: null,
    };

    //console.log(trip);
    //console.log('token', token);

    dispatch(updateIsLoading(true));
    //Call API here
    createCandidateTrip(trip, token)
      .then(res => {
        console.log('Created new candidateTrip');
        dispatch(updateIsLoading(false));

        onToggleSnackBar();
      })
      .catch(error => {
        console.log(error);
      });

    //props.navigation.navigate('TripInfo', {trip: trip});
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
            style={{width: 30, height: 30, tintColor: COLORS.black}}
          />
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
            style={{width: 30, height: 30, tintColor: COLORS.black}}
          />
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
          // console.log(data, details);
          fromSearchTextRef.current.setAddressText(
            data.structured_formatting.main_text,
          );
          const location = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            coordinate: [
              details.geometry.location.lat,
              details.geometry.location.lng,
            ],
          };
          //console.log('fromLocation', location);
          setFromLocation(location);
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'vi',
          //components: 'country:vi',
          components: 'country:vn',
          //type: 'establishment',
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
          toSearchTextRef.current.setAddressText(
            data.structured_formatting.main_text,
          );
          const location = {
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
            coordinate: [
              details.geometry.location.lat,
              details.geometry.location.lng,
            ],
          };
          //console.log('toLocation', location);
          setToLocation(location);
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'vi',
          //components: 'country:vi',
          components: 'country:vn',
          //type: 'establishment',
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
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsTraffic={true}>
        {/* Route marker */}
        <Marker
          coordinate={{
            latitude: fromLocation ? fromLocation.latitude : 0,
            longitude: fromLocation ? fromLocation.longitude : 0,
          }}
        />
        <Marker
          coordinate={{
            latitude: toLocation ? toLocation.latitude : 0,
            longitude: toLocation ? toLocation.longitude : 0,
          }}
        />
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
              }}
            />
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
              }}
            />
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
          height: '100%',
          marginTop: 10,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={1}
        keyboardShouldPersistTaps="always"
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          {listener: event => {}, useNativeDriver: false},
        )}>
        {chooseDriver}
        {chooseGender}
        {chooseTime}
        {chooseLocation}
      </ScrollView>
    );
  }
  function renderFooter() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
          height: '15%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: RESPONSIVE.pixelSizeVertical(20),
          }}>
          {ScrollArr.map((number, index) => {
            const w = scrollX.interpolate({
              inputRange: [
                SIZES.width * (index - 1),
                SIZES.width * index,
                SIZES.width * (index + 1),
              ],
              outputRange: [8, 15, 8],
              extrapolate: 'clamp',
            });
            const h = scrollX.interpolate({
              inputRange: [
                SIZES.width * (index - 1),
                SIZES.width * index,
                SIZES.width * (index + 1),
              ],
              outputRange: [8, 15, 8],
              extrapolate: 'clamp',
            });
            const color = scrollX.interpolate({
              inputRange: [
                SIZES.width * (index - 1),
                SIZES.width * index,
                SIZES.width * (index + 1),
              ],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            return (
              <Animated.View
                key={index}
                style={{
                  backgroundColor: color,
                  height: h,
                  width: w,
                  borderRadius: 50,
                  marginHorizontal: 5,
                }}
              />
            );
          })}
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: checkInfo() ? COLORS.primary : COLORS.lightGray0,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
            width: RESPONSIVE.pixelSizeHorizontal(315),
            height: RESPONSIVE.pixelSizeVertical(60),
          }}
          onPress={() => {
            createNewTrip();
            console.log(token);
          }}>
          <Text style={FONTS.h2Bold}>Tạo chuyến đi</Text>
        </TouchableOpacity>
      </View>
    );
  }

  //updating current location
  useEffect(() => {
    getCurrentLocation();
  }, []);
  //updating route
  useEffect(() => {
    getDataRoute();
  }, [fromLocation, toLocation]);

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      {renderHeader()}
      {renderCreateTrip()}
      {renderFooter()}
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
            onDismissSnackBar();
            props.navigation.goBack();
          },
        }}>
        Tạo chuyến đi thành công
      </Snackbar>
    </View>
  );
}

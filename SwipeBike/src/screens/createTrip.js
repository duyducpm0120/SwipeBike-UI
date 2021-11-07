import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {
  Trip,
  BackgroundButton,
  waitingTripDetail,
  pairingTripDetail,
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
  const searchTextRef = useRef();

  const [isDriver, setIsDriver] = useState(true);
  const [gender, setGender] = useState('male');
  //dateTime
  const [dateTime, setDateTime] = useState(new Date());
  //From location
  const [from, setFrom] = useState({});
  //To location
  const [to, setTo] = useState({});

  //Current Location
  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
    coordinates: [0, 0],
  });

  //TimePicker Field
  const [openTimePicker, setOpenTimePicker] = useState(false);
  //DatePicker Field
  const [openDatePicker, setOpenDatePicker] = useState(false);

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
      <Text style={{...FONTS.h2Bold}}>Chọn vị trí</Text>
      <GooglePlacesAutocomplete
        ref={searchTextRef}
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          searchTextRef.current.setAddressText(data.description);
          console.log(searchTextRef.current.getAddressText());
        }}
        query={{
          key: MAPS_API_KEY,
          language: 'vi',
          //components: 'country:vi',
          components: 'country:vn',
          type: 'establishment',
        }}
        currentLocation={true}
        currentLocationLabel="Vị trí hiện tại"
        textInputProps={{onBlur: () => {}}}
        styles={{
          textInputContainer: {
            width: '100%',
          },
          textInput: {
            height: 38,
            color: '#5d5d5d',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
      />
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{width: '100%', height: '50%'}}
        region={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation={true}
        followsUserLocation={true}
        showsTraffic={true}></MapView>
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
    searchTextRef.current?.setAddressText('Chọn địa điểm');
  }, []);

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

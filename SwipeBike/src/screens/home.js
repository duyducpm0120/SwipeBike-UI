import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
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
  RoundedImage,
} from '../components';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {getUserTrips, getCandidateTripRecommendations} from '../api';

export default function Home(props) {
  const dispatch = useDispatch();
  //the user
  const [user, setUser] = useState({});

  //Local token
  const token = useSelector(state => state.loginToken.token);

  const userProfile = useSelector(state => state.userProfile.userProfile);
  //dummy data
  //dummy waitingTripList
  const [waitingTripList, setWaitingTripList] = useState([]);

  function renderTrip(trip) {
    if (trip.TripType == 1)
      return (
        <View
          style={{
            marginHorizontal:
              (SIZES.width - RESPONSIVE.pixelSizeHorizontal(350) - 40) / 2,
            // paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
          }}
          key={trip.CandidateTripId}>
          <CandidateTrip
            tripDetail={trip}
            loadRecommendation={() => {
              callRecommendTrips(trip);
              //console.log(trip);
            }}
            pressTrip={() => {
              viewOnMap(trip);
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
  function ageOfUser() {
    var currentYear = parseInt(new Date().getFullYear());
    var userDobYear = parseInt(new Date(userProfile.UserDoB).getFullYear());
    var age = currentYear - userDobYear;
    return age.toString();
  }

  function viewOnMap(trip) {
    props.navigation.navigate('GoogleMapView', {tripData: trip});
  }
  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          flexDirection: 'column',
          width: '100%',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image source={ICONS.belt}></Image>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            //width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <RoundedImage
            image={{uri: userProfile.UserProfilePic}}
            width={80}
            height={80}></RoundedImage>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginLeft: RESPONSIVE.pixelSizeHorizontal(10),
            }}>
            <View
              style={{
                backgroundColor: COLORS.primary,
                width: RESPONSIVE.pixelSizeHorizontal(50),
                height: RESPONSIVE.pixelSizeVertical(25),
                marginTop: 5,
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
              }}>
              <Text style={{...FONTS.h3, color: COLORS.white}}>
                {ageOfUser()}
              </Text>
              <Image
                source={
                  userProfile.UserGender == 'male' ? ICONS.male : ICONS.female
                }
                style={{
                  width: RESPONSIVE.pixelSizeHorizontal(12),
                  height: RESPONSIVE.pixelSizeVertical(12),
                  tintColor: COLORS.white,
                }}></Image>
            </View>
            <Text style={FONTS.h2Bold}>{userProfile.UserFullName}</Text>
          </View>
        </View>
      </View>
    );
  }

  function renderCreateTrip() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginVertical: 20,
          width: SIZES.width - 40,
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            width: '100%',
            marginBottom: RESPONSIVE.pixelSizeVertical(20),
          }}>
          <Text style={{...FONTS.h2Bold}}>Tạo chuyến đi của bạn</Text>
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            width: '90%',
            //marginBottom: RESPONSIVE.pixelSizeVertical(20),
          }}>
          <Image
            source={IMAGES.cuteDriver}
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(150),
              height: RESPONSIVE.pixelSizeVertical(125),
            }}></Image>
          <TouchableOpacity
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(140),
              height: RESPONSIVE.pixelSizeVertical(50),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(10),
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              marginTop: 10,
              ...STYLES.shadow,
            }}
            onPress={() => props.navigation.navigate('CreateTrip')}>
            <Text style={FONTS.h3Bold}>Tạo ngay</Text>
            <Image
              source={ICONS.rightArr2}
              style={{tintColor: COLORS.black}}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderWaitingTripList() {
    return (
      <View
        style={{
          marginVertical: 20,
          //height: RESPONSIVE.pixelSizeVertical(900),
          justifyContent: 'flex-start',
        }}>
        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
            //marginBottom: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Text style={{...FONTS.h2Bold}}>Đang chờ</Text>
        </View>
        <View
          style={{
            height: RESPONSIVE.pixelSizeVertical(450),
            marginTop: RESPONSIVE.pixelSizeVertical(20),
          }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            data={waitingTripList}
            renderItem={({item, index}) => renderTrip(item)}
            keyExtractor={({item, index}) => {
              return index;
            }}></FlatList>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(200),
              height: RESPONSIVE.pixelSizeVertical(50),
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(10),
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              marginTop: 10,
              ...STYLES.shadow,
            }}
            onPress={() => props.navigation.jumpTo('TripsScreen')}>
            <Text style={FONTS.h3Bold}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
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
        // setDisplayingTripList(trips);
        dispatch(updateIsLoading(false));
        //setDisplayingTripList(res.data.trips);
      })
      .catch(err => console.log('err', err));
  }, []);

  return (
    <View
      style={{
        ...STYLES.container,
      }}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        styles={{width: '100%'}}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderCreateTrip()}
        {renderWaitingTripList()}
        {/* {renderRecommendedTrip()} */}
      </ScrollView>
    </View>
  );
}

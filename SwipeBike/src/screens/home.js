import React, {useState, useEffect,useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
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
import {Trip, CandidateTrip, RoundedImage} from '../components';

import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {updateSelectedTrip} from '../redux/slices/selectedTripSlice';
import {getUserCandidateTrips, getCandidateTripRecommendations} from '../api';
import {TRIPTYPE} from '../constants';

export default function Home(props) {
  const dispatch = useDispatch();

  //Local token
  const token = useSelector(state => state.loginToken.token);
  //Is new notification?
  const isNewNoti = useSelector(state => state.isNewNoti.value);
  const userProfile = useSelector(state => state.userProfile.userProfile);
  const [waitingTripList, setWaitingTripList] = useState([]);
  
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    loadData();
  }, []);

  function loadData() {
    dispatch(updateIsLoading(true));
    getUserCandidateTrips(userProfile.UserId, token)
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
  }
  function renderTrip(trip) {
    if (trip.TripType == TRIPTYPE.WAITING_TRIP_TYPE)
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
              //update Candidate Selected trip
              dispatch(updateSelectedTrip(trip));
              //call recommendation
              callRecommendTrips(trip);
              //console.log(trip);
            }}
            pressTrip={() => {
              viewOnMap(trip);
            }}
            viewProfile={() => {
              props.navigation.navigate('Profile', {CreatorId: trip.CreatorId});
            }}
            deleteTrip={() => {}}
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
    //update Candidate Selected trip
    dispatch(updateSelectedTrip(trip));
    props.navigation.navigate('RecommendTrip');
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
            alignItems: 'flex-start',
            width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Notifications')}>
            <Image source={ICONS.belt}></Image>
          </TouchableOpacity>
          {isNewNoti ? (
            <View
              style={{
                borderRadius: 50,
                width: RESPONSIVE.pixelSizeHorizontal(10),
                height: RESPONSIVE.pixelSizeVertical(10),
                backgroundColor: COLORS.primary,
                position: 'absolute',
              }}></View>
          ) : null}
        </View>

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            //width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
          }}
          onPress={() => {
            props.navigation.navigate('Profile', {
              CreatorId: userProfile.UserId,
            });
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
                borderRadius: 50,
                flexDirection: 'row',
                justifyContent: 'center',
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
                  transform: [{scale: 0.5}],
                  tintColor: COLORS.white,
                }}></Image>
            </View>
            <Text style={FONTS.h2Bold}>{userProfile.UserFullName}</Text>
          </View>
        </TouchableOpacity>
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
            height: RESPONSIVE.pixelSizeVertical(460),
            marginTop: RESPONSIVE.pixelSizeVertical(20),
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width - 40,
          }}>
          {waitingTripList.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={waitingTripList}
              renderItem={({item, index}) => renderTrip(item)}
              keyExtractor={({item, index}) => {
                return index;
              }}></FlatList>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={ICONS.nothing}
                style={{transform: [{scale: 0.5}]}}></Image>
              <Text style={{...FONTS.h1}}>Bạn không có chuyến đi nào</Text>
            </View>
          )}
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
            onPress={() => props.navigation.navigate('WaitingTripsScreen')}>
            <Text style={FONTS.h3Bold}>Xem thêm</Text>
          </TouchableOpacity>
        </View>
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
      }}>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        styles={{width: '100%'}}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {renderHeader()}
        {renderCreateTrip()}
        {renderWaitingTripList()}
        {/* {renderRecommendedTrip()} */}
      </ScrollView>
    </View>
  );
}

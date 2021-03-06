import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
  BackHandler
} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  RESPONSIVE,
  ICONS,
  IMAGES,
  STYLES,
  TRIPTYPE,
} from '../constants';
import {Trip, CandidateTrip, RoundedImage} from '../components';

import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {updateSelectedTrip} from '../redux/slices/selectedTripSlice';
import {getUserCandidateTrips, getTrips, cancelTrip} from '../api';
import {Snackbar} from 'react-native-paper';

export default function Home(props) {
  const dispatch = useDispatch();

  //Local token
  const token = useSelector(state => state.loginToken.token);
  //Is new notification?
  const isNewNoti = useSelector(state => state.isNewNoti.value);
  const userProfile = useSelector(state => state.userProfile.userProfile);
  const [waitingTripList, setWaitingTripList] = useState([]);
  const [paringTripList, setPairingTripList] = useState([]);

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    loadData();
  }, []);

  //Snackbar field
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);
  const [snackbarTitle, setSnackBarTitle] = useState('');

  function loadData() {
    dispatch(updateIsLoading(true));
    Promise.all([
      getUserCandidateTrips(userProfile.UserId, token)
        .then(res => {
          //console.log('get user Candidate trips successfully');
          let trips = res.data.trips.map(trip => {
            trip.TripType = TRIPTYPE.WAITING_TRIP_TYPE;
            return trip;
          });
          //console.log(trips[0]);
          setWaitingTripList(trips);
        })
        .catch(err => console.log('get user Candidatetrip err', err)),
      getTrips(token)
        .then(res => {
          let trips2 = res.data.trips.map(trip => {
            trip.TripType = TRIPTYPE.PAIRING_TRIP_TYPE;
            return trip;
          });
          setPairingTripList(trips2);
        })
        .catch(err => console.log('get user trips err', err)), 
    ]).then(() => {
      dispatch(updateIsLoading(false));
    });
  }
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
            viewProfile={id => {
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
            marginHorizontal:
              (SIZES.width - RESPONSIVE.pixelSizeHorizontal(350) - 40) / 2,
            // paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
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
            cancelTrip={() => {
              cancelPairingTrip(trip);
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
  function cancelPairingTrip(trip) {
    cancelTrip(trip.TripId, token)
      .then(res => {
        //console.log('success cancel Trip');
        setSnackBarTitle('Hu??? gh??p ????i th??nh c??ng');
        onToggleSnackBar();
      })
      .catch(err => {
        console.log('cancel trip err', err);
        setSnackBarTitle('Hu??? gh??p ????i th???t b???i');
        onToggleSnackBar();
      });
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
              Id: userProfile.UserId,
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
          <Text style={{...FONTS.h2Bold}}>T???o chuy???n ??i c???a b???n</Text>
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
            <Text style={FONTS.h3Bold}>T???o ngay</Text>
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
          <Text style={{...FONTS.h2Bold}}>??ang ch???</Text>
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
                style={{
                  transform: [{scale: 0.5}],
                  tintColor: COLORS.darkgray,
                }}></Image>
              <Text style={{...FONTS.h3Bold, textAlign: 'center'}}>
                Kh??ng c?? chuy???n ??i n??o
              </Text>
              <Text style={{...FONTS.h3, textAlign: 'center'}}>
                Oops. Hi???n t???i b???n kh??ng c?? chuy???n ??i n??o.
              </Text>
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
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(10),
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              marginTop: 10,
              ...STYLES.shadow,
            }}
            onPress={() => props.navigation.navigate('WaitingTripsScreen')}>
            <Text style={FONTS.h3Bold}>Xem th??m</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderPairingTripList() {
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
          <Text style={{...FONTS.h2Bold}}>Gh??p ????i</Text>
        </View>
        <View
          style={{
            height: RESPONSIVE.pixelSizeVertical(460),
            marginTop: RESPONSIVE.pixelSizeVertical(20),
            justifyContent: 'center',
            alignItems: 'center',
            width: SIZES.width - 40,
          }}>
          {paringTripList.length > 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled={true}
              data={paringTripList}
              renderItem={({item, index}) => renderTrip(item)}
              keyExtractor={({item, index}) => {
                return index;
              }}></FlatList>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Image
                source={ICONS.nothing}
                style={{
                  transform: [{scale: 0.5}],
                  tintColor: COLORS.darkgray,
                }}></Image>
              <Text style={{...FONTS.h3Bold, textAlign: 'center'}}>
                Kh??ng c?? chuy???n ??i n??o
              </Text>
              <Text style={{...FONTS.h3, textAlign: 'center'}}>
                Oops. Hi???n t???i b???n kh??ng c?? chuy???n ??i n??o.
              </Text>
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
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: RESPONSIVE.pixelSizeHorizontal(10),
              backgroundColor: COLORS.primary,
              borderRadius: 50,
              marginTop: 10,
              ...STYLES.shadow,
            }}
            onPress={() => props.navigation.navigate('PairingTripsScreen')}>
            <Text style={FONTS.h3Bold}>Xem th??m</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
 
  useEffect(() => {
    loadData();
  }, []);

  //Exit App after pressing BackButton
  useEffect(() => {
    const backAction = () => {
      //props.navigation.goBack();
      BackHandler.exitApp();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
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
        {renderPairingTripList()}
        {renderSnackBar()}
      </ScrollView>
    </View>
  );
}

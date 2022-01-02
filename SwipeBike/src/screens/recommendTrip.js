import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  BackHandler
  // Animated,
} from 'react-native';
import {FONTS, STYLES, RESPONSIVE, ICONS, COLORS, TRIPTYPE} from '../constants';
import {CandidateTrip} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {sendTripRequest, getCandidateTripRecommendations} from '../api';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {Snackbar} from 'react-native-paper';

export default function RecommendTrip(props) {
  const dispatch = useDispatch();
  //Local token
  const token = useSelector(state => state.loginToken.token);
  //Selected CandidateTrip
  const selectedTrip = useSelector(state => state.selectedTrip.tripData);
  //recommendedTripList
  const [recommendedTripList, setRecommendedTripList] = useState();
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

  function loadData () {
    dispatch(updateIsLoading(true));
    getCandidateTripRecommendations(selectedTrip.CandidateTripId, token).then(res => {
      console.log(res.data);
      let tripList = res.data.recommendation.map(trip => {
        trip.TripType = TRIPTYPE.WAITING_TRIP_TYPE;
        return trip;
      })
      setRecommendedTripList(tripList);
      dispatch(updateIsLoading(false));
    }).catch(err => {
      console.log('Load reccommendation err', err.response.data);
      dispatch(updateIsLoading(false));
      setSnackBarTitle("Có lỗi xảy ra");
      onToggleSnackBar();
    });
  }

  function sendPairingRequest(trip) {
    dispatch(updateIsLoading(true));
    sendTripRequest(selectedTrip.CandidateTripId, trip.CandidateTripId, token)
      .then(res => {
        console.log('sent request successfully!!!', res.data);
        dispatch(updateIsLoading(false));
        setSnackBarTitle("Gửi lời mời ghép đôi thành công");
        onToggleSnackBar();
      })
      .catch(err => {
        console.log('send request fail', err.response.data);
        dispatch(updateIsLoading(false));
        setSnackBarTitle("Gửi lời mời ghép đôi thất bại");
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
        <Text style={{...FONTS.title}}>Gợi ý cho bạn</Text>
        <TouchableOpacity onPress={()=>{
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

  function renderRecommendedTrips() {
    const Item = trip => {
      return (
        <View
          style={{
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
            marginHorizontal: RESPONSIVE.pixelSizeHorizontal(5),
          }}
          key={trip.CandidateTripId}>
          <CandidateTrip
            tripDetail={trip}
            pressTrip={() => {
              viewOnMap(trip);
            }}
            sendRequest={() => {
              sendPairingRequest(trip);
            }}
            viewProfile={(id)=>{props.navigation.navigate("Profile",{Id: id})}}
          />
        </View>
      );
    };
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          marginVertical: RESPONSIVE.pixelSizeVertical(20),
        }}>
        <FlatList
          data={recommendedTripList}
          renderItem={({item, index}) => Item(item)}
          keyExtractor={({item, index}) => {
            return index;
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  }

  useEffect(()=>{
    loadData();
  },[]);
  useEffect(() => {
    const backAction = () => {
      props.navigation.goBack();
      //BackHandler.exitApp();
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
      {renderHeader()}
      {renderRecommendedTrips()}
      {renderSnackBar()}
    </View>
  );
}

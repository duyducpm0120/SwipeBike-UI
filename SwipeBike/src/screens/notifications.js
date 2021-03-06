import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  RefreshControl,
  BackHandler,
} from 'react-native';
import {
  STYLES,
  FONTS,
  IMAGES,
  ICONS,
  COLORS,
  RESPONSIVE,
  NOTIFICATIONTYPE,
} from '../constants';
import {Notification} from '../components';
import {
  getUserNotifications,
  setNotificationAsRead,
  setAllMyNotificationsAsRead,
} from '../api';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {fetchHasNewNoti} from "../redux/slices/isNewNotiSlice";

export default function Notifications(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginToken.token);
  const isNewNoti = useSelector(state => state.isNewNoti.value);
  const [notificationsList, setNotificationList] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = useCallback(() => {
    reloadData();
  }, []);
  const reloadData = () => {
    dispatch(updateIsLoading(true));
    getUserNotifications(token)
      .then(res => {
        console.log('res', res.data.notifications);
        setNotificationList([]);
        setNotificationList(res.data.notifications);
        dispatch(updateIsLoading(false));
      })
      .catch(err => console.log('noti list err', err));
  };

  function markAllNotiAsRead() {
    dispatch(updateIsLoading(true));
    setAllMyNotificationsAsRead(token)
      .then(res => {
        console.log('set all success');
        dispatch(fetchHasNewNoti(token));
        reloadData();
      })
      .catch(err => {
        console.log('set all err', err);
      });
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
            style={{
              tintColor: COLORS.black,
              width: RESPONSIVE.fontPixel(30),
              height: RESPONSIVE.fontPixel(30),
            }}
          />
        </TouchableOpacity>
        <Text style={{...FONTS.title}}>Th??ng b??o</Text>
        <TouchableOpacity onPress={()=> markAllNotiAsRead()}>
          <Image
            source={ICONS.selectAll}
            style={{
              tintColor: COLORS.black,
              width: RESPONSIVE.fontPixel(30),
              height: RESPONSIVE.fontPixel(30),
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
  function renderNotifications() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: RESPONSIVE.pixelSizeVertical(10),
          flex: 1,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notificationsList}
          renderItem={({item, index}) => {
            return (
              <Notification
                notificationData={item}
                notiClick={() => {
                  if (
                    item.NotificationTypeId ==
                      NOTIFICATIONTYPE.TRIP_REQUEST_CREATED ||
                    item.NotificationTypeId ==
                      NOTIFICATIONTYPE.TRIP_REQUEST_REJECTED
                  ) {
                    props.navigation.navigate('WaitingTripsScreen');
                    setNotificationAsRead(item.NotificationId, token)
                      .then(res => console.log('set noti as read'))
                      .catch(err => console.log('set noti as read err'));
                  } else {
                    props.navigation.navigate('PairingTripsScreen');
                    setNotificationAsRead(item.NotificationId, token)
                      .then(res => console.log('set noti as read'))
                      .catch(err => console.log('set noti as read err'));
                  }
                }}
              />
            );
          }}
          keyExtractor={({item, index}) => {
            return index;
          }}
          style={{
            paddingTop: 20,
            paddingHorizontal: 20,
            backgroundColor: COLORS.backGroundColor,
            width: '100%',
          }}
          ListHeaderComponent={renderHeader()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    );
  }

  useEffect(() => {
    reloadData();
  }, [isNewNoti]);
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

  return renderNotifications();
}

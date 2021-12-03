import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {STYLES, FONTS, IMAGES, ICONS, COLORS, RESPONSIVE} from '../constants';
import {Notification} from '../components';
import {getUserNotifications} from '../api';
import {useSelector, useDispatch} from 'react-redux';
import {updateIsNewNoti} from '../redux/slices/isNewNotiSlice';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';

export default function Notifications(props) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.loginToken.token);
  const isNewNoti = useSelector(state => state.isNewNoti.value);
  const [notificationsList, setNotificationList] = useState([]);

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
        <Text style={{...FONTS.title}}>Thông báo</Text>
        <TouchableOpacity>
          <Image
            source={ICONS.refresh}
            style={{tintColor: COLORS.black, width: 30, height: 30}}
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
            return <Notification notificationData={item} />;
          }}
          keyExtractor={({item, index}) => {
            return index;
          }}
          style={{
            width: '100%',
          }}
        />
      </View>
    );
  }

  useEffect(() => {
    //dispatch(updateIsLoading(true));
    getUserNotifications(token)
      .then(res => {
        setNotificationList(res.data.notifications);
        dispatch(updateIsNewNoti(false));
        // dispatch(updateIsLoading(false));
      })
      .catch(err => console.log('noti list err', err));
  }, [isNewNoti]);

  return (
    <View style={{...STYLES.container}}>
      {renderHeader()}
      {renderNotifications()}
    </View>
  );
}

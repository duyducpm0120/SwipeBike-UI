import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {STYLES, FONTS, IMAGES, ICONS, COLORS, RESPONSIVE} from '../constants';
import {Notification} from '../components';
import {getUserNotifications} from '../api';
import {useSelector} from 'react-redux';

export default function Notifications (props) {
  const token = useSelector (state => state.loginToken.token);
  const [notificationsList, setNotificationList] = useState ([
    {
      CreatorImage: 'https://storage.googleapis.com/swipebike-38736.appspot.com/user_5_pic_2021-11-27T07:37:32.817Z',
      NotificationCreateTime: '2021-12-02T15:10:42.544Z',
      NotificationCreator: {UserFullName: 'Alexandra'},
      NotificationCreatorId: 5,
      NotificationId: 1,
      NotificationRead: false,
      NotificationTargetId: 3,
      UserNotificationContent: ' muốn ghép chuyến đi với bạn',
      UserNotificationTitle: 'Lời mời ghép đôi mới',
    },
  ]);

  function renderHeader () {
    return (
      <View
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
        }}
      >
        <TouchableOpacity onPress={() => props.navigation.goBack ()}>
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
  function renderNotifications () {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: RESPONSIVE.pixelSizeVertical (10),
          flex: 1,
        }}
      >
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

  useEffect (() => {
    getUserNotifications (token)
      .then (res => {
        setNotificationList (res.data.notifications);
      })
      .catch (err => console.log ('noti list err', err));
  }, []);

  return (
    <View style={{...STYLES.container}}>
      {renderHeader ()}
      {renderNotifications ()}
    </View>
  );
}

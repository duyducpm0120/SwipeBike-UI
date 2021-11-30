import React from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {STYLES, FONTS, IMAGES, ICONS, COLORS, RESPONSIVE} from '../constants';
import {Notification} from '../components';

export default function Notifications(props) {
  const notificationsList = [
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
    {
      NotificationId: 3,
      NotificationTitle: 'Lời mời kết bạn',
      NotificationContent: 'đã gửi cho bạn lời mời ghép đôi chuyến đi',
      NotificationTargetId: 8,
      CreatorName: 'Duong Thanh Vuong',
      CreatorImage: IMAGES.cuteDriver,
    },
  ];

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
          width: '100%',
          marginVertical: RESPONSIVE.pixelSizeVertical(10),
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={notificationsList}
          renderItem={({item, index}) => {
            return <Notification notificationData={item}></Notification>;
          }}
          keyExtractor={({item, index}) => {
            return index;
          }}
          style={{
            width: '100%',
          }}></FlatList>
      </View>
    );
  }
  return (
    <View style={{...STYLES.container}}>
      {renderHeader()}
      {renderNotifications()}
    </View>
  );
}

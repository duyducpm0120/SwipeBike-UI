import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RoundedImage} from '.';
import {COLORS, FONTS, IMAGES, RESPONSIVE, STYLES} from '../constants';
import {getVietnameseDate} from '../components';

export default function Notification(props) {
  const notificationData = {
    NotificationId: null,
    NotificationTitle: null,
    NotificationContent: null,
    NotificationTargetId: null,
    CreatorName: 'Duong Thanh Vuong',
    CreatorImage: IMAGES.cuteDriver,
  };

  function renderImage() {
    return (
      <RoundedImage
        image={{uri: props.notificationData.CreatorImage}}
        width={RESPONSIVE.fontPixel(60)}
        height={RESPONSIVE.fontPixel(60)}
      />
    );
  }

  function renderContent() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          width: '80%',
        }}>
        <View
          style={{
            marginLeft: RESPONSIVE.pixelSizeHorizontal(10),
          }}>
          <Text>
            <Text style={{...FONTS.h3Bold}}>
              {props.notificationData.NotificationCreator.UserFullName}
            </Text>
            <Text
              style={{
                ...FONTS.h3,
              }}>
              {' '}
              {props.notificationData.UserNotificationContent.length < 65
                ? `${props.notificationData.UserNotificationContent}`
                : `${props.notificationData.UserNotificationContent.substring(
                    0,
                    62,
                  )}...`}
            </Text>
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              width: '100%',
            }}>
            <Text style={{...FONTS.h4}}>
              {getVietnameseDate(props.notificationData.NotificationCreateTime)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  function renderSizeBar() {
    return (
      <View
        style={{
          width: '90%',
          height: 0.5,
          backgroundColor: COLORS.darkgray,
          marginVertical: RESPONSIVE.pixelSizeVertical(5),
        }}
      />
    );
  }

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: RESPONSIVE.pixelSizeVertical(10),
          marginVertical: RESPONSIVE.pixelSizeVertical(10),
          width: '100%',
        }}>
        {renderImage()}
        {renderContent()}
      </TouchableOpacity>
      {renderSizeBar()}
    </View>
  );
}

import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RoundedImage} from '.';
import {COLORS, FONTS, IMAGES, RESPONSIVE, STYLES} from '../constants';
import {getVietnameseDate} from '../components';

export default function Notification(props) {
  const [notificationData, setNotificationData] = useState(
    props.notificationData,
  );

  function renderImage() {
    return (
      <RoundedImage
        image={{uri: notificationData.CreatorImage}}
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
              {notificationData.NotificationCreator.UserFullName}
            </Text>
            <Text
              style={{
                ...FONTS.h3,
              }}>
              {' '}
              {notificationData.UserNotificationContent.length < 65
                ? `${notificationData.UserNotificationContent}`
                : `${notificationData.UserNotificationContent.substring(
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
              {getVietnameseDate(notificationData.NotificationCreateTime)}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:
          notificationData.NotificationRead == true
            ? COLORS.backGroundColor
            : COLORS.lightGray0,
        borderRadius: 8,
        marginVertical: RESPONSIVE.fontPixel(5),
      }}>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: RESPONSIVE.pixelSizeVertical(10),
          marginVertical: RESPONSIVE.pixelSizeVertical(5),
          width: '100%',
        }}
        onPress={() => {
          props.notiClick();
        }}>
        {renderImage()}
        {renderContent()}
      </TouchableOpacity>
    </View>
  );
}

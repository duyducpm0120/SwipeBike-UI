import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {RoundedImage} from '.';
import {FONTS, IMAGES, RESPONSIVE, STYLES} from '../constants';

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
        image={props.notificationData.CreatorImage}
        width={RESPONSIVE.fontPixel(60)}
        height={RESPONSIVE.fontPixel(60)}></RoundedImage>
    );
  }

  function renderContent() {
    return (
      <View
        style={{
          marginLeft: RESPONSIVE.pixelSizeHorizontal(10),
          width: '80%',
        }}>
        <Text>
          <Text style={{...FONTS.h3Bold}}>
            {props.notificationData.CreatorName}
          </Text>
          <Text
            style={{
              ...FONTS.h3,
            }}>
            {' '}
            {props.notificationData.NotificationContent.length < 65
              ? `${props.notificationData.NotificationContent}`
              : `${props.notificationData.NotificationContent.substring(
                  0,
                  62,
                )}...`}
          </Text>
        </Text>
      </View>
    );
  }

  return (
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
  );
}

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {COLORS, FONTS, ICONS, STYLES, RESPONSIVE} from '../constants';
import {BackgroundButton, Trip, RoundedImage} from '../components';
import {useSelector} from 'react-redux';

export default function Profile(props) {
  const userProfile = useSelector(state => state.userProfile.userProfile);

  const [rating, setRating] = useState([
    {
      name: 'Hoàn thành',
      value: 120,
      imgUri: ICONS.finishBold,
    },
    {
      name: 'Yêu thích',
      value: 40,
      imgUri: ICONS.heartBold,
    },
    {
      name: 'Không tốt',
      value: 10,
      imgUri: ICONS.badBold,
    },
  ]);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          width: '100%',
          marginBottom: RESPONSIVE.pixelSizeVertical(50),
        }}>
        <TouchableOpacity>
          <Image source={ICONS.setting}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('UpdateProfile')}>
          <Image source={ICONS.edit}></Image>
        </TouchableOpacity>
      </View>
    );
  }
  function ageOfUser() {
    var currentYear = parseInt(new Date().getFullYear());
    var userDobYear = parseInt(new Date(userProfile.UserDoB).getFullYear());
    var age = currentYear - userDobYear;
    return age.toString();
  }

  function renderProfile() {
    return (
      <View
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
        }}>
        <RoundedImage
          image={{
            uri: userProfile.UserProfilePic,
          }}
          width={RESPONSIVE.pixelSizeHorizontal(120)}
          height={RESPONSIVE.pixelSizeHorizontal(120)}
        />
        <View
          style={{
            backgroundColor: COLORS.primary,
            width: RESPONSIVE.pixelSizeHorizontal(50),
            height: RESPONSIVE.pixelSizeVertical(25),
            marginTop: 5,
            borderRadius: 50,
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>{ageOfUser()}</Text>
          <Image
            source={
              userProfile.UserGender == 'male' ? ICONS.male : ICONS.female
            }
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(12),
              height: RESPONSIVE.pixelSizeVertical(12),
              tintColor: COLORS.white,
            }}></Image>
        </View>
        <Text
          style={{
            ...FONTS.h1Bold,
            marginVertical: RESPONSIVE.pixelSizeVertical(5),
          }}>
          {userProfile.UserFullName}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ICONS.work}
            style={{
              marginRight: RESPONSIVE.pixelSizeHorizontal(10),
              marginBottom: RESPONSIVE.pixelSizeVertical(10),
              tintColor: COLORS.darkgray,
            }}></Image>
          <Text style={{...FONTS.h3}}>{userProfile.UserUniversity}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={ICONS.phone}
            style={{
              marginRight: RESPONSIVE.pixelSizeHorizontal(10),
              tintColor: COLORS.darkgray,
            }}></Image>
          <Text style={{...FONTS.h3}}>{userProfile.UserPhone}</Text>
        </View>
      </View>
    );
  }

  function renderRating() {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          marginVertical: RESPONSIVE.pixelSizeVertical(25),
        }}>
        {rating.map(item => {
          return (
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Image source={item.imgUri}></Image>
              <Text style={{...FONTS.h2Bold}}>{item.value}</Text>
              <Text style={{...FONTS.h3}}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{...STYLES.container}}>
      {renderHeader()}
      {renderProfile()}
      {renderRating()}
    </ScrollView>
  );
}

import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Image} from 'react-native';
import {COLORS, FONTS, ICONS, STYLES, RESPONSIVE} from '../constants';
import {BackgroundButton, Trip, RoundedImage} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileById} from '../api';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';

export default function Profile(props) {
  const dispatch = useDispatch();
  //Local token
  const token = useSelector(state => state.loginToken.token);

  const ownerUserProfile = useSelector(state => state.userProfile.userProfile);
  const [userProfile, setUserProfile] = useState({});

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
    if (props.route.params.Id == ownerUserProfile.UserId)
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
    else
      return (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: RESPONSIVE.pixelSizeVertical(50),
          }}></View>
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
            marginTop: RESPONSIVE.pixelSizeVertical(5),
            borderRadius: 50,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{...FONTS.h3, color: COLORS.white}}>{ageOfUser()}</Text>
          <Image
            source={
              userProfile.UserGender == 'male' ? ICONS.male : ICONS.female
            }
            style={{
              transform:[{scale:0.5}],
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
          {/* <Image
            source={ICONS.work}
            style={{
              marginRight: RESPONSIVE.pixelSizeHorizontal(10),
              marginBottom: RESPONSIVE.pixelSizeVertical(10),
              tintColor: COLORS.darkgray,
            }}></Image> */}
          <Text style={{...FONTS.h3, textAlign:'center', width:'70%', fontWeight:'bold'}}>{userProfile.UserUniversity?.UniversityFullName}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop:RESPONSIVE.pixelSizeVertical(10)
          }}>
          <Image
            source={ICONS.phone}
            style={{
              marginRight: RESPONSIVE.pixelSizeHorizontal(10),
              tintColor: COLORS.darkgray,
              width:RESPONSIVE.fontPixel(25),
              height:RESPONSIVE.fontPixel(25)
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

  useEffect(() => {
    dispatch(updateIsLoading(true));
    getProfileById(props.route.params.Id, token)
      .then(res => {
        console.log("profile", res.data);
        setUserProfile(res.data.profile);
        dispatch(updateIsLoading(false));
      })
      .catch(err => {
        console.log('profile load err', err);
        dispatch(updateIsLoading(false));
      });
      console.log("user Id", props.route.params.Id);
  }, []);
  return (
    <ScrollView contentContainerStyle={{...STYLES.container}}>
      {renderHeader()}
      {renderProfile()}
      {renderRating()}
    </ScrollView>
  );
}

import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {COLORS, FONTS, ICONS, STYLES, RESPONSIVE} from '../constants';
import {BackgroundButton, Trip, RoundedImage} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {getProfileById} from '../api';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

export default function Profile(props) {
  const dispatch = useDispatch();
  //Local token
  const token = useSelector(state => state.loginToken.token);

  const ownerUserProfile = useSelector(state => state.userProfile.userProfile);
  const [userProfile, setUserProfile] = useState({});

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef(null);
  const fall = new Animated.Value(1);

  const [rating, setRating] = useState([
    {
      name: 'Hoàn thành',
      imgUri: ICONS.finishBold,
    },
    {
      name: 'Yêu thích',
      imgUri: ICONS.heartBold,
    },
    {
      name: 'Không tốt',
      imgUri: ICONS.badBold,
    },
  ]);

  //Create components inner bottomsheet
  const renderInner = () => (
    <View
      style={{
        backgroundColor: COLORS.backGroundColor,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        paddingHorizontal: 10,
      }}>
      {/* //bar signal */}
      <View
        style={{
          width: '100%',
          height: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <View
          style={{
            width: 40,
            height: '100%',
            backgroundColor: COLORS.darkgray,
            borderRadius: 100,
          }}
        />
      </View>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          props.navigation.navigate("ChangePassword")
        }}>
        <BackgroundButton text="Đổi mật khẩu" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          props.navigation.navigate("Login")
        }}>
        <BackgroundButton text="Đăng xuất" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal(315),
          height: RESPONSIVE.pixelSizeVertical(60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo(1);
        }}>
        <Text style={FONTS.h2Bold}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );

  const settingBottomSheet = () => {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%', RESPONSIVE.pixelSizeVertical(-50)]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
    );
  };

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
          <TouchableOpacity onPress={() => {
              bottomSheetRef.current.snapTo(0);
            }}>
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
              transform: [{scale: 0.5}],
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
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
          }}>
          <Image
            source={ICONS.work}
            style={{
              marginRight: RESPONSIVE.pixelSizeHorizontal(10),
              marginBottom: RESPONSIVE.pixelSizeVertical(10),
              width: RESPONSIVE.fontPixel(25),
              height: RESPONSIVE.fontPixel(25),
              tintColor: COLORS.black,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3,
              textAlign: 'left',
              flex: 1,
              //fontWeight: 'bold',
            }}>
            {userProfile.UserUniversity?.UniversityFullName}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            marginTop: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Image
            source={ICONS.phone}
            style={{
              marginRight: RESPONSIVE.pixelSizeHorizontal(10),
              width: RESPONSIVE.fontPixel(25),
              height: RESPONSIVE.fontPixel(25),
              tintColor: COLORS.black,
            }}></Image>
          <Text style={{...FONTS.h3, textAlign: 'left', flex: 1}}>
            {userProfile.UserPhone}
          </Text>
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
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image source={rating[0].imgUri}></Image>
          <Text style={{...FONTS.h2Bold}}>{userProfile.TripCount}</Text>
          <Text style={{...FONTS.h3}}>{rating[0].name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image source={rating[1].imgUri}></Image>
          <Text style={{...FONTS.h2Bold}}>{userProfile.LikeCount}</Text>
          <Text style={{...FONTS.h3}}>{rating[1].name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <Image source={rating[2].imgUri}></Image>
          <Text style={{...FONTS.h2Bold}}>{userProfile.DisLikeCount}</Text>
          <Text style={{...FONTS.h3}}>{rating[2].name}</Text>
        </View>
      </View>
    );
  }

  useEffect(() => {
    dispatch(updateIsLoading(true));
    getProfileById(props.route.params.Id, token)
      .then(res => {
        console.log('profile', res.data.profile);
        setUserProfile(res.data.profile);
        dispatch(updateIsLoading(false));
      })
      .catch(err => {
        console.log('profile load err', err);
        dispatch(updateIsLoading(false));
      });
    console.log('user Id', props.route.params.Id);
  }, []);
  return (
    <>
      <Animated.ScrollView
        contentContainerStyle={{...STYLES.container}}
        style={{opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))}}
        >
        {renderHeader()}
        {renderProfile()}
        {renderRating()}
      </Animated.ScrollView>
      {settingBottomSheet()}
    </>
  );
}

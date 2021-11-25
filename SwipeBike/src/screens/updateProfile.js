import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, COLORS, RESPONSIVE, ICONS, IMAGES} from '../constants';
import {BackgroundButton, RoundedImage, getVietnameseDate} from '../components';
import DatePicker from 'react-native-date-picker';
import {TextInput, RadioButton} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
//redux Field
import {useSelector, useDispatch} from 'react-redux';
import {fetchProfile} from '../redux/slices/profileSlice';
//Handle moment
import 'moment/locale/vi';

import {updateProfilePic, setupUserProfile} from '../api';

export default function UpdateProfile(props) {
  const token = useSelector(state => state.loginToken.token);
  //Redux userProfile Slice
  const userProfile = useSelector(state => state.userProfile.userProfile);

  //Redux dispatch
  const dispatch = useDispatch();

  //User info
  const [name, setName] = useState(userProfile.UserFullName);
  const [gender, setGender] = useState(userProfile.UserGender);
  const [date, setDate] = useState(new Date(userProfile.UserDoB));
  const [imageUri, setImageUri] = useState(IMAGES.updateImage);
  //const [university, setUniversity] = useState();
  const [phone, setPhone] = useState(userProfile.UserPhone);

  //DatePicker Field
  const [openDatePicker, setOpenDatePicker] = useState(false);
  //Use moment to convert to Vietnamese Datetime

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef(null);
  const fall = new Animated.Value(1);

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
          openCamera();
        }}>
        <BackgroundButton text="Chụp ảnh" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          openImagePicker();
        }}>
        <BackgroundButton text="Chọn từ thư viện" />
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
  const updatePhotoBottomSheet = () => {
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

  //Open Phone Library
  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: RESPONSIVE.pixelSizeHorizontal(100),
        maxHeight: RESPONSIVE.pixelSizeHorizontal(100),
        includeBase64: false,
      },
      response => {
        //close bottomsheet
        bottomSheetRef.current.snapTo(1);
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log('Error code ', response.errorCode);
        } else {
          const source = {
            uri: response.assets[0].uri,
          };

          //  console.log("response, ", response);

          console.log('token to upload', token);
          updateProfilePic(response.assets[0], token)
            .then(result => {
              console.log(result.data);
            })
            .catch(err => {
              console.log(err);
            });

          setImageUri(source);
          //console.log(source);
        }
      },
    );
  };

  //Open Camera
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: RESPONSIVE.pixelSizeHorizontal(100),
        maxHeight: RESPONSIVE.pixelSizeHorizontal(100),
        includeBase64: true,
      },
      response => {
        //close bottomsheet
        bottomSheetRef.current.snapTo(1);
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log('Error code ', response.errorCode);
        } else {
          const source = {
            uri: response.assets[0].uri,
          };

          const newUri =
            response.assets[0].uri.substr(0, 5) +
            response.assets[0].uri.substr(6, response.assets[0].uri.length);
          //   console.log('source', source);

          updateProfilePic(newUri, token)
            .then(res => console.log(res))
            .catch(error => {
              console.log(JSON.stringify(error));
              console.log(error.status);
            });
          setImageUri(source);
          //console.log(source);
          //close bottomsheet
        }
      },
    );
  };

  //Update profile on server
  function updateProfile() {
    const user = {
      UserFullName: name,
      UserGender: gender,
      UserPhone: phone,
      UserDoB: date.toDateString(),
    };

    console.log(user);
    setupUserProfile(user, token)
      .then(result => {
        //then in Redux
        dispatch(fetchProfile(token));
        props.navigation.navigate('Home');
      })
      .catch(error => {
        console.log(error);
      });
  }

  function renderHeader() {
    return (
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}>
        <Text
          style={{
            ...FONTS.title,
            textAlign: 'center',
          }}>
          Cập nhật hồ sơ
        </Text>
        <Text style={{...FONTS.h3, textAlign: 'center'}}>
          Hồ sơ sẽ hiển thị trên trang cá nhân của bạn
        </Text>
      </View>
    );
  }
  function renderImagePicker() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <RoundedImage
            image={{
              uri: userProfile.UserProfilePic,
            }}
            width={RESPONSIVE.pixelSizeHorizontal(150)}
            height={RESPONSIVE.pixelSizeHorizontal(150)}
          />
          <TouchableOpacity
            style={{
              marginTop: 5,
            }}
            onPress={() => {
              bottomSheetRef.current.snapTo(0);
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                textDecorationLine: 'underline',
              }}>
              Thay đổi ảnh đại diện
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderTextField() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: RESPONSIVE.pixelSizeHorizontal(350),
        }}
        showsVerticalScrollIndicator={false}>
        {/* Name */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Text style={{...FONTS.h2Bold}}>Tên đại diện</Text>
          <TextInput
            //mode="outlined"
            placeholder="Tên đại diện"
            value={name}
            theme={{
              colors: {
                primary: COLORS.primary,
              },
            }}
            style={{
              width: '100%',
              height: RESPONSIVE.pixelSizeVertical(50),
              fontSize: SIZES.h3,
              paddingHorizontal: 0,
              backgroundColor: COLORS.backGroundColor,
            }}
            onChangeText={name => setName(name)}
          />
        </View>

        {/* Sex */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Text style={{...FONTS.h2Bold}}>Giới tính</Text>
          <RadioButton.Group
            onValueChange={value => setGender(value)}
            value={gender}
            style={{
              width: '100%',
              paddingHorizontal: 0,
            }}>
            <RadioButton.Item
              label="Nam"
              labelStyle={{
                fontSize: SIZES.h3,
              }}
              value="male"
              color={COLORS.primary}
              uncheckedColor={COLORS.darkgray}
              style={{
                width: '75%',
                fontSize: SIZES.h3,
                paddingHorizontal: 0,
                marginHorizontal: 0,
              }}
            />
            <RadioButton.Item
              label="Nữ"
              labelStyle={{fontSize: SIZES.h3}}
              value="female"
              color={COLORS.primary}
              uncheckedColor={COLORS.darkgray}
              style={{
                width: '75%',
                fontSize: SIZES.h2,
                paddingHorizontal: 0,
                marginHorizontal: 0,
              }}
            />
            <RadioButton.Item
              label="Khác"
              labelStyle={{fontSize: SIZES.h3}}
              value="others"
              color={COLORS.primary}
              uncheckedColor={COLORS.darkgray}
              style={{
                width: '75%',
                fontSize: SIZES.h3,
                paddingHorizontal: 0,
                marginHorizontal: 0,
              }}
            />
          </RadioButton.Group>
        </View>

        {/* Date of birth */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
          }}>
          <Text style={{...FONTS.h2Bold}}>Ngày sinh</Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                ...FONTS.h3,
                width: RESPONSIVE.pixelSizeHorizontal(240),
              }}>
              {getVietnameseDate(date)}
            </Text>
            <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
              <Image
                source={ICONS.edit}
                style={{
                  width: RESPONSIVE.pixelSizeHorizontal(24),
                  height: RESPONSIVE.pixelSizeHorizontal(24),
                  tintColor: COLORS.lightGray1,
                }}
              />
            </TouchableOpacity>
          </View>

          <DatePicker
            modal
            title="Chọn ngày sinh"
            confirmText="Chọn"
            cancelText="Hủy"
            locale="vi"
            mode={'date'}
            open={openDatePicker}
            date={date}
            onConfirm={date => {
              setOpenDatePicker(false);
              setDate(date);
            }}
            onCancel={() => {
              setOpenDatePicker(false);
            }}
          />
        </View>

        {/* Phone */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Text style={{...FONTS.h2Bold}}>Số điện thoại</Text>
          <TextInput
            //mode="outlined"
            placeholder="Số điện thoại"
            value={phone}
            theme={{
              colors: {
                primary: COLORS.primary,
              },
            }}
            style={{
              width: '100%',
              height: RESPONSIVE.pixelSizeVertical(50),
              fontSize: SIZES.h3,
              paddingHorizontal: 0,
              backgroundColor: COLORS.backGroundColor,
              marginVertical: 0,
            }}
            onChangeText={phone => setPhone(phone)}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}>
      <Animated.ScrollView
        style={{opacity: Animated.add(0.3, Animated.multiply(fall, 1.0))}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderImagePicker()}
        {renderTextField()}
        <TouchableOpacity
          style={{
            marginTop: RESPONSIVE.pixelSizeVertical(30),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            updateProfile();
          }}>
          <BackgroundButton text="Xong" />
        </TouchableOpacity>
      </Animated.ScrollView>
      {updatePhotoBottomSheet()}
    </View>
  );
}

import React, {useState, useEffect} from 'react';
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
import {updateProfile} from '../redux/slices/profileSlice';
//Handle moment
import 'moment/locale/vi';

import {updateProfilePic} from '../api';
import {saveTokenToLocalStorage, loadTokenFromLocalStorage} from '../storage';

export default function UpdateProfile (props) {
  //dummy token
  const token =
    'eyJhbGciOiJSUzI1NiIsImtpZCI6IjJlMzZhMWNiZDBiMjE2NjYxOTViZGIxZGZhMDFiNGNkYjAwNzg3OWQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3dpcGViaWtlLTM4NzM2IiwiYXVkIjoic3dpcGViaWtlLTM4NzM2IiwiYXV0aF90aW1lIjoxNjM3NDI1NzU1LCJ1c2VyX2lkIjoickI2MGF3b1lZOFhZSU5CNDhNbVhOYnpsOXNxMSIsInN1YiI6InJCNjBhd29ZWThYWUlOQjQ4TW1YTmJ6bDlzcTEiLCJpYXQiOjE2Mzc0MjU3NTUsImV4cCI6MTYzNzQyOTM1NSwiZW1haWwiOiJ2dW9uZy52bDAwQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ2dW9uZy52bDAwQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.IUWaH1wZVhBZg9CbLm7IwKtGo06xmILFlnTL_9OqROl3V_-BlrpYNyxRktl8NBdZjzIsRFcEpzU8mhTNUpsUj3jkDgix93wanZUsaS991Tj1w6OET6kemyqUu21SvrokAdCyotLJyhoUWIusGlGb3nudJ_pdSQgzHyO3CS06U4DEgycs1mN6lWVxdFG1MuXG-BchUHMLd05NrAOQVzZdvkXgYWkSSTDjiAoatCdmLPJGqj5Ue7krYVwVWlJpiGjMsqIMrjnGVLuURgnuK4fwr85rmNbJZEcrdwE30D5nZCdueldizsxce9KAe1GAOHIOzYMIdkIbhQ0NSkZ-3XXTTg';
  useEffect (() => {});
  //Redux dispatch
  const dispatch = useDispatch ();
  //Redux userProfile Slice
  const userProfileInfo = useSelector (state => state.userProfile);
  //User info
  const [name, setName] = useState ('');
  const [gender, setGender] = useState ('');
  const [date, setDate] = useState (new Date ());
  const [imageUri, setImageUri] = useState (IMAGES.updateImage);
  //const [university, setUniversity] = useState();
  const [phone, setPhone] = useState ('0');

  //DatePicker Field
  const [openDatePicker, setOpenDatePicker] = useState (false);
  //Use moment to convert to Vietnamese Datetime

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef (null);
  const fall = new Animated.Value (1);

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
      }}
    >
      {/* //bar signal */}
      <View
        style={{
          width: '100%',
          height: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}
      >
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
          openCamera ();
        }}
      >
        <BackgroundButton text="Chụp ảnh" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          openImagePicker ();
        }}
      >
        <BackgroundButton text="Chọn từ thư viện" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: RESPONSIVE.pixelSizeHorizontal (315),
          height: RESPONSIVE.pixelSizeVertical (60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo (1);
        }}
      >
        <Text style={FONTS.h2Bold}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );
  const updatePhotoBottomSheet = () => {
    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%', RESPONSIVE.pixelSizeVertical (-50)]}
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
    launchImageLibrary (
      {
        mediaType: 'photo',
        maxWidth: RESPONSIVE.pixelSizeHorizontal (100),
        maxHeight: RESPONSIVE.pixelSizeHorizontal (100),
        includeBase64: false,
      },
      response => {
        //close bottomsheet
        bottomSheetRef.current.snapTo (1);
        if (response.didCancel) {
          console.log ('User canceled image picker');
        } else if (response.errorMessage) {
          console.log ('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log ('Error code ', response.errorCode);
        } else {
          const source = {
            uri: response.assets[0].uri,
          };

          console.log("response, ", response);
          updateProfilePic(response.assets[0], token).then(result=>{
            console.log(result.data)
          }).catch(err=>{
            console.log(err)
          });
          
          setImageUri (source);
          //console.log(source);
        }
      }
    );
  };

  //Open Camera
  const openCamera = () => {
    launchCamera (
      {
        mediaType: 'photo',
        maxWidth: RESPONSIVE.pixelSizeHorizontal (100),
        maxHeight: RESPONSIVE.pixelSizeHorizontal (100),
        includeBase64: true,
      },
      response => {
        //close bottomsheet
        bottomSheetRef.current.snapTo (1);
        if (response.didCancel) {
          console.log ('User canceled image picker');
        } else if (response.errorMessage) {
          console.log ('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log ('Error code ', response.errorCode);
        } else {
          const source = {
            uri: response.assets[0].uri,
          };

          const newUri =
            response.assets[0].uri.substr (0, 5) +
            response.assets[0].uri.substr (6, response.assets[0].uri.length);
          //   console.log('source', source);
          updateProfilePic (newUri, token)
            .then (res => console.log (res))
            .catch (error => {
              console.log (JSON.stringify (error));
              console.log (error.status);
            });
          setImageUri (source);
          //console.log(source);
          //close bottomsheet
        }
      }
    );
  };

  function renderHeader () {
    return (
      <View
        style={{
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Text
          style={{
            ...FONTS.title,
            textAlign: 'center',
          }}
        >
          Cập nhật hồ sơ
        </Text>
        <Text style={{...FONTS.h3, textAlign: 'center'}}>
          Hồ sơ sẽ hiển thị trên trang cá nhân của bạn
        </Text>
      </View>
    );
  }
  function renderImagePicker () {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RoundedImage
            image={imageUri}
            width={RESPONSIVE.pixelSizeHorizontal (150)}
            height={RESPONSIVE.pixelSizeHorizontal (150)}
          />
          <TouchableOpacity
            style={{
              marginTop: 5,
            }}
            onPress={() => {
              bottomSheetRef.current.snapTo (0);
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                textDecorationLine: 'underline',
              }}
            >
              Thay đổi ảnh đại diện
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderTextField () {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          width: RESPONSIVE.pixelSizeHorizontal (350),
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Name */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginVertical: RESPONSIVE.pixelSizeVertical (10),
          }}
        >
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
              height: RESPONSIVE.pixelSizeVertical (50),
              fontSize: SIZES.h3,
              paddingHorizontal: 0,
              backgroundColor: COLORS.backGroundColor,
            }}
            onChangeText={name => setName (name)}
          />
        </View>

        {/* Sex */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: RESPONSIVE.pixelSizeVertical (10),
          }}
        >
          <Text style={{...FONTS.h2Bold}}>Giới tính</Text>
          <RadioButton.Group
            onValueChange={value => setGender (value)}
            value={gender}
            style={{
              width: '100%',
              paddingHorizontal: 0,
            }}
          >
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
          }}
        >
          <Text style={{...FONTS.h2Bold}}>Ngày sinh</Text>
          <View
            style={{
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                width: RESPONSIVE.pixelSizeHorizontal (240),
              }}
            >
              {getVietnameseDate (date)}
            </Text>
            <TouchableOpacity onPress={() => setOpenDatePicker (true)}>
              <Image
                source={ICONS.edit}
                style={{
                  width: RESPONSIVE.pixelSizeHorizontal (24),
                  height: RESPONSIVE.pixelSizeHorizontal (24),
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
              setOpenDatePicker (false);
              setDate (date);
            }}
            onCancel={() => {
              setOpenDatePicker (false);
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
            marginVertical: RESPONSIVE.pixelSizeVertical (10),
          }}
        >
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
              height: RESPONSIVE.pixelSizeVertical (50),
              fontSize: SIZES.h3,
              paddingHorizontal: 0,
              backgroundColor: COLORS.backGroundColor,
              marginVertical: 0,
            }}
            onChangeText={phone => setPhone (phone)}
          />
        </View>
      </View>
    );
  }

  async function updateProfileSlice () {
    const user = {
      UserFullName: name,
      UserGender: gender,
      UserPhone: phone,
      UserDoB: date.toDateString (),
    };
    await dispatch (updateProfile (user));
  }

  return (
    <View
      style={{
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <Animated.ScrollView
        style={{opacity: Animated.add (0.3, Animated.multiply (fall, 1.0))}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderHeader ()}
        {renderImagePicker ()}
        {renderTextField ()}
        <TouchableOpacity
          style={{
            marginTop: RESPONSIVE.pixelSizeVertical (30),
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            updateProfileSlice ().then (() => {
              console.log ('user Inside Redux', userProfileInfo);
            });
            props.navigation.navigate ('Home');
          }}
        >
          <BackgroundButton text="Xong" />
        </TouchableOpacity>
      </Animated.ScrollView>
      {updatePhotoBottomSheet ()}
    </View>
  );
}

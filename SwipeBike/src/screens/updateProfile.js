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
//Handle moment
import 'moment/locale/vi';

import {updateProfilePic, setupUserProfile} from '../api';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {fetchProfile} from '../redux/slices/profileSlice';

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
        <BackgroundButton text="Ch???p ???nh" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          openImagePicker();
        }}>
        <BackgroundButton text="Ch???n t??? th?? vi???n" />
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
        <Text style={FONTS.h2Bold}>H???y</Text>
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
        //maxWidth: RESPONSIVE.pixelSizeHorizontal(100),
        //maxHeight: RESPONSIVE.pixelSizeHorizontal(100),
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
          dispatch(updateIsLoading(true));

          updateProfilePic(response.assets[0], token)
            .then(result => {
              //console.log(result.data);
              Promise.all([
                dispatch(fetchProfile(token)),
                dispatch(updateIsLoading(false)),
              ]);
            })
            .catch(err => {
              console.log(err);
            });

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
        //maxWidth: RESPONSIVE.pixelSizeHorizontal(100),
        //maxHeight: RESPONSIVE.pixelSizeHorizontal(100),
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
          dispatch(updateIsLoading(true));

          const newUri =
            response.assets[0].uri.substr(0, 5) +
            response.assets[0].uri.substr(6, response.assets[0].uri.length);
          //   console.log('source', source);

          updateProfilePic(newUri, token)
            .then(res =>
              Promise.all([
                dispatch(fetchProfile(token)),
                dispatch(updateIsLoading(false)),
              ]),
            )
            .catch(error => {
              console.log(JSON.stringify(error));
              console.log(error.status);
            });
        }
      },
    );
  };

  //Update profile on server
  function updateProfile() {
    dispatch(updateIsLoading(true));
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
        dispatch(updateIsLoading(false));
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
          C???p nh???t h??? s??
        </Text>
        <Text style={{...FONTS.h3, textAlign: 'center'}}>
          H??? s?? s??? hi???n th??? tr??n trang c?? nh??n c???a b???n
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
              Thay ?????i ???nh ?????i di???n
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
          <Text style={{...FONTS.h2Bold}}>T??n ?????i di???n</Text>
          <TextInput
            //mode="outlined"
            placeholder="T??n ?????i di???n"
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
          <Text style={{...FONTS.h2Bold}}>Gi???i t??nh</Text>
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
              label="N???"
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
              label="Kh??c"
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
          <Text style={{...FONTS.h2Bold}}>Ng??y sinh</Text>
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
            title="Ch???n ng??y sinh"
            confirmText="Ch???n"
            cancelText="H???y"
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
          <Text style={{...FONTS.h2Bold}}>S??? ??i???n tho???i</Text>
          <TextInput
            //mode="outlined"
            placeholder="S??? ??i???n tho???i"
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

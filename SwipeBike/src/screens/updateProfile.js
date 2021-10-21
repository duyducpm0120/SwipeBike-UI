import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {BackgroundButton, RoundedImage} from '../components';
import DatePicker from 'react-native-date-picker';
import {
  TextInput,
  configureFonts,
  Provider,
  List,
  RadioButton,
} from 'react-native-paper';
import DropDown from 'react-native-paper-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

const fontConfig = {
  default: {
    regular: {
      fontFamily: 'Roboto-Regular',
      fontSize: PIXEL.fontPixel(16),
    },
  },
};

export default function UpdateProfile(props) {
  //User info
  const [name, setName] = useState();
  const [sex, setSex] = useState('');
  const [date, setDate] = useState(new Date());
  const [imageUri, setImageUri] = useState(IMAGES.updateImage);
  const [university, setUniversity] = useState();

  //Sex radioButton field
  const [checked, setChecked] = React.useState('first');

  //DatePicker Field
  const [openDatePicker, setOpenDatePicker] = useState(false);

  //vars for altering bottomsheet
  const bottomSheetRef = React.createRef();
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
      }}>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          openCamera();
        }}>
        <BackgroundButton text="Chụp ảnh"></BackgroundButton>
      </TouchableOpacity>
      <TouchableOpacity
        style={{marginVertical: 10}}
        onPress={() => {
          openImagePicker();
        }}>
        <BackgroundButton text="Chọn từ thư viện"></BackgroundButton>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: COLORS.darkgray,
          justifyContent: 'center',
          alignItems: 'center',
          width: PIXEL.pixelSizeHorizontal(315),
          height: PIXEL.pixelSizeVertical(60),
        }}
        onPress={() => {
          bottomSheetRef.current.snapTo(1);
        }}>
        <Text style={FONTS.h2Bold}>Hủy</Text>
      </TouchableOpacity>
    </View>
  );

  //Open Phone Library
  const openImagePicker = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: PIXEL.pixelSizeHorizontal(100),
        maxHeight: PIXEL.pixelSizeHorizontal(100),
        includeBase64: true,
      },
      response => {
        console.log('Image picker call back successfully');
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log('Error code ', response.errorCode);
        } else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
            //uri: response.assets[0].uri,
          };
          setImageUri(source);
          console.log(source);
          //close bottomsheet
          bottomSheetRef.current.snapTo(1);
        }
      },
    );
  };

  //Open Camera
  const openCamera = () => {
    launchCamera(
      {
        mediaType: 'photo',
        maxWidth: PIXEL.pixelSizeHorizontal(100),
        maxHeight: PIXEL.pixelSizeHorizontal(100),
        includeBase64: true,
      },
      response => {
        console.log('Image picker call back successfully');
        if (response.didCancel) {
          console.log('User canceled image picker');
        } else if (response.errorMessage) {
          console.log('Image picker error', response.errorMessage);
        } else if (response.errorCode) {
          console.log('Error code ', response.errorCode);
        } else {
          const source = {
            uri: 'data:image/jpeg;base64,' + response.assets[0].base64,
            //uri: response.assets[0].uri,
          };
          setImageUri(source);
          console.log(source);
          //close bottomsheet
          bottomSheetRef.current.snapTo(1);
        }
      },
    );
  };

  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={FONTS.title}>Cập nhật hồ sơ</Text>
        <Text style={FONTS.h3}>
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
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <RoundedImage
            image={imageUri}
            width={PIXEL.pixelSizeHorizontal(100)}
            height={PIXEL.pixelSizeHorizontal(100)}></RoundedImage>
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
      <View style={{width: '100%', height: '60%'}}>
        <ScrollView
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: PIXEL.pixelSizeHorizontal(330),
          }}
          showsVerticalScrollIndicator={false}>
          {/* Name */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              marginVertical: PIXEL.pixelSizeVertical(10),
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
                height: PIXEL.pixelSizeVertical(50),
                fontSize: SIZES.h3,
                paddingHorizontal: 0,
                backgroundColor: COLORS.backGroundColor,
              }}
              onChangeText={name => setName(name)}></TextInput>
          </View>

          {/* Sex */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              marginBottom: PIXEL.pixelSizeVertical(10),
            }}>
            <Text style={{...FONTS.h2Bold}}>Giới tính</Text>
            <RadioButton.Group
              onValueChange={value => setSex(value)}
              value={sex}
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
              marginBottom: PIXEL.pixelSizeVertical(10),
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
                  width: PIXEL.pixelSizeHorizontal(240),
                }}>
                {date.toDateString()}
              </Text>
              <TouchableOpacity onPress={() => setOpenDatePicker(true)}>
                <Image
                  source={ICONS.edit}
                  style={{
                    width: PIXEL.pixelSizeHorizontal(24),
                    height: PIXEL.pixelSizeHorizontal(24),
                    tintColor: COLORS.lightGray1,
                  }}></Image>
              </TouchableOpacity>
            </View>

            <DatePicker
              modal
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

          {/* University */}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: '100%',
              marginVertical: PIXEL.pixelSizeVertical(10),
            }}>
            <Text style={{...FONTS.h2Bold}}>Trường đại học</Text>
            <TextInput
              //mode="outlined"
              placeholder="Trường đại học"
              value={name}
              theme={{
                colors: {
                  primary: COLORS.primary,
                },
              }}
              style={{
                width: '100%',
                height: PIXEL.pixelSizeVertical(50),
                fontSize: SIZES.h3,
                paddingHorizontal: 0,
                backgroundColor: COLORS.backGroundColor,
                marginVertical: 0,
              }}
              onChangeText={university =>
                setUniversity(university)
              }></TextInput>
          </View>
          <View
            style={{
              width: '100%',
              height: PIXEL.pixelSizeVertical(100),
            }}></View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        height: '100%',
      }}>
      <Animated.View
        style={{
          ...STYLES.container,
          opacity: Animated.add(0.3, Animated.multiply(fall, 1.0)),
        }}>
        {renderHeader()}
        {renderImagePicker()}
        {renderTextField()}

        <TouchableOpacity
          style={{
            position: 'absolute',
            marginTop: PIXEL.pixelSizeVertical(630),
          }}
          onPress={() => {}}>
          <BackgroundButton text="Xong"></BackgroundButton>
        </TouchableOpacity>
      </Animated.View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['40%', PIXEL.pixelSizeVertical(-100)]}
        renderContent={renderInner}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
        borderRadius={10}
      />
    </View>
  );
}

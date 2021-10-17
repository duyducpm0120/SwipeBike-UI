import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {BackgroundButton, RoundedImage} from '../components';
import DatePicker from 'react-native-date-picker';
import {TextInput, configureFonts, DropDown} from 'react-native-paper';

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

  //Dropdown field
  const [showDropDown, setShowDropDown] = useState(false);

  const genderList = [
    {
      label: 'Nam',
      value: 'male',
    },
    {
      label: 'Nữ',
      value: 'female',
    },
    {
      label: 'Khác',
      value: 'others',
    },
  ];

  //DatePicker Field
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

  //
  const [info, setInfo] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
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
            image={IMAGES.updateImage}
            width={PIXEL.pixelSizeHorizontal(100)}
            height={PIXEL.pixelSizeHorizontal(100)}></RoundedImage>
          <TouchableOpacity
            style={{
              marginTop: 5,
            }}
            onPress={() => {}}>
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
          width: PIXEL.pixelSizeHorizontal(330),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginVertical: PIXEL.pixelSizeVertical(10),
          }}>
          <TextInput
            label="Tên đại diện"
            mode="outlined"
            value={name}
            theme={{
              colors: {
                primary: COLORS.primary,
              },
            }}
            style={{
              width: '100%',
              height: PIXEL.pixelSizeVertical(50),
              fontSize: PIXEL.fontPixel(18),
              paddingHorizontal: 0,
            }}
            onChangeText={name => setName(name)}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
            width: '100%',
            marginVertical: PIXEL.pixelSizeVertical(10),
          }}>
          {/* <DropDown
            label={'Giới tính'}
            mode={'outlined'}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={sex}
            setValue={setSex}
            list={genderList}
          /> */}
          {/* Dropdown field */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: COLORS.primaryLighter1,
            width: '100%',
            height: PIXEL.pixelSizeVertical(50),
            marginVertical: PIXEL.pixelSizeVertical(10),
            paddingHorizontal: PIXEL.pixelSizeHorizontal(5),
          }}>
          <Image
            source={ICONS.birthday}
            style={{
              width: PIXEL.pixelSizeHorizontal(24),
              height: PIXEL.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <Text
            style={{
              ...FONTS.h3,
              marginLeft: PIXEL.pixelSizeHorizontal(15),
              width: PIXEL.pixelSizeHorizontal(240),
              paddingLeft: 5,
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
      </View>
    );
  }

  return (
    <View style={STYLES.container}>
      {renderHeader()}
      {renderImagePicker()}
      {renderTextField()}
      <TouchableOpacity
        style={{
          position: 'absolute',
          marginTop: PIXEL.pixelSizeVertical(615),
        }}
        onPress={() => {}}>
        <BackgroundButton text="Xong"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

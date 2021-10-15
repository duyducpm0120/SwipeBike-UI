import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {BackgroundButton, RoundedImage} from '../components';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';

export default function UpdateProfile(props) {
  //Gender Dropdown Field
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Nam', value: 'male'},
    {label: 'Nữ', value: 'female'},
  ]);

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
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
            width: '100%',
            marginVertical: PIXEL.pixelSizeVertical(10),
          }}>
          <Image
            source={ICONS.profile}
            style={{
              width: PIXEL.pixelSizeHorizontal(24),
              height: PIXEL.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Tên đại diện"
            style={{
              ...FONTS.h3,
              marginLeft: PIXEL.pixelSizeHorizontal(15),
              width: PIXEL.pixelSizeHorizontal(270),
            }}></TextInput>
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
          <Image
            source={ICONS.gender}
            style={{
              width: PIXEL.pixelSizeHorizontal(24),
              height: PIXEL.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            disableBorderRadius={true}
            containerStyle={{
              marginLeft: PIXEL.pixelSizeHorizontal(15),
              width: PIXEL.pixelSizeHorizontal(270),
            }}
            placeholder="Chọn giới tính"
            textStyle={{...FONTS.h3}}
            style={{backgroundColor: COLORS.backGroundColor}}
          />
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
        <BackgroundButton text="Gửi xác nhận"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

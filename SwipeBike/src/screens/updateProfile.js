import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
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

  //Sex radioButton field
  const [checked, setChecked] = React.useState('first');

  //DatePicker Field
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

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

        {/* birthDay */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
            marginBottom: PIXEL.pixelSizeVertical(10),
          }}>
          <Text style={{...FONTS.h2Bold}}>Sinh nhật</Text>
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
          <Text style={{...FONTS.h2Bold}}>Tên đại diện</Text>
          <TextInput
            //mode="outlined"
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
            onChangeText={name => setName(name)}></TextInput>
        </View>
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={STYLES.container}>
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
    </SafeAreaView>
  );
}

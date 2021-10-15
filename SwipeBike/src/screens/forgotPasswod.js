import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {BackgroundButton} from '../components';

export default function ForgotPassword(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [info, setInfo] = useState({});
  function CheckPassword(inputtxt) {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (inputtxt.value.match(passw)) {
      alert('Correct, try another...');
      return true;
    } else {
      alert('Wrong...!');
      return false;
    }
  }
  function renderHeader() {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          marginTop: PIXEL.pixelSizeVertical(150),
        }}>
        <Text style={FONTS.title}>Quên mật khẩu</Text>
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
            source={ICONS.email}
            style={{
              width: PIXEL.pixelSizeHorizontal(24),
              height: PIXEL.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Email"
            style={{
              ...FONTS.h3,
              marginLeft: PIXEL.pixelSizeHorizontal(15),
              width: PIXEL.pixelSizeHorizontal(270),
            }}></TextInput>
        </View>
      </View>
    );
  }

  return (
    <View style={STYLES.container}>
      {renderHeader()}
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

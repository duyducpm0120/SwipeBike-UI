import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {BackgroundButton} from '../components';

export default function SignUp(props) {
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
        <Text style={FONTS.h1}>Xin chào,</Text>
        <Text style={FONTS.title}>Tạo một tài khoản</Text>
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
            source={ICONS.lock}
            style={{
              width: PIXEL.pixelSizeHorizontal(24),
              height: PIXEL.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Mật khẩu"
            style={{
              ...FONTS.h3,
              marginLeft: PIXEL.pixelSizeHorizontal(15),
              width: PIXEL.pixelSizeHorizontal(270),
            }}
            secureTextEntry={showPassword ? false : true}
            maxLength={14}></TextInput>
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? ICONS.show : ICONS.hide}
              style={{
                width: PIXEL.pixelSizeHorizontal(24),
                height: PIXEL.pixelSizeHorizontal(24),
                tintColor: COLORS.lightGray1,
              }}></Image>
          </TouchableOpacity>
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
            source={ICONS.repeatPassword}
            style={{
              width: PIXEL.pixelSizeHorizontal(24),
              height: PIXEL.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Nhập lại mật khẩu"
            style={{
              ...FONTS.h3,
              marginLeft: PIXEL.pixelSizeHorizontal(15),
              width: PIXEL.pixelSizeHorizontal(270),
            }}
            secureTextEntry={showPassword ? false : true}
            maxLength={14}></TextInput>
        </View>
      </View>
    );
  }
  function renderTextInfo() {
    return (
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          marginVertical: PIXEL.pixelSizeVertical(10),
        }}>
        <Text style={{...FONTS.h4, fontStyle: 'italic'}}>
          Lưu ý: Email đăng ký phải là email của trường đại học
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{...FONTS.h3}}>Bạn đã có tài khoản?</Text>
          <TouchableOpacity
            style={{
              marginLeft: 5,
            }}
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                textDecorationLine: 'underline',
              }}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={STYLES.container}>
      {renderHeader()}
      {renderTextField()}
      {renderTextInfo()}
      <TouchableOpacity
        style={{
          position: 'absolute',
          marginTop: PIXEL.pixelSizeVertical(615),
        }}
        onPress={() => {}}>
        <BackgroundButton text="Đăng ký"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}
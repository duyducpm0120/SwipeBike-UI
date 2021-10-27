import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {FONTS, SIZES, COLORS, PIXEL, ICONS, IMAGES, STYLES} from '../constants';
import {BackgroundButton} from '../components';
import {signUpApi, loginApi} from '../api/auth';

export default function Login(props) {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  //To check a password between 7 to 16 characters which contain only characters,
  //numeric digits, underscore and first character must be a letter
  function ValidatePassword(password) {
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (password.match(passw)) {
      //alert('Correct, try another...');
      return true;
    } else {
      //alert('Wrong...!');
      return false;
    }
  }
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
        <Text style={FONTS.title}>Đăng nhập</Text>
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
            }}
            onChangeText={email => setUserEmail(email)}></TextInput>
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
            maxLength={14}
            onChangeText={password => setUserPassword(password)}></TextInput>
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
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate('ForgotPassword');
          }}>
          <Text
            style={{
              ...FONTS.h3,
              textDecorationLine: 'underline',
            }}>
            Quên mật khẩu?
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
          }}>
          <Text style={{...FONTS.h3}}>Bạn chưa có tài khoản?</Text>
          <TouchableOpacity
            style={{
              marginLeft: 5,
            }}
            onPress={() => {
              props.navigation.navigate('SignUp');
            }}>
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                textDecorationLine: 'underline',
              }}>
              Đăng ký
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
          marginTop: PIXEL.pixelSizeVertical(630),
        }}
        onPress={() => {
          //validate Inputs
          if (!ValidateEmail(userEmail)) {
            console.log('invalid email');
            Alert.alert('Email không hợp lệ', '', [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ]);
            return;
          }
          if (!ValidatePassword(userPassword)) {
            console.log('invalid password');
            //Mật khẩu có 7 đến 16 ký tự chỉ chứa các ký tự, chữ số, dấu gạch dưới và ký tự đầu tiên phải là một chữ cái
            Alert.alert(
              'Mật khẩu không hợp lệ',
              'Mật khẩu có 7 đến 16 ký tự chỉ chứa các ký tự, chữ số, dấu gạch dưới và ký tự đầu tiên phải là một chữ cái',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
            );
            return;
          }
          //login
          loginApi(userEmail, userPassword)
            .then(result => {
              console.log(result.data);
              props.navigation.navigate('UpdateProfile');
            })
            .catch(err => {
              console.log(err);
            });
        }}>
        <BackgroundButton text="Đăng nhập"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

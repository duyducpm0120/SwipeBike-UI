import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  FONTS,
  SIZES,
  COLORS,
  RESPONSIVE,
  ICONS,
  IMAGES,
  STYLES,
} from '../constants';
import {BackgroundButton} from '../components';
import {signUpApi, loginApi, sendFcmToken, verifyEmail} from '../api';
import {
  saveTokenToLocalStorage,
  loadTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from '../storage';

import {updateToken} from '../redux/slices/loginTokenSlice';
import {fetchProfile} from '../redux/slices/profileSlice';
import {fetchLoginToken} from '../redux/slices/loginTokenSlice';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import {useSelector, useDispatch} from 'react-redux';
import { fetchHasNewNoti } from '../redux/slices/isNewNotiSlice';

export default function Login(props) {
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const userProfile = useSelector(state => state.userProfile.userProfile);
  const userProfileStatus = useSelector(state => state.userProfile.status);

  function verifyUser() {
    props.navigation.navigate('Home');
    
    // if (userProfile.IsVerified === true) props.navigation.navigate('Home');
    // else {
    //   Alert.alert(
    //     'Email chưa được xác thực',
    //     'Email của bạn hiện chưa được xác thực. Nhấn "OK" để nhận email xác thực',
    //     [
    //       {
    //         text: 'OK',
    //         onPress: () => {
    //           verifyEmail(userEmail, userPassword)
    //             .then(res => console.log('verify email success', res.status))
    //             .catch(err => console.log('verify email err', err));
    //         },
    //       },
    //       {
    //         text: 'Huỷ',
    //         onPress: () => {},
    //       },
    //     ],
    //   );
    // }
  }

  function login() {
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
    //console.log('valid information');
    dispatch(updateIsLoading(true));
    //login
    loginApi(userEmail, userPassword)
      .then(async result => {
        //Register Device for FCM push notifications
        sendFcmToken(result.data.token);
        
        await removeTokenFromLocalStorage();
        await saveTokenToLocalStorage(result.data.token);
        dispatch(fetchProfile(result.data.token));
        dispatch(fetchHasNewNoti(result.data.token));
        dispatch(fetchLoginToken());
        dispatch(updateIsLoading(false));
      })
      .catch(err => {
        console.log(JSON.stringify(err.response.data.error));
        Alert.alert('Có lỗi', err.response.data.error.code, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        dispatch(updateIsLoading(false));
      });
  }

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
  }
  //To check a password between 7 to 16 characters which contain only characters,
  //numeric digits, underscore and first character must be a letter
  function ValidatePassword(password) {
    return true;
    var passw = /^[A-Za-z]\w{7,14}$/;
    if (password.match(passw)) {
      //alert('Correct, try another...');
      return true;
    } else {
      //alert('Wrong...!');
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
          marginTop: RESPONSIVE.pixelSizeVertical(150),
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
          width: RESPONSIVE.pixelSizeHorizontal(330),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
            width: '100%',
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Image
            source={ICONS.email}
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(24),
              height: RESPONSIVE.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Email"
            style={{
              ...FONTS.h3,
              marginLeft: RESPONSIVE.pixelSizeHorizontal(15),
              width: RESPONSIVE.pixelSizeHorizontal(270),
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
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <Image
            source={ICONS.lock}
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(24),
              height: RESPONSIVE.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Mật khẩu"
            style={{
              ...FONTS.h3,
              marginLeft: RESPONSIVE.pixelSizeHorizontal(15),
              width: RESPONSIVE.pixelSizeHorizontal(270),
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
                width: RESPONSIVE.pixelSizeHorizontal(24),
                height: RESPONSIVE.pixelSizeHorizontal(24),
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
          marginVertical: RESPONSIVE.pixelSizeVertical(10),
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

  useEffect(() => {
    if(userProfileStatus==="succeeded")
      verifyUser();
  },[userProfileStatus]);
  return (
    <View style={STYLES.container}>
      {renderHeader()}
      {renderTextField()}
      {renderTextInfo()}
      <TouchableOpacity
        style={{
          position: 'absolute',
          marginTop: RESPONSIVE.pixelSizeVertical(630),
        }}
        onPress={() => {
          login();
        }}>
        <BackgroundButton text="Đăng nhập"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

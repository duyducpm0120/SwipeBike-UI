import React, {useState} from 'react';
import {View, Text, Image, TextInput, TouchableOpacity, Alert} from 'react-native';
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
import {resetPassword} from '../api';
import {useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';

export default function ForgotPassword(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();

  function sendResetRequest() {
    if (!ValidateEmail(email)) {
      console.log('invalid email');
      Alert.alert('Email không hợp lệ', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    dispatch(updateIsLoading(true));
    resetPassword(email)
      .then(res => {
        dispatch(updateIsLoading(false));
        Alert.alert('Hãy check email của bạn để đổi mật khẩu mới', '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      })
      .catch(err => {
        console.log('err', err);
        dispatch(updateIsLoading(false));
        Alert.alert('Có lỗi xảy ra, vui lòng thử lại', '', [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      });
  }

  function ValidateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }
    return false;
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
            onChangeText={text => {
              setEmail(text);
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
          marginTop: RESPONSIVE.pixelSizeVertical(630),
        }}
        onPress={() => {
          sendResetRequest();
        }}>
        <BackgroundButton text="Gửi xác nhận"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

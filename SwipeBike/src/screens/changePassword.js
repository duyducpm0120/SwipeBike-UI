import React, {useState} from 'react';
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
import {resetPassword} from '../api';
import {useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [lastPassword, setLastPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
          {text: 'OK', onPress: () => props.navigation.goBack()},
        ]);
      })
      .catch(err => {
        console.log('err', err);
        dispatch(updateIsLoading(false));
        Alert.alert('Có lỗi xảy ra, vui lòng thử lại', '', [
          {text: 'OK', onPress: () => props.navigation.goBack()},
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
        <Text style={FONTS.title}>Đổi mật khẩu</Text>
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
          <TextInput
            placeholder="Mật khẩu cũ"
            style={{
              ...FONTS.h3,
              marginLeft: RESPONSIVE.pixelSizeHorizontal(15),
              width: RESPONSIVE.pixelSizeHorizontal(270),
            }}
            secureTextEntry={showPassword ? false : true}
            maxLength={14}
            onChangeText={password => setLastPassword(password)}></TextInput>
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            borderRadius: 10,
            width: '100%',
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
          }}>
          <TextInput
            placeholder="Mật khẩu mới"
            style={{
              ...FONTS.h3,
              marginLeft: RESPONSIVE.pixelSizeHorizontal(15),
              width: RESPONSIVE.pixelSizeHorizontal(270),
            }}
            secureTextEntry={showPassword ? false : true}
            maxLength={14}
            onChangeText={password => setNewPassword(password)}></TextInput>
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
        <BackgroundButton text="OK"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

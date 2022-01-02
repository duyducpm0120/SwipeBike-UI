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
import {resetPassword, updatePassword} from '../api';
import {useDispatch, useSelector} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';

export default function ChangePassword(props) {
  const dispatch = useDispatch();
  const userProfile = useSelector(state => state.userProfile.userProfile);
  const [showPassword, setShowPassword] = useState(false);
  const [lastPassword, setLastPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  function changePassword () { 
    if (!ValidatePassword(newPassword)) {
      console.log('invalid password');
      //Mật khẩu có 7 đến 16 ký tự chỉ chứa các ký tự, chữ số, dấu gạch dưới và ký tự đầu tiên phải là một chữ cái
      Alert.alert(
        'Mật khẩu mới không hợp lệ',
        'Mật khẩu có 7 đến 16 ký tự chỉ chứa các ký tự, chữ số, dấu gạch dưới và ký tự đầu tiên phải là một chữ cái',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
      return;
    }
    dispatch(updateIsLoading(true));
    updatePassword(lastPassword,newPassword,userProfile.UserEmail).then(res => {
      //console.log( "update password success",res);
      Alert.alert('Cập nhật mật khẩu thành công', "Bạn đã cập nhật mật khẩu thành công", [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      dispatch(updateIsLoading(false));
    }).catch(err => {
      //console.log("update password err", err);
      Alert.alert('Có lỗi', err.response.data.error.code, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      dispatch(updateIsLoading(false));
    })
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
          changePassword();
        }}>
        <BackgroundButton text="OK"></BackgroundButton>
      </TouchableOpacity>
    </View>
  );
}

import React, {useState,useRef} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import {FONTS, COLORS, RESPONSIVE, ICONS, STYLES} from '../constants';
import {BackgroundButton} from '../components';
import {signUpApi} from '../api';
import {Snackbar} from 'react-native-paper';
import {useDispatch} from 'react-redux';
import {updateIsLoading} from '../redux/slices/isLoadingSlice';
import Uni from '../utils/UniList.json';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignUp(props) {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userPassword, setUserPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const userEmailInputRef = useRef();

  //Snackbar field
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);

  //Email dropdown field
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(
    Uni.map(item => {
      return {
        label: item.UniversityEmailSuffix,
        value: item.UniversityEmailSuffix,
      };
    }),
  );
  const [emailSuffixValue, setEmailSuffixValue] = useState(items[0].label);
  const [emailPrefixValue, setUserPrefixValue] = useState('');

  function getUniId (){
    return UniId = Uni.filter(uni => uni.UniversityEmailSuffix == emailSuffixValue)[0].UniversityId;
  }

  function SignUp() {
    const userEmail = emailPrefixValue + emailSuffixValue;
    //validate inputs
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
    if (userPassword != repeatPassword) {
      console.log('invalid repeat password');
      Alert.alert('Nhập lại mật khẩu không khớp', '', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      return;
    }
    dispatch(updateIsLoading(true));
    signUpApi(userEmail, userPassword,getUniId())
      .then(result => {
        console.log(result.data);
        dispatch(updateIsLoading(false));
        onToggleSnackBar();
      })
      .catch(err => {
        console.log(err);
        dispatch(updateIsLoading(false));
      });
    console.log(userEmail,getUniId());
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
          width: RESPONSIVE.pixelSizeHorizontal(330),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            // width: '100%',
            marginVertical: RESPONSIVE.pixelSizeVertical(10),
            zIndex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: 10,
              width: '40%',
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
              ref={userEmailInputRef}
              placeholder="Email"
              style={{
                ...FONTS.h3,
                marginLeft: RESPONSIVE.pixelSizeHorizontal(15),
                width: RESPONSIVE.pixelSizeHorizontal(110),
              }}
              onChangeText={email => {
                setUserPrefixValue(email);
                // console.log("email prefix",emailPrefixValue);
                // console.log(emailPrefixValue + emailSuffixValue);
              }}
              ></TextInput>
          </View>
          <View style={{width: '60%'}}>
            <DropDownPicker
              placeholder={items[0].label}
              open={open}
              value={emailSuffixValue}
              items={items}
              setOpen={setOpen}
              setValue={setEmailSuffixValue}
              setItems={setItems}
              style={{
                backgroundColor: COLORS.backGroundColor,
                borderColor: 'transparent',
              }}
              textStyle={{
                ...FONTS.h3,
              }}
            />
          </View>
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
            source={ICONS.repeatPassword}
            style={{
              width: RESPONSIVE.pixelSizeHorizontal(24),
              height: RESPONSIVE.pixelSizeHorizontal(24),
              tintColor: COLORS.lightGray1,
            }}></Image>
          <TextInput
            placeholder="Nhập lại mật khẩu"
            style={{
              ...FONTS.h3,
              marginLeft: RESPONSIVE.pixelSizeHorizontal(15),
              width: RESPONSIVE.pixelSizeHorizontal(270),
            }}
            secureTextEntry={showPassword ? false : true}
            maxLength={14}
            onChangeText={pass => {
              setRepeatPassword(pass);
            }}></TextInput>
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
          marginTop: RESPONSIVE.pixelSizeVertical(630),
        }}
        onPress={() => {
          SignUp();
        }}>
        <BackgroundButton text="Đăng ký"></BackgroundButton>
      </TouchableOpacity>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            // Do something
            onDismissSnackBar();
            props.navigation.navigate('Login');
          },
        }}>
        Đăng ký thành công
      </Snackbar>
    </View>
  );
}

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
//Ignore Reanimated 2 WARNING
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
LogBox.ignoreLogs(['Each child in a list should have a unique "key" prop.']);
import {
  Splash,
  SignUp,
  Login,
  ForgotPassword,
  UpdateProfile,
  TripsScreen,
  GoogleMapView,
  CreateTrip,
  TripInfo,
  RecommendTrip,
  Profile,
} from './src/screens';
import {STYLES} from './src/constants';
import {Waiting} from './src/components';
import BottomTabs from './src/navigations/bottomTabs';
import {loadTokenFromLocalStorage} from '../SwipeBike/src/storage';
import {useDispatch} from 'react-redux';
import {updateToken} from './src/redux/slices/loginTokenSlice';
import {fetchProfile} from './src/redux/slices/profileSlice';
import {fetchLoginToken} from './src/redux/slices/loginTokenSlice';
const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState(true);

  //FCM Token Registration
  const sendFcmToken = async () => {
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging()
      .getToken()
      .catch(err => {
        console.log(err);
      });
    console.log('Firebase token ', token);
    axios
      .post('http://10.0.2.2:3001/notification/register', {token})
      .then(result => {
        //console.log(result);
      });
  };

  ///FCM token
  useEffect(() => {
    sendFcmToken();
  }, []);

  ///Fetch Redux data when token loaded
  useEffect(() => {
    if (token) {
      const fetchData = async () => {
        console.log('begin');
        await Promise.all([dispatch(fetchProfile(token))])
          .then(res => console.log(res))
          .catch(err => console.log(err))
          .finally(() => {
            setIsLoading(false);
            console.log('finally' + isLoading);
          });
      };
      fetchData();
    }
  }, [token]);

  useEffect(() => {
    loadTokenFromLocalStorage().then(res => setToken(res));
    //fetch token to redux
    dispatch(fetchLoginToken());
  }, []);

  return isLoading ? (
    <View
      style={{
        ...STYLES.container,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Waiting />
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Login'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="TripsScreen" component={TripsScreen} />
        <Stack.Screen name="GoogleMapView" component={GoogleMapView} />
        <Stack.Screen name="CreateTrip" component={CreateTrip} />
        <Stack.Screen name="TripInfo" component={TripInfo} />
        <Stack.Screen name="RecommendTrip" component={RecommendTrip} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;

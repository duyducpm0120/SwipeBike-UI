/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {Image, Text, StyleSheet, View, Dimensions, Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
//Ignore Reanimated 2 WARNING
import {LogBox} from 'react-native';
LogBox.ignoreLogs (['Reanimated 2']);
LogBox.ignoreLogs (['Each child in a list should have a unique "key" prop.']);

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
} from './src/screens';
import {COLORS, STYLES} from './src/constants';
import {Waiting} from './src/components';
import BottomTabs from './src/navigations/bottomTabs';

const Stack = createStackNavigator ();
const App = () => {
  //FCM Token Registration
  const sendFcmToken = async () => {
    await messaging ().registerDeviceForRemoteMessages ();
    const token = await messaging ().getToken ().catch (err => {
      console.log (err);
    });
    console.log ('token ', token);
    axios
      .post ('http://10.0.2.2:3001/notification/register', {token})
      .then (result => {
        console.log (result);
      });
  };

  useEffect (() => {
    sendFcmToken ();
  }, []);

  const [isLoading, setIsLoading] = useState (true);
  useEffect (
    () => {
      // const fetchData = async () => {
      //   console.log('begin');
      //   await Promise.all([dispatch(fetchSearch()), dispatch(fetchFind())])
      //     .catch(err => console.log(err))
      //     .finally(() => {
      //       setIsLoading(false);
      //       console.log('finally' + isLoading);
      //     });
      // };
      // fetchData();
      setTimeout (() => {
        setIsLoading (false);
      }, 3000);
    },
    [isLoading]
  );
  return isLoading
    ? <View
        style={{
          ...STYLES.container,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Waiting />
      </View>
    : <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Login'}
        >
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
        </Stack.Navigator>
      </NavigationContainer>;
};

const styles = StyleSheet.create ({
  container: {
    flex: 1,
  },
});

export default App;

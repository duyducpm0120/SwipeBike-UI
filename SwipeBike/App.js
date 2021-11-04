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
} from './src/screens';
import {COLORS, STYLES} from './src/constants';
import {Waiting} from './src/components';
import BottomTabs from './src/navigations/bottomTabs';

const Stack = createStackNavigator();
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
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
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, [isLoading]);
  return isLoading ? (
    <View
      style={{
        ...STYLES.container,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Waiting></Waiting>
    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Home" component={BottomTabs} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="TripsScreen" component={TripsScreen} />
        <Stack.Screen name="GoogleMapView" component={GoogleMapView} />
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

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

import {Splash, SignUp, Login, ForgotPassword} from './src/screens';
import {COLORS, STYLES} from './src/constants';
import {Waiting} from './src/components';
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
        initialRouteName={'SignUp'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
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

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import {Image, Text, StyleSheet, View, Dimensions, Button} from 'react-native';
import {icons, images, SIZES, FONTS, COLORS, PIXEL} from './src/constants';
import {NavigationContainer} from '@react-navigation/native';
import {Waiting} from './src/components';

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text style={FONTS.title}>Chuyen di</Text>
        <Waiting></Waiting>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginTop: 40,
  },
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import icons from './src/constants/icons';

const App = () => {
  return (
    <View>
      <Text>AAAAAAAAaa</Text>
      <Image
        source={icons.cameraBold}
        tintColor="red"
        style={{width: 50, height: 50}}></Image>
      <Image
        source={icons.email}
        tintColor="red"
        style={{width: 50, height: 50}}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

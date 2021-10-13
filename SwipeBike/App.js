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

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Text style={FONTS.title}>Chuyen di</Text>
        <Button title="AAA"></Button>
        <Image
          source={icons.cameraBold}
          tintColor="red"
          style={{width: 50, height: 50}}></Image>
        <Image source={images.cuteDriver}></Image>
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

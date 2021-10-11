/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Image, Text, StyleSheet, View, Dimensions, Button} from 'react-native';
import {icons, images, SIZES, FONTS, COLORS} from './src/constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const App = () => {
  return (
    <View style={styles.container}>
      <Text style={FONTS.title}>Chuyen di</Text>
      <Button
        title="AAAs"
        onClick={console.log(windowWidth, windowHeight)}></Button>
      <Image
        source={icons.cameraBold}
        tintColor="red"
        style={{width: 50, height: 50}}></Image>
      <Image source={images.cuteDriver}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 30,
    marginTop: 40,
  },
});

export default App;

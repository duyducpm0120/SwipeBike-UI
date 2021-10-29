import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';

//Ignore Mapbox warning
Logger.setLogCallback(log => {
  const {message} = log;

  // expected warnings - see https://github.com/mapbox/mapbox-gl-native/issues/15341#issuecomment-522889062
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

MapboxGL.setAccessToken(
  'sk.eyJ1IjoiZHV5ZHVjIiwiYSI6ImNrdmIyZTg3eDAybzkycW1wcWQ5bzcydmUifQ.e0MwCEpWohvpAkDmVSK8wQ',
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default function MapViewing() {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapboxGL.MapView style={styles.map} />
      </View>
    </View>
  );
}

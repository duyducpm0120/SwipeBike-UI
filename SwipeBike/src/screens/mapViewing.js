import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

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

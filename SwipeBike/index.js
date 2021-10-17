/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import store from './src/redux/store';
function app() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <App></App>
      </PaperProvider>
    </Provider>
  );
}
AppRegistry.registerComponent(appName, () => app);

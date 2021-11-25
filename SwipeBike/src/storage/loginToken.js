import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localStorage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: 1000 * 3600 * 24,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

const saveTokenToLocalStorage = async token => {
  //Saving token to localStorage
  await localStorage.save({
    key: 'loginToken', // Note: Do not use underscore("_") in key!
    data: {
      token: token,
    },
    // if expires not specified, the defaultExpires will be applied instead.
    // if set to null, then it will never expire.
    // expires: 1000 * 3600,
    expires: null,
  });
};

const loadTokenFromLocalStorage = async () => {
  let token = null;
  await localStorage
    .load({
      key: 'loginToken',
    })
    .then(ret => {
      // found data goes to then()
      console.log('Local storage token loaded');
      token = ret.token;
    })
    .catch(err => {
      // any exception including data not found
      // goes to catch()
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    });
  return token;
};

const removeTokenFromLocalStorage = async () => {
  await localStorage.remove({
    key: 'loginToken',
  });
  console.log('token removed');
};

export {
  saveTokenToLocalStorage,
  loadTokenFromLocalStorage,
  removeTokenFromLocalStorage,
};

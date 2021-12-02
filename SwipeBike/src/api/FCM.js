import axios from 'axios';
import messaging from '@react-native-firebase/messaging';

export const sendFcmToken = async authenToken => {
  await messaging ().registerDeviceForRemoteMessages ();
  const token = await messaging ().getToken ().catch (err => {
    console.log (err);
  });
  console.log ('Firebase token ', token);
  return axios.post (
    'http://10.0.2.2:3001/notification/register',
    {token},
    {
      headers: {
        Authorization: `Bearer ${authenToken}`,
      },
    }
  );
};


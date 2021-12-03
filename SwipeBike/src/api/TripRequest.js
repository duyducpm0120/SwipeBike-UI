import axios from 'axios';

export const sendTripRequest = (myTripId, theirTripId, token) => {
  return axios.post(
    'http://10.0.2.2:3001/tripRequest/sendRequest/',
    {
      MyTripId: myTripId,
      TheirTripId: theirTripId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

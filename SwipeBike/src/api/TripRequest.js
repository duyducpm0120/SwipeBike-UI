import axios from 'axios';

export const sendTripRequest = (myTripId, theirTripId, token) => {
  return axios.post(
    'http://10.0.2.2:3001/tripRequest/sendRequest',
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

export const getUserPendingSentRequests = token => {
  return axios.get(
    'http://10.0.2.2:3001/tripRequest/getUserPendingSentRequests',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getUserPendingReceivedRequests = token => {
  return axios.get(
    'http://10.0.2.2:3001/tripRequest/getUserPendingReceivedRequests',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const cancelTripRequest = (token, tripRequestId) => {
  return axios.post(
    'http://10.0.2.2:3001/tripRequest/cancelRequest/' + tripRequestId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const rejectTripRequest = (token, tripRequestId) => {
  return axios.post(
    'http://10.0.2.2:3001/tripRequest/rejectRequest/' + tripRequestId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const acceptTripRequest = (token, tripRequestId) => {
  return axios.post(
    'http://10.0.2.2:3001/tripRequest/acceptRequest/' + tripRequestId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

import axios from 'axios';

export const getTrips = token => {
  return axios.get('http://10.0.2.2:3001/trip/getMyTrips', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const cancelTrip = (tripId,token,) => {
  return axios.post('http://10.0.2.2:3001/trip/cancelTrip/' + tripId, {},{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

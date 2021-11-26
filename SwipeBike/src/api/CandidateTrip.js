import axios from 'axios';

export function createCandidateTrip(trip, token) {
  return axios.post('http://10.0.2.2:3001/candidatetrip/create', trip, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function getUserTrips(UserId, token) {
  return axios.get(
    'http://10.0.2.2:3001/candidatetrip/getbycreator/' + UserId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export const getCandidateTripRecommendations = (tripId, token) => {
  return axios.get(
    'http://10.0.2.2:3001/candidatetrip/recommendation/' + tripId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};
export const getCandidateTripByCreator = (creatorId, token) => {
  return axios.get(
    'http://10.0.2.2:3001/candidatetrip/recommendation/' + creatorId,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export default {createCandidateTrip};

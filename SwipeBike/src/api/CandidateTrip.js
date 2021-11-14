import axios from 'axios';

export function createCandidateTrip (trip, token) {
  return axios.post ('http://10.0.2.2:3001/candidatetrip/create', trip, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export function getUserTrips(UserId){
    return axios.get('http://10.0.2.2:3001/candidatetrip/getbycreator/' + UserId);
}

export default{createCandidateTrip}
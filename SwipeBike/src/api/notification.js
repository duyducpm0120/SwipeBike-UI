import axios from 'axios';

export const getUserNotifications = token => {
  return axios.get ('http://10.0.2.2:3001/notification/getMyNotifications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

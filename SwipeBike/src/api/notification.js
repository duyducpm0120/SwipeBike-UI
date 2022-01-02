import axios from 'axios';

export const getUserNotifications = token => {
  return axios.get('http://10.0.2.2:3001/notification/getMyNotifications', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setNotificationAsRead = (notificationId, token) => {
  return axios.post(
    'http://10.0.2.2:3001/notification/setNotificationAsRead/' + notificationId,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const setAllMyNotificationsAsRead = token => {
  return axios.post(
    'http://10.0.2.2:3001/notification/setAllMyNotificationsAsRead',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const hasNewNotifications = token => {
  return axios.get(
    'http://10.0.2.2:3001/notification/hasNewNotifications',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

import axios from 'axios';

export const updateProfilePic = (pic, token) => {
  let formData = new FormData();
  formData.append('file', {
    uri: pic.uri,
    type: pic.type,
    name: pic.fileName,
  });

  return axios.post('http://10.0.2.2:3001/profile/updatePic', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const loadUserProfile = token => {
  return axios.get('http://10.0.2.2:3001/profile/view', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const setupUserProfile = (info, token) => {
  return axios.post('http://10.0.2.2:3001/profile/setup', info, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = (info, token) => {
  return axios.post('http://10.0.2.2:3001/profile/update', info, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getProfileById = (id, token) => {
  return axios.get('http://10.0.2.2:3001/profile/getProfileById/' + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

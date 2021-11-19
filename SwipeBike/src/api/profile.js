import axios from 'axios';

export const updateProfilePic = (picUri, token) => {
  // let formData = new FormData();
  // formData.append('file', {
  //   uri: picUri,
  //   type: 'image/jpg',
  //   name: '',
  // });

  return axios.post(
    'http://10.0.2.2:3001/profile/updatePic',
    {},
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

import axios from 'axios';

export const updateProfilePic = (pic, token) => {
   let formData = new FormData();
   formData.append('file', {
     uri: pic.uri,
     type: pic.type,
     name: pic.fileName
     
   });

  return axios.post(
    'http://10.0.2.2:3001/profile/updatePic',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

import axios from 'axios';
export const signUpApi = (email, password, uniId) => {
  return axios.post('http://10.0.2.2:3001/auth/signUp', {
    UserEmail: email,
    AccountPassword: password,
    UniversityId: uniId,
  });
};

export const loginApi = (email, password) => {
  return axios.post('http://10.0.2.2:3001/auth/login', {
    UserEmail: email,
    AccountPassword: password,
  });
};

export const resetPassword = email => {
  return axios.post('http://10.0.2.2:3001/auth/resetPassword', {
    UserEmail: email,
  });
};

export const verifyEmail = (email, password) => {
  return axios.post('http://10.0.2.2:3001/auth/resetPassword', {
    UserEmail: email,
    AccountPassword: password,
  });
};

export default {signUpApi, loginApi};

import axios from 'axios';
export const signUpApi = (email, password) => {
  return axios.post('http://10.0.2.2:3001/auth/signUp', {
    UserEmail: email,
    AccountPassword: password,
  });
};

export const loginApi = (email, password) => {
  return axios.post('http://10.0.2.2:3001/auth/login', {
    UserEmail: email,
    AccountPassword: password,
  });
};

export default {signUpApi,loginApi};
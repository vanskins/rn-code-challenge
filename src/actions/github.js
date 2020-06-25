import axios from 'axios';

const apiConfig = {
  baseURL: 'https://dev-4ccxy-21.us.auth0.com',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
    Authorization: 'Bearer kFPBNfbMEaIeStxnGKQHiB_Hj0KKjU7M',
  },
};

const api = axios.create(apiConfig);
export const getUserProfile = () => {
  return api
    .get('/userinfo')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error', error);
      return error;
    });
};

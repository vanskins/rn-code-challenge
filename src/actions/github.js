import axios from 'axios';

const apix = (token) => {
  const apiConfig = {
    baseURL: 'https://dev-4ccxy-21.us.auth0.com',
    headers: {
      'Content-type': 'application/json',
      Accept: 'application/vnd.github.v3+json',
      Authorization: `Bearer ${token}`,
    },
  };
  
  const api = axios.create(apiConfig);
  return api;
}

export const getUserProfile = (token) => {
  return apix(token)
    .get('/userinfo')
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log('error', error);
      return error;
    });
};

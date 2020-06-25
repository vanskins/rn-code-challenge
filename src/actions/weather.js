import axios from 'axios';

const apiConfig = {
  baseURL: 'https://api.openweathermap.org',
};

const api = axios.create(apiConfig);
const apikey = '2ace83844c5429a78e73f933723ccaf9';
export const getWeatherForcast = (location) => {
  const {latitude, longitude} = location;
  console.log(location, 'locationosa');

  return api
    .get(`/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}`)
    .then((response) => {
      console.log('axios', response);
      return response;
    })
    .catch((error) => {
      console.log('error', error);
      return error;
    });
};

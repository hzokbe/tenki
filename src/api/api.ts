import axios from 'axios';

export const weatherAPI = axios.create({
  baseURL: 'https://api.open-meteo.com/v1',
});

export const reverseGeocodingAPI = axios.create({
  baseURL: 'https://nominatim.openstreetmap.org',
});

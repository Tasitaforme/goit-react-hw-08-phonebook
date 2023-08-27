import axios from 'axios';

export const instanceForContacts = axios.create({
  baseURL: 'https://64e00f7b71c3335b258335c1.mockapi.io/',
});

export const instanceForAuth = axios.create({
  baseURL: 'https://connections-api.herokuapp.com/',
});

export const setToken = token => {
  instanceForAuth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const dellToken = () => {
  instanceForAuth.defaults.headers.common['Authorization'] = '';
};
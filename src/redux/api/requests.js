// //* якщо в нас запити з одного сайту то можемо лише встановити базовий URL для axios:

// import axios from 'axios';

// // Встановлення базового URL для axios
// axios.defaults.baseURL = 'https://64e00f7b71c3335b258335c1.mockapi.io/';

// export const getAllContacts = async () => {
//   const { data } = await axios('contacts');
//   return data;
// };

// export const postContact = async newContact => {
//   const { data } = await axios.post('contacts', newContact);
//   return data;
// };

// export const deleteСontact = async id => {
//   const { data } = await axios.delete(`contacts/${id}`);
//   return data;
// };



// //* якщо в нас запити з різних сайтів то будемо використовувати axios.create instance для кожного URL:
// import { dellToken, instanceForAuth, instanceForContacts, setToken } from './api';

// export const getAllContacts = async () => {
//   const { data } = await instanceForContacts('contacts');
//   return data;
// };

// export const postContact = async newContact => {
//   const { data } = await instanceForContacts.post('contacts', newContact);
//   return data;
// };

// export const deleteСontact = async id => {
//   const { data } = await instanceForContacts.delete(`contacts/${id}`);
//   return data;
// };


import { dellToken, instanceForAuth, setToken } from './api';

export const getAllContacts = async () => {
  const { data } = await instanceForAuth('contacts');
  return data;
};

export const postContact = async newContact => {
  const { data } = await instanceForAuth.post('contacts', newContact);
  return data;
};

export const deleteСontact = async id => {
  const { data } = await instanceForAuth.delete(`contacts/${id}`);
  return data;
};



const setTokenToLocal = token => {
  localStorage.setItem('token', JSON.stringify(token));
};

export const signUp = async newUser => {
  const { data } = await instanceForAuth.post('users/signup', newUser);
  setToken(data.token);
  setTokenToLocal(data.token);
  return data;
};

export const logIn = async body => {
  const { data } = await instanceForAuth.post('users/login', body);
  setToken(data.token);
  setTokenToLocal(data.token);
  return data;
};

export const logOut = async () => {
  const { data } = await instanceForAuth.post('users/logout');
  localStorage.removeItem('token');
  dellToken();
  return data;
};

export const refresh = async () => {
  const token = localStorage.getItem('token');
  console.log(JSON.parse(token));
  token && setToken(JSON.parse(token));
  const { data } = await instanceForAuth('users/current');
  setTokenToLocal(data.token);
  return data;
};
import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_SERVER_URL}`;
const TOKEN = JSON.parse(localStorage.getItem('userInfo'))?.token;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export let userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${TOKEN}` },
});

export function setAuthAxios(TOKEN) {
  userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { Authorization: `Bearer ${TOKEN}` },
  });
}

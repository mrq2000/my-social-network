import axios from 'axios';

import { setToken as setTokenStorage, getToken as getTokenStorage } from './storage';

export const api = axios.create({
  baseURL: process.env.BACKEND_BASE_URL,
  timeout: 6000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

const set = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export function setToken(token) {
  setTokenStorage(token);
  set(token);
}

set(getTokenStorage());

import { API_URL } from '@/config';

import { globalStore } from '@/shared/api/store/store';
import axios from 'axios';

export const userLogout = () => {
  axios
    .post(`${API_URL}/pomodoro/api/v0.0.1/auth/jwt/logout`, {}, { withCredentials: true })
    .then((response) => {
      if (response.status === 204) {
        localStorage.removeItem('user');
        globalStore.userId = null;
      }
    })
    .catch(() => {
      localStorage.removeItem('user');
      globalStore.userId = null;
    });
};

import { API_URL } from '@/config';

import axios from 'axios';

export const userLogout = () => {
  return axios.post(
    `${API_URL}/pomodoro/api/v0.0.1/auth/jwt/logout`,
    {},
    { withCredentials: true },
  );
};

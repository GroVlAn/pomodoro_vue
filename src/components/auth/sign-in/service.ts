import axios from 'axios';
import { API_URL } from '@/config';

export const login = (email: string, password: string) => {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);

  return axios({
    method: 'post',
    url: API_URL + '/pomodoro/api/v0.0.1/auth/jwt/login',
    withCredentials: true,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const getUser = () => {
  return axios.get('http://localhost:8001/pomodoro/api/v0.0.1/user', {
    withCredentials: true,
  });
};

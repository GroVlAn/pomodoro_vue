import { API_URL } from '@/config';
import { TUser } from '@/shared/types/user';
import axios from 'axios';

export const register = (user: TUser) => {
  return axios.post(`${API_URL}/pomodoro/api/v0.0.1/auth/register`, user);
};

export const passwordValidator = (password: string): string[] => {
  const errors: string[] = [];
  const patterns = {
    isLowerCase: '.*[a-z]',
    isUpperCase: '.*[A-Z]',
    isNumber: '.*[0-9]',
    isSpecialSymbols: '.*[^\\w\\s]',
  };

  if (password.length < 8) {
    errors.push('Пароль должен быть не мение 8 символов');
  }

  for (const [patternName, pattern] of Object.entries(patterns)) {
    if (!password.match(pattern)) {
      errors.push(
        `Пароль должен содержать ${
          patternName === 'isSpecialSymbols'
            ? 'специальные символы'
            : `символы в ${patternName === 'isLowerCase' ? 'нижнем' : 'верхнем'} регистре`
        }`,
      );
    }
  }

  return errors;
};

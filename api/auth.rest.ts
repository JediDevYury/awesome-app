import { API_URL, AUTH_PATH } from './rest';
import { RegisterUserProps } from '@/api/types';
import { httpClient } from '@/services';

export const registerUser = async ({ email, password }: RegisterUserProps) => {
  const response = await httpClient.post(`${API_URL}${AUTH_PATH}/register`, { email, password });

  return {
    data: response.data,
  };
};

export const signInUser = async ({ email, password }: RegisterUserProps) => {
  const response = await httpClient.post(`${AUTH_PATH}/login`, { email, password });

  return {
    data: response.data,
  };
};

export default {
  registerUser,
  signInUser,
};

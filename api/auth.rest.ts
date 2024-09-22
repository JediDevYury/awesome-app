import { AUTH_PATH } from './rest';
import { RegisterUserProps } from '@/api/types';
import { httpClient } from '@/services';
import { handleError } from '@/shared';

export const registerUser = async ({ email, password }: RegisterUserProps) => {
  try {
    return await httpClient.post(`${AUTH_PATH}/register`, { email, password });
  } catch (error) {
    handleError(error);
  }
};

export const signInUser = async ({ email, password }: RegisterUserProps) => {
  try {
    return await httpClient.post(`${AUTH_PATH}/login`, { email, password });
  } catch (error) {
    handleError(error);
  }
};

export const verify2fa = async (
  email: string,
  token: string,
): Promise<{
  data: { email: string; token: string };
} | void> => {
  try {
    return await httpClient.post(`${AUTH_PATH}/verify-2fa`, { email, token });
  } catch (error) {
    handleError(error);
  }
};

export const reset2fa = async (email: string) => {
  try {
    return await httpClient.post(`${AUTH_PATH}/reset-2fa`, { email });
  } catch (error) {
    handleError(error);
  }
};

export const signOut = async (token: string) => {
  try {
    return await httpClient.get(`${AUTH_PATH}/sign-out`, {
      Authorization: `Bearer ${token}`,
    });
  } catch (error) {
    handleError(error);
  }
};

export default {
  registerUser,
  signInUser,
  verify2fa,
  reset2fa,
  signOut,
};

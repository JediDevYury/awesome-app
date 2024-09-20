import { authProvider } from '../constants';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: authProvider['registerUser'],
  });
};

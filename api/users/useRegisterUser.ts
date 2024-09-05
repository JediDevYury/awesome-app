import { registerUser } from '@/api/auth';
import { useMutation } from '@tanstack/react-query';

export const useRegisterUser = () => {
  return useMutation({
    mutationKey: ['user'],
    mutationFn: registerUser,
  });
};

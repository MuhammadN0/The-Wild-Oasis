import { useMutation } from '@tanstack/react-query';
import { signup as signupApi } from '../../services/apiLogin';
import toast from 'react-hot-toast';
export function useSignup() {
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupApi({ fullName, email, password }),
    onSuccess: () => toast.success('Successfully created a new user'),
    onError: (err) => toast.error(err.message),
  });

  return { signup, isLoading };
}

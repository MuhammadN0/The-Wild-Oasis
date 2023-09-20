import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiLogin';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()
  const { isLoading, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user.user)
      navigate('/', {replace: true});
    },
    onError: (err) => toast.error(err.message),
  });
  return { login, isLoading };
}

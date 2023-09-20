import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiLogin';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  });
  return { user, isLoading };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useCreateCabin(reset, onCloseModal) {
  const queryClient = useQueryClient();
  const { isLoading: isCreating, mutate: makeCabin } = useMutation({
    mutationFn: (cabin) => createCabin(cabin),
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset?.();
      onCloseModal?.()
    },
    onError: (err) => {
      if (err.message === 'reset is not a function') return 
      toast.error(err.message)},
  });

  return { makeCabin, isCreating };
}

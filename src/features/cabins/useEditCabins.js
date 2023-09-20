import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';

export function useEditCabin(reset, onCloseModal) {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createCabin(newCabin, id),
    onSuccess: () => {
      toast.success('Cabin created successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset?.();
      onCloseModal?.()
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editCabin };
}

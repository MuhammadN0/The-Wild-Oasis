import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin } from '../../services/apiCabins';
import { updateSetting as updateSettingApi } from '../../services/apiSettings';
export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success('Setting updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isUpdating, updateSetting };
}
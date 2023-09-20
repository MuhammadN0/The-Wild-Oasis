import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiLogin";
import toast from "react-hot-toast";

export function useUpdateUser(){
  const queryClient = useQueryClient()
  const {mutate: updateUser, isLoading} = useMutation({
    mutationFn: ({fullName,password,avatar})=> updateCurrentUser({fullName,password,avatar}),
    onSuccess: (user) => {
      toast.success('Successfully updated user')
      queryClient.invalidateQueries({
        queryKey:['user']
      })

    },
    onError: (err) => toast.error(err.message)
  })
  return {updateUser, isLoading}
}
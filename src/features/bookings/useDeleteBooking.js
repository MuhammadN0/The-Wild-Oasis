import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking () {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const {mutate: deleteBooking, isLoading:isDeleting} = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: () => {
      toast.success('Successfully deleted booking')
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      })
      navigate('/bookings')
    },
    onError: (err) => toast.error(err.message)
  })

  return {deleteBooking, isDeleting}
}
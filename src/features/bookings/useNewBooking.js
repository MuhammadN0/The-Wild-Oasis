import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBooking as createBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";
export function useNewBooking() {
  const queryClient = useQueryClient()
  const {mutate: createBooking, isLoading} = useMutation({
    mutationFn: (newBooking) => createBookingApi(newBooking),
    onSuccess: () => {
      toast.success('Successfully created new booking')
      queryClient.invalidateQueries({
        queryKey: ['bookings']
      })
    },
    onError: (err) => toast.error(err.message)
  })
  return {isLoading, createBooking}
}
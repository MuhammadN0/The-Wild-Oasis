import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin () {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const {mutate: checkIn, isLoading: isCheckingIn} = useMutation({
    mutationFn: ({bookingId,breakfast}) => updateBooking(bookingId, {
      isPaid: true,
      status: 'checked-in',
      ...breakfast
    }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully`)
      queryClient.invalidateQueries({active:true})
      navigate('/')
    },
    onError: () => toast.error('Couldn\'t check in booking')
  })

  return {checkIn, isCheckingIn}
}
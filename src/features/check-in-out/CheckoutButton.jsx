import Button from "../../ui/Button";
import {useCheckout} from './useCheckout'
function CheckoutButton({ bookingId }) {
  const {checkout, isCheckingout} = useCheckout()
  return (
    <Button disabled={isCheckingout} variation="primary" size="small" onClick={() => checkout(bookingId)}>
      Check out
    </Button>
  );
}

export default CheckoutButton;

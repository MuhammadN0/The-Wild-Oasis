import NewBookingForm from "../features/bookings/NewBookingForm"
import Heading from "../ui/Heading"
import Row from "../ui/Row"

function NewBooking() {
  return (
    <>
      <Row>
        <Heading as='h2'>Create a new Booking</Heading>
      </Row>
      <Row>
        <NewBookingForm/>
      </Row>
    </>
  )
}

export default NewBooking

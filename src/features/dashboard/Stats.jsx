import { formatCurrency } from '../../utils/helpers';
import Stat from './Stat';
import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from 'react-icons/hi2';
function Stats({ bookings, confirmedStays, numDays, cabinCount }) {
  const numBookings = bookings.length;
  const numStays = confirmedStays.reduce((acc, cur) => acc + cur.totalPrice, 0);
  const checkins = confirmedStays.length;
  const occupancy =
  confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
    //confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) / (numDays * cabinCount);
  return (
    <>
      <Stat
        title="Bookings"
        icon={<HiOutlineBriefcase />}
        color="blue"
        value={numBookings}
      />
      <Stat
        title="sales"
        icon={<HiOutlineBanknotes />}
        color="green"
        value={formatCurrency(numStays)}
      />
      <Stat
        title="Check-ins"
        icon={<HiOutlineCalendarDays />}
        color="indigo"
        value={checkins}
      />
      <Stat
        title="Occupancy Rate"
        icon={<HiOutlineChartBar />}
        color="yellow"
        value={Math.round(occupancy * 100) + "%"}
      />
    </>
  );
}

export default Stats;

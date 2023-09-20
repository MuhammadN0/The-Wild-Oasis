import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings';
import { useSearchParams } from 'react-router-dom';
import { PAGE_SIZE } from '../../utils/constants';

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient()
  const filterProperty = searchParams.get('status');
  const filter =
    !filterProperty || filterProperty === 'all'
      ? null
      : { field: 'status', filterProperty, method: 'eq' };
  const sortByRaw = searchParams.get('sortBy')?.split?.('-') || [
    'startDate',
    'desc',
  ];
  const sortBy = { field: sortByRaw[0], asc: sortByRaw[1] };
  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));
  const { data: bookings, isLoading } = useQuery({
    queryFn: () => getBookings({ filter, sortBy, page }),
    queryKey: ['bookings', filter, sortBy,page],
  });
  const pageCount = Math.ceil(bookings?.count / PAGE_SIZE);
  if (page < pageCount) queryClient.prefetchQuery({
    queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    queryKey: ['bookings', filter, sortBy,page+1],
  })
  if (page > 1 ) queryClient.prefetchQuery({
    queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    queryKey: ['bookings', filter, sortBy,page-1],
  })
  return { bookings: bookings?.data, count: bookings?.count, isLoading };
}

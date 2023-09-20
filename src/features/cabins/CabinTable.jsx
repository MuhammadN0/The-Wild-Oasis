import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { useSearchParams } from 'react-router-dom';

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  let filteredCabins = cabins;
  switch (searchParams.get('discount')) {
    case 'with-discount':
      filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);
      break;
    case 'no-discount':
      filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);
      break;
    default:
      break;
  }

  const [sortCategory, order] = searchParams.get('sortBy') ? searchParams.get('sortBy').split('-') : ['name','asc']
  const multiplier = order === 'desc' ? -1 : 1
  const sortedCabins = filteredCabins?.sort((a,b) => (a[sortCategory] - b[sortCategory] ) * multiplier)
  

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          data={sortedCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;

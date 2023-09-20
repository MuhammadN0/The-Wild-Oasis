import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import OpenCreateCabin from '../features/cabins/OpenCreateCabin';
import CabinTableOperations from '../features/cabins/CabinTableOperations';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations/>
      </Row>
      <Row>
        <CabinTable />
        <OpenCreateCabin />
      </Row>
    </>
  );
}

export default Cabins;

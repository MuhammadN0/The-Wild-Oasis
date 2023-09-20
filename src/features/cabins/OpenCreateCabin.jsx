import { HiPencil, HiSquare2Stack } from 'react-icons/hi2';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function OpenCreateCabin() {

  return (
    <Modal>
      <Modal.Open open="create-cabin">
        <Button>Create new cabin</Button>
      </Modal.Open>
      <Modal.Window name="create-cabin">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default OpenCreateCabin;

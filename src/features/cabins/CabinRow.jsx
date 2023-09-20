import styled from 'styled-components';
import { formatCurrency } from '../../utils/helpers';
import { useDeleteCabin } from './useDeleteCabin';
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;
function CabinRow({ cabin }) {
  const {
    image,
    name,
    maxCapacity,
    regularPrice,
    discount,
    id: cabinId,
    description,
  } = cabin;

  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { makeCabin, isCreating } = useCreateCabin();

  function handleDuplicate() {
    const newCabin = {
      name: `Copy of ${name}`,
      maxCapacity,
      discount,
      regularPrice,
      description,
      image,
    };
    makeCabin(newCabin);
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits for {maxCapacity} persons</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{discount ? formatCurrency(discount) : '-'}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />
            <Menus.List id={cabinId}>
              <Menus.Button onClick={handleDuplicate} icon={<HiSquare2Stack />}>
                Duplicate
              </Menus.Button>
              <Modal.Open open="edit">
            <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
              <Modal.Open open="confirm-delete">
            <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
            </Menus.List>


            <Modal.Window name="confirm-delete">
              <ConfirmDelete onConfirm={() => deleteCabin(cabinId)} />
            </Modal.Window>

            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;

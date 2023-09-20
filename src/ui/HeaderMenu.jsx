import styled from 'styled-components';
import Icon from './Icon';
import {
  
  HiArrowRightOnRectangle,
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineUser,
} from 'react-icons/hi2';
import { useLogout } from '../features/authentication/useLogout';
import { useNavigate } from 'react-router-dom';
import { useDarkMode } from '../context/DarkModeContext';

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const { logout, isLoading } = useLogout();
  const navigate = useNavigate();
  const {isDarkMode, toggleDarkMode} = useDarkMode()
  return (
    <StyledHeaderMenu>
      <Icon icon={<HiOutlineUser />} onClick={() => navigate('/account')} />
      <Icon icon={isDarkMode ? <HiOutlineSun/> : <HiOutlineMoon />} onClick={() => {toggleDarkMode()}} />
      <Icon
        icon={<HiArrowRightOnRectangle />}
        isLoading={isLoading}
        onClick={() => logout()}
      />
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;

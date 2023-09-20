import ButtonIcon from './ButtonIcon';
import SpinnerMini from './SpinnerMini';

function Icon({ icon, onClick, isLoading }) {
  return (
    <li>
      <ButtonIcon onClick={onClick}>{!isLoading ? icon : <SpinnerMini/>}</ButtonIcon>
    </li>
  );
}

export default Icon;

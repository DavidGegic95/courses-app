import React from 'react';
import { ReactComponent as TrashIcon } from '../../assets/Icon-Trash.svg';
import { ReactComponent as EditIcon } from '../../assets/Icon-Edit.svg';

const Button = ({
  buttonText,
  name,
  onClick,
  type,
}: {
  buttonText: string;
  name?: string;
  onClick?: () => void;
  type?: 'submit';
}) => {
  return (
    <button type={type} onClick={onClick} className={name}>
      {buttonText === 'trashIcon' && <TrashIcon />}
      {buttonText === 'editIcon' && <EditIcon />}
      {buttonText !== 'trashIcon' && buttonText !== 'editIcon' && buttonText}
    </button>
  );
};

export default Button;

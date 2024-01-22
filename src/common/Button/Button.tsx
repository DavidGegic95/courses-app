import React from 'react';
import { ReactComponent as TrashIcon } from '../../assets/Icon-Trash.svg';
import { ReactComponent as EditIcon } from '../../assets/Icon-Edit.svg';

const Button = ({
	buttonText,
	name,
	onClick,
	type,
	courseId,
}: {
	buttonText: string;
	name?: string;
	onClick?: () => void;
	type?: 'submit';
	courseId?: string;
}) => {
	return (
		<button type={type} onClick={onClick} className={name}>
			{buttonText === 'trashIcon' && <TrashIcon key={courseId + 'trash'} />}
			{buttonText === 'editIcon' && <EditIcon key={courseId + 'edit'} />}
			{buttonText !== 'trashIcon' && buttonText !== 'editIcon' && buttonText}
		</button>
	);
};

export default Button;

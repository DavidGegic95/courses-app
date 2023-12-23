import React from 'react';

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
			{buttonText}
		</button>
	);
};

export default Button;

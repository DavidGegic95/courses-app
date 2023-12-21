import React from 'react';

const Button = ({
	buttonText,
	name,
	onClick,
}: {
	buttonText: string;
	name?: string;
	onClick?: () => void;
}) => {
	return (
		<button onClick={onClick} className={name}>
			{buttonText}
		</button>
	);
};

export default Button;

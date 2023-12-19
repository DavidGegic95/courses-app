import React from 'react';

const Button = ({
	buttonText,
	name,
}: {
	buttonText: string;
	name?: string;
}) => {
	return <button className={name}>{buttonText}</button>;
};

export default Button;

import React from 'react';

const Button = ({
	buttonText,
	name,
	onClickSet,
}: {
	buttonText: string;
	name?: string;
	onClickSet?: () => void;
}) => {
	return (
		<button onClick={onClickSet} className={name}>
			{buttonText}
		</button>
	);
};

export default Button;

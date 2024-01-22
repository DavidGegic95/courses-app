import React, { ChangeEvent } from 'react';
import './input.css';

const Input = ({
	placeholder,
	handleInputData,
	inputData,
	inputName,
}: {
	placeholder: string;
	handleInputData?: (e: string) => void;
	inputData?: string;
	inputName?: string;
}) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		handleInputData!(event.target.value);
	};
	return (
		<input
			className={inputName}
			type='text'
			placeholder={placeholder}
			value={inputData}
			onChange={handleChange}
			id={inputName}
		/>
	);
};

export default Input;

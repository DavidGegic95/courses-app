import React, { ChangeEvent } from 'react';
import './input.css';

const Input = ({
	placeholder,
	setSearchQuery,
	searchQuery,
}: {
	placeholder: string;
	setSearchQuery: (e: string) => void;
	searchQuery: string;
}) => {
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};
	return (
		<input
			type='text'
			placeholder={placeholder}
			value={searchQuery}
			onChange={handleChange}
		/>
	);
};

export default Input;

import React, { ChangeEvent } from 'react';
import './createInput.css';

type inputProps = {
	id: string;
	type: string;
	value: string | number;
	onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
	placeholder: string;
	label: string;
};

const CreateInput = ({
	id,
	type,
	value,
	onChange,
	placeholder,
	label,
}: inputProps) => {
	const isTextarea = type === 'textarea';
	return (
		<div className='input-container'>
			<label htmlFor={id}>{label}</label>
			{!isTextarea ? (
				<input
					type={type}
					id={id}
					value={value}
					onChange={onChange as (e: ChangeEvent<HTMLInputElement>) => void}
					placeholder={placeholder}
				/>
			) : (
				<textarea
					id={id}
					value={value}
					onChange={onChange as (e: ChangeEvent<HTMLTextAreaElement>) => void}
					placeholder={placeholder}
				></textarea>
			)}
		</div>
	);
};

export default CreateInput;

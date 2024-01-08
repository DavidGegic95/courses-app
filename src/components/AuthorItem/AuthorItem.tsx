import React from 'react';
import './authorItem.css';
import { ReactComponent as DeleteAuthor } from '../../assets/trash.svg';
import { ReactComponent as AddAuthorIcon } from '../../assets/add.svg';

const AuthorItem = ({
	name,
	type,
	addAuthor,
	removeAuthor,
}: {
	name: string;
	type: string;
	addAuthor?: () => void;
	removeAuthor?: () => void;
}) => {
	return (
		<div className='container_addAuthor'>
			<p className='name_addAuthor'>{name}</p>
			{type === 'authorsList' ? (
				<>
					<button onClick={addAuthor} className='button_addAuthor'>
						{<AddAuthorIcon />}
					</button>
					<button onClick={removeAuthor} className='button_addAuthor'>
						{<DeleteAuthor />}
					</button>
				</>
			) : (
				<button onClick={removeAuthor} className='button_addAuthor'>
					{<DeleteAuthor />}
				</button>
			)}
		</div>
	);
};

export default AuthorItem;

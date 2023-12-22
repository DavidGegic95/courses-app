import React from 'react';
import './authorItem.css';
import { ReactComponent as DeleteAuthor } from '../../assets/trash.svg';
import { ReactComponent as AddAuthorIcon } from '../../assets/add.svg';

const AuthorItem = ({
	name,
	type,
	onClickAuthors,
}: {
	name: string;
	type: string;
	onClickAuthors: () => void;
}) => {
	return (
		<div className='container_addAuthor'>
			<p className='name_addAuthor'>{name}</p>
			{type === 'authorsList' ? (
				<button onClick={onClickAuthors} className='button_addAuthor'>
					{<AddAuthorIcon />}
				</button>
			) : (
				<button onClick={onClickAuthors} className='button_addAuthor'>
					{<DeleteAuthor />}
				</button>
			)}
		</div>
	);
};

export default AuthorItem;

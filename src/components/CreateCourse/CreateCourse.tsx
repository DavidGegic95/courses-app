import React, { ChangeEvent, useState } from 'react';
import CreateInput from '../../common/CreateInput/CreateInput';
import './createCourse.css';
import { formatDuration } from '../../helpers/getCourseDuration';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import { newDate } from '../../helpers/newDate';
type Author = {
	id: string;
	name: string;
};

const CreateCourse = () => {
	const [authorsList, setAuthorsList] = useState([] as Author[]);

	const [singleAuthor, setSingleAuthor] = useState({
		name: '',
		id: uuidv4(),
	});
	const [courseData, setCourseData] = useState({
		id: uuidv4(),
		title: '',
		description: '',
		creationDate: newDate(),
		duration: 0,
		authors: [] as unknown as Author[],
	});

	const addAuthorToList = (newAuthor: Author) => {
		if (singleAuthor.name !== '') {
			const newList = [...authorsList, newAuthor];
			setAuthorsList(newList);
			setSingleAuthor({
				name: '',
				id: uuidv4(),
			});
		}
	};

	const removeAuthor = (authorId: string) => {
		const addedAuthor = courseData.authors.find(
			(author) => author.id === authorId
		);
		const newList = courseData.authors.filter(
			(author) => author.id !== authorId
		);
		setCourseData((prevData) => {
			return { ...prevData, authors: [...newList] };
		});
		setAuthorsList((prev) => {
			return [...prev, addedAuthor!];
		});
	};

	const addAuthor = (authorId: string) => {
		const addedAuthor = authorsList.find((author) => author.id === authorId);
		const newList = authorsList.filter((author) => author.id !== authorId);
		setCourseData((prevData) => {
			return { ...prevData, authors: [...prevData.authors, addedAuthor!] };
		});
		setAuthorsList(newList);
	};

	const handleAuthorInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { value } = e.target;
		const newDataAuthor = { ...singleAuthor, name: value };
		setSingleAuthor(newDataAuthor);
	};

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { id, value } = e.target;
		setCourseData({
			...courseData,
			[id]: value,
		});
		console.log(courseData);
		setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
	};

	// eslint-disable-next-line
	const [errors, setErrors] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	});

	return (
		<div className='createCourse_page'>
			<h2 className='title_createCourse_page'>Course Edit/Create Page</h2>
			<div className='container_createCourse'>
				<p className='titles_container_createCourse'>Main info</p>
				<CreateInput
					id='title'
					placeholder='Input title'
					label='Title'
					type='text'
					value={courseData.title}
					onChange={handleInputChange}
				/>
				<CreateInput
					id='description'
					placeholder='Input description'
					label='Description'
					type='textarea'
					value={courseData.description}
					onChange={handleInputChange}
				/>
				<p className='titles_container_createCourse'>Duration</p>
				<div className='duration_container'>
					<CreateInput
						id='duration'
						placeholder='Input duration'
						label='Duration'
						type='number'
						value={courseData.duration}
						onChange={handleInputChange}
					/>
					<span className='duration_format'>
						{formatDuration(courseData.duration)} hours
					</span>
				</div>
				<p className='titles_container_createCourse'>Authors</p>
				<div className='authors_container'>
					<CreateInput
						id='authors'
						placeholder='Input author'
						label='Author name'
						type='text'
						value={singleAuthor.name}
						onChange={handleAuthorInputChange}
					/>
					<Button
						onClick={() => addAuthorToList(singleAuthor)}
						name='create_author_button'
						buttonText='Create Author'
					/>
					<div>
						<p className='titles_container_createCourse'>Course Authors</p>
						{courseData.authors.length === 0 ? (
							<span className='subtitle_container_createCourse'>
								Author list is empty
							</span>
						) : (
							courseData.authors.map((e) => {
								return (
									<AuthorItem
										onClickAuthors={() => removeAuthor(e.id)}
										name={e.name}
										type='courseAuthors'
									/>
								);
							})
						)}
					</div>
				</div>
				<div className='constainer_authorsList'>
					<p className='title_authorsList'>Authors list:</p>
					{authorsList.map((e: Author) => {
						return (
							<AuthorItem
								onClickAuthors={() => addAuthor(e.id)}
								type='authorsList'
								name={e.name}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;

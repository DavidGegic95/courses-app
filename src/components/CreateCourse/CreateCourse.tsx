import React, { ChangeEvent, useState } from 'react';
import CreateInput from '../../common/CreateInput/CreateInput';
import './createCourse.css';
import { formatDuration } from '../../helpers/getCourseDuration';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../common/Button/Button';
type Author = {
	id: string;
	name: string;
};

const CreateCourse = () => {
	const [courseData, setCourseData] = useState({
		id: uuidv4(),
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [] as unknown as Author[],
	});

	const [singleAuthor, setSingleAuthor] = useState({
		name: '',
		id: uuidv4(),
	});
	const addAuthor = (newAuthor: Author) => {
		setCourseData((prevData) => ({
			...prevData,
			authors: [...prevData.authors, newAuthor],
		}));
		setSingleAuthor({
			name: '',
			id: uuidv4(),
		});
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
	//eslint-disable-next-line
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
						onClick={() => addAuthor(singleAuthor)}
						name='create_author_button'
						buttonText='Create Author'
					/>
					<div>
						<p className='titles_container_createCourse'>Course Author</p>
						<span className='subtitle_container_createCourse'>
							Author list is empty
						</span>
					</div>
				</div>
				<div className='constainer_authorsList'>
					<p className='title_authorsList'>Authors list:</p>
					{courseData.authors.map((e: Author) => {
						return <span>{e.name}</span>;
					})}
				</div>
			</div>
		</div>
	);
};

export default CreateCourse;

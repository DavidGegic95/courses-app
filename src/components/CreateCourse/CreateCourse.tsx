import React, { ChangeEvent, useState } from 'react';
import CreateInput from '../../common/CreateInput/CreateInput';
import './createCourse.css';

const CreateCourse = () => {
	const [courseData, setCourseData] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: 0,
		authors: [],
	});

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
					<span className='duration_format'>00:00 hours</span>
				</div>
				<p className='titles_container_createCourse'>Authors</p>
				<div className='authors_container'>
					<CreateInput
						id='authors'
						placeholder='Input author'
						label='Author name'
						type='text'
						value={''}
						onChange={handleInputChange}
					/>
					<div>
						<p className='titles_container_createCourse'>Course Author</p>
						<span className='subtitle_container_createCourse'>
							Author list is empty
						</span>
					</div>
				</div>
				<p className='title_authorsList'>Authors list</p>
			</div>
		</div>
	);
};

export default CreateCourse;

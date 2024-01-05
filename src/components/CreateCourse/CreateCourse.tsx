import React, { ChangeEvent, useState } from 'react';
import CreateInput from '../../common/CreateInput/CreateInput';
import './createCourse.css';
import { formatDuration } from '../../helpers/getCourseDuration';
import { v4 as uuidv4 } from 'uuid';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import { newDate } from '../../helpers/newDate';
import { useNavigate } from 'react-router-dom';
import { addAuthorToDatabase } from '../../services';
import { useDispatch } from 'react-redux';
import { addCourseAction } from '../../store/courses/actions';
type Author = {
	id: string;
	name: string;
};

const CreateCourse = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
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
		duration: 1,
		authors: [] as unknown as Author[],
	});
	// eslint-disable-next-line
	const [errors, setErrors] = useState({
		id: '',
		title: '',
		description: '',
		creationDate: '',
		duration: '',
		authors: '',
	});

	const addAuthorToList = async (newAuthor: Author) => {
		if (singleAuthor.name !== '') {
			const newList = [...authorsList, newAuthor];
			setAuthorsList(newList);
			const id = await addAuthorToDatabase(singleAuthor.name);
			setCourseData((prev) => {
				return { ...prev, authors: [...prev.authors, id] };
			});
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
		if (id === 'duration' && parseFloat(value) <= 0) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[id]: 'Duration must be greater than 0',
			}));
		} else {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
			setCourseData({
				...courseData,
				[id]: value,
			});
		}

		setErrors((prevErrors) => ({ ...prevErrors, [id]: '' }));
	};

	const createCourse = async () => {
		const titleValidation = courseData.title.length >= 2;
		const descriptionValidation = courseData.description.length >= 2;
		const durationValidation = courseData.duration > 0;
		if (titleValidation && descriptionValidation && durationValidation) {
			const authorsIdAndName = courseData.authors;
			const authorsId = authorsIdAndName.map((e) => e.id);
			// authorsIdAndName.forEach(async (author) => {
			// 	const id = await addAuthorToDatabase(author.name);
			// 	authorsId.push(id);
			// });
			const requestBody = {
				title: courseData.title,
				description: courseData.description,
				duration: courseData.duration,
				authors: authorsId,
			};
			dispatch(addCourseAction(requestBody));
			// createCourseApiRequest(requestBody);
			navigate('/courses');
			// fetchAuthorsFromService();
			// fetchCoursesFromService();
		} else {
			if (!titleValidation) {
				setErrors((prevErrors) => ({
					...prevErrors,
					title: 'Title is required.',
				}));
			}
			if (!descriptionValidation) {
				setErrors((prevErrors) => ({
					...prevErrors,
					description: 'Description is required.',
				}));
			}
			if (!(courseData.duration > 0)) {
				setErrors((prevErrors) => ({
					...prevErrors,
					duration: 'Duration is required.',
				}));
			}
		}
	};

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
				{errors.title && <p>{errors.title}</p>}
				<CreateInput
					id='description'
					placeholder='Input description'
					label='Description'
					type='textarea'
					value={courseData.description}
					onChange={handleInputChange}
				/>
				{errors.description && <p>{errors.description}</p>}

				<p className='titles_container_createCourse'>Duration</p>
				<div className='duration_container'>
					<div>
						<CreateInput
							id='duration'
							placeholder='Input duration'
							label='Duration'
							type='number'
							value={courseData.duration}
							onChange={handleInputChange}
						/>
						{errors.duration && <p>{errors.duration}</p>}
					</div>

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
										key={e.id}
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
								key={e.id}
								onClickAuthors={() => addAuthor(e.id)}
								type='authorsList'
								name={e.name}
							/>
						);
					})}
				</div>
			</div>
			<div className='cancel_create_buttons_container'>
				<Button
					onClick={() => navigate('/courses')}
					name='cancel_button__createCourse'
					buttonText='CANCEL'
				/>
				<Button
					onClick={createCourse}
					name='create_course_button__createCourse'
					buttonText='CREATE COURSE'
				/>
			</div>
		</div>
	);
};

export default CreateCourse;

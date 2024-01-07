import React, { ChangeEvent, useEffect, useState } from 'react';
import CreateInput from '../../common/CreateInput/CreateInput';
import './createCourse.css';
import { formatDuration } from '../../helpers/getCourseDuration';
import Button from '../../common/Button/Button';
import AuthorItem from '../AuthorItem/AuthorItem';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getCourses } from '../../helpers/selectors';
import { AuthorType } from '../../store/authors/types';
import {
	addCourseThunkFunction,
	editCourseThunkFunction,
} from '../../store/courses/thunk';
import { addAuthorThunkFunction } from '../../store/authors/thunk';

const CreateCourse = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authorsList = useSelector(getAuthors);
	const coursesList = useSelector(getCourses);
	const [authorsListState, setAuthorsListState] = useState([] as string[]);
	const [singleAuthor, setSingleAuthor] = useState({
		name: '',
	});
	const [courseData, setCourseData] = useState({
		title: '',
		description: '',
		duration: 0,
		authors: [] as AuthorType[],
	});
	const [errors, setErrors] = useState({
		title: '',
		description: '',
		duration: '',
		authors: '',
	});

	useEffect(() => {
		if (courseId) {
			const currentCourse = coursesList.find((course) => {
				return course.id === courseId;
			});
			const authors: AuthorType[] = [];
			currentCourse?.authors.forEach((id) => {
				authorsList.forEach((e) => {
					if (e.id === id) {
						authors.push(e);
					}
				});
			});

			setCourseData({
				title: currentCourse?.title || '',
				description: currentCourse?.description || '',
				duration: currentCourse?.duration || 0,
				authors: authors,
			});
		}
	}, []);

	const removeAuthor = (authorId: string) => {
		const newList = authorsListState.filter((author) => author !== authorId);
		setAuthorsListState([...newList]);
	};

	const removeAuthorFromCourseData = (authorId: string) => {
		const newList = courseData.authors.filter(
			(author) => author.id !== authorId
		);
		setCourseData((prev) => ({ ...prev, authors: newList }));
	};

	const addAuthor = (name: string) => {
		const courseDataAuthorsHasName = courseData.authors.find(
			(e) => e.name === name
		);
		if (!courseDataAuthorsHasName) {
			const addedAuthor = authorsList.find(
				(author: AuthorType) => author.name === name
			);
			setCourseData((prevData) => {
				return { ...prevData, authors: [...prevData.authors, addedAuthor!] };
			});
		}
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
			const requestBody = {
				title: courseData.title,
				description: courseData.description,
				duration: courseData.duration,
				authors: authorsId,
			};
			!courseId
				? addCourseThunkFunction(dispatch, requestBody)
				: editCourseThunkFunction(dispatch, courseId, requestBody);
			navigate('/courses');
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
				{errors.title && <p className='error_text'>{errors.title}</p>}
				<CreateInput
					id='description'
					placeholder='Input description'
					label='Description'
					type='textarea'
					value={courseData.description}
					onChange={handleInputChange}
				/>
				{errors.description && (
					<p className='error_text'>{errors.description}</p>
				)}

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
						{errors.duration && <p className='error_text'>{errors.duration}</p>}
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
						onClick={() => {
							if (singleAuthor.name) {
								addAuthorThunkFunction(dispatch, { name: singleAuthor.name });
								setAuthorsListState((prev) => [...prev, singleAuthor.name]);
								setSingleAuthor({ name: '' });
							}
						}}
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
										key={e.id + 'courseList'}
										removeAuthor={() => removeAuthorFromCourseData(e.id)}
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
					{authorsListState.length
						? authorsListState?.map((e) => {
								return (
									<AuthorItem
										key={e + 'authorsList'}
										addAuthor={() => addAuthor(e)}
										removeAuthor={() => removeAuthor(e)}
										type='authorsList'
										name={e}
									/>
								);
							})
						: ''}
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
					buttonText={!courseId ? 'CREATE COURSE' : 'EDIT COURSE'}
				/>
			</div>
		</div>
	);
};

export default CreateCourse;

import React from 'react';
import Button from '../../../../common/Button/Button';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { formatDate } from '../../../../helpers/formatCreationDate';
import { selectAuthor } from '../../../../helpers/selectAuthorsFormat';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors, getUser } from '../../../../helpers/selectors';
import { deletCourseThunkFunction } from '../../../../store/courses/thunk';
import './courseCard.css';

const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	authors,
	courseId,
}: {
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
	courseId: string;
}) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const authorsList = useSelector(getAuthors);
	const userState = useSelector(getUser);

	return (
		<div className='course_card'>
			<p className='title_course_card'>{title}</p>
			<section className='section_course_card'>
				<p className='description_course_card'>{description}</p>
				<div className='section_2_house_card'>
					<p className='authors_course_card'>
						<span>Authors: </span>
						{authors?.map((e, index) => {
							let format = '';
							if (index !== authors.length - 1) {
								format = ', ';
							}
							return selectAuthor(e, authorsList) + format;
						})}
					</p>
					<p className='authors_course_card'>
						<span>Duration: </span>
						{formatDuration(duration)} hours
					</p>
					<p className='authors_course_card'>
						<span>Created: </span>
						{formatDate(creationDate)}
					</p>
					<div className='buttons-wrapper_course_card'>
						<Button
							onClick={() => navigate(`/courses/${courseId}`)}
							name='button_show_course'
							buttonText='Show Course'
						/>
						{userState.role === 'admin' && (
							<>
								<Button
									name='icon_button'
									buttonText='trashIcon'
									onClick={() => deletCourseThunkFunction(dispatch, courseId)}
								/>
								<Button
									name='icon_button'
									buttonText='editIcon'
									onClick={() => navigate(`/courses/update/${courseId}`)}
								/>
							</>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default CourseCard;

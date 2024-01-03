import React from 'react';
import Button from '../../../../common/Button/Button';
import { ReactComponent as TrashIcon } from '../../../../assets/Icon-Trash.svg';
import { ReactComponent as EditIcon } from '../../../../assets/Icon-Edit.svg';
import { useNavigate } from 'react-router-dom';
import { formatDuration } from '../../../../helpers/getCourseDuration';
import { formatDate } from '../../../../helpers/formatCreationDate';
import { selectAuthor } from '../../../../helpers/selectAuthorsFormat';
import { useSelector } from 'react-redux';
import './courseCard.css';
import { RootState } from '../../../../store';
import { AuthorType } from '../../../../store/authors/types';

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
	const authorsList = useSelector(
		(state: RootState) => state.authors as AuthorType[]
	);

	const navigate = useNavigate();
	return (
		<div className='course_card'>
			<p className='title_course_card'>{title}</p>
			<section className='section_course_card'>
				<p className='description_course_card'>{description}</p>
				<div className='section_2_house_card'>
					<p className='authors_course_card'>
						<span>Authors: </span>
						{authors.map((e, index) => {
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
						<TrashIcon />
						<EditIcon />
					</div>
				</div>
			</section>
		</div>
	);
};

export default CourseCard;

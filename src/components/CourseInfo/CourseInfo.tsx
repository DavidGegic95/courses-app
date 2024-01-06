import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../common/Button/Button';
import { formatDuration } from '../../helpers/getCourseDuration';
import { formatDate } from '../../helpers/formatCreationDate';
import { useSelector } from 'react-redux';
import { selectAuthor } from '../../helpers/selectAuthorsFormat';
import { getAuthors, getCourses } from '../../helpers/selectors';
import './courseInfo.css';

type Course = {
	id?: string;
	title: string;
	description: string;
	duration: number;
	authors: string[];
	creationDate?: string;
};

const CourseInfo = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();
	const coursesState = useSelector(getCourses);
	const authorsState = useSelector(getAuthors);
	const courseInfoState: Course | undefined = coursesState?.find(
		(course) => course.id === courseId
	);

	return (
		<div className='courseInfo'>
			<h2 className='title__coureInfo'>{courseInfoState?.title}</h2>
			<div className='card-wrapper__courseInfo'>
				<p className='description_title__courseInfo'>Description: </p>
				<div className='inner-card-wrapper__courseInfo'>
					<section className='section__description'>
						<p className='description__course'>
							{courseInfoState?.description}
						</p>
					</section>
					<section className='section__info_course'>
						<div className='info_course__static'>
							<span className='span_info_bold'>ID: </span>
							<span className='span_info_bold'>Duration: </span>
							<span className='span_info_bold'>Created:</span>
							<span className='span_info_bold'>Authors:</span>
						</div>
						<div className='info_course'>
							<span className='span_info'>{courseInfoState?.id}</span>
							<span className='span_info'>
								<span className='span_bold_hours'>
									{formatDuration(courseInfoState?.duration || 0)}
								</span>{' '}
								hours
							</span>
							<span className='span_info'>
								{formatDate(courseInfoState?.creationDate || '')}
							</span>
							<span className='span_info'>
								{courseInfoState?.authors?.map((e, index) => {
									let format = '';
									if (index !== courseInfoState.authors.length - 1) {
										format = ', ';
									}
									return selectAuthor(e, authorsState) + format;
								})}
							</span>
						</div>
					</section>
				</div>
			</div>
			<Button
				name='back_button'
				onClick={() => navigate('/courses')}
				buttonText='BACK'
			/>
		</div>
	);
};

export default CourseInfo;

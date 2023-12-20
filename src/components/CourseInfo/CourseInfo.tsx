import React from 'react';
import Button from '../../common/Button/Button';
import { mockedAuthorsList } from '../../constants';
import './courseInfo.css';

function formatDuration(duration: number): string {
	const hh: number = Math.floor(duration / 60);
	const mm: number = duration % 60;
	return `${format(hh)}:${format(mm)}`;
}

function format(num: number): string {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}

function formatDate(date: string): string {
	return date?.replaceAll('/', '.');
}

function selectAuthor(authorID: string): string {
	let authorName = '';
	for (const element of mockedAuthorsList) {
		if (authorID === element.id) {
			authorName = element.name;
		}
	}

	return authorName;
}
type CourseInfoType = {
	IdOfCourse: string;
	title: string;
	description: string;
	duration: number;
	listOfAuthors: string[];
	creationDate: string;
};

const CourseInfo = ({
	courseInfoState,
	setCourseInfoState,
}: {
	courseInfoState: CourseInfoType;
	setCourseInfoState: (e: CourseInfoType | null) => void;
}) => {
	return (
		<div className='courseInfo'>
			<h2 className='title__coureInfo'>{courseInfoState.title}</h2>
			<div className='card-wrapper__courseInfo'>
				<p className='description_title__courseInfo'>Description: </p>
				<div className='inner-card-wrapper__courseInfo'>
					<section className='section__description'>
						<p className='description__course'>{courseInfoState.description}</p>
					</section>
					<section className='section__info_course'>
						<div className='info_course__static'>
							<span className='span_info_bold'>ID: </span>
							<span className='span_info_bold'>Duration: </span>
							<span className='span_info_bold'>Created:</span>
							<span className='span_info_bold'>Authors:</span>
						</div>
						<div className='info_course'>
							<span className='span_info'>{courseInfoState.IdOfCourse}</span>
							<span className='span_info'>
								<span className='span_bold_hours'>
									{formatDuration(courseInfoState.duration!)}
								</span>{' '}
								hours
							</span>
							<span className='span_info'>
								{formatDate(courseInfoState.creationDate!)}
							</span>
							<span className='span_info'>
								{courseInfoState.listOfAuthors?.map((e, index) => {
									let format = '';
									if (index !== courseInfoState.listOfAuthors.length - 1) {
										format = ', ';
									}
									return selectAuthor(e) + format;
								})}
							</span>
						</div>
					</section>
				</div>
			</div>
			<Button
				name='back_button'
				courseInfoState={courseInfoState}
				setCourseInfoState={setCourseInfoState}
				buttonText='BACK'
			/>
		</div>
	);
};

export default CourseInfo;

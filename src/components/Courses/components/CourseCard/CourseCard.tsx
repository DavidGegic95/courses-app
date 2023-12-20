import React from 'react';
import './courseCard.css';
import { mockedAuthorsList } from '../../../../constants';
import Button from '../../../../common/Button/Button';
import { ReactComponent as TrashIcon } from '../../../../assets/Icon-Trash.svg';
import { ReactComponent as EditIcon } from '../../../../assets/Icon-Edit.svg';

function formatDuration(duration: number): string {
	const hh: number = Math.floor(duration / 60);
	const mm: number = duration % 60;
	return `${format(hh)}:${format(mm)} hours`;
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

const CourseCard = ({
	title,
	description,
	creationDate,
	duration,
	authors,
	courseId,
	setCourseInfoState,
}: {
	title: string;
	description: string;
	creationDate: string;
	duration: number;
	authors: string[];
	courseId: string;
	setCourseInfoState: (arr: CourseInfoType | null) => void;
}) => {
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
							return selectAuthor(e) + format;
						})}
					</p>
					<p className='authors_course_card'>
						<span>Duration: </span>
						{formatDuration(duration)}
					</p>
					<p className='authors_course_card'>
						<span>Created: </span>
						{formatDate(creationDate)}
					</p>
					<div className='buttons-wrapper_course_card'>
						<Button
							courseInfo={{
								IdOfCourse: courseId,
								title: title,
								description: description,
								duration: duration,
								listOfAuthors: authors,
								creationDate: creationDate,
							}}
							setCourseInfoState={setCourseInfoState}
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

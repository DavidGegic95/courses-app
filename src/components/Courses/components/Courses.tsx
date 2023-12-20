import React from 'react';
import CourseCard from './CourseCard/CourseCard';
// import { mockedCoursesList } from '../../../constants';
import './courses.css';
type mockedCourse = {
	id: string;
	title: string;
	duration: number;
	description: string;
	authors: string[];
	creationDate: string;
};
type CourseInfoType = {
	IdOfCourse: string;
	title: string;
	description: string;
	duration: number;
	listOfAuthors: string[];
	creationDate: string;
};

const Courses = ({
	mockedCoursesList,
	setCourseInfoState,
}: {
	mockedCoursesList: mockedCourse[];
	setCourseInfoState: (arr: CourseInfoType | null) => void;
}) => {
	return (
		<div className='courses_component'>
			{mockedCoursesList.map((e) => (
				<CourseCard
					setCourseInfoState={setCourseInfoState}
					key={e.id}
					courseId={e.id}
					title={e.title}
					duration={e.duration}
					description={e.description}
					authors={e.authors}
					creationDate={e.creationDate}
				/>
			))}
		</div>
	);
};

export default Courses;

import React from 'react';
import CourseCard from './CourseCard/CourseCard';
import { mockedCoursesList } from '../../../constants';
import './courses.css';

const Courses = () => {
	return (
		<div className='courses_component'>
			{mockedCoursesList.map((e) => (
				<CourseCard
					key={e.id}
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard/CourseCard';
import { mockedCoursesList } from '../../../constants';
import './courses.css';
import SearchBar from './SearchBar/SearchBar';
type mockedCourse = {
	id: string;
	title: string;
	duration: number;
	description: string;
	authors: string[];
	creationDate: string;
};

const Courses = () => {
	const [courseList, setCourseList] = useState<mockedCourse[] | undefined>(
		mockedCoursesList
	);
	const [searchQuery, setSearchQuery] = useState<string>('');

	return (
		<div className='courses_component'>
			<div className='searchBar_link_wrapper'>
				<SearchBar
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					courseList={courseList}
					setCourseList={setCourseList}
				/>
				<Link className='addCourse_button' to={'/courses/add'}>
					Add New Course
				</Link>
			</div>

			{courseList?.length !== 0 ? (
				courseList?.map((e) => (
					<CourseCard
						// setCourseInfoState={setCourseInfoState}
						key={e.id}
						courseId={e.id}
						title={e.title}
						duration={e.duration}
						description={e.description}
						authors={e.authors}
						creationDate={e.creationDate}
					/>
				))
			) : (
				<p>No results match your search criteria.</p>
			)}
		</div>
	);
};

export default Courses;

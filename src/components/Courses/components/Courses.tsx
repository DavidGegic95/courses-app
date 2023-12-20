import React, { useEffect, useState } from 'react';
import CourseCard from './CourseCard/CourseCard';
// import { mockedCoursesList } from '../../../constants';
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
	const [courseList, setCourseList] = useState<mockedCourse[]>();
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		setCourseList(mockedCoursesList);
	}, []);
	useEffect(() => {
		if (searchQuery === '') {
			setCourseList(mockedCoursesList);
		}
	}, [searchQuery]);
	return (
		<div className='courses_component'>
			<SearchBar
				searchQuery={searchQuery}
				setSearchQuery={setSearchQuery}
				courseList={courseList}
				setCourseList={setCourseList}
			/>
			{courseList?.length !== 0 ? (
				courseList?.map((e) => (
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
				))
			) : (
				<p>No results match your search criteria.</p>
			)}
		</div>
	);
};

export default Courses;

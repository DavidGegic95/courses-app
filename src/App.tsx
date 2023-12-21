import React, { useState } from 'react';
import './App.css';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/components/Courses';
import EmptyCourseList from './components/EmptyCourseList/EmptyCourseList';
import Header from './components/Header/Header';
import { mockedCoursesList } from './constants';

type CourseInfoType = {
	IdOfCourse: string;
	title: string;
	description: string;
	duration: number;
	listOfAuthors: string[];
	creationDate: string;
};

function App() {
	const [courseInfoState, setCourseInfoState] = useState<CourseInfoType | null>(
		null
	);
	// eslint-disable-next-line
	const [courseList, setCourseList] = useState(mockedCoursesList);
	return (
		<div className='app'>
			<Header />

			{courseList.length === 0 ? (
				<EmptyCourseList />
			) : !courseInfoState ? (
				<Courses
					mockedCoursesList={mockedCoursesList}
					setCourseInfoState={setCourseInfoState}
				/>
			) : (
				<CourseInfo
					setCourseInfoState={setCourseInfoState}
					courseInfoState={courseInfoState}
				/>
			)}
		</div>
	);
}

export default App;

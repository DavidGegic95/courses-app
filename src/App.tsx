// import React, { useState } from 'react';
import './App.css';
// import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/components/Courses';
import Header from './components/Header/Header';

// type CourseInfoType = {
// 	IdOfCourse: string;
// 	title: string;
// 	description: string;
// 	duration: number;
// 	listOfAuthors: string[];
// 	creationDate: string;
// };

function App() {
	// const [courseInfoState, setCourseInfoState] = useState<CourseInfoType | null>(
	// 	null
	// );
	return (
		<div className='App'>
			<Header />
			{/* {!courseInfoState ? <Courses /> : <CourseInfo />} */}
			<Courses />
		</div>
	);
}

export default App;

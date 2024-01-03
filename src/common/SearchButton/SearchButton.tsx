import React, { Dispatch, SetStateAction } from 'react';
import './searchButton.css';

type mockedCourse = {
	id: string;
	title: string;
	duration: number;
	description: string;
	authors: string[];
	creationDate: string;
};

const SearchButton = ({
	// setCourseList,
	searchQuery,
	courseList,
	setIsSearchClicked,
}: {
	setCourseList?: Dispatch<SetStateAction<mockedCourse[] | undefined>>;
	searchQuery: string;
	courseList?: mockedCourse[] | undefined;
	setIsSearchClicked: Dispatch<SetStateAction<boolean>>;
}) => {
	function handleOnClick() {
		const regex = new RegExp(searchQuery, 'gi');
		const searchedCourses = [];

		if (courseList) {
			for (const course of courseList) {
				const isMatch = regex.test(course.title) || regex.test(course.id);
				if (isMatch) {
					searchedCourses.push(course);
				}
			}
		}
		setIsSearchClicked(true);

		// setCourseList(searchedCourses);
	}

	return (
		<button onClick={handleOnClick} className='searchButton'>
			Search
		</button>
	);
};

export default SearchButton;

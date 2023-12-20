import React, { Dispatch, SetStateAction } from 'react';
import Input from '../../../../common/Input/Input';
import SearchButton from '../../../../common/SearchButton/SearchButton';
import './searchBar.css';
type mockedCourse = {
	id: string;
	title: string;
	duration: number;
	description: string;
	authors: string[];
	creationDate: string;
};

const SearchBar = ({
	setCourseList,
	courseList,
	setSearchQuery,
	searchQuery,
}: {
	setCourseList: Dispatch<SetStateAction<mockedCourse[] | undefined>>;
	courseList: mockedCourse[] | undefined;
	setSearchQuery: Dispatch<React.SetStateAction<string>>;
	searchQuery: string;
}) => {
	return (
		<div className='searchBar'>
			<Input
				setSearchQuery={setSearchQuery}
				searchQuery={searchQuery}
				placeholder='Input text'
			/>
			<SearchButton
				courseList={courseList}
				searchQuery={searchQuery}
				setCourseList={setCourseList}
			/>
		</div>
	);
};

export default SearchBar;

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
  setSearchQuery,
  searchQuery,
}: {
  setCourseList?: Dispatch<SetStateAction<mockedCourse[] | undefined>>;
  courseList?: mockedCourse[] | undefined;
  setSearchQuery: Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}) => {
  return (
    <div className='searchBar'>
      <Input
        inputName='input_search_bar'
        handleInputData={setSearchQuery}
        inputData={searchQuery}
        placeholder='Input text'
      />
      <SearchButton searchQuery={searchQuery} />
    </div>
  );
};

export default SearchBar;

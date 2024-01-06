import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard/CourseCard';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import EmptyCourseList from '../../EmptyCourseList/EmptyCourseList';
import { getCourses } from '../../../helpers/selectors';
import { coursesThunkFunction } from '../../../store/courses/thunk';
import { authorsThunkFunction } from '../../../store/authors/thunk';
import './courses.css';
import { userThunkAction } from '../../../store/user/thunk';

const Courses = () => {
	const [isSearchClicked, setIsSearchClicked] = useState(false);
	const coursesState = useSelector(getCourses);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const dispatch = useDispatch();

	useEffect(() => {
		authorsThunkFunction(dispatch);
		coursesThunkFunction(dispatch);
		if (localStorage.getItem('token')) {
			userThunkAction(dispatch);
		}
	}, []);

	return (
		<div className='courses_component'>
			<div className='searchBar_link_wrapper'>
				<SearchBar
					setIsSearchClicked={setIsSearchClicked}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
				/>
				<Link className='addCourse_button' to={'/courses/add'}>
					Add New Course
				</Link>
			</div>

			{coursesState?.length !== 0 ? (
				coursesState?.map((e) => (
					<CourseCard
						key={e.id + 'courseCard'}
						courseId={e.id}
						title={e.title}
						duration={e.duration}
						description={e.description}
						authors={e.authors}
						creationDate={e.creationDate}
					/>
				))
			) : isSearchClicked ? (
				<p>No results match your search criteria.</p>
			) : (
				<EmptyCourseList />
			)}
		</div>
	);
};

export default Courses;

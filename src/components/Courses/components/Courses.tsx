import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard/CourseCard';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import EmptyCourseList from '../../EmptyCourseList/EmptyCourseList';
import './courses.css';
import {
	fetchAuthorsFromService,
	fetchCoursesFromService,
} from '../../../services';
import { saveCoursesAction } from '../../../store/courses/actions';
import { RootState } from '../../../store';
import { saveAuthorsAction } from '../../../store/authors/actions';
type mockedCourse = {
	id: string;
	title: string;
	duration: number;
	description: string;
	authors: string[];
	creationDate: string;
};

const Courses = () => {
	const [isSearchClicked, setIsSearchClicked] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const dispatch = useDispatch();

	async function fetchAndSaveAuthors() {
		const authorsList = await fetchAuthorsFromService();
		dispatch(saveAuthorsAction(authorsList));
	}

	useEffect(() => {
		fetchAndSaveAuthors();
	}, []);
	//eslint_disable-next-line
	const coursesState = useSelector(
		(state: RootState) => state.courses as mockedCourse[]
	);

	async function fetchAndSetCoures() {
		const courses = await fetchCoursesFromService();
		dispatch(saveCoursesAction(courses));
	}

	useEffect(() => {
		fetchAndSetCoures();
	}, []);
	// useEffect(() => {
	// 	if (searchQuery === '') {
	// 		setIsSearchClicked(false);
	// 		setCourseList(mockedCoursesList);
	// 	}
	// }, [searchQuery]);

	return (
		<div className='courses_component'>
			<div className='searchBar_link_wrapper'>
				<SearchBar
					setIsSearchClicked={setIsSearchClicked}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					// courseList={courseList}
					// setCourseList={setCourseList}
				/>
				<Link className='addCourse_button' to={'/courses/add'}>
					Add New Course
				</Link>
			</div>

			{coursesState?.length !== 0 ? (
				coursesState?.map((e) => (
					<CourseCard
						key={e.id}
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

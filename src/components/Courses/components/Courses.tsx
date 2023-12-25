import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard/CourseCard';
import { mockedCoursesList } from '../../../constants';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import EmptyCourseList from '../../EmptyCourseList/EmptyCourseList';
// import { getAllCourses } from '../../../services';
import './courses.css';
// import { setCourses } from '../../../store/courses/coursesSlice';
type mockedCourse = {
	id: string;
	title: string;
	duration: number;
	description: string;
	authors: string[];
	creationDate: string;
};

const Courses = () => {
	const [courseList, setCourseList] = useState<mockedCourse[] | undefined>([]);
	const [isSearchClicked, setIsSearchClicked] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	type coursesType = [];
	// const dispatch = useDispatch();

	// const saveCoursesToState = () => dispatch(setCourses());

	const coursesState = useSelector(
		(state: { courses: coursesType }) => state.courses as coursesType
	);

	useEffect(() => {
		// getAllCourses();
	}, []);
	useEffect(() => {
		if (searchQuery === '') {
			setIsSearchClicked(false);
			setCourseList(mockedCoursesList);
		}
	}, [searchQuery]);

	return (
		<div className='courses_component'>
			<div className='searchBar_link_wrapper'>
				<SearchBar
					setIsSearchClicked={setIsSearchClicked}
					searchQuery={searchQuery}
					setSearchQuery={setSearchQuery}
					courseList={courseList}
					setCourseList={setCourseList}
				/>
				<Link className='addCourse_button' to={'/courses/add'}>
					Add New Course
				</Link>
			</div>

			{coursesState?.length !== 0 ? (
				courseList?.map((e) => (
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

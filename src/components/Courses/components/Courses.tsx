import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from './CourseCard/CourseCard';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import EmptyCourseList from '../../EmptyCourseList/EmptyCourseList';
import { getCourses, getUser } from '../../../helpers/selectors';
import { coursesThunkFunction } from '../../../store/courses/thunk';
import { authorsThunkFunction } from '../../../store/authors/thunk';
import './courses.css';
import { userThunkAction } from '../../../store/user/thunk';
import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { RootState } from '../../../store';
import { v4 as uuidv4 } from 'uuid';

const Courses = () => {
  const coursesState = useSelector(getCourses);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const userState = useSelector(getUser);
  const dispatch =
    useDispatch<ThunkDispatch<RootState, unknown, UnknownAction>>();

  useEffect(() => {
    dispatch(authorsThunkFunction());
    dispatch(coursesThunkFunction());
    if (localStorage.getItem('token')) {
      dispatch(userThunkAction());
    }
  }, []);

  return (
    <div className='courses_component'>
      {coursesState?.length !== 0 ? (
        <>
          <div className='searchBar_link_wrapper'>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            {userState.role === 'admin' && (
              <Link className='addCourse_button' to={'/courses/add'}>
                Add New Course
              </Link>
            )}
          </div>
          {coursesState?.map((e) => (
            <CourseCard
              key={e.id + uuidv4()}
              courseId={e.id}
              title={e.title}
              duration={e.duration}
              description={e.description}
              authors={e.authors}
              creationDate={e.creationDate}
            />
          ))}
        </>
      ) : (
        <EmptyCourseList />
      )}
    </div>
  );
};

export default Courses;

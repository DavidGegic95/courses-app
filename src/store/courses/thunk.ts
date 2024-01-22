import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import {
  addCourseToBackendFromServices,
  deleteCourseFromService,
  editCourseFromService,
  fetchCoursesFromService,
} from '../../services';
import {
  addCourseAction,
  deleteCourseAction,
  getCoursesAction,
  // saveCoursesAction,
} from './actions';
import { CourseType } from './types';

export const coursesThunkFunction =
  () => async (dispatch: Dispatch<UnknownAction>) => {
    const response = await fetchCoursesFromService();
    dispatch(getCoursesAction(response));
  };

export const deletCourseThunkFunction =
  (courseId: string) => async (dispatch: Dispatch<UnknownAction>) => {
    const response = await deleteCourseFromService(courseId);
    if (response.successful) dispatch(deleteCourseAction(courseId));
  };

export const addCourseThunkFunction =
  (courseInfo: CourseType) => async (dispatch: Dispatch<UnknownAction>) => {
    const response = await addCourseToBackendFromServices(courseInfo);

    if (response.successful) dispatch(addCourseAction(courseInfo));
  };

export const editCourseThunkFunction =
  (courseId: string, courseInfo: CourseType) =>
  async (dispatch: Dispatch<UnknownAction>) => {
    const response = await editCourseFromService(courseId, courseInfo);
    dispatch(addCourseAction(response));
  };

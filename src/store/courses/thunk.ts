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
	saveCoursesAction,
} from './actions';
import { CourseType } from './types';

export const coursesThunkFunction = async (
	dispatch: Dispatch<UnknownAction>
) => {
	const response = await fetchCoursesFromService();
	dispatch(saveCoursesAction(response));
};

export const deletCourseThunkFunction = async (
	dispatch: Dispatch<UnknownAction>,
	courseId: string
) => {
	const response = await deleteCourseFromService(courseId);
	if (response.successful) dispatch(deleteCourseAction(courseId));
};

export const addCourseThunkFunction = async (
	dispatch: Dispatch<UnknownAction>,
	courseInfo: CourseType
) => {
	const response = await addCourseToBackendFromServices(courseInfo);

	if (response.successful) dispatch(addCourseAction(courseInfo));
};

export const editCourseThunkFunction = async (
	dispatch: Dispatch<UnknownAction>,
	courseId: string,
	courseInfo: CourseType
) => {
	const response = await editCourseFromService(courseId, courseInfo);
	dispatch(addCourseAction(response));
};

import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import {
	deleteCourseFromService,
	fetchCoursesFromService,
} from '../../services';
import { deleteCourseAction, saveCoursesAction } from './actions';

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

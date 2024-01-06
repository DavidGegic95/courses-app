import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { fetchCoursesFromService } from '../../services';
import { saveCoursesAction } from './actions';

export const coursesThunkFunction = async (
	dispatch: Dispatch<UnknownAction>
) => {
	const response = await fetchCoursesFromService();
	dispatch(saveCoursesAction(response));
};

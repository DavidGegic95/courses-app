import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { fetchAuthorsFromService } from '../../services';
import { saveAuthorsAction } from './actions';

export const authorsThunkFunction = async (
	dispatch: Dispatch<UnknownAction>
) => {
	const response = await fetchAuthorsFromService();
	dispatch(saveAuthorsAction(response));
};

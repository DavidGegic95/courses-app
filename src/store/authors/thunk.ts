import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import {
	addAuthorToBackendFromServices,
	fetchAuthorsFromService,
} from '../../services';
import { addAuthorActions, saveAuthorsAction } from './actions';

export const authorsThunkFunction =
	() => async (dispatch: Dispatch<UnknownAction>) => {
		const response = await fetchAuthorsFromService();
		dispatch(saveAuthorsAction(response));
	};

export const addAuthorThunkFunction =
	(authorName: { name: string }) =>
	async (dispatch: Dispatch<UnknownAction>) => {
		const response = await addAuthorToBackendFromServices(authorName);
		dispatch(addAuthorActions(response));
	};

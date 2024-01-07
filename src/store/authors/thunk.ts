import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import {
	addAuthorToBackendFromServices,
	fetchAuthorsFromService,
} from '../../services';
import { addAuthorActions, saveAuthorsAction } from './actions';

export const authorsThunkFunction = async (
	dispatch: Dispatch<UnknownAction>
) => {
	const response = await fetchAuthorsFromService();
	dispatch(saveAuthorsAction(response));
};

export const addAuthorThunkFunction = async (
	dispatch: Dispatch<UnknownAction>,
	name: { name: string }
) => {
	const response = await addAuthorToBackendFromServices(name);
	dispatch(addAuthorActions(response));
};

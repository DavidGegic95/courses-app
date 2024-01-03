import { AuthorsActionTypes, AuthorType } from './types';

export const saveAuthorsAction = (payload: AuthorType[]) => ({
	type: AuthorsActionTypes.SAVE_AUTHORS,
	payload: payload,
});
export const removeAuthorAction = (payload: AuthorType[]) => ({
	type: AuthorsActionTypes.REMOVE_AUTHOR,
	payload: payload,
});

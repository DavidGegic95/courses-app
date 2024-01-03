import { AuthorType, AuthorsActionTypes, AuthorsActions } from './types';

const authorsInitialState = [] as AuthorType[];

export function authorsReducer(
	state = authorsInitialState,
	action: AuthorsActions
) {
	switch (action.type) {
		case AuthorsActionTypes.SAVE_AUTHORS:
			return { ...state, authors: action.payload };
		case AuthorsActionTypes.REMOVE_AUTHOR:
			return [...state, action.payload];

		default:
			return state;
	}
}

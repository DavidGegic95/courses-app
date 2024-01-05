import { AuthorType, AuthorsActionTypes, AuthorsActions } from './types';

const authorsInitialState = [] as AuthorType[];

export function authorsReducer(
	state = authorsInitialState,
	action: AuthorsActions
) {
	switch (action.type) {
		case AuthorsActionTypes.SAVE_AUTHORS:
			return [...action.payload];

		default:
			return state;
	}
}

export type AuthorType = {
	id: string;
	name: string;
};

export const enum AuthorsActionTypes {
	SAVE_AUTHORS = 'SAVE_AUTHORS',
	REMOVE_AUTHOR = 'REMOVE_AUTHOR',
}

export interface SaveAuthors {
	type: AuthorsActionTypes.SAVE_AUTHORS;
	payload: AuthorType[];
}
export interface RemoveAuthor {
	type: AuthorsActionTypes.REMOVE_AUTHOR;
	payload: string;
}

export type AuthorsActions = SaveAuthors | RemoveAuthor;

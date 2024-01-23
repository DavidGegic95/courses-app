export type AuthorType = {
  map?(
    arg0: (e: AuthorType) => import('react/jsx-runtime').JSX.Element
  ): import('react').ReactNode;
  id: string;
  name: string;
};

export const enum AuthorsActionTypes {
  SAVE_AUTHORS = 'SAVE_AUTHORS',
  REMOVE_AUTHOR = 'REMOVE_AUTHOR',
  ADD_AUTHOR = 'ADD_AUTHOR',
}

export interface SaveAuthors {
  type: AuthorsActionTypes.SAVE_AUTHORS;
  payload: AuthorType[];
}
export interface RemoveAuthor {
  type: AuthorsActionTypes.REMOVE_AUTHOR;
  payload: string;
}
export interface AddAuthor {
  type: AuthorsActionTypes.ADD_AUTHOR;
  payload: AuthorType;
}

export type AuthorsActions = SaveAuthors | RemoveAuthor | AddAuthor;

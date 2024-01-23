import { Dispatch, UnknownAction } from '@reduxjs/toolkit';
import {
  addAuthorToBackendFromServices,
  fetchAuthorsFromService,
  removeAuthorFromBackendFromServices,
} from '../../services';
import {
  addAuthorActions,
  removeAuthorAction,
  saveAuthorsAction,
} from './actions';

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

export const removeAuthorThunkFunction =
  (authorId: string) => async (dispatch: Dispatch<UnknownAction>) => {
    const response = await removeAuthorFromBackendFromServices(authorId);
    if (response.successful) dispatch(removeAuthorAction(authorId));
  };

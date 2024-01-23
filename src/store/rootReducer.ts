import { combineReducers } from '@reduxjs/toolkit';
import { authorsReducer } from './authors/reducer';
import { coursesReducer } from './courses/reducer';
import { userReducer } from './user/reducer';

export const rootReducer = combineReducers({
  courses: coursesReducer,
  user: userReducer,
  authors: authorsReducer,
});

import { RootState } from '../store';
import { AuthorType } from '../store/authors/types';
import { CourseType } from '../store/courses/types';
import { UserType } from '../store/user/types';

export const getCourses = (state: RootState) =>
	state.courses as Required<CourseType>[];
export const getAuthors = (state: RootState) => state.authors as AuthorType[];
export const getUser = (state: RootState) => state.user as UserType;

import {
	CourseType,
	CoursesActionTypes,
	// SaveCourses,
	// AddCourse,
	// DeleteCourse,
	CoursesAction,
} from './types';

const initCoursesState = [] as CourseType[];

export function coursesReducer(
	state = initCoursesState,
	action: CoursesAction
) {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return { ...state, courses: action.payload };
		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];

		default:
			return state;
	}
}

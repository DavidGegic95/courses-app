import { CourseType, CoursesActionTypes, CoursesAction } from './types';

const initCoursesState = [] as CourseType[];

export default function coursesReducer(
	state = initCoursesState,
	action: CoursesAction
) {
	switch (action.type) {
		case CoursesActionTypes.SAVE_COURSES:
			return [...action.payload];
		case CoursesActionTypes.ADD_COURSE:
			return [...state, action.payload];
		case CoursesActionTypes.DELETE_COURSE:
			// eslint-disable-next-line no-case-declarations
			const courseIdToDelete = action.payload;
			// eslint-disable-next-line no-case-declarations
			const filteredCourses = state.filter(
				(course) => course.id !== courseIdToDelete
			);
			return [...filteredCourses];

		default:
			return state;
	}
}

export type CourseType = {
	id?: string;
	title: string;
	description: string;
	creationDate?: string;
	duration: number;
	authors: string[];
};

export const enum CoursesActionTypes {
	SAVE_COURSES = 'SAVE_COURSES',
	ADD_COURSE = 'ADD_COURSE',
	DELETE_COURSE = 'DELETE_COURSES',
	GET_COURSES = 'GET_COURSES',
}

export interface SaveCourses {
	type: CoursesActionTypes.SAVE_COURSES;
	payload: CourseType[];
}

export interface AddCourse {
	type: CoursesActionTypes.ADD_COURSE;
	payload: CourseType;
}

export interface DeleteCourse {
	type: CoursesActionTypes.DELETE_COURSE;
	payload: string;
}
export type GetCoursesAction = {
	type: CoursesActionTypes.GET_COURSES;
	payload: CourseType[];
};

export type CoursesAction =
	| SaveCourses
	| AddCourse
	| DeleteCourse
	| GetCoursesAction;

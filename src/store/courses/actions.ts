import { CoursesActionTypes, CourseType, GetCoursesAction } from './types';

export const addCourseAction = (payload: CourseType) => ({
  type: CoursesActionTypes.ADD_COURSE,
  payload: payload,
});
export const deleteCourseAction = (payload: string) => ({
  type: CoursesActionTypes.DELETE_COURSE,
  payload: payload,
});
export const saveCoursesAction = (courses: CourseType[]) => ({
  type: CoursesActionTypes.SAVE_COURSES,
  payload: courses,
});
export const getCoursesAction = (
  coursesData: CourseType[]
): GetCoursesAction => ({
  type: CoursesActionTypes.GET_COURSES,
  payload: coursesData,
});

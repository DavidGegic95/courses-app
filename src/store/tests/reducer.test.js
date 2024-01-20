/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import { coursesReducer } from '../courses/reducer';
import { mockedCoursesList } from './mockedCourseList';


describe('coursesReducer', () => {
    it(" reducer should return the initial state", () => {
        const initialState = mockedCoursesList
        const newState = coursesReducer(initialState, { type: "Default" })
        expect(newState).toEqual(initialState)
    })



    it('reducer should handle SAVE_COURSE and returns new state.', () => {
        const initialState = [];

        const newState = coursesReducer(initialState, { type: 'SAVE_COURSES', payload: mockedCoursesList });

        expect(newState).toEqual(mockedCoursesList);
    });
});

/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Courses from '../components/Courses';
import CreateCourse from '../../CreateCourse/CreateCourse';
import { initialState } from './mockedInitialTest';

jest.mock('../../../store/user/thunk');
jest.mock('../../../store/authors/thunk');
jest.mock('../../../store/courses/thunk');

describe("Courses component", () => {


    describe('Courses component', () => {
        it('should display the correct number of CourseCard components', () => {
            const store = configureStore()(initialState);
            render(
                <Provider store={store}>
                    <MemoryRouter>
                        <Courses />
                    </MemoryRouter>
                </Provider >
            );

            const courseCards = document.querySelectorAll('.course_card');

            expect(courseCards.length).toBe(initialState.courses.length);
        });
    });
    it(" CourseForm should be shown after a click on the 'Add new course' button.", async () => {
        const store = configureStore()(initialState);
        render(
            <Provider store={store}>
                <MemoryRouter >
                    <Courses />
                    <CreateCourse />
                </MemoryRouter>
            </Provider >
        );

        const addCourseButton = screen.getByText('Add New Course');
        fireEvent.click(addCourseButton);

        await waitFor(() => {
            const courseForm = screen.getByTestId("create-course");
            expect(courseForm).toBeInTheDocument();
        });
    });
})

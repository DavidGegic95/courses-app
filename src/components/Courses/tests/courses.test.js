import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Courses from '../components/Courses';
import { initialState } from './mockedInitialTest';
import CreateCourse from '../../CreateCourse/CreateCourse';

describe('Courses component', () => {
  const mockedStore = {
    getState: () => initialState,
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };

  describe('Courses component', () => {
    it('should display the correct number of CourseCard components', () => {
      const store = mockedStore;
      render(
        <Provider store={store}>
          <MemoryRouter>
            <Courses />
          </MemoryRouter>
        </Provider>
      );

      const courseCards = document.querySelectorAll('.course_card');

      expect(courseCards.length).toBe(initialState.courses.length);
    });
  });
  it(" CourseForm should be shown after a click on the 'Add new course' button.", async () => {
    const store = mockedStore;
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/add' element={<CreateCourse />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const addCourseButton = screen.getByText('Add New Course');
    fireEvent.click(addCourseButton);

    const createCourseComponent = screen.getByTestId('create-course');
    expect(createCourseComponent).toBeInTheDocument();
  });
});

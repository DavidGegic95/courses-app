import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Courses from '../components/Courses';
import { initialState } from './mockedInitialTest';
import CourseForm from '../../CourseForm/CourseForm';

describe('Courses component', () => {
  const mockedStore = {
    getState: () => initialState,
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };

  describe('Courses component', () => {
    it('should display the correct number of CourseCard components', () => {
      render(
        <Provider store={mockedStore}>
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
    render(
      <Provider store={mockedStore}>
        <MemoryRouter initialEntries={['/courses']}>
          <Routes>
            <Route path='/courses' element={<Courses />} />
            <Route path='/courses/add' element={<CourseForm />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const addCourseButton = screen.getByText('Add New Course');
    fireEvent.click(addCourseButton);

    const CourseFormComponent = screen.getByTestId('create-course');
    expect(CourseFormComponent).toBeInTheDocument();
  });
});

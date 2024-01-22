import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import CourseCard from '../CourseCard';
import { formatDuration } from '../../../../../helpers/getCourseDuration';
import { selectAuthor } from '../../../../../helpers/selectAuthorsFormat';
import { formatDate } from '../../../../../helpers/formatCreationDate';

jest.mock('../../../../../store/user/thunk');
jest.mock('../../../../../store/authors/thunk');
jest.mock('../../../../../store/courses/thunk');

describe('CourseCard component', () => {
  const mockStore = configureStore();
  const initialState = {
    user: {
      isAuth: true,
      name: 'user1',
      token: 'token 1',
    },
    authors: [
      { name: 'author test 1', id: '123' },
      { name: 'author test 2', id: '321' },
      { name: 'author test 4', id: '3' },
    ],
  };
  const propsCourseCard = {
    title: 'Test Course',
    description: 'lorem ispum test description',
    creationDate: '01/08/2024',
    duration: 90,
    authors: ['123', '321'],
    courseId: 'courseid123',
  };
  let store = mockStore(initialState);
  render(
    <Provider store={store}>
      <MemoryRouter>
        <CourseCard {...propsCourseCard} />
      </MemoryRouter>
    </Provider>
  );

  it('CourseCard should display title', () => {
    expect(screen.getByText(propsCourseCard.title)).toBeInTheDocument();
  });

  it('CourseCard should display description', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseCard {...propsCourseCard} />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText(propsCourseCard.description)).toBeInTheDocument();
  });

  it('CourseCard should display duration, in right format', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseCard {...propsCourseCard} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(formatDuration(propsCourseCard.duration) + ' hours')
    ).toBeInTheDocument();
    const hours = Math.floor(propsCourseCard.duration / 60);
    const minutes = propsCourseCard.duration % 60;
    const expectedFormat = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} hours`;
    const durationElement = screen.getByTestId('duration');
    expect(durationElement).toHaveTextContent(expectedFormat);
  });

  it('CourseCard should display authors list', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseCard {...propsCourseCard} />
        </MemoryRouter>
      </Provider>
    );

    let authorListString = '';
    propsCourseCard.authors.forEach((e, index) => {
      let format = '';
      if (index !== propsCourseCard.authors.length - 1) {
        format = ', ';
      }
      return (authorListString +=
        selectAuthor(e, initialState.authors) + format);
    });
    expect(screen.getByText(authorListString)).toBeInTheDocument();
  });
  it(' CourseCard should display created date in the correct format', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CourseCard {...propsCourseCard} />
        </MemoryRouter>
      </Provider>
    );
    expect(
      screen.getByText(formatDate(propsCourseCard.creationDate))
    ).toBeInTheDocument();
  });
});

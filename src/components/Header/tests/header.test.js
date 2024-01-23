import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from '../Header';

describe('Header component', () => {
  const logedInState = {
    user: {
      name: 'John Doe',
      isAuth: true,
      token: 'token',
    },
  };
  const mockedStore = {
    getState: () => logedInState,
    subscribe: jest.fn(),
    dispatch: jest.fn(),
  };

  beforeEach(() => {
    localStorage.clear();
  });

  it('renders logo and user name when the user is logged in', () => {
    localStorage.setItem("token", "token")
    render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('renders logout button when the user is logged in', () => {
    localStorage.setItem("token", "token")
    render(
      <Provider store={mockedStore}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });


});

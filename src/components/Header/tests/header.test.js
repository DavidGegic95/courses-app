/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Header from '../Header';

jest.mock('../../../store/user/thunk');
jest.mock('../../../store/courses/thunk');

describe('Header component', () => {
    const mockStore = configureStore();
    const initialState = {
        user: {
            name: 'John Doe',
            isAuth: true,
            token: "token"
        },
    };
    const logoutState = {
        user: {
            name: "",
            isAuth: false,
            token: ""
        }
    };
    let store;

    beforeEach(() => {
        localStorage.clear();

    });

    it('renders logo and user name when the user is logged in', () => {
        store = mockStore(initialState);
        localStorage.setItem("token", "token")
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders logout button when the user is logged in', () => {
        store = mockStore(initialState);
        localStorage.setItem("token", "token")

        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('does not render user name and logout button when the user is not logged in', () => {

        store = mockStore(logoutState);
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <Header />
                </MemoryRouter>
            </Provider>
        );

        expect(screen.queryByText('John Doe')).not.toBeInTheDocument();

        expect(screen.queryByText('Logout')).not.toBeInTheDocument();
    });


});

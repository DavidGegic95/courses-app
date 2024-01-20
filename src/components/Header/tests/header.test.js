/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
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
        const mockedStore = {
            getState: () => logedInState,
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };
        store = mockedStore;
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
        const mockedStore = {
            getState: () => logedInState,
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };
        store = mockedStore;
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
        const mockedStore = {
            getState: () => logoutState,
            subscribe: jest.fn(),
            dispatch: jest.fn(),
        };
        store = mockedStore;
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

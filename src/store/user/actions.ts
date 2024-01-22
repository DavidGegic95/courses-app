import { UserActionTypes, UserType } from './types';

// Action Creators
export const loginUser = (userData: UserType) => ({
	type: UserActionTypes.LOGIN_USER,
	payload: userData,
});

export const logoutUser = () => ({
	type: UserActionTypes.LOGOUT_USER,
	payload: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
	},
});

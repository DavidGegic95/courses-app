export type UserType = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
};
export const enum UserActionTypes {
	LOGIN_USER = 'LOGIN_USER',
	LOGOUT_USER = 'LOGOUT_USER',
}

export interface LoginUser {
	type: UserActionTypes.LOGIN_USER;
	payload: UserType;
}

export interface LogoutUser {
	type: UserActionTypes.LOGOUT_USER;
	payload: {
		isAuth: false;
		name: '';
		email: '';
		token: '';
	};
}

export type UserActions = LoginUser | LogoutUser;

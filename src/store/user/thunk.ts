import { fetchUserFromService } from '../../services';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { loginUser } from './actions';

export const userThunkAction = async (dispatch: Dispatch<UnknownAction>) => {
	const response = await fetchUserFromService();
	dispatch(
		loginUser({
			isAuth: true,
			name: response.name,
			email: response.email,
			token: localStorage.getItem('token')!,
			role: response.role,
		})
	);
};

import { fetchUserFromService } from '../../services';
import { Dispatch, UnknownAction } from '@reduxjs/toolkit';

import { loginUser } from './actions';

export const userThunkAction = async (dispatch: Dispatch<UnknownAction>) => {
	const response = await fetchUserFromService();
	if (response?.successful) {
		dispatch(
			loginUser({
				isAuth: true,
				name: response?.result?.name,
				email: response?.result?.email,
				token: localStorage.getItem('token')!,
				role: response?.result?.role,
			})
		);
	}
};

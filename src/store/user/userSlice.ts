import { createSlice } from '@reduxjs/toolkit';

type UserType = {
	isAuth: boolean;
	name: string;
	email: string;
	token: string;
};

const userSlice = createSlice({
	name: 'user',
	initialState: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
	} as UserType,
	reducers: {
		loginUser: (state, action) => {
			const { name, email, token } = action.payload;
			state.isAuth = true;
			state.name = name;
			state.email = email;
			state.token = token;
		},
		logoutUser: (state) => {
			state.isAuth = false;
			state.name = '';
			state.email = '';
			state.token = '';
		},
	},
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
